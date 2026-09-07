# Maham Techworld

Premium personal-brand website for **Maham Shakeel** - AI Engineer, Tech Influencer, and Tech Content Creator based in Dubai.

**Live domain:** https://mahamshakeel.tech

## Stack

- Next.js 16
- TypeScript
- Tailwind CSS v4

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content editing

All site copy and lists live under `src/content/`:

| File | Purpose |
|------|---------|
| `site.ts` | Brand, SEO, nav, social, media kit path |
| `hero.ts` | Hero copy + credibility strip |
| `about.ts` | About, What I Do, Where I'm Headed |
| `portfolio.ts` | Portfolio items + filters |
| `brands.ts` | 12 confirmed brands + case studies |
| `metrics.ts` | Media Kit stats + Collabstr reviews |
| `press.ts` | Press entries (empty until verified) |
| `skills.ts` | Skills, services, contact intro |

Add verified Instagram/YouTube URLs to `portfolio.ts` (`embedUrl` / `externalUrl`) when available. Never invent URLs.

## Assets

1. Drop the official Media Kit PDF at `public/media/maham-techworld-media-kit.pdf`
2. Add real photographs to `public/images/hero/` and `public/images/about/`
3. Optional brand logos in `public/images/brands/`

## Contact form

Set environment variables from `.env.example`:

- `RESEND_API_KEY` - required in production
- `CONTACT_TO_EMAIL` - defaults to mahamshakeel546@gmail.com
- `CONTACT_FROM_EMAIL` - verified Resend sender

In development without a key, submissions are logged server-side.

## Deploy

Deploy to Vercel (or similar), set the production domain to `mahamshakeel.tech`, and configure HTTPS + DNS.
