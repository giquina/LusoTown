/**
 * LusoTown Lusophone Carousel System
 * 
 * A comprehensive carousel component system designed for Portuguese-speaking communities
 * with full cultural authenticity, accessibility compliance, and responsive design.
 * 
 * Features:
 * - Multi-cultural support for all Lusophone nations
 * - Responsive breakpoints: Desktop (3 cards), Tablet (2 cards), Mobile (1 card)
 * - Auto-advance with pause-on-hover functionality
 * - WCAG 2.1 AA accessibility compliance
 * - Keyboard navigation support
 * - TypeScript with comprehensive interfaces
 * - Integration with LusoTown design system
 * 
 * Usage:
 * ```tsx
 * import { LusophoneCarousel, WeekendEventsCarousel } from '@/components/carousels'
 * 
 * // Use pre-built specialized carousels
 * <WeekendEventsCarousel events={weekendEvents} />
 * <PALOPHeritageCarousel heritageItems={heritageData} />
 * 
 * // Or build custom carousels
 * <LusophoneCarousel
 *   items={customItems}
 *   renderItem={(item) => <CustomCard item={item} />}
 *   title={{ en: "Title", pt: "Título" }}
 *   autoAdvance={true}
 * />
 * ```
 */

// Core carousel component and types
export { default as LusophoneCarousel } from './LusophoneCarousel'
export type {
  LusophoneCarouselItem,
  WeekendEventItem,
  PALOPHeritageItem,
  WeeklyDiscoveryItem,
  CulturalCelebrationItem,
  CarouselItemType,
  ResponsiveConfig
} from './LusophoneCarousel'

export {
  DEFAULT_RESPONSIVE,
  useCarouselNavigation,
  useResponsive
} from './LusophoneCarousel'

// Pre-built card components
export {
  WeekendEventCard,
  PALOPHeritageCard,
  WeeklyDiscoveryCard,
  CulturalCelebrationCard,
  getCountryFlag,
  formatPrice
} from './LusophoneCarouselCards'

// Complete carousel implementations with data management
export {
  WeekendEventsCarousel,
  PALOPHeritageCarousel,
  WeeklyDiscoveryCarousel,
  CulturalCelebrationsCarousel,
  useWeekendEvents,
  usePALOPHeritage,
  useWeeklyDiscovery,
  useCulturalCelebrations,
  createMockWeekendEvents
} from './LusophoneCarouselExamples'

/**
 * Common carousel configurations for different use cases
 */
export const CAROUSEL_CONFIGS = {
  // Standard 3-2-1 responsive layout
  standard: {
    mobile: { itemsPerView: 1, spacing: 16 },
    tablet: { itemsPerView: 2, spacing: 20 },
    desktop: { itemsPerView: 3, spacing: 24 }
  },
  
  // Compact layout for smaller content
  compact: {
    mobile: { itemsPerView: 1, spacing: 12 },
    tablet: { itemsPerView: 3, spacing: 16 },
    desktop: { itemsPerView: 4, spacing: 20 }
  },
  
  // Hero layout for featured content
  hero: {
    mobile: { itemsPerView: 1, spacing: 20 },
    tablet: { itemsPerView: 1, spacing: 24 },
    desktop: { itemsPerView: 2, spacing: 32 }
  },
  
  // Gallery layout for image-heavy content
  gallery: {
    mobile: { itemsPerView: 2, spacing: 8 },
    tablet: { itemsPerView: 3, spacing: 12 },
    desktop: { itemsPerView: 5, spacing: 16 }
  }
} as const

/**
 * Auto-advance timing presets
 */
export const AUTO_ADVANCE_TIMINGS = {
  fast: 3000,       // 3 seconds - for quick highlights
  standard: 5000,   // 5 seconds - default timing
  slow: 8000,       // 8 seconds - for reading-heavy content
  showcase: 10000   // 10 seconds - for featured content
} as const

/**
 * Accessibility constants
 */
export const CAROUSEL_ARIA = {
  labels: {
    en: {
      carousel: 'Content carousel',
      previous: 'Previous items',
      next: 'Next items',
      pause: 'Pause carousel',
      play: 'Play carousel',
      goToSlide: 'Go to slide',
      status: 'Showing items'
    },
    pt: {
      carousel: 'Carrossel de conteúdo',
      previous: 'Itens anteriores',
      next: 'Próximos itens',
      pause: 'Pausar carrossel',
      play: 'Reproduzir carrossel',
      goToSlide: 'Ir para slide',
      status: 'Mostrando itens'
    }
  }
} as const

/**
 * Utility function to create carousel title and subtitle objects
 */
export function createCarouselText(en: string, pt: string) {
  return { en, pt }
}

/**
 * Utility function to validate carousel items
 */
export function validateCarouselItems<T extends { id: string; title: { en: string; pt: string } }>(
  items: T[]
): boolean {
  return items.every(item => 
    item.id && 
    item.title && 
    typeof item.title.en === 'string' && 
    typeof item.title.pt === 'string'
  )
}

/**
 * Common responsive configurations by screen size
 */
export function getResponsiveConfig(screenSize: 'mobile' | 'tablet' | 'desktop') {
  return CAROUSEL_CONFIGS.standard[screenSize]
}

/**
 * Get auto-advance interval by content type
 */
export function getAutoAdvanceInterval(contentType: 'event' | 'discovery' | 'heritage' | 'celebration') {
  switch (contentType) {
    case 'event':
      return AUTO_ADVANCE_TIMINGS.standard
    case 'discovery':
      return AUTO_ADVANCE_TIMINGS.fast
    case 'heritage':
      return AUTO_ADVANCE_TIMINGS.slow
    case 'celebration':
      return AUTO_ADVANCE_TIMINGS.showcase
    default:
      return AUTO_ADVANCE_TIMINGS.standard
  }
}

/**
 * Type guard functions
 */
export function isWeekendEventItem(item: any): item is WeekendEventItem {
  return item && typeof item.date === 'string' && typeof item.time === 'string'
}

export function isPALOPHeritageItem(item: any): item is PALOPHeritageItem {
  return item && typeof item.country === 'string' && item.heritage
}

export function isWeeklyDiscoveryItem(item: any): item is WeeklyDiscoveryItem {
  return item && typeof item.discoveryType === 'string' && item.location
}

export function isCulturalCelebrationItem(item: any): item is CulturalCelebrationItem {
  return item && typeof item.celebrationType === 'string' && item.period
}