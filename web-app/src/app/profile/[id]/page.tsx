'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import ProfileViewer from '@/components/ProfileViewer'
import { useLanguage } from '@/context/LanguageContext'
import { getProfile, getCurrentUser } from '@/lib/supabase'
import type { UserProfile } from '@/lib/supabase'

export default function ProfileViewPage() {
  const { t } = useLanguage()
  const params = useParams()
  const router = useRouter()
  const profileId = params.id as string
  
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [isOwnProfile, setIsOwnProfile] = useState(false)

  useEffect(() => {
    const loadProfile = async () => {
      try {
        // Get current user
        const user = await getCurrentUser()
        const currentUserIdValue = user?.id || null
        setCurrentUserId(currentUserIdValue)

        // Check if viewing own profile
        const ownProfile = currentUserIdValue === profileId
        setIsOwnProfile(ownProfile)

        // Redirect to edit page if viewing own profile
        if (ownProfile) {
          router.push('/profile/edit')
          return
        }

        // Load the requested profile
        const userProfile = await getProfile(profileId)
        if (!userProfile) {
          toast.error('Profile not found')
          router.push('/my-network')
          return
        }

        // Check privacy settings
        if (userProfile.privacy_settings?.profile_visibility === 'connections_only') {
          // TODO: Check if users are connected
          // For now, show error
          toast.error('This profile is only visible to connections')
          router.push('/my-network')
          return
        }

        setProfile(userProfile)
      } catch (error) {
        console.error('Error loading profile:', error)
        toast.error('Failed to load profile')
        router.push('/my-network')
      } finally {
        setLoading(false)
      }
    }

    if (profileId) {
      loadProfile()
    }
  }, [profileId, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-secondary-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-secondary-600 mb-4">Profile not found</p>
          <button
            onClick={() => router.push('/my-network')}
            className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors"
          >
            Back to Network
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ProfileViewer
              profile={profile}
              currentUserId={currentUserId}
              isOwnProfile={isOwnProfile}
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
