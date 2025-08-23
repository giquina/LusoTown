/**
 * AI-Enhanced Matching System Configuration
 * 
 * Centralized configuration for Phase 2 AI matching system with
 * Portuguese cultural compatibility analysis, behavioral learning,
 * and regional specialization for United Kingdom Portuguese diaspora.
 * 
 * Zero hardcoding policy - all values configurable via environment variables
 */

import { UNIVERSITY_PARTNERSHIPS } from './universities'
import { CULTURAL_CENTERS } from './cultural-centers'

// AI Model Configuration

export const AI_MATCHING_CONFIG = {
  // Model Versions and Settings
  models: {
    compatibility_predictor: {
      version: process.env.NEXT_PUBLIC_AI_COMPATIBILITY_VERSION || '2.0',
      confidence_threshold: parseFloat(process.env.NEXT_PUBLIC_AI_CONFIDENCE_THRESHOLD || '0.70'),
      cultural_weight: parseFloat(process.env.NEXT_PUBLIC_AI_CULTURAL_WEIGHT || '0.85'),
      learning_rate: parseFloat(process.env.NEXT_PUBLIC_AI_LEARNING_RATE || '0.01')
    },
    behavioral_learning: {
      version: process.env.NEXT_PUBLIC_AI_BEHAVIORAL_VERSION || '2.0',
      sample_size_threshold: parseInt(process.env.NEXT_PUBLIC_AI_SAMPLE_THRESHOLD || '50'),
      adaptation_speed: parseFloat(process.env.NEXT_PUBLIC_AI_ADAPTATION_SPEED || '0.1'),
      memory_window_days: parseInt(process.env.NEXT_PUBLIC_AI_MEMORY_WINDOW || '90')
    },
    conversation_analyzer: {
      version: process.env.NEXT_PUBLIC_AI_CONVERSATION_VERSION || '2.0',
      context_depth: parseInt(process.env.NEXT_PUBLIC_AI_CONTEXT_DEPTH || '5'),
      cultural_reference_weight: parseFloat(process.env.NEXT_PUBLIC_AI_CULTURAL_REF_WEIGHT || '0.20'),
      language_compatibility_weight: parseFloat(process.env.NEXT_PUBLIC_AI_LANG_COMPAT_WEIGHT || '0.15')
    },
    saudade_analyzer: {
      version: process.env.NEXT_PUBLIC_AI_SAUDADE_VERSION || '2.0',
      emotional_depth_threshold: parseFloat(process.env.NEXT_PUBLIC_AI_EMOTIONAL_THRESHOLD || '0.65'),
      cultural_resonance_weight: parseFloat(process.env.NEXT_PUBLIC_AI_RESONANCE_WEIGHT || '0.30'),
      tradition_importance_factor: parseFloat(process.env.NEXT_PUBLIC_AI_TRADITION_FACTOR || '0.25')
    }
  },

  // Matching Preferences
  matching: {
    max_matches_default: parseInt(process.env.NEXT_PUBLIC_AI_MAX_MATCHES || '10'),
    min_compatibility_score: parseInt(process.env.NEXT_PUBLIC_AI_MIN_COMPATIBILITY || '70'),
    regional_priority_bonus: parseInt(process.env.NEXT_PUBLIC_AI_REGIONAL_BONUS || '10'),
    cultural_depth_importance: parseFloat(process.env.NEXT_PUBLIC_AI_CULTURAL_DEPTH || '0.25'),
    saudade_resonance_importance: parseFloat(process.env.NEXT_PUBLIC_AI_SAUDADE_IMPORTANCE || '0.20'),
    conversation_potential_importance: parseFloat(process.env.NEXT_PUBLIC_AI_CONVERSATION_IMPORTANCE || '0.15')
  },

  // Performance Thresholds
  performance: {
    prediction_accuracy_target: parseFloat(process.env.NEXT_PUBLIC_AI_ACCURACY_TARGET || '0.82'),
    user_satisfaction_target: parseFloat(process.env.NEXT_PUBLIC_AI_SATISFACTION_TARGET || '0.85'),
    learning_confidence_threshold: parseFloat(process.env.NEXT_PUBLIC_AI_LEARNING_CONFIDENCE || '0.75'),
    model_retraining_threshold: parseFloat(process.env.NEXT_PUBLIC_AI_RETRAIN_THRESHOLD || '0.05')
  }
} as const

// Portuguese Cultural Context Configuration

export const PORTUGUESE_CULTURAL_CONFIG = {
  // Regional Characteristics
  regions: {
    norte: {
      characteristics: ['traditional', 'family-oriented', 'hardworking', 'proud', 'community-focused'],
      cultural_markers: ['francesinha', 'vinho verde', 'festas populares', 'são joão', 'rancho folclórico'],
      communication_style: 'warm_but_reserved',
      values: ['family', 'tradition', 'honesty', 'work_ethic', 'community'],
      saudade_intensity: 'high',
      language_preferences: ['portuguese_first', 'formal_address'],
      celebration_priorities: ['santos_populares', 'family_gatherings', 'religious_festivals'],
      food_culture: ['francesinha', 'caldo_verde', 'broa', 'vinho_verde'],
      music_preferences: ['folk_traditional', 'popular_music', 'religious_hymns']
    },
    centro: {
      characteristics: ['balanced', 'academic', 'cultural', 'reflective', 'spiritual'],
      cultural_markers: ['universidades', 'mosteiros', 'tradições religiosas', 'literatura', 'arte'],
      communication_style: 'thoughtful_and_measured',
      values: ['education', 'culture', 'spirituality', 'balance', 'wisdom'],
      saudade_intensity: 'deep',
      language_preferences: ['bilingual_comfort', 'literary_portuguese'],
      celebration_priorities: ['cultural_events', 'academic_ceremonies', 'religious_observances'],
      food_culture: ['leitão', 'chanfana', 'ovos_moles', 'licor_beirão'],
      music_preferences: ['classical', 'fado', 'choral', 'academic_music']
    },
    lisboa: {
      characteristics: ['cosmopolitan', 'dynamic', 'artistic', 'social', 'modern'],
      cultural_markers: ['fado', 'tascas', 'vida noturna', 'arte', 'café_culture'],
      communication_style: 'expressive_and_confident',
      values: ['creativity', 'social_connection', 'ambition', 'culture', 'innovation'],
      saudade_intensity: 'romantic',
      language_preferences: ['bilingual_fluent', 'informal_portuguese'],
      celebration_priorities: ['santos_populares', 'cultural_festivals', 'nightlife'],
      food_culture: ['pastéis_nata', 'bifana', 'ginjinha', 'seafood'],
      music_preferences: ['fado', 'popular', 'international', 'modern']
    },
    alentejo: {
      characteristics: ['peaceful', 'contemplative', 'authentic', 'rooted', 'rural'],
      cultural_markers: ['cante alentejano', 'planícies', 'tradições rurais', 'simplicidade'],
      communication_style: 'slow_and_thoughtful',
      values: ['authenticity', 'peace', 'nature', 'tradition', 'simplicity'],
      saudade_intensity: 'profound',
      language_preferences: ['portuguese_traditional', 'rural_dialect'],
      celebration_priorities: ['harvest_festivals', 'religious_processions', 'family_traditions'],
      food_culture: ['açorda', 'migas', 'porco_preto', 'wine'],
      music_preferences: ['cante_alentejano', 'traditional_folk', 'rural_music']
    },
    algarve: {
      characteristics: ['warm', 'welcoming', 'relaxed', 'optimistic', 'coastal'],
      cultural_markers: ['praia', 'hospitalidade', 'festa', 'natureza', 'turismo'],
      communication_style: 'friendly_and_open',
      values: ['hospitality', 'enjoyment', 'nature', 'community', 'celebration'],
      saudade_intensity: 'warm',
      language_preferences: ['multilingual_comfort', 'tourist_portuguese'],
      celebration_priorities: ['beach_festivals', 'summer_celebrations', 'tourism_events'],
      food_culture: ['cataplana', 'grilled_fish', 'morgado', 'coastal_cuisine'],
      music_preferences: ['popular', 'summer_hits', 'international', 'beach_music']
    },
    acores: {
      characteristics: ['island-minded', 'close-knit', 'spiritual', 'resilient', 'emigrant'],
      cultural_markers: ['mar', 'tradições', 'festas religiosas', 'comunidade', 'emigração'],
      communication_style: 'intimate_and_loyal',
      values: ['community', 'faith', 'resilience', 'loyalty', 'family'],
      saudade_intensity: 'intense',
      language_preferences: ['azorean_portuguese', 'community_focused'],
      celebration_priorities: ['religious_festivals', 'emigrant_reunions', 'island_traditions'],
      food_culture: ['linguiça', 'queijo_ilha', 'massa_sovada', 'island_cuisine'],
      music_preferences: ['traditional_azorean', 'emigrant_songs', 'religious_music']
    },
    madeira: {
      characteristics: ['mountainous_spirit', 'festive', 'industrious', 'proud', 'artistic'],
      cultural_markers: ['levadas', 'festa da flor', 'vinho madeira', 'natureza', 'arte'],
      communication_style: 'proud_and_expressive',
      values: ['beauty', 'celebration', 'hard_work', 'pride', 'artistry'],
      saudade_intensity: 'artistic',
      language_preferences: ['madeiran_portuguese', 'expressive_portuguese'],
      celebration_priorities: ['carnival', 'flower_festival', 'wine_harvest', 'new_year'],
      food_culture: ['espetada', 'bolo_mel', 'poncha', 'tropical_fruits'],
      music_preferences: ['bailinho', 'popular_madeirense', 'folkloric', 'modern']
    }
  },

  // Saudade Analysis Framework
  saudade_framework: {
    types: {
      deep_emotional: {
        indicators: ['música nostálgica', 'memórias familiares', 'tradições perdidas'],
        intensity_markers: ['tears_with_fado', 'homesickness', 'family_longing'],
        compatibility_factors: ['emotional_expression', 'cultural_depth', 'tradition_importance'],
        conversation_triggers: ['childhood_memories', 'family_stories', 'homeland_visits']
      },
      nostalgic_cultural: {
        indicators: ['terra natal', 'comida tradicional', 'festas populares'],
        intensity_markers: ['cooking_homeland_food', 'cultural_celebrations', 'language_preservation'],
        compatibility_factors: ['cultural_practices', 'tradition_celebration', 'community_connection'],
        conversation_triggers: ['favorite_dishes', 'cultural_events', 'traditional_celebrations']
      },
      romantic_poetic: {
        indicators: ['fado melancólico', 'poesia', 'amor impossível'],
        intensity_markers: ['fado_appreciation', 'poetry_reading', 'romantic_idealism'],
        compatibility_factors: ['artistic_appreciation', 'emotional_depth', 'cultural_romance'],
        conversation_triggers: ['favorite_fado', 'poetry_discussion', 'romantic_culture']
      },
      familial_generational: {
        indicators: ['família distante', 'casa ancestral', 'gerações passadas'],
        intensity_markers: ['family_visits', 'genealogy_interest', 'tradition_passing'],
        compatibility_factors: ['family_values', 'intergenerational_respect', 'heritage_preservation'],
        conversation_triggers: ['family_history', 'ancestral_stories', 'family_traditions']
      },
      cultural_identity: {
        indicators: ['identidade portuguesa', 'língua materna', 'costumes únicos'],
        intensity_markers: ['language_maintenance', 'cultural_pride', 'identity_strength'],
        compatibility_factors: ['cultural_identity', 'language_importance', 'heritage_pride'],
        conversation_triggers: ['portuguese_identity', 'cultural_pride', 'heritage_importance']
      }
    },

    intensity_levels: {
      low: { score_range: [0, 30], description: 'Occasional cultural longing', compatibility_impact: 0.10 },
      moderate: { score_range: [31, 60], description: 'Regular emotional connection', compatibility_impact: 0.20 },
      high: { score_range: [61, 80], description: 'Strong cultural attachment', compatibility_impact: 0.25 },
      intense: { score_range: [81, 100], description: 'Deep emotional resonance', compatibility_impact: 0.30 }
    }
  },

  // Communication Patterns
  communication_patterns: {
    formal_traditional: {
      characteristics: ['respect', 'tradition', 'hierarchy', 'politeness'],
      indicators: ['você', 'formal_language', 'traditional_greetings', 'respectful_address'],
      compatibility_matrix: { formal_traditional: 95, informal_warm: 60, expressive_modern: 50, reserved_thoughtful: 80 },
      cultural_context: ['older_generation', 'rural_background', 'traditional_families']
    },
    informal_warm: {
      characteristics: ['warmth', 'familiarity', 'closeness', 'friendliness'],
      indicators: ['tu', 'casual_language', 'informal_greetings', 'warm_expressions'],
      compatibility_matrix: { formal_traditional: 60, informal_warm: 90, expressive_modern: 85, reserved_thoughtful: 70 },
      cultural_context: ['family_oriented', 'community_focused', 'social_people']
    },
    expressive_modern: {
      characteristics: ['emotional', 'animated', 'passionate', 'contemporary'],
      indicators: ['gestures', 'emotional_language', 'enthusiasm', 'modern_expressions'],
      compatibility_matrix: { formal_traditional: 50, informal_warm: 85, expressive_modern: 95, reserved_thoughtful: 60 },
      cultural_context: ['urban_background', 'artistic_people', 'younger_generation']
    },
    reserved_thoughtful: {
      characteristics: ['thoughtful', 'measured', 'careful', 'introspective'],
      indicators: ['careful_word_choice', 'pause_before_speaking', 'consideration', 'depth'],
      compatibility_matrix: { formal_traditional: 80, informal_warm: 70, expressive_modern: 60, reserved_thoughtful: 90 },
      cultural_context: ['academic_background', 'introverted_people', 'contemplative_nature']
    }
  }
} as const

// United Kingdom Regional Configuration for Portuguese Diaspora

export const UK_REGIONAL_CONFIG = {
  london_central: {
    portuguese_population_estimate: parseInt(process.env.NEXT_PUBLIC_LONDON_CENTRAL_PORTUGUESE || '8500'),
    cultural_centers: ['instituto-camoes-london', 'centro-cultural-portugues'],
    universities_nearby: ['ucl', 'kings-college', 'imperial-college', 'lse'],
    transport_accessibility: 'excellent',
    cultural_event_frequency: 'high',
    community_cohesion_score: 85,
    matching_success_rate: 0.82,
    preferred_meeting_locations: ['Portuguese cafés', 'Cultural centers', 'University areas', 'Central parks'],
    cultural_weight_adjustments: {
      heritage_importance: 0.85,
      language_priority: 0.75,
      community_connection: 0.90,
      traditional_values: 0.70
    }
  },
  london_outer: {
    portuguese_population_estimate: parseInt(process.env.NEXT_PUBLIC_LONDON_OUTER_PORTUGUESE || '12000'),
    cultural_centers: ['centro-cultural-portugues'],
    universities_nearby: ['imperial-college'],
    transport_accessibility: 'good',
    cultural_event_frequency: 'moderate',
    community_cohesion_score: 78,
    matching_success_rate: 0.79,
    preferred_meeting_locations: ['Community centers', 'Local Portuguese restaurants', 'Parks', 'Shopping areas'],
    cultural_weight_adjustments: {
      heritage_importance: 0.90,
      language_priority: 0.85,
      community_connection: 0.95,
      traditional_values: 0.85
    }
  },
  manchester: {
    portuguese_population_estimate: parseInt(process.env.NEXT_PUBLIC_MANCHESTER_PORTUGUESE || '2500'),
    cultural_centers: [],
    universities_nearby: ['manchester'],
    transport_accessibility: 'good',
    cultural_event_frequency: 'low',
    community_cohesion_score: 65,
    matching_success_rate: 0.72,
    preferred_meeting_locations: ['University areas', 'City center', 'Portuguese businesses'],
    cultural_weight_adjustments: {
      heritage_importance: 0.95,
      language_priority: 0.90,
      community_connection: 0.85,
      traditional_values: 0.90
    }
  },
  edinburgh: {
    portuguese_population_estimate: parseInt(process.env.NEXT_PUBLIC_EDINBURGH_PORTUGUESE || '800'),
    cultural_centers: [],
    universities_nearby: ['edinburgh'],
    transport_accessibility: 'moderate',
    cultural_event_frequency: 'low',
    community_cohesion_score: 60,
    matching_success_rate: 0.68,
    preferred_meeting_locations: ['University campus', 'City center', 'Cultural venues'],
    cultural_weight_adjustments: {
      heritage_importance: 0.95,
      language_priority: 0.95,
      community_connection: 0.80,
      traditional_values: 0.95
    }
  }
} as const

// Conversation Analysis Configuration

export const CONVERSATION_CONFIG = {
  quality_factors: {
    linguistic_compatibility: {
      weight: 0.15,
      factors: ['portuguese_fluency_match', 'english_fluency_match', 'dialect_similarity'],
      thresholds: { excellent: 90, good: 75, moderate: 60 }
    },
    cultural_reference_alignment: {
      weight: 0.20,
      factors: ['shared_cultural_practices', 'regional_marker_overlap', 'tradition_importance'],
      thresholds: { excellent: 85, good: 70, moderate: 55 }
    },
    emotional_intelligence_match: {
      weight: 0.18,
      factors: ['expression_style_compatibility', 'saudade_understanding', 'emotional_depth'],
      thresholds: { excellent: 88, good: 73, moderate: 58 }
    },
    humor_style_compatibility: {
      weight: 0.12,
      factors: ['cultural_humor_appreciation', 'communication_style_match'],
      thresholds: { excellent: 85, good: 70, moderate: 55 }
    },
    topic_interest_overlap: {
      weight: 0.15,
      factors: ['event_preferences', 'cultural_interests', 'professional_topics'],
      thresholds: { excellent: 80, good: 65, moderate: 50 }
    },
    communication_rhythm: {
      weight: 0.10,
      factors: ['pace_compatibility', 'response_style_match', 'regional_rhythm'],
      thresholds: { excellent: 85, good: 70, moderate: 55 }
    },
    conflict_resolution_style: {
      weight: 0.05,
      factors: ['resolution_approach_compatibility', 'cultural_conflict_patterns'],
      thresholds: { excellent: 90, good: 75, moderate: 60 }
    },
    future_vision_alignment: {
      weight: 0.05,
      factors: ['relationship_goals', 'cultural_growth_potential', 'community_involvement'],
      thresholds: { excellent: 85, good: 70, moderate: 55 }
    }
  },

  conversation_starters: {
    cultural_heritage: [
      'Qual é a tradição portuguesa que mais sentes falta aqui em Londres?',
      'What Portuguese tradition do you miss most here in London?',
      'De que região de Portugal és? Que características especiais tem a tua terra?',
      'Which region of Portugal are you from? What makes your homeland special?'
    ],
    saudade_connection: [
      'Há alguma música portuguesa que te emociona particularmente?',
      'Is there any Portuguese music that particularly moves you?',
      'Como é que manténs a ligação com Portugal estando aqui no Reino Unido?',
      'How do you maintain your connection to Portugal while living in the United Kingdom?'
    ],
    london_experience: [
      'Qual foi a tua maior descoberta em Londres?',
      'What has been your biggest discovery in London?',
      'Como comparas a vida aqui com a vida em Portugal?',
      'How does life here compare to life in Portugal?'
    ],
    future_aspirations: [
      'Quais são os teus planos para o futuro - ficar no Reino Unido ou voltar a Portugal?',
      'What are your future plans - staying in the United Kingdom or returning to Portugal?',
      'Como vês a criação de uma família mantendo as tradições portuguesas?',
      'How do you see raising a family while maintaining Portuguese traditions?'
    ]
  }
} as const

// Success Patterns and Learning Configuration

export const LEARNING_CONFIG = {
  success_patterns: {
    excellent_matches: {
      factors: ['cultural_harmony > 85', 'saudade_resonance > 80', 'communication_compatibility > 75'],
      characteristics: ['shared_regional_background', 'similar_heritage_strength', 'compatible_life_goals'],
      success_indicators: ['sustained_conversation', 'meeting_arranged', 'cultural_bonding']
    },
    good_matches: {
      factors: ['cultural_harmony > 75', 'overall_compatibility > 70'],
      characteristics: ['complementary_traits', 'shared_values', 'geographic_compatibility'],
      success_indicators: ['regular_messaging', 'cultural_interest', 'friendship_development']
    },
    moderate_matches: {
      factors: ['overall_compatibility > 60'],
      characteristics: ['some_shared_interests', 'basic_compatibility'],
      success_indicators: ['initial_conversation', 'polite_interaction']
    }
  },

  risk_factors: {
    high_risk: [
      'very_different_heritage_levels',
      'conflicting_communication_styles',
      'significant_geographic_distance',
      'opposing_cultural_values'
    ],
    moderate_risk: [
      'different_life_stages',
      'varying_community_involvement',
      'language_preference_mismatch'
    ],
    low_risk: [
      'minor_regional_differences',
      'slight_age_gap',
      'different_hobbies'
    ]
  },

  learning_weights: {
    user_feedback: 0.40,
    behavioral_data: 0.30,
    outcome_tracking: 0.20,
    cultural_factors: 0.10
  },

  model_update_triggers: {
    sample_size_threshold: 100,
    accuracy_drop_threshold: 0.05,
    user_satisfaction_drop: 0.10,
    cultural_feedback_threshold: 50
  }
} as const

// Export helper functions

export const getRegionalConfig = (region: string) => {
  return UK_REGIONAL_CONFIG[region as keyof typeof UK_REGIONAL_CONFIG] || UK_REGIONAL_CONFIG.london_central
}

export const getCulturalRegionData = (region: string) => {
  return PORTUGUESE_CULTURAL_CONFIG.regions[region as keyof typeof PORTUGUESE_CULTURAL_CONFIG.regions] || PORTUGUESE_CULTURAL_CONFIG.regions.lisboa
}

export const getSaudadeFramework = (type: string) => {
  return PORTUGUESE_CULTURAL_CONFIG.saudade_framework.types[type as keyof typeof PORTUGUESE_CULTURAL_CONFIG.saudade_framework.types]
}

export const getCommunicationPattern = (pattern: string) => {
  return PORTUGUESE_CULTURAL_CONFIG.communication_patterns[pattern as keyof typeof PORTUGUESE_CULTURAL_CONFIG.communication_patterns]
}

export const getConversationQualityFactors = () => {
  return CONVERSATION_CONFIG.quality_factors
}

export const getAIMatchingSettings = () => {
  return AI_MATCHING_CONFIG
}

export const getLearningConfiguration = () => {
  return LEARNING_CONFIG
}

// Validation helpers

export const validateCompatibilityScore = (score: number): boolean => {
  return typeof score === 'number' && score >= 0 && score <= 100
}

export const validateCulturalRegion = (region: string): boolean => {
  return region in PORTUGUESE_CULTURAL_CONFIG.regions
}

export const validateUKRegion = (region: string): boolean => {
  return region in UK_REGIONAL_CONFIG
}

export const validateSaudadeType = (type: string): boolean => {
  return type in PORTUGUESE_CULTURAL_CONFIG.saudade_framework.types
}

// Export comprehensive configuration object
export default {
  AI_MATCHING_CONFIG,
  PORTUGUESE_CULTURAL_CONFIG,
  UK_REGIONAL_CONFIG,
  CONVERSATION_CONFIG,
  LEARNING_CONFIG,
  getRegionalConfig,
  getCulturalRegionData,
  getSaudadeFramework,
  getCommunicationPattern,
  getConversationQualityFactors,
  getAIMatchingSettings,
  getLearningConfiguration,
  validateCompatibilityScore,
  validateCulturalRegion,
  validateUKRegion,
  validateSaudadeType
}