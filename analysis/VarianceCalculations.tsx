const VarianceCalculations = {
  calculateVariance(data) {
    const mean = this.calculateMean(data);
    const n = data.length;
    
    return data.reduce((sum, x) => 
      sum + Math.pow(x - mean, 2), 0
    ) / (n - 1);
  },

  calculateMean(data) {
    return data.reduce((sum, x) => sum + x, 0) / data.length;
  },

  calculateCovariance(x, y) {
    const n = x.length;
    const meanX = this.calculateMean(x);
    const meanY = this.calculateMean(y);
    
    return x.reduce((sum, xi, i) => 
      sum + (xi - meanX) * (y[i] - meanY), 0
    ) / (n - 1);
  },

  calculateStandardError(data) {
    return Math.sqrt(this.calculateVariance(data) / data.length);
  },

  calculateVarianceDecomposition(data, groups) {
    const totalMean = this.calculateMean(data);
    const totalVariance = this.calculateVariance(data);
    
    const betweenGroupVariance = groups.reduce((sum, group) => {
      const groupMean = this.calculateMean(group);
      return sum + group.length * Math.pow(groupMean - totalMean, 2);
    }, 0) / (data.length - 1);

    return {
      total: totalVariance,
      between: betweenGroupVariance,
      within: totalVariance - betweenGroupVariance
    };
  }
};

export { VarianceCalculations };
