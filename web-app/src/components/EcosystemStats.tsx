'use client'

import React from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { useNetworking } from '@/context/NetworkingContext'
import { useSubscription } from '@/context/SubscriptionContext'
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  MapPin, 
  Star, 
  Crown,
  Activity,
  Heart
} from 'lucide-react'

export default function EcosystemStats() {
  const { language, t } = useLanguage()
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
    },
    {
      id: 'events',
      title: language === 'pt' ? 'Eventos Participados' : 'Events Attended',
      value: stats.eventsAttended || 0,
      change: '+3',
      changeType: 'positive' as const,
      icon: <Calendar className="w-5 h-5" />,
      color: 'text-secondary-600 bg-secondary-100'
    },
    {
      id: 'communities',
      title: language === 'pt' ? 'Comunidades Ativas' : 'Active Communities',
      value: 12,
      change: '+2',
      changeType: 'positive' as const,
      icon: <MapPin className="w-5 h-5" />,
      color: 'text-accent-600 bg-accent-100'
    },
    {
      id: 'engagement',
      title: language === 'pt' ? 'Pontuação de Engajamento' : 'Engagement Score',
      value: 85,
      change: '+12',
      changeType: 'positive' as const,
      icon: <Activity className="w-5 h-5" />,
      color: 'text-premium-600 bg-premium-100'
    }
  ]

  const membershipStats = {
    tier: membershipTier || 'free',
    benefits: hasActiveSubscription ? [
      language === 'pt' ? 'Transporte Premium' : 'Premium Transport',
      language === 'pt' ? 'Assistência Habitacional' : 'Housing Assistance',
      language === 'pt' ? 'Mentoria Profissional' : 'Professional Mentorship',
      language === 'pt' ? 'Eventos Exclusivos' : 'Exclusive Events'
    ] : [
      language === 'pt' ? 'Acesso Básico' : 'Basic Access',
      language === 'pt' ? 'Eventos Gratuitos' : 'Free Events',
      language === 'pt' ? 'Networking Limitado' : 'Limited Networking'
    ]
  }

  const getMembershipIcon = () => {
    switch (membershipStats.tier) {
      case 'premium': return <Crown className="w-4 h-4" />
      case 'core': return <Star className="w-4 h-4" />
      default: return <Users className="w-4 h-4" />
    }
  }

  const getMembershipColor = () => {
    switch (membershipStats.tier) {
      case 'premium': return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
      case 'core': return 'bg-primary-500 text-white'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <TrendingUp className="w-6 h-6 text-action-500" />
          <h2 className="text-xl font-semibold text-gray-900">
            {language === 'pt' ? 'Estatísticas do Ecossistema' : 'Ecosystem Statistics'}
          </h2>
        </div>
        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getMembershipColor()}`}>
          {getMembershipIcon()}
          <span>{membershipStats.tier.charAt(0).toUpperCase() + membershipStats.tier.slice(1)}</span>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        {ecosystemStats.map((stat) => (
          <div key={stat.id} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat.color}`}>
                {stat.icon}
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                stat.changeType === 'positive' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              }`}>
                {stat.change}
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-600">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Membership Benefits */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="font-semibold text-gray-900 mb-4">
          {language === 'pt' ? 'Benefícios da Associação' : 'Membership Benefits'}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {membershipStats.benefits.map((benefit, index) => (
            <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
              <Heart className="w-4 h-4 text-coral-500" />
              <span className="text-sm text-gray-700">{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Platform Insights */}
      <div className="mt-6 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg">
        <div className="flex items-start space-x-3">
          <TrendingUp className="w-5 h-5 text-primary-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-primary-900 mb-2">
              {language === 'pt' ? 'Insights da Plataforma' : 'Platform Insights'}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-primary-800 mb-1">
                  <strong>{language === 'pt' ? 'Crescimento Semanal:' : 'Weekly Growth:'}</strong> +15%
                </p>
                <p className="text-primary-700">
                  {language === 'pt' 
                    ? 'Sua atividade na comunidade portuguesa aumentou'
                    : 'Your Portuguese community activity increased'
                  }
                </p>
              </div>
              <div>
                <p className="text-primary-800 mb-1">
                  <strong>{language === 'pt' ? 'Próximo Marco:' : 'Next Milestone:'}</strong> 50 {language === 'pt' ? 'conexões' : 'connections'}
                </p>
                <p className="text-primary-700">
                  {language === 'pt' 
                    ? 'Faltam apenas 8 conexões para desbloquear benefícios especiais'
                    : 'Only 8 more connections to unlock special benefits'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}