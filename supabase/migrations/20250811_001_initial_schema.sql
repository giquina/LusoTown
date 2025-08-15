-- AdyaTribe Community Platform Initial Schema
-- Created: 2025-08-11

-- Enable necessary extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- Create profiles table for user data
create table public.profiles (
    id uuid references auth.users(id) on delete cascade primary key,
    email varchar(255) unique not null,
    first_name varchar(100) not null,
    last_name varchar(100),
    date_of_birth date not null,
    bio text,
    location varchar(255),
    verification_status varchar(20) default 'pending' check (verification_status in ('pending', 'verified', 'rejected')),
    verification_selfie_url varchar(500),
    profile_picture_url varchar(500),
    is_active boolean default true,
    membership_tier varchar(20) default 'free' check (membership_tier in ('free', 'core', 'premium')),
    stripe_customer_id varchar(255),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create interests table for predefined interests
create table public.interests (
    id uuid default uuid_generate_v4() primary key,
    name varchar(100) not null unique,
    category varchar(50) not null,
    description text,
    icon varchar(50),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create user_interests junction table
create table public.user_interests (
    user_id uuid references public.profiles(id) on delete cascade,
    interest_id uuid references public.interests(id) on delete cascade,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    primary key (user_id, interest_id)
);

-- Create groups table for interest-based communities
create table public.groups (
    id uuid default uuid_generate_v4() primary key,
    name varchar(255) not null,
    description text,
    group_type varchar(20) default 'interest' check (group_type in ('interest', 'location', 'activity')),
    category varchar(100),
    location varchar(255),
    is_private boolean default false,
    max_members integer,
    current_member_count integer default 0,
    created_by uuid references public.profiles(id) not null,
    image_url varchar(500),
    rules text,
    is_active boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create group_members table
create table public.group_members (
    group_id uuid references public.groups(id) on delete cascade,
    user_id uuid references public.profiles(id) on delete cascade,
    role varchar(20) default 'member' check (role in ('admin', 'moderator', 'member')),
    joined_at timestamp with time zone default timezone('utc'::text, now()) not null,
    is_active boolean default true,
    primary key (group_id, user_id)
);

-- Create events table
create table public.events (
    id uuid default uuid_generate_v4() primary key,
    title varchar(255) not null,
    description text,
    event_type varchar(50) not null check (event_type in ('online', 'in_person', 'hybrid')),
    location varchar(500),
    virtual_link varchar(500),
    start_datetime timestamp with time zone not null,
    end_datetime timestamp with time zone not null,
    max_attendees integer,
    current_attendee_count integer default 0,
    price decimal(10,2) default 0,
    currency varchar(3) default 'USD',
    group_id uuid references public.groups(id) on delete cascade,
    created_by uuid references public.profiles(id) not null,
    image_url varchar(500),
    is_featured boolean default false,
    status varchar(20) default 'active' check (status in ('active', 'cancelled', 'completed')),
    tags text[], -- Array of tags for searchability
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create event_attendees table
create table public.event_attendees (
    event_id uuid references public.events(id) on delete cascade,
    user_id uuid references public.profiles(id) on delete cascade,
    status varchar(20) default 'registered' check (status in ('registered', 'attended', 'no_show')),
    registered_at timestamp with time zone default timezone('utc'::text, now()) not null,
    notes text,
    primary key (event_id, user_id)
);

-- Create storage buckets for file uploads
insert into storage.buckets (id, name, public) values 
    ('profile-pictures', 'profile-pictures', true),
    ('verification-selfies', 'verification-selfies', false),
    ('group-images', 'group-images', true),
    ('event-images', 'event-images', true);

-- Set up Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.user_interests enable row level security;
alter table public.groups enable row level security;
alter table public.group_members enable row level security;
alter table public.events enable row level security;
alter table public.event_attendees enable row level security;

-- Profiles policies
create policy "Users can view their own profile" on public.profiles
    for select using (auth.uid() = id);

create policy "Users can update their own profile" on public.profiles
    for update using (auth.uid() = id);

create policy "Users can insert their own profile" on public.profiles
    for insert with check (auth.uid() = id);

-- Public read access for verified profiles (with limited info)
create policy "Verified profiles are publicly viewable" on public.profiles
    for select using (verification_status = 'verified' and is_active = true);

-- Groups policies
create policy "Groups are viewable by all authenticated users" on public.groups
    for select using (auth.role() = 'authenticated');

create policy "Group creators can update their groups" on public.groups
    for update using (auth.uid() = created_by);

create policy "Authenticated users can create groups" on public.groups
    for insert with check (auth.role() = 'authenticated');

-- Events policies
create policy "Events are viewable by all authenticated users" on public.events
    for select using (auth.role() = 'authenticated');

create policy "Event creators can update their events" on public.events
    for update using (auth.uid() = created_by);

create policy "Authenticated users can create events" on public.events
    for insert with check (auth.role() = 'authenticated');

-- Storage policies
create policy "Users can upload their own profile pictures"
on storage.objects for insert
with check (bucket_id = 'profile-pictures' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Profile pictures are publicly viewable"
on storage.objects for select
using (bucket_id = 'profile-pictures');

create policy "Users can update their own profile pictures"
on storage.objects for update
using (bucket_id = 'profile-pictures' and auth.uid()::text = (storage.foldername(name))[1]);

-- Verification selfies (private)
create policy "Users can upload their own verification selfies"
on storage.objects for insert
with check (bucket_id = 'verification-selfies' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Users can view their own verification selfies"
on storage.objects for select
using (bucket_id = 'verification-selfies' and auth.uid()::text = (storage.foldername(name))[1]);

-- Functions for updating timestamps
create or replace function handle_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- Triggers for updated_at
create trigger handle_updated_at before update on public.profiles
    for each row execute procedure handle_updated_at();

create trigger handle_updated_at before update on public.groups
    for each row execute procedure handle_updated_at();

create trigger handle_updated_at before update on public.events
    for each row execute procedure handle_updated_at();

-- Function to handle new user registration
create or replace function public.handle_new_user()
returns trigger as $$
begin
    insert into public.profiles (id, email, first_name, date_of_birth)
    values (new.id, new.email, '', '1990-01-01'); -- Will be updated during onboarding
    return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user registration
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();

-- Security Chauffeur Services Tables
create table public.chauffeur_services (
    id uuid default uuid_generate_v4() primary key,
    service_name varchar(255) not null,
    service_type varchar(50) not null check (service_type in ('executive', 'tourism', 'airport', 'events', 'business', 'personal')),
    description text,
    base_hourly_rate decimal(10,2) not null,
    minimum_hours integer default 2,
    day_rate decimal(10,2),
    minimum_day_hours integer default 8,
    call_out_fee decimal(10,2) default 0,
    peak_time_multiplier decimal(3,2) default 1.0,
    currency varchar(3) default 'GBP',
    is_active boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.chauffeur_vehicles (
    id uuid default uuid_generate_v4() primary key,
    make varchar(100) not null,
    model varchar(100) not null,
    year integer not null,
    category varchar(50) not null check (category in ('executive', 'luxury', 'premium', 'standard')),
    max_passengers integer not null,
    features text[], -- Array of features like 'wifi', 'refreshments', 'privacy_glass'
    image_url varchar(500),
    hourly_rate_premium decimal(10,2) default 0,
    is_active boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.chauffeur_drivers (
    id uuid default uuid_generate_v4() primary key,
    first_name varchar(100) not null,
    last_name varchar(100) not null,
    license_number varchar(100) unique not null,
    languages_spoken varchar(255)[], -- Array like ['portuguese', 'english', 'spanish']
    years_experience integer not null,
    specializations varchar(100)[], -- Array like ['tourism', 'executive', 'events']
    background_check_date date not null,
    profile_picture_url varchar(500),
    hourly_rate_premium decimal(10,2) default 0,
    is_active boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now') not null
);

create table public.chauffeur_pricing_tiers (
    id uuid default uuid_generate_v4() primary key,
    tier_name varchar(100) not null,
    block_hours_min integer not null, -- Minimum hours for this tier
    block_hours_max integer, -- Maximum hours (null = unlimited)
    discount_percentage decimal(5,2) not null, -- Discount off base rate
    description text,
    is_active boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.chauffeur_peak_times (
    id uuid default uuid_generate_v4() primary key,
    name varchar(100) not null,
    start_time time not null,
    end_time time not null,
    days_of_week integer[] not null, -- 0=Sunday, 1=Monday, etc.
    multiplier decimal(3,2) not null,
    description text,
    is_active boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now') not null
);

create table public.chauffeur_bookings (
    id uuid default uuid_generate_v4() primary key,
    booking_reference varchar(50) unique not null,
    customer_id uuid references public.profiles(id) not null,
    service_id uuid references public.chauffeur_services(id) not null,
    vehicle_id uuid references public.chauffeur_vehicles(id),
    driver_id uuid references public.chauffeur_drivers(id),
    
    -- Booking details
    booking_type varchar(50) not null check (booking_type in ('hourly', 'day_rate', 'block_booking', 'airport_transfer')),
    pickup_datetime timestamp with time zone not null,
    pickup_location varchar(500) not null,
    pickup_postcode varchar(20),
    dropoff_location varchar(500),
    dropoff_postcode varchar(20),
    
    -- Pricing details
    base_hours integer not null,
    actual_hours decimal(4,2),
    hourly_rate decimal(10,2) not null,
    day_rate_applied decimal(10,2),
    call_out_fee decimal(10,2) default 0,
    peak_time_charges decimal(10,2) default 0,
    block_discount_percentage decimal(5,2) default 0,
    vehicle_premium decimal(10,2) default 0,
    driver_premium decimal(10,2) default 0,
    subtotal decimal(10,2) not null,
    member_discount_percentage decimal(5,2) default 0,
    member_discount_amount decimal(10,2) default 0,
    total_amount decimal(10,2) not null,
    currency varchar(3) default 'GBP',
    
    -- Customer details
    customer_notes text,
    special_requirements text,
    passenger_count integer default 1,
    customer_phone varchar(50),
    customer_email varchar(255),
    
    -- Status tracking
    status varchar(50) default 'pending' check (status in ('pending', 'confirmed', 'assigned', 'in_progress', 'completed', 'cancelled', 'no_show')),
    payment_status varchar(50) default 'pending' check (payment_status in ('pending', 'paid', 'partial', 'refunded', 'failed')),
    payment_method varchar(50),
    stripe_payment_intent_id varchar(255),
    
    -- Timestamps
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    confirmed_at timestamp with time zone,
    completed_at timestamp with time zone
);

create table public.chauffeur_booking_extras (
    id uuid default uuid_generate_v4() primary key,
    booking_id uuid references public.chauffeur_bookings(id) on delete cascade not null,
    extra_type varchar(100) not null,
    description varchar(255) not null,
    quantity integer default 1,
    unit_price decimal(10,2) not null,
    total_price decimal(10,2) not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.chauffeur_availability (
    id uuid default uuid_generate_v4() primary key,
    driver_id uuid references public.chauffeur_drivers(id) on delete cascade,
    vehicle_id uuid references public.chauffeur_vehicles(id) on delete cascade,
    start_datetime timestamp with time zone not null,
    end_datetime timestamp with time zone not null,
    availability_type varchar(50) not null check (availability_type in ('available', 'busy', 'maintenance', 'unavailable')),
    notes text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add storage bucket for chauffeur service images
insert into storage.buckets (id, name, public) values 
    ('chauffeur-images', 'chauffeur-images', true);

-- Storage policies for chauffeur images
create policy "Chauffeur images are publicly viewable"
on storage.objects for select
using (bucket_id = 'chauffeur-images');

create policy "Authenticated users can upload chauffeur images"
on storage.objects for insert
with check (bucket_id = 'chauffeur-images' and auth.role() = 'authenticated');

-- Row Level Security for chauffeur tables
alter table public.chauffeur_services enable row level security;
alter table public.chauffeur_vehicles enable row level security;
alter table public.chauffeur_drivers enable row level security;
alter table public.chauffeur_pricing_tiers enable row level security;
alter table public.chauffeur_peak_times enable row level security;
alter table public.chauffeur_bookings enable row level security;
alter table public.chauffeur_booking_extras enable row level security;
alter table public.chauffeur_availability enable row level security;

-- Policies for chauffeur services (public read)
create policy "Chauffeur services are publicly viewable" on public.chauffeur_services
    for select using (is_active = true);

create policy "Chauffeur vehicles are publicly viewable" on public.chauffeur_vehicles
    for select using (is_active = true);

create policy "Chauffeur drivers are publicly viewable" on public.chauffeur_drivers
    for select using (is_active = true);

create policy "Pricing tiers are publicly viewable" on public.chauffeur_pricing_tiers
    for select using (is_active = true);

create policy "Peak times are publicly viewable" on public.chauffeur_peak_times
    for select using (is_active = true);

-- Booking policies
create policy "Users can create their own bookings" on public.chauffeur_bookings
    for insert with check (auth.uid() = customer_id);

create policy "Users can view their own bookings" on public.chauffeur_bookings
    for select using (auth.uid() = customer_id);

create policy "Users can update their pending bookings" on public.chauffeur_bookings
    for update using (auth.uid() = customer_id and status = 'pending');

-- Booking extras policies
create policy "Booking extras viewable by booking owner" on public.chauffeur_booking_extras
    for select using (
        booking_id in (
            select id from public.chauffeur_bookings 
            where customer_id = auth.uid()
        )
    );

-- Availability policies (read-only for customers)
create policy "Availability is publicly viewable" on public.chauffeur_availability
    for select using (availability_type = 'available');

-- Triggers for updated_at
create trigger handle_chauffeur_services_updated_at before update on public.chauffeur_services
    for each row execute procedure handle_updated_at();

create trigger handle_chauffeur_vehicles_updated_at before update on public.chauffeur_vehicles
    for each row execute procedure handle_updated_at();

create trigger handle_chauffeur_bookings_updated_at before update on public.chauffeur_bookings
    for each row execute procedure handle_updated_at();

-- Function to generate booking reference
create or replace function generate_booking_reference()
returns trigger as $$
begin
    new.booking_reference = 'CH' || to_char(now(), 'YYMMDD') || '-' || upper(substring(md5(random()::text) from 1 for 6));
    return new;
end;
$$ language plpgsql;

-- Trigger to auto-generate booking reference
create trigger generate_booking_reference_trigger
    before insert on public.chauffeur_bookings
    for each row execute procedure generate_booking_reference();

-- Comments for documentation
comment on table public.profiles is 'User profile information and verification status';
comment on table public.interests is 'Predefined interests for user selection and matching';
comment on table public.user_interests is 'Many-to-many relationship between users and their interests';
comment on table public.groups is 'Interest-based and location-based community groups';
comment on table public.group_members is 'Group membership and roles';
comment on table public.events is 'Community events and activities';
comment on table public.event_attendees is 'Event registration and attendance tracking';
comment on table public.chauffeur_services is 'Security chauffeur service types and pricing';
comment on table public.chauffeur_vehicles is 'Available vehicles for chauffeur services';
comment on table public.chauffeur_drivers is 'Licensed chauffeur drivers and their profiles';
comment on table public.chauffeur_bookings is 'Customer bookings for chauffeur services with complex pricing';