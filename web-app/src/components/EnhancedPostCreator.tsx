'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { 
  XMarkIcon,
  PhotoIcon,
  CalendarDaysIcon,
  MapPinIcon,
  BriefcaseIcon,
  HomeIcon,
  TruckIcon,
  SparklesIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { useSubscription } from '@/context/SubscriptionContext'

interface PostTemplate {
  id: string
  title: string
  icon: React.ComponentType<any>
  category: 'transport' | 'cultural' | 'business' | 'housing' | 'community' | 'event'
  requiredTier?: 'free' | 'community' | 'ambassador'
  template: string
  fields: {
    label: string
    type: 'text' | 'textarea' | 'select' | 'date' | 'location'
    options?: string[]
    required: boolean
  }[]
}

interface ContentValidationResult {
  isValid: boolean
  category: string | null
  issues: string[]
  suggestions: string[]
}

export default function EnhancedPostCreator({ 
  onCreatePost, 
  onClose 
}: { 
  onCreatePost: (content: string, category: string, template?: string) => void
  onClose: () => void 
}) {
  const { language, t } = useLanguage()
  const { membershipTier } = useSubscription()
  const [selectedTemplate, setSelectedTemplate] = useState<PostTemplate | null>(null)
  const [content, setContent] = useState('')
  const [templateValues, setTemplateValues] = useState<Record<string, string>>({})
  const [validation, setValidation] = useState<ContentValidationResult | null>(null)
  const [showValidation, setShowValidation] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const isPortuguese = language === 'pt'

  // Service-specific post templates
  const postTemplates: PostTemplate[] = [
    {
      id: 'transport_available',
      title: isPortuguese ? '🚗 Serviço de Transporte Disponível' : '🚗 Transport Service Available',
      icon: TruckIcon,
      category: 'transport',
      requiredTier: 'ambassador',
      template: `🚗 Transport Service Available

Service Type: {serviceType}
Date & Time: {dateTime}
Areas Covered: {areas}
Languages: Portuguese, English
Special Notes: {specialNotes}

#TransportePortugues #LusoTownTransport #PortugueseCommunity`,
      fields: [
        {
          label: isPortuguese ? 'Tipo de Serviço' : 'Service Type',
          type: 'select',
          options: [
            'Airport Transfer',
            'City Tour',
            'Chauffeur Service',
            'Group Transport',
            'Event Transport'
          ],
          required: true
        },
        {
          label: isPortuguese ? 'Data e Hora' : 'Date & Time',
          type: 'text',
          required: true
        },
        {
          label: isPortuguese ? 'Áreas Cobertas' : 'Areas Covered',
          type: 'text',
          required: true
        },
        {
          label: isPortuguese ? 'Notas Especiais' : 'Special Notes',
          type: 'textarea',
          required: false
        }
      ]
    },
    {
      id: 'tour_experience',
      title: isPortuguese ? '🏛️ Experiência de Tour Partilhada' : '🏛️ Tour Experience Shared',
      icon: MapPinIcon,
      category: 'cultural',
      template: `🏛️ Tour Experience Shared

Location: {location}
Cultural Highlights: {highlights}
Recommendations: {recommendations}
Tips for Portuguese visitors: {tips}

#CulturalTour #PortugueseInLondon #LusoTownExperience`,
      fields: [
        {
          label: isPortuguese ? 'Localização' : 'Location',
          type: 'text',
          required: true
        },
        {
          label: isPortuguese ? 'Destaques Culturais' : 'Cultural Highlights',
          type: 'textarea',
          required: true
        },
        {
          label: isPortuguese ? 'Recomendações' : 'Recommendations',
          type: 'textarea',
          required: true
        },
        {
          label: isPortuguese ? 'Dicas para Visitantes Portugueses' : 'Tips for Portuguese Visitors',
          type: 'textarea',
          required: false
        }
      ]
    },
    {
      id: 'event_promotion',
      title: isPortuguese ? '🎉 Promoção de Evento Português' : '🎉 Portuguese Event Promotion',
      icon: CalendarDaysIcon,
      category: 'event',
      requiredTier: 'community',
      template: `🎉 Portuguese Community Event

Event: {eventName}
Date & Time: {dateTime}
Location: {location}
Transport Available: {transport}
Cultural Elements: {culturalElements}

#EventoPortugues #ComunidadePortuguesa #LusoTownEvents`,
      fields: [
        {
          label: isPortuguese ? 'Nome do Evento' : 'Event Name',
          type: 'text',
          required: true
        },
        {
          label: isPortuguese ? 'Data e Hora' : 'Date & Time',
          type: 'date',
          required: true
        },
        {
          label: isPortuguese ? 'Local' : 'Location',
          type: 'location',
          required: true
        },
        {
          label: isPortuguese ? 'Transporte Disponível' : 'Transport Available',
          type: 'select',
          options: ['Yes - Included', 'Yes - Additional cost', 'No'],
          required: true
        },
        {
          label: isPortuguese ? 'Elementos Culturais' : 'Cultural Elements',
          type: 'textarea',
          required: true
        }
      ]
    },
    {
      id: 'business_recommendation',
      title: isPortuguese ? '💼 Recomendação de Negócio' : '💼 Business Recommendation',
      icon: BriefcaseIcon,
      category: 'business',
      template: `💼 Portuguese Business Recommendation

Business: {businessName}
Category: {category}
Location: {location}
Why I recommend: {recommendation}
Portuguese connection: {connection}

#NegocioPortugues #BusinessRec #ComunidadePortuguesa`,
      fields: [
        {
          label: isPortuguese ? 'Nome do Negócio' : 'Business Name',
          type: 'text',
          required: true
        },
        {
          label: isPortuguese ? 'Categoria' : 'Category',
          type: 'select',
          options: [
            'Restaurant',
            'Bakery',
            'Services',
            'Professional Services',
            'Cultural Center',
            'Shop',
            'Other'
          ],
          required: true
        },
        {
          label: isPortuguese ? 'Localização' : 'Location',
          type: 'location',
          required: true
        },
        {
          label: isPortuguese ? 'Por que recomendo' : 'Why I recommend',
          type: 'textarea',
          required: true
        },
        {
          label: isPortuguese ? 'Conexão Portuguesa' : 'Portuguese Connection',
          type: 'textarea',
          required: true
        }
      ]
    },
    {
      id: 'housing_opportunity',
      title: isPortuguese ? '🏠 Oportunidade de Habitação' : '🏠 Housing Opportunity',
      icon: HomeIcon,
      category: 'housing',
      template: `🏠 Housing Opportunity - Portuguese Community Area

Property: {propertyType}
Location: {location}
Price: {price}
Why great for Portuguese community: {communityBenefits}
Contact: {contact}

#HousingLondon #PortugueseCommunity #LusoTownHousing`,
      fields: [
        {
          label: isPortuguese ? 'Tipo de Propriedade' : 'Property Type',
          type: 'select',
          options: ['Studio', '1-Bedroom', '2-Bedroom', '3-Bedroom', '4+ Bedroom', 'House Share'],
          required: true
        },
        {
          label: isPortuguese ? 'Localização' : 'Location',
          type: 'location',
          required: true
        },
        {
          label: isPortuguese ? 'Preço' : 'Price',
          type: 'text',
          required: true
        },
        {
          label: isPortuguese ? 'Benefícios para a Comunidade' : 'Community Benefits',
          type: 'textarea',
          required: true
        },
        {
          label: isPortuguese ? 'Contacto' : 'Contact',
          type: 'text',
          required: false
        }
      ]
    }
  ]

  // Content validation system
  const validateContent = (inputContent: string): ContentValidationResult => {
    const content = inputContent.toLowerCase()
    
    // LusoTown relevant keywords
    const portugueseKeywords = ['portuguese', 'português', 'brasil', 'brazil', 'fado', 'pastéis', 'saudade']
    const communityKeywords = ['community', 'comunidade', 'evento', 'event', 'cultural']
    const serviceKeywords = ['transport', 'transporte', 'tour', 'chauffeur', 'business', 'negócio']
    const locationKeywords = ['london', 'stockwell', 'vauxhall', 'elephant', 'borough', 'soho']
    
    // Blocked content patterns
    const blockedPatterns = [
      /general.*social.*media/i,
      /random.*lifestyle/i,
      /relationship.*drama/i,
      /political.*(?!portuguese.*community)/i,
      /non.*portuguese.*business/i
    ]
    
    const issues: string[] = []
    const suggestions: string[] = []
    let category: string | null = null
    
    // Check for blocked content
    for (const pattern of blockedPatterns) {
      if (pattern.test(content)) {
        issues.push(isPortuguese ? 
          'Conteúdo não relacionado à comunidade portuguesa detectado' : 
          'Non-Portuguese community content detected'
        )
      }
    }
    
    // Determine category
    if (serviceKeywords.some(keyword => content.includes(keyword))) {
      category = 'service'
    } else if (communityKeywords.some(keyword => content.includes(keyword))) {
      category = 'community'
    } else if (portugueseKeywords.some(keyword => content.includes(keyword))) {
      category = 'cultural'
    }
    
    // Check relevance
    const hasPortugueseConnection = portugueseKeywords.some(keyword => content.includes(keyword))
    const hasLondonConnection = locationKeywords.some(keyword => content.includes(keyword))
    const hasCommunityRelevance = communityKeywords.some(keyword => content.includes(keyword)) || 
                                  serviceKeywords.some(keyword => content.includes(keyword))
    
    if (!hasPortugueseConnection && !hasCommunityRelevance) {
      issues.push(isPortuguese ? 
        'Adicione conexão com a comunidade portuguesa' : 
        'Add Portuguese community connection'
      )
      suggestions.push(isPortuguese ? 
        'Mencione aspectos culturais portugueses ou relevância para a comunidade' :
        'Mention Portuguese cultural aspects or community relevance'
      )
    }
    
    if (!hasLondonConnection) {
      suggestions.push(isPortuguese ? 
        'Considere mencionar localizações em Londres' :
        'Consider mentioning London locations'
      )
    }
    
    return {
      isValid: issues.length === 0,
      category,
      issues,
      suggestions
    }
  }

  const handleContentChange = (newContent: string) => {
    setContent(newContent)
    const validationResult = validateContent(newContent)
    setValidation(validationResult)
    setShowValidation(validationResult.issues.length > 0 || validationResult.suggestions.length > 0)
  }

  const handleTemplateSelect = (template: PostTemplate) => {
    // Check if user has required tier
    if (template.requiredTier && template.requiredTier !== 'free' && membershipTier === 'free') {
      return // Show upgrade prompt instead
    }
    
    setSelectedTemplate(template)
    setTemplateValues({})
    setContent('')
  }

  const generateTemplateContent = () => {
    if (!selectedTemplate) return ''
    
    let templateContent = selectedTemplate.template
    
    selectedTemplate.fields.forEach(field => {
      const value = templateValues[field.label] || `{${field.label}}`
      templateContent = templateContent.replace(`{${field.label.replace(/\s+/g, '')}}`, value)
    })
    
    return templateContent
  }

  const handleCreatePost = () => {
    const finalContent = selectedTemplate ? generateTemplateContent() : content
    const finalValidation = validateContent(finalContent)
    
    if (finalValidation.isValid) {
      onCreatePost(
        finalContent, 
        finalValidation.category || 'general',
        selectedTemplate?.id
      )
      onClose()
    }
  }

  const canUseTemplate = (template: PostTemplate): boolean => {
    if (!template.requiredTier) return true
    if (template.requiredTier === 'free') return true
    if (membershipTier === 'ambassador') return true
    if (membershipTier === 'community' && template.requiredTier !== 'ambassador') return true
    return false
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <SparklesIcon className="w-6 h-6 text-primary-500" />
                {isPortuguese ? 'Criar Publicação da Comunidade' : 'Create Community Post'}
              </h3>
              <p className="text-secondary-600 mt-1">
                {isPortuguese 
                  ? 'Partilhe conteúdo relevante para a comunidade portuguesa em Londres'
                  : 'Share content relevant to the Portuguese community in London'
                }
              </p>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-secondary-700 p-2"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Template Selection */}
          {!selectedTemplate && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-4">
                {isPortuguese ? 'Escolha um Modelo (Opcional)' : 'Choose a Template (Optional)'}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {postTemplates.map((template) => {
                  const canUse = canUseTemplate(template)
                  const Icon = template.icon
                  
                  return (
                    <button
                      key={template.id}
                      onClick={() => canUse ? handleTemplateSelect(template) : null}
                      disabled={!canUse}
                      className={`p-4 rounded-lg border text-left transition-all ${
                        canUse
                          ? 'border-gray-200 hover:border-primary-300 hover:bg-primary-50'
                          : 'border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className="w-5 h-5 text-primary-600" />
                        <span className="font-medium text-gray-900">{template.title}</span>
                        {template.requiredTier && template.requiredTier !== 'free' && (
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            canUse 
                              ? 'bg-primary-100 text-primary-700'
                              : 'bg-secondary-200 text-secondary-600'
                          }`}>
                            {template.requiredTier}
                          </span>
                        )}
                      </div>
                      {!canUse && (
                        <p className="text-sm text-gray-500">
                          {isPortuguese ? 'Requer upgrade da subscrição' : 'Requires subscription upgrade'}
                        </p>
                      )}
                    </button>
                  )
                })}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  {isPortuguese ? 'Criar publicação livre' : 'Create free-form post'}
                </button>
              </div>
            </div>
          )}

          {/* Template Form */}
          {selectedTemplate && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold">
                  {selectedTemplate.title}
                </h4>
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="text-gray-500 hover:text-secondary-700 text-sm"
                >
                  {isPortuguese ? 'Mudar modelo' : 'Change template'}
                </button>
              </div>
              
              <div className="grid gap-4">
                {selectedTemplate.fields.map((field, index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">
                      {field.label}
                      {field.required && <span className="text-coral-500">*</span>}
                    </label>
                    
                    {field.type === 'textarea' ? (
                      <textarea
                        value={templateValues[field.label] || ''}
                        onChange={(e) => setTemplateValues(prev => ({
                          ...prev,
                          [field.label]: e.target.value
                        }))}
                        className="w-full border border-secondary-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
                        rows={3}
                        required={field.required}
                      />
                    ) : field.type === 'select' ? (
                      <select
                        value={templateValues[field.label] || ''}
                        onChange={(e) => setTemplateValues(prev => ({
                          ...prev,
                          [field.label]: e.target.value
                        }))}
                        className="w-full border border-secondary-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
                        required={field.required}
                      >
                        <option value="">
                          {isPortuguese ? 'Selecione...' : 'Select...'}
                        </option>
                        {field.options?.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        value={templateValues[field.label] || ''}
                        onChange={(e) => setTemplateValues(prev => ({
                          ...prev,
                          [field.label]: e.target.value
                        }))}
                        className="w-full border border-secondary-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
                        required={field.required}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Content Input */}
          {!selectedTemplate && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                {isPortuguese ? 'Conteúdo da Publicação' : 'Post Content'}
              </label>
              <textarea
                value={content}
                onChange={(e) => handleContentChange(e.target.value)}
                placeholder={isPortuguese 
                  ? 'Partilhe algo relevante para a comunidade portuguesa em Londres...'
                  : 'Share something relevant to the Portuguese community in London...'
                }
                className="w-full border border-secondary-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-400 resize-none"
                rows={6}
              />
            </div>
          )}

          {/* Content Validation */}
          <AnimatePresence>
            {showValidation && validation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6"
              >
                {validation.issues.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <ExclamationTriangleIcon className="w-5 h-5 text-coral-600" />
                      <h5 className="font-semibold text-red-800">
                        {isPortuguese ? 'Conteúdo Bloqueado' : 'Content Blocked'}
                      </h5>
                    </div>
                    <ul className="text-sm text-red-700 list-disc list-inside">
                      {validation.issues.map((issue, index) => (
                        <li key={index}>{issue}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {validation.suggestions.length > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <InformationCircleIcon className="w-5 h-5 text-primary-600" />
                      <h5 className="font-semibold text-blue-800">
                        {isPortuguese ? 'Sugestões de Melhoria' : 'Improvement Suggestions'}
                      </h5>
                    </div>
                    <ul className="text-sm text-primary-700 list-disc list-inside">
                      {validation.suggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex gap-2">
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="p-2 text-gray-500 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"
                title={isPortuguese ? 'Adicionar foto' : 'Add photo'}
              >
                <PhotoIcon className="w-5 h-5" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                multiple
              />
            </div>
            
            <div className="flex items-center gap-3">
              {validation?.isValid && (
                <div className="flex items-center gap-2 text-action-600">
                  <CheckCircleIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    {isPortuguese ? 'Conteúdo aprovado' : 'Content approved'}
                  </span>
                </div>
              )}
              
              <button
                onClick={onClose}
                className="px-4 py-2 text-secondary-700 bg-secondary-100 rounded-lg hover:bg-secondary-200 transition-colors"
              >
                {isPortuguese ? 'Cancelar' : 'Cancel'}
              </button>
              
              <button
                onClick={handleCreatePost}
                disabled={selectedTemplate ? 
                  selectedTemplate.fields.some(f => f.required && !templateValues[f.label]) :
                  !content.trim() || !validation?.isValid
                }
                className="px-6 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-semibold hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPortuguese ? 'Publicar' : 'Post'}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}