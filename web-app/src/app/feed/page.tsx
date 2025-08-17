'use client'
import Image from 'next/image'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  HeartIcon, 
  ChatBubbleLeftRightIcon, 
  ArrowPathIcon, 
  PhotoIcon,
  LinkIcon,
  MapPinIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  LanguageIcon,
  FunnelIcon,
  AdjustmentsHorizontalIcon,
  CameraIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import Footer from '@/components/Footer'
import PersonalizedFeed from '@/components/PersonalizedFeed'
import EventFeed from '@/components/EventFeed'
import LiveUpdateIndicator from '@/components/LiveUpdateIndicator'
import FeedFilters, { FeedFilters as FeedFiltersType } from '@/components/FeedFilters'
import PhotoUpload, { UploadedPhoto } from '@/components/PhotoUpload'
import EventFeedCard, { EventFeedCardData } from '@/components/EventFeedCard'
import { useLanguage } from '@/context/LanguageContext'
import { Language } from '@/i18n'

interface FeedPost {
  id: string
  userId: string
  userName: string
  userAvatar: string
  content: string
  imageUrl?: string
  linkUrl?: string
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
  createdAt: string
  likes: number
  comments: number
  liked: boolean
  reactions: {
    heart: number
    thumbsUp: number
    laugh: number
    wow: number
    sad: number
    angry: number
  }
  hashtags: string[]
}

const mockPosts: FeedPost[] = [
  {
    id: '1',
    userId: 'user1',
    userName: 'Maria Santos',
    userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1ac?w=100&h=100&fit=crop&crop=face&auto=format',
    content: 'Just attended the most amazing Fado night at A Toca! The music was incredible and I met so many wonderful people. #FadoNight #PortugueseCulture',
    createdAt: '2 hours ago',
    likes: 24,
    comments: 5,
    liked: false,
    reactions: {
      heart: 12,
      thumbsUp: 8,
      laugh: 3,
      wow: 1,
      sad: 0,
      angry: 0
    },
    hashtags: ['FadoNight', 'PortugueseCulture'],
    linkedEvent: {
      id: 'event1',
      title: 'Noite de Fado & Vinho Verde',
      date: '2025-08-16',
      location: 'A Toca Restaurant, Stockwell'
    }
  },
  {
    id: '2',
    userId: 'user2',
    userName: 'Carlos Oliveira',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face&auto=format',
    content: 'Found this amazing pastelaria in Shoreditch that reminds me of home! Their pastéis de nata are authentic and delicious. Check it out!',
    imageUrl: 'https://images.unsplash.com/photo-1574329818413-10376febd3f0?w=600&h=400&fit=crop&auto=format',
    createdAt: '5 hours ago',
    likes: 18,
    comments: 3,
    liked: true,
    reactions: {
      heart: 9,
      thumbsUp: 5,
      laugh: 2,
      wow: 1,
      sad: 0,
      angry: 1
    },
    hashtags: ['Pastelaria', 'Shoreditch', 'Food'],
    linkedBusiness: {
      id: 'business1',
      name: 'Casa do Pão',
      category: 'Café & Bakery'
    }
  },
  {
    id: '3',
    userId: 'user3',
    userName: 'Ana Pereira',
    userAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face&auto=format',
    content: 'Looking forward to the weekend Portuguese Book Club meeting! We\'re discussing "O Guarani" by José de Alencar. Anyone interested in joining? 📚',
    linkUrl: 'https://lusotown-london.vercel.app/events/book-club',
    createdAt: '1 day ago',
    likes: 12,
    comments: 7,
    liked: false,
    reactions: {
      heart: 5,
      thumbsUp: 4,
      laugh: 1,
      wow: 1,
      sad: 0,
      angry: 1
    },
    hashtags: ['BookClub', 'PortugueseLiterature', 'Reading'],
    linkedEvent: {
      id: 'event2',
      title: 'Portuguese Book Club',
      date: '2025-08-18',
      location: 'Champor-Champor Restaurant, Elephant & Castle'
    }
  }
]

export default function CommunityFeed() {
  const [posts, setPosts] = useState<FeedPost[]>(mockPosts)
  const [newPost, setNewPost] = useState('')
  const { language, setLanguage } = useLanguage()
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [feedType, setFeedType] = useState<'personalized' | 'community' | 'events'>('events')
  const [showFilters, setShowFilters] = useState(false)
  const [showPhotoUpload, setShowPhotoUpload] = useState(false)
  const [uploadedPhotos, setUploadedPhotos] = useState<UploadedPhoto[]>([])
  
  // Enhanced filters state
  const [filters, setFilters] = useState<FeedFiltersType>({
    eventType: [],
    location: [],
    dateRange: 'all',
    priceRange: 'all',
    spotsAvailable: false,
    culturalTags: [],
    followingOnly: false
  })
  
  const isPortuguese = language === 'pt'

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 } 
        : post
    ))
  }

  const handleCreatePost = () => {
    if (newPost.trim()) {
      const post: FeedPost = {
        id: `post-${Date.now()}`,
        userId: 'currentUser',
        userName: isPortuguese ? 'Tu' : 'You',
        userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face&auto=format',
        content: newPost,
        createdAt: isPortuguese ? 'Agora mesmo' : 'Just now',
        likes: 0,
        comments: 0,
        liked: false,
        reactions: {
          heart: 0,
          thumbsUp: 0,
          laugh: 0,
          wow: 0,
          sad: 0,
          angry: 0
        },
        hashtags: []
      }
      setPosts([post, ...posts])
      setNewPost('')
      setShowCreatePost(false)
      
      // Include uploaded photos if any
      if (uploadedPhotos.length > 0) {
        post.imageUrl = uploadedPhotos[0].preview // Use first photo as main image
        setUploadedPhotos([])
      }
    }
  }

  const handlePhotoUpload = (photos: UploadedPhoto[]) => {
    setUploadedPhotos(photos)
  }

  const handleFiltersChange = (newFilters: FeedFiltersType) => {
    setFilters(newFilters)
    // Apply filters to posts here - for now just update state
    console.log('Filters updated:', newFilters)
  }

  const handleLiveUpdate = (update: any) => {
    // Handle live update clicks - could navigate to specific events/posts
    console.log('Live update clicked:', update)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Live Update Indicator */}
      <LiveUpdateIndicator onUpdateClick={handleLiveUpdate} />
      
      <main className="pt-16">
        {/* Enhanced Hero Section */}
        <section className="bg-gradient-to-r from-primary-50 to-secondary-50 py-12">
          <div className="container-width">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <SparklesIcon className="w-6 h-6 text-primary-500" />
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  {isPortuguese ? 'Feed da Comunidade LusoTown' : 'LusoTown Community Feed'}
                </h1>
              </div>
              <p className="text-lg text-gray-600 mb-8">
                {isPortuguese 
                  ? 'Partilha atualizações, conecta-te com outros e mantém-te a par das últimas novidades da nossa comunidade portuguesa em Londres'
                  : 'Share updates, connect with others, and stay in the loop with the latest from our Portuguese community in London'
                }
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                <div className="flex gap-2">
                  <button
                    onClick={() => setFeedType('personalized')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      feedType === 'personalized'
                        ? 'bg-primary-500 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {isPortuguese ? 'Minha Rede' : 'My Network'}
                  </button>
                  <button
                    onClick={() => setFeedType('events')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      feedType === 'events'
                        ? 'bg-primary-500 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {isPortuguese ? 'Eventos' : 'Events'}
                  </button>
                  <button
                    onClick={() => setFeedType('community')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      feedType === 'community'
                        ? 'bg-primary-500 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {isPortuguese ? 'Comunidade' : 'Community'}
                  </button>
                </div>
                
                <div className="flex items-center gap-3">
                  {/* Filters Toggle */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                      showFilters
                        ? 'bg-secondary-500 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <AdjustmentsHorizontalIcon className="w-4 h-4" />
                    {isPortuguese ? 'Filtros' : 'Filters'}
                  </button>
                  
                  <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 shadow-sm">
                    <LanguageIcon className="w-5 h-5 text-gray-600" />
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value as Language)}
                      className="bg-transparent text-gray-700 font-medium focus:outline-none"
                    >
                      <option value="en">English</option>
                      <option value="pt-pt">Português (Portugal)</option>
                      <option value="pt-br">Português (Brasil)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Filters Section */}
        <AnimatePresence>
          {showFilters && (
            <section className="py-6">
              <div className="container-width">
                <FeedFilters
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  isOpen={showFilters}
                  onToggle={() => setShowFilters(!showFilters)}
                />
              </div>
            </section>
          )}
        </AnimatePresence>

        {/* Enhanced Create Post Modal */}
        {showCreatePost && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    {isPortuguese ? 'Criar Publicação' : 'Create Post'}
                  </h3>
                  <button 
                    onClick={() => {
                      setShowCreatePost(false)
                      setShowPhotoUpload(false)
                      setUploadedPhotos([])
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-400 to-secondary-400 flex items-center justify-center text-white font-bold">
                    {isPortuguese ? 'T' : 'Y'}
                  </div>
                  <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder={isPortuguese 
                      ? 'O que está a acontecer na tua comunidade portuguesa?'
                      : "What's happening in your Portuguese community?"
                    }
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent resize-none"
                    rows={4}
                  />
                </div>

                {/* Photo Upload Section */}
                {showPhotoUpload && (
                  <div className="mb-4">
                    <PhotoUpload
                      onPhotosUploaded={handlePhotoUpload}
                      maxPhotos={4}
                      className="border-t border-gray-200 pt-4"
                    />
                  </div>
                )}
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setShowPhotoUpload(!showPhotoUpload)}
                      className={`p-2 rounded-lg transition-colors ${
                        showPhotoUpload 
                          ? 'text-primary-500 bg-primary-50' 
                          : 'text-gray-500 hover:text-primary-500 hover:bg-primary-50'
                      }`}
                      title={isPortuguese ? 'Adicionar fotos' : 'Add photos'}
                    >
                      <CameraIcon className="w-5 h-5" />
                    </button>
                    <button 
                      className="p-2 text-gray-500 hover:text-primary-500 hover:bg-primary-50 rounded-lg"
                      title={isPortuguese ? 'Adicionar link' : 'Add link'}
                    >
                      <LinkIcon className="w-5 h-5" />
                    </button>
                    <button 
                      className="p-2 text-gray-500 hover:text-primary-500 hover:bg-primary-50 rounded-lg"
                      title={isPortuguese ? 'Conectar evento' : 'Link event'}
                    >
                      <CalendarDaysIcon className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {uploadedPhotos.length > 0 && (
                      <span className="text-sm text-gray-500">
                        {uploadedPhotos.length} {isPortuguese ? 'foto(s)' : 'photo(s)'}
                      </span>
                    )}
                    <button
                      onClick={handleCreatePost}
                      disabled={!newPost.trim()}
                      className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isPortuguese ? 'Publicar' : 'Post'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Feed Content */}
        <section className="py-12">
          <div className="container-width">
            <div className="max-w-2xl mx-auto">
              {/* Feed Header with Create Post Button */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-1">
                      {feedType === 'personalized' 
                        ? (isPortuguese ? 'Feed Personalizado' : 'Personalized Feed')
                        : feedType === 'events'
                        ? (isPortuguese ? 'Eventos em Tempo Real' : 'Live Event Updates')
                        : (isPortuguese ? 'Comunidade' : 'Community Feed')
                      }
                    </h2>
                    <p className="text-sm text-gray-600">
                      {feedType === 'events' && (
                        isPortuguese 
                          ? 'Atualizações em tempo real de eventos portugueses em Londres'
                          : 'Live updates from Portuguese events across London'
                      )}
                      {feedType === 'personalized' && (
                        isPortuguese 
                          ? 'Conteúdo personalizado da tua rede'
                          : 'Personalized content from your network'
                      )}
                      {feedType === 'community' && (
                        isPortuguese 
                          ? 'Partilhas da comunidade portuguesa'
                          : 'Shares from the Portuguese community'
                      )}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => setShowCreatePost(true)}
                    className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 shadow-sm flex items-center gap-2"
                  >
                    <PhotoIcon className="w-4 h-4" />
                    {isPortuguese ? 'Partilhar' : 'Share'}
                  </button>
                </div>
              </div>

              {feedType === 'personalized' ? (
                <PersonalizedFeed />
              ) : feedType === 'events' ? (
                <EventFeed />
              ) : (
                <div className="space-y-6">
                  {posts.map((post) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                  >
                    {/* Post Header */}
                    <div className="p-6 pb-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden">
                            <Image
                              src={post.userAvatar}
                              alt={post.userName}
                              width={40}
                              height={40}
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{post.userName}</h4>
                            <p className="text-sm text-gray-500">{post.createdAt}</p>
                          </div>
                        </div>
                        
                        {post.linkedEvent && (
                          <div className="bg-primary-50 text-primary-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                            <CalendarDaysIcon className="w-3 h-3" />
                            Event
                          </div>
                        )}
                        
                        {post.linkedBusiness && (
                          <div className="bg-secondary-50 text-secondary-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                            <MapPinIcon className="w-3 h-3" />
                            Business
                          </div>
                        )}
                      </div>
                      
                      {/* Post Content */}
                      <p className="text-gray-700 mb-4 whitespace-pre-line">{post.content}</p>
                      
                      {/* Post Image */}
                      {post.imageUrl && (
                        <div className="mb-4 rounded-lg overflow-hidden">
                          <Image
                            src={post.imageUrl}
                            alt="Post image"
                            width={600}
                            height={400}
                            className="w-full h-auto object-cover"
                          />
                        </div>
                      )}
                      
                      {/* Linked Event */}
                      {post.linkedEvent && (
                        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-4 mb-4 border border-primary-100">
                          <div className="flex items-center gap-2 mb-2">
                            <CalendarDaysIcon className="w-4 h-4 text-primary-600" />
                            <h5 className="font-semibold text-gray-900">{post.linkedEvent.title}</h5>
                          </div>
                          <div className="text-sm text-gray-600">
                            <p>{post.linkedEvent.date}</p>
                            <p>{post.linkedEvent.location}</p>
                          </div>
                          <button className="mt-2 text-primary-600 text-sm font-medium hover:underline">
                            View Event Details
                          </button>
                        </div>
                      )}
                      
                      {/* Linked Business */}
                      {post.linkedBusiness && (
                        <div className="bg-gradient-to-r from-secondary-50 to-primary-50 rounded-lg p-4 mb-4 border border-secondary-100">
                          <div className="flex items-center gap-2 mb-2">
                            <MapPinIcon className="w-4 h-4 text-secondary-600" />
                            <h5 className="font-semibold text-gray-900">{post.linkedBusiness.name}</h5>
                          </div>
                          <p className="text-sm text-gray-600">{post.linkedBusiness.category}</p>
                          <button className="mt-2 text-secondary-600 text-sm font-medium hover:underline">
                            View Business Details
                          </button>
                        </div>
                      )}
                      
                      {/* Hashtags */}
                      {post.hashtags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.hashtags.map((tag, index) => (
                            <span 
                              key={index} 
                              className="text-primary-600 text-sm hover:underline cursor-pointer"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* Post Actions */}
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          <button 
                            onClick={() => handleLike(post.id)}
                            className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors"
                          >
                            {post.liked ? (
                              <HeartSolidIcon className="w-5 h-5 text-red-500" />
                            ) : (
                              <HeartIcon className="w-5 h-5" />
                            )}
                            <span className="text-sm font-medium">{post.likes}</span>
                          </button>
                          
                          <button className="flex items-center gap-2 text-gray-600 hover:text-primary-500 transition-colors">
                            <ChatBubbleLeftRightIcon className="w-5 h-5" />
                            <span className="text-sm font-medium">{post.comments}</span>
                          </button>
                          
                          <button className="flex items-center gap-2 text-gray-600 hover:text-primary-500 transition-colors">
                            <ArrowPathIcon className="w-5 h-5" />
                            <span className="text-sm font-medium">Share</span>
                          </button>
                        </div>
                        
                        <div className="flex gap-1">
                          <button className="p-1 text-gray-400 hover:text-red-500">
                            ❤️
                          </button>
                          <button className="p-1 text-gray-400 hover:text-primary-500">
                            👍
                          </button>
                          <button className="p-1 text-gray-400 hover:text-yellow-500">
                            😂
                          </button>
                          <button className="p-1 text-gray-400 hover:text-purple-500">
                            😮
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}