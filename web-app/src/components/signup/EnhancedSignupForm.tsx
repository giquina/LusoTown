"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { PORTUGUESE_SPEAKING_COUNTRIES, PRIMARY_COUNTRIES } from '@/config/portuguese-countries';
import { 
  CheckIcon, 
  ExclamationCircleIcon, 
  GiftIcon,
  BuildingOffice2Icon,
  HeartIcon,
  MusicalNoteIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

interface EnhancedSignupFormProps {
  formData: any;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  error: string;
  success: string;
  emailError: string;
  passwordStrength: number;
  selectedAudience: 'business' | 'romantic' | 'both' | '';
  onInterestToggle: (interest: string) => void;
  onPrimaryInterestToggle: (interest: string) => void;
}

export function EnhancedSignupForm({
  formData,
  onInputChange,
  onSubmit,
  isSubmitting,
  error,
  success,
  emailError,
  passwordStrength,
  selectedAudience,
  onInterestToggle,
  onPrimaryInterestToggle
}: EnhancedSignupFormProps) {
  const { language, t } = useLanguage();

  // Enhanced interest categories based on selected audience
  const getInterestCategories = () => {
    const baseInterests = [
      { key: 'fado', label: '🎵 Fado', description: 'Traditional Portuguese music' },
      { key: 'food', label: '🍽️ Lusophone Cuisine', description: 'Cooking and food events' },
      { key: 'culture', label: '🏛️ Cultural Events', description: 'Festivals and celebrations' },
      { key: 'dance', label: '💃 Dancing', description: 'Traditional and modern dance' },
      { key: 'language', label: '🗣️ Language Exchange', description: 'Practice Lusophone/English' },
    ];

    const businessInterests = [
      { key: 'business', label: '💼 Business Networking', description: 'Professional connections' },
      { key: 'entrepreneurship', label: '🚀 Entrepreneurship', description: 'Startup ecosystem' },
      { key: 'finance', label: '💰 Finance & Investment', description: 'Financial services' },
      { key: 'technology', label: '💻 Technology', description: 'Tech industry networking' },
      { key: 'consulting', label: '📊 Consulting', description: 'Professional services' },
      { key: 'trade', label: '🌍 International Trade', description: 'Import/export business' }
    ];

    const romanticInterests = [
      { key: 'dating', label: '❤️ Romance', description: 'Finding meaningful relationships' },
      { key: 'kizomba', label: '💃 Kizomba Dancing', description: 'Sensual partner dancing' },
      { key: 'wine-tasting', label: '🍷 Wine Culture', description: 'Portuguese wine appreciation' },
      { key: 'poetry', label: '📝 Poetry & Literature', description: 'Cultural expression' },
      { key: 'travel', label: '✈️ Cultural Travel', description: 'Exploring Portuguese heritage' },
      { key: 'family-traditions', label: '👨‍👩‍👧‍👦 Family Traditions', description: 'Cultural celebrations' }
    ];

    if (selectedAudience === 'business') {
      return { base: baseInterests, specific: businessInterests };
    } else if (selectedAudience === 'romantic') {
      return { base: baseInterests, specific: romanticInterests };
    } else {
      return { base: baseInterests, specific: [...businessInterests, ...romanticInterests] };
    }
  };

  const interests = getInterestCategories();

  return (
    <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-6 sm:p-8 border border-white/50">
      {/* Enhanced Form Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-green-50 rounded-full px-4 py-2 text-green-600 font-medium mb-4 text-sm">
          <CheckIcon className="h-4 w-4" />
          {language === 'pt' ? 'Grátis para Participar' : 'Free to Join'}
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {selectedAudience === 'business' 
            ? (language === 'pt' ? 'Networking Profissional' : 'Professional Networking')
            : selectedAudience === 'romantic'
            ? (language === 'pt' ? 'Conexões Românticas' : 'Romantic Connections')
            : (language === 'pt' ? 'Junte-se Hoje - Grátis' : 'Join Today - FREE')
          }
        </h2>
        
        <p className="text-gray-600 mb-6">
          {selectedAudience === 'business'
            ? (language === 'pt' ? 'Conecte-se com a elite empresarial portuguesa' : 'Connect with Portuguese business elite')
            : selectedAudience === 'romantic'
            ? (language === 'pt' ? 'Encontre alguém que entenda sua alma' : 'Find someone who understands your soul')
            : (language === 'pt' ? 'Acesso gratuito à comunidade • Sem barreiras à participação' : 'Free community access • No barriers to participation')
          }
        </p>

        {/* Audience-specific stats */}
        <div className="flex items-center justify-center gap-6 text-sm text-gray-500 mb-6 flex-wrap">
          {selectedAudience === 'business' ? (
            <>
              <div className="flex items-center gap-1">
                <BuildingOffice2Icon className="h-4 w-4" />
                <span>2,150+ {language === 'pt' ? 'Estudantes' : 'Students'}</span>
              </div>
              <div className="flex items-center gap-1">
                <AcademicCapIcon className="h-4 w-4" />
                <span>8 {language === 'pt' ? 'Universidades' : 'Universities'}</span>
              </div>
            </>
          ) : selectedAudience === 'romantic' ? (
            <>
              <div className="flex items-center gap-1">
                <HeartIcon className="h-4 w-4 text-red-400" />
                <span>{language === 'pt' ? 'Compatibilidade Cultural' : 'Cultural Compatibility'}</span>
              </div>
              <div className="flex items-center gap-1">
                <MusicalNoteIcon className="h-4 w-4 text-purple-400" />
                <span>{language === 'pt' ? 'Eventos Íntimos' : 'Intimate Events'}</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-1">
                <CheckIcon className="h-4 w-4 text-green-400" />
                <span>750+ {language === 'pt' ? 'Membros' : 'Members'}</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Error/Success Messages */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
          <ExclamationCircleIcon className="h-5 w-5 text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
          <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
          <p className="text-sm text-green-700">{success}</p>
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Basic Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
            {language === 'pt' ? 'Informações Básicas' : 'Basic Information'}
          </h3>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'pt' ? 'Primeiro Nome' : 'First Name'}
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={onInputChange}
                disabled={isSubmitting}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent bg-white/90 backdrop-blur-sm disabled:opacity-50"
                placeholder={language === 'pt' ? 'Maria' : 'Maria'}
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'pt' ? 'Email Profissional' : 'Professional Email'}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={onInputChange}
                disabled={isSubmitting}
                required
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent bg-white/90 backdrop-blur-sm disabled:opacity-50 transition-colors ${
                  emailError
                    ? "border-red-300 focus:ring-red-400"
                    : formData.email && !emailError
                    ? "border-green-300 focus:ring-green-400"
                    : "border-gray-300 focus:ring-primary-400"
                }`}
                placeholder="maria@empresa.com"
              />
              {emailError && (
                <p className="mt-1 text-sm text-red-600">{emailError}</p>
              )}
              {formData.email && !emailError && (
                <p className="mt-1 text-sm text-green-600 flex items-center gap-1">
                  <CheckIcon className="h-4 w-4" />
                  {language === 'pt' ? 'Email válido' : 'Valid email'}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Password Section */}
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'pt' ? 'Senha' : 'Password'}
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={onInputChange}
                disabled={isSubmitting}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent bg-white/90 backdrop-blur-sm disabled:opacity-50"
                placeholder={language === 'pt' ? 'Digite uma senha segura' : 'Enter a secure password'}
                minLength={6}
              />
              {formData.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`h-2 flex-1 rounded-full transition-colors ${
                          passwordStrength >= level
                            ? passwordStrength <= 1
                              ? "bg-red-400"
                              : passwordStrength <= 2
                              ? "bg-yellow-400"
                              : passwordStrength <= 3
                              ? "bg-blue-400"
                              : "bg-green-400"
                            : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <p
                    className={`text-xs ${
                      passwordStrength <= 1
                        ? "text-red-600"
                        : passwordStrength <= 2
                        ? "text-yellow-600"
                        : passwordStrength <= 3
                        ? "text-blue-600"
                        : "text-green-600"
                    }`}
                  >
                    {passwordStrength <= 1
                      ? (language === 'pt' ? 'Senha fraca' : 'Weak password')
                      : passwordStrength <= 2
                      ? (language === 'pt' ? 'Senha razoável' : 'Fair password')
                      : passwordStrength <= 3
                      ? (language === 'pt' ? 'Senha boa' : 'Good password')
                      : (language === 'pt' ? 'Senha forte' : 'Strong password')}
                  </p>
                </div>
              )}
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'pt' ? 'Confirmar Senha' : 'Confirm Password'}
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={onInputChange}
                disabled={isSubmitting}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent bg-white/90 backdrop-blur-sm disabled:opacity-50"
                placeholder={language === 'pt' ? 'Confirme sua senha' : 'Confirm your password'}
                minLength={6}
              />
            </div>
          </div>
        </div>

        {/* Cultural Heritage Section */}
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-6 rounded-xl border border-primary-100">
          <h3 className="font-semibold text-gray-900 mb-6 flex items-center gap-2">
            🇵🇹 {language === 'pt' ? 'Sua Herança Cultural' : 'Your Cultural Heritage'}
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="portugueseOrigin" className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'pt' ? 'Origem Portuguesa' : 'Lusophone Origin'}
              </label>
              <select
                id="portugueseOrigin"
                name="portugueseOrigin"
                value={formData.portugueseOrigin}
                onChange={onInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent bg-white/90"
              >
                <option value="">
                  {language === 'pt' ? 'Selecione sua origem (opcional)' : 'Select your origin (optional)'}
                </option>
                {PRIMARY_COUNTRIES.map((country) => (
                  <option key={country.code} value={country.code.toLowerCase()}>
                    {country.flag} {language === 'pt' ? country.namePortuguese : country.name}
                  </option>
                ))}
                <option value="uk-born">
                  🇬🇧 {language === 'pt' ? 'Nascido no Reino Unido com herança portuguesa' : 'UK-born with Portuguese heritage'}
                </option>
              </select>
            </div>

            <div>
              <label htmlFor="ukLocation" className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'pt' ? 'Localização no Reino Unido' : 'UK Location'}
              </label>
              <select
                id="ukLocation"
                name="ukLocation"
                value={formData.ukLocation}
                onChange={onInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent bg-white/90"
              >
                <option value="">
                  {language === 'pt' ? 'Selecione sua área' : 'Select your area'}
                </option>
                <optgroup label={language === 'pt' ? 'Londres (Áreas Portuguesas)' : 'London (Lusophone Areas)'}>
                  <option value="stockwell">🇵🇹 Stockwell</option>
                  <option value="vauxhall">🏛️ Vauxhall</option>
                  <option value="elephant-castle">🐘 Elephant & Castle</option>
                  <option value="bermondsey">🏢 Bermondsey</option>
                  <option value="lambeth">🌉 Lambeth</option>
                </optgroup>
                <optgroup label={language === 'pt' ? 'Outras Cidades' : 'Other Cities'}>
                  <option value="manchester">📍 Manchester</option>
                  <option value="birmingham">📍 Birmingham</option>
                  <option value="leeds">📍 Leeds</option>
                  <option value="liverpool">📍 Liverpool</option>
                  <option value="edinburgh">📍 Edinburgh</option>
                  <option value="glasgow">📍 Glasgow</option>
                </optgroup>
              </select>
            </div>
          </div>

          {/* Enhanced Interest Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              {language === 'pt' ? 'O que te interessa? (Selecione todos que se aplicam)' : 'What interests you? (Select all that apply)'}
            </label>
            
            {/* Base Cultural Interests */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-600 mb-3">
                {language === 'pt' ? '🎭 Interesses Culturais' : '🎭 Cultural Interests'}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {interests.base.map((interest) => (
                  <button
                    key={interest.key}
                    type="button"
                    onClick={() => onInterestToggle(interest.key)}
                    className={`text-left p-3 rounded-lg text-xs transition-all ${
                      formData.interests.includes(interest.key)
                        ? "bg-primary-500 text-white shadow-md transform scale-105"
                        : "bg-white/60 text-gray-700 hover:bg-white border border-gray-200 hover:shadow-sm"
                    }`}
                    title={interest.description}
                  >
                    {interest.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Audience-Specific Interests */}
            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-3">
                {selectedAudience === 'business' 
                  ? (language === 'pt' ? '💼 Interesses Profissionais' : '💼 Professional Interests')
                  : selectedAudience === 'romantic'
                  ? (language === 'pt' ? '❤️ Interesses Românticos' : '❤️ Romantic Interests')
                  : (language === 'pt' ? '⭐ Interesses Especializados' : '⭐ Specialized Interests')
                }
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {interests.specific.map((interest) => (
                  <button
                    key={interest.key}
                    type="button"
                    onClick={() => onPrimaryInterestToggle(interest.key)}
                    className={`text-left p-3 rounded-lg text-xs transition-all ${
                      formData.primaryInterests?.includes(interest.key)
                        ? "bg-secondary-500 text-white shadow-md transform scale-105"
                        : "bg-white/60 text-gray-700 hover:bg-white border border-gray-200 hover:shadow-sm"
                    }`}
                    title={interest.description}
                  >
                    {interest.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Referral Code */}
        <div>
          <label htmlFor="referralCode" className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <GiftIcon className="h-4 w-4 text-green-600" />
              {language === 'pt' ? 'Código de Indicação (Opcional)' : 'Referral Code (Optional)'}
            </div>
          </label>
          <input
            type="text"
            id="referralCode"
            name="referralCode"
            value={formData.referralCode}
            onChange={onInputChange}
            disabled={isSubmitting}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent bg-white/90 backdrop-blur-sm disabled:opacity-50 uppercase"
            placeholder={language === 'pt' ? 'Ex: JOÃO1234' : 'e.g., MARIA1234'}
            maxLength={20}
          />
          {formData.referralCode && (
            <p className="mt-1 text-sm text-green-600 flex items-center gap-1">
              <GiftIcon className="h-4 w-4" />
              {language === 'pt' ? 'Ganhe 25% de desconto no primeiro mês!' : 'Get 25% off your first month!'}
            </p>
          )}
        </div>

        {/* Terms and Conditions */}
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <input
              id="ageConfirmation"
              name="ageConfirmation"
              type="checkbox"
              checked={formData.ageConfirmation}
              onChange={onInputChange}
              disabled={isSubmitting}
              required
              className="h-4 w-4 text-primary-400 focus:ring-primary-400 border-gray-300 rounded mt-1 flex-shrink-0 disabled:opacity-50"
            />
            <label htmlFor="ageConfirmation" className="text-sm text-gray-700">
              {language === 'pt' 
                ? 'Concordo em seguir as diretrizes da comunidade e respeitar todos os membros independentemente da idade'
                : 'I agree to follow community guidelines and respect all members regardless of age'
              }
            </label>
          </div>

          <div className="flex items-start space-x-3">
            <input
              id="agreeTerms"
              name="agreeTerms"
              type="checkbox"
              checked={formData.agreeTerms}
              onChange={onInputChange}
              disabled={isSubmitting}
              required
              className="h-4 w-4 text-primary-400 focus:ring-primary-400 border-gray-300 rounded mt-1 flex-shrink-0 disabled:opacity-50"
            />
            <label htmlFor="agreeTerms" className="text-sm text-gray-700">
              {language === 'pt' ? 'Concordo com os ' : 'I agree to LusoTown\'s '}
              <a href="/terms" className="text-primary-400 hover:text-primary-500 underline">
                {language === 'pt' ? 'Termos de Serviço' : 'Terms of Service'}
              </a>
              {', '}
              <a href="/privacy" className="text-primary-400 hover:text-primary-500 underline">
                {language === 'pt' ? 'Política de Privacidade' : 'Privacy Policy'}
              </a>
              {language === 'pt' ? ' e ' : ', and '}
              <a href="/community-guidelines" className="text-primary-400 hover:text-primary-500 underline">
                {language === 'pt' ? 'Diretrizes da Comunidade' : 'Community Guidelines'}
              </a>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting || !!success}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl shadow-2xl hover:shadow-3xl transform transition-all duration-300 cursor-pointer group py-6 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2 text-xl font-black">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              {language === 'pt' ? 'Criando Conta...' : 'Creating Account...'}
            </span>
          ) : success ? (
            <span className="flex items-center justify-center gap-2 text-xl font-black">
              <CheckIcon className="h-6 w-6" />
              {language === 'pt' ? 'Conta Criada!' : 'Account Created!'}
            </span>
          ) : (
            <span className="flex items-center justify-center gap-4 text-xl font-black">
              <span className="text-xl">🇵🇹</span>
              <span>
                {selectedAudience === 'business'
                  ? (language === 'pt' ? 'Entrar na Rede Profissional - GRÁTIS' : 'Join Business Network - FREE')
                  : selectedAudience === 'romantic'
                  ? (language === 'pt' ? 'Encontrar Conexões - GRÁTIS' : 'Find Connections - FREE')
                  : (language === 'pt' ? 'Juntar-se a 750+ Falantes de Português - GRÁTIS' : 'Join Portuguese speakers - FREE')
                }
              </span>
              <span className="text-2xl">→</span>
            </span>
          )}
        </motion.button>
      </form>
    </div>
  );
}

export default EnhancedSignupForm;
