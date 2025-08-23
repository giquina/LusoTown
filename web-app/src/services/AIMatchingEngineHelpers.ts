/**
 * AI Matching Engine Helper Methods
 * 
 * Comprehensive helper functions for the Cultural Compatibility AI system
 * including behavioral learning, conversation analysis, and regional specialization.
 */

import { supabase } from '@/lib/supabase'
import { UNIVERSITY_PARTNERSHIPS } from '@/config/universities'
import { CULTURAL_CENTERS } from '@/config/cultural-centers'
import type { 
  CulturalCompatibilityProfile, 
  BehavioralLearningData, 
  ConversationQualityMetrics,
  RegionalMatchingConfig 
} from './CulturalCompatibilityAI'

export class AIMatchingEngineHelpers {
  private supabaseClient = supabase

  /**
   * Calculate linguistic compatibility between two users
   */
  analyzeLinguisticCompatibility(
    profile1: CulturalCompatibilityProfile,
    profile2: CulturalCompatibilityProfile
  ): number {
    const lang1 = profile1.cultural_heritage.language_fluency
    const lang2 = profile2.cultural_heritage.language_fluency

    // Portuguese proficiency compatibility
    const portugueseDiff = Math.abs(lang1.portuguese - lang2.portuguese)
    const portugueseScore = Math.max(0, 100 - (portugueseDiff * 10))

    // English proficiency compatibility
    const englishDiff = Math.abs(lang1.english - lang2.english)
    const englishScore = Math.max(0, 100 - (englishDiff * 8))

    // Regional dialect overlap
    const dialectOverlap = this.calculateDialectOverlap(
      lang1.regional_dialects,
      lang2.regional_dialects
    )

    // Weighted linguistic compatibility
    return Math.round(
      portugueseScore * 0.50 +    // Portuguese is most important
      englishScore * 0.30 +       // English for United Kingdom communication
      dialectOverlap * 0.20       // Regional connection
    )
  }

  /**
   * Analyze cultural reference alignment
   */
  analyzeCulturalReferenceAlignment(
    profile1: CulturalCompatibilityProfile,
    profile2: CulturalCompatibilityProfile
  ): number {
    // Cultural practices overlap
    const practicesOverlap = this.calculateArrayOverlap(
      profile1.cultural_heritage.cultural_practices,
      profile2.cultural_heritage.cultural_practices
    )

    // Regional cultural markers alignment
    const regionalAlignment = this.analyzeRegionalCulturalAlignment(profile1, profile2)

    // Music and arts appreciation
    const musicAlignment = this.analyzeMusicAlignment(
      profile1.saudade_analysis.music_emotional_response,
      profile2.saudade_analysis.music_emotional_response
    )

    // Tradition importance similarity
    const traditionDiff = Math.abs(
      profile1.saudade_analysis.tradition_importance - 
      profile2.saudade_analysis.tradition_importance
    )
    const traditionAlignment = Math.max(0, 100 - traditionDiff)

    return Math.round(
      practicesOverlap * 0.30 +
      regionalAlignment * 0.25 +
      musicAlignment * 0.25 +
      traditionAlignment * 0.20
    )
  }

  /**
   * Analyze emotional intelligence match
   */
  analyzeEmotionalIntelligenceMatch(
    profile1: CulturalCompatibilityProfile,
    profile2: CulturalCompatibilityProfile
  ): number {
    // Emotional expression style compatibility
    const expressionMatch = this.calculateExpressionStyleMatch(
      profile1.saudade_analysis.emotional_expression_style,
      profile2.saudade_analysis.emotional_expression_style
    )

    // Emotional connection depth similarity
    const connectionDiff = Math.abs(
      profile1.saudade_analysis.emotional_connection_score -
      profile2.saudade_analysis.emotional_connection_score
    )
    const connectionMatch = Math.max(0, 100 - connectionDiff)

    // Saudade understanding level
    const saudadeAlignment = this.analyzeSaudadeAlignment(profile1, profile2)

    // Communication style emotional compatibility
    const communicationEQ = this.analyzeCommunicationEmotionalQuotient(profile1, profile2)

    return Math.round(
      expressionMatch * 0.25 +
      connectionMatch * 0.25 +
      saudadeAlignment * 0.30 +
      communicationEQ * 0.20
    )
  }

  /**
   * Analyze humor style compatibility
   */
  analyzeHumorStyleCompatibility(
    profile1: CulturalCompatibilityProfile,
    profile2: CulturalCompatibilityProfile
  ): number {
    // Infer humor styles from cultural background and communication style
    const humor1 = this.inferHumorStyle(profile1)
    const humor2 = this.inferHumorStyle(profile2)

    const humorCompatibilityMatrix: Record<string, Record<string, number>> = {
      'warm_traditional': { 'warm_traditional': 95, 'dry_witty': 70, 'playful_modern': 80, 'sophisticated': 75 },
      'dry_witty': { 'warm_traditional': 70, 'dry_witty': 90, 'playful_modern': 75, 'sophisticated': 85 },
      'playful_modern': { 'warm_traditional': 80, 'dry_witty': 75, 'playful_modern': 95, 'sophisticated': 70 },
      'sophisticated': { 'warm_traditional': 75, 'dry_witty': 85, 'playful_modern': 70, 'sophisticated': 90 }
    }

    return humorCompatibilityMatrix[humor1]?.[humor2] || 70
  }

  /**
   * Analyze topic interest overlap
   */
  analyzeTopicInterestOverlap(
    profile1: CulturalCompatibilityProfile,
    profile2: CulturalCompatibilityProfile
  ): number {
    // Event preferences overlap
    const eventOverlap = this.calculateArrayOverlap(
      profile1.lifestyle_preferences.event_preferences,
      profile2.lifestyle_preferences.event_preferences
    )

    // Cultural activities interest
    const culturalInterest = this.analyzeCulturalInterestOverlap(profile1, profile2)

    // Professional and academic topics
    const professionalOverlap = this.analyzeProfessionalTopicOverlap(profile1, profile2)

    // Portuguese-speaking community topics
    const communityTopicOverlap = this.analyzeCommunityTopicOverlap(profile1, profile2)

    return Math.round(
      eventOverlap * 0.25 +
      culturalInterest * 0.30 +
      professionalOverlap * 0.20 +
      communityTopicOverlap * 0.25
    )
  }

  /**
   * Analyze communication rhythm compatibility
   */
  analyzeCommunicationRhythm(
    profile1: CulturalCompatibilityProfile,
    profile2: CulturalCompatibilityProfile
  ): number {
    // Communication style rhythm analysis
    const style1 = profile1.lifestyle_preferences.communication_style
    const style2 = profile2.lifestyle_preferences.communication_style

    // Conversation style pace compatibility
    const conversationStyle1 = profile1.ai_insights.conversation_style
    const conversationStyle2 = profile2.ai_insights.conversation_style

    const rhythmCompatibility = this.calculateRhythmCompatibility(
      style1, style2, conversationStyle1, conversationStyle2
    )

    // Regional communication patterns
    const regionalRhythm = this.analyzeRegionalCommunicationRhythm(profile1, profile2)

    return Math.round((rhythmCompatibility + regionalRhythm) / 2)
  }

  /**
   * Analyze conflict resolution style compatibility
   */
  analyzeConflictResolutionStyle(
    profile1: CulturalCompatibilityProfile,
    profile2: CulturalCompatibilityProfile
  ): number {
    // Infer conflict resolution styles from cultural background
    const resolutionStyle1 = this.inferConflictResolutionStyle(profile1)
    const resolutionStyle2 = this.inferConflictResolutionStyle(profile2)

    const resolutionCompatibilityMatrix: Record<string, Record<string, number>> = {
      'family_mediated': { 'family_mediated': 95, 'direct_discussion': 75, 'gentle_approach': 85, 'traditional_hierarchy': 80 },
      'direct_discussion': { 'family_mediated': 75, 'direct_discussion': 90, 'gentle_approach': 70, 'traditional_hierarchy': 65 },
      'gentle_approach': { 'family_mediated': 85, 'direct_discussion': 70, 'gentle_approach': 95, 'traditional_hierarchy': 80 },
      'traditional_hierarchy': { 'family_mediated': 80, 'direct_discussion': 65, 'gentle_approach': 80, 'traditional_hierarchy': 90 }
    }

    return resolutionCompatibilityMatrix[resolutionStyle1]?.[resolutionStyle2] || 75
  }

  /**
   * Analyze future vision alignment
   */
  analyzeFutureVisionAlignment(
    profile1: CulturalCompatibilityProfile,
    profile2: CulturalCompatibilityProfile
  ): number {
    // Relationship goals alignment
    const relationshipGoalsOverlap = this.calculateArrayOverlap(
      profile1.lifestyle_preferences.relationship_goals,
      profile2.lifestyle_preferences.relationship_goals
    )

    // Cultural growth potential alignment
    const growthPotentialDiff = Math.abs(
      profile1.ai_insights.cultural_growth_potential -
      profile2.ai_insights.cultural_growth_potential
    )
    const growthAlignment = Math.max(0, 100 - growthPotentialDiff)

    // Community involvement future plans
    const communityInvolvementDiff = Math.abs(
      profile1.lifestyle_preferences.community_involvement -
      profile2.lifestyle_preferences.community_involvement
    )
    const communityAlignment = Math.max(0, 100 - communityInvolvementDiff)

    // Family values future alignment
    const familyValuesDiff = Math.abs(
      profile1.lifestyle_preferences.family_values -
      profile2.lifestyle_preferences.family_values
    )
    const familyAlignment = Math.max(0, 100 - familyValuesDiff)

    return Math.round(
      relationshipGoalsOverlap * 0.30 +
      growthAlignment * 0.25 +
      communityAlignment * 0.25 +
      familyAlignment * 0.20
    )
  }

  /**
   * Calculate geographical compatibility
   */
  calculateGeographicalCompatibility(
    profile1: CulturalCompatibilityProfile,
    profile2: CulturalCompatibilityProfile
  ): number {
    const location1 = profile1.regional_specialization.uk_residence_area
    const location2 = profile2.regional_specialization.uk_residence_area

    // Distance calculation (simplified)
    const distance = this.calculateAreaDistance(location1, location2)
    
    // Travel willingness factor
    const avgTravelWillingness = (
      profile1.regional_specialization.travel_willingness +
      profile2.regional_specialization.travel_willingness
    ) / 2

    // Base score based on distance
    let distanceScore = 100
    if (distance > 20) distanceScore = 70
    if (distance > 40) distanceScore = 50
    if (distance > 60) distanceScore = 30

    // Adjust for travel willingness
    const travelAdjustment = (avgTravelWillingness / 100) * 30
    
    return Math.min(100, Math.round(distanceScore + travelAdjustment))
  }

  /**
   * Analyze cultural center alignment
   */
  analyzeCulturalCenterAlignment(
    profile1: CulturalCompatibilityProfile,
    profile2: CulturalCompatibilityProfile
  ): number {
    // Cultural center affiliations overlap
    const centerOverlap = this.calculateArrayOverlap(
      profile1.regional_specialization.cultural_center_affiliations,
      profile2.regional_specialization.cultural_center_affiliations
    )

    // Proximity to same cultural centers
    const centerProximity = this.analyzeCulturalCenterProximity(profile1, profile2)

    // Cultural center activity level compatibility
    const activityCompatibility = this.analyzeCulturalCenterActivity(profile1, profile2)

    return Math.round(
      centerOverlap * 0.40 +
      centerProximity * 0.35 +
      activityCompatibility * 0.25
    )
  }

  /**
   * Analyze university connections
   */
  analyzeUniversityConnections(
    profile1: CulturalCompatibilityProfile,
    profile2: CulturalCompatibilityProfile
  ): number {
    // Direct university overlap
    const universityOverlap = this.calculateArrayOverlap(
      profile1.regional_specialization.university_connections,
      profile2.regional_specialization.university_connections
    )

    // University partnership network analysis
    const networkCompatibility = this.analyzeUniversityNetworkCompatibility(profile1, profile2)

    // Academic background compatibility
    const academicCompatibility = this.analyzeAcademicCompatibility(profile1, profile2)

    return Math.round(
      universityOverlap * 0.40 +
      networkCompatibility * 0.35 +
      academicCompatibility * 0.25
    )
  }

  /**
   * Analyze travel compatibility
   */
  analyzeTravelCompatibility(
    profile1: CulturalCompatibilityProfile,
    profile2: CulturalCompatibilityProfile
  ): number {
    // Travel willingness similarity
    const travelDiff = Math.abs(
      profile1.regional_specialization.travel_willingness -
      profile2.regional_specialization.travel_willingness
    )
    const travelSimilarity = Math.max(0, 100 - travelDiff)

    // Preferred meeting areas overlap
    const meetingAreasOverlap = this.calculateArrayOverlap(
      profile1.regional_specialization.preferred_meeting_areas,
      profile2.regional_specialization.preferred_meeting_areas
    )

    // Average travel willingness (higher is better for compatibility)
    const avgTravelWillingness = (
      profile1.regional_specialization.travel_willingness +
      profile2.regional_specialization.travel_willingness
    ) / 2

    return Math.round(
      travelSimilarity * 0.40 +
      meetingAreasOverlap * 0.35 +
      avgTravelWillingness * 0.25
    )
  }

  /**
   * Get interaction metrics for a match
   */
  async getInteractionMetrics(matchId: string): Promise<any> {
    try {
      const { data, error } = await this.supabaseClient
        .from('match_interaction_analytics')
        .select('*')
        .eq('match_id', matchId)
        .single()

      if (error || !data) {
        // Return default metrics if no data available
        return {
          message_frequency: 0,
          response_time_avg: 0,
          conversation_depth: 0,
          emoji_usage: 0,
          cultural_references: 0,
          meetup_frequency: 0
        }
      }

      return data
    } catch (error) {
      console.error('Failed to get interaction metrics:', error)
      return {
        message_frequency: 0,
        response_time_avg: 0,
        conversation_depth: 0,
        emoji_usage: 0,
        cultural_references: 0,
        meetup_frequency: 0
      }
    }
  }

  /**
   * Get relationship progression data
   */
  async getRelationshipProgression(matchId: string): Promise<any> {
    try {
      const { data, error } = await this.supabaseClient
        .from('relationship_progression_analytics')
        .select('*')
        .eq('match_id', matchId)
        .single()

      if (error || !data) {
        return {
          initial_interest: 75,
          sustained_engagement: 60,
          meeting_success: 50,
          relationship_satisfaction: 60,
          cultural_bonding: 65
        }
      }

      return data
    } catch (error) {
      console.error('Failed to get relationship progression:', error)
      return {
        initial_interest: 75,
        sustained_engagement: 60,
        meeting_success: 50,
        relationship_satisfaction: 60,
        cultural_bonding: 65
      }
    }
  }

  /**
   * Extract learning features from match data
   */
  async extractLearningFeatures(matchData: any): Promise<any> {
    // Extract features that can be used for machine learning
    return {
      age_difference: Math.abs((matchData.user_1_age || 30) - (matchData.user_2_age || 30)),
      education_similarity: this.calculateEducationSimilarity(matchData),
      career_compatibility: this.calculateCareerCompatibility(matchData),
      lifestyle_alignment: matchData.lifestyle_compatibility || 70,
      cultural_depth_similarity: this.calculateCulturalDepthSimilarity(matchData),
      saudade_resonance: matchData.saudade_resonance || 70,
      regional_proximity: this.calculateRegionalProximity(matchData)
    }
  }

  /**
   * Get potential matches from database
   */
  async getPotentialMatches(userId: string, preferences: any): Promise<any[]> {
    try {
      let query = this.supabaseClient
        .from('profiles')
        .select(`
          *,
          cultural_compatibility_profiles!inner(*)
        `)
        .neq('id', userId)
        .eq('is_active', true)
        .eq('verification_status', 'verified')

      // Apply age range filter
      if (preferences.ageRange) {
        const [minAge, maxAge] = preferences.ageRange
        const currentYear = new Date().getFullYear()
        const maxBirthYear = currentYear - minAge
        const minBirthYear = currentYear - maxAge
        
        query = query
          .gte('date_of_birth', `${minBirthYear}-01-01`)
          .lte('date_of_birth', `${maxBirthYear}-12-31`)
      }

      const { data, error } = await query.limit(50)

      if (error) throw error

      return data || []
    } catch (error) {
      console.error('Failed to get potential matches:', error)
      return []
    }
  }

  /**
   * Generate recommendation reason
   */
  generateRecommendationReason(
    userProfile: CulturalCompatibilityProfile,
    candidateProfile: any,
    matchPrediction: any
  ): string {
    const reasons = []

    if (matchPrediction.cultural_harmony > 85) {
      reasons.push('Strong Portuguese cultural connection')
    }

    if (matchPrediction.saudade_resonance > 80) {
      reasons.push('Deep emotional understanding')
    }

    if (matchPrediction.conversation_potential > 75) {
      reasons.push('Excellent communication compatibility')
    }

    if (matchPrediction.regional_compatibility > 80) {
      reasons.push('Great geographical compatibility')
    }

    if (reasons.length === 0) {
      reasons.push('Good overall compatibility')
    }

    return reasons.slice(0, 2).join(' and ')
  }

  /**
   * Calculate recommendation confidence
   */
  calculateRecommendationConfidence(
    matchPrediction: any,
    userProfile: CulturalCompatibilityProfile
  ): number {
    let confidence = 0.5 // Base confidence

    // High compatibility increases confidence
    if (matchPrediction.compatibility_score > 80) confidence += 0.2
    if (matchPrediction.cultural_harmony > 85) confidence += 0.15
    if (matchPrediction.conversation_potential > 75) confidence += 0.1

    // User profile completeness affects confidence
    const profileCompleteness = this.calculateProfileCompleteness(userProfile)
    confidence += (profileCompleteness / 100) * 0.15

    return Math.min(0.95, confidence)
  }

  /**
   * Track recommendation analytics
   */
  async trackRecommendationAnalytics(userId: string, recommendations: any[]): Promise<void> {
    try {
      await this.supabaseClient
        .from('ai_recommendation_analytics')
        .insert({
          user_id: userId,
          recommendation_count: recommendations.length,
          avg_compatibility_score: recommendations.reduce((sum, rec) => 
            sum + rec.matchPrediction.compatibility_score, 0) / recommendations.length,
          avg_confidence: recommendations.reduce((sum, rec) => 
            sum + rec.aiConfidence, 0) / recommendations.length,
          model_version: '2.0',
          created_at: new Date().toISOString()
        })
    } catch (error) {
      console.error('Failed to track recommendation analytics:', error)
    }
  }

  // Additional Helper Methods

  private calculateDialectOverlap(dialects1: string[], dialects2: string[]): number {
    const overlap = dialects1.filter(d => dialects2.includes(d)).length
    const total = Math.max(dialects1.length, dialects2.length)
    return total > 0 ? (overlap / total) * 100 : 0
  }

  private calculateArrayOverlap(array1: string[], array2: string[]): number {
    const overlap = array1.filter(item => array2.includes(item)).length
    const total = Math.max(array1.length, array2.length)
    return total > 0 ? (overlap / total) * 100 : 0
  }

  private analyzeRegionalCulturalAlignment(
    profile1: CulturalCompatibilityProfile,
    profile2: CulturalCompatibilityProfile
  ): number {
    // Analyze shared regional cultural markers
    const regions1 = profile1.cultural_heritage.portuguese_regions
    const regions2 = profile2.cultural_heritage.portuguese_regions

    const regionOverlap = this.calculateArrayOverlap(regions1, regions2)
    
    // Bonus for complementary regions (e.g., Norte + Lisboa = good urban/traditional mix)
    const complementaryBonus = this.calculateComplementaryRegionBonus(regions1, regions2)

    return Math.min(100, regionOverlap + complementaryBonus)
  }

  private analyzeMusicAlignment(music1: string[], music2: string[]): number {
    return this.calculateArrayOverlap(music1, music2)
  }

  private calculateExpressionStyleMatch(style1: string, style2: string): number {
    const compatibilityMatrix: Record<string, Record<string, number>> = {
      'expressive': { 'expressive': 95, 'reserved': 60, 'balanced': 80 },
      'reserved': { 'expressive': 60, 'reserved': 90, 'balanced': 85 },
      'balanced': { 'expressive': 80, 'reserved': 85, 'balanced': 95 }
    }
    
    return compatibilityMatrix[style1]?.[style2] || 70
  }

  private analyzeSaudadeAlignment(
    profile1: CulturalCompatibilityProfile,
    profile2: CulturalCompatibilityProfile
  ): number {
    const saudade1 = profile1.saudade_analysis
    const saudade2 = profile2.saudade_analysis

    // Multiple factors for saudade alignment
    const emotionalDiff = Math.abs(saudade1.emotional_connection_score - saudade2.emotional_connection_score)
    const homelandDiff = Math.abs(saudade1.homeland_attachment - saudade2.homeland_attachment)
    const nostalgiaDiff = Math.abs(saudade1.cultural_nostalgia_level - saudade2.cultural_nostalgia_level)

    const alignment = (
      Math.max(0, 100 - emotionalDiff) +
      Math.max(0, 100 - homelandDiff) +
      Math.max(0, 100 - nostalgiaDiff)
    ) / 3

    return Math.round(alignment)
  }

  private analyzeCommunicationEmotionalQuotient(
    profile1: CulturalCompatibilityProfile,
    profile2: CulturalCompatibilityProfile
  ): number {
    // Analyze emotional intelligence in communication
    const style1 = profile1.lifestyle_preferences.communication_style
    const style2 = profile2.lifestyle_preferences.communication_style
    const expression1 = profile1.saudade_analysis.emotional_expression_style
    const expression2 = profile2.saudade_analysis.emotional_expression_style

    return this.calculateCommunicationEQCompatibility(style1, style2, expression1, expression2)
  }

  private inferHumorStyle(profile: CulturalCompatibilityProfile): string {
    const region = profile.cultural_heritage.portuguese_regions[0]
    const communicationStyle = profile.lifestyle_preferences.communication_style
    const expressionStyle = profile.saudade_analysis.emotional_expression_style

    // Infer humor style based on cultural background
    if (region === 'norte' && communicationStyle === 'warm') return 'warm_traditional'
    if (region === 'lisboa' && expressionStyle === 'expressive') return 'playful_modern'
    if (communicationStyle === 'formal') return 'sophisticated'
    return 'dry_witty'
  }

  private analyzeCulturalInterestOverlap(
    profile1: CulturalCompatibilityProfile,
    profile2: CulturalCompatibilityProfile
  ): number {
    // Analyze shared cultural interests
    const practices1 = profile1.cultural_heritage.cultural_practices
    const practices2 = profile2.cultural_heritage.cultural_practices
    const music1 = profile1.saudade_analysis.music_emotional_response
    const music2 = profile2.saudade_analysis.music_emotional_response

    const practicesOverlap = this.calculateArrayOverlap(practices1, practices2)
    const musicOverlap = this.calculateArrayOverlap(music1, music2)

    return Math.round((practicesOverlap + musicOverlap) / 2)
  }

  private analyzeProfessionalTopicOverlap(
    profile1: CulturalCompatibilityProfile,
    profile2: CulturalCompatibilityProfile
  ): number {
    // Analyze university connections and professional interests
    const uni1 = profile1.regional_specialization.university_connections
    const uni2 = profile2.regional_specialization.university_connections

    return this.calculateArrayOverlap(uni1, uni2)
  }

  private analyzeCommunityTopicOverlap(
    profile1: CulturalCompatibilityProfile,
    profile2: CulturalCompatibilityProfile
  ): number {
    // Community involvement and cultural center affiliations
    const centers1 = profile1.regional_specialization.cultural_center_affiliations
    const centers2 = profile2.regional_specialization.cultural_center_affiliations

    const centerOverlap = this.calculateArrayOverlap(centers1, centers2)
    
    // Community involvement level similarity
    const involvementDiff = Math.abs(
      profile1.lifestyle_preferences.community_involvement -
      profile2.lifestyle_preferences.community_involvement
    )
    const involvementSimilarity = Math.max(0, 100 - involvementDiff)

    return Math.round((centerOverlap + involvementSimilarity) / 2)
  }

  private calculateRhythmCompatibility(
    style1: string, style2: string, 
    conversation1: string, conversation2: string
  ): number {
    // Communication rhythm compatibility matrix
    const rhythmMatrix: Record<string, number> = {
      'formal-formal': 90,
      'formal-casual': 60,
      'formal-warm': 70,
      'casual-casual': 85,
      'casual-warm': 80,
      'warm-warm': 95
    }

    const styleKey = `${style1}-${style2}`
    const reverseKey = `${style2}-${style1}`
    
    return rhythmMatrix[styleKey] || rhythmMatrix[reverseKey] || 70
  }

  private analyzeRegionalCommunicationRhythm(
    profile1: CulturalCompatibilityProfile,
    profile2: CulturalCompatibilityProfile
  ): number {
    // Regional communication patterns
    const regions1 = profile1.cultural_heritage.portuguese_regions
    const regions2 = profile2.cultural_heritage.portuguese_regions

    // Regional rhythm compatibility (simplified)
    const regionRhythm: Record<string, number> = {
      'norte': 80,    // Traditional, measured
      'centro': 85,   // Balanced, thoughtful
      'lisboa': 90,   // Dynamic, expressive
      'alentejo': 75, // Slow, contemplative
      'algarve': 88,  // Relaxed, friendly
      'acores': 82,   // Close-knit, intimate
      'madeira': 85   // Proud, expressive
    }

    const rhythm1 = regionRhythm[regions1[0]] || 80
    const rhythm2 = regionRhythm[regions2[0]] || 80

    return Math.round((rhythm1 + rhythm2) / 2)
  }

  private inferConflictResolutionStyle(profile: CulturalCompatibilityProfile): string {
    const familyValues = profile.lifestyle_preferences.family_values
    const communicationStyle = profile.lifestyle_preferences.communication_style
    const heritageStrength = profile.cultural_heritage.heritage_strength

    if (familyValues > 85 && heritageStrength > 80) return 'family_mediated'
    if (communicationStyle === 'direct') return 'direct_discussion'
    if (communicationStyle === 'warm') return 'gentle_approach'
    return 'traditional_hierarchy'
  }

  private calculateAreaDistance(area1: string, area2: string): number {
    // Simplified distance calculation between United Kingdom areas
    const distanceMatrix: Record<string, Record<string, number>> = {
      'london_central': { 'london_central': 0, 'london_outer': 15, 'manchester': 200, 'edinburgh': 400 },
      'london_outer': { 'london_central': 15, 'london_outer': 0, 'manchester': 220, 'edinburgh': 420 },
      'manchester': { 'london_central': 200, 'london_outer': 220, 'manchester': 0, 'edinburgh': 220 },
      'edinburgh': { 'london_central': 400, 'london_outer': 420, 'manchester': 220, 'edinburgh': 0 }
    }

    return distanceMatrix[area1]?.[area2] || 100
  }

  private analyzeCulturalCenterProximity(
    profile1: CulturalCompatibilityProfile,
    profile2: CulturalCompatibilityProfile
  ): number {
    // Analyze proximity to shared cultural centers
    const centers1 = profile1.regional_specialization.cultural_center_affiliations
    const centers2 = profile2.regional_specialization.cultural_center_affiliations

    // Find cultural centers both users could access
    const accessibleCenters = this.findAccessibleCulturalCenters(
      profile1.regional_specialization.uk_residence_area,
      profile2.regional_specialization.uk_residence_area
    )

    return accessibleCenters.length > 0 ? 80 : 50
  }

  private analyzeCulturalCenterActivity(
    profile1: CulturalCompatibilityProfile,
    profile2: CulturalCompatibilityProfile
  ): number {
    // Analyze likelihood of both users being active in cultural centers
    const involvement1 = profile1.lifestyle_preferences.community_involvement
    const involvement2 = profile2.lifestyle_preferences.community_involvement

    return Math.round((involvement1 + involvement2) / 2)
  }

  private analyzeUniversityNetworkCompatibility(
    profile1: CulturalCompatibilityProfile,
    profile2: CulturalCompatibilityProfile
  ): number {
    // Analyze university network connections
    const uni1 = profile1.regional_specialization.university_connections
    const uni2 = profile2.regional_specialization.university_connections

    // Check for universities in same city or with partnerships
    const networkCompatibility = this.calculateUniversityNetworkOverlap(uni1, uni2)
    
    return networkCompatibility
  }

  private analyzeAcademicCompatibility(
    profile1: CulturalCompatibilityProfile,
    profile2: CulturalCompatibilityProfile
  ): number {
    // Academic level and field compatibility
    // This would be more sophisticated in a full implementation
    return 75 // Default moderate compatibility
  }

  private calculateEducationSimilarity(matchData: any): number {
    // Calculate education level similarity
    return 80 // Placeholder
  }

  private calculateCareerCompatibility(matchData: any): number {
    // Calculate career field compatibility
    return 75 // Placeholder
  }

  private calculateCulturalDepthSimilarity(matchData: any): number {
    // Calculate cultural depth similarity
    return matchData.cultural_depth_similarity || 70
  }

  private calculateRegionalProximity(matchData: any): number {
    // Calculate regional proximity score
    return matchData.regional_proximity || 80
  }

  private calculateProfileCompleteness(profile: CulturalCompatibilityProfile): number {
    let completeness = 0
    
    // Check various profile elements
    if (profile.cultural_heritage.portuguese_regions.length > 0) completeness += 15
    if (profile.cultural_heritage.heritage_strength > 0) completeness += 15
    if (profile.saudade_analysis.emotional_connection_score > 0) completeness += 15
    if (profile.lifestyle_preferences.event_preferences.length > 0) completeness += 15
    if (profile.regional_specialization.uk_residence_area) completeness += 15
    if (profile.ai_insights.personality_type) completeness += 15
    
    // Additional completeness factors
    completeness += 10 // Base completeness
    
    return Math.min(100, completeness)
  }

  private calculateComplementaryRegionBonus(regions1: string[], regions2: string[]): number {
    // Some regions complement each other well
    const complementaryPairs = [
      ['norte', 'lisboa'],    // Traditional + Modern
      ['alentejo', 'algarve'], // Rural + Coastal
      ['acores', 'madeira']   // Island cultures
    ]

    for (const [region1, region2] of complementaryPairs) {
      if ((regions1.includes(region1) && regions2.includes(region2)) ||
          (regions1.includes(region2) && regions2.includes(region1))) {
        return 10 // Bonus points for complementary regions
      }
    }

    return 0
  }

  private calculateCommunicationEQCompatibility(
    style1: string, style2: string,
    expression1: string, expression2: string
  ): number {
    // Complex EQ compatibility calculation
    const styleScore = this.calculateExpressionStyleMatch(style1, style2)
    const expressionScore = this.calculateExpressionStyleMatch(expression1, expression2)
    
    return Math.round((styleScore + expressionScore) / 2)
  }

  private findAccessibleCulturalCenters(area1: string, area2: string): string[] {
    // Find cultural centers accessible to both areas
    const londonCenters = ['instituto-camoes-london', 'centro-cultural-portugues', 'casa-do-brasil-london']
    
    if (area1.includes('london') && area2.includes('london')) {
      return londonCenters
    }
    
    return []
  }

  private calculateUniversityNetworkOverlap(uni1: string[], uni2: string[]): number {
    // Calculate university network overlap and connections
    const overlap = this.calculateArrayOverlap(uni1, uni2)
    
    // Bonus for universities in same city
    const sameCity = this.checkUniversitiesSameCity(uni1, uni2)
    
    return overlap + (sameCity ? 20 : 0)
  }

  private checkUniversitiesSameCity(uni1: string[], uni2: string[]): boolean {
    // Check if universities are in the same city
    const londonUnis = ['ucl', 'kings-college', 'imperial-college', 'lse']
    
    const hasLondon1 = uni1.some(u => londonUnis.includes(u))
    const hasLondon2 = uni2.some(u => londonUnis.includes(u))
    
    return hasLondon1 && hasLondon2
  }
}

// Export singleton instance
export const aiMatchingEngineHelpers = new AIMatchingEngineHelpers()