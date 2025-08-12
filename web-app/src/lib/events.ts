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
      }
    ]
    
    this.rsvps = [
      { id: 'rsvp-1', eventId: 'event-1', userId: 'user-1', status: 'confirmed', createdAt: '2024-01-15T10:00:00Z' },
      { id: 'rsvp-2', eventId: 'event-2', userId: 'user-3', status: 'confirmed', createdAt: '2024-01-22T09:00:00Z' },
      { id: 'rsvp-3', eventId: 'event-3', userId: 'user-4', status: 'confirmed', createdAt: '2024-01-18T15:00:00Z' }
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