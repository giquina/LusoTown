'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MapPinIcon, 
  CalendarIcon, 
  UsersIcon,
  HeartIcon,
  StarIcon,
  CrownIcon,
  GlobeAltIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  SparklesIcon,
  FireIcon,
  TrophyIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { useSubscription } from '@/context/SubscriptionContext'
import { plans, formatPrice } from '@/config/pricing'

interface PortugueseValueShowcaseProps {
  context?: 'events' | 'networking' | 'dating' | 'general'
  showPricing?: boolean
  compact?: boolean
}

export default function PortugueseValueShowcase({ 
  context = 'general',
  showPricing = true,
  compact = false 
}: PortugueseValueShowcaseProps) {
  const { language } = useLanguage()
  const { createSubscription, hasActiveSubscription } = useSubscription()
  const [currentBenefit, setCurrentBenefit] = useState(0)
  const [liveEvents, setLiveEvents] = useState(12)
  const [activeMembers, setActiveMembers] = useState(147)
  
  const isPortuguese = language === 'pt'

  // Rotate benefits showcase
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBenefit(prev => (prev + 1) % premiumBenefits.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [premiumBenefits.length])

  // Animate live stats
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveEvents(prev => prev + (Math.random() > 0.7 ? 1 : 0))
      setActiveMembers(prev => prev + (Math.random() > 0.8 ? 1 : 0))
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  const premiumBenefits = [
    {
      icon: MapPinIcon,
      title: isPortuguese ? 'Eventos Exclusivos em Stockwell' : 'Exclusive Stockwell Events',
      description: isPortuguese 
        ? 'Acesso VIP a jantares portugueses, noites de fado e reuniões de negócios no coração da comunidade'
        : 'VIP access to Portuguese dinners, fado nights, and business meetups in the heart of the community',
      value: '£40+ eventos mensais',
      locations: ['Stockwell', 'Vauxhall', 'Elephant & Castle', 'Camden']
    },
    {
      icon: UsersIcon,
      title: isPortuguese ? 'Networking Empresarial' : 'Business Networking',
      description: isPortuguese 
        ? 'Conecte-se com empreendedores portugueses, profissionais de finanças e líderes empresariais'
        : 'Connect with Portuguese entrepreneurs, finance professionals, and business leaders',
      value: '£200+ valor em networking',
      locations: ['City', 'Canary Wharf', 'Shoreditch', 'Westminster']
    },
    {
      icon: HeartIcon,
      title: isPortuguese ? 'Matches de Qualidade Superior' : 'Higher Quality Matches',
      description: isPortuguese 
        ? 'Algoritmo premium prioriza compatibilidade cultural e proximidade geográfica'
        : 'Premium algorithm prioritizes cultural compatibility and geographic proximity',
      value: '3x mais matches',
      locations: ['Próximo de si', 'Mesma área', 'Transporte fácil']
    },
    {
      icon: CalendarIcon,
      title: isPortuguese ? 'Reservas Prioritárias' : 'Priority Reservations',
      description: isPortuguese 
        ? 'Seja o primeiro a reservar para eventos populares como degustações de vinho e workshops culinários'
        : 'Be first to book popular events like wine tastings and culinary workshops',
      value: 'Acesso antecipado',
      locations: ['Eventos limitados', 'VIP experiences', 'Workshops exclusivos']
    }
  ]

  const currentBenefitData = premiumBenefits[currentBenefit]
  const IconComponent = currentBenefitData.icon

  const portugueseEvents = [
    {
      name: isPortuguese ? 'Noite de Fado - Quinta-feira' : 'Fado Night - Thursday',
      location: 'Stockwell Portuguese Centre',
      attendees: 45,
      price: '£25'
    },
    {
      name: isPortuguese ? 'Jantar de Negócios - Sexta-feira' : 'Business Dinner - Friday',
      location: 'Vauxhall',
      attendees: 32,
      price: '£40'
    },
    {
      name: isPortuguese ? 'Workshop de Pastéis de Nata' : 'Pastéis de Nata Workshop',
      location: 'Camden',
      attendees: 28,
      price: '£35'
    }
  ]

  const testimonials = [
    {
      text: isPortuguese 
        ? '"Encontrei meu sócio comercial através do LusoTown. Agora temos 3 restaurantes!"'
        : '"Found my business partner through LusoTown. Now we have 3 restaurants!"',
      author: 'Miguel Santos, Chef & Entrepreneur',
      business: 'Casa Miguel Restaurants',
      verified: true
    },
    {
      text: isPortuguese 
        ? '"O networking aqui me ajudou a conseguir financiamento para minha startup."'
        : '"The networking here helped me secure funding for my startup."',
      author: 'Ana Costa, FinTech Founder',
      business: 'LusoPay',
      verified: true
    },
    {
      text: isPortuguese 
        ? '"Conheci minha esposa num evento de vinho português. Casamos ano passado!"'
        : '"Met my wife at a Portuguese wine event. Got married last year!"',
      author: 'João Ferreira, Architect',
      business: 'Ferreira Design Studio',
      verified: true
    }
  ]

  return (
    <div className={`bg-gradient-to-br from-primary-50 via-white to-secondary-50 ${compact ? 'py-8' : 'py-16'} px-4 rounded-2xl`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-primary-600 mb-4">
            <GlobeAltIcon className="w-4 h-4 mr-2" />
            {isPortuguese ? 'Comunidade Portuguesa Premium' : 'Premium Portuguese Community'}
          </div>
          
          <h2 className={`font-bold text-primary-900 mb-4 ${compact ? 'text-2xl' : 'text-3xl md:text-4xl'}`}>
            {isPortuguese ? 'Mais que uma App - Uma Comunidade' : 'More than an App - A Community'}
          </h2>
          
          <p className={`text-primary-700 max-w-2xl mx-auto ${compact ? 'text-base' : 'text-lg'}`}>
            {isPortuguese 
              ? 'Junte-se a 750+ portugueses que encontraram conexões autênticas, oportunidades de negócio e experiências culturais únicas em Londres.'
              : 'Join 750+ Portuguese speakers who found authentic connections, business opportunities, and unique cultural experiences in London.'}
          </p>
        </div>

        {/* Live Activity Banner */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-lg border border-primary-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-semibold text-primary-900">
                {isPortuguese ? 'Atividade Agora' : 'Live Activity'}
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div className="text-center">
                <motion.div 
                  key={activeMembers}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="font-bold text-primary-600"
                >
                  {activeMembers}
                </motion.div>
                <div className="text-gray-600 text-xs">
                  {isPortuguese ? 'online' : 'online'}
                </div>
              </div>
              <div className="text-center">
                <motion.div 
                  key={liveEvents}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="font-bold text-secondary-600"
                >
                  {liveEvents}
                </motion.div>
                <div className="text-gray-600 text-xs">
                  {isPortuguese ? 'eventos' : 'events'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Benefits Showcase */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Rotating Benefit */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-primary-100">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentBenefit}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary-100 rounded-full">
                    <IconComponent className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="bg-secondary-100 text-secondary-800 px-2 py-1 rounded-full text-xs font-bold">
                    {currentBenefitData.value}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-primary-900 mb-2">
                  {currentBenefitData.title}
                </h3>
                
                <p className="text-primary-700 mb-4 leading-relaxed">
                  {currentBenefitData.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {currentBenefitData.locations.map((location, index) => (
                    <span 
                      key={index}
                      className="bg-primary-50 text-primary-700 px-2 py-1 rounded-full text-xs font-medium"
                    >
                      📍 {location}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Portuguese Events This Week */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-primary-100">
            <div className="flex items-center gap-2 mb-4">
              <CalendarIcon className="w-5 h-5 text-secondary-600" />
              <h3 className="text-lg font-bold text-primary-900">
                {isPortuguese ? 'Eventos Esta Semana' : 'Events This Week'}
              </h3>
            </div>
            
            <div className="space-y-3">
              {portugueseEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 text-sm truncate">
                      {event.name}
                    </div>
                    <div className="text-xs text-gray-600 flex items-center gap-1">
                      <MapPinIcon className="w-3 h-3" />
                      {event.location}
                    </div>
                  </div>
                  <div className="text-right ml-2">
                    <div className="font-bold text-primary-600 text-sm">{event.price}</div>
                    <div className="text-xs text-gray-500">{event.attendees} going</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 text-center">
              <div className="text-xs text-gray-500 mb-2">
                {isPortuguese ? '+15 eventos este mês' : '+15 events this month'}
              </div>
              {!hasActiveSubscription && (
                <button 
                  onClick={() => createSubscription('community')}
                  className="bg-secondary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-secondary-700 transition-all hover:scale-105"
                >
                  {isPortuguese ? 'Ver Todos' : 'See All Events'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Success Stories */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-primary-100 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <TrophyIcon className="w-5 h-5 text-yellow-600" />
            <h3 className="text-lg font-bold text-primary-900">
              {isPortuguese ? 'Histórias de Sucesso' : 'Success Stories'}
            </h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-700 italic mb-3 leading-relaxed">
                  {testimonial.text}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <cite className="text-xs font-semibold text-gray-900 not-italic">
                      {testimonial.author}
                    </cite>
                    <div className="text-xs text-gray-600">{testimonial.business}</div>
                  </div>
                  {testimonial.verified && (
                    <CheckCircleIcon className="w-4 h-4 text-blue-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing CTA */}
        {showPricing && !hasActiveSubscription && (
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl p-6 text-white text-center">
            <h3 className="text-2xl font-bold mb-2">
              {isPortuguese ? 'Pronto para Se Juntar?' : 'Ready to Join?'}
            </h3>
            
            <p className="mb-4 opacity-90">
              {isPortuguese 
                ? 'Acesso completo à comunidade portuguesa mais ativa de Londres'
                : 'Full access to London\'s most active Portuguese community'}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3">
                <div className="text-2xl font-bold">
                  {formatPrice(plans.community.monthly)}
                  <span className="text-lg font-normal">/mês</span>
                </div>
                <div className="text-sm opacity-80">
                  {isPortuguese ? 'Membro da Comunidade' : 'Community Member'}
                </div>
              </div>
              
              <button
                onClick={() => createSubscription('community')}
                className="bg-white text-primary-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg"
              >
                {isPortuguese ? 'Juntar-se Agora' : 'Join Now'}
              </button>
            </div>
            
            <div className="mt-4 text-sm opacity-80">
              {isPortuguese 
                ? '750+ portugueses já se juntaram • Cancelar a qualquer momento'
                : '750+ Portuguese speakers already joined • Cancel anytime'}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}