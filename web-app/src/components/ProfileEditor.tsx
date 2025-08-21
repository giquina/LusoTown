'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  UserIcon, 
  CameraIcon, 
  MapPinIcon, 
  HeartIcon, 
  BriefcaseIcon,
  GlobeAltIcon,
  CheckIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import PhotoUploadSystem from './PhotoUploadSystem'
import CulturalPreferences from './CulturalPreferences'
import ProfessionalNetworking from './ProfessionalNetworking'
import { calculateProfileCompletion } from '@/lib/supabase'
import type { UserProfile, ProfileCompletion } from '@/lib/supabase'

interface ProfileEditorProps {
  profile: UserProfile
  onSave: (updates: Partial<UserProfile>) => Promise<void>
  saving: boolean
}

interface TabConfig {
  id: string
  title: string
  titlePortuguese: string
  icon: React.ComponentType<any>
  component: React.ComponentType<any>
}

export default function ProfileEditor({ profile, onSave, saving }: ProfileEditorProps) {
  const { language } = useLanguage()
  const isPortuguese = language === 'pt'
  
  const [activeTab, setActiveTab] = useState('basic')
  const [formData, setFormData] = useState({
    first_name: profile.first_name || '',
    last_name: profile.last_name || '',
    date_of_birth: profile.date_of_birth || '',
    bio: profile.bio || '',
    location: profile.location || '',
    interests: profile.interests || [],
    photos: [],
    portuguese_origin: '',
    cultural_celebrations: [],
    professional_goals: [],
    cultural_values: {},
    lifestyle_preferences: [],
    language_preference: 'both'
  })
  const [profileCompletion, setProfileCompletion] = useState<ProfileCompletion | null>(null)

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

  const culturalInterests = {
    [isPortuguese ? 'Tradicional' : 'Traditional']: [
      'Fado', 'Portuguese Literature', 'Traditional Dance', 'Folk Music', 'Religious Festivals'
    ],
    [isPortuguese ? 'Culinária' : 'Culinary']: [
      'Portuguese Cooking', 'Wine Tasting', 'Pastéis de Nata', 'Regional Cuisines', 'Food Markets'
    ],
    [isPortuguese ? 'Desportos' : 'Sports']: [
      'Football', 'Futsal', 'Surfing', 'Portuguese Teams', 'Sports Bars'
    ],
    [isPortuguese ? 'Arte e Cultura' : 'Arts & Culture']: [
      'Portuguese Cinema', 'Art Galleries', 'Museums', 'Theatre', 'Photography'
    ],
    [isPortuguese ? 'Social' : 'Social']: [
      'Family Gatherings', 'Community Events', 'Portuguese Language', 'Cultural Heritage', 'Diaspora Stories'
    ],
    [isPortuguese ? 'Moderno' : 'Modern']: [
      'Portuguese Podcasts', 'Social Media Groups', 'Tech Meetups', 'Modern Music', 'Digital Culture'
    ]
  }

  useEffect(() => {
    const loadProfileCompletion = async () => {
      try {
        const completion = await calculateProfileCompletion(profile.id)
        setProfileCompletion(completion)
      } catch (error) {
        console.error('Error calculating profile completion:', error)
      }
    }

    loadProfileCompletion()
  }, [profile.id])

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = async () => {
    const updates: Partial<UserProfile> = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      date_of_birth: formData.date_of_birth,
      bio: formData.bio,
      location: formData.location,
      interests: formData.interests
    }

    await onSave(updates)
  }

  const tabs: TabConfig[] = [
    {
      id: 'basic',
      title: 'Basic Info',
      titlePortuguese: 'Info Básica',
      icon: UserIcon,
      component: BasicInfoTab
    },
    {
      id: 'photos',
      title: 'Photos',
      titlePortuguese: 'Fotos',
      icon: CameraIcon,
      component: PhotosTab
    },
    {
      id: 'location',
      title: 'Location',
      titlePortuguese: 'Localização',
      icon: MapPinIcon,
      component: LocationTab
    },
    {
      id: 'interests',
      title: 'Interests',
      titlePortuguese: 'Interesses',
      icon: HeartIcon,
      component: InterestsTab
    },
    {
      id: 'professional',
      title: 'Professional',
      titlePortuguese: 'Profissional',
      icon: BriefcaseIcon,
      component: ProfessionalTab
    },
    {
      id: 'cultural',
      title: 'Cultural',
      titlePortuguese: 'Cultural',
      icon: GlobeAltIcon,
      component: CulturalTab
    }
  ]

  const activeTabData = tabs.find(tab => tab.id === activeTab)
  const ActiveTabComponent = activeTabData?.component || BasicInfoTab

  return (
    <div className="space-y-8">
      {/* Profile Completion */}
      {profileCompletion && (
        <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {isPortuguese ? 'Completude do Perfil' : 'Profile Completion'}
              </h3>
              <p className="text-sm text-secondary-600">
                {profileCompletion.percentage}% {isPortuguese ? 'completo' : 'complete'}
              </p>
            </div>
            <div className="text-2xl font-bold text-primary-600">
              {profileCompletion.percentage}%
            </div>
          </div>
          
          <div className="w-full bg-secondary-200 rounded-full h-3 mb-4">
            <motion.div
              className="bg-gradient-to-r from-primary-500 to-secondary-500 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${profileCompletion.percentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {profileCompletion.missing_steps.length > 0 && (
            <div>
              <p className="text-sm font-medium text-secondary-700 mb-2">
                {isPortuguese ? 'Passos em falta:' : 'Missing steps:'}
              </p>
              <div className="flex flex-wrap gap-2">
                {profileCompletion.missing_steps.map((step) => (
                  <span
                    key={step}
                    className="px-3 py-1 bg-amber-100 text-amber-800 text-xs rounded-full"
                  >
                    {step.replace('_', ' ').charAt(0).toUpperCase() + step.slice(1)}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <div className="flex flex-wrap gap-2 pb-4">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium text-sm transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary-50 text-primary-600 border-2 border-primary-200'
                    : 'text-secondary-600 hover:bg-gray-50 border-2 border-transparent'
                }`}
              >
                <Icon className="w-4 h-4" />
                {isPortuguese ? tab.titlePortuguese : tab.title}
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="min-h-[400px]"
      >
        <ActiveTabComponent
          formData={formData}
          updateFormData={updateFormData}
          isPortuguese={isPortuguese}
          options={{
            londonAreas,
            culturalInterests
          }}
        />
      </motion.div>

      {/* Save Button */}
      <div className="flex justify-end pt-6 border-t border-gray-200">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-primary-600 hover:to-secondary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {saving ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              {isPortuguese ? 'A guardar...' : 'Saving...'}
            </>
          ) : (
            <>
              <CheckIcon className="w-5 h-5" />
              {isPortuguese ? 'Guardar Alterações' : 'Save Changes'}
            </>
          )}
        </motion.button>
      </div>
    </div>
  )
}

// Tab Components
function BasicInfoTab({ formData, updateFormData, isPortuguese }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          {isPortuguese ? 'Informações Básicas' : 'Basic Information'}
        </h3>
        
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
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            {isPortuguese ? 'Data de Nascimento' : 'Date of Birth'} *
          </label>
          <input
            type="date"
            value={formData.date_of_birth}
            onChange={(e) => updateFormData('date_of_birth', e.target.value)}
            className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
          />
          <p className="text-xs text-gray-500 mt-1">
            {isPortuguese ? 'Deve ter pelo menos 18 anos' : 'Must be at least 18 years old'}
          </p>
        </div>

        <div className="mt-6">
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
          />
          <p className="text-xs text-gray-500 mt-1">
            {formData.bio.length}/500 {isPortuguese ? 'caracteres' : 'characters'}
          </p>
        </div>
      </div>
    </div>
  )
}

function PhotosTab({ formData, updateFormData, isPortuguese }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          {isPortuguese ? 'Suas Fotos' : 'Your Photos'}
        </h3>
        
        <PhotoUploadSystem
          photos={formData.photos}
          onPhotosChange={(photos) => updateFormData('photos', photos)}
          maxPhotos={6}
          isPortuguese={isPortuguese}
        />
      </div>
    </div>
  )
}

function LocationTab({ formData, updateFormData, isPortuguese, options }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          {isPortuguese ? 'Localização em Londres' : 'London Location'}
        </h3>
        
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            {isPortuguese ? 'Área de Londres' : 'London Area'} *
          </label>
          <select
            value={formData.location}
            onChange={(e) => updateFormData('location', e.target.value)}
            className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">
              {isPortuguese ? 'Selecione uma área' : 'Select an area'}
            </option>
            {options.londonAreas.map((area: string) => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            {isPortuguese ? 
              'Isso ajuda outros portugueses a encontrá-lo na sua área' :
              'This helps other Portuguese speakers find you in your area'
            }
          </p>
        </div>
      </div>
    </div>
  )
}

function InterestsTab({ formData, updateFormData, isPortuguese, options }: any) {
  const toggleInterest = (interest: string) => {
    const current = formData.interests || []
    const updated = current.includes(interest)
      ? current.filter((i: string) => i !== interest)
      : [...current, interest]
    updateFormData('interests', updated)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          {isPortuguese ? 'Seus Interesses Culturais' : 'Your Cultural Interests'}
        </h3>
        
        <p className="text-secondary-600 mb-6">
          {isPortuguese ? 
            'Selecione seus interesses para nos ajudar a conectá-lo com pessoas similares' :
            'Select your interests to help us connect you with like-minded people'
          }
        </p>

        {Object.entries(options.culturalInterests).map(([category, interests]) => (
          <div key={category} className="mb-8">
            <h4 className="text-lg font-semibold text-secondary-800 mb-4">{category}</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {(interests as string[]).map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                    (formData.interests || []).includes(interest)
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 bg-white text-secondary-700 hover:border-secondary-300'
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
              `Selecionados: ${(formData.interests || []).length} interesses` :
              `Selected: ${(formData.interests || []).length} interests`
            }
          </p>
        </div>
      </div>
    </div>
  )
}

function ProfessionalTab({ formData, updateFormData, isPortuguese }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          {isPortuguese ? 'Networking Profissional' : 'Professional Networking'}
        </h3>
        
        <ProfessionalNetworking
          formData={formData}
          updateFormData={updateFormData}
          isPortuguese={isPortuguese}
        />
      </div>
    </div>
  )
}

function CulturalTab({ formData, updateFormData, isPortuguese }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          {isPortuguese ? 'Preferências Culturais' : 'Cultural Preferences'}
        </h3>
        
        <CulturalPreferences
          formData={formData}
          updateFormData={updateFormData}
          isPortuguese={isPortuguese}
        />
      </div>
    </div>
  )
}