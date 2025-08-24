/**
 * Portuguese-speaking Community Verification Badges Configuration
 * Cultural verification system for authentic community representation
 * Environment-configurable for proper cultural validation
 */

export interface VerificationBadge {
  id: string
  name: string
  namePortuguese: string
  type: 'business' | 'cultural' | 'personal' | 'achievement' | 'heritage'
  
  // Visual elements
  icon: string
  emoji: string
  color: string
  backgroundColor: string
  
  // Description and criteria
  description: string
  descriptionPortuguese: string
  criteria: string
  criteriaPortuguese: string
  
  // Verification process
  verificationMethod: string
  verificationMethodPortuguese: string
  documentsRequired: string[]
  verificationTime: string
  
  // Cultural significance
  culturalImportance: string
  culturalImportancePortuguese: string
  communityBenefit: string
  communityBenefitPortuguese: string
  
  // Trust and authenticity
  trustLevel: number // 1-10 scale
  popularityScore: number
  communityRespect: number
  
  // Eligibility
  eligibleCountries: string[]
  minimumAge?: number
  prerequisites: string[]
  
  // Visual examples
  sampleProfiles: string[]
  
  // Status
  isActive: boolean
  featured: boolean
}

/**
 * Cultural Verification Badges for Portuguese-speaking Community
 */
export const VERIFICATION_BADGES: VerificationBadge[] = [
  
  // BUSINESS VERIFICATION BADGES
  {
    id: 'business-owner-verified',
    name: '🏢 Business Owner Verified',
    namePortuguese: '🏢 Proprietário de Negócio Verificado',
    type: 'business',
    
    icon: 'BuildingOfficeIcon',
    emoji: '🏢',
    color: '#059669', // green-600
    backgroundColor: '#D1FAE5', // green-100
    
    description: 'Verified Portuguese-speaking business owner contributing to London\'s lusophone economy',
    descriptionPortuguese: 'Proprietário de negócio lusófono verificado contribuindo para a economia lusófona de Londres',
    
    criteria: 'Must own or co-own a registered business serving Portuguese-speaking community or leveraging lusophone cultural expertise',
    criteriaPortuguese: 'Deve possuir ou ser co-proprietário de um negócio registado que serve a comunidade lusófona ou aproveita expertise cultural lusófona',
    
    verificationMethod: 'Business registration documents, tax records, and community references required',
    verificationMethodPortuguese: 'Documentos de registo empresarial, registos fiscais e referências comunitárias necessários',
    
    documentsRequired: [
      'Companies House registration',
      'Business license',
      'Recent tax filing',
      'Community testimonials (3)',
      'Portuguese-speaking market focus proof'
    ],
    verificationTime: '5-7 business days',
    
    culturalImportance: 'Celebrates Portuguese-speaking entrepreneurial excellence and economic contribution to United Kingdom',
    culturalImportancePortuguese: 'Celebra a excelência empreendedora lusófona e contribuição económica para o Reino Unido',
    
    communityBenefit: 'Builds trust for business networking, partnerships, and community economic development',
    communityBenefitPortuguese: 'Constrói confiança para networking empresarial, parcerias e desenvolvimento económico comunitário',
    
    trustLevel: 9,
    popularityScore: 95,
    communityRespect: 92,
    
    eligibleCountries: ['Portugal', 'Brazil', 'Angola', 'Cape Verde', 'Mozambique', 'Guinea-Bissau', 'São Tomé and Príncipe', 'East Timor'],
    minimumAge: 18,
    prerequisites: ['Active business registration', 'Portuguese-speaking community focus', 'Good business standing'],
    
    sampleProfiles: ['Carlos Silva - Accounting Services', 'Fátima Burity - Angolan Catering', 'João Santos - Brazilian Coffee Import'],
    
    isActive: true,
    featured: true
  },
  
  {
    id: 'community-ambassador',
    name: '🌟 Community Ambassador',
    namePortuguese: '🌟 Embaixador Comunitário',
    type: 'cultural',
    
    icon: 'StarIcon',
    emoji: '🌟',
    color: '#DC2626', // red-600
    backgroundColor: '#FEE2E2', // red-100
    
    description: 'Recognized leader promoting Portuguese-speaking cultural unity and community building across London',
    descriptionPortuguese: 'Líder reconhecido promovendo unidade cultural lusófona e construção comunitária em Londres',
    
    criteria: 'Must demonstrate significant community leadership, cultural event organization, or community development contributions',
    criteriaPortuguese: 'Deve demonstrar liderança comunitária significativa, organização de eventos culturais ou contribuições para desenvolvimento comunitário',
    
    verificationMethod: 'Community nominations, event organization evidence, and cultural impact assessment',
    verificationMethodPortuguese: 'Nomeações comunitárias, evidência de organização de eventos e avaliação de impacto cultural',
    
    documentsRequired: [
      'Community nomination letters (5+)',
      'Event organization portfolio',
      'Cultural contribution documentation',
      'Community impact testimonials',
      'Media coverage or recognition'
    ],
    verificationTime: '10-14 business days',
    
    culturalImportance: 'Recognizes individuals who preserve and promote Portuguese-speaking cultural heritage in United Kingdom',
    culturalImportancePortuguese: 'Reconhece indivíduos que preservam e promovem herança cultural lusófona no Reino Unido',
    
    communityBenefit: 'Identifies trusted community leaders for cultural guidance, event planning, and community representation',
    communityBenefitPortuguese: 'Identifica líderes comunitários confiáveis para orientação cultural, planeamento de eventos e representação comunitária',
    
    trustLevel: 10,
    popularityScore: 88,
    communityRespect: 96,
    
    eligibleCountries: ['All Portuguese-speaking countries', 'UK-born Portuguese heritage'],
    minimumAge: 25,
    prerequisites: ['Community leadership experience', 'Cultural event involvement', 'Community respect and recognition'],
    
    sampleProfiles: ['Maria Cardoso - Angolan Independence Day Organizer', 'Tiago Moreira - Portuguese Business Podcast', 'Isabella Lima - Brazilian Cultural Education'],
    
    isActive: true,
    featured: true
  },
  
  // PERSONAL CONNECTION BADGES
  {
    id: 'single-culturally-connected',
    name: '💕 Single & Culturally Connected',
    namePortuguese: '💕 Solteiro e Culturalmente Conectado',
    type: 'personal',
    
    icon: 'HeartIcon',
    emoji: '💕',
    color: '#EC4899', // pink-500
    backgroundColor: '#FCE7F3', // pink-100
    
    description: 'Single Portuguese-speaker actively seeking meaningful romantic connections within our cultural community',
    descriptionPortuguese: 'Lusófono solteiro procurando ativamente conexões românticas significativas dentro da nossa comunidade cultural',
    
    criteria: 'Must be single, 21+, and actively participating in Portuguese-speaking cultural events seeking romantic connections',
    criteriaPortuguese: 'Deve ser solteiro, 21+, e participar ativamente em eventos culturais lusófonos procurando conexões românticas',
    
    verificationMethod: 'Profile verification, relationship status confirmation, and community event participation proof',
    verificationMethodPortuguese: 'Verificação de perfil, confirmação de status de relacionamento e prova de participação em eventos comunitários',
    
    documentsRequired: [
      'Photo verification',
      'Age verification',
      'Single status declaration',
      'Cultural event attendance proof',
      'Community member references'
    ],
    verificationTime: '3-5 business days',
    
    culturalImportance: 'Facilitates authentic cultural connections and potential cross-cultural relationships within lusophone community',
    culturalImportancePortuguese: 'Facilita conexões culturais autênticas e potenciais relacionamentos cross-culturais dentro da comunidade lusófona',
    
    communityBenefit: 'Creates trust for romantic networking while maintaining cultural values and community safety',
    communityBenefitPortuguese: 'Cria confiança para networking romântico mantendo valores culturais e segurança comunitária',
    
    trustLevel: 8,
    popularityScore: 82,
    communityRespect: 79,
    
    eligibleCountries: ['All Portuguese-speaking countries', 'UK-born Portuguese heritage'],
    minimumAge: 21,
    prerequisites: ['Single relationship status', 'Cultural event participation', 'Community guidelines agreement'],
    
    sampleProfiles: ['Ana (before meeting Miguel)', 'Teresa (before meeting Paulo)', 'Active Kizomba dancers'],
    
    isActive: true,
    featured: true
  },
  
  {
    id: 'dance-community-member',
    name: '💃 Dance Community Member',
    namePortuguese: '💃 Membro da Comunidade de Dança',
    type: 'cultural',
    
    icon: 'MusicalNoteIcon',
    emoji: '💃',
    color: '#7C3AED', // violet-600
    backgroundColor: '#EDE9FE', // violet-100
    
    description: 'Active participant in Portuguese-speaking dance community - Kizomba, Fado, Semba, or traditional folk dancing',
    descriptionPortuguese: 'Participante ativo na comunidade de dança lusófona - Kizomba, Fado, Semba ou dança folclórica tradicional',
    
    criteria: 'Regular attendance at Portuguese-speaking dance events and demonstrated dance community involvement',
    criteriaPortuguese: 'Participação regular em eventos de dança lusófonos e envolvimento demonstrado na comunidade de dança',
    
    verificationMethod: 'Dance event attendance records, instructor recommendations, or performance documentation',
    verificationMethodPortuguese: 'Registos de participação em eventos de dança, recomendações de instrutores ou documentação de performances',
    
    documentsRequired: [
      'Dance event tickets/photos (3+ events)',
      'Instructor or organizer reference',
      'Dance community participation proof',
      'Cultural dance knowledge demonstration'
    ],
    verificationTime: '2-3 business days',
    
    culturalImportance: 'Preserves and celebrates Portuguese-speaking dance traditions and cultural expressions through movement',
    culturalImportancePortuguese: 'Preserva e celebra tradições de dança lusófonas e expressões culturais através do movimento',
    
    communityBenefit: 'Connects dance enthusiasts for cultural events, social dancing, and traditional dance preservation',
    communityBenefitPortuguese: 'Conecta entusiastas da dança para eventos culturais, dança social e preservação da dança tradicional',
    
    trustLevel: 7,
    popularityScore: 76,
    communityRespect: 81,
    
    eligibleCountries: ['Angola', 'Cape Verde', 'Portugal', 'Brazil', 'All lusophone countries'],
    minimumAge: 16,
    prerequisites: ['Dance event participation', 'Cultural dance interest', 'Community event attendance'],
    
    sampleProfiles: ['Chocolate Kizomba regulars', 'Traditional Portuguese folk dancers', 'Cape Verdean morna dancers'],
    
    isActive: true,
    featured: false
  },
  
  // HERITAGE AND ACHIEVEMENT BADGES
  {
    id: 'portuguese-heritage-verified',
    name: '🇵🇹 Portuguese Heritage Verified',
    namePortuguese: '🇵🇹 Herança Portuguesa Verificada',
    type: 'heritage',
    
    icon: 'FlagIcon',
    emoji: '🇵🇹',
    color: '#DC2626', // red-600
    backgroundColor: '#FEF2F2', // red-50
    
    description: 'Verified connection to Portuguese cultural heritage through birth, family, or deep cultural involvement',
    descriptionPortuguese: 'Conexão verificada com herança cultural portuguesa através de nascimento, família ou envolvimento cultural profundo',
    
    criteria: 'Portuguese birth, Portuguese ancestry, Portuguese citizenship, or demonstrated deep Portuguese cultural involvement',
    criteriaPortuguese: 'Nascimento português, ascendência portuguesa, cidadania portuguesa ou envolvimento cultural português profundo demonstrado',
    
    verificationMethod: 'Documentation of Portuguese connection through official documents or extensive cultural involvement proof',
    verificationMethodPortuguese: 'Documentação de conexão portuguesa através de documentos oficiais ou prova de envolvimento cultural extenso',
    
    documentsRequired: [
      'Portuguese passport/birth certificate OR',
      'Portuguese ancestry documentation OR',
      'Extensive Portuguese cultural involvement proof',
      'Language proficiency demonstration',
      'Cultural knowledge assessment'
    ],
    verificationTime: '3-5 business days',
    
    culturalImportance: 'Validates authentic Portuguese cultural connection for community trust and cultural preservation',
    culturalImportancePortuguese: 'Valida conexão cultural portuguesa autêntica para confiança comunitária e preservação cultural',
    
    communityBenefit: 'Builds trust within Portuguese community and validates cultural authority for traditional practices',
    communityBenefitPortuguese: 'Constrói confiança dentro da comunidade portuguesa e valida autoridade cultural para práticas tradicionais',
    
    trustLevel: 9,
    popularityScore: 91,
    communityRespect: 89,
    
    eligibleCountries: ['Portugal', 'Portuguese diaspora worldwide'],
    prerequisites: ['Portuguese cultural connection', 'Language demonstration', 'Cultural respect'],
    
    sampleProfiles: ['Carlos Silva - Porto', 'Miguel - Porto heritage', 'Portuguese business owners'],
    
    isActive: true,
    featured: true
  },
  
  {
    id: 'brazilian-heritage-verified',
    name: '🇧🇷 Brazilian Heritage Verified',
    namePortuguese: '🇧🇷 Herança Brasileira Verificada',
    type: 'heritage',
    
    icon: 'FlagIcon',
    emoji: '🇧🇷',
    color: '#16A34A', // green-600
    backgroundColor: '#F0FDF4', // green-50
    
    description: 'Verified connection to Brazilian cultural heritage through birth, family, or deep cultural involvement',
    descriptionPortuguese: 'Conexão verificada com herança cultural brasileira através de nascimento, família ou envolvimento cultural profundo',
    
    criteria: 'Brazilian birth, Brazilian ancestry, Brazilian citizenship, or demonstrated deep Brazilian cultural involvement',
    criteriaPortuguese: 'Nascimento brasileiro, ascendência brasileira, cidadania brasileira ou envolvimento cultural brasileiro profundo demonstrado',
    
    verificationMethod: 'Documentation of Brazilian connection through official documents or extensive cultural involvement proof',
    verificationMethodPortuguese: 'Documentação de conexão brasileira através de documentos oficiais ou prova de envolvimento cultural extenso',
    
    documentsRequired: [
      'Brazilian passport/birth certificate OR',
      'Brazilian ancestry documentation OR',
      'Extensive Brazilian cultural involvement proof',
      'Portuguese language proficiency',
      'Brazilian cultural knowledge assessment'
    ],
    verificationTime: '3-5 business days',
    
    culturalImportance: 'Validates authentic Brazilian cultural connection within Portuguese-speaking community',
    culturalImportancePortuguese: 'Valida conexão cultural brasileira autêntica dentro da comunidade lusófona',
    
    communityBenefit: 'Builds trust within Brazilian community and validates cultural authority for Brazilian traditions',
    communityBenefitPortuguese: 'Constrói confiança dentro da comunidade brasileira e valida autoridade cultural para tradições brasileiras',
    
    trustLevel: 9,
    popularityScore: 88,
    communityRespect: 86,
    
    eligibleCountries: ['Brazil', 'Brazilian diaspora worldwide'],
    prerequisites: ['Brazilian cultural connection', 'Portuguese language demonstration', 'Cultural respect'],
    
    sampleProfiles: ['João Santos - São Paulo', 'Ana - Rio de Janeiro', 'Isabella Lima - Belo Horizonte'],
    
    isActive: true,
    featured: true
  },
  
  {
    id: 'angolan-heritage-verified',
    name: '🇦🇴 Angolan Heritage Verified',
    namePortuguese: '🇦🇴 Herança Angolana Verificada',
    type: 'heritage',
    
    icon: 'FlagIcon',
    emoji: '🇦🇴',
    color: '#DC2626', // red-600
    backgroundColor: '#FEF2F2', // red-50
    
    description: 'Verified connection to Angolan cultural heritage and authentic representation of Angolan traditions in United Kingdom',
    descriptionPortuguese: 'Conexão verificada com herança cultural angolana e representação autêntica das tradições angolanas no Reino Unido',
    
    criteria: 'Angolan birth, Angolan ancestry, or demonstrated deep involvement in Angolan cultural preservation and community',
    criteriaPortuguese: 'Nascimento angolano, ascendência angolana ou envolvimento profundo demonstrado na preservação cultural angolana e comunidade',
    
    verificationMethod: 'Documentation of Angolan connection and community recognition of cultural authenticity',
    verificationMethodPortuguese: 'Documentação de conexão angolana e reconhecimento comunitário de autenticidade cultural',
    
    documentsRequired: [
      'Angolan documentation OR cultural involvement proof',
      'Portuguese language proficiency',
      'Angolan cultural knowledge demonstration',
      'Community references from Angolan diaspora',
      'Cultural contribution evidence'
    ],
    verificationTime: '5-7 business days',
    
    culturalImportance: 'Preserves authentic Angolan cultural representation and validates traditional practices like Kizomba, Semba',
    culturalImportancePortuguese: 'Preserva representação cultural angolana autêntica e valida práticas tradicionais como Kizomba, Semba',
    
    communityBenefit: 'Validates authentic Angolan cultural authority for dance, music, and traditional practices',
    communityBenefitPortuguese: 'Valida autoridade cultural angolana autêntica para dança, música e práticas tradicionais',
    
    trustLevel: 9,
    popularityScore: 85,
    communityRespect: 91,
    
    eligibleCountries: ['Angola', 'Angolan diaspora worldwide'],
    prerequisites: ['Angolan cultural connection', 'Portuguese language', 'Community respect'],
    
    sampleProfiles: ['Fátima Burity - Luanda', 'Paulo - Angola heritage', 'Maria Cardoso - Cultural organizer'],
    
    isActive: true,
    featured: true
  },
  
  {
    id: 'cape-verdean-heritage-verified',
    name: '🇨🇻 Cape Verdean Heritage Verified',
    namePortuguese: '🇨🇻 Herança Cabo-verdiana Verificada',
    type: 'heritage',
    
    icon: 'FlagIcon',
    emoji: '🇨🇻',
    color: '#2563EB', // blue-600
    backgroundColor: '#EFF6FF', // blue-50
    
    description: 'Verified connection to Cape Verdean cultural heritage and authentic representation of island traditions',
    descriptionPortuguese: 'Conexão verificada com herança cultural cabo-verdiana e representação autêntica das tradições das ilhas',
    
    criteria: 'Cape Verdean birth, ancestry, or deep cultural involvement in Cape Verdean music, traditions, and community',
    criteriaPortuguese: 'Nascimento cabo-verdiano, ascendência ou envolvimento cultural profundo na música, tradições e comunidade cabo-verdiana',
    
    verificationMethod: 'Cape Verdean documentation or extensive cultural community involvement and recognition',
    verificationMethodPortuguese: 'Documentação cabo-verdiana ou extenso envolvimento e reconhecimento na comunidade cultural',
    
    documentsRequired: [
      'Cape Verdean documentation OR cultural involvement proof',
      'Portuguese/Creole language demonstration',
      'Cape Verdean cultural knowledge (morna, coladeira, etc.)',
      'Island community references',
      'Cultural contribution evidence'
    ],
    verificationTime: '5-7 business days',
    
    culturalImportance: 'Preserves authentic Cape Verdean cultural traditions including morna music and island community values',
    culturalImportancePortuguese: 'Preserva tradições culturais cabo-verdianas autênticas incluindo música morna e valores comunitários das ilhas',
    
    communityBenefit: 'Validates authentic Cape Verdean cultural authority for music, traditions, and island cultural practices',
    communityBenefitPortuguese: 'Valida autoridade cultural cabo-verdiana autêntica para música, tradições e práticas culturais das ilhas',
    
    trustLevel: 9,
    popularityScore: 83,
    communityRespect: 88,
    
    eligibleCountries: ['Cape Verde', 'Cape Verdean diaspora worldwide'],
    prerequisites: ['Cape Verdean cultural connection', 'Language demonstration', 'Cultural respect'],
    
    sampleProfiles: ['Teresa - Praia heritage', 'Cape Verdean musicians', 'Island cultural preservationists'],
    
    isActive: true,
    featured: true
  },
  
  // SPECIALIZED ACHIEVEMENT BADGES
  {
    id: 'kizomba-community-verified',
    name: '💃 Kizomba Community Leader',
    namePortuguese: '💃 Líder da Comunidade de Kizomba',
    type: 'achievement',
    
    icon: 'MusicalNoteIcon',
    emoji: '💃',
    color: '#7C2D12', // amber-800
    backgroundColor: '#FEF3C7', // amber-100
    
    description: 'Recognized leader in London\'s Kizomba dance community with authentic knowledge of Angolan dance traditions',
    descriptionPortuguese: 'Líder reconhecido na comunidade de dança Kizomba de Londres com conhecimento autêntico das tradições de dança angolana',
    
    criteria: 'Must demonstrate advanced Kizomba skills, teaching experience, or significant community leadership in dance events',
    criteriaPortuguese: 'Deve demonstrar habilidades avançadas de Kizomba, experiência de ensino ou liderança comunitária significativa em eventos de dança',
    
    verificationMethod: 'Dance skill assessment, community recognition, teaching credentials, or event organization proof',
    verificationMethodPortuguese: 'Avaliação de habilidades de dança, reconhecimento comunitário, credenciais de ensino ou prova de organização de eventos',
    
    documentsRequired: [
      'Advanced dance skill demonstration',
      'Teaching or leadership experience proof',
      'Community recognition and testimonials',
      'Kizomba cultural knowledge assessment',
      'Regular event participation proof'
    ],
    verificationTime: '7-10 business days',
    
    culturalImportance: 'Preserves authentic Angolan Kizomba traditions and ensures cultural respect in dance community',
    culturalImportancePortuguese: 'Preserva tradições autênticas de Kizomba angolana e garante respeito cultural na comunidade de dança',
    
    communityBenefit: 'Provides trusted dance instruction and cultural guidance for Kizomba community development',
    communityBenefitPortuguese: 'Fornece instrução de dança confiável e orientação cultural para desenvolvimento da comunidade Kizomba',
    
    trustLevel: 8,
    popularityScore: 79,
    communityRespect: 86,
    
    eligibleCountries: ['Angola', 'All Portuguese-speaking countries with Kizomba knowledge'],
    prerequisites: ['Advanced Kizomba skills', 'Cultural knowledge', 'Community respect', 'Teaching or leadership experience'],
    
    sampleProfiles: ['Chocolate Kizomba instructors', 'Angolan dance masters', 'Community dance organizers'],
    
    isActive: true,
    featured: false
  },
  
  {
    id: 'cultural-educator-verified',
    name: '🎓 Cultural Educator',
    namePortuguese: '🎓 Educador Cultural',
    type: 'achievement',
    
    icon: 'AcademicCapIcon',
    emoji: '🎓',
    color: '#1E40AF', // blue-700
    backgroundColor: '#DBEAFE', // blue-100
    
    description: 'Recognized educator promoting Portuguese-speaking cultural knowledge through teaching, workshops, or educational content',
    descriptionPortuguese: 'Educador reconhecido promovendo conhecimento cultural lusófono através de ensino, workshops ou conteúdo educacional',
    
    criteria: 'Must demonstrate educational qualifications, teaching experience, or significant cultural education contributions',
    criteriaPortuguese: 'Deve demonstrar qualificações educacionais, experiência de ensino ou contribuições significativas para educação cultural',
    
    verificationMethod: 'Educational credentials, teaching portfolio, student testimonials, or cultural content creation proof',
    verificationMethodPortuguese: 'Credenciais educacionais, portfólio de ensino, testemunhos de estudantes ou prova de criação de conteúdo cultural',
    
    documentsRequired: [
      'Educational qualifications OR teaching experience proof',
      'Student testimonials and success stories',
      'Cultural education content portfolio',
      'Community impact documentation',
      'Professional references'
    ],
    verificationTime: '7-10 business days',
    
    culturalImportance: 'Preserves and transmits Portuguese-speaking cultural knowledge to future generations',
    culturalImportancePortuguese: 'Preserva e transmite conhecimento cultural lusófono para futuras gerações',
    
    communityBenefit: 'Provides trusted cultural education and authentic knowledge sharing within community',
    communityBenefitPortuguese: 'Fornece educação cultural confiável e partilha autêntica de conhecimento dentro da comunidade',
    
    trustLevel: 9,
    popularityScore: 84,
    communityRespect: 93,
    
    eligibleCountries: ['All Portuguese-speaking countries', 'Cultural educators worldwide'],
    minimumAge: 21,
    prerequisites: ['Educational experience', 'Cultural expertise', 'Community recognition', 'Teaching or content creation'],
    
    sampleProfiles: ['Isabella Lima - Cooking classes', 'Portuguese language instructors', 'Cultural workshop leaders'],
    
    isActive: true,
    featured: false
  }
]

/**
 * Get badges by type
 */
export function getBadgesByType(type: VerificationBadge['type']): VerificationBadge[] {
  return VERIFICATION_BADGES.filter(badge => badge.type === type && badge.isActive)
}

/**
 * Get featured verification badges
 */
export function getFeaturedBadges(): VerificationBadge[] {
  return VERIFICATION_BADGES.filter(badge => badge.featured && badge.isActive)
    .sort((a, b) => b.trustLevel - a.trustLevel)
}

/**
 * Get heritage verification badges
 */
export function getHeritageBadges(): VerificationBadge[] {
  return getBadgesByType('heritage')
}

/**
 * Get business verification badges
 */
export function getBusinessBadges(): VerificationBadge[] {
  return getBadgesByType('business')
}

/**
 * Get cultural achievement badges
 */
export function getCulturalBadges(): VerificationBadge[] {
  return getBadgesByType('cultural')
}

/**
 * Get personal connection badges
 */
export function getPersonalBadges(): VerificationBadge[] {
  return getBadgesByType('personal')
}

/**
 * Get badges by trust level
 */
export function getHighTrustBadges(): VerificationBadge[] {
  return VERIFICATION_BADGES.filter(badge => badge.trustLevel >= 8 && badge.isActive)
    .sort((a, b) => b.trustLevel - a.trustLevel)
}

/**
 * Get badge by ID
 */
export function getBadgeById(id: string): VerificationBadge | null {
  return VERIFICATION_BADGES.find(badge => badge.id === id) || null
}

/**
 * Get badges for specific country heritage
 */
export function getBadgesForCountry(country: string): VerificationBadge[] {
  return VERIFICATION_BADGES.filter(badge => 
    badge.eligibleCountries.some(eligible => 
      eligible.toLowerCase().includes(country.toLowerCase())
    ) && badge.isActive
  )
}

/**
 * Get signup page verification badges preview
 */
export function getSignupPageBadges(): VerificationBadge[] {
  return VERIFICATION_BADGES
    .filter(badge => badge.featured && badge.isActive)
    .sort((a, b) => b.popularityScore - a.popularityScore)
    .slice(0, 6)
}

/**
 * Cultural authenticity validation
 */
export function validateBadgeAuthenticity(): {
  totalBadges: number
  heritageCountries: number
  businessSupport: number
  culturalPreservation: number
  averageTrustLevel: number
} {
  const heritageBadges = getHeritageBadges()
  const businessBadges = getBusinessBadges()  
  const culturalBadges = getCulturalBadges()
  const totalTrust = VERIFICATION_BADGES.reduce((sum, badge) => sum + badge.trustLevel, 0)
  
  return {
    totalBadges: VERIFICATION_BADGES.length,
    heritageCountries: heritageBadges.length,
    businessSupport: businessBadges.length,
    culturalPreservation: culturalBadges.length,
    averageTrustLevel: Math.round(totalTrust / VERIFICATION_BADGES.length * 10) / 10
  }
}