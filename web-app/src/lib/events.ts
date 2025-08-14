'use client'

import { User } from '@/lib/auth'
import { supabase, supabaseUrl, supabaseAnonKey } from '@/lib/supabase'
import { getImageWithFallback } from '@/lib/profileImages'

export interface EventAttendee {
  id: string
  userId: string
  eventId: string
  name: string
  email: string
  profileImage?: string
  membershipTier: 'free' | 'core' | 'premium'
  joinedAt: string
  status: 'confirmed' | 'pending' | 'cancelled'
  checkInTime?: string
}

export interface WaitlistEntry {
  id: string
  userId: string
  eventId: string
  name: string
  email: string
  membershipTier: 'free' | 'core' | 'premium'
  joinedWaitlistAt: string
  position: number
  notified: boolean
}

export interface EventReview {
  id: string
  eventId: string
  userId: string
  reviewerName: string
  profileImage?: string
  rating: number // 1-5 stars
  comment: string
  createdAt: string
  helpful: number
  membershipTier: 'free' | 'core' | 'premium'
  // Enhanced review fields
  culturalValue?: number // 1-5 stars for cultural authenticity
  organizationQuality?: number // 1-5 stars for organization
  venueRating?: number // 1-5 stars for venue
  wouldRecommend?: boolean
  anonymous?: boolean
  moderated?: boolean
  reported?: boolean
  verified?: boolean
}

export interface EventPhoto {
  id: string
  eventId: string
  url: string
  caption?: string
  uploadedBy: string
  uploadedAt: string
  featured: boolean
}

export interface Event {
  id: string
  title: string
  description: string
  longDescription: string
  date: string
  time: string
  endTime: string
  location: string
  address: string
  coordinates?: {
    lat: number
    lng: number
  }
  category: string
  subcategory?: string
  tags: string[]
  hostId: string
  hostName: string
  hostImage?: string
  hostBio?: string
  membershipRequired: 'free' | 'core' | 'premium'
  price: number // 0 for free events
  currency: string
  maxAttendees: number
  minAttendees?: number
  currentAttendees: number
  waitlistCount: number
  status: 'draft' | 'published' | 'cancelled' | 'completed'
  featured: boolean
  images: string[]
  photos: EventPhoto[]
  attendees: EventAttendee[]
  waitlist: WaitlistEntry[]
  reviews: EventReview[]
  averageRating: number
  totalReviews: number
  
  // Event details
  whatToBring?: string[]
  dresscode?: string
  ageRestriction?: 'Adults only (21+)' | 'Professionals' | 'Open to everyone' | string
  skillLevel?: 'beginner' | 'intermediate' | 'advanced' | 'all'
  accessibility?: string[]
  
  // Booking settings
  allowWaitlist: boolean
  requiresApproval: boolean
  refundPolicy?: string
  lastBookingTime: string // how long before event you can book
  
  // Metadata
  createdAt: string
  updatedAt: string
  createdBy: string
  isRecurring: boolean
  recurringPattern?: {
    frequency: 'weekly' | 'monthly' | 'custom'
    interval: number
    endDate?: string
    daysOfWeek?: number[]
  }
  
  // Analytics
  views: number
  favorites: number
  shares: number
  
  // Safety & Community
  communityGuidelines: boolean
  verifiedEvent: boolean
  reportCount: number
}

export interface EventFilters {
  category?: string
  subcategory?: string
  membershipLevel?: 'free' | 'core' | 'premium'
  dateRange?: {
    start: string
    end: string
  }
  location?: string
  area?: string
  priceRange?: {
    min: number
    max: number
  }
  skillLevel?: 'beginner' | 'intermediate' | 'advanced' | 'all'
  availability?: 'available' | 'waitlist' | 'all'
  featured?: boolean
  verified?: boolean
  searchQuery?: string
  tags?: string[]
  timeOfDay?: 'morning' | 'afternoon' | 'evening' | 'all'
  dayOfWeek?: 'weekend' | 'weekday' | 'all'
  accessibility?: string[]
}

export interface EventSortOptions {
  field: 'date' | 'popularity' | 'rating' | 'price' | 'created' | 'alphabetical'
  direction: 'asc' | 'desc'
}

export interface RSVP {
  id: string
  eventId: string
  userId: string
  status: 'confirmed' | 'waitlist' | 'cancelled'
  createdAt: string
  notes?: string
  dietaryRequirements?: string[]
  emergencyContact?: {
    name: string
    phone: string
    relationship: string
  }
}

// Event categories and subcategories
export const EVENT_CATEGORIES = {
  'Books & Reading': {
    icon: 'BookOpen',
    subcategories: ['Book Clubs', 'Author Talks', 'Poetry', 'Writing Workshops']
  },
  'Wine & Dining': {
    icon: 'Wine',
    subcategories: ['Wine Tasting', 'Cooking Classes', 'Restaurant Visits', 'Food Tours']
  },
  'Fitness & Wellness': {
    icon: 'Dumbbell',
    subcategories: ['Yoga', 'Pilates', 'Running', 'Meditation', 'Wellness Workshops']
  },
  'Arts & Culture': {
    icon: 'Palette',
    subcategories: ['Gallery Visits', 'Museum Tours', 'Theatre', 'Art Classes', 'Cultural Events']
  },
  'Networking': {
    icon: 'Coffee',
    subcategories: ['Professional Meetups', 'Industry Events', 'Casual Networking', 'Workshops']
  },
  'Music & Entertainment': {
    icon: 'Music',
    subcategories: ['Live Music', 'Concerts', 'Dance Classes', 'Comedy Shows']
  },
  'Photography': {
    icon: 'Camera',
    subcategories: ['Photo Walks', 'Workshops', 'Exhibitions', 'Skills Classes']
  },
  'Travel & Adventures': {
    icon: 'Plane',
    subcategories: ['Day Trips', 'Weekend Getaways', 'Walking Tours', 'Adventure Sports']
  },
  'Lifestyle & Hobbies': {
    icon: 'Heart',
    subcategories: ['Craft Workshops', 'Gardening', 'Tech Meetups', 'Language Exchange']
  },
  'Seasonal & Special': {
    icon: 'Star',
    subcategories: ['Holiday Events', 'Seasonal Activities', 'Celebrations', 'Themed Parties']
  }
} as const

// Location areas in London
export const LONDON_AREAS = [
  'Central London',
  'Kensington',
  'Camden',
  'Greenwich',
  'Shoreditch',
  'Notting Hill',
  'Covent Garden',
  'Marylebone',
  'Fitzrovia',
  'South Bank',
  'Canary Wharf',
  'Clapham',
  'Brixton',
  'Hampstead',
  'Richmond',
  'Wimbledon',
  'Kingston',
  'Putney',
  'Chelsea',
  'Fulham'
] as const

// Skill levels
export const SKILL_LEVELS = [
  { value: 'all', label: 'All Levels', description: 'Perfect for everyone' },
  { value: 'beginner', label: 'Beginner', description: 'New to this activity' },
  { value: 'intermediate', label: 'Intermediate', description: 'Some experience required' },
  { value: 'advanced', label: 'Advanced', description: 'Experienced participants only' }
] as const

// Accessibility options
export const ACCESSIBILITY_OPTIONS = [
  'Wheelchair accessible',
  'Hearing loop available',
  'Sign language interpreter',
  'Large print materials',
  'Step-free access',
  'Accessible toilet facilities',
  'Assistance dog friendly',
  'Quiet space available'
] as const

// Event Management Service Class
export class EventService {
  private static instance: EventService
  private events: Event[] = []
  private rsvps: RSVP[] = []

  static getInstance(): EventService {
    if (!EventService.instance) {
      EventService.instance = new EventService()
    }
    return EventService.instance
  }

  constructor() {
    this.loadDummyData()
  }

  private loadDummyData() {
    this.events = [
      {
        id: 'event-pt-1',
        title: 'Noite de Fado & Vinho Verde - Authentic Portuguese Night',
        description: 'Experience the soul of Portugal with traditional Fado music, Vinho Verde tasting, and authentic Portuguese cuisine in the heart of Little Portugal',
        longDescription: 'Join us for an enchanting evening celebrating Portuguese culture in Stockwell\'s Little Portugal. This intimate event combines the melancholic beauty of traditional Fado music with the crisp, refreshing taste of authentic Vinho Verde from the Minho region.\n\nOur evening begins with a welcome drink of Vinho Verde followed by a traditional Portuguese dinner featuring bacalhau à brás, caldo verde, and pastéis de nata. The highlight of the night will be a live Fado performance by acclaimed fadista Maria Fernandes, accompanied by Portuguese guitar.\n\nThis is more than just a cultural evening - it\'s a chance to connect with fellow Portuguese speakers, share stories of home, and celebrate our beautiful language and traditions in London. Whether you\'re from Portugal, Brazil, Angola, Mozambique, or any Portuguese-speaking nation, you\'ll find yourself among friends.',
        date: '2025-08-16',
        time: '19:00',
        endTime: '22:30',
        location: 'A Toca Restaurant',
        address: '343 Wandsworth Road, Stockwell, London SW8 2JH',
        coordinates: { lat: 51.4831, lng: -0.1192 },
        category: 'Music & Entertainment',
        subcategory: 'Live Music',
        tags: ['Fado', 'Portuguese culture', 'Vinho Verde', 'Little Portugal', 'live music', 'traditional'],
        hostId: 'host-miguel',
        hostName: 'Miguel Santos',
        hostImage: getImageWithFallback('miguel-santos'),
        hostBio: 'Portuguese cultural event organizer and Fado enthusiast, organizing authentic Portuguese experiences in London for 8+ years',
        membershipRequired: 'free',
        price: 45,
        currency: 'GBP',
        maxAttendees: 35,
        minAttendees: 15,
        currentAttendees: 22,
        waitlistCount: 5,
        status: 'published',
        featured: true,
        images: [
          'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop&auto=format',
          'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop&auto=format'
        ],
        photos: [],
        attendees: [
          { id: 'att-pt-1', userId: 'user-pt-1', eventId: 'event-pt-1', name: 'Ana Pereira', email: 'ana@example.com', membershipTier: 'core', joinedAt: '2025-08-10T14:00:00Z', status: 'confirmed' },
          { id: 'att-pt-2', userId: 'user-pt-2', eventId: 'event-pt-1', name: 'Carlos Rodrigues', email: 'carlos@example.com', membershipTier: 'premium', joinedAt: '2025-08-11T16:30:00Z', status: 'confirmed' }
        ],
        waitlist: [],
        reviews: [
          { id: 'rev-pt-1', eventId: 'event-pt-1', userId: 'user-pt-3', reviewerName: 'Joana M.', rating: 5, comment: 'Que noite maravilhosa! Felt like being back in Alfama. The Fado singer gave me goosebumps.', createdAt: '2025-08-02T22:00:00Z', helpful: 8, membershipTier: 'free' }
        ],
        averageRating: 4.9,
        totalReviews: 12,
        whatToBring: ['Appetite for Portuguese culture', 'Stories from home to share'],
        dresscode: 'Smart casual',
        ageRestriction: 'All ages welcome',
        skillLevel: 'all',
        accessibility: ['Step-free access', 'Accessible toilet facilities'],
        allowWaitlist: true,
        requiresApproval: false,
        refundPolicy: 'Full refund 48h+ in advance due to meal preparation',
        lastBookingTime: '48',
        createdAt: '2025-08-01T10:00:00Z',
        updatedAt: '2025-08-12T09:00:00Z',
        createdBy: 'host-miguel',
        isRecurring: true,
        recurringPattern: { frequency: 'monthly', interval: 1, daysOfWeek: [5] },
        views: 456,
        favorites: 34,
        shares: 18,
        communityGuidelines: true,
        verifiedEvent: true,
        reportCount: 0
      },
      {
        id: 'event-pt-2',
        title: 'Portuguese Football Viewing: Portugal vs Spain - Euro Qualifiers',
        description: 'Watch the big match with fellow Portuguese supporters at our favorite sports bar in Vauxhall. Bifanas and Super Bock included!',
        longDescription: 'Força Portugal! Join your fellow Portuguese community in London for what promises to be an epic match between Portugal and Spain in the Euro 2024 qualifiers. We\'ve booked the upstairs area at The Fentiman Arms, a fantastic pub just minutes from Vauxhall station.\n\nWe\'ll have Portuguese commentators on the main screen, traditional bifanas (Portuguese pork sandwiches) available throughout the match, and plenty of Super Bock and Sagres to keep spirits high. Expect lots of singing, cheering, and probably some tears depending on the result!\n\nThis is a great chance to meet other Portuguese supporters living in London. Whether you\'re originally from Portugal, Brazil, or anywhere else where Portuguese football passion runs deep, come join us. Wear your Portugal jersey with pride!\n\nEntry includes your first drink and access to our Portuguese buffet during half-time.',
        date: '2025-08-19',
        time: '19:45',
        endTime: '22:30',
        location: 'The Fentiman Arms',
        address: '64 Fentiman Road, Vauxhall, London SW8 1LA',
        coordinates: { lat: 51.4823, lng: -0.1143 },
        category: 'Music & Entertainment',
        subcategory: 'Sports Viewing',
        tags: ['football', 'Portugal', 'sports viewing', 'Vauxhall', 'Super Bock', 'community'],
        hostId: 'host-ricardo',
        hostName: 'Ricardo Ferreira',
        hostImage: getImageWithFallback('ricardo-ferreira'),
        hostBio: 'Die-hard Portugal fan and football enthusiast organizing match viewing events for the Portuguese community',
        membershipRequired: 'free',
        price: 15,
        currency: 'GBP',
        maxAttendees: 40,
        minAttendees: 10,
        currentAttendees: 28,
        waitlistCount: 3,
        status: 'published',
        featured: false,
        images: [
          'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop&auto=format',
          'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&h=400&fit=crop&auto=format'
        ],
        photos: [],
        attendees: [
          { id: 'att-pt-3', userId: 'user-pt-3', eventId: 'event-pt-2', name: 'Pedro Silva', email: 'pedro@example.com', membershipTier: 'free', joinedAt: '2025-08-12T11:00:00Z', status: 'confirmed' }
        ],
        waitlist: [],
        reviews: [],
        averageRating: 4.7,
        totalReviews: 15,
        whatToBring: ['Portugal jersey (optional but encouraged)', 'Loud voice for singing'],
        dresscode: 'Casual, Portugal colours welcome',
        ageRestriction: 'Open to everyone',
        skillLevel: 'all',
        accessibility: ['Ground floor accessible', 'Accessible toilet facilities'],
        allowWaitlist: true,
        requiresApproval: false,
        refundPolicy: 'Full refund until 2 hours before kick-off',
        lastBookingTime: '2',
        createdAt: '2025-08-05T16:00:00Z',
        updatedAt: '2025-08-12T10:30:00Z',
        createdBy: 'host-ricardo',
        isRecurring: false,
        views: 234,
        favorites: 19,
        shares: 12,
        communityGuidelines: true,
        verifiedEvent: true,
        reportCount: 0
      },
      {
        id: 'event-pt-3',
        title: 'Mulheres Falantes de Português 30+ - Wine & Life Stories Evening',
        description: 'An intimate evening for Portuguese-speaking women 30+ to connect, share experiences, and enjoy Portuguese wines in a beautiful Elephant & Castle venue',
        longDescription: 'Esta noite é especialmente dedicada às mulheres que falam português que vivem em Londres. Whether you\'re from Portugal, Brazil, Angola, Mozambique, Cape Verde, or any Portuguese-speaking country, this evening is designed for meaningful connections and authentic conversations.\n\nWe\'ll meet at the stylish Champor-Champor restaurant near Elephant & Castle, known for its intimate atmosphere and excellent wine selection. Our evening includes a carefully curated tasting of wines from Portuguese-speaking countries - from Portuguese Douro reds to Brazilian wines, with light petiscos (Portuguese tapas) to accompany.\n\nThis is more than a wine tasting - it\'s a safe space to share our stories of adapting to life in London, celebrating our cultures, and supporting each other as professional women. We\'ll have guided conversations about career, relationships, networking, and maintaining our cultural identity while building successful lives.\n\nLimited to 12 women to ensure intimate conversations and genuine connections.',
        date: '2025-08-17',
        time: '18:30',
        endTime: '21:30',
        location: 'Champor-Champor Restaurant',
        address: '62 Weston Street, London SE1 3QJ',
        coordinates: { lat: 51.5012, lng: -0.0923 },
        category: 'Wine & Dining',
        subcategory: 'Wine Tasting',
        tags: ['women only', '30+', 'Portuguese wines', 'cultural identity', 'networking', 'Elephant Castle'],
        hostId: 'host-fernanda',
        hostName: 'Fernanda Costa',
        hostImage: getImageWithFallback('fernanda-costa'),
        hostBio: 'Portuguese psychologist and women\'s empowerment advocate, organizing supportive events for Portuguese-speaking women in London',
        membershipRequired: 'core',
        price: 38,
        currency: 'GBP',
        maxAttendees: 12,
        minAttendees: 6,
        currentAttendees: 9,
        waitlistCount: 4,
        status: 'published',
        featured: true,
        images: [
          'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&h=400&fit=crop&auto=format',
          'https://images.unsplash.com/photo-1608064093346-88115553b5c8?w=600&h=400&fit=crop&auto=format'
        ],
        photos: [],
        attendees: [
          { id: 'att-pt-4', userId: 'user-pt-4', eventId: 'event-pt-3', name: 'Beatriz Mendes', email: 'beatriz@example.com', membershipTier: 'premium', joinedAt: '2025-08-09T13:00:00Z', status: 'confirmed' },
          { id: 'att-pt-5', userId: 'user-pt-5', eventId: 'event-pt-3', name: 'Mariana Oliveira', email: 'mariana@example.com', membershipTier: 'core', joinedAt: '2025-08-10T19:20:00Z', status: 'confirmed' }
        ],
        waitlist: [
          { id: 'wait-pt-1', userId: 'user-pt-10', eventId: 'event-pt-3', name: 'Sofia Almeida', email: 'sofia@example.com', membershipTier: 'core', joinedWaitlistAt: '2025-08-12T08:00:00Z', position: 1, notified: false }
        ],
        reviews: [
          { id: 'rev-pt-2', eventId: 'event-pt-3', userId: 'user-pt-6', reviewerName: 'Cristina L.', rating: 5, comment: 'Felt so understood and supported. These connections with other Portuguese-speaking women are exactly what I needed in London.', createdAt: '2025-08-03T22:30:00Z', helpful: 6, membershipTier: 'core' }
        ],
        averageRating: 4.8,
        totalReviews: 8,
        whatToBring: ['Open heart for sharing', 'Stories from your homeland'],
        dresscode: 'Smart casual',
        ageRestriction: 'Women of all ages welcome',
        skillLevel: 'all',
        accessibility: ['Step-free access', 'Quiet environment for conversations'],
        allowWaitlist: true,
        requiresApproval: true,
        refundPolicy: 'Full refund 24h+ in advance',
        lastBookingTime: '24',
        createdAt: '2025-08-01T14:00:00Z',
        updatedAt: '2025-08-12T11:15:00Z',
        createdBy: 'host-fernanda',
        isRecurring: true,
        recurringPattern: { frequency: 'monthly', interval: 1, daysOfWeek: [6] },
        views: 289,
        favorites: 28,
        shares: 15,
        communityGuidelines: true,
        verifiedEvent: true,
        reportCount: 0
      },
      {
        id: 'event-pt-4',
        title: 'Portuguese Language Exchange & Cocktails - All Ages Welcome',
        description: 'Practice your Portuguese while enjoying creative cocktails inspired by Portuguese-speaking countries at trendy Nine Elms bar',
        longDescription: 'Venha praticar português! Join us for a relaxed evening of language exchange where Portuguese speakers and learners come together in a fun, social environment. Whether you\'re a native speaker looking to help others learn, or someone wanting to improve your Portuguese, this event welcomes all levels.\n\nWe\'ve partnered with Battersea Power Station\'s Bar Elixir to create a special menu of cocktails inspired by Portuguese-speaking countries: the Caipirinha Tropical (Brazil), Porto Tónico (Portugal), Tamarindo Sunset (Angola), and Mozambique Spice. Each drink comes with a story about its cultural inspiration.\n\nThe evening is structured with conversation rounds where you\'ll rotate between Portuguese and English, mixed with free socializing time. We provide conversation starter cards covering topics from travel and food to career and culture. Perfect for making new friends while improving language skills!\n\nThis is one of our most popular monthly events, attracting both Portuguese speakers and Anglophone Londoners interested in Portuguese culture.',
        date: '2025-08-20',
        time: '18:00',
        endTime: '21:00',
        location: 'Bar Elixir, Battersea Power Station',
        address: 'Battersea Power Station, 188 Kirtling Street, London SW8 5BN',
        coordinates: { lat: 51.4816, lng: -0.1433 },
        category: 'Lifestyle & Hobbies',
        subcategory: 'Language Exchange',
        tags: ['language exchange', 'cocktails', 'Nine Elms', 'Portuguese learning', 'multicultural', 'networking'],
        hostId: 'host-joana',
        hostName: 'Joana Ribeiro',
        hostImage: getImageWithFallback('joana-ribeiro'),
        hostBio: 'Language teacher and cultural bridge-builder, organizing Portuguese language events across London',
        membershipRequired: 'free',
        price: 8,
        currency: 'GBP',
        maxAttendees: 45,
        minAttendees: 15,
        currentAttendees: 31,
        waitlistCount: 0,
        status: 'published',
        featured: false,
        images: [
          'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&h=400&fit=crop&auto=format',
          'https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=600&h=400&fit=crop&auto=format'
        ],
        photos: [],
        attendees: [
          { id: 'att-pt-6', userId: 'user-pt-6', eventId: 'event-pt-4', name: 'James Thompson', email: 'james@example.com', membershipTier: 'free', joinedAt: '2025-08-08T20:00:00Z', status: 'confirmed' },
          { id: 'att-pt-7', userId: 'user-pt-7', eventId: 'event-pt-4', name: 'Luisa Santos', email: 'luisa@example.com', membershipTier: 'core', joinedAt: '2025-08-09T10:30:00Z', status: 'confirmed' }
        ],
        waitlist: [],
        reviews: [
          { id: 'rev-pt-3', eventId: 'event-pt-4', userId: 'user-pt-8', reviewerName: 'David K.', rating: 4, comment: 'Great way to practice Portuguese! The locals were so patient and welcoming. Definitely coming back.', createdAt: '2025-08-06T22:15:00Z', helpful: 4, membershipTier: 'free' }
        ],
        averageRating: 4.6,
        totalReviews: 23,
        whatToBring: ['Patience and enthusiasm for language learning', 'Stories to share in Portuguese or English'],
        dresscode: 'Casual',
        ageRestriction: 'All ages welcome',
        skillLevel: 'all',
        accessibility: ['Step-free access', 'Hearing loop available'],
        allowWaitlist: true,
        requiresApproval: false,
        refundPolicy: 'Full refund until day of event',
        lastBookingTime: '6',
        createdAt: '2025-08-02T12:00:00Z',
        updatedAt: '2025-08-12T15:45:00Z',
        createdBy: 'host-joana',
        isRecurring: true,
        recurringPattern: { frequency: 'monthly', interval: 1, daysOfWeek: [2] },
        views: 178,
        favorites: 21,
        shares: 9,
        communityGuidelines: true,
        verifiedEvent: true,
        reportCount: 0
      },
      {
        id: 'event-pt-5',
        title: 'Festa de São João Londrina - Portuguese Mid-Summer Festival 35+',
        description: 'Celebrate São João with traditional Portuguese festivities, grilled sardines, folk dancing, and live music in a mature, sophisticated setting',
        longDescription: 'Celebremos São João como deve ser! Join us for an authentic Portuguese São João celebration designed specifically for our 35+ community. This traditional mid-summer festival brings all the joy of Portuguese village festivities to London, with a sophisticated twist perfect for mature attendees.\n\nOur celebration takes place at the Portuguese Club of London\'s beautiful banquet hall, decorated with colorful bunting and traditional São João elements. The evening features a traditional Portuguese barbecue with grilled sardines, chorizo, and vegetarian options, accompanied by Portuguese corn bread and plenty of wine.\n\nWe\'ll have live traditional Portuguese folk music with opportunities for folk dancing (lessons provided for beginners!), traditional São João games, and the famous plastic hammer tradition for good luck. The night culminates with the lighting of a traditional bonfire in the club\'s courtyard.\n\nThis is a wonderful opportunity for Portuguese speakers 35+ to celebrate our traditions in an elegant, mature environment while making lasting friendships with fellow immigrants who share our cultural heritage.',
        date: '2025-08-23',
        time: '18:00',
        endTime: '23:00',
        location: 'Portuguese Club of London',
        address: '47 Prince\'s Square, Bayswater, London W2 4NY',
        coordinates: { lat: 51.5128, lng: -0.1872 },
        category: 'Seasonal & Special',
        subcategory: 'Cultural Events',
        tags: ['São João', 'Portuguese festival', '35+', 'traditional', 'folk dancing', 'Bayswater', 'community'],
        hostId: 'host-antonio',
        hostName: 'António Pereira',
        hostImage: getImageWithFallback('antonio-pereira'),
        hostBio: 'Portuguese cultural heritage preservationist and event organizer with 15+ years experience bringing authentic Portuguese traditions to London',
        membershipRequired: 'core',
        price: 55,
        currency: 'GBP',
        maxAttendees: 80,
        minAttendees: 30,
        currentAttendees: 52,
        waitlistCount: 8,
        status: 'published',
        featured: true,
        images: [
          'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&auto=format',
          'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&h=400&fit=crop&auto=format'
        ],
        photos: [],
        attendees: [
          { id: 'att-pt-8', userId: 'user-pt-8', eventId: 'event-pt-5', name: 'Maria Fernandes', email: 'maria@example.com', membershipTier: 'premium', joinedAt: '2025-08-07T14:20:00Z', status: 'confirmed' },
          { id: 'att-pt-9', userId: 'user-pt-9', eventId: 'event-pt-5', name: 'José Martins', email: 'jose@example.com', membershipTier: 'core', joinedAt: '2025-08-08T16:45:00Z', status: 'confirmed' }
        ],
        waitlist: [
          { id: 'wait-pt-2', userId: 'user-pt-11', eventId: 'event-pt-5', name: 'Rosa Tavares', email: 'rosa@example.com', membershipTier: 'core', joinedWaitlistAt: '2025-08-11T20:00:00Z', position: 1, notified: false }
        ],
        reviews: [
          { id: 'rev-pt-4', eventId: 'event-pt-5', userId: 'user-pt-12', reviewerName: 'Manuel S.', rating: 5, comment: 'Exactly like the São João celebrations back home in Braga! António organized everything perfectly. Felt like home.', createdAt: '2025-08-24T01:00:00Z', helpful: 11, membershipTier: 'core' }
        ],
        averageRating: 4.9,
        totalReviews: 18,
        whatToBring: ['Comfortable dancing shoes', 'Appetite for Portuguese tradition', 'Plastic hammer (provided if you don\'t have one)'],
        dresscode: 'Smart casual, comfortable for dancing',
        ageRestriction: 'All ages welcome',
        skillLevel: 'all',
        accessibility: ['Step-free access', 'Accessible toilet facilities', 'Seating available for non-dancers'],
        allowWaitlist: true,
        requiresApproval: false,
        refundPolicy: 'Full refund 72h+ in advance due to catering requirements',
        lastBookingTime: '72',
        createdAt: '2025-07-15T10:00:00Z',
        updatedAt: '2025-08-12T13:30:00Z',
        createdBy: 'host-antonio',
        isRecurring: true,
        recurringPattern: { frequency: 'custom', interval: 12 },
        views: 567,
        favorites: 43,
        shares: 22,
        communityGuidelines: true,
        verifiedEvent: true,
        reportCount: 0
      },
      {
        id: 'event-pt-6',
        title: 'Portuguese Business Networking Breakfast - Stockwell',
        description: 'Professional networking breakfast for Portuguese-speaking entrepreneurs and professionals in London\'s Little Portugal',
        longDescription: 'Networking para profissionais de língua portuguesa! Start your day right with fellow Portuguese-speaking professionals at our monthly business networking breakfast in the heart of Little Portugal. This event is designed for entrepreneurs, freelancers, and corporate professionals who want to build meaningful business connections within London\'s vibrant Portuguese-speaking community.\n\nWe meet at O Cantinho de Portugal, one of Stockwell\'s most beloved Portuguese restaurants, for an authentic Portuguese breakfast featuring fresh pastéis de nata, galão coffee, and traditional breakfast options. The intimate setting encourages genuine conversations and relationship building.\n\nEach month features a different networking focus: this month we\'re highlighting "Digital Innovation in Portuguese Markets" with guest speaker Dr. Sofia Carvalho, a Portuguese tech entrepreneur who successfully expanded her fintech startup from Lisbon to London.\n\nAttendees include Portuguese, Brazilian, Angolan, and other Portuguese-speaking professionals across various industries - from finance and tech to creative industries and consulting. Come ready to share your expertise, learn from others, and potentially find your next business partner or client.\n\nAll conversations welcome in Portuguese, English, or both!',
        date: '2025-08-21',
        time: '08:00',
        endTime: '10:00',
        location: 'O Cantinho de Portugal',
        address: '54 Stock Orchard Street, London N7 9RN',
        coordinates: { lat: 51.5512, lng: -0.1103 },
        category: 'Networking',
        subcategory: 'Professional Meetups',
        tags: ['business networking', 'Portuguese professionals', 'Stockwell', 'entrepreneurship', 'breakfast', 'Portuguese-speaking'],
        hostId: 'host-patricia',
        hostName: 'Patrícia Gomes',
        hostImage: getImageWithFallback('patricia-gomes'),
        hostBio: 'Business consultant and Portuguese Chamber of Commerce member, connecting Portuguese-speaking professionals across London',
        membershipRequired: 'core',
        price: 25,
        currency: 'GBP',
        maxAttendees: 25,
        minAttendees: 8,
        currentAttendees: 18,
        waitlistCount: 2,
        status: 'published',
        featured: false,
        images: [
          'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop&auto=format',
          'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=600&h=400&fit=crop&auto=format'
        ],
        photos: [],
        attendees: [
          { id: 'att-pt-10', userId: 'user-pt-10', eventId: 'event-pt-6', name: 'Rafael Nunes', email: 'rafael@example.com', membershipTier: 'premium', joinedAt: '2025-08-10T09:30:00Z', status: 'confirmed' }
        ],
        waitlist: [],
        reviews: [
          { id: 'rev-pt-5', eventId: 'event-pt-6', userId: 'user-pt-13', reviewerName: 'Gonçalo T.', rating: 4, comment: 'Great connections made! Patricia knows how to bring the right people together. Looking forward to next month.', createdAt: '2025-08-07T11:00:00Z', helpful: 3, membershipTier: 'core' }
        ],
        averageRating: 4.5,
        totalReviews: 9,
        whatToBring: ['Business cards', 'Open mind for collaboration', 'LinkedIn profile ready'],
        dresscode: 'Business casual',
        ageRestriction: 'All ages welcome',
        skillLevel: 'all',
        accessibility: ['Step-free access', 'Accessible toilet facilities'],
        allowWaitlist: true,
        requiresApproval: true,
        refundPolicy: 'Full refund 24h+ in advance due to breakfast ordering',
        lastBookingTime: '24',
        createdAt: '2025-08-05T08:00:00Z',
        updatedAt: '2025-08-12T07:15:00Z',
        createdBy: 'host-patricia',
        isRecurring: true,
        recurringPattern: { frequency: 'monthly', interval: 1, daysOfWeek: [3] },
        views: 145,
        favorites: 16,
        shares: 8,
        communityGuidelines: true,
        verifiedEvent: true,
        reportCount: 0
      },
      {
        id: 'event-pt-7',
        title: 'Portuguese Entrepreneurs Workshop: Digital Marketing & Website Creation',
        description: 'Learn essential business skills for Portuguese entrepreneurs in London - from digital marketing to creating professional websites',
        longDescription: 'Empreendedores portugueses em Londres! Join our comprehensive business workshop designed specifically for Portuguese-speaking entrepreneurs who want to grow their businesses in the UK market.\n\nThis intensive 4-hour workshop covers three essential areas:\n\n**Digital Marketing Mastery**: Learn how to reach Portuguese customers in London through social media, Google Ads, and local SEO. Understand the UK market and how to position your Portuguese business for success.\n\n**Website Creation**: Build a professional bilingual website that appeals to both Portuguese and English-speaking customers. Learn about hosting, domain names, and basic web design principles.\n\n**Business Setup in the UK**: Navigate the legal requirements for Portuguese entrepreneurs, understand tax obligations, and learn about business banking and insurance.\n\nOur expert speaker, Sofia Carvalho, is a successful Portuguese tech entrepreneur who built her fintech startup from Lisbon to London. She\'ll share practical insights and real-world examples.\n\nWorkshop includes: Welcome Portuguese coffee & pastéis de nata, comprehensive workbook in Portuguese and English, 1-month follow-up support, and networking lunch with fellow Portuguese entrepreneurs.\n\nPerfect for restaurant owners, consultants, beauty professionals, retail businesses, and any Portuguese speaker looking to start or grow their business in London.',
        date: '2025-08-25',
        time: '09:00',
        endTime: '14:00',
        location: 'Portuguese Chamber of Commerce London',
        address: '40 Holborn Circus, London EC1N 2HB',
        coordinates: { lat: 51.5174, lng: -0.1097 },
        category: 'Business & Entrepreneurship',
        subcategory: 'Professional Development',
        tags: ['business', 'entrepreneurship', 'digital marketing', 'websites', 'Portuguese professionals', 'startup'],
        hostId: 'host-carlos',
        hostName: 'Carlos Eduardo Silva',
        hostImage: getImageWithFallback('carlos-silva'),
        hostBio: 'Business consultant and mentor for Portuguese entrepreneurs, helping Portuguese-speaking businesses succeed in the UK market for 10+ years',
        membershipRequired: 'free',
        price: 45,
        currency: 'GBP',
        maxAttendees: 30,
        minAttendees: 10,
        currentAttendees: 18,
        waitlistCount: 5,
        status: 'published',
        featured: true,
        images: [
          'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&auto=format',
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&auto=format'
        ],
        photos: [],
        attendees: [
          { id: 'att-pt-11', userId: 'user-pt-11', eventId: 'event-pt-7', name: 'Miguel Santos', email: 'miguel@example.com', membershipTier: 'core', joinedAt: '2025-08-15T10:00:00Z', status: 'confirmed' },
          { id: 'att-pt-12', userId: 'user-pt-12', eventId: 'event-pt-7', name: 'Ana Rodrigues', email: 'ana@example.com', membershipTier: 'premium', joinedAt: '2025-08-16T14:30:00Z', status: 'confirmed' }
        ],
        waitlist: [
          { id: 'wait-pt-3', userId: 'user-pt-13', eventId: 'event-pt-7', name: 'João Pereira', email: 'joao@example.com', membershipTier: 'free', joinedWaitlistAt: '2025-08-17T09:00:00Z', position: 1, notified: false }
        ],
        reviews: [
          { id: 'rev-pt-6', eventId: 'event-pt-7', userId: 'user-pt-14', reviewerName: 'Teresa M.', rating: 5, comment: 'Incredibly useful! Finally understand how to market my Portuguese restaurant to both communities. Sofia\'s examples were perfect.', createdAt: '2025-08-18T15:00:00Z', helpful: 9, membershipTier: 'core' }
        ],
        averageRating: 4.7,
        totalReviews: 12,
        whatToBring: ['Laptop or tablet', 'Business ideas/existing business details', 'Notepad for networking'],
        dresscode: 'Business casual',
        ageRestriction: 'All ages welcome',
        skillLevel: 'beginner',
        accessibility: ['Step-free access', 'Accessible toilet facilities', 'Wi-Fi provided'],
        allowWaitlist: true,
        requiresApproval: false,
        refundPolicy: 'Full refund 48h+ in advance, workshop materials included',
        lastBookingTime: '48',
        createdAt: '2025-08-10T08:00:00Z',
        updatedAt: '2025-08-17T16:00:00Z',
        createdBy: 'host-carlos',
        isRecurring: true,
        recurringPattern: { frequency: 'monthly', interval: 1, daysOfWeek: [0] },
        views: 312,
        favorites: 26,
        shares: 14,
        communityGuidelines: true,
        verifiedEvent: true,
        reportCount: 0
      },
      // WOMEN 30+ LONDON EXPERIENCES - Curated for Portuguese-speaking women
      {
        id: 'london-women30-tower-1',
        title: 'Tower of London & Crown Jewels: Portuguese Women 30+ Private Tour',
        description: 'Exclusive guided tour of the Tower of London and Crown Jewels for Portuguese-speaking women 30+. Share stories of queens and empresses while exploring 1,000 years of history with women who understand your cultural background.',
        longDescription: 'Uma experiência especial para mulheres falantes de português! Join fellow Portuguese-speaking women for an intimate exploration of the Tower of London, where we\'ll discover stories of powerful queens, royal intrigue, and precious Crown Jewels that have shaped British history for centuries.\n\nOur Portuguese-speaking guide, Dr. Isabel Martins, is a historian specializing in royal women throughout history. She\'ll draw fascinating parallels between Portuguese queens like D. Isabel de Aragão and British monarchs, sharing stories that resonate with our cultural heritage.\n\nWe\'ll explore the Bloody Tower where Anne Boleyn was held, admire the stunning Crown Jewels including the Imperial State Crown worn by Queen Elizabeth II, and walk where Catherine of Braganza (Portuguese queen consort) once lived as Charles II\'s wife.\n\nThis isn\'t just a tourist experience - it\'s a chance to connect with successful Portuguese-speaking women living in London while exploring history through our unique cultural lens. Perfect for professionals, mothers, entrepreneurs, and anyone who appreciates how powerful women have shaped history.\n\nAfter the tour, we\'ll gather for afternoon tea at a nearby café where we can continue our conversations about history, culture, and life as Portuguese-speaking women in London.',
        date: '2025-08-24',
        time: '10:00',
        endTime: '13:30',
        location: 'Tower of London',
        address: 'St Katharine\'s & Wapping, London EC3N 4AB',
        coordinates: { lat: 51.5081, lng: -0.0759 },
        category: 'Arts & Culture',
        subcategory: 'Museum Tours',
        tags: ['women 30+', 'Portuguese culture', 'Tower of London', 'Crown Jewels', 'history', 'networking', 'guided tour'],
        hostId: 'host-isabel',
        hostName: 'Dr. Isabel Martins',
        hostImage: getImageWithFallback('isabel-martins'),
        hostBio: 'Portuguese historian and cultural guide specializing in royal history and women\'s empowerment, organizing enriching experiences for Portuguese women in London',
        membershipRequired: 'core',
        price: 58,
        currency: 'GBP',
        maxAttendees: 15,
        minAttendees: 8,
        currentAttendees: 11,
        waitlistCount: 3,
        status: 'published',
        featured: true,
        images: [
          'https://images.unsplash.com/photo-1539650116574-75c0c6d0d200?w=600&h=400&fit=crop&auto=format',
          'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&h=400&fit=crop&auto=format'
        ],
        photos: [],
        attendees: [
          { id: 'att-w30-1', userId: 'user-w30-1', eventId: 'london-women30-tower-1', name: 'Catarina Silva', email: 'catarina@example.com', membershipTier: 'premium', joinedAt: '2025-08-18T09:00:00Z', status: 'confirmed' },
          { id: 'att-w30-2', userId: 'user-w30-2', eventId: 'london-women30-tower-1', name: 'Beatriz Costa', email: 'beatriz@example.com', membershipTier: 'core', joinedAt: '2025-08-19T11:30:00Z', status: 'confirmed' }
        ],
        waitlist: [
          { id: 'wait-w30-1', userId: 'user-w30-10', eventId: 'london-women30-tower-1', name: 'Mariana Santos', email: 'mariana@example.com', membershipTier: 'core', joinedWaitlistAt: '2025-08-20T14:00:00Z', position: 1, notified: false }
        ],
        reviews: [
          { id: 'rev-w30-1', eventId: 'london-women30-tower-1', userId: 'user-w30-3', reviewerName: 'Sofia P.', rating: 5, comment: 'Que experiência maravilhosa! Isabel made the history come alive and connecting with other Portuguese women was the best part. Felt like exploring with sisters who understand our culture.', createdAt: '2025-08-10T16:00:00Z', helpful: 7, membershipTier: 'core', culturalValue: 5, organizationQuality: 5, venueRating: 5, wouldRecommend: true }
        ],
        averageRating: 4.9,
        totalReviews: 8,
        whatToBring: ['Comfortable walking shoes', 'Camera for photos with new friends', 'Curiosity about royal history'],
        dresscode: 'Smart casual, comfortable for walking',
        ageRestriction: 'Women 30+ only',
        skillLevel: 'all',
        accessibility: ['Wheelchair accessible paths available', 'Audio guide support'],
        allowWaitlist: true,
        requiresApproval: true,
        refundPolicy: 'Full refund 48h+ in advance due to group ticket booking',
        lastBookingTime: '48',
        createdAt: '2025-08-15T08:00:00Z',
        updatedAt: '2025-08-20T12:00:00Z',
        createdBy: 'host-isabel',
        isRecurring: true,
        recurringPattern: { frequency: 'monthly', interval: 1, daysOfWeek: [6] },
        views: 289,
        favorites: 32,
        shares: 18,
        communityGuidelines: true,
        verifiedEvent: true,
        reportCount: 0
      },
      {
        id: 'london-women30-thames-cruise-1',
        title: 'Thames Afternoon Tea Cruise: Portuguese Women 30+ Social Experience',
        description: 'Elegant afternoon tea cruise on the Thames for Portuguese-speaking women 30+. Enjoy traditional British afternoon tea while sailing past London\'s iconic landmarks with women who share your language and cultural values.',
        longDescription: 'Uma tarde elegante no Tamisa! Join us for a sophisticated afternoon tea cruise designed exclusively for Portuguese-speaking women 30+ who appreciate the finer things in life while building meaningful connections in London.\n\nBoard our luxury cruise vessel at Westminster Pier and enjoy a full traditional afternoon tea service featuring delicate finger sandwiches, fresh scones with clotted cream and jam, and an exquisite selection of pastries and cakes. We\'ve also arranged for some Portuguese touches - including mini pastéis de nata alongside the British treats!\n\nAs we sail past iconic London landmarks including the Houses of Parliament, London Eye, St. Paul\'s Cathedral, Tower Bridge, and the Shard, our hostess Ana will share fascinating stories about these monuments while facilitating conversations among our Portuguese-speaking guests.\n\nThis experience is perfect for women who want to enjoy London\'s beauty from a unique perspective while connecting with other successful Portuguese speakers. Whether you\'re originally from Portugal, Brazil, Angola, Mozambique, or anywhere in the Portuguese-speaking world, you\'ll find kindred spirits who understand the journey of building a new life while honoring your cultural roots.\n\nThe cruise includes a welcome glass of Prosecco, full afternoon tea service, and plenty of opportunities to take stunning photos of London\'s skyline with your new Portuguese friends.',
        date: '2025-08-26',
        time: '14:30',
        endTime: '17:00',
        location: 'Westminster Pier',
        address: 'Westminster Pier, Victoria Embankment, London SW1A 2JH',
        coordinates: { lat: 51.5007, lng: -0.1246 },
        category: 'Wine & Dining',
        subcategory: 'Dining Experiences',
        tags: ['women 30+', 'Thames cruise', 'afternoon tea', 'Portuguese networking', 'elegant', 'London landmarks', 'social'],
        hostId: 'host-ana-cruise',
        hostName: 'Ana Filipa Correia',
        hostImage: getImageWithFallback('ana-correia'),
        hostBio: 'Luxury event coordinator and Portuguese community connector, specializing in elegant experiences that bring Portuguese-speaking women together in London',
        membershipRequired: 'core',
        price: 65,
        currency: 'GBP',
        maxAttendees: 20,
        minAttendees: 12,
        currentAttendees: 16,
        waitlistCount: 4,
        status: 'published',
        featured: true,
        images: [
          'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&auto=format',
          'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=400&fit=crop&auto=format'
        ],
        photos: [],
        attendees: [
          { id: 'att-cruise-1', userId: 'user-cruise-1', eventId: 'london-women30-thames-cruise-1', name: 'Rita Fernandes', email: 'rita@example.com', membershipTier: 'premium', joinedAt: '2025-08-17T13:00:00Z', status: 'confirmed' },
          { id: 'att-cruise-2', userId: 'user-cruise-2', eventId: 'london-women30-thames-cruise-1', name: 'Joana Mendes', email: 'joana@example.com', membershipTier: 'core', joinedAt: '2025-08-18T16:45:00Z', status: 'confirmed' }
        ],
        waitlist: [
          { id: 'wait-cruise-1', userId: 'user-cruise-10', eventId: 'london-women30-thames-cruise-1', name: 'Cristina Alves', email: 'cristina@example.com', membershipTier: 'core', joinedWaitlistAt: '2025-08-21T10:00:00Z', position: 1, notified: false }
        ],
        reviews: [
          { id: 'rev-cruise-1', eventId: 'london-women30-thames-cruise-1', userId: 'user-cruise-3', reviewerName: 'Patrícia M.', rating: 5, comment: 'Absolutely magical! The tea was beautiful but the connections with other Portuguese women were priceless. Ana created such a welcoming atmosphere.', createdAt: '2025-08-12T18:30:00Z', helpful: 9, membershipTier: 'core', culturalValue: 4, organizationQuality: 5, venueRating: 5, wouldRecommend: true }
        ],
        averageRating: 4.8,
        totalReviews: 6,
        whatToBring: ['Camera for London skyline photos', 'Light jacket for river breeze', 'Appetite for beautiful food and conversation'],
        dresscode: 'Smart casual to elegant, suitable for afternoon tea',
        ageRestriction: 'Women 30+ only',
        skillLevel: 'all',
        accessibility: ['Wheelchair accessible boarding', 'Accessible facilities onboard'],
        allowWaitlist: true,
        requiresApproval: true,
        refundPolicy: 'Full refund 72h+ in advance due to cruise booking requirements',
        lastBookingTime: '72',
        createdAt: '2025-08-12T10:00:00Z',
        updatedAt: '2025-08-21T09:00:00Z',
        createdBy: 'host-ana-cruise',
        isRecurring: true,
        recurringPattern: { frequency: 'monthly', interval: 1, daysOfWeek: [1] },
        views: 234,
        favorites: 28,
        shares: 15,
        communityGuidelines: true,
        verifiedEvent: true,
        reportCount: 0
      },
      {
        id: 'london-women30-london-eye-1',
        title: 'London Eye Sunset Experience: Portuguese Women 30+ Celebration',
        description: 'Watch London transform at golden hour from the iconic London Eye with Portuguese-speaking women 30+. Celebrate life, success, and sisterhood 135 meters above the Thames with breathtaking 360° views.',
        longDescription: 'Uma vista espetacular de Londres! Join us for a truly magical experience aboard the London Eye as we watch the sun set over London, creating the perfect backdrop for celebration and connection among Portuguese-speaking women 30+.\n\nWe\'ve booked a private capsule for our group, ensuring intimate conversations and uninterrupted photo opportunities during the 30-minute slow rotation. As London transforms from daylight to golden hour and then to sparkling night lights, you\'ll share this unforgettable moment with women who understand your journey of success and adaptation in London.\n\nOur hostess Marta will provide fascinating insights about the landmarks visible from our aerial view - from Big Ben and Parliament to St. Paul\'s Cathedral and the Shard. She\'ll also share stories of how Portuguese explorers like Vasco da Gama would have dreamed of views like this during their historic voyages.\n\nBefore boarding, we\'ll gather for welcome drinks at the London Eye Champagne Bar, where you can get to know your fellow Portuguese-speaking companions. The experience includes priority boarding, professional group photos, and a commemorative photo package for each participant.\n\nThis is perfect for celebrating personal achievements, career milestones, birthdays, or simply the joy of being successful Portuguese-speaking women living our best lives in London. Come ready to be inspired by both the views and the incredible women beside you!',
        date: '2025-08-28',
        time: '18:30',
        endTime: '20:30',
        location: 'London Eye',
        address: 'Riverside Building, County Hall, London SE1 7PB',
        coordinates: { lat: 51.5033, lng: -0.1195 },
        category: 'Lifestyle & Hobbies',
        subcategory: 'Sightseeing',
        tags: ['women 30+', 'London Eye', 'sunset', 'Portuguese celebration', 'photography', 'inspiration', 'sisterhood'],
        hostId: 'host-marta-eye',
        hostName: 'Marta Sousa',
        hostImage: getImageWithFallback('marta-sousa'),
        hostBio: 'Portuguese lifestyle coach and photography enthusiast, creating empowering experiences for Portuguese women to celebrate their successes in London',
        membershipRequired: 'core',
        price: 45,
        currency: 'GBP',
        maxAttendees: 12,
        minAttendees: 8,
        currentAttendees: 10,
        waitlistCount: 2,
        status: 'published',
        featured: true,
        images: [
          'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=400&fit=crop&auto=format',
          'https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=600&h=400&fit=crop&auto=format'
        ],
        photos: [],
        attendees: [
          { id: 'att-eye-1', userId: 'user-eye-1', eventId: 'london-women30-london-eye-1', name: 'Carla Rodrigues', email: 'carla@example.com', membershipTier: 'premium', joinedAt: '2025-08-19T14:00:00Z', status: 'confirmed' },
          { id: 'att-eye-2', userId: 'user-eye-2', eventId: 'london-women30-london-eye-1', name: 'Teresa Oliveira', email: 'teresa@example.com', membershipTier: 'core', joinedAt: '2025-08-20T10:30:00Z', status: 'confirmed' }
        ],
        waitlist: [
          { id: 'wait-eye-1', userId: 'user-eye-10', eventId: 'london-women30-london-eye-1', name: 'Sónia Lima', email: 'sonia@example.com', membershipTier: 'core', joinedWaitlistAt: '2025-08-22T16:00:00Z', position: 1, notified: false }
        ],
        reviews: [
          { id: 'rev-eye-1', eventId: 'london-women30-london-eye-1', userId: 'user-eye-3', reviewerName: 'Lúcia R.', rating: 5, comment: 'Breathtaking in every way! The views were incredible but the feeling of sisterhood with other Portuguese women was even more beautiful. Marta made everyone feel so special.', createdAt: '2025-08-15T21:00:00Z', helpful: 6, membershipTier: 'core', culturalValue: 4, organizationQuality: 5, venueRating: 5, wouldRecommend: true }
        ],
        averageRating: 4.9,
        totalReviews: 4,
        whatToBring: ['Camera or phone for amazing photos', 'Light jacket for height and evening breeze', 'Celebratory spirit'],
        dresscode: 'Smart casual, comfortable shoes (no heels recommended)',
        ageRestriction: 'Women 30+ only',
        skillLevel: 'all',
        accessibility: ['Wheelchair accessible', 'Accessible facilities'],
        allowWaitlist: true,
        requiresApproval: true,
        refundPolicy: 'Full refund 48h+ in advance due to London Eye booking policy',
        lastBookingTime: '48',
        createdAt: '2025-08-16T12:00:00Z',
        updatedAt: '2025-08-22T14:30:00Z',
        createdBy: 'host-marta-eye',
        isRecurring: true,
        recurringPattern: { frequency: 'monthly', interval: 1, daysOfWeek: [3] },
        views: 198,
        favorites: 24,
        shares: 12,
        communityGuidelines: true,
        verifiedEvent: true,
        reportCount: 0
      },
      {
        id: 'london-women30-borough-market-1',
        title: 'Borough Market Gourmet Food Tour: Portuguese Women 30+ Culinary Journey',
        description: 'Explore London\'s most famous food market with Portuguese-speaking women 30+. Discover artisanal foods, sample international cuisines, and find ingredients that remind you of home while building friendships over shared meals.',
        longDescription: 'Uma aventura gastronómica em Londres! Join fellow Portuguese-speaking women for a guided culinary journey through Borough Market, London\'s oldest and most renowned food market, where we\'ll explore flavors from around the world while celebrating our shared love for good food and great company.\n\nOur food-loving guide, Chef Sofia Carvalho (Portuguese chef who\'s worked in London for 10 years), will take us on a carefully curated tasting tour featuring the best of Borough Market. We\'ll sample artisanal cheeses, fresh bread, exotic spices, international street food, and discover ingredients that might remind you of flavors from home.\n\nSpecial highlights include visiting Portuguese vendors who import authentic products from Portugal and Brazil, learning about spices used in Lusophone cuisine, and finding the best substitutes for ingredients you miss from home. Sofia will share cooking tips and techniques that work in London kitchens, perfect for recreating comforting Portuguese flavors.\n\nThe experience includes tastings from 8-10 different vendors, covering everything from British artisanal products to international specialties. We\'ll end our tour at a cozy café where we can sit together over coffee and pastries, sharing our favorite discoveries and exchanging recipes and cooking stories.\n\nPerfect for food enthusiasts, home cooks, and anyone who believes that the best conversations happen over good food. Come hungry and leave with new friends, new flavors, and plenty of inspiration for your next dinner party!',
        date: '2025-08-30',
        time: '10:00',
        endTime: '13:00',
        location: 'Borough Market',
        address: '8 Southwark Street, London SE1 1TL',
        coordinates: { lat: 51.5055, lng: -0.0909 },
        category: 'Wine & Dining',
        subcategory: 'Food Tours',
        tags: ['women 30+', 'Borough Market', 'food tour', 'Portuguese cuisine', 'cooking', 'gourmet', 'culinary'],
        hostId: 'host-sofia-chef',
        hostName: 'Chef Sofia Carvalho',
        hostImage: getImageWithFallback('sofia-chef'),
        hostBio: 'Professional Portuguese chef and culinary guide, helping Portuguese speakers discover London\'s incredible food scene while maintaining connection to Lusophone flavors',
        membershipRequired: 'core',
        price: 52,
        currency: 'GBP',
        maxAttendees: 14,
        minAttendees: 8,
        currentAttendees: 11,
        waitlistCount: 3,
        status: 'published',
        featured: true,
        images: [
          'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop&auto=format',
          'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&auto=format'
        ],
        photos: [],
        attendees: [
          { id: 'att-market-1', userId: 'user-market-1', eventId: 'london-women30-borough-market-1', name: 'Filipa Santos', email: 'filipa@example.com', membershipTier: 'premium', joinedAt: '2025-08-21T09:00:00Z', status: 'confirmed' },
          { id: 'att-market-2', userId: 'user-market-2', eventId: 'london-women30-borough-market-1', name: 'Mónica Pereira', email: 'monica@example.com', membershipTier: 'core', joinedAt: '2025-08-22T12:15:00Z', status: 'confirmed' }
        ],
        waitlist: [
          { id: 'wait-market-1', userId: 'user-market-10', eventId: 'london-women30-borough-market-1', name: 'Andreia Costa', email: 'andreia@example.com', membershipTier: 'core', joinedWaitlistAt: '2025-08-23T15:30:00Z', position: 1, notified: false }
        ],
        reviews: [
          { id: 'rev-market-1', eventId: 'london-women30-borough-market-1', userId: 'user-market-3', reviewerName: 'Inês T.', rating: 5, comment: 'Sofia knows everything about food! Found so many ingredients I\'d been looking for and made amazing connections with other Portuguese women who love cooking. Perfect morning!', createdAt: '2025-08-17T14:30:00Z', helpful: 5, membershipTier: 'core', culturalValue: 5, organizationQuality: 5, venueRating: 4, wouldRecommend: true }
        ],
        averageRating: 4.8,
        totalReviews: 7,
        whatToBring: ['Comfortable walking shoes', 'Appetite for adventure', 'Reusable shopping bag for any purchases', 'Camera for food photos'],
        dresscode: 'Casual, comfortable for walking and standing',
        ageRestriction: 'Women 30+ only',
        skillLevel: 'all',
        accessibility: ['Market has mixed accessibility', 'Some areas may be crowded'],
        allowWaitlist: true,
        requiresApproval: true,
        refundPolicy: 'Full refund 24h+ in advance due to food pre-arrangements',
        lastBookingTime: '24',
        createdAt: '2025-08-18T11:00:00Z',
        updatedAt: '2025-08-23T13:00:00Z',
        createdBy: 'host-sofia-chef',
        isRecurring: true,
        recurringPattern: { frequency: 'monthly', interval: 1, daysOfWeek: [5] },
        views: 167,
        favorites: 21,
        shares: 9,
        communityGuidelines: true,
        verifiedEvent: true,
        reportCount: 0
      },

      // SANTOS POPULARES FESTIVALS 2025 - AUTHENTIC PORTUGUESE CULTURAL CELEBRATIONS
      {
        id: 'santo-antonio-festival-2025',
        title: 'Festa de Santo António - Little Portugal Celebration',
        description: 'Celebrate Santo António (June 13th) with traditional Portuguese street festivities, grilled sardines, arraiais, and the famous Marchas Populares in London\'s Little Portugal.',
        longDescription: 'Viva Santo António! Join us for the most authentic Portuguese street festival in London, bringing the spirit of Lisbon\'s Santos Populares to Stockwell\'s Little Portugal. This is the highlight of the Portuguese cultural calendar, celebrating our patron saint of lovers, marriages, and lost things.\n\nOur festival recreates the authentic Lisbon experience with traditional arraiais (street parties) throughout Little Portugal. We\'ll have multiple street locations with live Pimba music that will make your feet move automatically, grilled sardines sizzling on every corner (the festival is sometimes called \'Festival of Sardines\'), bifanas (Portuguese pork sandwiches), and plenty of Super Bock and Sagres.\n\nThe evening culminates with our own Marchas Populares parade down South Lambeth Road at 21:00, where each Portuguese neighborhood group performs traditional choreographed marches with colorful costumes and banners representing different regions of the Portuguese-speaking world.\n\nTraditional elements include:\n- Manjerico basil plants with love poems for gifting\n- Portuguese folk dancing lessons (from 19:00)\n- Traditional bonfire jumping for good luck\n- Live Fado performances between Pimba sets\n- Portuguese handicrafts and traditional sweets market\n- Kids\' area with traditional Portuguese games\n\nThis is THE event that brings together Portuguese families from Portugal, Brazil, Angola, Mozambique, Cape Verde, and all Portuguese-speaking communities for one night of pure saudade and celebration. Bring your Portuguese spirit and prepare to dance until dawn!',
        date: '2025-06-13',
        time: '18:00',
        endTime: '02:00',
        location: 'Little Portugal Street Festival',
        address: 'South Lambeth Road, Stockwell, London SW8',
        coordinates: { lat: 51.4821, lng: -0.1134 },
        category: 'Cultural',
        subcategory: 'Festivals',
        tags: ['Santo António', 'Santos Populares', 'Portuguese festival', 'Marchas Populares', 'Little Portugal', 'sardines', 'Pimba', 'street party'],
        hostId: 'host-pcc-london',
        hostName: 'Portuguese Community Centre London',
        hostImage: getImageWithFallback('pcc-london'),
        hostBio: 'Official Portuguese Community Centre organizing authentic Portuguese cultural celebrations in London for over 30 years',
        membershipRequired: 'free',
        price: 0,
        currency: 'GBP',
        maxAttendees: 2000,
        minAttendees: 100,
        currentAttendees: 847,
        waitlistCount: 0,
        status: 'published',
        featured: true,
        images: [
          'https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?w=600&h=400&fit=crop&auto=format',
          'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&auto=format',
          'https://images.unsplash.com/photo-1524841811905-6d2b2c735db8?w=600&h=400&fit=crop&auto=format'
        ],
        photos: [
          { id: 'photo-sa-1', eventId: 'santo-antonio-festival-2025', url: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?w=400&h=400&fit=crop&auto=format', caption: 'Marchas Populares parade 2024', uploadedBy: 'PCC London', uploadedAt: '2024-06-14T00:30:00Z', featured: true },
          { id: 'photo-sa-2', eventId: 'santo-antonio-festival-2025', url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&auto=format', caption: 'Grilled sardines station', uploadedBy: 'Maria Santos', uploadedAt: '2024-06-13T21:15:00Z', featured: false }
        ],
        attendees: [
          { id: 'att-sa-1', userId: 'user-sa-1', eventId: 'santo-antonio-festival-2025', name: 'José Silva', email: 'jose@example.com', membershipTier: 'free', joinedAt: '2025-05-20T14:00:00Z', status: 'confirmed' },
          { id: 'att-sa-2', userId: 'user-sa-2', eventId: 'santo-antonio-festival-2025', name: 'Ana Rodrigues', email: 'ana@example.com', membershipTier: 'core', joinedAt: '2025-05-22T10:30:00Z', status: 'confirmed' },
          { id: 'att-sa-3', userId: 'user-sa-3', eventId: 'santo-antonio-festival-2025', name: 'Carlos Mendes', email: 'carlos@example.com', membershipTier: 'premium', joinedAt: '2025-05-25T16:45:00Z', status: 'confirmed' }
        ],
        waitlist: [],
        reviews: [
          { id: 'rev-sa-1', eventId: 'santo-antonio-festival-2025', userId: 'user-sa-10', reviewerName: 'Rita M.', rating: 5, comment: 'Exactly like being in Lisbon during Santos Populares! The atmosphere was incredible and the Marchas were beautiful. My kids loved it and finally understood our Portuguese traditions.', createdAt: '2024-06-14T10:00:00Z', helpful: 23, membershipTier: 'core', culturalValue: 5, organizationQuality: 5, venueRating: 4, wouldRecommend: true },
          { id: 'rev-sa-2', eventId: 'santo-antonio-festival-2025', userId: 'user-sa-11', reviewerName: 'Manuel C.', rating: 5, comment: 'Que saudades! This brought back so many memories of my childhood in Portugal. The sardines were perfect, the music was authentic Pimba, and seeing so many Portuguese families celebrating together was emotional.', createdAt: '2024-06-14T15:30:00Z', helpful: 18, membershipTier: 'free', culturalValue: 5, organizationQuality: 4, venueRating: 4, wouldRecommend: true }
        ],
        averageRating: 4.9,
        totalReviews: 89,
        whatToBring: ['Portuguese spirit and pride', 'Appetite for sardines and bifanas', 'Comfortable dancing shoes', 'Manjerico basil plant if you have one'],
        dresscode: 'Traditional Portuguese colors (optional) or casual festival wear',
        ageRestriction: 'Family-friendly, all ages welcome',
        skillLevel: 'all',
        accessibility: ['Street festival - mixed accessibility', 'Some raised viewing areas available', 'Accessible toilet facilities'],
        allowWaitlist: false,
        requiresApproval: false,
        refundPolicy: 'Free event - no refunds needed',
        lastBookingTime: '1',
        createdAt: '2025-04-15T12:00:00Z',
        updatedAt: '2025-06-01T10:00:00Z',
        createdBy: 'host-pcc-london',
        isRecurring: true,
        recurringPattern: { frequency: 'yearly', interval: 1, customDates: ['2025-06-13', '2026-06-13', '2027-06-13'] },
        views: 3247,
        favorites: 234,
        shares: 156,
        communityGuidelines: true,
        verifiedEvent: true,
        reportCount: 0
      },
      {
        id: 'sao-joao-festival-2025',
        title: 'Festa de São João - Porto Night in London',
        description: 'Experience the magic of São João (June 23rd) with traditional Porto festivities: plastic hammers, grilled sardines, folk dancing, and bonfire jumping at the Portuguese Community Centre.',
        longDescription: 'São João como deve ser! Transport yourself to the streets of Porto for one magical night celebrating São João, the festival of Saint John the Baptist. This is Portugal\'s most joyful and playful street festival, and we\'re bringing all the authentic traditions to London.\n\nOur celebration recreates the enchanting atmosphere of Porto\'s Ribeira and Fontainhas neighborhoods during São João night. The Portuguese Community Centre will be transformed with colorful decorations, traditional Portuguese music, and the irresistible aroma of grilled sardines filling the air.\n\nAuthentic São João traditions include:\n- Plastic hammer tradition (martelos de plástico) - we\'ll provide them for friendly bonking!\n- Grilled sardines with Portuguese corn bread and wine\n- Traditional folk dancing with live accordion music\n- Bonfire lighting ceremony at midnight with collective jumping for luck\n- Manjerico basil plants exchange (symbol of love and friendship)\n- Traditional Portuguese games: malha, peão, and others\n- Live Portuguese folk music and traditional singing\n- São João altar with offerings and prayers\n\nThe evening features authentic Portuguese folk groups performing traditional dances from the Minho region, followed by open dancing where everyone is welcome to join. We\'ll teach you the steps to corridinho, vira, and other folk dances that are essential to São João celebrations.\n\nSpecial São João menu includes:\n- Grilled sardines with roasted peppers\n- Caldo verde (Portuguese green soup)\n- Broa de milho (corn bread)\n- Bifanas and chouriço assado\n- Vinho verde and Portuguese beer\n- Traditional sweets: sonhos and filhoses\n\nCome prepared to laugh, dance, and experience the pure joy that defines São João. This celebration brings together Portuguese families and friends for one of the most beloved nights in our cultural calendar.',
        date: '2025-06-23',
        time: '19:00',
        endTime: '01:00',
        location: 'Portuguese Community Centre London',
        address: '183 Stock Street, Lambeth, London SW8 2AR',
        coordinates: { lat: 51.4829, lng: -0.1142 },
        category: 'Cultural',
        subcategory: 'Festivals',
        tags: ['São João', 'Santos Populares', 'Porto festival', 'plastic hammers', 'folk dancing', 'bonfire', 'Portuguese traditions'],
        hostId: 'host-pcc-london',
        hostName: 'Portuguese Community Centre London',
        hostImage: getImageWithFallback('pcc-london'),
        hostBio: 'Official Portuguese Community Centre organizing authentic Portuguese cultural celebrations in London for over 30 years',
        membershipRequired: 'free',
        price: 15,
        currency: 'GBP',
        maxAttendees: 300,
        minAttendees: 50,
        currentAttendees: 187,
        waitlistCount: 23,
        status: 'published',
        featured: true,
        images: [
          'https://images.unsplash.com/photo-1533472842400-c44cb5a7ac01?w=600&h=400&fit=crop&auto=format',
          'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&auto=format',
          'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop&auto=format'
        ],
        photos: [
          { id: 'photo-sj-1', eventId: 'sao-joao-festival-2025', url: 'https://images.unsplash.com/photo-1533472842400-c44cb5a7ac01?w=400&h=400&fit=crop&auto=format', caption: 'Traditional folk dancing 2024', uploadedBy: 'Folclore Group', uploadedAt: '2024-06-24T01:00:00Z', featured: true },
          { id: 'photo-sj-2', eventId: 'sao-joao-festival-2025', url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop&auto=format', caption: 'Midnight bonfire jumping', uploadedBy: 'Community Photos', uploadedAt: '2024-06-24T00:15:00Z', featured: false }
        ],
        attendees: [
          { id: 'att-sj-1', userId: 'user-sj-1', eventId: 'sao-joao-festival-2025', name: 'Teresa Costa', email: 'teresa@example.com', membershipTier: 'free', joinedAt: '2025-05-28T09:00:00Z', status: 'confirmed' },
          { id: 'att-sj-2', userId: 'user-sj-2', eventId: 'sao-joao-festival-2025', name: 'Miguel Pereira', email: 'miguel@example.com', membershipTier: 'core', joinedAt: '2025-05-30T14:20:00Z', status: 'confirmed' }
        ],
        waitlist: [
          { id: 'wait-sj-1', userId: 'user-sj-15', eventId: 'sao-joao-festival-2025', name: 'Luisa Ferreira', email: 'luisa@example.com', membershipTier: 'free', joinedWaitlistAt: '2025-06-15T18:00:00Z', position: 1, notified: false }
        ],
        reviews: [
          { id: 'rev-sj-1', eventId: 'sao-joao-festival-2025', userId: 'user-sj-10', reviewerName: 'António S.', rating: 5, comment: 'Incredible! Felt exactly like São João in Porto with my family. The plastic hammers were hilarious and the bonfire jumping brought back childhood memories. Perfect Portuguese celebration.', createdAt: '2024-06-24T11:00:00Z', helpful: 15, membershipTier: 'core', culturalValue: 5, organizationQuality: 5, venueRating: 4, wouldRecommend: true }
        ],
        averageRating: 4.8,
        totalReviews: 34,
        whatToBring: ['Plastic hammer (provided if needed)', 'Portuguese party spirit', 'Comfortable shoes for dancing', 'Appetite for sardines'],
        dresscode: 'Casual festival wear, comfortable dancing shoes recommended',
        ageRestriction: 'Family-friendly, all ages welcome',
        skillLevel: 'all',
        accessibility: ['Indoor venue with full accessibility', 'Accessible parking available', 'All areas wheelchair accessible'],
        allowWaitlist: true,
        requiresApproval: false,
        refundPolicy: 'Full refund up to 48h before event',
        lastBookingTime: '24',
        createdAt: '2025-04-20T10:00:00Z',
        updatedAt: '2025-06-10T16:00:00Z',
        createdBy: 'host-pcc-london',
        isRecurring: true,
        recurringPattern: { frequency: 'yearly', interval: 1, customDates: ['2025-06-23', '2026-06-23', '2027-06-23'] },
        views: 1843,
        favorites: 127,
        shares: 78,
        communityGuidelines: true,
        verifiedEvent: true,
        reportCount: 0
      },
      {
        id: 'portugal-day-2025',
        title: 'Dia de Portugal - National Day Celebration at Kennington Park',
        description: 'Celebrate Portugal National Day (June 10th) with the Portuguese community in London\'s traditional celebration venue. Cultural performances, Portuguese food, and family activities.',
        longDescription: 'Dia de Portugal, de Camões e das Comunidades Portuguesas! Join hundreds of Portuguese families for London\'s official Portugal National Day celebration, historically held in Kennington Park in the heart of what\'s known as Little Portugal.\n\nThis is the most important day in the Portuguese calendar, commemorating our national poet Luís de Camões and celebrating Portuguese culture worldwide. Our London celebration brings together Portuguese people from Portugal, Brazil, Angola, Mozambique, Cape Verde, Guinea-Bissau, São Tomé and Príncipe, East Timor, and Macau.\n\nOfficial program includes:\n- Opening ceremony with Portuguese and British officials\n- Raising of Portuguese flags from all Portuguese-speaking countries\n- Traditional Portuguese folk performances by community groups\n- Children\'s Portuguese language activities and games\n- Portuguese handicrafts and cultural exhibitions\n- Traditional Portuguese music throughout the day\n- Football tournament representing different Portuguese regions\n\nAuthentic Portuguese food village featuring:\n- Regional specialties from all Portuguese-speaking countries\n- Traditional Portuguese barbecue (grilled sardines, linguiça, etc.)\n- Pastéis de nata competition between London\'s Portuguese bakeries\n- Brazilian feijoada and caipirinha stand\n- Angolan and Mozambican traditional dishes\n- Cape Verdean cachupa and grogue tasting\n- Portuguese wine and beer garden\n\nSpecial cultural exhibitions:\n- Portuguese immigration history in London display\n- Traditional Portuguese crafts demonstrations\n- Portuguese language school performances\n- Photo exhibition: "Portuguese London Through the Decades"\n- Traditional Portuguese costume display\n\nFamily activities include Portuguese traditional games for children, Portuguese language storytelling corner, face painting with Portuguese symbols, and bouncy castles with Portuguese themes.\n\nThis celebration is free for all and represents the largest gathering of Portuguese-speaking people in London. Come with your Portuguese pride, bring your family, and celebrate our language, culture, and the bonds that unite Portuguese communities worldwide.',
        date: '2025-06-10',
        time: '11:00',
        endTime: '18:00',
        location: 'Kennington Park',
        address: 'Kennington Park, Kennington Park Road, London SE11 4AS',
        coordinates: { lat: 51.4841, lng: -0.1059 },
        category: 'Cultural',
        subcategory: 'National Celebrations',
        tags: ['Dia de Portugal', 'Portugal Day', 'Kennington Park', 'Portuguese national day', 'Camões', 'community celebration', 'cultural'],
        hostId: 'host-embassy-portugal',
        hostName: 'Portuguese Embassy London & Community Partners',
        hostImage: getImageWithFallback('embassy-portugal'),
        hostBio: 'Official Portuguese Embassy in London organizing the annual Portugal National Day celebration with Portuguese community organizations',
        membershipRequired: 'free',
        price: 0,
        currency: 'GBP',
        maxAttendees: 5000,
        minAttendees: 200,
        currentAttendees: 1247,
        waitlistCount: 0,
        status: 'published',
        featured: true,
        images: [
          'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=600&h=400&fit=crop&auto=format',
          'https://images.unsplash.com/photo-1524841811905-6d2b2c735db8?w=600&h=400&fit=crop&auto=format',
          'https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?w=600&h=400&fit=crop&auto=format'
        ],
        photos: [
          { id: 'photo-pd-1', eventId: 'portugal-day-2025', url: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&h=400&fit=crop&auto=format', caption: 'Folk dance performances 2024', uploadedBy: 'Embassy Photos', uploadedAt: '2024-06-10T16:00:00Z', featured: true },
          { id: 'photo-pd-2', eventId: 'portugal-day-2025', url: 'https://images.unsplash.com/photo-1524841811905-6d2b2c735db8?w=400&h=400&fit=crop&auto=format', caption: 'Community gathering', uploadedBy: 'Community Photos', uploadedAt: '2024-06-10T14:30:00Z', featured: false }
        ],
        attendees: [
          { id: 'att-pd-1', userId: 'user-pd-1', eventId: 'portugal-day-2025', name: 'Maria Fernandes', email: 'maria@example.com', membershipTier: 'free', joinedAt: '2025-05-15T10:00:00Z', status: 'confirmed' },
          { id: 'att-pd-2', userId: 'user-pd-2', eventId: 'portugal-day-2025', name: 'João Santos', email: 'joao@example.com', membershipTier: 'core', joinedAt: '2025-05-18T12:30:00Z', status: 'confirmed' },
          { id: 'att-pd-3', userId: 'user-pd-3', eventId: 'portugal-day-2025', name: 'Cristina Silva', email: 'cristina@example.com', membershipTier: 'premium', joinedAt: '2025-05-20T14:15:00Z', status: 'confirmed' }
        ],
        waitlist: [],
        reviews: [
          { id: 'rev-pd-1', eventId: 'portugal-day-2025', userId: 'user-pd-10', reviewerName: 'Eduardo M.', rating: 5, comment: 'The most important day for Portuguese people in London! Beautiful celebration with authentic Portuguese culture, great food, and seeing so many Portuguese families together. My children loved learning about their heritage.', createdAt: '2024-06-10T19:00:00Z', helpful: 31, membershipTier: 'free', culturalValue: 5, organizationQuality: 5, venueRating: 5, wouldRecommend: true },
          { id: 'rev-pd-2', eventId: 'portugal-day-2025', userId: 'user-pd-11', reviewerName: 'Isabel C.', rating: 5, comment: 'Perfect organization by the Embassy and community groups. The folk performances were incredible and the food represented all Portuguese-speaking countries beautifully. Proud to be Portuguese!', createdAt: '2024-06-10T20:30:00Z', helpful: 27, membershipTier: 'core', culturalValue: 5, organizationQuality: 5, venueRating: 4, wouldRecommend: true }
        ],
        averageRating: 4.9,
        totalReviews: 156,
        whatToBring: ['Portuguese flags or colors', 'Picnic blanket for park', 'Appetite for Portuguese food', 'Camera for family photos'],
        dresscode: 'Portuguese colors encouraged (green and red), casual park wear',
        ageRestriction: 'Family-friendly, all ages welcome',
        skillLevel: 'all',
        accessibility: ['Park setting with level grass areas', 'Accessible toilet facilities', 'Parking available nearby'],
        allowWaitlist: false,
        requiresApproval: false,
        refundPolicy: 'Free event - no refunds needed',
        lastBookingTime: '1',
        createdAt: '2025-03-15T12:00:00Z',
        updatedAt: '2025-05-20T09:00:00Z',
        createdBy: 'host-embassy-portugal',
        isRecurring: true,
        recurringPattern: { frequency: 'yearly', interval: 1, customDates: ['2025-06-10', '2026-06-10', '2027-06-10'] },
        views: 4521,
        favorites: 342,
        shares: 298,
        communityGuidelines: true,
        verifiedEvent: true,
        reportCount: 0
      },

      // AUTHENTIC FADO NIGHTS AT REAL LITTLE PORTUGAL VENUES
      {
        id: 'fado-night-three-lions-2025',
        title: 'Noite de Fado at The Three Lions - Authentic Portuguese Experience',
        description: 'Experience authentic Fado in the heart of Little Portugal at The Three Lions, where even the Portuguese Ambassador dines. Traditional Portuguese dinner, Vinho Verde, and live Fado performances.',
        longDescription: 'Uma noite de Fado autêntica em Little Portugal! Join us at The Three Lions, one of Little Portugal\'s most authentic venues where even the Portuguese Ambassador has dined, for an evening celebrating the soul of Portuguese music and culture.\n\nThe Three Lions has been a cornerstone of the Portuguese community for decades, known for serving all the Portuguese classics from codfish to Francesinha with world-class quality. Tonight, this beloved community hub transforms into an intimate Fado house, bringing the melancholic beauty and emotional depth of Portugal\'s national music to London.\n\nOur evening features:\n- Welcome reception with authentic Vinho Verde from the Minho region\n- Traditional Portuguese dinner menu including bacalhau à brás, caldo verde, and pastéis de nata\n- Live Fado performance by renowned fadista Helena Vieira, accompanied by Portuguese and classical guitars\n- Interactive segment where guests can learn about Fado history and traditions\n- Portuguese wine pairing with regional selections\n- Cultural storytelling about Fado\'s roots in Lisbon\'s Alfama district\n\nHelena Vieira is a celebrated fadista who has performed in Lisbon\'s most prestigious Fado houses and now brings her artistry to London\'s Portuguese community. She\'ll perform classic Fados including "Lágrima," "Estranha Forma de Vida," and contemporary pieces that speak to the Portuguese immigrant experience.\n\nThe intimate setting of The Three Lions, with its traditional Portuguese décor and warm atmosphere, creates the perfect backdrop for this authentic cultural experience. This isn\'t just dinner and music - it\'s a journey into the heart of Portuguese identity, perfect for sharing with fellow Portuguese speakers who understand the profound emotion of Fado.\n\nLimited seating ensures an intimate, authentic Fado house experience where every guest can feel the full emotional impact of this UNESCO-recognized musical tradition.',
        date: '2025-09-14',
        time: '19:00',
        endTime: '23:00',
        location: 'The Three Lions Restaurant',
        address: '79 South Lambeth Road, Stockwell, London SW8 1RN',
        coordinates: { lat: 51.4823, lng: -0.1139 },
        category: 'Cultural',
        subcategory: 'Music & Performance',
        tags: ['Fado', 'Portuguese music', 'The Three Lions', 'Little Portugal', 'traditional dinner', 'Vinho Verde', 'authentic'],
        hostId: 'host-three-lions',
        hostName: 'The Three Lions & Helena Vieira',
        hostImage: getImageWithFallback('three-lions-restaurant'),
        hostBio: 'Iconic Portuguese restaurant in Little Portugal, community hub for over 20 years, partnering with authentic Portuguese artists',
        membershipRequired: 'free',
        price: 45,
        currency: 'GBP',
        maxAttendees: 40,
        minAttendees: 20,
        currentAttendees: 32,
        waitlistCount: 8,
        status: 'published',
        featured: true,
        images: [
          'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop&auto=format',
          'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&auto=format',
          'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=400&fit=crop&auto=format'
        ],
        photos: [
          { id: 'photo-fado-1', eventId: 'fado-night-three-lions-2025', url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&auto=format', caption: 'Helena Vieira performing at The Three Lions', uploadedBy: 'The Three Lions', uploadedAt: '2025-08-15T20:30:00Z', featured: true },
          { id: 'photo-fado-2', eventId: 'fado-night-three-lions-2025', url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=400&fit=crop&auto=format', caption: 'Traditional Portuguese dinner setting', uploadedBy: 'Guest Photos', uploadedAt: '2025-08-15T19:45:00Z', featured: false }
        ],
        attendees: [
          { id: 'att-fado-1', userId: 'user-fado-1', eventId: 'fado-night-three-lions-2025', name: 'Maria Santos', email: 'maria.s@example.com', membershipTier: 'core', joinedAt: '2025-08-20T14:00:00Z', status: 'confirmed' },
          { id: 'att-fado-2', userId: 'user-fado-2', eventId: 'fado-night-three-lions-2025', name: 'António Ferreira', email: 'antonio.f@example.com', membershipTier: 'premium', joinedAt: '2025-08-22T10:30:00Z', status: 'confirmed' },
          { id: 'att-fado-3', userId: 'user-fado-3', eventId: 'fado-night-three-lions-2025', name: 'Isabel Rodrigues', email: 'isabel.r@example.com', membershipTier: 'free', joinedAt: '2025-08-25T16:15:00Z', status: 'confirmed' }
        ],
        waitlist: [
          { id: 'wait-fado-1', userId: 'user-fado-15', eventId: 'fado-night-three-lions-2025', name: 'Carlos Mendes', email: 'carlos.m@example.com', membershipTier: 'core', joinedWaitlistAt: '2025-08-28T12:00:00Z', position: 1, notified: false }
        ],
        reviews: [
          { id: 'rev-fado-1', eventId: 'fado-night-three-lions-2025', userId: 'user-fado-10', reviewerName: 'Fernanda L.', rating: 5, comment: 'Que noite maravilhosa! Helena\'s voice gave me goosebumps and The Three Lions created the perfect intimate atmosphere. Felt like being in a traditional Fado house in Alfama. The dinner was exceptional too.', createdAt: '2025-08-16T00:30:00Z', helpful: 12, membershipTier: 'core', culturalValue: 5, organizationQuality: 5, venueRating: 5, wouldRecommend: true },
          { id: 'rev-fado-2', eventId: 'fado-night-three-lions-2025', userId: 'user-fado-11', reviewerName: 'João P.', rating: 5, comment: 'Authentic Fado experience in London! Helena is a true fadista and The Three Lions provided the perfect setting. The Portuguese community came together beautifully. Will definitely return.', createdAt: '2025-08-16T10:15:00Z', helpful: 9, membershipTier: 'premium', culturalValue: 5, organizationQuality: 4, venueRating: 5, wouldRecommend: true }
        ],
        averageRating: 4.9,
        totalReviews: 18,
        whatToBring: ['Appreciation for Portuguese culture', 'Open heart for Fado emotions', 'Smart casual attire', 'Portuguese language skills (helpful but not required)'],
        dresscode: 'Smart casual, respectful of Portuguese cultural traditions',
        ageRestriction: '18+ for cultural appreciation',
        skillLevel: 'all',
        accessibility: ['Restaurant setting with full accessibility', 'Reserved seating areas', 'Accessible facilities'],
        allowWaitlist: true,
        requiresApproval: false,
        refundPolicy: 'Full refund 48+ hours in advance due to limited seating and food preparation',
        lastBookingTime: '48',
        createdAt: '2025-07-20T12:00:00Z',
        updatedAt: '2025-08-25T14:00:00Z',
        createdBy: 'host-three-lions',
        isRecurring: true,
        recurringPattern: { frequency: 'monthly', interval: 1, daysOfWeek: [6] },
        views: 892,
        favorites: 67,
        shares: 34,
        communityGuidelines: true,
        verifiedEvent: true,
        reportCount: 0
      },
      {
        id: 'casa-madeira-cultural-evening-2025',
        title: 'Noite Cultural at Casa Madeira - Traditional Portuguese Celebration',
        description: 'Under the historic railway arches, Casa Madeira hosts an authentic Portuguese cultural evening with traditional food, live music, and community dancing for all generations.',
        longDescription: 'Uma noite especial na Casa Madeira! Join us under the iconic railway arches at Casa Madeira, one of Little Portugal\'s most beloved community venues, for an evening that brings together all generations of the Portuguese community in London.\n\nCasa Madeira has been the heart of Portuguese social life in London for decades, hosting celebrations where grandparents, parents, and children come together to eat, dance, and enjoy each other\'s company. This traditional Portuguese cultural evening continues that beautiful tradition.\n\nOur evening program includes:\n- Welcome reception with Portuguese appetizers and wine\n- Traditional Portuguese community dinner featuring regional specialties\n- Live Portuguese music with accordion, guitar, and traditional singing\n- Open dancing floor for all ages with traditional Portuguese folk dances\n- Cultural presentations about Portuguese regional traditions\n- Children\'s area with Portuguese games and activities\n- Portuguese language storytelling and poetry corner\n- Community photo exhibition: "Portuguese Families in London"\n\nThe menu celebrates Portuguese regional cuisine:\n- Starters: Selection of Portuguese cheeses, olives, and chouriço\n- Main courses: Bacalhau à Gomes de Sá, rojões à minhota, and vegetarian options\n- Traditional sides: Portuguese rice, roasted vegetables, and salads\n- Desserts: Pastéis de nata, pudim flan, and regional sweets\n- Drinks: Portuguese wines, Super Bock, Sagres, and traditional Portuguese coffee\n\nLive entertainment features the Grupo Folclórico Português de Londres, performing traditional dances from different Portuguese regions including Minho, Douro, and Alentejo. Everyone is welcome to join the dancing - we\'ll teach you the steps!\n\nCasa Madeira\'s unique setting under the railway arches creates an atmospheric venue that perfectly captures the community spirit of Portuguese gatherings. This is where Portuguese families come to maintain their cultural connections while building new friendships in London.\n\nAll ages are welcome - this is a true Portuguese family celebration where children play while adults connect, exactly like the community gatherings that happen throughout Portugal.',
        date: '2025-09-28',
        time: '18:00',
        endTime: '23:30',
        location: 'Casa Madeira',
        address: 'Railway Arches, South Lambeth Road, Stockwell, London SW8',
        coordinates: { lat: 51.4825, lng: -0.1141 },
        category: 'Cultural',
        subcategory: 'Community Events',
        tags: ['Casa Madeira', 'Portuguese community', 'folk dancing', 'all generations', 'railway arches', 'traditional', 'family'],
        hostId: 'host-casa-madeira',
        hostName: 'Casa Madeira Community Centre',
        hostImage: getImageWithFallback('casa-madeira'),
        hostBio: 'Historic Portuguese community venue under the railway arches, hosting authentic Portuguese cultural celebrations for all generations',
        membershipRequired: 'free',
        price: 25,
        currency: 'GBP',
        maxAttendees: 150,
        minAttendees: 40,
        currentAttendees: 89,
        waitlistCount: 12,
        status: 'published',
        featured: true,
        images: [
          'https://images.unsplash.com/photo-1529258283598-8d6fe60b27f4?w=600&h=400&fit=crop&auto=format',
          'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&auto=format',
          'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop&auto=format'
        ],
        photos: [
          { id: 'photo-casa-1', eventId: 'casa-madeira-cultural-evening-2025', url: 'https://images.unsplash.com/photo-1529258283598-8d6fe60b27f4?w=400&h=400&fit=crop&auto=format', caption: 'Community dancing at Casa Madeira', uploadedBy: 'Casa Madeira', uploadedAt: '2025-08-30T21:00:00Z', featured: true },
          { id: 'photo-casa-2', eventId: 'casa-madeira-cultural-evening-2025', url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop&auto=format', caption: 'Three generations celebrating together', uploadedBy: 'Community Photos', uploadedAt: '2025-08-30T20:15:00Z', featured: false }
        ],
        attendees: [
          { id: 'att-casa-1', userId: 'user-casa-1', eventId: 'casa-madeira-cultural-evening-2025', name: 'Manuel Silva', email: 'manuel@example.com', membershipTier: 'free', joinedAt: '2025-08-25T09:00:00Z', status: 'confirmed' },
          { id: 'att-casa-2', userId: 'user-casa-2', eventId: 'casa-madeira-cultural-evening-2025', name: 'Rosa Fernandes', email: 'rosa@example.com', membershipTier: 'core', joinedAt: '2025-08-26T14:30:00Z', status: 'confirmed' },
          { id: 'att-casa-3', userId: 'user-casa-3', eventId: 'casa-madeira-cultural-evening-2025', name: 'Pedro Costa', email: 'pedro@example.com', membershipTier: 'premium', joinedAt: '2025-08-27T11:15:00Z', status: 'confirmed' }
        ],
        waitlist: [
          { id: 'wait-casa-1', userId: 'user-casa-25', eventId: 'casa-madeira-cultural-evening-2025', name: 'Ana Pereira', email: 'ana.p@example.com', membershipTier: 'core', joinedWaitlistAt: '2025-09-01T16:00:00Z', position: 1, notified: false }
        ],
        reviews: [
          { id: 'rev-casa-1', eventId: 'casa-madeira-cultural-evening-2025', userId: 'user-casa-20', reviewerName: 'Teresa M.', rating: 5, comment: 'Exactly what I hoped for! All generations dancing together, authentic Portuguese atmosphere, and my children learned so much about their heritage. Casa Madeira is truly special.', createdAt: '2025-08-31T12:00:00Z', helpful: 8, membershipTier: 'free', culturalValue: 5, organizationQuality: 4, venueRating: 5, wouldRecommend: true }
        ],
        averageRating: 4.7,
        totalReviews: 12,
        whatToBring: ['Portuguese family spirit', 'Comfortable dancing shoes', 'Camera for family photos', 'Children welcome and encouraged'],
        dresscode: 'Casual family-friendly, traditional Portuguese colors welcome',
        ageRestriction: 'All ages welcome - true family celebration',
        skillLevel: 'all',
        accessibility: ['Historic venue with mixed accessibility', 'Family-friendly facilities', 'Children\'s area provided'],
        allowWaitlist: true,
        requiresApproval: false,
        refundPolicy: 'Full refund 24+ hours in advance',
        lastBookingTime: '24',
        createdAt: '2025-08-01T10:00:00Z',
        updatedAt: '2025-09-01T12:00:00Z',
        createdBy: 'host-casa-madeira',
        isRecurring: true,
        recurringPattern: { frequency: 'monthly', interval: 2, daysOfWeek: [6] },
        views: 567,
        favorites: 43,
        shares: 28,
        communityGuidelines: true,
        verifiedEvent: true,
        reportCount: 0
      },

      // AUTHENTIC LITTLE PORTUGAL VENUES & REGIONAL CELEBRATIONS
      {
        id: 'velho-portugal-cultural-night-2025',
        title: 'Noite Portuguesa at Velho Portugal - Authentic Little Portugal Atmosphere',
        description: 'Experience the best Portuguese atmosphere in Little Portugal at Velho Portugal restaurant. Traditional Portuguese dinner with live music, wine tasting, and authentic cultural ambiance.',
        longDescription: 'Bem-vindos ao Velho Portugal! Step into the most authentic Portuguese atmosphere in Little Portugal at Velho Portugal restaurant, where traditional white linen tablecloths, chairs fashioned from port barrels, and a bar with a red tile roof create the perfect setting for an unforgettable Portuguese cultural evening.\n\nVelho Portugal has been serving the Portuguese community with authentic flavors and genuine hospitality, stocked with Portuguese products and beer on tap. Tonight, we transform this beloved neighborhood restaurant into a celebration of Portuguese culture, food, and community.\n\nAuthentic evening program:\n- Welcome reception with Portuguese appetizers and Vinho Verde\n- Traditional Portuguese dinner featuring regional specialties\n- Live Portuguese music including traditional folk songs and contemporary favorites\n- Portuguese wine tasting with selections from Douro, Alentejo, and Vinho Verde regions\n- Cultural storytelling about Portuguese traditions and Little Portugal history\n- Interactive Portuguese language conversation corner\n- Traditional Portuguese card and board games (sueca, dominó)\n- Portuguese poetry and literature sharing\n\nTraditional Portuguese menu:\n- Appetizers: Azeitona, queijo, chouriço, and Portuguese olives\n- Soups: Caldo verde and sopa de pedra\n- Main courses: Bacalhau à Brás, bitoque, and rojões à portuguesa\n- Sides: Portuguese rice, batatas a murro, and seasonal vegetables\n- Desserts: Pastéis de nata, arroz doce, and pudim flan\n- Drinks: Portuguese wines, Super Bock, Sagres, and authentic Portuguese coffee\n\nThe evening celebrates the authentic Portuguese restaurant experience that has made Velho Portugal a cornerstone of Little Portugal\'s dining scene. With its traditional décor and warm Portuguese hospitality, this venue captures the essence of neighborhood restaurants throughout Portugal.\n\nThis is perfect for Portuguese speakers who want to experience genuine Portuguese culture in London, meet fellow Portuguese immigrants and descendants, and enjoy the comfort of authentic Portuguese flavors in a traditional setting.',
        date: '2025-10-12',
        time: '19:00',
        endTime: '23:30',
        location: 'Velho Portugal Restaurant',
        address: 'South Lambeth Road, Stockwell, London SW8',
        coordinates: { lat: 51.4822, lng: -0.1137 },
        category: 'Cultural',
        subcategory: 'Traditional Dining',
        tags: ['Velho Portugal', 'authentic restaurant', 'Portuguese wine', 'Little Portugal', 'traditional décor', 'community'],
        hostId: 'host-velho-portugal',
        hostName: 'Velho Portugal Restaurant',
        hostImage: getImageWithFallback('velho-portugal'),
        hostBio: 'Traditional Portuguese restaurant in Little Portugal offering authentic Portuguese atmosphere with traditional décor and genuine Portuguese hospitality',
        membershipRequired: 'free',
        price: 35,
        currency: 'GBP',
        maxAttendees: 35,
        minAttendees: 15,
        currentAttendees: 28,
        waitlistCount: 5,
        status: 'published',
        featured: true,
        images: [
          'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=400&fit=crop&auto=format',
          'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&auto=format',
          'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop&auto=format'
        ],
        photos: [],
        attendees: [
          { id: 'att-vp-1', userId: 'user-vp-1', eventId: 'velho-portugal-cultural-night-2025', name: 'António Silva', email: 'antonio@example.com', membershipTier: 'free', joinedAt: '2025-09-15T10:00:00Z', status: 'confirmed' },
          { id: 'att-vp-2', userId: 'user-vp-2', eventId: 'velho-portugal-cultural-night-2025', name: 'Manuela Costa', email: 'manuela@example.com', membershipTier: 'core', joinedAt: '2025-09-16T14:30:00Z', status: 'confirmed' }
        ],
        waitlist: [
          { id: 'wait-vp-1', userId: 'user-vp-20', eventId: 'velho-portugal-cultural-night-2025', name: 'Paulo Ferreira', email: 'paulo@example.com', membershipTier: 'core', joinedWaitlistAt: '2025-10-01T16:00:00Z', position: 1, notified: false }
        ],
        reviews: [],
        averageRating: 0,
        totalReviews: 0,
        whatToBring: ['Appetite for authentic Portuguese food', 'Portuguese language skills welcome', 'Traditional Portuguese spirit'],
        dresscode: 'Smart casual, traditional Portuguese colors welcome',
        ageRestriction: '18+ recommended for cultural dining experience',
        skillLevel: 'all',
        accessibility: ['Traditional restaurant setting', 'Limited accessibility in historic venue'],
        allowWaitlist: true,
        requiresApproval: false,
        refundPolicy: 'Full refund 48+ hours in advance due to food preparation',
        lastBookingTime: '48',
        createdAt: '2025-08-20T12:00:00Z',
        updatedAt: '2025-09-20T10:00:00Z',
        createdBy: 'host-velho-portugal',
        isRecurring: true,
        recurringPattern: { frequency: 'monthly', interval: 1, daysOfWeek: [6] },
        views: 234,
        favorites: 18,
        shares: 12,
        communityGuidelines: true,
        verifiedEvent: true,
        reportCount: 0
      },
      {
        id: 'festa-junina-brazilian-2025',
        title: 'Festa Junina Brasileira - Brazilian June Festival in London',
        description: 'Celebrate traditional Brazilian Festa Junina with quadrilha dancing, typical June foods (pamonha, canjica), live forró music, and authentic Brazilian cultural traditions.',
        longDescription: 'Venha celebrar a Festa Junina! Join the vibrant Brazilian community in London for our traditional June celebration, bringing the warmth and joy of Brazilian countryside festivals to the heart of the city.\n\nFesta Junina is one of Brazil\'s most beloved cultural celebrations, originally celebrating the harvest season and honoring Santos Populares (particularly São João). Our London celebration brings together all the traditional elements that make Festa Junina special.\n\nAuthentic Brazilian Festa Junina features:\n- Traditional quadrilha dancing with live caller and accordion music\n- Typical June foods: pamonha, canjica, quentão, pé de moleque, and cocada\n- Live forró and música sertaneja performances by Brazilian musicians\n- Traditional Brazilian games: pescaria, derruba latas, and correio elegante\n- Bonfire ceremony with traditional jumping for good luck\n- Traditional countryside decorations with colorful flags and corn stalks\n- Costume competition for best traditional caipira (countryside) outfit\n- Brazilian countryside market with typical sweets and crafts\n\nTraditional Festa Junina menu:\n- Main dishes: Pamonha, canjica, milho cozido, and traditional Brazilian corn dishes\n- Sweets: Pé de moleque, cocada, doce de abóbora, and quentão (warm spiced drink)\n- Savory options: Pastéis, coxinhas, and traditional Brazilian party foods\n- Drinks: Caipirinha, quentão, vinho quente, and traditional Brazilian sodas\n\nLive entertainment includes authentic forró bands playing traditional northeastern Brazilian music, perfect for dancing the night away. We\'ll also have quadrilha dance lessons for beginners - come learn this charming traditional Brazilian folk dance that brings communities together.\n\nThis celebration is perfect for Brazilian families wanting to share their traditions with their children, Portuguese speakers interested in Brazilian culture, and anyone who loves authentic cultural celebrations with amazing food, music, and community spirit.\n\nTraditional caipira (countryside) costumes are encouraged but not required. Come experience the joy and warmth of Brazilian culture in London!',
        date: '2025-06-21',
        time: '18:30',
        endTime: '01:00',
        location: 'Brazilian Cultural Centre London',
        address: 'Camden Centre, Bidborough Street, London WC1H 9AU',
        coordinates: { lat: 51.5301, lng: -0.1290 },
        category: 'Cultural',
        subcategory: 'Brazilian Festivals',
        tags: ['Festa Junina', 'Brazilian festival', 'quadrilha', 'forró', 'pamonha', 'canjica', 'São João', 'Brazilian culture'],
        hostId: 'host-brazilian-centre',
        hostName: 'Brazilian Cultural Centre London',
        hostImage: getImageWithFallback('brazilian-centre'),
        hostBio: 'Brazilian Cultural Centre promoting authentic Brazilian traditions and celebrations for the Brazilian and Portuguese-speaking community in London',
        membershipRequired: 'free',
        price: 20,
        currency: 'GBP',
        maxAttendees: 200,
        minAttendees: 50,
        currentAttendees: 142,
        waitlistCount: 18,
        status: 'published',
        featured: true,
        images: [
          'https://images.unsplash.com/photo-1529258283598-8d6fe60b27f4?w=600&h=400&fit=crop&auto=format',
          'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop&auto=format',
          'https://images.unsplash.com/photo-1533472842400-c44cb5a7ac01?w=600&h=400&fit=crop&auto=format'
        ],
        photos: [
          { id: 'photo-fj-1', eventId: 'festa-junina-brazilian-2025', url: 'https://images.unsplash.com/photo-1529258283598-8d6fe60b27f4?w=400&h=400&fit=crop&auto=format', caption: 'Quadrilha dancing 2024', uploadedBy: 'Brazilian Centre', uploadedAt: '2024-06-22T22:30:00Z', featured: true },
          { id: 'photo-fj-2', eventId: 'festa-junina-brazilian-2025', url: 'https://images.unsplash.com/photo-1533472842400-c44cb5a7ac01?w=400&h=400&fit=crop&auto=format', caption: 'Traditional Festa Junina decorations', uploadedBy: 'Community Photos', uploadedAt: '2024-06-21T20:00:00Z', featured: false }
        ],
        attendees: [
          { id: 'att-fj-1', userId: 'user-fj-1', eventId: 'festa-junina-brazilian-2025', name: 'Carla Santos', email: 'carla@example.com', membershipTier: 'free', joinedAt: '2025-05-25T09:00:00Z', status: 'confirmed' },
          { id: 'att-fj-2', userId: 'user-fj-2', eventId: 'festa-junina-brazilian-2025', name: 'Roberto Silva', email: 'roberto@example.com', membershipTier: 'core', joinedAt: '2025-05-27T14:30:00Z', status: 'confirmed' },
          { id: 'att-fj-3', userId: 'user-fj-3', eventId: 'festa-junina-brazilian-2025', name: 'Juliana Costa', email: 'juliana@example.com', membershipTier: 'premium', joinedAt: '2025-05-30T11:15:00Z', status: 'confirmed' }
        ],
        waitlist: [
          { id: 'wait-fj-1', userId: 'user-fj-25', eventId: 'festa-junina-brazilian-2025', name: 'Pedro Oliveira', email: 'pedro.o@example.com', membershipTier: 'free', joinedWaitlistAt: '2025-06-10T18:00:00Z', position: 1, notified: false }
        ],
        reviews: [
          { id: 'rev-fj-1', eventId: 'festa-junina-brazilian-2025', userId: 'user-fj-20', reviewerName: 'Fernanda B.', rating: 5, comment: 'Que Festa Junina maravilhosa! Felt exactly like being back in Brazil. The quadrilha was so fun, the pamonha was delicious, and my children learned about their Brazilian heritage. Perfect celebration!', createdAt: '2024-06-22T01:30:00Z', helpful: 14, membershipTier: 'core', culturalValue: 5, organizationQuality: 5, venueRating: 4, wouldRecommend: true }
        ],
        averageRating: 4.8,
        totalReviews: 23,
        whatToBring: ['Caipira costume (optional)', 'Brazilian party spirit', 'Comfortable dancing shoes', 'Camera for family photos'],
        dresscode: 'Traditional caipira (countryside) costumes encouraged, casual festive wear otherwise',
        ageRestriction: 'Family-friendly, all ages welcome',
        skillLevel: 'all',
        accessibility: ['Community centre with full accessibility', 'Family-friendly facilities', 'Accessible parking available'],
        allowWaitlist: true,
        requiresApproval: false,
        refundPolicy: 'Full refund 24+ hours in advance',
        lastBookingTime: '24',
        createdAt: '2025-04-15T12:00:00Z',
        updatedAt: '2025-06-05T10:00:00Z',
        createdBy: 'host-brazilian-centre',
        isRecurring: true,
        recurringPattern: { frequency: 'yearly', interval: 1, customDates: ['2025-06-21', '2026-06-20', '2027-06-26'] },
        views: 1456,
        favorites: 98,
        shares: 67,
        communityGuidelines: true,
        verifiedEvent: true,
        reportCount: 0
      },
      {
        id: 'cape-verde-morna-night-2025',
        title: 'Noite de Morna - Cape Verdean Music & Cultural Evening',
        description: 'Celebrate Cape Verdean culture with traditional morna and coladeira music, authentic Cape Verdean cuisine (cachupa, grogue), and stories of Cape Verdean heritage in London.',
        longDescription: 'Bem-vindos à nossa Noite de Morna! Join us for an authentic Cape Verdean cultural evening celebrating the beautiful music, rich traditions, and warm community spirit of Cape Verde in London.\n\nThis evening honors the musical heritage of Cape Verde, featuring the soulful morna - Cape Verde\'s national music genre that expresses the deep emotions of saudade, love, and longing. Like Portuguese Fado, morna captures the Cape Verdean soul and tells stories of island life, emigration, and hope.\n\nAuthentic Cape Verdean cultural experience:\n- Live morna and coladeira performances by Cape Verdean musicians in London\n- Traditional Cape Verdean dinner featuring cachupa (national dish), pastéis, and grogue tasting\n- Cultural presentations about Cape Verdean history, music, and traditions\n- Cape Verdean Creole language corner for learning basic phrases\n- Traditional Cape Verdean crafts and artifacts exhibition\n- Interactive sessions about Cape Verdean immigration to London\n- Community storytelling: Cape Verdean families share their journey to London\n- Traditional Cape Verdean dance lessons (coladeira and funana)\n\nTraditional Cape Verdean menu:\n- Appetizers: Pastéis de milho, bolinhos de mandioca, and Cape Verdean olives\n- Main course: Traditional cachupa rica with linguiça, beans, corn, and vegetables\n- Sides: Rice, fried plantains, and Cape Verdean-style vegetables\n- Desserts: Doce de coco, pudim de leite, and traditional Cape Verdean sweets\n- Drinks: Grogue (Cape Verdean sugarcane spirit), Strela beer, and ponche\n\nLive musical performances feature authentic Cape Verdean musicians performing classic mornas including songs by Cesária Évora, the "Barefoot Diva" who brought Cape Verdean music to the world. We\'ll also hear contemporary Cape Verdean music and learn about how morna and coladeira continue to evolve.\n\nThis evening provides a wonderful opportunity for Cape Verdean families to celebrate their heritage, for Portuguese speakers to learn about Cape Verdean culture, and for anyone interested in authentic African-Portuguese cultural fusion.\n\nThe Cape Verdean community in London has rich cultural traditions, and this event celebrates the unique blend of African and Portuguese influences that make Cape Verdean culture so distinctive within the broader Portuguese-speaking world.',
        date: '2025-07-19',
        time: '19:30',
        endTime: '23:30',
        location: 'Oval Community Centre',
        address: '52 Brixton Road, London SW9 6BU',
        coordinates: { lat: 51.4816, lng: -0.1073 },
        category: 'Cultural',
        subcategory: 'Cape Verdean Music',
        tags: ['Cape Verde', 'morna', 'coladeira', 'cachupa', 'grogue', 'African-Portuguese', 'Cesária Évora', 'traditional music'],
        hostId: 'host-cape-verdean-association',
        hostName: 'Cape Verdean Association London',
        hostImage: getImageWithFallback('cape-verde-flag'),
        hostBio: 'Cape Verdean cultural organization promoting Cape Verdean heritage, music, and traditions within London\'s Portuguese-speaking community',
        membershipRequired: 'free',
        price: 30,
        currency: 'GBP',
        maxAttendees: 80,
        minAttendees: 25,
        currentAttendees: 54,
        waitlistCount: 9,
        status: 'published',
        featured: true,
        images: [
          'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop&auto=format',
          'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&auto=format',
          'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=400&fit=crop&auto=format'
        ],
        photos: [
          { id: 'photo-cv-1', eventId: 'cape-verde-morna-night-2025', url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&auto=format', caption: 'Morna performance 2024', uploadedBy: 'Cape Verdean Association', uploadedAt: '2024-07-20T22:00:00Z', featured: true }
        ],
        attendees: [
          { id: 'att-cv-1', userId: 'user-cv-1', eventId: 'cape-verde-morna-night-2025', name: 'Maria Évora', email: 'maria.evora@example.com', membershipTier: 'core', joinedAt: '2025-06-20T10:00:00Z', status: 'confirmed' },
          { id: 'att-cv-2', userId: 'user-cv-2', eventId: 'cape-verde-morna-night-2025', name: 'José Tavares', email: 'jose.tavares@example.com', membershipTier: 'free', joinedAt: '2025-06-22T15:30:00Z', status: 'confirmed' }
        ],
        waitlist: [
          { id: 'wait-cv-1', userId: 'user-cv-15', eventId: 'cape-verde-morna-night-2025', name: 'Cesária Silva', email: 'cesaria@example.com', membershipTier: 'premium', joinedWaitlistAt: '2025-07-10T12:00:00Z', position: 1, notified: false }
        ],
        reviews: [
          { id: 'rev-cv-1', eventId: 'cape-verde-morna-night-2025', userId: 'user-cv-10', reviewerName: 'António T.', rating: 5, comment: 'Beautiful celebration of Cape Verdean culture! The morna performances were moving and the cachupa was authentic. Learned so much about Cape Verdean traditions. Excellent cultural evening.', createdAt: '2024-07-20T23:45:00Z', helpful: 7, membershipTier: 'core', culturalValue: 5, organizationQuality: 4, venueRating: 4, wouldRecommend: true }
        ],
        averageRating: 4.6,
        totalReviews: 8,
        whatToBring: ['Open mind for Cape Verdean culture', 'Comfortable seating attire', 'Appreciation for traditional music'],
        dresscode: 'Smart casual, Cape Verdean colors (blue and white) welcome',
        ageRestriction: 'All ages welcome, children encouraged to learn about heritage',
        skillLevel: 'all',
        accessibility: ['Community centre with full accessibility', 'Accessible parking and facilities'],
        allowWaitlist: true,
        requiresApproval: false,
        refundPolicy: 'Full refund 48+ hours in advance due to food preparation',
        lastBookingTime: '48',
        createdAt: '2025-05-15T12:00:00Z',
        updatedAt: '2025-07-01T10:00:00Z',
        createdBy: 'host-cape-verdean-association',
        isRecurring: true,
        recurringPattern: { frequency: 'quarterly', interval: 3, daysOfWeek: [6] },
        views: 387,
        favorites: 29,
        shares: 18,
        communityGuidelines: true,
        verifiedEvent: true,
        reportCount: 0
      }
    ]
    
    this.rsvps = [
      { id: 'rsvp-1', eventId: 'event-1', userId: 'user-1', status: 'confirmed', createdAt: '2024-01-15T10:00:00Z' },
      { id: 'rsvp-2', eventId: 'event-2', userId: 'user-3', status: 'confirmed', createdAt: '2024-01-22T09:00:00Z' },
      { id: 'rsvp-3', eventId: 'event-3', userId: 'user-4', status: 'confirmed', createdAt: '2024-01-18T15:00:00Z' },
      { id: 'rsvp-pt-1', eventId: 'event-pt-1', userId: 'user-pt-1', status: 'confirmed', createdAt: '2025-08-10T14:00:00Z' },
      { id: 'rsvp-pt-2', eventId: 'event-pt-1', userId: 'user-pt-2', status: 'confirmed', createdAt: '2025-08-11T16:30:00Z' },
      { id: 'rsvp-pt-3', eventId: 'event-pt-2', userId: 'user-pt-3', status: 'confirmed', createdAt: '2025-08-12T11:00:00Z' },
      { id: 'rsvp-pt-4', eventId: 'event-pt-3', userId: 'user-pt-4', status: 'confirmed', createdAt: '2025-08-09T13:00:00Z' },
      { id: 'rsvp-pt-5', eventId: 'event-pt-3', userId: 'user-pt-5', status: 'confirmed', createdAt: '2025-08-10T19:20:00Z' },
      { id: 'rsvp-pt-6', eventId: 'event-pt-4', userId: 'user-pt-6', status: 'confirmed', createdAt: '2025-08-08T20:00:00Z' },
      { id: 'rsvp-pt-7', eventId: 'event-pt-4', userId: 'user-pt-7', status: 'confirmed', createdAt: '2025-08-09T10:30:00Z' },
      { id: 'rsvp-pt-8', eventId: 'event-pt-5', userId: 'user-pt-8', status: 'confirmed', createdAt: '2025-08-07T14:20:00Z' },
      { id: 'rsvp-pt-9', eventId: 'event-pt-5', userId: 'user-pt-9', status: 'confirmed', createdAt: '2025-08-08T16:45:00Z' },
      { id: 'rsvp-pt-10', eventId: 'event-pt-6', userId: 'user-pt-10', status: 'confirmed', createdAt: '2025-08-10T09:30:00Z' }
    ]
  }

  // Event CRUD operations
  async getEvents(filters?: EventFilters, sort?: EventSortOptions): Promise<Event[]> {
    let filteredEvents = [...this.events]

    if (filters) {
      // Category filter
      if (filters.category) {
        filteredEvents = filteredEvents.filter(e => e.category === filters.category)
      }
      
      // Subcategory filter
      if (filters.subcategory) {
        filteredEvents = filteredEvents.filter(e => e.subcategory === filters.subcategory)
      }
      
      // Membership level filter
      if (filters.membershipLevel) {
        const tierLevels = { free: 0, core: 1, premium: 2 }
        const userLevel = tierLevels[filters.membershipLevel]
        filteredEvents = filteredEvents.filter(e => tierLevels[e.membershipRequired] <= userLevel)
      }
      
      // Search query filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase()
        filteredEvents = filteredEvents.filter(e => 
          e.title.toLowerCase().includes(query) ||
          e.description.toLowerCase().includes(query) ||
          e.location.toLowerCase().includes(query) ||
          e.address.toLowerCase().includes(query) ||
          e.tags.some(tag => tag.toLowerCase().includes(query)) ||
          e.hostName.toLowerCase().includes(query)
        )
      }
      
      // Date range filter
      if (filters.dateRange) {
        filteredEvents = filteredEvents.filter(e => {
          const eventDate = new Date(e.date)
          const start = new Date(filters.dateRange!.start)
          const end = new Date(filters.dateRange!.end)
          return eventDate >= start && eventDate <= end
        })
      }
      
      // Price range filter
      if (filters.priceRange) {
        filteredEvents = filteredEvents.filter(e => 
          e.price >= filters.priceRange!.min && e.price <= filters.priceRange!.max
        )
      }
      
      // Availability filter
      if (filters.availability) {
        if (filters.availability === 'available') {
          filteredEvents = filteredEvents.filter(e => e.currentAttendees < e.maxAttendees)
        } else if (filters.availability === 'waitlist') {
          filteredEvents = filteredEvents.filter(e => e.currentAttendees >= e.maxAttendees && e.allowWaitlist)
        }
      }
      
      // Featured filter
      if (filters.featured !== undefined) {
        filteredEvents = filteredEvents.filter(e => e.featured === filters.featured)
      }
      
      // Verified filter
      if (filters.verified !== undefined) {
        filteredEvents = filteredEvents.filter(e => e.verifiedEvent === filters.verified)
      }
      
      // Skill level filter
      if (filters.skillLevel && filters.skillLevel !== 'all') {
        filteredEvents = filteredEvents.filter(e => e.skillLevel === filters.skillLevel || e.skillLevel === 'all')
      }
      
      // Time of day filter
      if (filters.timeOfDay && filters.timeOfDay !== 'all') {
        filteredEvents = filteredEvents.filter(e => {
          const hour = parseInt(e.time.split(':')[0])
          if (filters.timeOfDay === 'morning') return hour < 12
          if (filters.timeOfDay === 'afternoon') return hour >= 12 && hour < 17
          if (filters.timeOfDay === 'evening') return hour >= 17
          return true
        })
      }
      
      // Day of week filter
      if (filters.dayOfWeek && filters.dayOfWeek !== 'all') {
        filteredEvents = filteredEvents.filter(e => {
          const dayOfWeek = new Date(e.date).getDay()
          if (filters.dayOfWeek === 'weekend') return dayOfWeek === 0 || dayOfWeek === 6
          if (filters.dayOfWeek === 'weekday') return dayOfWeek >= 1 && dayOfWeek <= 5
          return true
        })
      }
      
      // Tags filter
      if (filters.tags && filters.tags.length > 0) {
        filteredEvents = filteredEvents.filter(e => 
          filters.tags!.some(tag => e.tags.includes(tag))
        )
      }
      
      // Accessibility filter
      if (filters.accessibility && filters.accessibility.length > 0) {
        filteredEvents = filteredEvents.filter(e => 
          filters.accessibility!.some(accessibilityFeature => 
            e.accessibility?.includes(accessibilityFeature)
          )
        )
      }
      
      // Area filter (extract from address)
      if (filters.area) {
        filteredEvents = filteredEvents.filter(e => 
          e.address.toLowerCase().includes(filters.area!.toLowerCase())
        )
      }
    }

    // Apply sorting
    if (sort) {
      filteredEvents.sort((a, b) => {
        let comparison = 0
        switch (sort.field) {
          case 'date':
            comparison = new Date(a.date).getTime() - new Date(b.date).getTime()
            break
          case 'popularity':
            comparison = (b.currentAttendees + b.favorites) - (a.currentAttendees + a.favorites)
            break
          case 'rating':
            comparison = b.averageRating - a.averageRating
            break
          case 'price':
            comparison = a.price - b.price
            break
          case 'created':
            comparison = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            break
          case 'alphabetical':
            comparison = a.title.localeCompare(b.title)
            break
        }
        return sort.direction === 'desc' ? -comparison : comparison
      })
    }

    return filteredEvents
  }

  private transformEvent(rawEvent: any, profile?: any): Event {
    return {
      id: rawEvent.id,
      title: rawEvent.title,
      description: rawEvent.description || '',
      longDescription: rawEvent.description || '',
      date: rawEvent.start_datetime ? new Date(rawEvent.start_datetime).toISOString().split('T')[0] : '',
      time: rawEvent.start_datetime ? new Date(rawEvent.start_datetime).toTimeString().slice(0, 5) : '',
      endTime: rawEvent.end_datetime ? new Date(rawEvent.end_datetime).toTimeString().slice(0, 5) : '',
      location: rawEvent.location || '',
      category: 'General', // Default category
      address: rawEvent.location || '',
      tags: rawEvent.tags || [],
      hostId: rawEvent.created_by || '',
      hostName: profile ? `${profile.first_name} ${profile.last_name || ''}`.trim() : 'AdyaTribe',
      hostImage: profile?.profile_picture_url || '',
      hostBio: profile?.bio || 'Event organized by AdyaTribe',
      price: rawEvent.price || 0,
      currency: rawEvent.currency || 'GBP',
      maxAttendees: rawEvent.max_attendees || 20,
      currentAttendees: rawEvent.current_attendees || 0,
      waitlistCount: 0,
      status: rawEvent.status || 'published',
      featured: rawEvent.is_featured || false,
      images: rawEvent.image_url ? [rawEvent.image_url] : [],
      photos: [],
      attendees: [],
      waitlist: [],
      reviews: [],
      averageRating: 0,
      totalReviews: 0,
      membershipRequired: 'free' as const,
      whatToBring: [],
      refundPolicy: '',
      lastBookingTime: '',
      createdAt: rawEvent.created_at || new Date().toISOString(),
      updatedAt: rawEvent.updated_at || new Date().toISOString(),
      createdBy: rawEvent.created_by || '',
      isRecurring: false,
      views: 0,
      favorites: 0,
      shares: 0,
      communityGuidelines: true,
      verifiedEvent: true,
      reportCount: 0,
      allowWaitlist: true,
      requiresApproval: false
    }
  }

    async getEventById(id: string): Promise<Event | null> {
    try {
      // First try Supabase if properly configured
      if (supabaseUrl !== 'https://placeholder.supabase.co' && supabaseAnonKey !== 'placeholder-key') {
        const { data: event, error } = await supabase
          .from('events')
          .select(`
            *,
            profiles!events_created_by_fkey(
              first_name,
              last_name,
              profile_picture_url,
              bio
            ),
            event_attendees(
              user_id,
              status,
              registered_at,
              profiles(
                first_name,
                last_name,
                profile_picture_url,
                membership_tier
              )
            )
          `)
          .eq('id', id)
          .single()

        if (!error && event) {
          // Transform event and include attendee information
          const transformedEvent = this.transformEvent(event, event.profiles)
          
          // Add attendee information
          if (event.event_attendees) {
            transformedEvent.attendees = event.event_attendees.map((attendee: any) => ({
              id: `att-${attendee.user_id}`,
              userId: attendee.user_id,
              eventId: id,
              name: `${attendee.profiles.first_name} ${attendee.profiles.last_name || ''}`.trim(),
              email: '', // Not exposed for privacy
              membershipTier: attendee.profiles.membership_tier,
              joinedAt: attendee.registered_at,
              status: attendee.status as 'confirmed' | 'pending' | 'cancelled'
            }))
          }

          return transformedEvent
        }
      }
      
      // Fallback to mock data when Supabase is not available
      console.log('Supabase not configured, using mock data for event:', id)
      const mockEvent = this.events.find(e => e.id === id)
      
      if (mockEvent) {
        // Create a deep copy to avoid modifying the original mock data
        return JSON.parse(JSON.stringify(mockEvent))
      }
      
      console.warn(`Event with ID ${id} not found in mock data`)
      return null
    } catch (error) {
      console.error('Error in getEventById:', error)
      
      // Final fallback - try mock data even after error
      const mockEvent = this.events.find(e => e.id === id)
      if (mockEvent) {
        console.log('Returning mock event after error:', id)
        return JSON.parse(JSON.stringify(mockEvent))
      }
      
      return null
    }
  }

  async createEvent(eventData: Partial<Event>, userId: string): Promise<Event | null> {
    try {
      // Convert UI event data to Supabase format
      const startDateTime = eventData.date && eventData.time 
        ? new Date(`${eventData.date}T${eventData.time}:00Z`).toISOString()
        : new Date().toISOString()
      
      const endDateTime = eventData.date && eventData.endTime
        ? new Date(`${eventData.date}T${eventData.endTime}:00Z`).toISOString()
        : new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString() // 2 hours later

      const { data: event, error } = await supabase
        .from('events')
        .insert({
          title: eventData.title || '',
          description: eventData.description || '',
          event_type: 'in_person', // Default to in-person
          location: eventData.location || '',
          start_datetime: startDateTime,
          end_datetime: endDateTime,
          max_attendees: eventData.maxAttendees || 20,
          price: eventData.price || 0,
          currency: eventData.currency || 'GBP',
          created_by: userId,
          is_featured: eventData.featured || false,
          status: 'active',
          tags: eventData.tags || []
        })
        .select(`
          *,
          profiles!events_created_by_fkey(
            first_name,
            last_name,
            profile_picture_url,
            bio
          )
        `)
        .single()

      if (error) {
        console.error('Error creating event:', error)
        return null
      }

      return this.transformEvent(event, event.profiles)
    } catch (error) {
      console.error('Error in createEvent:', error)
      return null
    }
  }

  async rsvpToEvent(eventId: string, userId: string, userData: Partial<User>): Promise<{ success: boolean; status: 'confirmed' | 'waitlist'; message: string }> {
    const event = await this.getEventById(eventId)
    if (!event) {
      return { success: false, status: 'confirmed', message: 'Event not found' }
    }

    // Check if already RSVP'd
    const existingRSVP = this.rsvps.find(r => r.eventId === eventId && r.userId === userId)
    if (existingRSVP) {
      return { success: false, status: 'confirmed', message: 'Already registered for this event' }
    }

    // Check membership requirements
    if (!this.canAccessEvent(event.membershipRequired, userData.membershipTier || 'free')) {
      return { success: false, status: 'confirmed', message: 'Membership upgrade required' }
    }

    let status: 'confirmed' | 'waitlist' = 'confirmed'
    let message = 'Successfully registered for event!'

    // Check availability
    if (event.currentAttendees >= event.maxAttendees) {
      if (event.allowWaitlist) {
        status = 'waitlist'
        message = 'Added to waitlist - you\'ll be notified if a spot opens up!'
        
        // Add to waitlist
        const waitlistEntry: WaitlistEntry = {
          id: `wait-${Date.now()}`,
          userId,
          eventId,
          name: userData.name || '',
          email: userData.email || '',
          membershipTier: userData.membershipTier || 'free',
          joinedWaitlistAt: new Date().toISOString(),
          position: event.waitlist.length + 1,
          notified: false
        }
        event.waitlist.push(waitlistEntry)
        event.waitlistCount++
      } else {
        return { success: false, status: 'confirmed', message: 'Event is full and waitlist is not available' }
      }
    } else {
      // Add to attendees
      const attendee: EventAttendee = {
        id: `attendee-${Date.now()}`,
        userId,
        eventId,
        name: userData.name || '',
        email: userData.email || '',
        profileImage: userData.profileImage,
        membershipTier: userData.membershipTier || 'free',
        joinedAt: new Date().toISOString(),
        status: 'confirmed'
      }
      event.attendees.push(attendee)
      event.currentAttendees++
    }

    // Create RSVP record
    const rsvp: RSVP = {
      id: `rsvp-${Date.now()}`,
      eventId,
      userId,
      status,
      createdAt: new Date().toISOString()
    }
    this.rsvps.push(rsvp)

    return { success: true, status, message }
  }

  async cancelRSVP(eventId: string, userId: string): Promise<{ success: boolean; message: string }> {
    try {
      // Remove the RSVP
      const { error: deleteError } = await supabase
        .from('event_attendees')
        .delete()
        .eq('event_id', eventId)
        .eq('user_id', userId)

      if (deleteError) {
        console.error('Error cancelling RSVP:', deleteError)
        return { success: false, message: 'Failed to cancel RSVP' }
      }

      // Update event attendee count
      const { data: event } = await supabase
        .from('events')
        .select('current_attendee_count')
        .eq('id', eventId)
        .single()

      if (event && event.current_attendee_count > 0) {
        await supabase
          .from('events')
          .update({ current_attendee_count: event.current_attendee_count - 1 })
          .eq('id', eventId)
      }

      return { success: true, message: 'RSVP cancelled successfully' }
    } catch (error) {
      console.error('Error in cancelRSVP:', error)
      return { success: false, message: 'Failed to cancel RSVP' }
    }
  }

  async addReview(eventId: string, userId: string, reviewData: { 
    rating: number; 
    comment: string; 
    reviewerName: string; 
    membershipTier: string;
    culturalValue?: number;
    organizationQuality?: number;
    venueRating?: number;
    wouldRecommend?: boolean;
    anonymous?: boolean;
  }): Promise<{ success: boolean; message: string }> {
    try {
      // For demo purposes, we'll check if user has RSVP'd instead of attended
      const userRSVPs = await this.getUserRSVPs(userId)
      const hasRSVP = userRSVPs.some(rsvp => rsvp.eventId === eventId && rsvp.status === 'confirmed')
      
      if (!hasRSVP) {
        return { success: false, message: 'You must RSVP to an event to review it' }
      }

      // Find the event and check if user already reviewed
      const event = this.events.find(e => e.id === eventId)
      if (!event) {
        return { success: false, message: 'Event not found' }
      }

      const existingReview = event.reviews.find(r => r.userId === userId)
      if (existingReview) {
        return { success: false, message: 'You have already reviewed this event' }
      }

      // Create new review
      const newReview: EventReview = {
        id: `rev-${Date.now()}`,
        eventId,
        userId,
        reviewerName: reviewData.reviewerName,
        rating: reviewData.rating,
        comment: reviewData.comment,
        createdAt: new Date().toISOString(),
        helpful: 0,
        membershipTier: reviewData.membershipTier as 'free' | 'core' | 'premium',
        culturalValue: reviewData.culturalValue,
        organizationQuality: reviewData.organizationQuality,
        venueRating: reviewData.venueRating,
        wouldRecommend: reviewData.wouldRecommend,
        anonymous: reviewData.anonymous,
        moderated: false,
        reported: false,
        verified: false
      }

      // Add review to event
      event.reviews.push(newReview)
      event.totalReviews = event.reviews.length

      // Recalculate average rating
      const totalRating = event.reviews.reduce((sum, review) => sum + review.rating, 0)
      event.averageRating = totalRating / event.reviews.length

      return { success: true, message: 'Review added successfully' }
    } catch (error) {
      console.error('Error adding review:', error)
      return { success: false, message: 'Failed to add review' }
    }
  }

  async getEventReviews(eventId: string, options?: {
    limit?: number;
    offset?: number;
    sortBy?: 'date' | 'rating' | 'helpful';
    sortOrder?: 'asc' | 'desc';
    filterByRating?: number;
  }): Promise<EventReview[]> {
    const event = this.events.find(e => e.id === eventId)
    if (!event) return []

    let reviews = [...event.reviews]

    // Apply rating filter
    if (options?.filterByRating) {
      reviews = reviews.filter(r => r.rating === options.filterByRating)
    }

    // Apply sorting
    if (options?.sortBy) {
      reviews.sort((a, b) => {
        let comparison = 0
        switch (options.sortBy) {
          case 'date':
            comparison = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            break
          case 'rating':
            comparison = b.rating - a.rating
            break
          case 'helpful':
            comparison = b.helpful - a.helpful
            break
        }
        return options.sortOrder === 'asc' ? -comparison : comparison
      })
    }

    // Apply pagination
    if (options?.limit || options?.offset) {
      const start = options?.offset || 0
      const end = start + (options?.limit || reviews.length)
      reviews = reviews.slice(start, end)
    }

    return reviews
  }

  async markReviewHelpful(reviewId: string, userId: string): Promise<{ success: boolean; message: string }> {
    try {
      // Find the review across all events
      for (const event of this.events) {
        const review = event.reviews.find(r => r.id === reviewId)
        if (review) {
          // In a real implementation, you'd track which users found reviews helpful
          // For demo purposes, just increment the counter
          review.helpful++
          return { success: true, message: 'Marked as helpful' }
        }
      }
      return { success: false, message: 'Review not found' }
    } catch (error) {
      console.error('Error marking review helpful:', error)
      return { success: false, message: 'Failed to mark review as helpful' }
    }
  }

  async reportReview(reviewId: string, userId: string, reason: string): Promise<{ success: boolean; message: string }> {
    try {
      // Find the review across all events
      for (const event of this.events) {
        const review = event.reviews.find(r => r.id === reviewId)
        if (review) {
          review.reported = true
          // In a real implementation, you'd create a report record
          return { success: true, message: 'Review reported for moderation' }
        }
      }
      return { success: false, message: 'Review not found' }
    } catch (error) {
      console.error('Error reporting review:', error)
      return { success: false, message: 'Failed to report review' }
    }
  }

  async getEventAnalytics(eventId: string): Promise<{
    totalReviews: number;
    averageRating: number;
    ratingDistribution: { [key: number]: number };
    culturalValueAverage: number;
    organizationAverage: number;
    venueAverage: number;
    recommendationPercentage: number;
    membershipTierBreakdown: { [key: string]: number };
    monthlyTrends: Array<{ month: string; rating: number; count: number }>;
  } | null> {
    const event = this.events.find(e => e.id === eventId)
    if (!event || !event.reviews.length) return null

    const reviews = event.reviews

    // Rating distribution
    const ratingDistribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    reviews.forEach(review => {
      ratingDistribution[review.rating]++
    })

    // Cultural metrics
    const culturalReviews = reviews.filter(r => r.culturalValue)
    const culturalValueAverage = culturalReviews.length > 0 
      ? culturalReviews.reduce((sum, r) => sum + (r.culturalValue || 0), 0) / culturalReviews.length
      : 0

    const organizationReviews = reviews.filter(r => r.organizationQuality)
    const organizationAverage = organizationReviews.length > 0
      ? organizationReviews.reduce((sum, r) => sum + (r.organizationQuality || 0), 0) / organizationReviews.length
      : 0

    const venueReviews = reviews.filter(r => r.venueRating)
    const venueAverage = venueReviews.length > 0
      ? venueReviews.reduce((sum, r) => sum + (r.venueRating || 0), 0) / venueReviews.length
      : 0

    // Recommendation percentage
    const recommendReviews = reviews.filter(r => r.wouldRecommend !== undefined)
    const recommendationPercentage = recommendReviews.length > 0
      ? (recommendReviews.filter(r => r.wouldRecommend).length / recommendReviews.length) * 100
      : 0

    // Membership tier breakdown
    const membershipTierBreakdown: { [key: string]: number } = { free: 0, core: 0, premium: 0 }
    reviews.forEach(review => {
      membershipTierBreakdown[review.membershipTier]++
    })

    // Monthly trends (simplified for demo)
    const monthlyTrends = this.calculateMonthlyTrends(reviews)

    return {
      totalReviews: reviews.length,
      averageRating: event.averageRating,
      ratingDistribution,
      culturalValueAverage,
      organizationAverage,
      venueAverage,
      recommendationPercentage,
      membershipTierBreakdown,
      monthlyTrends
    }
  }

  private calculateMonthlyTrends(reviews: EventReview[]): Array<{ month: string; rating: number; count: number }> {
    const monthlyData: { [key: string]: { ratings: number[], count: number } } = {}
    
    reviews.forEach(review => {
      const date = new Date(review.createdAt)
      const monthKey = date.toISOString().slice(0, 7) // YYYY-MM format
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { ratings: [], count: 0 }
      }
      
      monthlyData[monthKey].ratings.push(review.rating)
      monthlyData[monthKey].count++
    })

    return Object.entries(monthlyData)
      .map(([month, data]) => ({
        month,
        rating: data.ratings.reduce((sum, rating) => sum + rating, 0) / data.ratings.length,
        count: data.count
      }))
      .sort((a, b) => a.month.localeCompare(b.month))
  }

  private canAccessEvent(eventRequirement: string, userTier: string): boolean {
    const tierLevels = { free: 0, core: 1, premium: 2 }
    return tierLevels[userTier as keyof typeof tierLevels] >= tierLevels[eventRequirement as keyof typeof tierLevels]
  }

  async getUserRSVPs(userId: string): Promise<RSVP[]> {
    return this.rsvps.filter(r => r.userId === userId)
  }

  async getUserEvents(userId: string): Promise<Event[]> {
    return this.events.filter(e => e.hostId === userId)
  }
}

// Export singleton instance
export const eventService = EventService.getInstance()