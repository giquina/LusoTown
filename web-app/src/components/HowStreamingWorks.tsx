'use client'

import React from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { Card, CardContent } from '@/components/ui/card'
import { ModernButton } from '@/components/ui/ModernButton'

/**
 * How Streaming Works - Educational component for Portuguese community
 * Explains the platform's streaming features and cultural focus
 */
export default function HowStreamingWorks() {
  const { t } = useLanguage()

  const steps = [
    {
      step: 1,
      icon: '📱',
      title: t('streaming.howItWorks.step1.title') || 'Join the Community',
      description: t('streaming.howItWorks.step1.desc') || 'Connect with Portuguese-speaking members across the UK and discover cultural events happening near you.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      step: 2,
      icon: '🎥',
      title: t('streaming.howItWorks.step2.title') || 'Watch Live Streams',
      description: t('streaming.howItWorks.step2.desc') || 'Attend cultural events, language classes, and community discussions from anywhere in the UK.',
      color: 'from-green-500 to-green-600'
    },
    {
      step: 3,
      icon: '💬',
      title: t('streaming.howItWorks.step3.title') || 'Engage & Interact',
      description: t('streaming.howItWorks.step3.desc') || 'Chat with other community members, ask questions, and share your Portuguese heritage.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      step: 4,
      icon: '🎆',
      title: t('streaming.howItWorks.step4.title') || 'Create & Share',
      description: t('streaming.howItWorks.step4.desc') || 'Host your own cultural events, teach traditional skills, and celebrate Portuguese traditions.',
      color: 'from-orange-500 to-orange-600'
    }
  ]

  const features = [
    {
      icon: '🌍',
      title: t('streaming.features.multiCultural') || 'Multi-Cultural Content',
      description: t('streaming.features.multiCultural.desc') || 'Content from Portugal, Brazil, and all PALOP nations'
    },
    {
      icon: '📱',
      title: t('streaming.features.mobileFirst') || 'Mobile-First Design',
      description: t('streaming.features.mobileFirst.desc') || 'Optimized for smartphones and tablets'
    },
    {
      icon: '🔒',
      title: t('streaming.features.safe') || 'Safe & Moderated',
      description: t('streaming.features.safe.desc') || 'Community guidelines ensure respectful interactions'
    },
    {
      icon: '🎯',
      title: t('streaming.features.targeted') || 'UK-Focused',
      description: t('streaming.features.targeted.desc') || 'Content relevant to Portuguese speakers in the UK'
    }
  ]

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          {t('streaming.howItWorks.title') || 'How LusoTown Streaming Works'}
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {t('streaming.howItWorks.subtitle') || 'Connect with Portuguese culture through live streaming, community events, and cultural preservation.'}
        </p>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step) => (
          <Card key={step.step} className="relative overflow-hidden hover:shadow-lg transition-shadow">
            <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-5`}></div>
            <CardContent className="p-6 text-center relative">
              <div className="text-4xl mb-4">{step.icon}</div>
              <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r ${step.color} text-white text-sm font-bold mb-4`}>
                {step.step}
              </div>
              <h3 className="font-semibold text-lg mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {step.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Features */}
      <div className="bg-gradient-to-r from-blue-50 via-white to-green-50 rounded-2xl p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            {t('streaming.features.title') || 'Platform Features'}
          </h3>
          <p className="text-gray-600">
            {t('streaming.features.subtitle') || 'Built specifically for the Portuguese-speaking community in the UK'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h4 className="font-semibold text-lg mb-2">{feature.title}</h4>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-2xl p-8">
        <h3 className="text-2xl font-bold mb-4">
          {t('streaming.cta.title') || 'Ready to Join Our Community?'}
        </h3>
        <p className="text-lg mb-6 opacity-90">
          {t('streaming.cta.description') || 'Start watching Portuguese cultural content and connecting with your community today.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <ModernButton 
            variant="secondary"
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            {t('streaming.cta.startWatching') || 'Start Watching'}
          </ModernButton>
          <ModernButton 
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white hover:text-blue-600"
          >
            {t('streaming.cta.learnMore') || 'Learn More'}
          </ModernButton>
        </div>
      </div>
    </div>
  )
}