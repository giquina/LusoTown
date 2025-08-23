-- Comprehensive AI Infrastructure and Cloud Services Integration
-- Created: 2025-08-22
-- Purpose: Complete AI infrastructure for Portuguese-speaking community platform

-- =====================================================
-- AI CLOUD SERVICES CONFIGURATION
-- =====================================================

-- Table to store AI service configurations and API keys
CREATE TABLE IF NOT EXISTS public.ai_service_configs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    service_name TEXT NOT NULL UNIQUE CHECK (service_name IN (
        'openai', 'azure_openai', 'google_cloud_ai', 'anthropic', 
        'hugging_face', 'aws_comprehend', 'azure_cognitive_services'
    )),
    service_type TEXT NOT NULL CHECK (service_type IN (
        'llm', 'translation', 'sentiment_analysis', 'speech_to_text', 
        'text_to_speech', 'computer_vision', 'document_analysis'
    )),
    configuration JSONB NOT NULL DEFAULT '{}',
    capabilities TEXT[] DEFAULT '{}',
    rate_limits JSONB DEFAULT '{}',
    cost_per_request DECIMAL(10,6) DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    is_primary BOOLEAN DEFAULT false, -- Primary service for each type
    health_status TEXT DEFAULT 'unknown' CHECK (health_status IN ('healthy', 'degraded', 'unhealthy', 'unknown')),
    last_health_check TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- AI service usage tracking for cost monitoring and optimization
CREATE TABLE IF NOT EXISTS public.ai_service_usage (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    service_name TEXT NOT NULL,
    operation_type TEXT NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    request_tokens INTEGER DEFAULT 0,
    response_tokens INTEGER DEFAULT 0,
    total_cost DECIMAL(10,6) DEFAULT 0,
    latency_ms INTEGER,
    success BOOLEAN DEFAULT true,
    error_message TEXT,
    request_metadata JSONB DEFAULT '{}',
    cultural_context TEXT, -- Portuguese cultural context
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =====================================================
-- AI PERFORMANCE MONITORING SYSTEM
-- =====================================================

-- AI model performance metrics
CREATE TABLE IF NOT EXISTS public.ai_model_performance (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    model_name TEXT NOT NULL,
    model_version TEXT NOT NULL,
    performance_metric TEXT NOT NULL CHECK (performance_metric IN (
        'accuracy', 'precision', 'recall', 'f1_score', 'latency', 
        'cultural_authenticity', 'portuguese_language_quality', 'saudade_detection_accuracy'
    )),
    metric_value DECIMAL(10,6) NOT NULL,
    measurement_date DATE NOT NULL,
    test_dataset_size INTEGER,
    cultural_context TEXT, -- Which Portuguese cultural context was tested
    benchmark_comparison JSONB DEFAULT '{}',
    improvement_suggestions TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    
    UNIQUE(model_name, model_version, performance_metric, measurement_date, cultural_context)
);

-- AI feature performance tracking for Portuguese-speaking community features
CREATE TABLE IF NOT EXISTS public.ai_feature_performance (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    feature_name TEXT NOT NULL CHECK (feature_name IN (
        'notification_optimization', 'cultural_matching', 'saudade_detection', 
        'lusobot_conversations', 'community_analytics', 'event_prediction',
        'churn_prediction', 'content_personalization', 'language_detection'
    )),
    performance_date DATE NOT NULL,
    total_requests INTEGER DEFAULT 0,
    successful_requests INTEGER DEFAULT 0,
    average_response_time_ms DECIMAL(10,2),
    user_satisfaction_score DECIMAL(3,2), -- 1-5 scale
    cultural_accuracy_score DECIMAL(3,2), -- 1-5 scale
    engagement_improvement_percentage DECIMAL(5,2),
    error_rate DECIMAL(5,4),
    top_errors JSONB DEFAULT '{}',
    user_feedback_summary JSONB DEFAULT '{}',
    portuguese_specific_metrics JSONB DEFAULT '{}', -- Metrics specific to Portuguese culture
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    
    UNIQUE(feature_name, performance_date)
);

-- =====================================================
-- AI ETHICAL GUIDELINES AND CULTURAL SENSITIVITY
-- =====================================================

-- Portuguese cultural sensitivity guidelines for AI
CREATE TABLE IF NOT EXISTS public.ai_cultural_guidelines (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    guideline_category TEXT NOT NULL CHECK (guideline_category IN (
        'language_usage', 'cultural_representation', 'saudade_sensitivity', 
        'religious_respect', 'generational_differences', 'regional_variations',
        'diaspora_experiences', 'family_values', 'tradition_preservation'
    )),
    guideline_title TEXT NOT NULL,
    guideline_description TEXT NOT NULL,
    implementation_rules JSONB NOT NULL,
    examples JSONB DEFAULT '{}',
    violations_to_avoid TEXT[],
    portuguese_regions_applicable TEXT[] DEFAULT '{}', -- Which regions this applies to
    generation_considerations JSONB DEFAULT '{}', -- Different rules for different generations
    severity_level TEXT DEFAULT 'medium' CHECK (severity_level IN ('low', 'medium', 'high', 'critical')),
    compliance_required BOOLEAN DEFAULT true,
    last_reviewed DATE,
    reviewed_by TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- AI ethics violation tracking
CREATE TABLE IF NOT EXISTS public.ai_ethics_violations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    violation_type TEXT NOT NULL,
    guideline_id UUID REFERENCES public.ai_cultural_guidelines(id),
    ai_service_name TEXT,
    ai_model_name TEXT,
    violation_description TEXT NOT NULL,
    cultural_context TEXT,
    affected_user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    severity_level TEXT NOT NULL CHECK (severity_level IN ('low', 'medium', 'high', 'critical')),
    detection_method TEXT CHECK (detection_method IN ('automated', 'user_report', 'manual_review')),
    resolution_status TEXT DEFAULT 'open' CHECK (resolution_status IN ('open', 'investigating', 'resolved', 'dismissed')),
    resolution_actions TEXT[],
    resolution_date TIMESTAMP WITH TIME ZONE,
    prevention_measures TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =====================================================
-- AI-ENHANCED API ENDPOINTS CONFIGURATION
-- =====================================================

-- Enhanced API endpoints with AI capabilities
CREATE TABLE IF NOT EXISTS public.ai_enhanced_endpoints (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    endpoint_path TEXT NOT NULL UNIQUE,
    endpoint_method TEXT NOT NULL CHECK (endpoint_method IN ('GET', 'POST', 'PUT', 'DELETE', 'PATCH')),
    ai_capabilities TEXT[] DEFAULT '{}', -- e.g., ['personalization', 'translation', 'cultural_adaptation']
    portuguese_features TEXT[] DEFAULT '{}', -- Portuguese-specific features
    request_processing_pipeline JSONB NOT NULL, -- AI processing steps
    response_enhancement_rules JSONB DEFAULT '{}',
    cultural_adaptation_enabled BOOLEAN DEFAULT false,
    saudade_awareness_enabled BOOLEAN DEFAULT false,
    bilingual_support_enabled BOOLEAN DEFAULT false,
    performance_sla_ms INTEGER DEFAULT 5000, -- Max response time in milliseconds
    rate_limit_per_minute INTEGER DEFAULT 60,
    authentication_required BOOLEAN DEFAULT true,
    subscription_tier_required TEXT, -- Which subscription tier needed
    usage_analytics_enabled BOOLEAN DEFAULT true,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- API endpoint usage analytics
CREATE TABLE IF NOT EXISTS public.api_usage_analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    endpoint_id UUID REFERENCES public.ai_enhanced_endpoints(id),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    request_timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    response_time_ms INTEGER,
    status_code INTEGER,
    ai_features_used TEXT[],
    cultural_adaptations_applied TEXT[],
    portuguese_language_detected BOOLEAN DEFAULT false,
    saudade_context_detected BOOLEAN DEFAULT false,
    user_satisfaction_rating INTEGER CHECK (user_satisfaction_rating BETWEEN 1 AND 5),
    error_details JSONB,
    request_size_bytes INTEGER,
    response_size_bytes INTEGER,
    cache_hit BOOLEAN DEFAULT false,
    cultural_context TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =====================================================
-- AI RECOMMENDATION ENGINE
-- =====================================================

-- AI-powered recommendation system for Portuguese-speaking community
CREATE TABLE IF NOT EXISTS public.ai_recommendations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    recommendation_type TEXT NOT NULL CHECK (recommendation_type IN (
        'cultural_event', 'community_connection', 'business_discovery', 
        'content_consumption', 'language_learning', 'saudade_support',
        'cultural_activity', 'professional_networking', 'family_service'
    )),
    recommended_item_id UUID, -- Generic ID for recommended item
    recommended_item_type TEXT NOT NULL CHECK (recommended_item_type IN (
        'event', 'user_profile', 'business', 'content', 'group', 'service'
    )),
    recommendation_title TEXT NOT NULL,
    recommendation_description TEXT,
    confidence_score DECIMAL(3,2) CHECK (confidence_score BETWEEN 0 AND 1),
    relevance_reasons TEXT[],
    cultural_relevance_score DECIMAL(3,2) CHECK (cultural_relevance_score BETWEEN 0 AND 1),
    saudade_therapeutic_value DECIMAL(3,2) CHECK (saudade_therapeutic_value BETWEEN 0 AND 1),
    portuguese_cultural_context TEXT,
    generational_appropriateness TEXT[], -- Which generations this is appropriate for
    regional_relevance TEXT[], -- Which Portuguese regions this is relevant for
    priority_score INTEGER DEFAULT 50 CHECK (priority_score BETWEEN 1 AND 100),
    expires_at TIMESTAMP WITH TIME ZONE,
    user_interaction TEXT CHECK (user_interaction IN ('viewed', 'clicked', 'saved', 'dismissed', 'acted_upon')),
    interaction_timestamp TIMESTAMP WITH TIME ZONE,
    feedback_rating INTEGER CHECK (feedback_rating BETWEEN 1 AND 5),
    feedback_text TEXT,
    ai_model_version TEXT DEFAULT '1.0',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =====================================================
-- AI DATA PIPELINE MANAGEMENT
-- =====================================================

-- AI data processing jobs for Portuguese-speaking community analytics
CREATE TABLE IF NOT EXISTS public.ai_data_processing_jobs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    job_name TEXT NOT NULL,
    job_type TEXT NOT NULL CHECK (job_type IN (
        'user_behavior_analysis', 'cultural_trend_detection', 'saudade_pattern_analysis',
        'community_health_assessment', 'churn_prediction', 'event_success_prediction',
        'content_personalization', 'matching_optimization', 'notification_optimization'
    )),
    job_status TEXT DEFAULT 'pending' CHECK (job_status IN ('pending', 'running', 'completed', 'failed', 'cancelled')),
    input_data_source TEXT NOT NULL,
    output_destination TEXT NOT NULL,
    processing_parameters JSONB DEFAULT '{}',
    cultural_focus TEXT[], -- Which aspects of Portuguese culture to focus on
    target_user_segments TEXT[],
    data_processing_start TIMESTAMP WITH TIME ZONE,
    data_processing_end TIMESTAMP WITH TIME ZONE,
    records_processed INTEGER DEFAULT 0,
    records_failed INTEGER DEFAULT 0,
    processing_errors JSONB DEFAULT '{}',
    results_summary JSONB DEFAULT '{}',
    insights_generated TEXT[],
    recommendations_created INTEGER DEFAULT 0,
    next_scheduled_run TIMESTAMP WITH TIME ZONE,
    is_recurring BOOLEAN DEFAULT false,
    recurrence_pattern TEXT, -- cron pattern
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =====================================================
-- LUSOBOT AI ENHANCEMENT TABLES
-- =====================================================

-- Enhanced LusoBot conversation context storage
CREATE TABLE IF NOT EXISTS public.lusobot_conversation_context (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    session_id TEXT NOT NULL,
    conversation_summary TEXT,
    user_emotional_state JSONB DEFAULT '{}', -- saudade level, mood, etc.
    cultural_topics_discussed TEXT[],
    portuguese_language_preference TEXT CHECK (portuguese_language_preference IN ('pt', 'en', 'mixed')),
    saudade_intensity_detected INTEGER CHECK (saudade_intensity_detected BETWEEN 0 AND 10),
    support_needs_identified TEXT[],
    cultural_connections_suggested INTEGER DEFAULT 0,
    follow_up_actions TEXT[],
    conversation_effectiveness_score DECIMAL(3,2),
    cultural_authenticity_maintained BOOLEAN DEFAULT true,
    last_interaction TIMESTAMP WITH TIME ZONE,
    conversation_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    
    UNIQUE(user_id, session_id)
);

-- LusoBot knowledge base for Portuguese cultural information
CREATE TABLE IF NOT EXISTS public.lusobot_knowledge_base (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    knowledge_category TEXT NOT NULL CHECK (knowledge_category IN (
        'portuguese_history', 'cultural_traditions', 'regional_customs', 'cuisine_knowledge',
        'fado_music', 'language_variations', 'diaspora_experiences', 'saudade_psychology',
        'family_traditions', 'religious_practices', 'festivals_celebrations', 'uk_portuguese_community'
    )),
    topic_title TEXT NOT NULL,
    content_summary TEXT NOT NULL,
    detailed_information JSONB NOT NULL,
    portuguese_regions_relevant TEXT[] DEFAULT '{}',
    generational_relevance TEXT[] DEFAULT '{}',
    related_topics TEXT[],
    conversation_triggers TEXT[], -- Keywords that should trigger this knowledge
    emotional_context TEXT[], -- When this knowledge is emotionally relevant
    accuracy_score DECIMAL(3,2) DEFAULT 1.0,
    cultural_sensitivity_level TEXT DEFAULT 'high' CHECK (cultural_sensitivity_level IN ('low', 'medium', 'high')),
    last_verified DATE,
    verified_by TEXT,
    usage_count INTEGER DEFAULT 0,
    user_feedback_score DECIMAL(3,2),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =====================================================
-- INDEXES FOR PERFORMANCE OPTIMIZATION
-- =====================================================

-- AI Service Configuration Indexes
CREATE INDEX IF NOT EXISTS idx_ai_service_configs_service_type ON public.ai_service_configs(service_type);
CREATE INDEX IF NOT EXISTS idx_ai_service_configs_is_active ON public.ai_service_configs(is_active);
CREATE INDEX IF NOT EXISTS idx_ai_service_configs_is_primary ON public.ai_service_configs(is_primary);

-- AI Service Usage Indexes
CREATE INDEX IF NOT EXISTS idx_ai_service_usage_service_name ON public.ai_service_usage(service_name);
CREATE INDEX IF NOT EXISTS idx_ai_service_usage_user_id ON public.ai_service_usage(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_service_usage_created_at ON public.ai_service_usage(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_service_usage_cost ON public.ai_service_usage(total_cost DESC);

-- AI Model Performance Indexes
CREATE INDEX IF NOT EXISTS idx_ai_model_performance_model ON public.ai_model_performance(model_name, model_version);
CREATE INDEX IF NOT EXISTS idx_ai_model_performance_metric ON public.ai_model_performance(performance_metric);
CREATE INDEX IF NOT EXISTS idx_ai_model_performance_date ON public.ai_model_performance(measurement_date DESC);

-- AI Feature Performance Indexes
CREATE INDEX IF NOT EXISTS idx_ai_feature_performance_feature ON public.ai_feature_performance(feature_name);
CREATE INDEX IF NOT EXISTS idx_ai_feature_performance_date ON public.ai_feature_performance(performance_date DESC);

-- AI Cultural Guidelines Indexes
CREATE INDEX IF NOT EXISTS idx_ai_cultural_guidelines_category ON public.ai_cultural_guidelines(guideline_category);
CREATE INDEX IF NOT EXISTS idx_ai_cultural_guidelines_severity ON public.ai_cultural_guidelines(severity_level);
CREATE INDEX IF NOT EXISTS idx_ai_cultural_guidelines_active ON public.ai_cultural_guidelines(is_active);

-- AI Enhanced Endpoints Indexes
CREATE INDEX IF NOT EXISTS idx_ai_enhanced_endpoints_path ON public.ai_enhanced_endpoints(endpoint_path);
CREATE INDEX IF NOT EXISTS idx_ai_enhanced_endpoints_active ON public.ai_enhanced_endpoints(is_active);

-- API Usage Analytics Indexes
CREATE INDEX IF NOT EXISTS idx_api_usage_analytics_endpoint ON public.api_usage_analytics(endpoint_id);
CREATE INDEX IF NOT EXISTS idx_api_usage_analytics_user ON public.api_usage_analytics(user_id);
CREATE INDEX IF NOT EXISTS idx_api_usage_analytics_timestamp ON public.api_usage_analytics(request_timestamp DESC);

-- AI Recommendations Indexes
CREATE INDEX IF NOT EXISTS idx_ai_recommendations_user ON public.ai_recommendations(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_recommendations_type ON public.ai_recommendations(recommendation_type);
CREATE INDEX IF NOT EXISTS idx_ai_recommendations_expires ON public.ai_recommendations(expires_at);
CREATE INDEX IF NOT EXISTS idx_ai_recommendations_priority ON public.ai_recommendations(priority_score DESC);

-- AI Data Processing Jobs Indexes
CREATE INDEX IF NOT EXISTS idx_ai_data_jobs_status ON public.ai_data_processing_jobs(job_status);
CREATE INDEX IF NOT EXISTS idx_ai_data_jobs_type ON public.ai_data_processing_jobs(job_type);
CREATE INDEX IF NOT EXISTS idx_ai_data_jobs_next_run ON public.ai_data_processing_jobs(next_scheduled_run);

-- LusoBot Context Indexes
CREATE INDEX IF NOT EXISTS idx_lusobot_context_user ON public.lusobot_conversation_context(user_id);
CREATE INDEX IF NOT EXISTS idx_lusobot_context_session ON public.lusobot_conversation_context(session_id);
CREATE INDEX IF NOT EXISTS idx_lusobot_context_last_interaction ON public.lusobot_conversation_context(last_interaction DESC);

-- LusoBot Knowledge Base Indexes
CREATE INDEX IF NOT EXISTS idx_lusobot_knowledge_category ON public.lusobot_knowledge_base(knowledge_category);
CREATE INDEX IF NOT EXISTS idx_lusobot_knowledge_active ON public.lusobot_knowledge_base(is_active);
CREATE INDEX IF NOT EXISTS idx_lusobot_knowledge_usage ON public.lusobot_knowledge_base(usage_count DESC);

-- =====================================================
-- ROW LEVEL SECURITY POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE public.ai_service_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_service_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_model_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_feature_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_cultural_guidelines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_ethics_violations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_enhanced_endpoints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_usage_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_data_processing_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lusobot_conversation_context ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lusobot_knowledge_base ENABLE ROW LEVEL SECURITY;

-- AI Service Configuration Policies (admin only)
CREATE POLICY "Only admins can view AI service configs" ON public.ai_service_configs
    FOR SELECT USING (auth.jwt() ->> 'role' = 'admin');

-- AI Service Usage Policies
CREATE POLICY "Users can view their own AI usage" ON public.ai_service_usage
    FOR SELECT USING (auth.uid() = user_id OR auth.jwt() ->> 'role' = 'admin');

-- AI Performance Monitoring (public read for transparency)
CREATE POLICY "Public can view AI performance metrics" ON public.ai_model_performance
    FOR SELECT USING (true);

CREATE POLICY "Public can view AI feature performance" ON public.ai_feature_performance
    FOR SELECT USING (true);

-- AI Cultural Guidelines (public read)
CREATE POLICY "Public can view cultural guidelines" ON public.ai_cultural_guidelines
    FOR SELECT USING (is_active = true);

-- AI Ethics Violations (restricted)
CREATE POLICY "Only admins can view ethics violations" ON public.ai_ethics_violations
    FOR SELECT USING (auth.jwt() ->> 'role' = 'admin');

-- AI Enhanced Endpoints (public read for active endpoints)
CREATE POLICY "Public can view active AI endpoints" ON public.ai_enhanced_endpoints
    FOR SELECT USING (is_active = true);

-- API Usage Analytics
CREATE POLICY "Users can view their own API usage" ON public.api_usage_analytics
    FOR SELECT USING (auth.uid() = user_id OR auth.jwt() ->> 'role' = 'admin');

-- AI Recommendations
CREATE POLICY "Users can view their own recommendations" ON public.ai_recommendations
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own recommendation interactions" ON public.ai_recommendations
    FOR UPDATE USING (auth.uid() = user_id);

-- AI Data Processing Jobs (admin only)
CREATE POLICY "Only admins can view data processing jobs" ON public.ai_data_processing_jobs
    FOR SELECT USING (auth.jwt() ->> 'role' = 'admin');

-- LusoBot Conversation Context
CREATE POLICY "Users can view their own LusoBot context" ON public.lusobot_conversation_context
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own LusoBot context" ON public.lusobot_conversation_context
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own LusoBot context" ON public.lusobot_conversation_context
    FOR UPDATE USING (auth.uid() = user_id);

-- LusoBot Knowledge Base (public read)
CREATE POLICY "Public can view active LusoBot knowledge" ON public.lusobot_knowledge_base
    FOR SELECT USING (is_active = true);

-- =====================================================
-- TRIGGERS FOR AUTOMATED UPDATES
-- =====================================================

-- Create triggers for updated_at timestamps
CREATE TRIGGER handle_ai_service_configs_updated_at 
    BEFORE UPDATE ON public.ai_service_configs
    FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

CREATE TRIGGER handle_ai_enhanced_endpoints_updated_at 
    BEFORE UPDATE ON public.ai_enhanced_endpoints
    FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

CREATE TRIGGER handle_ai_cultural_guidelines_updated_at 
    BEFORE UPDATE ON public.ai_cultural_guidelines
    FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

CREATE TRIGGER handle_ai_data_processing_jobs_updated_at 
    BEFORE UPDATE ON public.ai_data_processing_jobs
    FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

CREATE TRIGGER handle_lusobot_conversation_context_updated_at 
    BEFORE UPDATE ON public.lusobot_conversation_context
    FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

CREATE TRIGGER handle_lusobot_knowledge_base_updated_at 
    BEFORE UPDATE ON public.lusobot_knowledge_base
    FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

-- =====================================================
-- FUNCTIONS FOR AI OPERATIONS
-- =====================================================

-- Function to track AI service usage
CREATE OR REPLACE FUNCTION track_ai_service_usage(
    p_service_name TEXT,
    p_operation_type TEXT,
    p_user_id UUID DEFAULT NULL,
    p_request_tokens INTEGER DEFAULT 0,
    p_response_tokens INTEGER DEFAULT 0,
    p_latency_ms INTEGER DEFAULT NULL,
    p_success BOOLEAN DEFAULT true,
    p_error_message TEXT DEFAULT NULL,
    p_cultural_context TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    usage_id UUID;
    service_config RECORD;
    total_cost DECIMAL(10,6) := 0;
BEGIN
    -- Get service configuration for cost calculation
    SELECT * INTO service_config 
    FROM ai_service_configs 
    WHERE service_name = p_service_name AND is_active = true;
    
    -- Calculate cost if service config exists
    IF service_config.id IS NOT NULL THEN
        total_cost := (p_request_tokens + p_response_tokens) * service_config.cost_per_request;
    END IF;
    
    -- Insert usage record
    INSERT INTO ai_service_usage (
        service_name, operation_type, user_id, request_tokens, 
        response_tokens, total_cost, latency_ms, success, 
        error_message, cultural_context
    ) VALUES (
        p_service_name, p_operation_type, p_user_id, p_request_tokens,
        p_response_tokens, total_cost, p_latency_ms, p_success,
        p_error_message, p_cultural_context
    ) RETURNING id INTO usage_id;
    
    RETURN usage_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create AI recommendations
CREATE OR REPLACE FUNCTION create_ai_recommendation(
    p_user_id UUID,
    p_recommendation_type TEXT,
    p_recommended_item_id UUID,
    p_recommended_item_type TEXT,
    p_title TEXT,
    p_description TEXT DEFAULT NULL,
    p_confidence_score DECIMAL(3,2) DEFAULT 0.5,
    p_cultural_context TEXT DEFAULT NULL,
    p_expires_hours INTEGER DEFAULT 168 -- 7 days default
)
RETURNS UUID AS $$
DECLARE
    recommendation_id UUID;
    expires_timestamp TIMESTAMP WITH TIME ZONE;
BEGIN
    -- Calculate expiration timestamp
    expires_timestamp := timezone('utc'::text, now()) + (p_expires_hours || ' hours')::INTERVAL;
    
    -- Insert recommendation
    INSERT INTO ai_recommendations (
        user_id, recommendation_type, recommended_item_id, recommended_item_type,
        recommendation_title, recommendation_description, confidence_score,
        portuguese_cultural_context, expires_at
    ) VALUES (
        p_user_id, p_recommendation_type, p_recommended_item_id, p_recommended_item_type,
        p_title, p_description, p_confidence_score, p_cultural_context, expires_timestamp
    ) RETURNING id INTO recommendation_id;
    
    RETURN recommendation_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update LusoBot conversation context
CREATE OR REPLACE FUNCTION update_lusobot_context(
    p_user_id UUID,
    p_session_id TEXT,
    p_emotional_state JSONB DEFAULT NULL,
    p_cultural_topics TEXT[] DEFAULT NULL,
    p_saudade_intensity INTEGER DEFAULT NULL,
    p_support_needs TEXT[] DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
    INSERT INTO lusobot_conversation_context (
        user_id, session_id, user_emotional_state, cultural_topics_discussed,
        saudade_intensity_detected, support_needs_identified, last_interaction,
        conversation_count
    ) VALUES (
        p_user_id, p_session_id, COALESCE(p_emotional_state, '{}'),
        COALESCE(p_cultural_topics, '{}'), p_saudade_intensity,
        COALESCE(p_support_needs, '{}'), timezone('utc'::text, now()), 1
    ) ON CONFLICT (user_id, session_id) DO UPDATE SET
        user_emotional_state = COALESCE(p_emotional_state, lusobot_conversation_context.user_emotional_state),
        cultural_topics_discussed = COALESCE(p_cultural_topics, lusobot_conversation_context.cultural_topics_discussed),
        saudade_intensity_detected = COALESCE(p_saudade_intensity, lusobot_conversation_context.saudade_intensity_detected),
        support_needs_identified = COALESCE(p_support_needs, lusobot_conversation_context.support_needs_identified),
        last_interaction = timezone('utc'::text, now()),
        conversation_count = lusobot_conversation_context.conversation_count + 1,
        updated_at = timezone('utc'::text, now());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- SEED DATA FOR AI INFRASTRUCTURE
-- =====================================================

-- Insert default AI service configurations
INSERT INTO public.ai_service_configs (service_name, service_type, configuration, capabilities, rate_limits, cost_per_request, is_active, is_primary) VALUES
('openai', 'llm', '{"model": "gpt-4", "temperature": 0.7, "max_tokens": 2000}', 
 ARRAY['text_generation', 'conversation', 'translation', 'cultural_analysis'], 
 '{"requests_per_minute": 60, "tokens_per_minute": 90000}', 0.000030, true, true),

('azure_openai', 'llm', '{"deployment_name": "gpt-35-turbo", "api_version": "2023-12-01-preview"}',
 ARRAY['text_generation', 'conversation', 'portuguese_support'],
 '{"requests_per_minute": 120, "tokens_per_minute": 120000}', 0.000020, true, false),

('google_cloud_ai', 'translation', '{"project_id": "lusotown-ai", "model": "nmt"}',
 ARRAY['translation', 'language_detection', 'portuguese_variants'],
 '{"requests_per_minute": 300, "characters_per_minute": 2000000}', 0.000015, true, true),

('azure_cognitive_services', 'sentiment_analysis', '{"endpoint": "lusotown-text-analytics", "version": "v3.1"}',
 ARRAY['sentiment_analysis', 'emotion_detection', 'saudade_detection'],
 '{"requests_per_minute": 1000, "text_records_per_minute": 5000}', 0.000010, true, true);

-- Insert AI cultural guidelines for Portuguese-speaking community
INSERT INTO public.ai_cultural_guidelines (guideline_category, guideline_title, guideline_description, implementation_rules, violations_to_avoid, severity_level, compliance_required) VALUES
('saudade_sensitivity', 'Proper Saudade Recognition and Response', 
 'AI systems must recognize and respond appropriately to expressions of saudade, avoiding dismissive or overly clinical responses',
 '{"recognition_keywords": ["saudade", "miss", "homesick", "longing"], "response_tone": "empathetic", "avoid_solutions": ["just get over it", "think positive"], "recommended_responses": ["acknowledge the feeling", "validate the experience", "offer community support"]}',
 ARRAY['Dismissing saudade as mere homesickness', 'Offering superficial solutions', 'Clinical or cold responses'],
 'high', true),

('language_usage', 'Portuguese Language Respect and Accuracy',
 'All Portuguese language generation must be culturally appropriate and regionally sensitive',
 '{"regional_variants": {"continental": "standard_portuguese", "brazilian": "brazilian_portuguese", "african": "african_portuguese"}, "formality_levels": {"formal": "business_religious", "informal": "friends_family", "respectful": "elders_authority"}, "avoid_mixing": true}',
 ARRAY['Mixing Brazilian and Continental Portuguese inappropriately', 'Using overly formal language with young people', 'Ignoring regional preferences'],
 'high', true),

('cultural_representation', 'Authentic Portuguese Cultural Representation',
 'AI must represent Portuguese culture authentically without stereotypes or oversimplification',
 '{"authentic_elements": ["family_centricity", "hospitality", "resilience", "maritime_heritage"], "avoid_stereotypes": ["only_fado_and_football", "poor_backwards_country", "only_food_and_festivals"], "regional_diversity": "acknowledge_differences_between_regions"}',
 ARRAY['Reducing Portuguese culture to stereotypes', 'Ignoring regional diversity', 'Focusing only on tourist aspects'],
 'critical', true),

('generational_differences', 'Multi-Generational Sensitivity',
 'AI must adapt communication and recommendations based on generational differences in the Portuguese diaspora',
 '{"first_generation": {"higher_formality": true, "portuguese_preference": true, "traditional_values": true}, "second_generation": {"bilingual_comfortable": true, "cultural_bridge": true, "modern_adaptation": true}, "third_generation": {"cultural_reconnection": true, "identity_exploration": true, "english_primary": true}}',
 ARRAY['Assuming all generations have same cultural connection', 'Using inappropriate language formality', 'Ignoring adaptation challenges'],
 'medium', true);

-- Insert AI-enhanced endpoint configurations
INSERT INTO public.ai_enhanced_endpoints (endpoint_path, endpoint_method, ai_capabilities, portuguese_features, request_processing_pipeline, cultural_adaptation_enabled, saudade_awareness_enabled, bilingual_support_enabled) VALUES
('/api/ai/recommendations', 'POST', 
 ARRAY['personalization', 'cultural_matching', 'preference_learning'],
 ARRAY['regional_preferences', 'saudade_support', 'cultural_events'],
 '{"steps": ["user_analysis", "cultural_profiling", "preference_matching", "recommendation_generation", "cultural_validation"]}',
 true, true, true),

('/api/lusobot/chat', 'POST',
 ARRAY['conversation', 'cultural_knowledge', 'emotional_support'],
 ARRAY['saudade_detection', 'cultural_advice', 'bilingual_conversation'],
 '{"steps": ["message_analysis", "cultural_context_detection", "saudade_assessment", "response_generation", "cultural_validation"]}',
 true, true, true),

('/api/ai/cultural-matching', 'POST',
 ARRAY['compatibility_analysis', 'cultural_profiling', 'recommendation_generation'],
 ARRAY['regional_compatibility', 'generational_understanding', 'saudade_resonance'],
 '{"steps": ["profile_analysis", "compatibility_calculation", "cultural_bond_identification", "recommendation_generation"]}',
 true, true, false),

('/api/notifications/ai-optimize', 'POST',
 ARRAY['timing_optimization', 'content_personalization', 'cultural_adaptation'],
 ARRAY['regional_timing', 'cultural_content', 'bilingual_optimization'],
 '{"steps": ["user_behavior_analysis", "cultural_timing_optimization", "content_personalization", "delivery_optimization"]}',
 true, true, true);

-- Insert LusoBot knowledge base entries
INSERT INTO public.lusobot_knowledge_base (knowledge_category, topic_title, content_summary, detailed_information, portuguese_regions_relevant, generational_relevance, conversation_triggers, emotional_context) VALUES
('saudade_psychology', 'Understanding Saudade in the Portuguese Diaspora',
 'Comprehensive understanding of saudade as experienced by Portuguese immigrants and their descendants',
 '{"definition": "Deep emotional state of nostalgic longing", "manifestations": ["homesickness", "cultural_disconnection", "identity_confusion"], "healthy_coping": ["community_connection", "cultural_activities", "storytelling"], "therapeutic_approaches": ["cultural_immersion", "intergenerational_dialogue", "creative_expression"]}',
 ARRAY['all_regions'], ARRAY['first_generation', 'second_generation'],
 ARRAY['saudade', 'homesick', 'miss Portugal', 'feel lost', 'don''t belong'],
 ARRAY['sadness', 'longing', 'disconnection', 'identity_crisis']),

('uk_portuguese_community', 'Portuguese-speaking community in London Areas',
 'Detailed information about Portuguese-speaking community concentrations and resources in London',
 '{"main_areas": {"vauxhall": {"population": "highest", "businesses": "many", "cultural_centers": "Portuguese Centre"}, "stockwell": {"population": "high", "transport": "excellent", "community": "tight_knit"}, "east_london": {"population": "growing", "families": "many", "schools": "portuguese_weekend_schools"}}, "resources": {"cultural_centers": ["Portuguese Centre Vauxhall", "Casa do Bacalhau"], "churches": ["Portuguese Catholic communities"], "businesses": ["restaurants", "services", "shops"]}}',
 ARRAY['all_regions'], ARRAY['all_generations'],
 ARRAY['where are Portuguese', 'Portuguese area', 'community center', 'Portuguese church'],
 ARRAY['seeking_community', 'practical_help', 'connection']),

('cultural_traditions', 'Portuguese Regional Festivals and Celebrations',
 'Information about Portuguese festivals and how they are celebrated in the United Kingdom diaspora',
 '{"major_festivals": {"santos_populares": {"date": "June", "traditions": ["sardines", "music", "dancing"], "uk_celebrations": "community_organized"}, "natal": {"date": "December", "traditions": ["family_dinner", "midnight_mass", "presents"], "diaspora_adaptations": ["mixed_traditions", "cultural_fusion"]}, "pascoa": {"date": "Easter", "traditions": ["folar", "religious_observance"], "community_events": "portuguese_churches"}}}',
 ARRAY['all_regions'], ARRAY['all_generations'],
 ARRAY['festival', 'celebration', 'Santos Populares', 'Christmas', 'Easter', 'tradition'],
 ARRAY['nostalgia', 'cultural_connection', 'celebration']);

-- =====================================================
-- COMMENTS FOR DOCUMENTATION
-- =====================================================

COMMENT ON TABLE public.ai_service_configs IS 'Configuration and management of AI cloud services for Portuguese-speaking community platform';
COMMENT ON TABLE public.ai_service_usage IS 'Tracking AI service usage for cost monitoring and performance optimization';
COMMENT ON TABLE public.ai_model_performance IS 'AI model performance metrics with Portuguese cultural accuracy measures';
COMMENT ON TABLE public.ai_feature_performance IS 'Performance tracking for Portuguese-speaking community AI features';
COMMENT ON TABLE public.ai_cultural_guidelines IS 'Ethical guidelines for AI interactions with Portuguese culture';
COMMENT ON TABLE public.ai_ethics_violations IS 'Tracking and management of AI ethics violations in Portuguese cultural context';
COMMENT ON TABLE public.ai_enhanced_endpoints IS 'API endpoints enhanced with AI capabilities for Portuguese-speaking community';
COMMENT ON TABLE public.api_usage_analytics IS 'Analytics for AI-enhanced API usage and Portuguese cultural features';
COMMENT ON TABLE public.ai_recommendations IS 'AI-powered recommendation system for Portuguese-speaking community members';
COMMENT ON TABLE public.ai_data_processing_jobs IS 'Management of AI data processing jobs for Portuguese-speaking community analytics';
COMMENT ON TABLE public.lusobot_conversation_context IS 'Enhanced conversation context for LusoBot Portuguese cultural assistant';
COMMENT ON TABLE public.lusobot_knowledge_base IS 'Portuguese cultural knowledge base for LusoBot AI assistant';