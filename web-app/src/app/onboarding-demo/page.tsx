'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  HeartIcon, 
  UserPlusIcon,
  AcademicCapIcon,
  StarIcon,
  GiftIcon 
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import UserOnboardingFlow from '@/components/UserOnboardingFlow'
import GrowthFeatures from '@/components/GrowthFeatures'
import toast from 'react-hot-toast'

export default function OnboardingDemo() {
  const { language, setLanguage } = useLanguage()
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [showGrowthFeatures, setShowGrowthFeatures] = useState(false)
  const [growthUserType, setGrowthUserType] = useState<'new_member' | 'student' | 'referrer' | 'general'>('new_member')
  const [onboardingData, setOnboardingData] = useState<any>(null)

  const isPortuguese = language === 'pt'

  const handleOnboardingComplete = (data: any) => {
    console.log('Onboarding completed with data:', data)
    setOnboardingData(data)
    setShowOnboarding(false)
    toast.success(isPortuguese ? 'Bem-vindo à LusoTown!' : 'Welcome to LusoTown!')
    
    // Show growth features after onboarding
    setTimeout(() => {
      setShowGrowthFeatures(true)
    }, 500)
  }

  const handleOnboardingClose = () => {
    setShowOnboarding(false)
    toast.error(isPortuguese ? 'Onboarding cancelado' : 'Onboarding cancelled')
  }

  const handleGrowthFeaturesComplete = (action: string, data?: any) => {
    console.log('Growth feature action:', action, data)
    
    switch (action) {
      case 'claim_welcome_bonus':
        toast.success(isPortuguese ? 'Bónus de boas-vindas ativado!' : 'Welcome bonus activated!')
        break
      case 'student_verification_started':
        toast.success(isPortuguese ? 'Verificação de estudante iniciada!' : 'Student verification started!')
        break
      case 'referral_code_copied':
        navigator.clipboard.writeText(data?.code || 'DEMO123')
        toast.success(isPortuguese ? 'Código de convite copiado!' : 'Referral code copied!')
        break
      case 'share_referral_whatsapp':
        const whatsappMessage = isPortuguese 
          ? `Olá! Junta-te à maior comunidade portuguesa em Londres: ${(process.env.NEXT_PUBLIC_SITE_URL||'').trim() || require('@/config/site').SITE_URL}/?ref=${data?.code}`
          : `Hi! Join London's largest Portuguese community: ${(process.env.NEXT_PUBLIC_SITE_URL||'').trim() || require('@/config/site').SITE_URL}/?ref=${data?.code}`
        window.open(`https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`, '_blank')
        break
      case 'share_referral_generic':
  navigator.clipboard.writeText(`${(process.env.NEXT_PUBLIC_SITE_URL||'').trim() || require('@/config/site').SITE_URL}/?ref=${data?.code}`)
        toast.success(isPortuguese ? 'Link de convite copiado!' : 'Referral link copied!')
        break
      case 'start_premium_trial':
        toast.success(isPortuguese ? 'Teste premium de 7 dias iniciado!' : '7-day premium trial started!')
        break
      default:
  toast(`Action: ${action}`)
        break
    }
  }

  const handleGrowthFeaturesClose = () => {
    setShowGrowthFeatures(false)
  }

  const demoButtons = [
    {
      id: 'onboarding',
      title: isPortuguese ? 'Fluxo de Onboarding' : 'Onboarding Flow',
      description: isPortuguese 
        ? 'Complete experiência de onboarding para novos utilizadores'
        : 'Complete onboarding experience for new users',
      icon: HeartIcon,
      color: 'from-primary-500 to-secondary-500',
      onClick: () => setShowOnboarding(true)
    },
    {
      id: 'growth-new-member',
      title: isPortuguese ? 'Novo Membro' : 'New Member',
      description: isPortuguese 
        ? 'Benefícios e bónus para novos membros'
        : 'Benefits and bonuses for new members',
      icon: GiftIcon,
      color: 'from-green-500 to-blue-500',
      onClick: () => {
        setGrowthUserType('new_member')
        setShowGrowthFeatures(true)
      }
    },
    {
      id: 'growth-student',
      title: isPortuguese ? 'Estudante' : 'Student',
      description: isPortuguese 
        ? 'Descontos e benefícios para estudantes'
        : 'Discounts and benefits for students',
      icon: AcademicCapIcon,
      color: 'from-purple-500 to-pink-500',
      onClick: () => {
        setGrowthUserType('student')
        setShowGrowthFeatures(true)
      }
    },
    {
      id: 'growth-referrer',
      title: isPortuguese ? 'Sistema de Convites' : 'Referral System',
      description: isPortuguese 
        ? 'Convide amigos e ganhe recompensas'
        : 'Invite friends and earn rewards',
      icon: UserPlusIcon,
      color: 'from-orange-500 to-red-500',
      onClick: () => {
        setGrowthUserType('referrer')
        setShowGrowthFeatures(true)
      }
    },
    {
      id: 'growth-premium',
      title: isPortuguese ? 'Teste Premium' : 'Premium Trial',
      description: isPortuguese 
        ? 'Teste premium gratuito de 7 dias'
        : '7-day free premium trial',
      icon: StarIcon,
      color: 'from-yellow-500 to-orange-500',
      onClick: () => {
        setGrowthUserType('general')
        setShowGrowthFeatures(true)
      }
    }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="pt-16 pb-8">
        <section className="py-12">
          <div className="container-width">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center shadow-xl">
                    <HeartIcon className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-4xl font-bold text-gray-900">LusoTown</h1>
                </div>
                
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {isPortuguese ? 'Demonstração do Sistema de Onboarding' : 'Onboarding System Demo'}
                </h2>
                
                <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                  {isPortuguese 
                    ? 'Experimente o fluxo completo de onboarding e funcionalidades de crescimento para a comunidade portuguesa em Londres.'
                    : 'Experience the complete onboarding flow and growth features for the Portuguese community in London.'
                  }
                </p>

                {/* Language Toggle */}
                <div className="flex items-center justify-center gap-2 mb-8">
                  <button
                    onClick={() => setLanguage('en')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      language === 'en' 
                        ? 'bg-primary-500 text-white shadow-lg' 
                        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    🇬🇧 English
                  </button>
                  <button
                    onClick={() => setLanguage('pt')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      language === 'pt' 
                        ? 'bg-primary-500 text-white shadow-lg' 
                        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    🇵🇹 Português
                  </button>
                </div>
              </motion.div>

              {/* Demo Buttons Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {demoButtons.map((button, index) => (
                  <motion.div
                    key={button.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <button
                      onClick={button.onClick}
                      className="w-full p-6 bg-white border border-gray-200 rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-200 text-left"
                    >
                      <div className={`w-12 h-12 bg-gradient-to-r ${button.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <button.icon className="w-6 h-6 text-white" />
                      </div>
                      
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {button.title}
                      </h3>
                      
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {button.description}
                      </p>
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Onboarding Data Display */}
              {onboardingData && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    {isPortuguese ? 'Dados do Onboarding Coletados:' : 'Collected Onboarding Data:'}
                  </h3>
                  
                  <pre className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 overflow-auto">
                    {JSON.stringify(onboardingData, null, 2)}
                  </pre>
                  
                  <button
                    onClick={() => setOnboardingData(null)}
                    className="mt-4 text-sm text-red-600 hover:text-red-700"
                  >
                    {isPortuguese ? 'Limpar Dados' : 'Clear Data'}
                  </button>
                </motion.div>
              )}

              {/* Instructions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-6 border border-primary-200"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  {isPortuguese ? 'Como Usar:' : 'How to Use:'}
                </h3>
                
                <div className="space-y-3 text-sm text-gray-700">
                  <p>
                    {isPortuguese 
                      ? '1. Clique em "Fluxo de Onboarding" para experimentar o processo completo de integração de novos utilizadores.'
                      : '1. Click "Onboarding Flow" to experience the complete new user integration process.'
                    }
                  </p>
                  
                  <p>
                    {isPortuguese 
                      ? '2. Teste os diferentes tipos de utilizador (Novo Membro, Estudante, etc.) para ver benefícios específicos.'
                      : '2. Test different user types (New Member, Student, etc.) to see specific benefits.'
                    }
                  </p>
                  
                  <p>
                    {isPortuguese 
                      ? '3. Use o toggle de idioma para testar a experiência bilingue.'
                      : '3. Use the language toggle to test the bilingual experience.'
                    }
                  </p>
                  
                  <p>
                    {isPortuguese 
                      ? '4. Os dados coletados durante o onboarding serão exibidos abaixo para revisão.'
                      : '4. Data collected during onboarding will be displayed below for review.'
                    }
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      {/* Onboarding Flow */}
      <UserOnboardingFlow
        isOpen={showOnboarding}
        onClose={handleOnboardingClose}
        onComplete={handleOnboardingComplete}
      />

      {/* Growth Features */}
      <GrowthFeatures
        isOpen={showGrowthFeatures}
        onClose={handleGrowthFeaturesClose}
        userType={growthUserType}
        onActionComplete={handleGrowthFeaturesComplete}
      />
    </main>
  )
}