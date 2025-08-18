-- LusoTown Database Migrations
-- Applied: 2025-08-18T20:32:16.725Z
-- Migrations: 20250818_004_youtube_integration_system.sql, 20250818_005_tiktok_style_messaging_system.sql

-- ============================================================
-- MIGRATION: 20250818_004_youtube_integration_system.sql
-- ============================================================

-- YouTube Integration System Database Schema
-- LusoTown Portuguese Cultural Content Focus
-- Created: 2025-08-18

-- ============================================================================
-- YOUTUBE CONTENT MANAGEMENT TABLES
-- ============================================================================

-- YouTube videos tracking and metadata
CREATE TABLE public.youtube_videos (
    id uuid default uuid_generate_v4() primary key,
    youtube_video_id varchar(50) unique not null,
    title varchar(255) not null,
    description text,
    thumbnail_url varchar(500),
    duration_seconds integer not null default 0,
    
    -- Content metadata
    language varchar(10) default 'pt' check (language in ('pt', 'en', 'pt-BR', 'pt-PT')),
    cultural_context varchar(50) check (cultural_context in ('portugal', 'brazil', 'africa', 'diaspora', 'universal')),
    portuguese_cultural_focus boolean default true,
    content_type varchar(50) not null check (content_type in ('member_spotlight', 'event_preview', 'event_highlight', 'cultural_education', 'business_feature', 'tradition_showcase')),
    
    -- YouTube metadata
    published_at timestamp with time zone not null,
    category_id varchar(10),
    tags text[],
    privacy_status varchar(20) default 'public' check (privacy_status in ('public', 'unlisted', 'private')),
    
    -- Performance metrics
    view_count integer default 0,
    like_count integer default 0,
    dislike_count integer default 0,
    comment_count integer default 0,
    share_count integer default 0,
    
    -- Geographic performance (JSON for flexibility)
    geographic_distribution jsonb,
    age_group_distribution jsonb,
    
    -- Cultural engagement metrics
    portuguese_community_engagement_score decimal(3,2) default 0.00,
    cultural_authenticity_rating decimal(3,2) default 0.00,
    
    -- LusoTown specific
    created_by uuid references public.profiles(id) on delete cascade,
    event_id uuid references public.events(id) on delete set null,
    member_spotlight_id uuid,
    
    -- Status tracking
    status varchar(20) default 'published' check (status in ('draft', 'processing', 'published', 'archived', 'removed')),
    featured boolean default false,
    
    -- Timestamps
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    last_analytics_update timestamp with time zone
);

-- YouTube playlists management
CREATE TABLE public.youtube_playlists (
    id uuid default uuid_generate_v4() primary key,
    youtube_playlist_id varchar(50) unique not null,
    title varchar(255) not null,
    description text,
    thumbnail_url varchar(500),
    
    -- Cultural categorization
    cultural_category varchar(50) not null check (cultural_category in ('success_stories', 'events', 'traditions', 'business', 'music', 'gastronomy', 'education', 'community')),
    cultural_context varchar(50) check (cultural_context in ('portugal', 'brazil', 'africa', 'diaspora', 'universal')),
    
    -- Playlist metadata
    privacy_status varchar(20) default 'public' check (privacy_status in ('public', 'unlisted', 'private')),
    item_count integer default 0,
    total_duration_seconds integer default 0,
    
    -- Performance metrics
    total_views integer default 0,
    subscriber_count integer default 0,
    average_watch_time integer default 0,
    
    -- Management
    created_by uuid references public.profiles(id) on delete cascade,
    is_featured boolean default false,
    sort_order integer default 0,
    
    -- Timestamps
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- YouTube playlist items (videos in playlists)
CREATE TABLE public.youtube_playlist_items (
    id uuid default uuid_generate_v4() primary key,
    playlist_id uuid references public.youtube_playlists(id) on delete cascade not null,
    video_id uuid references public.youtube_videos(id) on delete cascade not null,
    youtube_playlist_item_id varchar(50) unique,
    position_in_playlist integer not null,
    added_at timestamp with time zone default timezone('utc'::text, now()) not null,
    
    -- Unique constraint to prevent duplicates
    UNIQUE(playlist_id, video_id)
);

-- ============================================================================
-- MEMBER SPOTLIGHTS SYSTEM
-- ============================================================================

-- Member spotlight requests and management
CREATE TABLE public.member_spotlights (
    id uuid default uuid_generate_v4() primary key,
    member_id uuid references public.profiles(id) on delete cascade not null,
    
    -- Story details
    story_type varchar(50) not null check (story_type in ('immigration_journey', 'business_success', 'cultural_preservation', 'community_leadership', 'intergenerational_story')),
    story_title varchar(255) not null,
    story_description text not null,
    key_messages text[] not null,
    
    -- Cultural context
    cultural_background varchar(50) not null check (cultural_background in ('portugal', 'brazil', 'angola', 'mozambique', 'cape_verde', 'guinea_bissau', 'sao_tome_principe', 'east_timor', 'mixed', 'other')),
    heritage_significance text,
    community_impact text,
    
    -- Consent and privacy
    consent_given boolean default false,
    consent_given_at timestamp with time zone,
    privacy_level varchar(20) default 'community_only' check (privacy_level in ('public', 'community_only', 'anonymous')),
    
    -- Production details
    estimated_duration integer, -- in minutes
    suggested_questions text[],
    preferred_language varchar(10) default 'pt',
    interview_location varchar(255),
    
    -- Scheduling
    scheduled_date timestamp with time zone,
    recording_date timestamp with time zone,
    interview_duration integer, -- actual duration in minutes
    
    -- Content files
    raw_video_url varchar(500),
    edited_video_url varchar(500),
    thumbnail_url varchar(500),
    
    -- YouTube integration
    youtube_video_id uuid references public.youtube_videos(id) on delete set null,
    
    -- Status tracking
    status varchar(30) default 'pending_consent' check (status in ('pending_consent', 'consent_given', 'scheduled', 'recorded', 'in_edit', 'ready_for_review', 'approved', 'published', 'cancelled')),
    
    -- Approval workflow
    reviewed_by uuid references public.profiles(id),
    reviewed_at timestamp with time zone,
    review_notes text,
    
    -- Performance tracking
    community_response_score decimal(3,2) default 0.00,
    cultural_authenticity_score decimal(3,2) default 0.00,
    inspiration_rating decimal(3,2) default 0.00,
    
    -- Timestamps
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    published_at timestamp with time zone
);

-- ============================================================================
-- EVENT PREVIEW SYSTEM
-- ============================================================================

-- Event preview videos
CREATE TABLE public.event_previews (
    id uuid default uuid_generate_v4() primary key,
    event_id uuid references public.events(id) on delete cascade not null,
    
    -- Preview content
    preview_title varchar(255) not null,
    preview_description text not null,
    host_intro_script text not null,
    
    -- Cultural highlights
    cultural_highlights text[] not null,
    expected_atmosphere text,
    what_to_expect text[],
    
    -- Event specific information
    dress_code varchar(255),
    language_info varchar(255),
    accessibility_info text,
    cultural_context_explanation text,
    
    -- Host information
    host_name varchar(255),
    host_background text,
    host_cultural_connection text,
    
    -- Production details
    script_template_used varchar(50),
    estimated_duration integer default 180, -- 3 minutes default
    
    -- Media files
    video_url varchar(500),
    thumbnail_url varchar(500),
    background_music varchar(255),
    
    -- YouTube integration
    youtube_video_id uuid references public.youtube_videos(id) on delete set null,
    
    -- Publishing
    scheduled_publish_date timestamp with time zone,
    published_at timestamp with time zone,
    
    -- Performance metrics
    view_count integer default 0,
    engagement_score decimal(3,2) default 0.00,
    conversion_to_event_booking decimal(5,2) default 0.00,
    
    -- Status
    status varchar(20) default 'draft' check (status in ('draft', 'script_ready', 'recorded', 'edited', 'published', 'archived')),
    
    -- Timestamps
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ============================================================================
-- EVENT HIGHLIGHT AUTOMATION
-- ============================================================================

-- Event highlight compilations
CREATE TABLE public.event_highlights (
    id uuid default uuid_generate_v4() primary key,
    event_id uuid references public.events(id) on delete cascade not null,
    
    -- Highlight details
    highlight_type varchar(30) not null check (highlight_type in ('auto_compilation', 'cultural_moments', 'testimonials', 'best_of', 'tradition_showcase', 'music_moments')),
    title varchar(255) not null,
    description text not null,
    
    -- Content structure
    key_highlights text[] not null,
    duration_seconds integer not null,
    
    -- Cultural analysis
    cultural_moments jsonb, -- Array of cultural moment objects
    testimonials jsonb, -- Array of testimonial objects
    music_moments jsonb, -- Array of music moment objects
    
    -- AI/Auto processing details
    ai_processing_confidence decimal(3,2) default 0.00,
    auto_generated boolean default true,
    manual_review_required boolean default true,
    
    -- Media files
    raw_footage_urls text[],
    compiled_video_url varchar(500),
    thumbnail_url varchar(500),
    
    -- YouTube integration
    youtube_video_id uuid references public.youtube_videos(id) on delete set null,
    
    -- Performance metrics
    view_count integer default 0,
    like_count integer default 0,
    share_count integer default 0,
    engagement_score decimal(3,2) default 0.00,
    
    -- Status and workflow
    status varchar(30) default 'processing' check (status in ('processing', 'ready_for_review', 'approved', 'published', 'archived')),
    reviewed_by uuid references public.profiles(id),
    reviewed_at timestamp with time zone,
    
    -- Timestamps
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    published_at timestamp with time zone
);

-- ============================================================================
-- CONTENT CALENDAR AND SCHEDULING
-- ============================================================================

-- YouTube content calendar
CREATE TABLE public.youtube_content_calendar (
    id uuid default uuid_generate_v4() primary key,
    
    -- Scheduling
    scheduled_date date not null,
    scheduled_time time,
    
    -- Content details
    content_type varchar(50) not null check (content_type in ('member_spotlight', 'event_preview', 'event_highlight', 'cultural_education', 'business_feature', 'live_stream', 'community_update')),
    title varchar(255) not null,
    description text not null,
    
    -- Cultural focus
    cultural_context varchar(50) check (cultural_context in ('portugal', 'brazil', 'africa', 'diaspora', 'universal')),
    target_audience varchar(50) check (target_audience in ('general_community', 'business_professionals', 'young_adults', 'families', 'new_arrivals', 'established_community')),
    
    -- Content references
    event_id uuid references public.events(id) on delete set null,
    member_spotlight_id uuid references public.member_spotlights(id) on delete set null,
    event_highlight_id uuid references public.event_highlights(id) on delete set null,
    
    -- Production planning
    estimated_duration integer, -- in minutes
    estimated_views integer default 500,
    production_complexity varchar(20) default 'medium' check (production_complexity in ('low', 'medium', 'high')),
    requires_external_talent boolean default false,
    
    -- Resources needed
    equipment_needed text[],
    location_requirements text,
    talent_requirements text[],
    
    -- Workflow
    assigned_to uuid references public.profiles(id),
    priority varchar(20) default 'medium' check (priority in ('low', 'medium', 'high', 'urgent')),
    status varchar(30) default 'planned' check (status in ('planned', 'in_production', 'ready', 'scheduled', 'published', 'rescheduled', 'cancelled')),
    
    -- YouTube integration
    youtube_video_id uuid references public.youtube_videos(id) on delete set null,
    
    -- Performance tracking
    actual_views integer,
    actual_engagement decimal(3,2),
    community_feedback_score decimal(3,2),
    
    -- Timestamps
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    published_at timestamp with time zone
);

-- ============================================================================
-- CULTURAL CONTENT ANALYTICS
-- ============================================================================

-- Portuguese cultural content performance tracking
CREATE TABLE public.cultural_content_analytics (
    id uuid default uuid_generate_v4() primary key,
    youtube_video_id uuid references public.youtube_videos(id) on delete cascade not null,
    
    -- Date for analytics period
    analytics_date date not null,
    
    -- Engagement metrics
    daily_views integer default 0,
    daily_likes integer default 0,
    daily_comments integer default 0,
    daily_shares integer default 0,
    daily_subscribers_gained integer default 0,
    
    -- Watch time metrics
    total_watch_time_minutes integer default 0,
    average_view_duration_seconds integer default 0,
    audience_retention_rate decimal(5,2) default 0.00,
    
    -- Geographic breakdown
    views_portugal integer default 0,
    views_brazil integer default 0,
    views_uk integer default 0,
    views_other_lusophone integer default 0,
    views_other_countries integer default 0,
    
    -- Demographic insights (when available)
    views_age_18_24 integer default 0,
    views_age_25_34 integer default 0,
    views_age_35_44 integer default 0,
    views_age_45_54 integer default 0,
    views_age_55_plus integer default 0,
    
    -- Cultural engagement indicators
    portuguese_language_comments integer default 0,
    cultural_reference_mentions integer default 0,
    nostalgia_sentiment_score decimal(3,2) default 0.00,
    community_connection_score decimal(3,2) default 0.00,
    
    -- Traffic sources
    traffic_youtube_search integer default 0,
    traffic_suggested_videos integer default 0,
    traffic_external integer default 0,
    traffic_direct integer default 0,
    
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- YouTube videos indexes
CREATE INDEX idx_youtube_videos_youtube_id ON public.youtube_videos(youtube_video_id);
CREATE INDEX idx_youtube_videos_cultural_context ON public.youtube_videos(cultural_context);
CREATE INDEX idx_youtube_videos_content_type ON public.youtube_videos(content_type);
CREATE INDEX idx_youtube_videos_published_at ON public.youtube_videos(published_at DESC);
CREATE INDEX idx_youtube_videos_view_count ON public.youtube_videos(view_count DESC);
CREATE INDEX idx_youtube_videos_portuguese_focus ON public.youtube_videos(portuguese_cultural_focus) WHERE portuguese_cultural_focus = true;
CREATE INDEX idx_youtube_videos_featured ON public.youtube_videos(featured) WHERE featured = true;

-- Member spotlights indexes
CREATE INDEX idx_member_spotlights_member_id ON public.member_spotlights(member_id);
CREATE INDEX idx_member_spotlights_status ON public.member_spotlights(status);
CREATE INDEX idx_member_spotlights_story_type ON public.member_spotlights(story_type);
CREATE INDEX idx_member_spotlights_cultural_background ON public.member_spotlights(cultural_background);
CREATE INDEX idx_member_spotlights_scheduled_date ON public.member_spotlights(scheduled_date);

-- Event previews indexes
CREATE INDEX idx_event_previews_event_id ON public.event_previews(event_id);
CREATE INDEX idx_event_previews_status ON public.event_previews(status);
CREATE INDEX idx_event_previews_scheduled_publish ON public.event_previews(scheduled_publish_date);

-- Event highlights indexes
CREATE INDEX idx_event_highlights_event_id ON public.event_highlights(event_id);
CREATE INDEX idx_event_highlights_type ON public.event_highlights(highlight_type);
CREATE INDEX idx_event_highlights_status ON public.event_highlights(status);

-- Content calendar indexes
CREATE INDEX idx_content_calendar_scheduled_date ON public.youtube_content_calendar(scheduled_date);
CREATE INDEX idx_content_calendar_content_type ON public.youtube_content_calendar(content_type);
CREATE INDEX idx_content_calendar_status ON public.youtube_content_calendar(status);
CREATE INDEX idx_content_calendar_assigned_to ON public.youtube_content_calendar(assigned_to);
CREATE INDEX idx_content_calendar_priority ON public.youtube_content_calendar(priority);

-- Analytics indexes
CREATE INDEX idx_cultural_analytics_video_date ON public.cultural_content_analytics(youtube_video_id, analytics_date);
CREATE INDEX idx_cultural_analytics_date ON public.cultural_content_analytics(analytics_date DESC);

-- ============================================================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE public.youtube_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.youtube_playlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.youtube_playlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.member_spotlights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_previews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_highlights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.youtube_content_calendar ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cultural_content_analytics ENABLE ROW LEVEL SECURITY;

-- YouTube videos policies (public read for published content)
CREATE POLICY "Published YouTube videos are publicly viewable" ON public.youtube_videos
    FOR SELECT USING (status = 'published');

CREATE POLICY "Content creators can manage their videos" ON public.youtube_videos
    FOR ALL USING (auth.uid() = created_by);

-- Member spotlights policies
CREATE POLICY "Users can view their own spotlights" ON public.member_spotlights
    FOR SELECT USING (auth.uid() = member_id);

CREATE POLICY "Users can create their own spotlight requests" ON public.member_spotlights
    FOR INSERT WITH CHECK (auth.uid() = member_id);

CREATE POLICY "Content managers can manage all spotlights" ON public.member_spotlights
    FOR ALL USING (
        auth.uid() IN (
            SELECT id FROM public.profiles WHERE role IN ('admin', 'content_manager')
        )
    );

-- Event previews policies
CREATE POLICY "Published event previews are publicly viewable" ON public.event_previews
    FOR SELECT USING (status = 'published');

CREATE POLICY "Content creators can manage event previews" ON public.event_previews
    FOR ALL USING (
        auth.uid() IN (
            SELECT id FROM public.profiles WHERE role IN ('admin', 'content_manager', 'event_organizer')
        )
    );

-- Content calendar policies
CREATE POLICY "Content team can manage calendar" ON public.youtube_content_calendar
    FOR ALL USING (
        auth.uid() IN (
            SELECT id FROM public.profiles WHERE role IN ('admin', 'content_manager')
        ) OR auth.uid() = assigned_to
    );

-- Analytics policies (read-only for content creators)
CREATE POLICY "Content creators can view analytics" ON public.cultural_content_analytics
    FOR SELECT USING (
        youtube_video_id IN (
            SELECT id FROM public.youtube_videos WHERE created_by = auth.uid()
        ) OR auth.uid() IN (
            SELECT id FROM public.profiles WHERE role IN ('admin', 'content_manager')
        )
    );

-- ============================================================================
-- FUNCTIONS AND TRIGGERS
-- ============================================================================

-- Trigger for updated_at timestamps
CREATE TRIGGER handle_youtube_videos_updated_at BEFORE UPDATE ON public.youtube_videos
    FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

CREATE TRIGGER handle_youtube_playlists_updated_at BEFORE UPDATE ON public.youtube_playlists
    FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

CREATE TRIGGER handle_member_spotlights_updated_at BEFORE UPDATE ON public.member_spotlights
    FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

CREATE TRIGGER handle_event_previews_updated_at BEFORE UPDATE ON public.event_previews
    FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

CREATE TRIGGER handle_event_highlights_updated_at BEFORE UPDATE ON public.event_highlights
    FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

CREATE TRIGGER handle_content_calendar_updated_at BEFORE UPDATE ON public.youtube_content_calendar
    FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

-- Function to update playlist item count
CREATE OR REPLACE FUNCTION update_playlist_item_count()
RETURNS trigger AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.youtube_playlists 
        SET item_count = item_count + 1
        WHERE id = NEW.playlist_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.youtube_playlists 
        SET item_count = GREATEST(0, item_count - 1)
        WHERE id = OLD.playlist_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger to maintain playlist item count
CREATE TRIGGER update_playlist_item_count_trigger
    AFTER INSERT OR DELETE ON public.youtube_playlist_items
    FOR EACH ROW EXECUTE PROCEDURE update_playlist_item_count();

-- Function to calculate cultural authenticity score
CREATE OR REPLACE FUNCTION calculate_cultural_authenticity_score(video_id uuid)
RETURNS decimal AS $$
DECLARE
    score decimal := 0.00;
    video_record RECORD;
BEGIN
    SELECT * INTO video_record FROM public.youtube_videos WHERE id = video_id;
    
    IF NOT FOUND THEN
        RETURN 0.00;
    END IF;
    
    -- Base score for Portuguese cultural focus
    IF video_record.portuguese_cultural_focus THEN
        score := score + 2.00;
    END IF;
    
    -- Score based on cultural context
    CASE video_record.cultural_context
        WHEN 'portugal' THEN score := score + 2.00;
        WHEN 'brazil' THEN score := score + 1.80;
        WHEN 'africa' THEN score := score + 1.60;
        WHEN 'diaspora' THEN score := score + 1.80;
        WHEN 'universal' THEN score := score + 1.00;
        ELSE score := score + 0.50;
    END CASE;
    
    -- Language bonus
    IF video_record.language IN ('pt', 'pt-PT', 'pt-BR') THEN
        score := score + 1.00;
    END IF;
    
    -- Content type bonus
    CASE video_record.content_type
        WHEN 'tradition_showcase' THEN score := score + 2.00;
        WHEN 'cultural_education' THEN score := score + 1.50;
        WHEN 'member_spotlight' THEN score := score + 1.20;
        ELSE score := score + 0.50;
    END CASE;
    
    -- Engagement bonus (simplified calculation)
    IF video_record.view_count > 1000 THEN
        score := score + LEAST(1.00, video_record.view_count::decimal / 5000);
    END IF;
    
    -- Cap the score at 10.00
    RETURN LEAST(10.00, score);
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- SEED DATA FOR CULTURAL CONTENT TEMPLATES
-- ============================================================================

-- Insert default Portuguese cultural playlists
INSERT INTO public.youtube_playlists (youtube_playlist_id, title, description, cultural_category, cultural_context, privacy_status) VALUES
('PLLusoSuccessStories', 'LusoTown: Histórias de Sucesso da Comunidade', 'Histórias inspiradoras de portugueses que alcançaram sucesso em Londres', 'success_stories', 'diaspora', 'public'),
('PLLusoCulturalEvents', 'LusoTown: Eventos Culturais Portugueses', 'Prévias e destaques dos nossos eventos culturais portugueses', 'events', 'universal', 'public'),
('PLLusoTraditions', 'LusoTown: Tradições Portuguesas em Londres', 'Preservando e celebrando tradições portuguesas na capital britânica', 'traditions', 'portugal', 'public'),
('PLLusoBusiness', 'LusoTown: Negócios e Empreendedorismo', 'Histórias de sucesso empresarial da comunidade portuguesa', 'business', 'universal', 'public'),
('PLLusoMusic', 'LusoTown: Música e Fado', 'A alma portuguesa através da música e do Fado', 'music', 'portugal', 'public'),
('PLLusoGastronomy', 'LusoTown: Sabores de Portugal', 'Culinária portuguesa autêntica em Londres', 'gastronomy', 'portugal', 'public');

-- ============================================================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================================================

COMMENT ON TABLE public.youtube_videos IS 'Central repository for all LusoTown YouTube videos with Portuguese cultural metadata and performance tracking';
COMMENT ON TABLE public.youtube_playlists IS 'YouTube playlists organized by Portuguese cultural categories and themes';
COMMENT ON TABLE public.member_spotlights IS 'Member spotlight video system showcasing Portuguese community success stories and cultural preservation';
COMMENT ON TABLE public.event_previews IS 'Event preview video system with Portuguese cultural context and host introductions';
COMMENT ON TABLE public.event_highlights IS 'Automated highlight reel generation from Portuguese cultural events with AI processing';
COMMENT ON TABLE public.youtube_content_calendar IS 'Content planning and scheduling system for Portuguese cultural YouTube content';
COMMENT ON TABLE public.cultural_content_analytics IS 'Detailed analytics tracking for Portuguese cultural content performance and community engagement';

-- ============================================================================
-- FINAL NOTES
-- ============================================================================

-- This migration creates a comprehensive YouTube integration system for LusoTown with:
-- 1. Complete video and playlist management with Portuguese cultural metadata
-- 2. Member spotlight system for featuring community success stories
-- 3. Event preview generation with cultural context and host scripts
-- 4. Automated event highlight compilation with cultural moment detection
-- 5. Content calendar and scheduling system for Portuguese cultural content
-- 6. Advanced analytics tracking Portuguese community engagement
-- 7. Cultural authenticity scoring and Portuguese heritage preservation focus
-- 8. Full integration with existing LusoTown events and member systems

-- ============================================================
-- MIGRATION: 20250818_005_tiktok_style_messaging_system.sql
-- ============================================================

-- LusoTown TikTok-Style Messaging System
-- Created: 2025-08-18
-- Purpose: Comprehensive messaging system with Portuguese community focus

-- Create conversations table for one-on-one matches messaging
CREATE TABLE IF NOT EXISTS public.conversations (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    participant_ids uuid[] NOT NULL,
    connection_type VARCHAR(50) DEFAULT 'mutual_match' CHECK (connection_type IN ('mutual_match', 'event_based', 'professional')),
    is_active BOOLEAN DEFAULT true,
    expires_at TIMESTAMP WITH TIME ZONE, -- 7-day expiry
    last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create conversation_messages table for private messages
CREATE TABLE IF NOT EXISTS public.conversation_messages (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    conversation_id uuid REFERENCES public.conversations(id) ON DELETE CASCADE NOT NULL,
    sender_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    receiver_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    content TEXT NOT NULL,
    message_type VARCHAR(20) DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'voice', 'system')),
    approval_status VARCHAR(20) DEFAULT 'pending' CHECK (approval_status IN ('pending', 'approved', 'rejected', 'auto_approved')),
    is_read BOOLEAN DEFAULT false,
    is_blocked BOOLEAN DEFAULT false,
    blocked_reason TEXT,
    safety_score INTEGER DEFAULT 100, -- AI content filtering score
    contains_contact_info BOOLEAN DEFAULT false,
    flagged_content JSONB DEFAULT '{}'::jsonb, -- Details of what was flagged
    reply_to uuid REFERENCES public.conversation_messages(id) ON DELETE SET NULL,
    response_deadline TIMESTAMP WITH TIME ZONE, -- 48-hour response time
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create moderation_queue table
CREATE TABLE IF NOT EXISTS public.moderation_queue (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    message_id uuid REFERENCES public.conversation_messages(id) ON DELETE CASCADE NOT NULL,
    conversation_id uuid REFERENCES public.conversations(id) ON DELETE CASCADE NOT NULL,
    sender_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    receiver_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    content TEXT NOT NULL,
    flagged_reasons TEXT[] DEFAULT '{}',
    ai_analysis JSONB DEFAULT '{}'::jsonb,
    priority_level VARCHAR(20) DEFAULT 'medium' CHECK (priority_level IN ('low', 'medium', 'high', 'urgent')),
    moderator_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
    moderation_action VARCHAR(30) CHECK (moderation_action IN ('approve', 'reject', 'edit', 'warn_user', 'block_user')),
    moderator_notes TEXT,
    is_resolved BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    resolved_at TIMESTAMP WITH TIME ZONE
);

-- Create age_verification table
CREATE TABLE IF NOT EXISTS public.age_verification (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
    verification_method VARCHAR(30) NOT NULL CHECK (verification_method IN ('document_upload', 'selfie_verification', 'parent_guardian')),
    verification_status VARCHAR(20) DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected', 'expired')),
    date_of_birth DATE NOT NULL,
    age_at_verification INTEGER NOT NULL,
    document_type VARCHAR(50), -- passport, driving_license, national_id
    verification_data JSONB DEFAULT '{}'::jsonb,
    parent_guardian_email TEXT, -- For users under 21
    parent_guardian_consent BOOLEAN DEFAULT false,
    verified_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
    verification_notes TEXT,
    expires_at TIMESTAMP WITH TIME ZONE, -- Annual re-verification
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    verified_at TIMESTAMP WITH TIME ZONE
);

-- Create conversation_starters table for Portuguese cultural prompts
CREATE TABLE IF NOT EXISTS public.conversation_starters (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    category VARCHAR(50) NOT NULL, -- culture, events, food, music, sports
    prompt_en TEXT NOT NULL,
    prompt_pt TEXT NOT NULL,
    cultural_context TEXT, -- Explanation of Portuguese cultural reference
    is_active BOOLEAN DEFAULT true,
    usage_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create user_messaging_stats table for Community Ambassador system
CREATE TABLE IF NOT EXISTS public.user_messaging_stats (
    user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
    total_conversations INTEGER DEFAULT 0,
    successful_matches INTEGER DEFAULT 0,
    positive_interactions INTEGER DEFAULT 0,
    flagged_messages INTEGER DEFAULT 0,
    ambassador_score INTEGER DEFAULT 0,
    achievement_badges JSONB DEFAULT '[]'::jsonb,
    messaging_restrictions JSONB DEFAULT '{}'::jsonb, -- Temporary restrictions
    last_calculated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversation_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.moderation_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.age_verification ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversation_starters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_messaging_stats ENABLE ROW LEVEL SECURITY;

-- Conversation policies
CREATE POLICY "Users can view their own conversations" ON public.conversations
    FOR SELECT USING (auth.uid() = ANY(participant_ids));

CREATE POLICY "Users can create conversations with matches" ON public.conversations
    FOR INSERT WITH CHECK (auth.uid() = ANY(participant_ids));

CREATE POLICY "Users can update their own conversations" ON public.conversations
    FOR UPDATE USING (auth.uid() = ANY(participant_ids));

-- Conversation messages policies
CREATE POLICY "Users can view messages in their conversations" ON public.conversation_messages
    FOR SELECT USING (
        auth.uid() = sender_id OR auth.uid() = receiver_id
    );

CREATE POLICY "Users can send messages in their conversations" ON public.conversation_messages
    FOR INSERT WITH CHECK (
        auth.uid() = sender_id AND
        EXISTS (
            SELECT 1 FROM public.conversations c
            WHERE c.id = conversation_id 
            AND auth.uid() = ANY(c.participant_ids)
            AND c.is_active = true
        )
    );

CREATE POLICY "Users can update their own messages" ON public.conversation_messages
    FOR UPDATE USING (auth.uid() = sender_id);

-- Moderation queue policies (moderators only)
CREATE POLICY "Moderators can view moderation queue" ON public.moderation_queue
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles p
            WHERE p.id = auth.uid()
            AND (p.role = 'admin' OR p.role = 'moderator')
        )
    );

CREATE POLICY "System can insert into moderation queue" ON public.moderation_queue
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Moderators can update moderation queue" ON public.moderation_queue
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.profiles p
            WHERE p.id = auth.uid()
            AND (p.role = 'admin' OR p.role = 'moderator')
        )
    );

-- Age verification policies
CREATE POLICY "Users can view their own age verification" ON public.age_verification
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own age verification" ON public.age_verification
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all age verifications" ON public.age_verification
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles p
            WHERE p.id = auth.uid()
            AND p.role = 'admin'
        )
    );

-- Conversation starters policies
CREATE POLICY "All users can view conversation starters" ON public.conversation_starters
    FOR SELECT USING (is_active = true);

-- User messaging stats policies
CREATE POLICY "Users can view their own messaging stats" ON public.user_messaging_stats
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can update messaging stats" ON public.user_messaging_stats
    FOR ALL USING (true); -- Restricted by RLS functions

-- Indexes for performance
CREATE INDEX idx_conversations_participants ON public.conversations USING GIN(participant_ids);
CREATE INDEX idx_conversations_expires_at ON public.conversations(expires_at) WHERE expires_at IS NOT NULL;
CREATE INDEX idx_conversation_messages_conversation_id ON public.conversation_messages(conversation_id, created_at DESC);
CREATE INDEX idx_conversation_messages_approval_status ON public.conversation_messages(approval_status) WHERE approval_status = 'pending';
CREATE INDEX idx_conversation_messages_response_deadline ON public.conversation_messages(response_deadline) WHERE response_deadline IS NOT NULL;
CREATE INDEX idx_moderation_queue_unresolved ON public.moderation_queue(created_at DESC) WHERE is_resolved = false;
CREATE INDEX idx_age_verification_user_status ON public.age_verification(user_id, verification_status);
CREATE INDEX idx_conversation_starters_category ON public.conversation_starters(category, is_active);

-- Add updated_at triggers
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.conversations
    FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.conversation_messages
    FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

-- Insert Portuguese conversation starters
INSERT INTO public.conversation_starters (category, prompt_en, prompt_pt, cultural_context) VALUES
    ('culture', 'What''s your favorite Portuguese tradition you still celebrate in London?', 'Qual é a tradição portuguesa que mais gosta de celebrar em Londres?', 'Helps discover shared cultural values and practices'),
    ('food', 'Where do you find the best pastéis de nata in London?', 'Onde encontra os melhores pastéis de nata em Londres?', 'Classic Portuguese pastry conversation starter'),
    ('music', 'Do you enjoy Fado music? Any favorite singers?', 'Gosta de fado? Tem algum fadista preferido?', 'Traditional Portuguese music genre'),
    ('events', 'Have you been to any Portuguese cultural events in London recently?', 'Tem ido a eventos culturais portugueses em Londres?', 'Connects to LusoTown community events'),
    ('sports', 'How do you follow Portuguese football while living in London?', 'Como acompanha o futebol português vivendo em Londres?', 'Football is central to Portuguese culture'),
    ('language', 'Do you speak Portuguese at home or mostly English now?', 'Fala português em casa ou principalmente inglês agora?', 'Language preservation in diaspora'),
    ('holidays', 'How do you celebrate Portuguese holidays like Santos Populares in London?', 'Como celebra as festas portuguesas como os Santos Populares em Londres?', 'Traditional June festivals'),
    ('family', 'Do you visit Portugal often to see family?', 'Visita Portugal frequentemente para ver a família?', 'Connection to homeland'),
    ('work', 'What brings you to London professionally?', 'O que o trouxe profissionalmente para Londres?', 'Professional networking opportunity'),
    ('community', 'How important is staying connected to the Portuguese community here?', 'Que importância tem manter-se ligado à comunidade portuguesa aqui?', 'Community belonging and identity');

-- Function to auto-expire conversations after 7 days without event booking
CREATE OR REPLACE FUNCTION expire_inactive_conversations()
RETURNS void AS $$
BEGIN
    UPDATE public.conversations
    SET is_active = false,
        expires_at = now()
    WHERE is_active = true
    AND created_at < now() - INTERVAL '7 days'
    AND NOT EXISTS (
        SELECT 1 FROM public.event_bookings eb
        WHERE eb.user_id = ANY(participant_ids)
        AND eb.created_at > conversations.created_at
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check message response deadlines
CREATE OR REPLACE FUNCTION check_message_response_deadlines()
RETURNS void AS $$
BEGIN
    -- Mark conversations as at risk if no response in 48 hours
    UPDATE public.conversations
    SET last_activity_at = now()
    WHERE id IN (
        SELECT DISTINCT conversation_id
        FROM public.conversation_messages
        WHERE response_deadline < now()
        AND is_read = false
        AND approval_status = 'approved'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function for AI content filtering
CREATE OR REPLACE FUNCTION ai_content_filter(
    message_content TEXT,
    sender_age INTEGER DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
    result JSONB := '{"blocked": false, "score": 100, "flags": []}'::jsonb;
    flags TEXT[] := '{}';
    safety_score INTEGER := 100;
BEGIN
    -- Check for phone numbers
    IF message_content ~* '\+?[0-9\s\-\(\)]{10,}' THEN
        flags := array_append(flags, 'phone_number');
        safety_score := safety_score - 30;
    END IF;
    
    -- Check for email addresses
    IF message_content ~* '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}' THEN
        flags := array_append(flags, 'email_address');
        safety_score := safety_score - 30;
    END IF;
    
    -- Check for addresses (basic patterns)
    IF message_content ~* '\d+\s+[a-zA-Z\s]+\s+(Street|St|Road|Rd|Avenue|Ave|Lane|Ln)' THEN
        flags := array_append(flags, 'address');
        safety_score := safety_score - 25;
    END IF;
    
    -- Check for social media handles
    IF message_content ~* '@[a-zA-Z0-9_]+|instagram|whatsapp|snapchat|telegram' THEN
        flags := array_append(flags, 'social_media');
        safety_score := safety_score - 20;
    END IF;
    
    -- Portuguese profanity check (basic)
    IF message_content ~* 'merda|caralho|foda|puta|cu\b' THEN
        flags := array_append(flags, 'profanity');
        safety_score := safety_score - 40;
    END IF;
    
    -- English profanity check (basic)
    IF message_content ~* '\b(fuck|shit|bitch|damn|asshole|cunt)\b' THEN
        flags := array_append(flags, 'profanity');
        safety_score := safety_score - 40;
    END IF;
    
    result := jsonb_build_object(
        'blocked', array_length(flags, 1) > 0,
        'score', GREATEST(safety_score, 0),
        'flags', flags
    );
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to auto-moderate messages
CREATE OR REPLACE FUNCTION auto_moderate_message()
RETURNS TRIGGER AS $$
DECLARE
    filter_result JSONB;
    sender_profile RECORD;
    new_user_threshold INTEGER := 10; -- Messages before auto-approval
BEGIN
    -- Get sender profile info
    SELECT message_count, created_at INTO sender_profile
    FROM public.profiles
    WHERE id = NEW.sender_id;
    
    -- Apply AI content filtering
    filter_result := ai_content_filter(NEW.content);
    
    -- Update message with filtering results
    NEW.safety_score := (filter_result->>'score')::INTEGER;
    NEW.flagged_content := filter_result;
    NEW.contains_contact_info := filter_result->'flags' ? 'phone_number' 
        OR filter_result->'flags' ? 'email_address' 
        OR filter_result->'flags' ? 'address'
        OR filter_result->'flags' ? 'social_media';
    
    -- Determine approval status
    IF NEW.safety_score < 70 OR NEW.contains_contact_info THEN
        NEW.approval_status := 'pending';
        NEW.is_blocked := true;
        NEW.blocked_reason := 'Auto-flagged for review';
        
        -- Add to moderation queue
        INSERT INTO public.moderation_queue (
            message_id, conversation_id, sender_id, receiver_id,
            content, flagged_reasons, ai_analysis, priority_level
        ) VALUES (
            NEW.id, NEW.conversation_id, NEW.sender_id, NEW.receiver_id,
            NEW.content, 
            ARRAY(SELECT jsonb_array_elements_text(filter_result->'flags')),
            filter_result,
            CASE WHEN NEW.safety_score < 50 THEN 'high' 
                 WHEN NEW.contains_contact_info THEN 'medium'
                 ELSE 'low' END
        );
    ELSIF sender_profile.message_count < new_user_threshold THEN
        NEW.approval_status := 'pending';
        -- Add to moderation queue with lower priority
        INSERT INTO public.moderation_queue (
            message_id, conversation_id, sender_id, receiver_id,
            content, flagged_reasons, ai_analysis, priority_level
        ) VALUES (
            NEW.id, NEW.conversation_id, NEW.sender_id, NEW.receiver_id,
            NEW.content, '{"new_user"}', filter_result, 'low'
        );
    ELSE
        NEW.approval_status := 'auto_approved';
    END IF;
    
    -- Set response deadline (48 hours)
    NEW.response_deadline := NEW.created_at + INTERVAL '48 hours';
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for auto-moderation
CREATE TRIGGER auto_moderate_message_trigger
    BEFORE INSERT ON public.conversation_messages
    FOR EACH ROW
    EXECUTE FUNCTION auto_moderate_message();

-- Comments for documentation
COMMENT ON TABLE public.conversations IS 'One-on-one conversations between matched users with 7-day expiry';
COMMENT ON TABLE public.conversation_messages IS 'Private messages with TikTok-style approval system and AI filtering';
COMMENT ON TABLE public.moderation_queue IS 'Queue for human moderation of flagged messages';
COMMENT ON TABLE public.age_verification IS 'Age verification system with parent controls for under-21 users';
COMMENT ON TABLE public.conversation_starters IS 'Portuguese cultural conversation prompts';
COMMENT ON TABLE public.user_messaging_stats IS 'User messaging statistics for Community Ambassador system';

