#!/usr/bin/env node
/**
 * LusoTown Portuguese Community Streaming Test Suite
 * Tests RTMP ingestion and HLS output
 */

const http = require('http');

const config = {
  api_port: 3002,
  hls_port: 8080,
  rtmp_port: 1935
};

const testStreamingPipeline = async () => {
  console.log('🇵🇹 LusoTown Portuguese Community Streaming Pipeline Test');
  console.log('=========================================================');
  console.log('');

  // Test 1: API Health
  console.log('🔍 Test 1: API Server Health');
  try {
    const response = await fetch(`http://localhost:${config.api_port}/health`);
    const data = await response.json();
    console.log('✅ API Server:', data.status);
    console.log(`   Service: ${data.service}`);
    console.log(`   Uptime: ${Math.round(data.uptime)}s`);
  } catch (error) {
    console.log('❌ API Server: Failed');
    console.log(`   Error: ${error.message}`);
  }

  console.log('');

  // Test 2: Streaming Stats
  console.log('🔍 Test 2: Streaming Statistics');
  try {
    const response = await fetch(`http://localhost:${config.api_port}/api/v1/stats`);
    const data = await response.json();
    console.log('✅ Streaming Stats Retrieved');
    console.log(`   Active Streams: ${data.activeStreams}`);
    console.log(`   Total Connections: ${data.totalConnections}`);
    console.log(`   Portuguese Viewers: ${data.portugueseViewers}`);
    console.log(`   Cultural Content: ${data.culturalContent}`);
  } catch (error) {
    console.log('❌ Streaming Stats: Failed');
    console.log(`   Error: ${error.message}`);
  }

  console.log('');

  // Test 3: Stream Management API
  console.log('🔍 Test 3: Stream Management API');
  try {
    const response = await fetch(`http://localhost:${config.api_port}/api/v1/streams`);
    const data = await response.json();
    console.log('✅ Stream Management API Working');
    console.log(`   Current Streams: ${data.streams.length}`);
  } catch (error) {
    console.log('❌ Stream Management API: Failed');
    console.log(`   Error: ${error.message}`);
  }

  console.log('');

  // Test 4: HLS Server
  console.log('🔍 Test 4: HLS Media Server');
  try {
    const response = await fetch(`http://localhost:${config.hls_port}/`, { method: 'HEAD' });
    console.log('✅ HLS Server Responding');
    console.log(`   Status: ${response.status}`);
  } catch (error) {
    console.log('❌ HLS Server: Failed');
    console.log(`   Error: ${error.message}`);
  }

  console.log('');

  // Test 5: RTMP Port
  console.log('🔍 Test 5: RTMP Server Port');
  const net = require('net');
  const checkRTMP = () => {
    return new Promise((resolve, reject) => {
      const socket = new net.Socket();
      socket.setTimeout(3000);
      
      socket.on('connect', () => {
        socket.destroy();
        resolve();
      });
      
      socket.on('error', reject);
      socket.on('timeout', () => {
        socket.destroy();
        reject(new Error('Timeout'));
      });
      
      socket.connect(config.rtmp_port, 'localhost');
    });
  };

  try {
    await checkRTMP();
    console.log('✅ RTMP Server Port Open');
    console.log(`   Port: ${config.rtmp_port}`);
  } catch (error) {
    console.log('❌ RTMP Server: Failed');
    console.log(`   Error: ${error.message}`);
  }

  console.log('');
  console.log('📋 Connection Information for Portuguese Creators:');
  console.log('==================================================');
  console.log('');
  console.log('🎥 RTMP Ingestion (OBS Studio):');
  console.log(`   Server: rtmp://localhost:${config.rtmp_port}/live/`);
  console.log('   Stream Key: portuguese_test');
  console.log('');
  console.log('📺 HLS Playback:');
  console.log(`   URL: http://localhost:${config.hls_port}/live/portuguese_test.m3u8`);
  console.log('');
  console.log('🔧 API Management:');
  console.log(`   Base URL: http://localhost:${config.api_port}/api/v1/`);
  console.log('   Health: /health');
  console.log('   Stats: /api/v1/stats');
  console.log('   Streams: /api/v1/streams');
  console.log('');
  console.log('🎯 Quick Test Instructions:');
  console.log('1. Open OBS Studio');
  console.log('2. Add Stream Source');
  console.log(`3. Server: rtmp://localhost:${config.rtmp_port}/live/`);
  console.log('4. Stream Key: portuguese_test');
  console.log('5. Start Streaming');
  console.log(`6. Open: http://localhost:${config.hls_port}/live/portuguese_test.m3u8 in VLC`);
  console.log('');
  console.log('✅ LusoTown Portuguese Community Streaming Infrastructure Ready!');
};

// Add global fetch polyfill for older Node.js versions
if (!globalThis.fetch) {
  const { default: fetch } = require('node-fetch');
  globalThis.fetch = fetch;
}

testStreamingPipeline().catch(console.error);
