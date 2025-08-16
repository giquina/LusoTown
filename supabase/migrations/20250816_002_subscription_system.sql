-- Add subscription system for LusoTown mandatory £25/year membership
-- Migration: 20250816_002_subscription_system
-- Execute this manually in your Supabase SQL editor

-- Create subscriptions table
create table if not exists public.subscriptions (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.profiles(id) on delete cascade not null,
    stripe_subscription_id varchar(255) unique,
    stripe_customer_id varchar(255),
    status varchar(50) not null default 'inactive' check (status in ('active', 'inactive', 'cancelled', 'past_due', 'trialing')),
    plan_type varchar(50) not null default 'yearly' check (plan_type in ('yearly')),
    current_period_start timestamp with time zone,
    current_period_end timestamp with time zone,
    trial_end timestamp with time zone,
    amount decimal(10,2) not null default 25.00,
    currency varchar(3) default 'GBP',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create subscription_payments table for payment tracking
create table if not exists public.subscription_payments (
    id uuid default uuid_generate_v4() primary key,
    subscription_id uuid references public.subscriptions(id) on delete cascade not null,
    stripe_payment_intent_id varchar(255) unique,
    amount decimal(10,2) not null,
    currency varchar(3) default 'GBP',
    status varchar(50) not null check (status in ('succeeded', 'failed', 'pending', 'cancelled')),
    payment_method_type varchar(50),
    receipt_url varchar(500),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create subscription_trials table for tracking trial periods
create table if not exists public.subscription_trials (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.profiles(id) on delete cascade not null unique,
    trial_start timestamp with time zone default timezone('utc'::text, now()) not null,
    trial_end timestamp with time zone not null,
    is_used boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add subscription_status to profiles table (if column doesn't exist)
do $$
begin
    if not exists (select 1 from information_schema.columns where table_name = 'profiles' and column_name = 'subscription_status') then
        alter table public.profiles 
        add column subscription_status varchar(50) default 'none' check (subscription_status in ('none', 'trial', 'active', 'expired', 'cancelled'));
    end if;
end $$;

-- Enable Row Level Security
alter table public.subscriptions enable row level security;
alter table public.subscription_payments enable row level security;
alter table public.subscription_trials enable row level security;

-- Drop existing policies if they exist (to avoid conflicts)
drop policy if exists "Users can view their own subscription" on public.subscriptions;
drop policy if exists "Users can insert their own subscription" on public.subscriptions;
drop policy if exists "Users can update their own subscription" on public.subscriptions;
drop policy if exists "Users can view their own payments" on public.subscription_payments;
drop policy if exists "Users can insert their own payments" on public.subscription_payments;
drop policy if exists "Users can view their own trial" on public.subscription_trials;
drop policy if exists "Users can insert their own trial" on public.subscription_trials;
drop policy if exists "Users can update their own trial" on public.subscription_trials;

-- Subscription policies - users can only see their own subscription data
create policy "Users can view their own subscription" on public.subscriptions
    for select using (user_id = auth.uid());

create policy "Users can insert their own subscription" on public.subscriptions
    for insert with check (user_id = auth.uid());

create policy "Users can update their own subscription" on public.subscriptions
    for update using (user_id = auth.uid());

-- Payment policies - users can only see their own payment data
create policy "Users can view their own payments" on public.subscription_payments
    for select using (
        subscription_id in (
            select id from public.subscriptions where user_id = auth.uid()
        )
    );

create policy "Users can insert their own payments" on public.subscription_payments
    for insert with check (
        subscription_id in (
            select id from public.subscriptions where user_id = auth.uid()
        )
    );

-- Trial policies - users can only see their own trial data
create policy "Users can view their own trial" on public.subscription_trials
    for select using (user_id = auth.uid());

create policy "Users can insert their own trial" on public.subscription_trials
    for insert with check (user_id = auth.uid());

create policy "Users can update their own trial" on public.subscription_trials
    for update using (user_id = auth.uid());

-- Drop existing triggers and functions if they exist
drop trigger if exists handle_subscriptions_updated_at on public.subscriptions;
drop trigger if exists on_auth_user_subscription_setup on auth.users;
drop function if exists public.handle_new_user_subscription();
drop function if exists public.user_has_active_subscription(uuid);

-- Triggers for updated_at
create trigger handle_subscriptions_updated_at before update on public.subscriptions
    for each row execute procedure handle_updated_at();

-- Function to create subscription record when user signs up
create or replace function public.handle_new_user_subscription()
returns trigger as $$
begin
    -- Create a trial period for new users (7 days)
    insert into public.subscription_trials (user_id, trial_end)
    values (new.id, now() + interval '7 days');
    
    -- Update profile subscription status to trial
    update public.profiles 
    set subscription_status = 'trial'
    where id = new.id;
    
    return new;
exception
    when others then
        -- If there's an error, just continue without blocking user creation
        return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user subscription setup
create trigger on_auth_user_subscription_setup
    after insert on auth.users
    for each row execute procedure public.handle_new_user_subscription();

-- Function to check if user has active subscription
create or replace function public.user_has_active_subscription(user_uuid uuid)
returns boolean as $$
declare
    active_sub boolean := false;
    trial_active boolean := false;
begin
    -- Check for active paid subscription
    select exists(
        select 1 from public.subscriptions 
        where user_id = user_uuid 
        and status = 'active' 
        and current_period_end > now()
    ) into active_sub;
    
    if active_sub then
        return true;
    end if;
    
    -- Check for active trial
    select exists(
        select 1 from public.subscription_trials 
        where user_id = user_uuid 
        and trial_end > now()
        and is_used = false
    ) into trial_active;
    
    return trial_active;
end;
$$ language plpgsql security definer;

-- Comments for documentation
comment on table public.subscriptions is 'User subscription records for mandatory £25/year LusoTown membership';
comment on table public.subscription_payments is 'Payment tracking for subscription payments';
comment on table public.subscription_trials is 'Trial period tracking for new users';
comment on function public.user_has_active_subscription is 'Check if user has active subscription or trial';

-- Insert some sample data for testing (optional - remove in production)
-- This gives the demo user a trial period
insert into public.subscription_trials (user_id, trial_end, is_used)
select 'demo-user-id'::uuid, now() + interval '30 days', false
where not exists (
    select 1 from public.subscription_trials where user_id = 'demo-user-id'::uuid
);