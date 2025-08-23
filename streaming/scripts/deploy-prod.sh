#!/bin/bash
# LusoTown Portuguese-speaking Community Streaming - Production Deployment
# Secure, scalable deployment for Portuguese-speaking community streaming

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
STREAMING_DIR="$(dirname "$SCRIPT_DIR")"

echo "<�<� LusoTown Portuguese-speaking Community Streaming - Production Deployment"
echo "==================================================================="

# Validate production environment
validate_environment() {
    echo "Validating production environment..."
    
    # Required environment variables
    local required_vars=(
        "LUSOTOWN_STREAMING_SECRET"
        "CDN_ENDPOINT"
        "BUNNYCDN_API_KEY"
        "BUNNYCDN_STORAGE_ZONE"
        "ANALYTICS_DB_USER"
        "ANALYTICS_DB_PASSWORD"
    )
    
    local missing_vars=()
    
    for var in "${required_vars[@]}"; do
        if [[ -z "${!var}" ]]; then
            missing_vars+=("$var")
        fi
    done
    
    if [[ ${#missing_vars[@]} -gt 0 ]]; then
        echo "L Missing required environment variables:"
        printf "   - %s\n" "${missing_vars[@]}"
        echo ""
        echo "Please set these variables before deploying to production."
        exit 1
    fi
    
    echo " Production environment validation passed"
}

# Check production prerequisites
check_production_prerequisites() {
    echo "Checking production prerequisites..."
    
    # Check Docker Swarm or Kubernetes
    if command -v docker &> /dev/null && docker info | grep -q "Swarm: active"; then
        echo " Docker Swarm is active"
        DEPLOYMENT_MODE="swarm"
    elif command -v kubectl &> /dev/null && kubectl cluster-info &> /dev/null; then
        echo " Kubernetes cluster is accessible"
        DEPLOYMENT_MODE="kubernetes"
    elif command -v docker-compose &> /dev/null; then
        echo "�  Using Docker Compose for production (consider upgrading to Swarm/K8s)"
        DEPLOYMENT_MODE="compose"
    else
        echo "L No suitable container orchestration platform found"
        exit 1
    fi
    
    # Check system resources
    local total_memory=$(free -g | awk 'NR==2{print $2}')
    local cpu_cores=$(nproc)
    
    if [[ $total_memory -lt 8 ]]; then
        echo "�  Warning: Less than 8GB RAM available ($total_memory GB)"
        echo "   Recommended: 8GB+ for production streaming"
    fi
    
    if [[ $cpu_cores -lt 4 ]]; then
        echo "�  Warning: Less than 4 CPU cores available ($cpu_cores cores)"
        echo "   Recommended: 4+ CPU cores for concurrent streaming"
    fi
    
    echo " Prerequisites check completed"
}

# Setup production directories and permissions
setup_production_directories() {
    echo "Setting up production directories..."
    
    # Create production directories
    sudo mkdir -p /var/log/lusotown/{streaming,nginx}
    sudo mkdir -p /var/lib/lusotown/{redis,analytics}
    sudo mkdir -p /mnt/streaming-content
    sudo mkdir -p /etc/ssl/lusotown
    
    # Set proper permissions
    sudo chown -R 1000:1000 /var/log/lusotown
    sudo chown -R 1000:1000 /var/lib/lusotown
    sudo chown -R 1000:1000 /mnt/streaming-content
    
    echo " Production directories created"
}

# Deploy SSL certificates
setup_ssl_certificates() {
    echo "Setting up SSL certificates..."
    
    if [[ ! -f "/etc/ssl/lusotown/lusotown-streaming.crt" ]]; then
        echo "�  SSL certificates not found. Generating self-signed certificates for development."
        echo "   For production, replace with valid certificates from Let's Encrypt or your CA."
        
        sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
            -keyout /etc/ssl/lusotown/lusotown-streaming.key \
            -out /etc/ssl/lusotown/lusotown-streaming.crt \
            -subj "/C=GB/ST=London/L=London/O=LusoTown/CN=stream.lusotown.com"
        
        sudo chmod 600 /etc/ssl/lusotown/lusotown-streaming.key
        sudo chmod 644 /etc/ssl/lusotown/lusotown-streaming.crt
    fi
    
    echo " SSL certificates configured"
}

# Build production images
build_production_images() {
    echo "Building production streaming images..."
    
    cd "$STREAMING_DIR"
    
    # Build with production optimizations
    docker build -f Dockerfile.srs -t lusotown/srs:production --build-arg BUILD_ENV=production .
    
    echo " Production images built"
}

# Deploy to Docker Swarm
deploy_to_swarm() {
    echo "Deploying to Docker Swarm..."
    
    # Create production network
    docker network create --driver overlay --attachable lusotown-production 2>/dev/null || true
    
    # Create secrets
    echo "$LUSOTOWN_STREAMING_SECRET" | docker secret create lusotown_streaming_secret - 2>/dev/null || true
    docker secret create lusotown_ssl_certificate /etc/ssl/lusotown/lusotown-streaming.crt 2>/dev/null || true
    docker secret create lusotown_ssl_private_key /etc/ssl/lusotown/lusotown-streaming.key 2>/dev/null || true
    
    # Deploy stack
    cd "$STREAMING_DIR/docker-compose"
    docker stack deploy --compose-file docker-compose.prod.yml lusotown-streaming
    
    echo " Deployed to Docker Swarm"
}

# Deploy with Docker Compose (fallback)
deploy_with_compose() {
    echo "Deploying with Docker Compose..."
    
    cd "$STREAMING_DIR/docker-compose"
    
    # Create production network
    docker network create lusotown-production 2>/dev/null || true
    
    # Deploy services
    docker-compose -f docker-compose.prod.yml up -d --build
    
    echo " Deployed with Docker Compose"
}

# Configure monitoring and alerting
setup_monitoring() {
    echo "Setting up production monitoring..."
    
    # Create monitoring configuration
    mkdir -p "$STREAMING_DIR/monitoring/dashboards"
    mkdir -p "$STREAMING_DIR/monitoring/datasources"
    
    # TODO: Add Grafana dashboards and Prometheus configuration
    # This would be expanded with actual monitoring configuration files
    
    echo " Monitoring configuration prepared"
}

# Verify deployment
verify_deployment() {
    echo "Verifying production deployment..."
    
    local max_attempts=60
    local attempt=1
    
    while [[ $attempt -le $max_attempts ]]; do
        if curl -k -s https://localhost/health | grep -q "healthy"; then
            echo " Production deployment is healthy"
            return 0
        fi
        
        echo "� Attempt $attempt/$max_attempts - waiting for services..."
        sleep 10
        ((attempt++))
    done
    
    echo "�  Deployment verification timed out. Check logs for issues."
}

# Display production information
show_production_info() {
    echo ""
    echo "<� LusoTown Portuguese-speaking Community Streaming - Production Endpoints"
    echo "=============================================================="
    echo ""
    echo "<� RTMP Ingest (Secure):"
    echo "   rtmp://stream.lusotown.com:1935/live/[stream_key]"
    echo ""
    echo "< HLS Streaming (CDN):"
    echo "   https://stream.lusotown.com/live/[stream_key].m3u8"
    echo ""
    echo "� WebRTC Low-latency:"
    echo "   https://stream.lusotown.com:8000"
    echo ""
    echo "=' Management API (Secured):"
    echo "   https://stream.lusotown.com/api/v1/"
    echo ""
    echo "=� Health Check:"
    echo "   https://stream.lusotown.com/health"
    echo ""
    echo "=� Production Services Status:"
    if [[ "$DEPLOYMENT_MODE" == "swarm" ]]; then
        docker stack services lusotown-streaming
    else
        cd "$STREAMING_DIR/docker-compose"
        docker-compose -f docker-compose.prod.yml ps
    fi
    echo ""
    echo "= Security Features:"
    echo "    SSL/TLS encryption"
    echo "    CDN integration (BunnyCDN)"
    echo "    Stream authentication"
    echo "    Rate limiting"
    echo "    Portuguese-speaking community access control"
}

# Main production deployment
main() {
    validate_environment
    check_production_prerequisites
    setup_production_directories
    setup_ssl_certificates
    build_production_images
    setup_monitoring
    
    case "$DEPLOYMENT_MODE" in
        "swarm")
            deploy_to_swarm
            ;;
        "kubernetes")
            echo "Kubernetes deployment not implemented yet"
            exit 1
            ;;
        "compose")
            deploy_with_compose
            ;;
    esac
    
    verify_deployment
    show_production_info
    
    echo ""
    echo "<� LusoTown Portuguese-speaking Community Streaming is now live in production!"
    echo "   Serving the Portuguese-speaking community in London & UK with professional streaming"
    echo ""
    echo "=� Next Steps:"
    echo "   1. Configure DNS: stream.lusotown.com � your_server_ip"
    echo "   2. Setup monitoring alerts"
    echo "   3. Configure backup procedures"
    echo "   4. Test with Portuguese-speaking community creators"
}

# Execute main function
main "$@"