'use client'

import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import LanguageToggle from '@/components/LanguageToggle'
import FeedPost from '@/components/FeedPost'
import FeedSearch from '@/components/FeedSearch'
import { 
  ChatBubbleLeftRightIcon, 
  PhotoIcon,
  LinkIcon,
  CalendarDaysIcon,
  MapPinIcon
} from '@heroicons/react/24/outline'

// Mock feed posts data
const mockPosts = [
  {
    id: '1',
    authorName: 'Maria Santos',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1ac?w=100&h=100&fit=crop&crop=face&auto=format',
    authorRole: 'Community Leader',
    content: 'Just attended the most amazing Fado night at A Toca! The music was incredible and I met so many wonderful people. #FadoNight #PortugueseCulture',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=400&fit=crop&auto=format',
    createdAt: '2 hours ago',
    likes: 24,
    comments: 5,
    shares: 3,
    hashtags: ['FadoNight', 'PortugueseCulture'],
    linkedEvent: {
      id: 'event1',
      title: 'Noite de Fado & Vinho Verde',
      date: 'Tonight, 7:30 PM',
      location: 'A Toca Restaurant, Stockwell'
    }
  },
  {
    id: '2',
    authorName: 'Carlos Oliveira',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face&auto=format',
    authorRole: 'Business Owner',
    content: 'Found this amazing pastelaria in Shoreditch that reminds me of home! Their pastéis de nata are authentic and delicious. Check it out!',
    imageUrl: 'https://images.unsplash.com/photo-1574329818413-10376febd3f0?w=600&h=400&fit=crop&auto=format',
    createdAt: '5 hours ago',
    likes: 18,
    comments: 3,
    shares: 2,
    hashtags: ['Pastelaria', 'Shoreditch', 'Food'],
    linkedBusiness: {
      id: 'business1',
      name: 'Casa do Pão',
      category: 'Café & Bakery'
    }
  },
  {
    id: '3',
    authorName: 'Ana Pereira',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face&auto=format',
    authorRole: 'Book Club Organizer',
    content: 'Looking forward to tonight\'s Portuguese Book Club meeting! We\'re discussing "O Guarani" by José de Alencar. Anyone interested in joining? 📚',
    createdAt: '1 day ago',
    likes: 12,
    comments: 7,
    shares: 4,
    hashtags: ['BookClub', 'PortugueseLiterature', 'Reading'],
    linkedEvent: {
      id: 'event2',
      title: 'Portuguese Book Club',
      date: 'Tonight, 7:00 PM',
      location: 'Champor-Champor Restaurant, Elephant & Castle'
    }
  }
]

// Translations for demonstration
const translations = {
  en: {
    title: 'LusoTown Community Feed',
    subtitle: 'Share updates, connect with others, and stay in the loop with the latest from our Portuguese community in London',
    createPost: 'Create Post',
    placeholder: 'What\'s happening in your Lusophone world?',
    postPlaceholder: 'Share an update...',
    events: 'Events',
    businesses: 'Businesses',
    posts: 'Posts'
  },
  pt: {
    title: 'Feed da Comunidade LusoTown',
    subtitle: 'Compartilhe atualizações, conecte-se com outros e mantenha-se informado sobre as últimas novidades da nossa comunidade portuguesa em Londres',
    createPost: 'Criar Publicação',
    placeholder: 'O que está acontecendo no seu mundo lusófono?',
    postPlaceholder: 'Compartilhe uma atualização...',
    events: 'Eventos',
    businesses: 'Negócios',
    posts: 'Publicações'
  }
}

export default function FeedDemo() {
  const { language } = useLanguage()
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [newPost, setNewPost] = useState('')
  const [posts, setPosts] = useState(mockPosts)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState(0)

  const t = translations[language]

  const handleCreatePost = () => {
    if (newPost.trim()) {
      const post = {
        id: `post-${Date.now()}`,
        authorName: 'You',
        authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face&auto=format',
        authorRole: 'Community Member',
        content: newPost,
        createdAt: 'Just now',
        likes: 0,
        comments: 0,
        shares: 0,
        hashtags: [],
        linkedEvent: {
          id: '',
          title: '',
          date: '',
          location: ''
        }
      }
      setPosts([post, ...posts])
      setNewPost('')
      setShowCreatePost(false)
    }
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    // In a real implementation, this would filter the posts
  }

  const handleFilter = (filters: any) => {
    // Count active filters
    const count = Object.values(filters).filter(value => 
      value !== '' && value !== null && value !== undefined && 
      !(Array.isArray(value) && value.length === 0)
    ).length
    
    setActiveFilters(count)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{t.title}</h1>
          <p className="text-lg text-gray-600 mb-6">{t.subtitle}</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => setShowCreatePost(true)}
              className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 shadow-lg"
            >
              {t.createPost}
            </button>
            
            <LanguageToggle />
          </div>
        </div>

        {/* Search */}
        <FeedSearch 
          onSearch={handleSearch}
          onFilter={handleFilter}
          currentQuery={searchQuery}
          activeFilters={activeFilters}
        />

        {/* Create Post Modal */}
        {showCreatePost && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{t.createPost}</h3>
                  <button 
                    onClick={() => setShowCreatePost(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-400 to-secondary-400 flex items-center justify-center text-white font-bold">
                    Y
                  </div>
                  <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder={t.placeholder}
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                    rows={4}
                  />
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-500 hover:text-primary-500 hover:bg-primary-50 rounded-lg">
                      <PhotoIcon className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-primary-500 hover:bg-primary-50 rounded-lg">
                      <LinkIcon className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-primary-500 hover:bg-primary-50 rounded-lg">
                      <CalendarDaysIcon className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-primary-500 hover:bg-primary-50 rounded-lg">
                      <MapPinIcon className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <button
                    onClick={handleCreatePost}
                    disabled={!newPost.trim()}
                    className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Feed Posts */}
        <div className="space-y-6">
          {posts.map((post) => (
            <FeedPost
              key={post.id}
              id={post.id}
              authorName={post.authorName}
              authorAvatar={post.authorAvatar}
              authorRole={post.authorRole}
              content={post.content}
              imageUrl={post.imageUrl}
              createdAt={post.createdAt}
              likes={post.likes}
              comments={post.comments}
              shares={post.shares}
              hashtags={post.hashtags}
              linkedEvent={post.linkedEvent}
              linkedBusiness={post.linkedBusiness}
            />
          ))}
        </div>

        {/* Language Toggle Explanation */}
        <div className="mt-12 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Language Toggle Feature</h3>
          <p className="text-gray-600 mb-4">
            The language toggle allows users to switch between English and Portuguese views of the feed. 
            This feature helps our multilingual community engage with content in their preferred language.
          </p>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white font-bold">
                EN
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">English View</h4>
                <p className="text-sm text-gray-600">Default view for most users</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                PT
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Portuguese View</h4>
                <p className="text-sm text-gray-600">For users who prefer Portuguese</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}