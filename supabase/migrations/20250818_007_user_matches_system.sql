-- LusoTown User Matches System
-- Created: 2025-08-18
-- Purpose: Create comprehensive matching system for Portuguese community

-- Create user_matches table for mutual matching system
CREATE TABLE IF NOT EXISTS public.user_matches (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    target_user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    match_type VARCHAR(50) DEFAULT 'compatibility' CHECK (match_type IN ('compatibility', 'professional', 'cultural', 'event_based')),
    compatibility_score INTEGER DEFAULT 0 CHECK (compatibility_score >= 0 AND compatibility_score <= 100),
    shared_interests TEXT[] DEFAULT '{}',
    shared_events uuid[] DEFAULT '{}', -- Events both users attended
    cultural_compatibility_score INTEGER DEFAULT 0,
    professional_compatibility_score INTEGER DEFAULT 0,
    location_proximity_score INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'liked', 'passed', 'blocked')),
    is_mutual BOOLEAN DEFAULT false,
    mutual_matched_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT (now() + INTERVAL '30 days'),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    
    -- Ensure users can't match with themselves and no duplicate matches
    CONSTRAINT no_self_match CHECK (user_id != target_user_id),
    UNIQUE(user_id, target_user_id)
);

-- Create messaging_permissions table for authorization logic
CREATE TABLE IF NOT EXISTS public.messaging_permissions (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    target_user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    permission_type VARCHAR(30) NOT NULL CHECK (permission_type IN ('match_based', 'event_based', 'admin_override')),
    permission_source VARCHAR(50) NOT NULL, -- match_id or event_id or 'admin'
    source_id uuid, -- References either user_matches.id or events.id
    granted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    
    -- Composite unique constraint to prevent duplicate permissions
    UNIQUE(user_id, target_user_id, permission_type, source_id)
);

-- Create match_activities table for tracking match interactions
CREATE TABLE IF NOT EXISTS public.match_activities (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    match_id uuid REFERENCES public.user_matches(id) ON DELETE CASCADE NOT NULL,
    user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    activity_type VARCHAR(30) NOT NULL CHECK (activity_type IN ('like', 'pass', 'super_like', 'unmatch', 'report')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.user_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messaging_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.match_activities ENABLE ROW LEVEL SECURITY;

-- User matches policies
CREATE POLICY "Users can view their own matches" ON public.user_matches
    FOR SELECT USING (auth.uid() = user_id OR auth.uid() = target_user_id);

CREATE POLICY "Users can create matches" ON public.user_matches
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their match status" ON public.user_matches
    FOR UPDATE USING (auth.uid() = user_id OR auth.uid() = target_user_id);

-- Messaging permissions policies
CREATE POLICY "Users can view their messaging permissions" ON public.messaging_permissions
    FOR SELECT USING (auth.uid() = user_id OR auth.uid() = target_user_id);

CREATE POLICY "System can manage messaging permissions" ON public.messaging_permissions
    FOR ALL USING (true); -- Managed by triggers and functions

-- Match activities policies
CREATE POLICY "Users can view activities for their matches" ON public.match_activities
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.user_matches um
            WHERE um.id = match_id
            AND (um.user_id = auth.uid() OR um.target_user_id = auth.uid())
        )
    );

CREATE POLICY "Users can create match activities" ON public.match_activities
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX idx_user_matches_user_id ON public.user_matches(user_id);
CREATE INDEX idx_user_matches_target_user_id ON public.user_matches(target_user_id);
CREATE INDEX idx_user_matches_mutual ON public.user_matches(is_mutual) WHERE is_mutual = true;
CREATE INDEX idx_user_matches_status ON public.user_matches(status);
CREATE INDEX idx_user_matches_expires_at ON public.user_matches(expires_at) WHERE expires_at IS NOT NULL;

CREATE INDEX idx_messaging_permissions_users ON public.messaging_permissions(user_id, target_user_id);
CREATE INDEX idx_messaging_permissions_type_active ON public.messaging_permissions(permission_type, is_active);
CREATE INDEX idx_messaging_permissions_source ON public.messaging_permissions(permission_type, source_id);

CREATE INDEX idx_match_activities_match_id ON public.match_activities(match_id, created_at DESC);

-- Function to check if two users can message each other
CREATE OR REPLACE FUNCTION can_users_message(
    user_a uuid,
    user_b uuid
)
RETURNS JSONB AS $$
DECLARE
    permission_result JSONB := '{"can_message": false, "reasons": []}'::jsonb;
    has_mutual_match BOOLEAN := false;
    has_event_permission BOOLEAN := false;
    shared_events INTEGER := 0;
    reasons TEXT[] := '{}';
BEGIN
    -- Check for mutual match
    SELECT EXISTS (
        SELECT 1 FROM public.user_matches
        WHERE ((user_id = user_a AND target_user_id = user_b) 
               OR (user_id = user_b AND target_user_id = user_a))
        AND is_mutual = true
        AND status = 'liked'
        AND (expires_at IS NULL OR expires_at > now())
    ) INTO has_mutual_match;
    
    IF has_mutual_match THEN
        reasons := array_append(reasons, 'mutual_match');
    END IF;
    
    -- Check for shared event attendance (both attended same event)
    SELECT COUNT(*) INTO shared_events
    FROM public.event_attendees ea1
    JOIN public.event_attendees ea2 ON ea1.event_id = ea2.event_id
    WHERE ea1.user_id = user_a 
    AND ea2.user_id = user_b
    AND ea1.status = 'attended'
    AND ea2.status = 'attended';
    
    IF shared_events > 0 THEN
        has_event_permission := true;
        reasons := array_append(reasons, 'shared_events');
    END IF;
    
    -- Check for active messaging permissions (admin overrides, etc.)
    IF EXISTS (
        SELECT 1 FROM public.messaging_permissions
        WHERE ((user_id = user_a AND target_user_id = user_b)
               OR (user_id = user_b AND target_user_id = user_a))
        AND is_active = true
        AND (expires_at IS NULL OR expires_at > now())
    ) THEN
        reasons := array_append(reasons, 'admin_permission');
    END IF;
    
    permission_result := jsonb_build_object(
        'can_message', (has_mutual_match OR has_event_permission OR array_length(reasons, 1) > 0),
        'has_mutual_match', has_mutual_match,
        'has_event_permission', has_event_permission,
        'shared_events_count', shared_events,
        'reasons', reasons
    );
    
    RETURN permission_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create mutual match when both users like each other
CREATE OR REPLACE FUNCTION handle_mutual_match()
RETURNS TRIGGER AS $$
DECLARE
    reverse_match RECORD;
    conversation_id uuid;
BEGIN
    -- Only process 'liked' status
    IF NEW.status != 'liked' THEN
        RETURN NEW;
    END IF;
    
    -- Check if the target user has also liked this user
    SELECT * INTO reverse_match
    FROM public.user_matches
    WHERE user_id = NEW.target_user_id
    AND target_user_id = NEW.user_id
    AND status = 'liked';
    
    IF FOUND THEN
        -- Create mutual match
        UPDATE public.user_matches
        SET is_mutual = true,
            mutual_matched_at = now()
        WHERE id = NEW.id OR id = reverse_match.id;
        
        -- Create messaging permission for mutual match
        INSERT INTO public.messaging_permissions (
            user_id, target_user_id, permission_type, permission_source, source_id
        ) VALUES (
            NEW.user_id, NEW.target_user_id, 'match_based', 'mutual_match', NEW.id
        ), (
            NEW.target_user_id, NEW.user_id, 'match_based', 'mutual_match', reverse_match.id
        );
        
        -- Create conversation between matched users
        INSERT INTO public.conversations (participant_ids, connection_type)
        VALUES (ARRAY[NEW.user_id, NEW.target_user_id], 'mutual_match')
        RETURNING id INTO conversation_id;
        
        -- Log match activity
        INSERT INTO public.match_activities (match_id, user_id, activity_type)
        VALUES (NEW.id, NEW.user_id, 'like');
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create event-based messaging permissions
CREATE OR REPLACE FUNCTION create_event_messaging_permissions()
RETURNS TRIGGER AS $$
DECLARE
    other_attendee RECORD;
BEGIN
    -- Only create permissions for users who actually attended
    IF NEW.status != 'attended' THEN
        RETURN NEW;
    END IF;
    
    -- Create messaging permissions with all other attendees of the same event
    FOR other_attendee IN 
        SELECT user_id FROM public.event_attendees
        WHERE event_id = NEW.event_id
        AND user_id != NEW.user_id
        AND status = 'attended'
    LOOP
        -- Insert bidirectional messaging permissions
        INSERT INTO public.messaging_permissions (
            user_id, target_user_id, permission_type, permission_source, source_id, expires_at
        ) VALUES (
            NEW.user_id, other_attendee.user_id, 'event_based', 'shared_event', NEW.event_id, now() + INTERVAL '90 days'
        ), (
            other_attendee.user_id, NEW.user_id, 'event_based', 'shared_event', NEW.event_id, now() + INTERVAL '90 days'
        )
        ON CONFLICT (user_id, target_user_id, permission_type, source_id) DO NOTHING;
    END LOOP;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to validate conversation message permissions
CREATE OR REPLACE FUNCTION validate_message_permissions()
RETURNS TRIGGER AS $$
DECLARE
    permission_check JSONB;
BEGIN
    -- Check if users can message each other
    permission_check := can_users_message(NEW.sender_id, NEW.receiver_id);
    
    IF NOT (permission_check->>'can_message')::boolean THEN
        RAISE EXCEPTION 'Users are not authorized to message each other. Reason: No mutual match or shared event attendance.';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Triggers
CREATE TRIGGER handle_mutual_match_trigger
    AFTER INSERT OR UPDATE ON public.user_matches
    FOR EACH ROW
    EXECUTE FUNCTION handle_mutual_match();

CREATE TRIGGER create_event_messaging_permissions_trigger
    AFTER INSERT OR UPDATE ON public.event_attendees
    FOR EACH ROW
    EXECUTE FUNCTION create_event_messaging_permissions();

CREATE TRIGGER validate_message_permissions_trigger
    BEFORE INSERT ON public.conversation_messages
    FOR EACH ROW
    EXECUTE FUNCTION validate_message_permissions();

-- Add updated_at triggers
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.user_matches
    FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

-- Sample data for testing
INSERT INTO public.user_matches (user_id, target_user_id, match_type, compatibility_score, shared_interests) VALUES
    ('00000000-0000-0000-0000-000000000001'::uuid, '00000000-0000-0000-0000-000000000002'::uuid, 'compatibility', 85, ARRAY['Portuguese culture', 'Football', 'Business networking']),
    ('00000000-0000-0000-0000-000000000002'::uuid, '00000000-0000-0000-0000-000000000001'::uuid, 'compatibility', 85, ARRAY['Portuguese culture', 'Football', 'Business networking']),
    ('00000000-0000-0000-0000-000000000003'::uuid, '00000000-0000-0000-0000-000000000004'::uuid, 'cultural', 92, ARRAY['Fado music', 'Portuguese cuisine', 'Cultural events']);

-- Comments for documentation
COMMENT ON TABLE public.user_matches IS 'User matching system with compatibility scoring and mutual matching logic';
COMMENT ON TABLE public.messaging_permissions IS 'Authorization table controlling who can message whom based on matches or shared events';
COMMENT ON TABLE public.match_activities IS 'Activity log for match interactions (likes, passes, reports)';
COMMENT ON FUNCTION can_users_message(uuid, uuid) IS 'Checks if two users are authorized to message each other based on matches or shared events';
COMMENT ON FUNCTION handle_mutual_match() IS 'Creates mutual matches and messaging permissions when both users like each other';
COMMENT ON FUNCTION create_event_messaging_permissions() IS 'Creates messaging permissions between attendees of the same event';
COMMENT ON FUNCTION validate_message_permissions() IS 'Validates that users have permission to message before allowing message creation';