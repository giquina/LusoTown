'use client'

import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  Filter, 
  MapPin, 
  Heart, 
  Briefcase, 
  Globe, 
  Users, 
  Crown,
  Calendar,
  Shield,
  GraduationCap
} from 'lucide-react'

interface MatchFilters {
  ageRange?: [number, number]
  interests?: string[]
  professionalBackground?: string[]
  languagePreference?: 'portuguese' | 'english' | 'both'
  culturalBackground?: 'portugal' | 'brazil' | 'other_lusophone' | 'any'
  relationshipGoal?: 'friendship' | 'professional' | 'cultural_exchange' | 'any'
  familyStatus?: 'single' | 'family' | 'any'
  location?: string
  membershipTier?: 'free' | 'core' | 'premium' | 'business' | 'student'
  verifiedOnly?: boolean
}

interface MatchFiltersProps {
  filters: MatchFilters
  onFiltersChange: (filters: MatchFilters) => void
  hasActiveSubscription: boolean
}

export default function MatchFilters({ filters, onFiltersChange, hasActiveSubscription }: MatchFiltersProps) {
  const { language } = useLanguage()
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const availableInterests = [
    'fado',
    'portuguese_cuisine',
    'business_networking',
    'wine_tasting',
    'cultural_events',
    'football',
    'portuguese_history',
    'entrepreneurship',
    'tech_innovation',
    'family_activities',
    'brazilian_music',
    'cultural_exchange',
    'photography',
    'arts_and_culture',
    'language_learning',
    'real_estate',
    'portuguese_business',
    'investment',
    'networking',
    'golf',
    'medical_studies',
    'portuguese_literature',
    'volunteering',
    'student_life',
    'cultural_preservation'
  ]

  const professionalBackgrounds = [
    'Finance & Banking',
    'Technology & Startups',
    'Creative Arts & Media',
    'Real Estate & Investment',
    'Healthcare & Medicine',
    'Education & Academia',
    'Legal & Professional Services',
    'Engineering & Construction',
    'Marketing & Communications',
    'Hospitality & Tourism',
    'Retail & Commerce',
    'Government & Public Service',
    'Non-Profit & Social Work',
    'Consulting & Strategy',
    'Manufacturing & Industrial'
  ]

  const londonAreas = [
    'Central London',
    'Canary Wharf',
    'Camden',
    'Greenwich',
    'South Kensington',
    'Vauxhall',
    'Camberwell',
    'Kennington',
    'Clapham',
    'Brixton',
    'Elephant & Castle',
    'London Bridge',
    'Tower Bridge',
    'Bermondsey',
    'Shoreditch',
    'Hackney',
    'Islington',
    'King\'s Cross',
    'Paddington',
    'Notting Hill',
    'Chelsea',
    'Fulham',
    'Hammersmith',
    'Richmond',
    'Wimbledon',
    'Croydon',
    'Greater London',
    'Outside London'
  ]

  const updateFilter = (key: keyof MatchFilters, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    })
  }

  const updateArrayFilter = (key: keyof MatchFilters, value: string, checked: boolean) => {
    const currentArray = (filters[key] as string[]) || []
    const newArray = checked
      ? [...currentArray, value]
      : currentArray.filter(item => item !== value)
    
    updateFilter(key, newArray.length > 0 ? newArray : undefined)
  }

  const clearFilters = () => {
    onFiltersChange({})
  }

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(value => 
      value !== undefined && 
      value !== null && 
      (Array.isArray(value) ? value.length > 0 : true)
    ).length
  }

  const translations = {
    en: {
      title: 'Advanced Filters',
      clearAll: 'Clear All',
      ageRange: 'Age Range',
      interests: 'Interests',
      professional: 'Professional Background',
      language: 'Language Preference',
      cultural: 'Cultural Background',
      relationshipGoal: 'Looking For',
      familyStatus: 'Family Status',
      location: 'Location',
      membership: 'Membership Tier',
      verifiedOnly: 'Verified Profiles Only',
      premium: 'Premium Feature',
      upgradeRequired: 'Upgrade to access advanced filters',
      languages: {
        portuguese: 'Portuguese',
        english: 'English',
        both: 'Both Languages'
      },
      cultures: {
        portugal: 'Portugal',
        brazil: 'Brazil',
        other_lusophone: 'Other Lusophone',
        any: 'Any Background'
      },
      goals: {
        friendship: 'Friendship',
        professional: 'Professional',
        cultural_exchange: 'Cultural Exchange',
        any: 'Open to All'
      },
      family: {
        single: 'Single',
        family: 'Has Family',
        any: 'Any Status'
      },
      tiers: {
        free: 'Free',
        core: 'Core',
        premium: 'Premium',
        business: 'Business',
        student: 'Student'
      }
    },
    pt: {
      title: 'Filtros Avançados',
      clearAll: 'Limpar Tudo',
      ageRange: 'Faixa Etária',
      interests: 'Interesses',
      professional: 'Área Profissional',
      language: 'Preferência de Idioma',
      cultural: 'Origem Cultural',
      relationshipGoal: 'À Procura De',
      familyStatus: 'Estado Familiar',
      location: 'Localização',
      membership: 'Nível de Membership',
      verifiedOnly: 'Apenas Perfis Verificados',
      premium: 'Funcionalidade Premium',
      upgradeRequired: 'Upgrade necessário para filtros avançados',
      languages: {
        portuguese: 'Português',
        english: 'Inglês',
        both: 'Ambos os Idiomas'
      },
      cultures: {
        portugal: 'Portugal',
        brazil: 'Brasil',
        other_lusophone: 'Outros Lusófonos',
        any: 'Qualquer Origem'
      },
      goals: {
        friendship: 'Amizade',
        professional: 'Profissional',
        cultural_exchange: 'Intercâmbio Cultural',
        any: 'Aberto a Tudo'
      },
      family: {
        single: 'Solteiro(a)',
        family: 'Com Família',
        any: 'Qualquer Estado'
      },
      tiers: {
        free: 'Grátis',
        core: 'Core',
        premium: 'Premium',
        business: 'Business',
        student: 'Estudante'
      }
    }
  }

  const t = translations[language]

  const FilterSection = ({ icon: Icon, title, children, isPremium = false }: {
    icon: any
    title: string
    children: React.ReactNode
    isPremium?: boolean
  }) => (
    <div className="border border-neutral-200 rounded-lg overflow-hidden">
      <button
        onClick={() => toggleSection(title)}
        className={`w-full px-4 py-3 text-left bg-neutral-50 hover:bg-neutral-100 transition-colors flex items-center justify-between ${
          isPremium && !hasActiveSubscription ? 'opacity-50' : ''
        }`}
        disabled={isPremium && !hasActiveSubscription}
      >
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-neutral-600" />
          <span className="font-medium text-neutral-900">{title}</span>
          {isPremium && (
            <Crown className="h-4 w-4 text-premium-500" />
          )}
        </div>
        <div className="text-neutral-400">
          {expandedSection === title ? '−' : '+'}
        </div>
      </button>
      
      <AnimatePresence>
        {expandedSection === title && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-white">
              {isPremium && !hasActiveSubscription ? (
                <div className="text-center py-4">
                  <Crown className="h-8 w-8 text-premium-500 mx-auto mb-2" />
                  <p className="text-sm text-neutral-600">{t.upgradeRequired}</p>
                </div>
              ) : (
                children
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-xl shadow-sm p-6 space-y-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-primary-600" />
          <h3 className="text-lg font-semibold text-neutral-900">{t.title}</h3>
          {getActiveFiltersCount() > 0 && (
            <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-medium">
              {getActiveFiltersCount()} active
            </span>
          )}
        </div>
        
        {getActiveFiltersCount() > 0 && (
          <button
            onClick={clearFilters}
            className="text-sm text-coral-600 hover:text-coral-700 font-medium"
          >
            {t.clearAll}
          </button>
        )}
      </div>

      {/* Basic Filters (Always Available) */}
      <div className="space-y-3">
        {/* Language Preference */}
        <FilterSection icon={Globe} title={t.language}>
          <div className="space-y-2">
            {Object.entries(t.languages).map(([key, label]) => (
              <label key={key} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="language"
                  checked={filters.languagePreference === key}
                  onChange={(e) => e.target.checked && updateFilter('languagePreference', key)}
                  className="text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-neutral-700">{label}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Cultural Background */}
        <FilterSection icon={Heart} title={t.cultural}>
          <div className="space-y-2">
            {Object.entries(t.cultures).map(([key, label]) => (
              <label key={key} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="cultural"
                  checked={filters.culturalBackground === key}
                  onChange={(e) => e.target.checked && updateFilter('culturalBackground', key)}
                  className="text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-neutral-700">{label}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Relationship Goal */}
        <FilterSection icon={Users} title={t.relationshipGoal}>
          <div className="space-y-2">
            {Object.entries(t.goals).map(([key, label]) => (
              <label key={key} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="goal"
                  checked={filters.relationshipGoal === key}
                  onChange={(e) => e.target.checked && updateFilter('relationshipGoal', key)}
                  className="text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-neutral-700">{label}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Verified Only */}
        <FilterSection icon={Shield} title={t.verifiedOnly}>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.verifiedOnly || false}
              onChange={(e) => updateFilter('verifiedOnly', e.target.checked || undefined)}
              className="text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-neutral-700">{t.verifiedOnly}</span>
          </label>
        </FilterSection>
      </div>

      {/* Premium Filters */}
      <div className="space-y-3 border-t border-neutral-200 pt-4">
        <div className="flex items-center gap-2 mb-3">
          <Crown className="h-4 w-4 text-premium-500" />
          <span className="text-sm font-medium text-premium-600">{t.premium}</span>
        </div>

        {/* Age Range */}
        <FilterSection icon={Calendar} title={t.ageRange} isPremium>
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div>
                <label className="text-xs text-neutral-600">Min Age</label>
                <input
                  type="number"
                  min="18"
                  max="80"
                  value={filters.ageRange?.[0] || 18}
                  onChange={(e) => updateFilter('ageRange', [parseInt(e.target.value), filters.ageRange?.[1] || 65])}
                  className="w-20 mt-1 block rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="text-xs text-neutral-600">Max Age</label>
                <input
                  type="number"
                  min="18"
                  max="80"
                  value={filters.ageRange?.[1] || 65}
                  onChange={(e) => updateFilter('ageRange', [filters.ageRange?.[0] || 18, parseInt(e.target.value)])}
                  className="w-20 mt-1 block rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>
        </FilterSection>

        {/* Location */}
        <FilterSection icon={MapPin} title={t.location} isPremium>
          <select
            value={filters.location || ''}
            onChange={(e) => updateFilter('location', e.target.value || undefined)}
            className="w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="">All Locations</option>
            {londonAreas.map(area => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>
        </FilterSection>

        {/* Professional Background */}
        <FilterSection icon={Briefcase} title={t.professional} isPremium>
          <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
            {professionalBackgrounds.map(background => (
              <label key={background} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.professionalBackground?.includes(background) || false}
                  onChange={(e) => updateArrayFilter('professionalBackground', background, e.target.checked)}
                  className="text-primary-600 focus:ring-primary-500"
                />
                <span className="text-xs text-neutral-700">{background}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Interests */}
        <FilterSection icon={Heart} title={t.interests} isPremium>
          <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
            {availableInterests.map(interest => (
              <label key={interest} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.interests?.includes(interest) || false}
                  onChange={(e) => updateArrayFilter('interests', interest, e.target.checked)}
                  className="text-primary-600 focus:ring-primary-500"
                />
                <span className="text-xs text-neutral-700">
                  {interest.replace('_', ' ')}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Membership Tier */}
        <FilterSection icon={Crown} title={t.membership} isPremium>
          <div className="space-y-2">
            {Object.entries(t.tiers).map(([key, label]) => (
              <label key={key} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="membership"
                  checked={filters.membershipTier === key}
                  onChange={(e) => e.target.checked && updateFilter('membershipTier', key)}
                  className="text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-neutral-700">{label}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Family Status */}
        <FilterSection icon={Users} title={t.familyStatus} isPremium>
          <div className="space-y-2">
            {Object.entries(t.family).map(([key, label]) => (
              <label key={key} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="family"
                  checked={filters.familyStatus === key}
                  onChange={(e) => e.target.checked && updateFilter('familyStatus', key)}
                  className="text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-neutral-700">{label}</span>
              </label>
            ))}
          </div>
        </FilterSection>
      </div>
    </motion.div>
  )
}