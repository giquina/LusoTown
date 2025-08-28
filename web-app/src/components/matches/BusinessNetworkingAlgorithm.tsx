'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CpuChipIcon,
  ChartBarIcon,
  UserGroupIcon,
  LightBulbIcon,
  Cog6ToothIcon,
  ArrowRightIcon,
  PlayIcon,
  CheckCircleIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'

interface BusinessNetworkingAlgorithmProps {
  onAlgorithmDemo: () => void
}

interface AlgorithmStep {
  id: string
  title: string
  description: string
  weight: number
  icon: React.ReactNode
  color: string
}

export default function BusinessNetworkingAlgorithm({ onAlgorithmDemo }: BusinessNetworkingAlgorithmProps) {
  const { language } = useLanguage()
  const [activeStep, setActiveStep] = useState(0)
  const [showDemo, setShowDemo] = useState(false)

  const algorithmSteps: AlgorithmStep[] = [
    {
      id: 'profile-analysis',
      title: language === 'pt' ? 'Análise do Perfil' : 'Profile Analysis',
      description: language === 'pt' 
        ? 'Analisa competências, experiência e objetivos profissionais'
        : 'Analyzes skills, experience, and professional goals',
      weight: 25,
      icon: <UserGroupIcon className="w-6 h-6" />,
      color: 'primary'
    },
    {
      id: 'industry-matching',
      title: language === 'pt' ? 'Correspondência por Setor' : 'Industry Matching',
      description: language === 'pt'
        ? 'Conecta profissionais em setores complementares ou similares'
        : 'Connects professionals in complementary or similar industries',
      weight: 20,
      icon: <ChartBarIcon className="w-6 h-6" />,
      color: 'secondary'
    },
    {
      id: 'cultural-compatibility',
      title: language === 'pt' ? 'Compatibilidade Cultural' : 'Cultural Compatibility',
      description: language === 'pt'
        ? 'Considera herança cultural e experiências compartilhadas'
        : 'Considers cultural heritage and shared experiences',
      weight: 15,
      icon: <SparklesIcon className="w-6 h-6" />,
      color: 'accent'
    },
    {
      id: 'geographic-proximity',
      title: language === 'pt' ? 'Proximidade Geográfica' : 'Geographic Proximity',
      description: language === 'pt'
        ? 'Prioriza conexões na mesma região ou cidade'
        : 'Prioritizes connections in the same region or city',
      weight: 15,
      icon: <Cog6ToothIcon className="w-6 h-6" />,
      color: 'coral'
    },
    {
      id: 'mentorship-potential',
      title: language === 'pt' ? 'Potencial de Mentoria' : 'Mentorship Potential',
      description: language === 'pt'
        ? 'Identifica oportunidades de mentoria e desenvolvimento'
        : 'Identifies mentorship and development opportunities',
      weight: 25,
      icon: <LightBulbIcon className="w-6 h-6" />,
      color: 'action'
    }
  ]

  const getStepColor = (color: string) => {
    const colors = {
      primary: 'bg-primary-500',
      secondary: 'bg-secondary-500',
      accent: 'bg-accent-500',
      coral: 'bg-coral-500',
      action: 'bg-action-500'
    }
    return colors[color as keyof typeof colors] || colors.primary
  }

  const getStepBorderColor = (color: string) => {
    const colors = {
      primary: 'border-primary-500',
      secondary: 'border-secondary-500',
      accent: 'border-accent-500',
      coral: 'border-coral-500',
      action: 'border-action-500'
    }
    return colors[color as keyof typeof colors] || colors.primary
  }

  const getStepTextColor = (color: string) => {
    const colors = {
      primary: 'text-primary-600',
      secondary: 'text-secondary-600',
      accent: 'text-accent-600',
      coral: 'text-coral-600',
      action: 'text-action-600'
    }
    return colors[color as keyof typeof colors] || colors.primary
  }

  const startDemo = () => {
    setShowDemo(true)
    setTimeout(() => {
      onAlgorithmDemo()
    }, 2000)
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl">
            <CpuChipIcon className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-primary-900">
            {language === 'pt' ? 'Algoritmo de Networking Inteligente' : 'Intelligent Networking Algorithm'}
          </h2>
        </div>
        <p className="text-lg text-primary-600 max-w-3xl mx-auto">
          {language === 'pt'
            ? 'Nosso algoritmo avançado analisa múltiplos fatores para criar conexões profissionais significativas na comunidade portuguesa'
            : 'Our advanced algorithm analyzes multiple factors to create meaningful professional connections in the Portuguese community'
          }
        </p>
      </div>

      {/* Algorithm Steps */}
      <div className="bg-white rounded-2xl shadow-lg border border-primary-100 p-8">
        <h3 className="text-2xl font-bold text-primary-900 mb-6 text-center">
          {language === 'pt' ? 'Como Funciona o Algoritmo' : 'How the Algorithm Works'}
        </h3>
        
        <div className="space-y-6">
          {algorithmSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setActiveStep(index)}
              className={`cursor-pointer border-2 rounded-xl p-6 transition-all duration-300 ${
                activeStep === index
                  ? `${getStepBorderColor(step.color)} bg-gray-50 shadow-md`
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl ${getStepColor(step.color)} text-white`}>
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h4>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${getStepTextColor(step.color)}`}>
                    {step.weight}%
                  </div>
                  <div className="text-sm text-gray-500">{language === 'pt' ? 'Peso' : 'Weight'}</div>
                </div>
              </div>
              
              <AnimatePresence>
                {activeStep === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-gray-200"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">
                          {language === 'pt' ? 'Fatores Analisados' : 'Factors Analyzed'}
                        </h5>
                        <ul className="space-y-1 text-gray-600">
                          {step.id === 'profile-analysis' && (
                            <>
                              <li>• {language === 'pt' ? 'Competências técnicas' : 'Technical skills'}</li>
                              <li>• {language === 'pt' ? 'Nível de experiência' : 'Experience level'}</li>
                              <li>• {language === 'pt' ? 'Objetivos de carreira' : 'Career goals'}</li>
                            </>
                          )}
                          {step.id === 'industry-matching' && (
                            <>
                              <li>• {language === 'pt' ? 'Setor de atuação' : 'Industry sector'}</li>
                              <li>• {language === 'pt' ? 'Tamanho da empresa' : 'Company size'}</li>
                              <li>• {language === 'pt' ? 'Função atual' : 'Current role'}</li>
                            </>
                          )}
                          {step.id === 'cultural-compatibility' && (
                            <>
                              <li>• {language === 'pt' ? 'Origem cultural' : 'Cultural background'}</li>
                              <li>• {language === 'pt' ? 'Idiomas falados' : 'Languages spoken'}</li>
                              <li>• {language === 'pt' ? 'Valores compartilhados' : 'Shared values'}</li>
                            </>
                          )}
                          {step.id === 'geographic-proximity' && (
                            <>
                              <li>• {language === 'pt' ? 'Localização atual' : 'Current location'}</li>
                              <li>• {language === 'pt' ? 'Disponibilidade de encontro' : 'Meeting availability'}</li>
                              <li>• {language === 'pt' ? 'Preferências de transporte' : 'Transport preferences'}</li>
                            </>
                          )}
                          {step.id === 'mentorship-potential' && (
                            <>
                              <li>• {language === 'pt' ? 'Diferença de experiência' : 'Experience gap'}</li>
                              <li>• {language === 'pt' ? 'Disponibilidade para mentorar' : 'Mentoring availability'}</li>
                              <li>• {language === 'pt' ? 'Objetivos de aprendizagem' : 'Learning objectives'}</li>
                            </>
                          )}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">
                          {language === 'pt' ? 'Resultado' : 'Output'}
                        </h5>
                        <p className="text-gray-600">
                          {language === 'pt' 
                            ? 'Pontuação de compatibilidade de 0-100 baseada nos fatores analisados'
                            : 'Compatibility score of 0-100 based on analyzed factors'
                          }
                        </p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">
                          {language === 'pt' ? 'Impacto' : 'Impact'}
                        </h5>
                        <p className="text-gray-600">
                          {step.weight}% {language === 'pt' ? 'da pontuação total de match' : 'of total match score'}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Algorithm Demo */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-bold text-primary-900 mb-4">
          {language === 'pt' ? 'Veja o Algoritmo em Ação' : 'See the Algorithm in Action'}
        </h3>
        <p className="text-primary-700 mb-6">
          {language === 'pt'
            ? 'Experimente uma demonstração do nosso sistema de matching profissional'
            : 'Try a demonstration of our professional matching system'
          }
        </p>
        
        {!showDemo ? (
          <button
            onClick={startDemo}
            className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-primary-700 hover:to-secondary-700 transition-all shadow-lg flex items-center gap-3 mx-auto"
          >
            <PlayIcon className="w-6 h-6" />
            {language === 'pt' ? 'Iniciar Demonstração' : 'Start Demo'}
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-center space-x-2 text-primary-600">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
              <span className="font-semibold">
                {language === 'pt' ? 'Processando perfis...' : 'Processing profiles...'}
              </span>
            </div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2 }}
              className="h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mx-auto max-w-md"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="flex items-center justify-center space-x-2 text-green-600"
            >
              <CheckCircleIcon className="w-6 h-6" />
              <span className="font-semibold">
                {language === 'pt' ? 'Matches encontrados!' : 'Matches found!'}
              </span>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="text-3xl font-bold text-primary-600 mb-2">92%</div>
          <div className="text-gray-600">{language === 'pt' ? 'Precisão do Algoritmo' : 'Algorithm Accuracy'}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="text-3xl font-bold text-secondary-600 mb-2">2,500+</div>
          <div className="text-gray-600">{language === 'pt' ? 'Conexões Criadas' : 'Connections Made'}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="text-3xl font-bold text-accent-600 mb-2">0.3s</div>
          <div className="text-gray-600">{language === 'pt' ? 'Tempo Médio de Matching' : 'Average Match Time'}</div>
        </div>
      </div>
    </div>
  )
}