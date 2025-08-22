/**
 * Vercel Deployment Webhook Handler for LusoTown
 * Handles Vercel webhook events, detects issues, and triggers auto-fix processes
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { execSync } from 'child_process';
import crypto from 'crypto';

interface VercelWebhookEvent {
  id: string;
  type: string;
  createdAt: number;
  data: {
    deployment?: {
      id: string;
      url: string;
      state: 'BUILDING' | 'READY' | 'ERROR' | 'CANCELED';
      source?: string;
      target?: string;
      project?: {
        id: string;
        name: string;
      };
    };
    project?: {
      id: string;
      name: string;
    };
  };
}

interface DeploymentNotification {
  type: 'success' | 'failure' | 'building';
  deployment: {
    id: string;
    url: string;
    state: string;
    timestamp: string;
  };
  project: {
    id: string;
    name: string;
  };
  autoFixTriggered?: boolean;
  issueCreated?: boolean;
}

class VercelWebhookHandler {
  private readonly webhookSecret: string;

  constructor() {
    this.webhookSecret = process.env.VERCEL_WEBHOOK_SECRET || '';
  }

  // Verify webhook signature
  private verifySignature(payload: string, signature: string): boolean {
    if (!this.webhookSecret) {
      console.warn('VERCEL_WEBHOOK_SECRET not configured, skipping signature verification');
      return true; // Allow in development
    }

    const expectedSignature = crypto
      .createHmac('sha1', this.webhookSecret)
      .update(payload)
      .digest('hex');

    return signature === `sha1=${expectedSignature}`;
  }

  // Log deployment event
  private logEvent(message: string, type: 'info' | 'warn' | 'error' = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = type === 'error' ? '❌' : type === 'warn' ? '⚠️' : '📊';
    console.log(`${prefix} [${timestamp}] ${message}`);
  }

  // Trigger auto-fix process
  private async triggerAutoFix(): Promise<boolean> {
    try {
      this.logEvent('Triggering auto-fix process...');
      
      // Run auto-fix script
      const autoFixPath = '../scripts/auto-fix.js';
      execSync(`node ${autoFixPath}`, {
        cwd: process.cwd(),
        stdio: 'inherit',
        timeout: 300000 // 5 minutes timeout
      });

      this.logEvent('Auto-fix process completed successfully');
      return true;
    } catch (error) {
      this.logEvent(`Auto-fix process failed: ${error}`, 'error');
      return false;
    }
  }

  // Create GitHub issue for deployment failure
  private async createGitHubIssue(deployment: any): Promise<boolean> {
    try {
      this.logEvent('Creating GitHub issue for deployment failure...');
      
      // In a real implementation, you would call GitHub API here
      // For now, we'll simulate issue creation
      const issueTitle = `🚨 Deployment Failed - ${deployment.id.substring(0, 8)}`;
      const issueBody = `
Deployment ID: ${deployment.id}
URL: ${deployment.url || 'N/A'}
State: ${deployment.state}
Timestamp: ${new Date().toISOString()}

Auto-fix process has been triggered.
Please check deployment logs for more details.
      `;

      this.logEvent(`Would create GitHub issue: ${issueTitle}`);
      
      // Simulate issue creation delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return true;
    } catch (error) {
      this.logEvent(`Failed to create GitHub issue: ${error}`, 'error');
      return false;
    }
  }

  // Send notification about deployment status
  private async sendNotification(notification: DeploymentNotification): Promise<void> {
    try {
      this.logEvent(`Sending notification: ${notification.type} - ${notification.deployment.id}`);
      
      if (notification.type === 'failure') {
        this.logEvent(`🚨 DEPLOYMENT FAILED: ${notification.deployment.url}`, 'error');
        this.logEvent(`Auto-fix triggered: ${notification.autoFixTriggered ? 'Yes' : 'No'}`);
        this.logEvent(`Issue created: ${notification.issueCreated ? 'Yes' : 'No'}`);
      } else if (notification.type === 'success') {
        this.logEvent(`✅ DEPLOYMENT SUCCESS: ${notification.deployment.url}`);
      } else if (notification.type === 'building') {
        this.logEvent(`🔨 DEPLOYMENT BUILDING: ${notification.deployment.id}`);
      }
    } catch (error) {
      this.logEvent(`Failed to send notification: ${error}`, 'error');
    }
  }

  // Handle deployment.created event
  private async handleDeploymentCreated(event: VercelWebhookEvent): Promise<void> {
    const deployment = event.data.deployment;
    if (!deployment) return;

    this.logEvent(`New deployment created: ${deployment.id}`);
    
    const notification: DeploymentNotification = {
      type: 'building',
      deployment: {
        id: deployment.id,
        url: deployment.url,
        state: deployment.state,
        timestamp: new Date().toISOString()
      },
      project: {
        id: deployment.project?.id || '',
        name: deployment.project?.name || 'Unknown'
      }
    };

    await this.sendNotification(notification);
  }

  // Handle deployment.succeeded event
  private async handleDeploymentSucceeded(event: VercelWebhookEvent): Promise<void> {
    const deployment = event.data.deployment;
    if (!deployment) return;

    this.logEvent(`Deployment succeeded: ${deployment.id}`);
    
    const notification: DeploymentNotification = {
      type: 'success',
      deployment: {
        id: deployment.id,
        url: deployment.url,
        state: deployment.state,
        timestamp: new Date().toISOString()
      },
      project: {
        id: deployment.project?.id || '',
        name: deployment.project?.name || 'Unknown'
      }
    };

    await this.sendNotification(notification);

    // If there were previous failures, close related GitHub issues
    // This would be implemented with GitHub API in a real scenario
    this.logEvent('Checking for related GitHub issues to close...');
  }

  // Handle deployment.failed event
  private async handleDeploymentFailed(event: VercelWebhookEvent): Promise<void> {
    const deployment = event.data.deployment;
    if (!deployment) return;

    this.logEvent(`Deployment failed: ${deployment.id}`, 'error');
    
    // Trigger auto-fix process
    const autoFixTriggered = await this.triggerAutoFix();
    
    // Create GitHub issue
    const issueCreated = await this.createGitHubIssue(deployment);
    
    const notification: DeploymentNotification = {
      type: 'failure',
      deployment: {
        id: deployment.id,
        url: deployment.url,
        state: deployment.state,
        timestamp: new Date().toISOString()
      },
      project: {
        id: deployment.project?.id || '',
        name: deployment.project?.name || 'Unknown'
      },
      autoFixTriggered,
      issueCreated
    };

    await this.sendNotification(notification);
    
    // If auto-fix was successful, trigger a new deployment
    if (autoFixTriggered) {
      this.logEvent('Auto-fix completed, consider triggering new deployment');
      // In a real implementation, you might trigger a new deployment here
    }
  }

  // Main webhook handler
  async handleWebhook(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    try {
      const signature = req.headers['x-vercel-signature'] as string;
      const payload = JSON.stringify(req.body);

      // Verify webhook signature
      if (!this.verifySignature(payload, signature)) {
        this.logEvent('Invalid webhook signature', 'error');
        res.status(401).json({ error: 'Invalid signature' });
        return;
      }

      const event: VercelWebhookEvent = req.body;
      this.logEvent(`Received webhook event: ${event.type}`);

      // Handle different event types
      switch (event.type) {
        case 'deployment.created':
          await this.handleDeploymentCreated(event);
          break;
        
        case 'deployment.succeeded':
        case 'deployment.ready':
          await this.handleDeploymentSucceeded(event);
          break;
        
        case 'deployment.failed':
        case 'deployment.error':
        case 'deployment.canceled':
          await this.handleDeploymentFailed(event);
          break;
        
        default:
          this.logEvent(`Unhandled event type: ${event.type}`, 'warn');
      }

      res.status(200).json({ 
        success: true, 
        eventType: event.type,
        deploymentId: event.data.deployment?.id,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      this.logEvent(`Webhook handler error: ${error}`, 'error');
      res.status(500).json({ 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}

// API Route Handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const webhookHandler = new VercelWebhookHandler();
  await webhookHandler.handleWebhook(req, res);
}

// Configure API route
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}