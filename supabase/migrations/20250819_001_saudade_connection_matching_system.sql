-- Saudade Connection Matching System
-- Created: 2025-08-19
-- Purpose: Emotional matching algorithm for homesick Portuguese abroad with cultural comfort activities

-- Create saudade assessment table to capture emotional Portuguese connections
create table public.saudade_assessments (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.profiles(id) on delete cascade not null,
    
    -- Saudade Intensity Levels (0-10 scale)
    homeland_longing_intensity integer not null check (homeland_longing_intensity >= 0 and homeland_longing_intensity <= 10),
    family_connection_intensity integer not null check (family_connection_intensity >= 0 and family_connection_intensity <= 10),
    cultural_identity_intensity integer not null check (cultural_identity_intensity >= 0 and cultural_identity_intensity <= 10),
    language_nostalgia_intensity integer not null check (language_nostalgia_intensity >= 0 and language_nostalgia_intensity <= 10),
    food_memory_intensity integer not null check (food_memory_intensity >= 0 and food_memory_intensity <= 10),
    landscape_longing_intensity integer not null check (landscape_longing_intensity >= 0 and landscape_longing_intensity <= 10),
    
    -- Specific Saudade Triggers
    saudade_triggers text[] not null default '{}', -- ['fado_music', 'ocean_sounds', 'grandmother_cooking', 'village_festivals', 'childhood_friends']
    comfort_activities text[] not null default '{}', -- ['cooking_portuguese_food', 'listening_fado', 'calling_family', 'writing_poetry', 'watching_portuguese_tv']
    
    -- Homesickness Patterns
    strongest_saudade_times text[] not null default '{}', -- ['sunday_evenings', 'portuguese_holidays', 'family_celebrations', 'rainy_london_days']
    coping_mechanisms text[] not null default '{}', -- ['portuguese_community_events', 'cultural_music', 'traditional_cooking', 'video_calls_home']
    
    -- Support Preferences
    preferred_support_type varchar(50) not null check (
        preferred_support_type in ('group_sharing', 'one_on_one_connection', 'cultural_activities', 'professional_counseling', 'community_events')
    ),
    comfort_language_preference varchar(50) not null check (
        comfort_language_preference in ('portuguese_only', 'mixed_languages', 'english_with_portuguese_context')
    ),
    
    -- Calculated Saudade Profile
    overall_saudade_score integer generated always as (
        (homeland_longing_intensity + family_connection_intensity + cultural_identity_intensity + 
         language_nostalgia_intensity + food_memory_intensity + landscape_longing_intensity) / 6
    ) stored,
    saudade_type varchar(50) generated always as (
        case 
            when (homeland_longing_intensity + landscape_longing_intensity) / 2 >= 7 then 'geographic_saudade'
            when (family_connection_intensity + cultural_identity_intensity) / 2 >= 7 then 'relational_saudade'
            when (language_nostalgia_intensity + food_memory_intensity) / 2 >= 7 then 'cultural_saudade'
            else 'balanced_saudade'
        end
    ) stored,
    
    -- Metadata
    completed_at timestamp with time zone default timezone('utc'::text, now()) not null,
    last_updated timestamp with time zone default timezone('utc'::text, now()) not null,
    
    unique(user_id)
);

-- Create saudade support groups table
create table public.saudade_support_groups (
    id uuid default uuid_generate_v4() primary key,
    name_en varchar(255) not null,
    name_pt varchar(255) not null,
    description_en text not null,
    description_pt text not null,
    
    -- Group Configuration
    group_type varchar(50) not null check (
        group_type in ('weekly_circle', 'monthly_gathering', 'seasonal_celebration', 'crisis_support', 'cultural_workshop')
    ),
    saudade_focus varchar(50) not null check (
        saudade_focus in ('geographic_saudade', 'relational_saudade', 'cultural_saudade', 'all_types', 'new_arrivals')
    ),
    max_participants integer not null default 12 check (max_participants > 0 and max_participants <= 50),
    meeting_frequency varchar(30) not null check (
        meeting_frequency in ('weekly', 'bi_weekly', 'monthly', 'seasonal', 'on_demand')
    ),
    
    -- Location and Timing
    meeting_location_type varchar(30) not null check (
        meeting_location_type in ('portuguese_center', 'community_space', 'outdoor_location', 'online', 'rotating')
    ),
    venue_id uuid references public.portuguese_venues(id),
    preferred_meeting_times text[], -- ['sunday_afternoon', 'wednesday_evening', 'saturday_morning']
    
    -- Group Characteristics
    language_of_support varchar(50) not null check (
        language_of_support in ('portuguese_only', 'bilingual_flexible', 'english_with_portuguese_context')
    ),
    age_range_focus varchar(30) check (age_range_focus in ('young_adults', 'middle_age', 'seniors', 'all_ages', 'families')),
    requires_verification boolean default false,
    
    -- Group Status
    is_active boolean default true,
    current_participants_count integer default 0,
    facilitator_id uuid references public.profiles(id),
    created_by uuid references public.profiles(id) not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create cultural comfort activities table
create table public.cultural_comfort_activities (
    id uuid default uuid_generate_v4() primary key,
    activity_name_en varchar(255) not null,
    activity_name_pt varchar(255) not null,
    description_en text not null,
    description_pt text not null,
    
    -- Activity Classification
    activity_category varchar(50) not null check (
        activity_category in ('music_therapy', 'cooking_together', 'storytelling', 'art_creation', 'nature_connection', 'cultural_learning')
    ),
    comfort_level varchar(30) not null check (
        comfort_level in ('high_comfort', 'moderate_comfort', 'gentle_exploration', 'cultural_immersion')
    ),
    saudade_types_targeted text[] not null, -- Which types of saudade this activity helps with
    
    -- Activity Details
    duration_minutes integer not null check (duration_minutes > 0),
    group_size_min integer not null check (group_size_min >= 1),
    group_size_max integer not null check (group_size_max >= group_size_min),
    materials_needed text[],
    preparation_required boolean default false,
    
    -- Cultural Authenticity
    cultural_authenticity_level integer not null check (cultural_authenticity_level >= 1 and cultural_authenticity_level <= 5),
    regional_origin text[], -- Which Portuguese regions this activity comes from
    traditional_significance text,
    
    -- Facilitation
    requires_facilitator boolean default true,
    facilitator_skills_needed text[],
    can_be_peer_led boolean default false,
    
    -- Effectiveness Tracking
    comfort_effectiveness_rating decimal(3,2) default 0,
    participant_feedback_count integer default 0,
    
    is_active boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security
alter table public.saudade_assessments enable row level security;
alter table public.saudade_support_groups enable row level security;
alter table public.cultural_comfort_activities enable row level security;

-- RLS Policies
create policy "Users can manage their own saudade assessment" on public.saudade_assessments
    for all using (auth.uid() = user_id);

create policy "Public read access for active support groups" on public.saudade_support_groups
    for select using (is_active = true);

create policy "Public read access for active comfort activities" on public.cultural_comfort_activities
    for select using (is_active = true);

-- Indexes for performance
create index idx_saudade_assessments_user_id on public.saudade_assessments(user_id);
create index idx_saudade_assessments_score_type on public.saudade_assessments(overall_saudade_score, saudade_type);
create index idx_saudade_support_groups_active on public.saudade_support_groups(is_active, saudade_focus);
create index idx_cultural_comfort_activities_category on public.cultural_comfort_activities(activity_category, comfort_level);

-- Comments for documentation
comment on table public.saudade_assessments is 'Captures emotional longing and homesickness patterns of Portuguese-speaking community members for targeted support matching';
comment on table public.saudade_support_groups is 'Peer support groups focused on helping Portuguese speakers cope with saudade and cultural displacement';
comment on table public.cultural_comfort_activities is 'Therapeutic and comforting activities rooted in Portuguese cultural traditions for emotional support';