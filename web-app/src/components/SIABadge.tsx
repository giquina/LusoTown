'use client'

import { motion } from 'framer-motion'
import { 
  ShieldCheckIcon, 
  CheckBadgeIcon,
  StarIcon
} from '@heroicons/react/24/solid'
import { useLanguage } from '@/context/LanguageContext'

interface SIABadgeProps {
  variant?: 'full' | 'compact' | 'mini'
  showAnimation?: boolean
}

export default function SIABadge({ variant = 'full', showAnimation = true }: SIABadgeProps) {
  const { language } = useLanguage()
  const isPortuguese = language === 'pt'
  
  const badges = [
    {
      icon: ShieldCheckIcon,
      titleEn: "SIA Licensed",
      titlePt: "Licenciado SIA",
      subtitleEn: "Professional Security",
      subtitlePt: "Segurança Profissional"
    },
    {
      icon: CheckBadgeIcon,
      titleEn: "UK Compliant",
      titlePt: "Conforme Reino Unido",
      subtitleEn: "Legal Requirements",
      subtitlePt: "Requisitos Legais"
    },
    {
      icon: StarIcon,
      titleEn: "Portuguese Community",
      titlePt: "Comunidade Portuguesa",
      subtitleEn: "Trusted Service",
      subtitlePt: "Serviço de Confiança"
    }
  ]
  
  if (variant === 'mini') {
    return (
      <motion.div 
        className="flex items-center space-x-1 bg-gradient-to-r from-secondary-100 to-accent-100 px-2 py-1 rounded-full"
        initial={showAnimation ? { scale: 0 } : {}}
        animate={showAnimation ? { scale: 1 } : {}}
        transition={{ duration: 0.3 }}
      >
        <ShieldCheckIcon className="w-4 h-4 text-secondary-600" />
        <span className="text-xs font-semibold text-secondary-700">
          {isPortuguese ? 'SIA' : 'SIA'}
        </span>
      </motion.div>
    )
  }
  
  if (variant === 'compact') {
    return (
      <motion.div 
        className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg border border-gray-200 shadow-sm"
        initial={showAnimation ? { opacity: 0, y: 10 } : {}}
        animate={showAnimation ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
      >
        <div className="w-8 h-8 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-full flex items-center justify-center">
          <ShieldCheckIcon className="w-4 h-4 text-white" />
        </div>
        <div className="text-xs">
          <div className="font-semibold text-gray-900">
            {isPortuguese ? 'SIA Licenciado' : 'SIA Licensed'}
          </div>
          <div className="text-gray-600">
            {isPortuguese ? 'Segurança Profissional' : 'Professional Security'}
          </div>
        </div>
      </motion.div>
    )
  }
  
  // Full variant
  return (
    <motion.div 
      className="bg-gradient-to-br from-secondary-50 to-accent-50 border border-secondary-200 rounded-xl p-4"
      initial={showAnimation ? { opacity: 0, scale: 0.9 } : {}}
      animate={showAnimation ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-3">
        <h3 className="font-bold text-gray-900 text-sm">
          {isPortuguese ? 'Serviço Certificado & Licenciado' : 'Certified & Licensed Service'}
        </h3>
        <p className="text-xs text-gray-600 mt-1">
          {isPortuguese 
            ? 'Conformidade total com regulamentações do Reino Unido'
            : 'Full compliance with UK regulations'
          }
        </p>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        {badges.map((badge, index) => {
          const IconComponent = badge.icon
          return (
            <motion.div 
              key={index}
              className="text-center"
              initial={showAnimation ? { opacity: 0, y: 20 } : {}}
              animate={showAnimation ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <IconComponent className="w-5 h-5 text-white" />
              </div>
              <div className="text-xs">
                <div className="font-semibold text-gray-900 leading-tight">
                  {isPortuguese ? badge.titlePt : badge.titleEn}
                </div>
                <div className="text-gray-600 leading-tight">
                  {isPortuguese ? badge.subtitlePt : badge.subtitleEn}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
      
      {/* Trust indicators */}
      <div className="flex items-center justify-center mt-3 pt-3 border-t border-gray-200">
        <div className="flex items-center space-x-1 text-xs text-gray-600">
          <motion.div 
            className="w-2 h-2 bg-green-400 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span>
            {isPortuguese ? 'Verificado & Seguro' : 'Verified & Secure'}
          </span>
        </div>
      </div>
    </motion.div>
  )
}