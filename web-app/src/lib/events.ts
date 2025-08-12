'use client'

import { User } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
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
  ageRestriction?: string
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
        id: 'event-1',
        title: 'Sunday Brunch & Book Club',
        description: 'Join our monthly book club for a delightful brunch and discussion of "The Seven Husbands of Evelyn Hugo"',
        longDescription: 'Our monthly book club combines the best of both worlds - delicious brunch and stimulating literary discussion. This month we\'re exploring Taylor Jenkins Reid\'s captivating novel "The Seven Husbands of Evelyn Hugo". Come hungry for both food and conversation!\n\nWe meet at the beautiful Ivy Chelsea Garden, known for its stunning interior and excellent brunch menu. The first hour is dedicated to socializing over mimosas and eggs benedict, followed by an engaging discussion about the book.\n\nWhether you\'re a seasoned book club member or new to literary discussions, you\'ll find a warm welcome. Our group of 8-12 women represents diverse backgrounds and perspectives, making for rich conversations.',
        date: '2024-01-28',
        time: '11:00',
        endTime: '13:00',
        location: 'The Ivy Chelsea Garden',
        address: '197 King\'s Road, Chelsea, London SW3 5EQ',
        coordinates: { lat: 51.4876, lng: -0.1697 },
        category: 'Books & Reading',
        subcategory: 'Book Clubs',
        tags: ['book club', 'brunch', 'Chelsea', 'discussion', 'literature'],
        hostId: 'host-sarah',
        hostName: 'Sarah Chen',
        hostImage: getImageWithFallback('emma-wilson'),
        hostBio: 'Literature enthusiast and event organizer with 5+ years running book clubs',
        membershipRequired: 'core',
        price: 35,
        currency: 'GBP',
        maxAttendees: 10,
        minAttendees: 4,
        currentAttendees: 6,
        waitlistCount: 2,
        status: 'published',
        featured: true,
        images: [
          'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=600&h=400&fit=crop&auto=format',
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&auto=format'
        ],
        photos: [
          {
            id: 'photo-1',
            eventId: 'event-1',
            url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&auto=format',
            caption: 'Book club members enjoying brunch and literary discussion',
            uploadedBy: 'Sarah Chen',
            uploadedAt: '2024-01-15T13:00:00Z',
            featured: true
          },
          {
            id: 'photo-2', 
            eventId: 'event-1',
            url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&auto=format',
            caption: 'Animated discussion about character development',
            uploadedBy: 'Emma Johnson',
            uploadedAt: '2024-01-15T13:30:00Z',
            featured: false
          },
          {
            id: 'photo-3',
            eventId: 'event-1', 
            url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&auto=format',
            caption: 'Perfect venue with amazing company',
            uploadedBy: 'Lisa Wang',
            uploadedAt: '2024-01-15T14:00:00Z',
            featured: false
          }
        ],
        attendees: [
          { id: 'att-1', userId: 'user-1', eventId: 'event-1', name: 'Emma Johnson', email: 'emma@example.com', membershipTier: 'core', joinedAt: '2024-01-15T10:00:00Z', status: 'confirmed' },
          { id: 'att-2', userId: 'user-2', eventId: 'event-1', name: 'Lisa Wang', email: 'lisa@example.com', membershipTier: 'premium', joinedAt: '2024-01-16T14:30:00Z', status: 'confirmed' }
        ],
        waitlist: [
          { id: 'wait-1', userId: 'user-10', eventId: 'event-1', name: 'Hannah Green', email: 'hannah@example.com', membershipTier: 'core', joinedWaitlistAt: '2024-01-20T09:00:00Z', position: 1, notified: false }
        ],
        reviews: [
          { id: 'rev-1', eventId: 'event-1', userId: 'user-1', reviewerName: 'Emma J.', rating: 5, comment: 'Fantastic discussion and lovely venue! Already looking forward to next month.', createdAt: '2024-01-10T16:00:00Z', helpful: 3, membershipTier: 'core' }
        ],
        averageRating: 4.8,
        totalReviews: 8,
        whatToBring: ['The book (or detailed notes)', 'Appetite for delicious food'],
        dresscode: 'Smart casual',
        ageRestriction: '30+',
        skillLevel: 'all',
        accessibility: ['Step-free access', 'Accessible toilet facilities'],
        allowWaitlist: true,
        requiresApproval: false,
        refundPolicy: 'Full refund 48h+ in advance, 50% refund 24-48h before',
        lastBookingTime: '24',
        createdAt: '2024-01-01T10:00:00Z',
        updatedAt: '2024-01-20T15:30:00Z',
        createdBy: 'host-sarah',
        isRecurring: true,
        recurringPattern: { frequency: 'monthly', interval: 1, daysOfWeek: [0] },
        views: 234,
        favorites: 18,
        shares: 7,
        communityGuidelines: true,
        verifiedEvent: true,
        reportCount: 0
      },
      {
        id: 'event-2',
        title: 'Thames Path Walking Group',
        description: 'Scenic 5-mile walk from Westminster to Tower Bridge with coffee stop',
        longDescription: 'Join our friendly walking group for a beautiful 5-mile journey along the Thames Path. We\'ll start at Westminster Bridge and end at Tower Bridge, taking in some of London\'s most iconic sights along the way.\n\nThis is a moderate-paced walk suitable for all fitness levels. We make several stops for photos, rest, and conversation. The route includes stunning riverside views, historic landmarks, and plenty of opportunities to chat and get to know fellow walkers.\n\nAfter the walk, we typically grab coffee together (optional) to continue socializing. Our group has been meeting weekly for over a year and has built wonderful friendships along the way.',
        date: '2024-01-29',
        time: '10:00',
        endTime: '12:30',
        location: 'Westminster Bridge (South Side)',
        address: 'Westminster Bridge, London SE1 7PB',
        coordinates: { lat: 51.5007, lng: -0.1246 },
        category: 'Fitness & Wellness',
        subcategory: 'Running',
        tags: ['walking', 'Thames', 'exercise', 'sightseeing', 'outdoor'],
        hostId: 'host-rachel',
        hostName: 'Rachel Thompson',
        hostImage: getImageWithFallback('olivia-taylor'),
        hostBio: 'Fitness enthusiast and London walking expert',
        membershipRequired: 'free',
        price: 0,
        currency: 'GBP',
        maxAttendees: 15,
        currentAttendees: 8,
        waitlistCount: 0,
        status: 'published',
        featured: false,
        images: [
          'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=400&fit=crop&auto=format',
          'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=600&h=400&fit=crop&auto=format'
        ],
        photos: [
          {
            id: 'photo-4',
            eventId: 'event-2',
            url: 'https://images.unsplash.com/photo-1594736797933-d0acc43a8f2a?w=400&h=400&fit=crop&auto=format',
            caption: 'Walking group enjoying Thames views',
            uploadedBy: 'Rachel Thompson',
            uploadedAt: '2024-01-22T11:00:00Z',
            featured: true
          },
          {
            id: 'photo-5',
            eventId: 'event-2',
            url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&auto=format',
            caption: 'Coffee break with new friends',
            uploadedBy: 'Jenny Liu',
            uploadedAt: '2024-01-22T12:15:00Z',
            featured: false
          },
          {
            id: 'photo-6',
            eventId: 'event-2',
            url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop&auto=format',
            caption: 'Celebrating our Tower Bridge arrival',
            uploadedBy: 'Maria Santos',
            uploadedAt: '2024-01-22T12:45:00Z',
            featured: false
          }
        ],
        attendees: [
          { id: 'att-3', userId: 'user-3', eventId: 'event-2', name: 'Jenny Liu', email: 'jenny@example.com', membershipTier: 'free', joinedAt: '2024-01-22T09:00:00Z', status: 'confirmed' }
        ],
        waitlist: [],
        reviews: [
          { id: 'rev-2', eventId: 'event-2', userId: 'user-3', reviewerName: 'Jenny L.', rating: 4, comment: 'Great way to explore London and meet new people. Rachel is a wonderful guide!', createdAt: '2024-01-22T14:00:00Z', helpful: 2, membershipTier: 'free' }
        ],
        averageRating: 4.6,
        totalReviews: 12,
        whatToBring: ['Comfortable walking shoes', 'Weather-appropriate clothing', 'Water bottle'],
        skillLevel: 'all',
        accessibility: ['Step-free route available'],
        allowWaitlist: true,
        requiresApproval: false,
        lastBookingTime: '2',
        createdAt: '2024-01-15T08:00:00Z',
        updatedAt: '2024-01-25T12:00:00Z',
        createdBy: 'host-rachel',
        isRecurring: true,
        recurringPattern: { frequency: 'weekly', interval: 1, daysOfWeek: [1] },
        views: 156,
        favorites: 12,
        shares: 3,
        communityGuidelines: true,
        verifiedEvent: true,
        reportCount: 0
      },
      {
        id: 'event-3',
        title: 'Pottery Workshop & Wine Tasting',
        description: 'Create ceramic art while enjoying curated wines in a relaxed studio setting',
        longDescription: 'Combine creativity with relaxation in this unique pottery and wine experience. Spend 3 hours learning pottery basics while tasting carefully selected wines that complement the creative process.\n\nOur expert pottery instructor will guide you through creating your own ceramic piece - whether a bowl, mug, or decorative item. No experience needed! All materials, tools, glazing, and firing are included. Your finished piece will be ready for collection in 2-3 weeks.\n\nThroughout the session, our sommelier will introduce you to 4 different wines, explaining how each pairs with different stages of the creative process. Light cheese and fruit platters are also provided.',
        date: '2024-01-30',
        time: '18:30',
        endTime: '21:30',
        location: 'Turning Earth Pottery Studio',
        address: '11 Hoxton Square, London N1 6NU',
        coordinates: { lat: 51.5267, lng: -0.0823 },
        category: 'Arts & Culture',
        subcategory: 'Art Classes',
        tags: ['pottery', 'wine', 'creative', 'workshop', 'Hoxton'],
        hostId: 'host-isabella',
        hostName: 'Isabella Martinez',
        hostImage: getImageWithFallback('ava-davis'),
        hostBio: 'Professional ceramicist and wine enthusiast',
        membershipRequired: 'core',
        price: 75,
        currency: 'GBP',
        maxAttendees: 8,
        currentAttendees: 6,
        waitlistCount: 3,
        status: 'published',
        featured: true,
        images: ['/events/pottery-wine-1.jpg', '/events/ceramic-art.jpg'],
        photos: [],
        attendees: [
          { id: 'att-4', userId: 'user-4', eventId: 'event-3', name: 'Grace Park', email: 'grace@example.com', membershipTier: 'premium', joinedAt: '2024-01-18T15:00:00Z', status: 'confirmed' }
        ],
        waitlist: [
          { id: 'wait-2', userId: 'user-11', eventId: 'event-3', name: 'Sophie Brown', email: 'sophie@example.com', membershipTier: 'core', joinedWaitlistAt: '2024-01-23T11:00:00Z', position: 1, notified: false }
        ],
        reviews: [],
        averageRating: 4.9,
        totalReviews: 6,
        whatToBring: ['Old clothes or apron', 'Hair tie for long hair'],
        dresscode: 'Comfortable clothing that can get dirty',
        ageRestriction: '21+ (alcohol served)',
        skillLevel: 'beginner',
        accessibility: ['Step-free access', 'Assistance available for mobility needs'],
        allowWaitlist: true,
        requiresApproval: false,
        refundPolicy: 'Full refund 48h+ in advance, no refund within 48h due to wine ordering',
        lastBookingTime: '48',
        createdAt: '2024-01-05T14:00:00Z',
        updatedAt: '2024-01-24T10:00:00Z',
        createdBy: 'host-isabella',
        isRecurring: false,
        views: 189,
        favorites: 22,
        shares: 8,
        communityGuidelines: true,
        verifiedEvent: true,
        reportCount: 0
      },
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
        ageRestriction: '21+ (alcohol served)',
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
        ageRestriction: '21+ (alcohol venue)',
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
        title: 'Mulheres Lusófonas 30+ - Wine & Life Stories Evening',
        description: 'An intimate evening for Portuguese-speaking women 30+ to connect, share experiences, and enjoy Portuguese wines in a beautiful Elephant & Castle venue',
        longDescription: 'Esta noite é especialmente dedicada às mulheres lusófonas que vivem em Londres. Whether you\'re from Portugal, Brazil, Angola, Mozambique, Cape Verde, or any Portuguese-speaking country, this evening is designed for meaningful connections and authentic conversations.\n\nWe\'ll meet at the stylish Champor-Champor restaurant near Elephant & Castle, known for its intimate atmosphere and excellent wine selection. Our evening includes a carefully curated tasting of wines from Portuguese-speaking countries - from Portuguese Douro reds to Brazilian wines, with light petiscos (Portuguese tapas) to accompany.\n\nThis is more than a wine tasting - it\'s a safe space to share our stories of adapting to life in London, celebrating our cultures, and supporting each other as immigrant women. We\'ll have guided conversations about career, relationships, family, and maintaining our cultural identity while building new lives.\n\nLimited to 12 women to ensure intimate conversations and genuine connections.',
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
        hostBio: 'Portuguese psychologist and women\'s empowerment advocate, organizing supportive events for Lusophone women in London',
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
          { id: 'rev-pt-2', eventId: 'event-pt-3', userId: 'user-pt-6', reviewerName: 'Cristina L.', rating: 5, comment: 'Felt so understood and supported. These connections with other Lusophone women are exactly what I needed in London.', createdAt: '2025-08-03T22:30:00Z', helpful: 6, membershipTier: 'core' }
        ],
        averageRating: 4.8,
        totalReviews: 8,
        whatToBring: ['Open heart for sharing', 'Stories from your homeland'],
        dresscode: 'Smart casual',
        ageRestriction: '30+ women only',
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
        ageRestriction: '21+',
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
          { id: 'rev-pt-4', eventId: 'event-pt-5', userId: 'user-pt-12', reviewerName: 'Manuel S.', rating: 5, comment: 'Exactly like the São João celebrations back home in Braga! António organized everything perfectly. Felt like family.', createdAt: '2025-08-24T01:00:00Z', helpful: 11, membershipTier: 'core' }
        ],
        averageRating: 4.9,
        totalReviews: 18,
        whatToBring: ['Comfortable dancing shoes', 'Appetite for Portuguese tradition', 'Plastic hammer (provided if you don\'t have one)'],
        dresscode: 'Smart casual, comfortable for dancing',
        ageRestriction: '35+',
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
        longDescription: 'Networking para profissionais lusófonos! Start your day right with fellow Portuguese-speaking professionals at our monthly business networking breakfast in the heart of Little Portugal. This event is designed for entrepreneurs, freelancers, and corporate professionals who want to build meaningful business connections within London\'s vibrant Portuguese-speaking community.\n\nWe meet at O Cantinho de Portugal, one of Stockwell\'s most beloved Portuguese restaurants, for an authentic Portuguese breakfast featuring fresh pastéis de nata, galão coffee, and traditional breakfast options. The intimate setting encourages genuine conversations and relationship building.\n\nEach month features a different networking focus: this month we\'re highlighting "Digital Innovation in Portuguese Markets" with guest speaker Dr. Sofia Carvalho, a Portuguese tech entrepreneur who successfully expanded her fintech startup from Lisbon to London.\n\nAttendees include Portuguese, Brazilian, Angolan, and other Lusophone professionals across various industries - from finance and tech to creative industries and consulting. Come ready to share your expertise, learn from others, and potentially find your next business partner or client.\n\nAll conversations welcome in Portuguese, English, or both!',
        date: '2025-08-21',
        time: '08:00',
        endTime: '10:00',
        location: 'O Cantinho de Portugal',
        address: '54 Stock Orchard Street, London N7 9RN',
        coordinates: { lat: 51.5512, lng: -0.1103 },
        category: 'Networking',
        subcategory: 'Professional Meetups',
        tags: ['business networking', 'Portuguese professionals', 'Stockwell', 'entrepreneurship', 'breakfast', 'Lusophone'],
        hostId: 'host-patricia',
        hostName: 'Patrícia Gomes',
        hostImage: getImageWithFallback('patricia-gomes'),
        hostBio: 'Business consultant and Portuguese Chamber of Commerce member, connecting Lusophone professionals across London',
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
        ageRestriction: '25+',
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

      if (error || !event) {
        console.error('Error fetching event:', error)
        return null
      }

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
    } catch (error) {
      console.error('Error in getEventById:', error)
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

  async addReview(eventId: string, userId: string, reviewData: { rating: number; comment: string; reviewerName: string; membershipTier: string }): Promise<{ success: boolean; message: string }> {
    try {
      // Check if user attended the event
      const { data: attendance } = await supabase
        .from('event_attendees')
        .select('status')
        .eq('event_id', eventId)
        .eq('user_id', userId)
        .eq('status', 'attended')
        .single()

      if (!attendance) {
        return { success: false, message: 'You must attend an event to review it' }
      }

      // In a real implementation, you'd have a reviews table
      // For now, we'll just return success
      return { success: true, message: 'Review added successfully' }
    } catch (error) {
      console.error('Error adding review:', error)
      return { success: false, message: 'Failed to add review' }
    }
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