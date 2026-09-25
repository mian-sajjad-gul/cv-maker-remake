-- ==============================================================================
-- CVPair Database Schema (PostgreSQL / Supabase)
-- Modules: Blog Management, Comment Moderation & Nested Replies, Contact Inbox
-- ==============================================================================

create extension if not exists pgcrypto;

-- ------------------------------------------------------------------------------
-- 1. Helper Functions & Triggers
-- ------------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ------------------------------------------------------------------------------
-- 2. Blog Posts Table
-- ------------------------------------------------------------------------------
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content_blocks jsonb not null default '[]'::jsonb,
  cover_image text,
  cover_alt text,
  category text,
  tags text[] not null default '{}',
  author_name text not null default 'CVPair Editorial Team',
  author_avatar text,
  seo_title text,
  seo_description text,
  canonical_url text,
  focus_keyword text,
  reading_time integer not null default 1,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blog_posts_status_published_at_idx on public.blog_posts(status, published_at desc);
create index if not exists blog_posts_slug_idx on public.blog_posts(slug);
create index if not exists blog_posts_category_idx on public.blog_posts(category);
create index if not exists blog_posts_created_at_idx on public.blog_posts(created_at desc);

drop trigger if exists set_blog_posts_updated_at on public.blog_posts;
create trigger set_blog_posts_updated_at
before update on public.blog_posts
for each row execute function public.set_updated_at();

-- ------------------------------------------------------------------------------
-- 3. Comments Table (Moderation Queue & Nested/Threaded Replies)
-- ------------------------------------------------------------------------------
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references public.blog_posts(id) on delete cascade,
  post_slug text not null,
  parent_id uuid references public.comments(id) on delete cascade,
  author_name text not null,
  author_email text not null,
  author_avatar text,
  content text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'spam')),
  is_admin_reply boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists comments_post_slug_status_idx on public.comments(post_slug, status);
create index if not exists comments_parent_id_idx on public.comments(parent_id);
create index if not exists comments_status_created_idx on public.comments(status, created_at desc);
create index if not exists comments_post_id_idx on public.comments(post_id);

drop trigger if exists set_comments_updated_at on public.comments;
create trigger set_comments_updated_at
before update on public.comments
for each row execute function public.set_updated_at();

-- ------------------------------------------------------------------------------
-- 4. Contact Messages & Inbox Table
-- ------------------------------------------------------------------------------
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  category text not null default 'General Inquiry',
  message text not null,
  is_read boolean not null default false,
  status text not null default 'unread' check (status in ('unread', 'read', 'replied', 'archived')),
  admin_replies jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists contact_messages_is_read_idx on public.contact_messages(is_read, created_at desc);
create index if not exists contact_messages_status_idx on public.contact_messages(status, created_at desc);
create index if not exists contact_messages_email_idx on public.contact_messages(email);
create index if not exists contact_messages_created_at_idx on public.contact_messages(created_at desc);

drop trigger if exists set_contact_messages_updated_at on public.contact_messages;
create trigger set_contact_messages_updated_at
before update on public.contact_messages
for each row execute function public.set_updated_at();

-- ------------------------------------------------------------------------------
-- 5. Row Level Security (RLS) Policies
-- ------------------------------------------------------------------------------
alter table public.blog_posts enable row level security;
alter table public.comments enable row level security;
alter table public.contact_messages enable row level security;

-- Blog Posts RLS
drop policy if exists "published blog posts are public" on public.blog_posts;
create policy "published blog posts are public"
on public.blog_posts for select
using (status = 'published');

-- Comments RLS: Public can view approved comments
drop policy if exists "approved comments are public" on public.comments;
create policy "approved comments are public"
on public.comments for select
using (status = 'approved');

-- Comments RLS: Public can submit comments (default to pending)
drop policy if exists "public can submit comments" on public.comments;
create policy "public can submit comments"
on public.comments for insert
with check (status = 'pending');

-- Contact Messages RLS: Public can submit inquiries
drop policy if exists "public can submit contact messages" on public.contact_messages;
create policy "public can submit contact messages"
on public.contact_messages for insert
with check (status = 'unread');

-- Note: All administrative read/write/moderation actions are performed via
-- Next.js Server Actions using SUPABASE_SERVICE_ROLE_KEY to bypass client RLS.
