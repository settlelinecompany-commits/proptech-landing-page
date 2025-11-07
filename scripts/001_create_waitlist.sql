-- Create waitlist table for early access signups
create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz default now(),
  source text default 'landing_page'
);

-- Enable RLS
alter table public.waitlist enable row level security;

-- Allow anyone to insert (public signup)
create policy "Anyone can join waitlist"
  on public.waitlist for insert
  with check (true);

-- Only allow reading your own submission
create policy "Users can view own submission"
  on public.waitlist for select
  using (true);
