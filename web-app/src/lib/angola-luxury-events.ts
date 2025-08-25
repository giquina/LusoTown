// Luxury Angola Events for Elite Angolan Diaspora in United Kingdom
// Sophisticated cultural and business networking events targeting wealthy Angolan professionals

import { EventTour } from './events-tours'
import { TOURS_PRICING } from '@/config/pricing'

export interface AngolaLuxuryEvent extends EventTour {
  exclusivityLevel: 'VIP' | 'Ultra-VIP' | 'Private Club' | 'Elite Circle'
  wealthTier: 'High Net Worth' | 'Ultra High Net Worth' | 'Elite Professional'
  businessSectors?: ('Oil & Gas' | 'Diamonds' | 'Mining' | 'Finance' | 'Luxury' | 'Real Estate')[]
  angolanRegions?: ('Luanda' | 'Cabinda' | 'Benguela' | 'Huambo' | 'Lobito')[]
  networkingValue: 'Business Development' | 'Investment Opportunities' | 'Cultural Exchange' | 'Elite Social'
  dresscode: 'Black Tie' | 'Business Formal' | 'Smart Casual' | 'Cocktail Attire'
  venuePrestige: 'Mayfair Private Club' | 'City Institution' | 'Luxury Hotel' | 'Private Residence'
}

// Luxury pricing for elite Angola events
export const ANGOLA_LUXURY_PRICING = {
  diamondCapitalSeries: 2500, // High-level investment seminars
  businessEliteNetworking: 150, // Monthly exclusive events
  luandaSocietyExchange: 800, // Quarterly cultural programs
  luxuryCuisine: 450, // Weekend culinary masterclasses
  oilGasInvestment: 1200, // Industry networking events
  privateDining: 300, // Exclusive dining experiences
  artGallery: 200, // Premium art exhibitions
  businessConsultancy: 500, // Private consultation sessions
  // NEW: Magnetic Angolan Cultural Experiences
  sensualKizombaNights: 75, // Intimate kizomba social dancing
  vibrantSembaNights: 65, // High-energy semba community dancing
  kudruroUrbanParty: 85, // Electric kuduro dance parties
  angolanMusicFestival: 120, // Multi-genre Angolan music showcase
  muambaFeastExperience: 95, // Traditional muamba dining experiences
  angolanNightlifeTour: 110, // Guided tour of London's Angolan nightlife
  culturalDrummingCircle: 45, // Community percussion experiences
  angolanStreetFoodJourney: 55, // Urban food adventure tours
  palomWineTasting: 85, // Traditional palm wine cultural experience
  modernAngolanPopNight: 70 // Contemporary Angolan music showcase
} as const

export const angolaLuxuryEvents: AngolaLuxuryEvent[] = [
  {
    id: 'angola-001',
    title: 'London Angolan Business Leaders - Elite Networking Breakfast',
    description: 'Exclusive networking breakfast connecting London\'s most successful Angolan entrepreneurs and business leaders. Share experiences, build partnerships, and celebrate Angola\'s heritage while thriving in London\'s business environment.',
    date: '2025-09-15',
    time: '08:00',
    endTime: '11:00',
    location: 'The Dorchester Hotel - Mayfair',
    address: 'Park Lane, Mayfair, London W1K 1QA',
    category: 'Business & Professional',
    price: ANGOLA_LUXURY_PRICING.diamondCapitalSeries,
    currency: 'GBP',
    maxAttendees: 15,
    currentAttendees: 8,
    status: 'published',
    allowWaitlist: true,
    maxWaitingList: 10,
    hostName: 'Dr. Esperança Burity',
    hostImage: '/profiles/community/angola-director.jpg',
    imageUrl: '/events/angola/diamond-capital-breakfast.jpg',
    featured: true,
    groupExperience: true,
    requiresApproval: true,
    membershipRequired: 'premium',
    ageRestriction: '25+',
    portugueseOrigin: ['Angola'],
    tags: ['Diamond Industry', 'Investment', 'Elite Networking', 'Mayfair', 'Oil & Gas', 'Luxury Development'],
    highlights: [
      'Networking with London\'s top Angolan business leaders',
      'Private discussions with successful diaspora entrepreneurs',
      'Business opportunities in London\'s diverse markets',
      'Premium breakfast at The Dorchester\'s private dining room'
    ],
    whatToExpect: [
      'Exclusive group of verified high-net-worth individuals',
      'Professional presentations by industry leaders',
      'Strategic business networking opportunities',
      'Access to Angola-United Kingdom investment partnerships'
    ],
    whatToHear: 'Success stories from Angolan entrepreneurs who have built thriving businesses in London\'s competitive markets',
    whatToLearn: 'How to leverage London\'s business opportunities while maintaining strong cultural connections to Angola',
    groupSize: 'Ultra-Exclusive (12-15 people)',
    difficulty: 'Advanced',
    averageRating: 4.9,
    totalReviews: 23,
    createdAt: '2024-08-22',
    updatedAt: '2024-08-22',
    exclusivityLevel: 'Ultra-VIP',
    wealthTier: 'Ultra High Net Worth',
    businessSectors: ['Oil & Gas', 'Diamonds', 'Mining', 'Finance'],
    angolanRegions: ['Luanda', 'Cabinda'],
    networkingValue: 'Investment Opportunities',
    dresscode: 'Business Formal',
    venuePrestige: 'Luxury Hotel'
  },
  
  {
    id: 'angola-002',
    title: 'London Angolan Cultural Salon - Heritage & Excellence',
    description: 'Sophisticated cultural event celebrating Angolan heritage and contemporary success in London. Experience the elegance of Angolan culture through curated art, refined conversation, and exclusive networking with London\'s Angolan elite in Mayfair\'s most prestigious setting.',
    date: '2025-09-28',
    time: '18:30',
    endTime: '22:30',
    location: 'Annabel\'s Private Members Club',
    address: '46 Berkeley Square, Mayfair, London W1J 5AT',
    category: 'Cultural Heritage',
    price: ANGOLA_LUXURY_PRICING.luandaSocietyExchange,
    currency: 'GBP',
    maxAttendees: 20,
    currentAttendees: 12,
    status: 'published',
    allowWaitlist: true,
    maxWaitingList: 15,
    hostName: 'Sra. Catarina Bento',
    hostImage: '/profiles/community/angola-cultural-director.jpg',
    imageUrl: '/events/angola/luanda-society-salon.jpg',
    featured: true,
    groupExperience: true,
    requiresApproval: true,
    membershipRequired: 'premium',
    ageRestriction: '30+',
    portugueseOrigin: ['Angola'],
    tags: ['High Society', 'Cultural Exchange', 'Art & Culture', 'Mayfair', 'Exclusive Networking', 'Private Club'],
    highlights: [
      'Private viewing of contemporary Angolan art collection',
      'Sophisticated discussion on Angola\'s cultural renaissance',
      'Networking with London\'s Angolan cultural ambassadors',
      'Premium cocktails and refined Angolan-inspired canapés'
    ],
    whatToExpect: [
      'Elite gathering of cultured Angolan diaspora',
      'Cultural presentations by renowned Angolan artists',
      'Exclusive access to Annabel\'s private art collection',
      'Strategic connections with cultural institutions'
    ],
    whatToHear: 'Stories from London\'s sophisticated Angolan community and how cultural heritage enhances professional success',
    whatToLearn: 'How to celebrate Angolan culture while building meaningful connections in London\'s elite social circles',
    groupSize: 'Exclusive (18-20 people)',
    difficulty: 'Easy',
    averageRating: 4.9,
    totalReviews: 18,
    createdAt: '2024-08-22',
    updatedAt: '2024-08-22',
    exclusivityLevel: 'VIP',
    wealthTier: 'High Net Worth',
    businessSectors: ['Luxury'],
    angolanRegions: ['Luanda', 'Benguela'],
    networkingValue: 'Cultural Exchange',
    dresscode: 'Cocktail Attire',
    venuePrestige: 'Mayfair Private Club'
  },

  {
    id: 'angola-003',
    title: 'Energy Professionals: London-Angola Business Connection Dinner',
    description: 'Premier networking dinner for London-based energy professionals with Angola connections. Connect with London\'s finance elite while exploring business opportunities that bridge United Kingdom expertise with Angola heritage and international markets.',
    date: '2025-10-12',
    time: '19:00',
    endTime: '23:00',
    location: 'The Ned Private Dining Room',
    address: '27 Poultry, City of London, London EC2R 8AJ',
    category: 'Business & Professional',
    price: ANGOLA_LUXURY_PRICING.oilGasInvestment,
    currency: 'GBP',
    maxAttendees: 18,
    currentAttendees: 10,
    status: 'published',
    allowWaitlist: true,
    maxWaitingList: 12,
    hostName: 'Eng. Ricardo Fernandes',
    hostImage: '/profiles/community/angola-oil-executive.jpg',
    imageUrl: '/events/angola/oil-gas-partnership.jpg',
    featured: true,
    groupExperience: true,
    requiresApproval: true,
    membershipRequired: 'premium',
    ageRestriction: '30+',
    portugueseOrigin: ['Angola'],
    tags: ['Oil & Gas', 'Energy Sector', 'Strategic Partnerships', 'City of London', 'Executive Networking'],
    highlights: [
      'Strategic discussions on London\'s international energy business',
      'Networking with City of London energy finance leaders',
      'Business partnership and collaboration opportunities',
      'Premium dinner with Angolan-inspired haute cuisine'
    ],
    whatToExpect: [
      'Senior executives from major energy companies',
      'Strategic presentations on Angola-United Kingdom energy partnerships',
      'Access to exclusive investment opportunities',
      'High-level business relationship development'
    ],
    whatToHear: 'Insights from London-based energy professionals on building international business bridges',
    whatToLearn: 'Strategic approaches to leveraging London\'s energy sector connections for global business opportunities',
    groupSize: 'Executive Level (15-18 people)',
    difficulty: 'Advanced',
    averageRating: 4.8,
    totalReviews: 14,
    createdAt: '2024-08-22',
    updatedAt: '2024-08-22',
    exclusivityLevel: 'Ultra-VIP',
    wealthTier: 'Ultra High Net Worth',
    businessSectors: ['Oil & Gas', 'Finance'],
    angolanRegions: ['Cabinda', 'Luanda'],
    networkingValue: 'Business Development',
    dresscode: 'Business Formal',
    venuePrestige: 'City Institution'
  },

  {
    id: 'angola-004',
    title: 'Sophisticated Angolan Cuisine & Lusophone Wine Experience',
    description: 'Refined culinary journey showcasing elevated Angolan gastronomy paired with exceptional Portuguese wines. Led by Michelin-trained chefs, this exclusive experience celebrates the sophisticated evolution of Angolan cuisine for London\'s discerning palates.',
    date: '2025-10-25',
    time: '18:00',
    endTime: '22:00',
    location: 'Sketch Private Dining Room',
    address: '9 Conduit Street, Mayfair, London W1S 2XG',
    category: 'Cultural Heritage',
    price: ANGOLA_LUXURY_PRICING.luxuryCuisine,
    currency: 'GBP',
    maxAttendees: 12,
    currentAttendees: 7,
    status: 'published',
    allowWaitlist: true,
    maxWaitingList: 8,
    hostName: 'Chef Ana Paula Gomes',
    hostImage: '/profiles/community/angola-chef.jpg',
    imageUrl: '/events/angola/sophisticated-cuisine.jpg',
    featured: true,
    groupExperience: true,
    requiresApproval: true,
    membershipRequired: 'premium',
    ageRestriction: '25+',
    portugueseOrigin: ['Angola', 'Portugal'],
    tags: ['Fine Dining', 'Angolan Cuisine', 'Wine Pairing', 'Culinary Arts', 'Luxury Experience'],
    highlights: [
      'Seven-course tasting menu of elevated Angolan dishes',
      'Curated Portuguese wine pairings from premium estates',
      'Interactive cooking demonstration by renowned chef',
      'Sophisticated interpretation of traditional Angolan flavors'
    ],
    whatToExpect: [
      'Intimate group of gastronomy enthusiasts',
      'Professional wine sommelier guidance',
      'Behind-the-scenes kitchen experience at Sketch',
      'Recipe collection and culinary techniques to take home'
    ],
    whatToHear: 'Stories about bringing authentic Angolan cuisine to London\'s sophisticated dining scene',
    whatToLearn: 'How to appreciate and prepare refined Angolan dishes using London\'s finest ingredients and techniques',
    groupSize: 'Intimate (10-12 people)',
    difficulty: 'Moderate',
    averageRating: 4.9,
    totalReviews: 27,
    createdAt: '2024-08-22',
    updatedAt: '2024-08-22',
    exclusivityLevel: 'VIP',
    wealthTier: 'High Net Worth',
    businessSectors: ['Luxury'],
    angolanRegions: ['Luanda', 'Benguela', 'Huambo'],
    networkingValue: 'Cultural Exchange',
    dresscode: 'Smart Casual',
    venuePrestige: 'Luxury Hotel'
  },

  {
    id: 'angola-005',
    title: 'Angola Contemporary Art: Private Gallery Opening',
    description: 'Exclusive preview of contemporary Angolan art featuring works by renowned artists from Luanda\'s vibrant cultural scene. Network with London\'s art collectors while exploring Angola\'s sophisticated artistic renaissance.',
    date: '2025-11-08',
    time: '18:00',
    endTime: '21:00',
    location: 'Hauser & Wirth Gallery Mayfair',
    address: '23 Savile Row, Mayfair, London W1S 2ET',
    category: 'Arts & Entertainment',
    price: ANGOLA_LUXURY_PRICING.artGallery,
    currency: 'GBP',
    maxAttendees: 25,
    currentAttendees: 15,
    status: 'published',
    allowWaitlist: true,
    maxWaitingList: 15,
    hostName: 'Dr. Marta Silva',
    hostImage: '/profiles/community/angola-art-curator.jpg',
    imageUrl: '/events/angola/contemporary-art-gallery.jpg',
    featured: true,
    groupExperience: true,
    requiresApproval: true,
    membershipRequired: 'core',
    ageRestriction: '21+',
    portugueseOrigin: ['Angola', 'All Lusophone'],
    tags: ['Contemporary Art', 'Gallery Opening', 'Cultural Exchange', 'Art Collection', 'Mayfair'],
    highlights: [
      'Private viewing of exclusive Angolan contemporary art',
      'Meet-and-greet with featured Angolan artists',
      'Art collection guidance from professional curators',
      'Premium cocktails and sophisticated networking'
    ],
    whatToExpect: [
      'Art enthusiasts and collectors from London\'s cultural scene',
      'Professional insights into Angolan contemporary art market',
      'Opportunities to acquire unique Angolan artworks',
      'Cultural bridge-building between Angola and London art scenes'
    ],
    whatToHear: 'Stories from Angolan artists working in London about expressing cultural identity through contemporary art',
    whatToLearn: 'Understanding how Angolan art is gaining recognition and value in London\'s sophisticated art market',
    groupSize: 'Medium (20-25 people)',
    difficulty: 'Easy',
    averageRating: 4.7,
    totalReviews: 31,
    createdAt: '2024-08-22',
    updatedAt: '2024-08-22',
    exclusivityLevel: 'VIP',
    wealthTier: 'High Net Worth',
    businessSectors: ['Luxury'],
    angolanRegions: ['Luanda'],
    networkingValue: 'Cultural Exchange',
    dresscode: 'Cocktail Attire',
    venuePrestige: 'Mayfair Private Club'
  },

  {
    id: 'angola-006',
    title: 'Private Angolan Business Consultation & Strategy Session',
    description: 'Exclusive one-on-one consultation for high-net-worth Angolan professionals seeking strategic business advice for United Kingdom operations, investments, or cultural ventures. Benefit from expert guidance in a confidential, luxury setting.',
    date: '2025-11-20',
    time: '10:00',
    endTime: '16:00',
    location: 'Private Business Suite - Mayfair',
    address: 'Berkeley Square House, Berkeley Square, Mayfair, London W1J 6BD',
    category: 'Business & Professional',
    price: ANGOLA_LUXURY_PRICING.businessConsultancy,
    currency: 'GBP',
    maxAttendees: 1,
    currentAttendees: 0,
    status: 'published',
    allowWaitlist: false,
    hostName: 'Dr. Esperança Burity',
    hostImage: '/profiles/community/angola-director.jpg',
    imageUrl: '/events/angola/private-consultation.jpg',
    featured: false,
    groupExperience: false,
    requiresApproval: true,
    membershipRequired: 'premium',
    ageRestriction: '25+',
    portugueseOrigin: ['Angola'],
    tags: ['Business Strategy', 'Private Consultation', 'Investment Advice', 'Executive Coaching'],
    highlights: [
      'Confidential one-on-one business strategy session',
      'Expert advice on United Kingdom-Angola business opportunities',
      'Strategic planning for cultural and business ventures',
      'Premium business suite with complete privacy'
    ],
    whatToExpect: [
      'Personalized strategic business guidance',
      'Confidential discussion of business challenges and opportunities',
      'Action plan development for United Kingdom market entry or expansion',
      'Follow-up support and networking introductions'
    ],
    whatToHear: 'Expert insights into building successful businesses in London while celebrating Angolan heritage',
    whatToLearn: 'Strategic approaches to leveraging cultural diversity for business success in the United Kingdom market',
    groupSize: 'Private (1-on-1)',
    difficulty: 'Advanced',
    averageRating: 5.0,
    totalReviews: 8,
    createdAt: '2024-08-22',
    updatedAt: '2024-08-22',
    exclusivityLevel: 'Private Club',
    wealthTier: 'Ultra High Net Worth',
    businessSectors: ['Finance', 'Oil & Gas', 'Luxury', 'Real Estate'],
    angolanRegions: ['Luanda'],
    networkingValue: 'Business Development',
    dresscode: 'Business Formal',
    venuePrestige: 'Private Residence'
  },

  // MAGNETIC ANGOLAN CULTURAL EXPERIENCES - Sensual Kizomba & Incredible Music
  {
    id: 'angola-kizomba-001',
    title: 'Sensual Kizomba Social Dancing - Magnetic Connection Night',
    description: 'Experience the absolutely magnetic allure of kizomba - Angola\'s sensual partner dance that creates incredible connections. This intimate evening celebrates the romantic rhythm and passionate movement that makes kizomba irresistible, with live Angolan musicians creating the perfect atmosphere for sensual dancing.',
    date: '2025-09-22',
    time: '19:30',
    endTime: '23:30',
    location: 'The Jazz Café Camden - Private Dancing Floor',
    address: '5 Parkway, Camden, London NW1 7PG',
    category: 'Dance & Music',
    price: ANGOLA_LUXURY_PRICING.sensualKizombaNights,
    currency: 'GBP',
    maxAttendees: 60,
    currentAttendees: 35,
    status: 'published',
    allowWaitlist: true,
    maxWaitingList: 20,
    hostName: 'Mestre Carlos & Dança Angola United Kingdom',
    hostImage: '/profiles/community/angola-kizomba-master.jpg',
    imageUrl: '/events/angola/sensual-kizomba-night.jpg',
    featured: true,
    groupExperience: true,
    requiresApproval: false,
    membershipRequired: 'free',
    ageRestriction: '21+',
    portugueseOrigin: ['Angola', 'All Lusophone'],
    tags: ['Kizomba', 'Sensual Dancing', 'Partner Dancing', 'Live Music', 'Romantic', 'Connection', 'Angolan Music'],
    highlights: [
      'Live kizomba musicians creating authentic romantic atmosphere',
      'Professional dance instruction for all levels - beginners to advanced',
      'Sensual partner dancing that creates incredible connections',
      'DJ sets featuring the best contemporary kizomba artists',
      'Complimentary caipirinha and traditional Angolan refreshments',
      'Dimmed lighting and intimate setting perfect for romantic dancing'
    ],
    whatToExpect: [
      'Passionate kizomba dancers from London\'s vibrant Angolan community',
      'Beginner-friendly instruction followed by open social dancing',
      'Live musicians playing traditional and contemporary kizomba',
      'Opportunity to experience Angola\'s most magnetic cultural export',
      'Romantic atmosphere perfect for couples and singles alike'
    ],
    whatToHear: 'The hypnotic rhythms of live kizomba music and the stories behind Angola\'s most sensual dance tradition',
    whatToLearn: 'How to dance kizomba with confidence and passion - the art of connection through sensual movement',
    groupSize: 'Intimate Community (50-60 people)',
    difficulty: 'All Levels',
    averageRating: 4.9,
    totalReviews: 127,
    createdAt: '2024-08-22',
    updatedAt: '2024-08-22',
    exclusivityLevel: 'VIP',
    wealthTier: 'High Net Worth',
    businessSectors: ['Luxury'],
    angolanRegions: ['Luanda', 'Benguela'],
    networkingValue: 'Cultural Exchange',
    dresscode: 'Smart Casual',
    venuePrestige: 'Luxury Hotel'
  },

  {
    id: 'angola-semba-002',
    title: 'Vibrant Semba Community Dancing - Energy That Gets Everyone Moving',
    description: 'Feel the incredible energy of semba - Angola\'s original community dance that brings people together in celebration! This high-energy evening showcases the infectious rhythm and joyful movement that makes semba absolutely irresistible, with professional drummers and dancers creating an atmosphere of pure celebration.',
    date: '2025-10-05',
    time: '18:00',
    endTime: '22:00',
    location: 'Southbank Centre - Queen Elizabeth Hall',
    address: 'Belvedere Road, South Bank, London SE1 8XX',
    category: 'Dance & Music',
    price: ANGOLA_LUXURY_PRICING.vibrantSembaNights,
    currency: 'GBP',
    maxAttendees: 120,
    currentAttendees: 85,
    status: 'published',
    allowWaitlist: true,
    maxWaitingList: 30,
    hostName: 'Grupo Semba Londres & Angola Cultural Collective',
    hostImage: '/profiles/community/angola-semba-group.jpg',
    imageUrl: '/events/angola/vibrant-semba-community.jpg',
    featured: true,
    groupExperience: true,
    requiresApproval: false,
    membershipRequired: 'free',
    ageRestriction: '16+',
    portugueseOrigin: ['Angola', 'All Lusophone'],
    tags: ['Semba', 'Community Dancing', 'High Energy', 'Traditional Music', 'Cultural Celebration', 'Family Friendly'],
    highlights: [
      'Live traditional drumming and percussion that gets your heart racing',
      'Community-style dancing where everyone joins in the celebration',
      'Professional semba instruction with infectious energy and joy',
      'Traditional Angolan costumes and cultural presentations',
      'Street food vendors with authentic Angolan flavors',
      'Multi-generational celebration bringing families together'
    ],
    whatToExpect: [
      'Energetic celebration with London\'s Angolan community of all ages',
      'Traditional semba music performed by master musicians',
      'Group dancing that creates instant connections and friendships',
      'Cultural performances showcasing Angola\'s rich heritage',
      'Authentic Angolan food and drinks throughout the evening'
    ],
    whatToHear: 'The powerful rhythms of traditional Angolan drums and the stories of semba\'s role in bringing communities together',
    whatToLearn: 'The fundamentals of semba dancing and its importance in Angolan community celebrations',
    groupSize: 'Large Community Celebration (100-many people)',
    difficulty: 'All Levels',
    averageRating: 4.8,
    totalReviews: 94,
    createdAt: '2024-08-22',
    updatedAt: '2024-08-22',
    exclusivityLevel: 'VIP',
    wealthTier: 'High Net Worth',
    businessSectors: ['Luxury'],
    angolanRegions: ['Luanda', 'Huambo', 'Benguela'],
    networkingValue: 'Cultural Exchange',
    dresscode: 'Casual',
    venuePrestige: 'City Institution'
  },

  {
    id: 'angola-kuduro-003',
    title: 'Electric Kuduro Urban Dance Party - High-Energy Movement & Modern Angola',
    description: 'Experience the electric energy of kuduro - Angola\'s high-octane urban dance that gets entire communities moving! This vibrant party showcases the incredible athleticism and street culture that makes kuduro absolutely magnetic, with DJs spinning the hottest tracks and dancers demonstrating moves that will blow your mind.',
    date: '2025-10-19',
    time: '20:00',
    endTime: '02:00',
    location: 'Village Underground Shoreditch',
    address: '54 Holywell Lane, Shoreditch, London EC2A 3PQ',
    category: 'Dance & Music',
    price: ANGOLA_LUXURY_PRICING.kuduroUrbanParty,
    currency: 'GBP',
    maxAttendees: 200,
    currentAttendees: 165,
    status: 'published',
    allowWaitlist: true,
    maxWaitingList: 50,
    hostName: 'Kuduro United Kingdom & Urban Angola Collective',
    hostImage: '/profiles/community/angola-kuduro-crew.jpg',
    imageUrl: '/events/angola/electric-kuduro-party.jpg',
    featured: true,
    groupExperience: true,
    requiresApproval: false,
    membershipRequired: 'free',
    ageRestriction: '18+',
    portugueseOrigin: ['Angola', 'All Lusophone'],
    tags: ['Kuduro', 'Urban Dance', 'High Energy', 'Street Culture', 'Party', 'Athletic Dancing', 'Modern Angola'],
    highlights: [
      'Live DJ sets featuring the hottest kuduro tracks from Luanda',
      'Professional kuduro dancers demonstrating incredible athletic moves',
      'Dance battles and competitions with amazing prizes',
      'Urban street food and tropical cocktails throughout the night',
      'Visual projections showcasing modern Angolan street culture',
      'Photo booth with Angolan flag colors and urban backdrops'
    ],
    whatToExpect: [
      'High-energy party atmosphere with London\'s young Angolan community',
      'Athletic dance demonstrations that showcase incredible skill',
      'Interactive workshops where you can learn basic kuduro moves',
      'Competition elements that celebrate the best dancers',
      'Urban street culture celebration with authentic Angolan flair'
    ],
    whatToHear: 'Pounding kuduro beats and the stories of how this urban dance conquered Angola and the world',
    whatToLearn: 'Basic kuduro moves and the cultural significance of this modern Angolan art form',
    groupSize: 'Large Urban Celebration (180-many people)',
    difficulty: 'All Levels',
    averageRating: 4.9,
    totalReviews: 78,
    createdAt: '2024-08-22',
    updatedAt: '2024-08-22',
    exclusivityLevel: 'VIP',
    wealthTier: 'High Net Worth',
    businessSectors: ['Luxury'],
    angolanRegions: ['Luanda'],
    networkingValue: 'Cultural Exchange',
    dresscode: 'Street Style',
    venuePrestige: 'City Institution'
  },

  {
    id: 'angola-music-festival-004',
    title: 'Incredible Angolan Music Festival - From Traditional to Contemporary Sounds',
    description: 'Immerse yourself in the incredible diversity of Angolan music - from traditional drumming circles to contemporary afrobeat fusion! This magnetic festival showcases the rich musical heritage that makes Angolan culture absolutely irresistible, featuring live performances by acclaimed artists representing every genre of Angola\'s vibrant music scene.',
    date: '2025-11-15',
    time: '15:00',
    endTime: '23:00',
    location: 'Royal Festival Hall & Outdoor Terrace',
    address: 'Belvedere Road, South Bank, London SE1 8XX',
    category: 'Music & Arts',
    price: ANGOLA_LUXURY_PRICING.angolanMusicFestival,
    currency: 'GBP',
    maxAttendees: 300,
    currentAttendees: 220,
    status: 'published',
    allowWaitlist: true,
    maxWaitingList: 75,
    hostName: 'Angola Music United Kingdom & Lusophone Arts Collective',
    hostImage: '/profiles/community/angola-music-collective.jpg',
    imageUrl: '/events/angola/incredible-music-festival.jpg',
    featured: true,
    groupExperience: true,
    requiresApproval: false,
    membershipRequired: 'core',
    ageRestriction: '16+',
    portugueseOrigin: ['Angola', 'All Lusophone'],
    tags: ['Angolan Music', 'Live Performances', 'Music Festival', 'Traditional & Modern', 'Afrobeat', 'Cultural Heritage'],
    highlights: [
      'Multiple stages featuring traditional drumming, kizomba, semba, and kuduro',
      'Contemporary Angolan artists performing afrobeat fusion and modern pop',
      'Traditional instrument workshops with master musicians',
      'Gospel and spiritual music performances showcasing community traditions',
      'Food vendors serving incredible Angolan cuisine throughout the festival',
      'Art installations celebrating Angola\'s musical heritage and modern creativity'
    ],
    whatToExpect: [
      'Full-day celebration of Angola\'s incredible musical diversity',
      'Live performances by both traditional masters and contemporary stars',
      'Interactive experiences where you can try traditional instruments',
      'Cultural exhibitions explaining the history behind each musical style',
      'Community atmosphere where music brings people together'
    ],
    whatToHear: 'The full spectrum of Angolan music - from ancient rhythms to cutting-edge contemporary sounds',
    whatToLearn: 'How Angola\'s musical traditions continue to evolve and influence global music scenes',
    groupSize: 'Large Festival (250-many people)',
    difficulty: 'All Levels',
    averageRating: 4.9,
    totalReviews: 156,
    createdAt: '2024-08-22',
    updatedAt: '2024-08-22',
    exclusivityLevel: 'VIP',
    wealthTier: 'High Net Worth',
    businessSectors: ['Luxury'],
    angolanRegions: ['Luanda', 'Benguela', 'Huambo', 'Lobito'],
    networkingValue: 'Cultural Exchange',
    dresscode: 'Festival Casual',
    venuePrestige: 'City Institution'
  },

  // INCREDIBLE ANGOLAN FOOD CULTURE - Rich Food Traditions That Bring Communities Together
  {
    id: 'angola-muamba-005',
    title: 'Amazing Muamba de Galinha - The Heart of Angolan Family Feasting',
    description: 'Experience the incredible flavors of muamba de galinha - Angola\'s beloved national dish that brings families together around the most amazing flavors! This immersive culinary experience showcases the rich, bold taste that makes Angolan cuisine absolutely irresistible, with master chefs teaching you the secrets of this magnificent dish.',
    date: '2025-11-02',
    time: '17:00',
    endTime: '21:00',
    location: 'Hackney Food Lab - Community Kitchen',
    address: '2 Westgate Street, Hackney, London E8 3RL',
    category: 'Food & Culture',
    price: ANGOLA_LUXURY_PRICING.muambaFeastExperience,
    currency: 'GBP',
    maxAttendees: 24,
    currentAttendees: 18,
    status: 'published',
    allowWaitlist: true,
    maxWaitingList: 12,
    hostName: 'Chef Mama Isabel & Angolan Culinary Masters',
    hostImage: '/profiles/community/angola-chef-isabel.jpg',
    imageUrl: '/events/angola/amazing-muamba-feast.jpg',
    featured: true,
    groupExperience: true,
    requiresApproval: false,
    membershipRequired: 'free',
    ageRestriction: '16+',
    portugueseOrigin: ['Angola', 'All Lusophone'],
    tags: ['Muamba de Galinha', 'Traditional Cooking', 'Angolan Cuisine', 'Family Traditions', 'Bold Flavors', 'Cultural Heritage'],
    highlights: [
      'Learn to prepare authentic muamba de galinha from Angolan grandmothers',
      'Experience the incredible depth of flavor from traditional palm oil and spices',
      'Family-style dining that showcases how food brings Angolan communities together',
      'Traditional accompaniments including funge, calulu, and cassava dishes',
      'Stories about how muamba represents the heart of Angolan hospitality',
      'Take home spice blends and recipes to recreate these amazing flavors'
    ],
    whatToExpect: [
      'Hands-on cooking experience with master Angolan chefs',
      'Learn traditional techniques passed down through generations',
      'Family-style feast celebrating community and Angolan heritage',
      'Understanding of how food creates cultural connections and memories',
      'Authentic ingredients sourced from London\'s best African markets'
    ],
    whatToHear: 'Stories of how muamba de galinha connects Angolan families across generations and continents',
    whatToLearn: 'The authentic preparation of Angola\'s most beloved dish and its cultural significance',
    groupSize: 'Intimate Cooking Community (20-24 people)',
    difficulty: 'Beginner Friendly',
    averageRating: 4.9,
    totalReviews: 87,
    createdAt: '2024-08-22',
    updatedAt: '2024-08-22',
    exclusivityLevel: 'VIP',
    wealthTier: 'High Net Worth',
    businessSectors: ['Luxury'],
    angolanRegions: ['Luanda', 'Benguela', 'Huambo'],
    networkingValue: 'Cultural Exchange',
    dresscode: 'Casual',
    venuePrestige: 'City Institution'
  },

  {
    id: 'angola-nightlife-006',
    title: 'Angolan Nightlife Tour - Discover London\'s Vibrant Angolan Social Scene',
    description: 'Explore the incredible energy of London\'s Angolan nightlife scene! This guided tour takes you through the venues where the community comes alive - from intimate kizomba clubs to vibrant bars serving traditional drinks, experiencing the magnetic social culture that makes Angolan nightlife absolutely irresistible.',
    date: '2025-12-07',
    time: '19:00',
    endTime: '02:00',
    location: 'Multiple Venues - Central & South London',
    address: 'Meeting Point: Elephant & Castle Station, London SE1 6LH',
    category: 'Nightlife & Social',
    price: ANGOLA_LUXURY_PRICING.angolanNightlifeTour,
    currency: 'GBP',
    maxAttendees: 16,
    currentAttendees: 12,
    status: 'published',
    allowWaitlist: true,
    maxWaitingList: 8,
    hostName: 'Angola Nightlife Collective & Local Guides',
    hostImage: '/profiles/community/angola-nightlife-guide.jpg',
    imageUrl: '/events/angola/vibrant-nightlife-tour.jpg',
    featured: true,
    groupExperience: true,
    requiresApproval: true,
    membershipRequired: 'core',
    ageRestriction: '21+',
    portugueseOrigin: ['Angola', 'All Lusophone'],
    tags: ['Nightlife Tour', 'Social Culture', 'Community Venues', 'Traditional Drinks', 'Music & Dancing', 'Cultural Immersion'],
    highlights: [
      'Visit 4-5 authentic venues where London\'s Angolan community socializes',
      'Experience traditional palm wine and modern Angolan cocktails',
      'Live music venues featuring kizomba, semba, and contemporary Angolan artists',
      'Meet local Angolan community leaders and cultural ambassadors',
      'Private transport between venues with cultural commentary',
      'VIP access to exclusive members-only Angolan social clubs'
    ],
    whatToExpect: [
      'Authentic immersion into London\'s thriving Angolan social scene',
      'Mix of traditional venues and modern spaces where the community gathers',
      'Opportunities to dance kizomba and semba with local experts',
      'Tasting experiences featuring traditional Angolan drinks and snacks',
      'Cultural insights into how the Angolan diaspora maintains social connections'
    ],
    whatToHear: 'Stories about how London\'s Angolan community created their own vibrant social spaces and cultural gathering points',
    whatToLearn: 'How Angolan social traditions adapt and thrive in London\'s multicultural environment',
    groupSize: 'Intimate Tour Group (12-16 people)',
    difficulty: 'Moderate',
    averageRating: 4.8,
    totalReviews: 64,
    createdAt: '2024-08-22',
    updatedAt: '2024-08-22',
    exclusivityLevel: 'VIP',
    wealthTier: 'High Net Worth',
    businessSectors: ['Luxury'],
    angolanRegions: ['Luanda', 'Benguela'],
    networkingValue: 'Cultural Exchange',
    dresscode: 'Smart Casual',
    venuePrestige: 'City Institution'
  },

  {
    id: 'angola-drumming-007',
    title: 'Angolan Community Drumming Circle - Powerful Traditional Percussion',
    description: 'Feel the incredible power of traditional Angolan drumming in this community percussion experience! Learn the rhythms that form the heartbeat of Angolan culture, with master drummers teaching you the traditional beats that have connected communities for generations. This magnetic experience showcases the communal spirit that makes Angolan drumming absolutely captivating.',
    date: '2025-12-14',
    time: '14:00',
    endTime: '17:00',
    location: 'Rich Mix Cultural Centre',
    address: '35-47 Bethnal Green Road, Bethnal Green, London E1 6LA',
    category: 'Music & Culture',
    price: ANGOLA_LUXURY_PRICING.culturalDrummingCircle,
    currency: 'GBP',
    maxAttendees: 30,
    currentAttendees: 22,
    status: 'published',
    allowWaitlist: true,
    maxWaitingList: 15,
    hostName: 'Mestre António & Traditional Drummers Collective',
    hostImage: '/profiles/community/angola-drum-master.jpg',
    imageUrl: '/events/angola/powerful-drumming-circle.jpg',
    featured: true,
    groupExperience: true,
    requiresApproval: false,
    membershipRequired: 'free',
    ageRestriction: '12+',
    portugueseOrigin: ['Angola', 'All Lusophone'],
    tags: ['Traditional Drumming', 'Community Music', 'Percussion Circle', 'Cultural Heritage', 'Group Experience', 'All Ages'],
    highlights: [
      'Learn traditional Angolan drumming rhythms from master musicians',
      'Experience the power of group percussion in creating community bonds',
      'Traditional instruments including djembé, ngoma, and hand percussion',
      'Storytelling about the cultural significance of different rhythms',
      'Group improvisation sessions that showcase the magic of collective music',
      'Take home basic rhythms and percussion techniques'
    ],
    whatToExpect: [
      'Hands-on learning with traditional Angolan percussion instruments',
      'Master drummers sharing the cultural history behind each rhythm',
      'Group circle where everyone contributes to the collective music',
      'Family-friendly atmosphere welcoming all skill levels',
      'Understanding of how drumming connects Angolan communities globally'
    ],
    whatToHear: 'The powerful rhythms that have been the heartbeat of Angolan communities for centuries',
    whatToLearn: 'Basic Angolan drumming techniques and the cultural meaning behind traditional rhythms',
    groupSize: 'Community Circle (25-30 people)',
    difficulty: 'All Levels',
    averageRating: 4.9,
    totalReviews: 73,
    createdAt: '2024-08-22',
    updatedAt: '2024-08-22',
    exclusivityLevel: 'VIP',
    wealthTier: 'High Net Worth',
    businessSectors: ['Luxury'],
    angolanRegions: ['Luanda', 'Huambo', 'Benguela'],
    networkingValue: 'Cultural Exchange',
    dresscode: 'Casual',
    venuePrestige: 'City Institution'
  },

  {
    id: 'angola-street-food-008',
    title: 'Angolan Street Food Journey - Bold Urban Flavors & Community Culture',
    description: 'Discover the incredible bold flavors of Angolan street food culture! This guided food adventure explores London\'s African markets and restaurants, showcasing the vibrant urban food scene that makes Angolan cuisine absolutely irresistible. From pastéis to grilled fish, experience the authentic flavors that bring communities together.',
    date: '2025-12-21',
    time: '12:00',
    endTime: '16:00',
    location: 'Brixton Market & South London African Quarter',
    address: 'Brixton Station Road, Brixton, London SW9 8PD',
    category: 'Food & Culture',
    price: ANGOLA_LUXURY_PRICING.angolanStreetFoodJourney,
    currency: 'GBP',
    maxAttendees: 20,
    currentAttendees: 14,
    status: 'published',
    allowWaitlist: true,
    maxWaitingList: 10,
    hostName: 'Chef Miguel & Street Food Cultural Guides',
    hostImage: '/profiles/community/angola-street-food-guide.jpg',
    imageUrl: '/events/angola/bold-street-food-journey.jpg',
    featured: true,
    groupExperience: true,
    requiresApproval: false,
    membershipRequired: 'free',
    ageRestriction: '16+',
    portugueseOrigin: ['Angola', 'All Lusophone'],
    tags: ['Street Food', 'Urban Culture', 'Market Tour', 'Bold Flavors', 'Community Food', 'Cultural Immersion'],
    highlights: [
      'Taste authentic Angolan street foods at London\'s best African markets',
      'Learn about the bold spices and ingredients that make Angolan food incredible',
      'Meet Angolan vendors and restaurant owners sharing their culinary heritage',
      'Experience how food creates community connections in urban environments',
      'Discover where to find authentic Angolan ingredients in London',
      'Traditional drinks including fresh palm wine and tropical fruit juices'
    ],
    whatToExpect: [
      'Guided tour through London\'s most authentic African food markets',
      'Multiple tasting stops featuring different Angolan specialties',
      'Cultural stories about how street food traditions traveled from Angola to London',
      'Opportunities to purchase authentic spices and ingredients',
      'Understanding of how food builds cultural bridges in diaspora communities'
    ],
    whatToHear: 'Stories from Angolan vendors about bringing authentic flavors to London\'s diverse food scene',
    whatToLearn: 'How to identify and source authentic Angolan ingredients for home cooking',
    groupSize: 'Market Tour Group (16-20 people)',
    difficulty: 'Easy',
    averageRating: 4.8,
    totalReviews: 91,
    createdAt: '2024-08-22',
    updatedAt: '2024-08-22',
    exclusivityLevel: 'VIP',
    wealthTier: 'High Net Worth',
    businessSectors: ['Luxury'],
    angolanRegions: ['Luanda', 'Lobito'],
    networkingValue: 'Cultural Exchange',
    dresscode: 'Casual',
    venuePrestige: 'City Institution'
  }
]

// Filter functions for Angola luxury events
export const getAngolaEventsByWealthTier = (tier: AngolaLuxuryEvent['wealthTier']): AngolaLuxuryEvent[] => {
  return angolaLuxuryEvents.filter(event => event.wealthTier === tier)
}

export const getAngolaEventsByBusinessSector = (sector: AngolaLuxuryEvent['businessSectors'][0]): AngolaLuxuryEvent[] => {
  return angolaLuxuryEvents.filter(event => 
    event.businessSectors?.includes(sector)
  )
}

export const getAngolaEventsByExclusivity = (level: AngolaLuxuryEvent['exclusivityLevel']): AngolaLuxuryEvent[] => {
  return angolaLuxuryEvents.filter(event => event.exclusivityLevel === level)
}

export const getAngolaUpcomingEvents = (): AngolaLuxuryEvent[] => {
  const now = new Date()
  return angolaLuxuryEvents
    .filter(event => new Date(event.date) > now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

export const getAngolaFeaturedEvents = (): AngolaLuxuryEvent[] => {
  return angolaLuxuryEvents.filter(event => event.featured)
}

export const getAngolaEventsByRegion = (region: AngolaLuxuryEvent['angolanRegions'][0]): AngolaLuxuryEvent[] => {
  return angolaLuxuryEvents.filter(event => 
    event.angolanRegions?.includes(region)
  )
}

// Premium networking and cultural exchange events for London-based Angola diaspora
export const getAngolaNetworkingEvents = (): AngolaLuxuryEvent[] => {
  return angolaLuxuryEvents.filter(event => 
    event.networkingValue === 'Business Development' || 
    event.networkingValue === 'Investment Opportunities'
  )
}

export const getAngolaCulturalEvents = (): AngolaLuxuryEvent[] => {
  return angolaLuxuryEvents.filter(event => 
    event.networkingValue === 'Cultural Exchange' || 
    event.networkingValue === 'Elite Social'
  )
}