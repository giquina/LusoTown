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
  className?: string
  showProgress?: boolean
  maxDisplay?: number
}

const AVAILABLE_BADGES: Badge[] = [
  {
    id: 'community-connector',
    name: 'Community Connector',
    namePt: 'Conector Comunitário',
    description: 'Connected with 50+ Portuguese-speaking community members',
    descriptionPt: 'Conectado com mais de 50 membros da comunidade lusófona',
    icon: '🤝',
    category: 'community',
    rarity: 'common',
    earned: true,
    earnedDate: '2024-08-15',
    progress: 67,
    maxProgress: 50,
    requirements: [
      'Make connections with 50 community members',
      'Engage in meaningful conversations',
      'Show active community participation'
    ],
    requirementsPt: [
      'Fazer conexões com 50 membros da comunidade',
      'Participar em conversas significativas',
      'Mostrar participação ativa na comunidade'
    ]
  },
  {
    id: 'cultural-ambassador',
    name: 'Cultural Ambassador',
    namePt: 'Embaixador Cultural',
    description: 'Organized or participated in 10+ Portuguese cultural events',
    descriptionPt: 'Organizou ou participou em mais de 10 eventos culturais portugueses',
    icon: '🎭',
    category: 'cultural',
    rarity: 'rare',
    earned: true,
    earnedDate: '2024-07-20',
    progress: 12,
    maxProgress: 10,
    requirements: [
      'Organize or attend 10+ cultural events',
      'Share Portuguese heritage knowledge',
      'Promote cultural awareness'
    ],
    requirementsPt: [
      'Organizar ou participar em mais de 10 eventos culturais',
      'Partilhar conhecimento do património português',
      'Promover consciência cultural'
    ]
  },
  {
    id: 'business-network-builder',
    name: 'Business Network Builder',
    namePt: 'Construtor de Rede de Negócios',
    description: 'Created successful business partnerships through LusoTown',
    descriptionPt: 'Criou parcerias empresariais de sucesso através do LusoTown',
    icon: '💼',
    category: 'professional',
    rarity: 'epic',
    earned: true,
    earnedDate: '2024-06-10',
    progress: 5,
    maxProgress: 3,
    requirements: [
      'Establish 3+ business partnerships',
      'Generate revenue through connections',
      'Mentor other entrepreneurs'
    ],
    requirementsPt: [
      'Estabelecer mais de 3 parcerias empresariais',
      'Gerar receita através de conexões',
      'Mentorar outros empreendedores'
    ]
  },
  {
    id: 'lusophone-linguist',
    name: 'Lusophone Linguist',
    namePt: 'Linguista Lusófono',
    description: 'Demonstrated fluency in Portuguese and helped others learn',
    descriptionPt: 'Demonstrou fluência em português e ajudou outros a aprender',
    icon: '🗣️',
    category: 'cultural',
    rarity: 'rare',
    earned: false,
    progress: 3,
    maxProgress: 5,
    requirements: [
      'Help 5+ community members with Portuguese',
      'Share language learning resources',
      'Participate in language exchange events'
    ],
    requirementsPt: [
      'Ajudar mais de 5 membros da comunidade com português',
      'Partilhar recursos de aprendizagem de idiomas',
      'Participar em eventos de intercâmbio linguístico'
    ]
  },
  {
    id: 'heritage-guardian',
    name: 'Heritage Guardian',
    namePt: 'Guardião do Património',
    description: 'Preserved and shared Portuguese cultural traditions',
    descriptionPt: 'Preservou e partilhou tradições culturais portuguesas',
    icon: '🏛️',
    category: 'cultural',
    rarity: 'legendary',
    earned: false,
    progress: 2,
    maxProgress: 8,
    requirements: [
      'Document 8+ cultural traditions',
      'Organize heritage preservation events',
      'Teach traditional skills to others',
      'Create cultural content for community'
    ],
    requirementsPt: [
      'Documentar mais de 8 tradições culturais',
      'Organizar eventos de preservação do património',
      'Ensinar habilidades tradicionais a outros',
      'Criar conteúdo cultural para a comunidade'
    ]
  },
  {
    id: 'community-pillar',
    name: 'Community Pillar',
    namePt: 'Pilar da Comunidade',
    description: 'Founding member who helped establish LusoTown community',
    descriptionPt: 'Membro fundador que ajudou a estabelecer a comunidade LusoTown',
    icon: '⭐',
    category: 'achievement',
    rarity: 'legendary',
    earned: false,
    progress: 1,
    maxProgress: 1,
    requirements: [
      'Be among the first 100 members',
      'Invite 25+ new community members',
      'Contribute to platform development'
    ],
    requirementsPt: [
      'Estar entre os primeiros 100 membros',
      'Convidar mais de 25 novos membros da comunidade',
      'Contribuir para o desenvolvimento da plataforma'
    ]
  }
]

export default function NetworkBadges({
  userBadges = AVAILABLE_BADGES,
  className = '',
  showProgress = true,
  maxDisplay
}: NetworkBadgesProps) {
  const { language } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null)

  const categories = [
    { id: 'all', label: language === 'pt' ? 'Todos' : 'All' },
    { id: 'community', label: language === 'pt' ? 'Comunidade' : 'Community' },
    { id: 'cultural', label: language === 'pt' ? 'Cultural' : 'Cultural' },
    { id: 'professional', label: language === 'pt' ? 'Profissional' : 'Professional' },
    { id: 'achievement', label: language === 'pt' ? 'Conquistas' : 'Achievements' }
  ]

  const getRarityColor = (rarity: string) => {
    const colors = {
      common: '#6B7280',
      rare: PORTUGUESE_COLORS.blue[500],
      epic: PORTUGUESE_COLORS.purple[500],
      legendary: PORTUGUESE_COLORS.gold[500]
    }
    return colors[rarity as keyof typeof colors] || colors.common
  }

  const getRarityLabel = (rarity: string) => {
    const labels = {
      common: language === 'pt' ? 'Comum' : 'Common',
      rare: language === 'pt' ? 'Raro' : 'Rare',
      epic: language === 'pt' ? 'Épico' : 'Epic',
      legendary: language === 'pt' ? 'Lendário' : 'Legendary'
    }
    return labels[rarity as keyof typeof labels] || labels.common
  }

  const filteredBadges = userBadges
    .filter(badge => selectedCategory === 'all' || badge.category === selectedCategory)
    .slice(0, maxDisplay)

  const earnedBadges = filteredBadges.filter(badge => badge.earned)
  const unlockedBadges = filteredBadges.filter(badge => !badge.earned)

  return (
    <div className={`${className}`}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'pt' ? 'Distintivos da Rede' : 'Network Badges'}
          </h2>
          <div className="text-sm text-gray-500">
            {earnedBadges.length} {language === 'pt' ? 'de' : 'of'} {filteredBadges.length} {language === 'pt' ? 'conquistados' : 'earned'}
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              style={{
                backgroundColor: selectedCategory === category.id ? brandColors.primary : undefined
              }}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Earned Badges */}
      {earnedBadges.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {language === 'pt' ? 'Distintivos Conquistados' : 'Earned Badges'}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {earnedBadges.map((badge) => (
              <div
                key={badge.id}
                onClick={() => setSelectedBadge(badge)}
                className="relative bg-white rounded-xl p-4 border-2 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                style={{ borderColor: getRarityColor(badge.rarity) }}
              >
                <div className="text-center">
                  <div className="text-4xl mb-2">{badge.icon}</div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">
                    {language === 'pt' ? badge.namePt : badge.name}
                  </h4>
                  <p className="text-xs text-gray-600 mb-2">
                    {(language === 'pt' ? badge.descriptionPt : badge.description).substring(0, 60)}...
                  </p>
                  <div 
                    className="text-xs font-medium px-2 py-1 rounded-full text-white"
                    style={{ backgroundColor: getRarityColor(badge.rarity) }}
                  >
                    {getRarityLabel(badge.rarity)}
                  </div>
                  {badge.earnedDate && (
                    <div className="text-xs text-gray-500 mt-2">
                      {language === 'pt' ? 'Conquistado em' : 'Earned'} {badge.earnedDate}
                    </div>
                  )}
                </div>
                
                {/* Earned Indicator */}
                <div className="absolute top-2 right-2">
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: PORTUGUESE_COLORS.green[500] }}
                  >
                    <span className="text-white text-xs">✓</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* In Progress Badges */}
      {unlockedBadges.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {language === 'pt' ? 'Distintivos em Progresso' : 'Badges in Progress'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {unlockedBadges.map((badge) => (
              <div
                key={badge.id}
                onClick={() => setSelectedBadge(badge)}
                className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer opacity-75 hover:opacity-100"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl opacity-50">{badge.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {language === 'pt' ? badge.namePt : badge.name}
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      {language === 'pt' ? badge.descriptionPt : badge.description}
                    </p>
                    
                    {showProgress && badge.progress !== undefined && badge.maxProgress && (
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-600">
                            {language === 'pt' ? 'Progresso' : 'Progress'}
                          </span>
                          <span className="font-medium">
                            {badge.progress}/{badge.maxProgress}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full transition-all duration-300"
                            style={{ 
                              backgroundColor: getRarityColor(badge.rarity),
                              width: `${(badge.progress / badge.maxProgress) * 100}%`
                            }}
                          ></div>
                        </div>
                      </div>
                    )}
                    
                    <div 
                      className="text-xs font-medium px-2 py-1 rounded-full text-white inline-block"
                      style={{ backgroundColor: getRarityColor(badge.rarity) }}
                    >
                      {getRarityLabel(badge.rarity)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Badge Details Modal */}
      {selectedBadge && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  {language === 'pt' ? 'Detalhes do Distintivo' : 'Badge Details'}
                </h3>
                <button
                  onClick={() => setSelectedBadge(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="text-center mb-6">
                <div className="text-6xl mb-4">{selectedBadge.icon}</div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">
                  {language === 'pt' ? selectedBadge.namePt : selectedBadge.name}
                </h4>
                <p className="text-gray-600 mb-4">
                  {language === 'pt' ? selectedBadge.descriptionPt : selectedBadge.description}
                </p>
                <div 
                  className="inline-block px-3 py-1 rounded-full text-white font-medium"
                  style={{ backgroundColor: getRarityColor(selectedBadge.rarity) }}
                >
                  {getRarityLabel(selectedBadge.rarity)}
                </div>
              </div>

              {/* Progress */}
              {selectedBadge.progress !== undefined && selectedBadge.maxProgress && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">
                      {language === 'pt' ? 'Progresso' : 'Progress'}
                    </span>
                    <span className="text-gray-600">
                      {selectedBadge.progress}/{selectedBadge.maxProgress}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="h-3 rounded-full transition-all duration-300"
                      style={{ 
                        backgroundColor: getRarityColor(selectedBadge.rarity),
                        width: `${(selectedBadge.progress / selectedBadge.maxProgress) * 100}%`
                      }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Requirements */}
              <div className="mb-6">
                <h5 className="font-semibold text-gray-900 mb-3">
                  {language === 'pt' ? 'Requisitos:' : 'Requirements:'}
                </h5>
                <ul className="space-y-2">
                  {(language === 'pt' ? selectedBadge.requirementsPt : selectedBadge.requirements).map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className={`mt-1 ${selectedBadge.earned ? 'text-green-500' : 'text-gray-400'}`}>
                        {selectedBadge.earned ? '✓' : '○'}
                      </span>
                      <span className="text-sm text-gray-600">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Status */}
              <div className="text-center">
                {selectedBadge.earned ? (
                  <div className="text-green-600 font-medium">
                    ✓ {language === 'pt' ? 'Distintivo Conquistado!' : 'Badge Earned!'}
                    {selectedBadge.earnedDate && (
                      <div className="text-sm text-gray-500 mt-1">
                        {language === 'pt' ? 'Conquistado em' : 'Earned on'} {selectedBadge.earnedDate}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-gray-600">
                    {language === 'pt' 
                      ? 'Continue participando na comunidade para conquistar este distintivo!'
                      : 'Keep engaging with the community to earn this badge!'
                    }
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}