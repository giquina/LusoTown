# 🌟 AdyaTribe - Community App Platform

A modern, scalable community platform for 30+ single & childfree women with interest-based groups, events, and safe verification.

## 📍 **Project Links**
- **GitHub Repository:** https://github.com/giquina/AdyaTribe
- **Web Platform:** [AdyaTribe.com](https://adyatribe.com) (deployment ready)
- **Codespaces:** [Create Cloud Environment](https://github.com/giquina/AdyaTribe) → Code → Codespaces

## 🚀 Quick Start

```bash
# Clone and setup (if working from fresh environment)
git clone https://github.com/giquina/AdyaTribe.git
cd AdyaTribe

# Setup mobile app (React Native + Expo)
cd mobile-app
npm install
npm start

# Setup web app (Next.js)
cd ../web-app
npm install
npm run dev
```

## 📱 What You're Building

### **Mobile App Features:**
- 🔐 Peanut-style onboarding with selfie verification
- 💬 Interest-based group chats (30+ groups)
- 📅 Events with RSVP & Google Maps integration
- 📸 Photo galleries & pinned resources
- 💳 Stripe subscription tiers (Free/Premium)
- 🔔 Push notifications
- 🛡️ Safety features & reporting

### **Web Platform Features:**
- 🌐 Complete landing page with hero, features, testimonials
- 🔐 Authentication with social login (Google, Apple, Facebook)
- 📖 Success stories and community showcase
- 🛡️ Safety Center with guidelines and reporting
- ⚖️ Legal compliance (Privacy Policy, Terms, Help Center)
- 👥 Community pages and member directory
- 📅 Events system with RSVP functionality
- 💬 Forums and discussion boards
- 👤 Advanced profile management system
- 📱 Admin dashboard for moderation

## 🏗️ Architecture

```
📱 Mobile App (React Native + Expo)
    ↕️
🗄️ Supabase Backend (PostgreSQL + Auth + Storage)
    ↕️  
🌐 Web Platform (Next.js + TypeScript)
    ↕️
💳 Stripe Payments (planned)
```

## 🛠️ Tech Stack

- **Mobile:** React Native 0.76.1 + Expo 52.0.0
- **Backend:** Supabase (PostgreSQL, Auth, Storage, Edge Functions)
- **Web:** Next.js 14 + TypeScript + Tailwind CSS
- **UI Components:** Lucide Icons, Heroicons, Headless UI
- **Payments:** Stripe API (integration ready)
- **Hosting:** Expo (mobile) + Vercel/Static Export (web)

## 📂 Project Structure

```
AdyaTribe/
├── mobile-app/           # React Native + Expo mobile application
│   ├── src/
│   │   ├── screens/      # Onboarding flow (7 complete steps)
│   │   ├── constants/    # Design system and styles
│   │   └── lib/          # Supabase client integration
├── web-app/              # Next.js web platform
│   ├── src/
│   │   ├── app/          # 25+ pages (landing, legal, platform)
│   │   ├── components/   # 20+ specialized components
│   │   └── lib/          # Utility libraries and Supabase client
├── .claude/              # Claude Code agents and configuration
├── docs/                 # Comprehensive documentation
├── supabase/             # Database migrations and schema
└── tasks/                # Project tracking and todos
```

## 🎯 Development Phases

- ✅ **Phase 1:** Foundation Complete - Mobile onboarding (7/7 steps)
- ✅ **Phase 2:** Platform Development Complete - Web app (25+ pages)
- ✅ **Phase 2.5:** Backend Integration Complete - Supabase production ready
- 🔄 **Phase 3:** Production Launch - Mobile-to-database integration
- 📋 **Phase 4:** Real-time features - Chat, notifications, live updates
- 💰 **Phase 5:** Subscription system - Stripe integration
- 🚀 **Phase 6:** Scale & Growth - Advanced features

## 📚 Key Documentation

- **[Development Instructions](DEVELOPMENT_INSTRUCTIONS.md)** - Step-by-step coding guide
- **[Project Status](PROJECT_STATUS.md)** - Current progress tracker
- **[GitHub Codespaces Setup](GITHUB_CODESPACES_SETUP.md)** - Cloud development guide
- **[Claude Assistant Context](CLAUDE_ASSISTANT_CONTEXT.md)** - AI assistant information
- **[Push to GitHub](PUSH_TO_GITHUB.md)** - Initial setup commands

## 🤖 AI Development Team

This project uses Claude Code's agent system with specialized documentation:

**Executable Agents (via Task tool):**
- **`general-purpose`** - Complex research and multi-step tasks
- **`feature-planner`** - Breaking down complex features
- **`onboarding-flow-expert`** - AdyaTribe's 7-step onboarding optimization
- **`design-system-guardian`** - Design consistency across platforms
- **`file-consistency-manager`** - Project organization and duplicate management
- **`react-native-debugger`** - Mobile development and Expo debugging

**Reference Documentation (`.claude/agents/adyatribe/`):**
- Development team knowledge (UI, UX, React Native, Testing, Supabase)
- Deployment team expertise (Vercel, DevOps, GitHub Actions)
- Management and security consultation

## 🚀 Getting Started

### **For Beginners:**
1. Read [DEVELOPMENT_INSTRUCTIONS.md](DEVELOPMENT_INSTRUCTIONS.md)
2. Follow the step-by-step guide
3. Start with basic customizations
4. Build features incrementally

### **Current Status:**
- ✅ Mobile app complete - 7/7 onboarding steps functional
- ✅ Web platform complete - 25+ pages with full feature set
- ✅ Backend infrastructure - Supabase production ready
- ✅ Authentication system - Social login integration
- ✅ Legal compliance - Privacy, Terms, Safety Center
- 🔄 Backend integration - Connecting mobile onboarding to database

### **Next Immediate Steps:**
1. Integrate mobile onboarding with Supabase backend
2. Implement real-time functionality (chat, notifications)
3. Set up Stripe payment system
4. Deploy web platform to production
5. Prepare mobile app for App Store submission

## 🎉 Community Impact

**Platform Features Designed for Real Connection:**
- 🔐 **Safety First:** Identity verification, selfie authentication, moderation
- 👥 **Authentic Community:** 30+ age verification, genuine profiles only
- 🌟 **Inclusive Space:** Celebrating single & childfree life choices
- 🎯 **Interest-Based Matching:** 48 interests across 6 categories
- 📅 **Real-World Events:** From hiking groups to professional networking
- 💬 **Group-Based Chat:** Community focus, not 1:1 dating
- 🏆 **Success Stories:** Already helping women build lasting friendships

## 📞 Support & Contact

- **Issues:** Use GitHub Issues for bug reports
- **Discussions:** GitHub Discussions for feature requests
- **Documentation:** All guides in `/docs` folder
- **AI Assistance:** Use Claude agents in `/claude-agents`

---

**Created with ❤️ for building amazing communities**

*Join us in creating a platform that brings women together and builds lasting connections!*


---

*Last Updated: 2025-01-11*
