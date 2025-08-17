'use client'

import { motion } from 'framer-motion'
import { MusicalNoteIcon, ClockIcon, UserGroupIcon, SparklesIcon, HeartIcon, GlobeAltIcon } from '@heroicons/react/24/outline'
import { Music, Wine, Utensils, Users, Crown, Heart } from 'lucide-react'

interface FadoVenue {
  name: string
  namePortuguese: string
  location: string
  description: string
  descriptionPortuguese: string
  atmosphere: string
  atmospherePortuguese: string
  authenticityLevel: number
  capacity: number
  priceRange: '££' | '£££' | '££££'
}

interface FadoPerformer {
  name: string
  origin: string
  style: string
  stylePortuguese: string
  experience: string
  experiencePortuguese: string
  specialties: string[]
  specialtiesPortuguese: string[]
}

interface FadoExperience {
  id: string
  name: string
  namePortuguese: string
  description: string
  descriptionPortuguese: string
  duration: string
  price: number
  category: 'intimate' | 'dinner' | 'immersive' | 'masterclass'
  groupSize: string
  venue: FadoVenue
  performers: FadoPerformer[]
  culturalEducation: string[]
  culturalEducationPortuguese: string[]
  diningMenu: string[]
  diningMenuPortuguese: string[]
  includes: string[]
  includesPortuguese: string[]
  culturalSignificance: string
  culturalSignificancePortuguese: string
}

const fadoExperiences: FadoExperience[] = [
  {
    id: 'intimate-fado-evening',
    name: 'Intimate Fado Evening - Traditional Casa de Fado',
    namePortuguese: 'Serão Íntimo de Fado - Casa de Fado Tradicional',
    description: 'Experience authentic Fado in an intimate setting recreating the atmosphere of traditional Lisbon Fado houses, with Portuguese wine and traditional petiscos.',
    descriptionPortuguese: 'Experimente Fado autêntico num ambiente íntimo recriando a atmosfera das tradicionais casas de Fado de Lisboa, com vinho português e petiscos tradicionais.',
    duration: '3 hours',
    price: 145,
    category: 'intimate',
    groupSize: 'Máximo 16 pessoas',
    venue: {
      name: 'Portuguese Cultural Centre - Fado Room',
      namePortuguese: 'Centro Cultural Português - Sala de Fado',
      location: 'South Lambeth, London SW8',
      description: 'Authentic Fado room designed to replicate traditional Lisbon Fado houses, with intimate lighting, Portuguese azulejo tiles, and traditional décor.',
      descriptionPortuguese: 'Sala de Fado autêntica desenhada para replicar as tradicionais casas de Fado de Lisboa, com iluminação íntima, azulejos portugueses e decoração tradicional.',
      atmosphere: 'Candle-lit tables, traditional Portuguese atmosphere, respectful silence during performances',
      atmospherePortuguese: 'Mesas à luz de velas, atmosfera portuguesa tradicional, silêncio respeitoso durante as performances',
      authenticityLevel: 10,
      capacity: 16,
      priceRange: '£££'
    },
    performers: [
      {
        name: 'Ana Moura (or similar caliber artist)',
        origin: 'Lisboa, Portugal',
        style: 'Traditional Fado Vadio and Fado Canção',
        stylePortuguese: 'Fado Vadio e Fado Canção Tradicionais',
        experience: '20+ years performing in Alfama and Bairro Alto Fado houses',
        experiencePortuguese: '20+ anos atuando em casas de Fado de Alfama e Bairro Alto',
        specialties: ['Amália Rodrigues repertoire', 'Traditional Portuguese guitar accompaniment', 'Spontaneous Fado Vadio'],
        specialtiesPortuguese: ['Repertório de Amália Rodrigues', 'Acompanhamento tradicional de guitarra portuguesa', 'Fado Vadio espontâneo']
      }
    ],
    culturalEducation: [
      'History and cultural significance of Fado (UNESCO Intangible Heritage)',
      'Understanding Fado emotions: saudade, destino, amor',
      'Traditional Fado etiquette and respectful listening',
      'Portuguese guitar (guitarra portuguesa) musical explanation',
      'Comparison between Fado de Lisboa, Fado de Coimbra, and regional variations'
    ],
    culturalEducationPortuguese: [
      'História e significado cultural do Fado (Património Imaterial UNESCO)',
      'Compreender as emoções do Fado: saudade, destino, amor',
      'Etiqueta tradicional do Fado e escuta respeitosa',
      'Explicação musical da guitarra portuguesa',
      'Comparação entre Fado de Lisboa, Fado de Coimbra e variações regionais'
    ],
    diningMenu: [
      'Portuguese wine selection (Douro, Alentejo, Vinho Verde)',
      'Traditional petiscos: chouriço, queijo da serra, azeitonas',
      'Portuguese regional cheeses and charcuterie',
      'Traditional Portuguese desserts: pastéis de nata, queijadas',
      'Portuguese coffee service (café à portuguesa)'
    ],
    diningMenuPortuguese: [
      'Seleção de vinhos portugueses (Douro, Alentejo, Vinho Verde)',
      'Petiscos tradicionais: chouriço, queijo da serra, azeitonas',
      'Queijos regionais portugueses e charcutaria',
      'Sobremesas portuguesas tradicionais: pastéis de nata, queijadas',
      'Serviço de café português (café à portuguesa)'
    ],
    culturalSignificance: 'Fado represents the soul of Portuguese culture, expressing the untranslatable emotion of saudade. This intimate experience preserves the authentic tradition of Fado houses while educating participants about this UNESCO World Heritage cultural form.',
    culturalSignificancePortuguese: 'O Fado representa a alma da cultura portuguesa, expressando a emoção intraduzível da saudade. Esta experiência íntima preserva a tradição autêntica das casas de Fado enquanto educa os participantes sobre esta forma cultural Património Mundial da UNESCO.',
    includes: [
      'Private intimate Fado performance (2 hours)',
      'Portuguese wine and petiscos tasting',
      'Cultural education about Fado traditions',
      'Traditional Portuguese guitar demonstration',
      'Professional recording of performance for participants',
      'Portuguese cultural guide and songbook'
    ],
    includesPortuguese: [
      'Performance privada íntima de Fado (2 horas)',
      'Prova de vinhos portugueses e petiscos',
      'Educação cultural sobre tradições do Fado',
      'Demonstração de guitarra portuguesa tradicional',
      'Gravação profissional da performance para participantes',
      'Guia cultural português e cancioneiro'
    ]
  },
  {
    id: 'fado-dinner-experience',
    name: 'Traditional Portuguese Fado Dinner Experience',
    namePortuguese: 'Experiência de Jantar Tradicional Português com Fado',
    description: 'Combine authentic Portuguese dining with live Fado performances, featuring multi-course Portuguese regional cuisine paired with traditional Fado music.',
    descriptionPortuguese: 'Combine jantar português autêntico com performances de Fado ao vivo, apresentando cozinha regional portuguesa de múltiplos pratos harmonizada com música tradicional de Fado.',
    duration: '4 hours',
    price: 195,
    category: 'dinner',
    groupSize: 'Máximo 24 pessoas',
    venue: {
      name: 'O Cantinho de Portugal - Private Fado Room',
      namePortuguese: 'O Cantinho de Portugal - Sala Privada de Fado',
      location: '96 Golborne Rd, London W10 5PS',
      description: 'London\'s most authentic Portuguese restaurant, family-owned for 40+ years, with a dedicated Fado performance space featuring traditional Portuguese décor.',
      descriptionPortuguese: 'O restaurante português mais autêntico de Londres, familiar há mais de 40 anos, com espaço dedicado a performances de Fado com decoração portuguesa tradicional.',
      atmosphere: 'Warm family restaurant atmosphere with traditional Portuguese hospitality and authentic Fado house ambiance',
      atmospherePortuguese: 'Atmosfera calorosa de restaurante familiar com hospitalidade portuguesa tradicional e ambiente autêntico de casa de Fado',
      authenticityLevel: 10,
      capacity: 24,
      priceRange: '£££'
    },
    performers: [
      {
        name: 'Carlos Paredes Tribute Artist',
        origin: 'Coimbra, Portugal',
        style: 'Portuguese Guitar Virtuoso - Fado instrumental and vocal',
        stylePortuguese: 'Virtuoso da Guitarra Portuguesa - Fado instrumental e vocal',
        experience: 'Trained at Coimbra Fado school, 15+ years international performance',
        experiencePortuguese: 'Formado na escola de Fado de Coimbra, 15+ anos de performance internacional',
        specialties: ['Portuguese guitar solos', 'Fado de Coimbra', 'Traditional ballads', 'Interactive Fado education'],
        specialtiesPortuguese: ['Solos de guitarra portuguesa', 'Fado de Coimbra', 'Baladas tradicionais', 'Educação interativa de Fado']
      }
    ],
    culturalEducation: [
      'Regional Portuguese cuisine and cultural significance',
      'Wine pairing with Portuguese terroir explanation',
      'Fado performance styles: Lisbon vs Coimbra traditions',
      'Portuguese hospitality customs and social dining',
      'Interactive Portuguese language through Fado lyrics'
    ],
    culturalEducationPortuguese: [
      'Cozinha regional portuguesa e significado cultural',
      'Harmonização de vinhos com explicação do terroir português',
      'Estilos de performance de Fado: tradições de Lisboa vs Coimbra',
      'Costumes de hospitalidade portuguesa e jantar social',
      'Língua portuguesa interativa através de letras de Fado'
    ],
    diningMenu: [
      'Appetizer: Chouriço à bombeiro, Portuguese olives, regional cheeses',
      'Soup: Traditional caldo verde with Portuguese chouriço',
      'Main: Choice of bacalhau à braz, cozido à portuguesa, or grilled sardines',
      'Dessert: Pastéis de nata, arroz doce, or queijadas de Sintra',
      'Wines: Regional Portuguese wine flight (3 wines with explanation)'
    ],
    diningMenuPortuguese: [
      'Entrada: Chouriço à bombeiro, azeitonas portuguesas, queijos regionais',
      'Sopa: Caldo verde tradicional com chouriço português',
      'Principal: Escolha de bacalhau à brás, cozido à portuguesa, ou sardinhas grelhadas',
      'Sobremesa: Pastéis de nata, arroz doce, ou queijadas de Sintra',
      'Vinhos: Vôo de vinhos regionais portugueses (3 vinhos com explicação)'
    ],
    culturalSignificance: 'This experience recreates the traditional Portuguese dining and Fado culture, where food, wine, and music combine to create deep cultural connections and preserve authentic Portuguese hospitality traditions.',
    culturalSignificancePortuguese: 'Esta experiência recria a cultura tradicional portuguesa de jantar e Fado, onde comida, vinho e música se combinam para criar conexões culturais profundas e preservar tradições autênticas de hospitalidade portuguesa.',
    includes: [
      'Complete 4-course Portuguese dinner',
      'Portuguese wine flight with cultural education',
      'Live Fado performance during dinner (2 sets)',
      'Portuguese guitar music demonstration',
      'Cultural explanation of dishes and traditions',
      'Traditional Portuguese coffee and liqueur service'
    ],
    includesPortuguese: [
      'Jantar português completo de 4 pratos',
      'Vôo de vinhos portugueses com educação cultural',
      'Performance de Fado ao vivo durante o jantar (2 sets)',
      'Demonstração de música de guitarra portuguesa',
      'Explicação cultural dos pratos e tradições',
      'Serviço tradicional de café português e licor'
    ]
  },
  {
    id: 'fado-masterclass-immersion',
    name: 'Fado Cultural Immersion Masterclass',
    namePortuguese: 'Masterclass de Imersão Cultural no Fado',
    description: 'Deep cultural education experience with Fado history, Portuguese guitar lessons, basic Fado singing instruction, and comprehensive understanding of Portuguese cultural identity through music.',
    descriptionPortuguese: 'Experiência de educação cultural profunda com história do Fado, lições de guitarra portuguesa, instrução básica de canto de Fado, e compreensão abrangente da identidade cultural portuguesa através da música.',
    duration: '6 hours',
    price: 295,
    category: 'masterclass',
    groupSize: 'Máximo 12 pessoas',
    venue: {
      name: 'Instituto Camões Portuguese Cultural Centre',
      namePortuguese: 'Centro Cultural Português Instituto Camões',
      location: 'London Portuguese Cultural Institute',
      description: 'Official Portuguese cultural institution with professional music education facilities, traditional Portuguese library, and authentic cultural artifacts.',
      descriptionPortuguese: 'Instituição cultural portuguesa oficial com instalações profissionais de educação musical, biblioteca portuguesa tradicional e artefatos culturais autênticos.',
      atmosphere: 'Academic cultural setting with professional music education facilities and traditional Portuguese cultural materials',
      atmospherePortuguese: 'Ambiente cultural académico com instalações profissionais de educação musical e materiais culturais portugueses tradicionais',
      authenticityLevel: 10,
      capacity: 12,
      priceRange: '££££'
    },
    performers: [
      {
        name: 'Professor Maria Fátima Santos',
        origin: 'Lisboa, Portugal - Conservatório Nacional',
        style: 'Academic Fado specialist and Portuguese guitar professor',
        stylePortuguese: 'Especialista académica em Fado e professora de guitarra portuguesa',
        experience: 'PhD in Portuguese Music, 25+ years teaching Fado and Portuguese cultural music',
        experiencePortuguese: 'PhD em Música Portuguesa, 25+ anos ensinando Fado e música cultural portuguesa',
        specialties: ['Fado music theory', 'Portuguese guitar technique', 'Cultural context education', 'Vocal Fado instruction'],
        specialtiesPortuguese: ['Teoria musical do Fado', 'Técnica de guitarra portuguesa', 'Educação de contexto cultural', 'Instrução vocal de Fado']
      }
    ],
    culturalEducation: [
      'Complete history of Fado from origins to modern day',
      'Portuguese guitar construction and playing techniques',
      'Understanding saudade and Portuguese emotional expression',
      'Fado lyrics analysis and Portuguese poetry tradition',
      'Regional variations: Lisboa, Coimbra, and contemporary Fado',
      'Fado\'s influence on Portuguese national identity'
    ],
    culturalEducationPortuguese: [
      'História completa do Fado desde as origens até aos dias modernos',
      'Construção e técnicas de toque da guitarra portuguesa',
      'Compreender a saudade e expressão emocional portuguesa',
      'Análise de letras de Fado e tradição poética portuguesa',
      'Variações regionais: Lisboa, Coimbra e Fado contemporâneo',
      'Influência do Fado na identidade nacional portuguesa'
    ],
    diningMenu: [
      'Traditional Portuguese lunch with regional specialties',
      'Portuguese wine tasting with cultural context',
      'Traditional coffee break with pastéis de nata',
      'Portuguese cheese and charcuterie educational tasting'
    ],
    diningMenuPortuguese: [
      'Almoço tradicional português com especialidades regionais',
      'Prova de vinhos portugueses com contexto cultural',
      'Pausa para café tradicional com pastéis de nata',
      'Prova educativa de queijos e charcutaria portuguesa'
    ],
    culturalSignificance: 'This comprehensive masterclass provides participants with deep understanding of Fado as both musical art form and cultural expression, connecting them to the heart of Portuguese identity and emotion.',
    culturalSignificancePortuguese: 'Esta masterclass abrangente fornece aos participantes uma compreensão profunda do Fado como forma de arte musical e expressão cultural, conectando-os ao coração da identidade e emoção portuguesa.',
    includes: [
      'Professional Fado and Portuguese guitar instruction',
      'Complete cultural education materials and songbook',
      'Portuguese guitar practice session (instruments provided)',
      'Basic Fado singing instruction and practice',
      'Traditional Portuguese lunch with wine',
      'Certificate of completion from Instituto Camões partnership',
      'Professional recording of participant performances'
    ],
    includesPortuguese: [
      'Instrução profissional de Fado e guitarra portuguesa',
      'Materiais de educação cultural completos e cancioneiro',
      'Sessão de prática de guitarra portuguesa (instrumentos fornecidos)',
      'Instrução e prática básica de canto de Fado',
      'Almoço tradicional português com vinho',
      'Certificado de conclusão da parceria Instituto Camões',
      'Gravação profissional das performances dos participantes'
    ]
  }
]

interface FadoExperiencePackagesProps {
  isPortuguese: boolean
  onBookExperience: (experienceId: string) => void
}

export default function FadoExperiencePackages({ isPortuguese, onBookExperience }: FadoExperiencePackagesProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'intimate':
        return Heart
      case 'dinner':
        return Utensils
      case 'immersive':
        return Users
      case 'masterclass':
        return Crown
      default:
        return Music
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'intimate':
        return 'premium'
      case 'dinner':
        return 'accent'
      case 'immersive':
        return 'secondary'
      case 'masterclass':
        return 'primary'
      default:
        return 'coral'
    }
  }

  return (
    <section className="py-16 bg-gradient-to-br from-white via-premium-50/20 to-secondary-50/20">
      <div className="container-width">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-premium-100 via-secondary-50 to-accent-100 border border-premium-200">
              <MusicalNoteIcon className="w-4 h-4 mr-2" />
              {isPortuguese ? 'Património Imaterial UNESCO' : 'UNESCO Intangible Heritage'}
            </span>
          </motion.div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            {isPortuguese ? 'Experiências Autênticas de Fado' : 'Authentic Fado Experiences'}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            {isPortuguese 
              ? 'Mergulhe na alma da cultura portuguesa através de experiências autênticas de Fado, desde serões íntimos a masterclasses educativas, preservando esta tradição UNESCO Património Imaterial da Humanidade'
              : 'Immerse yourself in the soul of Portuguese culture through authentic Fado experiences, from intimate evenings to educational masterclasses, preserving this UNESCO Intangible Cultural Heritage tradition'
            }
          </p>
        </div>

        <div className="space-y-16">
          {fadoExperiences.map((experience, expIndex) => {
            const CategoryIcon = getCategoryIcon(experience.category)
            const colorClass = getCategoryColor(experience.category)
            
            return (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: expIndex * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
              >
                {/* Experience Header */}
                <div className={`bg-gradient-to-r ${colorClass === 'premium' ? 'from-premium-50 to-premium-100/50' : colorClass === 'accent' ? 'from-accent-50 to-accent-100/50' : colorClass === 'secondary' ? 'from-secondary-50 to-secondary-100/50' : 'from-primary-50 to-primary-100/50'} p-8`}>
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-12 h-12 ${colorClass === 'premium' ? 'bg-premium-500' : colorClass === 'accent' ? 'bg-accent-500' : colorClass === 'secondary' ? 'bg-secondary-500' : 'bg-primary-500'} rounded-xl flex items-center justify-center`}>
                          <CategoryIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <span className={`text-xs font-medium ${colorClass === 'premium' ? 'text-premium-600' : colorClass === 'accent' ? 'text-accent-600' : colorClass === 'secondary' ? 'text-secondary-600' : 'text-primary-600'} uppercase tracking-wide`}>
                            {experience.category} • {experience.duration}
                          </span>
                          <h3 className="text-2xl font-bold text-gray-900">
                            {isPortuguese ? experience.namePortuguese : experience.name}
                          </h3>
                        </div>
                      </div>
                      <p className="text-gray-700 text-lg mb-4">
                        {isPortuguese ? experience.descriptionPortuguese : experience.description}
                      </p>
                      <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-1">
                          <ClockIcon className="w-4 h-4" />
                          <span>{experience.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <UserGroupIcon className="w-4 h-4" />
                          <span>{experience.groupSize}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-semibold text-lg text-gray-900">{isPortuguese ? 'a partir de' : 'from'} £{experience.price}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center lg:text-right">
                      <button
                        onClick={() => onBookExperience(experience.id)}
                        className={`${colorClass === 'premium' ? 'bg-premium-600 hover:bg-premium-700' : colorClass === 'accent' ? 'bg-accent-600 hover:bg-accent-700' : colorClass === 'secondary' ? 'bg-secondary-600 hover:bg-secondary-700' : 'bg-primary-600 hover:bg-primary-700'} text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg`}
                      >
                        {isPortuguese ? 'Reservar Experiência' : 'Book Experience'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Experience Content */}
                <div className="p-8">
                  {/* Cultural Significance */}
                  <div className="mb-8 bg-gray-50 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-3">
                      {isPortuguese ? 'Significado Cultural' : 'Cultural Significance'}
                    </h4>
                    <p className="text-gray-700">
                      {isPortuguese ? experience.culturalSignificancePortuguese : experience.culturalSignificance}
                    </p>
                  </div>

                  {/* Venue Information */}
                  <div className="mb-8">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">
                      {isPortuguese ? 'Local Autêntico' : 'Authentic Venue'}
                    </h4>
                    <div className={`bg-${colorClass}-50 rounded-xl p-6`}>
                      <h5 className="font-semibold text-gray-900 mb-2">
                        {isPortuguese ? experience.venue.namePortuguese : experience.venue.name}
                      </h5>
                      <p className="text-gray-700 mb-3">
                        {isPortuguese ? experience.venue.descriptionPortuguese : experience.venue.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <GlobeAltIcon className="w-4 h-4" />
                          {experience.venue.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <UserGroupIcon className="w-4 h-4" />
                          {experience.venue.capacity} {isPortuguese ? 'pessoas' : 'people'}
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="text-xs">Authenticity:</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <HeartIcon 
                                key={i} 
                                className={`w-3 h-3 ${i < experience.venue.authenticityLevel / 2 ? 'text-premium-500 fill-current' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Performers */}
                  <div className="mb-8">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">
                      {isPortuguese ? 'Artistas Portugueses' : 'Portuguese Artists'}
                    </h4>
                    <div className="space-y-4">
                      {experience.performers.map((performer, perfIndex) => (
                        <div key={perfIndex} className="bg-gray-50 rounded-xl p-4">
                          <h5 className="font-semibold text-gray-900 mb-2">{performer.name}</h5>
                          <p className="text-gray-700 text-sm mb-2">
                            {isPortuguese ? performer.experiencePortuguese : performer.experience}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {(isPortuguese ? performer.specialtiesPortuguese : performer.specialties).map((specialty, specIndex) => (
                              <span key={specIndex} className="text-xs bg-premium-100 text-premium-700 px-2 py-1 rounded-full">
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cultural Education */}
                  <div className="mb-8">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">
                      {isPortuguese ? 'Educação Cultural' : 'Cultural Education'}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {(isPortuguese ? experience.culturalEducationPortuguese : experience.culturalEducation).map((education, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <SparklesIcon className={`w-5 h-5 ${colorClass === 'premium' ? 'text-premium-500' : colorClass === 'accent' ? 'text-accent-500' : colorClass === 'secondary' ? 'text-secondary-500' : 'text-primary-500'} mt-0.5 flex-shrink-0`} />
                          <span className="text-gray-700">{education}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* What's Included */}
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-4">
                      {isPortuguese ? 'O Que Está Incluído' : 'What\'s Included'}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {(isPortuguese ? experience.includesPortuguese : experience.includes).map((include, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <MusicalNoteIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
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
          <div className="bg-gradient-to-r from-premium-50 via-secondary-50 to-accent-50 rounded-2xl p-8 border border-premium-200">
            <MusicalNoteIcon className="w-16 h-16 mx-auto mb-4 text-premium-500" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {isPortuguese ? 'Experiência Personalizada de Fado' : 'Custom Fado Experience'}
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              {isPortuguese 
                ? 'Criamos experiências de Fado personalizadas para ocasiões especiais, eventos corporativos, ou grupos com interesses específicos na cultura portuguesa.'
                : 'We create custom Fado experiences for special occasions, corporate events, or groups with specific interests in Portuguese culture.'
              }
            </p>
            <button
              onClick={() => onBookExperience('custom-fado')}
              className="bg-gradient-to-r from-premium-600 via-secondary-600 to-accent-600 hover:from-premium-700 hover:via-secondary-700 hover:to-accent-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              {isPortuguese ? 'Criar Experiência Personalizada' : 'Create Custom Experience'}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}