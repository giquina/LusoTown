-- Security Audit Logging Table for Portuguese Community Platform
-- This schema enhances platform security with comprehensive audit trails

-- Security audit log table
CREATE TABLE IF NOT EXISTS security_audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    ip_address INET NOT NULL,
    user_agent TEXT,
    event_type TEXT NOT NULL CHECK (event_type IN (
        'LOGIN_ATTEMPT', 
        'FAILED_CSRF', 
        'RATE_LIMIT_EXCEEDED', 
        'SUSPICIOUS_ACTIVITY', 
        'XSS_ATTEMPT', 
        'SQL_INJECTION_ATTEMPT', 
        'FILE_UPLOAD',
        'DATA_ACCESS',
        'BRUTE_FORCE_DETECTED',
        'SESSION_HIJACK_ATTEMPT',
        'UNAUTHORIZED_API_ACCESS'
    )),
    severity TEXT NOT NULL CHECK (severity IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
    description TEXT NOT NULL,
    cultural_context TEXT CHECK (cultural_context IN ('portuguese-uk', 'general')),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Index for efficient querying
    CONSTRAINT security_audit_valid_severity CHECK (severity IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL'))
);

-- Indexes for security audit log performance
CREATE INDEX IF NOT EXISTS idx_security_audit_created_at ON security_audit_log(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_security_audit_ip ON security_audit_log(ip_address);
CREATE INDEX IF NOT EXISTS idx_security_audit_severity ON security_audit_log(severity);
CREATE INDEX IF NOT EXISTS idx_security_audit_event_type ON security_audit_log(event_type);
CREATE INDEX IF NOT EXISTS idx_security_audit_user ON security_audit_log(user_id) WHERE user_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_security_audit_cultural_context ON security_audit_log(cultural_context);

-- User sessions table for secure session management
CREATE TABLE IF NOT EXISTS user_sessions (
    session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    session_token TEXT UNIQUE NOT NULL,
    user_agent TEXT,
    ip_address INET,
    cultural_context TEXT DEFAULT 'general',
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_activity TIMESTAMPTZ DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE,
    
    -- Security constraints
    CONSTRAINT session_token_length CHECK (length(session_token) >= 32),
    CONSTRAINT session_expires_future CHECK (expires_at > created_at)
);

-- Session indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_sessions_token ON user_sessions(session_token) WHERE is_active = TRUE;
CREATE INDEX IF NOT EXISTS idx_user_sessions_user ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_expires ON user_sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_user_sessions_ip ON user_sessions(ip_address);
CREATE INDEX IF NOT EXISTS idx_user_sessions_active ON user_sessions(is_active, expires_at);

-- Revoked tokens table for token blacklisting
CREATE TABLE IF NOT EXISTS revoked_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    token_id TEXT NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    revoked_at TIMESTAMPTZ DEFAULT NOW(),
    reason TEXT,
    expires_at TIMESTAMPTZ, -- When the token would have naturally expired
    
    -- Unique constraint to prevent duplicate revocations
    UNIQUE(token_id)
);

-- Revoked tokens indexes
CREATE INDEX IF NOT EXISTS idx_revoked_tokens_token ON revoked_tokens(token_id);
CREATE INDEX IF NOT EXISTS idx_revoked_tokens_user ON revoked_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_revoked_tokens_revoked_at ON revoked_tokens(revoked_at);

-- Failed login attempts table (enhanced brute force protection)
CREATE TABLE IF NOT EXISTS failed_login_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ip_address INET NOT NULL,
    email TEXT,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    attempt_time TIMESTAMPTZ DEFAULT NOW(),
    user_agent TEXT,
    cultural_context TEXT,
    blocked_until TIMESTAMPTZ,
    attempt_count INTEGER DEFAULT 1,
    
    -- Index for efficient lookups
    INDEX (ip_address, attempt_time DESC),
    INDEX (email, attempt_time DESC) WHERE email IS NOT NULL
);

-- Failed attempts indexes
CREATE INDEX IF NOT EXISTS idx_failed_attempts_ip_time ON failed_login_attempts(ip_address, attempt_time DESC);
CREATE INDEX IF NOT EXISTS idx_failed_attempts_email ON failed_login_attempts(email) WHERE email IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_failed_attempts_blocked ON failed_login_attempts(blocked_until) WHERE blocked_until IS NOT NULL;

-- Portuguese business submissions security tracking
CREATE TABLE IF NOT EXISTS business_submission_audit (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    submission_id UUID,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    ip_address INET NOT NULL,
    original_data JSONB NOT NULL,
    sanitized_data JSONB NOT NULL,
    validation_results JSONB,
    security_flags TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Track suspicious business submissions
    requires_manual_review BOOLEAN DEFAULT FALSE
);

-- Business submission audit indexes
CREATE INDEX IF NOT EXISTS idx_business_audit_user ON business_submission_audit(user_id);
CREATE INDEX IF NOT EXISTS idx_business_audit_ip ON business_submission_audit(ip_address);
CREATE INDEX IF NOT EXISTS idx_business_audit_review ON business_submission_audit(requires_manual_review) WHERE requires_manual_review = TRUE;
CREATE INDEX IF NOT EXISTS idx_business_audit_created ON business_submission_audit(created_at DESC);

-- File upload security tracking
CREATE TABLE IF NOT EXISTS file_upload_audit (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    ip_address INET NOT NULL,
    original_filename TEXT NOT NULL,
    sanitized_filename TEXT NOT NULL,
    file_size BIGINT NOT NULL,
    file_type TEXT NOT NULL,
    upload_path TEXT,
    validation_results JSONB,
    security_scan_results JSONB,
    blocked BOOLEAN DEFAULT FALSE,
    block_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- File upload audit indexes
CREATE INDEX IF NOT EXISTS idx_file_upload_user ON file_upload_audit(user_id);
CREATE INDEX IF NOT EXISTS idx_file_upload_blocked ON file_upload_audit(blocked) WHERE blocked = TRUE;
CREATE INDEX IF NOT EXISTS idx_file_upload_created ON file_upload_audit(created_at DESC);

-- Security settings for Portuguese community members
CREATE TABLE IF NOT EXISTS user_security_settings (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    login_notifications BOOLEAN DEFAULT TRUE,
    suspicious_activity_alerts BOOLEAN DEFAULT TRUE,
    session_timeout_preference INTEGER DEFAULT 7200, -- 2 hours in seconds
    allowed_ips INET[], -- Optional IP whitelist
    security_questions JSONB, -- Encrypted security questions
    last_password_change TIMESTAMPTZ DEFAULT NOW(),
    last_security_review TIMESTAMPTZ DEFAULT NOW(),
    cultural_heritage_verified BOOLEAN DEFAULT FALSE,
    verification_level TEXT DEFAULT 'basic' CHECK (verification_level IN ('basic', 'standard', 'enhanced')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Security settings indexes
CREATE INDEX IF NOT EXISTS idx_security_settings_2fa ON user_security_settings(two_factor_enabled);
CREATE INDEX IF NOT EXISTS idx_security_settings_heritage ON user_security_settings(cultural_heritage_verified);

-- Row Level Security (RLS) Policies

-- Security audit log RLS - Admin access only
ALTER TABLE security_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin access to security audit log" ON security_audit_log
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM auth.users 
            WHERE id = auth.uid() 
            AND raw_user_meta_data->>'role' = 'admin'
        )
    );

-- User sessions RLS - Users can see their own sessions
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own sessions" ON user_sessions
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own sessions" ON user_sessions
    FOR DELETE USING (user_id = auth.uid());

-- Security settings RLS - Users can manage their own settings
ALTER TABLE user_security_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own security settings" ON user_security_settings
    FOR ALL USING (user_id = auth.uid());

-- Functions for security monitoring

-- Function to detect suspicious patterns in Portuguese community
CREATE OR REPLACE FUNCTION detect_suspicious_activity(
    user_id_param UUID DEFAULT NULL,
    ip_address_param INET DEFAULT NULL,
    time_window_hours INTEGER DEFAULT 24
) RETURNS TABLE (
    risk_score INTEGER,
    risk_factors TEXT[],
    recommended_actions TEXT[]
) LANGUAGE plpgsql AS $$
DECLARE
    risk_score_val INTEGER := 0;
    risk_factors_val TEXT[] := ARRAY[]::TEXT[];
    recommended_actions_val TEXT[] := ARRAY[]::TEXT[];
    failed_attempts_count INTEGER;
    session_count INTEGER;
    different_ips_count INTEGER;
BEGIN
    -- Check failed login attempts
    SELECT COUNT(*) INTO failed_attempts_count
    FROM failed_login_attempts 
    WHERE (user_id_param IS NULL OR user_id = user_id_param)
    AND (ip_address_param IS NULL OR ip_address = ip_address_param)
    AND attempt_time > NOW() - INTERVAL '%s hours' % time_window_hours;
    
    IF failed_attempts_count > 10 THEN
        risk_score_val := risk_score_val + 40;
        risk_factors_val := array_append(risk_factors_val, 'Excessive failed login attempts');
        recommended_actions_val := array_append(recommended_actions_val, 'Block IP address');
    ELSIF failed_attempts_count > 5 THEN
        risk_score_val := risk_score_val + 20;
        risk_factors_val := array_append(risk_factors_val, 'Multiple failed login attempts');
        recommended_actions_val := array_append(recommended_actions_val, 'Enable enhanced monitoring');
    END IF;
    
    -- Check multiple sessions from different IPs (if user specified)
    IF user_id_param IS NOT NULL THEN
        SELECT COUNT(DISTINCT ip_address) INTO different_ips_count
        FROM user_sessions
        WHERE user_id = user_id_param
        AND created_at > NOW() - INTERVAL '%s hours' % time_window_hours
        AND is_active = TRUE;
        
        IF different_ips_count > 5 THEN
            risk_score_val := risk_score_val + 30;
            risk_factors_val := array_append(risk_factors_val, 'Multiple concurrent sessions from different locations');
            recommended_actions_val := array_append(recommended_actions_val, 'Require re-authentication');
        END IF;
    END IF;
    
    -- Check security events
    SELECT COUNT(*) INTO session_count
    FROM security_audit_log
    WHERE severity IN ('HIGH', 'CRITICAL')
    AND (user_id_param IS NULL OR user_id = user_id_param)
    AND (ip_address_param IS NULL OR ip_address = ip_address_param)
    AND created_at > NOW() - INTERVAL '%s hours' % time_window_hours;
    
    IF session_count > 3 THEN
        risk_score_val := risk_score_val + 50;
        risk_factors_val := array_append(risk_factors_val, 'Multiple high-severity security events');
        recommended_actions_val := array_append(recommended_actions_val, 'Immediate security review required');
    END IF;
    
    RETURN QUERY SELECT risk_score_val, risk_factors_val, recommended_actions_val;
END;
$$;

-- Function to clean up expired security data
CREATE OR REPLACE FUNCTION cleanup_expired_security_data() RETURNS INTEGER LANGUAGE plpgsql AS $$
DECLARE
    cleaned_count INTEGER := 0;
BEGIN
    -- Clean up expired sessions
    DELETE FROM user_sessions 
    WHERE expires_at < NOW() OR (last_activity < NOW() - INTERVAL '30 days');
    
    GET DIAGNOSTICS cleaned_count = ROW_COUNT;
    
    -- Clean up old failed attempts (keep for 30 days)
    DELETE FROM failed_login_attempts 
    WHERE attempt_time < NOW() - INTERVAL '30 days';
    
    -- Clean up old security audit logs (keep for 90 days, except CRITICAL)
    DELETE FROM security_audit_log 
    WHERE created_at < NOW() - INTERVAL '90 days' 
    AND severity != 'CRITICAL';
    
    -- Clean up old file upload audits (keep for 60 days)
    DELETE FROM file_upload_audit 
    WHERE created_at < NOW() - INTERVAL '60 days'
    AND blocked = FALSE;
    
    RETURN cleaned_count;
END;
$$;

-- Trigger to automatically update last_activity in sessions
CREATE OR REPLACE FUNCTION update_session_activity() RETURNS TRIGGER AS $$
BEGIN
    NEW.last_activity = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for session activity updates
DROP TRIGGER IF EXISTS trigger_update_session_activity ON user_sessions;
CREATE TRIGGER trigger_update_session_activity
    BEFORE UPDATE ON user_sessions
    FOR EACH ROW EXECUTE FUNCTION update_session_activity();

-- Grant appropriate permissions
GRANT SELECT ON security_audit_log TO authenticated;
GRANT INSERT ON security_audit_log TO authenticated;
GRANT ALL ON user_sessions TO authenticated;
GRANT ALL ON user_security_settings TO authenticated;
GRANT ALL ON failed_login_attempts TO authenticated;
GRANT SELECT, INSERT ON business_submission_audit TO authenticated;
GRANT SELECT, INSERT ON file_upload_audit TO authenticated;
GRANT SELECT, INSERT ON revoked_tokens TO authenticated;

-- Create indexes for Portuguese-specific security patterns
CREATE INDEX IF NOT EXISTS idx_security_portuguese_context 
ON security_audit_log(cultural_context, created_at DESC) 
WHERE cultural_context = 'portuguese-uk';

CREATE INDEX IF NOT EXISTS idx_sessions_portuguese_context 
ON user_sessions(cultural_context, expires_at) 
WHERE cultural_context = 'portuguese-uk';

-- Comments for documentation
COMMENT ON TABLE security_audit_log IS 'Comprehensive security event logging for Portuguese community platform';
COMMENT ON TABLE user_sessions IS 'Secure session management with Portuguese cultural context support';
COMMENT ON TABLE user_security_settings IS 'User-specific security preferences and verification status';
COMMENT ON TABLE failed_login_attempts IS 'Brute force protection tracking for Portuguese community members';
COMMENT ON FUNCTION detect_suspicious_activity IS 'Analyzes user behavior patterns to detect potential security threats';
COMMENT ON FUNCTION cleanup_expired_security_data IS 'Maintains security data hygiene by removing expired records';