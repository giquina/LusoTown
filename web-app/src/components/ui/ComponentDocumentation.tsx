'use client'

import React, { useState } from 'react'
import { 
  CodeBracketIcon,
  EyeIcon,
  DocumentDuplicateIcon,
  CheckIcon
} from '@heroicons/react/24/outline'
import {
  LuxuryCard,
  EliteButton,
  LuxuryHeading,
  LuxuryText,
  LuxuryBadge,
  GradientBackground,
  Glassmorphism,
  FadeIn,
  StaggerContainer,
  StaggerItem
} from './index'

interface CodeExampleProps {
  title: string
  description: string
  code: string
  preview: React.ReactNode
  category: string
}

function CodeExample({ title, description, code, preview, category }: CodeExampleProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview')
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <LuxuryCard variant="default" elevation="lg" className="overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start justify-between mb-3">
          <div>
            <LuxuryHeading level={4} variant="heritage">{title}</LuxuryHeading>
            <LuxuryText variant="muted" className="mt-1">{description}</LuxuryText>
          </div>
          <LuxuryBadge variant="default" size="sm">{category}</LuxuryBadge>
        </div>
        
        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'preview'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <EyeIcon className="w-4 h-4" />
            <span>Preview</span>
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'code'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <CodeBracketIcon className="w-4 h-4" />
            <span>Code</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="relative">
        {activeTab === 'preview' && (
          <div className="p-8 bg-gradient-to-br from-gray-50 to-white">
            {preview}
          </div>
        )}

        {activeTab === 'code' && (
          <div className="relative">
            <button
              onClick={copyToClipboard}
              className="absolute top-4 right-4 p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors z-10"
              title="Copy to clipboard"
            >
              {copied ? (
                <CheckIcon className="w-4 h-4" />
              ) : (
                <DocumentDuplicateIcon className="w-4 h-4" />
              )}
            </button>
            <pre className="p-6 bg-gray-900 text-gray-100 text-sm overflow-x-auto">
              <code>{code}</code>
            </pre>
          </div>
        )}
      </div>
    </LuxuryCard>
  )
}

export default function ComponentDocumentation() {
  const examples: CodeExampleProps[] = [
    {
      title: "Luxury Card with Heritage Variant",
      description: "Premium card design with Lusophone cultural elements and glassmorphism effects",
      category: "Cards",
      code: `<LuxuryCard variant="heritage" elevation="xl" className="p-8">
  <div className="text-center">
    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full mx-auto mb-4 flex items-center justify-center">
      <StarIcon className="w-8 h-8 text-white" />
    </div>
    <LuxuryHeading level={4} variant="heritage">
      Heritage Premium
    </LuxuryHeading>
    <LuxuryText variant="muted" className="mt-2">
      Experience the finest Portuguese-speaking community features.
    </LuxuryText>
    <div className="mt-6">
      <EliteButton variant="heritage" size="md" fullWidth>
        Discover More
      </EliteButton>
    </div>
  </div>
</LuxuryCard>`,
      preview: (
        <LuxuryCard variant="heritage" elevation="xl" className="p-8 max-w-sm mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-2xl">⭐</span>
            </div>
            <LuxuryHeading level={4} variant="heritage">
              Heritage Premium
            </LuxuryHeading>
            <LuxuryText variant="muted" className="mt-2">
              Experience the finest Portuguese-speaking community features.
            </LuxuryText>
            <div className="mt-6">
              <EliteButton variant="heritage" size="md" fullWidth>
                Discover More
              </EliteButton>
            </div>
          </div>
        </LuxuryCard>
      )
    },
    {
      title: "Elite Button with Lusophone Style",
      description: "Sophisticated button with Portuguese flag colors and luxury interactions",
      category: "Buttons",
      code: `<EliteButton 
  variant="heritage" 
  size="lg" 
  luxury 
  portuguese
  icon={<CrownIcon className="w-5 h-5" />}
>
  Join Portuguese-speaking community
</EliteButton>`,
      preview: (
        <div className="flex justify-center">
          <EliteButton 
            variant="heritage" 
            size="lg" 
            luxury 
            portuguese
            icon={<span className="text-lg">👑</span>}
          >
            Join Portuguese-speaking community
          </EliteButton>
        </div>
      )
    },
    {
      title: "Glassmorphism Card",
      description: "Modern glass-like effects with backdrop blur and transparency",
      category: "Cards",
      code: `<LuxuryCard 
  variant="glassmorphism" 
  className="p-8 bg-white/60 backdrop-blur-xl border-white/30"
>
  <Glassmorphism blur="xl" opacity={60} className="p-6">
    <LuxuryHeading level={4} variant="coral">
      Glassmorphism Design
    </LuxuryHeading>
    <LuxuryText variant="muted" className="mt-2">
      Modern glass-like effects with premium aesthetics.
    </LuxuryText>
  </Glassmorphism>
</LuxuryCard>`,
      preview: (
        <div className="bg-gradient-to-br from-primary-100 to-secondary-100 p-4 rounded-lg">
          <LuxuryCard 
            variant="glassmorphism" 
            className="p-8 bg-white/60 backdrop-blur-xl border-white/30 max-w-sm mx-auto"
          >
            <Glassmorphism blur="xl" opacity={60} className="p-6">
              <LuxuryHeading level={4} variant="coral">
                Glassmorphism Design
              </LuxuryHeading>
              <LuxuryText variant="muted" className="mt-2">
                Modern glass-like effects with premium aesthetics.
              </LuxuryText>
            </Glassmorphism>
          </LuxuryCard>
        </div>
      )
    },
    {
      title: "Lusophone Heritage Typography",
      description: "Gradient text with Portuguese flag colors and luxury typography",
      category: "Typography",
      code: `<LuxuryHeading 
  level={1} 
  variant="portuguese" 
  gradient
  className="text-center"
>
  Bem-vindos à Comunidade
</LuxuryHeading>

<LuxuryText size="lg" variant="muted" className="text-center mt-4">
  Welcome to the Portuguese-speaking community platform
</LuxuryText>`,
      preview: (
        <div className="text-center">
          <LuxuryHeading 
            level={2} 
            variant="portuguese" 
            gradient
            className="text-center"
          >
            Bem-vindos à Comunidade
          </LuxuryHeading>
          <LuxuryText size="lg" variant="muted" className="text-center mt-4">
            Welcome to the Portuguese-speaking community platform
          </LuxuryText>
        </div>
      )
    },
    {
      title: "Premium Badge Collection",
      description: "Sophisticated badges with Lusophone cultural variants",
      category: "Components",
      code: `<div className="flex flex-wrap gap-3">
  <LuxuryBadge variant="portuguese" size="lg">
    Lusophone Heritage
  </LuxuryBadge>
  <LuxuryBadge variant="premium" size="lg">
    Premium Member
  </LuxuryBadge>
  <LuxuryBadge variant="success" size="lg">
    Verified
  </LuxuryBadge>
</div>`,
      preview: (
        <div className="flex flex-wrap gap-3 justify-center">
          <LuxuryBadge variant="portuguese" size="lg">
            Lusophone Heritage
          </LuxuryBadge>
          <LuxuryBadge variant="premium" size="lg">
            Premium Member
          </LuxuryBadge>
          <LuxuryBadge variant="success" size="lg">
            Verified
          </LuxuryBadge>
        </div>
      )
    },
    {
      title: "Animated Stagger Container",
      description: "Smooth entrance animations with staggered timing for multiple elements",
      category: "Animations",
      code: `<StaggerContainer className="space-y-4">
  <StaggerItem>
    <LuxuryCard className="p-6">
      <LuxuryText>First animated item</LuxuryText>
    </LuxuryCard>
  </StaggerItem>
  <StaggerItem>
    <LuxuryCard className="p-6">
      <LuxuryText>Second animated item</LuxuryText>
    </LuxuryCard>
  </StaggerItem>
  <StaggerItem>
    <LuxuryCard className="p-6">
      <LuxuryText>Third animated item</LuxuryText>
    </LuxuryCard>
  </StaggerItem>
</StaggerContainer>`,
      preview: (
        <StaggerContainer className="space-y-4">
          <StaggerItem>
            <LuxuryCard className="p-6">
              <LuxuryText>First animated item</LuxuryText>
            </LuxuryCard>
          </StaggerItem>
          <StaggerItem>
            <LuxuryCard className="p-6">
              <LuxuryText>Second animated item</LuxuryText>
            </LuxuryCard>
          </StaggerItem>
          <StaggerItem>
            <LuxuryCard className="p-6">
              <LuxuryText>Third animated item</LuxuryText>
            </LuxuryCard>
          </StaggerItem>
        </StaggerContainer>
      )
    }
  ]

  const categories = ["All", "Cards", "Buttons", "Typography", "Components", "Animations"]
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredExamples = selectedCategory === "All" 
    ? examples 
    : examples.filter(example => example.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20">
      <GradientBackground variant="heritage" className="py-20 px-6">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <FadeIn>
            <LuxuryHeading level={1} className="text-white mb-6">
              Component Documentation
            </LuxuryHeading>
            <LuxuryText size="xl" className="text-white/90 mb-8">
              Comprehensive examples and usage patterns for the LusoTown luxury component library
            </LuxuryText>
          </FadeIn>
        </div>
      </GradientBackground>

      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-primary-300 hover:text-primary-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Examples Grid */}
        <StaggerContainer className="space-y-12">
          {filteredExamples.map((example, index) => (
            <StaggerItem key={index}>
              <CodeExample {...example} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Footer */}
        <div className="mt-20 text-center">
          <LuxuryCard variant="heritage" className="p-12">
            <LuxuryHeading level={3} variant="heritage" gradient className="mb-4">
              Ready to Build with Luxury?
            </LuxuryHeading>
            <LuxuryText size="lg" variant="muted" className="mb-8 max-w-2xl mx-auto">
              Start creating sophisticated Portuguese-speaking community features with our premium component library.
              Every component is designed with cultural authenticity and luxury aesthetics.
            </LuxuryText>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <EliteButton variant="heritage" size="lg" luxury portuguese>
                Start Building
              </EliteButton>
              <EliteButton variant="outline" size="lg">
                View Full API
              </EliteButton>
            </div>
          </LuxuryCard>
        </div>
      </div>
    </div>
  )
}