import React, { useEffect, useState } from 'react';
import MonitoringService, { SystemMetrics } from '../../services/MonitoringService';
import MetricsGrid from './MetricsGrid';
import AlertSystem from '../alerts/AlertSystem';
import MetricsCharts from './MetricsCharts';

const MainDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [metricsHistory, setMetricsHistory] = useState<SystemMetrics[]>([]);

  useEffect(() => {
    const monitoringService = MonitoringService.getInstance();
    const unsubscribe = monitoringService.subscribeToMetrics((newMetrics) => {
      setMetrics(newMetrics);
      setMetricsHistory(prev => {
        const updated = [...prev, newMetrics];
        return updated.slice(-20); // Keep last 20 data points
      });
    });

    return () => unsubscribe();
  }, []);

  if (!metrics) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="dashboard-container p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">System Dashboard</h1>
        <p className="text-gray-600 mt-2">Real-time system monitoring</p>
      </header>

      <div className="space-y-8">
        <MetricsGrid metrics={metrics} />
        
        {metricsHistory.length > 0 && (
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Performance Trends</h2>
            <MetricsCharts metricsHistory={metricsHistory} />
          </div>
        )}
        
        <AlertSystem metrics={metrics} />
      </div>
    </div>
  );
};

export default MainDashboard;