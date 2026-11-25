-- ============================================================================
-- Pescobar Seafood Bruxelles — core schema (Phase 1 admin)
-- Run in Supabase SQL Editor (idempotent). All tables are LOCKED to the
-- service_role: the browser (anon key) can never read or write them. The public
-- site reads through server-side code (service role) only.
-- ============================================================================

create extension if not exists "pgcrypto";

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

-- ----------------------------------------------------------------------------
-- 1. Admin whitelist
-- ----------------------------------------------------------------------------
create table if not exists public.admin_users (
  id          uuid primary key default gen_random_uuid(),
  email       text not null unique,
  full_name   text,
  role        text not null default 'admin' check (role in ('super_admin','admin','staff')),
  is_active   boolean not null default true,
  last_login  timestamptz,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
drop trigger if exists trg_admin_users_updated on public.admin_users;
create trigger trg_admin_users_updated before update on public.admin_users
  for each row execute function public.set_updated_at();

-- ----------------------------------------------------------------------------
-- 2. Audit log (who changed what, when)
-- ----------------------------------------------------------------------------
create table if not exists public.audit_log (
  id           bigserial primary key,
  at           timestamptz not null default now(),
  actor_email  text,
  action       text not null,          -- e.g. menu.save, menu.sold_out, reservation.status
  entity       text not null,          -- menu_item | menu_category | reservation | settings | admin_user
  entity_id    text,
  summary      text,
  diff         jsonb
);
create index if not exists idx_audit_log_at on public.audit_log (at desc);
create index if not exists idx_audit_log_entity on public.audit_log (entity, entity_id);

-- ----------------------------------------------------------------------------
-- 3. Restaurant settings (key -> jsonb document)
--    keys: identity, address, hours, social, delivery, reservation_rules,
--          closed_days, maintenance, announcement
-- ----------------------------------------------------------------------------
create table if not exists public.site_settings (
  key         text primary key,
  value       jsonb not null default '{}'::jsonb,
  updated_at  timestamptz not null default now(),
  updated_by  text
);
drop trigger if exists trg_site_settings_updated on public.site_settings;
create trigger trg_site_settings_updated before update on public.site_settings
  for each row execute function public.set_updated_at();

-- ----------------------------------------------------------------------------
-- 4. Menu
-- ----------------------------------------------------------------------------
create table if not exists public.menu_categories (
  id           text primary key,                       -- slug, e.g. 'plateaux'
  type         text not null check (type in ('food','drink')),
  names        jsonb not null default '{}'::jsonb,     -- {fr,nl,en,ro}
  subtitles    jsonb not null default '{}'::jsonb,     -- {fr,nl,en,ro}
  cover_image  text,
  sort_order   integer not null default 0,
  is_visible   boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
drop trigger if exists trg_menu_categories_updated on public.menu_categories;
create trigger trg_menu_categories_updated before update on public.menu_categories
  for each row execute function public.set_updated_at();

create table if not exists public.menu_items (
  id               text primary key,                   -- stable id (legacy menu.ts id on seed)
  legacy_post_id   text,
  category_id      text not null references public.menu_categories(id) on update cascade,
  type             text not null check (type in ('food','drink')),
  sort_order       integer not null default 0,

  -- availability: 'sold_out_today' only counts when sold_out_on = today (Europe/Brussels)
  status           text not null default 'available'
                     check (status in ('available','sold_out_today','hidden')),
  sold_out_on      date,

  -- translations
  names            jsonb not null default '{}'::jsonb, -- {fr,nl,en,ro}
  descriptions     jsonb not null default '{}'::jsonb,
  chef_notes       jsonb not null default '{}'::jsonb,
  ingredients      jsonb not null default '{}'::jsonb, -- {fr:[..],nl:[..],en:[..],ro:[..]}
  origin           jsonb not null default '{}'::jsonb, -- {fr,nl,en,ro}
  nutrition        jsonb not null default '{}'::jsonb, -- {fr,nl,en,ro}

  -- price / portions
  price_eur        numeric(8,2) not null default 0 check (price_eur >= 0),
  old_price_eur    numeric(8,2) check (old_price_eur is null or old_price_eur >= 0),
  vat_rate         smallint not null default 12 check (vat_rate in (6,12,21)),
  weight_value     numeric(10,2),
  weight_unit      text not null default 'g' check (weight_unit in ('g','kg','ml','cl','pcs','persons')),
  kcal             integer,
  variants         jsonb not null default '[]'::jsonb, -- [{id,label{4},weight_value,weight_unit,price_eur,status}]
  addons           jsonb not null default '[]'::jsonb, -- [{id,label{4},price_eur,is_available}]

  -- labels
  allergens        text[] not null default '{}',       -- 14 EU codes
  badges           text[] not null default '{}',       -- signature, chefs_choice, ...

  -- channels
  show_site            boolean not null default true,
  show_qr              boolean not null default true,
  show_takeaway        boolean not null default true,
  show_business_lunch  boolean not null default false,

  -- media
  image            text,
  gallery          text[] not null default '{}',
  clip_url         text,

  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  updated_by       text
);
create index if not exists idx_menu_items_category on public.menu_items (category_id, sort_order);
create index if not exists idx_menu_items_status on public.menu_items (status);
drop trigger if exists trg_menu_items_updated on public.menu_items;
create trigger trg_menu_items_updated before update on public.menu_items
  for each row execute function public.set_updated_at();

-- ----------------------------------------------------------------------------
-- 5. Table reservations
-- ----------------------------------------------------------------------------
create table if not exists public.reservations (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),

  reservation_date  date not null,
  reservation_time  time not null,
  service           text not null default 'dinner' check (service in ('lunch','dinner')),
  party_size        integer not null check (party_size between 1 and 60),
  zone              text not null default 'main' check (zone in ('main','window_terrace','lounge')),

  first_name        text not null,
  last_name         text not null,
  phone             text not null,
  email             text,
  occasion          text,
  notes             text,                              -- guest message / allergies
  locale            text not null default 'fr' check (locale in ('fr','nl','en','ro')),

  status            text not null default 'pending'
                      check (status in ('pending','confirmed','seated','completed','no_show','cancelled')),
  source            text not null default 'website',
  internal_notes    text,
  confirmed_at      timestamptz,
  updated_by        text
);
create index if not exists idx_reservations_date on public.reservations (reservation_date, reservation_time);
create index if not exists idx_reservations_status on public.reservations (status);
drop trigger if exists trg_reservations_updated on public.reservations;
create trigger trg_reservations_updated before update on public.reservations
  for each row execute function public.set_updated_at();

-- ----------------------------------------------------------------------------
-- 6. LOCKDOWN: RLS on, no anon/authenticated access, service_role only
-- ----------------------------------------------------------------------------
do $$
declare
  tbl text;
  pol record;
  tables text[] := array['admin_users','audit_log','site_settings','menu_categories','menu_items','reservations'];
begin
  foreach tbl in array tables loop
    for pol in select policyname from pg_policies where schemaname = 'public' and tablename = tbl loop
      execute format('drop policy if exists %I on public.%I', pol.policyname, tbl);
    end loop;
    execute format('alter table public.%I enable row level security', tbl);
    execute format('revoke all on table public.%I from public, anon, authenticated', tbl);
    execute format('grant all on table public.%I to service_role', tbl);
    execute format(
      'create policy %I on public.%I for all to service_role using (true) with check (true)',
      'service_role_full_access_' || tbl, tbl
    );
  end loop;
end $$;

grant usage, select on all sequences in schema public to service_role;

-- ----------------------------------------------------------------------------
-- 7. Pre-approved admins. Password is set in Supabase Auth:
--    Authentication > Users > Add user (email + password, auto-confirm).
-- ----------------------------------------------------------------------------
insert into public.admin_users (email, full_name, role)
values 
  ('pescobarbrussels@gmail.com', 'Pescobar Brussels Owner', 'super_admin'),
  ('pescobarseafoodbrussels@gmail.com', 'Pescobar Seafood Brussels', 'super_admin')
on conflict (email) do nothing;

