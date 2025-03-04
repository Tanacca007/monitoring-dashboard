const MetricGatheringUtils = {
  gatherRelatedMetrics(alert) {
    return {
      primary: this.getPrimaryMetrics(alert),
      correlated: this.getCorrelatedMetrics(alert),
      historical: this.getHistoricalContext(alert),
      trends: this.analyzeTrends(alert)
    };
  },

  getPrimaryMetrics(alert) {
    const timeRange = this.calculateTimeRange(alert);
    return {
      current: this.getCurrentMetricValue(alert.metric),
      baseline: this.getBaselineMetrics(alert.metric, timeRange),
      threshold: this.getThresholdDetails(alert.metric),
      deviation: this.calculateDeviation(alert)
    };
  },

  getCorrelatedMetrics(alert) {
    const correlationWindow = this.getCorrelationWindow(alert);
    const relatedSystems = this.identifyRelatedSystems(alert.metric);
    
    return relatedSystems.map(system => ({
      system,
      metrics: this.collectSystemMetrics(system, correlationWindow),
      correlation: this.calculateCorrelation(alert.metric, system)
    }));
  },

  getHistoricalContext(alert) {
    return {
      previousIncidents: this.findPreviousIncidents(alert.metric),
      seasonalPatterns: this.analyzeSeasonality(alert.metric),
      longTermTrends: this.analyzeLongTermTrends(alert.metric)
    };
  }
};

export { MetricGatheringUtils };
