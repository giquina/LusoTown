'use client'

import { motion } from 'framer-motion'
import { CheckCircleIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

interface TrustIndicator {
  name: string
  namePortuguese: string
  description: string
  descriptionPortuguese: string
  icon: React.ComponentType<any>
  verified: boolean
}

interface TrustBadgesProps {
  trustIndicators: TrustIndicator[]
  isPortuguese: boolean
}

const TrustBadges: React.FC<TrustBadgesProps> = ({ trustIndicators, isPortuguese }) => {
  return (
    <section id="trust-badges" className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {isPortuguese ? 'Credenciais & Certificações' : 'Credentials & Certifications'}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {isPortuguese
                ? 'Serviços totalmente licenciados e segurados para sua tranquilidade completa'
                : 'Fully licensed and insured services for your complete peace of mind'
              }
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustIndicators.map((indicator, index) => {
            const IconComponent = indicator.icon

            return (
              <motion.div
                key={indicator.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200 hover:border-primary-200 hover:shadow-lg transition-all duration-300 group"
              >
                {/* Verified Badge */}
                {indicator.verified && (
                  <div className="absolute -top-2 -right-2">
                    <div className="bg-secondary-500 text-white rounded-full p-1.5 shadow-lg">
                      <CheckCircleIcon className="w-4 h-4" />
                    </div>
                  </div>
                )}

                {/* Icon */}
                <div className="flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-xl mb-4 group-hover:bg-primary-200 transition-colors duration-300">
                  <IconComponent className="w-8 h-8" />
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {isPortuguese ? indicator.namePortuguese : indicator.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {isPortuguese ? indicator.descriptionPortuguese : indicator.description}
                  </p>
                </div>

                {/* Verification Status */}
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-center text-sm">
                    <ShieldCheckIcon className="w-4 h-4 text-secondary-500 mr-1" />
                    <span className="text-secondary-600 font-medium">
                      {isPortuguese ? 'Verificado' : 'Verified'}
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Additional Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-gray-200"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary-600">100%</div>
              <div className="text-sm text-gray-600">
                {isPortuguese ? 'Taxa de Satisfação do Cliente' : 'Client Satisfaction Rate'}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-secondary-600">24/7</div>
              <div className="text-sm text-gray-600">
                {isPortuguese ? 'Suporte de Emergência' : 'Emergency Support'}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-accent-600">5+</div>
              <div className="text-sm text-gray-600">
                {isPortuguese ? 'Anos de Experiência' : 'Years of Experience'}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Accreditation Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-gray-200"
        >
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-gray-700">
              {isPortuguese ? 'Reconhecido Por' : 'Recognized By'}
            </h3>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60 hover:opacity-80 transition-opacity duration-300">
            {/* SIA Logo Placeholder */}
            <div className="bg-gray-100 rounded-lg p-4 h-16 w-20 flex items-center justify-center">
              <span className="text-xs font-bold text-gray-600">SIA</span>
            </div>
            
            {/* TfL Logo Placeholder */}
            <div className="bg-gray-100 rounded-lg p-4 h-16 w-20 flex items-center justify-center">
              <span className="text-xs font-bold text-gray-600">TfL</span>
            </div>
            
            {/* Insurance Company Placeholder */}
            <div className="bg-gray-100 rounded-lg p-4 h-16 w-24 flex items-center justify-center">
              <span className="text-xs font-bold text-gray-600">
                {isPortuguese ? 'Seguro' : 'Insurance'}
              </span>
            </div>
            
            {/* Lusophone Chamber of Commerce */}
            <div className="bg-gray-100 rounded-lg p-4 h-16 w-28 flex items-center justify-center">
              <span className="text-xs font-bold text-gray-600">
                {isPortuguese ? 'CCCP' : 'PBCC'}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TrustBadges