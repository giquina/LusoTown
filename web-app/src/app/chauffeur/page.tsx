'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ShieldCheckIcon, StarIcon, ClockIcon, PhoneIcon, MapPinIcon, CurrencyPoundIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon, Crown } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ChauffeurBookingForm from '@/components/ChauffeurBookingForm'
import ChauffeurServiceCard from '@/components/ChauffeurServiceCard'
import ChauffeurTestimonials from '@/components/ChauffeurTestimonials'
import PortugueseCulturalTourRoutes from '@/components/PortugueseCulturalTourRoutes'
import { useLanguage } from '@/context/LanguageContext'

// Optimized pricing structure based on market research and membership integration
const serviceTiers = [
  {
    id: 'essential',
    name: 'Essential Chauffeur',
    namePortuguese: 'Chauffeur Essencial',
    price: 55, // Optimized from £45 based on market analysis
    originalPrice: 65, // Show value proposition
    membershipDiscounts: {
      visitor: 0, // No discount for non-members
      family: 5, // 5% discount for Family members (£52.25)
      ambassador: 10 // 10% discount for Ambassador members (£49.50)
    },
    minimumHours: 3,
    description: 'Professional Portuguese-speaking chauffeur with luxury vehicle',
    descriptionPortuguese: 'Chauffeur profissional falante de português com veículo de luxo',
    features: [
      'Professional Portuguese-speaking chauffeur',
      'Mercedes E-Class or equivalent luxury vehicle',
      'Meet & greet service with cultural sensitivity',
      'Basic security awareness training',
      'Portuguese community knowledge',
      'Airport monitoring & flight tracking',
      'Complimentary waiting time (30 minutes)'
    ],
    featuresPortuguese: [
      'Chauffeur profissional falante de português',
      'Mercedes E-Class ou veículo de luxo equivalente',
      'Serviço de encontro e receção com sensibilidade cultural',
      'Treino básico de consciência de segurança',
      'Conhecimento da comunidade portuguesa',
      'Monitorização de aeroporto e rastreamento de voos',
      'Tempo de espera gratuito (30 minutos)'
    ],
    popular: false,
    color: 'primary',
    targetAudience: 'tourists'
  },
  {
    id: 'premium',
    name: 'Premium Security',
    namePortuguese: 'Segurança Premium',
    price: 75, // Optimized from £65 based on security premium analysis
    originalPrice: 85,
    membershipDiscounts: {
      visitor: 0,
      family: 5, // £71.25
      ambassador: 10 // £67.50
    },
    minimumHours: 3,
    description: 'Enhanced security with SIA-licensed protection officer and Portuguese cultural expertise',
    descriptionPortuguese: 'Segurança melhorada com oficial de proteção licenciado SIA e expertise cultural portuguesa',
    features: [
      'All Essential features',
      'SIA-licensed trained security officer',
      'Pre-trip threat assessment',
      'Discreet close protection',
      'Emergency response protocols',
      'Security briefing and route planning',
      'Portuguese business district expertise',
      'Cultural venue security knowledge'
    ],
    featuresPortuguese: [
      'Todas as características Essenciais',
      'Oficial de segurança treinado licenciado SIA',
      'Avaliação de ameaças pré-viagem',
      'Proteção próxima discreta',
      'Protocolos de resposta de emergência',
      'Briefing de segurança e planeamento de rotas',
      'Expertise do distrito empresarial português',
      'Conhecimento de segurança de locais culturais'
    ],
    popular: true,
    color: 'secondary',
    targetAudience: 'business_tourists'
  },
  {
    id: 'vip',
    name: 'VIP Cultural Experience',
    namePortuguese: 'Experiência Cultural VIP',
    price: 95, // Optimized from £85 to reflect cultural value-add
    originalPrice: 110,
    membershipDiscounts: {
      visitor: 0,
      family: 5, // £90.25
      ambassador: 15 // £80.75 (higher discount for cultural appreciation)
    },
    minimumHours: 4, // Minimum 4 hours for cultural experiences
    description: 'Premium service with certified Portuguese cultural guide, security, and insider access',
    descriptionPortuguese: 'Serviço premium com guia cultural português certificado, segurança e acesso privilegiado',
    features: [
      'All Premium Security features',
      'Certified Portuguese cultural heritage guide',
      'VIP access to Portuguese venues and restaurants',
      'Cultural commentary and historical insights',
      'Professional photography service (optional)',
      'Curated dining recommendations with reservations',
      'Portuguese business network introductions',
      'Mercedes S-Class or equivalent premium vehicle'
    ],
    featuresPortuguese: [
      'Todas as características de Segurança Premium',
      'Guia certificado de património cultural português',
      'Acesso VIP a locais e restaurantes portugueses',
      'Comentário cultural e insights históricos',
      'Serviço de fotografia profissional (opcional)',
      'Recomendações gastronómicas selecionadas com reservas',
      'Introduções à rede empresarial portuguesa',
      'Mercedes S-Class ou veículo premium equivalente'
    ],
    popular: false,
    color: 'premium',
    targetAudience: 'cultural_tourists'
  },
  {
    id: 'elite',
    name: 'Elite Protection',
    namePortuguese: 'Proteção Elite',
    price: 140, // Increased from £120 to reflect high-end security market
    originalPrice: 160,
    membershipDiscounts: {
      visitor: 0,
      family: 5, // £133
      ambassador: 10 // £126
    },
    minimumHours: 4,
    callOutPremium: 50, // £50 premium for immediate availability
    description: 'Maximum security with close protection team and luxury transport for high-profile individuals',
    descriptionPortuguese: 'Segurança máxima com equipa de proteção próxima e transporte de luxo para indivíduos de alto perfil',
    features: [
      'All VIP Cultural features',
      'Multi-person close protection team',
      'Advanced route planning and reconnaissance',
      'Counter-surveillance measures',
      'Armored vehicle option available',
      'Medical support and first aid qualified personnel',
      'Emergency evacuation protocols',
      'Rolls-Royce or armored Mercedes available',
      'Real-time security coordination',
      'Portuguese diplomatic protocol knowledge'
    ],
    featuresPortuguese: [
      'Todas as características VIP Culturais',
      'Equipa de proteção próxima multi-pessoa',
      'Planeamento avançado de rotas e reconhecimento',
      'Medidas de contra-vigilância',
      'Opção de veículo blindado disponível',
      'Apoio médico e pessoal qualificado em primeiros socorros',
      'Protocolos de evacuação de emergência',
      'Rolls-Royce ou Mercedes blindado disponível',
      'Coordenação de segurança em tempo real',
      'Conhecimento de protocolo diplomático português'
    ],
    popular: false,
    color: 'action',
    targetAudience: 'vip_clients'
  }
]

// Portuguese Cultural Tourism Experience Packages - Optimized for Revenue and Market Positioning
const portugalHeritageExperiences = [
  {
    id: 'portuguese-historical-london',
    name: 'Portuguese Historical London Tour',
    namePortuguese: 'Tour Histórico Português de Londres',
    price: 320, // Increased from £280 to reflect premium positioning
    originalPrice: 350,
    duration: '4 hours',
    membershipDiscounts: {
      visitor: 0,
      family: 8, // £294.40 (higher discount for cultural experiences)
      ambassador: 15 // £272 (maximum cultural appreciation discount)
    },
    minimumGuests: 1,
    maximumGuests: 4,
    description: 'Discover Portuguese maritime history, Embassy quarter, and Portuguese business heritage sites with certified cultural expert guide and security chauffeur',
    descriptionPortuguese: 'Descubra a história marítima portuguesa, bairro da Embaixada e locais de património empresarial português com guia especialista cultural certificado e chauffeur de segurança',
    category: 'heritage',
    priceIncludes: ['VIP Security Chauffeur', 'Certified Portuguese Cultural Guide', 'Venue Access Fees', 'Cultural Documentation'],
    highlights: [
      'Portuguese Embassy & cultural centers with insider access',
      'Historic Portuguese quarter locations (Stockwell heritage sites)',
      'Maritime heritage sites (Tower of London, Greenwich Portuguese connections)',
      'Portuguese business development success stories',
      'Cultural heritage preservation sites and museums'
    ],
    highlightsPortuguese: [
      'Embaixada Portuguesa e centros culturais com acesso privilegiado',
      'Localizações históricas do bairro português (locais históricos de Stockwell)',
      'Locais de património marítimo (Torre de Londres, conexões portuguesas de Greenwich)',
      'Histórias de sucesso do desenvolvimento empresarial português',
      'Locais de preservação do património cultural e museus'
    ],
    targetAudience: 'cultural_heritage_tourists'
  },
  {
    id: 'authentic-portuguese-london',
    name: 'Authentic Portuguese London Experience',
    namePortuguese: 'Experiência Autêntica Portuguesa de Londres',
    price: 380, // Increased from £320 to position as premium authentic experience
    originalPrice: 420,
    duration: '6 hours',
    membershipDiscounts: {
      visitor: 0,
      family: 10, // £342
      ambassador: 18 // £311.60 (higher discount for authentic cultural connection)
    },
    minimumGuests: 1,
    maximumGuests: 6,
    description: 'Full cultural immersion through Stockwell, Vauxhall and Portuguese community heartlands with insider access, dining experiences, and community introductions',
    descriptionPortuguese: 'Imersão cultural completa através de Stockwell, Vauxhall e centros da comunidade portuguesa com acesso privilegiado, experiências gastronómicas e introduções à comunidade',
    category: 'authentic',
    priceIncludes: ['Premium Security Chauffeur', 'Cultural Guide', 'Meal at Authentic Portuguese Restaurant', 'Community Introductions'],
    highlights: [
      'Traditional Portuguese restaurants & bakeries (with tastings)',
      'Portuguese cultural centers & churches (Igreja Portuguesa)',
      'Community gathering places and social clubs',
      'Portuguese business district exploration with proprietor meetings',
      'Cultural events and festival locations (Festival de Santo António sites)'
    ],
    highlightsPortuguese: [
      'Restaurantes e padarias tradicionais portuguesas (com provas)',
      'Centros culturais portugueses e igrejas (Igreja Portuguesa)',
      'Locais de encontro comunitário e clubes sociais',
      'Exploração do distrito empresarial português com encontros com proprietários',
      'Locais de eventos culturais e festivais (locais do Festival de Santo António)'
    ],
    targetAudience: 'authentic_experience_seekers'
  },
  {
    id: 'portuguese-food-culture',
    name: 'Portuguese Food & Culture Discovery',
    namePortuguese: 'Descoberta da Gastronomia e Cultura Portuguesa',
    price: 450, // Increased from £380 to reflect culinary premium positioning
    originalPrice: 495,
    duration: '6 hours',
    membershipDiscounts: {
      visitor: 0,
      family: 10, // £405
      ambassador: 15 // £382.50
    },
    minimumGuests: 2, // Culinary experiences work better with minimum 2 guests
    maximumGuests: 8,
    description: 'Culinary journey through authentic Portuguese establishments with tastings, cultural dining, wine education, and Fado performance',
    descriptionPortuguese: 'Jornada culinária através de estabelecimentos portugueses autênticos com provas, jantar cultural, educação sobre vinhos e performance de Fado',
    category: 'culinary',
    priceIncludes: ['Elite Protection Chauffeur', 'Culinary Expert Guide', 'Multi-Course Portuguese Meal', 'Wine Tastings', 'Fado Performance'],
    highlights: [
      'Authentic Portuguese restaurants (Stockwell, Vauxhall premiium establishments)',
      'Portuguese delicatessen & market visits with expert explanations',
      'Traditional bakeries & pastelaria experience with baking demonstrations',
      'Portuguese wine & spirits specialists with educational tastings',
      'Cultural dining experiences with live Fado performance'
    ],
    highlightsPortuguese: [
      'Restaurantes portugueses autênticos (estabelecimentos premium de Stockwell, Vauxhall)',
      'Visitas a delicatessen e mercados portugueses com explicações especializadas',
      'Padarias tradicionais e experiência de pastelaria com demonstrações de cozedura',
      'Especialistas em vinhos e bebidas espirituosas portuguesas com provas educacionais',
      'Experiências gastronómicas culturais com performance de Fado ao vivo'
    ],
    targetAudience: 'culinary_tourists'
  },
  {
    id: 'portuguese-business-professional',
    name: 'Portuguese Business & Professional Network Tour',
    namePortuguese: 'Tour da Rede Empresarial e Profissional Portuguesa',
    price: 520, // Increased from £450 to reflect business networking premium
    originalPrice: 580,
    duration: '8 hours',
    membershipDiscounts: {
      visitor: 0,
      family: 8, // £478.40
      ambassador: 12 // £457.60 (business networking value)
    },
    minimumGuests: 1,
    maximumGuests: 4, // Keep business networking intimate
    description: 'Connect with Portuguese business success stories, professional networks, and entrepreneurship examples across London with high-level introductions',
    descriptionPortuguese: 'Conecte-se com histórias de sucesso empresarial português, redes profissionais e exemplos de empreendedorismo em Londres com introduções de alto nível',
    category: 'business',
    priceIncludes: ['Elite Protection Service', 'Business Network Specialist Guide', 'Professional Introductions', 'Business Lunch'],
    highlights: [
      'Portuguese business success story locations with owner meetings',
      'Portuguese professional networks & associations (CPLN, Portuguese Chamber)',
      'Embassy trade centers & chambers of commerce access',
      'Portuguese legal & professional services partnerships',
      'Entrepreneurship examples & startup stories with founder meetings'
    ],
    highlightsPortuguese: [
      'Locais de histórias de sucesso empresarial português com encontros com proprietários',
      'Redes profissionais portuguesas e associações (CPLN, Câmara Portuguesa)',
      'Acesso a centros comerciais da Embaixada e câmaras de comércio',
      'Parcerias de serviços legais e profissionais portugueses',
      'Exemplos de empreendedorismo e histórias de startups com encontros com fundadores'
    ],
    targetAudience: 'business_professionals'
  }
]

// Multi-Day Portuguese Heritage Packages - Revenue-Optimized with Progressive Discounts
const multiDayPackages = [
  {
    id: 'half-day-cultural',
    name: 'Half-Day Portuguese Cultural Immersion',
    namePortuguese: 'Imersão Cultural Portuguesa de Meio Dia',
    price: 280, // Increased from £240 to reflect premium half-day positioning
    originalPrice: 320,
    duration: '4 hours',
    membershipDiscounts: {
      visitor: 0,
      family: 10, // £252
      ambassador: 18 // £229.60 (strong cultural discount)
    },
    minimumGuests: 1,
    maximumGuests: 6,
    description: 'Concentrated Portuguese cultural experience with key heritage sites, community locations, and authentic dining',
    descriptionPortuguese: 'Experiência cultural portuguesa concentrada com locais de património chave, localizações comunitárias e jantar autêntico',
    category: 'immersion',
    priceIncludes: ['Premium Security Chauffeur', 'Cultural Guide', 'Light Portuguese Meal', 'Heritage Site Access'],
    targetAudience: 'time_limited_tourists'
  },
  {
    id: 'full-day-heritage',
    name: 'Full-Day Portuguese Heritage Experience',
    namePortuguese: 'Experiência de Património Português de Dia Completo',
    price: 580, // Increased from £480 to reflect comprehensive full-day value
    originalPrice: 650,
    duration: '8 hours',
    membershipDiscounts: {
      visitor: 0,
      family: 12, // £510.40 (attractive savings for full-day commitment)
      ambassador: 20 // £464 (maximum heritage appreciation discount)
    },
    minimumGuests: 1,
    maximumGuests: 8,
    description: 'Comprehensive Portuguese heritage tour including fine dining, cultural sites, business district exploration, and evening Fado experience',
    descriptionPortuguese: 'Tour abrangente do património português incluindo jantar refinado, locais culturais, exploração do distrito empresarial e experiência de Fado noturna',
    category: 'heritage',
    priceIncludes: ['Elite Protection Service', 'Expert Cultural Guide', 'Portuguese Fine Dining Meal', 'Fado Performance', 'All Venue Access'],
    targetAudience: 'immersive_cultural_tourists'
  },
  {
    id: 'multi-day-discovery',
    name: 'Multi-Day Portuguese London Discovery',
    namePortuguese: 'Descoberta Portuguesa de Londres de Múltiplos Dias',
    price: 1480, // Increased from £1200 to reflect premium multi-day positioning
    originalPrice: 1650,
    duration: '2-3 days',
    membershipDiscounts: {
      visitor: 0,
      family: 15, // £1258 (significant savings for multi-day booking)
      ambassador: 25 // £1110 (maximum loyalty reward for extended engagement)
    },
    minimumGuests: 1,
    maximumGuests: 4, // Keep intimate for personalized experience
    description: 'Complete Portuguese London experience over 2-3 days with exclusive access, cultural events, private venues, and VIP treatment',
    descriptionPortuguese: 'Experiência portuguesa completa de Londres ao longo de 2-3 dias com acesso exclusivo, eventos culturais, locais privados e tratamento VIP',
    category: 'discovery',
    priceIncludes: ['Elite Protection Team', 'Dedicated Cultural Concierge', 'All Meals & Experiences', 'Exclusive Venue Access', 'Cultural Events Tickets'],
    targetAudience: 'luxury_cultural_travelers'
  },
  {
    id: 'family-portuguese-heritage',
    name: 'Family-Friendly Portuguese Heritage Tour',
    namePortuguese: 'Tour de Património Português para Famílias',
    price: 420, // Increased from £350 to reflect family-tailored premium service
    originalPrice: 470,
    duration: '5 hours',
    membershipDiscounts: {
      visitor: 0,
      family: 20, // £336 (maximum family discount - this is their target market)
      ambassador: 25 // £315 (reward loyal families heavily)
    },
    minimumGuests: 2, // Designed for families
    maximumGuests: 10, // Accommodate larger families
    description: 'Portuguese cultural experience designed for families with children, including interactive cultural activities, child-friendly venues, and educational experiences',
    descriptionPortuguese: 'Experiência cultural portuguesa desenhada para famílias com crianças, incluindo atividades culturais interativas, locais adequados para crianças e experiências educacionais',
    category: 'family',
    priceIncludes: ['Family-Specialized Chauffeur', 'Child-Friendly Cultural Guide', 'Family Portuguese Meal', 'Interactive Activities', 'Educational Materials'],
    targetAudience: 'portuguese_families_with_children'
  }
]

// Standard Experience Packages - Revenue-Optimized for Different Customer Segments
const standardPackages = [
  {
    id: 'bespoke',
    name: 'Bespoke Portuguese Cultural Experience',
    namePortuguese: 'Experiência Cultural Portuguesa Personalizada',
    price: 'From £850', // Starting price to set premium expectation
    originalPrice: 'Consultation Required',
    duration: 'Flexible (4-12 hours)',
    membershipDiscounts: {
      visitor: 0,
      family: 10, // Minimum 10% discount for members
      ambassador: 20 // Significant discount for loyal members
    },
    minimumGuests: 1,
    maximumGuests: 12,
    description: 'Fully customized Portuguese cultural experience tailored to your interests, heritage connections, and specific requirements with dedicated planning team',
    descriptionPortuguese: 'Experiência cultural portuguesa totalmente personalizada adaptada aos seus interesses, conexões patrimoniais e requisitos específicos com equipa de planeamento dedicada',
    category: 'custom',
    priceIncludes: ['Personal Planning Consultation', 'Elite Protection Service', 'Custom Cultural Guide', 'Flexible Duration', 'Exclusive Access Arrangements'],
    targetAudience: 'luxury_custom_experience_seekers'
  },
  {
    id: 'airport-vip',
    name: 'Airport VIP Transfer with Cultural Introduction',
    namePortuguese: 'Transferência VIP Aeroporto com Introdução Cultural',
    price: 145, // Increased from £125 to reflect VIP positioning
    originalPrice: 165,
    duration: '2 hours',
    membershipDiscounts: {
      visitor: 0,
      family: 8, // £133.40
      ambassador: 15 // £123.25
    },
    minimumGuests: 1,
    maximumGuests: 8,
    description: 'Premium airport transfer with Portuguese cultural orientation, community introduction, and first-day London guidance',
    descriptionPortuguese: 'Transferência premium do aeroporto com orientação cultural portuguesa, introdução à comunidade e orientação do primeiro dia em Londres',
    category: 'transfer',
    priceIncludes: ['Premium Security Chauffeur', 'Cultural Orientation Guide', 'Portuguese Community Welcome Pack', 'London Navigation Assistance'],
    targetAudience: 'arriving_portuguese_tourists'
  },
  {
    id: 'shopping-portuguese',
    name: 'Portuguese Cultural Shopping Experience',
    namePortuguese: 'Experiência de Compras Culturais Portuguesas',
    price: 320, // Increased from £280 to reflect specialized shopping service
    originalPrice: 360,
    duration: '4 hours',
    membershipDiscounts: {
      visitor: 0,
      family: 12, // £281.60 (strong shopping discount for families)
      ambassador: 18 // £262.40 (maximum shopping experience discount)
    },
    minimumGuests: 1,
    maximumGuests: 6,
    description: 'Visit Portuguese specialty shops, cultural bookstores, authentic product retailers, and Portuguese markets with expert shopping guide',
    descriptionPortuguese: 'Visite lojas especializadas portuguesas, livrarias culturais, retalhistas de produtos autênticos e mercados portugueses com guia especializado em compras',
    category: 'shopping',
    priceIncludes: ['Premium Security Chauffeur', 'Portuguese Shopping Specialist', 'VIP Store Access', 'Cultural Product Authentication'],
    targetAudience: 'cultural_shopping_enthusiasts'
  },
  {
    id: 'business-network-introduction',
    name: 'Portuguese Business Network Introduction',
    namePortuguese: 'Introdução à Rede Empresarial Portuguesa',
    price: 380,
    originalPrice: 420,
    duration: '3 hours',
    membershipDiscounts: {
      visitor: 0,
      family: 8, // £349.60
      ambassador: 15 // £323
    },
    minimumGuests: 1,
    maximumGuests: 4,
    description: 'Focused introduction to Portuguese business networks, chambers of commerce, and professional associations with key contact introductions',
    descriptionPortuguese: 'Introdução focada às redes empresariais portuguesas, câmaras de comércio e associações profissionais com introduções de contactos-chave',
    category: 'business_networking',
    priceIncludes: ['Elite Protection Service', 'Business Network Specialist', 'Professional Introductions', 'Business Cards & Materials'],
    targetAudience: 'business_networking_professionals'
  }
]

// Combine all packages
const experiencePackages = [
  ...portugalHeritageExperiences,
  ...multiDayPackages,
  ...standardPackages
]

const features = [
  {
    icon: ShieldCheckIcon,
    title: 'Licensed & Insured',
    titlePortuguese: 'Licenciado e Segurado',
    description: 'All drivers are fully licensed with comprehensive insurance coverage',
    descriptionPortuguese: 'Todos os motoristas são totalmente licenciados com cobertura de seguro abrangente'
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
]

export default function ChauffeurPage() {
  const { t, language } = useLanguage()
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [selectedService, setSelectedService] = useState<string | null>(null)

  const isPortuguese = language === 'pt'

  const handleBookService = (serviceId: string) => {
    setSelectedService(serviceId)
    setShowBookingForm(true)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-20">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-5"></div>
        <div className="relative container-width px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-premium-100 text-premium-800 border border-premium-200">
                <Crown className="w-4 h-4 mr-2" />
                {isPortuguese ? 'Serviço Premium Português' : 'Premium Portuguese Service'}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              {isPortuguese ? (
                <>
                  Serviço de <span className="text-premium-600">Chauffeur</span><br />
                  de Segurança Português
                </>
              ) : (
                <>
                  Portuguese Security <span className="text-premium-600">Chauffeur</span><br />
                  Service
                </>
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              {isPortuguese 
                ? 'Experiências culturais portuguesas autênticas com transporte de segurança. Guias especializados em património, acesso privilegiado à comunidade, e narrativas culturais profundas com proteção discreta.'
                : 'Authentic Portuguese cultural experiences with security transport. Heritage specialist guides, insider community access, and deep cultural storytelling with discreet protection.'
              }
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6"
            >
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
                <span>{isPortuguese ? 'Especialistas em Cultura Portuguesa' : 'Portuguese Culture Specialists'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-premium-500 rounded-full"></div>
                <span>{isPortuguese ? 'Acesso Privilegiado à Comunidade' : 'Insider Community Access'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
                <span>{isPortuguese ? 'Segurança Profissional' : 'Professional Security'}</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
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
      </section>

      {/* Cultural Authenticity Section */}
      <section className="py-16 bg-gradient-to-br from-secondary-50/60 via-white to-premium-50/40 border-t border-gray-100">
        <div className="container-width px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-secondary-100 via-premium-50 to-accent-100 border border-secondary-200">
                <Crown className="w-4 h-4 mr-2" />
                {isPortuguese ? 'Autenticidade Cultural Garantida' : 'Authentic Cultural Guarantee'}
              </span>
            </motion.div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              {isPortuguese ? 'Experiência Portuguesa Autêntica com Segurança' : 'Authentic Portuguese Experience with Security'}
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              {isPortuguese 
                ? 'Nossos guias especialistas em património português oferecem experiências culturais profundas, acesso privilegiado à comunidade e narrativas históricas autênticas, tudo com proteção de segurança profissional.'
                : 'Our Portuguese heritage specialist guides provide deep cultural experiences, insider community access, and authentic historical storytelling, all with professional security protection.'
              }
            </p>
          </div>

          {/* Cultural Expertise Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/60 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-secondary-100 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-secondary-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {isPortuguese ? 'Especialistas em Património Português' : 'Portuguese Heritage Specialists'}
              </h3>
              <p className="text-gray-600 mb-6">
                {isPortuguese 
                  ? 'Guias com conhecimento profundo da história marítima portuguesa, tradições culturais e contribuições da comunidade para Londres.'
                  : 'Guides with deep knowledge of Portuguese maritime history, cultural traditions, and community contributions to London.'
                }
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-secondary-500" />
                  <span>{isPortuguese ? 'História marítima e descobertas' : 'Maritime history & discoveries'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-secondary-500" />
                  <span>{isPortuguese ? 'Tradições culturais autênticas' : 'Authentic cultural traditions'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-secondary-500" />
                  <span>{isPortuguese ? 'Contexto histórico de Londres' : 'London historical context'}</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/60 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-premium-100 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-premium-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15 21v-2a6 6 0 0 0-6-6H6a6 6 0 0 0-6 6v2c0 1.1.9 2 2 2h10a2 2 0 0 0 2-2zm6-2a4 4 0 0 0-4-4h-1.5a7.5 7.5 0 0 1-.5-3c0-4.42 3.58-8 8-8s8 3.58 8 8c0 1-.18 1.94-.5 2.82"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {isPortuguese ? 'Acesso Privilegiado à Comunidade' : 'Insider Community Access'}
              </h3>
              <p className="text-gray-600 mb-6">
                {isPortuguese 
                  ? 'Conexões exclusivas com estabelecimentos portugueses autênticos, centros culturais e locais comunitários em Londres.'
                  : 'Exclusive connections with authentic Portuguese establishments, cultural centers, and community locations across London.'
                }
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-premium-500" />
                  <span>{isPortuguese ? 'Restaurantes e padarias autênticas' : 'Authentic restaurants & bakeries'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-premium-500" />
                  <span>{isPortuguese ? 'Centros culturais portugueses' : 'Portuguese cultural centers'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-premium-500" />
                  <span>{isPortuguese ? 'Eventos e festivais privados' : 'Private events & festivals'}</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/60 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-accent-100 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheckIcon className="w-8 h-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {isPortuguese ? 'Segurança Cultural Consciente' : 'Culturally Conscious Security'}
              </h3>
              <p className="text-gray-600 mb-6">
                {isPortuguese 
                  ? 'Proteção profissional que compreende e respeita as tradições portuguesas, oferecendo segurança discreta durante experiências culturais.'
                  : 'Professional protection that understands and respects Portuguese traditions, providing discreet security during cultural experiences.'
                }
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-accent-500" />
                  <span>{isPortuguese ? 'Proteção discreta e profissional' : 'Discreet professional protection'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-accent-500" />
                  <span>{isPortuguese ? 'Sensibilidade cultural' : 'Cultural sensitivity'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-accent-500" />
                  <span>{isPortuguese ? 'Protocolos de emergência' : 'Emergency protocols'}</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-premium-100 rounded-full mb-4">
                  <feature.icon className="w-8 h-8 text-premium-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {isPortuguese ? feature.titlePortuguese : feature.title}
                </h3>
                <p className="text-gray-600">
                  {isPortuguese ? feature.descriptionPortuguese : feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Integration Banner */}
      <section className="py-12 bg-gradient-to-r from-primary-50 to-secondary-50">
        <div className="container-width px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {isPortuguese ? 'Descontos Exclusivos para Membros LusoTown' : 'Exclusive Discounts for LusoTown Members'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-lg font-semibold text-gray-900 mb-2">
                  {isPortuguese ? 'Visitante' : 'Visitor'}
                </div>
                <div className="text-gray-600 mb-2">
                  {isPortuguese ? 'Preços padrão' : 'Standard pricing'}
                </div>
                <div className="text-sm text-primary-600">
                  {isPortuguese ? 'Junta-te gratuitamente' : 'Join for free'}
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md border-2 border-primary-400">
                <div className="text-lg font-semibold text-primary-600 mb-2">
                  {isPortuguese ? 'Família' : 'Family'} (£12/mês)
                </div>
                <div className="text-green-600 font-semibold mb-2">
                  5-20% {isPortuguese ? 'desconto' : 'discount'}
                </div>
                <div className="text-sm text-gray-600">
                  {isPortuguese ? 'Poupanças até £150 por serviço' : 'Save up to £150 per service'}
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md border-2 border-premium-400">
                <div className="text-lg font-semibold text-premium-600 mb-2">
                  {isPortuguese ? 'Embaixador' : 'Ambassador'} (£25/mês)
                </div>
                <div className="text-green-600 font-semibold mb-2">
                  10-25% {isPortuguese ? 'desconto' : 'discount'}
                </div>
                <div className="text-sm text-gray-600">
                  {isPortuguese ? 'Poupanças até £370 por serviço' : 'Save up to £370 per service'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Tiers Section */}
      <section id="services" className="py-16 bg-gray-50">
        <div className="container-width px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {isPortuguese ? 'Níveis de Serviço' : 'Service Tiers'}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {isPortuguese 
                ? 'Escolha o nível de proteção e serviço que melhor se adequa às suas necessidades. Membros LusoTown recebem descontos automáticos.'
                : 'Choose the level of protection and service that best fits your needs. LusoTown members receive automatic discounts.'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {serviceTiers.map((tier, index) => (
              <ChauffeurServiceCard
                key={tier.id}
                tier={tier}
                isPortuguese={isPortuguese}
                onBookNow={() => handleBookService(tier.id)}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Portuguese Cultural Tourism Experiences Section */}
      <section className="py-16 bg-white">
        <div className="container-width px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-secondary-100 text-secondary-800 border border-secondary-200">
                <Crown className="w-4 h-4 mr-2" />
                {isPortuguese ? 'Experiências Culturais Autênticas' : 'Authentic Cultural Experiences'}
              </span>
            </motion.div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {isPortuguese ? 'Turismo Cultural Português em Londres' : 'Portuguese Cultural Tourism in London'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {isPortuguese 
                ? 'Experiências autênticas de turismo cultural português com especialistas locais, acesso privilegiado e narrativas culturais profundas'
                : 'Authentic Portuguese cultural tourism experiences with local experts, insider access, and deep cultural storytelling'
              }
            </p>
          </div>

          {/* Portuguese Heritage Experiences */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              {isPortuguese ? 'Experiências de Património Português' : 'Portuguese Heritage Experiences'}
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {portugalHeritageExperiences.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-white to-secondary-50/30 rounded-xl shadow-lg border border-secondary-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`inline-block w-3 h-3 rounded-full bg-${
                            pkg.category === 'heritage' ? 'secondary' : 
                            pkg.category === 'authentic' ? 'premium' : 
                            pkg.category === 'culinary' ? 'accent' : 'primary'
                          }-500`}></span>
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            {pkg.category}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {isPortuguese ? pkg.namePortuguese : pkg.name}
                        </h3>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-2xl font-bold text-secondary-600">
                          £{pkg.price}
                        </div>
                        <div className="text-sm text-gray-500">{pkg.duration}</div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {isPortuguese ? pkg.descriptionPortuguese : pkg.description}
                    </p>

                    {/* Highlights */}
                    {pkg.highlights && (
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3">
                          {isPortuguese ? 'Destaques da Experiência:' : 'Experience Highlights:'}
                        </h4>
                        <ul className="space-y-2">
                          {(isPortuguese ? pkg.highlightsPortuguese : pkg.highlights).slice(0, 3).map((highlight, idx) => (
                            <li key={idx} className="flex items-start text-sm text-gray-600">
                              <CheckCircleIcon className="w-4 h-4 text-secondary-500 mt-0.5 mr-2 flex-shrink-0" />
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <button
                      onClick={() => handleBookService(pkg.id)}
                      className="w-full bg-secondary-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-secondary-700 transition-colors transform hover:scale-105 duration-200"
                    >
                      {isPortuguese ? 'Reservar Experiência Cultural' : 'Book Cultural Experience'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Multi-Day Packages */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              {isPortuguese ? 'Pacotes de Múltiplos Dias' : 'Multi-Day Heritage Packages'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {multiDayPackages.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div className="p-6">
                    <div className="text-center mb-4">
                      <div className="text-2xl font-bold text-premium-600 mb-1">
                        {typeof pkg.price === 'number' ? `£${pkg.price}` : pkg.price}
                      </div>
                      <div className="text-sm text-gray-500 mb-3">{pkg.duration}</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {isPortuguese ? pkg.namePortuguese : pkg.name}
                      </h3>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                      {isPortuguese ? pkg.descriptionPortuguese : pkg.description}
                    </p>
                    
                    <button
                      onClick={() => handleBookService(pkg.id)}
                      className="w-full bg-premium-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-premium-700 transition-colors text-sm"
                    >
                      {isPortuguese ? 'Reservar' : 'Book Package'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Standard Services */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              {isPortuguese ? 'Serviços Padrão' : 'Standard Services'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {standardPackages.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {isPortuguese ? pkg.namePortuguese : pkg.name}
                      </h3>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-premium-600">
                          {typeof pkg.price === 'number' ? `£${pkg.price}` : pkg.price}
                        </div>
                        <div className="text-sm text-gray-500">{pkg.duration}</div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-6">
                      {isPortuguese ? pkg.descriptionPortuguese : pkg.description}
                    </p>
                    
                    <button
                      onClick={() => handleBookService(pkg.id)}
                      className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                    >
                      {isPortuguese ? 'Reservar Serviço' : 'Book Service'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portuguese Cultural Tour Routes Section */}
      <PortugueseCulturalTourRoutes 
        isPortuguese={isPortuguese}
        onBookTour={(tourId) => handleBookService(tourId)}
      />

      {/* Testimonials Section */}
      <ChauffeurTestimonials />

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
                className="inline-flex items-center justify-center bg-action-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-action-700 transition-colors"
              >
                <PhoneIcon className="w-5 h-5 mr-2" />
                {isPortuguese ? 'Ligar Agora' : 'Call Now'}
              </a>
              <button
                onClick={() => setShowBookingForm(true)}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-premium-900 transition-colors"
              >
                {isPortuguese ? 'Reserva Online' : 'Book Online'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <ChauffeurBookingForm
          isOpen={showBookingForm}
          onClose={() => {
            setShowBookingForm(false)
            setSelectedService(null)
          }}
          selectedService={selectedService}
          serviceTiers={serviceTiers}
          experiencePackages={experiencePackages}
        />
      )}

      <Footer />
    </div>
  )
}