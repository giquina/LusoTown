'use client'

import { buildUnsplashUrl } from '@/config';
import { UserProfile, connectionService } from '@/lib/connections'
import { getImageWithFallback } from '@/lib/profileImages'

export interface DirectoryFilters {
  search?: string
  location?: string[]
  interests?: string[]
  membershipTier?: 'free' | 'core' | 'premium' | 'all'
  ageRange?: { min: number; max: number }
  lookingFor?: 'friendship' | 'activity_partners' | 'networking' | 'all'
  isOnline?: boolean
  joinedRecently?: boolean // within last 30 days
  hasPhotos?: boolean
  sortBy?: 'newest' | 'active' | 'connections' | 'alphabetical' | 'age'
}

export interface MemberStats {
  totalMembers: number
  onlineNow: number
  newThisMonth: number
  byMembershipTier: {
    free: number
    core: number
    premium: number
  }
  byLocation: { [location: string]: number }
  averageAge: number
  topInterests: { interest: string; count: number }[]
}

// Extended user profiles with more directory-specific data
export const mockDirectoryProfiles: UserProfile[] = [
  {
    id: 'user-001',
    name: 'Rachel Green',
    age: 34,
    location: 'Chelsea, London',
    bio: 'Marketing professional who loves wine tasting, book clubs, and exploring London\'s hidden gems. Always up for trying new restaurants and making genuine connections!',
    interests: ['Wine Tasting', 'Books', 'Marketing', 'Food', 'Travel', 'Photography'],
    profileImage: getImageWithFallback('rachel-green'),
    membershipTier: 'core',
    joinedAt: '2024-01-15T10:00:00Z',
    lastActive: '2024-01-26T14:30:00Z',
    isOnline: true,
    eventsAttended: 12,
    connectionsCount: 28,
    badges: [
      { id: 'badge-1', name: 'Event Enthusiast', description: 'Attended 10+ events', icon: '🎉', color: 'purple', earnedAt: '2024-01-20T10:00:00Z' },
      { id: 'badge-2', name: 'Community Builder', description: 'Made 25+ connections', icon: '🤝', color: 'blue', earnedAt: '2024-01-25T10:00:00Z' }
    ],
    photos: [
      { id: 'photo-1', url: buildUnsplashUrl('1556909114-f6e7ad7d3136'), caption: 'Wine tasting in Tuscany!', isProfilePicture: false, uploadedAt: '2024-01-20T10:00:00Z', likes: 12, comments: [] },
      { id: 'photo-2', url: buildUnsplashUrl('1507003211169-0a1dd7228f2d'), caption: 'Book club meetup', isProfilePicture: false, uploadedAt: '2024-01-22T10:00:00Z', likes: 8, comments: [] }
    ],
    preferences: {
      lookingFor: 'friendship',
      ageRange: { min: 30, max: 45 },
      location: ['Chelsea', 'Kensington', 'Central London'],
      interests: ['Wine', 'Books', 'Food', 'Culture']
    },
    privacy: {
      showAge: true,
      showLocation: true,
      allowMessages: 'connections',
      profileVisibility: 'members_only'
    },
    verification: {
      emailVerified: true,
      phoneVerified: true,
      photoVerified: true,
      backgroundChecked: false
    }
  },
  {
    id: 'user-002',
    name: 'Emma Wilson',
    age: 31,
    location: 'Kensington, London',
    bio: 'Yoga instructor and wellness coach passionate about mindful living, hiking, and connecting with like-minded women. Love organizing outdoor adventures and cozy coffee chats.',
    interests: ['Yoga', 'Wellness', 'Hiking', 'Mindfulness', 'Coffee', 'Nature'],
    profileImage: getImageWithFallback('emma-wilson'),
    membershipTier: 'premium',
    joinedAt: '2024-01-08T09:00:00Z',
    lastActive: '2024-01-26T16:45:00Z',
    isOnline: false,
    eventsAttended: 18,
    connectionsCount: 42,
    badges: [
      { id: 'badge-3', name: 'Wellness Guru', description: 'Organized 5+ wellness events', icon: '🧘‍♀️', color: 'green', earnedAt: '2024-01-18T10:00:00Z' },
      { id: 'badge-4', name: 'Super Connector', description: 'Made 40+ connections', icon: '⭐', color: 'gold', earnedAt: '2024-01-24T10:00:00Z' }
    ],
    photos: [
      { id: 'photo-3', url: buildUnsplashUrl('1506629905607-683b607dfc6e'), caption: 'Morning yoga in Hyde Park', isProfilePicture: false, uploadedAt: '2024-01-15T10:00:00Z', likes: 24, comments: [] },
      { id: 'photo-4', url: buildUnsplashUrl('1551632811-561732d1e306'), caption: 'Hiking in the Cotswolds', isProfilePicture: false, uploadedAt: '2024-01-18T10:00:00Z', likes: 18, comments: [] }
    ],
    preferences: {
      lookingFor: 'all',
      ageRange: { min: 28, max: 40 },
      location: ['Kensington', 'Chelsea', 'Notting Hill'],
      interests: ['Yoga', 'Wellness', 'Outdoor', 'Mindfulness']
    },
    privacy: {
      showAge: false,
      showLocation: true,
      allowMessages: 'everyone',
      profileVisibility: 'public'
    },
    verification: {
      emailVerified: true,
      phoneVerified: true,
      photoVerified: true,
      backgroundChecked: true
    }
  },
  {
    id: 'user-003',
    name: 'Sophia Martinez',
    age: 36,
    location: 'Canary Wharf, London',
    bio: 'Tech consultant who enjoys fitness classes, art galleries, and weekend getaways. Looking to expand my social circle with ambitious, fun-loving women.',
    interests: ['Technology', 'Fitness', 'Art', 'Travel', 'Business', 'Museums'],
    profileImage: getImageWithFallback('sophia-martinez'),
    membershipTier: 'core',
    joinedAt: '2024-01-12T14:00:00Z',
    lastActive: '2024-01-26T12:20:00Z',
    isOnline: true,
    eventsAttended: 8,
    connectionsCount: 19,
    badges: [
      { id: 'badge-5', name: 'Tech Pioneer', description: 'Attended tech networking events', icon: '💻', color: 'blue', earnedAt: '2024-01-22T10:00:00Z' }
    ],
    photos: [
      { id: 'photo-5', url: buildUnsplashUrl('1560250097-0b93528c311a'), caption: 'Tech conference networking', isProfilePicture: false, uploadedAt: '2024-01-16T10:00:00Z', likes: 15, comments: [] }
    ],
    preferences: {
      lookingFor: 'networking',
      ageRange: { min: 30, max: 50 },
      location: ['Canary Wharf', 'City of London', 'Central London'],
      interests: ['Tech', 'Business', 'Art', 'Fitness']
    },
    privacy: {
      showAge: true,
      showLocation: true,
      allowMessages: 'connections',
      profileVisibility: 'members_only'
    },
    verification: {
      emailVerified: true,
      phoneVerified: false,
      photoVerified: true,
      backgroundChecked: false
    }
  },
  {
    id: 'user-004',
    name: 'Olivia Taylor',
    age: 33,
    location: 'Shoreditch, London',
    bio: 'Creative director with a passion for photography, indie music, and discovering London\'s best brunch spots. Always ready for spontaneous adventures!',
    interests: ['Photography', 'Music', 'Brunch', 'Design', 'Art', 'Culture'],
    profileImage: getImageWithFallback('olivia-taylor'),
    membershipTier: 'premium',
    joinedAt: '2024-01-10T11:00:00Z',
    lastActive: '2024-01-26T15:10:00Z',
    isOnline: false,
    eventsAttended: 15,
    connectionsCount: 35,
    badges: [
      { id: 'badge-6', name: 'Creative Soul', description: 'Active in arts & culture events', icon: '🎨', color: 'purple', earnedAt: '2024-01-19T10:00:00Z' },
      { id: 'badge-7', name: 'Social Butterfly', description: 'Attended 15+ social events', icon: '🦋', color: 'pink', earnedAt: '2024-01-23T10:00:00Z' }
    ],
    photos: [
      { id: 'photo-6', url: buildUnsplashUrl('1541961017774-22349e4a1262'), caption: 'Street art tour in Shoreditch', isProfilePicture: false, uploadedAt: '2024-01-14T10:00:00Z', likes: 32, comments: [] },
      { id: 'photo-7', url: buildUnsplashUrl('1522512115668-c09775d6f424'), caption: 'Behind the scenes at a photoshoot', isProfilePicture: false, uploadedAt: '2024-01-21T10:00:00Z', likes: 28, comments: [] }
    ],
    preferences: {
      lookingFor: 'activity_partners',
      ageRange: { min: 28, max: 42 },
      location: ['Shoreditch', 'Hackney', 'East London'],
      interests: ['Photography', 'Music', 'Art', 'Food']
    },
    privacy: {
      showAge: true,
      showLocation: true,
      allowMessages: 'premium',
      profileVisibility: 'public'
    },
    verification: {
      emailVerified: true,
      phoneVerified: true,
      photoVerified: true,
      backgroundChecked: true
    }
  },
  {
    id: 'user-005',
    name: 'Ava Davis',
    age: 29,
    location: 'Clapham, London',
    bio: 'Recently moved to London from Manchester! Love dancing, trying new cuisines, and weekend farmers markets. Excited to build a new community here.',
    interests: ['Dancing', 'Food', 'Markets', 'Fitness', 'Socializing', 'Exploring'],
    profileImage: getImageWithFallback('ava-davis'),
    membershipTier: 'free',
    joinedAt: '2024-01-24T16:00:00Z',
    lastActive: '2024-01-26T18:20:00Z',
    isOnline: true,
    eventsAttended: 2,
    connectionsCount: 7,
    badges: [
      { id: 'badge-8', name: 'New Member', description: 'Welcome to LusoTown!', icon: '👋', color: 'green', earnedAt: '2024-01-24T16:00:00Z' }
    ],
    photos: [
      { id: 'photo-8', url: buildUnsplashUrl('1506629905607-683b607dfc6e'), caption: 'First London weekend market!', isProfilePicture: false, uploadedAt: '2024-01-25T10:00:00Z', likes: 5, comments: [] }
    ],
    preferences: {
      lookingFor: 'friendship',
      ageRange: { min: 25, max: 35 },
      location: ['Clapham', 'South London', 'Central London'],
      interests: ['Dancing', 'Food', 'Social', 'Active']
    },
    privacy: {
      showAge: true,
      showLocation: true,
      allowMessages: 'everyone',
      profileVisibility: 'members_only'
    },
    verification: {
      emailVerified: true,
      phoneVerified: false,
      photoVerified: true,
      backgroundChecked: false
    }
  },
  {
    id: 'user-006',
    name: 'Chloe Brown',
    age: 38,
    location: 'Hampstead, London',
    bio: 'Environmental consultant and sustainability advocate. Love book clubs, theater, and quiet coffees. Looking for meaningful friendships with other women who care about making a difference.',
    interests: ['Environment', 'Books', 'Theater', 'Coffee', 'Sustainability', 'Mental Health'],
    profileImage: getImageWithFallback('chloe-brown'),
    membershipTier: 'core',
    joinedAt: '2024-01-20T12:00:00Z',
    lastActive: '2024-01-26T09:30:00Z',
    isOnline: false,
    eventsAttended: 4,
    connectionsCount: 12,
    badges: [
      { id: 'badge-9', name: 'Thoughtful Contributor', description: 'Shared valuable insights', icon: '💭', color: 'blue', earnedAt: '2024-01-25T10:00:00Z' }
    ],
    photos: [],
    preferences: {
      lookingFor: 'friendship',
      ageRange: { min: 32, max: 45 },
      location: ['Hampstead', 'North London', 'Central London'],
      interests: ['Books', 'Culture', 'Psychology', 'Support']
    },
    privacy: {
      showAge: true,
      showLocation: true,
      allowMessages: 'connections',
      profileVisibility: 'members_only'
    },
    verification: {
      emailVerified: true,
      phoneVerified: true,
      photoVerified: true,
      backgroundChecked: true
    }
  }
]

// Common London areas for filtering
export const LONDON_AREAS = [
  'Central London',
  'Chelsea',
  'Kensington',
  'Notting Hill',
  'Mayfair',
  'Marylebone',
  'Covent Garden',
  'Shoreditch',
  'Hackney',
  'East London',
  'Canary Wharf',
  'City of London',
  'Clapham',
  'South London',
  'Hampstead',
  'North London',
  'West London',
  'Camden'
]

// Common interests for filtering
export const COMMON_INTERESTS = [
  'Wine Tasting',
  'Books',
  'Fitness',
  'Yoga',
  'Art',
  'Photography',
  'Music',
  'Food',
  'Travel',
  'Technology',
  'Business',
  'Wellness',
  'Dancing',
  'Theater',
  'Coffee',
  'Culture',
  'Hiking',
  'Museums',
  'Design',
  'Mindfulness',
  'Psychology',
  'Nature',
  'Socializing'
]

export class DirectoryService {
  private static instance: DirectoryService
  private profiles: UserProfile[] = []

  static getInstance(): DirectoryService {
    if (!DirectoryService.instance) {
      DirectoryService.instance = new DirectoryService()
    }
    return DirectoryService.instance
  }

  constructor() {
    this.loadMockData()
  }

  private loadMockData() {
    this.profiles = [...mockDirectoryProfiles]
  }

  // Main search and filter method
  async searchMembers(
    currentUserId: string,
    filters: DirectoryFilters = {},
    page: number = 1,
    limit: number = 20
  ): Promise<{
    members: UserProfile[]
    total: number
    hasMore: boolean
    stats: MemberStats
  }> {
    let filteredProfiles = this.profiles.filter(profile => {
      // Exclude current user
      if (profile.id === currentUserId) return false
      
      // Respect privacy settings
      if (profile.privacy.profileVisibility === 'connections_only') {
        // In real app, check if user is connected
        return false
      }
      
      return true
    })

    // Apply filters
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filteredProfiles = filteredProfiles.filter(profile =>
        profile.name.toLowerCase().includes(searchLower) ||
        profile.bio.toLowerCase().includes(searchLower) ||
        profile.interests.some(interest => 
          interest.toLowerCase().includes(searchLower)
        )
      )
    }

    if (filters.location && filters.location.length > 0) {
      filteredProfiles = filteredProfiles.filter(profile =>
        filters.location!.some(location =>
          profile.location.toLowerCase().includes(location.toLowerCase())
        )
      )
    }

    if (filters.interests && filters.interests.length > 0) {
      filteredProfiles = filteredProfiles.filter(profile =>
        profile.interests.some(interest =>
          filters.interests!.some(filterInterest =>
            interest.toLowerCase().includes(filterInterest.toLowerCase())
          )
        )
      )
    }

    if (filters.membershipTier && filters.membershipTier !== 'all') {
      filteredProfiles = filteredProfiles.filter(profile =>
        profile.membershipTier === filters.membershipTier
      )
    }

    if (filters.ageRange) {
      filteredProfiles = filteredProfiles.filter(profile =>
        profile.privacy.showAge &&
        profile.age >= filters.ageRange!.min &&
        profile.age <= filters.ageRange!.max
      )
    }

    if (filters.lookingFor && filters.lookingFor !== 'all') {
      filteredProfiles = filteredProfiles.filter(profile =>
        profile.preferences.lookingFor === filters.lookingFor ||
        profile.preferences.lookingFor === 'all'
      )
    }

    if (filters.isOnline) {
      filteredProfiles = filteredProfiles.filter(profile => profile.isOnline)
    }

    if (filters.joinedRecently) {
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      filteredProfiles = filteredProfiles.filter(profile =>
        new Date(profile.joinedAt) > thirtyDaysAgo
      )
    }

    if (filters.hasPhotos) {
      filteredProfiles = filteredProfiles.filter(profile =>
        profile.photos && profile.photos.length > 0
      )
    }

    // Apply sorting
    this.applySorting(filteredProfiles, filters.sortBy || 'newest')

    // Generate stats before pagination
    const stats = this.generateStats(filteredProfiles)

    // Apply pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedProfiles = filteredProfiles.slice(startIndex, endIndex)

    return {
      members: paginatedProfiles,
      total: filteredProfiles.length,
      hasMore: endIndex < filteredProfiles.length,
      stats
    }
  }

  private applySorting(profiles: UserProfile[], sortBy: DirectoryFilters['sortBy']) {
    switch (sortBy) {
      case 'active':
        profiles.sort((a, b) => new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime())
        break
      case 'connections':
        profiles.sort((a, b) => b.connectionsCount - a.connectionsCount)
        break
      case 'alphabetical':
        profiles.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'age':
        profiles.sort((a, b) => a.age - b.age)
        break
      case 'newest':
      default:
        profiles.sort((a, b) => new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime())
        break
    }
  }

  private generateStats(profiles: UserProfile[]): MemberStats {
    const totalMembers = profiles.length
    const onlineNow = profiles.filter(p => p.isOnline).length
    
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    const newThisMonth = profiles.filter(p => new Date(p.joinedAt) > thirtyDaysAgo).length

    const byMembershipTier = {
      free: profiles.filter(p => p.membershipTier === 'free').length,
      core: profiles.filter(p => p.membershipTier === 'core').length,
      premium: profiles.filter(p => p.membershipTier === 'premium').length
    }

    const byLocation: { [location: string]: number } = {}
    profiles.forEach(profile => {
      const location = profile.location.split(',')[0].trim()
      byLocation[location] = (byLocation[location] || 0) + 1
    })

    const averageAge = profiles.reduce((sum, p) => sum + p.age, 0) / profiles.length

    const interestCounts: { [interest: string]: number } = {}
    profiles.forEach(profile => {
      profile.interests.forEach(interest => {
        interestCounts[interest] = (interestCounts[interest] || 0) + 1
      })
    })

    const topInterests = Object.entries(interestCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([interest, count]) => ({ interest, count }))

    return {
      totalMembers,
      onlineNow,
      newThisMonth,
      byMembershipTier,
      byLocation,
      averageAge: Math.round(averageAge),
      topInterests
    }
  }

  async getMemberById(memberId: string, currentUserId: string): Promise<UserProfile | null> {
    const member = this.profiles.find(p => p.id === memberId)
    
    if (!member) return null
    
    // Check privacy settings
    if (member.privacy.profileVisibility === 'connections_only') {
      // In real app, check if users are connected
      const connections = await connectionService.getConnections(currentUserId)
      const isConnected = connections.some(c => c.id === memberId)
      if (!isConnected) return null
    }
    
    return member
  }

  async getSuggestedMembers(
    currentUserId: string,
    limit: number = 6
  ): Promise<UserProfile[]> {
    // Get current user's profile to base suggestions on
    const currentUser = this.profiles.find(p => p.id === currentUserId)
    if (!currentUser) return []

    // Get members who aren't already connected
    const connections = await connectionService.getConnections(currentUserId)
    const connectedIds = connections.map(c => c.id)
    
    let candidates = this.profiles.filter(profile =>
      profile.id !== currentUserId &&
      !connectedIds.includes(profile.id) &&
      profile.privacy.profileVisibility !== 'connections_only'
    )

    // Score members based on compatibility
    const scoredMembers = candidates.map(member => {
      let score = 0
      
      // Common interests (highest weight)
      const commonInterests = member.interests.filter(interest =>
        currentUser.interests.some(userInterest =>
          userInterest.toLowerCase().includes(interest.toLowerCase())
        )
      ).length
      score += commonInterests * 10
      
      // Similar age (medium weight)
      const ageDiff = Math.abs(member.age - currentUser.age)
      if (ageDiff <= 3) score += 5
      else if (ageDiff <= 6) score += 3
      else if (ageDiff <= 10) score += 1
      
      // Same location area (medium weight)
      const memberArea = member.location.split(',')[0].trim()
      const userArea = currentUser.location.split(',')[0].trim()
      if (memberArea === userArea) score += 5
      
      // Same looking for preference (low weight)
      if (member.preferences.lookingFor === currentUser.preferences.lookingFor ||
          member.preferences.lookingFor === 'all' ||
          currentUser.preferences.lookingFor === 'all') {
        score += 2
      }
      
      // Active members get bonus points
      const daysSinceActive = (Date.now() - new Date(member.lastActive).getTime()) / (1000 * 60 * 60 * 24)
      if (daysSinceActive <= 1) score += 3
      else if (daysSinceActive <= 7) score += 1
      
      // Higher membership tier gets slight bonus
      if (member.membershipTier === 'premium') score += 1
      
      return { member, score }
    })

    // Sort by score and return top suggestions
    return scoredMembers
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.member)
  }

  async getNewMembers(limit: number = 10): Promise<UserProfile[]> {
    return this.profiles
      .filter(profile => profile.privacy.profileVisibility !== 'connections_only')
      .sort((a, b) => new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime())
      .slice(0, limit)
  }

  async getOnlineMembers(limit: number = 20): Promise<UserProfile[]> {
    return this.profiles
      .filter(profile => 
        profile.isOnline &&
        profile.privacy.profileVisibility !== 'connections_only'
      )
      .sort((a, b) => new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime())
      .slice(0, limit)
  }

  async getFeaturedMembers(limit: number = 8): Promise<UserProfile[]> {
    // Featured could be based on: high activity, lots of connections, premium members, etc.
    return this.profiles
      .filter(profile => 
        profile.privacy.profileVisibility === 'public' ||
        profile.privacy.profileVisibility === 'members_only'
      )
      .sort((a, b) => {
        // Sort by a combination of factors
        const scoreA = (a.connectionsCount * 2) + (a.eventsAttended * 1.5) + (a.membershipTier === 'premium' ? 10 : 0)
        const scoreB = (b.connectionsCount * 2) + (b.eventsAttended * 1.5) + (b.membershipTier === 'premium' ? 10 : 0)
        return scoreB - scoreA
      })
      .slice(0, limit)
  }
}

export const directoryService = DirectoryService.getInstance()