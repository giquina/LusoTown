// Events & Tours Data and Management for LusoTown Portuguese Community

export interface EventTour {
  id: string
  title: string
  description: string
  date: string
  time: string
  endTime?: string
  location: string
  address: string
  category: 'Women 30+' | 'Women 40+' | 'Family-Friendly' | 'Mixed Groups' | 'Cultural Heritage' | 'Professional Networking'
  price: number
  currency: string
  maxAttendees: number
  currentAttendees: number
  hostName: string
  hostImage?: string
  imageUrl?: string
  featured: boolean
  groupExperience: boolean
  requiresApproval: boolean
  membershipRequired: 'free' | 'core' | 'premium'
  ageRestriction?: string
  portugueseOrigin?: ('Portugal' | 'Brazil' | 'Angola' | 'Mozambique' | 'Cape Verde' | 'All Lusophone')[]
  tags: string[]
  highlights: string[]
  whatToExpect: string[]
  whatToHear?: string
  whatToLearn?: string
  groupSize: string
  difficulty?: 'Easy' | 'Moderate' | 'Advanced'
  averageRating?: number
  totalReviews?: number
  createdAt: string
  updatedAt: string
}

export interface EventToursFilters {
  category?: string
  priceRange?: { min: number; max: number }
  membershipLevel?: 'free' | 'core' | 'premium'
  availability?: 'available' | 'waitlist' | 'all'
  searchQuery?: string
  portugueseOrigin?: string
  difficulty?: 'Easy' | 'Moderate' | 'Advanced'
  groupSize?: 'small' | 'medium' | 'large'
}

// Sample Events & Tours Data for Portuguese Community in London
export const eventsTours: EventTour[] = [
  {
    id: 'et-001',
    title: 'Portuguese Women 30+ Wine & Cultural Evening',
    description: 'An intimate evening for Portuguese women in their 30s to connect over authentic Portuguese wines and share stories about preserving our culture in London. Join us for heartfelt conversations about heritage, career, and building meaningful friendships.',
    date: '2025-08-20',
    time: '19:00',
    endTime: '22:00',
    location: 'Casa do Bacalhau',
    address: '47 South Lambeth Road, Stockwell, London SW8 1RH',
    category: 'Women 30+',
    price: 35,
    currency: 'GBP',
    maxAttendees: 20,
    currentAttendees: 12,
    hostName: 'Maria Santos',
    hostImage: '/profiles/community/member-3.jpg',
    imageUrl: '/events/wine-tasting.jpg',
    featured: true,
    groupExperience: true,
    requiresApproval: true,
    membershipRequired: 'core',
    ageRestriction: '30-39 years',
    portugueseOrigin: ['Portugal', 'Brazil', 'Angola'],
    tags: ['Women Only', 'Wine Tasting', 'Cultural Heritage', 'Networking', 'Stockwell'],
    highlights: [
      'Curated Portuguese wine selection from Douro Valley',
      'Discussion about preserving Portuguese traditions in London',
      'Small group setting for meaningful connections',
      'Traditional petiscos (Portuguese appetizers)'
    ],
    whatToExpect: [
      'Intimate group of 20 Portuguese women',
      'Guided wine tasting by Portuguese sommelier',
      'Cultural conversation about maintaining heritage abroad',
      'Exchange contacts and plan future meetups'
    ],
    whatToHear: 'Stories from Portuguese women about adapting to London life while staying connected to heritage',
    whatToLearn: 'How to maintain cultural identity while building a successful life in London',
    groupSize: 'Small (15-20 people)',
    difficulty: 'Easy',
    averageRating: 4.8,
    totalReviews: 24,
    createdAt: '2025-08-10T10:00:00Z',
    updatedAt: '2025-08-14T15:30:00Z'
  },
  {
    id: 'et-002',
    title: 'British Museum Portuguese Heritage Tour',
    description: 'Discover Portugal\'s maritime history and global influence through guided tour by Portuguese art historian. Perfect for families wanting to share Portuguese heritage with children in an educational London setting.',
    date: '2025-08-22',
    time: '14:00',
    endTime: '16:30',
    location: 'British Museum',
    address: 'Great Russell Street, Bloomsbury, London WC1B 3DG',
    category: 'Family-Friendly',
    price: 15,
    currency: 'GBP',
    maxAttendees: 30,
    currentAttendees: 18,
    hostName: 'Dr. João Pereira',
    hostImage: '/profiles/community/member-5.jpg',
    imageUrl: '/events/art-tour.jpg',
    featured: true,
    groupExperience: true,
    requiresApproval: false,
    membershipRequired: 'free',
    ageRestriction: 'All ages welcome',
    portugueseOrigin: ['All Lusophone'],
    tags: ['Family-Friendly', 'Educational', 'Cultural Heritage', 'Museum', 'Portuguese History'],
    highlights: [
      'Portuguese artifacts and maritime history',
      'Age of Discovery exhibitions explained in Portuguese context',
      'Family activities for children to learn Portuguese history',
      'Meet other Portuguese families in London'
    ],
    whatToExpect: [
      'Portuguese-guided museum tour',
      'Interactive activities for children',
      'Portuguese historical context for British Museum collections',
      'Family networking and connection opportunities'
    ],
    whatToHear: 'Stories of Portuguese explorers, traders, and cultural exchange',
    whatToLearn: 'How Portuguese heritage is represented in British Museum collections',
    groupSize: 'Medium (25-30 people)',
    difficulty: 'Easy',
    averageRating: 4.7,
    totalReviews: 18,
    createdAt: '2025-08-08T09:00:00Z',
    updatedAt: '2025-08-14T12:00:00Z'
  },
  {
    id: 'et-003',
    title: 'Women 40+ Professional Portuguese Network',
    description: 'Exclusive networking dinner for established Portuguese women (40+) in London. Share professional experiences, mentor younger community members, and build business connections within the Portuguese diaspora.',
    date: '2025-08-25',
    time: '18:30',
    endTime: '21:30',
    location: 'Taberna Real',
    address: '56 Little Turnstile, Holborn, London WC1V 7DD',
    category: 'Women 40+',
    price: 55,
    currency: 'GBP',
    maxAttendees: 16,
    currentAttendees: 9,
    hostName: 'Dr. Teresa Rodrigues',
    hostImage: '/profiles/community/member-8.jpg',
    imageUrl: '/events/networking.jpg',
    featured: true,
    groupExperience: true,
    requiresApproval: true,
    membershipRequired: 'premium',
    ageRestriction: '40+ years',
    portugueseOrigin: ['Portugal', 'Brazil'],
    tags: ['Women Only', 'Professional Networking', 'Business', '40+', 'Mentorship'],
    highlights: [
      'Exclusive dining at authentic Portuguese restaurant',
      'Professional mentorship opportunities',
      'Business card exchange and LinkedIn connections',
      'Discussion about career advancement in UK market'
    ],
    whatToExpect: [
      'Intimate dinner with successful Portuguese women',
      'Professional networking and business discussions',
      'Mentorship circle for community guidance',
      'Strategic partnerships and collaboration opportunities'
    ],
    whatToHear: 'Career success stories from Portuguese women who built businesses in London',
    whatToLearn: 'Professional strategies for advancing in UK market while maintaining Portuguese identity',
    groupSize: 'Small (12-16 people)',
    difficulty: 'Easy',
    averageRating: 4.9,
    totalReviews: 12,
    createdAt: '2025-08-09T11:00:00Z',
    updatedAt: '2025-08-14T16:45:00Z'
  },
  {
    id: 'et-004',
    title: 'Portuguese Language Exchange at Tate Modern',
    description: 'Combine art appreciation with language learning! Portuguese and English speakers explore contemporary art while practicing languages. Perfect for Portuguese community members wanting to improve English or help others learn Portuguese.',
    date: '2025-08-24',
    time: '11:00',
    endTime: '14:00',
    location: 'Tate Modern',
    address: 'Bankside, London SE1 9TG',
    category: 'Mixed Groups',
    price: 20,
    currency: 'GBP',
    maxAttendees: 24,
    currentAttendees: 15,
    hostName: 'Carlos Mendes',
    hostImage: '/profiles/community/member-7.jpg',
    imageUrl: '/events/art-tour.jpg',
    featured: false,
    groupExperience: true,
    requiresApproval: false,
    membershipRequired: 'core',
    ageRestriction: '18+ years',
    portugueseOrigin: ['All Lusophone'],
    tags: ['Language Exchange', 'Art', 'Cultural', 'Mixed Ages', 'Education'],
    highlights: [
      'Art discussion in Portuguese and English',
      'Language practice in cultural setting',
      'Museum exploration with Portuguese perspective',
      'International networking with language learners'
    ],
    whatToExpect: [
      'Guided art tour with language learning component',
      'Portuguese-English conversation practice',
      'Cultural exchange about art interpretation',
      'Coffee break for informal conversation'
    ],
    whatToHear: 'Art discussions blending Portuguese and English perspectives',
    whatToLearn: 'Art vocabulary in both languages and cultural appreciation techniques',
    groupSize: 'Medium (20-24 people)',
    difficulty: 'Moderate',
    averageRating: 4.6,
    totalReviews: 22,
    createdAt: '2025-08-07T14:00:00Z',
    updatedAt: '2025-08-14T11:15:00Z'
  },
  {
    id: 'et-005',
    title: 'Fado Night & Cultural Heritage Celebration',
    description: 'Authentic Fado evening celebrating Portuguese soul music and cultural heritage. Experience traditional Fado performances while connecting with Portuguese community members who share love for our musical traditions.',
    date: '2025-08-28',
    time: '20:00',
    endTime: '23:00',
    location: 'Portuguese Cultural Centre',
    address: '180 South Lambeth Road, Stockwell, London SW8 1UQ',
    category: 'Cultural Heritage',
    price: 25,
    currency: 'GBP',
    maxAttendees: 50,
    currentAttendees: 32,
    hostName: 'Amália Silva',
    hostImage: '/profiles/community/member-4.jpg',
    imageUrl: '/events/wine-paint.jpg',
    featured: true,
    groupExperience: true,
    requiresApproval: false,
    membershipRequired: 'free',
    ageRestriction: 'All ages welcome',
    portugueseOrigin: ['Portugal'],
    tags: ['Fado', 'Cultural Heritage', 'Music', 'Traditional', 'Community'],
    highlights: [
      'Live Fado performance by London-based Portuguese artists',
      'Traditional Portuguese wine and appetizers',
      'Cultural education about Fado history and significance',
      'Community singing and cultural celebration'
    ],
    whatToExpect: [
      'Authentic Fado musical performance',
      'Cultural storytelling about Portuguese traditions',
      'Community networking with fellow Portuguese',
      'Traditional food and wine accompaniment'
    ],
    whatToHear: 'Traditional Fado songs and stories about Portuguese emigration and longing',
    whatToLearn: 'History and cultural significance of Fado in Portuguese identity',
    groupSize: 'Large (40-50 people)',
    difficulty: 'Easy',
    averageRating: 4.8,
    totalReviews: 35,
    createdAt: '2025-08-05T16:00:00Z',
    updatedAt: '2025-08-14T14:20:00Z'
  },
  {
    id: 'et-006',
    title: 'Weekend Trip: Portuguese Heritage in Canterbury',
    description: 'Day trip exploring Portuguese connections to Canterbury Cathedral and historic England. Perfect for families and heritage enthusiasts wanting to discover Portuguese influence in English history.',
    date: '2025-08-30',
    time: '09:00',
    endTime: '18:00',
    location: 'Canterbury',
    address: 'Meeting Point: Victoria Coach Station, London',
    category: 'Family-Friendly',
    price: 45,
    currency: 'GBP',
    maxAttendees: 35,
    currentAttendees: 22,
    hostName: 'Miguel Tavares',
    hostImage: '/profiles/community/member-6.jpg',
    imageUrl: '/events/book-club.jpg',
    featured: false,
    groupExperience: true,
    requiresApproval: false,
    membershipRequired: 'core',
    ageRestriction: 'All ages welcome',
    portugueseOrigin: ['All Lusophone'],
    tags: ['Day Trip', 'Heritage', 'Family-Friendly', 'History', 'Canterbury'],
    highlights: [
      'Guided tour of Canterbury Cathedral with Portuguese historical context',
      'Coach transport from London with Portuguese community',
      'Group lunch at traditional English pub',
      'Historical exploration of Portuguese-English connections'
    ],
    whatToExpect: [
      'Full-day coach trip with Portuguese guide',
      'Canterbury Cathedral tour with Portuguese historical perspective',
      'Group meals and community bonding time',
      'Free time to explore Canterbury with fellow Portuguese'
    ],
    whatToHear: 'Stories of Portuguese-English historical connections and medieval trade',
    whatToLearn: 'How Portuguese merchants and nobles influenced English history',
    groupSize: 'Large (30-35 people)',
    difficulty: 'Moderate',
    averageRating: 4.5,
    totalReviews: 16,
    createdAt: '2025-08-06T13:00:00Z',
    updatedAt: '2025-08-14T17:00:00Z'
  }
]

// Event Tour Categories with descriptions
export const EVENT_TOUR_CATEGORIES = {
  'Women 30+': {
    description: 'Exclusive experiences for Portuguese women in their 30s',
    icon: '👩‍💼',
    color: 'bg-coral-500'
  },
  'Women 40+': {
    description: 'Professional networking and cultural experiences for established Portuguese women',
    icon: '👩‍💼',
    color: 'bg-premium-500'
  },
  'Family-Friendly': {
    description: 'Cultural experiences perfect for Portuguese families with children',
    icon: '👨‍👩‍👧‍👦',
    color: 'bg-secondary-500'
  },
  'Mixed Groups': {
    description: 'Open experiences for all Portuguese community members',
    icon: '🤝',
    color: 'bg-primary-500'
  },
  'Cultural Heritage': {
    description: 'Traditional Portuguese cultural celebrations and preservation',
    icon: '🏛️',
    color: 'bg-accent-500'
  },
  'Professional Networking': {
    description: 'Business and career development for Portuguese professionals',
    icon: '💼',
    color: 'bg-action-500'
  }
}

// Events Tours Service
export class EventsToursService {
  static getEventsTours(filters?: EventToursFilters): EventTour[] {
    let filtered = [...eventsTours]

    if (filters?.category) {
      filtered = filtered.filter(event => event.category === filters.category)
    }

    if (filters?.priceRange) {
      filtered = filtered.filter(event => 
        event.price >= filters.priceRange!.min && event.price <= filters.priceRange!.max
      )
    }

    if (filters?.membershipLevel) {
      filtered = filtered.filter(event => {
        if (filters.membershipLevel === 'free') return event.membershipRequired === 'free'
        if (filters.membershipLevel === 'core') return ['free', 'core'].includes(event.membershipRequired)
        if (filters.membershipLevel === 'premium') return ['free', 'core', 'premium'].includes(event.membershipRequired)
        return true
      })
    }

    if (filters?.availability) {
      if (filters.availability === 'available') {
        filtered = filtered.filter(event => event.currentAttendees < event.maxAttendees)
      } else if (filters.availability === 'waitlist') {
        filtered = filtered.filter(event => event.currentAttendees >= event.maxAttendees)
      }
    }

    if (filters?.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query) ||
        event.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    if (filters?.portugueseOrigin) {
      filtered = filtered.filter(event =>
        event.portugueseOrigin?.includes(filters.portugueseOrigin as any) ||
        event.portugueseOrigin?.includes('All Lusophone')
      )
    }

    if (filters?.difficulty) {
      filtered = filtered.filter(event => event.difficulty === filters.difficulty)
    }

    if (filters?.groupSize) {
      filtered = filtered.filter(event => {
        if (filters.groupSize === 'small') return event.maxAttendees <= 20
        if (filters.groupSize === 'medium') return event.maxAttendees > 20 && event.maxAttendees <= 35
        if (filters.groupSize === 'large') return event.maxAttendees > 35
        return true
      })
    }

    // Sort by date (upcoming first) and featured status
    return filtered.sort((a, b) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    })
  }

  static getFeaturedEventsTours(limit: number = 3): EventTour[] {
    return eventsTours
      .filter(event => event.featured)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, limit)
  }

  static getEventTourById(id: string): EventTour | undefined {
    return eventsTours.find(event => event.id === id)
  }

  static getEventToursByCategory(category: string): EventTour[] {
    return eventsTours.filter(event => event.category === category)
  }
}

export const eventsToursService = new EventsToursService()