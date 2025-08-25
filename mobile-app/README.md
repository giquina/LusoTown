# 🇵🇹 LusoTown Mobile - Portuguese-speaking Community App

Welcome to LusoTown Mobile, the React Native app for connecting Portuguese-speaking communities across the United Kingdom.

## 🚀 Development Status

**Current Implementation:** Complete foundational architecture with Portuguese cultural authenticity

### ✅ Completed Core Foundation:
- **Portuguese Cultural Design System**: Flag colors (Red, Green, Gold)
- **Navigation System**: Bottom tabs with Portuguese cultural icons
- **Heritage Selection**: All 8 Lusophone countries supported
- **Bilingual i18n**: Complete English/Portuguese translation system
- **TypeScript Integration**: Full type safety for Portuguese cultural data
- **Supabase Integration**: Portuguese community API functions
- **Onboarding Flow**: Portuguese cultural heritage selection
- **Home Screen**: Cultural dashboard with events, matches, businesses
- **Portuguese Utilities**: Cultural compatibility, formatting functions
- **Configuration System**: Centralized Portuguese cultural settings

### ✅ Portuguese Cultural Features:
- **Heritage Countries**: Portugal, Brazil, Cape Verde, Angola, Mozambique, Guinea-Bissau, East Timor, São Tomé
- **Cultural Interests**: Food, Fado, Football, Festivals, Business, Arts, Travel, Family, Nightlife, Education
- **Portuguese Flag Colors**: Authentic red (#FF0000), green (#00A859), gold (#FFD700) palette
- **Cultural Authentication**: Portuguese-first design with cultural context
- **Bilingual System**: Complete PT/EN translations with cultural nuances

## Quick Start

```bash
# Install dependencies
cd mobile-app
npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Start development server
npm start
```

Then scan the QR code with Expo Go app on your phone.

## Tech Stack

- **Framework:** React Native with Expo (~52.0.0)
- **Navigation:** React Navigation 7.0
- **Camera:** Expo Camera & Image Picker
- **Backend:** Supabase (PostgreSQL + Storage + Auth)
- **Styling:** Portuguese design system with cultural colors
- **State:** React Context + local storage

## Portuguese-speaking community Focus

The app is designed specifically for Portuguese speakers in London, featuring:

### 🎨 Cultural Design
- Portuguese flag-inspired color palette (Atlantic blue, hope green, golden sun)
- Cultural emojis and Portuguese phrases
- Mobile-first responsive design

### 🇵🇹 Portuguese Interests
- Fado music and Portuguese festivals
- Portuguese cuisine (pastéis de nata, bacalhau)
- Azores and Madeira culture
- Portuguese wine and cooking
- Portugal travel and cultural heritage

### 🏙️ London Integration  
- Portuguese-speaking community events in London
- Portuguese restaurants and businesses
- United Kingdom travel with Portuguese cultural context
- London walks and Portuguese meetups

## Environment Variables

Create `.env.local` with:
```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## App Flow

1. **Name Collection:** Personal introduction to Portuguese-speaking community
2. **Age Verification:** Ensures 30+ community focus with Portuguese cultural messaging  
3. **Email Validation:** Real-time validation for Portuguese-speaking community updates
4. **Profile Picture:** Camera/gallery selection with community guidelines
5. **Identity Verification:** Selfie verification for community safety
6. **Cultural Interests:** Portuguese-focused activities and cultural interests
7. **Welcome & Signup:** Complete Supabase integration with profile creation

## Portuguese Cultural Features

### Interest Categories:
- **Portuguese Culture:** Fado, festivals, cuisine, history, language, regional cultures
- **Fitness & Wellness:** London walks, yoga, football (Portuguese passion)
- **Food & Drink:** Portuguese wine, pastéis de nata, bacalhau, Portuguese restaurants
- **Travel & Adventure:** Portugal visits, Azores, Madeira, European travel
- **Social & Entertainment:** Portuguese-speaking community events and networking

### Community Guidelines:
- **Seja Gentil** - Be kind and respectful  
- **Stay Safe** - Meet in public places
- **Authentic Connections** - Build genuine Portuguese-speaking friendships
- **Celebrate Culture** - Share and preserve Portuguese traditions

## File Structure

```
mobile-app/
├── src/
│   ├── screens/onboarding/     # Complete 7-step onboarding flow
│   ├── constants/Styles.js     # Portuguese design system
│   └── lib/supabase.js        # Backend integration
├── app.config.js              # Expo configuration
└── README.md                  # This file
```

## Next Steps

- Main app navigation implementation
- Portuguese/English language switching
- Events and community features integration
- Real-time messaging with Portuguese-speaking community
- Cultural event discovery and booking

---

*Last Updated: 2025-08-18*
