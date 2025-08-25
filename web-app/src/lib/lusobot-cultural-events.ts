/**
 * LusoBot Cultural Events Integration
 * 
 * Provides Lusophone cultural event knowledge and integration with LusoTown's
 * event system for community engagement and cultural celebration
 */

import { Language } from '@/i18n'

export interface PortugueseCulturalEvent {
  id: string
  name: Record<'pt' | 'en', string>
  description: Record<'pt' | 'en', string>
  category: CulturalEventCategory
  date: Date | string
  region: PortugueseRegion[]
  significance: CulturalSignificance
  traditions: PortugueseTradition[]
  modernCelebrations: ModernCelebration[]
  lusoTownEvents?: LusoTownEventReference[]
}

export interface PortugueseTradition {
  name: Record<'pt' | 'en', string>
  description: Record<'pt' | 'en', string>
  practiceType: 'food' | 'music' | 'dance' | 'ritual' | 'decoration' | 'gathering'
  modernAdaptations?: string[]
}

export interface ModernCelebration {
  location: string
  organizer?: string
  adaptations: string[]
  communityInvolvement: string[]
}

export interface LusoTownEventReference {
  eventId: string
  title: string
  date: Date
  location: string
  organizerId: string
}

export type CulturalEventCategory = 
  | 'religious' | 'seasonal' | 'historical' | 'literary' | 'musical' 
  | 'culinary' | 'sports' | 'regional' | 'diaspora' | 'modern'

export type PortugueseRegion = 
  | 'north' | 'center' | 'south' | 'lisbon' | 'porto'
  | 'azores' | 'madeira' | 'national' | 'diaspora'

export interface CulturalSignificance {
  historicalImportance: number // 0-1 scale
  religiousSignificance: number
  familyTradition: number
  communityBonding: number
  culturalIdentity: number
  modernRelevance: number
}

// Lusophone Cultural Calendar
export const PORTUGUESE_CULTURAL_CALENDAR: PortugueseCulturalEvent[] = [
  // January
  {
    id: 'reis_magos',
    name: { pt: 'Dia de Reis', en: 'Three Kings Day' },
    description: {
      pt: 'Celebração tradicional do fim das festividades natalícias com as janeiras e o bolo-rei',
      en: 'Traditional celebration marking the end of Christmas festivities with caroling and king cake'
    },
    category: 'religious',
    date: '2024-01-06',
    region: ['national'],
    significance: {
      historicalImportance: 0.8,
      religiousSignificance: 0.9,
      familyTradition: 0.7,
      communityBonding: 0.6,
      culturalIdentity: 0.8,
      modernRelevance: 0.5
    },
    traditions: [
      {
        name: { pt: 'Janeiras', en: 'New Year Caroling' },
        description: {
          pt: 'Grupos de cantores vão de casa em casa cantando as janeiras',
          en: 'Groups of singers go door-to-door singing traditional New Year songs'
        },
        practiceType: 'music'
      },
      {
        name: { pt: 'Bolo-Rei', en: 'King Cake' },
        description: {
          pt: 'Bolo tradicional com frutas cristalizadas e uma fava escondida',
          en: 'Traditional cake with candied fruits and a hidden bean'
        },
        practiceType: 'food'
      }
    ],
    modernCelebrations: [
      {
        location: 'London Portuguese-speaking community',
        adaptations: ['Community centers host bolo-rei sharing', 'Digital janeiras on social media'],
        communityInvolvement: ['Lusophone families', 'Cultural associations', 'Churches']
      }
    ]
  },

  // February/March
  {
    id: 'carnaval',
    name: { pt: 'Carnaval', en: 'Carnival' },
    description: {
      pt: 'Festa tradicional antes da Quaresma com mascarados, desfiles e diversão',
      en: 'Traditional celebration before Lent with masked figures, parades and festivities'
    },
    category: 'seasonal',
    date: 'variable', // Changes yearly
    region: ['national'],
    significance: {
      historicalImportance: 0.7,
      religiousSignificance: 0.4,
      familyTradition: 0.8,
      communityBonding: 0.9,
      culturalIdentity: 0.8,
      modernRelevance: 0.7
    },
    traditions: [
      {
        name: { pt: 'Entrudo', en: 'Traditional Carnival Games' },
        description: {
          pt: 'Jogos tradicionais com farinha, ovos e brincadeiras de rua',
          en: 'Traditional games with flour, eggs and street festivities'
        },
        practiceType: 'gathering'
      },
      {
        name: { pt: 'Mascarados', en: 'Masked Figures' },
        description: {
          pt: 'Figuras mascaradas tradicionais representando personagens locais',
          en: 'Traditional masked figures representing local characters'
        },
        practiceType: 'ritual'
      }
    ],
    modernCelebrations: [
      {
        location: 'United Kingdom Lusophone Schools',
        adaptations: ['Children\'s costume parties', 'Traditional dance workshops'],
        communityInvolvement: ['Lusophone schools', 'Dance groups', 'Families']
      }
    ]
  },

  // April
  {
    id: 'vinte_cinco_abril',
    name: { pt: '25 de Abril', en: 'Freedom Day' },
    description: {
      pt: 'Dia da Liberdade, celebrando a Revolução dos Cravos de 1974',
      en: 'Freedom Day, celebrating the 1974 Carnation Revolution'
    },
    category: 'historical',
    date: '2024-04-25',
    region: ['national', 'diaspora'],
    significance: {
      historicalImportance: 1.0,
      religiousSignificance: 0.0,
      familyTradition: 0.6,
      communityBonding: 0.8,
      culturalIdentity: 0.9,
      modernRelevance: 1.0
    },
    traditions: [
      {
        name: { pt: 'Cravos Vermelhos', en: 'Red Carnations' },
        description: {
          pt: 'Símbolo da revolução pacífica e da liberdade conquistada',
          en: 'Symbol of the peaceful revolution and conquered freedom'
        },
        practiceType: 'ritual'
      },
      {
        name: { pt: 'Grândola Vila Morena', en: 'Grândola Vila Morena Song' },
        description: {
          pt: 'Canção símbolo da resistência e da revolução',
          en: 'Song that became a symbol of resistance and revolution'
        },
        practiceType: 'music'
      }
    ],
    modernCelebrations: [
      {
        location: 'Lusophone Embassy London',
        adaptations: ['Democratic values discussion panels', 'Historical exhibitions'],
        communityInvolvement: ['Political associations', 'Cultural centers', 'Universities']
      }
    ]
  },

  // May
  {
    id: 'dia_da_mae',
    name: { pt: 'Dia da Mãe', en: 'Mother\'s Day' },
    description: {
      pt: 'Celebração especial dedicada às mães e à maternidade',
      en: 'Special celebration dedicated to mothers and motherhood'
    },
    category: 'modern',
    date: '2024-05-05', // First Sunday of May in Portugal
    region: ['national', 'diaspora'],
    significance: {
      historicalImportance: 0.3,
      religiousSignificance: 0.2,
      familyTradition: 1.0,
      communityBonding: 0.7,
      culturalIdentity: 0.6,
      modernRelevance: 1.0
    },
    traditions: [
      {
        name: { pt: 'Flores para a Mãe', en: 'Flowers for Mother' },
        description: {
          pt: 'Tradição de oferecer flores e presentes às mães',
          en: 'Tradition of giving flowers and gifts to mothers'
        },
        practiceType: 'gathering'
      },
      {
        name: { pt: 'Almoço em Família', en: 'Family Lunch' },
        description: {
          pt: 'Reunião familiar especial para honrar as mães',
          en: 'Special family gathering to honor mothers'
        },
        practiceType: 'food'
      }
    ],
    modernCelebrations: [
      {
        location: 'Lusophone Restaurants United Kingdom',
        adaptations: ['Special Mother\'s Day menus', 'Family celebration packages'],
        communityInvolvement: ['Portuguese restaurants', 'Families', 'Community groups']
      }
    ]
  },

  // June
  {
    id: 'santos_populares',
    name: { pt: 'Santos Populares', en: 'Popular Saints' },
    description: {
      pt: 'Festivais tradicionais de junho celebrando Santo António, São João e São Pedro',
      en: 'Traditional June festivals celebrating Saint Anthony, Saint John and Saint Peter'
    },
    category: 'religious',
    date: '2024-06-12', // Santo António, but extends through June
    region: ['national'],
    significance: {
      historicalImportance: 0.9,
      religiousSignificance: 0.8,
      familyTradition: 0.9,
      communityBonding: 1.0,
      culturalIdentity: 1.0,
      modernRelevance: 0.8
    },
    traditions: [
      {
        name: { pt: 'Sardinhas Assadas', en: 'Grilled Sardines' },
        description: {
          pt: 'Tradição culinária central das festas dos santos populares',
          en: 'Central culinary tradition of the popular saints festivals'
        },
        practiceType: 'food'
      },
      {
        name: { pt: 'Manjericos', en: 'Sweet Basil Pots' },
        description: {
          pt: 'Vasos de manjerico oferecidos como símbolo de amor e amizade',
          en: 'Sweet basil pots given as symbols of love and friendship'
        },
        practiceType: 'decoration'
      },
      {
        name: { pt: 'Marchas Populares', en: 'Popular Marches' },
        description: {
          pt: 'Desfiles coloridos pelos bairros de Lisboa',
          en: 'Colorful parades through Lisbon neighborhoods'
        },
        practiceType: 'dance'
      },
      {
        name: { pt: 'Fogueiras de São João', en: 'Saint John Bonfires' },
        description: {
          pt: 'Fogueiras tradicionais na noite de São João no Porto',
          en: 'Traditional bonfires on Saint John\'s night in Porto'
        },
        practiceType: 'ritual'
      }
    ],
    modernCelebrations: [
      {
        location: 'London Portuguese-speaking community Centers',
        adaptations: [
          'Indoor sardine grilling events',
          'Manjerico workshops for children',
          'Traditional music and dance performances',
          'Street festival simulations'
        ],
        communityInvolvement: [
          'Lusophone associations',
          'Restaurants',
          'Folk dance groups',
          'Families with children'
        ]
      }
    ]
  },

  // October
  {
    id: 'dia_da_republica',
    name: { pt: 'Dia da República', en: 'Republic Day' },
    description: {
      pt: 'Celebração da implantação da República Portuguesa em 1910',
      en: 'Celebration of the establishment of the Lusophone Republic in 1910'
    },
    category: 'historical',
    date: '2024-10-05',
    region: ['national', 'diaspora'],
    significance: {
      historicalImportance: 0.9,
      religiousSignificance: 0.0,
      familyTradition: 0.5,
      communityBonding: 0.6,
      culturalIdentity: 0.8,
      modernRelevance: 0.7
    },
    traditions: [
      {
        name: { pt: 'A Portuguesa', en: 'The Lusophone Anthem' },
        description: {
          pt: 'Hino nacional cantado em cerimónias oficiais',
          en: 'National anthem sung at official ceremonies'
        },
        practiceType: 'music'
      }
    ],
    modernCelebrations: [
      {
        location: 'Lusophone Cultural Centers',
        adaptations: ['Historical exhibitions', 'Citizenship ceremonies'],
        communityInvolvement: ['Cultural associations', 'Educational institutions']
      }
    ]
  },

  // November
  {
    id: 'sao_martinho',
    name: { pt: 'São Martinho', en: 'Saint Martin\'s Day' },
    description: {
      pt: 'Celebração tradicional com castanhas assadas e vinho novo',
      en: 'Traditional celebration with roasted chestnuts and new wine'
    },
    category: 'seasonal',
    date: '2024-11-11',
    region: ['national'],
    significance: {
      historicalImportance: 0.7,
      religiousSignificance: 0.6,
      familyTradition: 0.8,
      communityBonding: 0.8,
      culturalIdentity: 0.8,
      modernRelevance: 0.6
    },
    traditions: [
      {
        name: { pt: 'Castanhas Assadas', en: 'Roasted Chestnuts' },
        description: {
          pt: 'Tradição de assar e comer castanhas ao ar livre',
          en: 'Tradition of roasting and eating chestnuts outdoors'
        },
        practiceType: 'food'
      },
      {
        name: { pt: 'Vinho Novo', en: 'New Wine' },
        description: {
          pt: 'Prova do vinho novo da colheita recente',
          en: 'Tasting of new wine from the recent harvest'
        },
        practiceType: 'food'
      }
    ],
    modernCelebrations: [
      {
        location: 'London Parks & Lusophone Areas',
        adaptations: ['Chestnut roasting events', 'Wine tasting sessions'],
        communityInvolvement: ['Portuguese wine importers', 'Community groups', 'Families']
      }
    ]
  },

  // December
  {
    id: 'natal',
    name: { pt: 'Natal', en: 'Christmas' },
    description: {
      pt: 'Maior celebração religiosa e familiar do ano português',
      en: 'The largest religious and family celebration of the Lusophone year'
    },
    category: 'religious',
    date: '2024-12-25',
    region: ['national', 'diaspora'],
    significance: {
      historicalImportance: 0.9,
      religiousSignificance: 1.0,
      familyTradition: 1.0,
      communityBonding: 0.9,
      culturalIdentity: 0.9,
      modernRelevance: 1.0
    },
    traditions: [
      {
        name: { pt: 'Consoada', en: 'Christmas Eve Dinner' },
        description: {
          pt: 'Ceia especial na véspera de Natal com bacalhau e família reunida',
          en: 'Special Christmas Eve dinner with codfish and family gathered'
        },
        practiceType: 'food'
      },
      {
        name: { pt: 'Missa do Galo', en: 'Rooster\'s Mass' },
        description: {
          pt: 'Missa tradicional da meia-noite de Natal',
          en: 'Traditional midnight Christmas mass'
        },
        practiceType: 'ritual'
      },
      {
        name: { pt: 'Presépios', en: 'Nativity Scenes' },
        description: {
          pt: 'Representações do nascimento de Jesus em casas e igrejas',
          en: 'Representations of Jesus\' birth in homes and churches'
        },
        practiceType: 'decoration'
      }
    ],
    modernCelebrations: [
      {
        location: 'Lusophone Churches & Community Centers United Kingdom',
        adaptations: [
          'Lusophone Christmas markets',
          'Traditional carol singing',
          'Codfish dinner events',
          'Midnight mass in Lusophone'
        ],
        communityInvolvement: [
          'Lusophone churches',
          'Cultural associations',
          'Families',
          'Lusophone schools'
        ]
      }
    ]
  }
]

// LusoBot Cultural Events Knowledge Engine
export class LusoBotCulturalEvents {
  static getEventsByMonth(month: number): PortugueseCulturalEvent[] {
    return PORTUGUESE_CULTURAL_CALENDAR.filter(event => {
      if (typeof event.date === 'string') {
        if (event.date === 'variable') return false
        const eventDate = new Date(event.date)
        return eventDate.getMonth() + 1 === month
      }
      return false
    })
  }

  static getUpcomingEvents(daysAhead: number = 30): PortugueseCulturalEvent[] {
    const now = new Date()
    const futureDate = new Date(now.getTime() + daysAhead * 24 * 60 * 60 * 1000)

    return PORTUGUESE_CULTURAL_CALENDAR.filter(event => {
      if (typeof event.date === 'string' && event.date !== 'variable') {
        const eventDate = new Date(event.date)
        return eventDate >= now && eventDate <= futureDate
      }
      return false
    })
  }

  static findEventsByCategory(category: CulturalEventCategory): PortugueseCulturalEvent[] {
    return PORTUGUESE_CULTURAL_CALENDAR.filter(event => event.category === category)
  }

  static findEventsByRegion(region: PortugueseRegion): PortugueseCulturalEvent[] {
    return PORTUGUESE_CULTURAL_CALENDAR.filter(event => 
      event.region.includes(region) || event.region.includes('national')
    )
  }

  static searchEvents(query: string, language: Language): PortugueseCulturalEvent[] {
    const searchTerm = query.toLowerCase()
    
    return PORTUGUESE_CULTURAL_CALENDAR.filter(event => {
      const name = event.name[language].toLowerCase()
      const description = event.description[language].toLowerCase()
      
      // Search in name and description
      if (name.includes(searchTerm) || description.includes(searchTerm)) {
        return true
      }

      // Search in traditions
      const traditionMatches = event.traditions.some(tradition => {
        const tradName = tradition.name[language].toLowerCase()
        const tradDesc = tradition.description[language].toLowerCase()
        return tradName.includes(searchTerm) || tradDesc.includes(searchTerm)
      })

      return traditionMatches
    })
  }

  static getEventRecommendations(
    userInterests: string[],
    emotionalState: { saudade: number; community: number; heritage: number },
    language: Language
  ): PortugueseCulturalEvent[] {
    let recommendations = [...PORTUGUESE_CULTURAL_CALENDAR]

    // Score events based on user emotional state and interests
    recommendations = recommendations.map(event => ({
      ...event,
      relevanceScore: this.calculateEventRelevance(event, userInterests, emotionalState)
    })).sort((a, b) => (b as any).relevanceScore - (a as any).relevanceScore)

    return recommendations.slice(0, 5) // Return top 5 recommendations
  }

  private static calculateEventRelevance(
    event: PortugueseCulturalEvent,
    userInterests: string[],
    emotionalState: { saudade: number; community: number; heritage: number }
  ): number {
    let score = 0

    // Base significance score
    score += event.significance.familyTradition * 0.3
    score += event.significance.communityBonding * 0.3
    score += event.significance.culturalIdentity * 0.3
    score += event.significance.modernRelevance * 0.1

    // Emotional state relevance
    if (emotionalState.saudade > 0.5) {
      score += event.significance.familyTradition * 0.4
      score += event.significance.historicalImportance * 0.3
    }

    if (emotionalState.community > 0.5) {
      score += event.significance.communityBonding * 0.5
    }

    if (emotionalState.heritage > 0.5) {
      score += event.significance.culturalIdentity * 0.4
      score += event.significance.historicalImportance * 0.3
    }

    // Interest matching
    const eventCategories = [event.category, ...event.traditions.map(t => t.practiceType)]
    const interestMatches = userInterests.filter(interest => 
      eventCategories.some(category => 
        category.toLowerCase().includes(interest.toLowerCase()) ||
        interest.toLowerCase().includes(category.toLowerCase())
      )
    ).length

    score += interestMatches * 0.2

    return Math.min(score, 1) // Cap at 1.0
  }

  static generateEventExplanation(
    event: PortugueseCulturalEvent,
    language: Language,
    focus: 'history' | 'traditions' | 'modern' | 'family' = 'traditions'
  ): string {
    const name = event.name[language]
    const description = event.description[language]

    let explanation = `${name} é uma ${
      language === 'pt' ? 'celebração' : 'celebration'
    } ${event.category === 'religious' ? 
      (language === 'pt' ? 'religiosa' : 'religious') : 
      (language === 'pt' ? 'cultural' : 'cultural')
    }. ${description}`

    switch (focus) {
      case 'history':
        if (event.significance.historicalImportance > 0.7) {
          explanation += language === 'pt' 
            ? ` Esta festa tem profundas raízes históricas e representa uma parte importante da identidade portuguesa.`
            : ` This celebration has deep historical roots and represents an important part of Lusophone identity.`
        }
        break

      case 'traditions':
        if (event.traditions.length > 0) {
          const traditionNames = event.traditions.map(t => t.name[language]).join(', ')
          explanation += language === 'pt'
            ? ` As tradições incluem: ${traditionNames}.`
            : ` Traditions include: ${traditionNames}.`
        }
        break

      case 'modern':
        if (event.modernCelebrations.length > 0) {
          explanation += language === 'pt'
            ? ` Atualmente, a comunidade de falantes de português no Reino Unido celebra esta data através de eventos comunitários e adaptações culturais.`
            : ` Currently, the Portuguese-speaking community in the United Kingdom celebrates this date through community events and cultural adaptations.`
        }
        break

      case 'family':
        if (event.significance.familyTradition > 0.7) {
          explanation += language === 'pt'
            ? ` É uma ocasião especial para reunir a família e manter vivas as tradições portuguesas.`
            : ` It's a special occasion to bring family together and keep Portuguese traditions alive.`
        }
        break
    }

    return explanation
  }

  static findRelatedLusoTownEvents(
    culturalEvent: PortugueseCulturalEvent,
    upcomingEvents: any[] // Would be actual LusoTown events
  ): LusoTownEventReference[] {
    // This would integrate with the actual LusoTown events system
    // For now, returning a simulation structure
    return upcomingEvents
      .filter(event => {
        // Match by keywords, categories, or cultural relevance
        const keywords = [
          culturalEvent.name.pt,
          culturalEvent.name.en,
          ...culturalEvent.traditions.map(t => t.name.pt),
          culturalEvent.category
        ]
        
        return keywords.some(keyword => 
          event.title.toLowerCase().includes(keyword.toLowerCase()) ||
          event.description?.toLowerCase().includes(keyword.toLowerCase())
        )
      })
      .map(event => ({
        eventId: event.id,
        title: event.title,
        date: new Date(event.date),
        location: event.location || 'London',
        organizerId: event.organizer?.id || 'community'
      }))
  }
}