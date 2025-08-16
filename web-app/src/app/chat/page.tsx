'use client'
import Image from 'next/image'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChatBubbleLeftRightIcon,
  UsersIcon,
  LockClosedIcon,
  StarIcon,
  MagnifyingGlassIcon,
  HashtagIcon,
  BellIcon,
  PlusIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import { BellIcon as BellSolidIcon } from '@heroicons/react/24/solid'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ChatRoom, CHAT_CATEGORIES, messagingService } from '@/lib/messaging'
import { authService } from '@/lib/auth'

const ChatRoomCard = ({ 
  room, 
  onJoin, 
  onToggleNotifications 
}: { 
  room: ChatRoom
  onJoin: (roomId: string) => void
  onToggleNotifications: (roomId: string) => void
}) => {
  const [isJoining, setIsJoining] = useState(false)

  const handleJoin = async () => {
    setIsJoining(true)
    await onJoin(room.id)
    setIsJoining(false)
  }

  const getMembershipBadgeColor = (tier: string) => {
    switch (tier) {
      case 'premium': return 'bg-purple-100 text-purple-700 border-purple-200'
      case 'core': return 'bg-primary-100 text-primary-700 border-primary-200'
      default: return 'bg-green-100 text-green-700 border-green-200'
    }
  }

  const formatLastActivity = (timestamp: string) => {
    const now = new Date()
    const lastActivity = new Date(timestamp)
    const diffInHours = (now.getTime() - lastActivity.getTime()) / (1000 * 60 * 60)
    
    if (diffInHours < 1) return 'Active now'
    if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
    return `${Math.floor(diffInHours / 168)}w ago`
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      {/* Header */}
      <div className="relative h-32 bg-gradient-to-r from-primary-200 to-secondary-200">
        {room.coverImage ? (
          <Image 
            src={room.coverImage} 
            alt={room.name}
            fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">
            {CHAT_CATEGORIES[room.category as keyof typeof CHAT_CATEGORIES]?.icon || '💬'}
          </div>
        )}
        
        {/* Status badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {room.pinned && (
            <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
              <StarIcon className="w-3 h-3" />
              PINNED
            </span>
          )}
          {room.type === 'private' && (
            <span className="bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
              <LockClosedIcon className="w-3 h-3" />
              PRIVATE
            </span>
          )}
          <span className={`text-xs font-bold px-2 py-1 rounded-full border capitalize ${getMembershipBadgeColor(room.membershipRequired)}`}>
            {room.membershipRequired}+
          </span>
        </div>

        {/* Room avatar */}
        <div className="absolute -bottom-6 left-6">
          <div className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center border-4 border-white">
            {room.avatar ? (
              <Image src={room.avatar} alt={room.name} width={8 * 4} height={8 * 4} className="object-cover" />
            ) : (
              <ChatBubbleLeftRightIcon className="w-6 h-6 text-gray-600" />
            )}
          </div>
        </div>

        {/* Notifications toggle - only for joined rooms */}
        {room.isJoined && (
          <div className="absolute top-3 right-3">
            <button
              onClick={() => onToggleNotifications(room.id)}
              className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
            >
              {room.notifications ? (
                <BellSolidIcon className="w-4 h-4 text-primary-600" />
              ) : (
                <BellIcon className="w-4 h-4 text-gray-600" />
              )}
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 pt-8">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
              {room.name}
            </h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {room.description}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <UsersIcon className="w-4 h-4" />
            <span>{room.currentMembers.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <ChatBubbleLeftRightIcon className="w-4 h-4" />
            <span>{formatLastActivity(room.lastActivity)}</span>
          </div>
        </div>

        {/* Last message preview */}
        {room.lastMessage && (
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-5 h-5 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
                {room.lastMessage.userName[0]}
              </div>
              <span className="text-xs font-medium text-gray-900">{room.lastMessage.userName}</span>
              <span className="text-xs text-gray-500">
                {new Date(room.lastMessage.timestamp).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <p className="text-sm text-gray-700 line-clamp-2">{room.lastMessage.content}</p>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {room.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag}
              className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full flex items-center gap-1"
            >
              <HashtagIcon className="w-3 h-3" />
              {tag}
            </span>
          ))}
          {room.tags.length > 3 && (
            <span className="text-xs text-gray-400">
              +{room.tags.length - 3}
            </span>
          )}
        </div>

        {/* Action button */}
        {room.isJoined ? (
          <a
            href={`/chat/${room.id}`}
            className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold py-3 px-4 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 text-center block flex items-center justify-center gap-2"
          >
            <ChatBubbleLeftRightIcon className="w-4 h-4" />
            Enter Chat
          </a>
        ) : (
          <button
            onClick={handleJoin}
            disabled={isJoining}
            className="w-full border-2 border-primary-400 text-primary-600 font-semibold py-3 px-4 rounded-lg hover:bg-primary-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isJoining ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                Joining...
              </>
            ) : (
              <>
                <PlusIcon className="w-4 h-4" />
                Join Room
              </>
            )}
          </button>
        )}
      </div>
    </motion.div>
  )
}

const CategoryFilter = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}: {
  categories: string[]
  selectedCategory: string | null
  onSelectCategory: (category: string | null) => void
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => onSelectCategory(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          selectedCategory === null
            ? 'bg-primary-500 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All Rooms
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
            selectedCategory === category
              ? 'bg-primary-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <span className="text-base">
            {CHAT_CATEGORIES[category as keyof typeof CHAT_CATEGORIES]?.icon}
          </span>
          {category}
        </button>
      ))}
    </div>
  )
}

export default function ChatRoomsPage() {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showJoinedOnly, setShowJoinedOnly] = useState(false)

  useEffect(() => {
    loadChatRooms()
  }, [])

  const loadChatRooms = async () => {
    setLoading(true)
    try {
      // Get current user
      const currentUser = authService.getCurrentUser()
      if (!currentUser) {
        // Show empty state for non-authenticated users
        setChatRooms([])
        setLoading(false)
        return
      }

      const rooms = await messagingService.getChatRooms(
        currentUser.id, 
        currentUser.membershipTier
      )
      setChatRooms(rooms)
    } catch (error) {
      console.error('Error loading chat rooms:', error)
      setChatRooms([])
    } finally {
      setLoading(false)
    }
  }

  const handleJoinRoom = async (roomId: string) => {
    const currentUser = authService.getCurrentUser()
    if (!currentUser) {
      window.location.href = '/login'
      return
    }

    try {
      const result = await messagingService.joinRoom(roomId, currentUser.id, {
        name: currentUser.name,
        profileImage: currentUser.profileImage,
        membershipTier: currentUser.membershipTier
      })
      
      if (result.success) {
        // Refresh rooms to update joined status
        await loadChatRooms()
      } else {
        alert(result.message)
      }
    } catch (error) {
      console.error('Error joining room:', error)
      alert('Failed to join room. Please try again.')
    }
  }

  const handleToggleNotifications = async (roomId: string) => {
    // Toggle notifications for the room
    setChatRooms(rooms => 
      rooms.map(room => 
        room.id === roomId 
          ? { ...room, notifications: !room.notifications }
          : room
      )
    )
  }

  const filteredRooms = chatRooms.filter(room => {
    // Category filter
    if (selectedCategory && room.category !== selectedCategory) return false
    
    // Joined filter
    if (showJoinedOnly && !room.isJoined) return false
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        room.name.toLowerCase().includes(query) ||
        room.description.toLowerCase().includes(query) ||
        room.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }
    
    return true
  })

  const categories = Object.keys(CHAT_CATEGORIES)
  const joinedRoomsCount = chatRooms.filter(room => room.isJoined).length
  const currentUser = authService.getCurrentUser()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-50 to-secondary-50 py-16">
          <div className="container-width">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Community{' '}
                <span className="gradient-text">Chat Rooms</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-8">
                Join conversations with like-minded women across London. Share experiences, get advice, and build lasting friendships.
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <input
                  type="text"
                  placeholder="Search chat rooms by name or topic..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                />
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
              </div>
              
              {currentUser && joinedRoomsCount > 0 && (
                <div className="mt-6">
                  <p className="text-gray-600">
                    You're a member of <span className="font-semibold text-primary-600">{joinedRoomsCount}</span> chat room{joinedRoomsCount === 1 ? '' : 's'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container-width">
            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showJoinedOnly}
                    onChange={(e) => setShowJoinedOnly(e.target.checked)}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Show joined rooms only</span>
                </label>
              </div>
              
              <div className="text-gray-600">
                {loading ? 'Loading...' : `${filteredRooms.length} room${filteredRooms.length === 1 ? '' : 's'} found`}
              </div>
            </div>

            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

            {/* Chat Rooms Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                    <div className="h-32 bg-gray-200"></div>
                    <div className="p-6">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded mb-4 w-2/3"></div>
                      <div className="h-3 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded mb-4 w-3/4"></div>
                      <div className="h-10 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredRooms.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">💬</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No chat rooms found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search or filters to find the perfect room for you.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory(null)
                    setShowJoinedOnly(false)
                  }}
                  className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors font-medium"
                >
                  Show All Rooms
                </button>
              </div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                <AnimatePresence>
                  {filteredRooms.map((room) => (
                    <ChatRoomCard
                      key={room.id}
                      room={room}
                      onJoin={handleJoinRoom}
                      onToggleNotifications={handleToggleNotifications}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Help Section */}
            {!loading && (
              <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
                <div className="text-center max-w-2xl mx-auto">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">New to Community Chat?</h2>
                  <p className="text-gray-600 mb-6">
                    Our chat rooms are safe, welcoming spaces where LusoTown members can connect, share experiences, and support each other. Each room has its own community guidelines and active moderators.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <CheckCircleIcon className="w-6 h-6 text-green-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">Verified Members</h3>
                      <p className="text-sm text-gray-600">All participants are verified LusoTown members</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <UsersIcon className="w-6 h-6 text-primary-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">Active Moderation</h3>
                      <p className="text-sm text-gray-600">Dedicated moderators ensure positive conversations</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <ChatBubbleLeftRightIcon className="w-6 h-6 text-purple-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">Diverse Topics</h3>
                      <p className="text-sm text-gray-600">Find conversations that match your interests</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}