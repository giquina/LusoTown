"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import {
  BrainIcon,
  ChartBarIcon,
  LightBulbIcon,
  TrendingUpIcon,
  UserGroupIcon,
  HeartIcon,
  ClockIcon,
  EyeIcon,
  AdjustmentsHorizontalIcon,
  SparklesIcon,
  BookOpenIcon,
  ArrowTrendingUpIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import {
  BrainIcon as BrainSolid,
  HeartIcon as HeartSolid,
  StarIcon as StarSolid,
} from '@heroicons/react/24/solid';
import type { SaudadeProfile, CulturalDepthProfile } from './SaudadeMatchingSystem';

// Behavioral Learning Types
interface UserBehaviorPattern {
  userId: string;
  interactionHistory: InteractionData[];
  preferenceEvolution: PreferenceEvolution;
  successPatterns: SuccessPattern[];
  culturalLearning: CulturalLearningData;
  personalityInsights: PersonalityInsights;
  communicationStyle: CommunicationStyleAnalysis;
}

interface InteractionData {
  timestamp: Date;
  interactionType: 'message_sent' | 'profile_viewed' | 'match_liked' | 'conversation_started' | 'meetup_attended' | 'feedback_provided';
  targetUserId?: string;
  culturalContext: string[];
  emotionalTone: 'positive' | 'neutral' | 'negative' | 'saudade_heavy' | 'cultural_pride';
  engagementLevel: number; // 1-10
  responseTime?: number; // milliseconds
  contentQuality: number; // 1-10
}

interface PreferenceEvolution {
  saudadeIntensityTrend: TrendData;
  culturalDepthPreference: TrendData;
  regionalInterestShifts: RegionalInterestShift[];
  communicationPreferences: CommunicationPreferenceEvolution;
  activityPreferences: ActivityPreferenceEvolution;
}

interface TrendData {
  timePoints: Date[];
  values: number[];
  currentTrend: 'increasing' | 'decreasing' | 'stable';
  confidence: number;
}

interface SuccessPattern {
  patternId: string;
  patternType: 'conversation_success' | 'meetup_success' | 'long_term_connection' | 'cultural_bonding';
  triggerConditions: string[];
  successIndicators: SuccessIndicator[];
  replicability: number; // 0-100%
  culturalFactors: string[];
  emotionalFactors: string[];
}

interface SuccessIndicator {
  metric: string;
  value: number;
  importance: number;
  culturalRelevance: number;
}

interface CulturalLearningData {
  culturalAdaptationRate: number;
  heritagePreservationTrend: TrendData;
  languageUsagePatterns: LanguageUsagePattern[];
  traditionalVsModernBalance: TrendData;
  communityInvolvementEvolution: TrendData;
  culturalEventEngagement: CulturalEventEngagement[];
}

interface LanguageUsagePattern {
  language: 'portuguese' | 'english';
  contexts: string[];
  emotionalAssociation: number;
  usageFrequency: TrendData;
  preferredForSaudadeExpression: boolean;
}

interface CulturalEventEngagement {
  eventType: string;
  attendancePattern: TrendData;
  engagementQuality: number;
  culturalImpact: number;
  networkingSuccess: number;
}

interface PersonalityInsights {
  communicationOpenness: number;
  culturalPride: number;
  adaptability: number;
  emotionalExpressiveness: number;
  communityOrientation: number;
  traditionalistScore: number;
  modernIntegrationScore: number;
}

interface CommunicationStyleAnalysis {
  preferredTopics: TopicPreference[];
  responsePatterns: ResponsePattern[];
  emotionalExpression: EmotionalExpressionPattern[];
  culturalReferences: CulturalReferenceUsage[];
  conversationDepth: ConversationDepthAnalysis;
}

interface TopicPreference {
  topic: string;
  engagementLevel: number;
  culturalDepth: number;
  emotionalResonance: number;
  frequency: number;
}

interface ResponsePattern {
  responseTime: number;
  messageLength: number;
  emotionalTone: string;
  culturalContentPercentage: number;
  questionAsking: number;
}

interface EmotionalExpressionPattern {
  emotion: 'saudade' | 'alegria' | 'orgulho' | 'nostalgia' | 'esperança';
  expressionFrequency: number;
  triggers: string[];
  culturalContext: string[];
}

interface CulturalReferenceUsage {
  referenceType: 'food' | 'music' | 'traditions' | 'places' | 'people' | 'history';
  frequency: number;
  depth: number;
  regional: boolean;
  generational: boolean;
}

interface ConversationDepthAnalysis {
  averageDepth: number;
  saudadeDiscussion: number;
  culturalSharing: number;
  personalIntimacy: number;
  futureOrientation: number;
}

interface RegionalInterestShift {
  region: string;
  interestChange: number;
  timeframe: string;
  triggeringEvents: string[];
}

interface ActivityPreferenceEvolution {
  culturalEvents: TrendData;
  foodCooking: TrendData;
  musicListening: TrendData;
  communityGatherings: TrendData;
  languagePractice: TrendData;
}

interface CommunicationPreferenceEvolution {
  formalityLevel: TrendData;
  culturalContentPreference: TrendData;
  responseSpeed: TrendData;
  emotionalOpenness: TrendData;
}

interface LearningInsight {
  id: string;
  type: 'pattern_discovery' | 'preference_shift' | 'success_predictor' | 'cultural_evolution';
  title: string;
  description: string;
  confidence: number;
  actionable: boolean;
  culturalRelevance: number;
  personalImpact: number;
  recommendations: string[];
}

interface BehavioralLearningEngineProps {
  userProfile: CulturalDepthProfile;
  onInsightDiscovered: (insight: LearningInsight) => void;
  onBehaviorUpdate: (behaviorPattern: UserBehaviorPattern) => void;
  enableRealTimeLearning?: boolean;
  showDetailedAnalytics?: boolean;
}

// Lusophone Cultural Behavioral AI
class PortugueseBehavioralAI {
  static analyzeBehaviorPattern(
    interactionHistory: InteractionData[],
    culturalProfile: CulturalDepthProfile
  ): UserBehaviorPattern {
    const preferenceEvolution = this.analyzePreferenceEvolution(interactionHistory);
    const successPatterns = this.identifySuccessPatterns(interactionHistory);
    const culturalLearning = this.analyzeCulturalLearning(interactionHistory, culturalProfile);
    const personalityInsights = this.derivePersonalityInsights(interactionHistory, culturalProfile);
    const communicationStyle = this.analyzeCommunicationStyle(interactionHistory);

    return {
      userId: 'current_user', // Would be dynamic
      interactionHistory,
      preferenceEvolution,
      successPatterns,
      culturalLearning,
      personalityInsights,
      communicationStyle,
    };
  }

  static analyzePreferenceEvolution(history: InteractionData[]): PreferenceEvolution {
    // Analyze how user preferences evolve over time
    const timePoints = history.map(h => h.timestamp);
    
    // Saudade intensity trend analysis
    const saudadeValues = history
      .filter(h => h.culturalContext.includes('saudade'))
      .map(h => h.emotionalTone === 'saudade_heavy' ? h.engagementLevel : h.engagementLevel * 0.7);
    
    const saudadeIntensityTrend: TrendData = {
      timePoints: timePoints.slice(-saudadeValues.length),
      values: saudadeValues,
      currentTrend: this.calculateTrend(saudadeValues),
      confidence: this.calculateConfidence(saudadeValues),
    };

    // Cultural depth preference analysis
    const culturalValues = history
      .filter(h => h.culturalContext.length > 0)
      .map(h => h.culturalContext.length * h.engagementLevel);
    
    const culturalDepthPreference: TrendData = {
      timePoints: timePoints.slice(-culturalValues.length),
      values: culturalValues,
      currentTrend: this.calculateTrend(culturalValues),
      confidence: this.calculateConfidence(culturalValues),
    };

    return {
      saudadeIntensityTrend,
      culturalDepthPreference,
      regionalInterestShifts: this.analyzeRegionalShifts(history),
      communicationPreferences: this.analyzeCommunicationEvolution(history),
      activityPreferences: this.analyzeActivityEvolution(history),
    };
  }

  static identifySuccessPatterns(history: InteractionData[]): SuccessPattern[] {
    const patterns: SuccessPattern[] = [];
    
    // Analyze successful conversation patterns
    const successfulConversations = history.filter(h => 
      h.interactionType === 'conversation_started' && h.engagementLevel >= 8
    );

    if (successfulConversations.length >= 3) {
      const conversationPattern: SuccessPattern = {
        patternId: 'high_engagement_conversation',
        patternType: 'conversation_success',
        triggerConditions: this.extractTriggerConditions(successfulConversations),
        successIndicators: [
          { metric: 'engagement_level', value: 8.5, importance: 0.9, culturalRelevance: 0.8 },
          { metric: 'response_time', value: 2000, importance: 0.7, culturalRelevance: 0.6 },
        ],
        replicability: 85,
        culturalFactors: this.extractCulturalFactors(successfulConversations),
        emotionalFactors: this.extractEmotionalFactors(successfulConversations),
      };
      patterns.push(conversationPattern);
    }

    // Analyze cultural bonding patterns
    const culturalInteractions = history.filter(h => 
      h.culturalContext.length >= 2 && h.emotionalTone === 'cultural_pride'
    );

    if (culturalInteractions.length >= 2) {
      const culturalPattern: SuccessPattern = {
        patternId: 'cultural_bonding_success',
        patternType: 'cultural_bonding',
        triggerConditions: ['cultural_references >= 2', 'emotional_tone = cultural_pride'],
        successIndicators: [
          { metric: 'cultural_depth', value: 9, importance: 0.95, culturalRelevance: 1.0 },
          { metric: 'emotional_resonance', value: 8.5, importance: 0.85, culturalRelevance: 0.9 },
        ],
        replicability: 78,
        culturalFactors: ['portuguese_traditions', 'regional_identity', 'heritage_sharing'],
        emotionalFactors: ['pride', 'nostalgia', 'belonging'],
      };
      patterns.push(culturalPattern);
    }

    return patterns;
  }

  static analyzeCulturalLearning(
    history: InteractionData[],
    profile: CulturalDepthProfile
  ): CulturalLearningData {
    // Cultural adaptation rate
    const culturalInteractions = history.filter(h => h.culturalContext.length > 0);
    const adaptationRate = culturalInteractions.length / history.length;

    // Heritage preservation trend
    const heritageValues = history
      .filter(h => h.culturalContext.includes('heritage') || h.culturalContext.includes('tradition'))
      .map(h => h.engagementLevel);
    
    const heritagePreservationTrend: TrendData = {
      timePoints: history.slice(-heritageValues.length).map(h => h.timestamp),
      values: heritageValues,
      currentTrend: this.calculateTrend(heritageValues),
      confidence: this.calculateConfidence(heritageValues),
    };

    // Language usage patterns
    const languageUsagePatterns: LanguageUsagePattern[] = [
      {
        language: 'portuguese',
        contexts: ['emotional', 'cultural', 'family'],
        emotionalAssociation: 9,
        usageFrequency: {
          timePoints: history.map(h => h.timestamp).slice(-10),
          values: [7, 7.5, 8, 8.2, 8.1, 8.5, 8.7, 8.9, 9.1, 9.0],
          currentTrend: 'increasing',
          confidence: 0.85,
        },
        preferredForSaudadeExpression: true,
      },
      {
        language: 'english',
        contexts: ['professional', 'casual', 'integration'],
        emotionalAssociation: 6,
        usageFrequency: {
          timePoints: history.map(h => h.timestamp).slice(-10),
          values: [8, 7.8, 7.6, 7.5, 7.7, 7.4, 7.2, 7.0, 6.8, 7.0],
          currentTrend: 'decreasing',
          confidence: 0.75,
        },
        preferredForSaudadeExpression: false,
      },
    ];

    return {
      culturalAdaptationRate: adaptationRate,
      heritagePreservationTrend,
      languageUsagePatterns,
      traditionalVsModernBalance: {
        timePoints: history.map(h => h.timestamp).slice(-5),
        values: [6, 6.5, 7, 7.2, 7.5],
        currentTrend: 'increasing',
        confidence: 0.8,
      },
      communityInvolvementEvolution: {
        timePoints: history.map(h => h.timestamp).slice(-5),
        values: [5, 5.8, 6.5, 7.2, 7.8],
        currentTrend: 'increasing',
        confidence: 0.9,
      },
      culturalEventEngagement: [
        {
          eventType: 'fado_nights',
          attendancePattern: {
            timePoints: history.map(h => h.timestamp).slice(-6),
            values: [6, 7, 8, 8.5, 9, 9.2],
            currentTrend: 'increasing',
            confidence: 0.95,
          },
          engagementQuality: 9,
          culturalImpact: 8.5,
          networkingSuccess: 7.8,
        },
        {
          eventType: 'cooking_workshops',
          attendancePattern: {
            timePoints: history.map(h => h.timestamp).slice(-4),
            values: [7, 7.5, 8, 8.2],
            currentTrend: 'increasing',
            confidence: 0.8,
          },
          engagementQuality: 8.5,
          culturalImpact: 9,
          networkingSuccess: 8,
        },
      ],
    };
  }

  static derivePersonalityInsights(
    history: InteractionData[],
    profile: CulturalDepthProfile
  ): PersonalityInsights {
    const avgEngagement = history.reduce((sum, h) => sum + h.engagementLevel, 0) / history.length;
    const culturalInteractionRatio = history.filter(h => h.culturalContext.length > 0).length / history.length;
    const responseSpeed = history
      .filter(h => h.responseTime)
      .reduce((sum, h) => sum + (h.responseTime || 0), 0) / history.filter(h => h.responseTime).length;

    return {
      communicationOpenness: Math.min(10, avgEngagement * 1.2),
      culturalPride: Math.min(10, culturalInteractionRatio * 12),
      adaptability: Math.min(10, (10000 - Math.min(responseSpeed, 10000)) / 1000),
      emotionalExpressiveness: profile.saudadeProfile.saudadeIntensity,
      communityOrientation: profile.communityInvolvement,
      traditionalistScore: profile.saudadeProfile.heritagePreservation,
      modernIntegrationScore: profile.saudadeProfile.integrationBalance,
    };
  }

  static analyzeCommunicationStyle(history: InteractionData[]): CommunicationStyleAnalysis {
    // Preferred topics analysis
    const topicCounts: Record<string, { count: number, engagement: number, cultural: number }> = {};
    history.forEach(h => {
      h.culturalContext.forEach(context => {
        if (!topicCounts[context]) {
          topicCounts[context] = { count: 0, engagement: 0, cultural: 0 };
        }
        topicCounts[context].count++;
        topicCounts[context].engagement += h.engagementLevel;
        topicCounts[context].cultural += h.culturalContext.length;
      });
    });

    const preferredTopics: TopicPreference[] = Object.entries(topicCounts)
      .map(([topic, data]) => ({
        topic,
        engagementLevel: data.engagement / data.count,
        culturalDepth: data.cultural / data.count,
        emotionalResonance: topic.includes('saudade') ? 9 : 7,
        frequency: data.count,
      }))
      .sort((a, b) => b.engagementLevel - a.engagementLevel)
      .slice(0, 5);

    return {
      preferredTopics,
      responsePatterns: this.analyzeResponsePatterns(history),
      emotionalExpression: this.analyzeEmotionalExpressions(history),
      culturalReferences: this.analyzeCulturalReferences(history),
      conversationDepth: this.analyzeConversationDepth(history),
    };
  }

  static calculateTrend(values: number[]): 'increasing' | 'decreasing' | 'stable' {
    if (values.length < 2) return 'stable';
    
    const firstHalf = values.slice(0, Math.floor(values.length / 2));
    const secondHalf = values.slice(Math.floor(values.length / 2));
    
    const firstAvg = firstHalf.reduce((sum, v) => sum + v, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((sum, v) => sum + v, 0) / secondHalf.length;
    
    const diff = secondAvg - firstAvg;
    if (Math.abs(diff) < 0.5) return 'stable';
    return diff > 0 ? 'increasing' : 'decreasing';
  }

  static calculateConfidence(values: number[]): number {
    if (values.length < 3) return 0.5;
    const variance = this.calculateVariance(values);
    return Math.max(0.1, Math.min(1.0, 1 - (variance / 10)));
  }

  static calculateVariance(values: number[]): number {
    const mean = values.reduce((sum, v) => sum + v, 0) / values.length;
    const squaredDiffs = values.map(v => Math.pow(v - mean, 2));
    return squaredDiffs.reduce((sum, v) => sum + v, 0) / values.length;
  }

  // Helper methods for pattern analysis
  static extractTriggerConditions(interactions: InteractionData[]): string[] {
    const conditions: string[] = [];
    const avgEngagement = interactions.reduce((sum, i) => sum + i.engagementLevel, 0) / interactions.length;
    
    if (avgEngagement >= 8) conditions.push('high_engagement');
    
    const culturalRatio = interactions.filter(i => i.culturalContext.length > 0).length / interactions.length;
    if (culturalRatio >= 0.7) conditions.push('cultural_context_rich');
    
    return conditions;
  }

  static extractCulturalFactors(interactions: InteractionData[]): string[] {
    const factors = new Set<string>();
    interactions.forEach(i => {
      i.culturalContext.forEach(context => factors.add(context));
    });
    return Array.from(factors);
  }

  static extractEmotionalFactors(interactions: InteractionData[]): string[] {
    const emotions = new Set<string>();
    interactions.forEach(i => {
      emotions.add(i.emotionalTone);
    });
    return Array.from(emotions);
  }

  static analyzeRegionalShifts(history: InteractionData[]): RegionalInterestShift[] {
    // Simplified regional interest analysis
    return [
      {
        region: 'minho',
        interestChange: 15,
        timeframe: 'last_month',
        triggeringEvents: ['cultural_event_attendance', 'heritage_discussion'],
      },
    ];
  }

  static analyzeCommunicationEvolution(history: InteractionData[]): CommunicationPreferenceEvolution {
    // Simplified communication evolution analysis
    return {
      formalityLevel: {
        timePoints: history.map(h => h.timestamp).slice(-5),
        values: [6, 6.2, 6.5, 6.8, 7],
        currentTrend: 'increasing',
        confidence: 0.8,
      },
      culturalContentPreference: {
        timePoints: history.map(h => h.timestamp).slice(-5),
        values: [7, 7.5, 8, 8.2, 8.5],
        currentTrend: 'increasing',
        confidence: 0.9,
      },
      responseSpeed: {
        timePoints: history.map(h => h.timestamp).slice(-5),
        values: [5, 5.5, 6, 6.5, 7],
        currentTrend: 'increasing',
        confidence: 0.75,
      },
      emotionalOpenness: {
        timePoints: history.map(h => h.timestamp).slice(-5),
        values: [6, 6.8, 7.2, 7.8, 8.2],
        currentTrend: 'increasing',
        confidence: 0.85,
      },
    };
  }

  static analyzeActivityEvolution(history: InteractionData[]): ActivityPreferenceEvolution {
    return {
      culturalEvents: {
        timePoints: history.map(h => h.timestamp).slice(-5),
        values: [6, 7, 7.5, 8, 8.5],
        currentTrend: 'increasing',
        confidence: 0.9,
      },
      foodCooking: {
        timePoints: history.map(h => h.timestamp).slice(-5),
        values: [7, 7.2, 7.8, 8.2, 8.5],
        currentTrend: 'increasing',
        confidence: 0.85,
      },
      musicListening: {
        timePoints: history.map(h => h.timestamp).slice(-5),
        values: [8, 8.2, 8.5, 8.8, 9],
        currentTrend: 'increasing',
        confidence: 0.95,
      },
      communityGatherings: {
        timePoints: history.map(h => h.timestamp).slice(-5),
        values: [5, 6, 6.8, 7.5, 8],
        currentTrend: 'increasing',
        confidence: 0.8,
      },
      languagePractice: {
        timePoints: history.map(h => h.timestamp).slice(-5),
        values: [6, 6.5, 7, 7.2, 7.5],
        currentTrend: 'increasing',
        confidence: 0.75,
      },
    };
  }

  static analyzeResponsePatterns(history: InteractionData[]): ResponsePattern[] {
    const conversations = history.filter(h => h.interactionType === 'message_sent');
    
    if (conversations.length === 0) return [];

    return [{
      responseTime: conversations.reduce((sum, c) => sum + (c.responseTime || 3000), 0) / conversations.length,
      messageLength: 150, // Would be calculated from actual message data
      emotionalTone: 'cultural_pride',
      culturalContentPercentage: 75,
      questionAsking: 3,
    }];
  }

  static analyzeEmotionalExpressions(history: InteractionData[]): EmotionalExpressionPattern[] {
    return [
      {
        emotion: 'saudade',
        expressionFrequency: 8,
        triggers: ['family_memories', 'homeland_references', 'fado_music'],
        culturalContext: ['portuguese_heritage', 'emotional_support'],
      },
      {
        emotion: 'orgulho',
        expressionFrequency: 7,
        triggers: ['cultural_achievements', 'portuguese_recognition', 'community_success'],
        culturalContext: ['cultural_pride', 'national_identity'],
      },
    ];
  }

  static analyzeCulturalReferences(history: InteractionData[]): CulturalReferenceUsage[] {
    return [
      {
        referenceType: 'food',
        frequency: 9,
        depth: 8,
        regional: true,
        generational: true,
      },
      {
        referenceType: 'music',
        frequency: 8,
        depth: 9,
        regional: false,
        generational: true,
      },
    ];
  }

  static analyzeConversationDepth(history: InteractionData[]): ConversationDepthAnalysis {
    return {
      averageDepth: 7.5,
      saudadeDiscussion: 8,
      culturalSharing: 8.5,
      personalIntimacy: 6.5,
      futureOrientation: 7,
    };
  }

  static generateLearningInsights(behaviorPattern: UserBehaviorPattern): LearningInsight[] {
    const insights: LearningInsight[] = [];

    // Saudade intensity pattern insight
    if (behaviorPattern.preferenceEvolution.saudadeIntensityTrend.currentTrend === 'increasing') {
      insights.push({
        id: 'saudade_intensity_increase',
        type: 'pattern_discovery',
        title: 'Crescimento da Intensidade de Saudade',
        description: 'A sua intensidade de saudade tem aumentado, sugerindo uma ligação emocional mais profunda à herança portuguesa.',
        confidence: behaviorPattern.preferenceEvolution.saudadeIntensityTrend.confidence,
        actionable: true,
        culturalRelevance: 0.95,
        personalImpact: 0.85,
        recommendations: [
          'Procure conexões com intensidade de saudade similar',
          'Participe em atividades de cura cultural como noites de fado',
          'Considere terapia através da partilha de experiências culturais',
        ],
      });
    }

    // Cultural engagement pattern
    if (behaviorPattern.culturalLearning.communityInvolvementEvolution.currentTrend === 'increasing') {
      insights.push({
        id: 'community_engagement_growth',
        type: 'cultural_evolution',
        title: 'Crescimento do Envolvimento Comunitário',
        description: 'O seu envolvimento na comunidade de falantes de português tem crescido consistentemente.',
        confidence: 0.9,
        actionable: true,
        culturalRelevance: 0.9,
        personalImpact: 0.8,
        recommendations: [
          'Procure parceiros igualmente envolvidos na comunidade',
          'Considere assumir papéis de liderança em eventos portugueses',
          'Explore oportunidades de mentoria para novos membros da comunidade',
        ],
      });
    }

    // Success pattern insight
    const culturalBondingPattern = behaviorPattern.successPatterns.find(p => p.patternType === 'cultural_bonding');
    if (culturalBondingPattern && culturalBondingPattern.replicability >= 75) {
      insights.push({
        id: 'cultural_bonding_success',
        type: 'success_predictor',
        title: 'Padrão de Sucesso em Ligações Culturais',
        description: 'Você tem um padrão consistente de sucesso quando as conversas incluem referências culturais profundas.',
        confidence: culturalBondingPattern.replicability / 100,
        actionable: true,
        culturalRelevance: 1.0,
        personalImpact: 0.9,
        recommendations: [
          'Inicie conversas com tópicos culturais portugueses',
          'Partilhe tradições e memórias regionais específicas',
          'Use referências culturais para criar ligações emocionais mais profundas',
        ],
      });
    }

    return insights;
  }
}

export default function BehavioralLearningEngine({
  userProfile,
  onInsightDiscovered,
  onBehaviorUpdate,
  enableRealTimeLearning = true,
  showDetailedAnalytics = false,
}: BehavioralLearningEngineProps) {
  const { language } = useLanguage();
  const [behaviorPattern, setBehaviorPattern] = useState<UserBehaviorPattern | null>(null);
  const [insights, setInsights] = useState<LearningInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInsight, setSelectedInsight] = useState<LearningInsight | null>(null);
  const [realTimeLearning, setRealTimeLearning] = useState(enableRealTimeLearning);

  useEffect(() => {
    initializeBehavioralLearning();
  }, [userProfile]);

  const initializeBehavioralLearning = async () => {
    setLoading(true);
    
    // Generate mock interaction history based on user profile
    const mockHistory = generateMockInteractionHistory(userProfile);
    
    // Analyze behavior patterns
    const pattern = PortugueseBehavioralAI.analyzeBehaviorPattern(mockHistory, userProfile);
    setBehaviorPattern(pattern);
    
    // Generate insights
    const generatedInsights = PortugueseBehavioralAI.generateLearningInsights(pattern);
    setInsights(generatedInsights);
    
    // Notify parent components
    onBehaviorUpdate(pattern);
    generatedInsights.forEach(insight => onInsightDiscovered(insight));
    
    setLoading(false);
  };

  const generateMockInteractionHistory = (profile: CulturalDepthProfile): InteractionData[] => {
    const now = new Date();
    const history: InteractionData[] = [];
    
    // Generate 30 days of interaction data
    for (let i = 30; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      
      // Daily interactions based on user profile
      const dailyInteractions = Math.floor(Math.random() * 5) + 2;
      
      for (let j = 0; j < dailyInteractions; j++) {
        const interactionTypes: InteractionData['interactionType'][] = [
          'profile_viewed', 'message_sent', 'match_liked', 'conversation_started'
        ];
        
        const culturalContexts = profile.saudadeProfile.saudadeIntensity >= 7 
          ? ['saudade', 'heritage', 'tradition', 'family']
          : ['culture', 'community', 'integration'];
        
        history.push({
          timestamp: new Date(date.getTime() + j * 3600000),
          interactionType: interactionTypes[Math.floor(Math.random() * interactionTypes.length)],
          targetUserId: `user_${Math.floor(Math.random() * 100)}`,
          culturalContext: culturalContexts.slice(0, Math.floor(Math.random() * 3) + 1),
          emotionalTone: profile.saudadeProfile.saudadeIntensity >= 8 ? 'saudade_heavy' : 'cultural_pride',
          engagementLevel: Math.floor(Math.random() * 4) + profile.overallCulturalDepth - 2,
          responseTime: Math.floor(Math.random() * 5000) + 1000,
          contentQuality: Math.floor(Math.random() * 3) + 7,
        });
      }
    }
    
    return history.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  };

  const getTrendIcon = (trend: 'increasing' | 'decreasing' | 'stable') => {
    switch (trend) {
      case 'increasing': return ArrowTrendingUpIcon;
      case 'decreasing': return ArrowTrendingUpIcon; // Would be rotated
      default: return ArrowPathIcon;
    }
  };

  const getTrendColor = (trend: 'increasing' | 'decreasing' | 'stable') => {
    switch (trend) {
      case 'increasing': return 'text-green-600';
      case 'decreasing': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getInsightTypeIcon = (type: LearningInsight['type']) => {
    switch (type) {
      case 'pattern_discovery': return LightBulbIcon;
      case 'preference_shift': return TrendingUpIcon;
      case 'success_predictor': return StarSolid;
      case 'cultural_evolution': return BookOpenIcon;
      default: return SparklesIcon;
    }
  };

  const getInsightTypeColor = (type: LearningInsight['type']) => {
    switch (type) {
      case 'pattern_discovery': return 'text-yellow-600 bg-yellow-50';
      case 'preference_shift': return 'text-blue-600 bg-blue-50';
      case 'success_predictor': return 'text-green-600 bg-green-50';
      case 'cultural_evolution': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="bg-gray-100 rounded-2xl p-6 h-32"></div>
          <div className="bg-gray-100 rounded-2xl p-6 h-48"></div>
          <div className="bg-gray-100 rounded-2xl p-6 h-64"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Behavioral Learning Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <BrainSolid className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-primary-900">
            {language === 'pt' ? 'Motor de Aprendizagem Comportamental' : 'Behavioral Learning Engine'}
          </h2>
          <div className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
            <ChartBarIcon className="w-4 h-4" />
            {language === 'pt' ? 'Análise Contínua' : 'Continuous Analysis'}
          </div>
        </div>
        <p className="text-gray-600 max-w-3xl mx-auto">
          {language === 'pt' 
            ? 'Sistema inteligente que aprende com as suas interações portuguesas e melhora continuamente as recomendações de compatibilidade cultural'
            : 'Intelligent system that learns from your Lusophone interactions and continuously improves cultural compatibility recommendations'}
        </p>
      </div>

      {/* Real-time Learning Toggle */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ArrowPathIcon className="w-6 h-6 text-blue-600" />
            <div>
              <h3 className="font-semibold text-gray-900">
                {language === 'pt' ? 'Aprendizagem em Tempo Real' : 'Real-time Learning'}
              </h3>
              <p className="text-sm text-gray-600">
                {language === 'pt' 
                  ? 'O sistema adapta-se às suas preferências automaticamente'
                  : 'System automatically adapts to your preferences'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setRealTimeLearning(!realTimeLearning)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              realTimeLearning ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                realTimeLearning ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Learning Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {insights.map((insight) => {
          const IconComponent = getInsightTypeIcon(insight.type);
          
          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedInsight(insight)}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg ${getInsightTypeColor(insight.type)}`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-sm">{insight.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="text-xs text-gray-500">
                      {language === 'pt' ? 'Confiança:' : 'Confidence:'} {Math.round(insight.confidence * 100)}%
                    </div>
                    {insight.actionable && (
                      <div className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium">
                        {language === 'pt' ? 'Acionável' : 'Actionable'}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2">{insight.description}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Behavioral Pattern Analysis */}
      {behaviorPattern && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <ChartBarIcon className="w-6 h-6 text-blue-600" />
            {language === 'pt' ? 'Análise de Padrões Comportamentais' : 'Behavioral Pattern Analysis'}
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Preference Evolution */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">
                {language === 'pt' ? 'Evolução de Preferências' : 'Preference Evolution'}
              </h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {language === 'pt' ? 'Intensidade de Saudade' : 'Saudade Intensity'}
                    </div>
                    <div className="text-xs text-gray-600">
                      {language === 'pt' ? 'Tendência atual' : 'Current trend'}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {React.createElement(getTrendIcon(behaviorPattern.preferenceEvolution.saudadeIntensityTrend.currentTrend), {
                      className: `w-5 h-5 ${getTrendColor(behaviorPattern.preferenceEvolution.saudadeIntensityTrend.currentTrend)}`
                    })}
                    <span className={`text-sm font-semibold ${getTrendColor(behaviorPattern.preferenceEvolution.saudadeIntensityTrend.currentTrend)}`}>
                      {behaviorPattern.preferenceEvolution.saudadeIntensityTrend.currentTrend}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {language === 'pt' ? 'Profundidade Cultural' : 'Cultural Depth'}
                    </div>
                    <div className="text-xs text-gray-600">
                      {language === 'pt' ? 'Preferência atual' : 'Current preference'}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {React.createElement(getTrendIcon(behaviorPattern.preferenceEvolution.culturalDepthPreference.currentTrend), {
                      className: `w-5 h-5 ${getTrendColor(behaviorPattern.preferenceEvolution.culturalDepthPreference.currentTrend)}`
                    })}
                    <span className={`text-sm font-semibold ${getTrendColor(behaviorPattern.preferenceEvolution.culturalDepthPreference.currentTrend)}`}>
                      {behaviorPattern.preferenceEvolution.culturalDepthPreference.currentTrend}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Personality Insights */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">
                {language === 'pt' ? 'Insights de Personalidade' : 'Personality Insights'}
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">
                    {Math.round(behaviorPattern.personalityInsights.culturalPride)}
                  </div>
                  <div className="text-xs text-blue-700">
                    {language === 'pt' ? 'Orgulho Cultural' : 'Cultural Pride'}
                  </div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-600">
                    {Math.round(behaviorPattern.personalityInsights.communityOrientation)}
                  </div>
                  <div className="text-xs text-green-700">
                    {language === 'pt' ? 'Orientação Comunitária' : 'Community Orientation'}
                  </div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-lg font-bold text-purple-600">
                    {Math.round(behaviorPattern.personalityInsights.emotionalExpressiveness)}
                  </div>
                  <div className="text-xs text-purple-700">
                    {language === 'pt' ? 'Expressividade' : 'Expressiveness'}
                  </div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="text-lg font-bold text-orange-600">
                    {Math.round(behaviorPattern.personalityInsights.traditionalistScore)}
                  </div>
                  <div className="text-xs text-orange-700">
                    {language === 'pt' ? 'Tradicionalismo' : 'Traditionalist'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Success Patterns */}
          {behaviorPattern.successPatterns.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <StarSolid className="w-5 h-5 text-yellow-500" />
                {language === 'pt' ? 'Padrões de Sucesso Identificados' : 'Identified Success Patterns'}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {behaviorPattern.successPatterns.map((pattern, idx) => (
                  <div key={pattern.patternId} className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-yellow-900 capitalize">
                        {pattern.patternType.replace('_', ' ')}
                      </h5>
                      <span className="text-sm font-semibold text-yellow-700">
                        {pattern.replicability}% {language === 'pt' ? 'replicável' : 'replicable'}
                      </span>
                    </div>
                    <div className="text-sm text-yellow-800">
                      <strong>{language === 'pt' ? 'Fatores Culturais:' : 'Cultural Factors:'}</strong>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {pattern.culturalFactors.slice(0, 3).map((factor, fIdx) => (
                          <span key={fIdx} className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs">
                            {factor}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Detailed Analytics */}
      {showDetailedAnalytics && behaviorPattern && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <EyeIcon className="w-6 h-6 text-purple-600" />
            {language === 'pt' ? 'Análise Detalhada de Comportamento' : 'Detailed Behavioral Analytics'}
          </h3>

          {/* Cultural Learning Data */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-4">
              {language === 'pt' ? 'Dados de Aprendizagem Cultural' : 'Cultural Learning Data'}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">
                  {language === 'pt' ? 'Taxa de Adaptação Cultural' : 'Cultural Adaptation Rate'}
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {Math.round(behaviorPattern.culturalLearning.culturalAdaptationRate * 100)}%
                </div>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">
                  {language === 'pt' ? 'Evolução Comunitária' : 'Community Evolution'}
                </div>
                <div className="text-2xl font-bold text-green-600">
                  {behaviorPattern.culturalLearning.communityInvolvementEvolution.currentTrend === 'increasing' ? '↗️' : 
                   behaviorPattern.culturalLearning.communityInvolvementEvolution.currentTrend === 'decreasing' ? '↘️' : '➡️'}
                </div>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">
                  {language === 'pt' ? 'Engajamento em Eventos' : 'Event Engagement'}
                </div>
                <div className="text-2xl font-bold text-purple-600">
                  {behaviorPattern.culturalLearning.culturalEventEngagement.length}
                </div>
              </div>
            </div>
          </div>

          {/* Communication Style Analysis */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">
              {language === 'pt' ? 'Análise de Estilo de Comunicação' : 'Communication Style Analysis'}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-3">
                  {language === 'pt' ? 'Tópicos Preferidos' : 'Preferred Topics'}
                </h5>
                <div className="space-y-2">
                  {behaviorPattern.communicationStyle.preferredTopics.slice(0, 4).map((topic, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm text-gray-900 capitalize">{topic.topic}</span>
                      <div className="flex items-center gap-2">
                        <div className="text-xs text-gray-600">
                          {Math.round(topic.engagementLevel)}/10
                        </div>
                        <div className="w-16 h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 bg-blue-500 rounded-full"
                            style={{ width: `${(topic.engagementLevel / 10) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-3">
                  {language === 'pt' ? 'Expressão Emocional' : 'Emotional Expression'}
                </h5>
                <div className="space-y-2">
                  {behaviorPattern.communicationStyle.emotionalExpression.map((emotion, idx) => (
                    <div key={idx} className="p-3 bg-gradient-to-r from-red-50 to-primary-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900 capitalize">{emotion.emotion}</span>
                        <span className="text-xs text-gray-600">{emotion.expressionFrequency}/10</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {emotion.triggers.slice(0, 3).map((trigger, tIdx) => (
                          <span key={tIdx} className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs">
                            {trigger}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Insight Detail Modal */}
      {selectedInsight && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                {React.createElement(getInsightTypeIcon(selectedInsight.type), {
                  className: "w-8 h-8 text-blue-600"
                })}
                <h3 className="text-xl font-bold text-primary-900">{selectedInsight.title}</h3>
              </div>
              <button
                onClick={() => setSelectedInsight(null)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed">{selectedInsight.description}</p>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-sm text-blue-700 mb-1">
                    {language === 'pt' ? 'Nível de Confiança' : 'Confidence Level'}
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    {Math.round(selectedInsight.confidence * 100)}%
                  </div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="text-sm text-purple-700 mb-1">
                    {language === 'pt' ? 'Relevância Cultural' : 'Cultural Relevance'}
                  </div>
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.round(selectedInsight.culturalRelevance * 100)}%
                  </div>
                </div>
              </div>

              {selectedInsight.recommendations.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    {language === 'pt' ? 'Recomendações Acionáveis' : 'Actionable Recommendations'}
                  </h4>
                  <div className="space-y-2">
                    {selectedInsight.recommendations.map((rec, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                        <LightBulbIcon className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-green-800">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => setSelectedInsight(null)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                {language === 'pt' ? 'Aplicar Insights' : 'Apply Insights'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}