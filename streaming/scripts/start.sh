#!/bin/bash
# LusoTown Streaming Infrastructure Startup Script
# Optimized for Portuguese-speaking community streaming

set -e

echo "Starting LusoTown Portuguese-speaking Community Streaming Infrastructure..."

# Environment validation
if [[ -z "$LUSOTOWN_STREAMING_SECRET" ]]; then
    echo "ERROR: LUSOTOWN_STREAMING_SECRET environment variable is required"
    exit 1
fi

# Create required directories
mkdir -p /usr/local/srs/logs
mkdir -p /var/log/nginx
mkdir -p /var/log/supervisor
mkdir -p /tmp/srs-hls
mkdir -p /tmp/srs-dvr

# Set permissions for streaming directories
chown -R nginx:nginx /tmp/srs-hls
chown -R nginx:nginx /tmp/srs-dvr
chmod -R 755 /tmp/srs-hls
chmod -R 755 /tmp/srs-dvr

# Initialize nginx if not already configured
if [[ ! -f /etc/nginx/sites-enabled/lusotown-streaming ]]; then
    echo "Configuring nginx for LusoTown streaming..."
    ln -sf /etc/nginx/sites-available/lusotown-streaming /etc/nginx/sites-enabled/
fi

# Test nginx configuration
echo "Testing nginx configuration..."
nginx -t || {
    echo "ERROR: nginx configuration test failed"
    exit 1
}

# Test SRS configuration
echo "Testing SRS configuration..."
/usr/local/srs/objs/srs -t -c /usr/local/srs/conf/srs.conf || {
    echo "ERROR: SRS configuration test failed"
    exit 1
}

# Configure BunnyCDN if credentials are provided
if [[ -n "$BUNNYCDN_API_KEY" && -n "$BUNNYCDN_STORAGE_ZONE" ]]; then
    echo "Configuring BunnyCDN integration for Portuguese market..."
    export CDN_ENDPOINT="https://${BUNNYCDN_STORAGE_ZONE}.b-cdn.net"
    echo "CDN endpoint configured: $CDN_ENDPOINT"
fi

# Start services via supervisor
echo "Starting supervisor with SRS and nginx..."
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf