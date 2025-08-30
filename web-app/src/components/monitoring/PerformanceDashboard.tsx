'use client'

/**
 * Performance Monitoring Dashboard for LusoTown Portuguese-speaking Community Platform
 * 
 * Real-time performance monitoring including:
 * - Database connection pool status
 * - Redis cache performance metrics
 * - API response time charts
 * - Portuguese community activity indicators
 * - System health alerts and recommendations
 */

import React, { useState, useEffect } from 'react';
import { 
  ChartBarIcon, 
  CpuChipIcon, 
  CircleStackIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

interface PerformanceMetrics {
  timestamp: string;
  system: {
    uptime: number;
    memoryUsage: { used: number; total: number; percentage: number };
    cpuUsage: number;
    environment: string;
  };
  database: {
    activeConnections: number;
    connectionUtilization: number;
    averageQueryTime: number;
    slowQueries: number;
  };
  cache: {
    hitRatio: number;
    memoryUsage: number;
    operationsPerSecond: number;
    connected: boolean;
  };
  apiPerformance: {
    totalRequests: number;
    averageResponseTime: number;
    errorRate: number;
    slowEndpoints: string[];
  };
  portugueseCommunity: {
    activeUsers: number;
    culturalEvents: number;
    businessDirectoryQueries: number;
    geoLocationQueries: number;
  };
  recommendations: string[];
  alerts: string[];
  status: 'healthy' | 'degraded' | 'critical';
}

export default function PerformanceDashboard() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshInterval, setRefreshInterval] = useState(30000); // 30 seconds
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Fetch performance metrics
  const fetchMetrics = async () => {
    try {
      const response = await fetch('/api/monitoring/performance', {
        cache: 'no-store'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setMetrics(data);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch metrics');
      console.error('Performance metrics fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Setup auto-refresh
  useEffect(() => {
    fetchMetrics();
    
    const interval = setInterval(fetchMetrics, refreshInterval);
    
    return () => clearInterval(interval);
  }, [refreshInterval]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-green-600 bg-green-50';
      case 'degraded':
        return 'text-yellow-600 bg-yellow-50';
      case 'critical':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircleIcon className="h-5 w-5" />;
      case 'degraded':
        return <ExclamationTriangleIcon className="h-5 w-5" />;
      case 'critical':
        return <XCircleIcon className="h-5 w-5" />;
      default:
        return <CircleStackIcon className="h-5 w-5" />;
    }
  };

  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))  } ${  sizes[i]}`;
  };

  if (loading && !metrics) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="h-8 bg-gray-200 rounded mb-4"></div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-24 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !metrics) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center">
              <XCircleIcon className="h-6 w-6 text-red-600 mr-3" />
              <div>
                <h3 className="text-lg font-medium text-red-800">
                  Failed to load performance metrics
                </h3>
                <p className="text-red-700 mt-1">{error}</p>
                <button
                  onClick={fetchMetrics}
                  className="mt-3 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Performance Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Portuguese-speaking Community Platform Monitoring
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${getStatusColor(metrics?.status || 'unknown')}`}>
                {getStatusIcon(metrics?.status || 'unknown')}
                <span className="ml-2 capitalize">{metrics?.status || 'Unknown'}</span>
              </div>
              {lastUpdated && (
                <p className="text-sm text-gray-500">
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </p>
              )}
            </div>
          </div>
        </div>

        {metrics && (
          <>
            {/* System Overview */}
            <div className="bg-white rounded-lg shadow mb-6">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">System Overview</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-3">
                      <ClockIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatUptime(metrics.system.uptime)}
                    </p>
                    <p className="text-sm text-gray-500">System Uptime</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-3">
                      <CpuChipIcon className="h-6 w-6 text-green-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      {metrics.system.memoryUsage.percentage}%
                    </p>
                    <p className="text-sm text-gray-500">Memory Usage</p>
                    <p className="text-xs text-gray-400">
                      {formatBytes(metrics.system.memoryUsage.used)} / {formatBytes(metrics.system.memoryUsage.total)}
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-3">
                      <CircleStackIcon className="h-6 w-6 text-purple-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      {metrics.database.activeConnections}
                    </p>
                    <p className="text-sm text-gray-500">Active Connections</p>
                    <p className="text-xs text-gray-400">
                      {metrics.database.connectionUtilization.toFixed(1)}% utilized
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mx-auto mb-3">
                      <ChartBarIcon className="h-6 w-6 text-orange-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      {metrics.cache.hitRatio.toFixed(1)}%
                    </p>
                    <p className="text-sm text-gray-500">Cache Hit Ratio</p>
                    <p className="text-xs text-gray-400">
                      {metrics.cache.connected ? 'Connected' : 'Disconnected'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Portuguese Community Metrics */}
            <div className="bg-white rounded-lg shadow mb-6">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Portuguese Community Activity
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-3xl font-bold text-blue-600">
                      {metrics.portugueseCommunity.activeUsers}
                    </p>
                    <p className="text-sm text-blue-800">Active Users</p>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4">
                    <p className="text-3xl font-bold text-green-600">
                      {metrics.portugueseCommunity.culturalEvents}
                    </p>
                    <p className="text-sm text-green-800">Cultural Events</p>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-4">
                    <p className="text-3xl font-bold text-purple-600">
                      {metrics.portugueseCommunity.businessDirectoryQueries}
                    </p>
                    <p className="text-sm text-purple-800">Business Queries</p>
                  </div>
                  
                  <div className="bg-orange-50 rounded-lg p-4">
                    <p className="text-3xl font-bold text-orange-600">
                      {metrics.portugueseCommunity.geoLocationQueries}
                    </p>
                    <p className="text-sm text-orange-800">Location Searches</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Database Performance */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Database Performance
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Query Performance</span>
                        <span>{metrics.database.averageQueryTime}ms avg</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${Math.min((metrics.database.averageQueryTime / 500) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Connection Utilization</span>
                        <span>{metrics.database.connectionUtilization.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${metrics.database.connectionUtilization}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="pt-2 border-t">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium text-red-600">
                          {metrics.database.slowQueries}
                        </span> slow queries detected
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* API Performance */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    API Performance
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-2xl font-bold text-gray-900">
                          {metrics.apiPerformance.averageResponseTime}ms
                        </p>
                        <p className="text-sm text-gray-500">Avg Response Time</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">
                          {metrics.apiPerformance.errorRate.toFixed(2)}%
                        </p>
                        <p className="text-sm text-gray-500">Error Rate</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Total Requests: {metrics.apiPerformance.totalRequests.toLocaleString()}
                      </p>
                      
                      {metrics.apiPerformance.slowEndpoints.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-red-600 mb-1">
                            Slow Endpoints:
                          </p>
                          <ul className="text-xs text-red-500 space-y-1">
                            {metrics.apiPerformance.slowEndpoints.slice(0, 3).map((endpoint, index) => (
                              <li key={index} className="font-mono">
                                {endpoint}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Alerts and Recommendations */}
            {(metrics.alerts.length > 0 || metrics.recommendations.length > 0) && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Alerts */}
                {metrics.alerts.length > 0 && (
                  <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-red-800 flex items-center">
                        <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
                        Active Alerts
                      </h3>
                    </div>
                    <div className="p-6">
                      <ul className="space-y-3">
                        {metrics.alerts.map((alert, index) => (
                          <li key={index} className="flex items-start">
                            <ExclamationTriangleIcon className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                            <span className="text-sm text-red-700">{alert}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Recommendations */}
                {metrics.recommendations.length > 0 && (
                  <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-blue-800 flex items-center">
                        <CheckCircleIcon className="h-5 w-5 mr-2" />
                        Recommendations
                      </h3>
                    </div>
                    <div className="p-6">
                      <ul className="space-y-3">
                        {metrics.recommendations.map((recommendation, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircleIcon className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                            <span className="text-sm text-blue-700">{recommendation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Refresh Controls */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label htmlFor="refresh-interval" className="block text-sm font-medium text-gray-700">
                      Auto-refresh interval
                    </label>
                    <select
                      id="refresh-interval"
                      value={refreshInterval}
                      onChange={(e) => setRefreshInterval(Number(e.target.value))}
                      className="mt-1 block w-32 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                    >
                      <option value={10000}>10 seconds</option>
                      <option value={30000}>30 seconds</option>
                      <option value={60000}>1 minute</option>
                      <option value={300000}>5 minutes</option>
                    </select>
                  </div>
                  
                  <button
                    onClick={fetchMetrics}
                    disabled={loading}
                    className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50 flex items-center"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Refreshing...
                      </>
                    ) : (
                      'Refresh Now'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}