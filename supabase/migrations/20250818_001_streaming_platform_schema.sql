-- LusoTown Streaming Platform Database Schema
-- Phase 1: Core Streaming Infrastructure
-- Created: 2025-08-18

-- ============================================================================
-- STREAMING CORE TABLES
-- ============================================================================

-- Stream categories for Portuguese-focused content
CREATE TABLE public.stream_categories (
    id uuid default uuid_generate_v4() primary key,
    name_pt varchar(100) not null,
    name_en varchar(100) not null,
    slug varchar(50) unique not null,
    description_pt text,
    description_en text,
    icon varchar(50),
    portuguese_focused boolean default false,
    cultural_context varchar(100), -- 'brasil', 'portugal', 'africa', 'diaspora', 'universal'
    sort_order integer default 0,
    is_active boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Core streams table
CREATE TABLE public.streams (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.profiles(id) on delete cascade not null,
    title varchar(255) not null,
    description text,
    stream_key varchar(50) unique not null,
    rtmp_url varchar(255),
    playback_url varchar(255),
    thumbnail_url varchar(500),
    
    -- Stream status and metadata
    is_live boolean default false,
    is_featured boolean default false,
    is_premium boolean default false,
    
    -- Language and cultural context
    language varchar(10) default 'pt' check (language in ('pt', 'en', 'pt-BR', 'pt-PT')),
    cultural_region varchar(50) check (cultural_region in ('brasil', 'portugal', 'africa', 'diaspora', 'universal')),
    
    -- Categories and tags
    category_id uuid references public.stream_categories(id),
    tags text[], -- Array of tags for searchability
    
    -- Viewer metrics
    viewer_count integer default 0,
    total_viewers integer default 0,
    peak_viewers integer default 0,
    total_watch_time integer default 0, -- in seconds
    
    -- Timestamps
    started_at timestamp with time zone,
    ended_at timestamp with time zone,
    scheduled_at timestamp with time zone,
    
    -- Stream configuration
    max_viewers integer,
    allow_chat boolean default true,
    require_subscription boolean default false,
    age_restriction integer, -- minimum age
    
    -- Status tracking
    status varchar(20) default 'scheduled' check (status in ('scheduled', 'live', 'ended', 'cancelled', 'archived')),
    
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Viewer sessions for analytics
CREATE TABLE public.viewer_sessions (
    id uuid default uuid_generate_v4() primary key,
    stream_id uuid references public.streams(id) on delete cascade not null,
    user_id uuid references public.profiles(id) on delete cascade,
    
    -- Session tracking
    session_token varchar(100) unique,
    ip_address inet,
    user_agent text,
    
    -- Geographic data
    country varchar(2),
    region varchar(100),
    city varchar(100),
    
    -- Engagement metrics
    joined_at timestamp with time zone default now() not null,
    left_at timestamp with time zone,
    total_watch_time integer default 0, -- in seconds
    chat_messages_sent integer default 0,
    
    -- Quality metrics
    buffering_events integer default 0,
    quality_switches integer default 0,
    average_bitrate integer,
    
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Stream authentication tokens
CREATE TABLE public.stream_auth_tokens (
    id uuid default uuid_generate_v4() primary key,
    stream_id uuid references public.streams(id) on delete cascade not null,
    token varchar(255) unique not null,
    token_type varchar(20) not null check (token_type in ('rtmp', 'playback', 'webhook')),
    expires_at timestamp with time zone not null,
    is_active boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Stream reports for content moderation
CREATE TABLE public.stream_reports (
    id uuid default uuid_generate_v4() primary key,
    stream_id uuid references public.streams(id) on delete cascade not null,
    reported_by uuid references public.profiles(id) on delete cascade not null,
    report_type varchar(50) not null check (report_type in ('inappropriate_content', 'harassment', 'spam', 'copyright', 'cultural_insensitive', 'other')),
    description text not null,
    status varchar(20) default 'pending' check (status in ('pending', 'reviewing', 'resolved', 'dismissed')),
    reviewed_by uuid references public.profiles(id),
    reviewed_at timestamp with time zone,
    resolution_notes text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- User streaming permissions and settings
CREATE TABLE public.user_streaming_settings (
    user_id uuid references public.profiles(id) on delete cascade primary key,
    
    -- Streaming permissions
    can_stream boolean default false,
    verified_streamer boolean default false,
    max_concurrent_streams integer default 1,
    max_stream_duration integer default 14400, -- 4 hours in seconds
    
    -- Rate limiting
    daily_stream_limit integer default 5,
    streams_created_today integer default 0,
    last_stream_date date,
    
    -- Cultural preferences
    preferred_language varchar(10) default 'pt',
    cultural_background varchar(50),
    target_audience text[],
    
    -- Streaming quality settings
    max_bitrate integer default 3000,
    max_resolution varchar(20) default '1080p',
    enable_transcoding boolean default true,
    
    -- Monetization settings
    donations_enabled boolean default false,
    subscriptions_enabled boolean default false,
    min_donation_amount decimal(10,2) default 1.00,
    
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ============================================================================
-- PORTUGUESE EMOTES AND CULTURAL FEATURES
-- ============================================================================

-- Portuguese-specific emotes for chat
CREATE TABLE public.portuguese_emotes (
    id uuid default uuid_generate_v4() primary key,
    code varchar(50) unique not null, -- :saudade:, :festa:, :futebol:
    name_pt varchar(100) not null,
    name_en varchar(100) not null,
    image_url varchar(500) not null,
    cultural_context varchar(100) not null,
    regions varchar(50)[] not null, -- ['brazil', 'portugal', 'africa', 'diaspora']
    category varchar(50) not null check (category in ('emotion', 'culture', 'food', 'sports', 'music', 'celebration')),
    is_premium boolean default false,
    usage_count integer default 0,
    created_by uuid references public.profiles(id),
    is_active boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ============================================================================
-- STORAGE BUCKETS AND POLICIES
-- ============================================================================

-- Add storage buckets for streaming assets
INSERT INTO storage.buckets (id, name, public) VALUES 
    ('stream-thumbnails', 'stream-thumbnails', true),
    ('stream-recordings', 'stream-recordings', false),
    ('portuguese-emotes', 'portuguese-emotes', true);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- Streams indexes
CREATE INDEX idx_streams_user_id ON public.streams(user_id);
CREATE INDEX idx_streams_category_id ON public.streams(category_id);
CREATE INDEX idx_streams_status ON public.streams(status);
CREATE INDEX idx_streams_is_live ON public.streams(is_live) WHERE is_live = true;
CREATE INDEX idx_streams_language ON public.streams(language);
CREATE INDEX idx_streams_cultural_region ON public.streams(cultural_region);
CREATE INDEX idx_streams_created_at ON public.streams(created_at DESC);
CREATE INDEX idx_streams_viewer_count ON public.streams(viewer_count DESC);

-- Viewer sessions indexes
CREATE INDEX idx_viewer_sessions_stream_id ON public.viewer_sessions(stream_id);
CREATE INDEX idx_viewer_sessions_user_id ON public.viewer_sessions(user_id);
CREATE INDEX idx_viewer_sessions_joined_at ON public.viewer_sessions(joined_at);
CREATE INDEX idx_viewer_sessions_country ON public.viewer_sessions(country);

-- Stream categories indexes
CREATE INDEX idx_stream_categories_slug ON public.stream_categories(slug);
CREATE INDEX idx_stream_categories_portuguese_focused ON public.stream_categories(portuguese_focused);

-- Portuguese emotes indexes
CREATE INDEX idx_portuguese_emotes_code ON public.portuguese_emotes(code);
CREATE INDEX idx_portuguese_emotes_category ON public.portuguese_emotes(category);
CREATE INDEX idx_portuguese_emotes_regions ON public.portuguese_emotes USING GIN(regions);

-- ============================================================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE public.stream_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.streams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.viewer_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stream_auth_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stream_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_streaming_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portuguese_emotes ENABLE ROW LEVEL SECURITY;

-- Stream categories policies (public read)
CREATE POLICY "Stream categories are publicly viewable" ON public.stream_categories
    FOR SELECT USING (is_active = true);

-- Streams policies
CREATE POLICY "Streams are publicly viewable" ON public.streams
    FOR SELECT USING (status IN ('live', 'scheduled', 'ended'));

CREATE POLICY "Users can create their own streams" ON public.streams
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own streams" ON public.streams
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own streams" ON public.streams
    FOR DELETE USING (auth.uid() = user_id);

-- Viewer sessions policies
CREATE POLICY "Users can view their own sessions" ON public.viewer_sessions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create viewer sessions" ON public.viewer_sessions
    FOR INSERT WITH CHECK (true); -- Allow anonymous viewers

-- Stream auth tokens policies
CREATE POLICY "Users can view their own stream tokens" ON public.stream_auth_tokens
    FOR SELECT USING (
        stream_id IN (
            SELECT id FROM public.streams WHERE user_id = auth.uid()
        )
    );

-- Stream reports policies
CREATE POLICY "Users can create stream reports" ON public.stream_reports
    FOR INSERT WITH CHECK (auth.uid() = reported_by);

CREATE POLICY "Users can view their own reports" ON public.stream_reports
    FOR SELECT USING (auth.uid() = reported_by);

-- User streaming settings policies
CREATE POLICY "Users can view their own streaming settings" ON public.user_streaming_settings
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own streaming settings" ON public.user_streaming_settings
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own streaming settings" ON public.user_streaming_settings
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Portuguese emotes policies (public read)
CREATE POLICY "Portuguese emotes are publicly viewable" ON public.portuguese_emotes
    FOR SELECT USING (is_active = true);

-- ============================================================================
-- STORAGE POLICIES
-- ============================================================================

-- Stream thumbnails policies
CREATE POLICY "Users can upload their own stream thumbnails"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'stream-thumbnails' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Stream thumbnails are publicly viewable"
ON storage.objects FOR SELECT
USING (bucket_id = 'stream-thumbnails');

CREATE POLICY "Users can update their own stream thumbnails"
ON storage.objects FOR UPDATE
USING (bucket_id = 'stream-thumbnails' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Stream recordings policies (private)
CREATE POLICY "Users can upload their own stream recordings"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'stream-recordings' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own stream recordings"
ON storage.objects FOR SELECT
USING (bucket_id = 'stream-recordings' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Portuguese emotes policies
CREATE POLICY "Portuguese emotes are publicly viewable"
ON storage.objects FOR SELECT
USING (bucket_id = 'portuguese-emotes');

-- ============================================================================
-- FUNCTIONS AND TRIGGERS
-- ============================================================================

-- Trigger for updated_at
CREATE TRIGGER handle_stream_categories_updated_at BEFORE UPDATE ON public.stream_categories
    FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

CREATE TRIGGER handle_streams_updated_at BEFORE UPDATE ON public.streams
    FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

CREATE TRIGGER handle_user_streaming_settings_updated_at BEFORE UPDATE ON public.user_streaming_settings
    FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

-- Function to generate unique stream keys
CREATE OR REPLACE FUNCTION generate_stream_key()
RETURNS trigger AS $$
BEGIN
    -- Generate a unique stream key
    NEW.stream_key = 'sk_' || encode(gen_random_bytes(16), 'hex');
    
    -- Generate RTMP URL (placeholder - will be configured based on media server)
    NEW.rtmp_url = 'rtmp://stream.lusotown.com/live/' || NEW.stream_key;
    
    -- Generate playback URL (placeholder)
    NEW.playback_url = 'https://stream.lusotown.com/live/' || NEW.stream_key || '.m3u8';
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate stream key
CREATE TRIGGER generate_stream_key_trigger
    BEFORE INSERT ON public.streams
    FOR EACH ROW EXECUTE PROCEDURE generate_stream_key();

-- Function to update viewer count and metrics
CREATE OR REPLACE FUNCTION update_stream_metrics()
RETURNS trigger AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        -- Update current viewer count
        UPDATE public.streams 
        SET viewer_count = viewer_count + 1,
            total_viewers = total_viewers + 1
        WHERE id = NEW.stream_id;
        
        -- Update peak viewers if necessary
        UPDATE public.streams 
        SET peak_viewers = GREATEST(peak_viewers, viewer_count)
        WHERE id = NEW.stream_id;
        
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' AND OLD.left_at IS NULL AND NEW.left_at IS NOT NULL THEN
        -- Viewer left the stream
        UPDATE public.streams 
        SET viewer_count = GREATEST(0, viewer_count - 1),
            total_watch_time = total_watch_time + NEW.total_watch_time
        WHERE id = NEW.stream_id;
        
        RETURN NEW;
    END IF;
    
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update stream metrics
CREATE TRIGGER update_stream_metrics_trigger
    AFTER INSERT OR UPDATE ON public.viewer_sessions
    FOR EACH ROW EXECUTE PROCEDURE update_stream_metrics();

-- Function to reset daily stream limits
CREATE OR REPLACE FUNCTION reset_daily_stream_limits()
RETURNS void AS $$
BEGIN
    UPDATE public.user_streaming_settings 
    SET streams_created_today = 0
    WHERE last_stream_date < CURRENT_DATE;
END;
$$ LANGUAGE plpgsql;

-- Function to check stream creation rate limits
CREATE OR REPLACE FUNCTION check_stream_rate_limit()
RETURNS trigger AS $$
DECLARE
    user_settings RECORD;
BEGIN
    -- Get user streaming settings
    SELECT * INTO user_settings 
    FROM public.user_streaming_settings 
    WHERE user_id = NEW.user_id;
    
    -- Create default settings if they don't exist
    IF NOT FOUND THEN
        INSERT INTO public.user_streaming_settings (user_id) 
        VALUES (NEW.user_id);
        RETURN NEW;
    END IF;
    
    -- Reset daily count if it's a new day
    IF user_settings.last_stream_date < CURRENT_DATE THEN
        UPDATE public.user_streaming_settings 
        SET streams_created_today = 0, last_stream_date = CURRENT_DATE
        WHERE user_id = NEW.user_id;
        user_settings.streams_created_today = 0;
    END IF;
    
    -- Check if user can stream
    IF NOT user_settings.can_stream THEN
        RAISE EXCEPTION 'User does not have streaming permissions';
    END IF;
    
    -- Check daily limit
    IF user_settings.streams_created_today >= user_settings.daily_stream_limit THEN
        RAISE EXCEPTION 'Daily stream limit exceeded';
    END IF;
    
    -- Update daily count
    UPDATE public.user_streaming_settings 
    SET streams_created_today = streams_created_today + 1,
        last_stream_date = CURRENT_DATE
    WHERE user_id = NEW.user_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to check rate limits
CREATE TRIGGER check_stream_rate_limit_trigger
    BEFORE INSERT ON public.streams
    FOR EACH ROW EXECUTE PROCEDURE check_stream_rate_limit();

-- ============================================================================
-- SEED DATA FOR PORTUGUESE STREAM CATEGORIES
-- ============================================================================

INSERT INTO public.stream_categories (name_pt, name_en, slug, description_pt, description_en, portuguese_focused, cultural_context, sort_order) VALUES
('Música Portuguesa', 'Portuguese Music', 'musica-portuguesa', 'Fado, música popular, e artistas portugueses', 'Fado, popular music, and Portuguese artists', true, 'universal', 1),
('Culinária', 'Cooking', 'culinaria', 'Receitas tradicionais e moderna gastronomia portuguesa', 'Traditional recipes and modern Portuguese gastronomy', true, 'universal', 2),
('Futebol', 'Football', 'futebol', 'Discussões sobre futebol português e brasileiro', 'Portuguese and Brazilian football discussions', true, 'universal', 3),
('Cultura & Tradições', 'Culture & Traditions', 'cultura-tradicoes', 'Festivais, tradições e património cultural', 'Festivals, traditions and cultural heritage', true, 'universal', 4),
('Língua Portuguesa', 'Portuguese Language', 'lingua-portuguesa', 'Aprendizagem e conversação em português', 'Portuguese language learning and conversation', true, 'universal', 5),
('Negócios', 'Business', 'negocios', 'Empreendedorismo e oportunidades de negócio', 'Entrepreneurship and business opportunities', false, 'universal', 6),
('Tecnologia', 'Technology', 'tecnologia', 'Discussões sobre tecnologia e inovação', 'Technology and innovation discussions', false, 'universal', 7),
('Entretenimento', 'Entertainment', 'entretenimento', 'Entretenimento geral e conversas casuais', 'General entertainment and casual conversations', false, 'universal', 8),
('Educação', 'Education', 'educacao', 'Aulas e conteúdo educativo', 'Educational content and classes', false, 'universal', 9),
('Saúde & Bem-estar', 'Health & Wellness', 'saude-bem-estar', 'Fitness, nutrição e bem-estar mental', 'Fitness, nutrition and mental wellness', false, 'universal', 10);

-- ============================================================================
-- SEED DATA FOR PORTUGUESE EMOTES
-- ============================================================================

INSERT INTO public.portuguese_emotes (code, name_pt, name_en, image_url, cultural_context, regions, category, is_premium) VALUES
(':saudade:', 'Saudade', 'Longing', '/emotes/saudade.png', 'Sentimento português de nostalgia', ARRAY['portugal', 'brazil', 'diaspora'], 'emotion', false),
(':festa:', 'Festa', 'Party', '/emotes/festa.png', 'Celebração e alegria', ARRAY['brazil', 'portugal', 'africa'], 'celebration', false),
(':futebol:', 'Futebol', 'Football', '/emotes/futebol.png', 'Paixão pelo futebol', ARRAY['brazil', 'portugal', 'africa'], 'sports', false),
(':pastelnata:', 'Pastel de Nata', 'Custard Tart', '/emotes/pastelnata.png', 'Doce tradicional português', ARRAY['portugal', 'diaspora'], 'food', false),
(':fado:', 'Fado', 'Fado', '/emotes/fado.png', 'Música tradicional portuguesa', ARRAY['portugal', 'diaspora'], 'music', false),
(':caipirinha:', 'Caipirinha', 'Caipirinha', '/emotes/caipirinha.png', 'Bebida tradicional brasileira', ARRAY['brazil'], 'food', false),
(':carnaval:', 'Carnaval', 'Carnival', '/emotes/carnaval.png', 'Celebração do carnaval', ARRAY['brazil', 'portugal'], 'celebration', false),
(':azulejo:', 'Azulejo', 'Portuguese Tile', '/emotes/azulejo.png', 'Arte tradicional portuguesa', ARRAY['portugal'], 'culture', true),
(':cristo:', 'Cristo Redentor', 'Christ the Redeemer', '/emotes/cristo.png', 'Ícone brasileiro', ARRAY['brazil'], 'culture', false),
(':bacalhau:', 'Bacalhau', 'Codfish', '/emotes/bacalhau.png', 'Prato tradicional português', ARRAY['portugal', 'diaspora'], 'food', false);

-- ============================================================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================================================

COMMENT ON TABLE public.stream_categories IS 'Portuguese-focused streaming categories with bilingual support';
COMMENT ON TABLE public.streams IS 'Core streaming table with Portuguese cultural context and viewer metrics';
COMMENT ON TABLE public.viewer_sessions IS 'Detailed viewer session tracking for analytics and engagement';
COMMENT ON TABLE public.stream_auth_tokens IS 'JWT tokens for stream authentication and authorization';
COMMENT ON TABLE public.stream_reports IS 'Content moderation and community safety reporting';
COMMENT ON TABLE public.user_streaming_settings IS 'User streaming permissions, preferences and rate limiting';
COMMENT ON TABLE public.portuguese_emotes IS 'Cultural emotes specific to Portuguese-speaking communities';

-- ============================================================================
-- FINAL NOTES
-- ============================================================================

-- This migration creates the foundation for LusoTown's streaming platform with:
-- 1. Core streaming infrastructure with Portuguese cultural context
-- 2. Comprehensive user permissions and rate limiting
-- 3. Advanced analytics and viewer tracking
-- 4. Portuguese-specific features (emotes, categories, cultural regions)
-- 5. Content moderation and community safety
-- 6. Scalable architecture for future enhancements