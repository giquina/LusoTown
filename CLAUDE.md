# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LusoTown is a bilingual (English/Portuguese) adult community platform (18+) for Portuguese speakers in London and the UK. It serves as a social calendar and booking hub, connecting Portuguese-speaking adults for cultural activities, professional networking, and social experiences.

**Tech Stack:** Next.js 14 (TypeScript), Tailwind CSS, Supabase, Vercel
**Status:** Production-ready with 38+ pages, 54+ components, complete bilingual system

## Development Commands

**Working Directory:** Always navigate to `web-app/` before running commands.

```bash
cd web-app
npm install         # Install dependencies
npm run dev         # Start development server (http://localhost:3000)
npm run build       # Build for production
npm run start       # Start production server
npm run lint        # Run ESLint
npm run export      # Static export (next build && next export)
npm run deploy      # Deploy to Vercel
npx tsc --noEmit    # Type check without emitting files
```

**Testing:** No test framework configured. Use manual testing via local development server.

**Demo Login:**
- URL: http://localhost:3000/login
- Email: demo@lusotown.com
- Password: LusoTown2025!
- Auto-fill button available for quick access

## Architecture Overview

### Project Structure
```
LusoTown/
├── web-app/            # Next.js 14 application
│   ├── src/
│   │   ├── app/        # App router pages (38+)
│   │   ├── components/ # React components (54+)
│   │   ├── context/    # Global state (Language, Cart, Favorites, Following)
│   │   └── lib/        # Services and utilities
│   └── public/         # Static assets
├── supabase/          
│   ├── migrations/    # Database schema
│   └── config.toml    # Supabase config
└── .claude/           # Agent system configuration

### Key Architecture Patterns

**Routing & Pages:**
- Next.js 14 App Router with file-based routing
- 38+ static pages with trailing slashes enabled
- Static export configuration (no server-side features)

**State Management:**
- React Context for global state (Language, Cart, Favorites, Following)
- localStorage for persistence (cart, favorites, demo auth)
- No Redux or external state libraries needed

**Styling System:**
- Tailwind CSS with Portuguese-inspired brand colors
- Semantic color naming (primary, secondary, accent, action, premium, coral)
- Custom animations (fadeInUp, fadeIn, scaleIn, slideInRight)
- Responsive breakpoints: xs, sm, md, lg, xl, 2xl

**Component Patterns:**
- TypeScript interfaces for all props
- Client components with 'use client' directive
- Bilingual content support via useLanguage hook
- Consistent naming: PascalCase for components

**Data & Backend:**
- Supabase for database, auth, storage
- TypeScript types generated from database schema
- Demo authentication system with hardcoded credentials
- Environment variables for Supabase configuration

## Critical Development Patterns

**Bilingual Implementation:**
- All user-facing text must support both English and Portuguese
- Use `useLanguage` hook and `t()` function for translations
- Translation files located in `src/i18n/`
- Never hardcode English-only text in components

**State Management Architecture:**
- Global state via React Context providers (not Redux)
- Four main contexts: Language, Cart, Favorites, Following
- Providers must be wrapped in correct order in `layout.tsx`
- Use localStorage for state persistence

**Static Export Configuration:**
- Project configured for static export (`next export`)
- No server-side features (SSR, API routes, etc.)
- Images must be unoptimized (`unoptimized: true`)
- All pages use trailing slashes

**TypeScript Configuration:**
- `ignoreBuildErrors: true` in Next.js config
- Use `npx tsc --noEmit` for type checking
- All components must have proper TypeScript interfaces

## Core Context Providers

**LanguageContext:** Global language state (EN/PT) with localStorage persistence
**CartContext:** Shopping cart and saved items management
**FavoritesContext:** User favorites tracking
**FollowingContext:** User connections and following state

## Database Schema (Supabase)

**Core Tables:**
- profiles: User profiles with Portuguese community fields
- interests: Available interests/categories
- groups: Community groups
- events: Events with location, pricing, capacity
- group_members: Group membership tracking
- event_attendees: Event attendance tracking
- messages: Direct messaging system

**Storage Buckets:**
- profile-pictures
- group-images
- event-images

## Portuguese Brand Colors

Use semantic color names from Tailwind config:
- **primary** (Azul Atlântico): Deep ocean blue for navigation/info
- **secondary** (Verde Esperança): Emerald for success/positive
- **accent** (Dourado Sol): Amber for warnings/attention
- **action** (Vermelho Paixão): Red for CTAs/critical
- **premium** (Roxo Fado): Purple for premium features
- **coral** (Coral Tropical): Coral for warm accents

Never use generic `blue-*` classes - use brand colors instead.

## Agent System

The project includes 16 specialized agents for Portuguese community development, with 10 additional proposed agents under research:

### Portuguese Community Specialists (Deployed)
- **luso-content-agent**: Translation and cultural content
- **luso-events-agent**: Cultural events curation
- **luso-safety-agent**: Community moderation
- **luso-business-agent**: Business directory
- **luso-growth-agent**: SEO and outreach
- **luso-heritage-agent**: Heritage preservation
- **luso-membership-agent**: Membership optimization
- **luso-partnership-agent**: Institutional partnerships

### Development Specialists (Deployed)
- **bug-finder**: QA and testing
- **deploy-manager**: Deployment and DevOps
- **doc-writer**: Documentation
- **feature-builder**: Feature development
- **refactor-helper**: Code optimization

### Design & Management (Deployed)
- **project-manager-agent**: Project coordination
- **ui-specialist**: UI design
- **ux-specialist**: UX optimization

### Proposed Agents (Research Phase - Pending Approval)
- **luso-payment-agent**: Portuguese payment preferences and processing
- **luso-location-agent**: London Portuguese area and venue specialist
- **luso-messaging-agent**: Portuguese communication style optimization
- **luso-analytics-agent**: Portuguese community behavior analytics
- **luso-mobile-agent**: Mobile app Portuguese community features
- **luso-seo-agent**: Portuguese keyword and search optimization
- **luso-integration-agent**: Portuguese business system integrations
- **luso-compliance-agent**: UK/Portuguese legal compliance specialist
- **luso-feedback-agent**: Portuguese community feedback collection
- **luso-onboarding-agent**: Portuguese user onboarding optimization

**Agent Usage:**
```bash
# Find agents for a task
node .claude/invoke-agent.js "translate to portuguese"

# List all agents
node .claude/invoke-agent.js --list
```

Agent configuration: `.claude/agents.json`
Documentation: `.claude/AGENTS_GUIDE.md`

## Key Files to Reference

**Core Architecture:**
- `web-app/src/app/layout.tsx`: Root layout with providers
- `web-app/src/app/page.tsx`: Landing page
- `web-app/next.config.js`: Static export config
- `web-app/tailwind.config.js`: Design system

**Context Providers:**
- `src/context/LanguageContext.tsx`: Language state
- `src/context/CartContext.tsx`: Cart management
- `src/context/FavoritesContext.tsx`: Favorites
- `src/context/FollowingContext.tsx`: Connections

**Auth & Data:**
- `src/lib/auth.ts`: Demo auth system
- `src/lib/supabase.ts`: Database types
- `supabase/migrations/`: Database schema

**Key Components:**
- `src/components/Header.tsx`: Navigation
- `src/components/EventFeed.tsx`: Event feed
- `src/components/Cart.tsx`: Shopping cart
- `src/components/WelcomeModal.tsx`: Bilingual welcome

## Environment Variables

Required in `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## Administrative & Management Roles

The LusoTown platform has identified 10 key administrative and management positions needed for comprehensive Portuguese community operations. Detailed role specifications are documented in `LUSOTOWN_ADMINISTRATIVE_ROLES.md`.

### Administrative Positions (Research Complete)
1. **Portuguese Community Social Media Manager** - Bilingual social media strategy and engagement
2. **API Integration & Platform Technical Specialist** - Technical integrations and platform management
3. **Portuguese Business Development & Partnerships Manager** - Business relationships and partnerships
4. **Community Platform Administrator & User Experience Manager** - Platform operations and user management
5. **Portuguese Community Data Analytics & Growth Specialist** - Analytics and growth optimization
6. **Multilingual Customer Support Manager (Portuguese Focus)** - Customer support and community assistance
7. **Portuguese Community Growth & Acquisition Marketing Manager** - Marketing and community acquisition
8. **Event Operations & Portuguese Cultural Programming Manager** - Event coordination and cultural programming
9. **Content Strategy & Portuguese Heritage Manager** - Content creation and heritage preservation
10. **Business Intelligence & Portuguese Market Research Analyst** - Market research and business intelligence

### Career Page Implementation
- **Salary Information Removed**: Business decision to discuss compensation during interviews only
- **Focus on Role Descriptions**: Emphasis on responsibilities, requirements, and cultural fit
- **Portuguese Community Context**: All roles emphasize Portuguese cultural competency and community focus
- **Bilingual Presentation**: Complete English/Portuguese job descriptions for accessibility

**Documentation Reference:** `/workspaces/LusoTown/LUSOTOWN_ADMINISTRATIVE_ROLES.md` contains complete role specifications including original salary research.

## Development Workflow

**Before Making Changes:**
1. Run `cd web-app && npm run dev` to start development server
2. Test changes at http://localhost:3000
3. Always test both English and Portuguese language modes
4. Verify responsive design on mobile/desktop

**Quality Checks:**
- Run `npm run lint` before committing
- Run `npx tsc --noEmit` to check TypeScript errors
- Test demo login functionality works correctly
- Verify static export builds: `npm run export`

**Common Debugging:**
- If build fails, check TypeScript errors with `npx tsc --noEmit`
- Language switching issues: check LanguageContext and localStorage
- Styling issues: verify brand colors are used (not generic Tailwind colors)
- State persistence: check browser localStorage for cart/favorites

## Deployment

**Vercel:** `npm run deploy`
**Static Export:** `npm run export`
**Local:** `npm run dev` (http://localhost:3000)