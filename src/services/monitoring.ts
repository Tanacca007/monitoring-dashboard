import api from './api';

export interface Metric {
  id: string;
  name: string;
  value: number;
  unit: string;
  timestamp: string;
  trend: 'up' | 'down' | 'stable';
  changePercentage: number;
}

export interface Alert {
  id: string;
  type: 'critical' | 'error' | 'warning' | 'info';
  message: string;
  timestamp: string;
  source: string;
}

export const monitoringService = {
  // Fetch system metrics
  getMetrics: async (): Promise<Metric[]> => {
    const response = await api.get('/metrics');
    return response.data;
  },

  // Fetch specific metric history
  getMetricHistory: async (metricId: string, timeRange: string): Promise<Metric[]> => {
    const response = await api.get(`/metrics/${metricId}/history`, {
      params: { timeRange }
    });
    return response.data;
  },

  // Fetch alerts
  getAlerts: async (status?: string): Promise<Alert[]> => {
    const response = await api.get('/alerts', {
      params: { status }
    });
    return response.data;
  },

  // Acknowledge an alert
  acknowledgeAlert: async (alertId: string): Promise<void> => {
    await api.post(`/alerts/${alertId}/acknowledge`);
  },

  // Update alert settings
  updateAlertSettings: async (settings: any): Promise<void> => {
    await api.put('/alerts/settings', settings);
  }
}; 