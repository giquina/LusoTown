/**
 * LusoBot Lusophone Cultural AI Assistant Engine
 * 
 * Core AI system providing Lusophone cultural expertise, language support,
 * community navigation, and saudade emotional understanding.
 */

import { Language } from '@/i18n'

// Core Types
export interface LusoBotMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  language: Language
  culturalContext?: CulturalContext
  emotionalTone?: EmotionalTone
  suggestions?: LusoBotSuggestion[]
  metadata?: MessageMetadata
}

export interface CulturalContext {
  region: PortugueseRegion
  topic: CulturalTopic
  expertise: ExpertiseArea[]
  confidence: number
}

export interface EmotionalTone {
  saudade: number // 0-1 scale
  nostalgia: number
  hope: number
  community: number
  heritage: number
}

export interface LusoBotSuggestion {
  type: 'event' | 'business' | 'resource' | 'community' | 'language'
  title: string
  description: string
  link?: string
  priority: 'high' | 'medium' | 'low'
  culturalRelevance: number
}

export interface MessageMetadata {
  userRegion?: PortugueseRegion
  communityLevel?: CommunityLevel
  languageProficiency?: LanguageProficiency
  interests?: string[]
  mood?: UserMood
}

// Enums and Constants
export type PortugueseRegion = 
  | 'north' | 'center' | 'south' | 'lisbon' | 'porto'
  | 'azores' | 'madeira' | 'brazil' | 'angola' | 'mozambique'
  | 'diaspora_uk' | 'diaspora_us' | 'diaspora_france' | 'diaspora_other'

export type CulturalTopic = 
  | 'history' | 'traditions' | 'cuisine' | 'language' | 'fado'
  | 'literature' | 'festivals' | 'sports' | 'religion' | 'art'
  | 'family' | 'community' | 'diaspora' | 'business' | 'education'

export type ExpertiseArea = 
  | 'portuguese_history' | 'regional_cultures' | 'portuguese_cuisine'
  | 'fado_music' | 'language_learning' | 'diaspora_support'
  | 'business_culture' | 'family_traditions' | 'religious_practices'
  | 'uk_portuguese_community' | 'immigration_support' | 'cultural_events'

export type CommunityLevel = 'newcomer' | 'active' | 'engaged' | 'leader' | 'elder'
export type LanguageProficiency = 'native' | 'fluent' | 'intermediate' | 'beginner' | 'learning'
export type UserMood = 'curious' | 'homesick' | 'excited' | 'seeking_help' | 'celebratory'

// Lusophone Cultural Knowledge Base
export const PORTUGUESE_CULTURAL_KNOWLEDGE = {
  // Historical Periods
  history: {
    discoveries: {
      period: '15th-16th centuries',
      keywords: ['navegações', 'descobrimentos', 'vasco da gama', 'pedro álvares cabral'],
      significance: 'Lusophone maritime expansion and global influence',
      cultural_impact: 'Foundation of Lusophone global identity and pride'
    },
    revolution_1974: {
      period: '25 de Abril 1974',
      keywords: ['revolução dos cravos', 'liberdade', 'democracia', 'estado novo'],
      significance: 'End of dictatorship and beginning of modern Portugal',
      cultural_impact: 'Symbol of peaceful change and democratic values'
    },
    eu_membership: {
      period: '1986-present',
      keywords: ['união europeia', 'modernização', 'desenvolvimento'],
      significance: 'Portugal\'s integration into European community',
      cultural_impact: 'Balance between European identity and Portuguese heritage'
    }
  },

  // Regional Cultures
  regions: {
    north: {
      characteristics: ['Traditional', 'Religious', 'Rural heritage'],
      cuisine: ['Francesinha', 'Caldo verde', 'Vinho verde'],
      traditions: ['Festa de São João', 'Romarias', 'Trabalho comunitário'],
      dialects: ['Mirandês influence', 'Rural expressions'],
      music: ['Folk dances', 'Traditional songs']
    },
    center: {
      characteristics: ['Academic', 'Historical', 'Balanced'],
      cuisine: ['Leitão da Bairrada', 'Queijo da Serra', 'Ovos moles'],
      traditions: ['Queima das Fitas', 'Festa dos Tabuleiros'],
      dialects: ['Standard Lusophone', 'Academic language'],
      music: ['University traditions', 'Classical influence']
    },
    south: {
      characteristics: ['Warm', 'Agricultural', 'Moorish influence'],
      cuisine: ['Cataplana', 'Migas', 'Medronho'],
      traditions: ['Alentejo singing', 'Cork harvesting'],
      dialects: ['Alentejo accent', 'Slower pace'],
      music: ['Cante alentejano', 'Traditional ballads']
    },
    lisbon: {
      characteristics: ['Cosmopolitan', 'Historic', 'Diverse'],
      cuisine: ['Pastéis de nata', 'Bacalhau', 'International fusion'],
      traditions: ['Santos Populares', 'Fado houses'],
      dialects: ['Standard Lusophone', 'Urban slang'],
      music: ['Fado', 'Modern Portuguese music']
    },
    azores: {
      characteristics: ['Island life', 'Nature-focused', 'Community-oriented'],
      cuisine: ['Cozido das Furnas', 'Queijo São Jorge', 'Linguiça'],
      traditions: ['Festa do Divino Espírito Santo', 'Whaling heritage'],
      dialects: ['Island expressions', 'Archaic terms'],
      music: ['Chamarrita', 'Folk songs']
    },
    madeira: {
      characteristics: ['Subtropical', 'Tourism-oriented', 'Agricultural'],
      cuisine: ['Espetada', 'Bolo de mel', 'Poncha'],
      traditions: ['Festa da Flor', 'New Year fireworks'],
      dialects: ['Madeirense accent', 'Unique expressions'],
      music: ['Bailinho madeirense', 'Folk traditions']
    }
  },

  // Cuisine Knowledge
  cuisine: {
    staples: {
      'bacalhau': {
        significance: 'National fish, "fiel amigo" (faithful friend)',
        preparations: ['365 ways to prepare', 'Christmas tradition', 'Identity symbol'],
        cultural_meaning: 'Represents Lusophone ingenuity and tradition'
      },
      'pão': {
        significance: 'Daily bread, center of meals',
        varieties: ['Broa de milho', 'Pão de centeio', 'Pão alentejano'],
        cultural_meaning: 'Hospitality and sharing'
      },
      'vinho': {
        significance: 'Wine culture deeply embedded',
        regions: ['Douro', 'Alentejo', 'Vinho Verde', 'Porto'],
        cultural_meaning: 'Celebration, tradition, quality of life'
      }
    },
    traditional_dishes: {
      'cozido_portuguesa': 'National stew representing unity in diversity',
      'francesinha': 'Porto\'s hearty sandwich, local pride',
      'pasteis_nata': 'Sweet symbol of Lusophone culinary expertise',
      'cataplana': 'Algarve seafood celebration',
      'bifana': 'Everyday comfort food, working-class identity'
    },
    food_customs: {
      'sobremesa': 'Always room for dessert, family time extension',
      'petiscos': 'Small plates culture, social bonding',
      'café': 'Coffee culture, daily social ritual',
      'jantar_familia': 'Family dinner sacred time'
    }
  },

  // Fado and Music
  music: {
    fado: {
      essence: 'Soul of Portuguese music, expression of saudade',
      types: ['Fado de Lisboa', 'Fado de Coimbra', 'Fado vadio'],
      themes: ['Love', 'Loss', 'Destiny', 'Homeland', 'Nostalgia'],
      cultural_role: 'Emotional outlet, cultural identity, UNESCO heritage',
      legendary_figures: ['Amália Rodrigues', 'Alfredo Marceneiro', 'Carlos do Carmo']
    },
    folk_music: {
      'cante_alentejano': 'UNESCO heritage, group singing tradition',
      'vira': 'Folk dance music, celebration and community',
      'corridinho': 'Algarve folk dance, joy and festivity',
      'chamarrita': 'Azorean folk music, island identity'
    },
    modern_music: {
      evolution: 'From folk to contemporary, maintaining Lusophone soul',
      artists: ['Mariza', 'Dulce Pontes', 'Madredeus', 'Deolinda'],
      themes: 'Modern life with traditional emotions'
    }
  },

  // Language and Expressions
  language: {
    saudade: {
      definition: 'Untranslatable feeling of longing, missing, nostalgic love',
      usage: 'Central to Lusophone emotional expression',
      cultural_importance: 'Defines Lusophone character and worldview',
      expressions: ['Tenho saudades', 'Mata saudades', 'Morrer de saudades']
    },
    common_expressions: {
      'desenrascanço': 'Lusophone ability to solve problems creatively',
      'fado': 'Fate, destiny - acceptance of life\'s ups and downs',
      'coração': 'Heart - central to emotional expression',
      'família': 'Family - core value and social unit',
      'amizade': 'Friendship - deep, lasting relationships'
    },
    regional_dialects: {
      pronunciation: 'Varies significantly by region',
      vocabulary: 'Local words and expressions',
      formal_vs_informal: 'Lusophone hierarchy in language use'
    }
  }
}

// Saudade Understanding Engine
export class SaudadeEngine {
  static detectSaudade(message: string, language: Language): EmotionalTone {
    const saudadeKeywords = [
      // Lusophone
      'saudades', 'saudade', 'falta', 'nostalgia', 'longe', 'casa', 'família',
      'terra', 'portugal', 'pátria', 'raízes', 'origem', 'coração',
      // English equivalents
      'miss', 'missing', 'homesick', 'nostalgia', 'homeland', 'roots',
      'family', 'heritage', 'belong', 'longing'
    ]

    const communityKeywords = [
      'comunidade', 'amigos', 'vizinhos', 'convívio', 'união',
      'community', 'friends', 'neighbors', 'gathering', 'belonging'
    ]

    const heritageKeywords = [
      'tradição', 'cultura', 'costumes', 'herança', 'história',
      'tradition', 'culture', 'customs', 'heritage', 'history'
    ]

    const text = message.toLowerCase()
    
    let saudade = 0
    let community = 0
    let heritage = 0
    let nostalgia = 0
    let hope = 0

    // Detect saudade intensity
    saudadeKeywords.forEach(keyword => {
      if (text.includes(keyword)) {
        saudade += 0.2
        nostalgia += 0.15
      }
    })

    // Detect community longing
    communityKeywords.forEach(keyword => {
      if (text.includes(keyword)) {
        community += 0.25
        hope += 0.1
      }
    })

    // Detect heritage connection
    heritageKeywords.forEach(keyword => {
      if (text.includes(keyword)) {
        heritage += 0.3
        hope += 0.15
      }
    })

    // Context-based adjustments
    if (text.includes('sozinho') || text.includes('alone')) {
      saudade += 0.3
      community += 0.2
    }

    if (text.includes('festa') || text.includes('celebration')) {
      hope += 0.4
      community += 0.3
    }

    return {
      saudade: Math.min(saudade, 1),
      nostalgia: Math.min(nostalgia, 1),
      hope: Math.min(hope, 1),
      community: Math.min(community, 1),
      heritage: Math.min(heritage, 1)
    }
  }

  static generateSaudadeResponse(tone: EmotionalTone, language: Language): string {
    if (tone.saudade > 0.6) {
      return language === 'pt' 
        ? "Compreendo essa saudade profunda que sentes. É algo muito português, essa capacidade de amar intensamente mesmo à distância. A nossa comunidade está aqui para te acolher."
        : "I understand that deep saudade you're feeling. It's something very Lusophone, this ability to love intensely even from a distance. Our community is here to embrace you."
    }

    if (tone.nostalgia > 0.5) {
      return language === 'pt'
        ? "A nostalgia é doce e amarga ao mesmo tempo, não é? Faz parte de quem somos. Que tal partilharmos algumas memórias ou tradições que te fazem sentir mais próximo de casa?"
        : "Nostalgia is sweet and bitter at the same time, isn't it? It's part of who we are. How about sharing some memories or traditions that make you feel closer to home?"
    }

    if (tone.community > 0.5) {
      return language === 'pt'
        ? "O sentido de comunidade é fundamental para nós, portugueses. Há sempre espaço para mais uma pessoa na nossa mesa e no nosso coração."
        : "The sense of community is fundamental for us Lusophone. There's always room for one more person at our table and in our hearts."
    }

    return language === 'pt'
      ? "Estou aqui para te ajudar a navegar tanto as emoções como a vida prática na comunidade de falantes de português."
      : "I'm here to help you navigate both emotions and practical life in the Portuguese-speaking community."
  }
}

// LusoBot AI Response Engine
export class LusoBotEngine {
  private static knowledge = PORTUGUESE_CULTURAL_KNOWLEDGE
  private static saudadeEngine = SaudadeEngine

  static async generateResponse(
    message: string,
    context: MessageMetadata,
    language: Language
  ): Promise<LusoBotMessage> {
    // Detect emotional tone
    const emotionalTone = this.saudadeEngine.detectSaudade(message, language)
    
    // Identify cultural context
    const culturalContext = this.identifyCulturalContext(message, language)
    
    // Generate appropriate response
    const response = await this.generateContextualResponse(
      message,
      culturalContext,
      emotionalTone,
      context,
      language
    )
    
    // Generate helpful suggestions
    const suggestions = this.generateSuggestions(
      culturalContext,
      emotionalTone,
      context,
      language
    )

    return {
      id: `lusobot_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      role: 'assistant',
      content: response,
      timestamp: new Date(),
      language,
      culturalContext,
      emotionalTone,
      suggestions,
      metadata: context
    }
  }

  private static identifyCulturalContext(message: string, language: Language): CulturalContext {
    const text = message.toLowerCase()
    let region: PortugueseRegion = 'diaspora_uk'
    let topic: CulturalTopic = 'community'
    let expertise: ExpertiseArea[] = []
    let confidence = 0.5

    // Detect regional references
    if (text.includes('norte') || text.includes('porto') || text.includes('minho')) {
      region = 'north'
      confidence += 0.3
    } else if (text.includes('centro') || text.includes('coimbra') || text.includes('beira')) {
      region = 'center'
      confidence += 0.3
    } else if (text.includes('sul') || text.includes('alentejo') || text.includes('algarve')) {
      region = 'south'
      confidence += 0.3
    } else if (text.includes('lisboa') || text.includes('lisbon')) {
      region = 'lisbon'
      confidence += 0.3
    } else if (text.includes('açores') || text.includes('azores')) {
      region = 'azores'
      confidence += 0.3
    } else if (text.includes('madeira')) {
      region = 'madeira'
      confidence += 0.3
    }

    // Detect topic areas
    if (text.includes('comida') || text.includes('food') || text.includes('receita') || text.includes('recipe')) {
      topic = 'cuisine'
      expertise.push('portuguese_cuisine')
      confidence += 0.4
    } else if (text.includes('fado') || text.includes('música') || text.includes('music')) {
      topic = 'fado'
      expertise.push('fado_music')
      confidence += 0.4
    } else if (text.includes('história') || text.includes('history')) {
      topic = 'history'
      expertise.push('portuguese_history')
      confidence += 0.4
    } else if (text.includes('língua') || text.includes('language') || text.includes('portuguese')) {
      topic = 'language'
      expertise.push('language_learning')
      confidence += 0.4
    } else if (text.includes('evento') || text.includes('event') || text.includes('festa')) {
      topic = 'festivals'
      expertise.push('cultural_events')
      confidence += 0.3
    } else if (text.includes('negócio') || text.includes('business') || text.includes('trabalho')) {
      topic = 'business'
      expertise.push('business_culture')
      confidence += 0.3
    }

    return {
      region,
      topic,
      expertise,
      confidence: Math.min(confidence, 1)
    }
  }

  private static async generateContextualResponse(
    message: string,
    culturalContext: CulturalContext,
    emotionalTone: EmotionalTone,
    userContext: MessageMetadata,
    language: Language
  ): Promise<string> {
    // Handle high saudade/emotional content first
    if (emotionalTone.saudade > 0.5 || emotionalTone.nostalgia > 0.5) {
      const emotionalResponse = this.saudadeEngine.generateSaudadeResponse(emotionalTone, language)
      return emotionalResponse
    }

    // Generate topic-specific responses
    switch (culturalContext.topic) {
      case 'cuisine':
        return this.generateCuisineResponse(message, culturalContext, language)
      
      case 'fado':
        return this.generateFadoResponse(message, culturalContext, language)
      
      case 'history':
        return this.generateHistoryResponse(message, culturalContext, language)
      
      case 'language':
        return this.generateLanguageResponse(message, culturalContext, language)
      
      case 'festivals':
        return this.generateFestivalResponse(message, culturalContext, language)
      
      case 'business':
        return this.generateBusinessResponse(message, culturalContext, language)
      
      case 'community':
      default:
        return this.generateCommunityResponse(message, culturalContext, language)
    }
  }

  private static generateCuisineResponse(
    message: string,
    context: CulturalContext,
    language: Language
  ): string {
    const text = message.toLowerCase()
    
    if (text.includes('bacalhau') || text.includes('cod')) {
      return language === 'pt'
        ? "Ah, o nosso fiel amigo! O bacalhau é muito mais que comida - é tradição, é identidade. Dizem que há 365 maneiras de o preparar, uma para cada dia do ano. Que tipo de bacalhau gostas mais? Bacalhau à Brás, à Gomes de Sá, ou talvez com natas?"
        : "Ah, our faithful friend! Codfish is much more than food - it's tradition, it's identity. They say there are 365 ways to prepare it, one for each day of the year. What type of bacalhau do you prefer? Bacalhau à Brás, à Gomes de Sá, or perhaps with cream?"
    }

    if (text.includes('pastéis de nata') || text.includes('pastel de nata')) {
      return language === 'pt'
        ? "Os pastéis de nata são a nossa doce embaixada pelo mundo! Nasceram em Belém, mas conquistaram corações globalmente. Em Londres, já experimentaste os do Nata & Co ou os da Café de Nata? Nunca são iguais aos originais de Belém, mas matam as saudades."
        : "Pastéis de nata are our sweet embassy to the world! Born in Belém, they've conquered hearts globally. In London, have you tried those from Nata & Co or Café de Nata? They're never quite like the originals from Belém, but they help with the saudades."
    }

    // Regional cuisine responses
    if (context.region === 'north') {
      return language === 'pt'
        ? "A cozinha do Norte é robusta e calorosa, como a nossa gente! Francesinha, caldo verde, broa de milho... comida que aquece o coração e a alma. Tens algum prato nortenho de que tenhas especial saudade?"
        : "Northern cuisine is robust and warming, like our people! Francesinha, caldo verde, corn bread... food that warms the heart and soul. Is there any northern dish you particularly miss?"
    }

    return language === 'pt'
      ? "A nossa gastronomia é uma viagem pelas regiões e pela história. Cada prato conta uma história, cada sabor traz memórias. Em que posso ajudar-te a matar as saudades culinárias?"
      : "Our gastronomy is a journey through regions and history. Each dish tells a story, each flavor brings memories. How can I help you satisfy your culinary saudades?"
  }

  private static generateFadoResponse(
    message: string,
    context: CulturalContext,
    language: Language
  ): string {
    return language === 'pt'
      ? "O fado é a nossa alma cantada, o espelho da saudade portuguesa. Desde Amália Rodrigues até Mariza, o fado evolui mas mantém sempre essa capacidade única de tocar o coração. Em Londres, há casas de fado onde podes ouvir essa música que nos define. Conheces alguma fadista favorita?"
      : "Fado is our sung soul, the mirror of Lusophone saudade. From Amália Rodrigues to Mariza, fado evolves but always maintains that unique ability to touch the heart. In London, there are fado houses where you can hear this music that defines us. Do you have a favorite fadista?"
  }

  private static generateHistoryResponse(
    message: string,
    context: CulturalContext,
    language: Language
  ): string {
    return language === 'pt'
      ? "A nossa história é épica - das navegações que abriram o mundo ao 25 de Abril que nos trouxe a liberdade. Somos um povo pequeno que fez coisas grandes. Que período da história portuguesa te interessa mais? Os Descobrimentos? A Revolução dos Cravos? A entrada na União Europeia?"
      : "Our history is epic - from the navigations that opened the world to April 25th that brought us freedom. We are a small people who did great things. Which period of Portuguese history interests you most? The Discoveries? The Carnation Revolution? Joining the European Union?"
  }

  private static generateLanguageResponse(
    message: string,
    context: CulturalContext,
    language: Language
  ): string {
    return language === 'pt'
      ? "A língua portuguesa é música, é poesia, é a nossa forma única de ver o mundo. Tens dificuldades com algum aspeto específico? Gostarias de aprender expressões típicas? Ou talvez queiras praticar a conversação? Estou aqui para te ajudar a sentires-te mais à vontade com a nossa bela língua."
      : "The Portuguese language is music, poetry, our unique way of seeing the world. Are you having difficulties with any specific aspect? Would you like to learn typical expressions? Or perhaps practice conversation? I'm here to help you feel more comfortable with our beautiful language."
  }

  private static generateFestivalResponse(
    message: string,
    context: CulturalContext,
    language: Language
  ): string {
    return language === 'pt'
      ? "As nossas festas são momentos de união, tradição e alegria! Desde os Santos Populares em junho até ao Natal em família, cada celebração tem a sua magia. Em Londres, a comunidade de falantes de português organiza eventos lindos. Queres saber sobre festivais tradicionais ou eventos atuais da comunidade?"
      : "Our festivals are moments of unity, tradition and joy! From Santos Populares in June to Christmas with family, each celebration has its magic. In London, the Portuguese-speaking community organizes beautiful events. Want to know about traditional festivals or current community events?"
  }

  private static generateBusinessResponse(
    message: string,
    context: CulturalContext,
    language: Language
  ): string {
    return language === 'pt'
      ? "A cultura empresarial portuguesa valoriza as relações pessoais, a confiança e o respeito mútuo. No Reino Unido, muitos empresários portugueses destacam-se pela criatividade e pelo 'desenrascanço'. Como posso ajudar-te no teu percurso profissional ou empresarial?"
      : "Portuguese business culture values personal relationships, trust and mutual respect. In the United Kingdom, many Lusophone entrepreneurs stand out for their creativity and 'desenrascanço'. How can I help you in your professional or business journey?"
  }

  private static generateCommunityResponse(
    message: string,
    context: CulturalContext,
    language: Language
  ): string {
    const text = message.toLowerCase()
    
    // Navigation-focused responses based on what they're looking for
    if (text.includes('where') || text.includes('onde') || text.includes('como') || text.includes('how')) {
      if (text.includes('event') || text.includes('evento')) {
        return language === 'pt'
          ? "Para eventos portugueses, vai à secção 'What's Happening' no menu principal! Lá encontras eventos culturais, festas, workshops e encontros da comunidade. Podes filtrar por data, localização e tipo de evento. De que região és? Posso recomendar eventos específicos!"
          : "For Lusophone events, go to 'What's Happening' in the main menu! There you'll find cultural events, parties, workshops and community meetups. You can filter by date, location and event type. Where are you from? I can recommend specific events!"
      }
      
      if (text.includes('business') || text.includes('negócio') || text.includes('restaurant') || text.includes('service')) {
        return language === 'pt'
          ? "Para negócios portugueses, clica em 'For Business' → 'Discover Businesses' no menu! Encontrarás restaurantes, serviços, lojas e profissionais portugueses. Podes pesquisar por localização, tipo de negócio ou classificação. Que tipo de serviço procuras?"
          : "For Portuguese businesses, click 'For Business' → 'Discover Businesses' in the menu! You'll find Portuguese restaurants, services, shops and professionals. You can search by location, business type or rating. What kind of service are you looking for?"
      }
      
      if (text.includes('people') || text.includes('meet') || text.includes('conhecer') || text.includes('pessoas')) {
        return language === 'pt'
          ? "Para conhecer pessoas, experimenta 'Find Your Match' (o coração 💗 no menu) para conexões românticas ou de amizade! Também podes ir ao 'Community' → 'Meet Lusophone Speakers' para o diretório da comunidade. De onde és e que idade tens? Isso ajuda-me a sugerir os melhores grupos!"
          : "To meet people, try 'Find Your Match' (the heart 💗 in the menu) for romantic or friendship connections! You can also go to 'Community' → 'Meet Lusophone Speakers' for the community directory. Where are you from and what age are you? This helps me suggest the best groups!"
      }
    }
    
    // New user welcome response
    if (text.includes('novo') || text.includes('new') || text.includes('começar') || text.includes('start')) {
      return language === 'pt'
        ? "Bem-vindo ao LusoTown! 🇵🇹 Aqui tens tudo para a comunidade lusófona no Reino Unido:\n\n📅 **Events**: Clica 'What's Happening' para eventos\n💗 **Dating/Amizades**: 'Find Your Match'\n🏢 **Negócios**: 'For Business' → 'Discover Businesses'\n👥 **Comunidade**: 'Community' para conhecer pessoas\n\nDe onde és? Portugal, Brasil, ou outro país lusófono? Isso ajuda-me a personalizar as sugestões!"
        : "Welcome to LusoTown! 🇵🇹 Here you have everything for the Portuguese-speaking community in the UK:\n\n📅 **Events**: Click 'What's Happening' for events\n💗 **Dating/Friendships**: 'Find Your Match'\n🏢 **Business**: 'For Business' → 'Discover Businesses'\n👥 **Community**: 'Community' to meet people\n\nWhere are you from? Portugal, Brazil, or another Portuguese-speaking country? This helps me personalize suggestions!"
    }
    
    // Default navigation-focused response
    return language === 'pt'
      ? "Olá! Sou o LusoBot e estou aqui para te ajudar a navegar no LusoTown. 🇵🇹\n\nDiz-me:\n• De onde és? (Portugal, Brasil, Cabo Verde...)\n• O que procuras? (eventos, negócios, pessoas, grupos...)\n• És novo no Reino Unido?\n\nCom essas informações, posso guiar-te para as secções mais úteis da plataforma!"
      : "Hello! I'm LusoBot and I'm here to help you navigate LusoTown. 🇵🇹\n\nTell me:\n• Where are you from? (Portugal, Brazil, Cape Verde...)\n• What are you looking for? (events, businesses, people, groups...)\n• Are you new to the UK?\n\nWith this information, I can guide you to the most useful sections of the platform!"
  }

  private static generateSuggestions(
    culturalContext: CulturalContext,
    emotionalTone: EmotionalTone,
    userContext: MessageMetadata,
    language: Language
  ): LusoBotSuggestion[] {
    const suggestions: LusoBotSuggestion[] = []

    // Always suggest main navigation areas for new users
    if (userContext.communityLevel === 'newcomer') {
      suggestions.push({
        type: 'event',
        title: language === 'pt' ? 'Ver Eventos Portugueses' : 'Browse Lusophone Events',
        description: language === 'pt' 
          ? 'Clica "What\'s Happening" no menu principal'
          : 'Click "What\'s Happening" in the main menu',
        link: '/events/',
        priority: 'high',
        culturalRelevance: 0.95
      })
      
      suggestions.push({
        type: 'community',
        title: language === 'pt' ? 'Encontrar Pessoas' : 'Find People',
        description: language === 'pt' 
          ? 'Usa "Find Your Match" (💗) para conhecer portugueses'
          : 'Use "Find Your Match" (💗) to meet Portuguese speakers',
        link: '/matches/',
        priority: 'high',
        culturalRelevance: 0.9
      })
      
      suggestions.push({
        type: 'business',
        title: language === 'pt' ? 'Negócios Portugueses' : 'Lusophone Businesses',
        description: language === 'pt' 
          ? 'Vai a "For Business" → "Discover Businesses"'
          : 'Go to "For Business" → "Discover Businesses"',
        link: '/business-directory/',
        priority: 'high',
        culturalRelevance: 0.85
      })
    }

    // High saudade - suggest community connections
    if (emotionalTone.saudade > 0.5) {
      suggestions.push({
        type: 'community',
        title: language === 'pt' ? 'Encontros Portugueses em Londres' : 'Lusophone Meetups in London',
        description: language === 'pt' 
          ? 'Conecta-te com outros portugueses na tua área'
          : 'Connect with other Lusophone people in your area',
        link: '/events/?category=cultural',
        priority: 'high',
        culturalRelevance: 0.9
      })
    }

    // Cuisine interest - suggest restaurants and events
    if (culturalContext.topic === 'cuisine') {
      suggestions.push({
        type: 'business',
        title: language === 'pt' ? 'Restaurantes Portugueses' : 'Lusophone Restaurants',
        description: language === 'pt' 
          ? 'Descobre sabores de casa em Londres'
          : 'Discover flavors from home in London',
        link: '/directory?category=restaurants',
        priority: 'high',
        culturalRelevance: 0.8
      })

      suggestions.push({
        type: 'event',
        title: language === 'pt' ? 'Aulas de Culinária Portuguesa' : 'Lusophone Cooking Classes',
        description: language === 'pt' 
          ? 'Aprende a fazer pratos tradicionais'
          : 'Learn to make traditional dishes',
        link: '/events?type=cooking',
        priority: 'medium',
        culturalRelevance: 0.7
      })
    }

    // Language learning support
    if (culturalContext.topic === 'language' || userContext.languageProficiency === 'learning') {
      suggestions.push({
        type: 'language',
        title: language === 'pt' ? 'Intercâmbio de Idiomas' : 'Language Exchange',
        description: language === 'pt' 
          ? 'Pratica português com nativos'
          : 'Practice Lusophone with natives',
        link: '/language-exchange',
        priority: 'high',
        culturalRelevance: 0.8
      })
    }

    // Business networking
    if (culturalContext.topic === 'business') {
      suggestions.push({
        type: 'community',
        title: language === 'pt' ? 'Networking Empresarial LusoTown' : 'LusoTown Business Networking',
        description: language === 'pt' 
          ? 'Conecta-te com empresários portugueses'
          : 'Connect with Lusophone entrepreneurs',
        link: '/business-networking',
        priority: 'high',
        culturalRelevance: 0.8
      })
    }

    // Cultural events for heritage connection
    if (emotionalTone.heritage > 0.4) {
      suggestions.push({
        type: 'event',
        title: language === 'pt' ? 'Eventos Culturais Portugueses' : 'Lusophone Cultural Events',
        description: language === 'pt' 
          ? 'Celebra a nossa cultura e tradições'
          : 'Celebrate our culture and traditions',
        link: '/cultural-calendar',
        priority: 'medium',
        culturalRelevance: 0.9
      })
    }

    return suggestions.sort((a, b) => {
      // Sort by priority and cultural relevance
      const priorityWeight = { high: 3, medium: 2, low: 1 }
      const aScore = priorityWeight[a.priority] + a.culturalRelevance
      const bScore = priorityWeight[b.priority] + b.culturalRelevance
      return bScore - aScore
    }).slice(0, 4) // Return top 4 suggestions
  }
}

// Chat Session Manager
export class LusoBotSession {
  private messages: LusoBotMessage[] = []
  private userContext: MessageMetadata
  private language: Language

  constructor(userContext: MessageMetadata, language: Language = 'en') {
    this.userContext = userContext
    this.language = language
    
    // Add welcome message
    this.addWelcomeMessage()
  }

  private addWelcomeMessage() {
    const welcomeMessage: LusoBotMessage = {
      id: `welcome_${  Date.now()}`,
      role: 'assistant',
      content: this.language === 'pt' 
        ? "Olá! Sou o LusoBot, o teu assistente cultural português. Estou aqui para te ajudar com tudo relacionado com a nossa cultura, tradições, comunidade em Londres, e claro, para compreender e apoiar as tuas saudades. Como posso ajudar-te hoje?"
        : "Hello! I'm LusoBot, your Lusophone cultural assistant. I'm here to help you with everything related to our culture, traditions, community in London, and of course, to understand and support your saudades. How can I help you today?",
      timestamp: new Date(),
      language: this.language,
      culturalContext: {
        region: 'diaspora_uk',
        topic: 'community',
        expertise: ['uk_portuguese_community', 'cultural_events', 'diaspora_support'],
        confidence: 1.0
      },
      emotionalTone: {
        saudade: 0,
        nostalgia: 0,
        hope: 0.8,
        community: 0.9,
        heritage: 0.7
      }
    }

    this.messages.push(welcomeMessage)
  }

  async sendMessage(content: string): Promise<LusoBotMessage> {
    // Add user message
    const userMessage: LusoBotMessage = {
      id: `user_${  Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date(),
      language: this.language,
      metadata: this.userContext
    }
    this.messages.push(userMessage)

    // Generate bot response
    const botResponse = await LusoBotEngine.generateResponse(
      content,
      this.userContext,
      this.language
    )
    this.messages.push(botResponse)

    return botResponse
  }

  getMessages(): LusoBotMessage[] {
    return [...this.messages]
  }

  updateUserContext(context: Partial<MessageMetadata>) {
    this.userContext = { ...this.userContext, ...context }
  }

  setLanguage(language: Language) {
    this.language = language
  }

  exportConversation(): string {
    return JSON.stringify({
      timestamp: new Date().toISOString(),
      language: this.language,
      userContext: this.userContext,
      messages: this.messages
    }, null, 2)
  }
}