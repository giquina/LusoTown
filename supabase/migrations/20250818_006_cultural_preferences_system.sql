-- Cultural Preference Quiz and Matching System
-- Created: 2025-08-18

-- Create cultural preferences table to store user quiz results
create table public.cultural_preferences (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.profiles(id) on delete cascade not null,
    
    -- Portuguese Origins
    origins text[] not null default '{}', -- Array of origin regions
    
    -- Language Preferences
    language_preference varchar(50) not null check (
        language_preference in ('portuguese_first', 'bilingual', 'english_comfortable', 'learning')
    ),
    
    -- Cultural Celebrations and Elements
    cultural_celebrations text[] not null default '{}', -- Array of cultural elements they connect with
    
    -- Professional Goals
    professional_goals text[] not null default '{}', -- Array of professional networking intentions
    
    -- Cultural Values (stored as JSON with ratings 1-5)
    cultural_values jsonb not null default '{}', -- {value_name: rating}
    
    -- Lifestyle Preferences
    lifestyle_preferences text[] not null default '{}', -- Array of lifestyle descriptors
    
    -- Calculated Compatibility Metrics
    compatibility_score integer default 0 check (compatibility_score >= 0 and compatibility_score <= 100),
    cultural_depth_score integer default 0 check (cultural_depth_score >= 0 and cultural_depth_score <= 100),
    community_engagement_score integer default 0 check (community_engagement_score >= 0 and community_engagement_score <= 100),
    
    -- Quiz completion tracking
    completed_at timestamp with time zone default timezone('utc'::text, now()) not null,
    last_updated timestamp with time zone default timezone('utc'::text, now()) not null,
    quiz_version varchar(10) default '1.0' not null,
    
    -- Unique constraint - one preference profile per user
    unique(user_id)
);

-- Create cultural compatibility scores table for matching
create table public.cultural_compatibility (
    id uuid default uuid_generate_v4() primary key,
    user_a_id uuid references public.profiles(id) on delete cascade not null,
    user_b_id uuid references public.profiles(id) on delete cascade not null,
    
    -- Compatibility Scores by Category (0-100)
    origin_compatibility integer default 0 check (origin_compatibility >= 0 and origin_compatibility <= 100),
    language_compatibility integer default 0 check (language_compatibility >= 0 and language_compatibility <= 100),
    cultural_compatibility integer default 0 check (cultural_compatibility >= 0 and cultural_compatibility <= 100),
    professional_compatibility integer default 0 check (professional_compatibility >= 0 and professional_compatibility <= 100),
    values_compatibility integer default 0 check (values_compatibility >= 0 and values_compatibility <= 100),
    lifestyle_compatibility integer default 0 check (lifestyle_compatibility >= 0 and lifestyle_compatibility <= 100),
    
    -- Overall compatibility score (weighted average)
    overall_compatibility integer default 0 check (overall_compatibility >= 0 and overall_compatibility <= 100),
    
    -- Matching insights and reasons
    compatibility_insights text[], -- Array of reasons why they're compatible
    shared_elements text[], -- Specific shared cultural elements
    
    -- Metadata
    calculated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    last_updated timestamp with time zone default timezone('utc'::text, now()) not null,
    
    -- Constraints
    unique(user_a_id, user_b_id),
    check (user_a_id != user_b_id)
);

-- Create cultural matching insights table
create table public.cultural_insights (
    id uuid default uuid_generate_v4() primary key,
    insight_key varchar(100) not null unique,
    insight_name_en varchar(255) not null,
    insight_name_pt varchar(255) not null,
    insight_description_en text,
    insight_description_pt text,
    category varchar(50) not null check (
        category in ('origin', 'language', 'culture', 'professional', 'values', 'lifestyle')
    ),
    weight decimal(3,2) default 1.0 not null, -- Weight in compatibility calculation
    is_active boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Portuguese cultural elements reference table
create table public.portuguese_cultural_elements (
    id uuid default uuid_generate_v4() primary key,
    element_key varchar(100) not null unique,
    element_name_en varchar(255) not null,
    element_name_pt varchar(255) not null,
    element_description_en text,
    element_description_pt text,
    category varchar(50) not null check (
        category in ('celebration', 'tradition', 'art', 'music', 'food', 'religion', 'history', 'literature')
    ),
    popularity_score integer default 50 check (popularity_score >= 0 and popularity_score <= 100),
    regional_origin text[], -- Which Portuguese regions this element comes from
    emoji varchar(10),
    is_active boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security
alter table public.cultural_preferences enable row level security;
alter table public.cultural_compatibility enable row level security;
alter table public.cultural_insights enable row level security;
alter table public.portuguese_cultural_elements enable row level security;

-- Policies for cultural preferences
create policy "Users can manage their own cultural preferences" on public.cultural_preferences
    for all using (auth.uid() = user_id);

create policy "Users can view others' cultural preferences for matching" on public.cultural_preferences
    for select using (auth.role() = 'authenticated');

-- Policies for cultural compatibility
create policy "Users can view their own compatibility scores" on public.cultural_compatibility
    for select using (auth.uid() = user_a_id or auth.uid() = user_b_id);

create policy "System can manage compatibility scores" on public.cultural_compatibility
    for all using (auth.role() = 'authenticated');

-- Public read access for reference tables
create policy "Cultural insights are publicly readable" on public.cultural_insights
    for select using (is_active = true);

create policy "Portuguese cultural elements are publicly readable" on public.portuguese_cultural_elements
    for select using (is_active = true);

-- Triggers for updated_at
create trigger handle_cultural_preferences_updated_at before update on public.cultural_preferences
    for each row execute procedure handle_updated_at();

create trigger handle_cultural_compatibility_updated_at before update on public.cultural_compatibility
    for each row execute procedure handle_updated_at();

-- Insert default cultural insights
insert into public.cultural_insights (insight_key, insight_name_en, insight_name_pt, category, weight) values
    ('portugal_connection', 'Strong connection to mainland Portugal', 'Conexão forte com Portugal continental', 'origin', 1.2),
    ('fado_appreciation', 'Appreciates the soul of Fado', 'Aprecia a alma do Fado', 'culture', 1.1),
    ('bilingual_communicator', 'Fluent bilingual communicator', 'Comunicador bilíngue fluente', 'language', 1.0),
    ('cultural_enthusiast', 'Passionate about Portuguese culture', 'Apaixonado pela cultura portuguesa', 'culture', 1.3),
    ('community_connector', 'Natural community connector', 'Conector natural da comunidade', 'lifestyle', 1.0),
    ('tradition_keeper', 'Keeper of Portuguese traditions', 'Guardião das tradições portuguesas', 'values', 1.2),
    ('diaspora_bridge', 'Connects Portuguese diaspora communities', 'Conecta comunidades da diáspora portuguesa', 'professional', 1.1),
    ('family_values', 'Strong family and community values', 'Valores familiares e comunitários fortes', 'values', 1.0),
    ('cultural_ambassador', 'Cultural ambassador and educator', 'Embaixador e educador cultural', 'professional', 1.2);

-- Insert Portuguese cultural elements
insert into public.portuguese_cultural_elements (element_key, element_name_en, element_name_pt, category, popularity_score, regional_origin, emoji) values
    ('fado', 'Fado Music', 'Música de Fado', 'music', 85, '{"portugal", "lisbon", "coimbra"}', '🎵'),
    ('santos_populares', 'Santos Populares (June Festivals)', 'Santos Populares', 'celebration', 90, '{"portugal", "lisbon", "porto"}', '🎉'),
    ('football', 'Portuguese Football', 'Futebol Português', 'tradition', 95, '{"portugal"}', '⚽'),
    ('gastronomy', 'Portuguese Cuisine', 'Gastronomia Portuguesa', 'food', 90, '{"portugal", "azores", "madeira"}', '🧁'),
    ('christmas_traditions', 'Portuguese Christmas (December 24th)', 'Natal Português (24 de Dezembro)', 'celebration', 80, '{"portugal", "brazil"}', '🎄'),
    ('literature_poetry', 'Portuguese Literature & Poetry', 'Literatura e Poesia Portuguesa', 'literature', 60, '{"portugal"}', '📚'),
    ('religious_traditions', 'Religious Traditions & Pilgrimages', 'Tradições Religiosas e Romarias', 'religion', 75, '{"portugal"}', '⛪'),
    ('maritime_heritage', 'Maritime Heritage & Discoveries', 'Património Marítimo e Descobrimentos', 'history', 70, '{"portugal"}', '⛵'),
    ('folk_traditions', 'Folk Music & Regional Dances', 'Música Folclórica e Danças Regionais', 'music', 65, '{"portugal", "azores", "madeira"}', '💃'),
    ('crafts_arts', 'Traditional Crafts & Arts', 'Artesanato e Artes Tradicionais', 'art', 60, '{"portugal"}', '🎨');

-- Create function to calculate cultural compatibility
create or replace function calculate_cultural_compatibility(user_a_id uuid, user_b_id uuid)
returns table (
    origin_score integer,
    language_score integer,
    cultural_score integer,
    professional_score integer,
    values_score integer,
    lifestyle_score integer,
    overall_score integer,
    insights text[],
    shared_elements text[]
) language plpgsql as $$
declare
    prefs_a record;
    prefs_b record;
    origin_compatibility integer := 0;
    language_compatibility integer := 0;
    cultural_compatibility integer := 0;
    professional_compatibility integer := 0;
    values_compatibility integer := 0;
    lifestyle_compatibility integer := 0;
    overall_compatibility integer := 0;
    compatibility_insights text[] := '{}';
    shared_cultural_elements text[] := '{}';
begin
    -- Get cultural preferences for both users
    select * into prefs_a from public.cultural_preferences where user_id = user_a_id;
    select * into prefs_b from public.cultural_preferences where user_id = user_b_id;
    
    -- If either user hasn't completed preferences, return low compatibility
    if prefs_a is null or prefs_b is null then
        return query select 0, 0, 0, 0, 0, 0, 0, '{}'::text[], '{}'::text[];
        return;
    end if;
    
    -- Calculate origin compatibility (shared Portuguese regions)
    origin_compatibility := (
        select least(100, greatest(20, 
            cardinality(prefs_a.origins & prefs_b.origins) * 30 + 
            case when cardinality(prefs_a.origins & prefs_b.origins) > 0 then 40 else 0 end
        ))
    );
    
    -- Calculate language compatibility
    language_compatibility := case 
        when prefs_a.language_preference = prefs_b.language_preference then 100
        when prefs_a.language_preference = 'bilingual' or prefs_b.language_preference = 'bilingual' then 85
        when (prefs_a.language_preference = 'portuguese_first' and prefs_b.language_preference = 'english_comfortable') 
          or (prefs_a.language_preference = 'english_comfortable' and prefs_b.language_preference = 'portuguese_first') then 60
        else 40
    end;
    
    -- Calculate cultural compatibility (shared celebrations/traditions)
    cultural_compatibility := (
        select least(100, greatest(30, 
            cardinality(prefs_a.cultural_celebrations & prefs_b.cultural_celebrations) * 15 + 30
        ))
    );
    shared_cultural_elements := prefs_a.cultural_celebrations & prefs_b.cultural_celebrations;
    
    -- Calculate professional compatibility
    professional_compatibility := (
        select least(100, greatest(40, 
            cardinality(prefs_a.professional_goals & prefs_b.professional_goals) * 20 + 40
        ))
    );
    
    -- Calculate values compatibility (JSON comparison would be complex, simplified for now)
    values_compatibility := 70; -- Placeholder - would need more complex calculation
    
    -- Calculate lifestyle compatibility
    lifestyle_compatibility := (
        select least(100, greatest(30, 
            cardinality(prefs_a.lifestyle_preferences & prefs_b.lifestyle_preferences) * 20 + 30
        ))
    );
    
    -- Calculate weighted overall compatibility
    overall_compatibility := (
        origin_compatibility * 0.20 + 
        language_compatibility * 0.15 + 
        cultural_compatibility * 0.25 + 
        professional_compatibility * 0.15 + 
        values_compatibility * 0.15 + 
        lifestyle_compatibility * 0.10
    )::integer;
    
    -- Generate insights
    if origin_compatibility >= 70 then
        compatibility_insights := array_append(compatibility_insights, 'portugal_connection');
    end if;
    
    if 'fado' = any(shared_cultural_elements) then
        compatibility_insights := array_append(compatibility_insights, 'fado_appreciation');
    end if;
    
    if language_compatibility >= 85 then
        compatibility_insights := array_append(compatibility_insights, 'bilingual_communicator');
    end if;
    
    if cultural_compatibility >= 80 then
        compatibility_insights := array_append(compatibility_insights, 'cultural_enthusiast');
    end if;
    
    return query select 
        origin_compatibility,
        language_compatibility,
        cultural_compatibility,
        professional_compatibility,
        values_compatibility,
        lifestyle_compatibility,
        overall_compatibility,
        compatibility_insights,
        shared_cultural_elements;
end;
$$;

-- Create function to update user compatibility scores
create or replace function update_user_compatibility_scores(target_user_id uuid)
returns void language plpgsql as $$
declare
    other_user record;
    compatibility_result record;
begin
    -- Loop through all other users with cultural preferences
    for other_user in 
        select user_id from public.cultural_preferences 
        where user_id != target_user_id and user_id is not null
    loop
        -- Calculate compatibility
        select * into compatibility_result 
        from calculate_cultural_compatibility(target_user_id, other_user.user_id);
        
        -- Insert or update compatibility record
        insert into public.cultural_compatibility (
            user_a_id, user_b_id,
            origin_compatibility, language_compatibility, cultural_compatibility,
            professional_compatibility, values_compatibility, lifestyle_compatibility,
            overall_compatibility, compatibility_insights, shared_elements
        ) values (
            target_user_id, other_user.user_id,
            compatibility_result.origin_score, compatibility_result.language_score, 
            compatibility_result.cultural_score, compatibility_result.professional_score,
            compatibility_result.values_score, compatibility_result.lifestyle_score,
            compatibility_result.overall_score, compatibility_result.insights,
            compatibility_result.shared_elements
        ) on conflict (user_a_id, user_b_id) do update set
            origin_compatibility = excluded.origin_compatibility,
            language_compatibility = excluded.language_compatibility,
            cultural_compatibility = excluded.cultural_compatibility,
            professional_compatibility = excluded.professional_compatibility,
            values_compatibility = excluded.values_compatibility,
            lifestyle_compatibility = excluded.lifestyle_compatibility,
            overall_compatibility = excluded.overall_compatibility,
            compatibility_insights = excluded.compatibility_insights,
            shared_elements = excluded.shared_elements,
            last_updated = timezone('utc'::text, now());
            
        -- Also create the reverse relationship
        insert into public.cultural_compatibility (
            user_a_id, user_b_id,
            origin_compatibility, language_compatibility, cultural_compatibility,
            professional_compatibility, values_compatibility, lifestyle_compatibility,
            overall_compatibility, compatibility_insights, shared_elements
        ) values (
            other_user.user_id, target_user_id,
            compatibility_result.origin_score, compatibility_result.language_score, 
            compatibility_result.cultural_score, compatibility_result.professional_score,
            compatibility_result.values_score, compatibility_result.lifestyle_score,
            compatibility_result.overall_score, compatibility_result.insights,
            compatibility_result.shared_elements
        ) on conflict (user_a_id, user_b_id) do update set
            origin_compatibility = excluded.origin_compatibility,
            language_compatibility = excluded.language_compatibility,
            cultural_compatibility = excluded.cultural_compatibility,
            professional_compatibility = excluded.professional_compatibility,
            values_compatibility = excluded.values_compatibility,
            lifestyle_compatibility = excluded.lifestyle_compatibility,
            overall_compatibility = excluded.overall_compatibility,
            compatibility_insights = excluded.compatibility_insights,
            shared_elements = excluded.shared_elements,
            last_updated = timezone('utc'::text, now());
    end loop;
end;
$$;

-- Create trigger to update compatibility scores when preferences change
create or replace function trigger_compatibility_update()
returns trigger language plpgsql as $$
begin
    -- Update compatibility scores for this user
    perform update_user_compatibility_scores(NEW.user_id);
    return NEW;
end;
$$;

create trigger update_compatibility_on_preferences_change
    after insert or update on public.cultural_preferences
    for each row execute procedure trigger_compatibility_update();

-- Comments for documentation
comment on table public.cultural_preferences is 'Stores user cultural preference quiz results for Portuguese community matching';
comment on table public.cultural_compatibility is 'Calculated compatibility scores between Portuguese community members';
comment on table public.cultural_insights is 'Reference table for cultural matching insights and explanations';
comment on table public.portuguese_cultural_elements is 'Reference table for Portuguese cultural elements used in matching';
comment on function calculate_cultural_compatibility(uuid, uuid) is 'Calculates cultural compatibility scores between two users';
comment on function update_user_compatibility_scores(uuid) is 'Updates all compatibility scores for a given user';