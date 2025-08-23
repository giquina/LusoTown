'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { predictiveCommunityAnalytics } from '@/lib/ai/PredictiveCommunityAnalytics'

interface AnalyticsDashboardProps {
  userId?: string
  privacySettings?: {
    analyticsConsent: boolean
    personalizedRecommendations: boolean
    communityInsights: boolean
    marketingAnalytics: boolean
  }
}

interface CommunityMetrics {
  totalMembers: number
  activeMembers: number
  engagementRate: number
  culturalHealthScore: number
  saudadeManagementScore: number
}

interface TrendData {
  label: string
  confidence: number
  impact: 'high' | 'medium' | 'low'
  category: string
}

export default function AnalyticsDashboard({ userId, privacySettings }: AnalyticsDashboardProps) {
  const { t } = useLanguage()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Analytics State
  const [communityHealth, setCommunityHealth] = useState<any>(null)
  const [trends, setTrends] = useState<TrendData[]>([])
  const [metrics, setMetrics] = useState<CommunityMetrics>({
    totalMembers: 750,
    activeMembers: 485,
    engagementRate: 78,
    culturalHealthScore: 85,
    saudadeManagementScore: 73
  })

  useEffect(() => {
    loadAnalyticsData()
  }, [userId, privacySettings])

  const loadAnalyticsData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Load community health metrics
      const healthData = await predictiveCommunityAnalytics.analyzeCommunityHealth()
      setCommunityHealth(healthData)

      // Load community trends
      const trendData = await predictiveCommunityAnalytics.predictCommunityTrends(
        'month',
        userId,
        privacySettings
      )

      const formattedTrends: TrendData[] = trendData.map(trend => ({
        label: trend.title,
        confidence: trend.confidence,
        impact: trend.predictedImpact,
        category: trend.type
      }))

      setTrends(formattedTrends.slice(0, 6)) // Top 6 trends

      // Update metrics from health data
      if (healthData) {
        setMetrics(prev => ({
          ...prev,
          engagementRate: healthData.engagement.score,
          culturalHealthScore: healthData.cultural.authenticity,
          saudadeManagementScore: healthData.wellbeing.saudadeManagement
        }))
      }

    } catch (err) {
      console.error('Analytics loading error:', err)
      setError('Failed to load analytics data')
    } finally {
      setLoading(false)
    }
  }

  const getImpactColor = (impact: 'high' | 'medium' | 'low') => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-50'
      case 'medium': return 'text-yellow-600 bg-yellow-50'
      case 'low': return 'text-green-600 bg-green-50'
    }
  }

  const getConfidenceWidth = (confidence: number) => `${confidence}%`

  if (!privacySettings?.analyticsConsent && userId) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center">
          <div className="text-gray-400 text-4xl mb-4">🔒</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {t('analytics.consent_required')}
          </h3>
          <p className="text-gray-600">
            {t('analytics.consent_description')}
          </p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center text-red-600">
          <div className="text-4xl mb-2">⚠️</div>
          <p>{error}</p>
          <button 
            onClick={loadAnalyticsData}
            className="mt-4 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
          >
            {t('common.retry')}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t('analytics.dashboard_title')}
        </h2>
        <p className="text-gray-600">
          {t('analytics.dashboard_subtitle')}
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="text-2xl mr-3">👥</div>
            <div>
              <p className="text-sm font-medium text-gray-600">
                {t('analytics.total_members')}
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {metrics.totalMembers.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="text-2xl mr-3">📈</div>
            <div>
              <p className="text-sm font-medium text-gray-600">
                {t('analytics.engagement_rate')}
              </p>
              <p className="text-2xl font-semibold text-primary-600">
                {metrics.engagementRate}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="text-2xl mr-3">🇵🇹</div>
            <div>
              <p className="text-sm font-medium text-gray-600">
                {t('analytics.cultural_health')}
              </p>
              <p className="text-2xl font-semibold text-secondary-600">
                {metrics.culturalHealthScore}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="text-2xl mr-3">💝</div>
            <div>
              <p className="text-sm font-medium text-gray-600">
                {t('analytics.saudade_support')}
              </p>
              <p className="text-2xl font-semibold text-amber-600">
                {metrics.saudadeManagementScore}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Community Trends */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {t('analytics.community_trends')}
        </h3>
        <div className="space-y-4">
          {trends.map((trend, index) => (
            <div key={index} className="border-l-4 border-primary-300 pl-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{trend.label}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(trend.impact)}`}>
                  {t(`analytics.impact_${trend.impact}`)}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: getConfidenceWidth(trend.confidence) }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600">{trend.confidence}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Community Health Breakdown */}
      {communityHealth && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t('analytics.health_breakdown')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">
                {t('analytics.cultural_metrics')}
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{t('analytics.authenticity')}</span>
                  <span className="font-medium">{communityHealth.cultural.authenticity}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{t('analytics.preservation')}</span>
                  <span className="font-medium">{communityHealth.cultural.preservation}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{t('analytics.innovation')}</span>
                  <span className="font-medium">{communityHealth.cultural.innovation}%</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">
                {t('analytics.wellbeing_metrics')}
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{t('analytics.cultural_comfort')}</span>
                  <span className="font-medium">{communityHealth.wellbeing.culturalComfort}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{t('analytics.adaptation_support')}</span>
                  <span className="font-medium">{communityHealth.wellbeing.adaptationSupport}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{t('analytics.mental_health')}</span>
                  <span className="font-medium">{communityHealth.wellbeing.mentalHealthSupport}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Notice */}
      <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
        <div className="flex items-start space-x-2">
          <div className="text-gray-400">🔒</div>
          <div>
            <p className="font-medium mb-1">{t('analytics.privacy_title')}</p>
            <p>{t('analytics.privacy_notice')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}