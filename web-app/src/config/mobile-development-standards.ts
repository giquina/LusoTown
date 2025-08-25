/**
 * Mobile Development Standards for LusoTown
 * 
 * Comprehensive mobile-first development guidelines specifically tailored
 * for the Portuguese-speaking community platform's needs and cultural considerations.
 */

export interface MobileStandard {
  id: string;
  category: 'design' | 'performance' | 'accessibility' | 'cultural' | 'technical';
  title: string;
  description: string;
  implementation: string;
  examples: { good: string; bad: string };
  priority: 'critical' | 'high' | 'medium' | 'low';
  validation: string;
}

export interface ComponentPattern {
  name: string;
  description: string;
  mobileImplementation: string;
  portugueseConsiderations: string;
  codeExample: string;
  commonMistakes: string[];
}

export const MOBILE_DEVELOPMENT_STANDARDS = {
  // Core Mobile-First Principles
  principles: {
    mobileFirst: {
      title: 'Mobile-First Design Philosophy',
      description: 'Design for the smallest screen first, then progressively enhance for larger screens',
      reasoning: '75% of Portuguese-speaking community members access LusoTown primarily via mobile devices',
      implementation: 'Use min-width media queries, not max-width. Start with mobile layout as the base.'
    },
    
    touchFirst: {
      title: 'Touch-First Interaction Design',
      description: 'Prioritize touch interactions over mouse/keyboard interactions',
      reasoning: 'Mobile devices are primarily touch-based, especially for social interactions',
      implementation: 'Design for finger navigation, consider thumb zones, implement gesture support'
    },
    
    culturalAdaptability: {
      title: 'Lusophone Cultural Content Adaptability',
      description: 'Ensure cultural content displays properly across all mobile devices',
      reasoning: 'Lusophone cultural elements and longer text must work on small screens',
      implementation: 'Test with Lusophone text, cultural images, and community-specific content'
    }
  },

  // Responsive Design Standards
  responsiveStandards: [
    {
      id: 'breakpoint-strategy',
      category: 'design',
      title: 'Progressive Enhancement Breakpoints',
      description: 'Use systematic breakpoint strategy that accommodates Lusophone content',
      implementation: 'Mobile (375px+), Tablet (768px+), Desktop (1024px+). Test Lusophone text at each breakpoint.',
      examples: {
        good: 'sm:text-lg md:text-xl lg:text-2xl // Progressive text scaling',
        bad: 'text-2xl md:text-sm // Reducing text size on larger screens'
      },
      priority: 'critical',
      validation: 'Test component at 375px, 414px, 768px, and 1024px widths'
    },
    
    {
      id: 'flexible-containers',
      category: 'design',
      title: 'Flexible Container Systems',
      description: 'Containers must adapt to varying Lusophone text lengths and cultural content',
      implementation: 'Use CSS Grid and Flexbox for flexible layouts. Avoid fixed widths.',
      examples: {
        good: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 // Responsive grid',
        bad: 'w-64 // Fixed width container'
      },
      priority: 'critical',
      validation: 'Verify container adapts to content length variations'
    },
    
    {
      id: 'touch-target-sizing',
      category: 'accessibility',
      title: 'Optimal Touch Target Sizing',
      description: 'All interactive elements must meet minimum touch target requirements',
      implementation: 'Minimum 44px x 44px (iOS) or 48dp x 48dp (Android). Recommended 56px x 56px.',
      examples: {
        good: 'min-h-[44px] min-w-[44px] p-2 // Adequate touch target',
        bad: 'h-6 w-6 // Too small for touch interaction'
      },
      priority: 'critical',
      validation: 'Measure actual rendered element size with developer tools'
    },
    
    {
      id: 'portuguese-text-accommodation',
      category: 'cultural',
      title: 'Lusophone Text Length Accommodation',
      description: 'Account for Lusophone text being 20-40% longer than English equivalents',
      implementation: 'Use flexible text containers, test with longest Lusophone translations, implement text truncation gracefully.',
      examples: {
        good: 'line-clamp-2 // Graceful text truncation',
        bad: 'w-20 overflow-hidden // Hard width limit causing cut-off'
      },
      priority: 'high',
      validation: 'Test with longest Lusophone translations for each text element'
    },
    
    {
      id: 'mobile-navigation-patterns',
      category: 'design',
      title: 'Mobile-Optimized Navigation',
      description: 'Navigation must be thumb-friendly and culturally appropriate',
      implementation: 'Bottom tab bars, hamburger menus with large targets, Lusophone cultural navigation terms',
      examples: {
        good: 'bottom-0 fixed // Bottom navigation for thumb accessibility',
        bad: 'top-0 // Top navigation hard to reach on large phones'
      },
      priority: 'high',
      validation: 'Test navigation reachability with one-handed thumb operation'
    },
    
    {
      id: 'image-responsiveness',
      category: 'performance',
      title: 'Responsive Image Implementation',
      description: 'Images must scale appropriately and load efficiently on mobile networks',
      implementation: 'Use Next.js Image component with responsive sizing, WebP format, lazy loading',
      examples: {
        good: 'sizes="(max-width: 768px) 100vw, 50vw" // Responsive image sizing',
        bad: 'width={1200} height={800} // Fixed image dimensions'
      },
      priority: 'high',
      validation: 'Test image loading and scaling on slow 3G connections'
    }
  ] as MobileStandard[],

  // Component-Specific Mobile Patterns
  componentPatterns: [
    {
      name: 'Lusophone Event Card',
      description: 'Mobile-optimized event card that accommodates Lusophone event names and descriptions',
      mobileImplementation: 'Stack layout on mobile, side-by-side on tablet. Flexible text containers.',
      portugueseConsiderations: 'Event titles can be long ("Noite de Fado Tradicional Português em Londres"), descriptions are detailed',
      codeExample: `
// ✅ Good: Flexible event card
<div className="flex flex-col sm:flex-row gap-4 p-4">
  <Image 
    src={event.image} 
    className="w-full sm:w-32 h-48 sm:h-32 object-cover rounded"
    sizes="(max-width: 640px) 100vw, 128px"
  />
  <div className="flex-1 min-w-0">
    <h3 className="text-lg font-semibold line-clamp-2 mb-2">
      {language === 'pt' ? event.title_pt : event.title_en}
    </h3>
    <p className="text-gray-600 text-sm line-clamp-3 mb-3">
      {language === 'pt' ? event.description_pt : event.description_en}
    </p>
    <button className="w-full sm:w-auto min-h-[44px] px-6 bg-red-600 text-white rounded">
      {t('events.joinButton')}
    </button>
  </div>
</div>`,
      commonMistakes: [
        'Fixed width containers that cut off Lusophone titles',
        'Touch targets too small on mobile',
        'Not testing with actual Lusophone content',
        'Horizontal scrolling on mobile devices'
      ]
    },
    
    {
      name: 'Portuguese-speaking community Form',
      description: 'Mobile-friendly form with Lusophone labels and validation',
      mobileImplementation: 'Single column layout, large input fields, clear Lusophone labels',
      portugueseConsiderations: 'Form labels are longer in Lusophone, error messages need more space',
      codeExample: `
// ✅ Good: Mobile-optimized Lusophone form
<form className="space-y-4">
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">
      {t('form.fullName')} {/* "Nome Completo" */}
    </label>
    <input
      type="text"
      className="w-full min-h-[44px] px-3 py-2 border border-gray-300 rounded-md
                 focus:ring-2 focus:ring-red-500 focus:border-transparent"
      placeholder={t('form.fullNamePlaceholder')}
    />
    {error && (
      <p className="text-red-600 text-sm mt-1 p-2 bg-red-50 rounded">
        {t(\`form.errors.\${error}\`)}
      </p>
    )}
  </div>
</form>`,
      commonMistakes: [
        'Input fields too small for touch interaction',
        'Lusophone labels causing layout overflow',
        'Error messages not properly styled for mobile',
        'Form validation not accounting for Lusophone characters'
      ]
    },
    
    {
      name: 'Mobile Navigation Menu',
      description: 'Portuguese-speaking community navigation optimized for mobile devices',
      mobileImplementation: 'Bottom tab bar with Lusophone cultural terms, large touch targets',
      portugueseConsiderations: 'Navigation terms like "Comunidade" vs "Community" affect spacing',
      codeExample: `
// ✅ Good: Mobile-optimized Lusophone navigation
<nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-pb">
  <div className="grid grid-cols-5 h-16">
    {NAVIGATION_ITEMS.map((item) => (
      <button
        key={item.id}
        className="flex flex-col items-center justify-center min-h-[48px]
                   transition-colors active:scale-95"
        style={{ minTouchTarget: '44px' }}
      >
        <item.icon className="h-5 w-5 mb-1" />
        <span className="text-xs font-medium line-clamp-1">
          {language === 'pt' ? item.label_pt : item.label_en}
        </span>
      </button>
    ))}
  </div>
</nav>`,
      commonMistakes: [
        'Navigation items too small for touch interaction',
        'Lusophone labels causing text overflow',
        'Not accounting for safe area on iOS devices',
        'Missing active/focus states for accessibility'
      ]
    }
  ] as ComponentPattern[],

  // Performance Standards for Mobile
  performanceStandards: {
    loadingTimes: {
      critical: '< 1.5s First Contentful Paint on 3G',
      recommended: '< 2.5s Largest Contentful Paint on 3G',
      acceptable: '< 4s Total page load on 3G'
    },
    
    imageOptimization: {
      formats: ['WebP', 'AVIF for modern browsers', 'JPEG fallback'],
      sizing: 'Responsive images with appropriate srcset',
      loading: 'Lazy loading for images below the fold',
      compression: 'Maximum 85% JPEG quality for cultural images'
    },
    
    codeOptimization: {
      bundleSize: '< 100KB initial JavaScript bundle',
      cssSize: '< 50KB critical CSS',
      unusedCode: 'Tree-shake unused Tailwind classes',
      caching: 'Aggressive caching for Lusophone cultural content'
    }
  },

  // Testing Protocol for Mobile Development
  testingProtocol: {
    deviceTesting: {
      required: [
        'iPhone SE (375x667) - Critical baseline',
        'iPhone 12/13 (390x844) - Primary mobile experience',
        'iPad (768x1024) - Tablet experience',
        'Samsung Galaxy S21 (360x800) - Android baseline'
      ],
      recommended: [
        'iPhone 14 Pro Max (428x926) - Large mobile',
        'iPad Pro (1024x1366) - Large tablet',
        'Various Android devices via BrowserStack'
      ]
    },
    
    functionalTesting: {
      touch: 'All interactive elements respond to touch',
      gestures: 'Swipe navigation works smoothly',
      rotation: 'Layout adapts to portrait/landscape orientation',
      keyboard: 'Lusophone keyboard input works correctly',
      forms: 'Form validation with Lusophone error messages',
      navigation: 'Tab navigation works with screen readers'
    },
    
    performanceTesting: {
      network: 'Test on slow 3G (750kb/s)',
      memory: 'Monitor memory usage during navigation',
      battery: 'Minimal battery drain from animations',
      rendering: 'No layout thrashing during interactions'
    }
  },

  // Accessibility Standards for Portuguese-speaking community
  accessibilityStandards: {
    screenReader: {
      language: 'Proper lang attributes for Lusophone content',
      labels: 'ARIA labels in user\'s selected language',
      landmarks: 'Semantic HTML structure for navigation',
      announcements: 'Dynamic content changes announced correctly'
    },
    
    visualAccessibility: {
      contrast: 'Minimum 4.5:1 contrast ratio for Lusophone brand colors',
      focus: 'Visible focus indicators for all interactive elements',
      scaling: 'Content remains functional at 200% zoom',
      colorBlindness: 'Information not conveyed by color alone'
    },
    
    motorAccessibility: {
      touchTargets: 'Minimum 44x44px touch targets',
      spacing: 'Adequate spacing between interactive elements',
      gestures: 'Alternative to complex gestures available',
      timeout: 'Sufficient time for Lusophone form completion'
    }
  },

  // Code Quality Standards
  codeStandards: {
    cssClasses: {
      responsive: 'Always use mobile-first responsive classes',
      semantic: 'Use semantic class names that reflect function',
      consistent: 'Follow established Lusophone cultural design tokens',
      maintainable: 'Avoid deep nesting, use utility-first approach'
    },
    
    components: {
      props: 'Accept responsive and accessibility props',
      testing: 'Include mobile-specific test cases',
      documentation: 'Document Lusophone-specific considerations',
      reusability: 'Design for reuse across different screen sizes'
    },
    
    performance: {
      lazy: 'Implement lazy loading for non-critical content',
      optimization: 'Use React.memo for expensive Lusophone text rendering',
      bundling: 'Code split by feature, not by screen size',
      caching: 'Cache Lusophone cultural content effectively'
    }
  }
};

// Helper functions for implementing mobile standards
export const mobileStandardHelpers = {
  /**
   * Generate responsive class string with mobile-first approach
   */
  generateResponsiveClasses: (
    mobile: string,
    tablet?: string,
    desktop?: string
  ): string => {
    let classes = mobile;
    if (tablet) classes += ` md:${tablet}`;
    if (desktop) classes += ` lg:${desktop}`;
    return classes;
  },

  /**
   * Create touch-friendly button classes
   */
  createTouchButton: (size: 'small' | 'medium' | 'large' = 'medium'): string => {
    const sizes = {
      small: 'min-h-[44px] min-w-[44px] px-3 py-2 text-sm',
      medium: 'min-h-[48px] min-w-[48px] px-4 py-2 text-base',
      large: 'min-h-[56px] min-w-[56px] px-6 py-3 text-lg'
    };
    
    return `${sizes[size]} touch-manipulation active:scale-95 transition-transform`;
  },

  /**
   * Lusophone text container with overflow handling
   */
  createTextContainer: (maxLines?: number): string => {
    const baseClasses = 'overflow-hidden break-words hyphens-auto';
    if (maxLines) {
      return `${baseClasses} line-clamp-${maxLines}`;
    }
    return baseClasses;
  },

  /**
   * Responsive image classes for Lusophone cultural content
   */
  createResponsiveImage: (aspect?: 'square' | 'video' | 'portrait'): string => {
    const aspectClasses = {
      square: 'aspect-square',
      video: 'aspect-video',
      portrait: 'aspect-[3/4]'
    };
    
    const baseClasses = 'w-full h-auto object-cover rounded-lg';
    const aspectClass = aspect ? aspectClasses[aspect] : '';
    
    return `${baseClasses} ${aspectClass}`.trim();
  }
};

export default MOBILE_DEVELOPMENT_STANDARDS;