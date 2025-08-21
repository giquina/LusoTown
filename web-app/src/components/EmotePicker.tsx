'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaceSmileIcon, HeartIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { 
  PORTUGUESE_EMOTES, 
  EMOTE_CATEGORIES, 
  QUICK_REACTIONS,
  getEmotesByCategory,
  getEmotesByRegion
} from '@/lib/portuguese-emotes'

interface EmotePickerProps {
  onEmoteSelect: (emoteCode: string) => void
  onReactionSelect: (emoji: string) => void
  userRegion: 'brazil' | 'portugal' | 'africa' | 'diaspora'
  isOpen: boolean
  onClose: () => void
  position?: 'top' | 'bottom'
}

export default function EmotePicker({ 
  onEmoteSelect, 
  onReactionSelect, 
  userRegion, 
  isOpen, 
  onClose,
  position = 'top'
}: EmotePickerProps) {
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState<'reactions' | 'emotes' | 'regional'>('reactions')
  const [selectedCategory, setSelectedCategory] = useState('cultural')
  const pickerRef = useRef<HTMLDivElement>(null)

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  const handleEmoteClick = (emoteCode: string) => {
    onEmoteSelect(emoteCode)
    onClose()
  }

  const handleReactionClick = (emoji: string) => {
    onReactionSelect(emoji)
    onClose()
  }

  const regionalEmotes = getEmotesByRegion(userRegion)
  const categoryEmotes = getEmotesByCategory(selectedCategory)

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        ref={pickerRef}
        initial={{ opacity: 0, scale: 0.9, y: position === 'top' ? 10 : -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: position === 'top' ? 10 : -10 }}
        className={`fixed sm:absolute ${position === 'top' ? 'bottom-4 sm:bottom-full sm:mb-2' : 'top-4 sm:top-full sm:mt-2'} 
          left-4 right-4 sm:left-auto sm:right-0 sm:w-80 z-50 
          bg-white rounded-xl shadow-xl border border-secondary-200 max-h-96 overflow-hidden`}
      >
        {/* Header Tabs - Mobile Optimized */}
        <div className="flex border-b border-secondary-200 bg-secondary-50">
          <button
            onClick={() => setActiveTab('reactions')}
            className={`flex-1 px-2 sm:px-3 py-3 sm:py-2 text-xs sm:text-sm font-medium transition-colors touch-manipulation ${
              activeTab === 'reactions'
                ? 'text-primary-600 border-b-2 border-primary-600 bg-white'
                : 'text-gray-500 hover:text-secondary-700 active:bg-secondary-100'
            }`}
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-1">
              <HeartIcon className="w-4 h-4" />
              <span className="hidden sm:inline">{language === 'pt' ? 'Reações' : 'Reactions'}</span>
              <span className="sm:hidden">{language === 'pt' ? 'Reações' : 'React'}</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('emotes')}
            className={`flex-1 px-2 sm:px-3 py-3 sm:py-2 text-xs sm:text-sm font-medium transition-colors touch-manipulation ${
              activeTab === 'emotes'
                ? 'text-primary-600 border-b-2 border-primary-600 bg-white'
                : 'text-gray-500 hover:text-secondary-700 active:bg-secondary-100'
            }`}
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-1">
              <FaceSmileIcon className="w-4 h-4" />
              <span>{language === 'pt' ? 'Emotes' : 'Emotes'}</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('regional')}
            className={`flex-1 px-2 sm:px-3 py-3 sm:py-2 text-xs sm:text-sm font-medium transition-colors touch-manipulation ${
              activeTab === 'regional'
                ? 'text-primary-600 border-b-2 border-primary-600 bg-white'
                : 'text-gray-500 hover:text-secondary-700 active:bg-secondary-100'
            }`}
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-1">
              <span className="text-sm">🌍</span>
              <span className="hidden sm:inline">{language === 'pt' ? 'Regional' : 'Regional'}</span>
              <span className="sm:hidden">{language === 'pt' ? 'Região' : 'Region'}</span>
            </div>
          </button>
        </div>

        {/* Content */}
        <div className="p-3 max-h-72 overflow-y-auto">
          {/* Quick Reactions Tab */}
          {activeTab === 'reactions' && (
            <div>
              <div className="mb-3">
                <h4 className="text-xs font-semibold text-secondary-600 mb-2 uppercase tracking-wide">
                  {language === 'pt' ? 'Reações Rápidas' : 'Quick Reactions'}
                </h4>
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 sm:gap-2">
                  {QUICK_REACTIONS.map((emoji, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleReactionClick(emoji)}
                      className="aspect-square flex items-center justify-center text-2xl sm:text-2xl hover:bg-secondary-100 
                        active:bg-secondary-200 rounded-lg transition-colors p-3 sm:p-2 touch-manipulation"
                    >
                      {emoji}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-secondary-600 mb-2 uppercase tracking-wide">
                  {language === 'pt' ? 'Reações Culturais' : 'Cultural Reactions'}
                </h4>
                <div className="grid grid-cols-5 gap-2">
                  {['🇵🇹', '🇧🇷', '⚽', '🎵', '🎉', '🍽️', '❤️', '👏', '🔥', '✨'].map((emoji, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleReactionClick(emoji)}
                      className="aspect-square flex items-center justify-center text-2xl hover:bg-secondary-100 
                        rounded-lg transition-colors p-2"
                    >
                      {emoji}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Portuguese Emotes Tab */}
          {activeTab === 'emotes' && (
            <div>
              {/* Category Selector */}
              <div className="mb-3">
                <div className="flex gap-1 overflow-x-auto pb-2">
                  {Object.entries(EMOTE_CATEGORIES).map(([key, category]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedCategory(key)}
                      className={`flex-shrink-0 px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                        selectedCategory === key
                          ? 'bg-primary-100 text-primary-700'
                          : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
                      }`}
                    >
                      <span className="mr-1">{category.icon}</span>
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Emotes Grid */}
              <div className="grid grid-cols-6 gap-2">
                {categoryEmotes.map((emote, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleEmoteClick(emote.code)}
                    className="aspect-square flex items-center justify-center hover:bg-secondary-100 
                      rounded-lg transition-colors p-1"
                    title={emote.culturalContext}
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-100 to-secondary-100 
                      rounded-full flex items-center justify-center text-sm">
                      {emote.code.replace(/:/g, '')}
                    </div>
                  </motion.button>
                ))}
              </div>

              {categoryEmotes.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-sm">
                    {language === 'pt' 
                      ? 'Nenhum emote nesta categoria ainda'
                      : 'No emotes in this category yet'
                    }
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Regional Emotes Tab */}
          {activeTab === 'regional' && (
            <div>
              <div className="mb-3">
                <h4 className="text-xs font-semibold text-secondary-600 mb-2 uppercase tracking-wide">
                  {language === 'pt' 
                    ? `Emotes Regionais - ${userRegion === 'brazil' ? 'Brasil' : 
                        userRegion === 'portugal' ? 'Portugal' : 
                        userRegion === 'africa' ? 'África' : 'Diáspora'}`
                    : `Regional Emotes - ${userRegion}`
                  }
                </h4>
              </div>

              <div className="grid grid-cols-6 gap-2">
                {regionalEmotes.map((emote, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleEmoteClick(emote.code)}
                    className="aspect-square flex items-center justify-center hover:bg-secondary-100 
                      rounded-lg transition-colors p-1"
                    title={emote.culturalContext}
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-100 to-secondary-100 
                      rounded-full flex items-center justify-center text-sm">
                      {emote.code.replace(/:/g, '')}
                    </div>
                  </motion.button>
                ))}
              </div>

              {regionalEmotes.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-sm">
                    {language === 'pt' 
                      ? 'Nenhum emote regional disponível'
                      : 'No regional emotes available'
                    }
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-secondary-200 px-3 py-2 bg-secondary-50">
          <p className="text-xs text-gray-500 text-center">
            {language === 'pt' 
              ? 'Emotes culturais portugueses • LusoTown'
              : 'Portuguese Cultural Emotes • LusoTown'
            }
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}