import React, { useState, useEffect } from 'react';
import { SystemMetrics } from '../../services/MonitoringService';

interface Alert {
  id: string;
  message: string;
  type: 'warning' | 'error' | 'info' | 'critical';
  timestamp: Date;
}

interface AlertSystemProps {
  metrics: SystemMetrics;
}

const AlertSystem: React.FC<AlertSystemProps> = ({ metrics }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const checkThresholds = (metrics: SystemMetrics): Alert[] => {
    const newAlerts: Alert[] = [];
    const now = new Date();

    // System Load Alerts
    if (metrics.systemLoad > 90) {
      newAlerts.push({
        id: `load-${now.getTime()}`,
        message: `Critical system load: ${metrics.systemLoad}%`,
        type: 'critical',
        timestamp: now
      });
    } else if (metrics.systemLoad > 80) {
      newAlerts.push({
        id: `load-${now.getTime()}`,
        message: `High system load: ${metrics.systemLoad}%`,
        type: 'warning',
        timestamp: now
      });
    }

    // Memory Usage Alerts
    if (metrics.memoryUsage > 90) {
      newAlerts.push({
        id: `memory-${now.getTime()}`,
        message: `Critical memory usage: ${metrics.memoryUsage}%`,
        type: 'critical',
        timestamp: now
      });
    } else if (metrics.memoryUsage > 80) {
      newAlerts.push({
        id: `memory-${now.getTime()}`,
        message: `High memory usage: ${metrics.memoryUsage}%`,
        type: 'warning',
        timestamp: now
      });
    }

    // Error Rate Alerts
    if (metrics.errorRate > 0.1) {
      newAlerts.push({
        id: `error-${now.getTime()}`,
        message: `Critical error rate: ${(metrics.errorRate * 100).toFixed(2)}%`,
        type: 'critical',
        timestamp: now
      });
    } else if (metrics.errorRate > 0.05) {
      newAlerts.push({
        id: `error-${now.getTime()}`,
        message: `High error rate: ${(metrics.errorRate * 100).toFixed(2)}%`,
        type: 'error',
        timestamp: now
      });
    }

    // Network Latency Alerts
    if (metrics.networkLatency > 200) {
      newAlerts.push({
        id: `latency-${now.getTime()}`,
        message: `High network latency: ${metrics.networkLatency}ms`,
        type: 'warning',
        timestamp: now
      });
    }

    // Database Connections Alert
    if (metrics.databaseConnections > 80) {
      newAlerts.push({
        id: `db-${now.getTime()}`,
        message: `High database connections: ${metrics.databaseConnections}`,
        type: 'warning',
        timestamp: now
      });
    }

    // Cache Hit Rate Alert
    if (metrics.cacheHitRate < 50) {
      newAlerts.push({
        id: `cache-${now.getTime()}`,
        message: `Low cache hit rate: ${metrics.cacheHitRate}%`,
        type: 'info',
        timestamp: now
      });
    }

    return newAlerts;
  };

  useEffect(() => {
    const newAlerts = checkThresholds(metrics);
    if (newAlerts.length > 0) {
      setAlerts(prev => [...newAlerts, ...prev].slice(0, 10));
    }
  }, [metrics]);

  return (
    <div className="alerts-container">
      {alerts.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="text-lg font-semibold mb-4">Active Alerts</h3>
          <div className="space-y-2">
            {alerts.map(alert => (
              <div
                key={alert.id}
                className={`p-3 rounded ${
                  alert.type === 'critical' ? 'bg-red-200 text-red-900' :
                  alert.type === 'error' ? 'bg-red-100 text-red-800' :
                  alert.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}
              >
                <p className="text-sm font-medium">{alert.message}</p>
                <p className="text-xs mt-1 opacity-75">
                  {alert.timestamp.toLocaleTimeString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertSystem;
