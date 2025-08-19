'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, 
  Camera, 
  DollarSign, 
  FileText, 
  Check, 
  ArrowRight, 
  ArrowLeft,
  Upload,
  Eye,
  EyeOff,
  Globe,
  MapPin,
  Star,
  Shield,
  AlertCircle,
  Music,
  Coffee,
  BookOpen,
  Users,
  Video,
  Mic,
  Heart,
  Copy,
  RefreshCw
} from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { useSubscription } from '@/context/SubscriptionContext'
import { authService } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

interface CreatorApplicationData {
  // Step 1: Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  location: string
  nationality: string
  
  // Step 2: Content Information
  contentType: string[]
  culturalBackground: string[]
  preferredLanguage: string
  experienceLevel: string
  socialMediaFollowing: number
  contentDescription: string
  
  // Step 3: Business Information
  businessName?: string
  businessType: string
  taxNumber?: string
  businessAddress?: string
  bankAccountDetails?: string
  
  // Step 4: Verification
  profilePhoto?: File
  idDocument?: File
  businessDocument?: File
  
  // Agreement
  agreesToTerms: boolean
  agreesToRevenueSplit: boolean
  marketingConsent: boolean
}

interface CreatorApplicationFormProps {
  onClose: () => void
  onComplete: (streamKey: string) => void
}

export default function CreatorApplicationForm({ onClose, onComplete }: CreatorApplicationFormProps) {
  const { language, t } = useLanguage()
  const { subscription } = useSubscription()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showStreamKey, setShowStreamKey] = useState(false)
  const [generatedStreamKey, setGeneratedStreamKey] = useState('')
  
  const [formData, setFormData] = useState<CreatorApplicationData>({
    firstName: '',
    lastName: '',
    email: authService.getCurrentUser()?.email || '',
    phone: '',
    dateOfBirth: '',
    location: '',
    nationality: '',
    contentType: [],
    culturalBackground: [],
    preferredLanguage: 'pt',
    experienceLevel: 'beginner',
    socialMediaFollowing: 0,
    contentDescription: '',
    businessName: '',
    businessType: 'individual',
    taxNumber: '',
    businessAddress: '',
    bankAccountDetails: '',
    agreesToTerms: false,
    agreesToRevenueSplit: false,
    marketingConsent: false
  })

  const isPt = language === 'pt'

  const contentCategories = [
    {
      id: 'music',
      icon: Music,
      name: isPt ? 'Música & Fado' : 'Music & Fado',
      description: isPt ? 'Performances musicais, noites de fado' : 'Musical performances, fado nights'
    },
    {
      id: 'cooking',
      icon: Coffee,
      name: isPt ? 'Culinária' : 'Cooking',
      description: isPt ? 'Receitas e workshops gastronómicos' : 'Recipes and culinary workshops'
    },
    {
      id: 'language',
      icon: BookOpen,
      name: isPt ? 'Língua & Cultura' : 'Language & Culture',
      description: isPt ? 'Aulas de português e cultura' : 'Portuguese lessons and culture'
    },
    {
      id: 'community',
      icon: Users,
      name: isPt ? 'Comunidade & Eventos' : 'Community & Events',
      description: isPt ? 'Encontros comunitários' : 'Community meetups'
    },
    {
      id: 'business',
      icon: DollarSign,
      name: isPt ? 'Negócios' : 'Business',
      description: isPt ? 'Workshops empresariais' : 'Business workshops'
    },
    {
      id: 'entertainment',
      icon: Video,
      name: isPt ? 'Entretenimento' : 'Entertainment',
      description: isPt ? 'Conversas e entretenimento' : 'Talks and entertainment'
    }
  ]

  const culturalRegions = [
    { id: 'portugal', name: isPt ? 'Portugal Continental' : 'Mainland Portugal', flag: '🇵🇹' },
    { id: 'azores', name: isPt ? 'Açores' : 'Azores', flag: '🇵🇹' },
    { id: 'madeira', name: isPt ? 'Madeira' : 'Madeira', flag: '🇵🇹' },
    { id: 'brazil', name: isPt ? 'Brasil' : 'Brazil', flag: '🇧🇷' },
    { id: 'angola', name: 'Angola', flag: '🇦🇴' },
    { id: 'mozambique', name: 'Moçambique', flag: '🇲🇿' },
    { id: 'caboverde', name: isPt ? 'Cabo Verde' : 'Cape Verde', flag: '🇨🇻' },
    { id: 'guineabissau', name: isPt ? 'Guiné-Bissau' : 'Guinea-Bissau', flag: '🇬🇼' },
    { id: 'saotome', name: isPt ? 'São Tomé e Príncipe' : 'São Tomé and Príncipe', flag: '🇸🇹' },
    { id: 'timor', name: isPt ? 'Timor-Leste' : 'East Timor', flag: '🇹🇱' },
    { id: 'diaspora', name: isPt ? 'Diáspora Global' : 'Global Diaspora', flag: '🌍' }
  ]

  const experienceLevels = [
    { 
      id: 'beginner', 
      name: isPt ? 'Principiante' : 'Beginner',
      description: isPt ? 'Novo em streaming/criação de conteúdo' : 'New to streaming/content creation'
    },
    { 
      id: 'intermediate', 
      name: isPt ? 'Intermédio' : 'Intermediate',
      description: isPt ? 'Alguma experiência com plataformas digitais' : 'Some experience with digital platforms'
    },
    { 
      id: 'experienced', 
      name: isPt ? 'Experiente' : 'Experienced',
      description: isPt ? 'Experiência significativa em criação de conteúdo' : 'Significant content creation experience'
    },
    { 
      id: 'professional', 
      name: isPt ? 'Profissional' : 'Professional',
      description: isPt ? 'Criador profissional/influenciador' : 'Professional creator/influencer'
    }
  ]

  const businessTypes = [
    { 
      id: 'individual', 
      name: isPt ? 'Pessoa Singular' : 'Individual',
      description: isPt ? 'Criador individual' : 'Individual creator'
    },
    { 
      id: 'company', 
      name: isPt ? 'Empresa' : 'Company',
      description: isPt ? 'Empresa registada' : 'Registered company'
    },
    { 
      id: 'partnership', 
      name: isPt ? 'Parceria' : 'Partnership',
      description: isPt ? 'Parceria de negócios' : 'Business partnership'
    },
    { 
      id: 'nonprofit', 
      name: isPt ? 'Organização sem fins lucrativos' : 'Non-profit',
      description: isPt ? 'Organização cultural/comunitária' : 'Cultural/community organization'
    }
  ]

  const handleInputChange = (field: keyof CreatorApplicationData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleArrayFieldToggle = (field: 'contentType' | 'culturalBackground', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }))
  }

  const handleFileUpload = (field: 'profilePhoto' | 'idDocument' | 'businessDocument', file: File) => {
    setFormData(prev => ({ ...prev, [field]: file }))
  }

  const generateStreamKey = async (): Promise<string> => {
    // Generate a unique stream key
    const keyLength = 32
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = 'sk_'
    
    for (let i = 0; i < keyLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    
    return result
  }

  const uploadFile = async (file: File, bucket: string, path: string): Promise<string | null> => {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(path, file, {
          cacheControl: '3600',
          upsert: true
        })

      if (error) {
        console.error('File upload error:', error)
        return null
      }

      const { data: publicUrl } = supabase.storage
        .from(bucket)
        .getPublicUrl(path)

      return publicUrl.publicUrl
    } catch (error) {
      console.error('File upload error:', error)
      return null
    }
  }

  const submitApplication = async () => {
    setIsSubmitting(true)
    
    try {
      const user = authService.getCurrentUser()
      if (!user) {
        throw new Error('User must be logged in')
      }

      // Generate stream key
      const streamKey = await generateStreamKey()
      setGeneratedStreamKey(streamKey)

      // Upload files
      let profilePhotoUrl = null
      let idDocumentUrl = null
      let businessDocumentUrl = null

      if (formData.profilePhoto) {
        profilePhotoUrl = await uploadFile(
          formData.profilePhoto,
          'creator-documents',
          `${user.id}/profile-photo-${Date.now()}.${formData.profilePhoto.name.split('.').pop()}`
        )
      }

      if (formData.idDocument) {
        idDocumentUrl = await uploadFile(
          formData.idDocument,
          'creator-documents',
          `${user.id}/id-document-${Date.now()}.${formData.idDocument.name.split('.').pop()}`
        )
      }

      if (formData.businessDocument) {
        businessDocumentUrl = await uploadFile(
          formData.businessDocument,
          'creator-documents',
          `${user.id}/business-document-${Date.now()}.${formData.businessDocument.name.split('.').pop()}`
        )
      }

      // Create creator profile
      const { error: profileError } = await supabase
        .from('creator_profiles')
        .insert({
          user_id: user.id,
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          date_of_birth: formData.dateOfBirth,
          location: formData.location,
          nationality: formData.nationality,
          content_types: formData.contentType,
          cultural_background: formData.culturalBackground,
          preferred_language: formData.preferredLanguage,
          experience_level: formData.experienceLevel,
          social_media_following: formData.socialMediaFollowing,
          content_description: formData.contentDescription,
          business_name: formData.businessName,
          business_type: formData.businessType,
          tax_number: formData.taxNumber,
          business_address: formData.businessAddress,
          bank_account_details: formData.bankAccountDetails,
          profile_photo_url: profilePhotoUrl,
          id_document_url: idDocumentUrl,
          business_document_url: businessDocumentUrl,
          stream_key: streamKey,
          application_status: 'pending',
          agreed_to_terms: formData.agreesToTerms,
          agreed_to_revenue_split: formData.agreesToRevenueSplit,
          marketing_consent: formData.marketingConsent
        })

      if (profileError) {
        throw profileError
      }

      // Enable streaming for user
      const { error: settingsError } = await supabase
        .from('user_streaming_settings')
        .upsert({
          user_id: user.id,
          can_stream: true,
          verified_streamer: false, // Will be set to true after manual approval
          preferred_language: formData.preferredLanguage,
          cultural_background: formData.culturalBackground[0] || 'diaspora',
          target_audience: formData.culturalBackground,
          donations_enabled: true,
          subscriptions_enabled: true
        })

      if (settingsError) {
        throw settingsError
      }

      toast.success(
        isPt 
          ? 'Candidatura submetida com sucesso! Receberá uma resposta em 24-48 horas.'
          : 'Application submitted successfully! You will receive a response within 24-48 hours.'
      )

      setCurrentStep(5) // Show success step with stream key
      onComplete(streamKey)
    } catch (error) {
      console.error('Error submitting application:', error)
      toast.error(
        isPt 
          ? 'Erro ao submeter candidatura. Tente novamente.'
          : 'Error submitting application. Please try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const copyStreamKey = () => {
    navigator.clipboard.writeText(generatedStreamKey)
    toast.success(isPt ? 'Chave copiada!' : 'Stream key copied!')
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && 
               formData.phone && formData.dateOfBirth && formData.location && formData.nationality
      case 2:
        return formData.contentType.length > 0 && formData.culturalBackground.length > 0 &&
               formData.contentDescription.length > 50
      case 3:
        return formData.businessType !== ''
      case 4:
        return formData.agreesToTerms && formData.agreesToRevenueSplit
      default:
        return true
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5))
    } else {
      toast.error(
        isPt 
          ? 'Por favor preencha todos os campos obrigatórios'
          : 'Please fill in all required fields'
      )
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">
                {isPt ? 'Candidatura de Criador' : 'Creator Application'}
              </h2>
              <p className="text-primary-100">
                {isPt ? 'Junte-se ao programa de criadores LusoTown' : 'Join the LusoTown creator program'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-primary-200 text-2xl font-bold"
            >
              ×
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-primary-100">
                {isPt ? 'Progresso' : 'Progress'}: {currentStep}/5
              </span>
              <span className="text-sm text-primary-100">
                {Math.round((currentStep / 5) * 100)}%
              </span>
            </div>
            <div className="w-full bg-primary-500 rounded-full h-2">
              <motion.div
                className="bg-white rounded-full h-2"
                initial={{ width: '20%' }}
                animate={{ width: `${(currentStep / 5) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <AnimatePresence mode="wait">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <User className="w-12 h-12 text-primary-600 mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-gray-900">
                    {isPt ? 'Informações Pessoais' : 'Personal Information'}
                  </h3>
                  <p className="text-gray-600">
                    {isPt ? 'Conte-nos sobre si' : 'Tell us about yourself'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isPt ? 'Primeiro Nome' : 'First Name'} *
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder={isPt ? 'Seu primeiro nome' : 'Your first name'}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isPt ? 'Último Nome' : 'Last Name'} *
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder={isPt ? 'Seu último nome' : 'Your last name'}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50"
                      disabled
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isPt ? 'Telefone' : 'Phone'} *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="+44 7XXX XXXXXX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isPt ? 'Data de Nascimento' : 'Date of Birth'} *
                    </label>
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isPt ? 'Localização' : 'Location'} *
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder={isPt ? 'Londres, Reino Unido' : 'London, UK'}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isPt ? 'Nacionalidade' : 'Nationality'} *
                    </label>
                    <select
                      value={formData.nationality}
                      onChange={(e) => handleInputChange('nationality', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">{isPt ? 'Selecione...' : 'Select...'}</option>
                      <option value="portuguese">🇵🇹 {isPt ? 'Portuguesa' : 'Portuguese'}</option>
                      <option value="brazilian">🇧🇷 {isPt ? 'Brasileira' : 'Brazilian'}</option>
                      <option value="angolan">🇦🇴 {isPt ? 'Angolana' : 'Angolan'}</option>
                      <option value="mozambican">🇲🇿 {isPt ? 'Moçambicana' : 'Mozambican'}</option>
                      <option value="capeverdean">🇨🇻 {isPt ? 'Cabo-verdiana' : 'Cape Verdean'}</option>
                      <option value="other">{isPt ? 'Outra' : 'Other'}</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Content Information */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <Camera className="w-12 h-12 text-primary-600 mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-gray-900">
                    {isPt ? 'Informações sobre Conteúdo' : 'Content Information'}
                  </h3>
                  <p className="text-gray-600">
                    {isPt ? 'Que tipo de conteúdo pretende criar?' : 'What type of content do you plan to create?'}
                  </p>
                </div>

                {/* Content Categories */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    {isPt ? 'Categorias de Conteúdo' : 'Content Categories'} *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {contentCategories.map((category) => (
                      <div
                        key={category.id}
                        onClick={() => handleArrayFieldToggle('contentType', category.id)}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          formData.contentType.includes(category.id)
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            formData.contentType.includes(category.id)
                              ? 'bg-primary-600 text-white'
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            <category.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{category.name}</h4>
                            <p className="text-sm text-gray-600">{category.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cultural Background */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    {isPt ? 'Herança Cultural' : 'Cultural Heritage'} *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {culturalRegions.map((region) => (
                      <div
                        key={region.id}
                        onClick={() => handleArrayFieldToggle('culturalBackground', region.id)}
                        className={`p-3 rounded-lg border-2 cursor-pointer transition-all text-center ${
                          formData.culturalBackground.includes(region.id)
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-2xl mb-1">{region.flag}</div>
                        <div className="text-sm font-medium text-gray-900">{region.name}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Other fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isPt ? 'Língua Preferida' : 'Preferred Language'} *
                    </label>
                    <select
                      value={formData.preferredLanguage}
                      onChange={(e) => handleInputChange('preferredLanguage', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="pt">{isPt ? 'Português' : 'Portuguese'}</option>
                      <option value="en">{isPt ? 'Inglês' : 'English'}</option>
                      <option value="pt-BR">{isPt ? 'Português Brasileiro' : 'Brazilian Portuguese'}</option>
                      <option value="pt-PT">{isPt ? 'Português Europeu' : 'European Portuguese'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isPt ? 'Nível de Experiência' : 'Experience Level'} *
                    </label>
                    <select
                      value={formData.experienceLevel}
                      onChange={(e) => handleInputChange('experienceLevel', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      {experienceLevels.map((level) => (
                        <option key={level.id} value={level.id}>
                          {level.name} - {level.description}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isPt ? 'Seguidores em Redes Sociais' : 'Social Media Following'}
                    </label>
                    <input
                      type="number"
                      value={formData.socialMediaFollowing}
                      onChange={(e) => handleInputChange('socialMediaFollowing', parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isPt ? 'Descrição do Conteúdo' : 'Content Description'} *
                  </label>
                  <textarea
                    value={formData.contentDescription}
                    onChange={(e) => handleInputChange('contentDescription', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder={isPt 
                      ? 'Descreva o tipo de conteúdo que pretende criar, o seu público-alvo, e como planeia envolver a comunidade portuguesa...'
                      : 'Describe the type of content you plan to create, your target audience, and how you plan to engage the Portuguese community...'
                    }
                  />
                  <div className="text-sm text-gray-500 mt-1">
                    {formData.contentDescription.length}/500 {isPt ? 'caracteres' : 'characters'} 
                    {formData.contentDescription.length < 50 && (
                      <span className="text-red-500"> ({isPt ? 'mínimo 50' : 'minimum 50'})</span>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Business Information */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <DollarSign className="w-12 h-12 text-primary-600 mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-gray-900">
                    {isPt ? 'Informações de Negócio' : 'Business Information'}
                  </h3>
                  <p className="text-gray-600">
                    {isPt ? 'Detalhes para pagamentos e impostos' : 'Details for payments and taxes'}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    {isPt ? 'Tipo de Negócio' : 'Business Type'} *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {businessTypes.map((type) => (
                      <div
                        key={type.id}
                        onClick={() => handleInputChange('businessType', type.id)}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          formData.businessType === type.id
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <h4 className="font-medium text-gray-900">{type.name}</h4>
                        <p className="text-sm text-gray-600">{type.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.businessType !== 'individual' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {isPt ? 'Nome da Empresa' : 'Business Name'}
                        </label>
                        <input
                          type="text"
                          value={formData.businessName}
                          onChange={(e) => handleInputChange('businessName', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder={isPt ? 'Nome oficial da empresa' : 'Official business name'}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {isPt ? 'Número de Contribuinte' : 'Tax Number'}
                        </label>
                        <input
                          type="text"
                          value={formData.taxNumber}
                          onChange={(e) => handleInputChange('taxNumber', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder={isPt ? 'NIF/VAT número' : 'VAT/Tax number'}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {isPt ? 'Morada da Empresa' : 'Business Address'}
                        </label>
                        <textarea
                          value={formData.businessAddress}
                          onChange={(e) => handleInputChange('businessAddress', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder={isPt ? 'Morada completa da empresa' : 'Complete business address'}
                        />
                      </div>
                    </>
                  )}

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isPt ? 'Detalhes da Conta Bancária' : 'Bank Account Details'}
                    </label>
                    <textarea
                      value={formData.bankAccountDetails}
                      onChange={(e) => handleInputChange('bankAccountDetails', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder={isPt 
                        ? 'Nome do banco, IBAN, nome do titular (será encriptado)'
                        : 'Bank name, IBAN, account holder name (will be encrypted)'
                      }
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {isPt 
                        ? '🔒 Estas informações são encriptadas e seguras'
                        : '🔒 This information is encrypted and secure'}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Verification & Agreement */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <Shield className="w-12 h-12 text-primary-600 mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-gray-900">
                    {isPt ? 'Verificação e Acordos' : 'Verification & Agreements'}
                  </h3>
                  <p className="text-gray-600">
                    {isPt ? 'Documentos e termos finais' : 'Documents and final terms'}
                  </p>
                </div>

                {/* File Uploads */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isPt ? 'Foto de Perfil' : 'Profile Photo'} {isPt ? '(Recomendado)' : '(Recommended)'}
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload('profilePhoto', e.target.files[0])}
                        className="hidden"
                        id="profile-photo"
                      />
                      <label
                        htmlFor="profile-photo"
                        className="cursor-pointer flex flex-col items-center gap-2"
                      >
                        <Upload className="w-8 h-8 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {formData.profilePhoto 
                            ? formData.profilePhoto.name
                            : (isPt ? 'Carregar foto de perfil' : 'Upload profile photo')
                          }
                        </span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isPt ? 'Documento de Identificação' : 'ID Document'} {isPt ? '(Obrigatório)' : '(Required)'}
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload('idDocument', e.target.files[0])}
                        className="hidden"
                        id="id-document"
                      />
                      <label
                        htmlFor="id-document"
                        className="cursor-pointer flex flex-col items-center gap-2"
                      >
                        <Upload className="w-8 h-8 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {formData.idDocument 
                            ? formData.idDocument.name
                            : (isPt ? 'Carregar documento de identificação' : 'Upload ID document')
                          }
                        </span>
                      </label>
                    </div>
                  </div>

                  {formData.businessType !== 'individual' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {isPt ? 'Documentos da Empresa' : 'Business Documents'} {isPt ? '(Obrigatório)' : '(Required)'}
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => e.target.files?.[0] && handleFileUpload('businessDocument', e.target.files[0])}
                          className="hidden"
                          id="business-document"
                        />
                        <label
                          htmlFor="business-document"
                          className="cursor-pointer flex flex-col items-center gap-2"
                        >
                          <Upload className="w-8 h-8 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {formData.businessDocument 
                              ? formData.businessDocument.name
                              : (isPt ? 'Carregar documentos da empresa' : 'Upload business documents')
                            }
                          </span>
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                {/* Agreements */}
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">
                      {isPt ? 'Acordo de Receitas (85/15)' : 'Revenue Share Agreement (85/15)'}
                    </h4>
                    <div className="text-sm text-gray-600 space-y-2">
                      <p>
                        {isPt 
                          ? '• Receberá 85% de todas as receitas geradas (doações, subscrições, workshops)'
                          : '• You receive 85% of all revenue generated (donations, subscriptions, workshops)'
                        }
                      </p>
                      <p>
                        {isPt 
                          ? '• LusoTown fica com 15% para manutenção da plataforma e processamento de pagamentos'
                          : '• LusoTown keeps 15% for platform maintenance and payment processing'
                        }
                      </p>
                      <p>
                        {isPt 
                          ? '• Pagamentos mensais processados até ao 5º dia útil'
                          : '• Monthly payments processed by the 5th business day'
                        }
                      </p>
                      <p>
                        {isPt 
                          ? '• Suporte a múltiplas moedas (EUR, GBP, BRL)'
                          : '• Multi-currency support (EUR, GBP, BRL)'
                        }
                      </p>
                    </div>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.agreesToRevenueSplit}
                      onChange={(e) => handleInputChange('agreesToRevenueSplit', e.target.checked)}
                      className="mt-1 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">
                      {isPt 
                        ? 'Aceito o acordo de divisão de receitas 85/15 *'
                        : 'I agree to the 85/15 revenue split agreement *'
                      }
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.agreesToTerms}
                      onChange={(e) => handleInputChange('agreesToTerms', e.target.checked)}
                      className="mt-1 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">
                      {isPt 
                        ? 'Aceito os termos e condições do programa de criadores LusoTown *'
                        : 'I agree to the LusoTown creator program terms and conditions *'
                      }
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.marketingConsent}
                      onChange={(e) => handleInputChange('marketingConsent', e.target.checked)}
                      className="mt-1 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">
                      {isPt 
                        ? 'Aceito receber comunicações de marketing sobre o programa de criadores'
                        : 'I consent to receive marketing communications about the creator program'
                      }
                    </span>
                  </label>
                </div>
              </motion.div>
            )}

            {/* Step 5: Success & Stream Key */}
            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6"
              >
                <div className="bg-green-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto">
                  <Check className="w-10 h-10 text-green-600" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {isPt ? 'Candidatura Submetida!' : 'Application Submitted!'}
                  </h3>
                  <p className="text-gray-600">
                    {isPt 
                      ? 'A sua candidatura foi submetida com sucesso. Receberá uma resposta em 24-48 horas.'
                      : 'Your application has been submitted successfully. You will receive a response within 24-48 hours.'
                    }
                  </p>
                </div>

                {generatedStreamKey && (
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-medium text-gray-900 mb-3">
                      {isPt ? 'A Sua Chave de Stream' : 'Your Stream Key'}
                    </h4>
                    <div className="flex items-center gap-2 mb-2">
                      <input
                        type={showStreamKey ? 'text' : 'password'}
                        value={generatedStreamKey}
                        readOnly
                        className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg font-mono text-sm"
                      />
                      <button
                        onClick={() => setShowStreamKey(!showStreamKey)}
                        className="p-2 text-gray-500 hover:text-gray-700"
                      >
                        {showStreamKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                      <button
                        onClick={copyStreamKey}
                        className="p-2 text-gray-500 hover:text-gray-700"
                      >
                        <Copy className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">
                      {isPt 
                        ? '🔒 Mantenha esta chave segura. Será necessária para fazer streaming.'
                        : '🔒 Keep this key secure. You will need it to start streaming.'
                      }
                    </p>
                  </div>
                )}

                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-800 text-left">
                      <p className="font-medium mb-1">
                        {isPt ? 'Próximos Passos:' : 'Next Steps:'}
                      </p>
                      <ul className="space-y-1">
                        <li>
                          {isPt 
                            ? '1. Aguarde a aprovação da candidatura (24-48h)'
                            : '1. Wait for application approval (24-48h)'
                          }
                        </li>
                        <li>
                          {isPt 
                            ? '2. Configure o seu software de streaming com a chave'
                            : '2. Configure your streaming software with the key'
                          }
                        </li>
                        <li>
                          {isPt 
                            ? '3. Participe na sessão de orientação para criadores'
                            : '3. Attend the creator orientation session'
                          }
                        </li>
                        <li>
                          {isPt 
                            ? '4. Comece a fazer streaming e a ganhar dinheiro!'
                            : '4. Start streaming and earning money!'
                          }
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors"
                >
                  {isPt ? 'Fechar' : 'Close'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        {currentStep < 5 && (
          <div className="border-t border-gray-200 p-6">
            <div className="flex justify-between">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentStep === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                {isPt ? 'Anterior' : 'Previous'}
              </button>

              {currentStep === 4 ? (
                <button
                  onClick={submitApplication}
                  disabled={!validateStep(currentStep) || isSubmitting}
                  className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-colors ${
                    validateStep(currentStep) && !isSubmitting
                      ? 'bg-primary-600 hover:bg-primary-700 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      {isPt ? 'A submeter...' : 'Submitting...'}
                    </>
                  ) : (
                    <>
                      {isPt ? 'Submeter Candidatura' : 'Submit Application'}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={nextStep}
                  disabled={!validateStep(currentStep)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    validateStep(currentStep)
                      ? 'bg-primary-600 hover:bg-primary-700 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isPt ? 'Próximo' : 'Next'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}