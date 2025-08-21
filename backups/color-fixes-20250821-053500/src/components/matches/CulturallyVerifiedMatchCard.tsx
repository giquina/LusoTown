'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HeartIcon,
  XMarkIcon,
  StarIcon,
  MapPinIcon,
  BriefcaseIcon,
  SparklesIcon,
  CheckCircleIcon,
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  FireIcon,
  UserGroupIcon,
  EyeIcon,
  ShieldCheckIcon,
  PhotoIcon,
  InformationCircleIcon,
  GlobeAltIcon,
  MusicalNoteIcon
} from '@heroicons/react/24/outline'
import {
  HeartIcon as HeartSolid,
  StarIcon as StarSolid,
  ShieldCheckIcon as ShieldCheckSolid
} from '@heroicons/react/24/solid'
import { useLanguage } from '@/context/LanguageContext'
import Image from 'next/image'
import CulturalVerificationBadges, { VerificationBadge, VerificationSummary } from './CulturalVerificationBadges'
import { CulturalPhoto } from './PortugueseCulturalPhotoVerification'

interface CulturallyVerifiedProfile {
  id: string
  name: string
  age: number
  location: string
  profession: string
  origin: string
  interests: string[]
  bio: string
  image?: string
  compatibility: number
  eventCompatibility: number
  culturalAlignment: number
  
  // Cultural verification data
  verificationScore: number
  verificationBadges: VerificationBadge[]
  culturalPhotos: CulturalPhoto[]
  heritageAuthenticity: number
  communityInvolvement: number
  culturalKnowledge: number
  
  // Existing data
  suggestedEvents: Array<{
    id: string
    title: string
    category: string
    date: string
    price: number
  }>
  conversationStarters: Array<{
    id: string
    text: string
    category: string
    culturalContext: string
    popularity: number
  }>
  achievements: Array<{
    id: string
    name: string
    icon: string
    category: string
  }>
  isVerified: boolean
  responseRate: number
  lastActive: string
}

interface CulturallyVerifiedMatchCardProps {
  profile: CulturallyVerifiedProfile
  onLike: (profileId: string) => void
  onSkip: (profileId: string) => void
  onSuperLike?: (profileId: string) => void
  onStartConversation?: (profileId: string, starter?: string) => void
  onViewCulturalPhotos?: (profileId: string) => void
  isLoading?: boolean
  showEventSuggestions?: boolean
  showConversationStarters?: boolean
  showCulturalDetails?: boolean
}

export default function CulturallyVerifiedMatchCard({
  profile,
  onLike,
  onSkip,
  onSuperLike,
  onStartConversation,
  onViewCulturalPhotos,
  isLoading = false,
  showEventSuggestions = true,
  showConversationStarters = true,
  showCulturalDetails = true
}: CulturallyVerifiedMatchCardProps) {
  const { language } = useLanguage()
  const [selectedTab, setSelectedTab] = useState<'profile' | 'cultural' | 'events' | 'starters'>('profile')
  const [selectedCulturalPhoto, setSelectedCulturalPhoto] = useState<CulturalPhoto | null>(null)

  const getOriginFlag = (origin: string) => {
    if (origin.includes("Portugal") || origin.includes("Porto") || origin.includes("Lisboa")) return "🇵🇹"
    if (origin.includes("Brasil") || origin.includes("São Paulo")) return "🇧🇷"
    if (origin.includes("Angola")) return "🇦🇴"
    if (origin.includes("Mozambique")) return "🇲🇿"
    if (origin.includes("Cabo Verde")) return "🇨🇻"
    return "🌍"
  }

  const getCompatibilityColor = (score: number) => {
    if (score >= 90) return "from-green-500 to-green-600"
    if (score >= 80) return "from-blue-500 to-blue-600"
    if (score >= 70) return "from-yellow-500 to-yellow-600"
    return "from-gray-500 to-gray-600"
  }

  const getCulturalVerificationLevel = (score: number) => {
    if (score >= 95) {
      return {
        level: language === 'pt' ? 'Autenticidade Lendária' : 'Legendary Authenticity',
        color: 'text-yellow-600',
        bg: 'bg-gradient-to-r from-yellow-100 to-orange-100',
        border: 'border-yellow-300'
      }
    }
    if (score >= 85) {
      return {
        level: language === 'pt' ? 'Herança Épica' : 'Epic Heritage',
        color: 'text-purple-600',
        bg: 'bg-gradient-to-r from-purple-100 to-indigo-100',
        border: 'border-purple-300'
      }
    }
    if (score >= 75) {
      return {
        level: language === 'pt' ? 'Cultura Rara' : 'Rare Culture',
        color: 'text-blue-600',
        bg: 'bg-gradient-to-r from-blue-100 to-cyan-100',
        border: 'border-blue-300'
      }
    }
    return {
      level: language === 'pt' ? 'Herança Comum' : 'Common Heritage',
      color: 'text-gray-600',
      bg: 'bg-gray-100',
      border: 'border-gray-300'
    }
  }

  const verificationLevel = getCulturalVerificationLevel(profile.verificationScore)

  const tabs = [
    {
      id: 'profile' as const,
      label: language === "pt" ? "Perfil" : "Profile",
      icon: UserGroupIcon,
    },
    {
      id: 'cultural' as const,
      label: language === "pt" ? "Cultural" : "Cultural",
      icon: ShieldCheckIcon,
      badge: profile.verificationBadges.length
    },
    {
      id: 'events' as const,
      label: language === "pt" ? "Eventos" : "Events",
      icon: CalendarDaysIcon,
    },
    {
      id: 'starters' as const,
      label: language === "pt" ? "Conversa" : "Chat",
      icon: ChatBubbleLeftRightIcon,
    },
  ]

  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-primary-100 max-w-md mx-auto">
        <div className="animate-pulse">
          <div className="h-64 bg-primary-100"></div>
          <div className="p-6 space-y-4">
            <div className="h-6 bg-primary-100 rounded w-3/4"></div>
            <div className="h-4 bg-primary-50 rounded w-full"></div>
            <div className="h-4 bg-primary-50 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-primary-100 max-w-md mx-auto"
    >
      {/* Profile Image Section */}
      <div className="relative h-64 bg-gradient-to-br from-primary-200 via-secondary-200 to-accent-200">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl text-primary-400 drop-shadow-lg">👤</div>
        </div>

        {/* Enhanced Compatibility Badge */}
        <div className="absolute top-4 right-4 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white px-4 py-2 rounded-2xl shadow-xl backdrop-blur-sm border border-white/20">
          <div className="flex items-center gap-1">
            <StarSolid className="w-4 h-4 text-yellow-300" />
            <span className="font-bold text-sm">{profile.compatibility}% Match</span>
          </div>
        </div>

        {/* Enhanced Origin Badge */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-2xl shadow-xl border border-primary-100">
          <span className="text-lg">{getOriginFlag(profile.origin)}</span>
        </div>

        {/* Cultural Verification Badge */}
        {profile.verificationScore > 70 && (
          <div className="absolute top-16 left-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-3 py-1 rounded-2xl shadow-xl flex items-center gap-1">
            <ShieldCheckSolid className="w-4 h-4" />
            <span className="text-xs font-bold">{Math.round(profile.verificationScore)}%</span>
          </div>
        )}

        {/* Regular Verification Badge */}
        {profile.isVerified && (
          <div className="absolute top-16 right-4 bg-green-500 text-white px-2 py-1 rounded-full shadow-lg">
            <CheckCircleIcon className="w-4 h-4" />
          </div>
        )}

        {/* Activity Status */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-primary-100">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs font-medium text-primary-700">
              {language === "pt" ? "Ativo recentemente" : "Recently active"}
            </span>
          </div>
        </div>

        {/* Cultural Photos Preview */}
        {profile.culturalPhotos.length > 0 && (
          <div className="absolute bottom-4 right-4 flex gap-1">
            {profile.culturalPhotos.slice(0, 2).map((photo, index) => (
              <div
                key={photo.id}
                className="w-8 h-8 rounded-lg overflow-hidden border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform"
                onClick={() => setSelectedCulturalPhoto(photo)}
              >
                <img
                  src={photo.url}
                  alt="Cultural photo"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            {profile.culturalPhotos.length > 2 && (
              <div 
                className="w-8 h-8 bg-black bg-opacity-60 rounded-lg flex items-center justify-center border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform"
                onClick={() => onViewCulturalPhotos?.(profile.id)}
              >
                <span className="text-white text-xs font-bold">+{profile.culturalPhotos.length - 2}</span>
              </div>
            )}
          </div>
        )}

        {/* Verification Badges Preview */}
        {profile.verificationBadges.length > 0 && (
          <div className="absolute top-28 left-4">
            <CulturalVerificationBadges 
              badges={profile.verificationBadges.slice(0, 3)} 
              size="small"
              showTooltips={false}
            />
          </div>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="bg-primary-50 border-b border-primary-100">
        <div className="flex">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium transition-colors relative ${
                  selectedTab === tab.id
                    ? "text-primary-700 border-b-2 border-primary-600 bg-white"
                    : "text-primary-600 hover:text-primary-700 hover:bg-primary-100"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
                {tab.badge && tab.badge > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6">
        {/* Profile Tab */}
        {selectedTab === 'profile' && (
          <div className="space-y-4">
            {/* Basic Info */}
            <div>
              <h3 className="text-2xl font-bold text-primary-900 mb-2 flex items-center gap-2">
                {profile.name}, {profile.age}
                {profile.verificationScore > 85 && (
                  <ShieldCheckSolid className="w-5 h-5 text-emerald-600" />
                )}
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary-600">
                  <BriefcaseIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">{profile.profession}</span>
                </div>
                <div className="flex items-center gap-2 text-primary-600">
                  <MapPinIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">{profile.location}, London</span>
                </div>
              </div>
            </div>

            {/* Cultural Verification Summary */}
            {profile.verificationScore > 0 && (
              <div className={`${verificationLevel.bg} ${verificationLevel.border} border rounded-2xl p-4`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheckSolid className="w-5 h-5 text-emerald-600" />
                    <span className={`font-bold text-sm ${verificationLevel.color}`}>
                      {verificationLevel.level}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <StarSolid className="w-4 h-4 text-yellow-500" />
                    <span className="font-bold text-primary-900">
                      {Math.round(profile.verificationScore)}%
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="text-center">
                    <div className="text-sm font-bold text-emerald-600">{Math.round(profile.heritageAuthenticity)}%</div>
                    <div className="text-xs text-gray-600">
                      {language === 'pt' ? 'Herança' : 'Heritage'}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-blue-600">{Math.round(profile.communityInvolvement)}%</div>
                    <div className="text-xs text-gray-600">
                      {language === 'pt' ? 'Comunidade' : 'Community'}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-purple-600">{Math.round(profile.culturalKnowledge)}%</div>
                    <div className="text-xs text-gray-600">
                      {language === 'pt' ? 'Cultura' : 'Culture'}
                    </div>
                  </div>
                </div>

                {profile.verificationBadges.length > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-700">
                      {profile.verificationBadges.length} {language === 'pt' ? 'distintivos culturais' : 'cultural badges'}
                    </span>
                    <CulturalVerificationBadges 
                      badges={profile.verificationBadges} 
                      size="small"
                      maxDisplay={4}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Bio */}
            <div className="bg-primary-25 p-4 rounded-xl border border-primary-100">
              <p className="text-primary-800 text-sm leading-relaxed">{profile.bio}</p>
            </div>

            {/* Interests */}
            <div>
              <h4 className="text-sm font-bold text-primary-900 mb-3 flex items-center gap-2">
                <SparklesIcon className="w-4 h-4 text-secondary-500" />
                {language === "pt" ? "Interesses Comuns" : "Common Interests"}
              </h4>
              <div className="flex flex-wrap gap-2">
                {profile.interests.slice(0, 4).map((interest, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-primary-50 to-secondary-50 text-primary-700 px-3 py-1.5 rounded-lg text-xs font-semibold border border-primary-200"
                  >
                    {interest}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Cultural Tab */}
        {selectedTab === 'cultural' && showCulturalDetails && (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h4 className="font-bold text-primary-900 mb-2 flex items-center justify-center gap-2">
                <ShieldCheckSolid className="w-5 h-5 text-emerald-600" />
                {language === "pt" ? "Verificação Cultural Portuguesa" : "Portuguese Cultural Verification"}
              </h4>
              <p className="text-sm text-primary-600">
                {language === "pt"
                  ? "Autenticidade cultural verificada através de fotos e atividades"
                  : "Cultural authenticity verified through photos and activities"}
              </p>
            </div>

            {/* Cultural Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-center">
                <div className="text-lg font-bold text-emerald-600">{profile.culturalPhotos.length}</div>
                <div className="text-xs text-emerald-700">
                  {language === 'pt' ? 'Fotos Culturais' : 'Cultural Photos'}
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center">
                <div className="text-lg font-bold text-blue-600">{profile.verificationBadges.length}</div>
                <div className="text-xs text-blue-700">
                  {language === 'pt' ? 'Distintivos' : 'Badges'}
                </div>
              </div>
            </div>

            {/* Verification Badges */}
            {profile.verificationBadges.length > 0 && (
              <div>
                <h5 className="font-semibold text-primary-900 mb-3">
                  {language === 'pt' ? 'Distintivos Conquistados' : 'Earned Badges'}
                </h5>
                <div className="space-y-2">
                  {profile.verificationBadges.slice(0, 4).map((badge) => (
                    <div
                      key={badge.id}
                      className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow"
                    >
                      <span className="text-2xl">{badge.icon}</span>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">
                          {language === 'pt' ? badge.namePortuguese : badge.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {language === 'pt' ? badge.descriptionPortuguese : badge.description}
                        </div>
                      </div>
                      <div className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full capitalize">
                        {badge.rarity}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Cultural Photos Gallery */}
            {profile.culturalPhotos.length > 0 && (
              <div>
                <h5 className="font-semibold text-primary-900 mb-3 flex items-center gap-2">
                  <PhotoIcon className="w-4 h-4" />
                  {language === 'pt' ? 'Galeria Cultural' : 'Cultural Gallery'}
                </h5>
                <div className="grid grid-cols-3 gap-2">
                  {profile.culturalPhotos.slice(0, 6).map((photo) => (
                    <div
                      key={photo.id}
                      className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => setSelectedCulturalPhoto(photo)}
                    >
                      <img
                        src={photo.url}
                        alt="Cultural photo"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                {profile.culturalPhotos.length > 6 && (
                  <button
                    onClick={() => onViewCulturalPhotos?.(profile.id)}
                    className="w-full mt-3 py-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    {language === 'pt' 
                      ? `Ver todas as ${profile.culturalPhotos.length} fotos culturais` 
                      : `View all ${profile.culturalPhotos.length} cultural photos`
                    }
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Events Tab */}
        {selectedTab === 'events' && showEventSuggestions && (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h4 className="font-bold text-primary-900 mb-2">
                {language === "pt" ? "Eventos Sugeridos" : "Suggested Events"}
              </h4>
              <p className="text-sm text-primary-600">
                {language === "pt"
                  ? "Baseado nos vossos interesses comuns"
                  : "Based on your shared interests"}
              </p>
            </div>

            <div className="space-y-3">
              {profile.suggestedEvents.slice(0, 3).map((event) => (
                <div
                  key={event.id}
                  className="border border-primary-200 rounded-xl p-3 hover:bg-primary-25 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-semibold text-primary-900 text-sm">{event.title}</h5>
                    <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-lg">
                      {event.category}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-primary-600">
                    <span>{event.date}</span>
                    <span className="font-semibold">£{event.price}</span>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-3 rounded-xl font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all">
              {language === "pt" ? "Ver Todos os Eventos" : "View All Events"}
            </button>
          </div>
        )}

        {/* Conversation Starters Tab */}
        {selectedTab === 'starters' && showConversationStarters && (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h4 className="font-bold text-primary-900 mb-2">
                {language === "pt" ? "Conversas Culturais" : "Cultural Conversations"}
              </h4>
              <p className="text-sm text-primary-600">
                {language === "pt"
                  ? "Inicie conversas sobre a cultura portuguesa partilhada"
                  : "Start conversations about shared Portuguese culture"}
              </p>
            </div>

            <div className="space-y-3">
              {profile.conversationStarters.slice(0, 3).map((starter) => (
                <div
                  key={starter.id}
                  className="border border-primary-200 rounded-xl p-3 hover:bg-primary-25 transition-colors cursor-pointer"
                  onClick={() => onStartConversation?.(profile.id, starter.text)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-sm text-primary-800 leading-relaxed flex-1">
                      "{starter.text}"
                    </p>
                    <div className="flex items-center gap-1 ml-2">
                      <FireIcon className="w-3 h-3 text-orange-500" />
                      <span className="text-xs text-gray-600 font-medium">
                        {starter.popularity}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-secondary-100 text-secondary-700 px-2 py-1 rounded-lg">
                      {starter.category}
                    </span>
                    <span className="text-xs text-primary-600">
                      {starter.culturalContext}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center gap-6 mt-6 pt-4 border-t border-primary-100">
          <button
            onClick={() => onSkip(profile.id)}
            className="w-16 h-16 bg-white border-3 border-gray-200 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 hover:border-red-300 group"
          >
            <XMarkIcon className="w-8 h-8 text-gray-600 group-hover:text-red-600 transition-colors" />
          </button>

          <button
            onClick={() => onLike(profile.id)}
            className="w-20 h-20 bg-gradient-to-r from-action-500 via-secondary-500 to-accent-500 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 group"
          >
            <HeartSolid className="w-10 h-10 text-white group-hover:scale-110 transition-transform" />
          </button>

          {onSuperLike && (
            <button
              onClick={() => onSuperLike(profile.id)}
              className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 border-2 border-yellow-300 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 group"
            >
              <StarIcon className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
            </button>
          )}
        </div>
      </div>

      {/* Cultural Photo Modal */}
      {selectedCulturalPhoto && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedCulturalPhoto(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative max-w-2xl max-h-[80vh] bg-white rounded-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCulturalPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>

            <img
              src={selectedCulturalPhoto.url}
              alt="Cultural photo"
              className="w-full h-auto max-h-[60vh] object-cover"
            />
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-900">
                  {language === 'pt' ? 'Foto Cultural Verificada' : 'Verified Cultural Photo'}
                </span>
                <div className="flex items-center gap-1">
                  <StarSolid className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-bold">{Math.round(selectedCulturalPhoto.verificationScore)}%</span>
                </div>
              </div>
              
              {selectedCulturalPhoto.categories.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {selectedCulturalPhoto.categories.slice(0, 3).map((category) => (
                    <span
                      key={category.id}
                      className="px-2 py-1 bg-primary-100 text-primary-700 rounded-lg text-xs font-medium"
                    >
                      {category.icon} {language === 'pt' ? category.namePortuguese : category.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}