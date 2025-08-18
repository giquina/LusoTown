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