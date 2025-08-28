# LusoTown Carousel System - Developer Documentation

**Updated: 2025-08-28** | **Status**: Production Ready | **Implementation**: Complete

## 📋 Current Implementation Status

### ✅ **ACTIVE CAROUSEL DEPLOYMENTS**

#### **Pages WITH Active Carousels**
1. **Events Page** (`/src/app/events/page.tsx`)
   - **Cultural Celebrations Carousel**: Lines 116-186
   - **Features**: 8 PALOP country showcases, auto-advance (6s), swipe gestures
   - **Data Source**: `LUSOPHONE_CELEBRATIONS` config
   - **Mobile Optimized**: Touch targets, pull-to-refresh, haptic feedback disabled

2. **About Page** (`/src/app/about/page.tsx`)  
   - **Multiple Carousels**: Lines 22, 725, 836
   - **Features**: Testimonials, heritage displays, community stories
   - **Import**: Uses `CAROUSEL_CONFIGS` and `AUTO_ADVANCE_TIMINGS`

3. **Business Directory** (`/src/app/business-directory/page.tsx`)
   - **Featured Businesses Carousel**: Lines 52-53, 1211+
   - **PALOP Business Excellence**: Lines 1445+
   - **Geographic Distribution**: Lines 1550+
   - **Features**: Premium badges, cultural authenticity, location-based

4. **Students Page** (`/src/app/students/page.tsx`)
   - **University Partnerships**: Cultural compatibility features
   - **Portuguese student community integration**

#### **Pages WITHOUT Carousels**
1. **Homepage** (`/src/app/page.tsx`)
   - **Status**: NO active carousels (strategic decision)
   - **Reason**: Streamlined hero experience, faster loading
   - **Components**: Dynamic loading of other components only

### 🎨 **Core Carousel Architecture**

#### **Main Component** (`/src/components/carousels/LusophoneCarousel.tsx`)
- **Size**: 1,100+ lines of comprehensive implementation
- **Features**: Mobile-first, PWA support, accessibility, performance monitoring
- **Cultural Integration**: Portuguese heritage colors, PALOP country support
- **Responsive**: 3-2-1 layout (desktop-tablet-mobile)

#### **Key Technical Features**
```typescript
// Core interfaces and types
interface LusophoneCarouselItem {
  id: string
  title: { en: string; pt: string }
  description?: { en: string; pt: string }
  image?: string
  flagEmoji?: string
  countries?: string[]
  category?: string
  priority?: number
}

// Mobile optimization settings
interface MobileSettings {
  enableSwipeGestures: boolean
  enableHapticFeedback: boolean          // Disabled for better UX
  enableMomentumScrolling: boolean
  enablePullToRefresh: boolean
  touchThreshold: number                 // 44px WCAG compliance
  swipeVelocityThreshold: number
  enableLazyLoading: boolean
  preloadDistance: number                // 2 items ahead
}
```

## 📱 **Mobile Functionality Status**

### ✅ **CONFIRMED WORKING**
- **Swipe Gestures**: Left/right navigation with velocity thresholds
- **Touch Targets**: 44px minimum for WCAG 2.1 AA compliance  
- **Responsive Adaptation**: Auto-adjusts items per view based on screen size
- **Portuguese Cultural Gestures**: Specialized pattern detection
- **Performance Monitoring**: Real-time metrics for mobile optimization
- **Lazy Loading**: 2-item preload distance for performance
- **Accessibility**: Screen reader support, keyboard navigation

### 🔧 **Mobile Implementation Details**
```typescript
// Default mobile settings (optimized for Portuguese community)
const DEFAULT_MOBILE_SETTINGS: MobileSettings = {
  enableSwipeGestures: true,
  enableHapticFeedback: false,           // Disabled for professional UX
  enableMomentumScrolling: true,
  enablePullToRefresh: true,
  touchThreshold: 44,                    // WCAG 2.1 AA minimum
  swipeVelocityThreshold: 0.3,
  enableLazyLoading: true,
  preloadDistance: 2
}

// Responsive breakpoints
const DEFAULT_RESPONSIVE: ResponsiveConfig = {
  mobile: { itemsPerView: 1, spacing: 16 },    // 375px
  tablet: { itemsPerView: 2, spacing: 20 },    // 768px  
  desktop: { itemsPerView: 3, spacing: 24 }    // 1024px
}
```

## 🔧 **Developer Implementation Guide**

### **Adding Carousels to New Pages**

#### **1. Basic Implementation**
```tsx
import { LusophoneCarousel } from '@/components/carousels'

// Simple cultural content carousel
<LusophoneCarousel
  items={culturalData}
  title={{
    en: "Portuguese Community Features",
    pt: "Recursos da Comunidade Portuguesa"
  }}
  renderItem={(item) => <CommunityCard item={item} />}
  autoAdvance={true}
  autoAdvanceInterval={6000}
/>
```

#### **2. Mobile-Optimized Implementation**
```tsx
<LusophoneCarousel
  items={eventData}
  renderItem={(item) => <EventCard item={item} />}
  mobileSettings={{
    enableSwipeGestures: true,
    enablePullToRefresh: true,
    enableLazyLoading: true,
    preloadDistance: 2
  }}
  enablePortugueseGestures={true}
  enableAccessibilityAnnouncements={true}
  onSwipeGesture={(direction, item) => {
    // Handle Portuguese cultural gesture patterns
  }}
/>
```

### **Configuration Options**

#### **Pre-built Configurations**
```typescript
import { CAROUSEL_CONFIGS, AUTO_ADVANCE_TIMINGS } from '@/components/carousels'

// Standard 3-2-1 layout
<LusophoneCarousel responsive={CAROUSEL_CONFIGS.standard} />

// Compact 4-3-1 layout  
<LusophoneCarousel responsive={CAROUSEL_CONFIGS.compact} />

// Hero 2-1-1 layout for featured content
<LusophoneCarousel responsive={CAROUSEL_CONFIGS.hero} />

// Timing configurations
<LusophoneCarousel autoAdvanceInterval={AUTO_ADVANCE_TIMINGS.slow} />
```

### **Restoring Homepage Carousels (If Needed)**

**Current Status**: Homepage intentionally has NO carousels for streamlined experience.

**To Re-enable** (if required):
```tsx
// 1. Add imports to /src/app/page.tsx
import { LusophoneCarousel } from '@/components/carousels'
import { LUSOPHONE_CELEBRATIONS } from '@/config/lusophone-celebrations'

// 2. Insert carousel section after hero
<section className="container mx-auto px-4 py-12">
  <LusophoneCarousel
    items={LUSOPHONE_CELEBRATIONS.slice(0, 6)}
    title={{
      en: "Portuguese Community Highlights",
      pt: "Destaques da Comunidade Portuguesa"
    }}
    renderItem={(item) => <CelebrationCard item={item} />}
    autoAdvance={true}
    showControls={true}
    responsive={CAROUSEL_CONFIGS.hero}
  />
</section>
```

## 🎯 **Cultural Integration Standards**

### **Required for All Carousels**
- ✅ **Bilingual Support**: EN/PT titles and descriptions
- ✅ **Portuguese Brand Colors**: Import from `/src/config/brand.ts`
- ✅ **Flag Emojis**: PALOP country representation (🇵🇹🇧🇷🇨🇻🇦🇴🇲🇿🇬🇼🇸🇹🇹🇱)
- ✅ **Cultural Authenticity**: Portuguese-speaking community focus
- ✅ **Mobile-First**: UK Portuguese diaspora mobile usage patterns

### **Data Source Standards**
```typescript
// ❌ NEVER: Hardcoded carousel data
const items = [{ title: "Fado Night", ... }]

// ✅ ALWAYS: Config-based data
import { LUSOPHONE_CELEBRATIONS } from '@/config/lusophone-celebrations'
const items = LUSOPHONE_CELEBRATIONS
```

## 🚨 **Common Issues & Solutions**

### **Issue**: Carousels not displaying
**Solution**: Verify component imports and data sources
```bash
# Check if carousel exports properly
grep -r "LusophoneCarousel" src/components/index.ts

# Verify data config imports
grep -r "LUSOPHONE_CELEBRATIONS" src/config/
```

### **Issue**: Mobile gestures not working
**Solution**: Enable mobile settings explicitly
```typescript
mobileSettings={{
  enableSwipeGestures: true,
  touchThreshold: 44,
  swipeVelocityThreshold: 0.3
}}
```

### **Issue**: Poor performance on mobile
**Solution**: Enable lazy loading and optimize preload distance
```typescript
mobileSettings={{
  enableLazyLoading: true,
  preloadDistance: 2
}}
```

### **Issue**: Accessibility complaints
**Solution**: Ensure proper ARIA labels and voice announcements
```typescript
enableAccessibilityAnnouncements={true}
// Automatically provides Portuguese/English voice feedback
```

## 📊 **Performance Metrics**

### **Current Implementation Performance**
- **Component Size**: 1,100+ lines (comprehensive feature set)
- **Bundle Impact**: Optimized with lazy loading and code splitting
- **Mobile Performance**: Real-time monitoring with performance metrics
- **Accessibility**: WCAG 2.1 AA compliant
- **Touch Targets**: 44px minimum for all interactive elements

### **Build Integration**
```bash
# Verify carousel system in build
cd web-app
npm run build                 # Should complete without carousel errors
npm run audit:hardcoding      # Should pass with config-based data
```

## 📚 **Related Documentation**

- **Component README**: `/src/components/carousels/README.md` (533 lines)
- **Cultural Config**: `/src/config/lusophone-celebrations.ts`
- **Brand Colors**: `/src/config/brand.ts`
- **Mobile Hooks**: `/src/hooks/useMediaQuery.ts`

## ✅ **Deployment Verification**

### **Production Checklist**
- [x] **Events Page**: Cultural celebrations carousel active
- [x] **About Page**: Multiple carousels functional  
- [x] **Business Directory**: Featured businesses carousel working
- [x] **Students Page**: University partnerships carousel operational
- [x] **Mobile Responsive**: All breakpoints tested (375px, 768px, 1024px)
- [x] **Portuguese Cultural Context**: Maintained throughout
- [x] **Accessibility**: Screen readers and keyboard navigation working
- [x] **Performance**: Lazy loading and mobile optimizations active

---

**Status**: ✅ **PRODUCTION READY** | **Active on 4 pages** | **Homepage intentionally carousel-free** | **Mobile-optimized for UK Portuguese diaspora**

**Last Updated**: 2025-08-28
**Platform**: https://web-99kxh0sku-giquinas-projects.vercel.app
**Demo Access**: demo@lusotown.com / LusoTown2025!