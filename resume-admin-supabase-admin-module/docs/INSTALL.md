# Install Admin Blog Module

## 1. Install packages

```bash
npm install @supabase/supabase-js@latest lucide-react@latest
```

Your existing Next.js app should already have `next`, `react`, and `react-dom`.

## 2. Add environment variables

Copy `.env.example` values into your project's `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-server-only
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=change-this-password
```

Never expose `SUPABASE_SERVICE_ROLE_KEY` in client components.

## 3. Create Supabase table

Open Supabase SQL Editor and run:

```sql
-- paste supabase/schema.sql here
```

## 4. Copy folders into your app

Copy these folders/files into your existing Next.js app:

```txt
app/admin/
app/blog/
app/sitemap.js
app/robots.js
components/admin/
components/blog/
lib/blog.js
lib/adminAuth.js
lib/supabase/
supabase/schema.sql
```

## 5. Routes

```txt
/admin/login
/admin/blog
/admin/blog/new
/admin/blog/edit/[id]
/blog
/blog/[slug]
/sitemap.xml
/robots.txt
```

## 6. Notes

This starter uses a simple admin password from `.env.local`. For production multi-user admin accounts, replace `lib/adminAuth.js` and `app/admin/actions.js` login logic with Supabase Auth.
