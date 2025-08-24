'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

interface LusophoneCountry {
  id: string
  name: {
    en: string
    pt: string
  }
  flag: string
  capital: {
    en: string
    pt: string
  }
  color: string
  studentCount?: number
}

const LUSOPHONE_COUNTRIES: LusophoneCountry[] = [
  {
    id: 'portugal',
    name: { en: 'Portugal', pt: 'Portugal' },
    flag: '🇵🇹',
    capital: { en: 'Lisbon', pt: 'Lisboa' },
    color: 'from-red-500 to-green-600',
    studentCount: 380
  },
  {
    id: 'brazil',
    name: { en: 'Brazil', pt: 'Brasil' },
    flag: '🇧🇷', 
    capital: { en: 'Brasília', pt: 'Brasília' },
    color: 'from-green-500 to-yellow-400',
    studentCount: 1240
  },
  {
    id: 'angola',
    name: { en: 'Angola', pt: 'Angola' },
    flag: '🇦🇴',
    capital: { en: 'Luanda', pt: 'Luanda' },
    color: 'from-red-600 to-yellow-500',
    studentCount: 95
  },
  {
    id: 'cape-verde',
    name: { en: 'Cape Verde', pt: 'Cabo Verde' },
    flag: '🇨🇻',
    capital: { en: 'Praia', pt: 'Praia' },
    color: 'from-blue-600 to-blue-400',
    studentCount: 42
  },
  {
    id: 'mozambique',
    name: { en: 'Mozambique', pt: 'Moçambique' },
    flag: '🇲🇿',
    capital: { en: 'Maputo', pt: 'Maputo' },
    color: 'from-green-600 to-red-500',
    studentCount: 68
  },
  {
    id: 'guinea-bissau',
    name: { en: 'Guinea-Bissau', pt: 'Guiné-Bissau' },
    flag: '🇬🇼',
    capital: { en: 'Bissau', pt: 'Bissau' },
    color: 'from-red-500 to-yellow-400',
    studentCount: 28
  },
  {
    id: 'sao-tome-principe',
    name: { en: 'São Tomé and Príncipe', pt: 'São Tomé e Príncipe' },
    flag: '🇸🇹',
    capital: { en: 'São Tomé', pt: 'São Tomé' },
    color: 'from-green-500 to-yellow-300',
    studentCount: 15
  },
  {
    id: 'east-timor',
    name: { en: 'East Timor', pt: 'Timor-Leste' },
    flag: '🇹🇱',
    capital: { en: 'Dili', pt: 'Díli' },
    color: 'from-red-600 to-yellow-400',
    studentCount: 8
  },
  {
    id: 'macau',
    name: { en: 'Macau', pt: 'Macau' },
    flag: '🇲🇴',
    capital: { en: 'Macau', pt: 'Macau' },
    color: 'from-green-600 to-yellow-300',
    studentCount: 32
  },
  {
    id: 'equatorial-guinea',
    name: { en: 'Equatorial Guinea', pt: 'Guiné Equatorial' },
    flag: '🇬🇶',
    capital: { en: 'Malabo', pt: 'Malabo' },
    color: 'from-green-600 to-red-500',
    studentCount: 12
  }
]

interface LusophoneFlagGridProps {
  showStudentCounts?: boolean
  compact?: boolean
}

export default function LusophoneFlagGrid({ showStudentCounts = false, compact = false }: LusophoneFlagGridProps) {
  const { language } = useLanguage()

  return (
    <div className="w-full">
      {/* Mobile: 5x2 Grid, Desktop: 10x1 Row */}
      <div className={`
        grid grid-cols-5 sm:grid-cols-10 gap-3 sm:gap-4
        ${compact ? 'max-w-4xl' : 'max-w-6xl'} mx-auto
      `}>
        {LUSOPHONE_COUNTRIES.map((country, index) => (
          <motion.div
            key={country.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.1,
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
            whileHover={{ 
              scale: 1.15, 
              y: -8,
              transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
            className="group relative"
          >
            {/* Flag Container */}
            <div className={`
              relative aspect-square rounded-xl overflow-hidden
              bg-gradient-to-br ${country.color}
              shadow-lg group-hover:shadow-2xl
              transition-all duration-300 ease-out
              border-2 border-white group-hover:border-primary-200
              ${compact ? 'min-h-[60px] sm:min-h-[80px]' : 'min-h-[80px] sm:min-h-[100px]'}
            `}>
              {/* Flag Emoji */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`
                  text-4xl sm:text-5xl 
                  ${compact ? 'text-3xl sm:text-4xl' : ''}
                  filter drop-shadow-lg
                  group-hover:scale-110 transition-transform duration-300
                `}>
                  {country.flag}
                </span>
              </div>

              {/* Student Count Badge */}
              {showStudentCounts && country.studentCount && (
                <div className="absolute top-1 right-1">
                  <span className="
                    inline-flex items-center justify-center
                    min-w-[20px] h-5 px-1
                    bg-white/90 backdrop-blur-sm
                    text-xs font-bold text-gray-800
                    rounded-full shadow-md
                  ">
                    {country.studentCount}
                  </span>
                </div>
              )}

              {/* Hover Overlay */}
              <div className="
                absolute inset-0 
                bg-gradient-to-t from-black/60 via-transparent to-transparent
                opacity-0 group-hover:opacity-100
                transition-opacity duration-300
              " />
            </div>

            {/* Country Info Tooltip */}
            <div className="
              absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3
              bg-gray-900 text-white px-3 py-2 rounded-lg
              text-sm font-medium whitespace-nowrap
              shadow-xl z-10
              opacity-0 group-hover:opacity-100
              translate-y-2 group-hover:translate-y-0
              transition-all duration-300 ease-out
              pointer-events-none
            ">
              <div className="font-bold">
                {country.name[language]}
              </div>
              {!compact && (
                <div className="text-xs text-gray-300">
                  {country.capital[language]}
                  {showStudentCounts && country.studentCount && (
                    <span className="ml-2">
                      • {country.studentCount} {language === 'pt' ? 'estudantes' : 'students'}
                    </span>
                  )}
                </div>
              )}
              
              {/* Tooltip Arrow */}
              <div className="
                absolute top-full left-1/2 transform -translate-x-1/2
                border-4 border-transparent border-t-gray-900
              " />
            </div>

            {/* Mobile-friendly country name below flag */}
            <div className="sm:hidden mt-2 text-center">
              <div className="text-xs font-medium text-gray-800 truncate">
                {country.name[language]}
              </div>
              {showStudentCounts && country.studentCount && (
                <div className="text-xs text-gray-600">
                  {country.studentCount}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Cultural Heritage Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="mt-8 text-center"
      >
        <div className={`
          inline-flex items-center justify-center px-6 py-3 
          bg-gradient-to-r from-primary-50 via-secondary-50 to-accent-50
          border border-primary-200 rounded-full
          ${compact ? 'text-sm' : 'text-base'}
        `}>
          <span className="mr-2">🌍</span>
          <span className="font-medium bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
            {language === 'pt' 
              ? `${LUSOPHONE_COUNTRIES.reduce((total, country) => total + (country.studentCount || 0), 0)} estudantes de países lusófonos no Reino Unido`
              : `${LUSOPHONE_COUNTRIES.reduce((total, country) => total + (country.studentCount || 0), 0)} students from Lusophone countries in United Kingdom`
            }
          </span>
        </div>
      </motion.div>
    </div>
  )
}