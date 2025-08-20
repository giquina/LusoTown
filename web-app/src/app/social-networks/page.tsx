'use client'

import React, { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { socialNetworksService, PortugueseSocialNetwork, SocialNetworkFilter, SocialPlatform, NetworkType } from '@/lib/socialNetworks'
import { 
  ChatBubbleLeftRightIcon,
  UsersIcon,
  ShieldCheckIcon,
  StarIcon,
  ClockIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  UserGroupIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  HeartIcon,
  CalendarDaysIcon,
  MapPinIcon,
  CheckBadgeIcon,
  ExclamationTriangleIcon,
  ArrowTopRightOnSquareIcon,
  FunnelIcon
} from '@heroicons/react/24/outline'

interface SocialNetworkCardProps {
  network: PortugueseSocialNetwork
}

const SocialNetworkCard: React.FC<SocialNetworkCardProps> = ({ network }) => {
  const { language } = useLanguage()
  const [joinRequested, setJoinRequested] = useState(false)

  const getPlatformIcon = (platform: SocialPlatform) => {
    const icons = {
      whatsapp: '📱',
      facebook: '👥',
      telegram: '✈️',
      discord: '🎮',
      linkedin: '💼',
      instagram: '📸',
      signal: '🔒',
      meetup: '🤝',
      reddit: '🟧',
      viber: '💜'
    }
    return icons[platform] || '💬'
  }

  const getPlatformColor = (platform: SocialPlatform) => {
    const colors = {
      whatsapp: 'bg-green-500',
      facebook: 'bg-primary-600',
      telegram: 'bg-primary-400',
      discord: 'bg-indigo-600',
      linkedin: 'bg-primary-700',
      instagram: 'bg-pink-500',
      signal: 'bg-gray-700',
      meetup: 'bg-red-500',
      reddit: 'bg-orange-500',
      viber: 'bg-purple-500'
    }
    return colors[platform] || 'bg-gray-500'
  }

  const getActivityLevelColor = (level: string) => {
    const colors = {
      very_high: 'text-green-600 bg-green-50',
      high: 'text-primary-600 bg-primary-50',
      medium: 'text-yellow-600 bg-yellow-50',
      low: 'text-gray-600 bg-gray-50'
    }
    return colors[level as keyof typeof colors] || 'text-gray-600 bg-gray-50'
  }

  const getPartnershipBadge = (status: string) => {
    const badges = {
      official_partner: { 
        label: language === 'pt' ? 'Parceiro Oficial' : 'Official Partner', 
        color: 'bg-green-500 text-white'
      },
      community_partner: { 
        label: language === 'pt' ? 'Parceiro Comunitário' : 'Community Partner', 
        color: 'bg-primary-500 text-white'
      },
      affiliated: { 
        label: language === 'pt' ? 'Afiliado' : 'Affiliated', 
        color: 'bg-purple-500 text-white'
      },
      listed: { 
        label: language === 'pt' ? 'Listado' : 'Listed', 
        color: 'bg-gray-500 text-white'
      }
    }
    return badges[status as keyof typeof badges] || badges.listed
  }

  const handleJoinRequest = async () => {
    try {
      const result = await socialNetworksService.requestNetworkJoin(network.id, {
        name: 'Demo User',
        email: 'demo@lusotown.com',
        reason: 'I want to connect with the Portuguese community',
        lusoTownMember: true
      })
      
      if (result.success) {
        setJoinRequested(true)
        alert(result.message)
      }
    } catch (error) {
      console.error('Error requesting to join network:', error)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
      {/* Header with Platform and Partnership */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 ${getPlatformColor(network.platform)} rounded-lg flex items-center justify-center text-white text-lg`}>
              {getPlatformIcon(network.platform)}
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary-600 transition-colors">
                {language === 'pt' ? network.namePortuguese : network.name}
              </h3>
              <p className="text-sm text-gray-600 capitalize">{network.platform}</p>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-1">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPartnershipBadge(network.partnershipStatus).color}`}>
              {getPartnershipBadge(network.partnershipStatus).label}
            </span>
            {network.verified && (
              <div className="flex items-center gap-1 text-green-600 text-xs">
                <CheckBadgeIcon className="w-3 h-3" />
                <span>{language === 'pt' ? 'Verificado' : 'Verified'}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {language === 'pt' ? network.descriptionPortuguese : network.description}
        </p>
        
        {/* Network Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4 text-center">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-lg font-bold text-primary-600">{network.memberCount.toLocaleString()}</div>
            <div className="text-xs text-gray-600">{language === 'pt' ? 'Membros' : 'Members'}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-lg font-bold text-secondary-600">{network.activeMembers.toLocaleString()}</div>
            <div className="text-xs text-gray-600">{language === 'pt' ? 'Ativos' : 'Active'}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-lg font-bold text-accent-600">{network.safetyRating}</div>
            <div className="text-xs text-gray-600">{language === 'pt' ? 'Segurança' : 'Safety'}</div>
          </div>
        </div>
        
        {/* Activity Level */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              {language === 'pt' ? 'Nível de Atividade' : 'Activity Level'}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getActivityLevelColor(network.activityLevel)}`}>
              {network.activityLevel.replace('_', ' ').toUpperCase()}
            </span>
          </div>
          <div className="text-xs text-gray-600">
            <div className="flex items-center gap-1 mb-1">
              <ChatBubbleLeftRightIcon className="w-3 h-3" />
              <span>{network.postFrequency}</span>
            </div>
            <div className="flex items-center gap-1">
              <ClockIcon className="w-3 h-3" />
              <span>{network.responseTime}</span>
            </div>
          </div>
        </div>
        
        {/* Community Focus */}
        <div className="mb-4">
          <h4 className="font-medium text-gray-900 mb-2 text-sm">
            {language === 'pt' ? 'Focos da Comunidade' : 'Community Focus'}
          </h4>
          <div className="flex flex-wrap gap-1">
            {network.focus.slice(0, 3).map(focus => (
              <span
                key={focus}
                className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full"
              >
                {focus.replace('_', ' ')}
              </span>
            ))}
            {network.focus.length > 3 && (
              <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-full">
                +{network.focus.length - 3} {language === 'pt' ? 'mais' : 'more'}
              </span>
            )}
          </div>
        </div>
        
        {/* Quality Ratings */}
        <div className="mb-4">
          <h4 className="font-medium text-gray-900 mb-2 text-sm">
            {language === 'pt' ? 'Avaliações da Comunidade' : 'Community Ratings'}
          </h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">{language === 'pt' ? 'Segurança' : 'Safety'}</span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <StarIcon 
                    key={i} 
                    className={`w-3 h-3 ${i < network.safetyRating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
                <span className="text-gray-600 ml-1">{network.safetyRating}</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">{language === 'pt' ? 'Qualidade' : 'Quality'}</span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <StarIcon 
                    key={i} 
                    className={`w-3 h-3 ${i < network.contentQuality ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
                <span className="text-gray-600 ml-1">{network.contentQuality}</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">{language === 'pt' ? 'Utilidade' : 'Helpfulness'}</span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <StarIcon 
                    key={i} 
                    className={`w-3 h-3 ${i < network.helpfulness ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
                <span className="text-gray-600 ml-1">{network.helpfulness}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Member Benefits */}
        {network.memberBenefits.length > 0 && (
          <div className="mb-4">
            <h4 className="font-medium text-gray-900 mb-2 text-sm">
              {language === 'pt' ? 'Benefícios para Membros' : 'Member Benefits'}
            </h4>
            <ul className="text-xs text-gray-600 space-y-1">
              {network.memberBenefits.slice(0, 3).map((benefit, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckBadgeIcon className="w-3 h-3 text-green-500 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Network Info */}
        <div className="mb-4 text-xs text-gray-600 space-y-1">
          <div className="flex items-center gap-2">
            <MapPinIcon className="w-3 h-3" />
            <span>{network.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <GlobeAltIcon className="w-3 h-3" />
            <span>
              {network.primaryLanguage === 'portuguese' ? (language === 'pt' ? 'Português' : 'Portuguese') :
               network.primaryLanguage === 'english' ? (language === 'pt' ? 'Inglês' : 'English') :
               language === 'pt' ? 'Bilíngue' : 'Bilingual'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <UsersIcon className="w-3 h-3" />
            <span>{network.ageGroup}</span>
          </div>
        </div>
        
        {/* Join Method Info */}
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            {network.joinMethod === 'open' && <CheckBadgeIcon className="w-4 h-4 text-green-500" />}
            {network.joinMethod === 'invite_only' && <ExclamationTriangleIcon className="w-4 h-4 text-yellow-500" />}
            {network.joinMethod === 'admin_approval' && <ShieldCheckIcon className="w-4 h-4 text-primary-500" />}
            {network.joinMethod === 'partner_referral' && <StarIcon className="w-4 h-4 text-purple-500" />}
            <span className="text-sm font-medium text-gray-900">
              {network.joinMethod === 'open' && (language === 'pt' ? 'Acesso Aberto' : 'Open Access')}
              {network.joinMethod === 'invite_only' && (language === 'pt' ? 'Apenas por Convite' : 'Invite Only')}
              {network.joinMethod === 'admin_approval' && (language === 'pt' ? 'Aprovação do Admin' : 'Admin Approval')}
              {network.joinMethod === 'partner_referral' && (language === 'pt' ? 'Parceiro LusoTown' : 'LusoTown Partner')}
            </span>
          </div>
          <p className="text-xs text-gray-600">
            {network.joinMethod === 'open' && (language === 'pt' ? 'Pode aderir diretamente' : 'Can join directly')}
            {network.joinMethod === 'invite_only' && (language === 'pt' ? 'Precisa de convite de membro' : 'Requires member invitation')}
            {network.joinMethod === 'admin_approval' && (language === 'pt' ? 'Requer aprovação do administrador' : 'Requires admin approval')}
            {network.joinMethod === 'partner_referral' && (language === 'pt' ? 'Acesso rápido para membros LusoTown' : 'Fast access for LusoTown members')}
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2">
          {!joinRequested ? (
            <button 
              onClick={handleJoinRequest}
              className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold py-3 px-4 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200"
            >
              {language === 'pt' ? 'Solicitar Adesão' : 'Request to Join'}
            </button>
          ) : (
            <button 
              disabled
              className="flex-1 bg-green-500 text-white font-semibold py-3 px-4 rounded-lg opacity-75"
            >
              {language === 'pt' ? 'Solicitação Enviada' : 'Request Sent'}
            </button>
          )}
          
          {network.joinLink && (
            <a
              href={network.joinLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <ArrowTopRightOnSquareIcon className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function SocialNetworks() {
  const { language } = useLanguage()
  const [networks, setNetworks] = useState<PortugueseSocialNetwork[]>([])
  const [statistics, setStatistics] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform | 'all'>('all')
  const [selectedType, setSelectedType] = useState<NetworkType | 'all'>('all')

  useEffect(() => {
    loadNetworks()
    loadStatistics()
  }, [selectedPlatform, selectedType])

  const loadNetworks = async () => {
    try {
      setLoading(true)
      
      const filters: SocialNetworkFilter = {}
      if (selectedPlatform !== 'all') {
        filters.platform = [selectedPlatform]
      }
      if (selectedType !== 'all') {
        filters.type = [selectedType]
      }
      
      const networkResults = await socialNetworksService.searchNetworks(filters)
      setNetworks(networkResults)
    } catch (error) {
      console.error('Error loading networks:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadStatistics = async () => {
    try {
      const stats = await socialNetworksService.getSocialNetworkStatistics()
      setStatistics(stats)
    } catch (error) {
      console.error('Error loading statistics:', error)
    }
  }

  const platforms: { value: SocialPlatform | 'all'; label: string; icon: string }[] = [
    { value: 'all', label: language === 'pt' ? 'Todas' : 'All', icon: '🌐' },
    { value: 'whatsapp', label: 'WhatsApp', icon: '📱' },
    { value: 'facebook', label: 'Facebook', icon: '👥' },
    { value: 'telegram', label: 'Telegram', icon: '✈️' },
    { value: 'linkedin', label: 'LinkedIn', icon: '💼' },
    { value: 'discord', label: 'Discord', icon: '🎮' },
    { value: 'instagram', label: 'Instagram', icon: '📸' }
  ]

  const networkTypes: { value: NetworkType | 'all'; label: { en: string; pt: string } }[] = [
    { value: 'all', label: { en: 'All Types', pt: 'Todos os Tipos' } },
    { value: 'general_community', label: { en: 'General Community', pt: 'Comunidade Geral' } },
    { value: 'business_networking', label: { en: 'Business', pt: 'Negócios' } },
    { value: 'cultural_events', label: { en: 'Cultural Events', pt: 'Eventos Culturais' } },
    { value: 'young_professionals', label: { en: 'Professionals', pt: 'Profissionais' } },
    { value: 'families', label: { en: 'Families', pt: 'Famílias' } },
    { value: 'students', label: { en: 'Students', pt: 'Estudantes' } }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {language === 'pt' ? 'Redes Sociais da Comunidade Portuguesa' : 'Portuguese Community Social Networks'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'pt' 
              ? 'Conecte-se com grupos, canais e comunidades portuguesas ativas em Londres. WhatsApp, Facebook, Telegram e muito mais.'
              : 'Connect with active Portuguese groups, channels, and communities in the U.K.. WhatsApp, Facebook, Telegram, and more.'}
          </p>
          
          {/* Statistics */}
          {statistics && (
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-2xl font-bold text-primary-600">{statistics.totalNetworks}</div>
                <div className="text-sm text-gray-600">{language === 'pt' ? 'Redes' : 'Networks'}</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-2xl font-bold text-secondary-600">{statistics.totalMembers.toLocaleString()}</div>
                <div className="text-sm text-gray-600">{language === 'pt' ? 'Membros' : 'Members'}</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-2xl font-bold text-accent-600">{statistics.verifiedNetworks}</div>
                <div className="text-sm text-gray-600">{language === 'pt' ? 'Verificadas' : 'Verified'}</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-2xl font-bold text-premium-600">{statistics.averageSafetyRating}</div>
                <div className="text-sm text-gray-600">{language === 'pt' ? 'Segurança' : 'Safety'}</div>
              </div>
            </div>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            {language === 'pt' ? 'Filtrar por Plataforma' : 'Filter by Platform'}
          </h3>
          <div className="flex flex-wrap gap-2">
            {platforms.map(platform => (
              <button
                key={platform.value}
                onClick={() => setSelectedPlatform(platform.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedPlatform === platform.value
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>{platform.icon}</span>
                <span>{platform.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            {language === 'pt' ? 'Filtrar por Tipo' : 'Filter by Type'}
          </h3>
          <div className="flex flex-wrap gap-2">
            {networkTypes.map(type => (
              <button
                key={type.value}
                onClick={() => setSelectedType(type.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedType === type.value
                    ? 'bg-secondary-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {type.label[language]}
              </button>
            ))}
          </div>
        </div>

        {/* Networks Grid */}
        {networks.length === 0 ? (
          <div className="text-center py-12">
            <ChatBubbleLeftRightIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {language === 'pt' ? 'Nenhuma rede encontrada' : 'No networks found'}
            </h3>
            <p className="text-gray-600 mb-6">
              {language === 'pt' 
                ? 'Tente ajustar seus filtros para encontrar mais redes sociais.'
                : 'Try adjusting your filters to find more social networks.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {networks.map(network => (
              <SocialNetworkCard key={network.id} network={network} />
            ))}
          </div>
        )}

        {/* Safety Notice */}
        <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <ExclamationTriangleIcon className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-800 mb-2">
                {language === 'pt' ? 'Aviso de Segurança' : 'Safety Notice'}
              </h3>
              <p className="text-yellow-700 text-sm">
                {language === 'pt' 
                  ? 'Sempre verifique a autenticidade dos grupos antes de partilhar informações pessoais. A LusoTown verifica e monitora as redes parceiras, mas não pode garantir a segurança de grupos externos.'
                  : 'Always verify the authenticity of groups before sharing personal information. LusoTown verifies and monitors partner networks, but cannot guarantee the safety of external groups.'}
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-center text-white">
          <ChatBubbleLeftRightIcon className="w-16 h-16 mx-auto mb-4 opacity-80" />
          <h3 className="text-2xl font-bold mb-4">
            {language === 'pt' ? 'Conhece uma Rede que Não Está Listada?' : 'Know a Network That\'s Not Listed?'}
          </h3>
          <p className="text-lg mb-6 opacity-90">
            {language === 'pt' 
              ? 'Ajude-nos a construir um diretório completo das redes sociais portuguesas em Londres.'
              : 'Help us build a comprehensive directory of Portuguese social networks in the U.K..'}
          </p>
          <button className="bg-white text-primary-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
            {language === 'pt' ? 'Sugerir Rede' : 'Suggest Network'}
          </button>
        </div>
      </div>
    </div>
  )
}