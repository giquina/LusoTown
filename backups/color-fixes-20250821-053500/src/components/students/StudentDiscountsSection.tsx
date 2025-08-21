'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { useSubscription } from '@/context/SubscriptionContext'
import {
  TagIcon,
  CurrencyPoundIcon,
  CheckBadgeIcon,
  ShieldCheckIcon,
  CalendarDaysIcon,
  ClockIcon,
  GiftIcon,
  StarIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  BuildingLibraryIcon,
  EnvelopeIcon,
  CreditCardIcon,
  UserGroupIcon,
  TrophyIcon,
  ArrowRightIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'
import { CheckIcon, StarIcon as StarIconSolid } from '@heroicons/react/24/solid'

interface StudentDiscount {
  id: string
  title: string
  titlePortuguese: string
  category: 'membership' | 'events' | 'services' | 'partners' | 'transportation' | 'cultural'
  discountType: 'percentage' | 'fixed_amount' | 'special_price'
  discountValue: number | string
  originalPrice?: number
  studentPrice: number
  description: string
  descriptionPortuguese: string
  eligibility: string[]
  verificationRequired: boolean
  validUntil?: string
  usageLimit?: string
  termsAndConditions: string[]
  howToRedeem: string[]
  partnerLogo?: string
  isPopular: boolean
  savings: number
  category_icon: any
}

interface VerificationStep {
  id: number
  title: string
  titlePortuguese: string
  description: string
  descriptionPortuguese: string
  icon: any
  requirements: string[]
  timeToComplete: string
}

const STUDENT_DISCOUNTS: StudentDiscount[] = [
  {
    id: 'lusotown-membership-student',
    title: '50% Off LusoTown Community Membership',
    titlePortuguese: '50% Desconto na Adesão Comunidade LusoTown',
    category: 'membership',
    discountType: 'percentage',
    discountValue: 50,
    originalPrice: 19.99,
    studentPrice: 9.99,
    description: 'Get full access to LusoTown Community features at half the price. Unlimited matches, exclusive events, and premium support.',
    descriptionPortuguese: 'Obtenha acesso completo às funcionalidades da Comunidade LusoTown por metade do preço. Matches ilimitados, eventos exclusivos e suporte premium.',
    eligibility: ['Valid .ac.uk email address', 'Current university enrollment', 'Student ID verification'],
    verificationRequired: true,
    validUntil: '2025-12-31',
    usageLimit: 'One per student per year',
    termsAndConditions: [
      'Valid for current students only',
      'Requires annual verification',
      'Cannot be combined with other offers',
      'Discount applies to monthly and annual plans'
    ],
    howToRedeem: [
      'Verify your student email (.ac.uk)',
      'Upload student ID or enrollment letter',
      'Apply discount code at checkout',
      'Enjoy 50% savings on membership'
    ],
    isPopular: true,
    savings: 120,
    category_icon: UserGroupIcon
  },
  {
    id: 'student-events-discount',
    title: 'Student-Exclusive Event Pricing',
    titlePortuguese: 'Preços Exclusivos de Eventos para Estudantes',
    category: 'events',
    discountType: 'special_price',
    discountValue: 'Up to 70% off',
    originalPrice: 35,
    studentPrice: 10,
    description: 'Access Portuguese cultural events, workshops, and networking sessions at heavily discounted student rates.',
    descriptionPortuguese: 'Acesso a eventos culturais portugueses, workshops e sessões de networking com grandes descontos para estudantes.',
    eligibility: ['Verified student status', 'Portuguese community member', 'Age 18-30'],
    verificationRequired: true,
    validUntil: 'Ongoing',
    usageLimit: 'No limit on event bookings',
    termsAndConditions: [
      'Student verification required for each booking',
      'Subject to event capacity',
      'Some premium events may have different pricing',
      'Cancellation policy applies'
    ],
    howToRedeem: [
      'Browse student-exclusive events',
      'Book with verified student account',
      'Show student ID at event check-in',
      'Enjoy discounted rates automatically'
    ],
    isPopular: true,
    savings: 300,
    category_icon: CalendarDaysIcon
  },
  {
    id: 'transport-student-discount',
    title: '25% Off Portuguese Transport Services',
    titlePortuguese: '25% Desconto nos Serviços de Transporte Portugueses',
    category: 'transportation',
    discountType: 'percentage',
    discountValue: 25,
    originalPrice: 25,
    studentPrice: 18.75,
    description: 'Discounted rates on premium transport services to Portuguese events, cultural sites, and community gatherings.',
    descriptionPortuguese: 'Tarifas com desconto nos serviços de transporte premium para eventos portugueses, locais culturais e encontros comunitários.',
    eligibility: ['Student membership', 'Valid student ID', 'Advance booking required'],
    verificationRequired: true,
    validUntil: '2025-06-30',
    usageLimit: '5 rides per month',
    termsAndConditions: [
      'Advance booking required (minimum 24 hours)',
      'Subject to vehicle availability',
      'Applies to scheduled routes only',
      'Cannot be combined with group discounts'
    ],
    howToRedeem: [
      'Book transport through student portal',
      'Apply student discount code',
      'Verify student status at booking',
      'Present student ID to driver'
    ],
    isPopular: false,
    savings: 75,
    category_icon: CreditCardIcon
  },
  {
    id: 'cultural-workshop-student',
    title: 'Free Portuguese Language & Culture Classes',
    titlePortuguese: 'Aulas Gratuitas de Língua e Cultura Portuguesa',
    category: 'cultural',
    discountType: 'fixed_amount',
    discountValue: 'Free',
    originalPrice: 50,
    studentPrice: 0,
    description: 'Complimentary access to Portuguese language classes, Fado workshops, cooking classes, and cultural immersion programs.',
    descriptionPortuguese: 'Acesso gratuito a aulas de língua portuguesa, workshops de Fado, aulas de culinária e programas de imersão cultural.',
    eligibility: ['Verified student status', 'Regular attendance commitment', 'Portuguese community interest'],
    verificationRequired: true,
    validUntil: 'Academic year 2024/25',
    usageLimit: '2 classes per month',
    termsAndConditions: [
      'Regular attendance required',
      'Must complete full course modules',
      'Community participation encouraged',
      'Certificate available upon completion'
    ],
    howToRedeem: [
      'Register for cultural program',
      'Attend orientation session',
      'Commit to regular attendance',
      'Enjoy free cultural education'
    ],
    isPopular: true,
    savings: 400,
    category_icon: AcademicCapIcon
  },
  {
    id: 'partner-business-discounts',
    title: 'Portuguese Business Partner Discounts',
    titlePortuguese: 'Descontos em Negócios Parceiros Portugueses',
    category: 'partners',
    discountType: 'percentage',
    discountValue: '10-30%',
    originalPrice: 100,
    studentPrice: 75,
    description: 'Exclusive discounts at Portuguese restaurants, shops, services, and cultural venues across London.',
    descriptionPortuguese: 'Descontos exclusivos em restaurantes, lojas, serviços e locais culturais portugueses em Londres.',
    eligibility: ['Student membership', 'Valid student ID', 'Participating partner locations'],
    verificationRequired: true,
    validUntil: 'Ongoing partnership program',
    usageLimit: 'Varies by partner',
    termsAndConditions: [
      'Valid at participating locations only',
      'Cannot be combined with other offers',
      'Show student ID and membership card',
      'Terms vary by individual partners'
    ],
    howToRedeem: [
      'Find participating partners on app',
      'Show student membership card',
      'Present valid student ID',
      'Enjoy partner-specific discounts'
    ],
    isPopular: false,
    savings: 250,
    category_icon: GiftIcon
  },
  {
    id: 'premium-services-student',
    title: 'Student Rate: Premium Career Services',
    titlePortuguese: 'Tarifa Estudante: Serviços Premium de Carreira',
    category: 'services',
    discountType: 'special_price',
    discountValue: '60% off',
    originalPrice: 150,
    studentPrice: 60,
    description: 'Professional CV review, interview coaching, career mentorship, and job placement assistance at student-friendly rates.',
    descriptionPortuguese: 'Revisão profissional de CV, coaching de entrevistas, mentoria de carreira e assistência de colocação profissional a preços acessíveis para estudantes.',
    eligibility: ['Final year students', 'Recent graduates (within 2 years)', 'Career change seeking students'],
    verificationRequired: true,
    validUntil: '2025-03-31',
    usageLimit: 'One comprehensive package per year',
    termsAndConditions: [
      'Package must be completed within 6 months',
      'Includes 3 sessions with career counselor',
      'CV review and interview practice included',
      'Job placement assistance for 6 months'
    ],
    howToRedeem: [
      'Schedule career consultation',
      'Verify student/graduate status',
      'Choose comprehensive package',
      'Begin career development program'
    ],
    isPopular: false,
    savings: 540,
    category_icon: TrophyIcon
  }
]

const VERIFICATION_STEPS: VerificationStep[] = [
  {
    id: 1,
    title: 'University Email Verification',
    titlePortuguese: 'Verificação de Email Universitário',
    description: 'Verify your official university email address (.ac.uk domain) to confirm your student status.',
    descriptionPortuguese: 'Verifique o seu endereço de email universitário oficial (domínio .ac.uk) para confirmar o seu status de estudante.',
    icon: EnvelopeIcon,
    requirements: ['Valid .ac.uk email address', 'Access to university email account', 'Active enrollment'],
    timeToComplete: '2-3 minutes'
  },
  {
    id: 2,
    title: 'Student ID Upload',
    titlePortuguese: 'Carregamento de Cartão de Estudante',
    description: 'Upload a clear photo of your current student ID card or official enrollment documentation.',
    descriptionPortuguese: 'Carregue uma foto clara do seu cartão de estudante atual ou documentação oficial de matrícula.',
    icon: DocumentTextIcon,
    requirements: ['Current student ID card', 'Clear photo (JPG, PNG)', 'Valid expiration date visible'],
    timeToComplete: '3-5 minutes'
  },
  {
    id: 3,
    title: 'University Confirmation',
    titlePortuguese: 'Confirmação da Universidade',
    description: 'We verify your enrollment status with your university (automated process for partner institutions).',
    descriptionPortuguese: 'Verificamos o seu status de matrícula com a sua universidade (processo automatizado para instituições parceiras).',
    icon: BuildingLibraryIcon,
    requirements: ['Partner university enrollment', 'Current academic year registration', 'Valid student record'],
    timeToComplete: '24-48 hours'
  },
  {
    id: 4,
    title: 'Discount Activation',
    titlePortuguese: 'Ativação de Desconto',
    description: 'Once verified, all student discounts are automatically applied to your account and ready to use.',
    descriptionPortuguese: 'Uma vez verificado, todos os descontos de estudante são automaticamente aplicados à sua conta e prontos para usar.',
    icon: CheckBadgeIcon,
    requirements: ['Completed verification', 'Active student status', 'LusoTown account'],
    timeToComplete: 'Instant'
  }
]

export default function StudentDiscountsSection() {
  const { language } = useLanguage()
  const { subscription, validateStudentStatus } = useSubscription()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showVerificationModal, setShowVerificationModal] = useState(false)
  const [verificationStep, setVerificationStep] = useState(1)

  const categories = [
    { value: 'all', label: { en: 'All Discounts', pt: 'Todos os Descontos' }, icon: TagIcon },
    { value: 'membership', label: { en: 'Membership', pt: 'Adesão' }, icon: UserGroupIcon },
    { value: 'events', label: { en: 'Events', pt: 'Eventos' }, icon: CalendarDaysIcon },
    { value: 'transportation', label: { en: 'Transport', pt: 'Transporte' }, icon: CreditCardIcon },
    { value: 'cultural', label: { en: 'Cultural', pt: 'Cultural' }, icon: AcademicCapIcon },
    { value: 'services', label: { en: 'Services', pt: 'Serviços' }, icon: TrophyIcon },
    { value: 'partners', label: { en: 'Partners', pt: 'Parceiros' }, icon: GiftIcon }
  ]

  const filteredDiscounts = selectedCategory === 'all' 
    ? STUDENT_DISCOUNTS 
    : STUDENT_DISCOUNTS.filter(discount => discount.category === selectedCategory)

  const totalPotentialSavings = STUDENT_DISCOUNTS.reduce((sum, discount) => sum + discount.savings, 0)
  const isStudentVerified = subscription?.student_verified || false

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'membership': return 'from-primary-500 to-primary-600'
      case 'events': return 'from-secondary-500 to-secondary-600'
      case 'transportation': return 'from-accent-500 to-accent-600'
      case 'cultural': return 'from-coral-500 to-coral-600'
      case 'services': return 'from-premium-500 to-premium-600'
      case 'partners': return 'from-action-500 to-action-600'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  const handleStartVerification = () => {
    setShowVerificationModal(true)
    setVerificationStep(1)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-green-100 via-blue-50 to-purple-100 border border-green-200 shadow-lg mb-6">
            <TagIcon className="w-4 h-4 mr-2 text-green-600" />
            <span className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
              {language === 'pt' 
                ? "Descontos Exclusivos para Estudantes Portugueses"
                : "Exclusive Discounts for Portuguese Students"}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {language === 'pt' 
              ? 'Poupe Centenas de Libras por Ano'
              : 'Save Hundreds of Pounds Per Year'}
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {language === 'pt' 
              ? 'Acesso exclusivo a descontos especiais para estudantes portugueses verificados. Da adesão da comunidade a eventos culturais e serviços profissionais.'
              : 'Exclusive access to special discounts for verified Portuguese students. From community membership to cultural events and professional services.'}
          </p>

          {/* Savings Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
              <div className="text-2xl font-bold text-green-600 mb-1">£{totalPotentialSavings}</div>
              <div className="text-sm text-gray-600">{language === 'pt' ? 'Poupanças anuais' : 'Annual savings'}</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
              <div className="text-2xl font-bold text-blue-600 mb-1">{STUDENT_DISCOUNTS.length}</div>
              <div className="text-sm text-gray-600">{language === 'pt' ? 'Descontos ativos' : 'Active discounts'}</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
              <div className="text-2xl font-bold text-purple-600 mb-1">50%</div>
              <div className="text-sm text-gray-600">{language === 'pt' ? 'Desconto médio' : 'Average discount'}</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
              <div className="text-2xl font-bold text-coral-600 mb-1">24h</div>
              <div className="text-sm text-gray-600">{language === 'pt' ? 'Verificação' : 'Verification'}</div>
            </div>
          </div>
        </motion.div>

        {/* Student Verification Status */}
        {!isStudentVerified && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
          >
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <ExclamationTriangleIcon className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="font-bold text-yellow-800 mb-2">
                    {language === 'pt' 
                      ? 'Verificação de Estudante Necessária'
                      : 'Student Verification Required'}
                  </h3>
                  <p className="text-yellow-700 mb-4">
                    {language === 'pt' 
                      ? 'Para aceder a todos os descontos de estudante, precisa de verificar o seu status de estudante universitário atual.'
                      : 'To access all student discounts, you need to verify your current university student status.'}
                  </p>
                  <button
                    onClick={handleStartVerification}
                    className="bg-yellow-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-yellow-700 transition-colors"
                  >
                    {language === 'pt' ? 'Iniciar Verificação' : 'Start Verification'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(category => {
              const IconComponent = category.icon
              return (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    selectedCategory === category.value
                      ? 'bg-white text-gray-900 shadow-lg border border-gray-200'
                      : 'bg-white/50 text-gray-600 hover:bg-white hover:shadow-md border border-gray-100'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {category.label[language]}
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Discounts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredDiscounts.map((discount, index) => {
            const IconComponent = discount.category_icon
            
            return (
              <motion.div
                key={discount.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                {/* Header */}
                <div className={`px-6 py-4 bg-gradient-to-r ${getCategoryColor(discount.category)} text-white relative`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-lg">
                          {discount.discountType === 'percentage' ? `${discount.discountValue}%` : discount.discountValue}
                        </div>
                        <div className="text-xs opacity-90 uppercase tracking-wide">
                          {discount.category}
                        </div>
                      </div>
                    </div>
                    {discount.isPopular && (
                      <div className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                        <StarIconSolid className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2">
                    {language === 'pt' ? discount.titlePortuguese : discount.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                    {language === 'pt' ? discount.descriptionPortuguese : discount.description}
                  </p>

                  {/* Pricing */}
                  <div className="mb-4">
                    <div className="flex items-baseline gap-2 mb-2">
                      {discount.studentPrice === 0 ? (
                        <span className="text-2xl font-bold text-green-600">
                          {language === 'pt' ? 'Grátis' : 'Free'}
                        </span>
                      ) : (
                        <>
                          <span className="text-2xl font-bold text-gray-900">£{discount.studentPrice}</span>
                          {discount.originalPrice && (
                            <span className="text-lg text-gray-500 line-through">£{discount.originalPrice}</span>
                          )}
                        </>
                      )}
                    </div>
                    <div className="text-sm text-green-600 font-medium">
                      {language === 'pt' ? 'Poupa' : 'Save'} £{discount.savings} {language === 'pt' ? 'por ano' : 'per year'}
                    </div>
                  </div>

                  {/* Eligibility */}
                  <div className="mb-4">
                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                      {language === 'pt' ? 'Elegibilidade:' : 'Eligibility:'}
                    </h4>
                    <div className="space-y-1">
                      {discount.eligibility.slice(0, 2).map((req, i) => (
                        <div key={i} className="flex items-start text-xs text-gray-600">
                          <CheckIcon className="w-3 h-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          {req}
                        </div>
                      ))}
                      {discount.eligibility.length > 2 && (
                        <div className="text-xs text-gray-500">
                          +{discount.eligibility.length - 2} {language === 'pt' ? 'mais requisitos' : 'more requirements'}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Verification Status */}
                  <div className="mb-4">
                    {discount.verificationRequired ? (
                      <div className={`flex items-center gap-2 text-xs px-3 py-2 rounded-lg ${
                        isStudentVerified 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {isStudentVerified ? (
                          <>
                            <CheckBadgeIcon className="w-4 h-4" />
                            {language === 'pt' ? 'Verificado - Pronto para usar' : 'Verified - Ready to use'}
                          </>
                        ) : (
                          <>
                            <ShieldCheckIcon className="w-4 h-4" />
                            {language === 'pt' ? 'Verificação necessária' : 'Verification required'}
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-xs text-green-700 bg-green-100 px-3 py-2 rounded-lg">
                        <CheckIcon className="w-4 h-4" />
                        {language === 'pt' ? 'Sem verificação necessária' : 'No verification required'}
                      </div>
                    )}
                  </div>

                  {/* Valid Until */}
                  {discount.validUntil && (
                    <div className="mb-4 text-xs text-gray-500">
                      <ClockIcon className="w-3 h-3 inline mr-1" />
                      {language === 'pt' ? 'Válido até:' : 'Valid until:'} {discount.validUntil}
                    </div>
                  )}

                  {/* Action Button */}
                  <button 
                    className={`w-full font-semibold py-3 px-4 rounded-xl transition-all duration-200 ${
                      !isStudentVerified && discount.verificationRequired
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : `bg-gradient-to-r ${getCategoryColor(discount.category)} text-white hover:shadow-lg`
                    }`}
                    disabled={!isStudentVerified && discount.verificationRequired}
                  >
                    {!isStudentVerified && discount.verificationRequired 
                      ? (language === 'pt' ? 'Verificação Necessária' : 'Verification Required')
                      : (language === 'pt' ? 'Resgatar Desconto' : 'Redeem Discount')
                    }
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* How Verification Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'pt' ? 'Como Funciona a Verificação de Estudante' : 'How Student Verification Works'}
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {language === 'pt' 
                ? 'Processo simples e seguro para verificar o seu status de estudante e desbloquear todos os descontos.'
                : 'Simple and secure process to verify your student status and unlock all discounts.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VERIFICATION_STEPS.map((step, index) => {
              const IconComponent = step.icon
              return (
                <div key={step.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-primary-600" />
                  </div>
                  <div className="text-sm font-bold text-primary-600 mb-2">
                    {language === 'pt' ? 'Passo' : 'Step'} {step.id}
                  </div>
                  <h4 className="font-bold text-gray-900 mb-3">
                    {language === 'pt' ? step.titlePortuguese : step.title}
                  </h4>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {language === 'pt' ? step.descriptionPortuguese : step.description}
                  </p>
                  <div className="text-xs text-primary-600 font-medium">
                    {step.timeToComplete}
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-8 text-center text-white"
        >
          <TagIcon className="w-16 h-16 text-white mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">
            {language === 'pt' 
              ? 'Pronto para Começar a Poupar?'
              : 'Ready to Start Saving?'}
          </h3>
          <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
            {language === 'pt' 
              ? 'Verifique o seu status de estudante agora e comece a poupar centenas de libras por ano com os nossos descontos exclusivos.'
              : 'Verify your student status now and start saving hundreds of pounds per year with our exclusive discounts.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleStartVerification}
              className="bg-white text-green-600 font-bold px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors"
            >
              {language === 'pt' ? 'Verificar Status de Estudante' : 'Verify Student Status'}
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-green-600 font-bold px-8 py-3 rounded-xl transition-all duration-200">
              {language === 'pt' ? 'Ver Todos os Descontos' : 'View All Discounts'}
            </button>
          </div>
        </motion.div>

        {/* Verification Modal */}
        {showVerificationModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {language === 'pt' ? 'Verificação de Estudante' : 'Student Verification'}
                  </h3>
                  <button 
                    onClick={() => setShowVerificationModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <span className="sr-only">{language === 'pt' ? 'Fechar' : 'Close'}</span>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Progress Indicator */}
                <div className="flex items-center mb-8">
                  {VERIFICATION_STEPS.map((step, index) => (
                    <React.Fragment key={step.id}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        verificationStep >= step.id ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-600'
                      }`}>
                        {step.id}
                      </div>
                      {index < VERIFICATION_STEPS.length - 1 && (
                        <div className={`flex-1 h-1 mx-2 ${verificationStep > step.id ? 'bg-primary-500' : 'bg-gray-200'}`}></div>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Current Step Content */}
                {VERIFICATION_STEPS.map(step => {
                  if (step.id !== verificationStep) return null
                  
                  const IconComponent = step.icon
                  
                  return (
                    <div key={step.id}>
                      <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <IconComponent className="w-8 h-8 text-primary-600" />
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">
                          {language === 'pt' ? step.titlePortuguese : step.title}
                        </h4>
                        <p className="text-gray-600">
                          {language === 'pt' ? step.descriptionPortuguese : step.description}
                        </p>
                      </div>

                      {/* Step-specific content */}
                      {step.id === 1 && (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              {language === 'pt' ? 'Email Universitário' : 'University Email'}
                            </label>
                            <input
                              type="email"
                              placeholder="your.name@university.ac.uk"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                          </div>
                          <button 
                            onClick={() => setVerificationStep(2)}
                            className="w-full bg-primary-500 text-white font-medium py-3 px-4 rounded-lg hover:bg-primary-600 transition-colors"
                          >
                            {language === 'pt' ? 'Enviar Código de Verificação' : 'Send Verification Code'}
                          </button>
                        </div>
                      )}

                      {step.id === 2 && (
                        <div className="space-y-4">
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <DocumentTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600 mb-2">
                              {language === 'pt' ? 'Carregar cartão de estudante' : 'Upload student ID'}
                            </p>
                            <p className="text-xs text-gray-500">
                              {language === 'pt' ? 'JPG, PNG (máx. 5MB)' : 'JPG, PNG (max 5MB)'}
                            </p>
                            <input type="file" className="hidden" accept=".jpg,.jpeg,.png" />
                          </div>
                          <button 
                            onClick={() => setVerificationStep(3)}
                            className="w-full bg-primary-500 text-white font-medium py-3 px-4 rounded-lg hover:bg-primary-600 transition-colors"
                          >
                            {language === 'pt' ? 'Carregar Documento' : 'Upload Document'}
                          </button>
                        </div>
                      )}

                      {step.id === 3 && (
                        <div className="text-center space-y-4">
                          <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto"></div>
                          <p className="text-gray-600">
                            {language === 'pt' 
                              ? 'A verificar com a universidade...'
                              : 'Verifying with university...'}
                          </p>
                          <button 
                            onClick={() => setVerificationStep(4)}
                            className="w-full bg-primary-500 text-white font-medium py-3 px-4 rounded-lg hover:bg-primary-600 transition-colors"
                          >
                            {language === 'pt' ? 'Simular Verificação' : 'Simulate Verification'}
                          </button>
                        </div>
                      )}

                      {step.id === 4 && (
                        <div className="text-center">
                          <CheckBadgeIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
                          <h4 className="text-xl font-bold text-gray-900 mb-4">
                            {language === 'pt' ? 'Verificação Completa!' : 'Verification Complete!'}
                          </h4>
                          <p className="text-gray-600 mb-6">
                            {language === 'pt' 
                              ? 'Todos os descontos de estudante estão agora disponíveis na sua conta.'
                              : 'All student discounts are now available in your account.'}
                          </p>
                          <button 
                            onClick={() => setShowVerificationModal(false)}
                            className="bg-green-500 text-white font-medium py-3 px-6 rounded-lg hover:bg-green-600 transition-colors"
                          >
                            {language === 'pt' ? 'Começar a Poupar' : 'Start Saving'}
                          </button>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}