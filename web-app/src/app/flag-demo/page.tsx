'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  HeaderFlag,
  FooterFlag,
  CulturalFlag,
  CardFlag,
  SubtleFlagBackground,
  CulturalMosaicBackground,
  HeritageWaveBackground,
  FlagGradientBackground,
  CardHeaderAccent,
  CardFooterAccent,
  SectionDividerAccent,
  EventCardAccent,
  SuccessStoryAccent,
  LusophoneCulturalShowcase,
  HeroLusophoneIntegration,
  FeaturesLusophoneIntegration,
  TestimonialsLusophoneIntegration,
  EventsLusophoneIntegration,
  LusophoneEventCardEnhancement,
  LusophoneSuccessStoryCard,
  LusophoneBusinessCard
} from '@/components/lusophone-flags';
import { useLanguage } from '@/context/LanguageContext';
import { LUSOPHONE_FLAGS } from '@/config/lusophone-flags';

/**
 * Comprehensive demonstration of the Lusophone Flag System
 * Showcases all components and integration possibilities
 */
export default function FlagDemoPage() {
  const { t, currentLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <section className="bg-white shadow-sm relative overflow-hidden">
        <SubtleFlagBackground opacity={0.03} />
        <div className="container-width py-12 relative z-10">
          <div className="text-center">
            <motion.h1 
              className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Lusophone Flag System
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Celebrating all 8 Portuguese-speaking nations with rotating displays, 
              cultural backgrounds, and respectful visual integration
            </motion.p>
            
            {/* Demo Flag Rotation */}
            <motion.div 
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <CulturalFlag 
                enableClick={true}
                showContinents={true}
                prioritizePrimary={false}
              />
            </motion.div>
          </div>
        </div>
        <SectionDividerAccent 
          position="bottom"
          style="gradient"
          thickness="medium"
          animate={true}
        />
      </section>

      {/* Flag Display Variations */}
      <section className="py-16 bg-white">
        <div className="container-width">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Flag Display Variations
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Header Flag */}
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <h3 className="font-semibold text-gray-800 mb-4">Header Flag</h3>
              <div className="bg-white rounded-md p-4 shadow-sm">
                <HeaderFlag 
                  enableClick={true}
                  showContinents={false}
                />
              </div>
              <p className="text-sm text-gray-600 mt-3">
                Compact display for navigation areas
              </p>
            </div>

            {/* Footer Flag */}
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <h3 className="font-semibold text-gray-800 mb-4">Footer Flag</h3>
              <div className="bg-white rounded-md p-4 shadow-sm">
                <FooterFlag 
                  enableClick={true}
                  showContinents={true}
                />
              </div>
              <p className="text-sm text-gray-600 mt-3">
                Enhanced display with cultural quotes
              </p>
            </div>

            {/* Cultural Flag */}
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <h3 className="font-semibold text-gray-800 mb-4">Cultural Flag</h3>
              <div className="bg-white rounded-md p-4 shadow-sm">
                <CulturalFlag 
                  enableClick={true}
                  showContinents={true}
                />
              </div>
              <p className="text-sm text-gray-600 mt-3">
                Large display for cultural sections
              </p>
            </div>

            {/* Card Flag */}
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <h3 className="font-semibold text-gray-800 mb-4">Card Flag</h3>
              <div className="bg-white rounded-md p-4 shadow-sm">
                <CardFlag 
                  enableClick={false}
                  showContinents={false}
                />
              </div>
              <p className="text-sm text-gray-600 mt-3">
                Minimal display for card elements
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Background Pattern Variations */}
      <section className="py-16 bg-gray-100">
        <div className="container-width">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Background Pattern Variations
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Subtle Background */}
            <div className="relative bg-white rounded-lg p-8 h-64 overflow-hidden">
              <SubtleFlagBackground opacity={0.1} />
              <div className="relative z-10 text-center">
                <h3 className="font-semibold text-gray-800 mb-4">Subtle Background</h3>
                <p className="text-gray-600">
                  Floating flag symbols with gentle movement
                </p>
              </div>
            </div>

            {/* Mosaic Background */}
            <div className="relative bg-white rounded-lg p-8 h-64 overflow-hidden">
              <CulturalMosaicBackground opacity={0.08} />
              <div className="relative z-10 text-center">
                <h3 className="font-semibold text-gray-800 mb-4">Cultural Mosaic</h3>
                <p className="text-gray-600">
                  Grid pattern of all 8 nation flags
                </p>
              </div>
            </div>

            {/* Heritage Wave */}
            <div className="relative bg-white rounded-lg p-8 h-64 overflow-hidden">
              <HeritageWaveBackground opacity={0.06} />
              <div className="relative z-10 text-center">
                <h3 className="font-semibold text-gray-800 mb-4">Heritage Wave</h3>
                <p className="text-gray-600">
                  Flowing wave pattern with flag colors
                </p>
              </div>
            </div>

            {/* Gradient Background */}
            <div className="relative bg-white rounded-lg p-8 h-64 overflow-hidden">
              <FlagGradientBackground opacity={0.05} />
              <div className="relative z-10 text-center">
                <h3 className="font-semibold text-gray-800 mb-4">Flag Gradient</h3>
                <p className="text-gray-600">
                  Radial gradients with national colors
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flag Accent Strips */}
      <section className="py-16 bg-white">
        <div className="container-width">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Flag Accent Strips
          </h2>
          
          <div className="space-y-8">
            {/* Card Header Accent */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Card Header Accent</h3>
              <div className="bg-white rounded-md relative overflow-hidden">
                <CardHeaderAccent style="gradient" animate={true} />
                <div className="p-6 pt-8">
                  <p className="text-gray-600">
                    Gradient accent strip at the top of cards
                  </p>
                </div>
              </div>
            </div>

            {/* Event Card Accent */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Event Card Accent</h3>
              <div className="bg-white rounded-md relative overflow-hidden">
                <EventCardAccent style="wave" thickness="medium" />
                <div className="p-6">
                  <p className="text-gray-600">
                    Wave-style accent for event cards
                  </p>
                </div>
              </div>
            </div>

            {/* Success Story Accent */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Success Story Accent</h3>
              <div className="bg-white rounded-md relative overflow-hidden">
                <SuccessStoryAccent style="wave" animate={true} />
                <div className="p-6">
                  <p className="text-gray-600">
                    Animated wave accent for success stories
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Components */}
      <section className="py-16 bg-gray-100">
        <div className="container-width">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Enhanced Component Examples
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Event Card Enhancement */}
            <LusophoneEventCardEnhancement
              eventCountry="PT"
              showFlagAccent={true}
              showCountryFlag={true}
              accentStyle="both"
              className="bg-white rounded-lg shadow-sm"
            >
              <div className="p-6">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Fado Night in London
                </h3>
                <p className="text-gray-600 text-sm">
                  Traditional Portuguese music evening
                </p>
                <div className="mt-4 text-xs text-gray-500">
                  Portuguese Heritage Event
                </div>
              </div>
            </LusophoneEventCardEnhancement>

            {/* Success Story Card */}
            <LusophoneSuccessStoryCard storyCountry="BR">
              <h3 className="font-semibold text-gray-800 mb-3">
                Maria's Journey
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                "From São Paulo to London, LusoTown helped me connect with the 
                Brazilian community and build lasting friendships."
              </p>
              <div className="flex items-center text-xs text-gray-500">
                <span>Software Developer</span>
                <span className="mx-2">•</span>
                <span>Manchester</span>
              </div>
            </LusophoneSuccessStoryCard>

            {/* Business Card */}
            <LusophoneBusinessCard businessOrigin="AO">
              <div className="p-6">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Luanda Restaurant
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Authentic Angolan cuisine in the heart of London
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>African Cuisine</span>
                  <span>⭐ 4.8</span>
                </div>
              </div>
            </LusophoneBusinessCard>
          </div>
        </div>
      </section>

      {/* Full Integration Examples */}
      <section className="py-16">
        <div className="container-width">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Full Integration Examples
          </h2>
          
          {/* Hero Integration */}
          <div className="relative mb-16 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl overflow-hidden">
            <HeroLusophoneIntegration />
            <div className="relative z-10 py-16 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Hero Section Integration
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Prominent flag rotation with cultural background patterns 
                for maximum visual impact in hero sections.
              </p>
            </div>
          </div>

          {/* Features Integration */}
          <div className="relative mb-16 bg-white rounded-xl overflow-hidden shadow-sm">
            <FeaturesLusophoneIntegration />
            <div className="relative z-10 py-12 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Features Section Integration
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Moderate flag presence with corner positioning 
                for feature showcases.
              </p>
            </div>
          </div>

          {/* Events Integration */}
          <div className="relative mb-16 bg-gray-50 rounded-xl overflow-hidden">
            <EventsLusophoneIntegration />
            <div className="relative z-10 py-12 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Events Section Integration
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Side-positioned flags with wave patterns 
                perfect for event listings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cultural Showcase */}
      <LusophoneCulturalShowcase />

      {/* Implementation Guide */}
      <section className="py-16 bg-white">
        <div className="container-width">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Implementation Guide
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Quick Integration Examples
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Header Integration:</h4>
                  <code className="block bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto">
                    {`<HeaderFlag enableClick={true} className="ml-4" />`}
                  </code>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Event Card Enhancement:</h4>
                  <code className="block bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto">
                    {`<LusophoneEventCardEnhancement eventCountry="PT" showFlagAccent={true}>
  <EventContent />
</LusophoneEventCardEnhancement>`}
                  </code>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Section Background:</h4>
                  <code className="block bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto">
                    {`<div className="relative">
  <SubtleFlagBackground opacity={0.05} />
  <YourContent />
</div>`}
                  </code>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Cultural Showcase:</h4>
                  <code className="block bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto">
                    {`<LusophoneCulturalShowcase />`}
                  </code>
                </div>
              </div>

              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Cultural Guidelines:</h4>
                <ul className="text-sm text-blue-700 space-y-2">
                  <li>• Always use respectful flag representations</li>
                  <li>• Maintain Portuguese heritage as primary theme</li>
                  <li>• Include all 8 nations equally in rotation</li>
                  <li>• Provide cultural context when appropriate</li>
                  <li>• Ensure accessibility with proper ARIA labels</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Nations Reference */}
      <section className="py-16 bg-gradient-to-r from-blue-50 via-white to-green-50">
        <div className="container-width">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            All 8 Portuguese-Speaking Nations
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {LUSOPHONE_FLAGS.map((flag, index) => (
              <motion.div
                key={flag.code}
                className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-all duration-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-4xl mb-3" role="img" aria-label={`${flag.name} flag`}>
                  {flag.flag}
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  {currentLanguage === 'pt' ? flag.namePortuguese : flag.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {flag.continent}
                </p>
                <p className="text-xs text-gray-500 mb-3">
                  UK Diaspora: {flag.diasporaSize}
                </p>
                <div 
                  className="w-full h-1 rounded-full"
                  style={{ backgroundColor: flag.colors.primary }}
                />
                <p className="text-xs italic text-gray-600 mt-3">
                  {currentLanguage === 'pt' 
                    ? flag.heritageQuotePortuguese 
                    : flag.heritageQuote
                  }
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}