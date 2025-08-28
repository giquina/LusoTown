/**
 * Community Guidelines for Lusophone-Speaking Community Platform
 * 
 * This file contains essential guidelines for maintaining inclusivity and proper
 * representation of the Portuguese-speaking community from all lusophone nations.
 */

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
      'Lusophone community', // excludes Brazilian, Cape Verdean, etc.
      'Portuguese speakers community', // grammatically incorrect
      'Lusophone people' // excludes non-Lusophone lusophone speakers
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

export const HERO_SECTION_TEMPLATE = {
  // Template for inclusive hero sections
  title: 'Your Lusophone-Speaking Community in the United Kingdom',
  
  // Activity examples that must rotate through different nations
  liveActivityExamples: [
    '🎵 Fado Night tomorrow - 12 spots left (Portugal)',
    '🇧🇷 Festa Junina Brasileira this weekend - Brazilian June Festival',
    '🇨🇻 Noite de Morna next week - Cape Verdean Music Evening',
    '💼 Lusophone-Speaking Business Mixer - All backgrounds welcome',
    '🍽️ Lusophone Food Market - Lusophone, Brazilian & Cape Verdean cuisine'
  ],
  
  // Geographic scope
  scope: 'United Kingdom', // Never just 'London'
  
  // Community size reference
  communityReference: 'Portuguese speakers from all lusophone nations'
} as const;

// Usage examples for developers
export const USAGE_EXAMPLES = {
  correct: {
    title: 'Join 1,247 Lusophone Speakers in the United Kingdom',
    community: 'Portuguese-speaking community from Portugal, Brazil, Cape Verde & more',
    events: 'Events from all Portuguese-speaking nations across the United Kingdom'
  },
  
  incorrect: {
    title: 'Join 1,247 Lusophone Speakers in London', // Too London-centric
    community: 'Lusophone community', // Excludes other lusophone nations
    events: 'Lusophone events only' // Lacks diversity
  }
} as const;

/**
 * Validation function to check if content follows inclusivity guidelines
 */
export function validateContentInclusivity(content: string): {
  isValid: boolean;
  issues: string[];
  suggestions: string[];
} {
  const issues: string[] = [];
  const suggestions: string[] = [];
  
  // Check for London-centric language when should be United Kingdom-wide
  if (content.includes('in London') && !content.includes('United Kingdom')) {
    issues.push('Content is London-centric - should reference United Kingdom');
    suggestions.push('Replace "in London" with "in the United Kingdom" or "across the United Kingdom"');
  }
  
  // Check for exclusive Lusophone terminology
  if (content.includes('Lusophone community') && !content.includes('Portuguese-speaking')) {
    issues.push('Uses exclusive terminology that may exclude other lusophone speakers');
    suggestions.push('Use "Portuguese-speaking community" instead of "Lusophone community"');
  }
  
  // Check for event diversity
  const hasPortugalEvents = /fado|santos populares|são joão/i.test(content);
  const hasBrazilEvents = /festa junina|brazilian/i.test(content);
  const hasCapeVerdeEvents = /morna|cape verd/i.test(content);
  
  if (hasPortugalEvents && !hasBrazilEvents && !hasCapeVerdeEvents) {
    issues.push('Content only shows Lusophone events - should include diverse lusophone events');
    suggestions.push('Add events from Brazil, Cape Verde, Angola, or Mozambique');
  }
  
  return {
    isValid: issues.length === 0,
    issues,
    suggestions
  };
}

// Community Statistics
export const COMMUNITY_STATS = {
  totalMembers: 750,
  totalStudents: 2150,
  universityPartnerships: 8,
  activeEventTypes: 12,
  supportedLanguages: 2, // Portuguese and English
  lusophonieCountries: 8
};

// Cultural Centers (basic configuration)
export const CULTURAL_CENTERS = {
  london: {
    name: "Portuguese Cultural Centre London",
    address: "Camden, London",
    activities: ["Fado nights", "Portuguese classes", "Cultural events"],
    contact: "info@portuguese-london.org"
  },
  manchester: {
    name: "Portuguese Community Centre Manchester", 
    address: "Manchester",
    activities: ["Community meetings", "Cultural celebrations"],
    contact: "info@portuguese-manchester.org"
  },
  birmingham: {
    name: "Portuguese Association Birmingham",
    address: "Birmingham", 
    activities: ["Portuguese festivals", "Business networking"],
    contact: "info@portuguese-birmingham.org"
  }
};