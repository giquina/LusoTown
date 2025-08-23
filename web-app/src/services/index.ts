// Central export for all LusoTown API services
// Portuguese-speaking community Platform - Real Supabase Integration

export { userProfileService } from './UserProfileService'
export type { 
  UserProfile, 
  UserInterests, 
  CulturalPreferences 
} from './UserProfileService'

export { eventManagementService } from './EventManagementService'
export type { 
  PortugueseEvent, 
  PortugueseVenue, 
  EventAttendee, 
  EventRecommendation, 
  CulturalCalendar 
} from './EventManagementService'

export { connectionService } from './ConnectionService'
export type { 
  CommunityConnection, 
  CulturalCompatibility, 
  ConnectionRecommendation, 
  NetworkingEvent 
} from './ConnectionService'

export { messagingService } from './messagingService'
export type { 
  MessagePermissionCheck, 
  Match, 
  Conversation, 
  ConversationMessage 
} from './messagingService'

export { culturalCalendarService } from './CulturalCalendarService'
export type { 
  CulturalEvent, 
  CulturalEventSchedule, 
  SeasonalCelebration, 
  PortugueseHoliday 
} from './CulturalCalendarService'

export { businessDirectoryService } from './BusinessDirectoryService'
export type { 
  PortugueseBusiness, 
  BusinessReview, 
  BusinessSearchFilters, 
  BusinessCategory 
} from './BusinessDirectoryService'

export { notificationService } from './NotificationService'
export type { 
  UserNotification, 
  NotificationPreferences, 
  NotificationStats 
} from './NotificationService'

// Utility functions for common operations
export const PortugueseServiceUtils = {
  /**
   * Format Portuguese phone numbers
   */
  formatPortuguesePhone: (phone: string): string => {
    // Remove all non-digits
    const digits = phone.replace(/\D/g, '')
    
    // Portuguese mobile: +351 9XX XXX XXX
    if (digits.startsWith('351') && digits.length === 12) {
      return `+351 ${digits.slice(3, 6)} ${digits.slice(6, 9)} ${digits.slice(9)}`
    }
    
    // United Kingdom mobile: +44 7XXX XXX XXX
    if (digits.startsWith('44') && digits.length === 12) {
      return `+44 ${digits.slice(2, 6)} ${digits.slice(6, 9)} ${digits.slice(9)}`
    }
    
    return phone // Return original if no format matches
  },

  /**
   * Get Portuguese region display name
   */
  getRegionDisplayName: (region: string): string => {
    const regionNames: Record<string, string> = {
      'northern_portugal': 'Norte de Portugal',
      'central_portugal': 'Centro de Portugal',
      'southern_portugal': 'Sul de Portugal',
      'lisbon_region': 'Região de Lisboa',
      'azores': 'Açores',
      'madeira': 'Madeira',
      'brazil': 'Brasil',
      'other_lusophone': 'Outros Países Lusófonos'
    }
    return regionNames[region] || region
  },

  /**
   * Format Portuguese currency (EUR)
   */
  formatEuroPrice: (amount: number): string => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount)
  },

  /**
   * Calculate age from birth date
   */
  calculateAge: (birthDate: string): number => {
    const birth = new Date(birthDate)
    const today = new Date()
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    
    return age
  },

  /**
   * Get Portuguese cultural compatibility description
   */
  getCulturalCompatibilityDescription: (score: number): string => {
    if (score >= 90) return 'Compatibilidade cultural muito forte'
    if (score >= 80) return 'Boa compatibilidade cultural'
    if (score >= 70) return 'Compatibilidade cultural moderada'
    if (score >= 60) return 'Alguma compatibilidade cultural'
    return 'Compatibilidade cultural limitada'
  },

  /**
   * Get London Portuguese neighborhoods
   */
  getLondonPortugueseNeighborhoods: (): Array<{ value: string; label: string; description: string }> => [
    {
      value: 'stockwell',
      label: 'Stockwell',
      description: 'Heart of Little Portugal with Portuguese Centre'
    },
    {
      value: 'south_lambeth',
      label: 'South Lambeth',
      description: 'Historic Portuguese-speaking community area'
    },
    {
      value: 'vauxhall',
      label: 'Vauxhall',
      description: 'Growing Portuguese business district'
    },
    {
      value: 'north_kensington',
      label: 'North Kensington',
      description: 'Golborne Road Portuguese-speaking community'
    },
    {
      value: 'hammersmith',
      label: 'Hammersmith',
      description: 'Emerging Portuguese professional area'
    },
    {
      value: 'elephant_castle',
      label: 'Elephant & Castle',
      description: 'Diverse Portuguese and Latin community'
    },
    {
      value: 'bermondsey',
      label: 'Bermondsey',
      description: 'Growing Portuguese family area'
    },
    {
      value: 'east_london',
      label: 'East London',
      description: 'Young Portuguese professionals'
    }
  ],

  /**
   * Get Portuguese business types
   */
  getPortugueseBusinessTypes: (): Array<{ value: string; label: string; icon: string }> => [
    { value: 'restaurant', label: 'Restaurante', icon: '🍽️' },
    { value: 'cafe', label: 'Café', icon: '☕' },
    { value: 'bakery', label: 'Padaria', icon: '🥖' },
    { value: 'shop', label: 'Loja', icon: '🛍️' },
    { value: 'supermarket', label: 'Supermercado', icon: '🛒' },
    { value: 'bar', label: 'Bar', icon: '🍻' },
    { value: 'cultural_center', label: 'Centro Cultural', icon: '🏛️' },
    { value: 'church', label: 'Igreja', icon: '⛪' },
    { value: 'service', label: 'Serviços', icon: '🔧' },
    { value: 'beauty', label: 'Beleza', icon: '💄' },
    { value: 'healthcare', label: 'Saúde', icon: '🏥' },
    { value: 'education', label: 'Educação', icon: '🎓' }
  ],

  /**
   * Validate Portuguese VAT number (NIF)
   */
  validatePortugueseVAT: (vat: string): boolean => {
    const cleanVAT = vat.replace(/\D/g, '')
    if (cleanVAT.length !== 9) return false
    
    const digits = cleanVAT.split('').map(Number)
    const checksum = digits.slice(0, 8).reduce((sum, digit, index) => sum + digit * (9 - index), 0)
    const remainder = checksum % 11
    const checkDigit = remainder < 2 ? 0 : 11 - remainder
    
    return digits[8] === checkDigit
  },

  /**
   * Get cultural event emoji
   */
  getCulturalEventEmoji: (eventName: string): string => {
    const eventEmojis: Record<string, string> = {
      'santos_populares': '🎉',
      'festa_junina': '🌽',
      'fado': '🎵',
      'natal': '🎄',
      'carnaval': '🎭',
      'pascoa': '🐰',
      'dia_portugal': '🇵🇹',
      'romaria': '⛪',
      'festa_flor': '🌺',
      'vindimas': '🍇',
      'festa_castanha': '🌰',
      'sao_martinho': '🔥'
    }
    
    const key = eventName.toLowerCase().replace(/\s+/g, '_')
    return eventEmojis[key] || '🎊'
  }
}

// Service initialization helper
export const initializePortugueseServices = async (): Promise<{
  isAuthenticated: boolean
  userProfile: any
  culturalPreferences: any
}> => {
  try {
    const { userProfileService } = await import('./UserProfileService')
    const userProfile = await userProfileService.getCurrentUserProfile()
    const culturalPreferences = userProfile ? await userProfileService.getUserCulturalPreferences() : null
    
    return {
      isAuthenticated: !!userProfile,
      userProfile,
      culturalPreferences
    }
  } catch (error) {
    console.error('Error initializing Portuguese services:', error)
    return {
      isAuthenticated: false,
      userProfile: null,
      culturalPreferences: null
    }
  }
}