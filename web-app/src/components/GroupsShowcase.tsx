'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  UsersIcon, 
  MapPinIcon, 
  ArrowRightIcon,
  UserGroupIcon,
  GlobeAltIcon,
  HeartIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { supabase, Group, GroupCategory } from '@/lib/supabase'

interface GroupWithCategory extends Group {
  category_info?: GroupCategory
}

export default function GroupsShowcase() {
  const { t, language } = useLanguage()
  const [featuredGroups, setFeaturedGroups] = useState<GroupWithCategory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadFeaturedGroups()
  }, [])

  const loadFeaturedGroups = async () => {
    try {
      // Load a few featured groups
      const { data, error } = await supabase
        .from('groups')
        .select('*')
        .eq('moderation_status', 'approved')
        .eq('is_active', true)
        .order('current_member_count', { ascending: false })
        .limit(3)

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

      setFeaturedGroups(groupsWithCategories)
    } catch (error) {
      console.error('Error loading featured groups:', error)
      // Fail silently on homepage
    } finally {
      setLoading(false)
    }
  }

  const renderGroupCard = (group: GroupWithCategory, index: number) => (
    <motion.div
      key={group.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105"
    >
      {/* Group Image */}
      <div className="h-40 bg-gradient-to-r from-primary-500 to-secondary-500 relative">
        {group.image_url ? (
          <img
            src={group.image_url}
            alt={group.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <UserGroupIcon className="w-12 h-12 text-white opacity-60" />
          </div>
        )}

        {/* Category Badge */}
        {group.category_info && (
          <div className="absolute top-3 left-3">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${group.category_info.color_class || 'bg-primary-600'}`}>
              {language === 'pt' ? group.category_info.name_pt : group.category_info.name_en}
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
          {group.name}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {group.description}
        </p>

        {/* Group Metadata */}
        <div className="space-y-1 mb-4">
          {group.london_borough && (
            <div className="flex items-center text-xs text-gray-500">
              <MapPinIcon className="w-3 h-3 mr-1" />
              {group.london_borough}
            </div>
          )}
          <div className="flex items-center text-xs text-gray-500">
            <UsersIcon className="w-3 h-3 mr-1" />
            {group.current_member_count} {group.current_member_count === 1 ? 'member' : 'members'}
          </div>
          {group.language_preference && group.language_preference !== 'both' && (
            <div className="flex items-center text-xs text-gray-500">
              <GlobeAltIcon className="w-3 h-3 mr-1" />
              {group.language_preference === 'pt-pt' ? 'Português (PT)' : 
               group.language_preference === 'pt-br' ? 'Português (BR)' : 
               group.language_preference.charAt(0).toUpperCase() + group.language_preference.slice(1)}
            </div>
          )}
        </div>

        {/* Cultural Focus Indicators */}
        {group.cultural_focus && (
          <div className="flex flex-wrap gap-1 mb-3">
            {group.cultural_focus.preserves_heritage && (
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                🇵🇹 Heritage
              </span>
            )}
            {group.cultural_focus.professional_networking && (
              <span className="text-xs bg-primary-100 text-primary-800 px-2 py-0.5 rounded">
                💼 Professional
              </span>
            )}
          </div>
        )}

        <Link
          href={`/groups/${group.id}`}
          className="inline-flex items-center text-primary-600 hover:text-primary-700 text-sm font-medium"
        >
          View Group
          <ArrowRightIcon className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </motion.div>
  )

  if (loading || featuredGroups.length === 0) {
    return null // Don't show section if no groups or loading
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-width px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary-50 text-primary-600 text-sm font-medium mb-4"
          >
            <UserGroupIcon className="w-4 h-4 mr-2" />
            Portuguese Community
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Join Portuguese Community
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Connect with Portuguese speakers who share your interests. From professional networking 
            to cultural preservation, find your community in London.
          </motion.p>
        </div>

        {/* Featured Groups */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {featuredGroups.map((group, index) => renderGroupCard(group, index))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/groups"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
            >
              <UserGroupIcon className="w-5 h-5 mr-2" />
              Browse All Groups
            </Link>
            <Link
              href="/groups/create"
              className="inline-flex items-center px-6 py-3 border border-primary-600 text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-colors"
            >
              Create Your Group
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600 mb-2">15+</div>
            <div className="text-gray-600">Active Groups</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary-600 mb-2">200+</div>
            <div className="text-gray-600">Group Members</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent-600 mb-2">50+</div>
            <div className="text-gray-600">Weekly Meetups</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}