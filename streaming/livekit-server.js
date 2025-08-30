#!/usr/bin/env node
/**
 * LusoTown Portuguese-speaking community LiveKit Streaming Server
 * Enhanced streaming with LiveKit integration for Portuguese cultural content
 * Optimized for Portuguese speakers in London & United Kingdom
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { AccessToken } = require('livekit-server-sdk');
const fs = require('fs');
require('dotenv').config();

// Portuguese Cultural Streaming Configuration
const config = {
  // LiveKit Configuration
  livekit: {
    apiKey: process.env.LIVEKIT_API_KEY || 'devkey',
    apiSecret: process.env.LIVEKIT_API_SECRET || 'secret',
    wsUrl: process.env.LIVEKIT_URL || 'wss://lusotown-streaming.livekit.cloud'
  },
  
  // Server Configuration
  server: {
    port: process.env.PORT || 8080,
    host: process.env.HOST || '0.0.0.0'
  },
  
  // Portuguese Cultural Categories
  categories: {
    musica: { name: 'Música', color: '#1e40af', icon: '🎵' },
    culinaria: { name: 'Culinária', color: '#059669', icon: '🍽️' },
    cultura: { name: 'Cultura & História', color: '#f59e0b', icon: '📚' },
    danca: { name: 'Dança', color: '#dc2626', icon: '💃' },
    artesanato: { name: 'Artesanato', color: '#7c3aed', icon: '🎨' },
    eventos: { name: 'Eventos Comunitários', color: '#059669', icon: '🎪' },
    conversas: { name: 'Conversas & Talk Shows', color: '#1e40af', icon: '🎤' }
  }
};

// Initialize Express app
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

// In-memory storage for Portuguese streaming data
const streamingData = {
  activeStreams: new Map(),
  totalConnections: 0,
  portugueseViewers: 0,
  culturalContent: 0,
  roomParticipants: new Map()
};

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

// Generate LiveKit Access Token for Portuguese Community
const generateAccessToken = (roomName, participantName, metadata = {}) => {
  const at = new AccessToken(config.livekit.apiKey, config.livekit.apiSecret, {
    identity: participantName,
    ttl: '10h' // Token valid for 10 hours
  });

  // Add Portuguese community metadata
  at.metadata = JSON.stringify({
    ...metadata,
    community: 'portuguese',
    timestamp: Date.now()
  });

  at.addGrant({
    room: roomName,
    roomJoin: true,
    canPublish: true,
    canPublishData: true,
    canSubscribe: true,
    roomRecord: true, // Allow recording Portuguese cultural content
    roomAdmin: metadata.isAdmin || false
  });

  return at.toJwt();
};

// API Routes for Portuguese-speaking community integration

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'lusotown-livekit-streaming',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    livekit: {
      wsUrl: config.livekit.wsUrl,
      connected: true
    }
  });
});

// Generate LiveKit token for Portuguese community members
app.post('/api/streaming/token', (req, res) => {
  try {
    const { roomName, participantName, category, metadata = {} } = req.body;

    if (!roomName || !participantName) {
      return res.status(400).json({ 
        error: 'Room name and participant name are required' 
      });
    }

    // Add Portuguese cultural context
    const enhancedMetadata = {
      ...metadata,
      category: category || 'general',
      cultural: config.categories[category] || null,
      joinedAt: Date.now(),
      community: 'portuguese'
    };

    const token = generateAccessToken(roomName, participantName, enhancedMetadata);
    
    console.log(`🎫 Generated LiveKit token for Portuguese participant: ${participantName} in room: ${roomName}`);
    
    res.json({
      token,
      wsUrl: config.livekit.wsUrl,
      roomName,
      participantName,
      metadata: enhancedMetadata
    });

  } catch (error) {
    console.error('❌ Token generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate streaming token' 
    });
  }
});

// Create Portuguese cultural streaming room
app.post('/api/streaming/room/create', (req, res) => {
  try {
    const { 
      roomName, 
      creatorName, 
      category = 'general',
      title,
      description,
      isPrivate = false,
      maxParticipants = 100 
    } = req.body;

    if (!roomName || !creatorName) {
      return res.status(400).json({ 
        error: 'Room name and creator name are required' 
      });
    }

    // Create room configuration
    const roomConfig = {
      roomName,
      creatorName,
      category,
      title: title || `${config.categories[category]?.name || 'Geral'} - ${roomName}`,
      description,
      isPrivate,
      maxParticipants,
      createdAt: Date.now(),
      cultural: config.categories[category] || null,
      participants: []
    };

    // Store room data
    streamingData.activeStreams.set(roomName, roomConfig);
    streamingData.roomParticipants.set(roomName, new Set());
    
    if (config.categories[category]) {
      streamingData.culturalContent++;
    }

    // Generate creator token with admin privileges
    const creatorToken = generateAccessToken(roomName, creatorName, {
      isAdmin: true,
      isCreator: true,
      category,
      cultural: config.categories[category]
    });

    console.log(`🎪 Created Portuguese streaming room: ${roomName} (${category})`);

    res.json({
      success: true,
      room: roomConfig,
      creatorToken,
      wsUrl: config.livekit.wsUrl
    });

  } catch (error) {
    console.error('❌ Room creation error:', error);
    res.status(500).json({ 
      error: 'Failed to create streaming room' 
    });
  }
});

// Join Portuguese streaming room
app.post('/api/streaming/room/join', (req, res) => {
  try {
    const { roomName, participantName, metadata = {} } = req.body;

    if (!roomName || !participantName) {
      return res.status(400).json({ 
        error: 'Room name and participant name are required' 
      });
    }

    const room = streamingData.activeStreams.get(roomName);
    
    if (!room) {
      return res.status(404).json({ 
        error: 'Room not found' 
      });
    }

    // Check room capacity
    const currentParticipants = streamingData.roomParticipants.get(roomName)?.size || 0;
    if (currentParticipants >= room.maxParticipants) {
      return res.status(423).json({ 
        error: 'Room is full' 
      });
    }

    // Add participant
    streamingData.roomParticipants.get(roomName)?.add(participantName);
    streamingData.portugueseViewers++;

    // Generate viewer token
    const viewerToken = generateAccessToken(roomName, participantName, {
      ...metadata,
      category: room.category,
      cultural: room.cultural,
      joinedAt: Date.now()
    });

    console.log(`👥 Portuguese participant joined: ${participantName} -> ${roomName}`);

    res.json({
      success: true,
      token: viewerToken,
      wsUrl: config.livekit.wsUrl,
      room: {
        name: roomName,
        title: room.title,
        category: room.category,
        cultural: room.cultural,
        participants: currentParticipants + 1
      }
    });

  } catch (error) {
    console.error('❌ Room join error:', error);
    res.status(500).json({ 
      error: 'Failed to join streaming room' 
    });
  }
});

// Get Portuguese streaming statistics
app.get('/api/streaming/stats', (req, res) => {
  const stats = {
    activeStreams: streamingData.activeStreams.size,
    totalConnections: streamingData.totalConnections,
    portugueseViewers: streamingData.portugueseViewers,
    culturalContent: streamingData.culturalContent,
    categories: Object.keys(config.categories).map(key => ({
      id: key,
      ...config.categories[key],
      activeStreams: Array.from(streamingData.activeStreams.values())
        .filter(stream => stream.category === key).length
    })),
    rooms: Array.from(streamingData.activeStreams.entries()).map(([name, room]) => ({
      name,
      title: room.title,
      category: room.category,
      cultural: room.cultural,
      participants: streamingData.roomParticipants.get(name)?.size || 0,
      createdAt: room.createdAt,
      duration: Date.now() - room.createdAt
    }))
  };
  
  res.json(stats);
});

// Get Portuguese cultural streams
app.get('/api/streaming/cultural-streams', (req, res) => {
  const culturalStreams = Array.from(streamingData.activeStreams.entries())
    .filter(([name, stream]) => stream.cultural)
    .map(([name, stream]) => ({
      name,
      title: stream.title,
      category: stream.category,
      cultural: stream.cultural,
      participants: streamingData.roomParticipants.get(name)?.size || 0,
      createdAt: stream.createdAt
    }));
  
  res.json({ culturalStreams });
});

// Portuguese cultural categories endpoint
app.get('/api/streaming/categories', (req, res) => {
  res.json({
    categories: Object.keys(config.categories).map(key => ({
      id: key,
      ...config.categories[key]
    }))
  });
});

// End Portuguese streaming room
app.post('/api/streaming/room/end', (req, res) => {
  try {
    const { roomName, creatorName } = req.body;

    if (!roomName || !creatorName) {
      return res.status(400).json({ 
        error: 'Room name and creator name are required' 
      });
    }

    const room = streamingData.activeStreams.get(roomName);
    
    if (!room) {
      return res.status(404).json({ 
        error: 'Room not found' 
      });
    }

    // Verify creator
    if (room.creatorName !== creatorName) {
      return res.status(403).json({ 
        error: 'Only room creator can end the stream' 
      });
    }

    // Clean up room data
    const participantCount = streamingData.roomParticipants.get(roomName)?.size || 0;
    streamingData.portugueseViewers -= participantCount;
    
    if (room.cultural) {
      streamingData.culturalContent--;
    }

    streamingData.activeStreams.delete(roomName);
    streamingData.roomParticipants.delete(roomName);

    console.log(`🛑 Ended Portuguese streaming room: ${roomName}`);

    res.json({
      success: true,
      message: 'Room ended successfully',
      finalStats: {
        duration: Date.now() - room.createdAt,
        maxParticipants: participantCount
      }
    });

  } catch (error) {
    console.error('❌ Room end error:', error);
    res.status(500).json({ 
      error: 'Failed to end streaming room' 
    });
  }
});

// WebSocket for real-time Portuguese community features
io.on('connection', (socket) => {
  console.log(`🔌 Portuguese community websocket connected: ${socket.id}`);
  
  // Send current stats
  socket.emit('stats', streamingData);

  // Handle Portuguese chat messages
  socket.on('portuguese-chat', (data) => {
    console.log('💬 Portuguese chat message:', data);
    io.emit('portuguese-chat', {
      ...data,
      timestamp: Date.now()
    });
  });

  // Handle Portuguese cultural reactions
  socket.on('cultural-reaction', (data) => {
    console.log('🎭 Portuguese cultural reaction:', data);
    io.emit('cultural-reaction', {
      ...data,
      timestamp: Date.now()
    });
  });

  // Handle room participant updates
  socket.on('participant-update', (data) => {
    const { roomName, action, participantName } = data;
    
    if (action === 'join') {
      streamingData.roomParticipants.get(roomName)?.add(participantName);
    } else if (action === 'leave') {
      streamingData.roomParticipants.get(roomName)?.delete(participantName);
      streamingData.portugueseViewers = Math.max(0, streamingData.portugueseViewers - 1);
    }
    
    // Broadcast updated participant count
    io.emit('participant-count-update', {
      roomName,
      count: streamingData.roomParticipants.get(roomName)?.size || 0
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
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT received, shutting down gracefully');
  server.close(() => {
    process.exit(0);
  });
});

// Initialize and start server
const startServer = async () => {
  try {
    // Create necessary directories
    createDirectories();
    
    // Start Express server
    server.listen(config.server.port, config.server.host, () => {
      console.log(`🚀 LusoTown LiveKit Streaming Server started on ${config.server.host}:${config.server.port}`);
      console.log('');
      console.log('🇵🇹 LusoTown Portuguese-speaking community LiveKit Streaming');
      console.log('==========================================================');
      console.log('');
      console.log('🔑 LiveKit Configuration:');
      console.log(`   WebSocket URL: ${config.livekit.wsUrl}`);
      console.log(`   API Key: ${config.livekit.apiKey}`);
      console.log('');
      console.log('📡 API Endpoints:');
      console.log(`   Token Generation: POST ${config.server.host}:${config.server.port}/api/streaming/token`);
      console.log(`   Create Room: POST ${config.server.host}:${config.server.port}/api/streaming/room/create`);
      console.log(`   Join Room: POST ${config.server.host}:${config.server.port}/api/streaming/room/join`);
      console.log(`   Statistics: GET ${config.server.host}:${config.server.port}/api/streaming/stats`);
      console.log('');
      console.log('🎭 Portuguese Cultural Categories:');
      Object.keys(config.categories).forEach(key => {
        console.log(`   ${config.categories[key].icon} ${config.categories[key].name} (${key})`);
      });
      console.log('');
      console.log('📊 Health Check:');
      console.log(`   ${config.server.host}:${config.server.port}/health`);
      console.log('');
      console.log('🌐 WebSocket (Real-time features):');
      console.log(`   ws://${config.server.host}:${config.server.port}`);
      console.log('');
      console.log('✅ Ready for Portuguese community streaming with LiveKit!');
    });
    
  } catch (error) {
    console.error('❌ Failed to start LusoTown LiveKit streaming server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();

module.exports = { app, server, config, streamingData };