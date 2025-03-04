const StandardErrorCalculations = {
  calculateStandardErrors(data) {
    return {
      mean: this.standardErrorOfMean(data),
      proportion: this.standardErrorOfProportion(data),
      regression: this.standardErrorOfRegression(data),
      difference: this.standardErrorOfDifference(data)
    };
  },

  standardErrorOfMean(data) {
    const variance = VarianceCalculations.calculateVariance(data);
    return Math.sqrt(variance / data.length);
  },

  standardErrorOfProportion(successes, total) {
    const p = successes / total;
    return Math.sqrt((p * (1 - p)) / total);
  },

  standardErrorOfRegression(x, y) {
    const n = x.length;
    const correlation = this.calculateCorrelation(x, y);
    const standardError = Math.sqrt(
      (1 - correlation * correlation) * 
      VarianceCalculations.calculateVariance(y) / 
      ((n - 2) * VarianceCalculations.calculateVariance(x))
    );
    
    return {
      slope: standardError,
      correlation: Math.sqrt((1 - correlation * correlation) / (n - 2))
    };
  },

  standardErrorOfDifference(data1, data2) {
    const se1 = this.standardErrorOfMean(data1);
    const se2 = this.standardErrorOfMean(data2);
    return Math.sqrt(se1 * se1 + se2 * se2);
  }
};

export { StandardErrorCalculations };
