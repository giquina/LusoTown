
-- Database monitoring configuration for LusoTown Portuguese-speaking Community
-- This configuration enables performance monitoring and optimization

-- Enable pg_stat_statements for query performance tracking
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

-- Configure connection pooling settings
ALTER SYSTEM SET max_connections = '25';
ALTER SYSTEM SET shared_preload_libraries = 'pg_stat_statements';
ALTER SYSTEM SET pg_stat_statements.track = 'all';
ALTER SYSTEM SET pg_stat_statements.max = 10000;
ALTER SYSTEM SET pg_stat_statements.track_utility = on;

-- Configure query optimization settings
ALTER SYSTEM SET effective_cache_size = '1GB';
ALTER SYSTEM SET shared_buffers = '256MB';
ALTER SYSTEM SET work_mem = '16MB';
ALTER SYSTEM SET maintenance_work_mem = '128MB';

-- Configure logging for slow queries
ALTER SYSTEM SET log_min_duration_statement = '200';
ALTER SYSTEM SET log_statement = 'mod';
ALTER SYSTEM SET log_duration = on;
ALTER SYSTEM SET log_line_prefix = '%t [%p]: [%l-1] user=%u,db=%d,app=%a,client=%h ';

-- Portuguese community specific settings
ALTER SYSTEM SET default_text_search_config = 'portuguese';
ALTER SYSTEM SET timezone = 'Europe/Lisbon';

SELECT pg_reload_conf();
