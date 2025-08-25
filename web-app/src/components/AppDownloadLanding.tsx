"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon, StarIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/context/LanguageContext';
import { useMobileRedirect } from '@/components/MobileRedirectProvider';
import { MOBILE_APP_CONFIG, LANDING_PAGE_CONFIG } from '@/config/mobile-app';
import Image from 'next/image';

/**
 * App Download Landing Page Component
 * 
 * Full-screen landing page for mobile users showcasing the LusoTown app
 * with Portuguese cultural focus, community stats, and download CTAs.
 */
export function AppDownloadLanding() {
  const { t, language } = useLanguage();
  const {
    showLandingPage,
    deviceInfo,
    installationStatus,
    dismissPrompt,
    triggerAppDownload,
    triggerPWAInstall
  } = useMobileRedirect();

  const [currentFeature, setCurrentFeature] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Auto-rotate feature carousel
  useEffect(() => {
    if (!showLandingPage) return;
    
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % MOBILE_APP_CONFIG.features.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [showLandingPage]);

  // Auto-rotate testimonials
  useEffect(() => {
    if (!showLandingPage) return;
    
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % LANDING_PAGE_CONFIG.testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [showLandingPage]);

  if (!showLandingPage || !deviceInfo) return null;

  const currentFeatureData = MOBILE_APP_CONFIG.features[currentFeature];
  const currentTestimonialData = LANDING_PAGE_CONFIG.testimonials[currentTestimonial];

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
      {/* Header with close button */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">LT</span>
          </div>
          <span className="font-semibold text-gray-900">LusoTown</span>
        </div>
        <button
          onClick={dismissPrompt}
          className="p-2 text-gray-600 hover:text-gray-800 rounded-full hover:bg-gray-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Close"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Hero Section */}
      <div className="relative px-4 py-8 bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
        {/* Cultural Elements Background */}
        <div className="absolute inset-0 overflow-hidden">
          {LANDING_PAGE_CONFIG.hero.culturalElements.map((emoji, index) => (
            <motion.div
              key={index}
              className="absolute text-4xl opacity-10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: index * 0.5,
              }}
            >
              {emoji}
            </motion.div>
          ))}
        </div>

        <div className="relative text-center">
          <motion.h1
            className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {language === 'pt' 
              ? LANDING_PAGE_CONFIG.hero.title.pt 
              : LANDING_PAGE_CONFIG.hero.title.en}
          </motion.h1>
          
          <motion.p
            className="text-sm sm:text-base text-gray-700 mb-6 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {language === 'pt' 
              ? LANDING_PAGE_CONFIG.hero.subtitle.pt 
              : LANDING_PAGE_CONFIG.hero.subtitle.en}
          </motion.p>

          {/* Download CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <button
              onClick={() => triggerAppDownload()}
              className="flex items-center justify-center gap-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 min-h-[56px]"
            >
              {deviceInfo.isIOS ? (
                <div className="flex items-center gap-2">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <span>App Store</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  <span>Google Play</span>
                </div>
              )}
            </button>

            {installationStatus?.canInstallPWA && (
              <button
                onClick={triggerPWAInstall}
                className="flex items-center justify-center gap-2 border-2 border-primary-600 text-primary-600 px-6 py-4 rounded-xl font-semibold hover:bg-primary-50 transition-colors duration-200 min-h-[56px]"
              >
                <span>📱</span>
                <span>{t('mobile.app.install_web_app', 'Install Web App')}</span>
              </button>
            )}
          </motion.div>

          {/* Community Stats */}
          <motion.div
            className="grid grid-cols-2 gap-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50">
              <div className="text-2xl font-bold text-primary-600">
                {MOBILE_APP_CONFIG.stats.totalMembers.toLocaleString()}+
              </div>
              <div className="text-sm text-gray-600">
                {t('mobile.app.stats.members', 'Portuguese Speakers')}
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50">
              <div className="text-2xl font-bold text-secondary-600">
                {MOBILE_APP_CONFIG.stats.portugueseEvents}+
              </div>
              <div className="text-sm text-gray-600">
                {t('mobile.app.stats.events', 'Cultural Events')}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Carousel */}
      <div className="px-4 py-8">
        <h2 className="text-xl font-bold text-center text-gray-900 mb-6">
          {t('mobile.app.features.title', 'Why Portuguese Speakers Love Our App')}
        </h2>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentFeature}
              className="text-center"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-4xl mb-4">{currentFeatureData.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {language === 'pt' 
                  ? currentFeatureData.title.pt 
                  : currentFeatureData.title.en}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {language === 'pt' 
                  ? currentFeatureData.description.pt 
                  : currentFeatureData.description.en}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Feature Navigation Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {MOBILE_APP_CONFIG.features.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentFeature(index)}
                className={`w-2 h-2 rounded-full transition-colors min-h-[32px] min-w-[32px] flex items-center justify-center ${
                  index === currentFeature ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Trust Signals */}
      <div className="bg-gray-50 px-4 py-8">
        <h2 className="text-lg font-semibold text-center text-gray-900 mb-6">
          {t('mobile.app.trusted.title', 'Trusted by the Portuguese Community')}
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {LANDING_PAGE_CONFIG.trustSignals.map((signal) => (
            <div key={signal.id} className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-start gap-3">
                <div className="text-2xl flex-shrink-0">{signal.icon}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {language === 'pt' ? signal.title.pt : signal.title.en}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {language === 'pt' ? signal.description.pt : signal.description.en}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="px-4 py-8">
        <h2 className="text-lg font-semibold text-center text-gray-900 mb-6">
          {t('mobile.app.testimonials.title', 'What Our Community Says')}
        </h2>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentTestimonial}
            className="bg-primary-50 rounded-xl p-6 border border-primary-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex gap-1 justify-center mb-3">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="w-4 h-4 text-yellow-500 fill-current" />
              ))}
            </div>
            <blockquote className="text-sm text-gray-700 text-center leading-relaxed mb-4">
              "{language === 'pt' 
                ? currentTestimonialData.quote.pt 
                : currentTestimonialData.quote.en}"
            </blockquote>
            <div className="text-center">
              <div className="font-semibold text-gray-900">{currentTestimonialData.name}</div>
              <div className="text-xs text-gray-600">
                {currentTestimonialData.age} • {currentTestimonialData.location} • {currentTestimonialData.heritage}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Testimonial dots */}
        <div className="flex justify-center gap-2 mt-4">
          {LANDING_PAGE_CONFIG.testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-2 h-2 rounded-full transition-colors min-h-[32px] min-w-[32px] flex items-center justify-center ${
                index === currentTestimonial ? 'bg-primary-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="px-4 py-8 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-3">
            {t('mobile.app.final_cta.title', 'Ready to Join the Portuguese Community?')}
          </h2>
          <p className="text-primary-100 mb-6 text-sm leading-relaxed">
            {t('mobile.app.final_cta.subtitle', 'Download the app now and never miss a Portuguese cultural event, business, or connection again.')}
          </p>
          
          <div className="flex flex-col gap-3">
            <button
              onClick={() => triggerAppDownload()}
              className="bg-white text-primary-600 px-6 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 min-h-[56px]"
            >
              {t('mobile.app.download_now', 'Download LusoTown App')}
            </button>
            
            <button
              onClick={dismissPrompt}
              className="text-primary-100 hover:text-white px-6 py-3 rounded-xl transition-colors duration-200 min-h-[44px]"
            >
              {t('mobile.app.continue_web', 'Continue with Website')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppDownloadLanding;