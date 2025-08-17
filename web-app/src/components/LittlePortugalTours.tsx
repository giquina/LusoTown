'use client'

import { motion } from 'framer-motion'
import { MapPinIcon, ClockIcon, CameraIcon, HeartIcon, UserGroupIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { Coffee, Camera, Music, ShoppingBag, Utensils, Heart } from 'lucide-react'

interface LittlePortugalStop {
  name: string
  namePortuguese: string
  description: string
  descriptionPortuguese: string
  address: string
  duration: string
  type: 'restaurant' | 'bakery' | 'cultural' | 'community' | 'shopping' | 'heritage'
  authenticityScore: number
  priceRange: '£' | '££' | '£££'
  familyOwned: boolean
  establishedYear?: number
}

interface LittlePortugalTour {
  id: string
  name: string
  namePortuguese: string
  description: string
  descriptionPortuguese: string
  duration: string
  price: number
  area: 'Vauxhall-Stockwell' | 'Golborne Road' | 'East London'
  groupSize: string
  walkingDistance: string
  highlights: string[]
  highlightsPortuguese: string[]
  stops: LittlePortugalStop[]
  culturalContext: string
  culturalContextPortuguese: string
  includes: string[]
  includesPortuguese: string[]
}

const littlePortugalTours: LittlePortugalTour[] = [
  {
    id: 'vauxhall-stockwell-heritage',
    name: 'Vauxhall-Stockwell "Little Portugal" Heritage Walk',
    namePortuguese: 'Caminhada do Património "Pequena Portugal" Vauxhall-Stockwell',
    description: 'Explore the heart of London\'s Portuguese community through authentic family-run businesses, traditional pastéis de nata shops, and cultural landmarks that tell the story of 60+ years of Portuguese settlement.',
    descriptionPortuguese: 'Explore o coração da comunidade portuguesa de Londres através de negócios familiares autênticos, padarias tradicionais de pastéis de nata, e marcos culturais que contam a história de mais de 60 anos de estabelecimento português.',
    duration: '3.5 hours',
    price: 95,
    area: 'Vauxhall-Stockwell',
    groupSize: 'Máximo 12 pessoas',
    walkingDistance: '2.5 km gentle walk',
    highlights: [
      'Traditional Portuguese bakeries with authentic pastéis de nata',
      'Family-run Portuguese restaurants serving regional specialties',
      'Portuguese community centers and cultural associations',
      'Hidden Portuguese businesses serving the community for decades',
      'Meet Portuguese families who shaped London\'s Little Portugal'
    ],
    highlightsPortuguese: [
      'Padarias portuguesas tradicionais com pastéis de nata autênticos',
      'Restaurantes portugueses familiares servindo especialidades regionais',
      'Centros comunitários portugueses e associações culturais',
      'Negócios portugueses escondidos servindo a comunidade há décadas',
      'Conhecer famílias portuguesas que moldaram a Pequena Portugal de Londres'
    ],
    culturalContext: 'Vauxhall and Stockwell became home to the largest Portuguese community in the UK during the 1960s-70s migration wave. Today, this area maintains the strongest concentration of authentic Portuguese businesses outside of Portugal.',
    culturalContextPortuguese: 'Vauxhall e Stockwell tornaram-se lar da maior comunidade portuguesa do Reino Unido durante a onda migratória dos anos 1960-70. Hoje, esta área mantém a maior concentração de negócios portugueses autênticos fora de Portugal.',
    stops: [
      {
        name: 'Lisboa Patisserie - The Original',
        namePortuguese: 'Lisboa Patisserie - A Original',
        description: 'Family-owned since 1973, this legendary pastry shop serves the most authentic pastéis de nata in London, made with traditional Portuguese recipes.',
        descriptionPortuguese: 'Familiar desde 1973, esta lendária pastelaria serve os pastéis de nata mais autênticos de Londres, feitos com receitas portuguesas tradicionais.',
        address: '57 Golborne Rd, London W10 5NR',
        duration: '25 minutes',
        type: 'bakery',
        authenticityScore: 10,
        priceRange: '£',
        familyOwned: true,
        establishedYear: 1973
      },
      {
        name: 'A Toca Restaurant',
        namePortuguese: 'Restaurante A Toca',
        description: 'Intimate family restaurant known for traditional Portuguese home cooking, frequented by Portuguese families for special occasions and Sunday meals.',
        descriptionPortuguese: 'Restaurante familiar íntimo conhecido pela cozinha caseira portuguesa tradicional, frequentado por famílias portuguesas para ocasiões especiais e almoços de domingo.',
        address: '62 Golborne Rd, London W10 5PS',
        duration: '45 minutes',
        type: 'restaurant',
        authenticityScore: 9,
        priceRange: '££',
        familyOwned: true,
        establishedYear: 1978
      },
      {
        name: 'Portuguese Community Centre',
        namePortuguese: 'Centro Comunitário Português',
        description: 'The cultural heart of London\'s Portuguese community, hosting traditional festivals, Fado nights, and Portuguese language classes.',
        descriptionPortuguese: 'O coração cultural da comunidade portuguesa de Londres, acolhendo festivais tradicionais, noites de Fado e aulas de língua portuguesa.',
        address: 'South Lambeth Road, London SW8',
        duration: '30 minutes',
        type: 'cultural',
        authenticityScore: 10,
        priceRange: '£',
        familyOwned: false
      },
      {
        name: 'Café Estrela do Norte',
        namePortuguese: 'Café Estrela do Norte',
        description: 'Traditional Portuguese café where Portuguese men gather for coffee, dominos, and to watch Portuguese football matches on weekends.',
        descriptionPortuguese: 'Café português tradicional onde homens portugueses se reúnem para café, dominó e para ver jogos de futebol português aos fins de semana.',
        address: 'Stockwell Road, London SW9',
        duration: '20 minutes',
        type: 'cultural',
        authenticityScore: 9,
        priceRange: '£',
        familyOwned: true
      },
      {
        name: 'Mercearia Portuguesa - Portuguese Grocers',
        namePortuguese: 'Mercearia Portuguesa',
        description: 'Authentic Portuguese grocery store stocking imported specialties: bacalhau, Portuguese wines, chouriço, and hard-to-find ingredients from Portugal.',
        descriptionPortuguese: 'Mercearia portuguesa autêntica com especialidades importadas: bacalhau, vinhos portugueses, chouriço e ingredientes difíceis de encontrar de Portugal.',
        address: 'Wandsworth Road, London SW8',
        duration: '25 minutes',
        type: 'shopping',
        authenticityScore: 10,
        priceRange: '££',
        familyOwned: true
      }
    ],
    includes: [
      'Traditional pastéis de nata tasting at 3 different bakeries',
      'Portuguese coffee and regional cake tasting',
      'Portuguese grocery shopping experience with taste samples',
      'Cultural storytelling by Portuguese community elders',
      'Portuguese phrase book and cultural guide',
      'Group photo at Portuguese community mural'
    ],
    includesPortuguese: [
      'Prova de pastéis de nata tradicionais em 3 padarias diferentes',
      'Prova de café português e bolos regionais',
      'Experiência de compras na mercearia portuguesa com amostras',
      'Narrativa cultural por anciãos da comunidade portuguesa',
      'Livro de frases portuguesas e guia cultural',
      'Foto de grupo no mural da comunidade portuguesa'
    ]
  },
  {
    id: 'golborne-road-culinary',
    name: 'Golborne Road Portuguese Culinary Journey',
    namePortuguese: 'Jornada Culinária Portuguesa da Golborne Road',
    description: 'A deep-dive food experience through the most concentrated stretch of Portuguese restaurants and bakeries in London, featuring family recipes passed down through generations.',
    descriptionPortuguese: 'Uma experiência gastronómica profunda através do trecho mais concentrado de restaurantes e padarias portuguesas em Londres, apresentando receitas familiares passadas através de gerações.',
    duration: '4 hours',
    price: 135,
    area: 'Golborne Road',
    groupSize: 'Máximo 8 pessoas',
    walkingDistance: '1.5 km culinary walk',
    highlights: [
      'Authentic Portuguese cooking demonstration',
      'Traditional bacalhau preparation techniques',
      'Portuguese wine pairing with regional specialties',
      'Meet Portuguese chefs and their family stories',
      'Learn the secrets of perfect pastéis de nata'
    ],
    highlightsPortuguese: [
      'Demonstração de cozinha portuguesa autêntica',
      'Técnicas tradicionais de preparação de bacalhau',
      'Harmonização de vinhos portugueses com especialidades regionais',
      'Conhecer chefs portugueses e suas histórias familiares',
      'Aprender os segredos dos pastéis de nata perfeitos'
    ],
    culturalContext: 'Golborne Road represents the most concentrated Portuguese culinary district in the UK, where traditional recipes and cooking methods have been preserved exactly as practiced in Portugal.',
    culturalContextPortuguese: 'A Golborne Road representa o distrito culinário português mais concentrado do Reino Unido, onde receitas tradicionais e métodos de cozinha foram preservados exatamente como praticados em Portugal.',
    stops: [
      {
        name: 'O Cantinho de Portugal',
        namePortuguese: 'O Cantinho de Portugal',
        description: 'Legendary restaurant serving authentic Portuguese dishes exactly as prepared in small Portuguese villages, run by the same family for 40+ years.',
        descriptionPortuguese: 'Restaurante lendário servindo pratos portugueses autênticos exatamente como preparados em pequenas aldeias portuguesas, gerido pela mesma família há mais de 40 anos.',
        address: '96 Golborne Rd, London W10 5PS',
        duration: '60 minutes',
        type: 'restaurant',
        authenticityScore: 10,
        priceRange: '££',
        familyOwned: true,
        establishedYear: 1980
      },
      {
        name: 'Pastelaria Real',
        namePortuguese: 'Pastelaria Real',
        description: 'Traditional Portuguese bakery specializing in regional pastries from different Portuguese provinces, including Azorean and Madeiran specialties.',
        descriptionPortuguese: 'Padaria portuguesa tradicional especializada em pastelaria regional de diferentes províncias portuguesas, incluindo especialidades açorianas e madeirenses.',
        address: 'Golborne Road, London W10',
        duration: '30 minutes',
        type: 'bakery',
        authenticityScore: 9,
        priceRange: '£',
        familyOwned: true
      },
      {
        name: 'Portuguese Family Kitchen',
        namePortuguese: 'Cozinha Familiar Portuguesa',
        description: 'Private cooking demonstration in a Portuguese family home, learning traditional recipes like cozido à portuguesa and caldeirada.',
        descriptionPortuguese: 'Demonstração de cozinha privada numa casa familiar portuguesa, aprendendo receitas tradicionais como cozido à portuguesa e caldeirada.',
        address: 'Private residence, Golborne Road area',
        duration: '90 minutes',
        type: 'cultural',
        authenticityScore: 10,
        priceRange: '£££',
        familyOwned: true
      }
    ],
    includes: [
      'Authentic Portuguese 3-course meal',
      'Portuguese wine tasting (3 regional wines)',
      'Traditional cooking demonstration',
      'Portuguese recipe collection in Portuguese/English',
      'Portuguese cooking spices and ingredients to take home',
      'Certificate of Portuguese culinary experience'
    ],
    includesPortuguese: [
      'Refeição portuguesa autêntica de 3 pratos',
      'Prova de vinhos portugueses (3 vinhos regionais)',
      'Demonstração de cozinha tradicional',
      'Coleção de receitas portuguesas em português/inglês',
      'Especiarias e ingredientes portugueses para levar',
      'Certificado de experiência culinária portuguesa'
    ]
  }
]

interface LittlePortugalToursProps {
  isPortuguese: boolean
  onBookTour: (tourId: string) => void
}

export default function LittlePortugalTours({ isPortuguese, onBookTour }: LittlePortugalToursProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'restaurant':
        return Utensils
      case 'bakery':
        return Coffee
      case 'cultural':
        return Heart
      case 'shopping':
        return ShoppingBag
      case 'heritage':
        return Camera
      default:
        return MapPinIcon
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'restaurant':
        return 'accent'
      case 'bakery':
        return 'coral'
      case 'cultural':
        return 'premium'
      case 'shopping':
        return 'secondary'
      case 'heritage':
        return 'primary'
      default:
        return 'gray'
    }
  }

  return (
    <section className="py-16 bg-gradient-to-br from-white via-coral-50/20 to-accent-50/20">
      <div className="container-width">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-coral-100 via-accent-50 to-premium-100 border border-coral-200">
              <HeartIcon className="w-4 h-4 mr-2" />
              {isPortuguese ? 'Pequena Portugal Autêntica de Londres' : 'London\'s Authentic Little Portugal'}
            </span>
          </motion.div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            {isPortuguese ? 'Tours da Pequena Portugal' : 'Little Portugal Walking Tours'}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            {isPortuguese 
              ? 'Descubra os autênticos bairros portugueses de Londres através de tours íntimos que conectam você com negócios familiares, tradições culinárias e histórias da comunidade portuguesa que moldam Londres há mais de 60 anos'
              : 'Discover London\'s authentic Portuguese neighborhoods through intimate walking tours that connect you with family businesses, culinary traditions, and Portuguese community stories that have shaped London for over 60 years'
            }
          </p>
        </div>

        <div className="space-y-16">
          {littlePortugalTours.map((tour, tourIndex) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: tourIndex * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
            >
              {/* Tour Header */}
              <div className="bg-gradient-to-r from-coral-50 to-accent-100/50 p-8">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-coral-500 rounded-xl flex items-center justify-center">
                        <HeartIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-medium text-coral-600 uppercase tracking-wide">
                          {tour.area} • {tour.duration}
                        </span>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {isPortuguese ? tour.namePortuguese : tour.name}
                        </h3>
                      </div>
                    </div>
                    <p className="text-gray-700 text-lg mb-4">
                      {isPortuguese ? tour.descriptionPortuguese : tour.description}
                    </p>
                    <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <ClockIcon className="w-4 h-4" />
                        <span>{tour.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <UserGroupIcon className="w-4 h-4" />
                        <span>{tour.groupSize}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPinIcon className="w-4 h-4" />
                        <span>{tour.walkingDistance}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-semibold text-lg text-gray-900">{isPortuguese ? 'a partir de' : 'from'} £{tour.price}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center lg:text-right">
                    <button
                      onClick={() => onBookTour(tour.id)}
                      className="bg-coral-600 hover:bg-coral-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
                    >
                      {isPortuguese ? 'Reservar Tour' : 'Book Tour'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Tour Content */}
              <div className="p-8">
                {/* Cultural Context */}
                <div className="mb-8 bg-premium-50 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-premium-800 mb-3">
                    {isPortuguese ? 'Contexto Cultural' : 'Cultural Context'}
                  </h4>
                  <p className="text-premium-700">
                    {isPortuguese ? tour.culturalContextPortuguese : tour.culturalContext}
                  </p>
                </div>

                {/* Highlights */}
                <div className="mb-8">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">
                    {isPortuguese ? 'Destaques da Experiência' : 'Experience Highlights'}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {(isPortuguese ? tour.highlightsPortuguese : tour.highlights).map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <SparklesIcon className="w-5 h-5 text-coral-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Authentic Stops */}
                <div className="mb-8">
                  <h4 className="text-lg font-bold text-gray-900 mb-6">
                    {isPortuguese ? 'Paragens Autênticas' : 'Authentic Stops'}
                  </h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {tour.stops.map((stop, stopIndex) => {
                      const TypeIcon = getTypeIcon(stop.type)
                      const colorClass = getTypeColor(stop.type)
                      return (
                        <div key={stopIndex} className="bg-gray-50 rounded-xl p-4">
                          <div className="flex gap-4">
                            <div className="flex-shrink-0">
                              <div className={`w-10 h-10 bg-${colorClass}-100 rounded-lg flex items-center justify-center`}>
                                <TypeIcon className={`w-5 h-5 text-${colorClass}-600`} />
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <h5 className="font-semibold text-gray-900 text-sm">
                                  {isPortuguese ? stop.namePortuguese : stop.name}
                                </h5>
                                <div className="flex items-center gap-2">
                                  {stop.familyOwned && (
                                    <span className="text-xs bg-heart-100 text-heart-600 px-2 py-1 rounded-full">
                                      {isPortuguese ? 'Familiar' : 'Family'}
                                    </span>
                                  )}
                                  <span className="text-xs font-medium text-gray-500">
                                    {stop.priceRange}
                                  </span>
                                </div>
                              </div>
                              <p className="text-gray-600 text-xs mb-2">
                                {isPortuguese ? stop.descriptionPortuguese : stop.description}
                              </p>
                              <div className="flex items-center gap-3 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                  <ClockIcon className="w-3 h-3" />
                                  {stop.duration}
                                </span>
                                {stop.establishedYear && (
                                  <span className="flex items-center gap-1">
                                    Est. {stop.establishedYear}
                                  </span>
                                )}
                                <div className="flex items-center gap-1">
                                  <span className="text-xs">Authenticity:</span>
                                  <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                      <HeartIcon 
                                        key={i} 
                                        className={`w-3 h-3 ${i < stop.authenticityScore / 2 ? 'text-coral-500 fill-current' : 'text-gray-300'}`} 
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
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
                    {(isPortuguese ? tour.includesPortuguese : tour.includes).map((include, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <UserGroupIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{include}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-coral-50 via-accent-50 to-premium-50 rounded-2xl p-8 border border-coral-200">
            <HeartIcon className="w-16 h-16 mx-auto mb-4 text-coral-500" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {isPortuguese ? 'Experiência Personalizada da Pequena Portugal' : 'Custom Little Portugal Experience'}
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              {isPortuguese 
                ? 'Criamos tours personalizados baseados nos seus interesses específicos - seja focado na gastronomia, história familiar, tradições culturais ou networking de negócios portugueses.'
                : 'We create custom tours based on your specific interests - whether focused on food, family history, cultural traditions, or Portuguese business networking.'
              }
            </p>
            <button
              onClick={() => onBookTour('custom-little-portugal')}
              className="bg-gradient-to-r from-coral-600 via-accent-600 to-premium-600 hover:from-coral-700 hover:via-accent-700 hover:to-premium-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              {isPortuguese ? 'Criar Tour Personalizado' : 'Create Custom Tour'}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}