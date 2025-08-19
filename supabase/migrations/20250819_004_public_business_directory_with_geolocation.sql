-- Public Portuguese Business Directory with Geolocation Migration
-- Created: 2025-08-19
-- Enhanced business directory supporting geospatial queries and public submissions

-- =====================================================
-- ENABLE POSTGIS EXTENSION FOR GEOSPATIAL FEATURES
-- =====================================================
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS postgis_topology;

-- =====================================================
-- PORTUGUESE-SPEAKING COUNTRIES REFERENCE TABLE
-- =====================================================
CREATE TABLE portuguese_countries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country_code VARCHAR(3) UNIQUE NOT NULL,
  country_name_en VARCHAR(100) NOT NULL,
  country_name_pt VARCHAR(100) NOT NULL,
  flag_emoji VARCHAR(10) NOT NULL,
  flag_url VARCHAR(500),
  region VARCHAR(50) NOT NULL,
  official_language VARCHAR(50) NOT NULL,
  currency_code VARCHAR(3),
  currency_symbol VARCHAR(5),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- BUSINESS CATEGORIES TABLE
-- =====================================================
CREATE TABLE business_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_key VARCHAR(50) UNIQUE NOT NULL,
  name_en VARCHAR(100) NOT NULL,
  name_pt VARCHAR(100) NOT NULL,
  description_en TEXT,
  description_pt TEXT,
  icon VARCHAR(50),
  color_hex VARCHAR(7),
  parent_category_id UUID REFERENCES business_categories(id),
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- MAIN PORTUGUESE BUSINESSES TABLE WITH GEOLOCATION
-- =====================================================
CREATE TABLE portuguese_businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Basic Business Information
  name VARCHAR(255) NOT NULL,
  name_portuguese VARCHAR(255),
  slug VARCHAR(255) UNIQUE,
  description TEXT NOT NULL,
  description_portuguese TEXT,
  category_id UUID REFERENCES business_categories(id) NOT NULL,
  
  -- Contact & Location Information
  address TEXT NOT NULL,
  postcode VARCHAR(20) NOT NULL,
  city VARCHAR(100) DEFAULT 'London',
  country VARCHAR(100) DEFAULT 'United Kingdom',
  phone VARCHAR(50),
  email VARCHAR(255),
  website VARCHAR(500),
  
  -- Geospatial Data (PostGIS)
  location GEOMETRY(POINT, 4326), -- WGS84 coordinate system
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  
  -- Portuguese Community Details
  owner_name VARCHAR(255) NOT NULL,
  owner_region VARCHAR(50) NOT NULL CHECK (owner_region IN (
    'portugal_mainland', 'portugal_azores', 'portugal_madeira', 'brazil', 
    'angola', 'mozambique', 'cape_verde', 'guinea_bissau', 
    'sao_tome_principe', 'east_timor', 'macau', 'portuguese_diaspora'
  )),
  languages_spoken TEXT[] DEFAULT ARRAY['portuguese', 'english'],
  year_established INTEGER,
  
  -- Business Verification & Status
  verification_status VARCHAR(20) DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  supports_culture BOOLEAN DEFAULT false,
  
  -- Business Hours (JSONB for flexibility)
  opening_hours JSONB,
  
  -- Ratings & Reviews
  rating DECIMAL(3,2) DEFAULT 0.0 CHECK (rating >= 0 AND rating <= 5),
  review_count INTEGER DEFAULT 0,
  
  -- SEO & Discovery
  keywords TEXT[],
  london_area VARCHAR(50) CHECK (london_area IN (
    'central_london', 'south_london', 'north_london', 'east_london', 
    'west_london', 'southeast_london', 'southwest_london', 
    'northeast_london', 'northwest_london'
  )),
  nearby_transport TEXT[],
  
  -- Membership & Community Features
  membership_tier VARCHAR(20) DEFAULT 'basic' CHECK (membership_tier IN ('basic', 'premium', 'platinum')),
  featured_until TIMESTAMP WITH TIME ZONE,
  
  -- Submission tracking
  submitted_by UUID, -- Can be null for anonymous submissions
  submitted_via VARCHAR(50) DEFAULT 'web_form',
  admin_notes TEXT,
  verification_notes TEXT,
  verified_by UUID,
  verified_at TIMESTAMP WITH TIME ZONE,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- BUSINESS VERIFICATION DETAILS TABLE
-- =====================================================
CREATE TABLE business_verification_details (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES portuguese_businesses(id) ON DELETE CASCADE UNIQUE,
  
  -- Verification Documents
  documents_submitted TEXT[] DEFAULT ARRAY[]::TEXT[],
  business_license_verified BOOLEAN DEFAULT false,
  portuguese_connection_verified BOOLEAN DEFAULT false,
  physical_location_verified BOOLEAN DEFAULT false,
  
  -- Community References
  community_references UUID[], -- User IDs who can vouch for this business
  reference_notes TEXT,
  
  -- Verification Process
  verification_started_at TIMESTAMP WITH TIME ZONE,
  verification_completed_at TIMESTAMP WITH TIME ZONE,
  verification_expiry_date TIMESTAMP WITH TIME ZONE,
  reverification_required BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- BUSINESS PHOTOS TABLE
-- =====================================================
CREATE TABLE business_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES portuguese_businesses(id) ON DELETE CASCADE,
  
  -- Photo Details
  photo_url VARCHAR(500) NOT NULL,
  photo_title VARCHAR(255),
  photo_description TEXT,
  photo_type VARCHAR(50) DEFAULT 'general' CHECK (photo_type IN ('logo', 'exterior', 'interior', 'food', 'products', 'general')),
  
  -- Photo Metadata
  is_primary BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  uploaded_by UUID,
  file_size INTEGER,
  mime_type VARCHAR(50),
  
  -- Moderation
  is_approved BOOLEAN DEFAULT false,
  moderated_by UUID,
  moderated_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- BUSINESS REVIEWS TABLE
-- =====================================================
CREATE TABLE business_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES portuguese_businesses(id) ON DELETE CASCADE,
  reviewer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  
  -- Review Content
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255),
  review_text TEXT,
  review_text_pt TEXT, -- Portuguese version if provided
  
  -- Review Categories
  service_rating INTEGER CHECK (service_rating >= 1 AND service_rating <= 5),
  value_rating INTEGER CHECK (value_rating >= 1 AND value_rating <= 5),
  atmosphere_rating INTEGER CHECK (atmosphere_rating >= 1 AND atmosphere_rating <= 5),
  portuguese_authenticity_rating INTEGER CHECK (portuguese_authenticity_rating >= 1 AND portuguese_authenticity_rating <= 5),
  
  -- Review Metadata
  is_verified_purchase BOOLEAN DEFAULT false,
  visit_date DATE,
  reviewer_name VARCHAR(255), -- For anonymous reviews
  reviewer_location VARCHAR(100),
  
  -- Moderation & Status
  is_approved BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'hidden')),
  moderation_notes TEXT,
  moderated_by UUID,
  moderated_at TIMESTAMP WITH TIME ZONE,
  
  -- Engagement
  helpful_count INTEGER DEFAULT 0,
  reported_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- BUSINESS SPECIAL OFFERS TABLE
-- =====================================================
CREATE TABLE business_special_offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES portuguese_businesses(id) ON DELETE CASCADE,
  
  -- Offer Details
  title VARCHAR(255) NOT NULL,
  title_portuguese VARCHAR(255),
  description TEXT NOT NULL,
  description_portuguese TEXT,
  discount_text VARCHAR(100), -- "10% off", "Free appetizer", etc.
  
  -- Offer Terms
  valid_from TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  valid_until TIMESTAMP WITH TIME ZONE NOT NULL,
  membership_required BOOLEAN DEFAULT false,
  min_purchase_amount DECIMAL(10,2),
  max_uses INTEGER,
  current_uses INTEGER DEFAULT 0,
  
  -- Offer Type
  offer_type VARCHAR(50) DEFAULT 'general' CHECK (offer_type IN ('general', 'cultural_event', 'first_time', 'loyalty', 'seasonal')),
  is_special_event_offer BOOLEAN DEFAULT false,
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- BUSINESS CULTURAL EVENTS TABLE
-- =====================================================
CREATE TABLE business_cultural_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES portuguese_businesses(id) ON DELETE CASCADE,
  
  -- Event Details
  title VARCHAR(255) NOT NULL,
  title_portuguese VARCHAR(255),
  description TEXT NOT NULL,
  description_portuguese TEXT,
  
  -- Event Timing
  event_date DATE NOT NULL,
  start_time TIME,
  end_time TIME,
  is_recurring BOOLEAN DEFAULT false,
  recurrence_pattern VARCHAR(100), -- "Every Friday", "Monthly", etc.
  
  -- Event Details
  event_type VARCHAR(50) NOT NULL CHECK (event_type IN ('cultural', 'business', 'social', 'food', 'music', 'educational')),
  price_info VARCHAR(100),
  capacity INTEGER,
  registered_attendees INTEGER DEFAULT 0,
  
  -- Event Status
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  event_status VARCHAR(20) DEFAULT 'scheduled' CHECK (event_status IN ('scheduled', 'in_progress', 'completed', 'cancelled')),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- BUSINESS BADGES TABLE
-- =====================================================
CREATE TABLE business_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES portuguese_businesses(id) ON DELETE CASCADE,
  
  -- Badge Details
  badge_key VARCHAR(100) NOT NULL,
  name_en VARCHAR(100) NOT NULL,
  name_pt VARCHAR(100) NOT NULL,
  description_en TEXT,
  description_pt TEXT,
  icon VARCHAR(50),
  color VARCHAR(50),
  
  -- Badge Metadata
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE,
  awarded_by UUID,
  award_reason TEXT,
  
  is_active BOOLEAN DEFAULT true,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- PUBLIC BUSINESS SUBMISSIONS TABLE (NO AUTH REQUIRED)
-- =====================================================
CREATE TABLE business_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Submission Details
  submission_token VARCHAR(100) UNIQUE NOT NULL, -- For tracking without authentication
  
  -- Basic Business Information (matches main table)
  name VARCHAR(255) NOT NULL,
  name_portuguese VARCHAR(255),
  description TEXT NOT NULL,
  description_portuguese TEXT,
  category VARCHAR(100) NOT NULL, -- Category key for mapping
  
  -- Contact & Location
  address TEXT NOT NULL,
  postcode VARCHAR(20) NOT NULL,
  phone VARCHAR(50),
  email VARCHAR(255),
  website VARCHAR(500),
  
  -- Portuguese Community Details
  owner_name VARCHAR(255) NOT NULL,
  owner_region VARCHAR(50) NOT NULL,
  languages_spoken TEXT[],
  year_established INTEGER,
  
  -- Additional Information
  why_portuguese TEXT, -- Why this business should be in Portuguese directory
  community_connection TEXT, -- How they connect to Portuguese community
  special_offers_info TEXT,
  cultural_events_info TEXT,
  
  -- Submitter Information (Optional - can be anonymous)
  submitter_name VARCHAR(255),
  submitter_email VARCHAR(255),
  submitter_phone VARCHAR(50),
  submitter_relationship VARCHAR(100), -- "Owner", "Customer", "Community Member"
  
  -- Submission Status
  submission_status VARCHAR(20) DEFAULT 'pending' CHECK (submission_status IN ('pending', 'under_review', 'approved', 'rejected', 'duplicate')),
  review_notes TEXT,
  reviewed_by UUID,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  
  -- Conversion to verified business
  business_id UUID REFERENCES portuguese_businesses(id), -- Link when approved and converted
  
  -- Timestamps
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- GEOSPATIAL INDEXES FOR PERFORMANCE
-- =====================================================

-- Primary geospatial index for location-based queries
CREATE INDEX idx_businesses_location_gist ON portuguese_businesses USING GIST (location);

-- Standard B-tree indexes for lat/lng
CREATE INDEX idx_businesses_latitude ON portuguese_businesses (latitude);
CREATE INDEX idx_businesses_longitude ON portuguese_businesses (longitude);

-- Composite index for nearby searches
CREATE INDEX idx_businesses_lat_lng ON portuguese_businesses (latitude, longitude);

-- =====================================================
-- STANDARD INDEXES FOR PERFORMANCE
-- =====================================================

-- Business table indexes
CREATE INDEX idx_businesses_category ON portuguese_businesses (category_id);
CREATE INDEX idx_businesses_verification_status ON portuguese_businesses (verification_status);
CREATE INDEX idx_businesses_london_area ON portuguese_businesses (london_area);
CREATE INDEX idx_businesses_owner_region ON portuguese_businesses (owner_region);
CREATE INDEX idx_businesses_featured ON portuguese_businesses (is_featured, featured_until);
CREATE INDEX idx_businesses_rating ON portuguese_businesses (rating DESC, review_count DESC);
CREATE INDEX idx_businesses_active ON portuguese_businesses (is_active, verification_status);
CREATE INDEX idx_businesses_keywords ON portuguese_businesses USING GIN (keywords);
CREATE INDEX idx_businesses_languages ON portuguese_businesses USING GIN (languages_spoken);
CREATE INDEX idx_businesses_slug ON portuguese_businesses (slug);
CREATE INDEX idx_businesses_postcode ON portuguese_businesses (postcode);

-- Photo indexes
CREATE INDEX idx_business_photos_business_id ON business_photos (business_id);
CREATE INDEX idx_business_photos_primary ON business_photos (business_id, is_primary);
CREATE INDEX idx_business_photos_approved ON business_photos (business_id, is_approved);

-- Review indexes
CREATE INDEX idx_business_reviews_business_id ON business_reviews (business_id);
CREATE INDEX idx_business_reviews_rating ON business_reviews (business_id, rating DESC);
CREATE INDEX idx_business_reviews_approved ON business_reviews (business_id, is_approved);
CREATE INDEX idx_business_reviews_reviewer ON business_reviews (reviewer_id);

-- Offers indexes
CREATE INDEX idx_business_offers_business_id ON business_special_offers (business_id);
CREATE INDEX idx_business_offers_valid ON business_special_offers (business_id, is_active, valid_until);

-- Events indexes
CREATE INDEX idx_business_events_business_id ON business_cultural_events (business_id);
CREATE INDEX idx_business_events_date ON business_cultural_events (event_date, is_active);

-- Submissions indexes
CREATE INDEX idx_business_submissions_status ON business_submissions (submission_status);
CREATE INDEX idx_business_submissions_token ON business_submissions (submission_token);
CREATE INDEX idx_business_submissions_submitted ON business_submissions (submitted_at DESC);

-- =====================================================
-- ROW LEVEL SECURITY POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE portuguese_countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE portuguese_businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_verification_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_special_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_cultural_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_submissions ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- PUBLIC ACCESS POLICIES (NO AUTHENTICATION REQUIRED)
-- =====================================================

-- Countries - Public read access
CREATE POLICY "Countries are publicly viewable" ON portuguese_countries
  FOR SELECT USING (is_active = true);

-- Categories - Public read access
CREATE POLICY "Business categories are publicly viewable" ON business_categories
  FOR SELECT USING (is_active = true);

-- Businesses - Public read access for verified businesses
CREATE POLICY "Verified businesses are publicly viewable" ON portuguese_businesses
  FOR SELECT USING (is_active = true AND verification_status = 'verified');

-- Verification details - Only for business owners and admins
CREATE POLICY "Verification details visible to business owners" ON business_verification_details
  FOR SELECT USING (
    business_id IN (
      SELECT id FROM portuguese_businesses 
      WHERE submitted_by = auth.uid()
    )
  );

-- Photos - Public read access for approved photos
CREATE POLICY "Approved business photos are publicly viewable" ON business_photos
  FOR SELECT USING (
    is_approved = true AND 
    business_id IN (
      SELECT id FROM portuguese_businesses 
      WHERE is_active = true AND verification_status = 'verified'
    )
  );

-- Reviews - Public read access for approved reviews
CREATE POLICY "Approved reviews are publicly viewable" ON business_reviews
  FOR SELECT USING (
    is_approved = true AND status = 'approved' AND
    business_id IN (
      SELECT id FROM portuguese_businesses 
      WHERE is_active = true AND verification_status = 'verified'
    )
  );

-- Special Offers - Public read access for active offers
CREATE POLICY "Active business offers are publicly viewable" ON business_special_offers
  FOR SELECT USING (
    is_active = true AND valid_until > NOW() AND
    business_id IN (
      SELECT id FROM portuguese_businesses 
      WHERE is_active = true AND verification_status = 'verified'
    )
  );

-- Cultural Events - Public read access for active events
CREATE POLICY "Active cultural events are publicly viewable" ON business_cultural_events
  FOR SELECT USING (
    is_active = true AND
    business_id IN (
      SELECT id FROM portuguese_businesses 
      WHERE is_active = true AND verification_status = 'verified'
    )
  );

-- Badges - Public read access for active badges
CREATE POLICY "Active business badges are publicly viewable" ON business_badges
  FOR SELECT USING (
    is_active = true AND
    business_id IN (
      SELECT id FROM portuguese_businesses 
      WHERE is_active = true AND verification_status = 'verified'
    )
  );

-- Public Submissions - Anyone can insert (no auth required)
CREATE POLICY "Anyone can submit businesses for verification" ON business_submissions
  FOR INSERT WITH CHECK (true);

-- Public Submissions - Public read access by token (for status checking)
CREATE POLICY "Submissions viewable by token" ON business_submissions
  FOR SELECT USING (true); -- Controlled by application logic using submission_token

-- =====================================================
-- USER INTERACTION POLICIES (AUTHENTICATED USERS)
-- =====================================================

-- Users can add reviews
CREATE POLICY "Authenticated users can add reviews" ON business_reviews
  FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND auth.uid() = reviewer_id);

-- Users can update their own reviews
CREATE POLICY "Users can update own reviews" ON business_reviews
  FOR UPDATE USING (auth.uid() = reviewer_id);

-- Users can add photos (pending approval)
CREATE POLICY "Authenticated users can upload business photos" ON business_photos
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- =====================================================
-- FUNCTIONS FOR GEOSPATIAL QUERIES
-- =====================================================

-- Function to calculate distance between two points using Haversine formula
CREATE OR REPLACE FUNCTION calculate_distance_km(lat1 DECIMAL, lng1 DECIMAL, lat2 DECIMAL, lng2 DECIMAL)
RETURNS DECIMAL AS $$
DECLARE
  earth_radius DECIMAL := 6371; -- Earth radius in kilometers
  dlat DECIMAL;
  dlng DECIMAL;
  a DECIMAL;
  c DECIMAL;
BEGIN
  dlat := RADIANS(lat2 - lat1);
  dlng := RADIANS(lng2 - lng1);
  
  a := SIN(dlat/2) * SIN(dlat/2) + COS(RADIANS(lat1)) * COS(RADIANS(lat2)) * SIN(dlng/2) * SIN(dlng/2);
  c := 2 * ATAN2(SQRT(a), SQRT(1-a));
  
  RETURN earth_radius * c;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Function to find businesses within radius using PostGIS
CREATE OR REPLACE FUNCTION find_businesses_near_location(
  search_lat DECIMAL,
  search_lng DECIMAL,
  radius_km INTEGER DEFAULT 10,
  limit_count INTEGER DEFAULT 50
)
RETURNS TABLE (
  business_id UUID,
  business_name VARCHAR,
  distance_km DECIMAL,
  latitude DECIMAL,
  longitude DECIMAL,
  rating DECIMAL,
  review_count INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    pb.id,
    pb.name,
    ST_Distance(
      ST_Transform(pb.location, 3857), 
      ST_Transform(ST_SetSRID(ST_MakePoint(search_lng, search_lat), 4326), 3857)
    ) / 1000 AS distance_km,
    pb.latitude,
    pb.longitude,
    pb.rating,
    pb.review_count
  FROM portuguese_businesses pb
  WHERE pb.is_active = true 
    AND pb.verification_status = 'verified'
    AND pb.location IS NOT NULL
    AND ST_DWithin(
      ST_Transform(pb.location, 3857),
      ST_Transform(ST_SetSRID(ST_MakePoint(search_lng, search_lat), 4326), 3857),
      radius_km * 1000
    )
  ORDER BY pb.location <-> ST_SetSRID(ST_MakePoint(search_lng, search_lat), 4326)
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql STABLE;

-- Function to generate business slug
CREATE OR REPLACE FUNCTION generate_business_slug(business_name TEXT)
RETURNS TEXT AS $$
DECLARE
  base_slug TEXT;
  final_slug TEXT;
  counter INTEGER := 0;
BEGIN
  -- Create base slug from name
  base_slug := LOWER(
    REGEXP_REPLACE(
      REGEXP_REPLACE(business_name, '[^a-zA-Z0-9\s]', '', 'g'),
      '\s+', '-', 'g'
    )
  );
  
  final_slug := base_slug;
  
  -- Check for uniqueness and append number if needed
  WHILE EXISTS (SELECT 1 FROM portuguese_businesses WHERE slug = final_slug) LOOP
    counter := counter + 1;
    final_slug := base_slug || '-' || counter;
  END LOOP;
  
  RETURN final_slug;
END;
$$ LANGUAGE plpgsql;

-- Function to generate submission token
CREATE OR REPLACE FUNCTION generate_submission_token()
RETURNS TEXT AS $$
DECLARE
  token TEXT;
BEGIN
  token := 'PBD' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 8));
  
  -- Ensure uniqueness
  WHILE EXISTS (SELECT 1 FROM business_submissions WHERE submission_token = token) LOOP
    token := 'PBD' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 8));
  END LOOP;
  
  RETURN token;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- TRIGGERS FOR AUTOMATIC UPDATES
-- =====================================================

-- Trigger to set location point from lat/lng
CREATE OR REPLACE FUNCTION update_business_location()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.latitude IS NOT NULL AND NEW.longitude IS NOT NULL THEN
    NEW.location := ST_SetSRID(ST_MakePoint(NEW.longitude, NEW.latitude), 4326);
  END IF;
  
  -- Generate slug if not provided
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := generate_business_slug(NEW.name);
  END IF;
  
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_business_location_trigger
  BEFORE INSERT OR UPDATE ON portuguese_businesses
  FOR EACH ROW EXECUTE FUNCTION update_business_location();

-- Trigger to generate submission token
CREATE OR REPLACE FUNCTION set_submission_token()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.submission_token IS NULL OR NEW.submission_token = '' THEN
    NEW.submission_token := generate_submission_token();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_submission_token_trigger
  BEFORE INSERT ON business_submissions
  FOR EACH ROW EXECUTE FUNCTION set_submission_token();

-- =====================================================
-- SEED DATA: PORTUGUESE-SPEAKING COUNTRIES
-- =====================================================
INSERT INTO portuguese_countries (country_code, country_name_en, country_name_pt, flag_emoji, region, official_language, currency_code, currency_symbol) VALUES
('PRT', 'Portugal', 'Portugal', '🇵🇹', 'Europe', 'Portuguese', 'EUR', '€'),
('BRA', 'Brazil', 'Brasil', '🇧🇷', 'South America', 'Portuguese', 'BRL', 'R$'),
('AGO', 'Angola', 'Angola', '🇦🇴', 'Africa', 'Portuguese', 'AOA', 'Kz'),
('MOZ', 'Mozambique', 'Moçambique', '🇲🇿', 'Africa', 'Portuguese', 'MZN', 'MT'),
('CPV', 'Cape Verde', 'Cabo Verde', '🇨🇻', 'Africa', 'Portuguese', 'CVE', '$'),
('GNB', 'Guinea-Bissau', 'Guiné-Bissau', '🇬🇼', 'Africa', 'Portuguese', 'XOF', 'CFA'),
('STP', 'São Tomé and Príncipe', 'São Tomé e Príncipe', '🇸🇹', 'Africa', 'Portuguese', 'STN', 'Db'),
('TLS', 'East Timor', 'Timor-Leste', '🇹🇱', 'Asia', 'Portuguese/Tetum', 'USD', '$'),
('MAC', 'Macau', 'Macau', '🇲🇴', 'Asia', 'Portuguese/Chinese', 'MOP', 'P');

-- =====================================================
-- SEED DATA: BUSINESS CATEGORIES
-- =====================================================
INSERT INTO business_categories (category_key, name_en, name_pt, description_en, description_pt, icon, color_hex) VALUES
('restaurant', 'Restaurant', 'Restaurante', 'Portuguese restaurants and dining', 'Restaurantes e comida portuguesa', '🍽️', '#E74C3C'),
('cafe', 'Café', 'Café', 'Portuguese cafés and coffee shops', 'Cafés e pastelarias portuguesas', '☕', '#8B4513'),
('grocery', 'Grocery Store', 'Mercearia', 'Portuguese grocery and food markets', 'Mercearias e produtos portugueses', '🛒', '#27AE60'),
('bakery', 'Bakery', 'Padaria', 'Portuguese bakeries and pastries', 'Padarias e doçaria portuguesa', '🥖', '#F39C12'),
('services', 'Services', 'Serviços', 'General Portuguese business services', 'Serviços gerais para a comunidade', '🔧', '#3498DB'),
('healthcare', 'Healthcare', 'Saúde', 'Portuguese healthcare providers', 'Serviços de saúde em português', '🏥', '#E67E22'),
('legal', 'Legal Services', 'Serviços Legais', 'Portuguese-speaking legal services', 'Serviços legais em português', '⚖️', '#9B59B6'),
('financial', 'Financial Services', 'Serviços Financeiros', 'Banking and financial services', 'Bancos e serviços financeiros', '💰', '#1ABC9C'),
('real_estate', 'Real Estate', 'Imobiliário', 'Portuguese real estate services', 'Serviços imobiliários em português', '🏠', '#34495E'),
('education', 'Education', 'Educação', 'Portuguese language schools and education', 'Escolas de português e educação', '📚', '#16A085'),
('beauty', 'Beauty & Wellness', 'Beleza e Bem-estar', 'Portuguese beauty and wellness services', 'Serviços de beleza em português', '💅', '#E91E63'),
('retail', 'Retail', 'Comércio', 'Portuguese retail and shopping', 'Comércio e lojas portuguesas', '🛍️', '#FF5722'),
('automotive', 'Automotive', 'Automóvel', 'Portuguese automotive services', 'Serviços automóveis em português', '🚗', '#607D8B'),
('home_services', 'Home Services', 'Serviços Domésticos', 'Portuguese home and maintenance services', 'Serviços domésticos em português', '🔨', '#795548'),
('entertainment', 'Entertainment', 'Entretenimento', 'Portuguese entertainment and events', 'Entretenimento e eventos portugueses', '🎭', '#FF9800'),
('travel', 'Travel', 'Viagens', 'Portuguese travel agencies and services', 'Agências de viagem portuguesas', '✈️', '#2196F3'),
('technology', 'Technology', 'Tecnologia', 'Portuguese technology services', 'Serviços de tecnologia em português', '💻', '#4CAF50'),
('consulting', 'Consulting', 'Consultoria', 'Portuguese business consulting', 'Consultoria empresarial portuguesa', '💼', '#673AB7'),
('cultural_center', 'Cultural Center', 'Centro Cultural', 'Portuguese cultural centers and associations', 'Centros culturais portugueses', '🏛️', '#009688');

-- =====================================================
-- SEED DATA: SAMPLE PORTUGUESE BUSINESSES IN LONDON
-- =====================================================
INSERT INTO portuguese_businesses (
  name, name_portuguese, description, description_portuguese, category_id,
  address, postcode, phone, email, website,
  latitude, longitude,
  owner_name, owner_region, languages_spoken, year_established,
  verification_status, is_active, supports_culture,
  rating, review_count,
  keywords, london_area, nearby_transport,
  opening_hours
) SELECT
  'Casa do Bacalhau',
  'Casa do Bacalhau - Restaurante Tradicional',
  'Authentic Portuguese restaurant serving traditional dishes from all regions of Portugal. Family-owned since 1987, bringing the taste of home to London.',
  'Restaurante português autêntico servindo pratos tradicionais de todas as regiões de Portugal. Empresa familiar desde 1987, trazendo o sabor de casa para Londres.',
  (SELECT id FROM business_categories WHERE category_key = 'restaurant'),
  '47 Golborne Road, London',
  'W10 5NR',
  '+44 20 8960 5169',
  'info@casadobacalhau.co.uk',
  'https://casadobacalhau.co.uk',
  51.521161, -0.202532, -- Approximate coordinates for Golborne Road
  'Manuel Silva',
  'portugal_mainland',
  ARRAY['portuguese', 'english'],
  1987,
  'verified',
  true,
  true,
  4.7,
  234,
  ARRAY['portuguese restaurant', 'bacalhau', 'fado', 'traditional portuguese', 'golborne road'],
  'west_london',
  ARRAY['Ladbroke Grove Station', 'Westbourne Park Station'],
  '{"monday": "Closed", "tuesday": "12:00-22:00", "wednesday": "12:00-22:00", "thursday": "12:00-22:00", "friday": "12:00-23:00", "saturday": "12:00-23:00", "sunday": "12:00-21:00"}'::jsonb
UNION ALL SELECT
  'Pastelaria Ribeiro',
  'Pastelaria Ribeiro - Doces e Salgados',
  'Traditional Portuguese bakery specializing in pastéis de nata, bolo de arroz, and other Portuguese pastries.',
  'Pastelaria portuguesa tradicional especializada em pastéis de nata, bolo de arroz e outros doces portugueses.',
  (SELECT id FROM business_categories WHERE category_key = 'bakery'),
  '56 South Lambeth Road, London',
  'SW8 1RL',
  '+44 20 7820 9987',
  'hello@pastelariaribeiro.com',
  'https://pastelariaribeiro.com',
  51.484089, -0.123559, -- Approximate coordinates for South Lambeth Road
  'Maria Ribeiro',
  'portugal_mainland',
  ARRAY['portuguese', 'english'],
  2019,
  'verified',
  true,
  true,
  4.9,
  187,
  ARRAY['pastéis de nata', 'portuguese bakery', 'portuguese pastries', 'bolo de arroz', 'south lambeth'],
  'south_london',
  ARRAY['Stockwell Station', 'Vauxhall Station'],
  '{"monday": "07:00-18:00", "tuesday": "07:00-18:00", "wednesday": "07:00-18:00", "thursday": "07:00-18:00", "friday": "07:00-18:00", "saturday": "08:00-17:00", "sunday": "08:00-16:00"}'::jsonb
UNION ALL SELECT
  'Lusitânia Travel',
  'Lusitânia Travel - Viagens para Portugal',
  'Specialized travel agency for trips to Portugal and Portuguese-speaking countries. Cultural tours and family visits.',
  'Agência de viagens especializada em viagens para Portugal e países lusófonos. Tours culturais e visitas familiares.',
  (SELECT id FROM business_categories WHERE category_key = 'travel'),
  '123 Harrow Road, London',
  'W9 3RE',
  '+44 20 7266 5544',
  'info@lusitaniatravel.co.uk',
  'https://lusitaniatravel.co.uk',
  51.522871, -0.180679, -- Approximate coordinates for Harrow Road
  'João Santos',
  'portugal_azores',
  ARRAY['portuguese', 'english'],
  2015,
  'verified',
  true,
  true,
  4.8,
  156,
  ARRAY['portugal travel', 'azores travel', 'portuguese travel agency', 'family trips portugal', 'harrow road'],
  'northwest_london',
  ARRAY['Warwick Avenue Station', 'Maida Vale Station'],
  '{"monday": "09:00-18:00", "tuesday": "09:00-18:00", "wednesday": "09:00-18:00", "thursday": "09:00-19:00", "friday": "09:00-18:00", "saturday": "10:00-16:00", "sunday": "Closed"}'::jsonb
UNION ALL SELECT
  'Centro Cultural Português',
  'Centro Cultural Português de Londres',
  'Portuguese cultural center offering language classes, cultural events, and community services for Portuguese speakers in London.',
  'Centro cultural português oferecendo aulas de língua, eventos culturais e serviços comunitários para lusófonos em Londres.',
  (SELECT id FROM business_categories WHERE category_key = 'cultural_center'),
  '180 High Street, London',
  'SE20 7EU',
  '+44 20 8778 2233',
  'info@centroculturalportugues.org.uk',
  'https://centroculturalportugues.org.uk',
  51.410847, -0.054083, -- Approximate coordinates for Penge High Street
  'Dr. Ana Ferreira',
  'portugal_mainland',
  ARRAY['portuguese', 'english'],
  1995,
  'verified',
  true,
  true,
  4.9,
  312,
  ARRAY['portuguese cultural center', 'portuguese language classes', 'portuguese community', 'cultural events london', 'high street'],
  'southeast_london',
  ARRAY['Penge East Station', 'Anerley Station'],
  '{"monday": "09:00-21:00", "tuesday": "09:00-21:00", "wednesday": "09:00-21:00", "thursday": "09:00-21:00", "friday": "09:00-18:00", "saturday": "10:00-17:00", "sunday": "Event days only"}'::jsonb;

-- =====================================================
-- CREATE STORAGE BUCKET FOR BUSINESS PHOTOS
-- =====================================================
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('business-photos', 'business-photos', true);

-- Storage policies for business photos
CREATE POLICY "Business photos are publicly viewable"
ON storage.objects FOR SELECT
USING (bucket_id = 'business-photos');

CREATE POLICY "Authenticated users can upload business photos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'business-photos' AND auth.role() = 'authenticated');

-- =====================================================
-- COMMENTS FOR DOCUMENTATION
-- =====================================================
COMMENT ON TABLE portuguese_countries IS 'Reference table for Portuguese-speaking countries with flag and currency information';
COMMENT ON TABLE business_categories IS 'Categories for Portuguese businesses with bilingual support';
COMMENT ON TABLE portuguese_businesses IS 'Main Portuguese business directory with full geolocation support and community features';
COMMENT ON TABLE business_verification_details IS 'Detailed verification information for Portuguese businesses';
COMMENT ON TABLE business_photos IS 'Photo gallery for Portuguese businesses with moderation support';
COMMENT ON TABLE business_reviews IS 'Customer reviews for Portuguese businesses with cultural authenticity ratings';
COMMENT ON TABLE business_special_offers IS 'Special offers and discounts from Portuguese businesses';
COMMENT ON TABLE business_cultural_events IS 'Cultural events hosted by Portuguese businesses';
COMMENT ON TABLE business_badges IS 'Achievement badges and certifications for Portuguese businesses';
COMMENT ON TABLE business_submissions IS 'Public submissions for new Portuguese businesses (no authentication required)';

COMMENT ON FUNCTION calculate_distance_km IS 'Calculate distance between two coordinates using Haversine formula';
COMMENT ON FUNCTION find_businesses_near_location IS 'Find Portuguese businesses within specified radius using PostGIS';
COMMENT ON FUNCTION generate_business_slug IS 'Generate unique URL-friendly slug for businesses';
COMMENT ON FUNCTION generate_submission_token IS 'Generate unique tracking token for public business submissions';