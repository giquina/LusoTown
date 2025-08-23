-- Phase 2 AI-Enhanced Matching System Database Schema
-- Created: 2025-08-22
-- Purpose: Comprehensive database support for Portuguese cultural AI matching system

-- Cultural Compatibility Profiles table
CREATE TABLE IF NOT EXISTS public.cultural_compatibility_profiles (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
    
    -- Cultural Heritage Data
    cultural_heritage JSONB NOT NULL DEFAULT '{
        "portuguese_regions": [],
        "family_heritage": "second_generation",
        "heritage_strength": 70,
        "cultural_practices": [],
        "language_fluency": {
            "portuguese": 5,
            "english": 8,
            "regional_dialects": []
        }
    }',
    
    -- Saudade Analysis Data
    saudade_analysis JSONB NOT NULL DEFAULT '{
        "emotional_connection_score": 70,
        "homeland_attachment": 70,
        "cultural_nostalgia_level": 70,
        "emotional_expression_style": "balanced",
        "music_emotional_response": ["fado"],
        "tradition_importance": 70
    }',
    
    -- Lifestyle Preferences
    lifestyle_preferences JSONB NOT NULL DEFAULT '{
        "social_style": "community_active",
        "event_preferences": [],
        "relationship_goals": [],
        "communication_style": "warm",
        "family_values": 80,
        "community_involvement": 70
    }',
    
    -- Regional Specialization
    regional_specialization JSONB NOT NULL DEFAULT '{
        "uk_residence_area": "london_central",
        "preferred_meeting_areas": [],
        "travel_willingness": 75,
        "cultural_center_affiliations": [],
        "university_connections": []
    }',
    
    -- AI Insights
    ai_insights JSONB NOT NULL DEFAULT '{
        "personality_type": "cultural_connector",
        "compatibility_factors": [],
        "conversation_style": "emotional",
        "relationship_readiness": 75,
        "cultural_growth_potential": 70,
        "community_influence": 60
    }',
    
    -- Profile metadata
    profile_completeness INTEGER DEFAULT 70 CHECK (profile_completeness >= 0 AND profile_completeness <= 100),
    last_ai_analysis TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- AI Match Predictions table
CREATE TABLE IF NOT EXISTS public.ai_match_predictions (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id_1 uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    user_id_2 uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    
    -- Compatibility Scores
    compatibility_score INTEGER NOT NULL CHECK (compatibility_score >= 0 AND compatibility_score <= 100),
    cultural_harmony INTEGER NOT NULL CHECK (cultural_harmony >= 0 AND cultural_harmony <= 100),
    saudade_resonance INTEGER NOT NULL CHECK (saudade_resonance >= 0 AND saudade_resonance <= 100),
    conversation_potential INTEGER NOT NULL CHECK (conversation_potential >= 0 AND conversation_potential <= 100),
    relationship_longevity INTEGER NOT NULL CHECK (relationship_longevity >= 0 AND relationship_longevity <= 100),
    shared_values_score INTEGER NOT NULL CHECK (shared_values_score >= 0 AND shared_values_score <= 100),
    regional_compatibility INTEGER NOT NULL CHECK (regional_compatibility >= 0 AND regional_compatibility <= 100),
    
    -- Detailed Analysis
    prediction_data JSONB NOT NULL,
    
    -- AI Model Information
    model_version VARCHAR(20) NOT NULL DEFAULT '2.0',
    prediction_confidence DECIMAL(3,2) DEFAULT 0.75 CHECK (prediction_confidence >= 0 AND prediction_confidence <= 1),
    
    -- Success Tracking
    actual_outcome VARCHAR(20) CHECK (actual_outcome IN ('excellent', 'good', 'moderate', 'poor', 'failed')),
    prediction_accuracy INTEGER CHECK (prediction_accuracy >= 0 AND prediction_accuracy <= 100),
    feedback_collected BOOLEAN DEFAULT false,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    
    -- Ensure no duplicate predictions
    UNIQUE(user_id_1, user_id_2),
    -- Ensure user_id_1 is always less than user_id_2 for consistency
    CONSTRAINT ordered_user_ids CHECK (user_id_1 < user_id_2)
);

-- Behavioral Learning Data table
CREATE TABLE IF NOT EXISTS public.behavioral_learning_data (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    match_id VARCHAR(100) NOT NULL,
    user_ids uuid[] NOT NULL,
    
    -- Interaction Data
    interaction_data JSONB NOT NULL DEFAULT '{
        "message_frequency": 0,
        "response_time_avg": 0,
        "conversation_depth": 0,
        "emoji_usage": 0,
        "cultural_references": 0,
        "meetup_frequency": 0
    }',
    
    -- Relationship Progression
    relationship_progression JSONB NOT NULL DEFAULT '{
        "initial_interest": 75,
        "sustained_engagement": 60,
        "meeting_success": 50,
        "relationship_satisfaction": 60,
        "cultural_bonding": 65
    }',
    
    -- Outcome Classification
    outcome_classification VARCHAR(20) NOT NULL CHECK (outcome_classification IN ('excellent', 'good', 'moderate', 'poor', 'failed')),
    
    -- Feedback Data
    feedback_data JSONB NOT NULL DEFAULT '{}',
    
    -- Learning Features for ML
    learning_features JSONB NOT NULL DEFAULT '{}',
    
    -- Processing Status
    processed_for_learning BOOLEAN DEFAULT false,
    learning_impact_score DECIMAL(3,2) DEFAULT 0.5,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- User Learning Data table (continuous learning per user)
CREATE TABLE IF NOT EXISTS public.user_learning_data (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
    
    -- Learning Data
    learning_data JSONB NOT NULL DEFAULT '{
        "interactionHistory": {
            "messagePatterns": [],
            "responseQuality": [],
            "culturalReferenceUsage": 0,
            "meetingOutcomes": []
        },
        "relationshipOutcomes": {
            "successfulMatches": 0,
            "averageRelationshipDuration": 0,
            "culturalCompatibilityFeedback": 70,
            "recommendationAccuracy": 70
        },
        "preferenceEvolution": {
            "initialPreferences": {},
            "currentPreferences": {},
            "preferenceStability": 0.8,
            "culturalGrowth": 70
        }
    }',
    
    -- Learning Metrics
    learning_score INTEGER DEFAULT 70 CHECK (learning_score >= 0 AND learning_score <= 100),
    preference_stability DECIMAL(3,2) DEFAULT 0.8,
    cultural_growth_rate DECIMAL(3,2) DEFAULT 0.05,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- AI Matching Analytics table
CREATE TABLE IF NOT EXISTS public.ai_matching_analytics (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    
    -- Search Context
    search_context JSONB NOT NULL,
    preferences_used JSONB NOT NULL,
    
    -- Results
    matches_found INTEGER NOT NULL,
    average_compatibility DECIMAL(5,2) NOT NULL,
    average_confidence DECIMAL(3,2) NOT NULL,
    
    -- Model Information
    model_version VARCHAR(20) NOT NULL DEFAULT '2.0',
    
    -- Performance Tracking
    user_clicked_matches INTEGER DEFAULT 0,
    user_messaged_matches INTEGER DEFAULT 0,
    user_met_matches INTEGER DEFAULT 0,
    user_satisfaction_rating INTEGER CHECK (user_satisfaction_rating >= 1 AND user_satisfaction_rating <= 5),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- AI Model Performance tracking
CREATE TABLE IF NOT EXISTS public.ai_model_performance (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    
    -- Model Information
    model_version VARCHAR(20) NOT NULL,
    model_type VARCHAR(50) NOT NULL, -- 'compatibility', 'conversation', 'saudade', etc.
    
    -- Performance Metrics
    accuracy DECIMAL(5,4) NOT NULL,
    precision_score DECIMAL(5,4) NOT NULL,
    recall_score DECIMAL(5,4) NOT NULL,
    f1_score DECIMAL(5,4) NOT NULL,
    prediction_accuracy DECIMAL(5,4) NOT NULL,
    user_satisfaction DECIMAL(5,4) NOT NULL,
    
    -- Sample Information
    sample_size INTEGER NOT NULL,
    test_period_start TIMESTAMP WITH TIME ZONE NOT NULL,
    test_period_end TIMESTAMP WITH TIME ZONE NOT NULL,
    
    -- Regional Performance
    regional_performance JSONB DEFAULT '{}',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Match Interaction Analytics table (for learning)
CREATE TABLE IF NOT EXISTS public.match_interaction_analytics (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    match_id VARCHAR(100) NOT NULL,
    user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    target_user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    
    -- Interaction Metrics
    message_frequency DECIMAL(5,2) DEFAULT 0,
    response_time_avg INTEGER DEFAULT 0, -- in minutes
    conversation_depth INTEGER DEFAULT 0, -- messages per conversation
    emoji_usage DECIMAL(3,2) DEFAULT 0,
    cultural_references INTEGER DEFAULT 0,
    meetup_frequency DECIMAL(3,2) DEFAULT 0,
    
    -- Quality Metrics
    conversation_quality_score INTEGER CHECK (conversation_quality_score >= 0 AND conversation_quality_score <= 100),
    cultural_connection_score INTEGER CHECK (cultural_connection_score >= 0 AND cultural_connection_score <= 100),
    relationship_progression_score INTEGER CHECK (relationship_progression_score >= 0 AND relationship_progression_score <= 100),
    
    -- Relationship Status
    relationship_status VARCHAR(30) DEFAULT 'messaging' CHECK (relationship_status IN ('messaging', 'meeting_planned', 'met_once', 'dating', 'relationship', 'ended', 'blocked')),
    relationship_duration_days INTEGER DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Relationship Progression Analytics table
CREATE TABLE IF NOT EXISTS public.relationship_progression_analytics (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    match_id VARCHAR(100) NOT NULL UNIQUE,
    
    -- Progression Scores
    initial_interest INTEGER DEFAULT 75 CHECK (initial_interest >= 0 AND initial_interest <= 100),
    sustained_engagement INTEGER DEFAULT 60 CHECK (sustained_engagement >= 0 AND sustained_engagement <= 100),
    meeting_success INTEGER DEFAULT 50 CHECK (meeting_success >= 0 AND meeting_success <= 100),
    relationship_satisfaction INTEGER DEFAULT 60 CHECK (relationship_satisfaction >= 0 AND relationship_satisfaction <= 100),
    cultural_bonding INTEGER DEFAULT 65 CHECK (cultural_bonding >= 0 AND cultural_bonding <= 100),
    
    -- Timeline
    first_message_date TIMESTAMP WITH TIME ZONE,
    first_meeting_date TIMESTAMP WITH TIME ZONE,
    relationship_start_date TIMESTAMP WITH TIME ZONE,
    relationship_end_date TIMESTAMP WITH TIME ZONE,
    
    -- Outcomes
    final_outcome VARCHAR(30) CHECK (final_outcome IN ('successful_relationship', 'friendship', 'casual_dating', 'no_connection', 'blocked', 'other')),
    outcome_rating INTEGER CHECK (outcome_rating >= 1 AND outcome_rating <= 5),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- AI Recommendation Analytics table
CREATE TABLE IF NOT EXISTS public.ai_recommendation_analytics (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    
    -- Recommendation Data
    recommendation_count INTEGER NOT NULL,
    avg_compatibility_score DECIMAL(5,2) NOT NULL,
    avg_confidence DECIMAL(3,2) NOT NULL,
    
    -- Model Information
    model_version VARCHAR(20) NOT NULL DEFAULT '2.0',
    
    -- Success Tracking
    recommendations_clicked INTEGER DEFAULT 0,
    recommendations_messaged INTEGER DEFAULT 0,
    recommendations_met INTEGER DEFAULT 0,
    
    -- Feedback
    user_feedback_score INTEGER CHECK (user_feedback_score >= 1 AND user_feedback_score <= 5),
    feedback_comments TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- AI Notification Templates table (enhanced from existing system)
CREATE TABLE IF NOT EXISTS public.ai_notification_templates (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('cultural', 'business', 'social', 'educational', 'emergency', 'ai_matching')),
    
    -- Template Content
    content_variations JSONB NOT NULL DEFAULT '{
        "formal": {"title": "", "message": "", "title_pt": "", "message_pt": ""},
        "casual": {"title": "", "message": "", "title_pt": "", "message_pt": ""},
        "friendly": {"title": "", "message": "", "title_pt": "", "message_pt": ""}
    }',
    
    -- Cultural Context
    cultural_contexts JSONB NOT NULL DEFAULT '[]',
    dynamic_variables TEXT[] DEFAULT '{}',
    engagement_triggers TEXT[] DEFAULT '{}',
    target_diaspora_groups TEXT[] DEFAULT '{}',
    
    -- AI Enhancement
    ai_personalization_level VARCHAR(20) DEFAULT 'medium' CHECK (ai_personalization_level IN ('low', 'medium', 'high', 'maximum')),
    cultural_adaptation_required BOOLEAN DEFAULT true,
    saudade_sensitivity_level INTEGER DEFAULT 50 CHECK (saudade_sensitivity_level >= 0 AND saudade_sensitivity_level <= 100),
    
    -- Status
    is_active BOOLEAN DEFAULT true,
    requires_cultural_approval BOOLEAN DEFAULT false,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Cultural Personalization Rules table
CREATE TABLE IF NOT EXISTS public.cultural_personalization_rules (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    region VARCHAR(50) NOT NULL,
    
    -- Content Adaptations
    content_adaptations JSONB NOT NULL DEFAULT '{
        "greeting_style": "",
        "cultural_references": [],
        "local_context": [],
        "communication_tone": "warm"
    }',
    
    -- Timing Preferences
    optimal_timing JSONB NOT NULL DEFAULT '{
        "preferred_hours": [19, 20, 21],
        "cultural_events_awareness": [],
        "holiday_considerations": []
    }',
    
    -- Cultural Weights
    cultural_weight_adjustments JSONB NOT NULL DEFAULT '{
        "heritage_importance": 0.85,
        "language_priority": 0.75,
        "community_connection": 0.90,
        "traditional_values": 0.70
    }',
    
    -- Success Patterns
    success_patterns JSONB NOT NULL DEFAULT '{}',
    
    -- Status
    is_active BOOLEAN DEFAULT true,
    last_updated_by VARCHAR(100),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    
    UNIQUE(region)
);

-- Success Feedback Loop Analytics
CREATE TABLE IF NOT EXISTS public.match_success_analytics (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    
    -- Match Information
    user_id_1 uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    user_id_2 uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    original_prediction_id uuid REFERENCES public.ai_match_predictions(id),
    
    -- Success Metrics
    success_score INTEGER NOT NULL CHECK (success_score >= 0 AND success_score <= 100),
    cultural_connection_success INTEGER CHECK (cultural_connection_success >= 0 AND cultural_connection_success <= 100),
    communication_success INTEGER CHECK (communication_success >= 0 AND communication_success <= 100),
    relationship_longevity_days INTEGER DEFAULT 0,
    
    -- Feedback
    user_feedback JSONB DEFAULT '{}',
    satisfaction_ratings JSONB DEFAULT '{}',
    improvement_suggestions TEXT[],
    
    -- Learning Impact
    contributed_to_learning BOOLEAN DEFAULT false,
    learning_weight DECIMAL(3,2) DEFAULT 1.0,
    
    -- Platform
    platform VARCHAR(50) DEFAULT 'lusotown',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.cultural_compatibility_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_match_predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.behavioral_learning_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_learning_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_matching_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_model_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.match_interaction_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.relationship_progression_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_recommendation_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_notification_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cultural_personalization_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.match_success_analytics ENABLE ROW LEVEL SECURITY;

-- Row Level Security Policies

-- Cultural Compatibility Profiles
CREATE POLICY "Users can view and manage their own cultural profile" ON public.cultural_compatibility_profiles
    FOR ALL USING (auth.uid() = user_id);

-- AI Match Predictions
CREATE POLICY "Users can view their match predictions" ON public.ai_match_predictions
    FOR SELECT USING (auth.uid() = user_id_1 OR auth.uid() = user_id_2);

CREATE POLICY "System can create match predictions" ON public.ai_match_predictions
    FOR INSERT WITH CHECK (true); -- Managed by AI system

CREATE POLICY "Users can update outcome feedback on their predictions" ON public.ai_match_predictions
    FOR UPDATE USING (auth.uid() = user_id_1 OR auth.uid() = user_id_2);

-- User Learning Data
CREATE POLICY "Users can manage their own learning data" ON public.user_learning_data
    FOR ALL USING (auth.uid() = user_id);

-- AI Analytics (read-only for users, full access for system)
CREATE POLICY "Users can view their own analytics" ON public.ai_matching_analytics
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can manage analytics" ON public.ai_matching_analytics
    FOR INSERT WITH CHECK (true);

-- Match Interaction Analytics
CREATE POLICY "Users can view their interaction analytics" ON public.match_interaction_analytics
    FOR SELECT USING (auth.uid() = user_id OR auth.uid() = target_user_id);

CREATE POLICY "System can manage interaction analytics" ON public.match_interaction_analytics
    FOR ALL USING (true); -- Managed by system

-- AI Notification Templates (public read for active templates)
CREATE POLICY "Authenticated users can view active notification templates" ON public.ai_notification_templates
    FOR SELECT USING (auth.role() = 'authenticated' AND is_active = true);

-- Cultural Personalization Rules (public read for active rules)
CREATE POLICY "Authenticated users can view active personalization rules" ON public.cultural_personalization_rules
    FOR SELECT USING (auth.role() = 'authenticated' AND is_active = true);

-- Other tables have system-only access for AI processing

-- Indexes for Performance

-- Cultural Compatibility Profiles
CREATE INDEX idx_cultural_profiles_user_id ON public.cultural_compatibility_profiles(user_id);
CREATE INDEX idx_cultural_profiles_heritage ON public.cultural_compatibility_profiles USING GIN(cultural_heritage);
CREATE INDEX idx_cultural_profiles_region ON public.cultural_compatibility_profiles USING GIN((regional_specialization->>'uk_residence_area'));
CREATE INDEX idx_cultural_profiles_completeness ON public.cultural_compatibility_profiles(profile_completeness);

-- AI Match Predictions
CREATE INDEX idx_ai_predictions_users ON public.ai_match_predictions(user_id_1, user_id_2);
CREATE INDEX idx_ai_predictions_compatibility ON public.ai_match_predictions(compatibility_score);
CREATE INDEX idx_ai_predictions_model_version ON public.ai_match_predictions(model_version);
CREATE INDEX idx_ai_predictions_created_at ON public.ai_match_predictions(created_at);

-- Behavioral Learning Data
CREATE INDEX idx_behavioral_learning_match_id ON public.behavioral_learning_data(match_id);
CREATE INDEX idx_behavioral_learning_outcome ON public.behavioral_learning_data(outcome_classification);
CREATE INDEX idx_behavioral_learning_processed ON public.behavioral_learning_data(processed_for_learning);

-- User Learning Data
CREATE INDEX idx_user_learning_user_id ON public.user_learning_data(user_id);
CREATE INDEX idx_user_learning_score ON public.user_learning_data(learning_score);

-- AI Analytics
CREATE INDEX idx_ai_analytics_user_id ON public.ai_matching_analytics(user_id);
CREATE INDEX idx_ai_analytics_created_at ON public.ai_matching_analytics(created_at);
CREATE INDEX idx_ai_analytics_satisfaction ON public.ai_matching_analytics(user_satisfaction_rating);

-- Model Performance
CREATE INDEX idx_model_performance_version ON public.ai_model_performance(model_version, model_type);
CREATE INDEX idx_model_performance_accuracy ON public.ai_model_performance(accuracy);

-- Match Interactions
CREATE INDEX idx_match_interactions_match_id ON public.match_interaction_analytics(match_id);
CREATE INDEX idx_match_interactions_users ON public.match_interaction_analytics(user_id, target_user_id);
CREATE INDEX idx_match_interactions_status ON public.match_interaction_analytics(relationship_status);

-- Relationship Progression
CREATE INDEX idx_relationship_progression_match_id ON public.relationship_progression_analytics(match_id);
CREATE INDEX idx_relationship_progression_outcome ON public.relationship_progression_analytics(final_outcome);

-- AI Notification Templates
CREATE INDEX idx_ai_templates_category ON public.ai_notification_templates(category, is_active);
CREATE INDEX idx_ai_templates_cultural_level ON public.ai_notification_templates(ai_personalization_level);

-- Cultural Rules
CREATE INDEX idx_cultural_rules_region ON public.cultural_personalization_rules(region, is_active);

-- Success Analytics
CREATE INDEX idx_success_analytics_users ON public.match_success_analytics(user_id_1, user_id_2);
CREATE INDEX idx_success_analytics_success_score ON public.match_success_analytics(success_score);
CREATE INDEX idx_success_analytics_platform ON public.match_success_analytics(platform);

-- Triggers for updated_at

-- Cultural Compatibility Profiles
CREATE TRIGGER handle_cultural_profiles_updated_at BEFORE UPDATE ON public.cultural_compatibility_profiles
    FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

-- AI Match Predictions
CREATE TRIGGER handle_ai_predictions_updated_at BEFORE UPDATE ON public.ai_match_predictions
    FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

-- User Learning Data
CREATE TRIGGER handle_user_learning_updated_at BEFORE UPDATE ON public.user_learning_data
    FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

-- Match Interaction Analytics
CREATE TRIGGER handle_match_interactions_updated_at BEFORE UPDATE ON public.match_interaction_analytics
    FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

-- Relationship Progression Analytics
CREATE TRIGGER handle_relationship_progression_updated_at BEFORE UPDATE ON public.relationship_progression_analytics
    FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

-- AI Notification Templates
CREATE TRIGGER handle_ai_templates_updated_at BEFORE UPDATE ON public.ai_notification_templates
    FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

-- Cultural Personalization Rules
CREATE TRIGGER handle_cultural_rules_updated_at BEFORE UPDATE ON public.cultural_personalization_rules
    FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

-- Success Analytics
CREATE TRIGGER handle_success_analytics_updated_at BEFORE UPDATE ON public.match_success_analytics
    FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

-- Insert default AI notification templates for matching system
INSERT INTO public.ai_notification_templates (id, name, category, content_variations, cultural_contexts, ai_personalization_level) VALUES
('ai_matches_found', 'AI Matches Found', 'ai_matching', '{
    "formal": {
        "title": "Compatible Portuguese-speaking community Matches Found",
        "message": "Our AI system has identified highly compatible matches based on your Portuguese cultural preferences.",
        "title_pt": "Encontradas Combinações Compatíveis da Comunidade de Falantes de Português",
        "message_pt": "O nosso sistema de IA identificou combinações altamente compatíveis baseadas nas suas preferências culturais portuguesas."
    },
    "casual": {
        "title": "Great Portuguese Matches Found! 🇵🇹",
        "message": "We found some amazing Portuguese-speaking community members who share your cultural values and interests!",
        "title_pt": "Encontradas Ótimas Combinações Portuguesas! 🇵🇹",
        "message_pt": "Encontrámos alguns membros incríveis da comunidade de falantes de português que partilham os seus valores culturais e interesses!"
    },
    "friendly": {
        "title": "Your Portuguese Soul Mates Await! 💙",
        "message": "Discover meaningful connections with fellow Portuguese hearts who understand your saudade and cultural journey.",
        "title_pt": "As Suas Almas Gémeas Portuguesas Esperam! 💙",
        "message_pt": "Descubra conexões significativas com companheiros portugueses que compreendem a sua saudade e jornada cultural."
    }
}', '[{"portuguese_region": "all", "cultural_significance": "AI matching system"}]', 'maximum'),

('cultural_compatibility_high', 'High Cultural Compatibility Match', 'ai_matching', '{
    "formal": {
        "title": "Exceptional Cultural Compatibility Detected",
        "message": "A Portuguese-speaking community member with remarkable cultural alignment has been identified for you.",
        "title_pt": "Compatibilidade Cultural Excepcional Detectada",
        "message_pt": "Foi identificado um membro da comunidade de falantes de português com alinhamento cultural notável para si."
    },
    "casual": {
        "title": "Amazing Cultural Connection Found! ✨",
        "message": "Someone with your Portuguese cultural depth and saudade understanding is waiting to connect!",
        "title_pt": "Encontrada Conexão Cultural Incrível! ✨",
        "message_pt": "Alguém com a sua profundidade cultural portuguesa e compreensão da saudade está à espera de se conectar!"
    },
    "friendly": {
        "title": "A Kindred Portuguese Spirit! 🌟",
        "message": "We found someone who truly gets your Portuguese heart and cultural journey. This could be special!",
        "title_pt": "Um Espírito Português Afim! 🌟",
        "message_pt": "Encontrámos alguém que realmente compreende o seu coração português e jornada cultural. Isto pode ser especial!"
    }
}', '[{"portuguese_region": "all", "cultural_significance": "High compatibility match"}]', 'maximum');

-- Insert default cultural personalization rules
INSERT INTO public.cultural_personalization_rules (region, content_adaptations, optimal_timing, cultural_weight_adjustments, success_patterns) VALUES
('norte', '{
    "greeting_style": "Olá, conterrâneo",
    "cultural_references": ["francesinha", "vinho verde", "São João do Porto"],
    "local_context": ["Invicta", "Douro", "Minho"],
    "communication_tone": "warm"
}', '{
    "preferred_hours": [19, 20, 21],
    "cultural_events_awareness": ["São João", "Festa do Avante"],
    "holiday_considerations": ["Santos Populares"]
}', '{
    "heritage_importance": 0.90,
    "language_priority": 0.85,
    "community_connection": 0.95,
    "traditional_values": 0.85
}', '{
    "high_success_combinations": [
        {
            "description": "Traditional families with strong community ties",
            "factors": ["family_values", "community_involvement", "traditional_lifestyle"],
            "success_rate": 0.88
        }
    ]
}'),

('lisboa', '{
    "greeting_style": "Olá, lisboeta",
    "cultural_references": ["pastéis de nata", "fado", "Santo António"],
    "local_context": ["Tejo", "Alfama", "Bairro Alto"],
    "communication_tone": "casual"
}', '{
    "preferred_hours": [18, 19, 20],
    "cultural_events_awareness": ["Santo António", "Rock in Rio Lisboa"],
    "holiday_considerations": ["Festa de Lisboa"]
}', '{
    "heritage_importance": 0.80,
    "language_priority": 0.70,
    "community_connection": 0.85,
    "traditional_values": 0.65
}', '{
    "high_success_combinations": [
        {
            "description": "Urban professionals with cultural appreciation",
            "factors": ["professional_compatibility", "cultural_events", "modern_lifestyle"],
            "success_rate": 0.84
        }
    ]
}'),

('london_central', '{
    "greeting_style": "Hello there",
    "cultural_references": ["Portuguese-speaking community", "cultural events", "heritage"],
    "local_context": ["London", "United Kingdom Portuguese", "diaspora"],
    "communication_tone": "warm"
}', '{
    "preferred_hours": [18, 19, 20],
    "cultural_events_awareness": ["Portuguese festivals", "cultural center events"],
    "holiday_considerations": ["United Kingdom holidays", "Portuguese holidays"]
}', '{
    "heritage_importance": 0.85,
    "language_priority": 0.75,
    "community_connection": 0.90,
    "traditional_values": 0.70
}', '{
    "high_success_combinations": [
        {
            "description": "Expatriate professionals maintaining cultural ties",
            "factors": ["cultural_balance", "professional_success", "community_engagement"],
            "success_rate": 0.82
        }
    ]
}');

-- Comments for documentation
COMMENT ON TABLE public.cultural_compatibility_profiles IS 'AI-enhanced cultural compatibility profiles for Portuguese-speaking community matching';
COMMENT ON TABLE public.ai_match_predictions IS 'AI-generated match predictions with cultural compatibility analysis';
COMMENT ON TABLE public.behavioral_learning_data IS 'Behavioral learning data for continuous AI improvement';
COMMENT ON TABLE public.user_learning_data IS 'Individual user learning data for personalization';
COMMENT ON TABLE public.ai_matching_analytics IS 'Analytics for AI matching system performance';
COMMENT ON TABLE public.match_success_analytics IS 'Success feedback loop data for AI learning';

-- Success message
SELECT 'Phase 2 AI-Enhanced Matching System database schema created successfully! 🚀🇵🇹' as status;