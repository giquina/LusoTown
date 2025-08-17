# CLAUDE.md

LusoTown: Bilingual Portuguese community platform (London & UK) serving social users and business professionals with event discovery, premium matching, transport services, and university partnerships.

**Tech Stack:** Next.js 14 (TypeScript), Tailwind CSS, Supabase, Vercel
**Status:** Production-ready - 73+ pages, 169+ components, complete bilingual system

## Essential Commands

```bash
cd web-app && npm run dev    # Start dev server (localhost:3000)
npm run build               # Production build
npm run lint               # ESLint check
npx tsc --noEmit          # TypeScript check
```

**Demo Login:** demo@lusotown.com / LusoTown2025!
**TypeScript:** Errors ignored in builds (`ignoreBuildErrors: true`)

## Core Architecture

**Structure:** Next.js 14 App Router, React Context state, Supabase backend
**Styling:** Tailwind CSS with Portuguese brand colors, mobile-first `grid-cols-2` layouts
**Key Pages:** /my-network, /transport, /matches, /live, /students, /premium-membership
**Contexts:** Language, Cart, Favorites, Networking, Subscription, PlatformIntegration

## Critical Patterns

**Bilingual:** All text supports EN/PT via `useLanguage` hook and `src/i18n/` files
**Mobile:** Professional 2x2 grids (`grid-cols-2`), fixed card heights, "London & UK" context
**State:** React Context + localStorage, no Redux
**Colors:** Portuguese brand colors only (primary, secondary, accent, action, premium, coral)
**CTAs:** Max 2 words, pricing with "From £XX" format

## Content Guidelines

**Tone:** Professional, inclusive, welcoming. London & UK focus for Portuguese community.
**Audiences:** Social users + business professionals. Event creators can monetize.
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

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## LusoTown Premium Matches System (London & UK)

The platform features an advanced Portuguese community matching system that connects members based on compatibility scores, shared interests, and cultural backgrounds within London and the UK.

### Premium Matches Features

**Cultural Compatibility Matching:**
- Algorithm considers Portuguese heritage (Portugal, Brazil, other Lusophone countries)
- Language preference matching (Portuguese, English, or bilingual)
- Cultural interest alignment (fado, traditional cuisine, Portuguese history)
- Family status compatibility (single, family, open to any)
- Professional background matching for networking opportunities

**Smart Filtering System:**
- Advanced age range filtering
- Professional background categories (Finance, Tech, Creative Arts, Real Estate, Healthcare)
- Interest-based matching (business networking, cultural exchange, friendship)
- University and education background for students
- Membership tier consideration for premium features
- Location-based matching within London boroughs and UK cities

**Subscription-Based Access:**
- **Free Tier**: 5 daily matches with basic filtering
- **Premium Tiers**: Unlimited daily matches with advanced filtering
- **Student Discount**: 50% off premium features for verified university students
- Priority profile visibility for premium members
- VIP event access for matched connections

### Matches Components

**Core Matching Components:**
- `MatchCard.tsx`: Individual profile display with compatibility scoring
- `MatchFilters.tsx`: Advanced filtering interface with Portuguese cultural options
- `MatchingAlgorithm.tsx`: Compatibility calculation engine
- `PremiumMatchesGate.tsx`: Subscription enforcement for premium features
- `SafetyCenter.tsx`: Community safety guidelines and reporting

**Conversation System:**
- `MatchConversations.tsx`: Direct messaging for matched connections
- Portuguese cultural conversation starters
- Bilingual messaging support
- Safety reporting and blocking features
- Connection strength scoring based on interactions

**Premium Features:**
- Detailed compatibility insights (cultural, professional, location scores)
- Advanced filtering by Portuguese cultural background
- Priority matching with other premium members
- VIP networking event invitations for matched pairs
- Professional mentorship matching for career development

### Matches Data Structure

**Match Interface:**
```typescript
interface PremiumMatch {
  id: string
  userId: string
  matchedUserId: string
  matchedUser: UserProfile
  compatibilityScore: number // 75-95%
  sharedInterests: string[]
  culturalCompatibility: number // 80-95%
  professionalCompatibility: number // 70-95%
  locationCompatibility: number // 60-90%
  matchReason: string
  isLiked: boolean
  isMatched: boolean
  expiresAt?: string // 7 days
}
```

**User Profile Matching:**
- Portuguese heritage verification
- Professional background categories
- Cultural interests and activity preferences
- Language preference settings
- Relationship goals (friendship, professional, cultural exchange)
- Student verification for university partnerships

## LusoTown Live Streaming Platform (LusoTown TV)

The platform features a comprehensive streaming service showcasing Portuguese cultural content, business workshops, and community events live from London.

### Streaming Features

**Content Categories:**
- **Portuguese Cultural Content**: Traditional music, fado nights, cultural celebrations
- **Business Workshops**: Professional development, AI workshops, digital marketing for Portuguese community
- **Community Events**: Community meetings, announcements, interactive sessions
- **Student Sessions**: Study groups, career advice, academic support for Portuguese students
- **VIP Business Roundtables**: Premium exclusive content with industry leaders

**Live Streaming Technology:**
- YouTube integration for video hosting and streaming
- Real-time viewer count tracking
- Live chat widget for community interaction
- Stream replay library for premium content
- Schedule management for upcoming broadcasts

**Subscription Integration:**
- Premium content requires active subscription or trial
- Student-exclusive streams with verified university access
- Business tier access to professional roundtables
- Free community content available to all members

### Streaming Components

**Core Streaming Components:**
- `StreamPlayer.tsx`: YouTube video integration with access control
- `StreamSchedule.tsx`: Upcoming events and programming calendar
- `StreamReplayLibrary.tsx`: Archive of past streams for premium members
- `StreamViewerStats.tsx`: Real-time analytics and viewer engagement
- `StreamCategories.tsx`: Content categorization and filtering
- `LiveChatWidget.tsx`: Real-time community interaction during streams

**Content Management:**
- Automatic scheduling integration with event system
- Portuguese cultural programming priority
- Business workshop series for professional development
- Student-focused educational content
- Community announcements and updates

### Streaming Analytics

**Viewer Engagement:**
- Real-time viewer counts with fluctuation tracking
- Peak viewership analytics
- Total view counts across content categories
- Engagement metrics for chat participation
- Portuguese community participation rates

**Content Performance:**
- Category-based viewing preferences
- Cultural content vs. business workshop engagement
- Student session participation rates
- Premium content conversion metrics
- Community retention through streaming content

## LusoTown Student Partnership Program (UK Universities)

Comprehensive support system for Portuguese students across 8 partner universities in the UK, offering exclusive discounts, cultural programming, and academic support.

### University Partnerships

**Strategic Partners (Premium Support):**
- University College London (UCL) - 420 Portuguese students
- King's College London - 380 Portuguese students
- University of Oxford - 95 Portuguese students
- University of Cambridge - 85 Portuguese students

**Official Partners (Full Support):**
- University of Manchester - 290 Portuguese students
- University of Edinburgh - 180 Portuguese students

**Community Partners (Basic Support):**
- London School of Economics - 340 Portuguese students
- Imperial College London - 280 Portuguese students

**Total Portuguese Student Community:** 2,150+ students across UK universities

### Student Benefits System

**Financial Benefits:**
- 50% discount on LusoTown annual membership (£12.50 instead of £25)
- Student-exclusive pricing for events and services
- Scholarship opportunities for Portuguese studies programs
- Emergency financial support for Portuguese students

**Academic Support:**
- Free Portuguese language exchange programs
- Academic writing support for Portuguese-related studies
- Research guidance and dissertation help
- Portuguese cultural studies resources and library access
- Study abroad support for Portugal and Brazil programs

**Professional Development:**
- Portuguese professional mentorship program
- Career services with Portuguese business connections
- Internship opportunities with Portuguese companies in London and UK
- Networking events connecting students with Portuguese professionals
- Business pitch competitions with Portuguese investors

**Cultural Integration:**
- Student-exclusive cultural events (movie nights, fado workshops, traditional food experiences)
- Portuguese cultural societies coordination
- Heritage preservation projects
- Language immersion activities
- Festival celebration organization

### Student Verification System

**Verification Process:**
- University email verification (.ac.uk domains)
- Student ID documentation upload
- University enrollment confirmation
- Academic year and program verification
- Secure document processing (24-48 hour approval)

**Supported Documentation:**
- Valid university student ID cards
- Official enrollment confirmation letters
- Tuition payment receipts
- University statements on official letterhead
- Academic transcripts (for program verification)

### Student Components

**Core Student Components:**
- `StudentVerificationSystem.tsx`: Complete verification workflow
- Student-exclusive event booking system
- University partnership portal
- Portuguese academic resource library
- Career mentorship matching platform

**Integration Features:**
- Automatic university partner recognition
- Student discount application across all services
- Academic calendar integration for events
- Portuguese studies program support
- Alumni networking connection system

## Enhanced Subscription Management System

Comprehensive subscription management with multiple tiers, student discounts, corporate accounts, and Stripe integration for seamless billing.

### Subscription Tiers

**Student Tier (50% Discount):**
- £12.50/year for verified university students
- All community features included
- Priority academic support
- Student-exclusive events and programming
- Portuguese language exchange programs

**Professional Tier (Standard):**
- £25/year for individual professionals
- Full platform access including transport services
- Business networking events
- Professional mentorship programs
- Cultural event priority booking

**Business Tier (Corporate):**
- £75/year for corporate accounts
- Multiple user management
- Team event coordination
- Corporate Portuguese cultural programs
- Business partnership opportunities

**VIP Tier (Premium):**
- £150/year for exclusive access
- VIP business roundtables and exclusive content
- Priority transport and concierge services
- Personal relationship manager
- Exclusive networking events with Portuguese business leaders

### Subscription Features

**Stripe Integration:**
- Secure payment processing with fallback demo keys
- Automatic renewal management
- Failed payment retry logic
- Proration for tier upgrades/downgrades
- Multiple currency support (GBP, EUR, USD)

**Usage Tracking & Limits:**
- Daily matches tracking (free: 5/day, premium: unlimited)
- Monthly messaging limits
- Premium event access quotas
- Livestream viewing hours tracking
- Service booking frequency limits

**Student Verification Integration:**
- University email domain verification
- Automatic student discount application
- Academic calendar integration
- Partnership university benefits
- Graduation transition support

### Subscription Components

**Core Subscription Components:**
- `SubscriptionContext.tsx`: Complete subscription state management
- `MembershipTiers.tsx`: Tier comparison and selection interface
- `MembershipPortal.tsx`: User subscription management dashboard
- `PaymentProcessor.tsx`: Stripe checkout integration
- Student verification and discount application system

**Revenue Optimization:**
- Automatic upselling based on usage patterns
- Service completion to membership conversion
- Student-to-professional transition support
- Corporate account expansion tracking
- Lifetime value optimization strategies

## Platform Integration & User Journey System

Advanced cross-platform integration system that tracks user journeys, generates intelligent recommendations, and optimizes revenue through seamless service-to-community bridging.

### Integration Features

**User Journey Tracking:**
- Service-to-community journey mapping
- Community-to-service conversion tracking
- Cross-platform engagement optimization
- Revenue opportunity identification
- Ecosystem value calculation

**Smart Recommendations:**
- AI-driven service suggestions based on community activity
- Cultural event recommendations after transport bookings
- Professional networking suggestions for high-engagement users
- Membership conversion opportunities for frequent users
- Portuguese business networking based on professional background

**Cross-Platform Notifications:**
- Service completion community invitations
- Revenue opportunity alerts
- Engagement milestone celebrations
- Smart recommendation delivery
- Community event reminders

### Integration Components

**Core Integration Components:**
- `PlatformIntegrationContext.tsx`: Cross-platform state management and analytics
- `EcosystemIntegration.tsx`: Service-to-community bridging interface
- `ServiceCommunityBridge.tsx`: Automatic enrollment and suggestions
- `CrossPlatformEngagementTriggers.tsx`: Smart notification system
- `ConversionOptimizationEngine.tsx`: Revenue optimization tracking

**User Journey Analytics:**
- Engagement score calculation (community participation + service usage)
- Portuguese cultural interest scoring
- Professional networking opportunity identification
- Revenue contribution tracking
- Monthly growth rate analysis
- Cross-platform conversion optimization

### Revenue Optimization

**Service Integration:**
- Transport completion → Community event suggestions
- High networking activity → Premium transport recommendations
- Frequent engagement → Membership conversion campaigns
- Student graduation → Professional tier transition
- Community leadership → Business tier upgrade suggestions

**Analytics & Insights:**
- Total ecosystem value calculation
- Monthly growth rate tracking
- Cross-platform conversion metrics
- Portuguese community engagement analysis
- Revenue projection based on user behavior

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

**Premium Matches Tables:**
- matches: Portuguese community compatibility matching records
- match_preferences: User matching criteria and cultural preferences
- match_conversations: Direct messaging between matched users
- match_reports: Safety reporting and blocking functionality
- compatibility_scores: Algorithm scoring for cultural, professional, location factors

**Subscription & Billing Tables:**
- subscriptions: User subscription records with Stripe integration
- subscription_trials: Trial period tracking and management
- subscription_usage: Feature usage limits and tracking
- membership_usage: Benefits utilization and discount application
- student_verifications: University email and document verification
- corporate_accounts: Business tier multi-user management

**Streaming Platform Tables:**
- streams: Live streaming events and programming schedule
- stream_viewers: Real-time viewer tracking and analytics
- stream_categories: Content categorization (cultural, business, student, VIP)
- stream_replays: Archive of past streams for premium access
- stream_chat: Live chat messages and community interaction

**University Partnership Tables:**
- university_partnerships: Partner institutions and partnership levels
- student_benefits: Available benefits by university and tier
- student_events: University-specific events and programming
- academic_support: Portuguese studies resources and mentorship
- student_documents: Verification documents and approval status

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

**Platform Integration Tables:**
- user_journeys: Cross-platform user journey tracking
- service_recommendations: AI-generated service suggestions
- platform_notifications: Cross-platform notification management
- ecosystem_analytics: User engagement and revenue tracking
- conversion_events: Service-to-community bridge tracking

**Storage Buckets:**
- profile-pictures
- group-images
- event-images
- student-documents
- stream-thumbnails
- verification-documents

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
- `src/context/SubscriptionContext.tsx`: Subscription management and billing
- `src/context/PlatformIntegrationContext.tsx`: Cross-platform analytics and recommendations

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

**Premium Matches Components:**
- `src/components/MatchCard.tsx`: Individual profile display with compatibility scoring
- `src/components/MatchFilters.tsx`: Advanced filtering interface with Portuguese cultural options
- `src/components/MatchingAlgorithm.tsx`: Compatibility calculation engine
- `src/components/PremiumMatchesGate.tsx`: Subscription enforcement for premium features
- `src/components/MatchConversations.tsx`: Direct messaging for matched connections
- `src/components/SafetyCenter.tsx`: Community safety guidelines and reporting

**Streaming Platform Components:**
- `src/components/StreamPlayer.tsx`: YouTube video integration with access control
- `src/components/StreamSchedule.tsx`: Upcoming events and programming calendar
- `src/components/StreamReplayLibrary.tsx`: Archive of past streams for premium members
- `src/components/StreamViewerStats.tsx`: Real-time analytics and viewer engagement
- `src/components/StreamCategories.tsx`: Content categorization and filtering
- `src/components/LiveChatWidget.tsx`: Real-time community interaction during streams

**Student Partnership Components:**
- `src/components/StudentVerificationSystem.tsx`: Complete verification workflow
- Student-exclusive event booking system
- University partnership portal
- Portuguese academic resource library
- Career mentorship matching platform

**Enhanced Subscription Components:**
- `src/components/SubscriptionContext.tsx`: Complete subscription state management
- `src/components/MembershipTiers.tsx`: Tier comparison and selection interface
- `src/components/MembershipPortal.tsx`: User subscription management dashboard
- `src/components/PaymentProcessor.tsx`: Stripe checkout integration
- `src/components/SubscriptionGate.tsx`: Membership enforcement component

**Platform Integration Components:**
- `src/components/PlatformIntegrationContext.tsx`: Cross-platform state management and analytics
- `src/components/EcosystemIntegration.tsx`: Service-to-community bridging interface
- `src/components/ServiceCommunityBridge.tsx`: Automatic enrollment and suggestions
- `src/components/CrossPlatformEngagementTriggers.tsx`: Smart notification system
- `src/components/ConversionOptimizationEngine.tsx`: Revenue optimization tracking

**SIA Compliance & Transport Components:**
- `src/components/SIAComplianceQuestionnaire.tsx`: Professional SIA compliance system
- `src/components/EasySIAQuestionnaire.tsx`: Simplified compliance questionnaire
- `src/components/MentorshipHero.tsx`: Portuguese mentorship program hero section
- `src/components/MentorshipProgramsSection.tsx`: Mentorship programs display
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

## Enhanced Features & Platform Integration (December 2025)

### Premium Matches System
- **Portuguese Cultural Matching**: Advanced compatibility algorithm considering Portuguese heritage, language preferences, and cultural interests
- **Professional Networking Integration**: Career-focused matching for Portuguese professionals in London & UK
- **Student Partnership Support**: University-verified student matching with 50% premium feature discounts
- **Safety-First Design**: Comprehensive reporting system and community guidelines enforcement
- **Subscription-Based Access**: Tiered access with free daily limits and premium unlimited matching

### Live Streaming Platform (LusoTown TV)
- **Portuguese Cultural Programming**: Traditional music, fado nights, cultural celebrations from London
- **Business Workshop Series**: Professional development content for Portuguese entrepreneurs and professionals
- **Student Educational Content**: Academic support and career guidance streams for Portuguese university students
- **VIP Business Roundtables**: Exclusive premium content with Portuguese industry leaders
- **Interactive Community Features**: Live chat, viewer analytics, and subscription-based content access

### Enhanced Subscription Management
- **Multi-Tier System**: Student (£12.50), Professional (£25), Business (£75), VIP (£150) annual tiers
- **Stripe Integration**: Secure payment processing with automatic renewal and failed payment handling
- **Usage Tracking**: Feature limits monitoring for matches, messaging, premium events, and livestream access
- **Student Verification**: University email and document verification for 50% discount eligibility
- **Corporate Accounts**: Multi-user management for Portuguese businesses and organizations

### University Partnership Program
- **8 Partner Universities**: Strategic partnerships with UCL, King's College, Oxford, Cambridge, Manchester, Edinburgh, LSE, Imperial
- **2,150+ Portuguese Students**: Comprehensive support network across UK universities
- **Academic Integration**: Portuguese studies program support, research resources, study abroad assistance
- **Professional Development**: Career mentorship, internship opportunities, business networking events
- **Cultural Programming**: Student-exclusive events, language exchange, heritage preservation projects

### Platform Integration & Analytics
- **Cross-Platform Journey Tracking**: Service-to-community and community-to-service conversion optimization
- **Smart Recommendations**: AI-driven suggestions based on user behavior and Portuguese cultural interests
- **Revenue Optimization**: Automatic upselling, conversion tracking, and lifetime value analysis
- **Ecosystem Analytics**: Engagement scoring, growth rate tracking, Portuguese community participation metrics
- **Intelligent Notifications**: Cross-platform alerts for service completion, community invitations, and revenue opportunities

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
7. **Test Premium Matches System at /matches page**
   - Verify compatibility scoring algorithm
   - Test Portuguese cultural filtering options
   - Check subscription enforcement for premium features
   - Validate safety reporting and blocking functionality
8. **Test Streaming Platform at /live page**
   - Verify YouTube video integration
   - Test real-time viewer count tracking
   - Check subscription-based content access
   - Validate live chat functionality
9. **Test Student Partnership System at /students page**
   - Verify university email verification system
   - Test 50% student discount application
   - Check partnership university benefits
   - Validate student event booking system
10. **Test Enhanced Subscription System at /premium-membership page**
    - Verify Stripe integration and payment processing
    - Test tier comparison and upgrade flows
    - Check usage limits and tracking
    - Validate corporate account features
11. **Test Platform Integration Features**
    - Cross-platform user journey tracking
    - Service-to-community recommendation engine
    - Revenue optimization analytics
    - Smart notification system
12. Test community features: /housing-assistance, /mentorship, /neighborhood-groups
13. Verify event-based connection functionality
14. Test dual-audience content (social users and business professionals)
15. Verify professional, inclusive, and welcoming tone across all content
16. Ensure event creator monetization features work correctly
17. Test subscription enforcement for premium features
18. Verify London & UK geographic messaging is clear throughout
19. Test Portuguese community imagery displays correctly

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