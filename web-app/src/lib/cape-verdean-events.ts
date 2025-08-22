'use client'

import { Event } from '@/lib/events'
import { getImageWithFallback } from '@/lib/profileImages'
import { EVENTS_PRICING } from '@/config/pricing'

/**
 * Beautiful Cape Verdean Cultural Events
 * Celebrating the heartfelt music, energetic dancing, incredible food culture,
 * and amazing community spirit that makes Cape Verdean culture so special
 */
export const capeVerdeanEvents: Event[] = [
  {
    id: 'cape-verde-morna-001',
    title: 'Morna Soul Sessions - Heartfelt Cape Verdean Music Circle',
    description: 'Experience the soul-stirring beauty of Morna, Cape Verde\'s most emotional music genre. Join intimate acoustic sessions where traditional songs touch hearts with their melancholic beauty and deep cultural meaning.',
    longDescription: 'Bem-vindos à noite de Morna! Join us for an intimate evening celebrating Morna, Cape Verde\'s most beloved music genre - often called "Cape Verde\'s blues" for its deeply emotional and melancholic beauty that touches the soul.\n\nOur Morna Soul Sessions take place in the cozy acoustic space of Stockwell\'s Cape Verdean Cultural Center, where the intimate setting allows every voice and guitar string to resonate with heartfelt emotion. Led by master Morna singer Maria Antónia Fernandes, these sessions are more than performances - they\'re cultural experiences that connect us to the deep emotional heritage of Cape Verde.\n\nYou\'ll learn about the history of Morna, its connection to Cape Verdean identity and the concept of "saudade," and experience live performances of classic Morna songs like "Sodade" and "Petit Pays." Maria will share stories about legendary Morna singers like Cesária Évora and how this music carries the soul of Cape Verdean people worldwide.\n\nWhether you\'re Cape Verdean, Portuguese-speaking, or simply someone who appreciates deeply emotional music, you\'ll find yourself moved by the beauty and cultural depth of this incredible art form. Light Cape Verdean refreshments and traditional grogue will be served.\n\nThis is a monthly gathering that builds a community of people who appreciate the profound beauty of Cape Verdean musical heritage.',
    date: '2025-08-29',
    time: '19:00',
    endTime: '21:00',
    location: 'Cape Verdean Cultural Center London',
    address: 'Stockwell Community Centre, 1 Studley Road, London SW4 6RA',
    coordinates: { lat: 51.4622, lng: -0.1234 },
    category: 'Music & Entertainment',
    subcategory: 'Live Music',
    tags: ['Morna', 'Cape Verdean music', 'acoustic sessions', 'cultural heritage', 'Stockwell', 'soul music', 'traditional'],
    hostId: 'host-maria-antonia',
    hostName: 'Maria Antónia Fernandes',
    hostImage: getImageWithFallback('maria-antonia-fernandes'),
    hostBio: 'Renowned Cape Verdean cultural ambassador and master Morna singer, dedicated to preserving the heartfelt musical traditions that make Cape Verdean culture so beautifully unique',
    membershipRequired: 'free',
    price: 25,
    currency: 'GBP',
    maxAttendees: 20,
    minAttendees: 8,
    currentAttendees: 12,
    waitlistCount: 3,
    status: 'published',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80'
    ],
    photos: [],
    attendees: [],
    waitlist: [],
    reviews: [
      { 
        id: 'rev-cv-morna-1', 
        eventId: 'cape-verde-morna-001', 
        userId: 'user-cv-1', 
        reviewerName: 'Ana L.', 
        rating: 5, 
        comment: 'The Morna sessions touched my soul deeply. Maria\'s voice carries the beautiful sadness and hope of Cape Verde. Felt like being transported to the islands.', 
        createdAt: '2025-08-15T22:00:00Z', 
        helpful: 12, 
        membershipTier: 'core',
        culturalValue: 5,
        organizationQuality: 5,
        wouldRecommend: true
      }
    ],
    averageRating: 4.9,
    totalReviews: 8,
    whatToBring: ['Open heart for emotional music', 'Appreciation for Cape Verdean culture'],
    dresscode: 'Comfortable, respectful for cultural experience',
    ageRestriction: 'All ages welcome',
    skillLevel: 'all',
    accessibility: ['Wheelchair accessible', 'Hearing loop available'],
    allowWaitlist: true,
    maxWaitingList: 10,
    requiresApproval: false,
    refundPolicy: 'Full refund up to 48 hours before event',
    lastBookingTime: '2 hours before event',
    createdAt: '2024-08-20T10:00:00Z',
    updatedAt: '2024-08-22T14:30:00Z',
    createdBy: 'host-maria-antonia',
    isRecurring: true,
    recurringPattern: {
      frequency: 'monthly',
      interval: 1,
      daysOfWeek: [4] // Thursday
    },
    views: 156,
    favorites: 23,
    shares: 8,
    communityGuidelines: true,
    verifiedEvent: true,
    reportCount: 0
  },

  {
    id: 'cape-verde-coladeira-002',
    title: 'Coladeira Dance Celebration - Joyful Island Rhythms Party',
    description: 'Join the infectious joy of Coladeira, Cape Verde\'s most upbeat music! High-energy dance sessions with energetic rhythms and movements that bring communities together in celebration.',
    longDescription: 'Vamos dançar Coladeira! Get ready for an absolutely joyful evening of Coladeira dance - Cape Verde\'s most energetic and celebratory music that gets everyone moving with infectious island rhythms and pure happiness!\n\nColadeira is the perfect antidote to life\'s stresses - this upbeat, joyful music brings communities together in celebration with melodies that make everyone smile and dance moves that connect hearts. Our Coladeira Dance Celebration takes place in the large dance hall of the Cape Verdean Cultural Center, where we have plenty of space to move and celebrate together.\n\nOur evening starts with a brief introduction to Coladeira\'s history and its role in Cape Verdean celebrations, followed by dance instruction for beginners and plenty of social dancing for all levels. Professional Cape Verdean dance instructor João Silva will teach basic Coladeira steps, but the focus is on joy, community, and letting the music move you naturally.\n\nWe\'ll dance to classic Coladeira hits and modern interpretations, with live percussion accompaniment and a DJ playing the best Cape Verdean party music. Traditional Cape Verdean snacks, tropical fruit, and refreshing drinks will keep everyone energized throughout the evening.\n\nThis is pure celebration - whether you\'re Cape Verdean, love dancing, or just want to experience the incredible community spirit that makes Cape Verdean culture so special, come ready to move, laugh, and make new friends!\n\nNo dance experience required - just bring your enthusiasm for joy and celebration!',
    date: '2025-09-07',
    time: '18:00',
    endTime: '20:30',
    location: 'Cape Verdean Cultural Center London',
    address: 'Stockwell Community Centre, 1 Studley Road, London SW4 6RA',
    coordinates: { lat: 51.4622, lng: -0.1234 },
    category: 'Music & Entertainment',
    subcategory: 'Dance Classes',
    tags: ['Coladeira', 'Cape Verdean dance', 'energetic celebration', 'community party', 'island rhythms', 'joyful dancing'],
    hostId: 'host-joao-silva',
    hostName: 'João Silva',
    hostImage: getImageWithFallback('joao-silva-dancer'),
    hostBio: 'Professional Cape Verdean dance instructor and cultural celebration organizer, bringing the joy and energy of island celebrations to London communities',
    membershipRequired: 'free',
    price: 20,
    currency: 'GBP',
    maxAttendees: 35,
    minAttendees: 12,
    currentAttendees: 28,
    waitlistCount: 5,
    status: 'published',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80'
    ],
    photos: [],
    attendees: [],
    waitlist: [],
    reviews: [
      { 
        id: 'rev-cv-coladeira-1', 
        eventId: 'cape-verde-coladeira-002', 
        userId: 'user-cv-5', 
        reviewerName: 'Marcus R.', 
        rating: 5, 
        comment: 'Pure joy! The energy was incredible and everyone was so welcoming. Left with a huge smile and new dance moves. Can\'t wait for the next Coladeira party!', 
        createdAt: '2025-08-18T21:00:00Z', 
        helpful: 9, 
        membershipTier: 'free',
        culturalValue: 5,
        organizationQuality: 5,
        wouldRecommend: true
      }
    ],
    averageRating: 4.8,
    totalReviews: 15,
    whatToBring: ['Comfortable dancing shoes', 'Positive energy', 'Willingness to celebrate'],
    dresscode: 'Comfortable clothes for dancing',
    ageRestriction: 'All ages welcome - family friendly',
    skillLevel: 'all',
    accessibility: ['Wheelchair accessible', 'All fitness levels welcome'],
    allowWaitlist: true,
    maxWaitingList: 15,
    requiresApproval: false,
    refundPolicy: 'Full refund up to 24 hours before event',
    lastBookingTime: '2 hours before event',
    createdAt: '2024-08-20T11:00:00Z',
    updatedAt: '2024-08-22T15:00:00Z',
    createdBy: 'host-joao-silva',
    isRecurring: true,
    recurringPattern: {
      frequency: 'monthly',
      interval: 1,
      daysOfWeek: [6] // Saturday
    },
    views: 203,
    favorites: 31,
    shares: 12,
    communityGuidelines: true,
    verifiedEvent: true,
    reportCount: 0
  },

  {
    id: 'cape-verde-cachupa-003',
    title: 'Cachupa Cooking Culture - Heart of Cape Verdean Food Workshop',
    description: 'Discover the soul of Cape Verdean cuisine through hands-on Cachupa cooking! Learn to prepare the national dish that brings families together with incredible one-pot meal traditions.',
    longDescription: 'Vamos cozinhar Cachupa juntos! Join us for a hands-on cooking workshop discovering the heart and soul of Cape Verdean cuisine through Cachupa - the beloved national dish that brings families together with its incredible flavors and cultural significance.\n\nCachupa is much more than food - it\'s a symbol of Cape Verdean identity, community, and the beautiful way island families come together around shared meals. Our workshop takes place in the community kitchen of the Cape Verdean Cultural Center, where we\'ll learn traditional cooking methods passed down through generations.\n\nLed by experienced Cape Verdean home cook and cultural preservationist Dona Esperança, you\'ll learn to prepare authentic Cachupa Rica (the festive version with meat and sausages) and Cachupa Pobres (the simpler but equally delicious version). We\'ll discuss the history of this dish, its connection to Cape Verdean resilience and creativity, and how different islands have their own variations.\n\nYou\'ll work in small groups to prepare fresh corn, beans, cassava, sweet potatoes, and the perfect blend of spices that give Cachupa its distinctive island flavor. While our Cachupa simmers, we\'ll share stories about Cape Verdean food culture, family traditions, and the importance of shared meals in island communities.\n\nThe workshop includes all ingredients, recipe cards to take home, and of course, we\'ll sit together to enjoy our homemade Cachupa with traditional accompaniments. You\'ll also learn to prepare ponche (traditional Cape Verdean drink) to complement the meal.\n\nPerfect for food lovers, anyone interested in Cape Verdean culture, or people who want to learn authentic techniques for bringing families together through food.',
    date: '2025-09-10',
    time: '14:00',
    endTime: '18:00',
    location: 'Cape Verdean Cultural Center London - Community Kitchen',
    address: 'Stockwell Community Centre, 1 Studley Road, London SW4 6RA',
    coordinates: { lat: 51.4622, lng: -0.1234 },
    category: 'Wine & Dining',
    subcategory: 'Cooking Classes',
    tags: ['Cachupa cooking', 'Cape Verdean cuisine', 'traditional recipes', 'family cooking', 'island food culture', 'hands-on workshop'],
    hostId: 'host-esperanca',
    hostName: 'Dona Esperança Santos',
    hostImage: getImageWithFallback('esperanca-santos'),
    hostBio: 'Traditional Cape Verdean cook and cultural preservationist, sharing family recipes and food traditions that connect Cape Verdean communities worldwide',
    membershipRequired: 'free',
    price: 45,
    currency: 'GBP',
    maxAttendees: 16,
    minAttendees: 8,
    currentAttendees: 11,
    waitlistCount: 4,
    status: 'published',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556908114-6ef6d97e6e8e?auto=format&fit=crop&w=800&q=80'
    ],
    photos: [],
    attendees: [],
    waitlist: [],
    reviews: [
      { 
        id: 'rev-cv-cachupa-1', 
        eventId: 'cape-verde-cachupa-003', 
        userId: 'user-cv-8', 
        reviewerName: 'Teresa M.', 
        rating: 5, 
        comment: 'Incredible experience! Dona Esperança taught us not just recipes but the heart of Cape Verdean family traditions. The Cachupa was absolutely delicious and I felt so connected to the culture.', 
        createdAt: '2025-08-25T19:00:00Z', 
        helpful: 14, 
        membershipTier: 'core',
        culturalValue: 5,
        organizationQuality: 5,
        wouldRecommend: true
      }
    ],
    averageRating: 4.9,
    totalReviews: 12,
    whatToBring: ['Apron (provided if needed)', 'Appetite for authentic Cape Verdean flavors', 'Containers for leftovers'],
    dresscode: 'Comfortable clothes for cooking',
    ageRestriction: 'All ages welcome - family workshop',
    skillLevel: 'beginner',
    accessibility: ['Kitchen wheelchair accessible', 'Standing and sitting options'],
    allowWaitlist: true,
    maxWaitingList: 8,
    requiresApproval: false,
    refundPolicy: 'Full refund up to 48 hours before event (ingredients preparation)',
    lastBookingTime: '24 hours before event',
    createdAt: '2024-08-20T12:00:00Z',
    updatedAt: '2024-08-22T16:00:00Z',
    createdBy: 'host-esperanca',
    isRecurring: true,
    recurringPattern: {
      frequency: 'monthly',
      interval: 1,
      daysOfWeek: [0] // Sunday
    },
    views: 178,
    favorites: 27,
    shares: 11,
    communityGuidelines: true,
    verifiedEvent: true,
    reportCount: 0
  },

  {
    id: 'cape-verde-batuko-004',
    title: 'Batuko Women\'s Music Circles - Vocal Harmonies & Sisterhood',
    description: 'Join the powerful tradition of Batuko - women\'s music circles featuring incredible vocal harmonies, storytelling, and cultural bonding through the beautiful art of collective singing.',
    longDescription: 'Mulheres, venham cantar Batuko! Join us for a deeply meaningful women\'s music circle celebrating Batuko, Cape Verde\'s powerful tradition where women come together to create incredible vocal harmonies, share stories, and maintain cultural bonds through the beautiful art of collective singing.\n\nBatuko is one of Cape Verde\'s most sacred musical traditions - a women-only practice where voices blend in complex harmonies while hands create rhythms on cloth-covered pillows called "tchabetas." This isn\'t just music; it\'s cultural preservation, sisterhood, and spiritual connection through sound.\n\nOur monthly Batuko circles take place in the intimate cultural room of the Cape Verdean Cultural Center, creating a safe and sacred space for women to connect through this ancient practice. Led by master Batuko singer and cultural keeper Dona Fátima, you\'ll learn traditional songs, understand the cultural meanings behind different Batuko styles, and experience the profound sense of sisterhood that this tradition creates.\n\nWe\'ll explore work songs that Cape Verdean women sang while preparing corn, celebration songs for life\'s joyful moments, and the deeply spiritual songs that connect us to our ancestors. No musical experience is needed - Batuko is about community, not performance. The beauty comes from voices joining together in harmony and support.\n\nThis is a women-only space that honors Cape Verdean feminine traditions while creating new bonds of sisterhood among women from all backgrounds who appreciate cultural depth and authentic community connection.\n\nLight refreshments and traditional Cape Verdean tea will be shared as we continue conversations about womanhood, culture, and the power of collective voice.',
    date: '2025-09-21',
    time: '15:00',
    endTime: '17:30',
    location: 'Cape Verdean Cultural Center London - Cultural Room',
    address: 'Stockwell Community Centre, 1 Studley Road, London SW4 6RA',
    coordinates: { lat: 51.4622, lng: -0.1234 },
    category: 'Music & Entertainment',
    subcategory: 'Live Music',
    tags: ['Batuko', 'women\'s music circles', 'Cape Verdean traditions', 'vocal harmonies', 'sisterhood', 'women-only'],
    hostId: 'host-fatima',
    hostName: 'Dona Fátima Monteiro',
    hostImage: getImageWithFallback('fatima-monteiro'),
    hostBio: 'Master Batuko singer and cultural keeper, preserving Cape Verde\'s sacred women\'s musical traditions and creating spaces for feminine cultural connection',
    membershipRequired: 'free',
    price: 15,
    currency: 'GBP',
    maxAttendees: 25,
    minAttendees: 8,
    currentAttendees: 18,
    waitlistCount: 3,
    status: 'published',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80'
    ],
    photos: [],
    attendees: [],
    waitlist: [],
    reviews: [
      { 
        id: 'rev-cv-batuko-1', 
        eventId: 'cape-verde-batuko-004', 
        userId: 'user-cv-12', 
        reviewerName: 'Carla F.', 
        rating: 5, 
        comment: 'Profoundly moving experience. The sisterhood and spiritual connection through Batuko was unlike anything I\'ve experienced. Dona Fátima creates such a sacred, welcoming space for women.', 
        createdAt: '2025-08-28T18:00:00Z', 
        helpful: 16, 
        membershipTier: 'core',
        culturalValue: 5,
        organizationQuality: 5,
        wouldRecommend: true
      }
    ],
    averageRating: 4.9,
    totalReviews: 7,
    whatToBring: ['Open heart for spiritual music', 'Respect for women\'s traditions', 'Willingness to share voice in community'],
    dresscode: 'Comfortable, respectful for sacred space',
    ageRestriction: 'Women only - all ages welcome',
    skillLevel: 'all',
    accessibility: ['Wheelchair accessible', 'All vocal abilities welcome'],
    allowWaitlist: true,
    maxWaitingList: 12,
    requiresApproval: false,
    refundPolicy: 'Full refund up to 24 hours before event',
    lastBookingTime: '4 hours before event',
    createdAt: '2024-08-20T13:00:00Z',
    updatedAt: '2024-08-22T17:00:00Z',
    createdBy: 'host-fatima',
    isRecurring: true,
    recurringPattern: {
      frequency: 'monthly',
      interval: 1,
      daysOfWeek: [6] // Saturday
    },
    views: 142,
    favorites: 19,
    shares: 6,
    communityGuidelines: true,
    verifiedEvent: true,
    reportCount: 0
  },

  {
    id: 'cape-verde-festival-005',
    title: 'Cape Verdean Island Festival - Community Spirit Celebration',
    description: 'Annual carnival-style celebration showcasing the incredible community spirit that makes Cape Verdean culture so special! Live music, traditional dancing, island food, and Cape Verdean hospitality.',
    longDescription: 'Festa das Ilhas! Join us for our spectacular annual Cape Verdean Island Festival - a weekend celebration showcasing the incredible community spirit, warmth, and cultural richness that makes Cape Verdean culture so beautifully special and welcoming to everyone!\n\nThis carnival-style festival transforms the Cape Verdean Cultural Center and surrounding outdoor spaces into a vibrant celebration of island life, featuring multiple stages with live Morna, Coladeira, and Funaná music, traditional Cape Verdean dance performances, and plenty of opportunities for community dancing and celebration.\n\nOur festival includes authentic Cape Verdean food stalls serving fresh Cachupa, grilled fish, pastéis, and tropical island treats, alongside traditional drinks like ponche and grogue. Local Cape Verdean artists will display and sell beautiful handicrafts including traditional weavings, pottery, and jewelry that represent island artisan traditions.\n\nChildren\'s activities include face painting with Cape Verdean flag colors, traditional island games, and storytelling sessions in Cape Verdean Creole. Adults can enjoy live music performances, participate in group dances, and experience the warm hospitality that makes Cape Verdean communities so welcoming worldwide.\n\nThis festival celebrates Cape Verde\'s Independence Day (July 5th) and brings together the entire London Cape Verdean community along with friends from across the Portuguese-speaking diaspora and anyone who appreciates authentic cultural celebration and incredible community spirit.\n\nCome experience why Cape Verdean culture is known for its hospitality, joy, and the beautiful way it makes everyone feel like family. This is community celebration at its finest!',
    date: '2025-07-05',
    time: '11:00',
    endTime: '22:00',
    location: 'Cape Verdean Cultural Center & Community Gardens',
    address: 'Stockwell Community Centre, 1 Studley Road, London SW4 6RA',
    coordinates: { lat: 51.4622, lng: -0.1234 },
    category: 'Seasonal & Special',
    subcategory: 'Celebrations',
    tags: ['Cape Verde Independence Day', 'island festival', 'community celebration', 'live music', 'traditional food', 'family festival'],
    hostId: 'host-festival-committee',
    hostName: 'Cape Verdean Festival Committee London',
    hostImage: getImageWithFallback('cape-verde-flag'),
    hostBio: 'Community organization dedicated to preserving and celebrating Cape Verdean culture through authentic festivals that showcase the incredible spirit and hospitality of island traditions',
    membershipRequired: 'free',
    price: 15, // adults
    currency: 'GBP',
    maxAttendees: 500,
    minAttendees: 100,
    currentAttendees: 287,
    waitlistCount: 23,
    status: 'published',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80'
    ],
    photos: [],
    attendees: [],
    waitlist: [],
    reviews: [
      { 
        id: 'rev-cv-festival-1', 
        eventId: 'cape-verde-festival-005', 
        userId: 'user-cv-20', 
        reviewerName: 'Paulo S.', 
        rating: 5, 
        comment: 'Absolutely incredible celebration! The community spirit was amazing - felt like being in Cape Verde itself. The music, food, and hospitality made this the highlight of our year in London.', 
        createdAt: '2025-07-08T15:00:00Z', 
        helpful: 28, 
        membershipTier: 'free',
        culturalValue: 5,
        organizationQuality: 5,
        wouldRecommend: true
      }
    ],
    averageRating: 4.9,
    totalReviews: 34,
    whatToBring: ['Appetite for island food', 'Dancing shoes', 'Camera for memories', 'Cape Verde flag (if you have one)'],
    dresscode: 'Colorful, festive - Cape Verde colors welcome',
    ageRestriction: 'All ages welcome - family festival',
    skillLevel: 'all',
    accessibility: ['Wheelchair accessible', 'Family changing facilities', 'Multiple seating areas'],
    allowWaitlist: true,
    maxWaitingList: 100,
    requiresApproval: false,
    refundPolicy: 'Full refund up to 1 week before event',
    lastBookingTime: '24 hours before event',
    createdAt: '2024-05-15T10:00:00Z',
    updatedAt: '2024-08-22T18:00:00Z',
    createdBy: 'host-festival-committee',
    isRecurring: true,
    recurringPattern: {
      frequency: 'yearly',
      interval: 1
    },
    views: 892,
    favorites: 156,
    shares: 47,
    communityGuidelines: true,
    verifiedEvent: true,
    reportCount: 0
  }
]

/**
 * Helper function to get all Cape Verdean events
 */
export function getCapeVerdeanEvents(): Event[] {
  return capeVerdeanEvents
}

/**
 * Helper function to get Cape Verdean events by category
 */
export function getCapeVerdeanEventsByCategory(category: string): Event[] {
  return capeVerdeanEvents.filter(event => event.category === category)
}

/**
 * Helper function to get featured Cape Verdean events
 */
export function getFeaturedCapeVerdeanEvents(): Event[] {
  return capeVerdeanEvents.filter(event => event.featured)
}

/**
 * Helper function to get upcoming Cape Verdean events
 */
export function getUpcomingCapeVerdeanEvents(): Event[] {
  const today = new Date().toISOString().split('T')[0]
  return capeVerdeanEvents.filter(event => event.date >= today && event.status === 'published')
}

/**
 * Helper function to get Cape Verdean music events
 */
export function getCapeVerdeanMusicEvents(): Event[] {
  return capeVerdeanEvents.filter(event => 
    event.category === 'Music & Entertainment' && 
    event.tags.some(tag => tag.includes('music') || tag.includes('Morna') || tag.includes('Coladeira'))
  )
}

/**
 * Helper function to get Cape Verdean cultural workshops
 */
export function getCapeVerdeanCulturalWorkshops(): Event[] {
  return capeVerdeanEvents.filter(event => 
    event.subcategory === 'Cooking Classes' || 
    event.tags.some(tag => tag.includes('workshop') || tag.includes('cultural'))
  )
}