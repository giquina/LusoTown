'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  SparklesIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  GlobeEuropeAfricaIcon,
  CheckCircleIcon,
  TruckIcon,
  ArrowRightIcon,
  UserGroupIcon,
  ClockIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import BookingTrigger from './BookingTrigger'
import { type ServiceType } from './IntelligentBookingFlow'

const DEMO_SERVICES: ServiceType[] = [
  {
    id: 'portuguese-tours',
    name: 'Portuguese Heritage Tours',
    namePortuguese: 'Tours do Património Português',
    description: 'Guided cultural tours of Portuguese areas in London & UK',
    descriptionPortuguese: 'Tours culturais guiados das áreas portuguesas em Londres e Reino Unido',
    category: 'standard',
    requiresSIA: false,
    basePrice: 65,
    icon: GlobeEuropeAfricaIcon,
    features: [
      'Portuguese-speaking guide',
      'Cultural landmarks visit',
      'Community venues tour',
      'Heritage storytelling'
    ],
    featuresPortuguese: [
      'Guia que fala português',
      'Visita a marcos culturais',
      'Tour de locais comunitários',
      'Narrativa do património'
    ]
  },
  {
    id: 'airport-transfers',
    name: 'Premium Airport Transfers',
    namePortuguese: 'Transferências Premium de Aeroporto',
    description: 'Luxury transport to/from all London airports',
    descriptionPortuguese: 'Transporte de luxo de/para todos os aeroportos de Londres',
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
  }
]

export default function BookingSystemDemo() {
  const { language } = useLanguage()
  const isPortuguese = language === 'pt'
  
  const [selectedDemo, setSelectedDemo] = useState<'features' | 'flow' | 'integration'>('features')

  const features = [
    {
      icon: SparklesIcon,
      title: isPortuguese ? 'Detecção Inteligente de Serviço' : 'Intelligent Service Detection',
      description: isPortuguese 
        ? 'Sistema determina automaticamente o fluxo de reserva apropriado baseado no tipo de serviço selecionado'
        : 'System automatically determines appropriate booking flow based on selected service type'
    },
    {
      icon: ShieldCheckIcon,
      title: isPortuguese ? 'Conformidade SIA Integrada' : 'Integrated SIA Compliance',
      description: isPortuguese 
        ? 'Questionário de conformidade SIA automatizado para serviços de segurança com avaliação de risco'
        : 'Automated SIA compliance questionnaire for security services with risk assessment'
    },
    {
      icon: CreditCardIcon,
      title: isPortuguese ? 'Processamento de Pagamentos Avançado' : 'Advanced Payment Processing',
      description: isPortuguese 
        ? 'Suporte a 135+ moedas, prestações da comunidade portuguesa, e faturação corporativa'
        : '135+ currency support, Portuguese community installments, and corporate billing'
    },
    {
      icon: UserGroupIcon,
      title: isPortuguese ? 'Foco na Comunidade Portuguesa' : 'Portuguese Community Focus',
      description: isPortuguese 
        ? 'Funcionalidades específicas para a comunidade portuguesa em Londres e Reino Unido'
        : 'Specific features for Portuguese community in London & UK'
    },
    {
      icon: GlobeEuropeAfricaIcon,
      title: isPortuguese ? 'Suporte Multi-Moeda' : 'Multi-Currency Support',
      description: isPortuguese 
        ? 'GBP, EUR, USD, BRL (Real Brasileiro), MXN com conversão em tempo real'
        : 'GBP, EUR, USD, BRL (Brazilian Real), MXN with real-time conversion'
    },
    {
      icon: ClockIcon,
      title: isPortuguese ? 'Preços Dinâmicos' : 'Dynamic Pricing',
      description: isPortuguese 
        ? 'Motor de preços em tempo real com descontos de membro, pacotes e corporativos'
        : 'Real-time pricing engine with member, bundle, and corporate discounts'
    }
  ]

  const flowSteps = [
    {
      title: isPortuguese ? 'Seleção de Serviço' : 'Service Selection',
      description: isPortuguese ? 'Sistema detecta automaticamente o tipo de fluxo necessário' : 'System automatically detects required flow type',
      icon: SparklesIcon,
      flows: [
        isPortuguese ? 'Padrão: Tours/Transporte' : 'Standard: Tours/Transport',
        isPortuguese ? 'Melhorado: Serviços de Segurança' : 'Enhanced: Security Services',
        isPortuguese ? 'Híbrido: Pacotes Combinados' : 'Hybrid: Combined Packages'
      ]
    },
    {
      title: isPortuguese ? 'Avaliação de Conformidade' : 'Compliance Assessment',
      description: isPortuguese ? 'Questionário SIA automático para serviços de segurança' : 'Automatic SIA questionnaire for security services',
      icon: ShieldCheckIcon,
      flows: [
        isPortuguese ? 'Perfil do cliente e avaliação de ameaças' : 'Client profile and threat assessment',
        isPortuguese ? 'Requisitos de proteção específicos' : 'Specific protection requirements',
        isPortuguese ? 'Considerações médicas e contactos de emergência' : 'Medical considerations and emergency contacts'
      ]
    },
    {
      title: isPortuguese ? 'Detalhes da Reserva' : 'Booking Details',
      description: isPortuguese ? 'Formulário adaptável baseado no tipo de serviço' : 'Adaptive form based on service type',
      icon: CalendarDaysIcon,
      flows: [
        isPortuguese ? 'Data, hora e duração' : 'Date, time, and duration',
        isPortuguese ? 'Localização e preferências' : 'Location and preferences',
        isPortuguese ? 'Tamanho do grupo e requisitos especiais' : 'Group size and special requirements'
      ]
    },
    {
      title: isPortuguese ? 'Processamento de Pagamento' : 'Payment Processing',
      description: isPortuguese ? 'Sistema de pagamento multi-moeda com opções da comunidade' : 'Multi-currency payment system with community options',
      icon: CreditCardIcon,
      flows: [
        isPortuguese ? 'Cartões de crédito/débito (135+ moedas)' : 'Credit/debit cards (135+ currencies)',
        isPortuguese ? 'Prestações da comunidade portuguesa' : 'Portuguese community installments',
        isPortuguese ? 'Faturação de conta corporativa' : 'Corporate account billing'
      ]
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {isPortuguese ? 'Sistema de Reserva Inteligente' : 'Intelligent Booking System'}
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {isPortuguese 
            ? 'Fluxo automatizado que se adapta ao tipo de serviço selecionado, com suporte completo para conformidade SIA e pagamentos internacionais'
            : 'Automated flow that adapts to selected service type, with complete support for SIA compliance and international payments'
          }
        </p>
      </div>

      {/* Demo Navigation */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 rounded-lg p-1 flex space-x-1">
          {[
            { id: 'features', label: isPortuguese ? 'Funcionalidades' : 'Features' },
            { id: 'flow', label: isPortuguese ? 'Fluxo' : 'Flow' },
            { id: 'integration', label: isPortuguese ? 'Integração' : 'Integration' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedDemo(tab.id as any)}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedDemo === tab.id
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Features Demo */}
      {selectedDemo === 'features' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center mb-4">
                  <IconComponent className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      )}

      {/* Flow Demo */}
      {selectedDemo === 'flow' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8 mb-12"
        >
          {flowSteps.map((step, index) => {
            const IconComponent = step.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
              >
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {step.description}
                    </p>
                    <ul className="space-y-2">
                      {step.flows.map((flow, flowIndex) => (
                        <li key={flowIndex} className="flex items-center text-sm text-gray-700">
                          <CheckCircleIcon className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                          {flow}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      )}

      {/* Integration Demo */}
      {selectedDemo === 'integration' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8 mb-12"
        >
          {/* Service Cards */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              {isPortuguese ? 'Demonstração de Serviços' : 'Service Demonstration'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {DEMO_SERVICES.map((service) => {
                const IconComponent = service.icon
                return (
                  <div key={service.id} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                    <div className={`
                      w-12 h-12 rounded-xl flex items-center justify-center mb-4
                      ${service.category === 'standard' ? 'bg-blue-100 text-blue-600' :
                        service.category === 'enhanced' ? 'bg-red-100 text-red-600' :
                        'bg-purple-100 text-purple-600'
                      }
                    `}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {isPortuguese ? service.namePortuguese : service.name}
                    </h4>
                    
                    <p className="text-sm text-gray-600 mb-4">
                      {isPortuguese ? service.descriptionPortuguese : service.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-gray-900">
                        From £{service.basePrice}/hr
                      </span>
                      {service.requiresSIA && (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800">
                          SIA
                        </span>
                      )}
                    </div>

                    <BookingTrigger
                      variant="button"
                      size="sm"
                      preSelectedService={service}
                      className="w-full"
                    />
                  </div>
                )
              })}
            </div>
          </div>

          {/* Integration Variants */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              {isPortuguese ? 'Variantes de Integração' : 'Integration Variants'}
            </h3>
            <div className="space-y-8">
              {/* Button Variant */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  {isPortuguese ? 'Variante de Botão' : 'Button Variant'}
                </h4>
                <div className="flex space-x-4">
                  <BookingTrigger variant="button" size="sm" />
                  <BookingTrigger variant="button" size="md" />
                  <BookingTrigger variant="button" size="lg" />
                </div>
              </div>

              {/* Card Variant */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  {isPortuguese ? 'Variante de Cartão' : 'Card Variant'}
                </h4>
                <div className="max-w-md">
                  <BookingTrigger variant="card" />
                </div>
              </div>

              {/* Hero Variant */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  {isPortuguese ? 'Variante Hero' : 'Hero Variant'}
                </h4>
                <BookingTrigger variant="hero" />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Summary Section */}
      <div className="bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {isPortuguese ? 'Sistema Completo de Reservas' : 'Complete Booking System'}
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          {isPortuguese 
            ? 'Integração perfeita com o sistema existente LusoTown, mantendo os padrões profissionais e foco na comunidade portuguesa.'
            : 'Seamless integration with existing LusoTown system, maintaining professional standards and Portuguese community focus.'
          }
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: isPortuguese ? 'Tipos de Serviço' : 'Service Types', value: '4+' },
            { label: isPortuguese ? 'Moedas Suportadas' : 'Supported Currencies', value: '135+' },
            { label: isPortuguese ? 'Métodos de Pagamento' : 'Payment Methods', value: '4' },
            { label: isPortuguese ? 'Níveis de Subscrição' : 'Membership Tiers', value: '3' }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-lg p-4">
              <div className="text-2xl font-bold text-primary-600">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        <BookingTrigger
          variant="button"
          size="lg"
          className="inline-flex"
        />
      </div>
    </div>
  )
}