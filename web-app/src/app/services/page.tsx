'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  ShieldCheckIcon,
  StarIcon,
  ClockIcon,
  PhoneIcon,
  MapPinIcon,
  CurrencyPoundIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  AcademicCapIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  IdentificationIcon,
} from '@heroicons/react/24/outline'
import { Crown, Shield, Car, Users, Award, TrendingUp } from 'lucide-react'
import Footer from '@/components/Footer'
import { useLanguage } from '@/context/LanguageContext'
import { ROUTES } from '@/config/routes'
import ServiceCard from '@/components/ServiceCard'
import TrustBadges from '@/components/TrustBadges'
import ServiceIntegration from '@/components/ServiceIntegration'
import SubscriptionGate from '@/components/SubscriptionGate'

// Premium service offerings with Portuguese cultural expertise
const services = [
  {
    id: 'executive-transport',
    name: 'Executive Transport',
    namePortuguese: 'Transporte Executivo',
    price: 45,
    maxPrice: 75,
    priceUnit: 'hour',
    priceUnitPortuguese: 'hora',
    icon: Car,
    color: 'secondary',
    image: buildCloudinaryUrl('dqhbeqttp/image/upload/v1734535200/executive-transport-london_dlqxkx.jpg'),
    description: 'Professional transport services with Portuguese cultural expertise',
    descriptionPortuguese: 'Serviços de transporte profissional com especialização cultural portuguesa',
    features: [
      'Portuguese-speaking drivers',
      'Premium vehicle fleet',
      'Cultural venue expertise',
      'Airport transfer specialization',
      'Event transportation',
      'Business meeting transfers'
    ],
    featuresPortuguese: [
      'Motoristas que falam português',
      'Frota de veículos de luxo',
      'Especialização em locais culturais',
      'Especialização em transferes de aeroporto',
      'Transporte para eventos',
      'Transferes para reuniões de negócios'
    ],
    popular: false,
    testimonials: 5,
    rating: 4.8,
    bookings: '150+ monthly'
  },
  {
    id: 'close-protection',
    name: 'Close Protection',
    namePortuguese: 'Proteção Pessoal',
    price: 800,
    maxPrice: 1200,
    priceUnit: 'day',
    priceUnitPortuguese: 'dia',
    icon: ShieldCheckIcon,
    color: 'premium',
    image: buildCloudinaryUrl('dqhbeqttp/image/upload/v1734535200/close-protection-london_dlqxkx.jpg'),
    description: 'SIA-licensed CPOs providing discrete, culturally-aware security',
    descriptionPortuguese: 'CPOs licenciados SIA fornecendo segurança discreta e culturalmente consciente',
    features: [
      'SIA-licensed security professionals',
      'Cultural sensitivity training',
      'Discrete protection services',
      'Event security specialization',
      'VIP escort services',
      'Risk assessment included'
    ],
    featuresPortuguese: [
      'Profissionais de segurança licenciados SIA',
      'Formação em sensibilidade cultural',
      'Serviços de proteção discreta',
      'Especialização em segurança de eventos',
      'Serviços de escolta VIP',
      'Avaliação de risco incluída'
    ],
    popular: false,
    testimonials: 2,
    rating: 5.0,
    bookings: '50+ monthly',
    premium: true
  }
]

// Trust indicators and certifications
const trustIndicators = [
  {
    name: 'SIA Licensed',
    namePortuguese: 'Licenciado SIA',
    description: 'Security Industry Authority certification',
    descriptionPortuguese: 'Certificação da Autoridade da Indústria de Segurança',
    icon: Shield,
    verified: true
  },
  {
    name: 'TfL Approved',
    namePortuguese: 'Aprovado TfL',
    description: 'Transport for London operator license',
    descriptionPortuguese: 'Licença de operador do Transport for London',
    icon: Car,
    verified: true
  },
  {
    name: '£5M+ Insurance',
    namePortuguese: '£5M+ Seguro',
    description: 'Comprehensive liability coverage',
    descriptionPortuguese: 'Cobertura de responsabilidade abrangente',
    icon: ShieldCheckIcon,
    verified: true
  },
  {
    name: 'Cultural Expertise',
    namePortuguese: 'Especialização Cultural',
    description: 'Portuguese heritage specialists',
    descriptionPortuguese: 'Especialistas em património português',
    icon: AcademicCapIcon,
    verified: true
  }
]

// Client success stories and case studies
const caseStudies = [
  {
    id: 'corporate-delegation',
    title: 'Portuguese Trade Delegation',
    titlePortuguese: 'Delegação Comercial Portuguesa',
    client: 'Câmara de Comércio Luso-Britânica',
    clientPortuguese: 'Câmara de Comércio Luso-Britânica',
    challenge: 'Secure transport and cultural orientation for 25-person delegation',
    challengePortuguese: 'Transporte seguro e orientação cultural para delegação de 25 pessoas',
    solution: 'Integrated executive transport with cultural tours and close protection',
    solutionPortuguese: 'Transporte executivo integrado com tours culturais e proteção pessoal',
    result: '100% client satisfaction, 3 follow-up bookings secured',
    resultPortuguese: '100% satisfação do cliente, 3 reservas de acompanhamento garantidas',
    investment: '£15,000',
    duration: '5 days'
  },
  {
    id: 'community-heritage',
    title: 'Multi-Generation Heritage Tour',
    titlePortuguese: 'Tour de Património Multi-Geracional',
    client: 'Santos Community Group (Brasil/Portugal)',
    clientPortuguese: 'Grupo Comunitário Santos (Brasil/Portugal)',
    challenge: 'Cultural exploration for community group spanning 4 generations (ages 8-82)',
    challengePortuguese: 'Exploração cultural para grupo comunitário abrangendo 4 gerações (idades 8-82)',
    solution: 'Custom accessibility-focused cultural tour with premium transport',
    solutionPortuguese: 'Tour cultural personalizado focado na acessibilidade com transporte premium',
    result: 'Emotional heritage connection, 5-star review, referral network activated',
    resultPortuguese: 'Conexão emocional com património, avaliação 5 estrelas, rede de referência ativada',
    investment: '£2,500',
    duration: '3 days'
  }
]

export default function ServicesPage() {
  const { language, t } = useLanguage()
  const isPortuguese = language === 'pt'
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [showSubscriptionGate, setShowSubscriptionGate] = useState(false)

  const handleBookService = (serviceId: string) => {
    // Redirect to dedicated close protection page
    if (serviceId === 'close-protection') {
      window.location.href = `${ROUTES.services}/close-protection`
      return
    }

    // Check subscription status for premium services
    const hasSubscription = localStorage.getItem('lusotown-subscription') === 'active'
    
    if (!hasSubscription) {
      setShowSubscriptionGate(true)
      return
    }

    setSelectedService(serviceId)
    // Navigate to booking flow
  window.location.href = `${ROUTES.services}/${serviceId}/booking`
  }

  const handleCloseSubscriptionGate = () => {
    setShowSubscriptionGate(false)
  }

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-20">
        <div className="absolute inset-0 bg-[url(buildCloudinaryUrl('dqhbeqttp/image/upload/v1734535200/executive-transport-london_dlqxkx.jpg'))] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/10 via-transparent to-secondary-900/10"></div>
        <div className="relative container-width py-16 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-primary-100 via-secondary-50 to-accent-100 border border-primary-200 shadow-lg">
                <Crown className="w-4 h-4 mr-2 text-secondary-600" />
                <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent font-bold">
                  {isPortuguese
                    ? "Serviços Premium Portugueses"
                    : "Premium Portuguese Services"}
                </span>
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight"
            >
              {/* Desktop full title */}
              <span className="hidden sm:block">
                {isPortuguese ? (
                  <>
                    A plataforma líder de
                    <br />
                    <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                      serviços portugueses
                    </span>{" "}
                    em Londres
                  </>
                ) : (
                  <>
                    London's leading
                    <br />
                    <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                      Portuguese services
                    </span>{" "}
                    platform
                  </>
                )}
              </span>
              {/* Mobile short title */}
              <span className="sm:hidden">
                {isPortuguese ? (
                  <>
                    Serviços
                    <br />
                    <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                      Premium
                    </span>
                  </>
                ) : (
                  <>
                    Premium
                    <br />
                    <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                      Services
                    </span>
                  </>
                )}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-secondary-600 mb-8 max-w-3xl mx-auto"
            >
              {/* Desktop full subtitle */}
              <span className="hidden sm:block">
                {isPortuguese
                  ? "Serviços de transporte executivo, segurança pessoal e tours culturais de nível mundial com especialização cultural portuguesa. Conectando a comunidade portuguesa de Londres com experiências premium e culturalmente autênticas."
                  : "World-class executive transport, personal security, and cultural tour services with Portuguese cultural expertise. Connecting London's Portuguese community with premium and culturally authentic experiences."}
              </span>
              {/* Mobile short subtitle */}
              <span className="sm:hidden">
                {isPortuguese
                  ? "Transporte executivo, segurança e tours com especialização cultural portuguesa para a comunidade de Londres."
                  : "Executive transport, security, and tours with Portuguese cultural expertise for London's community."}
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6"
            >
              <div className="flex items-center gap-2 text-sm text-secondary-600">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span>
                  {isPortuguese
                    ? "SIA Licenciado & TfL Aprovado"
                    : "SIA Licensed & TfL Approved"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-secondary-600">
                <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
                <span>
                  {isPortuguese
                    ? "Especialização Cultural"
                    : "Cultural Expertise"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-secondary-600">
                <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
                <span>
                  {isPortuguese
                    ? "Disponível 24/7"
                    : "Available 24/7"}
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
            >
              <button
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-primary-700 hover:via-secondary-700 hover:to-accent-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-1"
              >
                {isPortuguese ? "Explorar Serviços" : "Explore Services"}
              </button>
              <button
                onClick={() => document.getElementById('trust-badges')?.scrollIntoView({ behavior: 'smooth' })}
                className="border border-secondary-300 text-secondary-700 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {isPortuguese ? "Ver Credenciais" : "View Credentials"}
              </button>
            </motion.div>

            {/* Key Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <div className="text-2xl font-bold text-primary-600 mb-1">500+</div>
                <div className="text-xs text-secondary-600">
                  {isPortuguese ? 'Clientes Satisfeitos' : 'Satisfied Clients'}
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <div className="text-2xl font-bold text-secondary-600 mb-1">4.9</div>
                <div className="text-xs text-secondary-600">
                  {isPortuguese ? 'Avaliação Média' : 'Average Rating'}
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <div className="text-2xl font-bold text-accent-600 mb-1">24/7</div>
                <div className="text-xs text-secondary-600">
                  {isPortuguese ? 'Disponibilidade' : 'Availability'}
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <div className="text-2xl font-bold text-premium-600 mb-1">£5M+</div>
                <div className="text-xs text-secondary-600">
                  {isPortuguese ? 'Cobertura de Seguro' : 'Insurance Coverage'}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <TrustBadges trustIndicators={trustIndicators} isPortuguese={isPortuguese} />

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {isPortuguese ? 'Nossos Serviços Premium' : 'Our Premium Services'}
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              {isPortuguese
                ? 'Serviços especializados projetados para a comunidade portuguesa em Londres e no Reino Unido'
                : 'Specialized services designed for the Portuguese community in London & UK'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={service.id} id={service.id}>
                <ServiceCard
                  service={service}
                  isPortuguese={isPortuguese}
                  onBookNow={() => handleBookService(service.id)}
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Integration Section */}
      <ServiceIntegration isPortuguese={isPortuguese} />

      {/* Case Studies Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {isPortuguese ? 'Casos de Sucesso' : 'Success Stories'}
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              {isPortuguese
                ? 'Como ajudamos clientes a alcançar seus objetivos com excelência'
                : 'How we help clients achieve their goals with excellence'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    {isPortuguese ? study.titlePortuguese : study.title}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">{study.duration}</span>
                    <span className="text-lg font-bold text-primary-600">{study.investment}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                      {isPortuguese ? 'Cliente' : 'Client'}
                    </span>
                    <p className="text-gray-900 font-medium">
                      {isPortuguese ? study.clientPortuguese : study.client}
                    </p>
                  </div>

                  <div>
                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                      {isPortuguese ? 'Desafio' : 'Challenge'}
                    </span>
                    <p className="text-secondary-700">
                      {isPortuguese ? study.challengePortuguese : study.challenge}
                    </p>
                  </div>

                  <div>
                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                      {isPortuguese ? 'Solução' : 'Solution'}
                    </span>
                    <p className="text-secondary-700">
                      {isPortuguese ? study.solutionPortuguese : study.solution}
                    </p>
                  </div>

                  <div>
                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                      {isPortuguese ? 'Resultado' : 'Result'}
                    </span>
                    <p className="text-secondary-700 font-medium">
                      {isPortuguese ? study.resultPortuguese : study.result}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {isPortuguese 
                ? 'Pronto para Experienciar Excelência?'
                : 'Ready to Experience Excellence?'
              }
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              {isPortuguese
                ? 'Junte-se a centenas de clientes satisfeitos que confiam nos nossos serviços premium'
                : 'Join hundreds of satisfied clients who trust our premium services'
              }
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleBookService('consultation')}
                className="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 shadow-lg"
              >
                {isPortuguese ? 'Agendar Consulta' : 'Book Consultation'}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = ROUTES.contact}
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-primary-600 transition-all duration-200"
              >
                {isPortuguese ? 'Falar Conosco' : 'Contact Us'}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Subscription Gate Modal */}
      {showSubscriptionGate && (
        <SubscriptionGate
          onClose={handleCloseSubscriptionGate}
          onSubscribe={() => {
            localStorage.setItem('lusotown-subscription', 'active')
            setShowSubscriptionGate(false)
            // Proceed with service booking
            if (selectedService) {
              window.location.href = `/services/${selectedService}/booking`
            }
          }}
          isPortuguese={isPortuguese}
        />
      )}

      <Footer />
    </div>
  )
}