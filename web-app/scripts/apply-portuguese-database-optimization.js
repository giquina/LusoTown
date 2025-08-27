#!/usr/bin/env node

/**
 * Apply Portuguese Community Database Optimization Migration
 * 
 * Applies comprehensive database optimizations for the Portuguese-speaking community platform
 * Includes performance indexes, optimized functions, and caching strategies
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Configuration
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing Supabase configuration. Please set SUPABASE_URL and SUPABASE_SERVICE_KEY environment variables.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

/**
 * Portuguese Database Optimization Migration Runner
 */
class PortugueseDatabaseOptimizer {
  constructor() {
    this.migrationPath = path.join(__dirname, '..', 'supabase', 'migrations', '20250823_002_portuguese_community_database_optimization.sql');
    this.results = {
      timestamp: new Date().toISOString(),
      success: false,
      optimizations: [],
      errors: [],
      performance: {}
    };
  }

  /**
   * Verify prerequisites before optimization
   */
  async verifyPrerequisites() {
    console.log('🔍 Verifying database prerequisites...');
    
    const prerequisites = [
      {
        name: 'PostgreSQL Extensions',
        check: async () => {
          const extensions = ['pg_trgm', 'btree_gin', 'btree_gist', 'postgis'];
          const results = [];
          
          for (const ext of extensions) {
            try {
              const { data, error } = await supabase.rpc('query', {
                query: `SELECT EXISTS(SELECT 1 FROM pg_extension WHERE extname = '${ext}') as installed`
              });
              
              if (error) throw error;
              results.push({ extension: ext, installed: data?.[0]?.installed || false });
            } catch (err) {
              results.push({ extension: ext, installed: false, error: err.message });
            }
          }
          
          return results;
        }
      },
      {
        name: 'Required Tables',
        check: async () => {
          const tables = ['events', 'profiles', 'portuguese_businesses', 'user_matches', 'event_reservations'];
          const results = [];
          
          for (const table of tables) {
            try {
              const { data, error } = await supabase
                .from(table)
                .select('*')
                .limit(1);
              
              results.push({ table, exists: !error });
            } catch (err) {
              results.push({ table, exists: false, error: err.message });
            }
          }
          
          return results;
        }
      }
    ];

    for (const prerequisite of prerequisites) {
      try {
        const result = await prerequisite.check();
        console.log(`  ✅ ${prerequisite.name}:`);
        
        if (Array.isArray(result)) {
          result.forEach(item => {
            const status = item.installed || item.exists ? '✅' : '❌';
            const name = item.extension || item.table;
            console.log(`    ${status} ${name}`);
          });
        }
      } catch (error) {
        console.log(`  ❌ ${prerequisite.name}: ${error.message}`);
        this.results.errors.push(`Prerequisite check failed: ${prerequisite.name} - ${error.message}`);
      }
    }
  }

  /**
   * Execute database optimization migration
   */
  async executeOptimizationMigration() {
    console.log('🚀 Executing Portuguese community database optimization...');
    
    try {
      // Read migration file
      if (!fs.existsSync(this.migrationPath)) {
        throw new Error(`Migration file not found: ${this.migrationPath}`);
      }
      
      const migrationSQL = fs.readFileSync(this.migrationPath, 'utf8');
      
      // Split into individual statements (basic approach)
      const statements = migrationSQL
        .split(/;\s*\n/)
        .filter(stmt => stmt.trim().length > 0)
        .filter(stmt => !stmt.trim().startsWith('--'))
        .filter(stmt => !stmt.trim().startsWith('/*'));
      
      console.log(`  📝 Found ${statements.length} SQL statements to execute`);
      
      let successCount = 0;
      let errorCount = 0;
      
      for (let i = 0; i < statements.length; i++) {
        const statement = statements[i].trim();
        if (!statement) continue;
        
        try {
          const startTime = performance.now();
          
          // Execute statement
          const { data, error } = await supabase.rpc('query', {
            query: statement
          });
          
          const executionTime = performance.now() - startTime;
          
          if (error) {
            console.log(`  ❌ Statement ${i + 1} failed: ${error.message}`);
            this.results.errors.push(`Statement ${i + 1}: ${error.message}`);
            errorCount++;
          } else {
            console.log(`  ✅ Statement ${i + 1} executed (${executionTime.toFixed(2)}ms)`);
            successCount++;
            
            // Track optimization types
            if (statement.toUpperCase().includes('CREATE INDEX')) {
              this.results.optimizations.push({
                type: 'index_creation',
                statement: statement.substring(0, 100) + '...',
                executionTime
              });
            } else if (statement.toUpperCase().includes('CREATE OR REPLACE FUNCTION')) {
              this.results.optimizations.push({
                type: 'function_optimization',
                statement: statement.substring(0, 100) + '...',
                executionTime
              });
            } else if (statement.toUpperCase().includes('CREATE MATERIALIZED VIEW')) {
              this.results.optimizations.push({
                type: 'materialized_view',
                statement: statement.substring(0, 100) + '...',
                executionTime
              });
            }
          }
        } catch (err) {
          console.log(`  ❌ Statement ${i + 1} error: ${err.message}`);
          this.results.errors.push(`Statement ${i + 1}: ${err.message}`);
          errorCount++;
        }
      }
      
      console.log(`  📊 Migration complete: ${successCount} success, ${errorCount} errors`);
      this.results.performance = { successCount, errorCount, totalStatements: statements.length };
      
      if (errorCount === 0) {
        this.results.success = true;
      }
      
    } catch (error) {
      console.error('❌ Migration execution failed:', error);
      this.results.errors.push(`Migration execution error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Test optimized query performance
   */
  async testOptimizedQueries() {
    console.log('⚡ Testing optimized query performance...');
    
    const testQueries = [
      {
        name: 'Portuguese Events Discovery',
        query: `
          SELECT * FROM find_portuguese_events_optimized(
            51.5074, -0.1278, 25.0, 
            ARRAY['Music & Entertainment', 'Cultural Events'], 
            'pt', 10
          )
        `
      },
      {
        name: 'Portuguese Business Search',
        query: `
          SELECT * FROM find_portuguese_businesses_optimized(
            51.5074, -0.1278, 
            ARRAY['Restaurant', 'Cultural Center'], 
            10.0, 10
          )
        `
      },
      {
        name: 'Materialized View Query',
        query: 'SELECT * FROM mv_popular_portuguese_events LIMIT 5'
      }
    ];

    for (const testQuery of testQueries) {
      try {
        const startTime = performance.now();
        
        const { data, error } = await supabase.rpc('query', {
          query: testQuery.query
        });
        
        const executionTime = performance.now() - startTime;
        
        if (error) {
          console.log(`  ❌ ${testQuery.name}: ${error.message}`);
          this.results.errors.push(`Query test failed: ${testQuery.name} - ${error.message}`);
        } else {
          console.log(`  ✅ ${testQuery.name}: ${executionTime.toFixed(2)}ms (${data?.length || 0} records)`);
          this.results.optimizations.push({
            type: 'query_test',
            name: testQuery.name,
            executionTime,
            recordCount: data?.length || 0
          });
        }
      } catch (err) {
        console.log(`  ❌ ${testQuery.name}: ${err.message}`);
        this.results.errors.push(`Query test error: ${testQuery.name} - ${err.message}`);
      }
    }
  }

  /**
   * Refresh materialized views
   */
  async refreshMaterializedViews() {
    console.log('🔄 Refreshing materialized views...');
    
    try {
      const { data, error } = await supabase.rpc('refresh_portuguese_community_views');
      
      if (error) {
        console.log(`  ❌ Failed to refresh materialized views: ${error.message}`);
        this.results.errors.push(`Materialized view refresh failed: ${error.message}`);
      } else {
        console.log('  ✅ Materialized views refreshed successfully');
        this.results.optimizations.push({
          type: 'materialized_view_refresh',
          timestamp: new Date().toISOString()
        });
      }
    } catch (err) {
      console.log(`  ❌ Materialized view refresh error: ${err.message}`);
      this.results.errors.push(`Materialized view refresh error: ${err.message}`);
    }
  }

  /**
   * Verify optimization results
   */
  async verifyOptimizations() {
    console.log('✅ Verifying optimization results...');
    
    const verifications = [
      {
        name: 'Check Indexes Created',
        query: `
          SELECT indexname, tablename 
          FROM pg_indexes 
          WHERE indexname LIKE '%portuguese%' 
             OR indexname LIKE '%cultural%'
             OR indexname LIKE '%events_portuguese%'
          ORDER BY tablename, indexname
        `
      },
      {
        name: 'Check Functions Created',
        query: `
          SELECT proname, pronargs
          FROM pg_proc 
          WHERE proname LIKE '%portuguese%'
             OR proname LIKE '%cultural%'
          ORDER BY proname
        `
      },
      {
        name: 'Check Materialized Views',
        query: `
          SELECT matviewname, ispopulated
          FROM pg_matviews
          WHERE matviewname LIKE '%portuguese%'
             OR matviewname LIKE '%mv_popular%'
          ORDER BY matviewname
        `
      }
    ];

    for (const verification of verifications) {
      try {
        const { data, error } = await supabase.rpc('query', {
          query: verification.query
        });
        
        if (error) {
          console.log(`  ❌ ${verification.name}: ${error.message}`);
        } else {
          console.log(`  ✅ ${verification.name}: ${data?.length || 0} items found`);
          data?.forEach(item => {
            console.log(`    - ${Object.values(item).join(' | ')}`);
          });
        }
      } catch (err) {
        console.log(`  ❌ ${verification.name}: ${err.message}`);
      }
    }
  }

  /**
   * Generate optimization report
   */
  generateOptimizationReport() {
    const reportData = {
      ...this.results,
      summary: {
        totalOptimizations: this.results.optimizations.length,
        totalErrors: this.results.errors.length,
        optimizationTypes: this.results.optimizations.reduce((acc, opt) => {
          acc[opt.type] = (acc[opt.type] || 0) + 1;
          return acc;
        }, {}),
        averageExecutionTime: this.calculateAverageExecutionTime(),
        optimizationSuccess: this.results.success && this.results.errors.length === 0
      }
    };

    // Save report to file
    const reportPath = path.join(__dirname, '..', 'performance-reports', `portuguese-db-optimization-${Date.now()}.json`);
    
    // Ensure reports directory exists
    const reportsDir = path.dirname(reportPath);
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }
    
    fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2));
    
    return { reportData, reportPath };
  }

  /**
   * Calculate average execution time for optimizations
   */
  calculateAverageExecutionTime() {
    const timings = this.results.optimizations
      .filter(opt => opt.executionTime)
      .map(opt => opt.executionTime);
    
    if (timings.length === 0) return null;
    
    const average = timings.reduce((sum, time) => sum + time, 0) / timings.length;
    return `${average.toFixed(2)}ms`;
  }

  /**
   * Run complete optimization process
   */
  async runCompleteOptimization() {
    console.log('🚀 Starting Portuguese Community Database Optimization');
    console.log('=' .repeat(80));
    
    try {
      await this.verifyPrerequisites();
      await this.executeOptimizationMigration();
      await this.testOptimizedQueries();
      await this.refreshMaterializedViews();
      await this.verifyOptimizations();
      
      const { reportData, reportPath } = this.generateOptimizationReport();
      
      console.log('=' .repeat(80));
      console.log('📋 OPTIMIZATION SUMMARY');
      console.log('=' .repeat(80));
      console.log(`🎯 Success: ${reportData.summary.optimizationSuccess ? 'YES' : 'NO'}`);
      console.log(`⚡ Optimizations Applied: ${reportData.summary.totalOptimizations}`);
      console.log(`❌ Errors: ${reportData.summary.totalErrors}`);
      console.log(`⏱️  Average Execution Time: ${reportData.summary.averageExecutionTime || 'N/A'}`);
      console.log(`📊 Performance: ${this.results.performance.successCount}/${this.results.performance.totalStatements} statements successful`);
      console.log(`📄 Report saved to: ${reportPath}`);
      
      if (this.results.errors.length > 0) {
        console.log('\n❌ ERRORS:');
        this.results.errors.forEach(error => console.log(`  - ${error}`));
      }
      
      if (reportData.summary.optimizationSuccess) {
        console.log('\n🎉 Database optimization completed successfully!');
        console.log('\nNext steps:');
        console.log('1. Run performance tests: npm run test:performance');
        console.log('2. Monitor query performance with: node scripts/portuguese-database-performance-monitor.js');
        console.log('3. Set up automated maintenance schedules');
      } else {
        console.log('\n⚠️  Optimization completed with some errors. Review the errors above and run again if needed.');
      }
      
      console.log('=' .repeat(80));
      
      return reportData;
      
    } catch (error) {
      console.error('❌ Database optimization failed:', error);
      this.results.errors.push(`Fatal error: ${error.message}`);
      const { reportData, reportPath } = this.generateOptimizationReport();
      console.log(`📄 Error report saved to: ${reportPath}`);
      throw error;
    }
  }
}

// Run the optimization if this script is executed directly
if (require.main === module) {
  const optimizer = new PortugueseDatabaseOptimizer();
  
  optimizer.runCompleteOptimization()
    .then((results) => {
      console.log('✅ Portuguese community database optimization completed');
      process.exit(results.summary.optimizationSuccess ? 0 : 1);
    })
    .catch((error) => {
      console.error('❌ Database optimization failed:', error);
      process.exit(1);
    });
}

module.exports = PortugueseDatabaseOptimizer;