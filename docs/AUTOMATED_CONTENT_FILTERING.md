# AdyaTribe Automated Content Filtering System Architecture

## System Overview

The automated content filtering system provides real-time protection for the AdyaTribe community through multiple layers of analysis, from basic keyword detection to advanced AI-powered context understanding. The system is designed to protect women-centered conversations while minimizing false positives that could disrupt genuine community interactions.

## Multi-Tier Filtering Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                 Content Input (Text/Image/Video)           │
└─────────────────┬───────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────┐
│               Tier 1: Real-Time Filters                    │
│  • Basic profanity filter        • Personal info detector  │
│  • Spam pattern recognition      • Link safety validation  │
│  • Image metadata scrubbing      • Rate limiting           │
│  Response Time: < 100ms          Action: Block/Allow       │
└─────────────────┬───────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────┐
│              Tier 2: Pattern Analysis                      │
│  • Behavioral pattern detection  • Context-aware filtering │
│  • User reputation scoring      • Community impact assess  │
│  • Harassment pattern matching  • Multi-message analysis   │
│  Response Time: < 5 minutes      Action: Flag/Restrict     │
└─────────────────┬───────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────┐
│              Tier 3: AI Analysis                          │
│  • Sentiment & toxicity analysis • Cultural context aware  │
│  • Intent classification        • Threat assessment        │
│  • Nuanced language detection   • Community-specific rules │
│  Response Time: < 30 minutes     Action: Escalate/Review   │
└─────────────────┬───────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────┐
│             Human Review Queue                              │
│  • Complex cases requiring context • Appeal reviews        │
│  • Cultural sensitivity cases     • Policy edge cases      │
│  Response Time: < 24 hours        Action: Final Decision   │
└─────────────────────────────────────────────────────────────┘
```

## Tier 1: Real-Time Content Filters

### Text Content Analysis
```javascript
// functions/src/filters/tier1TextFilter.js

class Tier1TextFilter {
  constructor() {
    this.profanityList = this.loadProfanityDatabase();
    this.personalInfoPatterns = this.loadPersonalInfoRegex();
    this.spamPatterns = this.loadSpamPatterns();
    this.linkValidator = new LinkSafetyValidator();
  }
  
  async analyzeText(content, metadata) {
    const results = await Promise.all([
      this.checkProfanity(content),
      this.detectPersonalInformation(content),
      this.analyzeSpamIndicators(content, metadata),
      this.validateLinks(content),
      this.checkRateLimiting(metadata.userId)
    ]);
    
    return {
      riskScore: this.calculateTier1RiskScore(results),
      violations: this.extractViolations(results),
      action: this.determineAction(results),
      processingTime: Date.now() - metadata.timestamp
    };
  }
  
  checkProfanity(content) {
    const words = this.tokenizeText(content);
    const violations = [];
    
    // Multi-language profanity detection
    const languages = ['en', 'es', 'fr', 'de']; // Expandable
    
    for (const word of words) {
      for (const lang of languages) {
        if (this.profanityList[lang].includes(word.toLowerCase())) {
          violations.push({
            type: 'profanity',
            language: lang,
            word: word,
            severity: this.getProfanitySeverity(word, lang)
          });
        }
      }
    }
    
    // Context-aware exceptions for women's health discussions
    const medicalExceptions = [
      'breast', 'vaginal', 'menstrual', 'reproductive', 'gynecological'
    ];
    
    return {
      violations: violations.filter(v => 
        !this.isMedicalContext(content, v.word, medicalExceptions)
      ),
      contextFlags: this.identifyContext(content)
    };
  }
  
  detectPersonalInformation(content) {
    const patterns = {
      email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
      phone_uk: /(?:\+44|0)(?:\d{2}\s?\d{4}\s?\d{4}|\d{3}\s?\d{3}\s?\d{4}|\d{4}\s?\d{6})/g,
      postcode_uk: /\b[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}\b/g,
      address: /\b\d+\s+[\w\s]+(?:street|st|avenue|ave|road|rd|lane|ln|drive|dr|court|ct|place|pl)\b/gi,
      social_media: /@[\w.]+|(?:instagram|facebook|twitter|snapchat|tiktok)\.com\/[\w.]+/gi
    };
    
    const violations = [];
    
    for (const [type, pattern] of Object.entries(patterns)) {
      const matches = content.match(pattern);
      if (matches) {
        violations.push({
          type: 'personal_info',
          subtype: type,
          matches: matches,
          riskLevel: this.getPersonalInfoRisk(type)
        });
      }
    }
    
    return violations;
  }
  
  analyzeSpamIndicators(content, metadata) {
    const indicators = {
      repetitive_text: this.checkRepetitiveContent(content),
      excessive_caps: this.checkExcessiveCaps(content),
      promotional_keywords: this.checkPromotionalContent(content),
      suspicious_links: this.checkSuspiciousLinks(content),
      posting_frequency: this.checkPostingFrequency(metadata.userId)
    };
    
    const spamScore = Object.values(indicators)
      .reduce((sum, score) => sum + score, 0) / Object.keys(indicators).length;
    
    return {
      spamScore,
      indicators,
      isLikelySpam: spamScore > 0.7
    };
  }
  
  validateLinks(content) {
    const urls = this.extractUrls(content);
    const results = [];
    
    for (const url of urls) {
      const analysis = {
        url,
        domain: this.extractDomain(url),
        isShortened: this.isShortUrl(url),
        isSuspicious: this.checkSuspiciousDomain(url),
        safetyRating: this.getDomainSafetyRating(url)
      };
      
      results.push(analysis);
    }
    
    return {
      urlCount: urls.length,
      suspiciousUrls: results.filter(r => r.isSuspicious),
      overallRisk: this.calculateLinkRisk(results)
    };
  }
}
```

### Image Content Analysis
```javascript
// functions/src/filters/tier1ImageFilter.js

class Tier1ImageFilter {
  constructor() {
    this.visionClient = new vision.ImageAnnotatorClient();
    this.nsfwDetector = new NSFWDetector();
  }
  
  async analyzeImage(imageUrl, metadata) {
    // Strip EXIF data and location information first
    const cleanImageUrl = await this.stripImageMetadata(imageUrl);
    
    const [
      safeSearchResult,
      textDetectionResult,
      faceDetectionResult,
      objectDetectionResult
    ] = await Promise.all([
      this.performSafeSearch(cleanImageUrl),
      this.detectTextInImage(cleanImageUrl),
      this.detectFaces(cleanImageUrl),
      this.detectObjects(cleanImageUrl)
    ]);
    
    return {
      safeSearch: this.processSafeSearchResults(safeSearchResult),
      textContent: this.processTextResults(textDetectionResult),
      faceAnalysis: this.processFaceResults(faceDetectionResult),
      objectAnalysis: this.processObjectResults(objectDetectionResult),
      metadata: {
        imageSize: metadata.size,
        format: metadata.format,
        uploadTime: metadata.timestamp
      }
    };
  }
  
  async stripImageMetadata(imageUrl) {
    const sharp = require('sharp');
    
    // Download image
    const imageBuffer = await this.downloadImage(imageUrl);
    
    // Remove EXIF data, GPS coordinates, and other metadata
    const cleanImageBuffer = await sharp(imageBuffer)
      .rotate() // Auto-rotate based on EXIF, then remove EXIF
      .jpeg({ quality: 85 }) // Recompress to remove metadata
      .toBuffer();
    
    // Upload cleaned image
    return await this.uploadCleanImage(cleanImageBuffer);
  }
  
  processSafeSearchResults(results) {
    const safeSearch = results[0].safeSearchAnnotation;
    
    const riskLevels = {
      'VERY_UNLIKELY': 0,
      'UNLIKELY': 0.2,
      'POSSIBLE': 0.5,
      'LIKELY': 0.8,
      'VERY_LIKELY': 1.0
    };
    
    const analysis = {
      adult: riskLevels[safeSearch.adult] || 0,
      spoof: riskLevels[safeSearch.spoof] || 0,
      medical: riskLevels[safeSearch.medical] || 0,
      violence: riskLevels[safeSearch.violence] || 0,
      racy: riskLevels[safeSearch.racy] || 0
    };
    
    const overallRisk = Math.max(...Object.values(analysis));
    
    return {
      ...analysis,
      overallRisk,
      action: this.determineImageAction(analysis)
    };
  }
  
  determineImageAction(analysis) {
    const { adult, violence, racy } = analysis;
    
    // Immediate blocking criteria
    if (adult >= 0.8 || violence >= 0.8) {
      return {
        type: 'block',
        reason: 'inappropriate_content',
        severity: 'high'
      };
    }
    
    // Flag for review
    if (adult >= 0.5 || violence >= 0.5 || racy >= 0.7) {
      return {
        type: 'flag_review',
        reason: 'potentially_inappropriate',
        severity: 'medium'
      };
    }
    
    // Add content warning
    if (racy >= 0.5) {
      return {
        type: 'content_warning',
        reason: 'suggestive_content',
        severity: 'low'
      };
    }
    
    return {
      type: 'allow',
      reason: 'content_approved',
      severity: 'none'
    };
  }
}
```

## Tier 2: Behavioral Pattern Analysis

### User Behavior Monitoring
```javascript
// functions/src/filters/tier2BehaviorAnalysis.js

class BehaviorAnalysisEngine {
  constructor() {
    this.redis = new Redis(process.env.REDIS_URL);
    this.patternDetector = new PatternDetector();
  }
  
  async analyzeBehaviorPatterns(userId, actionType, content, context) {
    const timeWindow = 24 * 60 * 60 * 1000; // 24 hours
    const userHistory = await this.getUserRecentActivity(userId, timeWindow);
    
    const patterns = await Promise.all([
      this.detectSpammingBehavior(userHistory),
      this.detectHarassmentPatterns(userHistory, content),
      this.analyzeEngagementPatterns(userHistory),
      this.checkReputationScore(userId),
      this.analyzeCommunityImpact(userId, content, context)
    ]);
    
    const behaviorScore = this.calculateBehaviorScore(patterns);
    const riskLevel = this.assessRiskLevel(behaviorScore, patterns);
    
    return {
      behaviorScore,
      riskLevel,
      patterns: patterns.filter(p => p.detected),
      recommendations: this.generateRecommendations(patterns)
    };
  }
  
  async detectHarassmentPatterns(userHistory, currentContent) {
    const patterns = {
      targeting_same_user: this.checkUserTargeting(userHistory),
      escalating_aggression: this.checkAggression(userHistory),
      coordinated_behavior: await this.checkCoordinatedHarassment(userHistory),
      persistent_contact: this.checkPersistentContact(userHistory)
    };
    
    // Analyze current content for harassment indicators
    const harassmentKeywords = [
      'ugly', 'fat', 'stupid', 'worthless', 'pathetic', 'loser',
      'shut up', 'nobody cares', 'kill yourself', 'die'
    ];
    
    const currentContentScore = this.analyzeHarassmentContent(
      currentContent,
      harassmentKeywords
    );
    
    return {
      detected: Object.values(patterns).some(p => p.score > 0.6) || 
               currentContentScore > 0.7,
      patterns,
      currentContentScore,
      riskLevel: this.calculateHarassmentRisk(patterns, currentContentScore)
    };
  }
  
  checkUserTargeting(userHistory) {
    const interactions = userHistory.filter(action => 
      action.type === 'message' || action.type === 'comment'
    );
    
    const targetCounts = {};
    interactions.forEach(interaction => {
      if (interaction.targetUserId) {
        targetCounts[interaction.targetUserId] = 
          (targetCounts[interaction.targetUserId] || 0) + 1;
      }
    });
    
    const maxTargetCount = Math.max(...Object.values(targetCounts));
    const totalInteractions = interactions.length;
    
    return {
      score: totalInteractions > 0 ? maxTargetCount / totalInteractions : 0,
      mostTargetedUser: this.getMostTargetedUser(targetCounts),
      targetDistribution: targetCounts
    };
  }
  
  async checkCoordinatedHarassment(userHistory) {
    // Look for patterns indicating coordinated harassment
    const recentMessages = userHistory
      .filter(action => action.type === 'message')
      .slice(-20); // Last 20 messages
    
    const suspiciousPatterns = {
      simultaneousTargeting: await this.checkSimultaneousTargeting(recentMessages),
      similarPhrasing: this.checkSimilarPhrasing(recentMessages),
      timeCorrelation: this.checkTimeCorrelation(recentMessages)
    };
    
    const coordinationScore = Object.values(suspiciousPatterns)
      .reduce((sum, pattern) => sum + pattern.score, 0) / 3;
    
    return {
      detected: coordinationScore > 0.7,
      score: coordinationScore,
      patterns: suspiciousPatterns
    };
  }
  
  calculateBehaviorScore(patterns) {
    const weights = {
      spamming: 0.3,
      harassment: 0.4,
      engagement: 0.1,
      reputation: 0.1,
      community_impact: 0.1
    };
    
    let totalScore = 0;
    let totalWeight = 0;
    
    patterns.forEach(pattern => {
      if (pattern.type in weights) {
        totalScore += pattern.score * weights[pattern.type];
        totalWeight += weights[pattern.type];
      }
    });
    
    return totalWeight > 0 ? totalScore / totalWeight : 0;
  }
}
```

### Community Impact Assessment
```javascript
// functions/src/filters/communityImpactAnalysis.js

class CommunityImpactAnalyzer {
  async assessCommunityImpact(userId, content, context) {
    const impact = {
      group_disruption: await this.assessGroupDisruption(content, context),
      member_safety_risk: await this.assessSafetyRisk(userId, content),
      community_wellbeing: await this.assessWellbeingImpact(content),
      trust_erosion: await this.assessTrustImpact(userId, content)
    };
    
    return {
      overallImpact: this.calculateOverallImpact(impact),
      specificImpacts: impact,
      mitigationRecommendations: this.recommendMitigation(impact)
    };
  }
  
  async assessGroupDisruption(content, context) {
    if (context.groupId) {
      const groupMetrics = await this.getGroupMetrics(context.groupId);
      const recentDiscussions = await this.getRecentDiscussions(context.groupId);
      
      const disruptionIndicators = {
        off_topic: this.isOffTopic(content, groupMetrics.primaryTopics),
        inflammatory: this.isInflammatory(content, recentDiscussions),
        attention_seeking: this.isAttentionSeeking(content),
        divisive: this.isDivisive(content, groupMetrics.memberValues)
      };
      
      return {
        score: Object.values(disruptionIndicators)
          .reduce((sum, score) => sum + score, 0) / 4,
        indicators: disruptionIndicators
      };
    }
    
    return { score: 0, indicators: {} };
  }
  
  async assessSafetyRisk(userId, content) {
    const safetyIndicators = {
      threatening_language: this.containsThreats(content),
      doxxing_attempt: this.containsPersonalInfo(content),
      predatory_behavior: await this.checkPredatoryPatterns(userId, content),
      manipulation_tactics: this.identifyManipulationTactics(content)
    };
    
    const riskScore = Object.values(safetyIndicators)
      .reduce((sum, score) => sum + score, 0) / 4;
    
    return {
      score: riskScore,
      indicators: safetyIndicators,
      urgency: riskScore > 0.8 ? 'immediate' : 
               riskScore > 0.6 ? 'high' : 
               riskScore > 0.4 ? 'medium' : 'low'
    };
  }
  
  identifyManipulationTactics(content) {
    const manipulationPatterns = {
      love_bombing: [
        'you\'re so special', 'unlike other women', 'you understand me',
        'soulmate', 'meant to be', 'perfect match'
      ],
      isolation: [
        'your friends don\'t understand', 'they\'re jealous', 
        'you don\'t need them', 'we\'re better alone'
      ],
      gaslighting: [
        'you\'re overreacting', 'that didn\'t happen', 'you\'re being dramatic',
        'you\'re too sensitive', 'you\'re imagining things'
      ],
      financial_exploitation: [
        'investment opportunity', 'make money fast', 'exclusive deal',
        'limited time offer', 'guaranteed returns'
      ]
    };
    
    let manipulationScore = 0;
    const detectedPatterns = [];
    
    Object.entries(manipulationPatterns).forEach(([type, patterns]) => {
      const matches = patterns.filter(pattern => 
        content.toLowerCase().includes(pattern.toLowerCase())
      );
      
      if (matches.length > 0) {
        manipulationScore += matches.length * 0.2;
        detectedPatterns.push({ type, matches });
      }
    });
    
    return Math.min(manipulationScore, 1.0);
  }
}
```

## Tier 3: AI-Powered Advanced Analysis

### Sentiment & Toxicity Analysis
```javascript
// functions/src/filters/tier3AIAnalysis.js

class AIContentAnalyzer {
  constructor() {
    this.perspectiveAPI = new PerspectiveAPI(process.env.PERSPECTIVE_API_KEY);
    this.sentimentAnalyzer = new SentimentAnalyzer();
    this.contextAnalyzer = new ContextualAnalyzer();
  }
  
  async performAdvancedAnalysis(content, context, userProfile) {
    const [
      toxicityAnalysis,
      sentimentAnalysis,
      contextualAnalysis,
      intentClassification
    ] = await Promise.all([
      this.analyzeToxicity(content),
      this.analyzeSentiment(content),
      this.analyzeContext(content, context),
      this.classifyIntent(content, userProfile)
    ]);
    
    const riskAssessment = await this.assessOverallRisk({
      toxicity: toxicityAnalysis,
      sentiment: sentimentAnalysis,
      context: contextualAnalysis,
      intent: intentClassification
    });
    
    return {
      toxicity: toxicityAnalysis,
      sentiment: sentimentAnalysis,
      context: contextualAnalysis,
      intent: intentClassification,
      overallRisk: riskAssessment,
      recommendedAction: this.recommendAction(riskAssessment)
    };
  }
  
  async analyzeToxicity(content) {
    const attributes = [
      'TOXICITY',
      'SEVERE_TOXICITY',
      'IDENTITY_ATTACK',
      'INSULT',
      'PROFANITY',
      'THREAT',
      'SEXUALLY_EXPLICIT',
      'FLIRTATION'
    ];
    
    const results = {};
    
    for (const attribute of attributes) {
      try {
        const response = await this.perspectiveAPI.analyze({
          comment: { text: content },
          requestedAttributes: { [attribute]: {} }
        });
        
        results[attribute.toLowerCase()] = {
          score: response.attributeScores[attribute].summaryScore.value,
          threshold_exceeded: response.attributeScores[attribute].summaryScore.value > 0.7
        };
      } catch (error) {
        console.warn(`Failed to analyze ${attribute}:`, error);
        results[attribute.toLowerCase()] = { score: 0, threshold_exceeded: false };
      }
    }
    
    return {
      scores: results,
      overallToxicity: this.calculateOverallToxicity(results),
      highestRiskAttribute: this.getHighestRiskAttribute(results)
    };
  }
  
  async analyzeContext(content, context) {
    const contextualFactors = {
      thread_context: await this.analyzeThreadContext(content, context),
      group_dynamics: await this.analyzeGroupDynamics(content, context),
      cultural_sensitivity: this.analyzeCulturalSensitivity(content),
      women_specific_context: this.analyzeWomenSpecificContext(content)
    };
    
    return {
      factors: contextualFactors,
      contextScore: this.calculateContextScore(contextualFactors),
      culturalFlags: this.identifyCulturalFlags(contextualFactors)
    };
  }
  
  analyzeWomenSpecificContext(content) {
    const womenCenteredTopics = {
      health_discussions: {
        keywords: [
          'menstruation', 'pregnancy', 'menopause', 'contraception',
          'reproductive health', 'gynecologist', 'breast health',
          'cervical screening', 'fertility', 'hormone', 'period'
        ],
        context_boost: 0.3 // Reduce false positives for health discussions
      },
      safety_experiences: {
        keywords: [
          'harassment', 'catcalling', 'workplace discrimination',
          'dating safety', 'walking alone', 'feeling unsafe',
          'sexual assault', 'domestic violence', 'stalking'
        ],
        context_boost: 0.2 // Allow discussion of safety experiences
      },
      career_challenges: {
        keywords: [
          'glass ceiling', 'pay gap', 'maternity leave',
          'workplace bias', 'imposter syndrome', 'networking',
          'male dominated', 'career break'
        ],
        context_boost: 0.2
      },
      body_positivity: {
        keywords: [
          'body image', 'self acceptance', 'weight', 'appearance',
          'beauty standards', 'aging', 'confidence', 'self love'
        ],
        context_boost: 0.25
      }
    };
    
    let contextScore = 0;
    const detectedTopics = [];
    
    Object.entries(womenCenteredTopics).forEach(([topic, config]) => {
      const matchCount = config.keywords.filter(keyword =>
        content.toLowerCase().includes(keyword.toLowerCase())
      ).length;
      
      if (matchCount > 0) {
        contextScore += config.context_boost;
        detectedTopics.push({
          topic,
          matchCount,
          boost: config.context_boost
        });
      }
    });
    
    return {
      score: Math.min(contextScore, 1.0),
      detectedTopics,
      isWomenCenteredDiscussion: detectedTopics.length > 0
    };
  }
  
  async classifyIntent(content, userProfile) {
    const intentClassifiers = {
      seeking_support: this.detectSupportSeeking(content),
      offering_help: this.detectHelpOffering(content),
      sharing_experience: this.detectExperienceSharing(content),
      asking_advice: this.detectAdviceSeeking(content),
      social_connection: this.detectSocialIntent(content),
      harassment: this.detectHarassmentIntent(content),
      spam_promotion: this.detectPromotionalIntent(content),
      manipulation: this.detectManipulationIntent(content)
    };
    
    const results = {};
    for (const [intent, classifier] of Object.entries(intentClassifiers)) {
      results[intent] = await classifier;
    }
    
    return {
      classifications: results,
      primaryIntent: this.getPrimaryIntent(results),
      confidence: this.calculateIntentConfidence(results),
      benevolentIntent: this.isBenevolentIntent(results)
    };
  }
  
  detectSupportSeeking(content) {
    const supportPhrases = [
      'feeling overwhelmed', 'need advice', 'going through',
      'struggling with', 'anyone else', 'how do you cope',
      'feeling alone', 'need support', 'going through a tough time',
      'feeling lost', 'need encouragement', 'having a hard time'
    ];
    
    const matchScore = supportPhrases.filter(phrase =>
      content.toLowerCase().includes(phrase.toLowerCase())
    ).length / supportPhrases.length;
    
    return {
      score: matchScore,
      detected: matchScore > 0.1,
      priority: 'support_needed'
    };
  }
}
```

## Women-Specific Content Protection

### Healthcare Discussion Protection
```javascript
class HealthcareContentProtector {
  constructor() {
    this.medicalTerms = this.loadMedicalTermsDatabase();
    this.healthContexts = this.loadHealthContexts();
  }
  
  analyzeHealthcareContent(content) {
    const healthTopics = {
      reproductive_health: {
        terms: [
          'menstruation', 'period', 'pregnancy', 'contraception', 'fertility',
          'ovulation', 'menopause', 'hormone', 'gynecologist', 'pap smear'
        ],
        protection_level: 'high'
      },
      mental_health: {
        terms: [
          'anxiety', 'depression', 'therapy', 'counseling', 'stress',
          'panic attack', 'mental health', 'wellbeing', 'self care'
        ],
        protection_level: 'high'
      },
      body_image: {
        terms: [
          'weight', 'body image', 'eating disorder', 'self esteem',
          'body positive', 'appearance', 'confidence', 'self acceptance'
        ],
        protection_level: 'medium'
      }
    };
    
    let isHealthDiscussion = false;
    let protectionLevel = 'none';
    const detectedTopics = [];
    
    Object.entries(healthTopics).forEach(([topic, config]) => {
      const matches = config.terms.filter(term =>
        content.toLowerCase().includes(term.toLowerCase())
      );
      
      if (matches.length > 0) {
        isHealthDiscussion = true;
        detectedTopics.push({ topic, matches, protection: config.protection_level });
        
        if (config.protection_level === 'high') {
          protectionLevel = 'high';
        } else if (protectionLevel !== 'high' && config.protection_level === 'medium') {
          protectionLevel = 'medium';
        }
      }
    });
    
    return {
      isHealthDiscussion,
      protectionLevel,
      detectedTopics,
      adjustedToxicityThreshold: this.getAdjustedThreshold(protectionLevel)
    };
  }
  
  getAdjustedThreshold(protectionLevel) {
    // Raise toxicity thresholds for health discussions to prevent false positives
    const adjustments = {
      'high': 0.9,    // Very lenient for sensitive health topics
      'medium': 0.8,  // Moderately lenient
      'none': 0.7     // Standard threshold
    };
    
    return adjustments[protectionLevel] || 0.7;
  }
}
```

## Performance Optimization

### Caching Strategy
```javascript
class ContentFilterCache {
  constructor() {
    this.redis = new Redis(process.env.REDIS_URL);
    this.cacheConfig = {
      tier1_results: { ttl: 3600, prefix: 't1:' },      // 1 hour
      behavior_patterns: { ttl: 7200, prefix: 'bp:' },   // 2 hours
      ai_analysis: { ttl: 14400, prefix: 'ai:' },        // 4 hours
      user_reputation: { ttl: 86400, prefix: 'rep:' }    // 24 hours
    };
  }
  
  async getCachedResult(type, contentHash) {
    const config = this.cacheConfig[type];
    if (!config) return null;
    
    const key = `${config.prefix}${contentHash}`;
    const cached = await this.redis.get(key);
    
    return cached ? JSON.parse(cached) : null;
  }
  
  async setCachedResult(type, contentHash, result) {
    const config = this.cacheConfig[type];
    if (!config) return;
    
    const key = `${config.prefix}${contentHash}`;
    await this.redis.setex(key, config.ttl, JSON.stringify(result));
  }
  
  generateContentHash(content, metadata) {
    const crypto = require('crypto');
    const hashInput = `${content}|${JSON.stringify(metadata)}`;
    return crypto.createHash('sha256').update(hashInput).digest('hex');
  }
}
```

### Batch Processing
```javascript
class BatchContentProcessor {
  constructor() {
    this.batchSize = 100;
    this.processingQueue = new Queue('content-processing');
  }
  
  async processBatch(contentItems) {
    const batches = this.chunkArray(contentItems, this.batchSize);
    const results = [];
    
    for (const batch of batches) {
      const batchResults = await Promise.all(
        batch.map(item => this.processContentItem(item))
      );
      results.push(...batchResults);
    }
    
    return results;
  }
  
  async processContentItem(item) {
    try {
      const tier1Result = await this.tier1Filter(item.content, item.metadata);
      
      if (tier1Result.action === 'block') {
        return { itemId: item.id, action: 'blocked', tier: 1 };
      }
      
      if (tier1Result.riskScore >= 0.5) {
        // Queue for tier 2 analysis
        await this.queueForTier2Analysis(item);
      }
      
      return { itemId: item.id, action: 'approved', tier: 1 };
    } catch (error) {
      console.error(`Failed to process content item ${item.id}:`, error);
      return { itemId: item.id, action: 'error', error: error.message };
    }
  }
}
```

## Configuration & Deployment

### Filter Configuration
```javascript
// config/contentFiltering.js
module.exports = {
  filters: {
    tier1: {
      enabled: true,
      profanity: {
        enabled: true,
        strictness: 'medium', // low, medium, high
        languages: ['en', 'es', 'fr', 'de'],
        exceptions: ['medical_terms', 'health_discussions']
      },
      personalInfo: {
        enabled: true,
        detectEmail: true,
        detectPhone: true,
        detectAddress: true,
        detectSocialMedia: true
      },
      spam: {
        enabled: true,
        repetitiveTextThreshold: 0.7,
        capsLockThreshold: 0.3,
        linkLimit: 3,
        rateLimitPerHour: 50
      }
    },
    tier2: {
      enabled: true,
      behaviorAnalysis: {
        windowHours: 24,
        harassmentThreshold: 0.6,
        spamThreshold: 0.7
      },
      patternDetection: {
        coordinatedHarassment: true,
        sockPuppetDetection: true,
        astroturfing: false
      }
    },
    tier3: {
      enabled: true,
      aiAnalysis: {
        provider: 'perspective', // perspective, openai, custom
        toxicityThreshold: 0.7,
        contextAnalysis: true,
        culturalSensitivity: true
      },
      womenSpecificProtections: {
        healthDiscussionProtection: true,
        safetyExperienceSharing: true,
        bodyPositivitySupport: true
      }
    }
  },
  
  actions: {
    block: {
      notification: true,
      appealable: true,
      moderatorReview: false
    },
    flag: {
      notification: false,
      moderatorReview: true,
      urgentEscalation: 'safety_threat'
    },
    warn: {
      notification: true,
      educationalContent: true,
      progressTracking: true
    }
  },
  
  performance: {
    caching: {
      enabled: true,
      provider: 'redis',
      ttlSeconds: 3600
    },
    batchProcessing: {
      enabled: true,
      batchSize: 100,
      maxWaitTime: 5000
    }
  }
};
```

### Monitoring & Metrics
```javascript
// Comprehensive monitoring setup
const filteringMetrics = {
  tier1: {
    processingTime: new Histogram('tier1_processing_duration_ms'),
    blockedContent: new Counter('tier1_blocked_total'),
    falsePositives: new Counter('tier1_false_positives_total')
  },
  tier2: {
    processingTime: new Histogram('tier2_processing_duration_ms'),
    flaggedUsers: new Counter('tier2_flagged_users_total'),
    patterns: new Counter('tier2_patterns_detected_total')
  },
  tier3: {
    processingTime: new Histogram('tier3_processing_duration_ms'),
    aiAnalysisRequests: new Counter('tier3_ai_requests_total'),
    contextualAdjustments: new Counter('tier3_context_adjustments_total')
  }
};
```

---

**Document Version:** 1.0
**Last Updated:** January 2025
**Review Schedule:** Weekly performance review, monthly accuracy assessment, quarterly policy review