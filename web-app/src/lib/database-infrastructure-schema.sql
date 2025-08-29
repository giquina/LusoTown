-- Infrastructure Optimization Schema for LusoTown Portuguese-speaking Community Platform
-- Optimized database schema with PostGIS, full-text search, and cultural content indexing

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS btree_gin;
CREATE EXTENSION IF NOT EXISTS btree_gist;

-- ========================================
-- PORTUGUESE BUSINESS DIRECTORY OPTIMIZATION
-- ========================================

-- Enhanced Portuguese businesses table with spatial and text search optimization
CREATE TABLE IF NOT EXISTS portuguese_businesses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    name_portuguese TEXT,
    business_type TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    address TEXT NOT NULL,
    postcode TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    website TEXT,
    
    -- Geospatial data for London-based Portuguese businesses
    coordinates GEOMETRY(POINT, 4326),
    london_borough TEXT,
    london_area TEXT CHECK (london_area IN ('central_london', 'east_london', 'south_london', 'north_london', 'west_london')),
    
    -- Portuguese cultural context
    portuguese_origin TEXT[] DEFAULT '{}',
    languages_supported TEXT[] DEFAULT ARRAY['portuguese'],
    cultural_specialties TEXT[],
    portuguese_specialties JSONB DEFAULT '{}',
    heritage_verified BOOLEAN DEFAULT FALSE,
    
    -- Business metrics
    opening_hours JSONB,
    rating_average DECIMAL(3,2) DEFAULT 0.00,
    review_count INTEGER DEFAULT 0,
    price_range TEXT CHECK (price_range IN ('budget', 'moderate', 'expensive', 'luxury')),
    
    -- Community features
    community_favorite BOOLEAN DEFAULT FALSE,
    community_verified BOOLEAN DEFAULT FALSE,
    membership_tier TEXT DEFAULT 'basic',
    
    -- Status and metadata
    is_active BOOLEAN DEFAULT TRUE,
    is_approved BOOLEAN DEFAULT FALSE,
    verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
    submitted_by UUID,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Full-text search vector for Portuguese content
    search_vector tsvector GENERATED ALWAYS AS (
        to_tsvector('portuguese', 
            COALESCE(name, '') || ' ' || 
            COALESCE(name_portuguese, '') || ' ' || 
            COALESCE(description, '') || ' ' ||
            COALESCE(array_to_string(cultural_specialties, ' '), '')
        )
    ) STORED
);

-- Spatial index for geolocation queries (most important for Portuguese businesses in London)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_portuguese_businesses_coordinates_active 
ON portuguese_businesses USING GIST(coordinates) 
WHERE is_active = TRUE AND is_approved = TRUE;

-- Composite index for business type and location queries
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_portuguese_businesses_type_location 
ON portuguese_businesses (business_type, london_area, is_active, community_favorite DESC, rating_average DESC) 
WHERE is_active = TRUE AND is_approved = TRUE;

-- Full-text search index for Portuguese business names and descriptions
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_portuguese_businesses_search 
ON portuguese_businesses USING GIN(search_vector);

-- Trigram index for fuzzy text search
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_portuguese_businesses_name_trgm 
ON portuguese_businesses USING GIN(name gin_trgm_ops);

-- Array index for Portuguese origin filtering
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_portuguese_businesses_origin 
ON portuguese_businesses USING GIN(portuguese_origin);

-- Cultural specialties index
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_portuguese_businesses_cultural 
ON portuguese_businesses USING GIN(cultural_specialties);

-- ========================================
-- PORTUGUESE CULTURAL EVENTS OPTIMIZATION
-- ========================================

-- Enhanced Portuguese events table with cultural context and geolocation
CREATE TABLE IF NOT EXISTS portuguese_cultural_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organizer_id UUID NOT NULL,
    
    -- Bilingual event content
    title JSONB NOT NULL, -- {"en": "Title", "pt": "Título"}
    description JSONB NOT NULL,
    cultural_category TEXT NOT NULL CHECK (cultural_category IN (
        'fado', 'folklore', 'cuisine', 'festival', 'language', 'business', 
        'networking', 'sports', 'literature', 'arts', 'music', 'dance',
        'history', 'religion', 'community', 'education', 'family'
    )),
    
    -- Location and timing
    location_pt TEXT,
    location_en TEXT,
    coordinates GEOMETRY(POINT, 4326),
    london_area TEXT CHECK (london_area IN ('central_london', 'east_london', 'south_london', 'north_london', 'west_london')),
    venue_name TEXT,
    venue_address TEXT,
    
    event_date DATE NOT NULL,
    event_time TIME,
    duration_minutes INTEGER,
    timezone TEXT DEFAULT 'Europe/London',
    
    -- Portuguese cultural context
    portuguese_region TEXT[] DEFAULT '{}', -- Minho, Alentejo, Azores, Madeira, etc.
    cultural_significance TEXT,
    heritage_focus TEXT[] DEFAULT '{}',
    palop_nations TEXT[] DEFAULT '{}', -- Angola, Mozambique, Cape Verde, etc.
    
    -- Event details
    price_range TEXT DEFAULT 'free' CHECK (price_range IN ('free', 'low', 'medium', 'high')),
    max_attendees INTEGER,
    current_attendees INTEGER DEFAULT 0,
    min_age INTEGER,
    max_age INTEGER,
    
    -- Language and accessibility
    language_requirements TEXT[] DEFAULT ARRAY['portuguese', 'english'],
    requires_portuguese BOOLEAN DEFAULT FALSE,
    accessibility_features TEXT[] DEFAULT '{}',
    
    -- Booking and contact
    requires_booking BOOLEAN DEFAULT FALSE,
    booking_deadline DATE,
    booking_url TEXT,
    contact_info JSONB DEFAULT '{}',
    
    -- Community features
    community_tags TEXT[] DEFAULT '{}',
    community_priority INTEGER DEFAULT 0,
    featured_event BOOLEAN DEFAULT FALSE,
    
    -- Status and metadata
    is_active BOOLEAN DEFAULT TRUE,
    is_approved BOOLEAN DEFAULT TRUE,
    moderation_status TEXT DEFAULT 'approved',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Full-text search for Portuguese events
    search_vector tsvector GENERATED ALWAYS AS (
        to_tsvector('portuguese',
            COALESCE(title->>'pt', '') || ' ' ||
            COALESCE(title->>'en', '') || ' ' ||
            COALESCE(description->>'pt', '') || ' ' ||
            COALESCE(description->>'en', '') || ' ' ||
            COALESCE(location_pt, '') || ' ' ||
            COALESCE(location_en, '') || ' ' ||
            COALESCE(array_to_string(community_tags, ' '), '')
        )
    ) STORED
);

-- Primary index for active future events (most common query pattern)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_portuguese_events_active_future 
ON portuguese_cultural_events (is_active, event_date, cultural_category) 
WHERE is_active = TRUE AND event_date >= CURRENT_DATE;

-- Spatial index for location-based event queries
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_portuguese_events_location 
ON portuguese_cultural_events USING GIST(coordinates) 
WHERE is_active = TRUE AND event_date >= CURRENT_DATE;

-- Cultural category and date composite index
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_portuguese_events_category_date 
ON portuguese_cultural_events (cultural_category, event_date DESC, is_active, featured_event DESC) 
WHERE is_active = TRUE;

-- Portuguese region array index
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_portuguese_events_region 
ON portuguese_cultural_events USING GIN(portuguese_region) 
WHERE is_active = TRUE AND event_date >= CURRENT_DATE;

-- Full-text search index for Portuguese events
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_portuguese_events_search 
ON portuguese_cultural_events USING GIN(search_vector);

-- Community tags index for event discovery
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_portuguese_events_tags 
ON portuguese_cultural_events USING GIN(community_tags);

-- ========================================
-- CULTURAL COMPATIBILITY SYSTEM OPTIMIZATION
-- ========================================

-- User cultural preferences for matching system
CREATE TABLE IF NOT EXISTS cultural_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL,
    
    -- Portuguese cultural identity
    portuguese_origin TEXT[] DEFAULT '{}',
    heritage_regions TEXT[] DEFAULT '{}',
    language_preference TEXT DEFAULT 'both' CHECK (language_preference IN ('portuguese', 'english', 'both')),
    portuguese_fluency TEXT DEFAULT 'conversational' CHECK (portuguese_fluency IN ('basic', 'conversational', 'fluent', 'native')),
    
    -- Cultural interests and values
    cultural_celebrations TEXT[] DEFAULT '{}',
    traditional_activities TEXT[] DEFAULT '{}',
    cultural_values JSONB DEFAULT '{}',
    lifestyle_preferences TEXT[] DEFAULT '{}',
    
    -- Professional and social preferences
    professional_goals TEXT[] DEFAULT '{}',
    social_preferences JSONB DEFAULT '{}',
    community_involvement TEXT DEFAULT 'moderate',
    
    -- Location preferences within UK
    preferred_locations TEXT[] DEFAULT '{}',
    willing_to_travel_km INTEGER DEFAULT 25,
    
    -- Matching preferences
    age_range_min INTEGER DEFAULT 18,
    age_range_max INTEGER DEFAULT 100,
    preferred_meeting_types TEXT[] DEFAULT ARRAY['cultural_events', 'coffee_meetups'],
    
    -- Calculated scores
    cultural_depth_score DECIMAL(3,2) DEFAULT 0.00,
    community_engagement_score DECIMAL(3,2) DEFAULT 0.00,
    heritage_authenticity_score DECIMAL(3,2) DEFAULT 0.00,
    
    -- Metadata
    completed_at TIMESTAMPTZ,
    last_updated TIMESTAMPTZ DEFAULT NOW(),
    quiz_version TEXT DEFAULT '2.0',
    preferences_locked BOOLEAN DEFAULT FALSE
);

-- Optimized indexes for cultural matching queries
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_cultural_preferences_origin 
ON cultural_preferences USING GIN(portuguese_origin);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_cultural_preferences_heritage 
ON cultural_preferences USING GIN(heritage_regions);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_cultural_preferences_celebrations 
ON cultural_preferences USING GIN(cultural_celebrations);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_cultural_preferences_location 
ON cultural_preferences USING GIN(preferred_locations);

-- Cultural compatibility scores table (pre-computed for performance)
CREATE TABLE IF NOT EXISTS cultural_compatibility (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_a_id UUID NOT NULL,
    user_b_id UUID NOT NULL,
    
    -- Compatibility breakdown scores
    origin_compatibility DECIMAL(3,2) NOT NULL DEFAULT 0.00,
    language_compatibility DECIMAL(3,2) NOT NULL DEFAULT 0.00,
    cultural_compatibility DECIMAL(3,2) NOT NULL DEFAULT 0.00,
    professional_compatibility DECIMAL(3,2) NOT NULL DEFAULT 0.00,
    values_compatibility DECIMAL(3,2) NOT NULL DEFAULT 0.00,
    lifestyle_compatibility DECIMAL(3,2) NOT NULL DEFAULT 0.00,
    location_compatibility DECIMAL(3,2) NOT NULL DEFAULT 0.00,
    
    -- Overall compatibility score (weighted average)
    overall_compatibility DECIMAL(3,2) NOT NULL DEFAULT 0.00,
    
    -- Matching insights
    shared_elements TEXT[] DEFAULT '{}',
    cultural_connections TEXT[] DEFAULT '{}',
    compatibility_insights JSONB DEFAULT '{}',
    potential_activities TEXT[] DEFAULT '{}',
    
    -- Match quality indicators
    match_quality TEXT GENERATED ALWAYS AS (
        CASE 
            WHEN overall_compatibility >= 0.90 THEN 'excellent'
            WHEN overall_compatibility >= 0.80 THEN 'very_good'
            WHEN overall_compatibility >= 0.70 THEN 'good'
            WHEN overall_compatibility >= 0.60 THEN 'fair'
            ELSE 'low'
        END
    ) STORED,
    
    -- Metadata
    calculated_at TIMESTAMPTZ DEFAULT NOW(),
    last_updated TIMESTAMPTZ DEFAULT NOW(),
    calculation_version TEXT DEFAULT '2.0',
    
    -- Constraints
    UNIQUE(user_a_id, user_b_id),
    CHECK (user_a_id != user_b_id),
    CHECK (overall_compatibility >= 0.00 AND overall_compatibility <= 1.00)
);

-- Highly optimized index for cultural matching queries (most critical)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_cultural_compatibility_optimized 
ON cultural_compatibility (user_a_id, overall_compatibility DESC, last_updated DESC) 
INCLUDE (cultural_compatibility, language_compatibility, shared_elements, match_quality)
WHERE overall_compatibility >= 0.60;

-- Reverse compatibility index for bidirectional matching
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_cultural_compatibility_reverse 
ON cultural_compatibility (user_b_id, overall_compatibility DESC) 
WHERE overall_compatibility >= 0.60;

-- Match quality filtering index
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_cultural_compatibility_quality 
ON cultural_compatibility (match_quality, user_a_id, overall_compatibility DESC);

-- ========================================
-- USER PROFILES OPTIMIZATION FOR PORTUGUESE COMMUNITY
-- ========================================

-- Enhanced indexes on existing profiles table for Portuguese community queries
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_profiles_portuguese_heritage 
ON profiles (portuguese_origin, is_active, verification_status) 
WHERE is_active = TRUE AND verification_status = 'verified';

-- Location-based matching for Portuguese community in UK
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_profiles_uk_location 
ON profiles (location, portuguese_origin, membership_tier) 
WHERE is_active = TRUE AND location LIKE '%London%' OR location LIKE '%UK%' OR location LIKE '%United Kingdom%';

-- Age and preference matching index
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_profiles_matching_criteria 
ON profiles (date_of_birth, is_active, verification_status, membership_tier);

-- ========================================
-- PERFORMANCE MONITORING TABLES
-- ========================================

-- Query performance tracking for optimization
CREATE TABLE IF NOT EXISTS query_performance_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    query_hash TEXT NOT NULL,
    query_type TEXT NOT NULL CHECK (query_type IN ('cultural', 'business', 'geolocation', 'matching', 'general')),
    execution_time_ms INTEGER NOT NULL,
    rows_returned INTEGER,
    indexes_used TEXT[],
    full_table_scan BOOLEAN DEFAULT FALSE,
    optimization_applied BOOLEAN DEFAULT FALSE,
    optimization_version TEXT,
    cultural_context BOOLEAN DEFAULT FALSE,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Index for query performance analysis
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_query_performance_type_time 
ON query_performance_log (query_type, timestamp DESC, execution_time_ms);

-- Cache performance tracking
CREATE TABLE IF NOT EXISTS cache_performance_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cache_key_hash TEXT NOT NULL,
    cache_type TEXT NOT NULL,
    operation TEXT NOT NULL CHECK (operation IN ('get', 'set', 'delete', 'invalidate')),
    hit BOOLEAN DEFAULT FALSE,
    execution_time_ms INTEGER,
    data_size_bytes INTEGER,
    ttl_seconds INTEGER,
    cultural_content BOOLEAN DEFAULT FALSE,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Index for cache performance analysis
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_cache_performance_type_time 
ON cache_performance_log (cache_type, timestamp DESC, hit);

-- ========================================
-- OPTIMIZATION FUNCTIONS
-- ========================================

-- Function to calculate cultural compatibility between Portuguese community members
CREATE OR REPLACE FUNCTION calculate_portuguese_cultural_compatibility(
    user_a_id UUID,
    user_b_id UUID
) RETURNS DECIMAL AS $$
DECLARE
    compatibility_score DECIMAL := 0.0;
    prefs_a RECORD;
    prefs_b RECORD;
    origin_score DECIMAL := 0.0;
    language_score DECIMAL := 0.0;
    cultural_score DECIMAL := 0.0;
    location_score DECIMAL := 0.0;
    shared_count INTEGER;
BEGIN
    -- Get cultural preferences for both users
    SELECT * INTO prefs_a FROM cultural_preferences WHERE user_id = user_a_id;
    SELECT * INTO prefs_b FROM cultural_preferences WHERE user_id = user_b_id;
    
    -- Calculate origin compatibility (Portuguese heritage overlap)
    SELECT COUNT(*) INTO shared_count
    FROM unnest(prefs_a.portuguese_origin) AS origin_a
    JOIN unnest(prefs_b.portuguese_origin) AS origin_b ON origin_a = origin_b;
    
    origin_score := LEAST(shared_count * 0.25, 1.0);
    
    -- Calculate language compatibility
    IF prefs_a.language_preference = prefs_b.language_preference THEN
        language_score := 1.0;
    ELSIF prefs_a.language_preference = 'both' OR prefs_b.language_preference = 'both' THEN
        language_score := 0.8;
    ELSE
        language_score := 0.4;
    END IF;
    
    -- Calculate cultural celebrations overlap
    SELECT COUNT(*) INTO shared_count
    FROM unnest(prefs_a.cultural_celebrations) AS cel_a
    JOIN unnest(prefs_b.cultural_celebrations) AS cel_b ON cel_a = cel_b;
    
    cultural_score := LEAST(shared_count * 0.2, 1.0);
    
    -- Calculate location compatibility (willing to travel distance)
    location_score := CASE 
        WHEN array_length(prefs_a.preferred_locations, 1) > 0 AND 
             array_length(prefs_b.preferred_locations, 1) > 0 THEN
            CASE 
                WHEN prefs_a.preferred_locations && prefs_b.preferred_locations THEN 1.0
                WHEN prefs_a.willing_to_travel_km + prefs_b.willing_to_travel_km >= 30 THEN 0.7
                ELSE 0.3
            END
        ELSE 0.5
    END;
    
    -- Calculate weighted overall compatibility
    compatibility_score := (
        origin_score * 0.30 +
        language_score * 0.25 +
        cultural_score * 0.25 +
        location_score * 0.20
    );
    
    -- Insert or update compatibility record
    INSERT INTO cultural_compatibility (
        user_a_id, user_b_id,
        origin_compatibility, language_compatibility, 
        cultural_compatibility, location_compatibility,
        overall_compatibility,
        calculated_at, last_updated
    ) VALUES (
        user_a_id, user_b_id,
        origin_score, language_score,
        cultural_score, location_score,
        compatibility_score,
        NOW(), NOW()
    ) 
    ON CONFLICT (user_a_id, user_b_id) 
    DO UPDATE SET
        origin_compatibility = EXCLUDED.origin_compatibility,
        language_compatibility = EXCLUDED.language_compatibility,
        cultural_compatibility = EXCLUDED.cultural_compatibility,
        location_compatibility = EXCLUDED.location_compatibility,
        overall_compatibility = EXCLUDED.overall_compatibility,
        last_updated = NOW();
    
    RETURN compatibility_score;
END;
$$ LANGUAGE plpgsql;

-- Function to find Portuguese businesses within radius using PostGIS
CREATE OR REPLACE FUNCTION get_portuguese_businesses_within_radius(
    center_lat DECIMAL,
    center_lng DECIMAL,
    radius_km DECIMAL
) RETURNS TABLE (
    id UUID,
    name TEXT,
    business_type TEXT,
    address TEXT,
    coordinates GEOMETRY,
    distance_km DECIMAL,
    portuguese_origin TEXT[],
    cultural_specialties TEXT[],
    rating_average DECIMAL,
    community_verified BOOLEAN
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        pb.id,
        pb.name,
        pb.business_type,
        pb.address,
        pb.coordinates,
        ROUND(
            ST_Distance(
                ST_SetSRID(ST_MakePoint(center_lng, center_lat), 4326)::geography,
                pb.coordinates::geography
            ) / 1000, 2
        ) AS distance_km,
        pb.portuguese_origin,
        pb.cultural_specialties,
        pb.rating_average,
        pb.community_verified
    FROM portuguese_businesses pb
    WHERE pb.is_active = TRUE 
      AND pb.is_approved = TRUE
      AND ST_DWithin(
          ST_SetSRID(ST_MakePoint(center_lng, center_lat), 4326)::geography,
          pb.coordinates::geography,
          radius_km * 1000
      )
    ORDER BY distance_km;
END;
$$ LANGUAGE plpgsql;

-- Function to update user compatibility scores (batch processing)
CREATE OR REPLACE FUNCTION update_user_compatibility_scores(target_user_id UUID)
RETURNS INTEGER AS $$
DECLARE
    processed_count INTEGER := 0;
    user_record RECORD;
BEGIN
    -- Update compatibility scores for the target user with all other active users
    FOR user_record IN 
        SELECT id FROM profiles 
        WHERE is_active = TRUE 
          AND verification_status = 'verified' 
          AND id != target_user_id
        LIMIT 100 -- Process in batches to avoid long-running transactions
    LOOP
        PERFORM calculate_portuguese_cultural_compatibility(target_user_id, user_record.id);
        processed_count := processed_count + 1;
    END LOOP;
    
    RETURN processed_count;
END;
$$ LANGUAGE plpgsql;

-- ========================================
-- TRIGGERS FOR AUTOMATIC UPDATES
-- ========================================

-- Trigger to update search vectors when business data changes
CREATE OR REPLACE FUNCTION update_portuguese_business_search_vector()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at := NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_portuguese_business_update
    BEFORE UPDATE ON portuguese_businesses
    FOR EACH ROW
    EXECUTE FUNCTION update_portuguese_business_search_vector();

-- Trigger to update event search vectors
CREATE OR REPLACE FUNCTION update_portuguese_event_search_vector()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at := NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_portuguese_event_update
    BEFORE UPDATE ON portuguese_cultural_events
    FOR EACH ROW
    EXECUTE FUNCTION update_portuguese_event_search_vector();

-- Trigger to recalculate compatibility when preferences change
CREATE OR REPLACE FUNCTION trigger_recalculate_compatibility()
RETURNS TRIGGER AS $$
BEGIN
    -- Trigger background job to recalculate compatibility scores
    -- This would be handled by a background job queue in production
    NEW.last_updated := NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_cultural_preferences_update
    BEFORE UPDATE ON cultural_preferences
    FOR EACH ROW
    EXECUTE FUNCTION trigger_recalculate_compatibility();

-- ========================================
-- VIEWS FOR COMMON QUERIES
-- ========================================

-- View for active Portuguese businesses with enhanced data
CREATE OR REPLACE VIEW portuguese_businesses_active AS
SELECT 
    pb.*,
    ST_Y(pb.coordinates) AS latitude,
    ST_X(pb.coordinates) AS longitude,
    CASE 
        WHEN pb.community_verified AND pb.heritage_verified THEN 'premium'
        WHEN pb.community_verified THEN 'verified'
        WHEN pb.heritage_verified THEN 'heritage_verified'
        ELSE 'standard'
    END AS verification_level,
    CASE
        WHEN pb.rating_average >= 4.5 THEN 'excellent'
        WHEN pb.rating_average >= 4.0 THEN 'very_good'
        WHEN pb.rating_average >= 3.5 THEN 'good'
        WHEN pb.rating_average >= 3.0 THEN 'fair'
        ELSE 'needs_improvement'
    END AS rating_category
FROM portuguese_businesses pb
WHERE pb.is_active = TRUE AND pb.is_approved = TRUE;

-- View for upcoming Portuguese events with location data
CREATE OR REPLACE VIEW portuguese_events_upcoming AS
SELECT 
    pce.*,
    ST_Y(pce.coordinates) AS latitude,
    ST_X(pce.coordinates) AS longitude,
    EXTRACT(EPOCH FROM (pce.event_date - CURRENT_DATE)) / 86400 AS days_until_event,
    CASE 
        WHEN pce.max_attendees IS NOT NULL THEN 
            ROUND((pce.current_attendees::DECIMAL / pce.max_attendees) * 100, 1)
        ELSE NULL
    END AS capacity_percentage,
    CASE
        WHEN pce.cultural_category IN ('fado', 'folklore', 'festival') THEN 'high'
        WHEN pce.cultural_category IN ('cuisine', 'language', 'arts') THEN 'medium'
        ELSE 'standard'
    END AS cultural_significance_level
FROM portuguese_cultural_events pce
WHERE pce.is_active = TRUE 
  AND pce.event_date >= CURRENT_DATE
ORDER BY pce.event_date, pce.featured_event DESC;

-- View for high-compatibility Portuguese community matches
CREATE OR REPLACE VIEW portuguese_cultural_matches AS
SELECT 
    cc.*,
    pa.first_name AS user_a_first_name,
    pa.last_name AS user_a_last_name,
    pb.first_name AS user_b_first_name,
    pb.last_name AS user_b_last_name,
    cpa.portuguese_origin AS user_a_origin,
    cpb.portuguese_origin AS user_b_origin,
    cpa.cultural_celebrations AS user_a_celebrations,
    cpb.cultural_celebrations AS user_b_celebrations
FROM cultural_compatibility cc
JOIN profiles pa ON cc.user_a_id = pa.id
JOIN profiles pb ON cc.user_b_id = pb.id
LEFT JOIN cultural_preferences cpa ON cc.user_a_id = cpa.user_id
LEFT JOIN cultural_preferences cpb ON cc.user_b_id = cpb.user_id
WHERE cc.overall_compatibility >= 0.70
  AND pa.is_active = TRUE 
  AND pb.is_active = TRUE;

-- ========================================
-- MAINTENANCE AND CLEANUP
-- ========================================

-- Create maintenance functions for data cleanup
CREATE OR REPLACE FUNCTION cleanup_old_performance_logs()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    -- Delete query performance logs older than 30 days
    DELETE FROM query_performance_log 
    WHERE timestamp < NOW() - INTERVAL '30 days';
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    
    -- Delete cache performance logs older than 7 days
    DELETE FROM cache_performance_log 
    WHERE timestamp < NOW() - INTERVAL '7 days';
    
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Create function to refresh materialized views (if any are added later)
CREATE OR REPLACE FUNCTION refresh_portuguese_community_stats()
RETURNS VOID AS $$
BEGIN
    -- Refresh any materialized views for dashboard statistics
    -- This would be implemented when materialized views are added
    -- REFRESH MATERIALIZED VIEW portuguese_community_dashboard_stats;
    NULL;
END;
$$ LANGUAGE plpgsql;

-- Set up table statistics for query planner optimization
ANALYZE portuguese_businesses;
ANALYZE portuguese_cultural_events;
ANALYZE cultural_preferences;
ANALYZE cultural_compatibility;

-- ========================================
-- CONFIGURATION OPTIMIZATIONS
-- ========================================

-- Optimize PostgreSQL settings for Portuguese community workload
-- Note: These should be set in postgresql.conf or via ALTER SYSTEM

-- For geospatial queries optimization
-- ALTER SYSTEM SET effective_cache_size = '4GB';
-- ALTER SYSTEM SET random_page_cost = 1.1; -- For SSD storage
-- ALTER SYSTEM SET seq_page_cost = 1.0;

-- For text search optimization  
-- ALTER SYSTEM SET default_text_search_config = 'portuguese';

-- For connection pooling optimization
-- ALTER SYSTEM SET max_connections = 200;
-- ALTER SYSTEM SET shared_buffers = '1GB';
-- ALTER SYSTEM SET work_mem = '64MB';

-- Enable query plan caching
-- ALTER SYSTEM SET plan_cache_mode = 'auto';

-- Reload configuration (requires superuser privileges)
-- SELECT pg_reload_conf();

-- ========================================
-- SECURITY AND ACCESS CONTROL
-- ========================================

-- Enable Row Level Security on sensitive tables
ALTER TABLE cultural_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE cultural_compatibility ENABLE ROW LEVEL SECURITY;

-- RLS policies for cultural preferences (users can only see their own)
CREATE POLICY cultural_preferences_user_access ON cultural_preferences
    FOR ALL USING (user_id = auth.uid());

-- RLS policies for cultural compatibility (users can see their own matches)
CREATE POLICY cultural_compatibility_user_access ON cultural_compatibility
    FOR SELECT USING (user_a_id = auth.uid() OR user_b_id = auth.uid());

-- Grant appropriate permissions for application roles
-- GRANT SELECT, INSERT, UPDATE ON portuguese_businesses TO app_role;
-- GRANT SELECT, INSERT, UPDATE ON portuguese_cultural_events TO app_role;
-- GRANT SELECT, INSERT, UPDATE, DELETE ON cultural_preferences TO app_role;
-- GRANT SELECT ON cultural_compatibility TO app_role;

COMMIT;