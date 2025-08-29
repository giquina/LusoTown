-- Database Performance Optimization Migration for LusoTown Portuguese-speaking Community Platform
-- This migration implements advanced database optimizations for Portuguese cultural content,
-- business directory geolocation, and cultural compatibility matching system.

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";

-- Set up Portuguese text search configuration
CREATE TEXT SEARCH CONFIGURATION IF NOT EXISTS portuguese_config (COPY = portuguese);

-- =====================================================
-- PORTUGUESE CULTURAL EVENTS OPTIMIZATIONS
-- =====================================================

-- Create optimized indexes for Portuguese cultural events
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_portuguese_events_active_date_category
    ON portuguese_cultural_events (is_active, event_date, cultural_category)
    WHERE is_active = true AND event_date >= CURRENT_DATE;

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_portuguese_events_location_active
    ON portuguese_cultural_events USING GIST(coordinates)
    WHERE is_active = true;

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_portuguese_events_region_date
    ON portuguese_cultural_events (portuguese_region, event_date, is_active)
    WHERE is_active = true;

-- Full-text search index for Portuguese events
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_portuguese_events_fulltext
    ON portuguese_cultural_events USING GIN(
        to_tsvector('portuguese', 
            coalesce(title, '') || ' ' || 
            coalesce(description, '') || ' ' || 
            coalesce(venue_name, '')
        )
    )
    WHERE is_active = true;

-- Composite index for event discovery queries
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_portuguese_events_discovery
    ON portuguese_cultural_events (cultural_category, event_date, is_active, coordinates)
    WHERE is_active = true AND event_date >= CURRENT_DATE;

-- =====================================================
-- PORTUGUESE BUSINESS DIRECTORY OPTIMIZATIONS
-- =====================================================

-- Create spatial index for Portuguese businesses
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_portuguese_businesses_spatial
    ON portuguese_businesses USING GIST(coordinates)
    WHERE is_active = true;

-- Composite index for business type and rating queries
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_portuguese_businesses_type_rating
    ON portuguese_businesses (business_type, is_active, rating_average DESC, review_count DESC)
    WHERE is_active = true;

-- Full-text search index for business names and descriptions
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_portuguese_businesses_fulltext
    ON portuguese_businesses USING GIN(
        to_tsvector('portuguese',
            coalesce(name, '') || ' ' ||
            coalesce(description, '') || ' ' ||
            array_to_string(portuguese_specialties, ' ')
        )
    )
    WHERE is_active = true;

-- Trigram index for fuzzy name search
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_portuguese_businesses_name_trgm
    ON portuguese_businesses USING GIN(name gin_trgm_ops)
    WHERE is_active = true;

-- Location-based business clustering index
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_portuguese_businesses_location_cluster
    ON portuguese_businesses (ST_SnapToGrid(coordinates, 0.001), business_type, is_active)
    WHERE is_active = true;

-- =====================================================
-- CULTURAL COMPATIBILITY OPTIMIZATIONS
-- =====================================================

-- Primary index for cultural compatibility matching
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_cultural_compatibility_user_score
    ON cultural_compatibility (user_a_id, overall_compatibility DESC, updated_at DESC)
    WHERE overall_compatibility >= 0.6;

-- Reverse index for bidirectional matching
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_cultural_compatibility_reverse
    ON cultural_compatibility (user_b_id, overall_compatibility DESC, updated_at DESC)
    WHERE overall_compatibility >= 0.6;

-- Composite index with included columns for covered queries
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_cultural_compatibility_covered
    ON cultural_compatibility (user_a_id, overall_compatibility DESC)
    INCLUDE (user_b_id, cultural_compatibility, language_compatibility, shared_elements)
    WHERE overall_compatibility >= 0.7;

-- Index for high-compatibility matches
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_cultural_compatibility_high
    ON cultural_compatibility (overall_compatibility DESC, updated_at DESC)
    WHERE overall_compatibility >= 0.8;

-- =====================================================
-- USER PROFILES OPTIMIZATIONS
-- =====================================================

-- Index for active Portuguese users
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_profiles_portuguese_active
    ON profiles (portuguese_origin, is_active, verification_status)
    WHERE is_active = true;

-- Index for verified users by location
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_profiles_location_verified
    ON profiles (location, is_active, verification_status)
    WHERE is_active = true AND verification_status = 'verified';

-- Index for membership tier filtering
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_profiles_membership_active
    ON profiles (membership_tier, is_active, verification_status)
    WHERE is_active = true;

-- =====================================================
-- CULTURAL PREFERENCES OPTIMIZATIONS
-- =====================================================

-- Index for cultural preferences by user
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_cultural_preferences_user
    ON cultural_preferences (user_id)
    INCLUDE (portuguese_origin, language_preference, cultural_celebrations);

-- Index for Portuguese origin matching
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_cultural_preferences_origin
    ON cultural_preferences (portuguese_origin, language_preference);

-- GIN index for cultural celebrations array matching
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_cultural_preferences_celebrations
    ON cultural_preferences USING GIN(cultural_celebrations);

-- =====================================================
-- MESSAGING AND COMMUNICATION OPTIMIZATIONS
-- =====================================================

-- Index for user conversations
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_messages_conversation
    ON messages (sender_id, recipient_id, created_at DESC);

-- Index for unread messages
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_messages_unread
    ON messages (recipient_id, is_read, created_at DESC)
    WHERE is_read = false;

-- =====================================================
-- EVENT ATTENDANCE OPTIMIZATIONS
-- =====================================================

-- Index for user event attendance
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_event_attendees_user_events
    ON event_attendees (user_id, created_at DESC);

-- Index for event attendance counts
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_event_attendees_event_count
    ON event_attendees (event_id, is_attending)
    WHERE is_attending = true;

-- =====================================================
-- OPTIMIZED FUNCTIONS FOR PORTUGUESE COMMUNITY
-- =====================================================

-- Function for efficient Portuguese event discovery
CREATE OR REPLACE FUNCTION find_portuguese_events_optimized(
    user_lat DECIMAL DEFAULT NULL,
    user_lng DECIMAL DEFAULT NULL,
    radius_km DECIMAL DEFAULT 25.0,
    cultural_categories TEXT[] DEFAULT NULL,
    language_preference TEXT DEFAULT 'pt',
    limit_count INTEGER DEFAULT 20
) RETURNS TABLE (
    event_id UUID,
    title TEXT,
    description TEXT,
    event_date DATE,
    event_time TIME,
    venue_name TEXT,
    venue_address TEXT,
    cultural_category TEXT,
    portuguese_region TEXT[],
    price DECIMAL,
    distance_km DECIMAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        e.id as event_id,
        e.title,
        e.description,
        e.event_date,
        e.event_time,
        e.venue_name,
        e.venue_address,
        e.cultural_category,
        e.portuguese_region,
        e.price,
        CASE 
            WHEN user_lat IS NOT NULL AND user_lng IS NOT NULL THEN
                ROUND(
                    ST_Distance(
                        ST_SetSRID(ST_MakePoint(user_lng, user_lat), 4326)::geography,
                        e.coordinates::geography
                    ) / 1000, 2
                )::DECIMAL
            ELSE NULL::DECIMAL
        END as distance_km
    FROM portuguese_cultural_events e
    WHERE e.is_active = true
      AND e.event_date >= CURRENT_DATE
      AND (cultural_categories IS NULL OR e.cultural_category = ANY(cultural_categories))
      AND (user_lat IS NULL OR user_lng IS NULL OR 
           ST_DWithin(
               ST_SetSRID(ST_MakePoint(user_lng, user_lat), 4326)::geography,
               e.coordinates::geography,
               radius_km * 1000
           ))
    ORDER BY 
        CASE WHEN user_lat IS NOT NULL AND user_lng IS NOT NULL 
             THEN ST_Distance(ST_SetSRID(ST_MakePoint(user_lng, user_lat), 4326), e.coordinates)
             ELSE e.event_date::NUMERIC 
        END ASC,
        e.event_date ASC
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql STABLE;

-- Function for efficient Portuguese business search
CREATE OR REPLACE FUNCTION find_portuguese_businesses_optimized(
    user_lat DECIMAL,
    user_lng DECIMAL,
    business_types TEXT[] DEFAULT NULL,
    radius_km DECIMAL DEFAULT 10.0,
    limit_count INTEGER DEFAULT 15
) RETURNS TABLE (
    business_id UUID,
    name TEXT,
    business_type TEXT,
    address TEXT,
    phone TEXT,
    website TEXT,
    portuguese_specialties TEXT[],
    rating_average DECIMAL,
    review_count INTEGER,
    distance_km DECIMAL,
    coordinates GEOMETRY
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        b.id as business_id,
        b.name,
        b.business_type,
        b.address,
        b.phone,
        b.website,
        b.portuguese_specialties,
        b.rating_average,
        b.review_count,
        ROUND(
            ST_Distance(
                ST_SetSRID(ST_MakePoint(user_lng, user_lat), 4326)::geography,
                b.coordinates::geography
            ) / 1000, 2
        )::DECIMAL as distance_km,
        b.coordinates
    FROM portuguese_businesses b
    WHERE b.is_active = true
      AND ST_DWithin(
          ST_SetSRID(ST_MakePoint(user_lng, user_lat), 4326)::geography,
          b.coordinates::geography,
          radius_km * 1000
      )
      AND (business_types IS NULL OR b.business_type = ANY(business_types))
    ORDER BY 
        b.coordinates <-> ST_SetSRID(ST_MakePoint(user_lng, user_lat), 4326),
        b.rating_average DESC NULLS LAST
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql STABLE;

-- Function for cultural compatibility calculation optimization
CREATE OR REPLACE FUNCTION calculate_portuguese_cultural_compatibility_optimized(
    user_id UUID,
    target_user_id UUID
) RETURNS TABLE (
    compatibility_score DECIMAL,
    cultural_score DECIMAL,
    language_score DECIMAL,
    professional_score DECIMAL,
    shared_elements TEXT[]
) AS $$
DECLARE
    user_prefs RECORD;
    target_prefs RECORD;
    calc_compatibility DECIMAL := 0.0;
    calc_cultural DECIMAL := 0.0;
    calc_language DECIMAL := 0.0;
    calc_professional DECIMAL := 0.0;
    shared_items TEXT[] := '{}';
BEGIN
    -- Get user preferences
    SELECT * INTO user_prefs
    FROM cultural_preferences 
    WHERE cultural_preferences.user_id = calculate_portuguese_cultural_compatibility_optimized.user_id;
    
    SELECT * INTO target_prefs
    FROM cultural_preferences 
    WHERE cultural_preferences.user_id = target_user_id;
    
    IF user_prefs IS NULL OR target_prefs IS NULL THEN
        RETURN QUERY SELECT 0.0::DECIMAL, 0.0::DECIMAL, 0.0::DECIMAL, 0.0::DECIMAL, '{}'::TEXT[];
        RETURN;
    END IF;
    
    -- Calculate Portuguese origin compatibility
    IF user_prefs.portuguese_origin = target_prefs.portuguese_origin THEN
        calc_cultural := calc_cultural + 0.4;
        shared_items := array_append(shared_items, 'Same Portuguese origin');
    ELSIF user_prefs.portuguese_origin = ANY(ARRAY['portugal', 'brazil']) 
          AND target_prefs.portuguese_origin = ANY(ARRAY['portugal', 'brazil']) THEN
        calc_cultural := calc_cultural + 0.3;
        shared_items := array_append(shared_items, 'Related Portuguese origins');
    END IF;
    
    -- Calculate language compatibility
    IF user_prefs.language_preference = target_prefs.language_preference THEN
        calc_language := 1.0;
        shared_items := array_append(shared_items, 'Same language preference');
    ELSIF (user_prefs.language_preference LIKE '%pt%' AND target_prefs.language_preference LIKE '%pt%') THEN
        calc_language := 0.8;
        shared_items := array_append(shared_items, 'Compatible Portuguese dialects');
    END IF;
    
    -- Calculate cultural celebrations overlap
    IF user_prefs.cultural_celebrations && target_prefs.cultural_celebrations THEN
        calc_cultural := calc_cultural + 0.3;
        shared_items := array_append(shared_items, 'Shared cultural celebrations');
    END IF;
    
    -- Calculate professional compatibility (placeholder)
    calc_professional := 0.5; -- This would be more sophisticated in practice
    
    -- Calculate overall compatibility
    calc_compatibility := (calc_cultural * 0.4 + calc_language * 0.3 + calc_professional * 0.3);
    
    RETURN QUERY SELECT 
        LEAST(calc_compatibility, 1.0)::DECIMAL,
        LEAST(calc_cultural, 1.0)::DECIMAL,
        LEAST(calc_language, 1.0)::DECIMAL,
        LEAST(calc_professional, 1.0)::DECIMAL,
        shared_items;
END;
$$ LANGUAGE plpgsql STABLE;

-- Function for Portuguese community feed optimization
CREATE OR REPLACE FUNCTION get_portuguese_community_feed_optimized(
    user_id UUID,
    feed_limit INTEGER DEFAULT 25,
    offset_count INTEGER DEFAULT 0
) RETURNS TABLE (
    post_id UUID,
    post_type TEXT,
    title TEXT,
    content TEXT,
    author_name TEXT,
    created_at TIMESTAMPTZ,
    likes_count INTEGER,
    comments_count INTEGER,
    cultural_relevance DECIMAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        fp.id as post_id,
        fp.post_type,
        fp.title,
        fp.content,
        p.first_name || ' ' || COALESCE(p.last_name, '') as author_name,
        fp.created_at,
        fp.likes_count,
        fp.comments_count,
        CASE 
            WHEN fp.portuguese_content = true THEN 1.0
            WHEN fp.cultural_category IS NOT NULL THEN 0.8
            ELSE 0.5
        END::DECIMAL as cultural_relevance
    FROM event_feed_posts fp
    JOIN profiles p ON fp.author_id = p.id
    WHERE fp.is_active = true
      AND (fp.is_public = true OR fp.author_id = user_id)
    ORDER BY 
        cultural_relevance DESC,
        fp.created_at DESC
    LIMIT feed_limit
    OFFSET offset_count;
END;
$$ LANGUAGE plpgsql STABLE;

-- =====================================================
-- PERFORMANCE MONITORING VIEWS
-- =====================================================

-- View for monitoring slow queries
CREATE OR REPLACE VIEW portuguese_slow_queries AS
SELECT 
    query,
    calls,
    total_time,
    mean_time,
    rows,
    100.0 * shared_blks_hit / nullif(shared_blks_hit + shared_blks_read, 0) AS hit_percent
FROM pg_stat_statements 
WHERE query LIKE '%portuguese%' OR query LIKE '%cultural%'
ORDER BY mean_time DESC;

-- View for monitoring Portuguese community activity
CREATE OR REPLACE VIEW portuguese_community_activity AS
SELECT 
    'events' as metric_type,
    COUNT(*) as total_count,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '24 hours') as last_24h,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as last_7days
FROM portuguese_cultural_events
WHERE is_active = true

UNION ALL

SELECT 
    'businesses' as metric_type,
    COUNT(*) as total_count,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '24 hours') as last_24h,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as last_7days
FROM portuguese_businesses
WHERE is_active = true

UNION ALL

SELECT 
    'matches' as metric_type,
    COUNT(*) as total_count,
    COUNT(*) FILTER (WHERE calculated_at >= NOW() - INTERVAL '24 hours') as last_24h,
    COUNT(*) FILTER (WHERE calculated_at >= NOW() - INTERVAL '7 days') as last_7days
FROM cultural_compatibility
WHERE overall_compatibility >= 0.7;

-- =====================================================
-- MAINTENANCE PROCEDURES
-- =====================================================

-- Procedure to update table statistics for Portuguese tables
CREATE OR REPLACE PROCEDURE update_portuguese_table_stats()
LANGUAGE plpgsql
AS $$
BEGIN
    ANALYZE portuguese_cultural_events;
    ANALYZE portuguese_businesses;
    ANALYZE cultural_compatibility;
    ANALYZE cultural_preferences;
    ANALYZE profiles;
    ANALYZE event_attendees;
    
    RAISE NOTICE 'Portuguese community table statistics updated';
END;
$$;

-- Procedure to clean up old performance data
CREATE OR REPLACE PROCEDURE cleanup_old_performance_data()
LANGUAGE plpgsql
AS $$
BEGIN
    -- Clean up old cultural compatibility calculations (older than 6 months)
    DELETE FROM cultural_compatibility 
    WHERE calculated_at < NOW() - INTERVAL '6 months'
      AND overall_compatibility < 0.5;
    
    -- Clean up old event feed posts (older than 1 year)
    DELETE FROM event_feed_posts 
    WHERE created_at < NOW() - INTERVAL '1 year'
      AND is_archived = true;
    
    -- Clean up old message threads (older than 2 years)
    DELETE FROM messages 
    WHERE created_at < NOW() - INTERVAL '2 years'
      AND is_deleted = true;
    
    RAISE NOTICE 'Old performance data cleaned up';
END;
$$;

-- =====================================================
-- TRIGGERS FOR PERFORMANCE OPTIMIZATION
-- =====================================================

-- Trigger to automatically update cultural compatibility when preferences change
CREATE OR REPLACE FUNCTION update_cultural_compatibility_trigger()
RETURNS TRIGGER AS $$
BEGIN
    -- Mark related compatibility calculations as stale
    UPDATE cultural_compatibility 
    SET needs_recalculation = true
    WHERE user_a_id = NEW.user_id OR user_b_id = NEW.user_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_cultural_compatibility
    AFTER UPDATE ON cultural_preferences
    FOR EACH ROW
    EXECUTE FUNCTION update_cultural_compatibility_trigger();

-- Trigger to maintain event attendance counts
CREATE OR REPLACE FUNCTION update_event_attendance_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' AND NEW.is_attending = true THEN
        UPDATE portuguese_cultural_events 
        SET current_attendees = current_attendees + 1
        WHERE id = NEW.event_id;
    ELSIF TG_OP = 'UPDATE' THEN
        IF OLD.is_attending = false AND NEW.is_attending = true THEN
            UPDATE portuguese_cultural_events 
            SET current_attendees = current_attendees + 1
            WHERE id = NEW.event_id;
        ELSIF OLD.is_attending = true AND NEW.is_attending = false THEN
            UPDATE portuguese_cultural_events 
            SET current_attendees = current_attendees - 1
            WHERE id = NEW.event_id;
        END IF;
    ELSIF TG_OP = 'DELETE' AND OLD.is_attending = true THEN
        UPDATE portuguese_cultural_events 
        SET current_attendees = current_attendees - 1
        WHERE id = OLD.event_id;
    END IF;
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_event_attendance_count
    AFTER INSERT OR UPDATE OR DELETE ON event_attendees
    FOR EACH ROW
    EXECUTE FUNCTION update_event_attendance_count();

-- =====================================================
-- FINAL OPTIMIZATIONS
-- =====================================================

-- Enable parallel query processing for large tables
ALTER TABLE portuguese_cultural_events SET (parallel_workers = 4);
ALTER TABLE portuguese_businesses SET (parallel_workers = 4);
ALTER TABLE cultural_compatibility SET (parallel_workers = 2);

-- Set table-specific configuration
ALTER TABLE portuguese_cultural_events SET (fillfactor = 90);
ALTER TABLE portuguese_businesses SET (fillfactor = 90);
ALTER TABLE cultural_compatibility SET (fillfactor = 85);

-- Update table statistics
CALL update_portuguese_table_stats();

-- Create scheduled job for regular maintenance (requires pg_cron extension)
-- SELECT cron.schedule('portuguese-stats-update', '0 2 * * *', 'CALL update_portuguese_table_stats();');
-- SELECT cron.schedule('portuguese-cleanup', '0 3 * * 0', 'CALL cleanup_old_performance_data();');

COMMIT;

-- Performance optimization complete
-- This migration provides:
-- 1. Optimized indexes for Portuguese cultural content queries
-- 2. Spatial indexing for business directory geolocation
-- 3. Advanced cultural compatibility matching optimization
-- 4. Full-text search capabilities for Portuguese content
-- 5. Performance monitoring views and procedures
-- 6. Automated maintenance triggers and procedures