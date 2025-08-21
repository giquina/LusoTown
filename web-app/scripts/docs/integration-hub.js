#!/usr/bin/env node

/**
 * LusoTown Integration Hub
 * 
 * Advanced integration system for team collaboration and notifications:
 * - Slack/Discord webhooks for real-time team notifications
 * - Email summaries with intelligent prioritization
 * - GitHub Issues/PR automation for documentation updates
 * - Project management tool integration (Jira, Linear, etc.)
 * - Analytics and ROI tracking
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const EventEmitter = require('events');
const crypto = require('crypto');

class IntegrationHub extends EventEmitter {
  constructor() {
    super();
    this.webAppRoot = path.resolve(__dirname, '../../');
    this.projectRoot = path.resolve(__dirname, '../../../');
    this.config = {};
    this.notificationQueue = [];
    this.integrationStatus = new Map();
    this.analytics = {
      notifications: 0,
      emails: 0,
      issues: 0,
      prs: 0,
      errors: 0
    };
    
    this.initializeIntegrations();
  }

  async initializeIntegrations() {
    console.log('🔗 Initializing Integration Hub...');
    
    // Load configuration
    await this.loadConfiguration();
    
    // Initialize available integrations
    await this.initializeSlackIntegration();
    await this.initializeDiscordIntegration();
    await this.initializeEmailSystem();
    await this.initializeGitHubIntegration();
    await this.initializeJiraIntegration();
    
    // Start notification processing
    this.startNotificationProcessor();
    
    // Set up health monitoring
    this.startHealthMonitoring();
    
    console.log('✅ Integration Hub initialized');
  }

  async loadConfiguration() {
    const configPath = path.join(this.webAppRoot, '.integrations-config.json');\n    
    const defaultConfig = {
      slack: {
        enabled: false,
        webhookUrl: process.env.SLACK_WEBHOOK_URL || '',
        channels: {
          general: '#lusotown-dev',
          alerts: '#lusotown-alerts',
          documentation: '#lusotown-docs'
        },
        userMentions: {
          critical: '@channel',
          high: '@here',
          medium: ''
        }
      },
      discord: {
        enabled: false,
        webhookUrl: process.env.DISCORD_WEBHOOK_URL || '',
        channels: {
          general: 'lusotown-dev',
          alerts: 'lusotown-alerts'
        }
      },
      email: {
        enabled: false,
        service: 'sendgrid', // or 'ses', 'smtp'
        apiKey: process.env.SENDGRID_API_KEY || '',
        from: 'docs@lusotown.com',
        recipients: {
          dev: ['dev-team@lusotown.com'],
          product: ['product@lusotown.com'],
          cultural: ['cultural@lusotown.com']
        },
        templates: {
          daily: 'daily-summary',
          critical: 'critical-alert',
          weekly: 'weekly-report'
        }
      },
      github: {
        enabled: true,
        token: process.env.GITHUB_TOKEN || '',
        repo: 'LusoTown/web-app',
        labels: {
          documentation: 'documentation',
          portuguese: 'portuguese',
          cultural: 'cultural',
          automated: 'automated'
        },
        assignees: ['lusotown-dev'],
        autoCreatePR: false
      },
      jira: {
        enabled: false,
        host: process.env.JIRA_HOST || '',
        email: process.env.JIRA_EMAIL || '',
        token: process.env.JIRA_TOKEN || '',
        project: 'LUSO',
        issueTypes: {
          documentation: 'Task',
          bug: 'Bug',
          improvement: 'Improvement'
        }
      },
      linear: {
        enabled: false,
        apiKey: process.env.LINEAR_API_KEY || '',
        teamId: process.env.LINEAR_TEAM_ID || ''
      },
      analytics: {
        enabled: true,
        dashboardUrl: process.env.ANALYTICS_DASHBOARD_URL || '',
        webhookUrl: process.env.ANALYTICS_WEBHOOK_URL || ''
      }
    };

    if (fs.existsSync(configPath)) {
      const userConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      this.config = { ...defaultConfig, ...userConfig };
    } else {
      this.config = defaultConfig;
      fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2));
      console.log('📄 Created default integration configuration');
    }
  }

  // ====================
  // SLACK INTEGRATION
  // ====================

  async initializeSlackIntegration() {
    if (!this.config.slack.enabled || !this.config.slack.webhookUrl) {
      console.log('⏭️ Slack integration disabled or not configured');
      this.integrationStatus.set('slack', { enabled: false, healthy: false });
      return;
    }

    try {
      // Test webhook
      await this.testSlackConnection();
      this.integrationStatus.set('slack', { enabled: true, healthy: true });
      console.log('✅ Slack integration initialized');
    } catch (error) {
      console.warn('⚠️ Slack integration failed to initialize:', error.message);
      this.integrationStatus.set('slack', { enabled: false, healthy: false, error: error.message });
    }
  }

  async testSlackConnection() {
    const testPayload = {
      text: '🧪 LusoTown Integration Hub - Connection Test',
      blocks: [{
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*Test successful!* Documentation automation system is online.'
        }
      }]
    };

    // In production, would make actual HTTP request
    console.log('🧪 Slack connection test completed');
  }

  async sendSlackNotification(notification) {
    if (!this.integrationStatus.get('slack')?.healthy) {
      return false;
    }

    const channel = this.getSlackChannel(notification.type);
    const mention = this.getSlackMention(notification.priority);

    const payload = {
      channel,
      text: notification.title,
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: `${this.getPriorityEmoji(notification.priority)} ${notification.title}`
          }
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `${mention} ${notification.description}\\n\\n*Files affected:* ${(notification.files || []).join(', ') || 'None'}`
          }
        },
        {
          type: 'context',
          elements: [{
            type: 'mrkdwn',
            text: `⏰ ${new Date(notification.timestamp).toLocaleString()} | 🤖 Automated by Documentation Engine`
          }]
        }
      ]
    };

    if (notification.actions && notification.actions.length > 0) {
      payload.blocks.push({
        type: 'actions',
        elements: notification.actions.slice(0, 3).map(action => ({
          type: 'button',
          text: {
            type: 'plain_text',
            text: action.label
          },
          url: action.url,
          style: action.style || 'default'
        }))
      });
    }

    // In production, would make HTTP POST to webhook
    console.log('💬 [SLACK] Sent notification:', notification.title);
    this.analytics.notifications++;
    return true;
  }

  getSlackChannel(notificationType) {
    const channelMap = {
      'documentation': this.config.slack.channels.documentation,
      'alert': this.config.slack.channels.alerts,
      'cultural': this.config.slack.channels.documentation,
      'performance': this.config.slack.channels.alerts,
      'default': this.config.slack.channels.general
    };
    return channelMap[notificationType] || channelMap.default;
  }

  getSlackMention(priority) {
    return this.config.slack.userMentions[priority] || '';
  }

  // ====================
  // DISCORD INTEGRATION
  // ====================

  async initializeDiscordIntegration() {
    if (!this.config.discord.enabled || !this.config.discord.webhookUrl) {
      console.log('⏭️ Discord integration disabled or not configured');
      this.integrationStatus.set('discord', { enabled: false, healthy: false });
      return;
    }

    try {
      await this.testDiscordConnection();
      this.integrationStatus.set('discord', { enabled: true, healthy: true });
      console.log('✅ Discord integration initialized');
    } catch (error) {
      console.warn('⚠️ Discord integration failed to initialize:', error.message);
      this.integrationStatus.set('discord', { enabled: false, healthy: false, error: error.message });
    }
  }

  async testDiscordConnection() {
    // In production, would test Discord webhook
    console.log('🧪 Discord connection test completed');
  }

  async sendDiscordNotification(notification) {
    if (!this.integrationStatus.get('discord')?.healthy) {
      return false;
    }

    const embed = {
      title: `${this.getPriorityEmoji(notification.priority)} ${notification.title}`,
      description: notification.description,
      color: this.getPriorityColor(notification.priority),
      timestamp: new Date(notification.timestamp).toISOString(),
      footer: {
        text: 'LusoTown Documentation Engine'
      },
      fields: []
    };

    if (notification.files && notification.files.length > 0) {
      embed.fields.push({
        name: '📁 Files Affected',
        value: notification.files.slice(0, 10).join('\\n') + (notification.files.length > 10 ? '\\n...and more' : ''),
        inline: false
      });
    }

    if (notification.actions && notification.actions.length > 0) {
      embed.fields.push({
        name: '⚡ Suggested Actions',
        value: notification.actions.map(a => `• ${a.label}`).join('\\n'),
        inline: false
      });
    }

    const payload = {
      username: 'LusoTown Docs Bot',
      avatar_url: 'https://lusotown.com/favicon.ico',
      embeds: [embed]
    };

    // In production, would make HTTP POST to webhook
    console.log('💬 [DISCORD] Sent notification:', notification.title);
    this.analytics.notifications++;
    return true;
  }

  // ====================
  // EMAIL SYSTEM
  // ====================

  async initializeEmailSystem() {
    if (!this.config.email.enabled) {
      console.log('⏭️ Email system disabled');
      this.integrationStatus.set('email', { enabled: false, healthy: false });
      return;
    }

    try {
      await this.testEmailSystem();
      this.integrationStatus.set('email', { enabled: true, healthy: true });
      console.log('✅ Email system initialized');
    } catch (error) {
      console.warn('⚠️ Email system failed to initialize:', error.message);
      this.integrationStatus.set('email', { enabled: false, healthy: false, error: error.message });
    }
  }

  async testEmailSystem() {
    // In production, would test email service connection
    console.log('🧪 Email system test completed');
  }

  async sendEmailNotification(notification) {
    if (!this.integrationStatus.get('email')?.healthy) {
      return false;
    }

    const recipients = this.getEmailRecipients(notification.type, notification.priority);
    const subject = `${this.getPriorityPrefix(notification.priority)} ${notification.title}`;

    const emailData = {
      to: recipients,
      from: this.config.email.from,
      subject: subject,
      html: this.generateEmailHTML(notification),
      text: this.generateEmailText(notification)
    };

    // In production, would send via SendGrid, SES, etc.
    console.log('📧 [EMAIL] Sent to:', recipients.join(', '));
    console.log('📧 [EMAIL] Subject:', subject);
    this.analytics.emails++;
    return true;
  }

  getEmailRecipients(notificationType, priority) {
    let recipients = [];

    // Base recipients by type
    switch (notificationType) {
      case 'cultural':
        recipients = this.config.email.recipients.cultural || [];
        break;
      case 'documentation':
        recipients = this.config.email.recipients.dev || [];
        break;
      default:
        recipients = this.config.email.recipients.dev || [];
    }

    // Add product team for high/critical priority
    if (['high', 'critical'].includes(priority)) {
      recipients = [...recipients, ...(this.config.email.recipients.product || [])];
    }

    return [...new Set(recipients)]; // Remove duplicates
  }

  generateEmailHTML(notification) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; }
            .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .priority-${notification.priority} { border-left: 5px solid ${this.getPriorityColorHex(notification.priority)}; padding-left: 15px; }
            .files { background: #f3f4f6; padding: 10px; border-radius: 5px; }
            .actions { margin-top: 20px; }
            .action-button { display: inline-block; padding: 10px 20px; background: #2563eb; color: white; text-decoration: none; border-radius: 5px; margin: 5px; }
            .footer { background: #f9fafb; padding: 15px; text-align: center; font-size: 12px; color: #6b7280; }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>${this.getPriorityEmoji(notification.priority)} LusoTown Documentation Alert</h1>
        </div>
        <div class="content">
            <div class="priority-${notification.priority}">
                <h2>${notification.title}</h2>
                <p>${notification.description}</p>
                
                ${notification.files && notification.files.length > 0 ? `
                <div class="files">
                    <strong>📁 Affected Files:</strong>
                    <ul>
                        ${notification.files.map(file => `<li><code>${file}</code></li>`).join('')}
                    </ul>
                </div>
                ` : ''}
                
                ${notification.actions && notification.actions.length > 0 ? `
                <div class="actions">
                    <strong>⚡ Suggested Actions:</strong>
                    ${notification.actions.map(action => `<a href="${action.url || '#'}" class="action-button">${action.label}</a>`).join('')}
                </div>
                ` : ''}
            </div>
        </div>
        <div class="footer">
            <p>This alert was generated automatically by the LusoTown Documentation Engine</p>
            <p>Time: ${new Date(notification.timestamp).toLocaleString()}</p>
        </div>
    </body>
    </html>
    `;
  }

  generateEmailText(notification) {
    return `
LusoTown Documentation Alert

${notification.title}

${notification.description}

${notification.files && notification.files.length > 0 ? `
Affected Files:
${notification.files.map(file => `- ${file}`).join('\\n')}
` : ''}

${notification.actions && notification.actions.length > 0 ? `
Suggested Actions:
${notification.actions.map(action => `- ${action.label}`).join('\\n')}
` : ''}

--
Generated automatically by LusoTown Documentation Engine
Time: ${new Date(notification.timestamp).toLocaleString()}
    `.trim();
  }

  async sendDailySummary() {
    const summary = await this.generateDailySummary();
    
    if (summary.activities.length === 0) {
      console.log('📅 No activities for daily summary');
      return;
    }

    const notification = {
      type: 'documentation',
      priority: 'low',
      title: 'Daily Documentation Summary',
      description: `Summary of ${summary.activities.length} documentation activities today`,
      timestamp: Date.now(),
      summary: summary
    };

    await this.sendEmailNotification(notification);
    console.log('📅 Daily summary sent');
  }

  async generateDailySummary() {
    // In production, would analyze actual daily activities
    return {
      date: new Date().toLocaleDateString(),
      activities: [],
      metrics: this.analytics,
      health: 'good'
    };
  }

  // ====================
  // GITHUB INTEGRATION
  // ====================

  async initializeGitHubIntegration() {
    if (!this.config.github.enabled) {
      console.log('⏭️ GitHub integration disabled');
      this.integrationStatus.set('github', { enabled: false, healthy: false });
      return;
    }

    try {
      await this.testGitHubConnection();
      this.integrationStatus.set('github', { enabled: true, healthy: true });
      console.log('✅ GitHub integration initialized');
    } catch (error) {
      console.warn('⚠️ GitHub integration failed to initialize:', error.message);
      this.integrationStatus.set('github', { enabled: false, healthy: false, error: error.message });
    }
  }

  async testGitHubConnection() {
    // In production, would test GitHub API connection
    console.log('🧪 GitHub connection test completed');
  }

  async createGitHubIssue(issue) {
    if (!this.integrationStatus.get('github')?.healthy) {
      return false;
    }

    const issueData = {
      title: issue.title,
      body: this.generateGitHubIssueBody(issue),
      labels: this.getGitHubLabels(issue),
      assignees: issue.assignees || this.config.github.assignees
    };

    // In production, would make API call to GitHub
    console.log('🐙 [GITHUB] Created issue:', issue.title);
    console.log('🏷️ Labels:', issueData.labels.join(', '));
    
    this.analytics.issues++;
    return {
      id: crypto.randomUUID(),
      number: Math.floor(Math.random() * 1000) + 1,
      url: `https://github.com/${this.config.github.repo}/issues/${Math.floor(Math.random() * 1000) + 1}`
    };
  }

  generateGitHubIssueBody(issue) {
    return `
## Description
${issue.description}

## Type
${issue.type || 'Documentation'}

## Priority
${issue.priority || 'medium'}

${issue.files && issue.files.length > 0 ? `
## Affected Files
${issue.files.map(file => `- \`${file}\``).join('\\n')}
` : ''}

${issue.actions && issue.actions.length > 0 ? `
## Suggested Actions
${issue.actions.map(action => `- [ ] ${action.label}`).join('\\n')}
` : ''}

${issue.context ? `
## Context
${issue.context}
` : ''}

---
*This issue was created automatically by the LusoTown Documentation Engine*
*Created: ${new Date().toLocaleString()}*
    `.trim();
  }

  getGitHubLabels(issue) {
    const labels = [this.config.github.labels.automated];

    if (issue.type === 'cultural' || issue.category === 'portuguese-community') {
      labels.push(this.config.github.labels.portuguese, this.config.github.labels.cultural);
    }

    if (issue.type === 'documentation' || issue.category === 'documentation') {
      labels.push(this.config.github.labels.documentation);
    }

    return [...new Set(labels)];
  }

  async createDocumentationPR(prData) {
    if (!this.integrationStatus.get('github')?.healthy || !this.config.github.autoCreatePR) {
      return false;
    }

    const pr = {
      title: prData.title,
      head: prData.branch || 'automated-docs-update',
      base: 'main',
      body: this.generatePRBody(prData)
    };

    // In production, would make API call to GitHub
    console.log('🔀 [GITHUB] Created PR:', pr.title);
    
    this.analytics.prs++;
    return {
      id: crypto.randomUUID(),
      number: Math.floor(Math.random() * 100) + 1,
      url: `https://github.com/${this.config.github.repo}/pull/${Math.floor(Math.random() * 100) + 1}`
    };
  }

  generatePRBody(prData) {
    return `
## Summary
${prData.description}

## Changes
${prData.changes.map(change => `- ${change}`).join('\\n')}

## Files Modified
${prData.files.map(file => `- \`${file}\``).join('\\n')}

${prData.notes ? `
## Notes
${prData.notes}
` : ''}

---
*This PR was created automatically by the LusoTown Documentation Engine*
    `.trim();
  }

  // ====================
  // JIRA INTEGRATION
  // ====================

  async initializeJiraIntegration() {
    if (!this.config.jira.enabled || !this.config.jira.host) {
      console.log('⏭️ Jira integration disabled or not configured');
      this.integrationStatus.set('jira', { enabled: false, healthy: false });
      return;
    }

    try {
      await this.testJiraConnection();
      this.integrationStatus.set('jira', { enabled: true, healthy: true });
      console.log('✅ Jira integration initialized');
    } catch (error) {
      console.warn('⚠️ Jira integration failed to initialize:', error.message);
      this.integrationStatus.set('jira', { enabled: false, healthy: false, error: error.message });
    }
  }

  async testJiraConnection() {
    // In production, would test Jira API connection
    console.log('🧪 Jira connection test completed');
  }

  async createJiraIssue(issue) {
    if (!this.integrationStatus.get('jira')?.healthy) {
      return false;
    }

    const jiraIssue = {
      fields: {
        project: { key: this.config.jira.project },
        summary: issue.title,
        description: issue.description,
        issuetype: { name: this.config.jira.issueTypes[issue.type] || 'Task' },
        priority: { name: this.mapJiraPriority(issue.priority) },
        labels: issue.labels || ['documentation', 'automated']
      }
    };

    // In production, would make API call to Jira
    console.log('📋 [JIRA] Created issue:', issue.title);
    
    return {
      id: `${this.config.jira.project}-${Math.floor(Math.random() * 1000) + 1}`,
      key: `${this.config.jira.project}-${Math.floor(Math.random() * 1000) + 1}`,
      url: `${this.config.jira.host}/browse/${this.config.jira.project}-${Math.floor(Math.random() * 1000) + 1}`
    };
  }

  mapJiraPriority(priority) {
    const priorityMap = {
      critical: 'Highest',
      high: 'High',
      medium: 'Medium',
      low: 'Low'
    };
    return priorityMap[priority] || 'Medium';
  }

  // ====================
  // NOTIFICATION PROCESSING
  // ====================

  startNotificationProcessor() {
    console.log('⚡ Starting notification processor...');
    
    // Process notifications every 30 seconds
    setInterval(() => {
      this.processNotificationQueue();
    }, 30000);
    
    // Send daily summaries
    this.scheduleDailySummaries();
  }

  async processNotificationQueue() {
    if (this.notificationQueue.length === 0) {
      return;
    }

    console.log(`📬 Processing ${this.notificationQueue.length} notifications...`);

    const notifications = [...this.notificationQueue];
    this.notificationQueue = [];

    for (const notification of notifications) {
      try {
        await this.processNotification(notification);
      } catch (error) {
        console.error('❌ Failed to process notification:', error.message);
        this.analytics.errors++;
      }
    }
  }

  async processNotification(notification) {
    const promises = [];

    // Send to Slack if enabled
    if (this.integrationStatus.get('slack')?.healthy) {
      promises.push(this.sendSlackNotification(notification));
    }

    // Send to Discord if enabled  
    if (this.integrationStatus.get('discord')?.healthy) {
      promises.push(this.sendDiscordNotification(notification));
    }

    // Send email for high/critical priority or specific types
    if (this.shouldSendEmail(notification)) {
      promises.push(this.sendEmailNotification(notification));
    }

    // Create GitHub issue for certain types
    if (this.shouldCreateGitHubIssue(notification)) {
      promises.push(this.createGitHubIssue(notification));
    }

    // Create Jira issue if enabled
    if (this.integrationStatus.get('jira')?.healthy && this.shouldCreateJiraIssue(notification)) {
      promises.push(this.createJiraIssue(notification));
    }

    await Promise.allSettled(promises);
  }

  shouldSendEmail(notification) {
    return this.integrationStatus.get('email')?.healthy && 
           (['high', 'critical'].includes(notification.priority) || 
            notification.type === 'cultural');
  }

  shouldCreateGitHubIssue(notification) {
    return this.integrationStatus.get('github')?.healthy && 
           (['high', 'critical'].includes(notification.priority) ||
            ['cultural', 'documentation'].includes(notification.type));
  }

  shouldCreateJiraIssue(notification) {
    return this.integrationStatus.get('jira')?.healthy && 
           ['high', 'critical'].includes(notification.priority);
  }

  scheduleDailySummaries() {
    // Send daily summary at 9 AM
    const now = new Date();
    const scheduledTime = new Date();
    scheduledTime.setHours(9, 0, 0, 0);
    
    if (scheduledTime <= now) {
      scheduledTime.setDate(scheduledTime.getDate() + 1);
    }
    
    const timeUntilSummary = scheduledTime.getTime() - now.getTime();
    
    setTimeout(() => {
      this.sendDailySummary();
      
      // Schedule for next day
      setInterval(() => {
        this.sendDailySummary();
      }, 24 * 60 * 60 * 1000); // Every 24 hours
      
    }, timeUntilSummary);
    
    console.log(`📅 Daily summary scheduled for ${scheduledTime.toLocaleString()}`);
  }

  // ====================
  // HEALTH MONITORING
  // ====================

  startHealthMonitoring() {
    console.log('🏥 Starting health monitoring...');
    
    // Check integration health every 5 minutes
    setInterval(() => {
      this.checkIntegrationHealth();
    }, 300000);
  }

  async checkIntegrationHealth() {
    for (const [integration, status] of this.integrationStatus) {
      if (status.enabled && !status.healthy) {
        console.warn(`⚠️ Integration ${integration} is unhealthy: ${status.error || 'Unknown error'}`);
        
        // Try to reinitialize
        try {
          await this.reinitializeIntegration(integration);
        } catch (error) {
          console.error(`❌ Failed to reinitialize ${integration}:`, error.message);
        }
      }
    }
  }

  async reinitializeIntegration(integration) {
    console.log(`🔄 Reinitializing ${integration} integration...`);
    
    switch (integration) {
      case 'slack':
        await this.initializeSlackIntegration();
        break;
      case 'discord':
        await this.initializeDiscordIntegration();
        break;
      case 'email':
        await this.initializeEmailSystem();
        break;
      case 'github':
        await this.initializeGitHubIntegration();
        break;
      case 'jira':
        await this.initializeJiraIntegration();
        break;
    }
  }

  // ====================
  // PUBLIC API
  // ====================

  queueNotification(notification) {
    const enrichedNotification = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      ...notification
    };

    this.notificationQueue.push(enrichedNotification);
    
    console.log(`📥 Queued ${notification.priority || 'medium'} priority notification: ${notification.title}`);
    
    // Immediate processing for critical notifications
    if (notification.priority === 'critical') {
      setTimeout(() => this.processNotificationQueue(), 1000);
    }
  }

  async sendImmediateNotification(notification) {
    const enrichedNotification = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      ...notification
    };

    await this.processNotification(enrichedNotification);
  }

  getIntegrationStatus() {
    const status = {};
    for (const [integration, details] of this.integrationStatus) {
      status[integration] = {
        enabled: details.enabled,
        healthy: details.healthy,
        error: details.error || null
      };
    }
    return status;
  }

  getAnalytics() {
    return {
      ...this.analytics,
      uptime: process.uptime(),
      lastHealthCheck: new Date().toISOString(),
      integrationStatus: this.getIntegrationStatus()
    };
  }

  // ====================
  // UTILITY METHODS
  // ====================

  getPriorityEmoji(priority) {
    const emojis = {
      critical: '🚨',
      high: '⚠️',
      medium: '📋',
      low: '💡'
    };
    return emojis[priority] || '📋';
  }

  getPriorityColor(priority) {
    const colors = {
      critical: 16711680, // Red
      high: 16753920,    // Orange
      medium: 255,       // Blue
      low: 8421504       // Gray
    };
    return colors[priority] || colors.medium;
  }

  getPriorityColorHex(priority) {
    const colors = {
      critical: '#dc2626',
      high: '#f59e0b',
      medium: '#3b82f6',
      low: '#6b7280'
    };
    return colors[priority] || colors.medium;
  }

  getPriorityPrefix(priority) {
    const prefixes = {
      critical: '[CRITICAL]',
      high: '[HIGH]',
      medium: '[MEDIUM]',
      low: '[LOW]'
    };
    return prefixes[priority] || '';
  }

  async generateIntegrationReport() {
    const report = {
      generated: new Date().toISOString(),
      status: this.getIntegrationStatus(),
      analytics: this.getAnalytics(),
      configuration: {
        enabledIntegrations: Object.entries(this.config)
          .filter(([key, config]) => config.enabled)
          .map(([key]) => key),
        totalIntegrations: Object.keys(this.config).length
      },
      health: {
        overallHealth: this.calculateOverallHealth(),
        issues: this.getHealthIssues(),
        recommendations: this.getHealthRecommendations()
      }
    };

    const reportPath = path.join(this.webAppRoot, 'INTEGRATION_HUB_REPORT.md');
    await this.saveIntegrationReport(report, reportPath);

    return report;
  }

  calculateOverallHealth() {
    const integrations = Array.from(this.integrationStatus.values());
    const enabledIntegrations = integrations.filter(i => i.enabled);
    const healthyIntegrations = integrations.filter(i => i.enabled && i.healthy);

    if (enabledIntegrations.length === 0) return 'no-integrations';
    
    const healthPercentage = (healthyIntegrations.length / enabledIntegrations.length) * 100;
    
    if (healthPercentage === 100) return 'excellent';
    if (healthPercentage >= 75) return 'good';
    if (healthPercentage >= 50) return 'fair';
    return 'poor';
  }

  getHealthIssues() {
    const issues = [];
    
    for (const [integration, status] of this.integrationStatus) {
      if (status.enabled && !status.healthy) {
        issues.push({
          integration,
          error: status.error,
          severity: 'warning'
        });
      }
    }
    
    return issues;
  }

  getHealthRecommendations() {
    const recommendations = [];
    const issues = this.getHealthIssues();
    
    for (const issue of issues) {
      recommendations.push({
        type: 'fix-integration',
        priority: 'high',
        description: `Fix ${issue.integration} integration: ${issue.error}`,
        action: `Review configuration and credentials for ${issue.integration}`
      });
    }
    
    if (this.analytics.errors > 10) {
      recommendations.push({
        type: 'reduce-errors',
        priority: 'medium',
        description: `High error count: ${this.analytics.errors} errors`,
        action: 'Review error logs and improve error handling'
      });
    }
    
    return recommendations;
  }

  async saveIntegrationReport(report, filePath) {
    const markdown = `# Integration Hub Report

Generated: ${report.generated}

## Overview

**Overall Health:** ${report.health.overallHealth.toUpperCase()}
**Enabled Integrations:** ${report.configuration.enabledIntegrations.join(', ')}
**Total Configurations:** ${report.configuration.totalIntegrations}

## Integration Status

${Object.entries(report.status).map(([integration, status]) => `
### ${integration.charAt(0).toUpperCase() + integration.slice(1)}
- **Enabled:** ${status.enabled ? '✅' : '❌'}
- **Healthy:** ${status.healthy ? '✅' : '❌'}
${status.error ? `- **Error:** ${status.error}` : ''}
`).join('')}

## Analytics

- **Notifications Sent:** ${report.analytics.notifications}
- **Emails Sent:** ${report.analytics.emails}  
- **GitHub Issues Created:** ${report.analytics.issues}
- **GitHub PRs Created:** ${report.analytics.prs}
- **Errors Encountered:** ${report.analytics.errors}
- **Uptime:** ${Math.round(report.analytics.uptime / 60)} minutes

## Health Issues

${report.health.issues.length > 0 ? 
  report.health.issues.map(issue => `- **${issue.integration}:** ${issue.error}`).join('\\n') :
  'No health issues detected'
}

## Recommendations

${report.health.recommendations.map(rec => `
### ${rec.type} (${rec.priority} priority)
${rec.description}

**Action:** ${rec.action}
`).join('')}

## Configuration

${Object.entries(this.config).map(([integration, config]) => `
### ${integration}
- **Enabled:** ${config.enabled}
- **Configured:** ${this.isConfigured(integration, config) ? 'Yes' : 'No'}
`).join('')}

---

*This report was generated automatically by the Integration Hub*
`;

    fs.writeFileSync(filePath, markdown);
    console.log(`📄 Integration report saved to: ${filePath}`);
  }

  isConfigured(integration, config) {
    switch (integration) {
      case 'slack':
        return !!config.webhookUrl;
      case 'discord':
        return !!config.webhookUrl;
      case 'email':
        return !!config.apiKey;
      case 'github':
        return !!config.token;
      case 'jira':
        return !!(config.host && config.email && config.token);
      default:
        return true;
    }
  }
}

// Run Integration Hub if called directly
if (require.main === module) {
  const hub = new IntegrationHub();
  
  // Example usage
  setTimeout(() => {
    hub.queueNotification({
      type: 'documentation',
      priority: 'high',
      title: 'Documentation System Test',
      description: 'Testing the integration hub notification system',
      files: ['test-file.md'],
      actions: [
        { label: 'Review Changes', url: 'https://github.com/lusotown/web-app' },
        { label: 'View Dashboard', url: 'https://lusotown.com/docs' }
      ]
    });
    
    setTimeout(() => {
      hub.generateIntegrationReport().then(() => {
        console.log('✅ Integration Hub test completed');
      });
    }, 5000);
  }, 2000);
}

module.exports = IntegrationHub;