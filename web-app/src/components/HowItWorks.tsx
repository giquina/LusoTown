'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  UserPlus, 
  Calendar, 
  MessageCircle,
  Heart,
  ArrowRight,
  Sparkles,
  MapPin,
  Users,
  Globe2,
  Coffee,
  Music,
  UtensilsCrossed,
  Camera
} from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function HowItWorks() {
  const [mounted, setMounted] = useState(false)
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const { t } = useLanguage()

  useEffect(() => {
    setMounted(true)
  }, [])

  const steps = [
    {
      number: 1,
      title: 'Join Portuguese Community',
      subtitle: 'Junta-te à Comunidade Portuguesa',
      description: 'Connect with 500+ Portuguese speakers across London. From professionals to families - find your community.',
      icon: UserPlus,
      color: 'from-secondary-500 to-secondary-600',
      bgColor: 'from-secondary-50 to-secondary-100',
      accentColor: 'secondary-500',
      examples: 'Portugal, Brazil, Angola, Mozambique, Cape Verde communities in London'
    },
    {
      number: 2,
      title: 'Book Portuguese Events',
      subtitle: 'Reserve Eventos Portugueses',
      description: 'Browse and book events for Portuguese speakers: AI workshops, Fado nights, cooking classes, networking, and tours.',
      icon: Calendar,
      color: 'from-accent-500 to-coral-500',
      bgColor: 'from-accent-50 to-coral-100',
      accentColor: 'accent-500',
      examples: 'AI workshops, Fado nights, cooking classes, networking events, cultural tours'
    },
    {
      number: 3,
      title: 'Professional Growth & Culture',
      subtitle: 'Crescimento Profissional e Cultura',
      description: 'Attend business workshops, cultural experiences, and networking events. Learn from Portuguese entrepreneurs and expand your network.',
      icon: Coffee,
      color: 'from-action-500 to-action-600',
      bgColor: 'from-action-50 to-action-100',
      accentColor: 'action-500',
      examples: 'Business coaching, digital marketing, investment seminars, heritage tours'
    },
    {
      number: 4,
      title: 'Host Your Own Events',
      subtitle: 'Organize os Seus Próprios Eventos',
      description: 'Share your expertise by hosting events for the Portuguese community. Monetize your skills while preserving heritage.',
      icon: Heart,
      color: 'from-premium-500 to-premium-600',
      bgColor: 'from-premium-50 to-premium-100',
      accentColor: 'premium-500',
      examples: 'Host workshops, cultural events, promote business, share expertise'
    }
  ]

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-white via-secondary-50/30 to-accent-50/30">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-secondary-200 via-accent-100 to-primary-100 rounded-full opacity-30 animate-pulse" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-tr from-action-200 via-secondary-100 to-accent-100 rounded-full opacity-25 animate-bounce" style={{ animationDuration: '4s' }} />
        <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-secondary-400 rounded-full opacity-40" />
        <div className="absolute top-3/4 right-1/3 w-4 h-4 bg-accent-400 rounded-full opacity-50" />
        <div className="absolute bottom-1/3 left-2/3 w-3 h-3 bg-primary-400 rounded-full opacity-50" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        {/* Enhanced Header Section */}
        <div className={`text-center mb-20 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          {/* Enhanced Badge with Portuguese flag colors */}
          <div className={`inline-flex items-center gap-3 bg-gradient-to-r from-secondary-50 via-accent-50 to-coral-50 border border-secondary-200/50 rounded-2xl px-8 py-4 shadow-xl transition-all duration-700 delay-100 ${mounted ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-5'} mb-8`}>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-red-500 animate-pulse"></div>
              <Sparkles className="h-5 w-5 text-secondary-600" />
              <span className="text-sm font-bold bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 bg-clip-text text-transparent">
                Como Funciona • How It Works
              </span>
            </div>
            <div className="w-2 h-2 bg-secondary-400 rounded-full animate-pulse"></div>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-tight tracking-tight mb-8">
            Fill Your Social 
            <span className="bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 bg-clip-text text-transparent block sm:inline">
              Calendar
            </span>
          </h2>
          
          <p className="text-xl sm:text-2xl md:text-3xl text-gray-700 leading-relaxed max-w-4xl mx-auto font-medium mb-6">
            Book experiences and live life together with Portuguese speakers across London in four simple steps
          </p>
          
          <p className="text-lg text-gray-600 italic max-w-3xl mx-auto leading-relaxed">
            "A vida é melhor quando vivida em comunidade" - Life is better when lived together
          </p>

          {/* Cultural Icons Preview */}
          <div className="flex justify-center items-center gap-6 mt-12 flex-wrap">
            <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
              <Coffee className="h-5 w-5 text-accent-600" />
              <span className="text-sm font-medium text-gray-700">Café Culture</span>
            </div>
            <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
              <Music className="h-5 w-5 text-action-600" />
              <span className="text-sm font-medium text-gray-700">Fado Nights</span>
            </div>
            <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
              <UtensilsCrossed className="h-5 w-5 text-secondary-600" />
              <span className="text-sm font-medium text-gray-700">Portuguese Cuisine</span>
            </div>
            <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
              <Camera className="h-5 w-5 text-coral-600" />
              <span className="text-sm font-medium text-gray-700">Cultural Tours</span>
            </div>
          </div>
        </div>

        {/* Redesigned Dynamic Cards with Portuguese Cultural Elements - Fixed mobile truncation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-20">
          
          {/* Book Portuguese Events */}
          <div className="group relative transition-all duration-500 hover:scale-105">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-secondary-50 via-white to-secondary-100 border-2 border-secondary-200 shadow-xl group-hover:shadow-2xl transition-all duration-500 min-h-[320px] sm:min-h-[360px] lg:min-h-[380px]">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                <div className="absolute top-4 right-4 text-6xl opacity-30">🏛️</div>
                <div className="absolute bottom-4 left-4 text-4xl opacity-40">🎭</div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl opacity-10">⚽</div>
              </div>
              
              {/* Card Content */}
              <div className="relative p-4 sm:p-6 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl sm:text-4xl font-black text-secondary-600/20 group-hover:text-secondary-600/30 transition-colors duration-300">01</div>
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-secondary-500 to-secondary-600 flex items-center justify-center shadow-lg group-hover:rotate-12 group-hover:shadow-xl transition-all duration-500">
                    <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                </div>

                <div className="flex-1 space-y-3">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">Book Events</h3>
                  
                  {/* Portuguese Cultural Categories */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                      <div className="w-2 h-2 rounded-full bg-secondary-400"></div>
                      <span className="font-medium">Museums & Cultural Sites</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                      <div className="w-2 h-2 rounded-full bg-action-400"></div>
                      <span className="font-medium">Sporting Events & Matches</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                      <div className="w-2 h-2 rounded-full bg-accent-400"></div>
                      <span className="font-medium">Fado Nights & Concerts</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 leading-relaxed break-words">
                    Book authentic Portuguese experiences with <strong>500+ Portuguese speakers</strong> across London.
                  </p>
                </div>

                <div className="mt-auto pt-4">
                  <a href="/events" className="group/btn inline-flex items-center gap-2 bg-secondary-600 hover:bg-secondary-700 text-white font-bold px-4 py-3 rounded-xl w-full justify-center transition-all duration-300 shadow-lg hover:shadow-xl">
                    <span>Book Now</span>
                    <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Create Portuguese Groups */}
          <div className="group relative transition-all duration-500 hover:scale-105">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent-50 via-white to-coral-100 border-2 border-accent-200 shadow-xl group-hover:shadow-2xl transition-all duration-500 min-h-[320px] sm:min-h-[360px] lg:min-h-[380px]">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                <div className="absolute top-4 right-4 text-6xl opacity-30">👥</div>
                <div className="absolute bottom-4 left-4 text-4xl opacity-40">🤝</div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl opacity-10">💼</div>
              </div>
              
              <div className="relative p-4 sm:p-6 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl sm:text-4xl font-black text-accent-600/20 group-hover:text-accent-600/30 transition-colors duration-300">02</div>
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-accent-500 to-coral-500 flex items-center justify-center shadow-lg group-hover:rotate-12 group-hover:shadow-xl transition-all duration-500">
                    <Users className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                </div>

                <div className="flex-1 space-y-3">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">Create Groups</h3>
                  
                  <div className="grid grid-cols-3 gap-1">
                    <div className="bg-accent-100 rounded-lg p-1.5 text-center">
                      <div className="text-xs font-bold text-accent-700 leading-tight">Professional</div>
                      <div className="text-xs text-gray-600 leading-tight">Network</div>
                    </div>
                    <div className="bg-coral-100 rounded-lg p-1.5 text-center">
                      <div className="text-xs font-bold text-coral-700 leading-tight">50+ Club</div>
                      <div className="text-xs text-gray-600 leading-tight">Wisdom</div>
                    </div>
                    <div className="bg-secondary-100 rounded-lg p-1.5 text-center">
                      <div className="text-xs font-bold text-secondary-700 leading-tight">Social</div>
                      <div className="text-xs text-gray-600 leading-tight">Friends</div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 leading-relaxed break-words">
                    Start communities and build lasting friendships within the <strong>Portuguese diaspora</strong>.
                  </p>
                </div>

                <div className="mt-auto pt-4">
                  <a href="/groups" className="group/btn inline-flex items-center gap-2 bg-accent-600 hover:bg-accent-700 text-white font-bold px-4 py-3 rounded-xl w-full justify-center transition-all duration-300 shadow-lg hover:shadow-xl">
                    <span>Start Group</span>
                    <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* LusoFeed - Community Updates */}
          <div className="group relative transition-all duration-500 hover:scale-105">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-action-50 via-white to-action-100 border-2 border-action-200 shadow-xl group-hover:shadow-2xl transition-all duration-500 min-h-[320px] sm:min-h-[360px] lg:min-h-[380px]">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                <div className="absolute top-4 right-4 text-6xl opacity-30">📱</div>
                <div className="absolute bottom-4 left-4 text-4xl opacity-40">📸</div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl opacity-10">💬</div>
              </div>
              
              <div className="relative p-4 sm:p-6 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl sm:text-4xl font-black text-action-600/20 group-hover:text-action-600/30 transition-colors duration-300">03</div>
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-action-500 to-action-600 flex items-center justify-center shadow-lg group-hover:rotate-12 group-hover:shadow-xl transition-all duration-500">
                    <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                </div>

                <div className="flex-1 space-y-3">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">LusoFeed</h3>
                  
                  {/* Mock Feed Preview */}
                  <div className="space-y-2">
                    <div className="bg-white rounded-lg p-2 border border-action-100">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-4 h-4 bg-action-400 rounded-full"></div>
                        <span className="text-xs font-medium">Maria shared photos from Fado night</span>
                      </div>
                      <div className="text-xs text-gray-500">2 hours ago • 15 likes</div>
                    </div>
                    <div className="bg-white rounded-lg p-2 border border-action-100">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-4 h-4 bg-secondary-400 rounded-full"></div>
                        <span className="text-xs font-medium">João posted about AI workshop</span>
                      </div>
                      <div className="text-xs text-gray-500">5 hours ago • 8 comments</div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 leading-relaxed break-words">
                    Follow events and share photos with the <strong>Portuguese community</strong>.
                  </p>
                </div>

                <div className="mt-auto pt-4">
                  <a href="/feed" className="group/btn inline-flex items-center gap-2 bg-action-600 hover:bg-action-700 text-white font-bold px-4 py-3 rounded-xl w-full justify-center transition-all duration-300 shadow-lg hover:shadow-xl">
                    <span>View Feed</span>
                    <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Save Portuguese Favourites */}
          <div className="group relative transition-all duration-500 hover:scale-105">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-premium-50 via-white to-premium-100 border-2 border-premium-200 shadow-xl group-hover:shadow-2xl transition-all duration-500 min-h-[320px] sm:min-h-[360px] lg:min-h-[380px]">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                <div className="absolute top-4 right-4 text-6xl opacity-30">🥐</div>
                <div className="absolute bottom-4 left-4 text-4xl opacity-40">❤️</div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl opacity-10">🏪</div>
              </div>
              
              <div className="relative p-4 sm:p-6 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl sm:text-4xl font-black text-premium-600/20 group-hover:text-premium-600/30 transition-colors duration-300">04</div>
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-premium-500 to-premium-600 flex items-center justify-center shadow-lg group-hover:rotate-12 group-hover:shadow-xl transition-all duration-500">
                    <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                </div>

                <div className="flex-1 space-y-3">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">Save Favourites</h3>
                  
                  {/* Portuguese Business Types */}
                  <div className="grid grid-cols-2 gap-1.5">
                    <div className="flex items-center gap-1.5 bg-premium-50 rounded-lg p-1.5">
                      <span className="text-sm">🥖</span>
                      <span className="text-xs font-medium text-gray-700 leading-tight">Bakeries</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-premium-50 rounded-lg p-1.5">
                      <span className="text-sm">🎭</span>
                      <span className="text-xs font-medium text-gray-700 leading-tight">Events</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-premium-50 rounded-lg p-1.5">
                      <span className="text-sm">🏛️</span>
                      <span className="text-xs font-medium text-gray-700 leading-tight">Cultural Sites</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-premium-50 rounded-lg p-1.5">
                      <span className="text-sm">🍷</span>
                      <span className="text-xs font-medium text-gray-700 leading-tight">Restaurants</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 leading-relaxed break-words">
                    Build your personal collection of <strong>Portuguese businesses</strong> and cultural experiences.
                  </p>
                </div>

                <div className="mt-auto pt-4">
                  <a href="/favorites" className="group/btn inline-flex items-center gap-2 bg-premium-600 hover:bg-premium-700 text-white font-bold px-4 py-3 rounded-xl w-full justify-center transition-all duration-300 shadow-lg hover:shadow-xl">
                    <span>View Saved</span>
                    <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Share Your Portuguese Expertise */}
          <div className="group relative transition-all duration-500 hover:scale-105 col-span-2 lg:col-span-1">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-coral-50 via-white to-coral-100 border-2 border-coral-200 shadow-xl group-hover:shadow-2xl transition-all duration-500 min-h-[320px] sm:min-h-[360px] lg:min-h-[380px]">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                <div className="absolute top-4 right-4 text-6xl opacity-30">🎯</div>
                <div className="absolute bottom-4 left-4 text-4xl opacity-40">💡</div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl opacity-10">🚀</div>
              </div>
              
              <div className="relative p-4 sm:p-6 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl sm:text-4xl font-black text-coral-600/20 group-hover:text-coral-600/30 transition-colors duration-300">05</div>
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-coral-500 to-coral-600 flex items-center justify-center shadow-lg group-hover:rotate-12 group-hover:shadow-xl transition-all duration-500">
                    <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                </div>

                <div className="flex-1 space-y-3">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">Share Expertise</h3>
                  
                  {/* Revenue Opportunities */}
                  <div className="bg-coral-50 rounded-lg p-3 border border-coral-100">
                    <div className="text-xs font-bold text-coral-700 mb-2">💰 Monetize Your Skills</div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="text-gray-600">• Host AI workshops</div>
                      <div className="text-gray-600">• Teach Portuguese</div>
                      <div className="text-gray-600">• Cooking classes</div>
                      <div className="text-gray-600">• Business coaching</div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 leading-relaxed break-words">
                    Showcase your skills to the Portuguese community and <strong>grow your business</strong> with our annual membership model.
                  </p>
                </div>

                <div className="mt-auto pt-4">
                  <a href="/host" className="group/btn inline-flex items-center gap-2 bg-coral-600 hover:bg-coral-700 text-white font-bold px-4 py-3 rounded-xl w-full justify-center transition-all duration-300 shadow-lg hover:shadow-xl">
                    <span>Become Host</span>
                    <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Enhanced Stats Section with Portuguese Cultural Context */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <div className="group text-center bg-white/60 backdrop-blur-lg border border-white/40 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary-500 to-secondary-600 flex items-center justify-center group-hover:rotate-6 transition-transform duration-300 shadow-lg mx-auto mb-6">
              <Users className="h-8 w-8 text-white" />
            </div>
            <div className="text-3xl font-black text-gray-800 mb-2">500+</div>
            <div className="text-sm font-bold text-gray-600 tracking-wide mb-2">PORTUGUESE SPEAKERS</div>
            <div className="text-xs text-gray-500 italic">From Portugal, Brazil, Angola & more in London</div>
          </div>
          
          <div className="group text-center bg-white/60 backdrop-blur-lg border border-white/40 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-500 to-coral-500 flex items-center justify-center group-hover:rotate-6 transition-transform duration-300 shadow-lg mx-auto mb-6">
              <Calendar className="h-8 w-8 text-white" />
            </div>
            <div className="text-3xl font-black text-gray-800 mb-2">40+</div>
            <div className="text-sm font-bold text-gray-600 tracking-wide mb-2">MONTHLY MEETUPS</div>
            <div className="text-xs text-gray-500 italic">At real Portuguese venues in London</div>
          </div>
          
          <div className="group text-center bg-white/60 backdrop-blur-lg border border-white/40 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-action-500 to-action-600 flex items-center justify-center group-hover:rotate-6 transition-transform duration-300 shadow-lg mx-auto mb-6">
              <MapPin className="h-8 w-8 text-white" />
            </div>
            <div className="text-3xl font-black text-gray-800 mb-2">75+</div>
            <div className="text-sm font-bold text-gray-600 tracking-wide mb-2">PORTUGUESE VENUES</div>
            <div className="text-xs text-gray-500 italic">Stockwell, Vauxhall, Elephant & Castle</div>
          </div>
          
          <div className="group text-center bg-white/60 backdrop-blur-lg border border-white/40 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-premium-500 to-premium-600 flex items-center justify-center group-hover:rotate-6 transition-transform duration-300 shadow-lg mx-auto mb-6">
              <Globe2 className="h-8 w-8 text-white" />
            </div>
            <div className="text-3xl font-black text-gray-800 mb-2">15+</div>
            <div className="text-sm font-bold text-gray-600 tracking-wide mb-2">UK CITIES</div>
            <div className="text-xs text-gray-500 italic">London boroughs with Portuguese communities</div>
          </div>
        </div>

        {/* Enhanced CTA Section with Portuguese Cultural Messaging */}
        <div className={`text-center transition-all duration-1000 delay-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <div className="bg-gradient-to-r from-white/70 via-secondary-50/50 to-accent-50/50 backdrop-blur-lg border border-white/40 rounded-3xl p-12 shadow-2xl max-w-5xl mx-auto">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
              Ready to 
              <span className="bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 bg-clip-text text-transparent">
                Join Our Community?
              </span>
            </h3>
            <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              Book experiences with Portuguese speakers from <strong className="text-secondary-600">Portugal 🇵🇹 Brazil 🇧🇷 Angola 🇦🇴 Mozambique 🇲🇿 Cape Verde 🇨🇻</strong> and beyond. 
              <strong className="text-gray-800">Real experiences, real venues, active social life.</strong>
            </p>
            
            {/* Portuguese cultural quote */}
            <div className="bg-white/50 rounded-2xl p-6 mb-10 max-w-2xl mx-auto border border-secondary-100">
              <p className="text-gray-700 italic text-lg mb-2">
                "Viver é conviver - há sempre algo para fazer juntos"
              </p>
              <p className="text-gray-600 text-sm">
                "To live is to live together - there's always something to do together"
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/events"
                className="group relative text-lg font-bold px-8 py-4 bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 text-white rounded-xl shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-1 hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-secondary-700 via-action-700 to-accent-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center justify-center gap-2 whitespace-nowrap">
                  Browse Events
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </a>
              <a
                href="/signup"
                className="text-lg font-bold px-8 py-4 bg-white/80 backdrop-blur-lg text-gray-800 border-2 border-gray-200 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:border-secondary-300 hover:-translate-y-1 whitespace-nowrap"
              >
                Join Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}