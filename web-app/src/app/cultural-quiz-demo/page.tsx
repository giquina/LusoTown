'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  SparklesIcon,
  HeartIcon,
  UsersIcon,
  TrophyIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import CulturalPreferenceQuiz from '@/components/CulturalPreferenceQuiz'

interface QuizResults {
  origin: string[]
  languagePreference: string
  culturalCelebrations: string[]
  professionalGoals: string[]
  culturalValues: string[]
  lifestyle: string[]
  compatibilityScore?: number
  matchingInsights?: string[]
}

export default function CulturalQuizDemoPage() {
  const { language } = useLanguage()
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizResults, setQuizResults] = useState<QuizResults | null>(null)
  const [showMatches, setShowMatches] = useState(false)

  const isPortuguese = language === 'pt'

  const handleQuizComplete = (results: QuizResults) => {
    setQuizResults(results)
    setShowQuiz(false)
    setTimeout(() => {
      setShowMatches(true)
    }, 1000)
  }

  const sampleMatches = [
    {
      id: '1',
      name: 'Maria Santos',
      age: 28,
      location: 'Vauxhall, London',
      compatibility: 92,
      photo: '/images/profiles/maria.jpg',
      interests: ['Fado', 'Santos Populares', 'Portuguese Cuisine'],
      bio: isPortuguese ? 
        'Portuguesa do Porto, adora eventos culturais e procura amigos para celebrar as tradições.' :
        'Portuguese from Porto, loves cultural events and looking for friends to celebrate traditions.',
      sharedElements: ['fado', 'santos_populares', 'gastronomy']
    },
    {
      id: '2',
      name: 'João Silva',
      age: 32,
      location: 'Camden, London',
      compatibility: 87,
      photo: '/images/profiles/joao.jpg',
      interests: ['Football', 'Business Networking', 'Portuguese Literature'],
      bio: isPortuguese ?
        'Empreendedor português em Londres, procura networking profissional na comunidade.' :
        'Portuguese entrepreneur in London, seeking professional networking within the community.',
      sharedElements: ['football', 'business_partnerships', 'literature_poetry']
    },
    {
      id: '3',
      name: 'Ana Rodrigues',
      age: 26,
      location: 'Stockwell, London',
      compatibility: 84,
      photo: '/images/profiles/ana.jpg',
      interests: ['Folk Music', 'Traditional Crafts', 'Family Values'],
      bio: isPortuguese ?
        'Açoriana apaixonada por preservar as tradições portuguesas em Londres.' :
        'Azorean passionate about preserving Portuguese traditions in London.',
      sharedElements: ['folk_traditions', 'crafts_arts', 'family_values']
    }
  ]

  if (showQuiz) {
    return (
      <CulturalPreferenceQuiz
        onComplete={handleQuizComplete}
        onSkip={() => setShowQuiz(false)}
        variant="matching"
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <SparklesIcon className="w-10 h-10 text-primary-600" />
            <h1 className="text-4xl font-bold text-neutral-900">
              {isPortuguese ? 
                'Matching Cultural Inteligente' : 
                'Intelligent Cultural Matching'
              }
            </h1>
            <HeartIcon className="w-10 h-10 text-coral-600" />
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-neutral-600 max-w-3xl mx-auto mb-8"
          >
            {isPortuguese ?
              'Descubra como o nosso quiz de preferências culturais cria conexões autênticas entre portugueses em Londres' :
              'Discover how our cultural preference quiz creates authentic connections between Portuguese speakers in London'
            }
          </motion.p>

          {!showMatches && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              onClick={() => setShowQuiz(true)}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              <SparklesIcon className="w-6 h-6" />
              {isPortuguese ? 'Iniciar Quiz Cultural' : 'Start Cultural Quiz'}
              <ArrowRightIcon className="w-5 h-5" />
            </motion.button>
          )}
        </div>

        {/* Quiz Benefits */}
        {!showMatches && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {[
              {
                icon: HeartIcon,
                title: isPortuguese ? 'Compatibilidade Cultural' : 'Cultural Compatibility',
                description: isPortuguese ? 
                  'Encontre pessoas que partilham as suas tradições e valores portugueses' :
                  'Find people who share your Portuguese traditions and values',
                color: 'coral'
              },
              {
                icon: UsersIcon,
                title: isPortuguese ? 'Conexões Autênticas' : 'Authentic Connections',
                description: isPortuguese ?
                  'Conecte-se com base em origem, língua e interesses culturais reais' :
                  'Connect based on real origin, language and cultural interests',
                color: 'primary'
              },
              {
                icon: TrophyIcon,
                title: isPortuguese ? 'Matching Inteligente' : 'Smart Matching',
                description: isPortuguese ?
                  'Algoritmo especializado em comunidade portuguesa com 95% de precisão' :
                  'Portuguese community specialized algorithm with 95% accuracy',
                color: 'secondary'
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-100"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-${benefit.color}-100 mb-6`}>
                  <benefit.icon className={`w-8 h-8 text-${benefit.color}-600`} />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-4">{benefit.title}</h3>
                <p className="text-neutral-600">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Quiz Results and Sample Matches */}
        {showMatches && quizResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            {/* Results Summary */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-100">
              <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                {isPortuguese ? 'O Seu Perfil Cultural' : 'Your Cultural Profile'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-coral-50 to-coral-100 rounded-xl p-6">
                  <div className="text-3xl font-bold text-coral-600 mb-2">
                    {quizResults.compatibilityScore}%
                  </div>
                  <p className="text-sm text-neutral-700">
                    {isPortuguese ? 'Pontuação Cultural' : 'Cultural Score'}
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6">
                  <div className="text-3xl font-bold text-primary-600 mb-2">
                    {quizResults.origin.length}
                  </div>
                  <p className="text-sm text-neutral-700">
                    {isPortuguese ? 'Origens Portuguesas' : 'Portuguese Origins'}
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-xl p-6">
                  <div className="text-3xl font-bold text-secondary-600 mb-2">
                    {quizResults.culturalCelebrations.length}
                  </div>
                  <p className="text-sm text-neutral-700">
                    {isPortuguese ? 'Tradições Partilhadas' : 'Shared Traditions'}
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-xl p-6">
                  <div className="text-3xl font-bold text-accent-600 mb-2">
                    {sampleMatches.length}
                  </div>
                  <p className="text-sm text-neutral-700">
                    {isPortuguese ? 'Matches Compatíveis' : 'Compatible Matches'}
                  </p>
                </div>
              </div>
              
              {quizResults.matchingInsights && quizResults.matchingInsights.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                    {isPortuguese ? 'Os Seus Destaques Culturais:' : 'Your Cultural Highlights:'}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {quizResults.matchingInsights.map((insight, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium"
                      >
                        <SparklesIcon className="w-4 h-4" />
                        {insight}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sample Matches */}
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-8">
                {isPortuguese ? 'Os Seus Matches Culturais' : 'Your Cultural Matches'}
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {sampleMatches.map((match, index) => (
                  <motion.div
                    key={match.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.2 }}
                    className="bg-white rounded-2xl shadow-lg border border-neutral-100 overflow-hidden"
                  >
                    <div className="relative">
                      <div className="h-48 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                        <div className="text-6xl opacity-20">👤</div>
                      </div>
                      <div className="absolute top-4 right-4">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                          <span className="text-sm font-bold text-green-600">
                            {match.compatibility}% {isPortuguese ? 'compatível' : 'compatible'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-neutral-900 mb-1">
                            {match.name}
                          </h3>
                          <p className="text-sm text-neutral-600">
                            {match.age} {isPortuguese ? 'anos' : 'years'} • {match.location}
                          </p>
                        </div>
                      </div>
                      
                      <p className="text-neutral-700 text-sm mb-4 line-clamp-2">
                        {match.bio}
                      </p>
                      
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-neutral-900 mb-2">
                          {isPortuguese ? 'Elementos Partilhados:' : 'Shared Elements:'}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {match.interests.slice(0, 3).map((interest, i) => (
                            <span
                              key={i}
                              className="bg-coral-100 text-coral-700 px-3 py-1 rounded-full text-xs font-medium"
                            >
                              {interest}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <button className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                        {isPortuguese ? 'Ver Perfil' : 'View Profile'}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 rounded-2xl p-8 text-center text-white"
            >
              <h3 className="text-2xl font-bold mb-4">
                {isPortuguese ? 
                  'Pronto para Encontrar a Sua Comunidade Portuguesa?' :
                  'Ready to Find Your Portuguese Community?'
                }
              </h3>
              <p className="text-primary-100 mb-6 text-lg">
                {isPortuguese ?
                  'Junte-se a milhares de portugueses que já encontraram conexões autênticas em Londres' :
                  'Join thousands of Portuguese speakers who have found authentic connections in London'
                }
              </p>
              <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
                <button className="w-full sm:w-auto bg-white text-primary-600 px-8 py-3 rounded-xl font-semibold hover:bg-primary-50 transition-all">
                  {isPortuguese ? 'Criar Conta' : 'Create Account'}
                </button>
                <button 
                  onClick={() => setShowQuiz(true)}
                  className="w-full sm:w-auto border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all"
                >
                  {isPortuguese ? 'Refazer Quiz' : 'Retake Quiz'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Feature Explanation */}
        {!showMatches && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-100"
          >
            <h2 className="text-2xl font-bold text-neutral-900 mb-6 text-center">
              {isPortuguese ? 'Como Funciona o Matching Cultural' : 'How Cultural Matching Works'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                  {isPortuguese ? 'O Que Analisamos:' : 'What We Analyze:'}
                </h3>
                <ul className="space-y-3">
                  {[
                    isPortuguese ? 'Origem portuguesa (Portugal, Brasil, África, Diáspora)' : 'Portuguese origins (Portugal, Brazil, Africa, Diaspora)',
                    isPortuguese ? 'Preferências de idioma e comunicação' : 'Language and communication preferences',
                    isPortuguese ? 'Tradições e celebrações culturais' : 'Cultural traditions and celebrations',
                    isPortuguese ? 'Objetivos profissionais e de networking' : 'Professional and networking goals',
                    isPortuguese ? 'Valores culturais e familiares' : 'Cultural and family values',
                    isPortuguese ? 'Estilo de vida em Londres' : 'London lifestyle preferences'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary-500 flex-shrink-0 mt-2"></div>
                      <span className="text-neutral-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                  {isPortuguese ? 'Vantagens do Sistema:' : 'System Benefits:'}
                </h3>
                <ul className="space-y-3">
                  {[
                    isPortuguese ? '95% de precisão nas recomendações' : '95% accuracy in recommendations',
                    isPortuguese ? 'Compatibilidade cultural detalhada' : 'Detailed cultural compatibility',
                    isPortuguese ? 'Conexões baseadas em valores partilhados' : 'Connections based on shared values',
                    isPortuguese ? 'Algoritmo especializado em comunidade portuguesa' : 'Portuguese community specialized algorithm',
                    isPortuguese ? 'Atualização contínua de preferências' : 'Continuous preference updates',
                    isPortuguese ? 'Integração com eventos culturais' : 'Integration with cultural events'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <SparklesIcon className="w-5 h-5 text-secondary-500 flex-shrink-0" />
                      <span className="text-neutral-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  )
}