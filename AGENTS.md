<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

## Project conventions (NC-WEB)

- **Design system:** dark maroon & silver palette, defined in `app/globals.css`. Avoid introducing unrelated palettes.
- **Routing:** public site lives under `app/(site)/[locale]/`; custom admin dashboard under `app/(admin)/admin/`; Sanity Studio mounted at `/studio`.
- **i18n:** all UI strings must live in `messages/en.json` and `messages/si.json`; use `next-intl` hooks/components.
- **Components:** prefer Server Components; use `'use client'` only for interactivity, animation, or browser APIs.
- **Animations:** lazy-load heavy libraries (Three.js, GSAP ScrollTrigger); always provide a reduced-motion fallback and respect `prefers-reduced-motion`.
- **Images:** use `next/image` with Sanity image builder or `unoptimized={true}` only for special cases (e.g. external Facebook CDN proxies).
- **Forms:** validate with Zod, store a `formSubmission` document in Sanity, and send email via Resend. Rate-limit all public API routes.
