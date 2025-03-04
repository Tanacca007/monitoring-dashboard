const PercentileCalculations = {
  calculatePercentiles(data, percentiles = [25, 50, 75]) {
    const sorted = [...data].sort((a, b) => a - b);
    return percentiles.map(p => this.calculatePercentile(sorted, p));
  },
  
  calculateQuantiles(data, q = 4) {
    const percentiles = Array.from({length: q - 1}, (_, i) => ((i + 1) * 100) / q);
    return this.calculatePercentiles(data, percentiles);
  }
};
