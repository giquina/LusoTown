'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/context/LanguageContext'
import EliteButton from './EliteButton'
import Glassmorphism from './Glassmorphism'
import { LuxuryHeading, LuxuryText, LuxuryBadge } from './LuxuryTypography'

interface AristocraticShowcaseProps {
  className?: string
  variant?: 'showcase' | 'demo' | 'gallery'
}

export default function AristocraticShowcase({
  className = '',
  variant = 'showcase'
}: AristocraticShowcaseProps) {
  const { t, language } = useLanguage()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <motion.div
      className={cn(
        "w-full max-w-7xl mx-auto p-8",
        "bg-gradient-to-br from-slate-50 via-amber-50/30 to-slate-100",
        "rounded-3xl shadow-2xl border border-amber-200/50",
        className
      )}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Aristocratic Header */}
      <motion.div variants={itemVariants} className="text-center mb-12">
        <LuxuryHeading
          level={1}
          variant="aristocratic"
          gradient={true}
          sophistication="majestic"
          culturalAccent={true}
          goldLeaf={true}
          className="mb-6"
        >
          {language === 'pt' ? 'Componentes Aristocráticos' : 'Aristocratic Components'}
        </LuxuryHeading>
        
        <LuxuryText
          size="xl"
          variant="aristocratic"
          sophistication="opulent"
          culturalAccent={true}
          className="max-w-3xl mx-auto"
        >
          {language === 'pt' 
            ? 'Experiência de interface luxuosa para a comunidade portuguesa de elite em Londres'
            : 'Luxury interface experience for the elite Portuguese community in London'
          }
        </LuxuryText>

        <div className="flex justify-center gap-3 mt-6">
          <LuxuryBadge variant="portuguese" size="lg">🇵🇹 Portuguese Heritage</LuxuryBadge>
          <LuxuryBadge variant="premium" size="lg">👑 Elite Design</LuxuryBadge>
          <LuxuryBadge variant="success" size="lg">✨ Sophisticated</LuxuryBadge>
        </div>
      </motion.div>

      {/* Elite Button Showcase */}
      <motion.div variants={itemVariants} className="mb-16">
        <LuxuryHeading
          level={2}
          variant="heritage"
          sophistication="refined"
          className="mb-8 text-center"
        >
          {language === 'pt' ? 'Botões de Elite' : 'Elite Buttons'}
        </LuxuryHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Aristocratic Buttons */}
          <Glassmorphism
            variant="aristocratic"
            intensity="strong"
            sophistication="refined"
            culturalElements={true}
            luxuryFrame={true}
            padding="lg"
            className="space-y-4"
          >
            <h3 className="font-display font-bold text-red-800 mb-4 text-center">Aristocratic Collection</h3>
            <div className="space-y-3">
              <EliteButton
                variant="primary"
                aristocratic={true}
                sophistication="majestic"
                culturalElement={true}
                microAnimation="luxurious"
                fullWidth
              >
                Heritage Primary
              </EliteButton>
              <EliteButton
                variant="heritage"
                aristocratic={true}
                sophistication="opulent"
                hapticFeedback={true}
                fullWidth
              >
                Portuguese Heritage
              </EliteButton>
              <EliteButton
                variant="ghost"
                aristocratic={true}
                sophistication="refined"
                culturalElement={true}
                fullWidth
              >
                Elegant Ghost
              </EliteButton>
            </div>
          </Glassmorphism>

          {/* Royal Buttons */}
          <Glassmorphism
            variant="royal"
            intensity="ultra"
            sophistication="opulent"
            premiumEffects={true}
            padding="lg"
            className="space-y-4"
          >
            <h3 className="font-display font-bold text-purple-800 mb-4 text-center">Royal Collection</h3>
            <div className="space-y-3">
              <EliteButton
                variant="royal"
                luxury={true}
                sophistication="majestic"
                elevation="supreme"
                glow={true}
                fullWidth
              >
                Royal Majesty 👑
              </EliteButton>
              <EliteButton
                variant="premium"
                luxury={true}
                sophistication="opulent"
                shimmer={true}
                fullWidth
              >
                Premium Royal
              </EliteButton>
              <EliteButton
                variant="elite"
                luxury={true}
                sophistication="refined"
                fullWidth
              >
                Elite Class
              </EliteButton>
            </div>
          </Glassmorphism>

          {/* Imperial & Diamond Buttons */}
          <Glassmorphism
            variant="imperial"
            intensity="supreme"
            sophistication="majestic"
            luxuryFrame={true}
            premiumEffects={true}
            padding="lg"
            className="space-y-4"
          >
            <h3 className="font-display font-bold text-amber-800 mb-4 text-center">Imperial & Diamond</h3>
            <div className="space-y-3">
              <EliteButton
                variant="imperial"
                luxury={true}
                sophistication="majestic"
                elevation="supreme"
                shimmer={true}
                fullWidth
              >
                Imperial Gold 🦅
              </EliteButton>
              <EliteButton
                variant="diamond"
                luxury={true}
                sophistication="opulent"
                elevation="ultra"
                glow={true}
                fullWidth
              >
                Diamond Elite 💎
              </EliteButton>
              <EliteButton
                variant="platinum"
                luxury={true}
                sophistication="refined"
                fullWidth
              >
                Platinum Class
              </EliteButton>
            </div>
          </Glassmorphism>
        </div>
      </motion.div>

      {/* Sophisticated Glassmorphism Showcase */}
      <motion.div variants={itemVariants} className="mb-16">
        <LuxuryHeading
          level={2}
          variant="premium"
          sophistication="refined"
          className="mb-8 text-center"
        >
          {language === 'pt' ? 'Glassmorphism Sofisticado' : 'Sophisticated Glassmorphism'}
        </LuxuryHeading>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Aristocratic Glass Panel */}
          <Glassmorphism
            variant="aristocratic"
            intensity="supreme"
            sophistication="majestic"
            culturalElements={true}
            luxuryFrame={true}
            shadow="luxury"
            rounded="2xl"
            padding="xl"
            className="relative overflow-visible"
          >
            <div className="relative z-10">
              <LuxuryHeading
                level={3}
                variant="aristocratic"
                sophistication="opulent"
                culturalAccent={true}
              >
                Portuguese Aristocracy
              </LuxuryHeading>
              <LuxuryText
                variant="aristocratic"
                sophistication="refined"
                culturalAccent={true}
                className="mt-4"
              >
                Experience the sophisticated elegance of Portuguese heritage with our aristocratic 
                design system, crafted for the discerning tastes of London's elite Portuguese community.
              </LuxuryText>
              <div className="mt-6 flex gap-3">
                <EliteButton
                  variant="outline"
                  aristocratic={true}
                  size="sm"
                  sophistication="refined"
                >
                  Learn More
                </EliteButton>
                <EliteButton
                  variant="heritage"
                  aristocratic={true}
                  size="sm"
                  sophistication="opulent"
                >
                  Join Elite
                </EliteButton>
              </div>
            </div>
          </Glassmorphism>

          {/* Royal Glass Panel */}
          <Glassmorphism
            variant="royal"
            intensity="supreme"
            sophistication="majestic"
            premiumEffects={true}
            luxuryFrame={true}
            shadow="luxury"
            rounded="2xl"
            padding="xl"
          >
            <LuxuryHeading
              level={3}
              variant="royal"
              sophistication="opulent"
              goldLeaf={true}
            >
              Royal Experience 👑
            </LuxuryHeading>
            <LuxuryText
              variant="royal"
              sophistication="refined"
              className="mt-4"
            >
              Immerse yourself in royal luxury with our premium component library, 
              designed to elevate your user experience to aristocratic heights.
            </LuxuryText>
            <div className="mt-6 grid grid-cols-2 gap-3 text-center">
              <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                <LuxuryText size="2xl" weight="bold" variant="royal">750+</LuxuryText>
                <LuxuryText size="sm" variant="muted">Elite Members</LuxuryText>
              </div>
              <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                <LuxuryText size="2xl" weight="bold" variant="royal">95%</LuxuryText>
                <LuxuryText size="sm" variant="muted">Satisfaction</LuxuryText>
              </div>
            </div>
          </Glassmorphism>
        </div>
      </motion.div>

      {/* Typography Excellence */}
      <motion.div variants={itemVariants} className="mb-12">
        <LuxuryHeading
          level={2}
          variant="heritage"
          sophistication="refined"
          className="mb-8 text-center"
        >
          {language === 'pt' ? 'Tipografia de Luxo' : 'Luxury Typography'}
        </LuxuryHeading>

        <Glassmorphism
          variant="heritage"
          intensity="medium"
          sophistication="refined"
          padding="2xl"
          className="space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <LuxuryHeading level={4} variant="aristocratic" sophistication="opulent" culturalAccent={true}>
                Aristocratic Headings
              </LuxuryHeading>
              <LuxuryText variant="aristocratic" sophistication="refined" culturalAccent={true} className="mt-3">
                Our aristocratic typography system brings Portuguese cultural sophistication to every text element.
              </LuxuryText>
            </div>
            
            <div>
              <LuxuryHeading level={4} variant="royal" sophistication="opulent" goldLeaf={true}>
                Royal Typography 👑
              </LuxuryHeading>
              <LuxuryText variant="royal" sophistication="refined" className="mt-3">
                Experience royal elegance with premium typography designed for the most discerning users.
              </LuxuryText>
            </div>
          </div>

          <div className="border-t border-amber-200/30 pt-8">
            <LuxuryHeading level={3} variant="imperial" sophistication="majestic" centered={true} goldLeaf={true}>
              Imperial Excellence 🦅
            </LuxuryHeading>
            <LuxuryText 
              size="lg" 
              variant="imperial" 
              sophistication="opulent" 
              spacing="relaxed" 
              className="text-center mt-4 max-w-2xl mx-auto"
            >
              Our component library represents the pinnacle of design sophistication, 
              crafted exclusively for London's elite Portuguese community with uncompromising attention to cultural detail.
            </LuxuryText>
          </div>
        </Glassmorphism>
      </motion.div>

      {/* Cultural Heritage Footer */}
      <motion.div variants={itemVariants} className="text-center">
        <div className="flex justify-center items-center gap-4 text-amber-700">
          <span className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></span>
          <span className="text-2xl">🇵🇹</span>
          <span className="font-display font-semibold">LusoTown Aristocratic Design</span>
          <span className="text-2xl">👑</span>
          <span className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></span>
        </div>
        <LuxuryText variant="muted" size="sm" className="mt-4">
          {language === 'pt' 
            ? 'Experiência de luxo para a comunidade portuguesa de elite'
            : 'Luxury experience for the elite Portuguese community'
          }
        </LuxuryText>
      </motion.div>
    </motion.div>
  )
}

// Specialized showcase variants
export function AristocraticDemo({ className }: { className?: string }) {
  return <AristocraticShowcase variant="demo" className={className} />
}

export function ComponentGallery({ className }: { className?: string }) {
  return <AristocraticShowcase variant="gallery" className={className} />
}