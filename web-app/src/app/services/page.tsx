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
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLanguage } from '@/context/LanguageContext'
import ServiceCard from '@/components/ServiceCard'
import TrustBadges from '@/components/TrustBadges'
import ServiceIntegration from '@/components/ServiceIntegration'
import SubscriptionGate from '@/components/SubscriptionGate'

// Premium service offerings with Portuguese cultural expertise
const services = [
  {
    id: 'cultural-tours',
    name: 'Cultural Tours',
    namePortuguese: 'Tours Culturais',
    price: 45,
    maxPrice: 85,
    priceUnit: 'person',
    priceUnitPortuguese: 'pessoa',
    icon: MapPinIcon,
    color: 'primary',
    image: 'https://res.cloudinary.com/dqhbeqttp/image/upload/v1734535200/portuguese-cultural-tour-london_dlqxkx.jpg',
    description: 'Discover London\'s hidden Portuguese heritage with expert bilingual guides',
    descriptionPortuguese: 'Descubra o património português escondido de Londres com guias bilíngues especializados',
    features: [
      'Bilingual Portuguese-English guides',
      'Exclusive Portuguese heritage sites',
      'Small group experiences (max 12)',
      'Traditional Portuguese refreshments',
      'Cultural storytelling sessions',
      'Historical documentation provided'
    ],
    featuresPortuguese: [
      'Guias bilíngues português-inglês',
      'Locais exclusivos do património português',
      'Experiências em grupos pequenos (máx. 12)',
      'Refrescos tradicionais portugueses',
      'Sessões de narração cultural',
      'Documentação histórica fornecida'
    ],
    popular: true,
    testimonials: 3,
    rating: 4.9,
    bookings: '200+ monthly'
  },
  {
    id: 'executive-transport',
    name: 'Executive Transport',
    namePortuguese: 'Transporte Executivo',
    price: 35,
    maxPrice: 95,
    priceUnit: 'hour',
    priceUnitPortuguese: 'hora',
    icon: Car,
    color: 'secondary',
    image: 'https://res.cloudinary.com/dqhbeqttp/image/upload/v1734535200/executive-transport-london_dlqxkx.jpg',
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
    image: 'https://res.cloudinary.com/dqhbeqttp/image/upload/v1734535200/close-protection-london_dlqxkx.jpg',
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
      window.location.href = '/services/close-protection'
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
    window.location.href = `/services/${serviceId}/booking`
  }

  const handleCloseSubscriptionGate = () => {
    setShowSubscriptionGate(false)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-28 lg:pt-32 pb-16 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
                <Crown className="w-4 h-4 mr-2" />
                {isPortuguese ? 'Serviços Premium' : 'Premium Services'}
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                {isPortuguese ? (
                  <>
                    A Premier Plataforma de <br />
                    <span className="text-primary-600">Serviços Portugueses</span> em Londres
                  </>
                ) : (
                  <>
                    London's Premier <br />
                    <span className="text-primary-600">Portuguese Services</span> Platform
                  </>
                )}
              </h1>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                {isPortuguese
                  ? 'Serviços de transporte, segurança e tours culturais de nível mundial com especialização cultural portuguesa para a comunidade de Londres e do Reino Unido'
                  : 'World-class transport, security, and cultural tour services with Portuguese cultural expertise for London & UK community'
                }
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {isPortuguese ? 'Explorar Serviços' : 'Explore Services'}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.getElementById('trust-badges')?.scrollIntoView({ behavior: 'smooth' })}
                  className="border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-primary-600 hover:text-white transition-all duration-200"
                >
                  {isPortuguese ? 'Ver Credenciais' : 'View Credentials'}
                </motion.button>
              </div>
            </motion.div>

            {/* Key Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">500+</div>
                <div className="text-gray-600 text-sm">
                  {isPortuguese ? 'Clientes Satisfeitos' : 'Satisfied Clients'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary-600 mb-2">4.9</div>
                <div className="text-gray-600 text-sm">
                  {isPortuguese ? 'Avaliação Média' : 'Average Rating'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-600 mb-2">24/7</div>
                <div className="text-gray-600 text-sm">
                  {isPortuguese ? 'Disponibilidade' : 'Availability'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-premium-600 mb-2">£5M+</div>
                <div className="text-gray-600 text-sm">
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
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
                    <p className="text-gray-700">
                      {isPortuguese ? study.challengePortuguese : study.challenge}
                    </p>
                  </div>

                  <div>
                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                      {isPortuguese ? 'Solução' : 'Solution'}
                    </span>
                    <p className="text-gray-700">
                      {isPortuguese ? study.solutionPortuguese : study.solution}
                    </p>
                  </div>

                  <div>
                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                      {isPortuguese ? 'Resultado' : 'Result'}
                    </span>
                    <p className="text-gray-700 font-medium">
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
                onClick={() => window.location.href = '/contact'}
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