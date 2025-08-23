# LusoTown Streaming Platform Migration Deployment Guide

## Overview

This guide provides instructions for applying the streaming platform database migration (`20250818_001_streaming_platform_schema.sql`) to your Supabase database. This migration creates the complete streaming infrastructure for the Portuguese-speaking community platform.

## What the Migration Includes

### Core Infrastructure
- **Stream Categories**: Portuguese-focused content categories with bilingual support
- **Streams Table**: Complete streaming infrastructure with cultural context
- **Viewer Sessions**: Advanced analytics and engagement tracking
- **Stream Auth Tokens**: JWT-based authentication for streaming endpoints

### Portuguese Cultural Features
- **Portuguese Emotes System**: Cultural emotes (`:saudade:`, `:festa:`, `:futebol:`)
- **Cultural Regions**: Support for Brazil, Portugal, Africa, Diaspora contexts
- **Language Support**: Portuguese/English bilingual streaming categories

### User Management
- **User Streaming Settings**: Permissions, rate limiting, quality settings
- **Stream Reports**: Content moderation and community safety
- **Monetization Settings**: Creator economy and revenue sharing

### Storage and Security
- **Storage Buckets**: `stream-thumbnails`, `stream-recordings`, `portuguese-emotes`
- **Row Level Security**: Comprehensive RLS policies for all tables
- **Functions and Triggers**: Automated stream key generation, metrics tracking

## Prerequisites

1. **Supabase Project**: Active Supabase project with database access
2. **Environment Variables**: Properly configured Supabase credentials
3. **Permissions**: Database admin or service role permissions
4. **Node.js**: Version 16 or higher for running the migration script

## Environment Configuration

### Required Environment Variables

Add these to your `.env.local` file:

```env
# Required for migration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Alternative: Use anon key (less secure)
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### Getting Your Supabase Credentials

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your LusoTown project
3. Navigate to **Settings** > **API**
4. Copy the **Project URL** and **Service Role Key**

## Migration Methods

### Method 1: Automated Script (Recommended)

The safest and most reliable method using our custom migration script:

```bash
# Navigate to web-app directory
cd web-app

# Install dependencies (if not already done)
npm install

# Run the streaming platform migration
npm run db:migrate:streaming
```

#### Expected Output

```
<� LusoTown Streaming Platform Migration Script
================================================
= Connecting to Supabase...
=� Reading migration file: .../20250818_001_streaming_platform_schema.sql
 Migration file loaded successfully
=� Migration size: 23.11 KB
= Checking migration status...
=� Migration contains XX SQL statements
� Applying chunk 1/X...
 Chunk applied successfully
...
<� SUCCESS! Streaming platform migration applied successfully!
```

### Method 2: Manual SQL Application

If you prefer to apply the migration manually:

1. **Open Supabase SQL Editor**:
   - Go to your Supabase Dashboard
   - Navigate to **SQL Editor**

2. **Copy Migration Content**:
   - Open `/supabase/migrations/20250818_001_streaming_platform_schema.sql`
   - Copy the entire file content

3. **Execute in Chunks**:
   - Paste and run the migration in smaller chunks to avoid timeouts
   - Start with table creation statements
   - Then apply indexes and policies
   - Finally, insert seed data

## Post-Migration Verification

### 1. Check Table Creation

Run these queries in the Supabase SQL Editor:

```sql
-- Verify core tables exist
SELECT tablename FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('streams', 'stream_categories', 'viewer_sessions', 'portuguese_emotes', 'user_streaming_settings');

-- Check row counts for seed data
SELECT 'stream_categories' as table_name, count(*) as rows FROM stream_categories
UNION ALL
SELECT 'portuguese_emotes' as table_name, count(*) as rows FROM portuguese_emotes;
```

Expected results:
- 5 core streaming tables created
- 10 stream categories with Portuguese cultural context
- 10 Portuguese emotes with regional support

### 2. Verify Storage Buckets

Go to **Storage** in your Supabase dashboard and confirm these buckets exist:
- `stream-thumbnails` (public)
- `stream-recordings` (private)
- `portuguese-emotes` (public)

### 3. Test RLS Policies

```sql
-- Test that policies are working
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename LIKE '%stream%';
```

Should return multiple RLS policies for streaming tables.

## Troubleshooting

### Common Issues

#### 1. Authentication Errors
```
Error: Missing Supabase configuration
```
**Solution**: Verify your `.env.local` file has correct Supabase credentials.

#### 2. Permission Denied
```
Error: insufficient privileges
```
**Solution**: Ensure you're using the service role key, not the anon key.

#### 3. Migration Already Applied
```
� Migration already applied. Skipping...
```
**Result**: This is normal if the migration was already run successfully.

#### 4. Timeout Errors
```
Error: Request timeout
```
**Solution**: The script automatically chunks large migrations. If still failing, try applying the migration manually in smaller pieces.

### Manual Rollback (if needed)

If you need to rollback the migration:

```sql
-- WARNING: This will delete all streaming data
DROP TABLE IF EXISTS viewer_sessions CASCADE;
DROP TABLE IF EXISTS stream_auth_tokens CASCADE;
DROP TABLE IF EXISTS stream_reports CASCADE;
DROP TABLE IF EXISTS user_streaming_settings CASCADE;
DROP TABLE IF EXISTS streams CASCADE;
DROP TABLE IF EXISTS stream_categories CASCADE;
DROP TABLE IF EXISTS portuguese_emotes CASCADE;

-- Remove storage buckets (do this manually in Supabase dashboard)
-- Delete: stream-thumbnails, stream-recordings, portuguese-emotes
```

## Next Steps After Migration

### 1. Configure Streaming Infrastructure
- Set up SRS (Simple Relay Server) for RTMP streaming
- Configure CDN endpoints for Portuguese-speaking community content
- Set up SSL certificates for streaming domains

### 2. Test Portuguese Features
- Verify Portuguese emotes display correctly
- Test stream categories filtering by cultural context
- Confirm bilingual content displays properly

### 3. Set Up Creator Monetization
- Configure payment processing for creator revenue
- Set up subscription tiers for premium streaming
- Test revenue sharing calculations (70/30 � 85/15 for Portuguese creators)

### 4. Enable Content Moderation
- Configure Portuguese language toxicity detection
- Set up moderation workflows for cultural sensitivity
- Test reporting system for inappropriate content

### 5. Deploy Frontend Components
- Update streaming components to use new database schema
- Test real-time chat with Portuguese emotes
- Verify creator dashboard functionality

## Production Deployment Checklist

- [ ] Migration applied successfully to staging environment
- [ ] All verification tests passed
- [ ] Storage buckets configured with proper permissions
- [ ] RLS policies tested with different user roles
- [ ] Portuguese cultural features working correctly
- [ ] Streaming infrastructure endpoints configured
- [ ] Frontend components updated and tested
- [ ] Content moderation system active
- [ ] Creator monetization features enabled
- [ ] Analytics and tracking functional

## Support

If you encounter issues during migration:

1. Check the migration script logs for specific error messages
2. Verify your Supabase project has sufficient database resources
3. Ensure all required environment variables are properly set
4. Review the Supabase dashboard for any constraint violations
5. Test with a smaller subset of the migration if timeouts occur

For additional support, refer to:
- [Supabase Documentation](https://supabase.com/docs)
- [LusoTown Development Documentation](../README.md)
- [Portuguese-speaking community Platform Architecture](../../STREAMING_INTEGRATION_MASTER_PLAN.md)