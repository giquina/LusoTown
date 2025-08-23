#!/usr/bin/env node

/**
 * LusoTown Complete Streaming Platform Migration Script
 * Applies all streaming-related database schemas to Supabase
 * 
 * Usage: node scripts/apply-complete-streaming-migration.js
 */

const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

// Import Supabase client
const { createClient } = require('@supabase/supabase-js');

// Migration configurations
const MIGRATIONS = [
  {
    file: '../../supabase/migrations/20250818_001_streaming_platform_schema.sql',
    name: 'streaming_platform_schema',
    description: 'Core streaming infrastructure with Portuguese cultural context'
  },
  {
    file: '../../supabase/migrations/20250818_004_youtube_integration_system.sql',
    name: 'youtube_integration_system',
    description: 'YouTube integration and creator monetization system'
  }
];

async function applyCompleteStreamingMigration() {
  console.log('🎬 LusoTown Complete Streaming Platform Migration');
  console.log('==================================================');
  console.log('🇵🇹 Applying Portuguese-speaking community Streaming Database Schema');
  console.log('');
  
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
    // Test connection
    console.log('🔍 Testing database connection...');
    const { data: testQuery, error: testError } = await supabase
      .rpc('version');
      
    if (testError) {
      console.warn('⚠️  Database connection test failed:', testError.message);
      console.log('Proceeding with migration attempt...');
    } else {
      console.log('✅ Database connection successful');
    }
    
    // Process each migration
    for (const migration of MIGRATIONS) {
      console.log('');
      console.log(`📋 Processing: ${migration.description}`);
      console.log(`🔧 Migration: ${migration.name}`);
      
      // Read migration file
      const migrationPath = path.resolve(__dirname, migration.file);
      
      if (!fs.existsSync(migrationPath)) {
        console.error(`❌ Migration file not found: ${migrationPath}`);
        continue;
      }
      
      const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
      console.log(`📊 Size: ${(migrationSQL.length / 1024).toFixed(2)} KB`);
      
      // Apply migration using raw SQL
      try {
        console.log('⚡ Executing migration...');
        
        // Execute the migration SQL
        const { error: migrationError } = await supabase.rpc('exec_sql', {
          sql: migrationSQL
        });
        
        if (migrationError) {
          console.error(`❌ Migration failed: ${migrationError.message}`);
          console.error('This might be expected if tables already exist.');
          console.log('Continuing with next migration...');
          continue;
        }
        
        console.log('✅ Migration applied successfully');
        
      } catch (execError) {
        console.error(`❌ Migration execution error: ${execError.message}`);
        console.log('This might be expected if migration was already applied.');
      }
    }
    
    // Verify streaming tables
    console.log('');
    console.log('🔍 Verifying streaming platform tables...');
    
    const tablesToVerify = [
      'stream_categories',
      'streams', 
      'viewer_sessions',
      'stream_auth_tokens',
      'stream_reports',
      'user_streaming_settings',
      'portuguese_emotes',
      'youtube_videos',
      'youtube_playlists',
      'member_spotlights',
      'event_previews',
      'event_highlights',
      'youtube_content_calendar',
      'cultural_content_analytics'
    ];
    
    const verificationResults = {};
    
    for (const table of tablesToVerify) {
      try {
        const { data, error } = await supabase
          .from(table)
          .select('count')
          .limit(1);
        
        verificationResults[table] = !error;
        if (error) {
          console.log(`❌ ${table}: ${error.message}`);
        } else {
          console.log(`✅ ${table}: Table exists and accessible`);
        }
      } catch (err) {
        verificationResults[table] = false;
        console.log(`❌ ${table}: ${err.message}`);
      }
    }
    
    // Summary
    console.log('');
    console.log('📊 MIGRATION SUMMARY');
    console.log('====================');
    
    const successfulTables = Object.values(verificationResults).filter(Boolean).length;
    const totalTables = tablesToVerify.length;
    
    console.log(`✅ Tables verified: ${successfulTables}/${totalTables}`);
    
    if (successfulTables === totalTables) {
      console.log('🎉 ALL STREAMING TABLES SUCCESSFULLY CREATED!');
      console.log('');
      console.log('🇵🇹 Portuguese-speaking community Streaming Platform Features:');
      console.log('   • Stream categories with cultural context');
      console.log('   • Portuguese emotes system (:saudade:, :festa:, :futebol:)');
      console.log('   • Creator monetization (85/15 revenue split)');
      console.log('   • Cultural content analytics');
      console.log('   • YouTube integration for Portuguese content');
      console.log('   • Multi-currency support (BRL, EUR, GBP)');
      console.log('   • Advanced moderation and safety features');
      console.log('');
      console.log('🚀 The streaming platform is ready for Portuguese creators!');
    } else {
      console.log('⚠️  Some tables may not have been created.');
      console.log('This could be due to:');
      console.log('   • Tables already exist from previous migration');
      console.log('   • Database permissions');
      console.log('   • Network connectivity issues');
      console.log('');
      console.log('💡 Check STREAMING_DATABASE_VERIFICATION_REPORT.md for details');
    }
    
    // Check Portuguese emotes
    console.log('');
    console.log('🎭 Checking Portuguese Cultural Emotes...');
    try {
      const { data: emotes, error: emotesError } = await supabase
        .from('portuguese_emotes')
        .select('code, name_pt, cultural_context')
        .limit(5);
      
      if (!emotesError && emotes && emotes.length > 0) {
        console.log('✅ Portuguese emotes loaded:');
        emotes.forEach(emote => {
          console.log(`   ${emote.code} - ${emote.name_pt} (${emote.cultural_context})`);
        });
      } else {
        console.log('ℹ️  Portuguese emotes data not yet populated');
      }
    } catch (err) {
      console.log('ℹ️  Portuguese emotes table not accessible yet');
    }
    
    // Check stream categories
    console.log('');
    console.log('📚 Checking Portuguese Stream Categories...');
    try {
      const { data: categories, error: categoriesError } = await supabase
        .from('stream_categories')
        .select('name_pt, name_en, portuguese_focused')
        .limit(5);
      
      if (!categoriesError && categories && categories.length > 0) {
        console.log('✅ Portuguese stream categories loaded:');
        categories.forEach(cat => {
          const flag = cat.portuguese_focused ? '🇵🇹' : '🌍';
          console.log(`   ${flag} ${cat.name_pt} (${cat.name_en})`);
        });
      } else {
        console.log('ℹ️  Stream categories data not yet populated');
      }
    } catch (err) {
      console.log('ℹ️  Stream categories table not accessible yet');
    }
    
  } catch (error) {
    console.error('');
    console.error('❌ MIGRATION FAILED!');
    console.error('Error:', error.message);
    console.error('');
    console.error('🔧 Troubleshooting:');
    console.error('   1. Check your Supabase connection settings');
    console.error('   2. Ensure you have SUPABASE_SERVICE_ROLE_KEY in .env.local');
    console.error('   3. Verify database permissions');
    console.error('   4. Try applying migrations manually via Supabase SQL Editor');
    console.error('   5. Check STREAMING_DATABASE_VERIFICATION_REPORT.md for guidance');
    console.error('');
    process.exit(1);
  }
}

// Manual migration application function (for when automated approach fails)
function printManualMigrationInstructions() {
  console.log('');
  console.log('📋 MANUAL MIGRATION INSTRUCTIONS');
  console.log('=================================');
  console.log('');
  console.log('If automated migration fails, apply these manually via Supabase SQL Editor:');
  console.log('');
  console.log('1. Open Supabase Dashboard → SQL Editor');
  console.log('2. Copy and execute the following migration files:');
  console.log('');
  
  MIGRATIONS.forEach((migration, index) => {
    console.log(`${index + 1}. ${migration.file}`);
    console.log(`   Description: ${migration.description}`);
  });
  
  console.log('');
  console.log('3. Verify tables are created by running:');
  console.log("   SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name LIKE '%stream%';");
  console.log('');
  console.log('4. Check migration results with:');
  console.log('   SELECT COUNT(*) FROM portuguese_emotes;');
  console.log('   SELECT COUNT(*) FROM stream_categories;');
  console.log('');
}

// Handle script execution
if (require.main === module) {
  applyCompleteStreamingMigration()
    .then(() => {
      console.log('');
      console.log('✨ Migration process completed!');
      printManualMigrationInstructions();
    })
    .catch((error) => {
      console.error('Fatal error:', error);
      printManualMigrationInstructions();
      process.exit(1);
    });
}

module.exports = { applyCompleteStreamingMigration };