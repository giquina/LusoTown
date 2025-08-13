'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  ChartBarIcon,
  StarIcon,
  UserGroupIcon,
  TrophyIcon,
  HeartIcon,
  ChartPieIcon,
  ArrowTrendingUpIcon as TrendingUpIcon,
  CalendarIcon,
  FlagIcon,
  HandThumbUpIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'
import { eventService } from '@/lib/events'

interface ReviewAnalyticsProps {
  eventId: string
  isEventHost?: boolean
}

interface AnalyticsData {
  totalReviews: number
  averageRating: number
  ratingDistribution: { [key: number]: number }
  culturalValueAverage: number
  organizationAverage: number
  venueAverage: number
  recommendationPercentage: number
  membershipTierBreakdown: { [key: string]: number }
  monthlyTrends: Array<{ month: string; rating: number; count: number }>
}

export const ReviewAnalytics: React.FC<ReviewAnalyticsProps> = ({ 
  eventId, 
  isEventHost = false 
}) => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedTab, setSelectedTab] = useState<'overview' | 'cultural' | 'trends' | 'demographics'>('overview')

  useEffect(() => {
    loadAnalytics()
  }, [eventId])

  const loadAnalytics = async () => {
    setLoading(true)
    try {
      const data = await eventService.getEventAnalytics(eventId)
      setAnalytics(data)
    } catch (error) {
      console.error('Error loading analytics:', error)
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-3 gap-4">
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
          </div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (!analytics) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="text-center py-8">
          <ChartBarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Analytics Available</h3>
          <p className="text-gray-600">Reviews data will appear here once attendees start leaving feedback</p>
        </div>
      </div>
    )
  }

  const tabs = [
    { key: 'overview', label: 'Overview', icon: ChartBarIcon },
    { key: 'cultural', label: 'Cultural Impact', icon: TrophyIcon },
    { key: 'trends', label: 'Trends', icon: TrendingUpIcon },
    { key: 'demographics', label: 'Community', icon: UserGroupIcon }
  ] as const

  return (
    <div className="bg-white rounded-2xl shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Review Analytics</h2>
            <p className="text-sm text-gray-600 mt-1">
              Insights from your Portuguese community • Dados da comunidade portuguesa
            </p>
          </div>
          <div className="flex items-center gap-2 bg-gradient-to-r from-primary-50 to-secondary-50 px-4 py-2 rounded-lg">
            <StarSolidIcon className="w-5 h-5 text-yellow-400" />
            <span className="text-lg font-bold text-gray-900">{analytics.averageRating.toFixed(1)}</span>
            <span className="text-sm text-gray-600">({analytics.totalReviews} reviews)</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mt-6 bg-gray-100 rounded-lg p-1">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.key}
                onClick={() => setSelectedTab(tab.key)}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                  selectedTab === tab.key
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {selectedTab === 'overview' && (
          <OverviewTab analytics={analytics} />
        )}
        {selectedTab === 'cultural' && (
          <CulturalTab analytics={analytics} />
        )}
        {selectedTab === 'trends' && (
          <TrendsTab analytics={analytics} />
        )}
        {selectedTab === 'demographics' && (
          <DemographicsTab analytics={analytics} />
        )}
      </div>
    </div>
  )
}

const OverviewTab: React.FC<{ analytics: AnalyticsData }> = ({ analytics }) => {
  const maxRating = Math.max(...Object.values(analytics.ratingDistribution))

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100">
          <div className="flex items-center gap-2 mb-2">
            <StarIcon className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-green-800">Average Rating</span>
          </div>
          <div className="text-2xl font-bold text-green-700">{analytics.averageRating.toFixed(1)}</div>
          <div className="text-xs text-green-600">out of 5 stars</div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
          <div className="flex items-center gap-2 mb-2">
            <UserGroupIcon className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Total Reviews</span>
          </div>
          <div className="text-2xl font-bold text-blue-700">{analytics.totalReviews}</div>
          <div className="text-xs text-blue-600">community feedback</div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-fuchsia-50 p-4 rounded-lg border border-purple-100">
          <div className="flex items-center gap-2 mb-2">
            <HandThumbUpIcon className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-purple-800">Recommendation</span>
          </div>
          <div className="text-2xl font-bold text-purple-700">
            {analytics.recommendationPercentage.toFixed(0)}%
          </div>
          <div className="text-xs text-purple-600">would recommend</div>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border border-orange-100">
          <div className="flex items-center gap-2 mb-2">
            <TrophyIcon className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-medium text-orange-800">High Ratings</span>
          </div>
          <div className="text-2xl font-bold text-orange-700">
            {((analytics.ratingDistribution[4] + analytics.ratingDistribution[5]) / analytics.totalReviews * 100).toFixed(0)}%
          </div>
          <div className="text-xs text-orange-600">4+ star reviews</div>
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Rating Distribution</h3>
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = analytics.ratingDistribution[rating]
            const percentage = (count / analytics.totalReviews) * 100
            
            return (
              <div key={rating} className="flex items-center gap-4">
                <div className="flex items-center gap-1 w-16">
                  <span className="text-sm font-medium">{rating}</span>
                  <StarSolidIcon className="w-4 h-4 text-yellow-400" />
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8, delay: (5 - rating) * 0.1 }}
                    className="h-2 rounded-full bg-gradient-to-r from-primary-400 to-secondary-400"
                  />
                </div>
                <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const CulturalTab: React.FC<{ analytics: AnalyticsData }> = ({ analytics }) => {
  const culturalMetrics = [
    {
      label: 'Cultural Authenticity',
      value: analytics.culturalValueAverage,
      description: 'How authentic attendees found the Portuguese cultural elements',
      color: 'from-green-400 to-emerald-400',
      bgColor: 'from-green-50 to-emerald-50',
      textColor: 'text-green-700'
    },
    {
      label: 'Event Organization',
      value: analytics.organizationAverage,
      description: 'Quality of event planning and execution',
      color: 'from-blue-400 to-indigo-400',
      bgColor: 'from-blue-50 to-indigo-50',
      textColor: 'text-blue-700'
    },
    {
      label: 'Venue & Location',
      value: analytics.venueAverage,
      description: 'Rating of the venue and location choice',
      color: 'from-purple-400 to-fuchsia-400',
      bgColor: 'from-purple-50 to-fuchsia-50',
      textColor: 'text-purple-700'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Cultural Impact Assessment • Avaliação do Impacto Cultural
        </h3>
        <p className="text-gray-600">
          Understand how well your event connected with Portuguese heritage and values
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {culturalMetrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-gradient-to-r ${metric.bgColor} p-6 rounded-lg border border-gray-100`}
          >
            <div className="text-center">
              <div className={`text-3xl font-bold ${metric.textColor} mb-2`}>
                {metric.value > 0 ? metric.value.toFixed(1) : 'N/A'}
              </div>
              <div className="flex justify-center mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarSolidIcon
                    key={star}
                    className={`w-4 h-4 ${star <= metric.value ? 'text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <h4 className={`font-semibold ${metric.textColor} mb-2`}>{metric.label}</h4>
              <p className="text-sm text-gray-600">{metric.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Cultural Insights */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-6 rounded-lg border border-primary-100">
        <h4 className="font-semibold text-gray-900 mb-4">Portuguese Cultural Connection Insights</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h5 className="font-medium text-gray-800 mb-2">Strengths</h5>
            <ul className="space-y-1 text-sm text-gray-700">
              {analytics.culturalValueAverage >= 4 && <li>• Highly authentic cultural experience</li>}
              {analytics.organizationAverage >= 4 && <li>• Well-organized and professional</li>}
              {analytics.recommendationPercentage >= 80 && <li>• Strong community recommendation</li>}
              {analytics.venueAverage >= 4 && <li>• Excellent venue selection</li>}
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-gray-800 mb-2">Areas for Enhancement</h5>
            <ul className="space-y-1 text-sm text-gray-700">
              {analytics.culturalValueAverage < 4 && <li>• Consider more authentic Portuguese elements</li>}
              {analytics.organizationAverage < 4 && <li>• Improve event coordination</li>}
              {analytics.venueAverage < 4 && <li>• Explore different venue options</li>}
              {analytics.recommendationPercentage < 80 && <li>• Focus on attendee satisfaction</li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

const TrendsTab: React.FC<{ analytics: AnalyticsData }> = ({ analytics }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Review Trends Over Time</h3>
        <p className="text-gray-600">Track how satisfaction has evolved</p>
      </div>

      {analytics.monthlyTrends.length > 0 ? (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-4">Monthly Rating Trends</h4>
          <div className="space-y-4">
            {analytics.monthlyTrends.map((trend, index) => (
              <div key={trend.month} className="flex items-center gap-4">
                <div className="w-20 text-sm font-medium text-gray-700">
                  {new Date(trend.month + '-01').toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
                </div>
                <div className="flex-1 flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(trend.rating / 5) * 100}%` }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      className="h-2 rounded-full bg-gradient-to-r from-primary-400 to-secondary-400"
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <StarSolidIcon className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-medium">{trend.rating.toFixed(1)}</span>
                  </div>
                </div>
                <span className="text-xs text-gray-600 w-16 text-right">{trend.count} reviews</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">More data will be available as you receive additional reviews</p>
        </div>
      )}

      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h5 className="font-semibold text-blue-800 mb-2">Latest Trend</h5>
          <p className="text-sm text-blue-700">
            {analytics.monthlyTrends.length > 1 ? (
              analytics.monthlyTrends[analytics.monthlyTrends.length - 1].rating > 
              analytics.monthlyTrends[analytics.monthlyTrends.length - 2].rating 
                ? "Ratings are improving over time 📈"
                : "Consider reviewing recent changes 📊"
            ) : (
              "More data needed for trend analysis"
            )}
          </p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <h5 className="font-semibold text-green-800 mb-2">Best Performance</h5>
          <p className="text-sm text-green-700">
            {analytics.monthlyTrends.length > 0 ? (
              `${new Date(analytics.monthlyTrends.reduce((best, current) => 
                current.rating > best.rating ? current : best
              ).month + '-01').toLocaleDateString('en-GB', { month: 'long' })} had the highest rating`
            ) : (
              "No trend data available yet"
            )}
          </p>
        </div>
      </div>
    </div>
  )
}

const DemographicsTab: React.FC<{ analytics: AnalyticsData }> = ({ analytics }) => {
  const membershipColors = {
    free: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' },
    core: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
    premium: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200' }
  }

  const totalMembers = Object.values(analytics.membershipTierBreakdown).reduce((sum, count) => sum + count, 0)

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Community Demographics</h3>
        <p className="text-gray-600">Understanding your Portuguese community audience</p>
      </div>

      {/* Membership Breakdown */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h4 className="font-semibold text-gray-900 mb-4">Membership Tier Distribution</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(analytics.membershipTierBreakdown).map(([tier, count]) => {
            const percentage = totalMembers > 0 ? (count / totalMembers) * 100 : 0
            const colors = membershipColors[tier as keyof typeof membershipColors]
            
            return (
              <div
                key={tier}
                className={`${colors.bg} ${colors.border} border p-4 rounded-lg text-center`}
              >
                <div className={`text-2xl font-bold ${colors.text} mb-2`}>{count}</div>
                <div className={`text-sm font-medium ${colors.text} mb-2 capitalize`}>{tier} Members</div>
                <div className={`text-xs ${colors.text}`}>{percentage.toFixed(0)}% of reviewers</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Community Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-primary-50 p-6 rounded-lg border border-primary-100">
          <h4 className="font-semibold text-primary-800 mb-3">Community Engagement</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-primary-700">Total Reviewers</span>
              <span className="text-sm font-medium text-primary-800">{analytics.totalReviews}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-primary-700">Average Rating</span>
              <span className="text-sm font-medium text-primary-800">{analytics.averageRating.toFixed(1)} stars</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-primary-700">Recommendation Rate</span>
              <span className="text-sm font-medium text-primary-800">{analytics.recommendationPercentage.toFixed(0)}%</span>
            </div>
          </div>
        </div>

        <div className="bg-secondary-50 p-6 rounded-lg border border-secondary-100">
          <h4 className="font-semibold text-secondary-800 mb-3">Portuguese Cultural Impact</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-secondary-700">Cultural Rating</span>
              <span className="text-sm font-medium text-secondary-800">
                {analytics.culturalValueAverage > 0 ? `${analytics.culturalValueAverage.toFixed(1)} stars` : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-secondary-700">High Cultural Value</span>
              <span className="text-sm font-medium text-secondary-800">
                {analytics.culturalValueAverage >= 4 ? 'Yes' : 'Improving'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-secondary-700">Community Connection</span>
              <span className="text-sm font-medium text-secondary-800">Strong</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg border border-yellow-200">
        <h4 className="font-semibold text-orange-800 mb-3">
          📊 Community Insights & Recommendations
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h5 className="font-medium text-orange-800 mb-2">Your Community Profile</h5>
            <ul className="space-y-1 text-sm text-orange-700">
              <li>• Diverse membership engagement</li>
              <li>• Strong Portuguese cultural connection</li>
              <li>• High satisfaction rates</li>
              <li>• Active community participation</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-orange-800 mb-2">Growth Opportunities</h5>
            <ul className="space-y-1 text-sm text-orange-700">
              <li>• Encourage more premium member attendance</li>
              <li>• Focus on cultural authenticity</li>
              <li>• Build on current satisfaction levels</li>
              <li>• Create recurring community experiences</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewAnalytics