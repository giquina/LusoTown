'use client'

/**
 * PortugueseVoiceAssistant.tsx
 * AI Voice Assistant for Portuguese Speakers
 * 
 * Advanced voice AI system with Portuguese voice recognition,
 * cultural context understanding, and bilingual response capabilities.
 * Designed specifically for the Portuguese diaspora community in London.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import {
  MicrophoneIcon,
  SpeakerWaveIcon,
  XMarkIcon,
  QuestionMarkCircleIcon,
  ChatBubbleLeftRightIcon,
  HeartIcon,
  BookOpenIcon,
  MapPinIcon,
  MusicalNoteIcon,
  AcademicCapIcon,
  BuildingStorefrontIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline'
import { MicrophoneIcon as MicrophoneSolid, SpeakerWaveIcon as SpeakerSolid } from '@heroicons/react/24/solid'

// Voice Assistant Configuration
interface VoiceConfig {
  language: 'pt-PT' | 'pt-BR' | 'en-GB' | 'en-US'
  recognition: {
    continuous: boolean
    interimResults: boolean
    maxAlternatives: number
  }
  synthesis: {
    voice: string
    rate: number
    pitch: number
    volume: number
  }
}

interface VoiceSession {
  id: string
  startTime: Date
  messages: VoiceMessage[]
  userProfile?: PortugueseUserProfile
  context: ConversationContext
  currentTopic?: string
  emotionalState?: 'neutral' | 'saudade' | 'excited' | 'confused' | 'nostalgic'
}

interface VoiceMessage {
  id: string
  type: 'user' | 'assistant'
  content: string
  originalLanguage: 'pt' | 'en'
  translation?: string
  confidence: number
  timestamp: Date
  audioUrl?: string
  emotion?: string
  culturalContext?: string[]
}

interface PortugueseUserProfile {
  region: 'norte' | 'centro' | 'lisboa' | 'alentejo' | 'algarve' | 'madeira' | 'azores'
  dialect: 'continental' | 'brazilian' | 'african'
  generationInUK: number
  preferredLanguage: 'pt' | 'en' | 'both'
  culturalInterests: string[]
  saudadeLevel: number
}

interface ConversationContext {
  topic: string
  culturalReferences: string[]
  previousQuestions: string[]
  userIntent: 'information' | 'cultural_guidance' | 'emotional_support' | 'practical_help' | 'social_connection'
  sessionDepth: number
}

interface AIResponse {
  text: string
  textPt: string
  culturalContext: string
  emotionalTone: 'supportive' | 'informative' | 'empathetic' | 'encouraging' | 'nostalgic'
  followUpSuggestions: string[]
  relatedTopics: string[]
  confidence: number
}

// Portuguese Cultural Knowledge Base for Voice Assistant
const CULTURAL_KNOWLEDGE = {
  greetings: {
    pt: ['Olá', 'Bom dia', 'Boa tarde', 'Boa noite', 'Como está?', 'Tudo bem?'],
    en: ['Hello', 'Good morning', 'Good afternoon', 'Good evening', 'How are you?', 'Everything okay?']
  },
  culturalTopics: {
    saudade: {
      keywords: ['saudade', 'homesick', 'missing home', 'longing', 'nostalgia'],
      responses: [
        'I understand the deep feeling of saudade. It\'s that unique Portuguese emotion that connects us to our homeland.',
        'Saudade is beautiful and painful at the same time. Would you like to talk about what triggers it for you?'
      ]
    },
    food: {
      keywords: ['comida', 'food', 'bacalhau', 'pastéis de nata', 'francesinha', 'cozido'],
      responses: [
        'Portuguese food carries so many memories! What dish makes you feel most connected to home?',
        'I can help you find authentic Portuguese ingredients in London or share traditional recipes.'
      ]
    },
    music: {
      keywords: ['fado', 'música', 'music', 'amália', 'guitarrada'],
      responses: [
        'Fado touches the Portuguese soul like no other music. Do you have a favorite fadista?',
        'Portuguese music has such emotional depth. Would you like recommendations based on your mood?'
      ]
    }
  },
  expressions: {
    pt: {
      'desenrascanço': 'The Portuguese art of finding creative solutions to problems',
      'sobremesa': 'That wonderful time after a meal when family gathers and talks',
      'ter saudades': 'To miss someone or something deeply, with love and longing'
    }
  }
}

const VOICE_ASSISTANT_CAPABILITIES = [
  {
    icon: QuestionMarkCircleIcon,
    title: 'Cultural Questions',
    titlePt: 'Perguntas Culturais',
    description: 'Ask about Portuguese traditions, customs, and cultural practices',
    examples: ['What is saudade?', 'How do I explain Portuguese culture to my British friends?']
  },
  {
    icon: MapPinIcon,
    title: 'London Portuguese Guide',
    titlePt: 'Guia Português de Londres',
    description: 'Find Portuguese shops, restaurants, and community events in London',
    examples: ['Where can I find good pastéis de nata?', 'Portuguese churches in London?']
  },
  {
    icon: HeartIcon,
    title: 'Emotional Support',
    titlePt: 'Apoio Emocional',
    description: 'Get understanding and support for homesickness and cultural adaptation',
    examples: ['I\'m feeling very homesick today', 'How to deal with saudade?']
  },
  {
    icon: MusicalNoteIcon,
    title: 'Music & Arts',
    titlePt: 'Música e Artes',
    description: 'Discover Portuguese music, literature, and cultural arts',
    examples: ['Recommend some fado music', 'Tell me about Portuguese poets']
  },
  {
    icon: AcademicCapIcon,
    title: 'Language Help',
    titlePt: 'Ajuda com Idiomas',
    description: 'Practice Portuguese, learn cultural expressions, translate concepts',
    examples: ['How do I say this in Portuguese?', 'What does "desenrascanço" mean?']
  },
  {
    icon: BuildingStorefrontIcon,
    title: 'Business Guidance',
    titlePt: 'Orientação Empresarial',
    description: 'Portuguese business culture, networking, and professional advice',
    examples: ['Portuguese business etiquette', 'How to network with Portuguese professionals?']
  }
]

export default function PortugueseVoiceAssistant() {
  const { t, language } = useLanguage()
  
  // Voice Assistant State
  const [isOpen, setIsOpen] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [currentSession, setCurrentSession] = useState<VoiceSession | null>(null)
  const [transcript, setTranscript] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [voiceSupported, setVoiceSupported] = useState(false)
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null)
  const [userProfile, setUserProfile] = useState<PortugueseUserProfile | null>(null)

  // Refs
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null)
  const sessionRef = useRef<string | null>(null)

  // Check for voice support and initialize
  useEffect(() => {
    const checkVoiceSupport = () => {
      const hasRecognition = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window
      const hasSynthesis = 'speechSynthesis' in window
      
      setVoiceSupported(hasRecognition && hasSynthesis)
      
      if (hasSynthesis) {
        speechSynthesisRef.current = window.speechSynthesis
        
        // Load voices when available
        const loadVoices = () => {
          const voices = speechSynthesisRef.current?.getVoices() || []
          const portugueseVoice = voices.find(voice => 
            voice.lang.startsWith('pt') && voice.name.includes('Portuguese')
          ) || voices.find(voice => voice.lang.startsWith('pt'))
          
          if (portugueseVoice) {
            setSelectedVoice(portugueseVoice)
          }
        }
        
        loadVoices()
        speechSynthesisRef.current.addEventListener('voiceschanged', loadVoices)
      }
    }
    
    checkVoiceSupport()
  }, [])

  // Initialize voice recognition
  const initializeRecognition = useCallback(() => {
    if (!voiceSupported) return null

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    
    recognition.continuous = false
    recognition.interimResults = true
    recognition.maxAlternatives = 1
    recognition.lang = language === 'pt' ? 'pt-PT' : 'en-GB'
    
    recognition.onstart = () => {
      setIsListening(true)
    }
    
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const current = event.resultIndex
      const transcript = event.results[current][0].transcript
      const confidence = event.results[current][0].confidence
      
      setTranscript(transcript)
      
      if (event.results[current].isFinal) {
        handleUserInput(transcript, confidence)
      }
    }
    
    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error)
      setIsListening(false)
    }
    
    recognition.onend = () => {
      setIsListening(false)
    }
    
    return recognition
  }, [voiceSupported, language])

  // Start new voice session
  const startVoiceSession = useCallback(() => {
    const sessionId = `voice-session-${Date.now()}`
    sessionRef.current = sessionId
    
    const newSession: VoiceSession = {
      id: sessionId,
      startTime: new Date(),
      messages: [],
      userProfile,
      context: {
        topic: 'general',
        culturalReferences: [],
        previousQuestions: [],
        userIntent: 'information',
        sessionDepth: 0
      }
    }
    
    setCurrentSession(newSession)
    setIsOpen(true)
    
    // Welcome message
    const welcomeMessage = language === 'pt' 
      ? 'Olá! Sou o seu assistente de voz português. Como posso ajudá-lo hoje?'
      : 'Hello! I\'m your Portuguese voice assistant. How can I help you today?'
    
    speakMessage(welcomeMessage)
  }, [userProfile, language])

  // Handle user voice input
  const handleUserInput = async (transcript: string, confidence: number) => {
    if (!currentSession) return
    
    setIsProcessing(true)
    
    // Add user message to session
    const userMessage: VoiceMessage = {
      id: `msg-${Date.now()}`,
      type: 'user',
      content: transcript,
      originalLanguage: detectLanguage(transcript),
      confidence,
      timestamp: new Date()
    }
    
    // Update session with user message
    const updatedSession = {
      ...currentSession,
      messages: [...currentSession.messages, userMessage],
      context: {
        ...currentSession.context,
        sessionDepth: currentSession.context.sessionDepth + 1
      }
    }
    
    setCurrentSession(updatedSession)
    
    // Process user input and generate response
    const aiResponse = await generateAIResponse(transcript, updatedSession)
    
    // Add AI response to session
    const assistantMessage: VoiceMessage = {
      id: `msg-${Date.now()}-ai`,
      type: 'assistant',
      content: aiResponse.text,
      originalLanguage: language,
      translation: aiResponse.textPt,
      confidence: aiResponse.confidence,
      timestamp: new Date(),
      culturalContext: [aiResponse.culturalContext]
    }
    
    const finalSession = {
      ...updatedSession,
      messages: [...updatedSession.messages, assistantMessage]
    }
    
    setCurrentSession(finalSession)
    
    // Speak the response
    const responseText = language === 'pt' ? aiResponse.textPt : aiResponse.text
    speakMessage(responseText)
    
    setIsProcessing(false)
  }

  // Generate AI response based on Portuguese cultural context
  const generateAIResponse = async (input: string, session: VoiceSession): Promise<AIResponse> => {
    const lowerInput = input.toLowerCase()
    
    // Detect cultural topics
    let culturalTopic = ''
    let emotionalTone: AIResponse['emotionalTone'] = 'informative'
    
    // Saudade detection
    if (lowerInput.includes('saudade') || lowerInput.includes('homesick') || lowerInput.includes('missing home')) {
      culturalTopic = 'saudade'
      emotionalTone = 'empathetic'
      
      return {
        text: 'I understand that feeling of saudade - it\'s so uniquely Portuguese. That deep longing for home, for people, for moments that live in our hearts. Many Portuguese speakers in London experience this. Would you like to talk about what triggers your saudade most?',
        textPt: 'Compreendo esse sentimento de saudade - é tão unicamente português. Essa profunda nostalgia por casa, por pessoas, por momentos que vivem nos nossos corações. Muitos falantes de português em Londres sentem isto. Gostaria de falar sobre o que mais provoca a sua saudade?',
        culturalContext: 'Portuguese emotional experience and diaspora psychology',
        emotionalTone,
        followUpSuggestions: [
          'Tell me about Portuguese support groups',
          'How can I connect with other Portuguese people?',
          'What helps with homesickness?'
        ],
        relatedTopics: ['Portuguese-speaking community', 'Cultural events', 'Emotional support'],
        confidence: 0.95
      }
    }
    
    // Food-related queries
    if (lowerInput.includes('food') || lowerInput.includes('comida') || lowerInput.includes('pastéis') || lowerInput.includes('bacalhau')) {
      culturalTopic = 'food'
      
      return {
        text: 'Portuguese food is so much more than just sustenance - it carries our culture, our memories, our family traditions. What Portuguese dish are you craving today? I can help you find authentic ingredients in London or share traditional recipes.',
        textPt: 'A comida portuguesa é muito mais que só sustento - carrega a nossa cultura, as nossas memórias, as tradições familiares. Que prato português está com vontade de comer hoje? Posso ajudá-lo a encontrar ingredientes autênticos em Londres ou partilhar receitas tradicionais.',
        culturalContext: 'Portuguese culinary culture and food as cultural connection',
        emotionalTone: 'supportive',
        followUpSuggestions: [
          'Where can I find Portuguese ingredients?',
          'Teach me to make bacalhau',
          'Portuguese restaurants in London'
        ],
        relatedTopics: ['Portuguese shops', 'Cooking classes', 'Food events'],
        confidence: 0.88
      }
    }
    
    // Music and fado
    if (lowerInput.includes('fado') || lowerInput.includes('music') || lowerInput.includes('música')) {
      culturalTopic = 'music'
      emotionalTone = 'nostalgic'
      
      return {
        text: 'Fado is the voice of the Portuguese soul, isn\'t it? Those haunting melodies that capture our deepest emotions - joy, sorrow, love, and yes, saudade. Do you have a favorite fadista? Or would you like me to recommend some music to match your current mood?',
        textPt: 'O fado é a voz da alma portuguesa, não é? Essas melodias assombradas que capturam as nossas emoções mais profundas - alegria, tristeza, amor, e sim, saudade. Tem algum fadista preferido? Ou gostaria que recomendasse música para o seu humor atual?',
        culturalContext: 'Fado as Portuguese cultural and emotional expression',
        emotionalTone,
        followUpSuggestions: [
          'Recommend Portuguese music for my mood',
          'Tell me about Amália Rodrigues',
          'Where can I hear fado in London?'
        ],
        relatedTopics: ['Portuguese events', 'Cultural performances', 'Music therapy'],
        confidence: 0.92
      }
    }
    
    // General cultural guidance
    if (lowerInput.includes('culture') || lowerInput.includes('cultura') || lowerInput.includes('tradition')) {
      return {
        text: 'Portuguese culture is rich with traditions that have traveled with us across the world. From our warm hospitality to our deep family bonds, from our resilience (desenrascanço) to our capacity for joy. What aspect of Portuguese culture would you like to explore or share?',
        textPt: 'A cultura portuguesa é rica em tradições que viajaram connosco pelo mundo. Desde a nossa hospitalidade calorosa aos nossos laços familiares profundos, da nossa resistência (desenrascanço) à nossa capacidade de alegria. Que aspecto da cultura portuguesa gostaria de explorar ou partilhar?',
        culturalContext: 'Portuguese cultural identity and diaspora experience',
        emotionalTone: 'encouraging',
        followUpSuggestions: [
          'Explain Portuguese family traditions',
          'How to maintain culture in London',
          'Portuguese values and customs'
        ],
        relatedTopics: ['Family traditions', 'Cultural events', 'Portuguese-speaking community'],
        confidence: 0.85
      }
    }
    
    // Default response for general queries
    return {
      text: 'I\'m here to help you with anything related to Portuguese culture, community, or life in London. You can ask me about traditions, find Portuguese services, get emotional support, or just have a chat in Portuguese or English. What would you like to know?',
      textPt: 'Estou aqui para ajudá-lo com qualquer coisa relacionada com a cultura portuguesa, comunidade, ou vida em Londres. Pode perguntar-me sobre tradições, encontrar serviços portugueses, obter apoio emocional, ou simplesmente conversar em português ou inglês. O que gostaria de saber?',
      culturalContext: 'General Portuguese diaspora support and guidance',
      emotionalTone: 'supportive',
      followUpSuggestions: [
        'Tell me about Portuguese events in London',
        'Help me connect with Portuguese-speaking community',
        'I need emotional support today'
      ],
      relatedTopics: ['Portuguese-speaking community', 'Cultural guidance', 'Practical help'],
      confidence: 0.75
    }
  }

  // Speak message using speech synthesis
  const speakMessage = (message: string) => {
    if (!speechSynthesisRef.current || isSpeaking) return
    
    setIsSpeaking(true)
    
    const utterance = new SpeechSynthesisUtterance(message)
    
    if (selectedVoice) {
      utterance.voice = selectedVoice
    }
    
    utterance.rate = 0.9
    utterance.pitch = 1
    utterance.volume = 0.8
    utterance.lang = language === 'pt' ? 'pt-PT' : 'en-GB'
    
    utterance.onend = () => {
      setIsSpeaking(false)
    }
    
    utterance.onerror = () => {
      setIsSpeaking(false)
    }
    
    speechSynthesisRef.current.speak(utterance)
  }

  // Start listening for voice input
  const startListening = () => {
    if (!recognitionRef.current) {
      recognitionRef.current = initializeRecognition()
    }
    
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start()
    }
  }

  // Stop listening
  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
    }
  }

  // Detect language of input text
  const detectLanguage = (text: string): 'pt' | 'en' => {
    const portugueseWords = ['é', 'está', 'são', 'com', 'que', 'para', 'uma', 'como', 'tem', 'ou']
    const words = text.toLowerCase().split(' ')
    const portugalMatches = words.filter(word => portugueseWords.includes(word)).length
    
    return portugalMatches > words.length * 0.2 ? 'pt' : 'en'
  }

  // Stop all voice activities
  const stopVoiceActivity = () => {
    if (speechSynthesisRef.current) {
      speechSynthesisRef.current.cancel()
    }
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
    setIsSpeaking(false)
    setIsListening(false)
  }

  // Close voice assistant
  const closeAssistant = () => {
    stopVoiceActivity()
    setIsOpen(false)
    setCurrentSession(null)
    setTranscript('')
  }

  if (!voiceSupported) {
    return (
      <div className="fixed bottom-6 right-6 bg-red-100 border border-red-300 rounded-xl p-4 max-w-sm">
        <p className="text-red-700 text-sm">
          {t('voice.not_supported', 'Voice features are not supported in your browser')}
        </p>
      </div>
    )
  }

  return (
    <>
      {/* Voice Assistant Trigger Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={startVoiceSession}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-full flex items-center justify-center shadow-2xl hover:shadow-xl transition-all duration-300 z-50"
        >
          <MicrophoneIcon className="w-8 h-8 text-white" />
        </motion.button>
      )}

      {/* Voice Assistant Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 w-96 bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden z-50"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-secondary-500 to-accent-500 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <ChatBubbleLeftRightIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">
                      {t('voice.assistant_title', 'Portuguese Voice Assistant')}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {t('voice.assistant_subtitle', 'Your cultural companion')}
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeAssistant}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Status Indicator */}
              <div className="flex items-center justify-center mb-6">
                <div className={`flex items-center gap-3 px-4 py-2 rounded-full ${
                  isListening 
                    ? 'bg-red-100 text-red-700' 
                    : isSpeaking 
                      ? 'bg-blue-100 text-blue-700'
                      : isProcessing
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-600'
                }`}>
                  {isListening && <MicrophoneSolid className="w-4 h-4 animate-pulse" />}
                  {isSpeaking && <SpeakerSolid className="w-4 h-4 animate-pulse" />}
                  {isProcessing && <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />}
                  
                  <span className="text-sm font-medium">
                    {isListening && t('voice.listening', 'Listening...')}
                    {isSpeaking && t('voice.speaking', 'Speaking...')}
                    {isProcessing && t('voice.processing', 'Processing...')}
                    {!isListening && !isSpeaking && !isProcessing && t('voice.ready', 'Ready to help')}
                  </span>
                </div>
              </div>

              {/* Transcript Display */}
              {transcript && (
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <p className="text-gray-700 italic">"{transcript}"</p>
                </div>
              )}

              {/* Conversation Messages */}
              {currentSession && currentSession.messages.length > 0 && (
                <div className="max-h-40 overflow-y-auto mb-6 space-y-3">
                  {currentSession.messages.slice(-3).map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] p-3 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-secondary-100 text-secondary-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        {message.translation && language !== message.originalLanguage && (
                          <p className="text-xs opacity-75 mt-1 italic">{message.translation}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={isListening ? stopListening : startListening}
                  disabled={isSpeaking || isProcessing}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all ${
                    isListening
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-gradient-to-r from-secondary-500 to-accent-500 text-white hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'
                  }`}
                >
                  {isListening ? (
                    <>
                      <MicrophoneSolid className="w-5 h-5 animate-pulse" />
                      {t('voice.stop', 'Stop')}
                    </>
                  ) : (
                    <>
                      <MicrophoneIcon className="w-5 h-5" />
                      {t('voice.speak', 'Speak')}
                    </>
                  )}
                </button>

                <button
                  onClick={stopVoiceActivity}
                  className="px-4 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Capabilities Overview */}
              {(!currentSession || currentSession.messages.length === 0) && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    {t('voice.can_help', 'I can help with:')}
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {VOICE_ASSISTANT_CAPABILITIES.slice(0, 4).map((capability) => (
                      <div
                        key={capability.title}
                        className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"
                      >
                        <capability.icon className="w-4 h-4 text-secondary-600 flex-shrink-0" />
                        <span className="text-xs text-gray-700 font-medium">
                          {language === 'pt' ? capability.titlePt : capability.title}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-3 text-center">
                    {t('voice.speak_naturally', 'Speak naturally in Portuguese or English')}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}