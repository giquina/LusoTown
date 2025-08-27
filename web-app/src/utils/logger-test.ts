/**
 * Simple test for LusoTown Centralized Logging System
 * This file can be run to verify the logger is working correctly
 */

import logger from './logger';

// Test basic logging
console.log('🧪 Testing LusoTown Centralized Logging System...\n');

// Test area-specific logging
logger.auth.info('Test: Portuguese community member login', { 
  userId: 'test-user-123', 
  culturalContext: 'portuguese' 
});

logger.businessAction.info('Test: Brazilian business directory search', { 
  businessId: 'test-biz-456', 
  culturalContext: 'brazilian' 
});

logger.aiSystem.info('Test: LusoBot cultural response generated', { 
  aiService: 'lusobot', 
  culturalContext: 'lusophone' 
});

logger.mobile.info('Test: PWA install prompt for PALOP community', { 
  deviceType: 'android', 
  culturalContext: 'palop' 
});

logger.culturalEvent.info('Test: Mixed Portuguese cultural event created', { 
  eventId: 'test-event-789', 
  culturalContext: 'mixed' 
});

// Test error logging
try {
  throw new Error('Test error for logging system');
} catch (error) {
  logger.matchingActivity.error('Test: AI matching system error', { 
    error, 
    culturalContext: 'lusophone',
    metadata: { testScenario: 'error-handling' }
  });
}

// Test performance monitoring
const startTime = logger.performance.start('Portuguese cultural content loading');
setTimeout(() => {
  logger.performance.end('Portuguese cultural content loading', startTime, {
    contentType: 'cultural-articles',
    culturalContext: 'portuguese'
  });
}, 50);

// Test cultural context helpers
logger.cultural.portuguese('info', 'culturalEvent', 'Test: Portuguese heritage event accessed');
logger.cultural.brazilian('info', 'businessAction', 'Test: Brazilian business profile viewed');
logger.cultural.palop('info', 'auth', 'Test: Angolan community member registered');

console.log('✅ LusoTown Centralized Logging System test completed!\n');
console.log('Check console output above for structured log entries with Portuguese cultural context.\n');

export default {
  runBasicTest: () => {
    console.log('Running basic logger test...');
    logger.info('Basic test message', { testType: 'basic', timestamp: new Date() });
  },
  
  runCulturalTest: () => {
    console.log('Running cultural context test...');
    logger.cultural.lusophone('info', 'culturalEvent', 'Cultural test message', { testType: 'cultural' });
  },
  
  runPerformanceTest: () => {
    console.log('Running performance test...');
    const start = logger.performance.start('test-operation');
    setTimeout(() => {
      logger.performance.end('test-operation', start, { testType: 'performance' });
    }, 10);
  }
};