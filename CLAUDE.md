# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LusoTown London is the ultimate social calendar and booking hub for Portuguese speakers in London and across the UK. The platform focuses on helping Portuguese speakers live life together through shared experiences rather than just "finding community." 

**Core Mission:** Connect Portuguese-speaking adults (18+) instantly with people to do activities with - from museum visits and football games to concerts, club nights, and weekend trips across London.

**Key Positioning:** "Your Portuguese Adult Social Calendar in London" - emphasizing booking experiences and professional networking for adults only (18+), removing family/children focus for streamlined adult community platform.

### Core Activity Categories

LusoTown focuses on specific London-based activities that Portuguese speakers can book and enjoy together:

**Cultural:** Museum visits (British Museum, Tate Modern), art gallery tours, historical walks, theatre shows, film screenings, Portuguese food & wine tastings
**Social:** Coffee meetups, Portuguese restaurant dinners, Hyde Park picnics, brunch clubs, Thames sunset meetups, pub nights
**Sports & Fitness:** Football games, gym buddies, yoga classes, tennis matches, cycling groups, park runs
**Nightlife:** Clubbing nights, live music gigs, karaoke bars, Portuguese DJ events, salsa/bachata nights  
**Day Trips:** Seaside trips (Brighton), countryside hikes, Portuguese heritage tours, weekend getaways
**Special Interests:** Book clubs, photography walks, language exchange, cooking classes, wine tastings
**Professional:** Business networking, career meetups, entrepreneur gatherings, professional development workshops
**Adult Entertainment:** Wine bars, cocktail nights, adult learning workshops, mature social events

### Target Messaging Strategy

**Replace "finding community" language with:**
- "Live life together"
- "Social calendar" 
- "Book experiences"
- "Connect and do things"
- "Your people to explore London with"

**Hero Section Template:**
"Unidos pela Língua • United by Language  
Your Portuguese Adult Social Calendar in London.  
From museums and football to concerts, club nights, and weekend trips — connect, book, and live London with Portuguese adults who love the city like you do. (18+ Community)"

## Development Commands

### Web App (Next.js)
```bash
cd web-app
npm install         # Install dependencies
npm run dev         # Start development server (http://localhost:3000)
npm run build       # Build for production
npm run start       # Start production server
npm run lint        # Run ESLint
npm run export      # Build and export static site (next build && next export)
npm run deploy      # Deploy to Vercel (npm run build && vercel --prod)
```

### Testing
```bash
# Testing new Event Feed features
cd web-app
npm run dev  # Test Event Feed interactivity
# Navigate to /feed to test event feed functionality
# Navigate to /saved to test cart and saved items
# Test favorites and cart functionality across different pages
```

### Demo Login System
```bash
# Testing login and dashboard features
cd web-app
npm run dev  # Start development server
# Navigate to http://localhost:3000/login
# Use demo credentials or click "Auto-Fill Credentials" button
```

**Demo Credentials:**
- **Email:** demo@lusotown.com
- **Password:** LusoTown2025!
- **User Profile:** Maria Silva (Premium Member from Camden, London)
- **Session Duration:** 24 hours with automatic persistence

No automated testing framework is currently configured. Manual testing should focus on:
- Event Feed interactions (like, share, save)
- Cart functionality (add/remove items, quantity management)
- Saved items management and filtering
- Bilingual functionality across all new features
- Responsive design on mobile devices
- **Login & Authentication:** Demo login flow and dashboard access
- **User Session Management:** Demo session persistence and logout

### Type Checking (Web App)
```bash
cd web-app
npx tsc --noEmit  # Type check without emitting files
npm run build     # Also performs type checking during build
```

### Mobile App (Future Development)
```bash
cd mobile-app
npm install         # Install dependencies
npm start           # Start Expo development server
npm run android     # Run on Android
npm run ios         # Run on iOS
npm run web         # Run on web
```

## Architecture Overview

### Project Structure
```
LusoTown/
├── web-app/            # Next.js Portuguese community platform
│   ├── src/
│   │   ├── app/        # Next.js 14 app router structure (38+ pages)
│   │   ├── components/ # React components (Hero, Features, etc.)
│   │   ├── context/    # React Context providers (Language, Favorites, Following)
│   │   └── lib/        # Utility functions and Supabase integration
│   ├── public/         # Static assets (images, icons, SEO files)
│   └── package.json    # Web dependencies
├── mobile-app/         # React Native + Expo app (future development)
│   ├── src/
│   │   ├── screens/    # App screens (prepared for Portuguese community)
│   │   ├── constants/  # Design system and shared constants
│   │   └── components/ # Reusable UI components (future)
│   ├── App.js         # Main app entry point
│   └── package.json   # Mobile dependencies
├── supabase/          # Database migrations and configuration
│   ├── migrations/    # SQL migration files
│   ├── config.toml    # Supabase configuration
│   └── seed.sql       # Database seed data
└── qwen-code/         # Separate AI coding tool (not part of main app)
```

### Web App Architecture

**Current State (Production Ready ✅):**
- **Portuguese Community Focus:** Platform for Portuguese speakers in London
- **Bilingual Support:** Complete English/Portuguese interface with context switching
- **Real-life Connection:** Emphasis on offline meetups and authentic connections
- **Cultural Connection:** Events, stories, business directory, heritage preservation
- **Design System:** Portuguese-inspired colors and branding
- **Community Features:** Groups, events, business directory, cultural content
- **Event Feed System:** Real-time event feed with interactive features
- **Save/Cart Functionality:** Complete item saving and cart management
- **Multi-column Layout:** Enhanced responsive design with modern layout
- **Static Generation:** Optimized for fast loading and SEO

**Key Architectural Patterns:**
- **Next.js 14 App Router:** File-based routing with server components
- **React Context:** Global state management for language, favorites, and following
- **TypeScript:** Full type safety across components and data models
- **Tailwind CSS:** Utility-first styling with custom design tokens
- **Static Export:** Configured for deployment without server-side features

**Core Components:**
- `Hero.tsx`: Main landing page hero with Portuguese community messaging
- `Header.tsx`: Navigation with LusoTown London branding and language toggle
- `Footer.tsx`: Footer with "Unidos pela Língua" and Portuguese community focus
- `Features.tsx`: Platform features for Portuguese community
- `WelcomeModal.tsx`: Age-appropriate bilingual welcome system
- `LanguageToggle.tsx`: Language switching functionality
- `EventFeed.tsx`: Real-time event feed with interactive features
- `Cart.tsx`: Shopping cart for events and services
- `FavoriteButton.tsx`: Save functionality for items
- `EventCard.tsx`: Enhanced event display with booking features
- `FeedPost.tsx`: Interactive feed posts with engagement features
- `PersonalizedFeed.tsx`: Customized content feed for users
- `EventFeedCard.tsx`: Enhanced event display with real-time interactions
- `FeedFilters.tsx`: Advanced filtering for Portuguese community
- `LiveUpdateIndicator.tsx`: Real-time update notifications
- `PhotoUpload.tsx`: Drag/drop photo sharing functionality
- `SaveFavoriteCartButton.tsx`: Universal save/cart button
- `SavedItemsButton.tsx`: Header integration with count badge

**Context Providers:**
- `LanguageContext.tsx`: Global language state (English/Portuguese)
- `FavoritesContext.tsx`: User favorites management
- `FollowingContext.tsx`: User following/connection state
- `CartContext.tsx`: Shopping cart and saved items management

**Target Audience:**
- Portuguese speakers who have moved to London
- British-born Lusophone descendants connecting with heritage
- Families with roots in Portuguese-speaking countries
- Anyone valuing Portuguese language and culture

### Mobile App Architecture

**Current State (Prepared for Portuguese Community):**
- **Design System:** Updated with Portuguese-inspired colors matching web app
- **Brand Identity:** LusoTown London branding applied
- **Navigation:** React Navigation 7 with stack and tab navigation
- **Forms:** Formik + Yup for form handling and validation
- **Future Development:** Ready for Portuguese community features

## Development Workflow

### Before Starting Work
```bash
git pull origin main  # Always pull latest changes
cd web-app           # Focus on web app development
npm install          # Ensure dependencies are current
npm run dev          # Start development server
```

### Testing Authentication & Dashboard
```bash
cd web-app
npm run dev          # Start development server
# Navigate to http://localhost:3000/login
# Use demo credentials: demo@lusotown.com / LusoTown2025!
# Click "Auto-Fill Credentials" for instant access
# Test dashboard features at http://localhost:3000/dashboard
```

### Development Guidelines

1. **Web App Development:**
   - Use TypeScript for all new components with proper interfaces
   - Follow Next.js 14 app router conventions
   - Maintain responsive design with Tailwind CSS
   - Test static export compatibility (avoid server-side features)
   - Focus on Portuguese community features
   - Use React Context for global state management

2. **Portuguese Community Focus:**
   - Emphasize cultural connection and heritage preservation
   - Consider multilingual content (English/Portuguese)
   - Design for London-based Portuguese diaspora
   - Include features for events, businesses, culture sharing
   - Use bilingual messaging throughout

3. **Code Quality:**
   - Run `npm run lint` before committing
   - Use `npx tsc --noEmit` for type checking
   - Follow existing component patterns and naming conventions
   - Maintain consistent styling with Portuguese-inspired color palette

4. **Commit Frequently:**
   ```bash
   git add .
   git commit -m "Descriptive commit message"
   git push origin main
   ```

### Current Development Priority

**Phase: Messaging & Positioning Implementation (COMPLETED ✅):**
The platform has successfully transitioned from "finding community" to "social calendar and booking hub" positioning. All strategic messaging updates detailed in `tudo.md` have been implemented.

**Current Focus Areas:**
1. **Production Optimization:** Platform ready for immediate launch with complete social calendar positioning
2. **Activity-Specific Features:** London-based Portuguese activities fully integrated (cultural, social, sports, nightlife, day trips, professional)
3. **Social Calendar Functionality:** Booking system and calendar features operational
4. **London Integration:** Location-specific features for Portuguese community established
5. **Authentic Positioning:** "Your Portuguese Social Calendar in London" messaging consistent throughout

**Strategic Messaging Completed:**
- ✅ Hero sections updated with "Unidos pela Língua • United by Language" and social calendar messaging
- ✅ Activity categories integrated (cultural, social, sports, nightlife, day trips, special interests, professional)  
- ✅ London-specific venues and locations emphasized throughout
- ✅ Booking functionality and social connections highlighted
- ✅ Portuguese community authenticity maintained while emphasizing active lifestyle

## Technology Stack

### Web App (Production)
- **Next.js 14** with TypeScript and App Router
- **Tailwind CSS** with Portuguese-inspired design system
- **Framer Motion** for animations
- **Headless UI** for accessible components
- **Lucide React** and **Heroicons** for icons
- **React Hot Toast** for notifications

### Mobile App (Configured)
- **React Native 0.76.1** with **Expo 52.0.0**
- **React Navigation 7** for navigation
- **Formik + Yup** for form handling and validation
- **React Native Paper** for UI components
- **Expo Camera** and **Image Picker** for media features

### Backend (Integrated)
- **Supabase** (PostgreSQL, Authentication, Storage, Edge Functions)
- **Database Schema:** Complete with profiles, interests, groups, events
- **Row Level Security (RLS):** Implemented for data privacy
- **Storage Buckets:** Configured for profile pictures and media

### Development Tools
- **ESLint** with Next.js configuration
- **TypeScript** for type safety
- **PostCSS** and **Autoprefixer** for CSS processing
- **Vercel** for deployment

## Brand Identity - LusoTown London

### Design System
The web app uses a Portuguese-inspired design system with semantic color naming:

**Brand Colors (Tailwind Classes):**
- **Primary (Azul Atlântico):** `bg-primary-500` (#1e40af) - Deep ocean blue
- **Secondary (Verde Esperança):** `bg-secondary-500` (#059669) - Vibrant emerald
- **Accent (Dourado Sol):** `bg-accent-500` (#f59e0b) - Warm amber
- **Action (Vermelho Paixão):** `bg-action-500` (#dc2626) - Bold red
- **Premium (Roxo Fado):** `bg-premium-500` (#7c3aed) - Rich purple
- **Coral (Coral Tropical):** `bg-coral-500` (#f97316) - Vibrant coral

**Color Usage Guidelines (Updated 2025-08-14):**
- **NEVER use generic `blue` colors** - Always use brand colors from the palette above
- **Information/Navigation:** Use `primary` colors (Azul Atlântico)
- **Success/Positive actions:** Use `secondary` colors (Verde Esperança)
- **Warning/Attention:** Use `accent` colors (Dourado Sol)
- **Error/Critical:** Use `action` colors (Vermelho Paixão)
- **Premium features:** Use `premium` colors (Roxo Fado)
- **Warm accents:** Use `coral` colors (Coral Tropical)
- **Global CSS Override:** `globals.css` contains overrides for all `bg-blue-*`, `text-blue-*`, and `border-blue-*` classes

**Recent Brand Consistency Improvements (August 14, 2025):**
- ✅ **CTA Text Update:** Changed from "Book Experiences" to "Join Now" throughout platform
- ✅ **Bilingual CTA:** Both English and Portuguese CTAs standardized to community joining focus
- ✅ **Generic Blue Elimination:** All components updated to use Portuguese brand colors
- ✅ **CategoryBadge Enhancement:** Improved visual consistency with brand palette
- ✅ **GroupsShowcase Optimization:** Enhanced design with proper Portuguese branding
- ✅ **Component Standardization:** All UI elements now follow Portuguese design system
- ✅ **100% Brand Compliance:** Platform-wide brand consistency achieved

**Typography:**
- **Font Family:** Inter (body), Poppins (display)
- **Display Sizes:** display-large, display, display-small
- **Responsive:** xs, sm, md, lg, xl, 2xl breakpoints

**Animations:**
- **Keyframes:** fadeInUp, fadeIn, scaleIn, slideInRight
- **Classes:** animate-fade-in-up, animate-fade-in, animate-scale-in

### Target Communities (Adults 18+)
- **Portugal** 🇵🇹 **Brazil** 🇧🇷 **Angola** 🇦🇴 **Mozambique** 🇲🇿
- **Cape Verde** 🇨🇻 **Guinea-Bissau** 🇬🇼 **São Tomé and Príncipe** 🇸🇹
- **East Timor** 🇹🇱 **Macau** 🇲🇴 **Equatorial Guinea** 🇬🇶
- Adult diaspora communities in London (professionals, students, young adults, mature adults)

### Key User Journey Goals

**Primary Goal:** Every adult visitor (18+) should immediately understand that LusoTown is where Portuguese speakers in London come to fill their social calendar with amazing adult activities alongside people who speak their language.

**Success Indicator:** When someone visits the site, they should be able to envision themselves booking their next museum visit, football game, dinner, nightlife experience, or weekend trip with Portuguese adults within the next 7 days.

**Target User Mindset:** *"If I join, my adult social life in London will be full, fun, and connected — and all in Portuguese with people my age."*

### Core User Benefits to Highlight

Every page must emphasize these reasons adults (18+) join:
- **Make adult friends** who share your language and culture
- **Discover London** in a more personal, welcoming way through adult activities
- **Stay connected** to Portuguese traditions while living in the UK as an adult
- **Try new adult experiences** you wouldn't do alone (nightlife, networking, cultural events)
- **Get active** socially, culturally, and physically with other adults
- **Network** with Portuguese professionals and creatives in adult settings
- **Feel at home** in a big city by finding "your adult people"

## Supabase Integration (Production Ready)

### Database Schema
- **Core Tables:** profiles, interests, user_interests, groups, group_members, events, event_attendees
- **Authentication:** Supabase Auth with automatic profile creation
- **Storage:** Configured buckets for profile pictures, group images, event images
- **Row Level Security:** Comprehensive policies for data protection

### TypeScript Integration
```typescript
// Import types from lib/supabase.ts
import { Profile, Interest, Group, Event } from '@/lib/supabase'

// Example profile interface
interface Profile {
  id: string
  email: string
  first_name: string
  last_name?: string
  date_of_birth: string
  bio?: string
  location?: string
  verification_status: 'pending' | 'verified' | 'rejected'
  membership_tier: 'free' | 'core' | 'premium'
  // ... other fields
}
```

### Environment Configuration
**Required Environment Variables (.env.local):**
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## Authentication System (Production Ready)

### Demo Login System
The platform includes a comprehensive demo authentication system for easy testing and demonstration:

**Demo Credentials:**
- **Email:** demo@lusotown.com
- **Password:** LusoTown2025!

**Demo User Profile (Maria Silva):**
```typescript
{
  id: 'demo-user-id',
  email: 'demo@lusotown.com',
  name: 'Maria Silva',
  role: 'user',
  membershipTier: 'premium',
  profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786...',
  joinedDate: '2024-01-15',
  interests: ['Cultural Events', 'Portuguese Food', 'Language Exchange', 'Fado Music', 'Portuguese Literature'],
  favoriteEvents: ['event-1', 'event-3', 'event-5'],
  location: 'Camden, London'
}
```

**Demo System Features:**
- **Auto-Fill Credentials:** One-click button to populate login form
- **Session Persistence:** 24-hour demo sessions stored in localStorage
- **Bilingual Experience:** Complete English/Portuguese login interface
- **Portuguese Community Branding:** Cultural authenticity throughout login flow
- **Realistic Loading States:** Simulated authentication delays for UX testing
- **Seamless Integration:** Works alongside real Supabase authentication

**Testing the Authentication System:**
```bash
cd web-app
npm run dev
# Navigate to http://localhost:3000/login
# Click "Auto-Fill Credentials" or manually enter demo credentials
# Access dashboard at http://localhost:3000/dashboard
```

### Production Authentication
- **Supabase Auth:** Complete user registration and login system
- **Profile Management:** Automatic profile creation with database triggers
- **Role-Based Access:** User and admin role support
- **Password Reset:** Full password recovery system
- **Session Management:** Secure session handling with automatic refresh

## Key Files to Understand

### Web App Critical Files
- `web-app/src/app/layout.tsx`: Root layout with metadata, providers, and SEO
- `web-app/src/app/page.tsx`: Main landing page with Hero and Features
- `web-app/src/app/login/page.tsx`: Enhanced login page with demo authentication system
- `web-app/src/app/dashboard/page.tsx`: User dashboard accessible via demo login
- `web-app/src/app/feed/page.tsx`: Event feed page with interactive features
- `web-app/src/app/saved/page.tsx`: Saved items and cart management page
- `web-app/src/components/Header.tsx`: Navigation with language toggle
- `web-app/src/components/EventFeed.tsx`: Real-time event feed component
- `web-app/src/components/Cart.tsx`: Shopping cart functionality
- `web-app/src/components/EventFeedCard.tsx`: Enhanced event display with real-time interactions
- `web-app/src/components/FeedFilters.tsx`: Advanced filtering for Portuguese community
- `web-app/src/components/LiveUpdateIndicator.tsx`: Real-time update notifications
- `web-app/src/components/PhotoUpload.tsx`: Drag/drop photo sharing functionality
- `web-app/src/components/SaveFavoriteCartButton.tsx`: Universal save/cart button
- `web-app/src/components/SavedItemsButton.tsx`: Header integration with count badge
- `web-app/src/components/WelcomeModal.tsx`: Bilingual welcome system
- `web-app/src/context/LanguageContext.tsx`: Global language state management
- `web-app/src/context/CartContext.tsx`: Cart and saved items state management
- `web-app/src/lib/supabase.ts`: Database client and TypeScript interfaces
- `web-app/src/lib/auth.ts`: Authentication service with demo login system
- `web-app/next.config.js`: Static export configuration
- `web-app/tailwind.config.js`: Design system configuration

### Database Files
- `supabase/migrations/20250811_001_initial_schema.sql`: Complete database schema
- `supabase/config.toml`: Supabase project configuration

### Configuration Files
- `web-app/package.json`: Dependencies and scripts
- `web-app/tsconfig.json`: TypeScript configuration
- `vercel.json`: Deployment configuration

## Common Development Tasks

### Adding New Pages
1. Create page file in `src/app/[route]/page.tsx`
2. Follow existing page structure and metadata patterns
3. Add bilingual content support using LanguageContext
4. Test responsive design and accessibility

### Adding New Components
1. Create component in `src/components/`
2. Use TypeScript with proper prop interfaces
3. Follow existing naming conventions (PascalCase)
4. Import design tokens from Tailwind config
5. Consider bilingual support if user-facing
6. Integrate with existing context providers (Cart, Favorites, Language)
7. Implement responsive design with multi-column layout support
8. Add interactive features (save, like, share) where appropriate
9. Test with Event Feed and Cart functionality if relevant

### Modifying Design System
1. Edit color values in `web-app/tailwind.config.js`
2. Maintain Portuguese-inspired naming conventions
3. Test across all components and pages
4. Update component classes to use new tokens

### Database Changes
1. Create new migration file in `supabase/migrations/`
2. Follow naming convention: `YYYYMMDD_NNN_description.sql`
3. Update TypeScript interfaces in `src/lib/supabase.ts`
4. Test with local Supabase instance

### Debugging Common Issues
- **Build Errors:** Run `npm install` and check for TypeScript errors
- **Type Errors:** Use `npx tsc --noEmit` for detailed type checking
- **Styling Issues:** Verify Tailwind configuration and component classes
- **Context Issues:** Check provider wrapping in layout.tsx
- **Static Export:** Avoid server-side features, use static generation
- **Authentication Issues:** Check demo session in localStorage, verify authService singleton
- **Login Problems:** Ensure demo credentials are exactly: demo@lusotown.com / LusoTown2025!
- **Dashboard Access:** Verify authentication state before accessing protected routes

### Performance & Build Troubleshooting (Updated August 14, 2025)

**Recent Performance Fixes Applied:**
- ✅ **TypeScript Compilation:** Fixed critical compilation errors in business-directory components
- ✅ **Build Optimization:** Resolved image loading and bundling issues
- ✅ **Context Provider Overhead:** Eliminated memory leaks and reduced context re-rendering
- ✅ **Bundle Size Optimization:** Improved bundle splitting and lazy loading strategies
- ✅ **Development Server Stability:** Server now runs smoothly at http://localhost:3000

**Performance Debugging Steps:**
```bash
# If development server fails to start
cd web-app
rm -rf .next node_modules
npm install
npm run dev

# For TypeScript compilation errors
npx tsc --noEmit --incremental false
npm run build

# For bundle size analysis
npm run build
npm run analyze

# Memory leak detection
npm run dev
# Monitor browser DevTools Memory tab during navigation
```

**Common Performance Issues & Solutions:**
- **Slow Development Server:** Clear .next cache and reinstall dependencies
- **Large Bundle Size:** Check for unused dependencies and implement code splitting
- **Memory Leaks:** Ensure proper cleanup of event listeners and subscriptions
- **TypeScript Errors:** Run incremental type checking and fix interface mismatches
- **Image Optimization:** Use next/image component with proper sizing and formats

**Performance Monitoring:**
- **Build Time:** Target <30 seconds for full production build
- **Bundle Size:** Main bundle should be <500KB gzipped
- **Memory Usage:** Development server should use <200MB RAM
- **Load Speed:** Pages should load in <2 seconds on 3G connection

## Development Notes

### Path Aliases
- Use `@/` for imports from `src/` directory
- Example: `import { supabase } from '@/lib/supabase'`

### Static Export Configuration
- App is configured for static export in `next.config.js` with `trailingSlash: true` and `images.unoptimized: true`
- Avoid server-side features like API routes with dynamic functionality
- Use client-side data fetching with Supabase
- Images are unoptimized for static export compatibility

### Bilingual Support Architecture
- Language state managed through React Context
- Components receive language prop or use useLanguage hook
- Content switching handled at component level
- Welcome modal provides age-appropriate language selection

### Component Patterns
- Use TypeScript interfaces for all props
- Follow existing component structure and naming
- Implement responsive design with Tailwind breakpoints
- Include proper accessibility attributes

### Authentication Integration
- Use `authService.getCurrentUser()` to check authentication state
- Implement protected routes with authentication guards
- Demo user accessible via `authService.isDemoUser()`
- Auth state changes handled through `authService.onAuthStateChange()`

## Current Development Status

**Current Phase:** Platform Complete & Production Ready ✅ (August 14, 2025)
**Status:** 100% Complete - All Core Features Fully Implemented + Recent Performance & Brand Fixes

**Production Ready Features:**
- ✅ **Complete Bilingual System:** Language switching throughout platform
- ✅ **Real-life Connection Focus:** Platform messaging emphasizes offline meetups
- ✅ **Event Feed System:** Interactive feed with real-time event updates
- ✅ **Cart & Saved Items:** Complete shopping cart and favorites functionality
- ✅ **Multi-column Layout:** Enhanced responsive design with modern layout
- ✅ **38+ Static Pages:** All pages compile and render correctly with full functionality
- ✅ **Enhanced Components:** 54+ React components with advanced community functionality
- ✅ **TypeScript Integration:** Full type safety across expanded codebase
- ✅ **SEO Optimization:** Sitemap, robots.txt, meta tags configured
- ✅ **Performance Optimized:** Bundle size, loading speed, and server stability
- ✅ **Design System:** Portuguese-inspired branding with 100% consistency
- ✅ **Database Schema:** Complete Supabase integration
- ✅ **Agent System Integration:** 16 specialized agents fully operational

**Recently Completed Final Enhancements:**
- ✅ **Individual Event Detail Pages:** Complete event pages with full information, RSVP, and reviews
- ✅ **Enhanced Events Page:** Improved layout and functionality for event discovery
- ✅ **Comprehensive Contact Page:** Portuguese community elements and support channels
- ✅ **Join/Signup Experience:** Portuguese community onboarding with cultural authenticity
- ✅ **Navigation Optimization:** Streamlined navigation focusing on core community features
- ✅ **Language Consistency:** English-first with proper Portuguese toggle throughout
- ✅ **Portuguese Community Branding:** Consistent cultural authenticity across all pages
- ✅ **Enhanced Login System:** Beautiful login page with demo authentication
- ✅ **Demo Authentication:** Complete demo system (demo@lusotown.com / LusoTown2025!)
- ✅ **Production Deployment Ready:** All components and pages fully functional and tested

**Latest Performance & Brand Fixes (August 14, 2025):**
- ✅ **TypeScript Compilation Issues:** Fixed critical compilation errors in business-directory components
- ✅ **Development Server Stability:** Server now runs smoothly at http://localhost:3000
- ✅ **Bundle Optimization:** Improved build performance and reduced memory usage
- ✅ **Brand Consistency 100%:** All generic blue colors replaced with Portuguese brand palette
- ✅ **CTA Standardization:** Platform-wide CTA text updated to "Join Now" (bilingual)
- ✅ **Component Enhancement:** CategoryBadge and GroupsShowcase visual improvements
- ✅ **Agent System Deployment:** All 16 specialized agents active and documented
- ✅ **Performance Monitoring:** Added comprehensive debugging and monitoring tools

**Current Status:** 100% Production-ready with complete Portuguese community platform
**Achievement:** All core features implemented and deployment-ready

**Dashboard Access:**
- Navigate to http://localhost:3000/login to access authentication
- **Demo Login:** Use demo@lusotown.com with password LusoTown2025!
- **Auto-Fill Feature:** Click "Auto-Fill Credentials" button for instant demo access
- After login, dashboard available at http://localhost:3000/dashboard
- **Demo User:** Maria Silva - Premium member with full Portuguese community features
- Platform uses Supabase authentication with complete user management + demo system

**Major Implementation Documentation:**
- `EVENT_FEED_IMPLEMENTATION.md`: Complete technical documentation for Event Feed system
- `SAVE_CART_IMPLEMENTATION_SUMMARY.md`: Comprehensive guide to Save/Cart functionality

## Recommended Specialized Sub-Agents

Based on analysis of the LusoTown platform structure and Portuguese community needs, these specialized sub-agents would provide significant value:

### Phase 1 - Immediate Implementation
1. **LusoContentAgent** - Portuguese language and cultural content management
   - Translate platform content maintaining cultural nuances
   - Handle Portuguese regional variations (Portugal, Brazil, Angola, etc.)
   - Ensure cultural authenticity in all content

2. **LusoSafetyAgent** - Portuguese community-specific content moderation
   - Moderate forums and discussions in Portuguese and English
   - Handle cultural sensitivity in community interactions
   - Implement community guidelines appropriate for Portuguese culture

3. **LusoEventsAgent** - Portuguese cultural events curator
   - Curate authentic Portuguese cultural events (Fado nights, festivals)
   - Research London-based Portuguese venues and event spaces
   - Create culturally significant event descriptions

### Phase 2 - Growth & Expansion
4. **LusoGrowthAgent** - Portuguese community outreach and SEO
   - Optimize for Portuguese keywords and London-based searches
   - Manage social media outreach to Portuguese communities
   - Handle multilingual SEO strategies

5. **LusoBusinessAgent** - Portuguese business directory specialist
   - Research and verify Portuguese-owned businesses in London
   - Create detailed business profiles with cultural relevance
   - Manage business networking and partnerships

6. **LusoHeritageAgent** - Portuguese heritage preservation specialist
   - Create compelling Portuguese heritage and success stories
   - Develop cultural education content
   - Handle diaspora-specific content creation

### Phase 3 - Optimization & Partnerships
7. **LusoMembershipAgent** - Community membership optimization
   - Optimize membership features for Portuguese community needs
   - Handle Portuguese-specific payment preferences and benefits

8. **LusoPartnershipAgent** - Portuguese organization partnerships
   - Establish partnerships with Portuguese cultural centers
   - Coordinate with consulates and official organizations
   - Manage relationships with Portuguese institutions

## Project Sub-Agents System (Production Ready ✅)

The LusoTown project includes a **comprehensive agent ecosystem** with 16 specialized agents, intelligent task matching, and automated coordination for optimal Portuguese community development.

### 🤖 Agent System Features

**✅ Intelligent Agent Discovery:** Automated task-to-agent matching based on specialties and context
**✅ Agent Registry:** Centralized configuration with `.claude/agents.json` and individual agent profiles
**✅ CLI Discovery Tool:** `node .claude/invoke-agent.js` for finding the right agent for any task
**✅ Multi-Agent Coordination:** Project manager agent coordinates complex tasks across multiple specialists
**✅ Portuguese Community Focus:** 8 specialized agents for authentic Portuguese community development

### 🇵🇹 Portuguese Community Specialists (8 agents)
- **luso-content-agent** - Portuguese translation and cultural content (European/Brazilian variants)
- **luso-events-agent** - Portuguese cultural events curation (Fado nights, Santos Populares, festivals)
- **luso-safety-agent** - Community moderation with Portuguese cultural sensitivity
- **luso-business-agent** - Portuguese business directory and networking specialist
- **luso-growth-agent** - Portuguese community SEO and outreach optimization
- **luso-heritage-agent** - Portuguese heritage preservation and storytelling
- **luso-membership-agent** - Community membership optimization and revenue
- **luso-partnership-agent** - Portuguese institutional partnerships (Embassy, consulates, cultural centers)

### 💻 Development Specialists (5 agents)
- **bug-finder** - Quality assurance and testing specialist with Portuguese community context
- **deploy-manager** - Production deployment and DevOps management
- **doc-writer** - Technical and project documentation specialist
- **feature-builder** - New feature development for Portuguese community needs
- **refactor-helper** - Code optimization and architecture improvement

### 🎨 Design & Management (3 agents)
- **project-manager-agent** - Technical project coordination and Portuguese community requirements
- **ui-specialist** - User interface design with Portuguese cultural elements
- **ux-specialist** - User experience optimization for Portuguese diaspora

### 🚀 How to Use Agents

**Method 1: Natural Language (Recommended)**
```
"Help me translate the events page to Portuguese with cultural authenticity"
→ System recommends: luso-content-agent

"Create a Fado music event for the Portuguese community"
→ System recommends: luso-events-agent

"Test the cart functionality for bugs"
→ System recommends: bug-finder
```

**Method 2: Agent Discovery Tool**
```bash
# Find the right agent for your task
node .claude/invoke-agent.js "translate content to portuguese"

# List all available agents
node .claude/invoke-agent.js --list

# Get details about a specific agent
node .claude/invoke-agent.js --agent luso-content-agent
```

**Method 3: Multi-Agent Coordination**
```
"I need to create a comprehensive Portuguese festival feature. 
Please coordinate the events, content, safety, and development agents."
→ System uses: project-manager-agent + multiple specialists
```

### 📚 Agent Documentation

- **Complete Agent Guide:** `.claude/AGENTS_GUIDE.md` - Comprehensive usage instructions
- **Agent Registry:** `.claude/agents.json` - Central configuration with specialties and use cases
- **Individual Profiles:** `.claude/agents/[agent-name].md` - Detailed agent specifications
- **Discovery Tool:** `.claude/invoke-agent.js` - Intelligent agent matching and recommendations

### 💡 Agent System Benefits

**🎯 Task Optimization:** Automatic matching of tasks to specialized agents based on Portuguese community context
**🇵🇹 Cultural Authenticity:** Specialized agents ensure Portuguese cultural accuracy and sensitivity
**⚡ Development Speed:** Faster development through specialized expertise and coordination
**🔄 Quality Assurance:** Consistent quality gates and validation across all agent work
**📈 Scalability:** Easy addition of new agents for emerging Portuguese community needs

The agent system is **production-ready** and actively enhances all LusoTown development tasks with Portuguese community expertise.

## Platform Mission

**LusoTown London: Your Portuguese Adult Social Calendar in London (18+)**

**We help Portuguese-speaking adults live life together through:**
- **Booking London adult experiences** with Portuguese-speaking friends (museums, football, concerts, club nights, weekend trips)
- **Adult social calendar integration** - never miss out on age-appropriate activities you want to do
- **Instant adult connections** - find Portuguese-speaking adults to explore London with today, not just "someday"
- **Adult cultural activities** - from Tate Modern tours to Portuguese wine tastings to Fado nights
- **Active adult social life** - gym buddies, park runs, cycling groups, tennis matches with adults
- **London adult discovery** - explore the city with Portuguese-speaking adults who share your language and culture
- **Real adult booking functionality** - reserve spots, coordinate adult groups, manage social calendar
- **Portuguese adult community context** - stay connected to heritage while embracing London adult living

**Key Adult Activities We Connect:**
- **Cultural:** Adult museum visits, gallery tours, theatre shows, Portuguese heritage sites
- **Social:** Adult coffee meetups, restaurant dinners, Thames walks, brunch clubs, pub nights
- **Sports:** Adult football viewing/playing, yoga classes, park runs, gym partnerships
- **Nightlife:** Portuguese DJ events, live music, adult karaoke, salsa nights, clubbing (18+)
- **Day Trips:** Adult Brighton trips, countryside hikes, weekend getaways with Portuguese friends
- **Professional:** Business networking, career meetups, adult learning workshops, entrepreneur events

**Demo Access:** Experience the complete adult social calendar instantly with demo login (demo@lusotown.com / LusoTown2025!)

**Core Values:** *Unidos pela Língua* (United by Language) - **Living London Adult Life Together (18+)**

## Development Server

**Local Development:**
```bash
cd web-app && npm run dev
```
**URL:** http://localhost:3000
**Status:** ✅ Running smoothly with recent performance optimizations (August 14, 2025)

## Deployment

**Vercel Deployment:**
```bash
npm run deploy  # Automated deployment to Vercel
```

**Static Export:**
```bash
npm run export  # Generate static files for hosting
```

**Environment Setup:**
- Configure Supabase environment variables
- Set up Vercel project configuration
- Ensure all dependencies are installed