'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import {
  Users,
  Calendar,
  Clock,
  MapPin,
  Check,
  X,
  Heart,
  Star,
  MessageCircle,
  Filter,
  Search,
  ChevronDown,
  TrendingUp,
  Gift,
  Crown,
  AlertCircle
} from 'lucide-react'
import { formatPrice } from '@/config/pricing'
import type { EventBuddy, Event, GroupBooking } from '@/types/event'

interface EventBuddyDashboardProps {
  currentUserId: string
}

// Mock data for the dashboard
const mockBuddyRequests: EventBuddy[] = [
  {
    id: 'buddy-1',
    requesterId: 'user-1',
    requesteeId: 'current-user',
    eventId: '1',
    buddyType: 'cultural_companion',
    status: 'pending',
    message: 'Would love to experience authentic Fado with someone who appreciates Portuguese culture!',
    groupSize: 2,
    culturalPreferences: {
      music_type: 'traditional',
      language: 'both',
      cultural_focus: 'high'
    },
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'buddy-2',
    requesterId: 'current-user',
    requesteeId: 'user-2',
    eventId: '2',
    buddyType: 'friend_group',
    status: 'accepted',
    message: 'Perfect for learning traditional Portuguese cooking together!',
    groupSize: 4,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'buddy-3',
    requesterId: 'user-3',
    requesteeId: 'current-user',
    eventId: '3',
    buddyType: 'networking_partner',
    status: 'accepted',
    message: 'Great opportunity for Portuguese business networking!',
    groupSize: 2,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  }
]

const mockEvents: Event[] = [
  {
    id: 1,
    title: "Noite de Fado Autêntico",
    description: "Uma noite íntima de Fado tradicional com fadistas portugueses consagrados",
    location: "Portuguese Cultural Centre",
    date: "Sáb, 7 Dez",
    time: "8:00 PM",
    attendees: 18,
    maxAttendees: 30,
    price: 35,
    category: "Music & Culture",
    image: "/events/portuguese/fado-night.jpg",
    status: "available",
    portugueseCulturalFocus: true,
    culturalCategory: "Traditional Music",
    buddyPricingEnabled: true,
    tags: ["fado", "traditional", "music", "portuguese"]
  },
  {
    id: 2,
    title: "Workshop de Culinária Tradicional",
    description: "Aprenda a fazer pastéis de nata perfeitos e cataplana autêntica",
    location: "Culinary Studio London",
    date: "Dom, 8 Dez",
    time: "2:00 PM",
    attendees: 8,
    maxAttendees: 12,
    price: 65,
    category: "Cooking & Food",
    image: "/events/portuguese/cooking-workshop.jpg",
    status: "available",
    portugueseCulturalFocus: true,
    culturalCategory: "Portuguese Cuisine",
    buddyPricingEnabled: true,
    tags: ["cooking", "traditional", "food", "portuguese"]
  },
  {
    id: 3,
    title: "Santos Populares em Londres",
    description: "Celebrate Santos Populares with traditional Portuguese festivities",
    location: "Vauxhall Portuguese Community",
    date: "Sáb, 14 Dez",
    time: "6:00 PM",
    attendees: 45,
    maxAttendees: 80,
    price: 25,
    category: "Cultural Festival",
    image: "/events/portuguese/santos-populares.jpg",
    status: "available",
    portugueseCulturalFocus: true,
    culturalCategory: "Traditional Festival",
    buddyPricingEnabled: true,
    tags: ["santos_populares", "festival", "portuguese"]
  }
]

const mockUsers = [
  {
    id: 'user-1',
    firstName: 'Maria',
    lastName: 'Silva',
    profilePictureUrl: '/images/avatars/maria.jpg',
    age: 28,
    location: 'South London',
    culturalBackground: 'portugal',
    membershipTier: 'premium'
  },
  {
    id: 'user-2',
    firstName: 'João',
    lastName: 'Santos',
    profilePictureUrl: '/images/avatars/joao.jpg',
    age: 34,
    location: 'Central London',
    culturalBackground: 'brazil',
    membershipTier: 'core'
  },
  {
    id: 'user-3',
    firstName: 'Ana',
    lastName: 'Costa',
    profilePictureUrl: '/images/avatars/ana.jpg',
    age: 31,
    location: 'East London',
    culturalBackground: 'portugal',
    membershipTier: 'premium'
  }
]

export default function EventBuddyDashboard({ currentUserId }: EventBuddyDashboardProps) {
  const { language, t } = useLanguage()
  const [activeTab, setActiveTab] = useState<'pending' | 'active' | 'history'>('pending')
  const [buddyRequests, setBuddyRequests] = useState<EventBuddy[]>(mockBuddyRequests)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'cultural_companion' | 'friend_group' | 'networking_partner' | 'double_date'>('all')

  const handleAcceptRequest = (requestId: string) => {
    setBuddyRequests(prev => 
      prev.map(request => 
        request.id === requestId 
          ? { ...request, status: 'accepted', updatedAt: new Date().toISOString() }
          : request
      )
    )
  }

  const handleDeclineRequest = (requestId: string) => {
    setBuddyRequests(prev => 
      prev.map(request => 
        request.id === requestId 
          ? { ...request, status: 'declined', updatedAt: new Date().toISOString() }
          : request
      )
    )
  }

  const getFilteredRequests = () => {
    let filtered = buddyRequests

    // Filter by status based on active tab
    switch (activeTab) {
      case 'pending':
        filtered = filtered.filter(req => req.status === 'pending')
        break
      case 'active':
        filtered = filtered.filter(req => req.status === 'accepted')
        break
      case 'history':
        filtered = filtered.filter(req => ['declined', 'cancelled', 'completed'].includes(req.status))
        break
    }

    // Filter by buddy type
    if (filterType !== 'all') {
      filtered = filtered.filter(req => req.buddyType === filterType)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(req => {
        const event = mockEvents.find(e => e.id.toString() === req.eventId)
        const user = mockUsers.find(u => u.id === req.requesterId || u.id === req.requesteeId)
        return (
          event?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user?.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user?.lastName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })
    }

    return filtered
  }

  const getTabCounts = () => {
    return {
      pending: buddyRequests.filter(req => req.status === 'pending').length,
      active: buddyRequests.filter(req => req.status === 'accepted').length,
      history: buddyRequests.filter(req => ['declined', 'cancelled', 'completed'].includes(req.status)).length
    }
  }

  const getBuddyTypeIcon = (type: EventBuddy['buddyType']) => {
    switch (type) {
      case 'double_date': return Heart
      case 'friend_group': return Users
      case 'cultural_companion': return Star
      case 'networking_partner': return TrendingUp
      default: return Users
    }
  }

  const getMembershipBadge = (tier: string) => {
    switch (tier) {
      case 'premium':
        return { color: 'text-premium-600 bg-premium-50', icon: Crown, label: 'Premium' }
      case 'core':
        return { color: 'text-coral-600 bg-coral-50', icon: Star, label: 'Core' }
      default:
        return { color: 'text-neutral-600 bg-neutral-50', icon: Users, label: 'Free' }
    }
  }

  const getStatusColor = (status: EventBuddy['status']) => {
    switch (status) {
      case 'pending': return 'text-amber-600 bg-amber-50 border-amber-200'
      case 'accepted': return 'text-secondary-600 bg-secondary-50 border-secondary-200'
      case 'declined': return 'text-gray-600 bg-gray-50 border-gray-200'
      case 'completed': return 'text-green-600 bg-green-50 border-green-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const tabCounts = getTabCounts()
  const filteredRequests = getFilteredRequests()

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-coral-100 to-secondary-100 rounded-xl flex items-center justify-center">
            <Users className="w-5 h-5 text-coral-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {t('event_buddy.title')} Dashboard
            </h3>
            <p className="text-sm text-gray-600">
              Manage your event buddy requests and connections
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search events or people..."
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
          />
        </div>
        <div className="relative">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="cultural_companion">{t('event_buddy.buddy_types.cultural_companion')}</option>
            <option value="friend_group">{t('event_buddy.buddy_types.friend_group')}</option>
            <option value="networking_partner">{t('event_buddy.buddy_types.networking_partner')}</option>
            <option value="double_date">{t('event_buddy.buddy_types.double_date')}</option>
          </select>
          <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        {[
          { key: 'pending', label: t('event_buddy.pending_requests'), count: tabCounts.pending },
          { key: 'active', label: t('event_buddy.active_buddies'), count: tabCounts.active },
          { key: 'history', label: 'History', count: tabCounts.history }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === tab.key
                ? 'border-secondary-500 text-secondary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count > 0 && (
              <span className={`px-2 py-0.5 text-xs rounded-full ${
                activeTab === tab.key
                  ? 'bg-secondary-100 text-secondary-600'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Buddy Requests List */}
      <div className="space-y-4">
        {filteredRequests.length > 0 ? (
          filteredRequests.map((request) => {
            const event = mockEvents.find(e => e.id.toString() === request.eventId)
            const otherUserId = request.requesterId === currentUserId ? request.requesteeId : request.requesterId
            const otherUser = mockUsers.find(u => u.id === otherUserId)
            const isIncoming = request.requesteeId === currentUserId
            
            if (!event || !otherUser) return null

            const BuddyTypeIcon = getBuddyTypeIcon(request.buddyType)
            const membershipBadge = getMembershipBadge(otherUser.membershipTier)
            const MembershipIcon = membershipBadge.icon

            return (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  {/* Event Image */}
                  <div className="w-16 h-16 bg-gray-100 rounded-xl flex-shrink-0 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = '/images/event-placeholder.jpg'
                      }}
                    />
                  </div>

                  <div className="flex-1">
                    {/* Event and User Info */}
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {event.title}
                        </h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full border text-xs font-medium ${getStatusColor(request.status)}`}>
                        {request.status}
                      </div>
                    </div>

                    {/* Buddy Info */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                        <img
                          src={otherUser.profilePictureUrl}
                          alt={otherUser.firstName}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = '/images/avatar-placeholder.jpg'
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">
                            {otherUser.firstName} {otherUser.lastName}
                          </span>
                          <div className={`${membershipBadge.color} rounded-lg px-2 py-1 flex items-center gap-1`}>
                            <MembershipIcon className="w-3 h-3" />
                            <span className="text-xs font-medium">{membershipBadge.label}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>{otherUser.age} • {otherUser.location}</span>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <BuddyTypeIcon className="w-3 h-3" />
                            <span>{t('event_buddy.buddy_types.' + request.buddyType)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    {request.message && (
                      <div className="p-3 bg-gray-50 rounded-lg mb-3">
                        <p className="text-sm text-gray-700 italic">
                          "{request.message}"
                        </p>
                      </div>
                    )}

                    {/* Group Details */}
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{request.groupSize} people</span>
                      </div>
                      {event.buddyPricingEnabled && (
                        <div className="flex items-center gap-1 text-coral-600">
                          <Gift className="w-4 h-4" />
                          <span>Group discount available</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <span className="font-medium">{formatPrice(event.price)} per person</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        {isIncoming ? 'Incoming request' : 'Outgoing request'} • 
                        {new Date(request.createdAt).toLocaleDateString()}
                      </div>
                      
                      {request.status === 'pending' && isIncoming && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleDeclineRequest(request.id)}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center gap-1"
                          >
                            <X className="w-4 h-4" />
                            {t('event_buddy.decline_request')}
                          </button>
                          <button
                            onClick={() => handleAcceptRequest(request.id)}
                            className="px-4 py-2 bg-gradient-to-r from-secondary-500 to-coral-500 text-white rounded-lg text-sm font-medium hover:from-secondary-600 hover:to-coral-600 transition-all flex items-center gap-1"
                          >
                            <Check className="w-4 h-4" />
                            {t('event_buddy.accept_request')}
                          </button>
                        </div>
                      )}

                      {request.status === 'accepted' && (
                        <div className="flex gap-2">
                          <button className="px-4 py-2 bg-secondary-50 text-secondary-700 rounded-lg text-sm font-medium hover:bg-secondary-100 transition-colors flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            Message
                          </button>
                          <button className="px-4 py-2 bg-gradient-to-r from-secondary-500 to-coral-500 text-white rounded-lg text-sm font-medium hover:from-secondary-600 hover:to-coral-600 transition-all">
                            View Event
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-gray-400" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">
              {activeTab === 'pending' && 'No pending requests'}
              {activeTab === 'active' && 'No active buddies'}
              {activeTab === 'history' && 'No history yet'}
            </h4>
            <p className="text-gray-600 mb-4">
              {activeTab === 'pending' && 'You don\'t have any pending buddy requests at the moment.'}
              {activeTab === 'active' && 'You don\'t have any active event buddies yet.'}
              {activeTab === 'history' && 'Your buddy request history will appear here.'}
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-secondary-500 to-coral-500 text-white rounded-xl font-medium hover:from-secondary-600 hover:to-coral-600 transition-all">
              Explore Events
            </button>
          </div>
        )}
      </div>
    </div>
  )
}