#!/bin/bash

# LusoTown Post-Deployment Monitoring Script
# Monitors application health and performance after deployment

set -e

# Configuration
APP_URL="${1:-https://lusotown.vercel.app}"
MONITOR_DURATION=300  # 5 minutes
CHECK_INTERVAL=30     # 30 seconds
LOG_FILE="monitoring-$(date +%Y%m%d-%H%M%S).log"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log() {
    echo -e "${BLUE}[$(date +'%H:%M:%S')]${NC} $1" | tee -a "$LOG_FILE"
}

success() {
    echo -e "${GREEN}[OK]${NC} $1" | tee -a "$LOG_FILE"
}

warning() {
    echo -e "${YELLOW}[WARN]${NC} $1" | tee -a "$LOG_FILE"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a "$LOG_FILE"
}

# Health check function
health_check() {
    local url="$1"
    local timeout=10
    
    # Basic connectivity
    if curl -s --max-time "$timeout" "$url" > /dev/null; then
        success "Application accessible at $url"
        
        # Response time check
        RESPONSE_TIME=$(curl -o /dev/null -s -w "%{time_total}" --max-time "$timeout" "$url")
        if (( $(echo "$RESPONSE_TIME < 3.0" | bc -l) )); then
            success "Response time: ${RESPONSE_TIME}s (Good)"
        else
            warning "Response time: ${RESPONSE_TIME}s (Slow)"
        fi
        
        # Status code check
        STATUS_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$url")
        if [[ "$STATUS_CODE" == "200" ]]; then
            success "HTTP Status: $STATUS_CODE"
        else
            warning "HTTP Status: $STATUS_CODE"
        fi
        
        return 0
    else
        error "Application not accessible at $url"
        return 1
    fi
}

# Portuguese content check
portuguese_content_check() {
    local url="$1"
    
    # Check for Portuguese content
    if curl -s "$url" | grep -i "português\|lusotow\|portugal" > /dev/null; then
        success "Portuguese content detected"
    else
        warning "Portuguese content not detected"
    fi
    
    # Check for bilingual support
    if curl -s "$url" | grep -i "pt:\|en:" > /dev/null; then
        success "Bilingual support detected"
    else
        warning "Bilingual support not detected in rendered HTML"
    fi
}

# Performance monitoring
performance_check() {
    local url="$1"
    
    log "Checking performance metrics..."
    
    # Page load metrics
    METRICS=$(curl -s -w "DNS: %{time_namelookup}s, Connect: %{time_connect}s, Total: %{time_total}s, Size: %{size_download} bytes" -o /dev/null "$url")
    log "Performance: $METRICS"
    
    # Check for common optimization indicators
    HEADERS=$(curl -s -I "$url")
    
    if echo "$HEADERS" | grep -i "cache-control" > /dev/null; then
        success "Cache headers present"
    else
        warning "No cache headers detected"
    fi
    
    if echo "$HEADERS" | grep -i "content-encoding.*gzip" > /dev/null; then
        success "Gzip compression enabled"
    else
        warning "Gzip compression not detected"
    fi
}

# Security headers check
security_check() {
    local url="$1"
    
    log "Checking security headers..."
    
    HEADERS=$(curl -s -I "$url")
    
    if echo "$HEADERS" | grep -i "x-content-type-options" > /dev/null; then
        success "X-Content-Type-Options header present"
    else
        warning "X-Content-Type-Options header missing"
    fi
    
    if echo "$HEADERS" | grep -i "x-frame-options" > /dev/null; then
        success "X-Frame-Options header present"
    else
        warning "X-Frame-Options header missing"
    fi
    
    if echo "$HEADERS" | grep -i "strict-transport-security" > /dev/null; then
        success "HSTS header present"
    else
        warning "HSTS header missing"
    fi
}

# Networking features check
networking_check() {
    local url="$1"
    
    log "Checking networking features..."
    
    # Check for My Network page
    if curl -s "${url}/my-network/" | grep -i "network\|connection" > /dev/null; then
        success "My Network page accessible"
    else
        warning "My Network page not accessible or missing content"
    fi
    
    # Check for events page
    if curl -s "${url}/events/" | grep -i "event" > /dev/null; then
        success "Events page accessible"
    else
        warning "Events page not accessible"
    fi
}

# Generate monitoring report
generate_monitor_report() {
    local start_time="$1"
    local end_time="$2"
    
    REPORT_FILE="monitoring-report-$(date +%Y%m%d-%H%M%S).md"
    
    cat > "$REPORT_FILE" << EOL
# LusoTown Post-Deployment Monitoring Report

**Start Time:** $start_time
**End Time:** $end_time
**Application URL:** $APP_URL

## Health Checks
- Application accessibility: Monitored every ${CHECK_INTERVAL}s
- Response time monitoring: < 3s target
- HTTP status code verification

## Performance Monitoring
- DNS resolution time
- Connection establishment time
- Total request time
- Content compression check
- Cache header verification

## Security Assessment
- Security headers verification
- Content type protection
- Frame options security
- Transport security headers

## Portuguese Community Features
- Portuguese content detection
- Bilingual interface verification
- Networking features accessibility
- Events system functionality

## Recommendations
See monitoring log for detailed findings: $LOG_FILE

## Status
$(if [[ -f "$LOG_FILE" ]]; then
    if grep -q "ERROR" "$LOG_FILE"; then
        echo "⚠️  Issues detected - Review log file"
    else
        echo "✅ All checks passed"
    fi
else
    echo "📋 Monitoring in progress"
fi)
EOL
    
    log "Monitoring report generated: $REPORT_FILE"
}

# Main monitoring function
main() {
    local start_time=$(date)
    
    log "🔍 Starting post-deployment monitoring for $APP_URL"
    log "Duration: ${MONITOR_DURATION}s, Check interval: ${CHECK_INTERVAL}s"
    
    local end_time=$(( $(date +%s) + MONITOR_DURATION ))
    local check_count=0
    
    while [[ $(date +%s) -lt $end_time ]]; do
        check_count=$((check_count + 1))
        log "Check #$check_count"
        
        # Run all checks
        health_check "$APP_URL"
        portuguese_content_check "$APP_URL"
        performance_check "$APP_URL"
        security_check "$APP_URL"
        networking_check "$APP_URL"
        
        if [[ $(date +%s) -lt $end_time ]]; then
            log "Waiting ${CHECK_INTERVAL}s for next check..."
            sleep $CHECK_INTERVAL
        fi
    done
    
    local finish_time=$(date)
    generate_monitor_report "$start_time" "$finish_time"
    
    success "Monitoring completed after $check_count checks"
    log "Report available: monitoring-report-*.md"
}

# Run monitoring
main "$@"
