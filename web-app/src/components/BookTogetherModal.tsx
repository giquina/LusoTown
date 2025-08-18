'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import {
  Users,
  Plus,
  X,
  Check,
  Clock,
  CreditCard,
  Gift,
  Copy,
  Calendar,
  MapPin,
  Share2,
  Mail,
  MessageCircle,
  AlertCircle
} from 'lucide-react'
import { formatPrice } from '@/config/pricing'
import type { Event, GroupBooking, GroupBookingParticipant, BuddyPricingTier } from '@/types/event'

interface BookTogetherModalProps {
  isOpen: boolean
  onClose: () => void
  event: Event
  currentUserId: string
  onGroupBookingCreate?: (booking: Partial<GroupBooking>) => void
}

interface InviteFriend {
  id: string
  name: string
  email: string
  phone?: string
}

// Mock friends data
const mockFriends = [
  {
    id: 'friend-1',
    name: 'Maria Santos',
    email: 'maria@example.com',
    phone: '+44 7123 456789'
  },
  {
    id: 'friend-2',
    name: 'João Silva',
    email: 'joao@example.com',
    phone: '+44 7987 654321'
  },
  {
    id: 'friend-3',
    name: 'Ana Costa',
    email: 'ana@example.com',
    phone: '+44 7555 123456'
  }
]

// Mock buddy pricing tiers
const mockBuddyPricing: BuddyPricingTier[] = [
  {
    id: 'tier-2',
    eventId: '1',
    groupSize: 2,
    discountPercentage: 10,
    pricePerPerson: 31.50,
    description: 'Pair discount',
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'tier-3',
    eventId: '1',
    groupSize: 3,
    discountPercentage: 15,
    pricePerPerson: 29.75,
    description: 'Group of 3 discount',
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'tier-4',
    eventId: '1',
    groupSize: 4,
    discountPercentage: 20,
    pricePerPerson: 28.00,
    description: 'Group of 4 discount',
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

export default function BookTogetherModal({
  isOpen,
  onClose,
  event,
  currentUserId,
  onGroupBookingCreate
}: BookTogetherModalProps) {
  const { language, t } = useLanguage()
  const [step, setStep] = useState(1) // 1: Setup, 2: Invite, 3: Confirm
  const [groupName, setGroupName] = useState('')
  const [paymentSplit, setPaymentSplit] = useState<'equal' | 'organizer_pays' | 'custom'>('equal')
  const [invitedFriends, setInvitedFriends] = useState<InviteFriend[]>([])
  const [specialRequirements, setSpecialRequirements] = useState('')
  const [bookingCreated, setBookingCreated] = useState(false)
  const [bookingReference, setBookingReference] = useState('')
  const [selectedPricingTier, setSelectedPricingTier] = useState<BuddyPricingTier | null>(null)

  const totalParticipants = invitedFriends.length + 1 // +1 for current user
  const totalAmount = selectedPricingTier 
    ? selectedPricingTier.pricePerPerson * totalParticipants
    : event.price * totalParticipants
  const discountAmount = selectedPricingTier 
    ? (event.price - selectedPricingTier.pricePerPerson) * totalParticipants
    : 0
  const finalAmount = totalAmount

  useEffect(() => {
    // Find appropriate pricing tier for current group size
    const tier = mockBuddyPricing.find(t => t.groupSize === totalParticipants)
    setSelectedPricingTier(tier || null)
  }, [totalParticipants])

  const handleAddFriend = (friend: InviteFriend) => {
    if (!invitedFriends.find(f => f.id === friend.id)) {
      setInvitedFriends(prev => [...prev, friend])
    }
  }

  const handleRemoveFriend = (friendId: string) => {
    setInvitedFriends(prev => prev.filter(f => f.id !== friendId))
  }

  const handleCreateBooking = () => {
    const newBooking: Partial<GroupBooking> = {
      eventId: event.id.toString(),
      organizerId: currentUserId,
      groupName: groupName || `${event.title} Group`,
      totalParticipants,
      confirmedParticipants: 1, // Only organizer confirmed initially
      paymentSplitType: paymentSplit,
      totalAmount: event.price * totalParticipants,
      groupDiscountPercentage: selectedPricingTier?.discountPercentage || 0,
      groupDiscountAmount: discountAmount,
      finalAmount,
      currency: 'GBP',
      bookingStatus: 'pending',
      paymentStatus: 'pending',
      specialRequirements
    }

    // Generate mock booking reference
    const reference = `GB${Date.now().toString().slice(-6)}`
    setBookingReference(reference)
    
    onGroupBookingCreate?.(newBooking)
    setBookingCreated(true)
    setStep(3)
  }

  const handleCopyBookingReference = () => {
    navigator.clipboard.writeText(bookingReference)
  }

  const handleShareBooking = (method: 'email' | 'whatsapp' | 'copy') => {
    const shareText = `Join me for ${event.title} on ${event.date}! Group booking reference: ${bookingReference}. Book at LusoTown.com`
    
    switch (method) {
      case 'email':
        window.open(`mailto:?subject=Join me for ${event.title}&body=${encodeURIComponent(shareText)}`)
        break
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`)
        break
      case 'copy':
        navigator.clipboard.writeText(shareText)
        break
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-secondary-100 to-coral-100 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-secondary-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {t('book_together.title')}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {event.title}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            {/* Progress Steps */}
            <div className="flex items-center gap-2 mt-4">
              {[1, 2, 3].map((stepNum) => (
                <div key={stepNum} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNum 
                      ? 'bg-secondary-500 text-white' 
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    {bookingCreated && stepNum === 3 ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      stepNum
                    )}
                  </div>
                  {stepNum < 3 && (
                    <div className={`w-8 h-0.5 ${
                      step > stepNum ? 'bg-secondary-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="px-6 py-6">
            {/* Step 1: Setup Group */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('book_together.create_group')}
                  </h4>
                  
                  {/* Group Name */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('book_together.group_name')}
                    </label>
                    <input
                      type="text"
                      value={groupName}
                      onChange={(e) => setGroupName(e.target.value)}
                      placeholder={t('book_together.group_name_placeholder')}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                    />
                  </div>

                  {/* Payment Split */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      {t('book_together.payment_split')}
                    </label>
                    <div className="space-y-3">
                      {[
                        { value: 'equal', label: t('book_together.payment_split.equal'), icon: Users },
                        { value: 'organizer_pays', label: t('book_together.payment_split.organizer_pays'), icon: CreditCard },
                        { value: 'custom', label: t('book_together.payment_split.custom'), icon: Gift }
                      ].map((option) => {
                        const IconComponent = option.icon
                        return (
                          <button
                            key={option.value}
                            onClick={() => setPaymentSplit(option.value as any)}
                            className={`w-full p-3 border rounded-lg text-left transition-all ${
                              paymentSplit === option.value
                                ? 'border-secondary-300 bg-secondary-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <IconComponent className="w-5 h-5 text-gray-600" />
                              <span className="font-medium text-gray-900">
                                {option.label}
                              </span>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Special Requirements */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('book_together.special_requirements')}
                    </label>
                    <textarea
                      value={specialRequirements}
                      onChange={(e) => setSpecialRequirements(e.target.value)}
                      placeholder="Any special dietary requirements or accessibility needs..."
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                      rows={3}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-3 bg-gradient-to-r from-secondary-500 to-coral-500 text-white rounded-xl font-medium hover:from-secondary-600 hover:to-coral-600 transition-all"
                  >
                    {t('book_together.invite_friends')}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Invite Friends */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('book_together.invite_friends')}
                  </h4>

                  {/* Available Friends */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Available friends to invite:
                    </label>
                    <div className="space-y-2">
                      {mockFriends.map((friend) => {
                        const isInvited = invitedFriends.find(f => f.id === friend.id)
                        return (
                          <div
                            key={friend.id}
                            className={`p-3 border rounded-lg flex items-center justify-between ${
                              isInvited ? 'border-secondary-300 bg-secondary-50' : 'border-gray-200'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                <span className="text-sm font-medium text-gray-600">
                                  {friend.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">
                                  {friend.name}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {friend.email}
                                </div>
                              </div>
                            </div>
                            {isInvited ? (
                              <button
                                onClick={() => handleRemoveFriend(friend.id)}
                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                              >
                                Remove
                              </button>
                            ) : (
                              <button
                                onClick={() => handleAddFriend(friend)}
                                className="px-3 py-1 bg-secondary-500 text-white rounded-lg text-sm font-medium hover:bg-secondary-600 transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Current Group */}
                  {invitedFriends.length > 0 && (
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        {t('book_together.participants')} ({totalParticipants})
                      </label>
                      <div className="space-y-2">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-secondary-500 text-white rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium">You</span>
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">
                                {t('book_together.organizer')}
                              </div>
                              <div className="text-sm text-gray-600">
                                Group organizer
                              </div>
                            </div>
                          </div>
                        </div>
                        {invitedFriends.map((friend) => (
                          <div key={friend.id} className="p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                  <span className="text-sm font-medium text-gray-600">
                                    {friend.name.split(' ').map(n => n[0]).join('')}
                                  </span>
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900">
                                    {friend.name}
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    Invitation pending
                                  </div>
                                </div>
                              </div>
                              <button
                                onClick={() => handleRemoveFriend(friend.id)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Pricing Summary */}
                  {totalParticipants > 1 && (
                    <div className="p-4 bg-gradient-to-r from-secondary-50 to-coral-50 rounded-xl border border-secondary-200">
                      <div className="flex items-center gap-2 mb-3">
                        <Gift className="w-5 h-5 text-secondary-600" />
                        <h5 className="font-semibold text-secondary-900">
                          Group Pricing
                        </h5>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-700">
                            Individual price ({totalParticipants} × {formatPrice(event.price)})
                          </span>
                          <span className="text-gray-900 line-through">
                            {formatPrice(event.price * totalParticipants)}
                          </span>
                        </div>
                        {selectedPricingTier && (
                          <>
                            <div className="flex justify-between text-coral-600 font-medium">
                              <span>Group discount ({selectedPricingTier.discountPercentage}% off)</span>
                              <span>-{formatPrice(discountAmount)}</span>
                            </div>
                            <div className="flex justify-between font-semibold text-secondary-700 pt-2 border-t border-secondary-200">
                              <span>{t('book_together.final_amount')}</span>
                              <span>{formatPrice(finalAmount)}</span>
                            </div>
                            <div className="text-center text-sm text-secondary-600">
                              {formatPrice(selectedPricingTier.pricePerPerson)} {t('book_together.per_person')}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleCreateBooking}
                    disabled={invitedFriends.length === 0}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-secondary-500 to-coral-500 text-white rounded-xl font-medium hover:from-secondary-600 hover:to-coral-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {t('book_together.create_booking')}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Booking Confirmation */}
            {step === 3 && bookingCreated && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-secondary-100 to-coral-100 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 text-secondary-600" />
                </div>
                
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">
                    {t('book_together.booking_created')}
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Your group booking has been created successfully. Share the details with your friends!
                  </p>
                </div>

                {/* Booking Reference */}
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="text-sm font-medium text-gray-700 mb-2">
                    {t('book_together.booking_reference')}
                  </div>
                  <div className="flex items-center gap-2 justify-center">
                    <span className="text-lg font-bold text-gray-900">
                      {bookingReference}
                    </span>
                    <button
                      onClick={handleCopyBookingReference}
                      className="p-1 hover:bg-gray-200 rounded transition-colors"
                    >
                      <Copy className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-4 border border-gray-200 rounded-xl text-left">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-900 mb-1">
                        {event.title}
                      </h5>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{event.date} at {event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>{totalParticipants} participants</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4" />
                          <span>{formatPrice(finalAmount)} total ({formatPrice(selectedPricingTier?.pricePerPerson || event.price)} per person)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Share Options */}
                <div>
                  <h5 className="font-medium text-gray-900 mb-3">
                    Share with your friends
                  </h5>
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => handleShareBooking('email')}
                      className="p-3 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleShareBooking('whatsapp')}
                      className="p-3 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleShareBooking('copy')}
                      className="p-3 bg-gray-50 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <Copy className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Next Steps */}
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="text-left">
                      <div className="font-medium text-amber-900 mb-1">
                        Next steps
                      </div>
                      <ul className="text-sm text-amber-800 space-y-1">
                        <li>• Your friends will receive invitations by email</li>
                        <li>• They have 48 hours to confirm their attendance</li>
                        <li>• Payment will be processed once everyone confirms</li>
                        <li>• You'll receive confirmation and event tickets</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="px-8 py-3 bg-gradient-to-r from-secondary-500 to-coral-500 text-white rounded-xl font-medium hover:from-secondary-600 hover:to-coral-600 transition-all"
                >
                  Done
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}