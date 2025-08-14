'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  UsersIcon, 
  MapPinIcon, 
  GlobeAltIcon, 
  ShieldCheckIcon,
  CalendarIcon,
  HeartIcon,
  FlagIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { supabase, GroupCategory } from '@/lib/supabase'
import toast from 'react-hot-toast'

// London Boroughs for location selection
const LONDON_BOROUGHS = [
  'City of London', 'Barking and Dagenham', 'Barnet', 'Bexley', 'Brent', 'Bromley',
  'Camden', 'Croydon', 'Ealing', 'Enfield', 'Greenwich', 'Hackney', 'Hammersmith and Fulham',
  'Haringey', 'Harrow', 'Havering', 'Hillingdon', 'Hounslow', 'Islington', 'Kensington and Chelsea',
  'Kingston upon Thames', 'Lambeth', 'Lewisham', 'Merton', 'Newham', 'Redbridge', 'Richmond upon Thames',
  'Southwark', 'Sutton', 'Tower Hamlets', 'Waltham Forest', 'Wandsworth', 'Westminster'
]

interface GroupFormData {
  name: string
  description: string
  category: string
  location: string
  london_borough: string
  language_preference: string
  portuguese_origin: string
  age_restrictions: {
    min_age: number | null
    max_age: number | null
    families_welcome: boolean
  }
  meeting_frequency: string
  verification_level: string
  max_members: number | null
  is_private: boolean
  rules: string
  contact_info: {
    email: string
    phone: string
    whatsapp: string
    telegram: string
  }
  cultural_focus: {
    preserves_heritage: boolean
    family_friendly: boolean
    traditional_activities: boolean
    language_learning: boolean
  }
  group_tags: string[]
}

export default function CreateGroupPage() {
  const router = useRouter()
  const { t, language } = useLanguage()
  const [categories, setCategories] = useState<GroupCategory[]>([])
  const [loading, setLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<GroupFormData>({
    name: '',
    description: '',
    category: '',
    location: '',
    london_borough: '',
    language_preference: 'both',
    portuguese_origin: 'any',
    age_restrictions: {
      min_age: null,
      max_age: null,
      families_welcome: true
    },
    meeting_frequency: 'monthly',
    verification_level: 'basic',
    max_members: null,
    is_private: false,
    rules: '',
    contact_info: {
      email: '',
      phone: '',
      whatsapp: '',
      telegram: ''
    },
    cultural_focus: {
      preserves_heritage: false,
      family_friendly: true,
      traditional_activities: false,
      language_learning: false
    },
    group_tags: []
  })
  const [newTag, setNewTag] = useState('')

  // Load categories on component mount
  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('group_categories')
        .select('*')
        .eq('is_active', true)
        .order('display_order')

      if (error) throw error
      setCategories(data || [])
    } catch (error) {
      console.error('Error loading categories:', error)
      toast.error('Failed to load categories')
    }
  }

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof GroupFormData] as object),
          [child]: value
        }
      }))
    } else {
      setFormData(prev => ({ ...prev, [field]: value }))
    }
  }

  const addTag = () => {
    if (newTag.trim() && !formData.group_tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        group_tags: [...prev.group_tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      group_tags: prev.group_tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.name.trim() && formData.description.trim() && formData.category)
      case 2:
        return !!(formData.london_borough && formData.meeting_frequency)
      case 3:
        return true // All fields in step 3 are optional
      default:
        return true
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateStep(1) || !validateStep(2)) {
      toast.error('Please fill in all required fields')
      return
    }

    setLoading(true)

    try {
      // Get current user (in real app, this would come from auth context)
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError || !user) {
        toast.error('Please log in to create a group')
        return
      }

      // Create the group
      const groupData = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        location: formData.location,
        london_borough: formData.london_borough,
        language_preference: formData.language_preference,
        portuguese_origin: formData.portuguese_origin,
        age_restrictions: formData.age_restrictions,
        meeting_frequency: formData.meeting_frequency,
        verification_level: formData.verification_level,
        max_members: formData.max_members,
        is_private: formData.is_private,
        rules: formData.rules,
        contact_info: formData.contact_info,
        cultural_focus: formData.cultural_focus,
        group_tags: formData.group_tags,
        group_type: 'interest' as const,
        created_by: user.id,
        current_member_count: 1, // Creator is automatically a member
        is_active: true
      }

      const { data: group, error } = await supabase
        .from('groups')
        .insert([groupData])
        .select()
        .single()

      if (error) throw error

      // Add creator as admin member
      await supabase
        .from('group_members')
        .insert([{
          group_id: group.id,
          user_id: user.id,
          role: 'admin'
        }])

      toast.success(t('group.create.success'))
      router.push(`/groups/${group.id}`)
    } catch (error: any) {
      console.error('Error creating group:', error)
      toast.error(error.message || t('group.create.error'))
    } finally {
      setLoading(false)
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1)
    } else {
      toast.error('Please fill in all required fields')
    }
  }

  const prevStep = () => {
    setCurrentStep(currentStep - 1)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('group.create.name')} *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., Portuguese Young Professionals London"
                maxLength={100}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('group.create.description')} *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Describe your group's purpose, activities, and what members can expect..."
                maxLength={500}
                required
              />
              <div className="text-sm text-gray-500 mt-1">
                {formData.description.length}/500 characters
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('group.create.category')} *
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {language === 'pt-pt' || language === 'pt-br' ? category.name_pt : category.name_en}
                    {category.is_age_restricted && category.min_age && ` (${category.min_age}+ only)`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('group.create.borough')} *
              </label>
              <select
                value={formData.london_borough}
                onChange={(e) => handleInputChange('london_borough', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              >
                <option value="">Select London borough</option>
                {LONDON_BOROUGHS.map((borough) => (
                  <option key={borough} value={borough}>{borough}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('group.create.location')}
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., Central London, specific venue, or area"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('group.create.meeting-frequency')} *
              </label>
              <select
                value={formData.meeting_frequency}
                onChange={(e) => handleInputChange('meeting_frequency', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              >
                <option value="weekly">{t('frequency.weekly')}</option>
                <option value="biweekly">{t('frequency.biweekly')}</option>
                <option value="monthly">{t('frequency.monthly')}</option>
                <option value="quarterly">{t('frequency.quarterly')}</option>
                <option value="irregular">{t('frequency.irregular')}</option>
                <option value="one-time">{t('frequency.one-time')}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('group.create.language')}
              </label>
              <select
                value={formData.language_preference}
                onChange={(e) => handleInputChange('language_preference', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="both">English & Portuguese</option>
                <option value="english">English primarily</option>
                <option value="portuguese">Portuguese primarily</option>
                <option value="pt-pt">Português (Portugal)</option>
                <option value="pt-br">Português (Brasil)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('group.create.portuguese-origin')}
              </label>
              <select
                value={formData.portuguese_origin}
                onChange={(e) => handleInputChange('portuguese_origin', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="any">{t('origin.any')}</option>
                <option value="portugal">{t('origin.portugal')}</option>
                <option value="brazil">{t('origin.brazil')}</option>
                <option value="angola">{t('origin.angola')}</option>
                <option value="mozambique">{t('origin.mozambique')}</option>
                <option value="cape-verde">{t('origin.cape-verde')}</option>
                <option value="guinea-bissau">{t('origin.guinea-bissau')}</option>
                <option value="sao-tome-principe">{t('origin.sao-tome-principe')}</option>
                <option value="east-timor">{t('origin.east-timor')}</option>
                <option value="macau">{t('origin.macau')}</option>
                <option value="equatorial-guinea">{t('origin.equatorial-guinea')}</option>
                <option value="mixed">{t('origin.mixed')}</option>
              </select>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                {t('group.create.age-restrictions')}
              </label>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Minimum Age</label>
                    <input
                      type="number"
                      value={formData.age_restrictions.min_age || ''}
                      onChange={(e) => handleInputChange('age_restrictions.min_age', e.target.value ? parseInt(e.target.value) : null)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500"
                      min="16"
                      max="99"
                      placeholder="18"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Maximum Age</label>
                    <input
                      type="number"
                      value={formData.age_restrictions.max_age || ''}
                      onChange={(e) => handleInputChange('age_restrictions.max_age', e.target.value ? parseInt(e.target.value) : null)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500"
                      min="16"
                      max="99"
                      placeholder="Optional"
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="families_welcome"
                    checked={formData.age_restrictions.families_welcome}
                    onChange={(e) => handleInputChange('age_restrictions.families_welcome', e.target.checked)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="families_welcome" className="ml-2 text-sm text-gray-700">
                    {t('age.families')}
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('group.create.verification-level')}
              </label>
              <select
                value={formData.verification_level}
                onChange={(e) => handleInputChange('verification_level', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="none">{t('verification.none')}</option>
                <option value="basic">{t('verification.basic')}</option>
                <option value="verified">{t('verification.verified')}</option>
                <option value="premium">{t('verification.premium')}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('group.create.max-members')}
              </label>
              <input
                type="number"
                value={formData.max_members || ''}
                onChange={(e) => handleInputChange('max_members', e.target.value ? parseInt(e.target.value) : null)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                min="2"
                max="500"
                placeholder="No limit"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_private"
                checked={formData.is_private}
                onChange={(e) => handleInputChange('is_private', e.target.checked)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label htmlFor="is_private" className="ml-2 text-sm text-gray-700">
                {t('group.create.private')} (requires approval to join)
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                {t('group.create.cultural-focus')}
              </label>
              <div className="space-y-2">
                {[
                  { key: 'preserves_heritage', label: 'Preserves Portuguese heritage & traditions' },
                  { key: 'family_friendly', label: 'Family-friendly activities' },
                  { key: 'traditional_activities', label: 'Traditional Portuguese activities (Fado, folklore, etc.)' },
                  { key: 'language_learning', label: 'Portuguese language learning & practice' }
                ].map((option) => (
                  <div key={option.key} className="flex items-center">
                    <input
                      type="checkbox"
                      id={option.key}
                      checked={formData.cultural_focus[option.key as keyof typeof formData.cultural_focus]}
                      onChange={(e) => handleInputChange(`cultural_focus.${option.key}`, e.target.checked)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor={option.key} className="ml-2 text-sm text-gray-700">
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('group.create.rules')}
              </label>
              <textarea
                value={formData.rules}
                onChange={(e) => handleInputChange('rules', e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Set clear expectations for group members..."
                maxLength={1000}
              />
              <div className="text-sm text-gray-500 mt-1">
                {formData.rules.length}/1000 characters
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                {t('group.create.contact')}
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  value={formData.contact_info.email}
                  onChange={(e) => handleInputChange('contact_info.email', e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Email"
                />
                <input
                  type="tel"
                  value={formData.contact_info.phone}
                  onChange={(e) => handleInputChange('contact_info.phone', e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Phone"
                />
                <input
                  type="text"
                  value={formData.contact_info.whatsapp}
                  onChange={(e) => handleInputChange('contact_info.whatsapp', e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="WhatsApp"
                />
                <input
                  type="text"
                  value={formData.contact_info.telegram}
                  onChange={(e) => handleInputChange('contact_info.telegram', e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Telegram"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Group Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.group_tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-primary-600 hover:text-primary-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Add a tag..."
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-primary-600 text-white rounded-r-lg hover:bg-primary-700"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="container-width px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-primary-50 text-primary-600 text-sm font-medium mb-4"
            >
              <UsersIcon className="w-4 h-4 mr-2" />
              {t('groups.title')}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl font-bold text-gray-900 mb-4"
            >
              {t('group.create.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600"
            >
              {t('group.create.subtitle')}
            </motion.p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step < currentStep
                        ? 'bg-primary-600 text-white'
                        : step === currentStep
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step < currentStep ? (
                      <CheckCircleIcon className="w-5 h-5" />
                    ) : (
                      step
                    )}
                  </div>
                  {step < 4 && (
                    <div
                      className={`w-16 h-1 ml-4 ${
                        step < currentStep ? 'bg-primary-600' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4 space-x-20 text-sm text-gray-600">
              <span>Basic Info</span>
              <span>Location</span>
              <span>Settings</span>
              <span>Details</span>
            </div>
          </div>

          {/* Form Content */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <form onSubmit={handleSubmit}>
              {renderStepContent()}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Previous
                  </button>
                )}
                <div className="ml-auto flex space-x-4">
                  {currentStep < 4 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!validateStep(currentStep)}
                      className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading || !validateStep(1) || !validateStep(2)}
                      className="px-8 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
                    >
                      {loading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      ) : (
                        <CheckCircleIcon className="w-5 h-5 mr-2" />
                      )}
                      {t('group.create.submit')}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </motion.div>

          {/* Safety Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4"
          >
            <div className="flex items-start">
              <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
              <div className="text-sm text-yellow-800">
                <p className="font-medium mb-1">Safety & Moderation</p>
                <p>
                  All groups are subject to review by our safety team. Groups must comply with our 
                  community guidelines and Portuguese community values. Inappropriate content will 
                  result in group removal.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}