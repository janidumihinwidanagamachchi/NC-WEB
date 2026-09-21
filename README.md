# NC-WEB

A world-class, bilingual (English + Sinhala) Next.js website for **Nalanda College Colombo**.

## Tech stack

- Next.js 16 App Router · React 19 · TypeScript
- Tailwind CSS v4
- Sanity CMS (embedded Studio + custom `/admin`)
- GSAP + Framer Motion + React Three Fiber (hero)
- next-intl (i18n)
- Resend (forms)
- Vitest + Playwright

## Getting started

```bash
npm install
cp env.example .env.local
# Fill in env vars
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — dev server
- `npm run build` — production build
- `npm run lint` — ESLint
- `npm run format` — Prettier
- `npm run typecheck` — TypeScript
- `npm test` — unit tests
- `npm run test:e2e` — Playwright smoke tests

## Environment setup

1. Create a free [Sanity](https://www.sanity.io/) project.
2. Create a [Resend](https://resend.com/) account + verify a sender domain.
3. Generate `AUTH_SECRET` with `npx auth secret`.
4. Request a long-lived Facebook page token if you want the Facebook feed.
5. (Optional) Add PostHog and Upstash keys.

See `env.example` for the full list.

## Project structure

```
app/(site)/[locale]/       Public pages
app/(admin)/admin/         Custom admin dashboard
app/studio/[[...tool]]/    Sanity Studio
app/api/                   Server routes (forms, Facebook, revalidate)
components/                React components
lib/                       Helpers, clients, queries
sanity/                    Schemas, config, plugins
messages/                  next-intl translations
public/                    Static assets
```

---

Built for [nalandacollege.lk](https://nalandacollege.lk).
