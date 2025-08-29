# Portuguese Community API Rate Limiting System

## Overview

This comprehensive rate limiting system protects LusoTown's Portuguese community endpoints from abuse while maintaining excellent user experience. The system includes Redis-based rate limiting, abuse detection, bilingual error messages, and Sentry monitoring integration.

## Features

### ✅ **Implemented Features**

1. **Redis-Based Rate Limiting**: Production-ready with Upstash/Railway Redis support
2. **Endpoint-Specific Limits**: Different limits for different community features
3. **Bilingual Error Messages**: Portuguese and English error responses
4. **IP and User-Based Rate Limiting**: Flexible identifier strategies
5. **Trusted Partner Bypass**: Whitelist for Portuguese community partners
6. **Abuse Detection**: Pattern recognition for malicious behavior
7. **Sentry Integration**: Real-time monitoring and alerting
8. **Security Dashboard**: Portuguese community security statistics
9. **Development Fallback**: In-memory rate limiting for local development

### 📊 **Rate Limit Configurations**

| Endpoint Type | Requests/Minute | Use Case |
|---------------|-----------------|----------|
| `business-directory` | 50 | Portuguese business listings access |
| `community-messaging` | 20 | Community messaging and chat |
| `event-booking` | 10 | Portuguese cultural event bookings |
| `authentication` | 5 | Login/signup attempts |
| `matching` | 30 | Cultural compatibility matching |
| `transport` | 15 | Transport services coordination |
| `admin` | 10 | Administrative functions |
| `streaming` | 60 | Portuguese content streaming |
| `content` | 80 | Feed and content access |
| `general` | 100 | General API access |

## Quick Start

### 1. Environment Setup

Add to your `.env.local`:

```bash
# Production Redis (choose one)
REDIS_URL=redis://localhost:6379
REDIS_PASSWORD=your_password

# Or Upstash Redis (Serverless)
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_token

# Optional Configuration
RATE_LIMITING_ENABLED=true
TRUSTED_PARTNER_IPS=192.168.1.1,10.0.0.1
```

### 2. Basic Usage in API Routes

```typescript
import { withRateLimit } from '@/lib/rate-limit-middleware';
import { logRateLimitViolation } from '@/lib/rate-limit-monitoring';

export async function GET(request: NextRequest) {
  // Apply rate limiting
  const rateLimitCheck = await withRateLimit(request, 'business-directory');
  
  if (!('success' in rateLimitCheck)) {
    // Log the violation for monitoring
    logRateLimitViolation(
      getClientIP(request),
      'business-directory',
      '/api/business-directory',
      50,
      1
    );
    return rateLimitCheck; // Return rate limit error
  }

  // Your API logic here...
  const response = NextResponse.json({ success: true });
  
  // Add rate limit headers
  rateLimitCheck.headers.forEach((value, key) => {
    response.headers.set(key, value);
  });
  
  return response;
}
```

### 3. Testing Rate Limits

Visit `/api/test-rate-limit` to test the system:

```bash
# Test basic rate limiting
curl http://localhost:3000/api/test-rate-limit

# Test specific endpoint limits
curl http://localhost:3000/api/test-rate-limit?type=business-directory

# Check current rate limit status
curl http://localhost:3000/api/test-rate-limit?action=status

# View security statistics
curl http://localhost:3000/api/test-rate-limit?action=stats
```

## Advanced Features

### Abuse Detection Patterns

The system automatically detects:

1. **Credential Stuffing**: Multiple auth attempts from same IP
2. **Scraping**: Rapid business directory requests
3. **Rapid Fire**: Excessive requests in short timeframes
4. **Distributed Attacks**: Coordinated abuse across endpoints

### Portuguese Community Context

- **Cultural Sensitivity**: Error messages respect Portuguese-speaking community
- **Regional Support**: Handles Portuguese, Brazilian, and PALOP users
- **Community Partners**: Bypass mechanisms for trusted organizations
- **UK Context**: Optimized for Portuguese community in United Kingdom

### Bilingual Error Messages

```typescript
// English
"Too many business directory requests. Please try again in a few minutes."

// Portuguese
"Muitos pedidos ao diretório de negócios. Tente novamente em alguns minutos."
```

Language detection based on:
- `Accept-Language` header
- `x-language-preference` custom header
- User profile preferences

## Monitoring & Alerting

### Sentry Integration

```typescript
import { logRateLimitViolation, detectAndLogAbuse } from '@/lib/rate-limit-monitoring';

// Log rate limit violations
logRateLimitViolation(identifier, type, endpoint, limit, violations);

// Detect and log abuse patterns
const isAbuse = detectAndLogAbuse(identifier, endpoint, type, violations, timeWindow);
```

### Security Dashboard

Access Portuguese community security statistics:

```typescript
import { getPortugueseCommunitySecurityStats } from '@/lib/rate-limit-monitoring';

const stats = getPortugueseCommunitySecurityStats();
// Returns: rate limiting stats, abuse events, top offenders
```

## Production Deployment

### Redis Configuration

**Option 1: Upstash (Recommended)**
```bash
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_token
```

**Option 2: Railway Redis**
```bash
REDIS_URL=redis://default:password@redis.railway.internal:6379
```

**Option 3: Self-hosted Redis**
```bash
REDIS_URL=redis://your-redis-server:6379
REDIS_PASSWORD=your_secure_password
```

### Trusted Partner Configuration

Add trusted Portuguese community partner IPs:

```bash
TRUSTED_PARTNER_IPS=192.168.1.100,10.0.0.50,172.16.0.25
```

Partners that might need bypass:
- Portuguese Chamber of Commerce
- University partnerships (UCL, King's, Imperial, etc.)
- Community organizations
- Verified business directories

## Error Handling

### Rate Limit Response Format

```json
{
  "error": "Too many requests. Please slow down.",
  "code": "RATE_LIMIT_EXCEEDED",
  "details": {
    "limit": 50,
    "resetTime": "2025-01-15T10:30:00Z",
    "retryAfter": 45
  }
}
```

### HTTP Headers

```
X-RateLimit-Limit: 50
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1705318200
Retry-After: 45
```

## Security Considerations

### IP Masking
- User IDs: `user:1234***5678`
- IP Addresses: `ip:192.168.***.***`
- Fingerprints: `finger123***`

### Abuse Thresholds
- **Low**: 10+ violations in 5 minutes
- **Medium**: 20+ violations in 10 minutes  
- **High**: 50+ violations in 15 minutes
- **Critical**: 100+ violations in 30 minutes

### Critical Abuse Response
1. Immediate Sentry alert (`fatal` level)
2. Security dashboard notification
3. Temporary IP restriction
4. Community moderator notification

## Development & Testing

### Local Development

The system automatically uses in-memory rate limiting when Redis is not available:

```bash
# No Redis needed for development
npm run dev
```

Warning displayed: `"Redis not configured - using in-memory rate limiting"`

### Testing Scenarios

1. **Normal Usage**: Should pass without issues
2. **Rate Limit Exceeded**: Should return 429 with proper headers
3. **Abuse Detection**: Should trigger alerts and logging
4. **Trusted Partner**: Should bypass rate limits
5. **Bilingual Responses**: Should respect language preferences

### Performance Testing

```bash
# Test with curl
for i in {1..60}; do
  curl -s http://localhost:3000/api/business-directory | grep -o '"remaining":[0-9]*'
  sleep 0.5
done
```

## Maintenance

### Cleanup Tasks

```typescript
import { cleanupRateLimitData } from '@/lib/rate-limit';
import { cleanupAbuseData } from '@/lib/rate-limit-middleware';

// Run periodically (via cron or serverless function)
await cleanupRateLimitData();
cleanupAbuseData();
```

### Monitoring Queries

```typescript
// Get current rate limiting status
const stats = rateLimitMonitor.getRateLimitingStats(3600000); // 1 hour

// Check for abuse patterns
const abuseEvents = stats.abuseEvents;
const topOffenders = stats.topOffenders;
```

## Troubleshooting

### Common Issues

1. **Redis Connection Failed**
   - Check `REDIS_URL` and `REDIS_PASSWORD`
   - Verify network connectivity
   - Falls back to in-memory (dev only)

2. **Rate Limits Too Strict**
   - Adjust `RATE_LIMIT_CONFIGS` in `/src/lib/rate-limit.ts`
   - Add trusted partner IPs
   - Review abuse detection thresholds

3. **Missing Rate Limit Headers**
   - Ensure `rateLimitCheck.headers` are added to responses
   - Check middleware integration

4. **Language Detection Issues**
   - Verify `Accept-Language` header
   - Check custom `x-language-preference` header
   - Review user profile language settings

### Debug Mode

Enable detailed logging:

```bash
DEBUG_RATE_LIMITING=true npm run dev
```

## Contributing

When adding new endpoints:

1. Add to `PORTUGUESE_COMMUNITY_ENDPOINTS` mapping
2. Configure appropriate rate limit type
3. Add bilingual error messages
4. Include abuse detection patterns
5. Update documentation

## Portuguese Community Focus

This system is specifically designed for:
- **750+ Portuguese speakers** across UK
- **2,150+ university students** in Portuguese community
- **8 university partnerships** requiring reliable access
- **Cultural authenticity** in error messaging and monitoring
- **Community safety** through abuse detection and prevention

The rate limiting system ensures platform stability while maintaining the excellent user experience that Portuguese-speaking community members expect from LusoTown.