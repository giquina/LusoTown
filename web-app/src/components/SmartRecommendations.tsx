'use client'

import React from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/config/routes'
import { 
  Calendar,
  Users,
  Star,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react'

interface Recommendation {
  id: string
  type: 'event' | 'connection' | 'business'
  title: string
  description: string
  actionText: string
  actionRoute: string
  priority: number
  relevanceScore: number
}

export default function SmartRecommendations() {
  const { language } = useLanguage()
  const router = useRouter()

  const recommendations: Recommendation[] = [
    {
      id: 'event-1',
      type: 'event',
      title: language === 'pt' ? 'Noite de Fado no Stockwell' : 'Fado Night in Stockwell',
      description: language === 'pt' ? 'Baseado no seu interesse em cultura portuguesa' : 'Based on your interest in Portuguese culture',
      actionText: language === 'pt' ? 'Ver Evento' : 'View Event',
      actionRoute: ROUTES.events,
      priority: 1,
      relevanceScore: 95
    },
    {
      id: 'connection-1',
      type: 'connection',
      title: language === 'pt' ? 'Conectar com Ana Santos' : 'Connect with Ana Santos',
      description: language === 'pt' ? 'Também participa em eventos culturais portugueses' : 'Also attends Portuguese cultural events',
      actionText: language === 'pt' ? 'Ver Perfil' : 'View Profile',
      actionRoute: '/networking',
      priority: 2,
      relevanceScore: 88
    },
    {
      id: 'business-1',
      type: 'business',
      title: language === 'pt' ? 'Casa do Bacalhau - Novo Restaurante' : 'Casa do Bacalhau - New Restaurant',
      description: language === 'pt' ? 'Cozinha tradicional portuguesa perto de si' : 'Traditional Portuguese cuisine near you',
      actionText: language === 'pt' ? 'Ver Negócio' : 'View Business',
      actionRoute: ROUTES.directory,
      priority: 3,
      relevanceScore: 82
    }
  ]

  const getIcon = (type: string) => {
    switch (type) {
      case 'event':
        return <Calendar className="w-5 h-5" />
      case 'connection':
        return <Users className="w-5 h-5" />
      case 'business':
        return <MapPin className="w-5 h-5" />
      default:
        return <Star className="w-5 h-5" />
    }
  }

  const getColor = (type: string) => {
    switch (type) {
      case 'event':
        return 'text-primary-600 bg-primary-50'
      case 'connection':
        return 'text-secondary-600 bg-secondary-50'
      case 'business':
        return 'text-accent-600 bg-accent-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {language === 'pt' ? 'Recomendações Inteligentes' : 'Smart Recommendations'}
          </h2>
          <p className="text-sm text-gray-600">
            {language === 'pt' ? 'Personalizadas para a sua atividade na comunidade' : 'Personalized for your community activity'}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec) => (
          <div key={rec.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getColor(rec.type)}`}>
                  {getIcon(rec.type)}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{rec.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3" />
                      <span>{rec.relevanceScore}% relevante</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{language === 'pt' ? 'Agora' : 'Now'}</span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => router.push(rec.actionRoute)}
                className="flex items-center space-x-2 px-3 py-1.5 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm"
              >
                <span>{rec.actionText}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <div className="text-gray-600">
            {language === 'pt' ? '3 de 12 recomendações mostradas' : '3 of 12 recommendations shown'}
          </div>
          <button
            onClick={() => router.push('/recommendations')}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            {language === 'pt' ? 'Ver Todas' : 'View All'}
          </button>
        </div>
      </div>
    </div>
  )
}