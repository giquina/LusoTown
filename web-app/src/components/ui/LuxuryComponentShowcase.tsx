'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  StarIcon, 
  HeartIcon, 
  SparklesIcon,
  CrownIcon,
  GlobeEuropeAfricaIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import {
  EliteButton,
  LuxuryHeading,
  LuxuryText,
  LuxuryBadge,
  Glassmorphism,
  GlassCard,
  PortugueseGlassCard,
  EliteGlassCard,
  LuxuryBreadcrumbs,
  EliteBreadcrumbs,
  PortugueseBreadcrumbs,
  HeritageBreadcrumbs
} from './index'

export default function LuxuryComponentShowcase() {
  const { t } = useLanguage()
  const [activeDemo, setActiveDemo] = useState('buttons')

  const breadcrumbItems = [
    { label: 'LusoTown', href: '/' },
    { label: 'Components', href: '/components' },
    { label: 'Luxury Showcase', current: true }
  ]

  const demos = {
    buttons: (
      <div className="space-y-8">
        <LuxuryHeading level={3} variant="luxury" gradient>
          Elite Button Collection
        </LuxuryHeading>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Standard Elite Buttons */}
          <div className="space-y-4">
            <LuxuryText size="lg" weight="semibold">Standard Elite</LuxuryText>
            <div className="space-y-3">
              <EliteButton variant="primary" size="lg" luxury>
                <StarIcon className="w-5 h-5" />
                Premium Action
              </EliteButton>
              <EliteButton variant="secondary" size="md" luxury>
                Elite Service
              </EliteButton>
              <EliteButton variant="outline" size="sm" luxury>
                Refined Choice
              </EliteButton>
            </div>
          </div>

          {/* Portuguese Heritage */}
          <div className="space-y-4">
            <LuxuryText size="lg" weight="semibold">Portuguese Heritage</LuxuryText>
            <div className="space-y-3">
              <EliteButton variant="heritage" size="lg" portuguese shimmer>
                <GlobeEuropeAfricaIcon className="w-5 h-5" />
                Herança Portuguesa
              </EliteButton>
              <EliteButton variant="primary" size="md" portuguese>
                Comunidade Lusa
              </EliteButton>
              <EliteButton variant="ghost" size="sm" portuguese>
                Cultura
              </EliteButton>
            </div>
          </div>

          {/* Elite & Platinum */}
          <div className="space-y-4">
            <LuxuryText size="lg" weight="semibold">Ultra Premium</LuxuryText>
            <div className="space-y-3">
              <EliteButton variant="elite" size="lg" glow>
                <CrownIcon className="w-5 h-5" />
                Elite Experience
              </EliteButton>
              <EliteButton variant="platinum" size="md" shimmer>
                <SparklesIcon className="w-5 h-5" />
                Platinum Service
              </EliteButton>
            </div>
          </div>
        </div>
      </div>
    ),

    glassmorphism: (
      <div className="space-y-8">
        <LuxuryHeading level={3} variant="heritage" gradient>
          Glassmorphism Components
        </LuxuryHeading>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Standard Glass Cards */}
          <div className="space-y-6">
            <GlassCard>
              <LuxuryHeading level={4} variant="luxury">
                Premium Glass Card
              </LuxuryHeading>
              <LuxuryText className="mt-4">
                Sophisticated transparency effects with subtle blur and elegant styling for the most discerning users.
              </LuxuryText>
              <div className="flex items-center space-x-2 mt-6">
                <LuxuryBadge variant="premium">Premium</LuxuryBadge>
                <LuxuryBadge variant="success">Available</LuxuryBadge>
              </div>
            </GlassCard>

            <PortugueseGlassCard>
              <LuxuryHeading level={4} variant="portuguese">
                Cartão Português
              </LuxuryHeading>
              <LuxuryText className="mt-4">
                Elementos culturais portugueses integrados com efeitos de vidro premium para uma experiência autêntica.
              </LuxuryText>
              <div className="flex items-center space-x-2 mt-6">
                <LuxuryBadge variant="portuguese">🇵🇹 Português</LuxuryBadge>
                <HeartIcon className="w-5 h-5 text-red-500" />
              </div>
            </PortugueseGlassCard>
          </div>

          {/* Elite Glass Components */}
          <div className="space-y-6">
            <EliteGlassCard>
              <LuxuryHeading level={4} variant="elite">
                Elite Glass Panel
              </LuxuryHeading>
              <LuxuryText className="mt-4 text-gray-300">
                The pinnacle of luxury design - reserved for our most prestigious members and exclusive experiences.
              </LuxuryText>
              <div className="flex items-center space-x-2 mt-6">
                <LuxuryBadge variant="default">Elite</LuxuryBadge>
                <CrownIcon className="w-5 h-5 text-amber-400" />
              </div>
            </EliteGlassCard>

            <Glassmorphism variant="heritage" intensity="strong">
              <LuxuryHeading level={4} variant="heritage">
                Heritage Collection
              </LuxuryHeading>
              <LuxuryText className="mt-4">
                Traditional Portuguese aesthetics meet modern luxury in this sophisticated heritage-inspired design.
              </LuxuryText>
            </Glassmorphism>
          </div>
        </div>
      </div>
    ),

    typography: (
      <div className="space-y-8">
        <LuxuryHeading level={3} variant="premium" gradient>
          Luxury Typography System
        </LuxuryHeading>
        
        <div className="space-y-12">
          {/* Heading Hierarchy */}
          <div>
            <LuxuryText size="lg" weight="semibold" className="mb-6">
              Sophisticated Heading Hierarchy
            </LuxuryText>
            <div className="space-y-6">
              <LuxuryHeading level={1} variant="luxury" gradient letterSpacing="wide">
                Elite Luxury Experience
              </LuxuryHeading>
              <LuxuryHeading level={2} variant="portuguese" gradient>
                Experiência Portuguesa Premium
              </LuxuryHeading>
              <LuxuryHeading level={3} variant="heritage">
                Heritage & Tradition
              </LuxuryHeading>
              <LuxuryHeading level={4} variant="elite">
                Refined Elegance
              </LuxuryHeading>
            </div>
          </div>

          {/* Text Variations */}
          <div>
            <LuxuryText size="lg" weight="semibold" className="mb-6">
              Premium Text Styles
            </LuxuryText>
            <div className="space-y-4">
              <LuxuryText size="xl" weight="bold" variant="premium">
                Premium service dedicated to affluent Portuguese professionals
              </LuxuryText>
              <LuxuryText size="lg" variant="portuguese">
                Conectando a comunidade portuguesa de Londres com experiências exclusivas
              </LuxuryText>
              <LuxuryText size="base" variant="muted">
                Sophisticated design meets cultural authenticity in every detail
              </LuxuryText>
            </div>
          </div>
        </div>
      </div>
    ),

    breadcrumbs: (
      <div className="space-y-8">
        <LuxuryHeading level={3} variant="elite" gradient>
          Elite Navigation Breadcrumbs
        </LuxuryHeading>
        
        <div className="space-y-8">
          <div>
            <LuxuryText size="lg" weight="semibold" className="mb-4">
              Standard Luxury
            </LuxuryText>
            <LuxuryBreadcrumbs
              items={breadcrumbItems}
              variant="luxury"
              size="lg"
            />
          </div>

          <div>
            <LuxuryText size="lg" weight="semibold" className="mb-4">
              Portuguese Heritage
            </LuxuryText>
            <PortugueseBreadcrumbs
              items={[
                { label: 'LusoTown', href: '/' },
                { label: 'Comunidade', href: '/community' },
                { label: 'Experiências Premium', current: true }
              ]}
              size="md"
            />
          </div>

          <div>
            <LuxuryText size="lg" weight="semibold" className="mb-4">
              Elite Experience
            </LuxuryText>
            <EliteBreadcrumbs
              items={[
                { label: 'Elite Portal', href: '/elite' },
                { label: 'Platinum Services', href: '/elite/platinum' },
                { label: 'Exclusive Access', current: true }
              ]}
            />
          </div>

          <div>
            <LuxuryText size="lg" weight="semibold" className="mb-4">
              Heritage Collection
            </LuxuryText>
            <HeritageBreadcrumbs
              items={breadcrumbItems}
              size="md"
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <LuxuryHeading 
            level={1} 
            variant="luxury" 
            gradient 
            centered 
            animate
            className="mb-4"
          >
            LusoTown Luxury UI
          </LuxuryHeading>
          <LuxuryText size="xl" variant="muted" className="max-w-3xl mx-auto">
            Sophisticated components designed for affluent Portuguese speakers, 
            combining cultural authenticity with modern luxury aesthetics
          </LuxuryText>
        </div>

        {/* Demo Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.keys(demos).map((demo) => (
            <EliteButton
              key={demo}
              variant={activeDemo === demo ? "heritage" : "outline"}
              size="md"
              luxury={activeDemo === demo}
              onClick={() => setActiveDemo(demo)}
              className="capitalize"
            >
              {demo.replace(/([A-Z])/g, ' $1').trim()}
            </EliteButton>
          ))}
        </div>

        {/* Demo Content */}
        <motion.div
          key={activeDemo}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-amber-200/50 p-8 lg:p-12"
        >
          {demos[activeDemo as keyof typeof demos]}
        </motion.div>

        {/* Footer */}
        <div className="text-center mt-12">
          <LuxuryText variant="muted">
            Crafted with precision for the LusoTown luxury experience
          </LuxuryText>
        </div>
      </div>
    </div>
  )
}