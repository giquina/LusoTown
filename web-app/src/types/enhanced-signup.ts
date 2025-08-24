/**
 * Enhanced Signup System Types for Dual-Audience Targeting (Business + Romance)
 * Portuguese Cultural Integration with Chocolate Kizomba Partnership
 */

export interface EnhancedSignupForm {
  // Basic Information
  firstName: string
  lastName: string
  email: string
  phone?: string
  dateOfBirth: Date
  
  // Dual-Audience Targeting
  primaryInterests: PrimaryInterest[]
  businessTrack?: BusinessInterest[]
  socialTrack?: SocialInterest[]
  culturalTrack?: CulturalInterest[]
  
  // Cultural Background
  portugueseOrigin: PortugueseOriginWithRegions
  ukLocation: UKLocationExpanded
  languagePreference: 'en' | 'pt' | 'both'
  
  // Cultural Verification
  culturalVerificationBadges?: CulturalBadge[]
  culturalEvents?: CulturalEventInterest[]
  
  // Privacy and Preferences
  profileVisibility: 'business' | 'social' | 'both'
  eventNotifications: boolean
  partnerEventInterest: boolean // Chocolate Kizomba etc.
  
  // Legacy fields for compatibility
  password?: string
  confirmPassword?: string
  ageConfirmation?: boolean
  agreeTerms?: boolean
  interests?: string[]
  referralCode?: string
}

export type PrimaryInterest = 
  | 'business-networking'
  | 'dating-romance'
  | 'cultural-events'
  | 'professional-development'
  | 'friendship-social'
  | 'dance-cultural-arts'
  | 'food-cultural-experiences'

export type BusinessInterest = 
  | 'professional-networking'
  | 'portuguese-business-community'
  | 'entrepreneurship'
  | 'import-export'
  | 'cultural-tourism-business'

export type SocialInterest =
  | 'cultural-dating'
  | 'kizomba-partner-dancing'
  | 'fado-music'
  | 'portuguese-brazilian-cuisine'
  | 'family-oriented-events'

export type CulturalInterest =
  | 'african-heritage'
  | 'brazilian-culture'
  | 'portuguese-traditions'
  | 'language-exchange'
  | 'arts-cultural-crafts'
  | 'community-celebrations'

export interface PortugueseOriginWithRegions {
  country: PortugueseCountry
  region?: string
  culturalBackground?: string[]
}

export type PortugueseCountry = 
  | 'portugal'      // 🇵🇹 (Norte, Centro, Lisboa, Alentejo, Algarve, Açores, Madeira)
  | 'brazil'        // 🇧🇷 (Rio, São Paulo, Minas Gerais, Bahia, etc.)
  | 'angola'        // 🇦🇴
  | 'mozambique'    // 🇲🇿
  | 'cape-verde'    // 🇨🇻
  | 'guinea-bissau' // 🇬🇼
  | 'sao-tome'      // 🇸🇹
  | 'east-timor'    // 🇹🇱
  | 'macau'         // 🇲🇴
  | 'equatorial-guinea' // 🇬🇶
  | 'uk-heritage'   // 🇬🇧 Born in UK (Portuguese heritage)

export type UKLocationExpanded = 
  | 'London' | 'Manchester' | 'Birmingham' | 'Leeds' | 'Bristol'
  | 'Liverpool' | 'Edinburgh' | 'Glasgow' | 'Cardiff' | 'Belfast'
  | 'Oxford' | 'Cambridge' | 'Brighton' | 'Portsmouth' | 'Southampton'
  | 'Newcastle' | 'Sheffield' | 'Nottingham' | 'Leicester' | 'Coventry'

export type CulturalBadge = 
  | 'business-owner-verified'
  | 'single-culturally-connected'
  | 'cultural-event-organizer'
  | 'community-ambassador'
  | 'dance-community-member'
  | 'language-exchange-leader'

export interface CulturalEventInterest {
  eventType: 'chocolate-kizomba' | 'fado-evening' | 'business-breakfast'
  interest: boolean
  skillLevel?: 'beginner' | 'intermediate' | 'advanced'
  notifications: boolean
}

export interface PartnerEventFeature {
  eventType: 'chocolate-kizomba' | 'fado-evening' | 'business-breakfast'
  interest: boolean
  skillLevel?: 'beginner' | 'intermediate' | 'advanced'
  notifications: boolean
}

export interface SuccessStory {
  id: string
  type: 'business' | 'romance' | 'cultural'
  person: {
    name: string
    age: number
    origin: PortugueseCountry
    location: string
    flag: string
  }
  story: string
  outcome: string
  testimonial: string
}

export interface FormStep {
  id: string
  title: string
  subtitle: string
  fields: string[]
  validation?: any
  culturalContext?: string
}

export interface CulturalVerification {
  badge: CulturalBadge
  verified: boolean
  verificationDate?: Date
  description: string
}

// Portuguese regions by country
export const PORTUGUESE_REGIONS = {
  portugal: [
    'Norte', 'Centro', 'Lisboa', 'Alentejo', 'Algarve', 'Açores', 'Madeira'
  ],
  brazil: [
    'Rio de Janeiro', 'São Paulo', 'Minas Gerais', 'Bahia', 'Rio Grande do Sul',
    'Paraná', 'Santa Catarina', 'Goiás', 'Pernambuco', 'Ceará'
  ],
  angola: [
    'Luanda', 'Benguela', 'Huíla', 'Bié', 'Cabinda', 'Cunene'
  ],
  mozambique: [
    'Maputo', 'Gaza', 'Inhambane', 'Sofala', 'Manica', 'Tete', 'Zambézia', 'Nampula'
  ],
  'cape-verde': [
    'Santiago', 'São Vicente', 'Santo Antão', 'Fogo', 'Maio', 'Sal'
  ]
} as const

// UK locations with Portuguese community density
export const UK_LOCATIONS_WITH_COMMUNITY = [
  { location: 'London', communitySize: 'large', culturalEvents: 'weekly' },
  { location: 'Manchester', communitySize: 'medium', culturalEvents: 'monthly' },
  { location: 'Birmingham', communitySize: 'small', culturalEvents: 'occasional' },
  { location: 'Leeds', communitySize: 'small', culturalEvents: 'occasional' },
  { location: 'Bristol', communitySize: 'medium', culturalEvents: 'monthly' },
  { location: 'Liverpool', communitySize: 'small', culturalEvents: 'occasional' },
  { location: 'Edinburgh', communitySize: 'small', culturalEvents: 'seasonal' },
  { location: 'Glasgow', communitySize: 'small', culturalEvents: 'seasonal' },
  { location: 'Cardiff', communitySize: 'small', culturalEvents: 'occasional' },
  { location: 'Belfast', communitySize: 'small', culturalEvents: 'rare' },
] as const

// Cultural badge descriptions
export const CULTURAL_BADGE_DESCRIPTIONS = {
  'business-owner-verified': 'Verified Portuguese business owner in the UK',
  'single-culturally-connected': 'Single and actively seeking cultural connections',
  'cultural-event-organizer': 'Organizes Portuguese cultural events and activities',
  'community-ambassador': 'Official ambassador for Portuguese community initiatives',
  'dance-community-member': 'Active in Portuguese/Lusophone dance communities',
  'language-exchange-leader': 'Leads Portuguese-English language exchange sessions'
} as const

// Success stories for rotation
export const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: 'carlos-business',
    type: 'business',
    person: {
      name: 'Carlos',
      age: 34,
      origin: 'portugal',
      location: 'London',
      flag: '🇵🇹'
    },
    story: 'Opened accounting firm serving Portuguese community',
    outcome: '50+ clients in 6 months through LusoTown',
    testimonial: 'LusoTown connected me with entrepreneurs who understand cultural business values'
  },
  {
    id: 'maria-romance',
    type: 'romance',
    person: {
      name: 'Maria',
      age: 28,
      origin: 'brazil',
      location: 'Manchester',
      flag: '🇧🇷'
    },
    story: 'Found love through Chocolate Kizomba events',
    outcome: 'Met my fiancé at Tuesday Kizomba night',
    testimonial: 'Dancing brought us together, Portuguese culture keeps us strong'
  },
  {
    id: 'joao-cultural',
    type: 'cultural',
    person: {
      name: 'João',
      age: 45,
      origin: 'cape-verde',
      location: 'Birmingham',
      flag: '🇨🇻'
    },
    story: 'Organized Cape Verdean music festival',
    outcome: '300+ attendees celebrating Cabo Verde heritage',
    testimonial: 'LusoTown helped me connect all Portuguese-speaking communities together'
  },
  {
    id: 'ana-business',
    type: 'business',
    person: {
      name: 'Ana',
      age: 31,
      origin: 'angola',
      location: 'London',
      flag: '🇦🇴'
    },
    story: 'Launched Portuguese food import business',
    outcome: '25 restaurants now stock my authentic products',
    testimonial: 'The Portuguese business network on LusoTown was invaluable for growth'
  },
  {
    id: 'ricardo-romance',
    type: 'romance',
    person: {
      name: 'Ricardo',
      age: 29,
      origin: 'portugal',
      location: 'Bristol',
      flag: '🇵🇹'
    },
    story: 'Found my Portuguese soulmate',
    outcome: 'Married after meeting at Fado evening',
    testimonial: 'We bonded over nossa saudade - LusoTown understands Portuguese hearts'
  },
  {
    id: 'lucia-cultural',
    type: 'cultural',
    person: {
      name: 'Lúcia',
      age: 38,
      origin: 'mozambique',
      location: 'Liverpool',
      flag: '🇲🇿'
    },
    story: 'Started Portuguese language school',
    outcome: '80 children now learning Portuguese on weekends',
    testimonial: 'LusoTown connected me with families passionate about preserving our language'
  }
]

// Partner event configurations
export const PARTNER_EVENTS = {
  'chocolate-kizomba': {
    name: 'Chocolate Kizomba',
    description: 'Experience authentic Angolan Kizomba every Tuesday & Thursday',
    location: 'One Regents Street, London',
    schedule: '8pm-Late',
    socialHandle: '@chocolatekizomba',
    benefits: ['beginner-friendly-sessions', 'post-dance-networking', 'cultural-education'],
    skillLevels: ['beginner', 'intermediate', 'advanced']
  },
  'fado-evening': {
    name: 'Fado Nights',
    description: 'Traditional Portuguese Fado music and cultural evenings',
    location: 'Various Portuguese venues',
    schedule: 'Monthly events',
    benefits: ['authentic-fado-music', 'portuguese-community', 'cultural-immersion'],
    skillLevels: ['listener', 'singer', 'musician']
  },
  'business-breakfast': {
    name: 'Portuguese Business Network',
    description: 'Monthly networking breakfast for Portuguese entrepreneurs',
    location: 'Central London venues',
    schedule: 'First Saturday of each month, 9am',
    benefits: ['business-networking', 'mentorship-opportunities', 'partnership-development'],
    skillLevels: ['startup', 'established', 'investor']
  }
} as const

// Form step configuration
export const SIGNUP_STEPS: FormStep[] = [
  {
    id: 'basic-info',
    title: 'Welcome to Your Portuguese Community',
    subtitle: 'Let\'s start with the basics',
    fields: ['firstName', 'lastName', 'email', 'phone'],
  },
  {
    id: 'cultural-background',
    title: 'Your Portuguese Journey',
    subtitle: 'Tell us about your cultural background',
    fields: ['portugueseOrigin', 'ukLocation', 'languagePreference'],
    culturalContext: 'We celebrate all Portuguese-speaking cultures'
  },
  {
    id: 'interests-goals',
    title: 'What Brings You Here?',
    subtitle: 'Business, romance, culture - or all three?',
    fields: ['primaryInterests', 'businessTrack', 'socialTrack', 'culturalTrack'],
  },
  {
    id: 'verification-preferences',
    title: 'Community Verification & Preferences',
    subtitle: 'Help us connect you with the right people',
    fields: ['culturalVerificationBadges', 'profileVisibility', 'partnerEventInterest'],
  }
]