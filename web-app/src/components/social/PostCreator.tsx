'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { useSubscription } from '@/context/SubscriptionContext'
import { 
  X,
  Image as ImageIcon,
  MapPin,
  Tag,
  Globe,
  Lock,
  Users,
  Smile,
  Calendar,
  Car,
  Music,
  Coffee,
  Camera,
  Utensils
} from 'lucide-react'

interface PostCreatorProps {
  onSubmit: (postData: {
    content: string
    contentType: string
    mediaUrls?: string[]
    culturalTags: string[]
    locationTags: string[]
    serviceTags: string[]
    visibility: string
  }) => void
  onCancel: () => void
  className?: string
}

const CULTURAL_TAGS = [
  { id: 'fado', label: 'Fado', icon: <Music className="w-4 h-4" />, category: 'music' },
  { id: 'pasteis_de_nata', label: 'Pastéis de Nata', icon: <Utensils className="w-4 h-4" />, category: 'food' },
  { id: 'santos_populares', label: 'Santos Populares', icon: <Calendar className="w-4 h-4" />, category: 'celebration' },
  { id: 'portuguese_food', label: 'Portuguese Food', icon: <Utensils className="w-4 h-4" />, category: 'food' },
  { id: 'saudade', label: 'Saudade', icon: <Smile className="w-4 h-4" />, category: 'emotion' },
  { id: 'portuguese_culture', label: 'Portuguese Culture', icon: <Globe className="w-4 h-4" />, category: 'culture' },
  { id: 'brazilian_culture', label: 'Brazilian Culture', icon: <Globe className="w-4 h-4" />, category: 'culture' },
  { id: 'portuguese_business', label: 'Portuguese Business', icon: <Coffee className="w-4 h-4" />, category: 'business' },
  { id: 'festa_junina', label: 'Festa Junina', icon: <Calendar className="w-4 h-4" />, category: 'celebration' },
  { id: 'futebol', label: 'Football/Futebol', icon: <Globe className="w-4 h-4" />, category: 'sports' }
]

const LOCATION_TAGS = [
  { id: 'stockwell', label: 'Stockwell' },
  { id: 'vauxhall', label: 'Vauxhall' },
  { id: 'elephant_castle', label: 'Elephant & Castle' },
  { id: 'borough_market', label: 'Borough Market' },
  { id: 'kentish_town', label: 'Kentish Town' },
  { id: 'london', label: 'London' },
  { id: 'south_london', label: 'South London' },
  { id: 'north_london', label: 'North London' },
  { id: 'east_london', label: 'East London' },
  { id: 'west_london', label: 'West London' }
]

const SERVICE_TAGS = [
  { id: 'transport', label: 'Transport Services', icon: <Car className="w-4 h-4" /> },
  { id: 'tours', label: 'Cultural Tours', icon: <Camera className="w-4 h-4" /> },
  { id: 'close_protection', label: 'Close Protection', icon: <Users className="w-4 h-4" /> },
  { id: 'events', label: 'Events', icon: <Calendar className="w-4 h-4" /> },
  { id: 'business_networking', label: 'Business Networking', icon: <Coffee className="w-4 h-4" /> }
]

export default function PostCreator({ onSubmit, onCancel, className = '' }: PostCreatorProps) {
  const { language, t } = useLanguage()
  const { membershipTier } = useSubscription()
  const [content, setContent] = useState('')
  const [contentType, setContentType] = useState('text')
  const [visibility, setVisibility] = useState('public')
  const [selectedCulturalTags, setSelectedCulturalTags] = useState<string[]>([])
  const [selectedLocationTags, setSelectedLocationTags] = useState<string[]>([])
  const [selectedServiceTags, setSelectedServiceTags] = useState<string[]>([])
  const [showTagSelector, setShowTagSelector] = useState<'cultural' | 'location' | 'service' | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const canCreateServicePosts = membershipTier === 'cultural_ambassador' || membershipTier === 'community'
  const maxContentLength = 500

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim() || isSubmitting) return

    setIsSubmitting(true)
    try {
      await onSubmit({
        content: content.trim(),
        contentType,
        culturalTags: selectedCulturalTags,
        locationTags: selectedLocationTags,
        serviceTags: selectedServiceTags,
        visibility
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleTag = (tag: string, type: 'cultural' | 'location' | 'service') => {
    const setterMap = {
      cultural: setSelectedCulturalTags,
      location: setSelectedLocationTags,
      service: setSelectedServiceTags
    }
    
    const currentMap = {
      cultural: selectedCulturalTags,
      location: selectedLocationTags,
      service: selectedServiceTags
    }

    const setter = setterMap[type]
    const current = currentMap[type]
    
    if (current.includes(tag)) {
      setter(current.filter(t => t !== tag))
    } else {
      setter([...current, tag])
    }
  }

  const getVisibilityIcon = () => {
    switch (visibility) {
      case 'public':
        return <Globe className="w-4 h-4" />
      case 'members_only':
        return <Users className="w-4 h-4" />
      case 'connections_only':
        return <Lock className="w-4 h-4" />
      default:
        return <Globe className="w-4 h-4" />
    }
  }

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 ${className}`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            {t('post_creator.title') || 'Share with the Portuguese Community'}
          </h3>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-secondary-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Content Input */}
          <div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={t('post_creator.placeholder') || "What's happening in the Portuguese community?"}
              className="w-full min-h-[120px] p-4 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 placeholder-gray-400"
              maxLength={maxContentLength}
            />
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-gray-500">
                {t('post_creator.supports_emojis') || 'Portuguese emojis: 🇵🇹 🇧🇷 🥧 🎵 ❤️'}
              </span>
              <span className={`text-xs ${content.length > maxContentLength * 0.9 ? 'text-coral-500' : 'text-gray-400'}`}>
                {content.length}/{maxContentLength}
              </span>
            </div>
          </div>

          {/* Content Type Selection */}
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-secondary-700">
              {t('post_creator.content_type') || 'Post Type:'}
            </label>
            <select
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
              className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="text">{t('post_creator.type_text') || 'Text Post'}</option>
              <option value="image">{t('post_creator.type_image') || 'Photo'}</option>
              <option value="event_share">{t('post_creator.type_event') || 'Event Share'}</option>
              {canCreateServicePosts && (
                <option value="service_promotion">{t('post_creator.type_service') || 'Service Promotion'}</option>
              )}
            </select>
          </div>

          {/* Tags Section */}
          <div className="space-y-4">
            {/* Cultural Tags */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-secondary-700">
                  {t('post_creator.cultural_tags') || 'Portuguese Cultural Elements'}
                </label>
                <button
                  type="button"
                  onClick={() => setShowTagSelector(showTagSelector === 'cultural' ? null : 'cultural')}
                  className="text-xs text-primary-600 hover:text-primary-700"
                >
                  {showTagSelector === 'cultural' ? 'Hide' : 'Add Tags'}
                </button>
              </div>
              
              {/* Selected Cultural Tags */}
              {selectedCulturalTags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {selectedCulturalTags.map(tag => {
                    const tagData = CULTURAL_TAGS.find(t => t.id === tag)
                    return (
                      <span
                        key={tag}
                        className="inline-flex items-center space-x-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                      >
                        {tagData?.icon}
                        <span>{tagData?.label || tag}</span>
                        <button
                          type="button"
                          onClick={() => toggleTag(tag, 'cultural')}
                          className="ml-1 text-primary-500 hover:text-primary-700"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )
                  })}
                </div>
              )}

              {/* Cultural Tag Selector */}
              {showTagSelector === 'cultural' && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-4 bg-gray-50 rounded-lg">
                  {CULTURAL_TAGS.map(tag => (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => toggleTag(tag.id, 'cultural')}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCulturalTags.includes(tag.id)
                          ? 'bg-primary-500 text-white'
                          : 'bg-white text-secondary-700 hover:bg-secondary-100'
                      }`}
                    >
                      {tag.icon}
                      <span>{tag.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Location Tags */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-secondary-700">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  {t('post_creator.location_tags') || 'London Areas'}
                </label>
                <button
                  type="button"
                  onClick={() => setShowTagSelector(showTagSelector === 'location' ? null : 'location')}
                  className="text-xs text-primary-600 hover:text-primary-700"
                >
                  {showTagSelector === 'location' ? 'Hide' : 'Add Locations'}
                </button>
              </div>

              {/* Selected Location Tags */}
              {selectedLocationTags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {selectedLocationTags.map(tag => {
                    const tagData = LOCATION_TAGS.find(t => t.id === tag)
                    return (
                      <span
                        key={tag}
                        className="inline-flex items-center space-x-1 px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm"
                      >
                        <MapPin className="w-3 h-3" />
                        <span>{tagData?.label || tag}</span>
                        <button
                          type="button"
                          onClick={() => toggleTag(tag, 'location')}
                          className="ml-1 text-secondary-500 hover:text-secondary-700"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )
                  })}
                </div>
              )}

              {/* Location Tag Selector */}
              {showTagSelector === 'location' && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-4 bg-gray-50 rounded-lg">
                  {LOCATION_TAGS.map(tag => (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => toggleTag(tag.id, 'location')}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedLocationTags.includes(tag.id)
                          ? 'bg-secondary-500 text-white'
                          : 'bg-white text-secondary-700 hover:bg-secondary-100'
                      }`}
                    >
                      <MapPin className="w-3 h-3" />
                      <span>{tag.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Service Tags (for eligible users) */}
            {canCreateServicePosts && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-secondary-700">
                    <Tag className="w-4 h-4 inline mr-1" />
                    {t('post_creator.service_tags') || 'Services'}
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowTagSelector(showTagSelector === 'service' ? null : 'service')}
                    className="text-xs text-primary-600 hover:text-primary-700"
                  >
                    {showTagSelector === 'service' ? 'Hide' : 'Add Services'}
                  </button>
                </div>

                {/* Selected Service Tags */}
                {selectedServiceTags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {selectedServiceTags.map(tag => {
                      const tagData = SERVICE_TAGS.find(t => t.id === tag)
                      return (
                        <span
                          key={tag}
                          className="inline-flex items-center space-x-1 px-3 py-1 bg-accent-100 text-accent-700 rounded-full text-sm"
                        >
                          {tagData?.icon}
                          <span>{tagData?.label || tag}</span>
                          <button
                            type="button"
                            onClick={() => toggleTag(tag, 'service')}
                            className="ml-1 text-accent-500 hover:text-accent-700"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      )
                    })}
                  </div>
                )}

                {/* Service Tag Selector */}
                {showTagSelector === 'service' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-4 bg-gray-50 rounded-lg">
                    {SERVICE_TAGS.map(tag => (
                      <button
                        key={tag.id}
                        type="button"
                        onClick={() => toggleTag(tag.id, 'service')}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedServiceTags.includes(tag.id)
                            ? 'bg-accent-500 text-white'
                            : 'bg-white text-secondary-700 hover:bg-secondary-100'
                        }`}
                      >
                        {tag.icon}
                        <span>{tag.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Visibility and Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-4">
              {/* Visibility Selector */}
              <div className="flex items-center space-x-2">
                <label className="text-sm text-secondary-600">
                  {t('post_creator.visibility') || 'Visibility:'}
                </label>
                <select
                  value={visibility}
                  onChange={(e) => setVisibility(e.target.value)}
                  className="flex items-center space-x-1 px-2 py-1 border border-gray-200 rounded text-sm focus:ring-2 focus:ring-primary-500"
                >
                  <option value="public">{t('post_creator.public') || 'Public'}</option>
                  <option value="members_only">{t('post_creator.members_only') || 'Members Only'}</option>
                  <option value="connections_only">{t('post_creator.connections_only') || 'Connections Only'}</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-secondary-600 hover:text-secondary-800 transition-colors"
              >
                {t('post_creator.cancel') || 'Cancel'}
              </button>
              <button
                type="submit"
                disabled={!content.trim() || isSubmitting}
                className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting 
                  ? (t('post_creator.posting') || 'Posting...') 
                  : (t('post_creator.post') || 'Share Post')
                }
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}