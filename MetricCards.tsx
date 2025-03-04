const MetricCards = ({ metrics }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <MetricCard
        title="Response Time"
        value={metrics.responseTime}
        unit="ms"
        trend={metrics.responseTrend}
        icon="clock"
        color="blue"
      />
      
      <MetricCard
        title="Compression Ratio"
        value={metrics.compressionRatio}
        unit="%"
        trend={metrics.compressionTrend}
        icon="compress"
        color="green"
      />
      
      <MetricCard
        title="Asset Count"
        value={metrics.assetCount}
        trend={metrics.assetTrend}
        icon="files"
        color="purple"
      />
      
      <MetricCard
        title="Cache Hit Rate"
        value={metrics.cacheHitRate}
        unit="%"
        trend={metrics.cacheTrend}
        icon="database"
        color="orange"
      />
    </div>
  );
};
