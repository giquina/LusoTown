'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeftIcon, PencilIcon } from '@heroicons/react/24/outline'
import { authService, User } from '@/lib/auth'
import { UserProfile } from '@/lib/connections'
import { profileService } from '@/lib/profile'
// Profile components removed
import { toast } from 'react-hot-toast'


export default function ProfilePage() {
  const params = useParams()
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isOwnProfile, setIsOwnProfile] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState<{photo: any, index: number} | null>(null)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const profileId = params.id as string

  useEffect(() => {
    loadProfileData()
  }, [profileId])

  const loadProfileData = async () => {
    setLoading(true)
    
    try {
      const user = authService.getCurrentUser()
      setCurrentUser(user)
      
      if (!user) {
        router.push('/login')
        return
      }

      // Check if viewing own profile
      const isOwn = user.id === profileId
      setIsOwnProfile(isOwn)

      // Load profile data
      const profileData = await profileService.getProfile(profileId)
      
      if (!profileData) {
        toast.error('Profile not found')
        router.push('/profiles')
        return
      }

      setProfile(profileData)
    } catch (error) {
      console.error('Error loading profile:', error)
      toast.error('Failed to load profile')
    } finally {
      setLoading(false)
    }
  }

  const handleEditProfile = () => {
    router.push('/profile/edit')
  }

  const handlePhotoClick = (photo: any, index: number) => {
    // Open photo lightbox/modal
    setSelectedPhoto({ photo, index })
    setIsLightboxOpen(true)
  }

  const handlePhotoAdd = async (files: File[]) => {
    try {
      for (const file of files) {
        // Compress image
        const compressedFile = await profileService.compressImage(file)
        
        // Create upload object
        const upload = profileService.createPhotoUpload(compressedFile)
        
        // Simulate upload (replace with real upload logic)
        const result = await profileService.uploadPhoto(upload, (progress) => {
          console.log(`Upload progress: ${progress}%`)
        })
        
        if (result.success) {
          toast.success('Photo uploaded successfully!')
          // Refresh profile data
          loadProfileData()
        } else {
          toast.error('Failed to upload photo')
        }
      }
    } catch (error) {
      console.error('Error uploading photos:', error)
      toast.error('Failed to upload photos')
    }
  }

  const handlePhotoDelete = async (photoId: string) => {
    try {
      // Implement photo deletion
      await profileService.deletePhoto(photoId)
      toast.success('Photo deleted')
      loadProfileData()
    } catch (error) {
      console.error('Error deleting photo:', error)
      toast.error('Failed to delete photo')
    }
  }

  const handlePhotoLike = async (photoId: string) => {
    try {
      // Implement photo liking
      await profileService.togglePhotoLike(photoId)
      toast.success('Photo liked')
      loadProfileData()
    } catch (error) {
      console.error('Error liking photo:', error)
      toast.error('Failed to like photo')
    }
  }

  const handleMessageClick = () => {
    if (profile) {
      router.push(`/chat?user=${profile.id}`)
    }
  }

  const handleCompletionStepClick = (stepId: string) => {
    // Navigate to appropriate page based on step
    switch (stepId) {
      case 'basic_info':
      case 'bio':
      case 'location':
      case 'interests':
      case 'preferences':
        router.push('/profile/edit')
        break
      case 'profile_picture':
      case 'additional_photos':
        router.push('/profile/edit?tab=photos')
        break
      case 'verification':
        router.push('/profile/edit?tab=verification')
        break
      default:
        router.push('/profile/edit')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="pt-16">
          <div className="container-width py-8">
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF6B6B]"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!profile || !currentUser) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="pt-16">
          <div className="container-width py-8">
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Profile Not Found</h1>
              <p className="text-gray-600 mb-4">The profile you're looking for doesn't exist.</p>
              <button
                onClick={() => router.push('/profiles')}
                className="btn-primary"
              >
                Browse Profiles
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-16">
      <div className="container-width py-8">
        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Back</span>
          </button>
          
          {isOwnProfile && (
            <button
              onClick={handleEditProfile}
              className="ml-auto flex items-center gap-2 bg-[#FF6B6B] text-white px-4 py-2 rounded-lg hover:bg-[#FF5252] transition-colors"
            >
              <PencilIcon className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900">{profile.firstName} {profile.lastName}</h1>
                <p className="text-gray-600">Profile components temporarily removed during cleanup</p>
              </div>
            </motion.div>

            {/* Photo Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <p className="text-gray-600">Photo gallery component temporarily removed during cleanup</p>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Profile Completion (Own Profile Only) */}
            {isOwnProfile && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <p className="text-gray-600">Profile completion component temporarily removed during cleanup</p>
                </div>
              </motion.div>
            )}

            {/* Mutual Connections (Other Profiles Only) */}
            {!isOwnProfile && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Mutual Connections</h3>
                <div className="text-center py-4 text-gray-500">
                  <p className="text-sm">Feature coming soon!</p>
                  <p className="text-xs mt-1">See friends in common</p>
                </div>
              </motion.div>
            )}

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Member since</span>
                  <span className="font-medium">
                    {new Date(profile.joinedAt).toLocaleDateString('en-GB', {
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Last active</span>
                  <span className="font-medium">
                    {profile.isOnline ? 'Online now' : new Date(profile.lastActive).toLocaleDateString('en-GB', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Events attended</span>
                  <span className="font-medium">{profile.eventsAttended}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Connections</span>
                  <span className="font-medium">{profile.connectionsCount}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}
