-- ======================================
-- LUSOTOWN SOCIAL FEED SYSTEM MIGRATION
-- ======================================
-- This migration replaces the Twitter integration with a comprehensive
-- internal social media platform for the Portuguese community in London

-- ======================================
-- SOCIAL POSTS SYSTEM
-- ======================================

-- Main posts table (replacing Twitter dependency)
CREATE TABLE IF NOT EXISTS social_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  content_type VARCHAR(20) DEFAULT 'text' CHECK (content_type IN ('text', 'image', 'video', 'link', 'event_share', 'service_promotion')),
  media_urls TEXT[], -- Array of image/video URLs
  link_preview JSONB, -- For shared links
  visibility VARCHAR(15) DEFAULT 'public' CHECK (visibility IN ('public', 'members_only', 'connections_only', 'private')),
  
  -- Portuguese cultural categorization
  cultural_tags TEXT[], -- ['fado', 'santos_populares', 'portuguese_business', etc.]
  location_tags TEXT[], -- ['stockwell', 'vauxhall', 'london', etc.]
  service_tags TEXT[], -- ['transport', 'tours', 'close_protection', etc.]
  
  -- Engagement metrics
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  saves_count INTEGER DEFAULT 0,
  
  -- Feed algorithm data
  engagement_score DECIMAL(10,2) DEFAULT 0, -- Calculated engagement score
  cultural_relevance_score DECIMAL(3,2) DEFAULT 0, -- Portuguese community relevance (0-1)
  boost_level VARCHAR(10) DEFAULT 'none' CHECK (boost_level IN ('none', 'low', 'medium', 'high')), -- For premium content
  
  -- Post metadata
  is_pinned BOOLEAN DEFAULT FALSE,
  is_promoted BOOLEAN DEFAULT FALSE, -- For promoted services/events
  expires_at TIMESTAMP WITH TIME ZONE, -- For time-sensitive content
  language VARCHAR(5) DEFAULT 'en', -- 'en', 'pt', 'pt-pt', 'pt-br'
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE -- Soft delete for content moderation
);

-- ======================================
-- SOCIAL INTERACTIONS
-- ======================================

-- Post reactions (like, love, etc.)
CREATE TABLE IF NOT EXISTS social_post_reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES social_posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  reaction_type VARCHAR(15) NOT NULL CHECK (reaction_type IN (
    'like', 'love', 'celebrate', 'support', 'laugh', 'wow', 'sad', 'angry'
  )),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(post_id, user_id, reaction_type)
);

-- Post comments with threading
CREATE TABLE IF NOT EXISTS social_post_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES social_posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  parent_comment_id UUID REFERENCES social_post_comments(id), -- For threaded replies
  content TEXT NOT NULL,
  media_urls TEXT[], -- Images/videos in comments
  likes_count INTEGER DEFAULT 0,
  language VARCHAR(5) DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE -- Soft delete
);

-- Post sharing/resharing
CREATE TABLE IF NOT EXISTS social_post_shares (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES social_posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  share_type VARCHAR(15) DEFAULT 'reshare' CHECK (share_type IN ('reshare', 'quote', 'external')),
  share_comment TEXT, -- Optional comment when sharing
  shared_to_platform VARCHAR(20), -- If shared externally
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(post_id, user_id, share_type, created_at) -- Allow multiple shares but track each
);

-- Saved posts
CREATE TABLE IF NOT EXISTS social_saved_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES social_posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  collection_name VARCHAR(100) DEFAULT 'default', -- For organizing saved posts
  notes TEXT, -- Personal notes about saved post
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(post_id, user_id, collection_name)
);

-- ======================================
-- FOLLOW SYSTEM
-- ======================================

-- User following relationships
CREATE TABLE IF NOT EXISTS social_follows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  following_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  follow_type VARCHAR(15) DEFAULT 'standard' CHECK (follow_type IN ('standard', 'close_friend', 'muted')),
  notification_level VARCHAR(15) DEFAULT 'all' CHECK (notification_level IN ('all', 'important', 'none')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(follower_id, following_id)
);

-- ======================================
-- FEED ALGORITHM TABLES
-- ======================================

-- User feed preferences
CREATE TABLE IF NOT EXISTS social_feed_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  show_cultural_content BOOLEAN DEFAULT TRUE,
  show_service_promotions BOOLEAN DEFAULT TRUE,
  show_event_content BOOLEAN DEFAULT TRUE,
  show_business_content BOOLEAN DEFAULT TRUE,
  preferred_languages TEXT[] DEFAULT ARRAY['en', 'pt'],
  location_preferences TEXT[] DEFAULT ARRAY['london'],
  content_type_preferences TEXT[] DEFAULT ARRAY['text', 'image', 'video', 'link'],
  algorithm_type VARCHAR(20) DEFAULT 'balanced' CHECK (algorithm_type IN ('chronological', 'engagement', 'cultural', 'balanced')),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Feed interaction tracking for algorithm optimization
CREATE TABLE IF NOT EXISTS social_feed_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  post_id UUID REFERENCES social_posts(id) ON DELETE CASCADE,
  interaction_type VARCHAR(20) NOT NULL CHECK (interaction_type IN (
    'view', 'click', 'like', 'comment', 'share', 'save', 'hide', 'report', 'dwell_time'
  )),
  interaction_value DECIMAL(10,2), -- Dwell time in seconds, click position, etc.
  context_data JSONB, -- Additional context for ML algorithm
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ======================================
-- CONTENT MODERATION
-- ======================================

-- Content reports
CREATE TABLE IF NOT EXISTS social_content_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reported_by UUID REFERENCES profiles(id),
  post_id UUID REFERENCES social_posts(id) ON DELETE CASCADE,
  comment_id UUID REFERENCES social_post_comments(id) ON DELETE CASCADE,
  report_type VARCHAR(30) NOT NULL CHECK (report_type IN (
    'spam', 'harassment', 'hate_speech', 'inappropriate_content', 
    'fake_information', 'cultural_insensitivity', 'scam', 'other'
  )),
  description TEXT,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'resolved', 'dismissed')),
  reviewed_by UUID REFERENCES profiles(id),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  action_taken VARCHAR(30), -- 'none', 'warning', 'content_removed', 'user_suspended', etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ======================================
-- NOTIFICATIONS SYSTEM
-- ======================================

-- Social notifications
CREATE TABLE IF NOT EXISTS social_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  triggered_by UUID REFERENCES profiles(id) ON DELETE CASCADE,
  notification_type VARCHAR(30) NOT NULL CHECK (notification_type IN (
    'new_follower', 'post_liked', 'post_commented', 'post_shared', 
    'comment_liked', 'comment_replied', 'mentioned', 'cultural_event'
  )),
  post_id UUID REFERENCES social_posts(id) ON DELETE CASCADE,
  comment_id UUID REFERENCES social_post_comments(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  message TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ======================================
-- PERFORMANCE INDEXES
-- ======================================

-- Posts indexes
CREATE INDEX IF NOT EXISTS idx_social_posts_user_id ON social_posts(user_id);
CREATE INDEX IF NOT EXISTS idx_social_posts_created_at ON social_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_social_posts_cultural_tags ON social_posts USING GIN(cultural_tags);
CREATE INDEX IF NOT EXISTS idx_social_posts_location_tags ON social_posts USING GIN(location_tags);
CREATE INDEX IF NOT EXISTS idx_social_posts_service_tags ON social_posts USING GIN(service_tags);
CREATE INDEX IF NOT EXISTS idx_social_posts_visibility ON social_posts(visibility);
CREATE INDEX IF NOT EXISTS idx_social_posts_engagement_score ON social_posts(engagement_score DESC);
CREATE INDEX IF NOT EXISTS idx_social_posts_cultural_relevance ON social_posts(cultural_relevance_score DESC);
CREATE INDEX IF NOT EXISTS idx_social_posts_active ON social_posts(created_at DESC) WHERE deleted_at IS NULL;

-- Reactions indexes
CREATE INDEX IF NOT EXISTS idx_social_reactions_post_id ON social_post_reactions(post_id);
CREATE INDEX IF NOT EXISTS idx_social_reactions_user_id ON social_post_reactions(user_id);

-- Comments indexes
CREATE INDEX IF NOT EXISTS idx_social_comments_post_id ON social_post_comments(post_id);
CREATE INDEX IF NOT EXISTS idx_social_comments_user_id ON social_post_comments(user_id);
CREATE INDEX IF NOT EXISTS idx_social_comments_parent ON social_post_comments(parent_comment_id);

-- Follows indexes
CREATE INDEX IF NOT EXISTS idx_social_follows_follower ON social_follows(follower_id);
CREATE INDEX IF NOT EXISTS idx_social_follows_following ON social_follows(following_id);

-- Feed interaction indexes
CREATE INDEX IF NOT EXISTS idx_feed_interactions_user_post ON social_feed_interactions(user_id, post_id);
CREATE INDEX IF NOT EXISTS idx_feed_interactions_type ON social_feed_interactions(interaction_type);

-- Notifications indexes
CREATE INDEX IF NOT EXISTS idx_social_notifications_user ON social_notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_social_notifications_unread ON social_notifications(user_id) WHERE is_read = FALSE;

-- ======================================
-- TRIGGERS AND FUNCTIONS
-- ======================================

-- Function to update post engagement scores
CREATE OR REPLACE FUNCTION update_post_engagement_score()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE social_posts 
  SET engagement_score = (
    (likes_count * 1.0) + 
    (comments_count * 2.0) + 
    (shares_count * 3.0) + 
    (saves_count * 1.5)
  ),
  updated_at = NOW()
  WHERE id = COALESCE(NEW.post_id, OLD.post_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Triggers to automatically update engagement scores
CREATE OR REPLACE TRIGGER trigger_update_engagement_on_reaction
  AFTER INSERT OR DELETE ON social_post_reactions
  FOR EACH ROW EXECUTE FUNCTION update_post_engagement_score();

CREATE OR REPLACE TRIGGER trigger_update_engagement_on_comment
  AFTER INSERT OR DELETE ON social_post_comments
  FOR EACH ROW EXECUTE FUNCTION update_post_engagement_score();

CREATE OR REPLACE TRIGGER trigger_update_engagement_on_share
  AFTER INSERT OR DELETE ON social_post_shares
  FOR EACH ROW EXECUTE FUNCTION update_post_engagement_score();

CREATE OR REPLACE TRIGGER trigger_update_engagement_on_save
  AFTER INSERT OR DELETE ON social_saved_posts
  FOR EACH ROW EXECUTE FUNCTION update_post_engagement_score();

-- Function to update counter fields
CREATE OR REPLACE FUNCTION update_post_counters()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_TABLE_NAME = 'social_post_reactions' THEN
    IF TG_OP = 'INSERT' THEN
      UPDATE social_posts SET likes_count = likes_count + 1 WHERE id = NEW.post_id;
    ELSIF TG_OP = 'DELETE' THEN
      UPDATE social_posts SET likes_count = GREATEST(0, likes_count - 1) WHERE id = OLD.post_id;
    END IF;
  ELSIF TG_TABLE_NAME = 'social_post_comments' THEN
    IF TG_OP = 'INSERT' THEN
      UPDATE social_posts SET comments_count = comments_count + 1 WHERE id = NEW.post_id;
    ELSIF TG_OP = 'DELETE' THEN
      UPDATE social_posts SET comments_count = GREATEST(0, comments_count - 1) WHERE id = OLD.post_id;
    END IF;
  ELSIF TG_TABLE_NAME = 'social_post_shares' THEN
    IF TG_OP = 'INSERT' THEN
      UPDATE social_posts SET shares_count = shares_count + 1 WHERE id = NEW.post_id;
    ELSIF TG_OP = 'DELETE' THEN
      UPDATE social_posts SET shares_count = GREATEST(0, shares_count - 1) WHERE id = OLD.post_id;
    END IF;
  ELSIF TG_TABLE_NAME = 'social_saved_posts' THEN
    IF TG_OP = 'INSERT' THEN
      UPDATE social_posts SET saves_count = saves_count + 1 WHERE id = NEW.post_id;
    ELSIF TG_OP = 'DELETE' THEN
      UPDATE social_posts SET saves_count = GREATEST(0, saves_count - 1) WHERE id = OLD.post_id;
    END IF;
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Apply counter triggers
CREATE OR REPLACE TRIGGER trigger_update_likes_count
  AFTER INSERT OR DELETE ON social_post_reactions
  FOR EACH ROW EXECUTE FUNCTION update_post_counters();

CREATE OR REPLACE TRIGGER trigger_update_comments_count
  AFTER INSERT OR DELETE ON social_post_comments
  FOR EACH ROW EXECUTE FUNCTION update_post_counters();

CREATE OR REPLACE TRIGGER trigger_update_shares_count
  AFTER INSERT OR DELETE ON social_post_shares
  FOR EACH ROW EXECUTE FUNCTION update_post_counters();

CREATE OR REPLACE TRIGGER trigger_update_saves_count
  AFTER INSERT OR DELETE ON social_saved_posts
  FOR EACH ROW EXECUTE FUNCTION update_post_counters();

-- ======================================
-- ROW LEVEL SECURITY
-- ======================================

-- Enable RLS on all tables
ALTER TABLE social_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_post_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_post_shares ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_saved_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_feed_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_notifications ENABLE ROW LEVEL SECURITY;

-- Posts policies
CREATE POLICY "Users can view public posts and member posts they have access to" ON social_posts
  FOR SELECT USING (
    visibility = 'public' OR 
    (auth.uid() IS NOT NULL AND visibility = 'members_only') OR
    (auth.uid() = user_id) OR
    (visibility = 'connections_only' AND EXISTS(
      SELECT 1 FROM social_follows WHERE follower_id = auth.uid() AND following_id = user_id
    ))
  );

CREATE POLICY "Users can create their own posts" ON social_posts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own posts" ON social_posts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own posts" ON social_posts
  FOR DELETE USING (auth.uid() = user_id);

-- Reactions policies
CREATE POLICY "Users can view all reactions" ON social_post_reactions FOR SELECT USING (true);
CREATE POLICY "Users can manage their own reactions" ON social_post_reactions FOR ALL USING (auth.uid() = user_id);

-- Comments policies
CREATE POLICY "Users can view comments on posts they can see" ON social_post_comments
  FOR SELECT USING (
    EXISTS(SELECT 1 FROM social_posts WHERE id = post_id AND (
      visibility = 'public' OR 
      (auth.uid() IS NOT NULL AND visibility = 'members_only') OR
      (auth.uid() = user_id) OR
      (visibility = 'connections_only' AND EXISTS(
        SELECT 1 FROM social_follows WHERE follower_id = auth.uid() AND following_id = social_posts.user_id
      ))
    ))
  );

CREATE POLICY "Users can create comments on accessible posts" ON social_post_comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments" ON social_post_comments
  FOR UPDATE USING (auth.uid() = user_id);

-- Follows policies
CREATE POLICY "Users can view all follow relationships" ON social_follows FOR SELECT USING (true);
CREATE POLICY "Users can manage their own follows" ON social_follows FOR ALL USING (auth.uid() = follower_id);

-- Feed preferences policies
CREATE POLICY "Users can manage their own feed preferences" ON social_feed_preferences 
  FOR ALL USING (auth.uid() = user_id);

-- Notifications policies
CREATE POLICY "Users can view their own notifications" ON social_notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" ON social_notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- ======================================
-- INITIAL DATA SETUP
-- ======================================

-- Insert default feed preferences for existing users
INSERT INTO social_feed_preferences (user_id)
SELECT id FROM profiles 
WHERE id NOT IN (SELECT user_id FROM social_feed_preferences WHERE user_id IS NOT NULL)
ON CONFLICT (user_id) DO NOTHING;

-- Sample Portuguese community posts for development
INSERT INTO social_posts (user_id, content, cultural_tags, location_tags, content_type, cultural_relevance_score, language) VALUES
((SELECT id FROM profiles LIMIT 1), 
 'Excited for tonight''s Fado performance at Canteen in Borough Market! Who else is going? 🎵 #FadoNight #PortugueseCulture', 
 ARRAY['fado', 'music', 'cultural_events'], 
 ARRAY['borough_market', 'london'], 
 'text', 
 0.95, 
 'en'),

((SELECT id FROM profiles LIMIT 1), 
 'Just discovered the most authentic pastéis de nata in Stockwell! The recipe is exactly like my grandmother''s from Porto 🥧❤️', 
 ARRAY['food', 'pasteis_de_nata', 'authentic_portuguese'], 
 ARRAY['stockwell', 'london'], 
 'text', 
 0.90, 
 'en'),

((SELECT id FROM profiles LIMIT 1), 
 'LusoTown Transport saved my evening! Professional driver who spoke perfect Portuguese and knew all the best routes. Highly recommend! 🚗✨', 
 ARRAY['transport', 'portuguese_service', 'recommendation'], 
 ARRAY['london'], 
 'text', 
 0.85, 
 'en');

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_social_posts_user_created ON social_posts(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_social_posts_engagement_created ON social_posts(engagement_score DESC, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_social_posts_cultural_score ON social_posts(cultural_relevance_score DESC) WHERE cultural_relevance_score > 0.5;

-- Portuguese cultural hashtag analytics view
CREATE OR REPLACE VIEW portuguese_trending_topics AS
SELECT 
  unnest(cultural_tags) AS tag,
  COUNT(*) AS post_count,
  AVG(engagement_score) AS avg_engagement,
  AVG(cultural_relevance_score) AS avg_cultural_relevance,
  COUNT(DISTINCT user_id) AS unique_users,
  MAX(created_at) AS last_used
FROM social_posts 
WHERE created_at >= NOW() - INTERVAL '7 days'
  AND deleted_at IS NULL
  AND cultural_tags IS NOT NULL
GROUP BY unnest(cultural_tags)
HAVING COUNT(*) >= 3
ORDER BY post_count DESC, avg_engagement DESC;

-- Portuguese location-based content view
CREATE OR REPLACE VIEW portuguese_location_activity AS
SELECT 
  unnest(location_tags) AS location,
  COUNT(*) AS post_count,
  AVG(engagement_score) AS avg_engagement,
  COUNT(DISTINCT user_id) AS unique_users,
  MAX(created_at) AS last_activity
FROM social_posts 
WHERE created_at >= NOW() - INTERVAL '7 days'
  AND deleted_at IS NULL
  AND location_tags IS NOT NULL
GROUP BY unnest(location_tags)
ORDER BY post_count DESC;

-- User engagement analytics
CREATE OR REPLACE VIEW user_social_analytics AS
SELECT 
  p.user_id,
  pr.first_name,
  pr.last_name,
  pr.membership_tier,
  COUNT(*) AS total_posts,
  SUM(p.likes_count) AS total_likes_received,
  SUM(p.comments_count) AS total_comments_received,
  SUM(p.shares_count) AS total_shares_received,
  AVG(p.engagement_score) AS avg_engagement_score,
  AVG(p.cultural_relevance_score) AS avg_cultural_relevance,
  COUNT(DISTINCT p.created_at::date) AS active_days,
  MAX(p.created_at) AS last_post_date
FROM social_posts p
JOIN profiles pr ON p.user_id = pr.id
WHERE p.deleted_at IS NULL
  AND p.created_at >= NOW() - INTERVAL '30 days'
GROUP BY p.user_id, pr.first_name, pr.last_name, pr.membership_tier
ORDER BY avg_engagement_score DESC;

COMMENT ON TABLE social_posts IS 'Core social media posts for Portuguese community in London - replaces Twitter integration';
COMMENT ON TABLE social_follows IS 'User following relationships for Portuguese community social network';
COMMENT ON TABLE social_feed_preferences IS 'User preferences for Portuguese cultural content feed algorithm';
COMMENT ON VIEW portuguese_trending_topics IS 'Trending Portuguese cultural topics and hashtags in the community';
COMMENT ON VIEW portuguese_location_activity IS 'Portuguese community activity by London location/area';
COMMENT ON VIEW user_social_analytics IS 'User engagement analytics for Portuguese community members';

-- Migration complete
SELECT 'LusoTown Social Feed System Migration Completed Successfully!' AS migration_status;