'use client'

import { useLanguage } from '@/context/LanguageContext'
import { HERITAGE_COLORS } from '@/config/brand'

export default function CareerHubSection() {
  const { t } = useLanguage()

  const careerResources = [
    {
      title: 'CV Review Services',
      description: 'Professional CV review by Portuguese business professionals',
      icon: '📄',
      action: 'Book Session'
    },
    {
      title: 'Interview Preparation',
      description: 'Mock interviews with industry professionals',
      icon: '🎯',
      action: 'Schedule'
    },
    {
      title: 'Networking Events',
      description: 'Connect with Portuguese professionals across industries',
      icon: '🤝',
      action: 'View Events'
    },
    {
      title: 'Job Board',
      description: 'Exclusive job opportunities for Portuguese-speaking students',
      icon: '💼',
      action: 'Browse Jobs'
    }
  ]

  return (
    <section 
      className="py-16 bg-gradient-to-b from-primary-50 to-white"
      style={{
        '--heritage-primary': HERITAGE_COLORS.primary,
        '--heritage-secondary': HERITAGE_COLORS.secondary
      } as React.CSSProperties}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-primary-900 mb-6">
            {t('student.career.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('student.career.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {careerResources.map((resource, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border border-primary-200 hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">{resource.icon}</div>
              <h3 className="text-xl font-semibold text-primary-900 mb-3">
                {resource.title}
              </h3>
              <p className="text-gray-600 mb-6 text-sm">
                {resource.description}
              </p>
              <button className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors min-h-[44px]">
                {resource.action}
              </button>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className="bg-white rounded-lg p-8 shadow-sm border border-primary-200">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">87%</div>
              <p className="text-gray-600">{t('student.career.employmentRate')}</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">£32K</div>
              <p className="text-gray-600">{t('student.career.avgSalary')}</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">150+</div>
              <p className="text-gray-600">{t('student.career.partnerCompanies')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}