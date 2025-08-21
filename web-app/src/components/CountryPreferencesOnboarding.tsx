'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/context/LanguageContext';
import CountryPreferences from './CountryPreferences';
import { 
  DEFAULT_COUNTRY_PREFERENCES,
  type MatchingPreferences 
} from '@/lib/matching-preferences';

interface CountryPreferencesOnboardingProps {
  onComplete: (preferences: { preferredCountries: string[] }) => void;
  onSkip?: () => void;
  showSkipOption?: boolean;
  initialCountries?: string[];
  className?: string;
}

export default function CountryPreferencesOnboarding({
  onComplete,
  onSkip,
  showSkipOption = true,
  initialCountries = DEFAULT_COUNTRY_PREFERENCES,
  className = ''
}: CountryPreferencesOnboardingProps) {
  const { language } = useLanguage();
  const [selectedCountries, setSelectedCountries] = useState<string[]>(initialCountries);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const isPortuguese = language === 'pt';
  const hasSelections = selectedCountries.length > 0;

  const handleContinue = async () => {
    setIsSubmitting(true);
    
    try {
      // Save preferences
      await onComplete({ preferredCountries: selectedCountries });
    } catch (error) {
      console.error('Failed to save preferences:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    } else {
      // Use default preferences if no skip handler
      onComplete({ preferredCountries: DEFAULT_COUNTRY_PREFERENCES });
    }
  };

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🌍</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {isPortuguese 
              ? 'Defina Suas Preferências de País'
              : 'Set Your Country Preferences'
            }
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {isPortuguese 
              ? 'Escolha os países de língua portuguesa com os quais gostaria de se conectar. Isso nos ajuda a encontrar pessoas que compartilham suas preferências culturais.'
              : 'Choose Portuguese-speaking countries you\'d like to connect with. This helps us find people who share your cultural preferences.'
            }
          </p>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-3 gap-4 mb-8"
        >
          <div className="bg-primary-50 rounded-lg p-4">
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mb-2 mx-auto">
              <span className="text-sm">🎯</span>
            </div>
            <h3 className="font-semibold text-gray-900 text-sm mb-1">
              {isPortuguese ? 'Combinações Relevantes' : 'Relevant Matches'}
            </h3>
            <p className="text-xs text-gray-600">
              {isPortuguese 
                ? 'Encontre pessoas do seu país ou região preferida'
                : 'Find people from your preferred countries or regions'
              }
            </p>
          </div>
          
          <div className="bg-secondary-50 rounded-lg p-4">
            <div className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center mb-2 mx-auto">
              <span className="text-sm">🤝</span>
            </div>
            <h3 className="font-semibold text-gray-900 text-sm mb-1">
              {isPortuguese ? 'Conexões Culturais' : 'Cultural Connections'}
            </h3>
            <p className="text-xs text-gray-600">
              {isPortuguese 
                ? 'Conecte-se com quem entende sua cultura'
                : 'Connect with people who understand your culture'
              }
            </p>
          </div>
          
          <div className="bg-accent-50 rounded-lg p-4">
            <div className="w-8 h-8 bg-accent-100 rounded-full flex items-center justify-center mb-2 mx-auto">
              <span className="text-sm">⚙️</span>
            </div>
            <h3 className="font-semibold text-gray-900 text-sm mb-1">
              {isPortuguese ? 'Sempre Alterável' : 'Always Changeable'}
            </h3>
            <p className="text-xs text-gray-600">
              {isPortuguese 
                ? 'Pode alterar essas preferências a qualquer momento'
                : 'You can change these preferences anytime'
              }
            </p>
          </div>
        </motion.div>
      </div>

      {/* Country Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-lg p-6 mb-8"
      >
        <CountryPreferences
          selectedCountries={selectedCountries}
          onCountryChange={setSelectedCountries}
          maxSelections={9}
          showDiasporaInfo={true}
        />
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        {showSkipOption && (
          <button
            onClick={handleSkip}
            className="px-6 py-3 text-gray-600 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
          >
            {isPortuguese ? 'Pular por Agora' : 'Skip for Now'}
          </button>
        )}
        
        <button
          onClick={handleContinue}
          disabled={!hasSelections || isSubmitting}
          className={`
            px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2
            ${hasSelections && !isSubmitting
              ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white hover:from-primary-700 hover:to-secondary-700 shadow-lg hover:shadow-xl'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              {isPortuguese ? 'Salvando...' : 'Saving...'}
            </>
          ) : (
            <>
              {isPortuguese ? 'Continuar' : 'Continue'}
              <ArrowRightIcon className="w-4 h-4" />
            </>
          )}
        </button>
      </motion.div>

      {/* Selection summary */}
      {hasSelections && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-800 rounded-full text-sm">
            <CheckCircleIcon className="w-4 h-4" />
            {selectedCountries.length} {isPortuguese ? 'países selecionados' : 'countries selected'}
          </div>
        </motion.div>
      )}
    </div>
  );
}