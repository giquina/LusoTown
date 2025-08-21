'use client'

import React from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { usePlatformIntegration } from '@/context/PlatformIntegrationContext'
import { Sparkles, Calendar, Users, MapPin, ArrowRight, Car, Crown, Heart } from 'lucide-react'

export default function SmartRecommendations() {
  const { language } = useLanguage()
  const { getPersonalizedRecommendations, trackRecommendationInteraction } = usePlatformIntegration()

  const platformRecommendations = getPersonalizedRecommendations() || []
  
  const defaultRecommendations = [
    {
      id: '1',
      type: 'event',
      title: language === 'pt' ? 'Festival de Fado em Southwark' : 'Fado Festival in Southwark',
      description: language === 'pt' ? 'Evento musical português este fim de semana' : 'Portuguese music event this weekend',
      basedOn: [language === 'pt' ? 'interesse em música portuguesa' : 'interest in Portuguese music'],
      cta: language === 'pt' ? 'Ver Evento' : 'View Event',
      urgency: 'high' as const,
      relevanceScore: 9,
      benefits: ['cultural', 'networking']
    },
    {
      id: '2',
      type: 'transport',
      title: language === 'pt' ? 'Transporte Premium' : 'Premium Transport',
      description: language === 'pt' ? 'Chegue aos eventos com conforto e estilo' : 'Arrive at events in comfort and style',
      basedOn: [language === 'pt' ? 'participação em eventos' : 'event participation'],
      cta: language === 'pt' ? 'Reservar' : 'Book Now',
      urgency: 'medium' as const,
      relevanceScore: 7.5,
      benefits: ['convenience', 'luxury'],
      price: 180
    }
  ]

  const recommendations = platformRecommendations.length > 0 ? platformRecommendations : defaultRecommendations

  const getRecommendationIcon = (type: string) => {
    const icons = {
      event: <Calendar className="w-5 h-5" />,
      transport: <Car className="w-5 h-5" />,
      community_group: <Users className="w-5 h-5" />,
      business_networking: <Users className="w-5 h-5" />,
      premium_feature: <Crown className="w-5 h-5" />
    }
    return icons[type as keyof typeof icons] || <Sparkles className="w-5 h-5" />
  }

  const getUrgencyColor = (urgency: string) => {
    const colors = {
      high: 'bg-red-100 text-red-700 border-red-200',
      medium: 'bg-orange-100 text-orange-700 border-orange-200',
      low: 'bg-green-100 text-green-700 border-green-200'
    }
    return colors[urgency as keyof typeof colors] || colors.medium
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Sparkles className="w-6 h-6 text-accent-500" />
        <h2 className="text-xl font-semibold text-gray-900">
          {language === 'pt' ? 'Recomendações Inteligentes' : 'Smart Recommendations'}
        </h2>
      </div>
      
      <div className="space-y-4">
        {recommendations.slice(0, 3).map((rec) => (
          <div key={rec.id} className="border border-secondary-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white">
                  {getRecommendationIcon(rec.type)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{rec.title}</h3>
                  <p className="text-sm text-secondary-600">{rec.description}</p>
                </div>
              </div>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(rec.urgency)}`}>
                {rec.urgency === 'high' && (language === 'pt' ? 'Alta' : 'High')}
                {rec.urgency === 'medium' && (language === 'pt' ? 'Média' : 'Medium')}
                {rec.urgency === 'low' && (language === 'pt' ? 'Baixa' : 'Low')}
              </span>
            </div>
            
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm text-secondary-600">
                <span className="font-medium">
                  {language === 'pt' ? 'Baseado em:' : 'Based on:'}{' '}
                </span>
                {Array.isArray(rec.basedOn) ? rec.basedOn.join(', ') : rec.basedOn}
              </div>
              {rec.price && (
                <span className="text-lg font-bold text-primary-600">
                  £{rec.price}
                </span>
              )}
            </div>

            {rec.benefits && (
              <div className="flex items-center space-x-2 mb-4">
                {rec.benefits.slice(0, 3).map((benefit, index) => (
                  <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent-100 text-accent-700">
                    {benefit}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                {language === 'pt' ? 'Relevância:' : 'Relevance:'} {rec.relevanceScore || 8}/10
              </div>
              <button
                onClick={() => {
                  trackRecommendationInteraction(rec.id, 'clicked')
                  // Handle navigation or action
                }}
                className="inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm font-medium"
              >
                {rec.cta}
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        ))}
        
        {recommendations.length === 0 && (
          <div className="text-center py-8">
            <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-secondary-600">
              {language === 'pt' 
                ? 'Nenhuma recomendação disponível no momento' 
                : 'No recommendations available right now'
              }
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {language === 'pt' 
                ? 'Continue usando a plataforma para receber sugestões personalizadas'
                : 'Keep using the platform to receive personalized suggestions'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
