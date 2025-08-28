'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import {
  AcademicCapIcon,
  UserIcon,
  BuildingOffice2Icon,
  GlobeEuropeAfricaIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckBadgeIcon,
  FlagIcon,
  HeartIcon,
  BriefcaseIcon,
  HomeIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import {
  CheckCircleIcon as CheckCircleIconSolid,
  AcademicCapIcon as AcademicCapIconSolid
} from '@heroicons/react/24/solid'
import { UNIVERSITY_PARTNERSHIPS, getUniversityById } from '@/config/universities'

interface StudentOnboardingData {
  firstName: string
  lastName: string
  email: string
  universityId: string
  studentId: string
  studyLevel: 'undergraduate' | 'postgraduate' | 'phd' | 'exchange'
  studyYear: string
  course: string
  portugueseLevel: 'native' | 'fluent' | 'intermediate' | 'beginner'
  countryOfOrigin: string
  interests: string[]
  needsAccommodation: boolean
  needsJobSupport: boolean
  wantsNetworking: boolean
  preferredLanguage: 'pt' | 'en' | 'both'
}

const INITIAL_DATA: StudentOnboardingData = {
  firstName: '',
  lastName: '',
  email: '',
  universityId: '',
  studentId: '',
  studyLevel: 'undergraduate',
  studyYear: '',
  course: '',
  portugueseLevel: 'intermediate',
  countryOfOrigin: '',
  interests: [],
  needsAccommodation: false,
  needsJobSupport: false,
  wantsNetworking: false,
  preferredLanguage: 'both'
}

const STUDY_LEVELS = [
  { value: 'undergraduate', label: 'Undergraduate', labelPt: 'Licenciatura' },
  { value: 'postgraduate', label: 'Postgraduate', labelPt: 'Pós-graduação' },
  { value: 'phd', label: 'PhD', labelPt: 'Doutoramento' },
  { value: 'exchange', label: 'Exchange Student', labelPt: 'Estudante Erasmus' }
]

const PORTUGUESE_LEVELS = [
  { value: 'native', label: 'Native Speaker', labelPt: 'Nativo' },
  { value: 'fluent', label: 'Fluent', labelPt: 'Fluente' },
  { value: 'intermediate', label: 'Intermediate', labelPt: 'Intermédio' },
  { value: 'beginner', label: 'Beginner', labelPt: 'Iniciante' }
]

const LUSOPHONE_COUNTRIES = [
  { value: 'portugal', label: 'Portugal', flag: '🇵🇹' },
  { value: 'brazil', label: 'Brazil', labelPt: 'Brasil', flag: '🇧🇷' },
  { value: 'angola', label: 'Angola', flag: '🇦🇴' },
  { value: 'cape_verde', label: 'Cape Verde', labelPt: 'Cabo Verde', flag: '🇨🇻' },
  { value: 'mozambique', label: 'Mozambique', labelPt: 'Moçambique', flag: '🇲🇿' },
  { value: 'guinea_bissau', label: 'Guinea-Bissau', labelPt: 'Guiné-Bissau', flag: '🇬🇼' },
  { value: 'sao_tome', label: 'São Tomé and Príncipe', labelPt: 'São Tomé e Príncipe', flag: '🇸🇹' },
  { value: 'east_timor', label: 'East Timor', labelPt: 'Timor-Leste', flag: '🇹🇱' },
  { value: 'other', label: 'Other', labelPt: 'Outro', flag: '🌍' }
]

const STUDENT_INTERESTS = [
  { value: 'cultural-events', label: 'Portuguese Cultural Events', labelPt: 'Eventos Culturais Portugueses', icon: <FlagIcon className="w-5 h-5" /> },
  { value: 'study-groups', label: 'Study Groups', labelPt: 'Grupos de Estudo', icon: <AcademicCapIcon className="w-5 h-5" /> },
  { value: 'career', label: 'Career Development', labelPt: 'Desenvolvimento Profissional', icon: <BriefcaseIcon className="w-5 h-5" /> },
  { value: 'language-exchange', label: 'Language Exchange', labelPt: 'Intercâmbio de Línguas', icon: <ChatBubbleLeftRightIcon className="w-5 h-5" /> },
  { value: 'sports', label: 'Sports & Recreation', labelPt: 'Desporto e Recreação', icon: <HeartIcon className="w-5 h-5" /> },
  { value: 'accommodation', label: 'Housing Support', labelPt: 'Apoio Habitacional', icon: <HomeIcon className="w-5 h-5" /> },
  { value: 'networking', label: 'Professional Networking', labelPt: 'Networking Profissional', icon: <UserGroupIcon className="w-5 h-5" /> },
  { value: 'mentorship', label: 'Mentorship Programs', labelPt: 'Programas de Mentoria', icon: <SparklesIcon className="w-5 h-5" /> }
]

export default function StudentOnboardingFlow() {
  const { t, language } = useLanguage()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<StudentOnboardingData>(INITIAL_DATA)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  const totalSteps = 5

  const updateFormData = (field: keyof StudentOnboardingData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {}

    switch (step) {
      case 1:
        if (!formData.firstName.trim()) errors.firstName = 'First name is required'
        if (!formData.lastName.trim()) errors.lastName = 'Last name is required'
        if (!formData.email.trim()) errors.email = 'Email is required'
        else if (!formData.email.includes('@')) errors.email = 'Please enter a valid email address'
        break
      
      case 2:
        if (!formData.universityId) errors.universityId = 'Please select your university'
        if (!formData.studentId.trim()) errors.studentId = 'Student ID is required'
        break
      
      case 3:
        if (!formData.course.trim()) errors.course = 'Please enter your course/programme'
        if (!formData.studyYear.trim()) errors.studyYear = 'Study year is required'
        break
      
      case 4:
        if (!formData.countryOfOrigin) errors.countryOfOrigin = 'Please select your country of origin'
        break
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps))
    }
  }

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch('/api/students/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (result.success) {
        setSubmitSuccess(true)
      } else {
        setSubmitError(result.error || 'Failed to complete onboarding')
      }
    } catch (error) {
      console.error('Onboarding error:', error)
      setSubmitError('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return renderPersonalInfo()
      case 2:
        return renderUniversityInfo()
      case 3:
        return renderAcademicInfo()
      case 4:
        return renderCulturalInfo()
      case 5:
        return renderPreferencesInfo()
      default:
        return null
    }
  }

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full mb-4">
          <UserIcon className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {language === 'pt' ? 'Informações Pessoais' : 'Personal Information'}
        </h2>
        <p className="text-gray-600">
          {language === 'pt' 
            ? 'Vamos começar com as suas informações básicas'
            : "Let's start with your basic information"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'pt' ? 'Primeiro Nome' : 'First Name'}
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => updateFormData('firstName', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              validationErrors.firstName ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder={language === 'pt' ? 'João' : 'John'}
          />
          {validationErrors.firstName && (
            <p className="text-red-600 text-sm mt-1">{validationErrors.firstName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'pt' ? 'Apelido' : 'Last Name'}
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => updateFormData('lastName', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              validationErrors.lastName ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder={language === 'pt' ? 'Silva' : 'Smith'}
          />
          {validationErrors.lastName && (
            <p className="text-red-600 text-sm mt-1">{validationErrors.lastName}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {language === 'pt' ? 'Email da Universidade' : 'University Email'}
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData('email', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
            validationErrors.email ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder={language === 'pt' ? 'seu.email@universidade.ac.uk' : 'your.email@university.ac.uk'}
        />
        {validationErrors.email && (
          <p className="text-red-600 text-sm mt-1">{validationErrors.email}</p>
        )}
        <p className="text-sm text-gray-500 mt-2">
          {language === 'pt' 
            ? 'Use o seu email oficial da universidade para verificação'
            : 'Use your official university email for verification'}
        </p>
      </div>
    </div>
  )

  const renderUniversityInfo = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-full mb-4">
          <BuildingOffice2Icon className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {language === 'pt' ? 'Informações da Universidade' : 'University Information'}
        </h2>
        <p className="text-gray-600">
          {language === 'pt' 
            ? 'Selecione a sua universidade e forneça o seu número de estudante'
            : 'Select your university and provide your student details'}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {language === 'pt' ? 'Universidade' : 'University'}
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {UNIVERSITY_PARTNERSHIPS.map((uni) => (
            <button
              key={uni.id}
              onClick={() => updateFormData('universityId', uni.id)}
              className={`p-4 border-2 rounded-lg text-left transition-all duration-200 ${
                formData.universityId === uni.id
                  ? 'border-primary-500 bg-primary-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${
                  formData.universityId === uni.id ? 'bg-primary-100' : 'bg-gray-100'
                }`}>
                  <AcademicCapIcon className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{uni.shortName}</h4>
                  <p className="text-sm text-gray-600 mb-2">{uni.name}</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded-full">
                      {uni.portugueseStudents} Portuguese students
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full capitalize ${
                      uni.partnershipLevel === 'strategic' ? 'bg-green-100 text-green-800' :
                      uni.partnershipLevel === 'official' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {uni.partnershipLevel}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
        {validationErrors.universityId && (
          <p className="text-red-600 text-sm mt-2">{validationErrors.universityId}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {language === 'pt' ? 'Número de Estudante' : 'Student ID Number'}
        </label>
        <input
          type="text"
          value={formData.studentId}
          onChange={(e) => updateFormData('studentId', e.target.value.toUpperCase())}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
            validationErrors.studentId ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="ABC123456"
        />
        {validationErrors.studentId && (
          <p className="text-red-600 text-sm mt-1">{validationErrors.studentId}</p>
        )}
      </div>
    </div>
  )

  const renderAcademicInfo = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent-500 to-premium-500 rounded-full mb-4">
          <AcademicCapIconSolid className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {language === 'pt' ? 'Informações Académicas' : 'Academic Information'}
        </h2>
        <p className="text-gray-600">
          {language === 'pt' 
            ? 'Conte-nos sobre os seus estudos'
            : 'Tell us about your studies'}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {language === 'pt' ? 'Nível de Estudo' : 'Study Level'}
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STUDY_LEVELS.map((level) => (
            <button
              key={level.value}
              onClick={() => updateFormData('studyLevel', level.value)}
              className={`p-3 border-2 rounded-lg text-center transition-all duration-200 ${
                formData.studyLevel === level.value
                  ? 'border-primary-500 bg-primary-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-sm font-medium text-gray-900">
                {language === 'pt' ? level.labelPt : level.label}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'pt' ? 'Ano de Estudo' : 'Study Year'}
          </label>
          <input
            type="text"
            value={formData.studyYear}
            onChange={(e) => updateFormData('studyYear', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              validationErrors.studyYear ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder={language === 'pt' ? '1º Ano, 2º Ano, Final...' : '1st Year, 2nd Year, Final...'}
          />
          {validationErrors.studyYear && (
            <p className="text-red-600 text-sm mt-1">{validationErrors.studyYear}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'pt' ? 'Curso/Programa' : 'Course/Programme'}
          </label>
          <input
            type="text"
            value={formData.course}
            onChange={(e) => updateFormData('course', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              validationErrors.course ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder={language === 'pt' ? 'Engenharia, Medicina, Direito...' : 'Engineering, Medicine, Law...'}
          />
          {validationErrors.course && (
            <p className="text-red-600 text-sm mt-1">{validationErrors.course}</p>
          )}
        </div>
      </div>
    </div>
  )

  const renderCulturalInfo = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-premium-500 to-primary-500 rounded-full mb-4">
          <GlobeEuropeAfricaIcon className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {language === 'pt' ? 'Contexto Cultural' : 'Cultural Background'}
        </h2>
        <p className="text-gray-600">
          {language === 'pt' 
            ? 'Conecte-se com a comunidade lusófona'
            : 'Connect with the Portuguese-speaking community'}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {language === 'pt' ? 'País de Origem' : 'Country of Origin'}
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {LUSOPHONE_COUNTRIES.map((country) => (
            <button
              key={country.value}
              onClick={() => updateFormData('countryOfOrigin', country.value)}
              className={`p-4 border-2 rounded-lg text-left transition-all duration-200 ${
                formData.countryOfOrigin === country.value
                  ? 'border-primary-500 bg-primary-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{country.flag}</span>
                <span className="font-medium text-gray-900">
                  {language === 'pt' ? (country.labelPt || country.label) : country.label}
                </span>
              </div>
            </button>
          ))}
        </div>
        {validationErrors.countryOfOrigin && (
          <p className="text-red-600 text-sm mt-2">{validationErrors.countryOfOrigin}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {language === 'pt' ? 'Nível de Português' : 'Portuguese Level'}
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {PORTUGUESE_LEVELS.map((level) => (
            <button
              key={level.value}
              onClick={() => updateFormData('portugueseLevel', level.value)}
              className={`p-3 border-2 rounded-lg text-center transition-all duration-200 ${
                formData.portugueseLevel === level.value
                  ? 'border-primary-500 bg-primary-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-sm font-medium text-gray-900">
                {language === 'pt' ? level.labelPt : level.label}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  const renderPreferencesInfo = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-secondary-500 to-premium-500 rounded-full mb-4">
          <HeartIcon className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {language === 'pt' ? 'Interesses e Preferências' : 'Interests & Preferences'}
        </h2>
        <p className="text-gray-600">
          {language === 'pt' 
            ? 'Personalize a sua experiência na comunidade'
            : 'Personalize your community experience'}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          {language === 'pt' ? 'Que áreas lhe interessam? (selecione todas as que se aplicam)' : 'What interests you? (select all that apply)'}
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {STUDENT_INTERESTS.map((interest) => (
            <button
              key={interest.value}
              onClick={() => toggleInterest(interest.value)}
              className={`p-4 border-2 rounded-lg text-left transition-all duration-200 ${
                formData.interests.includes(interest.value)
                  ? 'border-primary-500 bg-primary-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  formData.interests.includes(interest.value) ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  {interest.icon}
                </div>
                <span className="font-medium text-gray-900">
                  {language === 'pt' ? interest.labelPt : interest.label}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="accommodation"
            checked={formData.needsAccommodation}
            onChange={(e) => updateFormData('needsAccommodation', e.target.checked)}
            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <label htmlFor="accommodation" className="text-sm text-gray-700">
            {language === 'pt' ? 'Preciso de ajuda com alojamento' : 'I need help with accommodation'}
          </label>
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="jobSupport"
            checked={formData.needsJobSupport}
            onChange={(e) => updateFormData('needsJobSupport', e.target.checked)}
            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <label htmlFor="jobSupport" className="text-sm text-gray-700">
            {language === 'pt' ? 'Gostaria de apoio na procura de emprego' : 'I would like job search support'}
          </label>
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="networking"
            checked={formData.wantsNetworking}
            onChange={(e) => updateFormData('wantsNetworking', e.target.checked)}
            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <label htmlFor="networking" className="text-sm text-gray-700">
            {language === 'pt' ? 'Quero fazer networking profissional' : 'I want to do professional networking'}
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {language === 'pt' ? 'Língua Preferida para Comunicação' : 'Preferred Communication Language'}
        </label>
        <div className="grid grid-cols-3 gap-4">
          {[
            { value: 'pt', label: 'Português', flag: '🇵🇹' },
            { value: 'en', label: 'English', flag: '🇬🇧' },
            { value: 'both', label: language === 'pt' ? 'Ambas' : 'Both', flag: '🌍' }
          ].map((lang) => (
            <button
              key={lang.value}
              onClick={() => updateFormData('preferredLanguage', lang.value)}
              className={`p-3 border-2 rounded-lg text-center transition-all duration-200 ${
                formData.preferredLanguage === lang.value
                  ? 'border-primary-500 bg-primary-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-xl mb-1">{lang.flag}</div>
              <div className="text-sm font-medium text-gray-900">{lang.label}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  const renderSuccessScreen = () => (
    <div className="text-center py-12">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6"
      >
        <CheckCircleIconSolid className="w-12 h-12 text-green-600" />
      </motion.div>
      
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        {language === 'pt' ? '🎉 Bem-vindo à Comunidade!' : '🎉 Welcome to the Community!'}
      </h2>
      
      <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
        {language === 'pt' 
          ? 'O seu perfil foi criado com sucesso! Agora pode aceder a todos os benefícios da nossa rede de estudantes portugueses.'
          : 'Your profile has been created successfully! You now have access to all benefits of our Portuguese-speaking student network.'}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4">
            <CheckBadgeIcon className="w-6 h-6 text-primary-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {language === 'pt' ? 'Verificação Pendente' : 'Verification Pending'}
          </h3>
          <p className="text-sm text-gray-600">
            {language === 'pt' 
              ? 'Receberá um email de verificação em breve'
              : 'You will receive a verification email shortly'}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary-100 rounded-lg mb-4">
            <UserGroupIcon className="w-6 h-6 text-secondary-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {language === 'pt' ? 'Acesso à Comunidade' : 'Community Access'}
          </h3>
          <p className="text-sm text-gray-600">
            {language === 'pt' 
              ? 'Conecte-se com outros estudantes portugueses'
              : 'Connect with other Portuguese-speaking students'}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-accent-100 rounded-lg mb-4">
            <SparklesIcon className="w-6 h-6 text-accent-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {language === 'pt' ? 'Benefícios Exclusivos' : 'Exclusive Benefits'}
          </h3>
          <p className="text-sm text-gray-600">
            {language === 'pt' 
              ? 'Acesso a eventos, grupos e mentoria'
              : 'Access to events, groups and mentorship'}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <a
          href="/students/university-partnerships"
          className="inline-flex items-center bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
        >
          {language === 'pt' ? 'Explorar Parcerias' : 'Explore Partnerships'}
          <ArrowRightIcon className="w-5 h-5 ml-2" />
        </a>
        
        <div className="text-sm text-gray-500">
          {language === 'pt' 
            ? 'Ou visite o seu painel de estudante para começar'
            : 'Or visit your student dashboard to get started'}
        </div>
      </div>
    </div>
  )

  if (submitSuccess) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {renderSuccessScreen()}
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>{language === 'pt' ? 'Passo' : 'Step'} {currentStep} {language === 'pt' ? 'de' : 'of'} {totalSteps}</span>
          <span>{Math.round((currentStep / totalSteps) * 100)}% {language === 'pt' ? 'completo' : 'complete'}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>

        {/* Error Display */}
        {submitError && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start">
              <ExclamationTriangleIcon className="w-5 h-5 text-red-600 mr-2 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-red-800">
                  {language === 'pt' ? 'Erro no registo' : 'Registration Error'}
                </h4>
                <p className="text-sm text-red-700 mt-1">{submitError}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center px-6 py-3 text-gray-600 font-medium hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            {language === 'pt' ? 'Anterior' : 'Previous'}
          </button>

          {currentStep < totalSteps ? (
            <button
              onClick={handleNext}
              className="flex items-center bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
            >
              {language === 'pt' ? 'Próximo' : 'Next'}
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center bg-gradient-to-r from-green-500 to-primary-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {language === 'pt' ? 'A enviar...' : 'Submitting...'}
                </>
              ) : (
                <>
                  {language === 'pt' ? 'Concluir Registo' : 'Complete Registration'}
                  <CheckCircleIcon className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}