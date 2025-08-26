'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Smile, 
  Heart, 
  Globe, 
  MessageCircle, 
  Flag,
  Book,
  Clock,
  Sparkles,
  Volume2,
  Copy,
  Search,
  ChevronDown,
  X
} from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { 
  PORTUGUESE_EMOJI_PACKS,
  CULTURAL_EXPRESSIONS,
  GREETING_TEMPLATES,
  FAREWELL_TEMPLATES,
  PORTUGUESE_REACTIONS,
  getEmojiPackForCountry,
  getGreetingForContext,
  getTimeBasedGreeting,
  getCulturalExpressionsByRegion,
  searchEmojis
} from '@/config/portuguese-emojis'
import { PORTUGUESE_COLORS } from '@/config/brand'

interface PortugueseCommunicationPanelProps {
  onSelectExpression: (text: string, emoji?: string) => void
  preferredCountry?: string
  preferredFormality?: 'formal' | 'casual'
  showEmojiPacks?: boolean
  showGreetings?: boolean
  showExpressions?: boolean
  className?: string
}

export default function PortugueseCommunicationPanel({
  onSelectExpression,
  preferredCountry = 'Portugal',
  preferredFormality = 'casual',
  showEmojiPacks = true,
  showGreetings = true,
  showExpressions = true,
  className = ''
}: PortugueseCommunicationPanelProps) {
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState<'emojis' | 'greetings' | 'expressions' | 'reactions'>('emojis')
  const [selectedCountryPack, setSelectedCountryPack] = useState('portugal')
  const [searchQuery, setSearchQuery] = useState('')
  const [showCountrySelector, setShowCountrySelector] = useState(false)
  const [reactionCategory, setReactionCategory] = useState<keyof typeof PORTUGUESE_REACTIONS>('agreement')

  const translations = {
    en: {
      title: 'Portuguese Communication',
      emojis: 'Cultural Emojis',
      greetings: 'Greetings',
      expressions: 'Expressions',
      reactions: 'Quick Reactions',
      search: 'Search expressions...',
      selectCountry: 'Select country pack',
      timeBasedGreeting: 'Time-based greeting',
      culturalContext: 'Cultural context',
      formalGreeting: 'Formal greeting',
      casualGreeting: 'Casual greeting',
      copyExpression: 'Copy expression',
      playAudio: 'Play pronunciation',
      usage: 'Usage',
      meaning: 'Meaning',
      region: 'Region',
      formality: 'Formality',
      agreement: 'Agreement',
      excitement: 'Excitement',
      empathy: 'Empathy',
      surprise: 'Surprise',
      traditional: 'Traditional',
      modern: 'Modern',
      noResults: 'No results found'
    },
    pt: {
      title: 'Comunicação Portuguesa',
      emojis: 'Emojis Culturais',
      greetings: 'Saudações',
      expressions: 'Expressões',
      reactions: 'Reações Rápidas',
      search: 'Pesquisar expressões...',
      selectCountry: 'Selecionar país',
      timeBasedGreeting: 'Saudação por hora',
      culturalContext: 'Contexto cultural',
      formalGreeting: 'Saudação formal',
      casualGreeting: 'Saudação casual',
      copyExpression: 'Copiar expressão',
      playAudio: 'Reproduzir pronúncia',
      usage: 'Uso',
      meaning: 'Significado',
      region: 'Região',
      formality: 'Formalidade',
      agreement: 'Concordância',
      excitement: 'Entusiasmo',
      empathy: 'Empatia',
      surprise: 'Surpresa',
      traditional: 'Tradicional',
      modern: 'Moderno',
      noResults: 'Nenhum resultado encontrado'
    }
  }

  const t = translations[language]
  const countryMap = ['portugal', 'brazil', 'capeverde', 'angola']
  const regionCodes: Record<string, string> = {
    portugal: 'PT',
    brazil: 'BR',
    capeverde: 'CV',
    angola: 'AO'
  }

  const playPronunciation = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = selectedCountryPack === 'brazil' ? 'pt-BR' : 'pt-PT'
      utterance.rate = 0.8
      speechSynthesis.speak(utterance)
    }
  }

  const getTimeOfDay = (): 'morning' | 'afternoon' | 'evening' => {
    const hour = new Date().getHours()
    if (hour < 12) return 'morning'
    if (hour < 18) return 'afternoon'
    return 'evening'
  }

  const filteredEmojis = searchQuery 
    ? searchEmojis(searchQuery)
    : PORTUGUESE_EMOJI_PACKS[selectedCountryPack]?.emojis || []

  const filteredExpressions = searchQuery
    ? CULTURAL_EXPRESSIONS.filter(expr => 
        expr.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        expr.meaning.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : getCulturalExpressionsByRegion(regionCodes[selectedCountryPack])

  return (
    <div className={`portuguese-communication-panel bg-white rounded-lg shadow-lg border border-gray-200 ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center text-white"
              style={{ backgroundColor: PORTUGUESE_COLORS.primary }}
            >
              <Globe className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{t.title}</h3>
          </div>

          {/* Country Selector */}
          <div className="relative">
            <button
              onClick={() => setShowCountrySelector(!showCountrySelector)}
              className="flex items-center space-x-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <span>{PORTUGUESE_EMOJI_PACKS[selectedCountryPack]?.flag}</span>
              <span className="text-sm font-medium">
                {PORTUGUESE_EMOJI_PACKS[selectedCountryPack]?.country}
              </span>
              <ChevronDown className="w-4 h-4" />
            </button>

            <AnimatePresence>
              {showCountrySelector && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20"
                >
                  {countryMap.map((countryKey) => {
                    const pack = PORTUGUESE_EMOJI_PACKS[countryKey]
                    return (
                      <button
                        key={countryKey}
                        onClick={() => {
                          setSelectedCountryPack(countryKey)
                          setShowCountrySelector(false)
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-3"
                      >
                        <span>{pack.flag}</span>
                        <div>
                          <div className="font-medium text-gray-900">{pack.country}</div>
                          <div className="text-xs text-gray-500">{pack.description}</div>
                        </div>
                      </button>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-3 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={t.search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200">
        {[
          { key: 'emojis', label: t.emojis, icon: Smile, show: showEmojiPacks },
          { key: 'greetings', label: t.greetings, icon: MessageCircle, show: showGreetings },
          { key: 'expressions', label: t.expressions, icon: Book, show: showExpressions },
          { key: 'reactions', label: t.reactions, icon: Heart, show: true }
        ].filter(tab => tab.show).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`
              flex-1 flex items-center justify-center space-x-2 py-3 px-4 text-sm font-medium transition-colors
              ${activeTab === tab.key
                ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }
            `}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="p-4 max-h-96 overflow-y-auto">
        <AnimatePresence mode="wait">
          {/* Emojis Tab */}
          {activeTab === 'emojis' && (
            <motion.div
              key="emojis"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {filteredEmojis.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {filteredEmojis.map((emojiItem, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onSelectExpression(emojiItem.name, emojiItem.emoji)}
                      className="p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 text-left transition-colors group"
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-2xl">{emojiItem.emoji}</span>
                        <span className="font-medium text-gray-900 text-sm">{emojiItem.name}</span>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {emojiItem.description}
                      </p>
                      {emojiItem.cultural_significance && (
                        <div className="mt-2 flex items-center space-x-1">
                          <Sparkles className="w-3 h-3 text-primary-600" />
                          <span className="text-xs text-primary-700">
                            {t.culturalContext}
                          </span>
                        </div>
                      )}
                      <div className="mt-2 flex flex-wrap gap-1">
                        {emojiItem.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-0.5 bg-white text-xs text-gray-500 rounded-full border"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Smile className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>{t.noResults}</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Greetings Tab */}
          {activeTab === 'greetings' && (
            <motion.div
              key="greetings"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {/* Time-based Greeting */}
              <div className="p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg border border-primary-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-primary-600" />
                    <div>
                      <h4 className="font-medium text-primary-900">{t.timeBasedGreeting}</h4>
                      <p className="text-sm text-primary-700">
                        {getTimeBasedGreeting(regionCodes[selectedCountryPack]).text}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const greeting = getTimeBasedGreeting(regionCodes[selectedCountryPack])
                      onSelectExpression(greeting.text, greeting.emoji)
                    }}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    style={{ backgroundColor: PORTUGUESE_COLORS.primary }}
                  >
                    <span className="text-2xl mr-2">
                      {getTimeBasedGreeting(regionCodes[selectedCountryPack]).emoji}
                    </span>
                    {t.usage}
                  </button>
                </div>
              </div>

              {/* Greeting Categories */}
              <div className="space-y-3">
                {[
                  { type: 'formal', templates: GREETING_TEMPLATES.filter(g => g.formality === 'formal' && g.region.includes(regionCodes[selectedCountryPack])) },
                  { type: 'casual', templates: GREETING_TEMPLATES.filter(g => g.formality === 'casual' && g.region.includes(regionCodes[selectedCountryPack])) }
                ].map(({ type, templates }) => (
                  <div key={type}>
                    <h5 className="font-medium text-gray-900 mb-2 capitalize">
                      {type === 'formal' ? t.formalGreeting : t.casualGreeting}
                    </h5>
                    <div className="space-y-2">
                      {templates.map((template, index) => (
                        <motion.button
                          key={template.id}
                          whileHover={{ scale: 1.01 }}
                          onClick={() => onSelectExpression(template.text, template.emoji)}
                          className="w-full p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-left group transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <span className="text-xl">{template.emoji}</span>
                              <div>
                                <p className="font-medium text-gray-900">{template.text}</p>
                                <p className="text-sm text-gray-600">{template.context}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  playPronunciation(template.text)
                                }}
                                className="p-1 text-gray-400 hover:text-primary-600 rounded"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  navigator.clipboard.writeText(template.text)
                                }}
                                className="p-1 text-gray-400 hover:text-primary-600 rounded"
                              >
                                <Copy className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Farewell Templates */}
              <div>
                <h5 className="font-medium text-gray-900 mb-2">Despedidas</h5>
                <div className="space-y-2">
                  {FAREWELL_TEMPLATES
                    .filter(template => template.region.includes(regionCodes[selectedCountryPack]))
                    .slice(0, 3)
                    .map((template) => (
                    <motion.button
                      key={template.id}
                      whileHover={{ scale: 1.01 }}
                      onClick={() => onSelectExpression(template.text, template.emoji)}
                      className="w-full p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-left group transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{template.emoji}</span>
                        <div>
                          <p className="font-medium text-gray-900">{template.text}</p>
                          <p className="text-sm text-gray-600">{template.context}</p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Expressions Tab */}
          {activeTab === 'expressions' && (
            <motion.div
              key="expressions"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3"
            >
              {filteredExpressions.length > 0 ? (
                filteredExpressions.map((expression, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => onSelectExpression(expression.text, expression.emoji)}
                    className="w-full p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-left group transition-colors"
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl flex-shrink-0">{expression.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <p className="font-medium text-gray-900">{expression.text}</p>
                          <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">
                            {expression.formality}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{expression.meaning}</p>
                        <p className="text-xs text-gray-500">{expression.usage_context}</p>
                        <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                          <span>📍 {expression.region.join(', ')}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            playPronunciation(expression.text)
                          }}
                          className="p-1 text-gray-400 hover:text-primary-600 rounded"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            navigator.clipboard.writeText(expression.text)
                          }}
                          className="p-1 text-gray-400 hover:text-primary-600 rounded"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.button>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Book className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>{t.noResults}</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Reactions Tab */}
          {activeTab === 'reactions' && (
            <motion.div
              key="reactions"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {/* Category Selector */}
              <div className="flex space-x-2 mb-4">
                {Object.keys(PORTUGUESE_REACTIONS).map((category) => (
                  <button
                    key={category}
                    onClick={() => setReactionCategory(category as keyof typeof PORTUGUESE_REACTIONS)}
                    className={`
                      px-3 py-1 rounded-full text-sm font-medium transition-colors
                      ${reactionCategory === category
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }
                    `}
                    style={reactionCategory === category ? { backgroundColor: PORTUGUESE_COLORS.primary } : {}}
                  >
                    {t[category as keyof typeof t]}
                  </button>
                ))}
              </div>

              {/* Reaction Items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PORTUGUESE_REACTIONS[reactionCategory].map((reaction, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelectExpression(reaction.text, reaction.emoji)}
                    className="p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-left group transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{reaction.emoji}</span>
                      <div>
                        <p className="font-medium text-gray-900">{reaction.text}</p>
                        <p className="text-sm text-gray-600">{reaction.meaning}</p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}