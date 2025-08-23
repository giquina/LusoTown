'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/context/LanguageContext';
import {
  PORTUGUESE_SPEAKING_COUNTRIES,
  PRIMARY_COUNTRIES,
  SECONDARY_COUNTRIES,
  DEFAULT_COUNTRY_PREFERENCES,
  getCountryByCode,
  type PortugueseCountry
} from '@/config/portuguese-countries';

interface CountryPreferencesProps {
  selectedCountries: string[];
  onCountryChange: (countries: string[]) => void;
  maxSelections?: number;
  showDiasporaInfo?: boolean;
  className?: string;
}

export default function CountryPreferences({
  selectedCountries,
  onCountryChange,
  maxSelections = 9, // Allow selecting all countries
  showDiasporaInfo = true,
  className = ''
}: CountryPreferencesProps) {
  const { language } = useLanguage();
  const [showSecondary, setShowSecondary] = useState(false);
  const isPortuguese = language === 'pt';

  const handleCountryToggle = (countryCode: string) => {
    const isSelected = selectedCountries.includes(countryCode);
    
    if (isSelected) {
      // Remove country
      onCountryChange(selectedCountries.filter(code => code !== countryCode));
    } else {
      // Add country if under limit
      if (selectedCountries.length < maxSelections) {
        onCountryChange([...selectedCountries, countryCode]);
      }
    }
  };

  const handleSelectAll = () => {
    const allCodes = PORTUGUESE_SPEAKING_COUNTRIES.map(country => country.code);
    onCountryChange(allCodes);
  };

  const handleSelectDefaults = () => {
    onCountryChange(DEFAULT_COUNTRY_PREFERENCES);
  };

  const handleClearAll = () => {
    onCountryChange([]);
  };

  const CountryCard = ({ country }: { country: PortugueseCountry }) => {
    const isSelected = selectedCountries.includes(country.code);
    const isAtLimit = selectedCountries.length >= maxSelections && !isSelected;

    return (
      <motion.button
        whileHover={{ scale: isAtLimit ? 1 : 1.02 }}
        whileTap={{ scale: isAtLimit ? 1 : 0.98 }}
        onClick={() => !isAtLimit && handleCountryToggle(country.code)}
        disabled={isAtLimit}
        className={`
          relative p-4 rounded-xl border-2 transition-all duration-300 text-left w-full
          ${isSelected 
            ? 'border-primary-500 bg-primary-50 shadow-lg' 
            : isAtLimit
              ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
              : 'border-gray-200 bg-white hover:border-primary-300 hover:shadow-md'
          }
        `}
      >
        {/* Selection indicator */}
        <div className={`
          absolute top-3 right-3 w-6 h-6 rounded-full border-2 flex items-center justify-center
          ${isSelected 
            ? 'border-primary-500 bg-primary-500' 
            : 'border-gray-300 bg-white'
          }
        `}>
          {isSelected && <CheckIcon className="w-4 h-4 text-white" />}
        </div>

        {/* Country info */}
        <div className="flex items-start gap-3 pr-8">
          <span className="text-2xl">{country.flag}</span>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-900 text-sm">
              {isPortuguese ? country.namePortuguese : country.name}
            </h4>
            <p className="text-xs text-gray-600 mt-1">
              {country.continent} • {(country.population / 1_000_000).toFixed(1)}M {isPortuguese ? 'pessoas' : 'people'}
            </p>
            {showDiasporaInfo && country.diasporaSize && (
              <p className="text-xs text-primary-600 mt-1">
                {country.diasporaSize} {isPortuguese ? 'no Reino Unido' : 'in United Kingdom'}
              </p>
            )}
          </div>
        </div>
      </motion.button>
    );
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {isPortuguese 
            ? 'Preferências de País' 
            : 'Country Preferences'
          }
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          {isPortuguese 
            ? `Escolha os países de língua portuguesa com os quais gostaria de ser compatível. Pode selecionar até ${maxSelections} países.`
            : `Choose Portuguese-speaking countries you'd like to be matched with. You can select up to ${maxSelections} countries.`
          }
        </p>
        
        {/* Quick actions */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={handleSelectDefaults}
            className="px-3 py-1 text-xs bg-primary-100 text-primary-700 rounded-full hover:bg-primary-200 transition-colors"
          >
            {isPortuguese ? 'Padrão (PT + BR)' : 'Default (PT + BR)'}
          </button>
          <button
            onClick={handleSelectAll}
            className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
          >
            {isPortuguese ? 'Todos os países' : 'All countries'}
          </button>
          <button
            onClick={handleClearAll}
            className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
          >
            {isPortuguese ? 'Limpar' : 'Clear all'}
          </button>
        </div>

        {/* Selection counter */}
        <p className="text-sm text-gray-500">
          {selectedCountries.length} {isPortuguese ? 'de' : 'of'} {maxSelections} {isPortuguese ? 'selecionados' : 'selected'}
        </p>
      </div>

      {/* Primary countries */}
      <div>
        <h4 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
          {isPortuguese ? 'Países Principais' : 'Primary Countries'}
          <span className="text-sm text-gray-500">
            ({isPortuguese ? 'maiores diásporas' : 'largest diaspora'})
          </span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PRIMARY_COUNTRIES.map((country) => (
            <CountryCard key={country.code} country={country} />
          ))}
        </div>
      </div>

      {/* Secondary countries toggle */}
      <div>
        <button
          onClick={() => setShowSecondary(!showSecondary)}
          className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
        >
          <ChevronDownIcon className={`w-4 h-4 transition-transform ${showSecondary ? 'rotate-180' : ''}`} />
          {isPortuguese ? 'Outros Países de Língua Portuguesa' : 'Other Portuguese-Speaking Countries'}
          <span className="text-gray-500">({SECONDARY_COUNTRIES.length})</span>
        </button>

        {/* Secondary countries */}
        {showSecondary && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {SECONDARY_COUNTRIES.map((country) => (
                <CountryCard key={country.code} country={country} />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Selected countries preview */}
      {selectedCountries.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h5 className="text-sm font-medium text-gray-800 mb-2">
            {isPortuguese ? 'Países Selecionados:' : 'Selected Countries:'}
          </h5>
          <div className="flex flex-wrap gap-2">
            {selectedCountries.map((code) => {
              const country = getCountryByCode(code);
              if (!country) return null;
              
              return (
                <span
                  key={code}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full"
                >
                  <span>{country.flag}</span>
                  <span>{isPortuguese ? country.namePortuguese : country.name}</span>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}