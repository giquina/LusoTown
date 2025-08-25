/**
 * Lusophone Cultural Celebrations Configuration
 * Comprehensive celebration of Portuguese-speaking cultures across all nations
 * Designed to be inclusive of the entire Portuguese-speaking diaspora
 */

export interface LusophoneCelebration {
  id: string
  name: {
    en: string
    pt: string
  }
  description: {
    en: string
    pt: string
  }
  icon: string
  flagEmoji?: string
  countries: string[]
  period: {
    en: string
    pt: string
  }
  businessCount: number
  category: 'music' | 'festival' | 'independence' | 'religious' | 'cultural' | 'food' | 'art' | 'heritage'
  significance: {
    en: string
    pt: string
  }
  traditionalElements: string[]
  modernCelebration: {
    en: string
    pt: string
  }
}

export interface CulturalWisdom {
  id: string
  quote: {
    en: string
    pt: string
  }
  origin: {
    en: string
    pt: string
  }
  country: string
  flagEmoji: string
  philosophy: {
    en: string
    pt: string
  }
}

/**
 * Comprehensive Lusophone Cultural Celebrations
 * Representing all Portuguese-speaking nations and diaspora traditions
 */
export const LUSOPHONE_CELEBRATIONS: LusophoneCelebration[] = [
  {
    id: 'santos-populares-festa-junina',
    name: {
      en: 'Santos Populares & June Festivals',
      pt: 'Santos Populares e Festas Juninas'
    },
    description: {
      en: 'Vibrant June celebrations combining Lusophone Santos Populares with Brazilian Festa Junina traditions',
      pt: 'Vibrantes celebrações de junho combinando Santos Populares portugueses com tradições brasileiras de Festa Junina'
    },
    icon: '🎉',
    flagEmoji: '🇵🇹🇧🇷',
    countries: ['Portugal', 'Brazil'],
    period: {
      en: 'June - July',
      pt: 'Junho - Julho'
    },
    businessCount: 27,
    category: 'festival',
    significance: {
      en: 'Celebrates community spirit, traditional foods, folk dances, and the joy of summer across Lusophone and Brazilian cultures',
      pt: 'Celebra o espírito comunitário, comidas tradicionais, danças folclóricas e a alegria do verão nas culturas portuguesa e brasileira'
    },
    traditionalElements: ['Sardines & Grilled Corn', 'Quadrilha Dancing', 'Paper Decorations', 'Street Parties', 'Bonfire Jumping'],
    modernCelebration: {
      en: 'London restaurants serve traditional dishes while community centers host folk dancing and live music',
      pt: 'Restaurantes londrinos servem pratos tradicionais enquanto centros comunitários organizam danças folclóricas e música ao vivo'
    }
  },
  {
    id: 'music-heritage-lusophone',
    name: {
      en: 'Music Heritage Celebrations',
      pt: 'Celebrações do Património Musical'
    },
    description: {
      en: 'Year-round celebration of Lusophone musical traditions: Fado, Samba, Kizomba, Morna, and more',
      pt: 'Celebração anual das tradições musicais lusófonas: Fado, Samba, Kizomba, Morna, e mais'
    },
    icon: '🎵',
    flagEmoji: '🎶',
    countries: ['Portugal', 'Brazil', 'Angola', 'Cape Verde', 'Mozambique'],
    period: {
      en: 'Year-round',
      pt: 'Todo o ano'
    },
    businessCount: 35,
    category: 'music',
    significance: {
      en: 'Celebrates the rich musical diversity that unites Portuguese-speaking peoples through rhythm and soul',
      pt: 'Celebra a rica diversidade musical que une os povos de língua portuguesa através do ritmo e da alma'
    },
    traditionalElements: ['Live Performances', 'Music Workshops', 'Cultural Storytelling', 'Dance Lessons'],
    modernCelebration: {
      en: 'London venues host authentic performances from Portugal\'s Fado houses to Brazil\'s samba schools, Angola\'s Kizomba nights, and Cape Verde\'s Morna sessions',
      pt: 'Locais de Londres organizam performances autênticas desde casas de Fado portuguesas a escolas de samba brasileiras, noites de Kizomba angolanas e sessões de Morna cabo-verdianas'
    }
  },
  {
    id: 'brazilian-independence',
    name: {
      en: 'Brazilian Independence Day',
      pt: 'Dia da Independência do Brasil'
    },
    description: {
      en: 'Celebrating Brazilian independence with green and yellow pride throughout London',
      pt: 'Celebrando a independência brasileira com orgulho verde e amarelo por toda Londres'
    },
    icon: '🇧🇷',
    flagEmoji: '🇧🇷',
    countries: ['Brazil'],
    period: {
      en: 'September 7th',
      pt: '7 de Setembro'
    },
    businessCount: 22,
    category: 'independence',
    significance: {
      en: 'Commemorates Brazil\'s independence and celebrates the largest Portuguese-speaking nation\'s cultural contributions',
      pt: 'Comemora a independência do Brasil e celebra as contribuições culturais da maior nação de língua portuguesa'
    },
    traditionalElements: ['Capoeira Performances', 'Samba Parades', 'Traditional Foods', 'Cultural Exhibitions'],
    modernCelebration: {
      en: 'Brazilian restaurants offer special menus, cultural centers host exhibitions, and community groups organize parades',
      pt: 'Restaurantes brasileiros oferecem menus especiais, centros culturais organizam exposições e grupos comunitários organizam desfiles'
    }
  },
  {
    id: 'angolan-independence',
    name: {
      en: 'Angola Independence Day',
      pt: 'Dia da Independência de Angola'
    },
    description: {
      en: 'Honoring Angola\'s independence and celebrating the vibrant Angolan community in London',
      pt: 'Honrando a independência de Angola e celebrando a vibrante comunidade angolana em Londres'
    },
    icon: '🇦🇴',
    flagEmoji: '🇦🇴',
    countries: ['Angola'],
    period: {
      en: 'November 11th',
      pt: '11 de Novembro'
    },
    businessCount: 18,
    category: 'independence',
    significance: {
      en: 'Celebrates Angolan independence and the rich cultural heritage including Kizomba music and traditional cuisine',
      pt: 'Celebra a independência angolana e a rica herança cultural incluindo música Kizomba e culinária tradicional'
    },
    traditionalElements: ['Kizomba Dancing', 'Traditional Drumming', 'Muamba de Galinha', 'Cultural Storytelling'],
    modernCelebration: {
      en: 'London\'s Angolan businesses host special events featuring traditional music, dance, and authentic cuisine',
      pt: 'Negócios angolanos de Londres organizam eventos especiais com música tradicional, dança e culinária autêntica'
    }
  },
  {
    id: 'cape-verdean-culture-day',
    name: {
      en: 'Cape Verdean Culture Day',
      pt: 'Dia da Cultura Cabo-verdiana'
    },
    description: {
      en: 'Celebrating the soulful Morna music and vibrant island culture of Cape Verde',
      pt: 'Celebrando a música Morna comovente e a cultura vibrante das ilhas de Cabo Verde'
    },
    icon: '🇨🇻',
    flagEmoji: '🇨🇻',
    countries: ['Cape Verde'],
    period: {
      en: 'March - Culture Month',
      pt: 'Março - Mês da Cultura'
    },
    businessCount: 15,
    category: 'cultural',
    significance: {
      en: 'Celebrates Cape Verdean music, particularly Morna and Coladeira, and the unique island hospitality known as "Morabeza"',
      pt: 'Celebra a música cabo-verdiana, particularmente Morna e Coladeira, e a hospitalidade única das ilhas conhecida como "Morabeza"'
    },
    traditionalElements: ['Morna Sessions', 'Coladeira Dancing', 'Cachupa Cooking', 'Island Stories'],
    modernCelebration: {
      en: 'London venues host intimate Morna performances and community gatherings celebrating Cape Verdean heritage',
      pt: 'Locais de Londres organizam performances íntimas de Morna e encontros comunitários celebrando a herança cabo-verdiana'
    }
  },
  {
    id: 'mozambican-heritage',
    name: {
      en: 'Mozambican Heritage Celebration',
      pt: 'Celebração do Património Moçambicano'
    },
    description: {
      en: 'Honoring Mozambican independence and cultural diversity through music, art, and cuisine',
      pt: 'Honrando a independência moçambicana e diversidade cultural através da música, arte e culinária'
    },
    icon: '🇲🇿',
    flagEmoji: '🇲🇿',
    countries: ['Mozambique'],
    period: {
      en: 'June 25th',
      pt: '25 de Junho'
    },
    businessCount: 12,
    category: 'heritage',
    significance: {
      en: 'Celebrates Mozambican independence and the fusion of African, Lusophone, and Arab cultural influences',
      pt: 'Celebra a independência moçambicana e a fusão de influências culturais africanas, portuguesas e árabes'
    },
    traditionalElements: ['Traditional Music', 'Artwork Exhibitions', 'Cultural Cuisine', 'Heritage Stories'],
    modernCelebration: {
      en: 'Mozambican-owned businesses showcase traditional arts, crafts, and fusion cuisine representing cultural diversity',
      pt: 'Negócios de proprietários moçambicanos mostram artes tradicionais, artesanato e culinária de fusão representando diversidade cultural'
    }
  },
  {
    id: 'carnival-lusophone',
    name: {
      en: 'Carnival Traditions',
      pt: 'Tradições de Carnaval'
    },
    description: {
      en: 'Vibrant carnival celebrations from Rio\'s samba to Lusophone and Cape Verdean traditions',
      pt: 'Vibrantes celebrações de carnaval desde o samba do Rio até tradições portuguesas e cabo-verdianas'
    },
    icon: '🎭',
    flagEmoji: '🎊',
    countries: ['Brazil', 'Portugal', 'Cape Verde'],
    period: {
      en: 'February - March',
      pt: 'Fevereiro - Março'
    },
    businessCount: 31,
    category: 'festival',
    significance: {
      en: 'Celebrates the joy and creativity of carnival across different Portuguese-speaking cultures',
      pt: 'Celebra a alegria e criatividade do carnaval nas diferentes culturas de língua portuguesa'
    },
    traditionalElements: ['Costume Parades', 'Samba Dancing', 'Live Music', 'Street Celebrations'],
    modernCelebration: {
      en: 'London hosts Brazilian-style parades, Portuguese carnival events, and Cape Verdean music celebrations',
      pt: 'Londres organiza desfiles estilo brasileiro, eventos de carnaval portugueses e celebrações musicais cabo-verdianas'
    }
  },
  {
    id: 'harvest-abundance',
    name: {
      en: 'Harvest & Abundance Festivals',
      pt: 'Festivais de Colheita e Abundância'
    },
    description: {
      en: 'Autumn celebrations of harvest across Portuguese wine regions and Brazilian agricultural traditions',
      pt: 'Celebrações outono da colheita nas regiões vinícolas portuguesas e tradições agrícolas brasileiras'
    },
    icon: '🍇',
    flagEmoji: '🌾',
    countries: ['Portugal', 'Brazil'],
    period: {
      en: 'September - October',
      pt: 'Setembro - Outubro'
    },
    businessCount: 24,
    category: 'cultural',
    significance: {
      en: 'Celebrates agricultural heritage, wine making, and the abundance of Lusophone and Brazilian lands',
      pt: 'Celebra a herança agrícola, a produção de vinho e a abundância das terras portuguesas e brasileiras'
    },
    traditionalElements: ['Wine Tastings', 'Traditional Foods', 'Harvest Celebrations', 'Community Feasts'],
    modernCelebration: {
      en: 'Portuguese restaurants and Brazilian establishments offer harvest menus featuring seasonal specialties',
      pt: 'Restaurantes portugueses e estabelecimentos brasileiros oferecem menus de colheita com especialidades sazonais'
    }
  },
  {
    id: 'sao-tome-principe-heritage',
    name: {
      en: 'São Tomé and Príncipe Heritage Day',
      pt: 'Dia do Património de São Tomé e Príncipe'
    },
    description: {
      en: 'Celebrating the unique island culture and chocolate heritage of São Tomé and Príncipe',
      pt: 'Celebrando a cultura única das ilhas e a herança do chocolate de São Tomé e Príncipe'
    },
    icon: '🇸🇹',
    flagEmoji: '🇸🇹',
    countries: ['São Tomé and Príncipe'],
    period: {
      en: 'July 12th',
      pt: '12 de Julho'
    },
    businessCount: 5,
    category: 'heritage',
    significance: {
      en: 'Honors the smallest Portuguese-speaking nation and its unique chocolate and coffee cultural heritage',
      pt: 'Honra a menor nação de língua portuguesa e sua herança cultural única de chocolate e café'
    },
    traditionalElements: ['Chocolate Traditions', 'Island Music', 'Coffee Culture', 'Traditional Crafts'],
    modernCelebration: {
      en: 'Specialty food businesses showcase authentic São Tomé chocolate and coffee in cultural celebrations',
      pt: 'Negócios de comidas especiais mostram chocolate e café autênticos de São Tomé em celebrações culturais'
    }
  },
  {
    id: 'lusophone-film-festival',
    name: {
      en: 'Lusophone Film Festival',
      pt: 'Festival de Cinema Lusófono'
    },
    description: {
      en: 'Annual celebration of cinema from all Portuguese-speaking countries showcasing diverse stories',
      pt: 'Celebração anual do cinema de todos os países de língua portuguesa mostrando histórias diversas'
    },
    icon: '🎬',
    flagEmoji: '🎭',
    countries: ['Portugal', 'Brazil', 'Angola', 'Mozambique', 'Cape Verde', 'Guinea-Bissau', 'São Tomé and Príncipe', 'East Timor'],
    period: {
      en: 'October',
      pt: 'Outubro'
    },
    businessCount: 8,
    category: 'art',
    significance: {
      en: 'Showcases the diversity of Lusophone-language cinema and promotes cultural understanding through film',
      pt: 'Mostra a diversidade do cinema de língua portuguesa e promove compreensão cultural através do filme'
    },
    traditionalElements: ['Film Screenings', 'Director Talks', 'Cultural Discussions', 'Awards Ceremonies'],
    modernCelebration: {
      en: 'Cinemas and cultural venues screen films from across the Portuguese-speaking world with community discussions',
      pt: 'Cinemas e locais culturais exibem filmes de todo o mundo de língua portuguesa com discussões comunitárias'
    }
  }
]

/**
 * Rotating Cultural Wisdom from All Lusophone-Speaking Cultures
 * Celebrates the diverse philosophies and wisdom across the Lusophone world
 */
export const CULTURAL_WISDOM: CulturalWisdom[] = [
  {
    id: 'portuguese-commerce',
    quote: {
      en: 'Commerce unites peoples and cultures',
      pt: 'O comércio une os povos e as culturas'
    },
    origin: {
      en: 'Lusophone Maritime Proverb',
      pt: 'Provérbio Marítimo Português'
    },
    country: 'Portugal',
    flagEmoji: '🇵🇹',
    philosophy: {
      en: 'Reflects Portugal\'s historical role as a maritime trading nation that connected continents through commerce',
      pt: 'Reflete o papel histórico de Portugal como nação comercial marítima que conectou continentes através do comércio'
    }
  },
  {
    id: 'brazilian-prosperity',
    quote: {
      en: 'Good business prospers together',
      pt: 'Negócio bom é negócio que prospera junto'
    },
    origin: {
      en: 'Brazilian Business Philosophy',
      pt: 'Filosofia Empresarial Brasileira'
    },
    country: 'Brazil',
    flagEmoji: '🇧🇷',
    philosophy: {
      en: 'Emphasizes collaborative success and the Brazilian spirit of community in business ventures',
      pt: 'Enfatiza o sucesso colaborativo e o espírito brasileiro de comunidade em empreendimentos empresariais'
    }
  },
  {
    id: 'angolan-ubuntu',
    quote: {
      en: 'I am because we are',
      pt: 'Eu sou porque nós somos'
    },
    origin: {
      en: 'Ubuntu Philosophy (Angolan Business Context)',
      pt: 'Filosofia Ubuntu (Contexto Empresarial Angolano)'
    },
    country: 'Angola',
    flagEmoji: '🇦🇴',
    philosophy: {
      en: 'African ubuntu philosophy applied to business - success comes through community support and mutual empowerment',
      pt: 'Filosofia africana ubuntu aplicada aos negócios - o sucesso vem através do apoio comunitário e empoderamento mútuo'
    }
  },
  {
    id: 'cape-verdean-morabeza',
    quote: {
      en: 'Morabeza: hospitality that welcomes all hearts',
      pt: 'Morabeza: hospitalidade que acolhe todos os corações'
    },
    origin: {
      en: 'Cape Verdean Cultural Value',
      pt: 'Valor Cultural Cabo-verdiano'
    },
    country: 'Cape Verde',
    flagEmoji: '🇨🇻',
    philosophy: {
      en: 'Morabeza represents the Cape Verdean spirit of genuine hospitality and warmth in business and community relations',
      pt: 'Morabeza representa o espírito cabo-verdiano de hospitalidade genuína e calor nas relações empresariais e comunitárias'
    }
  },
  {
    id: 'lusophone-unity',
    quote: {
      en: 'United by language, strong through commerce',
      pt: 'Unidos pela língua, fortes pelo comércio'
    },
    origin: {
      en: 'Lusophone Business Community Motto',
      pt: 'Lema da Comunidade Empresarial Lusófona'
    },
    country: 'Global Lusophone Community',
    flagEmoji: '🌍',
    philosophy: {
      en: 'Celebrates how the Portuguese language creates business opportunities across continents and cultures',
      pt: 'Celebra como a língua portuguesa cria oportunidades empresariais através de continentes e culturas'
    }
  },
  {
    id: 'mozambican-diversity',
    quote: {
      en: 'In diversity we find strength',
      pt: 'Na diversidade encontramos força'
    },
    origin: {
      en: 'Mozambican Cultural Wisdom',
      pt: 'Sabedoria Cultural Moçambicana'
    },
    country: 'Mozambique',
    flagEmoji: '🇲🇿',
    philosophy: {
      en: 'Reflects Mozambique\'s multicultural business environment where different influences create innovative solutions',
      pt: 'Reflete o ambiente empresarial multicultural de Moçambique onde diferentes influências criam soluções inovadoras'
    }
  },
  {
    id: 'sao-tome-sweetness',
    quote: {
      en: 'From small islands, great sweetness flows',
      pt: 'De pequenas ilhas, flui grande doçura'
    },
    origin: {
      en: 'São Tomé Chocolate Heritage',
      pt: 'Património do Chocolate de São Tomé'
    },
    country: 'São Tomé and Príncipe',
    flagEmoji: '🇸🇹',
    philosophy: {
      en: 'Celebrates how small island nations can create products of global excellence and cultural significance',
      pt: 'Celebra como pequenas nações insulares podem criar produtos de excelência global e significado cultural'
    }
  }
]

/**
 * Get celebration by ID
 */
export function getCelebrationById(id: string): LusophoneCelebration | null {
  return LUSOPHONE_CELEBRATIONS.find(celebration => celebration.id === id) || null
}

/**
 * Get celebrations by category
 */
export function getCelebrationsByCategory(category: LusophoneCelebration['category']): LusophoneCelebration[] {
  return LUSOPHONE_CELEBRATIONS.filter(celebration => celebration.category === category)
}

/**
 * Get celebrations by country
 */
export function getCelebrationsByCountry(country: string): LusophoneCelebration[] {
  return LUSOPHONE_CELEBRATIONS.filter(celebration => 
    celebration.countries.some(c => c.toLowerCase().includes(country.toLowerCase()))
  )
}

/**
 * Get celebrations happening in a specific month
 */
export function getCelebrationsByMonth(month: string): LusophoneCelebration[] {
  return LUSOPHONE_CELEBRATIONS.filter(celebration => 
    celebration.period.en.toLowerCase().includes(month.toLowerCase()) ||
    celebration.period.pt.toLowerCase().includes(month.toLowerCase())
  )
}

/**
 * Get random cultural wisdom
 */
export function getRandomCulturalWisdom(): CulturalWisdom {
  const randomIndex = Math.floor(Math.random() * CULTURAL_WISDOM.length)
  return CULTURAL_WISDOM[randomIndex]
}

/**
 * Get cultural wisdom by country
 */
export function getCulturalWisdomByCountry(country: string): CulturalWisdom[] {
  return CULTURAL_WISDOM.filter(wisdom => 
    wisdom.country.toLowerCase().includes(country.toLowerCase())
  )
}

/**
 * Calculate total businesses participating in celebrations
 */
export function getTotalCelebrationBusinesses(): number {
  return LUSOPHONE_CELEBRATIONS.reduce((total, celebration) => total + celebration.businessCount, 0)
}

/**
 * Get featured celebrations for display (rotating selection)
 */
export function getFeaturedCelebrations(limit: number = 6): LusophoneCelebration[] {
  // This could be enhanced with seasonal logic or rotation algorithm
  return LUSOPHONE_CELEBRATIONS.slice(0, limit)
}