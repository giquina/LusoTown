# Portuguese Community Rate Limiting Implementation

## Overview

This implementation provides comprehensive API rate limiting specifically designed for the Portuguese-speaking community platform, with bilingual error messages, abuse detection, and cultural context awareness.

## Key Features

### 🏛️ Multi-Tier Rate Limiting
- **Anonymous Users**: More restrictive limits (e.g., 100 requests/hour)
- **Authenticated Users**: Standard limits (e.g., 500 requests/hour) 
- **Premium/Verified Users**: Higher limits (e.g., 1000 requests/hour)

### 🌍 Portuguese Community Context
- Bilingual error messages (English/Portuguese)
- Cultural endpoint awareness (business directory, events, matching)
- Higher limits for cultural discovery (events, businesses)
- Stricter limits for community safety (messaging, authentication)

### 🛡️ Advanced Security Features
- Abuse pattern detection (rapid-fire, scraping, credential stuffing)
- IP-based and user-based rate limiting
- Comprehensive logging for security monitoring
- Automatic cleanup of tracking data

### 📊 Monitoring & Analytics
- Real-time rate limiting metrics
- Abuse detection reporting
- Community usage patterns
- Security recommendations

## Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   API Request   │───▶│  Rate Limiting   │───▶│   API Handler   │
│                 │    │   Middleware     │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌──────────────────┐
                       │ Redis / In-Memory│
                       │   Rate Storage   │
                       └──────────────────┘
                              │
                              ▼
                       ┌──────────────────┐
                       │ Abuse Detection  │
                       │ & Monitoring     │
                       └──────────────────┘
```

## Usage Examples

### Basic Rate Limiting

```typescript
import { withRateLimit } from '@/lib/rate-limit-middleware';

export async function GET(request: NextRequest) {
  // Apply rate limiting
  const rateLimitCheck = await withRateLimit(request, 'business-directory');
  
  if (!('success' in rateLimitCheck)) {
    return rateLimitCheck; // Returns rate limit exceeded response
  }
  
  // Your API logic here
  const response = NextResponse.json({ data: 'success' });
  
  // Add rate limit headers
  rateLimitCheck.headers.forEach((value, key) => {
    response.headers.set(key, value);
  });
  
  return response;
}
```

### Custom Rate Limits

```typescript
// More restrictive limits for sensitive operations
const rateLimitCheck = await withRateLimit(request, 'business-directory', {
  customLimits: {
    maxRequests: 5,
    windowMs: 60 * 60 * 1000 // 1 hour
  }
});
```

### Middleware Wrapper

```typescript
import { createRateLimitMiddleware } from '@/lib/rate-limit-middleware';

const handler = createRateLimitMiddleware('community-messaging');

export const POST = handler(async (request: NextRequest) => {
  // Your handler logic - rate limiting is automatically applied
  return NextResponse.json({ message: 'Success' });
});
```

### Decorator Pattern

```typescript
import { withPortugueseCommunityRateLimit } from '@/lib/rate-limit-middleware';

export class EventsController {
  @withPortugueseCommunityRateLimit('events')
  async createEvent(request: NextRequest) {
    // Rate limiting is automatically applied with Portuguese community context
  }
}
```

## Rate Limit Configurations

### Anonymous Users (per hour)
- **Business Directory**: 50 requests
- **Events**: 30 requests
- **Community Messaging**: 5 requests
- **Cultural Matching**: 10 requests
- **Authentication**: 10 requests
- **General API**: 100 requests

### Authenticated Users (per hour)
- **Business Directory**: 200 requests
- **Events**: 100 requests
- **Community Messaging**: 50 requests
- **Cultural Matching**: 60 requests
- **Authentication**: 30 requests
- **General API**: 500 requests

### Premium Users (per hour)
- **Business Directory**: 500 requests
- **Events**: 300 requests
- **Community Messaging**: 150 requests
- **Cultural Matching**: 200 requests
- **Authentication**: 50 requests
- **General API**: 1000 requests

## Error Response Format

```json
{
  "error": "Muitos pedidos ao diretório de negócios. Tente novamente em alguns minutos para ajudar a proteger a nossa comunidade empresarial portuguesa.",
  "code": "RATE_LIMIT_EXCEEDED",
  "context": "portuguese-community",
  "details": {
    "limit": 50,
    "resetTime": "2025-08-30T20:00:00Z",
    "retryAfter": 3600,
    "userTier": "anonymous",
    "upgradeMessage": "Considere criar uma conta para limites mais altos"
  }
}
```

## Response Headers

- `X-RateLimit-Limit`: Maximum requests allowed
- `X-RateLimit-Remaining`: Requests remaining in current window
- `X-RateLimit-Reset`: Unix timestamp when limits reset
- `X-RateLimit-Context`: Always "portuguese-community"
- `X-User-Tier`: User's rate limiting tier
- `Retry-After`: Seconds to wait before retrying (on 429 responses)

## Abuse Detection

### Pattern Types
- **Rapid Fire**: Multiple quick requests from same source
- **Credential Stuffing**: Authentication endpoint abuse
- **Scraping**: Business directory data extraction
- **Spam**: Community messaging abuse
- **Distributed**: Coordinated attack patterns

### Severity Levels
- **Low**: Initial violations, monitoring only
- **Medium**: Repeated violations, increased logging
- **High**: Serious violations, potential temporary restrictions
- **Critical**: Severe abuse, immediate security team notification

### Thresholds
- **Anonymous Users**: Stricter thresholds (70% of authenticated limits)
- **Users with Warnings**: Much stricter (50% of normal limits)
- **Critical Endpoints**: Lower violation tolerance (5 vs 10 violations)

## Monitoring Endpoints

### Get Rate Limit Status
```bash
GET /api/test-rate-limit?action=status&type=business-directory
```

### Get Security Statistics
```bash
GET /api/test-rate-limit?action=stats
```

### Admin Monitoring Dashboard
```bash
GET /api/monitoring/rate-limits
```

### Manual Cleanup (Admin Only)
```bash
POST /api/monitoring/rate-limits
Content-Type: application/json

{
  "action": "cleanup_abuse_data"
}
```

## Testing

### Basic Rate Limit Test
```bash
# Test general rate limiting
curl "http://localhost:3000/api/test-rate-limit"

# Test specific endpoint
curl "http://localhost:3000/api/test-rate-limit?type=business-directory"

# Check current status
curl "http://localhost:3000/api/test-rate-limit?action=status&type=events"

# View security stats
curl "http://localhost:3000/api/test-rate-limit?action=stats"
```

### Load Testing
```bash
# Quick succession requests to trigger rate limiting
for i in {1..20}; do
  curl "http://localhost:3000/api/test-rate-limit"
  sleep 0.1
done
```

### Portuguese Language Testing
```bash
# Test with Portuguese language preference
curl -H "Accept-Language: pt-PT" "http://localhost:3000/api/test-rate-limit"
curl -H "X-Language-Preference: pt" "http://localhost:3000/api/test-rate-limit"
```

## Production Deployment

### Environment Variables
```env
# Redis Configuration (Production)
REDIS_URL=redis://your-redis-instance:6379
REDIS_PASSWORD=your-redis-password

# Upstash Configuration (Alternative)
UPSTASH_REDIS_REST_URL=https://your-upstash-instance.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-upstash-token

# Monitoring
SENTRY_DSN=https://your-sentry-dsn@sentry.io/project
```

### Production Considerations
1. **Redis Setup**: Use persistent Redis instance (not in-memory fallback)
2. **Monitoring**: Enable Sentry for abuse detection alerts
3. **Logging**: Ensure proper log aggregation for security analysis
4. **Trusted Partners**: Configure IP allowlists for Portuguese community partners
5. **Geographic Distribution**: Consider CDN-aware rate limiting
6. **Backup Systems**: Implement graceful degradation if Redis fails

## Security Best Practices

### Data Protection
- IP addresses are masked in logs (`192.168.1.*** vs 192.168.1.100`)
- User identifiers are partially obscured (`user:abc1***`)
- No sensitive data stored in rate limiting cache

### Community Safety
- Stricter limits on messaging to prevent spam
- Business directory protection against scraping
- Authentication endpoint protection against brute force
- Progressive restrictions for users with community violations

### Monitoring Integration
- Real-time alerts for critical abuse patterns
- Daily security reports for community moderators
- Integration with existing Portuguese community moderation tools

## Maintenance

### Regular Tasks
- **Daily**: Review abuse detection reports
- **Weekly**: Analyze rate limiting effectiveness
- **Monthly**: Update thresholds based on community growth
- **Quarterly**: Security audit and pattern analysis

### Cleanup Commands
```typescript
// Manual cleanup (can be scheduled)
import { cleanupAbuseData } from '@/lib/rate-limit-middleware';

// Run daily cleanup
cleanupAbuseData();
```

## Performance Impact

### Optimizations
- Redis operations are atomic and fast (~1ms per request)
- In-memory fallback for development (no external dependencies)
- Efficient abuse pattern detection (O(1) lookup)
- Minimal overhead per request (~2-5ms added latency)

### Scaling Considerations
- Redis scales to millions of operations per second
- Horizontal scaling through Redis clustering
- Geographic distribution through Redis instances per region
- Rate limiting data has automatic TTL cleanup

## Support & Troubleshooting

### Common Issues
1. **High Memory Usage**: Check abuse pattern cleanup frequency
2. **False Positives**: Review rate limit thresholds for community usage
3. **Redis Connection**: Verify Redis credentials and network connectivity
4. **Language Detection**: Ensure proper Accept-Language headers

### Debug Mode
```typescript
// Enable detailed logging
process.env.RATE_LIMIT_DEBUG = 'true';
```

This implementation provides enterprise-grade rate limiting with Portuguese community cultural context, ensuring platform security while maintaining excellent user experience for the Portuguese-speaking community in the UK.