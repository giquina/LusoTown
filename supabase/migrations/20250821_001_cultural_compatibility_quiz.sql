-- Cultural Compatibility Quiz System
-- Create tables for storing Portuguese cultural compatibility quiz results

-- Cultural Quiz Results table
CREATE TABLE cultural_quiz_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Overall scores (0-10 scale)
    food_score DECIMAL(3,1) NOT NULL CHECK (food_score >= 0 AND food_score <= 10),
    music_score DECIMAL(3,1) NOT NULL CHECK (music_score >= 0 AND music_score <= 10),
    traditions_score DECIMAL(3,1) NOT NULL CHECK (traditions_score >= 0 AND traditions_score <= 10),
    family_score DECIMAL(3,1) NOT NULL CHECK (family_score >= 0 AND family_score <= 10),
    language_score DECIMAL(3,1) NOT NULL CHECK (language_score >= 0 AND language_score <= 10),
    integration_score DECIMAL(3,1) NOT NULL CHECK (integration_score >= 0 AND integration_score <= 10),
    community_score DECIMAL(3,1) NOT NULL CHECK (community_score >= 0 AND community_score <= 10),
    values_score DECIMAL(3,1) NOT NULL CHECK (values_score >= 0 AND values_score <= 10),
    holidays_score DECIMAL(3,1) NOT NULL CHECK (holidays_score >= 0 AND holidays_score <= 10),
    regional_score DECIMAL(3,1) NOT NULL CHECK (regional_score >= 0 AND regional_score <= 10),
    
    -- Calculated overall score
    overall_score DECIMAL(3,1) NOT NULL CHECK (overall_score >= 0 AND overall_score <= 10),
    
    -- Cultural strength classification
    cultural_strength VARCHAR(20) NOT NULL CHECK (cultural_strength IN ('Very Strong', 'Strong', 'Moderate', 'Developing', 'Flexible')),
    
    -- Profile type
    profile_type VARCHAR(50) NOT NULL,
    
    -- JSON field for detailed answers and recommendations
    quiz_data JSONB NOT NULL,
    
    UNIQUE(user_id)
);

-- Cultural Quiz Questions table (for dynamic questions)
CREATE TABLE cultural_quiz_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    question_id VARCHAR(100) UNIQUE NOT NULL,
    category VARCHAR(20) NOT NULL CHECK (category IN ('food', 'music', 'traditions', 'family', 'language', 'integration', 'community', 'values', 'holidays', 'regional')),
    question_type VARCHAR(20) NOT NULL CHECK (question_type IN ('multiple_choice', 'slider', 'image_selection', 'scenario', 'ranking')),
    weight DECIMAL(3,1) NOT NULL DEFAULT 1.0,
    
    title_en TEXT NOT NULL,
    title_pt TEXT NOT NULL,
    description_en TEXT,
    description_pt TEXT,
    
    -- JSON field for question configuration
    question_config JSONB NOT NULL,
    
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0
);

-- Cultural Quiz Answers table (for storing individual answers)
CREATE TABLE cultural_quiz_answers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quiz_result_id UUID REFERENCES cultural_quiz_results(id) ON DELETE CASCADE,
    question_id VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Store answer data as JSON for flexibility
    answer_data JSONB NOT NULL,
    answer_value DECIMAL(5,2) NOT NULL,
    selected_options TEXT[],
    
    UNIQUE(quiz_result_id, question_id)
);

-- Cultural Compatibility Matches table (for storing compatibility scores between users)
CREATE TABLE cultural_compatibility_matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user1_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    user2_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Overall compatibility score (0-100)
    overall_compatibility INTEGER NOT NULL CHECK (overall_compatibility >= 0 AND overall_compatibility <= 100),
    
    -- Category compatibility scores
    food_compatibility INTEGER NOT NULL CHECK (food_compatibility >= 0 AND food_compatibility <= 100),
    music_compatibility INTEGER NOT NULL CHECK (music_compatibility >= 0 AND music_compatibility <= 100),
    traditions_compatibility INTEGER NOT NULL CHECK (traditions_compatibility >= 0 AND traditions_compatibility <= 100),
    family_compatibility INTEGER NOT NULL CHECK (family_compatibility >= 0 AND family_compatibility <= 100),
    language_compatibility INTEGER NOT NULL CHECK (language_compatibility >= 0 AND language_compatibility <= 100),
    integration_compatibility INTEGER NOT NULL CHECK (integration_compatibility >= 0 AND integration_compatibility <= 100),
    community_compatibility INTEGER NOT NULL CHECK (community_compatibility >= 0 AND community_compatibility <= 100),
    values_compatibility INTEGER NOT NULL CHECK (values_compatibility >= 0 AND values_compatibility <= 100),
    
    -- Ensure no duplicate pairs (user1_id should be < user2_id)
    CONSTRAINT unique_user_pair UNIQUE (user1_id, user2_id),
    CONSTRAINT ordered_user_ids CHECK (user1_id < user2_id)
);

-- Cultural Preferences table (for storing specific cultural preferences)
CREATE TABLE cultural_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Portuguese region connection
    primary_region VARCHAR(50),
    secondary_regions TEXT[],
    
    -- Language preferences
    daily_language_use VARCHAR(20) CHECK (daily_language_use IN ('mostly_portuguese', 'equal_both', 'mostly_english', 'english_portuguese_friends', 'struggling_portuguese')),
    language_importance INTEGER CHECK (language_importance >= 1 AND language_importance <= 10),
    
    -- Cultural activities preferences
    preferred_music_genres TEXT[],
    favorite_foods TEXT[],
    important_traditions TEXT[],
    celebration_preferences JSONB,
    
    -- Integration vs heritage balance (1-10 scale)
    integration_balance INTEGER CHECK (integration_balance >= 1 AND integration_balance <= 10),
    
    -- Community involvement level
    community_involvement VARCHAR(20) CHECK (community_involvement IN ('very_active', 'regular_attendee', 'occasional', 'want_to_join', 'prefer_private', 'not_interested')),
    
    -- Future cultural plans
    future_cultural_connection VARCHAR(30) CHECK (future_cultural_connection IN ('portuguese_household', 'bilingual_family', 'cultural_events', 'selective_traditions', 'fully_british')),
    
    UNIQUE(user_id)
);

-- Create indexes for performance
CREATE INDEX idx_cultural_quiz_results_user_id ON cultural_quiz_results(user_id);
CREATE INDEX idx_cultural_quiz_results_overall_score ON cultural_quiz_results(overall_score);
CREATE INDEX idx_cultural_quiz_results_cultural_strength ON cultural_quiz_results(cultural_strength);

CREATE INDEX idx_cultural_quiz_questions_category ON cultural_quiz_questions(category);
CREATE INDEX idx_cultural_quiz_questions_active ON cultural_quiz_questions(is_active);
CREATE INDEX idx_cultural_quiz_questions_sort_order ON cultural_quiz_questions(sort_order);

CREATE INDEX idx_cultural_quiz_answers_quiz_result_id ON cultural_quiz_answers(quiz_result_id);
CREATE INDEX idx_cultural_quiz_answers_question_id ON cultural_quiz_answers(question_id);

CREATE INDEX idx_cultural_compatibility_matches_user1 ON cultural_compatibility_matches(user1_id);
CREATE INDEX idx_cultural_compatibility_matches_user2 ON cultural_compatibility_matches(user2_id);
CREATE INDEX idx_cultural_compatibility_overall ON cultural_compatibility_matches(overall_compatibility);

CREATE INDEX idx_cultural_preferences_user_id ON cultural_preferences(user_id);
CREATE INDEX idx_cultural_preferences_region ON cultural_preferences(primary_region);
CREATE INDEX idx_cultural_preferences_language ON cultural_preferences(daily_language_use);

-- Row Level Security (RLS) policies
ALTER TABLE cultural_quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE cultural_quiz_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE cultural_compatibility_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE cultural_preferences ENABLE ROW LEVEL SECURITY;

-- Users can only access their own quiz results
CREATE POLICY "Users can view their own quiz results" ON cultural_quiz_results
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own quiz results" ON cultural_quiz_results
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own quiz results" ON cultural_quiz_results
    FOR UPDATE USING (auth.uid() = user_id);

-- Users can only access their own quiz answers
CREATE POLICY "Users can view their own quiz answers" ON cultural_quiz_answers
    FOR ALL USING (
        quiz_result_id IN (
            SELECT id FROM cultural_quiz_results WHERE user_id = auth.uid()
        )
    );

-- Users can view compatibility matches where they are involved
CREATE POLICY "Users can view their compatibility matches" ON cultural_compatibility_matches
    FOR SELECT USING (auth.uid() = user1_id OR auth.uid() = user2_id);

-- Users can only access their own cultural preferences
CREATE POLICY "Users can manage their own cultural preferences" ON cultural_preferences
    FOR ALL USING (auth.uid() = user_id);

-- Quiz questions are readable by all authenticated users
CREATE POLICY "Authenticated users can view quiz questions" ON cultural_quiz_questions
    FOR SELECT USING (auth.role() = 'authenticated');

-- Function to calculate compatibility between two users
CREATE OR REPLACE FUNCTION calculate_cultural_compatibility(user1_uuid UUID, user2_uuid UUID)
RETURNS TABLE (
    overall_compatibility INTEGER,
    food_compatibility INTEGER,
    music_compatibility INTEGER,
    traditions_compatibility INTEGER,
    family_compatibility INTEGER,
    language_compatibility INTEGER,
    integration_compatibility INTEGER,
    community_compatibility INTEGER,
    values_compatibility INTEGER
) 
LANGUAGE plpgsql
AS $$
DECLARE
    user1_result cultural_quiz_results%ROWTYPE;
    user2_result cultural_quiz_results%ROWTYPE;
    compatibility_scores INTEGER[];
    weights DECIMAL[] := ARRAY[1.5, 1.5, 2.0, 2.0, 1.8, 1.2, 1.3, 1.7]; -- category weights
    total_score DECIMAL := 0;
    total_weight DECIMAL := 0;
BEGIN
    -- Get quiz results for both users
    SELECT * INTO user1_result FROM cultural_quiz_results WHERE user_id = user1_uuid;
    SELECT * INTO user2_result FROM cultural_quiz_results WHERE user_id = user2_uuid;
    
    -- If either user hasn't taken the quiz, return null
    IF user1_result.id IS NULL OR user2_result.id IS NULL THEN
        RETURN;
    END IF;
    
    -- Calculate compatibility for each category (0-100 scale)
    compatibility_scores := ARRAY[
        GREATEST(0, 100 - ABS(user1_result.food_score - user2_result.food_score) * 10),
        GREATEST(0, 100 - ABS(user1_result.music_score - user2_result.music_score) * 10),
        GREATEST(0, 100 - ABS(user1_result.traditions_score - user2_result.traditions_score) * 10),
        GREATEST(0, 100 - ABS(user1_result.family_score - user2_result.family_score) * 10),
        GREATEST(0, 100 - ABS(user1_result.language_score - user2_result.language_score) * 10),
        GREATEST(0, 100 - ABS(user1_result.integration_score - user2_result.integration_score) * 10),
        GREATEST(0, 100 - ABS(user1_result.community_score - user2_result.community_score) * 10),
        GREATEST(0, 100 - ABS(user1_result.values_score - user2_result.values_score) * 10)
    ];
    
    -- Calculate weighted overall score
    FOR i IN 1..8 LOOP
        total_score := total_score + (compatibility_scores[i] * weights[i]);
        total_weight := total_weight + weights[i];
    END LOOP;
    
    -- Return results
    overall_compatibility := LEAST(100, (total_score / total_weight)::INTEGER);
    food_compatibility := compatibility_scores[1];
    music_compatibility := compatibility_scores[2];
    traditions_compatibility := compatibility_scores[3];
    family_compatibility := compatibility_scores[4];
    language_compatibility := compatibility_scores[5];
    integration_compatibility := compatibility_scores[6];
    community_compatibility := compatibility_scores[7];
    values_compatibility := compatibility_scores[8];
    
    RETURN NEXT;
END;
$$;

-- Function to get top compatible matches for a user
CREATE OR REPLACE FUNCTION get_top_cultural_matches(target_user_id UUID, match_limit INTEGER DEFAULT 10)
RETURNS TABLE (
    user_id UUID,
    overall_compatibility INTEGER,
    food_compatibility INTEGER,
    music_compatibility INTEGER,
    traditions_compatibility INTEGER,
    family_compatibility INTEGER,
    language_compatibility INTEGER,
    integration_compatibility INTEGER,
    community_compatibility INTEGER,
    values_compatibility INTEGER,
    cultural_strength VARCHAR(20),
    profile_type VARCHAR(50)
) 
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        cqr.user_id,
        calc.overall_compatibility,
        calc.food_compatibility,
        calc.music_compatibility,
        calc.traditions_compatibility,
        calc.family_compatibility,
        calc.language_compatibility,
        calc.integration_compatibility,
        calc.community_compatibility,
        calc.values_compatibility,
        cqr.cultural_strength,
        cqr.profile_type
    FROM cultural_quiz_results cqr
    CROSS JOIN LATERAL calculate_cultural_compatibility(target_user_id, cqr.user_id) calc
    WHERE cqr.user_id != target_user_id
    AND calc.overall_compatibility IS NOT NULL
    ORDER BY calc.overall_compatibility DESC
    LIMIT match_limit;
END;
$$;

-- Trigger to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_cultural_quiz_results_updated_at BEFORE UPDATE ON cultural_quiz_results FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cultural_compatibility_matches_updated_at BEFORE UPDATE ON cultural_compatibility_matches FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cultural_preferences_updated_at BEFORE UPDATE ON cultural_preferences FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample quiz questions
INSERT INTO cultural_quiz_questions (question_id, category, question_type, weight, title_en, title_pt, question_config) VALUES
('food_cooking_frequency', 'food', 'multiple_choice', 2.5, 
 'How often do you cook traditional Portuguese/Brazilian food?',
 'Com que frequência cozinha comida tradicional portuguesa/brasileira?',
 '{
   "options": [
     {"id": "daily", "labelEn": "Almost daily", "labelPt": "Quase todos os dias", "value": 10, "emoji": "👩‍🍳"},
     {"id": "weekly", "labelEn": "Few times a week", "labelPt": "Algumas vezes por semana", "value": 8, "emoji": "🍽️"},
     {"id": "special", "labelEn": "Only for special occasions", "labelPt": "Apenas em ocasiões especiais", "value": 5, "emoji": "🎉"},
     {"id": "rarely", "labelEn": "Rarely, I miss it", "labelPt": "Raramente, tenho saudades", "value": 3, "emoji": "😢"},
     {"id": "never", "labelEn": "Never cook it in London", "labelPt": "Nunca cozinho em Londres", "value": 1, "emoji": "🚫"}
   ]
 }'),

('saudade_level', 'traditions', 'slider', 4.0,
 'How often do you experience "saudade" for your homeland?',
 'Com que frequência sente "saudade" da sua terra natal?',
 '{
   "sliderConfig": {
     "min": 1,
     "max": 10,
     "step": 1,
     "labelMinEn": "Rarely feel it",
     "labelMinPt": "Raramente sinto",
     "labelMaxEn": "Constant companion",
     "labelMaxPt": "Companheira constante"
   }
 }'),

('music_fado_connection', 'music', 'slider', 3.0,
 'How deeply do you connect with Fado music?',
 'Quão profundamente se conecta com o Fado?',
 '{
   "sliderConfig": {
     "min": 1,
     "max": 10,
     "step": 1,
     "labelMinEn": "Just background music",
     "labelMinPt": "Apenas música de fundo",
     "labelMaxEn": "Brings tears to my eyes",
     "labelMaxPt": "Faz-me chorar"
   }
 }'),

('language_daily_use', 'language', 'multiple_choice', 3.0,
 'In your daily life in London, which language do you use most?',
 'Na sua vida diária em Londres, que língua usa mais?',
 '{
   "options": [
     {"id": "mostly_portuguese", "labelEn": "Mostly Portuguese", "labelPt": "Maioritariamente português", "value": 10, "emoji": "🇵🇹"},
     {"id": "equal_both", "labelEn": "Equal Portuguese & English", "labelPt": "Português e inglês igualmente", "value": 8, "emoji": "🌍"},
     {"id": "mostly_english", "labelEn": "Mostly English, Portuguese at home", "labelPt": "Maioritariamente inglês, português em casa", "value": 6, "emoji": "🏠"},
     {"id": "english_portuguese_friends", "labelEn": "English work, Portuguese with friends", "labelPt": "Inglês no trabalho, português com amigos", "value": 7, "emoji": "👥"},
     {"id": "struggling_portuguese", "labelEn": "Trying to maintain Portuguese", "labelPt": "A tentar manter o português", "value": 4, "emoji": "📚"}
   ]
 }');

COMMENT ON TABLE cultural_quiz_results IS 'Stores Portuguese cultural compatibility quiz results for users';
COMMENT ON TABLE cultural_quiz_questions IS 'Dynamic quiz questions for cultural compatibility assessment';
COMMENT ON TABLE cultural_quiz_answers IS 'Individual quiz answers linked to quiz results';
COMMENT ON TABLE cultural_compatibility_matches IS 'Calculated compatibility scores between users';
COMMENT ON TABLE cultural_preferences IS 'Detailed cultural preferences and background information';