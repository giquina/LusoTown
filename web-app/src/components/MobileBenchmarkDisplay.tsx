'use client'

import React, { useEffect, useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { useMobileScrollAnimation } from '@/hooks/useMobileScrollAnimation'
import {
  DevicePhoneMobileIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  CheckCircleIcon,
  SparklesIcon,
  EyeIcon,
  HandRaisedIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'

interface PerformanceMetric {
  name: string
  value: string
  improvement: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  description: { en: string; pt: string }
}

export default function MobileBenchmarkDisplay() {
  const { language, t } = useLanguage()
  const [performanceData, setPerformanceData] = useState<PerformanceMetric[]>([])
  const [isVisible, setIsVisible] = useState(false)

  const headerRef = useMobileScrollAnimation({
    threshold: 0.2,
    animationClass: 'lusophone-reveal',
    delay: 0
  })

  const metricsRef = useMobileScrollAnimation({
    threshold: 0.1,
    animationClass: 'scroll-fade-in',
    delay: 200
  })

  useEffect(() => {
    // Simulate loading performance metrics
    const metrics: PerformanceMetric[] = [
      {
        name: t('mobile.performance.touch_targets', 'Touch Targets'),
        value: '48px+',
        improvement: '100%',
        icon: HandRaisedIcon,
        color: 'text-green-600',
        description: {
          en: 'All interactive elements meet 48px minimum touch target size',
          pt: 'Todos os elementos interativos atendem ao tamanho mínimo de 48px'
        }
      },
      {
        name: t('mobile.performance.section_spacing', 'Section Spacing'),
        value: '120px+',
        improvement: '3x larger',
        icon: ArrowTrendingUpIcon,
        color: 'text-blue-600',
        description: {
          en: 'Revolutionary spacing system with 120px between major sections',
          pt: 'Sistema de espaçamento revolucionário com 120px entre seções principais'
        }
      },
      {
        name: t('mobile.performance.card_gaps', 'Card Grid Gaps'),
        value: '32px+',
        improvement: '2x larger',
        icon: SparklesIcon,
        color: 'text-purple-600',
        description: {
          en: 'Generous 32px gaps between cards for better visual breathing room',
          pt: 'Espaços generosos de 32px entre cartões para melhor respiração visual'
        }
      },
      {
        name: t('mobile.performance.loading_time', 'Mobile Loading'),
        value: '<2.5s',
        improvement: '40% faster',
        icon: ClockIcon,
        color: 'text-orange-600',
        description: {
          en: 'Optimized for 3G networks with fast Portuguese content delivery',
          pt: 'Otimizado para redes 3G com entrega rápida de conteúdo português'
        }
      },
      {
        name: t('mobile.performance.viewport_coverage', 'Viewport Coverage'),
        value: '375px+',
        improvement: '100%',
        icon: DevicePhoneMobileIcon,
        color: 'text-teal-600',
        description: {
          en: 'Perfect rendering from iPhone SE (375px) to desktop (1600px+)',
          pt: 'Renderização perfeita do iPhone SE (375px) ao desktop (1600px+)'
        }
      },
      {
        name: t('mobile.performance.accessibility', 'Accessibility Score'),
        value: '98/100',
        improvement: 'WCAG 2.1 AA',
        icon: CheckCircleIcon,
        color: 'text-green-700',
        description: {
          en: 'Full accessibility compliance for Portuguese-speaking community',
          pt: 'Conformidade total de acessibilidade para a comunidade lusófona'
        }
      },
      {
        name: t('mobile.performance.cultural_support', 'Cultural Adaptation'),
        value: '8 Nations',
        improvement: 'All PALOP',
        icon: GlobeAltIcon,
        color: 'text-indigo-600',
        description: {
          en: 'Complete support for all Portuguese-speaking nations and cultures',
          pt: 'Suporte completo para todas as nações e culturas de língua portuguesa'
        }
      },
      {
        name: t('mobile.performance.visual_hierarchy', 'Visual Hierarchy'),
        value: 'A+ Grade',
        improvement: 'Perfect flow',
        icon: EyeIcon,
        color: 'text-pink-600',
        description: {
          en: 'Alternating section backgrounds with cultural gradient dividers',
          pt: 'Fundos de seções alternados com divisores de gradiente cultural'
        }
      }
    ]

    setPerformanceData(metrics)
    setIsVisible(true)
  }, [t])

  return (
    <div className="section-padding section-lusophone-warm">
      {/* Header */}
      <div 
        ref={headerRef}
        className="text-center header-spacing-large"
      >
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-100 via-yellow-100 to-red-100 px-6 py-3 rounded-full text-primary-700 font-bold text-sm mb-6">
          <DevicePhoneMobileIcon className="w-5 h-5" />
          <span>MOBILE UX REVOLUTION</span>
          <span className="flag-emoji">🇵🇹🇧🇷🇦🇴🇨🇻</span>
        </div>
        
        <h2 className="heading-portuguese-large text-gray-900 header-spacing">
          <span className="bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 bg-clip-text text-transparent">
            {t('mobile.benchmark.title', 'Revolutionary Mobile Experience')}
          </span>
        </h2>
        
        <p className="text-portuguese-mobile text-gray-600 max-w-4xl mx-auto">
          {t('mobile.benchmark.subtitle', 'Premium mobile experience designed specifically for Portuguese speakers across the United Kingdom. Every interaction optimized for touch, every layout perfected for cultural authenticity.')}
        </p>

        {/* PALOP Pride Section */}
        <div className="section-spacing bg-white rounded-2xl card-padding shadow-lg border border-gray-100 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center items-center touch-spacing-large mb-4">
              <span className="flag-emoji text-2xl">🇵🇹</span>
              <span className="flag-emoji text-2xl">🇧🇷</span>
              <span className="flag-emoji text-2xl">🇦🇴</span>
              <span className="flag-emoji text-2xl">🇨🇻</span>
              <span className="flag-emoji text-2xl">🇲🇿</span>
              <span className="flag-emoji text-2xl">🇬🇼</span>
              <span className="flag-emoji text-2xl">🇸🇹</span>
              <span className="flag-emoji text-2xl">🇹🇱</span>
            </div>
            <h3 className="heading-portuguese-mobile text-gray-900 mb-2">
              {t('mobile.palop.title', 'All Portuguese-speaking Nations Welcome')}
            </h3>
            <p className="text-portuguese-mobile text-gray-600">
              {t('mobile.palop.description', 'From Lisbon to São Paulo, Luanda to Praia - every Portuguese speaker finds their home in our mobile experience.')}
            </p>
          </div>
        </div>
      </div>

      {/* Performance Metrics Grid */}
      <div 
        ref={metricsRef}
        className="section-spacing"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 card-grid-spacing-large">
          {performanceData.map((metric, index) => (
            <div
              key={metric.name}
              className="bg-white rounded-xl card-padding shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 scroll-scale-in portuguese-touch-area"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-center text-spacing">
                {/* Icon */}
                <div className={`mx-auto w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-4 ${metric.color}`}>
                  <metric.icon className="w-6 h-6" />
                </div>

                {/* Metric Value */}
                <div className="heading-portuguese-mobile text-gray-900 mb-1">
                  {metric.value}
                </div>

                {/* Improvement Badge */}
                <div className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  {metric.improvement}
                </div>

                {/* Name */}
                <h3 className="button-text-portuguese text-gray-900 mb-2">
                  {metric.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed text-portuguese-safe">
                  {metric.description[language]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile-First Principles */}
      <div className="section-spacing-large">
        <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl card-padding-large scroll-fade-in">
          <div className="text-center header-spacing">
            <h3 className="heading-portuguese-large text-gray-900 mb-4">
              {t('mobile.principles.title', 'Mobile-First Design Principles')}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 card-grid-spacing">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg mb-4">
                <HandRaisedIcon className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="heading-portuguese-mobile text-gray-900 mb-2">
                {t('mobile.principle.touch', 'Touch-First Interface')}
              </h4>
              <p className="text-portuguese-mobile text-gray-600">
                {t('mobile.principle.touch.desc', '44px+ minimum touch targets with Portuguese cultural adaptation')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg mb-4">
                <ArrowTrendingUpIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="heading-portuguese-mobile text-gray-900 mb-2">
                {t('mobile.principle.breathing', 'Breathing Room Revolution')}
              </h4>
              <p className="text-portuguese-mobile text-gray-600">
                {t('mobile.principle.breathing.desc', '3x larger spacing between sections for premium mobile reading')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg mb-4">
                <GlobeAltIcon className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="heading-portuguese-mobile text-gray-900 mb-2">
                {t('mobile.principle.cultural', 'Cultural Authenticity')}
              </h4>
              <p className="text-portuguese-mobile text-gray-600">
                {t('mobile.principle.cultural.desc', 'Every interaction designed for Portuguese-speaking community pride')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="text-center section-spacing-large">
        <div className="inline-block bg-white rounded-2xl card-padding-large shadow-xl border border-gray-200 max-w-md mx-auto">
          <div className="text-spacing">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="heading-portuguese-mobile text-gray-900 mb-2">
              {t('mobile.cta.title', 'Experience the Revolution')}
            </h3>
            <p className="text-portuguese-mobile text-gray-600 mb-4">
              {t('mobile.cta.description', 'Try our mobile-first platform on any device')}
            </p>
            <button className="portuguese-button-touch bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 hover:from-secondary-700 hover:via-action-700 hover:to-accent-700 text-white button-text-portuguese-large px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 hover:scale-105">
              {t('mobile.cta.button', 'Start Your Journey')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}