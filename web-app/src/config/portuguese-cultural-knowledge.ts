/**
 * Portuguese Cultural Knowledge Configuration
 * Essential cultural data for the Portuguese-speaking community platform
 */

export interface CulturalKnowledgeItem {
  id: string
  category: string
  question: string
  answer: string
  heritage?: string
  keywords: string[]
}

export const PORTUGUESE_CULTURAL_KNOWLEDGE: CulturalKnowledgeItem[] = [
  {
    id: 'fado-basics',
    category: 'music',
    question: 'What is Fado?',
    answer: 'Fado is a traditional Portuguese music genre characterized by mournful melodies and lyrics expressing saudade (longing), fate, and the sea.',
    heritage: 'portugal',
    keywords: ['fado', 'music', 'portugal', 'saudade', 'traditional']
  },
  {
    id: 'pasteis-de-nata',
    category: 'food',
    question: 'What are Pastéis de Nata?',
    answer: 'Pastéis de Nata are traditional Portuguese custard tarts with flaky pastry and creamy custard filling, best enjoyed warm.',
    heritage: 'portugal',
    keywords: ['pasteis', 'nata', 'custard', 'tart', 'portuguese', 'food']
  },
  {
    id: 'carnival-brazil',
    category: 'festivals',
    question: 'When is Brazilian Carnival?',
    answer: 'Brazilian Carnival typically occurs in February or March, before Lent, featuring parades, samba, and vibrant celebrations.',
    heritage: 'brazil',
    keywords: ['carnival', 'brazil', 'samba', 'festival', 'celebration']
  },
  {
    id: 'cape-verde-morna',
    category: 'music',
    question: 'What is Morna music?',
    answer: 'Morna is a traditional Cape Verdean music genre, similar to the blues, expressing themes of love, departure, and nostalgia.',
    heritage: 'cape-verde',
    keywords: ['morna', 'cape verde', 'music', 'traditional', 'nostalgia']
  }
]

export const CULTURAL_CATEGORIES = [
  'music',
  'food',
  'festivals',
  'history',
  'traditions',
  'language',
  'arts',
  'sports'
] as const

export type CulturalCategory = typeof CULTURAL_CATEGORIES[number]

export const HERITAGE_COUNTRIES = [
  'portugal',
  'brazil',
  'cape-verde',
  'angola',
  'mozambique',
  'guinea-bissau',
  'sao-tome-principe',
  'east-timor'
] as const

export type HeritageCountry = typeof HERITAGE_COUNTRIES[number]

export const getCulturalKnowledgeByCategory = (category: CulturalCategory) => {
  return PORTUGUESE_CULTURAL_KNOWLEDGE.filter(item => item.category === category)
}

export const getCulturalKnowledgeByHeritage = (heritage: HeritageCountry) => {
  return PORTUGUESE_CULTURAL_KNOWLEDGE.filter(item => item.heritage === heritage)
}

export const searchCulturalKnowledge = (query: string) => {
  const lowercaseQuery = query.toLowerCase()
  return PORTUGUESE_CULTURAL_KNOWLEDGE.filter(item => 
    item.keywords.some(keyword => keyword.includes(lowercaseQuery)) ||
    item.question.toLowerCase().includes(lowercaseQuery) ||
    item.answer.toLowerCase().includes(lowercaseQuery)
  )
}