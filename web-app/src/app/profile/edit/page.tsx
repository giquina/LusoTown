'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import ProfileEditor from '@/components/ProfileEditor'
import { useLanguage } from '@/context/LanguageContext'
import { getCurrentUserProfile, updateProfile } from '@/lib/supabase'
import type { UserProfile } from '@/lib/supabase'

export default function ProfileEditPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const userProfile = await getCurrentUserProfile()
        if (!userProfile) {
          router.push('/signup')
          return
        }
        setProfile(userProfile)
      } catch (error) {
        console.error('Error loading profile:', error)
        toast.error('Failed to load profile')
        router.push('/signup')
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [router])

  const handleSave = async (updatedProfile: Partial<UserProfile>) => {
    if (!profile) return

    setSaving(true)
    try {
      const result = await updateProfile(profile.id, updatedProfile)
      
      if (result.success) {
        setProfile(result.data)
        toast.success('Profile updated successfully!')
      } else {
        throw new Error(result.error || 'Unknown error')
      }
    } catch (error) {
      console.error('Error saving profile:', error)
      toast.error('Failed to save profile changes')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Profile not found</p>
          <button
            onClick={() => router.push('/signup')}
            className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors"
          >
            Create Profile
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
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Edit Your Profile
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Update your information to connect better with the Portuguese-speaking community
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-8">
                <ProfileEditor
                  profile={profile}
                  onSave={handleSave}
                  saving={saving}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
