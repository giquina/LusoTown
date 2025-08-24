/**
 * Partnership Events Configuration
 * Chocolate Kizomba and other cultural partnerships integration
 */

export interface PartnershipEvent {
  id: string
  name: string
  partnerName: string
  description: string
  location: string
  schedule: string
  socialHandle?: string
  website?: string
  memberBenefits: string[]
  eventTypes: PartnershipEventType[]
  skillLevels?: string[]
  culturalFocus: string[]
  targetAudience: ('business' | 'social' | 'cultural' | 'dance' | 'music')[]
  priceRange: 'free' | 'low' | 'medium' | 'premium'
  bookingRequired: boolean
  lusoTownDiscount?: number
}

export interface PartnershipEventType {
  type: string
  frequency: 'daily' | 'weekly' | 'monthly' | 'seasonal'
  duration: string
  capacity?: number
  beginnerFriendly: boolean
}

export const PARTNERSHIP_EVENTS: PartnershipEvent[] = [
  {
    id: 'chocolate-kizomba',
    name: 'Chocolate Kizomba Nights',
    partnerName: 'Chocolate Kizomba',
    description: 'Experience authentic Angolan Kizomba dance in London\'s most welcoming environment. Every Tuesday & Thursday nights featuring live music, cultural education, and post-dance networking.',
    location: 'One Regents Street, London W1B 5HA',
    schedule: 'Tuesday & Thursday, 8pm-Late',
    socialHandle: '@chocolatekizomba',
    website: 'https://chocolatekizomba.com',
    memberBenefits: [
      'Beginner-friendly sessions with patient instructors',
      'Post-dance networking with Portuguese-speaking community',
      'Cultural education about Angolan dance traditions',
      'Professional dance progression tracking',
      'Access to special Kizomba events and workshops'
    ],
    eventTypes: [
      {
        type: 'Beginner Workshop',
        frequency: 'weekly',
        duration: '90 minutes',
        capacity: 30,
        beginnerFriendly: true
      },
      {
        type: 'Social Dancing',
        frequency: 'weekly',
        duration: '3 hours',
        beginnerFriendly: true
      },
      {
        type: 'Advanced Techniques',
        frequency: 'monthly',
        duration: '2 hours',
        capacity: 20,
        beginnerFriendly: false
      }
    ],
    skillLevels: ['beginner', 'intermediate', 'advanced'],
    culturalFocus: ['angolan-heritage', 'kizomba-dance', 'african-music', 'portuguese-language'],
    targetAudience: ['social', 'cultural', 'dance'],
    priceRange: 'low',
    bookingRequired: false,
    lusoTownDiscount: 15
  },
  {
    id: 'fado-casa-do-bacalhau',
    name: 'Authentic Fado Nights',
    partnerName: 'Casa do Bacalhau',
    description: 'Traditional Portuguese Fado music evenings in London\'s most authentic Portuguese restaurant. Monthly events featuring professional Fado singers and traditional Portuguese cuisine.',
    location: 'Casa do Bacalhau, Southwark, London',
    schedule: 'First Friday of each month, 7pm-11pm',
    socialHandle: '@casadobacalhaulondon',
    website: 'https://casadobacalhau.co.uk',
    memberBenefits: [
      'Authentic Fado music performed by professional artists',
      'Traditional Portuguese dinner included',
      'Cultural storytelling and history sessions',
      'Meet other Portuguese culture enthusiasts',
      'Photography opportunities with traditional Portuguese décor'
    ],
    eventTypes: [
      {
        type: 'Fado & Dinner',
        frequency: 'monthly',
        duration: '4 hours',
        capacity: 50,
        beginnerFriendly: true
      },
      {
        type: 'Fado History Workshop',
        frequency: 'seasonal',
        duration: '2 hours',
        capacity: 25,
        beginnerFriendly: true
      }
    ],
    skillLevels: ['listener', 'enthusiast', 'musician'],
    culturalFocus: ['portuguese-heritage', 'fado-music', 'portuguese-cuisine', 'cultural-traditions'],
    targetAudience: ['cultural', 'music'],
    priceRange: 'medium',
    bookingRequired: true,
    lusoTownDiscount: 20
  },
  {
    id: 'portuguese-business-network',
    name: 'Portuguese Business Breakfast',
    partnerName: 'Portuguese Chamber of Commerce UK',
    description: 'Monthly networking breakfast for Portuguese entrepreneurs, business owners, and professionals. Connect with the Portuguese business community in London.',
    location: 'Various Central London venues',
    schedule: 'First Saturday of each month, 9am-12pm',
    website: 'https://portuguesechamber.co.uk',
    memberBenefits: [
      'Network with Portuguese business owners',
      'Mentorship opportunities for new entrepreneurs',
      'Partnership development and collaboration',
      'Market insights for Portugal-UK trade',
      'Access to Portuguese business resources and funding'
    ],
    eventTypes: [
      {
        type: 'Networking Breakfast',
        frequency: 'monthly',
        duration: '3 hours',
        capacity: 40,
        beginnerFriendly: true
      },
      {
        type: 'Business Pitch Sessions',
        frequency: 'monthly',
        duration: '2 hours',
        capacity: 15,
        beginnerFriendly: false
      }
    ],
    skillLevels: ['startup', 'established', 'investor'],
    culturalFocus: ['business-networking', 'entrepreneurship', 'portuguese-economy'],
    targetAudience: ['business'],
    priceRange: 'low',
    bookingRequired: true,
    lusoTownDiscount: 25
  },
  {
    id: 'brazilian-cultural-center',
    name: 'Brazilian Cultural Evenings',
    partnerName: 'Brazilian Cultural Center London',
    description: 'Celebrate Brazilian culture with music, dance, and community. Weekly events featuring Samba, Brazilian cuisine, and cultural workshops.',
    location: 'Brazilian Cultural Center, Camden, London',
    schedule: 'Every Thursday, 7pm-10pm',
    socialHandle: '@brazilianculturelondon',
    memberBenefits: [
      'Learn authentic Brazilian Samba and Forró',
      'Taste traditional Brazilian cuisine',
      'Portuguese-Brazilian language exchange',
      'Connect with Brazilian community in London',
      'Cultural workshops on Brazilian traditions'
    ],
    eventTypes: [
      {
        type: 'Samba Classes',
        frequency: 'weekly',
        duration: '90 minutes',
        capacity: 35,
        beginnerFriendly: true
      },
      {
        type: 'Brazilian Cultural Night',
        frequency: 'weekly',
        duration: '3 hours',
        beginnerFriendly: true
      },
      {
        type: 'Capoeira Workshop',
        frequency: 'monthly',
        duration: '2 hours',
        capacity: 20,
        beginnerFriendly: true
      }
    ],
    skillLevels: ['beginner', 'intermediate', 'advanced'],
    culturalFocus: ['brazilian-heritage', 'samba-dance', 'brazilian-music', 'portuguese-language'],
    targetAudience: ['social', 'cultural', 'dance'],
    priceRange: 'low',
    bookingRequired: false,
    lusoTownDiscount: 10
  },
  {
    id: 'cape-verdean-music-society',
    name: 'Cape Verdean Music Sessions',
    partnerName: 'Cape Verdean Music Society UK',
    description: 'Monthly gatherings celebrating Cape Verdean music, Morna, and Coladeira. Connect with the Cape Verdean community through traditional music and dance.',
    location: 'Various venues across London',
    schedule: 'Third Saturday of each month, 6pm-10pm',
    memberBenefits: [
      'Experience authentic Cape Verdean Morna music',
      'Learn traditional Cape Verdean dances',
      'Connect with Cape Verdean diaspora community',
      'Taste Cape Verdean cuisine and cachupa',
      'Cultural storytelling about Cabo Verde islands'
    ],
    eventTypes: [
      {
        type: 'Morna Music Evening',
        frequency: 'monthly',
        duration: '4 hours',
        capacity: 60,
        beginnerFriendly: true
      },
      {
        type: 'Cape Verdean Dance Workshop',
        frequency: 'monthly',
        duration: '2 hours',
        capacity: 30,
        beginnerFriendly: true
      }
    ],
    skillLevels: ['beginner', 'intermediate', 'advanced'],
    culturalFocus: ['cape-verdean-heritage', 'morna-music', 'cape-verdean-dance', 'island-culture'],
    targetAudience: ['cultural', 'music', 'dance'],
    priceRange: 'free',
    bookingRequired: false,
    lusoTownDiscount: 0
  }
]

// Partnership highlights for signup form
export const PARTNERSHIP_HIGHLIGHTS = {
  'chocolate-kizomba': {
    title: 'Dance Your Way to Connection',
    subtitle: 'Join London\'s most welcoming Kizomba community',
    highlight: 'Beginners welcome every Tuesday & Thursday',
    testimonial: '"Found my dance partner and best friends through Chocolate Kizomba!" - Maria, 28',
    callToAction: 'Get 15% discount as LusoTown member'
  },
  'fado-evenings': {
    title: 'Soul of Portugal in London',
    subtitle: 'Authentic Fado nights with dinner and cultural immersion',
    highlight: 'Monthly events at Casa do Bacalhau',
    testimonial: '"The Fado nights brought tears to my eyes - pure saudade!" - João, 45',
    callToAction: 'Get 20% discount as LusoTown member'
  },
  'business-networking': {
    title: 'Build Your Portuguese Business Network',
    subtitle: 'Connect with successful Portuguese entrepreneurs',
    highlight: 'Monthly breakfast meetings in Central London',
    testimonial: '"Grew my business 300% through Portuguese network connections!" - Carlos, 34',
    callToAction: 'Get 25% discount as LusoTown member'
  }
} as const

// Function to get partner events by interest
export const getPartnerEventsByInterest = (interests: string[]): PartnershipEvent[] => {
  return PARTNERSHIP_EVENTS.filter(event => 
    event.targetAudience.some(audience => interests.includes(audience))
  )
}

// Function to get partner events by cultural focus
export const getPartnerEventsByCulture = (culturalInterests: string[]): PartnershipEvent[] => {
  return PARTNERSHIP_EVENTS.filter(event =>
    event.culturalFocus.some(focus => culturalInterests.includes(focus))
  )
}

// Function to get beginner-friendly events
export const getBeginnerFriendlyEvents = (): PartnershipEvent[] => {
  return PARTNERSHIP_EVENTS.filter(event =>
    event.eventTypes.some(type => type.beginnerFriendly)
  )
}

// Function to get free events
export const getFreeEvents = (): PartnershipEvent[] => {
  return PARTNERSHIP_EVENTS.filter(event => event.priceRange === 'free')
}

// Partner event recommendations for new users
export const getNewUserRecommendations = (primaryInterests: string[]): PartnershipEvent[] => {
  const recommendations = []
  
  if (primaryInterests.includes('dance-cultural-arts')) {
    recommendations.push(PARTNERSHIP_EVENTS.find(e => e.id === 'chocolate-kizomba')!)
  }
  
  if (primaryInterests.includes('cultural-events')) {
    recommendations.push(PARTNERSHIP_EVENTS.find(e => e.id === 'fado-casa-do-bacalhau')!)
  }
  
  if (primaryInterests.includes('business-networking')) {
    recommendations.push(PARTNERSHIP_EVENTS.find(e => e.id === 'portuguese-business-network')!)
  }
  
  return recommendations.filter(Boolean)
}