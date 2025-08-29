'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { brandColors, PORTUGUESE_COLORS } from '@/config/brand'

interface Badge {
  id: string
  name: string
  namePt: string
  description: string
  descriptionPt: string
  icon: string
  category: 'community' | 'achievement' | 'cultural' | 'professional'
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  earned: boolean
  earnedDate?: string
  progress?: number
  maxProgress?: number
  requirements: string[]
  requirementsPt: string[]
}

interface NetworkBadgesProps {
  userBadges?: Badge[]
  onBadgeClick: (badge: Badge) => void
  showEarnedOnly?: boolean
  className?: string
}

const COMMUNITY_BADGES: Badge[] = [
  {
    id: 'welcome-ambassador',
    name: 'Welcome Ambassador',
    namePt: 'Embaixador de Boas-Vindas',
    description: 'Helped 10+ new Portuguese-speaking members settle in the UK',
    descriptionPt: 'Ajudou mais de 10 novos membros lusófonos a estabelecer-se no Reino Unido',
    icon: '🤝',
    category: 'community',
    rarity: 'rare',
    earned: true,
    earnedDate: '2024-07-15',
    requirements: [
      'Welcome 10+ new community members',
      'Provide helpful settlement advice',
      'Maintain positive community feedback'
    ],
    requirementsPt: [
      'Dar as boas-vindas a mais de 10 novos membros',
      'Fornecer conselhos úteis de adaptação',
      'Manter feedback positivo da comunidade'
    ]
  },
  {
    id: 'cultural-keeper',
    name: 'Cultural Keeper',
    namePt: 'Guardião Cultural',
    description: 'Organized Portuguese cultural events and preserved traditions',
    descriptionPt: 'Organizou eventos culturais portugueses e preservou tradições',
    icon: '🏛️',
    category: 'cultural',
    rarity: 'epic',
    earned: true,
    earnedDate: '2024-06-20',
    requirements: [
      'Organize 3+ cultural events',
      'Share traditional Portuguese knowledge',
      'Engage 50+ community members in cultural activities'
    ],
    requirementsPt: [
      'Organizar mais de 3 eventos culturais',
      'Partilhar conhecimento tradicional português',
      'Envolver mais de 50 membros em atividades culturais'
    ]
  },
  {
    id: 'business-connector',
    name: 'Business Connector',
    namePt: 'Conector de Negócios',
    description: 'Facilitated business connections within the Portuguese-speaking community',
    descriptionPt: 'Facilitou conexões empresariais dentro da comunidade lusófona',
    icon: '💼',
    category: 'professional',
    rarity: 'rare',
    earned: false,
    progress: 7,
    maxProgress: 15,
    requirements: [
      'Make 15+ business introductions',
      'Support Portuguese-owned businesses',
      'Participate in networking events'
    ],
    requirementsPt: [
      'Fazer mais de 15 apresentações de negócios',
      'Apoiar empresas de propriedade portuguesa',
      'Participar em eventos de networking'
    ]
  },
  {
    id: 'mentor-of-excellence',
    name: 'Mentor of Excellence',
    namePt: 'Mentor de Excelência',
    description: 'Provided outstanding mentorship to Portuguese-speaking students and professionals',
    descriptionPt: 'Forneceu mentoria excepcional a estudantes e profissionais lusófonos',
    icon: '🎓',
    category: 'achievement',
    rarity: 'legendary',
    earned: false,
    progress: 2,
    maxProgress: 5,
    requirements: [
      'Mentor 5+ community members successfully',
      'Achieve 90%+ mentee satisfaction rating',
      'Complete advanced mentorship training'
    ],
    requirementsPt: [
      'Orientar com sucesso mais de 5 membros',
      'Alcançar classificação de satisfação de mais de 90%',
      'Completar formação avançada de mentoria'
    ]
  },
  {
    id: 'event-champion',
    name: 'Event Champion',
    namePt: 'Campeão de Eventos',
    description: 'Consistently attended and supported Portuguese community events',
    descriptionPt: 'Participou consistentemente e apoiou eventos da comunidade portuguesa',
    icon: '🎉',
    category: 'community',
    rarity: 'common',
    earned: true,
    earnedDate: '2024-08-10',
    requirements: [
      'Attend 10+ community events',
      'Provide positive event feedback',
      'Encourage others to participate'
    ],
    requirementsPt: [
      'Participar em mais de 10 eventos comunitários',
      'Fornecer feedback positivo dos eventos',
      'Encorajar outros a participar'
    ]
  },
  {
    id: 'heritage-storyteller',
    name: 'Heritage Storyteller',
    namePt: 'Contador de Histórias da Herança',
    description: 'Shared compelling stories about Portuguese heritage and experiences in the UK',
    descriptionPt: 'Partilhou histórias cativantes sobre herança portuguesa e experiências no Reino Unido',
    icon: '📚',
    category: 'cultural',
    rarity: 'rare',
    earned: false,
    progress: 3,
    maxProgress: 8,
    requirements: [
      'Share 8+ meaningful heritage stories',
      'Receive positive community engagement',
      'Inspire others to share their stories'
    ],
    requirementsPt: [
      'Partilhar mais de 8 histórias significativas',
      'Receber envolvimento positivo da comunidade',
      'Inspirar outros a partilhar as suas histórias'
    ]
  },
  {
    id: 'language-bridge',
    name: 'Language Bridge',
    namePt: 'Ponte Linguística',
    description: 'Helped Portuguese speakers improve their English and integrate better',
    descriptionPt: 'Ajudou falantes de português a melhorar o inglês e integrar-se melhor',
    icon: '🌉',
    category: 'community',
    rarity: 'rare',
    earned: false,
    progress: 12,
    maxProgress: 20,
    requirements: [
      'Provide language support to 20+ members',
      'Organize language exchange sessions',
      'Create helpful language resources'
    ],
    requirementsPt: [
      'Fornecer apoio linguístico a mais de 20 membros',
      'Organizar sessões de intercâmbio linguístico',
      'Criar recursos linguísticos úteis'
    ]
  },
  {
    id: 'unity-builder',
    name: 'Unity Builder',
    namePt: 'Construtor da Unidade',
    description: 'Brought together Portuguese speakers from different nations in friendship',
    descriptionPt: 'Uniu falantes de português de diferentes nações em amizade',
    icon: '🤝',
    category: 'community',
    rarity: 'epic',
    earned: false,
    progress: 4,
    maxProgress: 8,
    requirements: [
      'Connect members from 8 different lusophone countries',
      'Organize multicultural Portuguese events',
      'Foster cross-cultural understanding'
    ],
    requirementsPt: [
      'Conectar membros de 8 países lusófonos diferentes',
      'Organizar eventos portugueses multiculturais',
      'Promover compreensão intercultural'
    ]
  }
]

export default function NetworkBadges({
  userBadges = COMMUNITY_BADGES,
  onBadgeClick,
  showEarnedOnly = false,
  className = ''
}: NetworkBadgesProps) {
  const { language } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedRarity, setSelectedRarity] = useState<string>('all')

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return PORTUGUESE_COLORS.green[500]
      case 'rare': return brandColors.primary
      case 'epic': return PORTUGUESE_COLORS.red[500]
      case 'legendary': return '#8B008B'
      default: return '#6B7280'
    }
  }

  const getRarityGlow = (rarity: string) => {
    const color = getRarityColor(rarity)
    return `0 0 20px ${color}33`
  }

  const categories = [
    { value: 'all', label: language === 'pt' ? 'Todas' : 'All' },
    { value: 'community', label: language === 'pt' ? 'Comunidade' : 'Community' },
    { value: 'cultural', label: language === 'pt' ? 'Cultural' : 'Cultural' },
    { value: 'professional', label: language === 'pt' ? 'Profissional' : 'Professional' },
    { value: 'achievement', label: language === 'pt' ? 'Conquistas' : 'Achievement' }
  ]

  const rarities = [
    { value: 'all', label: language === 'pt' ? 'Todas' : 'All' },
    { value: 'common', label: language === 'pt' ? 'Comum' : 'Common' },
    { value: 'rare', label: language === 'pt' ? 'Raro' : 'Rare' },
    { value: 'epic', label: language === 'pt' ? 'Épico' : 'Epic' },
    { value: 'legendary', label: language === 'pt' ? 'Lendário' : 'Legendary' }
  ]

  const filteredBadges = userBadges.filter(badge => {
    const categoryMatch = selectedCategory === 'all' || badge.category === selectedCategory
    const rarityMatch = selectedRarity === 'all' || badge.rarity === selectedRarity
    const earnedMatch = !showEarnedOnly || badge.earned
    return categoryMatch && rarityMatch && earnedMatch
  })

  const earnedBadges = userBadges.filter(badge => badge.earned)
  const totalBadges = userBadges.length
  const completionPercentage = Math.round((earnedBadges.length / totalBadges) * 100)

  return (
    <div className={`bg-white ${className}`}>
      {/* Header Stats */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-4" style={{ color: brandColors.primary }}>
          {language === 'pt' ? 'Distintivos da Rede' : 'Network Badges'}
        </h2>
        <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold mb-1" style={{ color: brandColors.primary }}>
              {earnedBadges.length}
            </div>
            <div className="text-sm text-gray-600">
              {language === 'pt' ? 'Conquistados' : 'Earned'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold mb-1 text-gray-600">
              {totalBadges - earnedBadges.length}
            </div>
            <div className="text-sm text-gray-600">
              {language === 'pt' ? 'Disponíveis' : 'Available'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold mb-1" style={{ color: PORTUGUESE_COLORS.green[500] }}>
              {completionPercentage}%
            </div>
            <div className="text-sm text-gray-600">
              {language === 'pt' ? 'Completo' : 'Complete'}
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'pt' ? 'Categoria' : 'Category'}
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.value
                    ? 'text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={{
                  backgroundColor: selectedCategory === category.value ? brandColors.primary : undefined
                }}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'pt' ? 'Raridade' : 'Rarity'}
          </label>
          <div className="flex flex-wrap gap-2">
            {rarities.map(rarity => (
              <button
                key={rarity.value}
                onClick={() => setSelectedRarity(rarity.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedRarity === rarity.value
                    ? 'text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={{
                  backgroundColor: selectedRarity === rarity.value ? getRarityColor(rarity.value) : undefined
                }}
              >
                {rarity.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredBadges.map((badge) => (
          <button
            key={badge.id}
            onClick={() => onBadgeClick(badge)}
            className={`
              relative p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105
              ${badge.earned 
                ? 'bg-white shadow-lg hover:shadow-xl' 
                : 'bg-gray-50 border-gray-200 opacity-75 hover:opacity-100'
              }
            `}
            style={{
              borderColor: badge.earned ? getRarityColor(badge.rarity) : '#E5E7EB',
              boxShadow: badge.earned ? getRarityGlow(badge.rarity) : undefined
            }}
          >
            {/* Badge Icon */}
            <div className="text-center mb-4">
              <div 
                className="text-4xl mb-2 inline-block transform transition-transform duration-200 hover:scale-110"
                style={{
                  filter: badge.earned ? 'none' : 'grayscale(1)'
                }}
              >
                {badge.icon}
              </div>
              
              {/* Rarity Indicator */}
              <div className="flex justify-center">
                <div
                  className="px-2 py-1 rounded-full text-xs font-medium text-white"
                  style={{ backgroundColor: getRarityColor(badge.rarity) }}
                >
                  {language === 'pt' 
                    ? rarities.find(r => r.value === badge.rarity)?.label 
                    : badge.rarity.charAt(0).toUpperCase() + badge.rarity.slice(1)
                  }
                </div>
              </div>
            </div>

            {/* Badge Info */}
            <div className="text-center">
              <h3 className="font-bold text-sm mb-2 text-gray-900 leading-tight">
                {language === 'pt' ? badge.namePt : badge.name}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                {language === 'pt' ? badge.descriptionPt : badge.description}
              </p>
            </div>

            {/* Progress Bar (for unearned badges) */}
            {!badge.earned && badge.progress !== undefined && badge.maxProgress && (
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${(badge.progress / badge.maxProgress) * 100}%`,
                      backgroundColor: getRarityColor(badge.rarity)
                    }}
                  />
                </div>
                <div className="text-xs text-gray-500 text-center mt-1">
                  {badge.progress} / {badge.maxProgress}
                </div>
              </div>
            )}

            {/* Earned Date */}
            {badge.earned && badge.earnedDate && (
              <div className="mt-3 text-xs text-gray-500 text-center">
                {language === 'pt' ? 'Conquistado em' : 'Earned on'}<br />
                {new Date(badge.earnedDate).toLocaleDateString(
                  language === 'pt' ? 'pt-PT' : 'en-GB'
                )}
              </div>
            )}

            {/* Earned Checkmark */}
            {badge.earned && (
              <div 
                className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center shadow-lg"
                style={{ backgroundColor: getRarityColor(badge.rarity) }}
              >
                <span className="text-white text-sm font-bold">✓</span>
              </div>
            )}

            {/* Lock Icon for unearned */}
            {!badge.earned && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">🔒</span>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Empty State */}
      {filteredBadges.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🏆</div>
          <p className="text-xl text-gray-600 mb-2">
            {language === 'pt' 
              ? 'Nenhum distintivo encontrado'
              : 'No badges found'
            }
          </p>
          <p className="text-sm text-gray-500">
            {language === 'pt'
              ? 'Participe mais na comunidade para conquistar distintivos'
              : 'Engage more with the community to earn badges'
            }
          </p>
        </div>
      )}
    </div>
  )
}