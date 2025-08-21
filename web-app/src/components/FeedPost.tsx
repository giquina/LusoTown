'use client'

import { useState } from 'react'
import Image from 'next/image'
import FavoriteButton from '@/components/FavoriteButton'
import ReactionButton from '@/components/ReactionButton'
import Hashtag from '@/components/Hashtag'
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
}

export default function FeedPost({
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
  }
}: FeedPostProps) {
  const [reactions, setReactions] = useState({
    hearts: userReactions.hearts,
    thumbsUp: userReactions.thumbsUp,
    laugh: userReactions.laugh,
    wow: userReactions.wow,
    sad: userReactions.sad,
    angry: userReactions.angry
  })

  const [liked, setLiked] = useState(userReactions.liked)

  const handleReaction = (reactionType: keyof typeof reactions) => {
    setReactions(prev => ({
      ...prev,
      [reactionType]: prev[reactionType] + 1
    }))
  }

  const handleLike = () => {
    setLiked(!liked)
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Post Header */}
      <div className="p-6 pb-4">
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
              <p className="text-xs text-gray-400">{createdAt}</p>
            </div>
          </div>
          
          {/* Favorite Button */}
          <div className="flex items-center gap-2">
            {linkedEvent && (
              <div className="bg-primary-50 text-primary-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <CalendarDaysIcon className="w-3 h-3" />
                Event
              </div>
            )}
            
            {linkedBusiness && (
              <div className="bg-secondary-50 text-secondary-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <MapPinIcon className="w-3 h-3" />
                Business
              </div>
            )}
            
            <FavoriteButton
              itemId={id}
              itemType="feed"
              itemTitle={content.substring(0, 50) + '...'}
              itemDescription={content}
              itemImageUrl={imageUrl}
              size="sm"
            />
            
            <button className="text-gray-400 hover:text-secondary-600">
              <EllipsisHorizontalIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Post Content */}
        <p className="text-secondary-700 mb-4 whitespace-pre-line">{content}</p>
        
        {/* Post Image */}
        {imageUrl && (
          <div className="mb-4 rounded-lg overflow-hidden">
            <Image 
              src={imageUrl} 
              alt="Post image" 
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
        )}
        
        {/* Linked Event */}
        {linkedEvent && (
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-4 mb-4 border border-primary-100">
            <div className="flex items-center gap-2 mb-2">
              <CalendarDaysIcon className="w-4 h-4 text-primary-600" />
              <h5 className="font-semibold text-gray-900">{linkedEvent.title}</h5>
            </div>
            <div className="text-sm text-secondary-600">
              <p>{linkedEvent.date}</p>
              <p>{linkedEvent.location}</p>
            </div>
            <button className="mt-2 text-primary-600 text-sm font-medium hover:underline">
              View Event Details
            </button>
          </div>
        )}
        
        {/* Linked Business */}
        {linkedBusiness && (
          <div className="bg-gradient-to-r from-secondary-50 to-primary-50 rounded-lg p-4 mb-4 border border-secondary-100">
            <div className="flex items-center gap-2 mb-2">
              <MapPinIcon className="w-4 h-4 text-secondary-600" />
              <h5 className="font-semibold text-gray-900">{linkedBusiness.name}</h5>
            </div>
            <p className="text-sm text-secondary-600">{linkedBusiness.category}</p>
            <button className="mt-2 text-secondary-600 text-sm font-medium hover:underline">
              View Business Details
            </button>
          </div>
        )}
        
        {/* Hashtags */}
        {hashtags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {hashtags.map((tag, index) => (
              <Hashtag key={index} tag={tag} />
            ))}
          </div>
        )}
      </div>
      
      {/* Post Actions */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <ReactionButton 
              emoji="❤️" 
              count={reactions.hearts} 
              isActive={false}
              onClick={() => handleReaction('hearts')}
              tooltip="Love"
            />
            <ReactionButton 
              emoji="👍" 
              count={reactions.thumbsUp} 
              isActive={false}
              onClick={() => handleReaction('thumbsUp')}
              tooltip="Like"
            />
            <ReactionButton 
              emoji="😂" 
              count={reactions.laugh} 
              isActive={false}
              onClick={() => handleReaction('laugh')}
              tooltip="Haha"
            />
            <ReactionButton 
              emoji="😮" 
              count={reactions.wow} 
              isActive={false}
              onClick={() => handleReaction('wow')}
              tooltip="Wow"
            />
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>{likes + (liked ? 1 : 0) + reactions.hearts} likes</span>
            <span>{comments} comments</span>
            <span>{shares} shares</span>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="px-6 py-3 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <button 
            onClick={handleLike}
            className={`flex items-center gap-2 text-secondary-600 hover:text-coral-500 transition-colors ${
              liked ? 'text-coral-500' : ''
            }`}
          >
            <HeartIcon className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
            <span className="text-sm font-medium">Like</span>
          </button>
          
          <button className="flex items-center gap-2 text-secondary-600 hover:text-primary-500 transition-colors">
            <ChatBubbleLeftRightIcon className="w-5 h-5" />
            <span className="text-sm font-medium">Comment</span>
          </button>
          
          <button className="flex items-center gap-2 text-secondary-600 hover:text-secondary-500 transition-colors">
            <ArrowsRightLeftIcon className="w-5 h-5" />
            <span className="text-sm font-medium">Share</span>
          </button>
        </div>
      </div>
    </div>
  )
}