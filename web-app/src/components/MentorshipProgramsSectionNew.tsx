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
  icon: string
  category: 'business' | 'academic' | 'cultural' | 'career'
  duration: string
  durationPt: string
  participants: number
  mentors: number
  successRate: string
}

interface MentorshipProgramsSectionProps {
  className?: string
  showFilters?: boolean
  maxPrograms?: number
}

const MENTORSHIP_PROGRAMS: MentorshipProgram[] = [
  {
    id: 'business-leadership',
    title: 'Portuguese Business Leadership',
    titlePt: 'Liderança Empresarial Portuguesa',
    description: 'Connect with successful Portuguese-speaking business leaders across the UK. Learn strategies for building businesses that bridge cultures.',
    descriptionPt: 'Conecte-se com líderes empresariais lusófonos de sucesso no Reino Unido. Aprenda estratégias para construir negócios que conectam culturas.',
    icon: '👔',
    category: 'business',
    duration: '6 months',
    durationPt: '6 meses',
    participants: 128,
    mentors: 24,
    successRate: '89%'
  },
  {
    id: 'academic-excellence',
    title: 'Academic Excellence & Research',
    titlePt: 'Excelência Académica & Investigação',
    description: 'Partner with established academics from Portuguese-speaking backgrounds. Navigate UK higher education while maintaining cultural identity.',
    descriptionPt: 'Parceria com académicos estabelecidos de origens lusófonas. Navegar pelo ensino superior do Reino Unido mantendo a identidade cultural.',
    icon: '🎓',
    category: 'academic',
    duration: '12 months',
    durationPt: '12 meses',
    participants: 95,
    mentors: 18,
    successRate: '94%'
  },
  {
    id: 'cultural-preservation',
    title: 'Cultural Heritage Preservation',
    titlePt: 'Preservação do Património Cultural',
    description: 'Work with cultural ambassadors to preserve and promote Portuguese traditions within UK communities.',
    descriptionPt: 'Trabalhe com embaixadores culturais para preservar e promover tradições portuguesas nas comunidades do Reino Unido.',
    icon: '🎭',
    category: 'cultural',
    duration: '9 months',
    durationPt: '9 meses',
    participants: 156,
    mentors: 32,
    successRate: '91%'
  },
  {
    id: 'career-development',
    title: 'Professional Career Development',
    titlePt: 'Desenvolvimento de Carreira Profissional',
    description: 'Advance your career in the UK job market with mentors who understand both Portuguese work culture and British professional expectations.',
    descriptionPt: 'Avance na sua carreira no mercado de trabalho do Reino Unido com mentores que entendem tanto a cultura de trabalho portuguesa quanto as expectativas profissionais britânicas.',
    icon: '💼',
    category: 'career',
    duration: '8 months',
    durationPt: '8 meses',
    participants: 203,
    mentors: 41,
    successRate: '87%'
  }
]

export default function MentorshipProgramsSection({
  className = '',
  showFilters = true,
  maxPrograms
}: MentorshipProgramsSectionProps) {
  const { language } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = [
    { id: 'all', label: language === 'pt' ? 'Todos' : 'All' },
    { id: 'business', label: language === 'pt' ? 'Negócios' : 'Business' },
    { id: 'academic', label: language === 'pt' ? 'Académico' : 'Academic' },
    { id: 'cultural', label: language === 'pt' ? 'Cultural' : 'Cultural' },
    { id: 'career', label: language === 'pt' ? 'Carreira' : 'Career' }
  ]

  const filteredPrograms = MENTORSHIP_PROGRAMS
    .filter(program => selectedCategory === 'all' || program.category === selectedCategory)
    .slice(0, maxPrograms)

  return (
    <section className={`py-16 bg-gradient-to-br from-blue-50 via-white to-green-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ 
              background: `linear-gradient(135deg, ${brandColors.primary}, ${PORTUGUESE_COLORS.green[600]})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            {language === 'pt' ? 'Programas de Mentoria' : 'Mentorship Programs'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {language === 'pt' 
              ? 'Conecte-se com mentores experientes da comunidade lusófona no Reino Unido. Cresça profissionalmente mantendo suas raízes culturais.'
              : 'Connect with experienced mentors from the Portuguese-speaking community across the UK. Grow professionally while maintaining your cultural roots.'
            }
          </p>
        </div>

        {/* Filter Controls */}
        {showFilters && (
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'text-white shadow-md transform scale-105'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                  style={{
                    backgroundColor: selectedCategory === category.id ? brandColors.primary : undefined
                  }}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Programs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredPrograms.map((program) => (
            <div
              key={program.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl" aria-hidden="true">{program.icon}</div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {language === 'pt' ? program.titlePt : program.title}
                      </h3>
                      <div className="flex items-center gap-3">
                        <span 
                          className="px-3 py-1 rounded-full text-sm font-medium text-white"
                          style={{ backgroundColor: brandColors.primary }}
                        >
                          {categories.find(c => c.id === program.category)?.label}
                        </span>
                        <span className="text-sm text-gray-500">
                          {language === 'pt' ? program.durationPt : program.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                  {language === 'pt' ? program.descriptionPt : program.description}
                </p>

                {/* Program Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold" style={{ color: brandColors.primary }}>
                      {program.participants}
                    </div>
                    <div className="text-sm text-gray-600">
                      {language === 'pt' ? 'Participantes' : 'Participants'}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold" style={{ color: PORTUGUESE_COLORS.green[500] }}>
                      {program.mentors}
                    </div>
                    <div className="text-sm text-gray-600">
                      {language === 'pt' ? 'Mentores' : 'Mentors'}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-gray-700">
                      {program.successRate}
                    </div>
                    <div className="text-sm text-gray-600">
                      {language === 'pt' ? 'Taxa de Sucesso' : 'Success Rate'}
                    </div>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    className="flex-1 px-6 py-3 text-white rounded-lg hover:shadow-lg transition-all duration-200 font-medium"
                    style={{ backgroundColor: brandColors.primary }}
                  >
                    {language === 'pt' ? 'Candidatar-se' : 'Apply Now'}
                  </button>
                  <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium">
                    {language === 'pt' ? 'Saber Mais' : 'Learn More'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'pt' ? 'Interessado em ser Mentor?' : 'Interested in Becoming a Mentor?'}
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              {language === 'pt' 
                ? 'Partilhe a sua experiência com a próxima geração de profissionais lusófonos no Reino Unido.'
                : 'Share your experience with the next generation of Portuguese-speaking professionals in the UK.'
              }
            </p>
            <button 
              className="px-8 py-3 text-white rounded-lg hover:shadow-lg transition-all duration-200 font-medium"
              style={{ backgroundColor: PORTUGUESE_COLORS.green[500] }}
            >
              {language === 'pt' ? 'Tornar-se Mentor' : 'Become a Mentor'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}