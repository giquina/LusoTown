/**
 * Portuguese Cultural Mobile Design System
 * 
 * Comprehensive mobile-first design tokens specifically crafted for 
 * the Portuguese-speaking community, featuring Azulejo patterns,
 * lusophone heritage colors, and mobile-optimized touch interfaces.
 */

export interface MobileDesignToken {
  name: string;
  value: string;
  description: string;
  usage: string;
  culturalSignificance?: string;
}

export interface MobileBreakpoint {
  name: string;
  minWidth: string;
  maxWidth?: string;
  description: string;
  targetDevices: string[];
  userPercentage: number;
}

export interface TouchTarget {
  size: string;
  minSize: string;
  spacing: string;
  description: string;
  culturalContext: string;
}

// Portuguese Cultural Mobile Design Tokens
export const PORTUGUESE_MOBILE_DESIGN_TOKENS = {
  
  // Mobile-First Typography Scale (optimized for Portuguese text)
  typography: {
    scale: {
      xs: {
        name: 'Extra Small',
        value: '0.75rem', // 12px
        lineHeight: '1rem',
        description: 'Captions, fine print, Portuguese accent marks',
        usage: 'Timestamps, metadata, Portuguese cultural badges',
        culturalSignificance: 'Preserves readability of Portuguese diacritical marks'
      },
      sm: {
        name: 'Small',
        value: '0.875rem', // 14px
        lineHeight: '1.25rem',
        description: 'Small body text, Portuguese form labels',
        usage: 'Secondary content, Portuguese community guidelines',
        culturalSignificance: 'Optimal for longer Portuguese translations'
      },
      base: {
        name: 'Base',
        value: '1rem', // 16px
        lineHeight: '1.5rem',
        description: 'Main body text, Portuguese content',
        usage: 'Primary content, Portuguese event descriptions',
        culturalSignificance: 'Standard for Portuguese reading comfort'
      },
      lg: {
        name: 'Large',
        value: '1.125rem', // 18px
        lineHeight: '1.75rem',
        description: 'Prominent body text, Portuguese headings',
        usage: 'Important Portuguese announcements, community updates',
        culturalSignificance: 'Enhanced for Portuguese community engagement'
      },
      xl: {
        name: 'Extra Large',
        value: '1.25rem', // 20px
        lineHeight: '1.75rem',
        description: 'Small headings, Portuguese titles',
        usage: 'Event titles, Portuguese business names',
        culturalSignificance: 'Accommodates longer Portuguese business names'
      },
      '2xl': {
        name: 'Double Extra Large',
        value: '1.5rem', // 24px
        lineHeight: '2rem',
        description: 'Medium headings, Portuguese page titles',
        usage: 'Section headers, Portuguese cultural celebrations',
        culturalSignificance: 'Perfect for Portuguese festival names'
      },
      '3xl': {
        name: 'Triple Extra Large',
        value: '1.875rem', // 30px
        lineHeight: '2.25rem',
        description: 'Large headings, Portuguese hero text',
        usage: 'Hero headlines, Portuguese community welcome',
        culturalSignificance: 'Emphasizes Portuguese cultural pride'
      },
      '4xl': {
        name: 'Quadruple Extra Large',
        value: '2.25rem', // 36px
        lineHeight: '2.5rem',
        description: 'Display text, Portuguese brand headlines',
        usage: 'Main page titles, Portuguese cultural events',
        culturalSignificance: 'Celebrates Portuguese heritage prominence'
      }
    } as Record<string, MobileDesignToken>,

    // Portuguese-optimized font stacks
    fontFamilies: {
      primary: {
        name: 'Primary Portuguese',
        value: '"Inter", "Open Sans", "Roboto", "Helvetica Neue", Arial, sans-serif',
        description: 'Primary font stack optimized for Portuguese characters',
        usage: 'All body text, Portuguese content, community posts',
        culturalSignificance: 'Excellent support for Portuguese diacritical marks (ã, õ, ç)'
      },
      heading: {
        name: 'Portuguese Headings',
        value: '"Inter", "Montserrat", "Open Sans", "Helvetica Neue", Arial, sans-serif',
        description: 'Heading font stack for Portuguese titles',
        usage: 'Headings, Portuguese event titles, business names',
        culturalSignificance: 'Strong character support for Portuguese proper nouns'
      },
      display: {
        name: 'Portuguese Display',
        value: '"Playfair Display", "Crimson Text", "Times New Roman", serif',
        description: 'Elegant display font for Portuguese cultural content',
        usage: 'Portuguese poetry, cultural quotes, formal announcements',
        culturalSignificance: 'Evokes Portuguese literary tradition and elegance'
      },
      monospace: {
        name: 'Portuguese Code',
        value: '"Fira Code", "JetBrains Mono", "Consolas", "Monaco", monospace',
        description: 'Monospace font for code and Portuguese technical content',
        usage: 'Code examples, Portuguese technical documentation',
        culturalSignificance: 'Maintains Portuguese character integrity in technical contexts'
      }
    } as Record<string, MobileDesignToken>
  },

  // Mobile-First Color System (Portuguese Cultural Heritage)
  colors: {
    // Portuguese Flag Colors (Primary Palette)
    portuguese: {
      red: {
        name: 'Portuguese Red',
        value: '#DC143C', // Traditional Portuguese flag red
        description: 'Primary Portuguese cultural red',
        usage: 'CTAs, Portuguese cultural elements, heritage badges',
        culturalSignificance: 'Represents Portuguese flag, cultural pride, passion'
      },
      green: {
        name: 'Portuguese Green',
        value: '#228B22', // Traditional Portuguese flag green
        description: 'Portuguese cultural green accent',
        usage: 'Success states, Portuguese environmental themes, cultural balance',
        culturalSignificance: 'Portuguese flag green, hope, nature, exploration heritage'
      },
      gold: {
        name: 'Portuguese Gold',
        value: '#D4A574', // Portuguese armillary sphere gold
        description: 'Portuguese heritage gold for luxury elements',
        usage: 'Premium features, Portuguese cultural highlights, elite badges',
        culturalSignificance: 'Portuguese Age of Discovery, maritime heritage, luxury'
      }
    },

    // Azulejo-Inspired Blues (Secondary Palette)
    azulejo: {
      light: {
        name: 'Light Azulejo',
        value: '#87CEEB', // Light sky blue like traditional azulejos
        description: 'Light Portuguese ceramic tile blue',
        usage: 'Backgrounds, Portuguese cultural decorations, soft accents',
        culturalSignificance: 'Traditional Portuguese azulejo ceramic tiles'
      },
      medium: {
        name: 'Medium Azulejo',
        value: '#4682B4', // Steel blue reminiscent of azulejos
        description: 'Medium Portuguese ceramic tile blue',
        usage: 'Secondary elements, Portuguese cultural borders, decorative elements',
        culturalSignificance: 'Classical Portuguese azulejo patterns'
      },
      deep: {
        name: 'Deep Azulejo',
        value: '#191970', // Midnight blue for deep azulejo tones
        description: 'Deep Portuguese ceramic tile blue',
        usage: 'Text on light backgrounds, Portuguese cultural depth, formal elements',
        culturalSignificance: 'Deep traditional azulejo shades, Portuguese sophistication'
      }
    },

    // PALOP Countries Cultural Colors
    palop: {
      brazil: {
        name: 'Brazilian Green',
        value: '#009639', // Brazilian flag green
        description: 'Brazilian cultural green',
        usage: 'Brazilian community events, cultural diversity indicators',
        culturalSignificance: 'Brazilian flag, largest Portuguese-speaking nation'
      },
      capeVerde: {
        name: 'Cape Verde Blue',
        value: '#003893', // Cape Verde flag blue
        description: 'Cape Verdean cultural blue',
        usage: 'Cape Verdean community events, island culture elements',
        culturalSignificance: 'Cape Verde flag, Atlantic Portuguese heritage'
      },
      angola: {
        name: 'Angolan Red',
        value: '#FF0000', // Angola flag red
        description: 'Angolan cultural red',
        usage: 'Angolan community events, African Portuguese heritage',
        culturalSignificance: 'Angola flag, African lusophone heritage'
      },
      mozambique: {
        name: 'Mozambican Green',
        value: '#00A550', // Mozambique flag green
        description: 'Mozambican cultural green',
        usage: 'Mozambican community events, East African Portuguese culture',
        culturalSignificance: 'Mozambique flag, Indian Ocean Portuguese heritage'
      }
    },

    // Neutral Colors (Mobile-Optimized)
    neutral: {
      white: {
        name: 'Pure White',
        value: '#FFFFFF',
        description: 'Pure white for backgrounds and contrast',
        usage: 'Card backgrounds, Portuguese content areas, clean sections'
      },
      gray: {
        50: { name: 'Lightest Gray', value: '#F9FAFB', description: 'Subtle backgrounds' },
        100: { name: 'Very Light Gray', value: '#F3F4F6', description: 'Card backgrounds' },
        200: { name: 'Light Gray', value: '#E5E7EB', description: 'Borders, dividers' },
        300: { name: 'Medium Light Gray', value: '#D1D5DB', description: 'Input borders' },
        400: { name: 'Medium Gray', value: '#9CA3AF', description: 'Placeholder text' },
        500: { name: 'Medium Dark Gray', value: '#6B7280', description: 'Secondary text' },
        600: { name: 'Dark Gray', value: '#4B5563', description: 'Primary text' },
        700: { name: 'Very Dark Gray', value: '#374151', description: 'Headings' },
        800: { name: 'Extra Dark Gray', value: '#1F2937', description: 'Dark theme backgrounds' },
        900: { name: 'Darkest Gray', value: '#111827', description: 'Dark theme text' }
      },
      black: {
        name: 'Rich Black',
        value: '#000000',
        description: 'Pure black for maximum contrast',
        usage: 'High contrast text, Portuguese cultural emphasis'
      }
    }
  },

  // Mobile Breakpoints (Portuguese Community Focused)
  breakpoints: [
    {
      name: 'mobile-small',
      minWidth: '375px',
      description: 'iPhone SE, small Android phones',
      targetDevices: ['iPhone SE', 'Small Android phones'],
      userPercentage: 15,
      maxWidth: '413px'
    },
    {
      name: 'mobile-standard',
      minWidth: '414px',
      description: 'iPhone 12/13/14, standard mobile experience',
      targetDevices: ['iPhone 12/13/14', 'Standard Android phones'],
      userPercentage: 45,
      maxWidth: '767px'
    },
    {
      name: 'tablet-portrait',
      minWidth: '768px',
      description: 'iPad portrait, large mobile landscape',
      targetDevices: ['iPad', 'Android tablets', 'Large phones landscape'],
      userPercentage: 25,
      maxWidth: '1023px'
    },
    {
      name: 'desktop-small',
      minWidth: '1024px',
      description: 'Small desktop, tablet landscape',
      targetDevices: ['Small laptops', 'iPad landscape'],
      userPercentage: 10,
      maxWidth: '1279px'
    },
    {
      name: 'desktop-large',
      minWidth: '1280px',
      description: 'Standard desktop and above',
      targetDevices: ['Laptops', 'Desktops'],
      userPercentage: 5
    }
  ] as MobileBreakpoint[],

  // Touch Targets (Portuguese Cultural Context)
  touchTargets: {
    minimum: {
      size: '44px',
      minSize: '44px',
      spacing: '8px',
      description: 'Minimum WCAG compliant touch target',
      culturalContext: 'Essential for Portuguese elderly users accessing cultural content'
    },
    recommended: {
      size: '48px',
      minSize: '48px', 
      spacing: '12px',
      description: 'Recommended comfortable touch target',
      culturalContext: 'Optimal for Portuguese community social interactions'
    },
    premium: {
      size: '56px',
      minSize: '56px',
      spacing: '16px',
      description: 'Premium spacious touch target',
      culturalContext: 'Luxury experience for Portuguese cultural event bookings'
    },
    hero: {
      size: '64px',
      minSize: '64px',
      spacing: '20px',
      description: 'Hero action touch target',
      culturalContext: 'Primary Portuguese community engagement actions'
    }
  } as Record<string, TouchTarget>,

  // Spacing System (8px grid, mobile-optimized)
  spacing: {
    xs: { name: 'Extra Small', value: '4px', usage: 'Tight spacing, Portuguese text adjustments' },
    sm: { name: 'Small', value: '8px', usage: 'Component internal spacing' },
    md: { name: 'Medium', value: '16px', usage: 'Standard component spacing, Portuguese content padding' },
    lg: { name: 'Large', value: '24px', usage: 'Section spacing, Portuguese cultural content separation' },
    xl: { name: 'Extra Large', value: '32px', usage: 'Page section spacing' },
    '2xl': { name: 'Double XL', value: '48px', usage: 'Major section spacing' },
    '3xl': { name: 'Triple XL', value: '64px', usage: 'Page-level spacing' },
    '4xl': { name: 'Quadruple XL', value: '96px', usage: 'Hero section spacing' }
  },

  // Border Radius (Mobile-Optimized, Portuguese Cultural)
  borderRadius: {
    none: { name: 'None', value: '0px', usage: 'Sharp edges, Portuguese geometric patterns' },
    xs: { name: 'Extra Small', value: '2px', usage: 'Subtle rounding, Portuguese cultural badges' },
    sm: { name: 'Small', value: '4px', usage: 'Input fields, Portuguese form elements' },
    md: { name: 'Medium', value: '8px', usage: 'Cards, Portuguese event cards' },
    lg: { name: 'Large', value: '12px', usage: 'Buttons, Portuguese cultural components' },
    xl: { name: 'Extra Large', value: '16px', usage: 'Large cards, Portuguese business listings' },
    '2xl': { name: 'Double XL', value: '24px', usage: 'Hero elements, Portuguese cultural highlights' },
    full: { name: 'Full', value: '50%', usage: 'Circular elements, Portuguese profile pictures' }
  },

  // Shadows (Mobile-Optimized, Portuguese Cultural)
  shadows: {
    none: { name: 'None', value: 'none', usage: 'Flat design, Portuguese minimalist elements' },
    sm: { 
      name: 'Small', 
      value: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', 
      usage: 'Subtle elevation, Portuguese cultural badges' 
    },
    md: { 
      name: 'Medium', 
      value: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', 
      usage: 'Card elevation, Portuguese event cards' 
    },
    lg: { 
      name: 'Large', 
      value: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', 
      usage: 'Modal elevation, Portuguese cultural overlays' 
    },
    xl: { 
      name: 'Extra Large', 
      value: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', 
      usage: 'Hero elements, Portuguese cultural highlights' 
    },
    portuguese: { 
      name: 'Portuguese Cultural', 
      value: '0 4px 6px -1px rgba(212, 165, 116, 0.2), 0 2px 4px -1px rgba(220, 20, 60, 0.1)', 
      usage: 'Portuguese heritage elements, cultural emphasis' 
    },
    azulejo: { 
      name: 'Azulejo Pattern', 
      value: '0 4px 6px -1px rgba(70, 130, 180, 0.15), 0 2px 4px -1px rgba(25, 25, 112, 0.1)', 
      usage: 'Portuguese ceramic tile inspired elements' 
    }
  },

  // Motion & Animation (Mobile-Optimized)
  motion: {
    duration: {
      instant: { name: 'Instant', value: '0ms', usage: 'Immediate changes' },
      fast: { name: 'Fast', value: '150ms', usage: 'Quick interactions, Portuguese touch feedback' },
      normal: { name: 'Normal', value: '250ms', usage: 'Standard transitions, Portuguese cultural elements' },
      slow: { name: 'Slow', value: '350ms', usage: 'Page transitions, Portuguese content loading' },
      slower: { name: 'Slower', value: '500ms', usage: 'Complex animations, Portuguese cultural celebrations' }
    },
    easing: {
      linear: { name: 'Linear', value: 'linear', usage: 'Consistent motion' },
      easeIn: { name: 'Ease In', value: 'cubic-bezier(0.4, 0, 1, 1)', usage: 'Accelerating motion' },
      easeOut: { name: 'Ease Out', value: 'cubic-bezier(0, 0, 0.2, 1)', usage: 'Decelerating motion, Portuguese content reveals' },
      easeInOut: { name: 'Ease In Out', value: 'cubic-bezier(0.4, 0, 0.2, 1)', usage: 'Smooth motion, Portuguese cultural transitions' },
      portuguese: { name: 'Portuguese Cultural', value: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', usage: 'Portuguese heritage animations' }
    }
  },

  // Z-Index Scale (Mobile UI Hierarchy)
  zIndex: {
    behind: { name: 'Behind', value: '-1', usage: 'Background elements' },
    default: { name: 'Default', value: '0', usage: 'Default stacking' },
    content: { name: 'Content', value: '10', usage: 'Portuguese content areas' },
    header: { name: 'Header', value: '20', usage: 'Portuguese navigation header' },
    overlay: { name: 'Overlay', value: '30', usage: 'Portuguese cultural overlays' },
    modal: { name: 'Modal', value: '40', usage: 'Portuguese cultural modals' },
    popover: { name: 'Popover', value: '50', usage: 'Portuguese cultural tooltips' },
    toast: { name: 'Toast', value: '60', usage: 'Portuguese community notifications' }
  }
} as const;

// Portuguese Cultural Patterns & Textures
export const PORTUGUESE_CULTURAL_PATTERNS = {
  azulejo: {
    geometric: {
      name: 'Geometric Azulejo',
      pattern: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><rect width="60" height="60" fill="%23f8fafc"/><path d="M30 0L45 15H15z" fill="%234682B4" opacity="0.1"/><path d="M60 30L45 45V15z" fill="%234682B4" opacity="0.1"/><path d="M30 60L15 45H45z" fill="%234682B4" opacity="0.1"/><path d="M0 30L15 15V45z" fill="%234682B4" opacity="0.1"/></svg>',
      description: 'Traditional Portuguese geometric azulejo tile pattern',
      usage: 'Background patterns for Portuguese cultural sections'
    },
    floral: {
      name: 'Floral Azulejo',
      pattern: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><rect width="80" height="80" fill="%23f8fafc"/><circle cx="40" cy="40" r="15" fill="none" stroke="%234682B4" stroke-width="1" opacity="0.2"/><path d="M40 25C35 30 35 40 40 40C45 40 45 30 40 25z" fill="%234682B4" opacity="0.15"/><path d="M55 40C50 35 40 35 40 40C40 45 50 45 55 40z" fill="%234682B4" opacity="0.15"/><path d="M40 55C45 50 45 40 40 40C35 40 35 50 40 55z" fill="%234682B4" opacity="0.15"/><path d="M25 40C30 45 40 45 40 40C40 35 30 35 25 40z" fill="%234682B4" opacity="0.15"/></svg>',
      description: 'Traditional Portuguese floral azulejo tile pattern',
      usage: 'Decorative backgrounds for Portuguese cultural content'
    }
  },
  nautical: {
    compass: {
      name: 'Navigation Compass',
      pattern: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f8fafc"/><circle cx="50" cy="50" r="40" fill="none" stroke="%23D4A574" stroke-width="2" opacity="0.3"/><path d="M50 10L55 45L50 50L45 45z" fill="%23DC143C" opacity="0.4"/><path d="M90 50L55 55L50 50L55 45z" fill="%23D4A574" opacity="0.4"/><path d="M50 90L45 55L50 50L55 55z" fill="%23DC143C" opacity="0.4"/><path d="M10 50L45 45L50 50L45 55z" fill="%23D4A574" opacity="0.4"/></svg>',
      description: 'Portuguese Age of Discovery navigation compass pattern',
      usage: 'Heritage backgrounds for Portuguese exploration themes'
    },
    rope: {
      name: 'Maritime Rope',
      pattern: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><rect width="40" height="40" fill="%23f8fafc"/><path d="M0 20Q10 10 20 20T40 20" fill="none" stroke="%23D4A574" stroke-width="2" opacity="0.2"/><path d="M0 0Q10 10 20 0T40 0" fill="none" stroke="%23D4A574" stroke-width="1" opacity="0.1"/><path d="M0 40Q10 30 20 40T40 40" fill="none" stroke="%23D4A574" stroke-width="1" opacity="0.1"/></svg>',
      description: 'Portuguese maritime rope pattern',
      usage: 'Nautical-themed Portuguese cultural elements'
    }
  }
};

// Mobile Gesture Patterns (Portuguese Cultural Context)
export const MOBILE_GESTURE_PATTERNS = {
  swipe: {
    horizontal: {
      name: 'Horizontal Swipe',
      description: 'Swipe left/right for Portuguese content navigation',
      usage: 'Event browsing, Portuguese business directory navigation',
      culturalContext: 'Natural for browsing Portuguese cultural events'
    },
    vertical: {
      name: 'Vertical Swipe',
      description: 'Swipe up/down for Portuguese content scrolling',
      usage: 'Feed scrolling, Portuguese community updates',
      culturalContext: 'Standard for Portuguese social content consumption'
    }
  },
  pinch: {
    zoom: {
      name: 'Pinch to Zoom',
      description: 'Zoom in/out on Portuguese cultural images',
      usage: 'Photo galleries, Portuguese cultural event images',
      culturalContext: 'Essential for viewing detailed Portuguese cultural artwork'
    }
  },
  tap: {
    single: {
      name: 'Single Tap',
      description: 'Primary interaction for Portuguese content',
      usage: 'Button presses, Portuguese cultural element selection',
      culturalContext: 'Primary interaction pattern for Portuguese community'
    },
    double: {
      name: 'Double Tap',
      description: 'Quick actions on Portuguese content',
      usage: 'Like Portuguese posts, favorite Portuguese events',
      culturalContext: 'Express appreciation for Portuguese cultural content'
    }
  },
  longPress: {
    contextual: {
      name: 'Long Press',
      description: 'Context menu for Portuguese content options',
      usage: 'Portuguese content sharing, cultural element options',
      culturalContext: 'Access Portuguese cultural sharing options'
    }
  }
};

// Accessibility Tokens (Portuguese Community Focus)
export const ACCESSIBILITY_TOKENS = {
  contrast: {
    minimum: { value: '4.5:1', usage: 'WCAG AA compliance for Portuguese text' },
    enhanced: { value: '7:1', usage: 'WCAG AAA compliance for Portuguese cultural content' }
  },
  focus: {
    ring: { value: '2px solid #DC143C', usage: 'Portuguese heritage focus indicators' },
    offset: { value: '2px', usage: 'Focus ring offset for Portuguese elements' }
  },
  motion: {
    reducedMotion: { value: 'prefers-reduced-motion: reduce', usage: 'Respect user motion preferences' },
    respectMotion: { value: 'motion-safe', usage: 'Safe motion for Portuguese cultural animations' }
  }
};

export default PORTUGUESE_MOBILE_DESIGN_TOKENS;