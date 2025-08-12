'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  CheckBadgeIcon,
  CameraIcon,
  EnvelopeIcon,
  DevicePhoneMobileIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  ClockIcon
} from '@heroicons/react/24/outline'
import { UserProfile } from '@/lib/connections'
import { toast } from 'react-hot-toast'

interface ProfileVerificationProps {
  profile: UserProfile | null
  onUpdate: () => void
}

type VerificationStep = 'email' | 'phone' | 'photo' | 'background'

export default function ProfileVerification({ profile, onUpdate }: ProfileVerificationProps) {
  const [loading, setLoading] = useState<Record<VerificationStep, boolean>>({
    email: false,
    phone: false,
    photo: false,
    background: false
  })

  const verification = profile?.verification || {
    emailVerified: false,
    phoneVerified: false,
    photoVerified: false,
    backgroundChecked: false
  }

  const handleVerificationStep = async (step: VerificationStep) => {
    setLoading(prev => ({ ...prev, [step]: true }))

    try {
      // Simulate verification process
      await new Promise(resolve => setTimeout(resolve, 2000))

      switch (step) {
        case 'email':
          toast.success('Verification email sent! Check your inbox.')
          break
        case 'phone':
          toast.success('Verification code sent to your phone!')
          break
        case 'photo':
          toast.success('Photo verification started!')
          break
        case 'background':
          toast.success('Background check initiated. Results in 24-48 hours.')
          break
      }

      onUpdate()
    } catch (error) {
      toast.error(`Failed to start ${step} verification`)
    } finally {
      setLoading(prev => ({ ...prev, [step]: false }))
    }
  }

  const verificationSteps = [
    {
      id: 'email' as VerificationStep,
      title: 'Email Verification',
      description: 'Verify your email address to secure your account',
      icon: <EnvelopeIcon className="w-6 h-6" />,
      completed: verification.emailVerified,
      required: true,
      points: 10,
      benefits: ['Account security', 'Password recovery', 'Important notifications']
    },
    {
      id: 'phone' as VerificationStep,
      title: 'Phone Verification',
      description: 'Add an extra layer of security with phone verification',
      icon: <DevicePhoneMobileIcon className="w-6 h-6" />,
      completed: verification.phoneVerified,
      required: false,
      points: 15,
      benefits: ['Two-factor authentication', 'Account recovery', 'SMS notifications']
    },
    {
      id: 'photo' as VerificationStep,
      title: 'Photo Verification',
      description: 'Verify your identity with a selfie to build trust',
      icon: <CameraIcon className="w-6 h-6" />,
      completed: verification.photoVerified,
      required: true,
      points: 25,
      benefits: ['Verified badge on profile', 'Increased trust', 'Better match visibility']
    },
    {
      id: 'background' as VerificationStep,
      title: 'Background Check',
      description: 'Optional background verification for premium safety',
      icon: <ShieldCheckIcon className="w-6 h-6" />,
      completed: verification.backgroundChecked,
      required: false,
      points: 50,
      benefits: ['Premium verification badge', 'Access to verified-only events', 'Enhanced profile visibility']
    }
  ]

  const completedCount = verificationSteps.filter(step => step.completed).length
  const totalPoints = verificationSteps.filter(step => step.completed).reduce((sum, step) => sum + step.points, 0)
  const maxPoints = verificationSteps.reduce((sum, step) => sum + step.points, 0)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Verification</h2>
        <p className="text-gray-600">
          Verify your account to build trust and unlock exclusive features.
        </p>
      </div>

      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Verification Progress</h3>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600">{completedCount}/4</div>
            <div className="text-sm text-gray-600">Steps Complete</div>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div
            className="bg-green-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${(completedCount / 4) * 100}%` }}
          ></div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">
            Verification Score: {totalPoints}/{maxPoints} points
          </span>
          <span className="text-green-600 font-medium">
            {completedCount === 4 ? '🌟 Fully Verified!' : `${4 - completedCount} steps remaining`}
          </span>
        </div>
      </motion.div>

      {/* Verification Steps */}
      <div className="space-y-4">
        {verificationSteps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`border rounded-xl p-6 transition-colors ${
              step.completed
                ? 'border-green-200 bg-green-50'
                : step.required
                ? 'border-red-200 bg-red-50'
                : 'border-gray-200 bg-white hover:bg-gray-50'
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                step.completed
                  ? 'bg-green-500 text-white'
                  : step.required
                  ? 'bg-red-100 text-red-600'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {step.completed ? (
                  <CheckBadgeIcon className="w-6 h-6" />
                ) : (
                  step.icon
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h4 className="text-lg font-semibold text-gray-900">{step.title}</h4>
                    {step.required && !step.completed && (
                      <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">
                        Required
                      </span>
                    )}
                    {step.completed && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    +{step.points} points
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{step.description}</p>

                {/* Benefits */}
                <div className="mb-4">
                  <h5 className="text-sm font-medium text-gray-900 mb-2">Benefits:</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {step.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button */}
                {!step.completed && (
                  <button
                    onClick={() => handleVerificationStep(step.id)}
                    disabled={loading[step.id]}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                      step.required
                        ? 'bg-red-500 text-white hover:bg-red-600 disabled:bg-red-300'
                        : 'bg-[#FF6B6B] text-white hover:bg-[#FF5252] disabled:bg-gray-300'
                    } disabled:cursor-not-allowed`}
                  >
                    {loading[step.id] ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        {step.icon}
                        Start {step.title}
                      </>
                    )}
                  </button>
                )}

                {step.completed && (
                  <div className="flex items-center gap-2 text-green-700 font-medium">
                    <CheckBadgeIcon className="w-4 h-4" />
                    <span>Verification Complete</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Verification Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-blue-50 border border-blue-200 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
          <ShieldCheckIcon className="w-5 h-5" />
          Why Verify Your Account?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-blue-800">
          <div>
            <h4 className="font-medium mb-3">🔒 Enhanced Security</h4>
            <ul className="space-y-1">
              <li>• Protect your account from unauthorized access</li>
              <li>• Enable two-factor authentication</li>
              <li>• Secure password recovery options</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-3">🤝 Build Trust</h4>
            <ul className="space-y-1">
              <li>• Show other members you're genuine</li>
              <li>• Get verified badges on your profile</li>
              <li>• Increase connection success rates</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-3">🎯 Better Matching</h4>
            <ul className="space-y-1">
              <li>• Higher visibility in member searches</li>
              <li>• Priority in recommendation algorithms</li>
              <li>• Access to verified-only features</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-3">🌟 Premium Features</h4>
            <ul className="space-y-1">
              <li>• Access to exclusive verified events</li>
              <li>• Priority customer support</li>
              <li>• Advanced privacy controls</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Safety Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-yellow-50 border border-yellow-200 rounded-xl p-6"
      >
        <div className="flex items-start gap-3">
          <ExclamationTriangleIcon className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">Your Privacy & Safety</h3>
            <div className="text-sm text-yellow-800 space-y-2">
              <p>
                • All verification data is encrypted and stored securely
              </p>
              <p>
                • We never share your personal information with third parties
              </p>
              <p>
                • You can disable verification features at any time in privacy settings
              </p>
              <p>
                • Background checks are processed by certified security partners
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}