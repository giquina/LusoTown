'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { 
  CalendarDaysIcon,
  MapPinIcon,
  UsersIcon,
  BookOpenIcon,
  MusicalNoteIcon,
  CameraIcon,
  AcademicCapIcon,
  GlobeAltIcon,
  TrophyIcon,
  HeartIcon,
  StarIcon,
  FlagIcon
} from '@heroicons/react/24/outline'

interface HeritageEvent {
  id: string
  year: string
  title: string
  titlePortuguese: string
  description: string
  descriptionPortuguese: string
  category: 'historical' | 'cultural' | 'educational' | 'artistic' | 'political' | 'social'
  location: string
  significance: string
  significancePortuguese: string
  relatedPrograms: string[]
  modernRelevance: string
  modernRelevancePortuguese: string
}

const PORTUGUESE_HERITAGE_TIMELINE: HeritageEvent[] = [
  {
    id: 'heritage-discoveries',
    year: '1415-1500s',
    title: 'Age of Portuguese Discoveries',
    titlePortuguese: 'Era dos Descobrimentos Portugueses',
    description: 'Portugal pioneered maritime exploration, establishing the first global empire and connecting continents through language, culture, and trade.',
    descriptionPortuguese: 'Portugal foi pioneiro na exploração marítima, estabelecendo o primeiro império global e conectando continentes através da língua, cultura e comércio.',
    category: 'historical',
    location: 'Global Portuguese Empire',
    significance: 'Established Portuguese as a global language and created the foundation for the modern Lusophone world.',
    significancePortuguese: 'Estabeleceu o português como língua global e criou a base para o mundo lusófono moderno.',
    relatedPrograms: ['Portuguese language courses', 'Cultural heritage education', 'Historical workshops'],
    modernRelevance: 'Understanding this history helps Portuguese diaspora connect with their global heritage and identity.',
    modernRelevancePortuguese: 'Compreender esta história ajuda a diáspora portuguesa a conectar-se com o seu património e identidade globais.'
  },
  {
    id: 'heritage-camoes',
    year: '1572',
    title: 'Publication of "Os Lusíadas"',
    titlePortuguese: 'Publicação de "Os Lusíadas"',
    description: 'Luís de Camões publishes Portugal\'s national epic, establishing Portuguese literary tradition and cultural identity.',
    descriptionPortuguese: 'Luís de Camões publica a epopeia nacional de Portugal, estabelecendo a tradição literária e identidade cultural portuguesa.',
    category: 'cultural',
    location: 'Portugal',
    significance: 'Created the foundational text of Portuguese literature and cultural identity, still celebrated globally.',
    significancePortuguese: 'Criou o texto fundamental da literatura e identidade cultural portuguesa, ainda celebrado mundialmente.',
    relatedPrograms: ['Portuguese literature courses', 'Cultural symposiums', 'Literary events'],
    modernRelevance: 'Instituto Camões annual symposium celebrates this literary heritage and its contemporary relevance.',
    modernRelevancePortuguese: 'O simpósio anual do Instituto Camões celebra este património literário e a sua relevância contemporânea.'
  },
  {
    id: 'heritage-fado',
    year: '1820s',
    title: 'Birth of Fado Music',
    titlePortuguese: 'Nascimento do Fado',
    description: 'Fado emerges in Lisbon\'s neighborhoods, becoming Portugal\'s most distinctive musical expression of longing and soul.',
    descriptionPortuguese: 'O Fado emerge nos bairros de Lisboa, tornando-se a expressão musical mais distintiva de Portugal de saudade e alma.',
    category: 'artistic',
    location: 'Lisbon, Portugal',
    significance: 'UNESCO recognized Fado as Intangible Cultural Heritage of Humanity in 2011.',
    significancePortuguese: 'A UNESCO reconheceu o Fado como Património Cultural Imaterial da Humanidade em 2011.',
    relatedPrograms: ['Fado masterclasses', 'Traditional music workshops', 'Cultural performances'],
    modernRelevance: 'LusoTown and Instituto Camões preserve this tradition through masterclasses and cultural events.',
    modernRelevancePortuguese: 'A LusoTown e o Instituto Camões preservam esta tradição através de masterclasses e eventos culturais.'
  },
  {
    id: 'heritage-migration-uk',
    year: '1960s-1970s',
    title: 'Major Portuguese Migration to UK',
    titlePortuguese: 'Grande Migração Portuguesa para o Reino Unido',
    description: 'Significant Portuguese migration to the UK, establishing lasting communities and cultural institutions.',
    descriptionPortuguese: 'Migração portuguesa significativa para o Reino Unido, estabelecendo comunidades duradouras e instituições culturais.',
    category: 'social',
    location: 'United Kingdom',
    significance: 'Established the foundation for the modern Portuguese community in the UK, now over 400,000 strong.',
    significancePortuguese: 'Estabeleceu a base para a comunidade portuguesa moderna no Reino Unido, agora com mais de 400.000 pessoas.',
    relatedPrograms: ['Community integration programs', 'Heritage preservation classes', 'Cultural identity workshops'],
    modernRelevance: 'These communities are the heart of LusoTown\'s mission to preserve and celebrate Portuguese heritage.',
    modernRelevancePortuguese: 'Estas comunidades são o coração da missão da LusoTown de preservar e celebrar o património português.'
  },
  {
    id: 'heritage-instituto-camoes',
    year: '1992',
    title: 'Founding of Instituto Camões',
    titlePortuguese: 'Fundação do Instituto Camões',
    description: 'Portuguese government establishes Instituto Camões to promote Portuguese language and culture worldwide.',
    descriptionPortuguese: 'O governo português estabelece o Instituto Camões para promover a língua e cultura portuguesa mundialmente.',
    category: 'educational',
    location: 'Portugal (Global Network)',
    significance: 'Created the official institutional framework for Portuguese cultural diplomacy and education.',
    significancePortuguese: 'Criou o quadro institucional oficial para a diplomacia cultural e educação portuguesa.',
    relatedPrograms: ['Official language certification', 'Teacher training', 'Cultural programming'],
    modernRelevance: 'Instituto Camões is LusoTown\'s founding strategic partner, providing official recognition and resources.',
    modernRelevancePortuguese: 'O Instituto Camões é o parceiro estratégico fundador da LusoTown, fornecendo reconhecimento e recursos oficiais.'
  },
  {
    id: 'heritage-eu-membership',
    year: '1986',
    title: 'Portugal Joins European Union',
    titlePortuguese: 'Portugal Adere à União Europeia',
    description: 'Portugal\'s EU membership transforms migration patterns and strengthens cultural exchange with the UK.',
    descriptionPortuguese: 'A adesão de Portugal à UE transforma os padrões migratórios e fortalece o intercâmbio cultural com o Reino Unido.',
    category: 'political',
    location: 'Europe',
    significance: 'Facilitated free movement and cultural exchange, strengthening Portuguese communities across Europe.',
    significancePortuguese: 'Facilitou a livre circulação e intercâmbio cultural, fortalecendo as comunidades portuguesas na Europa.',
    relatedPrograms: ['EU citizenship preparation', 'Cross-cultural programs', 'International networking'],
    modernRelevance: 'Continues to influence Portuguese community rights and cultural exchange post-Brexit.',
    modernRelevancePortuguese: 'Continua a influenciar os direitos da comunidade portuguesa e intercâmbio cultural pós-Brexit.'
  },
  {
    id: 'heritage-digital-age',
    year: '2000s-Present',
    title: 'Digital Portuguese Cultural Renaissance',
    titlePortuguese: 'Renascimento Cultural Português Digital',
    description: 'Digital platforms and social media enable global Portuguese communities to connect, preserve, and share their cultural heritage.',
    descriptionPortuguese: 'Plataformas digitais e redes sociais permitem que comunidades portuguesas globais se conectem, preservem e partilhem o seu património cultural.',
    category: 'cultural',
    location: 'Global Digital Space',
    significance: 'Revolutionizes how Portuguese heritage is preserved, transmitted, and celebrated across generations.',
    significancePortuguese: 'Revoluciona como o património português é preservado, transmitido e celebrado entre gerações.',
    relatedPrograms: ['Digital heritage projects', 'Online language courses', 'Virtual cultural events'],
    modernRelevance: 'LusoTown represents the culmination of this digital evolution, officially recognized by Instituto Camões.',
    modernRelevancePortuguese: 'A LusoTown representa o culminar desta evolução digital, oficialmente reconhecida pelo Instituto Camões.'
  },
  {
    id: 'heritage-lusotown-partnership',
    year: '2024',
    title: 'LusoTown-Instituto Camões Official Partnership',
    titlePortuguese: 'Parceria Oficial LusoTown-Instituto Camões',
    description: 'Instituto Camões officially recognizes LusoTown as the preferred digital platform for Portuguese cultural promotion in the UK.',
    descriptionPortuguese: 'O Instituto Camões reconhece oficialmente a LusoTown como a plataforma digital preferida para promoção cultural portuguesa no Reino Unido.',
    category: 'educational',
    location: 'United Kingdom',
    significance: 'Establishes the first officially recognized digital Portuguese community platform, setting a global precedent.',
    significancePortuguese: 'Estabelece a primeira plataforma digital de comunidade portuguesa oficialmente reconhecida, criando um precedente global.',
    relatedPrograms: ['All Instituto Camões programs', 'Official certification courses', 'Cultural heritage preservation'],
    modernRelevance: 'Marks a new era in Portuguese cultural preservation and community engagement through official digital recognition.',
    modernRelevancePortuguese: 'Marca uma nova era na preservação cultural portuguesa e envolvimento comunitário através do reconhecimento digital oficial.'
  }
]

const HERITAGE_CATEGORIES = [
  { id: 'all', icon: GlobeAltIcon, label: { en: 'All Heritage', pt: 'Todo o Património' } },
  { id: 'historical', icon: BookOpenIcon, label: { en: 'Historical', pt: 'Histórico' } },
  { id: 'cultural', icon: MusicalNoteIcon, label: { en: 'Cultural', pt: 'Cultural' } },
  { id: 'educational', icon: AcademicCapIcon, label: { en: 'Educational', pt: 'Educacional' } },
  { id: 'artistic', icon: CameraIcon, label: { en: 'Artistic', pt: 'Artístico' } },
  { id: 'social', icon: UsersIcon, label: { en: 'Social', pt: 'Social' } },
  { id: 'political', icon: FlagIcon, label: { en: 'Political', pt: 'Político' } }
]

export default function CulturalHeritageTimeline() {
  const { language } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null)

  const filteredEvents = selectedCategory === 'all' 
    ? PORTUGUESE_HERITAGE_TIMELINE
    : PORTUGUESE_HERITAGE_TIMELINE.filter(event => event.category === selectedCategory)

  const getCategoryColor = (category: string) => {
    const colors = {
      historical: 'primary',
      cultural: 'secondary',
      educational: 'accent',
      artistic: 'premium',
      social: 'coral',
      political: 'action'
    }
    return colors[category] || 'gray'
  }

  const getCategoryIcon = (category: string) => {
    const event = HERITAGE_CATEGORIES.find(cat => cat.id === category)
    if (!event) return BookOpenIcon
    return event.icon
  }

  return (
    <div className="bg-gradient-to-br from-white via-secondary-50/30 to-accent-50/30 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-100 via-secondary-50 to-accent-100 border border-primary-200 rounded-full px-8 py-3 shadow-lg mb-6">
            <BookOpenIcon className="w-6 h-6 text-primary-600" />
            <span className="text-sm font-bold text-primary-700">
              {language === 'pt' ? 'Património Cultural Português' : 'Portuguese Cultural Heritage'}
            </span>
            <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6 leading-tight">
            {language === 'pt' 
              ? 'Timeline do Património Português'
              : 'Portuguese Heritage Timeline'}
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
            {language === 'pt' 
              ? 'Explore a rica história e tradições culturais portuguesas que conectam comunidades globais através dos séculos, preservadas e celebradas através da nossa parceria oficial com o Instituto Camões.'
              : 'Explore the rich history and cultural traditions of Portugal that connect global communities across centuries, preserved and celebrated through our official partnership with Instituto Camões.'}
          </p>
        </div>

        {/* Category Filters */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {HERITAGE_CATEGORIES.map(category => {
              const IconComponent = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                      : 'bg-white/80 text-gray-700 hover:bg-gray-100 hover:text-primary-600 border border-gray-200'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {category.label[language]}
                </button>
              )
            })}
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-secondary-500 to-accent-500"></div>
          
          <div className="space-y-8">
            {filteredEvents.map((event, index) => {
              const IconComponent = getCategoryIcon(event.category)
              const colorClass = getCategoryColor(event.category)
              const isExpanded = expandedEvent === event.id
              
              return (
                <div key={event.id} className="relative">
                  {/* Timeline Dot */}
                  <div className={`absolute left-6 w-4 h-4 bg-${colorClass}-500 rounded-full border-4 border-white shadow-lg z-10`}></div>
                  
                  {/* Event Card */}
                  <div className="ml-20 bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg border border-white/60 overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`px-3 py-1 bg-${colorClass}-100 text-${colorClass}-700 text-sm font-bold rounded-full`}>
                              {event.year}
                            </span>
                            <span className={`px-2 py-1 bg-${colorClass}-50 text-${colorClass}-600 text-xs font-medium rounded-full`}>
                              {event.category}
                            </span>
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            {language === 'pt' ? event.titlePortuguese : event.title}
                          </h3>
                          <p className="text-gray-700 leading-relaxed">
                            {language === 'pt' ? event.descriptionPortuguese : event.description}
                          </p>
                        </div>
                        <div className={`p-3 bg-${colorClass}-100 rounded-xl`}>
                          <IconComponent className={`w-6 h-6 text-${colorClass}-600`} />
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-2">
                          <MapPinIcon className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                      
                      {/* Significance */}
                      <div className={`bg-${colorClass}-50 rounded-lg p-4 mb-4`}>
                        <h4 className={`font-medium text-${colorClass}-800 mb-2`}>
                          {language === 'pt' ? 'Significado Histórico:' : 'Historical Significance:'}
                        </h4>
                        <p className={`text-${colorClass}-700 text-sm`}>
                          {language === 'pt' ? event.significancePortuguese : event.significance}
                        </p>
                      </div>
                      
                      {/* Expand/Collapse Button */}
                      <button
                        onClick={() => setExpandedEvent(isExpanded ? null : event.id)}
                        className={`w-full bg-gradient-to-r from-${colorClass}-500 to-${colorClass}-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-${colorClass}-600 hover:to-${colorClass}-700 transition-all duration-200`}
                      >
                        {isExpanded 
                          ? (language === 'pt' ? 'Ver Menos' : 'Show Less')
                          : (language === 'pt' ? 'Ver Mais Detalhes' : 'Show More Details')
                        }
                      </button>
                      
                      {/* Expanded Content */}
                      {isExpanded && (
                        <div className="mt-6 space-y-4 border-t border-gray-200 pt-6">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">
                              {language === 'pt' ? 'Relevância Moderna:' : 'Modern Relevance:'}
                            </h4>
                            <p className="text-gray-700 text-sm">
                              {language === 'pt' ? event.modernRelevancePortuguese : event.modernRelevance}
                            </p>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">
                              {language === 'pt' ? 'Programas Relacionados:' : 'Related Programs:'}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {event.relatedPrograms.map(program => (
                                <span
                                  key={program}
                                  className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                                >
                                  {program}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-3xl p-8 text-center text-white shadow-2xl">
          <TrophyIcon className="w-16 h-16 mx-auto mb-4 opacity-90" />
          <h3 className="text-3xl font-bold mb-4">
            {language === 'pt' ? 'Preserve o Seu Património' : 'Preserve Your Heritage'}
          </h3>
          <p className="text-lg mb-8 opacity-90 max-w-3xl mx-auto">
            {language === 'pt' 
              ? 'Junte-se à LusoTown e participe na preservação e celebração ativa do património português através dos nossos programas oficiais do Instituto Camões.'
              : 'Join LusoTown and actively participate in preserving and celebrating Portuguese heritage through our official Instituto Camões programs.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <a
              href="/instituto-camoes"
              className="bg-white text-primary-600 font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
            >
              {language === 'pt' ? 'Explorar Programas' : 'Explore Programs'}
            </a>
            <a
              href="/signup"
              className="border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-white hover:text-primary-600 transition-colors"
            >
              {language === 'pt' ? 'Juntar-se Agora' : 'Join Now'}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}