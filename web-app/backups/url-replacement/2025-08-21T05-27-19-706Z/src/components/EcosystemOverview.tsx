'use client'

import React from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { usePlatformIntegration } from '@/context/PlatformIntegrationContext'
import { useNetworking } from '@/context/NetworkingContext'
import { useSubscription } from '@/context/SubscriptionContext'
import { 
  Network, 
  Car, 
  Calendar, 
  Users, 
  Star, 
  TrendingUp,
  Crown,
  Heart,
  MapPin,
  Clock
} from 'lucide-react'

export default function EcosystemOverview() {
  const { language, t } = useLanguage()
  const { 
    userJourney, 
    getPortugueseCommunityInsights,
    calculateMembershipBenefits 
  } = usePlatformIntegration()
  const { stats } = useNetworking()
  const { hasActiveSubscription, membershipTier, serviceDiscount } = useSubscription()

  const communityInsights = getPortugueseCommunityInsights()
  const membershipBenefits = calculateMembershipBenefits()

  const getJourneyStage = () => {
    const stage = userJourney?.currentStep || 'discovery'
    const stageLabels = {
      discovery: { 
        pt: 'Descobrindo a Comunidade', 
        en: 'Discovering Community',
        color: 'bg-accent-100 text-accent-700'
      },
      engagement: { 
        pt: 'Participação Ativa', 
        en: 'Active Participation',
        color: 'bg-secondary-100 text-secondary-700'
      },
      investment: { 
        pt: 'Membro Investido', 
        en: 'Invested Member',
        color: 'bg-primary-100 text-primary-700'
      },
      advocacy: { 
        pt: 'Embaixador da Comunidade', 
        en: 'Community Ambassador',
        color: 'bg-premium-100 text-premium-700'
      }
    }
    return stageLabels[stage as keyof typeof stageLabels]
  }

  const journeyStage = getJourneyStage()

  return (
    <div className="space-y-6">
      {/* Hero Overview Card */}
      <div className="bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 rounded-xl shadow-lg p-8 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="mb-6 lg:mb-0">
            <h1 className="text-3xl font-bold mb-2">
              {language === 'pt' ? 'Seu Ecossistema LusoTown' : 'Your LusoTown Ecosystem'}
            </h1>
            <p className="text-primary-100 text-lg mb-4">
              {language === 'pt' 
                ? 'Conectando serviços premium com a comunidade portuguesa em Londres'
                : 'Connecting premium services with the Portuguese community in London'
              }
            </p>
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${journeyStage.color} bg-white/20`}>
              <Star className="w-4 h-4 mr-2" />
              {language === 'pt' ? journeyStage.pt : journeyStage.en}
            </div>
          </div>
          <div className="text-center lg:text-right">
            <div className="text-4xl font-bold mb-1">{userJourney?.lifetimeValue || 0}</div>
            <div className="text-primary-100">
              {language === 'pt' ? 'Pontos da Plataforma' : 'Platform Points'}
            </div>
          </div>
        </div>
      </div>

      {/* Integration Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Network className="w-6 h-6 text-primary-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{stats.totalConnections}</div>
          <div className="text-sm text-gray-600">
            {language === 'pt' ? 'Conexões' : 'Connections'}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Calendar className="w-6 h-6 text-secondary-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{stats.eventsAttended}</div>
          <div className="text-sm text-gray-600">
            {language === 'pt' ? 'Eventos' : 'Events'}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Car className="w-6 h-6 text-accent-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {userJourney?.transportUsage.bookingsLast30Days || 0}
          </div>
          <div className="text-sm text-gray-600">
            {language === 'pt' ? 'Transportes' : 'Transports'}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <div className="w-12 h-12 bg-premium-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Crown className="w-6 h-6 text-premium-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{serviceDiscount}%</div>
          <div className="text-sm text-gray-600">
            {language === 'pt' ? 'Desconto' : 'Discount'}
          </div>
        </div>
      </div>

      {/* Platform Integration Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Community Integration */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {language === 'pt' ? 'Integração Comunitária' : 'Community Integration'}
            </h3>
            <Users className="w-5 h-5 text-secondary-500" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Heart className="w-4 h-4 text-action-500" />
                <span className="text-gray-700">
                  {language === 'pt' ? 'Membros Ativos' : 'Active Members'}
                </span>
              </div>
              <span className="font-semibold text-gray-900">
                {communityInsights.activeLastMonth.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-4 h-4 text-secondary-500" />
                <span className="text-gray-700">
                  {language === 'pt' ? 'Crescimento' : 'Growth'}
                </span>
              </div>
              <span className="font-semibold text-secondary-600">
                {communityInsights.communityGrowth}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-primary-500" />
                <span className="text-gray-700">
                  {language === 'pt' ? 'Total Membros' : 'Total Members'}
                </span>
              </div>
              <span className="font-semibold text-gray-900">
                {communityInsights.totalMembers.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Service Integration */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {language === 'pt' ? 'Integração de Serviços' : 'Service Integration'}
            </h3>
            <Car className="w-5 h-5 text-accent-500" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Crown className="w-4 h-4 text-premium-500" />
                <span className="text-gray-700">
                  {language === 'pt' ? 'Nível de Membro' : 'Membership Level'}
                </span>
              </div>
              <span className="font-semibold text-premium-600 capitalize">
                {membershipTier}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Star className="w-4 h-4 text-accent-500" />
                <span className="text-gray-700">
                  {language === 'pt' ? 'Desconto Transporte' : 'Transport Discount'}
                </span>
              </div>
              <span className="font-semibold text-accent-600">
                {membershipBenefits.transportDiscount}%
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-secondary-500" />
                <span className="text-gray-700">
                  {language === 'pt' ? 'Prioridade Eventos' : 'Event Priority'}
                </span>
              </div>
              <span className={`font-semibold ${membershipBenefits.eventPriority ? 'text-secondary-600' : 'text-gray-400'}`}>
                {membershipBenefits.eventPriority 
                  ? (language === 'pt' ? 'Ativa' : 'Active')
                  : (language === 'pt' ? 'Inativa' : 'Inactive')
                }
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Services Integration */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {language === 'pt' ? 'Serviços Populares da Comunidade' : 'Popular Community Services'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {communityInsights.topEvents.map((event, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {index + 1}
                </div>
                <span className="text-gray-900 font-medium">{event}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}