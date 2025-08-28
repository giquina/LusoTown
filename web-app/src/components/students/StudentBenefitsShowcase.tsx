'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import {
  AcademicCapIcon,
  CheckBadgeIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  BriefcaseIcon,
  HomeIcon,
  ChatBubbleLeftRightIcon,
  GlobeEuropeAfricaIcon,
  SparklesIcon,
  HeartIcon,
  BookOpenIcon,
  BanknotesIcon,
  TrophyIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'
import {
  CheckBadgeIcon as CheckBadgeIconSolid,
  StarIcon as StarIconSolid
} from '@heroicons/react/24/solid'
import { UNIVERSITY_PARTNERSHIPS, UNIVERSITY_STATS } from '@/config/universities'
import Link from 'next/link'

interface Benefit {
  id: string
  category: 'academic' | 'cultural' | 'professional' | 'financial' | 'social'
  title: string
  titlePt: string
  description: string
  descriptionPt: string
  icon: React.ReactNode
  verified: boolean
  partnershipRequired: 'community' | 'official' | 'strategic' | 'any'
  universityCount: number
}

const STUDENT_BENEFITS: Benefit[] = [
  {
    id: 'student-verification',
    category: 'academic',
    title: 'Student Status Verification',
    titlePt: 'Verificação de Status de Estudante',
    description: 'Verify your student status across partner universities for exclusive access',
    descriptionPt: 'Verifique o seu status de estudante nas universidades parceiras para acesso exclusivo',
    icon: <CheckBadgeIcon className="w-6 h-6" />,
    verified: true,
    partnershipRequired: 'any',
    universityCount: 8
  },
  {
    id: 'cultural-events',
    category: 'cultural',
    title: 'Portuguese Cultural Events',
    titlePt: 'Eventos Culturais Portugueses',
    description: 'Priority booking and student discounts for Portuguese cultural festivals and celebrations',
    descriptionPt: 'Reserva prioritária e descontos de estudante para festivais culturais portugueses',
    icon: <CalendarDaysIcon className="w-6 h-6" />,
    verified: true,
    partnershipRequired: 'official',
    universityCount: 6
  },
  {
    id: 'study-groups',
    category: 'academic',
    title: 'Portuguese Study Groups',
    titlePt: 'Grupos de Estudo em Português',
    description: 'Join subject-specific study groups with other Portuguese-speaking students',
    descriptionPt: 'Junte-se a grupos de estudo específicos com outros estudantes lusófonos',
    icon: <BookOpenIcon className="w-6 h-6" />,
    verified: true,
    partnershipRequired: 'community',
    universityCount: 8
  },
  {
    id: 'career-mentorship',
    category: 'professional',
    title: 'Career Mentorship Program',
    titlePt: 'Programa de Mentoria Profissional',
    description: 'Connect with Portuguese-speaking professionals and alumni for career guidance',
    descriptionPt: 'Conecte-se com profissionais e alumni lusófonos para orientação profissional',
    icon: <BriefcaseIcon className="w-6 h-6" />,
    verified: true,
    partnershipRequired: 'strategic',
    universityCount: 4
  },
  {
    id: 'accommodation-support',
    category: 'social',
    title: 'Housing & Accommodation Support',
    titlePt: 'Apoio de Habitação e Alojamento',
    description: 'Find Portuguese-friendly housing and connect with compatible flatmates',
    descriptionPt: 'Encontre habitação amigável para portugueses e colegas de casa compatíveis',
    icon: <HomeIcon className="w-6 h-6" />,
    verified: true,
    partnershipRequired: 'official',
    universityCount: 6
  },
  {
    id: 'language-exchange',
    category: 'cultural',
    title: 'Language Exchange Programs',
    titlePt: 'Programas de Intercâmbio Linguístico',
    description: 'Practice English with natives while helping others with Portuguese',
    descriptionPt: 'Pratique inglês com nativos enquanto ajuda outros com português',
    icon: <ChatBubbleLeftRightIcon className="w-6 h-6" />,
    verified: true,
    partnershipRequired: 'community',
    universityCount: 8
  },
  {
    id: 'student-discounts',
    category: 'financial',
    title: 'Student Discount Network',
    titlePt: 'Rede de Descontos de Estudante',
    description: 'Exclusive discounts at Portuguese businesses and cultural venues',
    descriptionPt: 'Descontos exclusivos em negócios portugueses e espaços culturais',
    icon: <BanknotesIcon className="w-6 h-6" />,
    verified: true,
    partnershipRequired: 'any',
    universityCount: 8
  },
  {
    id: 'academic-resources',
    category: 'academic',
    title: 'Portuguese Academic Resources',
    titlePt: 'Recursos Académicos em Português',
    description: 'Access to Portuguese-language academic materials and research databases',
    descriptionPt: 'Acesso a materiais académicos em português e bases de dados de investigação',
    icon: <AcademicCapIcon className="w-6 h-6" />,
    verified: true,
    partnershipRequired: 'strategic',
    universityCount: 4
  },
  {
    id: 'networking-events',
    category: 'professional',
    title: 'Professional Networking Events',
    titlePt: 'Eventos de Networking Profissional',
    description: 'Monthly networking events with Portuguese-speaking professionals in London',
    descriptionPt: 'Eventos mensais de networking com profissionais lusófonos em Londres',
    icon: <UserGroupIcon className="w-6 h-6" />,
    verified: true,
    partnershipRequired: 'official',
    universityCount: 6
  },
  {
    id: 'cultural-heritage',
    category: 'cultural',
    title: 'Portuguese Heritage Programs',
    titlePt: 'Programas de Património Português',
    description: 'Celebrate and preserve Portuguese culture through dedicated programs',
    descriptionPt: 'Celebre e preserve a cultura portuguesa através de programas dedicados',
    icon: <GlobeEuropeAfricaIcon className="w-6 h-6" />,
    verified: true,
    partnershipRequired: 'strategic',
    universityCount: 4
  }
]

const PARTNERSHIP_LEVELS = [
  {
    level: 'strategic',
    name: 'Strategic Partners',
    namePt: 'Parceiros Estratégicos',
    count: UNIVERSITY_STATS.strategicPartnerships,
    color: 'from-green-500 to-emerald-500',
    textColor: 'text-green-700',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    benefits: 'All benefits + exclusive programs',
    benefitsPt: 'Todos os benefícios + programas exclusivos'
  },
  {
    level: 'official',
    name: 'Official Partners',
    namePt: 'Parceiros Oficiais',
    count: UNIVERSITY_STATS.officialPartnerships,
    color: 'from-blue-500 to-indigo-500',
    textColor: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    benefits: 'Core benefits + enhanced features',
    benefitsPt: 'Benefícios principais + funcionalidades melhoradas'
  },
  {
    level: 'community',
    name: 'Community Partners',
    namePt: 'Parceiros Comunitários',
    count: UNIVERSITY_STATS.communityPartnerships,
    color: 'from-primary-500 to-secondary-500',
    textColor: 'text-primary-700',
    bgColor: 'bg-primary-50',
    borderColor: 'border-primary-200',
    benefits: 'Essential community benefits',
    benefitsPt: 'Benefícios comunitários essenciais'
  }
]

export default function StudentBenefitsShowcase() {
  const { t, language } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedLevel, setSelectedLevel] = useState<string>('any')

  const categories = [
    { value: 'all', label: 'All Benefits', labelPt: 'Todos os Benefícios' },
    { value: 'academic', label: 'Academic', labelPt: 'Académico' },
    { value: 'cultural', label: 'Cultural', labelPt: 'Cultural' },
    { value: 'professional', label: 'Professional', labelPt: 'Profissional' },
    { value: 'financial', label: 'Financial', labelPt: 'Financeiro' },
    { value: 'social', label: 'Social', labelPt: 'Social' }
  ]

  const filteredBenefits = STUDENT_BENEFITS.filter(benefit => {
    const categoryMatch = selectedCategory === 'all' || benefit.category === selectedCategory
    const levelMatch = selectedLevel === 'any' || benefit.partnershipRequired === selectedLevel
    return categoryMatch && levelMatch
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'academic':
        return <AcademicCapIcon className="w-5 h-5" />
      case 'cultural':
        return <GlobeEuropeAfricaIcon className="w-5 h-5" />
      case 'professional':
        return <BriefcaseIcon className="w-5 h-5" />
      case 'financial':
        return <BanknotesIcon className="w-5 h-5" />
      case 'social':
        return <UserGroupIcon className="w-5 h-5" />
      default:
        return <SparklesIcon className="w-5 h-5" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic':
        return 'bg-blue-100 text-blue-800'
      case 'cultural':
        return 'bg-green-100 text-green-800'
      case 'professional':
        return 'bg-purple-100 text-purple-800'
      case 'financial':
        return 'bg-yellow-100 text-yellow-800'
      case 'social':
        return 'bg-pink-100 text-pink-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="py-12 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center bg-gradient-to-r from-primary-500 to-secondary-500 p-1 rounded-full mb-6"
          >
            <div className="bg-white rounded-full p-3">
              <TrophyIcon className="w-8 h-8 text-primary-600" />
            </div>
          </motion.div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {language === 'pt' ? 'Benefícios para Estudantes' : 'Student Benefits'}
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {language === 'pt' 
              ? 'Acesso exclusivo a recursos, eventos e oportunidades através das nossas parcerias universitárias'
              : 'Exclusive access to resources, events, and opportunities through our university partnerships'}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
              <div className="text-2xl font-bold text-primary-600 mb-1">
                {UNIVERSITY_STATS.totalPartnerships}
              </div>
              <div className="text-sm text-gray-600">
                {language === 'pt' ? 'Universidades' : 'Universities'}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
              <div className="text-2xl font-bold text-secondary-600 mb-1">
                {UNIVERSITY_STATS.totalPortugueseStudents.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">
                {language === 'pt' ? 'Estudantes' : 'Students'}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
              <div className="text-2xl font-bold text-accent-600 mb-1">
                {filteredBenefits.length}
              </div>
              <div className="text-sm text-gray-600">
                {language === 'pt' ? 'Benefícios' : 'Benefits'}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
              <div className="text-2xl font-bold text-premium-600 mb-1">
                {UNIVERSITY_STATS.londonUniversities}
              </div>
              <div className="text-sm text-gray-600">
                {language === 'pt' ? 'Em Londres' : 'In London'}
              </div>
            </div>
          </div>
        </div>

        {/* Partnership Levels */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            {language === 'pt' ? 'Níveis de Parceria' : 'Partnership Levels'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PARTNERSHIP_LEVELS.map((partnership) => (
              <motion.div
                key={partnership.level}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-xl border-2 p-6 transition-all duration-300 cursor-pointer ${
                  selectedLevel === partnership.level
                    ? `${partnership.borderColor} ${partnership.bgColor} shadow-lg`
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
                onClick={() => setSelectedLevel(selectedLevel === partnership.level ? 'any' : partnership.level)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    selectedLevel === partnership.level ? partnership.textColor : 'text-gray-600'
                  } ${selectedLevel === partnership.level ? 'bg-white' : 'bg-gray-100'}`}>
                    <ShieldCheckIcon className="w-4 h-4 mr-1" />
                    {partnership.count} {language === 'pt' ? 'universidades' : 'universities'}
                  </div>
                  {selectedLevel === partnership.level && (
                    <CheckBadgeIconSolid className="w-6 h-6 text-green-600" />
                  )}
                </div>
                
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {language === 'pt' ? partnership.namePt : partnership.name}
                </h4>
                
                <p className="text-sm text-gray-600">
                  {language === 'pt' ? partnership.benefitsPt : partnership.benefits}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === category.value
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
                }`}
              >
                {category.value !== 'all' && (
                  <div className="mr-2">
                    {getCategoryIcon(category.value)}
                  </div>
                )}
                {language === 'pt' ? category.labelPt : category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBenefits.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${getCategoryColor(benefit.category)}`}>
                  {benefit.icon}
                </div>
                <div className="flex items-center space-x-2">
                  {benefit.verified && (
                    <CheckBadgeIconSolid className="w-5 h-5 text-green-500" />
                  )}
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize ${
                    benefit.partnershipRequired === 'strategic' ? 'bg-green-100 text-green-800' :
                    benefit.partnershipRequired === 'official' ? 'bg-blue-100 text-blue-800' :
                    benefit.partnershipRequired === 'community' ? 'bg-primary-100 text-primary-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {benefit.partnershipRequired === 'any' ? 'All levels' : benefit.partnershipRequired}
                  </span>
                </div>
              </div>

              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                {language === 'pt' ? benefit.titlePt : benefit.title}
              </h4>
              
              <p className="text-gray-600 mb-4">
                {language === 'pt' ? benefit.descriptionPt : benefit.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center text-sm text-gray-500">
                  <BuildingLibraryIcon className="w-4 h-4 mr-1" />
                  {benefit.universityCount} {language === 'pt' ? 'universidades' : 'universities'}
                </div>
                <StarIconSolid className="w-5 h-5 text-yellow-400" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              {language === 'pt' 
                ? 'Pronto para aceder aos benefícios?' 
                : 'Ready to access your benefits?'}
            </h3>
            
            <p className="text-lg mb-8 opacity-90">
              {language === 'pt' 
                ? 'Junte-se à rede de estudantes lusófonos e comece a aproveitar todos estes benefícios hoje'
                : 'Join the Portuguese-speaking student network and start enjoying all these benefits today'}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                href="/students/onboarding"
                className="inline-flex items-center bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-300"
              >
                <AcademicCapIcon className="w-5 h-5 mr-2" />
                {language === 'pt' ? 'Registar como Estudante' : 'Register as Student'}
              </Link>
              
              <Link
                href="/students/university-partnerships"
                className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition-all duration-300"
              >
                <CheckBadgeIcon className="w-5 h-5 mr-2" />
                {language === 'pt' ? 'Ver Parcerias' : 'View Partnerships'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}