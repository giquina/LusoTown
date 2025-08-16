# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LusoTown is a bilingual (English/Portuguese) social network serving two main audiences in London and the UK:

1. **Social Users** – Individuals looking to explore London and the UK through music events, club nights, cultural activities, guided tours, and other social experiences.

2. **Business Professionals** – Entrepreneurs, freelancers, and industry experts who want to attend professional events such as AI workshops, website creation masterclasses, and digital marketing training sessions — with a focus on the Portuguese business community in the UK, while remaining open to everyone.

The platform also caters to **event creators, organisers, and hosts** — both social and business — who can:
- Sign up and publish events
- Promote their brand or services  
- Monetise their events through ticket sales, sponsorships, or partnerships
- Build long-term relationships with attendees
- Use the platform's tools to narrate, guide, or host experiences

**Tech Stack:** Next.js 14 (TypeScript), Tailwind CSS, Supabase, Vercel
**Status:** Production-ready with 61+ pages, 118+ components, complete bilingual system, networking features, enhanced welcome onboarding, security transport services, annual membership pricing model (£25/year), mobile-optimized 2-column layouts, compact logo branding, and multi-step user preferences collection

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

**Automation Scripts:** Project includes automation scripts for documentation maintenance.

```bash
# From project root
./scripts/update-claude-md.sh      # Update CLAUDE.md with current stats
./scripts/post-deployment-update.sh  # Complete post-deployment verification
```

**Testing:** No test framework configured. Use manual testing via local development server at http://localhost:3000.

**TypeScript Configuration:**
```bash
npx tsc --noEmit    # Check TypeScript errors without building
```
Note: `ignoreBuildErrors: true` is set in next.config.js for production builds.

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
│   │   ├── app/        # App router pages (61+)
│   │   ├── components/ # React components (117+)
│   │   ├── context/    # Global state (Language, Cart, Favorites, Following, Networking)
│   │   └── lib/        # Services and utilities
│   └── public/         # Static assets
├── supabase/          
│   ├── migrations/    # Database schema
│   └── config.toml    # Supabase config
└── .claude/           # Agent system configuration

### Key Architecture Patterns

**Routing & Pages:**
- Next.js 14 App Router with file-based routing
- 61+ static pages with trailing slashes enabled (including /my-network, /transport, /housing-assistance, /mentorship, /neighborhood-groups)
- Static export configuration (no server-side features)
- Clear London & UK geographic focus for Portuguese community

**State Management:**
- React Context for global state (Language, Cart, Favorites, Following, Networking)
- localStorage for persistence (cart, favorites, demo auth, networking data)
- No Redux or external state libraries needed

**Styling System:**
- Tailwind CSS with Portuguese-inspired brand colors
- Semantic color naming (primary, secondary, accent, action, premium, coral)
- Custom animations (fadeInUp, fadeIn, scaleIn, slideInRight)
- Responsive breakpoints: xs, sm, md, lg, xl, 2xl
- Mobile-first design with consistent 2-per-line card layouts (`grid-cols-2 lg:grid-cols-3/4`)
- Uniform card heights and responsive gap spacing for optimal mobile experience

**Component Patterns:**
- TypeScript interfaces for all props
- Client components with 'use client' directive
- Bilingual content support via useLanguage hook
- Consistent naming: PascalCase for components
- Mobile-optimized layouts with 2-per-line card grids
- Fixed card heights with `h-[400px] sm:h-[450px] lg:h-[500px]` pattern
- Concise CTA buttons (2 words max: "Book Now", "View More", "Learn More")
- "From £XX" pricing format for transparency

**Data & Backend:**
- Supabase for database, auth, storage
- TypeScript types generated from database schema
- Demo authentication system with hardcoded credentials
- Environment variables for Supabase configuration

**Animation & UI Libraries:**
- Framer Motion for smooth animations and transitions
- React Hot Toast for notification system
- Headless UI for accessible component primitives
- Heroicons and Lucide React for comprehensive icon sets

## Critical Development Patterns

**Bilingual Implementation:**
- All user-facing text must support both English and Portuguese
- Use `useLanguage` hook and `t()` function for translations
- Translation files located in `src/i18n/`
- Never hardcode English-only text in components

**Code Quality & Performance:**
- TypeScript errors are ignored during builds (`ignoreBuildErrors: true`) but should be checked with `npx tsc --noEmit`
- ESLint runs during builds but warnings don't block deployment
- Custom webpack configuration optimizes chunk splitting for development and production
- Images are optimized with WebP/AVIF support from Unsplash domains

**Mobile-First UI Patterns:**
- **Professional 2x2 Grid Layouts**: All card sections use professional 2x2 grid layouts on mobile (`grid-cols-2 md:grid-cols-2 lg:grid-cols-3/4`)
- **Mobile Search Optimization**: Enhanced search bar with mobile-first design and Portuguese community imagery
- **Uniform Card Heights**: Service tiers and tour routes use fixed heights (`h-[580px] sm:h-[650px]`) for visual consistency
- **Location-Aware Titles**: All mobile titles include "London & UK" context for geographic clarity
- Consistent responsive gap spacing: `gap-3 sm:gap-4 lg:gap-6/8`
- CTA buttons limited to 2 words maximum for mobile readability
- Pricing displays must include "From" prefix for transparency ("From £XX")
- **Enhanced Mobile Menu**: Larger hamburger icon (12x12px) with improved touch targets and visibility
- **Portuguese Community Images**: Authentic Portuguese community imagery throughout mobile interface

**State Management Architecture:**
- Global state via React Context providers (not Redux)
- Five main contexts: Language, Cart, Favorites, Following, Networking
- Providers must be wrapped in correct order in `layout.tsx`
- Use localStorage for state persistence

**Static Export Configuration:**
- Static export currently DISABLED due to dynamic routes complexity (see next.config.js line 15-16)
- Can be re-enabled after refactoring dynamic routes to use server components
- Images optimized with WebP/AVIF support (`unoptimized: false`)
- All pages use trailing slashes (`trailingSlash: true`)
- Supports Unsplash image domains for content

**TypeScript Configuration:**
- `ignoreBuildErrors: true` in Next.js config
- Use `npx tsc --noEmit` for type checking
- Path alias configured: `@/*` maps to `./src/*`
- All components must have proper TypeScript interfaces

**Webpack Optimization:**
- Custom chunk splitting for development and production
- Vendor code separated into dedicated chunks
- Optimized bundle loading with cache groups

## Content Guidelines and Platform Positioning

**Dual-Audience Approach:**
- Platform serves both social users and business professionals
- Content should be professional, inclusive, and welcoming
- Support both social experiences AND business networking opportunities
- Highlight revenue opportunities for event organizers and hosts

**Content Tone Requirements:**
- Professional, inclusive, and welcoming tone across all content
- **Geographic Clarity**: All content emphasizes London & UK location for Portuguese speakers
- No confusion with Portugal-based services - clearly UK-focused platform
- Family/children mentions only on specific relevant pages (Transport Services, "Create Your Own Event/Trip" sections)
- Clear messaging that platform offers both social experiences AND business networking
- Support thriving ecosystem for both attendees AND organizers
- **Mandatory Subscription Messaging**: Transport services require active £25/year membership

**Event Content Strategy:**
- Social events: music events, club nights, cultural activities, guided tours, social experiences
- Business events: AI workshops, website creation masterclasses, digital marketing training, professional networking
- Portuguese community focus while remaining open and inclusive to everyone
- Emphasize monetization opportunities for event creators (ticket sales, sponsorships, partnerships)

**Audience-Specific Development:**
- Social features: event discovery, cultural activities, entertainment, tours
- Business features: professional networking, skill development, entrepreneurship, industry workshops
- Creator tools: event publishing, brand promotion, revenue generation, attendee relationship building
- Bilingual support for all audience segments

## Core Context Providers

**LanguageContext:** Global language state (EN/PT) with localStorage persistence
**CartContext:** Shopping cart and saved items management
**FavoritesContext:** User favorites tracking
**FollowingContext:** User connections and following state
**NetworkingContext:** Event-based connections, network stats, achievements, and notifications

## Subscription Enforcement System

LusoTown implements a mandatory £25/year subscription model for accessing premium services, particularly transport booking and community support features.

### Subscription Features
- **Annual Membership**: £25/year for full platform access
- **Transport Booking Gate**: Transport services require active subscription
- **Community Features**: Housing assistance and neighborhood groups behind subscription wall
- **Professional Services**: Enhanced networking and mentorship features for subscribers

### Subscription Components
- `SubscriptionGate.tsx`: Membership validation and enforcement
- `WhatsAppWidget.tsx`: Subscriber-only Portuguese community support
- Subscription-aware transport booking flow
- Premium feature unlocking system

### Implementation Details
- **localStorage Persistence**: Subscription status stored locally for demo purposes
- **Feature Gating**: Premium features check subscription status before access
- **Graceful Degradation**: Non-subscribers see subscription prompts instead of features
- **London & UK Focus**: All subscription messaging emphasizes UK-based Portuguese community

## LusoTown Transport Services (London & UK)

The platform features a comprehensive luxury transport and SIA-compliant close protection service designed specifically for the Portuguese community in London and the UK. All transport services require an active £25/year LusoTown subscription.

### Transport Services Features

**Premium Transportation Solutions:**
- Professional transport services with Portuguese-speaking drivers
- **SIA-Compliant Close Protection**: Licensed security professionals with SIA certification
- Cultural tour routes highlighting Portuguese heritage in London & UK
- Airport transfers with Portuguese community focus
- Luxury vehicle fleet including Bentley, Mercedes S-Class, Rolls-Royce

**Portuguese Cultural Integration:**
- Bilingual transport service (Portuguese/English)
- Cultural tour routes through Portuguese neighborhoods in London & UK
- Knowledge of Portuguese businesses and community locations across UK
- Portuguese cultural event transportation throughout UK
- Heritage site tours and cultural immersion experiences

**Service Infrastructure:**
- **Easy SIA Compliance Questionnaire**: Multiple-choice questionnaire with progress tracking
- **Subscription-Gated Booking**: Requires active £25/year LusoTown membership
- Risk assessment and compliance features
- Customer testimonials and review system
- Service area coverage across Greater London & UK
- Emergency and last-minute booking capabilities

### Transport Components

**Core Service Components:**
- `OptimizedTransportPage.tsx`: Main transport services landing page with professional 2x2 mobile grid
- `TransportBookingForm.tsx`: Advanced subscription-gated booking system with validation
- `OptimizedTransportServiceCard.tsx`: Service display with uniform heights and London & UK pricing
- `TransportTestimonials.tsx`: Authentic Portuguese community testimonials
- `LondonTourRoutes.tsx`: Portuguese cultural tour routes across London & UK
- `CustomToursSection.tsx`: Bespoke tour planning interface
- `PortugueseCulturalTourRoutes.tsx`: Heritage-focused tour options

**SIA Compliance Components:**
- `SIAComplianceQuestionnaire.tsx`: Professional compliance questionnaire system
- `EasySIAQuestionnaire.tsx`: Simplified multiple-choice compliance form
- `SIABookingConfirmation.tsx`: Booking confirmation with compliance verification
- `SIAAdminDashboard.tsx`: Administrative compliance management
- `RiskAssessmentForm.tsx`: Professional risk assessment interface
- `ComplianceStepIndicator.tsx`: Progress tracking for compliance process

**Service Infrastructure:**
- `transportServices.ts`: Core service definitions and availability
- `transportPricing.ts`: Dynamic pricing engine with London & UK rates
- `transportBooking.ts`: Subscription-enforced booking management
- `transportCache.ts`: Performance optimization and caching

### Service Categories

**Executive Services:**
- Business meeting transfers across London & UK
- Airport VIP services with SIA-compliant security
- Corporate event transportation throughout UK
- Portuguese business networking events

**Cultural Tours:**
- Portuguese heritage sites across London & UK
- Food tour experiences (Portuguese restaurants and markets)
- Cultural event attendance with transportation
- Community celebration transportation

**Personal Services:**
- Special occasion transportation with close protection
- Family gathering coordination (including family-friendly events and occasions)
- Shopping tours to Portuguese stores across UK
- Medical appointment assistance for elderly Portuguese speakers
- Family tour packages for Portuguese cultural sites in London & UK

## LusoTown Community Features (London & UK)

The platform features comprehensive community support services designed specifically for Portuguese speakers living in London and the UK.

### Housing Assistance Program
- **Targeted Support**: Housing assistance for Portuguese community in London & UK
- **Subscription Required**: Access requires active £25/year LusoTown membership
- **Local Focus**: London housing market expertise with Portuguese language support
- **Community Networks**: Connect with other Portuguese families and professionals

### Neighborhood Groups
- **Location-Based Communities**: Portuguese community groups across London boroughs and UK cities
- **Cultural Integration**: Support for Portuguese families integrating into UK neighborhoods
- **Local Connections**: Hyperlocal networking for Portuguese speakers
- **Family-Friendly**: Community groups welcoming families with children

### Mentorship Programs
- **Professional Development**: Career mentorship for Portuguese professionals in UK
- **Cultural Bridge**: Experienced Portuguese community members supporting newcomers
- **Industry-Specific**: Technology, business, healthcare, and creative industry mentorship
- **Bilingual Support**: Mentorship conducted in Portuguese or English

## LusoTown Connections Networking System

The platform features a comprehensive event-based networking system that automatically connects Portuguese community members who attend the same events.

### Networking Features

**Event-Based Connection System:**
- Automatic connections when users attend the same events
- Connection strength scoring based on shared events and interactions
- Privacy-first approach (connections are private to each user)
- Portuguese cultural conversation starters for meaningful interactions

**My Network Page (/my-network):**
- Complete networking dashboard with stats and achievements
- Connection search and sorting (recent, most events, alphabetical)
- Network milestones and achievement tracking
- Bilingual interface with Portuguese cultural context

**Network Integration in Events:**
- Event cards show existing connections attending
- Post-event check-in system for connection tracking
- Network preview components showing shared connections
- Attendance-based connection strength calculation

### Networking Components

**Core Networking Components:**
- `NetworkingContext.tsx`: Global networking state and connection management
- `NetworkHeader.tsx`: Network statistics dashboard
- `ConnectionCard.tsx`: Individual connection profile display
- `ConnectionsGrid.tsx`: Grid layout for connection management
- `NetworkPreview.tsx`: Mini connection preview for events
- `NetworkBadges.tsx`: Achievement and milestone badges
- `ConversationStarters.tsx`: Portuguese cultural conversation prompts

**Event Integration Components:**
- `ImprovedEventCard.tsx`: Enhanced event cards with network integration
- `PostEventCheckin.tsx`: Post-event connection tracking
- `NetworkMilestoneAlert.tsx`: Achievement notifications
- `HowConnectionsWork.tsx`: Educational component for homepage

**Utility Components:**
- `SortingControls.tsx`: Connection sorting interface
- `ConnectionNotificationBanner.tsx`: Network notification system

### Networking Data Structure

**Connection Interface:**
```typescript
interface Connection {
  id: string
  userId: string
  connectedUserId: string
  connectedUser: UserProfile
  connectionSource: 'event_based' | 'mutual_friends' | 'manual'
  sharedEventsCount: number
  firstMetEventId?: string
  firstMetEvent?: EventDetails
  connectionStrength: number
  lastInteractionAt: string
  isActive: boolean
  privacyLevel: 'public' | 'normal' | 'private'
  createdAt: string
}
```

**Network Stats & Achievements:**
- Total connections tracking
- Events attended counter
- Monthly connection growth
- Achievement system (Connector, Regular Attendee, Culture Preserver, etc.)
- Connection strength algorithms

**Portuguese Cultural Context:**
- Portuguese conversation starters organized by category
- Cultural, professional, and personal conversation prompts
- Bilingual conversation suggestions (PT/EN)
- Heritage and tradition-focused networking topics

### Implementation Details

**Data Persistence:**
- localStorage for connection data (`lusotown-connections`)
- Network stats persistence (`lusotown-network-stats`)
- Notification management (`lusotown-network-notifications`)

**Event Integration:**
- Automatic connection creation on shared event attendance
- Connection strength updates based on event frequency
- Network preview in event cards showing mutual connections

**Bilingual Support:**
- Complete Portuguese/English interface
- Cultural conversation starters in both languages
- Portuguese achievement names and descriptions

## Database Schema (Supabase)

**Core Tables:**
- profiles: User profiles with Portuguese community fields
- interests: Available interests/categories
- groups: Community groups
- events: Events with location, pricing, capacity
- group_members: Group membership tracking
- event_attendees: Event attendance tracking
- messages: Direct messaging system

**Networking Tables:**
- connections: User-to-user connections with event-based tracking
- network_stats: User networking statistics and achievements
- connection_notifications: Network milestone and activity notifications
- conversation_starters: Portuguese cultural conversation prompts
- network_achievements: Achievement definitions and user progress

**Transport & SIA Tables:**
- transport_bookings: SIA-compliant transport booking records
- sia_compliance: Compliance questionnaire responses and risk assessments
- transport_pricing: Dynamic pricing for London & UK service areas
- compliance_audit: SIA compliance audit trail and documentation

**Community Support Tables:**
- housing_assistance: Housing support requests for Portuguese community
- neighborhood_groups: Location-based Portuguese community groups
- mentorship_programs: Professional mentorship matching and tracking
- subscription_status: User subscription validation and enforcement

**Storage Buckets:**
- profile-pictures
- group-images
- event-images

## Portuguese Brand Colors

LusoTown uses a comprehensive Portuguese-inspired color system with semantic naming. All colors include full shade ranges (50-900) for consistency.

**Primary Brand Colors:**
- **primary** (Azul Atlântico): Deep ocean blue for navigation, information, and primary actions
- **secondary** (Verde Esperança): Emerald green for success states and positive actions
- **accent** (Dourado Sol): Warm amber for warnings, highlights, and attention-grabbing elements
- **action** (Vermelho Paixão): Bold red for critical CTAs and important actions
- **premium** (Roxo Fado): Rich purple for premium features and special content
- **coral** (Coral Tropical): Vibrant coral for warm accents and secondary CTAs

**Supporting Colors:**
- **neutral**: Updated neutral palette for text and backgrounds
- **text**: Semantic text color definitions (text, textSecondary, textLight)

**Component Usage Guidelines:**
- Never use generic Tailwind colors (blue-500, red-600, etc.)
- Always use semantic brand colors (primary-500, action-600, etc.)
- Use appropriate shade levels (50 for light backgrounds, 900 for dark text)
- Brand compliance is enforced across all 117+ components

**Color System Features:**
- Complete Portuguese cultural naming (Unidos pela Língua - United by Language)
- Accessibility-compliant contrast ratios
- Consistent usage across all UI components
- Mobile app color system alignment

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

## Additional Documentation

**Comprehensive System Documentation:**
- `PORTUGUESE_BRAND_COLORS.md`: Complete Portuguese color system guide
- `NETWORKING_ARCHITECTURE.md`: LusoTown Connections system architecture
- `AUTOMATION_SCRIPTS.md`: Documentation and deployment automation
- `LUSOTOWN_ADMINISTRATIVE_ROLES.md`: Management roles and responsibilities

**Development Resources:**
- `PROJECT_STRUCTURE_CURRENT.txt`: Auto-generated project structure (via scripts)
- `COMPONENTS_LIST.txt`: Auto-generated component inventory (via scripts)
- `PAGES_LIST.txt`: Auto-generated page listing (via scripts)

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
- `src/context/NetworkingContext.tsx`: Event-based networking and achievements

**Auth & Data:**
- `src/lib/auth.ts`: Demo auth system
- `src/lib/supabase.ts`: Database types
- `supabase/migrations/`: Database schema

**Key Components:**
- `src/components/Header.tsx`: Navigation (includes My Network link)
- `src/components/EventFeed.tsx`: Event feed
- `src/components/Cart.tsx`: Shopping cart
- `src/components/WelcomeModal.tsx`: Multi-step welcome with language selection (EN UK/US, PT Portugal/Brazil) and role selection (Organizer vs Member)

**Networking Components:**
- `src/components/NetworkingContext.tsx`: Core networking state management
- `src/components/NetworkHeader.tsx`: Network statistics dashboard
- `src/components/ConnectionCard.tsx`: Individual connection display
- `src/components/ConnectionsGrid.tsx`: Grid layout for connections
- `src/components/NetworkPreview.tsx`: Event-based connection preview
- `src/components/PostEventCheckin.tsx`: Post-event networking flow
- `src/components/HowConnectionsWork.tsx`: Homepage networking explanation
- `src/components/ImprovedEventCard.tsx`: Event cards with network integration

**Transport Service Components:**
- `src/components/OptimizedTransportPage.tsx`: Complete transport services page with London & UK focus
- `src/components/TransportBookingForm.tsx`: Subscription-gated booking system with validation
- `src/components/OptimizedTransportServiceCard.tsx`: Service display with London & UK pricing
- `src/components/TransportTestimonials.tsx`: Authentic Portuguese community testimonials
- `src/components/LondonTourRoutes.tsx`: Cultural tour descriptions across London & UK
- `src/components/CustomToursSection.tsx`: Bespoke tour planning interface
- `src/components/PortugueseCulturalTourRoutes.tsx`: Heritage tours

**SIA Compliance & New Feature Components:**
- `src/components/SIAComplianceQuestionnaire.tsx`: Professional SIA compliance system
- `src/components/EasySIAQuestionnaire.tsx`: Simplified compliance questionnaire
- `src/components/MentorshipHero.tsx`: Portuguese mentorship program hero section
- `src/components/MentorshipProgramsSection.tsx`: Mentorship programs display
- `src/components/SubscriptionGate.tsx`: Membership enforcement component
- `src/components/WhatsAppWidget.tsx`: Portuguese community support widget

**Transport Service Infrastructure:**
- `src/lib/transportServices.ts`: Service definitions and availability
- `src/lib/transportPricing.ts`: Dynamic pricing calculations with London & UK rates
- `src/lib/transportBooking.ts`: Subscription-enforced booking management
- `src/lib/transportCache.ts`: Performance optimization

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

## Recent Updates (August 2025)

### Enhanced User Onboarding & Branding
- **Multi-Step Welcome Modal**: Completely rebuilt welcome experience with 3-step process:
  1. Community welcome and introduction
  2. Language selection (English UK, English US, Portuguese Portugal, Portuguese Brazil)
  3. Role selection (Event Organizer/Promoter vs Free Community Member)
  - Progress indicator and step navigation
  - User preferences stored in localStorage
  - Enhanced community introduction messaging

- **Compact Logo Enhancement**: Added "London" tagline to compact logo variant for consistent branding across all logo sizes

### Platform Optimization
- **Event Cards Layout**: Fixed event card layouts with consistent heights, proper title/subtitle visibility, and aligned CTAs at bottom
- **Professional Grid Systems**: Updated to 2-column responsive layouts using `md:grid-cols-2` for better medium screen experience
- **Mobile-First Design**: Optimized for professional appearance with uniform card heights and responsive gap spacing

### Technical Improvements
- **Stripe API Initialization**: Fixed deployment issues with proper API initialization and fallback demo keys
- **Translation System**: Resolved JSON syntax errors and enhanced bilingual content
- **Git Workflow**: All red files resolved, clean repository state maintained

## Development Workflow

**Before Making Changes:**
1. Run `cd web-app && npm run dev` to start development server
2. Test changes at http://localhost:3000
3. Always test both English and Portuguese language modes using the language toggle
4. Verify responsive design shows professional 2x2 grids on mobile (375px width)
5. Test networking features at /my-network page
6. Test transport services at /transport page (including SIA compliance and subscription enforcement)
7. Test new community features: /housing-assistance, /mentorship, /neighborhood-groups
8. Verify event-based connection functionality
9. Test dual-audience content (social users and business professionals)
10. Verify professional, inclusive, and welcoming tone across all content
11. Ensure event creator monetization features work correctly
12. Test subscription enforcement for premium features
13. Verify London & UK geographic messaging is clear throughout
14. Test Portuguese community imagery displays correctly

**Demo Account for Testing:**
- Email: demo@lusotown.com
- Password: LusoTown2025!
- Use the auto-fill button on login page for quick access

**Common Development Tasks:**
- **Fix TypeScript errors**: `npx tsc --noEmit` (errors are ignored in builds but should be addressed)
- **Debug build issues**: Check webpack configuration in next.config.js
- **Test responsive layouts**: Ensure professional 2x2 grid layouts (`grid-cols-2 md:grid-cols-2`) are used for mobile-first design
- **Test London & UK messaging**: Verify all titles include geographic context
- **Test subscription enforcement**: Confirm transport booking requires active membership
- **Add new Portuguese content**: Always provide both English and Portuguese translations

**Automation Scripts (Project Root):**
- `./scripts/update-claude-md.sh`: Update documentation with current stats
- `./scripts/post-deployment-update.sh`: Complete post-deployment verification and testing

**Quality Checks:**
- Run `npm run lint` before committing
- Run `npx tsc --noEmit` to check TypeScript errors
- Test demo login functionality works correctly
- Verify mobile layout shows professional 2x2 grids in all sections
- Test responsive design on mobile (375px), tablet (768px), and desktop (1024px+)
- Validate all CTAs are 2 words maximum
- Confirm pricing displays include "From" prefix where applicable
- **Test subscription enforcement**: Ensure transport booking requires active membership
- **Verify geographic messaging**: All titles should include London & UK context
- **Test SIA compliance flow**: Ensure questionnaire works properly
- **Validate Portuguese imagery**: Community images display correctly across devices
- Note: Static export currently disabled (check next.config.js for dynamic routes)

**Common Debugging:**
- If build fails, check TypeScript errors with `npx tsc --noEmit`
- Language switching issues: check LanguageContext and localStorage
- Styling issues: verify brand colors are used (not generic Tailwind colors like blue-500)
- Mobile layout issues: ensure all grids use professional 2x2 pattern (`grid-cols-2 md:grid-cols-2 lg:grid-cols-3/4`)
- Subscription issues: check membership validation for transport services
- Geographic messaging: verify London & UK context is clear throughout
- Card alignment issues: verify fixed heights with responsive breakpoints
- State persistence: check browser localStorage for cart/favorites/networking data
- Networking issues: check localStorage keys (`lusotown-connections`, `lusotown-network-stats`)
- Context provider order: ensure NetworkingProvider is correctly wrapped in layout.tsx
- Image loading issues: check Cloudinary configuration and fallback images
- Route navigation: verify file-based routing structure in `/app` directory

## Deployment

**Vercel:** `npm run deploy`
**Static Export:** `npm run export` (currently disabled - see Static Export Configuration)
**Local:** `npm run dev` (http://localhost:3000)