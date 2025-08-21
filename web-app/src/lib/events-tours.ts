// Events & Tours Data and Management for LusoTown Portuguese Community

import { TOURS_PRICING } from '@/config/pricing'

export interface EventTour {
  id: string
  title: string
  description: string
  date: string
  time: string
  endTime?: string
  location: string
  address: string
  category: 'Women 30+' | 'Women 40+' | 'Business & Professional' | 'Mixed Groups' | 'Cultural Heritage' | 'Professional Networking' | 'Technology & AI' | 'Finance & Investment' | 'Music & Nightlife' | 'Cultural Tours' | 'Social Experiences' | 'Arts & Entertainment'
  price: number
  currency: string
  maxAttendees: number
  currentAttendees: number
  status?: 'draft' | 'published' | 'cancelled' | 'completed' | 'fully-booked'
  allowWaitlist?: boolean
  maxWaitingList?: number
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
    price: TOURS_PRICING.womenNetworking.wine30Plus,
    currency: 'GBP',
    maxAttendees: 20,
    currentAttendees: 20,
    status: 'fully-booked',
    allowWaitlist: true,
    maxWaitingList: 50,
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
    title: 'Website Creation Masterclass: Portuguese Professionals',
    description: 'Learn to build modern websites using HTML, CSS, and JavaScript for business growth. Open to all Portuguese speakers interested in web development, from complete beginners to business professionals.',
    date: '2025-08-22',
    time: '14:00',
    endTime: '16:30',
    location: 'Level39 - Canary Wharf',
    address: 'One Canada Square, Level 39, London E14 5AB',
    category: 'Business & Professional',
    price: TOURS_PRICING.professional.websiteCreation,
    currency: 'GBP',
    maxAttendees: 30,
    currentAttendees: 30,
    status: 'fully-booked',
    allowWaitlist: true,
    maxWaitingList: 50,
    hostName: 'Ricardo Silva',
    hostImage: '/profiles/community/member-5.jpg',
    imageUrl: '/events/art-tour.jpg',
    featured: true,
    groupExperience: true,
    requiresApproval: false,
    membershipRequired: 'core',
    ageRestriction: '18+ all backgrounds welcome',
    portugueseOrigin: ['All Lusophone'],
    tags: ['Web Development', 'HTML/CSS', 'Professional Development', 'Career Growth', 'Beginner Friendly'],
    highlights: [
      'Hands-on website development training with practical examples',
      'Learn HTML, CSS, and JavaScript for business websites',
      'Practical implementation strategies for immediate use',
      'Network with Portuguese web development enthusiasts and professionals'
    ],
    whatToExpect: [
      'Interactive coding workshop with practical exercises',
      'Beginner-friendly approach to web development',
      'Real-world examples of successful business websites',
      'Networking break with fellow Portuguese web development enthusiasts'
    ],
    whatToHear: 'Success stories of Portuguese professionals using web development in their careers',
    whatToLearn: 'How to build professional websites effectively for business growth and career advancement',
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
    description: 'Exclusive networking dinner for established Portuguese women (40+) in London. Share professional experiences, mentor younger Portuguese speakers, and build business connections within the Portuguese diaspora.',
    date: '2025-08-25',
    time: '18:30',
    endTime: '21:30',
    location: 'Taberna Real',
    address: '56 Little Turnstile, Holborn, London WC1V 7DD',
    category: 'Women 40+',
    price: TOURS_PRICING.womenNetworking.professional40Plus,
    currency: 'GBP',
    maxAttendees: 16,
    currentAttendees: 16,
    status: 'fully-booked',
    allowWaitlist: true,
    maxWaitingList: 50,
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
    description: 'Combine art appreciation with language learning! Portuguese and English speakers explore contemporary art while practicing languages. Perfect for Portuguese speakers wanting to improve English or help others learn Portuguese.',
    date: '2025-08-24',
    time: '11:00',
    endTime: '14:00',
    location: 'Tate Modern',
    address: 'Bankside, London SE1 9TG',
    category: 'Mixed Groups',
    price: TOURS_PRICING.cultural.languageExchange,
    currency: 'GBP',
    maxAttendees: 24,
    currentAttendees: 24,
    status: 'fully-booked',
    allowWaitlist: true,
    maxWaitingList: 50,
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
    description: 'Authentic Fado evening celebrating Portuguese soul music and cultural heritage. Experience traditional Fado performances while connecting with Portuguese speakers who share love for our musical traditions.',
    date: '2025-08-28',
    time: '20:00',
    endTime: '23:00',
    location: 'Portuguese Cultural Centre',
    address: '180 South Lambeth Road, Stockwell, London SW8 1UQ',
    category: 'Cultural Heritage',
    price: TOURS_PRICING.cultural.fadoNight,
    currency: 'GBP',
    maxAttendees: 50,
    currentAttendees: 32,
    hostName: 'Amália Silva',
    hostImage: '/profiles/community/member-4.jpg',
    imageUrl: '/events/wine-paint.jpg',
    featured: true,
    groupExperience: true,
    requiresApproval: false,
    membershipRequired: 'core',
    ageRestriction: '18+ all backgrounds welcome',
    portugueseOrigin: ['Portugal'],
    tags: ['Fado', 'Cultural Heritage', 'Music', 'Traditional', 'Community', 'Evening Entertainment'],
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
    category: 'Cultural Tours',
    price: TOURS_PRICING.tours.canterburyHeritage,
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
    ageRestriction: 'All ages welcome (family-friendly)',
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
  },
  {
    id: 'et-007',
    title: 'Portuguese Friday Night Social: Music & Drinks',
    description: 'Weekly Friday night social gathering with Portuguese music, drinks, and dancing. Perfect for making new friends and unwinding after the week. All ages and backgrounds welcome!',
    date: '2025-08-23',
    time: '19:30',
    endTime: '23:30',
    location: 'Bounce Bar - Old Street',
    address: '241 Old St, London EC1V 9EY',
    category: 'Music & Nightlife',
    price: TOURS_PRICING.social.fridayNight,
    currency: 'GBP',
    maxAttendees: 60,
    currentAttendees: 38,
    hostName: 'Sofia Costa',
    hostImage: '/profiles/community/member-9.jpg',
    imageUrl: '/events/nightlife.jpg',
    featured: false,
    groupExperience: true,
    requiresApproval: false,
    membershipRequired: 'free',
    ageRestriction: '18+ social gathering',
    portugueseOrigin: ['All Lusophone'],
    tags: ['Nightlife', 'Music', 'Social', 'Dancing', 'Friday Night', 'Casual'],
    highlights: [
      'DJ playing Portuguese hits and international music',
      'Affordable drinks and Portuguese petiscos',
      'Friendly crowd with mix of Portuguese speakers',
      'Perfect for meeting new people in relaxed atmosphere'
    ],
    whatToExpect: [
      'Vibrant Portuguese social atmosphere',
      'Mix of Portuguese and international music',
      'Casual networking and new friendships',
      'Dancing and socializing until late'
    ],
    whatToHear: 'Portuguese pop, fado remixes, Brazilian funk, and international hits',
    whatToLearn: 'How to connect with Portuguese community through music and socializing',
    groupSize: 'Large (50-60 people)',
    difficulty: 'Easy',
    averageRating: 4.4,
    totalReviews: 42,
    createdAt: '2025-08-11T18:00:00Z',
    updatedAt: '2025-08-15T10:00:00Z'
  },
  {
    id: 'et-008',
    title: 'Lisbon Street Art & Culture Walking Tour',
    description: 'Explore London through Portuguese eyes! Discover Portuguese-inspired street art, visit Portuguese businesses, and learn about Portuguese influence in different London neighborhoods.',
    date: '2025-08-26',
    time: '14:00',
    endTime: '17:00',
    location: 'Stockwell & South London',
    address: 'Meeting Point: Stockwell Tube Station',
    category: 'Cultural Tours',
    price: TOURS_PRICING.tours.walkingTour,
    currency: 'GBP',
    maxAttendees: 25,
    currentAttendees: 16,
    hostName: 'Bruno Santos',
    hostImage: '/profiles/community/member-10.jpg',
    imageUrl: '/events/walking-tour.jpg',
    featured: false,
    groupExperience: true,
    requiresApproval: false,
    membershipRequired: 'free',
    ageRestriction: 'All ages welcome',
    portugueseOrigin: ['All Lusophone'],
    tags: ['Walking Tour', 'Street Art', 'Culture', 'Stockwell', 'Portuguese Businesses', 'Heritage'],
    highlights: [
      'Discover hidden Portuguese gems in South London',
      'Visit authentic Portuguese cafes and restaurants',
      'Learn about Portuguese street art and murals',
      'Meet local Portuguese business owners'
    ],
    whatToExpect: [
      '3-hour guided walking tour through Portuguese areas',
      'Coffee break at traditional Portuguese cafe',
      'Stories about Portuguese immigration to London',
      'Photo opportunities at cultural landmarks'
    ],
    whatToHear: 'Stories of Portuguese families who built businesses in London',
    whatToLearn: 'Hidden Portuguese cultural spots and community history in London',
    groupSize: 'Medium (20-25 people)',
    difficulty: 'Easy',
    averageRating: 4.6,
    totalReviews: 18,
    createdAt: '2025-08-09T12:00:00Z',
    updatedAt: '2025-08-15T09:30:00Z'
  },
  {
    id: 'et-009',
    title: 'Portuguese Cooking Workshop: Traditional & Modern',
    description: 'Learn to cook authentic Portuguese dishes with a modern twist. Perfect for food lovers wanting to connect with Portuguese culture through cooking. All skill levels welcome!',
    date: '2025-09-01',
    time: '11:00',
    endTime: '15:00',
    location: 'Cookery School Little Portland Street',
    address: '19 Little Portland St, London W1W 8PS',
    category: 'Arts & Entertainment',
    price: TOURS_PRICING.cultural.cookingWorkshop,
    currency: 'GBP',
    maxAttendees: 16,
    currentAttendees: 10,
    hostName: 'Chef Marta Ferreira',
    hostImage: '/profiles/community/member-11.jpg',
    imageUrl: '/events/cooking.jpg',
    featured: true,
    groupExperience: true,
    requiresApproval: false,
    membershipRequired: 'core',
    ageRestriction: 'All ages welcome (family-friendly)',
    portugueseOrigin: ['All Lusophone'],
    tags: ['Cooking', 'Food', 'Traditional', 'Modern', 'Cultural', 'Hands-on'],
    highlights: [
      'Learn 4 traditional Portuguese recipes with modern presentation',
      'All ingredients and equipment provided',
      'Take home recipe book and Portuguese spice kit',
      'Enjoy lunch together featuring dishes you cooked'
    ],
    whatToExpect: [
      'Hands-on cooking workshop with professional chef',
      'Learn traditional techniques and modern adaptations',
      'Cultural stories behind each dish and ingredient',
      'Group lunch and recipe sharing'
    ],
    whatToHear: 'Stories about Portuguese culinary traditions and family recipes',
    whatToLearn: 'How to cook authentic Portuguese dishes and adapt them for modern life',
    groupSize: 'Small (12-16 people)',
    difficulty: 'Easy',
    averageRating: 4.8,
    totalReviews: 15,
    createdAt: '2025-08-08T15:00:00Z',
    updatedAt: '2025-08-15T11:15:00Z'
  },
  {
    id: 'et-010',
    title: 'Portuguese Book Club & Literary Café',
    description: 'Monthly book club discussing Portuguese literature in English. Enjoy Portuguese coffee and pastries while exploring works by Portuguese and Lusophone authors. Reading level flexible.',
    date: '2025-09-05',
    time: '18:30',
    endTime: '20:30',
    location: 'Café Nata - Borough Market',
    address: '11 Southwark St, London SE1 1RQ',
    category: 'Social Experiences',
    price: TOURS_PRICING.social.bookClub,
    currency: 'GBP',
    maxAttendees: 20,
    currentAttendees: 12,
    hostName: 'Dr. Isabel Ribeiro',
    hostImage: '/profiles/community/member-12.jpg',
    imageUrl: '/events/book-club.jpg',
    featured: false,
    groupExperience: true,
    requiresApproval: false,
    membershipRequired: 'free',
    ageRestriction: '18+ literature enthusiasts',
    portugueseOrigin: ['All Lusophone'],
    tags: ['Books', 'Literature', 'Portuguese Authors', 'Coffee', 'Discussion', 'Cultural'],
    highlights: [
      'Discover Portuguese and Lusophone literature',
      'Authentic Portuguese coffee and pastéis de nata',
      'Engaging discussions about culture and storytelling',
      'Relaxed bookstore café atmosphere'
    ],
    whatToExpect: [
      'Literary discussion in comfortable café setting',
      'Introduction to Portuguese authors and themes',
      'Coffee and Portuguese pastries included',
      'Book recommendations and cultural insights'
    ],
    whatToHear: 'Insights into Portuguese storytelling traditions and contemporary literature',
    whatToLearn: 'Portuguese literary culture and how to appreciate Lusophone authors',
    groupSize: 'Small (15-20 people)',
    difficulty: 'Easy',
    averageRating: 4.5,
    totalReviews: 8,
    createdAt: '2025-08-07T16:30:00Z',
    updatedAt: '2025-08-15T12:00:00Z'
  }
]

// Event Tour Categories with descriptions
export const EVENT_TOUR_CATEGORIES = {
  // Social & Cultural Categories
  'Music & Nightlife': {
    description: 'Portuguese music events, club nights, and evening entertainment',
    icon: '🎵',
    color: 'bg-coral-500'
  },
  'Cultural Tours': {
    description: 'Heritage tours, museum visits, and cultural exploration experiences',
    icon: '🏛️',
    color: 'bg-accent-500'
  },
  'Social Experiences': {
    description: 'Social gatherings, meetups, and community bonding activities',
    icon: '🤝',
    color: 'bg-primary-500'
  },
  'Arts & Entertainment': {
    description: 'Creative workshops, art events, and cultural entertainment',
    icon: '🎨',
    color: 'bg-premium-500'
  },
  'Cultural Heritage': {
    description: 'Traditional Portuguese cultural celebrations and preservation',
    icon: '🇵🇹',
    color: 'bg-accent-600'
  },
  'Mixed Groups': {
    description: 'Open experiences welcoming all Portuguese speakers',
    icon: '👥',
    color: 'bg-primary-600'
  },
  // Demographics Categories
  'Women 30+': {
    description: 'Curated experiences for Portuguese women in their 30s',
    icon: '👩‍💼',
    color: 'bg-coral-600'
  },
  'Women 40+': {
    description: 'Networking and cultural experiences for established Portuguese women',
    icon: '👩‍💼',
    color: 'bg-premium-600'
  },
  // Business & Professional Categories
  'Business & Professional': {
    description: 'Professional development and business growth experiences',
    icon: '💼',
    color: 'bg-secondary-500'
  },
  'Professional Networking': {
    description: 'Career development and business networking opportunities',
    icon: '🤝',
    color: 'bg-action-500'
  },
  'Technology & AI': {
    description: 'Technology workshops and AI learning for all skill levels',
    icon: '💻',
    color: 'bg-secondary-600'
  },
  'Finance & Investment': {
    description: 'Financial education and investment guidance for Portuguese speakers',
    icon: '💰',
    color: 'bg-secondary-700'
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

    // Sort by business priority first, then featured status, then date
    return filtered.sort((a, b) => {
      // Business event categories (matching events.ts)
      const businessCategories = [
        'Technology & AI',
        'Business & Professional',
        'Finance & Investment',
        'Professional Networking'
      ]
      
      const aIsBusiness = businessCategories.includes(a.category)
      const bIsBusiness = businessCategories.includes(b.category)
      
      // Business events first
      if (aIsBusiness && !bIsBusiness) return -1
      if (!aIsBusiness && bIsBusiness) return 1
      
      // Within business events, sort by specific order
      if (aIsBusiness && bIsBusiness) {
        const businessPriority = {
          'Technology & AI': 1,
          'Professional Networking': 2,
          'Business & Professional': 3,
          'Finance & Investment': 4
        }
        const aPriority = businessPriority[a.category as keyof typeof businessPriority] || 999
        const bPriority = businessPriority[b.category as keyof typeof businessPriority] || 999
        if (aPriority !== bPriority) {
          return aPriority - bPriority
        }
      }
      
      // Then sort by featured status
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      
      // Finally sort by date
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