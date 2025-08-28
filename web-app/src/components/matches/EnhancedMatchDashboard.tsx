'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HeartIcon,
  SparklesIcon,
  UsersIcon,
  ChartBarIcon,
  CalendarIcon,
  MapPinIcon,
  AcademicCapIcon,
  CheckCircleIcon,
  XMarkIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'

interface Profile {
  id: number
  name: string
  age: number
  location: string
  profession: string
  origin: string
  interests: string[]
  matchPercentage: number
  imageUrl?: string
  verified: boolean
  lastActive: string
}

interface EnhancedMatchDashboardProps {
  profiles?: Profile[]
  currentUserSubscription?: string
  onProfileAction?: (profileId: number, action: 'like' | 'pass' | 'message') => void
}

export default function EnhancedMatchDashboard({ 
  profiles = [],
  currentUserSubscription = 'free',
  onProfileAction
}: EnhancedMatchDashboardProps) {
  const { language } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [likedProfiles, setLikedProfiles] = useState<number[]>([])
  const [passedProfiles, setPassedProfiles] = useState<number[]>([])

  // Mock profiles if none provided
  const mockProfiles: Profile[] = [
    {
      id: 1,
      name: 'Ana Sofia',
      age: 28,
      location: 'Stockwell, London',
      profession: 'Marketing Manager',
      origin: 'Porto, Portugal',
      interests: ['Fado Music', 'Portuguese Literature', 'Wine Tasting', 'Cultural Events'],
      matchPercentage: 92,
      verified: true,
      lastActive: '2 hours ago'
    },
    {
      id: 2,
      name: 'Carlos Mendes',
      age: 32,
      location: 'Camden, London',
      profession: 'Software Engineer',
      origin: 'Lisbon, Portugal',
      interests: ['Technology', 'Football', 'Portuguese Cinema', 'Travel'],
      matchPercentage: 88,
      verified: true,
      lastActive: '1 day ago'
    },
    {
      id: 3,
      name: 'Mariana Silva',
      age: 26,
      location: 'Canary Wharf, London',
      profession: 'Financial Analyst',
      origin: 'São Paulo, Brazil',
      interests: ['Business Networking', 'Dance', 'Brazilian Culture', 'Food'],
      matchPercentage: 85,
      verified: false,
      lastActive: '3 hours ago'
    }
  ]

  const displayProfiles = profiles.length > 0 ? profiles : mockProfiles
  const currentProfile = displayProfiles[currentIndex]

  const handleAction = (action: 'like' | 'pass' | 'message') => {
    if (!currentProfile) return

    if (action === 'like') {
      setLikedProfiles([...likedProfiles, currentProfile.id])
    } else if (action === 'pass') {
      setPassedProfiles([...passedProfiles, currentProfile.id])
    }

    onProfileAction?.(currentProfile.id, action)

    if (action !== 'message') {
      // Move to next profile
      if (currentIndex < displayProfiles.length - 1) {
        setCurrentIndex(currentIndex + 1)
      }
    }
  }

  const getMatchPercentageColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600 bg-green-50'
    if (percentage >= 80) return 'text-primary-600 bg-primary-50'
    if (percentage >= 70) return 'text-yellow-600 bg-yellow-50'
    return 'text-gray-600 bg-gray-50'
  }

  if (!currentProfile || currentIndex >= displayProfiles.length) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-primary-100 p-8 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {language === 'pt' ? 'Todos os perfis revisados!' : 'All profiles reviewed!'}
        </h3>
        <p className="text-gray-600 mb-6">
          {language === 'pt'
            ? 'Volte amanhã para ver novos matches da comunidade portuguesa.'
            : 'Come back tomorrow to see new matches from the Portuguese community.'
          }
        </p>
        <button
          onClick={() => {
            setCurrentIndex(0)
            setLikedProfiles([])
            setPassedProfiles([])
          }}
          className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-medium hover:from-primary-600 hover:to-secondary-600 transition-all"
        >
          {language === 'pt' ? 'Ver Novamente' : 'View Again'}
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center">
            <SparklesIcon className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-primary-900">
            {language === 'pt' ? 'Discover Matches' : 'Discover Matches'}
          </h2>
        </div>
        <p className="text-primary-600 mb-2">
          {language === 'pt'
            ? 'Conecte-se com falantes de português que compartilham seus interesses'
            : 'Connect with Portuguese speakers who share your interests'
          }
        </p>
        <div className="text-sm text-gray-500">
          {currentIndex + 1} {language === 'pt' ? 'de' : 'of'} {displayProfiles.length}
        </div>
      </div>

      {/* Match Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentProfile.id}
          initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="bg-white rounded-2xl shadow-xl border border-primary-100 overflow-hidden max-w-md mx-auto"
        >
          {/* Profile Image */}
          <div className="h-80 bg-gradient-to-br from-primary-100 to-secondary-100 relative flex items-center justify-center">
            {currentProfile.imageUrl ? (
              <img
                src={currentProfile.imageUrl}
                alt={currentProfile.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-8xl text-primary-400">
                👤
              </div>
            )}
            
            {/* Match Percentage Badge */}
            <div className={`absolute top-4 right-4 px-3 py-1 rounded-full font-bold text-sm ${getMatchPercentageColor(currentProfile.matchPercentage)}`}>
              {currentProfile.matchPercentage}% Match
            </div>
            
            {/* Verified Badge */}
            {currentProfile.verified && (
              <div className="absolute top-4 left-4 bg-green-500 text-white p-2 rounded-full">
                <CheckCircleIcon className="w-4 h-4" />
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-2xl font-bold text-gray-900">
                {currentProfile.name}, {currentProfile.age}
              </h3>
              <div className="text-sm text-gray-500">{currentProfile.lastActive}</div>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPinIcon className="w-4 h-4" />
                <span className="text-sm">{currentProfile.location}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-gray-600">
                <AcademicCapIcon className="w-4 h-4" />
                <span className="text-sm">{currentProfile.profession}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-gray-600">
                <span className="text-sm font-medium">🇵🇹 {currentProfile.origin}</span>
              </div>
            </div>

            {/* Interests */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">
                {language === 'pt' ? 'Interesses' : 'Interests'}
              </h4>
              <div className="flex flex-wrap gap-2">
                {currentProfile.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-6 pb-6">
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => handleAction('pass')}
                className="w-14 h-14 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                <XMarkIcon className="w-6 h-6 text-gray-600" />
              </button>
              
              <button
                onClick={() => handleAction('message')}
                className="w-14 h-14 bg-secondary-500 hover:bg-secondary-600 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                <ChatBubbleLeftRightIcon className="w-6 h-6 text-white" />
              </button>
              
              <button
                onClick={() => handleAction('like')}
                className="w-16 h-16 bg-gradient-to-r from-primary-500 to-pink-500 hover:from-primary-600 hover:to-pink-600 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
              >
                <HeartSolidIcon className="w-7 h-7 text-white" />
              </button>
            </div>
            
            <div className="flex justify-center space-x-6 mt-4 text-sm text-gray-500">
              <span>{language === 'pt' ? 'Passar' : 'Pass'}</span>
              <span>{language === 'pt' ? 'Mensagem' : 'Message'}</span>
              <span className="font-medium">{language === 'pt' ? 'Curtir' : 'Like'}</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Statistics */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-6 max-w-md mx-auto">
        <h3 className="text-lg font-bold text-primary-900 mb-4 text-center">
          {language === 'pt' ? 'Suas Estatísticas' : 'Your Stats'}
        </h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary-600">{likedProfiles.length}</div>
            <div className="text-xs text-gray-600">{language === 'pt' ? 'Curtidas' : 'Likes'}</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-secondary-600">{passedProfiles.length}</div>
            <div className="text-xs text-gray-600">{language === 'pt' ? 'Passou' : 'Passed'}</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent-600">
              {currentIndex < displayProfiles.length ? displayProfiles.length - currentIndex : 0}
            </div>
            <div className="text-xs text-gray-600">{language === 'pt' ? 'Restantes' : 'Remaining'}</div>
          </div>
        </div>
      </div>
    </div>
  )
}