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

        {/* Content Sections Grid - 2x3 Layout for Mobile Optimization */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mb-20">
          {/* Book Experiences Section */}
          <div className="group relative transition-all duration-1000 delay-100">
            <div className="bg-white/80 backdrop-blur-lg border border-white/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 relative overflow-hidden h-[240px] sm:h-[280px] lg:h-[320px] flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary-50 to-secondary-100 opacity-0 group-hover:opacity-60 transition-opacity duration-500 rounded-xl" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-2 sm:mb-3">
                  <div className="text-xl sm:text-3xl lg:text-5xl font-black text-gray-100 group-hover:text-gray-200 transition-colors duration-300 leading-none">01</div>
                  <div className="w-7 h-7 sm:w-10 sm:h-10 lg:w-14 lg:h-14 rounded-lg lg:rounded-xl bg-gradient-to-br from-secondary-500 to-secondary-600 flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:rotate-6 transition-all duration-500 flex-shrink-0">
                    <Calendar className="h-3 w-3 sm:h-5 sm:w-5 lg:h-7 lg:w-7 text-white" />
                  </div>
                </div>

                <div className="flex-1 space-y-1 sm:space-y-2">
                  <h3 className="text-xs sm:text-sm lg:text-lg font-bold text-gray-900 leading-tight">Book Events</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">Museums • Sports • Fado</p>
                  <p className="text-xs text-gray-600 leading-relaxed">Book tours, matches, concerts for Portuguese speakers.</p>
                </div>

                <div className="mt-auto pt-2">
                  <a href="/events" className="inline-flex items-center gap-1 bg-secondary-600 text-white text-xs font-bold px-2 sm:px-3 py-1 sm:py-2 rounded-md hover:bg-secondary-700 transition-all duration-300">
                    <span>Book Now</span>
                    <ArrowRight className="h-2 w-2 sm:h-3 sm:w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Create Groups Section */}
          <div className="group relative transition-all duration-1000 delay-150">
            <div className="bg-white/80 backdrop-blur-lg border border-white/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 relative overflow-hidden h-[240px] sm:h-[280px] lg:h-[320px] flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-50 to-coral-100 opacity-0 group-hover:opacity-60 transition-opacity duration-500 rounded-xl" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-2 sm:mb-3">
                  <div className="text-xl sm:text-3xl lg:text-5xl font-black text-gray-100 group-hover:text-gray-200 transition-colors duration-300 leading-none">02</div>
                  <div className="w-7 h-7 sm:w-10 sm:h-10 lg:w-14 lg:h-14 rounded-lg lg:rounded-xl bg-gradient-to-br from-accent-500 to-coral-500 flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:rotate-6 transition-all duration-500 flex-shrink-0">
                    <Users className="h-3 w-3 sm:h-5 sm:w-5 lg:h-7 lg:w-7 text-white" />
                  </div>
                </div>

                <div className="flex-1 space-y-1 sm:space-y-2">
                  <h3 className="text-xs sm:text-sm lg:text-lg font-bold text-gray-900 leading-tight">Create Groups</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">Professionals • 50+ • Social</p>
                  <p className="text-xs text-gray-600 leading-relaxed">Start communities and build lasting friendships.</p>
                </div>

                <div className="mt-auto pt-2">
                  <a href="/groups" className="inline-flex items-center gap-1 bg-accent-600 text-white text-xs font-bold px-2 sm:px-3 py-1 sm:py-2 rounded-md hover:bg-accent-700 transition-all duration-300">
                    <span>Start Group</span>
                    <ArrowRight className="h-2 w-2 sm:h-3 sm:w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* LusoFeed Section */}
          <div className="group relative transition-all duration-1000 delay-200">
            <div className="bg-white/80 backdrop-blur-lg border border-white/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 relative overflow-hidden h-[240px] sm:h-[280px] lg:h-[320px] flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-br from-action-50 to-action-100 opacity-0 group-hover:opacity-60 transition-opacity duration-500 rounded-xl" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-2 sm:mb-3">
                  <div className="text-xl sm:text-3xl lg:text-5xl font-black text-gray-100 group-hover:text-gray-200 transition-colors duration-300 leading-none">03</div>
                  <div className="w-7 h-7 sm:w-10 sm:h-10 lg:w-14 lg:h-14 rounded-lg lg:rounded-xl bg-gradient-to-br from-action-500 to-action-600 flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:rotate-6 transition-all duration-500 flex-shrink-0">
                    <MessageCircle className="h-3 w-3 sm:h-5 sm:w-5 lg:h-7 lg:w-7 text-white" />
                  </div>
                </div>

                <div className="flex-1 space-y-1 sm:space-y-2">
                  <h3 className="text-xs sm:text-sm lg:text-lg font-bold text-gray-900 leading-tight">LusoFeed</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">Updates • Photos • News</p>
                  <p className="text-xs text-gray-600 leading-relaxed">Follow events and share photos with community.</p>
                </div>

                <div className="mt-auto pt-2">
                  <a href="/feed" className="inline-flex items-center gap-1 bg-action-600 text-white text-xs font-bold px-2 sm:px-3 py-1 sm:py-2 rounded-md hover:bg-action-700 transition-all duration-300">
                    <span>View Feed</span>
                    <ArrowRight className="h-2 w-2 sm:h-3 sm:w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Favourites Section */}
          <div className="group relative transition-all duration-1000 delay-250">
            <div className="bg-white/80 backdrop-blur-lg border border-white/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 relative overflow-hidden h-[240px] sm:h-[280px] lg:h-[320px] flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-br from-premium-50 to-premium-100 opacity-0 group-hover:opacity-60 transition-opacity duration-500 rounded-xl" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-2 sm:mb-3">
                  <div className="text-xl sm:text-3xl lg:text-5xl font-black text-gray-100 group-hover:text-gray-200 transition-colors duration-300 leading-none">04</div>
                  <div className="w-7 h-7 sm:w-10 sm:h-10 lg:w-14 lg:h-14 rounded-lg lg:rounded-xl bg-gradient-to-br from-premium-500 to-premium-600 flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:rotate-6 transition-all duration-500 flex-shrink-0">
                    <Heart className="h-3 w-3 sm:h-5 sm:w-5 lg:h-7 lg:w-7 text-white" />
                  </div>
                </div>

                <div className="flex-1 space-y-1 sm:space-y-2">
                  <h3 className="text-xs sm:text-sm lg:text-lg font-bold text-gray-900 leading-tight">Save Favourites</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">Events • Businesses • Sites</p>
                  <p className="text-xs text-gray-600 leading-relaxed">Save bakeries, events and build your collection.</p>
                </div>

                <div className="mt-auto pt-2">
                  <a href="/favorites" className="inline-flex items-center gap-1 bg-premium-600 text-white text-xs font-bold px-2 sm:px-3 py-1 sm:py-2 rounded-md hover:bg-premium-700 transition-all duration-300">
                    <span>View Saved</span>
                    <ArrowRight className="h-2 w-2 sm:h-3 sm:w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Share Expertise Section */}
          <div className="group relative transition-all duration-1000 delay-300 col-span-2">
            <div className="bg-white/80 backdrop-blur-lg border border-white/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 relative overflow-hidden h-[240px] sm:h-[280px] lg:h-[320px] flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-br from-coral-50 to-coral-100 opacity-0 group-hover:opacity-60 transition-opacity duration-500 rounded-xl" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-2 sm:mb-3">
                  <div className="text-xl sm:text-3xl lg:text-5xl font-black text-gray-100 group-hover:text-gray-200 transition-colors duration-300 leading-none">05</div>
                  <div className="w-7 h-7 sm:w-10 sm:h-10 lg:w-14 lg:h-14 rounded-lg lg:rounded-xl bg-gradient-to-br from-coral-500 to-coral-600 flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:rotate-6 transition-all duration-500 flex-shrink-0">
                    <Sparkles className="h-3 w-3 sm:h-5 sm:w-5 lg:h-7 lg:w-7 text-white" />
                  </div>
                </div>

                <div className="flex-1 space-y-1 sm:space-y-2">
                  <h3 className="text-xs sm:text-sm lg:text-lg font-bold text-gray-900 leading-tight">Share Expertise</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">Workshops • Services • Events</p>
                  <p className="text-xs text-gray-600 leading-relaxed">Showcase skills to community and grow business.</p>
                </div>

                <div className="mt-auto pt-2">
                  <a href="/host" className="inline-flex items-center gap-1 bg-coral-600 text-white text-xs font-bold px-2 sm:px-3 py-1 sm:py-2 rounded-md hover:bg-coral-700 transition-all duration-300">
                    <span>Become Host</span>
                    <ArrowRight className="h-2 w-2 sm:h-3 sm:w-3" />
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