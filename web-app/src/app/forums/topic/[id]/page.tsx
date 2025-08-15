'use client'
import Image from 'next/image'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { authService, User } from '@/lib/auth'
import { forumsService, ForumTopic, ForumPost } from '@/lib/forums'
import { 
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  MessageCircle,
  Share,
  Flag,
  Eye,
  Clock,
  Pin,
  Lock,
  Crown,
  Star,
  Users,
  Tag,
  Send,
  Reply,
  Heart,
  Award,
  MoreVertical,
  Edit,
  Trash2
} from 'lucide-react'

interface PostComponentProps {
  post: ForumPost
  topic: ForumTopic
  user: User
  isReply?: boolean
  onReply: (postId: string) => void
  onVote: (postId: string, vote: 'up' | 'down') => void
}


const PostComponent: React.FC<PostComponentProps> = ({
  post,
  topic,
  user,
  isReply = false,
  onReply,
  onVote
}) => {
  const [showReplies, setShowReplies] = useState(true)
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [replyContent, setReplyContent] = useState('')

  const getMembershipBadge = (tier: string) => {
    const badges = {
      free: { icon: <Users className="w-3 h-3" />, color: 'bg-gray-100 text-gray-600', label: 'Free' },
      core: { icon: <Star className="w-3 h-3" />, color: 'bg-[#FF6B6B] text-white', label: 'Core' },
      premium: { icon: <Crown className="w-3 h-3" />, color: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white', label: 'Premium' }
    }
    return badges[tier as keyof typeof badges] || badges.free
  }

  const getRoleBadge = (role: string) => {
    if (role === 'admin') return <span className="px-1.5 py-0.5 bg-purple-100 text-purple-600 text-xs rounded font-medium">Admin</span>
    if (role === 'moderator') return <span className="px-1.5 py-0.5 bg-primary-100 text-primary-600 text-xs rounded font-medium">Mod</span>
    return null
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = (now.getTime() - date.getTime()) / (1000 * 60)
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${Math.floor(diffInMinutes)}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    if (diffInMinutes < 43200) return `${Math.floor(diffInMinutes / 1440)}d ago`
    
    return date.toLocaleDateString()
  }

  const handleReplySubmit = async () => {
    if (!replyContent.trim()) return
    
    try {
      await forumsService.createPost(topic.id, replyContent, user, post.id)
      setReplyContent('')
      setShowReplyForm(false)
      // In real app, would refresh the data
    } catch (error) {
      console.error('Error posting reply:', error)
    }
  }

  return (
    <div className={`bg-white rounded-lg ${isReply ? 'ml-8 mt-4 border-l-4 border-gray-200' : 'shadow-sm'} ${isReply ? 'p-4' : 'p-6'}`}>
      {/* Post Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {post.author.avatar ? (
              <Image 
                src={post.author.avatar} 
                alt={post.author.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              post.author.name.split(' ').map(n => n[0]).join('')
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h4 className="font-semibold text-gray-900">{post.author.name}</h4>
              {getRoleBadge(post.author.role)}
              <div className={`flex items-center space-x-1 px-1.5 py-0.5 rounded text-xs ${getMembershipBadge(post.author.membershipTier).color}`}>
                {getMembershipBadge(post.author.membershipTier).icon}
                <span>{getMembershipBadge(post.author.membershipTier).label}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
              <span>{post.author.totalPosts} posts</span>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <Award className="w-3 h-3" />
                <span>{post.author.reputation} reputation</span>
              </div>
              <span>•</span>
              <span>Member since {formatTimeAgo(post.author.joinedDate)}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          <span>{formatTimeAgo(post.createdAt)}</span>
          {post.editedAt && (
            <>
              <span>•</span>
              <span>Edited</span>
            </>
          )}
        </div>
      </div>

      {/* Post Content */}
      <div className="prose prose-gray max-w-none mb-4">
        <p className="whitespace-pre-wrap">{post.content}</p>
      </div>

      {/* Post Actions */}
      <div className="flex items-center justify-between border-t border-gray-100 pt-4">
        <div className="flex items-center space-x-4">
          {/* Vote buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onVote(post.id, 'up')}
              className={`flex items-center space-x-1 px-2 py-1 rounded hover:bg-green-50 transition-colors ${
                post.hasUserVoted === 'up' ? 'bg-green-50 text-green-600' : 'text-gray-500 hover:text-green-600'
              }`}
            >
              <ArrowUp className="w-4 h-4" />
              <span className="text-sm">{post.upvotes}</span>
            </button>
            <button
              onClick={() => onVote(post.id, 'down')}
              className={`flex items-center space-x-1 px-2 py-1 rounded hover:bg-red-50 transition-colors ${
                post.hasUserVoted === 'down' ? 'bg-red-50 text-red-600' : 'text-gray-500 hover:text-red-600'
              }`}
            >
              <ArrowDown className="w-4 h-4" />
              <span className="text-sm">{post.downvotes}</span>
            </button>
          </div>

          {/* Reply button */}
          <button
            onClick={() => setShowReplyForm(!showReplyForm)}
            className="flex items-center space-x-1 px-2 py-1 rounded hover:bg-primary-50 text-gray-500 hover:text-primary-600 transition-colors"
          >
            <Reply className="w-4 h-4" />
            <span className="text-sm">Reply</span>
          </button>

          {/* Report button */}
          <button className="flex items-center space-x-1 px-2 py-1 rounded hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors">
            <Flag className="w-4 h-4" />
            <span className="text-sm">Report</span>
          </button>
        </div>

        {/* More actions for post author */}
        {post.author.id === user.id && (
          <div className="flex items-center space-x-2">
            <button className="p-1 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-700">
              <Edit className="w-4 h-4" />
            </button>
            <button className="p-1 rounded hover:bg-red-100 text-gray-500 hover:text-red-600">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Reply Form */}
      {showReplyForm && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Write your reply..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent resize-none"
            rows={3}
          />
          <div className="flex items-center justify-end space-x-2 mt-2">
            <button
              onClick={() => setShowReplyForm(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleReplySubmit}
              disabled={!replyContent.trim()}
              className="px-4 py-2 bg-[#FF6B6B] text-white rounded-lg hover:bg-[#e55a5a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Post Reply</span>
            </button>
          </div>
        </div>
      )}

      {/* Nested Replies */}
      {post.replies && post.replies.length > 0 && (
        <div className="mt-4">
          <button
            onClick={() => setShowReplies(!showReplies)}
            className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800 mb-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>
              {showReplies ? 'Hide' : 'Show'} {post.replies.length} {post.replies.length === 1 ? 'reply' : 'replies'}
            </span>
          </button>
          
          {showReplies && (
            <div className="space-y-4">
              {post.replies.map(reply => (
                <PostComponent
                  key={reply.id}
                  post={reply}
                  topic={topic}
                  user={user}
                  isReply={true}
                  onReply={onReply}
                  onVote={onVote}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function TopicDetail() {
  const params = useParams()
  const router = useRouter()
  const topicId = params.id as string
  
  const [user, setUser] = useState<User | null>(null)
  const [topic, setTopic] = useState<ForumTopic | null>(null)
  const [posts, setPosts] = useState<ForumPost[]>([])
  const [loading, setLoading] = useState(true)
  const [newPostContent, setNewPostContent] = useState('')
  const [isFollowing, setIsFollowing] = useState(false)

  useEffect(() => {
    const currentUser = authService.getCurrentUser()
    if (!currentUser) {
      router.push('/login')
      return
    }
    
    loadTopicData(currentUser, topicId)
  }, [router, topicId])

  const loadTopicData = async (currentUser: User, topicId: string) => {
    try {
      const [topicData, postsData] = await Promise.all([
        forumsService.getTopicById(topicId),
        forumsService.getPosts(topicId)
      ])
      
      if (!topicData) {
        router.push('/forums')
        return
      }
      
      setUser(currentUser)
      setTopic(topicData)
      setPosts(postsData)
      setIsFollowing(topicData.isFollowing || false)
    } catch (error) {
      console.error('Error loading topic data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleVoteTopic = async (vote: 'up' | 'down') => {
    if (!user || !topic) return
    
    try {
      await forumsService.voteTopic(topic.id, user.id, vote)
      // In real app, would refresh the data
      if (vote === 'up') {
        setTopic({ ...topic, upvotes: topic.upvotes + 1, hasUserVoted: 'up' })
      } else {
        setTopic({ ...topic, downvotes: topic.downvotes + 1, hasUserVoted: 'down' })
      }
    } catch (error) {
      console.error('Error voting on topic:', error)
    }
  }

  const handleVotePost = async (postId: string, vote: 'up' | 'down') => {
    if (!user || !topic) return
    
    try {
      await forumsService.votePost(topic.id, postId, user.id, vote)
      // In real app, would refresh the data
      console.log(`Voted ${vote} on post ${postId}`)
    } catch (error) {
      console.error('Error voting on post:', error)
    }
  }

  const handleReply = (postId: string) => {
    console.log('Reply to post:', postId)
  }

  const handleNewPost = async () => {
    if (!user || !topic || !newPostContent.trim()) return
    
    if (topic.isLocked) {
      alert('This topic is locked for new posts.')
      return
    }
    
    try {
      await forumsService.createPost(topic.id, newPostContent, user)
      setNewPostContent('')
      // In real app, would refresh the data
      alert('Post created successfully!')
    } catch (error) {
      console.error('Error creating post:', error)
      alert('Error creating post')
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

  const getRoleBadge = (role: string) => {
    if (role === 'admin') return <span className="px-1.5 py-0.5 bg-purple-100 text-purple-600 text-xs rounded font-medium">Admin</span>
    if (role === 'moderator') return <span className="px-1.5 py-0.5 bg-primary-100 text-primary-600 text-xs rounded font-medium">Mod</span>
    return null
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = (now.getTime() - date.getTime()) / (1000 * 60)
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${Math.floor(diffInMinutes)}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    if (diffInMinutes < 43200) return `${Math.floor(diffInMinutes / 1440)}d ago`
    
    return date.toLocaleDateString()
  }

  const canAccessTopic = () => {
    if (!user || !topic) return false
    const tierLevels = { free: 0, core: 1, premium: 2 }
    return tierLevels[user.membershipTier] >= tierLevels[topic.membershipRequired]
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#FF6B6B]"></div>
      </div>
    )
  }

  if (!user || !topic || !canAccessTopic()) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <Crown className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Required</h1>
          <p className="text-gray-600 mb-6">
            This topic requires {topic?.membershipRequired === 'premium' ? 'Premium' : 'Core'} membership to view.
          </p>
          <button
            onClick={() => router.push('/pricing')}
            className="btn-primary"
          >
            Upgrade Membership
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
            onClick={() => router.push('/forums')}
            className="flex items-center space-x-2 text-gray-600 hover:text-[#FF6B6B] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Forums</span>
          </button>
        </div>

        {/* Topic Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 min-w-0">
              {/* Topic Status Indicators */}
              <div className="flex items-center space-x-2 mb-3">
                {topic.isPinned && (
                  <span className="flex items-center space-x-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                    <Pin className="w-3 h-3" />
                    <span>Pinned</span>
                  </span>
                )}
                {topic.isLocked && (
                  <span className="flex items-center space-x-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
                    <Lock className="w-3 h-3" />
                    <span>Locked</span>
                  </span>
                )}
                {topic.isAnnouncement && (
                  <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full font-medium">
                    Announcement
                  </span>
                )}
                <span className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getMembershipBadge(topic.membershipRequired).color}`}>
                  {getMembershipBadge(topic.membershipRequired).icon}
                  <span>{getMembershipBadge(topic.membershipRequired).label} Required</span>
                </span>
              </div>

              {/* Topic Title */}
              <h1 className="text-2xl font-bold text-gray-900 mb-3">{topic.title}</h1>

              {/* Topic Author and Meta */}
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {topic.author.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span>By {topic.author.name}</span>
                  {getRoleBadge(topic.author.role)}
                  <div className={`flex items-center space-x-1 px-1.5 py-0.5 rounded text-xs ${getMembershipBadge(topic.author.membershipTier).color}`}>
                    {getMembershipBadge(topic.author.membershipTier).icon}
                    <span>{getMembershipBadge(topic.author.membershipTier).label}</span>
                  </div>
                </div>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{formatTimeAgo(topic.createdAt)}</span>
                </div>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>{topic.views} views</span>
                </div>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>{topic.replies} replies</span>
                </div>
              </div>

              {/* Topic Description */}
              <div className="prose prose-gray max-w-none mb-4">
                <p className="whitespace-pre-wrap">{topic.description}</p>
              </div>

              {/* Tags */}
              {topic.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {topic.tags.map(tag => (
                    <span
                      key={tag}
                      className="flex items-center space-x-1 px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-gray-200 cursor-pointer"
                    >
                      <Tag className="w-3 h-3" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              )}

              {/* Topic Actions */}
              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <div className="flex items-center space-x-4">
                  {/* Vote buttons */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleVoteTopic('up')}
                      className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                        topic.hasUserVoted === 'up' 
                          ? 'bg-green-100 text-green-600' 
                          : 'hover:bg-green-50 text-gray-500 hover:text-green-600'
                      }`}
                    >
                      <ArrowUp className="w-4 h-4" />
                      <span className="font-medium">{topic.upvotes}</span>
                    </button>
                    <button
                      onClick={() => handleVoteTopic('down')}
                      className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                        topic.hasUserVoted === 'down' 
                          ? 'bg-red-100 text-red-600' 
                          : 'hover:bg-red-50 text-gray-500 hover:text-red-600'
                      }`}
                    >
                      <ArrowDown className="w-4 h-4" />
                      <span className="font-medium">{topic.downvotes}</span>
                    </button>
                  </div>

                  {/* Follow button */}
                  <button
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                      isFollowing 
                        ? 'bg-primary-100 text-primary-600' 
                        : 'hover:bg-primary-50 text-gray-500 hover:text-primary-600'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isFollowing ? 'fill-current' : ''}`} />
                    <span>{isFollowing ? 'Following' : 'Follow'}</span>
                  </button>

                  {/* Share button */}
                  <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-500 hover:text-gray-700 transition-colors">
                    <Share className="w-4 h-4" />
                    <span>Share</span>
                  </button>

                  {/* Report button */}
                  <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors">
                    <Flag className="w-4 h-4" />
                    <span>Report</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-6 mb-8">
          {posts.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No replies yet</h3>
              <p className="text-gray-600 mb-6">Be the first to join the conversation!</p>
            </div>
          ) : (
            posts.map(post => (
              <PostComponent
                key={post.id}
                post={post}
                topic={topic}
                user={user}
                onReply={handleReply}
                onVote={handleVotePost}
              />
            ))
          )}
        </div>

        {/* New Post Form */}
        {!topic.isLocked && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Post a Reply</h3>
            <div className="mb-4">
              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="Share your thoughts..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent resize-none"
                rows={4}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                <p>Be respectful and contribute meaningfully to the discussion.</p>
              </div>
              <button
                onClick={handleNewPost}
                disabled={!newPostContent.trim()}
                className="px-6 py-3 bg-[#FF6B6B] text-white rounded-lg hover:bg-[#e55a5a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Post Reply</span>
              </button>
            </div>
          </div>
        )}

        {topic.isLocked && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
            <Lock className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
            <p className="text-yellow-800">This topic has been locked by a moderator.</p>
          </div>
        )}
      </div>
    </div>
  )
}
