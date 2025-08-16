'use client'

import React, { useState, useEffect, useCallback, useMemo, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheckIcon, StarIcon, ClockIcon, PhoneIcon, MapPinIcon, CurrencyPoundIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon, Crown } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { chauffeurCache, performanceMonitor, debounceManager } from '@/lib/chauffeurCache'
import { pricingEngine } from '@/lib/chauffeurPricing'
import OptimizedChauffeurServiceCard from './OptimizedChauffeurServiceCard'
import ChauffeurTestimonials from './ChauffeurTestimonials'

// Lazy load heavy components for better performance
const LazyBookingForm = React.lazy(() => import('./ChauffeurBookingForm'))

interface OptimizedChauffeurPageProps {
  userMembershipLevel?: 'free' | 'family' | 'ambassador'
}

const OptimizedChauffeurPage: React.FC<OptimizedChauffeurPageProps> = ({
  userMembershipLevel = 'free'
}) => {
  const { t, language } = useLanguage()
  const isPortuguese = language === 'pt'
  
  // State management with performance optimizations
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [duration, setDuration] = useState(4)
  const [isLoading, setIsLoading] = useState(false)

  // Memoized service data with caching
  const serviceTiers = useMemo(() => [
    {
      id: 'essential',
      name: 'Essential Private Transport',
      namePortuguese: 'Transporte Privado Essencial',
      price: 45,
      description: 'Professional private transport service with luxury vehicle',
      descriptionPortuguese: 'Serviço profissional de transporte privado com veículo de luxo',
      features: [
        'Professional private hire licensed driver with CPO security training',
        'Luxury vehicle fleet (Mercedes S-Class, BMW 7 Series)',
        'Comprehensive meet & greet service',
        'Enhanced security awareness and threat assessment',
        'Native Portuguese-speaking drivers from Portugal/Brazil',
        'Airport VIP pickup with flight monitoring',
        'Expert London navigation and Portuguese community knowledge',
        'Impeccable professional appearance and conduct'
      ],
      featuresPortuguese: [
        'Motorista profissional licenciado com treino de segurança CPO',
        'Frota de veículos de luxo (Mercedes Classe S, BMW Série 7)',
        'Serviço abrangente de encontro e receção',
        'Consciência de segurança melhorada e avaliação de ameaças',
        'Motoristas nativos falantes de português de Portugal/Brasil',
        'Recolha VIP no aeroporto com monitorização de voos',
        'Navegação especializada de Londres e conhecimento da comunidade portuguesa',
        'Aparência e conduta profissional impecáveis'
      ],
      popular: false,
      color: 'primary',
      minimumHours: 2,
      maximumHours: 12
    },
    {
      id: 'premium',
      name: 'Premium Security',
      namePortuguese: 'Segurança Premium',
      price: 65,
      description: 'Enhanced security with trained protection officer',
      descriptionPortuguese: 'Segurança melhorada com oficial de proteção treinado',
      features: [
        'All Essential features plus advanced security',
        'CPO (Close Protection Officer) certified security personnel',
        'Professional threat assessment and risk management',
        'Discreet executive protection services',
        'Comprehensive emergency response protocols',
        'Pre-journey security briefing and route planning',
        'Advanced route security analysis and real-time monitoring',
        'Professional communication equipment and emergency contacts'
      ],
      featuresPortuguese: [
        'Todas as características Essenciais mais segurança avançada',
        'Pessoal de segurança certificado CPO (Oficial de Proteção Próxima)',
        'Avaliação profissional de ameaças e gestão de riscos',
        'Serviços de proteção executiva discreta',
        'Protocolos abrangentes de resposta de emergência',
        'Briefing de segurança pré-viagem e planeamento de rotas',
        'Análise avançada de segurança de rotas e monitorização em tempo real',
        'Equipamento de comunicação profissional e contactos de emergência'
      ],
      popular: true,
      color: 'secondary',
      minimumHours: 2,
      maximumHours: 16
    },
    {
      id: 'vip',
      name: 'VIP Cultural Experience',
      namePortuguese: 'Experiência Cultural VIP',
      price: 85,
      description: 'Premium service with cultural guide and security',
      descriptionPortuguese: 'Serviço premium com guia cultural e segurança',
      features: [
        'All Premium features',
        'Portuguese cultural guide',
        'VIP venue access',
        'Cultural commentary',
        'Photography service',
        'Dining recommendations',
        'Historical insights',
        'Personalized itinerary'
      ],
      featuresPortuguese: [
        'Todas as características Premium',
        'Guia cultural português',
        'Acesso VIP a locais',
        'Comentário cultural',
        'Serviço de fotografia',
        'Recomendações gastronómicas',
        'Insights históricos',
        'Itinerário personalizado'
      ],
      popular: false,
      color: 'premium',
      minimumHours: 3,
      maximumHours: 20
    },
    {
      id: 'elite',
      name: 'Elite Protection',
      namePortuguese: 'Proteção Elite',
      price: 120,
      description: 'Maximum security with close protection team',
      descriptionPortuguese: 'Segurança máxima com equipa de proteção próxima',
      features: [
        'All VIP features',
        'Close protection team',
        'Advanced route planning',
        'Counter-surveillance',
        'Armored vehicle option',
        'Medical support',
        'Emergency response team',
        'Real-time monitoring'
      ],
      featuresPortuguese: [
        'Todas as características VIP',
        'Equipa de proteção próxima',
        'Planeamento avançado de rotas',
        'Contra-vigilância',
        'Opção de veículo blindado',
        'Apoio médico',
        'Equipa de resposta de emergência',
        'Monitorização em tempo real'
      ],
      popular: false,
      color: 'action',
      minimumHours: 4,
      maximumHours: 24
    }
  ], [])

  // Memoized experience packages
  const experiencePackages = useMemo(() => [
    {
      id: 'tea-ritz',
      name: 'Tea at The Ritz VIP Ride',
      namePortuguese: 'Chá no Ritz VIP',
      price: 180,
      duration: '3 hours',
      description: 'Luxury transport to The Ritz with VIP tea service',
      descriptionPortuguese: 'Transporte de luxo para o Ritz com serviço de chá VIP'
    },
    {
      id: 'mayfair-night',
      name: 'Mayfair by Night',
      namePortuguese: 'Mayfair à Noite',
      price: 240,
      duration: '4 hours',
      description: 'Exclusive nighttime tour of Mayfair\'s finest establishments',
      descriptionPortuguese: 'Tour noturno exclusivo dos melhores estabelecimentos de Mayfair'
    },
    {
      id: 'london-landmarks',
      name: 'VIP London Landmarks',
      namePortuguese: 'Monumentos de Londres VIP',
      price: 240,
      duration: '4 hours',
      description: 'Private tour of London\'s most iconic landmarks',
      descriptionPortuguese: 'Tour privado dos marcos mais icónicos de Londres'
    },
    {
      id: 'harry-potter',
      name: 'Harry Potter Studio Tour',
      namePortuguese: 'Tour dos Estúdios Harry Potter',
      price: 290,
      duration: '6 hours',
      description: 'Return transport to Warner Bros Studio with VIP experience',
      descriptionPortuguese: 'Transporte de ida e volta aos Estúdios Warner Bros com experiência VIP'
    },
    {
      id: 'james-bond',
      name: 'James Bond London Drive',
      namePortuguese: 'Condução James Bond Londres',
      price: 290,
      duration: '5 hours',
      description: 'Follow in 007\'s footsteps through London\'s film locations',
      descriptionPortuguese: 'Siga os passos do 007 através dos locais de filmagem de Londres'
    },
    {
      id: 'royal-london',
      name: 'Royal London Experience',
      namePortuguese: 'Experiência Real de Londres',
      price: 240,
      duration: '4 hours',
      description: 'Exclusive access to royal palaces and ceremonial sites',
      descriptionPortuguese: 'Acesso exclusivo a palácios reais e locais cerimoniais'
    },
    {
      id: 'airport-vip',
      name: 'Airport VIP Transfer',
      namePortuguese: 'Transferência VIP Aeroporto',
      price: 95,
      duration: '2 hours',
      description: 'Premium airport transfer with meet & greet service',
      descriptionPortuguese: 'Transferência premium do aeroporto com serviço de encontro e receção'
    },
    {
      id: 'shopping',
      name: 'Shopping Experience at Harrods & Bond Street',
      namePortuguese: 'Experiência de Compras em Harrods & Bond Street',
      price: 320,
      duration: '6 hours',
      description: 'Luxury shopping tour with personal shopping assistance',
      descriptionPortuguese: 'Tour de compras de luxo com assistência pessoal de compras'
    },
    {
      id: 'bespoke',
      name: 'Bespoke Private Transport',
      namePortuguese: 'Transporte Privado Personalizado',
      price: 'Custom',
      duration: 'Flexible',
      description: 'Fully customized service tailored to your requirements',
      descriptionPortuguese: 'Serviço totalmente personalizado adaptado às suas necessidades'
    }
  ], [])

  // Memoized features with icons
  const features = useMemo(() => [
    {
      icon: ShieldCheckIcon,
      title: 'Private Hire & CPO Licensed',
      titlePortuguese: 'Licenciado Private Hire & CPO',
      description: 'All drivers hold Private Hire licenses and Close Protection Officer (CPO) certifications with comprehensive insurance',
      descriptionPortuguese: 'Todos os motoristas possuem licenças Private Hire e certificações de Oficial de Proteção Próxima (CPO) com seguro abrangente'
    },
    {
      icon: Crown,
      title: 'Portuguese Heritage',
      titlePortuguese: 'Herança Portuguesa',
      description: 'Authentic Portuguese-speaking service with cultural expertise',
      descriptionPortuguese: 'Serviço autêntico falante de português com expertise cultural'
    },
    {
      icon: ClockIcon,
      title: '24/7 Availability',
      titlePortuguese: 'Disponibilidade 24/7',
      description: 'Round-the-clock service for your convenience and security',
      descriptionPortuguese: 'Serviço 24 horas por dia para sua conveniência e segurança'
    },
    {
      icon: MapPinIcon,
      title: 'London Expertise',
      titlePortuguese: 'Expertise de Londres',
      description: 'Deep knowledge of London and Portuguese community hotspots',
      descriptionPortuguese: 'Conhecimento profundo de Londres e pontos importantes da comunidade portuguesa'
    }
  ], [])

  // Optimized booking handler with performance monitoring
  const handleBookService = useCallback((serviceId: string) => {
    const endTiming = performanceMonitor.startTiming('booking_initiation')
    
    setSelectedService(serviceId)
    setShowBookingForm(true)
    
    // Preload pricing for better UX
    if (selectedDate) {
      const cacheKey = chauffeurCache.pricing.generatePricingKey(
        serviceId,
        'tier',
        duration,
        selectedDate,
        userMembershipLevel
      )
      
      if (!chauffeurCache.pricing.has(cacheKey)) {
        pricingEngine.calculatePricing({
          serviceId,
          serviceType: 'tier',
          date: selectedDate,
          duration,
          membershipLevel: userMembershipLevel
        }).then(() => {
          // Pricing is now cached
        }).catch(error => {
          console.warn('Failed to preload pricing:', error)
        })
      }
    }
    
    endTiming()
  }, [selectedDate, duration, userMembershipLevel])

  // Debounced duration update for better performance
  const debouncedDurationUpdate = useCallback(
    debounceManager.debounce('duration-update', (newDuration: number) => {
      setDuration(newDuration)
    }, 300),
    []
  )

  // Memoized animation variants for better performance
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }), [])

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  }), [])

  // Performance cleanup
  useEffect(() => {
    return () => {
      debounceManager.cancelAll()
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Enhanced Performance */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-20"
      >
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-5"></div>
        <div className="relative container-width px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              variants={itemVariants}
              className="mb-6"
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-premium-100 text-premium-800 border border-premium-200">
                <Crown className="w-4 h-4 mr-2" />
                {isPortuguese ? 'Serviço Premium Português' : 'Premium Portuguese Service'}
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              {isPortuguese ? (
                <>
                  Serviço de <span className="text-premium-600">Transporte Privado</span><br />
                  de Segurança Português
                </>
              ) : (
                <>
                  Portuguese Security <span className="text-premium-600">Private Transport</span><br />
                  Service
                </>
              )}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              {isPortuguese 
                ? 'Transporte de luxo com segurança profissional para a comunidade portuguesa em Londres. Expertise cultural, proteção discreta e serviço excepcional.'
                : 'Luxury transport with professional security for the Portuguese community in London. Cultural expertise, discreet protection, and exceptional service.'
              }
            </motion.p>

            {/* Enhanced Booking Controls */}
            <motion.div
              variants={itemVariants}
              className="mb-8 max-w-md mx-auto"
            >
              <div className="bg-white rounded-lg p-4 shadow-lg border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-medium text-gray-700">
                    {isPortuguese ? 'Data de Serviço' : 'Service Date'}
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-premium-500"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    {isPortuguese ? 'Duração' : 'Duration'}
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="range"
                      min="2"
                      max="12"
                      value={duration}
                      onChange={(e) => debouncedDurationUpdate(parseInt(e.target.value))}
                      className="w-20"
                    />
                    <span className="text-sm font-medium text-gray-900 min-w-[60px]">
                      {duration}h
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                onClick={() => setShowBookingForm(true)}
                className="bg-premium-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-premium-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {isPortuguese ? 'Reservar Agora' : 'Book Now'}
              </button>
              <a
                href="#services"
                className="border-2 border-premium-600 text-premium-600 px-8 py-4 rounded-lg font-semibold hover:bg-premium-50 transition-colors"
              >
                {isPortuguese ? 'Ver Serviços' : 'View Services'}
              </a>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Enhanced Features Section */}
      <section className="py-16 bg-white">
        <div className="container-width px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {isPortuguese ? 'Por Que Escolher-nos' : 'Why Choose Us'}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {isPortuguese 
                ? 'Serviço premium com compreensão cultural portuguesa e os mais altos padrões de segurança'
                : 'Premium service with Portuguese cultural understanding and the highest security standards'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group hover:bg-premium-50 p-4 sm:p-6 rounded-xl transition-colors duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-premium-100 rounded-full mb-3 sm:mb-4 group-hover:bg-premium-200 transition-colors">
                  <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-premium-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  {isPortuguese ? feature.titlePortuguese : feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  {isPortuguese ? feature.descriptionPortuguese : feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Optimized Service Tiers Section */}
      <section id="services" className="py-16 bg-gray-50">
        <div className="container-width px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {isPortuguese ? 'Níveis de Serviço' : 'Service Tiers'}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {isPortuguese 
                ? 'Escolha o nível de proteção e serviço que melhor se adequa às suas necessidades'
                : 'Choose the level of protection and service that best fits your needs'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {serviceTiers.map((tier, index) => (
              <OptimizedChauffeurServiceCard
                key={tier.id}
                tier={tier}
                isPortuguese={isPortuguese}
                onBookNow={() => handleBookService(tier.id)}
                index={index}
                membershipLevel={userMembershipLevel}
                selectedDate={selectedDate}
                showPricing={true}
                duration={duration}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Suspense fallback={
        <div className="py-16 bg-gradient-to-br from-gray-50 to-premium-50">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      }>
        <ChauffeurTestimonials />
      </Suspense>

      {/* Contact Section */}
      <section className="py-16 bg-premium-900 text-white">
        <div className="container-width px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              {isPortuguese ? 'Precisa de Assistência Imediata?' : 'Need Immediate Assistance?'}
            </h2>
            <p className="text-xl text-premium-200 mb-8 max-w-2xl mx-auto">
              {isPortuguese 
                ? 'A nossa equipa está disponível 24/7 para emergências e reservas de última hora'
                : 'Our team is available 24/7 for emergencies and last-minute bookings'
              }
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+447777777777"
                className="inline-flex items-center justify-center bg-action-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-action-700 transition-colors transform hover:scale-105"
              >
                <PhoneIcon className="w-5 h-5 mr-2" />
                {isPortuguese ? 'Ligar Agora' : 'Call Now'}
              </a>
              <button
                onClick={() => setShowBookingForm(true)}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-premium-900 transition-colors transform hover:scale-105"
              >
                {isPortuguese ? 'Reserva Online' : 'Book Online'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Optimized Booking Form */}
      <AnimatePresence mode="wait">
        {showBookingForm && (
          <Suspense fallback={
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <div className="bg-white rounded-xl p-8 shadow-2xl">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-premium-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">
                  {isPortuguese ? 'A carregar formulário...' : 'Loading form...'}
                </p>
              </div>
            </div>
          }>
            <LazyBookingForm
              isOpen={showBookingForm}
              onClose={() => {
                setShowBookingForm(false)
                setSelectedService(null)
              }}
              selectedService={selectedService}
              serviceTiers={serviceTiers}
              experiencePackages={experiencePackages}
            />
          </Suspense>
        )}
      </AnimatePresence>
    </div>
  )
}

export default React.memo(OptimizedChauffeurPage)