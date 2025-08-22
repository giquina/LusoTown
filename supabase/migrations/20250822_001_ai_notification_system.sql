-- AI-Powered Notification System Enhancement
-- Created: 2025-08-22
-- Purpose: Add AI behavioral analytics and notification optimization tables

-- Enhance user_notifications table with AI fields
alter table public.user_notifications add column if not exists ai_generated boolean default false;
alter table public.user_notifications add column if not exists engagement_score decimal(5,2);
alter table public.user_notifications add column if not exists optimal_send_time varchar(5); -- Format: "HH:MM"
alter table public.user_notifications add column if not exists cultural_context jsonb default '{}';
alter table public.user_notifications add column if not exists personalization_tags text[];
alter table public.user_notifications add column if not exists ab_test_variant varchar(100);
alter table public.user_notifications add column if not exists sent_at timestamp with time zone;
alter table public.user_notifications add column if not exists opened_at timestamp with time zone;
alter table public.user_notifications add column if not exists clicked_at timestamp with time zone;
alter table public.user_notifications add column if not exists converted_at timestamp with time zone;

-- Create user behavior profiles table for AI learning
create table if not exists public.user_behavior_profiles (
    user_id uuid references public.profiles(id) on delete cascade primary key,
    engagement_patterns jsonb not null default '{}', -- peak_activity_hours, preferred_days, etc.
    cultural_preferences jsonb not null default '{}', -- portuguese_region, diaspora_relevance, etc.
    content_affinity jsonb not null default '{}', -- event_types, business_categories, etc.
    ai_insights jsonb not null default '{}', -- engagement_likelihood, optimal_send_times, etc.
    last_notification_interaction timestamp with time zone,
    total_notifications_received integer default 0,
    total_notifications_opened integer default 0,
    total_notifications_clicked integer default 0,
    total_notifications_converted integer default 0,
    avg_response_time_minutes integer default 30,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create AI notification templates table
create table if not exists public.ai_notification_templates (
    id varchar(100) primary key,
    name varchar(255) not null,
    category varchar(50) not null check (category in ('cultural', 'business', 'social', 'educational', 'emergency')),
    description text,
    cultural_contexts jsonb not null default '[]', -- Array of cultural context objects
    content_variations jsonb not null default '{}', -- formal, casual, friendly variations
    dynamic_variables text[] default '{}',
    engagement_triggers text[] default '{}',
    target_diaspora_groups text[] default '{}',
    performance_metrics jsonb default '{}', -- impressions, clicks, conversions, etc.
    is_active boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create A/B testing framework table
create table if not exists public.notification_ab_tests (
    id uuid default uuid_generate_v4() primary key,
    test_name varchar(255) not null,
    template_id varchar(100) references public.ai_notification_templates(id),
    variants jsonb not null default '[]', -- Array of variant objects
    start_date timestamp with time zone not null,
    end_date timestamp with time zone,
    status varchar(20) default 'active' check (status in ('active', 'paused', 'completed', 'cancelled')),
    target_criteria jsonb default '{}', -- Criteria for user targeting
    sample_size integer,
    confidence_level decimal(3,2) default 0.95,
    statistical_significance boolean default false,
    winning_variant_id varchar(100),
    results jsonb default '{}', -- Test results and metrics
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create notification performance analytics table
create table if not exists public.notification_analytics (
    id uuid default uuid_generate_v4() primary key,
    notification_id uuid references public.user_notifications(id) on delete cascade,
    user_id uuid references public.profiles(id) on delete cascade,
    template_id varchar(100) references public.ai_notification_templates(id),
    ab_test_id uuid references public.notification_ab_tests(id),
    variant_id varchar(100),
    sent_timestamp timestamp with time zone not null,
    opened_timestamp timestamp with time zone,
    clicked_timestamp timestamp with time zone,
    converted_timestamp timestamp with time zone,
    time_to_open_minutes integer,
    time_to_click_minutes integer,
    time_to_convert_minutes integer,
    user_timezone varchar(50),
    send_hour integer check (send_hour >= 0 and send_hour <= 23),
    send_day_of_week integer check (send_day_of_week >= 1 and send_day_of_week <= 7),
    cultural_region varchar(100),
    diaspora_generation varchar(50),
    engagement_score decimal(5,2),
    conversion_value decimal(10,2) default 0, -- For ROI tracking
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create cultural personalization rules table
create table if not exists public.cultural_personalization_rules (
    id uuid default uuid_generate_v4() primary key,
    region varchar(100) not null, -- 'norte', 'lisboa', 'acores', etc.
    content_adaptations jsonb not null default '{}',
    optimal_timing jsonb not null default '{}',
    communication_preferences jsonb not null default '{}',
    cultural_references jsonb not null default '{}',
    holiday_considerations text[] default '{}',
    is_active boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now') not null,
    updated_at timestamp with time zone default timezone('utc'::text, now') not null,
    unique(region)
);

-- Create notification queue table for optimized timing
create table if not exists public.notification_queue (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.profiles(id) on delete cascade not null,
    template_id varchar(100) references public.ai_notification_templates(id),
    dynamic_data jsonb default '{}',
    priority varchar(20) default 'normal' check (priority in ('low', 'normal', 'high', 'urgent')),
    scheduled_send_time timestamp with time zone not null,
    status varchar(20) default 'queued' check (status in ('queued', 'sending', 'sent', 'failed', 'cancelled')),
    attempts integer default 0,
    max_attempts integer default 3,
    error_message text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Insert default AI notification templates
insert into public.ai_notification_templates (id, name, category, description, cultural_contexts, content_variations, dynamic_variables, engagement_triggers, target_diaspora_groups) values
('cultural_event_fado', 'Fado Night Invitation', 'cultural', 'AI-personalized fado event notifications with cultural context', 
 '[{"portuguese_region": "lisboa", "cultural_significance": "Traditional Lisbon fado heritage"}, {"portuguese_region": "norte", "cultural_significance": "Cultural appreciation"}]',
 '{"formal": {"title": "Authentic Fado Performance Tonight", "message": "Join us for an evening of traditional Portuguese fado music featuring renowned fadistas.", "title_pt": "Espetáculo de Fado Autêntico Esta Noite", "message_pt": "Junte-se a nós para uma noite de fado tradicional português com fadistas renomados."}, "casual": {"title": "Fado Night - Feel the Saudade! 🎵", "message": "Tonight''s fado performance will touch your Portuguese soul. Don''t miss this authentic experience!", "title_pt": "Noite de Fado - Sente a Saudade! 🎵", "message_pt": "O fado de hoje vai tocar a tua alma portuguesa. Não percas esta experiência autêntica!"}, "friendly": {"title": "Your Portuguese Heart is Calling! 💙", "message": "Come feel the saudade with fellow Portuguese souls at tonight''s intimate fado session.", "title_pt": "O Teu Coração Português Está a Chamar! 💙", "message_pt": "Vem sentir a saudade com outras almas portuguesas na sessão intimista de fado de hoje."}}',
 array['venue', 'time', 'fadista_name', 'ticket_price'],
 array['cultural_heritage', 'music_interest', 'evening_events'],
 array['first_generation', 'heritage_connection']),

('business_networking_portuguese', 'Portuguese Business Networking', 'business', 'Professional networking events for Portuguese entrepreneurs and professionals',
 '[{"portuguese_region": "lisboa", "cultural_significance": "Entrepreneurial spirit"}, {"portuguese_region": "norte", "cultural_significance": "Business collaboration"}]',
 '{"formal": {"title": "Portuguese Professional Networking Event", "message": "Connect with successful Portuguese entrepreneurs and business leaders in London.", "title_pt": "Evento de Networking Profissional Português", "message_pt": "Conecta-te com empresários e líderes empresariais portugueses de sucesso em Londres."}, "casual": {"title": "Portuguese Business Mixer 🤝", "message": "Network with your Portuguese business community over authentic conversation and opportunities.", "title_pt": "Encontro de Negócios Português 🤝", "message_pt": "Networking com a tua comunidade empresarial portuguesa com conversas autênticas e oportunidades."}, "friendly": {"title": "Growing Together - Portuguese Style! 🚀", "message": "Join fellow Portuguese professionals building successful businesses in the UK.", "title_pt": "Crescer Juntos - À Portuguesa! 🚀", "message_pt": "Junta-te a outros profissionais portugueses que constroem negócios de sucesso no Reino Unido."}}',
 array['location', 'featured_speaker', 'industry_focus', 'rsvp_deadline'],
 array['professional_growth', 'business_interest', 'networking'],
 array['recent_immigrant', 'second_generation']),

('festival_santos_populares', 'Santos Populares Celebration', 'cultural', 'Major Portuguese cultural festival notifications with regional personalization',
 '[{"portuguese_region": "lisboa", "cultural_significance": "Santo António patron saint celebration"}, {"portuguese_region": "norte", "cultural_significance": "São João traditional festivities"}]',
 '{"formal": {"title": "Santos Populares Celebration in London", "message": "Experience authentic Portuguese traditions with sardines, folk dancing, and community celebration.", "title_pt": "Celebração dos Santos Populares em Londres", "message_pt": "Vive tradições portuguesas autênticas com sardinhas, rancho folclórico e celebração comunitária."}, "casual": {"title": "Santos Populares Party! 🎉🐟", "message": "Sardines, sangria, and Portuguese spirit! Join the biggest Portuguese celebration in London.", "title_pt": "Festa dos Santos Populares! 🎉🐟", "message_pt": "Sardinhas, sangria e espírito português! Junta-te à maior celebração portuguesa em Londres."}, "friendly": {"title": "Smell the Sardines? It''s Santos Time! 🇵🇹", "message": "Your Portuguese family in London is gathering for the most authentic Santos Populares celebration.", "title_pt": "Cheiras as Sardinhas? É Tempo de Santos! 🇵🇹", "message_pt": "A tua família portuguesa em Londres reúne-se para a celebração mais autêntica dos Santos Populares."}}',
 array['date', 'venue', 'traditional_foods', 'music_groups'],
 array['cultural_celebration', 'traditional_food', 'community_gathering'],
 array['first_generation', 'heritage_connection', 'recent_immigrant']);

-- Insert default cultural personalization rules
insert into public.cultural_personalization_rules (region, content_adaptations, optimal_timing, communication_preferences, cultural_references, holiday_considerations) values
('norte', 
 '{"greeting_style": "Olá, conterrâneo", "cultural_references": ["francesinha", "vinho verde", "São João do Porto"], "local_context": ["Invicta", "Douro", "Minho"], "communication_tone": "warm"}',
 '{"preferred_hours": [19, 20, 21], "cultural_events_awareness": ["São João", "Festa do Avante"], "holiday_considerations": ["Santos Populares"]}',
 '{"formality_level": "moderate", "use_regional_expressions": true, "include_cultural_greetings": true}',
 '{"traditional_dishes": ["francesinha", "tripas à moda do Porto"], "cultural_symbols": ["galo de Barcelos"], "music_references": ["folk music", "concertina"]}',
 array['São João do Porto', 'Santos Populares', 'Festa das Cruzes']),

('lisboa', 
 '{"greeting_style": "Olá, lisboeta", "cultural_references": ["pastéis de nata", "fado", "Santo António"], "local_context": ["Tejo", "Alfama", "Bairro Alto"], "communication_tone": "casual"}',
 '{"preferred_hours": [18, 19, 20], "cultural_events_awareness": ["Santo António", "Rock in Rio Lisboa"], "holiday_considerations": ["Festa de Lisboa"]}',
 '{"formality_level": "casual", "use_regional_expressions": true, "include_cultural_greetings": true}',
 '{"traditional_dishes": ["pastéis de nata", "bifana"], "cultural_symbols": ["tram 28"], "music_references": ["fado", "pimba"]}',
 array['Santo António', 'Festa de Lisboa', 'Marchas Populares']),

('acores', 
 '{"greeting_style": "Olá, açoriano", "cultural_references": ["queijo da ilha", "festa do Espírito Santo", "lagoas"], "local_context": ["Atlântico", "vulcões", "ilhas"], "communication_tone": "friendly"}',
 '{"preferred_hours": [20, 21, 22], "cultural_events_awareness": ["Festa do Espírito Santo", "Semana do Mar"], "holiday_considerations": ["Festa da Maré de Agosto"]}',
 '{"formality_level": "friendly", "use_regional_expressions": true, "include_cultural_greetings": true}',
 '{"traditional_dishes": ["alcatra", "linguiça"], "cultural_symbols": ["tourada à corda"], "music_references": ["chamarrita", "traditional folk"]}',
 array['Festa do Espírito Santo', 'Semana do Mar', 'Festa da Maré de Agosto']),

('madeira', 
 '{"greeting_style": "Olá, madeirense", "cultural_references": ["vinho da Madeira", "levadas", "Festa da Flor"], "local_context": ["Atlântico", "Funchal", "montanhas"], "communication_tone": "warm"}',
 '{"preferred_hours": [19, 20, 21], "cultural_events_awareness": ["Festa da Flor", "Festival do Fim do Ano"], "holiday_considerations": ["Festa do Vinho"]}',
 '{"formality_level": "warm", "use_regional_expressions": true, "include_cultural_greetings": true}',
 '{"traditional_dishes": ["bolo do caco", "espada"], "cultural_symbols": ["bordado da Madeira"], "music_references": ["bailinho da Madeira"]}',
 array['Festa da Flor', 'Festival do Fim do Ano', 'Festa do Vinho']),

('brasil', 
 '{"greeting_style": "Olá, brasileiro", "cultural_references": ["saudade", "caipirinha", "carnaval"], "local_context": ["lusofonia", "irmãos", "comunidade"], "communication_tone": "friendly"}',
 '{"preferred_hours": [20, 21, 22], "cultural_events_awareness": ["Carnaval", "Festa Junina", "Independência"], "holiday_considerations": ["Festa de Iemanjá", "São João"]}',
 '{"formality_level": "friendly", "use_regional_expressions": true, "include_cultural_greetings": true}',
 '{"traditional_dishes": ["feijoada", "pão de açúcar"], "cultural_symbols": ["Cristo Redentor"], "music_references": ["samba", "bossa nova"]}',
 array['Carnaval', 'Festa Junina', 'Independência do Brasil']);

-- Enable RLS on new tables
alter table public.user_behavior_profiles enable row level security;
alter table public.ai_notification_templates enable row level security;
alter table public.notification_ab_tests enable row level security;
alter table public.notification_analytics enable row level security;
alter table public.cultural_personalization_rules enable row level security;
alter table public.notification_queue enable row level security;

-- RLS Policies
create policy "Users can view their own behavior profile" on public.user_behavior_profiles
    for select using (auth.uid() = user_id);

create policy "Users can update their own behavior profile" on public.user_behavior_profiles
    for update using (auth.uid() = user_id);

create policy "Users can insert their own behavior profile" on public.user_behavior_profiles
    for insert with check (auth.uid() = user_id);

create policy "AI templates are publicly viewable" on public.ai_notification_templates
    for select using (is_active = true);

create policy "Cultural rules are publicly viewable" on public.cultural_personalization_rules
    for select using (is_active = true);

create policy "Users can view their own notification analytics" on public.notification_analytics
    for select using (auth.uid() = user_id);

create policy "Users can view their own notification queue" on public.notification_queue
    for select using (auth.uid() = user_id);

-- Create indexes for performance
create index if not exists idx_user_behavior_profiles_cultural_prefs on public.user_behavior_profiles using gin(cultural_preferences);
create index if not exists idx_user_behavior_profiles_engagement on public.user_behavior_profiles using gin(engagement_patterns);
create index if not exists idx_ai_notification_templates_category on public.ai_notification_templates(category);
create index if not exists idx_ai_notification_templates_active on public.ai_notification_templates(is_active);
create index if not exists idx_notification_analytics_template on public.notification_analytics(template_id);
create index if not exists idx_notification_analytics_user_date on public.notification_analytics(user_id, sent_timestamp);
create index if not exists idx_notification_analytics_conversion on public.notification_analytics(converted_timestamp) where converted_timestamp is not null;
create index if not exists idx_notification_queue_send_time on public.notification_queue(scheduled_send_time);
create index if not exists idx_notification_queue_status on public.notification_queue(status);
create index if not exists idx_user_notifications_ai_fields on public.user_notifications(ai_generated, engagement_score);

-- Triggers for updated_at
create trigger handle_user_behavior_profiles_updated_at before update on public.user_behavior_profiles
    for each row execute procedure handle_updated_at();

create trigger handle_ai_notification_templates_updated_at before update on public.ai_notification_templates
    for each row execute procedure handle_updated_at();

create trigger handle_notification_ab_tests_updated_at before update on public.notification_ab_tests
    for each row execute procedure handle_updated_at();

create trigger handle_cultural_personalization_rules_updated_at before update on public.cultural_personalization_rules
    for each row execute procedure handle_updated_at();

create trigger handle_notification_queue_updated_at before update on public.notification_queue
    for each row execute procedure handle_updated_at();

-- Comments for documentation
comment on table public.user_behavior_profiles is 'AI behavioral analytics for Portuguese community notification optimization';
comment on table public.ai_notification_templates is 'AI-powered notification templates with cultural personalization';
comment on table public.notification_ab_tests is 'A/B testing framework for notification optimization';
comment on table public.notification_analytics is 'Performance analytics for AI notification system';
comment on table public.cultural_personalization_rules is 'Portuguese cultural personalization rules for different regions';
comment on table public.notification_queue is 'Optimized notification delivery queue with timing intelligence';