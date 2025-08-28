/**
 * Advanced Portuguese Cultural Knowledge Database
 * Comprehensive cultural intelligence for LusoBot AI Assistant
 * Covers all Lusophone countries and cultural contexts
 */

import { Language } from '@/i18n'

export interface CulturalTradition {
  id: string
  name: {
    pt: string
    en: string
  }
  description: {
    pt: string
    en: string
  }
  countries: string[]
  significance: {
    pt: string
    en: string
  }
  modernPractice: {
    pt: string
    en: string
  }
  emotionalContext: string[]
  keywords: string[]
}

export interface LanguageLearningModule {
  id: string
  level: 'beginner' | 'intermediate' | 'advanced' | 'native'
  topic: string
  exercises: {
    pronunciation: {
      word: string
      ipa: string
      audio?: string
      difficulty: number
    }[]
    idioms: {
      expression: string
      meaning: {
        pt: string
        en: string
      }
      usage: {
        pt: string
        en: string
      }
      culturalContext: string
    }[]
    culturalNuances: {
      situation: string
      formal: {
        pt: string
        en: string
      }
      informal: {
        pt: string
        en: string
      }
      explanation: {
        pt: string
        en: string
      }
    }[]
  }
}

export interface EmotionalSupportResponse {
  trigger: string
  culturalContext: string
  responses: {
    pt: string
    en: string
  }[]
  followUpActions: string[]
  therapeuticApproach: string
}


/**
 * Comprehensive Portuguese Cultural Traditions Database
 */
export const PORTUGUESE_CULTURAL_TRADITIONS: CulturalTradition[] = [
  {
    id: 'saudade-philosophy',
    name: {
      pt: 'Filosofia da Saudade',
      en: 'Philosophy of Saudade'
    },
    description: {
      pt: 'Sentimento único português que representa a nostalgia melancólica e o amor ausente',
      en: 'Unique Portuguese feeling representing melancholic nostalgia and absent love'
    },
    countries: ['Portugal', 'Brazil', 'All Lusophone Nations'],
    significance: {
      pt: 'Define a alma portuguesa e a experiência da diáspora. É simultaneamente dor e beleza.',
      en: 'Defines the Portuguese soul and diaspora experience. It is simultaneously pain and beauty.'
    },
    modernPractice: {
      pt: 'Expressa-se através do fado, literatura, e nas conversas sobre família e terra natal',
      en: 'Expressed through fado, literature, and conversations about family and homeland'
    },
    emotionalContext: ['longing', 'nostalgia', 'love', 'loss', 'beauty', 'melancholy'],
    keywords: ['saudade', 'nostalgia', 'falta', 'ausência', 'coração', 'alma']
  },
  {
    id: 'family-centricity',
    name: {
      pt: 'Centralidade da Família',
      en: 'Family Centricity'
    },
    description: {
      pt: 'A família como núcleo fundamental da sociedade portuguesa e fonte de identidade',
      en: 'Family as the fundamental nucleus of Portuguese society and source of identity'
    },
    countries: ['Portugal', 'Brazil', 'All Lusophone Nations'],
    significance: {
      pt: 'A família estende-se além do núcleo, incluindo padrinhos, compadres e vizinhos próximos',
      en: 'Family extends beyond the nucleus, including godparents, compadres, and close neighbors'
    },
    modernPractice: {
      pt: 'Reuniões dominicais, decisões familiares consultadas, apoio mútuo em tempos difíceis',
      en: 'Sunday gatherings, family-consulted decisions, mutual support during difficult times'
    },
    emotionalContext: ['belonging', 'security', 'identity', 'responsibility', 'love'],
    keywords: ['família', 'parentes', 'casa', 'união', 'apoio', 'tradição']
  },
  {
    id: 'hospitality-tradition',
    name: {
      pt: 'Tradição da Hospitalidade',
      en: 'Hospitality Tradition'
    },
    description: {
      pt: 'Receber bem os visitantes é uma honra e dever cultural fundamental',
      en: 'Welcoming visitors well is a fundamental cultural honor and duty'
    },
    countries: ['Portugal', 'Cape Verde', 'Brazil', 'All Lusophone Nations'],
    significance: {
      pt: '"A casa portuguesa é sempre aberta" - hospitalidade como valor central da cultura',
      en: '"The Portuguese house is always open" - hospitality as central cultural value'
    },
    modernPractice: {
      pt: 'Oferecer sempre comida/bebida, nunca deixar alguém partir com fome, mesa sempre posta',
      en: 'Always offer food/drink, never let someone leave hungry, table always set'
    },
    emotionalContext: ['warmth', 'generosity', 'pride', 'care', 'honor'],
    keywords: ['hospitalidade', 'acolher', 'visita', 'mesa', 'casa', 'generosidade']
  },
  {
    id: 'fado-soul-music',
    name: {
      pt: 'Fado - Música da Alma',
      en: 'Fado - Soul Music'
    },
    description: {
      pt: 'Género musical que expressa a alma portuguesa através da saudade e destino',
      en: 'Musical genre that expresses the Portuguese soul through saudade and destiny'
    },
    countries: ['Portugal', 'Diaspora Communities'],
    significance: {
      pt: 'UNESCO Patrimônio Cultural Imaterial da Humanidade, voz da identidade nacional',
      en: 'UNESCO Intangible Cultural Heritage of Humanity, voice of national identity'
    },
    modernPractice: {
      pt: 'Casas de fado em Lisboa e Coimbra, novos fadistas como Mariza, Carminho, Ana Moura',
      en: 'Fado houses in Lisbon and Coimbra, new fadistas like Mariza, Carminho, Ana Moura'
    },
    emotionalContext: ['saudade', 'destiny', 'love', 'loss', 'beauty', 'transcendence'],
    keywords: ['fado', 'guitarra', 'destino', 'alma', 'cantar', 'sentimento']
  },
  {
    id: 'brazilian-jeitinho',
    name: {
      pt: 'Jeitinho Brasileiro',
      en: 'Brazilian Jeitinho'
    },
    description: {
      pt: 'Habilidade brasileira de resolver problemas de forma criativa e flexível',
      en: 'Brazilian ability to solve problems in creative and flexible ways'
    },
    countries: ['Brazil'],
    significance: {
      pt: 'Representa a adaptabilidade, criatividade e otimismo do povo brasileiro',
      en: 'Represents the adaptability, creativity and optimism of the Brazilian people'
    },
    modernPractice: {
      pt: 'Encontrar soluções não convencionais, networking pessoal, flexibilidade nas regras',
      en: 'Finding unconventional solutions, personal networking, flexibility in rules'
    },
    emotionalContext: ['creativity', 'optimism', 'resilience', 'community', 'warmth'],
    keywords: ['jeitinho', 'criatividade', 'flexibilidade', 'otimismo', 'solução']
  },
  {
    id: 'cape-verdean-morabeza',
    name: {
      pt: 'Morabeza Cabo-verdiana',
      en: 'Cape Verdean Morabeza'
    },
    description: {
      pt: 'Hospitalidade genuína e calor humano característicos de Cabo Verde',
      en: 'Genuine hospitality and human warmth characteristic of Cape Verde'
    },
    countries: ['Cape Verde'],
    significance: {
      pt: 'Valor fundamental que define o caráter cabo-verdiano e sua forma de receber',
      en: 'Fundamental value that defines Cape Verdean character and way of welcoming'
    },
    modernPractice: {
      pt: 'Acolhimento caloroso, partilha generosa, comunidade unida pela hospitalidade',
      en: 'Warm welcome, generous sharing, community united by hospitality'
    },
    emotionalContext: ['warmth', 'generosity', 'community', 'kindness', 'love'],
    keywords: ['morabeza', 'hospitalidade', 'generosidade', 'calor', 'acolhimento']
  },
  {
    id: 'angolan-ubuntu',
    name: {
      pt: 'Ubuntu Angolano',
      en: 'Angolan Ubuntu'
    },
    description: {
      pt: 'Filosofia africana "eu sou porque nós somos" adaptada à cultura angolana',
      en: 'African philosophy "I am because we are" adapted to Angolan culture'
    },
    countries: ['Angola'],
    significance: {
      pt: 'Emphasiza a interdependência comunitária e responsabilidade coletiva',
      en: 'Emphasizes community interdependence and collective responsibility'
    },
    modernPractice: {
      pt: 'Decisões comunitárias, apoio mútuo, sucesso compartilhado, união familiar',
      en: 'Community decisions, mutual support, shared success, family unity'
    },
    emotionalContext: ['unity', 'belonging', 'responsibility', 'community', 'interdependence'],
    keywords: ['ubuntu', 'comunidade', 'união', 'apoio', 'responsabilidade', 'família']
  }
]

/**
 * Advanced Language Learning Modules
 */
export const LANGUAGE_LEARNING_MODULES: LanguageLearningModule[] = [
  {
    id: 'saudade-expressions',
    level: 'intermediate',
    topic: 'Saudade and Emotional Expressions',
    exercises: {
      pronunciation: [
        {
          word: 'saudade',
          ipa: '/sɐu̯ˈdadɨ/',
          difficulty: 0.7
        },
        {
          word: 'coração',
          ipa: '/kuɾɐˈsɐ̃w̃/',
          difficulty: 0.6
        },
        {
          word: 'nostalgia',
          ipa: '/nuʃtalˈʒiɐ/',
          difficulty: 0.5
        }
      ],
      idioms: [
        {
          expression: 'Morrer de saudades',
          meaning: {
            pt: 'Sentir uma saudade muito intensa',
            en: 'To feel very intense longing'
          },
          usage: {
            pt: 'Estou a morrer de saudades da minha terra.',
            en: 'I am dying of longing for my homeland.'
          },
          culturalContext: 'Used by Portuguese diaspora to express deep homesickness'
        },
        {
          expression: 'Matar saudades',
          meaning: {
            pt: 'Satisfazer a saudade, rever algo/alguém que se tinha saudades',
            en: 'To satisfy the longing, to see something/someone you missed'
          },
          usage: {
            pt: 'Vou a Portugal matar saudades da família.',
            en: 'I\'m going to Portugal to satisfy my longing for family.'
          },
          culturalContext: 'Common phrase for diaspora visits home'
        }
      ],
      culturalNuances: [
        {
          situation: 'Expressing homesickness',
          formal: {
            pt: 'Sinto uma grande saudade da minha terra natal.',
            en: 'I feel great longing for my homeland.'
          },
          informal: {
            pt: 'Tenho tantas saudades de casa!',
            en: 'I miss home so much!'
          },
          explanation: {
            pt: 'A saudade é mais profunda que apenas "miss" - inclui melancolia e beleza',
            en: 'Saudade is deeper than just "miss" - it includes melancholy and beauty'
          }
        }
      ]
    }
  },
  {
    id: 'business-portuguese',
    level: 'advanced',
    topic: 'Portuguese Business Culture and Language',
    exercises: {
      pronunciation: [
        {
          word: 'empreendedorismo',
          ipa: '/ẽpɾẽdedoˈɾizmu/',
          difficulty: 0.8
        },
        {
          word: 'desenrascanço',
          ipa: '/dezẽʁɐʃˈkɐ̃su/',
          difficulty: 0.9
        }
      ],
      idioms: [
        {
          expression: 'Desenrascanço',
          meaning: {
            pt: 'Habilidade portuguesa para resolver problemas criativamente',
            en: 'Portuguese ability to solve problems creatively'
          },
          usage: {
            pt: 'Com o seu desenrascanço, conseguiu resolver o problema.',
            en: 'With his desenrascanço, he managed to solve the problem.'
          },
          culturalContext: 'Represents Portuguese resourcefulness and problem-solving creativity'
        }
      ],
      culturalNuances: [
        {
          situation: 'Business meeting etiquette',
          formal: {
            pt: 'Seria possível agendar uma reunião para discutir o projeto?',
            en: 'Would it be possible to schedule a meeting to discuss the project?'
          },
          informal: {
            pt: 'Podemos falar sobre isto mais tarde?',
            en: 'Can we talk about this later?'
          },
          explanation: {
            pt: 'Negócios portugueses valorizam relacionamentos pessoais antes de negócios',
            en: 'Portuguese business values personal relationships before business'
          }
        }
      ]
    }
  }
]

/**
 * Emotional Support Response System
 */
export const EMOTIONAL_SUPPORT_RESPONSES: EmotionalSupportResponse[] = [
  {
    trigger: 'homesickness',
    culturalContext: 'Portuguese diaspora experience',
    responses: [
      {
        pt: 'Compreendo essa saudade profunda que sentes. É algo muito português, essa capacidade de amar intensamente mesmo à distância. A nossa comunidade está aqui para te acolher e partilhar essas emoções contigo.',
        en: 'I understand that deep saudade you\'re feeling. It\'s something very Portuguese, this ability to love intensely even from a distance. Our community is here to embrace you and share these emotions with you.'
      },
      {
        pt: 'A saudade é doce e amarga ao mesmo tempo, não é? Faz parte de quem somos. Que tal partilharmos algumas memórias ou tradições que te fazem sentir mais próximo de casa?',
        en: 'Saudade is sweet and bitter at the same time, isn\'t it? It\'s part of who we are. How about sharing some memories or traditions that make you feel closer to home?'
      }
    ],
    followUpActions: [
      'Suggest Portuguese community events',
      'Recommend Portuguese restaurants or cultural centers',
      'Offer to connect with other Portuguese speakers',
      'Share Portuguese music or cultural content'
    ],
    therapeuticApproach: 'Cultural validation and community connection'
  },
  {
    trigger: 'cultural_isolation',
    culturalContext: 'Feeling disconnected from Portuguese culture',
    responses: [
      {
        pt: 'Sentir-se desligado da nossa cultura é normal quando se vive longe. Mas a cultura portuguesa vive em ti - na forma como recebes os outros, como valorizas a família, como sentes as emoções profundamente.',
        en: 'Feeling disconnected from our culture is normal when living far away. But Portuguese culture lives in you - in how you welcome others, how you value family, how you feel emotions deeply.'
      },
      {
        pt: 'A nossa identidade não se perde por vivermos noutro país. Ela adapta-se, cresce, e às vezes até se fortalece. Vamos encontrar formas de celebrar quem és aqui em Londres.',
        en: 'Our identity doesn\'t get lost by living in another country. It adapts, grows, and sometimes even strengthens. Let\'s find ways to celebrate who you are here in London.'
      }
    ],
    followUpActions: [
      'Explore Portuguese cultural activities',
      'Connect with Portuguese-speaking businesses',
      'Join Portuguese cultural groups or classes',
      'Participate in Portuguese festivals and celebrations'
    ],
    therapeuticApproach: 'Cultural identity reinforcement and practical reconnection'
  },
  {
    trigger: 'language_anxiety',
    culturalContext: 'Anxiety about Portuguese language skills',
    responses: [
      {
        pt: 'A língua portuguesa é rica e complexa, e é normal sentir insegurança. Mas lembra-te: não há forma "errada" de falar português. O importante é comunicar com o coração.',
        en: 'The Portuguese language is rich and complex, and it\'s normal to feel insecure. But remember: there\'s no "wrong" way to speak Portuguese. What matters is communicating with the heart.'
      },
      {
        pt: 'Cada região tem o seu sotaque, as suas expressões. Tu fazes parte dessa diversidade linda da língua portuguesa. Vamos praticar juntos, sem julgamentos.',
        en: 'Each region has its accent, its expressions. You are part of that beautiful diversity of the Portuguese language. Let\'s practice together, without judgment.'
      }
    ],
    followUpActions: [
      'Provide language practice exercises',
      'Connect with language exchange partners',
      'Recommend Portuguese language resources',
      'Offer pronunciation guidance and cultural context'
    ],
    therapeuticApproach: 'Language anxiety reduction and confidence building'
  }
]


/**
 * Cultural Knowledge Search Functions
 */
export function findCulturalTradition(query: string, language: Language): CulturalTradition | null {
  const searchQuery = query.toLowerCase()
  
  return PORTUGUESE_CULTURAL_TRADITIONS.find(tradition => 
    tradition.keywords.some(keyword => searchQuery.includes(keyword)) ||
    tradition.name.pt.toLowerCase().includes(searchQuery) ||
    tradition.name.en.toLowerCase().includes(searchQuery) ||
    tradition.description.pt.toLowerCase().includes(searchQuery) ||
    tradition.description.en.toLowerCase().includes(searchQuery)
  ) || null
}

export function getLanguageLearningModule(level: string, topic?: string): LanguageLearningModule | null {
  return LANGUAGE_LEARNING_MODULES.find(module => 
    module.level === level && (!topic || module.topic.toLowerCase().includes(topic.toLowerCase()))
  ) || null
}

export function findEmotionalSupport(trigger: string): EmotionalSupportResponse | null {
  return EMOTIONAL_SUPPORT_RESPONSES.find(response =>
    response.trigger === trigger || 
    response.culturalContext.toLowerCase().includes(trigger.toLowerCase())
  ) || null
}

