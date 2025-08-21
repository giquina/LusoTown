'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  Calendar, 
  Upload, 
  Camera, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Mail,
  FileText,
  User
} from 'lucide-react'

interface AgeVerificationModalProps {
  isOpen: boolean
  onClose: () => void
  onVerified: (verified: boolean) => void
  userId?: string
}

interface VerificationData {
  dateOfBirth: string
  verificationMethod: 'document_upload' | 'selfie_verification' | 'parent_guardian'
  documentType?: string
  parentEmail?: string
  documentFile?: File
  selfieFile?: File
}

export default function AgeVerificationModal({ 
  isOpen, 
  onClose, 
  onVerified,
  userId 
}: AgeVerificationModalProps) {
  const { language } = useLanguage()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [verificationData, setVerificationData] = useState<VerificationData>({
    dateOfBirth: '',
    verificationMethod: 'document_upload'
  })
  const [age, setAge] = useState<number | null>(null)
  const [requiresParentConsent, setRequiresParentConsent] = useState(false)

  useEffect(() => {
    if (verificationData.dateOfBirth) {
      const birthDate = new Date(verificationData.dateOfBirth)
      const today = new Date()
      const calculatedAge = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        setAge(calculatedAge - 1)
      } else {
        setAge(calculatedAge)
      }
      
      setRequiresParentConsent(calculatedAge < 21)
    }
  }, [verificationData.dateOfBirth])

  const translations = {
    en: {
      title: 'Age Verification Required',
      subtitle: 'Verify your age to access messaging features',
      step1: {
        title: 'Date of Birth',
        description: 'Please enter your date of birth for age verification',
        dateLabel: 'Date of Birth',
        ageDisplay: 'Age',
        continue: 'Continue'
      },
      step2: {
        title: 'Verification Method',
        description: 'Choose how you\'d like to verify your identity',
        documentUpload: 'Document Upload',
        documentDesc: 'Upload a photo of your ID, passport, or driving license',
        selfieVerification: 'Selfie Verification',
        selfieDesc: 'Take a selfie with your ID document',
        parentGuardian: 'Parent/Guardian Consent',
        parentDesc: 'Required for users under 21 - parent/guardian approval needed'
      },
      step3: {
        title: 'Upload Documents',
        documentType: 'Document Type',
        documentTypes: {
          passport: 'Passport',
          driving_license: 'Driving License',
          national_id: 'National ID Card'
        },
        uploadDocument: 'Upload Document',
        takeSelfie: 'Take Selfie with Document',
        parentEmail: 'Parent/Guardian Email',
        parentEmailDesc: 'We\'ll send a consent form to your parent/guardian'
      },
      step4: {
        title: 'Verification Submitted',
        description: 'Your verification has been submitted for review',
        processingTime: 'Processing time: 24-48 hours',
        emailNotification: 'You\'ll receive an email when verification is complete',
        parentConsent: 'Parent consent email sent',
        temporaryAccess: 'Limited messaging access available during verification'
      },
      warnings: {
        under18: 'Users under 18 require parent/guardian supervision',
        under21: 'Users under 21 need parent/guardian consent for messaging',
        dataProtection: 'Your personal data is protected and will only be used for verification'
      },
      buttons: {
        cancel: 'Cancel',
        back: 'Back',
        continue: 'Continue',
        submit: 'Submit Verification',
        close: 'Close'
      },
      errors: {
        invalidDate: 'Please enter a valid date of birth',
        under18: 'You must be at least 18 years old to use messaging features',
        noDocument: 'Please upload a document',
        invalidEmail: 'Please enter a valid parent/guardian email'
      }
    },
    pt: {
      title: 'Verificação de Idade Necessária',
      subtitle: 'Verifique a sua idade para aceder às funcionalidades de mensagens',
      step1: {
        title: 'Data de Nascimento',
        description: 'Por favor introduza a sua data de nascimento para verificação de idade',
        dateLabel: 'Data de Nascimento',
        ageDisplay: 'Idade',
        continue: 'Continuar'
      },
      step2: {
        title: 'Método de Verificação',
        description: 'Escolha como gostaria de verificar a sua identidade',
        documentUpload: 'Upload de Documento',
        documentDesc: 'Carregue uma foto do seu ID, passaporte ou carta de condução',
        selfieVerification: 'Verificação por Selfie',
        selfieDesc: 'Tire uma selfie com o seu documento de identificação',
        parentGuardian: 'Consentimento dos Pais/Responsável',
        parentDesc: 'Obrigatório para utilizadores com menos de 21 anos - aprovação dos pais/responsável necessária'
      },
      step3: {
        title: 'Carregar Documentos',
        documentType: 'Tipo de Documento',
        documentTypes: {
          passport: 'Passaporte',
          driving_license: 'Carta de Condução',
          national_id: 'Cartão de Cidadão'
        },
        uploadDocument: 'Carregar Documento',
        takeSelfie: 'Tirar Selfie com Documento',
        parentEmail: 'Email dos Pais/Responsável',
        parentEmailDesc: 'Enviaremos um formulário de consentimento para os seus pais/responsável'
      },
      step4: {
        title: 'Verificação Submetida',
        description: 'A sua verificação foi submetida para revisão',
        processingTime: 'Tempo de processamento: 24-48 horas',
        emailNotification: 'Receberá um email quando a verificação estiver completa',
        parentConsent: 'Email de consentimento parental enviado',
        temporaryAccess: 'Acesso limitado a mensagens disponível durante a verificação'
      },
      warnings: {
        under18: 'Utilizadores com menos de 18 anos requerem supervisão dos pais/responsável',
        under21: 'Utilizadores com menos de 21 anos precisam de consentimento dos pais/responsável para mensagens',
        dataProtection: 'Os seus dados pessoais estão protegidos e serão apenas utilizados para verificação'
      },
      buttons: {
        cancel: 'Cancelar',
        back: 'Voltar',
        continue: 'Continuar',
        submit: 'Submeter Verificação',
        close: 'Fechar'
      },
      errors: {
        invalidDate: 'Por favor introduza uma data de nascimento válida',
        under18: 'Deve ter pelo menos 18 anos para usar as funcionalidades de mensagens',
        noDocument: 'Por favor carregue um documento',
        invalidEmail: 'Por favor introduza um email válido dos pais/responsável'
      }
    }
  }

  const t = translations[language]

  const handleContinue = () => {
    if (step === 1) {
      if (!verificationData.dateOfBirth || age === null) {
        alert(t.errors.invalidDate)
        return
      }
      if (age < 18) {
        alert(t.errors.under18)
        return
      }
      setStep(2)
    } else if (step === 2) {
      setStep(3)
    } else if (step === 3) {
      handleSubmitVerification()
    }
  }

  const handleSubmitVerification = async () => {
    setLoading(true)
    try {
      // Simulate API call to submit verification
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock verification submission
      const verificationRequest = {
        userId,
        dateOfBirth: verificationData.dateOfBirth,
        age: age,
        verificationMethod: verificationData.verificationMethod,
        documentType: verificationData.documentType,
        parentEmail: verificationData.parentEmail,
        requiresParentConsent
      }
      
      console.log('Submitting verification:', verificationRequest)
      setStep(4)
    } catch (error) {
      console.error('Verification submission error:', error)
      alert('Error submitting verification. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'document' | 'selfie') => {
    const file = event.target.files?.[0]
    if (file) {
      if (type === 'document') {
        setVerificationData(prev => ({ ...prev, documentFile: file }))
      } else {
        setVerificationData(prev => ({ ...prev, selfieFile: file }))
      }
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-100">
            <div>
              <h2 className="text-xl font-bold text-neutral-900">{t.title}</h2>
              <p className="text-sm text-neutral-600 mt-1">{t.subtitle}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-neutral-600 rounded-lg hover:bg-neutral-50"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="px-6 py-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-primary-600">
                Step {step} of 4
              </span>
              <span className="text-xs text-neutral-500">
                {Math.round((step / 4) * 100)}%
              </span>
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-2">
              <div 
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>

          {/* Step Content */}
          <div className="p-6">
            {/* Step 1: Date of Birth */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <Calendar className="h-12 w-12 text-primary-600 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    {t.step1.title}
                  </h3>
                  <p className="text-neutral-600">{t.step1.description}</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      {t.step1.dateLabel}
                    </label>
                    <input
                      type="date"
                      value={verificationData.dateOfBirth}
                      onChange={(e) => setVerificationData(prev => ({ 
                        ...prev, 
                        dateOfBirth: e.target.value 
                      }))}
                      max={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>

                  {age !== null && (
                    <div className="bg-neutral-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-neutral-700">
                          {t.step1.ageDisplay}:
                        </span>
                        <span className="text-lg font-bold text-primary-600">
                          {age} years old
                        </span>
                      </div>
                      
                      {requiresParentConsent && (
                        <div className="mt-3 flex items-start gap-2 p-3 bg-amber-50 rounded-lg">
                          <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                          <div className="text-sm text-amber-800">
                            {t.warnings.under21}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Verification Method */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <Shield className="h-12 w-12 text-primary-600 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    {t.step2.title}
                  </h3>
                  <p className="text-neutral-600">{t.step2.description}</p>
                </div>

                <div className="space-y-3">
                  {/* Document Upload */}
                  <button
                    onClick={() => setVerificationData(prev => ({ 
                      ...prev, 
                      verificationMethod: 'document_upload' 
                    }))}
                    className={`w-full p-4 rounded-lg border-2 transition-all ${
                      verificationData.verificationMethod === 'document_upload'
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Upload className="h-5 w-5 text-primary-600 mt-1" />
                      <div className="text-left">
                        <div className="font-medium text-neutral-900">
                          {t.step2.documentUpload}
                        </div>
                        <div className="text-sm text-neutral-600 mt-1">
                          {t.step2.documentDesc}
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Selfie Verification */}
                  <button
                    onClick={() => setVerificationData(prev => ({ 
                      ...prev, 
                      verificationMethod: 'selfie_verification' 
                    }))}
                    className={`w-full p-4 rounded-lg border-2 transition-all ${
                      verificationData.verificationMethod === 'selfie_verification'
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Camera className="h-5 w-5 text-primary-600 mt-1" />
                      <div className="text-left">
                        <div className="font-medium text-neutral-900">
                          {t.step2.selfieVerification}
                        </div>
                        <div className="text-sm text-neutral-600 mt-1">
                          {t.step2.selfieDesc}
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Parent/Guardian Consent (required for under 21) */}
                  {requiresParentConsent && (
                    <button
                      onClick={() => setVerificationData(prev => ({ 
                        ...prev, 
                        verificationMethod: 'parent_guardian' 
                      }))}
                      className={`w-full p-4 rounded-lg border-2 transition-all ${
                        verificationData.verificationMethod === 'parent_guardian'
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <User className="h-5 w-5 text-primary-600 mt-1" />
                        <div className="text-left">
                          <div className="font-medium text-neutral-900">
                            {t.step2.parentGuardian}
                          </div>
                          <div className="text-sm text-neutral-600 mt-1">
                            {t.step2.parentDesc}
                          </div>
                        </div>
                      </div>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Upload Documents */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <FileText className="h-12 w-12 text-primary-600 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    {t.step3.title}
                  </h3>
                </div>

                {verificationData.verificationMethod !== 'parent_guardian' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        {t.step3.documentType}
                      </label>
                      <select
                        value={verificationData.documentType || ''}
                        onChange={(e) => setVerificationData(prev => ({ 
                          ...prev, 
                          documentType: e.target.value 
                        }))}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="">Select document type</option>
                        <option value="passport">{t.step3.documentTypes.passport}</option>
                        <option value="driving_license">{t.step3.documentTypes.driving_license}</option>
                        <option value="national_id">{t.step3.documentTypes.national_id}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        {t.step3.uploadDocument}
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'document')}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>

                    {verificationData.verificationMethod === 'selfie_verification' && (
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          {t.step3.takeSelfie}
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          capture="user"
                          onChange={(e) => handleFileUpload(e, 'selfie')}
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                    )}
                  </div>
                )}

                {(verificationData.verificationMethod === 'parent_guardian' || requiresParentConsent) && (
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      {t.step3.parentEmail}
                    </label>
                    <input
                      type="email"
                      value={verificationData.parentEmail || ''}
                      onChange={(e) => setVerificationData(prev => ({ 
                        ...prev, 
                        parentEmail: e.target.value 
                      }))}
                      placeholder="parent@example.com"
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    />
                    <p className="text-sm text-neutral-600 mt-2">
                      {t.step3.parentEmailDesc}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && (
              <div className="space-y-6 text-center">
                <div>
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    {t.step4.title}
                  </h3>
                  <p className="text-neutral-600">{t.step4.description}</p>
                </div>

                <div className="bg-green-50 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-green-800">{t.step4.processingTime}</p>
                  <p className="text-sm text-green-800">{t.step4.emailNotification}</p>
                  {requiresParentConsent && (
                    <p className="text-sm text-green-800">{t.step4.parentConsent}</p>
                  )}
                  <p className="text-sm font-medium text-green-800 mt-3">
                    {t.step4.temporaryAccess}
                  </p>
                </div>
              </div>
            )}

            {/* Data Protection Notice */}
            <div className="mt-6 p-3 bg-blue-50 rounded-lg">
              <div className="flex items-start gap-2">
                <Shield className="h-4 w-4 text-blue-600 mt-0.5" />
                <p className="text-xs text-blue-800">
                  {t.warnings.dataProtection}
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-neutral-100">
            {step > 1 && step < 4 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-2 text-neutral-600 hover:text-neutral-900"
              >
                {t.buttons.back}
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-6 py-2 text-neutral-600 hover:text-neutral-900"
              >
                {step === 4 ? t.buttons.close : t.buttons.cancel}
              </button>
            )}

            {step < 4 && (
              <button
                onClick={handleContinue}
                disabled={loading || (step === 1 && (!verificationData.dateOfBirth || age === null))}
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                ) : null}
                {step === 3 ? t.buttons.submit : t.buttons.continue}
              </button>
            )}

            {step === 4 && (
              <button
                onClick={() => {
                  onVerified(true)
                  onClose()
                }}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
              >
                {t.buttons.close}
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}