/**
 * LusoTown Portuguese-Speaking Community Platform Logger
 * 
 * Centralized logging system with Portuguese cultural context awareness
 * Optimized for Vercel deployment - simple console-based approach
 * 
 * Features:
 * - Portuguese cultural context flags
 * - Platform area categorization
 * - Environment-based logging levels
 * - Structured logging with timestamps and severity levels
 * - Replaces all console.log statements across 287+ usage points
 */

// Portuguese Cultural Context Types
export type CulturalContext = 
  | 'portuguese' // Portugal-specific events/users
  | 'brazilian'  // Brazil-specific content
  | 'angolan'    // Angola (PALOP) community events
  | 'cape_verdean' // Cape Verde cultural activities
  | 'mozambican' // Mozambique community features
  | 'guinea_bissau' // Guinea-Bissau cultural events
  | 'sao_tome'   // São Tomé & Príncipe events
  | 'east_timorese' // East Timor community content
  | 'palop'      // General African Portuguese-speaking countries
  | 'lusophone'  // All Portuguese-speaking communities
  | 'multicultural'; // Mixed Portuguese-speaking heritage events

// Platform Area Types
export type PlatformArea = 
  | 'matching'     // Cultural compatibility matching system
  | 'events'       // Community events and cultural activities
  | 'business'     // Portuguese-speaking business directory
  | 'ai'           // AI systems (LusoBot, matching, notifications)
  | 'aiSystem'     // Legacy alias for ai
  | 'auth'         // Authentication and user management
  | 'payments'     // Subscription and payment processing
  | 'messaging'    // Community chat and communication
  | 'streaming'    // Cultural content streaming
  | 'mobile'       // Mobile app and responsive features
  | 'admin'        // Administrative functions
  | 'performance'  // Performance monitoring and optimization
  | 'security'     // Security and privacy features
  | 'cultural'     // Cultural heritage and authenticity
  | 'community'    // General community features
  | 'geo'          // Geolocation and PostGIS features
  | 'seo'          // SEO and content optimization
  | 'analytics';   // Usage analytics and metrics

// Logging metadata interface
export interface LogMeta {
  userId?: string;
  sessionId?: string;
  area?: PlatformArea;
  culturalContext?: CulturalContext;
  action?: string;
  duration?: number;
  errorCode?: string;
  businessId?: string;
  eventId?: string;
  matchId?: string;
  deviceType?: 'mobile' | 'tablet' | 'desktop';
  userAgent?: string;
  ipAddress?: string;
  timestamp?: Date;
  eventType?: 'cultural' | 'business' | 'social' | 'educational';
  lusophoneCountries?: string[];
  metadata?: any; // Generic metadata for structured logging
  migratedFrom?: string; // For tracking migrated console.log statements
  migratedAt?: string; // Timestamp of migration
  error?: any; // Error object for error logging
}

class LusoTownLogger {
  private isDevelopment: boolean;
  private isDebugEnabled: boolean;

  constructor() {
    this.isDevelopment = process.env.NODE_ENV !== 'production';
    this.isDebugEnabled = this.isDevelopment || Boolean(
      typeof window !== 'undefined' && (window as any).LUSOTOWN_DEBUG
    );
  }

  // Portuguese Cultural Context Icons
  private getCulturalFlag(context?: CulturalContext): string {
    if (!context) return '';
    
    const flags = {
      portuguese: '🇵🇹',
      brazilian: '🇧🇷',
      angolan: '🇦🇴',
      cape_verdean: '🇨🇻',
      mozambican: '🇲🇿',
      guinea_bissau: '🇬🇼',
      sao_tome: '🇸🇹',
      east_timorese: '🇹🇱',
      palop: '🌍',
      lusophone: '🌎',
      multicultural: '🌈'
    };

    return flags[context] || '';
  }

  // Platform Area Icons
  private getAreaIcon(area?: PlatformArea): string {
    if (!area) return '';

    const icons = {
      matching: '💝',
      events: '🎉',
      business: '🏪',
      ai: '🤖',
      aiSystem: '🤖', // Legacy alias for ai
      auth: '🔐',
      payments: '💳',
      messaging: '💬',
      streaming: '📺',
      mobile: '📱',
      admin: '⚙️',
      performance: '📊',
      security: '🛡️',
      cultural: '🎭',
      community: '👥', // General community features
      geo: '📍',
      seo: '🔍',
      analytics: '📈'
    };

    return icons[area] || '';
  }

  // Core logging methods - Simple console-based for Vercel compatibility
  debug(message: string, meta: LogMeta = {}) {
    if (!this.isDebugEnabled) return;
    const culturalFlag = this.getCulturalFlag(meta.culturalContext);
    const areaIcon = this.getAreaIcon(meta.area);
    console.debug(`🐛 ${areaIcon}${culturalFlag} ${message}`, meta);
  }

  info(message: string, meta: LogMeta = {}) {
    const culturalFlag = this.getCulturalFlag(meta.culturalContext);
    const areaIcon = this.getAreaIcon(meta.area);
    console.info(`ℹ️ ${areaIcon}${culturalFlag} ${message}`, meta);
  }

  warn(message: string, meta: LogMeta = {}) {
    const culturalFlag = this.getCulturalFlag(meta.culturalContext);
    const areaIcon = this.getAreaIcon(meta.area);
    console.warn(`⚠️ ${areaIcon}${culturalFlag} ${message}`, meta);
  }

  error(message: string, error?: Error | any, meta: LogMeta = {}) {
    const culturalFlag = this.getCulturalFlag(meta.culturalContext);
    const areaIcon = this.getAreaIcon(meta.area);
    const errorMeta = error instanceof Error ? {
      name: error.name,
      message: error.message,
      stack: error.stack,
      ...meta
    } : { error, ...meta };
    
    console.error(`❌ ${areaIcon}${culturalFlag} ${message}`, errorMeta);
  }

  // Portuguese Cultural Specific Logging Methods
  
  culturalEvent(eventName: string, culturalContext: CulturalContext, meta: LogMeta = {}) {
    this.info(`Cultural Event: ${eventName}`, { 
      ...meta, 
      culturalContext,
      area: 'events',
      eventType: 'cultural'
    });
  }

  businessInteraction(businessName: string, action: string, meta: LogMeta = {}) {
    this.info(`Business Interaction: ${businessName} - ${action}`, {
      ...meta,
      area: 'business',
      action
    });
  }

  matchingActivity(matchType: string, userId: string, meta: LogMeta = {}) {
    this.debug(`Matching Activity: ${matchType}`, {
      ...meta,
      userId,
      area: 'matching',
      action: matchType
    });
  }

  aiSystemActivity(systemName: string, activity: string, meta: LogMeta = {}) {
    this.debug(`AI System: ${systemName} - ${activity}`, {
      ...meta,
      area: 'ai',
      action: activity
    });
  }

  performanceMetric(metricName: string, value: number, unit: string, meta: LogMeta = {}) {
    this.info(`Performance Metric: ${metricName} = ${value}${unit}`, {
      ...meta,
      area: 'performance',
      duration: value
    });
  }

  authenticationEvent(event: string, userId?: string, meta: LogMeta = {}) {
    this.info(`Authentication: ${event}`, {
      ...meta,
      userId,
      area: 'auth',
      action: event
    });
  }

  // Heritage Respect Protocol Logging
  heritageRespectViolation(violation: string, details: string, meta: LogMeta = {}) {
    this.warn(`Heritage Respect Protocol Violation: ${violation} - ${details}`, {
      ...meta,
      area: 'cultural',
      action: 'heritage_violation'
    });
  }

  lusophoneCommunityEngagement(community: CulturalContext, engagement: string, meta: LogMeta = {}) {
    this.info(`Lusophone Community Engagement: ${community} - ${engagement}`, {
      ...meta,
      culturalContext: community,
      area: 'cultural',
      action: 'community_engagement'
    });
  }
}

// Global logger instance
const logger = new LusoTownLogger();

export default logger;
// Also export as a named export for modules importing `{ logger }`
export { logger };

// Named exports for common logging patterns
export const logCulturalEvent = (eventName: string, culturalContext: CulturalContext, meta?: LogMeta) => 
  logger.culturalEvent(eventName, culturalContext, meta);

export const logBusinessInteraction = (businessName: string, action: string, meta?: LogMeta) => 
  logger.businessInteraction(businessName, action, meta);

export const logMatchingActivity = (matchType: string, userId: string, meta?: LogMeta) => 
  logger.matchingActivity(matchType, userId, meta);

export const logAISystemActivity = (systemName: string, activity: string, meta?: LogMeta) => 
  logger.aiSystemActivity(systemName, activity, meta);

export const logPerformanceMetric = (metricName: string, value: number, unit: string, meta?: LogMeta) => 
  logger.performanceMetric(metricName, value, unit, meta);

export const logAuthenticationEvent = (event: string, userId?: string, meta?: LogMeta) => 
  logger.authenticationEvent(event, userId, meta);