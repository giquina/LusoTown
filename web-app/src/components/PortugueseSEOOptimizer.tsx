'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  MagnifyingGlassIcon,
  ChartBarIcon,
  GlobeAltIcon,
  TrendingUpIcon,
  MapPinIcon,
  LanguageIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'

interface SEOKeyword {
  keyword: string
  keywordPortuguese?: string
  searchVolume: number
  difficulty: 'low' | 'medium' | 'high'
  intent: 'informational' | 'navigational' | 'transactional' | 'commercial'
  location: 'london' | 'uk' | 'global'
  trendsData: {
    current: number
    trend: 'rising' | 'stable' | 'declining'
    seasonal?: boolean
  }
  competitorRanking?: number
  userSearchBehavior: {
    peakSearchTimes: string[]
    commonVariations: string[]
    relatedQueries: string[]
  }
}

interface LocalSEOStrategy {
  area: string
  areaPortuguese: string
  portugalCommunitySize: number
  competitionLevel: 'low' | 'medium' | 'high'
  businessOpportunities: string[]
  businessOpportunitiesPortuguese: string[]
  keywordTargets: string[]
  contentStrategy: {
    contentType: string
    contentTypePortuguese: string
    frequency: string
    topics: string[]
    topicsPortuguese: string[]
  }
}

interface PortugueseSEOOptimizerProps {
  currentPage: string
  userLocation?: string
  businessType?: 'transport' | 'events' | 'community' | 'general'
  targetAudience?: 'portuguese' | 'brazilian' | 'lusophone' | 'mixed'
}

export default function PortugueseSEOOptimizer({
  currentPage,
  userLocation = 'london',
  businessType = 'general',
  targetAudience = 'mixed'
}: PortugueseSEOOptimizerProps) {
  const { language } = useLanguage()
  const [seoAnalysis, setSeoAnalysis] = useState<any>(null)
  const [keywordOpportunities, setKeywordOpportunities] = useState<SEOKeyword[]>([])
  const [localStrategies, setLocalStrategies] = useState<LocalSEOStrategy[]>([])
  const [performanceMetrics, setPerformanceMetrics] = useState<any>(null)

  const isPortuguese = language === 'pt'

  // Portuguese SEO keywords for UK market with search data
  const portugueseKeywords: SEOKeyword[] = [
    {
      keyword: 'portuguese community london',
      keywordPortuguese: 'comunidade portuguesa londres',
      searchVolume: 2400,
      difficulty: 'medium',
      intent: 'informational',
      location: 'london',
      trendsData: {
        current: 85,
        trend: 'rising',
        seasonal: false
      },
      competitorRanking: 3,
      userSearchBehavior: {
        peakSearchTimes: ['18:00-21:00', 'Saturday morning', 'Sunday afternoon'],
        commonVariations: [
          'portuguese people london',
          'lusitanos londres',
          'portugueses em londres'
        ],
        relatedQueries: [
          'portuguese events london',
          'portuguese restaurants london',
          'portuguese church london'
        ]
      }
    },
    {
      keyword: 'brazilian community london',
      keywordPortuguese: 'comunidade brasileira londres',
      searchVolume: 3200,
      difficulty: 'medium',
      intent: 'informational',
      location: 'london',
      trendsData: {
        current: 92,
        trend: 'rising',
        seasonal: false
      },
      competitorRanking: 4,
      userSearchBehavior: {
        peakSearchTimes: ['19:00-22:00', 'Weekend evenings'],
        commonVariations: [
          'brasileiros em londres',
          'brazilian expats london',
          'brazil london community'
        ],
        relatedQueries: [
          'brazilian events london',
          'capoeira london',
          'brazilian food london'
        ]
      }
    },
    {
      keyword: 'portuguese transport london',
      keywordPortuguese: 'transporte português londres',
      searchVolume: 890,
      difficulty: 'low',
      intent: 'transactional',
      location: 'london',
      trendsData: {
        current: 78,
        trend: 'stable',
        seasonal: true
      },
      userSearchBehavior: {
        peakSearchTimes: ['08:00-10:00', '17:00-19:00'],
        commonVariations: [
          'portuguese speaking driver london',
          'motorista português londres',
          'transporte falante português'
        ],
        relatedQueries: [
          'airport transfer portuguese',
          'executive transport london',
          'luxury car service london'
        ]
      }
    },
    {
      keyword: 'portuguese events london',
      keywordPortuguese: 'eventos portugueses londres',
      searchVolume: 1750,
      difficulty: 'medium',
      intent: 'commercial',
      location: 'london',
      trendsData: {
        current: 88,
        trend: 'rising',
        seasonal: true
      },
      userSearchBehavior: {
        peakSearchTimes: ['Thursday-Sunday evenings'],
        commonVariations: [
          'fado nights london',
          'portuguese cultural events',
          'santos populares london'
        ],
        relatedQueries: [
          'portuguese cultural centre london',
          'fado music london',
          'portuguese festivals uk'
        ]
      }
    },
    {
      keyword: 'portuguese business london',
      keywordPortuguese: 'negócios portugueses londres',
      searchVolume: 680,
      difficulty: 'low',
      intent: 'commercial',
      location: 'london',
      trendsData: {
        current: 72,
        trend: 'stable'
      },
      userSearchBehavior: {
        peakSearchTimes: ['Business hours', 'Tuesday-Thursday'],
        commonVariations: [
          'portuguese entrepreneurs london',
          'portuguese networking london',
          'empresários portugueses londres'
        ],
        relatedQueries: [
          'portuguese chamber commerce uk',
          'portuguese business directory',
          'startup visa portugal uk'
        ]
      }
    },
    {
      keyword: 'little portugal london',
      keywordPortuguese: 'pequena portugal londres',
      searchVolume: 920,
      difficulty: 'low',
      intent: 'informational',
      location: 'london',
      trendsData: {
        current: 85,
        trend: 'rising'
      },
      userSearchBehavior: {
        peakSearchTimes: ['Weekend days', 'Tourist hours'],
        commonVariations: [
          'portuguese area london',
          'vauxhall portuguese',
          'stockwell portuguese community'
        ],
        relatedQueries: [
          'portuguese restaurants vauxhall',
          'portuguese shops london',
          'portuguese market london'
        ]
      }
    },
    {
      keyword: 'portuguese mentorship uk',
      keywordPortuguese: 'mentoria portuguesa reino unido',
      searchVolume: 320,
      difficulty: 'low',
      intent: 'informational',
      location: 'uk',
      trendsData: {
        current: 65,
        trend: 'rising'
      },
      userSearchBehavior: {
        peakSearchTimes: ['Business hours', 'Career-focused times'],
        commonVariations: [
          'portuguese career advice uk',
          'professional mentor portugal',
          'mentoria profissional londres'
        ],
        relatedQueries: [
          'career guidance portuguese',
          'professional development uk',
          'business mentor london'
        ]
      }
    },
    {
      keyword: 'portuguese housing assistance london',
      keywordPortuguese: 'assistência habitacional portuguesa londres',
      searchVolume: 450,
      difficulty: 'low',
      intent: 'transactional',
      location: 'london',
      trendsData: {
        current: 82,
        trend: 'rising'
      },
      userSearchBehavior: {
        peakSearchTimes: ['Evenings', 'Weekends'],
        commonVariations: [
          'ajuda habitação portugueses',
          'housing help portuguese speakers',
          'portuguese housing support'
        ],
        relatedQueries: [
          'renting london portuguese',
          'portuguese letting agents',
          'housing advice portuguese'
        ]
      }
    }
  ]

  // Local SEO strategies for different London areas
  const londonPortugueseAreas: LocalSEOStrategy[] = [
    {
      area: 'Vauxhall & Stockwell',
      areaPortuguese: 'Vauxhall e Stockwell',
      portugalCommunitySize: 8500,
      competitionLevel: 'high',
      businessOpportunities: [
        'Portuguese restaurants and cafes',
        'Portuguese cultural tours',
        'Community transport services',
        'Language learning centers'
      ],
      businessOpportunitiesPortuguese: [
        'Restaurantes e cafés portugueses',
        'Tours culturais portugueses',
        'Serviços de transporte comunitário',
        'Centros de aprendizagem de idiomas'
      ],
      keywordTargets: [
        'portuguese vauxhall',
        'stockwell portuguese community',
        'little portugal south london',
        'portuguese restaurants vauxhall'
      ],
      contentStrategy: {
        contentType: 'Local community guides and business directories',
        contentTypePortuguese: 'Guias comunitários locais e diretórios de negócios',
        frequency: 'Weekly',
        topics: [
          'Portuguese heritage in Vauxhall',
          'Local Portuguese businesses',
          'Community events calendar',
          'Transport connections'
        ],
        topicsPortuguese: [
          'Património português em Vauxhall',
          'Negócios portugueses locais',
          'Calendário de eventos comunitários',
          'Conexões de transporte'
        ]
      }
    },
    {
      area: 'Elephant & Castle',
      areaPortuguese: 'Elephant & Castle',
      portugalCommunitySize: 4200,
      competitionLevel: 'medium',
      businessOpportunities: [
        'Brazilian and Portuguese fusion cuisine',
        'Cultural event spaces',
        'Professional networking hubs',
        'Student accommodation services'
      ],
      businessOpportunitiesPortuguese: [
        'Culinária de fusão brasileira e portuguesa',
        'Espaços para eventos culturais',
        'Centros de networking profissional',
        'Serviços de acomodação estudantil'
      ],
      keywordTargets: [
        'portuguese elephant castle',
        'brazilian community elephant castle',
        'lusophone south london',
        'portuguese cultural centre london'
      ],
      contentStrategy: {
        contentType: 'Cultural event promotion and community news',
        contentTypePortuguese: 'Promoção de eventos culturais e notícias comunitárias',
        frequency: 'Bi-weekly',
        topics: [
          'Cultural fusion events',
          'Student community support',
          'Professional development',
          'Local transport options'
        ],
        topicsPortuguese: [
          'Eventos de fusão cultural',
          'Apoio à comunidade estudantil',
          'Desenvolvimento profissional',
          'Opções de transporte local'
        ]
      }
    },
    {
      area: 'West London (Golborne Road)',
      areaPortuguese: 'Oeste de Londres (Golborne Road)',
      portugalCommunitySize: 2800,
      competitionLevel: 'low',
      businessOpportunities: [
        'Portuguese artisan goods',
        'Cultural workshops',
        'Premium transport services',
        'Professional services'
      ],
      businessOpportunitiesPortuguese: [
        'Produtos artesanais portugueses',
        'Workshops culturais',
        'Serviços de transporte premium',
        'Serviços profissionais'
      ],
      keywordTargets: [
        'portuguese west london',
        'golborne road portuguese',
        'portuguese notting hill',
        'portuguese culture west london'
      ],
      contentStrategy: {
        contentType: 'Premium service promotion and cultural preservation',
        contentTypePortuguese: 'Promoção de serviços premium e preservação cultural',
        frequency: 'Monthly',
        topics: [
          'Portuguese artisan crafts',
          'Cultural workshops',
          'Premium lifestyle services',
          'Heritage preservation'
        ],
        topicsPortuguese: [
          'Artesanato português',
          'Workshops culturais',
          'Serviços de estilo de vida premium',
          'Preservação do património'
        ]
      }
    }
  ]

  useEffect(() => {
    analyzeCurrentPageSEO()
    identifyKeywordOpportunities()
    generateLocalStrategies()
    calculatePerformanceMetrics()
  }, [currentPage, userLocation, businessType, targetAudience])

  const analyzeCurrentPageSEO = () => {
    // Mock SEO analysis for current page
    const analysis = {
      currentKeywords: extractPageKeywords(),
      portugalReadiness: calculatePortugalReadiness(),
      localSEOScore: calculateLocalSEOScore(),
      multilingualOptimization: assessMultilingualSEO(),
      competitorGaps: identifyCompetitorGaps(),
      recommendations: generateSEORecommendations()
    }
    setSeoAnalysis(analysis)
  }

  const extractPageKeywords = () => {
    // Simulate keyword extraction from current page
    const pageKeywords = [
      { keyword: 'portuguese community', density: 2.3, placement: 'good' },
      { keyword: 'london transport', density: 1.8, placement: 'excellent' },
      { keyword: 'cultural events', density: 1.5, placement: 'good' },
      { keyword: 'lusophone', density: 0.8, placement: 'poor' }
    ]
    return pageKeywords
  }

  const calculatePortugalReadiness = () => {
    // Calculate how well optimized the page is for Portuguese SEO
    return {
      score: 78,
      factors: {
        languageTargeting: 85,
        culturalRelevance: 92,
        localSignals: 65,
        userExperience: 80
      }
    }
  }

  const calculateLocalSEOScore = () => {
    return {
      overall: 72,
      factors: {
        googleMyBusiness: 85,
        localCitations: 68,
        reviews: 75,
        proximitySignals: 70
      }
    }
  }

  const assessMultilingualSEO = () => {
    return {
      hreflangImplementation: 'partial',
      portugalTranslationQuality: 'good',
      culturalAdaptation: 'excellent',
      recommendations: [
        'Implement hreflang tags for Portuguese content',
        'Optimize meta descriptions in Portuguese',
        'Create Portuguese-specific landing pages'
      ]
    }
  }

  const identifyCompetitorGaps = () => {
    return [
      {
        gap: 'Portuguese transport services SEO',
        opportunity: 'Low competition for "transporte português londres"',
        difficulty: 'low',
        estimatedTraffic: 2400
      },
      {
        gap: 'Brazilian business networking',
        opportunity: 'Underserved "networking brasileiro londres"',
        difficulty: 'medium',
        estimatedTraffic: 1800
      },
      {
        gap: 'Portuguese cultural events discovery',
        opportunity: 'Limited "eventos culturais portugueses"',
        difficulty: 'low',
        estimatedTraffic: 3200
      }
    ]
  }

  const generateSEORecommendations = () => {
    return [
      {
        priority: 'high',
        recommendation: 'Create location-specific landing pages for Portuguese areas',
        recommendationPortuguese: 'Criar páginas de destino específicas para áreas portuguesas',
        impact: 'high',
        effort: 'medium'
      },
      {
        priority: 'high',
        recommendation: 'Optimize for "portuguese [service] london" keyword patterns',
        recommendationPortuguese: 'Otimizar para padrões de palavras-chave "português [serviço] londres"',
        impact: 'high',
        effort: 'low'
      },
      {
        priority: 'medium',
        recommendation: 'Build Portuguese business directory with SEO optimization',
        recommendationPortuguese: 'Construir diretório de negócios portugueses com otimização SEO',
        impact: 'medium',
        effort: 'high'
      }
    ]
  }

  const identifyKeywordOpportunities = () => {
    // Filter keywords based on business type and location
    const relevantKeywords = portugueseKeywords.filter(keyword => {
      if (businessType === 'transport') return keyword.keyword.includes('transport')
      if (businessType === 'events') return keyword.keyword.includes('event')
      if (businessType === 'community') return keyword.intent === 'informational'
      return true
    })

    setKeywordOpportunities(relevantKeywords.slice(0, 5)) // Top 5 opportunities
  }

  const generateLocalStrategies = () => {
    // Filter strategies based on user location
    const relevantStrategies = londonPortugueseAreas.filter(area => {
      if (userLocation === 'south_london') return area.area.includes('Vauxhall') || area.area.includes('Elephant')
      if (userLocation === 'west_london') return area.area.includes('West London')
      return true
    })

    setLocalStrategies(relevantStrategies)
  }

  const calculatePerformanceMetrics = () => {
    // Mock performance data
    const metrics = {
      organicTraffic: {
        portuguese: 2400,
        english: 8700,
        total: 11100,
        growth: '+23%'
      },
      keywordRankings: {
        topRankings: 12,
        improvingRankings: 8,
        decliningRankings: 2
      },
      localVisibility: {
        londonAreas: 78,
        ukNational: 65,
        portugalGlobal: 45
      },
      conversionRates: {
        portugalTraffic: 18.5,
        englishTraffic: 12.3,
        average: 14.2
      }
    }
    setPerformanceMetrics(metrics)
  }

  if (!seoAnalysis) return null

  return (
    <div className="space-y-8">
      {/* SEO Performance Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-6 text-white"
      >
        <div className="flex items-center gap-3 mb-6">
          <MagnifyingGlassIcon className="w-6 h-6" />
          <h2 className="text-xl font-bold">
            {isPortuguese ? 'Otimização SEO Portuguesa' : 'Portuguese SEO Optimization'}
          </h2>
        </div>

        {performanceMetrics && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{performanceMetrics.organicTraffic.total.toLocaleString()}</div>
              <div className="text-primary-200 text-sm">
                {isPortuguese ? 'Tráfego Orgânico' : 'Organic Traffic'}
              </div>
              <div className="text-xs text-green-300">{performanceMetrics.organicTraffic.growth}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{performanceMetrics.keywordRankings.topRankings}</div>
              <div className="text-primary-200 text-sm">
                {isPortuguese ? 'Top Rankings' : 'Top Rankings'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{performanceMetrics.localVisibility.londonAreas}%</div>
              <div className="text-primary-200 text-sm">
                {isPortuguese ? 'Visibilidade Local' : 'Local Visibility'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{performanceMetrics.conversionRates.portugalTraffic}%</div>
              <div className="text-primary-200 text-sm">
                {isPortuguese ? 'Conversão PT' : 'PT Conversion'}
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* SEO Analysis Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <ChartBarIcon className="w-5 h-5 text-primary-600" />
            {isPortuguese ? 'Análise SEO Atual' : 'Current SEO Analysis'}
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">{isPortuguese ? 'Prontidão Portuguesa' : 'Portuguese Readiness'}</span>
              <div className="flex items-center gap-2">
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${seoAnalysis.portugalReadiness.score}%` }}
                  />
                </div>
                <span className="text-sm font-semibold">{seoAnalysis.portugalReadiness.score}%</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-700">{isPortuguese ? 'SEO Local' : 'Local SEO'}</span>
              <div className="flex items-center gap-2">
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${seoAnalysis.localSEOScore.overall}%` }}
                  />
                </div>
                <span className="text-sm font-semibold">{seoAnalysis.localSEOScore.overall}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUpIcon className="w-5 h-5 text-accent-600" />
            {isPortuguese ? 'Oportunidades de Palavras-chave' : 'Keyword Opportunities'}
          </h3>
          
          <div className="space-y-3">
            {keywordOpportunities.slice(0, 3).map((keyword, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-semibold text-gray-900 text-sm">
                    {isPortuguese ? keyword.keywordPortuguese || keyword.keyword : keyword.keyword}
                  </div>
                  <div className="text-xs text-gray-600">
                    {keyword.searchVolume.toLocaleString()} {isPortuguese ? 'buscas/mês' : 'searches/month'}
                  </div>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  keyword.difficulty === 'low' ? 'bg-green-100 text-green-700' :
                  keyword.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {keyword.difficulty}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Local SEO Strategies */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <MapPinIcon className="w-5 h-5 text-coral-600" />
          {isPortuguese ? 'Estratégias SEO Locais' : 'Local SEO Strategies'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {localStrategies.map((strategy, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">
                {isPortuguese ? strategy.areaPortuguese : strategy.area}
              </h4>
              <div className="text-sm text-gray-600 mb-3">
                {strategy.portugalCommunitySize.toLocaleString()} {isPortuguese ? 'portugueses' : 'Portuguese residents'}
              </div>
              
              <div className="space-y-2">
                <div className={`text-xs px-2 py-1 rounded ${
                  strategy.competitionLevel === 'low' ? 'bg-green-100 text-green-700' :
                  strategy.competitionLevel === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {strategy.competitionLevel} competition
                </div>
                
                <div className="text-sm">
                  <strong>{isPortuguese ? 'Frequência de conteúdo:' : 'Content frequency:'}</strong> {strategy.contentStrategy.frequency}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SEO Recommendations */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <CheckCircleIcon className="w-5 h-5 text-green-600" />
          {isPortuguese ? 'Recomendações Prioritárias' : 'Priority Recommendations'}
        </h3>
        
        <div className="space-y-4">
          {seoAnalysis.recommendations.map((rec: any, index: number) => (
            <div key={index} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
              <div className={`w-3 h-3 rounded-full mt-2 ${
                rec.priority === 'high' ? 'bg-red-500' :
                rec.priority === 'medium' ? 'bg-yellow-500' :
                'bg-green-500'
              }`} />
              <div className="flex-1">
                <div className="font-semibold text-gray-900 mb-1">
                  {isPortuguese ? rec.recommendationPortuguese : rec.recommendation}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>Impact: {rec.impact}</span>
                  <span>Effort: {rec.effort}</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    rec.priority === 'high' ? 'bg-red-100 text-red-700' :
                    rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {rec.priority} priority
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Competitor Gap Analysis */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <ExclamationTriangleIcon className="w-5 h-5 text-orange-600" />
          {isPortuguese ? 'Lacunas dos Concorrentes' : 'Competitor Gaps'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {seoAnalysis.competitorGaps.map((gap: any, index: number) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">{gap.gap}</h4>
              <p className="text-sm text-gray-600 mb-3">{gap.opportunity}</p>
              <div className="flex items-center justify-between">
                <span className={`text-xs px-2 py-1 rounded ${
                  gap.difficulty === 'low' ? 'bg-green-100 text-green-700' :
                  gap.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {gap.difficulty} difficulty
                </span>
                <span className="text-sm font-semibold text-primary-600">
                  {gap.estimatedTraffic.toLocaleString()} visits/month
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}