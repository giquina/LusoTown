#!/bin/bash

# Portuguese Community Monitoring Setup
# Sets up error tracking, performance monitoring, and cultural feature monitoring

set -e

echo "📊 Setting up Portuguese Community Monitoring..."

# Create Sentry configuration
echo "🛡️  Configuring Sentry error monitoring..."
cat > sentry.properties << 'SENTRY_EOF'
defaults.url=https://sentry.io/
defaults.org=lusotown-community
defaults.project=lusotown-web
auth.token=sntrys_abc123def456ghi789jkl012mno345pqr
SENTRY_EOF

# Performance monitoring script
echo "⚡ Setting up performance monitoring..."
cat > scripts/monitoring/performance-monitor.js << 'PERF_EOF'
// Portuguese Community Performance Monitor
const https = require('https');

const ENDPOINTS = [
  'https://lusotown.vercel.app',
  'https://lusotown.vercel.app/events',
  'https://lusotown.vercel.app/business-directory',
  'https://lusotown.vercel.app/api/health'
];

async function checkPerformance() {
  console.log('🇵🇹 Monitoring Portuguese Community Platform Performance...');
  
  for (const endpoint of ENDPOINTS) {
    const startTime = Date.now();
    
    try {
      await new Promise((resolve, reject) => {
        const req = https.get(endpoint, (res) => {
          const duration = Date.now() - startTime;
          console.log(`✅ ${endpoint}: ${res.statusCode} (${duration}ms)`);
          
          if (duration > 3000) {
            console.warn(`⚠️  Slow response: ${endpoint} took ${duration}ms`);
          }
          
          resolve();
        });
        
        req.on('error', (err) => {
          console.error(`❌ ${endpoint}: ${err.message}`);
          reject(err);
        });
        
        req.setTimeout(10000, () => {
          console.error(`❌ ${endpoint}: Timeout`);
          req.destroy();
          reject(new Error('Timeout'));
        });
      });
    } catch (error) {
      console.error(`❌ ${endpoint}: ${error.message}`);
    }
  }
}

// Run monitoring
checkPerformance();
PERF_EOF

# Cultural feature monitoring
echo "🏛️  Setting up cultural feature monitoring..."
cat > scripts/monitoring/cultural-monitor.js << 'CULTURAL_EOF'
// Portuguese Cultural Feature Monitor
const https = require('https');

const CULTURAL_ENDPOINTS = [
  '/api/events/portuguese',
  '/api/business-directory/portuguese',
  '/api/cultural/matching',
  '/api/heritage/palop'
];

async function checkCulturalFeatures() {
  console.log('🇵🇹 Monitoring Portuguese Cultural Features...');
  
  const baseUrl = 'https://lusotown.vercel.app';
  
  for (const endpoint of CULTURAL_ENDPOINTS) {
    const url = baseUrl + endpoint;
    const startTime = Date.now();
    
    try {
      await new Promise((resolve, reject) => {
        const req = https.get(url, (res) => {
          const duration = Date.now() - startTime;
          
          if (res.statusCode === 200) {
            console.log(`✅ Cultural Feature ${endpoint}: Operational (${duration}ms)`);
          } else {
            console.warn(`⚠️  Cultural Feature ${endpoint}: Status ${res.statusCode}`);
          }
          
          resolve();
        });
        
        req.on('error', (err) => {
          console.error(`❌ Cultural Feature ${endpoint}: ${err.message}`);
          reject(err);
        });
        
        req.setTimeout(5000, () => {
          req.destroy();
          reject(new Error('Timeout'));
        });
      });
    } catch (error) {
      console.error(`❌ Cultural Feature ${endpoint}: Monitoring failed`);
    }
  }
}

checkCulturalFeatures();
CULTURAL_EOF

echo "✅ Monitoring setup completed!"
echo "📊 Run performance monitor: node scripts/monitoring/performance-monitor.js"
echo "🏛️  Run cultural monitor: node scripts/monitoring/cultural-monitor.js"

