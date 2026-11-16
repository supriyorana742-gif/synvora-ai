-- Run this once in the Supabase SQL editor.
-- Leads are written only by the server using the service-role key.

create table if not exists public.leads (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  full_name    text not null,
  email        text not null,
  company      text not null,
  industry     text not null,
  service      text not null,
  budget       text not null,
  description  text not null,
  status       text not null default 'new',
  ip           text,
  user_agent   text
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);

-- Row Level Security on, with no policies: the public anon key cannot read or write leads.
-- The service-role key used by the Next.js API route bypasses RLS.
alter table public.leads enable row level security;
