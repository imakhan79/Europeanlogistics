-- European RouteWise: initial multi-tenant schema
-- Apply via `supabase db push` or the Supabase SQL editor.

create table if not exists organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  country text,
  created_at timestamptz not null default now()
);

create type user_role as enum (
  'super_admin',
  'company_admin',
  'fleet_manager',
  'dispatcher',
  'compliance_manager',
  'driver',
  'finance_manager',
  'customer'
);

create table if not exists profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  organization_id uuid references organizations (id) on delete cascade,
  role user_role not null default 'company_admin',
  full_name text,
  created_at timestamptz not null default now()
);

create table if not exists vehicles (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations (id) on delete cascade,
  registration text not null,
  make_model text,
  euro_class text,
  status text not null default 'idle',
  created_at timestamptz not null default now()
);

create table if not exists drivers (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations (id) on delete cascade,
  full_name text not null,
  country text,
  license_number text,
  status text not null default 'off_duty',
  created_at timestamptz not null default now()
);

create table if not exists shipments (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations (id) on delete cascade,
  vehicle_id uuid references vehicles (id),
  driver_id uuid references drivers (id),
  origin text,
  destination text,
  status text not null default 'draft',
  eta timestamptz,
  created_at timestamptz not null default now()
);

alter table organizations enable row level security;
alter table profiles enable row level security;
alter table vehicles enable row level security;
alter table drivers enable row level security;
alter table shipments enable row level security;

create policy "profiles: read own" on profiles
  for select using (id = auth.uid());

create policy "org-scoped: vehicles" on vehicles
  for all using (
    organization_id in (select organization_id from profiles where id = auth.uid())
  );

create policy "org-scoped: drivers" on drivers
  for all using (
    organization_id in (select organization_id from profiles where id = auth.uid())
  );

create policy "org-scoped: shipments" on shipments
  for all using (
    organization_id in (select organization_id from profiles where id = auth.uid())
  );
