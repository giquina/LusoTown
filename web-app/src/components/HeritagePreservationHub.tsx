'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { 
  BookOpenIcon,
  CameraIcon,
  MusicalNoteIcon,
  GlobeAltIcon,
  HeartIcon,
  UserGroupIcon,
  MapPinIcon,
  CalendarDaysIcon,
  AcademicCapIcon,
  BuildingLibraryIcon,
  ArchiveBoxIcon,
  PlayCircleIcon,
  MicrophoneIcon,
  DocumentTextIcon,
  PhotoIcon,
  FilmIcon,
  SpeakerWaveIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { ROUTES } from '@/config/routes'

interface HeritageProject {
  id: string
  title: string
  titlePortuguese: string
  description: string
  descriptionPortuguese: string
  category: 'oral-history' | 'digital-archive' | 'cultural-mapping' | 'language-preservation' | 'traditions' | 'genealogy'
  status: 'active' | 'completed' | 'planned'
  participants: number
  location: string
  yearStarted: string
  impact: string
  impactPortuguese: string
  outcomes: string[]
  outcomesPortuguese: string[]
  mediaType: 'audio' | 'video' | 'photos' | 'documents' | 'stories'
  partnerships: string[]
  nextSteps: string
  nextStepsPortuguese: string
}

const HERITAGE_PROJECTS: HeritageProject[] = [
  {
    id: 'oral-histories-elders',
    title: 'Voices of Wisdom: Portuguese Elder Stories',
    titlePortuguese: 'Vozes da Sabedoria: Histórias dos Anciãos Portugueses',
    description: 'Recording life stories and traditional knowledge from Portuguese-speaking community elders across London, preserving immigration narratives, cultural wisdom, and family histories for future generations.',
    descriptionPortuguese: 'Registando histórias de vida e conhecimento tradicional dos anciãos da comunidade de falantes de português em Londres, preservando narrativas de imigração, sabedoria cultural e histórias familiares para as futuras gerações.',
    category: 'oral-history',
    status: 'active',
    participants: 45,
    location: 'London-wide Portuguese Communities',
    yearStarted: '2023',
    impact: 'Preserved 150+ hours of oral histories from first-generation Portuguese immigrants, capturing irreplaceable cultural knowledge and family stories.',
    impactPortuguese: 'Preservadas 150+ horas de histórias orais de imigrantes portugueses de primeira geração, capturando conhecimento cultural insubstituível e histórias familiares.',
    outcomes: [
      'Created audio archive of 75 elder interviews',
      'Documented traditional Portuguese recipes and cooking methods',
      'Recorded stories of Portuguese immigration journeys to United Kingdom',
      'Preserved religious traditions and cultural practices',
      'Built family heritage collections for 30+ families',
      'Established Portuguese Oral History Archive at British Library'
    ],
    outcomesPortuguese: [
      'Criado arquivo áudio de 75 entrevistas com anciãos',
      'Documentadas receitas tradicionais portuguesas e métodos de culinária',
      'Registadas histórias de jornadas de imigração portuguesa para o Reino Unido',
      'Preservadas tradições religiosas e práticas culturais',
      'Construídas coleções de património familiar para 30+ famílias',
      'Estabelecido Arquivo de História Oral Portuguesa na British Library'
    ],
    mediaType: 'audio',
    partnerships: ['British Library', 'Portuguese Embassy', 'Community Centers'],
    nextSteps: 'Launch digital storytelling workshops for grandchildren to learn family stories and create multimedia presentations.',
    nextStepsPortuguese: 'Lançar workshops de storytelling digital para netos aprenderem histórias familiares e criarem apresentações multimédia.'
  },
  {
    id: 'digital-heritage-archive',
    title: 'Portuguese London Digital Heritage Archive',
    titlePortuguese: 'Arquivo Digital do Património Português de Londres',
    description: 'Comprehensive digital collection of Portuguese-speaking community artifacts, photographs, documents, and cultural materials from London\'s Portuguese history spanning 60+ years.',
    descriptionPortuguese: 'Coleção digital abrangente de artefatos da comunidade de falantes de português, fotografias, documentos e materiais culturais da história portuguesa de Londres que abrange 60+ anos.',
    category: 'digital-archive',
    status: 'active',
    participants: 120,
    location: 'Various London Portuguese Communities',
    yearStarted: '2022',
    impact: 'Digitally preserved 2,500+ historical items, creating the United Kingdom\'s most comprehensive Portuguese heritage database accessible to researchers worldwide.',
    impactPortuguese: 'Preservados digitalmente 2.500+ itens históricos, criando a base de dados de património português mais abrangente do Reino Unido, acessível a investigadores mundialmente.',
    outcomes: [
      'Digitized 1,800 historic photographs of Portuguese-speaking community events',
      'Archived 200+ Portuguese business and club documents',
      'Preserved festival posters and cultural event materials',
      'Created searchable database with multilingual descriptions',
      'Established partnerships with 12 Portuguese cultural organizations',
      'Launched online exhibition "60 Years of Portuguese London"'
    ],
    outcomesPortuguese: [
      'Digitalizadas 1.800 fotografias históricas de eventos da comunidade de falantes de português',
      'Arquivados 200+ documentos de negócios e clubes portugueses',
      'Preservados cartazes de festivais e materiais de eventos culturais',
      'Criada base de dados pesquisável com descrições multilingues',
      'Estabelecidas parcerias com 12 organizações culturais portuguesas',
      'Lançada exposição online "60 Anos de Portugal em Londres"'
    ],
    mediaType: 'photos',
    partnerships: ['Museum of London', 'Portuguese Embassy', 'Casa do Bacalhau'],
    nextSteps: 'Expand to include Portuguese business histories and develop virtual reality heritage tours of historic Portuguese London locations.',
    nextStepsPortuguese: 'Expandir para incluir histórias de negócios portugueses e desenvolver tours de património em realidade virtual de locais históricos portugueses de Londres.'
  },
  {
    id: 'language-preservation',
    title: 'Portuguese Language Preservation Initiative',
    titlePortuguese: 'Iniciativa de Preservação da Língua Portuguesa',
    description: 'Multi-generational program documenting Portuguese language variations, regional dialects, and linguistic evolution within London\'s diverse Portuguese-speaking communities.',
    descriptionPortuguese: 'Programa multigeracional documentando variações da língua portuguesa, dialetos regionais e evolução linguística dentro das diversas comunidades lusófonas de Londres.',
    category: 'language-preservation',
    status: 'active',
    participants: 85,
    location: 'Portuguese Speaking Communities London-wide',
    yearStarted: '2023',
    impact: 'Documented linguistic variations across 8 Portuguese-speaking countries represented in London, creating valuable resource for linguistic research and community education.',
    impactPortuguese: 'Documentadas variações linguísticas de 8 países lusófonos representados em Londres, criando recurso valioso para investigação linguística e educação comunitária.',
    outcomes: [
      'Recorded pronunciation guides for Portuguese regional dialects',
      'Created bilingual story collections from children',
      'Documented language mixing patterns in second-generation families',
      'Established Portuguese language library with 500+ books',
      'Launched "Portuguese Parent & Child" language sessions',
      'Developed educational materials for heritage language schools'
    ],
    outcomesPortuguese: [
      'Gravados guias de pronúncia para dialetos regionais portugueses',
      'Criadas coleções de histórias bilingues de crianças',
      'Documentados padrões de mistura linguística em famílias de segunda geração',
      'Estabelecida biblioteca portuguesa com 500+ livros',
      'Lançadas sessões de língua "Pai/Mãe & Filho Português"',
      'Desenvolvidos materiais educacionais para escolas de língua de herança'
    ],
    mediaType: 'audio',
    partnerships: ['UCL Linguistics Department', 'Portuguese Weekend Schools', 'Instituto Camões'],
    nextSteps: 'Create mobile app for Portuguese language learning using community voice recordings and develop intergenerational storytelling programs.',
    nextStepsPortuguese: 'Criar aplicação móvel para aprendizagem de português usando gravações de voz da comunidade e desenvolver programas de storytelling intergeracional.'
  },
  {
    id: 'cultural-mapping-london',
    title: 'Portuguese Cultural Mapping of London',
    titlePortuguese: 'Mapeamento Cultural Português de Londres',
    description: 'Comprehensive mapping project documenting Portuguese cultural sites, businesses, community spaces, and heritage landmarks across Greater London.',
    descriptionPortuguese: 'Projeto abrangente de mapeamento documentando locais culturais portugueses, negócios, espaços comunitários e marcos patrimoniais em toda a Grande Londres.',
    category: 'cultural-mapping',
    status: 'active',
    participants: 60,
    location: 'Greater London',
    yearStarted: '2022',
    impact: 'Mapped 300+ Portuguese cultural sites across London, creating the definitive guide to Portuguese heritage locations and community resources.',
    impactPortuguese: 'Mapeados 300+ locais culturais portugueses em Londres, criando o guia definitivo para localizações de património português e recursos comunitários.',
    outcomes: [
      'Documented 150+ Portuguese businesses with historical significance',
      'Mapped cultural venues hosting Portuguese events',
      'Identified 25 historic Portuguese settlement areas',
      'Created interactive online map with photos and stories',
      'Established heritage walking routes through Portuguese London',
      'Developed QR code heritage trail system'
    ],
    outcomesPortuguese: [
      'Documentados 150+ negócios portugueses com significado histórico',
      'Mapeados locais culturais que acolhem eventos portugueses',
      'Identificadas 25 áreas históricas de assentamento português',
      'Criado mapa online interativo com fotos e histórias',
      'Estabelecidos percursos a pé de património através da Londres portuguesa',
      'Desenvolvido sistema de trilha patrimonial com códigos QR'
    ],
    mediaType: 'photos',
    partnerships: ['Greater London Authority', 'Historic England', 'Portuguese Business Association'],
    nextSteps: 'Launch augmented reality heritage app and expand mapping to include Portuguese family cemetery plots and memorial sites.',
    nextStepsPortuguese: 'Lançar aplicação de património em realidade aumentada e expandir mapeamento para incluir lotes de cemitério de famílias portuguesas e locais memoriais.'
  },
  {
    id: 'traditions-festivals',
    title: 'Living Traditions: Portuguese Festival Documentation',
    titlePortuguese: 'Tradições Vivas: Documentação de Festivais Portugueses',
    description: 'Video documentary project capturing Portuguese traditional festivals, religious celebrations, and cultural practices as they evolve within London\'s multicultural environment.',
    descriptionPortuguese: 'Projeto de documentário em vídeo capturando festivais tradicionais portugueses, celebrações religiosas e práticas culturais conforme evoluem no ambiente multicultural de Londres.',
    category: 'traditions',
    status: 'active',
    participants: 75,
    location: 'Portuguese-speaking community Centers & Churches',
    yearStarted: '2023',
    impact: 'Documented 12 major Portuguese festivals and celebrations, preserving traditional practices while showing cultural adaptation in London context.',
    impactPortuguese: 'Documentados 12 grandes festivais e celebrações portugueses, preservando práticas tradicionais enquanto mostra adaptação cultural no contexto londrino.',
    outcomes: [
      'Filmed Santos Populares celebrations across 5 London venues',
      'Documented Portuguese Easter and Christmas traditions',
      'Recorded traditional Portuguese wedding customs',
      'Captured Fado performance traditions in London',
      'Created educational videos for Portuguese cultural schools',
      'Established annual documentary film festival'
    ],
    outcomesPortuguese: [
      'Filmados Santos Populares em 5 locais de Londres',
      'Documentadas tradições portuguesas de Páscoa e Natal',
      'Gravados costumes tradicionais de casamento português',
      'Capturadas tradições de performance de Fado em Londres',
      'Criados vídeos educacionais para escolas culturais portuguesas',
      'Estabelecido festival anual de cinema documentário'
    ],
    mediaType: 'video',
    partnerships: ['Portuguese Churches', 'Cultural Associations', 'Documentary Film Society'],
    nextSteps: 'Create virtual reality experiences of Portuguese festivals and develop community-led storytelling workshops for youth.',
    nextStepsPortuguese: 'Criar experiências de realidade virtual de festivais portugueses e desenvolver workshops de storytelling liderados pela comunidade para jovens.'
  },
  {
    id: 'genealogy-project',
    title: 'Portuguese Family Roots Genealogy Project',
    titlePortuguese: 'Projeto de Genealogia Raízes Familiares Portuguesas',
    description: 'Collaborative genealogy research helping Portuguese families trace their heritage, connect with relatives, and document family histories for preservation.',
    descriptionPortuguese: 'Pesquisa genealógica colaborativa ajudando famílias portuguesas a rastrear o seu património, conectar com parentes e documentar histórias familiares para preservação.',
    category: 'genealogy',
    status: 'active',
    participants: 95,
    location: 'Community-wide with Portugal connections',
    yearStarted: '2022',
    impact: 'Helped 80+ families trace their Portuguese ancestry, reconnect with homeland communities, and document multi-generational family stories.',
    impactPortuguese: 'Ajudadas 80+ famílias a rastrear a sua ascendência portuguesa, reconectar com comunidades da pátria e documentar histórias familiares multigeracionais.',
    outcomes: [
      'Connected families with Portuguese village records',
      'Documented immigration stories of 200+ individuals',
      'Created family trees spanning 4-5 generations',
      'Facilitated reunions between London and Portugal families',
      'Digitized family photographs and documents',
      'Established connections with Portuguese parish records'
    ],
    outcomesPortuguese: [
      'Conectadas famílias com registos de aldeias portuguesas',
      'Documentadas histórias de imigração de 200+ indivíduos',
      'Criadas árvores genealógicas abrangendo 4-5 gerações',
      'Facilitados reencontros entre famílias de Londres e Portugal',
      'Digitalizadas fotografias e documentos familiares',
      'Estabelecidas conexões com registos paroquiais portugueses'
    ],
    mediaType: 'documents',
    partnerships: ['Portuguese National Archives', 'Family History Society', 'Parish Churches'],
    nextSteps: 'Launch DNA heritage matching program and create digital family heritage books for each participating family.',
    nextStepsPortuguese: 'Lançar programa de correspondência de património DNA e criar livros digitais de património familiar para cada família participante.'
  }
]

const CATEGORY_CONFIG = {
  'oral-history': {
    icon: MicrophoneIcon,
    color: 'primary',
    labelEn: 'Oral History',
    labelPt: 'História Oral'
  },
  'digital-archive': {
    icon: ArchiveBoxIcon,
    color: 'secondary',
    labelEn: 'Digital Archive',
    labelPt: 'Arquivo Digital'
  },
  'cultural-mapping': {
    icon: MapPinIcon,
    color: 'accent',
    labelEn: 'Cultural Mapping',
    labelPt: 'Mapeamento Cultural'
  },
  'language-preservation': {
    icon: SpeakerWaveIcon,
    color: 'premium',
    labelEn: 'Language Preservation',
    labelPt: 'Preservação Linguística'
  },
  'traditions': {
    icon: FilmIcon,
    color: 'coral',
    labelEn: 'Living Traditions',
    labelPt: 'Tradições Vivas'
  },
  'genealogy': {
    icon: DocumentTextIcon,
    color: 'action',
    labelEn: 'Family Heritage',
    labelPt: 'Património Familiar'
  }
}

export default function HeritagePreservationHub() {
  const { language } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedProject, setSelectedProject] = useState<string | null>(null)

  const filteredProjects = selectedCategory === 'all' 
    ? HERITAGE_PROJECTS
    : HERITAGE_PROJECTS.filter(project => project.category === selectedCategory)

  const getCategoryStats = () => {
    const stats = {
      totalProjects: HERITAGE_PROJECTS.length,
      totalParticipants: HERITAGE_PROJECTS.reduce((sum, project) => sum + project.participants, 0),
      activeProjects: HERITAGE_PROJECTS.filter(p => p.status === 'active').length,
      completedProjects: HERITAGE_PROJECTS.filter(p => p.status === 'completed').length
    }
    return stats
  }

  const stats = getCategoryStats()

  return (
    <section className="py-20 bg-gradient-to-br from-white via-secondary-50/30 to-accent-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-100 via-secondary-50 to-accent-100 border border-primary-200 rounded-full px-8 py-3 shadow-lg mb-6">
            <BuildingLibraryIcon className="w-6 h-6 text-primary-600" />
            <span className="text-sm font-bold text-primary-700">
              {language === 'pt' ? 'Centro de Preservação do Património' : 'Heritage Preservation Hub'}
            </span>
            <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6 leading-tight">
            {language === 'pt' 
              ? 'Preservando a Nossa Herança Portuguesa'
              : 'Preserving Our Portuguese Heritage'}
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
            {language === 'pt' 
              ? 'Projetos comunitários ativos preservando histórias, tradições e cultura portuguesa para as futuras gerações através de iniciativas colaborativas inovadoras.'
              : 'Active community projects preserving Portuguese stories, traditions, and culture for future generations through innovative collaborative initiatives.'}
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/50">
            <div className="text-3xl font-bold text-primary-600 mb-2">{stats.totalProjects}</div>
            <div className="text-sm text-gray-600">
              {language === 'pt' ? 'Projetos Ativos' : 'Active Projects'}
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/50">
            <div className="text-3xl font-bold text-secondary-600 mb-2">{stats.totalParticipants}+</div>
            <div className="text-sm text-gray-600">
              {language === 'pt' ? 'Participantes' : 'Participants'}
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/50">
            <div className="text-3xl font-bold text-accent-600 mb-2">2,500+</div>
            <div className="text-sm text-gray-600">
              {language === 'pt' ? 'Itens Preservados' : 'Items Preserved'}
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/50">
            <div className="text-3xl font-bold text-coral-600 mb-2">60+</div>
            <div className="text-sm text-gray-600">
              {language === 'pt' ? 'Anos de História' : 'Years of History'}
            </div>
          </div>
        </motion.div>

        {/* Category Filters */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                  : 'bg-white/80 text-gray-700 hover:bg-gray-100 hover:text-primary-600 border border-gray-200'
              }`}
            >
              <GlobeAltIcon className="w-4 h-4" />
              {language === 'pt' ? 'Todos os Projetos' : 'All Projects'}
            </button>
            {Object.entries(CATEGORY_CONFIG).map(([key, config]) => {
              const IconComponent = config.icon
              return (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    selectedCategory === key
                      ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                      : 'bg-white/80 text-gray-700 hover:bg-gray-100 hover:text-primary-600 border border-gray-200'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {language === 'pt' ? config.labelPt : config.labelEn}
                </button>
              )
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {filteredProjects.map((project, index) => {
            const categoryConfig = CATEGORY_CONFIG[project.category]
            const IconComponent = categoryConfig.icon
            const isExpanded = selectedProject === project.id

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg border border-white/60 overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                {/* Project Header */}
                <div className={`bg-gradient-to-r from-${categoryConfig.color}-500 to-${categoryConfig.color}-600 p-6 text-white`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`px-3 py-1 bg-white/20 text-white text-sm font-bold rounded-full`}>
                          {project.status === 'active' ? (language === 'pt' ? 'Ativo' : 'Active') : 
                           project.status === 'completed' ? (language === 'pt' ? 'Concluído' : 'Completed') :
                           (language === 'pt' ? 'Planejado' : 'Planned')}
                        </span>
                        <span className="px-2 py-1 bg-white/20 text-white text-xs font-medium rounded-full">
                          {project.yearStarted}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold mb-2">
                        {language === 'pt' ? project.titlePortuguese : project.title}
                      </h3>
                      <p className="text-sm opacity-90 mb-3">
                        {language === 'pt' ? project.descriptionPortuguese : project.description}
                      </p>
                    </div>
                    <div className="p-3 bg-white/20 rounded-xl">
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <UserGroupIcon className="w-4 h-4" />
                        <span className="font-medium">
                          {language === 'pt' ? 'Participantes:' : 'Participants:'}
                        </span>
                      </div>
                      <span className="text-lg font-bold">{project.participants}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <MapPinIcon className="w-4 h-4" />
                        <span className="font-medium">
                          {language === 'pt' ? 'Local:' : 'Location:'}
                        </span>
                      </div>
                      <span className="text-sm">{project.location}</span>
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  {/* Impact */}
                  <div className={`bg-${categoryConfig.color}-50 rounded-lg p-4 mb-6`}>
                    <h4 className={`font-medium text-${categoryConfig.color}-800 mb-2 flex items-center gap-2`}>
                      <HeartIcon className="w-4 h-4" />
                      {language === 'pt' ? 'Impacto:' : 'Impact:'}
                    </h4>
                    <p className={`text-${categoryConfig.color}-700 text-sm`}>
                      {language === 'pt' ? project.impactPortuguese : project.impact}
                    </p>
                  </div>

                  {/* Expand/Collapse Button */}
                  <button
                    onClick={() => setSelectedProject(isExpanded ? null : project.id)}
                    className={`w-full bg-gradient-to-r from-${categoryConfig.color}-500 to-${categoryConfig.color}-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-${categoryConfig.color}-600 hover:to-${categoryConfig.color}-700 transition-all duration-200`}
                  >
                    {isExpanded 
                      ? (language === 'pt' ? 'Ver Menos' : 'Show Less')
                      : (language === 'pt' ? 'Ver Detalhes' : 'View Details')
                    }
                  </button>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-6 space-y-4 border-t border-gray-200 pt-6"
                    >
                      {/* Outcomes */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                          <AcademicCapIcon className="w-4 h-4" />
                          {language === 'pt' ? 'Resultados Alcançados:' : 'Outcomes Achieved:'}
                        </h4>
                        <ul className="space-y-2">
                          {(language === 'pt' ? project.outcomesPortuguese : project.outcomes).map((outcome, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                              <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                              {outcome}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Partnerships */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          {language === 'pt' ? 'Parcerias:' : 'Partnerships:'}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.partnerships.map(partner => (
                            <span
                              key={partner}
                              className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                            >
                              {partner}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Next Steps */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          {language === 'pt' ? 'Próximos Passos:' : 'Next Steps:'}
                        </h4>
                        <p className="text-gray-700 text-sm">
                          {language === 'pt' ? project.nextStepsPortuguese : project.nextSteps}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-3xl p-8 text-center text-white shadow-2xl">
            <BuildingLibraryIcon className="w-16 h-16 mx-auto mb-4 opacity-90" />
            <h3 className="text-3xl font-bold mb-4">
              {language === 'pt' ? 'Contribua para a Preservação' : 'Contribute to Preservation'}
            </h3>
            <p className="text-lg mb-8 opacity-90 max-w-3xl mx-auto">
              {language === 'pt' 
                ? 'Junte-se aos nossos projetos de preservação do património e ajude a documentar, preservar e celebrar a rica herança cultural portuguesa para as futuras gerações.'
                : 'Join our heritage preservation projects and help document, preserve, and celebrate rich Portuguese cultural heritage for future generations.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <a
                href={ROUTES.signup}
                className="bg-white text-primary-600 font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
              >
                {language === 'pt' ? 'Participar Agora' : 'Get Involved'}
              </a>
              <a
                href={ROUTES.contact}
                className="border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-white hover:text-primary-600 transition-colors"
              >
                {language === 'pt' ? 'Saber Mais' : 'Learn More'}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}