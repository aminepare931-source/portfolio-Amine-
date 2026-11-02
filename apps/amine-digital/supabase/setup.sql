-- AMINE DIGITAL — configuration Supabase (équipe, avis, demandes, coordonnées, administration)
-- À exécuter dans Supabase > SQL Editor > Run. Peut être relancé sans danger (idempotent).
-- Remplacer MOT_DE_PASSE_ADMIN et CODE_INVITATION avant de l'exécuter.

create extension if not exists pgcrypto with schema extensions;

-- ───────────────────────── ÉQUIPE ─────────────────────────
drop policy if exists "equipe_lecture_publique" on public.team_members;

create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 80),
  role text not null check (char_length(role) between 2 and 100),
  grp text not null check (grp in ('Associés', 'Collaborateurs')),
  bio text check (char_length(bio) <= 240),
  photo text check (char_length(photo) <= 150000),
  status text not null default 'pending' check (status in ('pending', 'approved', 'hidden')),
  created_at timestamptz not null default now()
);

-- Migration depuis une ancienne version (colonne "visible")
do $$
begin
  if exists (select 1 from information_schema.columns where table_schema='public' and table_name='team_members' and column_name='visible') then
    alter table public.team_members add column if not exists status text not null default 'pending';
    update public.team_members set status = case when visible then 'approved' else 'hidden' end;
    alter table public.team_members drop column visible;
  end if;
end $$;

create unique index if not exists team_members_name_key on public.team_members (lower(name));
alter table public.team_members enable row level security;
create policy "equipe_lecture_publique" on public.team_members for select using (status = 'approved');

create table if not exists public.team_invite (code text primary key);
alter table public.team_invite enable row level security;
insert into public.team_invite (code) select 'CODE_INVITATION' where not exists (select 1 from public.team_invite);

-- ───────────────────────── AVIS CLIENTS ─────────────────────────
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 80),
  role text, service text, date_label text,
  text text not null check (char_length(text) between 5 and 800),
  visible boolean not null default true,
  created_at timestamptz not null default now()
);
alter table public.reviews enable row level security;
drop policy if exists "avis_lecture_publique" on public.reviews;
create policy "avis_lecture_publique" on public.reviews for select using (visible);

-- ───────────────────────── COORDONNÉES ─────────────────────────
create table if not exists public.ad_settings (
  id int primary key default 1 check (id = 1),
  whatsapp text, phone text, email text, address text,
  facebook text, tiktok text, instagram text, linkedin text
);
alter table public.ad_settings enable row level security;
drop policy if exists "reglages_lecture_publique" on public.ad_settings;
create policy "reglages_lecture_publique" on public.ad_settings for select using (true);
insert into public.ad_settings (id, whatsapp, phone, email, address)
  values (1, '22654412618', '+226 54 41 26 18', 'digitalamine3@gmail.com', 'Bobo-Dioulasso, Burkina Faso')
  on conflict (id) do nothing;

-- ───────────────────────── DEMANDES (formulaire de contact) ─────────────────────────
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null, email text, phone text, message text not null,
  handled boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.leads enable row level security;  -- aucune policy : illisible depuis le site

-- ───────────────────────── ADMINISTRATION ─────────────────────────
create table if not exists public.ad_admin (id int primary key default 1 check (id = 1), hash text not null);
alter table public.ad_admin enable row level security;
insert into public.ad_admin (id, hash) values (1, extensions.crypt('MOT_DE_PASSE_ADMIN', extensions.gen_salt('bf')))
  on conflict (id) do nothing;

create or replace function public.ad_auth(p_pass text) returns void
language plpgsql security definer set search_path = public, extensions as $$
begin
  if not exists (select 1 from public.ad_admin where hash = crypt(coalesce(p_pass, ''), hash)) then
    perform pg_sleep(1.5);
    raise exception 'acces refuse';
  end if;
end $$;
revoke all on function public.ad_auth(text) from public, anon, authenticated;

create or replace function public.admin_login(p_pass text) returns boolean
language plpgsql security definer set search_path = public, extensions as $$
begin perform public.ad_auth(p_pass); return true; end $$;

create or replace function public.admin_change_password(p_pass text, p_new text) returns void
language plpgsql security definer set search_path = public, extensions as $$
begin
  perform public.ad_auth(p_pass);
  if char_length(coalesce(p_new, '')) < 10 then raise exception 'mot de passe trop court'; end if;
  update public.ad_admin set hash = crypt(p_new, gen_salt('bf')) where id = 1;
end $$;

-- Équipe : soumission publique (via le lien d'invitation) -> toujours « en attente »
create or replace function public.submit_team_member(
  p_code text, p_name text, p_role text, p_grp text, p_bio text, p_photo text
) returns void
language plpgsql security definer set search_path = public, extensions as $$
begin
  if not exists (select 1 from public.team_invite where code = p_code) then
    raise exception 'invitation invalide';
  end if;
  insert into public.team_members (name, role, grp, bio, photo, status)
  values (trim(p_name), trim(p_role), p_grp, nullif(trim(coalesce(p_bio, '')), ''), p_photo, 'pending')
  on conflict (lower(name)) do update
    set role = excluded.role, grp = excluded.grp, bio = excluded.bio,
        photo = coalesce(excluded.photo, public.team_members.photo), status = 'pending';
end $$;

create or replace function public.admin_team_list(p_pass text) returns setof public.team_members
language plpgsql security definer set search_path = public, extensions as $$
begin
  perform public.ad_auth(p_pass);
  return query select * from public.team_members
    order by case status when 'pending' then 0 when 'approved' then 1 else 2 end, created_at desc;
end $$;

create or replace function public.admin_team_update(
  p_pass text, p_id uuid, p_status text, p_name text, p_role text, p_grp text, p_bio text
) returns void
language plpgsql security definer set search_path = public, extensions as $$
begin
  perform public.ad_auth(p_pass);
  update public.team_members set status = p_status, name = trim(p_name), role = trim(p_role), grp = p_grp,
    bio = nullif(trim(coalesce(p_bio, '')), '') where id = p_id;
end $$;

create or replace function public.admin_team_delete(p_pass text, p_id uuid) returns void
language plpgsql security definer set search_path = public, extensions as $$
begin perform public.ad_auth(p_pass); delete from public.team_members where id = p_id; end $$;

create or replace function public.admin_invite_get(p_pass text) returns text
language plpgsql security definer set search_path = public, extensions as $$
declare c text;
begin perform public.ad_auth(p_pass); select code into c from public.team_invite limit 1; return c; end $$;

create or replace function public.admin_invite_rotate(p_pass text) returns text
language plpgsql security definer set search_path = public, extensions as $$
declare c text := 'AD-' || upper(encode(gen_random_bytes(5), 'hex'));
begin
  perform public.ad_auth(p_pass);
  delete from public.team_invite where true;
  insert into public.team_invite (code) values (c);
  return c;
end $$;

-- Avis
create or replace function public.admin_review_list(p_pass text) returns setof public.reviews
language plpgsql security definer set search_path = public, extensions as $$
begin perform public.ad_auth(p_pass); return query select * from public.reviews order by created_at desc; end $$;

create or replace function public.admin_review_save(
  p_pass text, p_id uuid, p_name text, p_role text, p_service text, p_date text, p_text text, p_visible boolean
) returns void
language plpgsql security definer set search_path = public, extensions as $$
begin
  perform public.ad_auth(p_pass);
  if p_id is null then
    insert into public.reviews (name, role, service, date_label, text, visible)
    values (trim(p_name), nullif(trim(p_role), ''), nullif(trim(p_service), ''), nullif(trim(p_date), ''), trim(p_text), p_visible);
  else
    update public.reviews set name = trim(p_name), role = nullif(trim(p_role), ''), service = nullif(trim(p_service), ''),
      date_label = nullif(trim(p_date), ''), text = trim(p_text), visible = p_visible where id = p_id;
  end if;
end $$;

create or replace function public.admin_review_delete(p_pass text, p_id uuid) returns void
language plpgsql security definer set search_path = public, extensions as $$
begin perform public.ad_auth(p_pass); delete from public.reviews where id = p_id; end $$;

-- Coordonnées
create or replace function public.admin_settings_save(p_pass text, p_data jsonb) returns void
language plpgsql security definer set search_path = public, extensions as $$
begin
  perform public.ad_auth(p_pass);
  insert into public.ad_settings (id, whatsapp, phone, email, address, facebook, tiktok, instagram, linkedin)
  values (1, p_data->>'whatsapp', p_data->>'phone', p_data->>'email', p_data->>'address',
          nullif(p_data->>'facebook', ''), nullif(p_data->>'tiktok', ''), nullif(p_data->>'instagram', ''), nullif(p_data->>'linkedin', ''))
  on conflict (id) do update set whatsapp = excluded.whatsapp, phone = excluded.phone, email = excluded.email,
    address = excluded.address, facebook = excluded.facebook, tiktok = excluded.tiktok,
    instagram = excluded.instagram, linkedin = excluded.linkedin;
end $$;

-- Demandes : envoi public (limité) + gestion admin
create or replace function public.submit_lead(p_name text, p_email text, p_phone text, p_message text) returns void
language plpgsql security definer set search_path = public, extensions as $$
begin
  if char_length(trim(coalesce(p_name, ''))) < 2 or char_length(trim(coalesce(p_message, ''))) < 5
     or char_length(p_message) > 2000 or char_length(p_name) > 80 then
    raise exception 'donnees invalides';
  end if;
  if (select count(*) from public.leads where created_at > now() - interval '10 minutes') >= 30 then
    raise exception 'trop de demandes';
  end if;
  insert into public.leads (name, email, phone, message)
  values (trim(p_name), nullif(trim(coalesce(p_email, '')), ''), nullif(trim(coalesce(p_phone, '')), ''), trim(p_message));
end $$;

create or replace function public.admin_leads_list(p_pass text) returns setof public.leads
language plpgsql security definer set search_path = public, extensions as $$
begin perform public.ad_auth(p_pass); return query select * from public.leads order by handled, created_at desc; end $$;

create or replace function public.admin_lead_set(p_pass text, p_id uuid, p_handled boolean) returns void
language plpgsql security definer set search_path = public, extensions as $$
begin perform public.ad_auth(p_pass); update public.leads set handled = p_handled where id = p_id; end $$;

create or replace function public.admin_lead_delete(p_pass text, p_id uuid) returns void
language plpgsql security definer set search_path = public, extensions as $$
begin perform public.ad_auth(p_pass); delete from public.leads where id = p_id; end $$;

-- Droits d'appel : le site (clé publique) ne peut appeler que ces fonctions.
revoke all on function public.admin_login(text), public.admin_change_password(text, text), public.submit_team_member(text, text, text, text, text, text),
  public.admin_team_list(text), public.admin_team_update(text, uuid, text, text, text, text, text), public.admin_team_delete(text, uuid),
  public.admin_invite_get(text), public.admin_invite_rotate(text), public.admin_review_list(text),
  public.admin_review_save(text, uuid, text, text, text, text, text, boolean), public.admin_review_delete(text, uuid),
  public.admin_settings_save(text, jsonb), public.submit_lead(text, text, text, text), public.admin_leads_list(text),
  public.admin_lead_set(text, uuid, boolean), public.admin_lead_delete(text, uuid) from public;
grant execute on function public.admin_login(text), public.admin_change_password(text, text), public.submit_team_member(text, text, text, text, text, text),
  public.admin_team_list(text), public.admin_team_update(text, uuid, text, text, text, text, text), public.admin_team_delete(text, uuid),
  public.admin_invite_get(text), public.admin_invite_rotate(text), public.admin_review_list(text),
  public.admin_review_save(text, uuid, text, text, text, text, text, boolean), public.admin_review_delete(text, uuid),
  public.admin_settings_save(text, jsonb), public.submit_lead(text, text, text, text), public.admin_leads_list(text),
  public.admin_lead_set(text, uuid, boolean), public.admin_lead_delete(text, uuid) to anon;

-- Droits sur les tables : le site (rôle anon) peut seulement LIRE les fiches publiées, les avis visibles et les coordonnées.
-- Tout le reste passe par les fonctions ci-dessus.
revoke all on public.team_members, public.reviews, public.ad_settings, public.leads, public.team_invite, public.ad_admin from anon, authenticated;
grant select on public.team_members, public.reviews, public.ad_settings to anon;
