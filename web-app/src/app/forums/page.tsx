'use client'

import { ROUTES } from '@/config';
import React, { useState, useEffect } from 'react'
import { authService, User } from '@/lib/auth'
import { forumsService, ForumCategory, ForumTopic } from '@/lib/forums'
import { useRouter } from 'next/navigation'
import { 
  MessageSquare,
  Users,
  TrendingUp,
  Clock,
  Search,
  Filter,
  Plus,
  Pin,
  Lock,
  Crown,
  Star,
  Eye,
  ArrowUp,
  ArrowDown,
  MessageCircle,
  Tag,
  ChevronRight,
  Flame
} from 'lucide-react'
import Footer from '@/components/Footer'

export default function Forums() {
  const [user, setUser] = useState<User | null>(null)
  const [categories, setCategories] = useState<ForumCategory[]>([])
  const [topics, setTopics] = useState<ForumTopic[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'oldest'>('recent')
  const [showFilters, setShowFilters] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const currentUser = authService.getCurrentUser()
    if (!currentUser) {
      router.push(ROUTES.auth.login)
      return
    }
    
    loadData(currentUser)
  }, [router])

  const loadData = async (currentUser: User) => {
    try {
      const [categoriesData, topicsData] = await Promise.all([
        forumsService.getCategories(currentUser.membershipTier),
        forumsService.getTopics(
          selectedCategory || undefined,
          currentUser.id,
          {
            membershipTier: currentUser.membershipTier,
            sortBy,
            searchQuery: searchQuery || undefined
          }
        )
      ])
      
      setUser(currentUser)
      setCategories(categoriesData)
      setTopics(topicsData)
    } catch (error) {
      console.error('Error loading forum data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      loadData(user)
    }
  }, [selectedCategory, sortBy, searchQuery, user])

  const getMembershipBadge = (tier: string) => {
    const badges = {
      free: { icon: <Users className="w-3 h-3" />, color: 'bg-gray-100 text-gray-600', label: 'Free' },
      core: { icon: <Star className="w-3 h-3" />, color: 'bg-[#FF6B6B] text-white', label: 'Core' },
      premium: { icon: <Crown className="w-3 h-3" />, color: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white', label: 'Premium' }
    }
    return badges[tier as keyof typeof badges] || badges.free
  }

  const getRoleBadge = (role: string) => {
    if (role === 'admin') return <span className="px-1.5 py-0.5 bg-purple-100 text-purple-600 text-xs rounded font-medium">Admin</span>
    if (role === 'moderator') return <span className="px-1.5 py-0.5 bg-primary-100 text-primary-600 text-xs rounded font-medium">Mod</span>
    return null
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = (now.getTime() - date.getTime()) / 1000
    
    if (diffInSeconds < 60) return 'Just now'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`
    
    return date.toLocaleDateString()
  }

  const canAccessCategory = (category: ForumCategory) => {
    if (!user) return false
    const tierLevels = { free: 0, core: 1, premium: 2 }
    return tierLevels[user.membershipTier] >= tierLevels[category.membershipRequired]
  }

  const canAccessTopic = (topic: ForumTopic) => {
    if (!user) return false
    const tierLevels = { free: 0, core: 1, premium: 2 }
    return tierLevels[user.membershipTier] >= tierLevels[topic.membershipRequired]
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#FF6B6B]"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Community Forums</h1>
              <p className="text-gray-600 mt-1">Join the conversation and connect with like-minded women</p>
            </div>
            <button
              onClick={() => router.push('/forums/create-topic')}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>New Topic</span>
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search topics, posts, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent"
              >
                <option value="recent">Recent</option>
                <option value="popular">Popular</option>
                <option value="oldest">Oldest</option>
              </select>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
              
              {/* All Topics */}
              <button
                onClick={() => setSelectedCategory(null)}
                className={`w-full flex items-center justify-between p-3 rounded-lg mb-2 transition-colors ${
                  selectedCategory === null
                    ? 'bg-[#FF6B6B] text-white'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-5 h-5" />
                  <span>All Topics</span>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-white/20">
                  {topics.length}
                </span>
              </button>

              {/* Category List */}
              <div className="space-y-1">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => canAccessCategory(category) && setSelectedCategory(category.id)}
                    disabled={!canAccessCategory(category)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-[#FF6B6B] text-white'
                        : canAccessCategory(category)
                          ? 'hover:bg-gray-50 text-gray-700'
                          : 'opacity-50 cursor-not-allowed text-gray-400'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{category.icon}</span>
                      <div className="text-left">
                        <div className="font-medium">{category.name}</div>
                        {!canAccessCategory(category) && (
                          <div className="text-xs opacity-75">
                            {category.membershipRequired === 'premium' ? 'Premium only' : 'Core+ only'}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-xs">
                      <div>{category.topics}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content - Topics */}
          <div className="lg:col-span-3">
            {selectedCategory && (
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                {(() => {
                  const category = categories.find(c => c.id === selectedCategory)
                  if (!category) return null
                  
                  return (
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg ${category.color}`}>
                        <span className="text-2xl">{category.icon}</span>
                      </div>
                      <div className="flex-1">
                        <h2 className="text-xl font-semibold text-gray-900">{category.name}</h2>
                        <p className="text-gray-600 mt-1">{category.description}</p>
                        <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                          <span>{category.topics} topics</span>
                          <span>{category.posts} posts</span>
                          <span>Last activity {formatTimeAgo(category.lastActivity)}</span>
                        </div>
                      </div>
                    </div>
                  )
                })()}
              </div>
            )}

            {/* Topics List */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">
                    {selectedCategory ? 'Category Topics' : 'All Topics'} ({topics.length})
                  </h3>
                  <div className="text-sm text-gray-500">
                    Sorted by {sortBy}
                  </div>
                </div>
              </div>

              {topics.length === 0 ? (
                <div className="p-12 text-center">
                  <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No topics found</h3>
                  <p className="text-gray-600 mb-6">
                    {searchQuery 
                      ? 'Try adjusting your search criteria'
                      : 'Be the first to start a conversation in this category!'
                    }
                  </p>
                  <button
                    onClick={() => router.push('/forums/create-topic')}
                    className="btn-primary"
                  >
                    Create First Topic
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {topics.map(topic => (
                    <div key={topic.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          {/* Topic Header */}
                          <div className="flex items-center space-x-2 mb-2">
                            {topic.isPinned && (
                              <Pin className="w-4 h-4 text-green-600" />
                            )}
                            {topic.isLocked && (
                              <Lock className="w-4 h-4 text-gray-400" />
                            )}
                            {topic.isAnnouncement && (
                              <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded font-medium">
                                Announcement
                              </span>
                            )}
                            {!canAccessTopic(topic) && (
                              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded font-medium flex items-center space-x-1">
                                <Crown className="w-3 h-3" />
                                <span>{topic.membershipRequired === 'premium' ? 'Premium' : 'Core'}</span>
                              </span>
                            )}
                          </div>

                          {/* Topic Title */}
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-[#FF6B6B] cursor-pointer">
                            <button
                              onClick={() => canAccessTopic(topic) && router.push(`/forums/topic/${topic.id}`)}
                              disabled={!canAccessTopic(topic)}
                              className={`text-left ${!canAccessTopic(topic) ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                              {topic.title}
                            </button>
                          </h3>

                          {/* Topic Description */}
                          <p className="text-gray-600 mb-3 line-clamp-2">
                            {topic.description}
                          </p>

                          {/* Author and Meta Info */}
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                            <div className="flex items-center space-x-2">
                              <div className="w-6 h-6 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] rounded-full flex items-center justify-center text-white text-xs font-bold">
                                {topic.author.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <span>{topic.author.name}</span>
                              {getRoleBadge(topic.author.role)}
                              <div className={`flex items-center space-x-1 px-1.5 py-0.5 rounded text-xs ${getMembershipBadge(topic.author.membershipTier).color}`}>
                                {getMembershipBadge(topic.author.membershipTier).icon}
                                <span>{getMembershipBadge(topic.author.membershipTier).label}</span>
                              </div>
                            </div>
                            <span>•</span>
                            <span>{formatTimeAgo(topic.createdAt)}</span>
                          </div>

                          {/* Tags */}
                          {topic.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-3">
                              {topic.tags.slice(0, 4).map(tag => (
                                <span
                                  key={tag}
                                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-gray-200 cursor-pointer flex items-center space-x-1"
                                >
                                  <Tag className="w-3 h-3" />
                                  <span>{tag}</span>
                                </span>
                              ))}
                              {topic.tags.length > 4 && (
                                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                  +{topic.tags.length - 4} more
                                </span>
                              )}
                            </div>
                          )}

                          {/* Last Reply */}
                          {topic.lastReply && (
                            <div className="bg-gray-50 rounded-lg p-3">
                              <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center space-x-2">
                                  <MessageCircle className="w-4 h-4 text-gray-400" />
                                  <span className="text-gray-600">Last reply by</span>
                                  <span className="font-medium text-gray-900">{topic.lastReply.authorName}</span>
                                </div>
                                <span className="text-gray-500">{formatTimeAgo(topic.lastReply.createdAt)}</span>
                              </div>
                              <p className="text-gray-600 text-sm mt-1 line-clamp-1">
                                {topic.lastReply.preview}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Topic Stats */}
                        <div className="flex flex-col items-center space-y-4 ml-6 text-sm">
                          <div className="flex items-center space-x-4 text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>{topic.views}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MessageCircle className="w-4 h-4" />
                              <span>{topic.replies}</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <button className="flex items-center space-x-1 px-2 py-1 rounded hover:bg-green-50 text-green-600">
                              <ArrowUp className="w-4 h-4" />
                              <span className="text-sm">{topic.upvotes}</span>
                            </button>
                            <button className="flex items-center space-x-1 px-2 py-1 rounded hover:bg-red-50 text-red-600">
                              <ArrowDown className="w-4 h-4" />
                              <span className="text-sm">{topic.downvotes}</span>
                            </button>
                          </div>

                          <ChevronRight 
                            className={`w-5 h-5 ${canAccessTopic(topic) ? 'text-gray-400' : 'text-gray-300'}`}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}