'use client'

import { Event, eventService } from '@/lib/events'
import { ROUTES } from '@/config/routes'

export interface SearchResult {
  id: string
  type: 'event' | 'business' | 'group' | 'page' | 'service'
  title: string
  description: string
  url: string
  location?: string
  date?: string
  category?: string
  tags?: string[]
  image?: string
  price?: number
  rating?: number
}

// Mock business data for search
const mockBusinesses = [
  {
    id: 'business-1',
    name: 'Nata Lisboa',
    description: 'Authentic Portuguese pastéis de nata bakery in Borough Market',
    category: 'Food & Drink',
    location: 'Borough Market, London',
    url: '/business-directory/nata-lisboa',
    image: '/images/businesses/nata-lisboa.jpg',
    rating: 4.8,
    tags: ['pastéis de nata', 'portuguese bakery', 'borough market', 'desserts', 'coffee']
  },
  {
    id: 'business-2',
    name: 'Casa do Fado',
    description: 'Traditional Portuguese restaurant with live Fado performances',
    category: 'Restaurant',
    location: 'Vauxhall, London',
    url: '/business-directory/casa-do-fado',
    image: '/images/businesses/casa-do-fado.jpg',
    rating: 4.6,
    tags: ['fado', 'portuguese restaurant', 'live music', 'traditional', 'dinner']
  },
  {
    id: 'business-3',
    name: 'Portuguese Language Academy',
    description: 'Professional Portuguese language courses for all levels',
    category: 'Education',
    location: 'Camden, London',
    url: '/business-directory/portuguese-language-academy',
    image: '/images/businesses/language-academy.jpg',
    rating: 4.9,
    tags: ['portuguese lessons', 'language learning', 'education', 'classes', 'tutoring']
  },
  {
    id: 'business-4',
    name: 'Lusitânia Market',
    description: 'Specialized Portuguese grocery store and delicatessen',
    category: 'Grocery',
    location: 'Stockwell, London',
    url: '/business-directory/lusitania-market',
    image: '/images/businesses/lusitania-market.jpg',
    rating: 4.7,
    tags: ['portuguese food', 'grocery', 'delicatessen', 'imported goods', 'stockwell']
  }
]

// Mock groups data
const mockGroups = [
  {
    id: 'group-1',
    name: 'Portuguese Professionals Network',
    description: 'Networking group for Portuguese-speaking professionals in London',
    category: 'Professional',
    location: 'London',
    url: '/groups/portuguese-professionals-network',
    image: '/images/groups/professionals.jpg',
    memberCount: 245,
    tags: ['networking', 'professionals', 'career', 'business', 'london']
  },
  {
    id: 'group-2',
    name: 'Young Portuguese in London',
    description: 'Social group for Portuguese speakers aged 18-35 living in London',
    category: 'Social',
    location: 'London',
    url: '/groups/young-portuguese-london',
    image: '/images/groups/young-portuguese.jpg',
    memberCount: 182,
    tags: ['young adults', 'social', 'friends', '18-35', 'activities']
  },
  {
    id: 'group-3',
    name: 'Portuguese Football Fans',
    description: 'Watch Portuguese national team matches and Premier League games together',
    category: 'Sports',
    location: 'Various Pubs',
    url: '/groups/portuguese-football-fans',
    image: '/images/groups/football.jpg',
    memberCount: 156,
    tags: ['football', 'sports', 'national team', 'premier league', 'pubs']
  }
]

// Premium services data for search
const premiumServices = [
  {
    id: 'service-executive-transport',
    name: 'Executive Transport Services',
    description: 'Professional transport services with Portuguese cultural expertise',
    category: 'Transportation',
    location: 'London & UK',
    url: '/services#executive-transport',
    image: 'https://res.cloudinary.com/dqhbeqttp/image/upload/v1734535200/executive-transport-london_dlqxkx.jpg',
    price: 35,
    rating: 4.8,
    tags: ['executive transport', 'professional driver', 'premium vehicles', 'airport transfer', 'business transport']
  },
  {
    id: 'service-close-protection',
    name: 'Close Protection Services',
    description: 'SIA-licensed CPOs providing discrete, culturally-aware security',
    category: 'Security',
    location: 'London & UK',
    url: '/services#close-protection',
    image: 'https://res.cloudinary.com/dqhbeqttp/image/upload/v1734535200/close-protection-london_dlqxkx.jpg',
    price: 800,
    rating: 5.0,
    tags: ['close protection', 'security', 'sia licensed', 'vip escort', 'personal protection']
  },
  {
    id: 'service-transport-sia',
    name: 'Transport & SIA Compliance',
    description: 'Comprehensive transport services with full SIA compliance and luxury fleet',
    category: 'Premium Transport',
    location: 'London & UK',
    url: '/transport',
    image: 'https://res.cloudinary.com/dqhbeqttp/image/upload/v1734535200/premium-security-service_dlqxkx.jpg',
    price: 75,
    rating: 4.9,
    tags: ['transport', 'sia compliance', 'luxury fleet', 'security transport', 'bentley', 'mercedes']
  }
]

// Mock pages/content data
const mockPages = [
  {
    id: 'events-page',
    title: 'Events & Tours',
    description: 'Discover Portuguese cultural events, tours, and activities in London',
  url: ROUTES.events,
    category: 'Navigation',
    tags: ['events', 'tours', 'activities', 'culture', 'social calendar']
  },
  {
    id: 'business-directory',
    title: 'Portuguese Business Directory',
    description: 'Find Portuguese-owned businesses and services in London',
    url: '/business-directory',
    category: 'Directory',
    tags: ['businesses', 'services', 'directory', 'portuguese owned', 'support local']
  },
  {
    id: 'community-guidelines',
    title: 'Community Guidelines',
    description: 'Learn about our community standards and membership guidelines',
    url: '/community-guidelines',
    category: 'Support',
    tags: ['guidelines', 'rules', 'community standards', 'membership', 'safety']
  },
  {
    id: 'help',
    title: 'Help & Support',
    description: 'Get help with your LusoTown account and find answers to common questions',
    url: '/help',
    category: 'Support',
    tags: ['help', 'support', 'faq', 'account', 'assistance']
  },
  {
    id: 'pricing',
    title: 'Membership Pricing',
    description: 'Explore our membership plans and find the perfect fit for your Portuguese social calendar',
    url: '/pricing',
    category: 'Membership',
    tags: ['pricing', 'membership', 'plans', 'subscription', 'premium']
  },
  {
    id: 'safety',
    title: 'Safety Center',
    description: 'Learn about our safety measures and how to stay safe in the Portuguese community',
    url: '/safety',
    category: 'Safety',
    tags: ['safety', 'security', 'protection', 'community safety', 'guidelines']
  }
]

// Text similarity function for search ranking
function calculateSimilarity(searchTerm: string, text: string): number {
  const search = searchTerm.toLowerCase()
  const target = text.toLowerCase()
  
  // Exact match gets highest score
  if (target.includes(search)) {
    const index = target.indexOf(search)
    // Bonus for matches at the beginning
    const positionBonus = index === 0 ? 0.5 : 0
    // Bonus for whole word matches
    const wordBonus = target.split(' ').some(word => word.includes(search)) ? 0.3 : 0
    return 1 + positionBonus + wordBonus
  }
  
  // Partial word matches
  const searchWords = search.split(' ')
  const targetWords = target.split(' ')
  let matchScore = 0
  
  for (const searchWord of searchWords) {
    for (const targetWord of targetWords) {
      if (targetWord.includes(searchWord) || searchWord.includes(targetWord)) {
        matchScore += 0.3
      }
    }
  }
  
  return matchScore
}

// Search through events
export async function searchEvents(query: string): Promise<SearchResult[]> {
  try {
    const events = await eventService.getEvents()
    const searchTerm = query.toLowerCase().trim()
    
    if (!searchTerm) return []
    
    const results: Array<SearchResult & { score: number }> = []
    
    for (const event of events) {
      let score = 0
      
      // Search in title
      score += calculateSimilarity(searchTerm, event.title) * 3
      
      // Search in description
      score += calculateSimilarity(searchTerm, event.description) * 2
      score += calculateSimilarity(searchTerm, event.longDescription) * 1.5
      
      // Search in location
      if (event.location) {
        score += calculateSimilarity(searchTerm, event.location) * 2
      }
      
      // Search in category
      score += calculateSimilarity(searchTerm, event.category) * 1.5
      
      // Search in tags
      for (const tag of event.tags || []) {
        score += calculateSimilarity(searchTerm, tag) * 1
      }
      
      // Search in host name
      if (event.hostName) {
        score += calculateSimilarity(searchTerm, event.hostName) * 1
      }
      
      if (score > 0.5) {
        results.push({
          id: event.id,
          type: 'event',
          title: event.title,
          description: event.description,
          url: `/events/${event.id}`,
          location: event.location,
          date: event.date,
          category: event.category,
          tags: event.tags,
          image: event.images?.[0],
          price: event.price,
          score
        })
      }
    }
    
    // Sort by relevance score and return top results
    return results
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map(({ score, ...result }) => result)
      
  } catch (error) {
    console.error('Error searching events:', error)
    return []
  }
}

// Search through businesses, groups, and pages
export async function searchContent(query: string): Promise<SearchResult[]> {
  const searchTerm = query.toLowerCase().trim()
  
  if (!searchTerm) return []
  
  const results: Array<SearchResult & { score: number }> = []
  
  // Search businesses
  for (const business of mockBusinesses) {
    let score = 0
    
    score += calculateSimilarity(searchTerm, business.name) * 3
    score += calculateSimilarity(searchTerm, business.description) * 2
    score += calculateSimilarity(searchTerm, business.category) * 1.5
    score += calculateSimilarity(searchTerm, business.location) * 2
    
    for (const tag of business.tags) {
      score += calculateSimilarity(searchTerm, tag) * 1
    }
    
    if (score > 0.5) {
      results.push({
        id: business.id,
        type: 'business',
        title: business.name,
        description: business.description,
        url: business.url,
        location: business.location,
        category: business.category,
        tags: business.tags,
        image: business.image,
        rating: business.rating,
        score
      })
    }
  }
  
  // Search groups
  for (const group of mockGroups) {
    let score = 0
    
    score += calculateSimilarity(searchTerm, group.name) * 3
    score += calculateSimilarity(searchTerm, group.description) * 2
    score += calculateSimilarity(searchTerm, group.category) * 1.5
    score += calculateSimilarity(searchTerm, group.location) * 1
    
    for (const tag of group.tags) {
      score += calculateSimilarity(searchTerm, tag) * 1
    }
    
    if (score > 0.5) {
      results.push({
        id: group.id,
        type: 'group',
        title: group.name,
        description: group.description,
        url: group.url,
        location: group.location,
        category: group.category,
        tags: group.tags,
        image: group.image,
        score
      })
    }
  }
  
  // Search premium services
  for (const service of premiumServices) {
    let score = 0
    
    score += calculateSimilarity(searchTerm, service.name) * 3
    score += calculateSimilarity(searchTerm, service.description) * 2
    score += calculateSimilarity(searchTerm, service.category) * 1.5
    score += calculateSimilarity(searchTerm, service.location) * 1
    
    for (const tag of service.tags) {
      score += calculateSimilarity(searchTerm, tag) * 1
    }
    
    if (score > 0.5) {
      results.push({
        id: service.id,
        type: 'service',
        title: service.name,
        description: service.description,
        url: service.url,
        location: service.location,
        category: service.category,
        tags: service.tags,
        image: service.image,
        price: service.price,
        rating: service.rating,
        score
      })
    }
  }

  // Search pages
  for (const page of mockPages) {
    let score = 0
    
    score += calculateSimilarity(searchTerm, page.title) * 3
    score += calculateSimilarity(searchTerm, page.description) * 2
    score += calculateSimilarity(searchTerm, page.category) * 1.5
    
    for (const tag of page.tags) {
      score += calculateSimilarity(searchTerm, tag) * 1
    }
    
    if (score > 0.5) {
      results.push({
        id: page.id,
        type: 'page',
        title: page.title,
        description: page.description,
        url: page.url,
        category: page.category,
        tags: page.tags,
        score
      })
    }
  }
  
  // Sort by relevance score and return top results
  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, 15)
    .map(({ score, ...result }) => result)
}

// Combined search function
export async function search(query: string): Promise<{
  events: SearchResult[]
  businesses: SearchResult[]
  groups: SearchResult[]
  pages: SearchResult[]
  all: SearchResult[]
}> {
  const [eventResults, contentResults] = await Promise.all([
    searchEvents(query),
    searchContent(query)
  ])
  
  const businesses = contentResults.filter(r => r.type === 'business')
  const groups = contentResults.filter(r => r.type === 'group')
  const pages = contentResults.filter(r => r.type === 'page')
  
  const all = [...eventResults, ...contentResults]
    .sort((a, b) => {
      // Priority order: events, businesses, groups, pages
      const typeOrder = { event: 0, business: 1, group: 2, page: 3 }
      const aOrder = typeOrder[a.type as keyof typeof typeOrder] || 4
      const bOrder = typeOrder[b.type as keyof typeof typeOrder] || 4
      
      if (aOrder !== bOrder) {
        return aOrder - bOrder
      }
      
      // Within same type, sort by relevance (already sorted in individual searches)
      return 0
    })
  
  return {
    events: eventResults,
    businesses,
    groups,
    pages,
    all
  }
}

// Popular search suggestions
export function getPopularSearches(language: 'en' | 'pt' = 'en'): string[] {
  if (language === 'pt') {
    return [
      'eventos portugueses',
      'restaurantes portugueses',
      'fado',
      'pastel de nata',
      'futebol',
      'networking',
      'jovens portugueses',
      'negócios portugueses',
      'cultura portuguesa',
      'língua portuguesa'
    ]
  }
  
  return [
    'portuguese events',
    'fado music',
    'portuguese restaurants',
    'networking',
    'young portuguese',
    'football',
    'pastéis de nata',
    'portuguese businesses',
    'cultural events',
    'language exchange'
  ]
}

// Search categories for filtering
export function getSearchCategories(language: 'en' | 'pt' = 'en'): Array<{
  id: string
  label: string
  type: SearchResult['type'][]
}> {
  if (language === 'pt') {
    return [
      { id: 'all', label: 'Todos', type: ['event', 'business', 'group', 'page'] },
      { id: 'events', label: 'Eventos', type: ['event'] },
      { id: 'businesses', label: 'Negócios', type: ['business'] },
      { id: 'groups', label: 'Grupos', type: ['group'] },
      { id: 'pages', label: 'Páginas', type: ['page'] }
    ]
  }
  
  return [
    { id: 'all', label: 'All', type: ['event', 'business', 'group', 'page'] },
    { id: 'events', label: 'Events', type: ['event'] },
    { id: 'businesses', label: 'Businesses', type: ['business'] },
    { id: 'groups', label: 'Groups', type: ['group'] },
    { id: 'pages', label: 'Pages', type: ['page'] }
  ]
}