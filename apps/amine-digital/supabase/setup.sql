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


-- ═══════════════════════════════════════════════════════════════════
-- MODULE 2 — publications, réalisations, FAQ, tarifs, statistiques, devis
-- ═══════════════════════════════════════════════════════════════════

-- ───────────────────────── PUBLICATIONS (affiches ajoutées depuis l'admin) ─────────────────────────
create table if not exists public.publications (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9-]{2,80}$'),
  title text not null check (char_length(title) between 3 and 140),
  category text not null check (category in ('Formation', 'Service', 'Actualité')),
  excerpt text not null check (char_length(excerpt) between 5 and 300),
  price text check (char_length(price) <= 80),
  intro text not null default '' check (char_length(intro) <= 1200),
  points jsonb not null default '[]'::jsonb,
  service_slug text,
  image text not null check (image ~ '^(data:image/(jpeg|png|webp);base64,|/assets/)' and char_length(image) <= 700000),
  alt text,
  w int not null default 1000 check (w between 100 and 4000),
  h int not null default 1000 check (h between 100 and 4000),
  visible boolean not null default true,
  created_at timestamptz not null default now()
);
alter table public.publications enable row level security;
drop policy if exists "publications_lecture_publique" on public.publications;
create policy "publications_lecture_publique" on public.publications for select using (visible);

-- ───────────────────────── RÉALISATIONS ─────────────────────────
create table if not exists public.realisations (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 3 and 120),
  client text check (char_length(client) <= 100),
  sector text check (char_length(sector) <= 80),
  description text not null check (char_length(description) between 5 and 800),
  result text check (char_length(result) <= 300),
  link text check (link is null or link ~ '^https?://'),
  tags jsonb not null default '[]'::jsonb,
  image text check (image is null or (image ~ '^(data:image/(jpeg|png|webp);base64,|/assets/)' and char_length(image) <= 700000)),
  visible boolean not null default true,
  position int not null default 0,
  created_at timestamptz not null default now()
);
alter table public.realisations add column if not exists kind text check (kind in ('client', 'saas', 'interne', 'personnel'));
alter table public.realisations add column if not exists status text check (status in ('en_ligne', 'en_developpement', 'prototype'));
alter table public.realisations add column if not exists long_desc text check (char_length(long_desc) <= 4000);
alter table public.realisations add column if not exists features jsonb not null default '[]'::jsonb;
alter table public.realisations add column if not exists stack jsonb not null default '[]'::jsonb;
alter table public.realisations add column if not exists gallery jsonb not null default '[]'::jsonb;
alter table public.realisations drop constraint if exists realisations_image_check;
alter table public.realisations add constraint realisations_image_check
  check (image is null or (image ~ '^(data:image/(jpeg|png|webp);base64,|/assets/|https://)' and char_length(image) <= 700000));
alter table public.realisations enable row level security;
drop policy if exists "realisations_lecture_publique" on public.realisations;
create policy "realisations_lecture_publique" on public.realisations for select using (visible);

-- ───────────────────────── FAQ ─────────────────────────
create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null check (char_length(question) between 5 and 200),
  answer text not null check (char_length(answer) between 5 and 1200),
  position int not null default 0,
  visible boolean not null default true,
  created_at timestamptz not null default now()
);
alter table public.faqs enable row level security;
drop policy if exists "faq_lecture_publique" on public.faqs;
create policy "faq_lecture_publique" on public.faqs for select using (visible);

insert into public.faqs (question, answer, position)
select q, a, p from (values
  ('Combien de temps faut-il pour avoir son site ?', 'Un site vitrine de la formule Starter est livré en 5 à 7 jours.', 1),
  ('Le nom de domaine est-il inclus ?', 'Oui : la formule Starter comprend un nom de domaine pour 1 an.', 2),
  ('Puis-je vendre en ligne avec Mobile Money ?', 'Oui. La formule Pro inclut une boutique en ligne avec paiement Mobile Money.', 3),
  ('Pourrai-je gérer mon site moi-même ?', 'Oui. Nos sites sont pensés pour rester faciles à gérer une fois livrés, et nous restons disponibles en cas de besoin.', 4),
  ('Y a-t-il un suivi après la livraison ?', 'La formule Pro inclut 1 mois de support. Pour les applications mobiles, nous proposons aussi la maintenance et les mises à jour.', 5),
  ('Comment obtenir un devis ?', 'Remplissez la page Devis ou écrivez-nous sur WhatsApp : nous revenons vers vous avec une proposition adaptée à votre projet et à votre budget.', 6)
) as t(q, a, p)
where not exists (select 1 from public.faqs);

-- ───────────────────────── TARIFS ─────────────────────────
create table if not exists public.plans (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 60),
  price text not null check (char_length(price) between 1 and 80),
  tagline text check (char_length(tagline) <= 120),
  features jsonb not null default '[]'::jsonb,
  highlight boolean not null default false,
  position int not null default 0,
  visible boolean not null default true,
  created_at timestamptz not null default now()
);
alter table public.plans enable row level security;
drop policy if exists "tarifs_lecture_publique" on public.plans;
create policy "tarifs_lecture_publique" on public.plans for select using (visible);

insert into public.plans (name, price, tagline, features, highlight, position)
select * from (values
  ('Starter', '20 000 FCFA', 'Pour démarrer en ligne',
   '["Site vitrine (jusqu''à 5 pages)", "Design responsive mobile", "Nom de domaine (1 an)", "Livraison en 5-7 jours"]'::jsonb, false, 1),
  ('Pro', '50 000 FCFA', 'Pour vendre en ligne',
   '["Tout Starter, plus :", "Boutique en ligne + Mobile Money", "Réseaux sociaux configurés", "Support 1 mois inclus"]'::jsonb, true, 2),
  ('Sur-mesure', 'À partir de 100 000 FCFA', 'Application, automatisation, projet spécifique',
   '["Application mobile ou web métier", "Automatisation / IA", "Accompagnement complet", "Devis personnalisé"]'::jsonb, false, 3)
) as t(name, price, tagline, features, highlight, position)
where not exists (select 1 from public.plans);

-- ───────────────────────── DEMANDES : type + détails (devis) ─────────────────────────
alter table public.leads add column if not exists kind text not null default 'contact';
alter table public.leads add column if not exists details jsonb;

-- ───────────────────────── STATISTIQUES ─────────────────────────
create table if not exists public.events (
  id bigint generated always as identity primary key,
  type text not null check (type in ('page_view', 'whatsapp')),
  label text not null check (char_length(label) <= 120),
  created_at timestamptz not null default now()
);
create index if not exists events_created_idx on public.events (created_at);
alter table public.events enable row level security;  -- aucune policy : illisible depuis le site

create or replace function public.track_event(p_type text, p_label text) returns void
language plpgsql security definer set search_path = public, extensions as $$
begin
  if p_type not in ('page_view', 'whatsapp') then return; end if;
  if (select count(*) from public.events where created_at > now() - interval '1 minute') >= 600 then return; end if;
  insert into public.events (type, label) values (p_type, left(coalesce(p_label, '/'), 120));
end $$;

create or replace function public.admin_stats(p_pass text, p_days int) returns jsonb
language plpgsql security definer set search_path = public, extensions as $$
declare since timestamptz := now() - make_interval(days => greatest(1, least(coalesce(p_days, 30), 365)));
begin
  perform public.ad_auth(p_pass);
  return jsonb_build_object(
    'views', (select count(*) from public.events where type = 'page_view' and created_at >= since),
    'whatsapp', (select count(*) from public.events where type = 'whatsapp' and created_at >= since),
    'contacts', (select count(*) from public.leads where kind = 'contact' and created_at >= since),
    'quotes', (select count(*) from public.leads where kind = 'devis' and created_at >= since),
    'top_pages', (select coalesce(jsonb_agg(x), '[]'::jsonb) from (
      select label, count(*) as n from public.events where type = 'page_view' and created_at >= since group by label order by n desc limit 8) x),
    'wa_pages', (select coalesce(jsonb_agg(x), '[]'::jsonb) from (
      select label, count(*) as n from public.events where type = 'whatsapp' and created_at >= since group by label order by n desc limit 8) x),
    'daily', (select coalesce(jsonb_agg(x order by x.d), '[]'::jsonb) from (
      select created_at::date as d, count(*) filter (where type = 'page_view') as v, count(*) filter (where type = 'whatsapp') as w
      from public.events where created_at >= since group by 1) x)
  );
end $$;

-- ───────────────────────── DEVIS (envoi public, limité) ─────────────────────────
create or replace function public.submit_quote(
  p_name text, p_phone text, p_email text, p_type text, p_budget text, p_deadline text, p_message text
) returns void
language plpgsql security definer set search_path = public, extensions as $$
declare msg text;
begin
  if char_length(trim(coalesce(p_name, ''))) < 2 or char_length(p_name) > 80
     or char_length(coalesce(p_message, '')) > 2000
     or char_length(trim(coalesce(p_phone, ''))) + char_length(trim(coalesce(p_email, ''))) < 5 then
    raise exception 'donnees invalides';
  end if;
  if (select count(*) from public.leads where created_at > now() - interval '10 minutes') >= 30 then
    raise exception 'trop de demandes';
  end if;
  msg := 'Demande de devis : ' || left(coalesce(nullif(trim(p_type), ''), 'Non précisé'), 80)
      || E'\nBudget : ' || left(coalesce(nullif(trim(p_budget), ''), 'Non précisé'), 60)
      || E'\nDélai : ' || left(coalesce(nullif(trim(p_deadline), ''), 'Non précisé'), 60)
      || case when char_length(trim(coalesce(p_message, ''))) > 0 then E'\n\n' || trim(p_message) else '' end;
  insert into public.leads (name, email, phone, message, kind, details)
  values (trim(p_name), nullif(trim(coalesce(p_email, '')), ''), nullif(trim(coalesce(p_phone, '')), ''), msg, 'devis',
          jsonb_build_object('type', left(p_type, 80), 'budget', left(p_budget, 60), 'deadline', left(p_deadline, 60)));
end $$;

-- ───────────────────────── Fonctions d'administration (listes, enregistrement, suppression) ─────────────────────────
create or replace function public.admin_publication_list(p_pass text) returns setof public.publications
language plpgsql security definer set search_path = public, extensions as $$
begin perform public.ad_auth(p_pass); return query select * from public.publications order by created_at desc; end $$;

create or replace function public.admin_publication_save(p_pass text, p_id uuid, p_data jsonb) returns void
language plpgsql security definer set search_path = public, extensions as $$
declare s text;
begin
  perform public.ad_auth(p_pass);
  if p_id is null then
    s := left(trim(both '-' from regexp_replace(lower(translate(coalesce(p_data->>'title', ''), 'àâäéèêëîïôöùûüçÀÂÉÈÊÎÔÙÛÇ', 'aaaeeeeiioouuucaaeeeiouuc')), '[^a-z0-9]+', '-', 'g')), 60);
    if s = '' then s := 'publication'; end if;
    if exists (select 1 from public.publications where slug = s) then s := s || '-' || substr(encode(gen_random_bytes(3), 'hex'), 1, 5); end if;
    insert into public.publications (slug, title, category, excerpt, price, intro, points, service_slug, image, alt, w, h, visible)
    values (s, trim(p_data->>'title'), p_data->>'category', trim(p_data->>'excerpt'), nullif(trim(coalesce(p_data->>'price', '')), ''),
            trim(coalesce(p_data->>'intro', '')),
            case when jsonb_typeof(p_data->'points') = 'array' then p_data->'points' else '[]'::jsonb end,
            nullif(trim(coalesce(p_data->>'service_slug', '')), ''), p_data->>'image',
            coalesce(nullif(trim(coalesce(p_data->>'alt', '')), ''), 'Affiche AMINE DIGITAL : ' || trim(p_data->>'title')),
            coalesce((p_data->>'w')::int, 1000), coalesce((p_data->>'h')::int, 1000), coalesce((p_data->>'visible')::boolean, true));
  else
    update public.publications set
      title = trim(p_data->>'title'), category = p_data->>'category', excerpt = trim(p_data->>'excerpt'),
      price = nullif(trim(coalesce(p_data->>'price', '')), ''), intro = trim(coalesce(p_data->>'intro', '')),
      points = case when jsonb_typeof(p_data->'points') = 'array' then p_data->'points' else '[]'::jsonb end,
      service_slug = nullif(trim(coalesce(p_data->>'service_slug', '')), ''),
      image = coalesce(nullif(p_data->>'image', ''), image),
      w = case when nullif(p_data->>'image', '') is null then w else coalesce((p_data->>'w')::int, w) end,
      h = case when nullif(p_data->>'image', '') is null then h else coalesce((p_data->>'h')::int, h) end,
      alt = coalesce(nullif(trim(coalesce(p_data->>'alt', '')), ''), alt),
      visible = coalesce((p_data->>'visible')::boolean, visible)
    where id = p_id;
  end if;
end $$;

create or replace function public.admin_publication_delete(p_pass text, p_id uuid) returns void
language plpgsql security definer set search_path = public, extensions as $$
begin perform public.ad_auth(p_pass); delete from public.publications where id = p_id; end $$;

create or replace function public.admin_realisation_list(p_pass text) returns setof public.realisations
language plpgsql security definer set search_path = public, extensions as $$
begin perform public.ad_auth(p_pass); return query select * from public.realisations order by position, created_at desc; end $$;

create or replace function public.admin_realisation_save(p_pass text, p_id uuid, p_data jsonb) returns void
language plpgsql security definer set search_path = public, extensions as $$
declare g jsonb := case when jsonb_typeof(p_data->'gallery') = 'array' then p_data->'gallery' else null end;
begin
  perform public.ad_auth(p_pass);
  if g is not null and (jsonb_array_length(g) > 4 or exists (
       select 1 from jsonb_array_elements_text(g) x where x !~ '^(data:image/(jpeg|png|webp);base64,|https://)' or char_length(x) > 700000)) then
    raise exception 'galerie invalide';
  end if;
  if p_id is null then
    insert into public.realisations (title, client, sector, description, long_desc, result, link, tags, features, stack, gallery, image, kind, status, visible, position)
    values (trim(p_data->>'title'), nullif(trim(coalesce(p_data->>'client', '')), ''), nullif(trim(coalesce(p_data->>'sector', '')), ''),
            trim(p_data->>'description'), nullif(trim(coalesce(p_data->>'long_desc', '')), ''),
            nullif(trim(coalesce(p_data->>'result', '')), ''), nullif(trim(coalesce(p_data->>'link', '')), ''),
            case when jsonb_typeof(p_data->'tags') = 'array' then p_data->'tags' else '[]'::jsonb end,
            case when jsonb_typeof(p_data->'features') = 'array' then p_data->'features' else '[]'::jsonb end,
            case when jsonb_typeof(p_data->'stack') = 'array' then p_data->'stack' else '[]'::jsonb end,
            coalesce(g, '[]'::jsonb), nullif(p_data->>'image', ''), nullif(p_data->>'kind', ''), nullif(p_data->>'status', ''),
            coalesce((p_data->>'visible')::boolean, true), coalesce((p_data->>'position')::int, 0));
  else
    update public.realisations set
      title = trim(p_data->>'title'), client = nullif(trim(coalesce(p_data->>'client', '')), ''), sector = nullif(trim(coalesce(p_data->>'sector', '')), ''),
      description = trim(p_data->>'description'), long_desc = nullif(trim(coalesce(p_data->>'long_desc', '')), ''),
      result = nullif(trim(coalesce(p_data->>'result', '')), ''), link = nullif(trim(coalesce(p_data->>'link', '')), ''),
      tags = case when jsonb_typeof(p_data->'tags') = 'array' then p_data->'tags' else '[]'::jsonb end,
      features = case when jsonb_typeof(p_data->'features') = 'array' then p_data->'features' else '[]'::jsonb end,
      stack = case when jsonb_typeof(p_data->'stack') = 'array' then p_data->'stack' else '[]'::jsonb end,
      gallery = coalesce(g, gallery),
      image = case when p_data ? 'image' then coalesce(nullif(p_data->>'image', ''), image) else image end,
      kind = nullif(p_data->>'kind', ''), status = nullif(p_data->>'status', ''),
      visible = coalesce((p_data->>'visible')::boolean, visible), position = coalesce((p_data->>'position')::int, position)
    where id = p_id;
  end if;
end $$;

create or replace function public.admin_realisation_delete(p_pass text, p_id uuid) returns void
language plpgsql security definer set search_path = public, extensions as $$
begin perform public.ad_auth(p_pass); delete from public.realisations where id = p_id; end $$;

create or replace function public.admin_faq_list(p_pass text) returns setof public.faqs
language plpgsql security definer set search_path = public, extensions as $$
begin perform public.ad_auth(p_pass); return query select * from public.faqs order by position, created_at; end $$;

create or replace function public.admin_faq_save(p_pass text, p_id uuid, p_data jsonb) returns void
language plpgsql security definer set search_path = public, extensions as $$
begin
  perform public.ad_auth(p_pass);
  if p_id is null then
    insert into public.faqs (question, answer, position, visible)
    values (trim(p_data->>'question'), trim(p_data->>'answer'),
            coalesce((p_data->>'position')::int, (select coalesce(max(position), 0) + 1 from public.faqs)), coalesce((p_data->>'visible')::boolean, true));
  else
    update public.faqs set question = trim(p_data->>'question'), answer = trim(p_data->>'answer'),
      position = coalesce((p_data->>'position')::int, position), visible = coalesce((p_data->>'visible')::boolean, visible) where id = p_id;
  end if;
end $$;

create or replace function public.admin_faq_delete(p_pass text, p_id uuid) returns void
language plpgsql security definer set search_path = public, extensions as $$
begin perform public.ad_auth(p_pass); delete from public.faqs where id = p_id; end $$;

create or replace function public.admin_plan_list(p_pass text) returns setof public.plans
language plpgsql security definer set search_path = public, extensions as $$
begin perform public.ad_auth(p_pass); return query select * from public.plans order by position, created_at; end $$;

create or replace function public.admin_plan_save(p_pass text, p_id uuid, p_data jsonb) returns void
language plpgsql security definer set search_path = public, extensions as $$
begin
  perform public.ad_auth(p_pass);
  if p_id is null then
    insert into public.plans (name, price, tagline, features, highlight, position, visible)
    values (trim(p_data->>'name'), trim(p_data->>'price'), nullif(trim(coalesce(p_data->>'tagline', '')), ''),
            case when jsonb_typeof(p_data->'features') = 'array' then p_data->'features' else '[]'::jsonb end,
            coalesce((p_data->>'highlight')::boolean, false),
            coalesce((p_data->>'position')::int, (select coalesce(max(position), 0) + 1 from public.plans)), coalesce((p_data->>'visible')::boolean, true));
  else
    update public.plans set name = trim(p_data->>'name'), price = trim(p_data->>'price'), tagline = nullif(trim(coalesce(p_data->>'tagline', '')), ''),
      features = case when jsonb_typeof(p_data->'features') = 'array' then p_data->'features' else '[]'::jsonb end,
      highlight = coalesce((p_data->>'highlight')::boolean, highlight), position = coalesce((p_data->>'position')::int, position),
      visible = coalesce((p_data->>'visible')::boolean, visible) where id = p_id;
  end if;
end $$;

create or replace function public.admin_plan_delete(p_pass text, p_id uuid) returns void
language plpgsql security definer set search_path = public, extensions as $$
begin perform public.ad_auth(p_pass); delete from public.plans where id = p_id; end $$;

-- Droits du module 2
revoke all on function
  public.track_event(text, text), public.admin_stats(text, int),
  public.submit_quote(text, text, text, text, text, text, text),
  public.admin_publication_list(text), public.admin_publication_save(text, uuid, jsonb), public.admin_publication_delete(text, uuid),
  public.admin_realisation_list(text), public.admin_realisation_save(text, uuid, jsonb), public.admin_realisation_delete(text, uuid),
  public.admin_faq_list(text), public.admin_faq_save(text, uuid, jsonb), public.admin_faq_delete(text, uuid),
  public.admin_plan_list(text), public.admin_plan_save(text, uuid, jsonb), public.admin_plan_delete(text, uuid)
from public;
grant execute on function
  public.track_event(text, text), public.admin_stats(text, int),
  public.submit_quote(text, text, text, text, text, text, text),
  public.admin_publication_list(text), public.admin_publication_save(text, uuid, jsonb), public.admin_publication_delete(text, uuid),
  public.admin_realisation_list(text), public.admin_realisation_save(text, uuid, jsonb), public.admin_realisation_delete(text, uuid),
  public.admin_faq_list(text), public.admin_faq_save(text, uuid, jsonb), public.admin_faq_delete(text, uuid),
  public.admin_plan_list(text), public.admin_plan_save(text, uuid, jsonb), public.admin_plan_delete(text, uuid)
to anon;

revoke all on public.publications, public.realisations, public.faqs, public.plans, public.events from anon, authenticated;
grant select on public.publications, public.realisations, public.faqs, public.plans to anon;

-- ───────────────────────── Module 3 : candidatures détaillées (privées) ─────────────────────────
-- Aucune lecture publique : seules les fonctions admin_application_* (mot de passe requis) lisent ces données.
create table if not exists public.team_applications (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 100),
  phone text check (char_length(phone) <= 40),
  email text check (char_length(email) <= 120),
  role text check (char_length(role) <= 120),
  status text not null default 'nouvelle' check (status in ('nouvelle', 'a_contacter', 'entretien', 'accepte', 'refuse')),
  note text check (char_length(note) <= 2000),
  data jsonb not null default '{}'::jsonb check (pg_column_size(data) <= 40000),
  created_at timestamptz not null default now()
);
alter table public.team_applications enable row level security;
revoke all on public.team_applications from anon, authenticated;

create or replace function public.submit_team_application(p_code text, p_data jsonb) returns void
language plpgsql security definer set search_path = public, extensions as $$
begin
  if not exists (select 1 from public.team_invite where code = p_code) then raise exception 'invitation invalide'; end if;
  if jsonb_typeof(p_data) <> 'object'
     or char_length(trim(coalesce(p_data->>'name', ''))) < 2
     or char_length(trim(coalesce(p_data->>'phone', ''))) < 6
     or char_length(trim(coalesce(p_data->>'role', ''))) < 2
     or pg_column_size(p_data) > 40000 then
    raise exception 'donnees invalides';
  end if;
  if (select count(*) from public.team_applications where created_at > now() - interval '10 minutes') >= 30 then
    raise exception 'trop de demandes';
  end if;
  insert into public.team_applications (name, phone, email, role, data)
  values (left(trim(p_data->>'name'), 100), left(trim(p_data->>'phone'), 40), nullif(left(trim(coalesce(p_data->>'email', '')), 120), ''),
          left(trim(p_data->>'role'), 120), p_data);
end $$;

create or replace function public.admin_application_list(p_pass text) returns setof public.team_applications
language plpgsql security definer set search_path = public, extensions as $$
begin
  perform public.ad_auth(p_pass);
  return query select * from public.team_applications
    order by case status when 'nouvelle' then 0 when 'a_contacter' then 1 when 'entretien' then 2 else 3 end, created_at desc;
end $$;

create or replace function public.admin_application_update(p_pass text, p_id uuid, p_status text, p_note text) returns void
language plpgsql security definer set search_path = public, extensions as $$
begin
  perform public.ad_auth(p_pass);
  update public.team_applications set status = p_status, note = nullif(trim(coalesce(p_note, '')), '') where id = p_id;
end $$;

create or replace function public.admin_application_delete(p_pass text, p_id uuid) returns void
language plpgsql security definer set search_path = public, extensions as $$
begin perform public.ad_auth(p_pass); delete from public.team_applications where id = p_id; end $$;

revoke all on function public.submit_team_application(text, jsonb), public.admin_application_list(text),
  public.admin_application_update(text, uuid, text, text), public.admin_application_delete(text, uuid) from public;
grant execute on function public.submit_team_application(text, jsonb), public.admin_application_list(text),
  public.admin_application_update(text, uuid, text, text), public.admin_application_delete(text, uuid) to anon;

-- Fichiers de preuve (photos, vidéos, PDF…) : dépôt réservé aux porteurs du lien d'invitation, 50 Mo maximum par fichier.
create or replace function public.is_invite(p_code text) returns boolean
language sql security definer stable set search_path = public as $$
  select exists (select 1 from public.team_invite where code = p_code)
$$;
revoke all on function public.is_invite(text) from public;
grant execute on function public.is_invite(text) to anon;

do $$
begin
  if to_regclass('storage.buckets') is not null then
    insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
    values ('candidatures', 'candidatures', true, 52428800, array[
      'image/*', 'video/*', 'audio/*', 'application/pdf', 'application/zip', 'text/plain',
      'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'])
    on conflict (id) do update set public = true, file_size_limit = 52428800, allowed_mime_types = excluded.allowed_mime_types;
    drop policy if exists "candidatures_depot" on storage.objects;
    create policy "candidatures_depot" on storage.objects for insert to anon
      with check (bucket_id = 'candidatures' and public.is_invite((storage.foldername(name))[1]));
  end if;
end $$;

-- ───────────────────────── Module 4 : photos et vidéos dans les publications ─────────────────────────
alter table public.publications add column if not exists media jsonb not null default '[]'::jsonb;
alter table public.publications drop constraint if exists publications_media_check;
alter table public.publications add constraint publications_media_check check (jsonb_typeof(media) = 'array' and jsonb_array_length(media) <= 12 and pg_column_size(media) <= 12000);
do $$
declare c text;
begin
  for c in select conname from pg_constraint where conrelid = 'public.publications'::regclass and contype = 'c' and pg_get_constraintdef(oid) like '%data:image%' loop
    execute format('alter table public.publications drop constraint %I', c);
  end loop;
end $$;
alter table public.publications add constraint publications_image_check
  check (image ~ '^(data:image/(jpeg|png|webp);base64,|/assets/|https://)' and char_length(image) <= 700000);

-- Jeton d'envoi : l'admin en demande un (mot de passe requis), valable 3 heures. Il autorise l'envoi de fichiers vers le stockage.
create table if not exists public.upload_tokens (token text primary key, expires_at timestamptz not null);
alter table public.upload_tokens enable row level security;
revoke all on public.upload_tokens from anon, authenticated;

create or replace function public.admin_upload_token(p_pass text) returns text
language plpgsql security definer set search_path = public, extensions as $$
declare t text := encode(gen_random_bytes(12), 'hex');
begin
  perform public.ad_auth(p_pass);
  delete from public.upload_tokens where expires_at < now();
  insert into public.upload_tokens values (t, now() + interval '3 hours');
  return t;
end $$;

create or replace function public.is_upload_token(p text) returns boolean
language sql security definer stable set search_path = public as $$
  select exists (select 1 from public.upload_tokens where token = p and expires_at > now())
$$;
revoke all on function public.admin_upload_token(text), public.is_upload_token(text) from public;
grant execute on function public.admin_upload_token(text), public.is_upload_token(text) to anon;

do $$
begin
  if to_regclass('storage.buckets') is not null then
    insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
    values ('publications', 'publications', true, 52428800, array['image/*', 'video/*'])
    on conflict (id) do update set public = true, file_size_limit = 52428800, allowed_mime_types = excluded.allowed_mime_types;
    drop policy if exists "publications_depot" on storage.objects;
    create policy "publications_depot" on storage.objects for insert to anon
      with check (bucket_id = 'publications' and public.is_upload_token((storage.foldername(name))[1]));
  end if;
end $$;

-- Sauvegarde d'une publication avec médias (remplace la version précédente)
create or replace function public.admin_publication_save(p_pass text, p_id uuid, p_data jsonb) returns void
language plpgsql security definer set search_path = public, extensions as $$
declare s text; m jsonb := '[]'::jsonb; it jsonb;
begin
  perform public.ad_auth(p_pass);
  if jsonb_typeof(p_data->'media') = 'array' then
    for it in select * from jsonb_array_elements(p_data->'media') loop
      if (it->>'type') not in ('image', 'video', 'embed') or coalesce(it->>'url', '') !~ '^https://' or char_length(it->>'url') > 500 then
        raise exception 'media invalide';
      end if;
      m := m || jsonb_build_array(jsonb_build_object('type', it->>'type', 'url', it->>'url'));
    end loop;
  end if;
  if p_id is null then
    s := left(trim(both '-' from regexp_replace(lower(translate(coalesce(p_data->>'title', ''), 'àâäéèêëîïôöùûüçÀÂÉÈÊÎÔÙÛÇ', 'aaaeeeeiioouuucaaeeeiouuc')), '[^a-z0-9]+', '-', 'g')), 60);
    if s = '' then s := 'publication'; end if;
    if exists (select 1 from public.publications where slug = s) then s := s || '-' || substr(encode(gen_random_bytes(3), 'hex'), 1, 5); end if;
    insert into public.publications (slug, title, category, excerpt, price, intro, points, service_slug, image, alt, w, h, visible, media)
    values (s, trim(p_data->>'title'), p_data->>'category', trim(p_data->>'excerpt'), nullif(trim(coalesce(p_data->>'price', '')), ''),
            trim(coalesce(p_data->>'intro', '')),
            case when jsonb_typeof(p_data->'points') = 'array' then p_data->'points' else '[]'::jsonb end,
            nullif(trim(coalesce(p_data->>'service_slug', '')), ''), p_data->>'image',
            coalesce(nullif(trim(coalesce(p_data->>'alt', '')), ''), 'Publication AMINE DIGITAL : ' || trim(p_data->>'title')),
            coalesce((p_data->>'w')::int, 1000), coalesce((p_data->>'h')::int, 1000), coalesce((p_data->>'visible')::boolean, true), m);
  else
    update public.publications set
      title = trim(p_data->>'title'), category = p_data->>'category', excerpt = trim(p_data->>'excerpt'),
      price = nullif(trim(coalesce(p_data->>'price', '')), ''), intro = trim(coalesce(p_data->>'intro', '')),
      points = case when jsonb_typeof(p_data->'points') = 'array' then p_data->'points' else '[]'::jsonb end,
      service_slug = nullif(trim(coalesce(p_data->>'service_slug', '')), ''),
      image = coalesce(nullif(p_data->>'image', ''), image),
      w = case when nullif(p_data->>'image', '') is null then w else coalesce((p_data->>'w')::int, w) end,
      h = case when nullif(p_data->>'image', '') is null then h else coalesce((p_data->>'h')::int, h) end,
      alt = coalesce(nullif(trim(coalesce(p_data->>'alt', '')), ''), alt),
      visible = coalesce((p_data->>'visible')::boolean, visible),
      media = case when p_data ? 'media' then m else media end
    where id = p_id;
  end if;
end $$;
