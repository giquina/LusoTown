'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import CulturalHeritageTimeline from '@/components/CulturalHeritageTimeline'
import OfficialRecognitionFramework from '@/components/OfficialRecognitionFramework'
import { 
  BookOpenIcon,
  MusicalNoteIcon,
  CameraIcon,
  AcademicCapIcon,
  GlobeAltIcon,
  MapPinIcon,
  CalendarDaysIcon,
  HeartIcon,
  StarIcon,
  TrophyIcon,
  PlayIcon,
  DocumentTextIcon,
  LanguageIcon,
  FlagIcon
} from '@heroicons/react/24/outline'

interface HeritageContent {
  id: string
  title: string
  titlePortuguese: string
  description: string
  descriptionPortuguese: string
  category: 'literature' | 'music' | 'art' | 'history' | 'language' | 'traditions' | 'recipes' | 'stories'
  contentType: 'article' | 'video' | 'audio' | 'interactive' | 'document' | 'gallery'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration: string
  author: string
  authorPortuguese?: string
  publishDate: string
  culturalOrigin: 'Portugal' | 'Brazil' | 'Angola' | 'Mozambique' | 'Cape Verde' | 'Guinea-Bissau' | 'São Tomé' | 'East Timor' | 'Macau' | 'Global'
  tags: string[]
  featured: boolean
  institutoCamoesEndorsed: boolean
  downloadUrl?: string
  viewUrl?: string
  thumbnailUrl?: string
}

const HERITAGE_CONTENT: HeritageContent[] = [
  {
    id: 'content-lusiad-epic',
    title: 'Os Lusíadas: Portugal\'s National Epic',
    titlePortuguese: 'Os Lusíadas: A Epopeia Nacional de Portugal',
    description: 'Comprehensive study guide to Luís de Camões\' masterpiece, exploring its historical context, literary significance, and modern relevance to Portuguese identity.',
    descriptionPortuguese: 'Guia de estudo abrangente da obra-prima de Luís de Camões, explorando o seu contexto histórico, significado literário e relevância moderna para a identidade portuguesa.',
    category: 'literature',
    contentType: 'interactive',
    difficulty: 'intermediate',
    duration: '45 minutes',
    author: 'Instituto Camões Centre London',
    authorPortuguese: 'Centro do Instituto Camões Londres',
    publishDate: '2024-03-10',
    culturalOrigin: 'Portugal',
    tags: ['Camões', 'Epic poetry', 'Portuguese literature', 'Cultural identity', 'Maritime history'],
    featured: true,
    institutoCamoesEndorsed: true,
    viewUrl: '/heritage/lusiadas-interactive'
  },
  {
    id: 'content-fado-history',
    title: 'Fado: The Soul of Portuguese Music',
    titlePortuguese: 'Fado: A Alma da Música Portuguesa',
    description: 'Immersive audio journey through the history of Fado, featuring recordings from legendary fadistas and analysis of this UNESCO-recognized cultural treasure.',
    descriptionPortuguese: 'Jornada áudio imersiva através da história do Fado, apresentando gravações de fadistas lendários e análise deste tesouro cultural reconhecido pela UNESCO.',
    category: 'music',
    contentType: 'audio',
    difficulty: 'beginner',
    duration: '60 minutes',
    author: 'Dr. Maria João Silva',
    authorPortuguese: 'Dra. Maria João Silva',
    publishDate: '2024-02-15',
    culturalOrigin: 'Portugal',
    tags: ['Fado', 'Traditional music', 'UNESCO', 'Lisbon', 'Portuguese culture'],
    featured: true,
    institutoCamoesEndorsed: true,
    viewUrl: '/heritage/fado-journey'
  },
  {
    id: 'content-azulejo-art',
    title: 'Portuguese Azulejo: Ceramic Art Through Centuries',
    titlePortuguese: 'Azulejo Português: Arte Cerâmica Através dos Séculos',
    description: 'Visual exploration of Portuguese azulejo tile art, from Moorish influences to contemporary applications, featuring interactive galleries and historical timeline.',
    descriptionPortuguese: 'Exploração visual da arte do azulejo português, desde influências mouriscas até aplicações contemporâneas, com galerias interativas e cronologia histórica.',
    category: 'art',
    contentType: 'gallery',
    difficulty: 'beginner',
    duration: '30 minutes',
    author: 'Portuguese Cultural Heritage Society',
    authorPortuguese: 'Sociedade do Património Cultural Português',
    publishDate: '2024-01-20',
    culturalOrigin: 'Portugal',
    tags: ['Azulejo', 'Ceramic art', 'Portuguese architecture', 'Visual culture', 'Decorative arts'],
    featured: true,
    institutoCamoesEndorsed: true,
    viewUrl: '/heritage/azulejo-gallery'
  },
  {
    id: 'content-discoveries-impact',
    title: 'Portuguese Discoveries: Global Cultural Impact',
    titlePortuguese: 'Descobrimentos Portugueses: Impacto Cultural Global',
    description: 'Documentary-style exploration of how Portuguese maritime discoveries shaped global culture, language, and traditions across four continents.',
    descriptionPortuguese: 'Exploração no estilo documentário de como os descobrimentos marítimos portugueses moldaram a cultura, língua e tradições globais em quatro continentes.',
    category: 'history',
    contentType: 'video',
    difficulty: 'intermediate',
    duration: '90 minutes',
    author: 'King\'s College London - Portuguese Studies',
    authorPortuguese: 'King\'s College London - Estudos Portugueses',
    publishDate: '2024-03-05',
    culturalOrigin: 'Global',
    tags: ['Age of Discovery', 'Global history', 'Portuguese empire', 'Cultural exchange', 'Maritime history'],
    featured: true,
    institutoCamoesEndorsed: true,
    viewUrl: '/heritage/discoveries-documentary'
  },
  {
    id: 'content-brazilian-culture',
    title: 'Brazilian Cultural Contributions to Lusophone Heritage',
    titlePortuguese: 'Contribuições Culturais Brasileiras para o Património Lusófono',
    description: 'Comprehensive overview of Brazilian innovations in music, literature, cuisine, and arts that have enriched the global Portuguese-speaking cultural landscape.',
    descriptionPortuguese: 'Visão abrangente das inovações brasileiras na música, literatura, culinária e artes que enriqueceram o panorama cultural global de língua portuguesa.',
    category: 'traditions',
    contentType: 'article',
    difficulty: 'intermediate',
    duration: '40 minutes',
    author: 'Casa do Brasil London',
    authorPortuguese: 'Casa do Brasil Londres',
    publishDate: '2024-02-28',
    culturalOrigin: 'Brazil',
    tags: ['Brazilian culture', 'Carnival', 'Bossa Nova', 'Capoeira', 'Brazilian literature'],
    featured: false,
    institutoCamoesEndorsed: true,
    viewUrl: '/heritage/brazilian-contributions'
  },
  {
    id: 'content-african-lusophone',
    title: 'African Portuguese-Speaking Nations: Cultural Richness',
    titlePortuguese: 'Nações Africanas de Língua Portuguesa: Riqueza Cultural',
    description: 'Celebration of the diverse cultures, traditions, and contributions of Angola, Mozambique, Cape Verde, Guinea-Bissau, and São Tomé and Príncipe.',
    descriptionPortuguese: 'Celebração das diversas culturas, tradições e contribuições de Angola, Moçambique, Cabo Verde, Guiné-Bissau e São Tomé e Príncipe.',
    category: 'traditions',
    contentType: 'interactive',
    difficulty: 'beginner',
    duration: '50 minutes',
    author: 'African Portuguese Communities UK',
    authorPortuguese: 'Comunidades Portuguesas Africanas Reino Unido',
    publishDate: '2024-01-15',
    culturalOrigin: 'Angola',
    tags: ['African culture', 'Lusophone Africa', 'Traditional music', 'Cultural diversity', 'Portuguese language'],
    featured: false,
    institutoCamoesEndorsed: true,
    viewUrl: '/heritage/african-lusophone'
  },
  {
    id: 'content-portuguese-cuisine',
    title: 'Traditional Portuguese Recipes and Culinary Heritage',
    titlePortuguese: 'Receitas Tradicionais Portuguesas e Património Culinário',
    description: 'Interactive cookbook featuring authentic Portuguese recipes, cooking techniques, and the cultural stories behind traditional dishes from all regions.',
    descriptionPortuguese: 'Livro de culinária interativo com receitas portuguesas autênticas, técnicas culinárias e as histórias culturais por trás dos pratos tradicionais de todas as regiões.',
    category: 'recipes',
    contentType: 'interactive',
    difficulty: 'beginner',
    duration: '25 minutes per recipe',
    author: 'Portuguese Culinary Heritage Association',
    authorPortuguese: 'Associação do Património Culinário Português',
    publishDate: '2024-03-01',
    culturalOrigin: 'Portugal',
    tags: ['Portuguese cuisine', 'Traditional recipes', 'Culinary culture', 'Regional dishes', 'Food heritage'],
    featured: false,
    institutoCamoesEndorsed: false,
    viewUrl: '/heritage/portuguese-recipes'
  },
  {
    id: 'content-portuguese-language-evolution',
    title: 'Evolution of the Portuguese Language: From Latin to Global Tongue',
    titlePortuguese: 'Evolução da Língua Portuguesa: Do Latim à Língua Global',
    description: 'Linguistic journey exploring how Portuguese evolved from Latin, spread globally, and developed regional variations across Portuguese-speaking countries.',
    descriptionPortuguese: 'Jornada linguística explorando como o português evoluiu do latim, espalhou-se globalmente e desenvolveu variações regionais em países lusófonos.',
    category: 'language',
    contentType: 'article',
    difficulty: 'advanced',
    duration: '55 minutes',
    author: 'Instituto Camões Linguistics Department',
    authorPortuguese: 'Departamento de Linguística do Instituto Camões',
    publishDate: '2024-02-10',
    culturalOrigin: 'Global',
    tags: ['Portuguese language', 'Linguistics', 'Language evolution', 'Regional variations', 'Historical linguistics'],
    featured: false,
    institutoCamoesEndorsed: true,
    viewUrl: '/heritage/language-evolution'
  }
]

const HERITAGE_CATEGORIES = [
  { id: 'all', icon: GlobeAltIcon, label: { en: 'All Heritage', pt: 'Todo o Património' } },
  { id: 'literature', icon: BookOpenIcon, label: { en: 'Literature', pt: 'Literatura' } },
  { id: 'music', icon: MusicalNoteIcon, label: { en: 'Music', pt: 'Música' } },
  { id: 'art', icon: CameraIcon, label: { en: 'Art', pt: 'Arte' } },
  { id: 'history', icon: AcademicCapIcon, label: { en: 'History', pt: 'História' } },
  { id: 'language', icon: LanguageIcon, label: { en: 'Language', pt: 'Língua' } },
  { id: 'traditions', icon: HeartIcon, label: { en: 'Traditions', pt: 'Tradições' } },
  { id: 'recipes', icon: StarIcon, label: { en: 'Recipes', pt: 'Receitas' } }
]

export default function HeritagePage() {
  const { language } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showOnlyFeatured, setShowOnlyFeatured] = useState(false)
  const [showOnlyInstitutoCamoes, setShowOnlyInstitutoCamoes] = useState(false)

  let filteredContent = HERITAGE_CONTENT

  if (selectedCategory !== 'all') {
    filteredContent = filteredContent.filter(content => content.category === selectedCategory)
  }

  if (showOnlyFeatured) {
    filteredContent = filteredContent.filter(content => content.featured)
  }

  if (showOnlyInstitutoCamoes) {
    filteredContent = filteredContent.filter(content => content.institutoCamoesEndorsed)
  }

  const getContentTypeIcon = (type: string) => {
    const icons = {
      article: DocumentTextIcon,
      video: PlayIcon,
      audio: MusicalNoteIcon,
      interactive: GlobeAltIcon,
      document: BookOpenIcon,
      gallery: CameraIcon
    }
    return icons[type] || DocumentTextIcon
  }

  const getContentTypeColor = (type: string) => {
    const colors = {
      article: 'primary',
      video: 'accent',
      audio: 'secondary',
      interactive: 'premium',
      document: 'coral',
      gallery: 'action'
    }
    return colors[type] || 'gray'
  }

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      beginner: 'green',
      intermediate: 'yellow',
      advanced: 'red'
    }
    return colors[difficulty] || 'gray'
  }

  const getCulturalOriginFlag = (origin: string) => {
    // This would normally use actual flag emojis or icons
    const flags = {
      'Portugal': '🇵🇹',
      'Brazil': '🇧🇷',
      'Angola': '🇦🇴',
      'Mozambique': '🇲🇿',
      'Cape Verde': '🇨🇻',
      'Guinea-Bissau': '🇬🇼',
      'São Tomé': '🇸🇹',
      'East Timor': '🇹🇱',
      'Macau': '🇲🇴',
      'Global': '🌍'
    }
    return flags[origin] || '🌍'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-secondary-50/30 to-accent-50/30 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-100 via-secondary-50 to-accent-100 border border-primary-200 rounded-full px-8 py-3 shadow-lg mb-6">
            <BookOpenIcon className="w-6 h-6 text-primary-600" />
            <span className="text-sm font-bold text-primary-700">
              {language === 'pt' ? 'Centro de Património Cultural' : 'Cultural Heritage Hub'}
            </span>
            <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
            {language === 'pt' 
              ? 'Património Cultural Português'
              : 'Portuguese Cultural Heritage'}
          </h1>
          <p className="text-xl sm:text-2xl text-gray-700 mb-8 font-medium max-w-5xl mx-auto leading-relaxed">
            {language === 'pt' 
              ? 'Explore, aprenda e preserve a rica herança cultural portuguesa através de conteúdos autênticos endossados pelo Instituto Camões e instituições académicas de prestígio.'
              : 'Explore, learn, and preserve the rich Portuguese cultural heritage through authentic content endorsed by Instituto Camões and prestigious academic institutions.'}
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Category Filters */}
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

          {/* Additional Filters */}
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setShowOnlyFeatured(!showOnlyFeatured)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                showOnlyFeatured
                  ? 'bg-accent-500 text-white shadow-lg'
                  : 'bg-white/80 text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <StarIcon className="w-4 h-4" />
              {language === 'pt' ? 'Apenas Destacados' : 'Featured Only'}
            </button>
            
            <button
              onClick={() => setShowOnlyInstitutoCamoes(!showOnlyInstitutoCamoes)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                showOnlyInstitutoCamoes
                  ? 'bg-premium-500 text-white shadow-lg'
                  : 'bg-white/80 text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <TrophyIcon className="w-4 h-4" />
              {language === 'pt' ? 'Instituto Camões' : 'Instituto Camões'}
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredContent.map(content => {
            const IconComponent = getContentTypeIcon(content.contentType)
            const colorClass = getContentTypeColor(content.contentType)
            
            return (
              <div key={content.id} className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg border border-white/60 overflow-hidden hover:shadow-xl transition-all duration-300">
                {/* Header */}
                <div className={`bg-gradient-to-r from-${colorClass}-500 to-${colorClass}-600 text-white px-6 py-4`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <IconComponent className="w-5 h-5" />
                      <span className="font-medium text-sm uppercase tracking-wider">
                        {content.contentType}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {content.featured && <StarIcon className="w-4 h-4" />}
                      {content.institutoCamoesEndorsed && <TrophyIcon className="w-4 h-4" />}
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-900 leading-tight flex-1">
                      {language === 'pt' ? content.titlePortuguese : content.title}
                    </h3>
                    <span className="text-xl ml-3">
                      {getCulturalOriginFlag(content.culturalOrigin)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2 py-1 bg-${getDifficultyColor(content.difficulty)}-100 text-${getDifficultyColor(content.difficulty)}-700 text-xs font-medium rounded-full`}>
                      {content.difficulty}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {content.duration}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {content.culturalOrigin}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {language === 'pt' ? content.descriptionPortuguese : content.description}
                  </p>
                  
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">
                      {language === 'pt' ? 'Por:' : 'By:'} {language === 'pt' && content.authorPortuguese ? content.authorPortuguese : content.author}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(content.publishDate).toLocaleDateString(language === 'pt' ? 'pt-PT' : 'en-GB')}
                    </p>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {content.tags.slice(0, 3).map(tag => (
                        <span key={tag} className={`px-2 py-1 bg-${colorClass}-50 text-${colorClass}-700 text-xs rounded-full`}>
                          {tag}
                        </span>
                      ))}
                      {content.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-full">
                          +{content.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    {content.viewUrl && (
                      <a
                        href={content.viewUrl}
                        className={`flex-1 bg-gradient-to-r from-${colorClass}-500 to-${colorClass}-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-${colorClass}-600 hover:to-${colorClass}-700 transition-all duration-200 text-center`}
                      >
                        {language === 'pt' ? 'Explorar' : 'Explore'}
                      </a>
                    )}
                    {content.downloadUrl && (
                      <a
                        href={content.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <DocumentTextIcon className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Cultural Heritage Timeline */}
        <CulturalHeritageTimeline />

        {/* Official Recognition Framework */}
        <div className="mt-16">
          <OfficialRecognitionFramework />
        </div>
      </div>
    </div>
  )
}