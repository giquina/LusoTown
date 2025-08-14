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
      title: 'Become Part of Our Family',
      subtitle: 'Seja Bem-Vindo à Nossa Família',
      description: 'Create your free profile and step into a warm community where everyone understands the feeling of missing home. You\'ll be welcomed by Portuguese hearts who know your story and want to share theirs.',
      icon: UserPlus,
      color: 'from-secondary-500 to-secondary-600',
      bgColor: 'from-secondary-50 to-secondary-100',
      accentColor: 'secondary-500',
      examples: 'People from Portugal, Brazil, Angola, Mozambique across the UK'
    },
    {
      number: 2,
      title: 'Discover Real London Venues',
      subtitle: 'Descubra Locais Reais de Londres',
      description: 'Find authentic Portuguese gatherings at real London venues: intimate Fado sessions at traditional restaurants in Stockwell, football watch parties at Portuguese bars, cultural events at Vauxhall community centers.',
      icon: Calendar,
      color: 'from-accent-500 to-coral-500',
      bgColor: 'from-accent-50 to-coral-100',
      accentColor: 'accent-500',
      examples: 'Stockwell restaurants, Vauxhall centers, Portuguese churches, cafés'
    },
    {
      number: 3,
      title: 'Meet at Authentic Places',
      subtitle: t('how-it-works.step3.subtitle', 'Meet at Authentic Places'),
      description: 'Join events that bring Portuguese culture to life at real venues. Share stories over pastéis de nata at Portuguese bakeries, practice language at community centers, create friendships at places that feel like home.',
      icon: Coffee,
      color: 'from-action-500 to-action-600',
      bgColor: 'from-action-50 to-action-100',
      accentColor: 'action-500',
      examples: 'Portuguese bakeries, language cafés, community centers, cultural walks'
    },
    {
      number: 4,
      title: 'Build Your London Network',
      subtitle: 'Construa a Sua Rede de Londres',
      description: 'Create lasting connections with Portuguese speakers across London. Save your favorite Portuguese venues, follow community members, and never miss the cultural events that matter to your Portuguese heart.',
      icon: Heart,
      color: 'from-premium-500 to-premium-600',
      bgColor: 'from-premium-50 to-premium-100',
      accentColor: 'premium-500',
      examples: 'Save Portuguese restaurants, follow friends, bookmark venues, get reminders'
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

        {/* Enhanced Steps Grid with Portuguese Cultural Context */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-20">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className={`group relative transition-all duration-1000 delay-${index * 150} ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              onMouseEnter={() => setActiveStep(index)}
              onMouseLeave={() => setActiveStep(null)}
            >
              {/* Enhanced Card with Portuguese-inspired design */}
              <div className="bg-white/80 backdrop-blur-lg border border-white/50 rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:-translate-y-3 relative overflow-hidden min-h-[400px]">
                {/* Enhanced Background gradient with Portuguese flag inspiration */}
                <div className={`absolute inset-0 bg-gradient-to-br ${step.bgColor} opacity-0 group-hover:opacity-60 transition-opacity duration-500 rounded-3xl`} />
                
                {/* Decorative Portuguese pattern */}
                <div className="absolute top-4 right-4 w-20 h-20 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                  <div className="w-full h-full bg-gradient-to-br from-green-500 to-red-500 rounded-full"></div>
                </div>
                
                {/* Content */}
                <div className="relative z-10 space-y-6">
                  {/* Step number and icon */}
                  <div className="flex items-start justify-between mb-8">
                    <div className="text-8xl font-black text-gray-100 group-hover:text-gray-200 transition-colors duration-300 leading-none">
                      {step.number.toString().padStart(2, '0')}
                    </div>
                    <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:rotate-6 transition-all duration-500`}>
                      <step.icon className="h-10 w-10 text-white" strokeWidth={2} />
                    </div>
                  </div>

                  {/* Titles */}
                  <div className="space-y-3">
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-300 leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-base font-medium text-gray-500 italic">
                      {step.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed text-base mb-4">
                    {step.description}
                  </p>

                  {/* Examples with cultural context */}
                  <div className="bg-white/40 rounded-2xl p-4 mb-6">
                    <p className="text-sm text-gray-600 italic">
                      <span className="font-semibold text-gray-700">Examples:</span> {step.examples}
                    </p>
                  </div>

                  {/* Interactive CTA Link */}
                  <a 
                    href="/events"
                    className={`flex items-center gap-2 text-${step.accentColor} font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 hover:gap-3 cursor-pointer text-base`}
                  >
                    <span>Book Your Experience</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>

                {/* Connection line for larger screens */}
                {index % 2 === 0 && index < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-6 top-1/2 transform -translate-y-1/2 z-20">
                    <div className={`w-10 h-10 bg-white rounded-full shadow-xl border-2 border-gray-200 flex items-center justify-center transition-all duration-300 ${activeStep === index ? 'scale-110 border-' + step.accentColor : ''}`}>
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
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
                Live Life Together?
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
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="/signup"
                className="group relative text-xl font-bold px-12 py-5 bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 text-white rounded-2xl shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:-translate-y-1 hover:scale-105 overflow-hidden w-full sm:w-auto text-center"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-secondary-700 via-action-700 to-accent-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Explore Social Calendar
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </a>
              <a
                href="/events"
                className="text-xl font-bold px-12 py-5 bg-white/80 backdrop-blur-lg text-gray-800 border-2 border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:border-secondary-300 hover:-translate-y-1 w-full sm:w-auto text-center"
              >
                Book Your First Experience
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}