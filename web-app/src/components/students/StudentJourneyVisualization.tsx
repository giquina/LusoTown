'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import {
  HomeIcon,
  AcademicCapIcon,
  TrophyIcon,
  ArrowRightIcon,
  GlobeAltIcon,
  SparklesIcon,
  HeartIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

interface JourneyStep {
  id: string
  title: {
    en: string
    pt: string
  }
  description: {
    en: string
    pt: string
  }
  icon: string
  flagEmoji: string
  color: string
  bgColor: string
  achievements: string[]
  stats: {
    en: string
    pt: string
  }
}

interface StudentStory {
  id: string
  name: string
  originCountry: {
    en: string
    pt: string
  }
  flag: string
  university: string
  degree: string
  year: string
  journey: JourneyStep[]
  quote: {
    en: string
    pt: string
  }
  profileImage: string
  successMetrics: {
    networking: number
    cultural: number
    academic: number
    professional: number
  }
}

const STUDENT_JOURNEY_STEPS: JourneyStep[] = [
  {
    id: 'origin',
    title: {
      en: 'Lusophone-Speaking Heritage',
      pt: 'Herança Lusófona'
    },
    description: {
      en: 'Growing up in Portuguese-speaking communities with rich cultural traditions',
      pt: 'Crescer em comunidades lusófonas com ricas tradições culturais'
    },
    icon: '🏠',
    flagEmoji: '🌍',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50 border-emerald-200',
    achievements: ['Cultural Foundation', 'Language Heritage', 'Family Values', 'Community Bonds'],
    stats: {
      en: '10 Portuguese-speaking countries represented',
      pt: '10 países lusófonos representados'
    }
  },
  {
    id: 'uk-university',
    title: {
      en: 'United Kingdom University',
      pt: 'Universidade do Reino Unido'
    },
    description: {
      en: 'Pursuing higher education at prestigious United Kingdom institutions with Lusophone support',
      pt: 'Cursando ensino superior em prestigiosas instituições do Reino Unido com apoio português'
    },
    icon: '🎓',
    flagEmoji: '🇬🇧',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 border-blue-200',
    achievements: ['Academic Excellence', 'Cultural Integration', 'Language Skills', 'International Network'],
    stats: {
      en: '8 partner universities supporting Lusophone students',
      pt: '8 universidades parceiras apoiando estudantes portugueses'
    }
  },
  {
    id: 'success',
    title: {
      en: 'Professional Success',
      pt: 'Sucesso Profissional'
    },
    description: {
      en: 'Achieving career goals while maintaining Lusophone cultural identity and community connections',
      pt: 'Alcançando objetivos profissionais mantendo identidade cultural portuguesa e conexões comunitárias'
    },
    icon: '🏆',
    flagEmoji: '✨',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 border-purple-200',
    achievements: ['Career Growth', 'Cultural Leadership', 'Community Impact', 'Global Perspective'],
    stats: {
      en: '94% of graduates report career satisfaction',
      pt: '94% dos graduados reportam satisfação profissional'
    }
  }
]

const FEATURED_STUDENT_STORIES: StudentStory[] = [
  {
    id: 'maria-portugal',
    name: 'Maria Santos',
    originCountry: { en: 'Portugal', pt: 'Portugal' },
    flag: '🇵🇹',
    university: 'University College London',
    degree: 'Lusophone Studies & Business',
    year: '3rd Year',
    journey: STUDENT_JOURNEY_STEPS,
    quote: {
      en: 'LusoTown helped me connect my Portuguese heritage with my United Kingdom education, opening doors I never imagined.',
      pt: 'A LusoTown ajudou-me a conectar a minha herança portuguesa com a minha educação no Reino Unido, abrindo portas que nunca imaginei.'
    },
    profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
    successMetrics: { networking: 95, cultural: 98, academic: 92, professional: 88 }
  },
  {
    id: 'joao-brazil',
    name: 'João Silva',
    originCountry: { en: 'Brazil', pt: 'Brasil' },
    flag: '🇧🇷',
    university: 'Imperial College London',
    degree: 'Engineering & Technology',
    year: 'Master\'s',
    journey: STUDENT_JOURNEY_STEPS,
    quote: {
      en: 'The Portuguese-speaking community at Imperial became my second family, supporting my journey from São Paulo to London.',
      pt: 'A comunidade lusófona no Imperial tornou-se a minha segunda família, apoiando a minha jornada de São Paulo para Londres.'
    },
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    successMetrics: { networking: 88, cultural: 90, academic: 96, professional: 94 }
  },
  {
    id: 'ana-angola',
    name: 'Ana Fernandes',
    originCountry: { en: 'Angola', pt: 'Angola' },
    flag: '🇦🇴',
    university: 'London School of Economics',
    degree: 'Economics & Development',
    year: 'PhD',
    journey: STUDENT_JOURNEY_STEPS,
    quote: {
      en: 'My Angolan perspective enriches my research while LusoTown connects me to the broader Portuguese-speaking diaspora.',
      pt: 'A minha perspetiva angolana enriquece a minha pesquisa enquanto a LusoTown me conecta à diáspora lusófona mais ampla.'
    },
    profileImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400',
    successMetrics: { networking: 92, cultural: 96, academic: 98, professional: 90 }
  }
]

export default function StudentJourneyVisualization() {
  const { language } = useLanguage()
  const [selectedStudent, setSelectedStudent] = useState(FEATURED_STUDENT_STORIES[0])
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-primary-50">
      <div className="container-width">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {language === 'pt' 
              ? 'Jornada dos Estudantes Lusófonos' 
              : 'Lusophone-Speaking Student Journey'
            }
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'pt'
              ? 'Do património cultural às universidades do Reino Unido: histórias de sucesso da comunidade lusófona'
              : 'From cultural heritage to United Kingdom universities: success stories from the Portuguese-speaking community'
            }
          </p>
        </motion.div>

        {/* Student Profile Selector */}
        <div className="mb-16">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {FEATURED_STUDENT_STORIES.map((student) => (
              <button
                key={student.id}
                onClick={() => setSelectedStudent(student)}
                className={`
                  flex items-center space-x-3 px-6 py-4 rounded-xl transition-all duration-300
                  ${selectedStudent.id === student.id 
                    ? 'bg-primary-100 border-2 border-primary-300 shadow-lg' 
                    : 'bg-white border-2 border-gray-200 hover:border-primary-200 shadow-md'
                  }
                  min-h-[60px]
                `}
              >
                <div className="relative">
                  <img
                    src={student.profileImage}
                    alt={student.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="absolute -bottom-1 -right-1 text-lg">
                    {student.flag}
                  </span>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">{student.name}</div>
                  <div className="text-sm text-gray-600">{student.originCountry[language]}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Selected Student Info */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6 mb-6">
              <div className="relative">
                <img
                  src={selectedStudent.profileImage}
                  alt={selectedStudent.name}
                  className="w-20 h-20 rounded-full object-cover shadow-lg"
                />
                <span className="absolute -bottom-2 -right-2 text-3xl filter drop-shadow-lg">
                  {selectedStudent.flag}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedStudent.name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">{language === 'pt' ? 'Origem:' : 'Origin:'}</span> {selectedStudent.originCountry[language]}
                  </div>
                  <div>
                    <span className="font-medium">{language === 'pt' ? 'Universidade:' : 'University:'}</span> {selectedStudent.university}
                  </div>
                  <div>
                    <span className="font-medium">{language === 'pt' ? 'Curso:' : 'Degree:'}</span> {selectedStudent.degree}
                  </div>
                </div>
              </div>
            </div>

            {/* Quote */}
            <blockquote className="italic text-gray-700 text-lg leading-relaxed mb-6 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg border-l-4 border-primary-400">
              "{selectedStudent.quote[language]}"
            </blockquote>

            {/* Success Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {Object.entries(selectedStudent.successMetrics).map(([key, value]) => (
                <div key={key} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary-600 mb-1">{value}%</div>
                  <div className="text-sm text-gray-600 capitalize">
                    {language === 'pt' ? 
                      (key === 'networking' ? 'Networking' : 
                       key === 'cultural' ? 'Cultural' :
                       key === 'academic' ? 'Académico' : 'Profissional') :
                      key
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Journey Steps Visualization */}
        <div className="mb-16">
          {/* Desktop Journey Flow */}
          <div className="hidden md:block">
            <div className="flex items-center justify-between max-w-6xl mx-auto">
              {selectedStudent.journey.map((step, index) => (
                <React.Fragment key={step.id}>
                  {/* Step */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    onClick={() => setActiveStep(index)}
                    className={`
                      relative flex-1 max-w-xs cursor-pointer group
                      ${activeStep === index ? 'z-10' : 'z-0'}
                    `}
                  >
                    <div className={`
                      p-6 rounded-2xl border-2 transition-all duration-300 shadow-lg
                      ${activeStep === index 
                        ? `${step.bgColor} scale-105 shadow-2xl` 
                        : 'bg-white border-gray-200 hover:border-gray-300 hover:scale-102'
                      }
                    `}>
                      {/* Icon */}
                      <div className="text-center mb-4">
                        <div className={`
                          w-16 h-16 mx-auto rounded-full flex items-center justify-center text-2xl
                          ${activeStep === index ? step.bgColor : 'bg-gray-100'}
                          border-2 ${activeStep === index ? step.color.replace('text-', 'border-') : 'border-gray-300'}
                          transition-all duration-300
                        `}>
                          <span className="text-3xl">{step.icon}</span>
                        </div>
                        <div className="mt-2 text-lg">{step.flagEmoji}</div>
                      </div>

                      {/* Content */}
                      <div className="text-center">
                        <h4 className={`font-bold text-lg mb-2 ${activeStep === index ? step.color : 'text-gray-900'}`}>
                          {step.title[language]}
                        </h4>
                        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                          {step.description[language]}
                        </p>
                        
                        {/* Achievements */}
                        {activeStep === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            transition={{ duration: 0.3 }}
                            className="space-y-2"
                          >
                            {step.achievements.map((achievement, achievementIndex) => (
                              <div key={achievementIndex} className="flex items-center text-xs text-gray-600">
                                <CheckCircleIcon className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                                {achievement}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </div>

                      {/* Stats */}
                      <div className="mt-4 pt-4 border-t border-gray-200 text-center">
                        <div className="text-xs font-medium text-gray-500">
                          {step.stats[language]}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Arrow */}
                  {index < selectedStudent.journey.length - 1 && (
                    <div className="flex-shrink-0 px-4">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: (index * 0.2) + 0.1 }}
                        className="text-primary-400 hover:text-primary-600 transition-colors"
                      >
                        <ArrowRightIcon className="w-8 h-8" />
                      </motion.div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Mobile Journey Flow */}
          <div className="md:hidden space-y-6">
            {selectedStudent.journey.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`
                  p-6 rounded-2xl border-2 transition-all duration-300
                  ${step.bgColor} shadow-lg
                `}
              >
                {/* Header */}
                <div className="flex items-center mb-4">
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center text-xl mr-4
                    ${step.bgColor} border-2 ${step.color.replace('text-', 'border-')}
                  `}>
                    <span>{step.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-bold text-lg ${step.color}`}>
                      {step.title[language]}
                    </h4>
                    <div className="text-lg">{step.flagEmoji}</div>
                  </div>
                  <div className="text-2xl font-bold text-gray-400">
                    {index + 1}
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {step.description[language]}
                </p>

                {/* Achievements */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {step.achievements.map((achievement, achievementIndex) => (
                    <div key={achievementIndex} className="flex items-center text-sm text-gray-600">
                      <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {achievement}
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="text-sm font-medium text-gray-600">
                    {step.stats[language]}
                  </div>
                </div>

                {/* Arrow for mobile */}
                {index < selectedStudent.journey.length - 1 && (
                  <div className="flex justify-center mt-6">
                    <div className="text-primary-400">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              {language === 'pt' 
                ? 'Comece a Sua Jornada de Sucesso' 
                : 'Start Your Success Journey'
              }
            </h3>
            <p className="text-lg mb-6 opacity-90">
              {language === 'pt'
                ? 'Junte-se a milhares de estudantes portugueses que encontraram o seu caminho para o sucesso através da LusoTown'
                : 'Join thousands of Lusophone students who found their path to success through LusoTown'
              }
            </p>
            <button className="
              bg-white text-primary-600 font-bold py-3 px-8 rounded-xl 
              hover:bg-gray-100 transition-all duration-200 
              shadow-lg hover:shadow-xl transform hover:scale-105
              min-h-[44px]
            ">
              {language === 'pt' ? 'Iniciar Jornada' : 'Begin Journey'}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}