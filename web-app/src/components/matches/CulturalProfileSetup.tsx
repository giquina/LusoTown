'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  MapPin, 
  Heart, 
  Languages, 
  CheckCircle, 
  ArrowRight,
  ArrowLeft,
  Globe
} from 'lucide-react';
import { 
  CULTURAL_INTEREST_CATEGORIES,
  LANGUAGE_PROFICIENCY_LEVELS,
  CULTURAL_VALUES,
  UK_PORTUGUESE_COMMUNITIES,
  validateCulturalProfile,
  getCulturalInterestById
} from '@/config/cultural-preferences';
import { PORTUGUESE_SPEAKING_COUNTRIES } from '@/config/portuguese-countries';
import { SafeMatchingProfile } from '@/lib/cultural-matching';

interface CulturalProfileSetupProps {
  onComplete: (profile: Partial<SafeMatchingProfile>) => void;
  onClose: () => void;
  initialProfile?: Partial<SafeMatchingProfile>;
  className?: string;
}

interface FormData {
  name: string;
  age: number;
  bio: string;
  location: {
    city: string;
    area?: string;
    latitude: number;
    longitude: number;
  };
  culturalBackground: string[];
  interests: string[];
  languageSkills: {
    portuguese: 'native' | 'fluent' | 'intermediate' | 'beginner';
    english: 'native' | 'fluent' | 'intermediate' | 'beginner';
  };
  culturalValues: string[];
}

export default function CulturalProfileSetup({
  onComplete,
  onClose,
  initialProfile,
  className = ''
}: CulturalProfileSetupProps) {
  const { t, language } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: initialProfile?.name || '',
    age: initialProfile?.age || 18,
    bio: initialProfile?.bio || '',
    location: initialProfile?.location || {
      city: 'London',
      latitude: 51.5074,
      longitude: -0.1278
    },
    culturalBackground: [],
    interests: initialProfile?.interests || [],
    languageSkills: {
      portuguese: 'intermediate',
      english: 'fluent'
    },
    culturalValues: []
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [isValidating, setIsValidating] = useState(false);

  const steps = [
    { id: 'basic', icon: User, titleEn: 'Basic Information', titlePt: 'Informação Básica' },
    { id: 'location', icon: MapPin, titleEn: 'Location', titlePt: 'Localização' },
    { id: 'heritage', icon: Globe, titleEn: 'Cultural Heritage', titlePt: 'Herança Cultural' },
    { id: 'interests', icon: Heart, titleEn: 'Cultural Interests', titlePt: 'Interesses Culturais' },
    { id: 'language', icon: Languages, titleEn: 'Languages', titlePt: 'Idiomas' },
    { id: 'values', icon: CheckCircle, titleEn: 'Values', titlePt: 'Valores' }
  ];

  const translations = {
    en: {
      title: 'Set Up Your Cultural Profile',
      subtitle: 'Help us find your perfect Portuguese-speaking community matches',
      basicInfo: {
        name: 'Display Name',
        nameHelp: 'This is how others will see you',
        age: 'Age',
        bio: 'About Me',
        bioPlaceholder: 'Tell us about yourself, your connection to Portuguese culture, and what you\'re looking for in our community...',
        bioHelp: 'Minimum 20 characters. Share your cultural background and interests.'
      },
      location: {
        title: 'Where are you located?',
        subtitle: 'We\'ll connect you with people nearby in the Portuguese-speaking community',
        city: 'City',
        area: 'Area/Neighborhood (Optional)',
        selectCity: 'Select your city',
        selectArea: 'Select area'
      },
      heritage: {
        title: 'Your Portuguese-speaking Heritage',
        subtitle: 'Select the countries that represent your cultural background',
        help: 'You can select multiple countries if you have mixed heritage'
      },
      interests: {
        title: 'Cultural Interests',
        subtitle: 'What aspects of Portuguese culture interest you most?',
        help: 'Select up to 8 interests that best represent you'
      },
      language: {
        title: 'Language Skills',
        subtitle: 'Help us match you with people at similar language levels',
        portuguese: 'Portuguese Level',
        english: 'English Level'
      },
      values: {
        title: 'Cultural Values',
        subtitle: 'What Portuguese cultural values are important to you?',
        help: 'Select the values that resonate most with you (optional)'
      },
      buttons: {
        next: 'Next Step',
        previous: 'Previous',
        complete: 'Complete Profile',
        skip: 'Skip This Step'
      },
      validation: {
        nameRequired: 'Name is required',
        ageRequired: 'Age must be between 18 and 100',
        bioRequired: 'Please tell us about yourself (minimum 20 characters)',
        locationRequired: 'Location is required',
        heritageRequired: 'Please select at least one cultural background',
        interestsRequired: 'Please select at least 2 cultural interests',
        languageRequired: 'Language proficiency is required'
      },
      success: 'Profile setup complete! Ready to find your Portuguese community matches.'
    },
    pt: {
      title: 'Configure o Seu Perfil Cultural',
      subtitle: 'Ajude-nos a encontrar os seus matches perfeitos na comunidade lusófona',
      basicInfo: {
        name: 'Nome de Exibição',
        nameHelp: 'É assim que os outros o verão',
        age: 'Idade',
        bio: 'Sobre Mim',
        bioPlaceholder: 'Fale-nos sobre si, a sua ligação à cultura portuguesa, e o que procura na nossa comunidade...',
        bioHelp: 'Mínimo 20 caracteres. Partilhe a sua origem cultural e interesses.'
      },
      location: {
        title: 'Onde está localizado?',
        subtitle: 'Vamos conectá-lo com pessoas próximas na comunidade lusófona',
        city: 'Cidade',
        area: 'Área/Bairro (Opcional)',
        selectCity: 'Selecione a sua cidade',
        selectArea: 'Selecione a área'
      },
      heritage: {
        title: 'A Sua Herança Lusófona',
        subtitle: 'Selecione os países que representam a sua origem cultural',
        help: 'Pode selecionar vários países se tiver herança mista'
      },
      interests: {
        title: 'Interesses Culturais',
        subtitle: 'Que aspetos da cultura portuguesa mais lhe interessam?',
        help: 'Selecione até 8 interesses que melhor o representam'
      },
      language: {
        title: 'Competências Linguísticas',
        subtitle: 'Ajude-nos a conectá-lo com pessoas com níveis similares',
        portuguese: 'Nível de Português',
        english: 'Nível de Inglês'
      },
      values: {
        title: 'Valores Culturais',
        subtitle: 'Que valores da cultura portuguesa são importantes para si?',
        help: 'Selecione os valores que mais ressoam consigo (opcional)'
      },
      buttons: {
        next: 'Próximo Passo',
        previous: 'Anterior',
        complete: 'Completar Perfil',
        skip: 'Saltar Este Passo'
      },
      validation: {
        nameRequired: 'Nome é obrigatório',
        ageRequired: 'Idade deve estar entre 18 e 100',
        bioRequired: 'Por favor, fale-nos sobre si (mínimo 20 caracteres)',
        locationRequired: 'Localização é obrigatória',
        heritageRequired: 'Por favor, selecione pelo menos uma origem cultural',
        interestsRequired: 'Por favor, selecione pelo menos 2 interesses culturais',
        languageRequired: 'Proficiência linguística é obrigatória'
      },
      success: 'Configuração do perfil completa! Pronto para encontrar os seus matches na comunidade portuguesa.'
    }
  };

  const tr = translations[language];

  const validateCurrentStep = (): boolean => {
    const newErrors: string[] = [];

    switch (steps[currentStep].id) {
      case 'basic':
        if (!formData.name.trim()) newErrors.push(tr.validation.nameRequired);
        if (formData.age < 18 || formData.age > 100) newErrors.push(tr.validation.ageRequired);
        if (formData.bio.length < 20) newErrors.push(tr.validation.bioRequired);
        break;
      case 'location':
        if (!formData.location.city) newErrors.push(tr.validation.locationRequired);
        break;
      case 'heritage':
        if (formData.culturalBackground.length === 0) newErrors.push(tr.validation.heritageRequired);
        break;
      case 'interests':
        if (formData.interests.length < 2) newErrors.push(tr.validation.interestsRequired);
        break;
      case 'language':
        if (!formData.languageSkills.portuguese || !formData.languageSkills.english) {
          newErrors.push(tr.validation.languageRequired);
        }
        break;
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        handleComplete();
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    setIsValidating(true);
    
    try {
      // Validate complete profile
      const profileValidation = validateCulturalProfile({
        ...formData,
        culturalBackground: formData.culturalBackground,
        interests: formData.interests
      });
      
      if (profileValidation.length > 0) {
        setErrors(profileValidation);
        setIsValidating(false);
        return;
      }

      // Create matching profile
      const profile: Partial<SafeMatchingProfile> = {
        name: formData.name,
        age: formData.age,
        bio: formData.bio,
        location: {
          city: formData.location.city,
          latitude: formData.location.latitude,
          longitude: formData.location.longitude,
          postcode: formData.location.area
        },
        interests: formData.interests,
        culturalBackground: formData.culturalBackground,
        languageSkills: formData.languageSkills,
        isVerified: false,
        lastActive: new Date(),
        safetyScore: 7 // Default safety score
      };

      onComplete(profile);
    } catch (error) {
      console.error('Profile completion error:', error);
      setErrors(['Failed to complete profile setup']);
    } finally {
      setIsValidating(false);
    }
  };

  const renderBasicStep = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {tr.basicInfo.name}
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Your display name"
        />
        <p className="text-sm text-gray-500 mt-1">{tr.basicInfo.nameHelp}</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {tr.basicInfo.age}
        </label>
        <input
          type="number"
          min="18"
          max="100"
          value={formData.age}
          onChange={(e) => setFormData({...formData, age: parseInt(e.target.value) || 18})}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {tr.basicInfo.bio}
        </label>
        <textarea
          value={formData.bio}
          onChange={(e) => setFormData({...formData, bio: e.target.value})}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          rows={4}
          placeholder={tr.basicInfo.bioPlaceholder}
        />
        <p className="text-sm text-gray-500 mt-1">
          {tr.basicInfo.bioHelp} ({formData.bio.length}/500)
        </p>
      </div>
    </div>
  );

  const renderLocationStep = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {tr.location.city}
        </label>
        <select
          value={formData.location.city}
          onChange={(e) => {
            const selectedCity = UK_PORTUGUESE_COMMUNITIES.find(c => c.city === e.target.value);
            if (selectedCity) {
              setFormData({
                ...formData,
                location: {
                  ...formData.location,
                  city: selectedCity.city,
                  latitude: selectedCity.coordinates[0],
                  longitude: selectedCity.coordinates[1]
                }
              });
            }
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="">{tr.location.selectCity}</option>
          {UK_PORTUGUESE_COMMUNITIES.map(city => (
            <option key={city.city} value={city.city}>
              {city.city} ({city.population.toLocaleString()} Portuguese speakers)
            </option>
          ))}
        </select>
      </div>

      {formData.location.city && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {tr.location.area}
          </label>
          <select
            value={formData.location.area || ''}
            onChange={(e) => setFormData({
              ...formData,
              location: {
                ...formData.location,
                area: e.target.value
              }
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">{tr.location.selectArea}</option>
            {UK_PORTUGUESE_COMMUNITIES.find(c => c.city === formData.location.city)?.areas.map(area => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );

  const renderHeritageStep = () => (
    <div className="space-y-6">
      <p className="text-sm text-gray-600">{tr.heritage.help}</p>
      <div className="grid grid-cols-2 gap-3">
        {PORTUGUESE_SPEAKING_COUNTRIES.map(country => (
          <button
            key={country.code}
            onClick={() => {
              const isSelected = formData.culturalBackground.includes(country.code);
              setFormData({
                ...formData,
                culturalBackground: isSelected
                  ? formData.culturalBackground.filter(c => c !== country.code)
                  : [...formData.culturalBackground, country.code]
              });
            }}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              formData.culturalBackground.includes(country.code)
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{country.flag}</span>
              <div>
                <div className="font-medium">
                  {language === 'pt' ? country.namePortuguese : country.name}
                </div>
                {country.diasporaSize && (
                  <div className="text-xs text-gray-500">
                    UK: {country.diasporaSize}
                  </div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderInterestsStep = () => (
    <div className="space-y-6">
      <p className="text-sm text-gray-600">
        {tr.interests.help} ({formData.interests.length}/8)
      </p>
      {CULTURAL_INTEREST_CATEGORIES.map(category => (
        <div key={category.id} className="border rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-xl">{category.icon}</span>
            <h3 className="font-medium">
              {language === 'pt' ? category.namePt : category.nameEn}
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {category.interests.map(interest => (
              <button
                key={interest.id}
                onClick={() => {
                  const isSelected = formData.interests.includes(interest.id);
                  if (isSelected) {
                    setFormData({
                      ...formData,
                      interests: formData.interests.filter(i => i !== interest.id)
                    });
                  } else if (formData.interests.length < 8) {
                    setFormData({
                      ...formData,
                      interests: [...formData.interests, interest.id]
                    });
                  }
                }}
                disabled={!formData.interests.includes(interest.id) && formData.interests.length >= 8}
                className={`p-2 rounded-lg border text-sm transition-all text-left ${
                  formData.interests.includes(interest.id)
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300 disabled:opacity-50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  {interest.emoji && <span>{interest.emoji}</span>}
                  <span>{language === 'pt' ? interest.namePt : interest.nameEn}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderLanguageStep = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {tr.language.portuguese}
        </label>
        <div className="space-y-2">
          {LANGUAGE_PROFICIENCY_LEVELS.map(level => (
            <button
              key={level.level}
              onClick={() => setFormData({
                ...formData,
                languageSkills: {
                  ...formData.languageSkills,
                  portuguese: level.level
                }
              })}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                formData.languageSkills.portuguese === level.level
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-medium">
                {language === 'pt' ? level.namePt : level.nameEn}
              </div>
              <div className="text-sm text-gray-600">
                {language === 'pt' ? level.descriptionPt : level.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {tr.language.english}
        </label>
        <div className="space-y-2">
          {LANGUAGE_PROFICIENCY_LEVELS.map(level => (
            <button
              key={level.level}
              onClick={() => setFormData({
                ...formData,
                languageSkills: {
                  ...formData.languageSkills,
                  english: level.level
                }
              })}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                formData.languageSkills.english === level.level
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-medium">
                {language === 'pt' ? level.namePt : level.nameEn}
              </div>
              <div className="text-sm text-gray-600">
                {language === 'pt' ? level.descriptionPt : level.description}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderValuesStep = () => (
    <div className="space-y-6">
      <p className="text-sm text-gray-600">{tr.values.help}</p>
      <div className="grid grid-cols-1 gap-3">
        {CULTURAL_VALUES.map(value => (
          <button
            key={value.id}
            onClick={() => {
              const isSelected = formData.culturalValues.includes(value.id);
              setFormData({
                ...formData,
                culturalValues: isSelected
                  ? formData.culturalValues.filter(v => v !== value.id)
                  : [...formData.culturalValues, value.id]
              });
            }}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              formData.culturalValues.includes(value.id)
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

  const renderCurrentStep = () => {
    switch (steps[currentStep].id) {
      case 'basic': return renderBasicStep();
      case 'location': return renderLocationStep();
      case 'heritage': return renderHeritageStep();
      case 'interests': return renderInterestsStep();
      case 'language': return renderLanguageStep();
      case 'values': return renderValuesStep();
      default: return null;
    }
  };

  return (
    <div className={`max-w-2xl mx-auto bg-white ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {tr.title}
        </h2>
        <p className="text-gray-600">{tr.subtitle}</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8 space-x-2">
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
              <div className={`w-8 h-0.5 mx-2 ${
                index < currentStep ? 'bg-primary-500' : 'bg-gray-300'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Title */}
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          {language === 'pt' ? steps[currentStep].titlePt : steps[currentStep].titleEn}
        </h3>
      </div>

      {/* Errors */}
      {errors.length > 0 && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <ul className="list-disc list-inside space-y-1">
            {errors.map((error, index) => (
              <li key={index} className="text-red-700 text-sm">{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Step Content */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        {renderCurrentStep()}
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6 border-t">
        <button
          onClick={currentStep === 0 ? onClose : handlePrevious}
          className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{currentStep === 0 ? 'Close' : tr.buttons.previous}</span>
        </button>

        <div className="flex items-center space-x-3">
          {currentStep === steps.length - 1 && (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              {tr.buttons.skip}
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={isValidating}
            className="flex items-center space-x-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span>
              {currentStep === steps.length - 1 ? tr.buttons.complete : tr.buttons.next}
            </span>
            {!isValidating && <ArrowRight className="w-4 h-4" />}
            {isValidating && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}