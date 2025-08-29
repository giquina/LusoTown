'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { AcademicCapIcon, UserGroupIcon, BuildingLibraryIcon } from '@heroicons/react/24/outline'

const AcademicNetworkingSection: React.FC = () => {
  const { language } = useLanguage()

  const features = [
    {
      icon: AcademicCapIcon,
      title: language === 'pt' ? 'Rede Académica' : 'Academic Network',
      description: language === 'pt' 
        ? 'Conecte-se com estudantes portugueses em universidades britânicas'
        : 'Connect with Portuguese students at British universities'
    },
    {
      icon: UserGroupIcon,
      title: language === 'pt' ? 'Grupos de Estudo' : 'Study Groups',
      description: language === 'pt'
        ? 'Encontre parceiros de estudo e grupos académicos'
        : 'Find study partners and academic groups'
    },
    {
      icon: BuildingLibraryIcon,
      title: language === 'pt' ? 'Recursos Académicos' : 'Academic Resources',
      description: language === 'pt'
        ? 'Acesso a materiais e recursos em português'
        : 'Access to materials and resources in Portuguese'
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
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {language === 'pt' ? 'Rede Académica' : 'Academic Networking'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'pt' 
              ? 'Conecte-se com estudantes portugueses em todo o Reino Unido'
              : 'Connect with Portuguese students across the UK'
            }
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AcademicNetworkingSection
