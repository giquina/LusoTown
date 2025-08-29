# LusoTown • Copilot instructions (AI agent quickstart)

Read first: `AGENTS.md` (source of truth) and `CLAUDE.md` (commands, quality gates). This file is a concise operational guide for AI coding agents.

## Architecture (streamlined monorepo) - 305,000+ lines eliminated
- `web-app/` Next.js 14 (TypeScript, Tailwind) – **215 essential components** (from 419), 48 config files in `src/config/`, bilingual i18n, LusophoneCarousel system (1,100+ lines).
- `mobile-app/` React Native/Expo with EAS Build – imports shared config, follows zero-hardcoding.
- `streaming/` Node.js 22/SRS RTMP+HLS – server at :8080, Portuguese cultural content.
- `packages/` `@lusotown/design-tokens`, `@lusotown/ui`; `shared/` cross-platform config/utilities.
- Database: Supabase PostgreSQL + PostGIS for geolocation. Streamlined dependencies (86 packages eliminated).

## Non‑negotiable rules
- **Zero hardcoding**: import from `web-app/src/config/*` (48 config files). **CRITICAL**: 17,478 violations across 547 files being addressed.
- **Bilingual first**: all UI text via `useLanguage().t('key')`; add keys to both `src/i18n/en.json` and `src/i18n/pt.json`.
- **Portuguese cultural authenticity**: use "Portuguese-speaking community" (NOT "Portuguese community"); reference "United Kingdom" (NOT just "London"); use brand colors from config.
- **Mobile-first UX**: 56px touch targets (WCAG 2.1 AA), large 48px-64px headers, 80px-120px responsive margins.
- Routes and data come from config; do not inline URLs, prices, emails, universities, or cultural lists.

Example (web):
- import { formatPrice, SUBSCRIPTION_PLANS } from '@/config/pricing'
- import { ROUTES } from '@/config/routes'
- const { t } = useLanguage(); href={ROUTES.events}; {formatPrice(SUBSCRIPTION_PLANS.community.monthly)}

## Day‑to‑day commands
- Web dev: `cd web-app && npm run dev` (Node >=20 locally; CI uses Node 22).
- Streaming dev: `cd streaming && npm start` (http://localhost:8080).
- Mobile dev: `cd mobile-app && npm start` (Expo).
- Root shortcuts (see `package.json`): `npm run dev`, `build`, `deploy`, `lint`, `test` delegate into workspaces.

## Quality gates (must pass before commit/PR) - 100% build success rate
- In `web-app/`: `npm run audit:hardcoding && npm run lint && npx tsc --noEmit && npm run build` (114s optimized build).
- Alternative: `npm run qa:pre-commit` (combined quality checks).
- Optional suites: `npm run test` (Jest), `npx playwright test` (E2E including mobile UX audits), mobile `npm run test:all`.

## Deployment model
- Hosting: Vercel for web (Promote Preview → Production). Auto Production builds from main are skipped (see `vercel.json`).
- Command: `cd web-app && npm run deploy` or root `npm run deploy` (requires Vercel auth).
- CI uses Node 22 and enforces hardcoding/ESLint/TS/build gates (see `CLAUDE.md` and `.github/workflows/`).

## Configuration & env
- Web required: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`; often used: Cloudinary, Stripe, STREAMING_SERVER_URL.
- Copy `web-app/.env.local.example` → `.env.local`. Never commit secrets.

## Conventions & patterns
- Source of truth: `web-app/src/config/*` (pricing.ts, routes.ts, brand.ts, contact.ts, universities.ts, lusophone‑celebrations.ts, community‑guidelines.ts).
- State: React Contexts in `src/context/*` (e.g., `LanguageContext`).
- Styling: prefer design tokens and brand utilities; use `@lusotown/design-tokens` and `@lusotown/ui` where applicable.
- Shared: mobile imports config via `@lusotown/shared`/`shared/` to preserve zero‑hardcoding across platforms.

## Streaming notes
- Node 22 engines; scripts: `start`, `dev`, `health-check`. RTMP/WebRTC/HLS via SRS; see `streaming/README.md` for endpoints.

## What to avoid
- Editing generated/build outputs; introducing inline strings for content, prices, routes; bypassing i18n; adding generic Tailwind colors.

References: `AGENTS.md`, `CLAUDE.md`, `web-app/README.md`, `streaming/README.md`, `mobile-app/README.md`, `web-app/package.json` scripts.
