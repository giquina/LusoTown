'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { motion } from 'framer-motion'
import {
  BriefcaseIcon,
  UserIcon,
  ChatBubbleLeftRightIcon,
  CalendarDaysIcon,
  HandRaisedIcon,
  CheckCircleIcon,
  XCircleIcon,
  StarIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'

interface BusinessMatch {
  id: string
  name: string
  title: string
  company: string
  industry: string
  experience: string
  location: string
  matchScore: number
  skills: string[]
  interests: string[]
  avatar?: string
  isMentor: boolean
  seekingMentorship: boolean
}

interface BusinessNetworkingMatchProps {
  currentUserId: string
  onBusinessMatchAction: (matchId: string, action: 'accept' | 'decline' | 'message') => void
  onMentorshipRequest: (menteeId: string, mentorId: string) => void
  onBusinessEventBooking: (eventId: string, matchId: string) => void
}

export default function BusinessNetworkingMatch({
  currentUserId,
  onBusinessMatchAction,
  onMentorshipRequest,
  onBusinessEventBooking
}: BusinessNetworkingMatchProps) {
  const { language } = useLanguage()
  const [selectedMatch, setSelectedMatch] = useState<BusinessMatch | null>(null)

  const businessMatches: BusinessMatch[] = [
    {
      id: 'match-1',
      name: 'Carlos Mendes',
      title: 'Senior Software Engineer',
      company: 'FinTech Solutions',
      industry: 'Technology',
      experience: '8 years',
      location: 'London, UK',
      matchScore: 92,
      skills: ['React', 'Node.js', 'Python', 'AWS'],
      interests: ['Mentorship', 'Startup Advisory', 'Portuguese Tech Community'],
      isMentor: true,
      seekingMentorship: false
    },
    {
      id: 'match-2',
      name: 'Ana Silva',
      title: 'Marketing Director',
      company: 'Creative Agency London',
      industry: 'Marketing',
      experience: '6 years',
      location: 'London, UK',
      matchScore: 88,
      skills: ['Digital Marketing', 'Brand Strategy', 'Content Creation'],
      interests: ['Business Development', 'Creative Collaborations', 'Portuguese Business Network'],
      isMentor: true,
      seekingMentorship: false
    },
    {
      id: 'match-3',
      name: 'Pedro Santos',
      title: 'Junior Data Analyst',
      company: 'Data Insights Co',
      industry: 'Data Science',
      experience: '2 years',
      location: 'London, UK',
      matchScore: 85,
      skills: ['Python', 'SQL', 'Tableau', 'Machine Learning'],
      interests: ['Career Growth', 'Data Science Community', 'Portuguese Professionals'],
      isMentor: false,
      seekingMentorship: true
    }
  ]

  const handleMatchAction = (match: BusinessMatch, action: 'accept' | 'decline' | 'message') => {
    onBusinessMatchAction(match.id, action)
  }

  const handleMentorshipRequest = (match: BusinessMatch) => {
    if (match.isMentor) {
      onMentorshipRequest(currentUserId, match.id)
    }
  }

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50'
    if (score >= 80) return 'text-primary-600 bg-primary-50'
    if (score >= 70) return 'text-yellow-600 bg-yellow-50'
    return 'text-gray-600 bg-gray-50'
  }

  const getIndustryColor = (industry: string) => {
    const colors: { [key: string]: string } = {
      'Technology': 'bg-blue-100 text-blue-800',
      'Marketing': 'bg-purple-100 text-purple-800',
      'Data Science': 'bg-green-100 text-green-800',
      'Finance': 'bg-yellow-100 text-yellow-800',
      'Healthcare': 'bg-red-100 text-red-800'
    }
    return colors[industry] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-primary-900 mb-2">
          {language === 'pt' ? 'Matches de Networking Profissional' : 'Professional Networking Matches'}
        </h2>
        <p className="text-primary-600">
          {language === 'pt' 
            ? 'Conecte-se com profissionais portugueses que compartilham seus interesses'
            : 'Connect with Portuguese professionals who share your interests'
          }
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {businessMatches.map((match, index) => (
          <motion.div
            key={match.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-lg border border-primary-100 overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <UserIcon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="text-white">
                    <h3 className="font-bold">{match.name}</h3>
                    <p className="text-sm opacity-90">{match.location}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getMatchScoreColor(match.matchScore)}`}>
                  {match.matchScore}% Match
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              {/* Job Info */}
              <div>
                <h4 className="font-semibold text-gray-900">{match.title}</h4>
                <p className="text-primary-600 text-sm">{match.company}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getIndustryColor(match.industry)}`}>
                    {match.industry}
                  </span>
                  <span className="text-xs text-gray-500">{match.experience}</span>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h5 className="text-sm font-semibold text-gray-700 mb-2">
                  {language === 'pt' ? 'Competências' : 'Skills'}
                </h5>
                <div className="flex flex-wrap gap-1">
                  {match.skills.slice(0, 3).map((skill, i) => (
                    <span key={i} className="px-2 py-1 bg-secondary-50 text-secondary-700 text-xs rounded-full">
                      {skill}
                    </span>
                  ))}
                  {match.skills.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{match.skills.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Mentor/Mentee Status */}
              <div className="flex items-center justify-between text-xs">
                {match.isMentor && (
                  <div className="flex items-center space-x-1 text-green-600">
                    <HandRaisedIcon className="w-4 h-4" />
                    <span>{language === 'pt' ? 'Mentor' : 'Mentor'}</span>
                  </div>
                )}
                {match.seekingMentorship && (
                  <div className="flex items-center space-x-1 text-blue-600">
                    <AcademicCapIcon className="w-4 h-4" />
                    <span>{language === 'pt' ? 'Busca Mentoria' : 'Seeking Mentorship'}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 border-t border-gray-100 space-y-3">
              <div className="flex space-x-2">
                <button
                  onClick={() => handleMatchAction(match, 'accept')}
                  className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                >
                  <CheckCircleIcon className="w-4 h-4" />
                  <span>{language === 'pt' ? 'Conectar' : 'Connect'}</span>
                </button>
                <button
                  onClick={() => handleMatchAction(match, 'decline')}
                  className="flex items-center justify-center px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <XCircleIcon className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleMatchAction(match, 'message')}
                  className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 border border-primary-200 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors text-sm"
                >
                  <ChatBubbleLeftRightIcon className="w-4 h-4" />
                  <span>{language === 'pt' ? 'Mensagem' : 'Message'}</span>
                </button>
                
                {match.isMentor && (
                  <button
                    onClick={() => handleMentorshipRequest(match)}
                    className="flex items-center justify-center space-x-1 px-3 py-2 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-colors text-sm"
                  >
                    <HandRaisedIcon className="w-4 h-4" />
                    <span>{language === 'pt' ? 'Mentoria' : 'Mentor'}</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-6 mt-8">
        <h3 className="text-xl font-bold text-primary-900 mb-4 text-center">
          {language === 'pt' ? 'Estatísticas da Sua Rede' : 'Your Network Stats'}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl font-bold text-primary-600">24</div>
            <div className="text-sm text-gray-600">{language === 'pt' ? 'Conexões' : 'Connections'}</div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl font-bold text-secondary-600">8</div>
            <div className="text-sm text-gray-600">{language === 'pt' ? 'Mentores' : 'Mentors'}</div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl font-bold text-accent-600">12</div>
            <div className="text-sm text-gray-600">{language === 'pt' ? 'Eventos' : 'Events'}</div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600">95%</div>
            <div className="text-sm text-gray-600">{language === 'pt' ? 'Satisfação' : 'Satisfaction'}</div>
          </div>
        </div>
      </div>
    </div>
  )
}