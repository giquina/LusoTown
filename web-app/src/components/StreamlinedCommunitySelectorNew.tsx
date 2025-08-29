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
  population: string
  populationPt: string
}

interface StreamlinedCommunitySelectorProps {
  onSelect: (community: string) => void
  selectedCommunity?: string
  className?: string
  showDescriptions?: boolean
}

const LUSOPHONE_COMMUNITIES: CommunityOption[] = [
  {
    code: 'pt',
    name: 'Portugal',
    namePt: 'Portugal',
    flag: '🇵🇹',
    description: 'Connect with Portuguese community across the UK',
    descriptionPt: 'Conecte-se com a comunidade portuguesa no Reino Unido',
    population: '300K+ in UK',
    populationPt: '300K+ no Reino Unido'
  },
  {
    code: 'br',
    name: 'Brazil',
    namePt: 'Brasil',
    flag: '🇧🇷',
    description: 'Join the vibrant Brazilian community in the UK',
    descriptionPt: 'Junte-se à vibrante comunidade brasileira no Reino Unido',
    population: '250K+ in UK',
    populationPt: '250K+ no Reino Unido'
  },
  {
    code: 'cv',
    name: 'Cape Verde',
    namePt: 'Cabo Verde',
    flag: '🇨🇻',
    description: 'Connect with Cape Verdean heritage and culture',
    descriptionPt: 'Conecte-se com a herança e cultura cabo-verdiana',
    population: '25K+ in UK',
    populationPt: '25K+ no Reino Unido'
  },
  {
    code: 'ao',
    name: 'Angola',
    namePt: 'Angola',
    flag: '🇦🇴',
    description: 'Discover Angolan community connections',
    descriptionPt: 'Descubra conexões da comunidade angolana',
    population: '15K+ in UK',
    populationPt: '15K+ no Reino Unido'
  },
  {
    code: 'mz',
    name: 'Mozambique',
    namePt: 'Moçambique',
    flag: '🇲🇿',
    description: 'Join Mozambican cultural community',
    descriptionPt: 'Junte-se à comunidade cultural moçambicana',
    population: '8K+ in UK',
    populationPt: '8K+ no Reino Unido'
  },
  {
    code: 'gw',
    name: 'Guinea-Bissau',
    namePt: 'Guiné-Bissau',
    flag: '🇬🇼',
    description: 'Connect with Guinea-Bissau heritage',
    descriptionPt: 'Conecte-se com a herança da Guiné-Bissau',
    population: '3K+ in UK',
    populationPt: '3K+ no Reino Unido'
  },
  {
    code: 'st',
    name: 'São Tomé and Príncipe',
    namePt: 'São Tomé e Príncipe',
    flag: '🇸🇹',
    description: 'Discover São Tomé community',
    descriptionPt: 'Descubra a comunidade santomense',
    population: '2K+ in UK',
    populationPt: '2K+ no Reino Unido'
  },
  {
    code: 'tl',
    name: 'East Timor',
    namePt: 'Timor-Leste',
    flag: '🇹🇱',
    description: 'Connect with East Timorese community',
    descriptionPt: 'Conecte-se com a comunidade timorense',
    population: '1K+ in UK',
    populationPt: '1K+ no Reino Unido'
  }
]

export default function StreamlinedCommunitySelector({
  onSelect,
  selectedCommunity,
  className = '',
  showDescriptions = true
}: StreamlinedCommunitySelectorProps) {
  const { language } = useLanguage()
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
              min-h-[140px] flex flex-col items-center justify-center
              hover:shadow-lg active:scale-95 group
              ${selectedCommunity === community.code 
                ? 'border-orange-500 bg-orange-50 shadow-md' 
                : 'border-gray-200 bg-white hover:border-orange-300 hover:bg-gray-50'
              }
            `}
            style={{
              borderColor: selectedCommunity === community.code ? brandColors.primary : undefined,
              backgroundColor: selectedCommunity === community.code ? `${brandColors.primary}10` : undefined
            }}
          >
            <div className="text-3xl mb-2 transform transition-transform duration-200 group-hover:scale-110">
              {community.flag}
            </div>
            <div className="text-center">
              <div className="font-semibold text-sm md:text-base text-gray-900 mb-1">
                {language === 'pt' ? community.namePt : community.name}
              </div>
              
              {/* Population info */}
              <div className="text-xs text-gray-500 mb-2">
                {language === 'pt' ? community.populationPt : community.population}
              </div>
              
              {/* Description on hover or for selected */}
              {showDescriptions && (hoveredCommunity === community.code || selectedCommunity === community.code) && (
                <div className="text-xs text-gray-600 leading-tight px-1">
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

      {/* Community Stats */}
      <div className="mt-8 text-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-4">
          <div className="p-3 bg-white rounded-lg shadow-sm">
            <div className="text-2xl font-bold" style={{ color: brandColors.primary }}>
              750+
            </div>
            <div className="text-xs text-gray-600">
              {language === 'pt' ? 'Membros Ativos' : 'Active Members'}
            </div>
          </div>
          <div className="p-3 bg-white rounded-lg shadow-sm">
            <div className="text-2xl font-bold" style={{ color: brandColors.primary }}>
              8
            </div>
            <div className="text-xs text-gray-600">
              {language === 'pt' ? 'Países Representados' : 'Countries Represented'}
            </div>
          </div>
          <div className="p-3 bg-white rounded-lg shadow-sm">
            <div className="text-2xl font-bold" style={{ color: brandColors.primary }}>
              50+
            </div>
            <div className="text-xs text-gray-600">
              {language === 'pt' ? 'Cidades do Reino Unido' : 'UK Cities'}
            </div>
          </div>
          <div className="p-3 bg-white rounded-lg shadow-sm">
            <div className="text-2xl font-bold" style={{ color: brandColors.primary }}>
              2K+
            </div>
            <div className="text-xs text-gray-600">
              {language === 'pt' ? 'Conexões Feitas' : 'Connections Made'}
            </div>
          </div>
        </div>
        
        <p className="text-sm text-gray-500">
          {language === 'pt' 
            ? 'Celebrando toda a diversidade da comunidade lusófona no Reino Unido'
            : 'Celebrating the full diversity of the Portuguese-speaking community in the UK'
          }
        </p>
      </div>
    </div>
  )
}