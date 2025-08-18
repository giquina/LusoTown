'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import {
  Users,
  Heart,
  MessageCircle,
  Calendar,
  MapPin,
  Clock,
  Check,
  X,
  Plus,
  Star,
  Crown,
  Gift,
  TrendingDown
} from 'lucide-react'
import { formatPrice } from '@/config/pricing'
import type { EventBuddy, Event, BuddyPricingTier } from '@/types/event'

interface EventBuddySystemProps {
  eventId: string
  currentUserId: string
  event: Event
  onBuddyRequest?: (buddyRequest: Partial<EventBuddy>) => void
}

// Mock buddy pricing data
const mockBuddyPricing: BuddyPricingTier[] = [
  {
    id: 'tier-2',
    eventId: '1',
    groupSize: 2,
    discountPercentage: 10,
    pricePerPerson: 31.50,
    description: 'Pair discount for couples or friends',
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'tier-4',
    eventId: '1',
    groupSize: 4,
    discountPercentage: 20,
    pricePerPerson: 28.00,
    description: 'Group of 4 friends discount',
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'tier-6',
    eventId: '1',
    groupSize: 6,
    discountPercentage: 25,
    pricePerPerson: 26.25,
    description: 'Large group discount',
    isActive: true,
    createdAt: new Date().toISOString()
  }
]

// Mock potential buddies
const mockPotentialBuddies = [
  {
    id: 'user-1',
    firstName: 'Maria',
    lastName: 'Silva',
    profilePictureUrl: '/images/avatars/maria.jpg',
    age: 28,
    location: 'South London',
    culturalBackground: 'portugal',
    sharedInterests: ['fado', 'portuguese_cuisine', 'traditional_music'],
    compatibilityScore: 92,
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
    sharedInterests: ['portuguese_music', 'cultural_events', 'networking'],
    compatibilityScore: 87,
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
    sharedInterests: ['fado', 'traditional_music', 'cultural_preservation'],
    compatibilityScore: 94,
    membershipTier: 'premium'
  }
]

// Mock existing buddy requests
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
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  }
]

export default function EventBuddySystem({ 
  eventId, 
  currentUserId, 
  event,
  onBuddyRequest 
}: EventBuddySystemProps) {
  const { language, t } = useLanguage()
  const [showRequestForm, setShowRequestForm] = useState(false)
  const [selectedBuddy, setSelectedBuddy] = useState<string>('')
  const [buddyType, setBuddyType] = useState<EventBuddy['buddyType']>('cultural_companion')
  const [groupSize, setGroupSize] = useState(2)
  const [message, setMessage] = useState('')
  const [buddyRequests, setBuddyRequests] = useState<EventBuddy[]>(mockBuddyRequests)
  const [selectedPricingTier, setSelectedPricingTier] = useState<BuddyPricingTier | null>(null)

  useEffect(() => {
    // Find the appropriate pricing tier for current group size
    const tier = mockBuddyPricing.find(t => t.groupSize === groupSize)
    setSelectedPricingTier(tier || null)
  }, [groupSize])

  const buddyTypeOptions = [
    { value: 'double_date', label: t('event_buddy.buddy_types.double_date'), icon: Heart },
    { value: 'friend_group', label: t('event_buddy.buddy_types.friend_group'), icon: Users },
    { value: 'cultural_companion', label: t('event_buddy.buddy_types.cultural_companion'), icon: Star },
    { value: 'networking_partner', label: t('event_buddy.buddy_types.networking_partner'), icon: TrendingDown }
  ]

  const handleSendBuddyRequest = () => {
    if (!selectedBuddy) return

    const newRequest: Partial<EventBuddy> = {
      requesterId: currentUserId,
      requesteeId: selectedBuddy,
      eventId,
      buddyType,
      groupSize,
      message,
      status: 'pending'
    }

    onBuddyRequest?.(newRequest)
    
    // Add to local state for immediate feedback
    setBuddyRequests(prev => [...prev, {
      ...newRequest,
      id: `buddy-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    } as EventBuddy])

    // Reset form
    setShowRequestForm(false)
    setSelectedBuddy('')
    setMessage('')
  }

  const handleAcceptBuddyRequest = (requestId: string) => {
    setBuddyRequests(prev => 
      prev.map(request => 
        request.id === requestId 
          ? { ...request, status: 'accepted' }
          : request
      )
    )
  }

  const handleDeclineBuddyRequest = (requestId: string) => {
    setBuddyRequests(prev => 
      prev.map(request => 
        request.id === requestId 
          ? { ...request, status: 'declined' }
          : request
      )
    )
  }

  const getSavingsAmount = (originalPrice: number, groupSize: number): number => {
    const tier = mockBuddyPricing.find(t => t.groupSize === groupSize)
    if (!tier) return 0
    return originalPrice - tier.pricePerPerson
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
              {t('event_buddy.title')}
            </h3>
            <p className="text-sm text-gray-600">
              {t('event_buddy.subtitle')}
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowRequestForm(true)}
          className="px-4 py-2 bg-gradient-to-r from-coral-500 to-secondary-500 text-white rounded-xl font-medium text-sm hover:from-coral-600 hover:to-secondary-600 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          {t('event_buddy.request_buddy')}
        </button>
      </div>

      {/* Group Pricing Display */}
      {event.buddyPricingEnabled && (
        <div className="mb-6 p-4 bg-gradient-to-r from-secondary-50 to-coral-50 rounded-xl border border-secondary-200">
          <div className="flex items-center gap-2 mb-3">
            <Gift className="w-5 h-5 text-secondary-600" />
            <h4 className="font-semibold text-secondary-900">
              {t('event_buddy.group_discount')}
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {mockBuddyPricing.map((tier) => {
              const savings = getSavingsAmount(event.price, tier.groupSize)
              return (
                <div 
                  key={tier.id}
                  className="bg-white rounded-lg p-3 border border-secondary-200"
                >
                  <div className="text-center">
                    <div className="text-lg font-bold text-secondary-600">
                      {tier.groupSize} {language === 'pt' ? 'pessoas' : 'people'}
                    </div>
                    <div className="text-sm text-gray-600 line-through">
                      {formatPrice(event.price)}
                    </div>
                    <div className="text-xl font-bold text-secondary-700">
                      {formatPrice(tier.pricePerPerson)}
                    </div>
                    <div className="text-xs text-coral-600 font-medium">
                      {t('event_buddy.save_per_person').replace('{amount}', formatPrice(savings))}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {tier.discountPercentage}% {language === 'pt' ? 'desconto' : 'off'}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Pending Buddy Requests */}
      {buddyRequests.filter(req => req.status === 'pending').length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">
            {t('event_buddy.pending_requests')}
          </h4>
          <div className="space-y-3">
            {buddyRequests
              .filter(req => req.status === 'pending')
              .map((request) => {
                const buddy = mockPotentialBuddies.find(b => b.id === request.requesterId)
                if (!buddy) return null

                const membershipBadge = getMembershipBadge(buddy.membershipTier)
                const MembershipIcon = membershipBadge.icon

                return (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 border border-gray-200 rounded-xl"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0">
                        <img
                          src={buddy.profilePictureUrl}
                          alt={buddy.firstName}
                          className="w-12 h-12 rounded-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = '/images/avatar-placeholder.jpg'
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h5 className="font-semibold text-gray-900">
                            {buddy.firstName} {buddy.lastName}
                          </h5>
                          <div className={`${membershipBadge.color} rounded-lg px-2 py-1 flex items-center gap-1`}>
                            <MembershipIcon className="w-3 h-3" />
                            <span className="text-xs font-medium">{membershipBadge.label}</span>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          {buddy.age} • {buddy.location} • {buddy.compatibilityScore}% {language === 'pt' ? 'compatível' : 'compatible'}
                        </div>
                        {request.message && (
                          <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3 mb-3">
                            "{request.message}"
                          </p>
                        )}
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-500">
                            {t('event_buddy.buddy_types.' + request.buddyType)} • {request.groupSize} {language === 'pt' ? 'pessoas' : 'people'}
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleDeclineBuddyRequest(request.id)}
                              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center gap-1"
                            >
                              <X className="w-3 h-3" />
                              {t('event_buddy.decline_request')}
                            </button>
                            <button
                              onClick={() => handleAcceptBuddyRequest(request.id)}
                              className="px-3 py-1 bg-gradient-to-r from-secondary-500 to-coral-500 text-white rounded-lg text-sm font-medium hover:from-secondary-600 hover:to-coral-600 transition-all flex items-center gap-1"
                            >
                              <Check className="w-3 h-3" />
                              {t('event_buddy.accept_request')}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
          </div>
        </div>
      )}

      {/* Active Buddies */}
      {buddyRequests.filter(req => req.status === 'accepted').length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">
            {t('event_buddy.active_buddies')}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {buddyRequests
              .filter(req => req.status === 'accepted')
              .map((request) => {
                const buddy = mockPotentialBuddies.find(b => b.id === request.requesterId)
                if (!buddy) return null

                return (
                  <div
                    key={request.id}
                    className="p-3 bg-gradient-to-r from-secondary-50 to-coral-50 rounded-xl border border-secondary-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200">
                        <img
                          src={buddy.profilePictureUrl}
                          alt={buddy.firstName}
                          className="w-10 h-10 rounded-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = '/images/avatar-placeholder.jpg'
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">
                          {buddy.firstName}
                        </div>
                        <div className="text-xs text-gray-600">
                          {t('event_buddy.buddy_types.' + request.buddyType)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-secondary-600">
                          {selectedPricingTier ? formatPrice(selectedPricingTier.pricePerPerson) : formatPrice(event.price)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {language === 'pt' ? 'por pessoa' : 'per person'}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      )}

      {/* Buddy Request Form Modal */}
      <AnimatePresence>
        {showRequestForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowRequestForm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {t('event_buddy.request_buddy')}
                </h3>
                <button
                  onClick={() => setShowRequestForm(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Select Buddy */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Choose a potential buddy:
                </label>
                <div className="space-y-2">
                  {mockPotentialBuddies.map((buddy) => {
                    const membershipBadge = getMembershipBadge(buddy.membershipTier)
                    const MembershipIcon = membershipBadge.icon

                    return (
                      <div
                        key={buddy.id}
                        onClick={() => setSelectedBuddy(buddy.id)}
                        className={`p-3 border rounded-xl cursor-pointer transition-all ${
                          selectedBuddy === buddy.id
                            ? 'border-secondary-300 bg-secondary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-200">
                            <img
                              src={buddy.profilePictureUrl}
                              alt={buddy.firstName}
                              className="w-10 h-10 rounded-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.src = '/images/avatar-placeholder.jpg'
                              }}
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <div className="font-medium text-gray-900">
                                {buddy.firstName} {buddy.lastName}
                              </div>
                              <div className={`${membershipBadge.color} rounded-lg px-2 py-1 flex items-center gap-1`}>
                                <MembershipIcon className="w-3 h-3" />
                                <span className="text-xs font-medium">{membershipBadge.label}</span>
                              </div>
                            </div>
                            <div className="text-sm text-gray-600">
                              {buddy.age} • {buddy.location} • {buddy.compatibilityScore}% compatible
                            </div>
                            <div className="flex gap-1 mt-1">
                              {buddy.sharedInterests.slice(0, 2).map((interest) => (
                                <span
                                  key={interest}
                                  className="px-2 py-0.5 bg-primary-50 text-primary-700 rounded-full text-xs"
                                >
                                  {interest}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Buddy Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  {t('event_buddy.buddy_types.cultural_companion')}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {buddyTypeOptions.map((option) => {
                    const IconComponent = option.icon
                    return (
                      <button
                        key={option.value}
                        onClick={() => setBuddyType(option.value as EventBuddy['buddyType'])}
                        className={`p-3 border rounded-xl text-sm font-medium transition-all ${
                          buddyType === option.value
                            ? 'border-secondary-300 bg-secondary-50 text-secondary-700'
                            : 'border-gray-200 text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <IconComponent className="w-4 h-4" />
                          <span>{option.label}</span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Group Size */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  {t('event_buddy.group_size')}
                </label>
                <div className="flex gap-2">
                  {[2, 3, 4, 6].map((size) => (
                    <button
                      key={size}
                      onClick={() => setGroupSize(size)}
                      className={`px-4 py-2 border rounded-lg font-medium text-sm transition-all ${
                        groupSize === size
                          ? 'border-secondary-300 bg-secondary-50 text-secondary-700'
                          : 'border-gray-200 text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {selectedPricingTier && (
                  <div className="mt-2 text-sm text-coral-600 font-medium">
                    {formatPrice(selectedPricingTier.pricePerPerson)} per person ({selectedPricingTier.discountPercentage}% off)
                  </div>
                )}
              </div>

              {/* Message */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Message (optional)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t('event_buddy.message_placeholder')}
                  className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                  rows={3}
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowRequestForm(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendBuddyRequest}
                  disabled={!selectedBuddy}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-secondary-500 to-coral-500 text-white rounded-xl font-medium hover:from-secondary-600 hover:to-coral-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t('event_buddy.send_request')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}