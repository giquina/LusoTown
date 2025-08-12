# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LusoTown London is a vibrant community platform for Portuguese speakers and their families living in London. The project consists of a Next.js web application focused on connecting Portuguese-speaking communities, preserving language, and celebrating culture in London.

## Development Commands

### Web App (Next.js)
```bash
cd web-app
npm install         # Install dependencies
npm run dev         # Start development server
npm run build       # Build for production
npm run start       # Start production server
npm run lint        # Run ESLint
npm run export      # Build and export static site
```

### Testing
No testing framework is currently configured. When implementing tests, update this section.

### Type Checking (Web App)
```bash
cd web-app
npx tsc --noEmit  # Type check without emitting files
```

## Architecture Overview

### Project Structure
```
LusoTown/
├── web-app/            # Next.js Portuguese community platform
│   ├── src/
│   │   ├── app/        # Next.js 14 app router structure
│   │   ├── components/ # React components (Hero, Features, etc.)
│   │   └── lib/        # Utility functions
│   └── package.json    # Web dependencies
├── mobile-app/         # React Native + Expo app (future development)
│   ├── src/
│   │   ├── screens/    # App screens (prepared for Portuguese community)
│   │   ├── constants/  # Design system and shared constants
│   │   └── components/ # Reusable UI components (future)
│   ├── App.js         # Main app entry point
│   └── package.json   # Mobile dependencies
└── docs/              # Project documentation
```

### Web App Architecture

**Current State (LusoTown London Platform Complete ✅):**
- **Portuguese Community Focus:** Platform for Portuguese speakers in London
- **Cultural Connection:** Events, stories, business directory, heritage preservation
- **Design System:** Portuguese-inspired colors and branding
- **Community Features:** Groups, events, business directory, cultural content
- **Multi-language Support:** Ready for Portuguese content integration

**Key Components:**
- `Hero.tsx`: Main landing page hero with Portuguese community messaging
- `Header.tsx`: Navigation with LusoTown London branding
- `Footer.tsx`: Footer with "Unidos pela Língua" and Portuguese community focus
- `Features.tsx`: Platform features for Portuguese community
- `Testimonials.tsx`: Success stories from Portuguese community members

**Target Audience:**
- Portuguese speakers who have moved to London
- British-born Lusophone descendants connecting with heritage
- Families with roots in Portuguese-speaking countries
- Anyone valuing Portuguese language and culture

### Mobile App Architecture

**Current State (Prepared for Portuguese Community):**
- **Design System:** Updated with Portuguese-inspired colors
- **Brand Identity:** LusoTown London branding applied
- **Future Development:** Ready for Portuguese community features

## Development Workflow

### Before Starting Work
```bash
git pull origin main  # Always pull latest changes
cd web-app           # Focus on web app development
npm install          # Ensure dependencies are current
```

### Development Guidelines

1. **Web App Development:**
   - Use TypeScript for all new components
   - Follow Next.js 14 app router conventions
   - Maintain responsive design with Tailwind CSS
   - Test static export compatibility
   - Focus on Portuguese community features

2. **Portuguese Community Focus:**
   - Emphasize cultural connection and heritage preservation
   - Consider multilingual content (English/Portuguese)
   - Design for London-based Portuguese diaspora
   - Include features for events, businesses, culture sharing

3. **Commit Frequently:**
   ```bash
   git add .
   git commit -m "Descriptive commit message"
   git push origin main
   ```

### Current Development Priority

**Phase: LusoTown London Platform (Current Focus):**
1. **Community Features:** Events, groups, business directory
2. **Cultural Content:** Portuguese traditions, London experiences
3. **User Engagement:** Stories, connections, heritage celebration
4. **Local Integration:** London-specific features for Portuguese speakers
5. **Multi-language Support:** Portuguese content integration
6. **GDPR Compliance:** UK regulatory framework implementation

## Technology Stack

### Web App
- **Next.js 14** with TypeScript
- **Tailwind CSS** with Portuguese-inspired design system
- **Framer Motion** for animations
- **Headless UI** for accessible components
- **Lucide React** for icons

### Mobile App (Future Development)
- **React Native 0.76.1** with **Expo 52.0.0**
- **React Navigation 7** for navigation
- **Formik + Yup** for form handling and validation
- **React Native Paper** for UI components

### Backend (Production Ready ✅)
- **Supabase** (PostgreSQL, Authentication, Storage, Edge Functions) - INTEGRATED
- **Stripe** for payment processing (planned)

## Brand Identity - LusoTown London

### Design System
The web app uses a Portuguese-inspired design system:

**Brand Colors:**
- **Emerald Green:** `#059669` (Growth, culture, heritage)
- **Deep Ocean Blue:** `#1E40AF` (Connection, trust, calm)
- **Golden Yellow:** `#F59E0B` (Warmth, joy, community)
- **Warm Red:** `#DC2626` (Passion, unity, celebration)
- **Fado Purple:** `#7C3AED` (Cultural traditions)
- **Tropical Coral:** `#F97316` (Warm interactions)

**Typography & Spacing:** Consistent design tokens in Tailwind config

**Usage:** Import and use design system consistently:
```javascript
import { Colors, Spacing, Typography } from '../constants/Styles';
```

### Target Communities
- **Portugal** 🇵🇹 **Brazil** 🇧🇷 **Angola** 🇦🇴 **Mozambique** 🇲🇿
- **Cape Verde** 🇨🇻 **Guinea-Bissau** 🇬🇼 **São Tomé and Príncipe** 🇸🇹
- **East Timor** 🇹🇱 **Macau** 🇲🇴 **Equatorial Guinea** 🇬🇶
- Their diaspora communities in London

## Supabase Integration (Complete ✅)

The project uses Supabase as the production backend with the following setup:

### Database Schema
- **PostgreSQL** with comprehensive schema in `/supabase/migrations/20250811_001_initial_schema.sql`
- **Tables:** profiles, interests, user_interests, groups, group_members, events, event_attendees
- **Row Level Security (RLS)** policies for data privacy and access control
- **Storage buckets** for profile pictures, group images, event images

### Authentication & Security
- **Supabase Auth** with email/password and social login support
- **Automatic user profile creation** via database triggers
- **Secure file upload** policies with user-specific folder structure

### Environment Configuration
**Web App (.env.local):**
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## Key Files to Understand

### Web App Critical Files  
- `web-app/src/app/layout.tsx`: Root layout with LusoTown London metadata and SEO
- `web-app/src/app/page.tsx`: Main landing page
- `web-app/src/components/Header.tsx`: Navigation with LusoTown London branding
- `web-app/src/components/Hero.tsx`: Landing page hero with Portuguese community messaging
- `web-app/src/components/Features.tsx`: Platform features showcase
- `web-app/src/components/Footer.tsx`: Site footer with "Unidos pela Língua" messaging
- `web-app/src/lib/supabase.ts`: Supabase client configuration and TypeScript interfaces
- `web-app/next.config.js`: Next.js configuration for static export
- `web-app/tailwind.config.js`: Tailwind CSS with Portuguese-inspired brand colors

### Web App Page Structure
**Landing & Information Pages:**
- `web-app/src/app/page.tsx`: Main landing page with hero, features
- `web-app/src/app/about/page.tsx`: About LusoTown London and mission
- `web-app/src/app/how-it-works/page.tsx`: Platform usage guide
- `web-app/src/app/community/page.tsx`: Portuguese community overview
- `web-app/src/app/contact/page.tsx`: Contact information
- `web-app/src/app/pricing/page.tsx`: Membership tiers for Portuguese community

**Platform Features:**
- `web-app/src/app/events/page.tsx`: Portuguese cultural events directory
- `web-app/src/app/directory/page.tsx`: Portuguese business and member directory
- `web-app/src/app/forums/page.tsx`: Community discussion forums

### Mobile App Critical Files (Future Development)
- `mobile-app/src/constants/Styles.js`: Portuguese-inspired design system
- `mobile-app/app.json`: LusoTown London configuration

## Common Development Tasks

### Adding Portuguese Community Features
1. Consider cultural significance and heritage preservation
2. Design for London-based Portuguese diaspora
3. Include multilingual considerations (English/Portuguese)
4. Test with Portuguese community user stories

### Modifying Design System
1. Edit values in `web-app/tailwind.config.js`
2. Maintain Portuguese-inspired color palette
3. Test on multiple screen sizes
4. Commit changes with descriptive message

### Debugging Common Issues
- **Build errors:** Check for missing dependencies with `npm install`
- **Type errors:** Run `npx tsc --noEmit` for type checking
- **Styling issues:** Verify Tailwind configuration and classes
- **Missing dependencies:** Run `npm install` in web-app directory

### Web App Development Notes
- **Path Aliases:** Use `@/` for imports from `src/` directory
- **Static Export:** App is configured for static export - avoid server-side features
- **TypeScript:** All new components should be TypeScript with proper interfaces
- **Design System:** Use Tailwind classes that match Portuguese-inspired color scheme
- **Portuguese Focus:** Design components with Portuguese community in mind

## Current Development Status

**Current Phase:** LusoTown London Platform Active Development 🚧
**Previous Milestone:** Core Branding and Infrastructure Complete ✅

**Recently Completed:**
- ✅ **Complete Rebranding:** AdyaTribe to LusoTown London transformation
- ✅ **Portuguese Color Palette:** Cultural brand colors implemented
- ✅ **Core Components Updated:** Hero, Header, Footer with Portuguese messaging
- ✅ **SEO & Metadata:** Layout.tsx updated with Portuguese community focus
- ✅ **Package Configuration:** All configs updated to LusoTown London
- ✅ **Development Server:** Running successfully at localhost:3000

**Current Focus:** Content updates and Portuguese community features
**Next Priority:** Complete page content updates and deploy to GitHub

## Platform Mission

**LusoTown London helps Portuguese speakers:**
- Find and attend Portuguese cultural events in London
- Connect with friends, family, and community who understand their heritage
- Share stories, memories, and tips about living in London
- Discover Portuguese-speaking businesses and services
- Build friendships and networks to support one another
- Celebrate roots and preserve Portuguese culture in London

## Development Server

**Current Status:** ✅ Running at http://localhost:3000
**Command:** `cd web-app && npm run dev`
**Preview:** Local development server active for testing changes

## 📊 **Current Project Metrics** 
*(Auto-updated: 2025-08-12)*

- **Web App**: Next.js 14 with TypeScript (LusoTown London branding complete)
- **Mobile App**: React Native 0.76.1 + Expo 52.0.0 (prepared for Portuguese community)
- **Backend**: Supabase with PostgreSQL, Auth, Storage, and Edge Functions
- **Target Audience**: Portuguese speakers and families in London
- **Brand Colors**: Portuguese-inspired 6-color palette
- **Countries Served**: 10+ Portuguese-speaking nations' diaspora communities
- **Development Status**: Active rebranding and feature development
- **Deployment**: Ready for GitHub push and production deployment