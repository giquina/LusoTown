-- Enhanced subscription system for Portuguese community networking and business features
-- This migration adds support for the new tier structure, usage tracking, and feature gating

-- Update subscriptions table with new tier structure
ALTER TABLE subscriptions 
ADD COLUMN IF NOT EXISTS plan_type VARCHAR(20) DEFAULT 'yearly' CHECK (plan_type IN ('monthly', 'yearly')),
ADD COLUMN IF NOT EXISTS student_verified BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS corporate_account_id VARCHAR(255),
ADD COLUMN IF NOT EXISTS trial_used BOOLEAN DEFAULT FALSE;

-- Update tier values to new structure
UPDATE subscriptions SET tier = CASE
  WHEN tier = 'bronze' THEN 'professional'
  WHEN tier = 'silver' THEN 'professional'  
  WHEN tier = 'gold' THEN 'business'
  WHEN tier = 'platinum' THEN 'vip'
  ELSE 'basic'
END;

-- Create subscription usage tracking table
CREATE TABLE IF NOT EXISTS subscription_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  daily_matches_used INTEGER DEFAULT 0,
  monthly_messages_used INTEGER DEFAULT 0,
  premium_events_used INTEGER DEFAULT 0,
  livestream_hours_used INTEGER DEFAULT 0,
  last_reset_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create subscription feature tracking table
CREATE TABLE IF NOT EXISTS subscription_features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  feature_type VARCHAR(50) NOT NULL CHECK (feature_type IN ('match', 'message', 'premium_event', 'livestream')),
  used_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  tier VARCHAR(20) NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Create student verification table
CREATE TABLE IF NOT EXISTS student_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  university_id VARCHAR(100) NOT NULL,
  student_email VARCHAR(255) NOT NULL,
  verification_code VARCHAR(10),
  verified_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, university_id)
);

-- Create corporate accounts table
CREATE TABLE IF NOT EXISTS corporate_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name VARCHAR(255) NOT NULL,
  company_email VARCHAR(255) NOT NULL UNIQUE,
  admin_user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  employee_count INTEGER DEFAULT 0,
  discount_percentage INTEGER DEFAULT 0,
  billing_cycle VARCHAR(20) DEFAULT 'yearly' CHECK (billing_cycle IN ('monthly', 'yearly')),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create corporate employees table
CREATE TABLE IF NOT EXISTS corporate_employees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  corporate_account_id UUID NOT NULL REFERENCES corporate_accounts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  employee_email VARCHAR(255) NOT NULL,
  role VARCHAR(100) DEFAULT 'employee',
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE,
  UNIQUE(corporate_account_id, user_id)
);

-- Create pricing promotions table
CREATE TABLE IF NOT EXISTS pricing_promotions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  promo_code VARCHAR(50) NOT NULL UNIQUE,
  discount_percentage INTEGER NOT NULL CHECK (discount_percentage > 0 AND discount_percentage <= 100),
  valid_from TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  valid_until TIMESTAMP WITH TIME ZONE NOT NULL,
  max_uses INTEGER,
  current_uses INTEGER DEFAULT 0,
  applicable_tiers VARCHAR(100)[] DEFAULT ARRAY['professional', 'business', 'vip'],
  target_audience VARCHAR(100), -- 'students', 'families', 'businesses', etc.
  description_en TEXT,
  description_pt TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create promotion usage tracking
CREATE TABLE IF NOT EXISTS promotion_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  promotion_id UUID NOT NULL REFERENCES pricing_promotions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  subscription_id UUID REFERENCES subscriptions(id) ON DELETE SET NULL,
  used_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  discount_amount INTEGER NOT NULL,
  UNIQUE(promotion_id, user_id)
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_subscription_usage_user_date ON subscription_usage(user_id, last_reset_date);
CREATE INDEX IF NOT EXISTS idx_subscription_features_user_type ON subscription_features(user_id, feature_type);
CREATE INDEX IF NOT EXISTS idx_student_verifications_user ON student_verifications(user_id);
CREATE INDEX IF NOT EXISTS idx_corporate_employees_account ON corporate_employees(corporate_account_id);
CREATE INDEX IF NOT EXISTS idx_pricing_promotions_code ON pricing_promotions(promo_code) WHERE is_active = TRUE;
CREATE INDEX IF NOT EXISTS idx_subscriptions_tier_status ON subscriptions(tier, status);

-- Create function to reset daily usage counters
CREATE OR REPLACE FUNCTION reset_daily_usage_counters()
RETURNS void AS $$
BEGIN
  UPDATE subscription_usage 
  SET daily_matches_used = 0,
      last_reset_date = CURRENT_DATE
  WHERE last_reset_date < CURRENT_DATE;
END;
$$ LANGUAGE plpgsql;

-- Create function to reset monthly usage counters  
CREATE OR REPLACE FUNCTION reset_monthly_usage_counters()
RETURNS void AS $$
BEGIN
  UPDATE subscription_usage 
  SET monthly_messages_used = 0
  WHERE DATE_TRUNC('month', last_reset_date) < DATE_TRUNC('month', CURRENT_DATE);
END;
$$ LANGUAGE plpgsql;

-- Create function to track feature usage
CREATE OR REPLACE FUNCTION track_feature_usage(
  p_user_id UUID,
  p_feature_type VARCHAR(50),
  p_tier VARCHAR(20),
  p_metadata JSONB DEFAULT '{}'::jsonb
)
RETURNS BOOLEAN AS $$
DECLARE
  usage_limits RECORD;
  current_usage RECORD;
  can_use BOOLEAN := FALSE;
BEGIN
  -- Get current usage for the user
  SELECT * INTO current_usage
  FROM subscription_usage 
  WHERE user_id = p_user_id;
  
  -- Create usage record if doesn't exist
  IF current_usage IS NULL THEN
    INSERT INTO subscription_usage (user_id) VALUES (p_user_id);
    SELECT * INTO current_usage FROM subscription_usage WHERE user_id = p_user_id;
  END IF;
  
  -- Reset counters if needed
  IF current_usage.last_reset_date < CURRENT_DATE THEN
    UPDATE subscription_usage 
    SET daily_matches_used = 0,
        last_reset_date = CURRENT_DATE
    WHERE user_id = p_user_id;
    current_usage.daily_matches_used := 0;
  END IF;
  
  -- Check if monthly reset is needed
  IF DATE_TRUNC('month', current_usage.last_reset_date) < DATE_TRUNC('month', CURRENT_DATE) THEN
    UPDATE subscription_usage 
    SET monthly_messages_used = 0
    WHERE user_id = p_user_id;
    current_usage.monthly_messages_used := 0;
  END IF;
  
  -- Check usage limits based on tier and feature
  CASE p_tier
    WHEN 'basic' THEN
      CASE p_feature_type
        WHEN 'match' THEN can_use := current_usage.daily_matches_used < 5;
        WHEN 'message' THEN can_use := current_usage.monthly_messages_used < 20;
        WHEN 'premium_event' THEN can_use := FALSE;
        WHEN 'livestream' THEN can_use := FALSE;
      END CASE;
    WHEN 'student' THEN
      CASE p_feature_type
        WHEN 'match' THEN can_use := current_usage.daily_matches_used < 50;
        WHEN 'message' THEN can_use := current_usage.monthly_messages_used < 100;
        WHEN 'premium_event' THEN can_use := current_usage.premium_events_used < 2;
        WHEN 'livestream' THEN can_use := current_usage.livestream_hours_used < 5;
      END CASE;
    WHEN 'professional', 'business', 'vip' THEN
      can_use := TRUE; -- Unlimited for premium tiers
  END CASE;
  
  -- If usage is allowed, increment counter and track usage
  IF can_use THEN
    -- Update usage counters
    CASE p_feature_type
      WHEN 'match' THEN
        UPDATE subscription_usage 
        SET daily_matches_used = daily_matches_used + 1
        WHERE user_id = p_user_id;
      WHEN 'message' THEN
        UPDATE subscription_usage 
        SET monthly_messages_used = monthly_messages_used + 1
        WHERE user_id = p_user_id;
      WHEN 'premium_event' THEN
        UPDATE subscription_usage 
        SET premium_events_used = premium_events_used + 1
        WHERE user_id = p_user_id;
      WHEN 'livestream' THEN
        UPDATE subscription_usage 
        SET livestream_hours_used = livestream_hours_used + 1
        WHERE user_id = p_user_id;
    END CASE;
    
    -- Track the feature usage
    INSERT INTO subscription_features (user_id, feature_type, tier, metadata)
    VALUES (p_user_id, p_feature_type, p_tier, p_metadata);
  END IF;
  
  RETURN can_use;
END;
$$ LANGUAGE plpgsql;

-- Create function to validate student status
CREATE OR REPLACE FUNCTION validate_student_email(
  p_email VARCHAR(255),
  p_university_id VARCHAR(100)
)
RETURNS BOOLEAN AS $$
DECLARE
  allowed_domains TEXT[] := ARRAY[
    'cam.ac.uk', 'student.cam.ac.uk',
    'ox.ac.uk', 'student.ox.ac.uk', 
    'imperial.ac.uk', 'ic.ac.uk',
    'ucl.ac.uk', 'live.ucl.ac.uk',
    'lse.ac.uk', 'student.lse.ac.uk',
    'kcl.ac.uk', 'student.kcl.ac.uk'
  ];
  email_domain TEXT;
  is_valid BOOLEAN := FALSE;
BEGIN
  email_domain := split_part(p_email, '@', 2);
  
  -- Check if email domain is in allowed list
  SELECT email_domain = ANY(allowed_domains) INTO is_valid;
  
  RETURN is_valid;
END;
$$ LANGUAGE plpgsql;

-- Create function to apply promotional pricing
CREATE OR REPLACE FUNCTION apply_promotion(
  p_user_id UUID,
  p_promo_code VARCHAR(50),
  p_subscription_id UUID
)
RETURNS JSONB AS $$
DECLARE
  promotion RECORD;
  result JSONB;
BEGIN
  -- Get promotion details
  SELECT * INTO promotion
  FROM pricing_promotions 
  WHERE promo_code = p_promo_code 
    AND is_active = TRUE
    AND valid_from <= NOW()
    AND valid_until >= NOW()
    AND (max_uses IS NULL OR current_uses < max_uses);
  
  IF promotion IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'Invalid or expired promotion code');
  END IF;
  
  -- Check if user already used this promotion
  IF EXISTS(SELECT 1 FROM promotion_usage WHERE promotion_id = promotion.id AND user_id = p_user_id) THEN
    RETURN jsonb_build_object('success', false, 'error', 'Promotion already used');
  END IF;
  
  -- Apply promotion
  INSERT INTO promotion_usage (promotion_id, user_id, subscription_id, discount_amount)
  VALUES (promotion.id, p_user_id, p_subscription_id, promotion.discount_percentage);
  
  -- Update promotion usage count
  UPDATE pricing_promotions 
  SET current_uses = current_uses + 1
  WHERE id = promotion.id;
  
  RETURN jsonb_build_object(
    'success', true, 
    'discount_percentage', promotion.discount_percentage,
    'description_en', promotion.description_en,
    'description_pt', promotion.description_pt
  );
END;
$$ LANGUAGE plpgsql;

-- Insert default promotional codes
INSERT INTO pricing_promotions (promo_code, discount_percentage, valid_until, target_audience, description_en, description_pt) VALUES
  ('LUSO2025', 25, '2025-12-31 23:59:59+00', 'general', 'New Year Portuguese Community Special', 'Especial de Ano Novo da Comunidade Portuguesa'),
  ('STUDENT50', 50, '2025-09-30 23:59:59+00', 'students', 'Student Back-to-School Discount', 'Desconto de Volta às Aulas para Estudantes'),
  ('FAMILY20', 20, '2025-06-30 23:59:59+00', 'families', 'Family Membership Discount', 'Desconto para Membros de Família'),
  ('BUSINESS15', 15, '2025-08-31 23:59:59+00', 'businesses', 'Business Network Early Bird', 'Early Bird da Rede de Negócios')
ON CONFLICT (promo_code) DO NOTHING;

-- Add RLS policies for new tables
ALTER TABLE subscription_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE corporate_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE corporate_employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_promotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE promotion_usage ENABLE ROW LEVEL SECURITY;

-- RLS Policies for subscription_usage
CREATE POLICY "Users can view own usage" ON subscription_usage FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own usage" ON subscription_usage FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own usage" ON subscription_usage FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for subscription_features  
CREATE POLICY "Users can view own features" ON subscription_features FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Service can insert features" ON subscription_features FOR INSERT WITH CHECK (TRUE);

-- RLS Policies for student_verifications
CREATE POLICY "Users can view own verifications" ON student_verifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own verifications" ON student_verifications FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for corporate accounts
CREATE POLICY "Corporate admins can view accounts" ON corporate_accounts FOR SELECT USING (auth.uid() = admin_user_id);
CREATE POLICY "Corporate admins can manage accounts" ON corporate_accounts FOR ALL USING (auth.uid() = admin_user_id);

-- RLS Policies for corporate employees
CREATE POLICY "Employees can view own corporate data" ON corporate_employees FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Corporate admins can manage employees" ON corporate_employees FOR ALL USING (
  EXISTS(SELECT 1 FROM corporate_accounts WHERE id = corporate_account_id AND admin_user_id = auth.uid())
);

-- RLS Policies for pricing promotions
CREATE POLICY "Everyone can view active promotions" ON pricing_promotions FOR SELECT USING (is_active = TRUE);

-- RLS Policies for promotion usage
CREATE POLICY "Users can view own promotion usage" ON promotion_usage FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own promotion usage" ON promotion_usage FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_subscription_usage_updated_at BEFORE UPDATE ON subscription_usage FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_student_verifications_updated_at BEFORE UPDATE ON student_verifications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_corporate_accounts_updated_at BEFORE UPDATE ON corporate_accounts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_pricing_promotions_updated_at BEFORE UPDATE ON pricing_promotions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Add comment explaining the enhanced subscription system
COMMENT ON TABLE subscription_usage IS 'Tracks feature usage per user to enforce subscription limits';
COMMENT ON TABLE subscription_features IS 'Logs all feature usage for analytics and billing';
COMMENT ON TABLE student_verifications IS 'Manages student email verification for discounted subscriptions';
COMMENT ON TABLE corporate_accounts IS 'Corporate subscription accounts with bulk pricing';
COMMENT ON TABLE pricing_promotions IS 'Promotional codes and discounts for Portuguese community';

-- End of migration