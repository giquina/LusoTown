-- Enhanced Groups Schema with Safety and Portuguese-speaking community Features
-- Created: 2025-08-14

-- Add new columns to the existing groups table for enhanced safety and community features
ALTER TABLE public.groups 
ADD COLUMN IF NOT EXISTS portuguese_origin varchar(50) check (portuguese_origin in ('portugal', 'brazil', 'angola', 'mozambique', 'cape-verde', 'guinea-bissau', 'sao-tome-principe', 'east-timor', 'macau', 'equatorial-guinea', 'mixed', 'any')),
ADD COLUMN IF NOT EXISTS language_preference varchar(20) default 'both' check (language_preference in ('english', 'portuguese', 'pt-pt', 'pt-br', 'both')),
ADD COLUMN IF NOT EXISTS age_restrictions jsonb default '{"min_age": 18, "max_age": null, "families_welcome": true}',
ADD COLUMN IF NOT EXISTS meeting_frequency varchar(20) check (meeting_frequency in ('weekly', 'biweekly', 'monthly', 'quarterly', 'irregular', 'one-time')),
ADD COLUMN IF NOT EXISTS verification_level varchar(20) default 'basic' check (verification_level in ('none', 'basic', 'verified', 'premium')),
ADD COLUMN IF NOT EXISTS london_borough varchar(100),
ADD COLUMN IF NOT EXISTS safety_features jsonb default '{"auto_moderation": true, "manual_approval": false, "background_check_required": false}',
ADD COLUMN IF NOT EXISTS cultural_focus jsonb default '{"preserves_heritage": false, "family_friendly": true, "traditional_activities": false, "language_learning": false}',
ADD COLUMN IF NOT EXISTS contact_info jsonb default '{"email": null, "phone": null, "whatsapp": null, "telegram": null}',
ADD COLUMN IF NOT EXISTS group_tags text[],
ADD COLUMN IF NOT EXISTS moderation_status varchar(20) default 'pending' check (moderation_status in ('pending', 'approved', 'rejected', 'flagged', 'under_review')),
ADD COLUMN IF NOT EXISTS rejection_reason text,
ADD COLUMN IF NOT EXISTS last_moderated_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS moderated_by uuid references public.profiles(id);

-- Create group reports table for safety
CREATE TABLE IF NOT EXISTS public.group_reports (
    id uuid default uuid_generate_v4() primary key,
    group_id uuid references public.groups(id) on delete cascade not null,
    reported_by uuid references public.profiles(id) on delete cascade not null,
    report_type varchar(50) not null check (report_type in ('inappropriate_content', 'spam', 'harassment', 'fake_group', 'safety_concern', 'age_inappropriate', 'other')),
    description text not null,
    status varchar(20) default 'pending' check (status in ('pending', 'investigating', 'resolved', 'dismissed')),
    reviewed_by uuid references public.profiles(id),
    reviewed_at timestamp with time zone,
    resolution_notes text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create group moderation log
CREATE TABLE IF NOT EXISTS public.group_moderation_log (
    id uuid default uuid_generate_v4() primary key,
    group_id uuid references public.groups(id) on delete cascade not null,
    moderator_id uuid references public.profiles(id) not null,
    action_type varchar(30) not null check (action_type in ('created', 'approved', 'rejected', 'flagged', 'unflagged', 'suspended', 'unsuspended', 'deleted')),
    reason text,
    previous_status varchar(20),
    new_status varchar(20),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create group join requests table for private groups
CREATE TABLE IF NOT EXISTS public.group_join_requests (
    id uuid default uuid_generate_v4() primary key,
    group_id uuid references public.groups(id) on delete cascade not null,
    user_id uuid references public.profiles(id) on delete cascade not null,
    message text,
    status varchar(20) default 'pending' check (status in ('pending', 'approved', 'rejected')),
    reviewed_by uuid references public.profiles(id),
    reviewed_at timestamp with time zone,
    response_message text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    UNIQUE(group_id, user_id)
);

-- Portuguese-speaking community focused group categories
CREATE TABLE IF NOT EXISTS public.group_categories (
    id uuid default uuid_generate_v4() primary key,
    name_en varchar(100) not null,
    name_pt varchar(100) not null,
    description_en text,
    description_pt text,
    icon varchar(50),
    color_class varchar(50),
    is_age_restricted boolean default false,
    min_age integer,
    is_active boolean default true,
    display_order integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Insert Portuguese-speaking community focused categories
INSERT INTO public.group_categories (name_en, name_pt, description_en, description_pt, icon, color_class, is_age_restricted, min_age, display_order) VALUES
('Young Professionals (18-25)', 'Jovens Profissionais (18-25)', 'Networking and career development for young Portuguese professionals', 'Networking e desenvolvimento de carreira para jovens profissionais portugueses', 'briefcase', 'bg-primary-500', true, 18, 1),
('Professionals (25-35)', 'Profissionais (25-35)', 'Career networking and business connections', 'Networking profissional e conexões de negócios', 'users', 'bg-secondary-500', true, 25, 2),
('Experienced Professionals (35-50)', 'Profissionais Experientes (35-50)', 'Senior professional networking and mentorship', 'Networking profissional sénior e mentoria', 'award', 'bg-accent-500', true, 35, 3),
('Senior Community (50+)', 'Comunidade Sénior (50+)', 'Social activities and cultural preservation for seniors', 'Atividades sociais e preservação cultural para seniores', 'heart', 'bg-premium-500', true, 50, 4),
('Families with Children', 'Famílias com Crianças', 'Family-friendly activities and parenting support', 'Atividades familiares e apoio parental', 'home', 'bg-coral-500', false, null, 5),
('Food & Cooking', 'Culinária & Gastronomia', 'Portuguese cuisine and cooking together', 'Culinária portuguesa e cozinhar juntos', 'chef-hat', 'bg-yellow-500', false, null, 6),
('Sports & Fitness', 'Desportos & Fitness', 'Football, fitness, and Portuguese sports', 'Futebol, fitness e desportos portugueses', 'football', 'bg-green-500', false, null, 7),
('Culture & Arts', 'Cultura & Artes', 'Fado, traditional music, and Portuguese arts', 'Fado, música tradicional e artes portuguesas', 'music', 'bg-purple-500', false, null, 8),
('Business Networking', 'Networking de Negócios', 'Portuguese business connections and opportunities', 'Conexões de negócios portugueses e oportunidades', 'building', 'bg-blue-500', true, 18, 9),
('Single Parents', 'Pais Solteiros', 'Support network for Portuguese single parents', 'Rede de apoio para pais solteiros portugueses', 'user-heart', 'bg-pink-500', true, 18, 10),
('Students', 'Estudantes', 'Portuguese students in UK universities and colleges', 'Estudantes portugueses em universidades e faculdades do Reino Unido', 'graduation-cap', 'bg-indigo-500', true, 16, 11),
('Newcomers to London', 'Recém-chegados a Londres', 'Support for new Portuguese arrivals', 'Apoio para recém-chegados portugueses', 'map', 'bg-teal-500', false, null, 12),
('Portuguese from Portugal', 'Portugueses de Portugal', 'Specific to those from mainland Portugal', 'Específico para os de Portugal continental', 'flag', 'bg-red-500', false, null, 13),
('Portuguese from Brazil', 'Portugueses do Brasil', 'Brazilian Portuguese-speaking community', 'Comunidade de falantes de português brasileira', 'flag', 'bg-green-600', false, null, 14),
('Portuguese from Africa', 'Portugueses de África', 'African Portuguese communities (Angola, Mozambique, etc.)', 'Comunidades portuguesas africanas (Angola, Moçambique, etc.)', 'flag', 'bg-orange-500', false, null, 15),
('Language Exchange', 'Intercâmbio de Línguas', 'Practice Portuguese and English together', 'Praticar português e inglês juntos', 'message-circle', 'bg-sky-500', false, null, 16);

-- Enable RLS on new tables
ALTER TABLE public.group_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_moderation_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_join_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_categories ENABLE ROW LEVEL SECURITY;

-- Policies for group_reports
CREATE POLICY "Users can create reports" ON public.group_reports
    FOR INSERT WITH CHECK (auth.uid() = reported_by);

CREATE POLICY "Users can view their own reports" ON public.group_reports
    FOR SELECT USING (auth.uid() = reported_by);

CREATE POLICY "Moderators can view all reports" ON public.group_reports
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() 
            AND membership_tier IN ('premium')
        )
    );

-- Policies for group_join_requests
CREATE POLICY "Users can create join requests" ON public.group_join_requests
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own join requests" ON public.group_join_requests
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Group admins can view requests for their groups" ON public.group_join_requests
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.group_members 
            WHERE group_id = group_join_requests.group_id 
            AND user_id = auth.uid() 
            AND role IN ('admin', 'moderator')
        )
    );

-- Policies for group_categories (public read)
CREATE POLICY "Categories are publicly viewable" ON public.group_categories
    FOR SELECT USING (is_active = true);

-- Function to automatically moderate group content
CREATE OR REPLACE FUNCTION auto_moderate_group()
RETURNS TRIGGER AS $$
DECLARE
    flagged_words TEXT[] := ARRAY['spam', 'scam', 'fake', 'inappropriate']; -- Basic flagged words
    word TEXT;
    needs_review BOOLEAN := false;
BEGIN
    -- Check description for flagged content
    FOREACH word IN ARRAY flagged_words
    LOOP
        IF LOWER(NEW.description) LIKE '%' || word || '%' OR LOWER(NEW.name) LIKE '%' || word || '%' THEN
            needs_review := true;
            EXIT;
        END IF;
    END LOOP;

    -- Auto-flag if suspicious content detected
    IF needs_review THEN
        NEW.moderation_status := 'under_review';
        
        -- Log the auto-moderation action
        INSERT INTO public.group_moderation_log (group_id, moderator_id, action_type, reason, previous_status, new_status)
        VALUES (NEW.id, NEW.created_by, 'flagged', 'Auto-flagged by content filter', 'pending', 'under_review');
    ELSE
        -- Basic validation passed - approve for verified users
        IF EXISTS (SELECT 1 FROM public.profiles WHERE id = NEW.created_by AND verification_status = 'verified') THEN
            NEW.moderation_status := 'approved';
        ELSE
            NEW.moderation_status := 'pending';
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for auto-moderation on group creation
CREATE TRIGGER auto_moderate_group_trigger
    BEFORE INSERT ON public.groups
    FOR EACH ROW EXECUTE FUNCTION auto_moderate_group();

-- Function to update group member count
CREATE OR REPLACE FUNCTION update_group_member_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.groups 
        SET current_member_count = current_member_count + 1 
        WHERE id = NEW.group_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.groups 
        SET current_member_count = current_member_count - 1 
        WHERE id = OLD.group_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger for member count updates
CREATE TRIGGER update_group_member_count_trigger
    AFTER INSERT OR DELETE ON public.group_members
    FOR EACH ROW EXECUTE FUNCTION update_group_member_count();

-- Enhanced policies for groups with moderation
DROP POLICY IF EXISTS "Groups are viewable by all authenticated users" ON public.groups;

CREATE POLICY "Approved groups are viewable by all authenticated users" ON public.groups
    FOR SELECT USING (auth.role() = 'authenticated' AND moderation_status = 'approved');

CREATE POLICY "Users can view their own groups regardless of status" ON public.groups
    FOR SELECT USING (auth.uid() = created_by);

-- Update existing groups to have approved status (migration safety)
UPDATE public.groups 
SET moderation_status = 'approved', 
    age_restrictions = '{"min_age": 18, "max_age": null, "families_welcome": true}',
    safety_features = '{"auto_moderation": true, "manual_approval": false, "background_check_required": false}',
    cultural_focus = '{"preserves_heritage": false, "family_friendly": true, "traditional_activities": false, "language_learning": false}',
    language_preference = 'both'
WHERE moderation_status IS NULL;

-- Comments for documentation
COMMENT ON TABLE public.group_reports IS 'Safety reporting system for groups';
COMMENT ON TABLE public.group_moderation_log IS 'Audit trail for group moderation actions';
COMMENT ON TABLE public.group_join_requests IS 'Join requests for private groups';
COMMENT ON TABLE public.group_categories IS 'Portuguese-speaking community focused group categories';
COMMENT ON COLUMN public.groups.portuguese_origin IS 'Portuguese-speaking origin country/region';
COMMENT ON COLUMN public.groups.language_preference IS 'Preferred language for group communication';
COMMENT ON COLUMN public.groups.age_restrictions IS 'Age-based restrictions and family-friendly settings';
COMMENT ON COLUMN public.groups.verification_level IS 'Required verification level for members';
COMMENT ON COLUMN public.groups.safety_features IS 'Safety and moderation features enabled';
COMMENT ON COLUMN public.groups.cultural_focus IS 'Cultural aspects and activities focus';