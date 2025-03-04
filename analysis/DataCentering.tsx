const DataCentering = {
  centerData(data) {
    const mean = this.calculateMean(data);
    return data.map(value => value - mean);
  },

  standardizeData(data) {
    const mean = this.calculateMean(data);
    const stdDev = this.calculateStandardDeviation(data, mean);
    return data.map(value => (value - mean) / stdDev);
  },

  robustScale(data) {
    const median = this.calculateMedian(data);
    const iqr = this.calculateIQR(data);
    return data.map(value => (value - median) / iqr);
  },

  minMaxScale(data) {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min;
    return data.map(value => (value - min) / range);
  },

  calculateMean(data) {
    return data.reduce((sum, value) => sum + value, 0) / data.length;
  },

  calculateStandardDeviation(data, mean) {
    const squaredDiffs = data.map(value => Math.pow(value - mean, 2));
    return Math.sqrt(squaredDiffs.reduce((sum, value) => sum + value, 0) / data.length);
  },

  calculateMedian(data) {
    const sorted = [...data].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0
      ? (sorted[middle - 1] + sorted[middle]) / 2
      : sorted[middle];
  },

  calculateIQR(data) {
    const sorted = [...data].sort((a, b) => a - b);
    const q1 = sorted[Math.floor(sorted.length * 0.25)];
    const q3 = sorted[Math.floor(sorted.length * 0.75)];
    return q3 - q1;
  }
};

export { DataCentering };
