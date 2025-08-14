'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { authService, User } from '@/lib/auth'
import { forumsService, ForumCategory } from '@/lib/forums'
import { 
  ArrowLeft,
  Crown,
  Star,
  Users,
  Tag,
  X,
  Plus,
  AlertCircle,
  CheckCircle,
  MessageSquare
} from 'lucide-react'

export default function CreateTopic() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [categories, setCategories] = useState<ForumCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({
    categoryId: '',
    title: '',
    description: '',
    tags: [] as string[]
  })
  const [currentTag, setCurrentTag] = useState('')
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    const currentUser = authService.getCurrentUser()
    if (!currentUser) {
      router.push('/login')
      return
    }
    
    loadData(currentUser)
  }, [router])

  const loadData = async (currentUser: User) => {
    try {
      const categoriesData = await forumsService.getCategories(currentUser.membershipTier)
      setUser(currentUser)
      setCategories(categoriesData)
    } catch (error) {
      console.error('Error loading categories:', error)
    } finally {
      setLoading(false)
    }
  }

  const getMembershipBadge = (tier: string) => {
    const badges = {
      free: { icon: <Users className="w-3 h-3" />, color: 'bg-gray-100 text-gray-600', label: 'Free' },
      core: { icon: <Star className="w-3 h-3" />, color: 'bg-[#FF6B6B] text-white', label: 'Core' },
      premium: { icon: <Crown className="w-3 h-3" />, color: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white', label: 'Premium' }
    }
    return badges[tier as keyof typeof badges] || badges.free
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    
    if (!formData.categoryId) {
      newErrors.categoryId = 'Please select a category'
    }
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    } else if (formData.title.trim().length < 10) {
      newErrors.title = 'Title must be at least 10 characters'
    } else if (formData.title.trim().length > 200) {
      newErrors.title = 'Title must be less than 200 characters'
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    } else if (formData.description.trim().length < 20) {
      newErrors.description = 'Description must be at least 20 characters'
    } else if (formData.description.trim().length > 2000) {
      newErrors.description = 'Description must be less than 2000 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const addTag = () => {
    const tag = currentTag.trim().toLowerCase()
    if (tag && !formData.tags.includes(tag) && formData.tags.length < 5) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }))
      setCurrentTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user || !validateForm()) return
    
    setSubmitting(true)
    
    try {
      const result = await forumsService.createTopic(
        formData.categoryId,
        formData.title.trim(),
        formData.description.trim(),
        formData.tags,
        user
      )
      
      if (result.success && result.topic) {
        router.push(`/forums/topic/${result.topic.id}`)
      } else {
        alert(result.error || 'Error creating topic')
      }
    } catch (error) {
      console.error('Error creating topic:', error)
      alert('Error creating topic')
    } finally {
      setSubmitting(false)
    }
  }

  const canAccessCategory = (category: ForumCategory) => {
    if (!user) return false
    const tierLevels = { free: 0, core: 1, premium: 2 }
    return tierLevels[user.membershipTier] >= tierLevels[category.membershipRequired]
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#FF6B6B]"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <button
            onClick={() => router.push('/forums')}
            className="flex items-center space-x-2 text-gray-600 hover:text-[#FF6B6B] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Forums</span>
          </button>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Topic</h1>
          <p className="text-gray-600">
            Start a meaningful conversation with the LusoTown community
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Category *
              </label>
              <select
                value={formData.categoryId}
                onChange={(e) => setFormData(prev => ({ ...prev, categoryId: e.target.value }))}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent ${
                  errors.categoryId ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Select a category...</option>
                {categories.map(category => (
                  <option 
                    key={category.id} 
                    value={category.id}
                    disabled={!canAccessCategory(category)}
                  >
                    {category.icon} {category.name}
                    {!canAccessCategory(category) && ` (${category.membershipRequired === 'premium' ? 'Premium' : 'Core'} required)`}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.categoryId}</span>
                </p>
              )}
              
              {/* Category Info */}
              {formData.categoryId && (() => {
                const selectedCategory = categories.find(c => c.id === formData.categoryId)
                return selectedCategory ? (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-2xl">{selectedCategory.icon}</span>
                      <div>
                        <h3 className="font-medium text-gray-900">{selectedCategory.name}</h3>
                        <div className={`flex items-center space-x-1 px-2 py-1 rounded text-xs ${getMembershipBadge(selectedCategory.membershipRequired).color}`}>
                          {getMembershipBadge(selectedCategory.membershipRequired).icon}
                          <span>{getMembershipBadge(selectedCategory.membershipRequired).label} Required</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{selectedCategory.description}</p>
                  </div>
                ) : null
              })()}
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Topic Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Write a clear, descriptive title..."
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent ${
                  errors.title ? 'border-red-300' : 'border-gray-300'
                }`}
                maxLength={200}
              />
              <div className="flex justify-between items-center mt-1">
                {errors.title ? (
                  <p className="text-sm text-red-600 flex items-center space-x-1">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.title}</span>
                  </p>
                ) : (
                  <p className="text-sm text-gray-500">
                    Make it clear and engaging - this is what people will see first
                  </p>
                )}
                <span className="text-sm text-gray-500">
                  {formData.title.length}/200
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Provide more details about your topic. What would you like to discuss? What questions do you have?"
                rows={6}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent resize-none ${
                  errors.description ? 'border-red-300' : 'border-gray-300'
                }`}
                maxLength={2000}
              />
              <div className="flex justify-between items-center mt-1">
                {errors.description ? (
                  <p className="text-sm text-red-600 flex items-center space-x-1">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.description}</span>
                  </p>
                ) : (
                  <p className="text-sm text-gray-500">
                    Be specific and provide context to get the best responses
                  </p>
                )}
                <span className="text-sm text-gray-500">
                  {formData.description.length}/2000
                </span>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Tags (Optional)
              </label>
              
              {/* Add Tag Input */}
              <div className="flex space-x-2 mb-3">
                <input
                  type="text"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addTag()
                    }
                  }}
                  placeholder="Add a tag..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent"
                  maxLength={20}
                  disabled={formData.tags.length >= 5}
                />
                <button
                  type="button"
                  onClick={addTag}
                  disabled={!currentTag.trim() || formData.tags.length >= 5}
                  className="px-4 py-2 bg-[#FF6B6B] text-white rounded-lg hover:bg-[#e55a5a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>

              {/* Current Tags */}
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.tags.map(tag => (
                    <span
                      key={tag}
                      className="flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      <Tag className="w-3 h-3" />
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:bg-gray-200 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              
              <p className="text-sm text-gray-500">
                Add up to 5 tags to help people find your topic. Use keywords related to your discussion.
              </p>
            </div>

            {/* Guidelines */}
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <MessageSquare className="w-5 h-5 text-primary-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-primary-900 mb-2">Community Guidelines</h4>
                  <ul className="text-sm text-primary-800 space-y-1">
                    <li>• Be respectful and kind to all community members</li>
                    <li>• Keep discussions relevant to the chosen category</li>
                    <li>• Use clear, descriptive titles and detailed descriptions</li>
                    <li>• Search existing topics before creating duplicates</li>
                    <li>• No spam, promotional content, or inappropriate material</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => router.push('/forums')}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-3 bg-[#FF6B6B] text-white rounded-lg hover:bg-[#e55a5a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Create Topic</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}