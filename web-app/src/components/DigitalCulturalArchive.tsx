'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGlobalPortuguese } from '@/context/GlobalPortugueseContext'
import { useLanguage } from '@/context/LanguageContext'
import { 
  CulturalItem, 
  PortugueseCountry,
  CulturalPreservationProject 
} from '@/types/GlobalPortugueseExpansion'

interface DigitalArchiveItem {
  id: string
  title: string
  description: string
  type: 'document' | 'photo' | 'audio' | 'video' | 'artifact' | 'recipe' | 'story' | 'music' | 'dance' | 'craft'
  origin: {
    country: PortugueseCountry
    region: string
    city?: string
  }
  dateCreated: Date
  dateUploaded: Date
  contributor: {
    name: string
    relationship: 'family' | 'community' | 'researcher' | 'organization'
    contact?: string
  }
  culturalSignificance: string
  historicalPeriod: string
  language: 'portuguese' | 'english' | 'other'
  tags: string[]
  preservationStatus: 'excellent' | 'good' | 'fair' | 'poor' | 'endangered'
  accessLevel: 'public' | 'community' | 'family' | 'restricted'
  metadata: {
    fileSize?: number
    duration?: number
    dimensions?: string
    format: string
  }
  relatedItems: string[]
  views: number
  downloads: number
  likes: number
  shares: number
  verified: boolean
  culturalContext: string
  modernRelevance: string
  preservationNotes?: string
}

interface DigitalCulturalArchiveProps {
  showUploadInterface?: boolean
  enableContributions?: boolean
  focusType?: 'all' | 'family' | 'community' | 'historical'
  maxItems?: number
}

export default function DigitalCulturalArchive({ 
  showUploadInterface = true,
  enableContributions = true,
  focusType = 'all',
  maxItems = 20
}: DigitalCulturalArchiveProps) {
  const { currentCountry, formatDate } = useGlobalPortuguese()
  const { t } = useLanguage()

  const [selectedCategory, setSelectedCategory] = useState<'all' | 'documents' | 'photos' | 'audio' | 'video' | 'recipes' | 'stories'>('all')
  const [selectedOrigin, setSelectedOrigin] = useState<PortugueseCountry | 'all'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'date' | 'popularity' | 'relevance'>('date')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<DigitalArchiveItem | null>(null)
  const [filteredItems, setFilteredItems] = useState<DigitalArchiveItem[]>([])

  // Mock archive data
  const mockArchiveItems: DigitalArchiveItem[] = [
    {
      id: 'azorean-family-recipes-1920',
      title: 'Azorean Family Recipes Collection (1920s)',
      description: 'Handwritten recipe book passed down through four generations of the Medeiros family from São Miguel, Azores',
      type: 'recipe',
      origin: {
        country: 'portugal',
        region: 'Azores',
        city: 'Ponta Delgada'
      },
      dateCreated: new Date('1925-03-15'),
      dateUploaded: new Date('2025-07-10'),
      contributor: {
        name: 'Maria Medeiros Santos',
        relationship: 'family',
        contact: 'maria.santos@email.com'
      },
      culturalSignificance: 'Preserves traditional Azorean cooking methods and ingredients before modern adaptation',
      historicalPeriod: '1920s-1940s',
      language: 'portuguese',
      tags: ['azorean cuisine', 'family recipes', 'traditional cooking', 'heritage preservation'],
      preservationStatus: 'good',
      accessLevel: 'public',
      metadata: {
        format: 'PDF',
        fileSize: 15000000
      },
      relatedItems: ['azorean-festival-photos', 'traditional-cooking-videos'],
      views: 2450,
      downloads: 340,
      likes: 189,
      shares: 67,
      verified: true,
      culturalContext: 'Recipes reflect pre-immigration Azorean culinary traditions, using local ingredients and methods passed down orally',
      modernRelevance: 'These recipes help modern Azorean diaspora maintain connection to their culinary heritage',
      preservationNotes: 'Original handwritten pages digitized at 600 DPI, Portuguese transcription included'
    },
    {
      id: 'fado-recordings-coimbra-1950s',
      title: 'Rare Coimbra Fado Recordings (1950s)',
      description: 'Collection of previously unreleased Coimbra Fado recordings featuring local artists from the University of Coimbra tradition',
      type: 'audio',
      origin: {
        country: 'portugal',
        region: 'Centro',
        city: 'Coimbra'
      },
      dateCreated: new Date('1955-11-20'),
      dateUploaded: new Date('2025-06-25'),
      contributor: {
        name: 'Centro de Estudos de Fado de Coimbra',
        relationship: 'organization'
      },
      culturalSignificance: 'Documents the distinct Coimbra Fado tradition practiced by university students',
      historicalPeriod: '1950s',
      language: 'portuguese',
      tags: ['fado', 'coimbra', 'university tradition', 'portuguese music', 'cultural heritage'],
      preservationStatus: 'fair',
      accessLevel: 'public',
      metadata: {
        format: 'MP3',
        duration: 3600,
        fileSize: 180000000
      },
      relatedItems: ['fado-sheet-music', 'coimbra-photos'],
      views: 8920,
      downloads: 1250,
      likes: 456,
      shares: 203,
      verified: true,
      culturalContext: 'Coimbra Fado differs from Lisbon Fado with its academic tradition and specific performance customs',
      modernRelevance: 'Helps preserve and teach authentic Coimbra Fado style to new generations of musicians'
    },
    {
      id: 'portuguese-immigration-letters-usa',
      title: 'Portuguese Immigration Letters to USA (1960s)',
      description: 'Personal correspondence between Portuguese families during the wave of immigration to the United States',
      type: 'document',
      origin: {
        country: 'portugal',
        region: 'Norte',
        city: 'Braga'
      },
      dateCreated: new Date('1963-05-10'),
      dateUploaded: new Date('2025-08-01'),
      contributor: {
        name: 'Portuguese American Historical Society',
        relationship: 'organization'
      },
      culturalSignificance: 'Provides firsthand accounts of Portuguese immigration experience and family separation',
      historicalPeriod: '1960s',
      language: 'portuguese',
      tags: ['immigration', 'family history', 'diaspora', 'personal correspondence', 'usa'],
      preservationStatus: 'excellent',
      accessLevel: 'community',
      metadata: {
        format: 'PDF',
        fileSize: 25000000
      },
      relatedItems: ['immigration-photos', 'diaspora-stories'],
      views: 1870,
      downloads: 420,
      likes: 156,
      shares: 89,
      verified: true,
      culturalContext: 'Letters reveal emotional aspects of immigration, family bonds, and cultural preservation efforts',
      modernRelevance: 'Helps modern diaspora understand their family immigration stories and cultural identity'
    },
    {
      id: 'azulejo-tile-patterns-database',
      title: 'Traditional Portuguese Azulejo Patterns Database',
      description: 'Comprehensive collection of traditional azulejo tile patterns from across Portugal, digitized for preservation',
      type: 'photo',
      origin: {
        country: 'portugal',
        region: 'Centro',
        city: 'Óbidos'
      },
      dateCreated: new Date('1600-01-01'),
      dateUploaded: new Date('2025-07-20'),
      contributor: {
        name: 'Museu Nacional do Azulejo',
        relationship: 'organization'
      },
      culturalSignificance: 'Preserves traditional Portuguese ceramic art forms and architectural decoration methods',
      historicalPeriod: '16th-18th centuries',
      language: 'portuguese',
      tags: ['azulejo', 'ceramics', 'traditional art', 'architecture', 'patterns'],
      preservationStatus: 'excellent',
      accessLevel: 'public',
      metadata: {
        format: 'JPEG',
        dimensions: '4000x4000',
        fileSize: 45000000
      },
      relatedItems: ['architecture-photos', 'ceramic-techniques'],
      views: 5640,
      downloads: 890,
      likes: 234,
      shares: 156,
      verified: true,
      culturalContext: 'Azulejo represents unique Portuguese ceramic art tradition with Moorish and European influences',
      modernRelevance: 'Patterns used by contemporary artists and architects in modern Portuguese design'
    },
    {
      id: 'brazilian-portuguese-folklore-tales',
      title: 'Brazilian Portuguese Folklore Tales Collection',
      description: 'Oral folklore tales from Brazilian Portuguese communities, recorded to preserve storytelling traditions',
      type: 'story',
      origin: {
        country: 'brazil',
        region: 'Minas Gerais',
        city: 'Belo Horizonte'
      },
      dateCreated: new Date('1800-01-01'),
      dateUploaded: new Date('2025-05-30'),
      contributor: {
        name: 'Fundação Cultural Brasileira-Portuguesa',
        relationship: 'organization'
      },
      culturalSignificance: 'Preserves oral tradition and folklore unique to Brazilian Portuguese communities',
      historicalPeriod: '19th-20th centuries',
      language: 'portuguese',
      tags: ['folklore', 'oral tradition', 'storytelling', 'brazilian culture', 'community heritage'],
      preservationStatus: 'good',
      accessLevel: 'public',
      metadata: {
        format: 'MP3',
        duration: 7200,
        fileSize: 360000000
      },
      relatedItems: ['brazilian-music', 'cultural-ceremonies'],
      views: 3210,
      downloads: 580,
      likes: 167,
      shares: 94,
      verified: true,
      culturalContext: 'Tales blend Portuguese storytelling tradition with Brazilian cultural elements',
      modernRelevance: 'Used in cultural education programs to teach Brazilian Portuguese heritage'
    },
    {
      id: 'cape-verdean-morna-sheet-music',
      title: 'Traditional Cape Verdean Morna Sheet Music',
      description: 'Collection of traditional morna music compositions from Cape Verde, transcribed and preserved',
      type: 'music',
      origin: {
        country: 'cape-verde',
        region: 'Santiago',
        city: 'Praia'
      },
      dateCreated: new Date('1930-01-01'),
      dateUploaded: new Date('2025-06-15'),
      contributor: {
        name: 'Instituto do Patrimônio Cultural Cabo Verde',
        relationship: 'organization'
      },
      culturalSignificance: 'Preserves the unique Cape Verdean musical tradition that blends Portuguese and African influences',
      historicalPeriod: '1930s-1960s',
      language: 'portuguese',
      tags: ['morna', 'cape verdean music', 'traditional music', 'sheet music', 'cultural preservation'],
      preservationStatus: 'good',
      accessLevel: 'public',
      metadata: {
        format: 'PDF',
        fileSize: 12000000
      },
      relatedItems: ['cape-verdean-recordings', 'cultural-instruments'],
      views: 1890,
      downloads: 320,
      likes: 98,
      shares: 45,
      verified: true,
      culturalContext: 'Morna represents Cape Verdean cultural identity and connection to Portuguese musical heritage',
      modernRelevance: 'Enables modern musicians to learn and perform authentic Cape Verdean music'
    }
  ]

  // Mock preservation projects
  const mockPreservationProjects: CulturalPreservationProject[] = [
    {
      id: 'global-fado-preservation',
      name: 'Global Fado Heritage Preservation Project',
      description: 'Comprehensive digital archive of Fado performances, sheet music, and historical documentation from Portuguese communities worldwide',
      type: 'digitization',
      targetCulture: {
        id: 'fado-tradition',
        name: 'Fado Musical Tradition',
        description: 'Traditional Portuguese musical expression recognized by UNESCO',
        origin: 'Portugal',
        significance: 'UNESCO Intangible Cultural Heritage',
        preservationStatus: 'thriving'
      },
      countries: ['portugal', 'brazil', 'usa', 'canada', 'france'],
      participants: 450,
      fundingRequired: {
        amount: 250000,
        currency: 'EUR'
      },
      timeline: '18 months',
      expectedImpact: 'Preserve and make accessible over 5,000 Fado recordings and performances from global Portuguese communities',
      preservationGoals: [
        'Digitize rare Fado recordings',
        'Create searchable database',
        'Enable global access',
        'Support Fado education programs'
      ],
      measurableOutcomes: [
        '5,000+ recordings digitized',
        '100+ hours of educational content',
        '50+ community workshops',
        '10,000+ online users'
      ],
      partnerOrganizations: []
    },
    {
      id: 'diaspora-family-stories',
      name: 'Portuguese Diaspora Family Stories Archive',
      description: 'Collection and preservation of personal family stories, photos, and documents from Portuguese diaspora communities',
      type: 'documentation',
      targetCulture: {
        id: 'diaspora-stories',
        name: 'Portuguese Diaspora Heritage',
        description: 'Personal and family stories of Portuguese immigration and cultural preservation',
        origin: 'Global Portuguese Communities',
        significance: 'Preserves individual and family cultural identity',
        preservationStatus: 'endangered'
      },
      countries: ['usa', 'canada', 'uk', 'australia', 'south-africa'],
      participants: 1200,
      fundingRequired: {
        amount: 150000,
        currency: 'EUR'
      },
      timeline: '24 months',
      expectedImpact: 'Preserve 2,500+ family stories and 10,000+ historical photos from Portuguese diaspora',
      preservationGoals: [
        'Record elder testimonies',
        'Digitize family photographs',
        'Document immigration journeys',
        'Preserve cultural traditions'
      ],
      measurableOutcomes: [
        '2,500+ family stories recorded',
        '10,000+ photos digitized',
        '500+ video testimonies',
        '100+ community events'
      ],
      partnerOrganizations: []
    }
  ]

  useEffect(() => {
    let filtered = mockArchiveItems

    if (selectedCategory !== 'all') {
      const typeMap = {
        'documents': 'document',
        'photos': 'photo', 
        'audio': 'audio',
        'video': 'video',
        'recipes': 'recipe',
        'stories': 'story'
      }
      filtered = filtered.filter(item => item.type === typeMap[selectedCategory])
    }

    if (selectedOrigin !== 'all') {
      filtered = filtered.filter(item => item.origin.country === selectedOrigin)
    }

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Sort items
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return b.dateUploaded.getTime() - a.dateUploaded.getTime()
        case 'popularity':
          return b.views - a.views
        case 'relevance':
          return b.likes - a.likes
        default:
          return 0
      }
    })

    setFilteredItems(filtered.slice(0, maxItems))
  }, [selectedCategory, selectedOrigin, searchTerm, sortBy, maxItems])

  const getTypeIcon = (type: string) => {
    const icons = {
      document: '📄',
      photo: '📷',
      audio: '🎵',
      video: '🎬',
      artifact: '🏺',
      recipe: '🍲',
      story: '📚',
      music: '🎼',
      dance: '💃',
      craft: '🎨'
    }
    return icons[type as keyof typeof icons] || '📄'
  }

  const getPreservationStatusColor = (status: string) => {
    const colors = {
      excellent: 'bg-green-100 text-green-800',
      good: 'bg-blue-100 text-blue-800',
      fair: 'bg-yellow-100 text-yellow-800',
      poor: 'bg-orange-100 text-orange-800',
      endangered: 'bg-red-100 text-red-800'
    }
    return colors[status as keyof typeof colors] || 'bg-secondary-100 text-secondary-800'
  }

  const UploadModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={() => setShowUploadModal(false)}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Contribute to Cultural Archive</h2>
            <button
              onClick={() => setShowUploadModal(false)}
              className="text-gray-400 hover:text-secondary-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">Item Title</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:ring-2 focus:ring-primary-500"
                placeholder="Enter a descriptive title for your cultural item"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">Description</label>
              <textarea
                rows={4}
                className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:ring-2 focus:ring-primary-500"
                placeholder="Provide detailed description including historical context and significance"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Item Type</label>
                <select className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:ring-2 focus:ring-primary-500">
                  <option value="document">Document</option>
                  <option value="photo">Photo</option>
                  <option value="audio">Audio</option>
                  <option value="video">Video</option>
                  <option value="recipe">Recipe</option>
                  <option value="story">Story</option>
                  <option value="music">Music</option>
                  <option value="artifact">Artifact</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Origin Country</label>
                <select className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:ring-2 focus:ring-primary-500">
                  <option value="portugal">Portugal</option>
                  <option value="brazil">Brazil</option>
                  <option value="usa">USA</option>
                  <option value="canada">Canada</option>
                  <option value="uk">United Kingdom</option>
                  <option value="france">France</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">Cultural Significance</label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:ring-2 focus:ring-primary-500"
                placeholder="Explain the cultural importance and historical context of this item"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">Tags (comma-separated)</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:ring-2 focus:ring-primary-500"
                placeholder="e.g., azores, recipes, family tradition, heritage"
              />
            </div>

            <div className="border-2 border-dashed border-secondary-300 rounded-lg p-8 text-center">
              <div className="text-4xl mb-4">📁</div>
              <p className="text-secondary-600 mb-2">Upload your cultural item</p>
              <p className="text-sm text-gray-500">Drag and drop files here, or click to browse</p>
              <button className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                Choose Files
              </button>
            </div>

            <div className="flex space-x-4">
              <button className="flex-1 bg-gradient-to-r from-green-600 via-red-500 to-yellow-500 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-all">
                Submit Contribution
              </button>
              <button
                onClick={() => setShowUploadModal(false)}
                className="flex-1 bg-secondary-200 text-secondary-800 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )

  const ItemModal = ({ item }: { item: DigitalArchiveItem }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={() => setSelectedItem(null)}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-3xl">{getTypeIcon(item.type)}</span>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{item.title}</h2>
                  <p className="text-secondary-600">{item.origin.city}, {item.origin.region}</p>
                </div>
              </div>
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${getPreservationStatusColor(item.preservationStatus)}`}>
                {item.preservationStatus} condition
              </span>
            </div>
            <button
              onClick={() => setSelectedItem(null)}
              className="text-gray-400 hover:text-secondary-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-secondary-700">{item.description}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Cultural Significance</h3>
                <p className="text-secondary-700">{item.culturalSignificance}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Cultural Context</h3>
                <p className="text-secondary-700">{item.culturalContext}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Modern Relevance</h3>
                <p className="text-secondary-700">{item.modernRelevance}</p>
              </div>

              {item.preservationNotes && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Preservation Notes</h3>
                  <p className="text-sm text-secondary-600 bg-gray-50 rounded-lg p-3">{item.preservationNotes}</p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-secondary-600">Created:</span>
                    <span className="font-medium">{formatDate(item.dateCreated)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-600">Period:</span>
                    <span className="font-medium">{item.historicalPeriod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-600">Language:</span>
                    <span className="font-medium">{item.language}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-600">Access:</span>
                    <span className="font-medium">{item.accessLevel}</span>
                  </div>
                  {item.verified && (
                    <div className="flex justify-between">
                      <span className="text-secondary-600">Status:</span>
                      <span className="font-medium text-action-600 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Verified
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Contributor</h3>
                <div className="space-y-1 text-sm">
                  <p className="font-medium">{item.contributor.name}</p>
                  <p className="text-secondary-600 capitalize">{item.contributor.relationship}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Engagement</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-secondary-600">Views:</span>
                    <span className="font-medium">{item.views.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-600">Downloads:</span>
                    <span className="font-medium">{item.downloads.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-600">Likes:</span>
                    <span className="font-medium">{item.likes.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-600">Shares:</span>
                    <span className="font-medium">{item.shares.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 bg-primary-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors">
                  Download
                </button>
                <button className="flex-1 bg-action-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Digital Portuguese Cultural Archive
        </h1>
        <p className="text-xl text-secondary-600 max-w-4xl mx-auto mb-6">
          Preserving Portuguese heritage through digital documentation - family recipes, historical documents, 
          traditional music, oral stories, and cultural artifacts from Portuguese communities worldwide
        </p>
        
        {showUploadInterface && enableContributions && (
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-gradient-to-r from-green-600 via-red-500 to-yellow-500 text-white font-semibold py-3 px-8 rounded-lg hover:shadow-lg transition-all inline-flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Contribute to Archive
          </button>
        )}
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="text-3xl font-bold text-primary-600 mb-2">{mockArchiveItems.length.toLocaleString()}</div>
          <div className="text-sm text-secondary-600">Archived Items</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="text-3xl font-bold text-action-600 mb-2">15</div>
          <div className="text-sm text-secondary-600">Countries Represented</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="text-3xl font-bold text-purple-600 mb-2">{mockPreservationProjects.length}</div>
          <div className="text-sm text-secondary-600">Active Preservation Projects</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="text-3xl font-bold text-coral-600 mb-2">1,650</div>
          <div className="text-sm text-secondary-600">Community Contributors</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Search & Filter</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">Search</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search archive..."
              className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as any)}
              className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Categories</option>
              <option value="documents">Documents</option>
              <option value="photos">Photos</option>
              <option value="audio">Audio</option>
              <option value="video">Video</option>
              <option value="recipes">Recipes</option>
              <option value="stories">Stories</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">Origin</label>
            <select
              value={selectedOrigin}
              onChange={(e) => setSelectedOrigin(e.target.value as any)}
              className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Origins</option>
              <option value="portugal">Portugal</option>
              <option value="brazil">Brazil</option>
              <option value="usa">USA</option>
              <option value="canada">Canada</option>
              <option value="uk">United Kingdom</option>
              <option value="cape-verde">Cape Verde</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:ring-2 focus:ring-primary-500"
            >
              <option value="date">Latest Added</option>
              <option value="popularity">Most Viewed</option>
              <option value="relevance">Most Liked</option>
            </select>
          </div>
        </div>
      </div>

      {/* Archive Items */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all cursor-pointer"
            onClick={() => setSelectedItem(item)}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getTypeIcon(item.type)}</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 line-clamp-2">{item.title}</h3>
                    <p className="text-sm text-secondary-600">{item.origin.city}, {item.origin.region}</p>
                  </div>
                </div>
                {item.verified && (
                  <svg className="w-5 h-5 text-action-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>

              <p className="text-secondary-700 text-sm mb-4 line-clamp-3">{item.description}</p>

              <div className="mb-4">
                <span className={`px-2 py-1 text-xs font-medium rounded ${getPreservationStatusColor(item.preservationStatus)}`}>
                  {item.preservationStatus}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {item.tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs rounded">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center text-sm text-secondary-600">
                <span>{formatDate(item.dateUploaded)}</span>
                <div className="flex items-center space-x-4">
                  <span>👁️ {item.views}</span>
                  <span>❤️ {item.likes}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Preservation Projects */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">Active Preservation Projects</h2>
        <div className="grid lg:grid-cols-2 gap-8">
          {mockPreservationProjects.map(project => (
            <div key={project.id} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{project.name}</h3>
                  <p className="text-secondary-700 mb-4">{project.description}</p>
                </div>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  project.type === 'digitization' ? 'bg-blue-100 text-blue-800' :
                  project.type === 'documentation' ? 'bg-green-100 text-green-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {project.type}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-secondary-600">Timeline</p>
                  <p className="font-semibold">{project.timeline}</p>
                </div>
                <div>
                  <p className="text-sm text-secondary-600">Participants</p>
                  <p className="font-semibold">{project.participants}</p>
                </div>
                <div>
                  <p className="text-sm text-secondary-600">Countries</p>
                  <p className="font-semibold">{project.countries.length}</p>
                </div>
                <div>
                  <p className="text-sm text-secondary-600">Funding Goal</p>
                  <p className="font-semibold">{project.fundingRequired.amount.toLocaleString()} {project.fundingRequired.currency}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-secondary-600 mb-2">Expected Impact:</p>
                <p className="text-sm text-secondary-700">{project.expectedImpact}</p>
              </div>

              <div className="flex space-x-3">
                <button className="flex-1 bg-gradient-to-r from-green-600 via-red-500 to-yellow-500 text-white font-semibold py-2 px-4 rounded-lg hover:shadow-lg transition-all">
                  Support Project
                </button>
                <button className="px-4 py-2 border border-secondary-300 text-secondary-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showUploadModal && <UploadModal />}
        {selectedItem && <ItemModal item={selectedItem} />}
      </AnimatePresence>
    </div>
  )
}