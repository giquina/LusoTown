// Lusophone Content Moderation System
// AI-powered content filtering for Portuguese language variants

interface ModerationResult {
  isAllowed: boolean
  confidence: number
  flaggedReasons: string[]
  culturalContext?: string
  suggestion?: string
}

interface PortugueseVariant {
  region: 'brazil' | 'portugal' | 'africa' | 'diaspora'
  commonTerms: string[]
  culturalPhrases: string[]
  slangTerms: string[]
}

// Portuguese language variants and regional considerations
const PORTUGUESE_VARIANTS: Record<string, PortugueseVariant> = {
  brazil: {
    region: 'brazil',
    commonTerms: ['você', 'vocês', 'tá', 'né', 'cara', 'mano', 'galera'],
    culturalPhrases: ['que massa', 'que legal', 'valeu', 'beleza', 'e aí'],
    slangTerms: ['véi', 'meu', 'parceiro', 'firmeza', 'suave']
  },
  portugal: {
    region: 'portugal',
    commonTerms: ['tu', 'vós', 'está', 'não é', 'pá', 'tipo', 'pessoal'],
    culturalPhrases: ['fixe', 'porreiro', 'obrigado', 'de nada', 'olá'],
    slangTerms: ['bué', 'gajo', 'gaja', 'bacano', 'brutal']
  },
  africa: {
    region: 'africa',
    commonTerms: ['você', 'vocês', 'está', 'não é verdade', 'pessoal'],
    culturalPhrases: ['como está', 'muito bem', 'obrigado', 'até logo'],
    slangTerms: ['bom dia', 'boa tarde', 'boa noite']
  },
  diaspora: {
    region: 'diaspora',
    commonTerms: ['você', 'tu', 'vocês', 'está', 'tá', 'pessoal'],
    culturalPhrases: ['saudades', 'que legal', 'fixe', 'obrigado'],
    slangTerms: ['mix of all variants']
  }
}

// Toxic content patterns for Lusophone
const TOXIC_PATTERNS = {
  hate_speech: [
    // General hate speech patterns
    /\b(idiota|estúpido|burro)\b/gi,
    /\b(vai se (f|lixar))\b/gi,
    /\b(cala a? ?boca)\b/gi,
  ],
  harassment: [
    /\b(seu lixo|sua merda)\b/gi,
    /\b(vai morrer|te mato)\b/gi,
    /\b(ninguém te quer|ninguém gosta de ti)\b/gi,
  ],
  spam: [
    /(.)\1{10,}/g, // Repeated characters
    /^[A-Z\s!]{20,}$/g, // All caps excessive
    /(https?:\/\/[^\s]+)/gi, // URLs (may be spam)
  ],
  inappropriate: [
    // Cultural sensitivity - avoid stereotypes
    /\b(todos os (brasileiros|portugueses) são)\b/gi,
    /\b(português não sabe)\b/gi,
    /\b(brasileiro é sempre)\b/gi,
  ]
}

// Positive cultural references to preserve
const CULTURAL_POSITIVES = [
  // Lusophone cultural elements
  'fado', 'pastéis de nata', 'bacalhau', 'saudade', 'azulejos',
  // Brazilian cultural elements  
  'samba', 'carnival', 'caipirinha', 'feijoada', 'bossa nova',
  // Shared cultural elements
  'futebol', 'língua portuguesa', 'lusofonia', 'cristiano ronaldo',
  'pelé', 'fernando pessoa', 'machado de assis'
]

// Lusophone profanity filter with context consideration
const PROFANITY_LEVELS = {
  mild: ['droga', 'raios', 'porra', 'caralho'], // Common but not severely offensive
  moderate: ['merda', 'fodasse', 'cabrão', 'puta'], // More offensive
  severe: ['filho da puta', 'vai para o caralho', 'puta que pariu'] // Highly offensive
}

export class PortugueseModerationEngine {
  private culturalContext: Map<string, string> = new Map()
  
  constructor() {
    this.initializeCulturalContext()
  }

  private initializeCulturalContext() {
    // Initialize cultural context understanding
    CULTURAL_POSITIVES.forEach(term => {
      this.culturalContext.set(term.toLowerCase(), 'positive_cultural')
    })
  }

  moderateMessage(
    message: string, 
    userRegion: 'brazil' | 'portugal' | 'africa' | 'diaspora',
    userRole: 'viewer' | 'subscriber' | 'moderator' | 'host'
  ): ModerationResult {
    const normalizedMessage = message.toLowerCase().trim()
    
    // Skip moderation for hosts and moderators for most content
    if (userRole === 'host' || userRole === 'moderator') {
      return {
        isAllowed: true,
        confidence: 1.0,
        flaggedReasons: []
      }
    }

    let isAllowed = true
    let confidence = 1.0
    const flaggedReasons: string[] = []

    // Check for toxic patterns
    Object.entries(TOXIC_PATTERNS).forEach(([category, patterns]) => {
      patterns.forEach(pattern => {
        if (pattern.test(normalizedMessage)) {
          isAllowed = false
          confidence = Math.max(0.8, confidence - 0.2)
          flaggedReasons.push(`toxic_${category}`)
        }
      })
    })

    // Check profanity levels
    const profanityLevel = this.checkProfanityLevel(normalizedMessage)
    if (profanityLevel.level === 'severe') {
      isAllowed = false
      confidence = Math.max(0.9, confidence - 0.1)
      flaggedReasons.push('severe_profanity')
    } else if (profanityLevel.level === 'moderate' && userRole === 'viewer') {
      // More lenient for subscribers
      isAllowed = false
      confidence = Math.max(0.7, confidence - 0.3)
      flaggedReasons.push('moderate_profanity')
    }

    // Check for spam patterns
    if (this.isSpam(message)) {
      isAllowed = false
      confidence = Math.max(0.9, confidence - 0.1)
      flaggedReasons.push('spam')
    }

    // Check cultural sensitivity
    const culturalCheck = this.checkCulturalSensitivity(normalizedMessage, userRegion)
    if (!culturalCheck.isAppropriate) {
      isAllowed = false
      confidence = Math.max(0.8, confidence - 0.2)
      flaggedReasons.push('cultural_insensitive')
    }

    return {
      isAllowed,
      confidence,
      flaggedReasons,
      culturalContext: culturalCheck.context,
      suggestion: this.getSuggestion(flaggedReasons)
    }
  }

  private checkProfanityLevel(message: string): { level: string, words: string[] } {
    const foundWords: string[] = []
    
    // Check severe profanity first
    for (const word of PROFANITY_LEVELS.severe) {
      if (message.includes(word.toLowerCase())) {
        foundWords.push(word)
      }
    }
    if (foundWords.length > 0) return { level: 'severe', words: foundWords }

    // Check moderate profanity
    for (const word of PROFANITY_LEVELS.moderate) {
      if (message.includes(word.toLowerCase())) {
        foundWords.push(word)
      }
    }
    if (foundWords.length > 0) return { level: 'moderate', words: foundWords }

    // Check mild profanity
    for (const word of PROFANITY_LEVELS.mild) {
      if (message.includes(word.toLowerCase())) {
        foundWords.push(word)
      }
    }
    if (foundWords.length > 0) return { level: 'mild', words: foundWords }

    return { level: 'none', words: [] }
  }

  private isSpam(message: string): boolean {
    // Check for repeated characters
    if (/(.)\1{5,}/.test(message)) return true
    
    // Check for excessive caps (more than 70% of message)
    const caps = message.match(/[A-Z]/g)?.length || 0
    const letters = message.match(/[A-Za-z]/g)?.length || 1
    if (caps / letters > 0.7 && message.length > 10) return true
    
    // Check for URLs (may be spam)
    if (/(https?:\/\/[^\s]+)/.test(message)) return true
    
    // Check for excessive punctuation
    if (/[!?]{4,}/.test(message)) return true
    
    return false
  }

  private checkCulturalSensitivity(
    message: string, 
    userRegion: 'brazil' | 'portugal' | 'africa' | 'diaspora'
  ): { isAppropriate: boolean, context?: string } {
    
    // Check for cultural stereotypes
    const stereotypePatterns = [
      /todos os (brasileiros|portugueses) são/gi,
      /os (brasileiros|portugueses) sempre/gi,
      /(brasil|portugal) é um país de/gi
    ]

    for (const pattern of stereotypePatterns) {
      if (pattern.test(message)) {
        return {
          isAppropriate: false,
          context: 'Avoid generalizations about Portuguese-speaking cultures'
        }
      }
    }

    // Check for positive cultural references
    for (const [term, context] of this.culturalContext) {
      if (message.includes(term)) {
        return {
          isAppropriate: true,
          context: `Positive cultural reference: ${term}`
        }
      }
    }

    return { isAppropriate: true }
  }

  private getSuggestion(flaggedReasons: string[]): string | undefined {
    if (flaggedReasons.includes('toxic_hate_speech')) {
      return 'Por favor, mantenha um tom respeitoso na conversa'
    }
    
    if (flaggedReasons.includes('severe_profanity')) {
      return 'Linguagem muito forte. Vamos manter um ambiente familiar?'
    }
    
    if (flaggedReasons.includes('spam')) {
      return 'Evite mensagens repetitivas ou com muitas maiúsculas'
    }
    
    if (flaggedReasons.includes('cultural_insensitive')) {
      return 'Celebremos nossa diversidade cultural portuguesa de forma positiva'
    }
    
    return undefined
  }

  // Auto-moderate common Lusophone expressions that might be flagged incorrectly
  isPortugueseExpression(message: string): boolean {
    const commonExpressions = [
      'porra', // Common exclamation, not always offensive
      'caralho', // Can be used as emphasis, not always offensive
      'foda-se', // Strong but sometimes acceptable in casual context
    ]

    // Check if it's used in a cultural/emotional context
    const culturalContexts = [
      'que porra é essa', // What the hell is this (surprise)
      'porra meu', // Expression of surprise
      'caralho que legal', // Expression of amazement
    ]

    return culturalContexts.some(context => 
      message.toLowerCase().includes(context.toLowerCase())
    )
  }

  // Get moderation statistics
  getModerationStats() {
    return {
      totalMessages: 0, // Would be tracked in real implementation
      flaggedMessages: 0,
      falsePositives: 0,
      culturallyPreservedMessages: 0
    }
  }
}

// Singleton instance
export const portugueseModerationEngine = new PortugueseModerationEngine()
export default portugueseModerationEngine