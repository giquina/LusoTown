'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/context/LanguageContext'
import { MajesticButton } from './EliteMicroInteractions'
import { useEliteNotifications } from './EliteErrorHandling'
import { 
  HandThumbUpIcon,
  HandThumbDownIcon,
  HeartIcon,
  StarIcon,
  FaceSmileIcon,
  FaceFrownIcon,
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline'
import {
  HandThumbUpIcon as HandThumbUpSolidIcon,
  HandThumbDownIcon as HandThumbDownSolidIcon,
  HeartIcon as HeartSolidIcon,
  StarIcon as StarSolidIcon
} from '@heroicons/react/24/solid'

interface EliteFeedbackSystemProps {
  onFeedback: (feedback: {
    type: 'like' | 'dislike' | 'love' | 'rating' | 'comment'
    value: any
    culturalContext?: string
  }) => void
  culturalTheme?: boolean
  showComments?: boolean
  showRating?: boolean
  showEmojis?: boolean
  className?: string
}

export function EliteFeedbackSystem({
  onFeedback,
  culturalTheme = false,
  showComments = true,
  showRating = true,
  showEmojis = true,
  className = ''
}: EliteFeedbackSystemProps) {
  const { language } = useLanguage()
  const { showSuccess, showCultural } = useEliteNotifications()
  
  const [liked, setLiked] = React.useState(false)
  const [disliked, setDisliked] = React.useState(false)
  const [loved, setLoved] = React.useState(false)
  const [rating, setRating] = React.useState(0)
  const [hoverRating, setHoverRating] = React.useState(0)
  const [comment, setComment] = React.useState('')
  const [showCommentBox, setShowCommentBox] = React.useState(false)
  const [selectedEmoji, setSelectedEmoji] = React.useState<string | null>(null)

  const handleLike = () => {
    const newLiked = !liked
    setLiked(newLiked)
    setDisliked(false)
    
    onFeedback({
      type: 'like',
      value: newLiked,
      culturalContext: culturalTheme ? 'portuguese_community' : undefined
    })

    if (newLiked) {
      if (culturalTheme) {
        showCultural(
          language === 'pt' ? 'Obrigado!' : 'Thank you!',
          language === 'pt' ? 'O seu apoio fortalece a nossa comunidade de falantes de português' : 'Your support strengthens our Portuguese-speaking community'
        )
      } else {
        showSuccess('Thank you!', 'Your feedback helps us improve')
      }
    }
  }

  const handleDislike = () => {
    const newDisliked = !disliked
    setDisliked(newDisliked)
    setLiked(false)
    
    onFeedback({
      type: 'dislike',
      value: newDisliked,
      culturalContext: culturalTheme ? 'portuguese_community' : undefined
    })

    if (newDisliked) {
      setShowCommentBox(true)
    }
  }

  const handleLove = () => {
    const newLoved = !loved
    setLoved(newLoved)
    
    onFeedback({
      type: 'love',
      value: newLoved,
      culturalContext: culturalTheme ? 'portuguese_community' : undefined
    })

    if (newLoved) {
      if (culturalTheme) {
        showCultural(
          language === 'pt' ? 'Com amor da comunidade!' : 'With love from the community!',
          language === 'pt' ? '❤️ Muito obrigado pelo seu carinho' : '❤️ Thank you for your love'
        )
      }
    }
  }

  const handleRating = (value: number) => {
    setRating(value)
    onFeedback({
      type: 'rating',
      value,
      culturalContext: culturalTheme ? 'portuguese_community' : undefined
    })

    if (value >= 4) {
      if (culturalTheme) {
        showCultural(
          language === 'pt' ? 'Excelente!' : 'Excellent!',
          language === 'pt' ? `${value} estrelas para a nossa comunidade!` : `${value} stars for our community!`
        )
      } else {
        showSuccess('Excellent!', `Thank you for the ${value}-star rating`)
      }
    }
  }

  const handleComment = () => {
    if (comment.trim()) {
      onFeedback({
        type: 'comment',
        value: comment,
        culturalContext: culturalTheme ? 'portuguese_community' : undefined
      })

      if (culturalTheme) {
        showCultural(
          language === 'pt' ? 'Comentário recebido!' : 'Comment received!',
          language === 'pt' ? 'Obrigado por partilhar a sua opinião' : 'Thank you for sharing your thoughts'
        )
      } else {
        showSuccess('Comment received!', 'Thank you for your feedback')
      }

      setComment('')
      setShowCommentBox(false)
    }
  }

  const emojis = culturalTheme 
    ? ['🇵🇹', '❤️', '👏', '🔥', '💯', '⚽', '🍷', '🎵']
    : ['😊', '😍', '👏', '🔥', '💯', '👍', '❤️', '⭐']

  return (
    <div className={cn(
      'bg-white rounded-2xl p-6 shadow-lg border',
      culturalTheme 
        ? 'border-amber-200/50 bg-gradient-to-br from-white via-amber-50/30 to-white'
        : 'border-gray-200',
      className
    )}>
      {/* Cultural pattern overlay */}
      {culturalTheme && (
        <div className="absolute inset-0 opacity-5 rounded-2xl overflow-hidden">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Cpattern id='feedback-azulejo' x='0' y='0' width='40' height='40' patternUnits='userSpaceOnUse'%3E%3Crect width='40' height='40' fill='none'/%3E%3Cpath d='M20,4 L36,20 L20,36 L4,20 Z' fill='rgba(212,165,116,0.08)' stroke='rgba(212,165,116,0.04)' stroke-width='1'/%3E%3C/pattern%3E%3Crect width='80' height='80' fill='url(%23feedback-azulejo)'/%3E%3C/svg%3E")`,
              backgroundSize: '40px 40px'
            }}
          />
        </div>
      )}

      <div className="relative z-10 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              'text-xl font-bold',
              culturalTheme ? 'text-amber-800' : 'text-gray-800'
            )}
          >
            {culturalTheme 
              ? language === 'pt' 
                ? 'A sua opinião é valiosa para a nossa comunidade'
                : 'Your opinion is valuable to our community'
              : 'How was your experience?'
            }
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={cn(
              'text-sm',
              culturalTheme ? 'text-amber-600' : 'text-gray-600'
            )}
          >
            {culturalTheme
              ? language === 'pt'
                ? 'Ajude-nos a melhorar a experiência portuguesa no Reino Unido'
                : 'Help us improve the Lusophone experience in the United Kingdom'
              : 'Your feedback helps us improve'
            }
          </motion.p>
        </div>

        {/* Rating Stars */}
        {showRating && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center space-x-1"
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className={cn(
                  'p-1 rounded-full transition-colors',
                  (hoverRating >= star || rating >= star)
                    ? culturalTheme ? 'text-amber-500' : 'text-yellow-500'
                    : 'text-gray-300 hover:text-gray-400'
                )}
              >
                {(hoverRating >= star || rating >= star) ? (
                  <StarSolidIcon className="w-8 h-8" />
                ) : (
                  <StarIcon className="w-8 h-8" />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Like/Dislike/Love Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center space-x-4"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLike}
            className={cn(
              'flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200',
              liked
                ? culturalTheme
                  ? 'bg-green-100 text-green-700 border-2 border-green-300'
                  : 'bg-green-100 text-green-700 border-2 border-green-300'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-transparent'
            )}
          >
            {liked ? (
              <HandThumbUpSolidIcon className="w-5 h-5" />
            ) : (
              <HandThumbUpIcon className="w-5 h-5" />
            )}
            <span className="font-medium">
              {language === 'pt' ? 'Gosto' : 'Like'}
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLove}
            className={cn(
              'flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200',
              loved
                ? 'bg-red-100 text-red-700 border-2 border-red-300'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-transparent'
            )}
          >
            {loved ? (
              <HeartSolidIcon className="w-5 h-5" />
            ) : (
              <HeartIcon className="w-5 h-5" />
            )}
            <span className="font-medium">
              {language === 'pt' ? 'Adoro' : 'Love'}
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDislike}
            className={cn(
              'flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200',
              disliked
                ? 'bg-red-100 text-red-700 border-2 border-red-300'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-transparent'
            )}
          >
            {disliked ? (
              <HandThumbDownSolidIcon className="w-5 h-5" />
            ) : (
              <HandThumbDownIcon className="w-5 h-5" />
            )}
            <span className="font-medium">
              {language === 'pt' ? 'Não gosto' : 'Dislike'}
            </span>
          </motion.button>
        </motion.div>

        {/* Emoji Reactions */}
        {showEmojis && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center flex-wrap gap-2"
          >
            {emojis.map((emoji, index) => (
              <motion.button
                key={emoji}
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setSelectedEmoji(selectedEmoji === emoji ? null : emoji)
                  onFeedback({
                    type: 'comment',
                    value: `Emoji reaction: ${emoji}`,
                    culturalContext: culturalTheme ? 'portuguese_community' : undefined
                  })
                }}
                className={cn(
                  'p-2 rounded-full text-2xl transition-all duration-200',
                  selectedEmoji === emoji
                    ? 'bg-amber-100 ring-2 ring-amber-300 scale-110'
                    : 'hover:bg-gray-100'
                )}
                style={{
                  animationDelay: `${index * 0.05}s`
                }}
              >
                {emoji}
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Comment Section */}
        {showComments && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-center">
              <MajesticButton
                variant={culturalTheme ? "aristocratic" : "royal"}
                size="sm"
                onClick={() => setShowCommentBox(!showCommentBox)}
                culturalHeritage={culturalTheme}
              >
                <ChatBubbleLeftRightIcon className="w-4 h-4 mr-2" />
                {language === 'pt' ? 'Deixar comentário' : 'Leave a comment'}
              </MajesticButton>
            </div>

            <AnimatePresence>
              {showCommentBox && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3"
                >
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder={
                      culturalTheme
                        ? language === 'pt'
                          ? 'Partilhe os seus pensamentos sobre a nossa comunidade de falantes de português...'
                          : 'Share your thoughts about our Portuguese-speaking community...'
                        : 'Share your thoughts...'
                    }
                    className={cn(
                      'w-full p-4 rounded-xl border-2 resize-none focus:outline-none focus:ring-2 transition-all duration-200',
                      culturalTheme
                        ? 'border-amber-200 focus:border-amber-400 focus:ring-amber-200 bg-amber-50/30'
                        : 'border-gray-200 focus:border-blue-400 focus:ring-blue-200'
                    )}
                    rows={4}
                  />
                  
                  <div className="flex justify-end space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setShowCommentBox(false)
                        setComment('')
                      }}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      {language === 'pt' ? 'Cancelar' : 'Cancel'}
                    </motion.button>
                    
                    <MajesticButton
                      variant={culturalTheme ? "imperial" : "diamond"}
                      size="sm"
                      onClick={handleComment}
                      disabled={!comment.trim()}
                      culturalHeritage={culturalTheme}
                      hapticFeedback={true}
                    >
                      <PaperAirplaneIcon className="w-4 h-4 mr-2" />
                      {language === 'pt' ? 'Enviar' : 'Send'}
                    </MajesticButton>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Cultural appreciation message */}
        {culturalTheme && (liked || loved || rating >= 4) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center p-4 bg-gradient-to-r from-red-50 via-amber-50 to-green-50 rounded-xl border border-amber-200"
          >
            <p className="text-sm text-amber-700 font-medium">
              🇵🇹 {language === 'pt' 
                ? 'Obrigado por fazer parte da nossa família portuguesa no Reino Unido!' 
                : 'Thank you for being part of our Lusophone family in the United Kingdom!'
              }
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

interface EliteReviewSystemProps {
  itemId: string
  itemType: 'event' | 'business' | 'service' | 'user'
  culturalTheme?: boolean
  onReview?: (review: {
    rating: number
    comment: string
    culturalContext?: string
  }) => void
  className?: string
}

export function EliteReviewSystem({
  itemId,
  itemType,
  culturalTheme = false,
  onReview,
  className = ''
}: EliteReviewSystemProps) {
  const { language } = useLanguage()
  const { showSuccess, showCultural } = useEliteNotifications()
  
  const [rating, setRating] = React.useState(0)
  const [hoverRating, setHoverRating] = React.useState(0)
  const [comment, setComment] = React.useState('')
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [hasSubmitted, setHasSubmitted] = React.useState(false)

  const handleSubmit = async () => {
    if (rating === 0) return

    setIsSubmitting(true)

    try {
      const reviewData = {
        rating,
        comment: comment.trim(),
        culturalContext: culturalTheme ? 'portuguese_community' : undefined
      }

      await onReview?.(reviewData)

      setHasSubmitted(true)
      
      if (culturalTheme) {
        showCultural(
          language === 'pt' ? 'Avaliação enviada!' : 'Review submitted!',
          language === 'pt' 
            ? 'Obrigado por ajudar a nossa comunidade de falantes de português'
            : 'Thank you for helping our Portuguese-speaking community'
        )
      } else {
        showSuccess('Review submitted!', 'Thank you for your feedback')
      }

    } catch (error) {
      console.error('Failed to submit review:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (hasSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          'text-center p-8 rounded-2xl',
          culturalTheme 
            ? 'bg-gradient-to-br from-green-50 via-amber-50 to-green-50 border-2 border-green-200'
            : 'bg-green-50 border border-green-200',
          className
        )}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 500, damping: 30 }}
          className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center"
        >
          {culturalTheme ? (
            <span className="text-3xl">🇵🇹</span>
          ) : (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              ✓
            </motion.div>
          )}
        </motion.div>
        
        <h3 className={cn(
          'text-xl font-bold mb-2',
          culturalTheme ? 'text-green-800' : 'text-green-700'
        )}>
          {language === 'pt' ? 'Avaliação recebida!' : 'Review received!'}
        </h3>
        
        <p className={cn(
          'text-sm',
          culturalTheme ? 'text-green-700' : 'text-green-600'
        )}>
          {culturalTheme
            ? language === 'pt'
              ? 'A sua opinião fortalece a nossa comunidade de falantes de português'
              : 'Your opinion strengthens our Portuguese-speaking community'
            : 'Thank you for helping others make informed decisions'
          }
        </p>
      </motion.div>
    )
  }

  return (
    <div className={cn(
      'bg-white rounded-2xl p-6 shadow-lg border',
      culturalTheme 
        ? 'border-amber-200/50 bg-gradient-to-br from-white via-amber-50/20 to-white'
        : 'border-gray-200',
      className
    )}>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h3 className={cn(
            'text-lg font-bold mb-2',
            culturalTheme ? 'text-amber-800' : 'text-gray-800'
          )}>
            {language === 'pt' ? 'Avaliar este ' : 'Rate this '}
            {itemType === 'event' ? (language === 'pt' ? 'evento' : 'event') :
             itemType === 'business' ? (language === 'pt' ? 'negócio' : 'business') :
             itemType === 'service' ? (language === 'pt' ? 'serviço' : 'service') :
             (language === 'pt' ? 'perfil' : 'profile')}
          </h3>
          <p className={cn(
            'text-sm',
            culturalTheme ? 'text-amber-600' : 'text-gray-600'
          )}>
            {culturalTheme
              ? language === 'pt'
                ? 'A sua experiência é importante para a nossa comunidade'
                : 'Your experience matters to our community'
              : 'Your review helps others make informed decisions'
            }
          </p>
        </div>

        {/* Rating Stars */}
        <div className="flex justify-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <motion.button
              key={star}
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className={cn(
                'p-1 transition-colors',
                (hoverRating >= star || rating >= star)
                  ? culturalTheme ? 'text-amber-500' : 'text-yellow-500'
                  : 'text-gray-300 hover:text-gray-400'
              )}
            >
              {(hoverRating >= star || rating >= star) ? (
                <StarSolidIcon className="w-10 h-10" />
              ) : (
                <StarIcon className="w-10 h-10" />
              )}
            </motion.button>
          ))}
        </div>

        {/* Rating Description */}
        {(hoverRating > 0 || rating > 0) && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              'text-center text-sm font-medium',
              culturalTheme ? 'text-amber-700' : 'text-gray-700'
            )}
          >
            {(() => {
              const currentRating = hoverRating || rating
              const descriptions = culturalTheme 
                ? language === 'pt'
                  ? ['Muito mau', 'Mau', 'Aceitável', 'Bom', 'Excelente']
                  : ['Very poor', 'Poor', 'Acceptable', 'Good', 'Excellent']
                : ['Very poor', 'Poor', 'Fair', 'Good', 'Excellent']
              return descriptions[currentRating - 1]
            })()}
          </motion.p>
        )}

        {/* Comment Box */}
        <div className="space-y-3">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={
              culturalTheme
                ? language === 'pt'
                  ? 'Partilhe os detalhes da sua experiência... (opcional)'
                  : 'Share the details of your experience... (optional)'
                : 'Share your experience... (optional)'
            }
            className={cn(
              'w-full p-4 rounded-xl border-2 resize-none focus:outline-none focus:ring-2 transition-all duration-200',
              culturalTheme
                ? 'border-amber-200 focus:border-amber-400 focus:ring-amber-200 bg-amber-50/30'
                : 'border-gray-200 focus:border-blue-400 focus:ring-blue-200'
            )}
            rows={4}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <MajesticButton
            variant={culturalTheme ? "aristocratic" : "royal"}
            size="lg"
            onClick={handleSubmit}
            disabled={rating === 0 || isSubmitting}
            luxury={true}
            culturalHeritage={culturalTheme}
            hapticFeedback={true}
            className="min-w-[200px]"
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>{language === 'pt' ? 'A enviar...' : 'Submitting...'}</span>
              </div>
            ) : (
              <>
                <StarIcon className="w-5 h-5 mr-2" />
                {language === 'pt' ? 'Enviar avaliação' : 'Submit review'}
              </>
            )}
          </MajesticButton>
        </div>
      </div>
    </div>
  )
}