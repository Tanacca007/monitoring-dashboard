export interface SystemMetrics {
  activeUsers: number;
  systemLoad: number;
  responseTime: number;
  errorRate: number;
  timestamp: string;
  memoryUsage: number;
  cpuUtilization: number;
  networkLatency: number;
  diskUsage: number;
  requestsPerSecond: number;
  databaseConnections: number;
  cacheHitRate: number;
}

class MonitoringService {
  private static instance: MonitoringService;
  private updateInterval: number = 5000; // 5 seconds

  private constructor() {}

  public static getInstance(): MonitoringService {
    if (!MonitoringService.instance) {
      MonitoringService.instance = new MonitoringService();
    }
    return MonitoringService.instance;
  }

  public async getSystemMetrics(): Promise<SystemMetrics> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          activeUsers: Math.floor(Math.random() * 2000) + 500,
          systemLoad: Math.floor(Math.random() * 100),
          responseTime: Math.floor(Math.random() * 200) + 50,
          errorRate: parseFloat((Math.random() * 0.1).toFixed(4)),
          timestamp: new Date().toISOString(),
          memoryUsage: Math.floor(Math.random() * 100),
          cpuUtilization: Math.floor(Math.random() * 100),
          networkLatency: Math.floor(Math.random() * 150) + 20,
          diskUsage: Math.floor(Math.random() * 100),
          requestsPerSecond: Math.floor(Math.random() * 1000) + 100,
          databaseConnections: Math.floor(Math.random() * 100) + 10,
          cacheHitRate: Math.floor(Math.random() * 100)
        });
      }, 500);
    });
  }

  public subscribeToMetrics(callback: (metrics: SystemMetrics) => void): () => void {
    const intervalId = setInterval(async () => {
      const metrics = await this.getSystemMetrics();
      callback(metrics);
    }, this.updateInterval);

    return () => clearInterval(intervalId);
  }
}

export default MonitoringService;