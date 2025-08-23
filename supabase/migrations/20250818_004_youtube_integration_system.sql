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
('PLLusoBusiness', 'LusoTown: Negócios e Empreendedorismo', 'Histórias de sucesso empresarial da comunidade de falantes de português', 'business', 'universal', 'public'),
('PLLusoMusic', 'LusoTown: Música e Fado', 'A alma portuguesa através da música e do Fado', 'music', 'portugal', 'public'),
('PLLusoGastronomy', 'LusoTown: Sabores de Portugal', 'Culinária portuguesa autêntica em Londres', 'gastronomy', 'portugal', 'public');

-- ============================================================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================================================

COMMENT ON TABLE public.youtube_videos IS 'Central repository for all LusoTown YouTube videos with Portuguese cultural metadata and performance tracking';
COMMENT ON TABLE public.youtube_playlists IS 'YouTube playlists organized by Portuguese cultural categories and themes';
COMMENT ON TABLE public.member_spotlights IS 'Member spotlight video system showcasing Portuguese-speaking community success stories and cultural preservation';
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
-- 6. Advanced analytics tracking Portuguese-speaking community engagement
-- 7. Cultural authenticity scoring and Portuguese heritage preservation focus
-- 8. Full integration with existing LusoTown events and member systems