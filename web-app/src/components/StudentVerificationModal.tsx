'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  XMarkIcon,
  AcademicCapIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { useSubscription } from '@/context/SubscriptionContext'

interface StudentVerificationModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

interface University {
  id: string
  name: string
  namePortuguese: string
  domains: string[]
  location: string
}

const ukUniversities: University[] = [
  {
    id: 'cambridge',
    name: 'University of Cambridge',
    namePortuguese: 'Universidade de Cambridge',
    domains: ['cam.ac.uk', 'student.cam.ac.uk'],
    location: 'Cambridge'
  },
  {
    id: 'oxford',
    name: 'University of Oxford',
    namePortuguese: 'Universidade de Oxford',
    domains: ['ox.ac.uk', 'student.ox.ac.uk'],
    location: 'Oxford'
  },
  {
    id: 'imperial',
    name: 'Imperial College London',
    namePortuguese: 'Imperial College Londres',
    domains: ['imperial.ac.uk', 'ic.ac.uk'],
    location: 'London'
  },
  {
    id: 'ucl',
    name: 'University College London',
    namePortuguese: 'University College Londres',
    domains: ['ucl.ac.uk', 'live.ucl.ac.uk'],
    location: 'London'
  },
  {
    id: 'lse',
    name: 'London School of Economics',
    namePortuguese: 'Escola de Economia de Londres',
    domains: ['lse.ac.uk', 'student.lse.ac.uk'],
    location: 'London'
  },
  {
    id: 'kcl',
    name: 'King\'s College London',
    namePortuguese: 'King\'s College Londres',
    domains: ['kcl.ac.uk', 'student.kcl.ac.uk'],
    location: 'London'
  }
]

export default function StudentVerificationModal({
  isOpen,
  onClose,
  onSuccess
}: StudentVerificationModalProps) {
  const { language } = useLanguage()
  const { validateStudentStatus } = useSubscription()
  const [step, setStep] = useState<'select-university' | 'enter-email' | 'verification' | 'success'>('select-university')
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null)
  const [studentEmail, setStudentEmail] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState('')
  
  const isPortuguese = language === 'pt'

  const handleUniversitySelect = (university: University) => {
    setSelectedUniversity(university)
    setStep('enter-email')
  }

  const validateEmail = (email: string, domains: string[]) => {
    const emailDomain = email.split('@')[1]
    return domains.some(domain => emailDomain === domain || emailDomain.endsWith(`.${domain}`))
  }

  const handleEmailSubmit = async () => {
    if (!selectedUniversity || !studentEmail) return
    
    if (!validateEmail(studentEmail, selectedUniversity.domains)) {
      setError(isPortuguese 
        ? 'Use um email v·lido da sua universidade'
        : 'Please use a valid university email address'
      )
      return
    }

    setIsVerifying(true)
    setError('')
    
    try {
      // In a real implementation, this would send a verification email
      const isValid = await validateStudentStatus(studentEmail, selectedUniversity.id)
      
      if (isValid) {
        setStep('verification')
      } else {
        setError(isPortuguese 
          ? 'N„o foi possÌvel verificar o status de estudante'
          : 'Unable to verify student status'
        )
      }
    } catch (error) {
      setError(isPortuguese 
        ? 'Erro ao verificar email'
        : 'Error verifying email'
      )
    } finally {
      setIsVerifying(false)
    }
  }

  const handleVerificationSubmit = () => {
    if (verificationCode.length === 6) {
      setStep('success')
      setTimeout(() => {
        onSuccess()
        onClose()
      }, 2000)
    } else {
      setError(isPortuguese 
        ? 'CÛdigo de verificaÁ„o inv·lido'
        : 'Invalid verification code'
      )
    }
  }

  const resetForm = () => {
    setStep('select-university')
    setSelectedUniversity(null)
    setStudentEmail('')
    setVerificationCode('')
    setError('')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 max-h-[80vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <AcademicCapIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {isPortuguese ? 'VerificaÁ„o de Estudante' : 'Student Verification'}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {isPortuguese ? 'Obtenha 50% de desconto' : 'Get 50% discount'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Step 1: University Selection */}
              {step === 'select-university' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <h4 className="font-medium text-gray-900 mb-4">
                    {isPortuguese ? 'Selecione sua universidade:' : 'Select your university:'}
                  </h4>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {ukUniversities.map((university) => (
                      <button
                        key={university.id}
                        onClick={() => handleUniversitySelect(university)}
                        className="w-full p-3 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                      >
                        <div className="font-medium text-gray-900">
                          {isPortuguese ? university.namePortuguese : university.name}
                        </div>
                        <div className="text-sm text-gray-500">{university.location}</div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Email Entry */}
              {step === 'enter-email' && selectedUniversity && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <button
                    onClick={() => setStep('select-university')}
                    className="text-sm text-blue-600 hover:text-blue-700 mb-4"
                  >
                    ê {isPortuguese ? 'Voltar' : 'Back'}
                  </button>
                  
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">
                      {isPortuguese ? 'Digite seu email universit·rio:' : 'Enter your university email:'}
                    </h4>
                    <div className="text-sm text-gray-600 mb-4">
                      {isPortuguese ? 'Universidade selecionada:' : 'Selected university:'} {' '}
                      <span className="font-medium">
                        {isPortuguese ? selectedUniversity.namePortuguese : selectedUniversity.name}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {isPortuguese ? 'Email do estudante' : 'Student email'}
                      </label>
                      <input
                        type="email"
                        value={studentEmail}
                        onChange={(e) => {
                          setStudentEmail(e.target.value)
                          setError('')
                        }}
                        placeholder={`your.name@${selectedUniversity.domains[0]}`}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <div className="mt-1 text-xs text-gray-500">
                        {isPortuguese ? 'DomÌnios aceitos:' : 'Accepted domains:'} {selectedUniversity.domains.join(', ')}
                      </div>
                    </div>

                    {error && (
                      <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                        <ExclamationCircleIcon className="w-4 h-4" />
                        {error}
                      </div>
                    )}

                    <button
                      onClick={handleEmailSubmit}
                      disabled={!studentEmail || isVerifying}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isVerifying 
                        ? (isPortuguese ? 'Verificando...' : 'Verifying...')
                        : (isPortuguese ? 'Enviar cÛdigo de verificaÁ„o' : 'Send verification code')
                      }
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Verification Code */}
              {step === 'verification' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className="text-center mb-6">
                    <h4 className="font-medium text-gray-900 mb-2">
                      {isPortuguese ? 'Digite o cÛdigo de verificaÁ„o' : 'Enter verification code'}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {isPortuguese 
                        ? `Enviamos um cÛdigo de 6 dÌgitos para ${studentEmail}`
                        : `We sent a 6-digit code to ${studentEmail}`
                      }
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <input
                        type="text"
                        value={verificationCode}
                        onChange={(e) => {
                          setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))
                          setError('')
                        }}
                        placeholder="123456"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center text-lg tracking-widest"
                        maxLength={6}
                      />
                    </div>

                    {error && (
                      <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                        <ExclamationCircleIcon className="w-4 h-4" />
                        {error}
                      </div>
                    )}

                    <button
                      onClick={handleVerificationSubmit}
                      disabled={verificationCode.length !== 6}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isPortuguese ? 'Verificar cÛdigo' : 'Verify code'}
                    </button>

                    <button
                      onClick={() => setStep('enter-email')}
                      className="w-full text-sm text-gray-500 hover:text-gray-700"
                    >
                      {isPortuguese ? 'Reenviar cÛdigo' : 'Resend code'}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Success */}
              {step === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircleIcon className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    {isPortuguese ? 'VerificaÁ„o ConcluÌda!' : 'Verification Complete!'}
                  </h4>
                  <p className="text-gray-600 mb-4">
                    {isPortuguese 
                      ? 'Seu desconto de estudante de 50% foi aplicado.'
                      : 'Your 50% student discount has been applied.'
                    }
                  </p>
                  <div className="text-sm text-gray-500">
                    {isPortuguese ? 'Redirecionando...' : 'Redirecting...'}
                  </div>
                </motion.div>
              )}

              {/* Benefits Footer */}
              {step !== 'success' && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    <div className="font-medium mb-2">
                      {isPortuguese ? 'BenefÌcios do plano estudante:' : 'Student plan benefits:'}
                    </div>
                    <ul className="space-y-1 text-xs">
                      <li>" {isPortuguese ? '50% de desconto em todas as assinaturas' : '50% discount on all subscriptions'}</li>
                      <li>" {isPortuguese ? '50 matches por dia' : '50 matches per day'}</li>
                      <li>" {isPortuguese ? '100 mensagens por mÍs' : '100 messages per month'}</li>
                      <li>" {isPortuguese ? 'Acesso a eventos de estudantes' : 'Access to student events'}</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}