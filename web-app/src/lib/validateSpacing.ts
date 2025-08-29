/**
 * Spacing Validation Utility
 * 
 * Validates consistent 80px-120px vertical spacing implementation
 * across Portuguese community platform pages
 */

export interface SpacingAnalysis {
  page: string;
  sections: {
    element: string;
    currentSpacing: string;
    recommendedSpacing: string;
    isConsistent: boolean;
  }[];
  score: number; // 0-100 consistency score
}

// Target spacing patterns for Portuguese cultural sections
export const PORTUGUESE_SPACING_PATTERNS = {
  hero: 'py-16 md:py-20 lg:py-24 xl:py-32', // 64px-128px
  primary: 'py-12 md:py-16 lg:py-20 xl:py-24', // 48px-96px  
  secondary: 'py-10 md:py-12 lg:py-16 xl:py-20', // 40px-80px
  compact: 'py-8 md:py-10 lg:py-12 xl:py-16', // 32px-64px
  celebration: 'py-16 md:py-20 lg:py-24 xl:py-32', // Same as hero
} as const;

// Component spacing patterns
export const COMPONENT_SPACING_PATTERNS = {
  between: 'mb-6 md:mb-8 lg:mb-12', // 24px-48px
  group: 'mb-8 md:mb-12 lg:mb-16', // 32px-64px
  major: 'mb-12 md:mb-16 lg:mb-24', // 48px-96px
} as const;

/**
 * Analyzes spacing consistency across Portuguese community pages
 */
export function analyzePageSpacing(pageContent: string, pageName: string): SpacingAnalysis {
  const sections: SpacingAnalysis['sections'] = [];
  
  // Extract section elements with spacing
  const sectionRegex = /<section[^>]*className="([^"]*)"[^>]*>/g;
  let match;
  
  while ((match = sectionRegex.exec(pageContent)) !== null) {
    const className = match[1];
    const spacing = extractSpacingClasses(className);
    
    if (spacing.length > 0) {
      const recommendation = recommendSpacing(className);
      sections.push({
        element: match[0],
        currentSpacing: spacing.join(' '),
        recommendedSpacing: recommendation,
        isConsistent: isSpacingConsistent(spacing.join(' '), recommendation)
      });
    }
  }
  
  // Calculate consistency score
  const consistentSections = sections.filter(s => s.isConsistent).length;
  const score = sections.length > 0 ? (consistentSections / sections.length) * 100 : 100;
  
  return {
    page: pageName,
    sections,
    score: Math.round(score)
  };
}

/**
 * Extracts spacing-related CSS classes
 */
function extractSpacingClasses(className: string): string[] {
  const spacingPattern = /(?:py-|pt-|pb-|mt-|mb-|my-)\d+(?:\s+(?:md|lg|xl):[pm][ybt]-\d+)*/g;
  return className.match(spacingPattern) || [];
}

/**
 * Recommends appropriate spacing based on section content and context
 */
function recommendSpacing(className: string): string {
  // Hero sections - prominent Portuguese cultural content
  if (className.includes('hero') || 
      className.includes('gradient-to-br from-primary') ||
      className.includes('min-h-[600px]')) {
    return PORTUGUESE_SPACING_PATTERNS.hero;
  }
  
  // Celebration sections - Portuguese festivals and heritage
  if (className.includes('celebration') ||
      className.includes('cultural') ||
      className.includes('heritage')) {
    return PORTUGUESE_SPACING_PATTERNS.celebration;
  }
  
  // Primary content sections
  if (className.includes('bg-gradient-to-br') && 
      !className.includes('compact')) {
    return PORTUGUESE_SPACING_PATTERNS.primary;
  }
  
  // Compact sections - business directory, lists
  if (className.includes('compact') ||
      className.includes('directory') ||
      className.includes('grid')) {
    return PORTUGUESE_SPACING_PATTERNS.compact;
  }
  
  // Default to secondary spacing
  return PORTUGUESE_SPACING_PATTERNS.secondary;
}

/**
 * Checks if current spacing matches recommended spacing
 */
function isSpacingConsistent(current: string, recommended: string): boolean {
  // Normalize spacing classes for comparison
  const normalizeCurrent = normalizeSpacing(current);
  const normalizeRecommended = normalizeSpacing(recommended);
  
  return normalizeCurrent === normalizeRecommended;
}

/**
 * Normalizes spacing classes for consistent comparison
 */
function normalizeSpacing(spacing: string): string {
  return spacing
    .split(' ')
    .filter(cls => cls.match(/^(?:py-|pt-|pb-)\d+$/) || cls.match(/^(?:md|lg|xl):(?:py-|pt-|pb-)\d+$/))
    .sort()
    .join(' ');
}

/**
 * Generates spacing improvement recommendations
 */
export function generateSpacingReport(analyses: SpacingAnalysis[]): {
  overallScore: number;
  recommendations: string[];
  priorityUpdates: { page: string; section: string; fix: string }[];
} {
  const totalScore = analyses.reduce((sum, analysis) => sum + analysis.score, 0);
  const overallScore = analyses.length > 0 ? Math.round(totalScore / analyses.length) : 100;
  
  const recommendations: string[] = [
    '🎯 Target 80px-120px vertical spacing between major sections',
    '📱 Ensure mobile scaling: 48px → 64px → 80px → 96px across breakpoints',
    '🇵🇹 Use hero spacing (py-16 md:py-20 lg:py-24 xl:py-32) for Portuguese cultural celebrations',
    '⚡ Apply primary spacing (py-12 md:py-16 lg:py-20 xl:py-24) for main community content',
    '📋 Use compact spacing (py-8 md:py-10 lg:py-12 xl:py-16) for business directory and dense content',
  ];
  
  const priorityUpdates: { page: string; section: string; fix: string }[] = [];
  
  analyses.forEach(analysis => {
    analysis.sections
      .filter(section => !section.isConsistent)
      .forEach(section => {
        priorityUpdates.push({
          page: analysis.page,
          section: section.currentSpacing,
          fix: `Update to: ${section.recommendedSpacing}`
        });
      });
  });
  
  return {
    overallScore,
    recommendations,
    priorityUpdates: priorityUpdates.slice(0, 10) // Top 10 priority fixes
  };
}

/**
 * Portuguese Cultural Spacing Guidelines
 */
export const CULTURAL_SPACING_GUIDELINES = {
  principles: [
    'Generous spacing reflects Portuguese hospitality and welcoming nature',
    'Breathing room allows proper appreciation of Portuguese cultural content', 
    'Mobile-first scaling accommodates Portuguese community mobile usage patterns',
    'Visual hierarchy emphasizes Portuguese cultural authenticity',
    'Comfortable reading experience for longer Portuguese text translations'
  ],
  
  usage: {
    celebrations: 'py-16 md:py-20 lg:py-24 xl:py-32 for Portuguese festivals and cultural events',
    heritage: 'py-12 md:py-16 lg:py-20 xl:py-24 for educational and historical Portuguese content',
    community: 'py-10 md:py-12 lg:py-16 xl:py-20 for social features and member interactions',
    business: 'py-8 md:py-10 lg:py-12 xl:py-16 for business directory and practical content'
  },
  
  accessibility: [
    'Minimum 44px touch targets with adequate spacing for Portuguese elderly users',
    'Line height 1.5-1.6 for Portuguese diacritical marks readability',
    'Clear visual separation between Portuguese and English content sections',
    'Comfortable reading distance for Portuguese community mobile usage patterns'
  ]
} as const;