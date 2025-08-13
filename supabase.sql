create table if not exists public.vinstory (
  id bigserial primary key,
  created_at timestamp with time zone default now(),
  brand text not null,
  model text not null,
  gender text,
  size_eu numeric,
  price numeric,
  cover text,
  photos text,
  description text
);