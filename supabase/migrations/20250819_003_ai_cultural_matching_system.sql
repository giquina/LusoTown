-- AI/ML Cultural Matching System Migration
-- Advanced Portuguese cultural compatibility and AI-powered community insights

-- =====================================================
-- CULTURAL PERSONALITY PROFILES TABLE
-- =====================================================
CREATE TABLE cultural_personality_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Core Portuguese Cultural Dimensions (0-10 scale)
  family_centricity INTEGER CHECK (family_centricity >= 0 AND family_centricity <= 10),
  collectivism_score INTEGER CHECK (collectivism_score >= 0 AND collectivism_score <= 10),
  tradition_adherence INTEGER CHECK (tradition_adherence >= 0 AND tradition_adherence <= 10),
  hierarchy_respect INTEGER CHECK (hierarchy_respect >= 0 AND hierarchy_respect <= 10),
  hospitality_value INTEGER CHECK (hospitality_value >= 0 AND hospitality_value <= 10),
  religious_orientation INTEGER CHECK (religious_orientation >= 0 AND religious_orientation <= 10),
  
  -- Portuguese Emotional Psychology
  saudade_capacity INTEGER CHECK (saudade_capacity >= 0 AND saudade_capacity <= 10),
  emotional_expressiveness INTEGER CHECK (emotional_expressiveness >= 0 AND emotional_expressiveness <= 10),
  nostalgia_intensity INTEGER CHECK (nostalgia_intensity >= 0 AND nostalgia_intensity <= 10),
  melancholy_acceptance INTEGER CHECK (melancholy_acceptance >= 0 AND melancholy_acceptance <= 10),
  passion_intensity INTEGER CHECK (passion_intensity >= 0 AND passion_intensity <= 10),
  
  -- Cultural Adaptation Patterns
  cultural_flexibility INTEGER CHECK (cultural_flexibility >= 0 AND cultural_flexibility <= 10),
  identity_integration INTEGER CHECK (identity_integration >= 0 AND identity_integration <= 10),
  language_loyalty INTEGER CHECK (language_loyalty >= 0 AND language_loyalty <= 10),
  cultural_pride INTEGER CHECK (cultural_pride >= 0 AND cultural_pride <= 10),
  diaspora_comfort INTEGER CHECK (diaspora_comfort >= 0 AND diaspora_comfort <= 10),
  
  -- Social and Communication Styles
  communication_directness INTEGER CHECK (communication_directness >= 0 AND communication_directness <= 10),
  conflict_avoidance INTEGER CHECK (conflict_avoidance >= 0 AND conflict_avoidance <= 10),
  social_warmth INTEGER CHECK (social_warmth >= 0 AND social_warmth <= 10),
  group_harmony INTEGER CHECK (group_harmony >= 0 AND group_harmony <= 10),
  authority_relation INTEGER CHECK (authority_relation >= 0 AND authority_relation <= 10),
  
  -- Portuguese-Specific Cultural Markers
  fado_resonance INTEGER CHECK (fado_resonance >= 0 AND fado_resonance <= 10),
  food_cultural_significance INTEGER CHECK (food_cultural_significance >= 0 AND food_cultural_significance <= 10),
  celebration_style INTEGER CHECK (celebration_style >= 0 AND celebration_style <= 10),
  storytelling_value INTEGER CHECK (storytelling_value >= 0 AND storytelling_value <= 10),
  landscape_connection INTEGER CHECK (landscape_connection >= 0 AND landscape_connection <= 10),
  
  -- Portuguese Identity Markers
  portuguese_region TEXT CHECK (portuguese_region IN ('norte', 'centro', 'lisboa', 'alentejo', 'algarve', 'madeira', 'azores', 'other')),
  urban_rural TEXT CHECK (urban_rural IN ('urban', 'rural', 'mixed')),
  generation_in_uk INTEGER CHECK (generation_in_uk >= 1 AND generation_in_uk <= 5),
  portuguese_dialect TEXT CHECK (portuguese_dialect IN ('continental', 'brazilian', 'african', 'mixed')),
  adaptation_style TEXT CHECK (adaptation_style IN ('assimilative', 'integrative', 'separative', 'marginalized')),
  diaspora_stage TEXT CHECK (diaspora_stage IN ('newcomer', 'established', 'integrated', 'bicultural')),
  
  -- Cultural Archetype (determined by AI)
  cultural_archetype TEXT CHECK (cultural_archetype IN ('saudoso_tradicional', 'ponte_cultural', 'português_moderno', 'guardião_comunidade')),
  archetype_confidence DECIMAL(3,2) CHECK (archetype_confidence >= 0 AND archetype_confidence <= 1),
  
  -- Metadata
  assessment_completed_at TIMESTAMP WITH TIME ZONE,
  profile_updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ai_analysis_version TEXT DEFAULT '1.0',
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id)
);

-- =====================================================
-- CULTURAL COMPATIBILITY MATCHES TABLE
-- =====================================================
CREATE TABLE cultural_compatibility_matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user1_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  user2_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Overall Compatibility
  compatibility_score INTEGER CHECK (compatibility_score >= 0 AND compatibility_score <= 100),
  match_confidence DECIMAL(3,2) CHECK (match_confidence >= 0 AND match_confidence <= 1),
  
  -- Detailed Compatibility Factors (0-100 scale)
  core_value_alignment INTEGER CHECK (core_value_alignment >= 0 AND core_value_alignment <= 100),
  saudade_resonance INTEGER CHECK (saudade_resonance >= 0 AND saudade_resonance <= 100),
  cultural_expression_sync INTEGER CHECK (cultural_expression_sync >= 0 AND cultural_expression_sync <= 100),
  communication_harmony INTEGER CHECK (communication_harmony >= 0 AND communication_harmony <= 100),
  lifestyle_compatibility INTEGER CHECK (lifestyle_compatibility >= 0 AND lifestyle_compatibility <= 100),
  adaptation_complementarity INTEGER CHECK (adaptation_complementarity >= 0 AND adaptation_complementarity <= 100),
  regional_affinity INTEGER CHECK (regional_affinity >= 0 AND regional_affinity <= 100),
  generational_understanding INTEGER CHECK (generational_understanding >= 0 AND generational_understanding <= 100),
  linguistic_comfort INTEGER CHECK (linguistic_comfort >= 0 AND linguistic_comfort <= 100),
  celebration_synergy INTEGER CHECK (celebration_synergy >= 0 AND celebration_synergy <= 100),
  
  -- Cultural Connection Details
  cultural_bonds TEXT[], -- Array of shared cultural connection points
  saudade_connection TEXT CHECK (saudade_connection IN ('high', 'medium', 'low', 'therapeutic')),
  recommended_interaction TEXT CHECK (recommended_interaction IN ('friendship', 'cultural_activity', 'support_group', 'mentorship')),
  
  -- AI-Generated Insights
  conversation_starters TEXT[], -- Portuguese cultural conversation topics
  shared_experiences TEXT[], -- Likely shared cultural experiences
  complementary_aspects TEXT[], -- How they complement each other
  potential_challenges TEXT[], -- Potential cultural friction points
  
  -- Metadata
  calculated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ai_model_version TEXT DEFAULT '1.0',
  
  UNIQUE(user1_id, user2_id),
  CHECK (user1_id != user2_id)
);

-- =====================================================
-- AI-GENERATED CULTURAL CONTENT TABLE
-- =====================================================
CREATE TABLE ai_cultural_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Content Classification
  content_type TEXT CHECK (content_type IN ('daily_tip', 'recipe', 'cultural_story', 'tradition_explanation', 'nostalgic_content', 'adaptation_advice')),
  cultural_theme TEXT,
  target_audience TEXT[], -- e.g., ['first_generation', 'families', 'young_adults']
  
  -- Bilingual Content
  title_en TEXT NOT NULL,
  title_pt TEXT NOT NULL,
  content_en TEXT NOT NULL,
  content_pt TEXT NOT NULL,
  
  -- Cultural Context
  cultural_context TEXT NOT NULL,
  emotional_tone TEXT CHECK (emotional_tone IN ('supportive', 'informative', 'empathetic', 'encouraging', 'nostalgic')),
  portuguese_region TEXT, -- If region-specific content
  
  -- Content Metrics
  authenticity_score INTEGER CHECK (authenticity_score >= 0 AND authenticity_score <= 100),
  nostalgia_level INTEGER CHECK (nostalgia_level >= 0 AND nostalgia_level <= 100),
  educational_value BOOLEAN DEFAULT FALSE,
  interactive_elements BOOLEAN DEFAULT FALSE,
  
  -- Engagement Data
  view_count INTEGER DEFAULT 0,
  share_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  cultural_accuracy_rating DECIMAL(3,2), -- User-rated cultural accuracy
  
  -- AI Metadata
  ai_generated BOOLEAN DEFAULT TRUE,
  ai_model_version TEXT DEFAULT '1.0',
  generation_prompt TEXT, -- What prompted this content generation
  
  -- Related Content
  related_content_ids UUID[],
  follow_up_suggestions TEXT[],
  conversation_starters TEXT[],
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- COMMUNITY ANALYTICS AND PREDICTIONS TABLE
-- =====================================================
CREATE TABLE community_analytics_predictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Prediction Type
  prediction_type TEXT CHECK (prediction_type IN ('cultural_trend', 'event_success', 'user_churn', 'community_health', 'seasonal_pattern')),
  prediction_title TEXT NOT NULL,
  prediction_description TEXT NOT NULL,
  
  -- Temporal Scope
  timeframe TEXT CHECK (timeframe IN ('immediate', 'short_term', 'medium_term', 'long_term')),
  target_date DATE,
  
  -- Prediction Confidence and Impact
  confidence_score DECIMAL(3,2) CHECK (confidence_score >= 0 AND confidence_score <= 1),
  predicted_impact TEXT CHECK (predicted_impact IN ('low', 'medium', 'high', 'critical')),
  
  -- Target Segments
  affected_segments TEXT[], -- e.g., ['first_generation', 'families', 'young_professionals']
  demographic_filters JSONB, -- Flexible demographic targeting
  
  -- Prediction Data
  prediction_data JSONB, -- Flexible structure for prediction-specific data
  supporting_metrics JSONB, -- Metrics that support this prediction
  
  -- Recommendations
  ai_recommendations TEXT[], -- AI-generated recommendations
  cultural_interventions TEXT[], -- Portuguese culture-specific interventions
  
  -- Validation and Accuracy
  actual_outcome JSONB, -- Actual results when available
  prediction_accuracy DECIMAL(3,2), -- How accurate the prediction was
  validated_at TIMESTAMP WITH TIME ZONE,
  
  -- AI Model Info
  ai_model_version TEXT DEFAULT '1.0',
  model_training_data_period TEXT, -- Time period of training data used
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE -- When this prediction is no longer relevant
);

-- =====================================================
-- USER CULTURAL BEHAVIOR TRACKING TABLE
-- =====================================================
CREATE TABLE user_cultural_behavior (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Engagement Metrics
  cultural_content_views INTEGER DEFAULT 0,
  fado_content_engagement INTEGER DEFAULT 0,
  food_content_engagement INTEGER DEFAULT 0,
  tradition_content_engagement INTEGER DEFAULT 0,
  saudade_related_activity INTEGER DEFAULT 0,
  
  -- Language Behavior
  portuguese_usage_frequency INTEGER CHECK (portuguese_usage_frequency >= 0 AND portuguese_usage_frequency <= 10),
  language_switching_comfort INTEGER CHECK (language_switching_comfort >= 0 AND language_switching_comfort <= 10),
  
  -- Social Behavior
  community_event_attendance INTEGER DEFAULT 0,
  portuguese_connections_made INTEGER DEFAULT 0,
  cultural_group_memberships INTEGER DEFAULT 0,
  
  -- Cultural Expression
  cultural_sharing_frequency INTEGER DEFAULT 0, -- How often they share cultural content
  tradition_maintenance_level INTEGER CHECK (tradition_maintenance_level >= 0 AND tradition_maintenance_level <= 10),
  
  -- Saudade Patterns
  saudade_intensity_trend DECIMAL[], -- Track saudade levels over time
  saudade_trigger_events TEXT[], -- Events that trigger saudade
  saudade_coping_activities TEXT[], -- Activities that help with saudade
  
  -- Adaptation Progress
  cultural_adaptation_stage TEXT CHECK (cultural_adaptation_stage IN ('honeymoon', 'culture_shock', 'adjustment', 'adaptation')),
  integration_challenges TEXT[],
  support_needs TEXT[],
  
  -- Behavioral Insights (AI-generated)
  behavioral_pattern_type TEXT, -- AI-identified pattern
  cultural_personality_evolution JSONB, -- How personality changes over time
  predicted_needs TEXT[], -- AI-predicted future needs
  
  -- Update Tracking
  last_behavior_update TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  behavior_analysis_version TEXT DEFAULT '1.0',
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id)
);

-- =====================================================
-- PORTUGUESE CULTURAL EVENTS INTELLIGENCE TABLE
-- =====================================================
CREATE TABLE portuguese_cultural_events_ai (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  
  -- Cultural Analysis
  cultural_authenticity_score INTEGER CHECK (cultural_authenticity_score >= 0 AND cultural_authenticity_score <= 100),
  portuguese_cultural_themes TEXT[],
  regional_specificity TEXT, -- Which Portuguese region this relates to
  generation_appeal JSONB, -- Appeal to different generations: {"first": 85, "second": 70, "third": 45}
  
  -- Saudade and Emotional Impact
  saudade_trigger_potential INTEGER CHECK (saudade_trigger_potential >= 0 AND saudade_trigger_potential <= 100),
  emotional_resonance_score INTEGER CHECK (emotional_resonance_score >= 0 AND emotional_resonance_score <= 100),
  nostalgia_factor INTEGER CHECK (nostalgia_factor >= 0 AND nostalgia_factor <= 100),
  
  -- AI Predictions
  predicted_attendance INTEGER,
  attendance_confidence DECIMAL(3,2),
  success_probability INTEGER CHECK (success_probability >= 0 AND success_probability <= 100),
  optimal_timing_suggestions JSONB, -- AI suggestions for timing
  
  -- Cultural Compatibility
  archetype_appeal JSONB, -- Appeal to different cultural archetypes
  personality_fit_analysis JSONB, -- Which personality types would enjoy this
  
  -- Community Impact
  community_building_potential INTEGER CHECK (community_building_potential >= 0 AND community_building_potential <= 100),
  cultural_preservation_value INTEGER CHECK (cultural_preservation_value >= 0 AND cultural_preservation_value <= 100),
  cross_generation_bonding INTEGER CHECK (cross_generation_bonding >= 0 AND cross_generation_bonding <= 100),
  
  -- Marketing Intelligence
  recommended_messaging TEXT[], -- AI-recommended marketing messages
  target_personality_types TEXT[], -- Which archetypes to target
  optimal_promotion_channels TEXT[],
  
  -- Post-Event Analysis
  actual_attendance INTEGER,
  cultural_feedback_summary JSONB, -- Aggregated cultural feedback
  community_impact_assessment TEXT,
  
  -- AI Analysis Metadata
  ai_analysis_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  analysis_model_version TEXT DEFAULT '1.0',
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- VOICE ASSISTANT INTERACTIONS TABLE
-- =====================================================
CREATE TABLE voice_assistant_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,
  
  -- Interaction Details
  interaction_type TEXT CHECK (interaction_type IN ('voice_input', 'voice_output', 'text_fallback')),
  input_text TEXT,
  input_language TEXT CHECK (input_language IN ('pt', 'en', 'mixed')),
  input_confidence DECIMAL(3,2),
  
  -- AI Response
  ai_response_text TEXT,
  response_language TEXT CHECK (response_language IN ('pt', 'en', 'bilingual')),
  cultural_context_applied TEXT,
  emotional_tone TEXT,
  
  -- Portuguese Cultural Intelligence
  cultural_topic_detected TEXT, -- e.g., 'saudade', 'food', 'fado', 'traditions'
  cultural_advice_given BOOLEAN DEFAULT FALSE,
  saudade_support_provided BOOLEAN DEFAULT FALSE,
  
  -- User Satisfaction
  user_satisfaction_rating INTEGER CHECK (user_satisfaction_rating >= 1 AND user_satisfaction_rating <= 5),
  cultural_accuracy_rating INTEGER CHECK (cultural_accuracy_rating >= 1 AND cultural_accuracy_rating <= 5),
  
  -- Session Metadata
  session_duration INTEGER, -- seconds
  follow_up_actions TEXT[], -- actions user took after interaction
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- Cultural Personality Profiles
CREATE INDEX idx_cultural_profiles_user_id ON cultural_personality_profiles(user_id);
CREATE INDEX idx_cultural_profiles_archetype ON cultural_personality_profiles(cultural_archetype);
CREATE INDEX idx_cultural_profiles_region ON cultural_personality_profiles(portuguese_region);
CREATE INDEX idx_cultural_profiles_generation ON cultural_personality_profiles(generation_in_uk);
CREATE INDEX idx_cultural_profiles_saudade ON cultural_personality_profiles(saudade_capacity);

-- Compatibility Matches
CREATE INDEX idx_compatibility_matches_user1 ON cultural_compatibility_matches(user1_id);
CREATE INDEX idx_compatibility_matches_user2 ON cultural_compatibility_matches(user2_id);
CREATE INDEX idx_compatibility_matches_score ON cultural_compatibility_matches(compatibility_score DESC);
CREATE INDEX idx_compatibility_matches_saudade ON cultural_compatibility_matches(saudade_connection);

-- Cultural Content
CREATE INDEX idx_cultural_content_type ON ai_cultural_content(content_type);
CREATE INDEX idx_cultural_content_theme ON ai_cultural_content(cultural_theme);
CREATE INDEX idx_cultural_content_region ON ai_cultural_content(portuguese_region);
CREATE INDEX idx_cultural_content_created ON ai_cultural_content(created_at DESC);
CREATE INDEX idx_cultural_content_engagement ON ai_cultural_content(view_count DESC, share_count DESC);

-- Community Analytics
CREATE INDEX idx_analytics_type ON community_analytics_predictions(prediction_type);
CREATE INDEX idx_analytics_timeframe ON community_analytics_predictions(timeframe);
CREATE INDEX idx_analytics_confidence ON community_analytics_predictions(confidence_score DESC);
CREATE INDEX idx_analytics_impact ON community_analytics_predictions(predicted_impact);
CREATE INDEX idx_analytics_date ON community_analytics_predictions(target_date);

-- User Behavior
CREATE INDEX idx_behavior_user_id ON user_cultural_behavior(user_id);
CREATE INDEX idx_behavior_adaptation ON user_cultural_behavior(cultural_adaptation_stage);
CREATE INDEX idx_behavior_updated ON user_cultural_behavior(updated_at DESC);

-- Events AI
CREATE INDEX idx_events_ai_event_id ON portuguese_cultural_events_ai(event_id);
CREATE INDEX idx_events_ai_authenticity ON portuguese_cultural_events_ai(cultural_authenticity_score DESC);
CREATE INDEX idx_events_ai_success ON portuguese_cultural_events_ai(success_probability DESC);
CREATE INDEX idx_events_ai_saudade ON portuguese_cultural_events_ai(saudade_trigger_potential DESC);

-- Voice Assistant
CREATE INDEX idx_voice_interactions_user ON voice_assistant_interactions(user_id);
CREATE INDEX idx_voice_interactions_session ON voice_assistant_interactions(session_id);
CREATE INDEX idx_voice_interactions_topic ON voice_assistant_interactions(cultural_topic_detected);
CREATE INDEX idx_voice_interactions_date ON voice_assistant_interactions(created_at DESC);

-- =====================================================
-- ROW LEVEL SECURITY POLICIES
-- =====================================================

-- Enable RLS
ALTER TABLE cultural_personality_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE cultural_compatibility_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_cultural_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_analytics_predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_cultural_behavior ENABLE ROW LEVEL SECURITY;
ALTER TABLE portuguese_cultural_events_ai ENABLE ROW LEVEL SECURITY;
ALTER TABLE voice_assistant_interactions ENABLE ROW LEVEL SECURITY;

-- Cultural Personality Profiles - Users can only see their own
CREATE POLICY "Users can view own cultural profile" ON cultural_personality_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own cultural profile" ON cultural_personality_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own cultural profile" ON cultural_personality_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Compatibility Matches - Users can see matches involving them
CREATE POLICY "Users can view own compatibility matches" ON cultural_compatibility_matches
  FOR SELECT USING (auth.uid() = user1_id OR auth.uid() = user2_id);

-- Cultural Content - All users can read
CREATE POLICY "All users can view cultural content" ON ai_cultural_content
  FOR SELECT USING (true);

-- Community Analytics - All authenticated users can read
CREATE POLICY "Authenticated users can view community analytics" ON community_analytics_predictions
  FOR SELECT USING (auth.role() = 'authenticated');

-- User Behavior - Users can only see their own
CREATE POLICY "Users can view own behavior data" ON user_cultural_behavior
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own behavior data" ON user_cultural_behavior
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own behavior data" ON user_cultural_behavior
  FOR UPDATE USING (auth.uid() = user_id);

-- Events AI - All users can read
CREATE POLICY "All users can view events AI analysis" ON portuguese_cultural_events_ai
  FOR SELECT USING (true);

-- Voice Assistant - Users can only see their own interactions
CREATE POLICY "Users can view own voice interactions" ON voice_assistant_interactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own voice interactions" ON voice_assistant_interactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- =====================================================
-- FUNCTIONS FOR AI/ML OPERATIONS
-- =====================================================

-- Function to calculate cultural compatibility between two users
CREATE OR REPLACE FUNCTION calculate_cultural_compatibility(user1_uuid UUID, user2_uuid UUID)
RETURNS TABLE (
  compatibility_score INTEGER,
  cultural_bonds TEXT[],
  saudade_connection TEXT,
  recommended_interaction TEXT
) AS $$
DECLARE
  profile1 cultural_personality_profiles%ROWTYPE;
  profile2 cultural_personality_profiles%ROWTYPE;
  score INTEGER := 0;
  bonds TEXT[] := ARRAY[]::TEXT[];
  saudade_conn TEXT := 'low';
  interaction_type TEXT := 'cultural_activity';
BEGIN
  -- Get both profiles
  SELECT * INTO profile1 FROM cultural_personality_profiles WHERE user_id = user1_uuid;
  SELECT * INTO profile2 FROM cultural_personality_profiles WHERE user_id = user2_uuid;
  
  -- Basic compatibility calculation (simplified)
  IF profile1.user_id IS NULL OR profile2.user_id IS NULL THEN
    RETURN;
  END IF;
  
  -- Calculate base compatibility from key dimensions
  score := 100 - (
    ABS(COALESCE(profile1.family_centricity, 5) - COALESCE(profile2.family_centricity, 5)) * 3 +
    ABS(COALESCE(profile1.saudade_capacity, 5) - COALESCE(profile2.saudade_capacity, 5)) * 4 +
    ABS(COALESCE(profile1.tradition_adherence, 5) - COALESCE(profile2.tradition_adherence, 5)) * 3 +
    ABS(COALESCE(profile1.cultural_flexibility, 5) - COALESCE(profile2.cultural_flexibility, 5)) * 2
  );
  
  -- Ensure score is within bounds
  score := GREATEST(0, LEAST(100, score));
  
  -- Identify cultural bonds
  IF profile1.portuguese_region = profile2.portuguese_region AND profile1.portuguese_region IS NOT NULL THEN
    bonds := array_append(bonds, 'shared_region_' || profile1.portuguese_region);
  END IF;
  
  IF ABS(COALESCE(profile1.saudade_capacity, 5) - COALESCE(profile2.saudade_capacity, 5)) <= 2 THEN
    bonds := array_append(bonds, 'saudade_understanding');
  END IF;
  
  IF profile1.generation_in_uk = profile2.generation_in_uk THEN
    bonds := array_append(bonds, 'same_generation_' || profile1.generation_in_uk);
  END IF;
  
  -- Determine saudade connection
  IF COALESCE(profile1.saudade_capacity, 5) >= 8 AND COALESCE(profile2.saudade_capacity, 5) >= 8 THEN
    saudade_conn := 'high';
  ELSIF COALESCE(profile1.saudade_capacity, 5) >= 6 OR COALESCE(profile2.saudade_capacity, 5) >= 6 THEN
    saudade_conn := 'medium';
  END IF;
  
  -- Determine interaction recommendation
  IF score >= 85 THEN
    interaction_type := 'friendship';
  ELSIF saudade_conn = 'high' THEN
    interaction_type := 'support_group';
  ELSIF ABS(COALESCE(profile1.generation_in_uk, 1) - COALESCE(profile2.generation_in_uk, 1)) > 1 THEN
    interaction_type := 'mentorship';
  END IF;
  
  RETURN QUERY SELECT score, bonds, saudade_conn, interaction_type;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update user cultural behavior tracking
CREATE OR REPLACE FUNCTION update_cultural_behavior(
  target_user_id UUID,
  behavior_type TEXT,
  increment_value INTEGER DEFAULT 1
)
RETURNS VOID AS $$
BEGIN
  INSERT INTO user_cultural_behavior (user_id)
  VALUES (target_user_id)
  ON CONFLICT (user_id) DO NOTHING;
  
  CASE behavior_type
    WHEN 'cultural_content_view' THEN
      UPDATE user_cultural_behavior 
      SET cultural_content_views = cultural_content_views + increment_value,
          updated_at = NOW()
      WHERE user_id = target_user_id;
    
    WHEN 'fado_engagement' THEN
      UPDATE user_cultural_behavior 
      SET fado_content_engagement = fado_content_engagement + increment_value,
          updated_at = NOW()
      WHERE user_id = target_user_id;
    
    WHEN 'event_attendance' THEN
      UPDATE user_cultural_behavior 
      SET community_event_attendance = community_event_attendance + increment_value,
          updated_at = NOW()
      WHERE user_id = target_user_id;
    
    WHEN 'portuguese_connection' THEN
      UPDATE user_cultural_behavior 
      SET portuguese_connections_made = portuguese_connections_made + increment_value,
          updated_at = NOW()
      WHERE user_id = target_user_id;
  END CASE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- TRIGGERS FOR AUTOMATED UPDATES
-- =====================================================

-- Trigger to update timestamps
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_cultural_profiles_modified 
  BEFORE UPDATE ON cultural_personality_profiles 
  FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_cultural_behavior_modified 
  BEFORE UPDATE ON user_cultural_behavior 
  FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_cultural_content_modified 
  BEFORE UPDATE ON ai_cultural_content 
  FOR EACH ROW EXECUTE FUNCTION update_modified_column();

-- =====================================================
-- SEED DATA FOR AI CULTURAL CONTENT
-- =====================================================

-- Insert sample AI-generated cultural content
INSERT INTO ai_cultural_content (
  content_type, 
  cultural_theme, 
  target_audience, 
  title_en, 
  title_pt, 
  content_en, 
  content_pt,
  cultural_context,
  emotional_tone,
  authenticity_score,
  nostalgia_level,
  educational_value
) VALUES 
(
  'daily_tip',
  'portuguese_hospitality',
  ARRAY['all_generations'],
  'The Portuguese Art of Welcoming',
  'A Arte Portuguesa de Receber',
  'In Portuguese culture, hospitality goes beyond offering food - it''s about making others feel like family. This warmth is what makes our community special in London.',
  'Na cultura portuguesa, a hospitalidade vai além de oferecer comida - trata-se de fazer os outros sentirem-se como família. Esta calidez é o que torna a nossa comunidade especial em Londres.',
  'Core Portuguese cultural value of hospitality and community building',
  'supportive',
  95,
  40,
  true
),
(
  'nostalgic_content',
  'saudade_homeland',
  ARRAY['first_generation', 'traditional_nostalgic'],
  'The Sound of Home: Portuguese Village Mornings',
  'O Som de Casa: Manhãs das Aldeias Portuguesas',
  'Remember waking up to church bells and your grandmother''s voice calling from the kitchen? That symphony of home lives forever in our hearts, connecting us across oceans.',
  'Lembra-se de acordar com os sinos da igreja e a voz da sua avó chamando da cozinha? Essa sinfonia de casa vive para sempre nos nossos corações, ligando-nos através dos oceanos.',
  'Deep emotional connection to Portuguese homeland through sensory memories',
  'nostalgic',
  98,
  95,
  false
),
(
  'cultural_story',
  'portuguese_resilience',
  ARRAY['all_generations'],
  'The Baker Who Built Bridges',
  'O Padeiro Que Construiu Pontes',
  'Maria opened her bakery in Vauxhall in 1985, not knowing she would become the heart of London''s Portuguese-speaking community, connecting generations through the aroma of fresh broa.',
  'A Maria abriu a sua padaria em Vauxhall em 1985, sem saber que se tornaria o coração da comunidade de falantes de português de Londres, ligando gerações através do aroma de broa fresca.',
  'Portuguese entrepreneurship and community building in London diaspora',
  'inspiring',
  92,
  75,
  true
);

-- Insert sample community analytics predictions
INSERT INTO community_analytics_predictions (
  prediction_type,
  prediction_title,
  prediction_description,
  timeframe,
  confidence_score,
  predicted_impact,
  affected_segments,
  ai_recommendations,
  cultural_interventions,
  target_date
) VALUES
(
  'cultural_trend',
  'Rising Interest in Portuguese Traditional Music',
  'Community showing 40% increased engagement with fado and traditional music content, particularly among second-generation Portuguese',
  'short_term',
  0.85,
  'medium',
  ARRAY['second_generation', 'millennials'],
  ARRAY['Organize fado appreciation workshops', 'Partner with Portuguese musicians', 'Create music listening groups'],
  ARRAY['Fado therapy sessions for saudade management', 'Intergenerational music sharing events'],
  '2025-09-15'
),
(
  'seasonal_pattern',
  'Winter Saudade Intensity Peak',
  'Historical data shows 60% increase in saudade-related support requests during October-February period',
  'immediate',
  0.92,
  'high',
  ARRAY['all_members'],
  ARRAY['Increase comfort-focused winter events', 'Create warm indoor gathering spaces', 'Enhance emotional support services'],
  ARRAY['Traditional Portuguese comfort food events', 'Storytelling circles about homeland memories', 'Portuguese film screening series'],
  '2025-10-01'
);

COMMENT ON TABLE cultural_personality_profiles IS 'Advanced Portuguese cultural personality profiling for AI-powered matching and community insights';
COMMENT ON TABLE cultural_compatibility_matches IS 'AI-calculated cultural compatibility scores and insights between Portuguese-speaking community members';
COMMENT ON TABLE ai_cultural_content IS 'AI-generated Portuguese cultural content personalized for diaspora community';
COMMENT ON TABLE community_analytics_predictions IS 'Predictive analytics for Portuguese-speaking community trends and behavior patterns';
COMMENT ON TABLE user_cultural_behavior IS 'Behavioral tracking for Portuguese cultural engagement and adaptation patterns';
COMMENT ON TABLE portuguese_cultural_events_ai IS 'AI analysis and predictions for Portuguese cultural events success and impact';
COMMENT ON TABLE voice_assistant_interactions IS 'Portuguese voice assistant interactions with cultural intelligence and saudade support';