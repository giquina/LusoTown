// Cultural Preferences and Matching Types
// Supports the Lusophone cultural preference quiz and matching system

export interface CulturalPreferences {
  id: string
  userId: string
  origins: PortugueseOrigin[]
  languagePreference: LanguagePreference
  culturalCelebrations: CulturalElement[]
  professionalGoals: ProfessionalGoal[]
  culturalValues: CulturalValues
  lifestylePreferences: LifestyleType[]
  compatibilityScore: number
  culturalDepthScore: number
  communityEngagementScore: number
  completedAt: Date
  lastUpdated: Date
  quizVersion: string
}

export type PortugueseOrigin = 
  | 'portugal'        // Portugal Continental
  | 'azores'          // Açores
  | 'madeira'         // Madeira
  | 'brazil'          // Brasil
  | 'angola'          // Angola
  | 'mozambique'      // Moçambique
  | 'cape_verde'      // Cabo Verde
  | 'guinea_bissau'   // Guiné-Bissau
  | 'sao_tome'        // São Tomé e Príncipe
  | 'timor_leste'     // Timor-Leste
  | 'macau'           // Macau
  | 'diaspora'        // Diáspora Portuguesa

export type LanguagePreference = 
  | 'portuguese_first'      // Português primeiro, inglês quando necessário
  | 'bilingual'            // Igualmente confortável em ambos os idiomas
  | 'english_comfortable'  // Confortável em inglês, português para conexão cultural
  | 'learning'             // A aprender português, abraçando a cultura

export type CulturalElement = 
  | 'fado'                  // Música de Fado
  | 'santos_populares'      // Santos Populares
  | 'football'              // Futebol Português
  | 'gastronomy'           // Gastronomia Portuguesa
  | 'christmas_traditions' // Natal Português (24 de Dezembro)
  | 'literature_poetry'    // Literatura e Poesia Portuguesa
  | 'religious_traditions' // Tradições Religiosas e Romarias
  | 'maritime_heritage'    // Património Marítimo e Descobrimentos
  | 'folk_traditions'      // Música Folclórica e Danças Regionais
  | 'crafts_arts'          // Artesanato e Artes Tradicionais

export type ProfessionalGoal = 
  | 'business_partnerships'  // Parcerias Empresariais e Colaborações
  | 'career_mentorship'      // Mentoria e Orientação de Carreira
  | 'industry_connections'   // Conexões Específicas do Setor
  | 'startup_ecosystem'      // Ecossistema de Startups Português
  | 'freelance_opportunities' // Oportunidades Freelance e Projetos
  | 'portugal_uk_bridge'     // Ponte Empresarial Portugal-Reino Unido
  | 'social_only'           // Puramente Social - Sem Objetivos Profissionais

export type CulturalValueKey = 
  | 'family_first'           // Família em primeiro lugar
  | 'hospitality'           // Hospitalidade e Carinho
  | 'respect_elders'        // Respeito pelos Mais Velhos e Tradição
  | 'community_support'     // Apoio Comunitário e Solidariedade
  | 'work_life_balance'     // Equilíbrio Trabalho-Vida
  | 'education_achievement' // Educação e Conquistas
  | 'cultural_preservation' // Preservar a Cultura Portuguesa

export interface CulturalValues {
  [key: string]: number // 1-5 rating for each cultural value
}

export type LifestyleType = 
  | 'young_professional'    // Jovem Profissional
  | 'family_oriented'       // Orientado para a Família
  | 'student_life'         // Vida de Estudante
  | 'entrepreneur'         // Empreendedor/Dono de Negócio
  | 'recent_arrival'       // Chegada Recente ao Reino Unido
  | 'established_resident' // Residente Estabelecido no Reino Unido
  | 'cultural_enthusiast'  // Entusiasta Cultural
  | 'social_butterfly'     // Borboleta Social

export interface CulturalCompatibility {
  id: string
  userAId: string
  userBId: string
  originCompatibility: number
  languageCompatibility: number
  culturalCompatibility: number
  professionalCompatibility: number
  valuesCompatibility: number
  lifestyleCompatibility: number
  overallCompatibility: number
  compatibilityInsights: string[]
  sharedElements: string[]
  calculatedAt: Date
  lastUpdated: Date
}

export interface CulturalInsight {
  id: string
  insightKey: string
  insightNameEn: string
  insightNamePt: string
  insightDescriptionEn?: string
  insightDescriptionPt?: string
  category: 'origin' | 'language' | 'culture' | 'professional' | 'values' | 'lifestyle'
  weight: number
  isActive: boolean
  createdAt: Date
}

export interface PortugueseCulturalElement {
  id: string
  elementKey: string
  elementNameEn: string
  elementNamePt: string
  elementDescriptionEn?: string
  elementDescriptionPt?: string
  category: 'celebration' | 'tradition' | 'art' | 'music' | 'food' | 'religion' | 'history' | 'literature'
  popularityScore: number
  regionalOrigin: PortugueseOrigin[]
  emoji?: string
  isActive: boolean
  createdAt: Date
}

export interface QuizQuestion {
  id: string
  type: 'single' | 'multiple' | 'scale' | 'text'
  category: 'origin' | 'language' | 'culture' | 'professional' | 'values' | 'lifestyle'
  title: string
  titlePortuguese: string
  subtitle?: string
  subtitlePortuguese?: string
  icon: any
  color: string
  options?: QuizOption[]
  scaleMin?: number
  scaleMax?: number
  scaleLabels?: { value: number; label: string; labelPortuguese: string }[]
  required?: boolean
}

export interface QuizOption {
  value: string
  label: string
  labelPortuguese: string
  description?: string
  descriptionPortuguese?: string
  icon?: any
  emoji?: string
}

export interface QuizResults {
  origin: string[]
  languagePreference: string
  culturalCelebrations: string[]
  professionalGoals: string[]
  culturalValues: string[]
  lifestyle: string[]
  compatibilityScore?: number
  matchingInsights?: string[]
}

export interface MatchProfile {
  id: string
  userId: string
  name: string
  age: number
  location: string
  photo?: string
  bio: string
  compatibility: number
  sharedElements: string[]
  interests: string[]
  culturalPreferences: CulturalPreferences
  lastActive: Date
}

export interface CulturalMatchingConfig {
  originWeight: number
  languageWeight: number
  culturalWeight: number
  professionalWeight: number
  valuesWeight: number
  lifestyleWeight: number
  minCompatibilityScore: number
  maxMatches: number
}

// Default configuration for cultural matching
export const DEFAULT_MATCHING_CONFIG: CulturalMatchingConfig = {
  originWeight: 0.20,
  languageWeight: 0.15,
  culturalWeight: 0.25,
  professionalWeight: 0.15,
  valuesWeight: 0.15,
  lifestyleWeight: 0.10,
  minCompatibilityScore: 60,
  maxMatches: 50
}

// Lusophone origin display names
export const PORTUGUESE_ORIGIN_NAMES = {
  en: {
    portugal: 'Portugal (Continental)',
    azores: 'Azores',
    madeira: 'Madeira',
    brazil: 'Brazil',
    angola: 'Angola',
    mozambique: 'Mozambique',
    cape_verde: 'Cape Verde',
    guinea_bissau: 'Guinea-Bissau',
    sao_tome: 'São Tomé and Príncipe',
    timor_leste: 'Timor-Leste',
    macau: 'Macau',
    diaspora: 'Lusophone Diaspora'
  },
  pt: {
    portugal: 'Portugal (Continental)',
    azores: 'Açores',
    madeira: 'Madeira',
    brazil: 'Brasil',
    angola: 'Angola',
    mozambique: 'Moçambique',
    cape_verde: 'Cabo Verde',
    guinea_bissau: 'Guiné-Bissau',
    sao_tome: 'São Tomé e Príncipe',
    timor_leste: 'Timor-Leste',
    macau: 'Macau',
    diaspora: 'Diáspora Portuguesa'
  }
} as const

// Cultural element display names
export const CULTURAL_ELEMENT_NAMES = {
  en: {
    fado: 'Fado Music',
    santos_populares: 'Santos Populares (June Festivals)',
    football: 'Lusophone Football',
    gastronomy: 'Lusophone Cuisine',
    christmas_traditions: 'Lusophone Christmas (December 24th)',
    literature_poetry: 'Lusophone Literature & Poetry',
    religious_traditions: 'Religious Traditions & Pilgrimages',
    maritime_heritage: 'Maritime Heritage & Discoveries',
    folk_traditions: 'Folk Music & Regional Dances',
    crafts_arts: 'Traditional Crafts & Arts'
  },
  pt: {
    fado: 'Música de Fado',
    santos_populares: 'Santos Populares',
    football: 'Futebol Português',
    gastronomy: 'Gastronomia Portuguesa',
    christmas_traditions: 'Natal Português (24 de Dezembro)',
    literature_poetry: 'Literatura e Poesia Portuguesa',
    religious_traditions: 'Tradições Religiosas e Romarias',
    maritime_heritage: 'Património Marítimo e Descobrimentos',
    folk_traditions: 'Música Folclórica e Danças Regionais',
    crafts_arts: 'Artesanato e Artes Tradicionais'
  }
} as const

// Utility functions
export function calculateOverallCompatibility(scores: {
  origin: number
  language: number
  cultural: number
  professional: number
  values: number
  lifestyle: number
}, config: CulturalMatchingConfig = DEFAULT_MATCHING_CONFIG): number {
  return Math.round(
    scores.origin * config.originWeight +
    scores.language * config.languageWeight +
    scores.cultural * config.culturalWeight +
    scores.professional * config.professionalWeight +
    scores.values * config.valuesWeight +
    scores.lifestyle * config.lifestyleWeight
  )
}

export function getCompatibilityLevel(score: number): {
  level: 'excellent' | 'very_good' | 'good' | 'fair' | 'low'
  levelPt: 'excelente' | 'muito_bom' | 'bom' | 'razoável' | 'baixo'
  color: string
} {
  if (score >= 90) return { level: 'excellent', levelPt: 'excelente', color: 'green' }
  if (score >= 80) return { level: 'very_good', levelPt: 'muito_bom', color: 'lime' }
  if (score >= 70) return { level: 'good', levelPt: 'bom', color: 'yellow' }
  if (score >= 60) return { level: 'fair', levelPt: 'razoável', color: 'orange' }
  return { level: 'low', levelPt: 'baixo', color: 'red' }
}