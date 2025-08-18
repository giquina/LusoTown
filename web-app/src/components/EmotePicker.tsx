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
        className={`absolute ${position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'} right-0 z-50 
          bg-white rounded-xl shadow-xl border border-gray-200 w-80 max-h-96 overflow-hidden`}
      >
        {/* Header Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50">
          <button
            onClick={() => setActiveTab('reactions')}
            className={`flex-1 px-3 py-2 text-sm font-medium transition-colors ${
              activeTab === 'reactions'
                ? 'text-primary-600 border-b-2 border-primary-600 bg-white'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center justify-center gap-1">
              <HeartIcon className="w-4 h-4" />
              <span>{language === 'pt' ? 'Reações' : 'Reactions'}</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('emotes')}
            className={`flex-1 px-3 py-2 text-sm font-medium transition-colors ${
              activeTab === 'emotes'
                ? 'text-primary-600 border-b-2 border-primary-600 bg-white'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center justify-center gap-1">
              <FaceSmileIcon className="w-4 h-4" />
              <span>{language === 'pt' ? 'Emotes' : 'Emotes'}</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('regional')}
            className={`flex-1 px-3 py-2 text-sm font-medium transition-colors ${
              activeTab === 'regional'
                ? 'text-primary-600 border-b-2 border-primary-600 bg-white'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center justify-center gap-1">
              <span className="text-sm">🌍</span>
              <span>{language === 'pt' ? 'Regional' : 'Regional'}</span>
            </div>
          </button>
        </div>

        {/* Content */}
        <div className="p-3 max-h-72 overflow-y-auto">
          {/* Quick Reactions Tab */}
          {activeTab === 'reactions' && (
            <div>
              <div className="mb-3">
                <h4 className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                  {language === 'pt' ? 'Reações Rápidas' : 'Quick Reactions'}
                </h4>
                <div className="grid grid-cols-5 gap-2">
                  {QUICK_REACTIONS.map((emoji, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleReactionClick(emoji)}
                      className="aspect-square flex items-center justify-center text-2xl hover:bg-gray-100 
                        rounded-lg transition-colors p-2"
                    >
                      {emoji}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                  {language === 'pt' ? 'Reações Culturais' : 'Cultural Reactions'}
                </h4>
                <div className="grid grid-cols-5 gap-2">
                  {['🇵🇹', '🇧🇷', '⚽', '🎵', '🎉', '🍽️', '❤️', '👏', '🔥', '✨'].map((emoji, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleReactionClick(emoji)}
                      className="aspect-square flex items-center justify-center text-2xl hover:bg-gray-100 
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
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
                    className="aspect-square flex items-center justify-center hover:bg-gray-100 
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
                <h4 className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
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
                    className="aspect-square flex items-center justify-center hover:bg-gray-100 
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
        <div className="border-t border-gray-200 px-3 py-2 bg-gray-50">
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