# Synvora AI website

Marketing website for Synvora AI: six pages, six service detail pages, and a contact form that stores leads in Supabase and emails them through Resend.

**Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS 4, Motion, Lucide React, Zod, Supabase, Resend.

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in the values you have
npm run dev                  # http://localhost:3000
```

Requires Node.js 20.9 or newer.

| Command             | What it does                  |
| ------------------- | ----------------------------- |
| `npm run dev`       | Start the dev server          |
| `npm run build`     | Production build              |
| `npm run start`     | Serve the production build    |
| `npm run lint`      | ESLint                        |
| `npm run typecheck` | TypeScript check              |

## Project structure

```
src/
  app/                 Routes (home, services, services/[slug], solutions, our-work, about, contact)
    api/contact/       Contact form endpoint
  components/
    layout/            Navbar, Footer, Logo
    home/              Homepage sections and the hero agent graph
    contact/           Contact form
    shared/            PageHeader, FinalCTA
    ui/                Button, Reveal, SectionHeading, social icons
  data/                All site content: services, solutions, projects, process, founder
  lib/                 Site config, metadata helper, form schema, lead delivery, rate limiter
supabase/schema.sql    Leads table
```

Design tokens (colors, fonts, radii) live in `src/app/globals.css` under `@theme`.

## Editing content

- Services, solutions, and projects: edit the files in `src/data/`. Service pages, the sitemap, and the contact form's service list update automatically.
- Founder section: edit `src/data/founder.ts`. Put a photo in `public/` and set `photo` to its path.
- Contact email and social links: set `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_LINKEDIN_URL`, `NEXT_PUBLIC_GITHUB_URL`.

## Contact form setup

The form posts to `/api/contact`. It validates input with Zod (the same schema runs in the browser and on the server), then delivers the lead. It **never reports success unless a delivery channel actually accepted the message.** With nothing configured, the form shows an error telling the visitor to email you directly.

Configure one or both channels:

### 1. Supabase (lead storage)

1. Create a project at supabase.com.
2. Open the SQL editor and run `supabase/schema.sql`.
3. Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` (Project settings, API). The service-role key is server-only. Never prefix it with `NEXT_PUBLIC_`.

### 2. Resend (email notification)

1. Create an account at resend.com and verify your sending domain.
2. Set `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` (an address on the verified domain), and `CONTACT_TO_EMAIL` (where inquiries go).

If both channels are configured, the lead is saved and emailed. The visitor sees success if at least one succeeds, and failures are logged on the server.

### Spam protection

Always on: a hidden honeypot field, a minimum fill-time check, request size limit, and a per-IP rate limit.

The rate limiter is in memory, so on serverless hosting it is per instance and best-effort. For stronger protection, enable Cloudflare Turnstile (free): create a widget at dash.cloudflare.com, then set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`. The widget appears automatically and the server verifies every token.

## Deploying to Vercel

1. Push the project to GitHub:
   ```bash
   git init && git add . && git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<you>/synvora-ai.git
   git push -u origin main
   ```
2. In Vercel, choose **Add New, Project**, and import the repository. The Next.js preset needs no changes.
3. Add the environment variables from `.env.example` under **Settings, Environment Variables**. Set `NEXT_PUBLIC_SITE_URL` to your production URL (for example `https://synvora.ai`), because it drives canonical URLs, the sitemap, and Open Graph.
4. Deploy, then add your custom domain under **Settings, Domains**.
5. After the first deploy, submit a test inquiry and confirm it appears in Supabase and your inbox.

## Before launch checklist

- [ ] Replace `hello@YOUR-DOMAIN.com` (`NEXT_PUBLIC_CONTACT_EMAIL`)
- [ ] Set real LinkedIn and GitHub URLs
- [ ] Fill in `src/data/founder.ts`
- [ ] Configure Supabase and/or Resend, and send a real test inquiry
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the live domain
- [ ] Add real screenshots to Our Work as demos are built, and keep the concept-demo labels until work is delivered to a client

## Content policy built into the site

The site contains no invented clients, testimonials, statistics, or deployments. All projects on Our Work are labeled concept demos or prototypes, and the Solutions page describes proposals, not existing integrations. Keep it that way when you add content.

## Notes

- `lucide-react` v1 no longer includes brand icons, so LinkedIn and GitHub glyphs are inline SVG in `src/components/ui/SocialIcons.tsx`.
- Fonts (Bricolage Grotesque and Instrument Sans) are self-hosted through Fontsource, so builds do not depend on Google Fonts.
