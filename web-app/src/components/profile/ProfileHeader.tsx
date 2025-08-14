'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  MapPinIcon, 
  CalendarIcon, 
  HeartIcon,
  UserGroupIcon,
  CheckBadgeIcon,
  CameraIcon,
  ChatBubbleLeftRightIcon,
  UserPlusIcon
} from '@heroicons/react/24/outline'
import { Crown, Shield, Star, Award } from 'lucide-react'
import { UserProfile } from '@/lib/connections'
import { User } from '@/lib/auth'
import ProfileBadges from './ProfileBadges'
import ConnectionButton from './ConnectionButton'

interface ProfileHeaderProps {
  profile: UserProfile
  currentUser: User | null
  isOwnProfile?: boolean
  onEditClick?: () => void
  onPhotoClick?: () => void
  onMessageClick?: () => void
}

export default function ProfileHeader({ 
  profile, 
  currentUser, 
  isOwnProfile = false,
  onEditClick,
  onPhotoClick,
  onMessageClick
}: ProfileHeaderProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  const getMembershipConfig = (tier: string) => {
    const configs = {
      free: { 
        icon: <HeartIcon className="w-4 h-4" />, 
        color: 'text-gray-600 bg-gray-100', 
        label: 'Free Member',
        border: 'border-gray-200'
      },
      core: { 
        icon: <HeartIcon className="w-4 h-4" />, 
        color: 'text-[#FF6B6B] bg-red-50', 
        label: 'Core Member',
        border: 'border-red-200'
      },
      premium: { 
        icon: <Crown className="w-4 h-4" />, 
        color: 'text-purple-600 bg-purple-50', 
        label: 'Premium Member',
        border: 'border-purple-200'
      }
    }
    return configs[tier as keyof typeof configs] || configs.free
  }

  const membershipConfig = getMembershipConfig(profile.membershipTier)
  
  // Calculate age from birthdate if not provided
  const age = profile.age || 30

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Cover/Background Section */}
      <div className="h-32 sm:h-40 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] relative">
        <div className="absolute inset-0 bg-black/10"></div>
        {isOwnProfile && (
          <button
            onClick={onEditClick}
            className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/30 transition-colors"
          >
            <CameraIcon className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Profile Content */}
      <div className="px-6 pb-6">
        {/* Profile Picture & Basic Info */}
        <div className="flex flex-col sm:flex-row sm:items-end -mt-16 sm:-mt-20">
          <div className="relative mb-4 sm:mb-0 sm:mr-6">
            <div className="relative">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl border-4 border-white shadow-lg bg-gray-200 overflow-hidden">
                {profile.profileImage ? (
                  <img
                    src={profile.profileImage}
                    alt={profile.name}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => setImageLoaded(true)}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#FF6B6B] to-[#4ECDC4] flex items-center justify-center text-white text-xl sm:text-2xl font-bold">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </div>
                )}
              </div>
              
              {/* Online Status */}
              {profile.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-3 border-white rounded-full"></div>
              )}
              
              {/* Photo Click for Gallery */}
              {!isOwnProfile && (
                <button
                  onClick={onPhotoClick}
                  className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors rounded-2xl flex items-center justify-center opacity-0 hover:opacity-100"
                >
                  <CameraIcon className="w-6 h-6 text-white" />
                </button>
              )}
            </div>
          </div>

          {/* Name & Basic Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
                  {profile.name}
                  {profile.verification.photoVerified && (
                    <CheckBadgeIcon className="w-6 h-6 text-primary-500 flex-shrink-0" />
                  )}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600">
                  {profile.privacy.showAge && (
                    <span className="flex items-center gap-1">
                      <CalendarIcon className="w-4 h-4" />
                      {age} years old
                    </span>
                  )}
                  {profile.privacy.showLocation && (
                    <span className="flex items-center gap-1">
                      <MapPinIcon className="w-4 h-4" />
                      {profile.location}
                    </span>
                  )}
                </div>

                {/* Membership Badge */}
                <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border mt-2 ${membershipConfig.color} ${membershipConfig.border}`}>
                  {membershipConfig.icon}
                  <span className="text-xs font-medium">{membershipConfig.label}</span>
                </div>
              </div>

              {/* Action Buttons */}
              {!isOwnProfile && currentUser && (
                <div className="flex items-center gap-2">
                  <ConnectionButton 
                    profileId={profile.id}
                    currentUserId={currentUser.id}
                  />
                  
                  {profile.privacy.allowMessages !== 'connections' && (
                    <button
                      onClick={onMessageClick}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                    >
                      <ChatBubbleLeftRightIcon className="w-4 h-4" />
                      <span className="hidden sm:inline">Message</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-6 mt-6 pt-6 border-t border-gray-100">
          <div className="text-center">
            <div className="text-xl font-bold text-gray-900">{profile.connectionsCount}</div>
            <div className="text-xs text-gray-600">Connections</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-gray-900">{profile.eventsAttended}</div>
            <div className="text-xs text-gray-600">Events</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-gray-900">{profile.photos.length}</div>
            <div className="text-xs text-gray-600">Photos</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-gray-900">{profile.badges.length}</div>
            <div className="text-xs text-gray-600">Badges</div>
          </div>
        </div>

        {/* Bio */}
        {profile.bio && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">About Me</h3>
            <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
          </div>
        )}

        {/* Interests */}
        {profile.interests.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Badges */}
        {profile.badges.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Badges & Achievements</h3>
            <ProfileBadges badges={profile.badges} />
          </div>
        )}

        {/* What I'm Looking For */}
        {profile.preferences?.lookingFor && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Looking For</h3>
            <div className="flex items-center gap-2">
              <UserGroupIcon className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700 capitalize">
                {profile.preferences.lookingFor === 'all' 
                  ? 'All types of connections' 
                  : profile.preferences.lookingFor.replace('_', ' ')
                }
              </span>
            </div>
          </div>
        )}

        {/* Verification Status */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Verification</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
              profile.verification.emailVerified ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-600'
            }`}>
              <CheckBadgeIcon className={`w-4 h-4 ${profile.verification.emailVerified ? 'text-green-500' : 'text-gray-400'}`} />
              <span className="text-sm">Email Verified</span>
            </div>
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
              profile.verification.photoVerified ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-600'
            }`}>
              <CameraIcon className={`w-4 h-4 ${profile.verification.photoVerified ? 'text-green-500' : 'text-gray-400'}`} />
              <span className="text-sm">Photo Verified</span>
            </div>
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
              profile.verification.phoneVerified ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-600'
            }`}>
              <CheckBadgeIcon className={`w-4 h-4 ${profile.verification.phoneVerified ? 'text-green-500' : 'text-gray-400'}`} />
              <span className="text-sm">Phone Verified</span>
            </div>
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
              profile.verification.backgroundChecked ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-600'
            }`}>
              <Shield className={`w-4 h-4 ${profile.verification.backgroundChecked ? 'text-green-500' : 'text-gray-400'}`} />
              <span className="text-sm">Background Check</span>
            </div>
          </div>
        </div>

        {/* Member Since */}
        <div className="mt-4 text-sm text-gray-500">
          Member since {new Date(profile.joinedAt).toLocaleDateString('en-GB', { 
            month: 'long', 
            year: 'numeric' 
          })}
        </div>
      </div>
    </div>
  )
}