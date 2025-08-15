'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChatBubbleLeftRightIcon,
  ArrowPathIcon,
  ClipboardDocumentIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { useNetworking } from '@/context/NetworkingContext'

export default function ConversationStarters() {
  const { language } = useLanguage()
  const isPortuguese = language === 'pt'
  const { getConversationStarters } = useNetworking()
  
  const [currentStarter, setCurrentStarter] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<string>()
  const [showCopyFeedback, setShowCopyFeedback] = useState(false)

  const starters = getConversationStarters(selectedCategory)
  const categories = [
    { value: undefined, label: isPortuguese ? 'Todas' : 'All', icon: '💬' },
    { value: 'cultural', label: isPortuguese ? 'Cultural' : 'Cultural', icon: '🎭' },
    { value: 'events', label: isPortuguese ? 'Eventos' : 'Events', icon: '🎉' },
    { value: 'professional', label: isPortuguese ? 'Profissional' : 'Professional', icon: '💼' },
    { value: 'personal', label: isPortuguese ? 'Pessoal' : 'Personal', icon: '❤️' }
  ]

  const getNextStarter = () => {
    setCurrentStarter((prev) => (prev + 1) % starters.length)
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setShowCopyFeedback(true)
      setTimeout(() => setShowCopyFeedback(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  if (starters.length === 0) {
    return null
  }

  const starter = starters[currentStarter]
  const starterText = isPortuguese ? starter.text_pt : starter.text_en

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg">
          <ChatBubbleLeftRightIcon className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">
          {isPortuguese ? 'Quebra-Gelos' : 'Conversation Starters'}
        </h3>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((category) => (
          <button
            key={category.value || 'all'}
            onClick={() => {
              setSelectedCategory(category.value)
              setCurrentStarter(0)
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1 ${
              selectedCategory === category.value
                ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span>{category.icon}</span>
            {category.label}
          </button>
        ))}
      </div>

      {/* Conversation Starter Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${selectedCategory}-${currentStarter}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-4 mb-4"
        >
          <div className="flex items-start justify-between mb-3">
            <span className="text-xs font-medium text-primary-600 bg-white/70 px-2 py-1 rounded-full">
              {starter.context}
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => copyToClipboard(starterText)}
                className="p-1.5 bg-white/70 hover:bg-white/90 rounded-lg transition-colors relative"
                title={isPortuguese ? 'Copiar' : 'Copy'}
              >
                <ClipboardDocumentIcon className="w-4 h-4 text-gray-600" />
                <AnimatePresence>
                  {showCopyFeedback && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute -top-8 -right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap"
                    >
                      {isPortuguese ? 'Copiado!' : 'Copied!'}
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
          
          <p className="text-gray-800 font-medium leading-relaxed">
            "{starterText}"
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-500">
          {currentStarter + 1} {isPortuguese ? 'de' : 'of'} {starters.length}
        </div>
        
        <button
          onClick={getNextStarter}
          className="flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
        >
          <ArrowPathIcon className="w-4 h-4" />
          {isPortuguese ? 'Próximo' : 'Next'}
        </button>
      </div>

      {/* Helper Text */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-600">
          💡 {isPortuguese 
            ? 'Dica: Use estes quebra-gelos para iniciar conversas significativas com as suas conexões portuguesas.'
            : 'Tip: Use these icebreakers to start meaningful conversations with your Portuguese connections.'
          }
        </p>
      </div>
    </div>
  )
}