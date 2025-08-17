# GitHub Actions Deployment Setup

This document explains how to configure GitHub Actions for automatic deployment to Vercel.

## Required GitHub Secrets

To enable automatic deployment, you need to add the following secrets to your GitHub repository:

### 1. Navigate to Repository Settings
1. Go to your GitHub repository
2. Click on **Settings** tab
3. In the left sidebar, click **Secrets and variables** → **Actions**

### 2. Add Required Secrets

Click **New repository secret** for each of the following:

#### VERCEL_TOKEN
- **Name:** `VERCEL_TOKEN`
- **Value:** `4LsZHTUX075WzZE6l2JwXuna`

#### VERCEL_ORG_ID
- **Name:** `VERCEL_ORG_ID`  
- **Value:** Your Vercel organization ID (get from Vercel dashboard)

#### VERCEL_PROJECT_ID
- **Name:** `VERCEL_PROJECT_ID`
- **Value:** Your Vercel project ID (get from Vercel dashboard)

## How to Find Vercel IDs

### Get Organization ID:
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your profile/organization name
3. Go to **Settings** → **General**
4. Copy the **Organization ID**

### Get Project ID:
1. Go to your project in Vercel dashboard
2. Click **Settings** tab
3. Scroll to **General** section
4. Copy the **Project ID**

## Workflow Features

Our GitHub Actions workflow includes:

### 🚀 **Automatic Deployment**
- **Preview Deployments:** For pull requests
- **Production Deployments:** For pushes to main branch
- **Manual Deployments:** Via workflow_dispatch trigger

### 🔍 **Code Quality Checks**
- ESLint linting
- TypeScript type checking
- Runs on every push and PR

### 📦 **Build Process**
- Node.js 18 setup
- NPM dependency caching
- Production-optimized builds

## Deployment Triggers

- **Push to main branch:** Triggers production deployment
- **Pull request:** Triggers preview deployment
- **Manual trigger:** Can be run manually from GitHub Actions tab

## Monitoring Deployments

1. Go to **Actions** tab in your GitHub repository
2. View real-time logs for each deployment
3. See deployment status and any errors
4. Get deployment URLs from Vercel action outputs

## Security Notes

- Tokens are stored as encrypted GitHub secrets
- Never commit tokens directly to repository
- Rotate tokens periodically for security
- Monitor deployment logs for any issues

## Troubleshooting

### Common Issues:
1. **Missing secrets:** Ensure all three secrets are configured
2. **Wrong project path:** Verify `working-directory: ./web-app` matches your structure
3. **Build failures:** Check logs in Actions tab for specific errors

### Getting Help:
- Check GitHub Actions logs for detailed error messages
- Verify Vercel project settings and permissions
- Ensure token has appropriate permissions in Vercel