'use client'

import React from 'react'
import { 
  StarIcon, 
  HeartIcon, 
  UserGroupIcon,
  SparklesIcon,
  CrownIcon,
  GlobeAltIcon
} from '@heroicons/react/24/solid'
import {
  LuxuryCard,
  EliteButton,
  LuxuryHeading,
  LuxuryText,
  LuxuryBadge,
  LuxuryStats,
  GradientBackground,
  GradientText,
  Glassmorphism,
  PortugueseFlagLoader,
  LoadingSpinner,
  FadeIn,
  StaggerContainer,
  StaggerItem,
  HoverLift,
  TypewriterText,
  CountUp,
  FloatingElement
} from './index'

export default function LuxuryShowcase() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/30">
      {/* Hero Section with Portuguese Heritage */}
      <GradientBackground variant="portuguese" className="relative py-20 px-6">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-6xl mx-auto text-center text-white">
          <FadeIn>
            <LuxuryHeading level={1} className="text-white mb-6">
              <TypewriterText 
                text="LusoTown Premium UI" 
                speed={100}
                className="font-display"
              />
            </LuxuryHeading>
          </FadeIn>
          
          <FadeIn delay={1}>
            <LuxuryText size="xl" className="text-white/90 mb-8 max-w-3xl mx-auto">
              A sophisticated component library celebrating Portuguese heritage with luxury design elements, 
              glassmorphism effects, and premium interactions.
            </LuxuryText>
          </FadeIn>

          <FadeIn delay={1.5}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <EliteButton 
                variant="heritage" 
                size="lg" 
                luxury 
                portuguese
                icon={<CrownIcon className="w-5 h-5" />}
              >
                Explore Premium Components
              </EliteButton>
              <EliteButton 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-gray-900"
              >
                View Documentation
              </EliteButton>
            </div>
          </FadeIn>
        </div>

        {/* Floating Portuguese elements */}
        <FloatingElement amplitude={15} duration={4} className="absolute top-20 left-10">
          <div className="w-16 h-16 bg-white/20 rounded-full backdrop-blur-sm flex items-center justify-center">
            <GlobeAltIcon className="w-8 h-8 text-white" />
          </div>
        </FloatingElement>
        
        <FloatingElement amplitude={20} duration={5} className="absolute top-32 right-20">
          <div className="w-12 h-12 bg-white/20 rounded-full backdrop-blur-sm flex items-center justify-center">
            <HeartIcon className="w-6 h-6 text-white" />
          </div>
        </FloatingElement>
      </GradientBackground>

      {/* Component Showcase Grid */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <StaggerContainer className="space-y-20">
          
          {/* Cards Section */}
          <StaggerItem>
            <div className="text-center mb-12">
              <LuxuryHeading level={2} variant="heritage" gradient>
                Premium Card Designs
              </LuxuryHeading>
              <LuxuryText variant="muted" size="lg" className="mt-4">
                Sophisticated cards with glassmorphism effects and Portuguese cultural elements
              </LuxuryText>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <HoverLift>
                <LuxuryCard variant="heritage" elevation="xl" className="p-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <StarIcon className="w-8 h-8 text-white" />
                    </div>
                    <LuxuryHeading level={4} variant="heritage">
                      Heritage Premium
                    </LuxuryHeading>
                    <LuxuryText variant="muted" className="mt-2">
                      Experience the finest Portuguese community features with luxury design.
                    </LuxuryText>
                    <div className="mt-6">
                      <EliteButton variant="heritage" size="md" fullWidth>
                        Discover More
                      </EliteButton>
                    </div>
                  </div>
                </LuxuryCard>
              </HoverLift>

              <HoverLift>
                <LuxuryCard variant="glassmorphism" className="p-8 bg-white/60 backdrop-blur-xl border-white/30">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-coral-500 to-accent-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <SparklesIcon className="w-8 h-8 text-white" />
                    </div>
                    <LuxuryHeading level={4} variant="coral">
                      Glassmorphism
                    </LuxuryHeading>
                    <LuxuryText variant="muted" className="mt-2">
                      Modern glass-like effects with premium Portuguese aesthetics.
                    </LuxuryText>
                    <div className="mt-6">
                      <EliteButton variant="coral" size="md" fullWidth luxury>
                        Experience Glass
                      </EliteButton>
                    </div>
                  </div>
                </LuxuryCard>
              </HoverLift>

              <HoverLift>
                <LuxuryCard variant="premium" elevation="2xl" className="p-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-premium-500 to-premium-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <CrownIcon className="w-8 h-8 text-white" />
                    </div>
                    <LuxuryHeading level={4} variant="premium">
                      Elite Premium
                    </LuxuryHeading>
                    <LuxuryText variant="muted" className="mt-2">
                      The ultimate premium experience for distinguished community members.
                    </LuxuryText>
                    <div className="mt-6">
                      <EliteButton variant="premium" size="md" fullWidth luxury>
                        Join Elite
                      </EliteButton>
                    </div>
                  </div>
                </LuxuryCard>
              </HoverLift>
            </div>
          </StaggerItem>

          {/* Typography Section */}
          <StaggerItem>
            <LuxuryCard variant="heritage" className="p-12">
              <div className="text-center mb-8">
                <LuxuryHeading level={2} variant="heritage" gradient>
                  Luxury Typography System
                </LuxuryHeading>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div>
                    <LuxuryHeading level={1} variant="portuguese" gradient>
                      Portuguese Heritage
                    </LuxuryHeading>
                    <LuxuryText variant="muted">Display Large - Portuguese Colors</LuxuryText>
                  </div>
                  
                  <div>
                    <LuxuryHeading level={2} variant="premium">
                      Premium Elegance
                    </LuxuryHeading>
                    <LuxuryText variant="muted">Display Medium - Premium Purple</LuxuryText>
                  </div>
                  
                  <div>
                    <LuxuryHeading level={3} variant="heritage">
                      Community Heritage
                    </LuxuryHeading>
                    <LuxuryText variant="muted">Display Small - Heritage Blue</LuxuryText>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex flex-wrap gap-3">
                    <LuxuryBadge variant="portuguese" size="lg">Portuguese</LuxuryBadge>
                    <LuxuryBadge variant="premium" size="lg">Premium</LuxuryBadge>
                    <LuxuryBadge variant="success" size="lg">Success</LuxuryBadge>
                  </div>

                  <div className="grid grid-cols-3 gap-6 text-center">
                    <LuxuryStats 
                      value={<CountUp end={1250} prefix="+" />}
                      label="Community Members"
                      variant="portuguese"
                      size="md"
                    />
                    <LuxuryStats 
                      value={<CountUp end={89} suffix="%" />}
                      label="Satisfaction Rate"
                      variant="premium"
                      size="md"
                    />
                    <LuxuryStats 
                      value={<CountUp end={47} />}
                      label="Cities Connected"
                      variant="default"
                      size="md"
                    />
                  </div>
                </div>
              </div>
            </LuxuryCard>
          </StaggerItem>

          {/* Buttons & Interactions Section */}
          <StaggerItem>
            <div className="text-center mb-12">
              <LuxuryHeading level={2} variant="heritage" gradient>
                Elite Button Collection
              </LuxuryHeading>
              <LuxuryText variant="muted" size="lg" className="mt-4">
                Refined interactions with Portuguese cultural sophistication
              </LuxuryText>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="space-y-4">
                <LuxuryText weight="semibold" className="text-center">Portuguese Heritage</LuxuryText>
                <EliteButton variant="heritage" size="lg" fullWidth portuguese>
                  Heritage Style
                </EliteButton>
                <EliteButton variant="primary" size="md" fullWidth portuguese>
                  Primary Portuguese
                </EliteButton>
                <EliteButton variant="outline" size="sm" fullWidth className="border-red-500 text-red-600">
                  Outline Portuguese
                </EliteButton>
              </div>

              <div className="space-y-4">
                <LuxuryText weight="semibold" className="text-center">Luxury Premium</LuxuryText>
                <EliteButton variant="premium" size="lg" fullWidth luxury>
                  Premium Luxury
                </EliteButton>
                <EliteButton variant="secondary" size="md" fullWidth luxury>
                  Secondary Luxury
                </EliteButton>
                <EliteButton variant="ghost" size="sm" fullWidth>
                  Ghost Luxury
                </EliteButton>
              </div>

              <div className="space-y-4">
                <LuxuryText weight="semibold" className="text-center">Coral Collection</LuxuryText>
                <EliteButton variant="coral" size="lg" fullWidth luxury>
                  Coral Luxury
                </EliteButton>
                <EliteButton variant="coral" size="md" fullWidth>
                  Coral Standard
                </EliteButton>
                <EliteButton variant="outline" size="sm" fullWidth className="border-coral-500 text-coral-600">
                  Coral Outline
                </EliteButton>
              </div>

              <div className="space-y-4">
                <LuxuryText weight="semibold" className="text-center">With Icons</LuxuryText>
                <EliteButton 
                  variant="heritage" 
                  size="lg" 
                  fullWidth 
                  icon={<UserGroupIcon className="w-5 h-5" />}
                  portuguese
                >
                  Join Community
                </EliteButton>
                <EliteButton 
                  variant="premium" 
                  size="md" 
                  fullWidth 
                  icon={<CrownIcon className="w-4 h-4" />}
                  iconPosition="right"
                  luxury
                >
                  Go Premium
                </EliteButton>
                <EliteButton 
                  variant="coral" 
                  size="sm" 
                  fullWidth 
                  icon={<HeartIcon className="w-4 h-4" />}
                >
                  Favorite
                </EliteButton>
              </div>
            </div>
          </StaggerItem>

          {/* Loading Components Section */}
          <StaggerItem>
            <LuxuryCard variant="glassmorphism" className="p-12 bg-white/40 backdrop-blur-2xl">
              <div className="text-center mb-12">
                <LuxuryHeading level={2} variant="heritage" gradient>
                  Premium Loading Components
                </LuxuryHeading>
                <LuxuryText variant="muted" size="lg" className="mt-4">
                  Sophisticated loading states with Portuguese cultural elements
                </LuxuryText>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                <div className="space-y-4">
                  <LuxuryText weight="semibold">Portuguese Flag</LuxuryText>
                  <div className="flex justify-center">
                    <PortugueseFlagLoader size="lg" />
                  </div>
                </div>

                <div className="space-y-4">
                  <LuxuryText weight="semibold">Heritage Spinner</LuxuryText>
                  <div className="flex justify-center">
                    <LoadingSpinner size="xl" variant="primary" />
                  </div>
                </div>

                <div className="space-y-4">
                  <LuxuryText weight="semibold">Premium Spinner</LuxuryText>
                  <div className="flex justify-center">
                    <LoadingSpinner size="xl" variant="premium" />
                  </div>
                </div>

                <div className="space-y-4">
                  <LuxuryText weight="semibold">Portuguese Spinner</LuxuryText>
                  <div className="flex justify-center">
                    <LoadingSpinner size="xl" variant="portuguese" />
                  </div>
                </div>
              </div>
            </LuxuryCard>
          </StaggerItem>

          {/* Gradient Text Examples */}
          <StaggerItem>
            <div className="text-center space-y-8">
              <div>
                <GradientText variant="portuguese" size="3xl" className="font-display">
                  Bem-vindos à Comunidade Portuguesa
                </GradientText>
                <LuxuryText variant="muted" size="lg" className="mt-2">
                  Portuguese Gradient Text - Heritage Colors
                </LuxuryText>
              </div>

              <div>
                <GradientText variant="luxury" size="2xl" className="font-display">
                  Premium Luxury Experience
                </GradientText>
                <LuxuryText variant="muted" className="mt-2">
                  Luxury Gradient - Premium Purple Tones
                </LuxuryText>
              </div>

              <div>
                <GradientText variant="heritage" size="xl" className="font-display">
                  Heritage Community Platform
                </GradientText>
                <LuxuryText variant="muted" className="mt-2">
                  Heritage Gradient - Community Brand Colors
                </LuxuryText>
              </div>
            </div>
          </StaggerItem>

        </StaggerContainer>
      </div>
    </div>
  )
}