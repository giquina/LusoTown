'use client'

import { ROUTES } from '@/config';
import React, { useState, useEffect } from 'react'
import { authService, User } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import { 
  Heart, 
  Calendar, 
  Users, 
  Settings, 
  MapPin, 
  Star, 
  Plus,
  BookOpen,
  Wine,
  Dumbbell,
  Palette,
  Coffee,
  Music,
  Camera,
  Plane,
  User as UserIcon,
  Crown,
  Shield,
  LogOut,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Edit3,
  Trash2,
  Eye,
  Activity,
  BarChart3,
  FileText,
  MessageCircle
} from 'lucide-react'

interface AdminStats {
  totalUsers: number
  activeUsers: number
  totalEvents: number
  upcomingEvents: number
  revenue: number
  subscriptions: {
    free: number
    core: number
    premium: number
  }
}

interface UserData {
  id: string
  name: string
  email: string
  role: 'user' | 'admin'
  membershipTier: 'free' | 'core' | 'premium'
  joinedDate: string
  lastActive: string
  location: string
  status: 'active' | 'inactive' | 'suspended'
}

interface EventData {
  id: string
  title: string
  category: string
  date: string
  attendees: number
  maxAttendees: number
  status: 'published' | 'draft' | 'cancelled'
  membershipRequired: 'free' | 'core' | 'premium'
}

const ADMIN_STATS: AdminStats = {
  totalUsers: 1247,
  activeUsers: 892,
  totalEvents: 156,
  upcomingEvents: 23,
  revenue: 18950,
  subscriptions: {
    free: 523,
    core: 589,
    premium: 135
  }
}

const DUMMY_USERS: UserData[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'user@lusotown.com',
    role: 'user',
    membershipTier: 'core',
    joinedDate: '2024-01-15',
    lastActive: '2024-08-09',
    location: 'Kensington, London',
    status: 'active'
  },
  {
    id: '2',
    name: 'Emma Williams',
    email: 'admin@lusotown.com',
    role: 'admin',
    membershipTier: 'premium',
    joinedDate: '2023-06-01',
    lastActive: '2024-08-10',
    location: 'Central London',
    status: 'active'
  },
  {
    id: '3',
    name: 'Jessica Brown',
    email: 'free@lusotown.com',
    role: 'user',
    membershipTier: 'free',
    joinedDate: '2024-03-01',
    lastActive: '2024-08-08',
    location: 'Camden, London',
    status: 'active'
  },
  {
    id: '4',
    name: 'Lucy Davis',
    email: 'lucy.davis@email.com',
    role: 'user',
    membershipTier: 'premium',
    joinedDate: '2023-11-20',
    lastActive: '2024-08-07',
    location: 'Chelsea, London',
    status: 'active'
  },
  {
    id: '5',
    name: 'Sophie Wilson',
    email: 'sophie.w@email.com',
    role: 'user',
    membershipTier: 'core',
    joinedDate: '2024-02-14',
    lastActive: '2024-07-28',
    location: 'Notting Hill, London',
    status: 'inactive'
  }
]

const DUMMY_EVENTS: EventData[] = [
  {
    id: '1',
    title: 'Book Club: "Women Who Run With Wolves"',
    category: 'Books & Reading',
    date: '2024-08-15',
    attendees: 12,
    maxAttendees: 15,
    status: 'published',
    membershipRequired: 'core'
  },
  {
    id: '2',
    title: 'Wine Tasting: Italian Varietals',
    category: 'Wine & Dining',
    date: '2024-08-18',
    attendees: 8,
    maxAttendees: 12,
    status: 'published',
    membershipRequired: 'premium'
  },
  {
    id: '3',
    title: 'Morning Yoga in Hyde Park',
    category: 'Fitness & Wellness',
    date: '2024-08-20',
    attendees: 18,
    maxAttendees: 20,
    status: 'published',
    membershipRequired: 'free'
  },
  {
    id: '4',
    title: 'Professional Women\'s Networking',
    category: 'Networking',
    date: '2024-08-25',
    attendees: 5,
    maxAttendees: 25,
    status: 'draft',
    membershipRequired: 'premium'
  },
  {
    id: '5',
    title: 'Art Gallery Tour - Cancelled',
    category: 'Arts & Culture',
    date: '2024-08-12',
    attendees: 0,
    maxAttendees: 10,
    status: 'cancelled',
    membershipRequired: 'free'
  }
]

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<UserData[]>(DUMMY_USERS)
  const [events, setEvents] = useState<EventData[]>(DUMMY_EVENTS)
  const router = useRouter()

  useEffect(() => {
    const currentUser = authService.getCurrentUser()
    if (!currentUser) {
      router.push(ROUTES.auth.login)
      return
    }
    
    if (!authService.isAdmin()) {
      router.push('/dashboard')
      return
    }
    
    setUser(currentUser)
    setLoading(false)
  }, [router])

  const handleLogout = async () => {
    await authService.logout()
    router.push('/')
  }

  const getMembershipBadge = (tier: string) => {
    const badges = {
      free: { icon: <UserIcon className="w-3 h-3" />, color: 'bg-gray-100 text-gray-600', label: 'Free' },
      core: { icon: <Star className="w-3 h-3" />, color: 'bg-[#FF6B6B] text-white', label: 'Core' },
      premium: { icon: <Crown className="w-3 h-3" />, color: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white', label: 'Premium' }
    }
    return badges[tier as keyof typeof badges] || badges.free
  }

  const getStatusBadge = (status: string) => {
    const badges = {
      active: { color: 'bg-green-100 text-green-800', label: 'Active', icon: <CheckCircle className="w-3 h-3" /> },
      inactive: { color: 'bg-yellow-100 text-yellow-800', label: 'Inactive', icon: <AlertTriangle className="w-3 h-3" /> },
      suspended: { color: 'bg-red-100 text-red-800', label: 'Suspended', icon: <XCircle className="w-3 h-3" /> },
      published: { color: 'bg-green-100 text-green-800', label: 'Published', icon: <CheckCircle className="w-3 h-3" /> },
      draft: { color: 'bg-gray-100 text-gray-800', label: 'Draft', icon: <Edit3 className="w-3 h-3" /> },
      cancelled: { color: 'bg-red-100 text-red-800', label: 'Cancelled', icon: <XCircle className="w-3 h-3" /> }
    }
    return badges[status as keyof typeof badges] || badges.active
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-gray-600">Welcome back, {user.name}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                View User Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  <Shield className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-gray-900">Admin Panel</h3>
                <p className="text-gray-600 text-sm">Platform Management</p>
              </div>
              
              <nav className="space-y-2">
                {[
                  { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
                  { id: 'users', label: 'User Management', icon: <Users className="w-4 h-4" /> },
                  { id: 'events', label: 'Event Management', icon: <Calendar className="w-4 h-4" /> },
                  { id: 'analytics', label: 'Analytics', icon: <TrendingUp className="w-4 h-4" /> },
                  { id: 'content', label: 'Content Management', icon: <FileText className="w-4 h-4" /> }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Key Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Total Users</p>
                        <p className="text-2xl font-bold text-gray-900">{ADMIN_STATS.totalUsers.toLocaleString()}</p>
                        <p className="text-green-600 text-sm flex items-center mt-1">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          +12% this month
                        </p>
                      </div>
                      <Users className="w-8 h-8 text-[#FF6B6B]" />
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Active Users</p>
                        <p className="text-2xl font-bold text-gray-900">{ADMIN_STATS.activeUsers.toLocaleString()}</p>
                        <p className="text-green-600 text-sm flex items-center mt-1">
                          <Activity className="w-3 h-3 mr-1" />
                          {Math.round((ADMIN_STATS.activeUsers / ADMIN_STATS.totalUsers) * 100)}% active
                        </p>
                      </div>
                      <CheckCircle className="w-8 h-8 text-[#4ECDC4]" />
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Total Events</p>
                        <p className="text-2xl font-bold text-gray-900">{ADMIN_STATS.totalEvents}</p>
                        <p className="text-primary-600 text-sm">{ADMIN_STATS.upcomingEvents} upcoming</p>
                      </div>
                      <Calendar className="w-8 h-8 text-purple-500" />
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Monthly Revenue</p>
                        <p className="text-2xl font-bold text-gray-900">£{ADMIN_STATS.revenue.toLocaleString()}</p>
                        <p className="text-green-600 text-sm flex items-center mt-1">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          +8% this month
                        </p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-green-500" />
                    </div>
                  </div>
                </div>

                {/* Subscription Breakdown */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Membership Breakdown</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {Object.entries(ADMIN_STATS.subscriptions).map(([tier, count]) => {
                      const badge = getMembershipBadge(tier)
                      const percentage = Math.round((count / ADMIN_STATS.totalUsers) * 100)
                      return (
                        <div key={tier} className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            {badge.icon}
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}>
                              {badge.label}
                            </span>
                          </div>
                          <p className="text-2xl font-bold text-gray-900">{count}</p>
                          <p className="text-gray-600 text-sm">{percentage}% of users</p>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <button 
                      onClick={() => setActiveTab('users')}
                      className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"
                    >
                      <Users className="w-6 h-6 text-[#FF6B6B] mx-auto mb-2" />
                      <p className="text-sm font-medium">Manage Users</p>
                    </button>
                    <button 
                      onClick={() => setActiveTab('events')}
                      className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"
                    >
                      <Plus className="w-6 h-6 text-[#4ECDC4] mx-auto mb-2" />
                      <p className="text-sm font-medium">Create Event</p>
                    </button>
                    <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
                      <MessageCircle className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                      <p className="text-sm font-medium">Moderation Queue</p>
                    </button>
                    <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
                      <Settings className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                      <p className="text-sm font-medium">Platform Settings</p>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-[#FF6B6B] text-white rounded-lg hover:bg-[#e55a5a] transition-colors text-sm">
                      Export Users
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      Filter Users
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-700">User</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Email</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Membership</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Last Active</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(user => {
                        const membershipBadge = getMembershipBadge(user.membershipTier)
                        const statusBadge = getStatusBadge(user.status)
                        return (
                          <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-4 px-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] rounded-full flex items-center justify-center text-white text-sm font-bold">
                                  {user.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900">{user.name}</p>
                                  <p className="text-sm text-gray-600">{user.location}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-gray-900">{user.email}</td>
                            <td className="py-4 px-4">
                              <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${membershipBadge.color}`}>
                                {membershipBadge.icon}
                                <span>{membershipBadge.label}</span>
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${statusBadge.color}`}>
                                {statusBadge.icon}
                                <span>{statusBadge.label}</span>
                              </span>
                            </td>
                            <td className="py-4 px-4 text-gray-600">{user.lastActive}</td>
                            <td className="py-4 px-4">
                              <div className="flex items-center space-x-2">
                                <button className="p-1 text-gray-400 hover:text-primary-600 transition-colors">
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button className="p-1 text-gray-400 hover:text-orange-600 transition-colors">
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'events' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Event Management</h2>
                  <button className="px-4 py-2 bg-[#4ECDC4] text-white rounded-lg hover:bg-[#45b8b0] transition-colors flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Create Event</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {events.map(event => {
                    const statusBadge = getStatusBadge(event.status)
                    const membershipBadge = getMembershipBadge(event.membershipRequired)
                    return (
                      <div key={event.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-semibold text-gray-900 text-sm">{event.title}</h3>
                          <div className="flex space-x-1">
                            <button className="p-1 text-gray-400 hover:text-primary-600 transition-colors">
                              <Eye className="w-3 h-3" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-orange-600 transition-colors">
                              <Edit3 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="space-y-2 text-xs text-gray-600 mb-4">
                          <div className="flex items-center justify-between">
                            <span>Category:</span>
                            <span className="font-medium">{event.category}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Date:</span>
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Attendees:</span>
                            <span>{event.attendees}/{event.maxAttendees}</span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${statusBadge.color}`}>
                            {statusBadge.icon}
                            <span>{statusBadge.label}</span>
                          </span>
                          <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${membershipBadge.color}`}>
                            {membershipBadge.icon}
                            <span>{membershipBadge.label}</span>
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Platform Analytics</h2>
                  <div className="text-center py-12">
                    <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics Dashboard Coming Soon</h3>
                    <p className="text-gray-600">Detailed analytics and insights will be available here.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'content' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Content Management</h2>
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Content Management Coming Soon</h3>
                    <p className="text-gray-600">Manage platform content, guidelines, and policies here.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}