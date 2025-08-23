'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  MapPinIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  UserPlusIcon,
  ShareIcon,
  FlagIcon,
  CalendarDaysIcon,
  BriefcaseIcon,
  GlobeAltIcon,
  StarIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { useLanguage } from '@/context/LanguageContext'
import { toast } from 'react-hot-toast'
import type { UserProfile, CulturalCompatibility } from '@/lib/supabase'
import { getCulturalCompatibility } from '@/lib/supabase'

interface ProfileViewerProps {
  profile: UserProfile
  currentUserId: string | null
  isOwnProfile: boolean
}

export default function ProfileViewer({ 
  profile, 
  currentUserId, 
  isOwnProfile 
}: ProfileViewerProps) {
  const { language } = useLanguage()
  const isPortuguese = language === 'pt'
  
  const [isLiked, setIsLiked] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const [compatibility, setCompatibility] = useState<CulturalCompatibility | null>(null)
  const [showFullBio, setShowFullBio] = useState(false)
  const [activePhotoIndex, setActivePhotoIndex] = useState(0)

  // Calculate age from date of birth
  const calculateAge = (dateOfBirth: string) => {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    
    return age
  }

  const portugueseOriginLabels: Record<string, { en: string; pt: string }> = {
    'portugal': { en: 'Portugal', pt: 'Portugal' },
    'brazil': { en: 'Brazil', pt: 'Brasil' },
    'angola': { en: 'Angola', pt: 'Angola' },
    'mozambique': { en: 'Mozambique', pt: 'Moçambique' },
    'cape-verde': { en: 'Cape Verde', pt: 'Cabo Verde' },
    'guinea-bissau': { en: 'Guinea-Bissau', pt: 'Guiné-Bissau' },
    'sao-tome-principe': { en: 'São Tomé & Príncipe', pt: 'São Tomé e Príncipe' },
    'mixed': { en: 'Mixed Heritage', pt: 'Herança Mista' }
  }

  useEffect(() => {
    const loadCompatibility = async () => {
      if (!currentUserId || isOwnProfile) return
      
      try {
        const compatibilityData = await getCulturalCompatibility(currentUserId, profile.id)
        setCompatibility(compatibilityData)
      } catch (error) {
        console.error('Error loading compatibility:', error)
      }
    }

    loadCompatibility()
  }, [currentUserId, profile.id, isOwnProfile])

  const handleLike = async () => {
    if (!currentUserId) {
      toast.error(isPortuguese ? 'Faça login para curtir perfis' : 'Please log in to like profiles')
      return
    }

    try {
      setIsLiked(!isLiked)
      toast.success(
        isLiked 
          ? (isPortuguese ? 'Descurtido!' : 'Unliked!') 
          : (isPortuguese ? 'Curtido!' : 'Liked!')
      )
    } catch (error) {
      console.error('Error liking profile:', error)
      setIsLiked(isLiked) // Revert on error
      toast.error(isPortuguese ? 'Erro ao curtir perfil' : 'Error liking profile')
    }
  }

  const handleFollow = async () => {
    if (!currentUserId) {
      toast.error(isPortuguese ? 'Faça login para seguir perfis' : 'Please log in to follow profiles')
      return
    }

    try {
      setIsFollowing(!isFollowing)
      toast.success(
        isFollowing 
          ? (isPortuguese ? 'Deixou de seguir!' : 'Unfollowed!') 
          : (isPortuguese ? 'Seguindo!' : 'Following!')
      )
    } catch (error) {
      console.error('Error following profile:', error)
      setIsFollowing(isFollowing) // Revert on error
      toast.error(isPortuguese ? 'Erro ao seguir perfil' : 'Error following profile')
    }
  }

  const handleMessage = () => {
    if (!currentUserId) {
      toast.error(isPortuguese ? 'Faça login para enviar mensagens' : 'Please log in to send messages')
      return
    }
    
    // TODO: Navigate to messaging interface
    toast.info(isPortuguese ? 'Funcionalidade de mensagem em breve' : 'Messaging feature coming soon')
  }

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${profile.first_name}'s Profile - LusoTown`,
          text: `Check out ${profile.first_name}'s profile on LusoTown`,
          url: window.location.href
        })
      } else {
        // Fallback - copy to clipboard
        await navigator.clipboard.writeText(window.location.href)
        toast.success(isPortuguese ? 'Link copiado!' : 'Link copied!')
      }
    } catch (error) {
      console.error('Error sharing:', error)
      toast.error(isPortuguese ? 'Erro ao partilhar' : 'Error sharing')
    }
  }

  const handleReport = () => {
    // TODO: Open report modal
    toast.info(isPortuguese ? 'Funcionalidade de denúncia em breve' : 'Report feature coming soon')
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        {/* Cover Photo */}
        <div className="h-48 md:h-64 bg-gradient-to-br from-green-400 via-blue-400 to-red-400 relative">
          <div className="absolute inset-0 bg-black bg-opacity-20" />
          
          {/* Profile Actions - Top Right */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 bg-white bg-opacity-20 backdrop-blur-md rounded-full text-white hover:bg-opacity-30 transition-all"
            >
              <ShareIcon className="w-5 h-5" />
            </button>
            
            {!isOwnProfile && (
              <button
                onClick={handleReport}
                className="p-2 bg-white bg-opacity-20 backdrop-blur-md rounded-full text-white hover:bg-opacity-30 transition-all"
              >
                <FlagIcon className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Profile Info */}
        <div className="relative px-6 md:px-8 pb-8">
          {/* Profile Picture */}
          <div className="absolute -top-16 left-6 md:left-8">
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gray-200">
              {profile.profile_picture_url ? (
                <img
                  src={profile.profile_picture_url}
                  alt={`${profile.first_name}'s profile`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-400 to-secondary-400">
                  <span className="text-white text-4xl font-bold">
                    {profile.first_name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Profile Details */}
          <div className="pt-20">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {profile.first_name} {profile.last_name}
                  </h1>
                  
                  {profile.verification_status === 'verified' && (
                    <CheckBadgeIcon className="w-7 h-7 text-blue-500" title="Verified Profile" />
                  )}
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                  {profile.privacy_settings?.show_age !== false && profile.date_of_birth && (
                    <div className="flex items-center gap-1">
                      <CalendarDaysIcon className="w-4 h-4" />
                      <span>{calculateAge(profile.date_of_birth)} anos</span>
                    </div>
                  )}
                  
                  {profile.privacy_settings?.show_location !== false && profile.location && (
                    <div className="flex items-center gap-1">
                      <MapPinIcon className="w-4 h-4" />
                      <span>{profile.location}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-1">
                    <GlobeAltIcon className="w-4 h-4" />
                    <span className="text-sm">
                      {isPortuguese ? 'Comunidade de Falantes de Português' : 'Portuguese-speaking community'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {!isOwnProfile && (
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={handleLike}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-red-500 text-red-500 hover:bg-red-50 transition-all"
                  >
                    {isLiked ? (
                      <HeartSolidIcon className="w-5 h-5" />
                    ) : (
                      <HeartIcon className="w-5 h-5" />
                    )}
                    <span className="hidden sm:inline">
                      {isPortuguese ? 'Curtir' : 'Like'}
                    </span>
                  </button>
                  
                  <button
                    onClick={handleFollow}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all ${
                      isFollowing
                        ? 'border-primary-500 bg-primary-500 text-white hover:bg-primary-600'
                        : 'border-primary-500 text-primary-500 hover:bg-primary-50'
                    }`}
                  >
                    <UserPlusIcon className="w-5 h-5" />
                    <span className="hidden sm:inline">
                      {isFollowing 
                        ? (isPortuguese ? 'Seguindo' : 'Following')
                        : (isPortuguese ? 'Seguir' : 'Follow')
                      }
                    </span>
                  </button>
                  
                  <button
                    onClick={handleMessage}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all"
                  >
                    <ChatBubbleLeftIcon className="w-5 h-5" />
                    <span className="hidden sm:inline">
                      {isPortuguese ? 'Mensagem' : 'Message'}
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* Cultural Compatibility */}
            {compatibility && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-r from-green-50 to-red-50 p-4 rounded-xl border border-green-200 mb-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {isPortuguese ? 'Compatibilidade Cultural' : 'Cultural Compatibility'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {Math.round(compatibility.overall_compatibility * 100)}% {isPortuguese ? 'compatível' : 'compatible'}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.round(compatibility.overall_compatibility * 5)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                
                {compatibility.shared_elements.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs text-gray-600 mb-2">
                      {isPortuguese ? 'Elementos em comum:' : 'Shared elements:'}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {compatibility.shared_elements.slice(0, 3).map((element, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-white text-xs text-gray-700 rounded-full border"
                        >
                          {element}
                        </span>
                      ))}
                      {compatibility.shared_elements.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-xs text-gray-500 rounded-full">
                          +{compatibility.shared_elements.length - 3} {isPortuguese ? 'mais' : 'more'}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Bio */}
            {profile.bio && (
              <div className="mb-6">
                <p className="text-gray-700 leading-relaxed">
                  {showFullBio || profile.bio.length <= 200 
                    ? profile.bio 
                    : `${profile.bio.substring(0, 200)}...`
                  }
                  {profile.bio.length > 200 && (
                    <button
                      onClick={() => setShowFullBio(!showFullBio)}
                      className="ml-2 text-primary-600 hover:text-primary-700 font-medium"
                    >
                      {showFullBio 
                        ? (isPortuguese ? 'Ver menos' : 'Show less')
                        : (isPortuguese ? 'Ver mais' : 'Show more')
                      }
                    </button>
                  )}
                </p>
              </div>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="text-2xl font-bold text-gray-900">
                  {profile.stats?.connections_count || 0}
                </div>
                <div className="text-sm text-gray-600">
                  {isPortuguese ? 'Conexões' : 'Connections'}
                </div>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="text-2xl font-bold text-gray-900">
                  {profile.stats?.events_attended || 0}
                </div>
                <div className="text-sm text-gray-600">
                  {isPortuguese ? 'Eventos' : 'Events'}
                </div>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="text-2xl font-bold text-primary-600">
                  {profile.membership_tier === 'premium' ? 'Premium' : 'Membro'}
                </div>
                <div className="text-sm text-gray-600">
                  {isPortuguese ? 'Plano' : 'Plan'}
                </div>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="text-2xl font-bold text-green-600">
                  {profile.stats?.profile_completion || 0}%
                </div>
                <div className="text-sm text-gray-600">
                  {isPortuguese ? 'Completo' : 'Complete'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Interests Section */}
      {profile.interests && profile.interests.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <HeartIcon className="w-6 h-6 text-primary-500" />
            <h2 className="text-2xl font-bold text-gray-900">
              {isPortuguese ? 'Interesses' : 'Interests'}
            </h2>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {profile.interests.map((interest, index) => (
              <motion.span
                key={interest}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="px-4 py-2 bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 rounded-full font-medium border border-primary-200"
              >
                {interest}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Photos Section */}
      {profile.photos && profile.photos.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {isPortuguese ? 'Fotos' : 'Photos'}
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {profile.photos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="aspect-square rounded-xl overflow-hidden bg-gray-200 cursor-pointer hover:shadow-lg transition-all"
                onClick={() => setActivePhotoIndex(index)}
              >
                <img
                  src={photo.url}
                  alt={photo.caption || `Photo ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Professional Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <BriefcaseIcon className="w-6 h-6 text-primary-500" />
          <h2 className="text-2xl font-bold text-gray-900">
            {isPortuguese ? 'Informação Profissional' : 'Professional Information'}
          </h2>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-gray-600">
              {isPortuguese ? 
                'Informações profissionais disponíveis para membros conectados' :
                'Professional information available to connected members'
              }
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}