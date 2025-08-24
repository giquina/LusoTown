'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChartBarIcon,
  UserGroupIcon,
  HeartIcon,
  BuildingOfficeIcon,
  StarIcon,
  CheckCircleIcon,
  ClockIcon,
  FireIcon,
  TruckIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'

interface SignupConversionOptimizerProps {
  userSource?: string
  timeOfDay?: number
  onVariationSelect?: (variation: string) => void
  onConversionEvent?: (event: string, data: any) => void
}

interface HeadlineVariation {
  id: string
  type: 'business' | 'romance' | 'community'
  headline: string
  headlinePt: string
  subheading: string
  subheadingPt: string
  cta: string
  ctaPt: string
  icon: any
  color: string
  socialProof: string
  socialProofPt: string
  benefits: Array<{
    text: string
    textPt: string
    icon: any
  }>
}

export default function SignupConversionOptimizer({ 
  userSource = '',
  timeOfDay = new Date().getHours(),
  onVariationSelect,
  onConversionEvent
}: SignupConversionOptimizerProps) {
  const { language } = useLanguage()
  const [selectedVariation, setSelectedVariation] = useState<string>('')
  const [showUrgency, setShowUrgency] = useState(false)
  const [conversionEvents, setConversionEvents] = useState<string[]>([])

  const isPortuguese = language === 'pt'

  // Define headline variations with Portuguese cultural context
  const variations: HeadlineVariation[] = [
    {
      id: 'business-first',
      type: 'business',
      headline: 'Connect with 750+ Portuguese Business Leaders in the UK',
      headlinePt: 'Conecte-se com 750+ Líderes Empresariais Portugueses no Reino Unido',
      subheading: 'Professional networking • Business growth • Cultural connections',
      subheadingPt: 'Networking profissional • Crescimento empresarial • Conexões culturais',
      cta: 'Join Professional Network',
      ctaPt: 'Juntar-se à Rede Profissional',
      icon: BuildingOfficeIcon,
      color: 'blue',
      socialProof: '23 business owners joined this week',
      socialProofPt: '23 empresários juntaram-se esta semana',
      benefits: [
        { text: 'Portuguese business networking events', textPt: 'Eventos de networking empresarial português', icon: UserGroupIcon },
        { text: 'Mentorship from successful Portuguese entrepreneurs', textPt: 'Mentoria de empreendedores portugueses bem-sucedidos', icon: AcademicCapIcon },
        { text: 'Access to Portuguese business directory', textPt: 'Acesso ao diretório de negócios português', icon: BuildingOfficeIcon }
      ]
    },
    {
      id: 'romance-first', 
      type: 'romance',
      headline: 'Finally! Meet Portuguese Speakers Who Truly Understand You',
      headlinePt: 'Finalmente! Conheça Falantes de Português que Realmente o Compreendem',
      subheading: 'Authentic connections • Cultural compatibility • Lasting relationships',
      subheadingPt: 'Conexões autênticas • Compatibilidade cultural • Relacionamentos duradouros',
      cta: 'Find Your Person',
      ctaPt: 'Encontre a Sua Pessoa',
      icon: HeartIcon,
      color: 'rose',
      socialProof: '47 members found meaningful connections last month',
      socialProofPt: '47 membros encontraram conexões significativas no mês passado',
      benefits: [
        { text: 'Cultural compatibility matching', textPt: 'Correspondência de compatibilidade cultural', icon: HeartIcon },
        { text: 'Portuguese cultural events and dates', textPt: 'Eventos culturais portugueses e encontros', icon: StarIcon },
        { text: 'Safe, verified Portuguese community', textPt: 'Comunidade portuguesa segura e verificada', icon: CheckCircleIcon }
      ]
    },
    {
      id: 'community-focused',
      type: 'community', 
      headline: 'Your Portuguese Home Away From Home in the UK',
      headlinePt: 'A Sua Casa Portuguesa Longe de Casa no Reino Unido',
      subheading: '750+ Portuguese speakers • Cultural events • Business & personal connections',
      subheadingPt: '750+ falantes de português • Eventos culturais • Conexões empresariais e pessoais',
      cta: 'Join Your Community',
      ctaPt: 'Junte-se à Sua Comunidade',
      icon: UserGroupIcon,
      color: 'green',
      socialProof: 'Fastest-growing Portuguese community in the UK',
      socialProofPt: 'Comunidade portuguesa que mais cresce no Reino Unido',
      benefits: [
        { text: 'Weekly Portuguese cultural events', textPt: 'Eventos culturais portugueses semanais', icon: StarIcon },
        { text: 'Professional and personal connections', textPt: 'Conexões profissionais e pessoais', icon: UserGroupIcon },
        { text: 'Support for newcomers to UK', textPt: 'Apoio para recém-chegados ao Reino Unido', icon: CheckCircleIcon }
      ]
    }
  ]

  // Intelligent variation selection based on user source and behavior
  useEffect(() => {
    const selectOptimalVariation = () => {
      let selectedId = 'community-focused' // Default
      
      // Business-focused triggers
      if (userSource.includes('linkedin') || 
          userSource.includes('business') || 
          userSource.includes('professional') ||
          (timeOfDay >= 9 && timeOfDay <= 17)) {
        selectedId = 'business-first'
      }
      
      // Romance-focused triggers
      else if (userSource.includes('dating') || 
               userSource.includes('match') || 
               userSource.includes('romance') ||
               (timeOfDay >= 19 && timeOfDay <= 23)) {
        selectedId = 'romance-first'
      }
      
      // Community-focused for cultural sources or weekends
      else if (userSource.includes('cultural') || 
               userSource.includes('event') || 
               userSource.includes('portuguese') ||
               new Date().getDay() === 0 || new Date().getDay() === 6) {
        selectedId = 'community-focused'
      }

      setSelectedVariation(selectedId)
      onVariationSelect?.(selectedId)
      
      // Track the variation selection
      onConversionEvent?.('variation_selected', {
        variation: selectedId,
        source: userSource,
        timeOfDay,
        timestamp: Date.now()
      })
    }

    selectOptimalVariation()
  }, [userSource, timeOfDay, onVariationSelect, onConversionEvent])

  // Show urgency elements based on user behavior
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowUrgency(true)
    }, 15000) // Show after 15 seconds

    return () => clearTimeout(timer)
  }, [])

  const handleConversionEvent = (eventType: string, data?: any) => {
    const newEvent = `${eventType}_${Date.now()}`
    setConversionEvents(prev => [...prev, newEvent])
    onConversionEvent?.(eventType, { variation: selectedVariation, ...data })
  }

  if (!selectedVariation) return null

  const currentVariation = variations.find(v => v.id === selectedVariation)
  if (!currentVariation) return null

  const IconComponent = currentVariation.icon

  return (
    <div className="signup-conversion-optimizer">
      {/* Dynamic Headline Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className={`w-12 h-12 bg-gradient-to-r from-${currentVariation.color}-500 to-${currentVariation.color}-600 rounded-xl flex items-center justify-center shadow-lg`}>
            <IconComponent className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-gray-900">LusoTown</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4 leading-tight">
          {isPortuguese ? currentVariation.headlinePt : currentVariation.headline}
        </h1>

        <p className="text-xl text-gray-600 mb-6 leading-relaxed">
          {isPortuguese ? currentVariation.subheadingPt : currentVariation.subheading}
        </p>

        {/* Social Proof Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`inline-flex items-center gap-3 bg-gradient-to-r from-${currentVariation.color}-50 via-white to-${currentVariation.color}-50 border border-${currentVariation.color}-200 rounded-full px-4 py-2 shadow-sm mb-6`}
        >
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 bg-${currentVariation.color}-500 rounded-full animate-pulse`} />
            <span className="text-sm font-semibold text-gray-700">
              {isPortuguese ? currentVariation.socialProofPt : currentVariation.socialProof}
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Benefits Showcase */}
      <div className="grid sm:grid-cols-1 gap-4 mb-8">
        {currentVariation.benefits.map((benefit, index) => {
          const BenefitIcon = benefit.icon
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
              className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/70 hover:border-primary-200 transition-colors"
              onMouseEnter={() => handleConversionEvent('benefit_hover', { index })}
            >
              <div className={`w-8 h-8 bg-${currentVariation.color}-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm`}>
                <BenefitIcon className="h-4 w-4 text-white" />
              </div>
              <span className="font-medium text-gray-900">
                {isPortuguese ? benefit.textPt : benefit.text}
              </span>
            </motion.div>
          )
        })}
      </div>

      {/* Urgency Element */}
      <AnimatePresence>
        {showUrgency && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mb-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl"
          >
            <div className="flex items-center gap-3">
              <FireIcon className="w-5 h-5 text-amber-600" />
              <div>
                <span className="font-semibold text-amber-800">
                  {isPortuguese ? 'Junte-se agora!' : 'Join Now!'}{' '}
                </span>
                <span className="text-amber-700 text-sm">
                  {currentVariation.type === 'business' 
                    ? (isPortuguese ? 'Próximo evento de networking na sexta-feira' : 'Next networking event this Friday')
                    : currentVariation.type === 'romance'
                    ? (isPortuguese ? 'Porto Night este fim de semana - 47 participantes' : 'Porto Night this weekend - 47 attending') 
                    : (isPortuguese ? 'Eventos culturais exclusivos para membros' : 'Exclusive cultural events for members')
                  }
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced CTA Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="text-center"
      >
        <button
          onClick={() => handleConversionEvent('primary_cta_click')}
          className={`inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-${currentVariation.color}-500 to-${currentVariation.color}-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:-translate-y-1 hover:scale-105`}
        >
          <span className="text-xl">🇵🇹</span>
          <span>{isPortuguese ? currentVariation.ctaPt : currentVariation.cta}</span>
          <span className="text-xl">→</span>
        </button>

        <p className="text-sm text-gray-500 mt-3">
          {isPortuguese ? 'Gratuito para aderir • Sem cartão de crédito necessário' : 'Free to join • No credit card required'}
        </p>
      </motion.div>

      {/* Conversion Tracking Debug (Development Only) */}
      {process.env.NODE_ENV === 'development' && conversionEvents.length > 0 && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-700 mb-2">Conversion Events Tracked:</h4>
          <ul className="text-xs text-gray-600">
            {conversionEvents.slice(-5).map((event, index) => (
              <li key={index}>• {event}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

// Utility hook for conversion optimization
export const useSignupConversionOptimization = () => {
  const [conversionData, setConversionData] = useState({
    variation: '',
    events: [] as Array<{type: string, data: any, timestamp: number}>,
    conversionScore: 0
  })

  const trackConversionEvent = (type: string, data: any) => {
    const event = {
      type,
      data,
      timestamp: Date.now()
    }
    
    setConversionData(prev => ({
      ...prev,
      events: [...prev.events, event],
      conversionScore: prev.conversionScore + getEventScore(type)
    }))

    // Store in localStorage for analytics
    const stored = JSON.parse(localStorage.getItem('lusotown-signup-conversion') || '{}')
    const updated = {
      ...stored,
      events: [...(stored.events || []), event],
      lastUpdated: Date.now()
    }
    localStorage.setItem('lusotown-signup-conversion', JSON.stringify(updated))
  }

  const getEventScore = (eventType: string): number => {
    const scores = {
      'variation_selected': 5,
      'benefit_hover': 2,
      'primary_cta_click': 15,
      'form_field_focus': 3,
      'social_proof_click': 4,
      'urgency_view': 6,
      'form_completion': 25
    }
    return scores[eventType as keyof typeof scores] || 1
  }

  return {
    conversionData,
    trackConversionEvent,
    getConversionScore: () => conversionData.conversionScore,
    getOptimizationInsights: () => {
      const events = conversionData.events
      const insights = {
        totalEvents: events.length,
        topEvents: events.reduce((acc, event) => {
          acc[event.type] = (acc[event.type] || 0) + 1
          return acc
        }, {} as Record<string, number>),
        conversionProbability: Math.min(conversionData.conversionScore / 50, 1) * 100
      }
      return insights
    }
  }
}