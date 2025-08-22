# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🤖 Primary AI Instructions

**IMPORTANT**: For comprehensive AI development guidance, specialized agents, and detailed implementation rules, reference `/AGENTS.md` as the primary source of truth. This file works across all AI tools and IDEs.

The AGENTS.md file contains:
- 6 specialized advisory agents for expert guidance
- Complete UI/UX rules and implementation standards  
- Luxury enhancement priorities and cultural requirements
- Cross-IDE compatibility instructions
- Comprehensive testing frameworks and quality standards

## 🎯 AI Agent System Integration

LusoTown uses a specialized agent system for expert guidance across all development areas. Access these agents using the Task tool:

### Available Specialized Agents

- **`instruction-compliance-advisor`** - Analyzes implementation vs. documented rules, resolves conflicts
- **`strategic-decision-advisor`** - Provides executive-level guidance for feature prioritization and business decisions  
- **`qa-mentor-advisor`** - Expert testing strategies, bug prevention, quality education
- **`performance-coach-advisor`** - Performance optimization and mobile-first experience tuning
- **`security-guardian-advisor`** - Security, privacy, and GDPR compliance guidance
- **`growth-analytics-advisor`** - Data-driven growth strategies and Portuguese community expansion

### Agent Usage Example
```
Task tool with:
- description: "Strategic feature evaluation"  
- subagent_type: "strategic-decision-advisor"
- prompt: "Should we prioritize video calls or better matching algorithms for Portuguese community?"
```

**Full Agent Documentation**: See `/AGENTS.md` for complete specifications, activation scenarios, and integration guidelines.

## Current Active TODO Tasks

See `/web-app/TODO.md` for comprehensive premium enhancement roadmap focusing on luxury Portuguese-speaking nations content and elite user experience improvements.

## Project Overview

LusoTown is a production-ready Portuguese community platform serving London & UK Portuguese speakers. It's a comprehensive social network with event discovery, business directory, streaming platform, transport services, and university partnerships.

**Tech Stack**: Next.js 14 App Router (TypeScript), Tailwind CSS, Supabase PostgreSQL with PostGIS, Simple Relay Server (SRS) for streaming, OpenStreetMap/Leaflet for mapping, Twitter API, Stripe, React Context state management.

**Status**: Production-ready with 116+ pages, 475+ components, complete bilingual EN/PT system, mobile-first responsive design.

## System Requirements

**Node.js**: v22.x (specified in engines)
**npm**: v9.x (specified in engines)
**Package Manager**: npm@9.9.3 (workspace support required)

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
npm run test:unit              # Unit tests only
npm run test:integration       # Integration tests only
npm run test:performance       # Performance tests
npm run test:e2e               # Playwright end-to-end tests
npm run test:e2e:headed        # Visual E2E testing
npm run test:e2e:debug         # Debug E2E tests
npm run test:mobile            # Mobile-specific tests
npm run test:mobile-ux         # Mobile UX validation tests
npm run test:mobile-validation # Mobile UX validation
npm run test:portuguese        # Portuguese language tests
npm run test:all               # Run all test suites

# Quality & Security
npm run audit:hardcoding       # Check for hardcoded values (CRITICAL)
npm run audit:security         # Security audit
npm run audit:monthly          # Monthly audit (hardcoding + lint)

# Database Migrations
npm run db:migrate             # Apply database migrations
npm run db:migrate:streaming   # Apply streaming-specific migrations
npm run db:migrate:streaming:complete # Apply complete streaming migration

# Documentation Automation
npm run docs:update            # Update documentation
npm run docs:validate          # Validate documentation
npm run docs:full              # Full documentation workflow
npm run docs:health-check      # Documentation system health
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
- **web-app/**: Next.js 14 web application (primary) - Production ready with 475+ components
- **streaming/**: Node.js/Express streaming server with SRS integration - RTMP/HLS delivery
- **mobile-app/**: React Native/Expo mobile application - Portuguese community focused
- **packages/**: Shared packages (`@lusotown/design-tokens`, `@lusotown/ui`)
- **supabase/**: Database schema and migrations (20+ migration files)
- **docs/**: Comprehensive documentation archive
- **scripts/**: Automation and deployment scripts

### Key Architectural Patterns

**1. Next.js 14 App Router Architecture**
- File-based routing in `/src/app/` directory
- 116+ pages with nested routes and dynamic segments
- Server Components by default with selective Client Components
- API routes in `/src/app/api/` with comprehensive endpoints
- Layout components for shared UI (academy, events, premium sections)
- Loading, error, and not-found pages for enhanced UX

**2. Configuration-Driven Development**
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
npm run test                   # Must pass - Unit tests
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

Key migrations in `/supabase/migrations/` (chronological order):
- `20250811_001_initial_schema.sql` - Core user profiles and basic structure
- `20250812_001_messages_schema.sql` - Messaging system
- `20250814_001_enhanced_groups_safety.sql` - Group safety features
- `20250816_002_subscription_system.sql` - Subscription and payment system
- `20250817_001_premium_membership_tiers.sql` - Premium membership structure
- `20250818_001_streaming_platform_schema.sql` - Complete streaming infrastructure
- `20250818_002_conversion_funnel_system.sql` - User conversion tracking
- `20250818_004_referral_system.sql` - Referral and rewards system
- `20250818_006_cultural_preferences_system.sql` - Portuguese cultural matching
- `20250818_007_user_matches_system.sql` - Dating/networking matches
- `20250818_008_portuguese_cultural_events_system.sql` - Cultural events schema
- `20250819_001_portuguese_community_real_data_migration.sql` - Real community data
- `20250819_004_public_business_directory_with_geolocation.sql` - Business directory with PostGIS
- `20250821_001_cultural_compatibility_quiz.sql` - Cultural compatibility system

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

## Core Architecture

### Component Architecture
- **475+ React Components**: Modular, reusable components with Portuguese cultural theming
- **Specialized Component Libraries**: UI components in `/src/components/ui/`, matches in `/src/components/matches/`
- **TypeScript First**: Strict typing throughout the codebase with custom type definitions
- **Context-Based State**: 9+ React contexts for state management (Language, Heritage, Subscription, etc.)
- **Configuration-Driven**: All dynamic data centralized in `/src/config/` with 15+ configuration files

### Data Flow
- **Supabase Backend**: PostgreSQL with PostGIS for geospatial data
- **React Context**: Client-side state management
- **API Routes**: Next.js API routes for server-side operations
- **Real-time Updates**: Supabase real-time subscriptions

## Critical Patterns

### Import Patterns
```typescript
// Always import from config
import { SUBSCRIPTION_PLANS } from '@/config/pricing'
import { UNIVERSITY_PARTNERSHIPS } from '@/config/universities'
import { CULTURAL_CENTERS } from '@/config/cultural-centers'

// Always use translation context
import { useLanguage } from '@/context/LanguageContext'
const { t } = useLanguage()
```

### Component Patterns
```typescript
// Standard component structure
export default function ComponentName() {
  const { t } = useLanguage()
  const { colors } = useHeritage()
  
  return (
    <div className="bg-primary-50 text-primary-900">
      <h1>{t('component.title')}</h1>
    </div>
  )
}
```

## Hardcoding Prevention Rules

### Pricing & Financial Data
- **NEVER** hardcode prices: Use `@/config/pricing`
- **NEVER** hardcode currencies: Use `formatPrice()` function
- **NEVER** hardcode subscription tiers: Import from config

### Contact & Business Information
- **NEVER** hardcode emails: Use `@/config/contact`
- **NEVER** hardcode phone numbers: Use `@/config/contact`
- **NEVER** hardcode addresses: Use `@/config/contact`

### Cultural & Community Data
- **NEVER** hardcode university names: Use `@/config/universities`
- **NEVER** hardcode cultural centers: Use `@/config/cultural-centers`
- **NEVER** hardcode community metrics: Use environment variables

### Text & Translations
- **NEVER** hardcode user-facing text: Use `t('translation.key')`
- **NEVER** hardcode URLs: Use `@/config/routes`
- **NEVER** hardcode labels: Add to translation files

## Testing Framework

**Test Structure**: Tests located in `/web-app/__tests__/` with organized subdirectories

### Unit Testing
```bash
npm run test              # Run Jest unit tests
npm run test:watch        # Watch mode for development
npm run test:coverage     # Generate coverage reports
npm run test:unit         # Unit tests only (components/contexts/utils)
```

### Integration Testing
```bash
npm run test:integration  # API and context integration tests
npm run test:performance  # Performance validation tests
```

### End-to-End Testing (Playwright)
```bash
npm run test:e2e          # Playwright E2E tests
npm run test:e2e:headed   # Visual E2E testing
npm run test:e2e:debug    # Debug E2E tests
```

### Mobile & Portuguese-Specific Testing
```bash
npm run test:mobile       # Mobile-specific tests
npm run test:mobile-ux    # Mobile UX validation tests
npm run test:mobile-validation # Mobile UX validator tool
npm run test:portuguese   # Portuguese language tests
npm run test:all          # Comprehensive test suite
```

### Quality Assurance
```bash
npm run audit:hardcoding  # Critical: No hardcoded values
npm run audit:security    # Security vulnerability scan
npm run audit:monthly     # Monthly combined audit
npm run lint              # ESLint validation
npx tsc --noEmit         # TypeScript compilation check
```

## Special Considerations

**Heritage System**: Dynamic color theming through CSS custom properties and `HeritageContext`

**Streaming Integration**: Separate Node.js server with RTMP/HLS pipeline for Portuguese cultural content

**Geolocation**: PostGIS-powered business directory with Portuguese cultural areas pre-configured

**Mobile UX**: Portuguese community is mobile-heavy, prioritize mobile experience

**Cultural Authenticity**: Platform specifically serves Portuguese speakers in London & UK, not a generic international platform

---

## 📚 Comprehensive Documentation Ecosystem

### Primary Files for AI Development

1. **`/AGENTS.md`** - **Primary source of truth** for all AI development assistance
   - Complete agent system with 6 specialized advisors
   - UI/UX rules and implementation standards
   - Cultural requirements and luxury positioning guidelines
   - Cross-IDE compatibility instructions

2. **`/CLAUDE.md`** - This file - Claude Code specific guidance and project overview

3. **`/web-app/UI_UX_RULES.md`** - UI/UX specific rules (consolidated into AGENTS.md)

4. **`/web-app/TODO.md`** - Current enhancement priorities and luxury positioning roadmap

### Integration Strategy

- **All AI tools should reference `/AGENTS.md` first** for comprehensive guidance
- Use specialized agents via Task tool for expert assistance in specific areas
- Maintain consistency across development environments with centralized instructions
- Version control all AI guidance for team-wide standards

**🎯 For the best AI development experience, start with `/AGENTS.md` and use the specialized agent system for expert guidance in all areas of LusoTown platform development.**