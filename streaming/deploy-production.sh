#!/bin/bash

# LusoTown Portuguese-speaking Community Streaming Server
# Production Deployment Script

set -e

echo "<�<� LusoTown Streaming Server - Production Deployment"
echo "====================================================="

# Check if Node.js and npm are installed
if ! command -v node &> /dev/null; then
    echo "L Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "L npm is not installed. Please install npm first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "L Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo " Node.js $(node -v) detected"

# Install dependencies
echo "=� Installing production dependencies..."
npm ci --only=production

# Create necessary directories
echo "=� Creating required directories..."
mkdir -p media www logs recordings recordings/cultural recordings/business

# Copy production environment
if [ -f ".env.production" ]; then
    echo "=' Using production environment configuration"
    cp .env.production .env
else
    echo "� No .env.production found, using development configuration"
    cp .env.dev .env
fi

# Set production environment variables
export NODE_ENV=production
export PORT=${PORT:-3002}
export HOST=${HOST:-0.0.0.0}
export RTMP_PORT=${RTMP_PORT:-1935}
export HTTP_PORT=${HTTP_PORT:-8080}

echo ">� Running health check..."
node health-check.js

echo "=� Starting LusoTown Portuguese-speaking Community Streaming Server..."
echo ""
echo "=� RTMP Ingestion: rtmp://YOUR_DOMAIN:1935/live/[stream_key]"
echo "=� HLS Output: https://YOUR_DOMAIN/live/[stream_key].m3u8"
echo "=' API: https://YOUR_DOMAIN/api/v1/"
echo "=� Health: https://YOUR_DOMAIN/health"
echo ""
echo " Ready for Portuguese-speaking community streaming!"

# Start the server
exec npm start