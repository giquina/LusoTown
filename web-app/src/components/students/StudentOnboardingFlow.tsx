'use client'

import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { HERITAGE_COLORS } from '@/config/brand'
import { UNIVERSITIES } from '@/config/universities'

interface StudentOnboardingFlowProps {
  onComplete?: (data: StudentData) => void
}

interface StudentData {
  university: string
  year: string
  course: string
  accommodation: string
  interests: string[]
}

export default function StudentOnboardingFlow({ onComplete }: StudentOnboardingFlowProps) {
  const { t } = useLanguage()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<StudentData>({
    university: '',
    year: '',
    course: '',
    accommodation: '',
    interests: []
  })

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
    } else {
      onComplete?.(formData)
    }
  }

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const updateFormData = (field: keyof StudentData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div 
      className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm border border-primary-200"
      style={{
        '--heritage-primary': HERITAGE_COLORS.primary,
        '--heritage-secondary': HERITAGE_COLORS.secondary
      } as React.CSSProperties}
    >
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {[1, 2, 3, 4].map((num) => (
            <div
              key={num}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= num
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {num}
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Step content */}
      <div className="mb-8">
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-primary-900 mb-4">
              {t('student.onboarding.step1.title')}
            </h2>
            <p className="text-gray-600 mb-6">
              {t('student.onboarding.step1.description')}
            </p>
            
            <select
              value={formData.university}
              onChange={(e) => updateFormData('university', e.target.value)}
              className="w-full p-3 border border-primary-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">{t('student.onboarding.selectUniversity')}</option>
              {Object.entries(UNIVERSITIES).map(([key, university]) => (
                <option key={key} value={key}>
                  {university.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold text-primary-900 mb-4">
              {t('student.onboarding.step2.title')}
            </h2>
            <p className="text-gray-600 mb-6">
              {t('student.onboarding.step2.description')}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select
                value={formData.year}
                onChange={(e) => updateFormData('year', e.target.value)}
                className="p-3 border border-primary-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">{t('student.onboarding.selectYear')}</option>
                <option value="1st">1st Year</option>
                <option value="2nd">2nd Year</option>
                <option value="3rd">3rd Year</option>
                <option value="masters">Masters</option>
                <option value="phd">PhD</option>
              </select>
              
              <input
                type="text"
                placeholder={t('student.onboarding.coursePlaceholder')}
                value={formData.course}
                onChange={(e) => updateFormData('course', e.target.value)}
                className="p-3 border border-primary-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold text-primary-900 mb-4">
              {t('student.onboarding.step3.title')}
            </h2>
            <p className="text-gray-600 mb-6">
              {t('student.onboarding.step3.description')}
            </p>
            
            <div className="space-y-3">
              {['university-halls', 'private-rent', 'home-stay', 'with-family', 'looking'].map((option) => (
                <label key={option} className="flex items-center p-3 border border-primary-200 rounded-lg hover:bg-primary-50 cursor-pointer">
                  <input
                    type="radio"
                    name="accommodation"
                    value={option}
                    checked={formData.accommodation === option}
                    onChange={(e) => updateFormData('accommodation', e.target.value)}
                    className="mr-3 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-primary-900">{t(`student.accommodation.${option}`)}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-2xl font-bold text-primary-900 mb-4">
              {t('student.onboarding.step4.title')}
            </h2>
            <p className="text-gray-600 mb-6">
              {t('student.onboarding.step4.description')}
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {['networking', 'cultural-events', 'career-help', 'language-practice', 'social-activities', 'academic-support'].map((interest) => (
                <label key={interest} className="flex items-center p-3 border border-primary-200 rounded-lg hover:bg-primary-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.interests.includes(interest)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        updateFormData('interests', [...formData.interests, interest])
                      } else {
                        updateFormData('interests', formData.interests.filter(i => i !== interest))
                      }
                    }}
                    className="mr-2 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-primary-900">{t(`student.interests.${interest}`)}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={step === 1}
          className="px-6 py-3 text-primary-600 border border-primary-300 rounded-lg hover:bg-primary-50 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
        >
          {t('common.previous')}
        </button>
        
        <button
          onClick={handleNext}
          className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors min-h-[44px]"
        >
          {step === 4 ? t('common.complete') : t('common.next')}
        </button>
      </div>
    </div>
  )
}