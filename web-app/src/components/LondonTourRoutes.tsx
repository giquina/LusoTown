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
  type: 'historical' | 'royal' | 'cultural' | 'modern' | 'entertainment'
}

interface TourRoute {
  id: string
  name: string
  namePortuguese: string
  description: string
  descriptionPortuguese: string
  duration: string
  price: number
  category: 'historical' | 'royal' | 'modern' | 'entertainment'
  highlights: string[]
  highlightsPortuguese: string[]
  stops: TourStop[]
  includes: string[]
  includesPortuguese: string[]
  image?: string
}

const tourRoutes: TourRoute[] = [
  {
    id: 'classic-london-route',
    name: 'Classic London Heritage Route',
    namePortuguese: 'Rota do Património Clássico de Londres',
    description: 'Journey through London\'s iconic landmarks and historic attractions with Portuguese-speaking guide',
    descriptionPortuguese: 'Jornada através dos marcos icónicos e atrações históricas de Londres com guia falante de português',
    duration: '4 hours',
    price: 280,
    category: 'historical',
    image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    highlights: [
      'Westminster Abbey and Houses of Parliament',
      'Tower of London and Crown Jewels',
      'St. Paul\'s Cathedral and City of London',
      'British Museum collections and artifacts'
    ],
    highlightsPortuguese: [
      'Abadia de Westminster e Casas do Parlamento',
      'Torre de Londres e Joias da Coroa',
      'Catedral de St. Paul e City de Londres',
      'Coleções e artefatos do Museu Britânico'
    ],
    stops: [
      {
        name: 'Westminster Abbey & Big Ben',
        namePortuguese: 'Abadia de Westminster e Big Ben',
        description: 'Historic abbey where British monarchs are crowned, with guided tour of the iconic clock tower',
        descriptionPortuguese: 'Abadia histórica onde os monarcas britânicos são coroados, com visita guiada à icónica torre do relógio',
        duration: '45 minutes',
        location: 'Westminster',
        type: 'historical'
      },
      {
        name: 'Tower of London & Crown Jewels',
        namePortuguese: 'Torre de Londres e Joias da Coroa',
        description: 'Medieval fortress housing the Crown Jewels and centuries of British royal history',
        descriptionPortuguese: 'Fortaleza medieval que abriga as Joias da Coroa e séculos de história real britânica',
        duration: '90 minutes',
        location: 'Tower Hill',
        type: 'historical'
      },
      {
        name: 'St. Paul\'s Cathedral',
        namePortuguese: 'Catedral de St. Paul',
        description: 'Sir Christopher Wren\'s masterpiece with panoramic views from the dome',
        descriptionPortuguese: 'Obra-prima de Sir Christopher Wren com vistas panorâmicas da cúpula',
        duration: '75 minutes',
        location: 'City of London',
        type: 'historical'
      },
      {
        name: 'British Museum Highlights',
        namePortuguese: 'Destaques do Museu Britânico',
        description: 'World\'s greatest collection of historical artifacts and cultural treasures',
        descriptionPortuguese: 'A maior coleção mundial de artefatos históricos e tesouros culturais',
        duration: '60 minutes',
        location: 'Bloomsbury',
        type: 'cultural'
      }
    ],
    includes: [
      'Professional Portuguese-speaking guide',
      'Luxury vehicle transport',
      'All attraction entry fees',
      'Historical guidebook',
      'Traditional afternoon tea'
    ],
    includesPortuguese: [
      'Guia profissional falante de português',
      'Transporte em veículo de luxo',
      'Todas as taxas de entrada em atrações',
      'Guia histórico',
      'Chá da tarde tradicional'
    ]
  },
  {
    id: 'royal-london-route',
    name: 'Royal London Experience Route',
    namePortuguese: 'Rota da Experiência Real de Londres',
    description: 'Explore London\'s royal heritage with visits to palaces and royal parks',
    descriptionPortuguese: 'Explore a herança real de Londres com visitas a palácios e parques reais',
    duration: '6 hours',
    price: 320,
    category: 'royal',
    image: 'https://images.unsplash.com/photo-1529655683826-3c8974dac6d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    highlights: [
      'Buckingham Palace State Rooms',
      'Kensington Palace and Diana Memorial',
      'Windsor Castle day trip option',
      'Hyde Park and Royal Gardens',
      'Horse Guards Parade ceremony'
    ],
    highlightsPortuguese: [
      'Salas de Estado do Palácio de Buckingham',
      'Palácio de Kensington e Memorial da Diana',
      'Opção de viagem de um dia ao Castelo de Windsor',
      'Hyde Park e Jardins Reais',
      'Cerimónia da Parada dos Horse Guards'
    ],
    stops: [
      {
        name: 'Buckingham Palace & Royal Mews',
        namePortuguese: 'Palácio de Buckingham e Royal Mews',
        description: 'Official residence of the British monarchy with State Rooms and royal carriages',
        descriptionPortuguese: 'Residência oficial da monarquia britânica com Salas de Estado e carruagens reais',
        duration: '90 minutes',
        location: 'St James\'s',
        type: 'royal'
      },
      {
        name: 'Kensington Palace',
        namePortuguese: 'Palácio de Kensington',
        description: 'Royal residence with exhibitions on Princess Diana and Queen Victoria',
        descriptionPortuguese: 'Residência real com exposições sobre a Princesa Diana e a Rainha Victoria',
        duration: '75 minutes',
        location: 'Kensington',
        type: 'royal'
      },
      {
        name: 'Hyde Park & Speakers\' Corner',
        namePortuguese: 'Hyde Park e Speakers\' Corner',
        description: 'Royal park with the famous free speech area and beautiful gardens',
        descriptionPortuguese: 'Parque real com a famosa área de liberdade de expressão e belos jardins',
        duration: '45 minutes',
        location: 'Hyde Park',
        type: 'royal'
      },
      {
        name: 'Horse Guards Parade',
        namePortuguese: 'Parada dos Horse Guards',
        description: 'Witness the Changing of the Horse Guard ceremony with traditional pageantry',
        descriptionPortuguese: 'Testemunhe a cerimónia da Troca da Guarda a Cavalo com espetáculo tradicional',
        duration: '30 minutes',
        location: 'Whitehall',
        type: 'royal'
      }
    ],
    includes: [
      'Royal heritage specialist guide',
      'Premium chauffeur service',
      'Palace entry tickets',
      'Royal afternoon tea',
      'Souvenir royal guidebook'
    ],
    includesPortuguese: [
      'Guia especialista em herança real',
      'Serviço de chauffeur premium',
      'Bilhetes de entrada nos palácios',
      'Chá da tarde real',
      'Guia real de recordação'
    ]
  },
  {
    id: 'modern-london-route',
    name: 'Modern London Discovery Route',
    namePortuguese: 'Rota de Descoberta da Londres Moderna',
    description: 'Explore contemporary London\'s architectural marvels and cultural innovations',
    descriptionPortuguese: 'Explore as maravilhas arquitetónicas e inovações culturais da Londres contemporânea',
    duration: '6 hours',
    price: 380,
    category: 'modern',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    highlights: [
      'The Shard and panoramic city views',
      'London Eye and Thames experience',
      'Tate Modern contemporary art',
      'Canary Wharf financial district',
      'Olympic Park and Queen Elizabeth Park'
    ],
    highlightsPortuguese: [
      'The Shard e vistas panorâmicas da cidade',
      'London Eye e experiência do Tâmisa',
      'Arte contemporânea da Tate Modern',
      'Distrito financeiro de Canary Wharf',
      'Parque Olímpico e Queen Elizabeth Park'
    ],
    stops: [
      {
        name: 'The Shard - View from the Top',
        namePortuguese: 'The Shard - Vista do Topo',
        description: 'Western Europe\'s tallest building with spectacular 360-degree views',
        descriptionPortuguese: 'O edifício mais alto da Europa Ocidental com vistas espetaculares de 360 graus',
        duration: '60 minutes',
        location: 'London Bridge',
        type: 'modern'
      },
      {
        name: 'London Eye & Thames Cruise',
        namePortuguese: 'London Eye e Cruzeiro no Tâmisa',
        description: 'Giant observation wheel and scenic river cruise through central London',
        descriptionPortuguese: 'Roda gigante de observação e cruzeiro cénico pelo rio através do centro de Londres',
        duration: '90 minutes',
        location: 'South Bank',
        type: 'modern'
      },
      {
        name: 'Tate Modern Art Gallery',
        namePortuguese: 'Galeria de Arte Tate Modern',
        description: 'World\'s leading contemporary art museum in a former power station',
        descriptionPortuguese: 'Principal museu de arte contemporânea do mundo numa antiga central elétrica',
        duration: '75 minutes',
        location: 'Bankside',
        type: 'cultural'
      },
      {
        name: 'Canary Wharf Financial District',
        namePortuguese: 'Distrito Financeiro de Canary Wharf',
        description: 'Modern skyscrapers and London\'s second financial center',
        descriptionPortuguese: 'Arranha-céus modernos e segundo centro financeiro de Londres',
        duration: '45 minutes',
        location: 'Canary Wharf',
        type: 'modern'
      }
    ],
    includes: [
      'Modern architecture specialist guide',
      'Elite transport service',
      'Attraction entry tickets',
      'Thames river cruise',
      'Sky bar experience'
    ],
    includesPortuguese: [
      'Guia especialista em arquitetura moderna',
      'Serviço de transporte de elite',
      'Bilhetes de entrada em atrações',
      'Cruzeiro no rio Tâmisa',
      'Experiência de sky bar'
    ]
  }
]

interface LondonTourRoutesProps {
  isPortuguese: boolean
  onBookTour: (tourId: string) => void
}

export default function LondonTourRoutes({ isPortuguese, onBookTour }: LondonTourRoutesProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'historical':
        return Crown
      case 'royal':
        return Crown
      case 'modern':
        return Building
      case 'entertainment':
        return StarIcon
      default:
        return Crown
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'historical':
        return 'secondary'
      case 'royal':
        return 'premium'
      case 'modern':
        return 'accent'
      case 'entertainment':
        return 'primary'
      default:
        return 'secondary'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'historical':
        return Crown
      case 'royal':
        return Crown
      case 'cultural':
        return StarIcon
      case 'modern':
        return Building
      case 'entertainment':
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
              {isPortuguese ? 'Rotas Detalhadas de Londres' : 'Detailed London Routes'}
            </span>
          </motion.div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            {isPortuguese ? 'Rotas de Turismo de Londres' : 'London Tourism Routes'}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            {isPortuguese 
              ? 'Rotas cuidadosamente desenhadas que combinam atrações icónicas, experiências autênticas e narrativas históricas profundas com transporte de segurança profissional e guias falantes de português'
              : 'Carefully designed routes combining iconic attractions, authentic experiences, and deep historical narratives with professional security transport and Portuguese-speaking guides'
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
                {/* Route Image */}
                {route.image && (
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={route.image} 
                      alt={`${route.name} - London tourism route`}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold text-white bg-${colorClass}-600/80`}>
                          <CategoryIcon className="w-4 h-4 mr-2" />
                          {route.category.toUpperCase()}
                        </span>
                        <span className="text-white font-bold text-lg">£{route.price}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Route Header */}
                <div className={`bg-gradient-to-r from-${colorClass}-50 to-${colorClass}-100/50 p-8`}>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {isPortuguese ? route.namePortuguese : route.name}
                      </h3>
                      <p className="text-gray-700 text-lg mb-4">
                        {isPortuguese ? route.descriptionPortuguese : route.description}
                      </p>
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <ClockIcon className="w-4 h-4" />
                          <span>{route.duration}</span>
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
                ? 'Todas as nossas rotas podem ser personalizadas para atender aos seus interesses específicos, preferências de atrações e necessidades de segurança.'
                : 'All our routes can be customized to meet your specific interests, attraction preferences, and security requirements.'
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