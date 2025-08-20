'use client'

import React, { useState, useEffect } from 'react'
import { 
  Calendar,
  Smartphone,
  Edit3,
  Bookmark,
  Store,
  Users,
  Globe,
  Sparkles,
  ArrowRight,
  Heart
} from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function AboutLusoTown() {
  const [mounted, setMounted] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    setMounted(true)
  }, [])

  const features = [
    {
      icon: Calendar,
      title: 'Discover & Join Events',
      description: 'Find Portuguese cultural events at authentic U.K. venues - from Fado nights to food festivals at real Portuguese locations.',
      gradient: 'from-action-500 to-action-600',
      lightBg: 'from-action-50 to-action-100/50',
      shadowColor: 'shadow-action-500/20'
    },
    {
      icon: Smartphone,
      title: 'Stay Updated on LusoTown Feed',
      description: 'See the latest events, posts, and community updates in real time.',
      gradient: 'from-primary-500 to-primary-600',
      lightBg: 'from-primary-50 to-primary-100/50',
      shadowColor: 'shadow-primary-500/20'
    },
    {
      icon: Edit3,
      title: 'Post & Share with the Community',
      description: 'Add your own updates, photos, and tips, and tag events or businesses.',
      gradient: 'from-secondary-500 to-secondary-600',
      lightBg: 'from-secondary-50 to-secondary-100/50',
      shadowColor: 'shadow-secondary-500/20'
    },
    {
      icon: Bookmark,
      title: 'Save Your Favourites',
      description: 'Bookmark events, businesses, and posts you love so you never miss out.',
      gradient: 'from-premium-500 to-premium-600',
      lightBg: 'from-premium-50 to-premium-100/50',
      shadowColor: 'shadow-premium-500/20'
    },
    {
      icon: Store,
      title: 'Support Portuguese Businesses',
      description: 'Explore our directory and discover places run by or for Portuguese speakers.',
      gradient: 'from-accent-500 to-coral-500',
      lightBg: 'from-accent-50 to-coral-100/50',
      shadowColor: 'shadow-accent-500/20'
    },
    {
      icon: Users,
      title: 'Connect with Portuguese Speakers',
      description: 'Find Your Match among Portuguese speakers through real-life meetups at authentic U.K. venues, share experiences, and keep your language and traditions alive.',
      gradient: 'from-coral-500 to-action-500',
      lightBg: 'from-coral-50 to-action-100/50',
      shadowColor: 'shadow-coral-500/20'
    }
  ]


  return (
    <section className="relative py-20 bg-gradient-to-br from-white via-gray-50 to-secondary-50 overflow-hidden">
      {/* Background decorative elements - matching hero section */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-secondary-200 via-primary-100 to-accent-100 rounded-full opacity-30 animate-pulse" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-tr from-action-200 via-premium-100 to-coral-100 rounded-full opacity-25 animate-bounce" style={{ animationDuration: '4s' }} />
        <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-secondary-400 rounded-full opacity-40" />
        <div className="absolute top-3/4 right-1/3 w-4 h-4 bg-premium-400 rounded-full" />
        <div className="absolute bottom-1/3 left-2/3 w-3 h-3 bg-primary-400 rounded-full opacity-50" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <div className={`inline-flex items-center gap-3 bg-gradient-to-r from-secondary-50 via-primary-50 to-accent-50 border border-secondary-200 rounded-2xl px-6 py-3 shadow-lg mb-6 transition-all duration-700 delay-100 ${mounted ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-5'}`}>
            <Globe className="h-5 w-5 text-secondary-600" />
            <span className="text-sm font-bold bg-gradient-to-r from-secondary-600 to-primary-600 bg-clip-text text-transparent">
              {t('about.hero.badge', 'Unidos pela Língua • Portuguese Community')}
            </span>
            <div className="w-2 h-2 bg-secondary-400 rounded-full animate-pulse"></div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
            About <span className="bg-gradient-to-r from-secondary-600 via-primary-600 to-accent-600 bg-clip-text text-transparent">LusoTown</span>
          </h2>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed max-w-4xl mx-auto font-medium">
            LusoTown is where Portuguese hearts find their U.K. network. Whether you're homesick, building your career while honoring your heritage, 
            or simply miss the warmth of Portuguese conversation, this is your professional home. Every person here understands your journey and opens their networks to support you.
          </p>
        </div>

        {/* Main Features Section */}
        <div className={`mb-20 transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl px-6 py-3 shadow-lg mb-6">
              <Heart className="h-5 w-5 text-action-500" />
              <span className="text-lg font-bold text-gray-800">When you join LusoTown, you can:</span>
            </div>
          </div>

          {/* Features Grid - Enhanced Multi-Column Responsive Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-7 lg:gap-8 xl:gap-10">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`group relative bg-white/60 backdrop-blur-lg rounded-3xl p-4 sm:p-6 md:p-7 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 border border-white/30 ${feature.shadowColor} hover:shadow-xl transition-all duration-700 delay-${100 + index * 100} ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${100 + index * 100}ms` }}
              >
                {/* Background gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.lightBg} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl`}></div>
                
                {/* Icon */}
                <div className="relative z-10 mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:rotate-3 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
                
                {/* Hover arrow indicator */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* Call-to-Action */}
        <div className={`text-center mt-12 transition-all duration-1000 delay-900 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <div className="inline-flex items-center gap-3 text-accent-600 hover:text-accent-700 transition-colors duration-300">
            <Sparkles className="h-6 w-6 animate-pulse" />
            <span className="text-lg font-bold">Ready to book experiences with Portuguese speakers across the U.K.?</span>
            <ArrowRight className="h-6 w-6 transform group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </div>
      </div>
    </section>
  )
}