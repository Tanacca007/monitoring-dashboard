class PerformanceMetrics {
  constructor(config) {
    this.responseTime = new MetricCollector('response_time');
    this.throughput = new MetricCollector('throughput');
    this.errorRate = new MetricCollector('error_rate');
    this.latency = new MetricCollector('latency');
  }

  collect() {
    return {
      responseTime: this.responseTime.getCurrentMetrics(),
      throughput: this.throughput.getCurrentMetrics(),
      errorRate: this.errorRate.getCurrentMetrics(),
      latency: this.latency.getCurrentMetrics()
    };
  }
}

class SystemMetrics {
  constructor(config) {
    this.cpu = new MetricCollector('cpu_usage');
    this.memory = new MetricCollector('memory_usage');
    this.disk = new MetricCollector('disk_usage');
    this.network = new MetricCollector('network_io');
  }

  collect() {
    return {
      cpu: this.cpu.getCurrentMetrics(),
      memory: this.memory.getCurrentMetrics(),
      disk: this.disk.getCurrentMetrics(),
      network: this.network.getCurrentMetrics()
    };
  }
}
