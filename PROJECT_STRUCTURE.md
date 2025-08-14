# LusoTown Project Structure

## Overview

LusoTown is a Portuguese adult social calendar platform (18+) for London-based Portuguese speakers. This document provides a comprehensive overview of the project structure, including all directories, key files, and their purposes.

## 🏗️ Root Directory Structure

```
LusoTown/
├── 📄 README.md                                # Main project documentation
├── 📄 CLAUDE.md                                # Claude Code development guide
├── 📄 DOCUMENTATION_INDEX.md                   # Complete documentation index
├── 📄 PROJECT_STRUCTURE.md                     # This file - project structure
├── 📄 EVENT_FEED_IMPLEMENTATION.md             # Event feed technical documentation
├── 📄 SAVE_CART_IMPLEMENTATION_SUMMARY.md      # Save/Cart functionality guide
├── 📄 SUPABASE_COMPREHENSIVE_PLAN.md           # Database and backend documentation
├── 📄 LICENSE                                  # MIT License
├── 📄 vercel.json                              # Vercel deployment configuration
├── 📄 package.json                             # Root package configuration
├── 📄 start-dev.sh                             # Development startup script
├── 🤖 .claude/                                 # Claude Code agent system
├── 📱 mobile-app/                              # React Native app (future)
├── 🌐 web-app/                                 # Next.js web application
└── 🗄️ supabase/                                # Database and backend
```

## 🤖 Claude Agent System (`.claude/`)

```
.claude/
├── 📄 README.md                                # Agent system overview
├── 📄 AGENTS_DOCUMENTATION.md                  # Comprehensive agent documentation
├── 📄 HOOKS_AND_WORKFLOWS.md                   # Automated workflow system
├── 📄 IMPLEMENTATION_SUMMARY.md                # Implementation summaries
├── 🔧 agents/                                  # Individual agent configurations
│   ├── 🇵🇹 Portuguese Community Specialists
│   │   ├── 📄 luso-content-agent.md           # Portuguese content & translation
│   │   ├── 📄 luso-safety-agent.md            # Adult community safety (18+)
│   │   ├── 📄 luso-events-agent.md            # Portuguese events curation
│   │   ├── 📄 luso-growth-agent.md            # Community outreach & SEO
│   │   ├── 📄 luso-business-agent.md          # Business directory & networking
│   │   ├── 📄 luso-heritage-agent.md          # Heritage preservation & stories
│   │   ├── 📄 luso-membership-agent.md        # Membership optimization
│   │   └── 📄 luso-partnership-agent.md       # Institutional partnerships
│   ├── 🛠️ Development & Operations Specialists
│   │   ├── 📄 doc-writer.md                   # Technical documentation
│   │   ├── 📄 bug-finder.md                   # Quality assurance
│   │   ├── 📄 refactor-helper.md              # Code optimization
│   │   ├── 📄 feature-builder.md              # Feature development
│   │   ├── 📄 deploy-manager.md               # Deployment & DevOps
│   │   ├── 📄 ui-specialist.md                # User interface design
│   │   ├── 📄 ux-specialist.md                # User experience design
│   │   └── 📄 project-manager-agent.md        # Project management
└── 🪝 hooks/                                   # Automation hooks
    └── 📄 README.md                            # Hook implementation guide
```

## 🌐 Web Application (`web-app/`)

### Main Directory Structure

```
web-app/
├── 📄 package.json                             # Dependencies and scripts
├── 📄 next.config.js                           # Next.js configuration
├── 📄 tailwind.config.js                       # Tailwind CSS configuration
├── 📄 tsconfig.json                            # TypeScript configuration
├── 📄 postcss.config.js                        # PostCSS configuration
├── 📄 vercel.json                              # Vercel deployment config
├── 📄 DESIGN_SYSTEM.md                         # Portuguese-inspired design system
├── 📄 FEATURES_README.md                       # Feature specifications
├── 📄 database_schema.sql                      # Database schema file
├── 📁 src/                                     # Source code
├── 📁 public/                                  # Static assets
├── 📁 node_modules/                            # Dependencies
└── 🤖 .claude/                                 # Web app specific agents
```

### Source Code Structure (`src/`)

```
src/
├── 📄 globals.css                              # Global styles with Portuguese colors
├── 🎭 app/                                     # Next.js 14 App Router pages (38+ pages)
├── 🧩 components/                              # React components (54+ components)
├── 🌐 context/                                 # React Context providers
└── 📚 lib/                                     # Utility functions and services
```

### Pages Structure (`src/app/`)

```
app/
├── 📄 layout.tsx                               # Root layout with providers
├── 📄 page.tsx                                 # Main landing page
├── 🏠 Core Pages
│   ├── 📁 about/                               # About LusoTown
│   ├── 📁 contact/                             # Contact and support
│   ├── 📁 how-it-works/                        # Platform explanation
│   ├── 📁 pricing/                             # Membership tiers
│   ├── 📁 features-demo/                       # Feature demonstrations
│   └── 📁 demo/                                # Interactive demo
├── 🔐 Authentication & User Management
│   ├── 📁 login/                               # Login with demo system
│   ├── 📁 signup/                              # Registration
│   ├── 📁 forgot-password/                     # Password recovery
│   ├── 📁 dashboard/                           # User dashboard
│   ├── 📁 profile/                             # User profiles
│   │   ├── 📁 [id]/                            # Individual profile pages
│   │   └── 📁 edit/                            # Profile editing
│   └── 📁 profiles/                            # Profile directory
├── 🎉 Community Features
│   ├── 📁 events/                              # Event system
│   │   ├── 📁 [id]/                            # Individual event pages
│   │   └── 📁 create/                          # Event creation
│   ├── 📁 feed/                                # Event and community feed
│   ├── 📁 community/                           # Community overview
│   ├── 📁 groups/                              # Community groups
│   │   ├── 📁 [id]/                            # Individual group pages
│   │   └── 📁 create/                          # Group creation
│   └── 📁 forums/                              # Discussion forums
│       ├── 📁 topic/                           # Forum topics
│       │   └── 📁 [id]/                        # Individual topics
│       └── 📁 create-topic/                    # Topic creation
├── 🏪 Business & Networking
│   ├── 📁 directory/                           # Portuguese business directory
│   │   └── 📁 member/                          # Business profiles
│   │       └── 📁 [id]/                        # Individual business pages
│   └── 📁 success-stories/                     # Community success stories
├── 💖 User Interactions
│   ├── 📁 favorites/                           # Saved favorite items
│   ├── 📁 saved/                               # Saved items and cart
│   ├── 📁 following/                           # Following/connections
│   └── 📁 chat/                                # Messaging system
│       └── 📁 [id]/                            # Individual conversations
├── 📄 Legal & Policies
│   ├── 📁 terms/                               # Terms of service
│   ├── 📁 privacy/                             # Privacy policy
│   ├── 📁 safety/                              # Community safety
│   └── 📁 community-guidelines/                # Community guidelines
├── 🛠️ Admin & Management
│   ├── 📁 admin/                               # Admin dashboard
│   ├── 📁 help/                                # Help and support
│   └── 📁 signup/                              # Registration flow
│       ├── 📄 layout.tsx                       # Signup layout
│       ├── 📄 page.tsx                         # Main signup
│       └── 📁 success/                         # Registration success
│           ├── 📄 layout.tsx                   # Success layout
│           └── 📄 page.tsx                     # Success page
└── 🔌 api/                                     # API routes
    ├── 📁 favorites/                           # Favorites API
    └── 📁 feed/                                # Feed API
```

### Components Structure (`src/components/`)

```
components/
├── 🏠 Layout & Navigation
│   ├── 📄 Header.tsx                           # Main navigation with language toggle
│   ├── 📄 Footer.tsx                           # Footer with Portuguese community focus
│   ├── 📄 Logo.tsx                             # LusoTown branding
│   └── 📄 LanguageToggle.tsx                   # English/Portuguese switcher
├── 🎭 Core Page Components
│   ├── 📄 Hero.tsx                             # Landing page hero section
│   ├── 📄 Features.tsx                         # Platform features showcase
│   ├── 📄 HowItWorks.tsx                       # Platform explanation
│   ├── 📄 AboutLusoTown.tsx                    # About section
│   ├── 📄 CTA.tsx                              # Call-to-action sections
│   └── 📄 AppDownloadSection.tsx               # Mobile app promotion
├── 🎉 Event & Feed System
│   ├── 📄 EventFeed.tsx                        # Main event feed component
│   ├── 📄 EventFeedCard.tsx                    # Enhanced event cards
│   ├── 📄 EventCard.tsx                        # Standard event cards
│   ├── 📄 ImprovedEventCard.tsx                # Advanced event display
│   ├── 📄 FeedDemo.tsx                         # Feed demonstration
│   ├── 📄 PersonalizedFeed.tsx                 # Customized user feed
│   ├── 📄 FeedPost.tsx                         # Individual feed posts
│   ├── 📄 FeedSearch.tsx                       # Feed search functionality
│   ├── 📄 FeedFilters.tsx                      # Advanced filtering
│   ├── 📄 LiveUpdateIndicator.tsx              # Real-time updates
│   └── 📄 LiveFeedNotifications.tsx            # Live notifications
├── 🛒 Save & Cart System
│   ├── 📄 Cart.tsx                             # Shopping cart functionality
│   ├── 📄 CartButton.tsx                       # Cart interaction button
│   ├── 📄 SaveFavoriteCartButton.tsx           # Universal save/cart button
│   ├── 📄 SavedItemsButton.tsx                 # Header cart integration
│   ├── 📄 FavoriteButton.tsx                   # Favorite functionality
│   └── 📄 FavoriteNotification.tsx             # Favorite notifications
├── 👥 User & Profile System
│   ├── 📁 profile/                             # Profile-specific components
│   │   ├── 📄 ProfileCard.tsx                  # User profile cards
│   │   ├── 📄 ProfileHeader.tsx                # Profile page header
│   │   ├── 📄 ProfileEditForm.tsx              # Profile editing
│   │   ├── 📄 ProfileCompletion.tsx            # Profile completion
│   │   ├── 📄 ProfileBadges.tsx                # User badges and verification
│   │   ├── 📄 ProfileGallery.tsx               # Photo gallery
│   │   ├── 📄 ProfilePhotoManager.tsx          # Photo management
│   │   ├── 📄 ProfilePrivacy.tsx               # Privacy settings
│   │   ├── 📄 ProfileVerification.tsx          # Verification system
│   │   └── 📄 ConnectionButton.tsx             # Connection/following
│   ├── 📄 UserTypeSelection.tsx                # User type selection
│   └── 📄 WelcomeModal.tsx                     # Bilingual welcome system
├── 🏪 Business & Networking
│   ├── 📄 BusinessCard.tsx                     # Business profile cards
│   ├── 📄 GroupsShowcase.tsx                   # Community groups
│   ├── 📄 EventsShowcase.tsx                   # Event showcases
│   └── 📄 SuccessStories.tsx                   # Community stories
├── 🔐 Authentication & Security
│   ├── 📄 SocialLogin.tsx                      # Social login options
│   ├── 📄 SocialLoginButton.tsx                # Social login buttons
│   └── 📄 GroupReportModal.tsx                 # Safety reporting
├── 📱 Interactive Features
│   ├── 📄 PhotoUpload.tsx                      # Photo upload functionality
│   ├── 📄 ReactionButton.tsx                   # Post reactions
│   ├── 📄 FollowButton.tsx                     # Follow/unfollow
│   ├── 📄 Hashtag.tsx                          # Hashtag functionality
│   └── 📄 AutoPostDemo.tsx                     # Auto-posting demo
├── 📊 Analytics & Reviews
│   ├── 📄 EventReviewSystem.tsx                # Event review system
│   ├── 📄 ReviewAnalytics.tsx                  # Review analytics
│   └── 📄 TestimonialsNew.tsx                  # User testimonials
├── 🎨 UI & Demo Components
│   ├── 📄 FavoritesDemo.tsx                    # Favorites demonstration
│   ├── 📄 LanguageToggleDemo.tsx               # Language demo
│   ├── 📄 EventImageWithFallback.tsx           # Image handling
│   └── 📄 WhatsAppWidget.tsx                   # WhatsApp integration
```

### Context Providers (`src/context/`)

```
context/
├── 📄 LanguageContext.tsx                      # Bilingual state management
├── 📄 FavoritesContext.tsx                     # User favorites management
├── 📄 FollowingContext.tsx                     # User connections
├── 📄 CartContext.tsx                          # Shopping cart and saved items
└── 📄 LanguageContext.tsx.backup               # Backup context file
```

### Library Functions (`src/lib/`)

```
lib/
├── 📄 supabase.ts                              # Database client & TypeScript interfaces
├── 📄 auth.ts                                  # Authentication service with demo system
├── 📄 events.ts                                # Event management functions
├── 📄 profile.ts                               # User profile functions
├── 📄 feed.ts                                  # Feed system functions
├── 📄 messaging.ts                             # Chat and messaging
├── 📄 forums.ts                                # Forum system functions
├── 📄 connections.ts                           # User connections
├── 📄 directory.ts                             # Business directory
├── 📄 design.ts                                # Design system utilities
├── 📄 placeholders.ts                          # Placeholder data
├── 📄 profileImages.ts                         # Profile image management
├── 📄 events.ts.backup                         # Backup events file
```

### Static Assets (`public/`)

```
public/
├── 📄 favicon.ico                              # Website favicon
├── 📄 favicon.svg                              # SVG favicon
├── 📄 apple-touch-icon.png                     # Apple touch icon
├── 📄 robots.txt                               # SEO robots file
├── 📄 sitemap.xml                              # SEO sitemap
├── 📄 og-image.jpg                             # Social sharing image
├── 📄 og-image-original.jpg                    # Original social image
├── 🖼️ events/                                  # Event images
│   ├── 📄 README.md                            # Event images documentation
│   ├── 📄 placeholder.svg                      # Event placeholder
│   ├── 📷 art-tour.jpg                         # Cultural event images
│   ├── 📷 book-club.jpg                        # Social event images
│   ├── 📷 ceramic-art.jpg                      # Workshop images
│   ├── 📷 jazz-networking.jpg                  # Networking event images
│   ├── 📷 pottery-wine-1.jpg                   # Adult activity images
│   ├── 📷 wine-tasting.jpg                     # Food & drink images
│   ├── 📷 yoga.jpg                             # Fitness images
│   └── ...                                    # Additional event images
└── 👤 profiles/                                # Profile and user images
    ├── 📄 default-avatar.svg                   # Default user avatar
    ├── 👥 community/                           # Community member photos
    │   ├── 📷 member-1.jpg to member-12.jpg    # Community member images
    ├── 🏪 directory/                           # Business directory images
    │   ├── 📷 ava-davis.jpg                    # Business owner profiles
    │   ├── 📷 chloe-brown.jpg                  # Professional headshots
    │   └── ...                                # Additional business profiles
    ├── 💬 forums/                              # Forum user images
    │   ├── 📷 forum-user-1.jpg to 5.jpg       # Forum participant photos
    └── 🌟 testimonials/                        # Testimonial images
        ├── 📷 emma-johnson.jpg                 # Success story photos
        ├── 📷 jessica-williams.jpg             # Community testimonials
        └── ...                                # Additional testimonial images
```

## 🗄️ Supabase Backend (`supabase/`)

```
supabase/
├── 📄 config.toml                              # Supabase configuration
├── 📄 seed.sql                                 # Database seed data
└── 📁 migrations/                              # Database migrations
    ├── 📄 20250811_001_initial_schema.sql      # Initial database schema
    ├── 📄 20250812_001_messages_schema.sql     # Messaging system schema
    └── 📄 20250814_001_enhanced_groups_safety.sql # Enhanced safety features
```

## 📱 Mobile App (`mobile-app/`)

```
mobile-app/                                     # React Native + Expo (Future Development)
├── 📄 package.json                             # Mobile dependencies
├── 📄 app.json                                 # Expo configuration
├── 📄 babel.config.js                          # Babel configuration
├── 📄 App.js                                   # Main app entry point
├── 📄 README.md                                # Mobile app documentation
└── 📁 src/                                     # Mobile app source
    ├── 📁 constants/                           # Design system constants
    │   └── 📄 Styles.js                        # Portuguese-inspired styles
    ├── 📁 lib/                                 # Mobile utilities
    │   └── 📄 supabase.js                      # Supabase mobile client
    └── 📁 screens/                             # Mobile app screens
        └── 📁 onboarding/                       # User onboarding flow
            ├── 📄 OnboardingFlow.js             # Main onboarding
            ├── 📄 WelcomeStep.js                # Welcome screen
            ├── 📄 EmailStep.js                  # Email collection
            ├── 📄 FirstNameStep.js              # Name collection
            ├── 📄 DateOfBirthStep.js            # Age verification (18+)
            ├── 📄 InterestTagsStep.js           # Interest selection
            ├── 📄 ProfilePictureStep.js         # Profile photo
            └── 📄 SelfieVerificationStep.js     # Identity verification
```

## 🏗️ Architecture Overview

### Technology Stack

#### Frontend (Web App)
- **Next.js 14** with TypeScript and App Router
- **Tailwind CSS** with Portuguese-inspired design system
- **Framer Motion** for animations
- **React Context** for bilingual state management
- **38+ Static Pages** with complete functionality
- **54+ React Components** with advanced features

#### Backend Infrastructure
- **Supabase** (PostgreSQL, Authentication, Storage, Edge Functions)
- **Vercel** deployment with automatic CI/CD
- **Complete database schema** for Portuguese community
- **Row Level Security (RLS)** for data privacy

#### Development Tools
- **ESLint** with Next.js configuration
- **TypeScript** for full type safety
- **PostCSS** and **Autoprefixer** for CSS processing
- **Claude Agent System** for specialized development tasks

### Key Features

#### Portuguese Community Focus
- **Adult-Only Platform**: 18+ community with age-appropriate activities
- **Bilingual Support**: Complete English/Portuguese interface
- **Cultural Authenticity**: Deep Portuguese heritage integration
- **London-Based**: Specific focus on Portuguese speakers in London

#### Advanced Functionality
- **Event Feed System**: Real-time community updates and interactions
- **Save/Cart Functionality**: Complete booking and favorites management
- **Portuguese Business Directory**: Professional networking and listings
- **Community Safety**: Adult-focused moderation and safety features
- **Demo Authentication**: Complete demo system for testing

#### Agent-Powered Development
- **Portuguese Specialists**: Content, events, heritage, safety, growth
- **Technical Specialists**: Development, deployment, quality assurance
- **Automated Workflows**: Intelligent task routing and execution

## 🚀 Development Workflow

### Getting Started
```bash
# Clone repository
git clone https://github.com/giquina/LusoTown.git
cd LusoTown

# Setup web application
cd web-app
npm install
npm run dev
```

### Key Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run export       # Static export
npm run deploy       # Deploy to Vercel
```

### Agent System Usage
```bash
# Invoke Portuguese community specialists
/agents luso-content-agent    # Portuguese content management
/agents luso-events-agent     # Event curation
/agents luso-safety-agent     # Community safety

# Invoke development specialists
/agents bug-finder            # Quality assurance
/agents feature-builder       # Feature development
/agents deploy-manager        # Deployment management
```

## 📊 Production Status

### Current Status: 100% Complete ✅
- **Web Application**: Production-ready with all features implemented
- **Portuguese Community Features**: Complete adult-focused social platform
- **Agent System**: Comprehensive automation and specialist support
- **Documentation**: Complete technical and user documentation
- **Deployment**: One-click Vercel deployment ready

### Key Metrics
- **38+ Static Pages**: All functional with Portuguese community focus
- **54+ React Components**: Advanced community and interaction features
- **16+ Specialized Agents**: Portuguese community and development specialists
- **Complete Bilingual Interface**: English/Portuguese throughout platform
- **Adult-Focused Design**: 18+ community with appropriate features and content

---

**LusoTown London: Your Portuguese Adult Social Calendar (18+)**  
*Unidos pela Língua* (United by Language) - **Living London Adult Life Together**