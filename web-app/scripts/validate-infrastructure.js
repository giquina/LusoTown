#!/usr/bin/env node

/**
 * Infrastructure Validation Script for LusoTown Portuguese-speaking Community Platform
 * 
 * This script validates that all performance and scalability optimizations have been
 * properly implemented and are functioning correctly.
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes for console output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m'
};

/**
 * Console logging with colors
 */
const log = {
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`),
  header: (msg) => console.log(`${colors.bold}${colors.cyan}🚀 ${msg}${colors.reset}\n`),
  subheader: (msg) => console.log(`${colors.bold}${colors.magenta}${msg}${colors.reset}`)
};

/**
 * Infrastructure validation results
 */
const validationResults = {
  files: { passed: 0, failed: 0, missing: [] },
  code: { passed: 0, failed: 0, issues: [] },
  config: { passed: 0, failed: 0, issues: [] },
  performance: { passed: 0, failed: 0, issues: [] },
  overall: { status: 'unknown', score: 0 }
};

/**
 * Validate file existence
 */
function validateFile(filePath, description) {
  const fullPath = path.join(__dirname, '..', filePath);
  
  if (fs.existsSync(fullPath)) {
    const stats = fs.statSync(fullPath);
    const sizeKB = Math.round(stats.size / 1024);
    log.success(`${description} exists (${sizeKB}KB)`);
    validationResults.files.passed++;
    return true;
  } else {
    log.error(`${description} missing: ${filePath}`);
    validationResults.files.failed++;
    validationResults.files.missing.push(filePath);
    return false;
  }
}

/**
 * Validate code quality
 */
function validateCodeFile(filePath, requirements) {
  const fullPath = path.join(__dirname, '..', filePath);
  
  if (!fs.existsSync(fullPath)) {
    log.error(`Code file missing: ${filePath}`);
    validationResults.code.failed++;
    return false;
  }

  try {
    const content = fs.readFileSync(fullPath, 'utf8');
    let passed = 0;
    let total = requirements.length;

    for (const req of requirements) {
      if (req.pattern.test(content)) {
        passed++;
      } else {
        validationResults.code.issues.push({
          file: filePath,
          requirement: req.description,
          issue: req.issue
        });
      }
    }

    const score = (passed / total) * 100;
    if (score >= 80) {
      log.success(`${path.basename(filePath)} code quality: ${Math.round(score)}%`);
      validationResults.code.passed++;
    } else {
      log.warning(`${path.basename(filePath)} code quality: ${Math.round(score)}% (needs improvement)`);
      validationResults.code.failed++;
    }

    return score >= 80;
  } catch (error) {
    log.error(`Error validating ${filePath}: ${error.message}`);
    validationResults.code.failed++;
    return false;
  }
}

/**
 * Validate infrastructure files
 */
function validateInfrastructureFiles() {
  log.subheader('Validating Infrastructure Files');

  const infrastructureFiles = [
    {
      path: 'src/lib/database-connection-pool.ts',
      description: 'Database Connection Pool Manager'
    },
    {
      path: 'src/lib/redis-cache-manager.ts',
      description: 'Redis Cache Management System'
    },
    {
      path: 'src/lib/query-optimizer.ts',
      description: 'Database Query Optimization Engine'
    },
    {
      path: 'src/app/api/monitoring/performance/route.ts',
      description: 'Performance Monitoring API'
    },
    {
      path: 'src/app/api/monitoring/dashboard/route.ts',
      description: 'Monitoring Dashboard API'
    },
    {
      path: 'src/components/monitoring/PerformanceDashboard.tsx',
      description: 'Performance Dashboard Component'
    },
    {
      path: 'scripts/database-performance-migration.sql',
      description: 'Database Performance Migration'
    },
    {
      path: 'scripts/setup-performance-monitoring.js',
      description: 'Performance Monitoring Setup Script'
    }
  ];

  for (const file of infrastructureFiles) {
    validateFile(file.path, file.description);
  }
}

/**
 * Validate generated configuration files
 */
function validateGeneratedFiles() {
  log.subheader('Validating Generated Configuration Files');

  const generatedFiles = [
    {
      path: 'database-monitoring-config.sql',
      description: 'Database Monitoring Configuration'
    },
    {
      path: 'redis-monitoring.conf',
      description: 'Redis Monitoring Configuration'
    },
    {
      path: '.env.performance-monitoring',
      description: 'Performance Monitoring Environment'
    },
    {
      path: 'init-performance-monitoring.sh',
      description: 'Initialization Script'
    },
    {
      path: 'PERFORMANCE_MONITORING_SETUP.md',
      description: 'Performance Monitoring Documentation'
    }
  ];

  for (const file of generatedFiles) {
    validateFile(file.path, file.description);
  }
}

/**
 * Validate code implementation quality
 */
function validateCodeImplementation() {
  log.subheader('Validating Code Implementation Quality');

  const codeValidations = [
    {
      file: 'src/lib/database-connection-pool.ts',
      requirements: [
        {
          pattern: /class PortugueseConnectionPoolManager/,
          description: 'Connection pool manager class exists',
          issue: 'Missing main connection pool manager class'
        },
        {
          pattern: /async query<T/,
          description: 'Generic query method implemented',
          issue: 'Query method not properly typed'
        },
        {
          pattern: /portugueseBusinessesGeo|culturalEvents|culturalMatching/,
          description: 'Portuguese community specific methods',
          issue: 'Missing Portuguese community optimization methods'
        },
        {
          pattern: /ConnectionPoolMetrics/,
          description: 'Performance metrics interface',
          issue: 'Metrics tracking not implemented'
        }
      ]
    },
    {
      file: 'src/lib/redis-cache-manager.ts',
      requirements: [
        {
          pattern: /class PortugueseRedisCacheManager/,
          description: 'Redis cache manager class exists',
          issue: 'Missing main cache manager class'
        },
        {
          pattern: /cachePortugueseEvents|cachePortugueseBusinesses/,
          description: 'Portuguese content caching methods',
          issue: 'Missing Portuguese community caching methods'
        },
        {
          pattern: /CacheMetrics/,
          description: 'Cache metrics tracking',
          issue: 'Cache performance metrics not implemented'
        },
        {
          pattern: /invalidateByTags/,
          description: 'Cache invalidation system',
          issue: 'Cache invalidation not properly implemented'
        }
      ]
    },
    {
      file: 'src/lib/query-optimizer.ts',
      requirements: [
        {
          pattern: /class PortugueseQueryOptimizer/,
          description: 'Query optimizer class exists',
          issue: 'Missing query optimization class'
        },
        {
          pattern: /portugueseOptimizations/,
          description: 'Portuguese specific optimizations',
          issue: 'Portuguese text search optimizations missing'
        },
        {
          pattern: /optimizeQuery|executeOptimizedQuery/,
          description: 'Query optimization methods',
          issue: 'Query optimization methods not implemented'
        },
        {
          pattern: /autoOptimizeIndexes/,
          description: 'Auto-indexing functionality',
          issue: 'Automatic index optimization not implemented'
        }
      ]
    }
  ];

  for (const validation of codeValidations) {
    validateCodeFile(validation.file, validation.requirements);
  }
}

/**
 * Validate performance monitoring APIs
 */
async function validateMonitoringAPIs() {
  log.subheader('Validating Performance Monitoring APIs');

  const apiValidations = [
    {
      file: 'src/app/api/monitoring/performance/route.ts',
      requirements: [
        {
          pattern: /export async function GET/,
          description: 'GET endpoint implemented',
          issue: 'Performance monitoring GET endpoint missing'
        },
        {
          pattern: /PerformanceMetrics/,
          description: 'Performance metrics interface',
          issue: 'Performance metrics type definition missing'
        },
        {
          pattern: /portugueseCommunity/,
          description: 'Portuguese community metrics',
          issue: 'Portuguese community specific metrics missing'
        },
        {
          pattern: /collectPerformanceMetrics/,
          description: 'Metrics collection function',
          issue: 'Performance data collection not implemented'
        }
      ]
    },
    {
      file: 'src/app/api/monitoring/dashboard/route.ts',
      requirements: [
        {
          pattern: /DashboardData/,
          description: 'Dashboard data interface',
          issue: 'Dashboard data structure not defined'
        },
        {
          pattern: /overview|keyMetrics|systemHealth/,
          description: 'Dashboard sections implemented',
          issue: 'Dashboard data sections missing'
        },
        {
          pattern: /trends.*last24h/,
          description: 'Trending data support',
          issue: 'Performance trending data not implemented'
        }
      ]
    }
  ];

  for (const validation of apiValidations) {
    validateCodeFile(validation.file, validation.requirements);
  }
}

/**
 * Validate database migration
 */
function validateDatabaseMigration() {
  log.subheader('Validating Database Performance Migration');

  const migrationFile = 'scripts/database-performance-migration.sql';
  const fullPath = path.join(__dirname, '..', migrationFile);

  if (!fs.existsSync(fullPath)) {
    log.error('Database migration file missing');
    validationResults.performance.failed++;
    return false;
  }

  try {
    const content = fs.readFileSync(fullPath, 'utf8');
    
    const migrationChecks = [
      {
        pattern: /CREATE EXTENSION.*postgis/i,
        description: 'PostGIS extension enabled'
      },
      {
        pattern: /idx_portuguese_events.*CONCURRENTLY/i,
        description: 'Portuguese events indexes'
      },
      {
        pattern: /idx_portuguese_businesses.*GIST.*coordinates/i,
        description: 'Business geolocation indexes'
      },
      {
        pattern: /find_portuguese_events_optimized/i,
        description: 'Optimized event discovery function'
      },
      {
        pattern: /find_portuguese_businesses_optimized/i,
        description: 'Optimized business search function'
      },
      {
        pattern: /cultural_compatibility.*optimized/i,
        description: 'Cultural compatibility function'
      },
      {
        pattern: /pg_stat_statements/i,
        description: 'Query performance tracking'
      }
    ];

    let passed = 0;
    for (const check of migrationChecks) {
      if (check.pattern.test(content)) {
        log.success(check.description);
        passed++;
      } else {
        log.error(`Migration missing: ${check.description}`);
        validationResults.performance.issues.push(`Missing: ${check.description}`);
      }
    }

    const score = (passed / migrationChecks.length) * 100;
    if (score >= 80) {
      validationResults.performance.passed++;
      log.success(`Database migration quality: ${Math.round(score)}%`);
    } else {
      validationResults.performance.failed++;
      log.warning(`Database migration needs improvement: ${Math.round(score)}%`);
    }

    return score >= 80;
  } catch (error) {
    log.error(`Error validating database migration: ${error.message}`);
    validationResults.performance.failed++;
    return false;
  }
}

/**
 * Generate validation summary
 */
function generateValidationSummary() {
  log.header('Infrastructure Validation Summary');

  const totalChecks = validationResults.files.passed + validationResults.files.failed +
                     validationResults.code.passed + validationResults.code.failed +
                     validationResults.config.passed + validationResults.config.failed +
                     validationResults.performance.passed + validationResults.performance.failed;

  const totalPassed = validationResults.files.passed + validationResults.code.passed +
                     validationResults.config.passed + validationResults.performance.passed;

  const overallScore = Math.round((totalPassed / totalChecks) * 100);
  validationResults.overall.score = overallScore;

  // Determine overall status
  if (overallScore >= 95) {
    validationResults.overall.status = 'excellent';
    log.success(`Overall Infrastructure Score: ${overallScore}% - EXCELLENT ✨`);
  } else if (overallScore >= 85) {
    validationResults.overall.status = 'good';
    log.success(`Overall Infrastructure Score: ${overallScore}% - GOOD ✅`);
  } else if (overallScore >= 70) {
    validationResults.overall.status = 'acceptable';
    log.warning(`Overall Infrastructure Score: ${overallScore}% - ACCEPTABLE ⚠️`);
  } else {
    validationResults.overall.status = 'needs-improvement';
    log.error(`Overall Infrastructure Score: ${overallScore}% - NEEDS IMPROVEMENT ❌`);
  }

  console.log('\n📊 Detailed Results:');
  console.log(`   Files: ${validationResults.files.passed}✅ ${validationResults.files.failed}❌`);
  console.log(`   Code Quality: ${validationResults.code.passed}✅ ${validationResults.code.failed}❌`);
  console.log(`   Configuration: ${validationResults.config.passed}✅ ${validationResults.config.failed}❌`);
  console.log(`   Performance: ${validationResults.performance.passed}✅ ${validationResults.performance.failed}❌`);

  // Show issues if any
  if (validationResults.files.missing.length > 0) {
    console.log('\n📁 Missing Files:');
    validationResults.files.missing.forEach(file => {
      console.log(`   - ${file}`);
    });
  }

  if (validationResults.code.issues.length > 0) {
    console.log('\n🔧 Code Issues:');
    validationResults.code.issues.forEach(issue => {
      console.log(`   - ${path.basename(issue.file)}: ${issue.requirement}`);
    });
  }

  if (validationResults.performance.issues.length > 0) {
    console.log('\n⚡ Performance Issues:');
    validationResults.performance.issues.forEach(issue => {
      console.log(`   - ${issue}`);
    });
  }

  return validationResults;
}

/**
 * Main validation function
 */
async function validateInfrastructure() {
  console.log(`${colors.bold}${colors.blue}`);
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║              LusoTown Infrastructure Validation              ║');
  console.log('║         Portuguese-speaking Community Platform              ║');
  console.log('╚══════════════════════════════════════════════════════════════╝');
  console.log(`${colors.reset}\n`);

  try {
    // Validate infrastructure files
    validateInfrastructureFiles();
    console.log('');

    // Validate generated configuration files
    validateGeneratedFiles();
    console.log('');

    // Validate code implementation
    validateCodeImplementation();
    console.log('');

    // Validate monitoring APIs
    await validateMonitoringAPIs();
    console.log('');

    // Validate database migration
    validateDatabaseMigration();
    console.log('');

    // Generate summary
    const results = generateValidationSummary();

    // Success recommendations
    if (results.overall.status === 'excellent' || results.overall.status === 'good') {
      console.log('\n🎉 Infrastructure Validation PASSED!');
      console.log('\n🚀 Ready for deployment:');
      console.log('   1. Load environment: source .env.performance-monitoring');
      console.log('   2. Initialize monitoring: ./init-performance-monitoring.sh');
      console.log('   3. Start application: npm run dev');
      console.log('   4. Access dashboard: http://localhost:3000/admin/monitoring');
    } else {
      console.log('\n⚠️  Infrastructure validation needs attention');
      console.log('\n🔧 Recommended actions:');
      console.log('   1. Review missing files and implement required components');
      console.log('   2. Address code quality issues identified above');
      console.log('   3. Re-run validation: node scripts/validate-infrastructure.js');
    }

    return results;

  } catch (error) {
    log.error(`Validation failed: ${error.message}`);
    return { overall: { status: 'error', score: 0 } };
  }
}

// Run validation if called directly
if (require.main === module) {
  validateInfrastructure()
    .then(results => {
      const exitCode = results.overall.score >= 70 ? 0 : 1;
      process.exit(exitCode);
    })
    .catch(error => {
      console.error('Validation error:', error);
      process.exit(1);
    });
}

module.exports = {
  validateInfrastructure,
  validationResults
};