'use client'

import { motion } from 'framer-motion'
import { 
  ArrowRightIcon, 
  CheckCircleIcon,
  ClockIcon,
  MapPinIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  CurrencyPoundIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import { Car, Shield, MapPin, Users, Crown, TrendingUp } from 'lucide-react'

interface ServiceIntegrationProps {
  isPortuguese: boolean
}

const ServiceIntegration: React.FC<ServiceIntegrationProps> = ({ isPortuguese }) => {
  const integrationScenarios = [
    {
      id: 'complete-experience',
      title: 'Premium Transport Experience',
      titlePortuguese: 'Experiência de Transporte Premium',
      description: 'Executive transport + Professional security for premium VIP experience',
      descriptionPortuguese: 'Transporte executivo + Segurança profissional para experiência VIP premium',
      services: ['executive-transport', 'close-protection'],
      duration: '6 hours',
      durationPortuguese: '6 horas',
      price: 'From £450',
      pricePortuguese: 'A partir de £450',
      savings: 'Save £120',
      savingsPortuguese: 'Economize £120',
      popular: true,
      flow: [
        {
          step: 1,
          action: 'Hotel pickup with executive vehicle',
          actionPortuguese: 'Recolha no hotel com veículo executivo',
          icon: Car
        },
        {
          step: 2,
          action: 'Portuguese heritage tour with bilingual guide',
          actionPortuguese: 'Tour do património português com guia bilíngue',
          icon: MapPin
        },
        {
          step: 3,
          action: 'Discrete security throughout experience',
          actionPortuguese: 'Segurança discreta durante toda a experiência',
          icon: Shield
        },
        {
          step: 4,
          action: 'Safe return to destination',
          actionPortuguese: 'Retorno seguro ao destino',
          icon: CheckCircleIcon
        }
      ]
    },
    {
      id: 'business-package',
      title: 'Business Delegation Package',
      titlePortuguese: 'Pacote de Delegação de Negócios',
      description: 'Multi-day executive transport with full protection for business delegations',
      descriptionPortuguese: 'Transporte executivo multi-dia com proteção completa para delegações de negócios',
      services: ['executive-transport', 'close-protection'],
      duration: '3 days',
      durationPortuguese: '3 dias',
      price: 'From £3,500',
      pricePortuguese: 'A partir de £3.500',
      savings: 'Save £500',
      savingsPortuguese: 'Economize £500',
      popular: false,
      flow: [
        {
          step: 1,
          action: 'Airport VIP reception and transfer',
          actionPortuguese: 'Receção VIP no aeroporto e transferência',
          icon: Car
        },
        {
          step: 2,
          action: 'Continuous executive transport',
          actionPortuguese: 'Transporte executivo contínuo',
          icon: ClockIcon
        },
        {
          step: 3,
          action: '24/7 close protection team',
          actionPortuguese: 'Equipa de proteção pessoal 24/7',
          icon: Shield
        },
        {
          step: 4,
          action: 'Cultural and business venue expertise',
          actionPortuguese: 'Especialização em locais culturais e de negócios',
          icon: UserGroupIcon
        }
      ]
    }
  ]

  const benefits = [
    {
      icon: CurrencyPoundIcon,
      title: 'Cost Savings',
      titlePortuguese: 'Poupança de Custos',
      description: 'Up to 25% savings on bundled services',
      descriptionPortuguese: 'Até 25% de poupança em serviços em pacote'
    },
    {
      icon: ClockIcon,
      title: 'Seamless Coordination',
      titlePortuguese: 'Coordenação Perfeita',
      description: 'Single point of contact for all services',
      descriptionPortuguese: 'Ponto único de contacto para todos os serviços'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Enhanced Security',
      titlePortuguese: 'Segurança Reforçada',
      description: 'Integrated security protocols across all services',
      descriptionPortuguese: 'Protocolos de segurança integrados em todos os serviços'
    },
    {
      icon: SparklesIcon,
      title: 'Premium Experience',
      titlePortuguese: 'Experiência Premium',
      description: 'Elevated service quality with cultural expertise',
      descriptionPortuguese: 'Qualidade de serviço elevada com especialização cultural'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
              <Crown className="w-4 h-4 mr-2" />
              {isPortuguese ? 'Soluções Integradas' : 'Integrated Solutions'}
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {isPortuguese ? 'Serviços que Funcionam em Conjunto' : 'Services That Work Together'}
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              {isPortuguese
                ? 'Combine nossos serviços premium para uma experiência perfeita e economias significativas'
                : 'Combine our premium services for a seamless experience and significant savings'
              }
            </p>
          </motion.div>
        </div>

        {/* Integration Scenarios */}
        <div className="space-y-12 mb-20">
          {integrationScenarios.map((scenario, index) => (
            <motion.div
              key={scenario.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative bg-white rounded-2xl shadow-lg border-2 ${scenario.popular ? 'border-primary-200' : 'border-secondary-200'} overflow-hidden`}
            >
              {/* Popular Badge */}
              {scenario.popular && (
                <div className="absolute top-6 right-6 z-10">
                  <div className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full border border-primary-200">
                    {isPortuguese ? 'Mais Popular' : 'Most Popular'}
                  </div>
                </div>
              )}

              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Scenario Info */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {isPortuguese ? scenario.titlePortuguese : scenario.title}
                    </h3>
                    <p className="text-secondary-600 mb-6">
                      {isPortuguese ? scenario.descriptionPortuguese : scenario.description}
                    </p>

                    {/* Pricing & Duration */}
                    <div className="flex items-center space-x-6 mb-6">
                      <div>
                        <div className="text-2xl font-bold text-gray-900">
                          {isPortuguese ? scenario.pricePortuguese : scenario.price}
                        </div>
                        <div className="text-sm text-gray-500">
                          {isPortuguese ? scenario.durationPortuguese : scenario.duration}
                        </div>
                      </div>
                      <div className="bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full text-sm font-medium">
                        {isPortuguese ? scenario.savingsPortuguese : scenario.savings}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-all duration-200 flex items-center group"
                    >
                      <span>{isPortuguese ? 'Personalizar Pacote' : 'Customize Package'}</span>
                      <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:transecondary-x-1 transition-transform duration-200" />
                    </motion.button>
                  </div>

                  {/* Service Flow */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      {isPortuguese ? 'Como Funciona' : 'How It Works'}
                    </h4>
                    <div className="space-y-4">
                      {scenario.flow.map((step, stepIndex) => {
                        const IconComponent = step.icon
                        return (
                          <div key={step.step} className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                              <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center">
                                <IconComponent className="w-5 h-5" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="text-sm font-medium text-primary-600">
                                  {isPortuguese ? 'Passo' : 'Step'} {step.step}
                                </span>
                              </div>
                              <p className="text-secondary-700 text-sm">
                                {isPortuguese ? step.actionPortuguese : step.action}
                              </p>
                            </div>
                            {stepIndex < scenario.flow.length - 1 && (
                              <div className="absolute left-9 mt-10 w-0.5 h-6 bg-secondary-200" />
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Benefits Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-primary-50 rounded-2xl p-8"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {isPortuguese ? 'Vantagens dos Serviços Integrados' : 'Integrated Service Benefits'}
            </h3>
            <p className="text-secondary-600">
              {isPortuguese
                ? 'Por que escolher nossos pacotes de serviços integrados'
                : 'Why choose our integrated service packages'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {isPortuguese ? benefit.titlePortuguese : benefit.title}
                  </h4>
                  <p className="text-secondary-600 text-sm">
                    {isPortuguese ? benefit.descriptionPortuguese : benefit.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Integration CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            {isPortuguese ? 'Precisa de uma Solução Personalizada?' : 'Need a Custom Solution?'}
          </h3>
          <p className="text-secondary-600 mb-6">
            {isPortuguese
              ? 'Nossa equipa pode criar um pacote de serviços personalizado para suas necessidades específicas'
              : 'Our team can create a custom service package for your specific needs'
            }
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-primary-600 text-primary-600 px-8 py-3 rounded-xl font-semibold hover:bg-primary-600 hover:text-white transition-all duration-200"
          >
            {isPortuguese ? 'Consulta Gratuita' : 'Free Consultation'}
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default ServiceIntegration