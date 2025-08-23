'use client'

import React, { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { partnershipsService, PartnershipOrganization, PartnershipBenefit } from '@/lib/partnerships'
import {
  ChartBarIcon,
  UserGroupIcon,
  CurrencyPoundIcon,
  TrophyIcon,
  HandRaisedIcon,
  ArrowTrendingUpIcon,
  CalendarDaysIcon,
  BuildingOffice2Icon,
  GlobeAltIcon,
  CheckBadgeIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  PhoneIcon,
  LinkIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'

interface PartnershipMetrics {
  totalPartnerships: number
  activePartnerships: number
  pendingApplications: number
  monthlyGrowth: number
  totalCommunityReach: number
  partnerSatisfactionScore: number
  averagePartnershipValue: number
  upcomingRenewals: number
}

interface PartnershipActivity {
  id: string
  type: 'new_partnership' | 'renewal' | 'event' | 'benefit_claimed' | 'meeting'
  title: string
  titlePortuguese: string
  partnerId: string
  partnerName: string
  date: string
  value?: number
  status: 'completed' | 'pending' | 'scheduled'
}

const PartnershipIntegrationDashboard: React.FC = () => {
  const { language } = useLanguage()
  const [partnerships, setPartnerships] = useState<PartnershipOrganization[]>([])
  const [benefits, setBenefits] = useState<PartnershipBenefit[]>([])
  const [metrics, setMetrics] = useState<PartnershipMetrics | null>(null)
  const [activities, setActivities] = useState<PartnershipActivity[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTimeframe, setSelectedTimeframe] = useState<'7d' | '30d' | '90d' | '1y'>('30d')

  useEffect(() => {
    loadDashboardData()
  }, [selectedTimeframe])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      
      // Load partnerships and benefits
      const [allPartnerships, allBenefits] = await Promise.all([
        partnershipsService.getAllPartnerships(),
        partnershipsService.getPartnershipBenefits()
      ])
      
      setPartnerships(allPartnerships)
      setBenefits(allBenefits)
      
      // Generate mock metrics based on real partnership data
      const totalCommunitySize = allPartnerships.reduce((sum, p) => sum + p.communitySize, 0)
      const mockMetrics: PartnershipMetrics = {
        totalPartnerships: allPartnerships.length,
        activePartnerships: allPartnerships.filter(p => p.officialStatus).length,
        pendingApplications: 12,
        monthlyGrowth: 15.3,
        totalCommunityReach: totalCommunitySize,
        partnerSatisfactionScore: 4.7,
        averagePartnershipValue: 12500,
        upcomingRenewals: 4
      }
      
      setMetrics(mockMetrics)
      
      // Generate mock activities
      const mockActivities: PartnershipActivity[] = [
        {
          id: 'act-1',
          type: 'new_partnership',
          title: 'New Strategic Partnership Agreement Signed',
          titlePortuguese: 'Novo Acordo de Parceria Estratégica Assinado',
          partnerId: 'partner-millennium-bank',
          partnerName: 'Millennium Bank United Kingdom',
          date: '2024-08-15',
          value: 12500,
          status: 'completed'
        },
        {
          id: 'act-2',
          type: 'event',
          title: 'Portuguese Investment Summit Planning Meeting',
          titlePortuguese: 'Reunião de Planeamento da Cimeira de Investimento Português',
          partnerId: 'partner-anglo-portuguese-society',
          partnerName: 'Anglo-Portuguese Society',
          date: '2024-08-14',
          status: 'completed'
        },
        {
          id: 'act-3',
          type: 'benefit_claimed',
          title: 'Member Benefits Package Activation',
          titlePortuguese: 'Ativação do Pacote de Benefícios para Membros',
          partnerId: 'partner-camoes',
          partnerName: 'Instituto Camões',
          date: '2024-08-13',
          value: 2100,
          status: 'completed'
        },
        {
          id: 'act-4',
          type: 'renewal',
          title: 'Partnership Renewal Discussion Scheduled',
          titlePortuguese: 'Discussão de Renovação de Parceria Agendada',
          partnerId: 'partner-chamber',
          partnerName: 'Portugal-United Kingdom Chamber of Commerce',
          date: '2024-08-20',
          status: 'scheduled'
        },
        {
          id: 'act-5',
          type: 'meeting',
          title: 'Quarterly Business Review',
          titlePortuguese: 'Revisão Empresarial Trimestral',
          partnerId: 'partner-tap-air-portugal',
          partnerName: 'TAP Air Portugal United Kingdom',
          date: '2024-08-18',
          status: 'scheduled'
        }
      ]
      
      setActivities(mockActivities)
      
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getActivityIcon = (type: PartnershipActivity['type']) => {
    const icons = {
      new_partnership: <HandRaisedIcon className="w-5 h-5" />,
      renewal: <ArrowTrendingUpIcon className="w-5 h-5" />,
      event: <CalendarDaysIcon className="w-5 h-5" />,
      benefit_claimed: <TrophyIcon className="w-5 h-5" />,
      meeting: <UserGroupIcon className="w-5 h-5" />
    }
    return icons[type]
  }

  const getActivityColor = (type: PartnershipActivity['type']) => {
    const colors = {
      new_partnership: 'text-green-600 bg-green-100',
      renewal: 'text-blue-600 bg-blue-100',
      event: 'text-purple-600 bg-purple-100',
      benefit_claimed: 'text-yellow-600 bg-yellow-100',
      meeting: 'text-gray-600 bg-gray-100'
    }
    return colors[type]
  }

  const getStatusBadge = (status: PartnershipActivity['status']) => {
    const badges = {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      scheduled: 'bg-blue-100 text-blue-800'
    }
    return badges[status]
  }

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {language === 'pt' ? 'Painel de Parcerias' : 'Partnership Dashboard'}
            </h1>
            <p className="text-gray-600 mt-1">
              {language === 'pt' 
                ? 'Gerir e monitorizar parcerias estratégicas portuguesas'
                : 'Manage and monitor strategic Portuguese partnerships'
              }
            </p>
          </div>
          
          {/* Timeframe Selector */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              {language === 'pt' ? 'Período:' : 'Timeframe:'}
            </span>
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value as any)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="7d">{language === 'pt' ? 'Últimos 7 dias' : 'Last 7 days'}</option>
              <option value="30d">{language === 'pt' ? 'Últimos 30 dias' : 'Last 30 days'}</option>
              <option value="90d">{language === 'pt' ? 'Últimos 90 dias' : 'Last 90 days'}</option>
              <option value="1y">{language === 'pt' ? 'Último ano' : 'Last year'}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center">
              <HandRaisedIcon className="w-8 h-8 text-primary-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {language === 'pt' ? 'Parcerias Ativas' : 'Active Partnerships'}
                </p>
                <p className="text-2xl font-bold text-gray-900">{metrics.activePartnerships}</p>
                <p className="text-xs text-green-600">
                  +{metrics.monthlyGrowth}% {language === 'pt' ? 'este mês' : 'this month'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center">
              <UserGroupIcon className="w-8 h-8 text-secondary-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {language === 'pt' ? 'Alcance Comunitário' : 'Community Reach'}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {metrics.totalCommunityReach.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">
                  {language === 'pt' ? 'membros da comunidade' : 'community members'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center">
              <CurrencyPoundIcon className="w-8 h-8 text-accent-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {language === 'pt' ? 'Valor Médio de Parceria' : 'Avg Partnership Value'}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(metrics.averagePartnershipValue)}
                </p>
                <p className="text-xs text-gray-500">
                  {language === 'pt' ? 'por ano' : 'per year'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center">
              <TrophyIcon className="w-8 h-8 text-premium-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {language === 'pt' ? 'Satisfação do Parceiro' : 'Partner Satisfaction'}
                </p>
                <p className="text-2xl font-bold text-gray-900">{metrics.partnerSatisfactionScore}/5</p>
                <p className="text-xs text-green-600">
                  {language === 'pt' ? 'Excelente' : 'Excellent'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              {language === 'pt' ? 'Atividades Recentes' : 'Recent Activities'}
            </h3>
            
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${getActivityColor(activity.type)}`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {language === 'pt' ? activity.titlePortuguese : activity.title}
                      </p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(activity.status)}`}>
                        {activity.status === 'completed' && (language === 'pt' ? 'Concluído' : 'Completed')}
                        {activity.status === 'pending' && (language === 'pt' ? 'Pendente' : 'Pending')}
                        {activity.status === 'scheduled' && (language === 'pt' ? 'Agendado' : 'Scheduled')}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm text-gray-600">{activity.partnerName}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        {activity.value && (
                          <span className="font-medium text-green-600">
                            {formatCurrency(activity.value)}
                          </span>
                        )}
                        <span>{new Date(activity.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Partnership Status & Alerts */}
        <div className="space-y-6">
          {/* Urgent Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {language === 'pt' ? 'Ações Urgentes' : 'Urgent Actions'}
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">
                    {language === 'pt' ? 'Renovações Pendentes' : 'Pending Renewals'}
                  </p>
                  <p className="text-xs text-yellow-700">
                    {metrics?.upcomingRenewals} {language === 'pt' ? 'parcerias para renovar' : 'partnerships to renew'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <ClockIcon className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-800">
                    {language === 'pt' ? 'Candidaturas Pendentes' : 'Pending Applications'}
                  </p>
                  <p className="text-xs text-blue-700">
                    {metrics?.pendingApplications} {language === 'pt' ? 'novas candidaturas' : 'new applications'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Top Performing Partners */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {language === 'pt' ? 'Parceiros de Destaque' : 'Top Performing Partners'}
            </h3>
            
            <div className="space-y-4">
              {partnerships.slice(0, 3).map((partner) => (
                <div key={partner.id} className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <BuildingOffice2Icon className="w-5 h-5 text-primary-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {language === 'pt' ? partner.namePortuguese : partner.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {partner.communitySize.toLocaleString()} {language === 'pt' ? 'membros' : 'members'}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    {partner.partnershipLevel === 'founding_partner' && (
                      <SparklesIcon className="w-4 h-4 text-accent-500" />
                    )}
                    {partner.officialStatus && (
                      <CheckBadgeIcon className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {language === 'pt' ? 'Ações Rápidas' : 'Quick Actions'}
            </h3>
            
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                <DocumentTextIcon className="w-4 h-4 mr-2" />
                {language === 'pt' ? 'Nova Parceria' : 'New Partnership'}
              </button>
              
              <button className="w-full flex items-center justify-center px-4 py-2 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-colors">
                <CalendarDaysIcon className="w-4 h-4 mr-2" />
                {language === 'pt' ? 'Agendar Reunião' : 'Schedule Meeting'}
              </button>
              
              <button className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <ChartBarIcon className="w-4 h-4 mr-2" />
                {language === 'pt' ? 'Ver Relatórios' : 'View Reports'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Partnership Benefits Summary */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          {language === 'pt' ? 'Resumo de Benefícios Ativos' : 'Active Benefits Summary'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.slice(0, 8).map((benefit) => (
            <div key={benefit.id} className="p-4 border border-gray-200 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                {language === 'pt' ? benefit.titlePortuguese : benefit.title}
              </h4>
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  benefit.category === 'business' ? 'bg-blue-100 text-blue-700' :
                  benefit.category === 'cultural' ? 'bg-purple-100 text-purple-700' :
                  benefit.category === 'education' ? 'bg-green-100 text-green-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {benefit.category}
                </span>
                {benefit.discountAmount && (
                  <span className="text-xs font-semibold text-accent-600">
                    {benefit.discountAmount}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PartnershipIntegrationDashboard