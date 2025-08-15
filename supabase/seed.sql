-- AdyaTribe Community Platform Seed Data
-- Insert predefined interests organized by categories

INSERT INTO public.interests (name, category, description, icon) VALUES 
    -- Arts & Creative
    ('Photography', 'Arts & Creative', 'Capturing moments and artistic expression through photography', '📷'),
    ('Painting', 'Arts & Creative', 'Creating art through various painting mediums', '🎨'),
    ('Writing', 'Arts & Creative', 'Creative writing, journaling, and literary pursuits', '✍️'),
    ('Crafting', 'Arts & Creative', 'DIY projects and handmade creations', '🧵'),
    ('Music', 'Arts & Creative', 'Playing instruments, singing, or music appreciation', '🎵'),
    ('Dancing', 'Arts & Creative', 'Various dance styles and movement expression', '💃'),
    ('Theater', 'Arts & Creative', 'Acting, drama, and theatrical arts', '🎭'),
    ('Jewelry Making', 'Arts & Creative', 'Creating and designing jewelry pieces', '💍'),

    -- Health & Wellness
    ('Yoga', 'Health & Wellness', 'Mind-body practice combining physical postures and breathing', '🧘'),
    ('Meditation', 'Health & Wellness', 'Mindfulness and mental wellness practices', '🕯️'),
    ('Fitness', 'Health & Wellness', 'Physical exercise and body conditioning', '💪'),
    ('Running', 'Health & Wellness', 'Distance running and jogging activities', '🏃‍♀️'),
    ('Hiking', 'Health & Wellness', 'Nature walks and trail exploration', '🥾'),
    ('Pilates', 'Health & Wellness', 'Core strengthening and flexibility exercises', '🤸‍♀️'),
    ('Nutrition', 'Health & Wellness', 'Healthy eating and dietary wellness', '🥗'),
    ('Mental Health', 'Health & Wellness', 'Emotional wellness and psychological health', '💚'),

    -- Food & Cooking
    ('Cooking', 'Food & Cooking', 'Preparing meals and culinary arts', '👩‍🍳'),
    ('Baking', 'Food & Cooking', 'Creating breads, pastries, and desserts', '🧁'),
    ('Wine Tasting', 'Food & Cooking', 'Wine appreciation and tasting experiences', '🍷'),
    ('Healthy Eating', 'Food & Cooking', 'Nutritious food choices and meal planning', '🥑'),
    ('International Cuisine', 'Food & Cooking', 'Exploring foods from different cultures', '🌍'),
    ('Vegetarian/Vegan', 'Food & Cooking', 'Plant-based lifestyle and cooking', '🌱'),
    ('Food Photography', 'Food & Cooking', 'Capturing beautiful food imagery', '📸'),
    ('Meal Prep', 'Food & Cooking', 'Organized meal planning and preparation', '🍱'),

    -- Travel & Adventure
    ('Travel', 'Travel & Adventure', 'Exploring new places and cultures', '✈️'),
    ('Adventure Sports', 'Travel & Adventure', 'Thrilling outdoor activities and sports', '🏔️'),
    ('Cultural Exploration', 'Travel & Adventure', 'Learning about different cultures and traditions', '🗺️'),
    ('Road Trips', 'Travel & Adventure', 'Spontaneous driving adventures', '🚗'),
    ('Backpacking', 'Travel & Adventure', 'Budget travel and outdoor expeditions', '🎒'),
    ('City Breaks', 'Travel & Adventure', 'Short urban getaways and exploration', '🏙️'),
    ('Nature Photography', 'Travel & Adventure', 'Capturing natural landscapes and wildlife', '📷'),
    ('Solo Travel', 'Travel & Adventure', 'Independent travel experiences', '🧳'),

    -- Career & Business
    ('Entrepreneurship', 'Career & Business', 'Starting and running businesses', '💼'),
    ('Networking', 'Career & Business', 'Building professional relationships', '🤝'),
    ('Professional Development', 'Career & Business', 'Career growth and skill building', '📈'),
    ('Leadership', 'Career & Business', 'Developing leadership skills and abilities', '👑'),
    ('Public Speaking', 'Career & Business', 'Communication and presentation skills', '🎤'),
    ('Mentoring', 'Career & Business', 'Guiding and supporting others growth', '🌟'),
    ('Side Hustles', 'Career & Business', 'Additional income streams and projects', '💰'),
    ('Work-Life Balance', 'Career & Business', 'Balancing professional and personal life', '⚖️'),

    -- Social & Community
    ('Volunteering', 'Social & Community', 'Giving back to the community through service', '❤️'),
    ('Book Clubs', 'Social & Community', 'Reading and discussing literature together', '📚'),
    ('Board Games', 'Social & Community', 'Strategy games and social gaming', '🎲'),
    ('Dinner Parties', 'Social & Community', 'Hosting and attending social gatherings', '🍽️'),
    ('Language Learning', 'Social & Community', 'Learning new languages and cultures', '🗣️'),
    ('Trivia Nights', 'Social & Community', 'Competitive knowledge games', '🧠'),
    ('Movie Nights', 'Social & Community', 'Film appreciation and discussion', '🎬'),
    ('Pet Lovers', 'Social & Community', 'Caring for and enjoying time with animals', '🐾');

-- Insert some sample groups
INSERT INTO public.groups (name, description, group_type, category, location, created_by, is_private) VALUES 
    ('London Photography Walks', 'Weekly photography meetups exploring London''s hidden gems', 'interest', 'Arts & Creative', 'London, UK', (SELECT id FROM auth.users LIMIT 1), false),
    ('Yoga & Mindfulness Circle', 'Morning yoga sessions and mindfulness practices', 'interest', 'Health & Wellness', 'Manchester, UK', (SELECT id FROM auth.users LIMIT 1), false),
    ('Culinary Adventures Club', 'Trying new restaurants and cooking together', 'interest', 'Food & Cooking', 'Birmingham, UK', (SELECT id FROM auth.users LIMIT 1), false),
    ('Solo Travel Support Network', 'Tips, stories, and planning for solo female travelers', 'interest', 'Travel & Adventure', 'Online', (SELECT id FROM auth.users LIMIT 1), false),
    ('Women in Tech Leadership', 'Career development and networking for tech professionals', 'interest', 'Career & Business', 'Edinburgh, UK', (SELECT id FROM auth.users LIMIT 1), true);

-- Note: Sample data creation requires existing users. 
-- In production, these would be created after user registration.

-- Insert Chauffeur Services
INSERT INTO chauffeur_services (service_name, service_type, description, base_hourly_rate, minimum_hours, day_rate, minimum_day_hours, call_out_fee, peak_time_multiplier, currency) VALUES
('Executive Transport', 'executive', 'Premium executive transport service for business meetings and corporate events', 65.00, 2, 450.00, 8, 25.00, 1.2, 'GBP'),
('Tourism & Sightseeing', 'tourism', 'Guided chauffeur service for Portuguese cultural sites and tourist attractions in London', 55.00, 3, 400.00, 8, 20.00, 1.15, 'GBP'),
('Airport Transfer Premium', 'airport', 'Premium airport transfer with flight monitoring and meet & greet service', 70.00, 1, NULL, 0, 30.00, 1.25, 'GBP'),
('Event Transport', 'events', 'Specialized transport for cultural events, celebrations, and Portuguese community gatherings', 60.00, 2, 420.00, 8, 25.00, 1.3, 'GBP'),
('Business Travel Plus', 'business', 'Professional business travel with Portuguese-speaking chauffeurs', 65.00, 2, 480.00, 8, 25.00, 1.2, 'GBP'),
('Personal Service Deluxe', 'personal', 'Personalized chauffeur service for shopping, dining, and leisure activities', 50.00, 2, 350.00, 8, 20.00, 1.1, 'GBP');

-- Insert Chauffeur Vehicles
INSERT INTO chauffeur_vehicles (make, model, year, category, max_passengers, features, hourly_rate_premium) VALUES
('Mercedes-Benz', 'S-Class', 2023, 'luxury', 4, ARRAY['wifi', 'refreshments', 'privacy_glass', 'climate_control', 'leather_seats'], 15.00),
('BMW', '7 Series', 2022, 'luxury', 4, ARRAY['wifi', 'entertainment_system', 'privacy_glass', 'climate_control'], 12.00),
('Audi', 'A8', 2023, 'luxury', 4, ARRAY['wifi', 'massage_seats', 'privacy_glass', 'climate_control'], 13.00),
('Mercedes-Benz', 'E-Class', 2022, 'executive', 4, ARRAY['wifi', 'climate_control', 'leather_seats'], 8.00),
('BMW', '5 Series', 2021, 'executive', 4, ARRAY['wifi', 'climate_control'], 7.00),
('Audi', 'A6', 2022, 'executive', 4, ARRAY['wifi', 'climate_control'], 8.00),
('Mercedes-Benz', 'V-Class', 2023, 'premium', 7, ARRAY['wifi', 'climate_control', 'multiple_screens'], 10.00),
('Toyota', 'Prius', 2022, 'standard', 4, ARRAY['eco_friendly', 'wifi'], 0.00),
('Tesla', 'Model S', 2023, 'premium', 5, ARRAY['electric', 'autopilot', 'wifi', 'entertainment_system'], 20.00);

-- Insert Chauffeur Drivers
INSERT INTO chauffeur_drivers (first_name, last_name, license_number, languages_spoken, years_experience, specializations, background_check_date, hourly_rate_premium) VALUES
('João', 'Silva', 'UK-CH-001-JS', ARRAY['portuguese', 'english'], 12, ARRAY['executive', 'tourism', 'airport'], '2024-01-15', 5.00),
('Maria', 'Santos', 'UK-CH-002-MS', ARRAY['portuguese', 'english', 'spanish'], 8, ARRAY['tourism', 'events', 'personal'], '2024-02-01', 3.00),
('António', 'Ferreira', 'UK-CH-003-AF', ARRAY['portuguese', 'english'], 15, ARRAY['executive', 'business', 'airport'], '2024-01-20', 8.00),
('Cristina', 'Oliveira', 'UK-CH-004-CO', ARRAY['portuguese', 'english', 'french'], 6, ARRAY['personal', 'events', 'tourism'], '2024-02-10', 2.00),
('Ricardo', 'Pereira', 'UK-CH-005-RP', ARRAY['portuguese', 'english'], 10, ARRAY['executive', 'business', 'events'], '2024-01-25', 6.00),
('Ana', 'Costa', 'UK-CH-006-AC', ARRAY['portuguese', 'english'], 7, ARRAY['tourism', 'personal', 'airport'], '2024-02-05', 4.00);

-- Insert Pricing Tiers for Block Bookings
INSERT INTO chauffeur_pricing_tiers (tier_name, block_hours_min, block_hours_max, discount_percentage, description) VALUES
('Half Day Block', 4, 6, 5.0, '5% discount for 4-6 hour bookings'),
('Full Day Block', 7, 10, 10.0, '10% discount for 7-10 hour bookings'),
('Extended Day Block', 11, 16, 15.0, '15% discount for 11-16 hour bookings'),
('Multi-Day Block', 17, NULL, 20.0, '20% discount for 17+ hour bookings');

-- Insert Peak Time Pricing
INSERT INTO chauffeur_peak_times (name, start_time, end_time, days_of_week, multiplier, description) VALUES
('Morning Rush', '07:00', '09:30', ARRAY[1,2,3,4,5], 1.2, 'Monday to Friday morning rush hour'),
('Evening Rush', '17:00', '19:30', ARRAY[1,2,3,4,5], 1.2, 'Monday to Friday evening rush hour'),
('Weekend Premium', '00:00', '23:59', ARRAY[6,0], 1.15, 'Weekend premium pricing'),
('Late Night Premium', '22:00', '06:00', ARRAY[0,1,2,3,4,5,6], 1.3, 'Late night and early morning premium'),
('Event Season Premium', '18:00', '23:59', ARRAY[5,6], 1.25, 'Friday and Saturday evening event premium');

-- Insert Sample Availability (next 30 days)
DO $$
DECLARE
    driver_rec RECORD;
    vehicle_rec RECORD;
    start_date DATE := CURRENT_DATE;
    end_date DATE := CURRENT_DATE + INTERVAL '30 days';
    current_date DATE;
BEGIN
    -- Create availability for all drivers and vehicles for the next 30 days
    FOR driver_rec IN SELECT id FROM chauffeur_drivers LOOP
        FOR vehicle_rec IN SELECT id FROM chauffeur_vehicles LOOP
            current_date := start_date;
            WHILE current_date <= end_date LOOP
                -- Available during normal business hours (9 AM to 9 PM)
                INSERT INTO chauffeur_availability (driver_id, vehicle_id, start_datetime, end_datetime, availability_type)
                VALUES (
                    driver_rec.id,
                    vehicle_rec.id,
                    current_date + TIME '09:00',
                    current_date + TIME '21:00',
                    'available'
                );
                
                -- Some random unavailable periods (maintenance, busy)
                IF RANDOM() < 0.1 THEN
                    INSERT INTO chauffeur_availability (driver_id, vehicle_id, start_datetime, end_datetime, availability_type, notes)
                    VALUES (
                        driver_rec.id,
                        vehicle_rec.id,
                        current_date + TIME '14:00',
                        current_date + TIME '16:00',
                        'maintenance',
                        'Scheduled vehicle maintenance'
                    );
                END IF;
                
                current_date := current_date + INTERVAL '1 day';
            END LOOP;
        END LOOP;
    END LOOP;
END $$;