import React from 'react';
import { render, screen } from '@testing-library/react';
import MetricsGrid from '../MetricsGrid';
import { SystemMetrics } from '../../../services/MonitoringService';

describe('MetricsGrid', () => {
  const mockMetrics: SystemMetrics = {
    activeUsers: 1234,
    systemLoad: 67,
    responseTime: 120,
    errorRate: 0.02,
    cpuUtilization: 75,
    memoryUsage: 80,
    networkLatency: 50,
    diskUsage: 60,
    requestsPerSecond: 500,
    databaseConnections: 20,
    cacheHitRate: 85,
    timestamp: new Date().toISOString()
  };

  it('renders all metric cards', () => {
    render(<MetricsGrid metrics={mockMetrics} />);

    expect(screen.getByText('Active Users')).toBeInTheDocument();
    expect(screen.getByText('CPU Utilization')).toBeInTheDocument();
    expect(screen.getByText('Memory Usage')).toBeInTheDocument();
    expect(screen.getByText('System Load')).toBeInTheDocument();
    expect(screen.getByText('Response Time')).toBeInTheDocument();
    expect(screen.getByText('Error Rate')).toBeInTheDocument();
    expect(screen.getByText('Network Latency')).toBeInTheDocument();
    expect(screen.getByText('Cache Hit Rate')).toBeInTheDocument();
  });

  it('formats values correctly', () => {
    render(<MetricsGrid metrics={mockMetrics} />);

    expect(screen.getByText('1234')).toBeInTheDocument();
    expect(screen.getByText('75.0%')).toBeInTheDocument();
    expect(screen.getByText('80.0%')).toBeInTheDocument();
    expect(screen.getByText('67.0%')).toBeInTheDocument();
    expect(screen.getByText('120ms')).toBeInTheDocument();
    expect(screen.getByText('2.00%')).toBeInTheDocument();
  });
}); 