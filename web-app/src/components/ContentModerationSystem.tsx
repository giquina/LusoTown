'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  FlagIcon,
  EyeIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'

interface ContentValidation {
  isValid: boolean
  category: 'transport' | 'cultural' | 'business' | 'housing' | 'community' | 'event' | 'blocked' | null
  score: number // 0-100, higher is better
  issues: {
    type: 'error' | 'warning' | 'suggestion'
    message: string
    severity: 'high' | 'medium' | 'low'
  }[]
  allowedReasons: string[]
  blockedReasons: string[]
  suggestedImprovements: string[]
}

interface ModerationRule {
  id: string
  name: string
  type: 'allow' | 'block' | 'flag'
  keywords: string[]
  patterns: RegExp[]
  weight: number
  category?: string
}

export default function ContentModerationSystem({ 
  content, 
  onValidationResult 
}: { 
  content: string
  onValidationResult: (validation: ContentValidation) => void 
}) {
  const { language } = useLanguage()
  const [showDetails, setShowDetails] = useState(false)
  
  const isPortuguese = language === 'pt'

  // Portuguese Community Content Rules
  const moderationRules: ModerationRule[] = [
    // ALLOWED CONTENT - Portuguese Community Focus
    {
      id: 'portuguese_keywords',
      name: 'Portuguese Community Keywords',
      type: 'allow',
      keywords: [
        'portuguese', 'português', 'portuguesa', 'portugues',
        'brazil', 'brasil', 'brazilian', 'brasileiro', 'brasileira',
        'angola', 'angolan', 'mozambique', 'cape verde', 'cabo verde',
        'azores', 'açores', 'madeira', 'guinea bissau',
        'fado', 'pastéis', 'nata', 'saudade', 'desenrascanço',
        'convívio', 'morriña', 'cafezinho', 'jeitinho',
        'santos populares', 'festa junina', 'carnival', 'carnaval'
      ],
      patterns: [
        /portugal|português|portuguesa/i,
        /brasil|brazil|brasileiro|brasileira/i,
        /fado|pastéis de nata|saudade/i,
        /lusophone|lusófono|lusitano/i
      ],
      weight: 30,
      category: 'cultural'
    },
    {
      id: 'transport_services',
      name: 'Transport Services',
      type: 'allow',
      keywords: [
        'transport', 'transporte', 'transfer', 'airport', 'aeroporto',
        'chauffeur', 'motorista', 'tour', 'passeio', 'guide', 'guia',
        'uber', 'taxi', 'car', 'carro', 'vehicle', 'veículo',
        'pickup', 'apanhar', 'drop off', 'deixar',
        'heathrow', 'gatwick', 'stansted', 'luton'
      ],
      patterns: [
        /transport|transfer|chauffeur|tour guide/i,
        /airport (pickup|transfer|service)/i,
        /available (this|next) (weekend|week)/i
      ],
      weight: 25,
      category: 'transport'
    },
    {
      id: 'community_events',
      name: 'Community Events',
      type: 'allow',
      keywords: [
        'event', 'evento', 'celebration', 'celebração',
        'workshop', 'oficina', 'class', 'aula', 'lesson', 'lição',
        'networking', 'meetup', 'encontro', 'gathering', 'reunião',
        'cultural', 'cultural', 'traditional', 'tradicional',
        'food', 'comida', 'cooking', 'culinária', 'recipe', 'receita'
      ],
      patterns: [
        /portuguese (event|workshop|class|night)/i,
        /(hosting|organizing|planning) .*(event|workshop|meetup)/i,
        /join us for|vem connosco para/i
      ],
      weight: 20,
      category: 'event'
    },
    {
      id: 'business_services',
      name: 'Business Services',
      type: 'allow',
      keywords: [
        'business', 'negócio', 'empresa', 'service', 'serviço',
        'restaurant', 'restaurante', 'bakery', 'padaria',
        'shop', 'loja', 'store', 'professional', 'profissional',
        'recommendation', 'recomendação', 'review', 'avaliação'
      ],
      patterns: [
        /portuguese (business|restaurant|bakery|shop)/i,
        /recommend|recommendo|suggest|sugiro/i,
        /(great|amazing|excellent) (service|food|experience)/i
      ],
      weight: 15,
      category: 'business'
    },
    {
      id: 'housing_community',
      name: 'Housing Community Areas',
      type: 'allow',
      keywords: [
        'housing', 'habitação', 'rent', 'aluguer', 'flat', 'apartamento',
        'room', 'quarto', 'house', 'casa', 'accommodation', 'alojamento',
        'stockwell', 'vauxhall', 'elephant castle', 'borough', 'southwark',
        'portuguese area', 'área portuguesa', 'community area'
      ],
      patterns: [
        /(flat|room|house) (available|disponível)/i,
        /in (stockwell|vauxhall|elephant|borough)/i,
        /great for portuguese (community|speakers)/i
      ],
      weight: 15,
      category: 'housing'
    },

    // BLOCKED CONTENT
    {
      id: 'non_portuguese_business',
      name: 'Non-Portuguese Business Promotion',
      type: 'block',
      keywords: [
        'generic business', 'random promotion', 'unrelated service'
      ],
      patterns: [
        /selling .* (not|without) .* portuguese/i,
        /business opportunity .* (mlm|pyramid|scheme)/i,
        /click here|link in bio|dm me for details/i
      ],
      weight: -30,
      category: 'blocked'
    },
    {
      id: 'personal_drama',
      name: 'Personal Relationship Drama',
      type: 'block',
      keywords: [
        'relationship drama', 'personal issues', 'drama', 'fight',
        'argument', 'discussão', 'problema pessoal', 'ex boyfriend',
        'ex girlfriend', 'dating problems'
      ],
      patterns: [
        /my (ex|boyfriend|girlfriend) .* (drama|problem|issue)/i,
        /relationship (drama|problems|issues)/i,
        /personal (attack|drama|issue) .* not community related/i
      ],
      weight: -25,
      category: 'blocked'
    },
    {
      id: 'random_lifestyle',
      name: 'Random Lifestyle Posts',
      type: 'flag',
      keywords: [
        'what i ate today', 'gym selfie', 'random thought',
        'unrelated photo', 'personal lifestyle'
      ],
      patterns: [
        /just had (lunch|dinner|coffee) .* (not|without) .* (portuguese|community)/i,
        /random (thought|photo|post)/i,
        /my (workout|gym|fitness) .* unrelated/i
      ],
      weight: -15,
      category: 'blocked'
    },
    {
      id: 'political_non_community',
      name: 'Non-Community Political Content',
      type: 'block',
      keywords: [
        'politics', 'política', 'political party', 'partido político',
        'election', 'eleição', 'government', 'governo'
      ],
      patterns: [
        /(uk|british) politics .* not .* portuguese/i,
        /political (opinion|view|stance) .* unrelated/i,
        /vote for .* (not|without) .* community/i
      ],
      weight: -20,
      category: 'blocked'
    }
  ]

  const validateContent = (inputContent: string): ContentValidation => {
    if (!inputContent || inputContent.trim().length < 10) {
      return {
        isValid: false,
        category: null,
        score: 0,
        issues: [{
          type: 'error',
          message: isPortuguese ? 'Conteúdo muito curto' : 'Content too short',
          severity: 'high'
        }],
        allowedReasons: [],
        blockedReasons: [],
        suggestedImprovements: [
          isPortuguese 
            ? 'Adicione mais detalhes sobre a relevância para a comunidade portuguesa'
            : 'Add more details about Portuguese community relevance'
        ]
      }
    }

    const content = inputContent.toLowerCase()
    let score = 0
    let category: ContentValidation['category'] = null
    const issues: ContentValidation['issues'] = []
    const allowedReasons: string[] = []
    const blockedReasons: string[] = []
    const suggestedImprovements: string[] = []

    // Check against all moderation rules
    for (const rule of moderationRules) {
      let ruleMatched = false

      // Check keywords
      for (const keyword of rule.keywords) {
        if (content.includes(keyword.toLowerCase())) {
          ruleMatched = true
          break
        }
      }

      // Check patterns if keywords didn't match
      if (!ruleMatched) {
        for (const pattern of rule.patterns) {
          if (pattern.test(content)) {
            ruleMatched = true
            break
          }
        }
      }

      if (ruleMatched) {
        score += rule.weight

        if (rule.type === 'allow') {
          allowedReasons.push(rule.name)
          if (rule.category && !category) {
            category = rule.category as ContentValidation['category']
          }
        } else if (rule.type === 'block') {
          blockedReasons.push(rule.name)
          issues.push({
            type: 'error',
            message: isPortuguese 
              ? `Conteúdo bloqueado: ${rule.name}`
              : `Blocked content: ${rule.name}`,
            severity: 'high'
          })
        } else if (rule.type === 'flag') {
          issues.push({
            type: 'warning',
            message: isPortuguese 
              ? `Conteúdo sinalizado: ${rule.name}`
              : `Flagged content: ${rule.name}`,
            severity: 'medium'
          })
        }
      }
    }

    // Location relevance check
    const londonKeywords = ['london', 'londres', 'uk', 'reino unido', 'england', 'inglaterra']
    const hasLondonConnection = londonKeywords.some(keyword => content.includes(keyword))
    
    if (!hasLondonConnection) {
      issues.push({
        type: 'suggestion',
        message: isPortuguese 
          ? 'Considere mencionar a localização em Londres'
          : 'Consider mentioning London location',
        severity: 'low'
      })
      suggestedImprovements.push(
        isPortuguese 
          ? 'Adicione referência a áreas de Londres onde a comunidade portuguesa está presente'
          : 'Add reference to London areas where Portuguese community is present'
      )
    }

    // Community relevance check
    if (score < 10 && allowedReasons.length === 0) {
      issues.push({
        type: 'error',
        message: isPortuguese 
          ? 'Conteúdo não é relevante para a comunidade portuguesa'
          : 'Content is not relevant to Portuguese community',
        severity: 'high'
      })
      blockedReasons.push('Low community relevance')
      suggestedImprovements.push(
        isPortuguese 
          ? 'Adicione conexão com cultura, serviços ou comunidade portuguesa'
          : 'Add connection to Portuguese culture, services, or community'
      )
    }

    // Quality suggestions
    if (score > 0 && score < 30) {
      suggestedImprovements.push(
        isPortuguese 
          ? 'Adicione mais detalhes específicos da comunidade portuguesa'
          : 'Add more specific Portuguese community details'
      )
    }

    const isValid = score >= 20 && issues.filter(i => i.type === 'error').length === 0
    const finalScore = Math.max(0, Math.min(100, score + 50)) // Normalize to 0-100

    const validation: ContentValidation = {
      isValid,
      category,
      score: finalScore,
      issues,
      allowedReasons,
      blockedReasons,
      suggestedImprovements
    }

    // Call the callback with validation result
    onValidationResult(validation)

    return validation
  }

  // Run validation when content changes
  React.useEffect(() => {
    if (content) {
      validateContent(content)
    }
  }, [content])

  const validation = validateContent(content)

  if (!content) return null

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="space-y-4"
    >
      {/* Validation Score */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-gray-900 flex items-center gap-2">
            <ShieldCheckIcon className="w-5 h-5 text-primary-600" />
            {isPortuguese ? 'Análise de Conteúdo' : 'Content Analysis'}
          </h4>
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
            validation.isValid 
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}>
            {validation.isValid ? (
              <CheckCircleIcon className="w-4 h-4" />
            ) : (
              <XCircleIcon className="w-4 h-4" />
            )}
            {validation.isValid 
              ? (isPortuguese ? 'Aprovado' : 'Approved')
              : (isPortuguese ? 'Bloqueado' : 'Blocked')
            }
          </div>
        </div>

        {/* Score Bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-secondary-600">
              {isPortuguese ? 'Relevância da Comunidade' : 'Community Relevance'}
            </span>
            <span className="font-medium">{validation.score}/100</span>
          </div>
          <div className="w-full bg-secondary-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                validation.score >= 70 ? 'bg-action-500' :
                validation.score >= 40 ? 'bg-accent-500' :
                'bg-coral-500'
              }`}
              style={{ width: `${validation.score}%` }}
            />
          </div>
        </div>

        {/* Category */}
        {validation.category && (
          <div className="mb-3">
            <span className="text-sm text-secondary-600">
              {isPortuguese ? 'Categoria:' : 'Category:'}
            </span>
            <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
              validation.category === 'transport' ? 'bg-blue-100 text-primary-700' :
              validation.category === 'cultural' ? 'bg-purple-100 text-purple-700' :
              validation.category === 'business' ? 'bg-green-100 text-green-700' :
              validation.category === 'housing' ? 'bg-orange-100 text-orange-700' :
              validation.category === 'event' ? 'bg-pink-100 text-pink-700' :
              'bg-secondary-100 text-secondary-700'
            }`}>
              {validation.category}
            </span>
          </div>
        )}

        {/* Toggle Details */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
        >
          <EyeIcon className="w-4 h-4" />
          {showDetails 
            ? (isPortuguese ? 'Ocultar detalhes' : 'Hide details')
            : (isPortuguese ? 'Ver detalhes' : 'View details')
          }
        </button>
      </div>

      {/* Detailed Analysis */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            {/* Issues */}
            {validation.issues.length > 0 && (
              <div className="space-y-2">
                {validation.issues.map((issue, index) => (
                  <div 
                    key={index}
                    className={`border rounded-lg p-3 ${
                      issue.type === 'error' ? 'bg-red-50 border-red-200' :
                      issue.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                      'bg-blue-50 border-blue-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {issue.type === 'error' ? (
                        <XCircleIcon className="w-4 h-4 text-coral-600" />
                      ) : issue.type === 'warning' ? (
                        <ExclamationTriangleIcon className="w-4 h-4 text-yellow-600" />
                      ) : (
                        <InformationCircleIcon className="w-4 h-4 text-primary-600" />
                      )}
                      <span className={`text-sm font-medium ${
                        issue.type === 'error' ? 'text-red-800' :
                        issue.type === 'warning' ? 'text-yellow-800' :
                        'text-blue-800'
                      }`}>
                        {issue.message}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Allowed Reasons */}
            {validation.allowedReasons.length > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <h5 className="font-medium text-green-800 mb-2 flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4" />
                  {isPortuguese ? 'Critérios Atendidos' : 'Met Criteria'}
                </h5>
                <ul className="text-sm text-green-700 list-disc list-inside">
                  {validation.allowedReasons.map((reason, index) => (
                    <li key={index}>{reason}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Blocked Reasons */}
            {validation.blockedReasons.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <h5 className="font-medium text-red-800 mb-2 flex items-center gap-2">
                  <FlagIcon className="w-4 h-4" />
                  {isPortuguese ? 'Razões de Bloqueio' : 'Blocking Reasons'}
                </h5>
                <ul className="text-sm text-red-700 list-disc list-inside">
                  {validation.blockedReasons.map((reason, index) => (
                    <li key={index}>{reason}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Suggestions */}
            {validation.suggestedImprovements.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <h5 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                  <UserGroupIcon className="w-4 h-4" />
                  {isPortuguese ? 'Sugestões de Melhoria' : 'Improvement Suggestions'}
                </h5>
                <ul className="text-sm text-primary-700 list-disc list-inside">
                  {validation.suggestedImprovements.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}