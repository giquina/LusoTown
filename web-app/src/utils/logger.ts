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
  deviceType?: string; // Device type for logging
  userAgent?: string;
  ipAddress?: string;
  timestamp?: Date;
  eventType?: 'cultural' | 'business' | 'social' | 'educational';
  lusophoneCountries?: string[];
  metadata?: any; // Generic metadata for structured logging
  migratedFrom?: string; // For tracking migrated console.log statements
  migratedAt?: string; // Timestamp of migration
  error?: any; // Error object for error logging
  
  // API-specific properties
  method?: string;
  query?: any;
  bounds?: any;
  location?: any;
  filters?: any;
  eventCategory?: string;
  conversationId?: string;
  bookingReference?: string;
  bookingId?: string;
  matchType?: string;
  targetUserId?: string;
  preferences?: any;
  email?: string;
  reportId?: string;
  issueType?: string;
  contributionType?: string;
  serviceName?: string;
  urgency?: string;
  
  // Widget and UI-related properties
  widgets?: any;
  widgetsDetected?: any;
  overlaps?: any;
  recommendations?: any;
  
  // Performance and monitoring properties  
  avgResponseTime?: number;
  slowQueriesCount?: number;
  performanceByType?: any;
  testType?: string;     // For test logging
  mobileOptimized?: boolean; // For mobile optimization logging
}

// Platform-specific logger interface
interface PlatformLoggerInterface {
  debug(message: string, meta?: LogMeta): void;
  info(message: string, meta?: LogMeta): void;
  warn(message: string, meta?: LogMeta): void;
  error(message: string, error?: Error | any, meta?: LogMeta): void;
}

// Extended performance logger interface
interface PerformanceLoggerInterface extends PlatformLoggerInterface {
  start(operation: string, meta?: LogMeta): number;
  end(operation: string, startTime: number, meta?: LogMeta): void;
}

// Extended cultural logger interface
interface CulturalLoggerInterface extends PlatformLoggerInterface {
  portuguese(level: string, action: string, message: string, meta?: LogMeta): void;
  brazilian(level: string, action: string, message: string, meta?: LogMeta): void;
  palop(level: string, action: string, message: string, meta?: LogMeta): void;
  mixed(level: string, action: string, message: string, meta?: LogMeta): void;
  lusophone(level: string, action: string, message: string, meta?: LogMeta): void;
}

class LusoTownLogger {
  private isDevelopment: boolean;
  private isDebugEnabled: boolean;

  // Platform area loggers
  public auth: PlatformLoggerInterface;
  public business: PlatformLoggerInterface;
  public businessAction: PlatformLoggerInterface; 
  public cultural: CulturalLoggerInterface;
  public matching: PlatformLoggerInterface;
  public events: PlatformLoggerInterface;
  public ai: PlatformLoggerInterface;
  public streaming: PlatformLoggerInterface;
  public mobile: PlatformLoggerInterface;
  public performance: PerformanceLoggerInterface;
  public security: PlatformLoggerInterface;
  public community: PlatformLoggerInterface;
  public payments: PlatformLoggerInterface;
  public messaging: PlatformLoggerInterface;
  public analytics: PlatformLoggerInterface;
  public admin: PlatformLoggerInterface;
  public geo: PlatformLoggerInterface;
  public seo: PlatformLoggerInterface;
  public aiSystem: PlatformLoggerInterface;

  constructor() {
    this.isDevelopment = process.env.NODE_ENV !== 'production';
    this.isDebugEnabled = this.isDevelopment || Boolean(
      typeof window !== 'undefined' && (window as any).LUSOTOWN_DEBUG
    );

    // Initialize platform area loggers
    this.auth = this.createAreaLogger('auth');
    this.business = this.createAreaLogger('business');
    this.businessAction = this.createAreaLogger('business'); // Alias
    this.cultural = this.createCulturalLogger();
    this.matching = this.createAreaLogger('matching');
    this.events = this.createAreaLogger('events');
    this.ai = this.createAreaLogger('ai');
    this.streaming = this.createAreaLogger('streaming');
    this.mobile = this.createAreaLogger('mobile');
    this.performance = this.createPerformanceLogger();
    this.security = this.createAreaLogger('security');
    this.community = this.createAreaLogger('community');
    this.payments = this.createAreaLogger('payments');
    this.messaging = this.createAreaLogger('messaging');
    this.analytics = this.createAreaLogger('analytics');
    this.admin = this.createAreaLogger('admin');
    this.geo = this.createAreaLogger('geo');
    this.seo = this.createAreaLogger('seo');
    this.aiSystem = this.createAreaLogger('ai'); // Alias for ai
  }

  // Create area-specific logger instance
  private createAreaLogger(area: PlatformArea): PlatformLoggerInterface {
    return {
      debug: (message: string, meta: LogMeta = {}) => this.debug(message, { ...meta, area }),
      info: (message: string, meta: LogMeta = {}) => this.info(message, { ...meta, area }),
      warn: (message: string, meta: LogMeta = {}) => this.warn(message, { ...meta, area }),
      error: (message: string, error?: Error | any, meta: LogMeta = {}) => this.error(message, error, { ...meta, area })
    };
  }

  // Create performance logger with start/end methods
  private createPerformanceLogger(): PerformanceLoggerInterface {
    return {
      debug: (message: string, meta: LogMeta = {}) => this.debug(message, { ...meta, area: 'performance' }),
      info: (message: string, meta: LogMeta = {}) => this.info(message, { ...meta, area: 'performance' }),
      warn: (message: string, meta: LogMeta = {}) => this.warn(message, { ...meta, area: 'performance' }),
      error: (message: string, error?: Error | any, meta: LogMeta = {}) => this.error(message, error, { ...meta, area: 'performance' }),
      start: (operation: string, meta: LogMeta = {}) => {
        const startTime = Date.now();
        this.debug(`Performance Start: ${operation}`, { ...meta, area: 'performance' });
        return startTime;
      },
      end: (operation: string, startTime: number, meta: LogMeta = {}) => {
        const duration = Date.now() - startTime;
        this.info(`Performance End: ${operation} - ${duration}ms`, { ...meta, area: 'performance', duration });
      }
    };
  }

  // Create cultural logger with Portuguese methods
  private createCulturalLogger(): CulturalLoggerInterface {
    const culturalMethod = (culturalContext: CulturalContext) => 
      (level: string, action: string, message: string, meta: LogMeta = {}) => {
        const logLevel = level as 'debug' | 'info' | 'warn' | 'error';
        this[logLevel](message, { ...meta, area: 'cultural', culturalContext, action });
      };

    return {
      debug: (message: string, meta: LogMeta = {}) => this.debug(message, { ...meta, area: 'cultural' }),
      info: (message: string, meta: LogMeta = {}) => this.info(message, { ...meta, area: 'cultural' }),
      warn: (message: string, meta: LogMeta = {}) => this.warn(message, { ...meta, area: 'cultural' }),
      error: (message: string, error?: Error | any, meta: LogMeta = {}) => this.error(message, error, { ...meta, area: 'cultural' }),
      portuguese: culturalMethod('portuguese'),
      brazilian: culturalMethod('brazilian'),
      palop: culturalMethod('palop'),
      mixed: culturalMethod('multicultural'),
      lusophone: culturalMethod('lusophone')
    };
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