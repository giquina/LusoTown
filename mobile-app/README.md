# LusoTown Mobile App 🇵🇹

A React Native Expo app for the LusoTown Portuguese-speaking community platform in London.

## Development Status

**Current Implementation:** Complete onboarding flow with Supabase integration

### ✅ Completed Features:
- **Step 1:** First name collection with validation
- **Step 2:** Age verification (30+) with date of birth validation  
- **Step 3:** Email validation with real-time feedback
- **Step 4:** Profile picture upload system with camera/gallery selection
- **Step 5:** Selfie verification system for identity verification
- **Step 6:** Portuguese cultural interest selection screen
- **Step 7:** Welcome screen with Supabase backend integration
- Portuguese brand colors and design system
- Supabase backend integration with user creation
- Profile picture and verification selfie uploads
- User interests tracking
- Mobile-first design with enhanced touch targets

### 🔄 Integration Status:
- ✅ Supabase authentication and user creation
- ✅ Profile picture upload to Supabase storage
- ✅ Verification selfie upload (private storage)
- ✅ User interests saved to database
- ✅ Complete user profile creation
- ⏳ Main app navigation (post-onboarding)
- ⏳ Portuguese/English language switching

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
- UK travel with Portuguese cultural context
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
