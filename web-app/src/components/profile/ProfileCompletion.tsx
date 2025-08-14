'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CheckCircleIcon, 
  ExclamationCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  StarIcon
} from '@heroicons/react/24/outline'
import { UserProfile, ProfileCompletion as ProfileCompletionData, calculateProfileCompletion } from '@/lib/supabase'

interface ProfileCompletionProps {
  userId: string
  profile: UserProfile | null
  onStepClick?: (stepId: string) => void
}

export default function ProfileCompletion({ userId, profile, onStepClick }: ProfileCompletionProps) {
  const [expanded, setExpanded] = useState(false)
  const [completionData, setCompletionData] = useState<ProfileCompletionData>({
    percentage: 0,
    completed_steps: [],
    missing_steps: [],
    total_points: 0,
    max_points: 100
  })

  useEffect(() => {
    const loadCompletion = async () => {
      if (userId) {
        const data = await calculateProfileCompletion(userId)
        setCompletionData(data)
      }
    }
    loadCompletion()
  }, [userId, profile])

  // Define step information
  const stepInfo = {
    basic_info: { name: 'Basic Information', description: 'Name and email verified', required: true, points: 15 },
    profile_picture: { name: 'Profile Picture', description: 'Photo uploaded and verified', required: true, points: 20 },
    bio: { name: 'About Me', description: 'Personal bio (20+ characters)', required: true, points: 15 },
    location: { name: 'Location', description: 'Primary location selected', required: true, points: 10 },
    date_of_birth: { name: 'Age Verification', description: 'Date of birth confirmed', required: true, points: 10 },
    interests: { name: 'Interests', description: '3+ interests selected', required: true, points: 15 },
    verification: { name: 'Profile Verification', description: 'Photo verification completed', required: false, points: 10 },
    preferences: { name: 'Connection Preferences', description: 'Looking for & age range set', required: false, points: 5 }
  }

  const allStepIds = ['basic_info', 'profile_picture', 'bio', 'location', 'date_of_birth', 'interests', 'verification', 'preferences']
  const allSteps = allStepIds.map(stepId => ({
    id: stepId,
    ...stepInfo[stepId as keyof typeof stepInfo],
    completed: completionData.completed_steps.includes(stepId)
  }))

  const requiredSteps = allSteps.filter(step => step.required)
  const optionalSteps = allSteps.filter(step => !step.required)
  const completedRequired = requiredSteps.filter(step => step.completed).length
  const allRequiredComplete = completedRequired === requiredSteps.length

  const getProgressColor = () => {
    if (completionData.percentage >= 80) return 'text-green-600'
    if (completionData.percentage >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getProgressBg = () => {
    if (completionData.percentage >= 80) return 'bg-green-500'
    if (completionData.percentage >= 60) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Profile Completion</h3>
          <p className="text-sm text-gray-600 mt-1">
            Complete your profile to get more connections
          </p>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-sm text-[#FF6B6B] hover:text-[#FF5252]"
        >
          {expanded ? (
            <>Hide <ChevronUpIcon className="w-4 h-4" /></>
          ) : (
            <>Details <ChevronDownIcon className="w-4 h-4" /></>
          )}
        </button>
      </div>

      {/* Progress Overview */}
      <div className="space-y-4">
        {/* Progress Bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-2xl font-bold ${getProgressColor()}`}>
              {completionData.percentage}%
            </span>
            <div className="flex items-center gap-1">
              <StarIcon className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-gray-600">
                {completionData.total_points}/{completionData.max_points} points
              </span>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completionData.percentage}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className={`h-full ${getProgressBg()} rounded-full relative`}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
            </motion.div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">
            {completionData.completed_steps.length}/{allSteps.length} steps complete
          </span>
          {allRequiredComplete ? (
            <span className="flex items-center gap-1 text-green-600 font-medium">
              <CheckCircleIcon className="w-4 h-4" />
              All required steps done!
            </span>
          ) : (
            <span className="flex items-center gap-1 text-yellow-600 font-medium">
              <ExclamationCircleIcon className="w-4 h-4" />
              {requiredSteps.length - completedRequired} required left
            </span>
          )}
        </div>
      </div>

      {/* Detailed Steps */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-6 pt-6 border-t border-gray-100 space-y-4">
              {/* Required Steps */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  Required Steps
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                    {completedRequired}/{requiredSteps.length}
                  </span>
                </h4>
                <div className="space-y-2">
                  {requiredSteps.map((step, index) => (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                        step.completed
                          ? 'bg-green-50 border-green-200 hover:bg-green-100'
                          : 'bg-red-50 border-red-200 hover:bg-red-100'
                      }`}
                      onClick={() => onStepClick?.(step.id)}
                    >
                      <div className="flex items-center gap-3">
                        {step.completed ? (
                          <CheckCircleIcon className="w-5 h-5 text-green-600" />
                        ) : (
                          <ExclamationCircleIcon className="w-5 h-5 text-red-600" />
                        )}
                        <div>
                          <div className={`font-medium text-sm ${
                            step.completed ? 'text-green-900' : 'text-red-900'
                          }`}>
                            {step.name}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <StarIcon className="w-3 h-3 text-yellow-500" />
                          <span className="text-xs text-gray-600">{step.points}</span>
                        </div>
                        {!step.completed && (
                          <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                            Required
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Optional Steps */}
              {optionalSteps.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    Bonus Steps
                    <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                      {optionalSteps.filter(s => s.completed).length}/{optionalSteps.length}
                    </span>
                  </h4>
                  <div className="space-y-2">
                    {optionalSteps.map((step, index) => (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (requiredSteps.length + index) * 0.1 }}
                        className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                          step.completed
                            ? 'bg-primary-50 border-primary-200 hover:bg-primary-100'
                            : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                        }`}
                        onClick={() => onStepClick?.(step.id)}
                      >
                        <div className="flex items-center gap-3">
                          {step.completed ? (
                            <CheckCircleIcon className="w-5 h-5 text-primary-600" />
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                          )}
                          <div>
                            <div className={`font-medium text-sm ${
                              step.completed ? 'text-primary-900' : 'text-gray-700'
                            }`}>
                              {step.name}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <StarIcon className="w-3 h-3 text-yellow-500" />
                            <span className="text-xs text-gray-600">{step.points}</span>
                          </div>
                          <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                            Bonus
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Completion Rewards */}
              <div className="mt-6 p-4 bg-gradient-to-r from-[#FF6B6B]/10 to-[#4ECDC4]/10 rounded-lg border border-gradient-to-r from-[#FF6B6B]/20 to-[#4ECDC4]/20">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Completion Benefits</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• 3x more profile views from potential connections</li>
                  <li>• Priority placement in member discovery</li>
                  <li>• Unlock advanced matching preferences</li>
                  <li>• Access to exclusive community features</li>
                  {completionData.percentage >= 100 && (
                    <li className="text-green-600 font-medium">
                      ✨ All benefits unlocked! You're a profile superstar!
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}