'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  XMarkIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  HeartIcon,
  CalendarDaysIcon,
  CheckIcon,
  StarIcon,
  UsersIcon,
  GiftIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'

// Simple mobile language toggle component
function MobileLanguageToggle() {
  const { language, setLanguage } = useLanguage()
  
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'pt' : 'en')
  }
  
  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 hover:border-primary-300 transition-all text-xs font-medium min-h-[32px] min-w-[44px]"
      title="Toggle language / Alternar idioma"
    >
      <span className="text-sm">{language === 'en' ? '🇬🇧' : '🇵🇹'}</span>
      <span className="text-xs font-bold text-gray-600">{language === 'en' ? 'EN' : 'PT'}</span>
    </button>
  )
}

interface MobileWelcomeWizardProps {
  isOpen: boolean
  onClose: () => void
  onComplete: (selection: string) => void
}

const COMMUNITY_STATS = {
  members: '750+',
  events: '50+',
  satisfaction: '98%'
}

export default function MobileWelcomeWizard({
  isOpen,
  onClose,
  onComplete
}: MobileWelcomeWizardProps) {
  const { language, t } = useLanguage()
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedReason, setSelectedReason] = useState<string>('')
  const [mounted, setMounted] = useState(false)

  const isPortuguese = language === 'pt'

  useEffect(() => {
    setMounted(true)
  }, [])

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

  const steps = [
    {
      id: 'purpose',
      component: PurposeStep
    },
    {
      id: 'cultural',
      component: CulturalConnectionStep
    },
    {
      id: 'action',
      component: ActionStep
    }
  ]

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = (action: string) => {
    onComplete(action)
    onClose()
  }

  const CurrentStepComponent = steps[currentStep]?.component

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="w-full max-w-lg max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
              {/* Header */}
              <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-600 via-red-500 to-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">🇵🇹</span>
                    </div>
                    <span className="font-bold text-gray-900">LusoTown</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Simple Language Toggle */}
                    <MobileLanguageToggle />
                    <button
                      onClick={onClose}
                      className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
                      aria-label="Close welcome wizard"
                    >
                      <XMarkIcon className="w-6 h-6" />
                    </button>
                  </div>
                </div>
                
                {/* Progress dots */}
                <div className="flex justify-center mt-4 gap-2">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentStep
                          ? 'bg-gradient-to-r from-green-500 to-red-500 w-6'
                          : index < currentStep
                          ? 'bg-green-500'
                          : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-6 overflow-y-auto">
                {CurrentStepComponent && (
                  <CurrentStepComponent
                    selectedReason={selectedReason}
                    onReasonSelect={setSelectedReason}
                    onNext={nextStep}
                    onPrevious={previousStep}
                    onComplete={handleComplete}
                    isPortuguese={isPortuguese}
                    currentStep={currentStep}
                    totalSteps={steps.length}
                  />
                )}
              </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Step 1: Enhanced Lusophone Community Focus
function PurposeStep({ selectedReason, onReasonSelect, onNext, isPortuguese }: any) {
  const exclusiveMembershipOptions = [
    {
      id: 'cultural',
      title: isPortuguese ? 'Experiências Culturais Exclusivas' : 'Exclusive Cultural Experiences',
      subtitle: isPortuguese ? 'Eventos Lusófonos Exclusivos para Membros' : 'Members-Only Lusophone Cultural Events',
      description: isPortuguese 
        ? 'Fado privado de Portugal, festivais brasileiros autênticos, celebrações de independência PALOP, noites de Morna cabo-verdianas'
        : 'Private Fado from Portugal, authentic Brazilian festivals, PALOP independence celebrations, Cape Verdean Morna nights',
      membershipBenefit: isPortuguese ? 'Acesso a 50+ eventos culturais exclusivos mensalmente' : 'Access 50+ exclusive cultural events monthly',
      heritageExamples: isPortuguese ? 'Celebrando TODAS as culturas lusófonas igualmente' : 'Celebrating ALL Portuguese-speaking cultures equally',
      emoji: '🎭',
      gradient: 'from-purple-500 to-pink-500',
      flags: '🇵🇹🇧🇷🇦🇴🇨🇻'
    },
    {
      id: 'connections',
      title: isPortuguese ? 'Conexões Lusófonas Elite' : 'Elite Lusophone Connections',
      subtitle: isPortuguese ? 'Relacionamentos Lusófonos Curados' : 'Curated Lusophone-Speaking Relationships',
      description: isPortuguese 
        ? 'Conhecer pessoas distintas de Portugal, Brasil, Angola, Cabo Verde, Moçambique e todas as nações lusófonas'
        : 'Meet accomplished individuals from Portugal, Brazil, Angola, Cape Verde, Mozambique, and all Lusophone nations',
      membershipBenefit: isPortuguese ? 'Membros verificados de toda a diáspora lusófona global' : 'Verified members from across the global Portuguese-speaking diaspora',
      heritageExamples: isPortuguese ? 'Unidos pela Língua - Unidos pela Língua, não por fronteiras' : 'Unidos pela Língua - United by Language, not borders',
      emoji: '💎',
      gradient: 'from-red-500 to-orange-500',
      flags: '🇲🇿🇬🇼🇸🇹🇹🇱'
    },
    {
      id: 'community',
      title: isPortuguese ? 'Comunidade Premium da Diáspora' : 'Premium Diaspora Community',
      subtitle: isPortuguese ? 'Junte-se ao Círculo Lusófono Elite do Reino Unido' : 'Join the UK\'s Elite Lusophone Circle',
      description: isPortuguese 
        ? 'Networking com lusófonos bem-sucedidos - de Lisboa a São Paulo, Luanda a Praia, Maputo a Bissau'
        : 'Network with successful Portuguese speakers - from Lisboa to São Paulo, Luanda to Praia, Maputo to Bissau',
      membershipBenefit: isPortuguese ? '750+ membros verificados de todas as origens lusófonas' : '750+ verified members from all Portuguese-speaking backgrounds',
      heritageExamples: isPortuguese ? 'Segunda geração, herança mista e estudantes de língua bem-vindos' : 'Second-generation, mixed heritage, and language learners welcome',
      emoji: '🤝',
      gradient: 'from-green-500 to-teal-500',
      flags: '🇬🇧🌍'
    },
    {
      id: 'business',
      title: isPortuguese ? 'Rede de Negócios Lusófona Global' : 'Global Lusophone Business Network',
      subtitle: isPortuguese ? 'Elite de Negócios PALOP e Lusófona' : 'PALOP & Lusophone-Speaking Business Elite',
      description: isPortuguese 
        ? 'Acesso exclusivo a oportunidades de negócios em TODOS os mercados lusófonos e comunidades da diáspora'
        : 'Exclusive access to business opportunities across ALL Portuguese-speaking markets and diaspora communities',
      membershipBenefit: isPortuguese ? 'Receita combinada de membros £50M+ em mercados lusófonos' : '£50M+ combined member revenue across Lusophone markets',
      heritageExamples: isPortuguese ? 'Oportunidades de negócios PALOP, brasileiras, portuguesas e da diáspora' : 'PALOP, Brazilian, Lusophone, and diaspora business opportunities',
      emoji: '💼',
      gradient: 'from-blue-500 to-indigo-500',
      flags: '💰🌐'
    }
  ]

  const handleSelection = (reasonId: string) => {
    onReasonSelect(reasonId)
    setTimeout(onNext, 300)
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Welcome Message */}
      <div className="text-center space-y-3">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-16 h-16 mx-auto bg-gradient-to-br from-green-500 via-red-500 to-yellow-500 rounded-full flex items-center justify-center shadow-xl"
        >
          <span className="text-2xl">🌍</span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-gray-900"
        >
          {isPortuguese ? 'O QUE TE TRAZ À COMUNIDADE LUSÓFONA?' : 'WHAT BRINGS YOU TO THE LUSOPHONE COMMUNITY?'}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-base font-semibold text-primary-600"
        >
          {isPortuguese 
            ? 'Bem-vindos à comunidade lusófona mais exclusiva de Londres'
            : 'Welcome to London\'s exclusive Portuguese-speaking community'
          }
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-sm text-gray-600"
        >
          {isPortuguese 
            ? 'Seja de qualquer país lusófono ou onde o português é falado 🇵🇹🇧🇷🇦🇴🇨🇻🇲🇿🇬🇼🇸🇹🇹🇱'
            : 'Whether you\'re from 🇵🇹🇧🇷🇦🇴🇨🇻🇲🇿🇬🇼🇸🇹🇹🇱 or anywhere Lusophone is spoken'
          }
        </motion.p>
      </div>

      {/* Enhanced Membership Options */}
      <div className="space-y-4">
        {exclusiveMembershipOptions.map((option, index) => (
          <motion.button
            key={option.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            onClick={() => handleSelection(option.id)}
            className={`w-full p-4 bg-white border-2 border-gray-200 rounded-2xl hover:border-primary-300 hover:shadow-lg transition-all duration-200 text-left ${
              selectedReason === option.id ? 'border-primary-500 bg-primary-50' : ''
            }`}
          >
            <div className="space-y-3">
              {/* Header with emoji and flags */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 bg-gradient-to-r ${option.gradient} rounded-full flex items-center justify-center`}>
                    <span className="text-xl">{option.emoji}</span>
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-gray-900 text-sm leading-tight">
                      {option.title}
                    </div>
                    <div className="text-xs text-primary-600 font-semibold">
                      {option.subtitle}
                    </div>
                  </div>
                </div>
                <div className="text-lg">{option.flags}</div>
              </div>
              
              {/* Description */}
              <div className="text-xs text-gray-600 leading-relaxed">
                {option.description}
              </div>
              
              {/* Membership Benefit */}
              <div className="bg-gradient-to-r from-green-50 to-red-50 rounded-lg p-2">
                <div className="text-xs font-semibold text-green-700 mb-1">
                  {isPortuguese ? 'Benefício da Adesão:' : 'Membership Benefit:'}
                </div>
                <div className="text-xs text-green-600">
                  {option.membershipBenefit}
                </div>
              </div>
              
              {/* Heritage Promise */}
              <div className="text-xs text-gray-500 italic">
                {option.heritageExamples}
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

// Step 2: Dynamic Heritage Celebration & Membership Benefits
function CulturalConnectionStep({ selectedReason, onNext, onPrevious, isPortuguese }: any) {
  // Dynamic content based on user's selection from Step 1
  const getContentForSelection = (selection: string) => {
    const content = {
      cultural: {
        headline: isPortuguese ? 'Junte-se aos Membros Culturais Lusófonos Mais Exclusivos de Londres' : 'Join London\'s Most Exclusive Lusophone Cultural Members',
        icon: '🎭',
        activities: [
          { emoji: '🇵🇹', text: isPortuguese ? 'Performances privadas de Fado, celebrações dos Santos Populares' : 'Private Fado performances, Santos Populares celebrations' },
          { emoji: '🇧🇷', text: isPortuguese ? 'Preparações exclusivas de Carnaval, escolas de samba, Festa Junina' : 'Exclusive Carnival preparations, Samba schools, Festa Junina' },
          { emoji: '🇦🇴🇨🇻🇲🇿', text: isPortuguese ? 'Galas do dia da independência (Angola 11 Nov, Cabo Verde 5 Jul, Moçambique 25 Jun)' : 'Independence day galas (Angola Nov 11, Cape Verde July 5, Mozambique June 25)' },
          { emoji: '🌍', text: isPortuguese ? 'Eventos celebrando TODAS as nações lusófonas igualmente' : 'Events celebrating ALL Portuguese-speaking nations equally' },
          { emoji: '🍽️', text: isPortuguese ? 'Jantares privados em restaurantes autênticos de cada país lusófono' : 'Private dining at authentic restaurants from every Lusophone country' }
        ]
      },
      connections: {
        headline: isPortuguese ? 'Aceda à Comunidade de Encontros Lusófonos Mais Exclusiva do Reino Unido' : 'Access the UK\'s Most Exclusive Lusophone-Speaking Dating Community',
        icon: '💎',
        activities: [
          { emoji: '🌍', text: isPortuguese ? 'Membros de todos os países de língua portuguesa' : 'Members from all Portuguese-speaking countries' },
          { emoji: '❤️', text: isPortuguese ? 'Matching baseado na ligação linguística E valores culturais' : 'Match based on language connection AND cultural values' },
          { emoji: '✅', text: isPortuguese ? 'Perfis verificados com verificações profissionais e de herança' : 'Verified profiles with professional background checks and heritage verification' },
          { emoji: '🥂', text: isPortuguese ? 'Eventos mixer privados para diferentes grupos de herança' : 'Private mixer events for different heritage groups' },
          { emoji: '🇵🇹🇧🇷', text: isPortuguese ? 'Ligação através da língua portuguesa, independentemente da nacionalidade' : 'Connection through Portuguese language, regardless of nationality' }
        ]
      },
      community: {
        headline: isPortuguese ? 'Junte-se à Principal Rede Social Lusófona do Reino Unido' : 'Join the UK\'s Premier Lusophone-Speaking Social Network',
        icon: '🤝',
        activities: [
          { emoji: '🌍', text: isPortuguese ? 'Conectar lusófonos de TODAS as origens' : 'Connect Portuguese speakers from ALL backgrounds' },
          { emoji: '🎉', text: isPortuguese ? 'Eventos mensais celebrando diferentes países lusófonos' : 'Monthly events celebrating different Lusophone countries' },
          { emoji: '💼', text: isPortuguese ? 'Networking profissional inter-industrias em todas as comunidades lusófonas' : 'Cross-industry professional networking across all Portuguese-speaking communities' },
          { emoji: '🇬🇧', text: isPortuguese ? 'Programas especiais para lusófonos nascidos no Reino Unido' : 'Special programs for UK-born Portuguese speakers' },
          { emoji: '📚', text: isPortuguese ? 'Iniciativas comunitárias para manter o português através das gerações' : 'Community initiatives to maintain Lusophone across generations' }
        ]
      },
      business: {
        headline: isPortuguese ? 'Aceda a Oportunidades de Negócios Lusófonos Exclusivas' : 'Access Exclusive Lusophone Business Opportunities',
        icon: '💼',
        activities: [
          { emoji: '🇦🇴🇨🇻🇬🇼🇲🇿🇸🇹', text: isPortuguese ? 'Mercados PALOP: Conexões empresariais diretas para países africanos lusófonos' : 'PALOP Markets: Direct business connections to African Portuguese-speaking countries' },
          { emoji: '🇧🇷', text: isPortuguese ? 'Oportunidades Brasileiras: O maior mercado lusófono da América Latina' : 'Brazilian Opportunities: Latin America\'s largest Portuguese-speaking market' },
          { emoji: '🇵🇹🇪🇺', text: isPortuguese ? 'Acesso à UE Portuguesa: Entrada no mercado europeu e parcerias' : 'Lusophone EU Access: European market entry and partnerships' },
          { emoji: '🇬🇧', text: isPortuguese ? 'Negócios da Diáspora: Empreendedores lusófonos baseados no Reino Unido' : 'Diaspora Business: UK-based Portuguese-speaking entrepreneurs' },
          { emoji: '💰', text: isPortuguese ? 'Comércio Transfronteiriço: Facilitar negócios em todo o mundo lusófono' : 'Cross-Border Trade: Facilitate business across the entire Lusophone world' }
        ]
      }
    }
    return content[selection as keyof typeof content] || content.cultural
  }

  const currentContent = getContentForSelection(selectedReason || 'cultural')

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 via-red-500 to-yellow-500 rounded-full flex items-center justify-center shadow-xl"
        >
          <span className="text-3xl">{currentContent.icon}</span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl font-bold text-gray-900 leading-tight"
        >
          {currentContent.headline}
        </motion.h2>
      </div>

      {/* Heritage Diversity Showcase */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-green-50 via-red-50 to-yellow-50 rounded-2xl p-4 border-2 border-green-100"
      >
        <div className="text-center mb-3">
          <div className="text-sm font-bold text-gray-900 mb-2">
            {isPortuguese ? 'Diversidade da Herança' : 'Heritage Diversity Showcase'}
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div>
              <div className="text-lg font-bold text-blue-600">32%</div>
              <div className="text-blue-700">🇧🇷 {isPortuguese ? 'Brasil' : 'Brazil'}</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-600">28%</div>
              <div className="text-green-700">🇵🇹 Portugal</div>
            </div>
            <div>
              <div className="text-lg font-bold text-orange-600">18%</div>
              <div className="text-orange-700">🌍 PALOP</div>
            </div>
            <div>
              <div className="text-lg font-bold text-purple-600">12%</div>
              <div className="text-purple-700">{isPortuguese ? 'Mista' : 'Mixed'}</div>
            </div>
            <div>
              <div className="text-lg font-bold text-red-600">8%</div>
              <div className="text-red-700">🇬🇧 UK</div>
            </div>
            <div>
              <div className="text-lg font-bold text-gray-600">2%</div>
              <div className="text-gray-700">{isPortuguese ? 'Estudantes' : 'Learners'}</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Dynamic Activities Based on Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-2"
      >
        {currentContent.activities.map((activity, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className="flex items-start gap-3 p-3 bg-white rounded-xl border border-gray-200"
          >
            <span className="text-sm mt-0.5">{activity.emoji}</span>
            <span className="text-xs text-gray-700 leading-relaxed flex-1">{activity.text}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Cultural Activities Schedule */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200"
      >
        <div className="text-sm font-bold text-gray-900 mb-3 text-center">
          {isPortuguese ? 'Atividades Culturais' : 'Cultural Activities'}
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1">
            <span>🎵</span>
            <span>{isPortuguese ? 'Fado, Samba, Kizomba, Morna' : 'Fado, Samba, Kizomba, Morna music nights'}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>🍽️</span>
            <span>{isPortuguese ? 'Culinária de todas as nações lusófonas' : 'Authentic cuisine from every Portuguese-speaking nation'}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>⚽</span>
            <span>{isPortuguese ? 'Equipas Portugal, Brasil e PALOP juntas' : 'Portugal, Brazil, and PALOP team viewings together'}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>🎭</span>
            <span>{isPortuguese ? 'Celebrações culturais sazonais' : 'Major cultural celebrations from all Lusophone countries'}</span>
          </div>
        </div>
      </motion.div>

      {/* Navigation */}
      <div className="flex gap-3 pt-4">
        <button
          onClick={onPrevious}
          className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>{isPortuguese ? 'Voltar' : 'Back'}</span>
        </button>
        
        <button
          onClick={onNext}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-red-500 text-white font-semibold rounded-xl hover:from-green-600 hover:to-red-600 transition-all"
        >
          <span>{isPortuguese ? 'Candidatar à Adesão' : 'Apply for Membership'}</span>
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

// Step 3: Heritage-Aware Membership Application Paths
function ActionStep({ selectedReason, onPrevious, onComplete, isPortuguese }: any) {
  // Dynamic routing based on selection and heritage
  const getMembershipRoute = (selection: string, heritage?: string) => {
    const baseRoute = `/membership/${selection}`
    const params = new URLSearchParams({
      heritage: heritage || 'mixed',
      intent: selection,
      source: 'wizard'
    })
    return `${baseRoute}?${params}`
  }

  const handleMembershipApplication = () => {
    // For now, route to signup with parameters indicating the path
    const route = getMembershipRoute(selectedReason || 'cultural')
    onComplete('membership')
  }

  const handleExploreAllCultures = () => {
    onComplete('explore')
  }

  const getActionContent = (selection: string) => {
    const content = {
      cultural: {
        title: isPortuguese ? 'Candidatar à Adesão Cultural' : 'Apply for Cultural Membership',
        message: isPortuguese 
          ? 'Aceda a noites de Fado exclusivas e celebrações dos Santos Populares, ALÉM de descobrir Carnaval brasileiro e eventos de independência PALOP'
          : 'Access exclusive Fado nights and Santos Populares celebrations, PLUS discover Brazilian Carnival and PALOP independence events',
        icon: '🎭',
        gradient: 'from-purple-500 to-pink-500'
      },
      connections: {
        title: isPortuguese ? 'Candidatar à Adesão de Conexões' : 'Apply for Connections Membership',
        message: isPortuguese 
          ? 'Aceda à comunidade de encontros lusófonos mais exclusiva do Reino Unido com membros verificados de todas as origens lusófonas'
          : 'Access the UK\'s most exclusive Portuguese-speaking dating community with verified members from all Lusophone backgrounds',
        icon: '💎',
        gradient: 'from-red-500 to-orange-500'
      },
      community: {
        title: isPortuguese ? 'Candidatar à Adesão Comunitária' : 'Apply for Community Membership',
        message: isPortuguese 
          ? 'Explore e celebre TODAS as culturas lusófonas - perfeito para herança mista e lusófonos nascidos no Reino Unido'
          : 'Explore and celebrate ALL Portuguese-speaking cultures - perfect for mixed heritage and UK-born Portuguese speakers',
        icon: '🤝',
        gradient: 'from-green-500 to-teal-500'
      },
      business: {
        title: isPortuguese ? 'Candidatar à Adesão de Negócios' : 'Apply for Business Membership',
        message: isPortuguese 
          ? 'Aceda a oportunidades de negócios exclusivas em mercados PALOP, brasileiros e portugueses com rede de empreendedores lusófonos'
          : 'Access exclusive business opportunities across PALOP, Brazilian, and Lusophone markets with Lusophone entrepreneur network',
        icon: '💼',
        gradient: 'from-blue-500 to-indigo-500'
      }
    }
    return content[selection as keyof typeof content] || content.cultural
  }

  const currentContent = getActionContent(selectedReason || 'cultural')

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className={`w-20 h-20 mx-auto bg-gradient-to-br ${currentContent.gradient} rounded-full flex items-center justify-center shadow-xl`}
        >
          <span className="text-3xl">{currentContent.icon}</span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl font-bold text-gray-900 leading-tight"
        >
          {currentContent.title}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-sm text-gray-600 leading-relaxed"
        >
          {currentContent.message}
        </motion.p>
      </div>

      {/* Heritage Selection Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-green-50 via-red-50 to-yellow-50 rounded-xl p-4 border-2 border-green-100"
      >
        <div className="text-center mb-3">
          <div className="text-sm font-bold text-gray-900 mb-2">
            {isPortuguese ? 'Herança Lusófona Reconhecida' : 'Lusophone Heritage Recognized'}
          </div>
          <div className="text-xs text-gray-600 mb-3">
            {isPortuguese 
              ? 'Com que herança lusófona se identifica?'
              : 'Which Portuguese-speaking heritage(s) do you identify with?'
            }
          </div>
          <div className="grid grid-cols-4 gap-1 text-xs">
            <div className="text-center">
              <div className="text-lg">🇵🇹</div>
              <div className="text-gray-600">Portugal</div>
            </div>
            <div className="text-center">
              <div className="text-lg">🇧🇷</div>
              <div className="text-gray-600">{isPortuguese ? 'Brasil' : 'Brazil'}</div>
            </div>
            <div className="text-center">
              <div className="text-lg">🇦🇴</div>
              <div className="text-gray-600">Angola</div>
            </div>
            <div className="text-center">
              <div className="text-lg">🇨🇻</div>
              <div className="text-gray-600">{isPortuguese ? 'C.Verde' : 'C.Verde'}</div>
            </div>
            <div className="text-center">
              <div className="text-lg">🇲🇿</div>
              <div className="text-gray-600">{isPortuguese ? 'Moçam.' : 'Mozam.'}</div>
            </div>
            <div className="text-center">
              <div className="text-lg">🇬🇼</div>
              <div className="text-gray-600">{isPortuguese ? 'G.Bissau' : 'G.Bissau'}</div>
            </div>
            <div className="text-center">
              <div className="text-lg">🇸🇹</div>
              <div className="text-gray-600">{isPortuguese ? 'S.Tomé' : 'S.Tomé'}</div>
            </div>
            <div className="text-center">
              <div className="text-lg">🇬🇧</div>
              <div className="text-gray-600">{isPortuguese ? 'UK' : 'UK'}</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Primary Membership Application */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        onClick={handleMembershipApplication}
        className={`w-full p-6 bg-gradient-to-r ${currentContent.gradient} text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-200 hover:-translate-y-1`}
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-left">
              <div className="text-lg font-bold mb-1">
                {currentContent.title}
              </div>
              <div className="text-sm text-white/90">
                {isPortuguese ? 'Aplicação Exclusiva de Adesão' : 'Exclusive Membership Application'}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{currentContent.icon}</span>
              <ArrowRightIcon className="w-6 h-6" />
            </div>
          </div>
        </div>
      </motion.button>

      {/* Cross-Cultural Discovery Option */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        onClick={handleExploreAllCultures}
        className="w-full p-4 bg-white border-2 border-gray-200 rounded-2xl hover:border-primary-300 hover:shadow-lg transition-all duration-200"
      >
        <div className="flex items-center justify-between">
          <div className="text-left">
            <div className="text-base font-bold text-gray-900 mb-1">
              {isPortuguese ? 'Explorar Todas as Culturas Lusófonas' : 'Explore All Lusophone Cultures'}
            </div>
            <div className="text-sm text-gray-600">
              {isPortuguese ? 'Página completa de benefícios da adesão' : 'Full membership benefits page'}
            </div>
          </div>
          <span className="text-xl">🌍</span>
        </div>
      </motion.button>

      {/* Heritage Promise & Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-blue-50 rounded-xl p-4 border border-blue-200"
      >
        <div className="flex items-center gap-3 mb-3">
          <GiftIcon className="w-5 h-5 text-blue-600" />
          <span className="font-semibold text-blue-800">
            {isPortuguese ? 'Unidos pela Língua:' : 'Unidos pela Língua:'}
          </span>
        </div>
        <div className="space-y-2">
          {[
            isPortuguese ? '✓ Herança mista e segunda geração bem-vindos' : '✓ Mixed heritage and second-generation welcome',
            isPortuguese ? '✓ Estudantes de língua portuguesa culturalmente ligados' : '✓ Portuguese language learners culturally connected',
            isPortuguese ? '✓ Celebração igual de TODAS as culturas lusófonas' : '✓ Equal celebration of ALL Portuguese-speaking cultures',
            isPortuguese ? '✓ Membros verificados de toda a diáspora global' : '✓ Verified members from across the global diaspora'
          ].map((benefit, index) => (
            <div key={index} className="text-sm text-blue-700 flex items-center gap-2">
              <CheckIcon className="w-4 h-4 text-blue-600" />
              <span className="flex-1">{benefit}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Navigation */}
      <div className="flex gap-3 pt-4">
        <button
          onClick={onPrevious}
          className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>{isPortuguese ? 'Voltar' : 'Back'}</span>
        </button>
        
        <button
          onClick={() => onComplete('stories')}
          className="flex-1 text-center px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all text-sm"
        >
          {isPortuguese ? 'Ver Histórias de Sucesso' : 'See Member Success Stories'}
        </button>
      </div>
    </div>
  )
}