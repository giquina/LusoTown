#!/bin/bash
# LusoTown Portuguese Community Streaming - Development Deployment
# Quick setup for local development and testing

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
STREAMING_DIR="$(dirname "$SCRIPT_DIR")"

echo "<õ<ù LusoTown Portuguese Community Streaming - Development Deployment"
echo "=================================================================="

# Check prerequisites
check_prerequisites() {
    echo "Checking prerequisites..."
    
    if ! command -v docker &> /dev/null; then
        echo "L Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        echo "L Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    
    echo " Prerequisites check passed"
}

# Setup development environment
setup_environment() {
    echo "Setting up development environment..."
    
    # Create .env file for development if it doesn't exist
    if [[ ! -f "$STREAMING_DIR/.env.dev" ]]; then
        echo "Creating development environment configuration..."
        cat > "$STREAMING_DIR/.env.dev" << EOF
# LusoTown Streaming Development Configuration
COMPOSE_PROJECT_NAME=lusotown-streaming-dev
LUSOTOWN_STREAMING_SECRET=lusotown_dev_secret_2025

# Optional CDN configuration (leave empty for local development)
CDN_ENDPOINT=
BUNNYCDN_API_KEY=
BUNNYCDN_STORAGE_ZONE=

# Analytics configuration
ANALYTICS_DB_USER=lusotown_analytics
ANALYTICS_DB_PASSWORD=dev_password_2025

# Log aggregation (for development)
ELASTICSEARCH_HOST=
ELASTICSEARCH_PORT=
EOF
        echo " Development environment file created: .env.dev"
    fi
    
    # Make scripts executable
    chmod +x "$SCRIPT_DIR"/*.sh
    
    echo " Environment setup completed"
}

# Pull required Docker images
pull_images() {
    echo "Pulling required Docker images..."
    
    cd "$STREAMING_DIR/docker-compose"
    docker-compose --env-file="../.env.dev" -f docker-compose.yml pull redis-streaming streaming-monitor
    
    echo " Docker images pulled"
}

# Build streaming infrastructure
build_infrastructure() {
    echo "Building LusoTown streaming infrastructure..."
    
    cd "$STREAMING_DIR/docker-compose"
    docker-compose --env-file="../.env.dev" -f docker-compose.yml build --no-cache srs-server
    
    echo " Streaming infrastructure built"
}

# Deploy development environment
deploy_development() {
    echo "Deploying development streaming environment..."
    
    cd "$STREAMING_DIR/docker-compose"
    
    # Stop any existing services
    docker-compose --env-file="../.env.dev" -f docker-compose.yml down --remove-orphans
    
    # Start all services
    docker-compose --env-file="../.env.dev" -f docker-compose.yml up -d
    
    echo " Development environment deployed"
}

# Wait for services to be healthy
wait_for_services() {
    echo "Waiting for services to become healthy..."
    
    local max_attempts=30
    local attempt=1
    
    while [[ $attempt -le $max_attempts ]]; do
        if docker-compose --env-file="../.env.dev" -f docker-compose.yml ps | grep -q "healthy"; then
            echo " Services are healthy"
            return 0
        fi
        
        echo "ó Attempt $attempt/$max_attempts - waiting for services..."
        sleep 10
        ((attempt++))
    done
    
    echo "   Services may not be fully healthy yet, but deployment completed"
}

# Display service information
show_service_info() {
    echo ""
    echo "<¯ LusoTown Portuguese Community Streaming - Development Services"
    echo "=============================================================="
    echo ""
    echo "<¥ RTMP Ingest (OBS/Streaming Software):"
    echo "   rtmp://localhost:1935/live/[stream_key]"
    echo ""
    echo "< HLS Streaming Output:"
    echo "   http://localhost:8080/live/[stream_key].m3u8"
    echo ""
    echo "¡ WebRTC Low-latency Streaming:"
    echo "   http://localhost:8000"
    echo ""
    echo "=' SRS API Management:"
    echo "   http://localhost:1985/api/v1/"
    echo ""
    echo "=Ê Development Monitoring (Grafana):"
    echo "   http://localhost:3001 (admin/lusotown2025)"
    echo ""
    echo "= Redis (Real-time features):"
    echo "   localhost:6379"
    echo ""
    echo "=Ë Service Status:"
    cd "$STREAMING_DIR/docker-compose"
    docker-compose --env-file="../.env.dev" -f docker-compose.yml ps
    echo ""
    echo "=¡ Quick Test:"
    echo "   1. Open OBS Studio"
    echo "   2. Add Stream: rtmp://localhost:1935/live/"
    echo "   3. Stream Key: test_stream"
    echo "   4. Watch at: http://localhost:8080/live/test_stream.m3u8"
}

# Main execution
main() {
    check_prerequisites
    setup_environment
    pull_images
    build_infrastructure
    deploy_development
    wait_for_services
    show_service_info
    
    echo ""
    echo "<‰ LusoTown Portuguese Community Streaming development environment is ready!"
    echo "   Perfect for testing Portuguese cultural streaming features"
}

# Execute main function
main "$@"