// Global Portuguese Diaspora Expansion Types and Interfaces
export type PortugueseRegion = 
  | 'europe' 
  | 'north-america' 
  | 'south-america' 
  | 'africa' 
  | 'asia-pacific' 
  | 'oceania'

export type PortugueseCountry = 
  | 'portugal' 
  | 'brazil' 
  | 'usa' 
  | 'canada' 
  | 'uk' 
  | 'france' 
  | 'germany' 
  | 'switzerland' 
  | 'luxembourg' 
  | 'australia' 
  | 'south-africa' 
  | 'angola' 
  | 'mozambique' 
  | 'cape-verde' 
  | 'macau' 
  | 'east-timor'
  | 'india-goa'
  | 'venezuela'
  | 'argentina'

export type Currency = 
  | 'EUR' 
  | 'USD' 
  | 'CAD' 
  | 'AUD' 
  | 'BRL' 
  | 'ZAR' 
  | 'GBP' 
  | 'CHF'

export type PortugueseDialect = 
  | 'european-portuguese' 
  | 'brazilian-portuguese' 
  | 'african-portuguese' 
  | 'asian-portuguese' 
  | 'diaspora-portuguese'

export interface LocalizedRegion {
  country: PortugueseCountry
  region: PortugueseRegion
  name: string
  nativeName: string
  currency: Currency
  timezone: string
  dialect: PortugueseDialect
  culturalFeatures: string[]
  majorCities: string[]
  portuguesePopulation: number
  culturalCenters: string[]
  embassyContact?: string
  consulateContacts: string[]
  traditionalFestivals: Festival[]
  localCuisine: CulturalItem[]
  historicalSites: CulturalItem[]
  communityOrganizations: Organization[]
  businessNetworks: BusinessNetwork[]
  educationalInstitutions: EducationalInstitution[]
  mediaOutlets: MediaOutlet[]
  religiousCenters: ReligiousCenter[]
}

export interface Festival {
  id: string
  name: string
  description: string
  date: string
  location: string
  significance: string
  traditions: string[]
  modernCelebration: string
}

export interface CulturalItem {
  id: string
  name: string
  description: string
  origin: string
  significance: string
  modernAdaptation?: string
  preservationStatus: 'thriving' | 'declining' | 'endangered'
}

export interface Organization {
  id: string
  name: string
  type: 'cultural' | 'social' | 'professional' | 'religious' | 'educational'
  website?: string
  contact: string
  services: string[]
  memberCount?: number
  foundedYear?: number
}

export interface BusinessNetwork {
  id: string
  name: string
  industry: string
  members: number
  focus: string[]
  meetingFrequency: string
  contactInfo: string
}

export interface EducationalInstitution {
  id: string
  name: string
  type: 'university' | 'school' | 'language-center' | 'cultural-center'
  portuguesePrograms: string[]
  studentCount?: number
  location: string
  contact: string
}

export interface MediaOutlet {
  id: string
  name: string
  type: 'newspaper' | 'radio' | 'tv' | 'online' | 'magazine'
  language: 'portuguese' | 'bilingual' | 'local-with-portuguese'
  audience: string
  website?: string
  reach: number
}

export interface ReligiousCenter {
  id: string
  name: string
  denomination: string
  portugueseServices: boolean
  address: string
  contact: string
  communitySize: number
  culturalActivities: string[]
}

export interface GlobalPortugueseEvent {
  id: string
  title: string
  description: string
  date: Date
  location: {
    country: PortugueseCountry
    city: string
    venue: string
    address: string
  }
  type: 'cultural' | 'business' | 'educational' | 'social' | 'religious'
  organizer: Organization
  expectedAttendance: number
  cost: {
    amount: number
    currency: Currency
  }
  registrationRequired: boolean
  ageRestriction?: string
  language: 'portuguese' | 'bilingual' | 'local'
  culturalSignificance: string
  internationalParticipation: boolean
  streamingAvailable: boolean
}

export interface PortugueseProfessional {
  id: string
  name: string
  profession: string
  industry: string
  location: {
    country: PortugueseCountry
    city: string
  }
  expertise: string[]
  services: string[]
  availableForMentoring: boolean
  languagePreference: 'portuguese' | 'bilingual'
  networkingInterests: string[]
  businessType: 'freelance' | 'company' | 'corporate' | 'non-profit'
  yearsExperience: number
  culturalSpecialization?: string[]
}

export interface CulturalExchangeProgram {
  id: string
  name: string
  description: string
  originCountry: PortugueseCountry
  destinationCountry: PortugueseCountry
  duration: string
  type: 'student' | 'professional' | 'cultural' | 'family'
  ageRange: string
  cost: {
    amount: number
    currency: Currency
  }
  requirements: string[]
  benefits: string[]
  applicationDeadline: Date
  startDate: Date
  organizer: Organization
  partnershipsRequired: string[]
  culturalObjectives: string[]
}

export interface DiasporaFamily {
  id: string
  familyName: string
  originRegion: string
  currentCountry: PortugueseCountry
  generationsSinceMigration: number
  familyTraditions: CulturalItem[]
  languageStatus: 'fluent' | 'conversational' | 'learning' | 'lost'
  culturalActivities: string[]
  connectionToPortugal: 'strong' | 'moderate' | 'weak' | 'none'
  interestInReconnection: boolean
  preservationEfforts: string[]
  youngerGenerationEngagement: 'high' | 'medium' | 'low'
}

export interface PortugueseBusinessDirectory {
  id: string
  businessName: string
  owner: string
  industry: string
  location: {
    country: PortugueseCountry
    city: string
    address: string
  }
  services: string[]
  targetMarket: 'portuguese-community' | 'general-public' | 'both'
  establishedYear: number
  employeeCount: number
  portugueseSpecialties: string[]
  communityInvolvement: string[]
  internationalShipping: boolean
  supportedCurrencies: Currency[]
  socialImpact: string[]
}

export interface GlobalPortugueseNetwork {
  totalMembers: number
  activeCountries: PortugueseCountry[]
  monthlyActiveUsers: number
  eventsHostedMonthly: number
  businessPartnerships: number
  educationalPartnerships: number
  culturalPreservationProjects: number
  crossBorderConnections: number
  languageLearners: number
  mentorshipConnections: number
  familyReunifications: number
  successStories: SuccessStory[]
}

export interface SuccessStory {
  id: string
  type: 'business' | 'cultural' | 'personal' | 'educational'
  title: string
  description: string
  participants: string[]
  countries: PortugueseCountry[]
  outcome: string
  impact: string
  dateAchieved: Date
  testimonials: string[]
  mediaAttention?: string[]
}

export interface CulturalPreservationProject {
  id: string
  name: string
  description: string
  type: 'documentation' | 'education' | 'celebration' | 'digitization'
  targetCulture: CulturalItem
  countries: PortugueseCountry[]
  participants: number
  fundingRequired: {
    amount: number
    currency: Currency
  }
  timeline: string
  expectedImpact: string
  preservationGoals: string[]
  measurableOutcomes: string[]
  partnerOrganizations: Organization[]
}

// Localization preferences for each region
export interface RegionalPreferences {
  dateFormat: string
  timeFormat: '12h' | '24h'
  firstDayOfWeek: 0 | 1 // 0 = Sunday, 1 = Monday
  numberFormat: string
  phoneFormat: string
  addressFormat: string[]
  preferredPaymentMethods: string[]
  popularSocialPlatforms: string[]
  businessHours: {
    start: string
    end: string
    timezone: string
  }
  culturalSensitivities: string[]
  communicationStyle: 'formal' | 'casual' | 'mixed'
  familyStructureImportance: 'high' | 'medium' | 'low'
  religiousConsiderations: string[]
}

// Portuguese-speaking community growth metrics
export interface CommunityGrowthMetrics {
  countryCode: PortugueseCountry
  totalPortugueseSpeakers: number
  platformUsers: number
  growthRate: number
  engagementRate: number
  eventAttendance: number
  businessConnections: number
  culturalParticipation: number
  languageRetention: number
  intergenerationalTransmission: number
  communityCohesin: number
  averageSessionTime: number
  monthlyActiveUsers: number
  userRetentionRate: number
  referralRate: number
}