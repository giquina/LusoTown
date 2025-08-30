'use client'

import { useState } from 'react'
import Image from 'next/image'
import FavoriteButton from '@/components/FavoriteButton'
import ReactionButton from '@/components/ReactionButton'
import Hashtag from '@/components/Hashtag'
import { useLanguage } from '@/context/LanguageContext'
import { useEnhancedKeyboardNavigation } from '@/hooks/useEnhancedKeyboardNavigation'
import { 
  ChatBubbleLeftRightIcon, 
  ArrowsRightLeftIcon,
  EllipsisHorizontalIcon,
  CalendarDaysIcon,
  MapPinIcon,
  HeartIcon
} from '@heroicons/react/24/outline'

interface FeedPostProps {
  id: string
  authorName: string
  authorAvatar: string
  authorRole?: string
  content: string
  imageUrl?: string
  createdAt: string
  likes: number
  comments: number
  shares: number
  hashtags?: string[]
  linkedEvent?: {
    id: string
    title: string
    date: string
    location: string
  }
  linkedBusiness?: {
    id: string
    name: string
    category: string
  }
  userReactions?: {
    liked: boolean
    hearts: number
    thumbsUp: number
    laugh: number
    wow: number
    sad: number
    angry: number
  }
  culturalContext?: 'portugal' | 'brazil' | 'cape-verde' | 'angola' | 'mozambique' | 'general'
}

export default function EnhancedFeedPost({
  id,
  authorName,
  authorAvatar,
  authorRole,
  content,
  imageUrl,
  createdAt,
  likes,
  comments,
  shares,
  hashtags = [],
  linkedEvent,
  linkedBusiness,
  userReactions = {
    liked: false,
    hearts: 0,
    thumbsUp: 0,
    laugh: 0,
    wow: 0,
    sad: 0,
    angry: 0
  },
  culturalContext = 'general'
}: FeedPostProps) {
  const { t } = useLanguage()
  
  const [reactions, setReactions] = useState({
    hearts: userReactions.hearts,
    thumbsUp: userReactions.thumbsUp,
    laugh: userReactions.laugh,
    wow: userReactions.wow,
    sad: userReactions.sad,
    angry: userReactions.angry
  })

  const [liked, setLiked] = useState(userReactions.liked)
  const [showMenu, setShowMenu] = useState(false)

  const handleReaction = (reactionType: keyof typeof reactions) => {
    setReactions(prev => ({
      ...prev,
      [reactionType]: prev[reactionType] + 1
    }))
  }

  const handleLike = () => {
    setLiked(!liked)
  }

  const handleComment = () => {
    // Focus comment input or show comment modal
    console.log('Comment action triggered')
  }

  const handleShare = () => {
    // Open share modal or native share
    console.log('Share action triggered')
  }

  const handleMenuToggle = () => {
    setShowMenu(!showMenu)
  }

  const handleEventClick = () => {
    if (linkedEvent) {
      // Navigate to event details
      console.log('Navigate to event:', linkedEvent.id)
    }
  }

  const handleBusinessClick = () => {
    if (linkedBusiness) {
      // Navigate to business details
      console.log('Navigate to business:', linkedBusiness.id)
    }
  }

  // Keyboard navigation for main action buttons
  const likeButtonProps = useEnhancedKeyboardNavigation({
    onClick: handleLike,
    culturalContext,
    ariaLabel: `${liked ? t('post.unlike') : t('post.like')} ${authorName}`,
    announceActions: true
  })

  const commentButtonProps = useEnhancedKeyboardNavigation({
    onClick: handleComment,
    culturalContext,
    ariaLabel: t('post.comment'),
    announceActions: true
  })

  const shareButtonProps = useEnhancedKeyboardNavigation({
    onClick: handleShare,
    culturalContext,
    ariaLabel: t('post.share'),
    announceActions: true
  })

  const menuButtonProps = useEnhancedKeyboardNavigation({
    onClick: handleMenuToggle,
    onEscape: () => setShowMenu(false),
    culturalContext,
    ariaLabel: t('post.options'),
    announceActions: true
  })

  const eventLinkProps = linkedEvent ? useEnhancedKeyboardNavigation({
    onClick: handleEventClick,
    culturalContext,
    ariaLabel: `${t('events.view_details')}: ${linkedEvent.title}`,
    announceActions: true
  }) : {}

  const businessLinkProps = linkedBusiness ? useEnhancedKeyboardNavigation({
    onClick: handleBusinessClick,
    culturalContext,
    ariaLabel: `${t('businesses.view_details')}: ${linkedBusiness.name}`,
    announceActions: true
  }) : {}

  return (
    <article 
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-opacity-50"
      role="article"
      aria-label={`${t('post.by')} ${authorName}`}
    >
      {/* Post Header */}
      <header className="p-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <Image 
                src={authorAvatar} 
                alt={authorName}
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">{authorName}</h4>
              {authorRole && (
                <p className="text-sm text-gray-500">{authorRole}</p>
              )}
              <time className="text-xs text-gray-400" dateTime={createdAt}>
                {createdAt}
              </time>
            </div>
          </div>
          
          {/* Header Actions */}
          <div className="flex items-center gap-2">
            {linkedEvent && (
              <span className="bg-primary-50 text-primary-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <CalendarDaysIcon className="w-3 h-3" aria-hidden="true" />
                {t('post.event_tag')}
              </span>
            )}
            
            {linkedBusiness && (
              <span className="bg-secondary-50 text-secondary-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <MapPinIcon className="w-3 h-3" aria-hidden="true" />
                {t('post.business_tag')}
              </span>
            )}
            
            <FavoriteButton
              itemId={id}
              itemType="feed"
              itemTitle={`${content.substring(0, 50)}...`}
              itemDescription={content}
              itemImageUrl={imageUrl}
              size="sm"
            />
            
            <button 
              {...menuButtonProps}
              className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors min-h-[44px] min-w-[44px]"
              aria-expanded={showMenu}
              aria-haspopup="menu"
            >
              <EllipsisHorizontalIcon className="w-5 h-5" aria-hidden="true" />
            </button>
            
            {/* Dropdown Menu */}
            {showMenu && (
              <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-10">
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                  {t('post.report')}
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                  {t('post.hide')}
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Post Content */}
        <div className="prose prose-sm max-w-none">
          <p className="text-gray-700 mb-4 whitespace-pre-line">{content}</p>
        </div>
        
        {/* Post Image */}
        {imageUrl && (
          <figure className="mb-4 rounded-lg overflow-hidden">
            <Image 
              src={imageUrl} 
              alt={t('post.image_alt')}
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          </figure>
        )}
        
        {/* Linked Event */}
        {linkedEvent && (
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-4 mb-4 border border-primary-100">
            <div className="flex items-center gap-2 mb-2">
              <CalendarDaysIcon className="w-4 h-4 text-primary-600" aria-hidden="true" />
              <h5 className="font-semibold text-gray-900">{linkedEvent.title}</h5>
            </div>
            <div className="text-sm text-gray-600">
              <p>{linkedEvent.date}</p>
              <p>{linkedEvent.location}</p>
            </div>
            <button 
              {...eventLinkProps}
              className="mt-2 text-primary-600 text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-primary-500 rounded p-1"
            >
              {t('events.view_details')}
            </button>
          </div>
        )}
        
        {/* Linked Business */}
        {linkedBusiness && (
          <div className="bg-gradient-to-r from-secondary-50 to-primary-50 rounded-lg p-4 mb-4 border border-secondary-100">
            <div className="flex items-center gap-2 mb-2">
              <MapPinIcon className="w-4 h-4 text-secondary-600" aria-hidden="true" />
              <h5 className="font-semibold text-gray-900">{linkedBusiness.name}</h5>
            </div>
            <p className="text-sm text-gray-600">{linkedBusiness.category}</p>
            <button 
              {...businessLinkProps}
              className="mt-2 text-secondary-600 text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-secondary-500 rounded p-1"
            >
              {t('businesses.view_details')}
            </button>
          </div>
        )}
        
        {/* Hashtags */}
        {hashtags.length > 0 && (
          <nav aria-label={t('post.hashtags')}>
            <div className="flex flex-wrap gap-2 mb-4">
              {hashtags.map((tag, index) => (
                <Hashtag key={index} tag={tag} />
              ))}
            </div>
          </nav>
        )}
      </header>
      
      {/* Post Reactions */}
      <section className="px-6 py-4 bg-gray-50 border-t border-gray-100" aria-label={t('post.reactions')}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1" role="group" aria-label={t('post.reaction_buttons')}>
            <ReactionButton 
              emoji="❤️" 
              count={reactions.hearts} 
              isActive={false}
              onClick={() => handleReaction('hearts')}
              tooltip={t('post.reaction.love')}
            />
            <ReactionButton 
              emoji="👍" 
              count={reactions.thumbsUp} 
              isActive={false}
              onClick={() => handleReaction('thumbsUp')}
              tooltip={t('post.reaction.like')}
            />
            <ReactionButton 
              emoji="😂" 
              count={reactions.laugh} 
              isActive={false}
              onClick={() => handleReaction('laugh')}
              tooltip={t('post.reaction.haha')}
            />
            <ReactionButton 
              emoji="😮" 
              count={reactions.wow} 
              isActive={false}
              onClick={() => handleReaction('wow')}
              tooltip={t('post.reaction.wow')}
            />
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-500" aria-label={t('post.engagement_stats')}>
            <span>{likes + (liked ? 1 : 0) + reactions.hearts} {t('post.likes')}</span>
            <span>{comments} {t('post.comments')}</span>
            <span>{shares} {t('post.shares')}</span>
          </div>
        </div>
      </section>
      
      {/* Main Action Buttons */}
      <footer className="px-6 py-3 border-t border-gray-100">
        <nav className="flex items-center justify-between" role="group" aria-label={t('post.actions')}>
          <button 
            {...likeButtonProps}
            className={`flex items-center gap-2 text-gray-600 hover:text-red-500 focus:text-red-500 transition-colors p-2 rounded-lg hover:bg-gray-50 focus:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[44px] min-w-[44px] ${
              liked ? 'text-red-500' : ''
            }`}
          >
            <HeartIcon className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} aria-hidden="true" />
            <span className="text-sm font-medium">{t('post.like')}</span>
          </button>
          
          <button 
            {...commentButtonProps}
            className="flex items-center gap-2 text-gray-600 hover:text-primary-500 focus:text-primary-500 transition-colors p-2 rounded-lg hover:bg-gray-50 focus:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[44px] min-w-[44px]"
          >
            <ChatBubbleLeftRightIcon className="w-5 h-5" aria-hidden="true" />
            <span className="text-sm font-medium">{t('post.comment')}</span>
          </button>
          
          <button 
            {...shareButtonProps}
            className="flex items-center gap-2 text-gray-600 hover:text-secondary-500 focus:text-secondary-500 transition-colors p-2 rounded-lg hover:bg-gray-50 focus:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-secondary-500 min-h-[44px] min-w-[44px]"
          >
            <ArrowsRightLeftIcon className="w-5 h-5" aria-hidden="true" />
            <span className="text-sm font-medium">{t('post.share')}</span>
          </button>
        </nav>
      </footer>
    </article>
  )
}