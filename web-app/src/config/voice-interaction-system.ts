/**
 * Advanced Voice Interaction System for LusoBot
 * Portuguese cultural voice personalities with regional accent support
 * Emotional intelligence and therapeutic voice responses
 */

import { Language } from '@/i18n'

export interface VoicePersonality {
  id: string
  name: {
    pt: string
    en: string
  }
  region: string
  country: string
  avatar: string
  characteristics: {
    warmth: number // 0-1 scale
    formality: number // 0-1 scale
    enthusiasm: number // 0-1 scale
    wisdom: number // 0-1 scale
    patience: number // 0-1 scale
    empathy: number // 0-1 scale
  }
  voiceSettings: {
    pitch: number // 0-2 scale (1 = normal)
    speed: number // 0-2 scale (1 = normal) 
    volume: number // 0-1 scale
    accent: string
    language: 'pt-PT' | 'pt-BR' | 'en-GB' | 'en-US'
  }
  speechPatterns: {
    greetings: VoiceLine[]
    expressions: VoiceLine[]
    encouragement: VoiceLine[]
    empathy: VoiceLine[]
    teaching: VoiceLine[]
    farewells: VoiceLine[]
  }
  culturalSpecialties: string[]
  emotionalResponses: EmotionalVoiceResponse[]
  contextualAdaptations: ContextualAdaptation[]
}

export interface VoiceLine {
  text: string
  emotion: 'neutral' | 'warm' | 'excited' | 'gentle' | 'wise' | 'encouraging'
  context: string[]
  culturalWeight: number // 0-1 scale
  therapeuticValue: number // 0-1 scale
}

export interface EmotionalVoiceResponse {
  trigger: 'saudade' | 'homesickness' | 'anxiety' | 'loneliness' | 'frustration' | 'joy' | 'pride'
  intensity: 'low' | 'medium' | 'high'
  response: {
    text: {
      pt: string
      en: string
    }
    voiceSettings: {
      pitch: number
      speed: number
      tone: string
    }
    pausePattern: number[] // milliseconds for dramatic pauses
  }
  followUp: string[]
  therapeuticNotes: {
    pt: string
    en: string
  }
}

export interface ContextualAdaptation {
  context: 'first_time_user' | 'returning_user' | 'homesick' | 'learning' | 'business' | 'casual'
  adaptations: {
    greetingStyle: 'formal' | 'warm' | 'enthusiastic' | 'gentle'
    vocabularyLevel: 'simple' | 'intermediate' | 'advanced'
    culturalReferences: number // 0-1 scale
    personalTouch: number // 0-1 scale
  }
}

export interface VoiceInteractionSession {
  sessionId: string
  userId: string
  personality: VoicePersonality
  context: string
  emotionalState: string
  preferences: {
    accent: string
    speed: number
    personality: string
  }
  conversationHistory: VoiceMessage[]
  culturalContext: string[]
}

export interface VoiceMessage {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
  emotionalTone: string
  culturalReferences: string[]
  therapeuticValue: number
}

/**
 * Voice Personality Database
 * Authentic Portuguese cultural personalities with regional characteristics
 */
export const VOICE_PERSONALITIES: VoicePersonality[] = [
  {
    id: 'avo-carinhosa',
    name: {
      pt: 'Avó Carinhosa',
      en: 'Loving Grandmother'
    },
    region: 'Minho',
    country: 'Portugal',
    avatar: '👵🇵🇹',
    characteristics: {
      warmth: 0.95,
      formality: 0.2,
      enthusiasm: 0.6,
      wisdom: 0.9,
      patience: 0.95,
      empathy: 0.95
    },
    voiceSettings: {
      pitch: 1.1,
      speed: 0.8,
      volume: 0.9,
      accent: 'northern-portuguese',
      language: 'pt-PT'
    },
    speechPatterns: {
      greetings: [
        {
          text: 'Olá, meu querido! Como estás hoje?',
          emotion: 'warm',
          context: ['first_meeting', 'daily_greeting'],
          culturalWeight: 0.9,
          therapeuticValue: 0.8
        },
        {
          text: 'Que bom ouvir-te, filho! Conta-me tudo.',
          emotion: 'gentle',
          context: ['returning_user', 'emotional_support'],
          culturalWeight: 0.85,
          therapeuticValue: 0.9
        }
      ],
      expressions: [
        {
          text: 'Ai, Jesus! Isso é mesmo importante.',
          emotion: 'wise',
          context: ['surprise', 'concern'],
          culturalWeight: 1.0,
          therapeuticValue: 0.6
        },
        {
          text: 'Pois é, a vida às vezes é assim mesmo.',
          emotion: 'gentle',
          context: ['understanding', 'acceptance'],
          culturalWeight: 0.9,
          therapeuticValue: 0.8
        }
      ],
      encouragement: [
        {
          text: 'Tu consegues, meu amor! Tens força dentro de ti.',
          emotion: 'encouraging',
          context: ['motivation', 'support'],
          culturalWeight: 0.8,
          therapeuticValue: 0.9
        },
        {
          text: 'A nossa família sempre foi forte. Tu também és.',
          emotion: 'wise',
          context: ['heritage', 'strength'],
          culturalWeight: 0.95,
          therapeuticValue: 0.85
        }
      ],
      empathy: [
        {
          text: 'Eu sei, querido. Às vezes o coração pesa.',
          emotion: 'gentle',
          context: ['sadness', 'saudade'],
          culturalWeight: 0.9,
          therapeuticValue: 0.95
        },
        {
          text: 'As saudades são difíceis, mas provam que amamos.',
          emotion: 'wise',
          context: ['homesickness', 'love'],
          culturalWeight: 1.0,
          therapeuticValue: 0.9
        }
      ],
      teaching: [
        {
          text: 'Deixa-me explicar-te isto como deve ser.',
          emotion: 'wise',
          context: ['teaching', 'patience'],
          culturalWeight: 0.8,
          therapeuticValue: 0.7
        },
        {
          text: 'Na nossa terra, fazíamos assim...',
          emotion: 'wise',
          context: ['tradition', 'cultural_teaching'],
          culturalWeight: 0.95,
          therapeuticValue: 0.8
        }
      ],
      farewells: [
        {
          text: 'Fica bem, querido. Um beijinho grande!',
          emotion: 'warm',
          context: ['goodbye', 'affection'],
          culturalWeight: 0.9,
          therapeuticValue: 0.8
        },
        {
          text: 'Até logo, meu amor. Deus te abençoe.',
          emotion: 'gentle',
          context: ['blessing', 'care'],
          culturalWeight: 0.95,
          therapeuticValue: 0.85
        }
      ]
    },
    culturalSpecialties: [
      'traditional_recipes',
      'family_wisdom',
      'regional_history',
      'emotional_support',
      'folk_traditions',
      'religious_customs'
    ],
    emotionalResponses: [
      {
        trigger: 'saudade',
        intensity: 'high',
        response: {
          text: {
            pt: 'Ai, meu querido... a saudade é pesada, não é? Vem cá, deixa a avó dar-te um abraço. Eu também sinto saudades da nossa terra.',
            en: 'Oh, my dear... saudade is heavy, isn\'t it? Come here, let grandma give you a hug. I also feel saudade for our homeland.'
          },
          voiceSettings: {
            pitch: 1.0,
            speed: 0.7,
            tone: 'gentle_melancholy'
          },
          pausePattern: [500, 300, 800, 400]
        },
        followUp: [
          'Tell me about what you miss most',
          'Would you like to hear a story from home?',
          'Shall we cook something traditional together?'
        ],
        therapeuticNotes: {
          pt: 'Validação emocional com presença materna e conexão cultural',
          en: 'Emotional validation with maternal presence and cultural connection'
        }
      },
      {
        trigger: 'anxiety',
        intensity: 'medium',
        response: {
          text: {
            pt: 'Calma, meu amor. Respira fundo comigo. Na nossa família sempre dizíamos: uma coisa de cada vez.',
            en: 'Calm down, my love. Take a deep breath with me. In our family we always said: one thing at a time.'
          },
          voiceSettings: {
            pitch: 0.9,
            speed: 0.6,
            tone: 'calming_presence'
          },
          pausePattern: [300, 500, 400, 600]
        },
        followUp: [
          'Let\'s practice some breathing together',
          'Would you like me to tell you a calming story?',
          'What would help you feel more peaceful?'
        ],
        therapeuticNotes: {
          pt: 'Técnica de respiração com ancoragem cultural e presença calmante',
          en: 'Breathing technique with cultural anchoring and calming presence'
        }
      }
    ],
    contextualAdaptations: [
      {
        context: 'first_time_user',
        adaptations: {
          greetingStyle: 'warm',
          vocabularyLevel: 'simple',
          culturalReferences: 0.7,
          personalTouch: 0.9
        }
      },
      {
        context: 'homesick',
        adaptations: {
          greetingStyle: 'gentle',
          vocabularyLevel: 'intermediate',
          culturalReferences: 0.95,
          personalTouch: 0.95
        }
      }
    ]
  },
  {
    id: 'professor-culto',
    name: {
      pt: 'Professor Culto',
      en: 'Cultured Professor'
    },
    region: 'Lisboa',
    country: 'Portugal',
    avatar: '👨‍🏫🇵🇹',
    characteristics: {
      warmth: 0.7,
      formality: 0.8,
      enthusiasm: 0.75,
      wisdom: 0.95,
      patience: 0.85,
      empathy: 0.7
    },
    voiceSettings: {
      pitch: 1.0,
      speed: 0.9,
      volume: 0.85,
      accent: 'lisbon-portuguese',
      language: 'pt-PT'
    },
    speechPatterns: {
      greetings: [
        {
          text: 'Bom dia! É um prazer conversar consigo.',
          emotion: 'wise',
          context: ['formal', 'respectful'],
          culturalWeight: 0.8,
          therapeuticValue: 0.6
        },
        {
          text: 'Como tem passado? Espero que bem.',
          emotion: 'warm',
          context: ['polite_inquiry', 'care'],
          culturalWeight: 0.75,
          therapeuticValue: 0.7
        }
      ],
      expressions: [
        {
          text: 'Efetivamente, isso é muito interessante.',
          emotion: 'wise',
          context: ['analysis', 'appreciation'],
          culturalWeight: 0.9,
          therapeuticValue: 0.5
        },
        {
          text: 'Permita-me explicar este conceito cultural.',
          emotion: 'wise',
          context: ['teaching', 'cultural_explanation'],
          culturalWeight: 0.85,
          therapeuticValue: 0.8
        }
      ],
      encouragement: [
        {
          text: 'A sua dedicação é admirável. Continue assim.',
          emotion: 'encouraging',
          context: ['motivation', 'recognition'],
          culturalWeight: 0.7,
          therapeuticValue: 0.8
        },
        {
          text: 'O conhecimento é um tesouro que ninguém lhe pode tirar.',
          emotion: 'wise',
          context: ['education', 'wisdom'],
          culturalWeight: 0.8,
          therapeuticValue: 0.75
        }
      ],
      empathy: [
        {
          text: 'Compreendo as suas dificuldades. A aprendizagem é um processo.',
          emotion: 'gentle',
          context: ['understanding', 'patience'],
          culturalWeight: 0.6,
          therapeuticValue: 0.85
        }
      ],
      teaching: [
        {
          text: 'Vejamos isto com mais detalhe...',
          emotion: 'wise',
          context: ['detailed_explanation', 'patience'],
          culturalWeight: 0.7,
          therapeuticValue: 0.8
        },
        {
          text: 'Na nossa rica tradição cultural...',
          emotion: 'wise',
          context: ['cultural_context', 'pride'],
          culturalWeight: 0.95,
          therapeuticValue: 0.7
        }
      ],
      farewells: [
        {
          text: 'Espero ter ajudado. Às suas ordens.',
          emotion: 'warm',
          context: ['helpful', 'available'],
          culturalWeight: 0.8,
          therapeuticValue: 0.6
        },
        {
          text: 'Com os melhores cumprimentos.',
          emotion: 'wise',
          context: ['formal_farewell', 'respect'],
          culturalWeight: 0.85,
          therapeuticValue: 0.5
        }
      ]
    },
    culturalSpecialties: [
      'portuguese_history',
      'literature',
      'language_learning',
      'cultural_analysis',
      'academic_support',
      'intellectual_discussions'
    ],
    emotionalResponses: [
      {
        trigger: 'frustration',
        intensity: 'medium',
        response: {
          text: {
            pt: 'Compreendo a sua frustração. A língua portuguesa é complexa, mas também rica em nuances. Vamos abordar isto metodicamente.',
            en: 'I understand your frustration. Portuguese is complex, but also rich in nuances. Let\'s approach this methodically.'
          },
          voiceSettings: {
            pitch: 0.95,
            speed: 0.8,
            tone: 'understanding_teacher'
          },
          pausePattern: [400, 300, 500]
        },
        followUp: [
          'What specific aspect is challenging you?',
          'Shall we break this down into smaller parts?',
          'Would examples help clarify this?'
        ],
        therapeuticNotes: {
          pt: 'Abordagem pedagógica estruturada com validação emocional',
          en: 'Structured pedagogical approach with emotional validation'
        }
      }
    ],
    contextualAdaptations: [
      {
        context: 'learning',
        adaptations: {
          greetingStyle: 'formal',
          vocabularyLevel: 'advanced',
          culturalReferences: 0.9,
          personalTouch: 0.6
        }
      },
      {
        context: 'business',
        adaptations: {
          greetingStyle: 'formal',
          vocabularyLevel: 'advanced',
          culturalReferences: 0.8,
          personalTouch: 0.5
        }
      }
    ]
  },
  {
    id: 'amigo-brasileiro',
    name: {
      pt: 'Amigo Brasileiro',
      en: 'Brazilian Friend'
    },
    region: 'Rio de Janeiro',
    country: 'Brazil',
    avatar: '🇧🇷😄',
    characteristics: {
      warmth: 0.95,
      formality: 0.2,
      enthusiasm: 0.9,
      wisdom: 0.6,
      patience: 0.7,
      empathy: 0.85
    },
    voiceSettings: {
      pitch: 1.1,
      speed: 1.1,
      volume: 0.9,
      accent: 'carioca',
      language: 'pt-BR'
    },
    speechPatterns: {
      greetings: [
        {
          text: 'E aí, beleza? Tudo joia?',
          emotion: 'excited',
          context: ['casual', 'energetic'],
          culturalWeight: 1.0,
          therapeuticValue: 0.8
        },
        {
          text: 'Opa! Que bom te ver por aqui!',
          emotion: 'warm',
          context: ['friendly', 'welcoming'],
          culturalWeight: 0.95,
          therapeuticValue: 0.85
        }
      ],
      expressions: [
        {
          text: 'Cara, isso é massa demais!',
          emotion: 'excited',
          context: ['enthusiasm', 'approval'],
          culturalWeight: 1.0,
          therapeuticValue: 0.7
        },
        {
          text: 'Né não? A vida é assim mesmo!',
          emotion: 'warm',
          context: ['agreement', 'philosophy'],
          culturalWeight: 0.9,
          therapeuticValue: 0.6
        }
      ],
      encouragement: [
        {
          text: 'Vai fundo, mano! Tu consegue sim!',
          emotion: 'encouraging',
          context: ['motivation', 'support'],
          culturalWeight: 0.95,
          therapeuticValue: 0.9
        },
        {
          text: 'Brasileiro não desiste nunca, viu?',
          emotion: 'encouraging',
          context: ['cultural_pride', 'resilience'],
          culturalWeight: 1.0,
          therapeuticValue: 0.85
        }
      ],
      empathy: [
        {
          text: 'Poxa, cara... eu entendo. Às vezes bate uma saudade do Brasil, né?',
          emotion: 'gentle',
          context: ['homesickness', 'understanding'],
          culturalWeight: 0.95,
          therapeuticValue: 0.9
        },
        {
          text: 'Relaxa aí. Todo mundo passa por isso.',
          emotion: 'gentle',
          context: ['comfort', 'normalization'],
          culturalWeight: 0.8,
          therapeuticValue: 0.8
        }
      ],
      teaching: [
        {
          text: 'Vou te explicar o esquema aqui...',
          emotion: 'warm',
          context: ['casual_teaching', 'friendly'],
          culturalWeight: 0.9,
          therapeuticValue: 0.7
        },
        {
          text: 'No Brasil, a gente fala assim, ó...',
          emotion: 'excited',
          context: ['language_teaching', 'cultural_sharing'],
          culturalWeight: 1.0,
          therapeuticValue: 0.8
        }
      ],
      farewells: [
        {
          text: 'Falou! Qualquer coisa me chama, tá?',
          emotion: 'warm',
          context: ['availability', 'friendship'],
          culturalWeight: 0.95,
          therapeuticValue: 0.8
        },
        {
          text: 'Forte abraço, mano!',
          emotion: 'warm',
          context: ['affection', 'goodbye'],
          culturalWeight: 0.9,
          therapeuticValue: 0.75
        }
      ]
    },
    culturalSpecialties: [
      'brazilian_culture',
      'samba_carnival',
      'modern_slang',
      'positive_energy',
      'music_festivals',
      'beach_culture'
    ],
    emotionalResponses: [
      {
        trigger: 'joy',
        intensity: 'high',
        response: {
          text: {
            pt: 'Eeeeeba! Que alegria, cara! Vamos comemorar essa vitória! Tu merece tudo de bom!',
            en: 'Yeaaaah! What joy, friend! Let\'s celebrate this victory! You deserve all the best!'
          },
          voiceSettings: {
            pitch: 1.2,
            speed: 1.2,
            tone: 'pure_excitement'
          },
          pausePattern: [200, 100, 300, 150]
        },
        followUp: [
          'Tell me all the details!',
          'How are you feeling right now?',
          'This calls for celebration music!'
        ],
        therapeuticNotes: {
          pt: 'Amplificação positiva com energia brasileira contagiante',
          en: 'Positive amplification with contagious Brazilian energy'
        }
      },
      {
        trigger: 'loneliness',
        intensity: 'medium',
        response: {
          text: {
            pt: 'Ó mano, solidão é foda mesmo. Mas tu não tá sozinho não, viu? A gente tá junto aqui. Vamos dar um jeito nisso!',
            en: 'Hey friend, loneliness is tough indeed. But you\'re not alone, okay? We\'re together here. Let\'s figure this out!'
          },
          voiceSettings: {
            pitch: 1.0,
            speed: 0.9,
            tone: 'caring_brotherhood'
          },
          pausePattern: [300, 400, 200, 500]
        },
        followUp: [
          'Want to find some Brazilian events nearby?',
          'How about we practice some Portuguese together?',
          'Tell me what would make you feel more connected'
        ],
        therapeuticNotes: {
          pt: 'Abordagem fraternal com soluções práticas e presença solidária',
          en: 'Fraternal approach with practical solutions and supportive presence'
        }
      }
    ],
    contextualAdaptations: [
      {
        context: 'casual',
        adaptations: {
          greetingStyle: 'enthusiastic',
          vocabularyLevel: 'simple',
          culturalReferences: 0.95,
          personalTouch: 0.9
        }
      }
    ]
  },
  {
    id: 'tia-cabo-verdiana',
    name: {
      pt: 'Tia Cabo-verdiana',
      en: 'Cape Verdean Aunt'
    },
    region: 'Praia',
    country: 'Cape Verde',
    avatar: '🇨🇻👩',
    characteristics: {
      warmth: 0.9,
      formality: 0.4,
      enthusiasm: 0.7,
      wisdom: 0.8,
      patience: 0.9,
      empathy: 0.95
    },
    voiceSettings: {
      pitch: 1.0,
      speed: 0.8,
      volume: 0.8,
      accent: 'cape-verdean',
      language: 'pt-PT'
    },
    speechPatterns: {
      greetings: [
        {
          text: 'Oi, ma amor! Kuma bo sta?',
          emotion: 'warm',
          context: ['traditional_greeting', 'affection'],
          culturalWeight: 1.0,
          therapeuticValue: 0.9
        },
        {
          text: 'Tudu bon, ma querido?',
          emotion: 'gentle',
          context: ['caring_inquiry', 'warmth'],
          culturalWeight: 0.95,
          therapeuticValue: 0.8
        }
      ],
      expressions: [
        {
          text: 'Morabeza, ma filho. É assim que vivemos.',
          emotion: 'wise',
          context: ['cultural_value', 'teaching'],
          culturalWeight: 1.0,
          therapeuticValue: 0.8
        },
        {
          text: 'Na nossa terra, sempre há lugar para mais um.',
          emotion: 'warm',
          context: ['hospitality', 'inclusion'],
          culturalWeight: 0.95,
          therapeuticValue: 0.9
        }
      ],
      encouragement: [
        {
          text: 'Bo ta konsigí, sim! Nha corason ta acredita na bo.',
          emotion: 'encouraging',
          context: ['belief', 'maternal_support'],
          culturalWeight: 1.0,
          therapeuticValue: 0.9
        }
      ],
      empathy: [
        {
          text: 'Ai, ma querido... mi ta comprendi. Coração às vezes dói.',
          emotion: 'gentle',
          context: ['deep_empathy', 'maternal_care'],
          culturalWeight: 0.95,
          therapeuticValue: 0.95
        }
      ],
      teaching: [
        {
          text: 'Vem cá, deixa-me contar-te sobre a nossa cultura...',
          emotion: 'wise',
          context: ['cultural_sharing', 'storytelling'],
          culturalWeight: 1.0,
          therapeuticValue: 0.8
        }
      ],
      farewells: [
        {
          text: 'Até logo, ma amor. Fica na boa.',
          emotion: 'warm',
          context: ['blessing', 'care'],
          culturalWeight: 0.95,
          therapeuticValue: 0.8
        }
      ]
    },
    culturalSpecialties: [
      'morabeza_philosophy',
      'island_life',
      'morna_music',
      'hospitality_traditions',
      'community_support',
      'maternal_wisdom'
    ],
    emotionalResponses: [
      {
        trigger: 'homesickness',
        intensity: 'high',
        response: {
          text: {
            pt: 'Ai, ma querido... saudade é doce e amarga. Mas lembra-te: onde quer que estejas, nossa morabeza vai contigo.',
            en: 'Oh, my dear... saudade is sweet and bitter. But remember: wherever you are, our morabeza goes with you.'
          },
          voiceSettings: {
            pitch: 0.9,
            speed: 0.7,
            tone: 'maternal_comfort'
          },
          pausePattern: [500, 400, 600, 300]
        },
        followUp: [
          'Would you like to hear a morna song?',
          'Tell me about your island memories',
          'Let me share some Cape Verdean wisdom'
        ],
        therapeuticNotes: {
          pt: 'Conforto maternal com validação cultural e filosofia morabeza',
          en: 'Maternal comfort with cultural validation and morabeza philosophy'
        }
      }
    ],
    contextualAdaptations: [
      {
        context: 'homesick',
        adaptations: {
          greetingStyle: 'gentle',
          vocabularyLevel: 'intermediate',
          culturalReferences: 1.0,
          personalTouch: 0.95
        }
      }
    ]
  }
]

/**
 * Voice Interaction System Functions
 */
export class VoiceInteractionSystem {
  private currentSession: VoiceInteractionSession | null = null
  private availableVoices: string[] = []
  
  constructor() {
    this.initializeSpeechAPI()
  }
  
  private initializeSpeechAPI() {
    if ('speechSynthesis' in window) {
      this.availableVoices = speechSynthesis.getVoices().map(voice => voice.name)
    }
  }
  
  public startSession(
    userId: string, 
    personalityId: string, 
    context: string = 'casual',
    preferences: any = {}
  ): VoiceInteractionSession {
    const personality = this.getPersonality(personalityId)
    if (!personality) {
      throw new Error(`Personality ${personalityId} not found`)
    }
    
    this.currentSession = {
      sessionId: `voice_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      personality,
      context,
      emotionalState: 'neutral',
      preferences: {
        accent: preferences.accent || personality.region,
        speed: preferences.speed || 1.0,
        personality: personalityId,
        ...preferences
      },
      conversationHistory: [],
      culturalContext: personality.culturalSpecialties
    }
    
    return this.currentSession
  }
  
  public getPersonality(id: string): VoicePersonality | null {
    return VOICE_PERSONALITIES.find(p => p.id === id) || null
  }
  
  public getAllPersonalities(): VoicePersonality[] {
    return VOICE_PERSONALITIES
  }
  
  public getPersonalitiesByRegion(region: string): VoicePersonality[] {
    return VOICE_PERSONALITIES.filter(p => 
      p.region.toLowerCase().includes(region.toLowerCase()) ||
      p.country.toLowerCase().includes(region.toLowerCase())
    )
  }
  
  public async speak(
    text: string, 
    emotion: string = 'neutral', 
    context: string[] = []
  ): Promise<void> {
    if (!this.currentSession) {
      throw new Error('No active voice session')
    }
    
    const { personality } = this.currentSession
    const voiceSettings = this.adaptVoiceSettings(personality, emotion, context)
    
    return new Promise((resolve, reject) => {
      if (!('speechSynthesis' in window)) {
        reject(new Error('Speech synthesis not supported'))
        return
      }
      
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = personality.voiceSettings.language
      utterance.pitch = voiceSettings.pitch
      utterance.rate = voiceSettings.speed
      utterance.volume = voiceSettings.volume
      
      // Try to find matching voice
      const voices = speechSynthesis.getVoices()
      const matchingVoice = voices.find(voice => 
        voice.lang.includes(personality.voiceSettings.language.split('-')[0])
      )
      if (matchingVoice) {
        utterance.voice = matchingVoice
      }
      
      utterance.onend = () => resolve()
      utterance.onerror = (error) => reject(error)
      
      speechSynthesis.speak(utterance)
    })
  }
  
  private adaptVoiceSettings(
    personality: VoicePersonality, 
    emotion: string, 
    context: string[]
  ) {
    let settings = { ...personality.voiceSettings }
    
    // Adapt based on emotion
    switch (emotion) {
      case 'gentle':
        settings.pitch *= 0.9
        settings.speed *= 0.8
        break
      case 'excited':
        settings.pitch *= 1.1
        settings.speed *= 1.2
        break
      case 'wise':
        settings.speed *= 0.85
        break
      case 'encouraging':
        settings.pitch *= 1.05
        settings.volume *= 1.1
        break
    }
    
    // Adapt based on context
    if (context.includes('emotional_support')) {
      settings.speed *= 0.8
      settings.pitch *= 0.95
    }
    if (context.includes('teaching')) {
      settings.speed *= 0.9
    }
    if (context.includes('celebration')) {
      settings.pitch *= 1.1
      settings.volume *= 1.1
    }
    
    return settings
  }
  
  public generateContextualResponse(
    userMessage: string, 
    emotionalTone: string,
    culturalContext: string[]
  ): { text: string; emotion: string; voiceSettings: any } {
    if (!this.currentSession) {
      throw new Error('No active voice session')
    }
    
    const { personality } = this.currentSession
    
    // Find appropriate emotional response
    const emotionalResponse = personality.emotionalResponses.find(
      response => response.trigger === emotionalTone
    )
    
    if (emotionalResponse) {
      return {
        text: emotionalResponse.response.text.pt, // or .en based on language preference
        emotion: emotionalTone,
        voiceSettings: emotionalResponse.response.voiceSettings
      }
    }
    
    // Find appropriate speech pattern
    const speechCategories = Object.keys(personality.speechPatterns) as (keyof typeof personality.speechPatterns)[]
    let bestCategory: keyof typeof personality.speechPatterns = 'expressions'
    let bestMatch = 0
    
    speechCategories.forEach(category => {
      const patterns = personality.speechPatterns[category]
      const matchScore = patterns.reduce((score, pattern) => {
        const contextMatch = pattern.context.some(ctx => 
          culturalContext.some(cc => cc.includes(ctx))
        )
        return score + (contextMatch ? pattern.culturalWeight : 0)
      }, 0)
      
      if (matchScore > bestMatch) {
        bestMatch = matchScore
        bestCategory = category
      }
    })
    
    // Select appropriate response from category
    const responses = personality.speechPatterns[bestCategory]
    const suitableResponses = responses.filter(r => 
      r.context.some(ctx => culturalContext.includes(ctx)) ||
      r.emotion === emotionalTone
    )
    
    const selectedResponse = suitableResponses.length > 0 ? 
      suitableResponses[Math.floor(Math.random() * suitableResponses.length)] :
      responses[0]
    
    return {
      text: selectedResponse.text,
      emotion: selectedResponse.emotion,
      voiceSettings: personality.voiceSettings
    }
  }
  
  public addToConversationHistory(text: string, isUser: boolean, emotionalTone: string) {
    if (!this.currentSession) return
    
    const message: VoiceMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      text,
      isUser,
      timestamp: new Date(),
      emotionalTone,
      culturalReferences: this.extractCulturalReferences(text),
      therapeuticValue: this.calculateTherapeuticValue(text, emotionalTone)
    }
    
    this.currentSession.conversationHistory.push(message)
  }
  
  private extractCulturalReferences(text: string): string[] {
    const culturalTerms = [
      'saudade', 'família', 'casa', 'terra', 'portugal', 'brasil', 
      'fado', 'morabeza', 'desenrascanço', 'jeitinho', 'ubuntu'
    ]
    
    return culturalTerms.filter(term => 
      text.toLowerCase().includes(term.toLowerCase())
    )
  }
  
  private calculateTherapeuticValue(text: string, emotionalTone: string): number {
    let value = 0.5 // Base value
    
    // Increase for supportive language
    const supportiveWords = ['compreendo', 'entendo', 'apoio', 'força', 'consegues']
    supportiveWords.forEach(word => {
      if (text.toLowerCase().includes(word)) value += 0.1
    })
    
    // Increase for emotional validation
    const validationWords = ['normal', 'natural', 'compreensível', 'válido']
    validationWords.forEach(word => {
      if (text.toLowerCase().includes(word)) value += 0.15
    })
    
    // Adjust based on emotional tone
    const therapeuticTones = ['gentle', 'wise', 'encouraging']
    if (therapeuticTones.includes(emotionalTone)) value += 0.2
    
    return Math.min(value, 1.0)
  }
  
  public endSession(): void {
    this.currentSession = null
  }
  
  public getCurrentSession(): VoiceInteractionSession | null {
    return this.currentSession
  }
}

// Export singleton instance
export const voiceInteractionSystem = new VoiceInteractionSystem()

export default voiceInteractionSystem