'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import {
  CalendarDaysIcon,
  MapPinIcon,
  BookOpenIcon,
  BriefcaseIcon,
  UserGroupIcon,
  HeartIcon,
  PresentationChartLineIcon,
  AcademicCapIcon,
  BuildingLibraryIcon,
  ClockIcon,
  CurrencyPoundIcon,
  ArrowRightIcon,
  StarIcon,
  UsersIcon,
  TagIcon,
  FunnelIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'

interface StudentEvent {
  id: string
  title: string
  titlePortuguese: string
  type: 'workshop' | 'networking' | 'cultural' | 'academic' | 'career' | 'social'
  date: string
  time: string
  location: string
  university?: string
  price: number
  studentPrice: number
  originalPrice?: number
  capacity: number
  enrolled: number
  description: string
  descriptionPortuguese: string
  speakers: string[]
  requirements: string[]
  yearGroups: string[]
  subjects: string[]
  isStudentExclusive: boolean
  benefits: string[]
  rating: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  credits?: number
  image?: string
}

const STUDENT_EVENTS: StudentEvent[] = [
  {
    id: 'portuguese-tech-bootcamp',
    title: 'Portuguese Tech Career Bootcamp',
    titlePortuguese: 'Bootcamp de Carreira em Tecnologia Portuguesa',
    type: 'career',
    date: '2024-09-15',
    time: '10:00-16:00',
    location: 'Imperial College London - Tech Hub',
    university: 'Imperial College London',
    price: 0,
    studentPrice: 0,
    originalPrice: 45,
    capacity: 60,
    enrolled: 42,
    description: 'Intensive day-long bootcamp covering Portuguese tech ecosystem, startup opportunities, and career paths. Includes CV review, interview practice, and networking lunch.',
    descriptionPortuguese: 'Bootcamp intensivo de um dia cobrindo ecossistema tecnológico português, oportunidades de startups e percursos profissionais. Inclui revisão de CV, prática de entrevistas e almoço de networking.',
    speakers: ['Ana Silva - CTO at OutSystems', 'Miguel Costa - Google Portugal', 'João Ferreira - Farfetch'],
    requirements: ['Computer Science or Engineering student', 'Basic programming knowledge', 'CV required'],
    yearGroups: ['2nd Year', '3rd Year', 'Final Year', 'Masters', 'PhD'],
    subjects: ['Computer Science', 'Engineering', 'Mathematics', 'Physics'],
    isStudentExclusive: true,
    benefits: ['1-on-1 CV review', 'Portfolio guidance', 'Job referrals', 'Portuguese tech network access'],
    rating: 4.8,
    difficulty: 'intermediate',
    credits: 2,
    image: '/images/events/tech-bootcamp.jpg'
  },
  {
    id: 'fado-cultural-workshop',
    title: 'Traditional Fado & Portuguese Poetry Workshop',
    titlePortuguese: 'Workshop de Fado Tradicional e Poesia Portuguesa',
    type: 'cultural',
    date: '2024-09-22',
    time: '14:00-17:00',
    location: 'King\'s College London - Portugal Cultural Centre',
    university: 'King\'s College London',
    price: 5,
    studentPrice: 5,
    originalPrice: 25,
    capacity: 40,
    enrolled: 28,
    description: 'Learn about the history and techniques of Fado with professional musicians. Includes guitar basics, poetry analysis, and cultural context of Portuguese musical heritage.',
    descriptionPortuguese: 'Aprenda sobre a história e técnicas do Fado com músicos profissionais. Inclui básicos de guitarra, análise de poesia e contexto cultural da herança musical portuguesa.',
    speakers: ['Maria João - Professional Fadista', 'Dr. António Silva - Portuguese Literature', 'Carlos Mendes - Guitar Master'],
    requirements: ['Interest in Portuguese culture', 'No musical experience required'],
    yearGroups: ['All Years'],
    subjects: ['Portuguese Studies', 'Music', 'Literature', 'Cultural Studies', 'Any'],
    isStudentExclusive: true,
    benefits: ['Cultural immersion', 'Music basics', 'Poetry appreciation', 'Cultural network'],
    rating: 4.9,
    difficulty: 'beginner',
    image: '/images/events/fado-workshop.jpg'
  },
  {
    id: 'academic-writing-portuguese',
    title: 'Academic Writing for Portuguese Studies',
    titlePortuguese: 'Escrita Académica para Estudos Portugueses',
    type: 'academic',
    date: '2024-09-28',
    time: '13:00-16:00',
    location: 'UCL - Portuguese Studies Department',
    university: 'University College London',
    price: 0,
    studentPrice: 0,
    capacity: 30,
    enrolled: 18,
    description: 'Master academic writing techniques for Portuguese studies papers. Covers research methodology, citation styles, thesis structure, and academic Portuguese language.',
    descriptionPortuguese: 'Domine técnicas de escrita académica para trabalhos de estudos portugueses. Cobre metodologia de investigação, estilos de citação, estrutura de tese e linguagem académica portuguesa.',
    speakers: ['Dr. Maria Fernandes - Portuguese Studies', 'Prof. João Silva - Academic Writing'],
    requirements: ['Portuguese Studies student', 'Intermediate Portuguese level'],
    yearGroups: ['2nd Year', '3rd Year', 'Masters', 'PhD'],
    subjects: ['Portuguese Studies', 'Literature', 'History', 'Cultural Studies'],
    isStudentExclusive: true,
    benefits: ['Academic skills', 'Research methods', 'Writing improvement', 'Professor connections'],
    rating: 4.7,
    difficulty: 'intermediate',
    credits: 1,
    image: '/images/events/academic-writing.jpg'
  },
  {
    id: 'portuguese-business-networking',
    title: 'Portuguese Student-Professional Networking Mixer',
    titlePortuguese: 'Mixer de Networking Estudante-Profissional Português',
    type: 'networking',
    date: '2024-10-05',
    time: '18:00-21:00',
    location: 'Portugal-UK Chamber of Commerce',
    price: 15,
    studentPrice: 10,
    originalPrice: 40,
    capacity: 80,
    enrolled: 65,
    description: 'Connect with Portuguese professionals across industries. Speed networking, panel discussions, and informal mixer with refreshments. All industries welcome.',
    descriptionPortuguese: 'Conecte-se com profissionais portugueses de várias indústrias. Speed networking, discussões em painel e mixer informal com refreshments. Todas as indústrias são bem-vindas.',
    speakers: ['Various Portuguese professionals from Banking, Tech, Law, Medicine, and Creative industries'],
    requirements: ['Student ID verification', 'Professional attire recommended'],
    yearGroups: ['Final Year', 'Masters', 'PhD', 'Recent Graduates'],
    subjects: ['All Subjects'],
    isStudentExclusive: false,
    benefits: ['Industry connections', 'Career advice', 'Mentorship opportunities', 'Job leads'],
    rating: 4.6,
    difficulty: 'beginner',
    image: '/images/events/business-networking.jpg'
  },
  {
    id: 'study-portugal-info',
    title: 'Study in Portugal Information & Application Workshop',
    titlePortuguese: 'Workshop de Informação e Candidatura para Estudar em Portugal',
    type: 'academic',
    date: '2024-10-12',
    time: '14:00-17:00',
    location: 'Portuguese Embassy Education Office',
    price: 0,
    studentPrice: 0,
    capacity: 50,
    enrolled: 32,
    description: 'Complete guide to studying in Portugal. University applications, Erasmus+, scholarships, visa requirements, and cultural preparation. Q&A with current exchange students.',
    descriptionPortuguese: 'Guia completo para estudar em Portugal. Candidaturas universitárias, Erasmus+, bolsas, requisitos de visto e preparação cultural. Perguntas e respostas com estudantes de intercâmbio atuais.',
    speakers: ['Portuguese Embassy Education Attaché', 'Erasmus+ Coordinator', 'Current Exchange Students'],
    requirements: ['Valid student status', 'Interest in Portugal exchange'],
    yearGroups: ['1st Year', '2nd Year', '3rd Year'],
    subjects: ['All Subjects'],
    isStudentExclusive: true,
    benefits: ['Application guidance', 'Scholarship info', 'Cultural preparation', 'Alumni network'],
    rating: 4.8,
    difficulty: 'beginner',
    image: '/images/events/study-portugal.jpg'
  },
  {
    id: 'portuguese-startup-pitch',
    title: 'Portuguese Student Startup Pitch Competition',
    titlePortuguese: 'Competição de Pitch de Startups de Estudantes Portugueses',
    type: 'career',
    date: '2024-10-19',
    time: '10:00-18:00',
    location: 'LSE - Entrepreneurship Hub',
    university: 'London School of Economics',
    price: 0,
    studentPrice: 0,
    capacity: 120,
    enrolled: 85,
    description: 'Pitch your business ideas to Portuguese angel investors and successful entrepreneurs. Workshops on pitch preparation, business planning, and funding options.',
    descriptionPortuguese: 'Apresente as suas ideias de negócio a investidores anjo portugueses e empresários de sucesso. Workshops sobre preparação de pitch, planeamento de negócios e opções de financiamento.',
    speakers: ['Portuguese Angel Investors', 'Successful Portuguese Entrepreneurs', 'Business Mentors'],
    requirements: ['Business idea or plan', 'Pitch deck (5 minutes max)', 'Student verification'],
    yearGroups: ['All Years'],
    subjects: ['Business', 'Engineering', 'Computer Science', 'Design', 'Any'],
    isStudentExclusive: true,
    benefits: ['Funding opportunities', 'Mentorship', 'Business network', 'Pitch experience'],
    rating: 4.9,
    difficulty: 'advanced',
    credits: 3,
    image: '/images/events/startup-pitch.jpg'
  }
]

const EVENT_TYPES = [
  { value: 'all', label: { en: 'All Events', pt: 'Todos os Eventos' }, icon: CalendarDaysIcon },
  { value: 'academic', label: { en: 'Academic', pt: 'Académicos' }, icon: BookOpenIcon },
  { value: 'career', label: { en: 'Career', pt: 'Carreira' }, icon: BriefcaseIcon },
  { value: 'networking', label: { en: 'Networking', pt: 'Networking' }, icon: UserGroupIcon },
  { value: 'cultural', label: { en: 'Cultural', pt: 'Culturais' }, icon: HeartIcon },
  { value: 'workshop', label: { en: 'Workshops', pt: 'Workshops' }, icon: PresentationChartLineIcon },
  { value: 'social', label: { en: 'Social', pt: 'Sociais' }, icon: UsersIcon }
]

const YEAR_GROUPS = [
  { value: 'all', label: { en: 'All Years', pt: 'Todos os Anos' } },
  { value: '1st Year', label: { en: '1st Year', pt: '1º Ano' } },
  { value: '2nd Year', label: { en: '2nd Year', pt: '2º Ano' } },
  { value: '3rd Year', label: { en: '3rd Year', pt: '3º Ano' } },
  { value: 'Final Year', label: { en: 'Final Year', pt: 'Último Ano' } },
  { value: 'Masters', label: { en: 'Masters', pt: 'Mestrado' } },
  { value: 'PhD', label: { en: 'PhD', pt: 'Doutoramento' } }
]

export default function StudentEventsSection() {
  const { language } = useLanguage()
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedYear, setSelectedYear] = useState<string>('all')
  const [showFilters, setShowFilters] = useState(false)

  const filteredEvents = STUDENT_EVENTS.filter(event => {
    const typeMatch = selectedType === 'all' || event.type === selectedType
    const yearMatch = selectedYear === 'all' || event.yearGroups.includes(selectedYear) || event.yearGroups.includes('All Years')
    return typeMatch && yearMatch
  })

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'academic': return BookOpenIcon
      case 'career': return BriefcaseIcon
      case 'networking': return UserGroupIcon
      case 'cultural': return HeartIcon
      case 'workshop': return PresentationChartLineIcon
      case 'social': return UsersIcon
      default: return CalendarDaysIcon
    }
  }

  const getEventColor = (type: string) => {
    switch (type) {
      case 'academic': return 'from-primary-500 to-primary-600'
      case 'career': return 'from-secondary-500 to-secondary-600'
      case 'networking': return 'from-premium-500 to-premium-600'
      case 'cultural': return 'from-coral-500 to-coral-600'
      case 'workshop': return 'from-accent-500 to-accent-600'
      case 'social': return 'from-action-500 to-action-600'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100'
      case 'intermediate': return 'text-yellow-600 bg-yellow-100'
      case 'advanced': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-primary-100 via-secondary-50 to-accent-100 border border-primary-200 shadow-lg mb-6">
            <AcademicCapIcon className="w-4 h-4 mr-2 text-secondary-600" />
            <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent font-bold">
              {language === 'pt' 
                ? "Eventos Exclusivos para Estudantes Portugueses"
                : "Exclusive Events for Portuguese Students"}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {language === 'pt' 
              ? 'Calendário Académico e Profissional'
              : 'Academic & Professional Calendar'}
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {language === 'pt' 
              ? 'Eventos especiais desenhados para estudantes portugueses: workshops de carreira, networking académico, imersão cultural e desenvolvimento profissional'
              : 'Special events designed for Portuguese students: career workshops, academic networking, cultural immersion, and professional development'}
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            <div className="bg-primary-50 rounded-xl p-4">
              <div className="text-2xl font-bold text-primary-600 mb-1">{STUDENT_EVENTS.length}</div>
              <div className="text-sm text-gray-600">{language === 'pt' ? 'Eventos este mês' : 'Events this month'}</div>
            </div>
            <div className="bg-secondary-50 rounded-xl p-4">
              <div className="text-2xl font-bold text-secondary-600 mb-1">£0-15</div>
              <div className="text-sm text-gray-600">{language === 'pt' ? 'Preços estudante' : 'Student prices'}</div>
            </div>
            <div className="bg-accent-50 rounded-xl p-4">
              <div className="text-2xl font-bold text-accent-600 mb-1">8</div>
              <div className="text-sm text-gray-600">{language === 'pt' ? 'Universidades' : 'Universities'}</div>
            </div>
            <div className="bg-premium-50 rounded-xl p-4">
              <div className="text-2xl font-bold text-premium-600 mb-1">4.8★</div>
              <div className="text-sm text-gray-600">{language === 'pt' ? 'Avaliação média' : 'Average rating'}</div>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <FunnelIcon className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-900">
                {language === 'pt' ? 'Filtros:' : 'Filters:'}
              </span>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="sm:hidden bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium"
            >
              {showFilters ? 
                (language === 'pt' ? 'Ocultar Filtros' : 'Hide Filters') :
                (language === 'pt' ? 'Mostrar Filtros' : 'Show Filters')
              }
            </button>
          </div>

          <div className={`${showFilters ? 'block' : 'hidden'} sm:block space-y-4`}>
            {/* Event Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'pt' ? 'Tipo de Evento:' : 'Event Type:'}
              </label>
              <div className="flex flex-wrap gap-2">
                {EVENT_TYPES.map(type => {
                  const IconComponent = type.icon
                  return (
                    <button
                      key={type.value}
                      onClick={() => setSelectedType(type.value)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedType === type.value
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      {type.label[language]}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Year Group Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'pt' ? 'Ano de Estudo:' : 'Year of Study:'}
              </label>
              <div className="flex flex-wrap gap-2">
                {YEAR_GROUPS.map(year => (
                  <button
                    key={year.value}
                    onClick={() => setSelectedYear(year.value)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedYear === year.value
                        ? 'bg-secondary-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {year.label[language]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event, index) => {
            const IconComponent = getEventIcon(event.type)
            const savings = event.originalPrice ? event.originalPrice - event.studentPrice : 0
            
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                {/* Header */}
                <div className={`px-6 py-4 bg-gradient-to-r ${getEventColor(event.type)} text-white relative`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-sm font-medium capitalize">{event.type}</span>
                        {event.isStudentExclusive && (
                          <div className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full mt-1">
                            {language === 'pt' ? 'Exclusivo' : 'Exclusive'}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-sm">
                        <StarIconSolid className="w-4 h-4 mr-1" />
                        {event.rating}
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full mt-1 ${getDifficultyColor(event.difficulty)}`}>
                        {event.difficulty}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2">
                    {language === 'pt' ? event.titlePortuguese : event.title}
                  </h3>

                  <div className="space-y-2 mb-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <CalendarDaysIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                      {new Date(event.date).toLocaleDateString()} • {event.time}
                    </div>
                    <div className="flex items-center">
                      <MapPinIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                    {event.university && (
                      <div className="flex items-center">
                        <BuildingLibraryIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="line-clamp-1">{event.university}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                    {language === 'pt' ? event.descriptionPortuguese : event.description}
                  </p>

                  {/* Benefits */}
                  <div className="mb-4">
                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                      {language === 'pt' ? 'Benefícios:' : 'Benefits:'}
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {event.benefits.slice(0, 3).map((benefit, i) => (
                        <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                          {benefit}
                        </span>
                      ))}
                      {event.benefits.length > 3 && (
                        <span className="text-xs text-primary-600">
                          +{event.benefits.length - 3} {language === 'pt' ? 'mais' : 'more'}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Capacity & Enrollment */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                      <span>{language === 'pt' ? 'Inscrições:' : 'Enrollment:'}</span>
                      <span>{event.enrolled}/{event.capacity}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-500 h-2 rounded-full" 
                        style={{ width: `${(event.enrolled / event.capacity) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      {event.studentPrice === 0 ? (
                        <span className="text-xl font-bold text-secondary-600">
                          {language === 'pt' ? 'Grátis' : 'Free'}
                        </span>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-gray-900">£{event.studentPrice}</span>
                          {event.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">£{event.originalPrice}</span>
                          )}
                        </div>
                      )}
                      {savings > 0 && (
                        <div className="text-xs text-secondary-600 font-medium">
                          {language === 'pt' ? 'Poupança:' : 'Save:'} £{savings}
                        </div>
                      )}
                    </div>
                    {event.credits && (
                      <div className="text-right">
                        <div className="text-sm font-medium text-accent-600">{event.credits} {language === 'pt' ? 'créditos' : 'credits'}</div>
                        <div className="text-xs text-gray-500">{language === 'pt' ? 'CPD' : 'CPD'}</div>
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <button className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold py-3 px-4 rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 group-hover:scale-105 shadow-lg hover:shadow-xl">
                    <span className="flex items-center justify-center">
                      {language === 'pt' ? 'Reservar Lugar' : 'Book Spot'}
                      <ArrowRightIcon className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <CalendarDaysIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {language === 'pt' ? 'Nenhum evento encontrado' : 'No events found'}
            </h3>
            <p className="text-gray-600 mb-6">
              {language === 'pt' 
                ? 'Tente ajustar os filtros para ver mais eventos.'
                : 'Try adjusting the filters to see more events.'}
            </p>
            <button
              onClick={() => {
                setSelectedType('all')
                setSelectedYear('all')
              }}
              className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors"
            >
              {language === 'pt' ? 'Limpar Filtros' : 'Clear Filters'}
            </button>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 text-center"
        >
          <CalendarDaysIcon className="w-16 h-16 text-primary-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {language === 'pt' ? 'Nunca Perca um Evento' : 'Never Miss an Event'}
          </h3>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            {language === 'pt' 
              ? 'Receba notificações sobre novos eventos, workshops e oportunidades de networking específicas para a sua área de estudo.'
              : 'Get notified about new events, workshops, and networking opportunities specific to your field of study.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary-500 text-white font-semibold px-8 py-3 rounded-xl hover:bg-primary-600 transition-colors">
              {language === 'pt' ? 'Ativar Notificações' : 'Enable Notifications'}
            </button>
            <button className="border border-gray-300 text-gray-700 font-semibold px-8 py-3 rounded-xl hover:bg-gray-50 transition-colors">
              {language === 'pt' ? 'Ver Calendário Completo' : 'View Full Calendar'}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}