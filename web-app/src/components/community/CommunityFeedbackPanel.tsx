'use client'

/**
 * Community Feedback Panel for Lusophone AI Ethics
 * 
 * Provides interface for Portuguese-speaking community members to give feedback on AI features,
 * cultural accuracy, privacy concerns, and heritage respect. Implements culturally-sensitive
 * feedback collection with bilingual support and community values respect.
 */

import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { useAIConsent } from '@/context/AIConsentContext'
import { aiEthicsEngine } from '@/services/AIEthicsEngine'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { 
  Heart, 
  Shield, 
  MessageSquare, 
  Users, 
  Flag, 
  Star,
  ChevronRight,
  CheckCircle,
  AlertTriangle,
  Globe,
  Book
} from 'lucide-react'

interface FeedbackResponse {
  question_id: string
  response: string | number
  cultural_context?: string
  additional_comments?: string
}

interface CommunityFeedbackState {
  current_survey?: {
    id: string
    title: string
    description: string
    questions: FeedbackQuestion[]
    progress: number
  }
  feedback_history: {
    id: string
    date: string
    type: string
    status: 'completed' | 'in_progress'
  }[]
  community_impact: {
    total_participants: number
    your_contributions: number
    improvements_implemented: number
    cultural_accuracy_score: number
  }
}

interface FeedbackQuestion {
  id: string
  type: 'rating' | 'multiple_choice' | 'text' | 'cultural_scale'
  question_en: string
  question_pt: string
  context_en?: string
  context_pt?: string
  options?: string[]
  cultural_significance?: 'low' | 'medium' | 'high' | 'critical'
  required: boolean
}

export default function CommunityFeedbackPanel() {
  const { language, t } = useLanguage()
  const { culturalSensitivityLevel, hasGivenConsent } = useAIConsent()
  
  const [feedbackState, setFeedbackState] = useState<CommunityFeedbackState>({
    feedback_history: [],
    community_impact: {
      total_participants: 0,
      your_contributions: 0,
      improvements_implemented: 0,
      cultural_accuracy_score: 0.85
    }
  })
  
  const [currentResponses, setCurrentResponses] = useState<Record<string, FeedbackResponse>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState<'current' | 'history' | 'impact' | 'ethics_dashboard'>('current')

  // Lusophone cultural feedback categories
  const feedbackCategories = {
    heritage_respect: {
      icon: Heart,
      name_en: 'Heritage Respect',
      name_pt: 'Respeito pelo Património',
      description_en: 'How well does AI respect Lusophone cultural heritage?',
      description_pt: 'Quão bem a IA respeita o património cultural português?'
    },
    language_preservation: {
      icon: Book,
      name_en: 'Language Preservation',
      name_pt: 'Preservação da Língua',
      description_en: 'Effectiveness of Portuguese language support and dialect preservation',
      description_pt: 'Eficácia do suporte à língua portuguesa e preservação de dialetos'
    },
    privacy_protection: {
      icon: Shield,
      name_en: 'Privacy Protection',
      name_pt: 'Proteção da Privacidade',
      description_en: 'Trust in AI privacy measures for Portuguese-speaking community data',
      description_pt: 'Confiança nas medidas de privacidade da IA para dados da comunidade de falantes de português'
    },
    cultural_accuracy: {
      icon: Flag,
      name_en: 'Cultural Accuracy',
      name_pt: 'Precisão Cultural',
      description_en: 'Accuracy of AI understanding of Portuguese culture and values',
      description_pt: 'Precisão da compreensão da IA sobre cultura e valores portugueses'
    },
    community_benefits: {
      icon: Users,
      name_en: 'Community Benefits',
      name_pt: 'Benefícios Comunitários',
      description_en: 'How AI features strengthen Portuguese-speaking community connections',
      description_pt: 'Como as funcionalidades de IA fortalecem as conexões da comunidade de falantes de português'
    }
  }

  useEffect(() => {
    loadCommunityFeedbackData()
  }, [])

  const loadCommunityFeedbackData = async () => {
    try {
      // Load current survey if available
      const currentSurvey = await loadCurrentSurvey()
      if (currentSurvey) {
        setFeedbackState(prev => ({ ...prev, current_survey: currentSurvey }))
      }

      // Load feedback history
      const history = await loadFeedbackHistory()
      
      // Load community impact metrics
      const impact = await loadCommunityImpact()
      
      setFeedbackState(prev => ({
        ...prev,
        feedback_history: history,
        community_impact: impact
      }))
    } catch (error) {
      console.error('Failed to load community feedback data:', error)
    }
  }

  const loadCurrentSurvey = async () => {
    // In production, this would fetch from the AI Ethics Engine
    const surveyQuestions: FeedbackQuestion[] = [
      {
        id: 'heritage_respect_overall',
        type: 'cultural_scale',
        question_en: 'How well does LusoTown AI respect Lusophone cultural heritage?',
        question_pt: 'Quão bem a IA do LusoTown respeita o património cultural português?',
        context_en: 'Consider how AI handles Portuguese traditions, regional differences, and cultural sensitivities',
        context_pt: 'Considere como a IA lida com tradições portuguesas, diferenças regionais e sensibilidades culturais',
        cultural_significance: 'critical',
        required: true
      },
      {
        id: 'language_preservation_satisfaction',
        type: 'rating',
        question_en: 'How satisfied are you with Portuguese language preservation features?',
        question_pt: 'Quão satisfeito está com as funcionalidades de preservação da língua portuguesa?',
        context_en: 'Rate the quality of Lusophone content, dialect support, and bilingual balance',
        context_pt: 'Avalie a qualidade do conteúdo português, suporte a dialetos e equilíbrio bilíngue',
        cultural_significance: 'high',
        required: true
      },
      {
        id: 'privacy_trust_level',
        type: 'rating',
        question_en: 'How much do you trust AI privacy protections for Lusophone cultural data?',
        question_pt: 'Quanto confia nas proteções de privacidade da IA para dados culturais portugueses?',
        context_en: 'Consider family stories, heritage information, and personal cultural data',
        context_pt: 'Considere histórias familiares, informações patrimoniais e dados culturais pessoais',
        cultural_significance: 'critical',
        required: true
      },
      {
        id: 'cultural_accuracy_feedback',
        type: 'text',
        question_en: 'Share specific examples where AI cultural understanding could improve',
        question_pt: 'Partilhe exemplos específicos onde a compreensão cultural da IA poderia melhorar',
        context_en: 'Help us understand cultural nuances we might be missing',
        context_pt: 'Ajude-nos a compreender nuances culturais que possamos estar a perder',
        cultural_significance: 'high',
        required: false
      },
      {
        id: 'saudade_sensitivity',
        type: 'multiple_choice',
        question_en: 'How well does AI understand and respect the concept of saudade?',
        question_pt: 'Quão bem a IA compreende e respeita o conceito de saudade?',
        options: [
          'Excellent understanding',
          'Good but could improve',
          'Basic understanding only',
          'Poor understanding',
          'Excelente compreensão',
          'Boa mas pode melhorar',
          'Compreensão básica apenas',
          'Má compreensão'
        ],
        cultural_significance: 'critical',
        required: true
      }
    ]

    return {
      id: 'monthly_ai_ethics_survey_2025_01',
      title: language === 'pt' ? 'Feedback Mensal sobre Ética da IA' : 'Monthly AI Ethics Feedback',
      description: language === 'pt' 
        ? 'Ajude-nos a melhorar o respeito da IA pela cultura portuguesa'
        : 'Help us improve AI respect for Portuguese culture',
      questions: surveyQuestions,
      progress: 0
    }
  }

  const loadFeedbackHistory = async () => {
    return [
      {
        id: 'survey_2024_12',
        date: '2024-12-15',
        type: 'Monthly Ethics Survey',
        status: 'completed' as const
      },
      {
        id: 'cultural_accuracy_2024_11',
        date: '2024-11-20',
        type: 'Cultural Accuracy Review',
        status: 'completed' as const
      }
    ]
  }

  const loadCommunityImpact = async () => {
    return {
      total_participants: 487,
      your_contributions: 3,
      improvements_implemented: 12,
      cultural_accuracy_score: 0.87
    }
  }

  const handleResponseChange = (questionId: string, value: string | number, additionalComments?: string) => {
    setCurrentResponses(prev => ({
      ...prev,
      [questionId]: {
        question_id: questionId,
        response: value,
        cultural_context: culturalSensitivityLevel,
        additional_comments: additionalComments
      }
    }))

    // Update progress
    if (feedbackState.current_survey) {
      const totalQuestions = feedbackState.current_survey.questions.length
      const answeredQuestions = Object.keys(currentResponses).length + 1
      const progress = (answeredQuestions / totalQuestions) * 100

      setFeedbackState(prev => ({
        ...prev,
        current_survey: prev.current_survey ? {
          ...prev.current_survey,
          progress
        } : undefined
      }))
    }
  }

  const submitFeedback = async () => {
    if (!feedbackState.current_survey) return

    setIsSubmitting(true)
    try {
      // Submit feedback to AI Ethics Engine
      const responses = Object.values(currentResponses)
      
      // Add cultural context to submission
      const culturalContext = {
        language_preference: language,
        cultural_sensitivity_level: culturalSensitivityLevel,
        heritage_connection: hasGivenConsent,
        submission_timestamp: new Date().toISOString()
      }

      // In production, this would submit to the backend
      console.log('Submitting Portuguese-speaking community AI ethics feedback:', {
        survey_id: feedbackState.current_survey.id,
        responses,
        cultural_context: culturalContext
      })

      // Simulate successful submission
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Clear current responses and update history
      setCurrentResponses({})
      setFeedbackState(prev => ({
        ...prev,
        current_survey: undefined,
        feedback_history: [
          {
            id: prev.current_survey?.id || 'completed',
            date: new Date().toISOString(),
            type: 'Monthly Ethics Survey',
            status: 'completed'
          },
          ...prev.feedback_history
        ],
        community_impact: {
          ...prev.community_impact,
          your_contributions: prev.community_impact.your_contributions + 1
        }
      }))

      // Show success message
      alert(language === 'pt' 
        ? 'Obrigado pelo seu feedback! As suas contribuições ajudam a melhorar o respeito da IA pela cultura portuguesa.'
        : 'Thank you for your feedback! Your contributions help improve AI respect for Portuguese culture.'
      )
    } catch (error) {
      console.error('Failed to submit feedback:', error)
      alert(language === 'pt' 
        ? 'Erro ao submeter feedback. Tente novamente.'
        : 'Error submitting feedback. Please try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderFeedbackQuestion = (question: FeedbackQuestion) => {
    const questionText = language === 'pt' ? question.question_pt : question.question_en
    const contextText = language === 'pt' ? question.context_pt : question.context_en

    return (
      <Card key={question.id} className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              {questionText}
              {question.required && <span className="text-red-500">*</span>}
            </CardTitle>
            {question.cultural_significance && (
              <Badge variant={question.cultural_significance === 'critical' ? 'destructive' : 'secondary'}>
                {question.cultural_significance === 'critical' ? 
                  (language === 'pt' ? 'Crítico' : 'Critical') :
                  (language === 'pt' ? 'Importante' : 'Important')
                }
              </Badge>
            )}
          </div>
          {contextText && (
            <p className="text-sm text-muted-foreground">{contextText}</p>
          )}
        </CardHeader>
        <CardContent>
          {question.type === 'rating' && (
            <div className="space-y-3">
              <RadioGroup 
                value={currentResponses[question.id]?.response?.toString() || ''}
                onValueChange={(value) => handleResponseChange(question.id, parseInt(value))}
              >
                {[1, 2, 3, 4, 5].map((rating) => (
                  <div key={rating} className="flex items-center space-x-2">
                    <RadioGroupItem value={rating.toString()} id={`${question.id}-${rating}`} />
                    <Label htmlFor={`${question.id}-${rating}`} className="flex items-center gap-1">
                      {Array.from({ length: rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="ml-2">
                        {rating === 1 && (language === 'pt' ? 'Muito Mau' : 'Very Poor')}
                        {rating === 2 && (language === 'pt' ? 'Mau' : 'Poor')}
                        {rating === 3 && (language === 'pt' ? 'Regular' : 'Average')}
                        {rating === 4 && (language === 'pt' ? 'Bom' : 'Good')}
                        {rating === 5 && (language === 'pt' ? 'Excelente' : 'Excellent')}
                      </span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {question.type === 'cultural_scale' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>{language === 'pt' ? 'Nível de Respeito Cultural' : 'Cultural Respect Level'}</Label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { value: 5, label_en: 'Deeply Respectful', label_pt: 'Profundamente Respeitoso' },
                    { value: 4, label_en: 'Generally Respectful', label_pt: 'Geralmente Respeitoso' },
                    { value: 3, label_en: 'Somewhat Respectful', label_pt: 'Algo Respeitoso' },
                    { value: 2, label_en: 'Needs Improvement', label_pt: 'Precisa Melhorias' },
                    { value: 1, label_en: 'Not Respectful', label_pt: 'Não Respeitoso' }
                  ].map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem 
                        value={option.value.toString()} 
                        id={`${question.id}-${option.value}`}
                        checked={currentResponses[question.id]?.response === option.value}
                        onChange={() => handleResponseChange(question.id, option.value)}
                      />
                      <Label htmlFor={`${question.id}-${option.value}`}>
                        {language === 'pt' ? option.label_pt : option.label_en}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {question.type === 'multiple_choice' && question.options && (
            <RadioGroup 
              value={currentResponses[question.id]?.response?.toString() || ''}
              onValueChange={(value) => handleResponseChange(question.id, value)}
            >
              {question.options.slice(0, 4).map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`${question.id}-${index}`} />
                  <Label htmlFor={`${question.id}-${index}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {question.type === 'text' && (
            <div className="space-y-3">
              <Textarea
                placeholder={language === 'pt' ? 
                  'Partilhe os seus pensamentos e sugestões...' : 
                  'Share your thoughts and suggestions...'
                }
                value={currentResponses[question.id]?.response?.toString() || ''}
                onChange={(e) => handleResponseChange(question.id, e.target.value)}
                className="min-h-[100px]"
              />
              <p className="text-sm text-muted-foreground">
                {language === 'pt' ? 
                  'As suas contribuições ajudam a melhorar a sensibilidade cultural da IA' :
                  'Your contributions help improve AI cultural sensitivity'
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  const renderCommunityImpact = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            {language === 'pt' ? 'Impacto da Comunidade' : 'Community Impact'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{feedbackState.community_impact.total_participants}</div>
              <div className="text-sm text-muted-foreground">
                {language === 'pt' ? 'Participantes Total' : 'Total Participants'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{feedbackState.community_impact.your_contributions}</div>
              <div className="text-sm text-muted-foreground">
                {language === 'pt' ? 'Suas Contribuições' : 'Your Contributions'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{feedbackState.community_impact.improvements_implemented}</div>
              <div className="text-sm text-muted-foreground">
                {language === 'pt' ? 'Melhorias Implementadas' : 'Improvements Implemented'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {Math.round(feedbackState.community_impact.cultural_accuracy_score * 100)}%
              </div>
              <div className="text-sm text-muted-foreground">
                {language === 'pt' ? 'Precisão Cultural' : 'Cultural Accuracy'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Community Impact Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(feedbackCategories).map(([key, category]) => {
          const Icon = category.icon
          return (
            <Card key={key}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Icon className="h-5 w-5 text-primary" />
                  <span className="font-medium">
                    {language === 'pt' ? category.name_pt : category.name_en}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {language === 'pt' ? category.description_pt : category.description_en}
                </p>
                <div className="mt-3">
                  <Progress value={Math.random() * 40 + 60} className="h-2" />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )

  if (!hasGivenConsent) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">
            {language === 'pt' ? 'Consentimento Necessário' : 'Consent Required'}
          </h3>
          <p className="text-muted-foreground mb-4">
            {language === 'pt' ? 
              'Para participar no feedback da comunidade sobre ética da IA, precisa de dar consentimento para funcionalidades de IA.' :
              'To participate in community AI ethics feedback, you need to give consent for AI features.'
            }
          </p>
          <Button variant="outline">
            {language === 'pt' ? 'Gerir Consentimento' : 'Manage Consent'}
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            {language === 'pt' ? 'Feedback da Comunidade sobre Ética da IA' : 'Community AI Ethics Feedback'}
          </CardTitle>
          <p className="text-muted-foreground">
            {language === 'pt' ? 
              'Ajude a melhorar o respeito da IA pela cultura portuguesa e valores da comunidade' :
              'Help improve AI respect for Portuguese culture and community values'
            }
          </p>
        </CardHeader>
      </Card>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b">
        {[
          { id: 'current', label_en: 'Current Survey', label_pt: 'Inquérito Atual' },
          { id: 'history', label_en: 'History', label_pt: 'Histórico' },
          { id: 'impact', label_en: 'Community Impact', label_pt: 'Impacto Comunitário' }
        ].map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'default' : 'ghost'}
            onClick={() => setActiveTab(tab.id as any)}
          >
            {language === 'pt' ? tab.label_pt : tab.label_en}
          </Button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'current' && feedbackState.current_survey && (
        <div className="space-y-6">
          {/* Progress */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">
                  {language === 'pt' ? 'Progresso do Inquérito' : 'Survey Progress'}
                </span>
                <span className="text-sm text-muted-foreground">
                  {Math.round(feedbackState.current_survey.progress)}%
                </span>
              </div>
              <Progress value={feedbackState.current_survey.progress} />
            </CardContent>
          </Card>

          {/* Survey Questions */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{feedbackState.current_survey.title}</h3>
            <p className="text-muted-foreground mb-6">{feedbackState.current_survey.description}</p>
            
            {feedbackState.current_survey.questions.map(renderFeedbackQuestion)}

            {/* Submit Button */}
            <Card>
              <CardContent className="p-4">
                <Button 
                  onClick={submitFeedback} 
                  disabled={isSubmitting || Object.keys(currentResponses).length === 0}
                  className="w-full"
                >
                  {isSubmitting ? (
                    language === 'pt' ? 'A submeter...' : 'Submitting...'
                  ) : (
                    language === 'pt' ? 'Submeter Feedback' : 'Submit Feedback'
                  )}
                </Button>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  {language === 'pt' ? 
                    'O seu feedback é anónimo e ajuda a melhorar o respeito da IA pela cultura portuguesa' :
                    'Your feedback is anonymous and helps improve AI respect for Portuguese culture'
                  }
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'current' && !feedbackState.current_survey && (
        <Card>
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {language === 'pt' ? 'Nenhum Inquérito Ativo' : 'No Active Survey'}
            </h3>
            <p className="text-muted-foreground">
              {language === 'pt' ? 
                'Obrigado pelas suas contribuições anteriores! O próximo inquérito será disponibilizado em breve.' :
                'Thank you for your previous contributions! The next survey will be available soon.'
              }
            </p>
          </CardContent>
        </Card>
      )}

      {activeTab === 'history' && (
        <div className="space-y-4">
          {feedbackState.feedback_history.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{item.type}</h4>
                    <p className="text-sm text-muted-foreground">
                      {new Date(item.date).toLocaleDateString(language === 'pt' ? 'pt-PT' : 'en-GB')}
                    </p>
                  </div>
                  <Badge variant={item.status === 'completed' ? 'default' : 'secondary'}>
                    {item.status === 'completed' ? 
                      (language === 'pt' ? 'Concluído' : 'Completed') :
                      (language === 'pt' ? 'Em Progresso' : 'In Progress')
                    }
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'impact' && renderCommunityImpact()}
    </div>
  )
}