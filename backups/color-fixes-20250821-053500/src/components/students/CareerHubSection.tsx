'use client'

import React, { useState } from 'react'
import { SOCIAL_URLS } from '@/config'
import { motion } from 'framer-motion'
import { SOCIAL_URLS } from '@/config'
import { useLanguage } from '@/context/LanguageContext'
import { SOCIAL_URLS } from '@/config'
import {
  BriefcaseIcon,
  AcademicCapIcon,
  BuildingOffice2Icon,
  GlobeAltIcon,
  ClockIcon,
  CurrencyPoundIcon,
  MapPinIcon,
  UserGroupIcon,
  TrophyIcon,
  LightBulbIcon,
  PresentationChartLineIcon,
  DocumentTextIcon,
  LinkIcon,
  ArrowRightIcon,
  CheckBadgeIcon,
  StarIcon,
  CalendarDaysIcon,
  UsersIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline'
import { CheckIcon, StarIcon as StarIconSolid } from '@heroicons/react/24/solid'
import { SOCIAL_URLS } from '@/config'

interface CareerOpportunity {
  id: string
  title: string
  titlePortuguese: string
  company: string
  type: 'internship' | 'graduate_program' | 'part_time' | 'placement' | 'volunteer' | 'research'
  industry: string
  location: string
  remote: boolean
  duration: string
  salary?: string
  requirements: string[]
  benefits: string[]
  description: string
  descriptionPortuguese: string
  applicationDeadline: string
  startDate: string
  contactPerson: string
  isPartnership: boolean
  portugueseConnection: string
  skillsRequired: string[]
  preferredYears: string[]
  logo?: string
}

interface ProfessionalMentor {
  id: string
  name: string
  title: string
  company: string
  industry: string
  experience: number
  specializations: string[]
  mentorshipType: ('career_advice' | 'interview_prep' | 'industry_insights' | 'skill_development' | 'networking')[]
  availability: string
  languages: string[]
  successStories: number
  rating: number
  isTopMentor: boolean
  bio: string
  bioPortuguese: string
  linkedIn?: string
  avatar?: string
}

interface CareerEvent {
  id: string
  title: string
  titlePortuguese: string
  type: 'workshop' | 'networking' | 'job_fair' | 'panel' | 'masterclass' | 'conference'
  date: string
  time: string
  location: string
  isVirtual: boolean
  organizer: string
  targetAudience: string[]
  price: number
  studentPrice: number
  capacity: number
  registered: number
  speakers: string[]
  topics: string[]
  description: string
  descriptionPortuguese: string
  benefits: string[]
  requirements: string[]
  isStudentExclusive: boolean
  image?: string
}

const CAREER_OPPORTUNITIES: CareerOpportunity[] = [
  {
    id: 'google-internship-pt',
    title: 'Software Engineering Internship - Portuguese Markets',
    titlePortuguese: 'Estágio de Engenharia de Software - Mercados Portugueses',
    company: 'Google',
    type: 'internship',
    industry: 'Technology',
    location: 'London',
    remote: true,
    duration: '12 weeks (Summer 2024)',
    salary: '£2,800/month',
    requirements: [
      'Computer Science or related field student',
      'Strong programming skills (Python, Java, C++)',
      'Portuguese language proficiency',
      'Previous internship or project experience preferred'
    ],
    benefits: [
      'Mentorship from Portuguese engineers',
      'Work on Portuguese market products',
      'Full-time job consideration',
      'Google certification programs'
    ],
    description: 'Work on products and services specifically for Portuguese-speaking markets. Collaborate with Google teams in Portugal and Brazil while based in London.',
    descriptionPortuguese: 'Trabalhe em produtos e serviços especificamente para mercados de língua portuguesa. Colabore com equipas do Google em Portugal e Brasil enquanto está baseado em Londres.',
    applicationDeadline: '2024-10-31',
    startDate: '2024-06-01',
    contactPerson: 'Carlos Silva - Portuguese Markets Lead',
    isPartnership: true,
    portugueseConnection: 'Focus on Portuguese-speaking markets and culture',
    skillsRequired: ['Programming', 'Problem Solving', 'Teamwork', 'Portuguese Language'],
    preferredYears: ['2nd Year', '3rd Year', 'Final Year'],
    logo: '/images/companies/google.png'
  },
  {
    id: 'euvisa-legal-intern',
    title: 'Immigration Law Research Assistant',
    titlePortuguese: 'Assistente de Investigação em Direito de Imigração',
    company: 'EU Visa Solutions',
    type: 'part_time',
    industry: 'Legal Services',
    location: 'London',
    remote: false,
    duration: '6 months',
    salary: '£12/hour',
    requirements: [
      'Law student (2nd year or above)',
      'Portuguese language skills essential',
      'Interest in immigration law',
      'Research and writing skills'
    ],
    benefits: [
      'Real legal experience',
      'Portuguese client interaction',
      'Reference letter guaranteed',
      'Potential full-time offer'
    ],
    description: 'Assist Portuguese clients with visa applications, conduct legal research, and support immigration casework. Perfect opportunity to help the Portuguese community.',
    descriptionPortuguese: 'Assista clientes portugueses com candidaturas de visto, conduza investigação jurídica e apoie trabalho de casos de imigração. Oportunidade perfeita para ajudar a comunidade portuguesa.',
    applicationDeadline: '2024-09-30',
    startDate: '2024-10-15',
    contactPerson: 'Dr. Maria Fernandes - Senior Partner',
    isPartnership: true,
    portugueseConnection: 'Specializes in Portuguese immigration cases',
    skillsRequired: ['Legal Research', 'Portuguese Language', 'Communication', 'Attention to Detail'],
    preferredYears: ['2nd Year', '3rd Year', 'Final Year', 'Masters'],
    logo: '/images/companies/euvisa.png'
  },
  {
    id: 'portugal-uk-chamber',
    title: 'Business Development Graduate Program',
    titlePortuguese: 'Programa de Graduados em Desenvolvimento de Negócios',
    company: 'Portugal-UK Chamber of Commerce',
    type: 'graduate_program',
    industry: 'Business Development',
    location: 'London',
    remote: false,
    duration: '18 months',
    salary: '£28,000 + benefits',
    requirements: [
      'Recent graduate or final year student',
      'Business, Economics, or International Relations degree',
      'Fluent Portuguese and English',
      'Interest in UK-Portugal trade'
    ],
    benefits: [
      'Structured career development program',
      'Rotations in Portugal and UK',
      'Direct mentorship from executives',
      'Professional qualifications support'
    ],
    description: 'Comprehensive graduate program focusing on UK-Portugal business relations, trade development, and commercial partnerships.',
    descriptionPortuguese: 'Programa abrangente de graduados focado nas relações comerciais Reino Unido-Portugal, desenvolvimento comercial e parcerias comerciais.',
    applicationDeadline: '2024-11-15',
    startDate: '2025-01-08',
    contactPerson: 'João Santos - Programme Director',
    isPartnership: true,
    portugueseConnection: 'Dedicated to strengthening UK-Portugal business ties',
    skillsRequired: ['Business Development', 'Relationship Building', 'Analysis', 'Portuguese Market Knowledge'],
    preferredYears: ['Final Year', 'Masters', 'Recent Graduate'],
    logo: '/images/companies/portugal-uk-chamber.png'
  },
  {
    id: 'instituto-camoes-research',
    title: 'Cultural Research Assistant',
    titlePortuguese: 'Assistente de Investigação Cultural',
    company: 'Instituto Camões',
    type: 'research',
    industry: 'Cultural Institution',
    location: 'London',
    remote: false,
    duration: '12 months',
    salary: '£1,500/month',
    requirements: [
      'Portuguese Studies, History, or Cultural Studies student',
      'Advanced Portuguese language skills',
      'Research methodology knowledge',
      'Academic writing experience'
    ],
    benefits: [
      'Access to exclusive Portuguese archives',
      'Publication opportunities',
      'Academic conference presentations',
      'Professional development courses'
    ],
    description: 'Support research on Portuguese cultural presence in the UK, diaspora studies, and cultural exchange programs.',
    descriptionPortuguese: 'Apoie investigação sobre presença cultural portuguesa no Reino Unido, estudos da diáspora e programas de intercâmbio cultural.',
    applicationDeadline: '2024-10-15',
    startDate: '2024-11-01',
    contactPerson: 'Dr. António Rebelo - Research Director',
    isPartnership: true,
    portugueseConnection: 'Official Portuguese cultural institution',
    skillsRequired: ['Research', 'Academic Writing', 'Portuguese Culture', 'Data Analysis'],
    preferredYears: ['2nd Year', '3rd Year', 'Masters', 'PhD'],
    logo: '/images/companies/instituto-camoes.png'
  },
  {
    id: 'luso-fintech-startup',
    title: 'Marketing Intern - Portuguese Markets',
    titlePortuguese: 'Estagiário de Marketing - Mercados Portugueses',
    company: 'LusoFintech',
    type: 'internship',
    industry: 'Financial Technology',
    location: 'London',
    remote: true,
    duration: '6 months',
    salary: '£1,200/month',
    requirements: [
      'Marketing, Business, or Communications student',
      'Portuguese language essential',
      'Social media and digital marketing skills',
      'Creative thinking and initiative'
    ],
    benefits: [
      'Startup experience in growing company',
      'Direct client interaction with Portuguese businesses',
      'Flexible working arrangements',
      'Potential equity options'
    ],
    description: 'Help expand fintech services to Portuguese small businesses in London. Create Portuguese-language content and manage community engagement.',
    descriptionPortuguese: 'Ajude a expandir serviços fintech para pequenas empresas portuguesas em Londres. Crie conteúdo em português e gira envolvimento da comunidade.',
    applicationDeadline: '2024-09-25',
    startDate: '2024-10-01',
    contactPerson: 'Catarina Silva - Marketing Director',
    isPartnership: false,
    portugueseConnection: 'Serves Portuguese business community in London',
    skillsRequired: ['Digital Marketing', 'Content Creation', 'Portuguese Language', 'Community Management'],
    preferredYears: ['2nd Year', '3rd Year', 'Final Year'],
    logo: '/images/companies/lusofintech.png'
  }
]

const PROFESSIONAL_MENTORS: ProfessionalMentor[] = [
  {
    id: 'rita-santos-tech',
    name: 'Rita Santos',
    title: 'Senior Software Engineer',
    company: 'Microsoft',
    industry: 'Technology',
    experience: 8,
    specializations: ['Software Engineering', 'Career Transition', 'Tech Leadership', 'Portuguese Tech Community'],
    mentorshipType: ['career_advice', 'interview_prep', 'skill_development', 'networking'],
    availability: 'Weekends & Evenings',
    languages: ['Portuguese', 'English'],
    successStories: 23,
    rating: 4.9,
    isTopMentor: true,
    bio: 'Portuguese software engineer with 8 years at top tech companies. Passionate about helping Portuguese students break into tech.',
    bioPortuguese: 'Engenheira de software portuguesa com 8 anos em empresas de tecnologia de topo. Apaixonada por ajudar estudantes portugueses a entrar na tecnologia.',
    linkedIn: 'https://linkedin.com/in/rita-santos-tech',
    avatar: '/images/mentors/rita-santos.jpg'
  },
  {
    id: 'miguel-costa-finance',
    name: 'Miguel Costa',
    title: 'Investment Director',
    company: 'Goldman Sachs',
    industry: 'Finance',
    experience: 12,
    specializations: ['Investment Banking', 'Financial Analysis', 'Portuguese Markets', 'Career Strategy'],
    mentorshipType: ['career_advice', 'interview_prep', 'industry_insights', 'networking'],
    availability: 'Weekday Evenings',
    languages: ['Portuguese', 'English', 'Spanish'],
    successStories: 31,
    rating: 4.8,
    isTopMentor: true,
    bio: 'Portuguese finance professional specializing in European markets. Mentor to 30+ Portuguese students entering finance.',
    bioPortuguese: 'Profissional de finanças português especializado em mercados europeus. Mentor de mais de 30 estudantes portugueses a entrar em finanças.',
    linkedIn: 'https://linkedin.com/in/miguel-costa-finance',
    avatar: '/images/mentors/miguel-costa.jpg'
  },
  {
    id: 'ana-ferreira-law',
    name: 'Ana Ferreira',
    title: 'Senior Associate',
    company: 'Clifford Chance',
    industry: 'Law',
    experience: 10,
    specializations: ['International Law', 'Corporate Law', 'Portuguese Business Law', 'Career Development'],
    mentorshipType: ['career_advice', 'interview_prep', 'industry_insights', 'skill_development'],
    availability: 'Flexible',
    languages: ['Portuguese', 'English', 'French'],
    successStories: 18,
    rating: 4.9,
    isTopMentor: false,
    bio: 'Senior lawyer with expertise in international and Portuguese business law. Committed to supporting Portuguese law students.',
    bioPortuguese: 'Advogada sénior com experiência em direito internacional e empresarial português. Comprometida em apoiar estudantes de direito portugueses.',
    linkedIn: 'https://linkedin.com/in/ana-ferreira-law',
    avatar: '/images/mentors/ana-ferreira.jpg'
  },
  {
    id: 'joao-silva-consulting',
    name: 'João Silva',
    title: 'Principal Consultant',
    company: 'McKinsey & Company',
    industry: 'Consulting',
    experience: 7,
    specializations: ['Management Consulting', 'Strategy', 'Portuguese Market Entry', 'Leadership'],
    mentorshipType: ['career_advice', 'interview_prep', 'skill_development', 'networking'],
    availability: 'Weekend Mornings',
    languages: ['Portuguese', 'English'],
    successStories: 25,
    rating: 4.7,
    isTopMentor: true,
    bio: 'Management consultant helping companies expand into Portuguese markets. Passionate about developing Portuguese consulting talent.',
    bioPortuguese: 'Consultor de gestão ajudando empresas a expandir para mercados portugueses. Apaixonado por desenvolver talento português em consultoria.',
    linkedIn: 'https://linkedin.com/in/joao-silva-consulting',
    avatar: '/images/mentors/joao-silva.jpg'
  }
]

const CAREER_EVENTS: CareerEvent[] = [
  {
    id: 'portuguese-career-fair-2024',
    title: 'Portuguese Professionals Career Fair 2024',
    titlePortuguese: 'Feira de Carreiras de Profissionais Portugueses 2024',
    type: 'job_fair',
    date: '2024-10-12',
    time: '10:00-16:00',
    location: 'Portugal-UK Chamber of Commerce',
    isVirtual: false,
    organizer: 'LusoTown & Portugal-UK Chamber',
    targetAudience: ['Final Year Students', 'Recent Graduates', 'Career Changers'],
    price: 0,
    studentPrice: 0,
    capacity: 300,
    registered: 187,
    speakers: ['Portuguese business leaders', 'HR directors', 'Successful alumni'],
    topics: ['Job opportunities', 'Company presentations', 'One-on-one interviews', 'CV reviews'],
    description: 'Largest Portuguese career fair in London. Meet top employers specifically looking for Portuguese talent.',
    descriptionPortuguese: 'Maior feira de carreiras portuguesa em Londres. Conheça os melhores empregadores que procuram especificamente talento português.',
    benefits: ['Direct access to employers', 'On-site interviews', 'Portuguese networking', 'Career guidance'],
    requirements: ['Bring printed CVs', 'Professional attire', 'Portuguese language skills'],
    isStudentExclusive: false,
    image: '/images/events/career-fair.jpg'
  },
  {
    id: 'tech-interview-masterclass',
    title: 'Tech Interview Masterclass for Portuguese Students',
    titlePortuguese: 'Masterclass de Entrevistas de Tecnologia para Estudantes Portugueses',
    type: 'masterclass',
    date: '2024-09-28',
    time: '14:00-17:00',
    location: 'Imperial College London',
    isVirtual: false,
    organizer: 'Rita Santos (Microsoft) & Portuguese Tech Community',
    targetAudience: ['Computer Science Students', 'Engineering Students'],
    price: 15,
    studentPrice: 10,
    capacity: 50,
    registered: 42,
    speakers: ['Rita Santos - Microsoft', 'Carlos Mendes - Google', 'Sofia Tech - Amazon'],
    topics: ['Technical interviews', 'Coding challenges', 'System design', 'Cultural fit'],
    description: 'Intensive masterclass on tech interviews by successful Portuguese engineers at top companies.',
    descriptionPortuguese: 'Masterclass intensiva sobre entrevistas de tecnologia por engenheiros portugueses de sucesso em empresas de topo.',
    benefits: ['Mock interviews', 'Real interview questions', 'Industry insights', 'Portuguese networking'],
    requirements: ['Basic programming knowledge', 'Laptop required', 'Portuguese language helpful'],
    isStudentExclusive: true,
    image: '/images/events/tech-masterclass.jpg'
  },
  {
    id: 'finance-networking-evening',
    title: 'Portuguese Finance Networking Evening',
    titlePortuguese: 'Noite de Networking de Finanças Portuguesa',
    type: 'networking',
    date: '2024-10-05',
    time: '18:00-21:00',
    location: 'City of London',
    isVirtual: false,
    organizer: 'Portuguese Finance Professionals Association',
    targetAudience: ['Finance Students', 'Economics Students', 'Recent Graduates'],
    price: 25,
    studentPrice: 15,
    capacity: 80,
    registered: 64,
    speakers: ['Top Portuguese finance professionals', 'Investment bankers', 'Asset managers'],
    topics: ['Career paths in finance', 'Breaking into investment banking', 'Portuguese finance community'],
    description: 'Exclusive networking event with Portuguese finance professionals in London\'s financial district.',
    descriptionPortuguese: 'Evento exclusivo de networking com profissionais de finanças portugueses no distrito financeiro de Londres.',
    benefits: ['Professional connections', 'Career advice', 'Job opportunities', 'Industry insights'],
    requirements: ['Student ID', 'Professional attire', 'Portuguese connection preferred'],
    isStudentExclusive: false,
    image: '/images/events/finance-networking.jpg'
  }
]

export default function CareerHubSection() {
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState<'opportunities' | 'mentors' | 'events'>('opportunities')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all')

  const tabs = [
    { 
      id: 'opportunities', 
      label: { en: 'Job Opportunities', pt: 'Oportunidades de Emprego' },
      icon: BriefcaseIcon,
      description: { en: 'Internships and jobs with Portuguese connection', pt: 'Estágios e empregos com conexão portuguesa' }
    },
    { 
      id: 'mentors', 
      label: { en: 'Professional Mentors', pt: 'Mentores Profissionais' },
      icon: UserGroupIcon,
      description: { en: 'Connect with successful Portuguese professionals', pt: 'Conecte-se com profissionais portugueses de sucesso' }
    },
    { 
      id: 'events', 
      label: { en: 'Career Events', pt: 'Eventos de Carreira' },
      icon: CalendarDaysIcon,
      description: { en: 'Workshops, networking, and career fairs', pt: 'Workshops, networking e feiras de carreira' }
    }
  ]

  const typeFilters = [
    { value: 'all', label: { en: 'All Types', pt: 'Todos os Tipos' } },
    { value: 'internship', label: { en: 'Internships', pt: 'Estágios' } },
    { value: 'graduate_program', label: { en: 'Graduate Programs', pt: 'Programas de Graduados' } },
    { value: 'part_time', label: { en: 'Part-time', pt: 'Meio Período' } },
    { value: 'research', label: { en: 'Research', pt: 'Investigação' } }
  ]

  const industryFilters = [
    { value: 'all', label: { en: 'All Industries', pt: 'Todas as Indústrias' } },
    { value: 'Technology', label: { en: 'Technology', pt: 'Tecnologia' } },
    { value: 'Finance', label: { en: 'Finance', pt: 'Finanças' } },
    { value: 'Legal Services', label: { en: 'Legal', pt: 'Jurídico' } },
    { value: 'Consulting', label: { en: 'Consulting', pt: 'Consultoria' } },
    { value: 'Cultural Institution', label: { en: 'Cultural', pt: 'Cultural' } }
  ]

  const filteredOpportunities = CAREER_OPPORTUNITIES.filter(opp => {
    const typeMatch = selectedType === 'all' || opp.type === selectedType
    const industryMatch = selectedIndustry === 'all' || opp.industry === selectedIndustry
    return typeMatch && industryMatch
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'internship': return 'bg-blue-100 text-blue-700'
      case 'graduate_program': return 'bg-green-100 text-green-700'
      case 'part_time': return 'bg-yellow-100 text-yellow-700'
      case 'research': return 'bg-purple-100 text-purple-700'
      case 'placement': return 'bg-indigo-100 text-indigo-700'
      case 'volunteer': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getTypeLabel = (type: string) => {
    const labels = {
      'internship': { en: 'Internship', pt: 'Estágio' },
      'graduate_program': { en: 'Graduate Program', pt: 'Programa de Graduados' },
      'part_time': { en: 'Part-time', pt: 'Meio Período' },
      'research': { en: 'Research', pt: 'Investigação' },
      'placement': { en: 'Placement', pt: 'Colocação' },
      'volunteer': { en: 'Volunteer', pt: 'Voluntariado' }
    }
    return labels[type]?.[language] || type
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
          <div className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-secondary-100 via-premium-50 to-coral-100 border border-secondary-200 shadow-lg mb-6">
            <BriefcaseIcon className="w-4 h-4 mr-2 text-secondary-600" />
            <span className="bg-gradient-to-r from-secondary-600 via-premium-600 to-coral-600 bg-clip-text text-transparent font-bold">
              {language === 'pt' 
                ? "Hub de Carreiras para Estudantes Portugueses"
                : "Portuguese Student Career Hub"}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {language === 'pt' 
              ? 'Acelere a Sua Carreira Profissional'
              : 'Accelerate Your Professional Career'}
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {language === 'pt' 
              ? 'Conecte-se com oportunidades de emprego, mentores experientes e eventos de carreira específicos para estudantes portugueses no Reino Unido'
              : 'Connect with job opportunities, experienced mentors, and career events specifically for Portuguese students in the UK'}
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            <div className="bg-secondary-50 rounded-xl p-4">
              <div className="text-2xl font-bold text-secondary-600 mb-1">{CAREER_OPPORTUNITIES.length}</div>
              <div className="text-sm text-gray-600">{language === 'pt' ? 'Oportunidades ativas' : 'Active opportunities'}</div>
            </div>
            <div className="bg-premium-50 rounded-xl p-4">
              <div className="text-2xl font-bold text-premium-600 mb-1">{PROFESSIONAL_MENTORS.length}</div>
              <div className="text-sm text-gray-600">{language === 'pt' ? 'Mentores profissionais' : 'Professional mentors'}</div>
            </div>
            <div className="bg-coral-50 rounded-xl p-4">
              <div className="text-2xl font-bold text-coral-600 mb-1">{CAREER_EVENTS.length}</div>
              <div className="text-sm text-gray-600">{language === 'pt' ? 'Eventos este mês' : 'Events this month'}</div>
            </div>
            <div className="bg-accent-50 rounded-xl p-4">
              <div className="text-2xl font-bold text-accent-600 mb-1">85%</div>
              <div className="text-sm text-gray-600">{language === 'pt' ? 'Taxa de sucesso' : 'Success rate'}</div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {tabs.map(tab => {
              const IconComponent = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 p-6 rounded-2xl border transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-white border-secondary-300 shadow-lg'
                      : 'bg-gray-50 border-gray-200 hover:bg-white hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-center mb-3">
                    <div className={`p-3 rounded-xl ${
                      activeTab === tab.id ? 'bg-secondary-100' : 'bg-gray-100'
                    }`}>
                      <IconComponent className={`w-6 h-6 ${
                        activeTab === tab.id ? 'text-secondary-600' : 'text-gray-600'
                      }`} />
                    </div>
                  </div>
                  <h3 className={`font-semibold mb-2 ${
                    activeTab === tab.id ? 'text-secondary-900' : 'text-gray-900'
                  }`}>
                    {tab.label[language]}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {tab.description[language]}
                  </p>
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Job Opportunities Tab */}
        {activeTab === 'opportunities' && (
          <div>
            {/* Filters */}
            <div className="mb-8 bg-gray-50 rounded-2xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'pt' ? 'Tipo:' : 'Type:'}
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                  >
                    {typeFilters.map(filter => (
                      <option key={filter.value} value={filter.value}>
                        {filter.label[language]}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'pt' ? 'Indústria:' : 'Industry:'}
                  </label>
                  <select
                    value={selectedIndustry}
                    onChange={(e) => setSelectedIndustry(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                  >
                    {industryFilters.map(filter => (
                      <option key={filter.value} value={filter.value}>
                        {filter.label[language]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Opportunities Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredOpportunities.map((opportunity, index) => (
                <motion.div
                  key={opportunity.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                          {language === 'pt' ? opportunity.titlePortuguese : opportunity.title}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-secondary-600">{opportunity.company}</span>
                          {opportunity.isPartnership && (
                            <CheckBadgeIcon className="w-4 h-4 text-green-500" />
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(opportunity.type)}`}>
                            {getTypeLabel(opportunity.type)}
                          </span>
                          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                            {opportunity.industry}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Location & Details */}
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPinIcon className="w-4 h-4 mr-2" />
                        {opportunity.location}
                        {opportunity.remote && (
                          <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                            Remote OK
                          </span>
                        )}
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="w-4 h-4 mr-2" />
                        {opportunity.duration}
                      </div>
                      {opportunity.salary && (
                        <div className="flex items-center">
                          <CurrencyPoundIcon className="w-4 h-4 mr-2" />
                          {opportunity.salary}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                      {language === 'pt' ? opportunity.descriptionPortuguese : opportunity.description}
                    </p>

                    {/* Portuguese Connection */}
                    <div className="mb-4 p-3 bg-secondary-50 rounded-lg">
                      <div className="flex items-start">
                        <GlobeAltIcon className="w-4 h-4 text-secondary-600 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-xs font-medium text-secondary-700 mb-1">
                            {language === 'pt' ? 'Conexão Portuguesa:' : 'Portuguese Connection:'}
                          </div>
                          <div className="text-xs text-secondary-600">
                            {opportunity.portugueseConnection}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Requirements */}
                    <div className="mb-4">
                      <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                        {language === 'pt' ? 'Requisitos:' : 'Requirements:'}
                      </h4>
                      <div className="space-y-1">
                        {opportunity.requirements.slice(0, 3).map((req, i) => (
                          <div key={i} className="flex items-start text-xs text-gray-600">
                            <CheckIcon className="w-3 h-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            {req}
                          </div>
                        ))}
                        {opportunity.requirements.length > 3 && (
                          <div className="text-xs text-secondary-600">
                            +{opportunity.requirements.length - 3} {language === 'pt' ? 'mais requisitos' : 'more requirements'}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="mb-4">
                      <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                        {language === 'pt' ? 'Competências:' : 'Skills:'}
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {opportunity.skillsRequired.map((skill, i) => (
                          <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Deadlines */}
                    <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="text-xs font-medium text-yellow-800 mb-1">
                        {language === 'pt' ? 'Prazo de Candidatura:' : 'Application Deadline:'}
                      </div>
                      <div className="text-sm text-yellow-700">
                        {new Date(opportunity.applicationDeadline).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Action Button */}
                    <button className="w-full bg-gradient-to-r from-secondary-500 to-premium-500 text-white font-semibold py-3 px-4 rounded-xl hover:from-secondary-600 hover:to-premium-600 transition-all duration-200 shadow-lg hover:shadow-xl">
                      <span className="flex items-center justify-center">
                        {language === 'pt' ? 'Candidatar-se Agora' : 'Apply Now'}
                        <ArrowRightIcon className="ml-2 w-4 h-4" />
                      </span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Professional Mentors Tab */}
        {activeTab === 'mentors' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROFESSIONAL_MENTORS.map((mentor, index) => (
              <motion.div
                key={mentor.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center">
                      <span className="text-secondary-600 font-bold text-xl">
                        {mentor.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg text-gray-900">{mentor.name}</h3>
                        {mentor.isTopMentor && (
                          <TrophyIcon className="w-4 h-4 text-yellow-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{mentor.title}</p>
                      <p className="text-sm font-medium text-secondary-600">{mentor.company}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                    <div className="bg-gray-50 rounded-lg p-2">
                      <div className="text-lg font-bold text-gray-900">{mentor.experience}</div>
                      <div className="text-xs text-gray-600">{language === 'pt' ? 'anos exp.' : 'years exp.'}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2">
                      <div className="text-lg font-bold text-secondary-600">{mentor.successStories}</div>
                      <div className="text-xs text-gray-600">{language === 'pt' ? 'sucessos' : 'successes'}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2">
                      <div className="flex items-center justify-center mb-1">
                        <StarIconSolid className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="text-lg font-bold text-gray-900">{mentor.rating}</span>
                      </div>
                      <div className="text-xs text-gray-600">{language === 'pt' ? 'avaliação' : 'rating'}</div>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {language === 'pt' ? mentor.bioPortuguese : mentor.bio}
                  </p>

                  {/* Specializations */}
                  <div className="mb-4">
                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                      {language === 'pt' ? 'Especializações:' : 'Specializations:'}
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {mentor.specializations.slice(0, 3).map((spec, i) => (
                        <span key={i} className="text-xs bg-secondary-100 text-secondary-700 px-2 py-1 rounded-full">
                          {spec}
                        </span>
                      ))}
                      {mentor.specializations.length > 3 && (
                        <span className="text-xs text-secondary-600">
                          +{mentor.specializations.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Mentorship Types */}
                  <div className="mb-4">
                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                      {language === 'pt' ? 'Oferece:' : 'Offers:'}
                    </h4>
                    <div className="space-y-1">
                      {mentor.mentorshipType.slice(0, 3).map((type, i) => (
                        <div key={i} className="flex items-center text-xs text-gray-600">
                          <CheckIcon className="w-3 h-3 text-green-500 mr-2" />
                          {type.replace('_', ' ')}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <ClockIcon className="w-4 h-4 mr-2" />
                      {language === 'pt' ? 'Disponibilidade:' : 'Available:'} {mentor.availability}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button className="flex-1 bg-gradient-to-r from-secondary-500 to-premium-500 text-white font-semibold py-3 px-4 rounded-lg hover:from-secondary-600 hover:to-premium-600 transition-all duration-200">
                      {language === 'pt' ? 'Conectar' : 'Connect'}
                    </button>
                    {mentor.linkedIn && (
                      <a
                        href={mentor.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <LinkIcon className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Career Events Tab */}
        {activeTab === 'events' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {CAREER_EVENTS.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                        {language === 'pt' ? event.titlePortuguese : event.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(event.type)}`}>
                          {event.type.replace('_', ' ')}
                        </span>
                        {event.isStudentExclusive && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                            {language === 'pt' ? 'Exclusivo' : 'Exclusive'}
                          </span>
                        )}
                        {event.isVirtual && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                            Virtual
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <CalendarDaysIcon className="w-4 h-4 mr-2" />
                      {new Date(event.date).toLocaleDateString()} • {event.time}
                    </div>
                    <div className="flex items-center">
                      <MapPinIcon className="w-4 h-4 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center">
                      <UsersIcon className="w-4 h-4 mr-2" />
                      {language === 'pt' ? 'Organizador:' : 'Organizer:'} {event.organizer}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {language === 'pt' ? event.descriptionPortuguese : event.description}
                  </p>

                  {/* Topics */}
                  <div className="mb-4">
                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                      {language === 'pt' ? 'Tópicos:' : 'Topics:'}
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {event.topics.map((topic, i) => (
                        <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Target Audience */}
                  <div className="mb-4">
                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                      {language === 'pt' ? 'Público-alvo:' : 'Target Audience:'}
                    </h4>
                    <div className="space-y-1">
                      {event.targetAudience.map((audience, i) => (
                        <div key={i} className="flex items-center text-xs text-gray-600">
                          <CheckIcon className="w-3 h-3 text-green-500 mr-2" />
                          {audience}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Registration */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                      <span>{language === 'pt' ? 'Inscrições:' : 'Registered:'}</span>
                      <span>{event.registered}/{event.capacity}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-secondary-500 h-2 rounded-full" 
                        style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      {event.studentPrice === 0 ? (
                        <span className="text-xl font-bold text-green-600">
                          {language === 'pt' ? 'Grátis' : 'Free'}
                        </span>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-gray-900">£{event.studentPrice}</span>
                          {event.price > event.studentPrice && (
                            <span className="text-sm text-gray-500 line-through">£{event.price}</span>
                          )}
                        </div>
                      )}
                      <div className="text-xs text-gray-500">
                        {language === 'pt' ? 'Preço estudante' : 'Student price'}
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button 
                    className={`w-full font-semibold py-3 px-4 rounded-xl transition-all duration-200 ${
                      event.registered >= event.capacity
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-secondary-500 to-premium-500 text-white hover:from-secondary-600 hover:to-premium-600 shadow-lg hover:shadow-xl'
                    }`}
                    disabled={event.registered >= event.capacity}
                  >
                    {event.registered >= event.capacity 
                      ? (language === 'pt' ? 'Evento Cheio' : 'Event Full')
                      : (language === 'pt' ? 'Inscrever-se' : 'Register')
                    }
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 bg-gradient-to-r from-secondary-500 to-premium-500 rounded-2xl p-8 text-center text-white"
        >
          <BriefcaseIcon className="w-16 h-16 text-white mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">
            {language === 'pt' 
              ? 'Impulsione a Sua Carreira com a Comunidade Portuguesa'
              : 'Boost Your Career with the Portuguese Community'}
          </h3>
          <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
            {language === 'pt' 
              ? 'Junte-se a mais de 850 estudantes portugueses que estão a construir carreiras de sucesso através da nossa rede profissional exclusiva.'
              : 'Join over 850 Portuguese students who are building successful careers through our exclusive professional network.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-secondary-600 font-bold px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors">
              {language === 'pt' ? 'Criar Perfil Profissional' : 'Create Professional Profile'}
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-secondary-600 font-bold px-8 py-3 rounded-xl transition-all duration-200">
              {language === 'pt' ? 'Explorar Oportunidades' : 'Explore Opportunities'}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}