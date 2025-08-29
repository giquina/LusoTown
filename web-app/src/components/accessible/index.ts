// Accessibility-enhanced components for Portuguese-speaking community
// WCAG 2.1 AA compliant with Portuguese cultural considerations

// Core enhanced components
export { default as AccessibilityEnhancedBusinessDirectory } from './AccessibilityEnhancedBusinessDirectory';
export { default as AccessibilityEnhancedBusinessCard } from './AccessibilityEnhancedBusinessCard';
export { default as AccessibilityEnhancedEventCard } from './AccessibilityEnhancedEventCard';
export { default as AccessibilityEnhancedNavigation } from './AccessibilityEnhancedNavigation';

// Modal components
export { 
  default as AccessibilityEnhancedModal,
  PortugueseBusinessModal,
  PortugueseEventModal,
  PortugueseCulturalFormModal
} from './AccessibilityEnhancedModal';

// Utilities and hooks
export {
  useKeyboardNavigation,
  useScreenReaderAnnouncements,
  usePortugueseTouchTargets,
  usePortugueseAriaLabels,
  useFocusManagement,
  usePortugueseColorContrast,
  usePortugueseTextLength,
  SkipLinks,
  PortugueseAccessibilityUtils
} from './AccessibilityUtilities';

// Types
export type { AccessibilitySettings } from './AccessibilityUtilities';

// Enhanced component props types
export interface PortugueseAccessibilityProps {
  /** Enhanced ARIA labels for Portuguese context */
  'aria-label'?: string;
  /** Screen reader descriptions in Portuguese */
  'aria-describedby'?: string;
  /** Role specification for Portuguese cultural content */
  role?: string;
  /** Keyboard navigation support */
  tabIndex?: number;
  /** Touch target enhancement for Portuguese mobile users */
  touchEnhanced?: boolean;
  /** Cultural context preservation */
  culturalContext?: boolean;
}

// Accessibility compliance checklist
export const PORTUGUESE_ACCESSIBILITY_CHECKLIST = {
  // WCAG 2.1 AA Requirements
  colorContrast: {
    requirement: '4.5:1 minimum contrast ratio',
    status: 'compliant',
    portugueseColors: 'Portuguese heritage colors validated'
  },
  
  touchTargets: {
    requirement: '44x44px minimum (mobile), 56x56px recommended',
    status: 'enhanced',
    implementation: '56px minimum for Portuguese mobile-heavy community'
  },
  
  keyboardNavigation: {
    requirement: 'All interactive elements keyboard accessible',
    status: 'enhanced',
    features: [
      'Arrow key navigation',
      'Enter/Space activation',
      'Escape key cancellation',
      'Tab order management',
      'Focus trap in modals',
      'Skip links for efficiency'
    ]
  },
  
  screenReader: {
    requirement: 'Comprehensive ARIA labels and descriptions',
    status: 'enhanced',
    features: [
      'Bilingual EN/PT ARIA labels',
      'Cultural context in descriptions',
      'Portuguese business information',
      'Event availability announcements',
      'Navigation shortcuts',
      'Form validation messages'
    ]
  },
  
  // Portuguese community specific enhancements
  culturalConsiderations: {
    textExpansion: {
      requirement: 'Account for Portuguese text being 20-30% longer',
      status: 'implemented',
      solution: 'Dynamic button sizing and overflow handling'
    },
    
    specialCharacters: {
      requirement: 'Support Portuguese accents (ã, ç, õ, etc.)',
      status: 'implemented',
      solution: 'Proper font rendering and input validation'
    },
    
    mobileFirst: {
      requirement: 'Portuguese community is mobile-heavy',
      status: 'prioritized',
      implementation: '375px mobile-first responsive design'
    },
    
    bilingualSupport: {
      requirement: 'Seamless EN/PT language switching',
      status: 'implemented',
      features: [
        'ARIA labels in both languages',
        'Screen reader announcements',
        'Keyboard shortcut hints'
      ]
    }
  },
  
  // Performance considerations
  performance: {
    loadTime: {
      requirement: 'Fast loading for mobile networks',
      status: 'optimized',
      implementation: 'Chunked builds, lazy loading, image optimization'
    },
    
    bandwidth: {
      requirement: 'Low bandwidth support for Portuguese diaspora',
      status: 'considered',
      features: [
        'Progressive image loading',
        'Optimized cultural content delivery',
        'Efficient font loading'
      ]
    }
  }
};

// Usage example for developers
export const USAGE_EXAMPLES = {
  businessDirectory: `
    import { AccessibilityEnhancedBusinessDirectory } from '@/components/accessible';
    
    <AccessibilityEnhancedBusinessDirectory 
      className="portuguese-business-directory"
      initialCategory="restaurants"
      initialLocation="London"
    />
  `,
  
  eventCard: `
    import { AccessibilityEnhancedEventCard } from '@/components/accessible';
    
    <AccessibilityEnhancedEventCard
      event={portugueseEvent}
      index={0}
      showWaitingListModal={true}
    />
  `,
  
  navigation: `
    import { AccessibilityEnhancedNavigation } from '@/components/accessible';
    
    <AccessibilityEnhancedNavigation 
      variant="desktop"
      className="portuguese-nav"
    />
  `,
  
  utilities: `
    import { 
      useKeyboardNavigation, 
      usePortugueseAriaLabels 
    } from '@/components/accessible';
    
    const { createKeyboardHandler } = useKeyboardNavigation();
    const { generateBusinessAriaLabel } = usePortugueseAriaLabels();
    
    const handleKeyboard = createKeyboardHandler(
      () => selectBusiness(),
      () => toggleFavorite(),
      () => closeModal()
    );
  `
};

// Component feature summary
export const ACCESSIBILITY_FEATURES = {
  businessDirectory: [
    '🎯 Comprehensive ARIA labels for Portuguese businesses',
    '⌨️ Full keyboard navigation (arrows, enter, escape)',
    '📱 56px touch targets for mobile Portuguese community',
    '🔊 Screen reader announcements for filter changes',
    '🗺️ Map accessibility with business selection',
    '🔍 Search focus management (/ key shortcut)',
    '📍 Location services with privacy announcements'
  ],
  
  businessCard: [
    '🏢 Detailed business ARIA descriptions',
    '⭐ Rating announcement with review context',
    '📞 Accessible phone number links',
    '🌍 Website links with proper labeling',
    '🏷️ Category and heritage information',
    '📏 Distance context for location-aware users',
    '✅ Verification status announcements'
  ],
  
  eventCard: [
    '🎉 Event details with cultural context',
    '📅 Date and time accessibility',
    '👥 Attendance progress with percentages',
    '💰 Price information with currency context',
    '📍 Location details with address support',
    '⚡ Booking status with waiting list options',
    '🎫 Action buttons with clear intent'
  ],
  
  navigation: [
    '🧭 Skip links for efficient navigation',
    '⌨️ Keyboard shortcuts (Alt+1-6 for pages)',
    '📱 Mobile menu with focus management',
    '🔊 Menu state announcements',
    '🏠 Logo with homepage context',
    '🔍 Search and notifications access',
    '📋 Comprehensive keyboard help'
  ],
  
  modals: [
    '🎭 Focus trapping with escape routes',
    '🔒 Scroll locking with restoration',
    '📢 Modal state announcements',
    '⌨️ Keyboard controls (Escape to close)',
    '👆 Overlay click handling',
    '🎯 Return focus management',
    '📝 Form-specific modal variants'
  ]
};

export default {
  PORTUGUESE_ACCESSIBILITY_CHECKLIST,
  USAGE_EXAMPLES,
  ACCESSIBILITY_FEATURES
};