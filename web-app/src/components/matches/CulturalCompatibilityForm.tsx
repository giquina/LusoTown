'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { 
  Heart,
  MapPin,
  Users,
  Globe,
  Music,
  Utensils,
  Calendar,
  GraduationCap,
  Briefcase,
  Star,
  CheckCircle,
  X,
  ArrowRight,
  ArrowLeft,
  Languages,
  Shield
} from 'lucide-react';

// Import configurations
import { PORTUGUESE_SPEAKING_COUNTRIES } from '@/config/portuguese-countries';
import { CULTURAL_INTEREST_CATEGORIES } from '@/config/cultural-preferences';
import { UK_PORTUGUESE_COMMUNITIES } from '@/config/cultural-preferences';
import { CULTURAL_VALUES } from '@/config/cultural-preferences';

interface CulturalPreferences {
  ageRange: [number, number];
  maxDistance: number;
  preferredCountries: string[];
  mustHaveInterests: string[];
  preferredInterests: string[];
  languagePreference: 'portuguese' | 'bilingual' | 'english' | 'any';
  culturalValues: string[];
  verifiedOnly: boolean;
  professionalInterests: boolean;
  familyOriented: boolean;
  recentImmigrant: boolean;
  longTermResident: boolean;
}

interface CulturalCompatibilityFormProps {
  onComplete: (preferences: CulturalPreferences) => void;
  onClose: () => void;
  initialPreferences?: Partial<CulturalPreferences>;
  className?: string;
}

export default function CulturalCompatibilityForm({
  onComplete,
  onClose,
  initialPreferences,
  className = ''
}: CulturalCompatibilityFormProps) {
  const { t, language } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState<CulturalPreferences>({
    ageRange: [25, 45],
    maxDistance: 25,
    preferredCountries: ['PT', 'BR'],
    mustHaveInterests: [],
    preferredInterests: [],
    languagePreference: 'bilingual',
    culturalValues: [],
    verifiedOnly: false,
    professionalInterests: false,
    familyOriented: false,
    recentImmigrant: false,
    longTermResident: false,
    ...initialPreferences
  });

  const translations = {
    en: {
      title: 'Cultural Matching Preferences',
      subtitle: 'Help us find your perfect Portuguese community matches',
      steps: {
        basics: 'Basic Preferences',
        heritage: 'Cultural Heritage',
        interests: 'Shared Interests',
        values: 'Cultural Values',
        lifestyle: 'Lifestyle Match'
      },
      basics: {
        ageRange: 'Preferred Age Range',
        ageFrom: 'From',
        ageTo: 'To',
        distance: 'Maximum Distance',
        distanceDesc: 'How far are you willing to travel to meet?',
        language: 'Language Preference',
        languageDesc: 'What language would you prefer to communicate in?',
        languagePortuguese: 'Mainly Portuguese',
        languageBilingual: 'Portuguese & English equally',
        languageEnglish: 'Mainly English', 
        languageAny: 'Any language is fine',
        verified: 'Verified Members Only',
        verifiedDesc: 'Only show profiles verified by our Portuguese community moderators'
      },
      heritage: {
        title: 'Cultural Heritage Preferences',
        desc: 'Which Portuguese-speaking backgrounds would you like to connect with?',
        primary: 'Primary Countries (large UK communities)',
        secondary: 'Other Portuguese-speaking Countries',
        all: 'Open to all Portuguese-speaking backgrounds'
      },
      interests: {
        title: 'Cultural Interest Matching',
        desc: 'Select interests that are important to you in a match',
        mustHave: 'Must-Have Interests',
        mustHaveDesc: 'These interests are essential - matches must share at least one',
        preferred: 'Nice-to-Have Interests',
        preferredDesc: 'These interests would be a bonus but not essential'
      },
      values: {
        title: 'Portuguese Cultural Values',
        desc: 'Which traditional Portuguese values are important to you?',
        help: 'Select values that you want to see reflected in your matches'
      },
      lifestyle: {
        title: 'Lifestyle Compatibility',
        desc: 'Help us understand what type of person you\'re looking to connect with',
        professional: 'Professional/Business Interests',
        professionalDesc: 'Looking for networking and career opportunities',
        family: 'Family-Oriented',
        familyDesc: 'Values family time and traditional family structures',
        recent: 'Recent Immigrant (last 5 years)',
        recentDesc: 'Connects with people who recently moved to the UK',
        longterm: 'Long-term UK Resident',
        longtermDesc: 'Prefers established community members'
      },
      buttons: {
        next: 'Next Step',
        previous: 'Previous',
        complete: 'Save Preferences',
        skip: 'Skip This Step',
        cancel: 'Cancel'
      }
    },
    pt: {
      title: 'Preferências de Matching Cultural',
      subtitle: 'Ajude-nos a encontrar os seus matches perfeitos na comunidade portuguesa',
      steps: {
        basics: 'Preferências Básicas',
        heritage: 'Herança Cultural',
        interests: 'Interesses Partilhados',
        values: 'Valores Culturais',
        lifestyle: 'Estilo de Vida'
      },
      basics: {
        ageRange: 'Faixa Etária Preferida',
        ageFrom: 'De',
        ageTo: 'Até',
        distance: 'Distância Máxima',
        distanceDesc: 'Que distância está disposto a viajar para se encontrar?',
        language: 'Preferência de Idioma',
        languageDesc: 'Em que idioma prefere comunicar?',
        languagePortuguese: 'Principalmente Português',
        languageBilingual: 'Português e Inglês igualmente',
        languageEnglish: 'Principalmente Inglês',
        languageAny: 'Qualquer idioma serve',
        verified: 'Apenas Membros Verificados',
        verifiedDesc: 'Mostrar apenas perfis verificados pelos nossos moderadores da comunidade portuguesa'
      },
      heritage: {
        title: 'Preferências de Herança Cultural',
        desc: 'Com que origens lusófonas gostaria de se conectar?',
        primary: 'Países Principais (grandes comunidades no Reino Unido)',
        secondary: 'Outros Países Lusófonos',
        all: 'Aberto a todas as origens lusófonas'
      },
      interests: {
        title: 'Compatibilidade de Interesses Culturais',
        desc: 'Selecione interesses que são importantes num match',
        mustHave: 'Interesses Essenciais',
        mustHaveDesc: 'Estes interesses são essenciais - matches devem partilhar pelo menos um',
        preferred: 'Interesses Desejáveis',
        preferredDesc: 'Estes interesses seriam um bónus mas não essenciais'
      },
      values: {
        title: 'Valores Culturais Portugueses',
        desc: 'Que valores tradicionais portugueses são importantes para si?',
        help: 'Selecione valores que quer ver refletidos nos seus matches'
      },
      lifestyle: {
        title: 'Compatibilidade de Estilo de Vida',
        desc: 'Ajude-nos a perceber com que tipo de pessoa se quer conectar',
        professional: 'Interesses Profissionais/Empresariais',
        professionalDesc: 'Procura networking e oportunidades de carreira',
        family: 'Orientado para a Família',
        familyDesc: 'Valoriza o tempo em família e estruturas familiares tradicionais',
        recent: 'Imigrante Recente (últimos 5 anos)',
        recentDesc: 'Conecta-se com pessoas que se mudaram recentemente para o Reino Unido',
        longterm: 'Residente de Longa Data no Reino Unido',
        longtermDesc: 'Prefere membros estabelecidos da comunidade'
      },
      buttons: {
        next: 'Próximo Passo',
        previous: 'Anterior',
        complete: 'Guardar Preferências',
        skip: 'Saltar Este Passo',
        cancel: 'Cancelar'
      }
    }
  };

  const tr = translations[language];
  const steps = [
    { id: 'basics', icon: Users, title: tr.steps.basics },
    { id: 'heritage', icon: Globe, title: tr.steps.heritage },
    { id: 'interests', icon: Heart, title: tr.steps.interests },
    { id: 'values', icon: Star, title: tr.steps.values },
    { id: 'lifestyle', icon: CheckCircle, title: tr.steps.lifestyle }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(preferences);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderBasicsStep = () => (
    <div className="space-y-6">
      {/* Age Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {tr.basics.ageRange}
        </label>
        <div className="flex items-center space-x-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">{tr.basics.ageFrom}</label>
            <input
              type="number"
              min="18"
              max="100"
              value={preferences.ageRange[0]}
              onChange={(e) => setPreferences({
                ...preferences,
                ageRange: [parseInt(e.target.value) || 18, preferences.ageRange[1]]
              })}
              className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">{tr.basics.ageTo}</label>
            <input
              type="number"
              min="18"
              max="100"
              value={preferences.ageRange[1]}
              onChange={(e) => setPreferences({
                ...preferences,
                ageRange: [preferences.ageRange[0], parseInt(e.target.value) || 65]
              })}
              className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Distance */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {tr.basics.distance}: {preferences.maxDistance}km
        </label>
        <p className="text-sm text-gray-500 mb-3">{tr.basics.distanceDesc}</p>
        <input
          type="range"
          min="5"
          max="100"
          value={preferences.maxDistance}
          onChange={(e) => setPreferences({
            ...preferences,
            maxDistance: parseInt(e.target.value)
          })}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>5km</span>
          <span>50km</span>
          <span>100km</span>
        </div>
      </div>

      {/* Language Preference */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {tr.basics.language}
        </label>
        <p className="text-sm text-gray-500 mb-3">{tr.basics.languageDesc}</p>
        <div className="space-y-2">
          {[
            { value: 'portuguese', label: tr.basics.languagePortuguese, icon: '🇵🇹' },
            { value: 'bilingual', label: tr.basics.languageBilingual, icon: '🌍' },
            { value: 'english', label: tr.basics.languageEnglish, icon: '🇬🇧' },
            { value: 'any', label: tr.basics.languageAny, icon: '💬' }
          ].map(option => (
            <button
              key={option.value}
              onClick={() => setPreferences({
                ...preferences,
                languagePreference: option.value as any
              })}
              className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                preferences.languagePreference === option.value
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">{option.icon}</span>
                <span className="font-medium">{option.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Verified Only */}
      <div>
        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={preferences.verifiedOnly}
            onChange={(e) => setPreferences({
              ...preferences,
              verifiedOnly: e.target.checked
            })}
            className="mt-1 h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <div>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-primary-600" />
              <span className="font-medium text-gray-900">{tr.basics.verified}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">{tr.basics.verifiedDesc}</p>
          </div>
        </label>
      </div>
    </div>
  );

  const renderHeritageStep = () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-gray-600 mb-4">{tr.heritage.desc}</p>
        
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">{tr.heritage.primary}</h4>
          <div className="grid grid-cols-2 gap-3">
            {PORTUGUESE_SPEAKING_COUNTRIES.filter(c => c.isPrimary).map(country => (
              <button
                key={country.code}
                onClick={() => {
                  const isSelected = preferences.preferredCountries.includes(country.code);
                  setPreferences({
                    ...preferences,
                    preferredCountries: isSelected
                      ? preferences.preferredCountries.filter(c => c !== country.code)
                      : [...preferences.preferredCountries, country.code]
                  });
                }}
                className={`p-3 rounded-lg border-2 text-left transition-all ${
                  preferences.preferredCountries.includes(country.code)
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{country.flag}</span>
                  <div>
                    <div className="font-medium">
                      {language === 'pt' ? country.namePortuguese : country.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      UK: {country.diasporaSize}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-3">{tr.heritage.secondary}</h4>
          <div className="grid grid-cols-2 gap-3">
            {PORTUGUESE_SPEAKING_COUNTRIES.filter(c => !c.isPrimary).map(country => (
              <button
                key={country.code}
                onClick={() => {
                  const isSelected = preferences.preferredCountries.includes(country.code);
                  setPreferences({
                    ...preferences,
                    preferredCountries: isSelected
                      ? preferences.preferredCountries.filter(c => c !== country.code)
                      : [...preferences.preferredCountries, country.code]
                  });
                }}
                className={`p-3 rounded-lg border-2 text-left transition-all ${
                  preferences.preferredCountries.includes(country.code)
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{country.flag}</span>
                  <div>
                    <div className="font-medium text-sm">
                      {language === 'pt' ? country.namePortuguese : country.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      UK: {country.diasporaSize}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => {
            const allCodes = PORTUGUESE_SPEAKING_COUNTRIES.map(c => c.code);
            const hasAll = allCodes.every(code => preferences.preferredCountries.includes(code));
            setPreferences({
              ...preferences,
              preferredCountries: hasAll ? [] : allCodes
            });
          }}
          className="w-full p-3 mt-4 rounded-lg border-2 border-dashed border-gray-300 text-gray-600 hover:border-primary-300 hover:text-primary-600"
        >
          <Globe className="w-4 h-4 inline-block mr-2" />
          {tr.heritage.all}
        </button>
      </div>
    </div>
  );

  const renderInterestsStep = () => (
    <div className="space-y-6">
      <p className="text-sm text-gray-600">{tr.interests.desc}</p>

      {/* Must-have interests */}
      <div>
        <h4 className="font-medium text-red-900 mb-2">{tr.interests.mustHave}</h4>
        <p className="text-sm text-gray-500 mb-3">{tr.interests.mustHaveDesc}</p>
        <div className="space-y-3">
          {CULTURAL_INTEREST_CATEGORIES.slice(0, 3).map(category => (
            <div key={category.id} className="border rounded-lg p-3">
              <div className="font-medium text-sm mb-2 flex items-center space-x-2">
                <span>{category.icon}</span>
                <span>{language === 'pt' ? category.namePt : category.nameEn}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {category.interests.slice(0, 6).map(interest => (
                  <button
                    key={interest.id}
                    onClick={() => {
                      const isSelected = preferences.mustHaveInterests.includes(interest.id);
                      setPreferences({
                        ...preferences,
                        mustHaveInterests: isSelected
                          ? preferences.mustHaveInterests.filter(i => i !== interest.id)
                          : [...preferences.mustHaveInterests, interest.id]
                      });
                    }}
                    className={`p-2 rounded text-xs text-left ${
                      preferences.mustHaveInterests.includes(interest.id)
                        ? 'bg-red-100 text-red-700 border border-red-300'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {interest.emoji} {language === 'pt' ? interest.namePt : interest.nameEn}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preferred interests */}
      <div>
        <h4 className="font-medium text-green-900 mb-2">{tr.interests.preferred}</h4>
        <p className="text-sm text-gray-500 mb-3">{tr.interests.preferredDesc}</p>
        <div className="space-y-3">
          {CULTURAL_INTEREST_CATEGORIES.slice(3).map(category => (
            <div key={category.id} className="border rounded-lg p-3">
              <div className="font-medium text-sm mb-2 flex items-center space-x-2">
                <span>{category.icon}</span>
                <span>{language === 'pt' ? category.namePt : category.nameEn}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {category.interests.slice(0, 6).map(interest => (
                  <button
                    key={interest.id}
                    onClick={() => {
                      const isSelected = preferences.preferredInterests.includes(interest.id);
                      setPreferences({
                        ...preferences,
                        preferredInterests: isSelected
                          ? preferences.preferredInterests.filter(i => i !== interest.id)
                          : [...preferences.preferredInterests, interest.id]
                      });
                    }}
                    className={`p-2 rounded text-xs text-left ${
                      preferences.preferredInterests.includes(interest.id)
                        ? 'bg-green-100 text-green-700 border border-green-300'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {interest.emoji} {language === 'pt' ? interest.namePt : interest.nameEn}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderValuesStep = () => (
    <div className="space-y-6">
      <p className="text-sm text-gray-600">{tr.values.desc}</p>
      <p className="text-sm text-gray-500">{tr.values.help}</p>
      
      <div className="grid grid-cols-1 gap-3">
        {CULTURAL_VALUES.map(value => (
          <button
            key={value.id}
            onClick={() => {
              const isSelected = preferences.culturalValues.includes(value.id);
              setPreferences({
                ...preferences,
                culturalValues: isSelected
                  ? preferences.culturalValues.filter(v => v !== value.id)
                  : [...preferences.culturalValues, value.id]
              });
            }}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              preferences.culturalValues.includes(value.id)
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-xl">{value.emoji}</span>
              <div>
                <div className="font-medium">
                  {language === 'pt' ? value.namePt : value.nameEn}
                </div>
                <div className="text-sm text-gray-600">
                  {language === 'pt' ? value.descriptionPt : value.description}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderLifestyleStep = () => (
    <div className="space-y-6">
      <p className="text-sm text-gray-600">{tr.lifestyle.desc}</p>

      <div className="space-y-4">
        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={preferences.professionalInterests}
            onChange={(e) => setPreferences({
              ...preferences,
              professionalInterests: e.target.checked
            })}
            className="mt-1 h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <div>
            <div className="flex items-center space-x-2">
              <Briefcase className="w-4 h-4 text-primary-600" />
              <span className="font-medium text-gray-900">{tr.lifestyle.professional}</span>
            </div>
            <p className="text-sm text-gray-500">{tr.lifestyle.professionalDesc}</p>
          </div>
        </label>

        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={preferences.familyOriented}
            onChange={(e) => setPreferences({
              ...preferences,
              familyOriented: e.target.checked
            })}
            className="mt-1 h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-primary-600" />
              <span className="font-medium text-gray-900">{tr.lifestyle.family}</span>
            </div>
            <p className="text-sm text-gray-500">{tr.lifestyle.familyDesc}</p>
          </div>
        </label>

        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={preferences.recentImmigrant}
            onChange={(e) => setPreferences({
              ...preferences,
              recentImmigrant: e.target.checked
            })}
            className="mt-1 h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <div>
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-primary-600" />
              <span className="font-medium text-gray-900">{tr.lifestyle.recent}</span>
            </div>
            <p className="text-sm text-gray-500">{tr.lifestyle.recentDesc}</p>
          </div>
        </label>

        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={preferences.longTermResident}
            onChange={(e) => setPreferences({
              ...preferences,
              longTermResident: e.target.checked
            })}
            className="mt-1 h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-primary-600" />
              <span className="font-medium text-gray-900">{tr.lifestyle.longterm}</span>
            </div>
            <p className="text-sm text-gray-500">{tr.lifestyle.longtermDesc}</p>
          </div>
        </label>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (steps[currentStep].id) {
      case 'basics': return renderBasicsStep();
      case 'heritage': return renderHeritageStep();
      case 'interests': return renderInterestsStep();
      case 'values': return renderValuesStep();
      case 'lifestyle': return renderLifestyleStep();
      default: return null;
    }
  };

  return (
    <div className={`max-w-2xl mx-auto bg-white rounded-lg border border-gray-200 ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{tr.title}</h2>
            <p className="text-gray-600">{tr.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                index <= currentStep 
                  ? 'border-primary-500 bg-primary-500 text-white' 
                  : 'border-gray-300 text-gray-400'
              }`}>
                {index < currentStep ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <step.icon className="w-4 h-4" />
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-12 h-0.5 mx-2 ${
                  index < currentStep ? 'bg-primary-500' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-3">
          <h3 className="font-medium text-gray-900">{steps[currentStep].title}</h3>
        </div>
      </div>

      {/* Step Content */}
      <div className="p-6">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderCurrentStep()}
        </motion.div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center p-6 border-t border-gray-200">
        <button
          onClick={currentStep === 0 ? onClose : handlePrevious}
          className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{currentStep === 0 ? tr.buttons.cancel : tr.buttons.previous}</span>
        </button>

        <div className="flex items-center space-x-3">
          {currentStep < steps.length - 1 && (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              {tr.buttons.skip}
            </button>
          )}
          <button
            onClick={handleNext}
            className="flex items-center space-x-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <span>
              {currentStep === steps.length - 1 ? tr.buttons.complete : tr.buttons.next}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}