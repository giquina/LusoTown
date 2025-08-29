'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { AcademicCapIcon, BuildingOffice2Icon, HeartIcon } from '@heroicons/react/24/outline'

const PortugueseInstitutionalPartnerships: React.FC = () => {
  const { t, language } = useLanguage()

  const partnerships = [
    {
      type: 'university',
      name: 'University College London',
      description: language === 'pt' 
        ? 'Parceria para estudantes portugueses e brasileiros'
        : 'Partnership for Portuguese and Brazilian students',
      icon: AcademicCapIcon,
      flag: '🇬🇧'
    },
    {
      type: 'cultural',
      name: 'Instituto Camões',
      description: language === 'pt'
        ? 'Promoção da língua e cultura portuguesa'
        : 'Promotion of Portuguese language and culture',
      icon: HeartIcon,
      flag: '🇵🇹'
    },
    {
      type: 'business',
      name: 'Câmara de Comércio Luso-Britânica',
      description: language === 'pt'
        ? 'Conexões comerciais entre Portugal e Reino Unido'
        : 'Business connections between Portugal and UK',
      icon: BuildingOffice2Icon,
      flag: '🤝'
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {language === 'pt' ? 'Parcerias Institucionais Portuguesas' : 'Portuguese Institutional Partnerships'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'pt' 
              ? 'Conectando instituições portuguesas e britânicas para fortalecer a comunidade lusófona no Reino Unido'
              : 'Connecting Portuguese and British institutions to strengthen the Portuguese-speaking community in the UK'
            }
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partnerships.map((partnership, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mr-4">
                  <partnership.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl">{partnership.flag}</span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {partnership.name}
              </h3>
              
              <p className="text-gray-600 mb-4">
                {partnership.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium capitalize">
                  {partnership.type}
                </span>
                <button className="text-blue-600 hover:text-blue-800 font-semibold text-sm">
                  {language === 'pt' ? 'Saiba mais' : 'Learn more'} →
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'pt' ? 'Junte-se às nossas parcerias' : 'Join our partnerships'}
            </h2>
            <p className="text-gray-600 mb-6">
              {language === 'pt'
                ? 'Interessado em estabelecer uma parceria institucional? Entre em contato connosco.'
                : 'Interested in establishing an institutional partnership? Get in touch with us.'
              }
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-8 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors duration-300 font-semibold">
              {language === 'pt' ? 'Contacte-nos' : 'Contact us'}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default PortugueseInstitutionalPartnerships
