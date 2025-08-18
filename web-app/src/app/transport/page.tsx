"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheckIcon,
  StarIcon,
  ClockIcon,
  PhoneIcon,
  MapPinIcon,
  CurrencyPoundIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon, Crown } from "lucide-react";
import Footer from "@/components/Footer";
import TransportBookingForm from "@/components/TransportBookingForm";
import TransportBookingFlow from "@/components/TransportBookingFlow";
import TransportServiceCard from "@/components/TransportServiceCard";
import TransportTestimonials from "@/components/TransportTestimonials";
import LondonTourRoutes from "@/components/LondonTourRoutes";
import CustomToursSection from "@/components/CustomToursSection";
import ServiceCommunityBridge from "@/components/ServiceCommunityBridge";
import CrossPlatformNavigationWidget from "@/components/CrossPlatformNavigationWidget";
import { useLanguage } from "@/context/LanguageContext";

// Premium security and VIP services - London-focused operations only
const serviceTiers = [
  {
    id: "premium",
    name: "Premium Security",
    namePortuguese: "Segurança Premium",
    serviceKey: "security_personal", // Maps to available service
    price: 400,
    originalPrice: 450,
    image:
      "https://res.cloudinary.com/dqhbeqttp/image/upload/v1734535200/premium-security-service_dlqxkx.jpg",
    imageAlt:
      "Professional security service with professional vehicle at London landmark",
    imageAltPortuguese:
      "Serviço de segurança profissional com veículo profissional em marco de Londres",
    membershipDiscounts: {
      visitor: 0,
      family: 5,
      ambassador: 10,
    },
    minimumHours: 3,
    description:
      "Enhanced security with licensed protection officer for London-based operations (£400/day, 3-hour minimum)",
    descriptionPortuguese:
      "Segurança melhorada com oficial de proteção licenciado para operações baseadas em Londres (£400/dia, mínimo 3 horas)",
    popular: true,
    features: [
      "Portuguese-speaking driver and security officer",
      "Licensed trained security officer",
      "Pre-trip threat assessment for London areas",
      "Discreet close protection throughout London",
      "Emergency response protocols",
      "Security briefing and London route planning",
      "London business district expertise",
      "London venue security knowledge",
    ],
    featuresPortuguese: [
      "Motorista e oficial de segurança falantes de português",
      "Oficial de segurança treinado licenciado",
      "Avaliação de ameaças pré-viagem para áreas de Londres",
      "Proteção próxima discreta por toda Londres",
      "Protocolos de resposta de emergência",
      "Briefing de segurança e planeamento de rotas de Londres",
      "Expertise do distrito empresarial de Londres",
      "Conhecimento de segurança de locais de Londres",
    ],
    color: "secondary",
    targetAudience: "business_tourists",
  },
  {
    id: "vip",
    name: "VIP London Experience",
    namePortuguese: "Experiência VIP de Londres",
    serviceKey: "close_protection", // Maps to available service
    price: 800,
    originalPrice: 900,
    image:
      "https://res.cloudinary.com/dqhbeqttp/image/upload/v1734535201/vip-london-bridge_hml2nr.jpg",
    imageAlt:
      "VIP London experience with Tower Bridge and professional service",
    imageAltPortuguese:
      "Experiência VIP de Londres com Tower Bridge e serviço profissional",
    membershipDiscounts: {
      visitor: 0,
      family: 5,
      ambassador: 15,
    },
    minimumHours: 4,
    description:
      "Premium London-based service with Portuguese-speaking guide and security personnel. Attraction tickets purchased separately.",
    descriptionPortuguese:
      "Serviço premium baseado em Londres com guia falante de português e pessoal de segurança. Bilhetes de atrações comprados separadamente.",
    features: [
      "All Premium Security features for London operations",
      "Certified Portuguese-speaking London guide",
      "Professional driver + security personnel in London",
      "London commentary and historical insights",
      "Professional photography service during London tours",
      "Curated London dining recommendations with reservations",
      "London business network introductions",
      "High-quality professional vehicle for London travel",
      "Note: Attraction tickets (London Eye, museums, etc.) purchased separately",
    ],
    featuresPortuguese: [
      "Todas as características de Segurança Premium para operações em Londres",
      "Guia certificado de Londres falante de português",
      "Motorista profissional + pessoal de segurança em Londres",
      "Comentário de Londres e insights históricos",
      "Serviço de fotografia profissional durante tours de Londres",
      "Recomendações gastronómicas selecionadas de Londres com reservas",
      "Introduções à rede empresarial de Londres",
      "Veículo profissional de alta qualidade para viagens em Londres",
      "Nota: Bilhetes de atrações (London Eye, museus, etc.) comprados separadamente",
    ],
    popular: false,
    color: "premium",
    targetAudience: "cultural_tourists",
  },
  {
    id: "elite",
    name: "Elite Protection",
    namePortuguese: "Proteção Elite",
    serviceKey: "executive_transport", // Maps to unavailable service
    price: 65,
    originalPrice: 75,
    image:
      "https://res.cloudinary.com/dqhbeqttp/image/upload/v1734535202/elite-protection-service_dqmxvr.jpg",
    imageAlt: "Elite protection service with professional vehicle in London",
    imageAltPortuguese:
      "Serviço de proteção elite com veículo profissional em Londres",
    membershipDiscounts: {
      visitor: 0,
      family: 5,
      ambassador: 10,
    },
    minimumHours: 4,
    callOutPremium: 50,
    description:
      "Maximum security with close protection team for high-profile individuals - London operations only (£800/day, 4-hour minimum)",
    descriptionPortuguese:
      "Segurança máxima com equipa de proteção próxima para indivíduos de alto perfil - operações apenas em Londres (£800/dia, mínimo 4 horas)",
    features: [
      "All VIP London Experience features",
      "Multi-person close protection team for London",
      "Advanced London route planning and reconnaissance",
      "Counter-surveillance measures within London",
      "Medical support and first aid qualified personnel",
      "Emergency evacuation protocols for London",
      "Professional security vehicles for London operations",
      "Real-time security coordination across London",
      "London diplomatic protocol knowledge",
      "Portuguese-speaking security team coordination",
    ],
    featuresPortuguese: [
      "Todas as características da Experiência VIP de Londres",
      "Equipa de proteção próxima multi-pessoa para Londres",
      "Planeamento avançado de rotas de Londres e reconhecimento",
      "Medidas de contra-vigilância dentro de Londres",
      "Apoio médico e pessoal qualificado em primeiros socorros",
      "Protocolos de evacuação de emergência para Londres",
      "Veículos de segurança profissionais para operações em Londres",
      "Coordenação de segurança em tempo real por toda Londres",
      "Conhecimento de protocolo diplomático de Londres",
      "Coordenação de equipa de segurança falante de português",
    ],
    popular: false,
    color: "action",
    targetAudience: "vip_clients",
  },
];

// London Tourism Experience Packages with Portuguese-Speaking Guides - Premium London Attractions
const londonTourismExperiences = [
  {
    id: "classic-london-tour",
    name: "Classic London Tour",
    namePortuguese: "Tour Clássico de Londres",
    price: 320,
    originalPrice: 350,
    duration: "4 hours",
    image:
      "https://res.cloudinary.com/dqhbeqttp/image/upload/v1734535203/big-ben-westminster_zlkd5m.jpg",
    imageAlt: "Big Ben and Westminster Bridge - Classic London landmarks",
    imageAltPortuguese:
      "Big Ben e Westminster Bridge - Marcos clássicos de Londres",
    membershipDiscounts: {
      visitor: 0,
      family: 8, // £294.40
      ambassador: 15, // £272
    },
    minimumGuests: 1,
    maximumGuests: 4,
    description:
      "Discover London's iconic landmarks with professional Portuguese-speaking guide and comfortable private transport service",
    descriptionPortuguese:
      "Descubra os marcos icónicos de Londres com guia profissional falante de português e serviço de transporte privado confortável",
    category: "classic",
    priceIncludes: [
      "VIP Security Driver",
      "Professional Portuguese-Speaking Guide",
      "Venue Access Fees",
      "London Guide Book",
    ],
    highlights: [
      "Big Ben, Westminster Abbey, and Houses of Parliament",
      "Buckingham Palace and Changing of the Guard",
      "Tower Bridge and Tower of London",
      "Trafalgar Square and National Gallery",
      "St. Paul's Cathedral and City of London",
    ],
    highlightsPortuguese: [
      "Big Ben, Abadia de Westminster e Casas do Parlamento",
      "Palácio de Buckingham e Troca da Guarda",
      "Tower Bridge e Torre de Londres",
      "Trafalgar Square e Galeria Nacional",
      "Catedral de St. Paul e City de Londres",
    ],
    targetAudience: "london_tourists",
  },
  {
    id: "royal-london-experience",
    name: "Royal London Experience",
    namePortuguese: "Experiência Real de Londres",
    price: 380,
    originalPrice: 420,
    duration: "6 hours",
    image:
      "https://res.cloudinary.com/dqhbeqttp/image/upload/v1734535204/buckingham-palace_xnr8wp.jpg",
    imageAlt: "Buckingham Palace with royal guards - Royal London experience",
    imageAltPortuguese:
      "Palácio de Buckingham com guardas reais - Experiência real de Londres",
    membershipDiscounts: {
      visitor: 0,
      family: 10, // £342
      ambassador: 18, // £311.60
    },
    minimumGuests: 1,
    maximumGuests: 6,
    description:
      "Explore London's royal heritage with visits to palaces, royal parks, and historic venues with Portuguese-speaking expert guide",
    descriptionPortuguese:
      "Explore a herança real de Londres com visitas a palácios, parques reais e locais históricos com guia especialista falante de português",
    category: "royal",
    priceIncludes: [
      "Premium Security Driver",
      "Royal Heritage Guide",
      "Palace Entry Tickets",
      "Traditional Afternoon Tea",
    ],
    highlights: [
      "Buckingham Palace State Rooms and Royal Mews",
      "Kensington Palace and Diana Memorial",
      "Windsor Castle day trip option",
      "Hyde Park and Kensington Gardens",
      "Royal Albert Hall and South Kensington museums",
    ],
    highlightsPortuguese: [
      "Salas de Estado do Palácio de Buckingham e Royal Mews",
      "Palácio de Kensington e Memorial da Diana",
      "Opção de viagem de um dia ao Castelo de Windsor",
      "Hyde Park e Jardins de Kensington",
      "Royal Albert Hall e museus de South Kensington",
    ],
    targetAudience: "royal_heritage_enthusiasts",
  },
  {
    id: "modern-london-discovery",
    name: "Modern London Discovery",
    namePortuguese: "Descoberta da Londres Moderna",
    price: 450,
    originalPrice: 495,
    duration: "6 hours",
    image:
      "https://res.cloudinary.com/dqhbeqttp/image/upload/v1734535205/the-shard-london_kqe9xr.jpg",
    imageAlt: "The Shard and modern London skyline with Thames river",
    imageAltPortuguese: "The Shard e skyline moderno de Londres com rio Tâmisa",
    membershipDiscounts: {
      visitor: 0,
      family: 10, // £405
      ambassador: 15, // £382.50
    },
    minimumGuests: 2,
    maximumGuests: 8,
    description:
      "Explore contemporary London with visits to modern attractions, innovative architecture, and cutting-edge cultural venues",
    descriptionPortuguese:
      "Explore a Londres contemporânea com visitas a atrações modernas, arquitetura inovadora e locais culturais de vanguarda",
    category: "modern",
    priceIncludes: [
      "Elite Protection Driver",
      "Modern London Specialist Guide",
      "Attraction Entry Tickets",
      "Sky Bar Experience",
    ],
    highlights: [
      "The Shard and panoramic London views",
      "London Eye and South Bank cultural quarter",
      "Canary Wharf business district and Docklands",
      "Olympic Park and Queen Elizabeth Olympic Park",
      "Tate Modern and Millennium Bridge",
    ],
    highlightsPortuguese: [
      "The Shard e vistas panorâmicas de Londres",
      "London Eye e bairro cultural de South Bank",
      "Distrito empresarial de Canary Wharf e Docklands",
      "Parque Olímpico e Queen Elizabeth Olympic Park",
      "Tate Modern e Millennium Bridge",
    ],
    targetAudience: "modern_architecture_enthusiasts",
  },
  {
    id: "london-markets-shopping",
    name: "London Markets & Shopping Experience",
    namePortuguese: "Experiência de Mercados e Compras de Londres",
    price: 520,
    originalPrice: 580,
    duration: "8 hours",
    image:
      "https://res.cloudinary.com/dqhbeqttp/image/upload/v1734535206/covent-garden_dxh3qm.jpg",
    imageAlt: "Covent Garden market and shopping area in London",
    imageAltPortuguese: "Mercado de Covent Garden e área de compras em Londres",
    membershipDiscounts: {
      visitor: 0,
      family: 8, // £478.40
      ambassador: 12, // £457.60
    },
    minimumGuests: 1,
    maximumGuests: 4,
    description:
      "Discover London's best shopping districts and famous markets with insider access and personal shopping assistance",
    descriptionPortuguese:
      "Descubra os melhores distritos comerciais e mercados famosos de Londres com acesso privilegiado e assistência pessoal de compras",
    category: "shopping",
    priceIncludes: [
      "Elite Protection Service",
      "Personal Shopping Guide",
      "VIP Store Access",
      "Luxury Shopping Lunch",
    ],
    highlights: [
      "Oxford Street and Bond Street luxury shopping",
      "Covent Garden and Seven Dials boutiques",
      "Camden Market and alternative fashion",
      "Borough Market food and artisan products",
      "Portobello Road antiques and vintage finds",
    ],
    highlightsPortuguese: [
      "Compras de luxo em Oxford Street e Bond Street",
      "Boutiques de Covent Garden e Seven Dials",
      "Camden Market e moda alternativa",
      "Borough Market comida e produtos artesanais",
      "Portobello Road antiguidades e achados vintage",
    ],
    targetAudience: "shopping_enthusiasts",
  },
];

// Multi-Day London Tourism Packages - Premium London Experiences with Portuguese-Speaking Service
const multiDayPackages = [
  {
    id: "half-day-london-highlights",
    name: "Half-Day London Highlights",
    namePortuguese: "Destaques de Londres de Meio Dia",
    price: 280,
    originalPrice: 320,
    duration: "4 hours",
    membershipDiscounts: {
      visitor: 0,
      family: 10, // £252
      ambassador: 18, // £229.60
    },
    minimumGuests: 1,
    maximumGuests: 6,
    description:
      "Essential London landmarks and attractions with Portuguese-speaking guide and comfortable transport",
    descriptionPortuguese:
      "Marcos e atrações essenciais de Londres com guia falante de português e transporte confortável",
    category: "highlights",
    priceIncludes: [
      "Premium Security Driver",
      "London Tourist Guide",
      "Light Meal",
      "Attraction Entry",
    ],
    targetAudience: "time_limited_tourists",
  },
  {
    id: "full-day-london-explorer",
    name: "Full-Day London Explorer",
    namePortuguese: "Explorador de Londres de Dia Completo",
    price: 580,
    originalPrice: 650,
    duration: "8 hours",
    image:
      "https://res.cloudinary.com/dqhbeqttp/image/upload/v1734535207/tower-bridge-sunset_kml8pr.jpg",
    imageAlt: "Tower Bridge at sunset - Complete London exploration",
    imageAltPortuguese:
      "Tower Bridge ao pôr do sol - Exploração completa de Londres",
    membershipDiscounts: {
      visitor: 0,
      family: 12, // £510.40
      ambassador: 20, // £464
    },
    minimumGuests: 1,
    maximumGuests: 8,
    description:
      "Comprehensive London tour including major attractions, West End, traditional lunch, and Thames river experience",
    descriptionPortuguese:
      "Tour abrangente de Londres incluindo atrações principais, West End, almoço tradicional e experiência do rio Tâmisa",
    category: "explorer",
    priceIncludes: [
      "Elite Protection Service",
      "Expert London Guide",
      "Traditional British Lunch",
      "River Thames Cruise",
      "All Venue Access",
    ],
    targetAudience: "comprehensive_london_tourists",
  },
  {
    id: "multi-day-london-discovery",
    name: "Multi-Day London Discovery",
    namePortuguese: "Descoberta de Londres de Múltiplos Dias",
    price: 1480,
    originalPrice: 1650,
    duration: "2-3 days",
    membershipDiscounts: {
      visitor: 0,
      family: 15, // £1258
      ambassador: 25, // £1110
    },
    minimumGuests: 1,
    maximumGuests: 4,
    description:
      "Complete London experience over 2-3 days with exclusive access to top attractions, West End shows, and VIP experiences",
    descriptionPortuguese:
      "Experiência completa de Londres ao longo de 2-3 dias com acesso exclusivo às principais atrações, espetáculos do West End e experiências VIP",
    category: "discovery",
    priceIncludes: [
      "Elite Protection Team",
      "Dedicated London Concierge",
      "All Meals & Experiences",
      "West End Show Tickets",
      "VIP Attraction Access",
    ],
    targetAudience: "luxury_london_travelers",
  },
  {
    id: "family-london-adventure",
    name: "Complete London Adventure",
    namePortuguese: "Aventura Completa de Londres",
    price: 420,
    originalPrice: 470,
    duration: "5 hours",
    image:
      "https://res.cloudinary.com/dqhbeqttp/image/upload/v1734535209/london-attractions-collage_dxh4mn.jpg",
    imageAlt: "London family attractions - Adventure and cultural activities",
    imageAltPortuguese:
      "Atrações familiares de Londres - Aventura e atividades culturais",
    membershipDiscounts: {
      visitor: 0,
      family: 20, // £336
      ambassador: 25, // £315
    },
    minimumGuests: 2,
    maximumGuests: 10,
    description:
      "Comprehensive London experience including interactive attractions, cultural venues, and educational activities for Portuguese speakers",
    descriptionPortuguese:
      "Experiência abrangente de Londres incluindo atrações interativas, locais culturais e atividades educacionais para lusófonos",
    category: "cultural",
    priceIncludes: [
      "Specialized Driver",
      "Portuguese-Speaking London Guide",
      "Traditional Meal",
      "Interactive Activities",
      "Educational Materials",
    ],
    targetAudience: "adults_and_professionals",
  },
];

// Standard London Tourism Packages - Professional London Services with Portuguese-Speaking Staff
const standardPackages = [
  {
    id: "bespoke",
    name: "Bespoke London Experience",
    namePortuguese: "Experiência Personalizada de Londres",
    price: "From £850",
    originalPrice: "Consultation Required",
    duration: "Flexible (4-12 hours)",
    membershipDiscounts: {
      visitor: 0,
      family: 10,
      ambassador: 20,
    },
    minimumGuests: 1,
    maximumGuests: 12,
    description:
      "Fully customized London experience tailored to your interests, preferred attractions, and specific requirements with dedicated planning team",
    descriptionPortuguese:
      "Experiência de Londres totalmente personalizada adaptada aos seus interesses, atrações preferidas e requisitos específicos com equipa de planeamento dedicada",
    category: "custom",
    priceIncludes: [
      "Personal Planning Consultation",
      "Elite Protection Service",
      "Custom London Guide",
      "Flexible Duration",
      "Exclusive Access Arrangements",
    ],
    targetAudience: "luxury_custom_experience_seekers",
  },
  {
    id: "airport-vip",
    name: "Airport VIP Transfer with London Introduction",
    namePortuguese: "Transferência VIP Aeroporto com Introdução a Londres",
    price: 145,
    originalPrice: 165,
    duration: "2 hours",
    membershipDiscounts: {
      visitor: 0,
      family: 8, // £133.40
      ambassador: 15, // £123.25
    },
    minimumGuests: 1,
    maximumGuests: 8,
    description:
      "Premium airport transfer with London orientation, tourist information, and first-day guidance with Portuguese-speaking driver",
    descriptionPortuguese:
      "Transferência premium do aeroporto com orientação de Londres, informação turística e orientação do primeiro dia com motorista falante de português",
    category: "transfer",
    priceIncludes: [
      "Premium Security Driver",
      "London Orientation Guide",
      "Tourist Welcome Pack",
      "London Navigation Assistance",
    ],
    targetAudience: "arriving_tourists",
  },
  {
    id: "harry-potter-london",
    name: "Harry Potter London Experience",
    namePortuguese: "Experiência Harry Potter de Londres",
    price: 320,
    originalPrice: 360,
    duration: "4 hours",
    membershipDiscounts: {
      visitor: 0,
      family: 12, // £281.60
      ambassador: 18, // £262.40
    },
    minimumGuests: 1,
    maximumGuests: 6,
    description:
      "Visit Harry Potter film locations, Platform 9¾, and Warner Bros Studio with expert guide and comfortable transport",
    descriptionPortuguese:
      "Visite locais de filmagem de Harry Potter, Plataforma 9¾ e Warner Bros Studio com guia especialista e transporte confortável",
    category: "themed",
    priceIncludes: [
      "Premium Security Driver",
      "Harry Potter Specialist Guide",
      "Studio Tour Tickets",
      "Themed Photo Opportunities",
    ],
    targetAudience: "harry_potter_enthusiasts",
  },
  {
    id: "west-end-theatre-experience",
    name: "West End Theatre Experience",
    namePortuguese: "Experiência de Teatro do West End",
    price: 380,
    originalPrice: 420,
    duration: "3 hours",
    membershipDiscounts: {
      visitor: 0,
      family: 8, // £349.60
      ambassador: 15, // £323
    },
    minimumGuests: 1,
    maximumGuests: 4,
    description:
      "Premium West End experience with show tickets, theatre district tour, and fine dining with Portuguese-speaking concierge",
    descriptionPortuguese:
      "Experiência premium do West End com bilhetes de espetáculo, tour do distrito teatral e jantar refinado com concierge falante de português",
    category: "entertainment",
    priceIncludes: [
      "Elite Protection Service",
      "Theatre Specialist Guide",
      "Premium Show Tickets",
      "Pre-Theatre Dining",
    ],
    targetAudience: "theatre_enthusiasts",
  },
];

// Combine all packages
const experiencePackages = [
  ...londonTourismExperiences,
  ...multiDayPackages,
  ...standardPackages,
];

const features = [
  {
    icon: ShieldCheckIcon,
    title: "Licensed & Insured",
    titlePortuguese: "Licenciado e Segurado",
    description:
      "All drivers are fully licensed with comprehensive insurance coverage",
    descriptionPortuguese:
      "Todos os motoristas são totalmente licenciados com cobertura de seguro abrangente",
  },
  {
    icon: Crown,
    title: "Portuguese-Speaking Service",
    titlePortuguese: "Serviço Falante de Português",
    description: "Professional Portuguese-speaking guides for London tourism",
    descriptionPortuguese:
      "Guias profissionais falantes de português para turismo em Londres",
  },
  {
    icon: ClockIcon,
    title: "24/7 Availability",
    titlePortuguese: "Disponibilidade 24/7",
    description: "Round-the-clock service for your convenience and security",
    descriptionPortuguese:
      "Serviço 24 horas por dia para sua conveniência e segurança",
  },
  {
    icon: MapPinIcon,
    title: "London Expertise",
    titlePortuguese: "Expertise de Londres",
    description:
      "Deep knowledge of London attractions and premier destinations",
    descriptionPortuguese:
      "Conhecimento profundo das atrações de Londres e destinos premium",
  },
];

export default function TransportPage() {
  const { t, language } = useLanguage();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showSIABookingFlow, setShowSIABookingFlow] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const isPortuguese = language === "pt";

  const handleBookService = (serviceId: string) => {
    // Always start with the SIA questionnaire as the first step
    setSelectedService(serviceId);
    setShowSIABookingFlow(true);
  };

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary-50 via-white to-accent-50 pt-20">
        <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dqhbeqttp/image/upload/v1734535205/the-shard-london_kqe9xr.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-secondary-900/10 via-transparent to-accent-900/10"></div>
        <div className="relative container-width py-16 lg:py-24">
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
                  {isPortuguese
                    ? "Turismo Premium de Londres"
                    : "Premium London Tourism"}
                </span>
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl lg:text-6xl font-black text-gray-900 mb-8 leading-tight"
            >
              {/* Desktop full title */}
              <span className="hidden sm:block">
                {isPortuguese ? (
                  <>
                    Precisa de um motorista
                    <br />
                    <span className="bg-gradient-to-r from-secondary-600 via-premium-600 to-accent-600 bg-clip-text text-transparent">
                      ou segurança português
                    </span>{" "}
                    em Londres?
                  </>
                ) : (
                  <>
                    Need a Portuguese driver
                    <br />
                    <span className="bg-gradient-to-r from-secondary-600 via-premium-600 to-accent-600 bg-clip-text text-transparent">
                      or security
                    </span>{" "}
                    in London?
                  </>
                )}
              </span>
              {/* Mobile short title */}
              <span className="sm:hidden">
                {isPortuguese ? (
                  <>
                    LusoTown - Londres
                    <br />
                    <span className="bg-gradient-to-r from-secondary-600 via-premium-600 to-accent-600 bg-clip-text text-transparent">
                      Transporte
                    </span>{" "}
                    Português
                  </>
                ) : (
                  <>
                    LusoTown - London
                    <br />
                    <span className="bg-gradient-to-r from-secondary-600 via-premium-600 to-accent-600 bg-clip-text text-transparent">
                      Portuguese
                    </span>{" "}
                    Transport
                  </>
                )}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              {/* Desktop full subtitle */}
              <span className="hidden sm:block">
                {isPortuguese
                  ? "Descubra Londres com total confiança: motorista e guia português certificados, veículos premium e experiências VIP exclusivas. Comunicação fluente no seu idioma, conhecimento cultural autêntico e acesso privilegiado aos melhores locais de Londres."
                  : "Discover London with complete confidence: certified Portuguese driver and guide, premium vehicles, and exclusive VIP experiences. Fluent communication in your language, authentic cultural knowledge, and privileged access to London's finest locations."}
              </span>
              {/* Mobile short subtitle */}
              <span className="sm:hidden">
                {isPortuguese
                  ? "Motorista e guia português certificados em Londres. Experiências VIP com comunicação no seu idioma!"
                  : "Certified Portuguese driver & guide in London. VIP experiences with communication in your language!"}
              </span>
            </motion.p>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
            >
              <div className="flex items-center gap-2 text-sm font-medium text-secondary-700 bg-white px-4 py-2 rounded-full shadow-sm border border-secondary-100">
                <ShieldCheckIcon className="w-4 h-4 text-secondary-600" />
                {isPortuguese ? "SIA Licenciados" : "SIA Licensed"}
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-secondary-700 bg-white px-4 py-2 rounded-full shadow-sm border border-secondary-100">
                <StarIcon className="w-4 h-4 text-secondary-600" />
                {isPortuguese ? "5 Estrelas" : "5 Star Service"}
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-secondary-700 bg-white px-4 py-2 rounded-full shadow-sm border border-secondary-100">
                <ClockIcon className="w-4 h-4 text-secondary-600" />
                {isPortuguese ? "Disponível 24/7" : "Available 24/7"}
              </div>
            </motion.div>
            
            {/* Quick Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-8 text-center"
            >
              <p className="text-sm text-gray-500 mb-2">
                {isPortuguese 
                  ? "Preferência por reservas antecipadas | Emergências aceites" 
                  : "Advance bookings preferred | Emergencies accepted"}
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <MapPinIcon className="w-4 h-4" />
                  Londres & Arredores
                </span>
                <span className="flex items-center gap-1">
                  <CurrencyPoundIcon className="w-4 h-4" />
                  From £65/hour
                </span>
              </div>
            </motion.div>

            {/* Main CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <button
                onClick={() => handleBookService('premium')}
                className="group bg-gradient-to-r from-secondary-600 to-secondary-700 hover:from-secondary-700 hover:to-secondary-800 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 min-w-[280px] justify-center"
              >
                <Crown className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                {isPortuguese ? "Reserve Agora" : "Book Now"}
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => setShowBookingForm(true)}
                className="group bg-white hover:bg-gray-50 text-secondary-700 border-2 border-secondary-200 hover:border-secondary-300 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 min-w-[280px] justify-center"
              >
                <PhoneIcon className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                {isPortuguese ? "Falar Connosco" : "Contact Us"}
              </button>
            </motion.div>
            
            {/* Pricing Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl p-6 max-w-2xl mx-auto shadow-lg"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="border-r border-gray-200 last:border-r-0 pr-4 last:pr-0">
                  <div className="text-2xl font-bold text-secondary-700">£65+</div>
                  <div className="text-sm text-gray-600">
                    {isPortuguese ? "Por Hora" : "Per Hour"}
                  </div>
                </div>
                <div className="border-r border-gray-200 last:border-r-0 pr-4 last:pr-0">
                  <div className="text-2xl font-bold text-secondary-700">£320+</div>
                  <div className="text-sm text-gray-600">
                    {isPortuguese ? "Tours Londres" : "London Tours"}
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-secondary-700">£400+</div>
                  <div className="text-sm text-gray-600">
                    {isPortuguese ? "Segurança VIP" : "VIP Security"}
                  </div>
                </div>
              </div>
              
              {/* Additional pricing info */}
              <div className="text-center mt-6 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 font-medium">
                  {isPortuguese 
                    ? "Todos os preços incluem motorista português certificado" 
                    : "All prices include certified Portuguese driver"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {isPortuguese 
                    ? "Membros LusoTown recebem descontos especiais" 
                    : "LusoTown members receive special discounts"}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How SIA Close Protection Works Section */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="container-width">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-secondary-100 via-premium-50 to-accent-100 border border-secondary-200 shadow-lg">
                <ShieldCheckIcon className="w-4 h-4 mr-2 text-secondary-600" />
                <span className="bg-gradient-to-r from-secondary-600 via-premium-600 to-accent-600 bg-clip-text text-transparent font-bold">
                  {isPortuguese ? "Como Funciona" : "How It Works"}
                </span>
              </span>
            </motion.div>

            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">
              {isPortuguese
                ? "Processo Profissional de Proteção SIA"
                : "Professional SIA Protection Process"}
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              {isPortuguese
                ? "Nosso sistema garante total conformidade com regulamentações SIA do Reino Unido e os mais altos padrões de segurança"
                : "Our system ensures full compliance with UK SIA regulations and the highest security standards"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="relative text-center"
            >
              <div className="bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-2xl p-6 mb-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {isPortuguese ? "Escolha o Serviço" : "Choose Your Service"}
                </h3>
                <p className="text-gray-600 text-sm">
                  {isPortuguese
                    ? "Selecione o nível de proteção adequado às suas necessidades"
                    : "Select the protection level suitable for your needs"}
                </p>
              </div>
              {/* Arrow */}
              <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <ArrowRightIcon className="w-6 h-6 text-secondary-400" />
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative text-center"
            >
              <div className="bg-gradient-to-br from-accent-100 to-accent-200 rounded-2xl p-6 mb-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {isPortuguese ? "Questionário SIA" : "SIA Questionnaire"}
                </h3>
                <p className="text-gray-600 text-sm">
                  {isPortuguese
                    ? "Complete avaliação obrigatória de segurança e conformidade"
                    : "Complete mandatory safety & compliance assessment"}
                </p>
              </div>
              <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <ArrowRightIcon className="w-6 h-6 text-accent-400" />
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative text-center"
            >
              <div className="bg-gradient-to-br from-premium-100 to-premium-200 rounded-2xl p-6 mb-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-premium-500 to-premium-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {isPortuguese ? "Detalhes & Reserva" : "Details & Booking"}
                </h3>
                <p className="text-gray-600 text-sm">
                  {isPortuguese
                    ? "Forneça detalhes pessoais e confirme reserva segura"
                    : "Provide personal details and secure booking"}
                </p>
              </div>
              <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <ArrowRightIcon className="w-6 h-6 text-premium-400" />
              </div>
            </motion.div>

            {/* Step 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="relative text-center"
            >
              <div className="bg-gradient-to-br from-action-100 to-action-200 rounded-2xl p-6 mb-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-action-500 to-action-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-2xl font-bold text-white">4</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {isPortuguese ? "Revisão SIA" : "SIA Review"}
                </h3>
                <p className="text-gray-600 text-sm">
                  {isPortuguese
                    ? "Oficial licenciado revisa e confirma sua reserva"
                    : "Licensed officer reviews and confirms booking"}
                </p>
              </div>
              <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <ArrowRightIcon className="w-6 h-6 text-action-400" />
              </div>
            </motion.div>

            {/* Step 5 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-6 mb-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-2xl font-bold text-white">5</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {isPortuguese
                    ? "Serviço Profissional"
                    : "Professional Service"}
                </h3>
                <p className="text-gray-600 text-sm">
                  {isPortuguese
                    ? "Desfrute de proteção profissional e discreta"
                    : "Enjoy professional & discreet protection"}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Key Benefits */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-secondary-50 to-accent-50 rounded-xl p-6 border border-secondary-200"
            >
              <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mb-4">
                <ShieldCheckIcon className="w-6 h-6 text-secondary-600" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">
                {isPortuguese ? "Totalmente Conforme" : "Fully Compliant"}
              </h4>
              <p className="text-gray-600">
                {isPortuguese
                  ? "Todos os oficiais são licenciados SIA e seguem protocolos rigorosos do Reino Unido"
                  : "All officers are SIA licensed and follow strict UK protocols"}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-accent-50 to-premium-50 rounded-xl p-6 border border-accent-200"
            >
              <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
                <ClockIcon className="w-6 h-6 text-accent-600" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">
                {isPortuguese ? "Revisão Rápida" : "Fast Review"}
              </h4>
              <p className="text-gray-600">
                {isPortuguese
                  ? "Confirmação em 2-4 horas com designação imediata de oficial"
                  : "Confirmation within 2-4 hours with immediate officer assignment"}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-premium-50 to-action-50 rounded-xl p-6 border border-premium-200"
            >
              <div className="w-12 h-12 bg-premium-100 rounded-lg flex items-center justify-center mb-4">
                <Crown className="w-6 h-6 text-premium-600" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">
                {isPortuguese ? "Serviço Premium" : "Premium Service"}
              </h4>
              <p className="text-gray-600">
                {isPortuguese
                  ? "Comunicação em português e conhecimento cultural especializado"
                  : "Portuguese communication and specialized cultural knowledge"}
              </p>
            </motion.div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-secondary-900 via-premium-900 to-action-900 rounded-2xl p-8 text-white"
            >
              <h3 className="text-2xl font-bold mb-4">
                {isPortuguese
                  ? "Pronto para Começar?"
                  : "Ready to Get Started?"}
              </h3>
              <p className="text-secondary-200 mb-6 max-w-2xl mx-auto">
                {isPortuguese
                  ? "Inicie o processo de reserva agora e tenha proteção profissional em Londres em poucas horas"
                  : "Start the booking process now and have professional protection in London within hours"}
              </p>
              <button
                onClick={() => setShowSIABookingFlow(true)}
                className="bg-gradient-to-r from-accent-500 to-coral-500 text-white px-8 py-4 rounded-xl font-bold hover:from-accent-600 hover:to-coral-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {isPortuguese ? "Verificar Serviços" : "Check Services"}
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cultural Authenticity Section */}
      <section className="py-24 bg-gradient-to-br from-secondary-50/60 via-white to-accent-50/40 border-t border-gray-100 relative overflow-hidden">
        {/* Portuguese-inspired background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-secondary-200/40 via-accent-100/30 to-coral-100/30 rounded-full opacity-60 animate-pulse" />
          <div
            className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-tr from-action-200/40 via-secondary-100/30 to-accent-100/30 rounded-full opacity-50 animate-bounce"
            style={{ animationDuration: "8s" }}
          />
          <div className="absolute top-1/4 left-1/6 w-6 h-6 bg-secondary-300/50 rounded-full opacity-40" />
          <div className="absolute top-3/4 right-1/5 w-4 h-4 bg-accent-300/50 rounded-full opacity-30" />
          <div className="absolute bottom-1/3 left-2/3 w-3 h-3 bg-coral-300/50 rounded-full opacity-35" />
        </div>

        <div className="container-width relative z-10">
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
                  {isPortuguese
                    ? "Turismo Premium de Londres"
                    : "Premium London Tourism"}
                </span>
              </span>
            </motion.div>

            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">
              {isPortuguese
                ? "Quer Explorar Londres com Total Segurança?"
                : "Want to Explore London with Complete Safety?"}
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              {isPortuguese
                ? "Nossos motoristas e pessoal de segurança especializados oferecem proteção pessoal discreta e comunicação fluente em português. Explore Londres com confiança total!"
                : "Our specialized drivers and security personnel provide discreet personal protection and fluent Portuguese communication. Explore London with complete confidence!"}
            </p>
          </div>

          {/* Cultural Expertise Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/60 hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-500 shadow-xl">
                <svg
                  className="w-8 h-8 text-secondary-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {isPortuguese
                  ? "Especialistas em Turismo de Londres"
                  : "London Tourism Specialists"}
              </h3>
              <p className="text-gray-600 mb-6 flex-1">
                {isPortuguese
                  ? "Guias profissionais com conhecimento profundo da história de Londres, atrações principais e experiências premium, oferecendo tours em português fluente."
                  : "Professional guides with deep knowledge of London's history, top attractions, and premium experiences, offering tours in fluent Portuguese."}
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-secondary-500" />
                  <span>
                    {isPortuguese
                      ? "História e marcos de Londres"
                      : "London history & landmarks"}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-secondary-500" />
                  <span>
                    {isPortuguese
                      ? "Atrações turísticas premium"
                      : "Premium tourist attractions"}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-secondary-500" />
                  <span>
                    {isPortuguese
                      ? "Comunicação fluente em português"
                      : "Fluent Portuguese communication"}
                  </span>
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
                <svg
                  className="w-8 h-8 text-premium-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M15 21v-2a6 6 0 0 0-6-6H6a6 6 0 0 0-6 6v2c0 1.1.9 2 2 2h10a2 2 0 0 0 2-2zm6-2a4 4 0 0 0-4-4h-1.5a7.5 7.5 0 0 1-.5-3c0-4.42 3.58-8 8-8s8 3.58 8 8c0 1-.18 1.94-.5 2.82" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {isPortuguese
                  ? "Acesso VIP às Atrações de Londres"
                  : "VIP Access to London Attractions"}
              </h3>
              <p className="text-gray-600 mb-6">
                {isPortuguese
                  ? "Conexões exclusivas para acesso VIP às principais atrações de Londres, restaurantes premium e experiências especiais, tudo com assistência em português."
                  : "Exclusive connections for VIP access to London's top attractions, premium restaurants, and special experiences, all with Portuguese language assistance."}
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-premium-500" />
                  <span>
                    {isPortuguese
                      ? "Acesso VIP a palácios e castelos"
                      : "VIP access to palaces & castles"}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-premium-500" />
                  <span>
                    {isPortuguese
                      ? "Restaurantes premium de Londres"
                      : "Premium London restaurants"}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-premium-500" />
                  <span>
                    {isPortuguese
                      ? "Experiências exclusivas e teatros"
                      : "Exclusive experiences & theaters"}
                  </span>
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
                {isPortuguese
                  ? "Segurança Turística Profissional"
                  : "Professional Tourist Security"}
              </h3>
              <p className="text-gray-600 mb-6">
                {isPortuguese
                  ? "Proteção profissional especializada em turismo com comunicação fluente em português, oferecendo segurança discreta durante experiências turísticas em Londres especificamente."
                  : "Tourism-specialized professional protection with fluent Portuguese communication, providing discreet security during London tourism experiences specifically."}
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-accent-500" />
                  <span>
                    {isPortuguese
                      ? "Proteção discreta para turistas em Londres"
                      : "Discreet tourist protection in London"}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-accent-500" />
                  <span>
                    {isPortuguese
                      ? "Comunicação em português"
                      : "Portuguese communication"}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-accent-500" />
                  <span>
                    {isPortuguese
                      ? "Protocolos de emergência para Londres"
                      : "London emergency protocols"}
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* London Attractions Gallery */}
      <section className="py-16 bg-white">
        <div className="container-width">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-gray-900 mb-4"
            >
              {isPortuguese
                ? "Principais Atrações de Londres"
                : "Top London Attractions"}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              {isPortuguese
                ? "Descubra os marcos icónicos e atrações imperdíveis de Londres com os nossos guias especializados"
                : "Discover iconic landmarks and must-see attractions in London with our specialist guides"}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[
              {
                src: "https://res.cloudinary.com/dqhbeqttp/image/upload/v1734535203/big-ben-westminster_zlkd5m.jpg",
                alt: "Big Ben and Westminster",
                altPt: "Big Ben e Westminster",
                title: "Westminster & Big Ben",
                titlePt: "Westminster e Big Ben",
              },
              {
                src: "https://res.cloudinary.com/dqhbeqttp/image/upload/v1734535204/buckingham-palace_xnr8wp.jpg",
                alt: "Buckingham Palace",
                altPt: "Palácio de Buckingham",
                title: "Buckingham Palace",
                titlePt: "Palácio de Buckingham",
              },
              {
                src: "https://res.cloudinary.com/dqhbeqttp/image/upload/v1734535201/vip-london-bridge_hml2nr.jpg",
                alt: "Tower Bridge",
                altPt: "Tower Bridge",
                title: "Tower Bridge",
                titlePt: "Tower Bridge",
              },
              {
                src: "https://res.cloudinary.com/dqhbeqttp/image/upload/v1734535205/the-shard-london_kqe9xr.jpg",
                alt: "The Shard",
                altPt: "The Shard",
                title: "The Shard",
                titlePt: "The Shard",
              },
              {
                src: "https://res.cloudinary.com/dqhbeqttp/image/upload/v1734535206/covent-garden_dxh3qm.jpg",
                alt: "Covent Garden",
                altPt: "Covent Garden",
                title: "Covent Garden",
                titlePt: "Covent Garden",
              },
              {
                src: "https://res.cloudinary.com/dqhbeqttp/image/upload/v1734535204/buckingham-palace_xnr8wp.jpg",
                alt: "London Eye",
                altPt: "London Eye",
                title: "London Eye",
                titlePt: "London Eye",
              },
              {
                src: "https://res.cloudinary.com/dqhbeqttp/image/upload/v1734535207/tower-of-london_kmlr5p.jpg",
                alt: "Tower of London",
                altPt: "Torre de Londres",
                title: "Tower of London",
                titlePt: "Torre de Londres",
              },
              {
                src: "https://res.cloudinary.com/dqhbeqttp/image/upload/v1734535208/st-pauls-cathedral_r9nxhw.jpg",
                alt: "St Paul's Cathedral",
                altPt: "Catedral de St. Paul",
                title: "St Paul's Cathedral",
                titlePt: "Catedral de St. Paul",
              },
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

      {/* Features Section - Why Choose Us */}
      <section className="py-24 bg-gradient-to-br from-secondary-900 via-premium-900 to-action-900 text-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-br from-secondary-400/20 via-accent-300/20 to-coral-300/20 rounded-full opacity-60 animate-pulse" />
          <div className="absolute bottom-10 left-10 w-16 h-16 bg-gradient-to-tr from-action-400/20 via-secondary-300/20 to-accent-300/20 rounded-full opacity-50 animate-bounce" />
        </div>
        
        <div className="container-width relative">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <span className="inline-flex items-center px-8 py-4 rounded-full text-base font-bold bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl">
                <StarIcon className="w-5 h-5 mr-3 text-yellow-400" />
                <span className="text-white">
                  {isPortuguese
                    ? "Por Que Escolher a LusoTown?"
                    : "Why Choose LusoTown?"}
                </span>
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-6xl font-black text-white mb-8 leading-tight"
            >
              {isPortuguese
                ? "A Diferença Está no Detalhe"
                : "The Difference is in the Details"}
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-medium"
            >
              {isPortuguese
                ? "Não somos apenas um serviço de transporte. Somos os seus parceiros de confiança em Londres, oferecendo experiências autênticas com total compreensão cultural."
                : "We're not just a transport service. We're your trusted partners in London, offering authentic experiences with complete cultural understanding."}
            </motion.p>
            
            {/* Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto"
            >
              <div className="text-center">
                <div className="text-4xl font-black text-white mb-2">500+</div>
                <div className="text-gray-300">
                  {isPortuguese ? "Clientes Satisfeitos" : "Satisfied Clients"}
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-white mb-2">24/7</div>
                <div className="text-gray-300">
                  {isPortuguese ? "Disponibilidade" : "Availability"}
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-white mb-2">100%</div>
                <div className="text-gray-300">
                  {isPortuguese ? "Português Fluente" : "Fluent Portuguese"}
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-8">
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
                  {isPortuguese
                    ? feature.descriptionPortuguese
                    : feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Booking & Planning Section */}
      <section className="py-16 bg-gradient-to-br from-accent-50 via-white to-secondary-50">
        <div className="container-width">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-gray-900 mb-4"
            >
              {isPortuguese ? "Reserve com Antecedência" : "Book in Advance"}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              {isPortuguese
                ? "Planeie a sua experiência de Londres antes mesmo de chegar. Reserve com antecedência e tenha o seu motorista falante de português pronto para o receber no aeroporto."
                : "Plan your London experience before you even arrive. Book in advance and have your Portuguese-speaking driver ready to meet you at the airport."}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-accent-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-accent-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM5 19V8h14v11H5z" />
                  <path d="M7 10h5v5H7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {isPortuguese ? "Reservas Antecipadas" : "Advance Bookings"}
              </h3>
              <p className="text-gray-600 mb-4">
                {isPortuguese
                  ? "Reserve seus serviços de transporte e tours com semanas de antecedência. Garantimos disponibilidade e preços preferenciais."
                  : "Book your transport services and tours weeks in advance. We guarantee availability and preferential pricing."}
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-accent-500" />
                  <span>
                    {isPortuguese
                      ? "Disponibilidade garantida"
                      : "Guaranteed availability"}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-accent-500" />
                  <span>
                    {isPortuguese
                      ? "Preços preferenciais"
                      : "Preferential pricing"}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-accent-500" />
                  <span>
                    {isPortuguese
                      ? "Planejamento personalizado"
                      : "Personalized planning"}
                  </span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-secondary-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-secondary-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {isPortuguese ? "Recolha no Aeroporto" : "Airport Pickup"}
              </h3>
              <p className="text-gray-600 mb-4">
                {isPortuguese
                  ? "O seu motorista falante de português estará à sua espera no aeroporto com um sinal personalizado. Comece a sua experiência em Londres imediatamente."
                  : "Your Portuguese-speaking driver will be waiting at the airport with a personalized sign. Start your London experience immediately."}
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-secondary-500" />
                  <span>
                    {isPortuguese
                      ? "Monitoramento de voos"
                      : "Flight monitoring"}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-secondary-500" />
                  <span>
                    {isPortuguese ? "Sinal personalizado" : "Personalized sign"}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-secondary-500" />
                  <span>
                    {isPortuguese
                      ? "Assistência com bagagem"
                      : "Luggage assistance"}
                  </span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-primary-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-primary-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {isPortuguese ? "Planejamento Completo" : "Complete Planning"}
              </h3>
              <p className="text-gray-600 mb-4">
                {isPortuguese
                  ? "Planeamos todo o seu itinerário de Londres antes da sua chegada. Inclui tours, refeições, e experiências culturais portuguesas."
                  : "We plan your entire London itinerary before your arrival. Includes tours, dining, and Portuguese cultural experiences."}
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-primary-500" />
                  <span>
                    {isPortuguese
                      ? "Itinerário personalizado"
                      : "Customized itinerary"}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-primary-500" />
                  <span>
                    {isPortuguese
                      ? "Reservas de restaurantes"
                      : "Restaurant reservations"}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-primary-500" />
                  <span>
                    {isPortuguese
                      ? "Experiências culturais"
                      : "Cultural experiences"}
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>

          <div className="text-center mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-accent-50 to-secondary-50 rounded-2xl p-8 border border-accent-200"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {isPortuguese
                  ? "Pronto para Sua Aventura VIP em Londres?"
                  : "Ready for Your VIP London Adventure?"}
              </h3>
              <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                {isPortuguese
                  ? "Seu motorista pessoal estará no aeroporto com o seu nome. Sem stress, sem confusão, só conforto e experiências inesquecíveis!"
                  : "Your personal driver will be at the airport with your name. No stress, no confusion, just comfort and unforgettable experiences!"}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setShowSIABookingFlow(true)}
                  className="bg-gradient-to-r from-accent-600 to-secondary-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-accent-700 hover:to-secondary-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  {isPortuguese
                    ? "Reservar com Antecedência"
                    : "Book in Advance"}
                </button>
                <a
                  href="tel:+447777777777"
                  className="border-2 border-accent-600 text-accent-600 px-8 py-3 rounded-xl font-semibold hover:bg-accent-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  {isPortuguese
                    ? "Falar com Especialista"
                    : "Speak to Specialist"}
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Tiers Section */}
      <section
        id="services"
        className="py-24 bg-gradient-to-br from-white via-secondary-50/50 to-accent-50/50 relative overflow-hidden"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-secondary-200/30 via-accent-100/20 to-coral-100/20 rounded-full opacity-60 animate-pulse" />
          <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-tr from-action-200/30 via-secondary-100/20 to-accent-100/20 rounded-full opacity-50 animate-bounce" />
        </div>
        
        <div className="container-width relative">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <span className="inline-flex items-center px-8 py-4 rounded-full text-base font-bold bg-gradient-to-r from-secondary-100 via-premium-50 to-accent-100 border border-secondary-200 shadow-xl">
                <Crown className="w-5 h-5 mr-3 text-premium-600" />
                <span className="bg-gradient-to-r from-secondary-600 via-premium-600 to-accent-600 bg-clip-text text-transparent">
                  {isPortuguese
                    ? "Serviços Premium para Portugueses em Londres"
                    : "Premium Services for Portuguese in London"}
                </span>
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-6xl font-black text-gray-900 mb-8 leading-tight"
            >
              {isPortuguese
                ? "O Que Precisa em Londres?"
                : "What Do You Need in London?"}
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium"
            >
              {isPortuguese
                ? "Transporte seguro, guias especializados e experiências únicas em Londres - tudo com profissionais que falam o seu idioma e compreendem a sua cultura."
                : "Safe transport, expert guides, and unique London experiences - all with professionals who speak your language and understand your culture."}
            </motion.p>
            
            {/* Key Benefits Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-6 mt-12 max-w-4xl mx-auto"
            >
              <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md border border-gray-100">
                <CheckCircleIcon className="w-5 h-5 text-secondary-600" />
                <span className="font-semibold text-gray-800">
                  {isPortuguese ? "Comunicação em Português" : "Portuguese Communication"}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md border border-gray-100">
                <CheckCircleIcon className="w-5 h-5 text-secondary-600" />
                <span className="font-semibold text-gray-800">
                  {isPortuguese ? "Licenciados SIA" : "SIA Licensed"}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md border border-gray-100">
                <CheckCircleIcon className="w-5 h-5 text-secondary-600" />
                <span className="font-semibold text-gray-800">
                  {isPortuguese ? "Disponível 24/7" : "Available 24/7"}
                </span>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-8">
            {serviceTiers.map((tier, index) => (
              <TransportServiceCard
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
        <div className="container-width">
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
                  {isPortuguese
                    ? "Experiências Premium de Londres"
                    : "Premium London Experiences"}
                </span>
              </span>
            </motion.div>

            <h2 className="text-4xl font-black text-gray-900 mb-4">
              {isPortuguese
                ? "Quer Conhecer Londres Como um VIP?"
                : "Want to Experience London Like a VIP?"}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {isPortuguese
                ? "Acesso exclusivo às melhores atrações de Londres com seu guia pessoal falante de português. Pule filas, entre pelos fundos e tenha experiências que outros turistas nunca terão!"
                : "Exclusive access to London's top attractions with your personal Portuguese-speaking guide. Skip lines, enter through the back, and have experiences other tourists will never get!"}
            </p>
          </div>

          {/* London Tourism Experiences */}
          <div className="mb-16">
            <h3 className="text-3xl font-black text-gray-900 mb-8 text-center">
              {isPortuguese
                ? "Experiências Turísticas de Londres"
                : "London Tourism Experiences"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-8">
              {londonTourismExperiences.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-white to-secondary-50/30 rounded-lg sm:rounded-xl shadow-lg border border-secondary-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 flex flex-col min-h-[400px]"
                >
                  {/* Experience Image */}
                  {pkg.image && (
                    <div className="relative h-32 sm:h-40 lg:h-48 overflow-hidden flex-shrink-0">
                      <img
                        src={pkg.image}
                        alt={
                          isPortuguese
                            ? pkg.imageAltPortuguese || pkg.imageAlt || ""
                            : pkg.imageAlt || ""
                        }
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                      <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4">
                        <span
                          className={`inline-block px-2 sm:px-3 py-1 rounded-full text-xs font-bold text-white ${
                            pkg.category === "classic"
                              ? "bg-secondary-600/80"
                              : pkg.category === "royal"
                              ? "bg-premium-600/80"
                              : pkg.category === "modern"
                              ? "bg-accent-600/80"
                              : pkg.category === "shopping"
                              ? "bg-primary-600/80"
                              : "bg-secondary-600/80"
                          }`}
                        >
                          {pkg.category.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="p-3 sm:p-4 lg:p-6 flex flex-col flex-1">
                    <div className="mb-2 sm:mb-3">
                      <h3 className="text-sm sm:text-base lg:text-xl font-semibold text-gray-900 mb-1 sm:mb-2 leading-tight">
                        {isPortuguese ? pkg.namePortuguese : pkg.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="text-lg sm:text-xl lg:text-2xl font-bold text-secondary-600">
                          {isPortuguese ? "de" : "from"} £{pkg.price}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500">
                          {pkg.duration}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-3 sm:mb-4 leading-relaxed text-xs sm:text-sm lg:text-base flex-1">
                      {isPortuguese
                        ? pkg.descriptionPortuguese
                        : pkg.description}
                    </p>

                    {/* Highlights - Show fewer on mobile */}
                    {pkg.highlights && (
                      <div className="mb-3 sm:mb-4 lg:mb-6">
                        <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2 lg:mb-3">
                          {isPortuguese ? "Destaques:" : "Highlights:"}
                        </h4>
                        <ul className="space-y-1 sm:space-y-2">
                          {(isPortuguese
                            ? pkg.highlightsPortuguese
                            : pkg.highlights
                          )
                            .slice(0, 2)
                            .map((highlight, idx) => (
                              <li
                                key={idx}
                                className="flex items-start text-xs sm:text-sm text-gray-600"
                              >
                                <CheckCircleIcon className="w-3 h-3 sm:w-4 sm:h-4 text-secondary-500 mt-0.5 mr-1 sm:mr-2 flex-shrink-0" />
                                <span>{highlight}</span>
                              </li>
                            ))}
                        </ul>
                      </div>
                    )}

                    <button
                      onClick={() => handleBookService(pkg.id)}
                      className="w-full bg-secondary-600 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-md sm:rounded-lg font-semibold hover:bg-secondary-700 transition-colors transform hover:scale-105 duration-200 text-xs sm:text-sm lg:text-base mt-auto"
                    >
                      {isPortuguese ? "Reservar" : "Book Now"}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Multi-Day Packages */}
          <div className="mb-16">
            <h3 className="text-3xl font-black text-gray-900 mb-8 text-center">
              {isPortuguese
                ? "Pacotes de Múltiplos Dias em Londres"
                : "Multi-Day London Packages"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {multiDayPackages.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 flex flex-col h-full"
                >
                  <div className="p-6 flex flex-col flex-1">
                    <div className="text-center mb-4">
                      <div className="text-2xl font-bold text-premium-600 mb-1">
                        {typeof pkg.price === "number"
                          ? `${isPortuguese ? "a partir de" : "from"} £${
                              pkg.price
                            }`
                          : pkg.price}
                      </div>
                      <div className="text-sm text-gray-500 mb-3">
                        {pkg.duration}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {isPortuguese ? pkg.namePortuguese : pkg.name}
                      </h3>
                    </div>

                    <p className="text-gray-600 text-sm mb-6 leading-relaxed flex-1">
                      {isPortuguese
                        ? pkg.descriptionPortuguese
                        : pkg.description}
                    </p>

                    <button
                      onClick={() => handleBookService(pkg.id)}
                      className="w-full bg-premium-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-premium-700 transition-colors text-sm mt-auto"
                    >
                      {isPortuguese ? "Reservar" : "Book Package"}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Standard Services */}
          <div>
            <h3 className="text-3xl font-black text-gray-900 mb-8 text-center">
              {isPortuguese ? "Serviços Padrão" : "Standard Services"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-8">
              {standardPackages.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow flex flex-col h-full"
                >
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {isPortuguese ? pkg.namePortuguese : pkg.name}
                      </h3>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-premium-600">
                          {typeof pkg.price === "number"
                            ? `${isPortuguese ? "a partir de" : "from"} £${
                                pkg.price
                              }`
                            : pkg.price}
                        </div>
                        <div className="text-sm text-gray-500">
                          {pkg.duration}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6">
                      {isPortuguese
                        ? pkg.descriptionPortuguese
                        : pkg.description}
                    </p>

                    <button
                      onClick={() => handleBookService(pkg.id)}
                      className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors mt-auto"
                    >
                      {isPortuguese ? "Reservar Serviço" : "Book Service"}
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
      <TransportTestimonials />

      {/* Final CTA Section */}
      <section className="py-32 bg-gradient-to-br from-secondary-900 via-premium-900 to-action-900 text-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-secondary-400/30 via-accent-300/30 to-coral-300/30 rounded-full opacity-60 animate-pulse" />
          <div
            className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-tr from-action-400/30 via-secondary-300/30 to-accent-300/30 rounded-full opacity-50 animate-bounce"
            style={{ animationDuration: "6s" }}
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-br from-premium-400/20 via-accent-400/20 to-coral-400/20 rounded-full opacity-40 animate-ping" />
        </div>

        <div className="container-width relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <span className="inline-flex items-center px-8 py-4 rounded-full text-base font-bold bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl">
                <Crown className="w-5 h-5 mr-3 text-yellow-400" />
                <span className="text-white">
                  {isPortuguese
                    ? "Pronto para Descobrir Londres?"
                    : "Ready to Discover London?"}
                </span>
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-6xl font-black mb-8 leading-tight"
            >
              {isPortuguese
                ? "Sua Aventura em Londres Começa Aqui"
                : "Your London Adventure Starts Here"}
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              {isPortuguese
                ? "Fale connosco agora e reserve a sua experiência premium em Londres. Nossa equipa está disponível 24/7 para criar momentos inesquecíveis."
                : "Contact us now and book your premium London experience. Our team is available 24/7 to create unforgettable moments."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            >
              <a
                href="tel:+447777777777"
                className="group inline-flex items-center justify-center bg-gradient-to-r from-action-600 to-coral-600 hover:from-action-700 hover:to-coral-700 text-white px-10 py-5 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 min-w-[280px]"
              >
                <PhoneIcon className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
                {isPortuguese ? "Ligar Agora" : "Call Now"}
                <span className="ml-2 text-sm opacity-80">24/7</span>
              </a>
              <button
                onClick={() => setShowSIABookingFlow(true)}
                className="group border-2 border-white hover:bg-white hover:text-secondary-900 text-white px-10 py-5 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 min-w-[280px] flex items-center justify-center"
              >
                <Crown className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
                {isPortuguese ? "Reserva Online" : "Book Online"}
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
            
            {/* Final trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-8 text-center"
            >
              <div className="flex items-center gap-2 text-gray-300">
                <ShieldCheckIcon className="w-5 h-5 text-green-400" />
                <span className="font-semibold">
                  {isPortuguese ? "Licenciados SIA" : "SIA Licensed"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <ClockIcon className="w-5 h-5 text-blue-400" />
                <span className="font-semibold">
                  {isPortuguese ? "Disponível 24/7" : "Available 24/7"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <StarIcon className="w-5 h-5 text-yellow-400" />
                <span className="font-semibold">
                  {isPortuguese ? "Comunicação em Português" : "Portuguese Communication"}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Custom Tours Section */}
      <CustomToursSection onBookTour={handleBookService} showHeader={true} />

      {/* Standard Booking Form Modal */}
      {showBookingForm && (
        <TransportBookingForm
          isOpen={showBookingForm}
          onClose={() => {
            setShowBookingForm(false);
            setSelectedService(null);
          }}
          selectedService={selectedService}
          serviceTiers={serviceTiers}
          experiencePackages={experiencePackages}
        />
      )}

      {/* SIA Compliance Booking Flow */}
      {showSIABookingFlow && (
        <TransportBookingFlow
          isOpen={showSIABookingFlow}
          onClose={() => {
            setShowSIABookingFlow(false);
            setSelectedService(null);
          }}
          selectedService={
            serviceTiers.find((tier) => tier.id === selectedService) ||
            experiencePackages.find((pkg) => pkg.id === selectedService)
          }
          serviceTiers={serviceTiers}
          experiencePackages={experiencePackages}
        />
      )}

      {/* Service-Community Bridge Integration */}
      <ServiceCommunityBridge 
        triggerContext="transport_page"
        onIntegrationSelected={(integration) => {
          console.log('Integration selected:', integration)
          // Could open booking flow with integration
        }}
      />

      {/* Cross-Platform Navigation Widget */}
      <CrossPlatformNavigationWidget 
        currentPage="transport"
        position="bottom-right"
      />

      <Footer />
    </div>
  );
}
