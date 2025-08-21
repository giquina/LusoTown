'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  CheckIcon,
  CameraIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { getCurrentUserProfile, updateProfile, uploadPhoto } from '@/lib/supabase'
import PhotoUploadSystem from './PhotoUploadSystem'
import CulturalPreferences from './CulturalPreferences'
import ProfessionalNetworking from './ProfessionalNetworking'
import type { UserProfile } from '@/lib/supabase'

interface WizardStep {
  id: string
  title: string
  titlePortuguese: string
  description: string
  descriptionPortuguese: string
  component: React.ComponentType<any>
  required: boolean
}

interface ProfileFormData {
  first_name: string
  last_name: string
  date_of_birth: string
  bio: string
  location: string
  interests: string[]
  photos: string[]
  portuguese_origin: string
  cultural_celebrations: string[]
  professional_goals: string[]
  cultural_values: Record<string, number>
  lifestyle_preferences: string[]
  language_preference: string
}

export default function ProfileCreationWizard() {
  const { language } = useLanguage()
  const router = useRouter()
  const isPortuguese = language === 'pt'
  
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [formData, setFormData] = useState<ProfileFormData>({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    bio: '',
    location: '',
    interests: [],
    photos: [],
    portuguese_origin: '',
    cultural_celebrations: [],
    professional_goals: [],
    cultural_values: {},
    lifestyle_preferences: [],
    language_preference: 'both'
  })

  const londonAreas = [
    'Central London', 'Camden', 'Islington', 'Hackney', 'Tower Hamlets',
    'Greenwich', 'Lewisham', 'Southwark', 'Lambeth', 'Wandsworth',
    'Hammersmith & Fulham', 'Kensington & Chelsea', 'Westminster',
    'City of London', 'Newham', 'Waltham Forest', 'Redbridge',
    'Havering', 'Barking & Dagenham', 'Bexley', 'Bromley', 'Croydon',
    'Sutton', 'Merton', 'Kingston upon Thames', 'Richmond upon Thames',
    'Hounslow', 'Hillingdon', 'Ealing', 'Brent', 'Harrow', 'Barnet',
    'Enfield', 'Haringey', 'Stockwell', 'Vauxhall', 'Nine Elms'
  ]

  const portugueseOrigins = [
    { value: 'portugal', label: 'Portugal', labelPt: 'Portugal' },
    { value: 'brazil', label: 'Brazil', labelPt: 'Brasil' },
    { value: 'angola', label: 'Angola', labelPt: 'Angola' },
    { value: 'mozambique', label: 'Mozambique', labelPt: 'Moçambique' },
    { value: 'cape-verde', label: 'Cape Verde', labelPt: 'Cabo Verde' },
    { value: 'guinea-bissau', label: 'Guinea-Bissau', labelPt: 'Guiné-Bissau' },
    { value: 'sao-tome-principe', label: 'São Tomé & Príncipe', labelPt: 'São Tomé e Príncipe' },
    { value: 'east-timor', label: 'East Timor', labelPt: 'Timor-Leste' },
    { value: 'macau', label: 'Macau', labelPt: 'Macau' },
    { value: 'mixed', label: 'Mixed Heritage', labelPt: 'Herança Mista' },
    { value: 'other', label: 'Other Portuguese-speaking', labelPt: 'Outro lusófono' }
  ]

  const culturalInterests = {
    'Traditional': ['Fado', 'Portuguese Literature', 'Traditional Dance', 'Folk Music', 'Religious Festivals'],
    'Culinary': ['Portuguese Cooking', 'Wine Tasting', 'Pastéis de Nata', 'Regional Cuisines', 'Food Markets'],
    'Sports': ['Football', 'Futsal', 'Surfing', 'Portuguese Teams', 'Sports Bars'],
    'Arts & Culture': ['Portuguese Cinema', 'Art Galleries', 'Museums', 'Theatre', 'Photography'],
    'Social': ['Family Gatherings', 'Community Events', 'Portuguese Language', 'Cultural Heritage', 'Diaspora Stories'],
    'Modern': ['Portuguese Podcasts', 'Social Media Groups', 'Tech Meetups', 'Modern Music', 'Digital Culture']
  }

  useEffect(() => {
    const loadExistingProfile = async () => {
      try {
        const existingProfile = await getCurrentUserProfile()
        if (existingProfile) {
          setProfile(existingProfile)
          // Pre-fill form with existing data
          setFormData(prev => ({
            ...prev,
            first_name: existingProfile.first_name || '',
            last_name: existingProfile.last_name || '',
            date_of_birth: existingProfile.date_of_birth || '',
            bio: existingProfile.bio || '',
            location: existingProfile.location || '',
            interests: existingProfile.interests || []
          }))
        }
      } catch (error) {
        console.error('Error loading profile:', error)
      }
    }

    loadExistingProfile()
  }, [])

  const steps: WizardStep[] = [
    {
      id: 'basic',
      title: 'Basic Information',
      titlePortuguese: 'Informações Básicas',
      description: 'Tell us about yourself',
      descriptionPortuguese: 'Conte-nos sobre si',
      component: BasicInfoStep,
      required: true
    },
    {
      id: 'photos',
      title: 'Photos',
      titlePortuguese: 'Fotos',
      description: 'Add your photos',
      descriptionPortuguese: 'Adicione suas fotos',
      component: PhotoStep,
      required: true
    },
    {
      id: 'cultural',
      title: 'Cultural Background',
      titlePortuguese: 'Background Cultural',
      description: 'Your Portuguese heritage',
      descriptionPortuguese: 'Sua herança portuguesa',
      component: CulturalStep,
      required: true
    },
    {
      id: 'interests',
      title: 'Interests',
      titlePortuguese: 'Interesses',
      description: 'What you enjoy doing',
      descriptionPortuguese: 'O que gosta de fazer',
      component: InterestsStep,
      required: true
    },
    {
      id: 'professional',
      title: 'Professional',
      titlePortuguese: 'Profissional',
      description: 'Career and networking',
      descriptionPortuguese: 'Carreira e networking',
      component: ProfessionalStep,
      required: false
    },
    {
      id: 'preferences',
      title: 'Preferences',
      titlePortuguese: 'Preferências',
      description: 'Cultural compatibility',
      descriptionPortuguese: 'Compatibilidade cultural',
      component: PreferencesStep,
      required: true
    }
  ]

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = async () => {
    setLoading(true)
    try {
      if (!profile) {
        throw new Error('No user profile found')
      }

      const updates: Partial<UserProfile> = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        date_of_birth: formData.date_of_birth,
        bio: formData.bio,
        location: formData.location,
        interests: formData.interests
      }

      const result = await updateProfile(profile.id, updates)
      
      if (result.success) {
        toast.success(isPortuguese ? 'Perfil criado com sucesso!' : 'Profile created successfully!')
        router.push('/my-network')
      } else {
        throw new Error(result.error || 'Unknown error')
      }
    } catch (error) {
      console.error('Error completing profile:', error)
      toast.error(isPortuguese ? 'Erro ao criar perfil' : 'Error creating profile')
    } finally {
      setLoading(false)
    }
  }

  const currentStepData = steps[currentStep]
  const StepComponent = currentStepData.component

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {isPortuguese ? currentStepData.titlePortuguese : currentStepData.title}
          </h2>
          <span className="text-sm text-gray-500">
            {currentStep + 1} {isPortuguese ? 'de' : 'of'} {steps.length}
          </span>
        </div>
        
        <div className="w-full bg-secondary-200 rounded-full h-2 mb-4">
          <motion.div
            className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <p className="text-secondary-600">
          {isPortuguese ? currentStepData.descriptionPortuguese : currentStepData.description}
        </p>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <StepComponent
            formData={formData}
            updateFormData={updateFormData}
            isPortuguese={isPortuguese}
            options={{
              londonAreas,
              portugueseOrigins,
              culturalInterests
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className="flex items-center gap-2 px-6 py-3 text-secondary-600 bg-secondary-100 rounded-xl hover:bg-secondary-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeftIcon className="w-5 h-5" />
          {isPortuguese ? 'Anterior' : 'Previous'}
        </button>

        {currentStep === steps.length - 1 ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleComplete}
            disabled={loading}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl font-semibold hover:from-primary-600 hover:to-secondary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {isPortuguese ? 'Criando...' : 'Creating...'}
              </>
            ) : (
              <>
                <CheckIcon className="w-5 h-5" />
                {isPortuguese ? 'Completar Perfil' : 'Complete Profile'}
              </>
            )}
          </motion.button>
        ) : (
          <button
            onClick={nextStep}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl font-semibold hover:from-primary-600 hover:to-secondary-600 transition-all"
          >
            {isPortuguese ? 'Próximo' : 'Next'}
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  )
}

// Step Components
function BasicInfoStep({ formData, updateFormData, isPortuguese, options }: any) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            {isPortuguese ? 'Nome' : 'First Name'} *
          </label>
          <input
            type="text"
            value={formData.first_name}
            onChange={(e) => updateFormData('first_name', e.target.value)}
            className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            placeholder={isPortuguese ? 'Seu nome' : 'Your first name'}
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            {isPortuguese ? 'Apelido' : 'Last Name'} *
          </label>
          <input
            type="text"
            value={formData.last_name}
            onChange={(e) => updateFormData('last_name', e.target.value)}
            className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            placeholder={isPortuguese ? 'Seu apelido' : 'Your last name'}
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-2">
          {isPortuguese ? 'Data de Nascimento' : 'Date of Birth'} *
        </label>
        <input
          type="date"
          value={formData.date_of_birth}
          onChange={(e) => updateFormData('date_of_birth', e.target.value)}
          className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
          required
          max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
        />
        <p className="text-xs text-gray-500 mt-1">
          {isPortuguese ? 'Deve ter pelo menos 18 anos' : 'Must be at least 18 years old'}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-2">
          {isPortuguese ? 'Área de Londres' : 'London Area'} *
        </label>
        <select
          value={formData.location}
          onChange={(e) => updateFormData('location', e.target.value)}
          className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
          required
        >
          <option value="">
            {isPortuguese ? 'Selecione uma área' : 'Select an area'}
          </option>
          {options.londonAreas.map((area: string) => (
            <option key={area} value={area}>{area}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-2">
          {isPortuguese ? 'Biografia' : 'Bio'} *
        </label>
        <textarea
          value={formData.bio}
          onChange={(e) => updateFormData('bio', e.target.value)}
          rows={4}
          className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
          placeholder={isPortuguese ? 
            'Conte-nos um pouco sobre si, seus interesses e o que procura na comunidade...' : 
            'Tell us about yourself, your interests and what you are looking for in the community...'
          }
          maxLength={500}
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          {formData.bio.length}/500 {isPortuguese ? 'caracteres' : 'characters'}
        </p>
      </div>
    </div>
  )
}

function PhotoStep({ formData, updateFormData, isPortuguese }: any) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <CameraIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {isPortuguese ? 'Adicione suas fotos' : 'Add your photos'}
        </h3>
        <p className="text-secondary-600 mb-6">
          {isPortuguese ? 
            'Adicione pelo menos uma foto para que outros membros da comunidade possam conhecê-lo melhor' :
            'Add at least one photo so other community members can get to know you better'
          }
        </p>
      </div>
      
      <PhotoUploadSystem
        photos={formData.photos}
        onPhotosChange={(photos) => updateFormData('photos', photos)}
        maxPhotos={6}
        isPortuguese={isPortuguese}
      />
    </div>
  )
}

function CulturalStep({ formData, updateFormData, isPortuguese, options }: any) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-4">
          {isPortuguese ? 'Origem Portuguesa' : 'Portuguese Origin'} *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {options.portugueseOrigins.map((origin: any) => (
            <button
              key={origin.value}
              type="button"
              onClick={() => updateFormData('portuguese_origin', origin.value)}
              className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                formData.portuguese_origin === origin.value
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-secondary-200 bg-white text-secondary-700 hover:border-secondary-300'
              }`}
            >
              {isPortuguese ? origin.labelPt : origin.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-4">
          {isPortuguese ? 'Preferência de Idioma' : 'Language Preference'} *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { value: 'portuguese', label: 'Português', labelPt: 'Apenas Português' },
            { value: 'english', label: 'English Only', labelPt: 'Apenas Inglês' },
            { value: 'both', label: 'Both Languages', labelPt: 'Ambos os Idiomas' }
          ].map((lang) => (
            <button
              key={lang.value}
              type="button"
              onClick={() => updateFormData('language_preference', lang.value)}
              className={`p-4 rounded-lg border-2 text-sm font-medium transition-all ${
                formData.language_preference === lang.value
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-secondary-200 bg-white text-secondary-700 hover:border-secondary-300'
              }`}
            >
              {isPortuguese ? lang.labelPt : lang.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function InterestsStep({ formData, updateFormData, isPortuguese, options }: any) {
  const toggleInterest = (interest: string) => {
    const current = formData.interests || []
    const updated = current.includes(interest)
      ? current.filter((i: string) => i !== interest)
      : [...current, interest]
    updateFormData('interests', updated)
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {isPortuguese ? 'Seus Interesses Culturais' : 'Your Cultural Interests'}
        </h3>
        <p className="text-secondary-600">
          {isPortuguese ? 
            'Selecione pelo menos 3 interesses para nos ajudar a conectá-lo com pessoas similares' :
            'Select at least 3 interests to help us connect you with like-minded people'
          }
        </p>
      </div>

      {Object.entries(options.culturalInterests).map(([category, interests]) => (
        <div key={category}>
          <h4 className="text-lg font-semibold text-secondary-800 mb-3">{category}</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {(interests as string[]).map((interest) => (
              <button
                key={interest}
                type="button"
                onClick={() => toggleInterest(interest)}
                className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                  (formData.interests || []).includes(interest)
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-secondary-200 bg-white text-secondary-700 hover:border-secondary-300'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>
      ))}
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          {isPortuguese ? 
            `Selecionados: ${(formData.interests || []).length} (mínimo 3)` :
            `Selected: ${(formData.interests || []).length} (minimum 3)`
          }
        </p>
      </div>
    </div>
  )
}

function ProfessionalStep({ formData, updateFormData, isPortuguese }: any) {
  return (
    <ProfessionalNetworking
      formData={formData}
      updateFormData={updateFormData}
      isPortuguese={isPortuguese}
    />
  )
}

function PreferencesStep({ formData, updateFormData, isPortuguese }: any) {
  return (
    <CulturalPreferences
      formData={formData}
      updateFormData={updateFormData}
      isPortuguese={isPortuguese}
    />
  )
}