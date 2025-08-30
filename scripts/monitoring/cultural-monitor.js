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
