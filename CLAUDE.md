# CLAUDE.md

LusoTown: Bilingual Portuguese community platform (London & UK) serving social users and business professionals with event discovery, premium matching, transport services, and university partnerships.

**Tech Stack:** Next.js 14 (TypeScript), Tailwind CSS, Supabase, Vercel
**Status:** Production-ready - 73+ pages, 169+ components, complete bilingual system

## Contributor Quick Start

- Dev: from repo root run in web app folder
  - cd web-app && npm install && npm run dev
- Build checks
  - npm run lint
  - npx tsc --noEmit
  - npm run build (TypeScript/ESLint errors are ignored during build per next.config.js)
- Env
  - Copy .env.local.example to .env.local and set Supabase keys

## Quick links

- App Router entry: web-app/src/app/layout.tsx, web-app/src/app/page.tsx
- i18n source: web-app/src/i18n/{en.json, pt.json}
- Contexts: web-app/src/context/
  - LanguageContext.tsx, SubscriptionContext.tsx, PlatformIntegrationContext.tsx
- Matches: web-app/src/components/
  - [MatchCard.tsx](web-app/src/components/MatchCard.tsx)
  - [MatchFilters.tsx](web-app/src/components/MatchFilters.tsx)
  - [MatchingAlgorithm.tsx](web-app/src/components/MatchingAlgorithm.tsx)
  - [PremiumMatchesGate.tsx](web-app/src/components/PremiumMatchesGate.tsx)
  - [MatchConversations.tsx](web-app/src/components/MatchConversations.tsx)
  - [SafetyCenter.tsx](web-app/src/components/SafetyCenter.tsx)
- Streaming: web-app/src/components/
  - [StreamPlayer.tsx](web-app/src/components/StreamPlayer.tsx)
  - [StreamSchedule.tsx](web-app/src/components/StreamSchedule.tsx)
  - [StreamReplayLibrary.tsx](web-app/src/components/StreamReplayLibrary.tsx)
  - [StreamViewerStats.tsx](web-app/src/components/StreamViewerStats.tsx)
  - [StreamCategories.tsx](web-app/src/components/StreamCategories.tsx)
  - [LiveChatWidget.tsx](web-app/src/components/LiveChatWidget.tsx)
- Students & Subscription: web-app/src/components/
  - [StudentVerificationSystem.tsx](web-app/src/components/StudentVerificationSystem.tsx)
  - [MembershipTiers.tsx](web-app/src/components/MembershipTiers.tsx)
  - [MembershipPortal.tsx](web-app/src/components/MembershipPortal.tsx)
  - [PaymentProcessor.tsx](web-app/src/components/PaymentProcessor.tsx)
- Integration & Journey: web-app/src/components/
  - [PlatformIntegrationContext.tsx](web-app/src/context/PlatformIntegrationContext.tsx)
  - [EcosystemIntegration.tsx](web-app/src/components/EcosystemIntegration.tsx)
  - [ServiceCommunityBridge.tsx](web-app/src/components/ServiceCommunityBridge.tsx)
  - [CrossPlatformEngagementTriggers.tsx](web-app/src/components/CrossPlatformEngagementTriggers.tsx)
  - [ConversionOptimizationEngine.tsx](web-app/src/components/ConversionOptimizationEngine.tsx)

## Essential Commands

```bash
cd web-app && npm run dev    # Start dev server (localhost:3000)
npm run build               # Production build
npm run lint               # ESLint check
npx tsc --noEmit          # TypeScript check
```

**Demo Login:** demo@lusotown.com / LusoTown2025!
**TypeScript:** Errors ignored in builds (`ignoreBuildErrors: true`)

## Core Architecture

**Structure:** Next.js 14 App Router, React Context state, Supabase backend
**Styling:** Tailwind CSS with Portuguese brand colors, mobile-first `grid-cols-2` layouts
**Key Pages:** /my-network, /transport, /matches, /live, /students, /premium-membership
**Contexts:** Language, Cart, Favorites, Networking, Subscription, PlatformIntegration

## Critical Patterns

**Bilingual:** All text supports EN/PT via `useLanguage` hook and `src/i18n/` files
**Mobile:** Professional 2x2 grids (`grid-cols-2`), fixed card heights, "London & UK" context
**State:** React Context + localStorage, no Redux
**Colors:** Portuguese brand colors only (primary, secondary, accent, action, premium, coral)
**CTAs:** Max 2 words, pricing with "From £XX" format

## Content Guidelines

**Tone:** Professional, inclusive, welcoming. London & UK focus for Portuguese community.
**Audiences:** Social users + business professionals. Event creators can monetize.
**Subscription:** Transport services require £25/year membership.

## Context Providers

Language, Cart, Favorites, Following, Networking, Subscription, PlatformIntegration

## Key Features

**Subscription Tiers:** Student (£12.50), Professional (£25), Business (£75), VIP (£150)
**Premium Features:** Transport services, premium matches, live streaming, university partnerships
**Networking:** Event-based connections, compatibility matching, cultural conversation starters

## Key Components

**Transport:** SIA-compliant luxury transport with Portuguese-speaking drivers
**Matches:** Premium Portuguese community matching with cultural compatibility 
**Streaming:** LusoTown TV with cultural content and business workshops
**Students:** 8 university partnerships serving 2,150+ Portuguese students

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## Development Workflow

**Start Development:** `cd web-app && npm run dev` (localhost:3000)
**Demo Login:** demo@lusotown.com / LusoTown2025!

**Testing Checklist:**
- English/Portuguese language toggle
- Mobile 2x2 grids (375px width)
- Key pages: /my-network, /transport, /matches, /live, /students, /premium-membership
- Subscription enforcement for transport services
- London & UK geographic messaging

**Quality Checks:**
- `npm run lint` and `npx tsc --noEmit`
- Verify Portuguese brand colors (no generic Tailwind)
- Test responsive design (mobile/tablet/desktop)
- Validate CTAs (2 words max) and pricing ("From £XX")

**Common Issues:**
- TypeScript errors: `npx tsc --noEmit`
- Language switching: check LanguageContext + localStorage
- Mobile layouts: ensure `grid-cols-2 md:grid-cols-2` pattern
- State persistence: localStorage keys for cart/favorites/networking

