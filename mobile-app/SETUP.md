# LusoTown Mobile App Development Setup

## 🚀 Complete React Native Development Environment

### Prerequisites

#### Node.js & Package Manager
```bash
# Install Node.js 22.x (required for mobile-app engines)
node --version  # Should be v22.x
npm --version   # Should be v9.x+

# Alternative: Use nvm
nvm install 22
nvm use 22
```

#### Expo CLI & EAS CLI
```bash
# Install Expo CLI globally
npm install -g @expo/cli@latest

# Install EAS CLI for builds
npm install -g eas-cli@latest

# Verify installations
expo --version
eas --version
```

### iOS Development Setup

#### Xcode Installation
```bash
# Install Xcode from App Store (latest version)
# Accept Xcode license
sudo xcodebuild -license accept

# Install Xcode Command Line Tools
xcode-select --install

# Verify iOS Simulator
open -a Simulator
```

#### iOS Simulator Configuration
```bash
# List available simulators
xcrun simctl list devices

# Boot iPhone 15 Pro (recommended for LusoTown testing)
xcrun simctl boot "iPhone 15 Pro"

# Install iOS deployment tools
sudo gem install cocoapods
pod --version
```

### Android Development Setup

#### Android Studio & SDK
```bash
# Download Android Studio from: https://developer.android.com/studio
# During installation, ensure these components are selected:
# - Android SDK
# - Android SDK Platform
# - Android Virtual Device

# Set ANDROID_HOME environment variable
export ANDROID_HOME=~/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/tools/bin

# Add to ~/.zshrc or ~/.bashrc for persistence
echo 'export ANDROID_HOME=~/Library/Android/sdk' >> ~/.zshrc
echo 'export PATH=$PATH:$ANDROID_HOME/emulator' >> ~/.zshrc
echo 'export PATH=$PATH:$ANDROID_HOME/platform-tools' >> ~/.zshrc
```

#### Android Emulator Setup
```bash
# Create AVD (Android Virtual Device) for Portuguese community testing
# Recommended: Pixel 7 Pro with API Level 34

# List available AVDs
emulator -list-avds

# Start emulator
emulator -avd Pixel_7_Pro_API_34
```

### Project Setup

#### 1. Clone & Install Dependencies
```bash
# From repository root
cd /workspaces/LusoTown
npm install

# Install mobile app dependencies
cd mobile-app
npm install

# Install iOS pods (macOS only)
cd ios && pod install && cd ..
```

#### 2. Environment Configuration
```bash
# Create environment file
cp .env.example .env.local

# Configure required variables
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
EXPO_PUBLIC_API_URL=https://lusotown.com/api
EXPO_PUBLIC_STREAMING_URL=http://localhost:8080

# Optional: EAS Project ID (for builds)
EAS_PROJECT_ID=550e8400-e29b-41d4-a716-446655440000
```

#### 3. Development Server Start
```bash
# Start Expo development server
npm start

# Or with specific platforms
npm run ios      # iOS Simulator
npm run android  # Android Emulator  
npm run web      # Web browser

# Clear cache if needed
npm run start:clear
```

### Build System Configuration

#### EAS Build Setup
```bash
# Login to Expo account
eas login

# Initialize EAS project
eas build:configure

# Test development build
npm run build:preview

# Production builds
npm run build:ios      # iOS build
npm run build:android  # Android build
npm run build:all      # Both platforms
```

#### Local Development Builds
```bash
# Prebuild for local development
npm run prebuild

# Clean prebuild
npm run prebuild:clean

# iOS local build (macOS only)
npx expo run:ios

# Android local build  
npx expo run:android
```

## 🇵🇹 Portuguese Cultural Integration

### Bilingual Content System
```bash
# Translation files location
src/i18n/
├── index.ts     # i18n configuration
├── en.json      # English translations
└── pt.json      # Portuguese translations

# Test language switching
# Portuguese content displays automatically based on:
# 1. Device language (pt-* locales)
# 2. User preference (stored in AsyncStorage)
```

### Portuguese Heritage Design System
```bash
# Design system location
src/design-system/
├── tokens/               # Portuguese color tokens
├── components/           # Cultural components
└── patterns/            # Portuguese UX patterns

# Portuguese colors available:
# - Colors.red (Portuguese flag red)
# - Colors.green (Portuguese flag green)  
# - Colors.gold (Portuguese heritage gold)
# - Colors.azulejo (Portuguese tile blue)
```

### Cultural Content Testing
```bash
# Test Portuguese features
npm run test:portuguese

# Test cultural accessibility
npm run test:accessibility

# Performance with Portuguese content
npm run test:performance
```

## 📱 Mobile-First Development

### Responsive Testing
```bash
# Test on different screen sizes:
# - iPhone SE (375px) - Portuguese community base
# - iPhone 14 Pro (414px) - Primary experience
# - iPad (768px) - Secondary priority

# Device testing commands
npm run mobile:ios     # iOS testing
npm run mobile:android # Android testing
npm run mobile:web     # Web responsive testing
```

### Touch Interface Validation
```bash
# Ensure minimum touch targets (44px) for:
# - Navigation buttons with Portuguese labels
# - Form inputs with Portuguese text
# - Cultural event cards
# - Business directory listings

# Run mobile UX tests
npm run test:mobile
```

### Portuguese Text Optimization
```bash
# Portuguese text is ~20-30% longer than English
# Test layouts handle longer Portuguese labels:
# - "Events" → "Eventos" (+17%)
# - "Join Event" → "Participar no Evento" (+90%)
# - "Phone Number" → "Número de Telefone" (+54%)
```

## 🧪 Testing Strategy

### Unit & Integration Testing
```bash
# Run all tests
npm test

# Specific test suites
npm run test:unit            # Unit tests
npm run test:integration     # Integration tests
npm run test:portuguese      # Portuguese content tests
npm run test:performance     # Performance tests
npm run test:accessibility   # Accessibility tests

# Watch mode for development
npm run test:watch

# Coverage reports
npm run test:coverage
```

### End-to-End Testing (Detox)
```bash
# Build for E2E testing
npm run build:ios
npm run build:android

# Run E2E tests
npm run test:e2e

# Specific E2E flows
npm run test:e2e:auth        # Authentication flow
npm run test:e2e:onboarding  # Portuguese onboarding
npm run test:e2e:events      # Event discovery
```

## 🚀 Deployment

### Development Deployment
```bash
# Create development build
eas build --profile development

# Install on device via QR code
# Or direct install: eas build --profile development --local
```

### Preview Deployment
```bash
# Create preview build for testing
eas build --profile preview

# Submit for internal testing
eas submit --profile preview
```

### Production Deployment
```bash
# Production builds
eas build --profile production

# Submit to App Store & Play Store
eas submit --profile production

# Over-the-air updates
eas update --branch production
```

## 🛠 Development Tools

### VS Code Extensions
```bash
# Recommended extensions:
# - React Native Tools
# - TypeScript Importer
# - ES7+ React/Redux/React-Native snippets
# - Prettier
# - ESLint
# - i18n Ally (for translations)
```

### Debugging Tools
```bash
# React Native Debugger
npm install -g react-native-debugger

# Flipper (React Native debugging)
# Download from: https://fbflipper.com/

# Expo Developer Tools
# Available at: http://localhost:19002 when running expo start
```

### Performance Monitoring
```bash
# Built-in performance utilities
src/utils/performance.ts     # Performance optimization
src/components/performance/  # Performance components

# Analyze performance
npm run performance:analyze
```

## 📁 Project Structure

```
mobile-app/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # Base UI components
│   │   ├── cultural/       # Portuguese cultural components
│   │   └── optimized/      # Performance-optimized components
│   ├── screens/            # Screen components
│   │   ├── auth/           # Authentication screens
│   │   ├── main/           # Main app screens
│   │   ├── onboarding/     # Portuguese cultural onboarding
│   │   └── modals/         # Modal screens
│   ├── navigation/         # React Navigation setup
│   ├── design-system/      # Portuguese design system
│   │   ├── tokens/         # Design tokens
│   │   ├── components/     # Design system components
│   │   └── patterns/       # UX patterns
│   ├── i18n/              # Bilingual translations
│   ├── config/            # Shared configuration
│   ├── utils/             # Utility functions
│   ├── lib/               # Business logic
│   ├── types/             # TypeScript types
│   └── constants/         # App constants
├── __tests__/             # Test suites
│   ├── unit/              # Unit tests
│   ├── integration/       # Integration tests
│   ├── portuguese/        # Portuguese-specific tests
│   ├── performance/       # Performance tests
│   ├── accessibility/     # Accessibility tests
│   └── e2e/              # End-to-end tests
├── assets/               # Static assets
├── app.config.js         # Expo configuration
├── eas.json             # EAS Build configuration
├── package.json         # Dependencies & scripts
└── tsconfig.json        # TypeScript configuration
```

## 🔧 Common Issues & Solutions

### Port Conflicts
```bash
# If port 19000/19001 is in use
lsof -ti:19000 | xargs kill -9
lsof -ti:19001 | xargs kill -9

# Or use different port
expo start --port 19002
```

### Cache Issues
```bash
# Clear all caches
npm run start:clear
expo r -c
rm -rf node_modules && npm install
```

### iOS Build Issues
```bash
# Clean iOS build
cd ios
rm -rf build/
pod deintegrate && pod install
cd ..
npm run ios
```

### Android Build Issues
```bash
# Clean Android build
cd android
./gradlew clean
cd ..
npm run android
```

### Metro Bundle Issues
```bash
# Reset Metro cache
npm run start -- --reset-cache
rm -rf /tmp/metro-*
```

## 📚 Portuguese Community Development

### Cultural Guidelines
- Use "Portuguese-speaking community" (not "Portuguese community")
- Reference "United Kingdom" (not just "London")
- Include all Lusophone nations (Portugal, Brazil, Cape Verde, Angola, etc.)
- Test with Portuguese text lengths (20-30% longer than English)

### User Experience Priorities
1. **Mobile-First**: Portuguese-speaking community is mobile-heavy
2. **Cultural Authenticity**: Portuguese flag colors and cultural elements
3. **Accessibility**: WCAG 2.1 AA compliance for all users
4. **Performance**: Optimized for limited data plans

### Testing Checklist
- [ ] Portuguese text fits in all UI elements
- [ ] Touch targets are minimum 44px
- [ ] Works on 375px mobile screens
- [ ] Cultural colors display correctly
- [ ] Bilingual navigation functions
- [ ] Portuguese keyboard input supported

## 🚀 Getting Started Quickly

```bash
# Quick setup (from repository root)
cd mobile-app
npm install
npm start

# Open iOS Simulator
i

# Open Android Emulator  
a

# Open in web browser
w
```

---

**🇵🇹 LusoTown Mobile - Connecting the Portuguese-speaking community across the United Kingdom**