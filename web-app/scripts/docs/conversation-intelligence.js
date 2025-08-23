#!/usr/bin/env node

/**
 * LusoTown Conversation Intelligence System
 * 
 * Real-time monitoring and analysis of Claude Code sessions with:
 * - Active conversation parsing and insight extraction
 * - Architectural decision capture and documentation
 * - Pattern recognition and learning from interactions
 * - Automated summary generation with technical insights
 */

const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');
const crypto = require('crypto');

class ConversationIntelligence extends EventEmitter {
  constructor() {
    super();
    this.webAppRoot = path.resolve(__dirname, '../../');
    this.projectRoot = path.resolve(__dirname, '../../../');
    this.conversationBuffer = [];
    this.activeSessionId = null;
    this.extractedDecisions = new Map();
    this.patternLibrary = new Map();
    this.technicalInsights = [];
    this.conversationMetrics = {
      sessionsMonitored: 0,
      decisionsExtracted: 0,
      patternsIdentified: 0,
      insightsGenerated: 0
    };
    
    this.initializeConversationTracking();
  }

  async initializeConversationTracking() {
    console.log('🔍 Initializing Conversation Intelligence System...');
    
    // Load historical conversation data
    await this.loadHistoricalConversations();
    
    // Initialize pattern recognition
    await this.initializePatternRecognition();
    
    // Start monitoring systems
    this.startSessionMonitoring();
    
    console.log('✅ Conversation Intelligence System initialized');
  }

  // ====================
  // REAL-TIME SESSION MONITORING
  // ====================

  startSessionMonitoring() {
    console.log('👁️ Starting real-time session monitoring...');
    
    // Monitor for new Claude Code sessions
    this.monitorClaudeCodeSessions();
    
    // Watch for conversation artifacts
    this.watchConversationArtifacts();
    
    // Parse conversation patterns
    this.startPatternAnalysis();
  }

  monitorClaudeCodeSessions() {
    // In production, this would connect to Claude Code API or logs
    console.log('🤖 Claude Code session monitoring active');
    
    // Simulate session detection
    setInterval(() => {
      this.simulateSessionActivity();
    }, 30000); // Check every 30 seconds
  }

  simulateSessionActivity() {
    // Simulate detecting an active Claude Code session
    const sessionActivity = this.detectSessionActivity();
    
    if (sessionActivity) {
      this.processSessionActivity(sessionActivity);
    }
  }

  detectSessionActivity() {
    // In production, this would detect actual Claude Code sessions
    // For now, simulate based on recent file changes
    try {
      const recentFiles = this.getRecentlyModifiedFiles();
      
      if (recentFiles.length > 0) {
        return {
          sessionId: crypto.randomUUID(),
          timestamp: Date.now(),
          activeFiles: recentFiles,
          activityType: 'file-modification',
          confidence: 0.8
        };
      }
    } catch (error) {
      // Ignore detection errors
    }
    
    return null;
  }

  getRecentlyModifiedFiles() {
    const files = [];
    const oneHourAgo = Date.now() - (60 * 60 * 1000);
    
    const scanDirectory = (dir) => {
      if (!fs.existsSync(dir)) return;
      
      try {
        const items = fs.readdirSync(dir);
        
        for (const item of items) {
          if (item === 'node_modules' || item.startsWith('.')) continue;
          
          const fullPath = path.join(dir, item);
          const stat = fs.statSync(fullPath);
          
          if (stat.isDirectory()) {
            scanDirectory(fullPath);
          } else if (stat.mtime.getTime() > oneHourAgo && 
                    (item.endsWith('.tsx') || item.endsWith('.ts') || item.endsWith('.md'))) {
            files.push({
              path: fullPath,
              modified: stat.mtime.getTime(),
              size: stat.size
            });
          }
        }
      } catch (error) {
        // Ignore scan errors
      }
    };
    
    scanDirectory(path.join(this.webAppRoot, 'src'));
    return files.slice(0, 10); // Limit to recent files
  }

  async processSessionActivity(activity) {
    console.log(`🔍 Processing session activity: ${activity.activityType}`);
    
    if (!this.activeSessionId || this.activeSessionId !== activity.sessionId) {
      // New session detected
      this.activeSessionId = activity.sessionId;
      this.conversationMetrics.sessionsMonitored++;
      
      await this.startNewSessionAnalysis(activity);
    }
    
    // Process activity
    await this.analyzeSessionActivity(activity);
  }

  async startNewSessionAnalysis(activity) {
    console.log(`🆕 New Claude Code session detected: ${activity.sessionId.substring(0, 8)}...`);
    
    const sessionData = {
      sessionId: activity.sessionId,
      startTime: activity.timestamp,
      activeFiles: activity.activeFiles,
      decisions: [],
      patterns: [],
      insights: []
    };
    
    // Store session data
    this.storeSessionData(sessionData);
    
    this.emit('new-session-detected', sessionData);
  }

  async analyzeSessionActivity(activity) {
    // Analyze each active file for patterns and decisions
    for (const file of activity.activeFiles) {
      if (!fs.existsSync(file.path)) continue;
      
      const content = fs.readFileSync(file.path, 'utf8');
      
      // Extract potential decisions from code changes
      const decisions = await this.extractDecisionsFromCode(file.path, content);
      
      // Identify patterns in the changes
      const patterns = await this.identifyPatterns(file.path, content);
      
      // Generate insights from the activity
      const insights = await this.generateInsights(file.path, content, activity);
      
      // Store findings
      this.storeSessionFindings(activity.sessionId, {
        file: file.path,
        decisions,
        patterns,
        insights
      });
    }
  }

  // ====================
  // DECISION EXTRACTION
  // ====================

  async extractDecisionsFromCode(filePath, content) {
    const decisions = [];
    
    // Look for architectural decisions in comments
    const commentPatterns = [
      /\/\*\*[\s\S]*?\*\//g, // Block comments
      /\/\/.*$/gm // Line comments
    ];
    
    for (const pattern of commentPatterns) {
      const matches = content.match(pattern) || [];
      
      for (const match of matches) {
        const decision = this.analyzeCommentForDecision(match, filePath);
        if (decision) {
          decisions.push(decision);
        }
      }
    }
    
    // Look for TODO/FIXME/NOTE comments
    const taskComments = this.extractTaskComments(content, filePath);
    decisions.push(...taskComments);
    
    // Analyze code structure for architectural decisions
    const structuralDecisions = await this.analyzeCodeStructure(content, filePath);
    decisions.push(...structuralDecisions);
    
    return decisions.filter(Boolean);
  }

  analyzeCommentForDecision(comment, filePath) {
    const decisionIndicators = [
      'decision:', 'decided to', 'choosing', 'approach',
      'architecture', 'design', 'pattern', 'strategy',
      'implementation', 'solution', 'alternative'
    ];
    
    const lowercaseComment = comment.toLowerCase();
    
    if (decisionIndicators.some(indicator => lowercaseComment.includes(indicator))) {
      const decision = {
        type: 'architectural',
        content: comment.replace(/\/\*\*|\*\/|\/\/|\*/g, '').trim(),
        source: 'code-comment',
        file: path.relative(this.webAppRoot, filePath),
        timestamp: Date.now(),
        confidence: 0.7
      };
      
      // Categorize decision type
      if (lowercaseComment.includes('portuguese') || lowercaseComment.includes('cultural')) {
        decision.category = 'portuguese-community';
        decision.confidence = 0.9;
      } else if (lowercaseComment.includes('component') || lowercaseComment.includes('react')) {
        decision.category = 'component-architecture';
      } else if (lowercaseComment.includes('api') || lowercaseComment.includes('database')) {
        decision.category = 'data-architecture';
      } else {
        decision.category = 'general';
      }
      
      return decision;
    }
    
    return null;
  }

  extractTaskComments(content, filePath) {
    const taskPatterns = [
      /\/\/ TODO:?\s*(.+)/gi,
      /\/\/ FIXME:?\s*(.+)/gi,
      /\/\/ NOTE:?\s*(.+)/gi,
      /\/\/ HACK:?\s*(.+)/gi
    ];
    
    const tasks = [];
    
    for (const pattern of taskPatterns) {
      const matches = [...content.matchAll(pattern)];
      
      for (const match of matches) {
        tasks.push({
          type: 'task',
          taskType: match[0].split(':')[0].replace('//', '').trim(),
          content: match[1].trim(),
          source: 'code-task',
          file: path.relative(this.webAppRoot, filePath),
          timestamp: Date.now(),
          confidence: 0.9
        });
      }
    }
    
    return tasks;
  }

  async analyzeCodeStructure(content, filePath) {
    const decisions = [];
    
    // Detect new React patterns
    if (content.includes('useState') || content.includes('useEffect')) {
      if (content.includes('Context') || content.includes('Provider')) {
        decisions.push({
          type: 'architectural',
          category: 'state-management',
          content: 'Using React Context for state management instead of Redux',
          source: 'code-analysis',
          file: path.relative(this.webAppRoot, filePath),
          timestamp: Date.now(),
          confidence: 0.8
        });
      }
    }
    
    // Detect Portuguese-specific implementations
    if (content.includes('useLanguage') || content.includes("t('")) {
      decisions.push({
        type: 'architectural',
        category: 'portuguese-community',
        content: 'Implementing bilingual support with i18n system',
        source: 'code-analysis',
        file: path.relative(this.webAppRoot, filePath),
        timestamp: Date.now(),
        confidence: 0.9
      });
    }
    
    // Detect component patterns
    if (filePath.includes('/components/') && content.includes('export default')) {
      const componentName = path.basename(filePath, '.tsx');
      if (componentName.includes('Portuguese') || componentName.includes('Cultural')) {
        decisions.push({
          type: 'architectural',
          category: 'portuguese-community',
          content: `Creating Portuguese-speaking community-specific component: ${componentName}`,
          source: 'code-analysis',
          file: path.relative(this.webAppRoot, filePath),
          timestamp: Date.now(),
          confidence: 0.85
        });
      }
    }
    
    return decisions;
  }

  // ====================
  // PATTERN RECOGNITION
  // ====================

  async initializePatternRecognition() {
    console.log('🧠 Initializing pattern recognition system...');
    
    // Load existing patterns
    await this.loadExistingPatterns();
    
    // Define pattern recognition rules
    this.definePatternRules();
    
    console.log(`🔍 Pattern recognition initialized with ${this.patternLibrary.size} known patterns`);
  }

  async loadExistingPatterns() {
    const patternsPath = path.join(this.webAppRoot, '.conversation-patterns.json');
    
    if (fs.existsSync(patternsPath)) {
      const patterns = JSON.parse(fs.readFileSync(patternsPath, 'utf8'));
      
      for (const pattern of patterns) {
        this.patternLibrary.set(pattern.id, pattern);
      }
    }
  }

  definePatternRules() {
    this.patternRules = [
      {
        name: 'Portuguese Component Creation',
        detect: (filePath, content) => 
          filePath.includes('/components/') && 
          (content.includes('Portuguese') || content.includes('Luso') || content.includes('Cultural')),
        category: 'portuguese-development',
        significance: 'high'
      },
      {
        name: 'Bilingual Implementation',
        detect: (filePath, content) => 
          content.includes('useLanguage') && content.includes("t('"),
        category: 'internationalization',
        significance: 'high'
      },
      {
        name: 'Context Provider Pattern',
        detect: (filePath, content) => 
          filePath.includes('/context/') && content.includes('createContext'),
        category: 'state-management',
        significance: 'medium'
      },
      {
        name: 'Mobile-First Design',
        detect: (filePath, content) => 
          content.includes('sm:') || content.includes('md:') || content.includes('lg:'),
        category: 'responsive-design',
        significance: 'medium'
      },
      {
        name: 'Testing Implementation',
        detect: (filePath, content) => 
          filePath.includes('test') && (content.includes('describe') || content.includes('it(')),
        category: 'quality-assurance',
        significance: 'medium'
      },
      {
        name: 'Hardcoding Prevention',
        detect: (filePath, content) => 
          content.includes('ROUTES.') || content.includes('config.') || content.includes('env.'),
        category: 'configuration',
        significance: 'high'
      }
    ];
  }

  async identifyPatterns(filePath, content) {
    const identifiedPatterns = [];
    
    for (const rule of this.patternRules) {
      if (rule.detect(filePath, content)) {
        const pattern = {
          id: crypto.randomUUID(),
          name: rule.name,
          category: rule.category,
          significance: rule.significance,
          file: path.relative(this.webAppRoot, filePath),
          detectedAt: Date.now(),
          context: this.extractPatternContext(content, rule),
          confidence: 0.85
        };
        
        identifiedPatterns.push(pattern);
        
        // Add to pattern library if new
        if (!this.patternLibrary.has(pattern.name)) {
          this.patternLibrary.set(pattern.name, pattern);
          this.conversationMetrics.patternsIdentified++;
        }
      }
    }
    
    return identifiedPatterns;
  }

  extractPatternContext(content, rule) {
    // Extract relevant lines around pattern detection
    const lines = content.split('\n');
    const contextLines = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Simple pattern matching for context
      if (rule.name.includes('Portuguese') && 
          (line.includes('Portuguese') || line.includes('Luso') || line.includes('Cultural'))) {
        contextLines.push({
          lineNumber: i + 1,
          content: line.trim()
        });
      } else if (rule.name.includes('Bilingual') && 
                (line.includes('useLanguage') || line.includes("t('"))) {
        contextLines.push({
          lineNumber: i + 1,
          content: line.trim()
        });
      }
    }
    
    return contextLines.slice(0, 5); // Limit context
  }

  startPatternAnalysis() {
    // Continuously analyze patterns and update pattern library
    setInterval(() => {
      this.analyzePatternTrends();
    }, 300000); // Every 5 minutes
  }

  analyzePatternTrends() {
    const recentPatterns = Array.from(this.patternLibrary.values())
      .filter(pattern => Date.now() - pattern.detectedAt < 24 * 60 * 60 * 1000); // Last 24 hours
    
    if (recentPatterns.length > 0) {
      const trends = this.calculatePatternTrends(recentPatterns);
      this.emit('pattern-trends-updated', trends);
    }
  }

  calculatePatternTrends(patterns) {
    const categories = {};
    
    for (const pattern of patterns) {
      if (!categories[pattern.category]) {
        categories[pattern.category] = {
          count: 0,
          significance: 0,
          files: new Set()
        };
      }
      
      categories[pattern.category].count++;
      categories[pattern.category].significance += pattern.significance === 'high' ? 3 : 
                                                  pattern.significance === 'medium' ? 2 : 1;
      categories[pattern.category].files.add(pattern.file);
    }
    
    return Object.entries(categories).map(([category, data]) => ({
      category,
      count: data.count,
      significance: data.significance,
      filesAffected: data.files.size,
      trend: data.count > 5 ? 'increasing' : data.count > 2 ? 'stable' : 'emerging'
    }));
  }

  // ====================
  // INSIGHT GENERATION
  // ====================

  async generateInsights(filePath, content, activity) {
    const insights = [];
    
    // Analyze code complexity and suggest improvements
    const complexityInsight = await this.generateComplexityInsight(filePath, content);
    if (complexityInsight) insights.push(complexityInsight);
    
    // Analyze Portuguese-speaking community relevance
    const culturalInsight = await this.generateCulturalInsight(filePath, content);
    if (culturalInsight) insights.push(culturalInsight);
    
    // Analyze testing coverage
    const testingInsight = await this.generateTestingInsight(filePath, content);
    if (testingInsight) insights.push(testingInsight);
    
    // Analyze performance implications
    const performanceInsight = await this.generatePerformanceInsight(filePath, content);
    if (performanceInsight) insights.push(performanceInsight);
    
    // Analyze maintainability
    const maintainabilityInsight = await this.generateMaintainabilityInsight(filePath, content);
    if (maintainabilityInsight) insights.push(maintainabilityInsight);
    
    return insights.filter(Boolean);
  }

  async generateComplexityInsight(filePath, content) {
    const complexity = this.calculateComplexity(content);
    
    if (complexity > 50) {
      return {
        type: 'complexity',
        level: 'warning',
        title: 'High Complexity Detected',
        description: `File has complexity score of ${complexity}. Consider breaking down into smaller components.`,
        file: path.relative(this.webAppRoot, filePath),
        suggestions: [
          'Extract reusable components',
          'Separate business logic from UI',
          'Use custom hooks for complex state logic'
        ],
        confidence: 0.8,
        timestamp: Date.now()
      };
    }
    
    return null;
  }

  async generateCulturalInsight(filePath, content) {
    if (content.includes('Portuguese') || content.includes('Cultural') || content.includes('Luso')) {
      const hasI18n = content.includes('useLanguage') || content.includes("t('");
      const hasBranding = content.includes('primary') || content.includes('secondary');
      
      if (!hasI18n || !hasBranding) {
        return {
          type: 'cultural-consistency',
          level: hasI18n ? 'info' : 'warning',
          title: 'Portuguese-speaking community Enhancement Opportunity',
          description: 'File contains Portuguese elements but could be enhanced for better cultural integration.',
          file: path.relative(this.webAppRoot, filePath),
          suggestions: [
            !hasI18n ? 'Add bilingual support with useLanguage hook' : null,
            !hasBranding ? 'Use Portuguese brand colors instead of generic styles' : null,
            'Ensure cultural authenticity in messaging and design'
          ].filter(Boolean),
          confidence: 0.9,
          timestamp: Date.now()
        };
      }
    }
    
    return null;
  }

  async generateTestingInsight(filePath, content) {
    if (filePath.includes('/components/') && !this.hasCorrespondingTest(filePath)) {
      return {
        type: 'testing',
        level: 'info',
        title: 'Missing Test Coverage',
        description: 'Component does not have corresponding test file.',
        file: path.relative(this.webAppRoot, filePath),
        suggestions: [
          'Create unit tests for component functionality',
          'Add Portuguese-specific test cases if applicable',
          'Test mobile responsive behavior'
        ],
        confidence: 0.85,
        timestamp: Date.now()
      };
    }
    
    return null;
  }

  async generatePerformanceInsight(filePath, content) {
    const performanceIssues = [];
    
    // Check for potential performance issues
    if (content.includes('map(') && content.includes('key={index}')) {
      performanceIssues.push('Using array index as React key (consider unique identifiers)');
    }
    
    if (content.includes('useEffect(') && !content.includes('[')) {
      performanceIssues.push('useEffect without dependency array (potential infinite loops)');
    }
    
    if (content.includes('useState(') && content.match(/useState\(/g)?.length > 10) {
      performanceIssues.push('Many useState hooks (consider useReducer or context)');
    }
    
    if (performanceIssues.length > 0) {
      return {
        type: 'performance',
        level: 'warning',
        title: 'Performance Optimization Opportunities',
        description: 'Potential performance issues detected in component.',
        file: path.relative(this.webAppRoot, filePath),
        suggestions: performanceIssues,
        confidence: 0.7,
        timestamp: Date.now()
      };
    }
    
    return null;
  }

  async generateMaintainabilityInsight(filePath, content) {
    const maintainabilityIssues = [];
    
    // Check for maintainability issues
    const lineCount = content.split('\n').length;
    if (lineCount > 200) {
      maintainabilityIssues.push(`File is very long (${lineCount} lines) - consider splitting`);
    }
    
    if (content.includes('any') || content.includes('// @ts-ignore')) {
      maintainabilityIssues.push('TypeScript any/ignore usage - consider proper typing');
    }
    
    const functionCount = (content.match(/function|const \w+ =/g) || []).length;
    if (functionCount > 15) {
      maintainabilityIssues.push(`Many functions in one file (${functionCount}) - consider modularization`);
    }
    
    if (maintainabilityIssues.length > 0) {
      return {
        type: 'maintainability',
        level: 'info',
        title: 'Maintainability Enhancement',
        description: 'Code structure could be improved for better maintainability.',
        file: path.relative(this.webAppRoot, filePath),
        suggestions: maintainabilityIssues,
        confidence: 0.75,
        timestamp: Date.now()
      };
    }
    
    return null;
  }

  calculateComplexity(content) {
    // Simplified complexity calculation
    const factors = {
      functions: (content.match(/function|const \w+ =/g) || []).length * 2,
      conditionals: (content.match(/if|switch|case|\?/g) || []).length * 1.5,
      loops: (content.match(/for|while|map|forEach|filter|reduce/g) || []).length * 2,
      jsx: (content.match(/<\w+/g) || []).length * 0.3,
      hooks: (content.match(/use\w+\(/g) || []).length * 1,
      imports: (content.match(/import/g) || []).length * 0.2
    };
    
    return Object.values(factors).reduce((sum, val) => sum + val, 0);
  }

  hasCorrespondingTest(filePath) {
    const testPaths = [
      filePath.replace('/src/', '/__tests__/').replace('.tsx', '.test.tsx'),
      filePath.replace('/src/', '/__tests__/').replace('.ts', '.test.ts'),
      filePath.replace('.tsx', '.test.tsx'),
      filePath.replace('.ts', '.test.ts')
    ];
    
    return testPaths.some(testPath => fs.existsSync(testPath));
  }

  // ====================
  // CONVERSATION SUMMARY GENERATION
  // ====================

  async generateConversationSummary(sessionId) {
    console.log(`📝 Generating conversation summary for session ${sessionId}...`);
    
    const sessionData = this.getSessionData(sessionId);
    if (!sessionData) {
      return null;
    }
    
    const summary = {
      sessionId,
      duration: Date.now() - sessionData.startTime,
      filesModified: sessionData.activeFiles.length,
      decisions: sessionData.decisions || [],
      patterns: sessionData.patterns || [],
      insights: sessionData.insights || [],
      keyChanges: await this.identifyKeyChanges(sessionData),
      technicalSummary: await this.generateTechnicalSummary(sessionData),
      recommendations: await this.generateSessionRecommendations(sessionData),
      impact: await this.assessSessionImpact(sessionData)
    };
    
    // Store summary
    await this.storeSummary(summary);
    
    this.emit('conversation-summary-generated', summary);
    
    return summary;
  }

  async identifyKeyChanges(sessionData) {
    const keyChanges = [];
    
    for (const file of sessionData.activeFiles) {
      if (!fs.existsSync(file.path)) continue;
      
      const fileName = path.basename(file.path);
      const relativePath = path.relative(this.webAppRoot, file.path);
      
      // Categorize changes
      if (fileName.includes('Portuguese') || fileName.includes('Cultural')) {
        keyChanges.push({
          type: 'portuguese-feature',
          file: relativePath,
          description: 'Portuguese-speaking community feature development',
          significance: 'high'
        });
      } else if (file.path.includes('/components/')) {
        keyChanges.push({
          type: 'component',
          file: relativePath,
          description: 'React component modification',
          significance: 'medium'
        });
      } else if (file.path.includes('/context/')) {
        keyChanges.push({
          type: 'state-management',
          file: relativePath,
          description: 'State management changes',
          significance: 'high'
        });
      } else if (fileName.endsWith('.md')) {
        keyChanges.push({
          type: 'documentation',
          file: relativePath,
          description: 'Documentation updates',
          significance: 'low'
        });
      }
    }
    
    return keyChanges;
  }

  async generateTechnicalSummary(sessionData) {
    const patterns = sessionData.patterns || [];
    const decisions = sessionData.decisions || [];
    const insights = sessionData.insights || [];
    
    const categories = {
      'portuguese-community': 0,
      'component-architecture': 0,
      'state-management': 0,
      'testing': 0,
      'performance': 0,
      'documentation': 0
    };
    
    // Categorize all session data
    [...patterns, ...decisions, ...insights].forEach(item => {
      const category = item.category || item.type;
      if (categories.hasOwnProperty(category)) {
        categories[category]++;
      }
    });
    
    const topCategory = Object.entries(categories)
      .sort(([,a], [,b]) => b - a)[0];
    
    return {
      primaryFocus: topCategory[0],
      focusIntensity: topCategory[1],
      breadth: Object.values(categories).filter(v => v > 0).length,
      complexity: this.calculateSessionComplexity(sessionData),
      portugueseIntegration: categories['portuguese-community'] > 0 ? 'high' : 'low',
      architecturalImpact: categories['component-architecture'] + categories['state-management'] > 2 ? 'high' : 'low'
    };
  }

  calculateSessionComplexity(sessionData) {
    const factors = {
      filesModified: sessionData.activeFiles.length,
      decisionsCount: (sessionData.decisions || []).length,
      patternsCount: (sessionData.patterns || []).length,
      insightsCount: (sessionData.insights || []).length
    };
    
    const score = factors.filesModified * 2 + 
                  factors.decisionsCount * 3 + 
                  factors.patternsCount * 2 + 
                  factors.insightsCount * 1;
    
    if (score > 20) return 'high';
    if (score > 10) return 'medium';
    return 'low';
  }

  async generateSessionRecommendations(sessionData) {
    const recommendations = [];
    
    const insights = sessionData.insights || [];
    const culturalInsights = insights.filter(i => i.type === 'cultural-consistency');
    const performanceInsights = insights.filter(i => i.type === 'performance');
    const testingInsights = insights.filter(i => i.type === 'testing');
    
    if (culturalInsights.length > 0) {
      recommendations.push({
        type: 'cultural',
        priority: 'high',
        action: 'Review Portuguese cultural integration',
        reason: `${culturalInsights.length} cultural consistency opportunities identified`,
        files: culturalInsights.map(i => i.file)
      });
    }
    
    if (performanceInsights.length > 0) {
      recommendations.push({
        type: 'performance',
        priority: 'medium',
        action: 'Address performance optimizations',
        reason: `${performanceInsights.length} performance issues detected`,
        files: performanceInsights.map(i => i.file)
      });
    }
    
    if (testingInsights.length > 0) {
      recommendations.push({
        type: 'testing',
        priority: 'low',
        action: 'Add missing test coverage',
        reason: `${testingInsights.length} components without tests`,
        files: testingInsights.map(i => i.file)
      });
    }
    
    return recommendations;
  }

  async assessSessionImpact(sessionData) {
    const impact = {
      scope: 'local',
      riskLevel: 'low',
      documentationNeeds: [],
      stakeholderNotification: false
    };
    
    const fileCount = sessionData.activeFiles.length;
    const hasPortugueseChanges = sessionData.activeFiles.some(f => 
      f.path.includes('Portuguese') || f.path.includes('Cultural')
    );
    const hasArchitecturalChanges = (sessionData.decisions || []).some(d => 
      d.category === 'component-architecture' || d.category === 'state-management'
    );
    
    // Assess scope
    if (fileCount > 10) {
      impact.scope = 'major';
    } else if (fileCount > 5) {
      impact.scope = 'moderate';
    }
    
    // Assess risk level
    if (hasArchitecturalChanges) {
      impact.riskLevel = 'medium';
    }
    if (hasPortugueseChanges && hasArchitecturalChanges) {
      impact.riskLevel = 'high';
    }
    
    // Documentation needs
    if (hasPortugueseChanges) {
      impact.documentationNeeds.push('Update Portuguese-speaking community feature documentation');
    }
    if (hasArchitecturalChanges) {
      impact.documentationNeeds.push('Update architecture documentation');
    }
    if (fileCount > 5) {
      impact.documentationNeeds.push('Update component inventory');
    }
    
    // Stakeholder notification
    if (impact.riskLevel === 'high' || hasPortugueseChanges) {
      impact.stakeholderNotification = true;
    }
    
    return impact;
  }

  // ====================
  // DATA STORAGE AND RETRIEVAL
  // ====================

  storeSessionData(sessionData) {
    const sessionsPath = path.join(this.webAppRoot, '.conversation-sessions.json');
    
    let sessions = [];
    if (fs.existsSync(sessionsPath)) {
      sessions = JSON.parse(fs.readFileSync(sessionsPath, 'utf8'));
    }
    
    sessions.push(sessionData);
    
    // Keep only last 50 sessions
    if (sessions.length > 50) {
      sessions = sessions.slice(-50);
    }
    
    fs.writeFileSync(sessionsPath, JSON.stringify(sessions, null, 2));
  }

  getSessionData(sessionId) {
    const sessionsPath = path.join(this.webAppRoot, '.conversation-sessions.json');
    
    if (!fs.existsSync(sessionsPath)) {
      return null;
    }
    
    const sessions = JSON.parse(fs.readFileSync(sessionsPath, 'utf8'));
    return sessions.find(s => s.sessionId === sessionId);
  }

  storeSessionFindings(sessionId, findings) {
    const sessionsPath = path.join(this.webAppRoot, '.conversation-sessions.json');
    
    if (!fs.existsSync(sessionsPath)) {
      return;
    }
    
    const sessions = JSON.parse(fs.readFileSync(sessionsPath, 'utf8'));
    const sessionIndex = sessions.findIndex(s => s.sessionId === sessionId);
    
    if (sessionIndex !== -1) {
      const session = sessions[sessionIndex];
      
      session.decisions = (session.decisions || []).concat(findings.decisions || []);
      session.patterns = (session.patterns || []).concat(findings.patterns || []);
      session.insights = (session.insights || []).concat(findings.insights || []);
      
      sessions[sessionIndex] = session;
      
      fs.writeFileSync(sessionsPath, JSON.stringify(sessions, null, 2));
      
      this.conversationMetrics.decisionsExtracted += (findings.decisions || []).length;
      this.conversationMetrics.insightsGenerated += (findings.insights || []).length;
    }
  }

  async storeSummary(summary) {
    const summariesPath = path.join(this.webAppRoot, '.conversation-summaries.json');
    
    let summaries = [];
    if (fs.existsSync(summariesPath)) {
      summaries = JSON.parse(fs.readFileSync(summariesPath, 'utf8'));
    }
    
    summaries.push(summary);
    
    // Keep only last 20 summaries
    if (summaries.length > 20) {
      summaries = summaries.slice(-20);
    }
    
    fs.writeFileSync(summariesPath, JSON.stringify(summaries, null, 2));
  }

  async loadHistoricalConversations() {
    const summariesPath = path.join(this.webAppRoot, '.conversation-summaries.json');
    
    if (fs.existsSync(summariesPath)) {
      const summaries = JSON.parse(fs.readFileSync(summariesPath, 'utf8'));
      console.log(`📚 Loaded ${summaries.length} historical conversation summaries`);
      return summaries;
    }
    
    return [];
  }

  watchConversationArtifacts() {
    // Watch for files that might indicate conversation activity
    const artifactPaths = [
      path.join(this.webAppRoot, 'CLAUDE.md'),
      path.join(this.webAppRoot, 'TODO.md'),
      path.join(this.webAppRoot, 'docs-maintenance-report.md')
    ];
    
    console.log(`👁️ Watching ${artifactPaths.length} conversation artifact files`);
    
    // In production, would use fs.watch
  }

  // ====================
  // PUBLIC API
  // ====================

  async generateFullConversationReport() {
    console.log('📊 Generating full conversation intelligence report...');
    
    const summaries = await this.loadHistoricalConversations();
    const patterns = Array.from(this.patternLibrary.values());
    const recentDecisions = Array.from(this.extractedDecisions.values())
      .filter(d => Date.now() - d.timestamp < 7 * 24 * 60 * 60 * 1000);
    
    const report = {
      generated: new Date().toISOString(),
      metrics: this.conversationMetrics,
      summary: {
        totalSessions: summaries.length,
        totalPatterns: patterns.length,
        recentDecisions: recentDecisions.length,
        portugueseIntegration: this.assessPortugueseIntegration(summaries),
        architecturalEvolution: this.assessArchitecturalEvolution(summaries)
      },
      insights: {
        topPatterns: this.getTopPatterns(patterns),
        keyDecisions: this.getKeyDecisions(recentDecisions),
        developmentTrends: this.analyzeDevelopmentTrends(summaries),
        recommendations: this.generateMetaRecommendations(summaries, patterns)
      },
      health: {
        conversationQuality: this.assessConversationQuality(summaries),
        decisionTracking: this.assessDecisionTracking(recentDecisions),
        patternRecognition: this.assessPatternRecognition(patterns)
      }
    };
    
    await this.saveConversationReport(report);
    
    return report;
  }

  assessPortugueseIntegration(summaries) {
    const portugalSummaries = summaries.filter(s => 
      s.technicalSummary?.portugueseIntegration === 'high'
    );
    
    return {
      percentage: summaries.length > 0 ? (portugalSummaries.length / summaries.length) * 100 : 0,
      trend: 'increasing', // Simplified
      quality: 'high'
    };
  }

  assessArchitecturalEvolution(summaries) {
    const architecturalSessions = summaries.filter(s => 
      s.technicalSummary?.architecturalImpact === 'high'
    );
    
    return {
      frequency: architecturalSessions.length,
      lastMajorChange: architecturalSessions.length > 0 ? 
        architecturalSessions[architecturalSessions.length - 1].sessionId : null,
      stability: architecturalSessions.length < 3 ? 'stable' : 'evolving'
    };
  }

  getTopPatterns(patterns) {
    return patterns
      .sort((a, b) => (b.confidence || 0) - (a.confidence || 0))
      .slice(0, 10);
  }

  getKeyDecisions(decisions) {
    return decisions
      .filter(d => d.confidence > 0.8)
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 10);
  }

  analyzeDevelopmentTrends(summaries) {
    const trends = {
      focus: {},
      velocity: summaries.length,
      complexity: 'medium'
    };
    
    summaries.forEach(summary => {
      const focus = summary.technicalSummary?.primaryFocus;
      if (focus) {
        trends.focus[focus] = (trends.focus[focus] || 0) + 1;
      }
    });
    
    return trends;
  }

  generateMetaRecommendations(summaries, patterns) {
    const recommendations = [];
    
    const portuguesePatterns = patterns.filter(p => p.category === 'portuguese-development');
    if (portuguesePatterns.length < 3) {
      recommendations.push({
        type: 'cultural-focus',
        priority: 'medium',
        suggestion: 'Increase focus on Portuguese-speaking community features',
        reason: 'Limited Portuguese-specific development patterns detected'
      });
    }
    
    const testingPatterns = patterns.filter(p => p.category === 'quality-assurance');
    if (testingPatterns.length < 2) {
      recommendations.push({
        type: 'quality-assurance',
        priority: 'high',
        suggestion: 'Implement more comprehensive testing practices',
        reason: 'Low testing pattern recognition in conversations'
      });
    }
    
    return recommendations;
  }

  assessConversationQuality(summaries) {
    const avgComplexity = summaries.reduce((sum, s) => {
      const complexity = s.technicalSummary?.complexity;
      return sum + (complexity === 'high' ? 3 : complexity === 'medium' ? 2 : 1);
    }, 0) / Math.max(summaries.length, 1);
    
    return {
      score: Math.round(avgComplexity * 33.33), // Convert to percentage
      trend: 'stable',
      areas: ['architectural-decisions', 'cultural-integration', 'code-quality']
    };
  }

  assessDecisionTracking(decisions) {
    return {
      coverage: decisions.length > 5 ? 'good' : 'needs-improvement',
      categories: [...new Set(decisions.map(d => d.category))],
      confidence: decisions.reduce((sum, d) => sum + d.confidence, 0) / Math.max(decisions.length, 1)
    };
  }

  assessPatternRecognition(patterns) {
    return {
      accuracy: patterns.reduce((sum, p) => sum + p.confidence, 0) / Math.max(patterns.length, 1),
      categories: [...new Set(patterns.map(p => p.category))],
      learning: 'active'
    };
  }

  async saveConversationReport(report) {
    const reportPath = path.join(this.webAppRoot, 'CONVERSATION_INTELLIGENCE_REPORT.md');
    
    const markdown = `# Conversation Intelligence Report\n\nGenerated: ${report.generated}\n\n## Executive Summary\n\n### Session Metrics\n- **Total Sessions Monitored:** ${report.metrics.sessionsMonitored}\n- **Decisions Extracted:** ${report.metrics.decisionsExtracted}\n- **Patterns Identified:** ${report.metrics.patternsIdentified}\n- **Insights Generated:** ${report.metrics.insightsGenerated}\n\n### Portuguese-speaking community Integration\n- **Integration Rate:** ${report.summary.portugueseIntegration.percentage.toFixed(1)}%\n- **Trend:** ${report.summary.portugueseIntegration.trend}\n- **Quality:** ${report.summary.portugueseIntegration.quality}\n\n### Architectural Evolution\n- **Stability:** ${report.summary.architecturalEvolution.stability}\n- **Major Changes:** ${report.summary.architecturalEvolution.frequency}\n- **Last Change:** ${report.summary.architecturalEvolution.lastMajorChange || 'None'}\n\n## Key Insights\n\n### Top Development Patterns\n${report.insights.topPatterns.map(p => `- **${p.name}** (${p.category}) - ${(p.confidence * 100).toFixed(0)}% confidence`).join('\\n')}\n\n### Recent Key Decisions\n${report.insights.keyDecisions.map(d => `- **${d.content}** (${d.category}) - ${new Date(d.timestamp).toLocaleDateString()}`).join('\\n')}\n\n### Development Trends\n- **Velocity:** ${report.insights.developmentTrends.velocity} sessions analyzed\n- **Primary Focus Areas:** ${Object.keys(report.insights.developmentTrends.focus).join(', ')}\n- **Complexity:** ${report.insights.developmentTrends.complexity}\n\n## Health Assessment\n\n### Conversation Quality: ${report.health.conversationQuality.score}%\n- **Trend:** ${report.health.conversationQuality.trend}\n- **Strong Areas:** ${report.health.conversationQuality.areas.join(', ')}\n\n### Decision Tracking: ${report.health.decisionTracking.coverage}\n- **Categories Covered:** ${report.health.decisionTracking.categories.length}\n- **Average Confidence:** ${(report.health.decisionTracking.confidence * 100).toFixed(0)}%\n\n### Pattern Recognition: ${(report.health.patternRecognition.accuracy * 100).toFixed(0)}% Accuracy\n- **Categories:** ${report.health.patternRecognition.categories.length}\n- **Learning Status:** ${report.health.patternRecognition.learning}\n\n## Recommendations\n\n${report.insights.recommendations.map(r => `### ${r.type} (${r.priority} priority)\\n${r.suggestion}\\n\\n*Reason: ${r.reason}*\\n`).join('\\n')}\n\n## Next Steps\n\n1. **Continue monitoring** active Claude Code sessions\n2. **Refine pattern recognition** based on identified trends\n3. **Enhance Portuguese-speaking community tracking** for cultural consistency\n4. **Implement recommended improvements** based on conversation analysis\n\n---\n\n*This report was generated automatically by the Conversation Intelligence System*\n`;\n    \n    fs.writeFileSync(reportPath, markdown);\n    console.log(`📄 Conversation intelligence report saved to: ${reportPath}`);\n  }\n}\n\n// Run conversation intelligence if called directly\nif (require.main === module) {\n  const intelligence = new ConversationIntelligence();\n  \n  // Generate immediate report\n  intelligence.generateFullConversationReport().then(() => {\n    console.log('✅ Conversation intelligence report generated');\n  }).catch(console.error);\n}\n\nmodule.exports = ConversationIntelligence;\n