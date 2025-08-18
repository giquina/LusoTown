# LusoTown Portuguese Community Streaming Infrastructure

**Professional streaming platform serving Portuguese speakers in London & UK**

[![Docker](https://img.shields.io/badge/Docker-Ready-blue)](https://docker.com)
[![SRS](https://img.shields.io/badge/SRS-6.0-green)](https://github.com/ossrs/srs)
[![Portuguese](https://img.shields.io/badge/Language-Português-red)](https://lusotown.com)
[![Production Ready](https://img.shields.io/badge/Production-Ready-brightgreen)](https://stream.lusotown.com)

## Overview

This infrastructure provides a complete streaming solution optimized for the Portuguese community in London & UK, featuring:

- **RTMP Ingestion** - OBS Studio integration for content creators
- **WebRTC Distribution** - Ultra-low latency streaming (<1 second)
- **HLS Fallback** - Mobile-optimized streaming for all devices
- **CDN Integration** - BunnyCDN optimization for Portuguese market
- **Portuguese Cultural Focus** - Community-specific features and moderation

## Quick Start

### Development Environment

```bash
# Clone and setup
git clone <repository>
cd streaming

# Deploy development environment
./scripts/deploy-dev.sh

# Access streaming services
# RTMP: rtmp://localhost:1935/live/[stream_key]
# HLS: http://localhost:8080/live/[stream_key].m3u8
# WebRTC: http://localhost:8000
# Monitoring: http://localhost:3001
```

### Production Deployment

```bash
# Setup production environment
cp .env.production.example .env.production
# Edit .env.production with your configuration

# Deploy to production
./scripts/deploy-prod.sh

# Verify deployment
curl https://stream.lusotown.com/health
```

## Architecture

### Core Components

- **SRS Media Server** - Streaming protocol handling (RTMP/WebRTC/HLS)
- **Nginx Proxy** - Load balancing and SSL termination
- **Redis Cache** - Real-time data and session management
- **TimescaleDB** - Streaming analytics and metrics
- **BunnyCDN** - Content delivery network optimization

### Protocols Supported

- **RTMP** - Content ingestion from OBS/streaming software
- **WebRTC** - Ultra-low latency viewer experience
- **HLS** - Mobile-first streaming for Portuguese community
- **SRT** - Professional broadcasting quality

## Configuration

### Environment Variables

Key configuration variables for production:

```env
# Core streaming
LUSOTOWN_STREAMING_SECRET=your_secure_secret
CDN_ENDPOINT=https://your-zone.b-cdn.net
BUNNYCDN_API_KEY=your_api_key

# Security
SSL_CERTIFICATE_PATH=/etc/ssl/lusotown/cert.crt
SSL_PRIVATE_KEY_PATH=/etc/ssl/lusotown/private.key

# Portuguese community features
CULTURAL_CONTENT_BOOST=true
PORTUGUESE_LANGUAGE_PRIORITY=true
COMMUNITY_CHAT_ENABLED=true
```

See [.env.production.example](./.env.production.example) for complete configuration.

### Scaling Configuration

**Development (10-50 concurrent streams):**
- 2 CPU cores, 4GB RAM
- Local storage
- Single server deployment

**Production (100-1000 concurrent streams):**
- 4+ CPU cores, 8GB+ RAM
- Network storage (NFS/Block)
- Load balancer + multiple servers
- CDN integration

## Portuguese Community Features

### Cultural Optimization

- **Regional Content Priority** - Portugal, Brazil, Africa, Diaspora
- **Language Detection** - Automatic Portuguese content boosting
- **Cultural Events Integration** - Carnival, Festa Junina, etc.
- **Regional Moderation** - Portuguese-speaking moderators

### Community Tools

- **Portuguese Emotes** - Cultural expressions and slang
- **Regional Chat Channels** - Brazil ” Portugal ” Diaspora
- **Community Safety** - Portuguese language toxicity detection
- **Creator Support** - Portuguese-language documentation

## API Endpoints

### Streaming Management

```bash
# Stream status
GET /api/v1/streams

# Start stream
POST /api/v1/streams/start
{
  "stream_key": "user_stream_key",
  "title": "Live from London",
  "category": "portuguese-culture"
}

# Stream statistics
GET /api/v1/streams/{stream_id}/stats

# Health check
GET /health
```

### Authentication

All API endpoints require authentication via:
- JWT tokens for user actions
- Stream keys for RTMP publishing
- API keys for management operations

## Monitoring & Analytics

### Health Checks

- **SRS Server** - RTMP/WebRTC service status
- **Nginx Proxy** - Load balancer health
- **Redis Cache** - Real-time data availability
- **Database** - Analytics database connectivity

### Metrics Collected

- **Stream Performance** - Bitrate, latency, viewer count
- **Portuguese Community** - Regional engagement metrics
- **Technical Metrics** - CPU, memory, network usage
- **Business Metrics** - Creator retention, watch time

### Grafana Dashboards

- Portuguese Community Engagement
- Streaming Infrastructure Health
- Creator Performance Analytics
- Regional Content Distribution

## Security

### Production Security Features

- **SSL/TLS Encryption** - All traffic encrypted
- **Stream Authentication** - Secure RTMP publishing
- **Rate Limiting** - DDoS protection
- **CORS Policy** - Cross-origin access control
- **Content Moderation** - Portuguese language filtering

### Access Control

- **Creator Authentication** - Verified Portuguese community members
- **Viewer Permissions** - Premium content gating
- **Admin Controls** - Community management tools
- **API Security** - Token-based authentication

## Deployment Options

### Docker Compose (Development)

```bash
cd docker-compose
docker-compose up -d
```

### Docker Swarm (Production)

```bash
docker stack deploy --compose-file docker-compose.prod.yml lusotown-streaming
```

### Kubernetes (Enterprise)

Kubernetes deployment manifests coming in Phase 2.

## CDN Integration

### BunnyCDN Setup

1. **Create Storage Zone**
   - Region: Europe (London optimization)
   - Name: `lusotown-streaming`

2. **Configure Pull Zone**
   - Origin: `https://stream.lusotown.com`
   - Geographic regions: Europe, Americas

3. **Environment Configuration**
   ```env
   CDN_ENDPOINT=https://lusotown-streaming.b-cdn.net
   BUNNYCDN_API_KEY=your_api_key
   BUNNYCDN_STORAGE_ZONE=lusotown-streaming
   ```

### Performance Optimization

- **European Edge Locations** - Portugal, UK, Germany
- **Smart Routing** - Automatic best-path selection
- **Compression** - Gzip/Brotli for Portuguese content
- **Caching** - Optimized for streaming media

## Backup & Disaster Recovery

### Automated Backups

- **Daily Backups** - Stream metadata and configuration
- **Real-time Replication** - Critical streaming data
- **S3 Storage** - EU West (London) region
- **Retention Policy** - 30 days operational, 1 year archive

### Recovery Procedures

1. **Service Recovery** - Automated container restart
2. **Data Recovery** - Point-in-time restoration
3. **Full Disaster Recovery** - Complete infrastructure rebuild
4. **Business Continuity** - Stream failover mechanisms

## Troubleshooting

### Common Issues

**Stream Not Starting:**
```bash
# Check SRS logs
docker logs lusotown-srs-prod

# Verify stream key
curl http://localhost:1985/api/v1/streams/
```

**High Latency:**
```bash
# Check WebRTC status
curl http://localhost:8000/api/v1/candidates/

# Monitor network metrics
./scripts/health-check.sh
```

**CDN Issues:**
```bash
# Test CDN connectivity
curl -I https://your-zone.b-cdn.net/health

# Check origin server
curl -I https://stream.lusotown.com/health
```

### Log Analysis

```bash
# Streaming server logs
tail -f /var/log/lusotown/streaming/srs.log

# Nginx access logs
tail -f /var/log/lusotown/nginx/access.log

# Application logs
docker logs lusotown-srs-prod --follow
```

## Development

### Local Development Setup

1. **Prerequisites**
   - Docker & Docker Compose
   - OBS Studio (for testing)
   - VLC Media Player (for HLS playback)

2. **Environment Setup**
   ```bash
   git clone <repository>
   cd streaming
   ./scripts/deploy-dev.sh
   ```

3. **Testing Streaming**
   - RTMP URL: `rtmp://localhost:1935/live/`
   - Stream Key: `test_stream`
   - Playback: `http://localhost:8080/live/test_stream.m3u8`

### Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/portuguese-feature`)
3. Test with Portuguese community scenarios
4. Submit pull request with Portuguese context

## Support

### Portuguese Community Support

- **Documentation** - Available in Portuguese and English
- **Community Forum** - Portuguese-speaking developers
- **Technical Support** - London timezone (GMT/BST)
- **Cultural Guidance** - Portuguese community advisors

### Professional Support

- **SLA Available** - 99.9% uptime guarantee
- **24/7 Monitoring** - Automated alerting
- **Incident Response** - <15 minute response time
- **Scaling Consultation** - Growth planning

## License

This streaming infrastructure is part of the LusoTown Portuguese Community Platform.

© 2025 LusoTown - Connecting Portuguese Speakers in London & UK

---

**Built with d for the Portuguese community in London & UK**

For more information, visit [lusotown.com](https://lusotown.com) or contact our team at technical@lusotown.com