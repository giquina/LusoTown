"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  CheckIcon,
  XMarkIcon,
  HeartIcon,
  SparklesIcon,
  UserIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
  CalendarDaysIcon,
  BriefcaseIcon,
  CurrencyPoundIcon,
  ShieldCheckIcon,
  StarIcon,
  GlobeEuropeAfricaIcon,
  MusicalNoteIcon,
  CameraIcon,
  LanguageIcon
} from '@heroicons/react/24/outline';
import {
  CheckIcon as CheckIconSolid,
  StarIcon as StarIconSolid,
  HeartIcon as HeartIconSolid
} from '@heroicons/react/24/solid';
import { useLanguage } from '@/context/LanguageContext';
import { SUBSCRIPTION_PLANS, formatPrice, getPlanPrice } from '@/config/pricing';

// Lusophone heritage options with all 8 Portuguese-speaking nations
const PORTUGUESE_NATIONS = [
  { code: 'pt', name: 'Portugal', namePort: 'Portugal', flag: '🇵🇹', description: 'Continental Portugal & Islands' },
  { code: 'br', name: 'Brazil', namePort: 'Brasil', flag: '🇧🇷', description: 'South America\'s largest Portuguese-speaking nation' },
  { code: 'ao', name: 'Angola', namePort: 'Angola', flag: '🇦🇴', description: 'Southwest Africa' },
  { code: 'mz', name: 'Mozambique', namePort: 'Moçambique', flag: '🇲🇿', description: 'Southeast Africa' },
  { code: 'cv', name: 'Cape Verde', namePort: 'Cabo Verde', flag: '🇨🇻', description: 'Atlantic Island Nation' },
  { code: 'gw', name: 'Guinea-Bissau', namePort: 'Guiné-Bissau', flag: '🇬🇼', description: 'West Africa' },
  { code: 'st', name: 'São Tomé & Príncipe', namePort: 'São Tomé e Príncipe', flag: '🇸🇹', description: 'Atlantic Islands' },
  { code: 'tl', name: 'East Timor', namePort: 'Timor-Leste', flag: '🇹🇱', description: 'Southeast Asia' },
  { code: 'uk-heritage', name: 'UK-Born Heritage', namePort: 'Herança no Reino Unido', flag: '🇬🇧🇵🇹', description: 'Portuguese heritage born in UK' },
  { code: 'mixed', name: 'Mixed Heritage', namePort: 'Herança Mista', flag: '🌍', description: 'Multiple Portuguese connections' }
];

// Portuguese cultural interests
const CULTURAL_INTERESTS = [
  { id: 'fado', name: 'Fado', namePort: 'Fado', icon: '🎵', category: 'music' },
  { id: 'kizomba', name: 'Kizomba', namePort: 'Kizomba', icon: '💃', category: 'music' },
  { id: 'samba', name: 'Samba', namePort: 'Samba', icon: '🎉', category: 'music' },
  { id: 'morna', name: 'Morna', namePort: 'Morna', icon: '🎶', category: 'music' },
  { id: 'cuisine', name: 'Portuguese Cuisine', namePort: 'Culinária Portuguesa', icon: '🍽️', category: 'food' },
  { id: 'wine', name: 'Portuguese Wine', namePort: 'Vinho Português', icon: '🍷', category: 'food' },
  { id: 'festivals', name: 'Cultural Festivals', namePort: 'Festivais Culturais', icon: '🎭', category: 'culture' },
  { id: 'santos-populares', name: 'Santos Populares', namePort: 'Santos Populares', icon: '🎊', category: 'culture' },
  { id: 'business', name: 'Professional Networking', namePort: 'Networking Profissional', icon: '💼', category: 'business' },
  { id: 'language', name: 'Language Exchange', namePort: 'Intercâmbio Linguístico', icon: '🗣️', category: 'education' },
  { id: 'arts', name: 'Portuguese Arts', namePort: 'Artes Portuguesas', icon: '🎨', category: 'culture' },
  { id: 'football', name: 'Football', namePort: 'Futebol', icon: '⚽', category: 'sports' }
];

// UK locations with Portuguese communities
const UK_LOCATIONS = [
  { code: 'london', name: 'London', areas: ['Stockwell', 'Vauxhall', 'Bermondsey', 'Camden', 'Kensington'] },
  { code: 'manchester', name: 'Manchester', areas: ['City Centre', 'Rusholme', 'Fallowfield'] },
  { code: 'birmingham', name: 'Birmingham', areas: ['City Centre', 'Edgbaston', 'Moseley'] },
  { code: 'liverpool', name: 'Liverpool', areas: ['City Centre', 'Smithdown Road'] },
  { code: 'leeds', name: 'Leeds', areas: ['City Centre', 'Headingley'] },
  { code: 'bristol', name: 'Bristol', areas: ['City Centre', 'Clifton'] },
  { code: 'edinburgh', name: 'Edinburgh', areas: ['City Centre', 'Leith'] },
  { code: 'glasgow', name: 'Glasgow', areas: ['City Centre', 'West End'] },
  { code: 'cardiff', name: 'Cardiff', areas: ['City Centre', 'Cardiff Bay'] },
  { code: 'other', name: 'Other UK Location', areas: ['Please specify'] }
];

// Community connection preferences
const COMMUNITY_PREFERENCES = [
  { id: 'events', name: 'Cultural Events', namePort: 'Eventos Culturais', icon: '🎭', description: 'Fado nights, festivals, celebrations' },
  { id: 'networking', name: 'Professional Networking', namePort: 'Networking Profissional', icon: '💼', description: 'Business connections, career opportunities' },
  { id: 'dating', name: 'Dating & Romance', namePort: 'Namoro e Romance', icon: '❤️', description: 'Meaningful relationships with Portuguese speakers' },
  { id: 'friendship', name: 'Friendship & Social', namePort: 'Amizade e Social', icon: '👥', description: 'Making friends, social gatherings' },
  { id: 'family', name: 'Family Activities', namePort: 'Atividades Familiares', icon: '👨‍👩‍👧‍👦', description: 'Family events, children activities' },
  { id: 'language', name: 'Language Practice', namePort: 'Prática da Língua', icon: '🗣️', description: 'Improve Portuguese/English skills' }
];

interface MobileRegistrationFlowProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (userData: RegistrationData) => void;
  initialStep?: number;
}

interface RegistrationData {
  // Personal Info
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  birthDate?: string;
  
  // Portuguese Heritage
  heritage: string[];
  culturalInterests: string[];
  languages: string[];
  
  // Location & Community
  location: string;
  specificArea?: string;
  communityPreferences: string[];
  
  // Membership Selection
  selectedPlan: 'free' | 'community' | 'ambassador';
  billingCycle: 'monthly' | 'annual';
  
  // Privacy & Terms
  agreeToTerms: boolean;
  agreeToMarketing: boolean;
  
  // Optional Profile Enhancement
  profilePhoto?: string;
  bio?: string;
}

const INITIAL_DATA: RegistrationData = {
  email: '',
  firstName: '',
  lastName: '',
  heritage: [],
  culturalInterests: [],
  languages: ['Portuguese'],
  location: '',
  communityPreferences: [],
  selectedPlan: 'free',
  billingCycle: 'monthly',
  agreeToTerms: false,
  agreeToMarketing: false
};

export function MobileRegistrationFlow({
  isOpen,
  onClose,
  onComplete,
  initialStep = 0
}: MobileRegistrationFlowProps) {
  const { language, t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [registrationData, setRegistrationData] = useState<RegistrationData>(INITIAL_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Registration steps
  const steps = [
    { id: 'welcome', title: language === 'pt' ? 'Bem-vindos' : 'Welcome', component: WelcomeStep },
    { id: 'personal', title: language === 'pt' ? 'Informações Pessoais' : 'Personal Info', component: PersonalInfoStep },
    { id: 'heritage', title: language === 'pt' ? 'Herança Cultural' : 'Cultural Heritage', component: HeritageStep },
    { id: 'interests', title: language === 'pt' ? 'Interesses' : 'Cultural Interests', component: InterestsStep },
    { id: 'location', title: language === 'pt' ? 'Localização' : 'Location', component: LocationStep },
    { id: 'community', title: language === 'pt' ? 'Comunidade' : 'Community', component: CommunityStep },
    { id: 'membership', title: language === 'pt' ? 'Plano' : 'Membership', component: MembershipStep },
    { id: 'complete', title: language === 'pt' ? 'Finalizar' : 'Complete', component: CompleteStep }
  ];

  // Prevent body scroll when modal open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const updateData = (updates: Partial<RegistrationData>) => {
    setRegistrationData(prev => ({ ...prev, ...updates }));
    // Clear related errors
    const errorKeys = Object.keys(updates);
    setErrors(prev => {
      const newErrors = { ...prev };
      errorKeys.forEach(key => delete newErrors[key]);
      return newErrors;
    });
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};
    
    switch (step) {
      case 1: // Personal Info
        if (!registrationData.firstName.trim()) {
          newErrors.firstName = language === 'pt' ? 'Nome é obrigatório' : 'First name is required';
        }
        if (!registrationData.email.trim()) {
          newErrors.email = language === 'pt' ? 'Email é obrigatório' : 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registrationData.email)) {
          newErrors.email = language === 'pt' ? 'Email inválido' : 'Invalid email';
        }
        break;
        
      case 2: // Heritage
        if (registrationData.heritage.length === 0) {
          newErrors.heritage = language === 'pt' ? 'Selecione pelo menos uma herança' : 'Select at least one heritage';
        }
        break;
        
      case 3: // Interests
        if (registrationData.culturalInterests.length === 0) {
          newErrors.culturalInterests = language === 'pt' ? 'Selecione pelo menos um interesse' : 'Select at least one interest';
        }
        break;
        
      case 4: // Location
        if (!registrationData.location) {
          newErrors.location = language === 'pt' ? 'Localização é obrigatória' : 'Location is required';
        }
        break;
        
      case 5: // Community
        if (registrationData.communityPreferences.length === 0) {
          newErrors.communityPreferences = language === 'pt' ? 'Selecione pelo menos uma preferência' : 'Select at least one preference';
        }
        break;
        
      case 7: // Complete
        if (!registrationData.agreeToTerms) {
          newErrors.agreeToTerms = language === 'pt' ? 'Deve aceitar os termos' : 'Must agree to terms';
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleComplete = async () => {
    if (!validateStep(currentStep)) return;
    
    setIsSubmitting(true);
    try {
      await onComplete(registrationData);
      onClose();
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const CurrentStepComponent = steps[currentStep]?.component;

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ y: 100, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.9 }}
        className="w-full max-w-md max-h-[95vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: currentStep * 45 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-10 h-10 bg-gradient-to-br from-green-600 via-red-600 to-green-600 rounded-full flex items-center justify-center"
              >
                <span className="text-white text-sm font-bold">LT</span>
              </motion.div>
              <div>
                <div className="font-bold text-gray-900">LusoTown</div>
                <div className="text-sm text-gray-500">{steps[currentStep]?.title}</div>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
              aria-label="Close registration"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>{language === 'pt' ? 'Progresso' : 'Progress'}</span>
              <span>{currentStep + 1} / {steps.length}</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-500 via-red-500 to-green-500"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {CurrentStepComponent && (
            <CurrentStepComponent
              data={registrationData}
              updateData={updateData}
              errors={errors}
              onNext={nextStep}
              onPrevious={prevStep}
              onComplete={handleComplete}
              isFirstStep={currentStep === 0}
              isLastStep={currentStep === steps.length - 1}
              isSubmitting={isSubmitting}
              language={language}
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// Step Components

function WelcomeStep({ onNext, language }: any) {
  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 via-red-500 to-green-500 rounded-full flex items-center justify-center shadow-xl"
        >
          <span className="text-3xl">🇵🇹</span>
        </motion.div>
        
        <h1 className="text-2xl font-bold text-gray-900 leading-tight">
          {language === 'pt' 
            ? 'Bem-vindos à Comunidade Lusófona!'
            : 'Welcome to the Portuguese-speaking Community!'}
        </h1>
        
        <p className="text-gray-600 leading-relaxed">
          {language === 'pt'
            ? 'Junte-se a mais de 750 falantes de português no Reino Unido. Crie conexões autênticas, descubra eventos culturais e celebre a nossa rica herança.'
            : 'Join 750+ Portuguese speakers in the United Kingdom. Create authentic connections, discover cultural events, and celebrate our rich heritage.'}
        </p>
      </motion.div>

      {/* Community Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-3 gap-4"
      >
        <div className="text-center p-3 bg-green-50 border border-green-200 rounded-xl">
          <div className="text-2xl font-bold text-green-600">750+</div>
          <div className="text-xs text-gray-600">
            {language === 'pt' ? 'Membros' : 'Members'}
          </div>
        </div>
        <div className="text-center p-3 bg-red-50 border border-red-200 rounded-xl">
          <div className="text-2xl font-bold text-red-600">50+</div>
          <div className="text-xs text-gray-600">
            {language === 'pt' ? 'Eventos/mês' : 'Events/month'}
          </div>
        </div>
        <div className="text-center p-3 bg-blue-50 border border-blue-200 rounded-xl">
          <div className="text-2xl font-bold text-blue-600">8</div>
          <div className="text-xs text-gray-600">
            {language === 'pt' ? 'Países' : 'Countries'}
          </div>
        </div>
      </motion.div>

      {/* Cultural Nations Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-green-50 via-red-50 to-green-50 rounded-2xl p-4 border border-green-200"
      >
        <div className="text-center mb-4">
          <h3 className="font-bold text-gray-900 mb-2">
            {language === 'pt' ? 'Comunidade Lusófona no Reino Unido' : 'Portuguese-speaking Community in UK'}
          </h3>
          <div className="text-3xl mb-2">🇵🇹🇧🇷🇨🇻🇦🇴🇲🇿🇬🇼🇸🇹🇹🇱</div>
          <p className="text-sm text-gray-600">
            {language === 'pt'
              ? '8 países lusófonos • 1 comunidade unida no Reino Unido'
              : '8 Portuguese-speaking nations • 1 united UK community'}
          </p>
        </div>
      </motion.div>

      {/* Continue Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onNext}
        className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200"
        style={{ minHeight: '48px' }}
      >
        <span>
          {language === 'pt' ? 'Começar Registo' : 'Start Registration'}
        </span>
        <ArrowRightIcon className="w-5 h-5" />
      </motion.button>
      
      <p className="text-center text-xs text-gray-500">
        {language === 'pt' 
          ? '⏱️ Leva apenas 3 minutos • Comece grátis'
          : '⏱️ Takes only 3 minutes • Start free'}
      </p>
    </div>
  );
}

function PersonalInfoStep({ data, updateData, errors, onNext, onPrevious, language }: any) {
  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-3"
      >
        <h2 className="text-xl font-bold text-gray-900">
          {language === 'pt' ? 'Informações Pessoais' : 'Personal Information'}
        </h2>
        <p className="text-gray-600">
          {language === 'pt'
            ? 'Conte-nos um pouco sobre você para personalizar a sua experiência'
            : 'Tell us a bit about yourself to personalize your experience'}
        </p>
      </motion.div>

      <div className="space-y-4">
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <UserIcon className="w-4 h-4 inline mr-2" />
            {language === 'pt' ? 'Primeiro Nome' : 'First Name'}
          </label>
          <input
            type="text"
            value={data.firstName}
            onChange={(e) => updateData({ firstName: e.target.value })}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all ${
              errors.firstName 
                ? 'border-red-300 focus:ring-red-400 bg-red-50' 
                : 'border-gray-300 focus:ring-green-400 bg-white'
            }`}
            placeholder={language === 'pt' ? 'Ex: Maria' : 'e.g. Maria'}
            style={{ minHeight: '48px' }}
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <UserIcon className="w-4 h-4 inline mr-2" />
            {language === 'pt' ? 'Apelido' : 'Last Name'}
          </label>
          <input
            type="text"
            value={data.lastName}
            onChange={(e) => updateData({ lastName: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all bg-white"
            placeholder={language === 'pt' ? 'Ex: Silva' : 'e.g. Silva'}
            style={{ minHeight: '48px' }}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <EnvelopeIcon className="w-4 h-4 inline mr-2" />
            {language === 'pt' ? 'Endereço de Email' : 'Email Address'}
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => updateData({ email: e.target.value })}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all ${
              errors.email 
                ? 'border-red-300 focus:ring-red-400 bg-red-50' 
                : 'border-gray-300 focus:ring-green-400 bg-white'
            }`}
            placeholder={language === 'pt' ? 'seu.email@exemplo.com' : 'your.email@example.com'}
            style={{ minHeight: '48px' }}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Phone (Optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <PhoneIcon className="w-4 h-4 inline mr-2" />
            {language === 'pt' ? 'Telefone (Opcional)' : 'Phone (Optional)'}
          </label>
          <input
            type="tel"
            value={data.phone || ''}
            onChange={(e) => updateData({ phone: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all bg-white"
            placeholder={language === 'pt' ? '+44 7700 900123' : '+44 7700 900123'}
            style={{ minHeight: '48px' }}
          />
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <ShieldCheckIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">
              {language === 'pt' ? 'Privacidade Garantida' : 'Privacy Guaranteed'}
            </p>
            <p className="text-blue-700">
              {language === 'pt'
                ? 'As suas informações são encriptadas e nunca partilhadas com terceiros.'
                : 'Your information is encrypted and never shared with third parties.'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        <button
          onClick={onPrevious}
          className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all"
          style={{ minHeight: '48px' }}
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>{language === 'pt' ? 'Voltar' : 'Back'}</span>
        </button>
        
        <button
          onClick={onNext}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl transition-all hover:shadow-lg"
          style={{ minHeight: '48px' }}
        >
          <span>{language === 'pt' ? 'Continuar' : 'Continue'}</span>
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function HeritageStep({ data, updateData, errors, onNext, onPrevious, language }: any) {
  const toggleHeritage = (code: string) => {
    const updated = data.heritage.includes(code)
      ? data.heritage.filter((h: string) => h !== code)
      : [...data.heritage, code];
    updateData({ heritage: updated });
  };

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-3"
      >
        <h2 className="text-xl font-bold text-gray-900">
          {language === 'pt' ? 'Sua Herança Lusófona' : 'Your Portuguese Heritage'}
        </h2>
        <p className="text-gray-600">
          {language === 'pt'
            ? 'Selecione todas as origens que representam você. Celebramos TODAS as culturas lusófonas!'
            : 'Select all backgrounds that represent you. We celebrate ALL Portuguese-speaking cultures!'}
        </p>
      </motion.div>

      {errors.heritage && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
          <p className="text-sm text-red-600">{errors.heritage}</p>
        </div>
      )}

      {/* Heritage Grid */}
      <div className="grid grid-cols-2 gap-3">
        {PORTUGUESE_NATIONS.map((nation, index) => {
          const isSelected = data.heritage.includes(nation.code);
          
          return (
            <motion.button
              key={nation.code}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleHeritage(nation.code)}
              className={`
                relative p-4 rounded-2xl border-2 transition-all duration-200 text-center min-h-[100px] flex flex-col items-center justify-center
                ${isSelected 
                  ? 'border-green-500 bg-green-50 shadow-lg ring-2 ring-green-200' 
                  : 'border-gray-200 bg-white hover:border-green-300 hover:shadow-md'
                }
              `}
              style={{ minHeight: '100px' }}
            >
              <div className="text-2xl mb-2">{nation.flag}</div>
              <div className="text-sm font-semibold text-gray-900 leading-tight mb-1">
                {language === 'pt' ? nation.namePort : nation.name}
              </div>
              <div className="text-xs text-gray-600 leading-tight">
                {nation.description}
              </div>
              
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-2 right-2 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center"
                  >
                    <CheckIcon className="w-4 h-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      {/* Selection Counter */}
      <div className="text-center p-3 bg-gray-50 rounded-xl">
        <p className="text-sm text-gray-600">
          <strong>{data.heritage.length}</strong> {language === 'pt' ? 'heranças selecionadas' : 'heritages selected'}
        </p>
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        <button
          onClick={onPrevious}
          className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all"
          style={{ minHeight: '48px' }}
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>{language === 'pt' ? 'Voltar' : 'Back'}</span>
        </button>
        
        <button
          onClick={onNext}
          disabled={data.heritage.length === 0}
          className={`
            flex-1 flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-xl transition-all
            ${data.heritage.length > 0
              ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }
          `}
          style={{ minHeight: '48px' }}
        >
          <span>{language === 'pt' ? 'Continuar' : 'Continue'}</span>
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function InterestsStep({ data, updateData, errors, onNext, onPrevious, language }: any) {
  const toggleInterest = (id: string) => {
    const updated = data.culturalInterests.includes(id)
      ? data.culturalInterests.filter((i: string) => i !== id)
      : [...data.culturalInterests, id];
    updateData({ culturalInterests: updated });
  };

  const groupedInterests = CULTURAL_INTERESTS.reduce((groups: any, interest) => {
    const category = interest.category;
    if (!groups[category]) groups[category] = [];
    groups[category].push(interest);
    return groups;
  }, {});

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-3"
      >
        <h2 className="text-xl font-bold text-gray-900">
          {language === 'pt' ? 'Seus Interesses Culturais' : 'Your Cultural Interests'}
        </h2>
        <p className="text-gray-600">
          {language === 'pt'
            ? 'Selecione os aspectos da cultura lusófona que mais lhe interessam'
            : 'Select the aspects of Portuguese culture that interest you most'}
        </p>
      </motion.div>

      {errors.culturalInterests && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
          <p className="text-sm text-red-600">{errors.culturalInterests}</p>
        </div>
      )}

      {/* Interests by Category */}
      <div className="space-y-6 max-h-96 overflow-y-auto">
        {Object.entries(groupedInterests).map(([category, interests]: [string, any]) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <h3 className="font-semibold text-gray-900 capitalize flex items-center gap-2">
              {category === 'music' && <MusicalNoteIcon className="w-5 h-5 text-red-600" />}
              {category === 'food' && <span className="text-orange-600">🍽️</span>}
              {category === 'culture' && <GlobeEuropeAfricaIcon className="w-5 h-5 text-green-600" />}
              {category === 'business' && <BriefcaseIcon className="w-5 h-5 text-blue-600" />}
              {category === 'education' && <span className="text-purple-600">🎓</span>}
              {category === 'sports' && <span className="text-indigo-600">⚽</span>}
              {language === 'pt' ? 
                category === 'music' ? 'Música' :
                category === 'food' ? 'Comida' :
                category === 'culture' ? 'Cultura' :
                category === 'business' ? 'Negócios' :
                category === 'education' ? 'Educação' :
                category === 'sports' ? 'Desportos' : category
                : category.charAt(0).toUpperCase() + category.slice(1)}
            </h3>
            
            <div className="grid grid-cols-2 gap-2">
              {interests.map((interest: any, index: number) => {
                const isSelected = data.culturalInterests.includes(interest.id);
                
                return (
                  <motion.button
                    key={interest.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleInterest(interest.id)}
                    className={`
                      p-3 rounded-xl border-2 transition-all duration-200 text-left flex items-center gap-3
                      ${isSelected 
                        ? 'border-green-500 bg-green-50 text-green-700 shadow-md' 
                        : 'border-gray-200 bg-white text-gray-700 hover:border-green-300'
                      }
                    `}
                    style={{ minHeight: '48px' }}
                  >
                    <span className="text-xl">{interest.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">
                        {language === 'pt' ? interest.namePort : interest.name}
                      </div>
                    </div>
                    {isSelected && (
                      <CheckIcon className="w-4 h-4 text-green-600" />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Selection Counter */}
      <div className="text-center p-3 bg-gray-50 rounded-xl">
        <p className="text-sm text-gray-600">
          <strong>{data.culturalInterests.length}</strong> {language === 'pt' ? 'interesses selecionados' : 'interests selected'}
        </p>
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        <button
          onClick={onPrevious}
          className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all"
          style={{ minHeight: '48px' }}
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>{language === 'pt' ? 'Voltar' : 'Back'}</span>
        </button>
        
        <button
          onClick={onNext}
          disabled={data.culturalInterests.length === 0}
          className={`
            flex-1 flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-xl transition-all
            ${data.culturalInterests.length > 0
              ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }
          `}
          style={{ minHeight: '48px' }}
        >
          <span>{language === 'pt' ? 'Continuar' : 'Continue'}</span>
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function LocationStep({ data, updateData, errors, onNext, onPrevious, language }: any) {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedArea, setSelectedArea] = useState('');

  const handleCityChange = (cityCode: string) => {
    setSelectedCity(cityCode);
    setSelectedArea('');
    const city = UK_LOCATIONS.find(loc => loc.code === cityCode);
    if (city) {
      updateData({ location: city.name, specificArea: '' });
    }
  };

  const handleAreaChange = (area: string) => {
    setSelectedArea(area);
    updateData({ specificArea: area });
  };

  const selectedCityData = UK_LOCATIONS.find(loc => loc.code === selectedCity);

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-3"
      >
        <h2 className="text-xl font-bold text-gray-900">
          {language === 'pt' ? 'Sua Localização no Reino Unido' : 'Your UK Location'}
        </h2>
        <p className="text-gray-600">
          {language === 'pt'
            ? 'Isso nos ajuda a conectá-lo com eventos e pessoas próximas'
            : 'This helps us connect you with nearby events and people'}
        </p>
      </motion.div>

      {errors.location && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
          <p className="text-sm text-red-600">{errors.location}</p>
        </div>
      )}

      {/* City Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          <MapPinIcon className="w-4 h-4 inline mr-2" />
          {language === 'pt' ? 'Cidade Principal' : 'Main City'}
        </label>
        <div className="grid grid-cols-2 gap-3">
          {UK_LOCATIONS.map((location, index) => (
            <motion.button
              key={location.code}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCityChange(location.code)}
              className={`
                p-3 rounded-xl border-2 transition-all duration-200 text-center
                ${selectedCity === location.code
                  ? 'border-green-500 bg-green-50 text-green-700 shadow-md' 
                  : 'border-gray-200 bg-white text-gray-700 hover:border-green-300'
                }
              `}
              style={{ minHeight: '48px' }}
            >
              <div className="font-medium text-sm">
                {location.name}
              </div>
              {selectedCity === location.code && (
                <CheckIcon className="w-4 h-4 text-green-600 mx-auto mt-1" />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Area Selection */}
      {selectedCityData && selectedCityData.areas.length > 1 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-3"
        >
          <label className="block text-sm font-medium text-gray-700">
            {language === 'pt' ? `Área em ${selectedCityData.name}` : `Area in ${selectedCityData.name}`}
          </label>
          <div className="grid grid-cols-2 gap-2">
            {selectedCityData.areas.map((area, index) => (
              <button
                key={area}
                onClick={() => handleAreaChange(area)}
                className={`
                  p-2 rounded-lg border transition-all duration-200 text-sm
                  ${selectedArea === area
                    ? 'border-green-500 bg-green-50 text-green-700' 
                    : 'border-gray-200 bg-white text-gray-700 hover:border-green-300'
                  }
                `}
                style={{ minHeight: '40px' }}
              >
                {area}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Portuguese Community Info */}
      {selectedCity === 'london' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-200 rounded-xl p-4"
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl">🇵🇹</span>
            <div className="text-sm text-green-800">
              <p className="font-medium mb-1">
                {language === 'pt' ? 'Área da Comunidade Portuguesa!' : 'Portuguese Community Area!'}
              </p>
              <p className="text-green-700">
                {language === 'pt'
                  ? 'Londres tem a maior comunidade de falantes de português no Reino Unido, especialmente em Stockwell e Vauxhall.'
                  : 'London has the largest Portuguese-speaking community in the UK, especially in Stockwell and Vauxhall.'}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Navigation */}
      <div className="flex gap-3">
        <button
          onClick={onPrevious}
          className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all"
          style={{ minHeight: '48px' }}
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>{language === 'pt' ? 'Voltar' : 'Back'}</span>
        </button>
        
        <button
          onClick={onNext}
          disabled={!data.location}
          className={`
            flex-1 flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-xl transition-all
            ${data.location
              ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }
          `}
          style={{ minHeight: '48px' }}
        >
          <span>{language === 'pt' ? 'Continuar' : 'Continue'}</span>
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function CommunityStep({ data, updateData, errors, onNext, onPrevious, language }: any) {
  const togglePreference = (id: string) => {
    const updated = data.communityPreferences.includes(id)
      ? data.communityPreferences.filter((p: string) => p !== id)
      : [...data.communityPreferences, id];
    updateData({ communityPreferences: updated });
  };

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-3"
      >
        <h2 className="text-xl font-bold text-gray-900">
          {language === 'pt' ? 'Como Quer Conectar?' : 'How Do You Want to Connect?'}
        </h2>
        <p className="text-gray-600">
          {language === 'pt'
            ? 'Selecione as formas como quer participar na comunidade lusófona'
            : 'Select how you want to participate in the Portuguese-speaking community'}
        </p>
      </motion.div>

      {errors.communityPreferences && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
          <p className="text-sm text-red-600">{errors.communityPreferences}</p>
        </div>
      )}

      {/* Community Preferences Grid */}
      <div className="space-y-3">
        {COMMUNITY_PREFERENCES.map((preference, index) => {
          const isSelected = data.communityPreferences.includes(preference.id);
          
          return (
            <motion.button
              key={preference.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => togglePreference(preference.id)}
              className={`
                w-full p-4 rounded-xl border-2 transition-all duration-200 text-left
                ${isSelected 
                  ? 'border-green-500 bg-green-50 shadow-md' 
                  : 'border-gray-200 bg-white hover:border-green-300 hover:shadow-sm'
                }
              `}
              style={{ minHeight: '80px' }}
            >
              <div className="flex items-start gap-4">
                <div className="text-2xl">{preference.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className={`font-semibold mb-1 ${isSelected ? 'text-green-800' : 'text-gray-900'}`}>
                    {language === 'pt' ? preference.namePort : preference.name}
                  </div>
                  <div className={`text-sm leading-relaxed ${isSelected ? 'text-green-700' : 'text-gray-600'}`}>
                    {preference.description}
                  </div>
                </div>
                {isSelected && (
                  <CheckIconSolid className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Selection Counter */}
      <div className="text-center p-3 bg-gray-50 rounded-xl">
        <p className="text-sm text-gray-600">
          <strong>{data.communityPreferences.length}</strong> {language === 'pt' ? 'preferências selecionadas' : 'preferences selected'}
        </p>
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        <button
          onClick={onPrevious}
          className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all"
          style={{ minHeight: '48px' }}
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>{language === 'pt' ? 'Voltar' : 'Back'}</span>
        </button>
        
        <button
          onClick={onNext}
          disabled={data.communityPreferences.length === 0}
          className={`
            flex-1 flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-xl transition-all
            ${data.communityPreferences.length > 0
              ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }
          `}
          style={{ minHeight: '48px' }}
        >
          <span>{language === 'pt' ? 'Continuar' : 'Continue'}</span>
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function MembershipStep({ data, updateData, onNext, onPrevious, language }: any) {
  const membershipPlans = [
    {
      id: 'free' as const,
      name: language === 'pt' ? 'Explorador Grátis' : 'Free Explorer',
      price: 0,
      description: language === 'pt' ? 'Comece a explorar a comunidade' : 'Start exploring the community',
      features: language === 'pt' ? [
        'Acesso a eventos gratuitos',
        'Perfil básico da comunidade',
        'Conexões limitadas',
        'Newsletter mensal'
      ] : [
        'Access to free events',
        'Basic community profile',
        'Limited connections',
        'Monthly newsletter'
      ],
      color: 'gray',
      popular: false
    },
    {
      id: 'community' as const,
      name: language === 'pt' ? 'Membro da Comunidade' : 'Community Member',
      price: getPlanPrice('community', data.billingCycle),
      description: language === 'pt' ? 'Acesso completo à comunidade' : 'Full community access',
      features: language === 'pt' ? [
        'Todos os eventos culturais',
        'Networking ilimitado',
        'Perfil completo verificado',
        'Descontos em restaurantes portugueses',
        'Grupos privados por interesse',
        'Suporte prioritário'
      ] : [
        'All cultural events',
        'Unlimited networking',
        'Full verified profile',
        'Discounts at Portuguese restaurants',
        'Private interest groups',
        'Priority support'
      ],
      color: 'green',
      popular: true
    },
    {
      id: 'ambassador' as const,
      name: language === 'pt' ? 'Embaixador Cultural' : 'Cultural Ambassador',
      price: getPlanPrice('ambassador', data.billingCycle),
      description: language === 'pt' ? 'Liderança na comunidade' : 'Community leadership',
      features: language === 'pt' ? [
        'Tudo do Membro da Comunidade',
        'Organizar eventos culturais',
        'Perfil destacado como líder',
        'Acesso VIP a eventos especiais',
        'Mentoria comunitária',
        'Caixa mensal de produtos portugueses'
      ] : [
        'Everything in Community Member',
        'Host cultural events',
        'Featured leader profile',
        'VIP access to special events',
        'Community mentorship',
        'Monthly Portuguese product box'
      ],
      color: 'premium',
      popular: false
    }
  ];

  const getColorClasses = (color: string, isSelected: boolean) => {
    const colorMap = {
      gray: {
        border: isSelected ? 'border-gray-400' : 'border-gray-200',
        bg: isSelected ? 'bg-gray-50' : 'bg-white',
        text: isSelected ? 'text-gray-800' : 'text-gray-600',
        badge: 'bg-gray-100 text-gray-800'
      },
      green: {
        border: isSelected ? 'border-green-500' : 'border-green-200',
        bg: isSelected ? 'bg-green-50' : 'bg-white',
        text: isSelected ? 'text-green-800' : 'text-gray-600',
        badge: 'bg-green-100 text-green-800'
      },
      premium: {
        border: isSelected ? 'border-purple-500' : 'border-purple-200',
        bg: isSelected ? 'bg-purple-50' : 'bg-white',
        text: isSelected ? 'text-purple-800' : 'text-gray-600',
        badge: 'bg-purple-100 text-purple-800'
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.gray;
  };

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-3"
      >
        <h2 className="text-xl font-bold text-gray-900">
          {language === 'pt' ? 'Escolha Seu Plano' : 'Choose Your Plan'}
        </h2>
        <p className="text-gray-600">
          {language === 'pt'
            ? 'Selecione o plano perfeito para sua jornada na comunidade lusófona'
            : 'Select the perfect plan for your Portuguese-speaking community journey'}
        </p>
      </motion.div>

      {/* Billing Cycle Toggle */}
      <div className="flex justify-center mb-6">
        <div className="bg-gray-100 rounded-xl p-1 flex">
          <button
            onClick={() => updateData({ billingCycle: 'monthly' })}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              data.billingCycle === 'monthly'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600'
            }`}
          >
            {language === 'pt' ? 'Mensal' : 'Monthly'}
          </button>
          <button
            onClick={() => updateData({ billingCycle: 'annual' })}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all relative ${
              data.billingCycle === 'annual'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600'
            }`}
          >
            {language === 'pt' ? 'Anual' : 'Annual'}
            <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              17%
            </span>
          </button>
        </div>
      </div>

      {/* Membership Plans */}
      <div className="space-y-4">
        {membershipPlans.map((plan, index) => {
          const isSelected = data.selectedPlan === plan.id;
          const colors = getColorClasses(plan.color, isSelected);
          
          return (
            <motion.button
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => updateData({ selectedPlan: plan.id })}
              className={`
                w-full p-4 rounded-xl border-2 transition-all duration-200 text-left relative
                ${colors.border} ${colors.bg}
                ${isSelected ? 'shadow-lg ring-2 ring-green-200' : 'hover:shadow-md'}
              `}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {language === 'pt' ? 'Mais Popular' : 'Most Popular'}
                  </span>
                </div>
              )}
              
              <div className="flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  {/* Plan Header */}
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className={`font-bold text-lg ${colors.text}`}>
                      {plan.name}
                    </h3>
                    {isSelected && (
                      <CheckIconSolid className="w-5 h-5 text-green-600 flex-shrink-0" />
                    )}
                  </div>
                  
                  {/* Price */}
                  <div className="mb-3">
                    {plan.price === 0 ? (
                      <span className="text-2xl font-bold text-gray-900">
                        {language === 'pt' ? 'Grátis' : 'Free'}
                      </span>
                    ) : (
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-gray-900">
                          {formatPrice(plan.price)}
                        </span>
                        <span className="text-gray-600">
                          /{data.billingCycle === 'annual' 
                            ? (language === 'pt' ? 'ano' : 'year')
                            : (language === 'pt' ? 'mês' : 'month')}
                        </span>
                      </div>
                    )}
                    {data.billingCycle === 'annual' && plan.price > 0 && (
                      <div className="text-sm text-green-600 font-medium">
                        {language === 'pt' 
                          ? `${formatPrice(plan.price / 12)}/mês • Poupança de 17%`
                          : `${formatPrice(plan.price / 12)}/month • Save 17%`
                        }
                      </div>
                    )}
                  </div>
                  
                  {/* Description */}
                  <p className={`text-sm mb-3 ${colors.text}`}>
                    {plan.description}
                  </p>
                  
                  {/* Features */}
                  <div className="space-y-1">
                    {plan.features.slice(0, 3).map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <CheckIcon className="w-3 h-3 text-green-500 flex-shrink-0" />
                        <span className="text-xs text-gray-600">{feature}</span>
                      </div>
                    ))}
                    {plan.features.length > 3 && (
                      <div className="text-xs text-gray-500">
                        {language === 'pt' 
                          ? `+${plan.features.length - 3} outros benefícios`
                          : `+${plan.features.length - 3} more benefits`
                        }
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Value Proposition */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="text-center">
          <h4 className="font-semibold text-blue-900 mb-2">
            {language === 'pt' ? '🎯 Por que investir na comunidade?' : '🎯 Why invest in community?'}
          </h4>
          <p className="text-sm text-blue-800">
            {language === 'pt'
              ? 'Membros pagos participam em 3x mais eventos, fazem 5x mais conexões e têm 90% mais probabilidade de encontrar oportunidades de negócio.'
              : 'Paid members attend 3x more events, make 5x more connections, and are 90% more likely to find business opportunities.'}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        <button
          onClick={onPrevious}
          className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all"
          style={{ minHeight: '48px' }}
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>{language === 'pt' ? 'Voltar' : 'Back'}</span>
        </button>
        
        <button
          onClick={onNext}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl transition-all hover:shadow-lg"
          style={{ minHeight: '48px' }}
        >
          <span>{language === 'pt' ? 'Continuar' : 'Continue'}</span>
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function CompleteStep({ data, updateData, onComplete, isSubmitting, language }: any) {
  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 via-red-500 to-green-500 rounded-full flex items-center justify-center shadow-xl"
        >
          {isSubmitting ? (
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <CheckIcon className="w-10 h-10 text-white" />
          )}
        </motion.div>
        
        <h1 className="text-2xl font-bold text-gray-900 leading-tight">
          {language === 'pt' 
            ? 'Pronto para Começar!'
            : 'Ready to Get Started!'}
        </h1>
        
        <p className="text-gray-600 leading-relaxed">
          {language === 'pt'
            ? 'Você está a um passo de se juntar à vibrante comunidade lusófona do Reino Unido.'
            : 'You\'re one step away from joining the vibrant Portuguese-speaking community in the UK.'}
        </p>
      </motion.div>

      {/* Registration Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-green-50 via-red-50 to-green-50 rounded-2xl p-4 border border-green-200"
      >
        <h3 className="font-bold text-gray-900 mb-3">
          {language === 'pt' ? 'Resumo do Registo' : 'Registration Summary'}
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">{language === 'pt' ? 'Nome:' : 'Name:'}</span>
            <span className="font-medium">{data.firstName} {data.lastName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">{language === 'pt' ? 'Herança:' : 'Heritage:'}</span>
            <span className="font-medium">{data.heritage.length} {language === 'pt' ? 'países' : 'countries'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">{language === 'pt' ? 'Localização:' : 'Location:'}</span>
            <span className="font-medium">{data.location}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">{language === 'pt' ? 'Plano:' : 'Plan:'}</span>
            <span className="font-medium">
              {data.selectedPlan === 'free' 
                ? (language === 'pt' ? 'Explorador Grátis' : 'Free Explorer')
                : data.selectedPlan === 'community'
                ? (language === 'pt' ? 'Membro da Comunidade' : 'Community Member')  
                : (language === 'pt' ? 'Embaixador Cultural' : 'Cultural Ambassador')
              }
            </span>
          </div>
        </div>
      </motion.div>

      {/* Terms Agreement */}
      <div className="space-y-4">
        <div className="flex items-start p-3 border border-gray-200 rounded-xl bg-white">
          <input
            id="agreeTerms"
            type="checkbox"
            checked={data.agreeToTerms}
            onChange={(e) => updateData({ agreeToTerms: e.target.checked })}
            className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded mt-0.5 flex-shrink-0"
          />
          <label htmlFor="agreeTerms" className="ml-3 text-sm text-gray-700">
            {language === 'pt' 
              ? 'Concordo com os Termos de Serviço, Política de Privacidade e Diretrizes da Comunidade do LusoTown.'
              : 'I agree to LusoTown\'s Terms of Service, Privacy Policy, and Community Guidelines.'}
          </label>
        </div>

        <div className="flex items-start p-3 border border-gray-200 rounded-xl bg-white">
          <input
            id="agreeMarketing"
            type="checkbox"
            checked={data.agreeToMarketing}
            onChange={(e) => updateData({ agreeToMarketing: e.target.checked })}
            className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded mt-0.5 flex-shrink-0"
          />
          <label htmlFor="agreeMarketing" className="ml-3 text-sm text-gray-700">
            {language === 'pt' 
              ? 'Quero receber newsletters sobre eventos culturais e oportunidades da comunidade. (Opcional)'
              : 'I want to receive newsletters about cultural events and community opportunities. (Optional)'}
          </label>
        </div>
      </div>

      {/* What's Next */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-blue-50 border border-blue-200 rounded-xl p-4"
      >
        <h4 className="font-semibold text-blue-900 mb-3">
          {language === 'pt' ? '🎉 O que acontece agora?' : '🎉 What happens next?'}
        </h4>
        <div className="space-y-2 text-sm text-blue-800">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">1</span>
            </div>
            <span>{language === 'pt' ? 'Confirmação por email em 2 minutos' : 'Email confirmation in 2 minutes'}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">2</span>
            </div>
            <span>{language === 'pt' ? 'Acesso imediato aos eventos gratuitos' : 'Immediate access to free events'}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">3</span>
            </div>
            <span>{language === 'pt' ? 'Comece a conectar com a comunidade!' : 'Start connecting with the community!'}</span>
          </div>
        </div>
      </motion.div>

      {/* Complete Registration Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
        onClick={onComplete}
        disabled={!data.agreeToTerms || isSubmitting}
        className={`
          w-full flex items-center justify-center gap-3 px-6 py-4 font-semibold rounded-2xl shadow-lg transition-all duration-200
          ${data.agreeToTerms && !isSubmitting
            ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-xl'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }
        `}
        style={{ minHeight: '56px' }}
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>{language === 'pt' ? 'A criar conta...' : 'Creating account...'}</span>
          </>
        ) : (
          <>
            <span className="text-xl">🇵🇹</span>
            <span>
              {language === 'pt' ? 'Junte-se à Comunidade Lusófona!' : 'Join the Portuguese Community!'}
            </span>
            <SparklesIcon className="w-5 h-5" />
          </>
        )}
      </motion.button>
      
      <p className="text-center text-xs text-gray-500">
        {language === 'pt' 
          ? '🔒 As suas informações são seguras e encriptadas'
          : '🔒 Your information is safe and encrypted'}
      </p>
    </div>
  );
}

export default MobileRegistrationFlow;