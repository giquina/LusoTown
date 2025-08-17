'use client'

import React from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { Sparkles, Calendar, Users, MapPin, ArrowRight } from 'lucide-react'

interface Recommendation {
  id: string
  type: 'event' | 'service' | 'connection' | 'community'
  title: string
  description: string
  reason: string
  cta: string
  link: string
  priority: 'high' | 'medium' | 'low'
}

export default function SmartRecommendations() {
  const { language, t } = useLanguage()

  const recommendations: Recommendation[] = [
    {
      id: '1',
      type: 'event',
      title: language === 'pt' ? 'Festival de Fado em Southwark' : 'Fado Festival in Southwark',
      description: language === 'pt' ? 'Evento musical português este fim de semana' : 'Portuguese music event this weekend',
      reason: language === 'pt' ? 'Baseado no seu interesse em música portuguesa' : 'Based on your interest in Portuguese music',
      cta: language === 'pt' ? 'Ver Evento' : 'View Event',
      link: '/events',
      priority: 'high'
    },
    {
      id: '2',
      type: 'service',
      title: language === 'pt' ? 'Tour Cultural Português' : 'Portuguese Cultural Tour',
      description: language === 'pt' ? 'Descubra a herança portuguesa em Londres' : 'Discover Portuguese heritage in London',
      reason: language === 'pt' ? 'Recomendado para novos membros' : 'Recommended for new members',
      cta: language === 'pt' ? 'Reservar Tour' : 'Book Tour',
      link: '/transport',
      priority: 'medium'
    },
    {
      id: '3',
      type: 'connection',
      title: language === 'pt' ? 'Conectar com João Santos' : 'Connect with João Santos',
      description: language === 'pt' ? 'Empresário português em Londres' : 'Portuguese entrepreneur in London',
      reason: language === 'pt' ? 'Interesse em empreendedorismo' : 'Shared interest in entrepreneurship',
      cta: language === 'pt' ? 'Ver Perfil' : 'View Profile',
      link: '/my-network',
      priority: 'medium'
    }
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 border-red-200 text-red-700'
      case 'medium': return 'bg-yellow-100 border-yellow-200 text-yellow-700'
      case 'low': return 'bg-blue-100 border-blue-200 text-blue-700'
      default: return 'bg-gray-100 border-gray-200 text-gray-700'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'event': return <Calendar className="w-4 h-4" />
      case 'service': return <MapPin className="w-4 h-4" />
      case 'connection': return <Users className="w-4 h-4" />
      case 'community': return <Sparkles className="w-4 h-4" />
      default: return <Sparkles className="w-4 h-4" />
    }
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
        {recommendations.map((rec) => (
          <div key={rec.id} className="border border-gray-200 rounded-lg p-4 hover:border-primary-200 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                  {getTypeIcon(rec.type)}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">{rec.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                  <p className="text-xs text-gray-500">{rec.reason}</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(rec.priority)}`}>
                {language === 'pt' ? 
                  (rec.priority === 'high' ? 'Alta' : rec.priority === 'medium' ? 'Média' : 'Baixa') :
                  (rec.priority.charAt(0).toUpperCase() + rec.priority.slice(1))
                }
              </span>
            </div>
            <div className="flex justify-end">
              <a
                href={rec.link}
                className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors"
              >
                <span>{rec.cta}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500 mb-3">
          {language === 'pt' 
            ? 'Recomendações baseadas na sua atividade e preferências'
            : 'Recommendations based on your activity and preferences'
          }
        </p>
        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
          {language === 'pt' ? 'Ver Todas as Recomendações' : 'View All Recommendations'}
        </button>
      </div>
    </div>
  )
}