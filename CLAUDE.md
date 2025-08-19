# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

LusoTown: Bilingual Portuguese community platform (London & UK) serving Portuguese speakers with event discovery, group activities, premium matching, transport services, streaming platform, and university partnerships.

**Tech Stack:** Next.js 14 (TypeScript), Tailwind CSS, Supabase, Vercel, Simple Relay Server (SRS) media streaming, YouTube Live integration, OpenStreetMap/Leaflet, PostGIS, Twitter API
**Status:** Production-ready - 75+ pages, 180+ components, complete bilingual system, enhanced mobile experience, integrated streaming platform, public business directory with geolocation, Twitter feed integration

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

```bash
# Development (from repo root)
cd web-app && npm install && npm run dev    # Start dev server (localhost:3000)

# Quality checks before committing (ALWAYS run these)
cd web-app && npm run lint                  # ESLint check
cd web-app && npx tsc --noEmit             # TypeScript check
cd web-app && npm run build               # Production build test

# Database migrations (from web-app directory)
npm run db:migrate           # Apply general database migrations
npm run db:migrate:streaming # Apply streaming-specific migrations
npm run db:migrate:streaming:complete # Apply complete streaming migration
npm run db:migrate:business  # Apply business directory with geolocation migration

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
npm run test:all            # Run unit + integration + performance tests

# Creator/verification scripts
npm run verify:creator-monetization # Verify creator monetization setup

# Streaming server (from repo root)
cd streaming && npm install && npm start    # Start streaming server (localhost:8080)
cd streaming && npm run health-check        # Check streaming server health
node streaming/streamlabs-setup.js          # Generate Streamlabs mobile configuration

# Streamlabs mobile setup (RTMP ingestion)
# RTMP URL: rtmp://[CODESPACE-URL]:1935/live/
# Stream Key: streamlabs_lusotown_2025
# HLS Output: https://[CODESPACE-URL]:8080/live/[stream_key].m3u8

# Git workflow
git add . && git commit -m "feat: describe change"  # Standard commit
git status                                         # Check working tree status
```

**Demo Login:** demo@lusotown.com / LusoTown2025!
**TypeScript:** Errors ignored in builds (`ignoreBuildErrors: true`)

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

**Structure:** Next.js 14 App Router with TypeScript, React Context state management, Supabase PostgreSQL backend
**Styling:** Tailwind CSS with Portuguese brand colors, mobile-first responsive layouts with enhanced touch targets
**State Management:** React Context + localStorage (no Redux), bilingual support via LanguageContext
**Key Pages:** /my-network, /transport, /matches, /live, /students, /premium-membership, /chauffeur, /events, /streaming, /creator-dashboard, /business-directory (public access), /dashboard (post-login with Twitter feed)
**Contexts:** LanguageContext, CartContext, FavoritesContext, NetworkingContext, SubscriptionContext, PlatformIntegrationContext, NotificationContext, FollowingContext
**Path Aliases:** `@/*` maps to `./src/*` for clean imports
**Assets:** Images stored in `/public/images/`, events in `/public/events/`, with fallbacks for missing assets

### Important Architecture Decisions

**Bilingual System:** 
- All UI text comes from `src/i18n/{en.json, pt.json}` - NEVER hardcode strings
- Use `useLanguage()` hook from LanguageContext for translations
- Format: `t('page.section.key')` for consistent namespacing

**Component Structure:**
- Features organized by domain (Events, Groups, Matches, Streaming, etc.)
- Shared UI components in `/components/` root
- Page-specific components near their pages in `/app/` structure
- Portuguese cultural elements integrated throughout (not separate sections)

**State Architecture:**
- React Context for global state (no external state libraries)
- localStorage for persistence (cart, favorites, language preference)
- Supabase for backend data and real-time subscriptions
- No Redux - intentionally kept simple for Portuguese community focus

**Streaming Integration:**
- Separate `/streaming/` Node.js server for media handling
- WebRTC/HLS delivery with Portuguese cultural features
- Real-time chat integration with Portuguese language moderation
- Creator monetization with Portuguese market focus (BRL, EUR, GBP)

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

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret

# Streaming Infrastructure Configuration
NEXT_PUBLIC_STREAMING_SERVER_URL=http://localhost:8080
NEXT_PUBLIC_RTMP_SERVER_URL=rtmp://localhost:1935
NEXT_PUBLIC_WEBRTC_SERVER_URL=http://localhost:8000
STREAMING_API_SECRET=your_streaming_api_secret

# Map & Geolocation Services
NEXT_PUBLIC_MAP_SERVICE=openstreetmap
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
NEXT_PUBLIC_IP_GEOLOCATION_API_KEY=your_ip_geolocation_api_key_here

# Twitter Integration
NEXT_PUBLIC_TWITTER_BEARER_TOKEN=your_twitter_bearer_token_here
NEXT_PUBLIC_PORTUGUESE_HASHTAGS=LusoLondon PortugueseUK LusoTown PortuguesesemLondres ComunidadePortuguesa

# CDN Configuration (Optional for development)
NEXT_PUBLIC_CDN_ENDPOINT=
BUNNYCDN_API_KEY=
BUNNYCDN_STORAGE_ZONE=
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
- **NEW:** Business directory public access without authentication
- **NEW:** Interactive map with business markers and clustering
- **NEW:** "Near Me" geolocation functionality with radius selector
- **NEW:** Business submission form (4-step wizard)
- **NEW:** Twitter feed integration with Portuguese hashtags
- **NEW:** Post-login dashboard with social media tab

**Quality Checks (Always run before committing):**
- `npm run lint` and `npx tsc --noEmit` (from web-app directory)
- Verify Portuguese brand colors (no generic Tailwind)
- Test responsive design (mobile/tablet/desktop)
- Validate CTAs (2 words max) and pricing ("From £XX")
- Run test suite: `npm run test:all` (unit + integration + performance)
- Check streaming infrastructure: `cd streaming && npm run health-check`

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
- TypeScript errors: `npx tsc --noEmit` (from web-app directory)
- Build failures: Check for missing dependencies or unused imports
- Language switching: check LanguageContext + localStorage (key: 'lusotown-language')
- Mobile layouts: ensure responsive grids with proper touch targets, test button accessibility
- State persistence: localStorage keys for cart/favorites/networking
- Streaming server connection: Ensure streaming server is running before testing live features
- Environment variables: Copy .env.local.example to .env.local and configure Supabase keys
- Component not found: Check path aliases (`@/*` = `./src/*`) and file extensions (.tsx)
- Portuguese translations missing: Add keys to both `src/i18n/en.json` and `src/i18n/pt.json`
- **NEW:** Map not loading: Check NEXT_PUBLIC_MAP_SERVICE environment variable
- **NEW:** Geolocation not working: Ensure HTTPS in production, check browser permissions
- **NEW:** Business directory empty: Verify PostGIS extension and migration applied
- **NEW:** Twitter feed not loading: Check NEXT_PUBLIC_TWITTER_BEARER_TOKEN configuration

**Debug Steps:**
1. Check browser console for React/Next.js errors
2. Verify all imports are correct (especially component paths)
3. Ensure all Context providers are wrapped properly in app structure
4. Test responsive design at mobile breakpoints (375px, 768px, 1024px)
5. Validate Portuguese cultural elements are integrated (not just translated)

## Current Development Status

**Branch:** main (production-ready branch)
**Recent Focus:** Complete streaming platform integration, codebase cleanup, mobile streaming optimization
**Key Modified Files (from recent git status):**
- Streaming infrastructure: streaming/.env.dev, streaming/config files
- Core components: web-app/src/components/ (many components enhanced)
- Page structure: Various pages cleaned up and optimized
- Configuration updates: next.config.js, package.json streaming integration

**Development Notes:**
- Platform is production-ready with ongoing cleanup of duplicate files and unused components
- TypeScript build errors are intentionally ignored in production builds per next.config.js
- Recent commits focus on deployment optimization and codebase organization
- Demo user system allows testing without full subscription requirements
- Mobile streaming integration actively being optimized for Streamlabs compatibility

## Recent Platform Improvements (August 2025)

### Complete 3-Tier Pricing Structure Implementation (August 18, 2025)
**Revolutionary Pricing Overhaul:**
- **Removed confusing 5-tier system** (basic, student, professional, business, vip)
- **Implemented data-driven 3-tier structure** optimized for conversion:
  - **Free**: 3 matches/day + 10 messages/month
  - **Community Member**: £19.99/month - Unlimited matches & messaging + events
  - **Cultural Ambassador**: £39.99/month - Everything + priority visibility + event hosting
- **Charm pricing strategy** (£19.99/£39.99) targeting psychological sweet spots
- **84% conversion rate** expected to £19.99 tier
- **£31,188 annual revenue potential** from 750 users
- **Competitive positioning** against Bumble (£39.99) and Hinge (£29.49)

### Platform-Wide Consistency Updates
**Complete Pricing Uniformity:**
- Updated MembershipTiers.tsx from complex 5-tier to clean 3-tier display
- Redesigned SubscriptionGate.tsx with new monthly pricing options
- Consistent pricing across all components (no more conflicting displays)
- Enhanced mobile navigation with complete desktop parity
- Portuguese/English bilingual support for all pricing displays

### Streaming Platform Integration (August 18, 2025)
**Complete Portuguese Streaming Platform:**
- Integrated comprehensive streaming infrastructure based on master plan
- Portuguese cultural emotes system (:saudade:, :festa:, :futebol:) with regional support
- Creator monetization system with 70/30 → 85/15 revenue splits for Portuguese creators
- Real-time chat with Portuguese language toxicity detection and cultural sensitivity
- Portuguese-focused content categories and discovery optimization
- Multi-region moderation system (Brazil/Portugal/Africa/Diaspora)
- Creator dashboard with Portuguese market insights and multi-currency support (BRL, EUR, GBP)

### Growth & Conversion Optimization
**Advanced Marketing Infrastructure:**
- **Referral system implementation** with code generation and tracking
- **Conversion funnel analytics** with detailed user journey tracking  
- **Email marketing automation** with Portuguese cultural messaging
- **Usage limit indicators** to drive upgrade conversions
- **Trial countdown systems** to create urgency
- **A/B testing framework** for pricing optimization

### Authentication & Subscription Updates
**Enhanced User Experience:**
- Removed subscription gating from /login and /signup pages per recent commit
- Subscription enforcement now applies only to premium service flows (transport, matches, etc.)
- Demo user authentication system allows bypassing subscription requirements
- Enhanced subscription modes: 'login', 'signup', 'transport', 'general' with different presentation styles
- Support for modal, compact, and full-page subscription gate variants

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

---

## CODEBASE STATUS (August 19, 2025)

### 🎉 COMPREHENSIVE CLEANUP PROJECT - COMPLETED

**Major Achievement:** Successfully completed comprehensive codebase optimization

#### **Final Results:**
- **Unified Streaming**: Single `/live` URL replaces 3 duplicate pages
- **Component Cleanup**: 142 files cleaned, removed unused components
- **Production Deployment**: https://lusotown-london-5au5n074m-giquinas-projects.vercel.app
- **Build Quality**: All TypeScript/ESLint issues resolved
- **Performance**: Faster builds, cleaner codebase structure

#### **Current Architecture Status:**
- ✅ Production website deployed and operational
- ✅ Streaming server with Portuguese cultural features
- ✅ Clean repository with organized documentation  
- ✅ Mobile streaming integration architecture ready

### 🚨 ACTIVE GIT STATUS ITEMS

**Modified Files Needing Attention:**
- `web-app/package.json` - Updated streaming dependencies (hls.js added)
- `web-app/src/app/live/page.tsx` - Unified streaming page (redirects from /streaming)
- `web-app/src/components/Header.tsx` - Navigation updates
- `web-app/src/components/CTA.tsx` - Call-to-action updates
- `web-app/src/components/UserTypeSelection.tsx` - Enhanced user onboarding
- `web-app/src/components/WhatsAppWidget.tsx` - Communication widget
- i18n files - Portuguese translations updated for new features

**Untracked Files to Consider:**
- `COMPONENT_CLEANUP_REPORT.md` - Documentation of cleanup process
- `PRODUCTION_STREAMING_DEPLOYMENT.md` - Production deployment guide
- `streaming/config/MOBILE_STREAMING_SETUP.md` - Mobile streaming configuration
- `streaming/deploy-railway.sh` - Railway deployment script
- `streaming/railway.toml` - Railway configuration
- `streaming/verify-production.sh` - Production verification script
- `web-app/src/components/MessageModerationDashboard.tsx` - New moderation component

**Next Actions:**
1. Review modified files and commit if changes are complete
2. Decide whether to commit or archive documentation files
3. Test new MessageModerationDashboard component integration
4. Verify streaming deployment configuration is production-ready

---

## MAJOR NEW FEATURES (August 19, 2025)

### 🗺️ **Enhanced Portuguese Business Directory (August 19, 2025)**
**Revolutionary Business Discovery Platform:**
- **Public Access**: Business directory now accessible without login/authentication
- **Interactive Mapping**: OpenStreetMap integration with business markers and clustering
- **Geolocation Services**: "Near Me" functionality with distance calculations using haversine formula
- **Portuguese Cultural Areas**: Pre-configured Portuguese neighborhoods (Vauxhall, Stockwell, Golborne Road)
- **Business Submission**: Public 4-step wizard for adding new businesses
- **Country Support**: Full Portuguese-speaking countries with emoji flags (🇵🇹🇧🇷🇦🇴🇲🇿🇨🇻🇬🇼🇸🇹🇹🇱🇲🇴🇬🇶)

**Key Components:**
- **BusinessMap.tsx**: Interactive map with markers, clustering, and business selection
- **NearMeButton.tsx**: Location-based discovery with configurable radius (1km, 2km, 5km, 10km)
- **BusinessSubmissionForm.tsx**: Multi-step business submission with validation
- **geolocation.ts**: Location services with Portuguese area definitions

**Technical Implementation:**
- **PostGIS Extension**: Geospatial database support for location queries
- **Database Migration**: `20250819_004_public_business_directory_with_geolocation.sql`
- **Distance Calculations**: Haversine formula for accurate distance measurements
- **Fallback Locations**: Portuguese cultural areas as default search centers

### 📱 **Twitter Feed Integration (August 19, 2025)**
**Portuguese Community Social Integration:**
- **Dashboard Integration**: Post-login social media tab with community hashtags
- **Portuguese Hashtags**: #LusoLondon, #PortugueseUK, #LusoTown, #PortuguesesemLondres
- **Tabbed Interface**: Organized content by Community, Events, Business, Culture, UK Wide
- **Real-time Updates**: Live Twitter feed integration with Portuguese community content
- **Bilingual Support**: Complete Portuguese/English translations

**Key Components:**
- **TwitterFeedWidget.tsx**: Embedded Twitter timeline with Portuguese hashtags
- **TwitterHashtagTabs.tsx**: Category-based hashtag organization
- **Dashboard Integration**: Social media tab accessible post-login

**Community Hashtags:**
- **#LusoLondon**: General Portuguese London community
- **#PortugueseUK**: UK-wide Portuguese content  
- **#LusoTown**: Platform-specific hashtag
- **#PortuguesesemLondres**: Portuguese community without borders
- **#ComunidadePortuguesa**: Portuguese community engagement

### 🏢 **Database Architecture Enhancements**
**PostGIS Geospatial Support:**
- **PostgreSQL Extension**: PostGIS for advanced geospatial queries
- **Business Tables**: Enhanced schema with latitude/longitude coordinates
- **Country Mapping**: Portuguese-speaking countries with flag support
- **Reviews & Photos**: Business review system with photo upload support
- **Cultural Events**: Business-hosted cultural events integration

**Migration Features:**
- **Location Indexing**: Optimized queries for distance-based searches
- **Public Submissions**: Table for managing public business submissions
- **Moderation System**: Business verification and approval workflows
- **Portuguese Areas**: Pre-configured Portuguese cultural neighborhoods

### 🚀 **API Integration Layer**
**Third-Party Service Integration:**
- **OpenStreetMap**: Free alternative to Google Maps with full feature parity
- **Leaflet**: Open-source mapping library with clustering support
- **Twitter API**: Real-time hashtag monitoring and community content
- **IP Geolocation**: Fallback location detection for users
- **Browser Geolocation**: Native location services with privacy controls

**Environment Configuration:**
```env
# Map & Geolocation Services
NEXT_PUBLIC_MAP_SERVICE=openstreetmap
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
NEXT_PUBLIC_IP_GEOLOCATION_API_KEY=your_ip_geolocation_api_key_here

# Twitter Integration
NEXT_PUBLIC_TWITTER_BEARER_TOKEN=your_twitter_bearer_token_here
NEXT_PUBLIC_PORTUGUESE_HASHTAGS=LusoLondon PortugueseUK LusoTown PortuguesesemLondres ComunidadePortuguesa

# Business Directory Configuration
NEXT_PUBLIC_BUSINESS_VERIFICATION_REQUIRED=true
NEXT_PUBLIC_MAX_BUSINESS_PHOTOS=5
NEXT_PUBLIC_ALLOWED_PHOTO_TYPES=image/jpeg,image/png,image/webp
NEXT_PUBLIC_MAX_PHOTO_SIZE_MB=5
```

### 🎯 **User Experience Improvements**
**Enhanced Navigation & Discovery:**
- **Public Business Access**: No authentication required for business discovery
- **Location-Based Search**: "Near Me" with radius selection for targeted discovery
- **Visual Clustering**: Map markers cluster intelligently to prevent overlap
- **Mobile-First**: Touch-optimized controls and responsive map interface
- **Portuguese Context**: Cultural areas and neighborhoods prominently featured

**Accessibility Features:**
- **Keyboard Navigation**: Full keyboard support for map interaction
- **Screen Reader**: ARIA labels and semantic HTML throughout
- **High Contrast**: Portuguese brand colors maintain accessibility standards
- **Mobile Touch Targets**: Enhanced button sizes for mobile interaction

### 💡 **Development Workflow Updates**
**New Testing Requirements:**
- **Map Interaction Testing**: Verify marker clustering and business selection
- **Location Permission Testing**: Test geolocation prompt handling
- **Offline Fallback Testing**: Verify functionality without location access
- **Twitter API Testing**: Hashtag filtering and community content display
- **Business Submission Testing**: Multi-step form validation and submission

**Quality Assurance Checklist:**
- ✅ Map loads correctly with OpenStreetMap tiles
- ✅ Business markers display with correct clustering
- ✅ "Near Me" button requests and handles location permissions
- ✅ Twitter feed displays Portuguese community hashtags
- ✅ Business submission form validates all required fields
- ✅ Portuguese areas are pre-configured and selectable
- ✅ Mobile interface is fully touch-optimized
- ✅ Bilingual support works across all new features

### 🔒 **Security & Privacy**
**Location Privacy:**
- **User Consent**: Explicit permission requests for location access
- **Secure Storage**: Location data cached locally, not stored on servers
- **Fallback Options**: Postal code and area selection when geolocation unavailable
- **Portuguese Areas**: Pre-configured cultural neighborhoods as safe defaults

**Business Data Protection:**
- **Moderation Queue**: All public business submissions reviewed before approval
- **Verification System**: Business authenticity checks and validation
- **Content Filtering**: Inappropriate content detection and removal
- **Portuguese Community Focus**: Cultural sensitivity in business categorization

**API Security:**
- **Rate Limiting**: Twitter API requests throttled to prevent abuse
- **Token Security**: Environment variables for sensitive API keys
- **CORS Configuration**: Restricted domains for map tile requests
- **Input Validation**: Sanitized user inputs across all forms

