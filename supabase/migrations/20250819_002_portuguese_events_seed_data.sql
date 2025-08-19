-- Portuguese Community Events Seed Data
-- Created: 2025-08-19
-- Purpose: Populate database with real Portuguese cultural events and businesses

-- Insert real Portuguese cultural events
insert into public.events (
  title, description, event_type, location, start_datetime, end_datetime, 
  max_attendees, current_attendee_count, price, currency, created_by, image_url, 
  is_featured, status, tags, cultural_category, portuguese_neighborhood, 
  cultural_authenticity_score, fado_music_featured, santos_populares_themed, 
  football_viewing_party, cultural_preservation_focus, requires_portuguese_verification
) values 
-- Fado Music Events
(
  'Fado Nights at Portuguese Centre',
  'Authentic Fado music evening with traditional Portuguese guitar and soul-stirring vocals. Experience the melancholic beauty of Portuguese culture with local and visiting artists.',
  'in_person',
  'Portuguese Centre London, South Lambeth Road',
  '2025-09-15 19:30:00+00',
  '2025-09-15 22:30:00+00',
  80, 45, 25.00, 'GBP',
  (select id from public.profiles where email = 'demo@lusotown.com' limit 1),
  '/events/portuguese/fado-night.jpg',
  true, 'active',
  array['fado', 'music', 'traditional', 'cultural', 'authentic'],
  'fado',
  'stockwell',
  95, true, false, false, true, false
),

-- Santos Populares Festival
(
  'Santos Populares London 2025',
  'Celebrate the Portuguese June festivals with grilled sardines, traditional dances, manjerico basil, and Portuguese music. Family-friendly community celebration.',
  'in_person',
  'Vauxhall Pleasure Gardens',
  '2025-06-13 14:00:00+00',
  '2025-06-13 23:00:00+00',
  500, 150, 0.00, 'GBP',
  (select id from public.profiles where email = 'demo@lusotown.com' limit 1),
  '/events/portuguese/santos-populares.jpg',
  true, 'active',
  array['santos_populares', 'festival', 'traditional', 'family', 'free'],
  'santos_populares',
  'vauxhall',
  100, false, true, false, true, false
),

-- Portuguese Business Networking
(
  'Portuguese Entrepreneurs Network London',
  'Monthly networking event for Portuguese business owners and professionals in London. Share experiences, build partnerships, and grow your business network.',
  'hybrid',
  'Canary Wharf Business Centre',
  '2025-09-20 18:00:00+00',
  '2025-09-20 21:00:00+00',
  50, 28, 15.00, 'GBP',
  (select id from public.profiles where email = 'demo@lusotown.com' limit 1),
  '/events/portuguese/business-networking.jpg',
  false, 'active',
  array['business', 'networking', 'professional', 'entrepreneurs'],
  'business',
  'canary_wharf',
  80, false, false, false, false, false
),

-- Traditional Cooking Workshop
(
  'Master Portuguese Cuisine Workshop',
  'Learn to cook authentic Portuguese dishes: Pastéis de Nata, Bacalhau à Brás, Caldo Verde, and Bifana. All ingredients and recipes included.',
  'in_person',
  'Central London Culinary School',
  '2025-10-05 14:00:00+00',
  '2025-10-05 18:00:00+00',
  16, 12, 65.00, 'GBP',
  (select id from public.profiles where email = 'demo@lusotown.com' limit 1),
  '/events/portuguese/cooking-workshop.jpg',
  false, 'active',
  array['cooking', 'traditional', 'food', 'cultural', 'hands-on'],
  'food',
  'central_london',
  90, false, false, false, true, false
),

-- Portugal vs England Football Viewing
(
  'Portugal vs England UEFA Match Viewing',
  'Watch Portugal play England with fellow Portuguese supporters! Traditional Portuguese snacks and drinks available. Vamos Portugal!',
  'in_person',
  'Bar do Fado, Holborn',
  '2025-11-15 19:45:00+00',
  '2025-11-15 23:00:00+00',
  60, 35, 5.00, 'GBP',
  (select id from public.profiles where email = 'demo@lusotown.com' limit 1),
  '/events/portuguese/football-viewing.jpg',
  false, 'active',
  array['football', 'portugal', 'sports', 'social', 'community'],
  'sports',
  'holborn',
  85, false, false, true, false, false
),

-- Portuguese Language Exchange
(
  'Portuguese-English Language Exchange',
  'Practice Portuguese and English with native speakers. Beginners to advanced welcome. Connect with Portuguese speakers and improve your language skills.',
  'in_person',
  'Café Lisboa, North Kensington',
  '2025-09-25 19:00:00+00',
  '2025-09-25 21:30:00+00',
  30, 18, 8.00, 'GBP',
  (select id from public.profiles where email = 'demo@lusotown.com' limit 1),
  '/events/portuguese/language-exchange.jpg',
  false, 'active',
  array['language', 'portuguese', 'english', 'learning', 'social'],
  'language',
  'north_kensington',
  75, false, false, false, false, false
),

-- Portuguese Cultural Heritage Tour
(
  'Little Portugal London Walking Tour',
  'Discover Portuguese London! Visit the Portuguese Centre, traditional businesses, churches, and learn about Portuguese immigration history in London.',
  'in_person',
  'Portuguese Centre London (Starting Point)',
  '2025-10-12 11:00:00+00',
  '2025-10-12 14:00:00+00',
  25, 8, 20.00, 'GBP',
  (select id from public.profiles where email = 'demo@lusotown.com' limit 1),
  '/events/portuguese/heritage-tour.jpg',
  false, 'active',
  array['heritage', 'history', 'walking_tour', 'cultural', 'educational'],
  'cultural',
  'stockwell',
  95, false, false, false, true, false
),

-- Christmas Traditions Workshop
(
  'Portuguese Christmas Traditions Workshop',
  'Learn about Portuguese Christmas traditions, make traditional decorations, and taste seasonal Portuguese sweets. Family-friendly event.',
  'in_person',
  'Portuguese Community Hall',
  '2025-12-15 15:00:00+00',
  '2025-12-15 18:00:00+00',
  40, 22, 12.00, 'GBP',
  (select id from public.profiles where email = 'demo@lusotown.com' limit 1),
  '/events/portuguese/christmas-traditions.jpg',
  false, 'active',
  array['christmas', 'traditions', 'family', 'cultural', 'workshop'],
  'cultural',
  'south_lambeth',
  88, false, false, false, true, false
);

-- Insert sample Portuguese businesses if they don't exist
insert into public.portuguese_businesses (
  business_name, business_type, description, address, neighborhood, phone, email, 
  specialties, portuguese_authenticity_score, staff_speaks_portuguese, 
  accepts_multibanco, verified_status, average_rating, review_count, price_range
) values 
(
  'Casa do Fado',
  'restaurant',
  'Authentic Portuguese restaurant specializing in traditional Fado music dinners and classic Portuguese cuisine with live performances.',
  '47 Bethnal Green Road, London E1 6LA',
  'bethnal_green',
  '+44 20 7739 8888',
  'info@casadofado.co.uk',
  array['fado music', 'traditional cuisine', 'live performances', 'portuguese wine'],
  98, true, true, 'verified', 4.7, 127, 'moderate'
),
(
  'Taberna do Real',
  'restaurant', 
  'Family-run traditional Portuguese tavern serving authentic dishes from all regions of Portugal with warm, welcoming atmosphere.',
  '56 Little Portugal, South Lambeth Road, London SW8 1XW',
  'stockwell',
  '+44 20 7587 5555',
  'reservas@tabernadoreal.co.uk',
  array['traditional dishes', 'family recipes', 'regional cuisine', 'portuguese wines'],
  92, true, true, 'verified', 4.5, 89, 'moderate'
),
(
  'Pastelaria Versailles',
  'bakery',
  'Renowned Portuguese bakery famous for the best Pastéis de Nata in London, fresh bread, and traditional Portuguese pastries.',
  '139 Golborne Road, North Kensington, London W10 5NP',
  'north_kensington',
  '+44 20 8969 6070', 
  'versailles@portugalfood.co.uk',
  array['pastéis de nata', 'traditional pastries', 'fresh bread', 'portuguese coffee'],
  95, true, false, 'premium', 4.8, 203, 'budget'
),
(
  'Centro Português de Londres',
  'cultural_center',
  'Portuguese cultural center offering language classes, cultural events, community services, and preserving Portuguese heritage in London.',
  '4-8 South Lambeth Road, Stockwell, London SW8 1RL',
  'stockwell', 
  '+44 20 7735 1888',
  'info@centroporl.org.uk',
  array['language classes', 'cultural events', 'community services', 'heritage preservation'],
  100, true, false, 'premium', 4.9, 67, 'budget'
),
(
  'Mercado Lusitano',
  'supermarket',
  'Largest Portuguese grocery store in London with imported goods from Portugal, Brazil, and other Lusophone countries.',
  '85 Harrow Road, North Kensington, London W2 3SU',
  'north_kensington',
  '+44 20 7289 4040',
  'geral@mercadolusitano.co.uk', 
  array['imported goods', 'portuguese products', 'fresh fish', 'traditional ingredients'],
  90, true, true, 'verified', 4.3, 156, 'budget'
);

-- Insert sample business reviews
insert into public.business_reviews (
  business_id, reviewer_id, rating, review_text, cultural_authenticity_rating, 
  language_accommodation_rating, recommended_dishes, visit_type, visit_date
) values 
(
  (select id from public.portuguese_businesses where business_name = 'Casa do Fado' limit 1),
  (select id from public.profiles where email = 'demo@lusotown.com' limit 1),
  5,
  'Absolutely amazing authentic Portuguese experience! The Fado music was beautiful and emotional, just like back home in Portugal. The staff all speak Portuguese and the food is exactly like my grandmother used to make.',
  5, 5,
  array['Bacalhau à Brás', 'Pastéis de Nata', 'Vinho Verde'],
  'dining',
  '2025-08-10'
),
(
  (select id from public.portuguese_businesses where business_name = 'Pastelaria Versailles' limit 1),
  (select id from public.profiles where email = 'demo@lusotown.com' limit 1),
  5,
  'Best Pastéis de Nata in London! Crispy pastry, perfect custard, exactly like in Belém. The Portuguese coffee is also excellent. Feels like being back in Portugal.',
  5, 5,
  array['Pastéis de Nata', 'Bola de Berlim', 'Galão'],
  'shopping',
  '2025-08-15'
);

-- Insert user interests related to Portuguese culture
insert into public.user_interests (user_id, interest_id)
select 
  (select id from public.profiles where email = 'demo@lusotown.com' limit 1),
  id 
from public.interests 
where name in ('Fado Music', 'Portuguese Cuisine', 'Football Culture', 'Portuguese Business')
on conflict do nothing;

-- Insert cultural preferences for demo user
insert into public.cultural_preferences (
  user_id, origins, language_preference, cultural_celebrations, professional_goals,
  cultural_values, lifestyle_preferences, compatibility_score, cultural_depth_score,
  community_engagement_score, quiz_version
) values (
  (select id from public.profiles where email = 'demo@lusotown.com' limit 1),
  array['mainland_portugal', 'lisbon_region'],
  'bilingual',
  array['santos_populares', 'fado', 'natal', 'dia_portugal'],
  array['networking', 'business_growth', 'cultural_preservation'],
  '{"family_values": 5, "community_spirit": 5, "cultural_pride": 5, "professional_growth": 4, "tradition_respect": 5}',
  array['community_events', 'cultural_activities', 'business_networking', 'traditional_celebrations'],
  85, 92, 88, '1.0'
) on conflict (user_id) do update set
  origins = excluded.origins,
  language_preference = excluded.language_preference,
  cultural_celebrations = excluded.cultural_celebrations,
  professional_goals = excluded.professional_goals,
  cultural_values = excluded.cultural_values,
  lifestyle_preferences = excluded.lifestyle_preferences,
  last_updated = timezone('utc'::text, now());

-- Update demo user profile with Portuguese data
update public.profiles 
set 
  portuguese_origin = 'mainland_portugal',
  portuguese_regions = array['lisbon_region', 'central_portugal'],
  years_in_uk = 5,
  language_proficiency = '{"portuguese": 5, "english": 4}',
  professional_status = 'software_engineer',
  cultural_connection_level = 4,
  london_neighborhood = 'stockwell',
  bio = 'Portuguese software engineer living in London for 5 years. Love connecting with the Portuguese community, attending Fado nights, and sharing our beautiful culture.',
  location = 'Stockwell, London'
where email = 'demo@lusotown.com';

-- Create some sample community connections
insert into public.community_connections (
  user_id, target_user_id, connection_type, connection_strength, 
  shared_interests, shared_locations, connection_notes, is_mutual, status
) 
select 
  (select id from public.profiles where email = 'demo@lusotown.com' limit 1),
  id,
  'cultural',
  4,
  array['portuguese_culture', 'london_community'],
  array['stockwell', 'london'],
  'Connected through Portuguese community events',
  false,
  'active'
from public.profiles 
where email != 'demo@lusotown.com' 
  and is_active = true 
limit 3
on conflict do nothing;

-- Insert sample notifications for demo user
insert into public.user_notifications (
  user_id, notification_type, title, message, action_url, action_data, priority
) values (
  (select id from public.profiles where email = 'demo@lusotown.com' limit 1),
  'cultural',
  '🎵 Fado Night This Weekend!',
  'Join us for an authentic Fado music evening at Portuguese Centre. Experience the soul of Portuguese culture with fellow community members.',
  '/events/fado-nights-portuguese-centre',
  '{"event_type": "fado", "cultural_event": true}',
  'normal'
),
(
  (select id from public.profiles where email = 'demo@lusotown.com' limit 1),
  'business',
  '🏪 Nova empresa portuguesa!',
  'Casa do Fado restaurant is now featured in Bethnal Green. Authentic Portuguese cuisine with live Fado performances.',
  '/businesses/casa-do-fado',
  '{"business_type": "restaurant", "has_fado": true}',
  'low'
),
(
  (select id from public.profiles where email = 'demo@lusotown.com' limit 1),
  'system',
  'Bem-vindo à LusoTown! 🇵🇹',
  'Welcome to London''s Portuguese community! Your cultural preferences have been saved. Start connecting with fellow Portuguese speakers.',
  '/dashboard',
  '{"welcome": true, "cultural_setup": "complete"}',
  'normal'
);

-- Comments for seed data
comment on table public.events is 'Portuguese cultural events in London with authentic cultural data';
comment on table public.portuguese_businesses is 'Verified Portuguese businesses directory for London Portuguese community';
comment on table public.business_reviews is 'Community reviews of Portuguese businesses with cultural authenticity ratings';