'use client'

import React, { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { universityPartnershipsService, type StudentVerification, type University } from '@/lib/universityPartnerships'
import {
  AcademicCapIcon,
  CheckBadgeIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  ShieldCheckIcon,
  ClockIcon,
  XCircleIcon,
  ArrowRightIcon,
  PhotoIcon,
  PaperClipIcon
} from '@heroicons/react/24/outline'
import { CheckIcon as CheckIconSolid } from '@heroicons/react/24/solid'

interface StudentVerificationSystemProps {
  onVerificationComplete?: (verificationId: string) => void
  onClose?: () => void
  isModal?: boolean
}

interface VerificationStep {
  id: number
  title: string
  titlePortuguese: string
  description: string
  descriptionPortuguese: string
  completed: boolean
  current: boolean
}

interface EmailVerificationResult {
  isValid: boolean
  university?: University
  domain: string
  suggestions?: string[]
}

interface DocumentUpload {
  id: string
  file: File
  type: 'student_id' | 'enrollment_letter' | 'tuition_receipt' | 'transcript'
  uploadProgress: number
  verified: boolean
  error?: string
}

export default function StudentVerificationSystem({ 
  onVerificationComplete, 
  onClose, 
  isModal = true 
}: StudentVerificationSystemProps) {
  const { language } = useLanguage()
  const [currentStep, setCurrentStep] = useState(1)
  const [emailVerificationResult, setEmailVerificationResult] = useState<EmailVerificationResult | null>(null)
  const [documents, setDocuments] = useState<DocumentUpload[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [verificationSubmitted, setVerificationSubmitted] = useState(false)
  const [verificationId, setVerificationId] = useState<string | null>(null)

  // Form data
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    universityId: '',
    program: '',
    yearOfStudy: '',
    expectedGraduation: '',
    studentNumber: '',
    phoneNumber: '',
    preferredLanguage: language
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const steps: VerificationStep[] = [
    {
      id: 1,
      title: 'University Email Verification',
      titlePortuguese: 'Verificação de Email Universitário',
      description: 'Verify your official university email address',
      descriptionPortuguese: 'Verifique o seu endereço de email universitário oficial',
      completed: currentStep > 1,
      current: currentStep === 1
    },
    {
      id: 2,
      title: 'Personal Information',
      titlePortuguese: 'Informações Pessoais',
      description: 'Provide your academic details',
      descriptionPortuguese: 'Forneça os seus dados acadêmicos',
      completed: currentStep > 2,
      current: currentStep === 2
    },
    {
      id: 3,
      title: 'Document Upload',
      titlePortuguese: 'Carregamento de Documentos',
      description: 'Upload verification documents',
      descriptionPortuguese: 'Carregue documentos de verificação',
      completed: currentStep > 3,
      current: currentStep === 3
    },
    {
      id: 4,
      title: 'Review & Submit',
      titlePortuguese: 'Revisar e Submeter',
      description: 'Review and submit your verification',
      descriptionPortuguese: 'Revise e submeta a sua verificação',
      completed: verificationSubmitted,
      current: currentStep === 4
    }
  ]

  const validateEmail = async (email: string): Promise<EmailVerificationResult> => {
    const result = await universityPartnershipsService.verifyUniversityEmail(email)
    
    if (!result.isValid) {
      return {
        isValid: false,
        domain: result.domain,
        suggestions: [
          'Make sure you\'re using your official university email (.ac.uk)',
          'Check for typos in your email address',
          'Contact your university IT support if you\'re having issues'
        ]
      }
    }

    return result
  }

  const handleEmailVerification = async () => {
    if (!formData.email) {
      setErrors({ email: language === 'pt' ? 'Email é obrigatório' : 'Email is required' })
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setErrors({ email: language === 'pt' ? 'Email inválido' : 'Invalid email' })
      return
    }

    const result = await validateEmail(formData.email)
    setEmailVerificationResult(result)

    if (result.isValid) {
      if (result.university) {
        setFormData(prev => ({ ...prev, universityId: result.university!.id }))
      }
      setCurrentStep(2)
      setErrors({})
    } else {
      setErrors({ 
        email: language === 'pt' ? 
          'Email universitário inválido. Use o seu email oficial da universidade (.ac.uk)' : 
          'Invalid university email. Use your official university email (.ac.uk)'
      })
    }
  }

  const handlePersonalInfoSubmit = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName) {
      newErrors.firstName = language === 'pt' ? 'Nome é obrigatório' : 'First name is required'
    }
    if (!formData.lastName) {
      newErrors.lastName = language === 'pt' ? 'Sobrenome é obrigatório' : 'Last name is required'
    }
    if (!formData.program) {
      newErrors.program = language === 'pt' ? 'Programa é obrigatório' : 'Program is required'
    }
    if (!formData.yearOfStudy) {
      newErrors.yearOfStudy = language === 'pt' ? 'Ano de estudo é obrigatório' : 'Year of study is required'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    setCurrentStep(3)
  }

  const handleDocumentUpload = (files: FileList | null, type: DocumentUpload['type']) => {
    if (!files || files.length === 0) return

    const file = files[0]
    
    // Validate file
    const maxSize = 5 * 1024 * 1024 // 5MB
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']

    if (file.size > maxSize) {
      setErrors({ 
        documents: language === 'pt' ? 
          'Arquivo muito grande. Máximo 5MB.' : 
          'File too large. Maximum 5MB.'
      })
      return
    }

    if (!allowedTypes.includes(file.type)) {
      setErrors({ 
        documents: language === 'pt' ? 
          'Tipo de arquivo inválido. Use PDF, JPG ou PNG.' : 
          'Invalid file type. Use PDF, JPG, or PNG.'
      })
      return
    }

    const newDocument: DocumentUpload = {
      id: `doc-${Date.now()}`,
      file,
      type,
      uploadProgress: 0,
      verified: false
    }

    setDocuments(prev => [...prev.filter(doc => doc.type !== type), newDocument])
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setDocuments(prev => prev.map(doc => 
        doc.id === newDocument.id 
          ? { ...doc, uploadProgress: Math.min(doc.uploadProgress + 20, 100) }
          : doc
      ))
    }, 200)

    setTimeout(() => {
      clearInterval(interval)
      setDocuments(prev => prev.map(doc => 
        doc.id === newDocument.id 
          ? { ...doc, uploadProgress: 100, verified: true }
          : doc
      ))
    }, 1000)

    setErrors({})
  }

  const handleSubmitVerification = async () => {
    if (documents.length === 0) {
      setErrors({ 
        documents: language === 'pt' ? 
          'Pelo menos um documento é obrigatório' : 
          'At least one document is required'
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Prepare verification data
      const verificationData = {
        studentId: `student-${Date.now()}`, // In real app, this would be the user's ID
        universityId: formData.universityId,
        email: formData.email,
        verificationMethod: 'email_domain' as const,
        studentInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          program: formData.program,
          yearOfStudy: formData.yearOfStudy,
          expectedGraduation: formData.expectedGraduation,
          studentNumber: formData.studentNumber
        },
        documents: documents.map(doc => ({
          id: doc.id,
          type: doc.type,
          fileName: doc.file.name,
          fileSize: doc.file.size,
          uploadedAt: new Date().toISOString(),
          verified: doc.verified
        }))
      }

      const newVerificationId = await universityPartnershipsService.submitStudentVerification(verificationData)
      setVerificationId(newVerificationId)
      setVerificationSubmitted(true)
      setCurrentStep(4)

      if (onVerificationComplete) {
        onVerificationComplete(newVerificationId)
      }
    } catch (error) {
      setErrors({ 
        submit: language === 'pt' ? 
          'Erro ao submeter verificação. Tente novamente.' : 
          'Error submitting verification. Please try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {language === 'pt' ? 'Verificação de Email Universitário' : 'University Email Verification'}
              </h3>
              <p className="text-secondary-600">
                {language === 'pt' ?
                  'Insira o seu email universitário oficial (.ac.uk) para verificação automática da sua universidade.' :
                  'Enter your official university email (.ac.uk) for automatic university verification.'
                }
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  {language === 'pt' ? 'Email Universitário' : 'University Email'}
                  <span className="text-coral-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <EnvelopeIcon className="absolute left-3 top-1/2 transform -transecondary-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="your.name@university.ac.uk"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      errors.email ? 'border-red-300' : 'border-secondary-300'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-coral-600 flex items-center">
                    <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>

              {emailVerificationResult && !emailVerificationResult.isValid && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-yellow-800 mb-2">
                        {language === 'pt' ? 'Email não reconhecido' : 'Email not recognized'}
                      </h4>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        {emailVerificationResult.suggestions?.map((suggestion, index) => (
                          <li key={index}>• {suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {emailVerificationResult?.isValid && emailVerificationResult.university && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <CheckBadgeIcon className="w-5 h-5 text-action-600 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-green-800 mb-1">
                        {language === 'pt' ? 'Universidade Verificada' : 'University Verified'}
                      </h4>
                      <p className="text-sm text-green-700">
                        {language === 'pt' ? emailVerificationResult.university.namePortuguese : emailVerificationResult.university.name}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={handleEmailVerification}
                disabled={!formData.email}
                className="w-full bg-primary-500 text-white font-medium py-3 px-4 rounded-lg hover:bg-primary-600 disabled:bg-secondary-300 disabled:cursor-not-allowed transition-colors"
              >
                {language === 'pt' ? 'Verificar Email' : 'Verify Email'}
              </button>
            </div>
          </div>
        )

      case 2:
        return (
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {language === 'pt' ? 'Informações Acadêmicas' : 'Academic Information'}
              </h3>
              <p className="text-secondary-600">
                {language === 'pt' ?
                  'Forneça os seus dados acadêmicos para completar a verificação.' :
                  'Provide your academic details to complete verification.'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  {language === 'pt' ? 'Nome' : 'First Name'}
                  <span className="text-coral-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.firstName ? 'border-red-300' : 'border-secondary-300'
                  }`}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-coral-600">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  {language === 'pt' ? 'Sobrenome' : 'Last Name'}
                  <span className="text-coral-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.lastName ? 'border-red-300' : 'border-secondary-300'
                  }`}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-coral-600">{errors.lastName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  {language === 'pt' ? 'Programa de Estudo' : 'Study Program'}
                  <span className="text-coral-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  value={formData.program}
                  onChange={(e) => setFormData(prev => ({ ...prev, program: e.target.value }))}
                  placeholder={language === 'pt' ? 'Ex: Estudos Portugueses' : 'e.g., Portuguese Studies'}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.program ? 'border-red-300' : 'border-secondary-300'
                  }`}
                />
                {errors.program && (
                  <p className="mt-1 text-sm text-coral-600">{errors.program}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  {language === 'pt' ? 'Ano de Estudo' : 'Year of Study'}
                  <span className="text-coral-500 ml-1">*</span>
                </label>
                <select
                  value={formData.yearOfStudy}
                  onChange={(e) => setFormData(prev => ({ ...prev, yearOfStudy: e.target.value }))}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.yearOfStudy ? 'border-red-300' : 'border-secondary-300'
                  }`}
                >
                  <option value="">{language === 'pt' ? 'Selecione o ano' : 'Select year'}</option>
                  <option value="1st">1st Year / Foundation</option>
                  <option value="2nd">2nd Year</option>
                  <option value="3rd">3rd Year</option>
                  <option value="4th">4th Year</option>
                  <option value="masters">Masters</option>
                  <option value="phd">PhD / Research</option>
                </select>
                {errors.yearOfStudy && (
                  <p className="mt-1 text-sm text-coral-600">{errors.yearOfStudy}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  {language === 'pt' ? 'Graduação Esperada' : 'Expected Graduation'}
                </label>
                <input
                  type="month"
                  value={formData.expectedGraduation}
                  onChange={(e) => setFormData(prev => ({ ...prev, expectedGraduation: e.target.value }))}
                  className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  {language === 'pt' ? 'Número de Estudante' : 'Student Number'}
                  <span className="text-xs text-gray-500 ml-1">({language === 'pt' ? 'opcional' : 'optional'})</span>
                </label>
                <input
                  type="text"
                  value={formData.studentNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, studentNumber: e.target.value }))}
                  className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setCurrentStep(1)}
                className="flex-1 border border-secondary-300 text-secondary-700 font-medium py-3 px-4 rounded-lg hover:bg-secondary-50 transition-colors"
              >
                {language === 'pt' ? 'Voltar' : 'Back'}
              </button>
              <button
                onClick={handlePersonalInfoSubmit}
                className="flex-1 bg-primary-500 text-white font-medium py-3 px-4 rounded-lg hover:bg-primary-600 transition-colors"
              >
                {language === 'pt' ? 'Continuar' : 'Continue'}
              </button>
            </div>
          </div>
        )

      case 3:
        return (
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {language === 'pt' ? 'Documentos de Verificação' : 'Verification Documents'}
              </h3>
              <p className="text-secondary-600">
                {language === 'pt' ?
                  'Carregue pelo menos um documento para verificar o seu status de estudante.' :
                  'Upload at least one document to verify your student status.'
                }
              </p>
            </div>

            <div className="space-y-4">
              {/* Student ID Upload */}
              <div className="border-2 border-dashed border-secondary-300 rounded-lg p-6">
                <div className="text-center">
                  <PhotoIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="font-medium text-gray-900 mb-2">
                    {language === 'pt' ? 'Cartão de Estudante' : 'Student ID Card'}
                  </h4>
                  <p className="text-sm text-secondary-600 mb-4">
                    {language === 'pt' ? 
                      'Fotografia clara do seu cartão de estudante oficial' :
                      'Clear photo of your official student ID card'
                    }
                  </p>
                  <input
                    type="file"
                    id="student-id"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleDocumentUpload(e.target.files, 'student_id')}
                    className="hidden"
                  />
                  <label
                    htmlFor="student-id"
                    className="inline-flex items-center px-4 py-2 bg-white border border-secondary-300 rounded-lg text-sm font-medium text-secondary-700 hover:bg-secondary-50 cursor-pointer"
                  >
                    <PaperClipIcon className="w-4 h-4 mr-2" />
                    {language === 'pt' ? 'Selecionar Arquivo' : 'Select File'}
                  </label>
                </div>
              </div>

              {/* Enrollment Letter Upload */}
              <div className="border-2 border-dashed border-secondary-300 rounded-lg p-6">
                <div className="text-center">
                  <DocumentTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="font-medium text-gray-900 mb-2">
                    {language === 'pt' ? 'Carta de Confirmação' : 'Enrollment Letter'}
                  </h4>
                  <p className="text-sm text-secondary-600 mb-4">
                    {language === 'pt' ? 
                      'Carta oficial da universidade confirmando a sua matrícula' :
                      'Official letter from university confirming your enrollment'
                    }
                  </p>
                  <input
                    type="file"
                    id="enrollment-letter"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleDocumentUpload(e.target.files, 'enrollment_letter')}
                    className="hidden"
                  />
                  <label
                    htmlFor="enrollment-letter"
                    className="inline-flex items-center px-4 py-2 bg-white border border-secondary-300 rounded-lg text-sm font-medium text-secondary-700 hover:bg-secondary-50 cursor-pointer"
                  >
                    <PaperClipIcon className="w-4 h-4 mr-2" />
                    {language === 'pt' ? 'Selecionar Arquivo' : 'Select File'}
                  </label>
                </div>
              </div>

              {/* Uploaded Documents */}
              {documents.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-medium text-gray-900 mb-4">
                    {language === 'pt' ? 'Documentos Carregados' : 'Uploaded Documents'}
                  </h4>
                  <div className="space-y-3">
                    {documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                        <div className="flex items-center">
                          <DocumentTextIcon className="w-5 h-5 text-gray-400 mr-3" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{doc.file.name}</p>
                            <p className="text-xs text-gray-500">
                              {(doc.file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {doc.uploadProgress < 100 ? (
                            <div className="flex items-center">
                              <div className="w-24 bg-secondary-200 rounded-full h-2 mr-3">
                                <div 
                                  className="bg-primary-500 h-2 rounded-full" 
                                  style={{ width: `${doc.uploadProgress}%` }}
                                ></div>
                              </div>
                              <span className="text-xs text-gray-500">{doc.uploadProgress}%</span>
                            </div>
                          ) : doc.verified ? (
                            <CheckIconSolid className="w-5 h-5 text-action-500" />
                          ) : (
                            <ClockIcon className="w-5 h-5 text-accent-500" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {errors.documents && (
                <p className="text-sm text-coral-600 flex items-center">
                  <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                  {errors.documents}
                </p>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setCurrentStep(2)}
                className="flex-1 border border-secondary-300 text-secondary-700 font-medium py-3 px-4 rounded-lg hover:bg-secondary-50 transition-colors"
              >
                {language === 'pt' ? 'Voltar' : 'Back'}
              </button>
              <button
                onClick={handleSubmitVerification}
                disabled={documents.length === 0 || isSubmitting}
                className="flex-1 bg-primary-500 text-white font-medium py-3 px-4 rounded-lg hover:bg-primary-600 disabled:bg-secondary-300 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 
                  (language === 'pt' ? 'Submetendo...' : 'Submitting...') :
                  (language === 'pt' ? 'Submeter Verificação' : 'Submit Verification')
                }
              </button>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="text-center">
            <CheckBadgeIcon className="w-16 h-16 text-action-500 mx-auto mb-6" />
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {language === 'pt' ? 'Verificação Submetida com Sucesso!' : 'Verification Successfully Submitted!'}
            </h3>
            <p className="text-secondary-600 mb-6">
              {language === 'pt' ?
                'A sua verificação de estudante foi submetida e está sendo processada. Receberá um email de confirmação em 24-48 horas.' :
                'Your student verification has been submitted and is being processed. You will receive a confirmation email within 24-48 hours.'
              }
            </p>

            {verificationId && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>{language === 'pt' ? 'ID de Verificação:' : 'Verification ID:'}</strong>
                  <br />
                  <code className="font-mono">{verificationId}</code>
                </p>
              </div>
            )}

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <h4 className="font-medium text-green-800 mb-4">
                {language === 'pt' ? 'Próximos Passos:' : 'Next Steps:'}
              </h4>
              <ul className="text-sm text-green-700 space-y-2 text-left">
                <li className="flex items-start">
                  <CheckIconSolid className="w-4 h-4 text-action-500 mr-2 mt-0.5 flex-shrink-0" />
                  {language === 'pt' ? 
                    'Verifique o seu email para confirmação da submissão' :
                    'Check your email for submission confirmation'
                  }
                </li>
                <li className="flex items-start">
                  <CheckIconSolid className="w-4 h-4 text-action-500 mr-2 mt-0.5 flex-shrink-0" />
                  {language === 'pt' ? 
                    'Complete o seu perfil LusoTown enquanto aguarda' :
                    'Complete your LusoTown profile while waiting'
                  }
                </li>
                <li className="flex items-start">
                  <CheckIconSolid className="w-4 h-4 text-action-500 mr-2 mt-0.5 flex-shrink-0" />
                  {language === 'pt' ? 
                    'Explore eventos abertos para todos os membros' :
                    'Explore events open to all members'
                  }
                </li>
                <li className="flex items-start">
                  <CheckIconSolid className="w-4 h-4 text-action-500 mr-2 mt-0.5 flex-shrink-0" />
                  {language === 'pt' ? 
                    'Junte-se aos grupos de estudantes portugueses' :
                    'Join Portuguese student groups'
                  }
                </li>
              </ul>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <ClockIcon className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <h4 className="font-medium text-yellow-800 mb-1">
                    {language === 'pt' ? 'Tempo de Processamento' : 'Processing Time'}
                  </h4>
                  <p className="text-sm text-yellow-700">
                    {language === 'pt' ?
                      'As verificações são processadas manualmente para garantir segurança. O tempo típico é de 24-48 horas durante dias úteis.' :
                      'Verifications are manually processed to ensure security. Typical time is 24-48 hours during business days.'
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 bg-primary-500 text-white font-medium py-3 px-4 rounded-lg hover:bg-primary-600 transition-colors"
              >
                {language === 'pt' ? 'Concluir' : 'Complete'}
              </button>
              <button
                onClick={() => window.open('/students/events', '_blank')}
                className="flex-1 border border-secondary-300 text-secondary-700 font-medium py-3 px-4 rounded-lg hover:bg-secondary-50 transition-colors"
              >
                {language === 'pt' ? 'Ver Eventos' : 'View Events'}
              </button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const content = (
    <div className={isModal ? 'bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto' : ''}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {language === 'pt' ? 'Verificação de Estudante' : 'Student Verification'}
            </h2>
            <p className="text-secondary-600">
              {language === 'pt' ? 
                'Obtenha 50% de desconto na adesão LusoTown' :
                'Get 50% discount on LusoTown membership'
              }
            </p>
          </div>
          {isModal && onClose && (
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-secondary-600"
            >
              <XCircleIcon className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    step.completed ? 'bg-action-500 text-white' :
                    step.current ? 'bg-primary-500 text-white' :
                    'bg-secondary-200 text-secondary-600'
                  }`}>
                    {step.completed ? (
                      <CheckIconSolid className="w-5 h-5" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <p className={`text-xs font-medium ${
                      step.current ? 'text-primary-600' : 'text-gray-500'
                    }`}>
                      {language === 'pt' ? step.titlePortuguese : step.title}
                    </p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-4 ${
                    step.completed ? 'bg-action-500' : 'bg-secondary-200'
                  }`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step Content */}
        {renderStepContent()}

        {/* Error Display */}
        {errors.submit && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <ExclamationTriangleIcon className="w-5 h-5 text-coral-600 mr-2" />
              <p className="text-sm text-red-700">{errors.submit}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  if (isModal) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        {content}
      </div>
    )
  }

  return content
}