'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  HeartIcon as HeartOutlineIcon,
  ChatBubbleLeftRightIcon,
  ShareIcon,
  PhotoIcon,
  MapPinIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  ClockIcon,
  StarIcon,
  EyeIcon,
  CameraIcon,
  PlusIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon, CheckBadgeIcon } from '@heroicons/react/24/solid'
import { useLanguage } from '@/context/LanguageContext'
import { formatEventDate } from '@/lib/dateUtils'
import { useFavorites } from '@/context/FavoritesContext'
import FavoriteButton from '@/components/FavoriteButton'
import PhotoUpload, { UploadedPhoto } from '@/components/PhotoUpload'

export interface EventFeedCardData {
  id: string
  type: 'event_created' | 'event_update' | 'event_photo' | 'event_review' | 'event_reminder' | 'user_joined' | 'event_full'
  eventId: string
  eventTitle: string
  eventDate: string
  eventTime: string
  eventLocation: string
  eventImage?: string
  eventPrice: number
  eventCategory: string
  eventSpotsLeft: number
  eventMaxAttendees: number
  hostName: string
  hostImage?: string
  hostVerified?: boolean
  content: string
  images?: string[]
  createdAt: string
  likes: number
  comments: number
  shares: number
  liked: boolean
  userId?: string
  userName?: string
  userImage?: string
  priority: 'high' | 'medium' | 'low'
  isSponsored?: boolean
  reactions: {
    interested: number
    love: number
    going: number
    wow: number
  }
  allowPhotoUpload?: boolean
  userCanUploadPhotos?: boolean
}

interface EventFeedCardProps {
  post: EventFeedCardData
  onLike?: (postId: string) => void
  onReaction?: (postId: string, reactionType: keyof EventFeedCardData['reactions']) => void
  onPhotoUpload?: (postId: string, photos: UploadedPhoto[]) => void
  className?: string
}

export default function EventFeedCard({ 
  post, 
  onLike, 
  onReaction, 
  onPhotoUpload,
  className = '' 
}: EventFeedCardProps) {
  const { language } = useLanguage()
  const { isFavorite } = useFavorites()
  const [showPhotoUpload, setShowPhotoUpload] = useState(false)
  const [uploadedPhotos, setUploadedPhotos] = useState<UploadedPhoto[]>([])
  
  const isPortuguese = language === 'pt'

  const handleLike = () => {
    onLike?.(post.id)
  }

  const handleReaction = (reactionType: keyof EventFeedCardData['reactions']) => {
    onReaction?.(post.id, reactionType)
  }

  const handlePhotoUpload = (photos: UploadedPhoto[]) => {
    setUploadedPhotos(photos)
    onPhotoUpload?.(post.id, photos)
  }

  const getPostTypeIcon = (type: EventFeedCardData['type']) => {
    switch (type) {
      case 'event_created':
        return <CalendarDaysIcon className="w-4 h-4 text-green-500" />
      case 'event_update':
        return <ClockIcon className="w-4 h-4 text-primary-500" />
      case 'event_photo':
        return <PhotoIcon className="w-4 h-4 text-purple-500" />
      case 'event_review':
        return <StarIcon className="w-4 h-4 text-yellow-500" />
      case 'event_reminder':
        return <ClockIcon className="w-4 h-4 text-orange-500" />
      case 'user_joined':
        return <UserGroupIcon className="w-4 h-4 text-secondary-500" />
      case 'event_full':
        return <EyeIcon className="w-4 h-4 text-red-500" />
      default:
        return <CalendarDaysIcon className="w-4 h-4 text-gray-500" />
    }
  }

  const getPostTypeLabel = (type: EventFeedCardData['type']) => {
    const labels = {
      'event_created': isPortuguese ? 'Novo Evento' : 'New Event',
      'event_update': isPortuguese ? 'Atualização' : 'Update',
      'event_photo': isPortuguese ? 'Fotos' : 'Photos',
      'event_review': isPortuguese ? 'Avaliação' : 'Review',
      'event_reminder': isPortuguese ? 'Lembrete' : 'Reminder',
      'user_joined': isPortuguese ? 'Novo Participante' : 'Someone Joined',
      'event_full': isPortuguese ? 'Evento Lotado' : 'Event Full'
    }
    return labels[type] || 'Update'
  }

  const formatDate = (dateString: string) => {
    // Use consistent date formatting to prevent hydration issues
    return formatEventDate(dateString, isPortuguese)
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 h-full flex flex-col ${
        post.priority === 'high' ? 'ring-2 ring-primary-100' : ''
      } ${className}`}
    >
      {/* Post Header */}
      <div className="p-6 pb-4 flex-grow flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                {post.hostImage ? (
                  <Image 
                    src={post.hostImage} 
                    alt={post.hostName}
                    width={48}
                    height={48}
                    fill sizes="200px" className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-primary-400 to-secondary-400 flex items-center justify-center text-white font-bold">
                    {post.hostName.charAt(0)}
                  </div>
                )}
              </div>
              {post.hostVerified && (
                <CheckBadgeIcon className="absolute -bottom-1 -right-1 w-4 h-4 text-primary-500 bg-white rounded-full" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-gray-900">{post.hostName}</h4>
                {post.isSponsored && (
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                    {isPortuguese ? 'Patrocinado' : 'Sponsored'}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                {getPostTypeIcon(post.type)}
                <span>{getPostTypeLabel(post.type)}</span>
                <span>•</span>
                <span>{post.createdAt}</span>
              </div>
            </div>
          </div>
          
          <FavoriteButton
            itemId={post.eventId}
            itemType="event"
            itemTitle={post.eventTitle}
            itemDescription={post.content}
            itemImageUrl={post.eventImage}
            size="sm"
          />
        </div>

        {/* Post Content */}
        <p className="text-gray-700 mb-4 whitespace-pre-line">{post.content}</p>

        {/* Post Images Grid */}
        {post.images && post.images.length > 0 && (
          <div className="mb-4">
            {post.images.length === 1 ? (
              <div className="rounded-lg overflow-hidden">
                <Image 
                  src={post.images[0]} 
                  alt="Event photo" 
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="object-cover max-h-96"
                />
              </div>
            ) : post.images.length === 2 ? (
              <div className="grid grid-cols-2 gap-2 rounded-lg overflow-hidden">
                {post.images.map((image, idx) => (
                  <div key={idx} className="aspect-square overflow-hidden">
                    <Image 
                      src={image} 
                      alt={`Event photo ${idx + 1}`} 
                      fill sizes="200px" className="object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 rounded-lg overflow-hidden">
                {post.images.slice(0, 4).map((image, idx) => (
                  <div key={idx} className="relative aspect-square overflow-hidden">
                    <Image 
                      src={image} 
                      alt={`Event photo ${idx + 1}`} 
                      fill sizes="200px" className="object-cover"
                    />
                    {idx === 3 && post.images!.length > 4 && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold text-lg">
                        +{post.images!.length - 4}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Uploaded Photos Preview */}
        {uploadedPhotos.length > 0 && (
          <div className="mb-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
              <div className="flex items-center gap-2 text-green-700 text-sm">
                <CheckBadgeIcon className="w-4 h-4" />
                <span>
                  {isPortuguese 
                    ? `${uploadedPhotos.length} foto(s) adicionada(s) com sucesso!`
                    : `${uploadedPhotos.length} photo(s) added successfully!`
                  }
                </span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {uploadedPhotos.slice(0, 3).map((photo) => (
                <div key={photo.id} className="aspect-square rounded-lg overflow-hidden">
                  <Image 
                    src={photo.preview} 
                    alt="Uploaded photo" 
                    fill sizes="200px" className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Event Card */}
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-4 mb-4 border border-primary-100">
          <div className="flex items-start gap-3">
            {post.eventImage && (
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image 
                  src={post.eventImage} 
                  alt={post.eventTitle}
                  fill sizes="200px" className="object-cover"
                />
              </div>
            )}
            
            <div className="flex-1 min-w-0">
              <h5 className="font-semibold text-gray-900 mb-2 line-clamp-2">{post.eventTitle}</h5>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-1">
                  <CalendarDaysIcon className="w-4 h-4 text-primary-500" />
                  <span>{formatDate(post.eventDate)} • {post.eventTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPinIcon className="w-4 h-4 text-secondary-500" />
                  <span className="truncate">{post.eventLocation}</span>
                </div>
                <div className="flex items-center gap-1">
                  <UserGroupIcon className="w-4 h-4 text-purple-500" />
                  <span>
                    {post.eventSpotsLeft > 0 
                      ? `${post.eventSpotsLeft} ${isPortuguese ? 'vagas' : 'spots'}`
                      : isPortuguese ? 'Lotado' : 'Full'
                    }
                  </span>
                </div>
                <div className="text-primary-600 font-semibold">
                  {post.eventPrice === 0 ? (isPortuguese ? 'GRÁTIS' : 'FREE') : `£${post.eventPrice}`}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  <span className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full">
                    {post.eventCategory}
                  </span>
                  {post.eventSpotsLeft <= 5 && post.eventSpotsLeft > 0 && (
                    <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full">
                      {isPortuguese ? 'Últimas vagas' : 'Few spots left'}
                    </span>
                  )}
                  {post.eventSpotsLeft === 0 && (
                    <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">
                      {isPortuguese ? 'Lotado' : 'Full'}
                    </span>
                  )}
                </div>
                
                <a
                  href={`/events/${post.eventId}`}
                  className="text-primary-600 text-sm font-medium hover:underline"
                >
                  {post.eventSpotsLeft > 0 
                    ? (isPortuguese ? 'Ver & RSVP' : 'View & RSVP')
                    : (isPortuguese ? 'Lista de Espera' : 'Waitlist')
                  }
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Photo Upload Section */}
        {post.userCanUploadPhotos && (
          <div className="mb-4">
            {!showPhotoUpload ? (
              <button
                onClick={() => setShowPhotoUpload(true)}
                className="w-full bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-dashed border-purple-300 rounded-xl p-4 text-center hover:from-purple-100 hover:to-pink-100 transition-all duration-200 group"
              >
                <div className="flex items-center justify-center gap-2 text-purple-600">
                  <CameraIcon className="w-5 h-5" />
                  <span className="font-medium">
                    {isPortuguese ? 'Adicionar Fotos do Evento' : 'Add Event Photos'}
                  </span>
                </div>
                <p className="text-sm text-purple-500 mt-1">
                  {isPortuguese 
                    ? 'Partilhe momentos especiais deste evento'
                    : 'Share special moments from this event'
                  }
                </p>
              </button>
            ) : (
              <div className="bg-gray-50 rounded-xl p-4">
                <PhotoUpload
                  onPhotosUploaded={handlePhotoUpload}
                  eventId={post.eventId}
                  maxPhotos={6}
                />
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => setShowPhotoUpload(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm"
                  >
                    {isPortuguese ? 'Cancelar' : 'Cancel'}
                  </button>
                  <button
                    onClick={() => {
                      setShowPhotoUpload(false)
                      // Handle photo submission here
                    }}
                    className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-primary-600 hover:to-secondary-600 transition-all duration-200"
                  >
                    {isPortuguese ? 'Publicar Fotos' : 'Post Photos'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Reactions Bar */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <button 
            onClick={() => handleReaction('interested')}
            className="flex items-center gap-1 hover:text-primary-500 transition-colors"
          >
            <span>👀</span>
            <span>{post.reactions.interested} {isPortuguese ? 'interessados' : 'interested'}</span>
          </button>
          
          <button 
            onClick={() => handleReaction('going')}
            className="flex items-center gap-1 hover:text-secondary-500 transition-colors"
          >
            <span>✅</span>
            <span>{post.reactions.going} {isPortuguese ? 'vão' : 'going'}</span>
          </button>
          
          <button 
            onClick={() => handleReaction('love')}
            className="flex items-center gap-1 hover:text-red-500 transition-colors"
          >
            <span>❤️</span>
            <span>{post.reactions.love}</span>
          </button>
          
          <button 
            onClick={() => handleReaction('wow')}
            className="flex items-center gap-1 hover:text-yellow-500 transition-colors"
          >
            <span>😍</span>
            <span>{post.reactions.wow}</span>
          </button>
        </div>
      </div>

      {/* Post Actions */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              onClick={handleLike}
              className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors"
            >
              {post.liked ? (
                <HeartSolidIcon className="w-5 h-5 text-red-500" />
              ) : (
                <HeartOutlineIcon className="w-5 h-5" />
              )}
              <span className="text-sm font-medium">{post.likes}</span>
            </button>
            
            <button className="flex items-center gap-2 text-gray-600 hover:text-primary-500 transition-colors">
              <ChatBubbleLeftRightIcon className="w-5 h-5" />
              <span className="text-sm font-medium">{post.comments}</span>
            </button>
            
            <button className="flex items-center gap-2 text-gray-600 hover:text-secondary-500 transition-colors">
              <ShareIcon className="w-5 h-5" />
              <span className="text-sm font-medium">{post.shares}</span>
            </button>
          </div>
          
          <a
            href={`/events/${post.eventId}`}
            className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm px-4 py-2 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 font-medium"
          >
            {isPortuguese ? 'Ver Evento' : 'View Event'}
          </a>
        </div>
      </div>
    </motion.div>
  )
}