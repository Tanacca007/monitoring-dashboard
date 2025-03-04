const MetricsBreakdown = ({ metrics }) => {
  return (
    <div className="metrics-breakdown space-y-4">
      <PerformanceMetrics
        response={metrics.response}
        throughput={metrics.throughput}
        latency={metrics.latency}
      />
      
      <ResourceMetrics
        cpu={metrics.cpu}
        memory={metrics.memory}
        network={metrics.network}
      />
      
      <ErrorMetrics
        rate={metrics.errorRate}
        distribution={metrics.errorDistribution}
        trends={metrics.errorTrends}
      />
      
      <LoadMetrics
        concurrent={metrics.concurrentUsers}
        requests={metrics.requestRate}
        bandwidth={metrics.bandwidth}
      />
    </div>
  );
};

export { ResourceGauge, MetricsBreakdown };
