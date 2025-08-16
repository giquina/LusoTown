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
import LondonTourRoutes from '@/components/LondonTourRoutes'
import CustomToursSection from '@/components/CustomToursSection'
import { useLanguage } from '@/context/LanguageContext'

// Optimized pricing structure based on market research and membership integration
const serviceTiers = [
  {
    id: 'essential',
    name: 'Essential Private Transport',
    namePortuguese: 'Transporte Privado Essencial',
    price: 55, // Optimized from £45 based on market analysis
    originalPrice: 65, // Show value proposition
    image: 'https://images.unsplash.com/photo-1549317336-206569e8475c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Luxury private transport vehicle in London',
    imageAltPortuguese: 'Veículo de transporte privado de luxo em Londres',
    membershipDiscounts: {
      visitor: 0, // No discount for non-members
      family: 5, // 5% discount for Family members (£52.25)
      ambassador: 10 // 10% discount for Ambassador members (£49.50)
    },
    minimumHours: 3,
    description: 'Professional Portuguese-speaking private transport service for London tourism',
    descriptionPortuguese: 'Serviço de transporte privado profissional falante de português para turismo em Londres',
    features: [
      'Professional Portuguese-speaking driver',
      'Premium luxury vehicle',
      'Meet & greet service with cultural sensitivity',
      'Basic security awareness training',
      'London tourism and attraction expertise',
      'Airport monitoring & flight tracking',
      'Complimentary waiting time (30 minutes)'
    ],
    featuresPortuguese: [
      'Motorista profissional falante de português',
      'Veículo de luxo premium',
      'Serviço de encontro e receção com sensibilidade cultural',
      'Treino básico de consciência de segurança',
      'Expertise em turismo e atrações de Londres',
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
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Professional security service with luxury vehicle at London landmark',
    imageAltPortuguese: 'Serviço de segurança profissional com veículo de luxo em marco de Londres',
    membershipDiscounts: {
      visitor: 0,
      family: 5, // £71.25
      ambassador: 10 // £67.50
    },
    minimumHours: 3,
    description: 'Enhanced security with SIA-licensed protection officer for London experiences',
    descriptionPortuguese: 'Segurança melhorada com oficial de proteção licenciado SIA para experiências em Londres',
    features: [
      'All Essential features',
      'SIA-licensed trained security officer',
      'Pre-trip threat assessment',
      'Discreet close protection',
      'Emergency response protocols',
      'Security briefing and route planning',
      'London business district expertise',
      'London venue security knowledge'
    ],
    featuresPortuguese: [
      'Todas as características Essenciais',
      'Oficial de segurança treinado licenciado SIA',
      'Avaliação de ameaças pré-viagem',
      'Proteção próxima discreta',
      'Protocolos de resposta de emergência',
      'Briefing de segurança e planeamento de rotas',
      'Expertise do distrito empresarial de Londres',
      'Conhecimento de segurança de locais de Londres'
    ],
    popular: true,
    color: 'secondary',
    targetAudience: 'business_tourists'
  },
  {
    id: 'vip',
    name: 'VIP London Experience',
    namePortuguese: 'Experiência VIP de Londres',
    price: 95, // Optimized from £85 to reflect cultural value-add
    originalPrice: 110,
    image: 'https://images.unsplash.com/photo-1520637836862-4d197d17c93a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    imageAlt: 'VIP London experience with Tower Bridge and luxury service',
    imageAltPortuguese: 'Experiência VIP de Londres com Tower Bridge e serviço de luxo',
    membershipDiscounts: {
      visitor: 0,
      family: 5, // £90.25
      ambassador: 15 // £80.75 (higher discount for cultural appreciation)
    },
    minimumHours: 4, // Minimum 4 hours for cultural experiences
    description: 'Premium service with Portuguese-speaking London guide, security, and insider access',
    descriptionPortuguese: 'Serviço premium com guia de Londres falante de português, segurança e acesso privilegiado',
    features: [
      'All Premium Security features',
      'Certified Portuguese-speaking London guide',
      'VIP access to London attractions and restaurants',
      'London commentary and historical insights',
      'Professional photography at all tour stops',
      'Photo opportunities at every destination',
      'Curated dining recommendations with reservations',
      'London business network introductions',
      'Ultra-premium luxury vehicle'
    ],
    featuresPortuguese: [
      'Todas as características de Segurança Premium',
      'Guia certificado de Londres falante de português',
      'Acesso VIP a atrações e restaurantes de Londres',
      'Comentário de Londres e insights históricos',
      'Fotografia profissional em todas as paragens do tour',
      'Oportunidades de fotografia em cada destino',
      'Recomendações gastronómicas selecionadas com reservas',
      'Introduções à rede empresarial de Londres',
      'Veículo de luxo ultra-premium'
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
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Elite protection service with armored luxury vehicle in London',
    imageAltPortuguese: 'Serviço de proteção elite com veículo de luxo blindado em Londres',
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
      'Luxury or armored vehicle options available',
      'Real-time security coordination',
      'London diplomatic protocol knowledge'
    ],
    featuresPortuguese: [
      'Todas as características VIP Culturais',
      'Equipa de proteção próxima multi-pessoa',
      'Planeamento avançado de rotas e reconhecimento',
      'Medidas de contra-vigilância',
      'Opção de veículo blindado disponível',
      'Apoio médico e pessoal qualificado em primeiros socorros',
      'Protocolos de evacuação de emergência',
      'Opções de veículos de luxo ou blindados disponíveis',
      'Coordenação de segurança em tempo real',
      'Conhecimento de protocolo diplomático de Londres'
    ],
    popular: false,
    color: 'action',
    targetAudience: 'vip_clients'
  }
]

// London Tourism Experience Packages with Portuguese-Speaking Guides - Premium London Attractions
const londonTourismExperiences = [
  {
    id: 'classic-london-tour',
    name: 'Classic London Tour',
    namePortuguese: 'Tour Clássico de Londres',
    price: 320,
    originalPrice: 350,
    duration: '4 hours',
    image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Big Ben and Westminster Bridge - Classic London landmarks',
    imageAltPortuguese: 'Big Ben e Westminster Bridge - Marcos clássicos de Londres',
    membershipDiscounts: {
      visitor: 0,
      family: 8, // £294.40
      ambassador: 15 // £272
    },
    minimumGuests: 1,
    maximumGuests: 4,
    description: 'Discover London\'s iconic landmarks with professional Portuguese-speaking guide and luxury private transport service',
    descriptionPortuguese: 'Descubra os marcos icónicos de Londres com guia profissional falante de português e serviço de transporte privado de luxo',
    category: 'classic',
    priceIncludes: ['VIP Security Driver', 'Professional Portuguese-Speaking Guide', 'Venue Access Fees', 'London Guide Book'],
    highlights: [
      'Big Ben, Westminster Abbey, and Houses of Parliament',
      'Buckingham Palace and Changing of the Guard',
      'Tower Bridge and Tower of London',
      'Trafalgar Square and National Gallery',
      'St. Paul\'s Cathedral and City of London'
    ],
    highlightsPortuguese: [
      'Big Ben, Abadia de Westminster e Casas do Parlamento',
      'Palácio de Buckingham e Troca da Guarda',
      'Tower Bridge e Torre de Londres',
      'Trafalgar Square e Galeria Nacional',
      'Catedral de St. Paul e City de Londres'
    ],
    targetAudience: 'london_tourists'
  },
  {
    id: 'royal-london-experience',
    name: 'Royal London Experience',
    namePortuguese: 'Experiência Real de Londres',
    price: 380,
    originalPrice: 420,
    duration: '6 hours',
    image: 'https://images.unsplash.com/photo-1529655683826-3c8974dac6d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Buckingham Palace with royal guards - Royal London experience',
    imageAltPortuguese: 'Palácio de Buckingham com guardas reais - Experiência real de Londres',
    membershipDiscounts: {
      visitor: 0,
      family: 10, // £342
      ambassador: 18 // £311.60
    },
    minimumGuests: 1,
    maximumGuests: 6,
    description: 'Explore London\'s royal heritage with visits to palaces, royal parks, and historic venues with Portuguese-speaking expert guide',
    descriptionPortuguese: 'Explore a herança real de Londres com visitas a palácios, parques reais e locais históricos com guia especialista falante de português',
    category: 'royal',
    priceIncludes: ['Premium Security Driver', 'Royal Heritage Guide', 'Palace Entry Tickets', 'Traditional Afternoon Tea'],
    highlights: [
      'Buckingham Palace State Rooms and Royal Mews',
      'Kensington Palace and Diana Memorial',
      'Windsor Castle day trip option',
      'Hyde Park and Kensington Gardens',
      'Royal Albert Hall and South Kensington museums'
    ],
    highlightsPortuguese: [
      'Salas de Estado do Palácio de Buckingham e Royal Mews',
      'Palácio de Kensington e Memorial da Diana',
      'Opção de viagem de um dia ao Castelo de Windsor',
      'Hyde Park e Jardins de Kensington',
      'Royal Albert Hall e museus de South Kensington'
    ],
    targetAudience: 'royal_heritage_enthusiasts'
  },
  {
    id: 'modern-london-discovery',
    name: 'Modern London Discovery',
    namePortuguese: 'Descoberta da Londres Moderna',
    price: 450,
    originalPrice: 495,
    duration: '6 hours',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    imageAlt: 'The Shard and modern London skyline with Thames river',
    imageAltPortuguese: 'The Shard e skyline moderno de Londres com rio Tâmisa',
    membershipDiscounts: {
      visitor: 0,
      family: 10, // £405
      ambassador: 15 // £382.50
    },
    minimumGuests: 2,
    maximumGuests: 8,
    description: 'Explore contemporary London with visits to modern attractions, innovative architecture, and cutting-edge cultural venues',
    descriptionPortuguese: 'Explore a Londres contemporânea com visitas a atrações modernas, arquitetura inovadora e locais culturais de vanguarda',
    category: 'modern',
    priceIncludes: ['Elite Protection Driver', 'Modern London Specialist Guide', 'Attraction Entry Tickets', 'Sky Bar Experience'],
    highlights: [
      'The Shard and panoramic London views',
      'London Eye and South Bank cultural quarter',
      'Canary Wharf business district and Docklands',
      'Olympic Park and Queen Elizabeth Olympic Park',
      'Tate Modern and Millennium Bridge'
    ],
    highlightsPortuguese: [
      'The Shard e vistas panorâmicas de Londres',
      'London Eye e bairro cultural de South Bank',
      'Distrito empresarial de Canary Wharf e Docklands',
      'Parque Olímpico e Queen Elizabeth Olympic Park',
      'Tate Modern e Millennium Bridge'
    ],
    targetAudience: 'modern_architecture_enthusiasts'
  },
  {
    id: 'london-markets-shopping',
    name: 'London Markets & Shopping Experience',
    namePortuguese: 'Experiência de Mercados e Compras de Londres',
    price: 520,
    originalPrice: 580,
    duration: '8 hours',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Covent Garden market and shopping area in London',
    imageAltPortuguese: 'Mercado de Covent Garden e área de compras em Londres',
    membershipDiscounts: {
      visitor: 0,
      family: 8, // £478.40
      ambassador: 12 // £457.60
    },
    minimumGuests: 1,
    maximumGuests: 4,
    description: 'Discover London\'s best shopping districts and famous markets with insider access and personal shopping assistance',
    descriptionPortuguese: 'Descubra os melhores distritos comerciais e mercados famosos de Londres com acesso privilegiado e assistência pessoal de compras',
    category: 'shopping',
    priceIncludes: ['Elite Protection Service', 'Personal Shopping Guide', 'VIP Store Access', 'Luxury Shopping Lunch'],
    highlights: [
      'Oxford Street and Bond Street luxury shopping',
      'Covent Garden and Seven Dials boutiques',
      'Camden Market and alternative fashion',
      'Borough Market food and artisan products',
      'Portobello Road antiques and vintage finds'
    ],
    highlightsPortuguese: [
      'Compras de luxo em Oxford Street e Bond Street',
      'Boutiques de Covent Garden e Seven Dials',
      'Camden Market e moda alternativa',
      'Borough Market comida e produtos artesanais',
      'Portobello Road antiguidades e achados vintage'
    ],
    targetAudience: 'shopping_enthusiasts'
  }
]

// Multi-Day London Tourism Packages - Premium London Experiences with Portuguese-Speaking Service
const multiDayPackages = [
  {
    id: 'half-day-london-highlights',
    name: 'Half-Day London Highlights',
    namePortuguese: 'Destaques de Londres de Meio Dia',
    price: 280,
    originalPrice: 320,
    duration: '4 hours',
    membershipDiscounts: {
      visitor: 0,
      family: 10, // £252
      ambassador: 18 // £229.60
    },
    minimumGuests: 1,
    maximumGuests: 6,
    description: 'Essential London landmarks and attractions with Portuguese-speaking guide and luxury transport',
    descriptionPortuguese: 'Marcos e atrações essenciais de Londres com guia falante de português e transporte de luxo',
    category: 'highlights',
    priceIncludes: ['Premium Security Driver', 'London Tourist Guide', 'Light Meal', 'Attraction Entry'],
    targetAudience: 'time_limited_tourists'
  },
  {
    id: 'full-day-london-explorer',
    name: 'Full-Day London Explorer',
    namePortuguese: 'Explorador de Londres de Dia Completo',
    price: 580,
    originalPrice: 650,
    duration: '8 hours',
    membershipDiscounts: {
      visitor: 0,
      family: 12, // £510.40
      ambassador: 20 // £464
    },
    minimumGuests: 1,
    maximumGuests: 8,
    description: 'Comprehensive London tour including major attractions, West End, traditional lunch, and Thames river experience',
    descriptionPortuguese: 'Tour abrangente de Londres incluindo atrações principais, West End, almoço tradicional e experiência do rio Tâmisa',
    category: 'explorer',
    priceIncludes: ['Elite Protection Service', 'Expert London Guide', 'Traditional British Lunch', 'River Thames Cruise', 'All Venue Access'],
    targetAudience: 'comprehensive_london_tourists'
  },
  {
    id: 'multi-day-london-discovery',
    name: 'Multi-Day London Discovery',
    namePortuguese: 'Descoberta de Londres de Múltiplos Dias',
    price: 1480,
    originalPrice: 1650,
    duration: '2-3 days',
    membershipDiscounts: {
      visitor: 0,
      family: 15, // £1258
      ambassador: 25 // £1110
    },
    minimumGuests: 1,
    maximumGuests: 4,
    description: 'Complete London experience over 2-3 days with exclusive access to top attractions, West End shows, and VIP experiences',
    descriptionPortuguese: 'Experiência completa de Londres ao longo de 2-3 dias com acesso exclusivo às principais atrações, espetáculos do West End e experiências VIP',
    category: 'discovery',
    priceIncludes: ['Elite Protection Team', 'Dedicated London Concierge', 'All Meals & Experiences', 'West End Show Tickets', 'VIP Attraction Access'],
    targetAudience: 'luxury_london_travelers'
  },
  {
    id: 'family-london-adventure',
    name: 'Family-Friendly London Adventure',
    namePortuguese: 'Aventura de Londres para Famílias',
    price: 420,
    originalPrice: 470,
    duration: '5 hours',
    membershipDiscounts: {
      visitor: 0,
      family: 20, // £336
      ambassador: 25 // £315
    },
    minimumGuests: 2,
    maximumGuests: 10,
    description: 'London experience designed for families with children, including interactive attractions, child-friendly venues, and educational activities',
    descriptionPortuguese: 'Experiência de Londres desenhada para famílias com crianças, incluindo atrações interativas, locais adequados para crianças e atividades educacionais',
    category: 'family',
    priceIncludes: ['Family-Specialized Driver', 'Child-Friendly London Guide', 'Family Meal', 'Interactive Activities', 'Educational Materials'],
    targetAudience: 'families_with_children'
  }
]

// Standard London Tourism Packages - Professional London Services with Portuguese-Speaking Staff
const standardPackages = [
  {
    id: 'bespoke',
    name: 'Bespoke London Experience',
    namePortuguese: 'Experiência Personalizada de Londres',
    price: 'From £850',
    originalPrice: 'Consultation Required',
    duration: 'Flexible (4-12 hours)',
    membershipDiscounts: {
      visitor: 0,
      family: 10,
      ambassador: 20
    },
    minimumGuests: 1,
    maximumGuests: 12,
    description: 'Fully customized London experience tailored to your interests, preferred attractions, and specific requirements with dedicated planning team',
    descriptionPortuguese: 'Experiência de Londres totalmente personalizada adaptada aos seus interesses, atrações preferidas e requisitos específicos com equipa de planeamento dedicada',
    category: 'custom',
    priceIncludes: ['Personal Planning Consultation', 'Elite Protection Service', 'Custom London Guide', 'Flexible Duration', 'Exclusive Access Arrangements'],
    targetAudience: 'luxury_custom_experience_seekers'
  },
  {
    id: 'airport-vip',
    name: 'Airport VIP Transfer with London Introduction',
    namePortuguese: 'Transferência VIP Aeroporto com Introdução a Londres',
    price: 145,
    originalPrice: 165,
    duration: '2 hours',
    membershipDiscounts: {
      visitor: 0,
      family: 8, // £133.40
      ambassador: 15 // £123.25
    },
    minimumGuests: 1,
    maximumGuests: 8,
    description: 'Premium airport transfer with London orientation, tourist information, and first-day guidance with Portuguese-speaking driver',
    descriptionPortuguese: 'Transferência premium do aeroporto com orientação de Londres, informação turística e orientação do primeiro dia com motorista falante de português',
    category: 'transfer',
    priceIncludes: ['Premium Security Driver', 'London Orientation Guide', 'Tourist Welcome Pack', 'London Navigation Assistance'],
    targetAudience: 'arriving_tourists'
  },
  {
    id: 'harry-potter-london',
    name: 'Harry Potter London Experience',
    namePortuguese: 'Experiência Harry Potter de Londres',
    price: 320,
    originalPrice: 360,
    duration: '4 hours',
    membershipDiscounts: {
      visitor: 0,
      family: 12, // £281.60
      ambassador: 18 // £262.40
    },
    minimumGuests: 1,
    maximumGuests: 6,
    description: 'Visit Harry Potter film locations, Platform 9¾, and Warner Bros Studio with expert guide and luxury transport',
    descriptionPortuguese: 'Visite locais de filmagem de Harry Potter, Plataforma 9¾ e Warner Bros Studio com guia especialista e transporte de luxo',
    category: 'themed',
    priceIncludes: ['Premium Security Driver', 'Harry Potter Specialist Guide', 'Studio Tour Tickets', 'Themed Photo Opportunities'],
    targetAudience: 'harry_potter_enthusiasts'
  },
  {
    id: 'west-end-theatre-experience',
    name: 'West End Theatre Experience',
    namePortuguese: 'Experiência de Teatro do West End',
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
    description: 'Premium West End experience with show tickets, theatre district tour, and fine dining with Portuguese-speaking concierge',
    descriptionPortuguese: 'Experiência premium do West End com bilhetes de espetáculo, tour do distrito teatral e jantar refinado com concierge falante de português',
    category: 'entertainment',
    priceIncludes: ['Elite Protection Service', 'Theatre Specialist Guide', 'Premium Show Tickets', 'Pre-Theatre Dining'],
    targetAudience: 'theatre_enthusiasts'
  }
]

// Combine all packages
const experiencePackages = [
  ...londonTourismExperiences,
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
    title: 'Portuguese-Speaking Service',
    titlePortuguese: 'Serviço Falante de Português',
    description: 'Professional Portuguese-speaking guides for London tourism',
    descriptionPortuguese: 'Guias profissionais falantes de português para turismo em Londres'
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
    description: 'Deep knowledge of London attractions and premier destinations',
    descriptionPortuguese: 'Conhecimento profundo das atrações de Londres e destinos premium'
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
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary-50 via-white to-accent-50 pt-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-secondary-900/10 via-transparent to-accent-900/10"></div>
        <div className="relative container-width px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-secondary-100 via-premium-50 to-accent-100 border border-secondary-200 shadow-lg">
                <Crown className="w-4 h-4 mr-2 text-premium-600" />
                <span className="bg-gradient-to-r from-secondary-600 via-premium-600 to-accent-600 bg-clip-text text-transparent font-bold">
                  {isPortuguese ? 'Turismo Premium de Londres' : 'Premium London Tourism'}
                </span>
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight"
            >
              {isPortuguese ? (
                <>
                  Turismo de <span className="bg-gradient-to-r from-secondary-600 via-premium-600 to-accent-600 bg-clip-text text-transparent">Londres</span><br />
                  com Transporte Privado Português
                </>
              ) : (
                <>
                  London <span className="bg-gradient-to-r from-secondary-600 via-premium-600 to-accent-600 bg-clip-text text-transparent">Tourism</span><br />
                  with Portuguese Private Transport
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
                ? 'Experiências turísticas premium em Londres com motoristas e guias que falam português fluentemente. Descubra os principais pontos turísticos de Londres com comunicação profissional em português e transporte de segurança.'
                : 'Premium London tourism experiences with fluent Portuguese-speaking drivers and guides. Discover London\'s top attractions with professional Portuguese communication and secure transport.'
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
                <span>{isPortuguese ? 'Guias Falantes de Português' : 'Portuguese-Speaking Guides'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-premium-500 rounded-full"></div>
                <span>{isPortuguese ? 'Atrações Premium de Londres' : 'Premium London Attractions'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
                <span>{isPortuguese ? 'Transporte de Segurança' : 'Secure Transport'}</span>
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
                className="bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-secondary-700 hover:via-action-700 hover:to-accent-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-1"
              >
                {isPortuguese ? 'Reservar Agora' : 'Book Now'}
              </button>
              <a
                href="#services"
                className="border-2 border-secondary-600 text-secondary-600 px-8 py-4 rounded-2xl font-bold hover:bg-secondary-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1"
              >
                {isPortuguese ? 'Ver Serviços' : 'View Services'}
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cultural Authenticity Section */}
      <section className="py-24 bg-gradient-to-br from-secondary-50/60 via-white to-accent-50/40 border-t border-gray-100 relative overflow-hidden">
        {/* Portuguese-inspired background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-secondary-200/40 via-accent-100/30 to-coral-100/30 rounded-full opacity-60 animate-pulse" />
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-tr from-action-200/40 via-secondary-100/30 to-accent-100/30 rounded-full opacity-50 animate-bounce" style={{ animationDuration: '8s' }} />
          <div className="absolute top-1/4 left-1/6 w-6 h-6 bg-secondary-300/50 rounded-full opacity-40" />
          <div className="absolute top-3/4 right-1/5 w-4 h-4 bg-accent-300/50 rounded-full opacity-30" />
          <div className="absolute bottom-1/3 left-2/3 w-3 h-3 bg-coral-300/50 rounded-full opacity-35" />
        </div>

        <div className="container-width px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-secondary-100 via-premium-50 to-accent-100 border border-secondary-200 shadow-lg">
                <Crown className="w-4 h-4 mr-2 text-premium-600" />
                <span className="bg-gradient-to-r from-secondary-600 via-premium-600 to-accent-600 bg-clip-text text-transparent font-bold">
                  {isPortuguese ? 'Turismo Premium de Londres' : 'Premium London Tourism'}
                </span>
              </span>
            </motion.div>
            
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">
              {isPortuguese ? 'Turismo Premium em Londres com Assistência em Português' : 'Premium London Tourism with Portuguese Language Support'}
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              {isPortuguese 
                ? 'Nossos guias especializados em turismo de Londres oferecem experiências personalizadas das principais atrações com comunicação fluente em português e transporte seguro de luxo.'
                : 'Our London tourism specialists provide personalized experiences of top attractions with fluent Portuguese communication and luxury secure transport.'
              }
            </p>
          </div>

          {/* Cultural Expertise Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/60 hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-500 shadow-xl">
                <svg className="w-8 h-8 text-secondary-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {isPortuguese ? 'Especialistas em Turismo de Londres' : 'London Tourism Specialists'}
              </h3>
              <p className="text-gray-600 mb-6">
                {isPortuguese 
                  ? 'Guias profissionais com conhecimento profundo da história de Londres, atrações principais e experiências premium, oferecendo tours em português fluente.'
                  : 'Professional guides with deep knowledge of London\'s history, top attractions, and premium experiences, offering tours in fluent Portuguese.'
                }
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-secondary-500" />
                  <span>{isPortuguese ? 'História e marcos de Londres' : 'London history & landmarks'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-secondary-500" />
                  <span>{isPortuguese ? 'Atrações turísticas premium' : 'Premium tourist attractions'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-secondary-500" />
                  <span>{isPortuguese ? 'Comunicação fluente em português' : 'Fluent Portuguese communication'}</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/60 hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-premium-100 to-premium-200 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-500 shadow-xl">
                <svg className="w-8 h-8 text-premium-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15 21v-2a6 6 0 0 0-6-6H6a6 6 0 0 0-6 6v2c0 1.1.9 2 2 2h10a2 2 0 0 0 2-2zm6-2a4 4 0 0 0-4-4h-1.5a7.5 7.5 0 0 1-.5-3c0-4.42 3.58-8 8-8s8 3.58 8 8c0 1-.18 1.94-.5 2.82"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {isPortuguese ? 'Acesso VIP às Atrações de Londres' : 'VIP Access to London Attractions'}
              </h3>
              <p className="text-gray-600 mb-6">
                {isPortuguese 
                  ? 'Conexões exclusivas para acesso VIP às principais atrações de Londres, restaurantes premium e experiências especiais, tudo com assistência em português.'
                  : 'Exclusive connections for VIP access to London\'s top attractions, premium restaurants, and special experiences, all with Portuguese language assistance.'
                }
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-premium-500" />
                  <span>{isPortuguese ? 'Acesso VIP a palácios e castelos' : 'VIP access to palaces & castles'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-premium-500" />
                  <span>{isPortuguese ? 'Restaurantes premium de Londres' : 'Premium London restaurants'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-premium-500" />
                  <span>{isPortuguese ? 'Experiências exclusivas e teatros' : 'Exclusive experiences & theaters'}</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/60 hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-accent-100 to-accent-200 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-500 shadow-xl">
                <ShieldCheckIcon className="w-8 h-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {isPortuguese ? 'Segurança Turística Profissional' : 'Professional Tourist Security'}
              </h3>
              <p className="text-gray-600 mb-6">
                {isPortuguese 
                  ? 'Proteção profissional especializada em turismo com comunicação fluente em português, oferecendo segurança discreta durante experiências turísticas em Londres.'
                  : 'Tourism-specialized professional protection with fluent Portuguese communication, providing discreet security during London tourism experiences.'
                }
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-accent-500" />
                  <span>{isPortuguese ? 'Proteção discreta para turistas' : 'Discreet tourist protection'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-accent-500" />
                  <span>{isPortuguese ? 'Comunicação em português' : 'Portuguese communication'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-accent-500" />
                  <span>{isPortuguese ? 'Protocolos de emergência turística' : 'Tourist emergency protocols'}</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* London Attractions Gallery */}
      <section className="py-16 bg-white">
        <div className="container-width px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-gray-900 mb-4"
            >
              {isPortuguese ? 'Principais Atrações de Londres' : 'Top London Attractions'}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              {isPortuguese 
                ? 'Descubra os marcos icónicos e atrações imperdíveis de Londres com os nossos guias especializados'
                : 'Discover iconic landmarks and must-see attractions in London with our specialist guides'
              }
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              {
                src: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                alt: 'Big Ben and Westminster',
                altPt: 'Big Ben e Westminster',
                title: 'Westminster & Big Ben',
                titlePt: 'Westminster e Big Ben'
              },
              {
                src: 'https://images.unsplash.com/photo-1529655683826-3c8974dac6d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                alt: 'Buckingham Palace',
                altPt: 'Palácio de Buckingham',
                title: 'Buckingham Palace',
                titlePt: 'Palácio de Buckingham'
              },
              {
                src: 'https://images.unsplash.com/photo-1520637836862-4d197d17c93a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                alt: 'Tower Bridge',
                altPt: 'Tower Bridge',
                title: 'Tower Bridge',
                titlePt: 'Tower Bridge'
              },
              {
                src: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                alt: 'The Shard',
                altPt: 'The Shard',
                title: 'The Shard',
                titlePt: 'The Shard'
              },
              {
                src: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                alt: 'Covent Garden',
                altPt: 'Covent Garden',
                title: 'Covent Garden',
                titlePt: 'Covent Garden'
              },
              {
                src: 'https://images.unsplash.com/photo-1529655683826-3c8974dac6d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                alt: 'London Eye',
                altPt: 'London Eye',
                title: 'London Eye',
                titlePt: 'London Eye'
              },
              {
                src: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                alt: 'Tower of London',
                altPt: 'Torre de Londres',
                title: 'Tower of London',
                titlePt: 'Torre de Londres'
              },
              {
                src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                alt: 'St Paul\'s Cathedral',
                altPt: 'Catedral de St. Paul',
                title: 'St Paul\'s Cathedral',
                titlePt: 'Catedral de St. Paul'
              }
            ].map((attraction, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <img 
                  src={attraction.src} 
                  alt={isPortuguese ? attraction.altPt : attraction.alt}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h4 className="font-bold text-sm">
                    {isPortuguese ? attraction.titlePt : attraction.title}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-br from-white via-secondary-50/30 to-accent-50/30">
        <div className="container-width px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              {isPortuguese ? 'Por Que Escolher-nos' : 'Why Choose Us'}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {isPortuguese 
                ? 'Serviço premium com comunicação em português e os mais altos padrões de segurança'
                : 'Premium service with Portuguese language communication and the highest security standards'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-2xl mb-4 shadow-xl">
                  <feature.icon className="w-8 h-8 text-secondary-600" />
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


      {/* Service Tiers Section */}
      <section id="services" className="py-24 bg-gradient-to-br from-gray-50 via-secondary-50/30 to-accent-50/30">
        <div className="container-width px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              {isPortuguese ? 'Níveis de Serviço' : 'Service Tiers'}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {isPortuguese 
                ? 'Escolha o nível de proteção e serviço que melhor se adequa às suas necessidades. Membros LusoTown recebem descontos automáticos.'
                : 'Choose the level of protection and service that best fits your needs. LusoTown members receive automatic discounts.'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
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

      {/* London Tourism Experiences with Portuguese Service Section */}
      <section className="py-24 bg-gradient-to-br from-white via-secondary-50/30 to-accent-50/30">
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
                <Crown className="w-4 h-4 mr-2 text-premium-600" />
                <span className="bg-gradient-to-r from-secondary-600 via-premium-600 to-accent-600 bg-clip-text text-transparent font-bold">
                  {isPortuguese ? 'Experiências Premium de Londres' : 'Premium London Experiences'}
                </span>
              </span>
            </motion.div>
            
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              {isPortuguese ? 'Turismo de Londres com Serviço Português' : 'London Tourism with Portuguese Service'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {isPortuguese 
                ? 'Experiências premium de turismo em Londres com guias especializados falantes de português, acesso VIP e narrativas históricas detalhadas'
                : 'Premium London tourism experiences with specialist Portuguese-speaking guides, VIP access, and detailed historical narratives'
              }
            </p>
          </div>

          {/* London Tourism Experiences */}
          <div className="mb-16">
            <h3 className="text-3xl font-black text-gray-900 mb-8 text-center">
              {isPortuguese ? 'Experiências Turísticas de Londres' : 'London Tourism Experiences'}
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {londonTourismExperiences.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-white to-secondary-50/30 rounded-xl shadow-lg border border-secondary-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  {/* Experience Image */}
                  {pkg.image && (
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={pkg.image} 
                        alt={isPortuguese ? (pkg.imageAltPortuguese || pkg.imageAlt || '') : (pkg.imageAlt || '')}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white ${
                          pkg.category === 'classic' ? 'bg-secondary-600/80' : 
                          pkg.category === 'royal' ? 'bg-premium-600/80' : 
                          pkg.category === 'modern' ? 'bg-accent-600/80' : 
                          pkg.category === 'shopping' ? 'bg-primary-600/80' : 'bg-secondary-600/80'
                        }`}>
                          {pkg.category.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
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
                      {isPortuguese ? 'Reservar Experiência de Londres' : 'Book London Experience'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Multi-Day Packages */}
          <div className="mb-16">
            <h3 className="text-3xl font-black text-gray-900 mb-8 text-center">
              {isPortuguese ? 'Pacotes de Múltiplos Dias em Londres' : 'Multi-Day London Packages'}
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
            <h3 className="text-3xl font-black text-gray-900 mb-8 text-center">
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

      {/* London Tour Routes Section */}
      <LondonTourRoutes 
        isPortuguese={isPortuguese}
        onBookTour={(tourId) => handleBookService(tourId)}
      />

      {/* Testimonials Section */}
      <ChauffeurTestimonials />

      {/* Contact Section */}
      <section className="py-24 bg-gradient-to-br from-secondary-900 via-premium-900 to-action-900 text-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-br from-secondary-400/20 via-accent-300/20 to-coral-300/20 rounded-full opacity-60 animate-pulse" />
          <div className="absolute bottom-10 left-10 w-16 h-16 bg-gradient-to-tr from-action-400/20 via-secondary-300/20 to-accent-300/20 rounded-full opacity-50 animate-bounce" style={{ animationDuration: '6s' }} />
        </div>
        
        <div className="container-width px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h2 className="text-4xl font-black mb-4">
              {isPortuguese ? 'Precisa de Assistência Imediata?' : 'Need Immediate Assistance?'}
            </h2>
            <p className="text-xl text-secondary-200 mb-8 max-w-2xl mx-auto">
              {isPortuguese 
                ? 'A nossa equipa está disponível 24/7 para emergências e reservas de última hora'
                : 'Our team is available 24/7 for emergencies and last-minute bookings'
              }
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+447777777777"
                className="inline-flex items-center justify-center bg-gradient-to-r from-action-600 to-coral-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-action-700 hover:to-coral-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105"
              >
                <PhoneIcon className="w-5 h-5 mr-2" />
                {isPortuguese ? 'Ligar Agora' : 'Call Now'}
              </a>
              <button
                onClick={() => setShowBookingForm(true)}
                className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold hover:bg-white hover:text-secondary-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {isPortuguese ? 'Reserva Online' : 'Book Online'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Tours Section */}
      <CustomToursSection
        onBookTour={handleBookService}
        showHeader={true}
      />

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