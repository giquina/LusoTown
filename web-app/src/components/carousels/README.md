# LusoTown Lusophone Carousel System

A comprehensive, culturally-authentic carousel component system designed specifically for the Portuguese-speaking community platform. Built with React, TypeScript, and Framer Motion for smooth animations.

## 🌟 Features

### Cultural Authenticity
- **All Lusophone Nations**: Supports Portugal, Brazil, Angola, Cape Verde, Mozambique, Guinea-Bissau, São Tomé & Príncipe, and East Timor
- **Country Flag Integration**: Automatic flag emoji rendering for all Portuguese-speaking countries
- **PALOP Recognition**: Specialized support for African Portuguese-speaking countries
- **Portuguese Brand Colors**: Uses LusoTown's authentic Portuguese cultural color palette

### Responsive Design
- **Desktop**: 3 cards per view with 24px spacing
- **Tablet**: 2 cards per view with 20px spacing  
- **Mobile**: 1 card per view with 16px spacing
- **Custom Breakpoints**: Fully configurable responsive behavior

### Accessibility (WCAG 2.1 AA Compliant)
- **Keyboard Navigation**: Full arrow key, space, home, and end key support
- **Screen Reader Support**: Comprehensive ARIA labels and live regions
- **Focus Management**: Proper focus indicators and tab navigation
- **Reduced Motion**: Respects `prefers-reduced-motion` for accessibility
- **High Contrast**: Enhanced visibility in high contrast mode

### Performance Optimizations
- **Lazy Loading**: Components load only when needed
- **Smooth Animations**: 300ms CSS transitions with custom easing
- **Auto-advance**: Configurable auto-play with pause-on-hover
- **Memory Efficient**: Proper cleanup of intervals and event listeners

## 🚀 Quick Start

### Basic Usage

```tsx
import { LusophoneCarousel, WeekendEventsCarousel } from '@/components/carousels'

// Use pre-built specialized carousel
function HomePage() {
  return (
    <WeekendEventsCarousel 
      events={weekendEvents}
      loading={isLoading}
    />
  )
}

// Or build custom carousel
function CustomSection() {
  return (
    <LusophoneCarousel
      items={customItems}
      renderItem={(item) => <CustomCard item={item} />}
      title={{ en: "Featured Content", pt: "Conteúdo em Destaque" }}
      autoAdvance={true}
      autoAdvanceInterval={5000}
    />
  )
}
```

### Pre-built Carousel Components

#### 1. Weekend Events Carousel
```tsx
import { WeekendEventsCarousel } from '@/components/carousels'

<WeekendEventsCarousel 
  events={weekendEvents}
  loading={false}
  className="mb-8"
/>
```

#### 2. PALOP Heritage Carousel
```tsx
import { PALOPHeritageCarousel } from '@/components/carousels'

<PALOPHeritageCarousel 
  heritageItems={palopHeritageData}
  loading={false}
  className="mb-8"
/>
```

#### 3. Weekly Discovery Carousel
```tsx
import { WeeklyDiscoveryCarousel } from '@/components/carousels'

<WeeklyDiscoveryCarousel 
  discoveries={weeklyDiscoveries}
  loading={false}
  className="mb-8"
/>
```

#### 4. Cultural Celebrations Carousel
```tsx
import { CulturalCelebrationsCarousel } from '@/components/carousels'

<CulturalCelebrationsCarousel 
  celebrations={culturalCelebrations}
  featuredOnly={true}
  loading={false}
  className="mb-8"
/>
```

## 📋 TypeScript Interfaces

### Core Item Interface
```typescript
interface LusophoneCarouselItem {
  id: string
  title: {
    en: string
    pt: string
  }
  description?: {
    en: string
    pt: string
  }
  image?: string
  flagEmoji?: string
  countries?: string[]
  category?: string
  priority?: number
}
```

### Weekend Event Item
```typescript
interface WeekendEventItem extends LusophoneCarouselItem {
  date: string
  time: string
  location: string
  price: number
  attendees: number
  maxAttendees: number
  tags: string[]
}
```

### PALOP Heritage Item
```typescript
interface PALOPHeritageItem extends LusophoneCarouselItem {
  country: 'Angola' | 'Cape Verde' | 'Mozambique' | 'Guinea-Bissau' | 'São Tomé and Príncipe' | 'East Timor'
  heritage: {
    music: string[]
    traditions: string[]
    cuisine: string[]
  }
  businessCount: number
}
```

### Weekly Discovery Item
```typescript
interface WeeklyDiscoveryItem extends LusophoneCarouselItem {
  discoveryType: 'restaurant' | 'event' | 'business' | 'cultural-site'
  location: {
    name: string
    area: string
  }
  featured: boolean
  rating?: number
}
```

### Cultural Celebration Item
```typescript
interface CulturalCelebrationItem extends LusophoneCarouselItem {
  celebrationType: 'festival' | 'independence' | 'cultural' | 'religious' | 'music'
  period: {
    en: string
    pt: string
  }
  significance: {
    en: string
    pt: string
  }
  traditionalElements: string[]
}
```

## 🎨 Customization

### Responsive Configuration
```typescript
const customResponsive: ResponsiveConfig = {
  mobile: { itemsPerView: 1, spacing: 16 },
  tablet: { itemsPerView: 2, spacing: 20 },
  desktop: { itemsPerView: 4, spacing: 24 }
}

<LusophoneCarousel 
  responsive={customResponsive}
  // ... other props
/>
```

### Auto-advance Settings
```typescript
<LusophoneCarousel 
  autoAdvance={true}
  autoAdvanceInterval={8000} // 8 seconds
  // ... other props
/>
```

### Custom Card Component
```tsx
function CustomCard({ item }: { item: CustomItem }) {
  const { language } = useLanguage()
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <h3 className="text-xl font-bold mb-2">
        {item.title[language]}
      </h3>
      <p className="text-gray-600">
        {item.description?.[language]}
      </p>
      {/* Custom content */}
    </div>
  )
}

<LusophoneCarousel
  items={customItems}
  renderItem={(item) => <CustomCard item={item} />}
/>
```

## 🎛️ Configuration Options

### Pre-built Configurations
```typescript
import { CAROUSEL_CONFIGS, AUTO_ADVANCE_TIMINGS } from '@/components/carousels'

// Standard 3-2-1 layout
<LusophoneCarousel responsive={CAROUSEL_CONFIGS.standard} />

// Compact 4-3-1 layout
<LusophoneCarousel responsive={CAROUSEL_CONFIGS.compact} />

// Hero 2-1-1 layout for featured content
<LusophoneCarousel responsive={CAROUSEL_CONFIGS.hero} />

// Gallery 5-3-2 layout for images
<LusophoneCarousel responsive={CAROUSEL_CONFIGS.gallery} />

// Auto-advance timings
<LusophoneCarousel autoAdvanceInterval={AUTO_ADVANCE_TIMINGS.slow} />
```

## 🎨 Styling

### CSS Classes
The carousel uses Tailwind CSS classes with custom CSS modules for enhanced styling:

```css
/* Portuguese cultural theming */
.lusophone-carousel {
  --primary-500: #d4a574; /* Heritage gold */
  --primary-600: #b8945e; /* Darker gold */
}

/* Navigation buttons */
.nav-button {
  @apply bg-white/90 hover:bg-white shadow-lg;
  @apply border border-primary-200 hover:border-primary-300;
}

/* Dot indicators */
.dot-indicator {
  @apply bg-primary-300 hover:bg-primary-400;
}

.dot-indicator-active {
  @apply bg-primary-600;
}
```

### Custom Themes
```tsx
// Cultural celebration theme
<div className="carousel-content-celebration">
  <LusophoneCarousel {...props} />
</div>

// PALOP heritage theme
<div className="carousel-content-palop">
  <LusophoneCarousel {...props} />
</div>

// Music heritage theme
<div className="carousel-content-music">
  <LusophoneCarousel {...props} />
</div>
```

## 🔧 Custom Hooks

### useCarouselNavigation
```typescript
import { useCarouselNavigation } from '@/components/carousels'

function CustomCarousel() {
  const items = [...] // your items
  const itemsPerView = 3
  
  const {
    currentIndex,
    isPlaying,
    goToSlide,
    goToNext,
    goToPrevious,
    togglePlay,
    maxIndex
  } = useCarouselNavigation(items, itemsPerView, true, 5000)
  
  return (
    <div>
      <button onClick={goToPrevious}>Previous</button>
      <button onClick={goToNext}>Next</button>
      <button onClick={togglePlay}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  )
}
```

### useResponsive
```typescript
import { useResponsive, DEFAULT_RESPONSIVE } from '@/components/carousels'

function ResponsiveComponent() {
  const { currentConfig, screenSize } = useResponsive(DEFAULT_RESPONSIVE)
  
  return (
    <div>
      <p>Screen: {screenSize}</p>
      <p>Items per view: {currentConfig.itemsPerView}</p>
      <p>Spacing: {currentConfig.spacing}px</p>
    </div>
  )
}
```

### Specialized Hooks
```typescript
// Weekend events management
import { useWeekendEvents } from '@/components/carousels'

function EventsSection() {
  const {
    favorites,
    bookmarks,
    toggleFavorite,
    toggleBookmark,
    handleEventClick
  } = useWeekendEvents()
  
  // Use in your component
}

// PALOP heritage management
import { usePALOPHeritage } from '@/components/carousels'

// Weekly discovery management
import { useWeeklyDiscovery } from '@/components/carousels'

// Cultural celebrations management
import { useCulturalCelebrations } from '@/components/carousels'
```

## 🌐 Internationalization

All text content supports bilingual EN/PT:

```tsx
<LusophoneCarousel 
  title={{
    en: "Portuguese-speaking Community Events",
    pt: "Eventos da Comunidade Lusófona"
  }}
  subtitle={{
    en: "Discover authentic events celebrating Portuguese cultures",
    pt: "Descubra eventos autênticos celebrando as culturas portuguesas"
  }}
  emptyStateMessage={{
    en: "No events available right now",
    pt: "Nenhum evento disponível agora"
  }}
/>
```

## ♿ Accessibility Features

### Keyboard Navigation
- **Arrow Keys**: Navigate between slides
- **Space Bar**: Toggle auto-advance play/pause
- **Home/End**: Jump to first/last slide
- **Tab**: Navigate through interactive elements
- **Enter/Space**: Activate buttons and links

### Screen Reader Support
- **ARIA Labels**: All interactive elements have descriptive labels
- **Live Regions**: Status updates announced to screen readers
- **Role Attributes**: Proper semantic structure for assistive technology
- **Alt Text**: All images include appropriate alternative text

### Motion & Contrast
- **Reduced Motion**: Respects user's motion preferences
- **High Contrast**: Enhanced visibility in high contrast mode
- **Focus Indicators**: Clear visual focus states for all interactive elements

## 🧪 Testing

### Mock Data Creation
```typescript
import { createMockWeekendEvents } from '@/components/carousels'

// Create test data
const mockEvents = createMockWeekendEvents(6)

// Use in tests or development
<WeekendEventsCarousel events={mockEvents} />
```

### Type Guards
```typescript
import { 
  isWeekendEventItem, 
  isPALOPHeritageItem,
  isWeeklyDiscoveryItem,
  isCulturalCelebrationItem 
} from '@/components/carousels'

// Type checking
if (isWeekendEventItem(item)) {
  // TypeScript knows this is a WeekendEventItem
  console.log(item.date, item.time)
}
```

## 📱 Mobile Optimization

### Touch Gestures
- **Swipe Navigation**: Touch-friendly swipe gestures (when enabled)
- **Tap Targets**: Minimum 44px touch targets for accessibility
- **Responsive Images**: Optimized image loading for mobile devices

### Performance
- **Lazy Loading**: Images load only when visible
- **Efficient Animations**: Hardware-accelerated CSS transitions
- **Memory Management**: Proper cleanup of event listeners

## 🎯 Best Practices

### Data Structure
```typescript
// Always include bilingual titles
const carouselItem = {
  id: 'unique-id',
  title: {
    en: 'English Title',
    pt: 'Título Português'
  },
  // ... other properties
}
```

### Error Handling
```tsx
<LusophoneCarousel
  items={events}
  loading={isLoading}
  renderItem={(item) => <EventCard item={item} />}
  emptyStateMessage={{
    en: "No events available",
    pt: "Nenhum evento disponível"
  }}
/>
```

### Performance
```tsx
// Memoize render functions for better performance
const renderEventCard = useCallback((event: WeekendEventItem) => (
  <WeekendEventCard key={event.id} event={event} />
), [])

<LusophoneCarousel
  items={events}
  renderItem={renderEventCard}
/>
```

## 🔄 Updates & Maintenance

The carousel system is designed to be maintainable and extensible:

1. **Add New Card Types**: Extend the base interfaces and create new card components
2. **Custom Responsive Behavior**: Modify or extend responsive configurations
3. **Theme Customization**: Add new CSS classes for different visual themes
4. **Animation Enhancements**: Modify Framer Motion animations in the core component

## 📚 Related Components

- **EventCard**: Individual event card component
- **BusinessCard**: Business directory card component  
- **StreamCard**: Streaming content card component
- **LanguageContext**: Bilingual language management
- **HeritageContext**: Portuguese cultural theming

## 🤝 Contributing

When contributing to the carousel system:

1. Maintain Portuguese-speaking community focus
2. Ensure all text is bilingual (EN/PT)
3. Follow WCAG 2.1 AA accessibility guidelines
4. Test across all breakpoints (375px, 768px, 1024px)
5. Use LusoTown Portuguese brand colors
6. Include appropriate country flag emojis for Lusophone nations

---

**Built with ❤️ for the Portuguese-speaking community in London and across the United Kingdom.**