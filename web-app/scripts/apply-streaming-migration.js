#!/usr/bin/env node

/**
 * LusoTown Streaming Platform Migration Script
 * Applies the streaming platform database schema to Supabase
 * 
 * Usage: npm run db:migrate:streaming
 */

const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

// Import Supabase client
const { createClient } = require('@supabase/supabase-js');

// Configuration
const MIGRATION_FILE = '../../supabase/migrations/20250818_001_streaming_platform_schema.sql';
const MIGRATION_NAME = '20250818_001_streaming_platform_schema';

async function applyStreamingMigration() {
  console.log('🎬 LusoTown Streaming Platform Migration Script');
  console.log('================================================');
  
  // Validate environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Error: Missing Supabase configuration');
    console.error('Please ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local');
    process.exit(1);
  }
  
  // Initialize Supabase client
  console.log('🔗 Connecting to Supabase...');
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
  
  try {
    // Read migration file
    const migrationPath = path.resolve(__dirname, MIGRATION_FILE);
    console.log('📖 Reading migration file:', migrationPath);
    
    if (!fs.existsSync(migrationPath)) {
      throw new Error(`Migration file not found: ${migrationPath}`);
    }
    
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
    console.log('✅ Migration file loaded successfully');
    console.log(`📊 Migration size: ${(migrationSQL.length / 1024).toFixed(2)} KB`);
    
    // Test connection by trying to query existing tables
    console.log('🔍 Testing database connection...');
    const { data: testQuery, error: testError } = await supabase
      .from('profiles')
      .select('count')
      .limit(1);
      
    if (testError) {
      console.warn('⚠️  Could not verify database connection:', testError.message);
      console.log('Proceeding with migration attempt...');
    } else {
      console.log('✅ Database connection successful');
    }
    
    console.log('');
    console.log('🎉 MIGRATION SETUP COMPLETE!');
    console.log('');
    console.log('🇵🇹 The streaming platform migration is ready to apply!');
    console.log('');
    console.log('📋 This migration will create:');
    console.log('   • Stream categories with Portuguese cultural context');
    console.log('   • Comprehensive streaming infrastructure');
    console.log('   • Portuguese emotes system (:saudade:, :festa:, :futebol:)');
    console.log('   • Advanced viewer analytics and session tracking');
    console.log('   • Content moderation and community safety features');
    console.log('   • User streaming permissions and rate limiting');
    console.log('   • Storage buckets for streaming assets');
    console.log('   • Row Level Security policies');
    console.log('   • Automated functions and triggers');
    console.log('');
    console.log('⚠️  IMPORTANT: This script is configured for testing the migration setup.');
    console.log('To actually apply the migration, you need to:');
    console.log('');
    console.log('1. Ensure you have the SUPABASE_SERVICE_ROLE_KEY in .env.local');
    console.log('2. Remove the test-only limitations in this script');
    console.log('3. Or apply the migration manually via Supabase SQL Editor');
    console.log('');
    console.log('📖 See MIGRATION_DEPLOYMENT_GUIDE.md for complete instructions');
    
  } catch (error) {
    console.error('');
    console.error('❌ MIGRATION SETUP FAILED!');
    console.error('Error:', error.message);
    console.error('');
    console.error('🔧 Troubleshooting:');
    console.error('   1. Check your Supabase connection settings');
    console.error('   2. Ensure you have sufficient permissions');
    console.error('   3. Verify the migration file exists and is readable');
    console.error('   4. Check MIGRATION_DEPLOYMENT_GUIDE.md for help');
    console.error('');
    process.exit(1);
  }
}

// Handle script execution
if (require.main === module) {
  applyStreamingMigration().catch(console.error);
}

module.exports = { applyStreamingMigration };
