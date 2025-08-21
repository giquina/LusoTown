# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

LusoTown: Production-ready bilingual Portuguese community platform serving London & UK Portuguese speakers with event discovery, group activities, premium matching, transport services, streaming platform, business directory, and university partnerships.

**Tech Stack:** Next.js 14 App Router (TypeScript), Tailwind CSS, Supabase PostgreSQL, Simple Relay Server (SRS), OpenStreetMap/Leaflet, PostGIS, Twitter API, Stripe, React Context state management
**Status:** Production-ready - 75+ pages, 180+ components, complete bilingual i18n system, mobile-first responsive design, integrated streaming platform, public business directory with geolocation

## Contributor Quick Start

- **Development**: From repository root
  ```bash
  cd web-app && npm install && npm run dev    # Start at localhost:3000
  cd streaming && npm install && npm start    # Streaming server at localhost:8080
  cd mobile-app && npm install && npm start   # Expo development server
  ```
- **Build checks** (run from web-app directory - ALWAYS before commits)
  ```bash
  npm run lint                 # ESLint check - must pass
  npx tsc --noEmit            # TypeScript check - must pass  
  npm run build               # Production build test
  npm run test:all            # Comprehensive test suite
  ```
- **Environment**: Copy `.env.local.example` to `.env.local` and configure Supabase keys + optional services

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
- Business Directory & Maps: web-app/src/components/
  - [BusinessMap.tsx](web-app/src/components/BusinessMap.tsx) - Interactive OpenStreetMap with business markers and clustering
  - [BusinessSubmissionForm.tsx](web-app/src/components/BusinessSubmissionForm.tsx) - Public business submission form with 4-step wizard
  - [NearMeButton.tsx](web-app/src/components/NearMeButton.tsx) - Location-based business discovery with radius selector
- Social Media Integration: web-app/src/components/
  - [TwitterFeedWidget.tsx](web-app/src/components/TwitterFeedWidget.tsx) - Portuguese community Twitter feed integration
  - [TwitterHashtagTabs.tsx](web-app/src/components/TwitterHashtagTabs.tsx) - Hashtag category tabs for community content
- Integration & Journey: web-app/src/components/
  - [PlatformIntegrationContext.tsx](web-app/src/context/PlatformIntegrationContext.tsx)
  - [EcosystemIntegration.tsx](web-app/src/components/EcosystemIntegration.tsx)
  - [ServiceCommunityBridge.tsx](web-app/src/components/ServiceCommunityBridge.tsx)
  - [CrossPlatformEngagementTriggers.tsx](web-app/src/components/CrossPlatformEngagementTriggers.tsx)
  - [ConversionOptimizationEngine.tsx](web-app/src/components/ConversionOptimizationEngine.tsx)
- Geolocation Services: web-app/src/lib/
  - [geolocation.ts](web-app/src/lib/geolocation.ts) - Location detection and distance calculations with Portuguese areas

## Essential Commands

### Development Setup
```bash
# Start development (from repo root)
cd web-app && npm install && npm run dev    # Web app at localhost:3000

# Start streaming server (parallel terminal)
cd streaming && npm install && npm start    # Streaming at localhost:8080

# Start mobile app (optional - React Native/Expo)
cd mobile-app && npm install && npm start   # Expo dev server
```

### Key npm Scripts (50+ available - most important listed)
```bash
# Testing (comprehensive test framework)
npm run test:all            # Complete test suite (unit + integration + performance)  
npm run test:unit           # Components/contexts/utils only
npm run test:integration    # User journey tests
npm run test:e2e           # Playwright end-to-end tests
npm run test:portuguese    # Portuguese-specific feature tests
npm run test:mobile        # Mobile responsive tests
npm run test:security      # Security validation tests

# Documentation & Automation (intelligent system)
npm run docs:orchestrator  # Master documentation system
npm run docs:health-check  # System health monitoring
npm run docs:cultural-audit # Portuguese cultural consistency
npm run audit:hardcoding   # Scan for hardcoded strings/values

# Database operations
npm run db:migrate              # Apply all migrations
npm run db:migrate:streaming    # Streaming platform schema only
npm run verify:creator-monetization # Verify streaming setup
```

### Quality Assurance (ALWAYS run before commits)
```bash
cd web-app                   # Navigate to web app directory

npm run lint                 # ESLint check - must pass
npx tsc --noEmit            # TypeScript check - must pass  
npm run build               # Production build test
npm run test:all            # Run comprehensive test suite
```

### Testing Framework
```bash
# Unit tests
npm test                    # Run all tests
npm run test:watch          # Watch mode
npm run test:coverage       # Coverage report (generates /coverage/)
npm run test:ci             # CI mode with coverage
npm run test:unit           # Components/contexts/utils only
npm run test:integration    # User journey tests
npm run test:performance    # Performance benchmarks
npm run test:all            # Comprehensive test suite

# E2E tests (Playwright)
npm run test:e2e            # Headless E2E tests
npm run test:e2e:headed     # With browser UI
npm run test:e2e:debug      # Debug mode

# Specialized tests
npm run test:portuguese     # Portuguese-specific features
npm run test:mobile         # Mobile responsive tests
npm run test:security       # Security validations
npm run test:accessibility  # A11y compliance
```

### Database Operations
```bash
# Apply migrations (from web-app directory)
npm run db:migrate                    # General database migrations
npm run db:migrate:streaming          # Streaming platform schema
npm run db:migrate:streaming:complete # Complete streaming migration

# Verification scripts
npm run verify:creator-monetization   # Verify streaming setup

# Note: Business directory migrations are in supabase/migrations/
# Apply via Supabase Dashboard or supabase CLI
```

### Streaming Infrastructure
```bash
# Streaming server health
cd streaming && npm run health-check  # Verify streaming infrastructure
cd streaming && npm test              # Run streaming tests

# Streamlabs mobile configuration
node streaming/streamlabs-setup.js    # Generate mobile streaming config

# Production URLs (for deployment)
# RTMP: rtmp://stream.lusotown.com:1935/live/
# HLS: https://stream.lusotown.com/live/[stream_key].m3u8
```

### Development Tools
```bash
# Image optimization (from web-app directory)
npm run optimize-images          # Optimize Portuguese community images
npm run generate-placeholders    # Generate image placeholders

# Development utilities
npm run export                   # Static site export
npm run deploy                   # Deploy to Vercel
```

**Demo Login:** demo@lusotown.com / LusoTown2025!  
**Build Configuration:** TypeScript/ESLint errors ignored during builds (`ignoreBuildErrors: true`, `ignoreDuringBuilds: true`) for faster deployment

## Mobile App Structure

**Location:** `/mobile-app/` directory
**Framework:** React Native + Expo
**Status:** Early development - Onboarding flow partially complete (Steps 1-3 implemented)
**Commands:**
- `cd mobile-app && npm install && npm start` - Start Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- Scan QR code with Expo Go app for testing

**Current Features:**
- Basic onboarding flow with first name collection
- Age verification (30+) with date of birth validation
- Email validation with real-time feedback
- Portuguese community focus with Firebase backend integration planned
- Planned: Profile picture upload, selfie verification, interest selection, welcome screen

## Streaming Infrastructure

**Location:** `/streaming/` directory
**Framework:** Node.js with Simple Relay Server (SRS)
**Status:** Production ready - Complete Portuguese streaming platform
**Commands:**
- `cd streaming && npm install && npm start` - Start streaming server (localhost:8080)
- `cd streaming && npm run health-check` - Verify streaming infrastructure  
- `cd streaming && npm test` - Run streaming tests

**Features:**
- RTMP ingestion with WebRTC and HLS delivery
- Portuguese cultural emotes system (:saudade:, :festa:, :futebol:)
- Real-time chat with Portuguese language moderation
- Creator monetization with 85/15 revenue splits
- Multi-currency support (BRL, EUR, GBP)
- Redis caching for performance optimization

## Core Architecture

### Project Structure (Monorepo)
```
/workspaces/LusoTown/
├── web-app/                    # Next.js 14 main application (75+ pages)
│   ├── src/app/               # App Router pages & layouts
│   ├── src/components/        # 180+ React components
│   ├── src/context/          # React Context providers (Language, Subscription, etc.)
│   ├── src/i18n/             # Bilingual translations (en.json, pt.json)
│   ├── src/lib/              # Utilities, API clients, geolocation services
│   ├── __tests__/            # Jest tests (unit, integration, e2e)
│   ├── jest.config.js        # Testing configuration
│   ├── next.config.js        # Next.js build configuration
│   └── package.json          # 50+ comprehensive npm scripts
├── streaming/                 # Node.js Simple Relay Server (SRS)
│   ├── server.js             # Main streaming server
│   ├── health-check.js       # Health monitoring
│   └── package.json          # Streaming dependencies
├── mobile-app/               # React Native/Expo mobile app
│   └── package.json          # Mobile dependencies (early development)
├── supabase/migrations/      # 20+ database migrations with PostGIS
├── packages/                 # Shared monorepo packages
│   ├── design-tokens/        # Portuguese brand colors & tokens
│   └── ui/                  # Shared React components
└── package.json             # Root workspace configuration
```

### Technology Stack
- **Frontend:** Next.js 14 App Router, TypeScript, Tailwind CSS, React Context
- **State Management:** React Context + localStorage (NO Redux by design)
- **Backend:** Supabase PostgreSQL with PostGIS geospatial extension
- **Streaming:** Simple Relay Server (SRS) with RTMP→WebRTC→HLS pipeline  
- **Maps:** OpenStreetMap/Leaflet (no Google Maps dependency)
- **Testing:** Jest + Testing Library + Playwright E2E (comprehensive test suite)
- **i18n:** Custom bilingual system (English/Portuguese) via React Context
- **Deployment:** Vercel (web app), Railway (streaming server)
- **Monorepo:** npm workspaces with shared packages

### Next.js Build Configuration (Critical for Understanding)

**Production Build Optimization:**
- **TypeScript/ESLint errors ignored** during builds (`next.config.js` lines 83-87) for faster deployment
- **Chunk splitting strategy**: Separate chunks for vendor, React, Heroicons, Framer Motion 
- **Image optimization**: Multiple CDN domains configured (Unsplash, Cloudinary, BunnyCDN)
- **Bundle analysis**: Available with `ANALYZE=true npm run dev`
- **Performance**: `removeConsole: true` in production, advanced webpack optimization

**Monorepo Setup:**
- **Workspaces**: Root package.json defines `web-app`, `mobile-app`, `streaming`, `packages/*`
- **Shared packages**: `@lusotown/design-tokens`, `@lusotown/ui` transpiled via Next.js
- **React Native Web**: Configured for potential shared components

### Critical Architecture Patterns

**Bilingual System (NEVER hardcode strings):**
```typescript
// Always use translations
const { t } = useLanguage()
return <h1>{t('page.hero.title')}</h1>

// File structure: src/i18n/en.json, src/i18n/pt.json
// Format: t('page.section.key') for consistent namespacing
```

**State Management (React Context only):**
```typescript
// Available contexts:
// LanguageContext, CartContext, FavoritesContext, NetworkingContext,
// SubscriptionContext, PlatformIntegrationContext, NotificationContext

// Persistence via localStorage:
// - cart items, favorites, language preference, auth state
```

**Component Organization:**
- Domain-based: Events, Groups, Matches, Streaming, Transport
- Shared UI components in `/components/` root
- Page components in `/app/` structure
- Portuguese cultural elements integrated throughout

**Streaming Architecture:**
- Separate Node.js server at `/streaming/` directory
- RTMP ingestion → WebRTC/HLS delivery pipeline
- Portuguese cultural emotes system with regional support
- Multi-currency creator monetization (BRL, EUR, GBP)

## Critical Patterns

**Bilingual:** All text supports EN/PT via `useLanguage` hook and `src/i18n/` files
**Mobile:** Enhanced responsive grids with improved touch targets, mobile-first button layouts (2x2 grids for buttons), "London & UK" context focused on Portuguese speakers
**State:** React Context + localStorage, no Redux
**Colors:** Portuguese brand colors only (primary, secondary, accent, action, premium, coral)
**CTAs:** Max 2 words, pricing with "From £XX" format

## Hardcoding Prevention Rules (CRITICAL)

**Overview:** LusoTown requires strict configurability for bilingual support, dynamic pricing, and content management.

### ❌ NEVER Hardcode:
1. **Text strings** - Use `t('key')` from i18n files
2. **Routes** - Use `ROUTES.events` from config/routes.ts
3. **API keys/credentials** - Use environment variables
4. **User data/prices** - Fetch from database/config
5. **Feature flags** - Store in config files
6. **Brand info** - Use config/brand.ts

### ✅ Safe to Hardcode:
- CSS classes and layout structure
- Permanent design assets with documentation
- Fallback values with clear comments

### Code Review Checklist:
- [ ] No hardcoded text (`"Hello"` → `{t('greeting')}`)
- [ ] No hardcoded routes (`"/events"` → `{ROUTES.events}`)
- [ ] No credentials in code (use .env files)
- [ ] All user-facing text supports EN/PT translation

### Audit Tools:
```bash
npm run audit:hardcoding     # Scan for violations
npm run audit:monthly        # Compliance check
```

## Content Guidelines

**Tone:** Professional, inclusive, welcoming. London & UK focus targeting Portuguese speakers specifically.
**Audiences:** Portuguese speakers in London & UK - social users + business professionals. Event creators can monetize.
**Messaging:** Emphasis on "Portuguese speakers," cultural comfort, Portuguese-speaking hosts/guides.
**Membership:** Annual membership £25/year for transport services, Student rate £12.50/year (50% discount).

## Context Providers

Language, Cart, Favorites, Following, Networking, Subscription, PlatformIntegration

## Key Features

**Subscription Tiers:** Free (3 matches/day + 10 messages/month), Community Member (£19.99/month), Cultural Ambassador (£39.99/month)
**Premium Features:** Transport services, premium matches, live streaming platform with Portuguese cultural content, creator monetization, university partnerships
**Networking:** Event-based connections, compatibility matching, cultural conversation starters

## Key Components

**Transport:** SIA-compliant luxury transport with Portuguese-speaking drivers
**Matches:** Premium Portuguese community matching with cultural compatibility 
**Streaming:** LusoTown TV with Portuguese cultural content, business workshops, creator economy, real-time chat, and Portuguese emotes system
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
- `20250818_001_streaming_platform_schema.sql` - Streaming platform database
- `20250818_002_conversion_funnel_system.sql` - Conversion tracking and analytics
- `20250818_004_referral_system.sql` - Referral system and rewards
- `20250819_004_public_business_directory_with_geolocation.sql` - Business directory with PostGIS geospatial support

## Environment Configuration

### Required Environment Variables
Copy `web-app/.env.local.example` to `web-app/.env.local` and configure:

```env
# Essential Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Stripe (Required for subscriptions)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret

# Maps & Business Directory
NEXT_PUBLIC_MAP_PROVIDER=openstreetmap  # Free alternative to Google Maps
NEXT_PUBLIC_BUSINESS_VERIFICATION_REQUIRED=true

# Portuguese Community Social Features
NEXT_PUBLIC_TWITTER_BEARER_TOKEN=your_twitter_bearer_token
NEXT_PUBLIC_PORTUGUESE_HASHTAGS=LusoLondon PortugueseUK LusoTown

# Streaming Platform (Optional)
NEXT_PUBLIC_STREAMING_SERVER_URL=http://localhost:8080
NEXT_PUBLIC_RTMP_SERVER_URL=rtmp://localhost:1935

# Brand & Community Stats (Update regularly)
NEXT_PUBLIC_TOTAL_MEMBERS=750
NEXT_PUBLIC_TOTAL_STUDENTS=2150
NEXT_PUBLIC_UNIVERSITY_PARTNERSHIPS=8
```

### Path Aliases & Imports
```typescript
// Configured in tsconfig.json
import { Component } from '@/components/Component'  // maps to ./src/
import { useLanguage } from '@/context/LanguageContext'
import { events } from '@/lib/events'
```

## Development Workflow

### Quick Start
1. **Setup:** Copy `web-app/.env.local.example` → `web-app/.env.local`
2. **Start:** `cd web-app && npm install && npm run dev` (localhost:3000)
3. **Stream:** `cd streaming && npm install && npm start` (localhost:8080)  
4. **Demo Login:** demo@lusotown.com / LusoTown2025!

### Pre-Commit Checklist (ALWAYS run)
```bash
cd web-app                           # Navigate to web app
npm run lint                         # ESLint - must pass
npx tsc --noEmit                     # TypeScript - must pass
npm run build                        # Production build test
npm run test:all                     # Comprehensive test suite
cd ../streaming && npm run health-check  # Streaming infrastructure
```

### Key Testing Areas
- **Bilingual:** EN/PT language toggle works on all pages
- **Mobile:** Responsive design at 375px, 768px, 1024px breakpoints
- **Authentication:** Demo login (demo@lusotown.com / LusoTown2025!), subscription gates, protected routes
- **Portuguese Features:** Cultural elements, brand colors, messaging
- **Core Pages:** /events, /transport, /matches, /live, /business-directory
- **Maps:** Business directory, geolocation, clustering, "Near Me"
- **Streaming:** Live streaming, chat, creator dashboard
- **Subscriptions:** Payment flow, tier enforcement, usage limits
- **Twitter Feed:** Post-login social integration with Portuguese hashtags

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

## Troubleshooting Guide

### Common Issues & Solutions

**Build/TypeScript Errors:**
```bash
npx tsc --noEmit  # Check TypeScript errors
npm run lint      # Check ESLint errors
npm run build     # Test production build
```

**Component Import Issues:**
- Path aliases: `@/*` maps to `./src/*`
- File extensions: Use `.tsx` for React components
- Check casing: React components must be PascalCase

**Bilingual System Issues:**
- Missing translations: Add keys to both `en.json` and `pt.json`
- Language not persisting: Check localStorage key 'lusotown-language'
- Hardcoded strings: Never use literal text, always use `t('key')`

**State Management Issues:**
- Context not available: Ensure providers wrap components in layout.tsx
- localStorage not working: Check keys (cart, favorites, networking, auth)
- State not persisting: Verify Context + localStorage integration

**Map & Geolocation Issues:**
- Map not loading: Check `NEXT_PUBLIC_MAP_SERVICE=openstreetmap`
- Geolocation failing: Requires HTTPS in production, check browser permissions
- Business directory empty: Verify PostGIS migration applied
- "Near Me" not working: Check location permissions and fallback areas

**Streaming Issues:**
- Streaming server not responding: `cd streaming && npm run health-check`
- RTMP connection failed: Verify streaming server is running on port 8080
- Chat not working: Check socket.io connection and moderation system

**Mobile Responsive Issues:**
- Test breakpoints: 375px (mobile), 768px (tablet), 1024px (desktop)
- Touch targets: Ensure buttons are >44px for mobile accessibility
- Layout overflow: Check container widths and responsive grids

**Modal & Dropdown Issues:**
- Modal not responsive: Use `max-h-[85vh]` (mobile) and `max-w-[3xl]` (desktop) for proper sizing
- Dropdown misaligned: Implement `left-1/2 transform -translate-x-1/2` for center positioning
- Click-outside not working: Ensure backdrop click handlers are properly implemented
- Viewport overflow: Add margin calculations to prevent dropdowns extending beyond screen

### Debug Checklist
1. **Console Errors:** Check browser console for React/Next.js errors
2. **Network Tab:** Verify API calls to Supabase and streaming server
3. **Context Providers:** Ensure all providers in app/layout.tsx
4. **Environment Variables:** Verify all required variables are set
5. **Portuguese Elements:** Check cultural integration vs. generic design

## Current Status & Implementation Notes

### Platform Status
- **Production Ready:** 75+ pages, 180+ components, complete bilingual system
- **Streaming Platform:** Fully integrated SRS server with Portuguese cultural features
- **Business Directory:** Public access with geolocation and interactive maps
- **Mobile App:** React Native/Expo (early development, onboarding flow complete)

### Key Implementation Details

**Next.js Configuration:**
- `ignoreBuildErrors: true` - TypeScript errors ignored in builds for faster deployment
- `transpilePackages` - Supports shared packages (@lusotown/ui, @lusotown/design-tokens)
- App Router with `/streaming` → `/live` redirect
- Image optimization for Unsplash, Cloudinary, BunnyCDN domains

**Subscription Tiers:**
- **Free:** 3 matches/day + 10 messages/month
- **Community Member:** £19.99/month - Unlimited matches & messaging
- **Cultural Ambassador:** £39.99/month - Priority visibility + event hosting

**Portuguese Brand Colors (use these, not generic Tailwind):**
- Primary: Portuguese brand colors only
- No generic blue/gray - always use Portuguese cultural color palette
- Mobile-first responsive design with enhanced touch targets

**Demo System:**
- Login: demo@lusotown.com / LusoTown2025!
- Bypass subscription requirements for testing
- Access all features without payment

## Latest Features & Updates

### Recent Major Features (August 2025)

**🗺️ Business Directory with Geolocation:**
- Public access without authentication required
- Interactive OpenStreetMap with business markers and clustering  
- "Near Me" functionality with configurable radius (1km-10km)
- Portuguese cultural areas pre-configured (Vauxhall, Stockwell, Golborne Road)
- 4-step business submission wizard with moderation queue

**📱 Twitter Feed Integration:**
- Post-login dashboard with Portuguese community hashtags
- Real-time feeds: #LusoLondon, #PortugueseUK, #LusoTown, #PortuguesesemLondres
- Tabbed interface: Community, Events, Business, Culture, UK Wide
- Complete bilingual support with live updates

**📺 Complete Streaming Platform:**
- Simple Relay Server (SRS) with RTMP → WebRTC → HLS pipeline
- Portuguese cultural emotes (:saudade:, :festa:, :futebol:)
- Creator monetization with 85/15 revenue splits
- Multi-currency support (BRL, EUR, GBP)
- Real-time chat with Portuguese language moderation

**💼 3-Tier Subscription System:**
- Simplified from complex 5-tier to data-driven 3-tier structure
- Free (3 matches/day), Community (£19.99/month), Ambassador (£39.99/month)
- Subscription enforcement only on premium features (not login/signup)
- Demo system bypasses all subscription requirements

### Recent UI/UX Improvements (August 2025)

**🎨 Welcome Modal Enhancements:**
- Fixed responsive modal sizing with `max-h-[85vh]` (mobile) and `max-w-[3xl]` (desktop)
- Improved mobile layout with compact 2x2 grid for feature cards
- Added click-outside-to-close functionality for better UX
- Updated skip button text from "Explore all features" to "Skip for now" (EN/PT)
- Enhanced accessibility and mobile usability across all device sizes

**🧭 Navigation Dropdown Centering:**
- Fixed dropdown menu positioning for 'More' and 'Events' navigation items
- Implemented intelligent centering using `left-1/2 transform -translate-x-1/2`
- Added margin calculations to prevent viewport overflow
- Both dropdowns now properly center under their trigger buttons

### Key Architecture Changes

**Mobile-First Redesign:**
- All components prioritize mobile experience with enhanced touch targets
- Responsive grids optimized for 375px, 768px, 1024px breakpoints
- 2x2 button grids for better mobile usability

**Portuguese Cultural Integration:**
- Brand colors throughout (no generic Tailwind blues/grays)
- Cultural elements integrated, not separate sections
- Portuguese-speaking focus in all messaging and UX

