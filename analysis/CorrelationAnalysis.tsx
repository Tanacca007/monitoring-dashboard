const CorrelationAnalysis = {
  calculatePearsonCorrelation(x, y) {
    const n = x.length;
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((total, xi, i) => total + xi * y[i], 0);
    const sumX2 = x.reduce((total, xi) => total + xi * xi, 0);
    const sumY2 = y.reduce((total, yi) => total + yi * yi, 0);

    const correlation = (n * sumXY - sumX * sumY) /
      Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));

    return {
      coefficient: correlation,
      strength: this.getCorrelationStrength(correlation),
      significance: this.calculateSignificance(correlation, n)
    };
  },

  findMetricCorrelations(metrics) {
    const correlations = new Map();
    
    for (let i = 0; i < metrics.length; i++) {
      for (let j = i + 1; j < metrics.length; j++) {
        const correlation = this.calculatePearsonCorrelation(
          metrics[i].values,
          metrics[j].values
        );
        
        correlations.set(
          `${metrics[i].name}-${metrics[j].name}`,
          correlation
        );
      }
    }
    
    return correlations;
  }
};

export { ForecastingAlgorithms, CorrelationAnalysis };
