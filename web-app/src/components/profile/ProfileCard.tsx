'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  MapPinIcon, 
  HeartIcon,
  CalendarIcon,
  CheckBadgeIcon,
  UserGroupIcon,
  CameraIcon
} from '@heroicons/react/24/outline'
import { Crown } from 'lucide-react'
import { UserProfile } from '@/lib/connections'
import ConnectionButton from './ConnectionButton'

interface ProfileCardProps {
  profile: UserProfile
  currentUserId: string
  onClick: () => void
}

export default function ProfileCard({ profile, currentUserId, onClick }: ProfileCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  const getMembershipConfig = (tier: string) => {
    const configs = {
      free: { 
        icon: <HeartIcon className="w-3 h-3" />, 
        color: 'text-gray-600 bg-gray-100', 
        label: 'Free',
        border: 'border-gray-200'
      },
      core: { 
        icon: <HeartIcon className="w-3 h-3" />, 
        color: 'text-[#FF6B6B] bg-red-50', 
        label: 'Core',
        border: 'border-red-200'
      },
      premium: { 
        icon: <Crown className="w-3 h-3" />, 
        color: 'text-purple-600 bg-purple-50', 
        label: 'Premium',
        border: 'border-purple-200'
      }
    }
    return configs[tier as keyof typeof configs] || configs.free
  }

  const membershipConfig = getMembershipConfig(profile.membershipTier)

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    >
      {/* Profile Image Section */}
      <div className="relative h-48 bg-gray-200 overflow-hidden" onClick={onClick}>
        {profile.profileImage ? (
          <img
            src={profile.profileImage}
            alt={profile.name}
            className={`w-full h-full object-cover transition-all duration-300 hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#FF6B6B] to-[#4ECDC4] flex items-center justify-center text-white text-2xl font-bold">
            {profile.name.split(' ').map(n => n[0]).join('')}
          </div>
        )}

        {/* Loading placeholder */}
        {!imageLoaded && profile.profileImage && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <CameraIcon className="w-8 h-8 text-gray-400" />
          </div>
        )}

        {/* Online Status */}
        {profile.isOnline && (
          <div className="absolute top-3 right-3 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
        )}

        {/* Verification Badge */}
        {profile.verification.photoVerified && (
          <div className="absolute top-3 left-3 bg-primary-500 text-white p-1 rounded-full">
            <CheckBadgeIcon className="w-4 h-4" />
          </div>
        )}

        {/* Photo Count */}
        {profile.photos.length > 0 && (
          <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <CameraIcon className="w-3 h-3" />
            {profile.photos.length}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Name and Basic Info */}
        <div className="mb-3" onClick={onClick}>
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              {profile.name}
              {profile.verification.photoVerified && (
                <CheckBadgeIcon className="w-4 h-4 text-primary-500 flex-shrink-0" />
              )}
            </h3>
            
            {/* Membership Badge */}
            <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full border text-xs font-medium ${membershipConfig.color} ${membershipConfig.border}`}>
              {membershipConfig.icon}
              <span>{membershipConfig.label}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
            {profile.privacy.showAge && (
              <span className="flex items-center gap-1">
                <CalendarIcon className="w-4 h-4" />
                {profile.age}
              </span>
            )}
            {profile.privacy.showLocation && (
              <span className="flex items-center gap-1">
                <MapPinIcon className="w-4 h-4" />
                {profile.location.split(',')[0]}
              </span>
            )}
          </div>
        </div>

        {/* Bio Preview */}
        <div className="mb-3" onClick={onClick}>
          <p className="text-sm text-gray-700 line-clamp-2">
            {profile.bio || 'No bio provided'}
          </p>
        </div>

        {/* Interests Preview */}
        <div className="mb-4" onClick={onClick}>
          <div className="flex flex-wrap gap-1 mb-2">
            {profile.interests.slice(0, 3).map((interest, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
              >
                {interest}
              </span>
            ))}
            {profile.interests.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                +{profile.interests.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600" onClick={onClick}>
          <div className="flex items-center gap-1">
            <UserGroupIcon className="w-4 h-4" />
            <span>{profile.connectionsCount} connections</span>
          </div>
          <div className="flex items-center gap-1">
            <CalendarIcon className="w-4 h-4" />
            <span>{profile.eventsAttended} events</span>
          </div>
        </div>

        {/* Badges Preview */}
        {profile.badges.length > 0 && (
          <div className="mb-4" onClick={onClick}>
            <div className="flex items-center gap-1 mb-2">
              <span className="text-xs text-gray-600 font-medium">Achievements:</span>
            </div>
            <div className="flex items-center gap-1">
              {profile.badges.slice(0, 4).map((badge, index) => (
                <span key={badge.id} className="text-lg" title={badge.name}>
                  {badge.icon}
                </span>
              ))}
              {profile.badges.length > 4 && (
                <span className="text-xs text-gray-500">+{profile.badges.length - 4}</span>
              )}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-3 border-t border-gray-100">
          <ConnectionButton
            profileId={profile.id}
            currentUserId={currentUserId}
            className="w-full justify-center"
          />
        </div>

        {/* Last Active */}
        <div className="mt-2 text-xs text-gray-500 text-center">
          {profile.isOnline ? (
            <span className="text-green-600 font-medium">Online now</span>
          ) : (
            <span>
              Active {new Date(profile.lastActive).toLocaleDateString('en-GB', {
                month: 'short',
                day: 'numeric'
              })}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}