'use client'

import React from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { Sparkles, Calendar, Users, MapPin, ArrowRight } from 'lucide-react'

export default function SmartRecommendations() {
  const { language } = useLanguage()

  const recommendations = [
    {
      id: '1',
      type: 'event',
      title: language === 'pt' ? 'Festival de Fado em Southwark' : 'Fado Festival in Southwark',
      description: language === 'pt' ? 'Evento musical português este fim de semana' : 'Portuguese music event this weekend',
      reason: language === 'pt' ? 'Baseado no seu interesse em música portuguesa' : 'Based on your interest in Portuguese music',
      cta: language === 'pt' ? 'Ver Evento' : 'View Event',
      link: '/events',
      priority: 'high'
    }
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Sparkles className="w-6 h-6 text-accent-500" />
        <h2 className="text-xl font-semibold text-gray-900">
          {language === 'pt' ? 'Recomendações Inteligentes' : 'Smart Recommendations'}
        </h2>
      </div>
      <div className="text-center py-8">
        <p className="text-gray-600">Smart recommendations will be displayed here</p>
      </div>
    </div>
  )
}
