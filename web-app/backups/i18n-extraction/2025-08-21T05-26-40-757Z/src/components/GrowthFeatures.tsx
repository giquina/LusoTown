'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  GiftIcon,
  AcademicCapIcon,
  CalendarDaysIcon,
  UserPlusIcon,
  StarIcon,
  CurrencyPoundIcon,
  DocumentDuplicateIcon,
  CheckIcon,
  SparklesIcon,
  UserGroupIcon,
  HeartIcon,
  ArrowRightIcon,
  XMarkIcon,
  ShareIcon,
  BoltIcon,
  TrophyIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline'
import { 
  CheckBadgeIcon,
  StarIcon as StarSolidIcon,
  GiftIcon as GiftSolidIcon 
} from '@heroicons/react/24/solid'
import { useLanguage } from '@/context/LanguageContext'

interface GrowthFeaturesProps {
  isOpen: boolean
  onClose: () => void
  userType?: 'new_member' | 'student' | 'referrer' | 'general'
  onActionComplete?: (action: string, data?: any) => void
}

export default function GrowthFeatures({
  isOpen,
  onClose,
  userType = 'general',
  onActionComplete
}: GrowthFeaturesProps) {
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState('welcome_bonus')
  const [referralCode, setReferralCode] = useState('')
  const [isGeneratingCode, setIsGeneratingCode] = useState(false)
  const [studentVerification, setStudentVerification] = useState({
    university: '',
    email: '',
    status: 'pending'
  })
  const [mounted, setMounted] = useState(false)

  const isPortuguese = language === 'pt'

  useEffect(() => {
    setMounted(true)
    // Generate referral code for existing users
    if (userType === 'referrer') {
      generateReferralCode()
    }
  }, [userType])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
    } else {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }
  }, [isOpen])

  if (!mounted) return null

  const generateReferralCode = async () => {
    setIsGeneratingCode(true)
    // Simulate API call to generate unique referral code
    await new Promise(resolve => setTimeout(resolve, 1000))
    const code = `LUSO${Math.random().toString(36).substring(2, 8).toUpperCase()}`
    setReferralCode(code)
    setIsGeneratingCode(false)
  }

  const copyReferralCode = async () => {
    if (referralCode) {
      await navigator.clipboard.writeText(referralCode)
      onActionComplete?.('referral_code_copied', { code: referralCode })
    }
  }

  const handleStudentVerification = () => {
    onActionComplete?.('student_verification_started', studentVerification)
    setActiveTab('student_perks')
  }

  const tabs = [
    {
      id: 'welcome_bonus',
      name: isPortuguese ? 'Bónus Boas-vindas' : 'Welcome Bonus',
      icon: GiftSolidIcon,
      available: ['new_member', 'general']
    },
    {
      id: 'student_perks',
      name: isPortuguese ? 'Descontos Estudante' : 'Student Perks',
      icon: AcademicCapIcon,
      available: ['student', 'general']
    },
    {
      id: 'referral_rewards',
      name: isPortuguese ? 'Convide Amigos' : 'Invite Friends',
      icon: UserPlusIcon,
      available: ['referrer', 'general', 'new_member']
    },
    {
      id: 'premium_trial',
      name: isPortuguese ? 'Teste Premium' : 'Premium Trial',
      icon: StarSolidIcon,
      available: ['new_member', 'general']
    }
  ]

  const availableTabs = tabs.filter(tab => tab.available.includes(userType))

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
        >
          {/* Mobile Layout */}
          <div className="block sm:hidden h-full overflow-y-auto">
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="min-h-full bg-white"
            >
              {/* Mobile Header */}
              <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                      <GiftIcon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h1 className="font-bold text-gray-900">
                        {isPortuguese ? 'Benefícios' : 'Benefits'}
                      </h1>
                      <p className="text-xs text-gray-600">
                        {isPortuguese ? 'Aproveite as suas vantagens' : 'Enjoy your perks'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Mobile Tabs */}
                <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                  {availableTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <tab.icon className="w-4 h-4" />
                        <span>{tab.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Content */}
              <div className="p-6">
                {renderTabContent(activeTab, true)}
              </div>
            </motion.div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden sm:flex items-center justify-center min-h-full p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white max-w-5xl w-full rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Desktop Header */}
              <div className="flex-shrink-0 relative px-8 py-6 border-b bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                      <GiftIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">
                        {isPortuguese ? 'Benefícios da Comunidade' : 'Community Benefits'}
                      </h1>
                      <p className="text-sm text-gray-600">
                        {isPortuguese 
                          ? 'Aproveite todas as vantagens de ser membro'
                          : 'Enjoy all the perks of being a member'
                        }
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
                
                {/* Desktop Tabs */}
                <div className="mt-6 flex gap-2">
                  {availableTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-6 py-3 rounded-xl text-sm font-medium transition-all ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                          : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <tab.icon className="w-4 h-4" />
                        <span>{tab.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Desktop Content */}
              <div className="flex-1 overflow-y-auto p-8">
                {renderTabContent(activeTab, false)}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  function renderTabContent(tab: string, isMobile: boolean) {
    switch (tab) {
      case 'welcome_bonus':
        return <WelcomeBonusContent isMobile={isMobile} />
      case 'student_perks':
        return <StudentPerksContent isMobile={isMobile} />
      case 'referral_rewards':
        return <ReferralRewardsContent isMobile={isMobile} />
      case 'premium_trial':
        return <PremiumTrialContent isMobile={isMobile} />
      default:
        return <WelcomeBonusContent isMobile={isMobile} />
    }
  }

  function WelcomeBonusContent({ isMobile }: { isMobile: boolean }) {
    const bonuses = [
      {
        icon: CalendarDaysIcon,
        title: isPortuguese ? 'Primeiro Evento Grátis' : 'First Event Free',
        description: isPortuguese 
          ? 'Participe no seu primeiro evento português sem custos'
          : 'Join your first Portuguese event at no cost',
        value: '£25',
        color: 'from-blue-500 to-blue-600',
        available: true
      },
      {
        icon: SparklesIcon,
        title: isPortuguese ? 'Acesso Premium 7 Dias' : '7-Day Premium Access',
        description: isPortuguese
          ? 'Acesso completo a todos os recursos premium'
          : 'Full access to all premium features',
        value: '£19.99',
        color: 'from-purple-500 to-purple-600',
        available: userType === 'new_member'
      },
      {
        icon: UserGroupIcon,
        title: isPortuguese ? 'Destaque no Perfil' : 'Profile Highlight',
        description: isPortuguese
          ? 'Apareça em destaque para outros portugueses'
          : 'Get highlighted to other Portuguese speakers',
        value: '£15',
        color: 'from-green-500 to-green-600',
        available: true
      },
      {
        icon: HeartIcon,
        title: isPortuguese ? 'Matches Ilimitados' : 'Unlimited Matches',
        description: isPortuguese
          ? 'Sem limites nos seus matches portugueses'
          : 'No limits on your Portuguese matches',
        value: '£9.99',
        color: 'from-pink-500 to-red-500',
        available: true
      }
    ]

    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className={`${isMobile ? 'w-16 h-16' : 'w-20 h-20'} mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-xl`}
          >
            <GiftSolidIcon className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} text-white`} />
          </motion.div>
          
          <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-gray-900`}>
            {isPortuguese ? 'Bónus de Boas-vindas!' : 'Welcome Bonus!'}
          </h3>
          
          <p className="text-gray-600">
            {isPortuguese 
              ? 'Como novo membro, tem acesso a estes benefícios exclusivos'
              : 'As a new member, you get access to these exclusive benefits'
            }
          </p>
        </div>

        <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-2 gap-6'}`}>
          {bonuses.map((bonus, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 bg-white border-2 rounded-xl shadow-sm relative ${
                bonus.available 
                  ? 'border-gray-200 hover:border-purple-300 hover:shadow-lg' 
                  : 'border-gray-100 opacity-60'
              } transition-all`}
            >
              {bonus.available && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckIcon className="w-4 h-4 text-white" />
                </div>
              )}
              
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${bonus.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <bonus.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`font-bold text-gray-900 ${isMobile ? 'text-sm' : 'text-base'}`}>
                      {bonus.title}
                    </h4>
                    <span className="text-sm font-bold text-purple-600">
                      {bonus.value}
                    </span>
                  </div>
                  <p className={`text-gray-600 ${isMobile ? 'text-xs' : 'text-sm'} leading-relaxed`}>
                    {bonus.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <TrophyIcon className="w-6 h-6 text-purple-600" />
            <span className="text-lg font-bold text-purple-900">
              {isPortuguese ? 'Valor Total' : 'Total Value'}
            </span>
          </div>
          <div className="text-3xl font-bold text-purple-600 mb-2">£69.97</div>
          <p className="text-purple-700 text-sm">
            {isPortuguese 
              ? 'Benefícios exclusivos para novos membros portugueses'
              : 'Exclusive benefits for new Portuguese members'
            }
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          onClick={() => onActionComplete?.('claim_welcome_bonus')}
          className={`${isMobile ? 'w-full' : 'mx-auto'} flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`}
        >
          <BoltIcon className="w-5 h-5" />
          <span>{isPortuguese ? 'Ativar Benefícios' : 'Activate Benefits'}</span>
        </motion.button>
      </div>
    )
  }

  function StudentPerksContent({ isMobile }: { isMobile: boolean }) {
    const universities = [
      'King\'s College London',
      'University College London',
      'Imperial College London',
      'London School of Economics',
      'Queen Mary University',
      'City University London',
      'Goldsmiths University',
      'University of Westminster'
    ]

    const studentBenefits = [
      {
        icon: CurrencyPoundIcon,
        title: isPortuguese ? '50% Desconto' : '50% Discount',
        description: isPortuguese ? 'Em todos os eventos e serviços' : 'On all events and services',
        value: '£12.50/mês'
      },
      {
        icon: CalendarDaysIcon,
        title: isPortuguese ? 'Eventos Exclusivos' : 'Exclusive Events',
        description: isPortuguese ? 'Eventos só para estudantes portugueses' : 'Events just for Portuguese students',
        value: 'Mensais'
      },
      {
        icon: UserGroupIcon,
        title: isPortuguese ? 'Rede de Estudantes' : 'Student Network',
        description: isPortuguese ? 'Conecte com 2,150+ estudantes portugueses' : 'Connect with 2,150+ Portuguese students',
        value: '2,150+'
      }
    ]

    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className={`${isMobile ? 'w-16 h-16' : 'w-20 h-20'} mx-auto bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-xl`}
          >
            <AcademicCapIcon className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} text-white`} />
          </motion.div>
          
          <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-gray-900`}>
            {isPortuguese ? 'Benefícios de Estudante' : 'Student Benefits'}
          </h3>
          
          <p className="text-gray-600">
            {isPortuguese 
              ? 'Descontos especiais para estudantes portugueses em Londres'
              : 'Special discounts for Portuguese students in London'
            }
          </p>
        </div>

        {/* Student Benefits */}
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-1 gap-4'}`}>
          {studentBenefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <benefit.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className={`font-semibold text-gray-900 ${isMobile ? 'text-sm' : 'text-base'}`}>
                    {benefit.title}
                  </h4>
                  <span className="text-sm font-bold text-blue-600">
                    {benefit.value}
                  </span>
                </div>
                <p className={`text-gray-600 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Verification Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200"
        >
          <h4 className={`font-bold text-gray-900 mb-4 ${isMobile ? 'text-base' : 'text-lg'}`}>
            {isPortuguese ? 'Verificar Estado de Estudante' : 'Verify Student Status'}
          </h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isPortuguese ? 'Universidade' : 'University'}
              </label>
              <select
                value={studentVerification.university}
                onChange={(e) => setStudentVerification(prev => ({ ...prev, university: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">
                  {isPortuguese ? 'Selecione a sua universidade' : 'Select your university'}
                </option>
                {universities.map((uni) => (
                  <option key={uni} value={uni}>{uni}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isPortuguese ? 'Email Universitário' : 'University Email'}
              </label>
              <input
                type="email"
                value={studentVerification.email}
                onChange={(e) => setStudentVerification(prev => ({ ...prev, email: e.target.value }))}
                placeholder={isPortuguese ? 'seuemail@university.ac.uk' : 'youremail@university.ac.uk'}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <button
            onClick={handleStudentVerification}
            disabled={!studentVerification.university || !studentVerification.email}
            className={`w-full mt-6 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold transition-all ${
              studentVerification.university && studentVerification.email
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <CheckBadgeIcon className="w-5 h-5" />
            <span>{isPortuguese ? 'Verificar Estado' : 'Verify Status'}</span>
          </button>
        </motion.div>
      </div>
    )
  }

  function ReferralRewardsContent({ isMobile }: { isMobile: boolean }) {
    const rewards = [
      {
        referrals: 1,
        reward: isPortuguese ? 'Evento Grátis' : 'Free Event',
        value: '£25',
        icon: CalendarDaysIcon,
        color: 'from-green-500 to-green-600'
      },
      {
        referrals: 3,
        reward: isPortuguese ? 'Mês Premium' : 'Premium Month',
        value: '£19.99',
        icon: StarSolidIcon,
        color: 'from-purple-500 to-purple-600'
      },
      {
        referrals: 5,
        reward: isPortuguese ? '3 Meses Premium' : '3 Premium Months',
        value: '£59.97',
        icon: TrophyIcon,
        color: 'from-yellow-500 to-orange-500'
      },
      {
        referrals: 10,
        reward: isPortuguese ? 'Ano Premium Grátis' : 'Free Premium Year',
        value: '£239.88',
        icon: CreditCardIcon,
        color: 'from-blue-500 to-blue-600'
      }
    ]

    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className={`${isMobile ? 'w-16 h-16' : 'w-20 h-20'} mx-auto bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center shadow-xl`}
          >
            <UserPlusIcon className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} text-white`} />
          </motion.div>
          
          <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-gray-900`}>
            {isPortuguese ? 'Convide Amigos & Ganhe' : 'Invite Friends & Earn'}
          </h3>
          
          <p className="text-gray-600">
            {isPortuguese 
              ? 'Convide outros portugueses e ganhe recompensas incríveis'
              : 'Invite other Portuguese speakers and earn amazing rewards'
            }
          </p>
        </div>

        {/* Referral Code Generation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200"
        >
          <h4 className={`font-bold text-gray-900 mb-4 ${isMobile ? 'text-base' : 'text-lg'}`}>
            {isPortuguese ? 'O Seu Código de Convite' : 'Your Invitation Code'}
          </h4>
          
          {referralCode ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-white rounded-xl border-2 border-dashed border-green-300">
                <div className="flex-1 font-mono text-xl font-bold text-green-600 text-center">
                  {referralCode}
                </div>
                <button
                  onClick={copyReferralCode}
                  className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <DocumentDuplicateIcon className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => onActionComplete?.('share_referral_whatsapp', { code: referralCode })}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                >
                  <ShareIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">WhatsApp</span>
                </button>
                
                <button
                  onClick={() => onActionComplete?.('share_referral_generic', { code: referralCode })}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                >
                  <ShareIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {isPortuguese ? 'Partilhar' : 'Share'}
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={generateReferralCode}
              disabled={isGeneratingCode}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-xl hover:from-green-600 hover:to-blue-600 transition-all disabled:opacity-50"
            >
              {isGeneratingCode ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  <span>{isPortuguese ? 'Gerando...' : 'Generating...'}</span>
                </>
              ) : (
                <>
                  <SparklesIcon className="w-5 h-5" />
                  <span>{isPortuguese ? 'Gerar Código' : 'Generate Code'}</span>
                </>
              )}
            </button>
          )}
        </motion.div>

        {/* Rewards Tier */}
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-2 gap-4'}`}>
          {rewards.map((reward, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-green-300 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 bg-gradient-to-r ${reward.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <reward.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className={`font-bold text-gray-900 ${isMobile ? 'text-sm' : 'text-base'}`}>
                    {reward.referrals} {isPortuguese ? 'Convite' : 'Referral'}{reward.referrals > 1 ? 's' : ''}
                  </div>
                  <div className="text-xs text-gray-600">
                    {reward.value} {isPortuguese ? 'valor' : 'value'}
                  </div>
                </div>
              </div>
              <div className={`text-center font-semibold text-gray-900 ${isMobile ? 'text-sm' : 'text-base'}`}>
                {reward.reward}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 border border-green-200"
        >
          <p className="text-sm text-green-700">
            {isPortuguese
              ? '💡 Dica: Os seus convidados também ganham um evento grátis!'
              : '💡 Tip: Your invitees also get a free event!'
            }
          </p>
        </motion.div>
      </div>
    )
  }

  function PremiumTrialContent({ isMobile }: { isMobile: boolean }) {
    const premiumFeatures = [
      {
        icon: StarSolidIcon,
        title: isPortuguese ? 'Matches Ilimitados' : 'Unlimited Matches',
        description: isPortuguese ? 'Conecte com quantos portugueses quiser' : 'Connect with as many Portuguese speakers as you want'
      },
      {
        icon: CalendarDaysIcon,
        title: isPortuguese ? 'Eventos Premium' : 'Premium Events',
        description: isPortuguese ? 'Acesso a eventos exclusivos para membros premium' : 'Access to exclusive premium member events'
      },
      {
        icon: UserGroupIcon,
        title: isPortuguese ? 'Destaque no Perfil' : 'Profile Boost',
        description: isPortuguese ? 'Apareça em primeiro nos resultados de pesquisa' : 'Appear first in search results'
      },
      {
        icon: SparklesIcon,
        title: isPortuguese ? 'Suporte Prioritário' : 'Priority Support',
        description: isPortuguese ? 'Suporte VIP da equipa LusoTown' : 'VIP support from the LusoTown team'
      }
    ]

    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className={`${isMobile ? 'w-16 h-16' : 'w-20 h-20'} mx-auto bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-xl`}
          >
            <StarSolidIcon className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} text-white`} />
          </motion.div>
          
          <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-gray-900`}>
            {isPortuguese ? 'Teste Premium Grátis' : 'Free Premium Trial'}
          </h3>
          
          <p className="text-gray-600">
            {isPortuguese 
              ? 'Experimente todas as funcionalidades premium por 7 dias'
              : 'Try all premium features for 7 days'
            }
          </p>
        </div>

        {/* Premium Features */}
        <div className="space-y-4">
          {premiumFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-xl"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className={`font-semibold text-gray-900 mb-1 ${isMobile ? 'text-sm' : 'text-base'}`}>
                  {feature.title}
                </h4>
                <p className={`text-gray-600 ${isMobile ? 'text-xs' : 'text-sm'} leading-relaxed`}>
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trial Offer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200 text-center"
        >
          <div className="space-y-4">
            <div>
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                {isPortuguese ? '7 Dias Grátis' : '7 Days Free'}
              </div>
              <div className="text-sm text-gray-600 line-through mb-1">£19.99/mês</div>
              <div className="text-lg font-bold text-gray-900">
                {isPortuguese ? 'Depois £19.99/mês' : 'Then £19.99/month'}
              </div>
            </div>
            
            <div className="text-xs text-gray-600">
              {isPortuguese
                ? 'Cancele a qualquer momento durante o período de teste'
                : 'Cancel anytime during trial period'
              }
            </div>
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          onClick={() => onActionComplete?.('start_premium_trial')}
          className={`${isMobile ? 'w-full' : 'mx-auto'} flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`}
        >
          <BoltIcon className="w-5 h-5" />
          <span>{isPortuguese ? 'Iniciar Teste Grátis' : 'Start Free Trial'}</span>
          <ArrowRightIcon className="w-5 h-5" />
        </motion.button>
      </div>
    )
  }
}