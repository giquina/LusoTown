'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  UsersIcon, 
  MapPinIcon, 
  HeartIcon, 
  CalendarDaysIcon, 
  ArrowRightIcon,
  HomeIcon,
  BuildingStorefrontIcon,
  AcademicCapIcon,
  ChatBubbleLeftIcon,
  TruckIcon,
  ClockIcon,
  StarIcon,
  CheckCircleIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline'
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/react/24/solid'
import Image from 'next/image'

import Footer from '@/components/Footer'
import { useLanguage } from '@/context/LanguageContext'
import { getImageWithFallback } from '@/lib/profileImages'

// London Borough Data with Portuguese Community Statistics
const neighborhoodGroups = [
  {
    id: 'lambeth-stockwell',
    name: 'Lambeth / Stockwell',
    namePt: 'Lambeth / Stockwell',
    area: 'South London',
    areaPt: 'Sul de Londres',
    portugueseSpeakers: 9009,
    description: 'Historic heart of Portuguese London with authentic bakeries and cultural centers',
    descriptionPt: 'Coração histórico de Londres Portuguesa com padarias autênticas e centros culturais',
    displacement: 'Traditional hub facing gentrification pressure',
    displacementPt: 'Centro tradicional enfrentando pressão de gentrificação',
    activeGroups: 8,
    weeklyEvents: 12,
    transportLinks: ['Northern Line', 'Victoria Line', 'Bus 196, 322'],
    transportLinksPt: ['Linha Northern', 'Linha Victoria', 'Autocarro 196, 322'],
    highlights: [
      'Portuguese Cultural Centre',
      'Traditional bakeries',
      'Nossa Senhora church',
      'Community football teams'
    ],
    highlightsPt: [
      'Centro Cultural Português',
      'Padarias tradicionais',
      'Igreja Nossa Senhora',
      'Equipas de futebol comunitárias'
    ],
    recentEvents: [
      { name: 'Weekly Fado Night', namePt: 'Noite de Fado Semanal', attendees: 35 },
      { name: 'Portuguese Family Market', namePt: 'Mercado Familiar Português', attendees: 120 },
      { name: 'Youth Football Training', namePt: 'Treino Futebol Juvenil', attendees: 28 }
    ],
    icon: '🏛️',
    status: 'established',
    needsSupport: false
  },
  {
    id: 'vauxhall-nine-elms',
    name: 'Vauxhall / Nine Elms',
    namePt: 'Vauxhall / Nine Elms',
    area: 'Central South London',
    areaPt: 'Centro Sul de Londres',
    portugueseSpeakers: 4200,
    description: 'Growing Portuguese community in modern developments near cultural venues',
    descriptionPt: 'Comunidade portuguesa crescente em desenvolvimentos modernos perto de locais culturais',
    displacement: 'New settlement area for displaced families',
    displacementPt: 'Nova área de assentamento para famílias deslocadas',
    activeGroups: 5,
    weeklyEvents: 8,
    transportLinks: ['Victoria Line', 'Northern Line', 'Bus 77, 87'],
    transportLinksPt: ['Linha Victoria', 'Linha Northern', 'Autocarro 77, 87'],
    highlights: [
      'Modern community spaces',
      'Portuguese business network',
      'Community networking events',
      'Easy central London access'
    ],
    highlightsPt: [
      'Espaços comunitários modernos',
      'Rede empresarial portuguesa',
      'Eventos de networking comunitário',
      'Fácil acesso ao centro de Londres'
    ],
    recentEvents: [
      { name: 'Business Networking', namePt: 'Networking Empresarial', attendees: 45 },
      { name: 'Family Portuguese BBQ', namePt: 'Churrasco Familiar Português', attendees: 65 },
      { name: 'Language Exchange', namePt: 'Intercâmbio Linguístico', attendees: 22 }
    ],
    icon: '🏢',
    status: 'growing',
    needsSupport: false
  },
  {
    id: 'croydon',
    name: 'Croydon',
    namePt: 'Croydon',
    area: 'South London',
    areaPt: 'Sul de Londres',
    portugueseSpeakers: 3800,
    description: 'Portuguese families relocating here due to central London housing costs',
    descriptionPt: 'Famílias portuguesas relocalizando-se aqui devido aos custos habitacionais do centro de Londres',
    displacement: 'Primary displacement destination - needs community support',
    displacementPt: 'Destino principal de deslocamento - precisa apoio comunitário',
    activeGroups: 3,
    weeklyEvents: 5,
    transportLinks: ['Tram Network', 'Southern Rail', 'Bus 60, 109'],
    transportLinksPt: ['Rede de Elétrico', 'Southern Rail', 'Autocarro 60, 109'],
    highlights: [
      'Affordable family housing',
      'Portuguese school classes',
      'Community garden project',
      'Growing business network'
    ],
    highlightsPt: [
      'Habitação familiar acessível',
      'Aulas escola portuguesa',
      'Projeto jardim comunitário',
      'Rede empresarial crescente'
    ],
    recentEvents: [
      { name: 'Community Setup Meeting', namePt: 'Reunião Estabelecimento Comunitário', attendees: 18 },
      { name: 'Portuguese Language Exchange', namePt: 'Intercâmbio de Língua Portuguesa', attendees: 25 },
      { name: 'Professional Support Group', namePt: 'Grupo Apoio Profissional', attendees: 32 }
    ],
    icon: '🏘️',
    status: 'emerging',
    needsSupport: true
  },
  {
    id: 'norwood',
    name: 'Norwood',
    namePt: 'Norwood',
    area: 'South London',
    areaPt: 'Sul de Londres',
    portugueseSpeakers: 2900,
    description: 'New Portuguese settlement area with families seeking affordable housing',
    descriptionPt: 'Nova área de assentamento português com famílias procurando habitação acessível',
    displacement: 'Recent settlement area - building community from scratch',
    displacementPt: 'Área de assentamento recente - construindo comunidade do zero',
    activeGroups: 2,
    weeklyEvents: 3,
    transportLinks: ['Southern Rail', 'Bus 68, 196'],
    transportLinksPt: ['Southern Rail', 'Autocarro 68, 196'],
    highlights: [
      'Portuguese family meetups',
      'Private transport to events',
      'Community WhatsApp groups',
      'Potential cultural center'
    ],
    highlightsPt: [
      'Encontros familiares portugueses',
      'Transporte privado para eventos',
      'Grupos WhatsApp comunitários',
      'Potencial centro cultural'
    ],
    recentEvents: [
      { name: 'First Community Meeting', namePt: 'Primeira Reunião Comunitária', attendees: 15 },
      { name: 'Transport to Stockwell Event', namePt: 'Transporte para Evento Stockwell', attendees: 8 },
      { name: 'Portuguese Mothers Group', namePt: 'Grupo Mães Portuguesas', attendees: 12 }
    ],
    icon: '🌱',
    status: 'new',
    needsSupport: true
  },
  {
    id: 'bermondsey-surrey-quays',
    name: 'Bermondsey / Surrey Quays',
    namePt: 'Bermondsey / Surrey Quays',
    area: 'South East London',
    areaPt: 'Sudeste de Londres',
    portugueseSpeakers: 2400,
    description: 'Emerging Portuguese community near waterside developments',
    descriptionPt: 'Comunidade portuguesa emergente perto de desenvolvimentos ribeirinhos',
    displacement: 'Secondary displacement area with growing community',
    displacementPt: 'Área de deslocamento secundário com comunidade crescente',
    activeGroups: 4,
    weeklyEvents: 6,
    transportLinks: ['Jubilee Line', 'Overground', 'Bus 188, 381'],
    transportLinksPt: ['Linha Jubilee', 'Overground', 'Autocarro 188, 381'],
    highlights: [
      'Waterside community events',
      'Portuguese business startups',
      'Regular transport to Stockwell',
      'Family outdoor activities'
    ],
    highlightsPt: [
      'Eventos comunitários ribeirinhos',
      'Startups empresariais portuguesas',
      'Transporte regular para Stockwell',
      'Atividades familiares ao ar livre'
    ],
    recentEvents: [
      { name: 'Riverside Portuguese Picnic', namePt: 'Piquenique Português Ribeirinho', attendees: 28 },
      { name: 'Business Startup Workshop', namePt: 'Workshop Startup Empresarial', attendees: 15 },
      { name: 'Group Transport Planning', namePt: 'Planeamento Transporte Grupo', attendees: 20 }
    ],
    icon: '🚢',
    status: 'growing',
    needsSupport: false
  },
  {
    id: 'elephant-castle',
    name: 'Elephant & Castle',
    namePt: 'Elephant & Castle',
    area: 'Central South London',
    areaPt: 'Centro Sul de Londres',
    portugueseSpeakers: 3200,
    description: 'Diverse Portuguese-speaking community including Brazilian and African heritage',
    descriptionPt: 'Comunidade lusófona diversa incluindo herança brasileira e africana',
    displacement: 'Mixed displacement and choice destination',
    displacementPt: 'Destino misto de deslocamento e escolha',
    activeGroups: 6,
    weeklyEvents: 9,
    transportLinks: ['Northern Line', 'Bakerloo Line', 'Bus 12, 35'],
    transportLinksPt: ['Linha Northern', 'Linha Bakerloo', 'Autocarro 12, 35'],
    highlights: [
      'Multi-cultural Portuguese hub',
      'Brazilian football groups',
      'African-Portuguese cultural events',
      'Easy transport connections'
    ],
    highlightsPt: [
      'Centro português multicultural',
      'Grupos futebol brasileiro',
      'Eventos culturais afro-portugueses',
      'Conexões transporte fáceis'
    ],
    recentEvents: [
      { name: 'Multicultural Portuguese Festival', namePt: 'Festival Português Multicultural', attendees: 85 },
      { name: 'Brazilian Capoeira Class', namePt: 'Aula Capoeira Brasileira', attendees: 20 },
      { name: 'African-Portuguese Heritage Talk', namePt: 'Palestra Herança Afro-Portuguesa', attendees: 35 }
    ],
    icon: '🌍',
    status: 'established',
    needsSupport: false
  }
]

// Community Resources
const communityResources = [
  {
    category: 'Portuguese Businesses',
    categoryPt: 'Negócios Portugueses',
    icon: BuildingStorefrontIcon,
    items: [
      { name: 'Portuguese bakeries', namePt: 'Padarias portuguesas', count: 25 },
      { name: 'Portuguese restaurants', namePt: 'Restaurantes portugueses', count: 18 },
      { name: 'Portuguese services', namePt: 'Serviços portugueses', count: 42 },
      { name: 'Portuguese shops', namePt: 'Lojas portuguesas', count: 15 }
    ]
  },
  {
    category: 'Cultural Centers',
    categoryPt: 'Centros Culturais',
    icon: AcademicCapIcon,
    items: [
      { name: 'Community centers', namePt: 'Centros comunitários', count: 8 },
      { name: 'Portuguese schools', namePt: 'Escolas portuguesas', count: 12 },
      { name: 'Cultural associations', namePt: 'Associações culturais', count: 6 },
      { name: 'Churches & religious centers', namePt: 'Igrejas e centros religiosos', count: 9 }
    ]
  },
  {
    category: 'Transport Coordination',
    categoryPt: 'Coordenação Transporte',
    icon: TruckIcon,
    items: [
      { name: 'Group transport to events', namePt: 'Transporte grupo para eventos', count: '15/week' },
      { name: 'Private transport networks', namePt: 'Redes transporte privado', count: '6 active' },
      { name: 'Regular routes to Stockwell', namePt: 'Rotas regulares para Stockwell', count: 'Daily' },
      { name: 'Event carpooling groups', namePt: 'Grupos boleia para eventos', count: '12 groups' }
    ]
  },
  {
    category: 'Community Support',
    categoryPt: 'Apoio Comunitário',
    icon: HomeIcon,
    items: [
      { name: 'Portuguese professional networks', namePt: 'Redes profissionais portuguesas', count: 8 },
      { name: 'Community support groups', namePt: 'Grupos apoio comunitário', count: 15 },
      { name: 'Portuguese women groups', namePt: 'Grupos mulheres portuguesas', count: 12 },
      { name: 'Young professional activities', namePt: 'Atividades jovens profissionais', count: 20 }
    ]
  }
]

// Sample Transport Coordination
const transportRoutes = [
  {
    from: 'Croydon',
    fromPt: 'Croydon',
    to: 'Stockwell Cultural Events',
    toPt: 'Eventos Culturais Stockwell',
    schedule: 'Saturdays 6:00 PM',
    schedulePt: 'Sábados 18:00',
    cost: '£3 per person',
    costPt: '£3 por pessoa',
    organizer: 'Maria Santos',
    participants: 8,
    maxCapacity: 12
  },
  {
    from: 'Norwood',
    fromPt: 'Norwood',
    to: 'Vauxhall Community Center',
    toPt: 'Centro Comunitário Vauxhall',
    schedule: 'Sundays 2:00 PM',
    schedulePt: 'Domingos 14:00',
    cost: '£2.50 per person',
    costPt: '£2.50 por pessoa',
    organizer: 'João Silva',
    participants: 6,
    maxCapacity: 8
  },
  {
    from: 'Bermondsey',
    fromPt: 'Bermondsey',
    to: 'Central Portuguese Events',
    toPt: 'Eventos Portugueses Centrais',
    schedule: 'Fridays 7:00 PM',
    schedulePt: 'Sextas 19:00',
    cost: '£4 per person',
    costPt: '£4 por pessoa',
    organizer: 'Ana Costa',
    participants: 10,
    maxCapacity: 15
  }
]

export default function NeighborhoodGroups() {
  const { language, t } = useLanguage()
  const isPortuguese = language !== 'en'
  
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredGroups = neighborhoodGroups.filter(group => {
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'needs-support' && group.needsSupport) ||
                         (selectedFilter === 'established' && group.status === 'established') ||
                         (selectedFilter === 'growing' && group.status === 'growing') ||
                         (selectedFilter === 'new' && group.status === 'new')
    
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesFilter && matchesSearch
  })

  return (
    <main className="min-h-screen">
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-40 h-40 bg-primary-200 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary-200 rounded-full opacity-20 animate-pulse animation-delay-400"></div>
            <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-accent-200 rounded-full opacity-15 animate-pulse animation-delay-800"></div>
          </div>

          <div className="container-width relative z-10">
            <div className="max-w-6xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 text-primary-600 font-medium mb-6 border border-white/30">
                  <HomeIcon className="h-5 w-5" />
                  <span className="text-sm font-semibold">
                    {isPortuguese ? 'Comunidades de Bairro • Neighbourhood Communities' : 'Neighbourhood Communities • Comunidades de Bairro'}
                  </span>
                </div>

                <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
                  <span className="hidden sm:block">
                    {isPortuguese ? (
                      <>
                        Grupos de <span className="gradient-text">Bairro</span><br />Portugueses em Londres
                      </>
                    ) : (
                      <>
                        Portuguese <span className="gradient-text">Neighborhood</span><br />Groups in London
                      </>
                    )}
                  </span>
                  <span className="sm:hidden">
                    {isPortuguese ? (
                      <>
                        <span className="gradient-text">Bairros</span><br />Portugueses
                      </>
                    ) : (
                      <>
                        Portuguese<br /><span className="gradient-text">Neighborhoods</span>
                      </>
                    )}
                  </span>
                </h1>

                <p className="text-xl text-secondary-600 leading-relaxed mb-8 max-w-5xl mx-auto">
                  <span className="hidden sm:block">
                    {isPortuguese ? (
                      'Mantém conexões da tua comunidade portuguesa mesmo após mudanças devido à gentrificação. Encontra o teu grupo de bairro, coordena transporte para eventos e constrói redes de apoio local em toda Londres.'
                    ) : (
                      'Maintain Portuguese community connections even after displacement due to gentrification. Find your neighborhood group, coordinate transport to events, and build local support networks across London.'
                    )}
                  </span>
                  <span className="sm:hidden">
                    {isPortuguese ? (
                      'Mantém conexões portuguesas em toda Londres'
                    ) : (
                      'Maintain Portuguese connections across London'
                    )}
                  </span>
                </p>

                {/* Key Statistics */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/50">
                    <UsersIcon className="h-8 w-8 text-primary-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">26,000+</p>
                    <p className="text-sm text-secondary-600">
                      {isPortuguese ? 'Portugueses em Londres' : 'Portuguese in London'}
                    </p>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/50">
                    <MapPinIcon className="h-8 w-8 text-secondary-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">28</p>
                    <p className="text-sm text-secondary-600">
                      {isPortuguese ? 'Grupos de Bairro' : 'Neighborhood Groups'}
                    </p>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/50">
                    <TruckIcon className="h-8 w-8 text-accent-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">15</p>
                    <p className="text-sm text-secondary-600">
                      {isPortuguese ? 'Rotas Transporte/Semana' : 'Transport Routes/Week'}
                    </p>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/50">
                    <CalendarDaysIcon className="h-8 w-8 text-coral-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">43</p>
                    <p className="text-sm text-secondary-600">
                      {isPortuguese ? 'Eventos/Semana' : 'Events/Week'}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-8 bg-white border-b border-secondary-200">
          <div className="container-width">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                {/* Search Bar */}
                <div className="relative flex-1 max-w-md">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -transecondary-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder={isPortuguese ? 'Procurar bairros...' : 'Search neighborhoods...'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-secondary-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedFilter('all')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedFilter === 'all'
                        ? 'bg-primary-500 text-white'
                        : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
                    }`}
                  >
                    {isPortuguese ? 'Todos' : 'All'}
                  </button>
                  <button
                    onClick={() => setSelectedFilter('needs-support')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedFilter === 'needs-support'
                        ? 'bg-action-500 text-white'
                        : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
                    }`}
                  >
                    {isPortuguese ? 'Precisam Apoio' : 'Needs Support'}
                  </button>
                  <button
                    onClick={() => setSelectedFilter('established')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedFilter === 'established'
                        ? 'bg-secondary-500 text-white'
                        : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
                    }`}
                  >
                    {isPortuguese ? 'Estabelecidos' : 'Established'}
                  </button>
                  <button
                    onClick={() => setSelectedFilter('growing')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedFilter === 'growing'
                        ? 'bg-accent-500 text-white'
                        : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
                    }`}
                  >
                    {isPortuguese ? 'Crescendo' : 'Growing'}
                  </button>
                </div>

                {/* Create Group Button */}
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="bg-gradient-to-r from-secondary-500 to-primary-500 text-white px-6 py-3 rounded-xl hover:from-secondary-600 hover:to-primary-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl inline-flex items-center gap-2"
                >
                  <PlusIcon className="h-5 w-5" />
                  {isPortuguese ? 'Criar Grupo' : 'Create Group'}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Neighborhood Groups Directory */}
        <section className="py-16 bg-secondary-50">
          <div className="container-width">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {isPortuguese ? (
                    <>Grupos de <span className="gradient-text">Bairro Português</span></>
                  ) : (
                    <>Portuguese <span className="gradient-text">Neighborhood Groups</span></>
                  )}
                </h2>
                <p className="text-lg text-secondary-600 max-w-4xl mx-auto">
                  {isPortuguese ? (
                    'Encontra a tua comunidade local portuguesa em Londres. Cada bairro tem a sua própria personalidade e necessidades únicas.'
                  ) : (
                    'Find your local Portuguese community in London. Each neighborhood has its own personality and unique needs.'
                  )}
                </p>
              </motion.div>

              <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredGroups.map((group, index) => (
                  <motion.div
                    key={group.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index, duration: 0.6 }}
                    className="bg-white rounded-2xl shadow-lg border border-secondary-200 overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <div className="p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-xl flex items-center justify-center text-white text-2xl">
                            {group.icon}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">
                              {isPortuguese ? group.namePt : group.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {isPortuguese ? group.areaPt : group.area}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            group.status === 'established' ? 'bg-secondary-100 text-secondary-700' :
                            group.status === 'growing' ? 'bg-accent-100 text-accent-700' :
                            'bg-coral-100 text-coral-700'
                          }`}>
                            {group.status === 'established' ? (isPortuguese ? 'Estabelecido' : 'Established') :
                             group.status === 'growing' ? (isPortuguese ? 'Crescendo' : 'Growing') :
                             (isPortuguese ? 'Novo' : 'New')}
                          </span>
                          {group.needsSupport && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-action-100 text-action-700">
                              {isPortuguese ? 'Precisa Apoio' : 'Needs Support'}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <p className="text-lg font-bold text-primary-600">{group.portugueseSpeakers.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">
                            {isPortuguese ? 'Portugueses' : 'Portuguese'}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-secondary-600">{group.activeGroups}</p>
                          <p className="text-xs text-gray-500">
                            {isPortuguese ? 'Grupos Ativos' : 'Active Groups'}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-accent-600">{group.weeklyEvents}</p>
                          <p className="text-xs text-gray-500">
                            {isPortuguese ? 'Eventos/Semana' : 'Events/Week'}
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-secondary-600 text-sm mb-4 leading-relaxed">
                        {isPortuguese ? group.descriptionPt : group.description}
                      </p>

                      {/* Displacement Status */}
                      <div className="bg-secondary-50 rounded-lg p-3 mb-4">
                        <p className="text-xs text-secondary-600 font-medium mb-1">
                          {isPortuguese ? 'Estado da Comunidade:' : 'Community Status:'}
                        </p>
                        <p className="text-sm text-secondary-700">
                          {isPortuguese ? group.displacementPt : group.displacement}
                        </p>
                      </div>

                      {/* Highlights */}
                      <div className="mb-4">
                        <p className="text-sm font-medium text-secondary-700 mb-2">
                          {isPortuguese ? 'Destaques:' : 'Highlights:'}
                        </p>
                        <div className="grid grid-cols-2 gap-1">
                          {(isPortuguese ? group.highlightsPt : group.highlights).slice(0, 4).map((highlight, idx) => (
                            <div key={idx} className="flex items-center gap-1">
                              <CheckCircleIconSolid className="h-3 w-3 text-secondary-400 flex-shrink-0" />
                              <span className="text-xs text-secondary-600">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Recent Events */}
                      <div className="mb-4">
                        <p className="text-sm font-medium text-secondary-700 mb-2">
                          {isPortuguese ? 'Eventos Recentes:' : 'Recent Events:'}
                        </p>
                        <div className="space-y-1">
                          {group.recentEvents.slice(0, 2).map((event, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs">
                              <span className="text-secondary-600">
                                {isPortuguese ? event.namePt : event.name}
                              </span>
                              <span className="text-primary-600 font-medium">
                                {event.attendees} {isPortuguese ? 'pessoas' : 'people'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Transport Links */}
                      <div className="mb-6">
                        <p className="text-sm font-medium text-secondary-700 mb-2">
                          {isPortuguese ? 'Transportes:' : 'Transport:'}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {(isPortuguese ? group.transportLinksPt : group.transportLinks).map((transport, idx) => (
                            <span key={idx} className="inline-block bg-primary-50 text-primary-700 px-2 py-1 rounded text-xs font-medium">
                              {transport}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3">
                        <button className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 font-semibold text-sm shadow-lg hover:shadow-xl">
                          {isPortuguese ? 'Juntar ao Grupo' : 'Join Group'}
                        </button>
                        <button className="px-4 py-3 border-2 border-primary-200 text-primary-600 rounded-xl hover:bg-primary-50 hover:border-primary-300 transition-all duration-300 font-semibold text-sm">
                          {isPortuguese ? 'Ver Detalhes' : 'View Details'}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredGroups.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MagnifyingGlassIcon className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {isPortuguese ? 'Nenhum grupo encontrado' : 'No groups found'}
                  </h3>
                  <p className="text-secondary-600">
                    {isPortuguese ? 
                      'Tenta ajustar os filtros ou criar um novo grupo para a tua área.' :
                      'Try adjusting your filters or create a new group for your area.'
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Transport Coordination Section */}
        <section className="py-16 bg-white">
          <div className="container-width">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-6xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {isPortuguese ? (
                    <>Coordenação de <span className="gradient-text">Transporte</span></>
                  ) : (
                    <>Transport <span className="gradient-text">Coordination</span></>
                  )}
                </h2>
                <p className="text-lg text-secondary-600 max-w-4xl mx-auto">
                  {isPortuguese ? (
                    'Partilha transporte para eventos centrais portugueses. Economiza dinheiro e mantenha-te conectado com a comunidade mesmo vivendo longe dos centros tradicionais.'
                  ) : (
                    'Share transport to central Portuguese events. Save money and stay connected with the community even when living far from traditional centers.'
                  )}
                </p>
              </div>

              <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {transportRoutes.map((route, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index, duration: 0.6 }}
                    className="bg-gradient-to-br from-accent-50 to-white rounded-2xl p-6 border border-accent-200 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-accent-400 to-coral-400 rounded-full flex items-center justify-center">
                        <TruckIcon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">
                          {isPortuguese ? route.fromPt : route.from}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {isPortuguese ? 'para' : 'to'} {isPortuguese ? route.toPt : route.to}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2">
                        <ClockIcon className="h-4 w-4 text-accent-500" />
                        <span className="text-sm text-secondary-600">
                          {isPortuguese ? route.schedulePt : route.schedule}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">💰</span>
                        <span className="text-sm text-secondary-600">
                          {isPortuguese ? route.costPt : route.cost}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <UsersIcon className="h-4 w-4 text-accent-500" />
                        <span className="text-sm text-secondary-600">
                          {route.participants}/{route.maxCapacity} {isPortuguese ? 'lugares' : 'spots'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm">
                        <span className="text-gray-500">{isPortuguese ? 'Organizador:' : 'Organizer:'}</span>
                        <span className="font-medium text-secondary-700 ml-1">{route.organizer}</span>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${
                        route.participants < route.maxCapacity ? 'bg-green-400' : 'bg-red-400'
                      }`}></div>
                    </div>

                    <button className="w-full bg-gradient-to-r from-accent-500 to-coral-500 text-white py-3 rounded-xl hover:from-accent-600 hover:to-coral-600 transition-all duration-300 font-semibold text-sm shadow-lg hover:shadow-xl">
                      {route.participants < route.maxCapacity ? 
                        (isPortuguese ? 'Juntar à Viagem' : 'Join Trip') :
                        (isPortuguese ? 'Lista de Espera' : 'Join Waitlist')
                      }
                    </button>
                  </motion.div>
                ))}
              </div>

              <div className="text-center">
                <button className="bg-white border-2 border-accent-200 text-accent-600 px-8 py-4 rounded-xl hover:bg-accent-50 hover:border-accent-300 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl inline-flex items-center gap-2">
                  {isPortuguese ? 'Organizar Nova Rota' : 'Organize New Route'}
                  <PlusIcon className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Community Resources Section */}
        <section className="py-16 bg-gradient-to-br from-secondary-50 to-primary-50">
          <div className="container-width">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-7xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {isPortuguese ? (
                    <>Recursos <span className="gradient-text">Comunitários</span> por Área</>
                  ) : (
                    <>Community <span className="gradient-text">Resources</span> by Area</>
                  )}
                </h2>
                <p className="text-lg text-secondary-600 max-w-4xl mx-auto">
                  {isPortuguese ? (
                    'Encontra negócios portugueses, centros culturais e serviços de apoio em cada bairro de Londres.'
                  ) : (
                    'Find Portuguese businesses, cultural centers, and support services in each London neighborhood.'
                  )}
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {communityResources.map((resource, index) => {
                  const Icon = resource.icon
                  return (
                    <motion.div
                      key={resource.category}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * index, duration: 0.6 }}
                      className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                        {isPortuguese ? resource.categoryPt : resource.category}
                      </h3>
                      <div className="space-y-3">
                        {resource.items.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between">
                            <span className="text-sm text-secondary-600">
                              {isPortuguese ? item.namePt : item.name}
                            </span>
                            <span className="text-sm font-semibold text-primary-600">
                              {item.count}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Support Needed Section */}
        <section className="py-16 bg-white">
          <div className="container-width">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-6xl mx-auto"
            >
              <div className="bg-gradient-to-br from-action-50 to-coral-50 rounded-3xl p-8 md:p-12 border border-action-200">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {isPortuguese ? (
                      <>Comunidades que <span className="text-action-600">Precisam de Apoio</span></>
                    ) : (
                      <>Communities that <span className="text-action-600">Need Support</span></>
                    )}
                  </h2>
                  <p className="text-lg text-secondary-600 max-w-4xl mx-auto">
                    {isPortuguese ? (
                      'Algumas comunidades portuguesas em novas áreas precisam da nossa ajuda para estabelecer grupos locais fortes e manter conexões culturais.'
                    ) : (
                      'Some Portuguese communities in new areas need our help to establish strong local groups and maintain cultural connections.'
                    )}
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {neighborhoodGroups.filter(group => group.needsSupport).map((group, index) => (
                    <div key={group.id} className="bg-white rounded-xl p-6 shadow-lg border border-action-200">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-action-400 to-coral-400 rounded-full flex items-center justify-center text-white text-lg">
                          {group.icon}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">
                            {isPortuguese ? group.namePt : group.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {group.portugueseSpeakers.toLocaleString()} {isPortuguese ? 'portugueses' : 'Portuguese'}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-secondary-600 mb-4">
                        {isPortuguese ? group.displacementPt : group.displacement}
                      </p>
                      <div className="flex gap-2">
                        <button className="flex-1 bg-gradient-to-r from-action-500 to-coral-500 text-white py-2 rounded-lg hover:from-action-600 hover:to-coral-600 transition-all duration-300 font-semibold text-sm">
                          {isPortuguese ? 'Ajudar' : 'Help'}
                        </button>
                        <button className="px-3 py-2 border border-action-300 text-action-600 rounded-lg hover:bg-action-50 transition-all duration-300 text-sm">
                          {isPortuguese ? 'Saber Mais' : 'Learn More'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {isPortuguese ? 'Como Podes Ajudar' : 'How You Can Help'}
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="flex flex-col items-center gap-2">
                      <UsersIcon className="h-12 w-12 text-action-500" />
                      <h4 className="font-semibold text-gray-900">
                        {isPortuguese ? 'Voluntário Organizador' : 'Volunteer Organizer'}
                      </h4>
                      <p className="text-sm text-secondary-600 text-center">
                        {isPortuguese ? 
                          'Ajuda a organizar eventos locais na tua área' :
                          'Help organize local events in your area'
                        }
                      </p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <TruckIcon className="h-12 w-12 text-action-500" />
                      <h4 className="font-semibold text-gray-900">
                        {isPortuguese ? 'Coordenador Transporte' : 'Transport Coordinator'}
                      </h4>
                      <p className="text-sm text-secondary-600 text-center">
                        {isPortuguese ? 
                          'Organiza transporte privado para eventos centrais' :
                          'Organize private transport to central events'
                        }
                      </p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <HeartIcon className="h-12 w-12 text-action-500" />
                      <h4 className="font-semibold text-gray-900">
                        {isPortuguese ? 'Embaixador Cultural' : 'Cultural Ambassador'}
                      </h4>
                      <p className="text-sm text-secondary-600 text-center">
                        {isPortuguese ? 
                          'Partilha cultura portuguesa na tua comunidade local' :
                          'Share Portuguese culture in your local community'
                        }
                      </p>
                    </div>
                  </div>
                  <button className="bg-gradient-to-r from-action-600 to-coral-600 text-white px-8 py-4 rounded-xl hover:from-action-700 hover:to-coral-700 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl">
                    {isPortuguese ? 'Quero Ajudar' : 'I Want to Help'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-br from-coral-50 via-accent-50 to-primary-50">
          <div className="container-width">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-5xl mx-auto text-center"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/50">
                <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-6">
                  {isPortuguese ? (
                    <>Encontra o Teu <span className="gradient-text">Grupo de Bairro</span></>
                  ) : (
                    <>Find Your <span className="gradient-text">Neighborhood Group</span></>
                  )}
                </h2>
                <p className="text-xl text-secondary-600 mb-8 max-w-4xl mx-auto leading-relaxed">
                  {isPortuguese ? (
                    'Não deixes que a gentrificação quebre as tuas conexões portuguesas. Junta-te ao teu grupo de bairro local e mantém a comunidade unida em toda Londres.'
                  ) : (
                    'Don\'t let gentrification break your Portuguese connections. Join your local neighborhood group and keep the community united across London.'
                  )}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-10">
                  <a 
                    href="#neighborhood-groups" 
                    className="inline-flex items-center justify-center bg-gradient-to-r from-secondary-600 via-primary-600 to-accent-600 hover:from-secondary-700 hover:via-primary-700 hover:to-accent-700 text-white font-bold text-lg px-10 py-5 rounded-2xl shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:-transecondary-y-1 hover:scale-105"
                  >
                    {isPortuguese ? 'Encontrar Grupo' : 'Find Group'}
                    <ArrowRightIcon className="h-6 w-6 ml-3" />
                  </a>
                  <button 
                    onClick={() => setShowCreateForm(true)}
                    className="border-2 border-primary-300 text-primary-700 px-10 py-5 rounded-2xl font-bold hover:bg-primary-50 hover:border-primary-400 transition-all duration-300 inline-flex items-center gap-3 shadow-lg hover:shadow-xl"
                  >
                    {isPortuguese ? 'Criar Grupo' : 'Create Group'}
                    <PlusIcon className="h-5 w-5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                  <div className="flex flex-col items-center gap-2">
                    <CheckCircleIconSolid className="h-6 w-6 text-action-500" />
                    <span className="text-secondary-600 font-medium">
                      {isPortuguese ? 'Grátis para participar' : 'Free to join'}
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <CheckCircleIconSolid className="h-6 w-6 text-action-500" />
                    <span className="text-secondary-600 font-medium">
                      {isPortuguese ? 'Transporte privado' : 'Private transport'}
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <CheckCircleIconSolid className="h-6 w-6 text-action-500" />
                    <span className="text-secondary-600 font-medium">
                      {isPortuguese ? 'Apoio local' : 'Local support'}
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <CheckCircleIconSolid className="h-6 w-6 text-action-500" />
                    <span className="text-secondary-600 font-medium">
                      {isPortuguese ? 'Cultura portuguesa' : 'Portuguese culture'}
                    </span>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl border border-primary-200">
                  <p className="text-primary-700 font-semibold italic">
                    {isPortuguese ? (
                      '"A distância não quebra laços" - Distance doesn\'t break bonds when communities stay connected'
                    ) : (
                      '"A distância não quebra laços" - Distance doesn\'t break bonds when communities stay connected'
                    )}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Create Group Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                {isPortuguese ? 'Criar Novo Grupo de Bairro' : 'Create New Neighborhood Group'}
              </h3>
              <button
                onClick={() => setShowCreateForm(false)}
                className="p-2 hover:bg-secondary-100 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>
            
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  {isPortuguese ? 'Nome do Bairro' : 'Neighborhood Name'}
                </label>
                <input
                  type="text"
                  placeholder={isPortuguese ? 'ex: Clapham, Brixton, etc.' : 'e.g. Clapham, Brixton, etc.'}
                  className="w-full px-4 py-3 border border-secondary-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  {isPortuguese ? 'Descrição da Comunidade' : 'Community Description'}
                </label>
                <textarea
                  rows={4}
                  placeholder={isPortuguese ? 'Descreve a comunidade portuguesa na tua área...' : 'Describe the Portuguese community in your area...'}
                  className="w-full px-4 py-3 border border-secondary-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    {isPortuguese ? 'Local de Encontro' : 'Meeting Location'}
                  </label>
                  <input
                    type="text"
                    placeholder={isPortuguese ? 'Centro comunitário, café, etc.' : 'Community center, cafe, etc.'}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    {isPortuguese ? 'Frequência de Encontros' : 'Meeting Frequency'}
                  </label>
                  <select className="w-full px-4 py-3 border border-secondary-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                    <option>{isPortuguese ? 'Semanal' : 'Weekly'}</option>
                    <option>{isPortuguese ? 'Quinzenal' : 'Bi-weekly'}</option>
                    <option>{isPortuguese ? 'Mensal' : 'Monthly'}</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  {isPortuguese ? 'Necessidades de Transporte' : 'Transport Needs'}
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500" />
                    <span className="text-sm text-secondary-700">
                      {isPortuguese ? 'Organizar transporte para eventos em Stockwell' : 'Organize transport to Stockwell events'}
                    </span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500" />
                    <span className="text-sm text-secondary-700">
                      {isPortuguese ? 'Coordenar boleia para eventos culturais' : 'Coordinate carpools to cultural events'}
                    </span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500" />
                    <span className="text-sm text-secondary-700">
                      {isPortuguese ? 'Criar rede transporte familiar' : 'Create family transport network'}
                    </span>
                  </label>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
                >
                  {isPortuguese ? 'Criar Grupo' : 'Create Group'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-6 py-3 border-2 border-secondary-300 text-secondary-600 rounded-xl hover:bg-secondary-50 transition-all duration-300 font-semibold"
                >
                  {isPortuguese ? 'Cancelar' : 'Cancel'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      <Footer />
    </main>
  )
}