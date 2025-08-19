# LusoTown Portuguese Community CDN Configuration

## BunnyCDN Integration for Portuguese Content Delivery

### Pull Zone Configuration
```yaml
Origin Server: https://stream.lusotown.com
Edge Locations:
  - London (UK) - Primary for Portuguese community
  - Lisbon (Portugal) - Secondary
  - São Paulo (Brazil) - Portuguese speakers
  - Luanda (Angola) - African Portuguese communities

Caching Rules:
  - HLS Segments (.ts): 3600 seconds
  - HLS Playlists (.m3u8): 30 seconds
  - Portuguese Cultural Images: 86400 seconds
  - API Responses: No cache

Portuguese Market Optimization:
  - Bandwidth Limiting: Adaptive for mobile users
  - Portuguese Content Priority: Cultural streams boosted
  - Geographic Routing: Automatic best-path selection
```

### Storage Zone for Portuguese Content
```yaml
Zone Name: lusotown-portuguese-content
Region: Europe (London)
Replication: 3 geographic regions
Content Types:
  - Live streaming segments
  - Portuguese cultural recordings
  - Community event archives
  - Creator uploaded content
```

### Performance Metrics for Portuguese Community
- Target Latency: <2 seconds for UK Portuguese community
- Bandwidth Optimization: Mobile-first for Portuguese users
- Cultural Content Boost: 40% faster delivery for Portuguese categories
- Regional Failover: Automatic routing to nearest Portuguese-optimized edge
