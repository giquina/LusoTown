'use client'

import { useLanguage } from '@/context/LanguageContext'
import { useHeritage } from '@/context/HeritageContext'

export default function AccommodationSupportSection() {
  const { t } = useLanguage()
  const { colors } = useHeritage()

  const supportOptions = [
    {
      title: 'University Halls',
      description: 'Assistance with university accommodation applications',
      features: ['Application support', 'Cost comparison', 'Location guidance']
    },
    {
      title: 'Private Housing',
      description: 'Help finding private accommodation near universities',
      features: ['Verified landlords', 'Portuguese-speaking community areas', 'Safety checks']
    },
    {
      title: 'Shared Housing',
      description: 'Connect with other Portuguese-speaking students',
      features: ['Student matching', 'Cultural compatibility', 'Cost sharing']
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t('students.accommodation.title') || 'Student Accommodation Support'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('students.accommodation.subtitle') || 'Find the perfect home away from home in the UK with support from the Portuguese-speaking community'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {supportOptions.map((option, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {option.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {option.description}
              </p>
              <ul className="space-y-2">
                {option.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                    <div 
                      className="w-2 h-2 rounded-full mr-3"
                      style={{ backgroundColor: colors.primary }}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            className="px-8 py-3 rounded-md text-white font-medium"
            style={{ backgroundColor: colors.primary }}
          >
            {t('students.accommodation.getHelp') || 'Get Accommodation Help'}
          </button>
        </div>
      </div>
    </section>
  )
}