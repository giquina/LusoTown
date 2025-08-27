"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import {
  HeartIcon,
  SparklesIcon,
  HomeIcon,
  MusicalNoteIcon,
  UserGroupIcon,
  GlobeAltIcon,
  ChatBubbleLeftRightIcon,
  StarIcon,
  FireIcon,
  SunIcon,
  MapPinIcon,
  CalendarDaysIcon,
  AcademicCapIcon,
  BookOpenIcon,
  CpuChipIcon, // Alternative to BrainIcon
  ChartBarIcon,
  AdjustmentsHorizontalIcon,
  LightBulbIcon,
  ArrowTrendingUpIcon,
  EyeIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import {
  HeartIcon as HeartSolid,
  StarIcon as StarSolid,
  CpuChipIcon as BrainSolid, // Alternative to BrainIcon
} from '@heroicons/react/24/solid';
import type { SaudadeProfile, CulturalDepthProfile, SaudadeCompatibilityResult, RegionalIdentity } from './SaudadeMatchingSystem';

// AI-Enhanced Matching Types
interface AICompatibilityEngine {
  culturalCompatibilityML: {
    saudadeDepthAnalysis: number;
    heritageConnectionStrength: number;
    languagePreferenceAlignment: number;
    culturalEventCompatibility: number;
    regionalConnectionScore: number;
  };
  behaviorPatterns: {
    communicationStyle: 'formal' | 'casual' | 'cultural';
    eventPreferences: string[];
    socialActivityLevel: number;
    professionalNetworkingInterest: number;
  };
  relationshipSuccessPrediction: number;
  conversationQualityScore: number;
  longTermCompatibilityScore: number;
}

interface MatchLearningData {
  previousMatchSuccess: number;
  userFeedbackScore: number;
  behavioralLearning: string[];
  conversationQuality: number;
  meetupSuccess: boolean;
  relationshipDuration: number;
  improvementSuggestions: string[];
}

interface RegionalOptimization {
  targetRegion: string;
  optimizationScore: number;
  culturalMarkers: string[];
  dialectCompatibility: number;
  traditionalValues: string[];
  connectionStrengths: string[];
}

interface ConversationPrediction {
  topics: string[];
  qualityScore: number;
  engagementPrediction: number;
  culturalDepth: number;
  emotionalConnection: number;
  recommendedApproach: string;
}

interface AIEnhancedMatch {
  id: string;
  userId: string;
  name: string;
  age: number;
  photo: string;
  saudadeProfile: SaudadeProfile;
  culturalProfile: CulturalDepthProfile;
  compatibilityResult: SaudadeCompatibilityResult;
  distance?: number;
  lastActive?: string;
  // AI Enhancement
  aiEngineResult: AICompatibilityEngine;
  learningFeedback: MatchLearningData;
  regionalSpecialization: RegionalOptimization;
  conversationPrediction: ConversationPrediction;
  aiConfidenceScore: number;
}

interface AIEnhancedMatchingEngineProps {
  userProfile: CulturalDepthProfile;
  onMatchSelect: (match: AIEnhancedMatch) => void;
  onStartConversation: (matchId: string) => void;
  onFeedback: (matchId: string, feedback: any) => void;
  showAIInsights?: boolean;
  enableLearning?: boolean;
}

// AI Cultural Learning Engine
class PortugueseCulturalAI {
  static analyzeSaudadeCompatibility(
    user: SaudadeProfile, 
    potential: SaudadeProfile
  ): number {
    // Deep learning simulation for saudade analysis
    const intensityCompatibility = this.calculateSaudadeIntensitySync(user, potential);
    const emotionalResonance = this.calculateEmotionalResonance(user, potential);
    const healingCompatibility = this.calculateHealingCompatibility(user, potential);
    
    return (intensityCompatibility * 0.4 + emotionalResonance * 0.35 + healingCompatibility * 0.25);
  }

  static calculateSaudadeIntensitySync(user: SaudadeProfile, potential: SaudadeProfile): number {
    const intensityDiff = Math.abs(user.saudadeIntensity - potential.saudadeIntensity);
    
    // AI learning: Similar intensity = better emotional understanding
    if (intensityDiff <= 1) return 95;
    if (intensityDiff <= 2) return 85;
    if (intensityDiff <= 3) return 70;
    return Math.max(0, 50 - (intensityDiff * 8));
  }

  static calculateEmotionalResonance(user: SaudadeProfile, potential: SaudadeProfile): number {
    // Analyze shared emotional triggers
    const sharedTriggers = user.triggers.filter(trigger => potential.triggers.includes(trigger));
    const triggerResonance = (sharedTriggers.length / Math.max(user.triggers.length, potential.triggers.length)) * 100;
    
    // Cultural support alignment
    const supportAlignment = user.culturalSupport === potential.culturalSupport ? 100 : 
                           (user.culturalSupport === 'high' && potential.culturalSupport === 'moderate') ? 80 : 60;
    
    return (triggerResonance * 0.6 + supportAlignment * 0.4);
  }

  static calculateHealingCompatibility(user: SaudadeProfile, potential: SaudadeProfile): number {
    const sharedCoping = user.copingMechanisms.filter(mechanism => 
      potential.copingMechanisms.includes(mechanism)
    );
    
    const healingActivities = user.culturalHealingActivities.filter(activity =>
      potential.culturalHealingActivities.includes(activity)
    );
    
    const copingScore = (sharedCoping.length / Math.max(user.copingMechanisms.length, potential.copingMechanisms.length)) * 100;
    const healingScore = (healingActivities.length / Math.max(user.culturalHealingActivities.length, potential.culturalHealingActivities.length)) * 100;
    
    return (copingScore * 0.6 + healingScore * 0.4);
  }

  static predictConversationQuality(
    user: CulturalDepthProfile,
    potential: CulturalDepthProfile
  ): ConversationPrediction {
    // AI prediction of conversation success
    const culturalDepth = (user.overallCulturalDepth + potential.overallCulturalDepth) / 2;
    const languageAlignment = Math.min(
      user.languageFluency.portuguese, 
      potential.languageFluency.portuguese
    ) / 10;
    
    const sharedInterests = this.calculateSharedCulturalInterests(user, potential);
    
    const qualityScore = (culturalDepth * 0.4 + languageAlignment * 100 * 0.3 + sharedInterests * 0.3);
    
    const topics = this.generateConversationTopics(user, potential);
    
    return {
      topics,
      qualityScore: Math.round(qualityScore),
      engagementPrediction: Math.round(qualityScore * 0.9),
      culturalDepth: Math.round(culturalDepth * 10),
      emotionalConnection: Math.round(this.analyzeSaudadeCompatibility(user.saudadeProfile, potential.saudadeProfile)),
      recommendedApproach: this.getRecommendedApproach(user, potential),
    };
  }

  static calculateSharedCulturalInterests(
    user: CulturalDepthProfile,
    potential: CulturalDepthProfile
  ): number {
    const musicAlignment = Object.keys(user.musicArtConnection).filter(key =>
      user.musicArtConnection[key] >= 7 && potential.musicArtConnection[key] >= 7
    ).length * 20;
    
    const foodCompatibility = Math.min(user.foodCookingInvolvement, potential.foodCookingInvolvement) * 10;
    
    const communityAlignment = Math.abs(user.communityInvolvement - potential.communityInvolvement) <= 2 ? 30 : 15;
    
    return Math.min(100, musicAlignment + foodCompatibility + communityAlignment);
  }

  static generateConversationTopics(
    user: CulturalDepthProfile,
    potential: CulturalDepthProfile
  ): string[] {
    const topics: string[] = [];
    
    // Shared saudade experiences
    if (user.saudadeProfile.saudadeIntensity >= 6 && potential.saudadeProfile.saudadeIntensity >= 6) {
      topics.push('Partilhar experiências de saudade em Londres');
    }
    
    // Regional connections
    if (user.regionalPreferences[0]?.region === potential.regionalPreferences[0]?.region) {
      topics.push(`Memórias e tradições de ${user.regionalPreferences[0].region}`);
    }
    
    // Food and cooking
    if (user.foodCookingInvolvement >= 7 && potential.foodCookingInvolvement >= 7) {
      topics.push('Receitas portuguesas e experiências culinárias');
    }
    
    // Music and fado
    if (user.musicArtConnection.fado >= 7 && potential.musicArtConnection.fado >= 7) {
      topics.push('Amor pelo fado e música portuguesa');
    }
    
    // Community involvement
    if (user.communityInvolvement >= 6 && potential.communityInvolvement >= 6) {
      topics.push('Participação na comunidade de falantes de português em Londres');
    }
    
    return topics.slice(0, 4);
  }

  static getRecommendedApproach(
    user: CulturalDepthProfile,
    potential: CulturalDepthProfile
  ): string {
    if (user.saudadeProfile.saudadeIntensity >= 8 && potential.saudadeProfile.saudadeIntensity >= 8) {
      return 'Abordagem emotiva - compartilhem saudade e memórias profundas';
    }
    
    if (user.communityInvolvement >= 8 || potential.communityInvolvement >= 8) {
      return 'Abordagem comunitária - foquem em eventos e tradições portuguesas';
    }
    
    if (user.overallCulturalDepth >= 8 && potential.overallCulturalDepth >= 8) {
      return 'Abordagem cultural - explorem tradições e herança portuguesa';
    }
    
    return 'Abordagem equilibrada - combinem cultura, vida em Londres e aspirações';
  }

  static predictRelationshipSuccess(
    user: CulturalDepthProfile,
    potential: CulturalDepthProfile,
    historicalData?: MatchLearningData
  ): number {
    const baseCompatibility = this.analyzeSaudadeCompatibility(user.saudadeProfile, potential.saudadeProfile);
    const culturalAlignment = Math.abs(user.overallCulturalDepth - potential.overallCulturalDepth) <= 2 ? 90 : 70;
    const valueAlignment = Math.abs(user.familyValuesImportance - potential.familyValuesImportance) <= 1 ? 85 : 65;
    
    let learningBonus = 0;
    if (historicalData) {
      learningBonus = historicalData.previousMatchSuccess * 0.2;
    }
    
    return Math.round((baseCompatibility * 0.4 + culturalAlignment * 0.3 + valueAlignment * 0.3) + learningBonus);
  }
}

// Regional Specialization AI
class RegionalMatchingAI {
  static optimizeForRegion(
    userRegion: string,
    potentialRegion: string,
    userProfile: CulturalDepthProfile
  ): RegionalOptimization {
    const regionalData = this.getRegionalData();
    const userRegionData = regionalData[userRegion] || regionalData.general;
    const potentialRegionData = regionalData[potentialRegion] || regionalData.general;
    
    const compatibility = this.calculateRegionalCompatibility(userRegionData, potentialRegionData);
    const culturalMarkers = this.getSharedCulturalMarkers(userRegionData, potentialRegionData);
    
    return {
      targetRegion: potentialRegion,
      optimizationScore: compatibility,
      culturalMarkers,
      dialectCompatibility: this.calculateDialectCompatibility(userRegion, potentialRegion),
      traditionalValues: this.getSharedValues(userRegionData, potentialRegionData),
      connectionStrengths: this.getConnectionStrengths(userRegionData, potentialRegionData),
    };
  }

  static getRegionalData() {
    return {
      minho: {
        characteristics: ['traditional', 'family_oriented', 'rural_connection'],
        traditions: ['vinho_verde', 'folk_festivals', 'pilgrimage'],
        values: ['family_loyalty', 'land_connection', 'religious_traditions'],
        dialect: 'northern',
      },
      porto_norte: {
        characteristics: ['proud', 'industrious', 'football_culture'],
        traditions: ['santos_populares', 'francesinha', 'river_culture'],
        values: ['hard_work', 'regional_pride', 'direct_communication'],
        dialect: 'northern',
      },
      lisboa_area: {
        characteristics: ['cosmopolitan', 'cultural', 'modern'],
        traditions: ['fado', 'pasteis_belem', 'urban_culture'],
        values: ['education', 'arts', 'progressive_thinking'],
        dialect: 'central',
      },
      centro_coimbra: {
        characteristics: ['academic', 'historical', 'intellectual'],
        traditions: ['university_traditions', 'student_culture', 'historical_pride'],
        values: ['education', 'tradition', 'intellectual_pursuit'],
        dialect: 'central',
      },
      alentejo: {
        characteristics: ['calm', 'traditional', 'rural'],
        traditions: ['cork_culture', 'countryside_festivals', 'slow_living'],
        values: ['simplicity', 'nature_connection', 'contemplation'],
        dialect: 'southern',
      },
      algarve: {
        characteristics: ['coastal', 'relaxed', 'tourism_aware'],
        traditions: ['fishing_culture', 'beach_festivals', 'seafood'],
        values: ['relaxation', 'sea_connection', 'hospitality'],
        dialect: 'southern',
      },
      acores: {
        characteristics: ['island_identity', 'close_community', 'emigration_culture'],
        traditions: ['azorean_festivals', 'island_traditions', 'diaspora_connections'],
        values: ['community_solidarity', 'island_pride', 'family_connections'],
        dialect: 'azorean',
      },
      madeira: {
        characteristics: ['island_pride', 'unique_culture', 'beautiful_landscape'],
        traditions: ['madeira_wine', 'folklore', 'island_festivals'],
        values: ['island_identity', 'beauty_appreciation', 'cultural_preservation'],
        dialect: 'madeiran',
      },
      general: {
        characteristics: ['portuguese_identity', 'mixed_regions', 'adaptable'],
        traditions: ['portuguese_culture', 'general_traditions'],
        values: ['portuguese_pride', 'cultural_preservation'],
        dialect: 'standard',
      },
    };
  }

  static calculateRegionalCompatibility(region1: any, region2: any): number {
    const sharedCharacteristics = region1.characteristics.filter((char: string) =>
      region2.characteristics.includes(char)
    ).length;
    
    const sharedTraditions = region1.traditions.filter((trad: string) =>
      region2.traditions.includes(trad)
    ).length;
    
    const sharedValues = region1.values.filter((val: string) =>
      region2.values.includes(val)
    ).length;
    
    return Math.round(
      (sharedCharacteristics * 30 + sharedTraditions * 25 + sharedValues * 45) / 
      Math.max(region1.characteristics.length + region1.traditions.length + region1.values.length, 1) * 10
    );
  }

  static calculateDialectCompatibility(region1: string, region2: string): number {
    const regionalData = this.getRegionalData();
    const dialect1 = regionalData[region1]?.dialect || 'standard';
    const dialect2 = regionalData[region2]?.dialect || 'standard';
    
    if (dialect1 === dialect2) return 100;
    if ((dialect1 === 'northern' && dialect2 === 'central') || 
        (dialect1 === 'central' && dialect2 === 'northern')) return 85;
    if ((dialect1 === 'central' && dialect2 === 'southern') || 
        (dialect1 === 'southern' && dialect2 === 'central')) return 80;
    if (dialect1 === 'standard' || dialect2 === 'standard') return 90;
    return 70;
  }

  static getSharedCulturalMarkers(region1: any, region2: any): string[] {
    return [...region1.characteristics, ...region1.traditions].filter(marker =>
      [...region2.characteristics, ...region2.traditions].includes(marker)
    ).slice(0, 4);
  }

  static getSharedValues(region1: any, region2: any): string[] {
    return region1.values.filter((val: string) => region2.values.includes(val));
  }

  static getConnectionStrengths(region1: any, region2: any): string[] {
    const strengths: string[] = [];
    
    if (region1.characteristics.includes('traditional') && region2.characteristics.includes('traditional')) {
      strengths.push('Forte ligação às tradições');
    }
    
    if (region1.values.includes('family_loyalty') && region2.values.includes('family_loyalty')) {
      strengths.push('Valores familiares partilhados');
    }
    
    if (region1.dialect === region2.dialect) {
      strengths.push('Compatibilidade dialetal');
    }
    
    return strengths;
  }
}

export default function AIEnhancedMatchingEngine({
  userProfile,
  onMatchSelect,
  onStartConversation,
  onFeedback,
  showAIInsights = true,
  enableLearning = true,
}: AIEnhancedMatchingEngineProps) {
  const { language } = useLanguage();
  const [aiMatches, setAiMatches] = useState<AIEnhancedMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState<AIEnhancedMatch | null>(null);
  const [showAIAnalysis, setShowAIAnalysis] = useState(false);
  const [learningMode, setLearningMode] = useState(enableLearning);

  useEffect(() => {
    findAIEnhancedMatches();
  }, [userProfile]);

  const findAIEnhancedMatches = async () => {
    setLoading(true);
    
    // Simulate AI matching with enhanced algorithms
    const mockMatches = generateAIEnhancedMockMatches(userProfile);
    
    // Apply AI analysis to each match
    const analyzedMatches = mockMatches.map(match => {
      const aiResult = performAIAnalysis(userProfile, match);
      return {
        ...match,
        ...aiResult,
      };
    });

    // Sort by AI confidence and compatibility
    analyzedMatches.sort((a, b) => {
      const scoreA = a.aiConfidenceScore * 0.6 + a.compatibilityResult.compatibilityScore * 0.4;
      const scoreB = b.aiConfidenceScore * 0.6 + b.compatibilityResult.compatibilityScore * 0.4;
      return scoreB - scoreA;
    });

    setAiMatches(analyzedMatches);
    setLoading(false);
  };

  const performAIAnalysis = (user: CulturalDepthProfile, match: any): Partial<AIEnhancedMatch> => {
    // Cultural Compatibility ML Analysis
    const culturalCompatibilityML = {
      saudadeDepthAnalysis: PortugueseCulturalAI.analyzeSaudadeCompatibility(
        user.saudadeProfile, 
        match.saudadeProfile
      ),
      heritageConnectionStrength: Math.abs(user.overallCulturalDepth - match.culturalProfile.overallCulturalDepth) <= 2 ? 95 : 75,
      languagePreferenceAlignment: Math.min(user.languageFluency.portuguese, match.culturalProfile.languageFluency.portuguese) * 10,
      culturalEventCompatibility: Math.min(user.communityInvolvement, match.culturalProfile.communityInvolvement) * 12,
      regionalConnectionScore: user.regionalPreferences[0]?.region === match.saudadeProfile.regionalIdentity.region ? 100 : 70,
    };

    // Behavior Pattern Analysis
    const behaviorPatterns = {
      communicationStyle: determineCommunicationStyle(user, match.culturalProfile),
      eventPreferences: generateEventPreferences(user, match.culturalProfile),
      socialActivityLevel: Math.round((user.communityInvolvement + match.culturalProfile.communityInvolvement) / 2),
      professionalNetworkingInterest: Math.round((user.communityLeadership + match.culturalProfile.communityLeadership) / 2),
    };

    // Success Predictions
    const relationshipSuccessPrediction = PortugueseCulturalAI.predictRelationshipSuccess(user, match.culturalProfile);
    const conversationPrediction = PortugueseCulturalAI.predictConversationQuality(user, match.culturalProfile);

    // Regional Specialization
    const regionalSpecialization = RegionalMatchingAI.optimizeForRegion(
      user.regionalPreferences[0]?.region || 'general',
      match.saudadeProfile.regionalIdentity.region,
      user
    );

    // Learning Feedback (simulated historical data)
    const learningFeedback: MatchLearningData = {
      previousMatchSuccess: Math.round(Math.random() * 40 + 60), // 60-100%
      userFeedbackScore: Math.round(Math.random() * 30 + 70), // 70-100%
      behavioralLearning: generateBehavioralLearning(user),
      conversationQuality: conversationPrediction.qualityScore,
      meetupSuccess: Math.random() > 0.3,
      relationshipDuration: Math.round(Math.random() * 12), // months
      improvementSuggestions: generateImprovementSuggestions(user, match.culturalProfile),
    };

    return {
      aiEngineResult: {
        culturalCompatibilityML,
        behaviorPatterns,
        relationshipSuccessPrediction,
        conversationQualityScore: conversationPrediction.qualityScore,
        longTermCompatibilityScore: Math.round(
          (relationshipSuccessPrediction * 0.4 + 
           culturalCompatibilityML.saudadeDepthAnalysis * 0.3 + 
           culturalCompatibilityML.heritageConnectionStrength * 0.3)
        ),
      },
      learningFeedback,
      regionalSpecialization,
      conversationPrediction,
      aiConfidenceScore: Math.round(
        (culturalCompatibilityML.saudadeDepthAnalysis * 0.3 +
         relationshipSuccessPrediction * 0.3 +
         conversationPrediction.qualityScore * 0.2 +
         learningFeedback.previousMatchSuccess * 0.2)
      ),
    };
  };

  const determineCommunicationStyle = (user: CulturalDepthProfile, potential: CulturalDepthProfile): 'formal' | 'casual' | 'cultural' => {
    if (user.saudadeProfile.saudadeIntensity >= 7 && potential.saudadeProfile.saudadeIntensity >= 7) {
      return 'cultural';
    }
    if (user.overallCulturalDepth >= 8 || potential.overallCulturalDepth >= 8) {
      return 'formal';
    }
    return 'casual';
  };

  const generateEventPreferences = (user: CulturalDepthProfile, potential: CulturalDepthProfile): string[] => {
    const preferences: string[] = [];
    
    if (user.musicArtConnection.fado >= 7 && potential.musicArtConnection.fado >= 7) {
      preferences.push('fado_events');
    }
    if (user.foodCookingInvolvement >= 7 && potential.foodCookingInvolvement >= 7) {
      preferences.push('cooking_workshops');
    }
    if (user.communityInvolvement >= 7 && potential.communityInvolvement >= 7) {
      preferences.push('community_gatherings');
    }
    
    return preferences;
  };

  const generateBehavioralLearning = (user: CulturalDepthProfile): string[] => {
    const learnings: string[] = [];
    
    if (user.saudadeProfile.saudadeIntensity >= 8) {
      learnings.push('high_saudade_compatibility');
    }
    if (user.communityInvolvement >= 8) {
      learnings.push('community_focused_matching');
    }
    if (user.overallCulturalDepth >= 8) {
      learnings.push('deep_cultural_connections');
    }
    
    return learnings;
  };

  const generateImprovementSuggestions = (user: CulturalDepthProfile, potential: CulturalDepthProfile): string[] => {
    const suggestions: string[] = [];
    
    if (Math.abs(user.saudadeProfile.saudadeIntensity - potential.saudadeProfile.saudadeIntensity) >= 3) {
      suggestions.push(language === 'pt' ? 'Discutir diferentes níveis de saudade' : 'Discuss different saudade levels');
    }
    
    if (user.regionalPreferences[0]?.region !== potential.regionalPreferences[0]?.region) {
      suggestions.push(language === 'pt' ? 'Explorar tradições regionais diferentes' : 'Explore different regional traditions');
    }
    
    return suggestions;
  };

  const generateAIEnhancedMockMatches = (userProfile: CulturalDepthProfile): Omit<AIEnhancedMatch, 'aiEngineResult' | 'learningFeedback' | 'regionalSpecialization' | 'conversationPrediction' | 'aiConfidenceScore'>[] => {
    return [
      {
        id: 'ai_1',
        userId: 'ai_user_1',
        name: 'Maria',
        age: 31,
        photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b1c5?w=150&h=150&fit=crop&crop=face',
        distance: 1.8,
        lastActive: '1 hour ago',
        saudadeProfile: {
          saudadeIntensity: userProfile.saudadeProfile.saudadeIntensity + 1,
          frequency: 'weekly',
          triggers: ['fado_music', 'grandmother_recipes', 'portuguese_countryside'],
          copingMechanisms: ['cook_portuguese', 'listen_fado', 'call_family'],
          homelandConnection: 9,
          languageEmotionalAttachment: 9,
          culturalSupport: 'high',
          regionalIdentity: {
            region: 'minho',
            connection: 9,
            specificAreas: ['Braga', 'Viana do Castelo'],
            traditions: ['Romarias', 'Vinho Verde'],
            culturalMarkers: ['Northern tradition', 'Folk festivals'],
          },
          heritagePreservation: 9,
          integrationBalance: 3,
          emotionalCompatibilityType: 'Alma Saudosa',
          supportNeeds: ['understanding_saudade', 'share_traditions'],
          culturalHealingActivities: ['Fado therapy', 'Traditional cooking'],
        },
        culturalProfile: {
          ...userProfile,
          overallCulturalDepth: 9.2,
        },
        compatibilityResult: {
          compatibilityScore: 93,
          saudadeAlignment: 96,
          emotionalSupport: 95,
          culturalDepth: 92,
          heritageAlignment: 94,
          copingCompatibility: 88,
          recommendedActivities: ['Noites de fado íntimas', 'Cozinhar pratos tradicionais'],
          supportStrengths: ['Compreensão profunda da saudade', 'Compromisso cultural'],
          potentialChallenges: [],
          connectionType: 'saudade_soulmate',
        },
      },
      {
        id: 'ai_2',
        userId: 'ai_user_2',
        name: 'João',
        age: 35,
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        distance: 3.2,
        lastActive: '2 hours ago',
        saudadeProfile: {
          saudadeIntensity: userProfile.saudadeProfile.saudadeIntensity,
          frequency: 'monthly',
          triggers: ['santos_populares', 'portuguese_films', 'family_voices'],
          copingMechanisms: ['portuguese_community', 'visit_portugal', 'portuguese_media'],
          homelandConnection: 8,
          languageEmotionalAttachment: 8,
          culturalSupport: 'moderate',
          regionalIdentity: {
            region: 'porto_norte',
            connection: 8,
            specificAreas: ['Porto', 'Matosinhos'],
            traditions: ['Francesinha', 'São João'],
            culturalMarkers: ['Football culture', 'River tradition'],
          },
          heritagePreservation: 7,
          integrationBalance: 5,
          emotionalCompatibilityType: 'Construtor de Pontes',
          supportNeeds: ['community_building', 'cultural_healing'],
          culturalHealingActivities: ['Community events', 'Sports culture'],
        },
        culturalProfile: {
          ...userProfile,
          overallCulturalDepth: 7.8,
        },
        compatibilityResult: {
          compatibilityScore: 85,
          saudadeAlignment: 88,
          emotionalSupport: 82,
          culturalDepth: 85,
          heritageAlignment: 83,
          copingCompatibility: 79,
          recommendedActivities: ['Eventos comunitários', 'Visitas a Portugal'],
          supportStrengths: ['Construção de comunidade', 'Equilibrio cultural'],
          potentialChallenges: ['Diferentes intensidades de saudade'],
          connectionType: 'integration_partner',
        },
      },
      {
        id: 'ai_3',
        userId: 'ai_user_3',
        name: 'Sofia',
        age: 28,
        photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        distance: 2.1,
        lastActive: '30 minutes ago',
        saudadeProfile: {
          saudadeIntensity: userProfile.saudadeProfile.saudadeIntensity + 2,
          frequency: 'constant',
          triggers: ['ocean_waves', 'fado_music', 'azorean_festivals'],
          copingMechanisms: ['embrace_sadness', 'listen_fado', 'cook_portuguese'],
          homelandConnection: 10,
          languageEmotionalAttachment: 10,
          culturalSupport: 'high',
          regionalIdentity: {
            region: 'acores',
            connection: 10,
            specificAreas: ['São Miguel', 'Terceira'],
            traditions: ['Island festivals', 'Azorean traditions'],
            culturalMarkers: ['Island identity', 'Emigration culture'],
          },
          heritagePreservation: 10,
          integrationBalance: 2,
          emotionalCompatibilityType: 'Alma Saudosa',
          supportNeeds: ['understanding_saudade', 'cultural_healing'],
          culturalHealingActivities: ['Island festivals', 'Traditional music'],
        },
        culturalProfile: {
          ...userProfile,
          overallCulturalDepth: 9.5,
        },
        compatibilityResult: {
          compatibilityScore: 89,
          saudadeAlignment: 92,
          emotionalSupport: 90,
          culturalDepth: 88,
          heritageAlignment: 91,
          copingCompatibility: 82,
          recommendedActivities: ['Festivais açorianos', 'Terapia através do fado'],
          supportStrengths: ['Intensidade emocional partilhada', 'Identidade insular'],
          potentialChallenges: ['Intensidade muito alta de saudade'],
          connectionType: 'cultural_healer',
        },
      },
    ];
  };

  const getAIInsightIcon = (type: string) => {
    switch (type) {
      case 'ml': return BrainSolid;
  case 'prediction': return ArrowTrendingUpIcon;
      case 'learning': return LightBulbIcon;
      case 'regional': return GlobeAltIcon;
      default: return SparklesIcon;
    }
  };

  const getConnectionTypeIcon = (type: SaudadeCompatibilityResult['connectionType']) => {
    switch (type) {
      case 'saudade_soulmate': return HeartSolid;
  case 'cultural_healer': return HeartIcon;
      case 'heritage_guardian': return HomeIcon;
      case 'integration_partner': return UserGroupIcon;
      default: return SparklesIcon;
    }
  };

  const getConnectionTypeLabel = (type: SaudadeCompatibilityResult['connectionType']) => {
    const labels = {
      saudade_soulmate: language === 'pt' ? 'Alma Gémea de Saudade' : 'Saudade Soulmate',
      cultural_healer: language === 'pt' ? 'Curador Cultural' : 'Cultural Healer',
      heritage_guardian: language === 'pt' ? 'Guardião da Herança' : 'Heritage Guardian',
      integration_partner: language === 'pt' ? 'Parceiro de Integração' : 'Integration Partner',
      gentle_companion: language === 'pt' ? 'Companheiro Gentil' : 'Gentle Companion',
    };
    return labels[type];
  };

  const getAIConfidenceColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 80) return 'text-blue-600 bg-blue-50';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-gray-600 bg-gray-50';
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-2xl p-6 h-64"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* AI Enhancement Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <BrainSolid className="w-8 h-8 text-purple-600" />
          <h2 className="text-2xl font-bold text-primary-900">
            {language === 'pt' ? 'Matches Inteligentes Personalizados' : 'Personalized Intelligent Matches'}
          </h2>
          <div className="flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
            <SparklesIcon className="w-4 h-4" />
            {language === 'pt' ? 'Aprendizagem Ativa' : 'Active Learning'}
          </div>
        </div>
        <p className="text-gray-600 max-w-3xl mx-auto">
          {language === 'pt' 
            ? 'Sistema inteligente que aprende com a cultura portuguesa e melhora continuamente para encontrar conexões emocionais autênticas baseadas em saudade e compatibilidade cultural'
            : 'Intelligent system that learns Portuguese culture and continuously improves to find authentic emotional connections based on saudade and cultural compatibility'}
        </p>
      </div>

      {/* AI Learning Toggle */}
      {enableLearning && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CpuChipIcon className="w-6 h-6 text-purple-600" />
              <div>
                <h3 className="font-semibold text-gray-900">
                  {language === 'pt' ? 'Modo de Aprendizagem Inteligente' : 'Smart Learning Mode'}
                </h3>
                <p className="text-sm text-gray-600">
                  {language === 'pt' 
                    ? 'O sistema inteligente aprende com suas interações para melhorar futuras recomendações'
                    : 'Smart system learns from your interactions to improve future recommendations'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setLearningMode(!learningMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                learningMode ? 'bg-purple-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  learningMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      )}

      {/* AI-Enhanced Matches */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {aiMatches.map((match) => {
          const IconComponent = getConnectionTypeIcon(match.compatibilityResult.connectionType);
          
          return (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              {/* AI Enhancement Badge */}
              <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <BrainSolid className="w-3 h-3" />
                AI {match.aiConfidenceScore}%
              </div>

              {/* Profile Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <img
                    src={match.photo}
                    alt={match.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-red-500 to-primary-500 rounded-full flex items-center justify-center">
                    <IconComponent className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-gray-900">{match.name}</h3>
                    <span className="text-sm text-gray-500">{match.age}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPinIcon className="w-4 h-4" />
                    <span>{match.distance}km away</span>
                    <span>•</span>
                    <span>{match.lastActive}</span>
                  </div>
                </div>
              </div>

              {/* AI Compatibility Scores */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    {language === 'pt' ? 'Compatibilidade IA' : 'AI Compatibility'}
                  </span>
                  <span className={`text-sm font-bold px-2 py-1 rounded-full ${getAIConfidenceColor(match.aiEngineResult.longTermCompatibilityScore)}`}>
                    {match.aiEngineResult.longTermCompatibilityScore}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${match.aiEngineResult.longTermCompatibilityScore}%` }}
                  />
                </div>
              </div>

              {/* Connection Type */}
              <div className="mb-4">
                <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-red-50 to-primary-50 rounded-lg">
                  <IconComponent className="w-5 h-5 text-red-600" />
                  <span className="text-sm font-medium text-red-800">
                    {getConnectionTypeLabel(match.compatibilityResult.connectionType)}
                  </span>
                </div>
              </div>

              {/* AI Insights Grid */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-600">
                    {Math.round(match.aiEngineResult.culturalCompatibilityML.saudadeDepthAnalysis)}%
                  </div>
                  <div className="text-xs text-gray-600">
                    {language === 'pt' ? 'Saudade' : 'Saudade'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">
                    {match.conversationPrediction.qualityScore}%
                  </div>
                  <div className="text-xs text-gray-600">
                    {language === 'pt' ? 'Conversa' : 'Conversation'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">
                    {match.regionalSpecialization.optimizationScore}%
                  </div>
                  <div className="text-xs text-gray-600">
                    {language === 'pt' ? 'Regional' : 'Regional'}
                  </div>
                </div>
              </div>

              {/* Learning Feedback */}
              {learningMode && (
                <div className="mb-4 p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <LightBulbIcon className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-800">
                      {language === 'pt' ? 'Aprendizagem Inteligente' : 'Smart Learning'}
                    </span>
                  </div>
                  <div className="text-xs text-purple-700">
                    {language === 'pt' 
                      ? `${match.learningFeedback.previousMatchSuccess}% de sucesso em matches similares`
                      : `${match.learningFeedback.previousMatchSuccess}% success in similar matches`}
                  </div>
                </div>
              )}

              {/* AI Recommended Topics */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  {language === 'pt' ? 'Tópicos IA Recomendados:' : 'AI Recommended Topics:'}
                </h4>
                <div className="flex flex-wrap gap-1">
                  {match.conversationPrediction.topics.slice(0, 2).map((topic, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => onStartConversation(match.id)}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
                >
                  {language === 'pt' ? 'Conversar com IA' : 'AI-Powered Chat'}
                </button>
                <button
                  onClick={() => {
                    setSelectedMatch(match);
                    setShowAIAnalysis(true);
                  }}
                  className="px-4 py-2 border border-purple-300 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-50 transition-colors"
                >
                  {language === 'pt' ? 'Análise IA' : 'AI Analysis'}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* AI Analysis Modal */}
      {showAIAnalysis && selectedMatch && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <BrainSolid className="w-8 h-8 text-purple-600" />
                <h3 className="text-xl font-bold text-primary-900">
                  {language === 'pt' ? 'Análise Inteligente de Compatibilidade' : 'Intelligent Compatibility Analysis'}
                </h3>
              </div>
              <button
                onClick={() => setShowAIAnalysis(false)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                ×
              </button>
            </div>

            {/* AI Analysis Content */}
            <div className="space-y-6">
              {/* Profile Summary */}
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
                <img
                  src={selectedMatch.photo}
                  alt={selectedMatch.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{selectedMatch.name}</h4>
                  <p className="text-sm text-gray-600">
                    {getConnectionTypeLabel(selectedMatch.compatibilityResult.connectionType)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className={`px-2 py-1 rounded-full text-xs font-semibold ${getAIConfidenceColor(selectedMatch.aiConfidenceScore)}`}>
                      AI Confidence: {selectedMatch.aiConfidenceScore}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Cultural Compatibility ML Analysis */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <BrainSolid className="w-5 h-5 text-purple-600" />
                  {language === 'pt' ? 'Análise de Machine Learning Cultural' : 'Cultural Machine Learning Analysis'}
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">
                      {language === 'pt' ? 'Análise de Saudade' : 'Saudade Analysis'}
                    </div>
                    <div className="text-xl font-bold text-purple-600">
                      {Math.round(selectedMatch.aiEngineResult.culturalCompatibilityML.saudadeDepthAnalysis)}%
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">
                      {language === 'pt' ? 'Conexão de Herança' : 'Heritage Connection'}
                    </div>
                    <div className="text-xl font-bold text-blue-600">
                      {selectedMatch.aiEngineResult.culturalCompatibilityML.heritageConnectionStrength}%
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">
                      {language === 'pt' ? 'Alinhamento Linguístico' : 'Language Alignment'}
                    </div>
                    <div className="text-xl font-bold text-green-600">
                      {Math.round(selectedMatch.aiEngineResult.culturalCompatibilityML.languagePreferenceAlignment)}%
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">
                      {language === 'pt' ? 'Eventos Culturais' : 'Cultural Events'}
                    </div>
                    <div className="text-xl font-bold text-orange-600">
                      {Math.round(selectedMatch.aiEngineResult.culturalCompatibilityML.culturalEventCompatibility)}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Conversation Quality Prediction */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <ChatBubbleLeftRightIcon className="w-5 h-5 text-blue-600" />
                  {language === 'pt' ? 'Previsão de Qualidade da Conversa' : 'Conversation Quality Prediction'}
                </h4>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-blue-800">
                      {language === 'pt' ? 'Qualidade Prevista' : 'Predicted Quality'}
                    </span>
                    <span className="text-lg font-bold text-blue-600">
                      {selectedMatch.conversationPrediction.qualityScore}%
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-blue-700">
                      <strong>{language === 'pt' ? 'Abordagem Recomendada:' : 'Recommended Approach:'}</strong> {selectedMatch.conversationPrediction.recommendedApproach}
                    </div>
                    <div className="text-sm text-blue-700">
                      <strong>{language === 'pt' ? 'Tópicos Sugeridos:' : 'Suggested Topics:'}</strong>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedMatch.conversationPrediction.topics.map((topic, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Regional Specialization */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <GlobeAltIcon className="w-5 h-5 text-green-600" />
                  {language === 'pt' ? 'Especialização Regional' : 'Regional Specialization'}
                </h4>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-green-800">
                      {language === 'pt' ? 'Compatibilidade Regional' : 'Regional Compatibility'}
                    </span>
                    <span className="text-lg font-bold text-green-600">
                      {selectedMatch.regionalSpecialization.optimizationScore}%
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-green-700">
                      <strong>{language === 'pt' ? 'Região:' : 'Region:'}</strong> {selectedMatch.regionalSpecialization.targetRegion}
                    </div>
                    {selectedMatch.regionalSpecialization.culturalMarkers.length > 0 && (
                      <div className="text-sm text-green-700">
                        <strong>{language === 'pt' ? 'Marcadores Culturais:' : 'Cultural Markers:'}</strong>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedMatch.regionalSpecialization.culturalMarkers.map((marker, idx) => (
                            <span key={idx} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                              {marker}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Learning Feedback */}
              {learningMode && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <ArrowTrendingUpIcon className="w-5 h-5 text-orange-600" />
                    {language === 'pt' ? 'Dados de Aprendizagem Inteligente' : 'Smart Learning Data'}
                  </h4>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-orange-700 mb-1">
                          {language === 'pt' ? 'Sucesso em Matches Similares' : 'Success in Similar Matches'}
                        </div>
                        <div className="text-lg font-bold text-orange-600">
                          {selectedMatch.learningFeedback.previousMatchSuccess}%
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-orange-700 mb-1">
                          {language === 'pt' ? 'Feedback dos Utilizadores' : 'User Feedback Score'}
                        </div>
                        <div className="text-lg font-bold text-orange-600">
                          {selectedMatch.learningFeedback.userFeedbackScore}%
                        </div>
                      </div>
                    </div>
                    {selectedMatch.learningFeedback.improvementSuggestions.length > 0 && (
                      <div className="mt-3">
                        <div className="text-sm text-orange-700 font-medium mb-2">
                          {language === 'pt' ? 'Sugestões de Melhoria:' : 'Improvement Suggestions:'}
                        </div>
                        <div className="space-y-1">
                          {selectedMatch.learningFeedback.improvementSuggestions.map((suggestion, idx) => (
                            <div key={idx} className="text-sm text-orange-700 flex items-center gap-2">
                              <LightBulbIcon className="w-3 h-3" />
                              {suggestion}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowAIAnalysis(false);
                    onStartConversation(selectedMatch.id);
                  }}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
                >
                  {language === 'pt' ? 'Iniciar Conversa Inteligente' : 'Start Intelligent Conversation'}
                </button>
                {learningMode && (
                  <button
                    onClick={() => {
                      onFeedback(selectedMatch.id, { positive: true });
                      setShowAIAnalysis(false);
                    }}
                    className="px-6 py-3 bg-green-100 text-green-700 rounded-xl font-medium hover:bg-green-200 transition-colors"
                  >
                    {language === 'pt' ? 'Feedback Positivo' : 'Positive Feedback'}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}