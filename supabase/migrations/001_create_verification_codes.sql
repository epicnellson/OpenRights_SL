create table if not exists verification_codes (
  email text primary key,
  code text not null,
  expires_at timestamptz not null,
  created_at timestamptz default now()
);

-- Clean up expired codes automatically
create index if not exists idx_verification_codes_expires_at on verification_codes (expires_at);
