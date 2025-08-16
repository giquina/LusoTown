'use client'

import { motion } from 'framer-motion'
import { MapPinIcon, ClockIcon, StarIcon, CheckCircleIcon, CameraIcon } from '@heroicons/react/24/outline'
import { Crown, Utensils, Building, Users } from 'lucide-react'

interface TourStop {
  name: string
  namePortuguese: string
  description: string
  descriptionPortuguese: string
  duration: string
  location: string
  type: 'heritage' | 'culinary' | 'cultural' | 'business' | 'community'
}

interface TourRoute {
  id: string
  name: string
  namePortuguese: string
  description: string
  descriptionPortuguese: string
  duration: string
  price: number
  category: 'historical' | 'authentic' | 'culinary' | 'business'
  highlights: string[]
  highlightsPortuguese: string[]
  stops: TourStop[]
  includes: string[]
  includesPortuguese: string[]
}

const tourRoutes: TourRoute[] = [
  {
    id: 'london-historical-route',
    name: 'London Historical Route with Portuguese Guide',
    namePortuguese: 'Rota Histórica de Londres com Guia Português',
    description: 'Journey through London\'s historic landmarks from Greenwich to Westminster with Portuguese-speaking guide',
    descriptionPortuguese: 'Jornada através dos marcos históricos de Londres de Greenwich a Westminster com guia falante de português',
    duration: '4 hours',
    price: 280,
    category: 'historical',
    highlights: [
      'Tower of London and Crown Jewels tour',
      'National Maritime Museum Greenwich',
      'Westminster Abbey and Big Ben',
      'City of London historic financial district'
    ],
    highlightsPortuguese: [
      'Tour da Torre de Londres e Jóias da Coroa',
      'Museu Marítimo Nacional Greenwich',
      'Westminster Abbey e Big Ben',
      'Distrito financeiro histórico da City de Londres'
    ],
    stops: [
      {
        name: 'Westminster Abbey & Big Ben',
        namePortuguese: 'Westminster Abbey e Big Ben',
        description: 'Historic royal church and iconic clock tower with Portuguese commentary',
        descriptionPortuguese: 'Igreja real histórica e torre de relógio icônica com comentário português',
        duration: '45 minutes',
        location: 'Westminster',
        type: 'heritage'
      },
      {
        name: 'National Maritime Museum - British Naval History',
        namePortuguese: 'Museu Marítimo Nacional - História Naval Britânica',
        description: 'British maritime history and naval artifacts with Portuguese-speaking guide',
        descriptionPortuguese: 'História marítima britânica e artefatos navais com guia falante de português',
        duration: '90 minutes',
        location: 'Greenwich',
        type: 'heritage'
      },
      {
        name: 'Tower of London - Crown Jewels',
        namePortuguese: 'Torre de Londres - Jóias da Coroa',
        description: 'Historic fortress, Crown Jewels, and Beefeater tales with Portuguese guide',
        descriptionPortuguese: 'Fortaleza histórica, Jóias da Coroa e histórias dos Beefeaters com guia português',
        duration: '75 minutes',
        location: 'Tower Hill',
        type: 'heritage'
      },
      {
        name: 'City of London - Financial District',
        namePortuguese: 'City de Londres - Distrito Financeiro',
        description: 'Historic financial district, Bank of England, and modern skyscrapers',
        descriptionPortuguese: 'Distrito financeiro histórico, Banco de Inglaterra e arranha-céus modernos',
        duration: '30 minutes',
        location: 'City of London',
        type: 'business'
      }
    ],
    includes: [
      'Portuguese-speaking London expert guide',
      'Westminster Abbey guided tour',
      'Museum entrance fees',
      'London historical documentation',
      'Traditional British afternoon tea'
    ],
    includesPortuguese: [
      'Guia especialista de Londres falante de português',
      'Tour guiado da Westminster Abbey',
      'Taxas de entrada em museus',
      'Documentação histórica de Londres',
      'Chá da tarde britânico tradicional'
    ]
  },
  {
    id: 'authentic-london-route',
    name: 'Authentic London Experience Tour',
    namePortuguese: 'Tour de Experiência Autêntica de Londres',
    description: 'Deep dive into London\'s authentic local neighborhoods and cultural districts',
    descriptionPortuguese: 'Mergulho profundo nos bairros locais autênticos e distritos culturais de Londres',
    duration: '6 hours',
    price: 320,
    category: 'authentic',
    highlights: [
      'Camden Market & Covent Garden districts',
      'Traditional British pubs and tea houses',
      'London cultural venues and theaters',
      'Local markets and gathering places',
      'Authentic London businesses and craftsmen'
    ],
    highlightsPortuguese: [
      'Distritos do Camden Market e Covent Garden',
      'Pubs britânicos tradicionais e casas de chá',
      'Locais culturais e teatros de Londres',
      'Mercados locais e locais de encontro',
      'Negócios e artesãos autênticos de Londres'
    ],
    stops: [
      {
        name: 'Camden Market Cultural District',
        namePortuguese: 'Distrito Cultural Camden Market',
        description: 'Heart of London\'s alternative culture and vibrant market scene',
        descriptionPortuguese: 'Coração da cultura alternativa de Londres e cena vibrante do mercado',
        duration: '60 minutes',
        location: 'Camden',
        type: 'cultural'
      },
      {
        name: 'Traditional British Pub Experience',
        namePortuguese: 'Experiência de Pub Britânico Tradicional',
        description: 'Authentic British pub culture with fish and chips and local ales',
        descriptionPortuguese: 'Cultura autêntica de pub britânico com fish and chips e cervejas locais',
        duration: '45 minutes',
        location: 'Covent Garden',
        type: 'culinary'
      },
      {
        name: 'West End Theatre District',
        namePortuguese: 'Distrito de Teatros West End',
        description: 'Explore London\'s famous theatre district and learn about British theatrical heritage',
        descriptionPortuguese: 'Explore o famoso distrito teatral de Londres e aprenda sobre o patrimônio teatral britânico',
        duration: '75 minutes',
        location: 'West End',
        type: 'community'
      },
      {
        name: 'Traditional British Restaurant - Sunday Roast',
        namePortuguese: 'Restaurante Britânico Tradicional - Sunday Roast',
        description: 'Traditional British Sunday roast with Yorkshire pudding and local atmosphere',
        descriptionPortuguese: 'Sunday roast britânico tradicional com Yorkshire pudding e atmosfera local',
        duration: '90 minutes',
        location: 'Fitzrovia',
        type: 'culinary'
      },
      {
        name: 'London Business District Walk',
        namePortuguese: 'Caminhada pelo Distrito Empresarial de Londres',
        description: 'Explore traditional London businesses and entrepreneurship stories',
        descriptionPortuguese: 'Explore negócios tradicionais de Londres e histórias de empreendedorismo',
        duration: '45 minutes',
        location: 'Shoreditch',
        type: 'business'
      }
    ],
    includes: [
      'Full British Sunday roast with beer',
      'Traditional British pub experience',
      'Theatre district guided tour',
      'Local business networking opportunities',
      'Cultural venue access and activities'
    ],
    includesPortuguese: [
      'Sunday roast britânico completo com cerveja',
      'Experiência de pub britânico tradicional',
      'Tour guiado do distrito teatral',
      'Oportunidades de networking empresarial local',
      'Acesso a locais culturais e atividades'
    ]
  },
  {
    id: 'london-culinary-route',
    name: 'London Culinary Heritage Discovery',
    namePortuguese: 'Descoberta do Património Culinário de Londres',
    description: 'Culinary journey through authentic British flavors and London food traditions',
    descriptionPortuguese: 'Jornada culinária através de sabores britânicos autênticos e tradições gastronómicas de Londres',
    duration: '6 hours',
    price: 380,
    category: 'culinary',
    highlights: [
      'Traditional British cooking demonstration',
      'British wine and whisky tasting with sommelier',
      'Borough Market visits for British ingredients',
      'Historic family-run British restaurant experiences',
      'British tea culture immersion'
    ],
    highlightsPortuguese: [
      'Demonstração de culinária britânica tradicional',
      'Prova de vinhos britânicos e whisky com sommelier',
      'Visitas ao Borough Market para ingredientes britânicos',
      'Experiências em restaurantes britânicos familiares históricos',
      'Imersão na cultura do chá britânico'
    ],
    stops: [
      {
        name: 'Borough Market & British Delicatessen',
        namePortuguese: 'Borough Market e Delicatessen Britânico',
        description: 'Authentic British ingredient sourcing and local product education',
        descriptionPortuguese: 'Obtenção de ingredientes britânicos autênticos e educação sobre produtos locais',
        duration: '60 minutes',
        location: 'Borough Market',
        type: 'culinary'
      },
      {
        name: 'Traditional British Cooking Demonstration',
        namePortuguese: 'Demonstração de Cozinha Britânica Tradicional',
        description: 'Learn traditional British recipes from expert London chefs',
        descriptionPortuguese: 'Aprenda receitas britânicas tradicionais com chefs especialistas de Londres',
        duration: '90 minutes',
        location: 'Culinary School London',
        type: 'culinary'
      },
      {
        name: 'British Wine & Whisky Tasting',
        namePortuguese: 'Prova de Vinhos Britânicos e Whisky',
        description: 'Guided tasting of British wines and whiskies with historical context',
        descriptionPortuguese: 'Prova guiada de vinhos britânicos e whiskies com contexto histórico',
        duration: '75 minutes',
        location: 'Historic Wine Bar',
        type: 'culinary'
      },
      {
        name: 'Traditional British Dinner Experience',
        namePortuguese: 'Experiência de Jantar Britânico Tradicional',
        description: 'Multi-course traditional British meal with live folk music performance',
        descriptionPortuguese: 'Refeição britânica tradicional de múltiplos pratos com performance de música folk ao vivo',
        duration: '120 minutes',
        location: 'Historic British Restaurant',
        type: 'culinary'
      }
    ],
    includes: [
      'Traditional British cooking class',
      'Wine and whisky tastings',
      'Traditional dinner with folk music',
      'British recipe book in Portuguese/English',
      'British specialty products to take home'
    ],
    includesPortuguese: [
      'Aula de cozinha britânica tradicional',
      'Provas de vinho e whisky',
      'Jantar tradicional com música folk',
      'Livro de receitas britânicas em português/inglês',
      'Produtos especializados britânicos para levar'
    ]
  }
]

interface PortugueseCulturalTourRoutesProps {
  isPortuguese: boolean
  onBookTour: (tourId: string) => void
}

export default function PortugueseCulturalTourRoutes({ isPortuguese, onBookTour }: PortugueseCulturalTourRoutesProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'historical':
        return Crown
      case 'authentic':
        return Users
      case 'culinary':
        return Utensils
      case 'business':
        return Building
      default:
        return Crown
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'historical':
        return 'secondary'
      case 'authentic':
        return 'premium'
      case 'culinary':
        return 'accent'
      case 'business':
        return 'primary'
      default:
        return 'secondary'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'heritage':
        return Crown
      case 'culinary':
        return Utensils
      case 'cultural':
        return StarIcon
      case 'business':
        return Building
      case 'community':
        return Users
      default:
        return MapPinIcon
    }
  }

  return (
    <section className="py-16 bg-gradient-to-br from-white via-secondary-50/20 to-premium-50/20">
      <div className="container-width">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-secondary-100 via-premium-50 to-accent-100 border border-secondary-200">
              <MapPinIcon className="w-4 h-4 mr-2" />
              {isPortuguese ? 'Rotas Turísticas Detalhadas de Londres' : 'Detailed London Tourism Routes'}
            </span>
          </motion.div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            {isPortuguese ? 'Rotas Turísticas de Londres com Guias Portugueses' : 'London Tourism Routes with Portuguese Guides'}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            {isPortuguese 
              ? 'Rotas cuidadosamente desenhadas que combinam as principais atrações de Londres, experiências personalizadas e guias especializados falantes de português com transporte seguro'
              : 'Carefully designed routes combining London\'s top attractions, personalized experiences, and specialist Portuguese-speaking guides with secure transport'
            }
          </p>
        </div>

        <div className="space-y-16">
          {tourRoutes.map((route, routeIndex) => {
            const CategoryIcon = getCategoryIcon(route.category)
            const colorClass = getCategoryColor(route.category)
            
            return (
              <motion.div
                key={route.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: routeIndex * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
              >
                {/* Route Header */}
                <div className={`bg-gradient-to-r ${colorClass === 'secondary' ? 'from-secondary-50 to-secondary-100/50' : colorClass === 'premium' ? 'from-premium-50 to-premium-100/50' : colorClass === 'accent' ? 'from-accent-50 to-accent-100/50' : 'from-primary-50 to-primary-100/50'} p-8`}>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-12 h-12 ${colorClass === 'secondary' ? 'bg-secondary-500' : colorClass === 'premium' ? 'bg-premium-500' : colorClass === 'accent' ? 'bg-accent-500' : 'bg-primary-500'} rounded-xl flex items-center justify-center`}>
                          <CategoryIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <span className={`text-xs font-medium ${colorClass === 'secondary' ? 'text-secondary-600' : colorClass === 'premium' ? 'text-premium-600' : colorClass === 'accent' ? 'text-accent-600' : 'text-primary-600'} uppercase tracking-wide`}>
                            {route.category}
                          </span>
                          <h3 className="text-2xl font-bold text-gray-900">
                            {isPortuguese ? route.namePortuguese : route.name}
                          </h3>
                        </div>
                      </div>
                      <p className="text-gray-700 text-lg mb-4">
                        {isPortuguese ? route.descriptionPortuguese : route.description}
                      </p>
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <ClockIcon className="w-4 h-4" />
                          <span>{route.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-semibold text-lg text-gray-900">{isPortuguese ? 'a partir de' : 'from'} £{route.price}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center lg:text-right">
                      <button
                        onClick={() => onBookTour(route.id)}
                        className={`${colorClass === 'secondary' ? 'bg-secondary-600 hover:bg-secondary-700' : colorClass === 'premium' ? 'bg-premium-600 hover:bg-premium-700' : colorClass === 'accent' ? 'bg-accent-600 hover:bg-accent-700' : 'bg-primary-600 hover:bg-primary-700'} text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg`}
                      >
                        {isPortuguese ? 'Reservar Esta Rota' : 'Book This Route'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Route Content */}
                <div className="p-8">
                  {/* Highlights */}
                  <div className="mb-8">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">
                      {isPortuguese ? 'Destaques da Experiência' : 'Experience Highlights'}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {(isPortuguese ? route.highlightsPortuguese : route.highlights).map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircleIcon className={`w-5 h-5 ${colorClass === 'secondary' ? 'text-secondary-500' : colorClass === 'premium' ? 'text-premium-500' : colorClass === 'accent' ? 'text-accent-500' : 'text-primary-500'} mt-0.5 flex-shrink-0`} />
                          <span className="text-gray-700">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tour Stops */}
                  <div className="mb-8">
                    <h4 className="text-lg font-bold text-gray-900 mb-6">
                      {isPortuguese ? 'Paragens da Rota' : 'Route Stops'}
                    </h4>
                    <div className="space-y-4">
                      {route.stops.map((stop, stopIndex) => {
                        const TypeIcon = getTypeIcon(stop.type)
                        return (
                          <div key={stopIndex} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                            <div className="flex-shrink-0">
                              <div className={`w-10 h-10 ${colorClass === 'secondary' ? 'bg-secondary-100' : colorClass === 'premium' ? 'bg-premium-100' : colorClass === 'accent' ? 'bg-accent-100' : 'bg-primary-100'} rounded-lg flex items-center justify-center`}>
                                <TypeIcon className={`w-5 h-5 ${colorClass === 'secondary' ? 'text-secondary-600' : colorClass === 'premium' ? 'text-premium-600' : colorClass === 'accent' ? 'text-accent-600' : 'text-primary-600'}`} />
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                                <h5 className="font-semibold text-gray-900">
                                  {isPortuguese ? stop.namePortuguese : stop.name}
                                </h5>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                  <span className="flex items-center gap-1">
                                    <ClockIcon className="w-4 h-4" />
                                    {stop.duration}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <MapPinIcon className="w-4 h-4" />
                                    {stop.location}
                                  </span>
                                </div>
                              </div>
                              <p className="text-gray-600 text-sm">
                                {isPortuguese ? stop.descriptionPortuguese : stop.description}
                              </p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* What's Included */}
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-4">
                      {isPortuguese ? 'O Que Está Incluído' : 'What\'s Included'}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {(isPortuguese ? route.includesPortuguese : route.includes).map((include, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircleIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{include}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-secondary-50 via-premium-50 to-accent-50 rounded-2xl p-8 border border-secondary-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {isPortuguese ? 'Experiência Personalizada' : 'Custom Experience'}
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              {isPortuguese 
                ? 'Todas as nossas rotas podem ser personalizadas para atender aos seus interesses específicos, preferências culturais e necessidades de segurança.'
                : 'All our routes can be customized to meet your specific interests, cultural preferences, and security requirements.'
              }
            </p>
            <button
              onClick={() => onBookTour('custom-route')}
              className="bg-gradient-to-r from-secondary-600 via-premium-600 to-accent-600 hover:from-secondary-700 hover:via-premium-700 hover:to-accent-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              {isPortuguese ? 'Criar Experiência Personalizada' : 'Create Custom Experience'}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}