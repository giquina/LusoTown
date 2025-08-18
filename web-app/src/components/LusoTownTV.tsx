'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { PlayIcon, EyeIcon, ClockIcon, UserGroupIcon, TvIcon } from '@heroicons/react/24/outline'
import { PlayIcon as PlayIconSolid } from '@heroicons/react/24/solid'
import YouTubePlayer from './YouTubePlayer'

interface VideoPlaylist {
  id: string
  title: string
  description: string
  category: string
  thumbnailUrl: string
  videoCount: number
  color: string
  featured?: boolean
}

interface FeaturedVideo {
  id: string
  title: string
  description: string
  thumbnailUrl: string
  duration: string
  views: string
  category: string
  youtubeId: string
  publishedAt: string
}

export default function LusoTownTV() {
  const { t } = useLanguage()
  const [selectedVideo, setSelectedVideo] = useState<FeaturedVideo | null>(null)
  const [activeCategory, setActiveCategory] = useState('all')

  // Mock data - In production, this would come from YouTube API or CMS
  const featuredVideos: FeaturedVideo[] = [
    {
      id: '1',
      title: 'Portuguese Community Success Stories in London',
      description: 'Meet three Portuguese entrepreneurs who built successful businesses in London',
      thumbnailUrl: '/images/events/video-thumbnails/success-stories.jpg',
      duration: '8:42',
      views: '2.3K',
      category: 'community',
      youtubeId: 'dQw4w9WgXcQ', // Demo video ID
      publishedAt: '2024-01-15'
    },
    {
      id: '2', 
      title: 'Hidden Portuguese Gems in London',
      description: 'Discover authentic Portuguese restaurants and cultural spots across London',
      thumbnailUrl: '/images/events/video-thumbnails/hidden-gems.jpg',
      duration: '12:15',
      views: '5.1K',
      category: 'culture',
      youtubeId: 'dQw4w9WgXcQ',
      publishedAt: '2024-01-20'
    },
    {
      id: '3',
      title: 'Portuguese Language Learning Tips for London Life',
      description: 'Maintain your Portuguese skills while living in London',
      thumbnailUrl: '/images/events/video-thumbnails/language-tips.jpg',
      duration: '15:30',
      views: '1.8K',
      category: 'education',
      youtubeId: 'dQw4w9WgXcQ',
      publishedAt: '2024-01-25'
    },
    {
      id: '4',
      title: 'LusoTown Event Highlights - January 2024',
      description: 'Best moments from our Portuguese community events this month',
      thumbnailUrl: '/images/events/video-thumbnails/event-highlights.jpg',
      duration: '6:45',
      views: '3.2K',
      category: 'events',
      youtubeId: 'dQw4w9WgXcQ',
      publishedAt: '2024-01-30'
    }
  ]

  const playlists: VideoPlaylist[] = [
    {
      id: 'london-life',
      title: 'Portuguese London Life',
      description: 'Daily life experiences of Portuguese speakers living in London',
      category: 'community',
      thumbnailUrl: '/images/events/playlist-thumbnails/london-life.jpg',
      videoCount: 15,
      color: 'from-secondary-500 to-secondary-600',
      featured: true
    },
    {
      id: 'success-stories',
      title: 'Community Success Stories',
      description: 'Inspiring journeys of Portuguese entrepreneurs and professionals',
      category: 'business',
      thumbnailUrl: '/images/events/playlist-thumbnails/success-stories.jpg',
      videoCount: 12,
      color: 'from-accent-500 to-coral-500'
    },
    {
      id: 'cultural-traditions',
      title: 'Cultural Traditions & Heritage',
      description: 'Portuguese cultural celebrations and traditional practices',
      category: 'culture',
      thumbnailUrl: '/images/events/playlist-thumbnails/cultural-traditions.jpg',
      videoCount: 20,
      color: 'from-coral-500 to-action-500',
      featured: true
    },
    {
      id: 'business-career',
      title: 'Business & Career Guidance',
      description: 'Professional development tips for Portuguese professionals in the UK',
      category: 'business',
      thumbnailUrl: '/images/events/playlist-thumbnails/business-career.jpg',
      videoCount: 8,
      color: 'from-action-500 to-premium-500'
    },
    {
      id: 'event-highlights',
      title: 'Event Highlights & Recaps',
      description: 'Best moments from LusoTown community events and meetups',
      category: 'events',
      thumbnailUrl: '/images/events/playlist-thumbnails/event-highlights.jpg',
      videoCount: 25,
      color: 'from-premium-500 to-secondary-500'
    },
    {
      id: 'language-education',
      title: 'Language Learning & Education',
      description: 'Portuguese language maintenance and learning resources',
      category: 'education',
      thumbnailUrl: '/images/events/playlist-thumbnails/language-education.jpg',
      videoCount: 10,
      color: 'from-secondary-600 to-accent-600',
      featured: true
    }
  ]

  const categories = [
    { id: 'all', label: 'All Content', icon: TvIcon },
    { id: 'community', label: 'Community', icon: UserGroupIcon },
    { id: 'culture', label: 'Culture', icon: PlayIcon },
    { id: 'business', label: 'Business', icon: ClockIcon },
    { id: 'events', label: 'Events', icon: EyeIcon },
    { id: 'education', label: 'Education', icon: PlayIcon }
  ]

  const filteredPlaylists = activeCategory === 'all' 
    ? playlists 
    : playlists.filter(playlist => playlist.category === activeCategory)

  const filteredVideos = activeCategory === 'all'
    ? featuredVideos
    : featuredVideos.filter(video => video.category === activeCategory)

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-secondary-50/30 to-accent-50/30 relative overflow-hidden">
      {/* Portuguese-inspired background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-secondary-200/40 via-accent-100/30 to-coral-100/30 rounded-full opacity-60 animate-pulse" />
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-tr from-action-200/40 via-secondary-100/30 to-accent-100/30 rounded-full opacity-50 animate-bounce" style={{ animationDuration: '8s' }} />
        <div className="absolute top-1/4 left-1/6 w-6 h-6 bg-secondary-300/50 rounded-full opacity-40" />
        <div className="absolute top-3/4 right-1/5 w-4 h-4 bg-accent-300/50 rounded-full opacity-30" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-secondary-50/80 via-accent-50/60 to-coral-50/60 border border-secondary-200/40 rounded-3xl px-8 py-4 shadow-xl mb-8 backdrop-blur-sm">
              <TvIcon className="w-6 h-6 text-secondary-600" />
              <span className="text-sm font-bold bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 bg-clip-text text-transparent">
                LusoTown TV
              </span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              Portuguese Community <br />
              <span className="bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 bg-clip-text text-transparent">
                Stories & Culture
              </span>
            </h2>
            <p className="text-xl sm:text-2xl text-gray-700 mb-8 font-medium max-w-4xl mx-auto leading-relaxed">
              Discover authentic stories, cultural traditions, and business insights from Portuguese speakers across London and the UK
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-secondary-500 to-accent-500 text-white shadow-xl scale-105'
                      : 'bg-white/80 text-gray-700 border border-gray-200 hover:border-secondary-300 hover:bg-secondary-50/50'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="text-sm">{category.label}</span>
                </button>
              )
            })}
          </div>

          {/* Featured Video Player */}
          {selectedVideo && (
            <div className="mb-16">
              <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-5xl mx-auto">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedVideo.title}</h3>
                  <p className="text-gray-600">{selectedVideo.description}</p>
                </div>
                <YouTubePlayer
                  videoId={selectedVideo.youtubeId}
                  title={selectedVideo.title}
                  autoplay={true}
                />
                <div className="flex items-center gap-6 mt-6 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-4 h-4" />
                    <span>{selectedVideo.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <EyeIcon className="w-4 h-4" />
                    <span>{selectedVideo.views} views</span>
                  </div>
                  <span className="capitalize px-3 py-1 bg-secondary-100 text-secondary-700 rounded-lg font-medium">
                    {selectedVideo.category}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="mt-4 text-secondary-600 hover:text-secondary-700 font-semibold"
                >
                  ← Back to video library
                </button>
              </div>
            </div>
          )}

          {/* Featured Videos Grid */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Latest Featured Videos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredVideos.map((video) => (
                <div
                  key={video.id}
                  className="group cursor-pointer"
                  onClick={() => setSelectedVideo(video)}
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className="relative aspect-video bg-gray-200 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-secondary-500/20 to-accent-500/20 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <PlayIconSolid className="w-8 h-8 text-secondary-600 ml-1" />
                        </div>
                      </div>
                      {/* Fallback for missing thumbnails */}
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-secondary-600 transition-colors">
                        {video.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {video.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <EyeIcon className="w-3 h-3" />
                          <span>{video.views}</span>
                        </div>
                        <span className="capitalize px-2 py-1 bg-gray-100 rounded">
                          {video.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Playlists Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Video Playlists & Series
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPlaylists.map((playlist) => (
                <div
                  key={playlist.id}
                  className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${playlist.color} p-8 text-white hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl cursor-pointer ${
                    playlist.featured ? 'lg:col-span-1' : ''
                  }`}
                >
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                        <PlayIconSolid className="w-6 h-6" />
                      </div>
                      <span className="text-sm bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                        {playlist.videoCount} videos
                      </span>
                    </div>
                    <h4 className="text-xl font-bold mb-3 group-hover:text-white/90 transition-colors">
                      {playlist.title}
                    </h4>
                    <p className="text-white/80 text-sm leading-relaxed mb-4">
                      {playlist.description}
                    </p>
                    <div className="flex items-center text-sm font-semibold group-hover:gap-3 transition-all duration-300">
                      <span>Watch Playlist</span>
                      <PlayIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call-to-Action */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-white/80 via-secondary-50/60 to-accent-50/60 backdrop-blur-lg border border-white/40 rounded-3xl p-12 shadow-2xl max-w-4xl mx-auto">
              <TvIcon className="w-16 h-16 text-secondary-600 mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Share Your Story with
                <span className="bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 bg-clip-text text-transparent block sm:inline">
                  {' '}LusoTown TV
                </span>
              </h3>
              <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
                Have a Portuguese community story to share? Business success to celebrate? Cultural tradition to preserve? 
                Join our video series and inspire others.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="group relative text-lg font-bold px-8 py-4 bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 text-white rounded-2xl shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    Share Your Story
                    <PlayIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                </a>
                <a
                  href="https://youtube.com/@lusotownlondon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-bold px-8 py-4 bg-white/80 backdrop-blur-lg text-gray-800 border-2 border-gray-200/60 rounded-2xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:border-secondary-300 hover:-translate-y-1 hover:bg-white/90"
                >
                  Subscribe on YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}