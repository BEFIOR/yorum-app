-- Supabase Migration: searches ve analyses tabloları

create table public.searches (
  id uuid default gen_random_uuid() primary key,
  hotel_name text not null,
  hotel_place_id text not null,
  hotel_address text not null,
  hotel_rating numeric(2,1),
  created_at timestamptz default now() not null
);

create table public.analyses (
  id uuid default gen_random_uuid() primary key,
  search_id uuid references public.searches(id) on delete cascade not null,
  analysis_text text not null,
  raw_reviews jsonb not null default '[]'::jsonb,
  created_at timestamptz default now() not null
);

create index idx_searches_created_at on public.searches(created_at desc);
create index idx_analyses_search_id on public.analyses(search_id);

alter table public.searches enable row level security;
alter table public.analyses enable row level security;

create policy "Allow public read on searches" on public.searches for select using (true);
create policy "Allow public insert on searches" on public.searches for insert with check (true);

create policy "Allow public read on analyses" on public.analyses for select using (true);
create policy "Allow public insert on analyses" on public.analyses for insert with check (true);
