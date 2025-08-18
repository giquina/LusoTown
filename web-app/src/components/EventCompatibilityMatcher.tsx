'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { 
  Heart, 
  Calendar, 
  MapPin, 
  Clock,
  Users, 
  Sparkles,
  ArrowRight,
  TrendingUp,
  Music,
  Utensils,
  Trophy,
  BookOpen
} from 'lucide-react'
import { formatPrice } from '@/config/pricing'
import type { Event, EventRecommendation } from '@/types/event'

interface EventCompatibilityMatcherProps {
  userId: string
  matchedUserId: string
  matchedUserName: string
  sharedInterests: string[]
  culturalCompatibility: number
  onEventSuggestion?: (eventId: string) => void
}

// Mock Portuguese cultural events data
const mockPortugueseEvents: Event[] = [
  {
    id: 1,
    title: "Noite de Fado Autêntico",
    description: "Uma noite íntima de Fado tradicional com fadistas portugueses consagrados no coração de Londres.",
    location: "Portuguese Cultural Centre, South London",
    date: "Sáb, 7 Dez",
    time: "8:00 PM",
    endTime: "11:00 PM",
    attendees: 18,
    maxAttendees: 30,
    price: 35,
    category: "Music & Culture",
    image: "/events/portuguese/fado-night.jpg",
    color: "from-coral-500 to-accent-500",
    status: "available",
    culturalCategory: "Traditional Music",
    portugueseCulturalFocus: true,
    culturalTraditions: ["fado", "portuguese_music", "traditional_performance"],
    languageRequirements: "bilingual",
    heritageCelebration: "Portuguese Musical Heritage",
    buddyPricingEnabled: true,
    groupDiscountEnabled: true,
    maxGroupSize: 4,
    minGroupSize: 2,
    tags: ["fado", "traditional", "music", "portuguese", "cultural"],
    icon: <Music className="w-6 h-6 text-white" />
  },
  {
    id: 2,
    title: "Workshop de Culinária Tradicional",
    description: "Aprenda a fazer pastéis de nata perfeitos e cataplana autêntica com chef português certificado.",
    location: "Culinary Studio London",
    date: "Dom, 8 Dez",
    time: "2:00 PM",
    endTime: "5:00 PM",
    attendees: 8,
    maxAttendees: 12,
    price: 65,
    category: "Cooking & Food",
    image: "/events/portuguese/cooking-workshop.jpg",
    color: "from-primary-500 to-secondary-500",
    status: "available",
    culturalCategory: "Portuguese Cuisine",
    portugueseCulturalFocus: true,
    culturalTraditions: ["pasteis_de_nata", "cataplana", "traditional_cooking"],
    languageRequirements: "bilingual",
    heritageCelebration: "Portuguese Culinary Heritage",
    buddyPricingEnabled: true,
    groupDiscountEnabled: true,
    maxGroupSize: 6,
    minGroupSize: 2,
    tags: ["cooking", "traditional", "food", "portuguese", "workshop"],
    icon: <Utensils className="w-6 h-6 text-white" />
  },
  {
    id: 3,
    title: "Santos Populares em Londres",
    description: "Celebrate Santos Populares with traditional Portuguese festivities, sardines, and live music in London.",
    location: "Vauxhall Portuguese Community",
    date: "Sáb, 14 Dez",
    time: "6:00 PM",
    endTime: "11:00 PM",
    attendees: 45,
    maxAttendees: 80,
    price: 25,
    category: "Cultural Festival",
    image: "/events/portuguese/santos-populares.jpg",
    color: "from-accent-500 to-coral-500",
    status: "available",
    culturalCategory: "Traditional Festival",
    portugueseCulturalFocus: true,
    culturalTraditions: ["santos_populares", "portuguese_festival", "traditional_celebration"],
    languageRequirements: "bilingual",
    heritageCelebration: "Santos Populares",
    buddyPricingEnabled: true,
    groupDiscountEnabled: true,
    maxGroupSize: 8,
    minGroupSize: 2,
    tags: ["santos_populares", "festival", "traditional", "portuguese", "celebration"],
    icon: <Trophy className="w-6 h-6 text-white" />
  }
]

export default function EventCompatibilityMatcher({
  userId,
  matchedUserId,
  matchedUserName,
  sharedInterests,
  culturalCompatibility,
  onEventSuggestion
}: EventCompatibilityMatcherProps) {
  const { language, t } = useLanguage()
  const [isAnalyzing, setIsAnalyzing] = useState(true)
  const [recommendations, setRecommendations] = useState<EventRecommendation[]>([])
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  // Simulate analysis and generate recommendations
  useEffect(() => {
    const analyzeCompatibility = async () => {
      setIsAnalyzing(true)
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Generate mock recommendations based on shared interests and cultural compatibility
      const mockRecommendations: EventRecommendation[] = mockPortugueseEvents.map((event, index) => {
        const baseScore = Math.max(70, culturalCompatibility - 10 + Math.random() * 20)
        const interestBonus = sharedInterests.some(interest => 
          event.tags?.includes(interest.toLowerCase()) || 
          event.culturalTraditions?.includes(interest.toLowerCase())
        ) ? 15 : 0
        const culturalBonus = event.portugueseCulturalFocus ? 10 : 0
        
        const score = Math.min(100, Math.round(baseScore + interestBonus + culturalBonus))
        
        return {
          id: `rec-${event.id}`,
          userId,
          matchedUserId,
          eventId: event.id.toString(),
          recommendationScore: score,
          recommendationReason: getRecommendationReason(event, sharedInterests, score),
          sharedCulturalInterests: sharedInterests.filter(interest => 
            event.tags?.includes(interest.toLowerCase()) ||
            event.culturalTraditions?.includes(interest.toLowerCase())
          ),
          portugueseCulturalFocus: event.portugueseCulturalFocus || false,
          recommendationType: score >= 90 ? 'cultural_event' : score >= 80 ? 'compatibility_based' : 'buddy_suggestion',
          status: 'pending',
          createdAt: new Date().toISOString()
        }
      })
      
      // Sort by recommendation score
      mockRecommendations.sort((a, b) => b.recommendationScore - a.recommendationScore)
      
      setRecommendations(mockRecommendations)
      setIsAnalyzing(false)
    }
    
    analyzeCompatibility()
  }, [userId, matchedUserId, sharedInterests, culturalCompatibility])

  const getRecommendationReason = (event: Event, interests: string[], score: number) => {
    if (score >= 95) return t('compatibility_matcher.recommendation_reasons.heritage')
    if (score >= 90) return t('compatibility_matcher.recommendation_reasons.cultural')
    if (score >= 85) return t('compatibility_matcher.recommendation_reasons.interests')
    if (score >= 80) return t('compatibility_matcher.recommendation_reasons.location')
    return t('compatibility_matcher.recommendation_reasons.networking')
  }

  const getCompatibilityLabel = (score: number) => {
    if (score >= 95) return t('compatibility_matcher.perfect_match')
    if (score >= 85) return t('compatibility_matcher.great_match')
    if (score >= 75) return t('compatibility_matcher.good_match')
    return t('compatibility_matcher.fair_match')
  }

  const getCompatibilityColor = (score: number) => {
    if (score >= 95) return 'from-secondary-500 to-accent-500'
    if (score >= 85) return 'from-coral-500 to-secondary-500'
    if (score >= 75) return 'from-primary-500 to-coral-500'
    return 'from-neutral-500 to-primary-500'
  }

  const handleEventSuggestion = (eventId: string) => {
    onEventSuggestion?.(eventId)
  }

  const getEventDetails = (eventId: string): Event | undefined => {
    return mockPortugueseEvents.find(event => event.id.toString() === eventId)
  }

  if (isAnalyzing) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 mx-auto mb-4"
          >
            <Sparkles className="w-16 h-16 text-primary-500" />
          </motion.div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {t('compatibility_matcher.title')}
          </h3>
          <p className="text-gray-600">
            {t('compatibility_matcher.analyzing')}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center">
            <Heart className="w-5 h-5 text-primary-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            {t('match_events.title')}
          </h3>
          <div className="w-10 h-10 bg-gradient-to-r from-accent-100 to-coral-100 rounded-xl flex items-center justify-center">
            <Calendar className="w-5 h-5 text-accent-600" />
          </div>
        </div>
        <p className="text-gray-600 max-w-md mx-auto">
          {t('match_events.subtitle')}
        </p>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 ? (
        <div className="space-y-6">
          {recommendations.slice(0, 3).map((recommendation, index) => {
            const event = getEventDetails(recommendation.eventId)
            if (!event) return null

            return (
              <motion.div
                key={recommendation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
              >
                {/* Event Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center flex-shrink-0">
                    {event.icon || <Calendar className="w-8 h-8 text-gray-600" />}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900 mb-1">
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
                    <p className="text-sm text-gray-600">
                      {event.description.substring(0, 120)}...
                    </p>
                  </div>
                </div>

                {/* Compatibility Score */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {t('match_events.compatibility_score')}
                    </span>
                    <span className={`text-sm font-bold px-3 py-1 rounded-full bg-gradient-to-r ${getCompatibilityColor(recommendation.recommendationScore)} text-white`}>
                      {recommendation.recommendationScore}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div 
                      className={`h-2 rounded-full bg-gradient-to-r ${getCompatibilityColor(recommendation.recommendationScore)}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${recommendation.recommendationScore}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {getCompatibilityLabel(recommendation.recommendationScore)}
                  </p>
                </div>

                {/* Shared Cultural Interests */}
                {recommendation.sharedCulturalInterests.length > 0 && (
                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-gray-700 mb-2">
                      {t('match_events.shared_interests')}
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {recommendation.sharedCulturalInterests.slice(0, 3).map((interest) => (
                        <span 
                          key={interest}
                          className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium border border-primary-200"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommendation Reason */}
                <div className="mb-4 p-3 bg-accent-50 rounded-lg border border-accent-200">
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-accent-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-accent-800">
                      "{recommendation.recommendationReason}"
                    </p>
                  </div>
                </div>

                {/* Event Details */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{event.attendees}/{event.maxAttendees}</span>
                    </div>
                    <div className="font-semibold text-secondary-600">
                      {formatPrice(event.price)}
                    </div>
                    {event.buddyPricingEnabled && (
                      <div className="text-xs text-coral-600 font-medium bg-coral-50 px-2 py-1 rounded-full">
                        {t('event_buddy.group_discount')}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEventSuggestion(recommendation.eventId)}
                      className="px-4 py-2 bg-primary-50 text-primary-700 rounded-lg font-medium text-sm hover:bg-primary-100 transition-colors"
                    >
                      {t('match_events.suggest_to_match')}
                    </button>
                    <button
                      className="px-4 py-2 bg-gradient-to-r from-secondary-500 to-accent-500 text-white rounded-lg font-medium text-sm hover:from-secondary-600 hover:to-accent-600 transition-all flex items-center gap-2"
                    >
                      {t('match_events.book_together')}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-8">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">
            {t('match_events.no_recommendations')}
          </h4>
          <button className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl font-medium hover:from-primary-600 hover:to-secondary-600 transition-all">
            {t('match_events.explore_events')}
          </button>
        </div>
      )}
    </div>
  )
}