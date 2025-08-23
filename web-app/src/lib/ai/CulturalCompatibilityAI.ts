/**
 * CulturalCompatibilityAI.ts
 * Advanced Portuguese Cultural Matching Algorithm
 * 
 * Sophisticated AI-powered compatibility matching system designed specifically
 * for Portuguese speakers, incorporating cultural values, linguistic patterns,
 * behavioral analysis, and saudade emotional state matching.
 */

// Portuguese Cultural Dimensions
interface PortugueseCulturalProfile {
  // Core Cultural Values (0-10 scale)
  familyOrientation: number        // Family centricity and importance
  religiosity: number              // Religious/spiritual beliefs importance
  traditionalism: number           // Attachment to Portuguese traditions
  collectivism: number             // Community vs individual focus
  hierarchyRespect: number         // Respect for age/authority
  hospitalityValue: number         // Importance of welcoming guests
  
  // Portuguese-Specific Cultural Psychology
  saudadeIntensity: number         // Depth of saudade experience
  saudadeType: 'geographic' | 'relational' | 'cultural' | 'temporal' | 'mixed'
  diasporaStage: 'newcomer' | 'established' | 'integrated' | 'bicultural'
  culturalMaintenance: number      // Effort to maintain Portuguese culture
  adaptationStyle: 'assimilative' | 'integrative' | 'separative' | 'marginalized'
  
  // Regional Portuguese Identity
  region: 'norte' | 'centro' | 'lisboa' | 'alentejo' | 'algarve' | 'madeira' | 'azores' | 'other'
  urbanRural: 'urban' | 'rural' | 'mixed'
  generationInUK: number           // 1st, 2nd, 3rd generation
  
  // Linguistic Patterns
  portugueseDialect: 'continental' | 'brazilian' | 'african' | 'mixed'
  formalityPreference: number      // Formal vs casual communication
  emotionalExpression: number      // Emotional openness in Portuguese
  codeSwitch: number              // Comfort switching EN/PT
  
  // Social & Behavioral Patterns
  celebrationStyle: 'traditional' | 'modern' | 'fusion' | 'minimal'
  socialCirclePreference: 'portuguese_only' | 'mixed' | 'open' | 'professional'
  communicationStyle: 'direct' | 'indirect' | 'context_high' | 'diplomatic'
  conflictResolution: 'avoidant' | 'collaborative' | 'assertive' | 'family_mediated'
}

// Cultural Compatibility Factors
interface CulturalCompatibilityFactors {
  coreValueAlignment: number       // Fundamental values match
  saudadeResonance: number        // Emotional longing compatibility
  culturalExpressionSync: number  // How culture is lived/expressed
  communicationHarmony: number    // Communication style match
  lifestyleCompatibility: number  // Daily life preferences match
  adaptationComplementarity: number // How adaptation styles complement
  regionalAffinity: number        // Geographic/regional connection
  generationalUnderstanding: number // Cross-generational empathy
  linguisticComfort: number       // Language use comfort level
  celebrationSynergy: number      // Shared celebration preferences
}

// AI Matching Result
export interface CulturalMatchResult {
  userId: string
  compatibilityScore: number      // Overall score (0-100)
  factors: CulturalCompatibilityFactors
  culturalBonds: string[]         // Specific cultural connection points
  saudadeConnection: 'high' | 'medium' | 'low' | 'therapeutic'
  recommendedInteraction: 'friendship' | 'cultural_activity' | 'support_group' | 'mentorship'
  conversationStarters: string[]  // Portuguese cultural conversation topics
  sharedExperiences: string[]     // Likely shared cultural experiences
  complementaryAspects: string[]  // How they complement each other
  potentialChallenges: string[]   // Potential cultural friction points
  matchConfidence: number         // AI confidence in this match (0-1)
}

// Advanced Cultural Compatibility AI Engine
export class CulturalCompatibilityAI {
  private readonly culturalWeights = {
    coreValues: 0.25,
    saudadeMatch: 0.20,
    culturalExpression: 0.15,
    communication: 0.15,
    lifestyle: 0.10,
    adaptation: 0.10,
    regional: 0.05
  }

  private readonly saudadeCompatibilityMatrix = {
    geographic: { geographic: 0.95, temporal: 0.75, relational: 0.60, cultural: 0.70, mixed: 0.80 },
    temporal: { temporal: 0.95, geographic: 0.75, cultural: 0.85, relational: 0.65, mixed: 0.85 },
    relational: { relational: 0.95, cultural: 0.80, temporal: 0.65, geographic: 0.60, mixed: 0.75 },
    cultural: { cultural: 0.95, temporal: 0.85, relational: 0.80, geographic: 0.70, mixed: 0.90 },
    mixed: { mixed: 1.0, cultural: 0.90, temporal: 0.85, geographic: 0.80, relational: 0.75 }
  }

  /**
   * Calculate cultural compatibility between two Portuguese-speaking community members
   */
  public calculateCompatibility(
    profile1: PortugueseCulturalProfile,
    profile2: PortugueseCulturalProfile
  ): CulturalMatchResult {
    
    const factors = this.calculateCompatibilityFactors(profile1, profile2)
    const culturalBonds = this.identifyCulturalBonds(profile1, profile2)
    const saudadeConnection = this.assessSaudadeConnection(profile1, profile2)
    const conversationStarters = this.generateConversationStarters(profile1, profile2)
    const sharedExperiences = this.identifySharedExperiences(profile1, profile2)
    
    const overallScore = this.calculateOverallScore(factors)
    const matchConfidence = this.calculateMatchConfidence(profile1, profile2, factors)
    const recommendedInteraction = this.determineInteractionType(overallScore, factors, saudadeConnection)
    
    return {
      userId: '', // Would be set by calling function
      compatibilityScore: Math.round(overallScore),
      factors,
      culturalBonds,
      saudadeConnection,
      recommendedInteraction,
      conversationStarters,
      sharedExperiences,
      complementaryAspects: this.identifyComplementaryAspects(profile1, profile2),
      potentialChallenges: this.identifyPotentialChallenges(profile1, profile2),
      matchConfidence
    }
  }

  /**
   * Calculate detailed compatibility factors
   */
  private calculateCompatibilityFactors(
    p1: PortugueseCulturalProfile, 
    p2: PortugueseCulturalProfile
  ): CulturalCompatibilityFactors {
    
    // Core Values Alignment (weighted by importance to Portuguese culture)
    const coreValueAlignment = this.calculateValueAlignment([
      { v1: p1.familyOrientation, v2: p2.familyOrientation, weight: 0.3 },
      { v1: p1.traditionalism, v2: p2.traditionalism, weight: 0.25 },
      { v1: p1.hospitalityValue, v2: p2.hospitalityValue, weight: 0.2 },
      { v1: p1.collectivism, v2: p2.collectivism, weight: 0.15 },
      { v1: p1.religiosity, v2: p2.religiosity, weight: 0.1 }
    ])

    // Saudade Resonance (emotional compatibility)
    const saudadeTypeMatch = this.saudadeCompatibilityMatrix[p1.saudadeType][p2.saudadeType] || 0.5
    const saudadeIntensityMatch = 1 - Math.abs(p1.saudadeIntensity - p2.saudadeIntensity) / 10
    const saudadeResonance = (saudadeTypeMatch * 0.6 + saudadeIntensityMatch * 0.4) * 100

    // Cultural Expression Sync
    const culturalExpressionSync = this.calculateCulturalExpression(p1, p2)

    // Communication Harmony
    const communicationHarmony = this.calculateCommunicationCompatibility(p1, p2)

    // Lifestyle Compatibility
    const lifestyleCompatibility = this.calculateLifestyleMatch(p1, p2)

    // Adaptation Complementarity
    const adaptationComplementarity = this.calculateAdaptationMatch(p1, p2)

    // Regional Affinity
    const regionalAffinity = this.calculateRegionalConnection(p1, p2)

    // Generational Understanding
    const generationalUnderstanding = this.calculateGenerationalMatch(p1, p2)

    // Linguistic Comfort
    const linguisticComfort = this.calculateLinguisticCompatibility(p1, p2)

    // Celebration Synergy
    const celebrationSynergy = this.calculateCelebrationMatch(p1, p2)

    return {
      coreValueAlignment,
      saudadeResonance,
      culturalExpressionSync,
      communicationHarmony,
      lifestyleCompatibility,
      adaptationComplementarity,
      regionalAffinity,
      generationalUnderstanding,
      linguisticComfort,
      celebrationSynergy
    }
  }

  /**
   * Calculate weighted value alignment
   */
  private calculateValueAlignment(values: { v1: number; v2: number; weight: number }[]): number {
    const totalWeight = values.reduce((sum, v) => sum + v.weight, 0)
    const weightedScore = values.reduce((sum, v) => {
      const alignment = 1 - Math.abs(v.v1 - v.v2) / 10 // Normalize to 0-1
      return sum + (alignment * v.weight)
    }, 0)
    
    return (weightedScore / totalWeight) * 100
  }

  /**
   * Calculate cultural expression compatibility
   */
  private calculateCulturalExpression(p1: PortugueseCulturalProfile, p2: PortugueseCulturalProfile): number {
    const maintenanceMatch = 1 - Math.abs(p1.culturalMaintenance - p2.culturalMaintenance) / 10
    const celebrationMatch = this.getCelebrationCompatibility(p1.celebrationStyle, p2.celebrationStyle)
    const socialCircleMatch = this.getSocialCircleCompatibility(p1.socialCirclePreference, p2.socialCirclePreference)
    
    return ((maintenanceMatch * 0.4) + (celebrationMatch * 0.3) + (socialCircleMatch * 0.3)) * 100
  }

  /**
   * Calculate communication compatibility
   */
  private calculateCommunicationCompatibility(p1: PortugueseCulturalProfile, p2: PortugueseCulturalProfile): number {
    const formalityMatch = 1 - Math.abs(p1.formalityPreference - p2.formalityPreference) / 10
    const emotionalMatch = 1 - Math.abs(p1.emotionalExpression - p2.emotionalExpression) / 10
    const codeSwitchMatch = 1 - Math.abs(p1.codeSwitch - p2.codeSwitch) / 10
    const styleMatch = this.getCommunicationStyleCompatibility(p1.communicationStyle, p2.communicationStyle)
    
    return ((formalityMatch * 0.25) + (emotionalMatch * 0.25) + (codeSwitchMatch * 0.25) + (styleMatch * 0.25)) * 100
  }

  /**
   * Calculate lifestyle match
   */
  private calculateLifestyleMatch(p1: PortugueseCulturalProfile, p2: PortugueseCulturalProfile): number {
    const hierarchyMatch = 1 - Math.abs(p1.hierarchyRespect - p2.hierarchyRespect) / 10
    const hospitalityMatch = 1 - Math.abs(p1.hospitalityValue - p2.hospitalityValue) / 10
    const conflictMatch = this.getConflictResolutionCompatibility(p1.conflictResolution, p2.conflictResolution)
    
    return ((hierarchyMatch * 0.4) + (hospitalityMatch * 0.4) + (conflictMatch * 0.2)) * 100
  }

  /**
   * Calculate adaptation style compatibility
   */
  private calculateAdaptationMatch(p1: PortugueseCulturalProfile, p2: PortugueseCulturalProfile): number {
    const adaptationMatrix = {
      assimilative: { assimilative: 0.9, integrative: 0.8, separative: 0.3, marginalized: 0.4 },
      integrative: { integrative: 0.95, assimilative: 0.8, separative: 0.6, marginalized: 0.7 },
      separative: { separative: 0.9, integrative: 0.6, assimilative: 0.3, marginalized: 0.5 },
      marginalized: { marginalized: 0.8, integrative: 0.7, assimilative: 0.4, separative: 0.5 }
    }
    
    const stageBonus = Math.abs(p1.diasporaStage === p2.diasporaStage ? 1.1 : 1.0)
    return (adaptationMatrix[p1.adaptationStyle][p2.adaptationStyle] * stageBonus) * 100
  }

  /**
   * Calculate regional connection
   */
  private calculateRegionalConnection(p1: PortugueseCulturalProfile, p2: PortugueseCulturalProfile): number {
    const regionMatch = p1.region === p2.region ? 1.0 : 0.7
    const urbanRuralMatch = p1.urbanRural === p2.urbanRural ? 1.0 : 0.8
    const dialectBonus = p1.portugueseDialect === p2.portugueseDialect ? 1.1 : 1.0
    
    return ((regionMatch * 0.5) + (urbanRuralMatch * 0.5)) * dialectBonus * 100
  }

  /**
   * Calculate generational understanding
   */
  private calculateGenerationalMatch(p1: PortugueseCulturalProfile, p2: PortugueseCulturalProfile): number {
    const generationDiff = Math.abs(p1.generationInUK - p2.generationInUK)
    
    // Same generation = high understanding, adjacent = good, distant = lower
    if (generationDiff === 0) return 100
    if (generationDiff === 1) return 85
    if (generationDiff === 2) return 70
    return 55
  }

  /**
   * Calculate linguistic compatibility
   */
  private calculateLinguisticCompatibility(p1: PortugueseCulturalProfile, p2: PortugueseCulturalProfile): number {
    const dialectMatch = p1.portugueseDialect === p2.portugueseDialect ? 1.0 : 0.8
    const formalityMatch = 1 - Math.abs(p1.formalityPreference - p2.formalityPreference) / 10
    const codeSwitchMatch = 1 - Math.abs(p1.codeSwitch - p2.codeSwitch) / 10
    
    return ((dialectMatch * 0.4) + (formalityMatch * 0.3) + (codeSwitchMatch * 0.3)) * 100
  }

  /**
   * Calculate celebration style match
   */
  private calculateCelebrationMatch(p1: PortugueseCulturalProfile, p2: PortugueseCulturalProfile): number {
    return this.getCelebrationCompatibility(p1.celebrationStyle, p2.celebrationStyle) * 100
  }

  /**
   * Get celebration style compatibility scores
   */
  private getCelebrationCompatibility(style1: string, style2: string): number {
    const matrix = {
      traditional: { traditional: 1.0, fusion: 0.8, modern: 0.6, minimal: 0.4 },
      fusion: { fusion: 1.0, traditional: 0.8, modern: 0.9, minimal: 0.6 },
      modern: { modern: 1.0, fusion: 0.9, traditional: 0.6, minimal: 0.7 },
      minimal: { minimal: 1.0, modern: 0.7, fusion: 0.6, traditional: 0.4 }
    }
    return matrix[style1 as keyof typeof matrix]?.[style2 as keyof typeof matrix] || 0.5
  }

  /**
   * Get social circle compatibility
   */
  private getSocialCircleCompatibility(pref1: string, pref2: string): number {
    const matrix = {
      portuguese_only: { portuguese_only: 1.0, mixed: 0.7, open: 0.5, professional: 0.6 },
      mixed: { mixed: 1.0, portuguese_only: 0.7, open: 0.9, professional: 0.8 },
      open: { open: 1.0, mixed: 0.9, professional: 0.8, portuguese_only: 0.5 },
      professional: { professional: 1.0, open: 0.8, mixed: 0.8, portuguese_only: 0.6 }
    }
    return matrix[pref1 as keyof typeof matrix]?.[pref2 as keyof typeof matrix] || 0.5
  }

  /**
   * Get communication style compatibility
   */
  private getCommunicationStyleCompatibility(style1: string, style2: string): number {
    const matrix = {
      direct: { direct: 1.0, assertive: 0.8, collaborative: 0.7, indirect: 0.4, context_high: 0.3, diplomatic: 0.5, family_mediated: 0.4 },
      indirect: { indirect: 1.0, context_high: 0.9, diplomatic: 0.8, family_mediated: 0.7, collaborative: 0.6, direct: 0.4, assertive: 0.3 },
      context_high: { context_high: 1.0, indirect: 0.9, diplomatic: 0.8, family_mediated: 0.7, collaborative: 0.6, direct: 0.3, assertive: 0.2 },
      diplomatic: { diplomatic: 1.0, context_high: 0.8, indirect: 0.8, family_mediated: 0.6, collaborative: 0.7, direct: 0.5, assertive: 0.4 }
    }
    return matrix[style1 as keyof typeof matrix]?.[style2 as keyof typeof matrix] || 0.5
  }

  /**
   * Get conflict resolution compatibility
   */
  private getConflictResolutionCompatibility(style1: string, style2: string): number {
    const matrix = {
      avoidant: { avoidant: 0.9, family_mediated: 0.8, diplomatic: 0.7, collaborative: 0.6, assertive: 0.3 },
      collaborative: { collaborative: 1.0, family_mediated: 0.8, diplomatic: 0.8, avoidant: 0.6, assertive: 0.7 },
      assertive: { assertive: 0.8, collaborative: 0.7, diplomatic: 0.6, family_mediated: 0.5, avoidant: 0.3 },
      family_mediated: { family_mediated: 1.0, avoidant: 0.8, collaborative: 0.8, diplomatic: 0.7, assertive: 0.5 }
    }
    return matrix[style1 as keyof typeof matrix]?.[style2 as keyof typeof matrix] || 0.5
  }

  /**
   * Calculate overall compatibility score
   */
  private calculateOverallScore(factors: CulturalCompatibilityFactors): number {
    return (
      factors.coreValueAlignment * this.culturalWeights.coreValues +
      factors.saudadeResonance * this.culturalWeights.saudadeMatch +
      factors.culturalExpressionSync * this.culturalWeights.culturalExpression +
      factors.communicationHarmony * this.culturalWeights.communication +
      factors.lifestyleCompatibility * this.culturalWeights.lifestyle +
      factors.adaptationComplementarity * this.culturalWeights.adaptation +
      factors.regionalAffinity * this.culturalWeights.regional
    )
  }

  /**
   * Identify specific cultural bonds
   */
  private identifyCulturalBonds(p1: PortugueseCulturalProfile, p2: PortugueseCulturalProfile): string[] {
    const bonds: string[] = []
    
    if (p1.region === p2.region) bonds.push(`shared_${p1.region}_roots`)
    if (p1.saudadeType === p2.saudadeType) bonds.push(`${p1.saudadeType}_saudade_understanding`)
    if (p1.portugueseDialect === p2.portugueseDialect) bonds.push(`${p1.portugueseDialect}_linguistic_bond`)
    if (p1.generationInUK === p2.generationInUK) bonds.push(`${p1.generationInUK}_generation_experience`)
    if (p1.celebrationStyle === p2.celebrationStyle) bonds.push(`${p1.celebrationStyle}_celebration_style`)
    if (Math.abs(p1.familyOrientation - p2.familyOrientation) <= 2) bonds.push('family_values_alignment')
    if (Math.abs(p1.traditionalism - p2.traditionalism) <= 2) bonds.push('tradition_appreciation')
    if (p1.adaptationStyle === p2.adaptationStyle) bonds.push(`${p1.adaptationStyle}_adaptation_journey`)
    
    return bonds
  }

  /**
   * Assess saudade emotional connection level
   */
  private assessSaudadeConnection(p1: PortugueseCulturalProfile, p2: PortugueseCulturalProfile): 'high' | 'medium' | 'low' | 'therapeutic' {
    const typeCompatibility = this.saudadeCompatibilityMatrix[p1.saudadeType][p2.saudadeType]
    const intensityDiff = Math.abs(p1.saudadeIntensity - p2.saudadeIntensity)
    
    if (typeCompatibility >= 0.9 && intensityDiff <= 2) return 'high'
    if (typeCompatibility >= 0.8 && intensityDiff <= 3) return 'medium'
    if ((p1.saudadeIntensity >= 7 || p2.saudadeIntensity >= 7) && typeCompatibility >= 0.6) return 'therapeutic'
    return 'low'
  }

  /**
   * Generate Portuguese cultural conversation starters
   */
  private generateConversationStarters(p1: PortugueseCulturalProfile, p2: PortugueseCulturalProfile): string[] {
    const starters: string[] = []
    
    if (p1.region === p2.region) {
      starters.push(`Também és do ${p1.region}? Que saudades das festas da nossa terra!`)
      starters.push(`Conheces aquele sabor único do pão da nossa região?`)
    }
    
    if (p1.saudadeType === p2.saudadeType) {
      starters.push('Sentes aquela saudade que não se explica, não é?')
      starters.push('Quando é que a saudade bate mais forte em ti?')
    }
    
    if (p1.generationInUK === p2.generationInUK) {
      starters.push('Como é que os teus pais/avós lidaram com a mudança para cá?')
      starters.push('Sentes que perdemos alguma coisa da nossa cultura?')
    }
    
    // Universal Portuguese conversation starters
    starters.push('Qual é a comida portuguesa que mais saudades tens?')
    starters.push('Ainda consegues fazer um bom bacalhau à Brás?')
    starters.push('Ouves fado quando bate a saudade?')
    starters.push('Como explicas "saudade" aos ingleses?')
    starters.push('Onde é que encontras os melhores pastéis de nata em Londres?')
    
    return starters.slice(0, 5) // Return top 5 most relevant
  }

  /**
   * Identify shared cultural experiences
   */
  private identifySharedExperiences(p1: PortugueseCulturalProfile, p2: PortugueseCulturalProfile): string[] {
    const experiences: string[] = []
    
    // Regional experiences
    if (p1.region === p2.region) {
      experiences.push(`Growing up in ${p1.region}`)
      experiences.push(`Local ${p1.region} traditions and festivals`)
    }
    
    // Generational experiences
    if (p1.generationInUK === p2.generationInUK) {
      if (p1.generationInUK === 1) {
        experiences.push('Immigration journey and first UK experiences')
        experiences.push('Learning English while maintaining Portuguese')
      } else {
        experiences.push(`${p1.generationInUK}nd/3rd generation identity navigation`)
        experiences.push('Balancing British and Portuguese identities')
      }
    }
    
    // Saudade experiences
    experiences.push('Deep longing for Portuguese landscapes')
    experiences.push('Missing extended family gatherings')
    experiences.push('Nostalgia triggered by Portuguese music')
    experiences.push('Explaining Portuguese culture to British friends')
    experiences.push('Finding authentic Portuguese ingredients in London')
    
    return experiences.slice(0, 6)
  }

  /**
   * Identify complementary aspects
   */
  private identifyComplementaryAspects(p1: PortugueseCulturalProfile, p2: PortugueseCulturalProfile): string[] {
    const complements: string[] = []
    
    if (p1.adaptationStyle === 'integrative' && p2.adaptationStyle === 'separative') {
      complements.push('Cultural bridge-building potential')
    }
    
    if (Math.abs(p1.generationInUK - p2.generationInUK) === 1) {
      complements.push('Cross-generational wisdom sharing')
    }
    
    if (p1.culturalMaintenance > 7 && p2.culturalMaintenance < 5) {
      complements.push('Cultural knowledge transfer opportunity')
    }
    
    return complements
  }

  /**
   * Identify potential challenges
   */
  private identifyPotentialChallenges(p1: PortugueseCulturalProfile, p2: PortugueseCulturalProfile): string[] {
    const challenges: string[] = []
    
    if (Math.abs(p1.religiosity - p2.religiosity) > 5) {
      challenges.push('Potential differences in religious perspectives')
    }
    
    if (p1.communicationStyle === 'direct' && p2.communicationStyle === 'indirect') {
      challenges.push('Different communication preferences')
    }
    
    if (Math.abs(p1.traditionalism - p2.traditionalism) > 6) {
      challenges.push('Varying attachment to Portuguese traditions')
    }
    
    return challenges.slice(0, 3)
  }

  /**
   * Calculate match confidence
   */
  private calculateMatchConfidence(
    p1: PortugueseCulturalProfile, 
    p2: PortugueseCulturalProfile,
    factors: CulturalCompatibilityFactors
  ): number {
    const dataCompleteness = this.assessProfileCompleteness(p1, p2)
    const scoreConsistency = this.assessScoreConsistency(factors)
    const culturalSpecificity = this.assessCulturalSpecificity(p1, p2)
    
    return (dataCompleteness * 0.4 + scoreConsistency * 0.4 + culturalSpecificity * 0.2)
  }

  /**
   * Assess profile data completeness
   */
  private assessProfileCompleteness(p1: PortugueseCulturalProfile, p2: PortugueseCulturalProfile): number {
    // Check if profiles have sufficient data for accurate matching
    const p1Complete = this.getProfileCompleteness(p1)
    const p2Complete = this.getProfileCompleteness(p2)
    return (p1Complete + p2Complete) / 2
  }

  private getProfileCompleteness(profile: PortugueseCulturalProfile): number {
    const requiredFields = [
      'familyOrientation', 'traditionalism', 'saudadeIntensity', 
      'region', 'generationInUK', 'portugueseDialect'
    ]
    
    const filledFields = requiredFields.filter(field => 
      profile[field as keyof PortugueseCulturalProfile] !== undefined &&
      profile[field as keyof PortugueseCulturalProfile] !== null
    ).length
    
    return filledFields / requiredFields.length
  }

  /**
   * Assess score consistency across factors
   */
  private assessScoreConsistency(factors: CulturalCompatibilityFactors): number {
    const scores = Object.values(factors)
    const mean = scores.reduce((a, b) => a + b, 0) / scores.length
    const variance = scores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / scores.length
    
    // Lower variance = higher consistency = higher confidence
    return Math.max(0, 1 - (variance / 2500)) // Normalize to 0-1
  }

  /**
   * Assess Portuguese cultural specificity
   */
  private assessCulturalSpecificity(p1: PortugueseCulturalProfile, p2: PortugueseCulturalProfile): number {
    const specificFactors = [
      p1.region !== 'other' && p2.region !== 'other',
      p1.saudadeIntensity > 0 && p2.saudadeIntensity > 0,
      p1.portugueseDialect !== 'mixed' && p2.portugueseDialect !== 'mixed',
      p1.culturalMaintenance > 3 && p2.culturalMaintenance > 3
    ]
    
    return specificFactors.filter(Boolean).length / specificFactors.length
  }

  /**
   * Determine recommended interaction type
   */
  private determineInteractionType(
    score: number, 
    factors: CulturalCompatibilityFactors, 
    saudadeConnection: string
  ): 'friendship' | 'cultural_activity' | 'support_group' | 'mentorship' {
    
    if (saudadeConnection === 'therapeutic') return 'support_group'
    if (score >= 85 && factors.coreValueAlignment >= 80) return 'friendship'
    if (factors.generationalUnderstanding <= 60 && factors.culturalExpressionSync >= 70) return 'mentorship'
    return 'cultural_activity'
  }

  /**
   * Generate cultural insights for the match
   */
  public generateCulturalInsights(
    profile1: PortugueseCulturalProfile,
    profile2: PortugueseCulturalProfile,
    match: CulturalMatchResult
  ): {
    culturalStrengths: string[]
    recommendedActivities: string[]
    culturalGrowthOpportunities: string[]
    saudadeHealingPotential: string
  } {
    return {
      culturalStrengths: this.identifyCulturalStrengths(profile1, profile2, match),
      recommendedActivities: this.recommendCulturalActivities(profile1, profile2, match),
      culturalGrowthOpportunities: this.identifyGrowthOpportunities(profile1, profile2),
      saudadeHealingPotential: this.assessSaudadeHealingPotential(profile1, profile2, match)
    }
  }

  private identifyCulturalStrengths(
    p1: PortugueseCulturalProfile, 
    p2: PortugueseCulturalProfile, 
    match: CulturalMatchResult
  ): string[] {
    const strengths: string[] = []
    
    if (match.factors.saudadeResonance >= 80) {
      strengths.push('Deep emotional understanding and saudade connection')
    }
    
    if (match.factors.regionalAffinity >= 90) {
      strengths.push('Strong regional bond and shared geographical memories')
    }
    
    if (match.factors.linguisticComfort >= 85) {
      strengths.push('Excellent linguistic compatibility and communication flow')
    }
    
    return strengths
  }

  private recommendCulturalActivities(
    p1: PortugueseCulturalProfile, 
    p2: PortugueseCulturalProfile,
    match: CulturalMatchResult
  ): string[] {
    const activities: string[] = []
    
    if (match.culturalBonds.includes('family_values_alignment')) {
      activities.push('Family-style Portuguese cooking session')
      activities.push('Portuguese family traditions sharing circle')
    }
    
    if (match.saudadeConnection === 'high' || match.saudadeConnection === 'therapeutic') {
      activities.push('Fado listening and saudade expression session')
      activities.push('Portuguese landscape photography walk')
    }
    
    activities.push('Portuguese cultural exploration in London')
    activities.push('Language practice and cultural exchange')
    
    return activities
  }

  private identifyGrowthOpportunities(p1: PortugueseCulturalProfile, p2: PortugueseCulturalProfile): string[] {
    const opportunities: string[] = []
    
    if (p1.adaptationStyle !== p2.adaptationStyle) {
      opportunities.push('Learning from different UK adaptation approaches')
    }
    
    if (Math.abs(p1.generationInUK - p2.generationInUK) > 0) {
      opportunities.push('Cross-generational Portuguese experience sharing')
    }
    
    return opportunities
  }

  private assessSaudadeHealingPotential(
    p1: PortugueseCulturalProfile, 
    p2: PortugueseCulturalProfile,
    match: CulturalMatchResult
  ): string {
    if (match.saudadeConnection === 'therapeutic') {
      return 'High potential for mutual saudade healing through shared understanding and support'
    } else if (match.saudadeConnection === 'high') {
      return 'Strong saudade resonance can provide comfort and emotional validation'
    } else {
      return 'Moderate saudade connection may offer gentle understanding'
    }
  }
}

// Export singleton instance
export const culturalCompatibilityAI = new CulturalCompatibilityAI()