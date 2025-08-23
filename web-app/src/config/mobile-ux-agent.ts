/**
 * Mobile UX Agent Configuration for LusoTown
 * 
 * This configuration defines the specialized mobile UX agent that automatically
 * reviews UI changes for mobile compatibility and Portuguese community needs.
 */

export interface MobileBreakpoint {
  name: string;
  width: number;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
}

export interface TouchTarget {
  minSize: number;
  recommendedSize: number;
  spacing: number;
  description: string;
}

export interface ResponsiveDesignRule {
  id: string;
  category: 'layout' | 'typography' | 'interaction' | 'accessibility' | 'performance';
  rule: string;
  rationale: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  checkFunction?: string;
}

export interface PortugueseTextConsideration {
  aspect: string;
  enExample: string;
  ptExample: string;
  lengthIncrease: number;
  impact: string;
  solution: string;
}

export const MOBILE_UX_AGENT_CONFIG = {
  // Agent Identity and Role
  agent: {
    name: 'LusoTown Mobile UX Specialist',
    role: 'Mobile-first responsive design expert for Portuguese community platform',
    expertise: [
      'Mobile-first responsive design',
      'Portuguese text length considerations',
      'Touch interface optimization',
      'Cross-device compatibility',
      'Cultural accessibility',
      'Performance on mobile networks'
    ],
    responsibilities: [
      'Review all UI changes for mobile compatibility',
      'Validate touch target sizes and spacing',
      'Test Portuguese text overflow scenarios',
      'Ensure gesture-friendly interfaces',
      'Verify responsive breakpoint behavior',
      'Assess mobile performance impact'
    ]
  },

  // Mobile Breakpoints (Portuguese community focused)
  breakpoints: {
    mobile: {
      xs: { name: 'Mobile Small', width: 375, description: 'iPhone SE, small Android phones', priority: 'critical' },
      sm: { name: 'Mobile Standard', width: 414, description: 'iPhone 12/13/14, standard smartphones', priority: 'critical' },
    },
    tablet: {
      md: { name: 'Tablet Portrait', width: 768, description: 'iPad portrait, large phones landscape', priority: 'high' },
      lg: { name: 'Tablet Landscape', width: 1024, description: 'iPad landscape, small laptops', priority: 'medium' },
    },
    desktop: {
      xl: { name: 'Desktop Standard', width: 1280, description: 'Standard desktop displays', priority: 'medium' },
      '2xl': { name: 'Desktop Large', width: 1536, description: 'Large desktop displays', priority: 'low' },
    }
  } as Record<string, Record<string, MobileBreakpoint>>,

  // Touch Target Standards
  touchTargets: {
    minimum: { minSize: 44, recommendedSize: 48, spacing: 8, description: 'WCAG 2.1 AA minimum for accessibility' },
    comfortable: { minSize: 48, recommendedSize: 56, spacing: 12, description: 'Comfortable for Portuguese users' },
    premium: { minSize: 56, recommendedSize: 64, spacing: 16, description: 'Premium experience for cultural events' }
  } as Record<string, TouchTarget>,

  // Responsive Design Rules
  designRules: [
    {
      id: 'mobile-first',
      category: 'layout',
      rule: 'Design mobile-first, then enhance for larger screens',
      rationale: 'Portuguese community primarily uses mobile devices for social interaction',
      priority: 'critical'
    },
    {
      id: 'portuguese-text-space',
      category: 'typography',
      rule: 'Allow 20-30% extra space for Portuguese text compared to English',
      rationale: 'Portuguese text is typically longer than English equivalents',
      priority: 'critical'
    },
    {
      id: 'touch-targets',
      category: 'interaction',
      rule: 'Minimum 44px touch targets with 8px spacing',
      rationale: 'WCAG accessibility compliance and cultural inclusivity',
      priority: 'critical'
    },
    {
      id: 'gesture-navigation',
      category: 'interaction',
      rule: 'Support swipe gestures for navigation between cultural content',
      rationale: 'Enhances mobile experience for browsing Portuguese events and matches',
      priority: 'high'
    },
    {
      id: 'cultural-colors',
      category: 'accessibility',
      rule: 'Ensure Portuguese brand colors meet contrast ratios on all devices',
      rationale: 'Cultural identity must remain accessible on mobile devices',
      priority: 'high'
    },
    {
      id: 'image-optimization',
      category: 'performance',
      rule: 'Optimize Portuguese cultural images for mobile data plans',
      rationale: 'Many community members use limited data plans',
      priority: 'medium'
    }
  ] as ResponsiveDesignRule[],

  // Portuguese Text Length Considerations
  textConsiderations: [
    {
      aspect: 'Navigation Labels',
      enExample: 'Events',
      ptExample: 'Eventos',
      lengthIncrease: 17,
      impact: 'Tab width in mobile navigation',
      solution: 'Use shorter Portuguese alternatives or icons'
    },
    {
      aspect: 'Button Text',
      enExample: 'Join Event',
      ptExample: 'Participar no Evento',
      lengthIncrease: 90,
      impact: 'Button width on small screens',
      solution: 'Multi-line buttons or abbreviated text'
    },
    {
      aspect: 'Form Labels',
      enExample: 'Phone Number',
      ptExample: 'Número de Telefone',
      lengthIncrease: 54,
      impact: 'Form field layout on mobile',
      solution: 'Stack labels above inputs on mobile'
    },
    {
      aspect: 'Error Messages',
      enExample: 'Invalid email',
      ptExample: 'Endereço de email inválido',
      lengthIncrease: 123,
      impact: 'Error message overflow',
      solution: 'Expandable error areas or tooltips'
    }
  ] as PortugueseTextConsideration[],

  // Mobile Testing Requirements
  testingProtocol: {
    mandatory: [
      'Test on iPhone SE (375px width) - critical breakpoint',
      'Test on standard iPhone (414px width) - primary mobile experience',
      'Verify Portuguese text doesn\'t overflow containers',
      'Validate touch targets are minimum 44px',
      'Check gesture navigation works smoothly',
      'Test with slow 3G network conditions'
    ],
    recommended: [
      'Test on iPad portrait (768px width)',
      'Verify landscape orientation on mobile',
      'Test with high contrast accessibility mode',
      'Validate with Portuguese keyboard on iOS/Android',
      'Check cultural color contrast on various screens',
      'Performance test with large Portuguese event images'
    ],
    optional: [
      'Test on Android tablets',
      'Verify with assistive technologies',
      'Test with reduced motion preferences',
      'Performance test on older devices'
    ]
  },

  // Enhanced Quality Assurance Checklist for Portuguese Community
  qaChecklist: {
    layout: [
      '✓ Mobile-first responsive design implemented',
      '✓ Content reflows properly at all breakpoints',
      '✓ No horizontal scrolling on mobile devices',
      '✓ Portuguese text fits within containers',
      '✓ Images scale appropriately',
      '✓ Navigation is accessible on mobile',
      '✓ Portuguese flag colors preserved at all viewport sizes',
      '✓ Cultural content sections adapt properly on mobile'
    ],
    interaction: [
      '✓ Touch targets are minimum 44px',
      '✓ Adequate spacing between interactive elements',
      '✓ Gestures work smoothly (swipe, tap, pinch)',
      '✓ Form inputs are easily accessible',
      '✓ Modal dialogs are mobile-friendly',
      '✓ Loading states provide feedback'
    ],
    typography: [
      '✓ Text is readable on small screens',
      '✓ Portuguese text doesn\'t overflow',
      '✓ Font sizes scale appropriately',
      '✓ Line height supports readability',
      '✓ Text contrast meets accessibility standards',
      '✓ Cultural terminology is properly displayed'
    ],
    performance: [
      '✓ Page loads quickly on mobile networks',
      '✓ Images are optimized for mobile',
      '✓ Critical content loads first',
      '✓ Minimal JavaScript blocking',
      '✓ Efficient CSS for mobile rendering',
      '✓ Lazy loading implemented where appropriate'
    ],
    accessibility: [
      '✓ Screen reader compatibility',
      '✓ Keyboard navigation support',
      '✓ High contrast mode compatibility',
      '✓ Focus indicators visible',
      '✓ ARIA labels for Portuguese content',
      '✓ Semantic HTML structure'
    ],
    cultural: [
      '✓ Portuguese brand colors preserved',
      '✓ Cultural content properly formatted',
      '✓ Portuguese navigation terms clear',
      '✓ Event images display correctly',
      '✓ Cultural symbols render properly',
      '✓ Community features accessible'
    ]
  },

  // Automation Rules
  automationRules: {
    // Automatically trigger mobile review when these patterns are detected
    triggers: [
      'new component creation',
      'CSS changes affecting layout',
      'responsive class modifications',
      'touch event handlers added',
      'form field modifications',
      'navigation changes',
      'modal or popup implementations'
    ],
    
    // Automatic checks to run
    autoChecks: [
      'validate_responsive_breakpoints',
      'check_touch_target_sizes',
      'verify_portuguese_text_overflow',
      'test_gesture_navigation',
      'validate_accessibility_standards',
      'performance_mobile_audit'
    ],
    
    // When to require manual review
    manualReviewRequired: [
      'New user interaction patterns',
      'Complex animations or transitions',
      'Cultural content display changes',
      'Payment or subscription flows',
      'Critical user journey modifications'
    ]
  }
};

// Utility functions for mobile UX validation
export const mobileUXValidators = {
  /**
   * Check if touch targets meet minimum size requirements
   */
  validateTouchTargets: (elements: HTMLElement[]): boolean => {
    return elements.every(element => {
      const rect = element.getBoundingClientRect();
      return rect.width >= 44 && rect.height >= 44;
    });
  },

  /**
   * Verify Portuguese text doesn't overflow containers
   */
  checkPortugueseTextOverflow: (containers: HTMLElement[]): boolean => {
    return containers.every(container => {
      const hasOverflow = container.scrollWidth > container.clientWidth ||
                         container.scrollHeight > container.clientHeight;
      return !hasOverflow;
    });
  },

  /**
   * Test responsive breakpoint behavior
   */
  testBreakpoints: (breakpoints: number[]): Promise<boolean[]> => {
    return Promise.all(
      breakpoints.map(async (width) => {
        // Simulate viewport resize
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: width,
        });
        
        // Trigger resize event
        window.dispatchEvent(new Event('resize'));
        
        // Allow time for layout updates
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Check if layout is stable
        return !document.body.scrollWidth > document.body.clientWidth;
      })
    );
  },

  /**
   * Validate gesture navigation
   */
  testGestureNavigation: (element: HTMLElement): boolean => {
    const hasSwipeHandlers = [
      'touchstart',
      'touchmove',
      'touchend'
    ].every(eventType => {
      const listeners = (element as any)._listeners?.[eventType];
      return listeners && listeners.length > 0;
    });
    
    return hasSwipeHandlers;
  }
};

export default MOBILE_UX_AGENT_CONFIG;