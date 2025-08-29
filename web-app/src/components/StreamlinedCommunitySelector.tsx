'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { brandColors } from '@/config/brand'

interface CommunityOption {
  code: string
  name: string
  namePt: string
  flag: string
  description: string
  descriptionPt: string
}

interface StreamlinedCommunitySelectorProps {
  onSelect: (community: string) => void
  selectedCommunity?: string
  className?: string
}

const LUSOPHONE_COMMUNITIES: CommunityOption[] = [
  {
    code: 'pt',
    name: 'Portugal',
    namePt: 'Portugal',
    flag: '🇵🇹',
    description: 'Connect with Portuguese community across the UK',
    descriptionPt: 'Conecte-se com a comunidade portuguesa no Reino Unido'
  },
  {
    code: 'br',
    name: 'Brazil',
    namePt: 'Brasil',
    flag: '🇧🇷',
    description: 'Join the vibrant Brazilian community in the UK',
    descriptionPt: 'Junte-se à vibrante comunidade brasileira no Reino Unido'
  },
  {
    code: 'cv',
    name: 'Cape Verde',
    namePt: 'Cabo Verde',
    flag: '🇨🇻',
    description: 'Connect with Cape Verdean heritage and culture',
    descriptionPt: 'Conecte-se com a herança e cultura cabo-verdiana'
  },
  {
    code: 'ao',
    name: 'Angola',
    namePt: 'Angola',
    flag: '🇦🇴',
    description: 'Discover Angolan community connections',
    descriptionPt: 'Descubra conexões da comunidade angolana'
  },
  {
    code: 'mz',
    name: 'Mozambique',
    namePt: 'Moçambique',
    flag: '🇲🇿',
    description: 'Join Mozambican cultural community',
    descriptionPt: 'Junte-se à comunidade cultural moçambicana'
  },
  {
    code: 'gw',
    name: 'Guinea-Bissau',
    namePt: 'Guiné-Bissau',
    flag: '🇬🇼',
    description: 'Connect with Guinea-Bissau heritage',
    descriptionPt: 'Conecte-se com a herança da Guiné-Bissau'
  },
  {
    code: 'st',
    name: 'São Tomé and Príncipe',
    namePt: 'São Tomé e Príncipe',
    flag: '🇸🇹',
    description: 'Discover São Tomé community',
    descriptionPt: 'Descubra a comunidade santomense'
  },
  {
    code: 'tl',
    name: 'East Timor',
    namePt: 'Timor-Leste',
    flag: '🇹🇱',
    description: 'Connect with East Timorese community',
    descriptionPt: 'Conecte-se com a comunidade timorense'
  }
]

export default function StreamlinedCommunitySelector({
  onSelect,
  selectedCommunity,
  className = ''
}: StreamlinedCommunitySelectorProps) {
  const { t, language } = useLanguage()
  const [hoveredCommunity, setHoveredCommunity] = useState<string | null>(null)

  const handleCommunitySelect = (communityCode: string) => {
    onSelect(communityCode)
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="mb-6">
        <h2 
          className="text-2xl md:text-3xl font-bold mb-3 text-center"
          style={{ color: brandColors.primary }}
        >
          {language === 'pt' ? 'Escolha Sua Comunidade' : 'Choose Your Community'}
        </h2>
        <p className="text-gray-600 text-center text-sm md:text-base px-4">
          {language === 'pt' 
            ? 'Conecte-se com pessoas que compartilham sua herança lusófona no Reino Unido'
            : 'Connect with people who share your Portuguese-speaking heritage across the UK'
          }
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto">
        {LUSOPHONE_COMMUNITIES.map((community) => (
          <button
            key={community.code}
            onClick={() => handleCommunitySelect(community.code)}
            onMouseEnter={() => setHoveredCommunity(community.code)}
            onMouseLeave={() => setHoveredCommunity(null)}
            className={`
              relative p-4 rounded-xl border-2 transition-all duration-300 ease-in-out
              min-h-[120px] flex flex-col items-center justify-center
              hover:shadow-lg active:scale-95
              ${selectedCommunity === community.code 
                ? 'border-orange-500 bg-orange-50' 
                : 'border-gray-200 bg-white hover:border-orange-300'
              }
            `}
            style={{
              borderColor: selectedCommunity === community.code ? brandColors.primary : undefined,
              backgroundColor: selectedCommunity === community.code ? `${brandColors.primary}10` : undefined
            }}
          >
            <div className="text-3xl mb-2 transform transition-transform duration-200 hover:scale-110">
              {community.flag}
            </div>
            <div className="text-center">
              <div className="font-semibold text-sm md:text-base text-gray-900 mb-1">
                {language === 'pt' ? community.namePt : community.name}
              </div>
              {hoveredCommunity === community.code && (
                <div className="text-xs text-gray-600 leading-tight">
                  {language === 'pt' ? community.descriptionPt : community.description}
                </div>
              )}
            </div>
            
            {selectedCommunity === community.code && (
              <div 
                className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
                style={{ backgroundColor: brandColors.primary }}
              >
                <span className="text-white text-xs">✓</span>
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          {language === 'pt' 
            ? 'Celebrando toda a diversidade da comunidade lusófona'
            : 'Celebrating the full diversity of the Portuguese-speaking community'
          }
        </p>
      </div>
    </div>
  )
}