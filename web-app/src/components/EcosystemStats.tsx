'use client'

import React from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { useNetworking } from '@/context/NetworkingContext'
import { useSubscription } from '@/context/SubscriptionContext'
import { TrendingUp, Users, Calendar, MapPin, Star, Crown, Activity, Heart } from 'lucide-react'

export default function EcosystemStats() {
  const { language } = useLanguage()
  const { stats } = useNetworking()
  const { hasActiveSubscription, membershipTier } = useSubscription()

  const ecosystemStats = [
    {
      id: 'connections',
      title: language === 'pt' ? 'Conexões da Rede' : 'Network Connections',
      value: stats.totalConnections || 0,
      change: `+${stats.monthlyGrowth || 0}`,
      changeType: 'positive' as const,
      icon: <Users className="w-5 h-5" />,
      color: 'text-primary-600 bg-primary-100'
    }
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-3 mb-6">
        <TrendingUp className="w-6 h-6 text-action-500" />
        <h2 className="text-xl font-semibold text-gray-900">
          {language === 'pt' ? 'Estatísticas do Ecossistema' : 'Ecosystem Statistics'}
        </h2>
      </div>
      <div className="text-center py-8">
        <p className="text-secondary-600">Ecosystem statistics will be displayed here</p>
      </div>
    </div>
  )
}
