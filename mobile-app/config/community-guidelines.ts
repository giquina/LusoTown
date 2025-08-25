/**
 * Portuguese-speaking Community Guidelines for Mobile App
 * Imported from web-app/src/config/community-guidelines.ts
 * Following LusoTown's zero hardcoding policy
 */

// Import Portuguese-speaking community guidelines from web app
export const COMMUNITY_INCLUSIVITY_GUIDELINES = {
  // Language and Community References
  terminology: {
    // ✅ USE: Inclusive terms
    preferred: [
      'Portuguese-speaking community',
      'Portuguese speakers', 
      'lusophone community',
      'Portuguese-speaking nations'
    ],
    
    // ❌ AVOID: Exclusive terms
    avoid: [
      'Portuguese community', // excludes Brazilian, Cape Verdean, etc.
      'Portuguese speakers community', // grammatically incorrect
      'Lusophone people' // excludes non-Portuguese lusophone speakers
    ]
  },

  // Geographic Scope
  geography: {
    // ✅ USE: Inclusive geographic terms
    preferred: 'United Kingdom',
    
    // ❌ AVOID: London-centric language
    avoid: 'London' // when referring to platform scope
  },

  // Event and Activity Representation
  events: {
    // Must represent diverse Portuguese-speaking nations
    requiredRepresentation: [
      {
        country: 'Portugal',
        examples: ['Fado nights', 'Santos Populares', 'São João festivals', 'Portuguese traditional music']
      },
      {
        country: 'Brazil', 
        examples: ['Festa Junina', 'Brazilian cultural events', 'Capoeira workshops', 'Brazilian music nights']
      },
      {
        country: 'Cape Verde',
        examples: ['Noite de Morna', 'Cape Verdean music evenings', 'Cabo Verde cultural celebrations']
      },
      {
        country: 'Angola',
        examples: ['Angolan cultural events', 'Kizomba dance nights', 'Angolan music celebrations']
      },
      {
        country: 'Mozambique',
        examples: ['Mozambican cultural festivals', 'Marrabenta music events']
      }
    ],

    // Event mixing strategy
    displayStrategy: 'Always show events from multiple Portuguese-speaking nations in hero sections, activity feeds, and promotional content'
  },

  // User Testimonials and Examples
  userRepresentation: {
    // Must include diverse backgrounds
    examples: [
      { name: 'Maria', location: 'Vauxhall', country: 'Brazil' },
      { name: 'Pedro', location: 'Manchester', country: 'Portugal' },
      { name: 'Carla', location: 'Birmingham', country: 'Cape Verde' },
      { name: 'João', location: 'Edinburgh', country: 'Portugal' },
      { name: 'Ana', location: 'Bristol', country: 'Angola' }
    ]
  },

  // Flag and Visual Representation
  visualElements: {
    // Use flags from all major Portuguese-speaking nations
    flags: '🇵🇹🇧🇷🇨🇻🇦🇴🇲🇿',
    
    // Color schemes should not favor one nation
    colorGuidance: 'Use Portuguese heritage colors as defined in brand.ts, which represent the shared Portuguese language heritage'
  }
} as const;

export const MOBILE_HERO_TEMPLATE = {
  // Template for inclusive mobile hero sections
  title: 'Your Portuguese-Speaking Community in the United Kingdom',
  
  // Activity examples that must rotate through different nations
  liveActivityExamples: [
    '🎵 Fado Night tomorrow - 12 spots left (Portugal)',
    '🇧🇷 Festa Junina Brasileira this weekend - Brazilian June Festival',
    '🇨🇻 Noite de Morna next week - Cape Verdean Music Evening',
    '💼 Portuguese-Speaking Business Mixer - All backgrounds welcome',
    '🍽️ Portuguese Food Market - Portuguese, Brazilian & Cape Verdean cuisine'
  ],
  
  // Geographic scope
  scope: 'United Kingdom', // Never just 'London'
  
  // Community size reference
  communityReference: 'Portuguese speakers from all lusophone nations'
} as const;

// Mobile-specific usage examples
export const MOBILE_USAGE_EXAMPLES = {
  correct: {
    pushNotification: 'New Portuguese-speaking event in Manchester!',
    matchDescription: 'Portuguese speaker from Brazil in Birmingham',
    eventCategory: 'Portuguese-speaking cultural events across United Kingdom'
  },
  
  incorrect: {
    pushNotification: 'New Portuguese event in London!', // Too London-centric
    matchDescription: 'Portuguese person nearby', // Lacks cultural specificity
    eventCategory: 'Portuguese events only' // Excludes other lusophone nations
  }
} as const;

/**
 * Mobile-specific validation function for Portuguese-speaking community content
 */
export function validateMobileContentInclusivity(content: string): {
  isValid: boolean;
  issues: string[];
  suggestions: string[];
} {
  const issues: string[] = [];
  const suggestions: string[] = [];
  
  // Check for London-centric language in mobile contexts
  if (content.includes('in London') && !content.includes('United Kingdom')) {
    issues.push('Mobile content is London-centric - should reference United Kingdom');
    suggestions.push('Replace "in London" with "in the United Kingdom" or use user location');
  }
  
  // Check for exclusive Portuguese terminology in mobile notifications
  if (content.includes('Portuguese community') && !content.includes('Portuguese-speaking')) {
    issues.push('Uses exclusive terminology in mobile context');
    suggestions.push('Use "Portuguese-speaking community" for mobile notifications and messages');
  }
  
  // Check for cultural diversity in mobile event listings
  const hasPortugalContent = /fado|santos populares|são joão/i.test(content);
  const hasBrazilContent = /festa junina|brazilian|capoeira/i.test(content);
  const hasCapeVerdeContent = /morna|cape verd/i.test(content);
  
  if (hasPortugalContent && !hasBrazilContent && !hasCapeVerdeContent) {
    issues.push('Mobile event content only shows Portuguese events - should include diverse lusophone events');
    suggestions.push('Add events from Brazil, Cape Verde, Angola, or Mozambique to mobile feed');
  }
  
  return {
    isValid: issues.length === 0,
    issues,
    suggestions
  };
}

// Mobile app Portuguese heritage options
export const MOBILE_HERITAGE_OPTIONS = [
  { value: 'portugal', label: 'Portugal', flag: '🇵🇹' },
  { value: 'brazil', label: 'Brazil', flag: '🇧🇷' },
  { value: 'cape-verde', label: 'Cape Verde', flag: '🇨🇻' },
  { value: 'angola', label: 'Angola', flag: '🇦🇴' },
  { value: 'mozambique', label: 'Mozambique', flag: '🇲🇿' },
  { value: 'sao-tome-principe', label: 'São Tomé & Príncipe', flag: '🇸🇹' },
  { value: 'guinea-bissau', label: 'Guinea-Bissau', flag: '🇬🇼' },
  { value: 'east-timor', label: 'East Timor', flag: '🇹🇱' },
  { value: 'macau', label: 'Macau', flag: '🇲🇴' },
  { value: 'mixed', label: 'Mixed Portuguese Heritage', flag: '🌍' },
  { value: 'other', label: 'Portuguese-speaking (Other)', flag: '🌐' },
] as const;

export default COMMUNITY_INCLUSIVITY_GUIDELINES;