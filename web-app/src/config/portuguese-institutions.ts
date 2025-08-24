/**
 * Portuguese Embassy and Consulate Configuration
 * Centralized configuration for Portuguese diplomatic missions
 * Environment-configurable data that can be easily updated
 */

export interface EmbassyContact {
  id: string
  name: string
  namePortuguese: string
  type: 'embassy' | 'consulate' | 'honorary_consulate' | 'trade_office'
  
  // Contact Information
  address: string
  postcode: string
  city: string
  country: string
  phone: string
  email: string
  website: string
  emergencyPhone?: string
  
  // Services
  services: string[]
  servicesPortuguese: string[]
  openingHours: {
    monday: string
    tuesday: string
    wednesday: string
    thursday: string
    friday: string
    saturday?: string
    sunday?: string
  }
  
  // Officials
  ambassador?: {
    name: string
    title: string
    titlePortuguese: string
    bio?: string
    photoUrl?: string
  }
  consul?: {
    name: string
    title: string
    titlePortuguese: string
    bio?: string
    photoUrl?: string
  }
  
  // Regional Coverage
  regionsServed: string[]
  emergencyServices: boolean
  appointmentRequired: boolean
  
  // Social Media
  socialMedia: {
    facebook?: string
    twitter?: string
    instagram?: string
    linkedin?: string
  }
  
  // Status
  isActive: boolean
  lastUpdated: string
}

/**
 * Embassy and Consulate Data
 * Configurable through environment variables
 */
export const EMBASSY_CONTACTS: EmbassyContact[] = [
  {
    id: 'embassy-london',
    name: process.env.NEXT_PUBLIC_EMBASSY_LONDON_NAME || 'Portuguese Embassy in London',
    namePortuguese: process.env.NEXT_PUBLIC_EMBASSY_LONDON_NAME_PT || 'Embaixada de Portugal em Londres',
    type: 'embassy',
    
    address: process.env.NEXT_PUBLIC_EMBASSY_LONDON_ADDRESS || '11 Belgrave Square',
    postcode: process.env.NEXT_PUBLIC_EMBASSY_LONDON_POSTCODE || 'SW1X 8PP',
    city: 'London',
    country: 'United Kingdom',
    phone: process.env.NEXT_PUBLIC_EMBASSY_LONDON_PHONE || '+44 20 7235 5331',
    email: process.env.NEXT_PUBLIC_EMBASSY_LONDON_EMAIL || 'embaixada.londres@mne.pt',
    website: process.env.NEXT_PUBLIC_EMBASSY_LONDON_WEBSITE || 'https://londres.embaixadaportugal.mne.gov.pt',
    emergencyPhone: process.env.NEXT_PUBLIC_EMBASSY_LONDON_EMERGENCY || '+44 7831 673 833',
    
    services: [
      'Passport services',
      'Visa applications',
      'Consular services',
      'Document authentication',
      'Civil registration',
      'Emergency assistance',
      'Cultural events',
      'Business support'
    ],
    servicesPortuguese: [
      'Serviços de passaporte',
      'Pedidos de visto',
      'Serviços consulares',
      'Autenticação de documentos',
      'Registo civil',
      'Assistência de emergência',
      'Eventos culturais',
      'Apoio empresarial'
    ],
    
    openingHours: {
      monday: '09:00-17:00',
      tuesday: '09:00-17:00',
      wednesday: '09:00-17:00',
      thursday: '09:00-17:00',
      friday: '09:00-16:30'
    },
    
    ambassador: {
      name: process.env.NEXT_PUBLIC_AMBASSADOR_NAME || 'Nuno Brito',
      title: 'Ambassador',
      titlePortuguese: 'Embaixador',
      bio: 'Portuguese Ambassador to the United Kingdom'
    },
    
    regionsServed: ['England', 'Scotland', 'Wales', 'Northern Ireland'],
    emergencyServices: true,
    appointmentRequired: true,
    
    socialMedia: {
      facebook: process.env.NEXT_PUBLIC_EMBASSY_FACEBOOK || 'https://facebook.com/EmbaixadaPortugalLondres',
      twitter: process.env.NEXT_PUBLIC_EMBASSY_TWITTER || 'https://twitter.com/PortugalUK',
      linkedin: process.env.NEXT_PUBLIC_EMBASSY_LINKEDIN || 'https://linkedin.com/company/portugal-embassy-uk'
    },
    
    isActive: true,
    lastUpdated: '2024-08-21'
  },
  
  {
    id: 'consulate-manchester',
    name: process.env.NEXT_PUBLIC_CONSULATE_MANCHESTER_NAME || 'Portuguese Consulate Manchester',
    namePortuguese: process.env.NEXT_PUBLIC_CONSULATE_MANCHESTER_NAME_PT || 'Consulado de Portugal em Manchester',
    type: 'consulate',
    
    address: process.env.NEXT_PUBLIC_CONSULATE_MANCHESTER_ADDRESS || '1 Portland Street',
    postcode: process.env.NEXT_PUBLIC_CONSULATE_MANCHESTER_POSTCODE || 'M1 3BE',
    city: 'Manchester',
    country: 'United Kingdom',
    phone: process.env.NEXT_PUBLIC_CONSULATE_MANCHESTER_PHONE || '+44 161 834 4852',
    email: process.env.NEXT_PUBLIC_CONSULATE_MANCHESTER_EMAIL || 'consulado.manchester@mne.pt',
    website: process.env.NEXT_PUBLIC_CONSULATE_MANCHESTER_WEBSITE || 'https://manchester.embaixadaportugal.mne.gov.pt',
    
    services: [
      'Consular services',
      'Passport renewals',
      'Document certification',
      'Civil registration',
      'Emergency assistance'
    ],
    servicesPortuguese: [
      'Serviços consulares',
      'Renovação de passaportes',
      'Certificação de documentos',
      'Registo civil',
      'Assistência de emergência'
    ],
    
    openingHours: {
      monday: 'Closed',
      tuesday: '09:00-12:30, 14:00-17:00',
      wednesday: '09:00-12:30',
      thursday: '09:00-12:30, 14:00-17:00',
      friday: '09:00-12:30'
    },
    
    consul: {
      name: process.env.NEXT_PUBLIC_CONSUL_MANCHESTER_NAME || 'Maria João Correia',
      title: 'Consul',
      titlePortuguese: 'Cônsul'
    },
    
    regionsServed: ['Greater Manchester', 'Lancashire', 'Merseyside', 'Cheshire', 'West Yorkshire'],
    emergencyServices: true,
    appointmentRequired: true,
    
    socialMedia: {
      facebook: process.env.NEXT_PUBLIC_CONSULATE_MANCHESTER_FACEBOOK
    },
    
    isActive: true,
    lastUpdated: '2024-08-21'
  },
  
  {
    id: 'trade-office-london',
    name: process.env.NEXT_PUBLIC_TRADE_OFFICE_NAME || 'Portuguese Trade Office London',
    namePortuguese: process.env.NEXT_PUBLIC_TRADE_OFFICE_NAME_PT || 'Escritório Comercial de Portugal em Londres',
    type: 'trade_office',
    
    address: process.env.NEXT_PUBLIC_TRADE_OFFICE_ADDRESS || '4th Floor, 180 Piccadilly',
    postcode: process.env.NEXT_PUBLIC_TRADE_OFFICE_POSTCODE || 'W1J 9HF',
    city: 'London',
    country: 'United Kingdom',
    phone: process.env.NEXT_PUBLIC_TRADE_OFFICE_PHONE || '+44 20 7383 5055',
    email: process.env.NEXT_PUBLIC_TRADE_OFFICE_EMAIL || 'comercial.londres@aicep.pt',
    website: process.env.NEXT_PUBLIC_TRADE_OFFICE_WEBSITE || 'https://comercial.londres.aicep.pt',
    
    services: [
      'Trade promotion',
      'Investment support',
      'Market intelligence',
      'Business matchmaking',
      'Export assistance'
    ],
    servicesPortuguese: [
      'Promoção comercial',
      'Apoio ao investimento',
      'Inteligência de mercado',
      'Encontros de negócios',
      'Assistência à exportação'
    ],
    
    openingHours: {
      monday: '09:00-17:30',
      tuesday: '09:00-17:30',
      wednesday: '09:00-17:30',
      thursday: '09:00-17:30',
      friday: '09:00-17:00'
    },
    
    regionsServed: ['United Kingdom', 'Ireland'],
    emergencyServices: false,
    appointmentRequired: false,
    
    socialMedia: {
      linkedin: process.env.NEXT_PUBLIC_TRADE_OFFICE_LINKEDIN
    },
    
    isActive: true,
    lastUpdated: '2024-08-21'
  }
]

/**
 * Get embassy contact by ID
 */
export function getEmbassyById(id: string): EmbassyContact | null {
  return EMBASSY_CONTACTS.find(embassy => embassy.id === id) || null
}

/**
 * Get embassies by type
 */
export function getEmbassiesByType(type: EmbassyContact['type']): EmbassyContact[] {
  return EMBASSY_CONTACTS.filter(embassy => embassy.type === type && embassy.isActive)
}

/**
 * Get embassy for a specific region
 */
export function getEmbassyForRegion(region: string): EmbassyContact | null {
  return EMBASSY_CONTACTS.find(embassy => 
    embassy.regionsServed.some(served => 
      served.toLowerCase().includes(region.toLowerCase())
    ) && embassy.isActive
  ) || null
}

/**
 * Get emergency contact information
 */
export function getEmergencyContacts(): EmbassyContact[] {
  return EMBASSY_CONTACTS.filter(embassy => embassy.emergencyServices && embassy.isActive)
}

/**
 * Service availability checker
 */
export function hasService(embassyId: string, service: string): boolean {
  const embassy = getEmbassyById(embassyId)
  if (!embassy) return false
  
  return embassy.services.some(s => 
    s.toLowerCase().includes(service.toLowerCase())
  )
}

/**
 * Format opening hours for display
 */
export function formatOpeningHours(embassy: EmbassyContact, day: string): string {
  const hours = embassy.openingHours[day.toLowerCase() as keyof typeof embassy.openingHours]
  return hours || 'Closed'
}

/**
 * Get contact information for emergency services
 */
export function getEmergencyContactInfo(): {
  phone: string
  email: string
  website: string
  address: string
} {
  const embassy = getEmbassyById('embassy-london')
  if (!embassy) {
    return {
      phone: '+44 20 7235 5331',
      email: 'embaixada.londres@mne.pt',
      website: 'https://londres.embaixadaportugal.mne.gov.pt',
      address: '11 Belgrave Square, London SW1X 8PP'
    }
  }
  
  return {
    phone: embassy.emergencyPhone || embassy.phone,
    email: embassy.email,
    website: embassy.website,
    address: `${embassy.address}, ${embassy.city} ${embassy.postcode}`
  }
}
// Export alias for backward compatibility with HeritageRespectProtocol
export const PORTUGUESE_INSTITUTIONS = EMBASSY_CONTACTS
export type PortugueseInstitution = EmbassyContact
