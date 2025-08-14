'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  StarIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  FlagIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  UserGroupIcon,
  ChartBarIcon,
  TrophyIcon,
  HandThumbUpIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarSolidIcon, HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { Event, EventReview, eventService } from '@/lib/events'
import { authService } from '@/lib/auth'

interface EventReviewSystemProps {
  event: Event
  userAttended?: boolean
  onReviewAdded?: (review: EventReview) => void
}

interface ReviewFormData {
  rating: number
  comment: string
  anonymous: boolean
  wouldRecommend: boolean
  culturalValue: number
  organizationQuality: number
  venueRating: number
}

export const EventReviewSystem: React.FC<EventReviewSystemProps> = ({
  event,
  userAttended = false,
  onReviewAdded
}) => {
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [formData, setFormData] = useState<ReviewFormData>({
    rating: 0,
    comment: '',
    anonymous: false,
    wouldRecommend: true,
    culturalValue: 0,
    organizationQuality: 0,
    venueRating: 0
  })

  const [hoveredStar, setHoveredStar] = useState(0)
  const [hoveredCultural, setHoveredCultural] = useState(0)
  const [hoveredOrganization, setHoveredOrganization] = useState(0)
  const [hoveredVenue, setHoveredVenue] = useState(0)

  const currentUser = authService.getCurrentUser()

  // Cultural rating labels in Portuguese with English translations
  const culturalLabels = [
    '', 
    'Pouco Autêntico / Not Authentic',
    'Adequado / Adequate', 
    'Bom / Good',
    'Muito Autêntico / Very Authentic',
    'Excepcional / Exceptional'
  ]

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 4000)
  }

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentUser) {
      showNotification('error', 'Please log in to submit a review')
      return
    }

    if (formData.rating === 0) {
      showNotification('error', 'Please select a rating')
      return
    }

    if (formData.comment.trim().length < 20) {
      showNotification('error', 'Please write a more detailed review (minimum 20 characters)')
      return
    }

    setIsSubmitting(true)

    try {
      const reviewData = {
        rating: formData.rating,
        comment: formData.comment,
        reviewerName: formData.anonymous ? 'Anonymous' : currentUser.name,
        membershipTier: currentUser.membershipTier,
        culturalValue: formData.culturalValue,
        organizationQuality: formData.organizationQuality,
        venueRating: formData.venueRating,
        wouldRecommend: formData.wouldRecommend
      }

      const result = await eventService.addReview(event.id, currentUser.id, reviewData)
      
      if (result.success) {
        showNotification('success', 'Obrigado! Your review helps our community grow stronger')
        
        // Create review object for immediate UI update
        const newReview: EventReview = {
          id: `rev-${Date.now()}`,
          eventId: event.id,
          userId: currentUser.id,
          reviewerName: reviewData.reviewerName,
          profileImage: formData.anonymous ? undefined : currentUser.profileImage,
          rating: formData.rating,
          comment: formData.comment,
          createdAt: new Date().toISOString(),
          helpful: 0,
          membershipTier: currentUser.membershipTier
        }

        onReviewAdded?.(newReview)
        setShowReviewForm(false)
        
        // Reset form
        setFormData({
          rating: 0,
          comment: '',
          anonymous: false,
          wouldRecommend: true,
          culturalValue: 0,
          organizationQuality: 0,
          venueRating: 0
        })
      } else {
        showNotification('error', result.message)
      }
    } catch (error) {
      console.error('Error submitting review:', error)
      showNotification('error', 'Failed to submit review. Please try again.')
    }

    setIsSubmitting(false)
  }

  const StarRating = ({ 
    value, 
    hovered, 
    onHover, 
    onChange, 
    size = 'w-6 h-6',
    label 
  }: {
    value: number
    hovered: number
    onHover: (rating: number) => void
    onChange: (rating: number) => void
    size?: string
    label?: string
  }) => (
    <div className="flex flex-col">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onMouseEnter={() => onHover(star)}
            onMouseLeave={() => onHover(0)}
            onClick={() => onChange(star)}
            className="transition-colors focus:outline-none"
          >
            <StarSolidIcon
              className={`${size} ${
                star <= (hovered || value) ? 'text-yellow-400' : 'text-gray-300'
              } hover:text-yellow-400`}
            />
          </button>
        ))}
      </div>
      {label && hovered > 0 && (
        <span className="text-sm text-gray-600 mt-1">{label}</span>
      )}
    </div>
  )

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Community Reviews</h2>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarSolidIcon
                key={star}
                className={`w-5 h-5 ${star <= Math.round(event.averageRating || 0) ? 'text-yellow-400' : 'text-gray-200'}`}
              />
            ))}
          </div>
          <span className="font-semibold text-gray-900">{event.averageRating?.toFixed(1)}</span>
          <span className="text-gray-500">({event.totalReviews} reviews)</span>
        </div>
      </div>

      {/* Review Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100">
          <div className="flex items-center gap-2 mb-1">
            <TrophyIcon className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-green-800">Community Impact</span>
          </div>
          <div className="text-2xl font-bold text-green-700">{((event.averageRating || 0) * 20).toFixed(0)}%</div>
          <div className="text-xs text-green-600">Satisfaction Rate</div>
        </div>
        
        <div className="bg-gradient-to-r from-primary-50 to-primary-100 p-4 rounded-lg border border-primary-100">
          <div className="flex items-center gap-2 mb-1">
            <UserGroupIcon className="w-5 h-5 text-primary-600" />
            <span className="text-sm font-medium text-primary-800">Cultural Connection</span>
          </div>
          <div className="text-2xl font-bold text-primary-700">
            {event.reviews?.filter(r => r.rating >= 4).length || 0}
          </div>
          <div className="text-xs text-primary-600">Highly Rated Reviews</div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-50 to-fuchsia-50 p-4 rounded-lg border border-purple-100">
          <div className="flex items-center gap-2 mb-1">
            <HandThumbUpIcon className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-purple-800">Recommendation</span>
          </div>
          <div className="text-2xl font-bold text-purple-700">
            {Math.round(((event.reviews?.filter(r => r.rating >= 4).length || 0) / (event.reviews?.length || 1)) * 100)}%
          </div>
          <div className="text-xs text-purple-600">Would Recommend</div>
        </div>
      </div>

      {/* Review Form */}
      {userAttended && currentUser && !event.reviews?.some(r => r.userId === currentUser.id) && (
        <div className="border-t border-gray-100 pt-6 mb-6">
          {!showReviewForm ? (
            <div className="text-center">
              <button
                onClick={() => setShowReviewForm(true)}
                className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 shadow-lg"
              >
                Share Your Experience • Partilhe a Sua Experiência
              </button>
              <p className="text-sm text-gray-600 mt-2">
                Help fellow Portuguese community members by sharing your honest feedback
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmitReview}
              className="space-y-6 opacity-0 translate-y-5 animate-fade-in-up"
              style={{ animationDelay: '0.1s' }}
            >
              <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-4 rounded-lg border border-primary-100">
                <h3 className="font-semibold text-gray-900 mb-2">Como foi a sua experiência? • How was your experience?</h3>
                <p className="text-sm text-gray-700">
                  Your honest feedback helps strengthen our Portuguese community in London
                </p>
              </div>

              {/* Overall Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Overall Experience • Experiência Geral *
                </label>
                <StarRating
                  value={formData.rating}
                  hovered={hoveredStar}
                  onHover={setHoveredStar}
                  onChange={(rating) => setFormData(prev => ({ ...prev, rating }))}
                  size="w-8 h-8"
                />
                {formData.rating > 0 && (
                  <p className="text-sm text-gray-600 mt-2">
                    {formData.rating === 1 && "Poor • Fraco"}
                    {formData.rating === 2 && "Fair • Razoável"}
                    {formData.rating === 3 && "Good • Bom"}
                    {formData.rating === 4 && "Very Good • Muito Bom"}
                    {formData.rating === 5 && "Excellent • Excelente"}
                  </p>
                )}
              </div>

              {/* Cultural Value Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cultural Authenticity • Autenticidade Cultural
                </label>
                <StarRating
                  value={formData.culturalValue}
                  hovered={hoveredCultural}
                  onHover={setHoveredCultural}
                  onChange={(rating) => setFormData(prev => ({ ...prev, culturalValue: rating }))}
                  label={culturalLabels[hoveredCultural]}
                />
              </div>

              {/* Organization Quality */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Organization • Organização do Evento
                </label>
                <StarRating
                  value={formData.organizationQuality}
                  hovered={hoveredOrganization}
                  onHover={setHoveredOrganization}
                  onChange={(rating) => setFormData(prev => ({ ...prev, organizationQuality: rating }))}
                />
              </div>

              {/* Venue Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Venue & Location • Local e Ambiente
                </label>
                <StarRating
                  value={formData.venueRating}
                  hovered={hoveredVenue}
                  onHover={setHoveredVenue}
                  onChange={(rating) => setFormData(prev => ({ ...prev, venueRating: rating }))}
                />
              </div>

              {/* Written Review */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Review • A Sua Avaliação *
                </label>
                <textarea
                  value={formData.comment}
                  onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                  placeholder="Share what made this event special for you and our Portuguese community... 
Partilhe o que tornou este evento especial para si e para a nossa comunidade portuguesa..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent resize-none"
                  rows={4}
                  minLength={20}
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-500">Minimum 20 characters</span>
                  <span className={`text-xs ${formData.comment.length >= 20 ? 'text-green-600' : 'text-gray-400'}`}>
                    {formData.comment.length}/500
                  </span>
                </div>
              </div>

              {/* Recommendation */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="recommend"
                  checked={formData.wouldRecommend}
                  onChange={(e) => setFormData(prev => ({ ...prev, wouldRecommend: e.target.checked }))}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="recommend" className="text-sm text-gray-700">
                  I would recommend this event to fellow Portuguese community members
                </label>
              </div>

              {/* Anonymous Option */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={formData.anonymous}
                  onChange={(e) => setFormData(prev => ({ ...prev, anonymous: e.target.checked }))}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="anonymous" className="text-sm text-gray-700">
                  Submit review anonymously
                </label>
              </div>

              {/* Form Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || formData.rating === 0 || formData.comment.length < 20}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:from-primary-600 hover:to-secondary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Review • Enviar Avaliação'}
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {event.reviews && event.reviews.length > 0 ? (
          <>
            {event.reviews.slice(0, 3).map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
            
            {event.reviews.length > 3 && (
              <div className="text-center pt-4">
                <button className="text-primary-600 hover:text-primary-700 font-medium transition-colors">
                  View all {event.totalReviews} reviews • Ver todas as avaliações
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <ChatBubbleLeftIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
            <p className="text-gray-600">Be the first to share your experience with this event</p>
          </div>
        )}
      </div>

      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className="fixed top-4 right-4 z-50"
          >
            <div className={`rounded-lg p-4 shadow-lg text-white max-w-md ${ 
              notification.type === 'success' 
                ? 'bg-green-500' 
                : 'bg-red-500'
            }`}>
              <div className="flex items-start gap-3">
                {notification.type === 'success' ? (
                  <CheckCircleIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                ) : (
                  <ExclamationTriangleIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                )}
                <p className="text-sm">{notification.message}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Individual Review Card Component
const ReviewCard: React.FC<{ review: EventReview }> = ({ review }) => {
  const [helpful, setHelpful] = useState(review.helpful)
  const [userFound, setUserFound] = useState(false)

  const handleHelpful = () => {
    if (!userFound) {
      setHelpful(prev => prev + 1)
      setUserFound(true)
    }
  }

  return (
    <div
      className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors opacity-0 translate-y-5 animate-fade-in-up"
      style={{ animationDelay: '0.2s' }}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white shadow-lg">
          {review.profileImage ? (
            <img 
              src={review.profileImage}
              alt={`${review.reviewerName} profile`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-primary-300 to-secondary-300 flex items-center justify-center text-white font-bold">
              {review.reviewerName.substring(0, 2)}
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-semibold text-gray-900">{review.reviewerName}</h4>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarSolidIcon
                  key={star}
                  className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400' : 'text-gray-200'}`}
                />
              ))}
            </div>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
              review.membershipTier === 'premium' ? 'bg-purple-100 text-purple-700' :
              review.membershipTier === 'core' ? 'bg-secondary-100 text-secondary-700' :
              'bg-green-100 text-green-700'
            }`}>
              {review.membershipTier}
            </span>
          </div>
          
          <p className="text-gray-700 mb-3 leading-relaxed">{review.comment}</p>
          
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>{new Date(review.createdAt).toLocaleDateString('en-GB')}</span>
            <button
              onClick={handleHelpful}
              className={`flex items-center gap-1 transition-colors ${
                userFound ? 'text-green-600' : 'hover:text-primary-600'
              }`}
              disabled={userFound}
            >
              <HeartIcon className={`w-4 h-4 ${userFound ? 'fill-current' : ''}`} />
              <span>{helpful} helpful</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventReviewSystem