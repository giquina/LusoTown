'use client'

import React from 'react'
import { ArrowRightIcon, SparklesIcon, HeartIcon, UsersIcon, MapPinIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'
import SocialLogin from './SocialLogin'
import SearchBar from './SearchBar'
import { getImagesByCategory } from '@/lib/profileImages'
import { useLanguage } from '@/context/LanguageContext'

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden w-full bg-gradient-to-br from-white via-gray-50 to-secondary-50">
      {/* Background decorative elements - CSS animations instead of framer-motion */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-accent-200 via-coral-100 to-secondary-100 rounded-full opacity-30 animate-pulse" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-tr from-secondary-200 via-accent-100 to-action-100 rounded-full opacity-25 animate-bounce" style={{ animationDuration: '4s' }} />
        <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-secondary-400 rounded-full opacity-40" />
        <div className="absolute top-3/4 right-1/3 w-4 h-4 bg-accent-400 rounded-full" />
        <div className="absolute bottom-1/3 left-2/3 w-3 h-3 bg-action-400 rounded-full opacity-50" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 sm:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <div className={`space-y-6 sm:space-y-8 transition-all duration-1000 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            {/* Smart Welcome Badge */}
            <div className={`inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-secondary-50 via-accent-50 to-action-50 border border-secondary-200 rounded-2xl px-4 sm:px-6 py-2 sm:py-3 shadow-lg transition-all duration-700 delay-100 ${mounted ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-5'}`}>
              <div className="flex items-center gap-2">
                <SparklesIcon className="h-5 w-5 text-secondary-600" />
                <span className="text-sm font-bold bg-gradient-to-r from-secondary-600 to-action-600 bg-clip-text text-transparent">
                  ANNUAL MEMBERSHIP - £25/YEAR
                </span>
              </div>
              <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                OFFICIAL
              </div>
              <div className="w-2 h-2 bg-secondary-400 rounded-full animate-pulse"></div>
            </div>

            {/* Main Headlines */}
            <div className={`space-y-4 transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-gray-900 leading-tight tracking-tight">
                {/* Desktop full title */}
                <span className="hidden sm:block">{t('hero.title')}</span>
                {/* Mobile short title */}
                <span className="sm:hidden">{t('hero.title.mobile')}</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed max-w-2xl font-medium">
                {/* Desktop full subtitle */}
                <span className="hidden sm:block">{t('hero.subtitle')}</span>
                {/* Mobile short subtitle */}
                <span className="sm:hidden">{t('hero.subtitle.mobile')}</span>
              </p>
            </div>

            {/* Search Bar */}
            <div className={`transition-all duration-1000 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              <SearchBar variant="homepage" className="max-w-3xl w-full" />
            </div>

            {/* Feature highlights - 2x2 mobile grid */}
            <div className={`grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 transition-all duration-1000 delay-600 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              <div className="group flex flex-col items-center gap-2 sm:gap-3 bg-white/50 backdrop-blur-sm border border-white/20 rounded-xl p-3 sm:p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 min-h-[80px] sm:min-h-[90px]">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-action-500 to-action-600 flex items-center justify-center group-hover:rotate-3 transition-transform duration-300">
                  <HeartIcon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />
                </div>
                <span className="text-xs font-bold text-gray-800 tracking-wide text-center leading-tight">BOOK & EXPERIENCE</span>
              </div>
              <div className="group flex flex-col items-center gap-2 sm:gap-3 bg-white/50 backdrop-blur-sm border border-white/20 rounded-xl p-3 sm:p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 min-h-[80px] sm:min-h-[90px]">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-secondary-500 to-secondary-600 flex items-center justify-center group-hover:rotate-3 transition-transform duration-300">
                  <UsersIcon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />
                </div>
                <span className="text-xs font-bold text-gray-800 tracking-wide text-center leading-tight">PORTUGUESE SPEAKERS</span>
              </div>
              <div className="group flex flex-col items-center gap-2 sm:gap-3 bg-white/50 backdrop-blur-sm border border-white/20 rounded-xl p-3 sm:p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 min-h-[80px] sm:min-h-[90px]">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-accent-500 to-coral-500 flex items-center justify-center group-hover:rotate-3 transition-transform duration-300">
                  <SparklesIcon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />
                </div>
                <span className="text-xs font-bold text-gray-800 tracking-wide text-center leading-tight">LIVE TOGETHER</span>
              </div>
              <div className="group flex flex-col items-center gap-2 sm:gap-3 bg-white/50 backdrop-blur-sm border border-white/20 rounded-xl p-3 sm:p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 min-h-[80px] sm:min-h-[90px]">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-premium-500 to-premium-600 flex items-center justify-center group-hover:rotate-3 transition-transform duration-300">
                  <ArrowRightIcon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />
                </div>
                <span className="text-xs font-bold text-gray-800 tracking-wide text-center leading-tight">GROW NETWORK</span>
              </div>
            </div>

            {/* Premium Services Quick Access */}
            <div className={`transition-all duration-1000 delay-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/20 shadow-lg">
                <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
                  {t('hero.services.title', 'Premium Portuguese Services')}
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <a
                    href="/services#cultural-tours"
                    className="group flex flex-col items-center gap-2 p-3 rounded-xl bg-primary-50 hover:bg-primary-100 transition-all duration-200 hover:scale-105"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
                      <MapPinIcon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xs font-semibold text-gray-700 text-center">Cultural Tours</span>
                  </a>
                  <a
                    href="/services#executive-transport"
                    className="group flex flex-col items-center gap-2 p-3 rounded-xl bg-secondary-50 hover:bg-secondary-100 transition-all duration-200 hover:scale-105"
                  >
                    <div className="w-8 h-8 rounded-lg bg-secondary-600 flex items-center justify-center">
                      <ArrowRightIcon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xs font-semibold text-gray-700 text-center">Executive Transport</span>
                  </a>
                  <a
                    href="/services#close-protection"
                    className="group flex flex-col items-center gap-2 p-3 rounded-xl bg-premium-50 hover:bg-premium-100 transition-all duration-200 hover:scale-105"
                  >
                    <div className="w-8 h-8 rounded-lg bg-premium-600 flex items-center justify-center">
                      <ShieldCheckIcon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xs font-semibold text-gray-700 text-center">Close Protection</span>
                  </a>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 transition-all duration-1000 delay-800 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              <a
                href="/events"
                className="group relative text-base sm:text-lg font-bold px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 text-white rounded-2xl shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:-translate-y-1 hover:scale-105 overflow-hidden w-full sm:w-auto text-center"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-secondary-700 via-action-700 to-accent-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {t('hero.cta.primary')}
                  <ArrowRightIcon className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </a>
              <a
                href="/services"
                className="text-base sm:text-lg font-bold px-6 sm:px-8 py-3 sm:py-4 bg-white/70 backdrop-blur-lg text-gray-800 border-2 border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:border-secondary-300 hover:text-secondary-700 hover:-translate-y-1 w-full sm:w-auto text-center"
              >
                {t('hero.cta.services', 'Premium Services')}
              </a>
              <a
                href="/host"
                className="group relative text-base sm:text-lg font-bold px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-premium-600 via-coral-600 to-accent-600 text-white rounded-2xl shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:-translate-y-1 hover:scale-105 overflow-hidden w-full sm:w-auto text-center"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-premium-700 via-coral-700 to-accent-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {t('hero.cta.host')}
                  <SparklesIcon className="h-6 w-6 group-hover:rotate-12 transition-transform duration-200" />
                </span>
              </a>
            </div>
          </div>

          {/* Right Column - Community Showcase */}
          <div className={`relative transition-all duration-1000 delay-600 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="relative z-10 bg-white/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Annual Membership - Your Cultural Investment</h3>
                  <p className="text-gray-600">£25/year gets you unlimited access to the Portuguese community. Pay only true cost for events and activities - no markups, no surprises.</p>
                </div>

                {/* Member avatars */}
                <div className="flex justify-center mb-4">
                  <div className="flex -space-x-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="w-12 h-12 rounded-full border-2 border-white shadow-lg bg-gradient-to-br from-green-400 via-red-400 to-yellow-400 flex items-center justify-center text-white font-bold text-sm">
                        {['M', 'A', 'J', 'L'][i]}
                      </div>
                    ))}
                    <div className="w-12 h-12 rounded-full border-2 border-white shadow-lg bg-gradient-to-r from-green-500 to-red-500 flex items-center justify-center text-white text-xs font-bold">
                      +500
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-white/40 rounded-2xl p-4">
                    <div className="text-3xl font-bold text-green-600">150+</div>
                    <div className="text-sm text-gray-600">Monthly Experiences</div>
                  </div>
                  <div className="bg-white/40 rounded-2xl p-4">
                    <div className="text-3xl font-bold text-red-600">10+</div>
                    <div className="text-sm text-gray-600">Countries Represented</div>
                  </div>
                </div>

                {/* Quick Social Login */}
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Quick Join</div>
                  <SocialLogin mode="signup" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}