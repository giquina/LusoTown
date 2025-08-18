-- Portuguese Cultural Events System Enhancement
-- Created: 2025-08-18
-- Purpose: Enhance events system to be the primary driver for Portuguese community engagement

-- Add Portuguese cultural categories to events
alter table public.events add column if not exists cultural_category varchar(100);
alter table public.events add column if not exists portuguese_neighborhood varchar(100);
alter table public.events add column if not exists cultural_authenticity_score integer default 0 check (cultural_authenticity_score >= 0 and cultural_authenticity_score <= 100);
alter table public.events add column if not exists requires_portuguese_verification boolean default false;
alter table public.events add column if not exists partner_venue_id uuid;
alter table public.events add column if not exists fado_music_featured boolean default false;
alter table public.events add column if not exists santos_populares_themed boolean default false;
alter table public.events add column if not exists football_viewing_party boolean default false;
alter table public.events add column if not exists cultural_preservation_focus boolean default false;

-- Create Portuguese venues table for partnerships
create table public.portuguese_venues (
    id uuid default uuid_generate_v4() primary key,
    name varchar(255) not null,
    venue_type varchar(50) not null check (venue_type in ('restaurant', 'cultural_center', 'church', 'cafe', 'club', 'bakery', 'community_hall')),
    address varchar(500) not null,
    neighborhood varchar(100),
    contact_email varchar(255),
    contact_phone varchar(50),
    website_url varchar(500),
    verified_portuguese_owned boolean default false,
    authenticity_rating integer default 0 check (authenticity_rating >= 0 and authenticity_rating <= 5),
    specialties text[], -- Array of specialties like 'fado', 'pasteis', 'football'
    coordinates jsonb, -- {lat: number, lng: number}
    operating_hours jsonb, -- {monday: {open: '09:00', close: '18:00'}, ...}
    partnership_status varchar(20) default 'pending' check (partnership_status in ('pending', 'active', 'inactive')),
    partnership_tier varchar(20) default 'basic' check (partnership_tier in ('basic', 'premium', 'exclusive')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Portuguese cultural calendar table
create table public.portuguese_cultural_calendar (
    id uuid default uuid_generate_v4() primary key,
    name varchar(255) not null,
    description text,
    cultural_significance text,
    celebration_type varchar(50) not null check (celebration_type in ('religious', 'national', 'regional', 'traditional', 'community')),
    origin_region varchar(100), -- 'mainland_portugal', 'azores', 'madeira', 'brazil', 'diaspora'
    date_type varchar(20) not null check (date_type in ('fixed', 'variable', 'season')),
    celebration_date date, -- For fixed dates
    celebration_month integer, -- For variable/seasonal dates
    celebration_day integer, -- For variable dates (specific day of month)
    season varchar(20), -- 'spring', 'summer', 'autumn', 'winter'
    is_major_celebration boolean default false,
    london_participation_level integer default 0 check (london_participation_level >= 0 and london_participation_level <= 5),
    typical_activities text[],
    food_traditions text[],
    music_traditions text[],
    recommended_venues uuid[], -- Array of venue IDs
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create event matching preferences table
create table public.event_matching_preferences (
    user_id uuid references public.profiles(id) on delete cascade primary key,
    preferred_cultural_categories text[],
    preferred_neighborhoods text[],
    preferred_event_types text[], -- 'cultural', 'business', 'social', 'educational'
    preferred_group_sizes text[], -- 'intimate', 'small', 'medium', 'large'
    preferred_price_range jsonb, -- {min: number, max: number}
    preferred_days_of_week text[], -- ['monday', 'tuesday', ...]
    preferred_times_of_day text[], -- ['morning', 'afternoon', 'evening', 'night']
    fado_music_lover boolean default false,
    football_enthusiast boolean default false,
    cultural_preservation_interest boolean default false,
    business_networking_priority boolean default false,
    family_friendly_preference boolean default false,
    portuguese_language_priority boolean default false,
    notification_preferences jsonb, -- {email: boolean, app: boolean, sms: boolean}
    matching_radius_km integer default 25,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create event recommendations table
create table public.event_recommendations (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.profiles(id) on delete cascade,
    event_id uuid references public.events(id) on delete cascade,
    recommendation_score integer not null check (recommendation_score >= 0 and recommendation_score <= 100),
    recommendation_reasons text[],
    cultural_compatibility_score integer check (cultural_compatibility_score >= 0 and cultural_compatibility_score <= 100),
    location_compatibility_score integer check (location_compatibility_score >= 0 and location_compatibility_score <= 100),
    interest_compatibility_score integer check (interest_compatibility_score >= 0 and interest_compatibility_score <= 100),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(user_id, event_id)
);

-- Create RSVP verification table for Portuguese community events
create table public.event_rsvp_verification (
    id uuid default uuid_generate_v4() primary key,
    event_id uuid references public.events(id) on delete cascade,
    user_id uuid references public.profiles(id) on delete cascade,
    verification_method varchar(50) not null check (verification_method in ('community_voucher', 'previous_attendance', 'venue_partnership', 'host_approval')),
    verification_status varchar(20) default 'pending' check (verification_status in ('pending', 'verified', 'rejected')),
    verifier_id uuid references public.profiles(id), -- Who verified this user
    verification_notes text,
    verified_at timestamp with time zone,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(event_id, user_id)
);

-- Create business event creators table
create table public.business_event_creators (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.profiles(id) on delete cascade,
    business_name varchar(255) not null,
    business_type varchar(100) not null,
    portuguese_business_registry varchar(100), -- NIPC or equivalent
    business_description text,
    specializations text[],
    verification_status varchar(20) default 'pending' check (verification_status in ('pending', 'verified', 'rejected')),
    verification_documents_url text[],
    community_endorsements integer default 0,
    events_hosted_count integer default 0,
    average_event_rating decimal(3,2) default 0,
    can_host_cultural_events boolean default true,
    can_host_business_events boolean default true,
    partnership_tier varchar(20) default 'basic' check (partnership_tier in ('basic', 'verified', 'premium')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now') not null
);

-- Insert Portuguese cultural calendar events
insert into public.portuguese_cultural_calendar (name, description, cultural_significance, celebration_type, origin_region, date_type, celebration_date, is_major_celebration, london_participation_level, typical_activities, food_traditions, music_traditions) values
-- Major Portuguese celebrations
('Santos Populares', 'Popular Saints festivals celebrating Saint Anthony, Saint John, and Saint Peter', 'Major summer festivities marking Portuguese cultural identity and community gathering', 'traditional', 'mainland_portugal', 'fixed', '2025-06-13', true, 5, 
 array['street parties', 'grilled sardines', 'traditional dances', 'manjerico basil gifts', 'paper lanterns'], 
 array['grilled sardines', 'caldo verde', 'bifana', 'vinho verde', 'broa de milho'], 
 array['marchas populares', 'traditional folk music', 'accordion music']),

('Dia de Portugal', 'Portugal Day - National Day celebration', 'Celebration of Portuguese language, culture and communities worldwide', 'national', 'mainland_portugal', 'fixed', '2025-06-10', true, 5,
 array['flag ceremonies', 'cultural exhibitions', 'poetry readings', 'community gatherings', 'traditional food fairs'],
 array['francesinha', 'pastéis de nata', 'chouriço', 'queijo da serra', 'vinho do porto'],
 array['fado music', 'hymn performances', 'traditional folk songs']),

('Festa da Flor', 'Flower Festival from Madeira', 'Celebration of spring and Madeiran cultural traditions', 'regional', 'madeira', 'variable', null, false, 3,
 array['flower carpets', 'wall of hope', 'children''s parade', 'flower exhibitions'],
 array['bolo do caco', 'espada fish', 'poncha', 'honey cake'],
 array['madeiran folk music', 'traditional dances']),

('Carnaval', 'Portuguese Carnival celebrations', 'Pre-Lenten celebration with regional variations', 'traditional', 'mainland_portugal', 'variable', null, true, 4,
 array['costume parades', 'samba dancing', 'street performances', 'mask making workshops'],
 array['malasadas', 'filhós', 'chouriça doce', 'traditional sweets'],
 array['carnival music', 'samba', 'traditional percussion']),

('Festa do Divino Espírito Santo', 'Holy Spirit Festival', 'Azorean religious and cultural celebration', 'religious', 'azores', 'variable', null, true, 3,
 array['processions', 'sopas do espírito santo', 'crowning ceremonies', 'community meals'],
 array['sopas', 'massa sovada', 'linguiça', 'traditional bread'],
 array['hymns', 'traditional azorean music']),

-- London-specific Portuguese community events
('Festa Junina Londres', 'London Brazilian-Portuguese June Festival', 'Celebration bringing together all Lusophone communities in London', 'community', 'diaspora', 'fixed', '2025-06-21', false, 4,
 array['quadrilha dancing', 'traditional games', 'bonfire celebrations', 'flag ceremonies'],
 array['pamonha', 'quentão', 'pé de moleque', 'canjica'],
 array['forró music', 'traditional Portuguese folk', 'guitar performances']),

('Fado em Londres', 'Fado Music Nights in London', 'Monthly celebration of Portuguese soul music tradition', 'traditional', 'mainland_portugal', 'season', null, false, 5,
 array['fado performances', 'guitar workshops', 'poetry readings', 'cultural discussions'],
 array['petiscos', 'vinho tinto', 'queijo', 'enchidos'],
 array['fado vadio', 'guitar solos', 'traditional singing']);

-- Insert Portuguese neighborhoods in London
insert into public.portuguese_venues (name, venue_type, address, neighborhood, verified_portuguese_owned, authenticity_rating, specialties, partnership_status) values
('Nando''s Vauxhall', 'restaurant', 'Vauxhall Bridge Road, London SW1V', 'Vauxhall', true, 4, array['peri-peri chicken', 'portuguese spices'], 'active'),
('Bar do Fado', 'restaurant', 'St John Street, London EC1V', 'Clerkenwell', true, 5, array['fado music', 'traditional cuisine', 'authentic atmosphere'], 'active'),
('The Windmill Brixton', 'restaurant', 'Blenheim Gardens, London SW2', 'Brixton', false, 3, array['live music', 'community events'], 'pending'),
('Portuguese Centre', 'cultural_center', 'South Lambeth Road, London SW8', 'Stockwell', true, 5, array['cultural events', 'language classes', 'community meetings'], 'active'),
('Café Central', 'cafe', 'Golborne Road, London W10', 'North Kensington', true, 4, array['pastéis de nata', 'coffee culture', 'community gathering'], 'active'),
('Igreja de Nossa Senhora de Fátima', 'church', 'Harrow Road, London W10', 'North Kensington', true, 5, array['religious services', 'community events', 'cultural preservation'], 'active');

-- Add indexes for performance
create index if not exists idx_events_cultural_category on public.events(cultural_category);
create index if not exists idx_events_portuguese_neighborhood on public.events(portuguese_neighborhood);
create index if not exists idx_events_cultural_authenticity on public.events(cultural_authenticity_score);
create index if not exists idx_events_start_datetime on public.events(start_datetime);
create index if not exists idx_portuguese_venues_neighborhood on public.portuguese_venues(neighborhood);
create index if not exists idx_portuguese_venues_venue_type on public.portuguese_venues(venue_type);
create index if not exists idx_event_recommendations_user_score on public.event_recommendations(user_id, recommendation_score);
create index if not exists idx_event_rsvp_verification_event_status on public.event_rsvp_verification(event_id, verification_status);

-- Add RLS policies
alter table public.portuguese_venues enable row level security;
alter table public.portuguese_cultural_calendar enable row level security;
alter table public.event_matching_preferences enable row level security;
alter table public.event_recommendations enable row level security;
alter table public.event_rsvp_verification enable row level security;
alter table public.business_event_creators enable row level security;

-- Public read access for venues and cultural calendar
create policy "Public read access for portuguese venues" on public.portuguese_venues for select using (true);
create policy "Public read access for cultural calendar" on public.portuguese_cultural_calendar for select using (true);

-- User-specific access for preferences and recommendations
create policy "Users can view own event preferences" on public.event_matching_preferences for select using (auth.uid() = user_id);
create policy "Users can update own event preferences" on public.event_matching_preferences for update using (auth.uid() = user_id);
create policy "Users can insert own event preferences" on public.event_matching_preferences for insert with check (auth.uid() = user_id);

create policy "Users can view own event recommendations" on public.event_recommendations for select using (auth.uid() = user_id);

-- RSVP verification policies
create policy "Users can view own RSVP verifications" on public.event_rsvp_verification for select using (auth.uid() = user_id);
create policy "Event hosts can manage RSVP verifications" on public.event_rsvp_verification for all using (
    auth.uid() in (
        select created_by from public.events where id = event_id
    )
);

-- Business creator policies
create policy "Users can view own business creator profile" on public.business_event_creators for select using (auth.uid() = user_id);
create policy "Users can update own business creator profile" on public.business_event_creators for update using (auth.uid() = user_id);
create policy "Users can insert own business creator profile" on public.business_event_creators for insert with check (auth.uid() = user_id);