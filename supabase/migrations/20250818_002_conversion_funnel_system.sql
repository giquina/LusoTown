-- Conversion funnel system for LusoTown's 3-tier subscription model
-- This migration adds support for conversion tracking, email sequences, and trial management

-- Create subscription trials table for 7-day free trials
CREATE TABLE IF NOT EXISTS subscription_trials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  tier VARCHAR(20) NOT NULL CHECK (tier IN ('community', 'ambassador')),
  trial_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  trial_end TIMESTAMP WITH TIME ZONE NOT NULL,
  is_used BOOLEAN DEFAULT FALSE,
  converted_to_subscription BOOLEAN DEFAULT FALSE,
  subscription_id UUID REFERENCES subscriptions(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id, tier)
);

-- Create conversion events tracking table
CREATE TABLE IF NOT EXISTS conversion_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  event_type VARCHAR(50) NOT NULL CHECK (event_type IN (
    'upgrade_prompt_shown',
    'upgrade_clicked', 
    'trial_started',
    'trial_converted',
    'trial_expired',
    'limit_reached',
    'feature_blocked'
  )),
  trigger_type VARCHAR(50) NOT NULL CHECK (trigger_type IN (
    'matches_limit',
    'messages_limit', 
    'after_match',
    'premium_event',
    'general',
    'trial_reminder',
    'usage_warning'
  )),
  language VARCHAR(5) DEFAULT 'en',
  context_data JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  INDEX idx_conversion_events_user_type (user_id, event_type),
  INDEX idx_conversion_events_trigger (trigger_type),
  INDEX idx_conversion_events_created (created_at DESC)
);

-- Create email queue table for automated email sequences
CREATE TABLE IF NOT EXISTS email_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  email_type VARCHAR(50) NOT NULL CHECK (email_type IN (
    'welcome',
    'trial_reminder_day3',
    'trial_reminder_day6', 
    'trial_expired',
    'upgrade_sequence',
    'retention'
  )),
  send_at TIMESTAMP WITH TIME ZONE NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed', 'cancelled')),
  config JSONB DEFAULT '{}'::jsonb,
  sent_at TIMESTAMP WITH TIME ZONE,
  failed_at TIMESTAMP WITH TIME ZONE,
  cancelled_at TIMESTAMP WITH TIME ZONE,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  INDEX idx_email_queue_send_at (send_at),
  INDEX idx_email_queue_user_type (user_id, email_type),
  INDEX idx_email_queue_status (status)
);

-- Create email logs table for tracking sent emails
CREATE TABLE IF NOT EXISTS email_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  email_type VARCHAR(50) NOT NULL,
  recipient_email VARCHAR(255) NOT NULL,
  subject TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'sent' CHECK (status IN ('sent', 'delivered', 'opened', 'clicked', 'bounced', 'complained')),
  language VARCHAR(5) DEFAULT 'en',
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  delivered_at TIMESTAMP WITH TIME ZONE,
  opened_at TIMESTAMP WITH TIME ZONE,
  clicked_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}'::jsonb,
  
  INDEX idx_email_logs_user (user_id),
  INDEX idx_email_logs_type (email_type),
  INDEX idx_email_logs_status (status),
  INDEX idx_email_logs_sent (sent_at DESC)
);

-- Create usage warnings table to track when users approach limits
CREATE TABLE IF NOT EXISTS usage_warnings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  feature_type VARCHAR(50) NOT NULL CHECK (feature_type IN ('match', 'message', 'premium_event', 'livestream')),
  warning_type VARCHAR(20) NOT NULL CHECK (warning_type IN ('80_percent', '100_percent', 'exceeded')),
  usage_count INTEGER NOT NULL,
  limit_count INTEGER NOT NULL,
  shown_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  conversion_prompt_shown BOOLEAN DEFAULT FALSE,
  conversion_action_taken BOOLEAN DEFAULT FALSE,
  
  INDEX idx_usage_warnings_user_feature (user_id, feature_type),
  INDEX idx_usage_warnings_shown (shown_at DESC),
  UNIQUE(user_id, feature_type, warning_type, DATE(shown_at))
);

-- Update subscriptions table to track conversion source and trial info
ALTER TABLE subscriptions 
ADD COLUMN IF NOT EXISTS conversion_source VARCHAR(50),
ADD COLUMN IF NOT EXISTS trial_id UUID REFERENCES subscription_trials(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS promo_code VARCHAR(50),
ADD COLUMN IF NOT EXISTS discount_percentage INTEGER DEFAULT 0;

-- Add new tier values to existing constraint
ALTER TABLE subscriptions DROP CONSTRAINT IF EXISTS subscriptions_tier_check;
ALTER TABLE subscriptions ADD CONSTRAINT subscriptions_tier_check 
CHECK (tier IN ('free', 'community', 'ambassador'));

-- Create function to start a trial
CREATE OR REPLACE FUNCTION start_trial(
  p_user_id UUID,
  p_tier VARCHAR(20) DEFAULT 'community'
)
RETURNS UUID AS $$
DECLARE
  trial_id UUID;
  existing_trial RECORD;
BEGIN
  -- Check if user already has an active trial for this tier
  SELECT * INTO existing_trial
  FROM subscription_trials
  WHERE user_id = p_user_id 
    AND tier = p_tier 
    AND NOT is_used 
    AND trial_end > NOW();
  
  IF existing_trial IS NOT NULL THEN
    RETURN existing_trial.id;
  END IF;
  
  -- Check if user already used a trial for this tier
  SELECT * INTO existing_trial
  FROM subscription_trials
  WHERE user_id = p_user_id 
    AND tier = p_tier 
    AND is_used = TRUE;
  
  IF existing_trial IS NOT NULL THEN
    RAISE EXCEPTION 'User has already used trial for this tier';
  END IF;
  
  -- Create new trial (7 days)
  INSERT INTO subscription_trials (user_id, tier, trial_end)
  VALUES (
    p_user_id, 
    p_tier, 
    NOW() + INTERVAL '7 days'
  )
  RETURNING id INTO trial_id;
  
  -- Track trial start event
  INSERT INTO conversion_events (user_id, event_type, trigger_type)
  VALUES (p_user_id, 'trial_started', 'general');
  
  RETURN trial_id;
END;
$$ LANGUAGE plpgsql;

-- Create function to convert trial to subscription
CREATE OR REPLACE FUNCTION convert_trial_to_subscription(
  p_trial_id UUID,
  p_subscription_id UUID
)
RETURNS BOOLEAN AS $$
DECLARE
  trial_record RECORD;
BEGIN
  -- Get trial information
  SELECT * INTO trial_record
  FROM subscription_trials
  WHERE id = p_trial_id;
  
  IF trial_record IS NULL THEN
    RAISE EXCEPTION 'Trial not found';
  END IF;
  
  -- Mark trial as converted
  UPDATE subscription_trials
  SET is_used = TRUE,
      converted_to_subscription = TRUE,
      subscription_id = p_subscription_id,
      updated_at = NOW()
  WHERE id = p_trial_id;
  
  -- Update subscription with trial reference
  UPDATE subscriptions
  SET trial_id = p_trial_id,
      conversion_source = 'trial_conversion'
  WHERE id = p_subscription_id;
  
  -- Track conversion event
  INSERT INTO conversion_events (user_id, event_type, trigger_type, context_data)
  VALUES (
    trial_record.user_id, 
    'trial_converted', 
    'general',
    jsonb_build_object('trial_id', p_trial_id, 'subscription_id', p_subscription_id)
  );
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- Create function to track usage warnings
CREATE OR REPLACE FUNCTION track_usage_warning(
  p_user_id UUID,
  p_feature_type VARCHAR(50),
  p_usage_count INTEGER,
  p_limit_count INTEGER
)
RETURNS BOOLEAN AS $$
DECLARE
  warning_type VARCHAR(20);
  usage_percentage FLOAT;
BEGIN
  -- Calculate usage percentage
  usage_percentage := (p_usage_count::FLOAT / p_limit_count::FLOAT) * 100;
  
  -- Determine warning type
  IF usage_percentage >= 100 THEN
    warning_type := '100_percent';
  ELSIF usage_percentage >= 80 THEN
    warning_type := '80_percent';
  ELSE
    RETURN FALSE; -- No warning needed
  END IF;
  
  -- Insert warning (unique constraint prevents duplicates for same day)
  BEGIN
    INSERT INTO usage_warnings (
      user_id,
      feature_type,
      warning_type,
      usage_count,
      limit_count
    )
    VALUES (
      p_user_id,
      p_feature_type,
      warning_type,
      p_usage_count,
      p_limit_count
    );
    
    -- Track conversion event
    INSERT INTO conversion_events (user_id, event_type, trigger_type, context_data)
    VALUES (
      p_user_id,
      CASE 
        WHEN warning_type = '100_percent' THEN 'limit_reached'
        ELSE 'usage_warning'
      END,
      p_feature_type || '_limit',
      jsonb_build_object(
        'usage_count', p_usage_count,
        'limit_count', p_limit_count,
        'percentage', usage_percentage
      )
    );
    
    RETURN TRUE;
  EXCEPTION WHEN unique_violation THEN
    -- Warning already exists for today
    RETURN FALSE;
  END;
END;
$$ LANGUAGE plpgsql;

-- Create function to process email queue
CREATE OR REPLACE FUNCTION process_email_queue()
RETURNS INTEGER AS $$
DECLARE
  email_record RECORD;
  processed_count INTEGER := 0;
BEGIN
  -- Get emails ready to send
  FOR email_record IN 
    SELECT * FROM email_queue 
    WHERE status = 'pending' 
      AND send_at <= NOW()
    ORDER BY send_at ASC
    LIMIT 100
  LOOP
    -- Update status to processing to prevent duplicate processing
    UPDATE email_queue 
    SET status = 'processing', updated_at = NOW()
    WHERE id = email_record.id;
    
    -- Here you would integrate with your email service
    -- For now, just mark as sent
    UPDATE email_queue
    SET status = 'sent', sent_at = NOW(), updated_at = NOW()
    WHERE id = email_record.id;
    
    processed_count := processed_count + 1;
  END LOOP;
  
  RETURN processed_count;
END;
$$ LANGUAGE plpgsql;

-- Create function to get conversion funnel metrics
CREATE OR REPLACE FUNCTION get_conversion_metrics(
  p_start_date TIMESTAMP WITH TIME ZONE DEFAULT (NOW() - INTERVAL '30 days'),
  p_end_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
)
RETURNS TABLE(
  metric_name TEXT,
  metric_value INTEGER,
  conversion_rate FLOAT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    'signups' as metric_name,
    COUNT(*)::INTEGER as metric_value,
    0.0 as conversion_rate
  FROM profiles 
  WHERE created_at BETWEEN p_start_date AND p_end_date
  
  UNION ALL
  
  SELECT 
    'trials_started' as metric_name,
    COUNT(*)::INTEGER as metric_value,
    (COUNT(*) * 100.0 / NULLIF((
      SELECT COUNT(*) FROM profiles 
      WHERE created_at BETWEEN p_start_date AND p_end_date
    ), 0)) as conversion_rate
  FROM subscription_trials 
  WHERE trial_start BETWEEN p_start_date AND p_end_date
  
  UNION ALL
  
  SELECT 
    'trial_conversions' as metric_name,
    COUNT(*)::INTEGER as metric_value,
    (COUNT(*) * 100.0 / NULLIF((
      SELECT COUNT(*) FROM subscription_trials 
      WHERE trial_start BETWEEN p_start_date AND p_end_date
    ), 0)) as conversion_rate
  FROM subscription_trials 
  WHERE trial_start BETWEEN p_start_date AND p_end_date
    AND converted_to_subscription = TRUE
  
  UNION ALL
  
  SELECT 
    'upgrade_prompts_shown' as metric_name,
    COUNT(*)::INTEGER as metric_value,
    0.0 as conversion_rate
  FROM conversion_events 
  WHERE event_type = 'upgrade_prompt_shown'
    AND created_at BETWEEN p_start_date AND p_end_date
  
  UNION ALL
  
  SELECT 
    'upgrade_clicks' as metric_name,
    COUNT(*)::INTEGER as metric_value,
    (COUNT(*) * 100.0 / NULLIF((
      SELECT COUNT(*) FROM conversion_events 
      WHERE event_type = 'upgrade_prompt_shown'
        AND created_at BETWEEN p_start_date AND p_end_date
    ), 0)) as conversion_rate
  FROM conversion_events 
  WHERE event_type = 'upgrade_clicked'
    AND created_at BETWEEN p_start_date AND p_end_date;
END;
$$ LANGUAGE plpgsql;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_subscription_trials_user_active ON subscription_trials(user_id) WHERE NOT is_used AND trial_end > NOW();
CREATE INDEX IF NOT EXISTS idx_conversion_events_user_date ON conversion_events(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_email_queue_ready ON email_queue(send_at) WHERE status = 'pending';
CREATE INDEX IF NOT EXISTS idx_usage_warnings_recent ON usage_warnings(shown_at DESC) WHERE shown_at > NOW() - INTERVAL '7 days';

-- Enable RLS on new tables
ALTER TABLE subscription_trials ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversion_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_warnings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for subscription_trials
CREATE POLICY "Users can view own trials" ON subscription_trials FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own trials" ON subscription_trials FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own trials" ON subscription_trials FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for conversion_events
CREATE POLICY "Users can view own conversion events" ON conversion_events FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Service can insert conversion events" ON conversion_events FOR INSERT WITH CHECK (TRUE);

-- RLS Policies for email_queue
CREATE POLICY "Users can view own email queue" ON email_queue FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Service can manage email queue" ON email_queue FOR ALL USING (TRUE);

-- RLS Policies for email_logs
CREATE POLICY "Users can view own email logs" ON email_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Service can insert email logs" ON email_logs FOR INSERT WITH CHECK (TRUE);

-- RLS Policies for usage_warnings
CREATE POLICY "Users can view own usage warnings" ON usage_warnings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Service can manage usage warnings" ON usage_warnings FOR ALL USING (TRUE);

-- Create triggers for updated_at columns
CREATE TRIGGER update_subscription_trials_updated_at 
  BEFORE UPDATE ON subscription_trials 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_email_queue_updated_at 
  BEFORE UPDATE ON email_queue 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Insert sample promotional codes for Portuguese community
INSERT INTO pricing_promotions (promo_code, discount_percentage, valid_until, target_audience, description_en, description_pt, max_uses) VALUES
  ('LUSO20', 20, '2025-12-31 23:59:59+00', 'general', 'Portuguese Community Welcome Discount', 'Desconto de Boas-Vindas da Comunidade Portuguesa', 1000),
  ('TRIAL2025', 15, '2025-09-30 23:59:59+00', 'trial_expired', 'Trial Conversion Incentive', 'Incentivo de Conversão de Teste', 500),
  ('COMMUNITY50', 50, '2025-08-31 23:59:59+00', 'students', 'Student Community Discount', 'Desconto Comunitário para Estudantes', 200)
ON CONFLICT (promo_code) DO NOTHING;

-- Comments
COMMENT ON TABLE subscription_trials IS 'Manages 7-day free trials for Portuguese community members';
COMMENT ON TABLE conversion_events IS 'Tracks conversion funnel events for analytics and optimization';
COMMENT ON TABLE email_queue IS 'Automated email sequences for trial reminders and retention';
COMMENT ON TABLE email_logs IS 'Logs all emails sent for delivery tracking and compliance';
COMMENT ON TABLE usage_warnings IS 'Tracks when users approach usage limits to trigger upgrade prompts';

-- End of migration