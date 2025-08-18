#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('LusoTown Database Migration Script (Direct SQL)');
console.log('==============================================');

const migrationsDir = path.resolve(__dirname, '../../supabase/migrations');
const migrationsToApply = [
  '20250818_004_youtube_integration_system.sql',
  '20250818_005_tiktok_style_messaging_system.sql'
];

console.log('Creating consolidated migration file...');

let consolidatedSQL = `-- LusoTown Database Migrations\n`;
consolidatedSQL += `-- Applied: ${new Date().toISOString()}\n`;
consolidatedSQL += `-- Migrations: ${migrationsToApply.join(', ')}\n\n`;

for (const migration of migrationsToApply) {
  const migrationPath = path.resolve(migrationsDir, migration);
  if (fs.existsSync(migrationPath)) {
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
    consolidatedSQL += `-- ============================================================\n`;
    consolidatedSQL += `-- MIGRATION: ${migration}\n`;
    consolidatedSQL += `-- ============================================================\n\n`;
    consolidatedSQL += migrationSQL;
    consolidatedSQL += `\n\n`;
    console.log(`Added migration: ${migration}`);
  } else {
    console.log(`Warning: Migration file not found: ${migration}`);
  }
}

const outputPath = path.resolve(__dirname, '../consolidated-migrations.sql');
fs.writeFileSync(outputPath, consolidatedSQL);

console.log(`Consolidated migration file created: ${outputPath}`);
console.log('');
console.log('To apply these migrations:');
console.log('1. Copy the contents of consolidated-migrations.sql');
console.log('2. Go to your Supabase Dashboard > SQL Editor');
console.log('3. Paste and execute the SQL');
console.log('4. Apply in smaller chunks if you encounter timeouts');
