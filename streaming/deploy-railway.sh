#!/bin/bash

# LusoTown Portuguese Community Streaming - Railway Deployment
echo "<õ<ù Deploying LusoTown Portuguese Streaming Infrastructure to Railway..."

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "L Railway CLI is required. Install with: npm install -g @railway/cli"
    exit 1
fi

# Login to Railway (if not already)
echo "= Checking Railway authentication..."
railway login

# Create new Railway project for Portuguese streaming
echo "=€ Creating Railway project for LusoTown Portuguese streaming..."
railway create lusotown-portuguese-streaming

# Set environment variables for Portuguese community
echo "™ Setting production environment variables..."
railway env set NODE_ENV=production
railway env set PORT=3002
railway env set HTTP_PORT=8080
railway env set RTMP_PORT=1935
railway env set HOST=0.0.0.0
railway env set LUSOTOWN_STREAMING_SECRET=lusotown_production_secret_2025_secure
railway env set LOG_LEVEL=warn

# Deploy to Railway
echo "=€ Deploying Portuguese streaming server to Railway..."
railway up

# Get deployment URL
echo "< Getting deployment URL..."
DEPLOYMENT_URL=$(railway status --json | jq -r '.deploymentDomain')

echo ""
echo " LusoTown Portuguese Streaming Infrastructure Deployed!"
echo "============================================================"
echo "< Production URL: https://$DEPLOYMENT_URL"
echo ""
echo "=á RTMP Ingestion (Streamlabs/OBS):"
echo "   rtmp://$DEPLOYMENT_URL:1935/live/[stream_key]"
echo ""
echo "=ú HLS Streaming Output:"
echo "   https://$DEPLOYMENT_URL:8080/live/[stream_key].m3u8"
echo ""
echo "=' API Management:"
echo "   https://$DEPLOYMENT_URL:3002/api/v1/"
echo ""
echo "=Ê Health Check:"
echo "   https://$DEPLOYMENT_URL:3002/health"
echo ""
echo "<¯ Test Configuration:"
echo "   Server: rtmp://$DEPLOYMENT_URL:1935/live/"
echo "   Stream Key: streamlabs_lusotown_2025"
echo "   Watch: https://$DEPLOYMENT_URL:8080/live/streamlabs_lusotown_2025.m3u8"
echo ""
echo " Ready for Portuguese community mobile streaming!"