'use client'
export const dynamic = 'force-dynamic'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FunnelIcon, 
  MagnifyingGlassIcon, 
  MapPinIcon,
  HeartIcon,
  UserGroupIcon,
  AdjustmentsHorizontalIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import { Crown } from 'lucide-react'
import { authService, User } from '@/lib/auth'
import { UserProfile } from '@/lib/connections'
import { profileService, LONDON_AREAS, ALL_INTERESTS } from '@/lib/profile'
// ProfileCard removed during cleanup
import { toast } from 'react-hot-toast'
import Footer from '@/components/Footer'

interface ProfileFilters {
  ageRange: { min: number; max: number }
  location: string[]
  interests: string[]
  membershipTier?: 'free' | 'core' | 'premium'
  lookingFor?: string
  onlineOnly: boolean
}

function ProfilesPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [profiles, setProfiles] = useState<UserProfile[]>([])
  const [filteredProfiles, setFilteredProfiles] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'recommended' | 'browse' | 'search'>('recommended')
  
  const [filters, setFilters] = useState<ProfileFilters>({
    ageRange: { min: 13, max: 80 },
    location: [],
    interests: [],
    onlineOnly: false
  })

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [profiles, searchQuery, filters, viewMode])

  const loadData = async () => {
    setLoading(true)
    
    try {
      const user = authService.getCurrentUser()
      if (!user) {
        router.push('/login')
        return
  }
      
      setCurrentUser(user)

      // Load profiles based on view mode
      let profileData: UserProfile[] = []
      
      if (viewMode === 'recommended') {
        profileData = await profileService.getRecommendedProfiles(user.id, 20)
      } else {
        profileData = await profileService.searchProfiles(searchQuery, {
          ageRange: filters.ageRange,
          location: filters.location,
          interests: filters.interests,
          membershipTier: filters.membershipTier
        })
      }

      setProfiles(profileData)
    } catch (error) {
      console.error('Error loading profiles:', error)
      toast.error('Failed to load profiles')
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...profiles]

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(profile =>
        profile.name.toLowerCase().includes(query) ||
        profile.bio.toLowerCase().includes(query) ||
        profile.location.toLowerCase().includes(query) ||
        profile.interests.some(interest => interest.toLowerCase().includes(query))
      )
    }

    // Apply age filter
    filtered = filtered.filter(profile =>
      profile.age >= filters.ageRange.min && profile.age <= filters.ageRange.max
    )

    // Apply location filter
    if (filters.location.length > 0) {
      filtered = filtered.filter(profile =>
        filters.location.some(loc => profile.location.includes(loc))
      )
    }

    // Apply interests filter
    if (filters.interests.length > 0) {
      filtered = filtered.filter(profile =>
        profile.interests.some(interest =>
          filters.interests.some(filterInterest =>
            interest.toLowerCase().includes(filterInterest.toLowerCase())
          )
        )
      )
    }

    // Apply membership tier filter
    if (filters.membershipTier) {
      const tierLevels = { free: 0, core: 1, premium: 2 }
      const minLevel = tierLevels[filters.membershipTier]
      filtered = filtered.filter(profile => 
        tierLevels[profile.membershipTier] >= minLevel
      )
    }

    // Apply online filter
    if (filters.onlineOnly) {
      filtered = filtered.filter(profile => profile.isOnline)
    }

    setFilteredProfiles(filtered)
  }

  const handleFilterChange = (key: keyof ProfileFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const clearFilters = () => {
    setFilters({
      ageRange: { min: 25, max: 55 },
      location: [],
      interests: [],
      onlineOnly: false
    })
    setSearchQuery('')
  }

  const handleProfileClick = (profileId: string) => {
    router.push(`/profile/${profileId}`)
  }

  const activeFiltersCount = 
    (filters.location.length > 0 ? 1 : 0) +
    (filters.interests.length > 0 ? 1 : 0) +
    (filters.membershipTier ? 1 : 0) +
    (filters.onlineOnly ? 1 : 0) +
    (filters.ageRange.min !== 25 || filters.ageRange.max !== 55 ? 1 : 0)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container-width py-8">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF6B6B]"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-20 container-width py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover Members</h1>
          <p className="text-gray-600">Connect with like-minded women in your community. After meeting members at events or in groups, you can leave reviews to help improve future experiences - just like Google My Business!</p>
        </div>

        {/* View Mode Tabs */}
        <div className="flex items-center gap-4 mb-6 border-b border-gray-200">
          <button
            onClick={() => setViewMode('recommended')}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              viewMode === 'recommended'
                ? 'border-[#FF6B6B] text-[#FF6B6B]'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <SparklesIcon className="w-4 h-4" />
              <span>Recommended</span>
            </div>
          </button>
          <button
            onClick={() => setViewMode('browse')}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              viewMode === 'browse'
                ? 'border-[#FF6B6B] text-[#FF6B6B]'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <UserGroupIcon className="w-4 h-4" />
              <span>Browse All</span>
            </div>
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search profiles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent"
              />
            </div>
            
            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 border rounded-lg transition-colors ${
                showFilters || activeFiltersCount > 0
                  ? 'bg-[#FF6B6B] text-white border-[#FF6B6B]'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <FunnelIcon className="w-5 h-5" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="bg-white text-[#FF6B6B] text-xs px-2 py-1 rounded-full font-medium">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Age Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-3">Age Range</label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="13"
                        max="80"
                        value={filters.ageRange.min}
                        onChange={(e) => handleFilterChange('ageRange', { 
                          ...filters.ageRange, 
                          min: parseInt(e.target.value) 
                        })}
                        className="flex-1"
                      />
                      <span className="text-sm text-gray-600 w-8">{filters.ageRange.min}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="13"
                        max="80"
                        value={filters.ageRange.max}
                        onChange={(e) => handleFilterChange('ageRange', { 
                          ...filters.ageRange, 
                          max: parseInt(e.target.value) 
                        })}
                        className="flex-1"
                      />
                      <span className="text-sm text-gray-600 w-8">{filters.ageRange.max}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {filters.ageRange.min} - {filters.ageRange.max} years
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-3">Location</label>
                  <div className="max-h-32 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-2">
                      {LONDON_AREAS.slice(0, 8).map((area) => (
                        <label key={area} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filters.location.includes(area)}
                            onChange={(e) => {
                              const newLocations = e.target.checked
                                ? [...filters.location, area]
                                : filters.location.filter(l => l !== area)
                              handleFilterChange('location', newLocations)
                            }}
                            className="rounded text-[#FF6B6B] focus:ring-[#FF6B6B]"
                          />
                          <span className="ml-2 text-sm text-gray-700 truncate">{area}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Interests */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-3">Interests</label>
                  <div className="max-h-32 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-2">
                      {ALL_INTERESTS.slice(0, 8).map((interest) => (
                        <label key={interest} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filters.interests.includes(interest)}
                            onChange={(e) => {
                              const newInterests = e.target.checked
                                ? [...filters.interests, interest]
                                : filters.interests.filter(i => i !== interest)
                              handleFilterChange('interests', newInterests)
                            }}
                            className="rounded text-[#FF6B6B] focus:ring-[#FF6B6B]"
                          />
                          <span className="ml-2 text-sm text-gray-700 truncate">{interest}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Membership Tier */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-3">Membership</label>
                  <select
                    value={filters.membershipTier || ''}
                    onChange={(e) => handleFilterChange('membershipTier', e.target.value || undefined)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent"
                  >
                    <option value="">All Members</option>
                    <option value="free">Free & Above</option>
                    <option value="core">Core & Above</option>
                    <option value="premium">Premium Only</option>
                  </select>
                </div>

                {/* Additional Options */}
                <div className="md:col-span-2 lg:col-span-1">
                  <label className="block text-sm font-medium text-gray-900 mb-3">Options</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.onlineOnly}
                        onChange={(e) => handleFilterChange('onlineOnly', e.target.checked)}
                        className="rounded text-[#FF6B6B] focus:ring-[#FF6B6B]"
                      />
                      <span className="ml-2 text-sm text-gray-700">Online now only</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Filter Actions */}
              <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-100">
                <button
                  onClick={loadData}
                  className="bg-[#FF6B6B] text-white px-6 py-2 rounded-lg hover:bg-[#FF5252] transition-colors"
                >
                  Apply Filters
                </button>
                <button
                  onClick={clearFilters}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Clear All
                </button>
                <div className="ml-auto text-sm text-gray-600">
                  {filteredProfiles.length} member{filteredProfiles.length !== 1 ? 's' : ''} found
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <div className="space-y-6">
          {/* Results Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {viewMode === 'recommended' ? 'Recommended for You' : 'Browse Members'}
              </h2>
              <p className="text-gray-600 mt-1">
                {filteredProfiles.length} member{filteredProfiles.length !== 1 ? 's' : ''} found
              </p>
            </div>
          </div>

          {/* Profile Grid */}
          {filteredProfiles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProfiles.map((profile, index) => (
                <motion.div
                  key={profile.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                       onClick={() => handleProfileClick(profile.id)}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{profile.firstName} {profile.lastName}</h3>
                    <p className="text-gray-600">{profile.area || 'London'}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <UserGroupIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No members found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search criteria or filters
              </p>
              <button
                onClick={clearFilters}
                className="bg-[#FF6B6B] text-white px-6 py-2 rounded-lg hover:bg-[#FF5252] transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default function ProfilesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400"></div>
      </div>
    }>
      <ProfilesPageContent />
    </Suspense>
  )
}