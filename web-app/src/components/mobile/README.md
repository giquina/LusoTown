# Portuguese Cultural Mobile Design System

A comprehensive mobile-first design system specifically crafted for the Portuguese-speaking community, featuring authentic cultural elements, mobile-optimized interactions, and accessibility-first design patterns.

## 🎯 Overview

This design system provides everything needed to create exceptional mobile experiences for Portuguese-speaking communities in the United Kingdom. It combines modern mobile UX patterns with authentic Portuguese cultural elements, ensuring both usability and cultural authenticity.

## 📱 Core Components

### Design Tokens (`portuguese-mobile-design-tokens.ts`)
- **Colors**: Portuguese flag colors, Azulejo blues, PALOP country colors
- **Typography**: Portuguese-optimized font stacks with diacritical mark support
- **Spacing**: 8px grid system optimized for mobile touch targets
- **Breakpoints**: Mobile-first responsive design (375px, 768px, 1024px+)
- **Cultural Patterns**: Azulejo tiles, nautical themes, Portuguese heritage

### Cultural Components (`PortugueseCulturalMobileComponents.tsx`)

#### `PortugueseHeritageBadge`
Display heritage from all Portuguese-speaking countries:
```tsx
<PortugueseHeritageBadge 
  country="portugal" 
  size="lg" 
  showLabel={true}
  interactive={true}
  onClick={() => console.log('Badge clicked')}
/>
```

**Supported Countries:**
- Portugal 🇵🇹
- Brazil 🇧🇷  
- Cape Verde 🇨🇻
- Angola 🇦🇴
- Mozambique 🇲🇿
- Guinea-Bissau 🇬🇼
- East Timor 🇹🇱
- São Tomé and Príncipe 🇸🇹

#### `PortugueseCulturalCard`
Mobile-optimized card with Portuguese cultural theming:
```tsx
<PortugueseCulturalCard
  title="Festival de Fado em Londres"
  description="Uma noite mágica de fado tradicional português"
  category="event"
  heritage="portugal"
  image="/images/fado-festival.jpg"
  onClick={() => handleEventClick()}
  onShare={() => handleShare()}
  onBookmark={() => handleBookmark()}
/>
```

#### `PortugueseSwipeNavigation`
Horizontal swipe navigation for Portuguese content:
```tsx
<PortugueseSwipeNavigation
  items={portugueseEvents}
  renderItem={(event) => <EventCard event={event} />}
  onItemSelect={(event) => handleSelection(event)}
  title="Próximos Eventos Culturais"
/>
```

### Mobile Interface (`PortugueseMobileInterface.tsx`)

#### `PortugueseMobileNavigation`
Bottom navigation optimized for Portuguese community features:
```tsx
<PortugueseMobileNavigation
  activeRoute="/eventos"
  onNavigate={(route) => router.push(route)}
/>
```

**Navigation Items:**
- Home (Início) - Portuguese community welcome
- Events (Eventos) - Cultural events and celebrations  
- Community (Comunidade) - Portuguese-speaking connections
- Business (Negócios) - Portuguese business directory
- Chat (Conversas) - Community conversations

#### `PortugueseMobileHeader`
Cultural header with Portuguese theming:
```tsx
<PortugueseMobileHeader
  title="Comunidade Lusófona"
  subtitle="Londres & Reino Unido"
  showBack={true}
  showNotifications={true}
  notificationCount={3}
/>
```

#### `PortugueseMobileOnboarding`
Cultural onboarding flow:
```tsx
<PortugueseMobileOnboarding
  isVisible={showOnboarding}
  onComplete={() => setShowOnboarding(false)}
/>
```

### Gesture System (`PortugueseGestureSystem.tsx`)

#### `PortugueseSwipeActions`
Cultural swipe gestures for content interaction:
```tsx
<PortugueseSwipeActions
  onLike={() => console.log('Portuguese cultural appreciation')}
  onShare={() => console.log('Share with community')}
  onBookmark={() => console.log('Save Portuguese content')}
>
  <YourContent />
</PortugueseSwipeActions>
```

**Gesture Patterns:**
- **Right Swipe**: Like/Appreciate Portuguese content (red heart)
- **Left Swipe**: Share with Portuguese community (green share)
- **Double Swipe Right**: Bookmark for later (gold bookmark)
- **Double Swipe Left**: Hide/Not interested (gray eye)

#### `PortugueseDoubleTap`
Double-tap for cultural appreciation:
```tsx
<PortugueseDoubleTap
  onDoubleTap={() => showAppreciation()}
  feedbackType="heart"
>
  <PortugueseContent />
</PortugueseDoubleTap>
```

#### `PortugueseLongPressMenu`
Context menu with Portuguese cultural actions:
```tsx
<PortugueseLongPressMenu
  onLongPress={() => console.log('Context menu opened')}
  menuItems={[
    {
      id: 'directions',
      label: { pt: 'Direções', en: 'Directions' },
      icon: DirectionsIcon,
      action: () => openDirections()
    }
  ]}
>
  <BusinessCard />
</PortugueseLongPressMenu>
```

### Business Directory (`PortugueseMobileBusinessDirectory.tsx`)

#### `MobileBusinessCard`
Portuguese business listing with cultural context:
```tsx
<MobileBusinessCard
  business={portugueseBusiness}
  onSelect={(business) => viewBusiness(business)}
  onBookmark={(id) => saveBusiness(id)}
  onShare={(business) => shareWithCommunity(business)}
  onGetDirections={(business) => openMaps(business)}
  isBookmarked={false}
/>
```

#### `MobileBusinessFilter`
Advanced filtering for Portuguese businesses:
```tsx
<MobileBusinessFilter
  isOpen={showFilter}
  onClose={() => setShowFilter(false)}
  onApplyFilters={(filters) => applyFilters(filters)}
  currentFilters={{
    categories: ['restaurant', 'cultural'],
    heritage: ['portugal', 'brazil'],
    verified: true,
    openNow: true
  }}
/>
```

## 🪝 Hooks & Utilities

### `usePortugueseMobileDesign`
Main design system hook:
```tsx
const { device, theme, utils, isReady } = usePortugueseMobileDesign();

// Device information
console.log(device.isMobile, device.screenSize, device.orientation);

// Portuguese cultural theme
const primaryColor = theme.colors.portuguese.red;
const azulejoPattern = theme.patterns.azulejo;

// Design utilities
const touchTargetClass = utils.touchTarget('recommended'); // 48px minimum
const responsiveText = utils.responsive({ 
  mobile: 'text-base', 
  tablet: 'text-lg', 
  desktop: 'text-xl' 
});
```

### `usePortugueseMobileComponent`
Component-specific optimizations:
```tsx
const { device, theme, utils, optimizations } = usePortugueseMobileComponent('business-card');

// Component-specific styling
const cardStyle = {
  padding: optimizations.contentPadding,
  minHeight: optimizations.touchTargets,
  background: optimizations.culturalPattern
};
```

### `usePortugueseTouchFeedback`
Haptic feedback for Portuguese cultural interactions:
```tsx
const { triggerHaptic, triggerCulturalFeedback } = usePortugueseTouchFeedback();

// Standard haptic feedback
triggerHaptic('medium');

// Cultural-specific feedback patterns
triggerCulturalFeedback('portugal'); // Portuguese rhythm
triggerCulturalFeedback('brazil');   // Samba-like rhythm  
triggerCulturalFeedback('palop');    // African-Portuguese rhythm
```

## 📱 Mobile-First Design Principles

### 1. Touch Target Standards
- **Minimum**: 44px × 44px (WCAG AA compliance)
- **Recommended**: 48px × 48px (comfortable interaction)
- **Premium**: 56px × 56px (luxury Portuguese experience)
- **Hero**: 64px × 64px (primary cultural actions)

### 2. Portuguese Text Optimization
- **Length Compensation**: Portuguese text is 20-30% longer than English
- **Diacritical Support**: Full support for ã, õ, ç, and other Portuguese characters
- **Font Selection**: Inter, Open Sans, and Roboto for optimal Portuguese rendering
- **Line Height**: Increased for Portuguese text readability

### 3. Responsive Breakpoints
```scss
// Mobile Small (iPhone SE, older Android)
@media (min-width: 375px) { }

// Mobile Standard (iPhone 12/13/14, standard Android)
@media (min-width: 414px) { }

// Tablet Portrait (iPad, Android tablets)
@media (min-width: 768px) { }

// Desktop Small (small laptops, iPad landscape)
@media (min-width: 1024px) { }

// Desktop Large (standard desktop)
@media (min-width: 1280px) { }
```

### 4. Cultural Color System
```tsx
// Portuguese Heritage Colors
const colors = {
  portuguese: {
    red: '#DC143C',    // Portuguese flag red
    green: '#228B22',  // Portuguese flag green  
    gold: '#D4A574'    // Portuguese armillary sphere gold
  },
  azulejo: {
    light: '#87CEEB',  // Light ceramic tile blue
    medium: '#4682B4', // Traditional azulejo blue
    deep: '#191970'    // Deep azulejo blue
  },
  palop: {
    brazil: '#009639',     // Brazilian green
    capeVerde: '#003893',  // Cape Verde blue
    angola: '#FF0000',     // Angola red
    mozambique: '#00A550'  // Mozambique green
  }
};
```

## 🎨 Cultural Patterns & Assets

### Azulejo Patterns
Traditional Portuguese ceramic tile patterns for backgrounds:
```tsx
// Geometric azulejo pattern
const geometricAzulejo = PORTUGUESE_CULTURAL_PATTERNS.azulejo.geometric;

// Floral azulejo pattern  
const floralAzulejo = PORTUGUESE_CULTURAL_PATTERNS.azulejo.floral;
```

### Nautical Heritage
Portuguese Age of Discovery themed patterns:
```tsx
// Navigation compass pattern
const compass = PORTUGUESE_CULTURAL_PATTERNS.nautical.compass;

// Maritime rope pattern
const rope = PORTUGUESE_CULTURAL_PATTERNS.nautical.rope;
```

## ♿ Accessibility Features

### WCAG 2.1 AA Compliance
- **Color Contrast**: 4.5:1 minimum for all Portuguese text
- **Focus Indicators**: Visible focus rings with Portuguese heritage colors
- **Touch Targets**: Minimum 44px for all interactive elements
- **Screen Reader**: Proper Portuguese language attributes and ARIA labels

### Portuguese-Specific Accessibility
- **Language Detection**: Automatic Portuguese content identification
- **Character Support**: Full Portuguese diacritical mark compatibility  
- **Cultural Context**: Screen reader announcements in user's preferred language
- **Motor Accessibility**: Generous touch targets for Portuguese elderly users

## 📊 Performance Optimization

### Mobile Performance Standards
- **First Contentful Paint**: < 1.5s on 3G networks
- **Largest Contentful Paint**: < 2.5s on 3G networks
- **Touch Response**: < 100ms for all Portuguese cultural interactions

### Portuguese Content Optimization
- **Image Compression**: Optimized for Portuguese cultural photography
- **Lazy Loading**: Progressive loading of Portuguese community content
- **CDN Integration**: BunnyCDN for Portuguese cultural assets
- **Bundle Splitting**: Separate chunks for Portuguese-specific features

## 🧪 Testing & Validation

### Device Testing Matrix
```tsx
const testDevices = [
  { name: 'iPhone SE', width: 375, priority: 'critical' },
  { name: 'iPhone 12/13', width: 390, priority: 'primary' },
  { name: 'iPad', width: 768, priority: 'secondary' },
  { name: 'Android Standard', width: 414, priority: 'primary' }
];
```

### Portuguese Cultural Testing
- **Text Length Validation**: Test with longest Portuguese translations
- **Heritage Badge Display**: Verify all lusophone country flags render correctly
- **Cultural Pattern Loading**: Ensure azulejo patterns load on slow connections
- **Touch Gesture Recognition**: Test swipe patterns work across devices

## 🚀 Getting Started

1. **Install Dependencies**:
```bash
npm install framer-motion @heroicons/react
```

2. **Import Components**:
```tsx
import { PortugueseCulturalCard } from '@/components/mobile/PortugueseCulturalMobileComponents';
import { usePortugueseMobileDesign } from '@/hooks/usePortugueseMobileDesign';
```

3. **Use Design System Hook**:
```tsx
function YourComponent() {
  const { device, theme, utils } = usePortugueseMobileDesign();
  
  return (
    <div className={utils.responsive({ 
      mobile: 'p-4', 
      tablet: 'p-6', 
      desktop: 'p-8' 
    })}>
      <PortugueseCulturalCard
        title="Seu Evento Português"
        heritage="portugal"
        category="cultural"
      />
    </div>
  );
}
```

## 💡 Best Practices

### 1. Mobile-First Development
- Always start designs at 375px width
- Use progressive enhancement for larger screens
- Test touch interactions on actual devices
- Consider one-handed usage patterns

### 2. Portuguese Cultural Authenticity
- Use appropriate heritage badges for content origin
- Respect Portuguese flag colors and cultural symbols
- Include Portuguese language options for all interfaces
- Test with actual Portuguese community members

### 3. Performance Considerations
- Lazy load Portuguese cultural images
- Use WebP format for Portuguese cultural photography
- Implement proper loading states for Portuguese content
- Cache frequently accessed Portuguese community data

## 📚 Examples

See `PortugueseMobileDesignShowcase.tsx` for comprehensive examples of all components and patterns in action.

## 🔗 Related Documentation

- [Mobile Development Standards](../config/mobile-development-standards.ts)
- [Portuguese Cultural Brand Guidelines](../config/brand.ts)
- [Community Guidelines](../config/community-guidelines.ts)
- [Accessibility Standards](../../docs/accessibility.md)

---

**Built with ❤️ for the Portuguese-speaking community in the United Kingdom**