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
