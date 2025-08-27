'use client'

import { useState, useEffect } from 'react'
import logger from '@/utils/logger'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Languages, 
  RefreshCw, 
  Volume2, 
  Copy, 
  Check,
  AlertCircle,
  Info,
  Globe,
  BookOpen,
  Sparkles
} from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { 
  PORTUGUESE_DIALECTS,
  TRANSLATION_QUALITY,
  CULTURAL_CONTEXTS,
  getDialectInfo,
  getTranslationQuality,
  translateIdiom,
  isPortugueseIdiom
} from '@/config/portuguese-translation'
import { PORTUGUESE_COLORS } from '@/config/brand'

interface TranslationResult {
  originalText: string
  translatedText: string
  sourceLanguage: string
  targetLanguage: string
  dialect?: string
  confidence: number
  detectedIdioms?: string[]
  culturalNotes?: string[]
  alternativeTranslations?: string[]
}

interface MessageTranslatorProps {
  originalMessage: string
  sourceLanguage?: string
  targetLanguage?: string
  dialect?: string
  showCulturalContext?: boolean
  enableVoicePlayback?: boolean
  onTranslationComplete?: (result: TranslationResult) => void
  className?: string
}

export default function MessageTranslator({
  originalMessage,
  sourceLanguage = 'auto',
  targetLanguage,
  dialect = 'pt-PT',
  showCulturalContext = true,
  enableVoicePlayback = true,
  onTranslationComplete,
  className = ''
}: MessageTranslatorProps) {
  const { language } = useLanguage()
  const [translation, setTranslation] = useState<TranslationResult | null>(null)
  const [isTranslating, setIsTranslating] = useState(false)
  const [showOriginal, setShowOriginal] = useState(true)
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isPlayingOriginal, setIsPlayingOriginal] = useState(false)
  const [isPlayingTranslated, setIsPlayingTranslated] = useState(false)

  const autoTargetLanguage = targetLanguage || (language === 'pt' ? 'en' : 'pt')
  const dialectInfo = getDialectInfo(dialect)

  const translations = {
    en: {
      translating: 'Translating...',
      showOriginal: 'Show original',
      showTranslation: 'Show translation',
      playOriginal: 'Play original text',
      playTranslated: 'Play translated text',
      copyOriginal: 'Copy original',
      copyTranslation: 'Copy translation',
      retranslate: 'Retranslate',
      confidence: 'Translation confidence',
      dialect: 'Detected dialect',
      culturalNote: 'Cultural context',
      idiomDetected: 'Portuguese idiom detected',
      alternativeTranslations: 'Alternative translations',
      translationError: 'Translation failed. Please try again.',
      copied: 'Copied!',
      excellent: 'Excellent translation quality',
      good: 'Good translation quality',
      fair: 'Fair translation quality - may need review',
      poor: 'Poor translation quality - manual review recommended',
      autoDetected: 'Auto-detected',
      formalContext: 'Formal Portuguese context',
      informalContext: 'Informal Portuguese context',
      regionalExpression: 'Regional Portuguese expression'
    },
    pt: {
      translating: 'Traduzindo...',
      showOriginal: 'Mostrar original',
      showTranslation: 'Mostrar tradução',
      playOriginal: 'Reproduzir texto original',
      playTranslated: 'Reproduzir tradução',
      copyOriginal: 'Copiar original',
      copyTranslation: 'Copiar tradução',
      retranslate: 'Traduzir novamente',
      confidence: 'Confiança da tradução',
      dialect: 'Dialeto detetado',
      culturalNote: 'Contexto cultural',
      idiomDetected: 'Expressão portuguesa detetada',
      alternativeTranslations: 'Traduções alternativas',
      translationError: 'Falha na tradução. Tente novamente.',
      copied: 'Copiado!',
      excellent: 'Qualidade excelente de tradução',
      good: 'Boa qualidade de tradução',
      fair: 'Qualidade razoável - pode precisar de revisão',
      poor: 'Qualidade fraca - revisão manual recomendada',
      autoDetected: 'Detetado automaticamente',
      formalContext: 'Contexto formal português',
      informalContext: 'Contexto informal português',
      regionalExpression: 'Expressão regional portuguesa'
    }
  }

  const t = translations[language]

  useEffect(() => {
    if (originalMessage.trim()) {
      translateMessage()
    }
  }, [originalMessage, autoTargetLanguage, dialect])

  const translateMessage = async () => {
    if (!originalMessage.trim()) return

    setIsTranslating(true)
    setError(null)

    try {
      // Simulate API call to translation service
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: originalMessage,
          source: sourceLanguage,
          target: autoTargetLanguage,
          dialect: dialect,
          includeCulturalContext: showCulturalContext
        })
      })

      if (!response.ok) {
        throw new Error('Translation service unavailable')
      }

      const result = await response.json()
      
      // Enhanced result with cultural analysis
      const enhancedResult: TranslationResult = {
        ...result,
        detectedIdioms: detectIdioms(originalMessage, dialect),
        culturalNotes: generateCulturalNotes(originalMessage, dialect),
        alternativeTranslations: result.alternatives || []
      }

      setTranslation(enhancedResult)
      onTranslationComplete?.(enhancedResult)

    } catch (error) {
      logger.error('Translation error:', error)
      setError(t.translationError)
      
      // Fallback: create basic translation result
      setTranslation({
        originalText: originalMessage,
        translatedText: originalMessage, // Fallback to original
        sourceLanguage: sourceLanguage,
        targetLanguage: autoTargetLanguage,
        dialect: dialect,
        confidence: 0.5,
        detectedIdioms: detectIdioms(originalMessage, dialect),
        culturalNotes: generateCulturalNotes(originalMessage, dialect)
      })
    } finally {
      setIsTranslating(false)
    }
  }

  const detectIdioms = (text: string, dialect: string): string[] => {
    const idioms: string[] = []
    
    if (isPortugueseIdiom(text, dialect)) {
      // Extract actual idioms from text
      const commonIdioms = [
        'saudade', 'que saudades', 'desenrasca', 'jeitinho', 
        'fixe', 'legal', 'bacano', 'tá ligado'
      ]
      
      commonIdioms.forEach(idiom => {
        if (text.toLowerCase().includes(idiom)) {
          idioms.push(idiom)
        }
      })
    }
    
    return idioms
  }

  const generateCulturalNotes = (text: string, dialect: string): string[] => {
    const notes: string[] = []
    const culturalContext = CULTURAL_CONTEXTS[dialectInfo.country.toLowerCase()]
    
    if (!culturalContext) return notes

    // Check for cultural markers
    culturalContext.culturalMarkers.forEach(marker => {
      if (text.toLowerCase().includes(marker)) {
        notes.push(`"${marker}" is a cultural reference from ${culturalContext.country}`)
      }
    })

    // Check for formality level
    const formalWords = ['senhor', 'senhora', 'vossa', 'vossemecê']
    const informalWords = ['tu', 'você', 'mano', 'cara']
    
    if (formalWords.some(word => text.toLowerCase().includes(word))) {
      notes.push(t.formalContext)
    } else if (informalWords.some(word => text.toLowerCase().includes(word))) {
      notes.push(t.informalContext)
    }

    return notes
  }

  const copyToClipboard = async (text: string, type: 'original' | 'translation') => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(type)
      setTimeout(() => setCopiedText(null), 2000)
    } catch (error) {
      logger.error('Copy failed:', error)
    }
  }

  const playText = async (text: string, isOriginal: boolean) => {
    if (!enableVoicePlayback || !('speechSynthesis' in window)) return

    const utterance = new SpeechSynthesisUtterance(text)
    
    if (isOriginal) {
      utterance.lang = dialect
      setIsPlayingOriginal(true)
      utterance.onend = () => setIsPlayingOriginal(false)
    } else {
      utterance.lang = autoTargetLanguage === 'pt' ? 'pt-PT' : 'en-US'
      setIsPlayingTranslated(true)
      utterance.onend = () => setIsPlayingTranslated(false)
    }

    utterance.rate = 0.9
    utterance.pitch = 1.0
    utterance.volume = 1.0

    speechSynthesis.speak(utterance)
  }

  const getQualityIndicator = (confidence: number) => {
    const quality = getTranslationQuality(confidence)
    return (
      <div className="flex items-center space-x-2">
        <span style={{ color: quality.color }}>{quality.icon}</span>
        <span className="text-sm text-gray-600">
          {confidence > 0 ? `${Math.round(confidence * 100)}%` : t.autoDetected}
        </span>
      </div>
    )
  }

  if (isTranslating) {
    return (
      <div className={`flex items-center justify-center p-4 ${className}`}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full mr-3"
          style={{ borderColor: PORTUGUESE_COLORS.primary }}
        />
        <span className="text-sm text-gray-600">{t.translating}</span>
      </div>
    )
  }

  if (!translation) return null

  return (
    <div className={`message-translator bg-white border border-gray-200 rounded-lg p-4 space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Languages className="w-5 h-5 text-primary-600" style={{ color: PORTUGUESE_COLORS.primary }} />
            <span className="font-medium text-gray-900">
              {dialectInfo.flag} {dialectInfo.name[language]} → {autoTargetLanguage === 'en' ? '🇬🇧 English' : '🇵🇹 Português'}
            </span>
          </div>
          
          {getQualityIndicator(translation.confidence)}
        </div>

        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowOriginal(!showOriginal)}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            {showOriginal ? t.showTranslation : t.showOriginal}
          </motion.button>

          <button
            onClick={translateMessage}
            className="p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg"
        >
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
        </motion.div>
      )}

      {/* Content Toggle */}
      <AnimatePresence mode="wait">
        {showOriginal ? (
          <motion.div
            key="original"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="space-y-3"
          >
            {/* Original Text */}
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Original</span>
                  <span className="text-xs px-2 py-0.5 bg-gray-200 rounded-full">
                    {dialectInfo.name[language]}
                  </span>
                </div>
                
                <div className="flex items-center space-x-1">
                  {enableVoicePlayback && (
                    <button
                      onClick={() => playText(translation.originalText, true)}
                      disabled={isPlayingOriginal}
                      className={`p-1 text-gray-600 hover:text-primary-600 hover:bg-gray-200 rounded transition-colors ${isPlayingOriginal ? 'animate-pulse' : ''}`}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  )}
                  
                  <button
                    onClick={() => copyToClipboard(translation.originalText, 'original')}
                    className="p-1 text-gray-600 hover:text-primary-600 hover:bg-gray-200 rounded transition-colors"
                  >
                    {copiedText === 'original' ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              
              <p className="text-gray-800 leading-relaxed">
                {translation.originalText}
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="translation"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="space-y-3"
          >
            {/* Translated Text */}
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">Translation</span>
                  <span className="text-xs px-2 py-0.5 bg-blue-200 rounded-full">
                    {autoTargetLanguage === 'en' ? 'English' : 'Português'}
                  </span>
                </div>
                
                <div className="flex items-center space-x-1">
                  {enableVoicePlayback && (
                    <button
                      onClick={() => playText(translation.translatedText, false)}
                      disabled={isPlayingTranslated}
                      className={`p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-200 rounded transition-colors ${isPlayingTranslated ? 'animate-pulse' : ''}`}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  )}
                  
                  <button
                    onClick={() => copyToClipboard(translation.translatedText, 'translation')}
                    className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-200 rounded transition-colors"
                  >
                    {copiedText === 'translation' ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              
              <p className="text-blue-900 leading-relaxed">
                {translation.translatedText}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cultural Context & Idioms */}
      {showCulturalContext && (translation.detectedIdioms?.length || translation.culturalNotes?.length) && (
        <div className="space-y-3">
          {/* Detected Idioms */}
          {translation.detectedIdioms && translation.detectedIdioms.length > 0 && (
            <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center space-x-2 mb-2">
                <BookOpen className="w-4 h-4 text-yellow-700" />
                <span className="text-sm font-medium text-yellow-800">{t.idiomDetected}</span>
              </div>
              
              <div className="space-y-1">
                {translation.detectedIdioms.map((idiom, index) => (
                  <div key={index} className="text-sm">
                    <span className="font-medium text-yellow-800">"{idiom}"</span>
                    <span className="text-yellow-700"> - {translateIdiom(idiom, dialect) || 'Regional expression'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cultural Notes */}
          {translation.culturalNotes && translation.culturalNotes.length > 0 && (
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2 mb-2">
                <Info className="w-4 h-4 text-green-700" />
                <span className="text-sm font-medium text-green-800">{t.culturalNote}</span>
              </div>
              
              <ul className="space-y-1 text-sm text-green-700">
                {translation.culturalNotes.map((note, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="w-1 h-1 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Alternative Translations */}
      {translation.alternativeTranslations && translation.alternativeTranslations.length > 0 && (
        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-2 mb-2">
            <RefreshCw className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">{t.alternativeTranslations}</span>
          </div>
          
          <div className="space-y-2">
            {translation.alternativeTranslations.slice(0, 3).map((alt, index) => (
              <div key={index} className="text-sm text-gray-600 p-2 bg-white rounded border border-gray-100">
                {alt}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Copy Confirmation */}
      <AnimatePresence>
        {copiedText && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex items-center justify-center p-2 bg-green-100 text-green-800 rounded-lg"
          >
            <Check className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">{t.copied}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}