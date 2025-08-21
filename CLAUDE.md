# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Current Active TODO Tasks

See `/web-app/TODO.md` for comprehensive premium enhancement roadmap focusing on luxury Portuguese-speaking nations content and elite user experience improvements.

## Project Overview

LusoTown is a production-ready Portuguese community platform serving London & UK Portuguese speakers. It's a comprehensive social network with event discovery, business directory, streaming platform, transport services, and university partnerships.

**Tech Stack**: Next.js 14 App Router (TypeScript), Tailwind CSS, Supabase PostgreSQL with PostGIS, Simple Relay Server (SRS) for streaming, OpenStreetMap/Leaflet for mapping, Twitter API, Stripe, React Context state management.

**Status**: Production-ready with 111+ pages, 421+ components, complete bilingual EN/PT system, mobile-first responsive design.

## Development Commands

### Web Application (Primary)
```bash
cd web-app

# Development
npm run dev                    # Start development server (localhost:3000)
npm run build                  # Production build
npm run start                  # Start production server
npm run lint                   # ESLint validation
npm run export                 # Static export

# Testing
npm run test                   # Run Jest tests
npm run test:watch             # Jest in watch mode
npm run test:coverage          # Generate coverage report
npm run test:e2e               # Playwright end-to-end tests
npm run test:mobile            # Mobile-specific tests
npm run test:all               # Run all test suites

# Quality & Security
npm run audit:hardcoding       # Check for hardcoded values (CRITICAL)
npm run audit:security         # Security audit
npm run test:mobile-validation # Mobile UX validation

# Database Migrations
npm run db:migrate             # Apply database migrations
npm run db:migrate:streaming   # Apply streaming-specific migrations

# Documentation Automation
npm run docs:update            # Update documentation
npm run docs:validate          # Validate documentation
npm run docs:full              # Full documentation workflow
```

### Streaming Server
```bash
cd streaming

npm start                      # Start streaming server (localhost:8080)  
npm run dev                    # Development with nodemon
npm run health-check           # Check server health
npm test                       # Run streaming tests
```

### Mobile App (React Native/Expo)
```bash
cd mobile-app

npm start                      # Expo development server
npm run android                # Android emulator
npm run ios                    # iOS simulator  
npm run web                    # Web version
```

### Root Level (Monorepo)
```bash
npm run dev                    # Start web app development
npm run build                  # Build web app
npm run lint                   # Lint web app
```

## Architecture Overview

### Monorepo Structure
- **web-app/**: Next.js 14 web application (primary)
- **streaming/**: Node.js/Express streaming server with SRS integration  
- **mobile-app/**: React Native/Expo mobile application
- **packages/**: Shared packages (design-tokens, UI components)
- **supabase/**: Database schema and migrations

### Key Architectural Patterns

**1. Configuration-Driven Development**
All dynamic data is centralized in `/web-app/src/config/`:
- `pricing.ts` - All pricing, subscriptions, discounts
- `universities.ts` - University partnerships (8 institutions, 2,150+ students)
- `cultural-centers.ts` - Portuguese cultural institutions  
- `portuguese-institutions.ts` - Government and official partnerships
- `brand.ts` - Portuguese brand colors and styling
- `routes.ts` - Centralized URL routing
- `contact.ts` - Contact information and social links

**2. Bilingual i18n System**
- Complete English/Portuguese translations in `/web-app/src/i18n/`
- `LanguageContext` for state management
- Dynamic language switching throughout the platform
- Cultural-specific content for Portuguese community

**3. Context-Based State Management**
Multiple React contexts in `/web-app/src/context/`:
- `LanguageContext` - Bilingual state and translations
- `HeritageContext` - Portuguese cultural theming  
- `SubscriptionContext` - Premium membership management
- `NetworkingContext` - Professional networking features
- `CartContext` - Event booking and favorites

**4. Heritage Color System**
Dynamic Portuguese heritage colors using CSS custom properties:
- Configurable through `HeritageContext`
- Default Portuguese flag-inspired palette
- Avoids generic blue/gray colors

**5. Mobile-First Design**
- Responsive breakpoints: xs(475px), sm(640px), md(768px), lg(1024px), xl(1280px), 2xl(1536px)
- Touch-optimized components
- Portuguese community uses mobile heavily

## Critical Development Rules

### 1. ZERO HARDCODING POLICY (MANDATORY)
```typescript
// ❌ NEVER DO THIS:
const price = "£19.99"
const contact = "demo@lusotown.com"  
const university = "University College London"

// ✅ ALWAYS DO THIS:
import { formatPrice, SUBSCRIPTION_PLANS } from '@/config/pricing'
import { UNIVERSITY_PARTNERSHIPS } from '@/config/universities'
const price = formatPrice(SUBSCRIPTION_PLANS.community.monthly)
```

### 2. Bilingual Text Requirements
```typescript
// ❌ NEVER hardcode text:
<h1>Welcome to LusoTown</h1>

// ✅ ALWAYS use translations:
const { t } = useLanguage()
<h1>{t('welcome.title')}</h1>
```

### 3. Portuguese Cultural Authenticity
- Use Portuguese brand colors from `@/config/brand.ts`
- Integrate cultural elements naturally (not as separate sections)
- Target Portuguese speakers in London & UK specifically
- Maintain cultural context throughout development

### 4. Pre-Commit Quality Checks (REQUIRED)
```bash
cd web-app
npm run lint                    # Must pass - ESLint validation
npx tsc --noEmit               # Must pass - TypeScript check  
npm run build                  # Must pass - Production build
npm run audit:hardcoding       # Must pass - Zero hardcoded values
```

## Key Business Context

**Target Audience**: 750+ Portuguese community members, 2,150+ Portuguese university students across London & UK

**University Partnerships**: 8 institutions (UCL, King's, Imperial, LSE, Oxford, Cambridge, Manchester, Edinburgh)

**Core Features**:
- **Social Events**: Cultural festivals, networking, guided tours
- **Business Directory**: Portuguese businesses with geolocation (PostGIS)
- **Streaming Platform**: Portuguese cultural content, creator monetization
- **Premium Transport**: Portuguese-speaking chauffeur services  
- **Student Services**: University partnerships and student verification
- **Matching System**: Cultural compatibility for Portuguese speakers

**Demo Access**: `demo@lusotown.com` / `LusoTown2025!` (bypasses subscription requirements)

## Database Schema

**Primary Database**: Supabase PostgreSQL with PostGIS extension
**Streaming**: Simple Relay Server (SRS) for RTMP/HLS delivery
**Location Data**: PostGIS for advanced geospatial queries

Key migrations in `/supabase/migrations/`:
- User profiles and cultural preferences
- Events and business directory  
- Streaming platform and creator economy
- Subscription and referral systems
- Portuguese community real data

## Environment Configuration

Essential variables for `/web-app/.env.local`:
```env
# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Portuguese Community Metrics
NEXT_PUBLIC_TOTAL_MEMBERS=750
NEXT_PUBLIC_TOTAL_STUDENTS=2150
NEXT_PUBLIC_UNIVERSITY_PARTNERSHIPS=8

# Business Directory & Maps
NEXT_PUBLIC_MAP_SERVICE=openstreetmap
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY= (optional)

# Twitter Integration  
NEXT_PUBLIC_TWITTER_BEARER_TOKEN=
NEXT_PUBLIC_PORTUGUESE_HASHTAGS=LusoLondon PortugueseUK LusoTown

# Streaming Platform
NEXT_PUBLIC_STREAMING_SERVER_URL=http://localhost:8080
RTMP_SERVER_PORT=1935
HLS_SERVER_PORT=8080

# Pricing Overrides (optional)
NEXT_PUBLIC_COMMUNITY_PRICE_MONTHLY=19.99
NEXT_PUBLIC_AMBASSADOR_PRICE_MONTHLY=39.99
```

## Testing Strategy

**Unit Tests**: Jest with Testing Library for components and utilities
**Integration Tests**: API routes and context integration  
**E2E Tests**: Playwright across Chrome, Firefox, Safari, Mobile Chrome/Safari
**Performance Tests**: Mobile UX validation and Portuguese community metrics
**Security Tests**: Hardcoding audits and vulnerability scanning

Test files located in `/web-app/__tests__/` with organized subdirectories.

## Common Issues & Solutions

**Build Failures**: Usually TypeScript errors or missing config imports - check console and fix imports from `/src/config/`

**Translation Missing**: Add keys to both `/web-app/src/i18n/en.json` and `pt.json`

**Hardcoding Audit Failures**: Remove hardcoded values and import from config files

**Mobile Responsiveness**: Test at 375px, 768px, 1024px breakpoints using browser dev tools

**Portuguese Cultural Context**: Ensure cultural elements are integrated naturally, not generic or separated

## Deployment

**Primary**: Vercel with automatic CI/CD from GitHub
**Staging**: Railway for streaming server  
**Database**: Supabase with PostGIS
**CDN**: BunnyCDN for Portuguese cultural content

Build configuration optimized for production with bundle splitting, image optimization for multiple domains, and Portuguese content delivery.

## Development Workflow

1. Always start with `cd web-app && npm run dev`
2. Check existing patterns in `/src/config/` and `/src/context/`  
3. Follow bilingual development (add translations to both `en.json` and `pt.json`)
4. Use Portuguese brand colors, never generic blue/gray
5. Test mobile-first (375px breakpoint)
6. Run quality checks before commits
7. Portuguese cultural context should guide all decisions

## Special Considerations

**Heritage System**: Dynamic color theming through CSS custom properties and `HeritageContext`

**Streaming Integration**: Separate Node.js server with RTMP/HLS pipeline for Portuguese cultural content

**Geolocation**: PostGIS-powered business directory with Portuguese cultural areas pre-configured

**Mobile UX**: Portuguese community is mobile-heavy, prioritize mobile experience

**Cultural Authenticity**: Platform specifically serves Portuguese speakers in London & UK, not a generic international platform