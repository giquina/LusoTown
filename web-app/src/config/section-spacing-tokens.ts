/**
 * Section Spacing Design Tokens
 * 
 * Consistent vertical spacing system for Portuguese community platform
 * Implements 80px-120px major section spacing with responsive scaling
 * Preserves cultural visual hierarchy and Portuguese content flow
 */

export interface SectionSpacing {
  name: string;
  desktop: string;
  tablet: string;
  mobile: string;
  description: string;
  usage: string;
  culturalContext?: string;
}

export interface ComponentSpacing {
  name: string;
  value: string;
  responsive: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  description: string;
  usage: string;
}

// Major Section Spacing Tokens (Portuguese Cultural Hierarchy)
export const SECTION_SPACING_TOKENS = {
  
  // Major Section Vertical Spacing
  sections: {
    hero: {
      name: 'Hero Section',
      desktop: 'py-24 lg:py-32', // 96px-128px
      tablet: 'py-20 md:py-24', // 80px-96px
      mobile: 'py-16', // 64px
      description: 'Hero section vertical padding with Portuguese cultural emphasis',
      usage: 'Homepage hero, major landing page sections',
      culturalContext: 'Prominent spacing for Portuguese community welcome and cultural pride'
    },
    primary: {
      name: 'Primary Section',
      desktop: 'py-20 lg:py-24', // 80px-96px
      tablet: 'py-16 md:py-20', // 64px-80px
      mobile: 'py-12', // 48px
      description: 'Primary content section spacing',
      usage: 'Main content sections, Portuguese community features',
      culturalContext: 'Balanced spacing for Portuguese cultural content consumption'
    },
    secondary: {
      name: 'Secondary Section',
      desktop: 'py-16 lg:py-20', // 64px-80px
      tablet: 'py-12 md:py-16', // 48px-64px
      mobile: 'py-10', // 40px
      description: 'Secondary content section spacing',
      usage: 'Supporting sections, Portuguese community testimonials',
      culturalContext: 'Comfortable spacing for Portuguese cultural storytelling'
    },
    compact: {
      name: 'Compact Section',
      desktop: 'py-12 lg:py-16', // 48px-64px
      tablet: 'py-10 md:py-12', // 40px-48px
      mobile: 'py-8', // 32px
      description: 'Compact section spacing for dense content',
      usage: 'Feature lists, Portuguese business directory, event cards',
      culturalContext: 'Efficient spacing for Portuguese community browsing patterns'
    }
  } as Record<string, SectionSpacing>,

  // Component-to-Component Spacing
  components: {
    between: {
      name: 'Component Separation',
      value: 'mb-8 lg:mb-12', // 32px-48px
      responsive: {
        mobile: 'mb-6', // 24px
        tablet: 'mb-8', // 32px
        desktop: 'mb-12' // 48px
      },
      description: 'Vertical spacing between major components',
      usage: 'Cards, testimonials, Portuguese cultural components'
    },
    group: {
      name: 'Component Group',
      value: 'mb-12 lg:mb-16', // 48px-64px
      responsive: {
        mobile: 'mb-8', // 32px
        tablet: 'mb-12', // 48px
        desktop: 'mb-16' // 64px
      },
      description: 'Spacing between component groups',
      usage: 'Feature sections, Portuguese community showcase groups'
    },
    major: {
      name: 'Major Component Break',
      value: 'mb-16 lg:mb-24', // 64px-96px
      responsive: {
        mobile: 'mb-12', // 48px
        tablet: 'mb-16', // 64px
        desktop: 'mb-24' // 96px
      },
      description: 'Major visual break between content areas',
      usage: 'Between hero and features, Portuguese cultural transitions'
    }
  } as Record<string, ComponentSpacing>,

  // Content Area Spacing
  content: {
    header: {
      name: 'Section Header',
      value: 'mb-12 lg:mb-16', // 48px-64px
      responsive: {
        mobile: 'mb-8', // 32px
        tablet: 'mb-12', // 48px
        desktop: 'mb-16' // 64px
      },
      description: 'Spacing below section headers and titles',
      usage: 'After h1, h2 headings in Portuguese cultural sections'
    },
    paragraph: {
      name: 'Paragraph Spacing',
      value: 'mb-4 lg:mb-6', // 16px-24px
      responsive: {
        mobile: 'mb-4', // 16px
        tablet: 'mb-4', // 16px
        desktop: 'mb-6' // 24px
      },
      description: 'Spacing between paragraphs in Portuguese content',
      usage: 'Body text, Portuguese community stories, descriptions'
    },
    list: {
      name: 'List Spacing',
      value: 'mb-6 lg:mb-8', // 24px-32px
      responsive: {
        mobile: 'mb-4', // 16px
        tablet: 'mb-6', // 24px
        desktop: 'mb-8' // 32px
      },
      description: 'Spacing around lists and structured content',
      usage: 'Feature lists, Portuguese cultural benefits, community guidelines'
    }
  } as Record<string, ComponentSpacing>,

  // Portuguese Cultural Specific Spacing
  cultural: {
    celebration: {
      name: 'Cultural Celebration',
      desktop: 'py-24 lg:py-32', // 96px-128px
      tablet: 'py-20 md:py-24', // 80px-96px
      mobile: 'py-16', // 64px
      description: 'Spacious padding for Portuguese cultural celebrations',
      usage: 'Festival sections, Portuguese heritage showcases',
      culturalContext: 'Emphasizes importance of Portuguese cultural celebrations'
    },
    heritage: {
      name: 'Heritage Content',
      desktop: 'py-20 lg:py-24', // 80px-96px
      tablet: 'py-16 md:py-20', // 64px-80px
      mobile: 'py-12', // 48px
      description: 'Respectful spacing for Portuguese heritage content',
      usage: 'Historical content, Portuguese cultural education',
      culturalContext: 'Provides breathing room for Portuguese cultural reflection'
    },
    community: {
      name: 'Community Features',
      desktop: 'py-16 lg:py-20', // 64px-80px
      tablet: 'py-12 md:py-16', // 48px-64px
      mobile: 'py-10', // 40px
      description: 'Welcoming spacing for Portuguese community features',
      usage: 'Community testimonials, success stories, member showcases',
      culturalContext: 'Encourages Portuguese community engagement and connection'
    }
  } as Record<string, SectionSpacing>

} as const;

// Utility Classes Generator
export const SPACING_UTILITIES = {
  
  // Generate section spacing classes
  getSectionSpacing: (type: keyof typeof SECTION_SPACING_TOKENS.sections) => {
    const spacing = SECTION_SPACING_TOKENS.sections[type];
    return `${spacing.mobile} ${spacing.tablet} ${spacing.desktop}`;
  },

  // Generate component spacing classes
  getComponentSpacing: (type: keyof typeof SECTION_SPACING_TOKENS.components) => {
    const spacing = SECTION_SPACING_TOKENS.components[type];
    return spacing.value;
  },

  // Generate content spacing classes
  getContentSpacing: (type: keyof typeof SECTION_SPACING_TOKENS.content) => {
    const spacing = SECTION_SPACING_TOKENS.content[type];
    return spacing.value;
  },

  // Generate cultural spacing classes
  getCulturalSpacing: (type: keyof typeof SECTION_SPACING_TOKENS.cultural) => {
    const spacing = SECTION_SPACING_TOKENS.cultural[type];
    return `${spacing.mobile} ${spacing.tablet} ${spacing.desktop}`;
  }

} as const;

// Responsive Spacing Mixins for CSS-in-JS
export const RESPONSIVE_SPACING = {
  
  // Major section padding mixin
  sectionPadding: {
    paddingTop: '3rem', // 48px mobile
    paddingBottom: '3rem',
    '@media (min-width: 768px)': {
      paddingTop: '4rem', // 64px tablet
      paddingBottom: '4rem',
    },
    '@media (min-width: 1024px)': {
      paddingTop: '5rem', // 80px desktop
      paddingBottom: '5rem',
    },
    '@media (min-width: 1280px)': {
      paddingTop: '6rem', // 96px large desktop
      paddingBottom: '6rem',
    }
  },

  // Hero section padding mixin
  heroPadding: {
    paddingTop: '4rem', // 64px mobile
    paddingBottom: '4rem',
    '@media (min-width: 768px)': {
      paddingTop: '5rem', // 80px tablet
      paddingBottom: '5rem',
    },
    '@media (min-width: 1024px)': {
      paddingTop: '6rem', // 96px desktop
      paddingBottom: '6rem',
    },
    '@media (min-width: 1280px)': {
      paddingTop: '8rem', // 128px large desktop
      paddingBottom: '8rem',
    }
  },

  // Component margin mixin
  componentMargin: {
    marginBottom: '2rem', // 32px mobile
    '@media (min-width: 768px)': {
      marginBottom: '3rem', // 48px tablet
    },
    '@media (min-width: 1024px)': {
      marginBottom: '4rem', // 64px desktop
    }
  }

} as const;

// Portuguese Cultural Spacing Guidelines
export const CULTURAL_SPACING_GUIDELINES = {
  
  principles: [
    'Use generous spacing to reflect Portuguese hospitality and welcoming nature',
    'Allow breathing room for Portuguese cultural content to be properly appreciated',
    'Scale spacing appropriately for mobile-heavy Portuguese community usage patterns',
    'Maintain visual hierarchy that emphasizes Portuguese cultural authenticity',
    'Provide comfortable reading experience for longer Portuguese text translations'
  ],

  usage: {
    celebrations: 'Use celebration spacing for Portuguese festivals and cultural events',
    heritage: 'Apply heritage spacing to educational and historical Portuguese content',
    community: 'Utilize community spacing for social features and member interactions',
    business: 'Implement compact spacing for business directory and practical content'
  },

  accessibility: [
    'Minimum 44px touch targets with 8px spacing for Portuguese elderly users',
    'Adequate line height (1.5-1.6) for Portuguese diacritical marks readability',
    'Clear visual separation between Portuguese and English content sections',
    'Comfortable reading distance for Portuguese community mobile usage patterns'
  ]

} as const;