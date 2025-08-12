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

-- Comments for documentation
comment on table public.profiles is 'User profile information and verification status';
comment on table public.interests is 'Predefined interests for user selection and matching';
comment on table public.user_interests is 'Many-to-many relationship between users and their interests';
comment on table public.groups is 'Interest-based and location-based community groups';
comment on table public.group_members is 'Group membership and roles';
comment on table public.events is 'Community events and activities';
comment on table public.event_attendees is 'Event registration and attendance tracking';