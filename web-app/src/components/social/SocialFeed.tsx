'use client'

import React, { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { useSubscription } from '@/context/SubscriptionContext'
import PostCreator from './PostCreator'
import PostCard from './PostCard'
import FeedFilters from './FeedFilters'
import TrendingSection from './TrendingSection'
import PeopleYouMayKnow from './PeopleYouMayKnow'
import { 
  Users, 
  Heart, 
  MessageCircle, 
  Share, 
  TrendingUp,
  Filter,
  Sparkles,
  Globe,
  UserPlus
} from 'lucide-react'

export interface SocialPost {
  id: string
  user: {
    id: string
    name: string
    avatar: string
    verified: boolean
    membershipTier: 'free' | 'community' | 'cultural_ambassador'
  }
  content: string
  contentType: 'text' | 'image' | 'video' | 'link' | 'event_share' | 'service_promotion'
  mediaUrls?: string[]
  linkPreview?: {
    title: string
    description: string
    image: string
    url: string
  }
  culturalTags: string[]
  locationTags: string[]
  serviceTags: string[]
  language: 'en' | 'pt' | 'pt-pt' | 'pt-br'
  engagement: {
    likes: number
    comments: number
    shares: number
    saves: number
  }
  userInteractions: {
    liked: boolean
    saved: boolean
    shared: boolean
  }
  createdAt: string
  isPromoted: boolean
  culturalRelevanceScore: number
}

interface SocialFeedProps {
  className?: string
  initialFilter?: 'all' | 'following' | 'cultural' | 'services' | 'events'
}

// Mock data for development - will be replaced with real Supabase data
const MOCK_POSTS: SocialPost[] = [
  {
    id: '1',
    user: {
      id: 'user1',
      name: 'Maria Santos',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      verified: true,
      membershipTier: 'cultural_ambassador'
    },
    content: 'Tonight\'s Fado performance at Canteen in Borough Market was absolutely magical! 🎵 The singer\'s voice carried so much saudade - it felt like being transported back to Alfama. Who else was there? #FadoNight #PortugueseCulture',
    contentType: 'text',
    culturalTags: ['fado', 'music', 'cultural_events', 'saudade'],
    locationTags: ['borough_market', 'london'],
    serviceTags: [],
    language: 'en',
    engagement: {
      likes: 24,
      comments: 8,
      shares: 3,
      saves: 12
    },
    userInteractions: {
      liked: false,
      saved: false,
      shared: false
    },
    createdAt: '2025-08-19T20:30:00Z',
    isPromoted: false,
    culturalRelevanceScore: 0.95
  },
  {
    id: '2',
    user: {
      id: 'user2',
      name: 'João Silva',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      verified: false,
      membershipTier: 'community'
    },
    content: 'Just discovered the most authentic pastéis de nata in Stockwell! The recipe is exactly like my grandmother\'s from Porto 🥧❤️ Anyone want to join me for coffee and pastéis this weekend?',
    contentType: 'text',
    culturalTags: ['food', 'pasteis_de_nata', 'authentic_portuguese', 'porto'],
    locationTags: ['stockwell', 'london'],
    serviceTags: [],
    language: 'en',
    engagement: {
      likes: 18,
      comments: 12,
      shares: 5,
      saves: 9
    },
    userInteractions: {
      liked: true,
      saved: true,
      shared: false
    },
    createdAt: '2025-08-19T16:15:00Z',
    isPromoted: false,
    culturalRelevanceScore: 0.90
  },
  {
    id: '3',
    user: {
      id: 'user3',
      name: 'LusoTown Transport',
      avatar: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=100&h=100&fit=crop',
      verified: true,
      membershipTier: 'cultural_ambassador'
    },
    content: '🚗 Professional Portuguese-speaking drivers available for weekend cultural tours! Visit the best Lusophone spots in London with someone who knows the community. Book your transport experience today.',
    contentType: 'service_promotion',
    culturalTags: ['transport', 'cultural_tours', 'portuguese_service'],
    locationTags: ['london'],
    serviceTags: ['transport', 'tours'],
    language: 'en',
    engagement: {
      likes: 15,
      comments: 6,
      shares: 8,
      saves: 22
    },
    userInteractions: {
      liked: false,
      saved: true,
      shared: false
    },
    createdAt: '2025-08-19T14:00:00Z',
    isPromoted: true,
    culturalRelevanceScore: 0.85
  }
]

export default function SocialFeed({ className = '', initialFilter = 'all' }: SocialFeedProps) {
  const { language, t } = useLanguage()
  const { membershipTier } = useSubscription()
  const [posts, setPosts] = useState<SocialPost[]>(MOCK_POSTS)
  const [activeFilter, setActiveFilter] = useState(initialFilter)
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [loading, setLoading] = useState(false)

  // Filter posts based on active filter
  const filteredPosts = posts.filter(post => {
    switch (activeFilter) {
      case 'following':
        // TODO: Implement following logic
        return true
      case 'cultural':
        return post.culturalTags.length > 0 && post.culturalRelevanceScore > 0.7
      case 'services':
        return post.serviceTags.length > 0 || post.contentType === 'service_promotion'
      case 'events':
        return post.contentType === 'event_share' || post.culturalTags.includes('events')
      default:
        return true
    }
  })

  // Handle post creation
  const handleCreatePost = async (postData: {
    content: string
    contentType: string
    mediaUrls?: string[]
    culturalTags: string[]
    locationTags: string[]
    serviceTags: string[]
  }) => {
    // TODO: Implement actual post creation with Supabase
    const newPost: SocialPost = {
      id: Date.now().toString(),
      user: {
        id: 'current_user',
        name: 'Current User',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        verified: false,
        membershipTier: membershipTier as any || 'free'
      },
      content: postData.content,
      contentType: postData.contentType as any,
      mediaUrls: postData.mediaUrls,
      culturalTags: postData.culturalTags,
      locationTags: postData.locationTags,
      serviceTags: postData.serviceTags,
      language: language as any,
      engagement: {
        likes: 0,
        comments: 0,
        shares: 0,
        saves: 0
      },
      userInteractions: {
        liked: false,
        saved: false,
        shared: false
      },
      createdAt: new Date().toISOString(),
      isPromoted: false,
      culturalRelevanceScore: postData.culturalTags.length > 0 ? 0.8 : 0.5
    }

    setPosts([newPost, ...posts])
    setShowCreatePost(false)
  }

  // Handle post interactions
  const handlePostInteraction = (postId: string, interactionType: 'like' | 'save' | 'share') => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const updatedPost = { ...post }
        
        switch (interactionType) {
          case 'like':
            updatedPost.userInteractions.liked = !post.userInteractions.liked
            updatedPost.engagement.likes += post.userInteractions.liked ? -1 : 1
            break
          case 'save':
            updatedPost.userInteractions.saved = !post.userInteractions.saved
            updatedPost.engagement.saves += post.userInteractions.saved ? -1 : 1
            break
          case 'share':
            updatedPost.engagement.shares += 1
            break
        }
        
        return updatedPost
      }
      return post
    }))
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Feed Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {t('social_feed.title') || 'Portuguese-speaking community Feed'}
              </h2>
              <p className="text-gray-600">
                {t('social_feed.subtitle') || 'Connect with Portuguese speakers in London'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowCreatePost(!showCreatePost)}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t('social_feed.create_post') || 'Create Post'}</span>
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 text-sm text-gray-600">
              <Users className="w-4 h-4" />
              <span>{t('social_feed.community_members') || 'Members'}</span>
            </div>
            <p className="text-lg font-semibold text-primary-600">2,347</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 text-sm text-gray-600">
              <MessageCircle className="w-4 h-4" />
              <span>{t('social_feed.daily_posts') || 'Daily Posts'}</span>
            </div>
            <p className="text-lg font-semibold text-secondary-600">127</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 text-sm text-gray-600">
              <TrendingUp className="w-4 h-4" />
              <span>{t('social_feed.trending') || 'Trending'}</span>
            </div>
            <p className="text-lg font-semibold text-accent-600">#Fado</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 text-sm text-gray-600">
              <Globe className="w-4 h-4" />
              <span>{t('social_feed.cities') || 'Cities'}</span>
            </div>
            <p className="text-lg font-semibold text-coral-600">15</p>
          </div>
        </div>
      </div>

      {/* Create Post Component */}
      {showCreatePost && (
        <PostCreator
          onSubmit={handleCreatePost}
          onCancel={() => setShowCreatePost(false)}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Feed */}
        <div className="lg:col-span-3 space-y-6">
          {/* Feed Filters */}
          <FeedFilters
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />

          {/* Posts */}
          <div className="space-y-4">
            {loading ? (
              // Loading skeleton
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="animate-pulse space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                        <div className="space-y-2 flex-1">
                          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                      </div>
                      <div className="flex space-x-4">
                        <div className="h-8 bg-gray-200 rounded w-16"></div>
                        <div className="h-8 bg-gray-200 rounded w-16"></div>
                        <div className="h-8 bg-gray-200 rounded w-16"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredPosts.length > 0 ? (
              filteredPosts.map(post => (
                <PostCard
                  key={post.id}
                  post={post}
                  onInteraction={handlePostInteraction}
                />
              ))
            ) : (
              // Empty state
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {t('social_feed.no_posts_title') || 'No posts yet'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {t('social_feed.no_posts_subtitle') || 'Be the first to share something with the Portuguese-speaking community!'}
                </p>
                <button
                  onClick={() => setShowCreatePost(true)}
                  className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                >
                  {t('social_feed.create_first_post') || 'Create First Post'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Trending Section */}
          <TrendingSection />

          {/* People You May Know */}
          <PeopleYouMayKnow />

          {/* Community Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t('social_feed.community_stats') || 'Community Stats'}
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">{t('social_feed.active_today') || 'Active Today'}</span>
                <span className="font-semibold text-primary-600">341</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">{t('social_feed.new_members') || 'New Members'}</span>
                <span className="font-semibold text-secondary-600">+23</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">{t('social_feed.events_this_week') || 'Events This Week'}</span>
                <span className="font-semibold text-accent-600">12</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t('social_feed.quick_actions') || 'Quick Actions'}
            </h3>
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <UserPlus className="w-5 h-5 text-primary-500" />
                <span className="text-gray-700">{t('social_feed.find_friends') || 'Find Friends'}</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <Heart className="w-5 h-5 text-secondary-500" />
                <span className="text-gray-700">{t('social_feed.join_events') || 'Join Events'}</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <Share className="w-5 h-5 text-accent-500" />
                <span className="text-gray-700">{t('social_feed.share_experience') || 'Share Experience'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}