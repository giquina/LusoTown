/**
 * Business Directory Categories Configuration
 * 
 * Comprehensive business categories for Portuguese-speaking community
 * across the United Kingdom with bilingual support and cultural context
 */

export interface BusinessCategory {
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
  emoji: string
  color: string
  subcategories: BusinessSubcategory[]
  searchKeywords: {
    en: string[]
    pt: string[]
  }
  priority: number
  isPopular: boolean
}

export interface BusinessSubcategory {
  id: string
  name: {
    en: string
    pt: string
  }
  keywords: string[]
}

/**
 * Portuguese Business Categories across the UK
 */
export const PORTUGUESE_BUSINESS_CATEGORIES: BusinessCategory[] = [
  {
    id: 'restaurants',
    name: {
      en: 'Restaurants & Food',
      pt: 'Restaurantes e Comida'
    },
    description: {
      en: 'Authentic Portuguese-speaking community restaurants serving traditional cuisine from all lusophone countries',
      pt: 'Restaurantes autênticos da comunidade lusófona servindo culinária tradicional de todos os países lusófonos'
    },
    icon: 'utensils',
    emoji: '🍽️',
    color: '#E53E3E',
    subcategories: [
      {
        id: 'portuguese_restaurants',
        name: { en: 'Portuguese Restaurants', pt: 'Restaurantes Portugueses' },
        keywords: ['bacalhau', 'francesinha', 'pastéis de nata', 'fado restaurant']
      },
      {
        id: 'brazilian_restaurants',
        name: { en: 'Brazilian Restaurants', pt: 'Restaurantes Brasileiros' },
        keywords: ['churrascaria', 'feijoada', 'açaí', 'caipirinha', 'pão de açúcar']
      },
      {
        id: 'palop_restaurants',
        name: { en: 'PALOP Restaurants', pt: 'Restaurantes PALOP' },
        keywords: ['angola', 'cape verde', 'mozambique', 'muamba', 'cachupa']
      },
      {
        id: 'fine_dining',
        name: { en: 'Fine Dining', pt: 'Gastronomia Requintada' },
        keywords: ['michelin', 'gourmet', 'wine pairing', 'tasting menu']
      }
    ],
    searchKeywords: {
      en: ['restaurant', 'food', 'dining', 'portuguese food', 'brazilian food', 'bacalhau', 'pastéis'],
      pt: ['restaurante', 'comida', 'jantar', 'culinária', 'gastronomia', 'prato típico']
    },
    priority: 1,
    isPopular: true
  },
  
  {
    id: 'cafes_bakeries',
    name: {
      en: 'Cafés & Bakeries',
      pt: 'Cafés e Pastelarias'
    },
    description: {
      en: 'Traditional Portuguese cafés and bakeries serving authentic pastries, coffee, and baked goods',
      pt: 'Cafés e pastelarias tradicionais portugueses servindo doces autênticos, café e produtos de padaria'
    },
    icon: 'coffee',
    emoji: '☕',
    color: '#8B4513',
    subcategories: [
      {
        id: 'pastelarias',
        name: { en: 'Portuguese Bakeries', pt: 'Pastelarias' },
        keywords: ['pastéis de nata', 'bolo de arroz', 'queijadas', 'broa']
      },
      {
        id: 'coffee_shops',
        name: { en: 'Coffee Shops', pt: 'Cafés' },
        keywords: ['espresso', 'galão', 'café com leite', 'portuguese coffee']
      },
      {
        id: 'specialty_bakeries',
        name: { en: 'Specialty Bakeries', pt: 'Padarias Especializadas' },
        keywords: ['artisan bread', 'sourdough', 'traditional recipes']
      }
    ],
    searchKeywords: {
      en: ['café', 'bakery', 'pastry', 'coffee', 'pastéis de nata', 'portuguese pastry'],
      pt: ['café', 'pastelaria', 'padaria', 'doces', 'bolos', 'pastéis']
    },
    priority: 2,
    isPopular: true
  },

  {
    id: 'grocery_retail',
    name: {
      en: 'Grocery & Retail',
      pt: 'Mercearias e Varejo'
    },
    description: {
      en: 'Portuguese delicatessens, grocery stores, and specialty retail shops across the UK',
      pt: 'Delicatessens portuguesas, mercearias e lojas especializadas em todo o Reino Unido'
    },
    icon: 'shopping-cart',
    emoji: '🛒',
    color: '#38A169',
    subcategories: [
      {
        id: 'portuguese_delicatessen',
        name: { en: 'Portuguese Delicatessen', pt: 'Delicatessen Portuguesa' },
        keywords: ['chouriço', 'queijo', 'vinho', 'conservas', 'azeite']
      },
      {
        id: 'brazilian_markets',
        name: { en: 'Brazilian Markets', pt: 'Mercados Brasileiros' },
        keywords: ['guaraná', 'farofa', 'açaí', 'tapioca', 'brazilian products']
      },
      {
        id: 'specialty_stores',
        name: { en: 'Specialty Stores', pt: 'Lojas Especializadas' },
        keywords: ['portuguese wine', 'imported goods', 'traditional products']
      }
    ],
    searchKeywords: {
      en: ['grocery', 'delicatessen', 'portuguese food', 'imported', 'specialty'],
      pt: ['mercearia', 'delicatessen', 'produtos portugueses', 'importados']
    },
    priority: 3,
    isPopular: true
  },

  {
    id: 'professional_services',
    name: {
      en: 'Professional Services',
      pt: 'Serviços Profissionais'
    },
    description: {
      en: 'Legal, financial, consulting, and other professional services by Portuguese-speaking business owners',
      pt: 'Serviços jurídicos, financeiros, consultoria e outros serviços profissionais de proprietários lusófonos'
    },
    icon: 'briefcase',
    emoji: '💼',
    color: '#2D3748',
    subcategories: [
      {
        id: 'legal_services',
        name: { en: 'Legal Services', pt: 'Serviços Jurídicos' },
        keywords: ['immigration lawyer', 'solicitor', 'visa', 'portuguese lawyer']
      },
      {
        id: 'financial_services',
        name: { en: 'Financial Services', pt: 'Serviços Financeiros' },
        keywords: ['accountant', 'tax', 'investment', 'mortgage', 'portuguese accountant']
      },
      {
        id: 'consulting',
        name: { en: 'Consulting', pt: 'Consultoria' },
        keywords: ['business consultant', 'management', 'strategy', 'portuguese consultant']
      },
      {
        id: 'translation',
        name: { en: 'Translation Services', pt: 'Serviços de Tradução' },
        keywords: ['portuguese translator', 'certified translation', 'interpretation']
      }
    ],
    searchKeywords: {
      en: ['lawyer', 'accountant', 'consultant', 'professional', 'portuguese speaking'],
      pt: ['advogado', 'contabilista', 'consultor', 'profissional', 'lusófono']
    },
    priority: 4,
    isPopular: true
  },

  {
    id: 'beauty_wellness',
    name: {
      en: 'Beauty & Wellness',
      pt: 'Beleza e Bem-estar'
    },
    description: {
      en: 'Beauty salons, wellness centers, and health services offering authentic treatments from Portuguese-speaking countries',
      pt: 'Salões de beleza, centros de bem-estar e serviços de saúde oferecendo tratamentos autênticos de países lusófonos'
    },
    icon: 'heart',
    emoji: '💄',
    color: '#E53E3E',
    subcategories: [
      {
        id: 'hair_salons',
        name: { en: 'Hair Salons', pt: 'Salões de Cabeleireiro' },
        keywords: ['brazilian blowout', 'keratin', 'hair styling', 'portuguese hairdresser']
      },
      {
        id: 'beauty_salons',
        name: { en: 'Beauty Salons', pt: 'Salões de Beleza' },
        keywords: ['brazilian wax', 'manicure', 'facial', 'portuguese beauty']
      },
      {
        id: 'wellness_centers',
        name: { en: 'Wellness Centers', pt: 'Centros de Bem-estar' },
        keywords: ['massage', 'spa', 'wellness', 'holistic', 'portuguese wellness']
      }
    ],
    searchKeywords: {
      en: ['beauty', 'hair', 'salon', 'wellness', 'brazilian', 'portuguese'],
      pt: ['beleza', 'cabelo', 'salão', 'bem-estar', 'estética']
    },
    priority: 5,
    isPopular: true
  },

  {
    id: 'healthcare',
    name: {
      en: 'Healthcare',
      pt: 'Cuidados de Saúde'
    },
    description: {
      en: 'Healthcare professionals and medical services provided by Portuguese-speaking practitioners',
      pt: 'Profissionais de saúde e serviços médicos fornecidos por profissionais lusófonos'
    },
    icon: 'plus-circle',
    emoji: '🏥',
    color: '#38A169',
    subcategories: [
      {
        id: 'doctors',
        name: { en: 'Doctors', pt: 'Médicos' },
        keywords: ['portuguese doctor', 'GP', 'family doctor', 'medical']
      },
      {
        id: 'dentists',
        name: { en: 'Dentists', pt: 'Dentistas' },
        keywords: ['portuguese dentist', 'dental', 'orthodontics']
      },
      {
        id: 'specialists',
        name: { en: 'Medical Specialists', pt: 'Especialistas Médicos' },
        keywords: ['physiotherapy', 'psychology', 'nutrition', 'specialist']
      }
    ],
    searchKeywords: {
      en: ['doctor', 'medical', 'health', 'dentist', 'portuguese speaking'],
      pt: ['médico', 'saúde', 'dentista', 'clínica', 'lusófono']
    },
    priority: 6,
    isPopular: false
  },

  {
    id: 'cultural_services',
    name: {
      en: 'Cultural Services',
      pt: 'Serviços Culturais'
    },
    description: {
      en: 'Dance studios, music schools, cultural centers, and art services preserving Portuguese-speaking heritage',
      pt: 'Estúdios de dança, escolas de música, centros culturais e serviços artísticos preservando a herança lusófona'
    },
    icon: 'music',
    emoji: '🎭',
    color: '#9932CC',
    subcategories: [
      {
        id: 'dance_studios',
        name: { en: 'Dance Studios', pt: 'Escolas de Dança' },
        keywords: ['kizomba', 'samba', 'forró', 'portuguese dance', 'brazilian dance']
      },
      {
        id: 'music_schools',
        name: { en: 'Music Schools', pt: 'Escolas de Música' },
        keywords: ['fado', 'guitar', 'portuguese music', 'singing lessons']
      },
      {
        id: 'cultural_centers',
        name: { en: 'Cultural Centers', pt: 'Centros Culturais' },
        keywords: ['cultural events', 'portuguese culture', 'community center']
      },
      {
        id: 'art_services',
        name: { en: 'Art Services', pt: 'Serviços Artísticos' },
        keywords: ['photography', 'art classes', 'portuguese art']
      }
    ],
    searchKeywords: {
      en: ['culture', 'dance', 'music', 'art', 'portuguese culture', 'fado'],
      pt: ['cultura', 'dança', 'música', 'arte', 'fado', 'cultural']
    },
    priority: 7,
    isPopular: true
  },

  {
    id: 'education',
    name: {
      en: 'Education',
      pt: 'Educação'
    },
    description: {
      en: 'Portuguese language schools, tutoring services, and educational institutions across the UK',
      pt: 'Escolas de português, serviços de tutoria e instituições educacionais em todo o Reino Unido'
    },
    icon: 'book-open',
    emoji: '📚',
    color: '#3182CE',
    subcategories: [
      {
        id: 'language_schools',
        name: { en: 'Language Schools', pt: 'Escolas de Idiomas' },
        keywords: ['portuguese lessons', 'language classes', 'portuguese school']
      },
      {
        id: 'tutoring',
        name: { en: 'Tutoring Services', pt: 'Serviços de Tutoria' },
        keywords: ['private tutor', 'portuguese tutor', 'exam preparation']
      },
      {
        id: 'childcare',
        name: { en: 'Childcare', pt: 'Cuidados Infantis' },
        keywords: ['nursery', 'portuguese nursery', 'bilingual education']
      }
    ],
    searchKeywords: {
      en: ['education', 'school', 'portuguese lessons', 'tutor', 'language'],
      pt: ['educação', 'escola', 'aulas português', 'professor', 'ensino']
    },
    priority: 8,
    isPopular: false
  },

  {
    id: 'real_estate',
    name: {
      en: 'Real Estate',
      pt: 'Imobiliário'
    },
    description: {
      en: 'Portuguese-speaking real estate agents and property services across the United Kingdom',
      pt: 'Agentes imobiliários lusófonos e serviços de propriedade em todo o Reino Unido'
    },
    icon: 'home',
    emoji: '🏠',
    color: '#D69E2E',
    subcategories: [
      {
        id: 'estate_agents',
        name: { en: 'Estate Agents', pt: 'Agentes Imobiliários' },
        keywords: ['portuguese estate agent', 'property', 'buy', 'sell', 'rent']
      },
      {
        id: 'property_management',
        name: { en: 'Property Management', pt: 'Gestão de Propriedades' },
        keywords: ['property management', 'landlord services', 'lettings']
      },
      {
        id: 'mortgage_services',
        name: { en: 'Mortgage Services', pt: 'Serviços Hipotecários' },
        keywords: ['mortgage broker', 'home loan', 'property finance']
      }
    ],
    searchKeywords: {
      en: ['real estate', 'property', 'house', 'mortgage', 'portuguese agent'],
      pt: ['imobiliário', 'propriedade', 'casa', 'hipoteca', 'agente']
    },
    priority: 9,
    isPopular: false
  },

  {
    id: 'automotive',
    name: {
      en: 'Automotive',
      pt: 'Automóvel'
    },
    description: {
      en: 'Car services, mechanics, and automotive businesses owned by Portuguese-speaking entrepreneurs',
      pt: 'Serviços automóveis, mecânicos e negócios automóveis de proprietários lusófonos'
    },
    icon: 'car',
    emoji: '🚗',
    color: '#4A5568',
    subcategories: [
      {
        id: 'mechanics',
        name: { en: 'Mechanics', pt: 'Mecânicos' },
        keywords: ['car repair', 'mechanic', 'portuguese mechanic', 'garage']
      },
      {
        id: 'car_sales',
        name: { en: 'Car Sales', pt: 'Venda de Carros' },
        keywords: ['car dealer', 'used cars', 'portuguese car dealer']
      },
      {
        id: 'driving_schools',
        name: { en: 'Driving Schools', pt: 'Escolas de Condução' },
        keywords: ['driving lessons', 'portuguese instructor', 'driving school']
      }
    ],
    searchKeywords: {
      en: ['car', 'mechanic', 'automotive', 'driving', 'portuguese mechanic'],
      pt: ['carro', 'mecânico', 'automóvel', 'condução', 'oficina']
    },
    priority: 10,
    isPopular: false
  },

  {
    id: 'home_services',
    name: {
      en: 'Home Services',
      pt: 'Serviços Domésticos'
    },
    description: {
      en: 'Home improvement, cleaning, and domestic services provided by Portuguese-speaking professionals',
      pt: 'Melhoramento doméstico, limpeza e serviços domésticos fornecidos por profissionais lusófonos'
    },
    icon: 'tool',
    emoji: '🔧',
    color: '#718096',
    subcategories: [
      {
        id: 'cleaning_services',
        name: { en: 'Cleaning Services', pt: 'Serviços de Limpeza' },
        keywords: ['cleaning', 'house cleaning', 'portuguese cleaner']
      },
      {
        id: 'handyman',
        name: { en: 'Handyman Services', pt: 'Serviços de Faz-tudo' },
        keywords: ['handyman', 'repairs', 'maintenance', 'portuguese handyman']
      },
      {
        id: 'gardening',
        name: { en: 'Gardening', pt: 'Jardinagem' },
        keywords: ['gardener', 'landscaping', 'garden maintenance']
      }
    ],
    searchKeywords: {
      en: ['home', 'cleaning', 'handyman', 'gardening', 'portuguese services'],
      pt: ['casa', 'limpeza', 'faz-tudo', 'jardinagem', 'serviços']
    },
    priority: 11,
    isPopular: false
  },

  {
    id: 'technology',
    name: {
      en: 'Technology',
      pt: 'Tecnologia'
    },
    description: {
      en: 'IT services, software development, and technology businesses by Portuguese-speaking entrepreneurs',
      pt: 'Serviços de TI, desenvolvimento de software e negócios tecnológicos de empreendedores lusófonos'
    },
    icon: 'laptop',
    emoji: '💻',
    color: '#4299E1',
    subcategories: [
      {
        id: 'it_services',
        name: { en: 'IT Services', pt: 'Serviços de TI' },
        keywords: ['IT support', 'computer repair', 'portuguese IT']
      },
      {
        id: 'web_development',
        name: { en: 'Web Development', pt: 'Desenvolvimento Web' },
        keywords: ['web design', 'website', 'portuguese developer']
      },
      {
        id: 'software',
        name: { en: 'Software Development', pt: 'Desenvolvimento Software' },
        keywords: ['app development', 'software', 'programming']
      }
    ],
    searchKeywords: {
      en: ['technology', 'IT', 'computer', 'web', 'portuguese tech'],
      pt: ['tecnologia', 'TI', 'computador', 'web', 'programação']
    },
    priority: 12,
    isPopular: false
  }
]

/**
 * Get business category by ID
 */
export function getBusinessCategoryById(categoryId: string): BusinessCategory | undefined {
  return PORTUGUESE_BUSINESS_CATEGORIES.find(cat => cat.id === categoryId)
}

/**
 * Get popular business categories
 */
export function getPopularBusinessCategories(): BusinessCategory[] {
  return PORTUGUESE_BUSINESS_CATEGORIES.filter(cat => cat.isPopular)
    .sort((a, b) => a.priority - b.priority)
}

/**
 * Get all business categories sorted by priority
 */
export function getAllBusinessCategories(): BusinessCategory[] {
  return PORTUGUESE_BUSINESS_CATEGORIES.sort((a, b) => a.priority - b.priority)
}

/**
 * Search business categories
 */
export function searchBusinessCategories(query: string, language: 'en' | 'pt' = 'en'): BusinessCategory[] {
  const lowerQuery = query.toLowerCase()
  
  return PORTUGUESE_BUSINESS_CATEGORIES.filter(category => {
    // Check category name
    if (category.name[language].toLowerCase().includes(lowerQuery)) {
      return true
    }
    
    // Check description
    if (category.description[language].toLowerCase().includes(lowerQuery)) {
      return true
    }
    
    // Check search keywords
    if (category.searchKeywords[language].some(keyword => 
      keyword.toLowerCase().includes(lowerQuery))) {
      return true
    }
    
    // Check subcategory names
    if (category.subcategories.some(sub => 
      sub.name[language].toLowerCase().includes(lowerQuery))) {
      return true
    }
    
    return false
  }).sort((a, b) => a.priority - b.priority)
}

/**
 * Get business category statistics
 */
export function getBusinessCategoryStats() {
  return {
    totalCategories: PORTUGUESE_BUSINESS_CATEGORIES.length,
    popularCategories: getPopularBusinessCategories().length,
    totalSubcategories: PORTUGUESE_BUSINESS_CATEGORIES.reduce(
      (sum, cat) => sum + cat.subcategories.length, 0
    ),
    categoryColors: PORTUGUESE_BUSINESS_CATEGORIES.map(cat => ({
      id: cat.id,
      color: cat.color,
      name: cat.name
    }))
  }
}