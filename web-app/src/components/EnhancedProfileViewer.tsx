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
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { useEnhancedKeyboardNavigation } from '@/hooks/useEnhancedKeyboardNavigation'
import { toast } from 'react-hot-toast'
import type { UserProfile, CulturalCompatibility } from '@/lib/supabase'
import { getCulturalCompatibility } from '@/lib/supabase'

interface ProfileViewerProps {
  profile: UserProfile
  currentUserId: string | null
  isOwnProfile: boolean
  culturalContext?: 'portugal' | 'brazil' | 'cape-verde' | 'angola' | 'mozambique' | 'general'
}

export default function EnhancedProfileViewer({ 
  profile, 
  currentUserId, 
  isOwnProfile,
  culturalContext = 'general'
}: ProfileViewerProps) {
  const { t } = useLanguage()
  
  const [isLiked, setIsLiked] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const [showFullBio, setShowFullBio] = useState(false)
  const [activePhotoIndex, setActivePhotoIndex] = useState(0)
  const [compatibility, setCompatibility] = useState<CulturalCompatibility | null>(null)
  const [showShareMenu, setShowShareMenu] = useState(false)

  useEffect(() => {
    if (!isOwnProfile && currentUserId) {
      getCulturalCompatibility(currentUserId, profile.id)
        .then(setCompatibility)
        .catch(console.error)
    }
  }, [currentUserId, profile.id, isOwnProfile])

  const handleLike = () => {
    setIsLiked(!isLiked)
    toast.success(isLiked ? t('profile.unliked') : t('profile.liked'))
  }

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
    toast.success(isFollowing ? t('profile.unfollowed') : t('profile.followed'))
  }

  const handleMessage = () => {
    // Navigate to messages or open message modal
    toast.success(t('profile.message_sent'))
  }

  const handleShare = () => {
    setShowShareMenu(!showShareMenu)
  }

  const handleReport = () => {
    // Open report modal
    toast.success(t('profile.reported'))
  }

  const handleBioToggle = () => {
    setShowFullBio(!showFullBio)
  }

  const handlePhotoNavigation = (direction: 'previous' | 'next') => {
    if (!profile.photos?.length) return
    
    if (direction === 'next') {
      setActivePhotoIndex((prev) => (prev + 1) % profile.photos.length)
    } else {
      setActivePhotoIndex((prev) => prev === 0 ? profile.photos.length - 1 : prev - 1)
    }
  }

  const handlePhotoSelect = (index: number) => {
    setActivePhotoIndex(index)
  }

  // Keyboard navigation for profile actions
  const likeButtonProps = useEnhancedKeyboardNavigation({
    onClick: handleLike,
    culturalContext,
    ariaLabel: `${isLiked ? t('profile.unlike') : t('profile.like')} ${profile.full_name}`,
    announceActions: true
  })

  const followButtonProps = useEnhancedKeyboardNavigation({
    onClick: handleFollow,
    culturalContext,
    ariaLabel: `${isFollowing ? t('profile.unfollow') : t('profile.follow')} ${profile.full_name}`,
    announceActions: true
  })

  const messageButtonProps = useEnhancedKeyboardNavigation({
    onClick: handleMessage,
    culturalContext,
    ariaLabel: `${t('profile.send_message')} ${profile.full_name}`,
    announceActions: true
  })

  const shareButtonProps = useEnhancedKeyboardNavigation({
    onClick: handleShare,
    onEscape: () => setShowShareMenu(false),
    culturalContext,
    ariaLabel: `${t('profile.share')} ${profile.full_name}`,
    announceActions: true
  })

  const reportButtonProps = useEnhancedKeyboardNavigation({
    onClick: handleReport,
    culturalContext,
    ariaLabel: `${t('profile.report')} ${profile.full_name}`,
    announceActions: true
  })

  const bioToggleProps = useEnhancedKeyboardNavigation({
    onClick: handleBioToggle,
    culturalContext,
    ariaLabel: showFullBio ? t('profile.show_less') : t('profile.show_more'),
    announceActions: true
  })

  // Photo navigation keyboard handlers
  const photoNextProps = useEnhancedKeyboardNavigation({
    onClick: () => handlePhotoNavigation('next'),
    onArrowRight: () => handlePhotoNavigation('next'),
    culturalContext,
    ariaLabel: t('profile.next_photo'),
    announceActions: false
  })

  const photoPrevProps = useEnhancedKeyboardNavigation({
    onClick: () => handlePhotoNavigation('previous'),
    onArrowLeft: () => handlePhotoNavigation('previous'),
    culturalContext,
    ariaLabel: t('profile.previous_photo'),
    announceActions: false
  })

  return (
    <article className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
      {/* Photo Gallery Section */}
      <section className="relative h-96 bg-gradient-to-br from-primary-500 to-secondary-500" aria-label={t('profile.photos')}>
        {profile.photos && profile.photos.length > 0 ? (
          <div className="relative w-full h-full">
            <img
              src={profile.photos[activePhotoIndex]}
              alt={`${profile.full_name} ${t('profile.photo')} ${activePhotoIndex + 1}`}
              className="w-full h-full object-cover"
            />
            
            {/* Photo Navigation */}
            {profile.photos.length > 1 && (
              <nav className="absolute inset-x-0 bottom-4 flex justify-center gap-2" aria-label={t('profile.photo_navigation')}>
                {profile.photos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePhotoSelect(index)}
                    className={`w-3 h-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-white ${
                      index === activePhotoIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                    }`}
                    aria-label={`${t('profile.go_to_photo')} ${index + 1}`}
                    tabIndex={0}
                  />
                ))}
              </nav>
            )}
            
            {/* Arrow Navigation */}
            {profile.photos.length > 1 && (
              <>
                <button
                  {...photoPrevProps}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white bg-opacity-20 backdrop-blur-md rounded-full text-white hover:bg-opacity-30 focus:bg-opacity-30 transition-all focus:outline-none focus:ring-2 focus:ring-white min-h-[44px] min-w-[44px]"
                  aria-hidden="true"
                >
                  ←
                </button>
                <button
                  {...photoNextProps}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white bg-opacity-20 backdrop-blur-md rounded-full text-white hover:bg-opacity-30 focus:bg-opacity-30 transition-all focus:outline-none focus:ring-2 focus:ring-white min-h-[44px] min-w-[44px]"
                  aria-hidden="true"
                >
                  →
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-white">
              <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-4xl">👤</span>
              </div>
              <h2 className="text-2xl font-bold">{profile.full_name}</h2>
            </div>
          </div>
        )}
        
        {/* Profile Actions Overlay */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <button
            {...shareButtonProps}
            className="p-2 bg-white bg-opacity-20 backdrop-blur-md rounded-full text-white hover:bg-opacity-30 focus:bg-opacity-30 transition-all focus:outline-none focus:ring-2 focus:ring-white min-h-[44px] min-w-[44px]"
            aria-expanded={showShareMenu}
            aria-haspopup="menu"
          >
            <ShareIcon className="w-5 h-5" aria-hidden="true" />
          </button>
          
          {!isOwnProfile && (
            <button
              {...reportButtonProps}
              className="p-2 bg-white bg-opacity-20 backdrop-blur-md rounded-full text-white hover:bg-opacity-30 focus:bg-opacity-30 transition-all focus:outline-none focus:ring-2 focus:ring-white min-h-[44px] min-w-[44px]"
            >
              <FlagIcon className="w-5 h-5" aria-hidden="true" />
            </button>
          )}
        </div>
        
        {/* Share Menu */}
        {showShareMenu && (
          <div className="absolute top-16 right-4 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-10">
            <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
              {t('profile.share_whatsapp')}
            </button>
            <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
              {t('profile.copy_link')}
            </button>
          </div>
        )}
      </section>
      
      {/* Profile Information */}
      <section className="p-8">
        <header className="flex items-start justify-between mb-8">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{profile.full_name}</h1>
              {profile.is_verified && (
                <CheckBadgeIcon className="w-8 h-8 text-primary-500" aria-label={t('profile.verified')} />
              )}
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
              {profile.age && <span>{profile.age} {t('profile.years_old')}</span>}
              {profile.location && (
                <span className="flex items-center gap-1">
                  <MapPinIcon className="w-4 h-4" aria-hidden="true" />
                  {profile.location}
                </span>
              )}
              {profile.cultural_background && (
                <span className="flex items-center gap-1">
                  <GlobeAltIcon className="w-4 h-4" aria-hidden="true" />
                  {profile.cultural_background}
                </span>
              )}
            </div>
            
            {/* Bio Section */}
            <div className="mb-6">
              <p className={`text-gray-700 ${!showFullBio && 'line-clamp-3'}`}>
                {profile.bio}
              </p>
              {profile.bio && profile.bio.length > 150 && (
                <button
                  {...bioToggleProps}
                  className="text-primary-600 text-sm font-medium hover:underline focus:underline mt-2 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded p-1"
                >
                  {showFullBio ? t('profile.show_less') : t('profile.show_more')}
                </button>
              )}
            </div>
            
            {/* Interests */}
            {profile.interests && profile.interests.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('profile.interests')}</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Action Buttons */}
          {!isOwnProfile && (
            <div className="flex flex-col gap-3 ml-6">
              <button
                {...likeButtonProps}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all min-h-[44px] focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  isLiked
                    ? 'border-red-500 bg-red-50 text-red-600'
                    : 'border-red-500 text-red-500 hover:bg-red-50'
                }`}
              >
                <HeartIcon className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} aria-hidden="true" />
                <span className="font-medium">{isLiked ? t('profile.liked') : t('profile.like')}</span>
              </button>
              
              <button
                {...followButtonProps}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all min-h-[44px] focus:outline-none focus:ring-2 ${
                  isFollowing
                    ? 'border-gray-300 bg-gray-100 text-gray-600 hover:bg-gray-200 focus:ring-gray-500'
                    : 'border-primary-500 text-primary-500 hover:bg-primary-50 focus:ring-primary-500'
                }`}
              >
                <UserPlusIcon className="w-5 h-5" aria-hidden="true" />
                <span className="font-medium">
                  {isFollowing ? t('profile.following') : t('profile.follow')}
                </span>
              </button>
              
              <button
                {...messageButtonProps}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <ChatBubbleLeftIcon className="w-5 h-5" aria-hidden="true" />
                <span className="font-medium">{t('profile.message')}</span>
              </button>
            </div>
          )}
        </header>
        
        {/* Cultural Compatibility */}
        {compatibility && (
          <section className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-6 mb-8" aria-label={t('profile.cultural_compatibility')}>
            <h3 className="text-xl font-bold text-gray-900 mb-4">{t('profile.cultural_compatibility')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">{compatibility.overall_score}%</div>
                <p className="text-sm text-gray-600">{t('profile.overall_match')}</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary-600">{compatibility.cultural_values}%</div>
                <p className="text-sm text-gray-600">{t('profile.cultural_values')}</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-600">{compatibility.lifestyle}%</div>
                <p className="text-sm text-gray-600">{t('profile.lifestyle_match')}</p>
              </div>
            </div>
          </section>
        )}
        
        {/* Additional Information */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {profile.occupation && (
            <div>
              <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-3">
                <BriefcaseIcon className="w-5 h-5" aria-hidden="true" />
                {t('profile.occupation')}
              </h3>
              <p className="text-gray-700">{profile.occupation}</p>
            </div>
          )}
          
          {profile.education && (
            <div>
              <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-3">
                <StarIcon className="w-5 h-5" aria-hidden="true" />
                {t('profile.education')}
              </h3>
              <p className="text-gray-700">{profile.education}</p>
            </div>
          )}
        </section>
      </section>
    </article>
  )
}