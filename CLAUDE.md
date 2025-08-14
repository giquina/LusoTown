# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LusoTown London is a vibrant community platform for Portuguese speakers and their families living in London. The project consists of a Next.js web application focused on connecting Portuguese-speaking communities, preserving language, and celebrating culture in London.

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

No automated testing framework is currently configured. Manual testing should focus on:
- Event Feed interactions (like, share, save)
- Cart functionality (add/remove items, quantity management)
- Saved items management and filtering
- Bilingual functionality across all new features
- Responsive design on mobile devices

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

**Phase: Deployment & Launch:**
1. **Production Deployment:** Platform ready for immediate launch
2. **Community Onboarding:** All Portuguese community features complete
3. **Event Management:** Full event creation, booking, and management system
4. **Social Features:** Complete event feed, cart, and interaction system
5. **Bilingual Platform:** Full English/Portuguese language support
6. **User Experience:** All pages and features optimized for Portuguese community

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

**Typography:**
- **Font Family:** Inter (body), Poppins (display)
- **Display Sizes:** display-large, display, display-small
- **Responsive:** xs, sm, md, lg, xl, 2xl breakpoints

**Animations:**
- **Keyframes:** fadeInUp, fadeIn, scaleIn, slideInRight
- **Classes:** animate-fade-in-up, animate-fade-in, animate-scale-in

### Target Communities
- **Portugal** 🇵🇹 **Brazil** 🇧🇷 **Angola** 🇦🇴 **Mozambique** 🇲🇿
- **Cape Verde** 🇨🇻 **Guinea-Bissau** 🇬🇼 **São Tomé and Príncipe** 🇸🇹
- **East Timor** 🇹🇱 **Macau** 🇲🇴 **Equatorial Guinea** 🇬🇶
- Their diaspora communities in London

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

## Key Files to Understand

### Web App Critical Files
- `web-app/src/app/layout.tsx`: Root layout with metadata, providers, and SEO
- `web-app/src/app/page.tsx`: Main landing page with Hero and Features
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

## Current Development Status

**Current Phase:** Platform Complete & Production Ready ✅ (August 14, 2025)
**Status:** 100% Complete - All Core Features Fully Implemented

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
- ✅ **Performance:** Optimized bundle size and loading speed
- ✅ **Design System:** Portuguese-inspired branding complete
- ✅ **Database Schema:** Complete Supabase integration

**Recently Completed Final Enhancements:**
- ✅ **Individual Event Detail Pages:** Complete event pages with full information, RSVP, and reviews
- ✅ **Enhanced Events Page:** Improved layout and functionality for event discovery
- ✅ **Comprehensive Contact Page:** Portuguese community elements and support channels
- ✅ **Join/Signup Experience:** Portuguese community onboarding with cultural authenticity
- ✅ **Navigation Optimization:** Streamlined navigation focusing on core community features
- ✅ **Language Consistency:** English-first with proper Portuguese toggle throughout
- ✅ **Portuguese Community Branding:** Consistent cultural authenticity across all pages
- ✅ **Production Deployment Ready:** All components and pages fully functional and tested

**Current Status:** 100% Production-ready with complete Portuguese community platform
**Achievement:** All core features implemented and deployment-ready

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

## Project Sub-Agents (Available in `.claude/agents/`)

The LusoTown project includes comprehensive specialized sub-agents for optimal development and community management:

### Portuguese Community Specialists
- **luso-content-agent** - Portuguese translation and cultural content management
- **luso-safety-agent** - Community moderation with Portuguese cultural sensitivity
- **luso-events-agent** - Portuguese cultural events curation and management
- **luso-growth-agent** - Portuguese community SEO and outreach optimization
- **luso-business-agent** - Portuguese business directory and networking specialist
- **luso-heritage-agent** - Portuguese heritage preservation and storytelling
- **luso-membership-agent** - Community membership optimization and revenue
- **luso-partnership-agent** - Portuguese institutional partnerships and relationships

### Development and Operations Specialists
- **doc-writer** - Technical and project documentation specialist
- **bug-finder** - Quality assurance and bug detection specialist
- **refactor-helper** - Code optimization and architecture improvement
- **feature-builder** - New feature development for Portuguese community needs
- **deploy-manager** - Production deployment and DevOps management

These sub-agents can be invoked using Claude Code's subagent system and will automatically assist with relevant tasks throughout the development process.

## Platform Mission

**LusoTown London helps Portuguese speakers:**
- Find and attend Portuguese cultural events in London through real-life meetups
- Connect with community members who understand their heritage in person
- Share stories, memories, and experiences of living in London
- Discover Portuguese-speaking businesses and services
- Build meaningful friendships and professional networks through offline connections
- Celebrate cultural roots and preserve Portuguese traditions
- Save and manage favorite events, businesses, and community content
- Engage with community through interactive event feeds and social features
- Book events and services through integrated cart and payment system

**Core Values:** *Unidos pela Língua* (United by Language)

## Development Server

**Local Development:**
```bash
cd web-app && npm run dev
```
**URL:** http://localhost:3000
**Status:** Configured and ready for development

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