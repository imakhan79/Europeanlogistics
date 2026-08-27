# European RouteWise

AI-powered logistics operating system for European road-freight companies. Next.js + Supabase.

## Setup

1. `npm install`
2. Copy `.env.example` to `.env.local` and fill in your Supabase project URL and anon key.
3. Apply the schema in `supabase/migrations/0001_init.sql` (Supabase SQL editor or `supabase db push`).
4. `npm run dev`

## Status

This is an early scaffold: landing page, auth, app shell with the full module navigation, and an
Executive Dashboard with mock data. Most modules are nav stubs pending implementation.
