-- User Following System Migration
-- Creates the database structure for following Portuguese-speaking nations and other entities with authentication

-- Table for storing user following relationships
CREATE TABLE IF NOT EXISTS user_following (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  entity_id TEXT NOT NULL, -- Can be any type of entity ID
  entity_type TEXT NOT NULL CHECK (entity_type IN ('person', 'group', 'community', 'event_organizer', 'portuguese_nation')),
  entity_data JSONB NOT NULL DEFAULT '{}', -- Stores the complete entity data
  notifications_enabled BOOLEAN DEFAULT TRUE,
  followed_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_user_following_user_id ON user_following(user_id);
CREATE INDEX idx_user_following_entity_type ON user_following(entity_type);
CREATE INDEX idx_user_following_entity_id ON user_following(entity_id);
CREATE INDEX idx_user_following_active ON user_following(is_active);
CREATE INDEX idx_user_following_notifications ON user_following(notifications_enabled);

-- Composite indexes for common queries
CREATE INDEX idx_user_following_user_entity ON user_following(user_id, entity_id);
CREATE INDEX idx_user_following_user_type ON user_following(user_id, entity_type) WHERE is_active = TRUE;

-- Unique constraint to prevent duplicate follows
CREATE UNIQUE INDEX idx_user_following_unique ON user_following(user_id, entity_id) WHERE is_active = TRUE;

-- Row Level Security (RLS) policies
ALTER TABLE user_following ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own following relationships
CREATE POLICY user_following_select_policy ON user_following
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can only insert their own following relationships
CREATE POLICY user_following_insert_policy ON user_following
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can only update their own following relationships
CREATE POLICY user_following_update_policy ON user_following
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can only delete their own following relationships
CREATE POLICY user_following_delete_policy ON user_following
  FOR DELETE
  USING (auth.uid() = user_id);

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_user_following_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update the updated_at timestamp
CREATE TRIGGER user_following_updated_at_trigger
  BEFORE UPDATE ON user_following
  FOR EACH ROW
  EXECUTE FUNCTION update_user_following_timestamp();

-- Portuguese Nations reference data (for validation and suggestions)
CREATE TABLE IF NOT EXISTS portuguese_nations (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  name_pt TEXT NOT NULL,
  country_code TEXT NOT NULL,
  capital TEXT NOT NULL,
  capital_pt TEXT NOT NULL,
  continent TEXT NOT NULL,
  population BIGINT,
  gdp_usd BIGINT,
  currency_code TEXT NOT NULL,
  flag_emoji TEXT NOT NULL,
  languages TEXT[] DEFAULT ARRAY['Portuguese'],
  cultural_highlights TEXT[] DEFAULT '{}',
  business_sectors TEXT[] DEFAULT '{}',
  london_community_size INTEGER DEFAULT 0,
  trade_volume_gbp BIGINT DEFAULT 0,
  embassy_address TEXT,
  consulate_address TEXT,
  cultural_center TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert Portuguese-speaking nations data
INSERT INTO portuguese_nations (
  id, name, name_pt, country_code, capital, capital_pt, continent,
  population, gdp_usd, currency_code, flag_emoji, languages,
  cultural_highlights, business_sectors, london_community_size,
  trade_volume_gbp, embassy_address, consulate_address, cultural_center
) VALUES 
(
  'nation-portugal',
  'Portugal',
  'Portugal',
  'PT',
  'Lisbon',
  'Lisboa',
  'Europe',
  10300000,
  249900000000,
  'EUR',
  '🇵🇹',
  ARRAY['Portuguese'],
  ARRAY['Fado Music', 'Port Wine', 'Azulejo Tiles', 'Maritime Heritage', 'Pastéis de Nata'],
  ARRAY['Tourism', 'Wine', 'Textiles', 'Technology', 'Renewable Energy'],
  95000,
  2100000000,
  'Embassy of Portugal, 11 Belgrave Square, London SW1X 8PP',
  'Portuguese Consulate General, 1 Grosvenor Place, London SW1X 7HR',
  'Instituto Camões London'
),
(
  'nation-brazil',
  'Brazil',
  'Brasil',
  'BR',
  'Brasília',
  'Brasília',
  'South America',
  215300000,
  2130000000000,
  'BRL',
  '🇧🇷',
  ARRAY['Portuguese'],
  ARRAY['Carnival', 'Samba', 'Capoeira', 'Football', 'Christ the Redeemer'],
  ARRAY['Agriculture', 'Mining', 'Manufacturing', 'Oil & Gas', 'Technology'],
  45000,
  4800000000,
  'Embassy of Brazil, 14-16 Cockspur Street, London SW1Y 5BL',
  'Brazilian Consulate General, 6 St Alban''s Street, London SW1Y 4SQ',
  'Casa do Brasil'
),
(
  'nation-angola',
  'Angola',
  'Angola',
  'AO',
  'Luanda',
  'Luanda',
  'Africa',
  34500000,
  106400000000,
  'AOA',
  '🇦🇴',
  ARRAY['Portuguese'],
  ARRAY['Kizomba', 'Semba', 'Traditional Masks', 'Oil Industry'],
  ARRAY['Oil & Gas', 'Mining', 'Agriculture', 'Construction', 'Telecommunications'],
  18000,
  1200000000,
  'Embassy of Angola, 22 Dorset Street, London W1U 6QY',
  'Angolan Consulate General',
  NULL
),
(
  'nation-mozambique',
  'Mozambique',
  'Moçambique',
  'MZ',
  'Maputo',
  'Maputo',
  'Africa',
  32400000,
  16900000000,
  'MZN',
  '🇲🇿',
  ARRAY['Portuguese'],
  ARRAY['Marrabenta Music', 'Traditional Textiles', 'Island Culture', 'Seafood Cuisine'],
  ARRAY['Agriculture', 'Natural Gas', 'Mining', 'Tourism', 'Fishing'],
  12000,
  450000000,
  'High Commission of Mozambique, 21 Fitzroy Square, London W1T 6EL',
  'Mozambican Consulate General',
  NULL
),
(
  'nation-cape-verde',
  'Cape Verde',
  'Cabo Verde',
  'CV',
  'Praia',
  'Praia',
  'Africa',
  563000,
  2100000000,
  'CVE',
  '🇨🇻',
  ARRAY['Portuguese', 'Cape Verdean Creole'],
  ARRAY['Morna Music', 'Funaná Dance', 'Cesária Évora Legacy', 'Island Culture'],
  ARRAY['Tourism', 'Fishing', 'Renewable Energy', 'Services', 'Remittances'],
  8500,
  85000000,
  'Embassy of Cape Verde, 4 Park Place, London SW1A 1LP',
  'Cape Verdean Consulate',
  NULL
),
(
  'nation-guinea-bissau',
  'Guinea-Bissau',
  'Guiné-Bissau',
  'GW',
  'Bissau',
  'Bissau',
  'Africa',
  2000000,
  1600000000,
  'XOF',
  '🇬🇼',
  ARRAY['Portuguese'],
  ARRAY['Gumbe Music', 'Traditional Masks', 'Rice Culture', 'Bijagós Islands'],
  ARRAY['Agriculture', 'Fishing', 'Cashew Nuts', 'Forestry'],
  3200,
  25000000,
  'Embassy of Guinea-Bissau, 57-59 Welbeck Street, London W1G 9YJ',
  'Guinea-Bissau Consulate',
  NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_pt = EXCLUDED.name_pt,
  country_code = EXCLUDED.country_code,
  capital = EXCLUDED.capital,
  capital_pt = EXCLUDED.capital_pt,
  continent = EXCLUDED.continent,
  population = EXCLUDED.population,
  gdp_usd = EXCLUDED.gdp_usd,
  currency_code = EXCLUDED.currency_code,
  flag_emoji = EXCLUDED.flag_emoji,
  languages = EXCLUDED.languages,
  cultural_highlights = EXCLUDED.cultural_highlights,
  business_sectors = EXCLUDED.business_sectors,
  london_community_size = EXCLUDED.london_community_size,
  trade_volume_gbp = EXCLUDED.trade_volume_gbp,
  embassy_address = EXCLUDED.embassy_address,
  consulate_address = EXCLUDED.consulate_address,
  cultural_center = EXCLUDED.cultural_center,
  updated_at = NOW();

-- Function to get user following stats
CREATE OR REPLACE FUNCTION get_user_following_stats(user_uuid UUID)
RETURNS JSONB AS $$
DECLARE
  stats JSONB;
BEGIN
  SELECT jsonb_build_object(
    'total', COUNT(*),
    'people', COUNT(*) FILTER (WHERE entity_type = 'person'),
    'groups', COUNT(*) FILTER (WHERE entity_type = 'group'),
    'communities', COUNT(*) FILTER (WHERE entity_type = 'community'),
    'event_organizers', COUNT(*) FILTER (WHERE entity_type = 'event_organizer'),
    'portuguese_nations', COUNT(*) FILTER (WHERE entity_type = 'portuguese_nation'),
    'notifications_enabled', COUNT(*) FILTER (WHERE notifications_enabled = TRUE)
  )
  INTO stats
  FROM user_following 
  WHERE user_id = user_uuid AND is_active = TRUE;
  
  RETURN COALESCE(stats, '{"total": 0, "people": 0, "groups": 0, "communities": 0, "event_organizers": 0, "portuguese_nations": 0, "notifications_enabled": 0}'::jsonb);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get Portuguese nation suggestions for following
CREATE OR REPLACE FUNCTION get_portuguese_nation_suggestions(user_uuid UUID DEFAULT NULL, limit_count INTEGER DEFAULT 10)
RETURNS JSONB AS $$
DECLARE
  suggestions JSONB;
BEGIN
  WITH user_following_nations AS (
    SELECT entity_id 
    FROM user_following 
    WHERE user_id = COALESCE(user_uuid, auth.uid()) 
      AND entity_type = 'portuguese_nation' 
      AND is_active = TRUE
  ),
  nation_suggestions AS (
    SELECT 
      pn.id,
      'portuguese_nation' as type,
      pn.name,
      pn.name AS title,
      CASE 
        WHEN pn.id = 'nation-portugal' THEN 'Follow for cultural events, business opportunities, and Portuguese community updates in London'
        WHEN pn.id = 'nation-brazil' THEN 'Connect with Brazilian culture, Carnival events, and business opportunities in London'
        WHEN pn.id = 'nation-angola' THEN 'Discover Angolan culture, music, and business opportunities in London'
        WHEN pn.id = 'nation-mozambique' THEN 'Connect with Mozambican culture and opportunities in London'
        WHEN pn.id = 'nation-cape-verde' THEN 'Explore Cape Verdean culture, morna music, and opportunities in London'
        WHEN pn.id = 'nation-guinea-bissau' THEN 'Discover Guinea-Bissau culture and community in London'
        ELSE 'Connect with ' || pn.name || ' culture and community in London'
      END AS description,
      '/images/flags/' || LOWER(pn.country_code) || '.png' AS imageUrl,
      pn.continent AS location,
      pn.london_community_size AS followers,
      TRUE AS isVerified,
      pn.country_code AS countryCode,
      pn.capital,
      'Portuguese' AS language,
      pn.currency_code AS currency,
      pn.cultural_highlights AS culturalFocus,
      CASE 
        WHEN pn.id = 'nation-portugal' THEN 12
        WHEN pn.id = 'nation-brazil' THEN 8
        WHEN pn.id = 'nation-angola' THEN 4
        WHEN pn.id = 'nation-mozambique' THEN 3
        WHEN pn.id = 'nation-cape-verde' THEN 2
        WHEN pn.id = 'nation-guinea-bissau' THEN 1
        ELSE 1
      END AS upcomingEvents,
      CASE 
        WHEN pn.id = 'nation-portugal' THEN 28
        WHEN pn.id = 'nation-brazil' THEN 15
        WHEN pn.id = 'nation-angola' THEN 8
        WHEN pn.id = 'nation-mozambique' THEN 5
        WHEN pn.id = 'nation-cape-verde' THEN 3
        WHEN pn.id = 'nation-guinea-bissau' THEN 2
        ELSE 2
      END AS businessOpportunities
    FROM portuguese_nations pn
    LEFT JOIN user_following_nations ufn ON pn.id = ufn.entity_id
    WHERE pn.is_active = TRUE 
      AND ufn.entity_id IS NULL -- Exclude nations already followed
    ORDER BY pn.london_community_size DESC
    LIMIT limit_count
  )
  SELECT jsonb_agg(
    jsonb_build_object(
      'id', id,
      'type', type,
      'name', name,
      'title', title,
      'description', description,
      'imageUrl', imageUrl,
      'location', location,
      'followers', followers,
      'isVerified', isVerified,
      'countryCode', countryCode,
      'capital', capital,
      'language', language,
      'currency', currency,
      'culturalFocus', culturalFocus,
      'upcomingEvents', upcomingEvents,
      'businessOpportunities', businessOpportunities
    )
  )
  INTO suggestions
  FROM nation_suggestions;
  
  RETURN COALESCE(suggestions, '[]'::jsonb);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create indexes for the portuguese_nations table
CREATE INDEX IF NOT EXISTS idx_portuguese_nations_active ON portuguese_nations(is_active);
CREATE INDEX IF NOT EXISTS idx_portuguese_nations_continent ON portuguese_nations(continent);
CREATE INDEX IF NOT EXISTS idx_portuguese_nations_community_size ON portuguese_nations(london_community_size DESC);

-- Enable RLS on portuguese_nations (public read access)
ALTER TABLE portuguese_nations ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read active Portuguese nations data
CREATE POLICY portuguese_nations_select_policy ON portuguese_nations
  FOR SELECT
  USING (is_active = TRUE);

-- Grant permissions
GRANT SELECT ON portuguese_nations TO authenticated, anon;
GRANT ALL ON user_following TO authenticated;
GRANT EXECUTE ON FUNCTION get_user_following_stats(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION get_portuguese_nation_suggestions(UUID, INTEGER) TO authenticated, anon;

-- Comments for documentation
COMMENT ON TABLE user_following IS 'Stores user following relationships for all types of entities including Portuguese-speaking nations';
COMMENT ON TABLE portuguese_nations IS 'Reference data for Portuguese-speaking nations with cultural and economic information';
COMMENT ON FUNCTION get_user_following_stats(UUID) IS 'Returns comprehensive following statistics for a user';
COMMENT ON FUNCTION get_portuguese_nation_suggestions(UUID, INTEGER) IS 'Returns suggested Portuguese nations for users to follow';

-- Migration completed successfully
-- The following system now supports:
-- 1. Authenticated user following with database persistence
-- 2. Portuguese-speaking nations as followable entities
-- 3. Clear UX benefits through structured data
-- 4. Row-level security for data protection
-- 5. Performance optimizations with proper indexing