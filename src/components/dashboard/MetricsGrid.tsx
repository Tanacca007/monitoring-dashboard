import React from 'react';
import { SystemMetrics } from '../../services/MonitoringService';

interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: 'up' | 'down';
  change?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, trend, change }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold mt-2">{value}</p>
    {trend && change && (
      <div className={`mt-2 text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
        {trend === 'up' ? '↑' : '↓'} {change}
      </div>
    )}
  </div>
);

interface MetricsGridProps {
  metrics: SystemMetrics;
}

const MetricsGrid: React.FC<MetricsGridProps> = ({ metrics }) => {
  const formatValue = (value: number, type: 'percentage' | 'number' | 'time'): string => {
    switch (type) {
      case 'percentage':
        return `${value.toFixed(1)}%`;
      case 'time':
        return `${value}ms`;
      default:
        return value.toString();
    }
  };

  const metricConfigs = [
    { title: 'Active Users', value: metrics.activeUsers },
    { title: 'CPU Utilization', value: formatValue(metrics.cpuUtilization, 'percentage') },
    { title: 'Memory Usage', value: formatValue(metrics.memoryUsage, 'percentage') },
    { title: 'System Load', value: formatValue(metrics.systemLoad, 'percentage') },
    { title: 'Response Time', value: formatValue(metrics.responseTime, 'time') },
    { title: 'Error Rate', value: `${(metrics.errorRate * 100).toFixed(2)}%` },
    { title: 'Network Latency', value: formatValue(metrics.networkLatency, 'time') },
    { title: 'Cache Hit Rate', value: formatValue(metrics.cacheHitRate, 'percentage') }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metricConfigs.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
};

export default MetricsGrid;