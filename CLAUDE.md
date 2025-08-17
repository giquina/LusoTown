# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

LusoTown: Bilingual Portuguese community platform (London & UK) serving Portuguese speakers with event discovery, group activities, premium matching, transport services, and university partnerships.

**Tech Stack:** Next.js 14 (TypeScript), Tailwind CSS, Supabase, Vercel
**Status:** Production-ready - 75+ pages, 175+ components, complete bilingual system, enhanced mobile experience

## Contributor Quick Start

- Dev: from repo root run in web app folder
  - cd web-app && npm install && npm run dev
- Build checks (run from web-app directory)
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
- Events & Groups: web-app/src/components/
  - [EventsShowcase.tsx](web-app/src/components/EventsShowcase.tsx) - Enhanced mobile-first design
  - [GroupEventsSection.tsx](web-app/src/components/GroupEventsSection.tsx) - Mobile improvements
  - [GroupsShowcase.tsx](web-app/src/components/GroupsShowcase.tsx) - Complete redesign
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
# Development (from repo root)
cd web-app && npm install && npm run dev    # Start dev server (localhost:3000)

# From web-app directory
npm run build               # Production build
npm run lint               # ESLint check
npx tsc --noEmit          # TypeScript check

# Testing (comprehensive test suite available)
npm test                    # Run all unit tests
npm run test:watch          # Run tests in watch mode
npm run test:coverage       # Generate test coverage report
npm run test:ci             # CI test run with coverage
npm run test:unit           # Component/context/utils tests only
npm run test:integration    # Integration tests only
npm run test:performance    # Performance tests only
npm run test:e2e            # End-to-end tests (Playwright)
npm run test:e2e:headed     # E2E tests with browser UI
npm run test:portuguese     # Portuguese-specific tests
npm run test:mobile         # Mobile-specific tests
npm run test:security       # Security tests
npm run test:accessibility  # Accessibility tests
```

**Demo Login:** demo@lusotown.com / LusoTown2025!
**TypeScript:** Errors ignored in builds (`ignoreBuildErrors: true`)

## Mobile App Structure

**Location:** `/mobile-app/` directory
**Framework:** React Native + Expo
**Status:** Onboarding flow partially complete (Steps 1-3 implemented)
**Commands:**
- `cd mobile-app && npm install && npm start` - Start Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- Scan QR code with Expo Go app for testing

**Current Features:**
- Onboarding flow with first name, age verification (30+), email validation
- Portuguese community focus with Firebase backend integration planned
- Planned: Profile picture upload, selfie verification, interest selection

## Core Architecture

**Structure:** Next.js 14 App Router with TypeScript, React Context state management, Supabase PostgreSQL backend
**Styling:** Tailwind CSS with Portuguese brand colors, mobile-first responsive layouts with enhanced touch targets
**State Management:** React Context + localStorage (no Redux), bilingual support via LanguageContext
**Key Pages:** /my-network, /transport, /matches, /live, /students, /premium-membership, /chauffeur, /events
**Contexts:** LanguageContext, CartContext, FavoritesContext, NetworkingContext, SubscriptionContext, PlatformIntegrationContext, NotificationContext, FollowingContext
**Path Aliases:** `@/*` maps to `./src/*` for clean imports
**Assets:** Images stored in `/public/images/`, events in `/public/events/`, with fallbacks for missing assets

## Critical Patterns

**Bilingual:** All text supports EN/PT via `useLanguage` hook and `src/i18n/` files
**Mobile:** Enhanced responsive grids with improved touch targets, mobile-first button layouts (2x2 grids for buttons), "London & UK" context focused on Portuguese speakers
**State:** React Context + localStorage, no Redux
**Colors:** Portuguese brand colors only (primary, secondary, accent, action, premium, coral)
**CTAs:** Max 2 words, pricing with "From £XX" format

## Content Guidelines

**Tone:** Professional, inclusive, welcoming. London & UK focus targeting Portuguese speakers specifically.
**Audiences:** Portuguese speakers in London & UK - social users + business professionals. Event creators can monetize.
**Messaging:** Emphasis on "Portuguese speakers," cultural comfort, Portuguese-speaking hosts/guides.
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

## Testing Framework

**Test Setup:** Jest + Testing Library + Playwright for E2E
**Configuration:** `jest.config.js` with custom setup in `jest.setup.js`
**Coverage:** HTML reports generated in `/coverage/` directory
**Test Types:**
- **Unit Tests:** `__tests__/components/`, `__tests__/contexts/`, `__tests__/utils/`
- **Integration Tests:** `__tests__/integration/` for user journey testing
- **E2E Tests:** `__tests__/e2e/` using Playwright
- **Performance Tests:** `__tests__/performance/` for optimization testing

**Mocks:** Pre-configured mocks for Next.js router, localStorage, Framer Motion, react-hot-toast, and browser APIs
**Portuguese Testing:** Global test utilities with mock Portuguese users and events
**Mobile Testing:** Window.matchMedia mocked for responsive testing

## Database Architecture

**Backend:** Supabase PostgreSQL with Edge Functions
**Migration Files:** Located in `/supabase/migrations/` with numbered schema updates
**Key Tables:** Users, events, groups, subscriptions, premium memberships, messages, safety features
**Configuration:** `supabase/config.toml` for local development
**Seed Data:** `supabase/seed.sql` for initial data setup

**Recent Migrations:**
- `20250811_001_initial_schema.sql` - Core tables and relationships
- `20250812_001_messages_schema.sql` - Messaging system
- `20250814_001_enhanced_groups_safety.sql` - Group safety features
- `20250816_002_subscription_system.sql` - Subscription management
- `20250817_001_premium_membership_tiers.sql` - Premium memberships
- `20250817_002_enhanced_subscription_system.sql` - Enhanced subscriptions

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
- Mobile responsive layouts with enhanced touch targets (375px width)
- Key pages: /my-network, /transport, /matches, /live, /students, /premium-membership
- Event cards mobile-first design with Portuguese cultural context
- Group events section mobile improvements (2x2 button grids)
- Subscription enforcement for transport services
- "Portuguese speakers in London" messaging consistency

**Quality Checks:**
- `npm run lint` and `npx tsc --noEmit`
- Verify Portuguese brand colors (no generic Tailwind)
- Test responsive design (mobile/tablet/desktop)
- Validate CTAs (2 words max) and pricing ("From £XX")
- Run test suite: `npm run test:all` (unit + integration + performance)

## Deployment & Automation

**Production Deployment:** Vercel with automatic GitHub integration
**Configuration:** `vercel.json` in both root and web-app directories
**Image Optimization:** Unsplash domains configured, WebP/AVIF formats enabled
**Build Configuration:** TypeScript and ESLint errors ignored during builds for faster deployment
**Automation Scripts:**
- `scripts/post-deployment-update.sh` - Post-deploy tasks
- `scripts/update-claude-md.sh` - Documentation updates
- Various image optimization and cleanup scripts in web-app directory

**GitHub Actions:** Deployment workflows configured in `.github/workflows/deploy.yml`

**Common Issues:**
- TypeScript errors: `npx tsc --noEmit`
- Language switching: check LanguageContext + localStorage
- Mobile layouts: ensure responsive grids with proper touch targets, test button accessibility
- State persistence: localStorage keys for cart/favorites/networking

## Recent Platform Improvements (August 2025)

### Mobile Experience Enhancements
**Homepage Events Cards Redesign:**
- Mobile-first responsive grid layouts with enhanced touch targets
- Portuguese brand color consistency throughout
- Improved card interactions and hover states
- Better mobile button accessibility and spacing

**GroupEventsSection Mobile Improvements:**
- Fixed unclickable mobile buttons issue 
- Enhanced 2x2 button grid layout for better mobile usability
- Improved responsive design for events filtering
- Better touch targets for mobile users

**GroupsShowcase Complete Redesign:**
- Modern mobile-first layout with enhanced visual hierarchy
- Portuguese community focus with cultural indicators
- Improved member count displays and group metadata
- Enhanced call-to-action buttons with better mobile accessibility

### Messaging Strategy Updates
**Portuguese Speaker Focus:**
- Updated language from "community members" to "Portuguese speakers in London"
- Emphasis on Portuguese-speaking hosts, guides, and cultural comfort
- Clear benefits explanation highlighting language and cultural familiarity
- Community-focused messaging without family targeting per business requirements

### Component Architecture Improvements
**EventsShowcase.tsx Enhancements:**
- Enhanced multi-column responsive layouts
- Portuguese cultural context in event descriptions
- Improved event category preview with better mobile design
- Mobile-optimized stats bar with responsive grid

**GroupEventsSection.tsx Mobile Fixes:**
- Fixed mobile button interaction issues
- Improved category filtering with better mobile UX
- Enhanced Portuguese group benefits section
- Mobile-optimized call-to-action buttons

**GroupsShowcase.tsx Complete Rebuild:**
- Modern component architecture with better mobile support
- Enhanced Portuguese community group discovery
- Improved stats section with mobile-first design
- Better integration with Supabase group data

### Visual Design Improvements
**Portuguese Brand Consistency:**
- Consistent use of Portuguese brand colors throughout
- Enhanced gradient designs reflecting Portuguese flag colors
- Improved visual hierarchy for mobile devices
- Better contrast and accessibility compliance

**Mobile-First Approach:**
- All components now prioritize mobile experience
- Enhanced touch targets and button spacing
- Improved responsive grid systems
- Better mobile navigation and interaction patterns

