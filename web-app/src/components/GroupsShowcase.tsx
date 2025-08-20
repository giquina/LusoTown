'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ROUTES } from '@/config/routes'
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
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="bg-white rounded-3xl shadow-xl border border-gray-100/50 overflow-hidden hover:shadow-2xl transition-all duration-500 group relative"
    >
      {/* Group Image */}
      <div className="h-48 sm:h-52 bg-gradient-to-br from-secondary-500 via-primary-500 to-accent-500 relative overflow-hidden">
        {group.image_url ? (
          <Image
            src={group.image_url}
            alt={group.name}
            fill 
            sizes="(max-width: 768px) 100vw, 400px" 
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary-500/80 via-primary-500/60 to-accent-500/80"></div>
            <div className="relative z-10 text-center text-white">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto mb-4 border border-white/30 shadow-2xl">
                <UserGroupIcon className="w-10 h-10 text-white" />
              </div>
              <div className="text-sm font-medium opacity-90 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
                Portuguese Community
              </div>
            </div>
          </div>
        )}

        {/* Category Badge */}
        {group.category_info && (
          <div className="absolute top-4 left-4">
            <span className={`inline-flex items-center px-4 py-2 rounded-2xl text-sm font-semibold text-white backdrop-blur-md border border-white/30 shadow-xl ${group.category_info.color_class || 'bg-primary-600/90'}`}>
              {language === 'pt' ? group.category_info.name_pt : group.category_info.name_en}
            </span>
          </div>
        )}

        {/* Member Count Badge */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/40 shadow-lg">
          <div className="flex items-center gap-2">
            <UsersIcon className="w-4 h-4 text-secondary-600" />
            <span className="text-sm font-bold text-gray-900">{group.current_member_count}</span>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-secondary-600 transition-colors duration-300 line-clamp-1">
          {group.name}
        </h3>
        <p className="text-gray-600 mb-6 text-base leading-relaxed line-clamp-2">
          {group.description}
        </p>

        {/* Group Metadata - Enhanced Mobile Layout */}
        <div className="space-y-3 mb-6">
          {group.london_borough && (
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="w-8 h-8 bg-secondary-100 rounded-xl flex items-center justify-center">
                <MapPinIcon className="w-4 h-4 text-secondary-600" />
              </div>
              <span className="font-medium">{group.london_borough}</span>
            </div>
          )}
          {group.language_preference && group.language_preference !== 'both' && (
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="w-8 h-8 bg-accent-100 rounded-xl flex items-center justify-center">
                <GlobeAltIcon className="w-4 h-4 text-accent-600" />
              </div>
              <span className="font-medium">
                {group.language_preference === 'pt-pt' ? 'Português (PT)' : 
                 group.language_preference === 'pt-br' ? 'Português (BR)' : 
                 group.language_preference.charAt(0).toUpperCase() + group.language_preference.slice(1)}
              </span>
            </div>
          )}
        </div>

        {/* Cultural Focus Indicators - Improved Mobile Design */}
        {group.cultural_focus && (
          <div className="flex flex-wrap gap-2 mb-6">
            {group.cultural_focus.preserves_heritage && (
              <span className="inline-flex items-center gap-2 text-sm bg-gradient-to-r from-coral-100 to-accent-100 text-coral-700 px-4 py-2 rounded-2xl font-medium border border-coral-200/50">
                🇵🇹 Culture
              </span>
            )}
            {group.cultural_focus.professional_networking && (
              <span className="inline-flex items-center gap-2 text-sm bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 px-4 py-2 rounded-2xl font-medium border border-primary-200/50">
                💼 Business
              </span>
            )}
          </div>
        )}

        <Link
          href={`/groups/${group.id}`}
          className="inline-flex items-center gap-3 w-full bg-gradient-to-r from-secondary-500 via-primary-500 to-accent-500 text-white font-semibold px-6 py-4 rounded-2xl hover:from-secondary-600 hover:via-primary-600 hover:to-accent-600 transition-all duration-300 group-hover:scale-105 shadow-xl hover:shadow-2xl text-center justify-center min-h-[44px]"
        >
            Join Group
          <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  )

  if (loading || featuredGroups.length === 0) {
    return null // Don't show section if no groups or loading
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 via-secondary-50/30 to-accent-50/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-secondary-200/40 via-accent-100/30 to-coral-100/30 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-tr from-primary-200/40 via-secondary-100/30 to-accent-100/30 rounded-full opacity-50"></div>
        <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-secondary-400/50 rounded-full opacity-40"></div>
        <div className="absolute top-3/4 right-1/3 w-4 h-4 bg-accent-400/50 rounded-full"></div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-secondary-50/80 via-accent-50/60 to-coral-50/60 border border-secondary-200/40 rounded-3xl px-8 py-4 shadow-xl mb-8 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-red-500 animate-pulse shadow-sm"></div>
              <UserGroupIcon className="w-5 h-5 text-secondary-600" />
              <span className="text-sm font-bold bg-gradient-to-r from-secondary-600 via-primary-600 to-accent-600 bg-clip-text text-transparent">
                Portuguese Community Groups
              </span>
            </div>
            <div className="w-2 h-2 bg-secondary-400 rounded-full animate-pulse"></div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight"
          >
            Find Your Portuguese
            <span className="block bg-gradient-to-r from-secondary-600 via-primary-600 to-accent-600 bg-clip-text text-transparent">
              Community
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl sm:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium"
          >
            Connect with Portuguese speakers across London & UK. From business networking 
            to cultural events, discover groups that match your interests and make lasting friendships.
          </motion.p>
        </div>

        {/* Featured Groups - Mobile-First Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mb-16">
          {featuredGroups.map((group, index) => renderGroupCard(group, index))}
        </div>

        {/* Call to Action - Enhanced Mobile Design */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-secondary-600 via-primary-600 to-accent-600 rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-white/10">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Ready to Connect?
            </h3>
            <p className="text-lg sm:text-xl opacity-95 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join Portuguese speakers who share your interests and build lasting friendships in the U.K. & UK.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={ROUTES.groups}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-secondary-600 font-bold rounded-2xl hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl group min-h-[44px]"
              >
                <UserGroupIcon className="w-6 h-6" />
                Browse Groups
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href={ROUTES.groupsCreate}
                className="inline-flex items-center gap-3 px-8 py-4 border-2 border-white text-white font-bold rounded-2xl hover:bg-white hover:text-secondary-600 transition-all duration-300 shadow-xl hover:shadow-2xl min-h-[44px]"
              >
                Create Group
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Stats - Mobile-Enhanced Design */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8"
        >
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100/50 text-center group hover:shadow-2xl transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <UserGroupIcon className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-secondary-600 mb-2">15+</div>
            <div className="text-gray-600 font-medium">Active Groups</div>
          </div>
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100/50 text-center group hover:shadow-2xl transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <UsersIcon className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-primary-600 mb-2">200+</div>
            <div className="text-gray-600 font-medium">Community Members</div>
          </div>
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100/50 text-center group hover:shadow-2xl transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-coral-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <HeartIcon className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-accent-600 mb-2">50+</div>
            <div className="text-gray-600 font-medium">Weekly Meetups</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}