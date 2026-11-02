-- À exécuter UNE FOIS dans Supabase > SQL Editor (projet utilisé par le site).
-- Crée la liste de l'équipe : lecture publique, écriture uniquement via le formulaire d'invitation.

create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 80),
  role text not null check (char_length(role) between 2 and 100),
  grp text not null check (grp in ('Associés', 'Collaborateurs')),
  bio text check (char_length(bio) <= 240),
  photo text check (char_length(photo) <= 150000),
  visible boolean not null default true,
  created_at timestamptz not null default now()
);
create unique index if not exists team_members_name_key on public.team_members (lower(name));

alter table public.team_members enable row level security;
drop policy if exists "equipe_lecture_publique" on public.team_members;
create policy "equipe_lecture_publique" on public.team_members for select using (visible);
-- Aucune policy d'insertion/modification : tout passe par la fonction ci-dessous.

-- Code d'invitation (contenu dans le lien envoyé au personnel). Pour le changer : modifier cette ligne et la relancer.
create table if not exists public.team_invite (code text primary key);
alter table public.team_invite enable row level security;  -- aucune policy = illisible depuis le site
insert into public.team_invite (code) values ('CHOISIR-UN-CODE-ICI') on conflict do nothing;

create or replace function public.submit_team_member(
  p_code text, p_name text, p_role text, p_grp text, p_bio text, p_photo text
) returns void
language plpgsql security definer set search_path = public as $$
begin
  if not exists (select 1 from public.team_invite where code = p_code) then
    raise exception 'invitation invalide';
  end if;
  insert into public.team_members (name, role, grp, bio, photo)
  values (trim(p_name), trim(p_role), p_grp, nullif(trim(coalesce(p_bio, '')), ''), p_photo)
  on conflict (lower(name)) do update
    set role = excluded.role, grp = excluded.grp, bio = excluded.bio,
        photo = coalesce(excluded.photo, public.team_members.photo), visible = true;
end;
$$;
revoke all on function public.submit_team_member from public;
grant execute on function public.submit_team_member to anon;

-- Pour retirer quelqu'un du site :  update public.team_members set visible = false where name = 'Nom Prénom';
