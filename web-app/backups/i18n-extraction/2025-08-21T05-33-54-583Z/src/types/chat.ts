export interface ChatMessage {
  id: string
  userId: string
  username: string
  message: string
  timestamp: Date
  emotes: PortugueseEmote[]
  userRegion: 'brazil' | 'portugal' | 'africa' | 'diaspora'
  isSubscriber: boolean
  isModerator: boolean
  isHost: boolean
  isSuperchat?: boolean
  superchatAmount?: number
  reactions?: Array<{
    emoji: string
    count: number
    users: string[]
  }>
}

export interface PortugueseEmote {
  code: string // :saudade:, :festa:, :futebol:
  url: string
  culturalContext: string
  regions: ('brazil' | 'portugal' | 'africa' | 'diaspora')[]
  category: 'cultural' | 'celebration' | 'sports' | 'food' | 'music'
}

export interface ChatRoom {
  id: string
  streamId: string
  name: string
  isActive: boolean
  viewerCount: number
  moderators: string[]
  settings: {
    slowMode: number // seconds between messages
    subscriberOnly: boolean
    emoteOnly: boolean
    portugueseOnly: boolean
  }
}

export interface ChatUser {
  id: string
  username: string
  displayName: string
  avatar: string
  region: 'brazil' | 'portugal' | 'africa' | 'diaspora'
  isSubscriber: boolean
  isModerator: boolean
  isHost: boolean
  badges: ChatBadge[]
  joinedAt: Date
}

export interface ChatBadge {
  id: string
  name: string
  icon: string
  color: string
  type: 'subscriber' | 'moderator' | 'host' | 'verified' | 'supporter'
}

export interface ChatReaction {
  emoji: string
  users: string[]
  timestamp: Date
}

export interface ChatModeration {
  type: 'timeout' | 'ban' | 'delete' | 'warn'
  userId: string
  moderatorId: string
  reason: string
  duration?: number // for timeouts in seconds
  timestamp: Date
}

export interface PortuguesePoll {
  id: string
  question: string
  options: Array<{
    id: string
    text: string
    votes: number
    voters: string[]
  }>
  createdBy: string
  duration: number // seconds
  isActive: boolean
  allowMultiple: boolean
}

export interface SuperChatMessage extends ChatMessage {
  amount: number
  currency: string
  backgroundColor: string
  textColor: string
  priority: number
}