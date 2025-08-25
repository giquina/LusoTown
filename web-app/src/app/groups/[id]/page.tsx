'use client'
import Image from 'next/image'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  UsersIcon, 
  MapPinIcon, 
  GlobeAltIcon,
  CalendarIcon,
  ShieldCheckIcon,
  FlagIcon,
  ExclamationCircleIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { useLanguage } from '@/context/LanguageContext'
import { supabase, Group, GroupCategory, GroupJoinRequest } from '@/lib/supabase'
import GroupReportModal from '@/components/GroupReportModal'
import toast from 'react-hot-toast'

interface GroupWithDetails extends Group {
  category_info?: GroupCategory
  creator_profile?: {
    first_name: string
    last_name?: string
    profile_picture_url?: string
  }
}

interface PageProps {
  params: { id: string }
}


export default function GroupDetailPage({ params }: PageProps) {
  const router = useRouter()
  const { t, language } = useLanguage()
  const [group, setGroup] = useState<GroupWithDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [joinLoading, setJoinLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [isMember, setIsMember] = useState(false)
  const [joinRequest, setJoinRequest] = useState<GroupJoinRequest | null>(null)
  const [showReportModal, setShowReportModal] = useState(false)
  const [showJoinModal, setShowJoinModal] = useState(false)
  const [joinMessage, setJoinMessage] = useState('')

  useEffect(() => {
    if (params.id) {
      loadGroupDetails()
      checkMembershipStatus()
    }
  }, [params.id])

  const loadGroupDetails = async () => {
    try {
      setLoading(true)
      
      // Load group details
      const { data: groupData, error: groupError } = await supabase
        .from('groups')
        .select('*')
        .eq('id', params.id)
        .single()

      if (groupError) throw groupError

      // Load category info
      let categoryData = null
      if (groupData.category) {
        const { data } = await supabase
          .from('group_categories')
          .select('*')
          .eq('id', groupData.category)
          .single()
        categoryData = data
      }

      // Load creator profile
      const { data: creatorData } = await supabase
        .from('profiles')
        .select('first_name, last_name, profile_picture_url')
        .eq('id', groupData.created_by)
        .single()

      setGroup({
        ...groupData,
        category_info: categoryData,
        creator_profile: creatorData
      })

    } catch (error: any) {
      console.error('Error loading group:', error)
      if (error.code === 'PGRST116') {
        toast.error('Group not found')
        router.push('/groups')
      } else {
        toast.error('Failed to load group details')
      }
    } finally {
      setLoading(false)
    }
  }

  const checkMembershipStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Check if user is already a member
      const { data: memberData } = await supabase
        .from('group_members')
        .select('*')
        .eq('group_id', params.id)
        .eq('user_id', user.id)
        .single()

      setIsMember(!!memberData)

      // Check for pending join request if not a member
      if (!memberData) {
        const { data: requestData } = await supabase
          .from('group_join_requests')
          .select('*')
          .eq('group_id', params.id)
          .eq('user_id', user.id)
          .eq('status', 'pending')
          .single()

        setJoinRequest(requestData)
      }

    } catch (error) {
      console.error('Error checking membership:', error)
    }
  }

  const handleJoinGroup = async () => {
    if (!group) return

    try {
      setJoinLoading(true)
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError || !user) {
        toast.error('Please log in to join the group')
        return
      }

      if (group.is_private) {
        // Create join request for private groups
        const { error } = await supabase
          .from('group_join_requests')
          .insert([{
            group_id: group.id,
            user_id: user.id,
            message: joinMessage
          }])

        if (error) throw error

        setShowJoinModal(false)
        setJoinMessage('')
        toast.success('Join request sent! You\'ll be notified when it\'s reviewed.')
        checkMembershipStatus()
      } else {
        // Join public group directly
        const { error } = await supabase
          .from('group_members')
          .insert([{
            group_id: group.id,
            user_id: user.id,
            role: 'member'
          }])

        if (error) throw error

        toast.success('Successfully joined the group!')
        setIsMember(true)
        // Refresh group data to update member count
        loadGroupDetails()
      }
    } catch (error: any) {
      console.error('Error joining group:', error)
      toast.error(error.message || 'Failed to join group')
    } finally {
      setJoinLoading(false)
    }
  }

  const handleSaveGroup = () => {
    setIsSaved(!isSaved)
    toast.success(isSaved ? 'Removed from saved groups' : t('groups.saved'))
  }

  const handleReportGroup = () => {
    setShowReportModal(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!group) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <UsersIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Group not found</h2>
          <p className="text-gray-600 mb-6">This group may have been removed or doesn't exist.</p>
          <button
            onClick={() => router.push('/groups')}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Back to Groups
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="container-width py-12">
        <div className="max-w-4xl mx-auto">
          {/* Group Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8"
          >
            {/* Cover Image */}
            <div className="h-64 bg-gradient-to-r from-primary-500 to-secondary-500 relative">
              {group.image_url ? (
                <Image 
                  src={group.image_url}
                  alt={group.name}
                  fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <UsersIcon className="w-20 h-20 text-white opacity-60" />
                </div>
              )}
              
              {/* Actions */}
              <div className="absolute top-6 right-6 flex space-x-3">
                <button
                  onClick={handleSaveGroup}
                  className="p-3 bg-white/90 rounded-full hover:bg-white transition-colors"
                >
                  {isSaved ? (
                    <HeartSolidIcon className="w-6 h-6 text-red-500" />
                  ) : (
                    <HeartIcon className="w-6 h-6 text-gray-600" />
                  )}
                </button>
                <button
                  onClick={handleReportGroup}
                  className="p-3 bg-white/90 rounded-full hover:bg-white transition-colors"
                >
                  <FlagIcon className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Category Badge */}
              {group.category_info && (
                <div className="absolute bottom-6 left-6">
                  <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium text-white ${group.category_info.color_class || 'bg-primary-600'}`}>
                    {language === 'pt' ? group.category_info.name_pt : group.category_info.name_en}
                  </span>
                </div>
              )}
            </div>

            {/* Group Info */}
            <div className="p-8">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                <div className="flex-1 mb-6 lg:mb-0">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">{group.name}</h1>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {group.description}
                  </p>
                </div>

                {/* Join/Status Button */}
                <div className="flex flex-col space-y-3 lg:ml-8">
                  {isMember ? (
                    <div className="flex items-center px-6 py-3 bg-green-100 text-green-800 rounded-lg">
                      <ShieldCheckIcon className="w-5 h-5 mr-2" />
                      {t('groups.joined')}
                    </div>
                  ) : joinRequest ? (
                    <div className="flex items-center px-6 py-3 bg-yellow-100 text-yellow-800 rounded-lg">
                      <CalendarIcon className="w-5 h-5 mr-2" />
                      {t('groups.pending')}
                    </div>
                  ) : (
                    <button
                      onClick={group.is_private ? () => setShowJoinModal(true) : handleJoinGroup}
                      disabled={joinLoading}
                      className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {joinLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <UsersIcon className="w-5 h-5 mr-2" />
                          {t('groups.join')}
                        </>
                      )}
                    </button>
                  )}
                  
                  <div className="text-center text-sm text-gray-600">
                    {group.current_member_count} {group.current_member_count === 1 ? t('groups.member') : t('groups.members')}
                    {group.max_members && ` / ${group.max_members}`}
                  </div>
                </div>
              </div>

              {/* Group Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {/* Location */}
                {(group.london_borough || group.location) && (
                  <div className="flex items-start space-x-3">
                    <MapPinIcon className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900">Location</div>
                      <div className="text-gray-600">
                        {group.london_borough}
                        {group.location && group.london_borough && ', '}
                        {group.location}
                      </div>
                    </div>
                  </div>
                )}

                {/* Language */}
                {group.language_preference && (
                  <div className="flex items-start space-x-3">
                    <GlobeAltIcon className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900">Language</div>
                      <div className="text-gray-600">
                        {group.language_preference === 'both' && 'English & Lusophone'}
                        {group.language_preference === 'english' && 'English'}
                        {group.language_preference === 'portuguese' && 'Lusophone'}
                        {group.language_preference === 'pt-pt' && 'Português (Portugal)'}
                        {group.language_preference === 'pt-br' && 'Português (Brasil)'}
                      </div>
                    </div>
                  </div>
                )}

                {/* Meeting Frequency */}
                {group.meeting_frequency && (
                  <div className="flex items-start space-x-3">
                    <CalendarIcon className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900">Meetings</div>
                      <div className="text-gray-600">
                        {t(`frequency.${group.meeting_frequency}`)}
                      </div>
                    </div>
                  </div>
                )}

                {/* Lusophone Origin */}
                {group.portuguese_origin && group.portuguese_origin !== 'any' && (
                  <div className="flex items-start space-x-3">
                    <FlagIcon className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900">Lusophone Origin</div>
                      <div className="text-gray-600">
                        {t(`origin.${group.portuguese_origin}`)}
                      </div>
                    </div>
                  </div>
                )}

                {/* Verification Level */}
                {group.verification_level && group.verification_level !== 'none' && (
                  <div className="flex items-start space-x-3">
                    <ShieldCheckIcon className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900">Verification</div>
                      <div className="text-gray-600">
                        {t(`verification.${group.verification_level}`)}
                      </div>
                    </div>
                  </div>
                )}

                {/* Age Restrictions */}
                {group.age_restrictions && (group.age_restrictions.min_age || group.age_restrictions.max_age) && (
                  <div className="flex items-start space-x-3">
                    <UsersIcon className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900">Age Range</div>
                      <div className="text-gray-600">
                        {group.age_restrictions.min_age && `${group.age_restrictions.min_age}+`}
                        {group.age_restrictions.min_age && group.age_restrictions.max_age && ' - '}
                        {group.age_restrictions.max_age && `${group.age_restrictions.max_age}`}
                        {group.age_restrictions.professionals_welcome && ' (Professionals welcome)'}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Cultural Focus */}
              {group.cultural_focus && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Cultural Focus</h3>
                  <div className="flex flex-wrap gap-3">
                    {group.cultural_focus.preserves_heritage && (
                      <span className="inline-flex items-center px-3 py-2 rounded-full text-sm bg-yellow-100 text-yellow-800">
                        🇵🇹 Preserves Portuguese heritage
                      </span>
                    )}
                    {group.cultural_focus.professional_networking && (
                      <span className="inline-flex items-center px-3 py-2 rounded-full text-sm bg-green-100 text-green-800">
                        👨‍👩‍👧‍👦 Family-friendly activities
                      </span>
                    )}
                    {group.cultural_focus.traditional_activities && (
                      <span className="inline-flex items-center px-3 py-2 rounded-full text-sm bg-purple-100 text-purple-800">
                        🎭 Traditional Lusophone activities
                      </span>
                    )}
                    {group.cultural_focus.language_learning && (
                      <span className="inline-flex items-center px-3 py-2 rounded-full text-sm bg-secondary-100 text-secondary-800">
                        📚 Portuguese language learning
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Group Tags */}
              {group.group_tags && group.group_tags.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.group_tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Group Rules */}
              {group.rules && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Group Rules</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 whitespace-pre-wrap">{group.rules}</p>
                  </div>
                </div>
              )}

              {/* Contact Information */}
              {group.contact_info && Object.values(group.contact_info).some(v => v) && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {group.contact_info.email && (
                      <div className="flex items-center space-x-3">
                        <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                        <a
                          href={`mailto:${group.contact_info.email}`}
                          className="text-primary-600 hover:text-primary-700"
                        >
                          {group.contact_info.email}
                        </a>
                      </div>
                    )}
                    {group.contact_info.phone && (
                      <div className="flex items-center space-x-3">
                        <PhoneIcon className="w-5 h-5 text-gray-400" />
                        <a
                          href={`tel:${group.contact_info.phone}`}
                          className="text-primary-600 hover:text-primary-700"
                        >
                          {group.contact_info.phone}
                        </a>
                      </div>
                    )}
                    {group.contact_info.whatsapp && (
                      <div className="flex items-center space-x-3">
                        <ChatBubbleLeftRightIcon className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-700">WhatsApp: {group.contact_info.whatsapp}</span>
                      </div>
                    )}
                    {group.contact_info.telegram && (
                      <div className="flex items-center space-x-3">
                        <ChatBubbleLeftRightIcon className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-700">Telegram: {group.contact_info.telegram}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Created By */}
              {group.creator_profile && (
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold">
                      {group.creator_profile.first_name[0]}
                      {group.creator_profile.last_name && group.creator_profile.last_name[0]}
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Created by</div>
                      <div className="font-medium text-gray-900">
                        {group.creator_profile.first_name} {group.creator_profile.last_name}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Safety Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
          >
            <div className="flex items-start">
              <ExclamationCircleIcon className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
              <div className="text-sm text-yellow-800">
                <p className="font-medium mb-1">Community Safety</p>
                <p>
                  LusoTown groups are community-moderated. Report any inappropriate behavior or 
                  content that violates our community guidelines. We're committed to maintaining 
                  a safe, welcoming environment for all Portuguese speakers.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Join Private Group Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Join Private Group</h3>
            <p className="text-gray-600 mb-4">
              This is a private group. Please introduce yourself and explain why you'd like to join.
            </p>
            <textarea
              value={joinMessage}
              onChange={(e) => setJoinMessage(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent mb-4"
              placeholder="Tell the group admin why you'd like to join..."
            />
            <div className="flex space-x-3">
              <button
                onClick={() => setShowJoinModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleJoinGroup}
                disabled={joinLoading || !joinMessage.trim()}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {joinLoading ? 'Sending...' : 'Send Request'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      <GroupReportModal
        groupId={params.id}
        groupName={group?.name || ''}
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
      />
    </div>
  )
}
