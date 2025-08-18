-- Referral System for LusoTown Portuguese Community
-- This migration creates the complete referral program with Portuguese community focus

-- Create referral codes table
CREATE TABLE IF NOT EXISTS referral_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  code VARCHAR(20) NOT NULL UNIQUE,
  uses_count INTEGER DEFAULT 0,
  max_uses INTEGER DEFAULT NULL, -- NULL means unlimited
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create referral tracking table
CREATE TABLE IF NOT EXISTS referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  referred_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  referral_code VARCHAR(20) NOT NULL REFERENCES referral_codes(code),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'completed', 'cancelled')),
  completed_at TIMESTAMP WITH TIME ZONE,
  reward_given BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(referred_id) -- Each user can only be referred once
);

-- Create referral rewards table
CREATE TABLE IF NOT EXISTS referral_rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  referral_id UUID NOT NULL REFERENCES referrals(id) ON DELETE CASCADE,
  reward_type VARCHAR(30) DEFAULT 'free_month' CHECK (reward_type IN ('free_month', 'discount', 'credit', 'bonus_features')),
  reward_value INTEGER NOT NULL, -- Days for free_month, percentage for discount, amount for credit
  currency VARCHAR(3) DEFAULT 'GBP',
  is_redeemed BOOLEAN DEFAULT FALSE,
  redeemed_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  description_en TEXT,
  description_pt TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create referral campaigns table (for special Portuguese community campaigns)
CREATE TABLE IF NOT EXISTS referral_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(50) NOT NULL UNIQUE,
  title_en VARCHAR(200) NOT NULL,
  title_pt VARCHAR(200) NOT NULL,
  description_en TEXT,
  description_pt TEXT,
  reward_referrer_type VARCHAR(30) DEFAULT 'free_month',
  reward_referrer_value INTEGER DEFAULT 30,
  reward_referee_type VARCHAR(30) DEFAULT 'discount',
  reward_referee_value INTEGER DEFAULT 20,
  min_referrals_for_bonus INTEGER DEFAULT 5,
  bonus_reward_type VARCHAR(30) DEFAULT 'free_month',
  bonus_reward_value INTEGER DEFAULT 60,
  start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  end_date TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT TRUE,
  target_audience VARCHAR(50), -- 'portuguese_speakers', 'students', 'families', 'businesses'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create referral leaderboard view
CREATE OR REPLACE VIEW referral_leaderboard AS
SELECT 
  u.id,
  u.first_name,
  u.last_name,
  rc.code,
  COUNT(r.id) as total_referrals,
  COUNT(CASE WHEN r.status = 'completed' THEN 1 END) as completed_referrals,
  COUNT(CASE WHEN r.status = 'active' THEN 1 END) as active_referrals,
  SUM(CASE WHEN rw.reward_type = 'free_month' THEN rw.reward_value ELSE 0 END) as total_free_days,
  MAX(r.created_at) as last_referral_date
FROM profiles u
JOIN referral_codes rc ON u.id = rc.user_id
LEFT JOIN referrals r ON rc.code = r.referral_code
LEFT JOIN referral_rewards rw ON r.id = rw.referral_id AND rw.user_id = u.id
WHERE rc.is_active = TRUE
GROUP BY u.id, u.first_name, u.last_name, rc.code
ORDER BY completed_referrals DESC, total_referrals DESC;

-- Create function to generate unique referral code
CREATE OR REPLACE FUNCTION generate_referral_code(p_user_id UUID)
RETURNS VARCHAR(20) AS $$
DECLARE
  user_data RECORD;
  base_code VARCHAR(20);
  final_code VARCHAR(20);
  counter INTEGER := 0;
BEGIN
  -- Get user data
  SELECT first_name, last_name INTO user_data FROM profiles WHERE id = p_user_id;
  
  -- Create base code from name (Portuguese-friendly)
  base_code := UPPER(SUBSTR(COALESCE(user_data.first_name, 'USER'), 1, 4) || 
                    SUBSTR(COALESCE(user_data.last_name, ''), 1, 3));
  
  -- Remove special characters and ensure it's Portuguese community friendly
  base_code := REGEXP_REPLACE(base_code, '[^A-Z0-9]', '', 'g');
  
  -- Ensure minimum length
  IF LENGTH(base_code) < 4 THEN
    base_code := base_code || 'LUSO';
  END IF;
  
  -- Add random numbers to make it unique
  LOOP
    final_code := base_code || LPAD((RANDOM() * 9999)::INTEGER::TEXT, 4, '0');
    
    -- Check if code exists
    IF NOT EXISTS(SELECT 1 FROM referral_codes WHERE code = final_code) THEN
      EXIT;
    END IF;
    
    counter := counter + 1;
    IF counter > 100 THEN
      -- Fallback to completely random code
      final_code := 'LUSO' || LPAD((RANDOM() * 999999)::INTEGER::TEXT, 6, '0');
      EXIT;
    END IF;
  END LOOP;
  
  RETURN final_code;
END;
$$ LANGUAGE plpgsql;

-- Create function to process successful referral
CREATE OR REPLACE FUNCTION process_successful_referral(p_referred_user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  referral_record RECORD;
  campaign_record RECORD;
BEGIN
  -- Get the referral record
  SELECT * INTO referral_record 
  FROM referrals 
  WHERE referred_id = p_referred_user_id AND status = 'pending';
  
  IF referral_record IS NULL THEN
    RETURN FALSE;
  END IF;
  
  -- Update referral status to active
  UPDATE referrals 
  SET status = 'active', completed_at = NOW()
  WHERE id = referral_record.id;
  
  -- Get current campaign (if any)
  SELECT * INTO campaign_record
  FROM referral_campaigns
  WHERE is_active = TRUE 
    AND start_date <= NOW() 
    AND (end_date IS NULL OR end_date >= NOW())
  ORDER BY created_at DESC
  LIMIT 1;
  
  -- Give reward to referrer
  INSERT INTO referral_rewards (
    user_id, 
    referral_id, 
    reward_type, 
    reward_value,
    description_en,
    description_pt,
    expires_at
  ) VALUES (
    referral_record.referrer_id,
    referral_record.id,
    COALESCE(campaign_record.reward_referrer_type, 'free_month'),
    COALESCE(campaign_record.reward_referrer_value, 30),
    'Free month for successful Portuguese community referral',
    'Mês grátis por referência bem-sucedida da comunidade portuguesa',
    NOW() + INTERVAL '1 year'
  );
  
  -- Give welcome reward to referred user
  INSERT INTO referral_rewards (
    user_id, 
    referral_id, 
    reward_type, 
    reward_value,
    description_en,
    description_pt,
    expires_at
  ) VALUES (
    referral_record.referred_id,
    referral_record.id,
    COALESCE(campaign_record.reward_referee_type, 'discount'),
    COALESCE(campaign_record.reward_referee_value, 20),
    'Welcome discount for joining Portuguese community',
    'Desconto de boas-vindas por se juntar à comunidade portuguesa',
    NOW() + INTERVAL '3 months'
  );
  
  -- Update referral code usage count
  UPDATE referral_codes 
  SET uses_count = uses_count + 1
  WHERE code = referral_record.referral_code;
  
  -- Mark referral as reward given
  UPDATE referrals 
  SET reward_given = TRUE
  WHERE id = referral_record.id;
  
  -- Check for bonus rewards (5+ successful referrals)
  IF campaign_record IS NOT NULL AND campaign_record.min_referrals_for_bonus IS NOT NULL THEN
    DECLARE
      total_completed INTEGER;
    BEGIN
      SELECT COUNT(*) INTO total_completed
      FROM referrals
      WHERE referrer_id = referral_record.referrer_id 
        AND status = 'completed'
        AND created_at >= campaign_record.start_date;
      
      -- Give bonus reward if threshold reached
      IF total_completed >= campaign_record.min_referrals_for_bonus THEN
        INSERT INTO referral_rewards (
          user_id, 
          referral_id, 
          reward_type, 
          reward_value,
          description_en,
          description_pt,
          expires_at
        ) VALUES (
          referral_record.referrer_id,
          referral_record.id,
          campaign_record.bonus_reward_type,
          campaign_record.bonus_reward_value,
          'Bonus reward for ' || campaign_record.min_referrals_for_bonus || '+ successful referrals',
          'Recompensa bónus por ' || campaign_record.min_referrals_for_bonus || '+ referências bem-sucedidas',
          NOW() + INTERVAL '1 year'
        );
      END IF;
    END;
  END IF;
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- Create function to check if user can be referred
CREATE OR REPLACE FUNCTION can_refer_user(p_referrer_id UUID, p_email VARCHAR)
RETURNS BOOLEAN AS $$
DECLARE
  existing_user UUID;
BEGIN
  -- Check if user with this email already exists
  SELECT id INTO existing_user FROM profiles WHERE email = p_email;
  
  -- Can't refer existing users
  IF existing_user IS NOT NULL THEN
    RETURN FALSE;
  END IF;
  
  -- Check if referrer has an active referral code
  IF NOT EXISTS(SELECT 1 FROM referral_codes WHERE user_id = p_referrer_id AND is_active = TRUE) THEN
    RETURN FALSE;
  END IF;
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_referral_codes_user ON referral_codes(user_id);
CREATE INDEX IF NOT EXISTS idx_referral_codes_code ON referral_codes(code) WHERE is_active = TRUE;
CREATE INDEX IF NOT EXISTS idx_referrals_referrer ON referrals(referrer_id);
CREATE INDEX IF NOT EXISTS idx_referrals_referred ON referrals(referred_id);
CREATE INDEX IF NOT EXISTS idx_referrals_status ON referrals(status);
CREATE INDEX IF NOT EXISTS idx_referral_rewards_user ON referral_rewards(user_id);
CREATE INDEX IF NOT EXISTS idx_referral_rewards_redeemed ON referral_rewards(is_redeemed);
CREATE INDEX IF NOT EXISTS idx_referral_campaigns_active ON referral_campaigns(is_active, start_date, end_date);

-- Enable RLS
ALTER TABLE referral_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE referral_rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE referral_campaigns ENABLE ROW LEVEL SECURITY;

-- RLS Policies for referral_codes
CREATE POLICY "Users can view own referral codes" ON referral_codes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own referral codes" ON referral_codes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own referral codes" ON referral_codes FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for referrals
CREATE POLICY "Users can view own referrals" ON referrals FOR SELECT USING (
  auth.uid() = referrer_id OR auth.uid() = referred_id
);
CREATE POLICY "System can manage referrals" ON referrals FOR ALL USING (TRUE);

-- RLS Policies for referral_rewards
CREATE POLICY "Users can view own rewards" ON referral_rewards FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own rewards" ON referral_rewards FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "System can manage rewards" ON referral_rewards FOR INSERT WITH CHECK (TRUE);

-- RLS Policies for referral_campaigns
CREATE POLICY "Everyone can view active campaigns" ON referral_campaigns FOR SELECT USING (is_active = TRUE);

-- Insert default "Bring Portuguese Friends" campaign
INSERT INTO referral_campaigns (
  name,
  slug,
  title_en,
  title_pt,
  description_en,
  description_pt,
  reward_referrer_type,
  reward_referrer_value,
  reward_referee_type,
  reward_referee_value,
  min_referrals_for_bonus,
  bonus_reward_type,
  bonus_reward_value,
  target_audience,
  end_date
) VALUES (
  'Bring Portuguese Friends 2025',
  'bring-portuguese-friends-2025',
  'Bring Portuguese Friends to LusoTown',
  'Convide Amigos Portugueses para o LusoTown',
  'Help grow our Portuguese community in London! Get a free month for each friend who joins and stays active for 30 days. Bring 5 friends and get 2 months free!',
  'Ajude a crescer a nossa comunidade portuguesa em Londres! Ganhe um mês grátis por cada amigo que se junte e permaneça ativo por 30 dias. Convide 5 amigos e ganhe 2 meses grátis!',
  'free_month',
  30,
  'discount',
  25,
  5,
  'free_month',
  60,
  'portuguese_speakers',
  '2025-12-31 23:59:59+00'
) ON CONFLICT (slug) DO NOTHING;

-- Create triggers for updated_at
CREATE TRIGGER update_referral_codes_updated_at BEFORE UPDATE ON referral_codes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_referrals_updated_at BEFORE UPDATE ON referrals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_referral_rewards_updated_at BEFORE UPDATE ON referral_rewards FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_referral_campaigns_updated_at BEFORE UPDATE ON referral_campaigns FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Comments
COMMENT ON TABLE referral_codes IS 'Unique referral codes for each user to track referrals';
COMMENT ON TABLE referrals IS 'Tracks all referral relationships and their status';
COMMENT ON TABLE referral_rewards IS 'Manages rewards given for successful referrals';
COMMENT ON TABLE referral_campaigns IS 'Special Portuguese community referral campaigns';
COMMENT ON VIEW referral_leaderboard IS 'Leaderboard showing top referrers in Portuguese community';