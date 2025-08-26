'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HeartIcon,
  CalendarDaysIcon,
  UserPlusIcon,
  ChatBubbleLeftRightIcon,
  SparklesIcon,
  ArrowRightIcon,
  QuestionMarkCircleIcon,
  CheckCircleIcon,
  PlayCircleIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { useLanguage } from '@/context/LanguageContext'
import { ROUTES } from '@/config/routes'

/**
 * Enhanced Matches Section with Comprehensive Beginner Guidance
 * Addresses the critical UX issue where users don't know where to click or what to do next
 * 
 * Features:
 * - Clear step-by-step progression indicators
 * - "Join This Event Type" CTAs for each category
 * - "Start Your Story" CTA after testimonials
 * - Contextual tooltips explaining each option
 * - Progress tracking through user journey
 */
export default function EnhancedMatchesGuidance() {
  const { language } = useLanguage()
  const isPortuguese = language === 'pt'
  const [activeStep, setActiveStep] = useState(1)
  const [showTooltip, setShowTooltip] = useState<string | null>(null)
  const [userProgress, setUserProgress] = useState<string[]>([])

  // Event types with clear CTAs
  const eventTypes = [
    {
      id: 'cultural',
      title: isPortuguese ? 'Eventos Culturais' : 'Cultural Events',
      description: isPortuguese 
        ? 'Fado, festivais e celebrações tradicionais'
        : 'Fado nights, festivals and traditional celebrations',
      icon: HeartIcon,
      color: 'from-red-500 to-orange-500',
      examples: isPortuguese 
        ? ['Noites de Fado', 'Festival de Santo António', 'Aulas de Dança']
        : ['Fado Nights', 'Santo António Festival', 'Dance Classes'],
      cta: isPortuguese ? 'Explorar Eventos Culturais' : 'Explore Cultural Events',
      route: `${ROUTES.events}?type=cultural`,
      tooltip: isPortuguese 
        ? '🎭 Perfeito para quem ama tradições portuguesas. Experimente fado, festivais e celebrações autênticas.'
        : '🎭 Perfect if you love Portuguese traditions. Experience fado, festivals and authentic celebrations.'
    },
    {
      id: 'social',
      title: isPortuguese ? 'Encontros Sociais' : 'Social Meetups',
      description: isPortuguese 
        ? 'Grupos de conversa e encontros casuais'
        : 'Language exchanges and casual meetups',
      icon: ChatBubbleLeftRightIcon,
      color: 'from-blue-500 to-purple-500',
      examples: isPortuguese 
        ? ['Café Português', 'Futebol no Parque', 'Noites de Karaoke']
        : ['Portuguese Coffee', 'Football in the Park', 'Karaoke Nights'],
      cta: isPortuguese ? 'Juntar-se a Encontros' : 'Join Social Meetups',
      route: `${ROUTES.events}?type=social`,
      tooltip: isPortuguese 
        ? '☕ Ideal para quem quer fazer novos amigos. Encontros casuais em cafés, parques e eventos sociais.'
        : '☕ Ideal if you want to make new friends. Casual meetups in cafes, parks and social events.'
    },
    {
      id: 'business',
      title: isPortuguese ? 'Networking Profissional' : 'Professional Networking',
      description: isPortuguese 
        ? 'Oportunidades de negócio e carreira'
        : 'Business opportunities and career growth',
      icon: UserPlusIcon,
      color: 'from-green-500 to-teal-500',
      examples: isPortuguese 
        ? ['Empreendedores', 'Investidores', 'Tech Talks']
        : ['Entrepreneurs', 'Investors', 'Tech Talks'],
      cta: isPortuguese ? 'Fazer Networking' : 'Start Networking',
      route: `${ROUTES.events}?type=business`,
      tooltip: isPortuguese 
        ? '💼 Perfeito para desenvolver sua carreira. Conecte-se com empresários e profissionais portugueses em Londres.'
        : '💼 Perfect for developing your career. Connect with Portuguese entrepreneurs and professionals in London.'
    },
    {
      id: 'sports',
      title: isPortuguese ? 'Desporto & Fitness' : 'Sports & Fitness',
      description: isPortuguese 
        ? 'Atividades físicas e desportivas'
        : 'Physical activities and sports',
      icon: CalendarDaysIcon,
      color: 'from-yellow-500 to-orange-500',
      examples: isPortuguese 
        ? ['Futebol', 'Corrida', 'Surf Trips']
        : ['Football', 'Running', 'Surf Trips'],
      cta: isPortuguese ? 'Entrar em Actividades' : 'Join Activities',
      route: `${ROUTES.events}?type=sports`,
      tooltip: isPortuguese 
        ? '⚽ Ótimo para manter-se em forma! Junte-se a jogos de futebol, corridas e outras atividades desportivas.'
        : '⚽ Great for staying fit! Join football games, running groups and other sports activities.'
    }
  ]

  // Step-by-step user journey
  const journeySteps = [
    {
      step: 1,
      title: isPortuguese ? 'Escolha o Seu Interesse' : 'Choose Your Interest',
      description: isPortuguese 
        ? 'Selecione o tipo de evento que mais lhe interessa'
        : 'Select the type of event that interests you most',
      icon: LightBulbIcon,
      status: userProgress.includes('interest') ? 'completed' : activeStep === 1 ? 'active' : 'pending'
    },
    {
      step: 2,
      title: isPortuguese ? 'Junte-se a um Evento' : 'Join an Event',
      description: isPortuguese 
        ? 'Participe no seu primeiro evento da comunidade'
        : 'Attend your first community event',
      icon: CalendarDaysIcon,
      status: userProgress.includes('event') ? 'completed' : activeStep === 2 ? 'active' : 'pending'
    },
    {
      step: 3,
      title: isPortuguese ? 'Conecte-se' : 'Connect',
      description: isPortuguese 
        ? 'Converse e construa relacionamentos duradouros'
        : 'Chat and build lasting relationships',
      icon: HeartIcon,
      status: userProgress.includes('connect') ? 'completed' : activeStep === 3 ? 'active' : 'pending'
    }
  ]

  // Success story with CTA
  const successStory = {
    text: isPortuguese 
      ? 'Conheci o meu melhor amigo num evento de futebol do LusoTown. Agora exploramos Londres juntos todos os fins de semana!'
      : 'I met my best friend at a LusoTown football event. Now we explore London together every weekend!',
    author: 'Carlos, 28, Bermondsey',
    event: isPortuguese ? 'Futebol no Hyde Park' : 'Football in Hyde Park',
    months: 6,
    cta: isPortuguese ? 'Comece a Sua História' : 'Start Your Story'
  }

  const handleEventTypeClick = (eventType: typeof eventTypes[0]) => {
    if (!userProgress.includes('interest')) {
      setUserProgress(prev => [...prev, 'interest'])
      setActiveStep(2)
    }
    
    // Navigate to events page with filter
    window.location.href = eventType.route
  }

  const handleTooltipToggle = (id: string | null) => {
    setShowTooltip(showTooltip === id ? null : id)
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-white via-primary-50/20 to-secondary-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with progress indication */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-100 to-secondary-100 px-6 py-3 rounded-full text-primary-700 font-bold text-sm mb-6">
            <HeartSolidIcon className="w-4 h-4" />
            {isPortuguese ? 'Encontre a Sua Comunidade' : 'Find Your Community'}
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {isPortuguese 
              ? 'Como Conectar-se com Portugueses em Londres?'
              : 'How to Connect with Portuguese Speakers in London?'}
          </h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            {isPortuguese
              ? 'Siga estes 3 passos simples para encontrar a sua comunidade perfeita e construir relacionamentos duradouros.'
              : 'Follow these 3 simple steps to find your perfect community and build lasting relationships.'}
          </p>
        </div>

        {/* Progress Journey Steps */}
        <div className="mb-16">
          <div className="flex justify-center items-center mb-8">
            {journeySteps.map((step, index) => (
              <div key={step.step} className="flex items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className={`relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                    step.status === 'completed' 
                      ? 'bg-green-500 border-green-500' 
                      : step.status === 'active'
                      ? 'bg-primary-500 border-primary-500 animate-pulse'
                      : 'bg-gray-100 border-gray-300'
                  }`}
                >
                  {step.status === 'completed' ? (
                    <CheckCircleIcon className="w-6 h-6 text-white" />
                  ) : (
                    <step.icon className={`w-6 h-6 ${
                      step.status === 'active' ? 'text-white' : 'text-gray-400'
                    }`} />
                  )}
                  
                  {/* Step tooltip */}
                  <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center min-w-max">
                    <div className={`text-sm font-medium ${
                      step.status === 'active' ? 'text-primary-600' : 'text-gray-600'
                    }`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 max-w-32">
                      {step.description}
                    </div>
                  </div>
                </motion.div>
                
                {index < journeySteps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 transition-all duration-300 ${
                    userProgress.length > index ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Event Type Categories with Clear CTAs */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            {isPortuguese 
              ? 'Passo 1: Escolha o Que Mais Lhe Interessa'
              : 'Step 1: Choose What Interests You Most'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {eventTypes.map((eventType, index) => (
              <motion.div
                key={eventType.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary-200"
              >
                {/* Beginner help button with pulse animation */}
                <button
                  onClick={() => handleTooltipToggle(eventType.id)}
                  className="absolute top-4 right-4 w-7 h-7 bg-primary-100 hover:bg-primary-200 rounded-full flex items-center justify-center transition-all duration-300 animate-pulse hover:animate-none focus:animate-none"
                  aria-label="Beginner guide"
                >
                  <QuestionMarkCircleIcon className="w-5 h-5 text-primary-600" />
                </button>

                {/* Enhanced beginner tooltip */}
                <AnimatePresence>
                  {showTooltip === eventType.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: -10 }}
                      className="absolute top-12 right-0 left-0 bg-white text-gray-800 text-sm px-4 py-3 rounded-xl shadow-xl border border-gray-200 z-20 mx-2"
                    >
                      <div className="flex items-start gap-2">
                        <div className="text-base">💡</div>
                        <div>
                          <div className="font-semibold text-primary-700 mb-1">
                            {isPortuguese ? 'Para Principiantes:' : 'For Beginners:'}
                          </div>
                          <div className="leading-relaxed">
                            {eventType.tooltip}
                          </div>
                        </div>
                      </div>
                      <div className="absolute -top-2 right-6 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Icon and title */}
                <div className={`w-12 h-12 bg-gradient-to-r ${eventType.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <eventType.icon className="w-6 h-6 text-white" />
                </div>

                <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors">
                  {eventType.title}
                </h4>

                <p className="text-gray-600 text-sm mb-4">
                  {eventType.description}
                </p>

                {/* Examples */}
                <div className="mb-6">
                  <div className="text-xs font-medium text-gray-500 mb-2">
                    {isPortuguese ? 'Exemplos:' : 'Examples:'}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {eventType.examples.map((example) => (
                      <span
                        key={example}
                        className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-700"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Primary CTA Button - "Join This Event Type" */}
                <button
                  onClick={() => handleEventTypeClick(eventType)}
                  className={`w-full bg-gradient-to-r ${eventType.color} text-white font-semibold py-3 px-4 rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group/btn animate-pulse hover:animate-none focus:animate-none`}
                >
                  <eventType.icon className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                  <span>{isPortuguese ? 'Juntar-me a Este Tipo de Evento' : 'Join This Event Type'}</span>
                  <ArrowRightIcon className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Success Story with CTA */}
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl p-8 text-white text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <HeartSolidIcon className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <div className="font-bold text-lg">{successStory.author}</div>
                <div className="text-sm text-white/80">{successStory.event} • {successStory.months} {isPortuguese ? 'meses atrás' : 'months ago'}</div>
              </div>
            </div>
            
            <blockquote className="text-xl md:text-2xl font-medium mb-8 italic leading-relaxed">
              "{successStory.text}"
            </blockquote>

            {/* Primary "Start Your Story" CTA */}
            <div className="space-y-4">
              <button
                onClick={() => {
                  setUserProgress(prev => [...prev, 'story'])
                  window.location.href = ROUTES.apply
                }}
                className="bg-white text-primary-600 font-bold py-4 px-8 rounded-2xl hover:bg-gray-50 transition-all duration-300 shadow-lg flex items-center gap-2 mx-auto group animate-bounce hover:animate-none focus:animate-none transform hover:scale-105"
              >
                <PlayCircleIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                {successStory.cta}
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              {/* Progress indicator hint */}
              <div className="text-center text-white/80 text-sm">
                {isPortuguese 
                  ? 'Siga os 3 passos simples acima para começar'
                  : 'Follow the 3 simple steps above to get started'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}