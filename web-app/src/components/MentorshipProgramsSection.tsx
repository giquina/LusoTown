'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { brandColors, PORTUGUESE_COLORS } from '@/config/brand'

interface MentorshipProgram {
  id: string
  title: string
  titlePt: string
  description: string
  descriptionPt: string
  category: string
  categoryPt: string
  duration: string
  durationPt: string
  level: 'beginner' | 'intermediate' | 'advanced'
  mentorCount: number
  activeParticipants: number
  icon: string
  features: string[]
  featuresPt: string[]
}

const MENTORSHIP_PROGRAMS: MentorshipProgram[] = [
  {
    id: 'career-guidance',
    title: 'Career Guidance for Portuguese Speakers',
    titlePt: 'Orientação Profissional para Falantes de Português',
    description: 'Connect with experienced professionals who understand the challenges of building a career in the UK as a Portuguese speaker.',
    descriptionPt: 'Conecte-se com profissionais experientes que entendem os desafios de construir uma carreira no Reino Unido como falante de português.',
    category: 'Professional Development',
    categoryPt: 'Desenvolvimento Profissional',
    duration: '3-6 months',
    durationPt: '3-6 meses',
    level: 'intermediate',
    mentorCount: 24,
    activeParticipants: 89,
    icon: '💼',
    features: [
      'CV review and optimization',
      'Interview preparation',
      'Networking strategies',
      'Industry insights',
      'Skill development planning'
    ],
    featuresPt: [
      'Revisão e otimização do CV',
      'Preparação para entrevistas',
      'Estratégias de networking',
      'Insights da indústria',
      'Planeamento de desenvolvimento de competências'
    ]
  },
  {
    id: 'university-integration',
    title: 'University Integration Support',
    titlePt: 'Apoio à Integração Universitária',
    description: 'Student mentorship program connecting new Portuguese-speaking students with successful alumni and current students.',
    descriptionPt: 'Programa de mentoria estudantil conectando novos estudantes lusófonos com alumni bem-sucedidos e estudantes atuais.',
    category: 'Academic Support',
    categoryPt: 'Apoio Académico',
    duration: '1 academic year',
    durationPt: '1 ano académico',
    level: 'beginner',
    mentorCount: 31,
    activeParticipants: 127,
    icon: '🎓',
    features: [
      'Academic guidance',
      'Social integration support',
      'Study skills development',
      'Campus navigation',
      'Cultural adaptation'
    ],
    featuresPt: [
      'Orientação académica',
      'Apoio à integração social',
      'Desenvolvimento de competências de estudo',
      'Navegação no campus',
      'Adaptação cultural'
    ]
  },
  {
    id: 'business-entrepreneurship',
    title: 'Portuguese Business Network',
    titlePt: 'Rede Empresarial Portuguesa',
    description: 'Mentorship for Portuguese-speaking entrepreneurs looking to start or grow their business in the UK market.',
    descriptionPt: 'Mentoria para empreendedores lusófonos que procuram iniciar ou expandir o seu negócio no mercado do Reino Unido.',
    category: 'Entrepreneurship',
    categoryPt: 'Empreendedorismo',
    duration: '6-12 months',
    durationPt: '6-12 meses',
    level: 'advanced',
    mentorCount: 18,
    activeParticipants: 45,
    icon: '🚀',
    features: [
      'Business plan development',
      'Market research guidance',
      'Funding strategies',
      'Legal compliance',
      'Growth strategies'
    ],
    featuresPt: [
      'Desenvolvimento do plano de negócios',
      'Orientação de pesquisa de mercado',
      'Estratégias de financiamento',
      'Conformidade legal',
      'Estratégias de crescimento'
    ]
  },
  {
    id: 'cultural-integration',
    title: 'Cultural Bridge Program',
    titlePt: 'Programa Ponte Cultural',
    description: 'Supporting new arrivals in understanding UK culture while maintaining Portuguese heritage and identity.',
    descriptionPt: 'Apoiando novos residentes a compreender a cultura do Reino Unido mantendo a herança e identidade portuguesa.',
    category: 'Cultural Support',
    categoryPt: 'Apoio Cultural',
    duration: '4-8 months',
    durationPt: '4-8 meses',
    level: 'beginner',
    mentorCount: 42,
    activeParticipants: 156,
    icon: '🌉',
    features: [
      'Cultural orientation sessions',
      'Local community introduction',
      'Language practice support',
      'Administrative guidance',
      'Social connections'
    ],
    featuresPt: [
      'Sessões de orientação cultural',
      'Introdução à comunidade local',
      'Apoio à prática do idioma',
      'Orientação administrativa',
      'Conexões sociais'
    ]
  }
]

export default function MentorshipProgramsSection({ className = '' }: { className?: string }) {
  const { t, language } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [expandedProgram, setExpandedProgram] = useState<string | null>(null)

  const categories = [
    { value: 'all', label: language === 'pt' ? 'Todos os Programas' : 'All Programs' },
    { value: 'professional', label: language === 'pt' ? 'Desenvolvimento Profissional' : 'Professional Development' },
    { value: 'academic', label: language === 'pt' ? 'Apoio Académico' : 'Academic Support' },
    { value: 'entrepreneurship', label: language === 'pt' ? 'Empreendedorismo' : 'Entrepreneurship' },
    { value: 'cultural', label: language === 'pt' ? 'Apoio Cultural' : 'Cultural Support' }
  ]

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getLevelText = (level: string) => {
    const levelTexts = {
      beginner: language === 'pt' ? 'Iniciante' : 'Beginner',
      intermediate: language === 'pt' ? 'Intermédio' : 'Intermediate',
      advanced: language === 'pt' ? 'Avançado' : 'Advanced'
    }
    return levelTexts[level as keyof typeof levelTexts] || level
  }

  return (
    <section className={`py-16 px-4 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: brandColors.primary }}
          >
            {language === 'pt' ? 'Programas de Mentoria' : 'Mentorship Programs'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {language === 'pt'
              ? 'Conecte-se com mentores experientes da comunidade lusófona que o ajudarão a prosperar no Reino Unido'
              : 'Connect with experienced mentors from the Portuguese-speaking community who will help you thrive in the UK'
            }
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`
                  px-6 py-3 rounded-full text-sm font-medium transition-all duration-200
                  ${selectedCategory === category.value
                    ? 'text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }
                `}
                style={{
                  backgroundColor: selectedCategory === category.value ? brandColors.primary : undefined
                }}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {MENTORSHIP_PROGRAMS.map((program) => (
            <div
              key={program.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className="p-8">
                {/* Program Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{program.icon}</div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {language === 'pt' ? program.titlePt : program.title}
                      </h3>
                      <div className="flex items-center gap-3">
                        <span 
                          className="px-3 py-1 rounded-full text-sm font-medium"
                          style={{ 
                            backgroundColor: `${brandColors.primary}20`,
                            color: brandColors.primary 
                          }}
                        >
                          {language === 'pt' ? program.categoryPt : program.category}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(program.level)}`}>
                          {getLevelText(program.level)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Program Description */}
                <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                  {language === 'pt' ? program.descriptionPt : program.description}
                </p>

                {/* Program Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold" style={{ color: brandColors.primary }}>
                      {program.mentorCount}
                    </div>
                    <div className="text-sm text-gray-600">
                      {language === 'pt' ? 'Mentores' : 'Mentors'}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold" style={{ color: PORTUGUESE_COLORS.green[500] }}>
                      {program.activeParticipants}
                    </div>
                    <div className="text-sm text-gray-600">
                      {language === 'pt' ? 'Participantes' : 'Participants'}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-gray-700">
                      {language === 'pt' ? program.durationPt : program.duration}
                    </div>
                    <div className="text-sm text-gray-600">
                      {language === 'pt' ? 'Duração' : 'Duration'}
                    </div>
                  </div>
                </div>

                {/* Expandable Features */}
                <button
                  onClick={() => setExpandedProgram(expandedProgram === program.id ? null : program.id)}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <span className="font-medium text-gray-700">
                    {language === 'pt' ? 'Ver características do programa' : 'View program features'}
                  </span>
                  <span className={`transform transition-transform duration-200 ${expandedProgram === program.id ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>

                {expandedProgram === program.id && (
                  <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg">
                    <ul className="space-y-2">
                      {(language === 'pt' ? program.featuresPt : program.features).map((feature, index) => (
                        <li key={index} className="flex items-center gap-3 text-gray-700">
                          <span className="text-green-500">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTA Button */}
                <div className="mt-6">
                  <button
                    className="w-full py-4 rounded-lg font-semibold text-white transition-all duration-200 hover:shadow-lg hover:transform hover:scale-105"
                    style={{ backgroundColor: brandColors.primary }}
                  >
                    {language === 'pt' ? 'Candidatar-me a este Programa' : 'Apply to This Program'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4" style={{ color: brandColors.primary }}>
              {language === 'pt' ? 'Torne-se um Mentor' : 'Become a Mentor'}
            </h3>
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              {language === 'pt'
                ? 'Partilhe a sua experiência e ajude outros membros da comunidade lusófona a prosperar no Reino Unido'
                : 'Share your experience and help other Portuguese-speaking community members thrive in the UK'
              }
            </p>
            <button
              className="px-8 py-4 rounded-lg font-semibold text-white transition-all duration-200 hover:shadow-lg hover:transform hover:scale-105"
              style={{ backgroundColor: PORTUGUESE_COLORS.red[500] }}
            >
              {language === 'pt' ? 'Candidatar-me a Mentor' : 'Apply to Be a Mentor'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}