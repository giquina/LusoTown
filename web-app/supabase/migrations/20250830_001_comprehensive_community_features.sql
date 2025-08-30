-- Comprehensive Community Features Migration
-- Created: 2025-08-30
-- Purpose: Add tables for matching system, university partnerships, and enhanced events

-- ============================================================================
-- USER PROFILES TABLE FOR MATCHING SYSTEM
-- ============================================================================

CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Basic Information
  name TEXT NOT NULL CHECK (length(name) <= 100),
  age INTEGER NOT NULL CHECK (age BETWEEN 18 AND 80),
  bio TEXT CHECK (length(bio) <= 1000),
  
  -- Location
  location_city TEXT DEFAULT 'London',
  location_coordinates GEOMETRY(POINT, 4326),
  
  -- Profile Media
  profile_image TEXT,
  photos TEXT[] DEFAULT '{}' CHECK (array_length(photos, 1) <= 10),
  
  -- Cultural Information
  cultural_background TEXT[] DEFAULT '{}' CHECK (array_length(cultural_background, 1) <= 5),
  interests TEXT[] DEFAULT '{}' CHECK (array_length(interests, 1) <= 20),
  language_skills JSONB DEFAULT '{}',
  cultural_values TEXT[] DEFAULT '{}' CHECK (array_length(cultural_values, 1) <= 10),
  
  -- Personal Information
  education TEXT,
  occupation TEXT,
  looking_for TEXT[] DEFAULT '{}',
  age_preference_min INTEGER DEFAULT 18 CHECK (age_preference_min >= 18),
  age_preference_max INTEGER DEFAULT 65 CHECK (age_preference_max <= 80),
  max_distance INTEGER DEFAULT 25 CHECK (max_distance BETWEEN 1 AND 100),
  
  -- Profile Status
  profile_completeness INTEGER DEFAULT 0 CHECK (profile_completeness BETWEEN 0 AND 100),
  is_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  looking_for_matches BOOLEAN DEFAULT TRUE,
  
  -- Safety and Moderation
  safety_score INTEGER DEFAULT 5 CHECK (safety_score BETWEEN 1 AND 10),
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  last_active TIMESTAMPTZ DEFAULT NOW(),
  
  -- Privacy Settings
  show_age BOOLEAN DEFAULT TRUE,
  show_distance BOOLEAN DEFAULT TRUE,
  show_last_active BOOLEAN DEFAULT TRUE,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- MATCHES AND INTERACTIONS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS user_matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user1_id UUID NOT NULL REFERENCES user_profiles(user_id) ON DELETE CASCADE,
  user2_id UUID NOT NULL REFERENCES user_profiles(user_id) ON DELETE CASCADE,
  
  -- Match Details
  match_type TEXT DEFAULT 'like' CHECK (match_type IN ('like', 'superlike', 'pass', 'block', 'report')),
  is_mutual BOOLEAN DEFAULT FALSE,
  compatibility_score INTEGER CHECK (compatibility_score BETWEEN 0 AND 100),
  
  -- Interaction Status
  conversation_started BOOLEAN DEFAULT FALSE,
  last_message_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Ensure unique pairs
  UNIQUE(user1_id, user2_id),
  -- Ensure user1_id < user2_id to avoid duplicate pairs
  CHECK (user1_id < user2_id)
);

-- ============================================================================
-- UNIVERSITY PARTNERSHIPS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS university_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  university_id TEXT NOT NULL, -- References config/universities.ts
  
  -- Subscription Details
  subscription_type TEXT DEFAULT 'student' CHECK (subscription_type IN ('student', 'alumni', 'staff')),
  subscription_status TEXT DEFAULT 'active' CHECK (subscription_status IN ('active', 'paused', 'cancelled', 'expired')),
  
  -- Payment Information
  stripe_subscription_id TEXT UNIQUE,
  current_period_start DATE NOT NULL,
  current_period_end DATE NOT NULL,
  annual_subscription BOOLEAN DEFAULT TRUE,
  
  -- University Verification
  university_email TEXT, -- For email verification
  student_id TEXT, -- For student ID verification
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  verification_documents TEXT[] DEFAULT '{}',
  
  -- Society Participation
  joined_portuguese_society BOOLEAN DEFAULT FALSE,
  society_role TEXT CHECK (society_role IN ('member', 'committee', 'president', 'vice_president', 'secretary', 'treasurer')),
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Unique constraint per user per university
  UNIQUE(user_id, university_id)
);

-- ============================================================================
-- ENHANCED EVENTS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS portuguese_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Basic Event Information
  title TEXT NOT NULL CHECK (length(title) <= 200),
  title_portuguese TEXT CHECK (length(title_portuguese) <= 200),
  description TEXT NOT NULL CHECK (length(description) <= 2000),
  description_portuguese TEXT CHECK (length(description_portuguese) <= 2000),
  
  -- Date and Time
  event_date DATE NOT NULL,
  event_time TIME NOT NULL,
  end_date DATE,
  end_time TIME,
  timezone TEXT DEFAULT 'Europe/London',
  
  -- Location Information
  venue_name TEXT NOT NULL CHECK (length(venue_name) <= 200),
  venue_address TEXT NOT NULL,
  venue_city TEXT DEFAULT 'London',
  venue_postcode TEXT,
  venue_coordinates GEOMETRY(POINT, 4326),
  
  -- Event Classification
  category TEXT NOT NULL CHECK (category IN (
    'cultural', 'music', 'food', 'sports', 'education', 'business', 
    'religious', 'festival', 'arts', 'dance', 'literature', 'community'
  )),
  cultural_focus TEXT NOT NULL CHECK (cultural_focus IN (
    'portugal', 'brazil', 'angola', 'cape_verde', 'mozambique', 
    'guinea_bissau', 'sao_tome', 'timor_leste', 'mixed', 'other'
  )),
  tags TEXT[] DEFAULT '{}' CHECK (array_length(tags, 1) <= 20),
  
  -- Pricing and Tickets
  is_free BOOLEAN DEFAULT TRUE,
  base_price DECIMAL(10,2) DEFAULT 0.00 CHECK (base_price >= 0),
  currency TEXT DEFAULT 'GBP',
  ticket_types JSONB DEFAULT '[]',
  max_attendees INTEGER CHECK (max_attendees > 0),
  current_attendees INTEGER DEFAULT 0 CHECK (current_attendees >= 0),
  
  -- Organizer Information
  organizer_name TEXT NOT NULL CHECK (length(organizer_name) <= 200),
  organizer_email TEXT NOT NULL CHECK (organizer_email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'),
  organizer_phone TEXT,
  organizer_website TEXT CHECK (organizer_website ~* '^https?://'),
  
  -- Event Features
  is_recurring BOOLEAN DEFAULT FALSE,
  recurring_pattern JSONB,
  age_restriction JSONB DEFAULT '{"min_age": null, "max_age": null}',
  requirements TEXT[] DEFAULT '{}',
  
  -- Accessibility
  wheelchair_accessible BOOLEAN DEFAULT FALSE,
  sign_language_available BOOLEAN DEFAULT FALSE,
  audio_description BOOLEAN DEFAULT FALSE,
  accessibility_notes TEXT,
  
  -- Media
  featured_image TEXT,
  gallery_images TEXT[] DEFAULT '{}' CHECK (array_length(gallery_images, 1) <= 20),
  
  -- Event Status
  status TEXT DEFAULT 'active' CHECK (status IN ('draft', 'active', 'cancelled', 'completed', 'postponed')),
  is_featured BOOLEAN DEFAULT FALSE,
  is_verified BOOLEAN DEFAULT FALSE,
  
  -- Booking and External Links
  booking_url TEXT CHECK (booking_url ~* '^https?://'),
  external_ticket_url TEXT CHECK (external_ticket_url ~* '^https?://'),
  cancellation_policy TEXT DEFAULT 'Standard cancellation policy applies',
  
  -- Social Media
  facebook_event_url TEXT,
  instagram_handle TEXT,
  
  -- Analytics
  view_count INTEGER DEFAULT 0,
  click_count INTEGER DEFAULT 0,
  bookmark_count INTEGER DEFAULT 0,
  
  -- Moderation
  created_by UUID REFERENCES auth.users(id),
  approved_by UUID REFERENCES auth.users(id),
  moderation_notes TEXT,
  
  -- SEO
  seo_title TEXT CHECK (length(seo_title) <= 60),
  seo_description TEXT CHECK (length(seo_description) <= 160),
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- EVENT BOOKINGS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS event_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES portuguese_events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Booking Details
  ticket_type TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  total_price DECIMAL(10,2) NOT NULL DEFAULT 0.00 CHECK (total_price >= 0),
  currency TEXT DEFAULT 'GBP',
  
  -- Payment Information
  stripe_payment_intent_id TEXT,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  payment_method TEXT,
  
  -- Booking Status
  booking_status TEXT DEFAULT 'confirmed' CHECK (booking_status IN ('pending', 'confirmed', 'cancelled', 'no_show')),
  booking_reference TEXT NOT NULL UNIQUE,
  
  -- Attendee Information
  attendee_names JSONB DEFAULT '[]', -- For multiple tickets
  special_requirements TEXT,
  dietary_requirements TEXT,
  
  -- Check-in
  checked_in BOOLEAN DEFAULT FALSE,
  checked_in_at TIMESTAMPTZ,
  
  -- Communication
  confirmation_sent BOOLEAN DEFAULT FALSE,
  reminder_sent BOOLEAN DEFAULT FALSE,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Unique booking per user per event (unless multiple tickets allowed)
  UNIQUE(event_id, user_id)
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- User Profiles Indexes
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_profiles_location 
ON user_profiles USING GIST(location_coordinates) 
WHERE is_active = TRUE AND looking_for_matches = TRUE;

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_profiles_matching 
ON user_profiles(age, is_active, looking_for_matches, safety_score, profile_completeness);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_profiles_cultural 
ON user_profiles USING GIN(cultural_background, interests);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_profiles_active 
ON user_profiles(last_active DESC, is_active) 
WHERE looking_for_matches = TRUE;

-- Matches Indexes
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_matches_users 
ON user_matches(user1_id, user2_id, match_type, is_mutual);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_matches_mutual 
ON user_matches(is_mutual, created_at DESC) 
WHERE is_active = TRUE;

-- University Subscriptions Indexes
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_university_subscriptions_user 
ON university_subscriptions(user_id, subscription_status);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_university_subscriptions_university 
ON university_subscriptions(university_id, subscription_status);

-- Events Indexes
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_portuguese_events_location 
ON portuguese_events USING GIST(venue_coordinates) 
WHERE status = 'active';

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_portuguese_events_date 
ON portuguese_events(event_date, event_time, status) 
WHERE status = 'active';

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_portuguese_events_category 
ON portuguese_events(category, cultural_focus, is_featured, status);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_portuguese_events_search 
ON portuguese_events USING GIN((
  coalesce(title, '') || ' ' || 
  coalesce(title_portuguese, '') || ' ' || 
  coalesce(description, '') || ' ' || 
  array_to_string(tags, ' ')
) gin_trgm_ops) WHERE status = 'active';

-- Event Bookings Indexes
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_event_bookings_event 
ON event_bookings(event_id, booking_status);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_event_bookings_user 
ON event_bookings(user_id, booking_status, created_at DESC);

-- ============================================================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================================================

-- User Profiles RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Users can view active profiles looking for matches
CREATE POLICY "Users can view active matching profiles" 
ON user_profiles FOR SELECT
USING (is_active = TRUE AND looking_for_matches = TRUE);

-- Users can only update their own profile
CREATE POLICY "Users can update own profile" 
ON user_profiles FOR UPDATE
USING (user_id = auth.uid());

-- Users can insert their own profile
CREATE POLICY "Users can create own profile" 
ON user_profiles FOR INSERT
WITH CHECK (user_id = auth.uid());

-- Matches RLS
ALTER TABLE user_matches ENABLE ROW LEVEL SECURITY;

-- Users can view matches they're involved in
CREATE POLICY "Users can view their matches" 
ON user_matches FOR SELECT
USING (user1_id = auth.uid() OR user2_id = auth.uid());

-- Users can create matches
CREATE POLICY "Users can create matches" 
ON user_matches FOR INSERT
WITH CHECK (user1_id = auth.uid() OR user2_id = auth.uid());

-- University Subscriptions RLS
ALTER TABLE university_subscriptions ENABLE ROW LEVEL SECURITY;

-- Users can view their own subscriptions
CREATE POLICY "Users can view own subscriptions" 
ON university_subscriptions FOR SELECT
USING (user_id = auth.uid());

-- Users can manage their own subscriptions
CREATE POLICY "Users can manage own subscriptions" 
ON university_subscriptions FOR ALL
USING (user_id = auth.uid());

-- Events RLS
ALTER TABLE portuguese_events ENABLE ROW LEVEL SECURITY;

-- Public can view active events
CREATE POLICY "Public can view active events" 
ON portuguese_events FOR SELECT
USING (status = 'active');

-- Authenticated users can create events
CREATE POLICY "Authenticated users can create events" 
ON portuguese_events FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

-- Event creators can update their events
CREATE POLICY "Creators can update own events" 
ON portuguese_events FOR UPDATE
USING (created_by = auth.uid());

-- Event Bookings RLS
ALTER TABLE event_bookings ENABLE ROW LEVEL SECURITY;

-- Users can view their own bookings
CREATE POLICY "Users can view own bookings" 
ON event_bookings FOR SELECT
USING (user_id = auth.uid());

-- Users can create their own bookings
CREATE POLICY "Users can create own bookings" 
ON event_bookings FOR INSERT
WITH CHECK (user_id = auth.uid());

-- Users can update their own bookings
CREATE POLICY "Users can update own bookings" 
ON event_bookings FOR UPDATE
USING (user_id = auth.uid());

-- ============================================================================
-- UTILITY FUNCTIONS
-- ============================================================================

-- Function to calculate match compatibility
CREATE OR REPLACE FUNCTION calculate_compatibility(
  user1_profile JSONB,
  user2_profile JSONB
) RETURNS INTEGER AS $$
DECLARE
  compatibility_score INTEGER := 0;
  cultural_weight CONSTANT DECIMAL := 0.25;
  interests_weight CONSTANT DECIMAL := 0.25;
  language_weight CONSTANT DECIMAL := 0.20;
  age_weight CONSTANT DECIMAL := 0.15;
  location_weight CONSTANT DECIMAL := 0.15;
BEGIN
  -- Cultural background compatibility
  IF jsonb_array_length(
    (user1_profile->'cultural_background')::jsonb * (user2_profile->'cultural_background')::jsonb
  ) > 0 THEN
    compatibility_score := compatibility_score + (cultural_weight * 100);
  END IF;
  
  -- Interest compatibility
  IF jsonb_array_length(
    (user1_profile->'interests')::jsonb * (user2_profile->'interests')::jsonb
  ) > 0 THEN
    compatibility_score := compatibility_score + (interests_weight * 100);
  END IF;
  
  -- Age compatibility (closer ages score higher)
  DECLARE
    age_diff INTEGER := ABS((user1_profile->>'age')::INTEGER - (user2_profile->>'age')::INTEGER);
  BEGIN
    compatibility_score := compatibility_score + (age_weight * GREATEST(0, 100 - age_diff * 5));
  END;
  
  RETURN LEAST(100, compatibility_score);
END;
$$ LANGUAGE plpgsql;

-- Function to update match compatibility scores
CREATE OR REPLACE FUNCTION update_match_compatibility() RETURNS TRIGGER AS $$
BEGIN
  -- Calculate compatibility when a match is created
  IF TG_OP = 'INSERT' AND NEW.compatibility_score IS NULL THEN
    SELECT calculate_compatibility(
      (SELECT to_jsonb(up1) FROM user_profiles up1 WHERE user_id = NEW.user1_id),
      (SELECT to_jsonb(up2) FROM user_profiles up2 WHERE user_id = NEW.user2_id)
    ) INTO NEW.compatibility_score;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically calculate compatibility
CREATE TRIGGER trigger_update_match_compatibility
  BEFORE INSERT OR UPDATE ON user_matches
  FOR EACH ROW
  EXECUTE FUNCTION update_match_compatibility();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at columns
CREATE TRIGGER trigger_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_user_matches_updated_at
  BEFORE UPDATE ON user_matches
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_university_subscriptions_updated_at
  BEFORE UPDATE ON university_subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_portuguese_events_updated_at
  BEFORE UPDATE ON portuguese_events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_event_bookings_updated_at
  BEFORE UPDATE ON event_bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- SAMPLE DATA
-- ============================================================================

-- Insert sample user profiles for testing
INSERT INTO user_profiles (
  user_id, name, age, bio, location_city, cultural_background, interests,
  language_skills, looking_for, profile_completeness, is_verified
) VALUES 
(
  gen_random_uuid(),
  'Maria Silva',
  28,
  'Born in Porto, living in London. Love fado music, Portuguese cuisine, and exploring the city. Looking to connect with fellow Portuguese speakers.',
  'London',
  ARRAY['portugal'],
  ARRAY['fado', 'portuguese_cuisine', 'cultural_events', 'hiking'],
  '{"portuguese": "native", "english": "fluent"}',
  ARRAY['cultural_connection', 'friendship', 'dating'],
  85,
  true
),
(
  gen_random_uuid(),
  'João Santos',
  32,
  'Brazilian software engineer in Manchester. Passionate about football, Brazilian music, and building community connections in the UK.',
  'Manchester',
  ARRAY['brazil'],
  ARRAY['brazilian_football', 'music', 'technology', 'community_events'],
  '{"portuguese": "native", "english": "fluent"}',
  ARRAY['networking', 'friendship', 'relationship'],
  78,
  false
);

-- Insert sample events
INSERT INTO portuguese_events (
  title, title_portuguese, description, description_portuguese,
  event_date, event_time, venue_name, venue_address, venue_city,
  category, cultural_focus, organizer_name, organizer_email,
  is_free, base_price, max_attendees, tags, is_featured
) VALUES 
(
  'Fado Night at Casa do Bacalhau',
  'Noite de Fado na Casa do Bacalhau',
  'An authentic Portuguese fado evening featuring traditional musicians and delicious Portuguese cuisine.',
  'Uma noite autêntica de fado português com músicos tradicionais e deliciosa culinária portuguesa.',
  CURRENT_DATE + INTERVAL '7 days',
  '19:30',
  'Casa do Bacalhau',
  '47 Columbia Road, Bethnal Green',
  'London',
  'music',
  'portugal',
  'Casa do Bacalhau',
  'events@casadobacalhau.co.uk',
  false,
  25.00,
  50,
  ARRAY['fado', 'music', 'portuguese', 'culture', 'food'],
  true
),
(
  'Brazilian Carnival Celebration',
  'Celebração do Carnaval Brasileiro',
  'Join us for a vibrant Brazilian carnival celebration with samba dancing, live music, and traditional Brazilian food.',
  'Junte-se a nós numa vibrante celebração do carnaval brasileiro com dança de samba, música ao vivo e comida tradicional brasileira.',
  CURRENT_DATE + INTERVAL '14 days',
  '20:00',
  'Scala Kings Cross',
  '275 Pentonville Road',
  'London',
  'festival',
  'brazil',
  'Brazilian Community UK',
  'carnival@brazilianuk.org',
  false,
  35.00,
  200,
  ARRAY['carnival', 'samba', 'brazilian', 'dance', 'music'],
  true
);

-- ============================================================================
-- COMMENTS AND DOCUMENTATION
-- ============================================================================

COMMENT ON TABLE user_profiles IS 'Portuguese-speaking community user profiles for cultural matching system';
COMMENT ON TABLE user_matches IS 'User interactions and matches within Portuguese-speaking community';
COMMENT ON TABLE university_subscriptions IS 'University society subscriptions for Portuguese students (£75/year)';
COMMENT ON TABLE portuguese_events IS 'Comprehensive Portuguese cultural events across the UK';
COMMENT ON TABLE event_bookings IS 'Event bookings and ticket management for Portuguese community events';

-- ============================================================================
-- MIGRATION SUMMARY
-- ============================================================================

-- This migration creates a comprehensive community platform with four major features:
--
-- 1. BUSINESS DIRECTORY (existing table: portuguese_businesses)
--    - PostGIS-enabled business listings with cultural context
--    - Free registration for Portuguese-speaking businesses
--    - Location-based search across the UK
--
-- 2. UNIVERSITY SOCIETY PORTAL (new table: university_subscriptions)
--    - £75/year subscription for university society access
--    - Integration with 8 UK universities
--    - Student verification and society management
--
-- 3. CULTURAL MATCHING SYSTEM (new tables: user_profiles, user_matches)
--    - Safe community-focused Portuguese speaker matching
--    - Cultural compatibility algorithm
--    - Safety scoring and verification system
--
-- 4. ENHANCED EVENTS CALENDAR (new tables: portuguese_events, event_bookings)
--    - Comprehensive Portuguese cultural events
--    - PALOP cultural celebrations integration
--    - Bilingual event descriptions and booking system
--
-- All features include:
-- - Bilingual EN/PT interface support
-- - Mobile-first responsive design compatibility
-- - PostGIS spatial data for location-based features
-- - Row Level Security for data protection
-- - Performance optimized indexes
-- - Portuguese cultural authenticity focus