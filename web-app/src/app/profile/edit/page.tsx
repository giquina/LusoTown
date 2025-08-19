'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeftIcon, 
  UserCircleIcon,
  CameraIcon,
  ShieldCheckIcon,
  Cog6ToothIcon,
  PhotoIcon,
  HeartIcon
} from '@heroicons/react/24/outline'
import { getCurrentUser, getCurrentUserProfile, UserProfile, updateProfile, getCulturalPreferences, saveCulturalPreferences } from '@/lib/supabase'
// ProfileEditForm removed during cleanup

// Define interest categories
const INTEREST_CATEGORIES = {
  'Social & Networking': [
    'Networking', 'Coffee Chats', 'Dinner Parties', 'Happy Hour',
    'Wine Tasting', 'Book Clubs', 'Game Nights', 'Meetups'
  ],
  'Health & Wellness': [
    'Yoga', 'Pilates', 'Gym & Fitness', 'Running', 'Cycling',
    'Meditation', 'Wellness Retreats', 'Healthy Cooking'
  ],
  'Arts & Culture': [
    'Art Galleries', 'Museums', 'Theatre', 'Concerts', 'Photography',
    'Poetry', 'Creative Writing', 'Film & Cinema', 'Dancing'
  ],
  'Outdoor & Adventure': [
    'Hiking', 'Rock Climbing', 'Camping', 'Water Sports',
    'Travel Adventures', 'Nature Walks', 'Outdoor Photography'
  ],
  'Food & Dining': [
    'Restaurant Tours', 'Cooking Classes', 'Food Markets',
    'Brunch', 'Vegetarian/Vegan', 'International Cuisine'
  ],
  'Professional & Learning': [
    'Career Development', 'Entrepreneurship', 'Public Speaking',
    'Languages', 'Online Courses', 'Workshops', 'Conferences'
  ]
}

const LONDON_AREAS = [
  'Central London', 'Westminster', 'City of London', 'Camden',
  'Islington', 'Hackney', 'Tower Hamlets', 'Greenwich', 'Lewisham',
  'Southwark', 'Lambeth', 'Wandsworth', 'Hammersmith & Fulham',
  'Kensington & Chelsea', 'Chelsea', 'Kensington', 'Notting Hill',
  'Paddington', 'Marylebone', 'Fitzrovia', 'Covent Garden',
  'Shoreditch', 'Canary Wharf', 'Borough', 'Clapham', 'Battersea',
  'Wimbledon', 'Richmond', 'Kingston', 'Croydon'
]

interface ProfileFormData {
  first_name: string
  last_name?: string
  bio: string
  location: string
  date_of_birth: string
  interests: string[]
  preferences: {
    looking_for: 'friendship' | 'activity_partners' | 'networking' | 'all'
    age_range_min: number
    age_range_max: number
    preferred_locations: string[]
  }
  privacy_settings: {
    show_age: boolean
    show_location: boolean
    allow_messages: 'everyone' | 'connections' | 'premium'
    profile_visibility: 'public' | 'members_only' | 'connections_only'
  }
  cultural_preferences?: {
    origins: string[]
    language_preference: string
    cultural_celebrations: string[]
    professional_goals: string[]
    cultural_values: Record<string, number>
    lifestyle_preferences: string[]
  }
}

type EditTab = 'profile' | 'cultural' | 'photos' | 'completion'

function ProfileEditPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<EditTab>('profile')

  // Form data
  const [formData, setFormData] = useState<ProfileFormData>({
    first_name: '',
    last_name: '',
    bio: '',
    location: '',
    date_of_birth: '',
    interests: [],
    preferences: {
      looking_for: 'friendship',
      age_range_min: 28,
      age_range_max: 45,
      preferred_locations: []
    },
    privacy_settings: {
      show_age: true,
      show_location: true,
      allow_messages: 'connections',
      profile_visibility: 'members_only'
    },
    cultural_preferences: {
      origins: [],
      language_preference: '',
      cultural_celebrations: [],
      professional_goals: [],
      cultural_values: {},
      lifestyle_preferences: []
    }
  })

  const [culturalPreferences, setCulturalPreferences] = useState({
    origins: [],
    language_preference: '',
    cultural_celebrations: [],
    professional_goals: [],
    cultural_values: {},
    lifestyle_preferences: []
  })
  const [savingCultural, setSavingCultural] = useState(false)

  useEffect(() => {
    // Get tab from URL params
    const tab = searchParams.get('tab') as EditTab
    if (tab && ['profile', 'cultural', 'photos', 'completion'].includes(tab)) {
      setActiveTab(tab)
    }
  }, [searchParams])

  useEffect(() => {
    loadProfileData()
  }, [])

  const loadProfileData = async () => {
    setLoading(true)
    
    try {
      const user = await getCurrentUser()
      if (!user) {
        router.push('/login')
        return
      }
      
      setCurrentUser(user)

      // Load profile data
      const profileData = await getCurrentUserProfile()
      setProfile(profileData)
      
      // Load cultural preferences
      const culturalData = await getCulturalPreferences(user.id)
      if (culturalData) {
        setCulturalPreferences({
          origins: culturalData.origins,
          language_preference: culturalData.language_preference,
          cultural_celebrations: culturalData.cultural_celebrations,
          professional_goals: culturalData.professional_goals,
          cultural_values: culturalData.cultural_values,
          lifestyle_preferences: culturalData.lifestyle_preferences
        })
      }

      // Populate form data
      if (profileData) {
        setFormData({
          first_name: profileData.first_name || '',
          last_name: profileData.last_name || '',
          bio: profileData.bio || '',
          location: profileData.location || '',
          date_of_birth: profileData.date_of_birth || '',
          interests: profileData.interests || [],
          preferences: {
            looking_for: profileData.preferences?.looking_for || 'friendship',
            age_range_min: profileData.preferences?.age_range_min || 28,
            age_range_max: profileData.preferences?.age_range_max || 45,
            preferred_locations: profileData.preferences?.preferred_locations || []
          },
          privacy_settings: profileData.privacy_settings || {
            show_age: true,
            show_location: true,
            allow_messages: 'connections',
            profile_visibility: 'members_only'
          }
        })
      }
    } catch (error) {
      console.error('Error loading profile:', error)
      alert('Failed to load profile data')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!currentUser) return

    setSaving(true)
    
    try {
      const result = await updateProfile(currentUser.id, formData)
      
      if (result.success) {
        alert('Profile updated successfully!')
        router.push(`/profile/${currentUser.id}`)
      } else {
        alert(result.error || 'Failed to save profile')
      }
    } catch (error) {
      console.error('Error saving profile:', error)
      alert('Failed to save profile')
    } finally {
      setSaving(false)
    }
  }

  const handleFormChange = (field: keyof ProfileFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleCulturalPreferencesChange = (culturalData: any) => {
    setCulturalPreferences(culturalData)
    setFormData(prev => ({
      ...prev,
      cultural_preferences: culturalData
    }))
  }

  const handleSaveCulturalPreferences = async () => {
    if (!currentUser) return
    
    setSavingCultural(true)
    try {
      const result = await saveCulturalPreferences(currentUser.id, culturalPreferences)
      
      if (result.success) {
        alert('Cultural preferences saved successfully!')
      } else {
        alert(result.error || 'Failed to save cultural preferences')
      }
    } catch (error) {
      console.error('Error saving cultural preferences:', error)
      alert('Failed to save cultural preferences')
    } finally {
      setSavingCultural(false)
    }
  }

  const tabs = [
    {
      id: 'profile' as EditTab,
      name: 'Profile Info',
      icon: <UserCircleIcon className="w-4 h-4" />,
      description: 'Basic information and interests'
    },
    {
      id: 'cultural' as EditTab,
      name: 'Cultural Background',
      icon: <HeartIcon className="w-4 h-4" />,
      description: 'Portuguese cultural preferences'
    },
    {
      id: 'photos' as EditTab,
      name: 'Photos',
      icon: <PhotoIcon className="w-4 h-4" />,
      description: 'Profile pictures and gallery'
    },
    {
      id: 'completion' as EditTab,
      name: 'Completion',
      icon: <ShieldCheckIcon className="w-4 h-4" />,
      description: 'Profile progress and completion'
    }
  ]

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

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="pt-16">
          <div className="container-width py-8">
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
              <p className="text-gray-600 mb-4">Please log in to edit your profile.</p>
              <button
                onClick={() => router.push('/login')}
                className="btn-primary"
              >
                Log In
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push(`/profile/${currentUser.id}`)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Back to Profile</span>
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push(`/profile/${currentUser.id}`)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 bg-[#FF6B6B] text-white px-6 py-2 rounded-lg hover:bg-[#FF5252] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saving && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>}
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Edit Profile</h2>
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-[#FF6B6B] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      {tab.icon}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{tab.name}</div>
                      <div className={`text-xs mt-1 ${
                        activeTab === tab.id ? 'text-white/80' : 'text-gray-500'
                      }`}>
                        {tab.description}
                      </div>
                    </div>
                  </button>
                ))}
              </nav>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
              >
                {activeTab === 'profile' && (
                  <ProfileEditForm
                    profile={profile}
                    formData={formData}
                    onChange={handleFormChange}
                    interestCategories={INTEREST_CATEGORIES}
                    locations={LONDON_AREAS}
                    onSave={handleSave}
                    saving={saving}
                  />
                )}
                
                {activeTab === 'cultural' && (
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Portuguese Cultural Preferences</h3>
                    <p className="text-gray-600">Cultural preferences component temporarily removed during cleanup</p>
                  </div>
                )}
                
                {activeTab === 'photos' && (
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Photo Management</h3>
                    <p className="text-gray-600">Photo manager component temporarily removed during cleanup</p>
                  </div>
                )}
                
                {activeTab === 'completion' && currentUser && (
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Profile Completion</h3>
                    <p className="text-gray-600">Profile completion component temporarily removed during cleanup</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default function ProfileEditPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400"></div>
      </div>
    }>
      <ProfileEditPageContent />
    </Suspense>
  )
}