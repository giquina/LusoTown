'use client'

import React, { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { 
  BuildingLibraryIcon,
  GlobeAltIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  StarIcon,
  UsersIcon,
  CalendarDaysIcon,
  AcademicCapIcon,
  HeartIcon,
  CheckBadgeIcon,
  FlagIcon,
  SparklesIcon,
  TrophyIcon,
  ClockIcon,
  CurrencyPoundIcon,
  LinkIcon,
  BookOpenIcon,
  LanguageIcon,
  GiftIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'

interface InstitutoCamoesProgram {
  id: string
  name: string
  namePortuguese: string
  description: string
  descriptionPortuguese: string
  level: 'beginner' | 'intermediate' | 'advanced' | 'all'
  duration: string
  frequency: string
  cost: string
  targetAudience: string[]
  nextStartDate: string
  benefits: string[]
}

interface CulturalEvent {
  id: string
  title: string
  titlePortuguese: string
  description: string
  descriptionPortuguese: string
  date: string
  time: string
  location: string
  type: 'lecture' | 'workshop' | 'exhibition' | 'performance' | 'conference' | 'film'
  price: number
  capacity: number
  registrationLink: string
  culturalSignificance: string
}

interface EducationalResource {
  id: string
  title: string
  titlePortuguese: string
  description: string
  descriptionPortuguese: string
  type: 'book' | 'audio' | 'video' | 'digital' | 'document'
  category: 'language' | 'literature' | 'history' | 'culture' | 'business'
  level: 'beginner' | 'intermediate' | 'advanced'
  accessType: 'free' | 'member' | 'premium'
  downloadUrl?: string
  externalUrl?: string
}

const INSTITUTO_CAMOES_PROGRAMS: InstitutoCamoesProgram[] = [
  {
    id: 'prog-portuguese-adults',
    name: 'Portuguese for Adults - Complete Course',
    namePortuguese: 'Português para Adultos - Curso Completo',
    description: 'Comprehensive Portuguese language course for adult learners, from complete beginners to advanced speakers. Aligned with the Common European Framework of Reference for Languages (CEFR).',
    descriptionPortuguese: 'Curso abrangente de língua portuguesa para adultos, desde iniciantes completos até falantes avançados. Alinhado com o Quadro Europeu Comum de Referência para as Línguas (QECR).',
    level: 'all',
    duration: '30 weeks',
    frequency: 'Weekly (3 hours)',
    cost: '£420 per level',
    targetAudience: ['Adults 18+', 'Professionals', 'Heritage speakers'],
    nextStartDate: '2024-09-16',
    benefits: [
      'Official Instituto Camões certification',
      'Access to digital learning platform',
      'Cultural immersion activities',
      'One-on-one tutoring sessions',
      'Portuguese citizenship preparation'
    ]
  },
  {
    id: 'prog-business-portuguese',
    name: 'Business Portuguese Certificate',
    namePortuguese: 'Certificado de Português Empresarial',
    description: 'Specialized Portuguese language course for business professionals working with Portuguese-speaking markets. Focus on business communication, formal writing, and professional networking.',
    descriptionPortuguese: 'Curso especializado de língua portuguesa para profissionais que trabalham com mercados lusófonos. Foco em comunicação empresarial, escrita formal e networking profissional.',
    level: 'intermediate',
    duration: '20 weeks',
    frequency: 'Weekly (2 hours)',
    cost: '£380 per course',
    targetAudience: ['Business professionals', 'Entrepreneurs', 'Finance workers'],
    nextStartDate: '2024-10-07',
    benefits: [
      'Professional certification recognized in Portugal and Brazil',
      'Business networking opportunities',
      'Industry-specific vocabulary',
      'Case study methodology',
      'Career advancement support'
    ]
  },
  {
    id: 'prog-heritage-weekend',
    name: 'Portuguese Heritage Weekend School',
    namePortuguese: 'Escola de Fim de Semana de Património Português',
    description: 'Weekend Portuguese language and culture classes for children of Portuguese heritage. Comprehensive program covering language, history, traditions, and cultural identity.',
    descriptionPortuguese: 'Aulas de língua e cultura portuguesa aos fins de semana para crianças de herança portuguesa. Programa abrangente cobrindo língua, história, tradições e identidade cultural.',
    level: 'all',
    duration: 'Academic year (September-July)',
    frequency: 'Saturday mornings (3 hours)',
    cost: '£180 per term',
    targetAudience: ['Children 5-16', 'Portuguese heritage families'],
    nextStartDate: '2024-09-07',
    benefits: [
      'Cultural identity preservation',
      'Portuguese citizenship qualification preparation',
      'Traditional Portuguese celebrations participation',
      'Peer community building',
      'Portuguese family integration support'
    ]
  },
  {
    id: 'prog-teacher-training',
    name: 'Portuguese Teacher Training & Certification',
    namePortuguese: 'Formação e Certificação de Professores de Português',
    description: 'Professional development program for Portuguese language teachers. Covers modern teaching methodologies, cultural competency, and official certification pathways.',
    descriptionPortuguese: 'Programa de desenvolvimento profissional para professores de língua portuguesa. Cobre metodologias de ensino modernas, competência cultural e caminhos de certificação oficial.',
    level: 'advanced',
    duration: '12 weeks',
    frequency: 'Intensive weekends',
    cost: '£650 per certification',
    targetAudience: ['Language teachers', 'Education professionals', 'Advanced speakers'],
    nextStartDate: '2024-11-02',
    benefits: [
      'Official Instituto Camões teacher certification',
      'Access to exclusive teaching resources',
      'Professional networking with educators',
      'Continuing education credits',
      'Career placement assistance'
    ]
  },
  {
    id: 'prog-citizenship-preparation',
    name: 'Portuguese Citizenship Language Test Preparation',
    namePortuguese: 'Preparação para Teste de Língua para Cidadania Portuguesa',
    description: 'Intensive preparation course for the Portuguese language proficiency test required for citizenship applications. Covers all aspects of the official examination.',
    descriptionPortuguese: 'Curso intensivo de preparação para o teste de proficiência em língua portuguesa exigido para pedidos de cidadania. Cobre todos os aspectos do exame oficial.',
    level: 'intermediate',
    duration: '8 weeks',
    frequency: 'Twice weekly (2 hours)',
    cost: '£320 per course',
    targetAudience: ['Citizenship applicants', 'Heritage speakers', 'Long-term residents'],
    nextStartDate: '2024-08-26',
    benefits: [
      'Official test simulation and practice',
      'Document preparation assistance',
      'Legal consultation referrals',
      'Citizenship application guidance',
      'Success guarantee program'
    ]
  }
]

const CULTURAL_EVENTS: CulturalEvent[] = [
  {
    id: 'event-camoes-symposium',
    title: 'Luís de Camões International Symposium',
    titlePortuguese: 'Simpósio Internacional Luís de Camões',
    description: 'Annual academic symposium celebrating the life and works of Portugal\'s national poet, featuring international scholars and literary experts.',
    descriptionPortuguese: 'Simpósio académico anual celebrando a vida e obra do poeta nacional de Portugal, com académicos internacionais e especialistas literários.',
    date: '2024-06-10',
    time: '14:00',
    location: 'King\'s College London - Virginia Woolf Building',
    type: 'conference',
    price: 0,
    capacity: 120,
    registrationLink: 'https://instituto-camoes.pt/symposium',
    culturalSignificance: 'Celebrates Portugal\'s greatest literary figure and reinforces Portuguese cultural identity in the diaspora.'
  },
  {
    id: 'event-fado-masterclass',
    title: 'Fado: The Soul of Portugal - Masterclass',
    titlePortuguese: 'Fado: A Alma de Portugal - Masterclass',
    description: 'Immersive masterclass exploring the history, technique, and cultural significance of Fado, Portugal\'s UNESCO-recognized musical tradition.',
    descriptionPortuguese: 'Masterclass imersiva explorando a história, técnica e significado cultural do Fado, tradição musical portuguesa reconhecida pela UNESCO.',
    date: '2024-07-15',
    time: '19:00',
    location: 'Instituto Camões Centre',
    type: 'workshop',
    price: 25,
    capacity: 40,
    registrationLink: 'https://instituto-camoes.pt/fado-masterclass',
    culturalSignificance: 'Preserves and transmits Portugal\'s most iconic musical tradition to new generations.'
  },
  {
    id: 'event-portuguese-cinema',
    title: 'Contemporary Portuguese Cinema Festival',
    titlePortuguese: 'Festival de Cinema Português Contemporâneo',
    description: 'Three-day festival showcasing the best of contemporary Portuguese filmmaking, with director Q&As and cultural discussions.',
    descriptionPortuguese: 'Festival de três dias apresentando o melhor do cinema português contemporâneo, com sessões de perguntas e respostas com diretores e discussões culturais.',
    date: '2024-09-20',
    time: '18:00',
    location: 'King\'s College London - Cinema',
    type: 'film',
    price: 12,
    capacity: 80,
    registrationLink: 'https://instituto-camoes.pt/cinema-festival',
    culturalSignificance: 'Promotes Portuguese artistic expression and cultural dialogue through contemporary visual narratives.'
  },
  {
    id: 'event-heritage-preservation',
    title: 'Portuguese Heritage Preservation Workshop',
    titlePortuguese: 'Workshop de Preservação do Património Português',
    description: 'Hands-on workshop teaching traditional Portuguese crafts, cooking techniques, and cultural preservation methods.',
    descriptionPortuguese: 'Workshop prático ensinando artesanato tradicional português, técnicas culinárias e métodos de preservação cultural.',
    date: '2024-08-03',
    time: '10:00',
    location: 'Instituto Camões Centre',
    type: 'workshop',
    price: 35,
    capacity: 25,
    registrationLink: 'https://instituto-camoes.pt/heritage-workshop',
    culturalSignificance: 'Ensures traditional Portuguese cultural practices are maintained and transmitted to future generations.'
  },
  {
    id: 'event-lusophone-literature',
    title: 'Lusophone Literature: Voices Across Continents',
    titlePortuguese: 'Literatura Lusófona: Vozes Através dos Continentes',
    description: 'Literary evening featuring readings and discussions with authors from Portugal, Brazil, Angola, Mozambique, and other Portuguese-speaking nations.',
    descriptionPortuguese: 'Noite literária com leituras e discussões com autores de Portugal, Brasil, Angola, Moçambique e outras nações lusófonas.',
    date: '2024-10-12',
    time: '18:30',
    location: 'Instituto Camões Centre',
    type: 'lecture',
    price: 15,
    capacity: 60,
    registrationLink: 'https://instituto-camoes.pt/lusophone-literature',
    culturalSignificance: 'Celebrates the diversity and richness of Portuguese-language literature across the global Portuguese-speaking community.'
  }
]

const EDUCATIONAL_RESOURCES: EducationalResource[] = [
  {
    id: 'resource-digital-library',
    title: 'Digital Portuguese Library Access',
    titlePortuguese: 'Acesso à Biblioteca Digital Portuguesa',
    description: 'Comprehensive digital library with over 10,000 Portuguese books, academic papers, historical documents, and multimedia resources.',
    descriptionPortuguese: 'Biblioteca digital abrangente com mais de 10.000 livros portugueses, artigos académicos, documentos históricos e recursos multimédia.',
    type: 'digital',
    category: 'literature',
    level: 'all',
    accessType: 'member',
    externalUrl: 'https://biblioteca.instituto-camoes.pt'
  },
  {
    id: 'resource-pronunciation-guide',
    title: 'Portuguese Pronunciation & Phonetics Guide',
    titlePortuguese: 'Guia de Pronúncia e Fonética Portuguesa',
    description: 'Interactive audio guide covering Portuguese pronunciation patterns, regional accents, and phonetic variations across Portuguese-speaking countries.',
    descriptionPortuguese: 'Guia áudio interativo cobrindo padrões de pronúncia portuguesa, sotaques regionais e variações fonéticas em países lusófonos.',
    type: 'audio',
    category: 'language',
    level: 'beginner',
    accessType: 'free',
    downloadUrl: 'https://instituto-camoes.pt/pronunciation-guide'
  },
  {
    id: 'resource-business-toolkit',
    title: 'Portuguese Business Communication Toolkit',
    titlePortuguese: 'Kit de Comunicação Empresarial Portuguesa',
    description: 'Professional business Portuguese templates, formal letter writing guides, and industry-specific vocabulary for commercial contexts.',
    descriptionPortuguese: 'Modelos de português empresarial profissional, guias de escrita de cartas formais e vocabulário específico da indústria para contextos comerciais.',
    type: 'document',
    category: 'business',
    level: 'intermediate',
    accessType: 'premium',
    downloadUrl: 'https://instituto-camoes.pt/business-toolkit'
  },
  {
    id: 'resource-cultural-calendar',
    title: 'Portuguese Cultural Heritage Calendar',
    titlePortuguese: 'Calendário do Património Cultural Português',
    description: 'Annual calendar featuring Portuguese cultural celebrations, historical commemorations, and traditional festivals across all Portuguese-speaking nations.',
    descriptionPortuguese: 'Calendário anual com celebrações culturais portuguesas, comemorações históricas e festivais tradicionais em todas as nações lusófonas.',
    type: 'digital',
    category: 'culture',
    level: 'all',
    accessType: 'free',
    externalUrl: 'https://instituto-camoes.pt/cultural-calendar'
  },
  {
    id: 'resource-citizenship-guide',
    title: 'Portuguese Citizenship Application Guide',
    titlePortuguese: 'Guia de Candidatura à Cidadania Portuguesa',
    description: 'Comprehensive guide covering all aspects of Portuguese citizenship applications, including legal requirements, documentation, and language proficiency standards.',
    descriptionPortuguese: 'Guia abrangente cobrindo todos os aspectos dos pedidos de cidadania portuguesa, incluindo requisitos legais, documentação e padrões de proficiência linguística.',
    type: 'document',
    category: 'language',
    level: 'intermediate',
    accessType: 'member',
    downloadUrl: 'https://instituto-camoes.pt/citizenship-guide'
  }
]

export default function InstitutoCamoes() {
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState<'overview' | 'programs' | 'events' | 'resources'>('overview')
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null)

  const t = (key: string) => {
    const translations = {
      'page.title': {
        en: 'Instituto Camões Official Partnership',
        pt: 'Parceria Oficial Instituto Camões'
      },
      'page.subtitle': {
        en: 'LusoTown London\'s Strategic Partnership with Portugal\'s Premier Cultural Institution',
        pt: 'Parceria Estratégica da LusoTown London com a Principal Instituição Cultural de Portugal'
      },
      'official.badge': {
        en: 'Official Government Partnership',
        pt: 'Parceria Oficial do Governo'
      },
      'nav.overview': { en: 'Partnership Overview', pt: 'Visão Geral da Parceria' },
      'nav.programs': { en: 'Educational Programs', pt: 'Programas Educacionais' },
      'nav.events': { en: 'Cultural Events', pt: 'Eventos Culturais' },
      'nav.resources': { en: 'Learning Resources', pt: 'Recursos de Aprendizagem' },
      'partnership.title': {
        en: 'Official Recognition as UK\'s Premier Portuguese Community Platform',
        pt: 'Reconhecimento Oficial como Principal Plataforma da Comunidade Portuguesa no Reino Unido'
      },
      'partnership.description': {
        en: 'LusoTown London has been officially recognized by Instituto Camões as the preferred digital platform for Portuguese cultural promotion and community engagement in the United Kingdom. This strategic partnership establishes LusoTown as the authoritative hub for Portuguese language, culture, and community services.',
        pt: 'A LusoTown London foi oficialmente reconhecida pelo Instituto Camões como a plataforma digital preferida para promoção cultural portuguesa e envolvimento comunitário no Reino Unido. Esta parceria estratégica estabelece a LusoTown como o centro autorizado para língua, cultura e serviços comunitários portugueses.'
      },
      'benefits.title': { en: 'Exclusive Member Benefits', pt: 'Benefícios Exclusivos para Membros' },
      'stats.courses': { en: 'Language Courses', pt: 'Cursos de Língua' },
      'stats.events': { en: 'Cultural Events', pt: 'Eventos Culturais' },
      'stats.resources': { en: 'Digital Resources', pt: 'Recursos Digitais' },
      'stats.members': { en: 'Active Members', pt: 'Membros Ativos' },
      'cta.join': { en: 'Join LusoTown & Access All Benefits', pt: 'Junte-se à LusoTown e Acesse Todos os Benefícios' },
      'cta.learn': { en: 'Learn More About Programs', pt: 'Saiba Mais Sobre os Programas' }
    }
    
    return translations[key]?.[language] || key
  }

  const formatPrice = (price: number) => {
    return price === 0 ? (language === 'pt' ? 'Gratuito' : 'Free') : `£${price}`
  }

  const getAccessTypeLabel = (type: 'free' | 'member' | 'premium') => {
    const labels = {
      free: { en: 'Free Access', pt: 'Acesso Gratuito' },
      member: { en: 'Members Only', pt: 'Apenas Membros' },
      premium: { en: 'Premium Access', pt: 'Acesso Premium' }
    }
    return labels[type][language]
  }

  const getLevelLabel = (level: string) => {
    const labels = {
      beginner: { en: 'Beginner', pt: 'Iniciante' },
      intermediate: { en: 'Intermediate', pt: 'Intermédio' },
      advanced: { en: 'Advanced', pt: 'Avançado' },
      all: { en: 'All Levels', pt: 'Todos os Níveis' }
    }
    return labels[level]?.[language] || level
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-secondary-50/30 to-accent-50/30 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-100 via-secondary-50 to-accent-100 border border-primary-200 rounded-full px-8 py-3 shadow-lg mb-6">
            <ShieldCheckIcon className="w-6 h-6 text-primary-600" />
            <span className="text-sm font-bold text-primary-700">{t('official.badge')}</span>
            <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
            {t('page.title')}
          </h1>
          <p className="text-xl sm:text-2xl text-gray-700 mb-8 font-medium max-w-5xl mx-auto leading-relaxed">
            {t('page.subtitle')}
          </p>
          
          {/* Partnership Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-8">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/60">
              <div className="text-3xl font-bold text-primary-600 mb-2">15+</div>
              <div className="text-sm text-gray-600">{t('stats.courses')}</div>
            </div>
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/60">
              <div className="text-3xl font-bold text-secondary-600 mb-2">50+</div>
              <div className="text-sm text-gray-600">{t('stats.events')}</div>
            </div>
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/60">
              <div className="text-3xl font-bold text-accent-600 mb-2">1000+</div>
              <div className="text-sm text-gray-600">{t('stats.resources')}</div>
            </div>
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/60">
              <div className="text-3xl font-bold text-premium-600 mb-2">5000+</div>
              <div className="text-sm text-gray-600">{t('stats.members')}</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center bg-white/80 backdrop-blur-lg rounded-2xl p-2 shadow-lg border border-white/60">
            {['overview', 'programs', 'events', 'resources'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-primary-600'
                }`}
              >
                {t(`nav.${tab}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        {activeTab === 'overview' && (
          <div className="space-y-12">
            {/* Partnership Overview */}
            <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/60">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    {t('partnership.title')}
                  </h2>
                  <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                    {t('partnership.description')}
                  </p>
                  
                  {/* Key Partnership Points */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckBadgeIcon className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {language === 'pt' ? 'Reconhecimento Oficial do Governo Português' : 'Official Portuguese Government Recognition'}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {language === 'pt' 
                            ? 'Endossado pelo Instituto Camões e pela Embaixada Portuguesa no Reino Unido.'
                            : 'Endorsed by Instituto Camões and the Portuguese Embassy in the UK.'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <AcademicCapIcon className="w-6 h-6 text-secondary-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {language === 'pt' ? 'Programas Educacionais Certificados' : 'Certified Educational Programs'}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {language === 'pt' 
                            ? 'Acesso exclusivo a cursos de língua portuguesa certificados e recursos culturais.'
                            : 'Exclusive access to certified Portuguese language courses and cultural resources.'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <GlobeAltIcon className="w-6 h-6 text-accent-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {language === 'pt' ? 'Plataforma Comunitária Autorizada' : 'Authoritative Community Platform'}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {language === 'pt' 
                            ? 'Única plataforma digital reconhecida para a comunidade portuguesa no Reino Unido.'
                            : 'The only recognized digital platform for the Portuguese community in the UK.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-6">
                  <div className="text-center">
                    <BuildingLibraryIcon className="w-20 h-20 text-primary-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Instituto Camões</h3>
                    <p className="text-gray-600 mb-4">
                      {language === 'pt' ? 'Instituto oficial da língua e cultura portuguesa' : 'Official institute for Portuguese language and culture'}
                    </p>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div className="flex items-center justify-center gap-2">
                        <MapPinIcon className="w-4 h-4" />
                        <span>King's College London</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <CalendarDaysIcon className="w-4 h-4" />
                        <span>{language === 'pt' ? '30 anos no Reino Unido' : '30 years in the UK'}</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <UsersIcon className="w-4 h-4" />
                        <span>{language === 'pt' ? '5,000+ estudantes' : '5,000+ students'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Member Benefits */}
            <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/60">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                {t('benefits.title')}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 border border-primary-200">
                  <GiftIcon className="w-8 h-8 text-primary-600 mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {language === 'pt' ? 'Descontos em Cursos' : 'Course Discounts'}
                  </h3>
                  <p className="text-gray-700 text-sm mb-3">
                    {language === 'pt' 
                      ? '25% de desconto em todos os cursos de língua portuguesa do Instituto Camões.'
                      : '25% discount on all Instituto Camões Portuguese language courses.'}
                  </p>
                  <span className="inline-block bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {language === 'pt' ? 'Até £105 de poupança' : 'Save up to £105'}
                  </span>
                </div>
                
                <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-2xl p-6 border border-secondary-200">
                  <CalendarDaysIcon className="w-8 h-8 text-secondary-600 mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {language === 'pt' ? 'Acesso Prioritário a Eventos' : 'Priority Event Access'}
                  </h3>
                  <p className="text-gray-700 text-sm mb-3">
                    {language === 'pt' 
                      ? 'Reservas prioritárias para eventos culturais e conferências académicas.'
                      : 'Priority booking for cultural events and academic conferences.'}
                  </p>
                  <span className="inline-block bg-secondary-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {language === 'pt' ? 'Acesso exclusivo' : 'Exclusive access'}
                  </span>
                </div>
                
                <div className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-2xl p-6 border border-accent-200">
                  <BookOpenIcon className="w-8 h-8 text-accent-600 mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {language === 'pt' ? 'Biblioteca Digital' : 'Digital Library'}
                  </h3>
                  <p className="text-gray-700 text-sm mb-3">
                    {language === 'pt' 
                      ? 'Acesso completo à biblioteca digital com 10.000+ recursos portugueses.'
                      : 'Full access to digital library with 10,000+ Portuguese resources.'}
                  </p>
                  <span className="inline-block bg-accent-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {language === 'pt' ? 'Valor £200/ano' : '£200/year value'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'programs' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              {language === 'pt' ? 'Programas Educacionais Oficiais' : 'Official Educational Programs'}
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {INSTITUTO_CAMOES_PROGRAMS.map(program => (
                <div key={program.id} className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg border border-white/60 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900 leading-tight">
                        {language === 'pt' ? program.namePortuguese : program.name}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        program.level === 'all' ? 'bg-gray-100 text-gray-700' :
                        program.level === 'beginner' ? 'bg-green-100 text-green-700' :
                        program.level === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {getLevelLabel(program.level)}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {language === 'pt' ? program.descriptionPortuguese : program.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <span className="text-gray-500">{language === 'pt' ? 'Duração:' : 'Duration:'}</span>
                        <span className="text-gray-900 font-medium ml-2">{program.duration}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">{language === 'pt' ? 'Frequência:' : 'Frequency:'}</span>
                        <span className="text-gray-900 font-medium ml-2">{program.frequency}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">{language === 'pt' ? 'Custo:' : 'Cost:'}</span>
                        <span className="text-gray-900 font-medium ml-2">{program.cost}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">{language === 'pt' ? 'Início:' : 'Starts:'}</span>
                        <span className="text-gray-900 font-medium ml-2">
                          {new Date(program.nextStartDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        {language === 'pt' ? 'Benefícios incluídos:' : 'Benefits included:'}
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {program.benefits.slice(0, 3).map(benefit => (
                          <span key={benefit} className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full">
                            {benefit}
                          </span>
                        ))}
                        {program.benefits.length > 3 && (
                          <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-full">
                            +{program.benefits.length - 3} {language === 'pt' ? 'mais' : 'more'}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <button className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold py-3 px-4 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200">
                        {language === 'pt' ? 'Inscrever-se' : 'Enroll Now'}
                      </button>
                      <button 
                        onClick={() => setSelectedProgram(selectedProgram === program.id ? null : program.id)}
                        className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        {language === 'pt' ? 'Detalhes' : 'Details'}
                      </button>
                    </div>
                    
                    {selectedProgram === program.id && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <h5 className="font-medium text-gray-900 mb-2">
                          {language === 'pt' ? 'Público-alvo:' : 'Target audience:'}
                        </h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {program.targetAudience.map(audience => (
                            <li key={audience} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                              {audience}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              {language === 'pt' ? 'Eventos Culturais Oficiais' : 'Official Cultural Events'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {CULTURAL_EVENTS.map(event => (
                <div key={event.id} className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg border border-white/60 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900 leading-tight">
                        {language === 'pt' ? event.titlePortuguese : event.title}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        event.type === 'conference' ? 'bg-primary-100 text-primary-700' :
                        event.type === 'workshop' ? 'bg-secondary-100 text-secondary-700' :
                        event.type === 'film' ? 'bg-accent-100 text-accent-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {event.type}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4">
                      {language === 'pt' ? event.descriptionPortuguese : event.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-3 text-sm text-gray-700">
                        <CalendarDaysIcon className="w-4 h-4 text-primary-500" />
                        <span>{new Date(event.date).toLocaleDateString()} • {event.time}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-700">
                        <MapPinIcon className="w-4 h-4 text-primary-500" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-700">
                        <CurrencyPoundIcon className="w-4 h-4 text-primary-500" />
                        <span>{formatPrice(event.price)}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-700">
                        <UsersIcon className="w-4 h-4 text-primary-500" />
                        <span>{event.capacity} {language === 'pt' ? 'lugares' : 'places'}</span>
                      </div>
                    </div>
                    
                    <div className="mb-4 p-3 bg-accent-50 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-900 mb-1">
                        {language === 'pt' ? 'Significado Cultural:' : 'Cultural Significance:'}
                      </h4>
                      <p className="text-xs text-gray-700">{event.culturalSignificance}</p>
                    </div>
                    
                    <div className="flex gap-3">
                      <button className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold py-3 px-4 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200">
                        {language === 'pt' ? 'Reservar Lugar' : 'Book Place'}
                      </button>
                      <a
                        href={event.registrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <LinkIcon className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              {language === 'pt' ? 'Recursos Educacionais Digitais' : 'Digital Educational Resources'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {EDUCATIONAL_RESOURCES.map(resource => (
                <div key={resource.id} className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg border border-white/60 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-900 leading-tight">
                        {language === 'pt' ? resource.titlePortuguese : resource.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        resource.accessType === 'free' ? 'bg-green-100 text-green-700' :
                        resource.accessType === 'member' ? 'bg-primary-100 text-primary-700' :
                        'bg-premium-100 text-premium-700'
                      }`}>
                        {getAccessTypeLabel(resource.accessType)}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4">
                      {language === 'pt' ? resource.descriptionPortuguese : resource.description}
                    </p>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {resource.category}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {getLevelLabel(resource.level)}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {resource.type}
                      </span>
                    </div>
                    
                    <div className="flex gap-3">
                      {resource.downloadUrl && (
                        <a
                          href={resource.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold py-3 px-4 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 text-center"
                        >
                          {language === 'pt' ? 'Descarregar' : 'Download'}
                        </a>
                      )}
                      {resource.externalUrl && (
                        <a
                          href={resource.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${resource.downloadUrl ? 'px-4' : 'flex-1'} py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors ${resource.downloadUrl ? '' : 'text-center font-semibold'}`}
                        >
                          {resource.downloadUrl ? <LinkIcon className="w-5 h-5" /> : (language === 'pt' ? 'Aceder' : 'Access')}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-3xl p-8 text-center text-white shadow-2xl mt-12">
          <BuildingLibraryIcon className="w-16 h-16 mx-auto mb-4 opacity-90" />
          <h3 className="text-3xl font-bold mb-4">
            {language === 'pt' ? 'Junte-se à Comunidade Oficial' : 'Join the Official Community'}
          </h3>
          <p className="text-lg mb-8 opacity-90 max-w-3xl mx-auto">
            {language === 'pt' 
              ? 'Torne-se membro da LusoTown e aceda a todos os benefícios exclusivos da nossa parceria oficial com o Instituto Camões. A única plataforma portuguesa oficialmente reconhecida no Reino Unido.'
              : 'Become a LusoTown member and access all exclusive benefits from our official partnership with Instituto Camões. The only officially recognized Portuguese platform in the UK.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <a
              href="/signup"
              className="bg-white text-primary-600 font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
            >
              {t('cta.join')}
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-white hover:text-primary-600 transition-colors"
            >
              {t('cta.learn')}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}