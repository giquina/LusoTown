# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AdyaTribe is a community platform for 30+ single & childfree women featuring interest-based groups, events, and safe verification. The project consists of a React Native mobile app and a Next.js web application.

## Development Commands

### Mobile App (React Native + Expo)
```bash
cd mobile-app
npm install          # Install dependencies
npm start           # Start Expo development server
npm run android     # Run on Android device/emulator
npm run ios         # Run on iOS device/simulator
npm run web         # Run web version in browser
```

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
AdyaTribe/
├── mobile-app/          # React Native + Expo mobile application
│   ├── src/
│   │   ├── screens/     # App screens (onboarding, main app)
│   │   ├── constants/   # Design system and shared constants
│   │   └── components/  # Reusable UI components (future)
│   ├── App.js          # Main app entry point
│   └── package.json    # Mobile dependencies
├── web-app/            # Next.js landing page and web dashboard
│   ├── src/
│   │   ├── app/        # Next.js 14 app router structure
│   │   ├── components/ # React components (Hero, Features, etc.)
│   │   └── lib/        # Utility functions
│   └── package.json    # Web dependencies
└── docs/               # Project documentation
```

### Mobile App Architecture

**Current State (Phase 1 - Foundation Complete ✅):**
- **Onboarding Flow:** 7/7 steps implemented (100% COMPLETE!)
- **Design System:** Centralized in `src/constants/Styles.js`
- **Navigation:** Step-by-step flow managed in `OnboardingFlow.js`
- **Data Collection:** User data accumulated in parent component state
- **User Journey:** Complete signup to community entry flow
- **Authentication:** Selfie verification system for safety & authenticity

**Key Components:**
- `OnboardingFlow.js`: Main navigation controller for 7-step onboarding
- `FirstNameStep.js`: Collects and validates user's first name
- `DateOfBirthStep.js`: Date picker with 30+ age verification
- `EmailStep.js`: Email validation and collection
- `ProfilePictureStep.js`: Photo upload with camera/gallery selection
- `SelfieVerificationStep.js`: AI-powered identity verification
- `InterestTagsStep.js`: 48 interests across 6 categories for matching
- `WelcomeStep.js`: Celebration screen with community guidelines
- `Styles.js`: Complete design system with colors, typography, spacing

**Onboarding Steps:**
1. ✅ First Name Collection
2. ✅ Date of Birth + Age Verification (30+)  
3. ✅ Email Address + Validation
4. ✅ Profile Picture Upload (camera/gallery selection)
5. ✅ Live Selfie Verification (AI-powered safety)
6. ✅ Interest Tags Selection (48 interests, 6 categories)
7. ✅ Welcome Screen + Community Guidelines

### Web App Architecture

**Current State:**
- **Next.js 14** with app router and TypeScript
- **Tailwind CSS** with custom design system matching mobile app colors
- **Static export** configured for deployment (output: 'export' in next.config.js)
- **SEO optimized** with metadata and Open Graph tags
- **Complete Landing Page:** Hero, Features, Testimonials, CTA, Footer
- **Authentication Pages:** Login & Signup forms with social login options
- **Information Pages:** About, Contact, How It Works, Community, Pricing
- **Core Platform Features:** Dashboard, Chat, Directory, Events, Forums, Profiles
- **Advanced Components:** Profile management, messaging system, event creation

## Development Workflow

### Before Starting Work
```bash
git pull origin main  # Always pull latest changes
cd mobile-app        # Or cd web-app
npm install          # Ensure dependencies are current
```

### Development Guidelines

1. **Mobile App Development:**
   - Follow existing onboarding step pattern when adding new steps
   - Use centralized design system from `Styles.js`
   - Validate user input before allowing navigation
   - Update `OnboardingFlow.js` to include new steps
   - Test on both iOS and Android using Expo Go

2. **Web App Development:**
   - Use TypeScript for all new components
   - Follow Next.js 14 app router conventions
   - Maintain responsive design with Tailwind CSS
   - Test static export compatibility

3. **Commit Frequently:**
   ```bash
   git add .
   git commit -m "Descriptive commit message"
   git push origin main
   ```

### Current Development Priority

**Phase 2 - Membership Platform (Current Focus):**
1. **Dashboard Design:** User engagement features and activity feeds
2. **Membership Tiers:** Free, Core, and Premium subscription models  
3. **Community Chat:** Group-based messaging with moderation
4. **Safety Features:** Advanced moderation and reporting systems
5. **User Verification:** Enhanced selfie verification for authenticity
6. **GDPR Compliance:** UK regulatory framework implementation
7. **Payment Integration:** Stripe subscription management

## Technology Stack

### Mobile App
- **React Native 0.76.1** with **Expo 52.0.0**
- **React Navigation 7** for navigation
- **Formik + Yup** for form handling and validation
- **React Native Paper** for UI components
- **Supabase Client** for backend integration (installed but missing from package.json)
- **Firebase 10.0.0** (legacy dependency, can be removed)
- **Expo Camera** and **Image Picker** for photo features

### Web App
- **Next.js 14** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Headless UI** for accessible components
- **Lucide React** for icons

### Backend (Production Ready ✅)
- **Supabase** (PostgreSQL, Authentication, Storage, Edge Functions) - INTEGRATED
- **Stripe** for payment processing (planned)

## Utility Libraries (Web App)

The web app includes several utility libraries in `src/lib/`:

- **`auth.ts`**: Authentication service and user management
- **`connections.ts`**: User connections and networking features
- **`directory.ts`**: Member directory and search functionality
- **`events.ts`**: Event management and RSVP system
- **`forums.ts`**: Discussion forums and topic management
- **`messaging.ts`**: Chat rooms and messaging system
- **`profile.ts`**: User profile management and completion tracking
- **`supabase.ts`**: Supabase client with TypeScript interfaces for database operations

These libraries provide TypeScript interfaces and integrate with the Supabase backend for real-time functionality.

## Key Files to Understand

### Mobile App Critical Files
- `mobile-app/App.js`: Main app entry point, renders OnboardingFlow
- `mobile-app/src/screens/onboarding/OnboardingFlow.js`: Navigation controller for 7-step onboarding
- `mobile-app/src/constants/Styles.js`: Complete design system (Colors, Typography, Spacing, CommonStyles)
- `mobile-app/src/lib/supabase.js`: Supabase client configuration and helper functions for mobile
- `mobile-app/app.json`: Expo configuration
- `mobile-app/package.json`: Dependencies and scripts

### Web App Critical Files  
- `web-app/src/app/layout.tsx`: Root layout with metadata and font configuration
- `web-app/src/app/page.tsx`: Main landing page
- `web-app/src/components/Header.tsx`: Navigation with authentication links
- `web-app/src/components/Hero.tsx`: Landing page hero section
- `web-app/src/components/Features.tsx`: Platform features showcase
- `web-app/src/components/Testimonials.tsx`: User testimonials
- `web-app/src/components/CTA.tsx`: Call-to-action sections
- `web-app/src/components/Footer.tsx`: Site footer with links
- `web-app/src/lib/supabase.ts`: Supabase client configuration and TypeScript interfaces for web
- `web-app/next.config.js`: Next.js configuration for static export
- `web-app/tailwind.config.js`: Tailwind CSS configuration with AdyaTribe brand colors
- `web-app/tsconfig.json`: TypeScript configuration with path aliases (@/)

### Web App Page Structure
**Landing & Information Pages:**
- `web-app/src/app/page.tsx`: Main landing page with hero, features, testimonials
- `web-app/src/app/about/page.tsx`: About the platform and founder
- `web-app/src/app/how-it-works/page.tsx`: Platform usage guide
- `web-app/src/app/community/page.tsx`: Community overview
- `web-app/src/app/contact/page.tsx`: Contact information
- `web-app/src/app/pricing/page.tsx`: Membership tiers and pricing
- `web-app/src/app/success-stories/page.tsx`: Member success stories and testimonials
- `web-app/src/app/safety/page.tsx`: Safety Center with guidelines and reporting
- `web-app/src/app/community-guidelines/page.tsx`: Community standards and expectations

**Legal & Support Pages:**
- `web-app/src/app/privacy/page.tsx`: Privacy policy and data protection
- `web-app/src/app/terms/page.tsx`: Terms of service and legal agreements
- `web-app/src/app/help/page.tsx`: Help center and FAQ

**Authentication Pages:**
- `web-app/src/app/login/page.tsx`: User login form with social options
- `web-app/src/app/signup/page.tsx`: User registration form with social options
- `web-app/src/app/signup/success/page.tsx`: Post-signup welcome page
- `web-app/src/app/forgot-password/page.tsx`: Password recovery form

**Platform Features (Phase 2):**
- `web-app/src/app/dashboard/page.tsx`: User dashboard and activity feed
- `web-app/src/app/chat/page.tsx`: Chat room directory
- `web-app/src/app/chat/[id]/page.tsx`: Individual chat room interface
- `web-app/src/app/directory/page.tsx`: Member directory
- `web-app/src/app/directory/member/[id]/page.tsx`: Individual member profile view
- `web-app/src/app/events/page.tsx`: Events directory
- `web-app/src/app/events/[id]/page.tsx`: Individual event details
- `web-app/src/app/events/create/page.tsx`: Event creation form
- `web-app/src/app/forums/page.tsx`: Discussion forums
- `web-app/src/app/forums/topic/[id]/page.tsx`: Individual forum topic
- `web-app/src/app/forums/create-topic/page.tsx`: Forum topic creation form
- `web-app/src/app/profiles/page.tsx`: Profile browsing
- `web-app/src/app/profile/[id]/page.tsx`: Public profile view
- `web-app/src/app/profile/edit/page.tsx`: Profile editing interface
- `web-app/src/app/admin/page.tsx`: Admin dashboard (restricted)

### Advanced Components
The web app includes sophisticated components for enhanced user experience:

**Profile Components (`src/components/profile/`):**
- **`ProfileCard.tsx`**: Member profile card display
- **`ProfileHeader.tsx`**: Profile header with avatar and basic info
- **`ProfileEditForm.tsx`**: Comprehensive profile editing interface
- **`ProfileCompletion.tsx`**: Profile completion progress and gamification
- **`ProfileGallery.tsx`**: Photo gallery management
- **`ProfileBadges.tsx`**: Achievement and verification badges
- **`ProfileVerification.tsx`**: Identity verification status and controls
- **`ProfilePrivacy.tsx`**: Privacy settings and visibility controls
- **`ProfilePhotoManager.tsx`**: Photo upload and management system
- **`ConnectionButton.tsx`**: Connect/follow button with state management

**Platform Components (`src/components/`):**
- **`EventImageWithFallback.tsx`**: Robust event image display with fallback system
- **`EventsShowcase.tsx`**: Featured events display with category filtering
- **`SuccessStories.tsx`**: Member success stories showcase
- **`LiveFeedNotifications.tsx`**: Real-time activity feed notifications
- **`WhatsAppWidget.tsx`**: Customer support integration
- **`SocialLogin.tsx` & `SocialLoginButton.tsx`**: Social authentication components

## Design System

The mobile app uses a centralized design system in `src/constants/Styles.js`:

**Key Design Tokens:**
- **Primary Color:** `#FF6B6B` (warm coral)
- **Secondary Color:** `#4ECDC4` (calming teal)
- **Typography:** Hierarchical text styles (h1, h2, h3, body, caption)
- **Spacing:** Consistent spacing scale (xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48)
- **Components:** Reusable button, input, card, and container styles

**Usage:** Import and use the design system consistently:
```javascript
import { Colors, Spacing, Typography, CommonStyles } from '../../constants/Styles';
```

## Supabase Integration (Complete ✅)

The project uses Supabase as the production backend with the following setup:

### Database Schema
- **PostgreSQL** with comprehensive schema in `/supabase/migrations/20250811_001_initial_schema.sql`
- **Tables:** profiles, interests, user_interests, groups, group_members, events, event_attendees
- **Row Level Security (RLS)** policies for data privacy and access control
- **Storage buckets** for profile pictures, verification selfies, group images, event images

### Authentication & Security
- **Supabase Auth** with email/password and social login support
- **Automatic user profile creation** via database triggers
- **Secure file upload** policies with user-specific folder structure
- **Verification system** for selfies and identity validation

### Environment Configuration
**Web App (.env.local):**
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

**Mobile App (app.json or .env):**
```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## Development Status

**Current Phase:** Phase 2 - Membership Platform Development (Advanced Implementation) 🚧
**Previous Milestone:** Phase 1 - Foundation Complete ✅

**Recently Completed:**
- ✅ **Supabase Integration:** Complete backend with PostgreSQL, Auth, Storage
- ✅ **Database Schema:** Full production schema with RLS policies
- ✅ **Mobile Backend:** Supabase client integrated with onboarding flow
- ✅ **Web Backend:** TypeScript interfaces and helper functions
- ✅ **Core Platform Pages:** Dashboard, Chat, Directory, Events, Forums
- ✅ **Legal & Safety Pages:** Privacy Policy, Terms of Service, Help Center, Safety Center
- ✅ **Success Stories Page:** Complete with member testimonials and impact metrics
- ✅ **Event System Enhancement:** Fallback image system and category filtering
- ✅ **Profile Management System:** 10 specialized profile components
- ✅ **Social Authentication:** Login/signup with social media options
- ✅ **Community Guidelines:** Complete community standards page
- ✅ **Enhanced UI Components:** Success stories, events showcase, live notifications
- ✅ **Image Handling:** Robust fallback system for event and profile images
- ✅ **Configuration Fix:** Resolved Vercel deployment issues with trailing slash config
- ✅ **Live Deployment:** Website successfully deployed to Vercel production

**Current Focus:** Backend integration and mobile app completion
**Next Priority:** Onboarding-to-database integration and real-time functionality

## Upcoming Platform Features

### Membership & Community System
- **Membership Tiers:** Free (limited), Core (full access), Premium (exclusive features)
- **Community Chat:** Group-based messaging without 1:1 matching
- **Safety First:** Selfie verification, moderation system, women-only spaces
- **Engagement Hub:** User dashboard with activity feeds and group recommendations
- **Local & Interest Groups:** Location-based and topic-based communities
- **Event System:** Community events and expert sessions

### Technical Architecture Priorities
- **Real-time Chat:** Supabase Realtime subscriptions for group messaging
- **Subscription Management:** Stripe integration with Supabase webhook handling
- **Content Moderation:** Automated filtering + human review queues via Edge Functions
- **GDPR Compliance:** Data minimization and user rights management (built into RLS)
- **Privacy by Design:** On-device verification, secure Supabase storage policies

## Common Development Tasks

### Adding a New Onboarding Step
1. Create new step component in `src/screens/onboarding/`
2. Follow existing pattern from `EmailStep.js`
3. Add case to `OnboardingFlow.js` switch statement
4. Update userData state structure if needed
5. Integrate with Supabase using functions from `src/lib/supabase.js`
6. Test navigation flow thoroughly

### Modifying Design System
1. Edit values in `src/constants/Styles.js`
2. Changes automatically apply across entire app
3. Test on multiple screen sizes
4. Commit changes with descriptive message

### Debugging Common Issues
- **Metro bundler errors:** Clear cache with `npx expo start --clear`
- **Navigation issues:** Check step numbers and navigation logic
- **Styling issues:** Verify imports from Styles.js
- **Supabase connection issues:** Check environment variables and network connectivity
- **Database errors:** Verify RLS policies and user authentication state
- **Image loading issues:** EventImageWithFallback component handles missing images
- **Build errors:** Check for missing dependencies with `npm install`
- **Social login issues:** Verify environment variables for OAuth providers
- **Missing dependencies:** Run `npm install` in correct directory (mobile-app or web-app)
- **Mobile Supabase import errors:** Add `@supabase/supabase-js` to mobile-app/package.json if needed
- **Git sync issues:** Ensure you're in correct directory for commands

### Web App Development Notes
- **Path Aliases:** Use `@/` for imports from `src/` directory (configured in tsconfig.json)
- **Static Export:** App is configured for static export - avoid server-side features
- **TypeScript:** All new components should be TypeScript with proper interfaces
- **Design System:** Use Tailwind classes that match the mobile app color scheme
- **Component Structure:** Follow existing patterns in profile components for consistency
- **Supabase Integration:** Use TypeScript interfaces from `src/lib/supabase.ts` for type safety

### Deployment Configuration ✅ **LIVE ON VERCEL**
- **Production URL:** https://web-rjemcjy4q-giquinas-projects.vercel.app
- **Next.js Config:** Dynamic rendering with proper trailing slash configuration
- **Vercel Integration:** Automatic deployments from main branch
- **Build Process:** All 29 pages building successfully (49s build time)
- **Asset Optimization:** Images set to unoptimized for compatibility
- **Configuration Status:** Fixed trailing slash mismatch between next.config.js and vercel.json

## Claude AI Agent System

AdyaTribe uses Claude Code's built-in agent system with specialized documentation in `.claude/agents/adyatribe/` for reference:

### Available Executable Agents

**Built-in Claude Code agents that work with Task tool:**

- **`general-purpose`** - Complex research, multi-step tasks, keyword searching
- **`feature-planner`** - Breaking down complex features into manageable tasks for beginners
- **`onboarding-flow-expert`** - AdyaTribe's 7-step onboarding workflow optimization  
- **`design-system-guardian`** - Design consistency across AdyaTribe components
- **`file-consistency-manager`** - File consistency, duplicates, single source of truth
- **`react-native-debugger`** - React Native and Expo debugging for mobile app

### Agent Task Mapping

**For AdyaTribe Development:**
- **UI/Visual Design** → use `design-system-guardian`
- **UX/User Experience** → use `feature-planner` or `general-purpose`
- **React Native/Mobile** → use `react-native-debugger` 
- **Backend/Database** → use `general-purpose`
- **Testing/QA** → use `general-purpose`
- **Deployment/DevOps** → use `general-purpose`
- **Project Management** → use `feature-planner`
- **Security/Safety** → use `general-purpose`
- **Onboarding Flow** → use `onboarding-flow-expert`

### Reference Documentation
- `.claude/agents/adyatribe/` - Detailed specialist knowledge (documentation only)
- `.claude/hooks/` - Development hooks and automation  
- `.claude/slash-commands/` - Custom Claude Code commands

**Usage:** Use Task tool with appropriate `subagent_type` from the executable agents list above.

## 📊 **Current Project Metrics** 
*(Auto-updated: 2025-08-12)*

- **Mobile App**: React Native 0.76.1 + Expo 52.0.0 (onboarding complete)
- **Web App**: Next.js 14 with TypeScript (29 pages complete) ✅ **DEPLOYED**
- **Backend**: Supabase with PostgreSQL, Auth, Storage, and Edge Functions
- **Web Pages**: 29 complete pages including comprehensive pricing page
- **Components**: 20+ specialized components with fallback systems
- **Authentication**: Social login integration (Google, Apple, Facebook)
- **Onboarding Steps**: 7/7 mobile steps (ready for backend integration)
- **Database Tables**: 6 core tables with RLS policies
- **Storage Buckets**: 4 configured buckets for secure file management
- **Image Handling**: Robust fallback system for all visual content
- **Deployment**: Live on Vercel (https://web-rjemcjy4q-giquinas-projects.vercel.app)
- **Git Status**: Clean (platform-ready with comprehensive features)

