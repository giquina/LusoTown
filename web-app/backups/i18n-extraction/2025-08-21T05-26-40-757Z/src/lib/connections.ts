'use client'

import { User } from '@/lib/auth'
import { getImageWithFallback } from '@/lib/profileImages'

export interface UserProfile {
  id: string
  name: string
  age: number
  location: string
  bio: string
  interests: string[]
  profileImage?: string
  membershipTier: 'free' | 'core' | 'premium'
  joinedAt: string
  lastActive: string
  isOnline: boolean
  eventsAttended: number
  connectionsCount: number
  badges: ProfileBadge[]
  photos: ProfilePhoto[]
  preferences: {
    lookingFor: 'friendship' | 'activity_partners' | 'networking' | 'all'
    ageRange: { min: number; max: number }
    location: string[]
    interests: string[]
  }
  privacy: {
    showAge: boolean
    showLocation: boolean
    allowMessages: 'everyone' | 'connections' | 'premium'
    profileVisibility: 'public' | 'members_only' | 'connections_only'
  }
  verification: {
    emailVerified: boolean
    phoneVerified: boolean
    photoVerified: boolean
    backgroundChecked: boolean
  }
}

export interface ProfileBadge {
  id: string
  name: string
  description: string
  icon: string
  color: string
  earnedAt: string
}

export interface ProfilePhoto {
  id: string
  url: string
  caption?: string
  isProfilePicture: boolean
  uploadedAt: string
  likes: number
  comments: PhotoComment[]
}

export interface PhotoComment {
  id: string
  userId: string
  userName: string
  comment: string
  createdAt: string
}

export interface Connection {
  id: string
  userId: string
  connectedUserId: string
  status: 'pending' | 'accepted' | 'declined' | 'blocked'
  initiatedBy: string
  createdAt: string
  acceptedAt?: string
  message?: string
  mutualConnections: number
  commonInterests: string[]
  connectionSource: 'profile_browse' | 'event' | 'chat' | 'mutual_friend' | 'search'
}

export interface ConnectionRequest {
  id: string
  fromUserId: string
  toUserId: string
  message: string
  createdAt: string
  status: 'pending' | 'accepted' | 'declined'
  fromUser: {
    id: string
    name: string
    profileImage?: string
    location: string
    membershipTier: 'free' | 'core' | 'premium'
  }
}

export interface MutualFriend {
  id: string
  name: string
  profileImage?: string
  connectionDate: string
}

// Mock user profiles
export const mockUserProfiles: UserProfile[] = [
  {
    id: 'user-001',
    name: 'Emma Thompson',
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
    photos: [],
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
    name: 'Sarah Mitchell',
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
    photos: [],
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
    name: 'Lisa Chen',
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
    photos: [],
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
    name: 'Rachel Davis',
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
    photos: [],
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
  }
]

// Mock connections
export const mockConnections: Connection[] = [
  {
    id: 'conn-001',
    userId: 'current-user',
    connectedUserId: 'user-001',
    status: 'accepted',
    initiatedBy: 'current-user',
    createdAt: '2024-01-20T10:00:00Z',
    acceptedAt: '2024-01-20T14:30:00Z',
    message: 'Hi Emma! Loved your insights at the wine tasting event. Would love to connect!',
    mutualConnections: 3,
    commonInterests: ['Wine', 'Books', 'Food'],
    connectionSource: 'event'
  },
  {
    id: 'conn-002',
    userId: 'current-user',
    connectedUserId: 'user-002',
    status: 'accepted',
    initiatedBy: 'user-002',
    createdAt: '2024-01-18T09:00:00Z',
    acceptedAt: '2024-01-18T11:45:00Z',
    message: 'Hey! I noticed we both love yoga and wellness. Let\'s connect!',
    mutualConnections: 5,
    commonInterests: ['Wellness', 'Yoga', 'Mindfulness'],
    connectionSource: 'profile_browse'
  }
]

// Mock connection requests
export const mockConnectionRequests: ConnectionRequest[] = [
  {
    id: 'req-001',
    fromUserId: 'user-003',
    toUserId: 'current-user',
    message: 'Hi! I saw your profile and we seem to have a lot in common. Would love to connect and maybe attend some tech events together!',
    createdAt: '2024-01-25T16:20:00Z',
    status: 'pending',
    fromUser: {
      id: 'user-003',
      name: 'Lisa Chen',
      profileImage: getImageWithFallback('sophia-martinez'),
      location: 'Canary Wharf',
      membershipTier: 'core'
    }
  },
  {
    id: 'req-002',
    fromUserId: 'user-004',
    toUserId: 'current-user',
    message: 'Love your photography work! I\'m always looking for creative minds to collaborate with. Let\'s connect!',
    createdAt: '2024-01-26T09:30:00Z',
    status: 'pending',
    fromUser: {
      id: 'user-004',
      name: 'Rachel Davis',
      profileImage: getImageWithFallback('olivia-taylor'),
      location: 'Shoreditch',
      membershipTier: 'premium'
    }
  }
]

// Connection service
export class ConnectionService {
  private static instance: ConnectionService
  private profiles: UserProfile[] = []
  private connections: Connection[] = []
  private requests: ConnectionRequest[] = []

  static getInstance(): ConnectionService {
    if (!ConnectionService.instance) {
      ConnectionService.instance = new ConnectionService()
    }
    return ConnectionService.instance
  }

  constructor() {
    this.loadMockData()
  }

  private loadMockData() {
    this.profiles = [...mockUserProfiles]
    this.connections = [...mockConnections]
    this.requests = [...mockConnectionRequests]
  }

  // Profile discovery
  async discoverProfiles(
    userId: string, 
    filters?: {
      ageRange?: { min: number; max: number }
      location?: string[]
      interests?: string[]
      membershipTier?: 'free' | 'core' | 'premium'
      lookingFor?: string
    }
  ): Promise<UserProfile[]> {
    let availableProfiles = this.profiles.filter(p => p.id !== userId)

    // Filter out already connected users
    const connectedUserIds = this.connections
      .filter(c => (c.userId === userId || c.connectedUserId === userId) && c.status === 'accepted')
      .map(c => c.userId === userId ? c.connectedUserId : c.userId)
    
    availableProfiles = availableProfiles.filter(p => !connectedUserIds.includes(p.id))

    // Apply filters
    if (filters?.ageRange) {
      availableProfiles = availableProfiles.filter(p => 
        p.age >= filters.ageRange!.min && p.age <= filters.ageRange!.max
      )
    }

    if (filters?.location?.length) {
      availableProfiles = availableProfiles.filter(p =>
        filters.location!.some(loc => p.location.includes(loc))
      )
    }

    if (filters?.interests?.length) {
      availableProfiles = availableProfiles.filter(p =>
        p.interests.some(interest => 
          filters.interests!.some(filterInterest => 
            interest.toLowerCase().includes(filterInterest.toLowerCase())
          )
        )
      )
    }

    if (filters?.membershipTier) {
      const tierLevels = { free: 0, core: 1, premium: 2 }
      const minLevel = tierLevels[filters.membershipTier]
      availableProfiles = availableProfiles.filter(p => tierLevels[p.membershipTier] >= minLevel)
    }

    return availableProfiles
  }

  async getProfile(profileId: string): Promise<UserProfile | null> {
    return this.profiles.find(p => p.id === profileId) || null
  }

  // Connection management
  async sendConnectionRequest(
    fromUserId: string, 
    toUserId: string, 
    message: string,
    source: Connection['connectionSource'] = 'profile_browse'
  ): Promise<{ success: boolean; message: string }> {
    // Check if already connected or request exists
    const existingConnection = this.connections.find(c => 
      (c.userId === fromUserId && c.connectedUserId === toUserId) ||
      (c.userId === toUserId && c.connectedUserId === fromUserId)
    )

    if (existingConnection) {
      return { success: false, message: 'Connection already exists' }
    }

    const existingRequest = this.requests.find(r => 
      r.fromUserId === fromUserId && r.toUserId === toUserId && r.status === 'pending'
    )

    if (existingRequest) {
      return { success: false, message: 'Connection request already sent' }
    }

    // Get user profiles for mutual data
    const fromProfile = await this.getProfile(fromUserId)
    const toProfile = await this.getProfile(toUserId)

    if (!fromProfile || !toProfile) {
      return { success: false, message: 'User profile not found' }
    }

    // Create connection request
    const newRequest: ConnectionRequest = {
      id: `req-${Date.now()}`,
      fromUserId,
      toUserId,
      message: message.trim(),
      createdAt: new Date().toISOString(),
      status: 'pending',
      fromUser: {
        id: fromProfile.id,
        name: fromProfile.name,
        profileImage: fromProfile.profileImage,
        location: fromProfile.location,
        membershipTier: fromProfile.membershipTier
      }
    }

    this.requests.push(newRequest)
    return { success: true, message: 'Connection request sent successfully' }
  }

  async respondToConnectionRequest(
    requestId: string, 
    response: 'accepted' | 'declined'
  ): Promise<{ success: boolean; message: string }> {
    const request = this.requests.find(r => r.id === requestId)
    if (!request || request.status !== 'pending') {
      return { success: false, message: 'Connection request not found' }
    }

    request.status = response

    if (response === 'accepted') {
      // Create connection
      const fromProfile = await this.getProfile(request.fromUserId)
      const toProfile = await this.getProfile(request.toUserId)
      
      const commonInterests = fromProfile && toProfile 
        ? fromProfile.interests.filter(interest => 
            toProfile.interests.some(toInterest => 
              toInterest.toLowerCase().includes(interest.toLowerCase())
            )
          )
        : []

      const newConnection: Connection = {
        id: `conn-${Date.now()}`,
        userId: request.fromUserId,
        connectedUserId: request.toUserId,
        status: 'accepted',
        initiatedBy: request.fromUserId,
        createdAt: request.createdAt,
        acceptedAt: new Date().toISOString(),
        message: request.message,
        mutualConnections: 0, // Would calculate in real app
        commonInterests,
        connectionSource: 'profile_browse'
      }

      this.connections.push(newConnection)

      // Update connection counts
      if (fromProfile) fromProfile.connectionsCount++
      if (toProfile) toProfile.connectionsCount++

      return { success: true, message: 'Connection accepted successfully' }
    }

    return { success: true, message: 'Connection request declined' }
  }

  async getConnections(userId: string): Promise<UserProfile[]> {
    const userConnections = this.connections.filter(c => 
      (c.userId === userId || c.connectedUserId === userId) && c.status === 'accepted'
    )

    const connectedUserIds = userConnections.map(c => 
      c.userId === userId ? c.connectedUserId : c.userId
    )

    return this.profiles.filter(p => connectedUserIds.includes(p.id))
  }

  async getConnectionRequests(userId: string): Promise<ConnectionRequest[]> {
    return this.requests.filter(r => r.toUserId === userId && r.status === 'pending')
  }

  async getMutualConnections(userId1: string, userId2: string): Promise<MutualFriend[]> {
    const user1Connections = await this.getConnections(userId1)
    const user2Connections = await this.getConnections(userId2)

    const mutualIds = user1Connections
      .filter(u1 => user2Connections.some(u2 => u2.id === u1.id))
      .map(u => u.id)

    return this.profiles
      .filter(p => mutualIds.includes(p.id))
      .map(p => ({
        id: p.id,
        name: p.name,
        profileImage: p.profileImage,
        connectionDate: this.connections.find(c => 
          (c.userId === userId1 && c.connectedUserId === p.id) ||
          (c.userId === p.id && c.connectedUserId === userId1)
        )?.acceptedAt || p.joinedAt
      }))
  }

  async removeConnection(userId: string, connectionId: string): Promise<{ success: boolean; message: string }> {
    const connectionIndex = this.connections.findIndex(c => 
      c.id === connectionId && (c.userId === userId || c.connectedUserId === userId)
    )

    if (connectionIndex === -1) {
      return { success: false, message: 'Connection not found' }
    }

    const connection = this.connections[connectionIndex]
    this.connections.splice(connectionIndex, 1)

    // Update connection counts
    const user1 = this.profiles.find(p => p.id === connection.userId)
    const user2 = this.profiles.find(p => p.id === connection.connectedUserId)
    if (user1) user1.connectionsCount--
    if (user2) user2.connectionsCount--

    return { success: true, message: 'Connection removed successfully' }
  }
}

export const connectionService = ConnectionService.getInstance()