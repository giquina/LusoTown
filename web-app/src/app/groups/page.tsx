'use client'
import Image from 'next/image'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  UsersIcon, 
  MapPinIcon, 
  GlobeAltIcon, 
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  HeartIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { useLanguage } from '@/context/LanguageContext'
import { supabase, Group, GroupCategory } from '@/lib/supabase'
import toast from 'react-hot-toast'

interface GroupWithCategory extends Group {
  category_info?: GroupCategory
}

export default function GroupsPage() {
  const { t, language } = useLanguage()
  const [groups, setGroups] = useState<GroupWithCategory[]>([])
  const [categories, setCategories] = useState<GroupCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedOrigin, setSelectedOrigin] = useState('')
  const [selectedBorough, setSelectedBorough] = useState('')
  const [savedGroups, setSavedGroups] = useState<Set<string>>(new Set())

  // Load data on component mount
  useEffect(() => {
    loadGroups()
    loadCategories()
  }, [])

  const loadGroups = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('groups')
        .select('*')
        .eq('moderation_status', 'approved')
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (error) throw error
      
      // Load category info for each group
      const groupsWithCategories = await Promise.all((data || []).map(async (group) => {
        if (group.category) {
          const { data: categoryData } = await supabase
            .from('group_categories')
            .select('*')
            .eq('id', group.category)
            .single()
          
          return { ...group, category_info: categoryData }
        }
        return group
      }))

      setGroups(groupsWithCategories)
    } catch (error) {
      console.error('Error loading groups:', error)
      toast.error('Failed to load groups')
    } finally {
      setLoading(false)
    }
  }

  const loadCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('group_categories')
        .select('*')
        .eq('is_active', true)
        .order('display_order')

      if (error) throw error
      setCategories(data || [])
    } catch (error) {
      console.error('Error loading categories:', error)
    }
  }

  const handleSaveGroup = (groupId: string) => {
    if (savedGroups.has(groupId)) {
      setSavedGroups(prev => {
        const newSet = new Set(prev)
        newSet.delete(groupId)
        return newSet
      })
      toast.success('Removed from saved groups')
    } else {
      setSavedGroups(prev => new Set(prev).add(groupId))
      toast.success(t('groups.saved'))
    }
  }

  // Filter groups based on search and filters
  const filteredGroups = groups.filter((group) => {
    const matchesSearch = !searchQuery || 
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description?.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = !selectedCategory || group.category === selectedCategory
    
    const matchesOrigin = !selectedOrigin || 
      group.portuguese_origin === selectedOrigin || 
      group.portuguese_origin === 'any'
    
    const matchesBorough = !selectedBorough || group.london_borough === selectedBorough

    return matchesSearch && matchesCategory && matchesOrigin && matchesBorough
  })

  const getUniqueValues = (field: keyof Group) => {
    return Array.from(new Set(groups.map(group => group[field]).filter(Boolean)))
  }

  const renderGroupCard = (group: GroupWithCategory) => {
    const isSaved = savedGroups.has(group.id)
    
    return (
      <motion.div
        key={group.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
      >
        {/* Group Image */}
        <div className="h-48 bg-gradient-to-r from-primary-500 to-secondary-500 relative">
          {group.image_url ? (
            <Image 
              src={group.image_url}
              alt={group.name}
              fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <UserGroupIcon className="w-16 h-16 text-white opacity-60" />
            </div>
          )}
          
          {/* Save Button */}
          <button
            onClick={() => handleSaveGroup(group.id)}
            className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
          >
            {isSaved ? (
              <HeartSolidIcon className="w-5 h-5 text-red-500" />
            ) : (
              <HeartIcon className="w-5 h-5 text-gray-600" />
            )}
          </button>

          {/* Category Badge */}
          {group.category_info && (
            <div className="absolute bottom-4 left-4">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white ${group.category_info.color_class || 'bg-primary-600'}`}>
                {language === 'pt' ? group.category_info.name_pt : group.category_info.name_en}
              </span>
            </div>
          )}
        </div>

        <div className="p-6">
          {/* Group Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
                {group.name}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {group.description}
              </p>
            </div>
          </div>

          {/* Group Metadata */}
          <div className="space-y-2 mb-4">
            {group.london_borough && (
              <div className="flex items-center text-sm text-gray-600">
                <MapPinIcon className="w-4 h-4 mr-2 text-gray-400" />
                {group.london_borough}
                {group.location && `, ${group.location}`}
              </div>
            )}

            <div className="flex items-center text-sm text-gray-600">
              <UsersIcon className="w-4 h-4 mr-2 text-gray-400" />
              {group.current_member_count} {group.current_member_count === 1 ? t('groups.member') : t('groups.members')}
              {group.max_members && ` / ${group.max_members}`}
            </div>

            {group.language_preference && group.language_preference !== 'both' && (
              <div className="flex items-center text-sm text-gray-600">
                <GlobeAltIcon className="w-4 h-4 mr-2 text-gray-400" />
                {group.language_preference === 'english' && 'English'}
                {group.language_preference === 'portuguese' && 'Portuguese'}
                {group.language_preference === 'pt-pt' && 'Português (Portugal)'}
                {group.language_preference === 'pt-br' && 'Português (Brasil)'}
              </div>
            )}

            {group.meeting_frequency && (
              <div className="flex items-center text-sm text-gray-600">
                <span className="capitalize">{t(`frequency.${group.meeting_frequency}`)}</span>
              </div>
            )}
          </div>

          {/* Group Tags */}
          {group.group_tags && group.group_tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {group.group_tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-600"
                >
                  {tag}
                </span>
              ))}
              {group.group_tags.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{group.group_tags.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Cultural Focus Indicators */}
          {group.cultural_focus && (
            <div className="flex flex-wrap gap-2 mb-4">
              {group.cultural_focus.preserves_heritage && (
                <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-800">
                  🇵🇹 Heritage
                </span>
              )}
              {group.cultural_focus.professional_networking && (
                <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-primary-100 text-primary-800">
                  💼 Professional
                </span>
              )}
              {group.cultural_focus.traditional_activities && (
                <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-purple-100 text-purple-800">
                  🎭 Traditional
                </span>
              )}
              {group.cultural_focus.language_learning && (
                <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-secondary-100 text-secondary-800">
                  📚 Language
                </span>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Link
              href={`/groups/${group.id}`}
              className="flex-1 bg-primary-600 text-white text-center py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
            >
              {t('groups.view')}
            </Link>
            <button
              onClick={() => handleSaveGroup(group.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isSaved
                  ? 'bg-red-100 text-red-700 hover:bg-red-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {isSaved ? 'Saved' : t('groups.save')}
            </button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="container-width px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary-50 text-primary-600 text-sm font-medium mb-4"
          >
            <UsersIcon className="w-4 h-4 mr-2" />
            {t('groups.title')}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            {t('groups.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 mb-8"
          >
            {t('groups.subtitle')}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/groups/create"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              {t('groups.create')}
            </Link>
          </motion.div>
        </div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-md p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search groups..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {language === 'pt' ? category.name_pt : category.name_en}
                </option>
              ))}
            </select>

            {/* Portuguese Origin Filter */}
            <select
              value={selectedOrigin}
              onChange={(e) => setSelectedOrigin(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">All Origins</option>
              <option value="portugal">{t('origin.portugal')}</option>
              <option value="brazil">{t('origin.brazil')}</option>
              <option value="angola">{t('origin.angola')}</option>
              <option value="mozambique">{t('origin.mozambique')}</option>
              <option value="cape-verde">{t('origin.cape-verde')}</option>
              <option value="mixed">{t('origin.mixed')}</option>
            </select>

            {/* Borough Filter */}
            <select
              value={selectedBorough}
              onChange={(e) => setSelectedBorough(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">All London</option>
              {getUniqueValues('london_borough').map((borough) => (
                <option key={String(borough)} value={String(borough)}>
                  {String(borough)}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Results Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-6"
        >
          <p className="text-gray-600">
            Showing {filteredGroups.length} of {groups.length} groups
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </motion.div>

        {/* Groups Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredGroups.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredGroups.map((group) => renderGroupCard(group))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center py-12"
          >
            <UserGroupIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No groups found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or create a new group.
            </p>
            <Link
              href="/groups/create"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              {t('groups.create')}
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  )
}