// 🇵🇹 LusoTown Mobile - Portuguese Cultural Imagery Standards
// Comprehensive imagery system for authentic Lusophone representation

/**
 * Portuguese Cultural Imagery Standards
 * High-quality photography standards celebrating Portuguese-speaking heritage
 * Authentic representation across all 8 Portuguese-speaking nations
 */

// Image Quality Standards
export const IMAGE_QUALITY_STANDARDS = {
  // Resolution requirements
  resolution: {
    mobile_hero: { width: 375, height: 200, quality: 85 },      // Mobile hero images
    mobile_card: { width: 343, height: 200, quality: 80 },      // Mobile card images
    mobile_thumbnail: { width: 150, height: 150, quality: 75 }, // Mobile thumbnails
    mobile_profile: { width: 120, height: 120, quality: 80 },   // Profile images
    mobile_icon: { width: 48, height: 48, quality: 90 },        // App icons
    mobile_splash: { width: 375, height: 812, quality: 85 }     // Splash screens
  },
  
  // File format preferences
  formats: {
    photography: ['webp', 'jpg'],        // Photography
    illustrations: ['webp', 'png'],      // Illustrations with transparency
    icons: ['svg', 'png'],               // Vector icons preferred
    backgrounds: ['webp', 'jpg']         // Background images
  },
  
  // Compression standards
  compression: {
    high_quality: 90,      // Hero images, featured content
    standard: 85,          // Regular content images
    optimized: 80,         // Card images, thumbnails
    compressed: 75         // List images, background images
  }
} as const;

// Portuguese Cultural Photography Standards
export const PORTUGUESE_PHOTOGRAPHY_STANDARDS = {
  // Heritage Photography - Portugal Mainland
  portugal: {
    architecture: {
      subjects: ['Azulejo tiles', 'Manueline architecture', 'Portuguese castles', 'Traditional quintas'],
      style: 'Architectural detail focus with cultural context',
      lighting: 'Golden hour preferred, highlighting Portuguese architectural beauty',
      composition: 'Emphasize intricate details and Portuguese craftsmanship'
    },
    
    cultural_events: {
      subjects: ['Santos Populares festivals', 'Fado performances', 'Traditional markets', 'Religious processions'],
      style: 'Candid moments capturing authentic Portuguese cultural celebrations',
      lighting: 'Natural light preferred, capture authentic atmosphere',
      composition: 'Include people enjoying culture, community participation'
    },
    
    landscape: {
      subjects: ['Douro Valley', 'Portuguese coastline', 'Traditional villages', 'Wine regions'],
      style: 'Landscape photography emphasizing Portuguese natural beauty',
      lighting: 'Golden hour and blue hour for dramatic Portuguese landscapes',
      composition: 'Showcase Portugal\'s diverse geography and natural heritage'
    },
    
    food_culture: {
      subjects: ['Traditional Portuguese dishes', 'Local markets', 'Wine tasting', 'Pastéis de nata'],
      style: 'Food photography emphasizing Portuguese culinary traditions',
      lighting: 'Soft natural lighting showcasing food authentically',
      composition: 'Include cultural context, traditional settings, Portuguese tableware'
    }
  },
  
  // Brazilian Cultural Photography
  brazil: {
    cultural_diversity: {
      subjects: ['Samba celebrations', 'Brazilian festivals', 'Regional cultures', 'Music performances'],
      style: 'Vibrant photography celebrating Brazilian cultural diversity',
      lighting: 'Bright, energetic lighting matching Brazilian cultural vibrancy',
      composition: 'Include diverse Brazilian communities, regional variations'
    },
    
    business_success: {
      subjects: ['Brazilian professionals', 'Business achievements', 'Cultural entrepreneurs'],
      style: 'Professional photography with Brazilian cultural pride',
      lighting: 'Professional lighting emphasizing success and achievement',
      composition: 'Confident poses with subtle Brazilian cultural elements'
    }
  },
  
  // PALOP Cultural Photography Standards
  palop: {
    // Angola 🇦🇴 - Diamond Heritage and Kizomba Culture
    angola: {
      diamond_heritage: {
        subjects: ['Ethical diamond displays', 'Traditional jewelry', 'Cultural craftsmanship'],
        style: 'Luxury photography emphasizing Angolan diamond excellence',
        lighting: 'Professional lighting highlighting diamond brilliance and cultural value',
        composition: 'Elegant displays with Angolan cultural context and heritage elements'
      },
      
      kizomba_culture: {
        subjects: ['Kizomba dance instruction', 'Partner dancing', 'Cultural music', 'Dance community'],
        style: 'Movement photography capturing Kizomba\'s sensual and cultural essence',
        lighting: 'Warm lighting emphasizing connection and cultural intimacy',
        composition: 'Focus on partnership, cultural learning, and Angolan dance tradition'
      },
      
      cultural_community: {
        subjects: ['Angolan community events', 'Cultural preservation', 'Heritage celebrations'],
        style: 'Community photography celebrating Angolan heritage and achievements',
        lighting: 'Natural community lighting emphasizing authentic cultural moments',
        composition: 'Include multiple generations, cultural pride, community achievement'
      }
    },
    
    // Cape Verde 🇨🇻 - Island Culture and Morna Soul
    capeVerde: {
      island_culture: {
        subjects: ['Island landscapes', 'Traditional architecture', 'Coastal communities', 'Maritime heritage'],
        style: 'Island photography emphasizing Cape Verdean natural beauty and cultural adaptation',
        lighting: 'Island lighting - bright coastal light and sunset atmosphere',
        composition: 'Showcase island geography, traditional communities, maritime culture'
      },
      
      morna_music: {
        subjects: ['Morna performances', 'Traditional instruments', 'Musical instruction', 'Emotional expression'],
        style: 'Music photography capturing Morna\'s emotional depth and cultural significance',
        lighting: 'Intimate lighting emphasizing emotional expression and musical tradition',
        composition: 'Focus on musical instruments, emotional performance, cultural teaching'
      },
      
      culinary_tradition: {
        subjects: ['Cachupa preparation', 'Traditional Cape Verdean cuisine', 'Family cooking', 'Island ingredients'],
        style: 'Culinary photography emphasizing Cape Verdean food culture and family traditions',
        lighting: 'Warm kitchen lighting and natural food photography lighting',
        composition: 'Include family preparation, traditional techniques, authentic ingredients'
      }
    },
    
    // Mozambique 🇲🇿 - Coastal Spices and Indian Ocean Heritage
    mozambique: {
      spice_heritage: {
        subjects: ['Peri-peri cultivation', 'Traditional spices', 'Spice preparation', 'Culinary applications'],
        style: 'Spice photography emphasizing Mozambican culinary heritage and coastal flavors',
        lighting: 'Natural lighting showcasing spice colors and traditional preparation',
        composition: 'Include spice sources, traditional preparation, cultural culinary context'
      },
      
      coastal_culture: {
        subjects: ['Indian Ocean coastline', 'Traditional fishing', 'Coastal communities', 'Maritime trade'],
        style: 'Coastal photography emphasizing Mozambican maritime heritage and cultural fusion',
        lighting: 'Coastal lighting - bright ocean light and cultural activity',
        composition: 'Showcase coastal communities, traditional activities, cultural blending'
      },
      
      business_excellence: {
        subjects: ['Mozambican entrepreneurs', 'Spice trading', 'Cultural businesses', 'Professional success'],
        style: 'Business photography with Mozambican cultural pride and professional achievement',
        lighting: 'Professional lighting emphasizing business success and cultural heritage',
        composition: 'Confident business poses with Mozambican cultural elements and products'
      }
    },
    
    // Guinea-Bissau 🇬🇼 - Community Arts and Cultural Preservation
    guineaBissau: {
      community_arts: {
        subjects: ['Traditional crafts', 'Community workshops', 'Cultural education', 'Heritage preservation'],
        style: 'Community arts photography emphasizing Guinea-Bissau cultural preservation and education',
        lighting: 'Workshop lighting emphasizing craft detail and community learning',
        composition: 'Include traditional techniques, community participation, cultural knowledge transfer'
      },
      
      cultural_preservation: {
        subjects: ['Cultural storytelling', 'Language preservation', 'Traditional knowledge', 'Community gathering'],
        style: 'Cultural documentation photography preserving Guinea-Bissau heritage and community traditions',
        lighting: 'Natural community lighting emphasizing authentic cultural moments',
        composition: 'Focus on knowledge transfer, community bonds, cultural authenticity'
      }
    },
    
    // São Tomé and Príncipe 🇸🇹 - Cocoa Paradise and Tropical Culture
    saoTome: {
      cocoa_heritage: {
        subjects: ['Cocoa plantations', 'Premium cocoa products', 'Traditional processing', 'Cocoa culture'],
        style: 'Cocoa photography emphasizing São Tomé\'s world-renowned cocoa heritage',
        lighting: 'Tropical plantation lighting and premium product photography',
        composition: 'Include cocoa sources, traditional processing, premium quality products'
      },
      
      tropical_paradise: {
        subjects: ['Tropical landscapes', 'Island biodiversity', 'Paradise atmosphere', 'Natural beauty'],
        style: 'Paradise photography showcasing São Tomé\'s natural tropical beauty',
        lighting: 'Tropical lighting - lush green environments and paradise atmosphere',
        composition: 'Emphasize tropical diversity, island paradise qualities, natural conservation'
      },
      
      cultural_cafe: {
        subjects: ['Café atmosphere', 'Cocoa beverages', 'Cultural experiences', 'Island hospitality'],
        style: 'Café photography emphasizing São Tomé cultural experience and tropical hospitality',
        lighting: 'Warm café lighting with tropical atmosphere',
        composition: 'Include cultural café elements, premium cocoa products, welcoming atmosphere'
      }
    }
  }
} as const;

// Cultural Authenticity Guidelines for Imagery
export const CULTURAL_AUTHENTICITY_GUIDELINES = {
  // General principles for all Portuguese-speaking cultures
  general: {
    representation: {
      diverse: 'Include people from all Portuguese-speaking backgrounds',
      authentic: 'Avoid staged or stereotypical representations',
      respectful: 'Represent cultures with dignity and cultural accuracy',
      contemporary: 'Show modern Portuguese-speaking communities, not just traditional elements'
    },
    
    avoid: [
      'Stereotypical representations',
      'Single-culture dominance',
      'Historical-only imagery',
      'Generic Portuguese imagery for specific cultures',
      'Appropriation of cultural symbols'
    ],
    
    include: [
      'Cultural diversity within Portuguese-speaking community',
      'Modern and traditional elements balanced',
      'Professional and personal achievements',
      'Authentic cultural celebrations and practices',
      'Cross-cultural Portuguese-speaking community interactions'
    ]
  },
  
  // PALOP-specific authenticity requirements
  palop: {
    angola: {
      required: ['Diamond industry heritage', 'Kizomba culture', 'Modern Angolan success'],
      avoid: ['Only historical imagery', 'Stereotypical African representations'],
      represent: 'Modern Angolan excellence, cultural pride, business achievement'
    },
    
    capeVerde: {
      required: ['Island geography', 'Musical heritage', 'Maritime culture'],
      avoid: ['Mainland assumptions', 'Poverty-focused imagery'],
      represent: 'Island beauty, musical culture, community strength'
    },
    
    mozambique: {
      required: ['Coastal heritage', 'Spice culture', 'Portuguese-Arabic cultural fusion'],
      avoid: ['Inland-only imagery', 'Single cultural influence'],
      represent: 'Cultural fusion, coastal excellence, business success'
    },
    
    guineaBissau: {
      required: ['Community focus', 'Cultural preservation', 'Traditional arts'],
      avoid: ['Individual-centric imagery', 'Modern-only representation'],
      represent: 'Community traditions, cultural knowledge, heritage preservation'
    },
    
    saoTome: {
      required: ['Tropical paradise', 'Cocoa heritage', 'Island culture'],
      avoid: ['Continental assumptions', 'Industrial-only imagery'],
      represent: 'Paradise culture, premium cocoa heritage, island hospitality'
    }
  }
} as const;

// Business Photography Standards for Portuguese-speaking Entrepreneurs
export const BUSINESS_PHOTOGRAPHY_STANDARDS = {
  // Professional portrait standards
  professional_portraits: {
    style: 'Professional yet approachable, emphasizing cultural pride and business success',
    lighting: 'Soft professional lighting that flatters all skin tones',
    composition: 'Confident poses with subtle cultural elements',
    backgrounds: 'Professional settings with Portuguese cultural touches',
    attire: 'Professional business attire with optional cultural accessories'
  },
  
  // Business environment photography
  business_environments: {
    restaurants: {
      focus: 'Authentic Portuguese food, warm hospitality, family atmosphere',
      lighting: 'Warm restaurant lighting emphasizing comfort and authenticity',
      composition: 'Include cultural decor, traditional elements, welcoming atmosphere'
    },
    
    services: {
      focus: 'Professional competence, cultural understanding, client service excellence',
      lighting: 'Professional lighting emphasizing expertise and trustworthiness',
      composition: 'Modern professional settings with Portuguese cultural touches'
    },
    
    retail: {
      focus: 'Quality products, cultural authenticity, professional presentation',
      lighting: 'Retail lighting showcasing products and cultural elements',
      composition: 'Organized displays with Portuguese cultural context and quality emphasis'
    },
    
    cultural: {
      focus: 'Heritage preservation, community service, cultural education',
      lighting: 'Natural community lighting emphasizing cultural authenticity',
      composition: 'Include cultural elements, community participation, heritage focus'
    }
  }
} as const;

// Image Optimization for Mobile Performance
export const MOBILE_OPTIMIZATION = {
  // Responsive image sets
  responsive: {
    hero: ['375w', '768w', '1024w'],     // Hero image breakpoints
    card: ['150w', '300w', '600w'],      // Card image breakpoints
    thumbnail: ['75w', '150w', '300w']   // Thumbnail breakpoints
  },
  
  // Progressive loading
  progressive: {
    placeholder: {
      type: 'blur',
      quality: 20,
      size: '10% of final image'
    },
    
    loading: {
      strategy: 'lazy',
      threshold: '100px before viewport',
      fade_in: '300ms ease-in-out'
    }
  },
  
  // Cultural loading states
  cultural_placeholders: {
    portugal: 'azulejo-pattern-blur',
    brazil: 'brazil-colors-blur',
    palop: 'heritage-pattern-blur',
    business: 'professional-blur',
    event: 'celebration-blur'
  }
} as const;

// Image Attribution and Rights Standards
export const IMAGE_RIGHTS_STANDARDS = {
  // Attribution requirements
  attribution: {
    cultural: 'Respect cultural significance and community ownership',
    photographer: 'Credit photographers, especially community members',
    community: 'Acknowledge community participation and cultural heritage',
    business: 'Respect business branding and professional representation'
  },
  
  // Usage permissions
  permissions: {
    required: [
      'Cultural event photography',
      'Business environment photography', 
      'Personal portrait photography',
      'Cultural heritage site photography'
    ],
    
    community_consent: [
      'Community gathering photography',
      'Cultural celebration documentation',
      'Heritage preservation photography',
      'Educational content creation'
    ]
  }
} as const;

// Export consolidated imagery system
export const IMAGERY = {
  quality: IMAGE_QUALITY_STANDARDS,
  photography: PORTUGUESE_PHOTOGRAPHY_STANDARDS,
  authenticity: CULTURAL_AUTHENTICITY_GUIDELINES,
  business: BUSINESS_PHOTOGRAPHY_STANDARDS,
  mobile: MOBILE_OPTIMIZATION,
  rights: IMAGE_RIGHTS_STANDARDS
} as const;

export default IMAGERY;