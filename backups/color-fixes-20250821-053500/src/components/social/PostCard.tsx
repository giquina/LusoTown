'use client'

import React, { useState } from 'react'
import { SOCIAL_URLS } from '@/config'
import { useLanguage } from '@/context/LanguageContext'
import { SOCIAL_URLS } from '@/config'
import { SocialPost } from './SocialFeed'
import { SOCIAL_URLS } from '@/config'
import { 
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  MapPin,
  Clock,
  CheckCircle,
  Star,
  Crown,
  User,
  ExternalLink,
  Flag,
  Copy,
  Twitter,
  Facebook,
  Globe,
  Users,
  Lock
} from 'lucide-react'

interface PostCardProps {
  post: SocialPost
  onInteraction: (postId: string, interactionType: 'like' | 'save' | 'share') => void
  className?: string
}

export default function PostCard({ post, onInteraction, className = '' }: PostCardProps) {
  const { language, t } = useLanguage()
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [showMoreMenu, setShowMoreMenu] = useState(false)

  const getMembershipBadge = () => {
    switch (post.user.membershipTier) {
      case 'cultural_ambassador':
        return (
          <div className="flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-xs">
            <Crown className="w-3 h-3" />
            <span>{t('membership.cultural_ambassador') || 'Cultural Ambassador'}</span>
          </div>
        )
      case 'community':
        return (
          <div className="flex items-center space-x-1 px-2 py-1 bg-primary-500 text-white rounded-full text-xs">
            <Star className="w-3 h-3" />
            <span>{t('membership.community') || 'Community Member'}</span>
          </div>
        )
      default:
        return (
          <div className="flex items-center space-x-1 px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
            <User className="w-3 h-3" />
            <span>{t('membership.free') || 'Free Member'}</span>
          </div>
        )
    }
  }

  const getVisibilityIcon = () => {
    switch (post.contentType) {
      case 'service_promotion':
        return <Globe className="w-4 h-4 text-accent-500" />
      default:
        return <Users className="w-4 h-4 text-gray-400" />
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const now = new Date()
    const postDate = new Date(dateString)
    const diffInMinutes = Math.floor((now.getTime() - postDate.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return t('time.just_now') || 'just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`
    return `${Math.floor(diffInMinutes / 1440)}d`
  }

  const handleShare = (platform?: 'twitter' | 'facebook' | 'copy') => {
    if (platform) {
      const postUrl = `${window.location.origin}/posts/${post.id}`
      const text = `${post.content.substring(0, 200)}${post.content.length > 200 ? '...' : ''}`
      
      switch (platform) {
        case 'twitter':
          window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(postUrl)}`, '_blank')
          break
        case 'facebook':
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`, '_blank')
          break
        case 'copy':
          navigator.clipboard.writeText(postUrl)
          break
      }
    }
    
    onInteraction(post.id, 'share')
    setShowShareMenu(false)
  }

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow ${className}`}>
      <div className="p-6">
        {/* Post Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-3">
            {/* User Avatar */}
            <div className="relative">
              <img
                src={post.user.avatar}
                alt={post.user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              {post.user.verified && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="font-semibold text-gray-900">{post.user.name}</h4>
                {getMembershipBadge()}
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>{formatTimeAgo(post.createdAt)}</span>
                <span>•</span>
                {getVisibilityIcon()}
                {post.locationTags.length > 0 && (
                  <>
                    <span>•</span>
                    <MapPin className="w-3 h-3" />
                    <span>{post.locationTags[0]}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* More Menu */}
          <div className="relative">
            <button
              onClick={() => setShowMoreMenu(!showMoreMenu)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <MoreHorizontal className="w-4 h-4 text-gray-400" />
            </button>

            {showMoreMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                  <Flag className="w-4 h-4" />
                  <span>{t('post.report') || 'Report Post'}</span>
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                  <ExternalLink className="w-4 h-4" />
                  <span>{t('post.view_profile') || 'View Profile'}</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Promoted Badge */}
        {post.isPromoted && (
          <div className="mb-4 p-3 bg-gradient-to-r from-accent-50 to-accent-100 rounded-lg border border-accent-200">
            <div className="flex items-center space-x-2 text-accent-700">
              <Star className="w-4 h-4" />
              <span className="text-sm font-medium">
                {t('post.promoted') || 'Promoted Portuguese Service'}
              </span>
            </div>
          </div>
        )}

        {/* Post Content */}
        <div className="mb-4">
          <p className="text-gray-900 leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>

          {/* Link Preview (if applicable) */}
          {post.linkPreview && (
            <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden">
              <img
                src={post.linkPreview.image}
                alt={post.linkPreview.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h5 className="font-medium text-gray-900 mb-1">{post.linkPreview.title}</h5>
                <p className="text-sm text-gray-600 mb-2">{post.linkPreview.description}</p>
                <a
                  href={post.linkPreview.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 text-sm flex items-center space-x-1"
                >
                  <span>{post.linkPreview.url}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}

          {/* Media Gallery (if applicable) */}
          {post.mediaUrls && post.mediaUrls.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-2">
              {post.mediaUrls.slice(0, 4).map((url, index) => (
                <div key={index} className="relative aspect-square">
                  <img
                    src={url}
                    alt=""
                    className="w-full h-full object-cover rounded-lg"
                  />
                  {index === 3 && post.mediaUrls!.length > 4 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                      <span className="text-white font-medium">+{post.mediaUrls!.length - 3}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="mb-4 space-y-2">
          {/* Cultural Tags */}
          {post.culturalTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.culturalTags.map(tag => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Service Tags */}
          {post.serviceTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.serviceTags.map(tag => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-accent-100 text-accent-700 rounded-full text-xs font-medium"
                >
                  🚗 {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Engagement Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            {post.engagement.likes > 0 && (
              <span>{post.engagement.likes} {t('post.likes') || 'likes'}</span>
            )}
            {post.engagement.comments > 0 && (
              <span>{post.engagement.comments} {t('post.comments') || 'comments'}</span>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {post.engagement.shares > 0 && (
              <span>{post.engagement.shares} {t('post.shares') || 'shares'}</span>
            )}
            {post.engagement.saves > 0 && (
              <span>{post.engagement.saves} {t('post.saves') || 'saves'}</span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-1">
            {/* Like Button */}
            <button
              onClick={() => onInteraction(post.id, 'like')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                post.userInteractions.liked
                  ? 'bg-red-50 text-red-600 hover:bg-red-100'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Heart className={`w-4 h-4 ${post.userInteractions.liked ? 'fill-current' : ''}`} />
              <span className="text-sm font-medium">
                {t('post.like') || 'Like'}
              </span>
            </button>

            {/* Comment Button */}
            <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm font-medium">
                {t('post.comment') || 'Comment'}
              </span>
            </button>

            {/* Share Button */}
            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {t('post.share') || 'Share'}
                </span>
              </button>

              {showShareMenu && (
                <div className="absolute left-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                  <button
                    onClick={() => handleShare('twitter')}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <Twitter className="w-4 h-4" />
                    <span>{t('post.share_twitter') || 'Share on Twitter'}</span>
                  </button>
                  <button
                    onClick={() => handleShare('facebook')}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <Facebook className="w-4 h-4" />
                    <span>{t('post.share_facebook') || 'Share on Facebook'}</span>
                  </button>
                  <button
                    onClick={() => handleShare('copy')}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <Copy className="w-4 h-4" />
                    <span>{t('post.copy_link') || 'Copy Link'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={() => onInteraction(post.id, 'save')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              post.userInteractions.saved
                ? 'bg-amber-50 text-amber-600 hover:bg-amber-100'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${post.userInteractions.saved ? 'fill-current' : ''}`} />
            <span className="text-sm font-medium">
              {post.userInteractions.saved 
                ? (t('post.saved') || 'Saved') 
                : (t('post.save') || 'Save')
              }
            </span>
          </button>
        </div>

        {/* Portuguese Community Relevance Score (for development) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>Cultural Relevance: {Math.round(post.culturalRelevanceScore * 100)}%</span>
              <span>Language: {post.language}</span>
            </div>
          </div>
        )}
      </div>

      {/* Close dropdowns when clicking outside */}
      {(showShareMenu || showMoreMenu) && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => {
            setShowShareMenu(false)
            setShowMoreMenu(false)
          }}
        />
      )}
    </div>
  )
}