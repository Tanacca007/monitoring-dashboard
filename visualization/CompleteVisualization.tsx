const CompleteVisualization = {
  render() {
    return (
      <div className="statistical-dashboard">
        <DistributionPanel />
        <CorrelationPanel />
        <TimeSeriesPanel />
        <MetricsPanel />
      </div>
    );
  }
};
