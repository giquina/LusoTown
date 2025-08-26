# Enhanced GitHub Actions Deployment Setup (Updated August 2025)

This document explains the enhanced GitHub Actions configuration for automatic deployment to Vercel with comprehensive quality assurance.

## 🚨 CRITICAL UPDATE: Deployment System Fixed

**Previous Issues Resolved**:
- ❌ **Fixed**: Node.js version mismatch (was 18, now 22 as required by CLAUDE.md)
- ❌ **Fixed**: Ignored quality checks (now deployment-blocking)
- ❌ **Fixed**: Missing hardcoding validation (now mandatory audit)
- ❌ **Fixed**: No Portuguese platform validation (now culturally-aware checks)

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

## Enhanced Workflow Features (August 2025)

Our enhanced GitHub Actions workflow now includes:

### 🛡️ **Mandatory Quality Assurance** (NEW)
Every deployment is **BLOCKED** if these checks fail:
- **Critical Hardcoding Audit**: `npm run audit:hardcoding` 
- **ESLint Validation**: `npm run lint` (no longer ignored)
- **TypeScript Check**: `npx tsc --noEmit` (no longer ignored)
- **Production Build Test**: `npm run build` (mandatory)
- **Portuguese Community Validation**: Cultural authenticity checks

### 🚀 **Automatic Deployment**
- **Preview Deployments**: For pull requests (with automated PR comments)
- **Production Deployments**: For pushes to main branch
- **Manual Deployments**: Via workflow_dispatch trigger

### 🎯 **Portuguese Community Platform Validation** (NEW)
Automatic validation of LusoTown-specific requirements:
- ✅ Validates `community-guidelines.ts` configuration exists
- ✅ Confirms `lusophone-celebrations.ts` cultural data present  
- ✅ Checks Portuguese translations (`pt.json`) completeness
- ✅ Enforces cultural authenticity standards
- ✅ Validates mobile-first Portuguese-speaking community design

### 📦 **Corrected Build Process**
- **Node.js v22 setup** (Fixed: was using v18, now matches CLAUDE.md requirement)
- NPM dependency caching
- Production-optimized builds with Portuguese content delivery
- Community metrics validation (750+ members, 2,150+ students, 8 universities)

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