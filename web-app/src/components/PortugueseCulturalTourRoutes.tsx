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
    id: 'portuguese-historical-route',
    name: 'Portuguese Maritime Heritage Route',
    namePortuguese: 'Rota do Património Marítimo Português',
    description: 'Journey through London\'s Portuguese maritime history from Greenwich to the City',
    descriptionPortuguese: 'Jornada através da história marítima portuguesa de Londres desde Greenwich até à City',
    duration: '4 hours',
    price: 280,
    category: 'historical',
    highlights: [
      'Portuguese Embassy cultural briefing',
      'Maritime museum Portuguese collections',
      'Historic Portuguese quarter locations',
      'Portuguese business heritage sites'
    ],
    highlightsPortuguese: [
      'Briefing cultural da Embaixada Portuguesa',
      'Coleções portuguesas do museu marítimo',
      'Localizações históricas do bairro português',
      'Locais do património empresarial português'
    ],
    stops: [
      {
        name: 'Portuguese Embassy & Cultural Center',
        namePortuguese: 'Embaixada Portuguesa e Centro Cultural',
        description: 'Cultural briefing and historical context with embassy officials',
        descriptionPortuguese: 'Briefing cultural e contexto histórico com funcionários da embaixada',
        duration: '45 minutes',
        location: 'Belgravia',
        type: 'heritage'
      },
      {
        name: 'National Maritime Museum - Portuguese Collections',
        namePortuguese: 'Museu Marítimo Nacional - Coleções Portuguesas',
        description: 'Exclusive access to Portuguese maritime artifacts and discovery exhibitions',
        descriptionPortuguese: 'Acesso exclusivo a artefatos marítimos portugueses e exposições de descobrimentos',
        duration: '90 minutes',
        location: 'Greenwich',
        type: 'heritage'
      },
      {
        name: 'Tower of London - Portuguese Connections',
        namePortuguese: 'Torre de Londres - Conexões Portuguesas',
        description: 'Portuguese royal connections and maritime trading history',
        descriptionPortuguese: 'Conexões reais portuguesas e história do comércio marítimo',
        duration: '75 minutes',
        location: 'Tower Hill',
        type: 'heritage'
      },
      {
        name: 'City of London - Portuguese Trading Legacy',
        namePortuguese: 'City de Londres - Legado Comercial Português',
        description: 'Historical Portuguese trading houses and modern business presence',
        descriptionPortuguese: 'Casas comerciais históricas portuguesas e presença empresarial moderna',
        duration: '30 minutes',
        location: 'City of London',
        type: 'business'
      }
    ],
    includes: [
      'Portuguese cultural expert guide',
      'Embassy briefing session',
      'Museum entrance fees',
      'Cultural documentation package',
      'Portuguese coffee stop'
    ],
    includesPortuguese: [
      'Guia especialista em cultura portuguesa',
      'Sessão de briefing da embaixada',
      'Taxas de entrada em museus',
      'Pacote de documentação cultural',
      'Pausa para café português'
    ]
  },
  {
    id: 'authentic-community-route',
    name: 'Authentic Portuguese London Community Tour',
    namePortuguese: 'Tour Autêntico da Comunidade Portuguesa de Londres',
    description: 'Deep dive into London\'s Portuguese community heartlands',
    descriptionPortuguese: 'Mergulho profundo nos centros da comunidade portuguesa de Londres',
    duration: '6 hours',
    price: 320,
    category: 'authentic',
    highlights: [
      'Stockwell & Vauxhall Portuguese districts',
      'Traditional bakeries and restaurants',
      'Portuguese cultural centers',
      'Community gathering places',
      'Local Portuguese businesses'
    ],
    highlightsPortuguese: [
      'Distritos portugueses de Stockwell e Vauxhall',
      'Padarias e restaurantes tradicionais',
      'Centros culturais portugueses',
      'Locais de encontro comunitário',
      'Negócios locais portugueses'
    ],
    stops: [
      {
        name: 'Portuguese Cultural Center Stockwell',
        namePortuguese: 'Centro Cultural Português Stockwell',
        description: 'Heart of Portuguese community activities and cultural preservation',
        descriptionPortuguese: 'Coração das atividades da comunidade portuguesa e preservação cultural',
        duration: '60 minutes',
        location: 'Stockwell',
        type: 'cultural'
      },
      {
        name: 'Traditional Portuguese Bakery Experience',
        namePortuguese: 'Experiência de Padaria Portuguesa Tradicional',
        description: 'Authentic pastéis de nata tasting and traditional baking methods',
        descriptionPortuguese: 'Prova autêntica de pastéis de nata e métodos tradicionais de padaria',
        duration: '45 minutes',
        location: 'Vauxhall',
        type: 'culinary'
      },
      {
        name: 'Portuguese Social Club & Community Hub',
        namePortuguese: 'Clube Social Português e Centro Comunitário',
        description: 'Meet local Portuguese community leaders and learn about community initiatives',
        descriptionPortuguese: 'Conheça líderes da comunidade portuguesa local e aprenda sobre iniciativas comunitárias',
        duration: '75 minutes',
        location: 'Elephant & Castle',
        type: 'community'
      },
      {
        name: 'Portuguese Restaurant - Traditional Lunch',
        namePortuguese: 'Restaurante Português - Almoço Tradicional',
        description: 'Authentic Portuguese cuisine with family recipes and live Fado music',
        descriptionPortuguese: 'Cozinha portuguesa autêntica com receitas familiares e música de Fado ao vivo',
        duration: '90 minutes',
        location: 'Stockwell',
        type: 'culinary'
      },
      {
        name: 'Portuguese Business District Walk',
        namePortuguese: 'Caminhada pelo Distrito Empresarial Português',
        description: 'Explore Portuguese-owned businesses and entrepreneurship stories',
        descriptionPortuguese: 'Explore negócios de proprietários portugueses e histórias de empreendedorismo',
        duration: '45 minutes',
        location: 'South London',
        type: 'business'
      }
    ],
    includes: [
      'Full Portuguese lunch with wine',
      'Traditional pastries tasting',
      'Community center access',
      'Business networking opportunities',
      'Cultural activity participation'
    ],
    includesPortuguese: [
      'Almoço português completo com vinho',
      'Prova de doces tradicionais',
      'Acesso ao centro comunitário',
      'Oportunidades de networking empresarial',
      'Participação em atividade cultural'
    ]
  },
  {
    id: 'culinary-heritage-route',
    name: 'Portuguese Culinary Heritage Discovery',
    namePortuguese: 'Descoberta do Património Culinário Português',
    description: 'Culinary journey through authentic Portuguese flavors and traditions',
    descriptionPortuguese: 'Jornada culinária através de sabores e tradições portuguesas autênticas',
    duration: '6 hours',
    price: 380,
    category: 'culinary',
    highlights: [
      'Traditional Portuguese cooking demonstration',
      'Wine tasting with Portuguese sommelier',
      'Market visits for authentic ingredients',
      'Family-run restaurant experiences',
      'Portuguese coffee culture immersion'
    ],
    highlightsPortuguese: [
      'Demonstração de culinária portuguesa tradicional',
      'Prova de vinhos com sommelier português',
      'Visitas ao mercado para ingredientes autênticos',
      'Experiências em restaurantes familiares',
      'Imersão na cultura do café português'
    ],
    stops: [
      {
        name: 'Portuguese Market & Delicatessen',
        namePortuguese: 'Mercado e Delicatessen Português',
        description: 'Authentic ingredient sourcing and Portuguese product education',
        descriptionPortuguese: 'Obtenção de ingredientes autênticos e educação sobre produtos portugueses',
        duration: '60 minutes',
        location: 'Borough Market',
        type: 'culinary'
      },
      {
        name: 'Traditional Cooking Demonstration',
        namePortuguese: 'Demonstração de Cozinha Tradicional',
        description: 'Learn traditional Portuguese recipes from expert chefs',
        descriptionPortuguese: 'Aprenda receitas portuguesas tradicionais com chefs especialistas',
        duration: '90 minutes',
        location: 'Portuguese Cultural Center',
        type: 'culinary'
      },
      {
        name: 'Portuguese Wine & Port Tasting',
        namePortuguese: 'Prova de Vinhos Portugueses e Porto',
        description: 'Guided tasting of Portuguese wines with cultural context',
        descriptionPortuguese: 'Prova guiada de vinhos portugueses com contexto cultural',
        duration: '75 minutes',
        location: 'Speciality Wine Shop',
        type: 'culinary'
      },
      {
        name: 'Traditional Portuguese Dinner Experience',
        namePortuguese: 'Experiência de Jantar Português Tradicional',
        description: 'Multi-course traditional meal with live Fado performance',
        descriptionPortuguese: 'Refeição tradicional de múltiplos pratos com performance de Fado ao vivo',
        duration: '120 minutes',
        location: 'Family Restaurant',
        type: 'culinary'
      }
    ],
    includes: [
      'Traditional Portuguese cooking class',
      'Wine and port tastings',
      'Traditional dinner with Fado',
      'Recipe book in Portuguese/English',
      'Portuguese specialty products to take home'
    ],
    includesPortuguese: [
      'Aula de cozinha portuguesa tradicional',
      'Provas de vinho e porto',
      'Jantar tradicional com Fado',
      'Livro de receitas em português/inglês',
      'Produtos especializados portugueses para levar'
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
              <MapPinIcon className="w-4 h-4 mr-2" />
              {isPortuguese ? 'Rotas Culturais Detalhadas' : 'Detailed Cultural Routes'}
            </span>
          </motion.div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            {isPortuguese ? 'Rotas de Turismo Cultural Português' : 'Portuguese Cultural Tourism Routes'}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            {isPortuguese 
              ? 'Rotas cuidadosamente desenhadas que combinam locais históricos, experiências autênticas e narrativas culturais profundas com transporte de segurança profissional'
              : 'Carefully designed routes combining historical sites, authentic experiences, and deep cultural narratives with professional security transport'
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
                <div className={`bg-gradient-to-r from-${colorClass}-50 to-${colorClass}-100/50 p-8`}>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-12 h-12 bg-${colorClass}-500 rounded-xl flex items-center justify-center`}>
                          <CategoryIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <span className={`text-xs font-medium text-${colorClass}-600 uppercase tracking-wide`}>
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
                          <span className="font-semibold text-lg text-gray-900">£{route.price}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center lg:text-right">
                      <button
                        onClick={() => onBookTour(route.id)}
                        className={`bg-${colorClass}-600 hover:bg-${colorClass}-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg`}
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
                          <CheckCircleIcon className={`w-5 h-5 text-${colorClass}-500 mt-0.5 flex-shrink-0`} />
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
                              <div className={`w-10 h-10 bg-${colorClass}-100 rounded-lg flex items-center justify-center`}>
                                <TypeIcon className={`w-5 h-5 text-${colorClass}-600`} />
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