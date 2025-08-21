'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  ChatBubbleLeftRightIcon, 
  MagnifyingGlassIcon, 
  MapPinIcon, 
  ClockIcon,
  UserGroupIcon,
  AcademicCapIcon,
  GlobeAltIcon,
  StarIcon,
  HeartIcon,
  CheckCircleIcon,
  CalendarDaysIcon,
  VideoCameraIcon,
  BookOpenIcon,
  LanguageIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import Footer from '@/components/Footer'

// Mock language exchange data
const mockExchanges = [
  {
    id: 1,
    title: 'Portuguese-English Coffee Chat',
    type: 'In-Person',
    location: 'Costa Coffee, Borough Market',
    time: 'Saturday 2:00 PM',
    duration: '1 hour',
    level: 'Beginner to Intermediate',
    description: 'Relaxed conversation practice over coffee. 30 minutes Portuguese, 30 minutes English.',
    participants: 8,
    maxParticipants: 12,
    organizer: {
      name: 'Sofia Pereira',
      rating: 4.9,
      reviews: 34,
      languages: ['Portuguese (Native)', 'English (Fluent)', 'Spanish (Basic)'],
      verified: true,
      teacher: true
    },
    topics: ['Daily Life', 'Travel', 'Food & Culture'],
    price: 'Free',
    featured: true,
    category: 'Conversation'
  },
  {
    id: 2,
    title: 'Business English for Portuguese Speakers',
    type: 'Online',
    location: 'Zoom Meeting',
    time: 'Tuesday 7:00 PM',
    duration: '90 minutes',
    level: 'Intermediate to Advanced',
    description: 'Focus on professional English skills for Portuguese speakers in London workplaces.',
    participants: 6,
    maxParticipants: 8,
    organizer: {
      name: 'James Wilson',
      rating: 4.8,
      reviews: 28,
      languages: ['English (Native)', 'Portuguese (Intermediate)'],
      verified: true,
      teacher: true
    },
    topics: ['Business Vocabulary', 'Presentations', 'Meetings'],
    price: '£15/session',
    featured: false,
    category: 'Professional'
  },
  {
    id: 3,
    title: 'Portuguese Culture & Language Walk',
    type: 'In-Person',
    location: 'Starting at Vauxhall Station',
    time: 'Sunday 11:00 AM',
    duration: '2 hours',
    level: 'All Levels',
    description: 'Explore Portuguese cultural sites in London while practicing both languages.',
    participants: 12,
    maxParticipants: 15,
    organizer: {
      name: 'Miguel Santos',
      rating: 4.9,
      reviews: 42,
      languages: ['Portuguese (Native)', 'English (Fluent)'],
      verified: true,
      teacher: false
    },
    topics: ['Culture', 'History', 'Portuguese Community'],
    price: '£10/session',
    featured: true,
    category: 'Cultural'
  },
  {
    id: 4,
    title: 'Advanced English Conversation Club',
    type: 'In-Person',
    location: 'LusoTown Community Center',
    time: 'Thursday 6:30 PM',
    duration: '1.5 hours',
    level: 'Advanced',
    description: 'Challenge yourself with advanced English topics and help others with Portuguese.',
    participants: 5,
    maxParticipants: 10,
    organizer: {
      name: 'Ana Rodriguez',
      rating: 4.7,
      reviews: 19,
      languages: ['Portuguese (Native)', 'English (Advanced)', 'French (Basic)'],
      verified: true,
      teacher: false
    },
    topics: ['Current Events', 'Literature', 'Philosophy'],
    price: '£5/session',
    featured: false,
    category: 'Advanced'
  },
  {
    id: 5,
    title: 'Family-Friendly Language Exchange',
    type: 'In-Person',
    location: 'Battersea Park',
    time: 'Saturday 10:00 AM',
    duration: '2 hours',
    level: 'All Levels',
    description: 'Perfect for families! Kids and adults practice languages together with games and activities.',
    participants: 8,
    maxParticipants: 12,
    organizer: {
      name: 'Família Silva',
      rating: 4.8,
      reviews: 15,
      languages: ['Portuguese (Native)', 'English (Intermediate)'],
      verified: true,
      teacher: false
    },
    topics: ['Family Life', 'Children\'s Activities', 'Education'],
    price: '£8/family',
    featured: false,
    category: 'Family'
  },
  {
    id: 6,
    title: 'Portuguese Grammar Workshop',
    type: 'Online',
    location: 'Google Meet',
    time: 'Wednesday 8:00 PM',
    duration: '1 hour',
    level: 'Beginner to Intermediate',
    description: 'Structured learning session focusing on Portuguese grammar for English speakers.',
    participants: 4,
    maxParticipants: 8,
    organizer: {
      name: 'Professor Carla Mendes',
      rating: 4.9,
      reviews: 56,
      languages: ['Portuguese (Native)', 'English (Fluent)', 'Italian (Intermediate)'],
      verified: true,
      teacher: true
    },
    topics: ['Grammar', 'Sentence Structure', 'Common Mistakes'],
    price: '£20/session',
    featured: true,
    category: 'Educational'
  }
]

const categories = ['All Categories', 'Conversation', 'Professional', 'Cultural', 'Advanced', 'Family', 'Educational']
const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced']
const types = ['All Types', 'In-Person', 'Online']

export default function LanguageExchangePage() {
  const { t } = useLanguage()
  const [exchanges, setExchanges] = useState(mockExchanges)
  const [filteredExchanges, setFilteredExchanges] = useState(mockExchanges)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [selectedLevel, setSelectedLevel] = useState('All Levels')
  const [selectedType, setSelectedType] = useState('All Types')
  const [showFreeOnly, setShowFreeOnly] = useState(false)
  const [savedExchanges, setSavedExchanges] = useState<number[]>([])

  // Filter exchanges based on criteria
  useEffect(() => {
    let filtered = exchanges

    if (searchQuery) {
      filtered = filtered.filter(exchange => 
        exchange.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exchange.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exchange.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    if (selectedCategory !== 'All Categories') {
      filtered = filtered.filter(exchange => exchange.category === selectedCategory)
    }

    if (selectedLevel !== 'All Levels') {
      filtered = filtered.filter(exchange => 
        exchange.level.toLowerCase().includes(selectedLevel.toLowerCase())
      )
    }

    if (selectedType !== 'All Types') {
      filtered = filtered.filter(exchange => exchange.type === selectedType)
    }

    if (showFreeOnly) {
      filtered = filtered.filter(exchange => exchange.price === 'Free')
    }

    setFilteredExchanges(filtered)
  }, [exchanges, searchQuery, selectedCategory, selectedLevel, selectedType, showFreeOnly])

  const toggleSaveExchange = (exchangeId: number) => {
    setSavedExchanges(prev => 
      prev.includes(exchangeId) 
        ? prev.filter(id => id !== exchangeId)
        : [...prev, exchangeId]
    )
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-coral-600 via-action-600 to-secondary-600 pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
                <ChatBubbleLeftRightIcon className="w-5 h-5 text-white" />
                <span className="text-white font-semibold">Portuguese-English Language Exchange</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Practice Languages Together
              </h1>
              
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                Connect with Portuguese and English speakers for language practice, cultural exchange, and new friendships in London
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">180+</div>
                  <div className="text-white/80">Active Members</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">25+</div>
                  <div className="text-white/80">Weekly Sessions</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">4.8</div>
                  <div className="text-white/80">Avg Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">94%</div>
                  <div className="text-white/80">Satisfaction</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="bg-white border-b border-secondary-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Search Bar */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -transecondary-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search language exchanges, topics, or locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-secondary-300 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent text-lg"
                />
              </div>
              <button className="bg-coral-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-coral-700 transition-colors whitespace-nowrap">
                Search Exchanges
              </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-transparent"
              >
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>

              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-transparent"
              >
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

              <label className="flex items-center gap-2 px-4 py-2 border border-secondary-300 rounded-lg cursor-pointer hover:bg-secondary-50">
                <input
                  type="checkbox"
                  checked={showFreeOnly}
                  onChange={(e) => setShowFreeOnly(e.target.checked)}
                  className="rounded text-coral-600 focus:ring-coral-500"
                />
                <span className="text-sm font-medium">Free Only</span>
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* Results Count */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-secondary-600">
            <span className="font-semibold text-gray-900">{filteredExchanges.length}</span> language exchanges found
            {searchQuery && <span> for "{searchQuery}"</span>}
          </p>
        </div>
      </section>

      {/* Exchange Listings */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredExchanges.map((exchange, index) => (
              <motion.div
                key={exchange.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`bg-white rounded-xl border ${exchange.featured ? 'border-coral-300 ring-2 ring-coral-100' : 'border-secondary-200'} p-6 shadow-sm hover:shadow-lg transition-all duration-300`}
              >
                {exchange.featured && (
                  <div className="inline-flex items-center gap-1 bg-coral-100 text-coral-700 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                    <CheckCircleIcon className="w-4 h-4" />
                    Featured Exchange
                  </div>
                )}

                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{exchange.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-secondary-600 mb-3">
                      <div className="flex items-center gap-1">
                        {exchange.type === 'Online' ? 
                          <VideoCameraIcon className="w-4 h-4" /> : 
                          <MapPinIcon className="w-4 h-4" />
                        }
                        <span>{exchange.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ClockIcon className="w-4 h-4" />
                        <span>{exchange.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleSaveExchange(exchange.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        savedExchanges.includes(exchange.id)
                          ? 'bg-coral-100 text-coral-600'
                          : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
                      }`}
                    >
                      <HeartIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <p className="text-secondary-700 mb-4 leading-relaxed">{exchange.description}</p>

                {/* Exchange Details */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-gray-500">Level:</span>
                    <span className="ml-2 font-medium">{exchange.level}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Duration:</span>
                    <span className="ml-2 font-medium">{exchange.duration}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Participants:</span>
                    <span className="ml-2 font-medium">{exchange.participants}/{exchange.maxParticipants}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Price:</span>
                    <span className="ml-2 font-medium text-coral-600">{exchange.price}</span>
                  </div>
                </div>

                {/* Topics */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {exchange.topics.map((topic, idx) => (
                    <span key={idx} className="bg-coral-100 text-coral-700 px-3 py-1 rounded-full text-sm">
                      {topic}
                    </span>
                  ))}
                </div>

                {/* Organizer Info */}
                <div className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-coral-600 rounded-full flex items-center justify-center text-white font-bold">
                      {exchange.organizer.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">{exchange.organizer.name}</span>
                        {exchange.organizer.verified && (
                          <CheckCircleIcon className="w-4 h-4 text-action-500" />
                        )}
                        {exchange.organizer.teacher && (
                          <AcademicCapIcon className="w-4 h-4 text-primary-500" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-secondary-600">
                        <StarIcon className="w-4 h-4 text-accent-500 fill-current" />
                        <span>{exchange.organizer.rating} ({exchange.organizer.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Languages */}
                <div className="mb-4">
                  <span className="text-sm text-gray-500 block mb-2">Languages:</span>
                  <div className="flex flex-wrap gap-1">
                    {exchange.organizer.languages.map((lang, idx) => (
                      <span key={idx} className="bg-secondary-100 text-secondary-700 px-2 py-1 rounded text-xs">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 text-coral-600 border border-coral-600 px-4 py-2 rounded-lg font-semibold hover:bg-coral-50 transition-colors">
                    View Details
                  </button>
                  <button className="flex-1 bg-coral-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-coral-700 transition-colors">
                    Join Exchange
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredExchanges.length === 0 && (
            <div className="text-center py-12">
              <ChatBubbleLeftRightIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No language exchanges found</h3>
              <p className="text-secondary-600">Try adjusting your search criteria or browse all categories</p>
            </div>
          )}
        </div>
      </section>

      {/* Create Exchange CTA */}
      <section className="bg-gradient-to-r from-coral-50 to-action-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Want to Start Your Own Exchange?
            </h2>
            <p className="text-lg text-secondary-600 mb-8">
              Create your own language exchange session and help others learn Portuguese or English
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-coral-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-coral-700 transition-colors">
                Create Exchange
              </button>
              <button className="border border-coral-600 text-coral-600 px-8 py-3 rounded-lg font-semibold hover:bg-coral-50 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}