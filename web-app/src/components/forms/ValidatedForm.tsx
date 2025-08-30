/**
 * Validated Form Component for Portuguese Community Platform
 * 
 * A comprehensive form component with real-time validation, bilingual error messages,
 * and Portuguese cultural context support.
 * 
 * Features:
 * - Real-time validation with Zod schemas
 * - Bilingual error messages (EN/PT)
 * - Portuguese cultural context validation
 * - Accessibility compliant
 * - Mobile-first design
 * - Anti-spam protection
 */

'use client'

import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { z } from 'zod'
import { 
  validateFieldRealTime, 
  extractValidationErrorsWithI18n,
  submitFormWithValidation,
  formatPhoneNumber,
  formatPostcode,
  detectPortugueseCommunityArea,
  validateBilingualContent
} from '@/lib/validation-utils'
import { ExclamationTriangleIcon, CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

interface ValidatedFormProps {
  schema: z.ZodSchema<any>
  endpoint: string
  onSuccess?: (data: any) => void
  onError?: (errors: Record<string, string>) => void
  className?: string
  children: React.ReactNode
  title?: string
  description?: string
  submitButtonText?: string
  showCulturalContext?: boolean
  antiSpam?: boolean
}

interface FormFieldProps {
  name: string
  label: string
  type?: 'text' | 'email' | 'tel' | 'password' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date' | 'number'
  placeholder?: string
  required?: boolean
  options?: Array<{ value: string; label: string; labelPt?: string }>
  validation?: z.ZodSchema<any>
  formatType?: 'phone' | 'postcode' | 'capitalize'
  culturalContext?: boolean
  bilingual?: boolean
  countryCode?: string
  helpText?: string
  maxLength?: number
  rows?: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  className?: string
}

interface BilingualFieldProps {
  name: string
  label: string
  type?: 'text' | 'textarea'
  placeholder?: { en: string; pt: string }
  required?: boolean
  validation?: z.ZodSchema<any>
  helpText?: string
  maxLength?: number
  rows?: number
  className?: string
}

export function ValidatedForm({
  schema,
  endpoint,
  onSuccess,
  onError,
  className = '',
  children,
  title,
  description,
  submitButtonText,
  showCulturalContext = false,
  antiSpam = true
}: ValidatedFormProps) {
  const { t, language } = useLanguage()
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [warnings, setWarnings] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitAttempts, setSubmitAttempts] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)
  const [culturalScore, setCulturalScore] = useState<number>(0)
  const formRef = useRef<HTMLFormElement>(null)
  
  // Anti-spam honeypot
  const honeypotRef = useRef<HTMLInputElement>(null)

  const updateField = (name: string, value: any, validation?: z.ZodSchema<any>) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear previous errors for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
    
    // Real-time validation if schema provided
    if (validation && value) {
      const result = validateFieldRealTime(validation, value, t)
      if (!result.isValid && result.error) {
        setErrors(prev => ({ ...prev, [name]: result.error! }))
      }
      if (result.warning) {
        setWarnings(prev => ({ ...prev, [name]: result.warning! }))
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitAttempts(prev => prev + 1)
    setIsSubmitting(true)
    setShowSuccess(false)
    
    try {
      // Anti-spam check
      if (antiSpam && honeypotRef.current?.value) {
        console.warn('Spam detected in form submission')
        return
      }
      
      // Add honeypot field for API
      const submissionData = antiSpam 
        ? { ...formData, honeypot: '' }
        : formData
      
      const result = await submitFormWithValidation(endpoint, submissionData, schema, t)
      
      if (result.success) {
        setShowSuccess(true)
        setErrors({})
        setWarnings({})
        onSuccess?.(result.data)
        
        // Reset form after success
        setTimeout(() => {
          setShowSuccess(false)
          setFormData({})
        }, 5000)
      } else {
        setErrors(result.errors || {})
        onError?.(result.errors || {})
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setErrors({
        _form: t('validation.network_error')
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={clsx('max-w-2xl mx-auto', className)}>
      {/* Form Header */}
      {(title || description) && (
        <div className="mb-8">
          {title && (
            <h2 className="text-2xl font-bold text-primary-900 mb-4">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-gray-600 text-lg">
              {description}
            </p>
          )}
        </div>
      )}

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
          <CheckCircleIcon className="w-6 h-6 text-green-600 flex-shrink-0" />
          <div>
            <p className="text-green-800 font-medium">
              {t('validation.submission_success')}
            </p>
            <p className="text-green-700 text-sm mt-1">
              {t('validation.success_details')}
            </p>
          </div>
        </div>
      )}

      {/* Cultural Context Score */}
      {showCulturalContext && culturalScore > 0 && (
        <div className="mb-6 p-4 bg-primary-50 border border-primary-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <InformationCircleIcon className="w-6 h-6 text-primary-600 flex-shrink-0" />
            <div>
              <p className="text-primary-800 font-medium">
                {t('validation.cultural_score')}: {culturalScore}/100
              </p>
              <p className="text-primary-700 text-sm mt-1">
                {culturalScore >= 80 
                  ? t('validation.cultural_score_excellent')
                  : culturalScore >= 60
                  ? t('validation.cultural_score_good')
                  : t('validation.cultural_score_needs_improvement')
                }
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        {/* Anti-spam honeypot */}
        {antiSpam && (
          <input
            ref={honeypotRef}
            type="text"
            name="honeypot"
            tabIndex={-1}
            style={{ 
              position: 'absolute', 
              left: '-9999px', 
              opacity: 0,
              pointerEvents: 'none'
            }}
            aria-hidden="true"
          />
        )}

        {children}

        {/* Form-level errors */}
        {errors._form && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
            <ExclamationTriangleIcon className="w-6 h-6 text-red-600 flex-shrink-0" />
            <p className="text-red-800">{errors._form}</p>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || Object.keys(errors).length > 0}
            className={clsx(
              'px-8 py-3 rounded-lg font-medium min-h-[48px] transition-all',
              'focus:outline-none focus:ring-4 focus:ring-primary-200',
              isSubmitting || Object.keys(errors).length > 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800',
              'md:px-12'
            )}
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>{t('common.submitting')}</span>
              </div>
            ) : (
              submitButtonText || t('common.submit')
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

/**
 * Individual Form Field Component
 */
export function FormField({
  name,
  label,
  type = 'text',
  placeholder,
  required = false,
  options = [],
  validation,
  formatType,
  culturalContext = false,
  countryCode,
  helpText,
  maxLength,
  rows = 4,
  min,
  max,
  step,
  disabled = false,
  className = ''
}: FormFieldProps) {
  const { t } = useLanguage()
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const [warning, setWarning] = useState('')
  const [culturalInfo, setCulturalInfo] = useState<any>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    let newValue = e.target.value

    // Apply formatting
    if (formatType === 'phone') {
      newValue = formatPhoneNumber(newValue, countryCode)
    } else if (formatType === 'postcode') {
      newValue = formatPostcode(newValue, countryCode || 'GB')
    } else if (formatType === 'capitalize') {
      newValue = newValue.charAt(0).toUpperCase() + newValue.slice(1)
    }

    setValue(newValue)

    // Cultural context detection
    if (culturalContext && type === 'text' && newValue.length > 10) {
      if (name.includes('address')) {
        const areaInfo = detectPortugueseCommunityArea(newValue)
        setCulturalInfo(areaInfo)
      }
    }

    // Real-time validation
    if (validation && newValue) {
      const result = validateFieldRealTime(validation, newValue, t)
      setError(result.error || '')
      setWarning(result.warning || '')
    }
  }

  const fieldId = `field-${name}`
  const hasError = !!error
  const hasWarning = !!warning

  return (
    <div className={clsx('space-y-2', className)}>
      {/* Label */}
      <label htmlFor={fieldId} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* Input Field */}
      <div className="relative">
        {type === 'textarea' ? (
          <textarea
            id={fieldId}
            name={name}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            maxLength={maxLength}
            rows={rows}
            className={clsx(
              'w-full px-4 py-3 border rounded-lg transition-colors resize-none',
              'focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-500',
              hasError 
                ? 'border-red-300 bg-red-50' 
                : hasWarning 
                ? 'border-yellow-300 bg-yellow-50'
                : 'border-gray-300 bg-white',
              disabled && 'bg-gray-100 cursor-not-allowed'
            )}
          />
        ) : type === 'select' ? (
          <select
            id={fieldId}
            name={name}
            value={value}
            onChange={handleChange}
            required={required}
            disabled={disabled}
            className={clsx(
              'w-full px-4 py-3 border rounded-lg transition-colors appearance-none bg-white',
              'focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-500',
              hasError 
                ? 'border-red-300 bg-red-50' 
                : hasWarning 
                ? 'border-yellow-300 bg-yellow-50'
                : 'border-gray-300',
              disabled && 'bg-gray-100 cursor-not-allowed'
            )}
          >
            <option value="">{t('common.select_option')}</option>
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={fieldId}
            name={name}
            type={type}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            maxLength={maxLength}
            min={min}
            max={max}
            step={step}
            className={clsx(
              'w-full px-4 py-3 border rounded-lg transition-colors',
              'focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-500',
              hasError 
                ? 'border-red-300 bg-red-50' 
                : hasWarning 
                ? 'border-yellow-300 bg-yellow-50'
                : 'border-gray-300 bg-white',
              disabled && 'bg-gray-100 cursor-not-allowed'
            )}
          />
        )}

        {/* Character count */}
        {maxLength && value && (
          <div className="absolute right-3 top-3 text-sm text-gray-400">
            {value.length}/{maxLength}
          </div>
        )}
      </div>

      {/* Help Text */}
      {helpText && !error && !warning && (
        <p className="text-sm text-gray-600">{helpText}</p>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-center space-x-2 text-red-600">
          <ExclamationTriangleIcon className="w-4 h-4 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Warning Message */}
      {warning && !error && (
        <div className="flex items-center space-x-2 text-yellow-600">
          <InformationCircleIcon className="w-4 h-4 flex-shrink-0" />
          <p className="text-sm">{warning}</p>
        </div>
      )}

      {/* Cultural Context Information */}
      {culturalInfo?.isPortugueseArea && (
        <div className="p-3 bg-primary-50 border border-primary-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <InformationCircleIcon className="w-4 h-4 text-primary-600" />
            <p className="text-sm text-primary-800">
              {t('validation.address.portuguese_community')}
              {culturalInfo.suggestedArea && (
                <span className="ml-1 font-medium">({culturalInfo.suggestedArea})</span>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Bilingual Form Field Component
 */
export function BilingualFormField({
  name,
  label,
  type = 'text',
  placeholder,
  required = false,
  validation,
  helpText,
  maxLength,
  rows = 4,
  className = ''
}: BilingualFieldProps) {
  const { t } = useLanguage()
  const [values, setValues] = useState({ en: '', pt: '' })
  const [errors, setErrors] = useState<{ en?: string; pt?: string }>({})
  const [warnings, setWarnings] = useState<string[]>([])

  const handleChange = (lang: 'en' | 'pt', value: string) => {
    const newValues = { ...values, [lang]: value }
    setValues(newValues)

    // Real-time bilingual validation
    if (newValues.en || newValues.pt) {
      const result = validateBilingualContent(newValues, t)
      setErrors(result.errors)
      setWarnings(result.warnings)
    }
  }

  return (
    <div className={clsx('space-y-4', className)}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* English Field */}
      <div className="space-y-2">
        <label className="block text-xs font-medium text-gray-600 uppercase tracking-wide">
          {t('common.english')}
        </label>
        {type === 'textarea' ? (
          <textarea
            value={values.en}
            onChange={(e) => handleChange('en', e.target.value)}
            placeholder={placeholder?.en}
            required={required}
            maxLength={maxLength}
            rows={rows}
            className={clsx(
              'w-full px-4 py-3 border rounded-lg transition-colors resize-none',
              'focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-500',
              errors.en ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
            )}
          />
        ) : (
          <input
            type={type}
            value={values.en}
            onChange={(e) => handleChange('en', e.target.value)}
            placeholder={placeholder?.en}
            required={required}
            maxLength={maxLength}
            className={clsx(
              'w-full px-4 py-3 border rounded-lg transition-colors',
              'focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-500',
              errors.en ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
            )}
          />
        )}
        {errors.en && (
          <p className="text-sm text-red-600 flex items-center space-x-2">
            <ExclamationTriangleIcon className="w-4 h-4" />
            <span>{errors.en}</span>
          </p>
        )}
      </div>

      {/* Portuguese Field */}
      <div className="space-y-2">
        <label className="block text-xs font-medium text-gray-600 uppercase tracking-wide">
          {t('common.portuguese')}
        </label>
        {type === 'textarea' ? (
          <textarea
            value={values.pt}
            onChange={(e) => handleChange('pt', e.target.value)}
            placeholder={placeholder?.pt}
            required={required}
            maxLength={maxLength}
            rows={rows}
            className={clsx(
              'w-full px-4 py-3 border rounded-lg transition-colors resize-none',
              'focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-500',
              errors.pt ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
            )}
          />
        ) : (
          <input
            type={type}
            value={values.pt}
            onChange={(e) => handleChange('pt', e.target.value)}
            placeholder={placeholder?.pt}
            required={required}
            maxLength={maxLength}
            className={clsx(
              'w-full px-4 py-3 border rounded-lg transition-colors',
              'focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-500',
              errors.pt ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
            )}
          />
        )}
        {errors.pt && (
          <p className="text-sm text-red-600 flex items-center space-x-2">
            <ExclamationTriangleIcon className="w-4 h-4" />
            <span>{errors.pt}</span>
          </p>
        )}
      </div>

      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="space-y-1">
          {warnings.map((warning, index) => (
            <p key={index} className="text-sm text-yellow-600 flex items-center space-x-2">
              <InformationCircleIcon className="w-4 h-4" />
              <span>{warning}</span>
            </p>
          ))}
        </div>
      )}

      {/* Help Text */}
      {helpText && (
        <p className="text-sm text-gray-600">{helpText}</p>
      )}
    </div>
  )
}