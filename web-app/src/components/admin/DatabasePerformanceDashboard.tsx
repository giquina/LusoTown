"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import logger from '@/utils/logger';

interface PerformanceMetrics {
  timestamp: string;
  healthStatus: {
    connectionPool: {
      healthy: boolean;
      lastHealthCheck: string;
      averageResponseTime: number;
      unhealthyConnectionCount: number;
    };
    performanceMetrics: {
      queryCount: number;
      averageExecutionTime: number;
      slowQueries: any[];
      cacheHitRatio: number;
    };
    realtimeChannels: {
      active: number;
      channels: string[];
    };
    cacheStatus: {
      redisAvailable: boolean;
      cacheConfigs: string[];
    };
  };
  queryAnalytics: any;
  optimizationRecommendations: string[];
  alerts: any[];
}

export default function DatabasePerformanceDashboard() {
  const [performanceData, setPerformanceData] =
    useState<PerformanceMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshInterval, setRefreshInterval] = useState<NodeJS.Timeout | null>(
    null
  );
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchPerformanceMetrics = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "/api/database/performance?depth=comprehensive&cultural=true&health=true"
      );
      if (!response.ok) throw new Error("Failed to fetch performance metrics");
      const result = await response.json();
      if (result.success) {
        setPerformanceData(result.data);
        setLastUpdate(new Date());
        setError(null);
      } else {
        throw new Error(result.error || "Performance metrics fetch failed");
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      logger.error('Database performance metrics fetch failed', err, {
        area: 'performance',
        action: 'fetch_db_metrics',
        culturalContext: 'portuguese'
      });
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  const triggerMaintenance = async (action: string) => {
    try {
      setLoading(true);
      const response = await fetch("/api/database/performance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const result = await response.json();
      if (result.success) {
        setTimeout(fetchPerformanceMetrics, 2000);
      } else {
        throw new Error(result.error || "Maintenance action failed");
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      logger.error('Database maintenance action failed', err, {
        area: 'admin',
        action: 'database_maintenance',
        culturalContext: 'portuguese'
      });
      setError(
        err instanceof Error ? err.message : "Maintenance action failed"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPerformanceMetrics();
    if (autoRefresh) {
      const interval = setInterval(fetchPerformanceMetrics, 60000);
      setRefreshInterval(interval);
      return () => {
        if (interval) clearInterval(interval);
      };
    }
  }, [autoRefresh]);

  useEffect(() => {
    return () => {
      if (refreshInterval) clearInterval(refreshInterval);
    };
  }, [refreshInterval]);

  const getPerformanceGradeColor = (grade: string) => {
    switch (grade) {
      case "A+":
      case "A":
        return "text-green-600 bg-green-100";
      case "B+":
      case "B":
        return "text-blue-600 bg-blue-100";
      case "C+":
      case "C":
        return "text-yellow-600 bg-yellow-100";
      case "D":
      case "F":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getAlertLevelColor = (level: string) => {
    switch (level) {
      case "critical":
        return "text-red-600 bg-red-100 border-red-200";
      case "warning":
        return "text-yellow-600 bg-yellow-100 border-yellow-200";
      case "info":
        return "text-blue-600 bg-blue-100 border-blue-200";
      default:
        return "text-gray-600 bg-gray-100 border-gray-200";
    }
  };

  if (loading && !performanceData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4" />
              <div className="h-4 bg-gray-200 rounded w-48 mx-auto" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <div className="text-red-600 text-lg font-semibold mb-2">
              Performance Monitoring Error
            </div>
            <div className="text-red-500 mb-4">{error}</div>
            <button
              onClick={fetchPerformanceMetrics}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Retry Connection
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Portuguese Community Database Performance
            </h1>
            <p className="text-gray-600 mt-1">
              Real-time monitoring and optimization for Portuguese cultural
              queries
            </p>
            {lastUpdate && (
              <p className="text-sm text-gray-500 mt-1">
                Last updated: {lastUpdate.toLocaleString()}
              </p>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                autoRefresh
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Auto Refresh: {autoRefresh ? "On" : "Off"}
            </button>
            <button
              onClick={fetchPerformanceMetrics}
              disabled={loading}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors"
            >
              {loading ? "Refreshing..." : "Refresh Now"}
            </button>
          </div>
        </div>

        {performanceData?.alerts && performanceData.alerts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <h2 className="text-xl font-semibold text-gray-900">
              Performance Alerts
            </h2>
            <div className="grid gap-4">
              {performanceData.alerts.map((alert, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border-2 ${getAlertLevelColor(alert.level)}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-sm uppercase tracking-wide">
                        {alert.level} - {alert.type.replace("_", " ")}
                      </div>
                      <div className="font-medium mt-1">{alert.message}</div>
                      <div className="text-sm mt-2">Impact: {alert.impact}</div>
                      <div className="text-sm font-medium mt-1">
                        Action: {alert.action}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(alert.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Connection Pool Health
            </h2>
            <div
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                performanceData?.healthStatus.connectionPool.healthy
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {performanceData?.healthStatus.connectionPool.healthy
                ? "Healthy"
                : "Unhealthy"}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">
                {performanceData?.healthStatus.performanceMetrics.queryCount ||
                  0}
              </div>
              <div className="text-sm text-gray-600 mt-1">Total Queries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {performanceData?.healthStatus.connectionPool.averageResponseTime?.toFixed(
                  1
                ) || 0}
                ms
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Avg Response Time
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {(
                  (performanceData?.healthStatus.performanceMetrics
                    .cacheHitRatio || 0) * 100
                ).toFixed(1)}
                %
              </div>
              <div className="text-sm text-gray-600 mt-1">Cache Hit Ratio</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {performanceData?.healthStatus.realtimeChannels.active || 0}
              </div>
              <div className="text-sm text-gray-600 mt-1">Active Channels</div>
            </div>
          </div>
        </motion.div>

        {performanceData?.queryAnalytics && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Portuguese Query Analytics
              </h2>
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium ${getPerformanceGradeColor(
                  performanceData.queryAnalytics.overallPortugueseQueryHealth
                    ?.performanceGrade || "pending"
                )}`}
              >
                Grade:{" "}
                {performanceData.queryAnalytics.overallPortugueseQueryHealth
                  ?.performanceGrade || "N/A"}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Business Search
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Avg Time:</span>
                    <span className="font-medium">
                      {performanceData.queryAnalytics.businessSearchPerformance?.averageExecutionTime?.toFixed(
                        1
                      ) || 0}
                      ms
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Cache Hit:</span>
                    <span className="font-medium">
                      {(
                        (performanceData.queryAnalytics
                          .businessSearchPerformance?.cacheHitRatio || 0) * 100
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Event Discovery
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Avg Time:</span>
                    <span className="font-medium">
                      {performanceData.queryAnalytics.eventDiscoveryPerformance?.averageExecutionTime?.toFixed(
                        1
                      ) || 0}
                      ms
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Cultural Score:
                    </span>
                    <span className="font-medium">
                      {performanceData.queryAnalytics.eventDiscoveryPerformance?.culturalScoringPerformance?.toFixed(
                        1
                      ) || 0}
                      ms
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Cultural Matching
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Avg Time:</span>
                    <span className="font-medium">
                      {performanceData.queryAnalytics.culturalMatchingPerformance?.averageExecutionTime?.toFixed(
                        1
                      ) || 0}
                      ms
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Location Factor:
                    </span>
                    <span className="font-medium">
                      {performanceData.queryAnalytics.culturalMatchingPerformance?.locationFactorPerformance?.toFixed(
                        1
                      ) || 0}
                      ms
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {performanceData?.optimizationRecommendations &&
          performanceData.optimizationRecommendations.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Optimization Recommendations
              </h2>
              <div className="space-y-3">
                {performanceData.optimizationRecommendations.map(
                  (recommendation, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg"
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      <div className="text-gray-700">{recommendation}</div>
                    </div>
                  )
                )}
              </div>
            </motion.div>
          )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Database Maintenance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => triggerMaintenance("maintenance")}
              disabled={loading}
              className="bg-primary-600 text-white px-4 py-3 rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors"
            >
              Run Full Maintenance
            </button>
            <button
              onClick={() => triggerMaintenance("health_check")}
              disabled={loading}
              className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              Health Check
            </button>
            <button
              onClick={() => triggerMaintenance("optimize_pool")}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              Optimize Pool
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            System Status
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <div
                className={`w-4 h-4 rounded-full mx-auto mb-2 ${
                  performanceData?.healthStatus.cacheStatus.redisAvailable
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              />
              <div className="text-sm font-medium">Redis Cache</div>
              <div className="text-xs text-gray-500">
                {performanceData?.healthStatus.cacheStatus.redisAvailable
                  ? "Available"
                  : "Unavailable"}
              </div>
            </div>
            <div className="text-center">
              <div className="w-4 h-4 bg-green-500 rounded-full mx-auto mb-2" />
              <div className="text-sm font-medium">PostGIS</div>
              <div className="text-xs text-gray-500">Operational</div>
            </div>
            <div className="text-center">
              <div
                className={`w-4 h-4 rounded-full mx-auto mb-2 ${
                  (performanceData?.healthStatus.realtimeChannels.active || 0) >
                  0
                    ? "bg-green-500"
                    : "bg-yellow-500"
                }`}
              />
              <div className="text-sm font-medium">Real-time</div>
              <div className="text-xs text-gray-500">
                {performanceData?.healthStatus.realtimeChannels.active || 0}{" "}
                channels
              </div>
            </div>
            <div className="text-center">
              <div
                className={`w-4 h-4 rounded-full mx-auto mb-2 ${
                  performanceData?.healthStatus.connectionPool.healthy
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              />
              <div className="text-sm font-medium">Database</div>
              <div className="text-xs text-gray-500">
                {performanceData?.healthStatus.connectionPool.healthy
                  ? "Healthy"
                  : "Issues"}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
