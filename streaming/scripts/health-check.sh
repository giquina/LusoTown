#!/bin/bash
# LusoTown Streaming Health Check Script
# Monitors Portuguese-speaking community streaming infrastructure

set -e

# Check if SRS is running and responding
check_srs() {
    local srs_api_url="http://localhost:1985/api/v1/summaries"
    local timeout=5
    
    if curl -s --connect-timeout $timeout "$srs_api_url" >/dev/null 2>&1; then
        echo " SRS API is responding"
        return 0
    else
        echo " SRS API is not responding"
        return 1
    fi
}

# Check if nginx is running and serving content
check_nginx() {
    local nginx_url="http://localhost:8080"
    local timeout=5
    
    if curl -s --connect-timeout $timeout "$nginx_url" >/dev/null 2>&1; then
        echo " Nginx is responding"
        return 0
    else
        echo " Nginx is not responding"
        return 1
    fi
}

# Check streaming endpoint availability
check_streaming() {
    local stream_url="http://localhost:8080/live/"
    local timeout=5
    
    if curl -s --connect-timeout $timeout "$stream_url" >/dev/null 2>&1; then
        echo " Streaming endpoint is available"
        return 0
    else
        echo " Streaming endpoint is not available"
        return 1
    fi
}

# Check WebRTC endpoint
check_webrtc() {
    local webrtc_url="http://localhost:8000"
    local timeout=5
    
    if curl -s --connect-timeout $timeout "$webrtc_url" >/dev/null 2>&1; then
        echo " WebRTC endpoint is available"
        return 0
    else
        echo " WebRTC endpoint is not available"
        return 1
    fi
}

# Check disk space for streaming
check_disk_space() {
    local min_space_gb=5
    local available_space=$(df /tmp | awk 'NR==2 {print int($4/1024/1024)}')
    
    if [[ $available_space -ge $min_space_gb ]]; then
        echo " Sufficient disk space available: ${available_space}GB"
        return 0
    else
        echo " Low disk space: ${available_space}GB (minimum required: ${min_space_gb}GB)"
        return 1
    fi
}

# Check memory usage
check_memory() {
    local max_memory_percent=90
    local memory_usage=$(free | grep Mem | awk '{print ($3/$2) * 100.0}' | cut -d. -f1)
    
    if [[ $memory_usage -le $max_memory_percent ]]; then
        echo " Memory usage is healthy: ${memory_usage}%"
        return 0
    else
        echo " High memory usage: ${memory_usage}% (maximum: ${max_memory_percent}%)"
        return 1
    fi
}

# Main health check function
main() {
    echo "LusoTown Portuguese-speaking Community Streaming Health Check"
    echo "=================================================="
    
    local failed=0
    
    # Run all health checks
    check_srs || failed=$((failed + 1))
    check_nginx || failed=$((failed + 1))
    check_streaming || failed=$((failed + 1))
    check_webrtc || failed=$((failed + 1))
    check_disk_space || failed=$((failed + 1))
    check_memory || failed=$((failed + 1))
    
    echo "=================================================="
    
    if [[ $failed -eq 0 ]]; then
        echo " All health checks passed - streaming infrastructure is healthy"
        exit 0
    else
        echo " $failed health check(s) failed - streaming infrastructure needs attention"
        exit 1
    fi
}

# Execute main function
main "$@"