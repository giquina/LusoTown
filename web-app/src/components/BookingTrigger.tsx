'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  SparklesIcon,
  ShieldCheckIcon,
  TruckIcon,
  GlobeEuropeAfricaIcon,
  ArrowRightIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import SmartBookingSystem from './SmartBookingSystem'
import { type ServiceType } from './IntelligentBookingFlow'

interface BookingTriggerProps {
  variant?: 'button' | 'card' | 'hero'
  preSelectedService?: ServiceType
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const FEATURED_SERVICES: ServiceType[] = [
  {
    id: 'portuguese-tours',
    name: 'Portuguese Cultural Tours',
    namePortuguese: 'Tours da Cultura Portuguesa',
    description: 'Discover Portuguese culture and traditions across London & UK',
    descriptionPortuguese: 'Descubra a cultura e tradições portuguesas em Londres e Reino Unido',
    category: 'standard',
    requiresSIA: false,
    basePrice: 65,
    icon: GlobeEuropeAfricaIcon,
    features: [
      'Portuguese-speaking guide',
      'Cultural landmarks',
      'Community venues',
      'Heritage storytelling'
    ],
    featuresPortuguese: [
      'Guia que fala português',
      'Marcos culturais',
      'Locais comunitários',
      'Narrativa do património'
    ]
  },
  {
    id: 'airport-transfers',
    name: 'Premium Airport Transfers',
    namePortuguese: 'Transferências Premium de Aeroporto',
    description: 'Luxury transport to/from all London airports with Portuguese assistance',
    descriptionPortuguese: 'Transporte de luxo de/para todos os aeroportos de Londres com assistência portuguesa',
    category: 'standard',
    requiresSIA: false,
    basePrice: 85,
    icon: TruckIcon,
    features: [
      'Flight monitoring',
      'Meet & greet service',
      'Luggage assistance',
      'Portuguese assistance'
    ],
    featuresPortuguese: [
      'Monitorização de voos',
      'Serviço de receção',
      'Assistência com bagagem',
      'Assistência portuguesa'
    ]
  },
  {
    id: 'vip-protection',
    name: 'VIP Close Protection',
    namePortuguese: 'Proteção Próxima VIP',
    description: 'Professional security services with SIA-licensed officers',
    descriptionPortuguese: 'Serviços de segurança profissional com oficiais licenciados SIA',
    category: 'enhanced',
    requiresSIA: true,
    basePrice: 150,
    icon: ShieldCheckIcon,
    features: [
      'SIA-licensed officers',
      'Risk assessment',
      'Portuguese cultural understanding',
      'Professional discretion'
    ],
    featuresPortuguese: [
      'Oficiais licenciados SIA',
      'Avaliação de risco',
      'Compreensão cultural portuguesa',
      'Discrição profissional'
    ]
  },
  {
    id: 'luxury-experiences',
    name: 'Luxury Experience Packages',
    namePortuguese: 'Pacotes de Experiências de Luxo',
    description: 'Combined transport and cultural experiences with optional security',
    descriptionPortuguese: 'Transporte combinado e experiências culturais com segurança opcional',
    category: 'hybrid',
    requiresSIA: false,
    basePrice: 120,
    icon: SparklesIcon,
    features: [
      'Premium vehicles',
      'Cultural experiences',
      'Optional security',
      'Bespoke itineraries'
    ],
    featuresPortuguese: [
      'Veículos de luxo',
      'Experiências culturais',
      'Segurança opcional',
      'Itinerários personalizados'
    ]
  }
]

export default function BookingTrigger({
  variant = 'button',
  preSelectedService,
  size = 'md',
  className = ''
}: BookingTriggerProps) {
  const { language } = useLanguage()
  const isPortuguese = language === 'pt'
  
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  const handleBookingOpen = () => {
    setIsBookingOpen(true)
  }

  const handleBookingClose = () => {
    setIsBookingOpen(false)
  }

  // Button Variant
  if (variant === 'button') {
    const sizeClasses = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg'
    }

    return (
      <>
        <button
          onClick={handleBookingOpen}
          className={`
            bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg 
            hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 
            font-semibold shadow-lg hover:shadow-xl transform hover:scale-105
            flex items-center space-x-2
            ${sizeClasses[size]} ${className}
          `}
        >
          <SparklesIcon className="w-5 h-5" />
          <span>
            {preSelectedService 
              ? (isPortuguese ? 'Reservar Agora' : 'Book Now')
              : (isPortuguese ? 'Reserva Inteligente' : 'Smart Booking')
            }
          </span>
          <ArrowRightIcon className="w-4 h-4" />
        </button>

        <SmartBookingSystem
          isOpen={isBookingOpen}
          onClose={handleBookingClose}
          preSelectedService={preSelectedService}
        />
      </>
    )
  }

  // Card Variant
  if (variant === 'card') {
    return (
      <>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleBookingOpen}
          className={`
            bg-white rounded-xl shadow-lg border border-gray-200 p-6 cursor-pointer
            hover:shadow-xl transition-all duration-200 ${className}
          `}
        >
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center">
              <SparklesIcon className="w-6 h-6 text-primary-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {isPortuguese ? 'Sistema de Reserva Inteligente' : 'Smart Booking System'}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {isPortuguese 
                  ? 'Fluxo automático baseado no serviço selecionado. Suporte completo para pagamentos e conformidade SIA.'
                  : 'Automatic flow based on selected service. Complete support for payments and SIA compliance.'
                }
              </p>
              
              <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                <CheckCircleIcon className="w-4 h-4 text-green-500" />
                <span>{isPortuguese ? 'Detecção automática de serviço' : 'Automatic service detection'}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                <CheckCircleIcon className="w-4 h-4 text-green-500" />
                <span>{isPortuguese ? 'Conformidade SIA integrada' : 'Integrated SIA compliance'}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
                <CheckCircleIcon className="w-4 h-4 text-green-500" />
                <span>{isPortuguese ? 'Suporte a 135+ moedas' : '135+ currency support'}</span>
              </div>

              <div className="flex items-center text-primary-600 font-semibold">
                <span>{isPortuguese ? 'Iniciar Reserva' : 'Start Booking'}</span>
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </div>
            </div>
          </div>
        </motion.div>

        <SmartBookingSystem
          isOpen={isBookingOpen}
          onClose={handleBookingClose}
          preSelectedService={preSelectedService}
        />
      </>
    )
  }

  // Hero Variant
  if (variant === 'hero') {
    return (
      <>
        <div className={`bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 rounded-2xl p-8 ${className}`}>
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <SparklesIcon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {isPortuguese ? 'Sistema de Reserva Inteligente' : 'Intelligent Booking System'}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
              {isPortuguese 
                ? 'Experiência de reserva revolucionária que se adapta automaticamente ao tipo de serviço escolhido, com suporte completo para pagamentos internacionais e conformidade SIA.'
                : 'Revolutionary booking experience that automatically adapts to your chosen service type, with complete support for international payments and SIA compliance.'
              }
            </p>
          </div>

          {/* Featured Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {FEATURED_SERVICES.map((service) => {
              const IconComponent = service.icon
              return (
                <motion.div
                  key={service.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setIsBookingOpen(true)
                  }}
                  className="bg-white rounded-xl shadow-md border border-gray-200 p-6 cursor-pointer hover:shadow-lg transition-all duration-200"
                >
                  <div className={`
                    w-12 h-12 rounded-lg flex items-center justify-center mb-4
                    ${service.category === 'standard' ? 'bg-blue-100 text-blue-600' :
                      service.category === 'enhanced' ? 'bg-red-100 text-red-600' :
                      'bg-purple-100 text-purple-600'
                    }
                  `}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {isPortuguese ? service.namePortuguese : service.name}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-4">
                    {isPortuguese ? service.descriptionPortuguese : service.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">
                      From £{service.basePrice}/hr
                    </span>
                    {service.requiresSIA && (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800">
                        SIA
                      </span>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <button
              onClick={handleBookingOpen}
              className="px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-semibold text-lg hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-3 mx-auto"
            >
              <SparklesIcon className="w-6 h-6" />
              <span>
                {isPortuguese ? 'Começar Reserva Inteligente' : 'Start Intelligent Booking'}
              </span>
              <ArrowRightIcon className="w-5 h-5" />
            </button>
            
            <p className="text-sm text-gray-600 mt-4">
              {isPortuguese 
                ? 'Fluxo automático • Conformidade SIA • 135+ moedas • Pagamentos seguros'
                : 'Automatic flow • SIA compliance • 135+ currencies • Secure payments'
              }
            </p>
          </div>
        </div>

        <SmartBookingSystem
          isOpen={isBookingOpen}
          onClose={handleBookingClose}
          preSelectedService={preSelectedService}
        />
      </>
    )
  }

  return null
}