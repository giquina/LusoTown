#!/bin/bash

# LusoTown Portuguese-speaking community - Production Streaming Verification
echo "<�<� Verifying LusoTown Portuguese Streaming Infrastructure..."

# Check if environment URL is provided
if [ -z "$1" ]; then
    echo "Usage: ./verify-production.sh <PRODUCTION_URL>"
    echo "Example: ./verify-production.sh lusotown-portuguese-streaming-production.up.railway.app"
    exit 1
fi

PRODUCTION_URL=$1

echo "= Testing production streaming infrastructure at: $PRODUCTION_URL"
echo ""

# Test API health
echo "=� Checking API health..."
HEALTH_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "https://$PRODUCTION_URL:3002/health" 2>/dev/null)
if [ "$HEALTH_RESPONSE" = "200" ]; then
    echo " API Server: HEALTHY"
    curl -s "https://$PRODUCTION_URL:3002/health" | jq '.service, .status, .timestamp'
else
    echo "L API Server: UNAVAILABLE (HTTP $HEALTH_RESPONSE)"
fi

echo ""

# Test streaming stats
echo "=� Checking streaming statistics..."
STATS_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "https://$PRODUCTION_URL:3002/api/v1/stats" 2>/dev/null)
if [ "$STATS_RESPONSE" = "200" ]; then
    echo " Statistics API: WORKING"
    curl -s "https://$PRODUCTION_URL:3002/api/v1/stats" | jq '.activeStreams, .totalConnections, .portugueseViewers'
else
    echo "L Statistics API: UNAVAILABLE (HTTP $STATS_RESPONSE)"
fi

echo ""

# Test HLS endpoint
echo "=� Checking HLS streaming endpoint..."
HLS_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "https://$PRODUCTION_URL:8080/" 2>/dev/null)
if [ "$HLS_RESPONSE" = "200" ] || [ "$HLS_RESPONSE" = "403" ] || [ "$HLS_RESPONSE" = "404" ]; then
    echo " HLS Server: ACCESSIBLE"
else
    echo "L HLS Server: UNAVAILABLE (HTTP $HLS_RESPONSE)"
fi

echo ""

# Test RTMP port (basic connectivity)
echo "=� Checking RTMP ingestion port..."
if timeout 5 bash -c "</dev/tcp/$PRODUCTION_URL/1935" 2>/dev/null; then
    echo " RTMP Port 1935: OPEN"
else
    echo "� RTMP Port 1935: May be filtered (common with cloud providers)"
fi

echo ""

# Portuguese-speaking community features test
echo "<�<� Checking Portuguese-speaking community features..."
CULTURAL_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "https://$PRODUCTION_URL:3002/api/v1/cultural-streams" 2>/dev/null)
if [ "$CULTURAL_RESPONSE" = "200" ]; then
    echo " Portuguese Cultural Streams: AVAILABLE"
else
    echo "L Portuguese Cultural Streams: UNAVAILABLE"
fi

echo ""
echo "=' Production URLs for configuration:"
echo "============================================================"
echo "< API Server: https://$PRODUCTION_URL:3002"
echo "=� HLS Streams: https://$PRODUCTION_URL:8080/live/[stream_key].m3u8"
echo "=� RTMP Ingestion: rtmp://$PRODUCTION_URL:1935/live/[stream_key]"
echo ""
echo "=� Streamlabs Mobile Configuration:"
echo "Server: rtmp://$PRODUCTION_URL:1935/live/"
echo "Stream Key: streamlabs_lusotown_2025"
echo ""
echo "< Vercel Environment Variables to set:"
echo "NEXT_PUBLIC_STREAMING_SERVER_URL=https://$PRODUCTION_URL:3002"
echo "NEXT_PUBLIC_HLS_BASE_URL=https://$PRODUCTION_URL:8080"
echo "NEXT_PUBLIC_RTMP_SERVER_URL=rtmp://$PRODUCTION_URL:1935"
echo ""
echo "<� Test Stream URL:"
echo "https://$PRODUCTION_URL:8080/live/streamlabs_lusotown_2025.m3u8"
echo ""

if [ "$HEALTH_RESPONSE" = "200" ] && [ "$STATS_RESPONSE" = "200" ]; then
    echo " Production streaming infrastructure is READY for Portuguese-speaking community!"
else
    echo "L Production streaming infrastructure needs attention"
fi