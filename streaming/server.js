#!/usr/bin/env node
/**
 * LusoTown Portuguese Community Streaming Server
 * Simple Relay Server (SRS) implementation using Node.js
 * Optimized for Portuguese speakers in London & UK
 */

const express = require('express');
const NodeMediaServer = require('node-media-server');
const cors = require('cors');
const helmet = require('helmet');
const { createServer } = require('http');
const { Server } = require('socket.io');
const path = require('path');
const fs = require('fs');
const Redis = require('redis');
const { requireEnv, getEnv, validateRequiredEnvVars } = require('./env-helper');

// Validate critical environment variables at startup
validateRequiredEnvVars([
  'LUSOTOWN_STREAMING_SECRET',
  'REDIS_URL'
]);

// Configuration for Portuguese community streaming
const config = {
  // Server configuration
  server: {
    port: getEnv('PORT', '3002'),
    host: getEnv('HOST', '0.0.0.0')
  },
  
  // Redis configuration for Portuguese community features
  redis: {
    url: requireEnv('REDIS_URL', 'Redis connection URL for streaming features'),
    password: process.env.REDIS_PASSWORD // Optional, may be in REDIS_URL
  },
  
  // RTMP configuration for content ingestion
  rtmp: {
    port: getEnv('RTMP_PORT', '1935'),
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  
  // HLS configuration for Portuguese mobile optimization
  http: {
    port: getEnv('HTTP_PORT', '8080'),
    allow_origin: '*',
    mediaroot: './media',
    webroot: './www',
    api: true
  },
  
  // Authentication for Portuguese community
  auth: {
    api: true,
    api_user: 'lusotown',
    api_pass: requireEnv('LUSOTOWN_STREAMING_SECRET', 'LusoTown streaming API secret'),
    play: false,
    publish: false
  },
  
  // Portuguese content relay configuration
  relay: {
    ffmpeg: getEnv('FFMPEG_PATH', require('ffmpeg-static')),
    tasks: [
      {
        app: 'live',
        mode: 'push',
        edge: 'rtmp://127.0.0.1:1935/hls'
      }
    ]
  }
};

// Initialize Express app for API and monitoring
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Security middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      mediaSrc: ["'self'", "*"],
      imgSrc: ["'self'", "*", "data:"],
      connectSrc: ["'self'", "*"]
    }
  }
}));

app.use(cors({
  origin: '*',
  credentials: true
}));

app.use(express.json());
app.use(express.static('www'));

// Create necessary directories
const createDirectories = () => {
  const dirs = ['./media', './www', './logs'];
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`✅ Created directory: ${dir}`);
    }
  });
};

// Initialize Redis client for Portuguese community features (optional)
let redisClient;
const initRedis = async () => {
  try {
    redisClient = Redis.createClient({
      url: config.redis.url,
      password: config.redis.password
    });
    
    redisClient.on('error', (err) => {
      console.log('⚠️ Redis not available, using in-memory storage for Portuguese community');
    });
    
    redisClient.on('connect', () => {
      console.log('✅ Redis Portuguese community connected');
    });
    
    await redisClient.connect();
    
    // Initialize Portuguese community data
    await redisClient.hSet('lusotown:stats', {
      activeStreams: '0',
      totalConnections: '0',
      portugueseViewers: '0',
      culturalContent: '0'
    });
    
  } catch (error) {
    console.log('⚠️ Redis not available, using in-memory storage for Portuguese community');
    redisClient = null;
  }
};

// Portuguese community streaming analytics
const streamingStats = {
  activeStreams: new Map(),
  totalConnections: 0,
  portugueseViewers: 0,
  culturalContent: 0
};

// Initialize Node Media Server with Portuguese optimization
const nms = new NodeMediaServer({
  ...config,
  logType: 3, // Enable detailed logging
  
  // Portuguese community hooks
  http: {
    ...config.http,
    // Custom API endpoints for Portuguese community
    api: {
      enable: true,
      auth: {
        api_user: config.auth.api_user,
        api_pass: config.auth.api_pass
      }
    }
  }
});

// Portuguese community event handlers
nms.on('preConnect', (id, args) => {
  console.log(`🇵🇹 Portuguese community connection: ${id}`, args);
  streamingStats.totalConnections++;
});

nms.on('postConnect', (id, args) => {
  console.log(`✅ Connected: ${id}`);
});

nms.on('doneConnect', (id, args) => {
  console.log(`📤 Disconnected: ${id}`);
});

nms.on('prePublish', (id, StreamPath, args) => {
  console.log(`🎥 Portuguese creator publishing: ${StreamPath}`);
  
  // Extract stream key and validate
  const streamKey = StreamPath.split('/').pop();
  console.log(`🔑 Stream Key: ${streamKey}`);
  
  // Add to active streams
  streamingStats.activeStreams.set(streamKey, {
    id,
    path: StreamPath,
    startTime: Date.now(),
    viewers: 0,
    cultural: StreamPath.includes('portuguese') || StreamPath.includes('cultural')
  });
  
  if (streamingStats.activeStreams.get(streamKey)?.cultural) {
    streamingStats.culturalContent++;
  }
});

nms.on('postPublish', (id, StreamPath, args) => {
  console.log(`🚀 Stream live: ${StreamPath}`);
  io.emit('streamStart', { path: StreamPath, time: Date.now() });
});

nms.on('donePublish', (id, StreamPath, args) => {
  console.log(`🛑 Stream ended: ${StreamPath}`);
  const streamKey = StreamPath.split('/').pop();
  
  if (streamingStats.activeStreams.has(streamKey)) {
    const stream = streamingStats.activeStreams.get(streamKey);
    if (stream.cultural) {
      streamingStats.culturalContent--;
    }
    streamingStats.activeStreams.delete(streamKey);
  }
  
  io.emit('streamEnd', { path: StreamPath, time: Date.now() });
});

nms.on('prePlay', (id, StreamPath, args) => {
  console.log(`👀 Portuguese viewer watching: ${StreamPath}`);
  const streamKey = StreamPath.split('/').pop();
  
  if (streamingStats.activeStreams.has(streamKey)) {
    streamingStats.activeStreams.get(streamKey).viewers++;
  }
  
  streamingStats.portugueseViewers++;
});

nms.on('donePlay', (id, StreamPath, args) => {
  console.log(`👋 Viewer left: ${StreamPath}`);
  const streamKey = StreamPath.split('/').pop();
  
  if (streamingStats.activeStreams.has(streamKey)) {
    streamingStats.activeStreams.get(streamKey).viewers--;
  }
  
  streamingStats.portugueseViewers--;
});

// API Routes for Portuguese community integration

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'lusotown-portuguese-streaming',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Streaming statistics for Portuguese community
app.get('/api/v1/stats', (req, res) => {
  const stats = {
    activeStreams: streamingStats.activeStreams.size,
    totalConnections: streamingStats.totalConnections,
    portugueseViewers: streamingStats.portugueseViewers,
    culturalContent: streamingStats.culturalContent,
    streams: Array.from(streamingStats.activeStreams.entries()).map(([key, stream]) => ({
      key,
      viewers: stream.viewers,
      duration: Date.now() - stream.startTime,
      cultural: stream.cultural
    }))
  };
  
  res.json(stats);
});

// Portuguese community stream management
app.get('/api/v1/streams', (req, res) => {
  const streams = Array.from(streamingStats.activeStreams.entries()).map(([key, stream]) => ({
    streamKey: key,
    path: stream.path,
    viewers: stream.viewers,
    startTime: stream.startTime,
    duration: Date.now() - stream.startTime,
    cultural: stream.cultural,
    playUrl: `http://localhost:${config.http.port}/live/${key}.m3u8`,
    rtmpUrl: `rtmp://localhost:${config.rtmp.port}/live/${key}`
  }));
  
  res.json({ streams });
});

// Portuguese cultural content endpoints
app.get('/api/v1/cultural-streams', (req, res) => {
  const culturalStreams = Array.from(streamingStats.activeStreams.entries())
    .filter(([key, stream]) => stream.cultural)
    .map(([key, stream]) => ({
      streamKey: key,
      path: stream.path,
      viewers: stream.viewers,
      startTime: stream.startTime,
      playUrl: `http://localhost:${config.http.port}/live/${key}.m3u8`
    }));
  
  res.json({ culturalStreams });
});

// Stream authentication for Portuguese community
app.post('/api/streaming/auth/publish', (req, res) => {
  // Simplified authentication - in production, validate against Supabase
  console.log('🔐 Publish authentication request:', req.body);
  res.json({ allowed: true, message: 'Portuguese community publishing approved' });
});

app.post('/api/streaming/auth/play', (req, res) => {
  // Simplified authentication - in production, validate subscriptions
  console.log('👁️ Play authentication request:', req.body);
  res.json({ allowed: true, message: 'Portuguese community viewing approved' });
});

// Portuguese community webhooks (for integration with main app)
app.post('/api/streaming/hooks/connect', (req, res) => {
  console.log('🔗 Stream connect hook:', req.body);
  res.json({ code: 0 });
});

app.post('/api/streaming/hooks/publish', (req, res) => {
  console.log('📢 Stream publish hook:', req.body);
  res.json({ code: 0 });
});

app.post('/api/streaming/hooks/play', (req, res) => {
  console.log('▶️ Stream play hook:', req.body);
  res.json({ code: 0 });
});

app.post('/api/streaming/heartbeat', (req, res) => {
  res.json({ 
    code: 0, 
    timestamp: Date.now(),
    portuguese_community: 'active'
  });
});

// WebSocket for real-time Portuguese community features
io.on('connection', (socket) => {
  console.log(`🔌 Portuguese community websocket connected: ${socket.id}`);
  
  // Send current stats
  socket.emit('stats', streamingStats);
  
  // Handle Portuguese chat messages
  socket.on('portuguese-chat', (data) => {
    console.log('💬 Portuguese chat message:', data);
    io.emit('portuguese-chat', {
      ...data,
      timestamp: Date.now()
    });
  });
  
  // Handle Portuguese emotes
  socket.on('portuguese-emote', (data) => {
    console.log('😊 Portuguese emote:', data);
    io.emit('portuguese-emote', {
      ...data,
      timestamp: Date.now()
    });
  });
  
  socket.on('disconnect', () => {
    console.log(`🔌 Portuguese community websocket disconnected: ${socket.id}`);
  });
});

// Error handling
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully');
  server.close(() => {
    nms.stop();
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT received, shutting down gracefully');
  server.close(() => {
    nms.stop();
    process.exit(0);
  });
});

// Initialize and start servers
const startServer = async () => {
  try {
    // Create necessary directories
    createDirectories();
    
    // Initialize Redis for Portuguese community
    await initRedis();
    
    // Start Node Media Server (RTMP/HLS)
    nms.run();
    console.log(`🎥 RTMP Server started on port ${config.rtmp.port}`);
    console.log(`📺 HLS Server started on port ${config.http.port}`);
    
    // Start Express API server
    server.listen(config.server.port, config.server.host, () => {
      console.log(`🚀 LusoTown Portuguese Community Streaming API started on ${config.server.host}:${config.server.port}`);
      console.log('');
      console.log('🇵🇹 LusoTown Portuguese Community Streaming Infrastructure');
      console.log('============================================================');
      console.log('');
      console.log('📡 RTMP Ingestion (OBS/Streaming Software):');
      console.log(`   rtmp://localhost:${config.rtmp.port}/live/[stream_key]`);
      console.log('');
      console.log('📺 HLS Streaming Output:');
      console.log(`   http://localhost:${config.http.port}/live/[stream_key].m3u8`);
      console.log('');
      console.log('🔧 API Management:');
      console.log(`   http://localhost:${config.server.port}/api/v1/`);
      console.log('');
      console.log('📊 Health Check:');
      console.log(`   http://localhost:${config.server.port}/health`);
      console.log('');
      console.log('🌐 WebSocket (Real-time features):');
      console.log(`   ws://localhost:${config.server.port}`);
      console.log('');
      console.log('🎯 Test Stream:');
      console.log('   1. Open OBS Studio');
      console.log(`   2. Server: rtmp://localhost:${config.rtmp.port}/live/`);
      console.log('   3. Stream Key: portuguese_test');
      console.log(`   4. Watch: http://localhost:${config.http.port}/live/portuguese_test.m3u8`);
      console.log('');
      console.log('✅ Ready for Portuguese community streaming!');
    });
    
  } catch (error) {
    console.error('❌ Failed to start LusoTown streaming server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();

module.exports = { app, server, nms, config };
