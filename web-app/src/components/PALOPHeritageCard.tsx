'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  HeartIcon, 
  ShareIcon, 
  InformationCircleIcon,
  ArrowRightIcon,
  SparklesIcon,
  GlobeAltIcon,
  MusicalNoteIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { useLanguage } from '@/context/LanguageContext'
import { useAriaAnnouncements, ARIA_MESSAGES } from '@/hooks/useAriaAnnouncements'
import { useFocusIndicator } from '@/hooks/useFocusManagement'

interface PALOPNation {
  id: string
  nameEn: string
  namePt: string
  flag: string
  colorTheme: string
  culturalHighlights: {
    en: string[]
    pt: string[]
  }
  description: {
    en: string
    pt: string
  }
  traditions: {
    music: string
    dance: string
    cuisine: string
  }
  communitySize: number
  isUserFavorite: boolean
}

interface PALOPHeritageCardProps {
  nation: PALOPNation
  onFavoriteToggle: (nationId: string) => void
  onLearnMore: (nationId: string) => void
  onConnect: (nationId: string) => void
  variant?: 'default' | 'compact' | 'featured'
  className?: string
}

export default function PALOPHeritageCard({
  nation,
  onFavoriteToggle,
  onLearnMore,
  onConnect,
  variant = 'default',
  className = ''
}: PALOPHeritageCardProps) {
  const { language } = useLanguage()
  const [isHovered, setIsHovered] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  
  // ARIA and Focus Management
  const { announcePolite } = useAriaAnnouncements()
  const { addFocusClasses } = useFocusIndicator()
  const cardRef = useRef<HTMLDivElement>(null)
  const favoriteButtonRef = useRef<HTMLButtonElement>(null)
  const learnMoreButtonRef = useRef<HTMLButtonElement>(null)
  const connectButtonRef = useRef<HTMLButtonElement>(null)

  const nationName = language === 'pt' ? nation.namePt : nation.nameEn
  const description = language === 'pt' ? nation.description.pt : nation.description.en
  const highlights = language === 'pt' ? nation.culturalHighlights.pt : nation.culturalHighlights.en

  const handleCardFocus = () => {
    announcePolite(ARIA_MESSAGES.palop.cardFocused, true)
    if (cardRef.current) {
      addFocusClasses(cardRef.current, 'card')
    }
  }

  const handleCardBlur = () => {
    if (cardRef.current) {
      cardRef.current.classList.remove('lusotown-card-focus', 'lusotown-focus-smooth')
    }
  }

  const handleFavoriteToggle = () => {
    onFavoriteToggle(nation.id)
    const message = nation.isUserFavorite
      ? ARIA_MESSAGES.events.favoriteRemoved
      : ARIA_MESSAGES.events.favoriteAdded
    announcePolite(message)
  }

  const handleLearnMore = () => {
    announcePolite({
      en: `Opening ${nationName} cultural information`,
      pt: `Abrindo informações culturais de ${nationName}`
    })
    onLearnMore(nation.id)
  }

  const handleConnect = () => {
    announcePolite({
      en: `Connecting with ${nationName} community`,
      pt: `Conectando com a comunidade de ${nationName}`
    })
    onConnect(nation.id)
  }

  const handleKeyNavigation = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleLearnMore()
    } else if (event.key === 'Tab') {
      // Let browser handle tab navigation
      announcePolite(ARIA_MESSAGES.palop.ctaAvailable)
    }
  }

  const shareNation = async () => {
    const shareData = {
      title: `${nationName} Heritage - LusoTown`,
      text: `Explore ${nationName} cultural heritage and connect with the community through LusoTown`,
      url: window.location.href
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
        announcePolite({
          en: `${nationName} heritage shared successfully`,
          pt: `Herança de ${nationName} partilhada com sucesso`
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(shareData.url)
      announcePolite({
        en: 'Link copied to clipboard',
        pt: 'Link copiado para área de transferência'
      })
    }
  }

  return (
    <motion.div
      ref={cardRef}
      className={`bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer focus:outline-none ${className}`}
      whileHover={{ y: -8, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onFocus={handleCardFocus}
      onBlur={handleCardBlur}
      onKeyDown={handleKeyNavigation}
      tabIndex={0}
      role="article"
      aria-labelledby={`palop-title-${nation.id}`}
      aria-describedby={`palop-description-${nation.id}`}
    >
      {/* Header with Flag and Name */}
      <div className={`${nation.colorTheme} p-6 text-white relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-2 right-4 w-3 h-3 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-4 left-6 w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-5xl" aria-hidden="true">{nation.flag}</div>
            <div>
              <h3 id={`palop-title-${nation.id}`} className="text-2xl font-bold mb-1">
                {nationName}
              </h3>
              <p className="text-white/90 text-sm">
                {language === 'pt' ? 'Nação Lusófona' : 'Portuguese-speaking Nation'}
              </p>
            </div>
          </div>

          {/* Favorite Button */}
          <button
            ref={favoriteButtonRef}
            onClick={(e) => {
              e.stopPropagation()
              handleFavoriteToggle()
            }}
            onFocus={() => {
              if (favoriteButtonRef.current) {
                addFocusClasses(favoriteButtonRef.current, 'button')
              }
            }}
            onBlur={() => {
              if (favoriteButtonRef.current) {
                favoriteButtonRef.current.classList.remove('lusotown-button-focus', 'lusotown-focus-smooth')
              }
            }}
            className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label={
              nation.isUserFavorite
                ? (language === 'pt' ? `Remover ${nationName} dos favoritos` : `Remove ${nationName} from favorites`)
                : (language === 'pt' ? `Adicionar ${nationName} aos favoritos` : `Add ${nationName} to favorites`)
            }
          >
            {nation.isUserFavorite ? (
              <HeartSolidIcon className="w-6 h-6 text-white" />
            ) : (
              <HeartIcon className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p id={`palop-description-${nation.id}`} className="text-gray-600 mb-4 leading-relaxed">
          {description}
        </p>

        {/* Cultural Highlights */}
        <div className="space-y-3 mb-6">
          <h4 className="font-semibold text-gray-900 flex items-center gap-2">
            <SparklesIcon className="w-5 h-5 text-amber-500" aria-hidden="true" />
            {language === 'pt' ? 'Destaques Culturais' : 'Cultural Highlights'}
          </h4>
          <div className="grid grid-cols-1 gap-2">
            {highlights.slice(0, 3).map((highlight, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                <div className="w-2 h-2 bg-primary-500 rounded-full" aria-hidden="true"></div>
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Traditions */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <MusicalNoteIcon className="w-5 h-5 text-primary-600 mx-auto mb-1" aria-hidden="true" />
            <p className="text-xs font-medium text-gray-900">{nation.traditions.music}</p>
            <p className="text-xs text-gray-500">
              {language === 'pt' ? 'Música' : 'Music'}
            </p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <GlobeAltIcon className="w-5 h-5 text-secondary-600 mx-auto mb-1" aria-hidden="true" />
            <p className="text-xs font-medium text-gray-900">{nation.traditions.dance}</p>
            <p className="text-xs text-gray-500">
              {language === 'pt' ? 'Dança' : 'Dance'}
            </p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <BookOpenIcon className="w-5 h-5 text-accent-600 mx-auto mb-1" aria-hidden="true" />
            <p className="text-xs font-medium text-gray-900">{nation.traditions.cuisine}</p>
            <p className="text-xs text-gray-500">
              {language === 'pt' ? 'Culinária' : 'Cuisine'}
            </p>
          </div>
        </div>

        {/* Community Size */}
        <div className="flex items-center justify-between mb-6 p-3 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl">
          <div className="flex items-center gap-2">
            <InformationCircleIcon className="w-5 h-5 text-blue-600" aria-hidden="true" />
            <span className="text-sm font-medium text-blue-900">
              {language === 'pt' ? 'Comunidade no Reino Unido' : 'UK Community'}
            </span>
          </div>
          <span className="text-lg font-bold text-green-700">
            {nation.communitySize.toLocaleString()}+
          </span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            ref={learnMoreButtonRef}
            onClick={handleLearnMore}
            onFocus={() => {
              if (learnMoreButtonRef.current) {
                addFocusClasses(learnMoreButtonRef.current, 'button')
              }
            }}
            onBlur={() => {
              if (learnMoreButtonRef.current) {
                learnMoreButtonRef.current.classList.remove('lusotown-button-focus', 'lusotown-focus-smooth')
              }
            }}
            className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold py-3 px-4 rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 flex items-center justify-center gap-2 min-h-[44px]"
            aria-label={
              language === 'pt' 
                ? `Aprender mais sobre a cultura de ${nationName}` 
                : `Learn more about ${nationName} culture`
            }
          >
            <BookOpenIcon className="w-5 h-5" aria-hidden="true" />
            {language === 'pt' ? 'Explorar Cultura' : 'Explore Culture'}
            <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
          </button>

          <div className="flex gap-2">
            <button
              ref={connectButtonRef}
              onClick={handleConnect}
              onFocus={() => {
                if (connectButtonRef.current) {
                  addFocusClasses(connectButtonRef.current, 'button')
                }
              }}
              onBlur={() => {
                if (connectButtonRef.current) {
                  connectButtonRef.current.classList.remove('lusotown-button-focus', 'lusotown-focus-smooth')
                }
              }}
              className="flex-1 bg-blue-100 text-blue-700 py-2 px-3 rounded-lg hover:bg-blue-200 transition-colors font-medium text-sm flex items-center justify-center gap-2 min-h-[44px]"
              aria-label={
                language === 'pt' 
                  ? `Conectar com a comunidade de ${nationName}` 
                  : `Connect with ${nationName} community`
              }
            >
              <GlobeAltIcon className="w-4 h-4" aria-hidden="true" />
              {language === 'pt' ? 'Conectar' : 'Connect'}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                shareNation()
              }}
              className="bg-green-100 text-green-700 py-2 px-3 rounded-lg hover:bg-green-200 transition-colors font-medium text-sm flex items-center justify-center gap-2 min-h-[44px] min-w-[44px]"
              aria-label={
                language === 'pt' 
                  ? `Partilhar informações sobre ${nationName}` 
                  : `Share information about ${nationName}`
              }
            >
              <ShareIcon className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Hover Effects */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Sample PALOP nations data for demonstration
export const PALOP_NATIONS: PALOPNation[] = [
  {
    id: 'portugal',
    nameEn: 'Portugal',
    namePt: 'Portugal',
    flag: '🇵🇹',
    colorTheme: 'bg-gradient-to-r from-green-600 to-red-600',
    culturalHighlights: {
      en: ['Fado music UNESCO heritage', 'Azulejo tile artistry', 'Port wine tradition'],
      pt: ['Música do Fado património da UNESCO', 'Arte dos azulejos', 'Tradição do vinho do Porto']
    },
    description: {
      en: 'The birthplace of Lusophone culture, Portugal offers rich traditions in music, art, and cuisine that continue to influence communities worldwide.',
      pt: 'O berço da cultura lusófona, Portugal oferece tradições ricas em música, arte e culinária que continuam a influenciar comunidades em todo o mundo.'
    },
    traditions: {
      music: 'Fado',
      dance: 'Vira',
      cuisine: 'Pastéis de nata'
    },
    communitySize: 400000,
    isUserFavorite: false
  },
  {
    id: 'brazil',
    nameEn: 'Brazil',
    namePt: 'Brasil',
    flag: '🇧🇷',
    colorTheme: 'bg-gradient-to-r from-green-500 to-yellow-500',
    culturalHighlights: {
      en: ['Carnival celebrations', 'Bossa Nova music', 'Capoeira martial art'],
      pt: ['Celebrações do Carnaval', 'Música Bossa Nova', 'Arte marcial Capoeira']
    },
    description: {
      en: 'The largest Portuguese-speaking nation, Brazil brings vibrant carnival culture, revolutionary music genres, and diverse culinary traditions.',
      pt: 'A maior nação de língua portuguesa, o Brasil traz uma cultura vibrante do carnaval, géneros musicais revolucionários e tradições culinárias diversas.'
    },
    traditions: {
      music: 'Samba',
      dance: 'Forró',
      cuisine: 'Feijoada'
    },
    communitySize: 95000,
    isUserFavorite: true
  },
  {
    id: 'cape-verde',
    nameEn: 'Cape Verde',
    namePt: 'Cabo Verde',
    flag: '🇨🇻',
    colorTheme: 'bg-gradient-to-r from-blue-600 to-cyan-500',
    culturalHighlights: {
      en: ['Morna music tradition', 'Coladeira dance', 'Atlantic island culture'],
      pt: ['Tradição musical da Morna', 'Dança Coladeira', 'Cultura das ilhas atlânticas']
    },
    description: {
      en: 'An archipelago nation with unique Creole culture, Cape Verde blends African and Portuguese influences in its distinctive musical and cultural traditions.',
      pt: 'Uma nação arquipélago com cultura crioula única, Cabo Verde mistura influências africanas e portuguesas nas suas tradições musicais e culturais distintivas.'
    },
    traditions: {
      music: 'Morna',
      dance: 'Coladeira',
      cuisine: 'Cachupa'
    },
    communitySize: 18000,
    isUserFavorite: false
  }
]