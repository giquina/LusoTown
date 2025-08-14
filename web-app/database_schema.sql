-- LusoTown Enhanced Event Feed & Cart System Database Schema
-- This extends the existing schema with event feed and cart functionality

-- Enhanced Events table with cart support
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  event_type VARCHAR(20) DEFAULT 'in_person' CHECK (event_type IN ('online', 'in_person', 'hybrid')),
  category VARCHAR(100),
  location VARCHAR(255),
  address TEXT,
  virtual_link VARCHAR(500),
  start_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
  end_datetime TIMESTAMP WITH TIME ZONE,
  max_attendees INTEGER,
  current_attendee_count INTEGER DEFAULT 0,
  price DECIMAL(10,2) DEFAULT 0,
  currency VARCHAR(3) DEFAULT 'GBP',
  created_by UUID REFERENCES profiles(id),
  image_url VARCHAR(500),
  gallery_urls TEXT[], -- Array of image URLs
  is_featured BOOLEAN DEFAULT FALSE,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'completed', 'full')),
  tags TEXT[],
  requires_approval BOOLEAN DEFAULT FALSE,
  membership_required VARCHAR(20) DEFAULT 'free' CHECK (membership_required IN ('free', 'core', 'premium')),
  allow_waitlist BOOLEAN DEFAULT TRUE,
  average_rating DECIMAL(3,2) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Event Feed Posts - Twitter-like feed for event activities
CREATE TABLE IF NOT EXISTS event_feed_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id),
  post_type VARCHAR(30) NOT NULL CHECK (post_type IN (
    'event_created', 'event_update', 'event_photo', 'event_review', 
    'event_reminder', 'user_joined', 'event_full', 'event_cancelled'
  )),
  content TEXT NOT NULL,
  images TEXT[], -- Array of image URLs
  metadata JSONB, -- Flexible data for different post types
  priority VARCHAR(10) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  is_sponsored BOOLEAN DEFAULT FALSE,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  reactions JSONB DEFAULT '{
    "interested": 0,
    "love": 0, 
    "going": 0,
    "wow": 0
  }',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Shopping Cart Items
CREATE TABLE IF NOT EXISTS cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  item_type VARCHAR(20) NOT NULL CHECK (item_type IN ('event', 'business_service', 'product')),
  item_id UUID, -- References events.id or other item types
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'GBP',
  quantity INTEGER DEFAULT 1,
  max_quantity INTEGER,
  expires_at TIMESTAMP WITH TIME ZONE, -- For time-sensitive items
  metadata JSONB, -- Flexible storage for item-specific data
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, item_id, item_type) -- Prevent duplicate items
);

-- Saved/Favorited Items (Enhanced from existing favorites)
CREATE TABLE IF NOT EXISTS saved_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  item_type VARCHAR(20) NOT NULL CHECK (item_type IN ('event', 'business', 'feed', 'group')),
  item_id UUID, -- References the actual item
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(500),
  category VARCHAR(100),
  metadata JSONB, -- Flexible storage for type-specific data
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, item_id, item_type)
);

-- Event Reservations/Bookings
CREATE TABLE IF NOT EXISTS event_reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id),
  quantity INTEGER DEFAULT 1,
  total_price DECIMAL(10,2),
  currency VARCHAR(3) DEFAULT 'GBP',
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  payment_intent_id VARCHAR(255), -- Stripe payment intent
  user_notes TEXT,
  dietary_requirements TEXT[],
  emergency_contact JSONB,
  confirmation_code VARCHAR(20),
  reserved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  confirmed_at TIMESTAMP WITH TIME ZONE,
  cancelled_at TIMESTAMP WITH TIME ZONE
);

-- Feed Post Reactions
CREATE TABLE IF NOT EXISTS feed_post_reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES event_feed_posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id),
  reaction_type VARCHAR(20) NOT NULL CHECK (reaction_type IN ('like', 'love', 'interested', 'going', 'wow', 'laugh', 'sad', 'angry')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(post_id, user_id, reaction_type)
);

-- Feed Post Comments
CREATE TABLE IF NOT EXISTS feed_post_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES event_feed_posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id),
  content TEXT NOT NULL,
  parent_comment_id UUID REFERENCES feed_post_comments(id), -- For replies
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_events_start_datetime ON events(start_datetime);
CREATE INDEX IF NOT EXISTS idx_events_category ON events(category);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_location ON events(location);
CREATE INDEX IF NOT EXISTS idx_events_featured ON events(is_featured);
CREATE INDEX IF NOT EXISTS idx_events_price ON events(price);

CREATE INDEX IF NOT EXISTS idx_event_feed_posts_event_id ON event_feed_posts(event_id);
CREATE INDEX IF NOT EXISTS idx_event_feed_posts_user_id ON event_feed_posts(user_id);
CREATE INDEX IF NOT EXISTS idx_event_feed_posts_type ON event_feed_posts(post_type);
CREATE INDEX IF NOT EXISTS idx_event_feed_posts_created_at ON event_feed_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_event_feed_posts_priority ON event_feed_posts(priority);

CREATE INDEX IF NOT EXISTS idx_cart_items_user_id ON cart_items(user_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_expires_at ON cart_items(expires_at);
CREATE INDEX IF NOT EXISTS idx_cart_items_item_type ON cart_items(item_type);

CREATE INDEX IF NOT EXISTS idx_saved_items_user_id ON saved_items(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_items_type ON saved_items(item_type);
CREATE INDEX IF NOT EXISTS idx_saved_items_created_at ON saved_items(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_event_reservations_event_id ON event_reservations(event_id);
CREATE INDEX IF NOT EXISTS idx_event_reservations_user_id ON event_reservations(user_id);
CREATE INDEX IF NOT EXISTS idx_event_reservations_status ON event_reservations(status);

CREATE INDEX IF NOT EXISTS idx_feed_reactions_post_id ON feed_post_reactions(post_id);
CREATE INDEX IF NOT EXISTS idx_feed_reactions_user_id ON feed_post_reactions(user_id);

CREATE INDEX IF NOT EXISTS idx_feed_comments_post_id ON feed_post_comments(post_id);
CREATE INDEX IF NOT EXISTS idx_feed_comments_user_id ON feed_post_comments(user_id);

-- Functions to update counters
CREATE OR REPLACE FUNCTION update_event_attendee_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE events 
    SET current_attendee_count = current_attendee_count + NEW.quantity
    WHERE id = NEW.event_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE events 
    SET current_attendee_count = GREATEST(0, current_attendee_count - OLD.quantity)
    WHERE id = OLD.event_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Triggers
CREATE OR REPLACE TRIGGER trigger_update_event_attendee_count
  AFTER INSERT OR DELETE ON event_reservations
  FOR EACH ROW 
  WHEN (NEW.status = 'confirmed' OR OLD.status = 'confirmed')
  EXECUTE FUNCTION update_event_attendee_count();

-- Sample data for Portuguese events (for development/testing)
INSERT INTO events (
  title, description, category, location, address, start_datetime, end_datetime,
  max_attendees, price, image_url, is_featured, tags, requires_approval, membership_required
) VALUES 
(
  'Noite de Fado & Vinho Verde - Authentic Portuguese Night',
  'Experience the soul of Portugal with traditional Fado music, Vinho Verde tasting, and authentic Portuguese cuisine. Join us for an unforgettable evening of culture, music, and community.',
  'Music & Entertainment',
  'A Toca Restaurant, Stockwell',
  'A Toca Restaurant, 73 Landor Road, Stockwell, London SW9 9PH',
  '2025-08-16 19:00:00+00',
  '2025-08-16 23:30:00+00',
  35, 45.00,
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop&auto=format',
  TRUE,
  ARRAY['Fado', 'Music', 'Wine', 'Portuguese Culture', 'Traditional'],
  FALSE, 'free'
),
(
  'Portuguese Language Exchange & Cocktails',
  'Practice your Portuguese while enjoying creative cocktails inspired by Portuguese culture. Perfect for all levels - from beginners to native speakers.',
  'Language Exchange',
  'Bar Elixir, Battersea Power Station',
  'Bar Elixir, Battersea Power Station, London SW8 5BN',
  '2025-08-20 18:00:00+00',
  '2025-08-20 22:00:00+00',
  45, 8.00,
  'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&h=400&fit=crop&auto=format',
  FALSE,
  ARRAY['Language', 'Cocktails', 'Social', 'Networking'],
  FALSE, 'free'
),
(
  'Mulheres Falantes de Português 30+ - Wine & Stories',
  'An intimate gathering for Portuguese-speaking women to share stories, experiences, and connect over fine wines from Portuguese-speaking countries.',
  'Wine & Dining',
  'Champor-Champor Restaurant, Elephant & Castle',
  'Champor-Champor Thai Restaurant, 62 Ampton Street, London WC1X 9JH',
  '2025-08-17 18:30:00+00',
  '2025-08-17 21:30:00+00',
  12, 38.00,
  'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&h=400&fit=crop&auto=format',
  TRUE,
  ARRAY['Women Only', 'Wine', 'Stories', 'Networking', '30+'],
  TRUE, 'core'
);

-- RLS (Row Level Security) Policies
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE feed_post_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE feed_post_comments ENABLE ROW LEVEL SECURITY;

-- Users can only manage their own cart items
CREATE POLICY "Users can view their own cart items" ON cart_items FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can insert their own cart items" ON cart_items FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update their own cart items" ON cart_items FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Users can delete their own cart items" ON cart_items FOR DELETE USING (user_id = auth.uid());

-- Users can only manage their own saved items
CREATE POLICY "Users can view their own saved items" ON saved_items FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can insert their own saved items" ON saved_items FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can delete their own saved items" ON saved_items FOR DELETE USING (user_id = auth.uid());

-- Event reservations policies
CREATE POLICY "Users can view their own reservations" ON event_reservations FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can create their own reservations" ON event_reservations FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update their own reservations" ON event_reservations FOR UPDATE USING (user_id = auth.uid());

-- Event feed posts are public for viewing
CREATE POLICY "Event feed posts are viewable by everyone" ON event_feed_posts FOR SELECT USING (true);
CREATE POLICY "Users can create event feed posts" ON event_feed_posts FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update their own posts" ON event_feed_posts FOR UPDATE USING (user_id = auth.uid());

-- Feed reactions and comments
CREATE POLICY "Feed reactions are viewable by everyone" ON feed_post_reactions FOR SELECT USING (true);
CREATE POLICY "Users can create their own reactions" ON feed_post_reactions FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update their own reactions" ON feed_post_reactions FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Users can delete their own reactions" ON feed_post_reactions FOR DELETE USING (user_id = auth.uid());

CREATE POLICY "Feed comments are viewable by everyone" ON feed_post_comments FOR SELECT USING (true);
CREATE POLICY "Users can create comments" ON feed_post_comments FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update their own comments" ON feed_post_comments FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Users can delete their own comments" ON feed_post_comments FOR DELETE USING (user_id = auth.uid());