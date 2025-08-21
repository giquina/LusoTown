# AI Agent Instructions

This file provides guidance to AI coding agents (Claude, GPT, Cursor, GitHub Copilot, etc.) when working with the LusoTown codebase.

## 🌍 Project Overview

**LusoTown**: Production-ready bilingual Portuguese community platform serving London & UK Portuguese speakers with event discovery, group activities, premium matching, transport services, streaming platform, business directory, and university partnerships.

**Tech Stack**: Next.js 14 App Router (TypeScript), Tailwind CSS, Supabase PostgreSQL, Simple Relay Server (SRS), OpenStreetMap/Leaflet, PostGIS, Twitter API, Stripe, React Context state management

**Status**: Production-ready - 111+ pages, 421+ components, complete bilingual i18n system, mobile-first responsive design, integrated streaming platform, public business directory with geolocation

---

## 🚀 Quick Start for AI Agents

### Essential Commands
```bash
# Development (from repository root)
cd web-app && npm install && npm run dev    # Start at localhost:3000
cd streaming && npm install && npm start    # Streaming server at localhost:8080

# Quality Checks (ALWAYS run before commits)
cd web-app
npm run lint                 # ESLint check - must pass
npx tsc --noEmit            # TypeScript check - must pass  
npm run build               # Production build test
npm run test:all            # Comprehensive test suite
npm run audit:hardcoding    # Check for hardcoded values
```

### Environment Setup
Copy `web-app/.env.local.example` to `web-app/.env.local` and configure Supabase keys + optional services.

---

## 🎯 Core Principles for AI Agents

### 1. 🚨 NEVER HARDCODE ANYTHING
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

**Critical Rule**: All prices, contacts, URLs, cultural data must come from `/src/config/` files.

### 2. 🌐 Bilingual First
```typescript
// ❌ NEVER hardcode text:
<h1>Welcome to LusoTown</h1>

// ✅ ALWAYS use translations:
const { t } = useLanguage()
<h1>{t('welcome.title')}</h1>
```

### 3. 🎨 Portuguese Cultural Design
- Use Portuguese brand colors from `@/config/brand.ts`
- No generic blue/gray colors
- Mobile-first responsive design
- Cultural elements integrated, not separate

### 4. 🔧 Configuration-Driven Development
All dynamic data lives in `/src/config/`:
- `pricing.ts` - All pricing, subscriptions, discounts
- `universities.ts` - University partnerships, student counts  
- `cultural-centers.ts` - Portuguese cultural institutions
- `routes.ts` - All URL routing
- `brand.ts` - Brand colors, styling
- `contact.ts` - Contact information

---

## 📁 Project Architecture

### Key Directories
```
web-app/src/
├── app/                    # Next.js App Router pages (111+ pages)
├── components/             # React components (421+ components)
├── config/                 # 🚨 CENTRALIZED CONFIG (always import from here)
├── context/                # React Context providers
├── i18n/                   # Bilingual translations (en.json, pt.json)
├── lib/                    # Utilities, API clients
├── services/               # Business logic, API services
└── utils/                  # Helper functions
```

### Essential Files for Agents
- **Config Files**: `/src/config/*` - Import all data from here
- **Translations**: `/src/i18n/{en.json, pt.json}` - All user-facing text
- **Contexts**: `/src/context/*` - State management providers
- **Types**: Look for TypeScript interfaces in relevant files

---

## 🛠️ Agent-Specific Guidelines

### Code Generation Rules
1. **Import First**: Always check existing imports and config files
2. **Type Safety**: Use proper TypeScript interfaces
3. **Mobile-First**: Design for 375px mobile, scale up
4. **Portuguese Context**: Integrate cultural elements naturally
5. **Test Coverage**: Include test files for significant components

### Common Patterns to Follow
```typescript
// Pricing
import { formatPrice, getFormattedPlanPrice } from '@/config/pricing'

// Translations
const { t, language } = useLanguage()

// Portuguese brand colors
className="bg-primary-600 text-white" // Not bg-blue-600

// Routes
import { ROUTES } from '@/config/routes'
href={ROUTES.events} // Not "/events"
```

### Files You Should Never Edit
- `/src/config/*` files contain environment-configurable data
- `/src/i18n/*` translation files (unless adding new keys)
- Build outputs in `.next/`, `dist/`

---

## 🔍 Debugging & Troubleshooting

### Common Issues
1. **Build Errors**: Check TypeScript imports and config file paths
2. **Missing Translations**: Add keys to both `en.json` and `pt.json`
3. **Hardcoded Values**: Run `npm run audit:hardcoding`
4. **State Issues**: Verify Context providers in `app/layout.tsx`
5. **Mobile Issues**: Test at 375px, 768px, 1024px breakpoints

### Debugging Checklist
- [ ] Console errors in browser dev tools
- [ ] Network tab for API call failures
- [ ] Environment variables set correctly
- [ ] Portuguese cultural elements present (not generic)
- [ ] Mobile responsive design working

---

## 🎯 Project-Specific Context

### LusoTown is NOT a Generic Platform
- **Target**: Portuguese speakers in London & UK
- **Culture**: Portuguese/Brazilian/Cape Verdean cultural elements
- **Language**: Portuguese language preservation focus
- **Community**: Real Portuguese cultural institutions (Instituto Camões, etc.)

### Key Features
- **Matches**: Cultural compatibility for Portuguese speakers
- **Events**: Portuguese cultural events, business networking
- **Transport**: Portuguese-speaking drivers, cultural routes
- **Streaming**: Portuguese cultural content, creator economy
- **Business**: Portuguese business directory with geolocation
- **Students**: 2,150+ Portuguese students across 8 universities

### Demo Access
- Login: `demo@lusotown.com` / `LusoTown2025!`
- Bypasses subscription requirements
- Full feature access for testing

---

## 📊 Current Status (Auto-Updated)

### Platform Metrics
- **Pages**: 111+ Next.js App Router pages
- **Components**: 421+ React/TypeScript components  
- **Universities**: 8 partnerships, 2,150+ Portuguese students
- **Languages**: Complete EN/PT bilingual system
- **Cultural Centers**: Instituto Camões, Portuguese cultural institutions

### Recent Updates
- ✅ Complete hardcoding refactoring (August 2025)
- ✅ Centralized pricing system with environment variables
- ✅ Portuguese cultural data configuration
- ✅ University partnerships data centralized
- ✅ Build verification and production readiness

---

## 💡 AI Agent Best Practices

### Before Making Changes
1. **Read existing code** - Understand patterns and conventions
2. **Check config files** - See what's already centralized
3. **Review translations** - Ensure bilingual support
4. **Test mobile-first** - Portuguese community uses mobile heavily

### During Development
1. **Follow patterns** - Use existing component structures
2. **Import from config** - Never hardcode values
3. **Use TypeScript** - Leverage existing interfaces
4. **Test continuously** - Check both EN and PT languages

### Before Committing  
1. **Run quality checks** - `npm run lint`, `npx tsc --noEmit`
2. **Build verification** - `npm run build`
3. **Hardcoding audit** - `npm run audit:hardcoding`
4. **Test mobile experience** - Verify responsive design

---

## 🔧 Advanced Configuration

### Environment Variables
```bash
# Essential
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Portuguese Community
NEXT_PUBLIC_TOTAL_MEMBERS=750
NEXT_PUBLIC_TOTAL_STUDENTS=2150
NEXT_PUBLIC_UNIVERSITY_PARTNERSHIPS=8

# Dynamic Pricing (optional overrides)
NEXT_PUBLIC_COMMUNITY_PRICE_MONTHLY=19.99
NEXT_PUBLIC_AMBASSADOR_PRICE_MONTHLY=39.99
```

### Build Configuration
- TypeScript errors ignored in builds (`ignoreBuildErrors: true`)
- Shared packages transpiled (`@lusotown/ui`, `@lusotown/design-tokens`)
- Image optimization for Unsplash, Cloudinary, BunnyCDN
- Aggressive bundle optimization for production

---

## 🤖 Agent-Specific Instructions

### For Claude Code
- Always use centralized configuration
- Follow bilingual patterns strictly  
- Respect Portuguese cultural context
- Use mobile-first responsive design

### For GitHub Copilot
- Leverage existing TypeScript interfaces
- Follow established import patterns
- Use Portuguese color palette constants
- Respect configuration-driven approach

### For Cursor
- Read `/src/config/` files for context
- Follow bilingual component patterns
- Use proper TypeScript imports
- Maintain cultural authenticity

### For Custom Agents
- Configuration over convention
- Portuguese cultural authenticity
- Mobile-first design principles
- Comprehensive testing coverage

---

*This file is automatically maintained. Last updated: August 2025*
*For questions about AI agent integration, check the project's issue tracker.*