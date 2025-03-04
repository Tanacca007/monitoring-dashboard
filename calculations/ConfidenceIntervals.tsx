const ConfidenceIntervals = {
  calculateInterval(data, confidence = 0.95) {
    const n = data.length;
    const mean = data.reduce((a, b) => a + b) / n;
    const stdDev = Math.sqrt(
      data.reduce((sq, x) => sq + Math.pow(x - mean, 2), 0) / (n - 1)
    );
    
    const criticalValue = this.getCriticalValue(confidence);
    const margin = criticalValue * (stdDev / Math.sqrt(n));

    return {
      lower: mean - margin,
      upper: mean + margin,
      mean: mean,
      confidence: confidence * 100,
      stdDev: stdDev,
      sampleSize: n
    };
  },

  getCriticalValue(confidence) {
    // Z-scores for common confidence levels
    const zScores = {
      0.99: 2.576,
      0.95: 1.96,
      0.90: 1.645,
      0.85: 1.44,
      0.80: 1.28
    };
    return zScores[confidence] || 1.96;
  },

  calculateBootstrapInterval(data, confidence = 0.95, iterations = 1000) {
    const bootstrapMeans = [];
    const n = data.length;

    for (let i = 0; i < iterations; i++) {
      const sample = Array.from({ length: n }, () => 
        data[Math.floor(Math.random() * n)]
      );
      bootstrapMeans.push(
        sample.reduce((a, b) => a + b) / n
      );
    }

    bootstrapMeans.sort((a, b) => a - b);
    const alpha = 1 - confidence;
    const lowerIndex = Math.floor((alpha / 2) * iterations);
    const upperIndex = Math.floor((1 - alpha / 2) * iterations);

    return {
      lower: bootstrapMeans[lowerIndex],
      upper: bootstrapMeans[upperIndex],
      mean: data.reduce((a, b) => a + b) / n,
      confidence: confidence * 100
    };
  }
};

export { ConfidenceIntervals };
