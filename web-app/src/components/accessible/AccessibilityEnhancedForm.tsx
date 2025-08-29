'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { ExclamationTriangleIcon, CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline'

interface FormFieldProps {
  id: string
  label: string
  labelPt: string
  type?: 'text' | 'email' | 'password' | 'tel' | 'textarea' | 'select'
  value: string
  onChange: (value: string) => void
  required?: boolean
  error?: string
  errorPt?: string
  hint?: string
  hintPt?: string
  options?: { value: string; label: string; labelPt: string }[]
  placeholder?: string
  placeholderPt?: string
  'aria-describedby'?: string
}

interface AccessibilityEnhancedFormProps {
  fields: FormFieldProps[]
  onSubmit: (formData: Record<string, string>) => void
  submitLabel?: string
  submitLabelPt?: string
  isSubmitting?: boolean
  submitError?: string
  submitErrorPt?: string
  successMessage?: string
  successMessagePt?: string
}

/**
 * Fully accessible form component for Portuguese-speaking community
 * Implements WCAG 2.1 AA compliance with comprehensive error handling
 */
export default function AccessibilityEnhancedForm({
  fields,
  onSubmit,
  submitLabel = 'Submit',
  submitLabelPt = 'Submeter',
  isSubmitting = false,
  submitError,
  submitErrorPt,
  successMessage,
  successMessagePt
}: AccessibilityEnhancedFormProps) {
  const { t, language } = useLanguage()
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [isSuccess, setIsSuccess] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const firstErrorRef = useRef<HTMLElement>(null)
  
  // Initialize form data
  useEffect(() => {
    const initialData: Record<string, string> = {}
    fields.forEach(field => {
      initialData[field.id] = field.value || ''
    })
    setFormData(initialData)
  }, [fields])

  // Update individual field
  const updateField = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }))
    // Clear error when user starts typing
    if (fieldErrors[id]) {
      setFieldErrors(prev => ({ ...prev, [id]: '' }))
    }
    // Notify onChange
    const field = fields.find(f => f.id === id)
    field?.onChange(value)
  }

  // Validate form
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {}
    let isValid = true

    fields.forEach(field => {
      const value = formData[field.id] || ''
      
      if (field.required && !value.trim()) {
        const errorMsg = language === 'pt' 
          ? `${field.labelPt} é obrigatório`
          : `${field.label} is required`
        errors[field.id] = errorMsg
        isValid = false
      }
      
      // Email validation
      if (field.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errors[field.id] = language === 'pt' 
          ? 'Por favor, insira um email válido'
          : 'Please enter a valid email address'
        isValid = false
      }
      
      // Portuguese phone number validation
      if (field.type === 'tel' && value && !/^(\+351|00351)?\s?[29]\d{8}$/.test(value.replace(/\s/g, ''))) {
        errors[field.id] = language === 'pt'
          ? 'Por favor, insira um número de telefone português válido'
          : 'Please enter a valid Portuguese phone number'
        isValid = false
      }
    })

    setFieldErrors(errors)
    
    // Focus first error field
    if (!isValid) {
      const firstErrorId = Object.keys(errors)[0]
      const firstErrorElement = document.getElementById(firstErrorId)
      firstErrorElement?.focus()
      announceToScreenReader(
        language === 'pt' 
          ? `Formulário contém ${Object.keys(errors).length} erros. Por favor, corrija-os.`
          : `Form contains ${Object.keys(errors).length} errors. Please correct them.`
      )
    }
    
    return isValid
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    try {
      await onSubmit(formData)
      setIsSuccess(true)
      announceToScreenReader(
        language === 'pt' 
          ? successMessagePt || 'Formulário submetido com sucesso'
          : successMessage || 'Form submitted successfully'
      )
    } catch (error) {
      announceToScreenReader(
        language === 'pt'
          ? submitErrorPt || 'Erro ao submeter formulário'
          : submitError || 'Error submitting form'
      )
    }
  }

  // Screen reader announcements
  const announceToScreenReader = (message: string) => {
    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', 'assertive')
    announcement.setAttribute('aria-atomic', 'true')
    announcement.className = 'sr-only'
    announcement.textContent = message
    
    document.body.appendChild(announcement)
    setTimeout(() => document.body.removeChild(announcement), 3000)
  }

  // Render form field with full accessibility
  const renderField = (field: FormFieldProps) => {
    const currentLabel = language === 'pt' ? field.labelPt : field.label
    const currentError = language === 'pt' ? field.errorPt : field.error
    const currentHint = language === 'pt' ? field.hintPt : field.hint
    const currentPlaceholder = language === 'pt' ? field.placeholderPt : field.placeholder
    const fieldError = fieldErrors[field.id] || currentError
    const value = formData[field.id] || ''
    
    const fieldId = field.id
    const errorId = `${fieldId}-error`
    const hintId = `${fieldId}-hint`
    const describedBy = [
      currentHint && hintId,
      fieldError && errorId,
      field['aria-describedby']
    ].filter(Boolean).join(' ')

    return (
      <div key={fieldId} className="space-y-2">
        <label
          htmlFor={fieldId}
          className="block text-sm font-medium text-gray-900"
        >
          {currentLabel}
          {field.required && (
            <span className="text-red-500 ml-1" aria-label={
              language === 'pt' ? 'obrigatório' : 'required'
            }>
              *
            </span>
          )}
        </label>
        
        {/* Hint text */}
        {currentHint && (
          <div
            id={hintId}
            className="text-sm text-gray-600 flex items-start gap-2"
          >
            <InformationCircleIcon className="h-4 w-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
            {currentHint}
          </div>
        )}
        
        {/* Form field */}
        {field.type === 'textarea' ? (
          <textarea
            id={fieldId}
            value={value}
            onChange={(e) => updateField(fieldId, e.target.value)}
            placeholder={currentPlaceholder}
            required={field.required}
            aria-describedby={describedBy || undefined}
            aria-invalid={!!fieldError}
            className={`
              w-full px-3 py-3 border rounded-md shadow-sm transition-colors
              min-h-[120px] resize-vertical
              focus:outline-none focus:ring-2 focus:ring-heritage-primary focus:border-transparent
              ${fieldError 
                ? 'border-red-500 bg-red-50' 
                : 'border-gray-300 hover:border-gray-400 focus:border-heritage-primary'
              }
            `}
            rows={4}
          />
        ) : field.type === 'select' ? (
          <select
            id={fieldId}
            value={value}
            onChange={(e) => updateField(fieldId, e.target.value)}
            required={field.required}
            aria-describedby={describedBy || undefined}
            aria-invalid={!!fieldError}
            className={`
              w-full px-3 py-3 border rounded-md shadow-sm transition-colors
              min-h-[56px] appearance-none bg-white
              focus:outline-none focus:ring-2 focus:ring-heritage-primary focus:border-transparent
              ${fieldError 
                ? 'border-red-500 bg-red-50' 
                : 'border-gray-300 hover:border-gray-400 focus:border-heritage-primary'
              }
            `}
          >
            <option value="">
              {language === 'pt' ? 'Selecione uma opção...' : 'Select an option...'}
            </option>
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {language === 'pt' ? option.labelPt : option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={field.type || 'text'}
            id={fieldId}
            value={value}
            onChange={(e) => updateField(fieldId, e.target.value)}
            placeholder={currentPlaceholder}
            required={field.required}
            aria-describedby={describedBy || undefined}
            aria-invalid={!!fieldError}
            className={`
              w-full px-3 py-3 border rounded-md shadow-sm transition-colors
              min-h-[56px]
              focus:outline-none focus:ring-2 focus:ring-heritage-primary focus:border-transparent
              ${fieldError 
                ? 'border-red-500 bg-red-50' 
                : 'border-gray-300 hover:border-gray-400 focus:border-heritage-primary'
              }
            `}
            autoComplete={
              field.type === 'email' ? 'email' :
              field.type === 'tel' ? 'tel' :
              field.type === 'password' ? 'current-password' :
              'off'
            }
          />
        )}
        
        {/* Error message */}
        {fieldError && (
          <div
            id={errorId}
            className="text-sm text-red-600 flex items-start gap-2"
            role="alert"
            aria-live="polite"
          >
            <ExclamationTriangleIcon className="h-4 w-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
            {fieldError}
          </div>
        )}
      </div>
    )
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-6"
      noValidate
      role="form"
      aria-label={language === 'pt' ? 'Formulário da comunidade portuguesa' : 'Portuguese community form'}
    >
      {/* Success message */}
      {isSuccess && (successMessage || successMessagePt) && (
        <div
          className="p-4 bg-green-50 border border-green-200 rounded-md"
          role="alert"
          aria-live="polite"
        >
          <div className="flex items-start gap-2">
            <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
            <div className="text-sm text-green-700">
              {language === 'pt' ? successMessagePt : successMessage}
            </div>
          </div>
        </div>
      )}

      {/* Submit error */}
      {(submitError || submitErrorPt) && !isSuccess && (
        <div
          className="p-4 bg-red-50 border border-red-200 rounded-md"
          role="alert"
          aria-live="assertive"
        >
          <div className="flex items-start gap-2">
            <ExclamationTriangleIcon className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
            <div className="text-sm text-red-700">
              {language === 'pt' ? submitErrorPt : submitError}
            </div>
          </div>
        </div>
      )}

      {/* Form fields */}
      {fields.map(field => renderField(field))}

      {/* Submit button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`
            w-full px-6 py-4 rounded-md font-medium transition-colors
            min-h-[56px] touch-manipulation
            focus:outline-none focus:ring-2 focus:ring-heritage-primary focus:ring-offset-2
            ${isSubmitting
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-heritage-primary text-white hover:bg-heritage-primary/90'
            }
          `}
          aria-describedby={isSubmitting ? 'submit-status' : undefined}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              {language === 'pt' ? 'A submeter...' : 'Submitting...'}
            </span>
          ) : (
            language === 'pt' ? submitLabelPt : submitLabel
          )}
        </button>
        
        {isSubmitting && (
          <div id="submit-status" className="sr-only" aria-live="polite">
            {language === 'pt' 
              ? 'Formulário está a ser submetido. Por favor aguarde.'
              : 'Form is being submitted. Please wait.'
            }
          </div>
        )}
      </div>

      {/* Form instructions for screen readers */}
      <div className="sr-only" aria-live="polite">
        {language === 'pt' ? (
          'Campos marcados com asterisco são obrigatórios. Use Tab para navegar entre campos.'
        ) : (
          'Fields marked with asterisk are required. Use Tab to navigate between fields.'
        )}
      </div>
    </form>
  )
}