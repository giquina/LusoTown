#!/usr/bin/env node
/**
 * LusoTown Portuguese Community Streaming Health Check
 * Validates all streaming infrastructure components
 */

const http = require('http');

const config = {
  api_port: process.env.PORT || 3002,
  hls_port: process.env.HTTP_PORT || 8080,
  rtmp_port: process.env.RTMP_PORT || 1935
};

const checkEndpoint = (port, path = '/health', description) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: port,
      path: path,
      method: 'GET',
      timeout: 5000
    };

    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve({
            service: description,
            status: 'healthy',
            port: port,
            response: data
          });
        } else {
          reject({
            service: description,
            status: 'unhealthy',
            port: port,
            statusCode: res.statusCode
          });
        }
      });
    });

    req.on('error', (err) => {
      reject({
        service: description,
        status: 'error',
        port: port,
        error: err.message
      });
    });

    req.on('timeout', () => {
      req.destroy();
      reject({
        service: description,
        status: 'timeout',
        port: port,
        error: 'Request timeout'
      });
    });

    req.end();
  });
};

const performHealthCheck = async () => {
  console.log('🇵🇹 LusoTown Portuguese Community Streaming Health Check');
  console.log('========================================================');
  console.log('');

  const checks = [
    { port: config.api_port, path: '/health', description: 'API Server' },
    { port: config.hls_port, path: '/api/v1/summaries', description: 'HLS/Media Server' }
  ];

  const results = [];

  for (const check of checks) {
    try {
      console.log(`🔍 Checking ${check.description} (port ${check.port})...`);
      const result = await checkEndpoint(check.port, check.path, check.description);
      console.log(`✅ ${result.service}: ${result.status}`);
      results.push(result);
    } catch (error) {
      console.log(`❌ ${error.service}: ${error.status} - ${error.error || error.statusCode}`);
      results.push(error);
    }
  }

  // Check RTMP port availability
  const net = require('net');
  const checkRTMP = () => {
    return new Promise((resolve, reject) => {
      const socket = new net.Socket();
      socket.setTimeout(3000);
      
      socket.on('connect', () => {
        socket.destroy();
        resolve({
          service: 'RTMP Server',
          status: 'healthy',
          port: config.rtmp_port
        });
      });
      
      socket.on('error', () => {
        reject({
          service: 'RTMP Server',
          status: 'error',
          port: config.rtmp_port,
          error: 'Connection failed'
        });
      });
      
      socket.on('timeout', () => {
        socket.destroy();
        reject({
          service: 'RTMP Server',
          status: 'timeout',
          port: config.rtmp_port,
          error: 'Connection timeout'
        });
      });
      
      socket.connect(config.rtmp_port, 'localhost');
    });
  };

  try {
    console.log(`🔍 Checking RTMP Server (port ${config.rtmp_port})...`);
    const rtmpResult = await checkRTMP();
    console.log(`✅ ${rtmpResult.service}: ${rtmpResult.status}`);
    results.push(rtmpResult);
  } catch (error) {
    console.log(`❌ ${error.service}: ${error.status} - ${error.error}`);
    results.push(error);
  }

  console.log('');
  console.log('📊 Health Check Summary:');
  console.log('========================');

  const healthy = results.filter(r => r.status === 'healthy').length;
  const total = results.length;

  console.log(`✅ Healthy: ${healthy}/${total}`);
  console.log(`❌ Unhealthy: ${total - healthy}/${total}`);

  if (healthy === total) {
    console.log('');
    console.log('🎉 All LusoTown Portuguese Community Streaming services are healthy!');
    process.exit(0);
  } else {
    console.log('');
    console.log('⚠️  Some LusoTown streaming services need attention.');
    process.exit(1);
  }
};

// Run health check
performHealthCheck().catch((error) => {
  console.error('❌ Health check failed:', error);
  process.exit(1);
});
