'use client'

import React from 'react'
import { useHeritage } from '@/context/HeritageContext'
import { HeritageColorDebugger } from '@/components/HeritageColorMigrationUtility'
import {
  HeritageButton,
  HeritageCard,
  HeritageBadge,
  HeritageGradientText,
  HeritageIcon,
  HeritageProgressBar
} from '@/components/HeritageStyleProvider'
import { HeartIcon, StarIcon, GlobeEuropeAfricaIcon } from '@heroicons/react/24/outline'

/**
 * Heritage Color System Demo Page
 * Demonstrates the heritage-configurable color system in action
 * Shows how the same components adapt to different heritage configurations
 */
export default function HeritageDemo() {
  const { heritage, heritageCode, setHeritage, availableHeritages } = useHeritage()

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <HeritageGradientText variant="brand" className="text-4xl md:text-5xl mb-4">
            Heritage Color System Demo
          </HeritageGradientText>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Experience how the same components adapt to different cultural heritage configurations.
            Switch between heritage communities to see the colors change instantly.
          </p>
        </div>

        {/* Heritage Selector */}
        <HeritageCard variant="gradient" className="p-8 mb-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6 heritage-text-primary">
              Select Heritage Community
            </h2>
            <div className="flex justify-center gap-4 flex-wrap">
              {availableHeritages.map((heritageOption) => (
                <button
                  key={heritageOption.code}
                  onClick={() => setHeritage(heritageOption.code)}
                  className={`heritage-card p-4 min-w-[120px] transition-all duration-200 ${
                    heritageCode === heritageOption.code
                      ? 'heritage-bg-primary text-white shadow-lg scale-105'
                      : 'hover:shadow-md'
                  }`}
                >
                  <div className="text-2xl mb-2">{heritageOption.flag}</div>
                  <div className="font-semibold">{heritageOption.name}</div>
                  {heritageCode === heritageOption.code && (
                    <div className="text-xs mt-1 opacity-90">Active</div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </HeritageCard>

        {/* Current Heritage Info */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <HeritageCard variant="primary" className="p-6">
            <h3 className="text-xl font-bold mb-4 heritage-text-primary">
              Current Heritage: {heritage.identity.name}
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Tagline:</span>
                <span>{heritage.identity.tagline.native}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">English:</span>
                <span>{heritage.identity.tagline.english}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Symbol:</span>
                <span className="text-2xl">{heritage.branding.symbols.flag}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Code:</span>
                <HeritageBadge variant="primary">{heritage.identity.code.toUpperCase()}</HeritageBadge>
              </div>
            </div>
          </HeritageCard>

          <HeritageCard variant="accent" className="p-6">
            <h3 className="text-xl font-bold mb-4 heritage-text-primary">Color Palette</h3>
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(heritage.branding.colors).map(([colorName, colorValue]) => (
                <div key={colorName} className="text-center">
                  <div 
                    className="w-12 h-12 rounded-lg mx-auto mb-2 shadow-md"
                    style={{ backgroundColor: colorValue }}
                  ></div>
                  <div className="text-xs font-semibold capitalize">{colorName}</div>
                  <div className="text-xs text-gray-500 font-mono">{colorValue}</div>
                </div>
              ))}
            </div>
          </HeritageCard>
        </div>

        {/* Button Showcase */}
        <HeritageCard className="p-8 mb-12">
          <h3 className="text-2xl font-bold mb-6 heritage-text-primary text-center">
            Heritage-Aware Buttons
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <HeritageButton variant="primary" size="lg">
              Primary Button
            </HeritageButton>
            <HeritageButton variant="secondary" size="lg">
              Secondary Button
            </HeritageButton>
            <HeritageButton variant="accent" size="lg">
              Accent Button
            </HeritageButton>
            <HeritageButton variant="action" size="lg">
              Action Button
            </HeritageButton>
            <HeritageButton variant="outline" size="lg">
              Outline Button
            </HeritageButton>
            <HeritageButton variant="ghost" size="lg">
              Ghost Button
            </HeritageButton>
          </div>
        </HeritageCard>

        {/* CSS Utility Classes Demo */}
        <HeritageCard className="p-8 mb-12">
          <h3 className="text-2xl font-bold mb-6 heritage-text-primary text-center">
            CSS Utility Classes
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Buttons with utility classes */}
            <div className="heritage-card p-4">
              <h4 className="font-semibold mb-3 heritage-text-primary">Buttons</h4>
              <div className="space-y-2">
                <button className="heritage-btn-primary w-full px-4 py-2">Primary</button>
                <button className="heritage-btn-secondary w-full px-4 py-2">Secondary</button>
                <button className="heritage-btn-outline w-full px-4 py-2">Outline</button>
              </div>
            </div>

            {/* Badges */}
            <div className="heritage-card p-4">
              <h4 className="font-semibold mb-3 heritage-text-primary">Badges</h4>
              <div className="flex flex-wrap gap-2">
                <span className="heritage-badge-primary">Primary</span>
                <span className="heritage-badge-secondary">Secondary</span>
                <span className="heritage-badge-accent">Accent</span>
                <span className="heritage-badge-action">Action</span>
                <span className="heritage-badge-premium">Premium</span>
              </div>
            </div>

            {/* Progress Bars */}
            <div className="heritage-card p-4">
              <h4 className="font-semibold mb-3 heritage-text-primary">Progress</h4>
              <div className="space-y-3">
                <div className="heritage-progress heritage-progress-sm">
                  <div className="heritage-progress-bar" style={{ width: '75%' }}></div>
                </div>
                <div className="heritage-progress heritage-progress-md">
                  <div className="heritage-progress-bar" style={{ width: '60%' }}></div>
                </div>
                <div className="heritage-progress heritage-progress-lg">
                  <div className="heritage-progress-bar" style={{ width: '90%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </HeritageCard>

        {/* Icons and Backgrounds */}
        <HeritageCard className="p-8 mb-12">
          <h3 className="text-2xl font-bold mb-6 heritage-text-primary text-center">
            Heritage Icons & Backgrounds
          </h3>
          <div className="flex justify-center gap-6 flex-wrap">
            <div className="text-center">
              <div className="heritage-icon-primary heritage-icon-container-lg mb-2">
                <HeartIcon className="w-8 h-8" />
              </div>
              <div className="text-sm">Primary</div>
            </div>
            <div className="text-center">
              <div className="heritage-icon-secondary heritage-icon-container-lg mb-2">
                <StarIcon className="w-8 h-8" />
              </div>
              <div className="text-sm">Secondary</div>
            </div>
            <div className="text-center">
              <div className="heritage-icon-accent heritage-icon-container-lg mb-2">
                <GlobeEuropeAfricaIcon className="w-8 h-8" />
              </div>
              <div className="text-sm">Accent</div>
            </div>
            <div className="text-center">
              <div className="heritage-icon-action heritage-icon-container-lg mb-2">
                <HeartIcon className="w-8 h-8" />
              </div>
              <div className="text-sm">Action</div>
            </div>
            <div className="text-center">
              <div className="heritage-icon-premium heritage-icon-container-lg mb-2">
                <StarIcon className="w-8 h-8" />
              </div>
              <div className="text-sm">Premium</div>
            </div>
          </div>
        </HeritageCard>

        {/* Gradient Showcase */}
        <HeritageCard className="p-8 mb-12">
          <h3 className="text-2xl font-bold mb-6 heritage-text-primary text-center">
            Heritage Gradients
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="heritage-gradient-primary text-white p-6 rounded-lg text-center font-semibold">
              Primary Gradient
            </div>
            <div className="heritage-gradient-secondary text-white p-6 rounded-lg text-center font-semibold">
              Secondary Gradient
            </div>
            <div className="heritage-gradient-accent text-white p-6 rounded-lg text-center font-semibold">
              Accent Gradient
            </div>
            <div className="heritage-gradient-action text-white p-6 rounded-lg text-center font-semibold">
              Action Gradient
            </div>
            <div className="heritage-gradient-premium text-white p-6 rounded-lg text-center font-semibold">
              Premium Gradient
            </div>
            <div className="heritage-gradient-brand text-white p-6 rounded-lg text-center font-semibold">
              Brand Gradient
            </div>
          </div>
        </HeritageCard>

        {/* Text Gradients */}
        <HeritageCard className="p-8 mb-12">
          <h3 className="text-2xl font-bold mb-6 heritage-text-primary text-center">
            Heritage Text Gradients
          </h3>
          <div className="text-center space-y-4">
            <div className="heritage-text-gradient-primary text-4xl">
              Primary Text Gradient
            </div>
            <div className="heritage-text-gradient-brand text-4xl">
              Brand Text Gradient
            </div>
          </div>
        </HeritageCard>

        {/* Alerts */}
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          <div className="heritage-alert-primary">
            <strong>Primary Alert:</strong> This is a primary heritage-aware alert message.
          </div>
          <div className="heritage-alert-secondary">
            <strong>Success Alert:</strong> This is a secondary heritage-aware alert message.
          </div>
          <div className="heritage-alert-accent">
            <strong>Warning Alert:</strong> This is an accent heritage-aware alert message.
          </div>
          <div className="heritage-alert-action">
            <strong>Error Alert:</strong> This is an action heritage-aware alert message.
          </div>
        </div>

        {/* Migration Example */}
        <HeritageCard className="p-8 mb-12">
          <h3 className="text-2xl font-bold mb-6 heritage-text-primary text-center">
            Before & After Migration
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-4 text-red-600">❌ Before (Hardcoded Portuguese)</h4>
              <div className="space-y-3">
                <button 
                  className="w-full px-4 py-2 text-white font-semibold rounded"
                  style={{ backgroundColor: '#1e40af' }}
                >
                  Hardcoded Blue Button
                </button>
                <div 
                  className="p-4 text-white rounded"
                  style={{ backgroundColor: '#059669' }}
                >
                  Hardcoded Green Background
                </div>
                <div 
                  className="p-2 rounded text-xs font-semibold"
                  style={{ backgroundColor: '#fef3c7', color: '#92400e' }}
                >
                  Hardcoded Badge
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-green-600">✅ After (Heritage-Aware)</h4>
              <div className="space-y-3">
                <button className="heritage-btn-primary w-full px-4 py-2">
                  Heritage Button
                </button>
                <div className="heritage-bg-secondary text-white p-4 rounded">
                  Heritage Background
                </div>
                <span className="heritage-badge-accent">
                  Heritage Badge
                </span>
              </div>
            </div>
          </div>
        </HeritageCard>

        {/* Technical Details */}
        <HeritageCard className="p-8">
          <h3 className="text-2xl font-bold mb-6 heritage-text-primary text-center">
            Technical Implementation
          </h3>
          <div className="space-y-4 text-sm">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-2 heritage-text-secondary">CSS Custom Properties</h4>
                <div className="bg-gray-100 p-3 rounded font-mono text-xs">
                  --heritage-primary: {heritage.branding.colors.primary}<br/>
                  --heritage-secondary: {heritage.branding.colors.secondary}<br/>
                  --heritage-accent: {heritage.branding.colors.accent}<br/>
                  --heritage-action: {heritage.branding.colors.action}<br/>
                  --heritage-premium: {heritage.branding.colors.premium}<br/>
                  --heritage-coral: {heritage.branding.colors.coral}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2 heritage-text-secondary">React Context</h4>
                <div className="bg-gray-100 p-3 rounded font-mono text-xs">
                  Heritage Code: {heritageCode}<br/>
                  Name: {heritage.identity.name}<br/>
                  Available: {availableHeritages.length} heritages<br/>
                  Persisted: localStorage<br/>
                  Dynamic: CSS custom properties<br/>
                  Performance: Instant switching
                </div>
              </div>
            </div>
          </div>
        </HeritageCard>

        {/* Development Debugger */}
        {process.env.NODE_ENV === 'development' && <HeritageColorDebugger />}
      </div>
    </div>
  )
}