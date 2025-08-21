'use client'

import React, { useState } from 'react'
import { buildUnsplashUrl } from '@/config'
import { useLanguage } from '@/context/LanguageContext'
import { buildUnsplashUrl } from '@/config'
import { 
  UserPlus,
  MapPin,
  Users,
  Star,
  CheckCircle,
  Crown,
  User,
  X,
  Heart,
  MessageCircle,
  Coffee
} from 'lucide-react'

interface SuggestedUser {
  id: string
  name: string
  avatar: string
  bio: string
  location: string
  membershipTier: 'free' | 'community' | 'cultural_ambassador'
  verified: boolean
  mutualConnections: number
  sharedInterests: string[]
  culturalBackground: string[]
  joinedRecently: boolean
  isFollowing: boolean
}

export default function PeopleYouMayKnow({ className = '' }: { className?: string }) {
  const { language, t } = useLanguage()
  const [suggestions, setSuggestions] = useState<SuggestedUser[]>([
    {
      id: '1',
      name: 'Ana Ferreira',
      avatar: buildUnsplashUrl('photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'),
      bio: 'Portuguese chef sharing traditional recipes from Porto',
      location: 'Stockwell, London',
      membershipTier: 'cultural_ambassador',
      verified: true,
      mutualConnections: 3,
      sharedInterests: ['portuguese_food', 'cooking', 'cultural_events'],
      culturalBackground: ['porto', 'northern_portugal'],
      joinedRecently: false,
      isFollowing: false
    },
    {
      id: '2',
      name: 'Carlos Silva',
      avatar: buildUnsplashUrl('photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'),
      bio: 'Brazilian engineer passionate about Samba and London nightlife',
      location: 'Vauxhall, London',
      membershipTier: 'community',
      verified: false,
      mutualConnections: 1,
      sharedInterests: ['brazilian_culture', 'music', 'dancing'],
      culturalBackground: ['sao_paulo', 'brazil'],
      joinedRecently: true,
      isFollowing: false
    },
    {
      id: '3',
      name: 'Maria Santos',
      avatar: buildUnsplashUrl('photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face'),
      bio: 'Fado singer and Portuguese language teacher',
      location: 'Borough Market, London',
      membershipTier: 'cultural_ambassador',
      verified: true,
      mutualConnections: 5,
      sharedInterests: ['fado', 'portuguese_language', 'music'],
      culturalBackground: ['lisbon', 'portugal'],
      joinedRecently: false,
      isFollowing: false
    },
    {
      id: '4',
      name: 'João Rodrigues',
      avatar: buildUnsplashUrl('photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'),
      bio: 'Transport service owner helping Portuguese families in London',
      location: 'South London',
      membershipTier: 'community',
      verified: false,
      mutualConnections: 2,
      sharedInterests: ['transport', 'business', 'family_services'],
      culturalBackground: ['azores', 'portugal'],
      joinedRecently: false,
      isFollowing: false
    }
  ])

  const handleFollow = (userId: string) => {
    setSuggestions(suggestions.map(user => 
      user.id === userId 
        ? { ...user, isFollowing: !user.isFollowing }
        : user
    ))
  }

  const handleDismiss = (userId: string) => {
    setSuggestions(suggestions.filter(user => user.id !== userId))
  }

  const getMembershipBadge = (tier: string) => {
    switch (tier) {
      case 'cultural_ambassador':
        return (
          <div className="flex items-center space-x-1 text-purple-600">
            <Crown className="w-3 h-3" />
            <span className="text-xs">Ambassador</span>
          </div>
        )
      case 'community':
        return (
          <div className="flex items-center space-x-1 text-primary-600">
            <Star className="w-3 h-3" />
            <span className="text-xs">Member</span>
          </div>
        )
      default:
        return (
          <div className="flex items-center space-x-1 text-gray-500">
            <User className="w-3 h-3" />
            <span className="text-xs">Free</span>
          </div>
        )
    }
  }

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 ${className}`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
              <UserPlus className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {t('suggestions.title') || 'People You May Know'}
              </h3>
              <p className="text-sm text-gray-600">
                {t('suggestions.subtitle') || 'Portuguese speakers in London'}
              </p>
            </div>
          </div>
        </div>

        {/* Suggested Users */}
        <div className="space-y-4">
          {suggestions.slice(0, 4).map(user => (
            <div key={user.id} className="group">
              <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {user.verified && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-2.5 h-2.5 text-white" />
                    </div>
                  )}
                  {user.joinedRecently && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-gray-900 truncate">{user.name}</h4>
                    <button
                      onClick={() => handleDismiss(user.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-all"
                    >
                      <X className="w-3 h-3 text-gray-400" />
                    </button>
                  </div>

                  <div className="flex items-center space-x-2 mb-2">
                    {getMembershipBadge(user.membershipTier)}
                    <span className="text-xs text-gray-400">•</span>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <MapPin className="w-3 h-3" />
                      <span>{user.location}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {user.bio}
                  </p>

                  {/* Connection Info */}
                  <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                    {user.mutualConnections > 0 && (
                      <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span>
                          {user.mutualConnections} {t('suggestions.mutual_connections') || 'mutual connections'}
                        </span>
                      </div>
                    )}
                    {user.sharedInterests.length > 0 && (
                      <div className="flex items-center space-x-1">
                        <Heart className="w-3 h-3" />
                        <span>
                          {user.sharedInterests.length} {t('suggestions.shared_interests') || 'shared interests'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Cultural Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {user.culturalBackground.slice(0, 2).map(bg => (
                      <span
                        key={bg}
                        className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs"
                      >
                        {bg}
                      </span>
                    ))}
                    {user.sharedInterests.slice(0, 1).map(interest => (
                      <span
                        key={interest}
                        className="px-2 py-1 bg-secondary-100 text-secondary-700 rounded-full text-xs"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleFollow(user.id)}
                      className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        user.isFollowing
                          ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          : 'bg-primary-500 text-white hover:bg-primary-600'
                      }`}
                    >
                      {user.isFollowing 
                        ? (t('suggestions.following') || 'Following')
                        : (t('suggestions.follow') || 'Follow')
                      }
                    </button>
                    <button className="px-3 py-2 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors">
                      <MessageCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <button className="w-full px-4 py-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors text-sm font-medium">
            {t('suggestions.view_all') || 'View All Suggestions'}
          </button>
        </div>
      </div>

      {/* Portuguese Community Connection */}
      <div className="px-6 pb-6">
        <div className="bg-gradient-to-r from-accent-50 to-coral-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Coffee className="w-5 h-5 text-accent-600" />
            <h4 className="font-semibold text-accent-900">
              {t('suggestions.coffee_meetup') || 'Portuguese Coffee Meetup'}
            </h4>
          </div>
          
          <p className="text-sm text-accent-700 mb-3">
            {t('suggestions.coffee_description') || 'Join weekly Portuguese coffee meetups to connect with community members in person.'}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="text-xs text-accent-600">
              <span>{t('suggestions.next_meetup') || 'Next meetup:'} Saturday 2PM</span>
            </div>
            <button className="px-3 py-1 bg-accent-500 text-white rounded text-xs font-medium hover:bg-accent-600 transition-colors">
              {t('suggestions.join_meetup') || 'Join'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}