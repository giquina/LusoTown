# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## ⚡ Quick Reference

**Start Development**: `cd web-app && npm run dev` (http://localhost:3000)  
**Demo Access**: demo@lusotown.com / LusoTown2025!  
**Must Pass Before Commit**: `npm run lint && npx tsc --noEmit && npm run build && npm run audit:hardcoding`  
**Primary Rule**: ZERO hardcoding - import from `/src/config/` files  
**Cultural Rule**: Use "Portuguese-speaking community" (not "Portuguese community")  
**Testing Rule**: Mobile-first responsive design (test at 375px, 768px, 1024px)  

## 🤖 Primary AI Instructions

**IMPORTANT**: For comprehensive AI development guidance, specialized agents, and detailed implementation rules, reference `/AGENTS.md` as the primary source of truth. This file works across all AI tools and IDEs.

The AGENTS.md file contains:
- 6 specialized advisory agents for expert guidance
- Complete UI/UX rules and implementation standards  
- Luxury enhancement priorities and cultural requirements
- Cross-IDE compatibility instructions
- Comprehensive testing frameworks and quality standards

## 🎯 Proactive AI Advisory System ⚡

LusoTown employs **intelligent advisory agents** that automatically activate based on context, errors, and development needs. These agents act as **proactive consultants** that provide expert guidance without requiring manual activation.

### 🤖 Automatic Advisory Activation

**CORE PRINCIPLE**: Agents are **always active** and automatically provide expert guidance based on what you're doing:

#### 🛠️ Development Issues → **Instant Troubleshooting**
- Build errors, dependency conflicts, port conflicts
- **Auto-Response**: Step-by-step diagnosis and solution
- **Prevention Mode**: Suggests preventive measures

#### 🌍 Community Content → **Inclusivity Validation**  
- Portuguese community references, event planning
- **Auto-Response**: Validates community guidelines, suggests corrections
- **Cultural Check**: Ensures authentic Portuguese representation

#### 📊 Performance Issues → **Optimization Coaching**
- Mobile experience problems, loading speed issues
- **Auto-Response**: Performance analysis and optimization recommendations
- **Mobile-First**: Prioritizes Portuguese-speaking community mobile usage

#### 🚀 Strategic Decisions → **Executive Consultation**
- Feature prioritization, business strategy questions
- **Auto-Response**: Executive-level guidance with business context
- **Growth Focus**: Portuguese-speaking community expansion strategies

#### 🔒 Security Concerns → **Guardian Protection**
- Privacy questions, GDPR compliance, authentication
- **Auto-Response**: Security validation and compliance guidance
- **Data Protection**: UK/EU user protection standards

#### 🎯 Quality Assurance → **Testing Mentorship**
- Bug reports, testing discussions, code reviews
- **Auto-Response**: Testing strategies and quality improvement suggestions
- **Bilingual Testing**: EN/PT functionality validation

### ⚡ Seamless Experience Examples

**Traditional (Manual)**: "Should I use X framework? Let me call the strategic advisor..."  
**LusoTown (Automatic)**: Discussing frameworks → **Strategic advisor instantly activated** → Provides framework analysis with Portuguese-speaking community context

**Traditional (Manual)**: "Getting build errors, need to troubleshoot..."  
**LusoTown (Automatic)**: Build error detected → **Development advisor instantly activated** → Provides diagnosis and fix automatically

**Traditional (Manual)**: "Let me check if this content is inclusive..."  
**LusoTown (Automatic)**: Community content detected → **Inclusivity advisor instantly activated** → Validates and suggests improvements automatically

### 🎯 Agent Intelligence Levels

- **🚨 High Priority**: Development errors, security issues → **Immediate activation**
- **📋 Medium Priority**: Community content, performance → **Contextual activation** 
- **💡 Low Priority**: Quality, analytics → **Proactive suggestions**

**Result**: Expert guidance feels natural and integrated into your workflow, not like calling separate tools.

## 🌍 Community Inclusivity Guidelines

**CRITICAL**: LusoTown serves Portuguese speakers from ALL lusophone nations (Portugal, Brazil, Cape Verde, Angola, Mozambique, etc.) across the entire United Kingdom.

**Essential Guidelines**:
- Use "Portuguese-speaking community" NOT "Portuguese community" 
- Reference "United Kingdom" NOT just "London"
- Always mix events from multiple Portuguese-speaking nations (Portugal, Brazil, Cape Verde, etc.)
- Include diverse user testimonials from all lusophone backgrounds

**Documentation**: See `/web-app/src/config/community-guidelines.ts` for comprehensive inclusivity rules, validation functions, and usage examples.

## 🛠️ Development Troubleshooting

**Common Issues and Solutions**:

### TailwindCSS Module Not Found
```bash
# Error: Cannot find module 'tailwindcss'
cd /workspaces/LusoTown
npm install tailwindcss autoprefixer postcss --save-dev
# Restart development server
```

### npm ENOTEMPTY Errors
```bash
# Error: ENOTEMPTY directory rename conflicts
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Port Conflicts
```bash
# If port 3000 is in use
lsof -i :3000  # Find process using port
kill -9 <PID>  # Kill the process
# Or use different port: npm run dev -- -p 3002
```

**For complex issues**: Development troubleshooting advisor automatically activates to provide step-by-step guidance.

## Current Active TODO Tasks

See `/web-app/TODO.md` for comprehensive premium enhancement roadmap focusing on luxury Portuguese-speaking nations content and elite user experience improvements.

## Project Overview

LusoTown is a production-ready Portuguese-speaking community platform serving London & United Kingdom Portuguese speakers. It's a comprehensive social network with event discovery, business directory, streaming platform, transport services, and university partnerships.

**Tech Stack**: Next.js 14 App Router (TypeScript), Tailwind CSS, Supabase PostgreSQL with PostGIS, Simple Relay Server (SRS) for streaming, OpenStreetMap/Leaflet for mapping, Twitter API, Stripe, React Context state management.

**Status**: Production-ready with 120+ pages, 522+ components, complete bilingual EN/PT system, mobile-first responsive design, 4 integrated AI systems. **Live Platform**: https://lusotown-bzkyz77ez-giquinas-projects.vercel.app

## System Requirements

**Node.js**: v22.x (specified in engines)
**npm**: v9.x (specified in engines)
**Package Manager**: npm@9.9.3 (workspace support required)

## Development Commands

### Essential Commands (Use These Daily)
```bash
cd web-app

# Primary development
npm run dev                    # Start development server (localhost:3000)
npm run build                  # Production build (REQUIRED before commit)
npm run lint                   # ESLint validation (REQUIRED before commit)
npx tsc --noEmit               # TypeScript check (REQUIRED before commit)

# Critical quality checks
npm run audit:hardcoding       # Check for hardcoded values (CRITICAL - must pass)
npm run test                   # Run Jest tests
npm run test:all               # Run comprehensive test suite
```

### Complete Command Reference
```bash
cd web-app

# Development
npm run dev                    # Start development server (localhost:3000)
npm run build                  # Production build
npm run start                  # Start production server
npm run lint                   # ESLint validation
npm run export                 # Static export

# Testing Framework
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

# AI Systems
npm run ai:test                # Test AI systems integration
npm run ai:optimize            # Optimize AI performance

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
- **web-app/**: Next.js 14 web application (primary) - Production ready with 497+ components and 4 AI systems
- **streaming/**: Node.js/Express streaming server with SRS integration - RTMP/HLS delivery
- **mobile-app/**: React Native/Expo mobile application - Portuguese-speaking community focused
- **packages/**: Shared packages (`@lusotown/design-tokens`, `@lusotown/ui`)
- **supabase/**: Database schema and migrations (20+ migration files)
- **docs/**: Comprehensive documentation archive
- **scripts/**: Automation and deployment scripts

### Key Architectural Patterns

**1. Next.js 14 App Router Architecture**
- File-based routing in `/src/app/` directory
- 120+ pages with nested routes and dynamic segments
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
- Cultural-specific content for Portuguese-speaking community

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
- Portuguese-speaking community uses mobile heavily

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
- Target Portuguese speakers in London & United Kingdom specifically
- Maintain cultural context throughout development

### 4. Pre-Commit Quality Checks (REQUIRED)
```bash
cd web-app
npm run lint                    # Must pass - ESLint validation
npx tsc --noEmit               # Must pass - TypeScript check  
npm run build                  # Must pass - Production build
npm run audit:hardcoding       # Must pass - Zero hardcoded values
npm run test                   # Recommended - Unit tests
```

## Key Business Context

**Target Audience**: 750+ Portuguese-speaking community members, 2,150+ Portuguese university students across London & United Kingdom

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

# Portuguese-speaking community Metrics
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
**Performance Tests**: Mobile UX validation and Portuguese-speaking community metrics
**Security Tests**: Hardcoding audits and vulnerability scanning

Test files located in `/web-app/__tests__/` with organized subdirectories.

## Common Issues & Solutions

### Build & Development Issues
**Build Failures**: Usually TypeScript errors or missing config imports
- Check console output for specific error
- Fix imports from `/src/config/` directory
- Run `npx tsc --noEmit` to isolate TypeScript issues

**Port Conflicts**: If port 3000 is already in use
```bash
lsof -i :3000                  # Find process using port
kill -9 <PID>                 # Kill the process
# OR use different port
npm run dev -- --port 3001
```

**Node Modules Issues**: ENOTEMPTY errors or module conflicts
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Development Workflow Issues
**Translation Missing**: Add keys to both language files
- `/web-app/src/i18n/en.json` 
- `/web-app/src/i18n/pt.json`

**Hardcoding Audit Failures**: Remove hardcoded values and import from config files
- Use `/src/config/pricing.ts` for pricing data
- Use `/src/config/contact.ts` for contact information
- Use `/src/config/universities.ts` for university data

**Mobile Responsiveness**: Test at key breakpoints using browser dev tools
- 375px (mobile), 768px (tablet), 1024px (desktop)
- Use responsive design mode in Chrome/Firefox dev tools

**Portuguese Cultural Context**: Ensure authentic representation
- Use "Portuguese-speaking community" not "Portuguese community"
- Include all lusophone nations (Portugal, Brazil, Cape Verde, Angola, etc.)
- Reference "United Kingdom" not just "London"

### Performance Issues
**Slow Development Server**: 
```bash
cd web-app
rm -rf .next
npm run dev
```

**Build Memory Issues**:
```bash
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

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
- **522+ React Components**: Modular, reusable components with Portuguese cultural theming and AI integration
- **Specialized Component Libraries**: 
  - UI components in `/src/components/ui/` (buttons, cards, inputs)
  - Matching system in `/src/components/matches/` (AI-powered matching)
  - AI systems in `/src/components/ai/` (notification dashboards, analytics)
- **TypeScript First**: Strict typing with `exactOptionalPropertyTypes` and `noUncheckedIndexedAccess`
- **Context-Based State**: 9+ React contexts for state management
- **Configuration-Driven**: All dynamic data centralized in `/src/config/` (15+ config files)

### File Organization Patterns
```
/src/app/                    # Next.js 14 App Router pages
/src/components/             # Reusable React components
  ├── ui/                   # Base UI components (button, card, input)
  ├── matches/              # AI matching system components  
  ├── students/             # University partnership components
  └── [feature]/            # Feature-specific components
/src/config/                 # Configuration files (NO hardcoding)
/src/context/                # React context providers
/src/hooks/                  # Custom React hooks
/src/i18n/                   # Bilingual translations (en.json, pt.json)
/src/lib/                    # Utility functions and helpers
  ├── ai/                   # AI engine implementations
  └── privacy/              # GDPR compliance utilities
/src/services/               # Business logic and API clients
/src/types/                  # TypeScript type definitions
/src/utils/                  # Generic utility functions
```

### Data Flow Architecture
- **Supabase Backend**: PostgreSQL with PostGIS extension for geolocation
- **React Context**: Client-side state management (Language, Heritage, Subscription)
- **API Routes**: Next.js API routes in `/src/app/api/` for server operations
- **Real-time Updates**: Supabase real-time subscriptions for live data
- **AI Integration**: 4 production AI systems with Portuguese cultural context

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

**Mobile UX**: Portuguese-speaking community is mobile-heavy, prioritize mobile experience

**Cultural Authenticity**: Platform specifically serves Portuguese speakers in London & United Kingdom, not a generic international platform

**AI Integration**: 4 production AI systems with Portuguese language support and cultural context awareness

**Testing Strategy**: Comprehensive testing including 168+ AI system tests and mobile UX validation

**Production Deployment**: Successfully deployed to https://lusotown-bzkyz77ez-giquinas-projects.vercel.app with all AI systems operational

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