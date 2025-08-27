# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**Updated: 2025-08-27** | **Last Commit**: 80d126f fix: remove dynamic export to resolve build naming conflict

## ⚡ Quick Start Commands

**Development**: `cd web-app && npm run dev` (http://localhost:3000)  
**Streaming**: `cd streaming && npm start` (http://localhost:8080)  
**Demo Access**: demo@lusotown.com / LusoTown2025!  
**Pre-Commit**: `cd web-app && npm run lint && npx tsc --noEmit && npm run build && npm run audit:hardcoding`

## 🚨 Critical Development Rules

**ZERO HARDCODING**: All data must be imported from `/src/config/` files  
**Cultural Context**: Use "Portuguese-speaking community" (not "Portuguese community")  
**Mobile-First**: Test at 375px, 768px, 1024px breakpoints  
**Bilingual**: All user-facing text must use `t('translation.key')`

## 🧪 Essential Testing Commands

```bash
cd web-app
npm test ComponentName.test          # Single component test
npm test -- --testNamePattern="name" # Specific test
npx playwright test file.spec.ts     # Single E2E test
npx playwright test file.spec.ts --headed # Visual E2E test
npm run audit:hardcoding             # CRITICAL: Check for hardcoded values
```

## 🤖 AI Agent System

**Primary Reference**: `/AGENTS.md` - Complete agent system with specialized advisors for development, cultural validation, performance optimization, quality assurance, and security.

## 🌍 Community Inclusivity Guidelines

**CRITICAL**: LusoTown serves Portuguese speakers from ALL lusophone nations (Portugal, Brazil, Cape Verde, Angola, Mozambique, etc.) across the entire United Kingdom.

**Essential Guidelines**:
- Use "Portuguese-speaking community" NOT "Portuguese community" 
- Reference "United Kingdom" NOT just "London"
- Always mix events from multiple Portuguese-speaking nations (Portugal, Brazil, Cape Verde, etc.)
- Include diverse user testimonials from all lusophone backgrounds

**Documentation**: See `/web-app/src/config/community-guidelines.ts` for comprehensive inclusivity rules, validation functions, and usage examples.

**Latest Enhancement**: See `/web-app/PLATFORM_ENHANCEMENTS_SUMMARY.md` for detailed overview of recent cultural inclusivity improvements, Lusophone cultural celebrations system, and enhanced business directory features.


## Current Active TODO Tasks

See `/web-app/TODO.md` for comprehensive premium enhancement roadmap focusing on luxury Portuguese-speaking nations content and elite user experience improvements.

## 📖 Project Overview

**LusoTown**: Portuguese-speaking community platform for United Kingdom residents. Features event discovery, business directory, streaming platform, transport services, and university partnerships.

**Tech Stack**: Next.js 14, TypeScript, Tailwind CSS, Supabase PostgreSQL + PostGIS, Simple Relay Server (SRS)  
**Status**: Production-ready - 135+ pages, 496+ components, 4 AI systems  
**Live Platform**: https://web-99kxh0sku-giquinas-projects.vercel.app

**Target Audience**: 750+ Portuguese speakers, 2,150+ university students (UK-wide)  
**Universities**: 8 partnerships (UCL, King's, Imperial, LSE, Oxford, Cambridge, Manchester, Edinburgh)

## 💻 System Requirements

**Node.js**: v22.x (web-app) / v18+ (root)  
**npm**: v9.x (web-app) / v8+ (root)  
**Package Manager**: npm (monorepo workspace support required)

## 📋 Development Commands

### Core Development
```bash
cd web-app
npm run dev                    # Start development (localhost:3000)
npm run build                  # Production build
npm run lint                   # ESLint validation
npx tsc --noEmit              # TypeScript check
npm run audit:hardcoding      # CRITICAL: Check for hardcoded values
```

### Testing
```bash
# Unit Testing
npm run test                  # Jest unit tests
npm run test:watch            # Watch mode
npm test ComponentName.test   # Single component test

# E2E Testing (Playwright)  
npx playwright test file.spec.ts           # Single E2E test
npx playwright test file.spec.ts --headed  # Visual E2E test
npm run test:e2e:debug                      # Debug E2E tests

# Specialized Testing
npm run test:mobile           # Mobile-specific tests
npm run test:portuguese       # Portuguese language tests
npm run test:accessibility    # Accessibility tests
```

### Quality & Deployment
```bash
# Pre-Commit Checks (REQUIRED)
npm run audit:hardcoding      # CRITICAL: Must pass
npm run lint                  # ESLint
npx tsc --noEmit             # TypeScript
npm run build                # Build test

# Deployment
npm run deploy               # Deploy to Vercel
```

### Streaming Server (Portuguese Cultural Content Platform)
```bash
cd streaming

npm start                      # Start streaming server (localhost:8080)  
npm run dev                    # Development with nodemon
npm run health-check           # Check server health
npm test                       # Run streaming tests
npm run cultural-content-sync  # Sync Portuguese cultural programming
npm run palop-content-import   # Import PALOP cultural content
```

**Enhanced Portuguese Cultural Features:**
- **RTMP Ingest**: Dedicated endpoints for Portuguese cultural events (Fado, festivals, business talks)
- **HLS Delivery**: Optimized for UK Portuguese diaspora with CDN endpoints across London
- **Content Moderation**: AI-powered Portuguese language content filtering with cultural sensitivity
- **PALOP Integration**: Specialized streaming for Angola, Cape Verde, Mozambique cultural content
- **Cultural Analytics**: Viewer engagement tracking for Portuguese heritage programming
- **Live Event Support**: Real-time streaming for Portuguese community events in London

**Engine Requirements:**
- **Node.js**: v22.x+ (Required for advanced streaming features and Portuguese text processing)
- **FFmpeg**: Latest version for Portuguese audio/video optimization
- **SRS**: Simple Relay Server v4.0+ for RTMP/HLS pipeline

### Mobile App (React Native/Expo)
```bash
cd mobile-app

npm start                      # Expo development server
npm run android                # Android emulator
npm run ios                    # iOS simulator  
npm run web                    # Web version
npm run validate-setup         # Validate mobile app configuration
```

**Engine Requirements:**
- **Node.js**: v18.x+ (required for Expo SDK 49+)
- **npm**: v8.x+ (for workspace compatibility)
- **Expo CLI**: Latest version for Portuguese cultural features
- **EAS CLI**: Required for Portuguese push notifications and cultural content delivery

**Portuguese-Specific Features:**
- Portuguese language pack integration with native date/time formatting
- Cultural event notifications with Portuguese flag emoji support
- PALOP country flag rendering in native components
- Portuguese-first onboarding flow with cultural heritage selection

### Root Level (Monorepo Management)
```bash
npm run dev                    # Start web app development
npm run build                  # Build web app  
npm run lint                   # Lint web app
npm run deploy                 # Deploy to Vercel
npm run workspace:install      # Install dependencies for all workspaces
npm run workspace:clean        # Clean node_modules for all workspaces
npm run workspace:build        # Build all workspace projects
npm run portuguese-setup       # Setup Portuguese locale and cultural configs
npm run cultural-audit         # Audit Portuguese cultural content compliance
```

**Enhanced Monorepo Commands:**
- **Cross-platform Development**: Commands that work across web-app, mobile-app, and streaming
- **Portuguese Cultural Integration**: Specialized commands for cultural content management
- **PALOP Content Management**: Bulk operations for African Portuguese-speaking countries content
- **UK Deployment Pipeline**: Optimized deployment for UK Portuguese diaspora audience

## 🏗️ System Architecture

### Monorepo Structure
```
web-app/     # Next.js 14 (primary) - 135+ pages, 496+ components
streaming/   # Node.js/Express - RTMP/HLS pipeline  
mobile-app/  # React Native/Expo
supabase/    # PostgreSQL + PostGIS schema
```
**Pattern**: Always `cd` into specific directory before running commands.

### Key Architectural Patterns

**Configuration-First Development**  
All data centralized in `/web-app/src/config/` (49+ files):
```typescript
// ❌ NEVER: const price = "£19.99"
// ✅ ALWAYS: import { SUBSCRIPTION_PLANS } from '@/config/pricing'
```

**Next.js 14 App Router**  
- File-based routing in `/src/app/` (135+ pages)
- Server Components by default, Client Components for interactivity
- API routes in `/src/app/api/`

**Portuguese Cultural System**
- Bilingual EN/PT via `LanguageContext`
- Heritage colors via CSS custom properties
- Cultural authenticity: Portuguese-speaking (not generic Portuguese)

**Component Architecture**
```
/src/components/    # 496+ components
  /ui/             # Base components (buttons, cards)
  /ai/             # 4 AI systems integration
  /matches/        # Cultural compatibility matching
  /mobile/         # Mobile-optimized components
```

**Data Layer**
- Supabase PostgreSQL + PostGIS for geolocation
- Redis caching (Upstash)
- Real-time subscriptions

## Critical Development Rules

### 1. 🚨 ZERO HARDCODING POLICY (MANDATORY)
**Must pass**: `npm run audit:hardcoding` before every commit

```typescript
// ❌ NEVER:
const price = "£19.99"
const email = "demo@lusotown.com"
const uni = "UCL"

// ✅ ALWAYS:
import { SUBSCRIPTION_PLANS, formatPrice } from '@/config/pricing'
import { CONTACT_INFO } from '@/config/contact'
import { UNIVERSITY_PARTNERSHIPS } from '@/config/universities'

const price = formatPrice(SUBSCRIPTION_PLANS.community.monthly)
const email = CONTACT_INFO.demo.email
const uni = UNIVERSITY_PARTNERSHIPS.ucl.name
```

### 2. Bilingual Text (EN/PT Required)
```typescript
// ❌ NEVER: <h1>Welcome to LusoTown</h1>
// ✅ ALWAYS:
const { t } = useLanguage()
return <h1>{t('welcome.title')}</h1>
```

### 3. Portuguese Cultural Context
- Import colors: `@/config/brand.ts` (never generic blue/gray)
- Use "Portuguese-speaking community" (not "Portuguese community")
- Target "United Kingdom" (not just "London")
- Mix all lusophone nations (Portugal, Brazil, Cape Verde, Angola, etc.)

### 4. Mobile-First Design
Test at: **375px** (mobile), **768px** (tablet), **1024px** (desktop)

### 5. Pre-Commit Checklist (REQUIRED)
```bash
cd web-app
npm run audit:hardcoding  # ← CRITICAL (must pass)
npm run lint              # ESLint validation
npx tsc --noEmit         # TypeScript check
npm run build            # Production build test
npm run qa:pre-commit     # Comprehensive QA checks
```

## Key Business Context

**Target**: 750+ Portuguese-speaking community members, 2,150+ university students (UK-wide)
**Universities**: 8 partnerships (UCL, King's, Imperial, LSE, Oxford, Cambridge, Manchester, Edinburgh)
**Demo Access**: `demo@lusotown.com` / `LusoTown2025!`

**Core Features**: Social events, business directory (PostGIS), streaming platform, premium transport, student services, cultural matching system

## Database Schema

**Primary**: Supabase PostgreSQL with PostGIS extension
**Streaming**: Simple Relay Server (SRS) for RTMP/HLS delivery
**Geolocation**: PostGIS for advanced spatial queries

**Migrations**: 20+ chronologically organized files in `/supabase/migrations/`
- Core: User profiles, messaging, safety features
- Business: Subscriptions, payments, membership tiers
- Platform: Streaming infrastructure, analytics, referrals
- Cultural: Portuguese cultural matching, events, compatibility quiz
- Directory: Business directory with PostGIS geolocation

## Environment Configuration

### Required Variables for `/web-app/.env.local`
```env
# Database (Essential)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Community Metrics (Important)
NEXT_PUBLIC_TOTAL_MEMBERS=750
NEXT_PUBLIC_TOTAL_STUDENTS=2150
NEXT_PUBLIC_UNIVERSITY_PARTNERSHIPS=8
```

### Optional Variables
```env
# Maps & Location
NEXT_PUBLIC_MAP_SERVICE=openstreetmap
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key

# Streaming Platform
NEXT_PUBLIC_STREAMING_SERVER_URL=http://localhost:8080
RTMP_SERVER_PORT=1935
HLS_SERVER_PORT=8080

# Social Integration
NEXT_PUBLIC_TWITTER_BEARER_TOKEN=your_twitter_token
NEXT_PUBLIC_PORTUGUESE_HASHTAGS=LusoLondon PortugueseUK LusoTown

# Pricing Overrides
NEXT_PUBLIC_COMMUNITY_PRICE_MONTHLY=19.99
NEXT_PUBLIC_AMBASSADOR_PRICE_MONTHLY=39.99
```

## Testing Strategy

**Unit Tests**: Jest with Testing Library for components and utilities
**Integration Tests**: API routes and context integration  
**E2E Tests**: Playwright across Chrome, Firefox, Safari, Mobile Chrome/Safari
**Performance Tests**: Mobile UX validation and Portuguese-speaking community metrics
**Security Tests**: Hardcoding audits and vulnerability scanning

Test files located in `/web-app/__tests__/` with organized subdirectories.

## Single Command Testing

**Quick test single component**: `cd web-app && npm test ComponentName.test`
**Quick test single file**: `cd web-app && npm test -- --testNamePattern="specific test"`
**Debug failing tests**: `cd web-app && npm run test:watch` 

**Single E2E test**: `cd web-app && npx playwright test specific.spec.ts`
**Single E2E test with UI**: `cd web-app && npx playwright test specific.spec.ts --headed`

**Run specific test suite**:
- Mobile tests only: `npm run test:mobile`
- Portuguese tests only: `npm run test:portuguese` 
- Security tests only: `npm run test:security`

## 🔧 Common Issues & Solutions

### Development Issues
**Port 3000 in use**: `lsof -i :3000` → `kill -9 <PID>` or use `npm run dev -- -p 3001`  
**Slow dev server**: `rm -rf .next && npm run dev`  
**Module not found**: Ensure you're in correct directory (`cd web-app`)

### Build Issues  
**TypeScript errors**: Run `npx tsc --noEmit` to isolate issues  
**Hardcoding audit fails**: Import from `/src/config/` instead of hardcoding  
**Memory issues**: `export NODE_OPTIONS="--max-old-space-size=4096"`

### Cultural Context Issues
**Wrong terminology**: Use "Portuguese-speaking community" NOT "Portuguese community"  
**Geographic scope**: Reference "United Kingdom" NOT just "London"  
**Missing translations**: Add keys to both `/src/i18n/en.json` and `/src/i18n/pt.json`

### Mobile Issues
**Responsive breaks**: Test at 375px, 768px, 1024px breakpoints  
**Touch targets**: Ensure minimum 44px tap targets for Portuguese cultural content

## Deployment

### 🚀 Enhanced GitHub Actions Auto-Deployment (Updated August 2025)

**Primary**: Vercel with automatic CI/CD from GitHub  
**Staging**: Railway for streaming server  
**Database**: Supabase with PostGIS  
**CDN**: BunnyCDN for Portuguese cultural content

#### ✅ Fixed Deployment Issues (August 2025)
**CRITICAL**: The deployment system was completely overhauled to fix previous failures:

- ❌ **Previous Issue**: Node.js 18 used → ✅ **Fixed**: Now uses Node.js v22 (matches web-app engines requirement)
- ❌ **Previous Issue**: Lint/TypeScript errors ignored → ✅ **Fixed**: Blocking quality gates implemented
- ❌ **Previous Issue**: No hardcoding validation → ✅ **Fixed**: Mandatory hardcoding audit blocks deployment
- ❌ **Previous Issue**: Missing platform validation → ✅ **Fixed**: Portuguese community-specific checks

#### 🛡️ Mandatory Pre-Deployment Quality Gates
Every deployment now runs these **BLOCKING** checks (deployment fails if any fail):
```bash
# Required quality checks that MUST pass:
npm run audit:hardcoding  # CRITICAL: Blocks deployment if hardcoding found
npm run lint              # ESLint validation - must pass
npx tsc --noEmit         # TypeScript check - must pass  
npm run build            # Production build test - must pass
```

#### 🎯 Portuguese Community Platform Validation
Automated validation of LusoTown-specific requirements:
- ✅ Validates `community-guidelines.ts` exists
- ✅ Confirms `lusophone-celebrations.ts` configuration  
- ✅ Checks Portuguese translations (`pt.json`) presence
- ✅ Enforces cultural authenticity standards
- ✅ Validates mobile-first Portuguese-speaking community design

#### 📊 Deployment Workflow Triggers
1. **Preview Deployments**: Automatic on Pull Requests (with PR comment including preview URL)
2. **Production Deployments**: Automatic on push to main branch
3. **Manual Deployments**: Available via GitHub Actions workflow_dispatch

#### 🌐 Live Platform Status
**Production URL**: https://web-99kxh0sku-giquinas-projects.vercel.app  
**Community Metrics**: 750+ members, 2,150+ students, 8 universities partnerships

#### 🔧 Build Configuration Optimizations
Build configuration optimized for production with bundle splitting, image optimization for multiple domains, and Portuguese content delivery:

**Key Next.js Optimizations**:
- Bundle splitting for React, Heroicons, Framer Motion
- Image optimization for Unsplash, Cloudinary, BunnyCDN domains
- Server-side externalization of browser-only libraries (html5-qrcode, socket.io-client)
- Portuguese content CDN integration (BunnyCDN, YouTube thumbnails)
- Webpack optimization for react-native-web compatibility

#### 🚨 For Developers: Pre-Commit Requirements
**MANDATORY** before every commit:
```bash
cd web-app
npm run audit:hardcoding  # ← CRITICAL (must pass)
npm run lint              # ESLint validation
npx tsc --noEmit         # TypeScript check
npm run build            # Production build test
npm run qa:pre-commit     # Comprehensive QA checks
```

**Deployment monitoring**: All deployments now provide detailed logs and success confirmation with community metrics validation.

## Development Workflow

1. Always start with `cd web-app && npm run dev`
2. Check existing patterns in `/src/config/` and `/src/context/`  
3. Follow bilingual development (add translations to both `en.json` and `pt.json`)
4. Use Portuguese brand colors, never generic blue/gray
5. Test mobile-first (375px breakpoint)
6. Run quality checks before commits
7. Portuguese cultural context should guide all decisions

## Development Patterns

### Component Organization
Specialized component libraries organized by functionality:
- **UI Foundation**: `/src/components/ui/` - Base components (buttons, cards, inputs)
- **AI Systems**: `/src/components/ai/` - Notification dashboards and analytics
- **Matching System**: `/src/components/matches/` - AI-powered cultural compatibility
- **Student Services**: `/src/components/students/` - University partnership components
- **Feature-Specific**: Organized by business domain for maintainability

### Detailed File Structure
```
/src/
  ├── app/                 # Next.js 14 App Router (135+ pages)
  ├── components/          # 522+ React components
  │   ├── ui/             # Base UI components
  │   ├── ai/             # AI system components
  │   ├── matches/        # Matching system
  │   └── [feature]/      # Feature-specific components
  ├── config/             # 49+ configuration files (centralized exports)
  ├── context/            # React context providers
  ├── hooks/              # Custom React hooks
  ├── i18n/               # Bilingual EN/PT translations
  ├── lib/                # Business logic and utilities
  │   ├── ai/             # AI engine implementations
  │   └── privacy/        # GDPR compliance utilities
  ├── services/           # API clients and business services
  ├── types/              # TypeScript type definitions
  └── utils/              # Generic utility functions
```

### Integration Architecture
- **Configuration Layer**: 33+ config files with centralized exports through `index.ts`
- **State Management**: React contexts for client-side state (Language, Heritage, Subscription)
- **Data Flow**: Supabase PostgreSQL with PostGIS → API Routes → React Components
- **Real-time Features**: Supabase subscriptions for live updates and notifications
- **AI Ecosystem**: 4 production AI systems integrated throughout the platform

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

### End-to-End Testing (Playwright & MCP)
```bash
npm run test:e2e          # Playwright E2E tests
npm run test:e2e:headed   # Visual E2E testing
npm run test:e2e:debug    # Debug E2E tests

# Playwright MCP Server Integration (MANDATORY)
npm install -g @playwright/mcp@latest  # Install Playwright MCP
npx playwright-mcp                     # Start MCP server
npx playwright test ux-fixes-focused-verification.spec.ts  # UX verification
```

**🚨 CRITICAL REQUIREMENT**: All website changes MUST be verified using Playwright MCP before completion. This includes:
- UX component functionality verification
- Mobile responsiveness testing  
- Portuguese cultural context validation
- Widget positioning and z-index management
- Performance and loading state verification

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

**Mobile UX**: Portuguese-speaking community is mobile-heavy, prioritize mobile experience

**Cultural Authenticity**: Platform specifically serves Portuguese speakers in London & United Kingdom, not a generic international platform

**AI Integration**: 4 production AI systems with Portuguese language support and cultural context awareness

**Testing Strategy**: Comprehensive testing including 168+ AI system tests and mobile UX validation

**Production Deployment**: Successfully deployed to https://web-99kxh0sku-giquinas-projects.vercel.app with all AI systems operational

**AI Systems Status**: 4 production-ready AI engines deployed with comprehensive testing:
- AI Notification System (production-optimized with timing controls)
- AI-Enhanced Matching System (91/100 integration score with cultural compatibility) 
- LusoBot Portuguese AI Assistant (96/100 production score, 168+ comprehensive tests)
- Predictive Community Analytics (v2.0.0 GDPR-compliant with privacy controls)

**Mobile Excellence**: 73.3% luxury compliance with comprehensive elite mobile experience

**Elite Navigation**: Premium Portuguese cultural navigation with full accessibility compliance

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