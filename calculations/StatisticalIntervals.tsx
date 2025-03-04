const StatisticalIntervals = {
  calculatePredictionInterval(data, confidence = 0.95) {
    const stats = this.getBasicStats(data);
    const criticalValue = ConfidenceIntervals.getCriticalValue(confidence);
    const predictionError = stats.stdDev * Math.sqrt(1 + 1/data.length);
    
    return {
      lower: stats.mean - criticalValue * predictionError,
      upper: stats.mean + criticalValue * predictionError,
      mean: stats.mean,
      confidence: confidence * 100
    };
  },

  calculateToleranceInterval(data, confidence = 0.95, proportion = 0.95) {
    const stats = this.getBasicStats(data);
    const k = this.toleranceFactor(data.length, confidence, proportion);
    
    return {
      lower: stats.mean - k * stats.stdDev,
      upper: stats.mean + k * stats.stdDev,
      mean: stats.mean,
      confidence: confidence * 100,
      proportion: proportion * 100
    };
  },

  getBasicStats(data) {
    const n = data.length;
    const mean = data.reduce((a, b) => a + b) / n;
    const stdDev = Math.sqrt(
      data.reduce((sq, x) => sq + Math.pow(x - mean, 2), 0) / (n - 1)
    );
    
    return { mean, stdDev, n };
  }
};

export { BootstrapMethods, StatisticalIntervals };
