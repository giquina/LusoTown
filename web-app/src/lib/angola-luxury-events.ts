// Luxury Angola Events for Elite Angolan Diaspora in UK
// Sophisticated cultural and business networking events targeting wealthy Angolan professionals

import { EventTour } from './events-tours'
import { TOURS_PRICING } from '@/config/pricing'

export interface AngolaLuxuryEvent extends EventTour {
  exclusivityLevel: 'VIP' | 'Ultra-VIP' | 'Private Club' | 'Elite Circle'
  wealthTier: 'High Net Worth' | 'Ultra High Net Worth' | 'Elite Professional'
  businessSectors?: ('Oil & Gas' | 'Diamonds' | 'Mining' | 'Finance' | 'Luxury' | 'Real Estate')[]
  angolanRegions?: ('Luanda' | 'Cabinda' | 'Benguela' | 'Huambo' | 'Lobito')[]
  networkingValue: 'Business Development' | 'Investment Opportunities' | 'Cultural Exchange' | 'Elite Social'
  dresscode: 'Black Tie' | 'Business Formal' | 'Smart Casual' | 'Cocktail Attire'
  venuePrestige: 'Mayfair Private Club' | 'City Institution' | 'Luxury Hotel' | 'Private Residence'
}

// Luxury pricing for elite Angola events
export const ANGOLA_LUXURY_PRICING = {
  diamondCapitalSeries: 2500, // High-level investment seminars
  businessEliteNetworking: 150, // Monthly exclusive events
  luandaSocietyExchange: 800, // Quarterly cultural programs
  luxuryCuisine: 450, // Weekend culinary masterclasses
  oilGasInvestment: 1200, // Industry networking events
  privateDining: 300, // Exclusive dining experiences
  artGallery: 200, // Premium art exhibitions
  businessConsultancy: 500 // Private consultation sessions
} as const

export const angolaLuxuryEvents: AngolaLuxuryEvent[] = [
  {
    id: 'angola-001',
    title: 'Angola: Africa\'s Diamond Capital - Elite Investment Breakfast',
    description: 'Exclusive investment presentation showcasing Angola\'s natural resource wealth and luxury development opportunities. Connect with London\'s most successful Angolan entrepreneurs and international investors in this sophisticated networking environment.',
    date: '2025-09-15',
    time: '08:00',
    endTime: '11:00',
    location: 'The Dorchester Hotel - Mayfair',
    address: 'Park Lane, Mayfair, London W1K 1QA',
    category: 'Business & Professional',
    price: ANGOLA_LUXURY_PRICING.diamondCapitalSeries,
    currency: 'GBP',
    maxAttendees: 15,
    currentAttendees: 8,
    status: 'published',
    allowWaitlist: true,
    maxWaitingList: 10,
    hostName: 'Dr. Esperança Burity',
    hostImage: '/profiles/community/angola-director.jpg',
    imageUrl: '/events/angola/diamond-capital-breakfast.jpg',
    featured: true,
    groupExperience: true,
    requiresApproval: true,
    membershipRequired: 'premium',
    ageRestriction: '25+',
    portugueseOrigin: ['Angola'],
    tags: ['Diamond Industry', 'Investment', 'Elite Networking', 'Mayfair', 'Oil & Gas', 'Luxury Development'],
    highlights: [
      'Presentation on Angola\'s $12 billion diamond industry',
      'Private networking with UHNW Angolan diaspora',
      'Investment opportunities in Luanda luxury developments',
      'Premium breakfast at The Dorchester\'s private dining room'
    ],
    whatToExpect: [
      'Exclusive group of verified high-net-worth individuals',
      'Professional presentations by industry leaders',
      'Strategic business networking opportunities',
      'Access to Angola-UK investment partnerships'
    ],
    whatToHear: 'Insights from successful Angolan entrepreneurs about leveraging London\'s financial markets for Angola investments',
    whatToLearn: 'How to navigate Angola\'s natural resource sector and luxury development opportunities',
    groupSize: 'Ultra-Exclusive (12-15 people)',
    difficulty: 'Advanced',
    averageRating: 4.9,
    totalReviews: 23,
    createdAt: '2024-08-22',
    updatedAt: '2024-08-22',
    exclusivityLevel: 'Ultra-VIP',
    wealthTier: 'Ultra High Net Worth',
    businessSectors: ['Oil & Gas', 'Diamonds', 'Mining', 'Finance'],
    angolanRegions: ['Luanda', 'Cabinda'],
    networkingValue: 'Investment Opportunities',
    dresscode: 'Business Formal',
    venuePrestige: 'Luxury Hotel'
  },
  
  {
    id: 'angola-002',
    title: 'Luanda High Society Cultural Salon - London Edition',
    description: 'Sophisticated cultural exchange connecting London\'s Angolan elite with Luanda\'s refined social circles. Experience the elegance of Angolan high culture through curated art, refined conversation, and exclusive networking in Mayfair\'s most prestigious setting.',
    date: '2025-09-28',
    time: '18:30',
    endTime: '22:30',
    location: 'Annabel\'s Private Members Club',
    address: '46 Berkeley Square, Mayfair, London W1J 5AT',
    category: 'Cultural Heritage',
    price: ANGOLA_LUXURY_PRICING.luandaSocietyExchange,
    currency: 'GBP',
    maxAttendees: 20,
    currentAttendees: 12,
    status: 'published',
    allowWaitlist: true,
    maxWaitingList: 15,
    hostName: 'Sra. Catarina Bento',
    hostImage: '/profiles/community/angola-cultural-director.jpg',
    imageUrl: '/events/angola/luanda-society-salon.jpg',
    featured: true,
    groupExperience: true,
    requiresApproval: true,
    membershipRequired: 'premium',
    ageRestriction: '30+',
    portugueseOrigin: ['Angola'],
    tags: ['High Society', 'Cultural Exchange', 'Art & Culture', 'Mayfair', 'Exclusive Networking', 'Private Club'],
    highlights: [
      'Private viewing of contemporary Angolan art collection',
      'Sophisticated discussion on Angola\'s cultural renaissance',
      'Networking with London\'s Angolan cultural ambassadors',
      'Premium cocktails and refined Angolan-inspired canapés'
    ],
    whatToExpect: [
      'Elite gathering of cultured Angolan diaspora',
      'Cultural presentations by renowned Angolan artists',
      'Exclusive access to Annabel\'s private art collection',
      'Strategic connections with cultural institutions'
    ],
    whatToHear: 'Stories from Luanda\'s sophisticated social scene and how to bridge cultural excellence between Angola and London',
    whatToLearn: 'The evolution of contemporary Angolan culture and its place in London\'s luxury lifestyle',
    groupSize: 'Exclusive (18-20 people)',
    difficulty: 'Easy',
    averageRating: 4.9,
    totalReviews: 18,
    createdAt: '2024-08-22',
    updatedAt: '2024-08-22',
    exclusivityLevel: 'VIP',
    wealthTier: 'High Net Worth',
    businessSectors: ['Luxury'],
    angolanRegions: ['Luanda', 'Benguela'],
    networkingValue: 'Cultural Exchange',
    dresscode: 'Cocktail Attire',
    venuePrestige: 'Mayfair Private Club'
  },

  {
    id: 'angola-003',
    title: 'Oil & Gas Elite: Angola-UK Strategic Partnership Dinner',
    description: 'Premier networking dinner for senior executives in Angola\'s oil and gas sector. Connect with London\'s energy finance elite while exploring strategic partnerships between Angola\'s energy wealth and UK\'s financial expertise.',
    date: '2025-10-12',
    time: '19:00',
    endTime: '23:00',
    location: 'The Ned Private Dining Room',
    address: '27 Poultry, City of London, London EC2R 8AJ',
    category: 'Business & Professional',
    price: ANGOLA_LUXURY_PRICING.oilGasInvestment,
    currency: 'GBP',
    maxAttendees: 18,
    currentAttendees: 10,
    status: 'published',
    allowWaitlist: true,
    maxWaitingList: 12,
    hostName: 'Eng. Ricardo Fernandes',
    hostImage: '/profiles/community/angola-oil-executive.jpg',
    imageUrl: '/events/angola/oil-gas-partnership.jpg',
    featured: true,
    groupExperience: true,
    requiresApproval: true,
    membershipRequired: 'premium',
    ageRestriction: '30+',
    portugueseOrigin: ['Angola'],
    tags: ['Oil & Gas', 'Energy Sector', 'Strategic Partnerships', 'City of London', 'Executive Networking'],
    highlights: [
      'Strategic discussion on Angola\'s $45 billion oil industry',
      'Networking with City of London energy finance leaders',
      'Exclusive partnerships and joint venture opportunities',
      'Premium dinner with Angolan-inspired haute cuisine'
    ],
    whatToExpect: [
      'Senior executives from major energy companies',
      'Strategic presentations on Angola-UK energy partnerships',
      'Access to exclusive investment opportunities',
      'High-level business relationship development'
    ],
    whatToHear: 'Insights from energy sector leaders on maximizing Angola\'s oil wealth through London financial markets',
    whatToLearn: 'Strategic approaches to Angola-UK energy sector partnerships and investment opportunities',
    groupSize: 'Executive Level (15-18 people)',
    difficulty: 'Advanced',
    averageRating: 4.8,
    totalReviews: 14,
    createdAt: '2024-08-22',
    updatedAt: '2024-08-22',
    exclusivityLevel: 'Ultra-VIP',
    wealthTier: 'Ultra High Net Worth',
    businessSectors: ['Oil & Gas', 'Finance'],
    angolanRegions: ['Cabinda', 'Luanda'],
    networkingValue: 'Business Development',
    dresscode: 'Business Formal',
    venuePrestige: 'City Institution'
  },

  {
    id: 'angola-004',
    title: 'Sophisticated Angolan Cuisine & Portuguese Wine Experience',
    description: 'Refined culinary journey showcasing elevated Angolan gastronomy paired with exceptional Portuguese wines. Led by Michelin-trained chefs, this exclusive experience celebrates the sophisticated evolution of Angolan cuisine for London\'s discerning palates.',
    date: '2025-10-25',
    time: '18:00',
    endTime: '22:00',
    location: 'Sketch Private Dining Room',
    address: '9 Conduit Street, Mayfair, London W1S 2XG',
    category: 'Cultural Heritage',
    price: ANGOLA_LUXURY_PRICING.luxuryCuisine,
    currency: 'GBP',
    maxAttendees: 12,
    currentAttendees: 7,
    status: 'published',
    allowWaitlist: true,
    maxWaitingList: 8,
    hostName: 'Chef Ana Paula Gomes',
    hostImage: '/profiles/community/angola-chef.jpg',
    imageUrl: '/events/angola/sophisticated-cuisine.jpg',
    featured: true,
    groupExperience: true,
    requiresApproval: true,
    membershipRequired: 'premium',
    ageRestriction: '25+',
    portugueseOrigin: ['Angola', 'Portugal'],
    tags: ['Fine Dining', 'Angolan Cuisine', 'Wine Pairing', 'Culinary Arts', 'Luxury Experience'],
    highlights: [
      'Seven-course tasting menu of elevated Angolan dishes',
      'Curated Portuguese wine pairings from premium estates',
      'Interactive cooking demonstration by renowned chef',
      'Sophisticated interpretation of traditional Angolan flavors'
    ],
    whatToExpect: [
      'Intimate group of gastronomy enthusiasts',
      'Professional wine sommelier guidance',
      'Behind-the-scenes kitchen experience at Sketch',
      'Recipe collection and culinary techniques to take home'
    ],
    whatToHear: 'Stories about the evolution of Angolan cuisine and its place in London\'s fine dining scene',
    whatToLearn: 'How to appreciate and prepare sophisticated Angolan dishes with modern techniques',
    groupSize: 'Intimate (10-12 people)',
    difficulty: 'Moderate',
    averageRating: 4.9,
    totalReviews: 27,
    createdAt: '2024-08-22',
    updatedAt: '2024-08-22',
    exclusivityLevel: 'VIP',
    wealthTier: 'High Net Worth',
    businessSectors: ['Luxury'],
    angolanRegions: ['Luanda', 'Benguela', 'Huambo'],
    networkingValue: 'Cultural Exchange',
    dresscode: 'Smart Casual',
    venuePrestige: 'Luxury Hotel'
  },

  {
    id: 'angola-005',
    title: 'Angola Contemporary Art: Private Gallery Opening',
    description: 'Exclusive preview of contemporary Angolan art featuring works by renowned artists from Luanda\'s vibrant cultural scene. Network with London\'s art collectors while exploring Angola\'s sophisticated artistic renaissance.',
    date: '2025-11-08',
    time: '18:00',
    endTime: '21:00',
    location: 'Hauser & Wirth Gallery Mayfair',
    address: '23 Savile Row, Mayfair, London W1S 2ET',
    category: 'Arts & Entertainment',
    price: ANGOLA_LUXURY_PRICING.artGallery,
    currency: 'GBP',
    maxAttendees: 25,
    currentAttendees: 15,
    status: 'published',
    allowWaitlist: true,
    maxWaitingList: 15,
    hostName: 'Dr. Marta Silva',
    hostImage: '/profiles/community/angola-art-curator.jpg',
    imageUrl: '/events/angola/contemporary-art-gallery.jpg',
    featured: true,
    groupExperience: true,
    requiresApproval: true,
    membershipRequired: 'core',
    ageRestriction: '21+',
    portugueseOrigin: ['Angola', 'All Lusophone'],
    tags: ['Contemporary Art', 'Gallery Opening', 'Cultural Exchange', 'Art Collection', 'Mayfair'],
    highlights: [
      'Private viewing of exclusive Angolan contemporary art',
      'Meet-and-greet with featured Angolan artists',
      'Art collection guidance from professional curators',
      'Premium cocktails and sophisticated networking'
    ],
    whatToExpect: [
      'Art enthusiasts and collectors from London\'s cultural scene',
      'Professional insights into Angolan contemporary art market',
      'Opportunities to acquire unique Angolan artworks',
      'Cultural bridge-building between Angola and London art scenes'
    ],
    whatToHear: 'Stories from contemporary Angolan artists about expressing cultural identity through modern art',
    whatToLearn: 'Understanding contemporary Angolan art and its investment potential in London markets',
    groupSize: 'Medium (20-25 people)',
    difficulty: 'Easy',
    averageRating: 4.7,
    totalReviews: 31,
    createdAt: '2024-08-22',
    updatedAt: '2024-08-22',
    exclusivityLevel: 'VIP',
    wealthTier: 'High Net Worth',
    businessSectors: ['Luxury'],
    angolanRegions: ['Luanda'],
    networkingValue: 'Cultural Exchange',
    dresscode: 'Cocktail Attire',
    venuePrestige: 'Mayfair Private Club'
  },

  {
    id: 'angola-006',
    title: 'Private Angolan Business Consultation & Strategy Session',
    description: 'Exclusive one-on-one consultation for high-net-worth Angolan professionals seeking strategic business advice for UK operations, investments, or cultural ventures. Benefit from expert guidance in a confidential, luxury setting.',
    date: '2025-11-20',
    time: '10:00',
    endTime: '16:00',
    location: 'Private Business Suite - Mayfair',
    address: 'Berkeley Square House, Berkeley Square, Mayfair, London W1J 6BD',
    category: 'Business & Professional',
    price: ANGOLA_LUXURY_PRICING.businessConsultancy,
    currency: 'GBP',
    maxAttendees: 1,
    currentAttendees: 0,
    status: 'published',
    allowWaitlist: false,
    hostName: 'Dr. Esperança Burity',
    hostImage: '/profiles/community/angola-director.jpg',
    imageUrl: '/events/angola/private-consultation.jpg',
    featured: false,
    groupExperience: false,
    requiresApproval: true,
    membershipRequired: 'premium',
    ageRestriction: '25+',
    portugueseOrigin: ['Angola'],
    tags: ['Business Strategy', 'Private Consultation', 'Investment Advice', 'Executive Coaching'],
    highlights: [
      'Confidential one-on-one business strategy session',
      'Expert advice on UK-Angola business opportunities',
      'Strategic planning for cultural and business ventures',
      'Premium business suite with complete privacy'
    ],
    whatToExpect: [
      'Personalized strategic business guidance',
      'Confidential discussion of business challenges and opportunities',
      'Action plan development for UK market entry or expansion',
      'Follow-up support and networking introductions'
    ],
    whatToHear: 'Expert insights into navigating UK business culture while leveraging Angolan heritage',
    whatToLearn: 'Strategic approaches to building successful Angola-UK business relationships',
    groupSize: 'Private (1-on-1)',
    difficulty: 'Advanced',
    averageRating: 5.0,
    totalReviews: 8,
    createdAt: '2024-08-22',
    updatedAt: '2024-08-22',
    exclusivityLevel: 'Private Club',
    wealthTier: 'Ultra High Net Worth',
    businessSectors: ['Finance', 'Oil & Gas', 'Luxury', 'Real Estate'],
    angolanRegions: ['Luanda'],
    networkingValue: 'Business Development',
    dresscode: 'Business Formal',
    venuePrestige: 'Private Residence'
  }
]

// Filter functions for Angola luxury events
export const getAngolaEventsByWealthTier = (tier: AngolaLuxuryEvent['wealthTier']): AngolaLuxuryEvent[] => {
  return angolaLuxuryEvents.filter(event => event.wealthTier === tier)
}

export const getAngolaEventsByBusinessSector = (sector: AngolaLuxuryEvent['businessSectors'][0]): AngolaLuxuryEvent[] => {
  return angolaLuxuryEvents.filter(event => 
    event.businessSectors?.includes(sector)
  )
}

export const getAngolaEventsByExclusivity = (level: AngolaLuxuryEvent['exclusivityLevel']): AngolaLuxuryEvent[] => {
  return angolaLuxuryEvents.filter(event => event.exclusivityLevel === level)
}

export const getAngolaUpcomingEvents = (): AngolaLuxuryEvent[] => {
  const now = new Date()
  return angolaLuxuryEvents
    .filter(event => new Date(event.date) > now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

export const getAngolaFeaturedEvents = (): AngolaLuxuryEvent[] => {
  return angolaLuxuryEvents.filter(event => event.featured)
}

export const getAngolaEventsByRegion = (region: AngolaLuxuryEvent['angolanRegions'][0]): AngolaLuxuryEvent[] => {
  return angolaLuxuryEvents.filter(event => 
    event.angolanRegions?.includes(region)
  )
}

// Premium networking and cultural exchange events for Angola diaspora
export const getAngolaNetworkingEvents = (): AngolaLuxuryEvent[] => {
  return angolaLuxuryEvents.filter(event => 
    event.networkingValue === 'Business Development' || 
    event.networkingValue === 'Investment Opportunities'
  )
}

export const getAngolaCulturalEvents = (): AngolaLuxuryEvent[] => {
  return angolaLuxuryEvents.filter(event => 
    event.networkingValue === 'Cultural Exchange' || 
    event.networkingValue === 'Elite Social'
  )
}