'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import SuccessStoryIntroduction from '@/components/SuccessStoryIntroduction'
import { useLanguage } from '@/context/LanguageContext'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Users, 
  Trophy,
  Sparkles,
  Heart,
  Globe
} from 'lucide-react'

export default function SuccessStoriesDemoPage() {
  const router = useRouter()
  const { language } = useLanguage()
  const [showQuizModal, setShowQuizModal] = useState(false)

  const handleStartQuiz = () => {
    setShowQuizModal(true)
    // In a real implementation, this would navigate to a cultural compatibility quiz
    setTimeout(() => {
      setShowQuizModal(false)
      alert(language === 'pt' 
        ? 'Quiz cultural iniciado! (Esta é uma demonstração)' 
        : 'Cultural quiz started! (This is a demo)')
    }, 2000)
  }

  const handleSignUp = () => {
    // In a real implementation, this would navigate to the signup page
    router.push('/signup')
  }

  const translations = {
    en: {
      title: 'Success Stories Showcase',
      subtitle: 'Experience how Portuguese community success stories inspire new connections',
      backToMatches: 'Back to Matches',
      demoNote: 'This is a demonstration of our Success Story Introduction component',
      features: {
        authentic: 'Authentic Portuguese Stories',
        authenticity: 'Real stories from Portuguese speakers in London',
        diversity: 'Community Diversity',
        diversityDesc: 'Stories from Portugal, Brazil, Africa, and diaspora',
        verified: 'Verified Success Metrics',
        verifiedDesc: 'Quantified results and timeframes for authenticity',
        cultural: 'Cultural Connection',
        culturalDesc: 'Focus on Portuguese language, traditions, and values'
      },
      quizModalTitle: 'Starting Cultural Quiz...',
      quizModalText: 'Preparing your personalized Portuguese compatibility assessment'
    },
    pt: {
      title: 'Apresentação de Histórias de Sucesso',
      subtitle: 'Experimente como as histórias de sucesso da comunidade portuguesa inspiram novas conexões',
      backToMatches: 'Voltar aos Matches',
      demoNote: 'Esta é uma demonstração do nosso componente de Introdução de Histórias de Sucesso',
      features: {
        authentic: 'Histórias Portuguesas Autênticas',
        authenticity: 'Histórias reais de falantes de português em Londres',
        diversity: 'Diversidade da Comunidade',
        diversityDesc: 'Histórias de Portugal, Brasil, África e diáspora',
        verified: 'Métricas de Sucesso Verificadas',
        verifiedDesc: 'Resultados quantificados e cronogramas para autenticidade',
        cultural: 'Conexão Cultural',
        culturalDesc: 'Foco na língua, tradições e valores portugueses'
      },
      quizModalTitle: 'A Iniciar Quiz Cultural...',
      quizModalText: 'A preparar a sua avaliação personalizada de compatibilidade portuguesa'
    }
  }

  const t = translations[language]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-primary-100 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-primary-600 hover:text-primary-800 mb-6 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              {t.backToMatches}
            </button>
            
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-900 mb-4">
                {t.title}
              </h1>
              <p className="text-xl sm:text-2xl text-primary-700 max-w-4xl mx-auto mb-8">
                {t.subtitle}
              </p>
              
              {/* Demo Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-primary-200">
                  <Trophy className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-primary-900 mb-1">{t.features.authentic}</h3>
                  <p className="text-sm text-primary-700">{t.features.authenticity}</p>
                </div>
                
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-secondary-200">
                  <Globe className="w-8 h-8 text-secondary-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-secondary-900 mb-1">{t.features.diversity}</h3>
                  <p className="text-sm text-secondary-700">{t.features.diversityDesc}</p>
                </div>
                
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-accent-200">
                  <Sparkles className="w-8 h-8 text-accent-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-accent-900 mb-1">{t.features.verified}</h3>
                  <p className="text-sm text-accent-700">{t.features.verifiedDesc}</p>
                </div>
                
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-coral-200">
                  <Heart className="w-8 h-8 text-coral-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-coral-900 mb-1">{t.features.cultural}</h3>
                  <p className="text-sm text-coral-700">{t.features.culturalDesc}</p>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
                <p className="text-blue-800 text-sm font-medium">{t.demoNote}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Success Stories Component */}
      <SuccessStoryIntroduction 
        onStartQuiz={handleStartQuiz}
        onSignUp={handleSignUp}
      />

      {/* Quiz Modal */}
      {showQuizModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl"
          >
            <div className="text-4xl mb-4">🧭</div>
            <h3 className="text-2xl font-bold text-primary-900 mb-4">
              {t.quizModalTitle}
            </h3>
            <p className="text-primary-700 mb-6">
              {t.quizModalText}
            </p>
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}