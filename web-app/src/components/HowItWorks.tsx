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
  Globe2
} from 'lucide-react'

export default function HowItWorks() {
  const [mounted, setMounted] = useState(false)
  const [activeStep, setActiveStep] = useState<number | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const steps = [
    {
      number: 1,
      title: 'Join the Community',
      subtitle: 'Junte-se à Comunidade',
      description: 'Sign up for free and create your profile to connect with Portuguese speakers across London.',
      icon: UserPlus,
      color: 'from-primary-500 to-primary-600',
      bgColor: 'from-primary-50 to-primary-100',
      accentColor: 'primary-500'
    },
    {
      number: 2,
      title: 'Discover Events & Businesses',
      subtitle: 'Descubra Eventos e Negócios',
      description: 'From food festivals to language meetups, find Portuguese cultural events and businesses near you.',
      icon: Calendar,
      color: 'from-secondary-500 to-secondary-600',
      bgColor: 'from-secondary-50 to-secondary-100',
      accentColor: 'secondary-500'
    },
    {
      number: 3,
      title: 'Share on LusoFeed',
      subtitle: 'Partilhe no LusoFeed',
      description: 'Post updates, photos, and tips. Connect with fellow Portuguese speakers and share experiences.',
      icon: MessageCircle,
      color: 'from-accent-500 to-accent-600',
      bgColor: 'from-accent-50 to-accent-100',
      accentColor: 'accent-500'
    },
    {
      number: 4,
      title: 'Save Your Favorites',
      subtitle: 'Guarde os Seus Favoritos',
      description: 'Keep track of the events, posts, and places you love. Never miss out on what matters to you.',
      icon: Heart,
      color: 'from-action-500 to-action-600',
      bgColor: 'from-action-50 to-action-100',
      accentColor: 'action-500'
    }
  ]

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-white via-gray-50 to-primary-50">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-secondary-200 via-accent-100 to-primary-100 rounded-full opacity-30 animate-pulse" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-tr from-action-200 via-secondary-100 to-accent-100 rounded-full opacity-25 animate-bounce" style={{ animationDuration: '4s' }} />
        <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-secondary-400 rounded-full opacity-40" />
        <div className="absolute top-3/4 right-1/3 w-4 h-4 bg-accent-400 rounded-full opacity-50" />
        <div className="absolute bottom-1/3 left-2/3 w-3 h-3 bg-primary-400 rounded-full opacity-50" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        {/* Header Section */}
        <div className={`text-center mb-16 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          {/* Badge */}
          <div className={`inline-flex items-center gap-3 bg-gradient-to-r from-secondary-50 via-primary-50 to-accent-50 border border-secondary-200 rounded-2xl px-6 py-3 shadow-lg transition-all duration-700 delay-100 ${mounted ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-5'} mb-6`}>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-secondary-600" />
              <span className="text-sm font-bold bg-gradient-to-r from-secondary-600 via-primary-600 to-accent-600 bg-clip-text text-transparent">
                Como Funciona • How It Works
              </span>
            </div>
            <div className="w-2 h-2 bg-secondary-400 rounded-full animate-pulse"></div>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-tight tracking-tight mb-6">
            Get Started with <span className="bg-gradient-to-r from-secondary-600 via-primary-600 to-accent-600 bg-clip-text text-transparent">LusoTown</span>
          </h2>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto font-medium">
            Join London's most vibrant Portuguese-speaking community in just four simple steps.
          </p>
        </div>

        {/* Steps Grid - Matching Hero Section Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className={`group relative transition-all duration-1000 delay-${index * 100} ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              onMouseEnter={() => setActiveStep(index)}
              onMouseLeave={() => setActiveStep(null)}
            >
              {/* Card */}
              <div className="bg-white/70 backdrop-blur-lg border border-white/50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 relative overflow-hidden">
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${step.bgColor} opacity-0 group-hover:opacity-50 transition-opacity duration-500 rounded-3xl`} />
                
                {/* Content */}
                <div className="relative z-10 space-y-6">
                  {/* Step number and icon */}
                  <div className="flex items-center justify-between">
                    <div className="text-6xl font-black text-gray-200 group-hover:text-gray-300 transition-colors duration-300">
                      {step.number.toString().padStart(2, '0')}
                    </div>
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:rotate-3 transition-all duration-500`}>
                      <step.icon className="h-8 w-8 text-white" strokeWidth={2} />
                    </div>
                  </div>

                  {/* Titles */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-sm font-medium text-gray-500 italic">
                      {step.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {step.description}
                  </p>

                  {/* Interactive arrow */}
                  <div className={`flex items-center gap-2 text-${step.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                    <span className="text-sm font-semibold">Get Started</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>

                {/* Connection line for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-20">
                    <div className={`w-8 h-8 bg-white rounded-full shadow-lg border-2 border-gray-200 flex items-center justify-center transition-all duration-300 ${activeStep === index ? 'scale-110 border-' + step.accentColor : ''}`}>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section - Matching Hero Section Style */}
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <div className="group flex items-center gap-3 bg-white/50 backdrop-blur-sm border border-white/20 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary-500 to-secondary-600 flex items-center justify-center group-hover:rotate-3 transition-transform duration-300">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-gray-800">500+</div>
              <div className="text-xs font-bold text-gray-600 tracking-wide">COMMUNITY MEMBERS</div>
            </div>
          </div>
          
          <div className="group flex items-center gap-3 bg-white/50 backdrop-blur-sm border border-white/20 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center group-hover:rotate-3 transition-transform duration-300">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-gray-800">40+</div>
              <div className="text-xs font-bold text-gray-600 tracking-wide">MONTHLY EVENTS</div>
            </div>
          </div>
          
          <div className="group flex items-center gap-3 bg-white/50 backdrop-blur-sm border border-white/20 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center group-hover:rotate-3 transition-transform duration-300">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-gray-800">75+</div>
              <div className="text-xs font-bold text-gray-600 tracking-wide">BUSINESSES</div>
            </div>
          </div>
          
          <div className="group flex items-center gap-3 bg-white/50 backdrop-blur-sm border border-white/20 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-action-500 to-action-600 flex items-center justify-center group-hover:rotate-3 transition-transform duration-300">
              <Globe2 className="h-6 w-6 text-white" />
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-gray-800">10+</div>
              <div className="text-xs font-bold text-gray-600 tracking-wide">COUNTRIES</div>
            </div>
          </div>
        </div>

        {/* CTA Section - Matching Hero Section Style */}
        <div className={`flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center transition-all duration-1000 delay-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <a
            href="/signup"
            className="group relative text-lg font-bold px-8 py-4 bg-gradient-to-r from-secondary-600 via-primary-600 to-accent-600 text-white rounded-2xl shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:-translate-y-1 hover:scale-105 overflow-hidden w-full sm:w-auto text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-secondary-700 via-primary-700 to-accent-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 flex items-center justify-center gap-3">
              Join the Community
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-200" />
            </span>
          </a>
          <a
            href="/events"
            className="text-lg font-bold px-8 py-4 bg-white/70 backdrop-blur-lg text-gray-800 border-2 border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:border-secondary-300 hover:-translate-y-1 w-full sm:w-auto text-center"
          >
            Explore Events
          </a>
        </div>
      </div>
    </section>
  )
}