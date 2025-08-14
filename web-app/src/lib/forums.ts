'use client'

import { User } from '@/lib/auth'
import { getImageWithFallback } from '@/lib/profileImages'

export interface ForumCategory {
  id: string
  name: string
  description: string
  icon: string
  color: string
  membershipRequired: 'free' | 'core' | 'premium'
  topics: number
  posts: number
  lastActivity: string
  isModerator?: boolean
  isSubscribed?: boolean
}

export interface ForumTopic {
  id: string
  categoryId: string
  title: string
  description: string
  author: {
    id: string
    name: string
    avatar?: string
    membershipTier: 'free' | 'core' | 'premium'
    role: 'member' | 'moderator' | 'admin'
  }
  createdAt: string
  updatedAt: string
  isPinned: boolean
  isLocked: boolean
  isAnnouncement: boolean
  replies: number
  views: number
  upvotes: number
  downvotes: number
  tags: string[]
  lastReply?: {
    id: string
    authorName: string
    createdAt: string
    preview: string
  }
  hasUserVoted?: 'up' | 'down' | null
  isFollowing?: boolean
  membershipRequired: 'free' | 'core' | 'premium'
}

export interface ForumPost {
  id: string
  topicId: string
  parentId?: string // For nested replies
  author: {
    id: string
    name: string
    avatar?: string
    membershipTier: 'free' | 'core' | 'premium'
    role: 'member' | 'moderator' | 'admin'
    joinedDate: string
    totalPosts: number
    reputation: number
  }
  content: string
  createdAt: string
  editedAt?: string
  upvotes: number
  downvotes: number
  replies: ForumPost[]
  attachments: PostAttachment[]
  isDeleted: boolean
  isReported: boolean
  reportCount: number
  hasUserVoted?: 'up' | 'down' | null
  mentions: string[]
  isAcceptedAnswer?: boolean
  isBestAnswer?: boolean
}

export interface PostAttachment {
  id: string
  type: 'image' | 'file' | 'link'
  url: string
  filename: string
  size?: number
  preview?: string
}

export interface ForumReport {
  id: string
  reporterId: string
  reporterName: string
  targetType: 'topic' | 'post'
  targetId: string
  reason: 'spam' | 'inappropriate' | 'harassment' | 'misinformation' | 'other'
  description: string
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed'
  createdAt: string
  reviewedBy?: string
  reviewedAt?: string
  action?: string
}

export interface ForumNotification {
  id: string
  userId: string
  type: 'reply' | 'mention' | 'upvote' | 'new_topic' | 'moderation'
  title: string
  message: string
  topicId?: string
  postId?: string
  isRead: boolean
  createdAt: string
  actionUrl: string
}

// Mock forum categories
export const mockForumCategories: ForumCategory[] = [
  {
    id: 'cat-new-members',
    name: 'New Members',
    description: 'Welcome space for introductions and getting started',
    icon: '👋',
    color: 'bg-green-100 text-green-700',
    membershipRequired: 'free',
    topics: 45,
    posts: 127,
    lastActivity: '2024-01-26T15:30:00Z',
    isSubscribed: true
  },
  {
    id: 'cat-event-planning',
    name: 'Event Planning',
    description: 'Organize events, suggest activities, and coordinate meetups',
    icon: '📅',
    color: 'bg-secondary-100 text-secondary-700',
    membershipRequired: 'core',
    topics: 38,
    posts: 203,
    lastActivity: '2024-01-26T14:20:00Z',
    isSubscribed: false
  },
  {
    id: 'cat-life-advice',
    name: 'Life Advice',
    description: 'Supportive discussions about life transitions and personal growth',
    icon: '💡',
    color: 'bg-purple-100 text-purple-700',
    membershipRequired: 'core',
    topics: 62,
    posts: 341,
    lastActivity: '2024-01-26T16:45:00Z',
    isSubscribed: true
  },
  {
    id: 'cat-career-networking',
    name: 'Career & Networking',
    description: 'Professional development, job opportunities, and business networking',
    icon: '💼',
    color: 'bg-indigo-100 text-indigo-700',
    membershipRequired: 'core',
    topics: 29,
    posts: 156,
    lastActivity: '2024-01-26T13:15:00Z',
    isSubscribed: false
  },
  {
    id: 'cat-hobbies-interests',
    name: 'Hobbies & Interests',
    description: 'Share passions, find activity partners, and discover new interests',
    icon: '🎨',
    color: 'bg-pink-100 text-pink-700',
    membershipRequired: 'free',
    topics: 84,
    posts: 425,
    lastActivity: '2024-01-26T12:30:00Z',
    isSubscribed: true
  },
  {
    id: 'cat-london-local',
    name: 'London Local',
    description: 'Local recommendations, area-specific meetups, and London life',
    icon: '🏛️',
    color: 'bg-yellow-100 text-yellow-700',
    membershipRequired: 'free',
    topics: 73,
    posts: 298,
    lastActivity: '2024-01-26T11:45:00Z',
    isSubscribed: false
  },
  {
    id: 'cat-premium-lounge',
    name: 'Premium Lounge',
    description: 'Exclusive discussions and opportunities for premium members',
    icon: '👑',
    color: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
    membershipRequired: 'premium',
    topics: 15,
    posts: 78,
    lastActivity: '2024-01-26T10:20:00Z',
    isSubscribed: false
  }
]

// Mock forum topics
export const mockForumTopics: ForumTopic[] = [
  {
    id: 'topic-1',
    categoryId: 'cat-new-members',
    title: 'Hello from Kensington! New member introduction 👋',
    description: 'Just joined LusoTown and so excited to meet like-minded women in London! I\'m Emma, 34, marketing professional who loves wine tasting and book clubs. Looking forward to making genuine connections!',
    author: {
      id: 'user-001',
      name: 'Rachel Green',
      avatar: getImageWithFallback('forum-user-1'),
      membershipTier: 'core',
      role: 'member'
    },
    createdAt: '2024-01-26T10:30:00Z',
    updatedAt: '2024-01-26T15:20:00Z',
    isPinned: false,
    isLocked: false,
    isAnnouncement: false,
    replies: 8,
    views: 45,
    upvotes: 12,
    downvotes: 0,
    tags: ['introduction', 'kensington', 'wine', 'books'],
    lastReply: {
      id: 'post-5',
      authorName: 'Sarah Mitchell',
      createdAt: '2024-01-26T15:20:00Z',
      preview: 'Welcome Emma! I\'m in Kensington too, would love to connect for wine tastings...'
    },
    membershipRequired: 'free'
  },
  {
    id: 'topic-2',
    categoryId: 'cat-event-planning',
    title: '📚 Monthly Book Club - February Selection Discussion',
    description: 'Time to choose our February book! I\'ve narrowed it down to three fantastic options. Please vote and share your thoughts. We\'ll announce the winner on Friday!',
    author: {
      id: 'user-002',
      name: 'Emma Wilson',
      avatar: getImageWithFallback('forum-user-2'),
      membershipTier: 'premium',
      role: 'moderator'
    },
    createdAt: '2024-01-25T14:00:00Z',
    updatedAt: '2024-01-26T16:45:00Z',
    isPinned: true,
    isLocked: false,
    isAnnouncement: false,
    replies: 15,
    views: 92,
    upvotes: 18,
    downvotes: 1,
    tags: ['book-club', 'voting', 'february', 'literature'],
    lastReply: {
      id: 'post-12',
      authorName: 'Lisa Chen',
      createdAt: '2024-01-26T16:45:00Z',
      preview: 'I vote for "The Seven Husbands of Evelyn Hugo"! Heard amazing things...'
    },
    membershipRequired: 'core'
  },
  {
    id: 'topic-3',
    categoryId: 'cat-life-advice',
    title: 'Career transition at 35 - feeling lost and seeking guidance',
    description: 'Hi everyone, I\'m going through a major career change and could use some wisdom from those who\'ve been there. After 10 years in finance, I\'m considering a complete pivot to something more creative and fulfilling. Has anyone made a similar transition? What helped you through the uncertainty?',
    author: {
      id: 'user-003',
      name: 'Lisa Chen',
      avatar: getImageWithFallback('forum-user-3'),
      membershipTier: 'core',
      role: 'member'
    },
    createdAt: '2024-01-24T09:15:00Z',
    updatedAt: '2024-01-26T14:30:00Z',
    isPinned: false,
    isLocked: false,
    isAnnouncement: false,
    replies: 23,
    views: 156,
    upvotes: 34,
    downvotes: 2,
    tags: ['career-change', 'advice', 'transition', 'support'],
    lastReply: {
      id: 'post-18',
      authorName: 'Rachel Davis',
      createdAt: '2024-01-26T14:30:00Z',
      preview: 'I made the jump from law to photography at 33. Happy to share my experience...'
    },
    membershipRequired: 'core'
  },
  {
    id: 'topic-4',
    categoryId: 'cat-london-local',
    title: '🍷 Best wine bars in Central London - your recommendations?',
    description: 'Planning some wine-focused meetups and looking for great venues in Central London. What are your favorite wine bars that can accommodate groups of 8-12 people? Bonus points for cozy atmosphere and good cheese boards!',
    author: {
      id: 'user-004',
      name: 'Rachel Davis',
      avatar: getImageWithFallback('forum-user-4'),
      membershipTier: 'premium',
      role: 'member'
    },
    createdAt: '2024-01-23T16:20:00Z',
    updatedAt: '2024-01-26T13:45:00Z',
    isPinned: false,
    isLocked: false,
    isAnnouncement: false,
    replies: 19,
    views: 78,
    upvotes: 25,
    downvotes: 0,
    tags: ['wine-bars', 'central-london', 'recommendations', 'meetups'],
    lastReply: {
      id: 'post-22',
      authorName: 'Emma Thompson',
      createdAt: '2024-01-26T13:45:00Z',
      preview: 'Wine & Cheese Co in Covent Garden is perfect for groups! They even do...'
    },
    membershipRequired: 'free'
  },
  {
    id: 'topic-5',
    categoryId: 'cat-premium-lounge',
    title: '✨ Exclusive: Private Art Gallery Evening - March 15th',
    description: 'Premium members only! I\'ve arranged an exclusive after-hours viewing at a prestigious Chelsea gallery. Limited to 15 attendees. This is a unique networking opportunity with the curator and featured artists. Details and RSVP in comments.',
    author: {
      id: 'admin-001',
      name: 'Emma Williams',
      avatar: getImageWithFallback('forum-user-5'),
      membershipTier: 'premium',
      role: 'admin'
    },
    createdAt: '2024-01-22T11:00:00Z',
    updatedAt: '2024-01-26T12:15:00Z',
    isPinned: true,
    isLocked: false,
    isAnnouncement: true,
    replies: 12,
    views: 34,
    upvotes: 15,
    downvotes: 0,
    tags: ['premium-only', 'art-gallery', 'exclusive', 'networking'],
    lastReply: {
      id: 'post-25',
      authorName: 'Sarah Mitchell',
      createdAt: '2024-01-26T12:15:00Z',
      preview: 'Count me in! This sounds absolutely amazing. Can\'t wait to...'
    },
    membershipRequired: 'premium'
  }
]

// Mock forum posts
export const mockForumPosts: { [topicId: string]: ForumPost[] } = {
  'topic-1': [
    {
      id: 'post-1',
      topicId: 'topic-1',
      author: {
        id: 'user-002',
        name: 'Sarah Mitchell',
        avatar: getImageWithFallback('forum-user-2'),
        membershipTier: 'premium',
        role: 'moderator',
        joinedDate: '2024-01-08',
        totalPosts: 142,
        reputation: 1250
      },
      content: 'Welcome to LusoTown, Emma! 🎉 It\'s wonderful to have you in our community. I\'m Sarah, and I actually run the monthly book club - sounds like you\'d be a perfect fit! We\'re currently discussing "The Seven Husbands of Evelyn Hugo" and meeting next week in Kensington.\n\nI\'m also based in the area and love discovering new wine bars. Have you tried Wine & Cheese Co in Covent Garden? It\'s become one of my favorites for group tastings.\n\nLooking forward to seeing you at some events soon!',
      createdAt: '2024-01-26T10:45:00Z',
      upvotes: 8,
      downvotes: 0,
      replies: [],
      attachments: [],
      isDeleted: false,
      isReported: false,
      reportCount: 0,
      mentions: ['emma']
    },
    {
      id: 'post-2',
      topicId: 'topic-1',
      author: {
        id: 'user-003',
        name: 'Lisa Chen',
        avatar: getImageWithFallback('forum-user-3'),
        membershipTier: 'core',
        role: 'member',
        joinedDate: '2024-01-12',
        totalPosts: 67,
        reputation: 540
      },
      content: 'Hi Emma! Another marketing professional here 👋 I work in tech consulting but we probably have a lot in common. I\'d love to connect and maybe explore some of the art galleries together - I\'ve been wanting to check out the new exhibition at Tate Modern.\n\nAlso, if you\'re interested in fitness classes, there\'s a great group that meets for yoga in Hyde Park on Saturday mornings. Very welcoming crowd!',
      createdAt: '2024-01-26T12:20:00Z',
      upvotes: 5,
      downvotes: 0,
      replies: [
        {
          id: 'post-3',
          topicId: 'topic-1',
          parentId: 'post-2',
          author: {
            id: 'user-001',
            name: 'Emma Thompson',
            avatar: getImageWithFallback('forum-user-1'),
            membershipTier: 'core',
            role: 'member',
            joinedDate: '2024-01-26',
            totalPosts: 3,
            reputation: 15
          },
          content: 'That sounds perfect, Lisa! I\'ve been wanting to get back into yoga. Would love to join the Hyde Park group - is it beginner friendly? And yes to Tate Modern! I was just thinking about checking out their current exhibitions.',
          createdAt: '2024-01-26T13:15:00Z',
          upvotes: 3,
          downvotes: 0,
          replies: [],
          attachments: [],
          isDeleted: false,
          isReported: false,
          reportCount: 0,
          mentions: ['lisa']
        }
      ],
      attachments: [],
      isDeleted: false,
      isReported: false,
      reportCount: 0,
      mentions: ['emma']
    }
  ]
}

// Forums service
export class ForumsService {
  private static instance: ForumsService
  private categories: ForumCategory[] = []
  private topics: ForumTopic[] = []
  private posts: { [topicId: string]: ForumPost[] } = {}
  private reports: ForumReport[] = []
  private notifications: ForumNotification[] = []

  static getInstance(): ForumsService {
    if (!ForumsService.instance) {
      ForumsService.instance = new ForumsService()
    }
    return ForumsService.instance
  }

  constructor() {
    this.loadMockData()
  }

  private loadMockData() {
    this.categories = [...mockForumCategories]
    this.topics = [...mockForumTopics]
    this.posts = { ...mockForumPosts }
  }

  // Category management
  async getCategories(userMembershipTier: 'free' | 'core' | 'premium' = 'free'): Promise<ForumCategory[]> {
    const tierLevels = { free: 0, core: 1, premium: 2 }
    const userLevel = tierLevels[userMembershipTier]
    
    return this.categories.filter(cat => tierLevels[cat.membershipRequired] <= userLevel)
  }

  async getCategoryById(categoryId: string): Promise<ForumCategory | null> {
    return this.categories.find(cat => cat.id === categoryId) || null
  }

  // Topic management
  async getTopics(
    categoryId?: string,
    userId?: string,
    filters?: {
      membershipTier?: 'free' | 'core' | 'premium'
      sortBy?: 'recent' | 'popular' | 'oldest'
      tags?: string[]
      searchQuery?: string
    }
  ): Promise<ForumTopic[]> {
    let filteredTopics = [...this.topics]

    // Filter by category
    if (categoryId) {
      filteredTopics = filteredTopics.filter(topic => topic.categoryId === categoryId)
    }

    // Filter by membership access
    if (filters?.membershipTier) {
      const tierLevels = { free: 0, core: 1, premium: 2 }
      const userLevel = tierLevels[filters.membershipTier]
      filteredTopics = filteredTopics.filter(topic => 
        tierLevels[topic.membershipRequired] <= userLevel
      )
    }

    // Filter by tags
    if (filters?.tags && filters.tags.length > 0) {
      filteredTopics = filteredTopics.filter(topic =>
        topic.tags.some(tag => filters.tags!.includes(tag))
      )
    }

    // Filter by search query
    if (filters?.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      filteredTopics = filteredTopics.filter(topic =>
        topic.title.toLowerCase().includes(query) ||
        topic.description.toLowerCase().includes(query) ||
        topic.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // Sort topics
    if (filters?.sortBy === 'popular') {
      filteredTopics.sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes))
    } else if (filters?.sortBy === 'oldest') {
      filteredTopics.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    } else { // recent (default)
      filteredTopics.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    }

    // Put pinned topics first
    filteredTopics.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1
      if (!a.isPinned && b.isPinned) return 1
      return 0
    })

    return filteredTopics
  }

  async getTopicById(topicId: string): Promise<ForumTopic | null> {
    const topic = this.topics.find(t => t.id === topicId)
    if (topic) {
      // Increment view count
      topic.views++
    }
    return topic || null
  }

  async createTopic(
    categoryId: string,
    title: string,
    description: string,
    tags: string[],
    authorData: any
  ): Promise<{ success: boolean; topic?: ForumTopic; error?: string }> {
    const category = await this.getCategoryById(categoryId)
    if (!category) {
      return { success: false, error: 'Category not found' }
    }

    // Check membership requirements
    const tierLevels: { [key in 'free' | 'core' | 'premium']: number } = { free: 0, core: 1, premium: 2 }
    const userLevel = tierLevels[(authorData.membershipTier || 'free') as keyof typeof tierLevels]
    const requiredLevel = tierLevels[category.membershipRequired as keyof typeof tierLevels]
    
    if (userLevel < requiredLevel) {
      return { success: false, error: 'Membership upgrade required' }
    }

    const newTopic: ForumTopic = {
      id: `topic-${Date.now()}`,
      categoryId,
      title: title.trim(),
      description: description.trim(),
      author: {
        id: authorData.id,
        name: authorData.name,
        avatar: authorData.profileImage,
        membershipTier: authorData.membershipTier || 'free',
        role: authorData.role || 'member'
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isPinned: false,
      isLocked: false,
      isAnnouncement: false,
      replies: 0,
      views: 0,
      upvotes: 0,
      downvotes: 0,
      tags: tags.map(tag => tag.toLowerCase().trim()),
      membershipRequired: category.membershipRequired
    }

    this.topics.unshift(newTopic) // Add to beginning
    this.posts[newTopic.id] = [] // Initialize posts array

    // Update category stats
    category.topics++
    category.lastActivity = newTopic.createdAt

    return { success: true, topic: newTopic }
  }

  async voteTopic(
    topicId: string,
    userId: string,
    vote: 'up' | 'down'
  ): Promise<{ success: boolean; message: string }> {
    const topic = await this.getTopicById(topicId)
    if (!topic) {
      return { success: false, message: 'Topic not found' }
    }

    // In a real app, you'd track user votes in a separate table
    // For demo, we'll just update the counts
    if (vote === 'up') {
      topic.upvotes++
      topic.hasUserVoted = 'up'
    } else {
      topic.downvotes++
      topic.hasUserVoted = 'down'
    }

    return { success: true, message: 'Vote recorded' }
  }

  // Post management
  async getPosts(topicId: string): Promise<ForumPost[]> {
    return this.posts[topicId] || []
  }

  async createPost(
    topicId: string,
    content: string,
    authorData: any,
    parentId?: string
  ): Promise<{ success: boolean; post?: ForumPost; error?: string }> {
    const topic = await this.getTopicById(topicId)
    if (!topic) {
      return { success: false, error: 'Topic not found' }
    }

    if (topic.isLocked) {
      return { success: false, error: 'Topic is locked' }
    }

    const newPost: ForumPost = {
      id: `post-${Date.now()}`,
      topicId,
      parentId,
      author: {
        id: authorData.id,
        name: authorData.name,
        avatar: authorData.profileImage,
        membershipTier: authorData.membershipTier || 'free',
        role: authorData.role || 'member',
        joinedDate: authorData.joinedDate || new Date().toISOString(),
        totalPosts: 1, // Would be calculated from database
        reputation: 10 // Starting reputation
      },
      content: content.trim(),
      createdAt: new Date().toISOString(),
      upvotes: 0,
      downvotes: 0,
      replies: [],
      attachments: [],
      isDeleted: false,
      isReported: false,
      reportCount: 0,
      mentions: this.extractMentions(content)
    }

    if (!this.posts[topicId]) {
      this.posts[topicId] = []
    }

    if (parentId) {
      // Add as reply to parent post
      const parentPost = this.findPostById(topicId, parentId)
      if (parentPost) {
        parentPost.replies.push(newPost)
      }
    } else {
      this.posts[topicId].push(newPost)
    }

    // Update topic stats
    topic.replies++
    topic.updatedAt = newPost.createdAt
    topic.lastReply = {
      id: newPost.id,
      authorName: newPost.author.name,
      createdAt: newPost.createdAt,
      preview: content.substring(0, 100) + (content.length > 100 ? '...' : '')
    }

    // Update category stats
    const category = await this.getCategoryById(topic.categoryId)
    if (category) {
      category.posts++
      category.lastActivity = newPost.createdAt
    }

    return { success: true, post: newPost }
  }

  private findPostById(topicId: string, postId: string): ForumPost | null {
    const posts = this.posts[topicId] || []
    
    for (const post of posts) {
      if (post.id === postId) return post
      
      // Search in replies recursively
      const found = this.findPostInReplies(post.replies, postId)
      if (found) return found
    }
    
    return null
  }

  private findPostInReplies(replies: ForumPost[], postId: string): ForumPost | null {
    for (const reply of replies) {
      if (reply.id === postId) return reply
      
      const found = this.findPostInReplies(reply.replies, postId)
      if (found) return found
    }
    
    return null
  }

  async votePost(
    topicId: string,
    postId: string,
    userId: string,
    vote: 'up' | 'down'
  ): Promise<{ success: boolean; message: string }> {
    const post = this.findPostById(topicId, postId)
    if (!post) {
      return { success: false, message: 'Post not found' }
    }

    // In a real app, you'd track user votes
    if (vote === 'up') {
      post.upvotes++
      post.hasUserVoted = 'up'
    } else {
      post.downvotes++
      post.hasUserVoted = 'down'
    }

    return { success: true, message: 'Vote recorded' }
  }

  private extractMentions(content: string): string[] {
    const mentionRegex = /@(\w+)/g
    const mentions: string[] = []
    let match

    while ((match = mentionRegex.exec(content)) !== null) {
      mentions.push(match[1])
    }

    return mentions
  }

  // Search functionality
  async searchForums(
    query: string,
    filters?: {
      type?: 'topics' | 'posts' | 'both'
      category?: string
      membershipTier?: 'free' | 'core' | 'premium'
    }
  ): Promise<{
    topics: ForumTopic[]
    posts: ForumPost[]
    totalResults: number
  }> {
    const searchQuery = query.toLowerCase().trim()
    let foundTopics: ForumTopic[] = []
    let foundPosts: ForumPost[] = []

    if (!filters?.type || filters.type === 'topics' || filters.type === 'both') {
      foundTopics = await this.getTopics(
        filters?.category,
        undefined,
        {
          searchQuery,
          membershipTier: filters?.membershipTier
        }
      )
    }

    if (!filters?.type || filters.type === 'posts' || filters.type === 'both') {
      // Search through all posts
      for (const [topicId, posts] of Object.entries(this.posts)) {
        const matchingPosts = posts.filter(post =>
          post.content.toLowerCase().includes(searchQuery) &&
          !post.isDeleted
        )
        foundPosts.push(...matchingPosts)
      }
    }

    return {
      topics: foundTopics,
      posts: foundPosts,
      totalResults: foundTopics.length + foundPosts.length
    }
  }

  // Moderation
  async reportContent(
    reporterId: string,
    reporterName: string,
    targetType: 'topic' | 'post',
    targetId: string,
    reason: ForumReport['reason'],
    description: string
  ): Promise<{ success: boolean; message: string }> {
    const newReport: ForumReport = {
      id: `report-${Date.now()}`,
      reporterId,
      reporterName,
      targetType,
      targetId,
      reason,
      description: description.trim(),
      status: 'pending',
      createdAt: new Date().toISOString()
    }

    this.reports.push(newReport)
    
    // Mark content as reported
    if (targetType === 'topic') {
      const topic = this.topics.find(t => t.id === targetId)
      if (topic) {
        // topic.isReported = true (if we add this field)
      }
    } else {
      // Find post and mark as reported
      for (const posts of Object.values(this.posts)) {
        const post = posts.find(p => p.id === targetId)
        if (post) {
          post.isReported = true
          post.reportCount++
          break
        }
      }
    }

    return { success: true, message: 'Report submitted successfully' }
  }

  async getReports(status?: ForumReport['status']): Promise<ForumReport[]> {
    let reports = [...this.reports]
    
    if (status) {
      reports = reports.filter(r => r.status === status)
    }
    
    return reports.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  // Notifications
  async getUserNotifications(userId: string): Promise<ForumNotification[]> {
    return this.notifications.filter(n => n.userId === userId && !n.isRead)
  }

  async markNotificationAsRead(notificationId: string): Promise<void> {
    const notification = this.notifications.find(n => n.id === notificationId)
    if (notification) {
      notification.isRead = true
    }
  }
}

export const forumsService = ForumsService.getInstance()