import { toast } from 'react-hot-toast'

// Service-to-Community Bridge Utility
// Automatically connects transport service clients to community networking

export interface ServiceCompletionData {
  serviceType: 'transport' | 'event' | 'premium_service' | 'business_networking'
  serviceName: string
  completedAt: string
  clientLocation: string
  serviceValue: number
  metadata: Record<string, any>
}

export interface CommunityInvitation {
  id: string
  serviceType: string
  serviceName: string
  suggestedGroups: string[]
  recommendedEvents: Array<{
    id: string
    title: string
    date: string
    location: string
    type: 'cultural' | 'networking' | 'social'
  }>
  incentives: Array<{
    type: 'discount' | 'free_access' | 'premium_trial'
    description: string
    value: string
    expiresAt: string
  }>
  autoEnrollOptions: {
    communityGroups: boolean
    eventNotifications: boolean
    networkingFeatures: boolean
  }
}

export class ServiceToCommunityBridge {
  private static instance: ServiceToCommunityBridge
  private recentCompletions: ServiceCompletionData[] = []
  private bridgeCompletions: Set<string> = new Set()
  
  static getInstance(): ServiceToCommunityBridge {
    if (!ServiceToCommunityBridge.instance) {
      ServiceToCommunityBridge.instance = new ServiceToCommunityBridge()
    }
    return ServiceToCommunityBridge.instance
  }

  constructor() {
    this.loadPersistedData()
  }

  // Record service completion for bridge processing
  recordServiceCompletion(serviceData: ServiceCompletionData): void {
    const completion = {
      ...serviceData,
      id: `completion-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`
    }
    
    this.recentCompletions.push(completion)
    this.persistData()
    
    // Auto-trigger community bridge for high-value services
    if (serviceData.serviceValue >= 100 || serviceData.serviceType === 'transport') {
      setTimeout(() => this.triggerCommunityBridge(completion), 2000)
    }
  }

  // Generate community invitation based on service completion
  generateCommunityInvitation(serviceData: ServiceCompletionData, language: string = 'en'): CommunityInvitation {
    const isPortuguese = language === 'pt'
    
    const baseInvitation: CommunityInvitation = {
      id: `invitation-${Date.now()}`,
      serviceType: serviceData.serviceType,
      serviceName: serviceData.serviceName,
      suggestedGroups: [],
      recommendedEvents: [],
      incentives: [],
      autoEnrollOptions: {
        communityGroups: true,
        eventNotifications: true,
        networkingFeatures: true
      }
    }

    // Service-specific community recommendations
    switch (serviceData.serviceType) {
      case 'transport':
        baseInvitation.suggestedGroups = [
          isPortuguese ? 'Exploradores de Londres' : 'London Explorers',
          isPortuguese ? 'Transporte Compartilhado' : 'Ride Sharing Community',
          isPortuguese ? 'Eventos Culturais' : 'Cultural Events'
        ]
        
        baseInvitation.recommendedEvents = [
          {
            id: 'cultural-tour-weekend',
            title: isPortuguese ? 'Tour Cultural de Fim de Semana' : 'Weekend Cultural Tour',
            date: this.getNextWeekendDate(),
            location: 'Central London',
            type: 'cultural'
          },
          {
            id: 'portuguese-business-mixer',
            title: isPortuguese ? 'Mixer de Negócios Portugueses' : 'Lusophone Business Mixer',
            date: this.getNextWeekDate(),
            location: 'City of London',
            type: 'networking'
          }
        ]
        
        baseInvitation.incentives = [
          {
            type: 'discount',
            description: isPortuguese 
              ? '20% desconto em próximos transportes'
              : '20% discount on future transport',
            value: '20%',
            expiresAt: this.getExpiryDate(30)
          },
          {
            type: 'free_access',
            description: isPortuguese
              ? 'Acesso gratuito a evento cultural'
              : 'Free access to cultural event',
            value: '1 event',
            expiresAt: this.getExpiryDate(60)
          }
        ]
        break

      case 'premium_service':
        baseInvitation.suggestedGroups = [
          isPortuguese ? 'Membros Premium' : 'Premium Members',
          isPortuguese ? 'Networking Executivo' : 'Executive Networking',
          isPortuguese ? 'Eventos Exclusivos' : 'Exclusive Events'
        ]
        break

      case 'business_networking':
        baseInvitation.suggestedGroups = [
          isPortuguese ? 'Empreendedores Portugueses' : 'Lusophone Entrepreneurs',
          isPortuguese ? 'Networking Profissional' : 'Professional Networking',
          isPortuguese ? 'Workshops de Negócios' : 'Business Workshops'
        ]
        break
    }

    return baseInvitation
  }

  // Trigger community bridge flow
  private triggerCommunityBridge(serviceData: ServiceCompletionData): void {
    if (this.bridgeCompletions.has(serviceData.id)) {
      return // Already processed
    }

    // Mark as processed
    this.bridgeCompletions.add(serviceData.id)
    
    // Emit custom event for UI components to listen
    const bridgeEvent = new CustomEvent('lusotown-service-bridge', {
      detail: {
        serviceData,
        timestamp: new Date().toISOString()
      }
    })
    
    if (typeof window !== 'undefined') {
      window.dispatchEvent(bridgeEvent)
    }
    
    this.persistData()
  }

  // Auto-enroll user in community features
  async autoEnrollInCommunity(invitationId: string, options: {
    joinGroups?: boolean
    enableNotifications?: boolean
    activateNetworking?: boolean
  }): Promise<{ success: boolean; message: string }> {
    try {
      const actions = []
      
      if (options.joinGroups) {
        // Auto-join suggested community groups
        actions.push('groups_joined')
      }
      
      if (options.enableNotifications) {
        // Enable event and networking notifications
        actions.push('notifications_enabled')
      }
      
      if (options.activateNetworking) {
        // Activate networking features
        actions.push('networking_activated')
      }
      
      // Store enrollment data
      const enrollmentData = {
        invitationId,
        actions,
        completedAt: new Date().toISOString()
      }
      
      localStorage.setItem('lusotown-community-enrollment', JSON.stringify(enrollmentData))
      
      return {
        success: true,
        message: `Successfully enrolled in ${actions.length} community features`
      }
    } catch (error) {
      console.error('Auto-enrollment error:', error)
      return {
        success: false,
        message: 'Failed to enroll in community features'
      }
    }
  }

  // Get recent service completions for review
  getRecentCompletions(days: number = 7): ServiceCompletionData[] {
    const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    return this.recentCompletions.filter(completion => 
      new Date(completion.completedAt) > cutoffDate
    )
  }

  // Check if user has pending community bridges
  hasPendingBridges(): boolean {
    return this.recentCompletions.some(completion => 
      !this.bridgeCompletions.has(completion.id) &&
      new Date(completion.completedAt) > new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
    )
  }

  // Mark bridge as completed
  markBridgeCompleted(serviceId: string): void {
    this.bridgeCompletions.add(serviceId)
    this.persistData()
  }

  // Utility methods
  private getNextWeekendDate(): string {
    const now = new Date()
    const daysUntilSaturday = (6 - now.getDay()) % 7 || 7
    const nextSaturday = new Date(now.getTime() + daysUntilSaturday * 24 * 60 * 60 * 1000)
    return nextSaturday.toISOString()
  }

  private getNextWeekDate(): string {
    const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    return nextWeek.toISOString()
  }

  private getExpiryDate(days: number): string {
    const expiry = new Date(Date.now() + days * 24 * 60 * 60 * 1000)
    return expiry.toISOString()
  }

  private loadPersistedData(): void {
    try {
      const completions = localStorage.getItem('lusotown-service-completions')
      const bridges = localStorage.getItem('lusotown-bridge-completions')
      
      if (completions) {
        this.recentCompletions = JSON.parse(completions)
      }
      
      if (bridges) {
        this.bridgeCompletions = new Set(JSON.parse(bridges))
      }
    } catch (error) {
      console.error('Error loading persisted bridge data:', error)
    }
  }

  private persistData(): void {
    try {
      localStorage.setItem('lusotown-service-completions', JSON.stringify(this.recentCompletions))
      localStorage.setItem('lusotown-bridge-completions', JSON.stringify(Array.from(this.bridgeCompletions)))
    } catch (error) {
      console.error('Error persisting bridge data:', error)
    }
  }

  // Static helper for recording transport completions
  static recordTransportCompletion(transportData: {
    serviceName: string
    pickupLocation: string
    dropoffLocation: string
    amount: number
    driverRating: number
    metadata?: Record<string, any>
  }): void {
    const bridge = ServiceToCommunityBridge.getInstance()
    
    bridge.recordServiceCompletion({
      serviceType: 'transport',
      serviceName: transportData.serviceName,
      completedAt: new Date().toISOString(),
      clientLocation: transportData.pickupLocation,
      serviceValue: transportData.amount,
      metadata: {
        ...transportData.metadata,
        pickup: transportData.pickupLocation,
        dropoff: transportData.dropoffLocation,
        rating: transportData.driverRating
      }
    })
    
    toast.success('Transport completed! Community features available.', {
      duration: 4000,
      icon: '🚗'
    })
  }

  // Static helper for recording event completions
  static recordEventCompletion(eventData: {
    eventName: string
    eventType: string
    location: string
    attendeeCount: number
    metadata?: Record<string, any>
  }): void {
    const bridge = ServiceToCommunityBridge.getInstance()
    
    bridge.recordServiceCompletion({
      serviceType: 'event',
      serviceName: eventData.eventName,
      completedAt: new Date().toISOString(),
      clientLocation: eventData.location,
      serviceValue: eventData.attendeeCount * 25, // Estimated value
      metadata: {
        ...eventData.metadata,
        eventType: eventData.eventType,
        attendees: eventData.attendeeCount
      }
    })
  }
}

// Export singleton instance
export const serviceToCommunityBridge = ServiceToCommunityBridge.getInstance()

// Event listener setup for browser environments
if (typeof window !== 'undefined') {
  // Clean up old completions periodically
  setInterval(() => {
    const bridge = ServiceToCommunityBridge.getInstance()
    const cutoffDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // 30 days
    
    // Clean old completions
    bridge.recentCompletions = bridge.recentCompletions.filter(completion => 
      new Date(completion.completedAt) > cutoffDate
    )
    
    bridge.persistData()
  }, 60 * 60 * 1000) // Every hour
}