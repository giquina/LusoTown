-- LusoTown Ad Revenue System Database Schema
-- Portuguese-focused ad monetization with geographic targeting

-- Ad networks configuration table
CREATE TABLE IF NOT EXISTS public.ad_networks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    type VARCHAR(50) NOT NULL CHECK (type IN ('google_adsense', 'ezoic', 'propeller', 'custom', 'lusotown_promo')),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'testing')),
    
    -- Configuration settings
    publisher_id VARCHAR(200),
    site_id VARCHAR(200),
    api_key TEXT,
    custom_config JSONB DEFAULT '{}'::jsonb,
    
    -- Geographic targeting
    target_countries TEXT[] DEFAULT ARRAY['PT', 'BR', 'GB', 'US', 'CA'],
    target_languages TEXT[] DEFAULT ARRAY['pt', 'en'],
    
    -- Performance settings
    priority INTEGER DEFAULT 1,
    fill_rate DECIMAL(5,2) DEFAULT 0.00,
    average_cpm DECIMAL(10,2) DEFAULT 0.00,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ad campaigns table for tracking promotional campaigns
CREATE TABLE IF NOT EXISTS public.ad_campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    network_id UUID REFERENCES public.ad_networks(id) ON DELETE CASCADE,
    
    -- Campaign details
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    campaign_type VARCHAR(50) NOT NULL CHECK (campaign_type IN ('video_preroll', 'video_midroll', 'banner_overlay', 'display_banner', 'lusotown_promo')),
    
    -- Content details
    title_en VARCHAR(200),
    title_pt VARCHAR(200),
    description_en TEXT,
    description_pt TEXT,
    creative_url TEXT,
    click_url TEXT,
    
    -- Targeting settings
    target_audience VARCHAR(50) DEFAULT 'portuguese_speakers',
    target_countries TEXT[] DEFAULT ARRAY['PT', 'BR', 'GB'],
    target_age_min INTEGER DEFAULT 18,
    target_age_max INTEGER DEFAULT 65,
    target_interests TEXT[],
    
    -- Scheduling
    start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    end_date TIMESTAMP WITH TIME ZONE,
    daily_budget DECIMAL(10,2),
    total_budget DECIMAL(10,2),
    
    -- Performance metrics
    impressions_goal INTEGER DEFAULT 0,
    clicks_goal INTEGER DEFAULT 0,
    current_impressions INTEGER DEFAULT 0,
    current_clicks INTEGER DEFAULT 0,
    current_spend DECIMAL(10,2) DEFAULT 0.00,
    
    -- Status
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('draft', 'active', 'paused', 'completed', 'cancelled')),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ad impressions tracking table
CREATE TABLE IF NOT EXISTS public.ad_impressions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_id UUID REFERENCES public.ad_campaigns(id) ON DELETE CASCADE,
    network_id UUID REFERENCES public.ad_networks(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    
    -- Context information
    stream_id UUID, -- References streams table if applicable
    page_url TEXT,
    ad_position VARCHAR(50) CHECK (ad_position IN ('preroll', 'midroll', 'postroll', 'banner_top', 'banner_bottom', 'overlay')),
    
    -- Geographic and device info
    country_code VARCHAR(2),
    region VARCHAR(100),
    city VARCHAR(100),
    device_type VARCHAR(20) CHECK (device_type IN ('desktop', 'mobile', 'tablet')),
    user_agent TEXT,
    ip_address INET,
    
    -- Performance metrics
    impression_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    view_duration_seconds INTEGER DEFAULT 0,
    was_clicked BOOLEAN DEFAULT FALSE,
    was_completed BOOLEAN DEFAULT FALSE, -- For video ads
    
    -- Revenue data
    cpm_rate DECIMAL(10,4) DEFAULT 0.0000,
    revenue_amount DECIMAL(10,4) DEFAULT 0.0000,
    currency VARCHAR(3) DEFAULT 'GBP',
    
    -- Portuguese community context
    cultural_context VARCHAR(50), -- 'portugal', 'brazil', 'diaspora', 'uk_portuguese'
    language_preference VARCHAR(2) DEFAULT 'pt',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ad clicks tracking table
CREATE TABLE IF NOT EXISTS public.ad_clicks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    impression_id UUID REFERENCES public.ad_impressions(id) ON DELETE CASCADE,
    campaign_id UUID REFERENCES public.ad_campaigns(id) ON DELETE CASCADE,
    network_id UUID REFERENCES public.ad_networks(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    
    -- Click details
    click_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    click_url TEXT,
    conversion_tracked BOOLEAN DEFAULT FALSE,
    
    -- Revenue data
    cpc_rate DECIMAL(10,4) DEFAULT 0.0000,
    revenue_amount DECIMAL(10,4) DEFAULT 0.0000,
    currency VARCHAR(3) DEFAULT 'GBP',
    
    -- Geographic context
    country_code VARCHAR(2),
    cultural_context VARCHAR(50),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Daily revenue aggregation table for performance
CREATE TABLE IF NOT EXISTS public.ad_revenue_daily (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL,
    network_id UUID REFERENCES public.ad_networks(id) ON DELETE CASCADE,
    campaign_id UUID REFERENCES public.ad_campaigns(id) ON DELETE CASCADE,
    
    -- Aggregated metrics
    total_impressions INTEGER DEFAULT 0,
    total_clicks INTEGER DEFAULT 0,
    total_revenue DECIMAL(10,2) DEFAULT 0.00,
    average_cpm DECIMAL(10,4) DEFAULT 0.0000,
    average_cpc DECIMAL(10,4) DEFAULT 0.0000,
    click_through_rate DECIMAL(5,4) DEFAULT 0.0000,
    
    -- Geographic breakdown
    portugal_impressions INTEGER DEFAULT 0,
    brazil_impressions INTEGER DEFAULT 0,
    uk_impressions INTEGER DEFAULT 0,
    other_impressions INTEGER DEFAULT 0,
    
    portugal_revenue DECIMAL(10,2) DEFAULT 0.00,
    brazil_revenue DECIMAL(10,2) DEFAULT 0.00,
    uk_revenue DECIMAL(10,2) DEFAULT 0.00,
    other_revenue DECIMAL(10,2) DEFAULT 0.00,
    
    -- Device breakdown
    desktop_impressions INTEGER DEFAULT 0,
    mobile_impressions INTEGER DEFAULT 0,
    tablet_impressions INTEGER DEFAULT 0,
    
    -- Cultural context breakdown
    diaspora_impressions INTEGER DEFAULT 0,
    native_portuguese_impressions INTEGER DEFAULT 0,
    
    currency VARCHAR(3) DEFAULT 'GBP',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(date, network_id, campaign_id)
);

-- Ad inventory table for pre-scheduled ads
CREATE TABLE IF NOT EXISTS public.ad_inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_id UUID REFERENCES public.ad_campaigns(id) ON DELETE CASCADE,
    
    -- Content scheduling
    content_type VARCHAR(50) CHECK (content_type IN ('stream', 'vod', 'page')),
    content_id UUID, -- stream_id or page identifier
    scheduled_time TIMESTAMP WITH TIME ZONE,
    
    -- Ad slot configuration
    ad_position VARCHAR(50) CHECK (ad_position IN ('preroll', 'midroll', 'postroll', 'banner')),
    duration_seconds INTEGER DEFAULT 30,
    max_impressions INTEGER DEFAULT 1000,
    current_impressions INTEGER DEFAULT 0,
    
    -- Targeting rules
    target_rules JSONB DEFAULT '{}'::jsonb,
    fallback_campaign_id UUID REFERENCES public.ad_campaigns(id),
    
    status VARCHAR(20) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'active', 'completed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_ad_impressions_campaign ON ad_impressions(campaign_id);
CREATE INDEX IF NOT EXISTS idx_ad_impressions_user ON ad_impressions(user_id);
CREATE INDEX IF NOT EXISTS idx_ad_impressions_time ON ad_impressions(impression_time);
CREATE INDEX IF NOT EXISTS idx_ad_impressions_country ON ad_impressions(country_code);
CREATE INDEX IF NOT EXISTS idx_ad_impressions_cultural ON ad_impressions(cultural_context);

CREATE INDEX IF NOT EXISTS idx_ad_clicks_impression ON ad_clicks(impression_id);
CREATE INDEX IF NOT EXISTS idx_ad_clicks_campaign ON ad_clicks(campaign_id);
CREATE INDEX IF NOT EXISTS idx_ad_clicks_time ON ad_clicks(click_time);

CREATE INDEX IF NOT EXISTS idx_ad_revenue_daily_date ON ad_revenue_daily(date);
CREATE INDEX IF NOT EXISTS idx_ad_revenue_daily_network ON ad_revenue_daily(network_id);
CREATE INDEX IF NOT EXISTS idx_ad_revenue_daily_campaign ON ad_revenue_daily(campaign_id);

CREATE INDEX IF NOT EXISTS idx_ad_inventory_content ON ad_inventory(content_type, content_id);
CREATE INDEX IF NOT EXISTS idx_ad_inventory_scheduled ON ad_inventory(scheduled_time);

-- Create revenue calculation function
CREATE OR REPLACE FUNCTION calculate_daily_ad_revenue(target_date DATE)
RETURNS TABLE(
    network_name VARCHAR,
    campaign_name VARCHAR,
    total_impressions BIGINT,
    total_clicks BIGINT,
    total_revenue NUMERIC,
    ctr NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        an.name as network_name,
        ac.name as campaign_name,
        COUNT(ai.id) as total_impressions,
        COUNT(acl.id) as total_clicks,
        COALESCE(SUM(ai.revenue_amount + COALESCE(acl.revenue_amount, 0)), 0) as total_revenue,
        CASE 
            WHEN COUNT(ai.id) > 0 THEN ROUND((COUNT(acl.id)::NUMERIC / COUNT(ai.id)::NUMERIC) * 100, 4)
            ELSE 0
        END as ctr
    FROM ad_impressions ai
    LEFT JOIN ad_clicks acl ON ai.id = acl.impression_id
    JOIN ad_campaigns ac ON ai.campaign_id = ac.id
    JOIN ad_networks an ON ai.network_id = an.id
    WHERE DATE(ai.impression_time) = target_date
    GROUP BY an.name, ac.name
    ORDER BY total_revenue DESC;
END;
$$ LANGUAGE plpgsql;

-- Create function to get top performing Portuguese content
CREATE OR REPLACE FUNCTION get_portuguese_ad_performance(
    start_date DATE,
    end_date DATE
)
RETURNS TABLE(
    cultural_context VARCHAR,
    country_code VARCHAR,
    impressions BIGINT,
    clicks BIGINT,
    revenue NUMERIC,
    avg_cpm NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        ai.cultural_context,
        ai.country_code,
        COUNT(ai.id) as impressions,
        COUNT(acl.id) as clicks,
        COALESCE(SUM(ai.revenue_amount + COALESCE(acl.revenue_amount, 0)), 0) as revenue,
        CASE 
            WHEN COUNT(ai.id) > 0 THEN ROUND(AVG(ai.cpm_rate), 4)
            ELSE 0
        END as avg_cpm
    FROM ad_impressions ai
    LEFT JOIN ad_clicks acl ON ai.id = acl.impression_id
    WHERE DATE(ai.impression_time) BETWEEN start_date AND end_date
        AND ai.cultural_context IN ('portugal', 'brazil', 'diaspora', 'uk_portuguese')
    GROUP BY ai.cultural_context, ai.country_code
    ORDER BY revenue DESC;
END;
$$ LANGUAGE plpgsql;

-- Enable RLS on all tables
ALTER TABLE ad_networks ENABLE ROW LEVEL SECURITY;
ALTER TABLE ad_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE ad_impressions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ad_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE ad_revenue_daily ENABLE ROW LEVEL SECURITY;
ALTER TABLE ad_inventory ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for admin access
CREATE POLICY "Admin can manage ad networks" ON ad_networks
    FOR ALL TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND user_type = 'admin'
        )
    );

CREATE POLICY "Admin can manage ad campaigns" ON ad_campaigns
    FOR ALL TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND user_type = 'admin'
        )
    );

-- Allow public reading of active campaigns for ad serving
CREATE POLICY "Public can view active campaigns" ON ad_campaigns
    FOR SELECT TO public
    USING (status = 'active' AND start_date <= NOW() AND (end_date IS NULL OR end_date >= NOW()));

-- Impression tracking policies (public for ad serving)
CREATE POLICY "Anyone can create impressions" ON ad_impressions
    FOR INSERT TO public
    WITH CHECK (true);

CREATE POLICY "Admin can view all impressions" ON ad_impressions
    FOR SELECT TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND user_type = 'admin'
        )
    );

-- Click tracking policies (public for ad serving)
CREATE POLICY "Anyone can create clicks" ON ad_clicks
    FOR INSERT TO public
    WITH CHECK (true);

CREATE POLICY "Admin can view all clicks" ON ad_clicks
    FOR SELECT TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND user_type = 'admin'
        )
    );

-- Revenue data policies (admin only)
CREATE POLICY "Admin can view revenue data" ON ad_revenue_daily
    FOR ALL TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND user_type = 'admin'
        )
    );

-- Inventory policies (admin only)
CREATE POLICY "Admin can manage inventory" ON ad_inventory
    FOR ALL TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND user_type = 'admin'
        )
    );

-- Insert default ad networks for LusoTown
INSERT INTO ad_networks (name, type, target_countries, target_languages, priority, status) VALUES
('Google AdSense', 'google_adsense', ARRAY['PT', 'BR', 'GB', 'US', 'CA'], ARRAY['pt', 'en'], 1, 'active'),
('Ezoic', 'ezoic', ARRAY['PT', 'BR', 'GB', 'US'], ARRAY['pt', 'en'], 2, 'inactive'),
('Propeller Ads', 'propeller', ARRAY['PT', 'BR', 'GB', 'US'], ARRAY['pt', 'en'], 3, 'inactive'),
('LusoTown Promos', 'lusotown_promo', ARRAY['PT', 'BR', 'GB', 'US', 'CA', 'FR', 'DE'], ARRAY['pt', 'en'], 999, 'active');

-- Insert default LusoTown promotional campaigns
INSERT INTO ad_campaigns (
    network_id, 
    name, 
    slug, 
    campaign_type, 
    title_en, 
    title_pt, 
    description_en, 
    description_pt,
    target_audience,
    status
) VALUES
(
    (SELECT id FROM ad_networks WHERE name = 'LusoTown Promos'),
    'Portuguese Community Membership',
    'portuguese-membership-promo',
    'video_preroll',
    'Join the Portuguese Community in London',
    'Junte-se à Comunidade Portuguesa em Londres',
    'Connect with Portuguese speakers, discover events, and find services tailored for you.',
    'Conecte-se com falantes de português, descubra eventos e encontre serviços pensados para si.',
    'portuguese_speakers',
    'active'
),
(
    (SELECT id FROM ad_networks WHERE name = 'LusoTown Promos'),
    'Premium Transport Services',
    'premium-transport-promo',
    'banner_overlay',
    'Premium Portuguese-Speaking Chauffeur Service',
    'Serviço Premium de Motorista Falante de Português',
    'SIA-licensed chauffeurs who speak Portuguese. Book luxury transport with cultural comfort.',
    'Motoristas licenciados SIA que falam português. Reserve transporte de luxo com conforto cultural.',
    'portuguese_speakers',
    'active'
),
(
    (SELECT id FROM ad_networks WHERE name = 'LusoTown Promos'),
    'Cultural Events Discovery',
    'cultural-events-promo',
    'display_banner',
    'Discover Portuguese Cultural Events',
    'Descubra Eventos Culturais Portugueses',
    'From fado nights to Portuguese business networking - find your community.',
    'De noites de fado a networking empresarial português - encontre a sua comunidade.',
    'portuguese_speakers',
    'active'
);

-- Update triggers for updated_at columns
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_ad_networks_updated_at BEFORE UPDATE ON ad_networks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_ad_campaigns_updated_at BEFORE UPDATE ON ad_campaigns FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();