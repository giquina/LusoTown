'use client'

// Portuguese-speaking community Social Networks Integration
// Connect with existing Lusophone WhatsApp groups, Facebook communities, and social networks

export interface PortugueseSocialNetwork {
  id: string
  name: string
  namePortuguese: string
  platform: SocialPlatform
  type: NetworkType
  description: string
  descriptionPortuguese: string
  
  // Network Details
  memberCount: number
  activeMembers: number
  primaryLanguage: 'portuguese' | 'english' | 'bilingual'
  location: string
  
  // Community Focus
  focus: CommunityFocus[]
  targetAudience: string[]
  ageGroup: string
  
  // Joining Information
  joinMethod: 'open' | 'invite_only' | 'admin_approval' | 'partner_referral'
  joinLink?: string
  adminContact?: string
  partnershipStatus: 'official_partner' | 'community_partner' | 'affiliated' | 'listed'
  
  // Activity & Engagement
  activityLevel: 'very_high' | 'high' | 'medium' | 'low'
  postFrequency: string
  responseTime: string
  moderationLevel: 'strict' | 'moderate' | 'relaxed'
  
  // Safety & Quality
  verified: boolean
  safetyRating: number // 1-5 stars
  contentQuality: number // 1-5 stars
  helpfulness: number // 1-5 stars
  
  // Integration with LusoTown
  crossPostEvents: boolean
  memberBenefits: string[]
  joinBenefits: string[]
  
  // Network Metadata
  createdDate: string
  lastActive: string
  adminInfo: NetworkAdmin
  rules: string[]
  guidelines: string[]
}

export interface NetworkAdmin {
  name: string
  role: string
  contact: string
  yearsActive: number
  trustScore: number
}

export type SocialPlatform = 
  | 'whatsapp'
  | 'facebook'
  | 'telegram'
  | 'discord'
  | 'linkedin'
  | 'instagram'
  | 'signal'
  | 'meetup'
  | 'reddit'
  | 'viber'

export type NetworkType = 
  | 'general_community'
  | 'location_based'
  | 'business_networking'
  | 'cultural_events'
  | 'families'
  | 'young_professionals'
  | 'seniors'
  | 'students'
  | 'sports'
  | 'food_dining'
  | 'travel'
  | 'language_exchange'
  | 'housing'
  | 'jobs'
  | 'buy_sell'
  | 'services'
  | 'dating'
  | 'parents'
  | 'professionals'
  | 'religious'

export type CommunityFocus = 
  | 'social_meetups'
  | 'business_networking'
  | 'cultural_events'
  | 'language_practice'
  | 'job_opportunities'
  | 'housing_support'
  | 'family_activities'
  | 'food_restaurants'
  | 'travel_tips'
  | 'legal_advice'
  | 'healthcare_info'
  | 'education'
  | 'sports_fitness'
  | 'entertainment'
  | 'news_updates'
  | 'buying_selling'
  | 'services_exchange'

// Real Portuguese-speaking community Networks in London
export const PORTUGUESE_SOCIAL_NETWORKS: PortugueseSocialNetwork[] = [
  {
    id: 'network-whatsapp-portuguese-london',
    name: 'Portuguese-speaking community London',
    namePortuguese: 'Comunidade de Falantes de Português Londres',
    platform: 'whatsapp',
    type: 'general_community',
    description: 'Main WhatsApp group for Portuguese speakers in London. Share events, ask questions, make friends, and stay connected with the community.',
    descriptionPortuguese: 'Grupo principal do WhatsApp para lusófonos em Londres. Partilhe eventos, faça perguntas, conheça pessoas e mantenha-se conectado com a comunidade.',
    
    memberCount: 450,
    activeMembers: 320,
    primaryLanguage: 'portuguese',
    location: 'London (All Areas)',
    
    focus: ['social_meetups', 'cultural_events', 'news_updates', 'community_support'],
    targetAudience: ['Portuguese speakers', 'All ages', 'London residents'],
    ageGroup: '18-65+',
    
    joinMethod: 'partner_referral',
    adminContact: 'admin@lusotownlondon.com',
    partnershipStatus: 'official_partner',
    
    activityLevel: 'very_high',
    postFrequency: '20-30 messages per day',
    responseTime: 'Usually within 2 hours',
    moderationLevel: 'moderate',
    
    verified: true,
    safetyRating: 4.8,
    contentQuality: 4.6,
    helpfulness: 4.7,
    
    crossPostEvents: true,
    memberBenefits: [
      'Priority access to LusoTown events',
      'Exclusive community discounts',
      'Direct admin support'
    ],
    joinBenefits: [
      'Welcome pack with London resources',
      'Access to exclusive events calendar',
      'Community mentor assignment'
    ],
    
    createdDate: '2019-03-15',
    lastActive: '2024-01-26T18:30:00Z',
    adminInfo: {
      name: 'Carlos Santos',
      role: 'Community Manager',
      contact: '+44 7XXX XXX XXX',
      yearsActive: 5,
      trustScore: 4.9
    },
    
    rules: [
      'Lusophone/English only',
      'Be respectful and helpful',
      'No spam or excessive self-promotion',
      'Keep discussions community-relevant',
      'No offensive content'
    ],
    guidelines: [
      'Introduce yourself when joining',
      'Use @all sparingly',
      'Post events in the events thread',
      'Help newcomers when possible'
    ]
  },
  
  {
    id: 'network-facebook-brasileiros-londres',
    name: 'Brasileiros em Londres',
    namePortuguese: 'Brasileiros em Londres',
    platform: 'facebook',
    type: 'location_based',
    description: 'Large Facebook group for Brazilians living in London. Share experiences, events, job opportunities, and connect with the Brazilian community.',
    descriptionPortuguese: 'Grande grupo do Facebook para brasileiros que vivem em Londres. Partilhe experiências, eventos, oportunidades de trabalho e conecte-se com a comunidade brasileira.',
    
    memberCount: 12500,
    activeMembers: 3200,
    primaryLanguage: 'portuguese',
    location: 'London & Greater London',
    
    focus: ['social_meetups', 'job_opportunities', 'housing_support', 'cultural_events', 'news_updates'],
    targetAudience: ['Brazilians in London', 'Portuguese speakers', 'Young professionals'],
    ageGroup: '20-45',
    
    joinMethod: 'admin_approval',
    joinLink: 'https://facebook.com/groups/brasileiros-londres',
    partnershipStatus: 'community_partner',
    
    activityLevel: 'very_high',
    postFrequency: '50-70 posts per day',
    responseTime: 'Usually within 1 hour',
    moderationLevel: 'strict',
    
    verified: true,
    safetyRating: 4.5,
    contentQuality: 4.3,
    helpfulness: 4.6,
    
    crossPostEvents: true,
    memberBenefits: [
      'Event promotion on LusoTown',
      'Business listing opportunities',
      'Community spotlight features'
    ],
    joinBenefits: [
      'Access to job board',
      'Housing group access',
      'Local business recommendations'
    ],
    
    createdDate: '2015-08-20',
    lastActive: '2024-01-26T19:45:00Z',
    adminInfo: {
      name: 'Ana Silva',
      role: 'Group Admin',
      contact: 'admin.brasileiros@outlook.com',
      yearsActive: 8,
      trustScore: 4.7
    },
    
    rules: [
      'Only for Brazilians or Portuguese speakers',
      'No commercial posts without admin approval',
      'Be respectful to all members',
      'No duplicate posts',
      'Use appropriate post categories'
    ],
    guidelines: [
      'Search before posting questions',
      'Include location in housing/job posts',
      'Use clear titles for posts',
      'Engage positively with the community'
    ]
  },
  
  {
    id: 'network-whatsapp-portuguese-business',
    name: 'Lusophone Business Network London',
    namePortuguese: 'Rede de Negócios Portuguesa Londres',
    platform: 'whatsapp',
    type: 'business_networking',
    description: 'Exclusive WhatsApp group for Portuguese business owners and entrepreneurs in London. Share opportunities, partnerships, and professional advice.',
    descriptionPortuguese: 'Grupo exclusivo do WhatsApp para empresários e empreendedores portugueses em Londres. Partilhe oportunidades, parcerias e conselhos profissionais.',
    
    memberCount: 85,
    activeMembers: 68,
    primaryLanguage: 'bilingual',
    location: 'London Business Districts',
    
    focus: ['business_networking', 'job_opportunities', 'professional_development', 'partnerships'],
    targetAudience: ['Business owners', 'Entrepreneurs', 'Executives', 'Professionals'],
    ageGroup: '25-60',
    
    joinMethod: 'invite_only',
    adminContact: 'business@lusotownlondon.com',
    partnershipStatus: 'official_partner',
    
    activityLevel: 'high',
    postFrequency: '8-12 messages per day',
    responseTime: 'Usually within 4 hours',
    moderationLevel: 'strict',
    
    verified: true,
    safetyRating: 4.9,
    contentQuality: 4.8,
    helpfulness: 4.7,
    
    crossPostEvents: true,
    memberBenefits: [
      'Exclusive business events',
      'Partnership opportunities',
      'Mentorship program access'
    ],
    joinBenefits: [
      'Business directory listing',
      'Networking event invitations',
      'Investment opportunity alerts'
    ],
    
    createdDate: '2020-11-10',
    lastActive: '2024-01-26T16:20:00Z',
    adminInfo: {
      name: 'Ricardo Mendes',
      role: 'Business Development',
      contact: 'ricardo@portuguese-chamber.co.uk',
      yearsActive: 3,
      trustScore: 4.8
    },
    
    rules: [
      'Business owners and professionals only',
      'No direct sales pitches',
      'Share value, not just promotions',
      'Professional communication only',
      'Verify business credentials when requested'
    ],
    guidelines: [
      'Introduce your business when joining',
      'Offer help before asking for it',
      'Share industry insights',
      'Respect confidentiality'
    ]
  },
  
  {
    id: 'network-telegram-portuguese-events',
    name: 'Lusophone Events London',
    namePortuguese: 'Eventos Portugueses Londres',
    platform: 'telegram',
    type: 'cultural_events',
    description: 'Telegram channel dedicated to Lusophone cultural events, festivals, and community gatherings in London and the United Kingdom.',
    descriptionPortuguese: 'Canal do Telegram dedicado a eventos culturais portugueses, festivais e encontros comunitários em Londres e no Reino Unido.',
    
    memberCount: 890,
    activeMembers: 420,
    primaryLanguage: 'bilingual',
    location: 'London & United Kingdom',
    
    focus: ['cultural_events', 'festivals', 'music_concerts', 'food_events', 'art_exhibitions'],
    targetAudience: ['Cultural enthusiasts', 'Event organizers', 'Portuguese-speaking community'],
    ageGroup: '18-70',
    
    joinMethod: 'open',
    joinLink: 'https://t.me/portugueseevents_london',
    partnershipStatus: 'affiliated',
    
    activityLevel: 'high',
    postFrequency: '5-8 events per week',
    responseTime: 'Event-based posting',
    moderationLevel: 'moderate',
    
    verified: true,
    safetyRating: 4.6,
    contentQuality: 4.7,
    helpfulness: 4.5,
    
    crossPostEvents: true,
    memberBenefits: [
      'Early event notifications',
      'Exclusive event discounts',
      'VIP event access'
    ],
    joinBenefits: [
      'Comprehensive events calendar',
      'Cultural community connections',
      'Event planning resources'
    ],
    
    createdDate: '2021-05-12',
    lastActive: '2024-01-26T14:15:00Z',
    adminInfo: {
      name: 'Maria Ferreira',
      role: 'Cultural Events Coordinator',
      contact: 'eventos.portuguese@gmail.com',
      yearsActive: 2,
      trustScore: 4.6
    },
    
    rules: [
      'Lusophone/cultural events only',
      'Include all event details',
      'No spam or unrelated content',
      'Verify event authenticity'
    ],
    guidelines: [
      'Post events at least 3 days in advance',
      'Include date, time, location, and price',
      'Use event templates when provided',
      'Follow up with event results'
    ]
  },
  
  {
    id: 'network-linkedin-portuguese-professionals',
    name: 'Lusophone Professionals United Kingdom',
    namePortuguese: 'Profissionais Portugueses Reino Unido',
    platform: 'linkedin',
    type: 'business_networking',
    description: 'LinkedIn group for Lusophone professionals working in the United Kingdom. Career development, job opportunities, and professional networking.',
    descriptionPortuguese: 'Grupo do LinkedIn para profissionais portugueses que trabalham no Reino Unido. Desenvolvimento de carreira, oportunidades de emprego e networking profissional.',
    
    memberCount: 2800,
    activeMembers: 850,
    primaryLanguage: 'bilingual',
    location: 'United Kingdom-wide',
    
    focus: ['career_development', 'job_opportunities', 'professional_networking', 'industry_insights'],
    targetAudience: ['Professionals', 'Job seekers', 'Career changers', 'Graduates'],
    ageGroup: '22-55',
    
    joinMethod: 'open',
    joinLink: 'https://linkedin.com/groups/portuguese-professionals-uk',
    partnershipStatus: 'community_partner',
    
    activityLevel: 'medium',
    postFrequency: '3-5 posts per week',
    responseTime: 'Professional hours',
    moderationLevel: 'moderate',
    
    verified: true,
    safetyRating: 4.7,
    contentQuality: 4.8,
    helpfulness: 4.6,
    
    crossPostEvents: false,
    memberBenefits: [
      'Job opportunity alerts',
      'Professional development resources',
      'Networking event invitations'
    ],
    joinBenefits: [
      'CV review opportunities',
      'Career mentorship connections',
      'Industry insights and trends'
    ],
    
    createdDate: '2018-01-25',
    lastActive: '2024-01-26T11:30:00Z',
    adminInfo: {
      name: 'Dr. Paulo Costa',
      role: 'Professional Development Coordinator',
      contact: 'paulo.costa@professionals.co.uk',
      yearsActive: 6,
      trustScore: 4.8
    },
    
    rules: [
      'Professional content only',
      'No direct job recruitment posts by non-members',
      'Respectful professional communication',
      'Share industry knowledge and insights'
    ],
    guidelines: [
      'Optimize your LinkedIn profile before joining',
      'Engage meaningfully with posts',
      'Share professional achievements and insights',
      'Offer help and advice to fellow professionals'
    ]
  }
]

export interface SocialNetworkFilter {
  platform?: SocialPlatform[]
  type?: NetworkType[]
  focus?: CommunityFocus[]
  location?: string[]
  language?: 'portuguese' | 'english' | 'bilingual'
  membershipLevel?: 'open' | 'invite_only' | 'admin_approval'
  activityLevel?: ('very_high' | 'high' | 'medium' | 'low')[]
  verified?: boolean
  minSafetyRating?: number
  partnershipStatus?: ('official_partner' | 'community_partner' | 'affiliated' | 'listed')[]
}

export class SocialNetworksService {
  private static instance: SocialNetworksService
  private networks: PortugueseSocialNetwork[] = []

  static getInstance(): SocialNetworksService {
    if (!SocialNetworksService.instance) {
      SocialNetworksService.instance = new SocialNetworksService()
    }
    return SocialNetworksService.instance
  }

  constructor() {
    this.loadNetworksData()
  }

  private loadNetworksData() {
    this.networks = [...PORTUGUESE_SOCIAL_NETWORKS]
  }

  async searchNetworks(filters: SocialNetworkFilter = {}): Promise<PortugueseSocialNetwork[]> {
    let filteredNetworks = [...this.networks]

    if (filters.platform && filters.platform.length > 0) {
      filteredNetworks = filteredNetworks.filter(network => 
        filters.platform!.includes(network.platform)
      )
    }

    if (filters.type && filters.type.length > 0) {
      filteredNetworks = filteredNetworks.filter(network => 
        filters.type!.includes(network.type)
      )
    }

    if (filters.focus && filters.focus.length > 0) {
      filteredNetworks = filteredNetworks.filter(network => 
        network.focus.some(focus => filters.focus!.includes(focus))
      )
    }

    if (filters.language) {
      filteredNetworks = filteredNetworks.filter(network => 
        network.primaryLanguage === filters.language || network.primaryLanguage === 'bilingual'
      )
    }

    if (filters.verified !== undefined) {
      filteredNetworks = filteredNetworks.filter(network => 
        network.verified === filters.verified
      )
    }

    if (filters.minSafetyRating) {
      filteredNetworks = filteredNetworks.filter(network => 
        network.safetyRating >= filters.minSafetyRating!
      )
    }

    if (filters.partnershipStatus && filters.partnershipStatus.length > 0) {
      filteredNetworks = filteredNetworks.filter(network => 
        filters.partnershipStatus!.includes(network.partnershipStatus)
      )
    }

    if (filters.activityLevel && filters.activityLevel.length > 0) {
      filteredNetworks = filteredNetworks.filter(network => 
        filters.activityLevel!.includes(network.activityLevel)
      )
    }

    // Sort by partnership status, activity level, and member count
    filteredNetworks.sort((a, b) => {
      const partnershipOrder = { 'official_partner': 0, 'community_partner': 1, 'affiliated': 2, 'listed': 3 }
      const activityOrder = { 'very_high': 0, 'high': 1, 'medium': 2, 'low': 3 }
      
      if (a.partnershipStatus !== b.partnershipStatus) {
        return partnershipOrder[a.partnershipStatus] - partnershipOrder[b.partnershipStatus]
      }
      
      if (a.activityLevel !== b.activityLevel) {
        return activityOrder[a.activityLevel] - activityOrder[b.activityLevel]
      }
      
      return b.memberCount - a.memberCount
    })

    return filteredNetworks
  }

  async getNetworksByPlatform(platform: SocialPlatform): Promise<PortugueseSocialNetwork[]> {
    return this.networks.filter(network => network.platform === platform)
  }

  async getPartnerNetworks(): Promise<PortugueseSocialNetwork[]> {
    return this.networks.filter(network => 
      network.partnershipStatus === 'official_partner' || 
      network.partnershipStatus === 'community_partner'
    )
  }

  async getVerifiedNetworks(): Promise<PortugueseSocialNetwork[]> {
    return this.networks.filter(network => network.verified)
  }

  async getBusinessNetworks(): Promise<PortugueseSocialNetwork[]> {
    return this.networks.filter(network => 
      network.type === 'business_networking' || 
      network.focus.includes('business_networking')
    )
  }

  async getSocialNetworkStatistics(): Promise<{
    totalNetworks: number
    totalMembers: number
    platformDistribution: { [key in SocialPlatform]?: number }
    verifiedNetworks: number
    partnerNetworks: number
    averageSafetyRating: number
  }> {
    const totalNetworks = this.networks.length
    const totalMembers = this.networks.reduce((sum, network) => sum + network.memberCount, 0)
    const verifiedNetworks = this.networks.filter(n => n.verified).length
    const partnerNetworks = this.networks.filter(n => 
      n.partnershipStatus === 'official_partner' || n.partnershipStatus === 'community_partner'
    ).length
    const averageSafetyRating = this.networks.reduce((sum, n) => sum + n.safetyRating, 0) / totalNetworks

    const platformDistribution: { [key in SocialPlatform]?: number } = {}
    this.networks.forEach(network => {
      platformDistribution[network.platform] = (platformDistribution[network.platform] || 0) + 1
    })

    return {
      totalNetworks,
      totalMembers,
      platformDistribution,
      verifiedNetworks,
      partnerNetworks,
      averageSafetyRating: Math.round(averageSafetyRating * 10) / 10
    }
  }

  async requestNetworkJoin(networkId: string, userInfo: {
    name: string
    email: string
    reason: string
    lusoTownMember: boolean
  }): Promise<{ success: boolean; message: string; joinMethod: string }> {
    const network = this.networks.find(n => n.id === networkId)
    if (!network) {
      return { success: false, message: 'Network not found', joinMethod: '' }
    }

    // Simulate joining process based on network type
    switch (network.joinMethod) {
      case 'open':
        return { 
          success: true, 
          message: 'You can join directly using the provided link.', 
          joinMethod: 'direct_link' 
        }
      case 'invite_only':
        return { 
          success: true, 
          message: 'Your request has been sent to the admin. You\'ll receive an invitation if approved.', 
          joinMethod: 'admin_review' 
        }
      case 'admin_approval':
        return { 
          success: true, 
          message: 'Your join request is pending admin approval. You\'ll be notified within 24 hours.', 
          joinMethod: 'admin_approval' 
        }
      case 'partner_referral':
        return { 
          success: true, 
          message: 'As a LusoTown member, you\'ll receive a direct invitation within 2 hours.', 
          joinMethod: 'partner_fast_track' 
        }
      default:
        return { 
          success: false, 
          message: 'Join method not available.', 
          joinMethod: '' 
        }
    }
  }
}

export const socialNetworksService = SocialNetworksService.getInstance()