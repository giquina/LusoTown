-- Portuguese Community Streaming Tables
-- Migration: Create streaming infrastructure for Portuguese cultural content

-- Streaming rooms for Portuguese community
CREATE TABLE IF NOT EXISTS streaming_rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_name TEXT UNIQUE NOT NULL,
  creator_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'general',
  subcategory TEXT,
  is_private BOOLEAN DEFAULT FALSE,
  max_participants INTEGER DEFAULT 100,
  scheduled_for TIMESTAMPTZ,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'live', 'ended')),
  tags TEXT[] DEFAULT '{}',
  language TEXT DEFAULT 'pt',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  ended_at TIMESTAMPTZ
);

-- Streaming sessions for analytics
CREATE TABLE IF NOT EXISTS streaming_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  room_name TEXT NOT NULL,
  participant_name TEXT NOT NULL,
  category TEXT,
  role TEXT DEFAULT 'viewer' CHECK (role IN ('viewer', 'streamer', 'moderator')),
  token_id TEXT,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  left_at TIMESTAMPTZ,
  duration_seconds INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Streaming participants (real-time tracking)
CREATE TABLE IF NOT EXISTS streaming_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID REFERENCES streaming_rooms(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  participant_name TEXT NOT NULL,
  role TEXT DEFAULT 'viewer',
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE,
  metadata JSONB DEFAULT '{}'
);

-- Portuguese cultural streaming categories
CREATE TABLE IF NOT EXISTS streaming_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  name_pt TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description_pt TEXT,
  description_en TEXT,
  icon TEXT DEFAULT '🎥',
  color TEXT DEFAULT '#1e40af',
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert Portuguese cultural streaming categories
INSERT INTO streaming_categories (key, name_pt, name_en, description_pt, description_en, icon, color) 
VALUES 
  ('musica', 'Música', 'Music', 'Performances de Fado, Kizomba, música popular portuguesa', 'Fado, Kizomba, Portuguese popular music performances', '🎵', '#1e40af'),
  ('culinaria', 'Culinária', 'Cooking', 'Demonstrações culinárias de pratos tradicionais portugueses', 'Culinary demonstrations of traditional Portuguese dishes', '🍽️', '#059669'),
  ('cultura', 'Cultura & História', 'Culture & History', 'Discussões sobre história portuguesa e tradições culturais', 'Discussions about Portuguese history and cultural traditions', '📚', '#f59e0b'),
  ('danca', 'Dança', 'Dance', 'Aulas e performances de danças tradicionais portuguesas', 'Classes and performances of traditional Portuguese dances', '💃', '#dc2626'),
  ('artesanato', 'Artesanato', 'Crafts', 'Demonstrações de artesanato tradicional português', 'Demonstrations of traditional Portuguese crafts', '🎨', '#7c3aed'),
  ('eventos', 'Eventos Comunitários', 'Community Events', 'Transmissões ao vivo de eventos da comunidade portuguesa', 'Live broadcasts of Portuguese community events', '🎪', '#059669'),
  ('conversas', 'Conversas & Talk Shows', 'Talks & Talk Shows', 'Programas de conversa sobre temas da comunidade portuguesa', 'Talk shows about Portuguese community topics', '🎤', '#1e40af')
ON CONFLICT (key) DO NOTHING;

-- Streaming chat messages
CREATE TABLE IF NOT EXISTS streaming_chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID REFERENCES streaming_rooms(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  message_type TEXT DEFAULT 'message' CHECK (message_type IN ('message', 'reaction', 'system')),
  metadata JSONB DEFAULT '{}',
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Streaming reactions for Portuguese cultural expressions
CREATE TABLE IF NOT EXISTS streaming_reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID REFERENCES streaming_rooms(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  reaction_type TEXT NOT NULL,
  emoji TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_streaming_rooms_creator ON streaming_rooms(creator_id);
CREATE INDEX IF NOT EXISTS idx_streaming_rooms_status ON streaming_rooms(status);
CREATE INDEX IF NOT EXISTS idx_streaming_rooms_category ON streaming_rooms(category);
CREATE INDEX IF NOT EXISTS idx_streaming_rooms_scheduled ON streaming_rooms(scheduled_for);

CREATE INDEX IF NOT EXISTS idx_streaming_sessions_user ON streaming_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_streaming_sessions_room ON streaming_sessions(room_name);
CREATE INDEX IF NOT EXISTS idx_streaming_sessions_created ON streaming_sessions(created_at);

CREATE INDEX IF NOT EXISTS idx_streaming_participants_room ON streaming_participants(room_id);
CREATE INDEX IF NOT EXISTS idx_streaming_participants_user ON streaming_participants(user_id);
CREATE INDEX IF NOT EXISTS idx_streaming_participants_active ON streaming_participants(is_active);

CREATE INDEX IF NOT EXISTS idx_streaming_chat_room ON streaming_chat_messages(room_id);
CREATE INDEX IF NOT EXISTS idx_streaming_chat_created ON streaming_chat_messages(created_at);

CREATE INDEX IF NOT EXISTS idx_streaming_reactions_room ON streaming_reactions(room_id);
CREATE INDEX IF NOT EXISTS idx_streaming_reactions_created ON streaming_reactions(created_at);

-- Row Level Security (RLS) for streaming tables
ALTER TABLE streaming_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE streaming_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE streaming_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE streaming_chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE streaming_reactions ENABLE ROW LEVEL SECURITY;

-- Streaming rooms policies
CREATE POLICY "Users can view public streaming rooms" ON streaming_rooms
  FOR SELECT USING (NOT is_private OR creator_id = auth.uid());

CREATE POLICY "Users can create streaming rooms" ON streaming_rooms
  FOR INSERT WITH CHECK (creator_id = auth.uid());

CREATE POLICY "Creators can update their streaming rooms" ON streaming_rooms
  FOR UPDATE USING (creator_id = auth.uid());

CREATE POLICY "Creators can delete their streaming rooms" ON streaming_rooms
  FOR DELETE USING (creator_id = auth.uid());

-- Streaming sessions policies
CREATE POLICY "Users can view their streaming sessions" ON streaming_sessions
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create streaming sessions" ON streaming_sessions
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Streaming participants policies
CREATE POLICY "Users can view streaming participants" ON streaming_participants
  FOR SELECT USING (TRUE);

CREATE POLICY "Users can insert their participation" ON streaming_participants
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their participation" ON streaming_participants
  FOR UPDATE USING (user_id = auth.uid());

-- Streaming chat policies
CREATE POLICY "Users can view chat in rooms they can access" ON streaming_chat_messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM streaming_rooms 
      WHERE id = streaming_chat_messages.room_id 
      AND (NOT is_private OR creator_id = auth.uid())
    )
  );

CREATE POLICY "Users can send chat messages" ON streaming_chat_messages
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Streaming reactions policies
CREATE POLICY "Users can view reactions in accessible rooms" ON streaming_reactions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM streaming_rooms 
      WHERE id = streaming_reactions.room_id 
      AND (NOT is_private OR creator_id = auth.uid())
    )
  );

CREATE POLICY "Users can send reactions" ON streaming_reactions
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Functions for streaming analytics
CREATE OR REPLACE FUNCTION get_streaming_stats()
RETURNS JSON AS $$
BEGIN
  RETURN json_build_object(
    'active_rooms', (SELECT COUNT(*) FROM streaming_rooms WHERE status = 'live'),
    'total_rooms', (SELECT COUNT(*) FROM streaming_rooms),
    'active_participants', (SELECT COUNT(*) FROM streaming_participants WHERE is_active = TRUE),
    'total_sessions_today', (
      SELECT COUNT(*) FROM streaming_sessions 
      WHERE created_at >= CURRENT_DATE
    ),
    'popular_categories', (
      SELECT json_agg(json_build_object('category', category, 'count', cnt))
      FROM (
        SELECT category, COUNT(*) as cnt 
        FROM streaming_rooms 
        WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'
        GROUP BY category 
        ORDER BY cnt DESC 
        LIMIT 5
      ) popular
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to clean up old streaming data
CREATE OR REPLACE FUNCTION cleanup_old_streaming_data()
RETURNS void AS $$
BEGIN
  -- Clean up old streaming sessions (older than 30 days)
  DELETE FROM streaming_sessions WHERE created_at < NOW() - INTERVAL '30 days';
  
  -- Clean up old chat messages (older than 7 days)
  DELETE FROM streaming_chat_messages WHERE created_at < NOW() - INTERVAL '7 days';
  
  -- Clean up old reactions (older than 7 days)
  DELETE FROM streaming_reactions WHERE created_at < NOW() - INTERVAL '7 days';
  
  -- Mark old ended rooms for cleanup
  UPDATE streaming_rooms 
  SET status = 'ended' 
  WHERE status = 'live' AND updated_at < NOW() - INTERVAL '1 day';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;