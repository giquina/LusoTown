'use client'

import React, { useState, useCallback } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { 
  BusinessCategory, 
  PortugueseRegion, 
  Language,
  LondonArea,
  portugueseBusinessService,
  PortugueseBusiness 
} from '@/lib/businessDirectory'
import { geolocationService, Location } from '@/lib/geolocation'
import { 
  BuildingStorefrontIcon,
  PhotoIcon,
  MapPinIcon,
  PhoneIcon,
  GlobeAltIcon,
  EnvelopeIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

interface BusinessSubmissionFormProps {
  onSubmissionSuccess?: (businessId: string) => void
  onClose?: () => void
  className?: string
}

interface FormData {
  // Basic Info
  name: string
  namePortuguese: string
  category: BusinessCategory | ''
  description: string
  descriptionPortuguese: string
  
  // Contact & Location
  address: string
  postcode: string
  phone: string
  email: string
  website: string
  londonArea: LondonArea | ''
  
  // Portuguese Community Details
  ownerName: string
  ownerRegion: PortugueseRegion | ''
  languagesSpoken: Language[]
  yearEstablished: number
  
  // Business Hours
  openingHours: {
    monday: string
    tuesday: string
    wednesday: string
    thursday: string
    friday: string
    saturday: string
    sunday: string
  }
  
  // Additional Info
  supportsCulture: boolean
  keywords: string[]
}

const BusinessSubmissionForm: React.FC<BusinessSubmissionFormProps> = ({
  onSubmissionSuccess,
  onClose,
  className = ''
}) => {
  const { t, language } = useLanguage()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')
  const [geocodedLocation, setGeocodedLocation] = useState<Location | null>(null)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState<FormData>({
    name: '',
    namePortuguese: '',
    category: '',
    description: '',
    descriptionPortuguese: '',
    address: '',
    postcode: '',
    phone: '',
    email: '',
    website: '',
    londonArea: '',
    ownerName: '',
    ownerRegion: '',
    languagesSpoken: ['portuguese', 'english'],
    yearEstablished: new Date().getFullYear(),
    openingHours: {
      monday: '09:00-17:00',
      tuesday: '09:00-17:00',
      wednesday: '09:00-17:00',
      thursday: '09:00-17:00',
      friday: '09:00-17:00',
      saturday: '10:00-16:00',
      sunday: 'Closed'
    },
    supportsCulture: false,
    keywords: []
  })

  // Form steps
  const steps = [
    { id: 1, title: t('form.step_business_info', 'Business Information'), icon: BuildingStorefrontIcon },
    { id: 2, title: t('form.step_location', 'Location & Contact'), icon: MapPinIcon },
    { id: 3, title: t('form.step_portuguese_details', 'Portuguese Details'), icon: '🇵🇹' },
    { id: 4, title: t('form.step_hours_additional', 'Hours & Additional'), icon: ClockIcon }
  ]

  // Categories with Portuguese translations
  const categories: { value: BusinessCategory; label: { en: string; pt: string } }[] = [
    { value: 'restaurant', label: { en: 'Restaurant', pt: 'Restaurante' } },
    { value: 'cafe', label: { en: 'Café', pt: 'Café' } },
    { value: 'bakery', label: { en: 'Bakery', pt: 'Pastelaria' } },
    { value: 'grocery', label: { en: 'Grocery Store', pt: 'Mercearia' } },
    { value: 'services', label: { en: 'General Services', pt: 'Serviços Gerais' } },
    { value: 'healthcare', label: { en: 'Healthcare', pt: 'Saúde' } },
    { value: 'legal', label: { en: 'Legal Services', pt: 'Serviços Jurídicos' } },
    { value: 'financial', label: { en: 'Financial Services', pt: 'Serviços Financeiros' } },
    { value: 'real_estate', label: { en: 'Real Estate', pt: 'Imobiliário' } },
    { value: 'education', label: { en: 'Education', pt: 'Educação' } },
    { value: 'beauty', label: { en: 'Beauty & Wellness', pt: 'Beleza e Bem-estar' } },
    { value: 'retail', label: { en: 'Retail', pt: 'Comércio' } },
    { value: 'automotive', label: { en: 'Automotive', pt: 'Automóvel' } },
    { value: 'home_services', label: { en: 'Home Services', pt: 'Serviços Domésticos' } },
    { value: 'entertainment', label: { en: 'Entertainment', pt: 'Entretenimento' } },
    { value: 'travel', label: { en: 'Travel Agency', pt: 'Agência de Viagens' } },
    { value: 'technology', label: { en: 'Technology', pt: 'Tecnologia' } },
    { value: 'consulting', label: { en: 'Consulting', pt: 'Consultoria' } },
    { value: 'cultural_center', label: { en: 'Cultural Center', pt: 'Centro Cultural' } }
  ]

  // Portuguese-speaking regions with flag emojis
  const regions: { value: PortugueseRegion; label: { en: string; pt: string }; flag: string }[] = [
    { value: 'portugal_mainland', label: { en: 'Portugal (Mainland)', pt: 'Portugal Continental' }, flag: '🇵🇹' },
    { value: 'portugal_azores', label: { en: 'Azores, Portugal', pt: 'Açores, Portugal' }, flag: '🇵🇹' },
    { value: 'portugal_madeira', label: { en: 'Madeira, Portugal', pt: 'Madeira, Portugal' }, flag: '🇵🇹' },
    { value: 'brazil', label: { en: 'Brazil', pt: 'Brasil' }, flag: '🇧🇷' },
    { value: 'angola', label: { en: 'Angola', pt: 'Angola' }, flag: '🇦🇴' },
    { value: 'mozambique', label: { en: 'Mozambique', pt: 'Moçambique' }, flag: '🇲🇿' },
    { value: 'cape_verde', label: { en: 'Cape Verde', pt: 'Cabo Verde' }, flag: '🇨🇻' },
    { value: 'guinea_bissau', label: { en: 'Guinea-Bissau', pt: 'Guiné-Bissau' }, flag: '🇬🇼' },
    { value: 'sao_tome_principe', label: { en: 'São Tomé and Príncipe', pt: 'São Tomé e Príncipe' }, flag: '🇸🇹' },
    { value: 'east_timor', label: { en: 'East Timor', pt: 'Timor-Leste' }, flag: '🇹🇱' },
    { value: 'macau', label: { en: 'Macau', pt: 'Macau' }, flag: '🇲🇴' },
    { value: 'portuguese_diaspora', label: { en: 'Portuguese Diaspora', pt: 'Diáspora Portuguesa' }, flag: '🌍' }
  ]

  // London areas
  const londonAreas: { value: LondonArea; label: string }[] = [
    { value: 'central_london', label: 'Central London' },
    { value: 'north_london', label: 'North London' },
    { value: 'south_london', label: 'South London' },
    { value: 'east_london', label: 'East London' },
    { value: 'west_london', label: 'West London' },
    { value: 'northeast_london', label: 'Northeast London' },
    { value: 'northwest_london', label: 'Northwest London' },
    { value: 'southeast_london', label: 'Southeast London' },
    { value: 'southwest_london', label: 'Southwest London' }
  ]

  // Languages
  const languages: { value: Language; label: { en: string; pt: string } }[] = [
    { value: 'portuguese', label: { en: 'Portuguese', pt: 'Português' } },
    { value: 'english', label: { en: 'English', pt: 'Inglês' } },
    { value: 'spanish', label: { en: 'Spanish', pt: 'Espanhol' } },
    { value: 'french', label: { en: 'French', pt: 'Francês' } },
    { value: 'arabic', label: { en: 'Arabic', pt: 'Árabe' } },
    { value: 'swahili', label: { en: 'Swahili', pt: 'Suaíli' } },
    { value: 'tetum', label: { en: 'Tetum', pt: 'Tétum' } }
  ]

  const updateFormData = useCallback((field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear validation error for this field
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: '' }))
    }
  }, [validationErrors])

  const updateOpeningHours = useCallback((day: keyof FormData['openingHours'], value: string) => {
    setFormData(prev => ({
      ...prev,
      openingHours: { ...prev.openingHours, [day]: value }
    }))
  }, [])

  const handleAddressChange = async (address: string) => {
    updateFormData('address', address)
    
    // Try to geocode the address for better location accuracy
    if (address.length > 10) {
      try {
        const location = await geolocationService.geocodeAddress(`${address}, London`)
        setGeocodedLocation(location)
      } catch (error) {
        console.warn('Address geocoding failed:', error)
      }
    }
  }

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {}

    switch (step) {
      case 1:
        if (!formData.name) errors.name = t('validation.required', 'This field is required')
        if (!formData.category) errors.category = t('validation.required', 'This field is required')
        if (!formData.description) errors.description = t('validation.required', 'This field is required')
        break
      
      case 2:
        if (!formData.address) errors.address = t('validation.required', 'This field is required')
        if (!formData.postcode) errors.postcode = t('validation.required', 'This field is required')
        if (!formData.phone) errors.phone = t('validation.required', 'This field is required')
        if (!formData.email) errors.email = t('validation.required', 'This field is required')
        if (!formData.londonArea) errors.londonArea = t('validation.required', 'This field is required')
        
        // Email validation
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          errors.email = t('validation.email_invalid', 'Please enter a valid email address')
        }
        
        // UK postcode validation (basic)
        if (formData.postcode && !/^[A-Z]{1,2}[0-9R][0-9A-Z]? [0-9][A-Z]{2}$/i.test(formData.postcode)) {
          errors.postcode = t('validation.postcode_invalid', 'Please enter a valid UK postcode')
        }
        break
      
      case 3:
        if (!formData.ownerName) errors.ownerName = t('validation.required', 'This field is required')
        if (!formData.ownerRegion) errors.ownerRegion = t('validation.required', 'This field is required')
        if (formData.yearEstablished < 1900 || formData.yearEstablished > new Date().getFullYear()) {
          errors.yearEstablished = t('validation.year_invalid', 'Please enter a valid year')
        }
        break
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length))
    }
  }

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Prepare business data for submission
      const businessData: Partial<PortugueseBusiness> = {
        name: formData.name,
        namePortuguese: formData.namePortuguese || undefined,
        category: formData.category as BusinessCategory,
        description: formData.description,
        descriptionPortuguese: formData.descriptionPortuguese || undefined,
        address: formData.address,
        postcode: formData.postcode.toUpperCase(),
        phone: formData.phone,
        email: formData.email,
        website: formData.website || undefined,
        ownerName: formData.ownerName,
        ownerRegion: formData.ownerRegion as PortugueseRegion,
        languagesSpoken: formData.languagesSpoken,
        yearEstablished: formData.yearEstablished,
        openingHours: formData.openingHours,
        londonArea: formData.londonArea as LondonArea,
        supportsCulture: formData.supportsCulture,
        keywords: formData.keywords,
        latitude: geocodedLocation?.latitude,
        longitude: geocodedLocation?.longitude
      }

      const result = await portugueseBusinessService.submitBusinessForVerification(businessData)

      if (result.success) {
        setSubmitStatus('success')
        setSubmitMessage(result.message)
        onSubmissionSuccess?.(result.businessId!)
      } else {
        setSubmitStatus('error')
        setSubmitMessage(result.message)
      }
    } catch (error) {
      console.error('Business submission failed:', error)
      setSubmitStatus('error')
      setSubmitMessage(t('form.submission_error', 'Failed to submit business. Please try again.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  {t('form.business_name', 'Business Name')} *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    validationErrors.name ? 'border-red-300' : 'border-secondary-300'
                  }`}
                  placeholder={t('form.business_name_placeholder', 'Your business name')}
                />
                {validationErrors.name && (
                  <p className="text-coral-600 text-sm mt-1">{validationErrors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  {t('form.business_name_portuguese', 'Business Name (Portuguese)')}
                </label>
                <input
                  type="text"
                  value={formData.namePortuguese}
                  onChange={(e) => updateFormData('namePortuguese', e.target.value)}
                  className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder={t('form.business_name_portuguese_placeholder', 'Nome em português (opcional)')}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                {t('form.category', 'Category')} *
              </label>
              <select
                value={formData.category}
                onChange={(e) => updateFormData('category', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  validationErrors.category ? 'border-red-300' : 'border-secondary-300'
                }`}
              >
                <option value="">{t('form.select_category', 'Select a category')}</option>
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label[language]}
                  </option>
                ))}
              </select>
              {validationErrors.category && (
                <p className="text-coral-600 text-sm mt-1">{validationErrors.category}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                {t('form.description', 'Description')} *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => updateFormData('description', e.target.value)}
                rows={4}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  validationErrors.description ? 'border-red-300' : 'border-secondary-300'
                }`}
                placeholder={t('form.description_placeholder', 'Describe your business and what makes it special')}
              />
              {validationErrors.description && (
                <p className="text-coral-600 text-sm mt-1">{validationErrors.description}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                {t('form.description_portuguese', 'Description (Portuguese)')}
              </label>
              <textarea
                value={formData.descriptionPortuguese}
                onChange={(e) => updateFormData('descriptionPortuguese', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder={t('form.description_portuguese_placeholder', 'Descrição em português (opcional)')}
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  {t('form.address', 'Address')} *
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleAddressChange(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    validationErrors.address ? 'border-red-300' : 'border-secondary-300'
                  }`}
                  placeholder={t('form.address_placeholder', 'Full business address in London')}
                />
                {validationErrors.address && (
                  <p className="text-coral-600 text-sm mt-1">{validationErrors.address}</p>
                )}
                {geocodedLocation && (
                  <p className="text-action-600 text-sm mt-1 flex items-center gap-1">
                    <MapPinIcon className="w-4 h-4" />
                    {t('form.location_found', 'Location found and verified')}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  {t('form.postcode', 'Postcode')} *
                </label>
                <input
                  type="text"
                  value={formData.postcode}
                  onChange={(e) => updateFormData('postcode', e.target.value.toUpperCase())}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    validationErrors.postcode ? 'border-red-300' : 'border-secondary-300'
                  }`}
                  placeholder="SW1A 1AA"
                />
                {validationErrors.postcode && (
                  <p className="text-coral-600 text-sm mt-1">{validationErrors.postcode}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  {t('form.london_area', 'London Area')} *
                </label>
                <select
                  value={formData.londonArea}
                  onChange={(e) => updateFormData('londonArea', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    validationErrors.londonArea ? 'border-red-300' : 'border-secondary-300'
                  }`}
                >
                  <option value="">{t('form.select_area', 'Select London area')}</option>
                  {londonAreas.map(area => (
                    <option key={area.value} value={area.value}>
                      {area.label}
                    </option>
                  ))}
                </select>
                {validationErrors.londonArea && (
                  <p className="text-coral-600 text-sm mt-1">{validationErrors.londonArea}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  {t('form.phone', 'Phone Number')} *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    validationErrors.phone ? 'border-red-300' : 'border-secondary-300'
                  }`}
                  placeholder="+44 20 7123 4567"
                />
                {validationErrors.phone && (
                  <p className="text-coral-600 text-sm mt-1">{validationErrors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  {t('form.email', 'Email Address')} *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    validationErrors.email ? 'border-red-300' : 'border-secondary-300'
                  }`}
                  placeholder="info@yourbusiness.com"
                />
                {validationErrors.email && (
                  <p className="text-coral-600 text-sm mt-1">{validationErrors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  {t('form.website', 'Website')}
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => updateFormData('website', e.target.value)}
                  className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="https://yourbusiness.com"
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  {t('form.owner_name', 'Owner Name')} *
                </label>
                <input
                  type="text"
                  value={formData.ownerName}
                  onChange={(e) => updateFormData('ownerName', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    validationErrors.ownerName ? 'border-red-300' : 'border-secondary-300'
                  }`}
                  placeholder={t('form.owner_name_placeholder', 'Business owner full name')}
                />
                {validationErrors.ownerName && (
                  <p className="text-coral-600 text-sm mt-1">{validationErrors.ownerName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  {t('form.year_established', 'Year Established')} *
                </label>
                <input
                  type="number"
                  value={formData.yearEstablished}
                  onChange={(e) => updateFormData('yearEstablished', parseInt(e.target.value))}
                  min="1900"
                  max={new Date().getFullYear()}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    validationErrors.yearEstablished ? 'border-red-300' : 'border-secondary-300'
                  }`}
                />
                {validationErrors.yearEstablished && (
                  <p className="text-coral-600 text-sm mt-1">{validationErrors.yearEstablished}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                {t('form.owner_region', 'Portuguese Connection')} *
              </label>
              <select
                value={formData.ownerRegion}
                onChange={(e) => updateFormData('ownerRegion', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  validationErrors.ownerRegion ? 'border-red-300' : 'border-secondary-300'
                }`}
              >
                <option value="">{t('form.select_region', 'Select Portuguese region/country')}</option>
                {regions.map(region => (
                  <option key={region.value} value={region.value}>
                    {region.flag} {region.label[language]}
                  </option>
                ))}
              </select>
              {validationErrors.ownerRegion && (
                <p className="text-coral-600 text-sm mt-1">{validationErrors.ownerRegion}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                {t('form.languages_spoken', 'Languages Spoken at Business')}
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {languages.map(lang => (
                  <label key={lang.value} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.languagesSpoken.includes(lang.value)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          updateFormData('languagesSpoken', [...formData.languagesSpoken, lang.value])
                        } else {
                          updateFormData('languagesSpoken', formData.languagesSpoken.filter(l => l !== lang.value))
                        }
                      }}
                      className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-secondary-700">
                      {lang.label[language]}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.supportsCulture}
                  onChange={(e) => updateFormData('supportsCulture', e.target.checked)}
                  className="rounded border-secondary-300 text-secondary-600 focus:ring-secondary-500"
                />
                <span className="ml-3 text-sm text-secondary-700">
                  {t('form.supports_culture', 'This business actively supports Portuguese cultural events and community activities')}
                </span>
              </label>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {t('form.opening_hours', 'Opening Hours')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(formData.openingHours).map(([day, hours]) => (
                  <div key={day} className="flex items-center gap-3">
                    <label className="w-20 text-sm font-medium text-secondary-700 capitalize">
                      {t(`days.${day}`, day)}:
                    </label>
                    <input
                      type="text"
                      value={hours}
                      onChange={(e) => updateOpeningHours(day as keyof FormData['openingHours'], e.target.value)}
                      className="flex-1 px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                      placeholder="09:00-17:00 or Closed"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                {t('form.keywords', 'Search Keywords')}
              </label>
              <input
                type="text"
                value={formData.keywords.join(', ')}
                onChange={(e) => updateFormData('keywords', e.target.value.split(',').map(k => k.trim()).filter(Boolean))}
                className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder={t('form.keywords_placeholder', 'e.g., pastéis de nata, traditional Portuguese, fado music')}
              />
              <p className="text-sm text-secondary-600 mt-1">
                {t('form.keywords_help', 'Separate keywords with commas. These help people find your business.')}
              </p>
            </div>

            {submitStatus === 'success' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-action-500 flex-shrink-0" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">
                      {t('form.success_title', 'Business Submitted Successfully')}
                    </h3>
                    <p className="text-sm text-green-700 mt-1">{submitMessage}</p>
                  </div>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <ExclamationTriangleIcon className="w-5 h-5 text-coral-500 flex-shrink-0" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      {t('form.error_title', 'Submission Failed')}
                    </h3>
                    <p className="text-sm text-red-700 mt-1">{submitMessage}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  if (submitStatus === 'success') {
    return (
      <div className={`bg-white rounded-lg shadow-xl p-8 text-center ${className}`}>
        <CheckCircleIcon className="w-16 h-16 text-action-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {t('form.submission_complete', 'Submission Complete!')}
        </h2>
        <p className="text-secondary-600 mb-6">{submitMessage}</p>
        <button
          onClick={onClose}
          className="btn-primary"
        >
          {t('buttons.close', 'Close')}
        </button>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-lg shadow-xl overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">
            {t('form.submit_business', 'Submit Your Portuguese Business')}
          </h2>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          )}
        </div>
        <p className="text-white/90 mt-2">
          {t('form.subtitle', 'Join the largest directory of Portuguese businesses in the UK')}
        </p>
      </div>

      {/* Step Indicator */}
      <div className="px-6 py-4 border-b border-secondary-200">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                currentStep === step.id 
                  ? 'bg-primary-500 text-white' 
                  : currentStep > step.id
                    ? 'bg-action-500 text-white'
                    : 'bg-secondary-200 text-secondary-600'
              }`}>
                {currentStep > step.id ? (
                  <CheckCircleIcon className="w-5 h-5" />
                ) : (
                  step.id
                )}
              </div>
              <span className={`ml-2 text-sm ${
                currentStep === step.id ? 'text-primary-600 font-medium' : 'text-secondary-600'
              }`}>
                {step.title}
              </span>
              {index < steps.length - 1 && (
                <div className={`w-8 h-px mx-4 ${
                  currentStep > step.id ? 'bg-action-500' : 'bg-secondary-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6">
        {renderStepContent()}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-secondary-200 bg-secondary-50 flex justify-between">
        <button
          onClick={handlePrevStep}
          disabled={currentStep === 1}
          className="px-4 py-2 text-secondary-600 hover:text-secondary-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t('buttons.back', 'Back')}
        </button>
        
        <div className="flex gap-3">
          {currentStep < steps.length ? (
            <button
              onClick={handleNextStep}
              className="btn-primary"
            >
              {t('buttons.next', 'Next')}
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="btn-primary flex items-center gap-2"
            >
              {isSubmitting && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              )}
              {isSubmitting 
                ? t('buttons.submitting', 'Submitting...') 
                : t('buttons.submit', 'Submit Business')}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default BusinessSubmissionForm