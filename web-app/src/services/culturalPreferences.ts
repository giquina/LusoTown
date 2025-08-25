// Cultural Preferences Service
// Handles database operations for the Lusophone cultural preference system

import { supabase } from '@/lib/supabase'
import type {
  CulturalPreferences,
  CulturalCompatibility,
  QuizResults,
  MatchProfile,
  CulturalMatchingConfig
} from '@/types/cultural-preferences'
import { DEFAULT_MATCHING_CONFIG } from '@/types/cultural-preferences'

export class CulturalPreferencesService {
  /**
   * Save or update user's cultural preferences from quiz results
   */
  static async saveCulturalPreferences(
    userId: string, 
    results: QuizResults
  ): Promise<CulturalPreferences | null> {
    try {
      // Convert quiz results to database format
      const preferencesData = {
        user_id: userId,
        origins: results.origin,
        language_preference: results.languagePreference,
        cultural_celebrations: results.culturalCelebrations,
        professional_goals: results.professionalGoals,
        cultural_values: this.processCulturalValues(results.culturalValues),
        lifestyle_preferences: results.lifestyle,
        compatibility_score: results.compatibilityScore || 0,
        cultural_depth_score: this.calculateCulturalDepth(results),
        community_engagement_score: this.calculateCommunityEngagement(results),
        quiz_version: '1.0',
        completed_at: new Date().toISOString(),
        last_updated: new Date().toISOString()
      }

      // Upsert the preferences (insert or update if exists)
      const { data, error } = await supabase
        .from('cultural_preferences')
        .upsert(preferencesData, {
          onConflict: 'user_id',
          ignoreDuplicates: false
        })
        .select()
        .single()

      if (error) {
        console.error('Error saving cultural preferences:', error)
        return null
      }

      // Trigger compatibility score calculation for this user
      await this.updateUserCompatibilityScores(userId)

      return this.transformPreferencesFromDB(data)
    } catch (error) {
      console.error('Error in saveCulturalPreferences:', error)
      return null
    }
  }

  /**
   * Get user's cultural preferences
   */
  static async getCulturalPreferences(userId: string): Promise<CulturalPreferences | null> {
    try {
      const { data, error } = await supabase
        .from('cultural_preferences')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (error || !data) {
        return null
      }

      return this.transformPreferencesFromDB(data)
    } catch (error) {
      console.error('Error getting cultural preferences:', error)
      return null
    }
  }

  /**
   * Get cultural matches for a user
   */
  static async getCulturalMatches(
    userId: string, 
    config: CulturalMatchingConfig = DEFAULT_MATCHING_CONFIG
  ): Promise<MatchProfile[]> {
    try {
      // Get compatibility scores for this user
      const { data: compatibilityData, error: compatibilityError } = await supabase
        .from('cultural_compatibility')
        .select(`
          *,
          user_b:profiles!cultural_compatibility_user_b_id_fkey(
            id,
            first_name,
            last_name,
            bio,
            location,
            profile_picture_url,
            date_of_birth
          )
        `)
        .eq('user_a_id', userId)
        .gte('overall_compatibility', config.minCompatibilityScore)
        .order('overall_compatibility', { ascending: false })
        .limit(config.maxMatches)

      if (compatibilityError || !compatibilityData) {
        console.error('Error getting compatibility data:', compatibilityError)
        return []
      }

      // Transform to match profiles
      const matches: MatchProfile[] = compatibilityData
        .filter(item => item.user_b && item.user_b.first_name)
        .map(item => {
          const user = item.user_b
          const age = this.calculateAge(user.date_of_birth)
          
          return {
            id: item.id,
            userId: user.id,
            name: `${user.first_name} ${user.last_name || ''}`.trim(),
            age,
            location: user.location || 'London',
            photo: user.profile_picture_url,
            bio: user.bio || '',
            compatibility: item.overall_compatibility,
            sharedElements: item.shared_elements || [],
            interests: this.generateInterestsFromSharedElements(item.shared_elements),
            culturalPreferences: {} as CulturalPreferences, // Would need separate query
            lastActive: new Date() // Would need actual last active data
          }
        })

      return matches
    } catch (error) {
      console.error('Error getting cultural matches:', error)
      return []
    }
  }

  /**
   * Get compatibility score between two users
   */
  static async getCompatibilityScore(userAId: string, userBId: string): Promise<CulturalCompatibility | null> {
    try {
      const { data, error } = await supabase
        .from('cultural_compatibility')
        .select('*')
        .or(`and(user_a_id.eq.${userAId},user_b_id.eq.${userBId}),and(user_a_id.eq.${userBId},user_b_id.eq.${userAId})`)
        .single()

      if (error || !data) {
        return null
      }

      return this.transformCompatibilityFromDB(data)
    } catch (error) {
      console.error('Error getting compatibility score:', error)
      return null
    }
  }

  /**
   * Get all Lusophone cultural elements for reference
   */
  static async getPortugueseCulturalElements(): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('portuguese_cultural_elements')
        .select('*')
        .eq('is_active', true)
        .order('popularity_score', { ascending: false })

      if (error) {
        console.error('Error getting cultural elements:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('Error in getPortugueseCulturalElements:', error)
      return []
    }
  }

  /**
   * Get cultural insights for reference
   */
  static async getCulturalInsights(): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('cultural_insights')
        .select('*')
        .eq('is_active', true)
        .order('weight', { ascending: false })

      if (error) {
        console.error('Error getting cultural insights:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('Error in getCulturalInsights:', error)
      return []
    }
  }

  /**
   * Update compatibility scores for a user (private method called after preferences update)
   */
  private static async updateUserCompatibilityScores(userId: string): Promise<void> {
    try {
      // Call the database function to update compatibility scores
      const { error } = await supabase.rpc('update_user_compatibility_scores', {
        target_user_id: userId
      })

      if (error) {
        console.error('Error updating compatibility scores:', error)
      }
    } catch (error) {
      console.error('Error in updateUserCompatibilityScores:', error)
    }
  }

  /**
   * Calculate cultural depth score based on quiz results
   */
  private static calculateCulturalDepth(results: QuizResults): number {
    let score = 40 // Base score

    // More Lusophone origins = higher cultural depth
    score += Math.min(results.origin.length * 10, 20)

    // More cultural celebrations = higher depth
    score += Math.min(results.culturalCelebrations.length * 5, 25)

    // Language preference affects depth
    if (results.languagePreference === 'portuguese_first') score += 10
    if (results.languagePreference === 'bilingual') score += 5

    return Math.min(score, 100)
  }

  /**
   * Calculate community engagement score based on quiz results
   */
  private static calculateCommunityEngagement(results: QuizResults): number {
    let score = 30 // Base score

    // Professional networking goals indicate engagement
    if (results.professionalGoals.length > 0) {
      score += Math.min(results.professionalGoals.length * 8, 25)
    }

    // Certain lifestyle preferences indicate higher engagement
    const engagementLifestyles = ['cultural_enthusiast', 'social_butterfly', 'entrepreneur']
    const engagementCount = results.lifestyle.filter(l => engagementLifestyles.includes(l)).length
    score += engagementCount * 15

    return Math.min(score, 100)
  }

  /**
   * Process cultural values from quiz format to database format
   */
  private static processCulturalValues(values: string[]): Record<string, number> {
    const processedValues: Record<string, number> = {}
    
    values.forEach(value => {
      // Values come in format "key:rating"
      const [key, rating] = value.split(':')
      if (key && rating) {
        processedValues[key] = parseInt(rating, 10) || 0
      }
    })

    return processedValues
  }

  /**
   * Transform database preferences to typed object
   */
  private static transformPreferencesFromDB(data: any): CulturalPreferences {
    return {
      id: data.id,
      userId: data.user_id,
      origins: data.origins || [],
      languagePreference: data.language_preference,
      culturalCelebrations: data.cultural_celebrations || [],
      professionalGoals: data.professional_goals || [],
      culturalValues: data.cultural_values || {},
      lifestylePreferences: data.lifestyle_preferences || [],
      compatibilityScore: data.compatibility_score || 0,
      culturalDepthScore: data.cultural_depth_score || 0,
      communityEngagementScore: data.community_engagement_score || 0,
      completedAt: new Date(data.completed_at),
      lastUpdated: new Date(data.last_updated),
      quizVersion: data.quiz_version || '1.0'
    }
  }

  /**
   * Transform database compatibility to typed object
   */
  private static transformCompatibilityFromDB(data: any): CulturalCompatibility {
    return {
      id: data.id,
      userAId: data.user_a_id,
      userBId: data.user_b_id,
      originCompatibility: data.origin_compatibility || 0,
      languageCompatibility: data.language_compatibility || 0,
      culturalCompatibility: data.cultural_compatibility || 0,
      professionalCompatibility: data.professional_compatibility || 0,
      valuesCompatibility: data.values_compatibility || 0,
      lifestyleCompatibility: data.lifestyle_compatibility || 0,
      overallCompatibility: data.overall_compatibility || 0,
      compatibilityInsights: data.compatibility_insights || [],
      sharedElements: data.shared_elements || [],
      calculatedAt: new Date(data.calculated_at),
      lastUpdated: new Date(data.last_updated)
    }
  }

  /**
   * Calculate age from date of birth
   */
  private static calculateAge(dateOfBirth: string): number {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    
    return age
  }

  /**
   * Generate display interests from shared cultural elements
   */
  private static generateInterestsFromSharedElements(sharedElements: string[]): string[] {
    const elementMap: Record<string, string> = {
      fado: 'Fado Music',
      santos_populares: 'Santos Populares',
      football: 'Lusophone Football',
      gastronomy: 'Lusophone Cuisine',
      christmas_traditions: 'Lusophone Christmas',
      literature_poetry: 'Lusophone Literature',
      religious_traditions: 'Religious Traditions',
      maritime_heritage: 'Maritime Heritage',
      folk_traditions: 'Folk Music',
      crafts_arts: 'Traditional Arts'
    }

    return sharedElements.map(element => elementMap[element] || element).slice(0, 5)
  }
}

// Export commonly used functions
export const {
  saveCulturalPreferences,
  getCulturalPreferences,
  getCulturalMatches,
  getCompatibilityScore,
  getPortugueseCulturalElements,
  getCulturalInsights
} = CulturalPreferencesService