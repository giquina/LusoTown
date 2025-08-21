'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { 
  UserIcon, 
  CogIcon, 
  ShieldCheckIcon, 
  BellIcon, 
  GlobeAltIcon,
  EyeIcon,
  HeartIcon,
  ChatBubbleLeftIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { getCurrentUserProfile, updateProfile } from '@/lib/supabase'
import type { UserProfile } from '@/lib/supabase'

export default function SettingsPage() {
  const { language, toggleLanguage } = useLanguage()
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('general')

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-secondary-600">Loading settings...</p>
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
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Settings</h1>
              <p className="text-xl text-secondary-600">Customize your Portuguese community experience</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Language</p>
                      <p className="text-sm text-secondary-600">Interface language</p>
                    </div>
                    <button
                      onClick={toggleLanguage}
                      className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
                    >
                      {language === 'pt' ? 'English' : 'Português'}
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Edit Profile</p>
                      <p className="text-sm text-secondary-600">Update your profile information</p>
                    </div>
                    <button
                      onClick={() => router.push('/profile/edit')}
                      className="bg-secondary-500 text-white px-4 py-2 rounded-lg hover:bg-secondary-600 transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}