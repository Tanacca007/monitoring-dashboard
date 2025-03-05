import React from 'react';
import { render, screen } from '@testing-library/react';
import AlertSystem from '../AlertSystem';
import { SystemMetrics } from '../../../services/MonitoringService';

describe('AlertSystem', () => {
  const createMetrics = (overrides: Partial<SystemMetrics> = {}): SystemMetrics => ({
    activeUsers: 1000,
    systemLoad: 50,
    responseTime: 100,
    errorRate: 0.01,
    cpuUtilization: 60,
    memoryUsage: 70,
    networkLatency: 50,
    diskUsage: 60,
    requestsPerSecond: 500,
    databaseConnections: 20,
    cacheHitRate: 85,
    timestamp: new Date().toISOString(),
    ...overrides
  });

  it('shows no alerts when metrics are within normal range', () => {
    render(<AlertSystem metrics={createMetrics()} />);
    expect(screen.queryByText(/Active Alerts/)).not.toBeInTheDocument();
  });

  it('shows system load warning when above threshold', () => {
    render(<AlertSystem metrics={createMetrics({ systemLoad: 85 })} />);
    expect(screen.getByText(/High system load/)).toBeInTheDocument();
  });

  it('shows error rate alert when above threshold', () => {
    render(<AlertSystem metrics={createMetrics({ errorRate: 0.06 })} />);
    expect(screen.getByText(/High error rate/)).toBeInTheDocument();
  });

  it('shows multiple alerts when multiple thresholds are exceeded', () => {
    render(
      <AlertSystem
        metrics={createMetrics({
          systemLoad: 85,
          errorRate: 0.06
        })}
      />
    );

    expect(screen.getByText(/High system load/)).toBeInTheDocument();
    expect(screen.getByText(/High error rate/)).toBeInTheDocument();
  });
}); 