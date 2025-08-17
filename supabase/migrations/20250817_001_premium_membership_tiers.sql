-- Add premium membership tiers to LusoTown subscription system
-- Migration: 20250817_001_premium_membership_tiers
-- Execute this manually in your Supabase SQL editor

-- Add tier column to subscriptions table
do $$ 
begin
    if not exists (
        select 1 from information_schema.columns 
        where table_name = 'subscriptions' 
        and column_name = 'tier'
    ) then
        alter table public.subscriptions 
        add column tier varchar(50) not null default 'bronze' check (tier in ('bronze', 'silver', 'gold', 'platinum'));
    end if;
end $$;

-- Create membership_benefits table for tier-specific benefits
create table if not exists public.membership_benefits (
    id uuid default uuid_generate_v4() primary key,
    tier varchar(50) not null check (tier in ('bronze', 'silver', 'gold', 'platinum')),
    benefit_type varchar(50) not null check (benefit_type in ('service_discount', 'cultural_events', 'business_networking', 'concierge_support', 'premium_access')),
    benefit_name varchar(255) not null,
    benefit_description text,
    benefit_value varchar(100), -- e.g., "10%", "unlimited", "priority"
    is_active boolean default true,
    sort_order integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create membership_usage table for tracking tier usage
create table if not exists public.membership_usage (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.profiles(id) on delete cascade not null,
    subscription_id uuid references public.subscriptions(id) on delete cascade not null,
    benefit_type varchar(50) not null,
    usage_date timestamp with time zone default timezone('utc'::text, now()) not null,
    service_type varchar(100), -- 'transport', 'cultural_tour', 'business_event', etc.
    discount_applied decimal(5,2), -- percentage discount applied
    amount_saved decimal(10,2), -- actual amount saved
    notes text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create portuguese_community_partnerships table
create table if not exists public.portuguese_community_partnerships (
    id uuid default uuid_generate_v4() primary key,
    partner_name varchar(255) not null,
    partner_type varchar(100) not null check (partner_type in ('chamber_of_commerce', 'cultural_institute', 'business_association', 'community_organization')),
    partnership_description text,
    member_benefits text,
    required_tier varchar(50) check (required_tier in ('bronze', 'silver', 'gold', 'platinum')),
    contact_info jsonb,
    is_active boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Insert default membership benefits for each tier
INSERT INTO public.membership_benefits (tier, benefit_type, benefit_name, benefit_description, benefit_value, sort_order) VALUES
-- Bronze Tier (£3,000/year)
('bronze', 'cultural_events', 'Quarterly Cultural Tours', 'Exclusive quarterly cultural tours highlighting Portuguese heritage in London & UK', 'quarterly', 1),
('bronze', 'premium_access', 'Priority Event Booking', 'Priority booking for all LusoTown cultural events and experiences', 'priority', 2),
('bronze', 'service_discount', 'Service Discounts', 'Receive 10% discount on all premium transport and concierge services', '10%', 3),
('bronze', 'business_networking', 'Community Directory Access', 'Access to Portuguese business and professional directory', 'full_access', 4),

-- Silver Tier (£6,000/year)
('silver', 'cultural_events', 'Monthly Cultural Tours', 'Monthly exclusive cultural tours and heritage experiences', 'monthly', 1),
('silver', 'concierge_support', 'Dedicated Relationship Manager', 'Personal relationship manager for all your community needs', 'dedicated', 2),
('silver', 'service_discount', 'Enhanced Service Discounts', 'Receive 15% discount on all premium services', '15%', 3),
('silver', 'business_networking', 'Portuguese Chamber Access', 'Access to Portuguese Chamber of Commerce networking events', 'chamber_access', 4),
('silver', 'premium_access', 'Member Directory Listing', 'Featured listing in exclusive member business directory', 'featured_listing', 5),

-- Gold Tier (£12,000/year)
('gold', 'cultural_events', 'All Exclusive Events', 'Access to all LusoTown cultural events and VIP experiences', 'unlimited', 1),
('gold', 'concierge_support', 'Personal Concierge Support', 'Dedicated personal concierge for cultural and business needs', 'personal', 2),
('gold', 'service_discount', 'Premium Service Discounts', 'Receive 20% discount on all services', '20%', 3),
('gold', 'business_networking', 'Executive Business Network', 'Access to executive-level Portuguese business networking', 'executive', 4),
('gold', 'premium_access', 'Instituto Camões Partnership', 'Exclusive access to Instituto Camões cultural programs', 'institute_access', 5),

-- Platinum Tier (£15,000/year)
('platinum', 'cultural_events', 'VIP Cultural Experiences', 'Exclusive VIP cultural experiences and private events', 'vip_unlimited', 1),
('platinum', 'concierge_support', 'Personal Account Manager', 'Dedicated personal account manager for all services', 'account_manager', 2),
('platinum', 'service_discount', 'Maximum Service Discounts', 'Receive 25% discount on all premium services', '25%', 3),
('platinum', 'business_networking', 'Platinum Business Network', 'Access to highest-level Portuguese business networking', 'platinum_network', 4),
('platinum', 'premium_access', 'Exclusive Partnership Benefits', 'Access to all exclusive Portuguese community partnerships', 'all_partnerships', 5);

-- Insert Portuguese community partnerships
INSERT INTO public.portuguese_community_partnerships (partner_name, partner_type, partnership_description, member_benefits, required_tier, contact_info) VALUES
('Portuguese Chamber of Commerce UK', 'chamber_of_commerce', 'Official partnership with Portuguese Chamber of Commerce for business networking and professional development', 'Access to chamber events, business networking, professional development workshops', 'silver', '{"email": "info@portuguesechamber.co.uk", "website": "https://portuguesechamber.co.uk"}'),
('Instituto Camões London', 'cultural_institute', 'Cultural partnership for Portuguese language and heritage preservation', 'Cultural workshops, language classes, heritage preservation programs', 'gold', '{"email": "london@instituto-camoes.pt", "website": "https://instituto-camoes.pt"}'),
('Anglo-Portuguese Society', 'community_organization', 'Historic society promoting Portuguese-British cultural exchange', 'Cultural events, networking opportunities, historical programs', 'bronze', '{"email": "info@angloportuguesesociety.org.uk", "website": "https://angloportuguesesociety.org.uk"}'),
('Portuguese Business Association London', 'business_association', 'Professional association for Portuguese entrepreneurs and business leaders', 'Business development, mentorship, networking events', 'silver', '{"email": "contact@pbalondon.org", "website": "https://pbalondon.org"}');

-- Enable Row Level Security
alter table public.membership_benefits enable row level security;
alter table public.membership_usage enable row level security;
alter table public.portuguese_community_partnerships enable row level security;

-- Membership benefits policies (read-only for all authenticated users)
create policy "Anyone can view membership benefits" on public.membership_benefits
    for select using (auth.role() = 'authenticated');

-- Membership usage policies (users can only see their own usage)
create policy "Users can view their own membership usage" on public.membership_usage
    for select using (user_id = auth.uid());

create policy "Users can insert their own membership usage" on public.membership_usage
    for insert with check (user_id = auth.uid());

-- Partnership policies (read-only for all authenticated users)
create policy "Anyone can view community partnerships" on public.portuguese_community_partnerships
    for select using (auth.role() = 'authenticated');

-- Triggers for updated_at
create trigger handle_membership_benefits_updated_at before update on public.membership_benefits
    for each row execute procedure handle_updated_at();

create trigger handle_portuguese_community_partnerships_updated_at before update on public.portuguese_community_partnerships
    for each row execute procedure handle_updated_at();

-- Function to get user's current membership tier
create or replace function public.get_user_membership_tier(user_uuid uuid)
returns varchar(50) as $$
declare
    user_tier varchar(50) := 'none';
begin
    -- Check for active subscription and get tier
    select tier into user_tier
    from public.subscriptions 
    where user_id = user_uuid 
    and status = 'active' 
    and current_period_end > now()
    limit 1;
    
    return coalesce(user_tier, 'none');
end;
$$ language plpgsql security definer;

-- Function to calculate service discount for user
create or replace function public.get_user_service_discount(user_uuid uuid)
returns decimal(5,2) as $$
declare
    user_tier varchar(50);
    discount_percentage decimal(5,2) := 0;
begin
    user_tier := public.get_user_membership_tier(user_uuid);
    
    case user_tier
        when 'bronze' then discount_percentage := 10.00;
        when 'silver' then discount_percentage := 15.00;
        when 'gold' then discount_percentage := 20.00;
        when 'platinum' then discount_percentage := 25.00;
        else discount_percentage := 0.00;
    end case;
    
    return discount_percentage;
end;
$$ language plpgsql security definer;

-- Function to track membership benefit usage
create or replace function public.track_membership_usage(
    user_uuid uuid,
    benefit_type_param varchar(50),
    service_type_param varchar(100),
    discount_applied_param decimal(5,2) default 0,
    amount_saved_param decimal(10,2) default 0,
    notes_param text default null
)
returns uuid as $$
declare
    usage_id uuid;
    user_subscription_id uuid;
begin
    -- Get user's current subscription
    select id into user_subscription_id
    from public.subscriptions 
    where user_id = user_uuid 
    and status = 'active' 
    and current_period_end > now()
    limit 1;
    
    if user_subscription_id is null then
        raise exception 'User does not have an active subscription';
    end if;
    
    -- Insert usage record
    insert into public.membership_usage (
        user_id, 
        subscription_id, 
        benefit_type, 
        service_type, 
        discount_applied, 
        amount_saved, 
        notes
    ) values (
        user_uuid,
        user_subscription_id,
        benefit_type_param,
        service_type_param,
        discount_applied_param,
        amount_saved_param,
        notes_param
    ) returning id into usage_id;
    
    return usage_id;
end;
$$ language plpgsql security definer;

-- Comments for documentation
comment on table public.membership_benefits is 'Tier-specific benefits for LusoTown premium membership system';
comment on table public.membership_usage is 'Tracking usage of membership benefits for analytics and reporting';
comment on table public.portuguese_community_partnerships is 'Portuguese community organization partnerships and member benefits';
comment on function public.get_user_membership_tier is 'Get user''s current membership tier';
comment on function public.get_user_service_discount is 'Calculate service discount percentage based on membership tier';
comment on function public.track_membership_usage is 'Track usage of membership benefits for reporting and analytics';