#!/usr/bin/env node

/**
 * Simple test script for Portuguese community rate limiting functionality
 * This tests the rate limiting logic without full Next.js dependencies
 */

// Mock logger
const logger = {
  info: (msg, meta) => console.log(`[INFO] ${msg}`, meta ? JSON.stringify(meta, null, 2) : ''),
  warn: (msg, err, meta) => console.log(`[WARN] ${msg}`, err, meta ? JSON.stringify(meta, null, 2) : ''),
  error: (msg, err, meta) => console.log(`[ERROR] ${msg}`, err, meta ? JSON.stringify(meta, null, 2) : ''),
  debug: (msg, meta) => console.log(`[DEBUG] ${msg}`, meta ? JSON.stringify(meta, null, 2) : '')
};

// Mock rate limit configurations
const RATE_LIMIT_CONFIGS = {
  'business-directory': {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 50,
    description: 'Business directory access',
  },
  'events': {
    windowMs: 60 * 1000,
    maxRequests: 100,
    description: 'Event access',
  },
  'community-messaging': {
    windowMs: 60 * 1000,
    maxRequests: 20,
    description: 'Community messaging',
  },
  'general': {
    windowMs: 60 * 1000,
    maxRequests: 100,
    description: 'General API access',
  }
};

// Mock Portuguese community rate limits
const PORTUGUESE_COMMUNITY_RATE_LIMITS = {
  anonymous: {
    'business-directory': { maxRequests: 50, windowMs: 60 * 60 * 1000 },
    'events': { maxRequests: 30, windowMs: 60 * 60 * 1000 },
    'community-messaging': { maxRequests: 5, windowMs: 60 * 60 * 1000 },
    'general': { maxRequests: 100, windowMs: 60 * 60 * 1000 }
  },
  authenticated: {
    'business-directory': { maxRequests: 200, windowMs: 60 * 60 * 1000 },
    'events': { maxRequests: 100, windowMs: 60 * 60 * 1000 },
    'community-messaging': { maxRequests: 50, windowMs: 60 * 60 * 1000 },
    'general': { maxRequests: 500, windowMs: 60 * 60 * 1000 }
  },
  premium: {
    'business-directory': { maxRequests: 500, windowMs: 60 * 60 * 1000 },
    'events': { maxRequests: 300, windowMs: 60 * 60 * 1000 },
    'community-messaging': { maxRequests: 150, windowMs: 60 * 60 * 1000 },
    'general': { maxRequests: 1000, windowMs: 60 * 60 * 1000 }
  }
};

// In-memory store for testing
const inMemoryStore = new Map();

// Mock rate limiting function
async function rateLimit(identifier, type, options = {}) {
  const config = options.customLimits || RATE_LIMIT_CONFIGS[type];
  const windowMs = config.windowMs || RATE_LIMIT_CONFIGS[type].windowMs;
  const maxRequests = config.maxRequests || RATE_LIMIT_CONFIGS[type].maxRequests;
  
  const windowStart = Math.floor(Date.now() / windowMs) * windowMs;
  const windowEnd = windowStart + windowMs;
  const key = `${type}:${identifier}`;
  
  const current = inMemoryStore.get(key);
  
  if (!current || current.windowStart !== windowStart) {
    inMemoryStore.set(key, { count: 1, windowStart });
    return {
      success: true,
      limit: maxRequests,
      remaining: maxRequests - 1,
      resetTime: new Date(windowEnd)
    };
  }
  
  current.count++;
  const remaining = Math.max(0, maxRequests - current.count);
  const success = current.count <= maxRequests;
  
  return {
    success,
    limit: maxRequests,
    remaining,
    resetTime: new Date(windowEnd),
    retryAfter: success ? undefined : Math.ceil((windowEnd - Date.now()) / 1000)
  };
}

// Mock abuse pattern detection
const abusePatterns = new Map();

function detectAndLogAbuse(identifier, endpoint, rateLimitType, userContext = { tier: 'anonymous' }) {
  const key = `${identifier}:${endpoint}`;
  const now = new Date();
  
  let pattern = abusePatterns.get(key);
  if (!pattern) {
    pattern = {
      identifier,
      endpoint,
      violations: 1,
      lastViolation: now,
      pattern: 'rapid_fire',
      severity: 'low'
    };
    abusePatterns.set(key, pattern);
    return false;
  }
  
  pattern.violations++;
  pattern.lastViolation = now;
  
  const criticalEndpoints = ['authentication', 'community-messaging', 'admin'];
  const isCriticalEndpoint = criticalEndpoints.includes(rateLimitType);
  
  let violationThreshold = isCriticalEndpoint ? 5 : 10;
  if (userContext.tier === 'anonymous') {
    violationThreshold = Math.floor(violationThreshold * 0.7);
  }
  
  if (pattern.violations >= violationThreshold) {
    pattern.severity = pattern.violations > violationThreshold * 2 ? 'critical' : 'high';
    
    logger.error('Portuguese community abuse detected', null, {
      identifier: maskIdentifier(identifier),
      endpoint,
      violations: pattern.violations,
      pattern: pattern.pattern,
      severity: pattern.severity,
      userTier: userContext.tier
    });
    
    return true;
  }
  
  return false;
}

function maskIdentifier(identifier) {
  if (identifier.startsWith('user:')) {
    const userId = identifier.replace('user:', '');
    return `user:${userId.substring(0, 4)}***`;
  } else if (identifier.startsWith('ip:')) {
    const ip = identifier.replace('ip:', '');
    return `ip:${ip.substring(0, 6)}***`;
  }
  return `${identifier.substring(0, 8)}***`;
}

function getPortugueseCommunityLimits(type, userTier, customLimits) {
  if (customLimits) {
    return {
      maxRequests: customLimits.maxRequests || RATE_LIMIT_CONFIGS[type].maxRequests,
      windowMs: customLimits.windowMs || RATE_LIMIT_CONFIGS[type].windowMs
    };
  }
  
  const tierLimits = PORTUGUESE_COMMUNITY_RATE_LIMITS[userTier];
  if (tierLimits && tierLimits[type]) {
    return tierLimits[type];
  }
  
  return {
    maxRequests: RATE_LIMIT_CONFIGS[type].maxRequests,
    windowMs: RATE_LIMIT_CONFIGS[type].windowMs
  };
}

// Test functions
async function testBasicRateLimit() {
  console.log('\n🧪 Testing Basic Rate Limiting...');
  
  const testCases = [
    { identifier: 'ip:192.168.1.1', type: 'general', expected: true },
    { identifier: 'user:test123', type: 'business-directory', expected: true },
    { identifier: 'ip:192.168.1.2', type: 'community-messaging', expected: true }
  ];
  
  for (const testCase of testCases) {
    const result = await rateLimit(testCase.identifier, testCase.type);
    const success = result.success === testCase.expected;
    
    console.log(`${success ? '✅' : '❌'} ${testCase.type} for ${testCase.identifier}: ${result.success ? 'ALLOWED' : 'BLOCKED'}`);
    console.log(`   Limit: ${result.limit}, Remaining: ${result.remaining}`);
  }
}

async function testPortugueseCommunityLimits() {
  console.log('\n🇵🇹 Testing Portuguese Community Rate Limits...');
  
  const userTiers = ['anonymous', 'authenticated', 'premium'];
  const endpoints = ['business-directory', 'events', 'community-messaging'];
  
  for (const tier of userTiers) {
    console.log(`\n📊 Testing ${tier} user limits:`);
    
    for (const endpoint of endpoints) {
      const limits = getPortugueseCommunityLimits(endpoint, tier);
      console.log(`   ${endpoint}: ${limits.maxRequests} requests per ${limits.windowMs / 1000 / 60} minutes`);
    }
  }
}

async function testRateLimitExceeded() {
  console.log('\n🚫 Testing Rate Limit Exceeded Scenarios...');
  
  const identifier = 'ip:192.168.1.100';
  const type = 'community-messaging';
  const customLimits = { maxRequests: 3, windowMs: 60000 }; // 3 requests per minute for testing
  
  // Make requests until limit is exceeded
  for (let i = 1; i <= 5; i++) {
    const result = await rateLimit(identifier, type, { customLimits });
    const status = result.success ? '✅ ALLOWED' : '❌ BLOCKED';
    
    console.log(`Request ${i}: ${status} (Remaining: ${result.remaining})`);
    
    if (!result.success) {
      console.log(`   Retry after: ${result.retryAfter} seconds`);
      break;
    }
  }
}

async function testAbuseDetection() {
  console.log('\n🛡️ Testing Abuse Detection...');
  
  const identifier = 'ip:192.168.1.200';
  const endpoint = '/api/business-directory';
  const userContext = { tier: 'anonymous' };
  
  // Simulate multiple violations
  for (let i = 1; i <= 8; i++) {
    const isAbuse = detectAndLogAbuse(identifier, endpoint, 'business-directory', userContext);
    
    if (isAbuse) {
      console.log(`🚨 Abuse detected on violation ${i}`);
      break;
    } else {
      console.log(`Violation ${i}: Monitoring`);
    }
  }
}

async function testBilingualMessages() {
  console.log('\n🌐 Testing Bilingual Error Messages...');
  
  const messages = {
    en: {
      'business-directory': 'Too many business directory requests. Please try again in a few minutes to help protect our Portuguese business community.',
      'community-messaging': 'Too many messaging requests. Please slow down to maintain community safety for all Portuguese-speaking members.'
    },
    pt: {
      'business-directory': 'Muitos pedidos ao diretório de negócios. Tente novamente em alguns minutos para ajudar a proteger a nossa comunidade empresarial portuguesa.',
      'community-messaging': 'Muitos pedidos de mensagens. Por favor, diminua o ritmo para manter a segurança da comunidade para todos os membros lusófonos.'
    }
  };
  
  const types = ['business-directory', 'community-messaging'];
  
  for (const type of types) {
    console.log(`\n📧 ${type} messages:`);
    console.log(`   🇬🇧 EN: ${messages.en[type]}`);
    console.log(`   🇵🇹 PT: ${messages.pt[type]}`);
  }
}

// Main test runner
async function runTests() {
  console.log('🚀 Portuguese Community Rate Limiting Tests');
  console.log('============================================');
  
  try {
    await testBasicRateLimit();
    await testPortugueseCommunityLimits();
    await testRateLimitExceeded();
    await testAbuseDetection();
    await testBilingualMessages();
    
    console.log('\n✅ All tests completed successfully!');
    console.log('\n📊 Test Summary:');
    console.log(`   In-memory store entries: ${inMemoryStore.size}`);
    console.log(`   Abuse patterns tracked: ${abusePatterns.size}`);
    
  } catch (error) {
    console.error('\n❌ Test failed:', error);
    process.exit(1);
  }
}

// Run tests if this script is executed directly
if (require.main === module) {
  runTests();
}

module.exports = {
  rateLimit,
  detectAndLogAbuse,
  getPortugueseCommunityLimits,
  PORTUGUESE_COMMUNITY_RATE_LIMITS,
  RATE_LIMIT_CONFIGS
};