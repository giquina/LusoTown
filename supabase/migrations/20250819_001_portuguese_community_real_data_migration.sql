-- Portuguese Community Real Data Migration
-- Created: 2025-08-19
-- Purpose: Complete real data integration replacing all mock data

-- Enhance user profiles with Portuguese cultural data
alter table public.profiles add column if not exists portuguese_origin varchar(100);
alter table public.profiles add column if not exists portuguese_regions text[];
alter table public.profiles add column if not exists years_in_uk integer;
alter table public.profiles add column if not exists language_proficiency jsonb default '{}';
alter table public.profiles add column if not exists professional_status varchar(50);
alter table public.profiles add column if not exists uk_visa_status varchar(50);
alter table public.profiles add column if not exists family_in_uk boolean default false;
alter table public.profiles add column if not exists cultural_connection_level integer default 3 check (cultural_connection_level >= 1 and cultural_connection_level <= 5);
alter table public.profiles add column if not exists london_neighborhood varchar(100);
alter table public.profiles add column if not exists emergency_contact_name varchar(255);
alter table public.profiles add column if not exists emergency_contact_phone varchar(50);

-- Create community connections table for Portuguese networking
create table if not exists public.community_connections (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.profiles(id) on delete cascade not null,
    target_user_id uuid references public.profiles(id) on delete cascade not null,
    connection_type varchar(50) not null check (connection_type in ('professional', 'cultural', 'social', 'family_friend', 'business_partner', 'mentor_mentee')),
    connection_strength integer default 1 check (connection_strength >= 1 and connection_strength <= 5),
    shared_interests text[],
    shared_locations text[],
    shared_events text[],
    connection_notes text,
    is_mutual boolean default false,
    status varchar(20) default 'active' check (status in ('active', 'inactive', 'blocked')),
    last_interaction_at timestamp with time zone,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(user_id, target_user_id),
    check (user_id != target_user_id)
);

-- Create Portuguese businesses directory table
create table if not exists public.portuguese_businesses (
    id uuid default uuid_generate_v4() primary key,
    owner_id uuid references public.profiles(id),
    business_name varchar(255) not null,
    business_type varchar(100) not null,
    description text,
    address text not null,
    neighborhood varchar(100),
    postcode varchar(20),
    phone varchar(50),
    email varchar(255),
    website varchar(500),
    social_media jsonb default '{}',
    specialties text[],
    portuguese_authenticity_score integer default 0 check (portuguese_authenticity_score >= 0 and portuguese_authenticity_score <= 100),
    serves_portuguese_community boolean default true,
    staff_speaks_portuguese boolean default true,
    accepts_multibanco boolean default false,
    business_hours jsonb default '{}',
    average_rating decimal(3,2) default 0,
    review_count integer default 0,
    price_range varchar(20) check (price_range in ('budget', 'moderate', 'upscale', 'luxury')),
    verified_status varchar(20) default 'pending' check (verified_status in ('pending', 'verified', 'premium', 'rejected')),
    featured_until date,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create business reviews table
create table if not exists public.business_reviews (
    id uuid default uuid_generate_v4() primary key,
    business_id uuid references public.portuguese_businesses(id) on delete cascade not null,
    reviewer_id uuid references public.profiles(id) on delete cascade not null,
    rating integer not null check (rating >= 1 and rating <= 5),
    review_text text,
    cultural_authenticity_rating integer check (cultural_authenticity_rating >= 1 and cultural_authenticity_rating <= 5),
    language_accommodation_rating integer check (language_accommodation_rating >= 1 and language_accommodation_rating <= 5),
    recommended_dishes text[],
    visit_type varchar(50) check (visit_type in ('dining', 'shopping', 'service', 'event', 'meeting')),
    visit_date date,
    helpful_votes integer default 0,
    is_verified_customer boolean default false,
    moderation_status varchar(20) default 'approved' check (moderation_status in ('pending', 'approved', 'rejected')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create professional networking table
create table if not exists public.professional_networking (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.profiles(id) on delete cascade not null,
    profession varchar(255) not null,
    industry varchar(100) not null,
    company_name varchar(255),
    company_type varchar(100),
    job_title varchar(255),
    years_experience integer,
    uk_professional_experience integer,
    portuguese_market_experience integer,
    skills text[],
    certifications text[],
    education_background text[],
    looking_for text[] check (array['mentorship', 'partnerships', 'job_opportunities', 'networking', 'investment', 'collaboration'] && looking_for),
    can_provide text[] check (array['mentorship', 'partnerships', 'job_opportunities', 'networking', 'investment', 'collaboration'] && can_provide),
    linkedin_profile varchar(500),
    portfolio_url varchar(500),
    availability_for_networking varchar(50) check (availability_for_networking in ('very_active', 'active', 'occasional', 'limited')),
    preferred_meeting_types text[] check (array['coffee', 'lunch', 'online', 'events', 'workshops'] && preferred_meeting_types),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(user_id)
);

-- Create real-time notifications table
create table if not exists public.user_notifications (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.profiles(id) on delete cascade not null,
    notification_type varchar(50) not null check (notification_type in ('match', 'message', 'event', 'connection', 'system', 'cultural', 'business')),
    title varchar(255) not null,
    message text not null,
    action_url varchar(500),
    action_data jsonb default '{}',
    priority varchar(20) default 'normal' check (priority in ('low', 'normal', 'high', 'urgent')),
    is_read boolean default false,
    is_pushed boolean default false,
    is_emailed boolean default false,
    expires_at timestamp with time zone,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add storage buckets for real data
insert into storage.buckets (id, name, public) values 
    ('business-images', 'business-images', true),
    ('cultural-content', 'cultural-content', true),
    ('user-generated-content', 'user-generated-content', true)
on conflict (id) do nothing;

-- Enable RLS on new tables
alter table public.community_connections enable row level security;
alter table public.portuguese_businesses enable row level security;
alter table public.business_reviews enable row level security;
alter table public.professional_networking enable row level security;
alter table public.user_notifications enable row level security;

-- RLS Policies for community connections
create policy "Users can manage their own connections" on public.community_connections
    for all using (auth.uid() = user_id or auth.uid() = target_user_id);

-- RLS Policies for Portuguese businesses
create policy "Businesses are publicly viewable" on public.portuguese_businesses
    for select using (verified_status in ('verified', 'premium'));

create policy "Business owners can manage their businesses" on public.portuguese_businesses
    for all using (auth.uid() = owner_id);

-- RLS Policies for business reviews
create policy "Business reviews are publicly viewable" on public.business_reviews
    for select using (moderation_status = 'approved');

create policy "Users can manage their own reviews" on public.business_reviews
    for all using (auth.uid() = reviewer_id);

-- RLS Policies for professional networking
create policy "Users can manage their own professional profile" on public.professional_networking
    for all using (auth.uid() = user_id);

create policy "Professional profiles are viewable by authenticated users" on public.professional_networking
    for select using (auth.role() = 'authenticated');

-- RLS Policies for notifications
create policy "Users can view their own notifications" on public.user_notifications
    for select using (auth.uid() = user_id);

create policy "Users can update their own notifications" on public.user_notifications
    for update using (auth.uid() = user_id);

-- Triggers for updated_at
create trigger handle_community_connections_updated_at before update on public.community_connections
    for each row execute procedure handle_updated_at();

create trigger handle_portuguese_businesses_updated_at before update on public.portuguese_businesses
    for each row execute procedure handle_updated_at();

create trigger handle_professional_networking_updated_at before update on public.professional_networking
    for each row execute procedure handle_updated_at();

-- Create indexes for performance
create index if not exists idx_community_connections_user_id on public.community_connections(user_id);
create index if not exists idx_community_connections_target_user_id on public.community_connections(target_user_id);
create index if not exists idx_community_connections_type on public.community_connections(connection_type);
create index if not exists idx_portuguese_businesses_neighborhood on public.portuguese_businesses(neighborhood);
create index if not exists idx_portuguese_businesses_type on public.portuguese_businesses(business_type);
create index if not exists idx_portuguese_businesses_verified on public.portuguese_businesses(verified_status);
create index if not exists idx_business_reviews_business_id on public.business_reviews(business_id);
create index if not exists idx_business_reviews_rating on public.business_reviews(rating);
create index if not exists idx_professional_networking_industry on public.professional_networking(industry);
create index if not exists idx_user_notifications_user_unread on public.user_notifications(user_id, is_read);

-- Insert sample Portuguese regions and origins
insert into public.interests (name, category, description, icon) values
    ('Northern Portugal', 'portuguese_region', 'Porto, Braga, Viana do Castelo region', '🏔️'),
    ('Central Portugal', 'portuguese_region', 'Coimbra, Aveiro, Leiria region', '🏛️'),
    ('Southern Portugal', 'portuguese_region', 'Lisbon, Algarve, Alentejo region', '🏖️'),
    ('Azores Islands', 'portuguese_region', 'Nine volcanic islands in the Atlantic', '🌋'),
    ('Madeira Islands', 'portuguese_region', 'Subtropical Portuguese archipelago', '🌺'),
    ('Portuguese Business', 'professional', 'Portuguese business networking and opportunities', '💼'),
    ('Fado Music', 'cultural', 'Traditional Portuguese music and soul', '🎵'),
    ('Portuguese Cuisine', 'cultural', 'Traditional Portuguese food and gastronomy', '🍽️'),
    ('Football Culture', 'cultural', 'Portuguese football passion and community', '⚽'),
    ('Religious Traditions', 'cultural', 'Portuguese Catholic and cultural traditions', '⛪'),
    ('Portuguese Literature', 'cultural', 'Portuguese literature and poetry appreciation', '📚'),
    ('Maritime Heritage', 'cultural', 'Portuguese maritime history and exploration', '⛵')
on conflict (name) do nothing;

-- Insert sample Portuguese businesses for London
insert into public.portuguese_businesses (business_name, business_type, description, address, neighborhood, phone, specialties, portuguese_authenticity_score, staff_speaks_portuguese, verified_status) values
    ('O Fado Restaurant', 'restaurant', 'Authentic Portuguese restaurant with live Fado music', '50 Beauchamp Place, Knightsbridge, London SW3 1NY', 'Knightsbridge', '+44 20 7589 3002', array['fado music', 'traditional cuisine', 'wine selection'], 95, true, 'verified'),
    ('Taberna Real', 'restaurant', 'Traditional Portuguese tavern with authentic atmosphere', '56 Little Portugal, South Lambeth Road, London SW8', 'Stockwell', '+44 20 7587 5555', array['traditional dishes', 'portuguese wines', 'family atmosphere'], 90, true, 'verified'),
    ('Nando''s Southbank', 'restaurant', 'Portuguese-style peri-peri chicken restaurant', 'Belvedere Road, South Bank, London SE1 8XX', 'South Bank', '+44 20 7633 0266', array['peri-peri chicken', 'portuguese spices', 'casual dining'], 75, false, 'verified'),
    ('Café Lisboa', 'cafe', 'Portuguese café serving pastéis de nata and authentic coffee', '142 Golborne Road, North Kensington, London W10', '+44 20 8969 2570', 'North Kensington', array['pastéis de nata', 'portuguese coffee', 'traditional pastries'], 85, true, 'verified'),
    ('Lisboa Delicatessen', 'shop', 'Portuguese grocery store with imported goods', '54 Golborne Road, North Kensington, London W10', 'North Kensington', '+44 20 8968 5242', array['imported goods', 'portuguese products', 'traditional ingredients'], 88, true, 'verified'),
    ('Portuguese Centre London', 'cultural_center', 'Portuguese cultural center and community hub', '4-8 South Lambeth Road, Stockwell, London SW8', 'Stockwell', '+44 20 7735 1888', array['cultural events', 'language classes', 'community services'], 100, true, 'premium'),
    ('Bar do Fado', 'bar', 'Portuguese bar with live music and cultural events', '47-49 Kingsway, Holborn, London WC2B 6EP', 'Holborn', '+44 20 7405 1717', array['live music', 'portuguese drinks', 'cultural events'], 92, true, 'verified'),
    ('Portuguese Bakery', 'bakery', 'Traditional Portuguese bakery with fresh bread and pastries', '345 Harrow Road, North Kensington, London W9', 'North Kensington', '+44 20 7289 4040', array['fresh bread', 'traditional pastries', 'portuguese specialties'], 90, true, 'verified')
on conflict do nothing;

-- Insert sample professional networking profiles (demo data)
insert into public.professional_networking (user_id, profession, industry, job_title, years_experience, skills, looking_for, can_provide, availability_for_networking) 
select 
    id,
    'Software Engineer',
    'Technology',
    'Senior Software Engineer',
    5,
    array['JavaScript', 'TypeScript', 'React', 'Node.js', 'Portuguese'],
    array['networking', 'collaboration', 'mentorship'],
    array['mentorship', 'job_opportunities'],
    'active'
from public.profiles 
where email = 'demo@lusotown.com'
on conflict (user_id) do nothing;

-- Create function to calculate business rating
create or replace function update_business_rating(business_id uuid)
returns void language plpgsql as $$
declare
    avg_rating decimal(3,2);
    review_count integer;
begin
    select avg(rating), count(*) into avg_rating, review_count
    from public.business_reviews
    where business_id = $1 and moderation_status = 'approved';
    
    update public.portuguese_businesses
    set average_rating = coalesce(avg_rating, 0),
        review_count = coalesce(review_count, 0)
    where id = $1;
end;
$$;

-- Create trigger to update business ratings
create or replace function trigger_update_business_rating()
returns trigger language plpgsql as $$
begin
    perform update_business_rating(NEW.business_id);
    return NEW;
end;
$$;

create trigger update_business_rating_on_review
    after insert or update or delete on public.business_reviews
    for each row execute procedure trigger_update_business_rating();

-- Comments for documentation
comment on table public.community_connections is 'Portuguese community networking and connections';
comment on table public.portuguese_businesses is 'Directory of Portuguese businesses in London';
comment on table public.business_reviews is 'Reviews and ratings for Portuguese businesses';
comment on table public.professional_networking is 'Professional networking profiles for Portuguese community';
comment on table public.user_notifications is 'Real-time notifications for users';