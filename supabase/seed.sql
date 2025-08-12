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