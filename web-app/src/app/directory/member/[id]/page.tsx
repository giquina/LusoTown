'use client'
import Image from 'next/image'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { authService, User } from '@/lib/auth'
import { directoryService } from '@/lib/directory'
import { connectionService, UserProfile } from '@/lib/connections'
import { 
  ArrowLeft,
  MapPin,
  Calendar,
  Heart,
  Users,
  Crown,
  Star,
  UserPlus,
  MessageCircle,
  Camera,
  Award,
  Clock,
  Activity,
  Globe,
  Shield,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  Share,
  Flag,
  MoreVertical,
  Sparkles
} from 'lucide-react'

export default function MemberProfile() {
  const params = useParams()
  const router = useRouter()
  const memberId = params.id as string
  
  const [user, setUser] = useState<User | null>(null)
  const [member, setMember] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isConnected, setIsConnected] = useState(false)
  const [connectionRequestSent, setConnectionRequestSent] = useState(false)
  const [mutualConnections, setMutualConnections] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState<'about' | 'photos' | 'activity'>('about')

  useEffect(() => {
    const currentUser = authService.getCurrentUser()
    if (!currentUser) {
      router.push('/login')
      return
    }
    
    loadMemberData(currentUser, memberId)
  }, [router, memberId])

  const loadMemberData = async (currentUser: User, memberId: string) => {
    try {
      const [memberData, connections, mutuals] = await Promise.all([
        directoryService.getMemberById(memberId, currentUser.id),
        connectionService.getConnections(currentUser.id),
        connectionService.getMutualConnections(currentUser.id, memberId)
      ])
      
      if (!memberData) {
        router.push('/directory')
        return
      }
      
      setUser(currentUser)
      setMember(memberData)
      setIsConnected(connections.some(c => c.id === memberId))
      setMutualConnections(mutuals)
    } catch (error) {
      console.error('Error loading member data:', error)
      router.push('/directory')
    } finally {
      setLoading(false)
    }
  }

  const getMembershipBadge = (tier: string) => {
    const badges = {
      free: { icon: <Users className="w-4 h-4" />, color: 'bg-gray-100 text-gray-600', label: 'Free Member' },
      core: { icon: <Star className="w-4 h-4" />, color: 'bg-[#FF6B6B] text-white', label: 'Core Member' },
      premium: { icon: <Crown className="w-4 h-4" />, color: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white', label: 'Premium Member' }
    }
    return badges[tier as keyof typeof badges] || badges.free
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInDays = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    
    if (diffInDays < 1) return 'Today'
    if (diffInDays < 7) return `${Math.floor(diffInDays)} days ago`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`
    
    return `${Math.floor(diffInDays / 365)} years ago`
  }

  const handleSendConnection = async () => {
    if (!user || !member || isConnected || connectionRequestSent) return
    
    try {
      const result = await connectionService.sendConnectionRequest(
        user.id,
        member.id,
        `Hi ${member.name}! I'd love to connect with you through LusoTown.`
      )
      
      if (result.success) {
        setConnectionRequestSent(true)
        alert('Connection request sent!')
      } else {
        alert(result.message)
      }
    } catch (error) {
      console.error('Error sending connection request:', error)
      alert('Error sending connection request')
    }
  }

  const handleSendMessage = () => {
    if (!member) return
    router.push(`/chat/direct/${member.id}`)
  }

  const canSendMessage = () => {
    if (!member) return false
    if (member.privacy.allowMessages === 'everyone') return true
    if (member.privacy.allowMessages === 'premium' && user?.membershipTier === 'premium') return true
    if (member.privacy.allowMessages === 'connections' && isConnected) return true
    return false
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#FF6B6B]"></div>
      </div>
    )
  }

  if (!user || !member) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Member Not Found</h1>
          <p className="text-gray-600 mb-6">
            This member's profile is not available or has been removed.
          </p>
          <button
            onClick={() => router.push('/directory')}
            className="btn-primary"
          >
            Back to Directory
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <button
            onClick={() => router.push('/directory')}
            className="flex items-center space-x-2 text-gray-600 hover:text-[#FF6B6B] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Directory</span>
          </button>
        </div>

        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          {/* Cover Photo */}
          <div className="h-48 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] relative">
            <div className="absolute inset-0 bg-black/20"></div>
          </div>

          {/* Profile Info */}
          <div className="relative px-6 pb-6">
            {/* Profile Picture */}
            <div className="absolute -top-16 left-6">
              <div className="w-24 h-24 bg-white rounded-full p-1">
                <div className="w-full h-full bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {member.profileImage ? (
                    <Image 
                      src={member.profileImage} 
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    member.name.split(' ').map(n => n[0]).join('')
                  )}
                </div>
              </div>
              {member.isOnline && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-white flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              )}
            </div>

            {/* Profile Actions */}
            <div className="flex justify-end pt-4 space-x-3">
              <button
                onClick={handleSendConnection}
                disabled={isConnected || connectionRequestSent}
                className={`px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors ${
                  isConnected 
                    ? 'bg-green-100 text-green-700 cursor-default'
                    : connectionRequestSent
                      ? 'bg-yellow-100 text-yellow-700 cursor-default'
                      : 'bg-[#FF6B6B] text-white hover:bg-[#e55a5a]'
                }`}
              >
                {isConnected ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Connected</span>
                  </>
                ) : connectionRequestSent ? (
                  <>
                    <Clock className="w-4 h-4" />
                    <span>Request Sent</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>Connect</span>
                  </>
                )}
              </button>

              {canSendMessage() && (
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-[#4ECDC4] text-white rounded-lg hover:bg-[#45b7b8] transition-colors font-medium flex items-center space-x-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Message</span>
                </button>
              )}

              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                <Share className="w-4 h-4" />
                <span>Share</span>
              </button>

              <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            {/* Basic Info */}
            <div className="mt-4 ml-32">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{member.name}</h1>
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-sm font-medium ${getMembershipBadge(member.membershipTier).color}`}>
                  {getMembershipBadge(member.membershipTier).icon}
                  <span>{getMembershipBadge(member.membershipTier).label}</span>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-gray-600 mb-3">
                {member.privacy.showAge && (
                  <>
                    <span>{member.age} years old</span>
                    <span>•</span>
                  </>
                )}
                {member.privacy.showLocation && (
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{member.location}</span>
                  </div>
                )}
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {formatTimeAgo(member.joinedAt)}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-6 mb-4">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="font-semibold text-gray-900">{member.connectionsCount}</span>
                  <span className="text-gray-600">connections</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="font-semibold text-gray-900">{member.eventsAttended}</span>
                  <span className="text-gray-600">events attended</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Camera className="w-4 h-4 text-gray-400" />
                  <span className="font-semibold text-gray-900">{member.photos.length}</span>
                  <span className="text-gray-600">photos</span>
                </div>
              </div>

              {/* Bio */}
              <p className="text-gray-700 mb-4">{member.bio}</p>

              {/* Verification Status */}
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center space-x-1">
                  {member.verification.emailVerified ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                  <span className="text-sm text-gray-600">Email</span>
                </div>
                <div className="flex items-center space-x-1">
                  {member.verification.photoVerified ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                  <span className="text-sm text-gray-600">Photo</span>
                </div>
                {member.verification.backgroundChecked && (
                  <div className="flex items-center space-x-1">
                    <Shield className="w-4 h-4 text-primary-500" />
                    <span className="text-sm text-gray-600">Background Check</span>
                  </div>
                )}
              </div>

              {/* Mutual Connections */}
              {mutualConnections.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Sparkles className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-medium text-gray-900">
                      {mutualConnections.length} mutual connection{mutualConnections.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="flex -space-x-2">
                    {mutualConnections.slice(0, 5).map(mutual => (
                      <div
                        key={mutual.id}
                        className="w-8 h-8 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                        title={mutual.name}
                      >
                        {mutual.profileImage ? (
                          <Image 
                            src={mutual.profileImage} 
                            alt={mutual.name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          mutual.name.split(' ').map((n: string) => n[0]).join('')
                        )}
                      </div>
                    ))}
                    {mutualConnections.length > 5 && (
                      <div className="w-8 h-8 bg-gray-300 rounded-full border-2 border-white flex items-center justify-center text-gray-600 text-xs font-bold">
                        +{mutualConnections.length - 5}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'about', label: 'About', icon: <Users className="w-4 h-4" /> },
                { id: 'photos', label: 'Photos', icon: <Camera className="w-4 h-4" /> },
                { id: 'activity', label: 'Activity', icon: <Activity className="w-4 h-4" /> }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-[#FF6B6B] text-[#FF6B6B]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'about' && (
              <div className="space-y-6">
                {/* Interests */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {member.interests.map(interest => (
                      <span
                        key={interest}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 cursor-pointer"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                {member.badges.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Achievements</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {member.badges.map(badge => (
                        <div
                          key={badge.id}
                          className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="text-2xl">{badge.icon}</div>
                          <div>
                            <div className="font-medium text-gray-900">{badge.name}</div>
                            <div className="text-sm text-gray-600">{badge.description}</div>
                            <div className="text-xs text-gray-500">
                              Earned {formatTimeAgo(badge.earnedAt)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Looking For */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Looking For</h3>
                  <div className="flex items-center space-x-2">
                    <Heart className="w-5 h-5 text-[#FF6B6B]" />
                    <span className="text-gray-700 capitalize">
                      {member.preferences.lookingFor === 'all' ? 'New friends, activity partners, and networking' : member.preferences.lookingFor.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'photos' && (
              <div>
                {member.photos.length === 0 ? (
                  <div className="text-center py-12">
                    <Camera className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No photos yet</h3>
                    <p className="text-gray-600">
                      {member.name.split(' ')[0]} hasn't shared any photos.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {member.photos.map(photo => (
                      <div key={photo.id} className="group relative">
                        <Image 
                          src={photo.url}
                          alt={photo.caption}
                          className="w-full h-48 object-cover rounded-lg group-hover:opacity-90 transition-opacity"
                        />
                        {photo.caption && (
                          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 rounded-b-lg">
                            <p className="text-sm">{photo.caption}</p>
                          </div>
                        )}
                        <div className="absolute top-2 right-2 flex items-center space-x-1 bg-black/50 text-white px-2 py-1 rounded text-sm">
                          <Heart className="w-3 h-3" />
                          <span>{photo.likes}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="space-y-4">
                <div className="text-center py-12">
                  <Activity className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Activity Feed</h3>
                  <p className="text-gray-600">
                    Recent activity from {member.name.split(' ')[0]} will appear here.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}