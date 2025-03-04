const PerformanceMetrics = ({ response, throughput, latency }) => {
  return (
    <div className="performance-metrics">
      <h4 className="font-medium mb-3">Performance Metrics</h4>
      <div className="grid grid-cols-3 gap-4">
        <MetricTile
          label="Response Time"
          value={response.average}
          unit="ms"
          trend={response.trend}
          sparkline={response.history}
        />
        
        <MetricTile
          label="Throughput"
          value={throughput.current}
          unit="req/s"
          trend={throughput.trend}
          sparkline={throughput.history}
        />
        
        <MetricTile
          label="Latency"
          value={latency.p95}
          unit="ms"
          trend={latency.trend}
          sparkline={latency.history}
        />
      </div>
    </div>
  );
};

const ResourceMetrics = ({ cpu, memory, network }) => {
  return (
    <div className="resource-metrics">
      <h4 className="font-medium mb-3">Resource Utilization</h4>
      <div className="grid grid-cols-3 gap-4">
        <UtilizationChart
          label="CPU Usage"
          current={cpu.current}
          peak={cpu.peak}
          history={cpu.history}
        />
        
        <UtilizationChart
          label="Memory Usage"
          current={memory.current}
          peak={memory.peak}
          history={memory.history}
        />
        
        <UtilizationChart
          label="Network I/O"
          current={network.throughput}
          peak={network.peak}
          history={network.history}
        />
      </div>
    </div>
  );
};

const LoadMetrics = ({ concurrent, requests, bandwidth }) => {
  return (
    <div className="load-metrics">
      <h4 className="font-medium mb-3">Load Metrics</h4>
      <div className="grid grid-cols-3 gap-4">
        <LoadIndicator
          label="Active Users"
          value={concurrent}
          capacity={concurrent.max}
        />
        
        <LoadIndicator
          label="Request Rate"
          value={requests.current}
          capacity={requests.limit}
        />
        
        <LoadIndicator
          label="Bandwidth"
          value={bandwidth.usage}
          capacity={bandwidth.limit}
        />
      </div>
    </div>
  );
};

export { PerformanceMetrics, ResourceMetrics, LoadMetrics };
