const QuantileCalculations = {
  calculateQuantile(sortedData, q) {
    const pos = (sortedData.length - 1) * q;
    const base = Math.floor(pos);
    const rest = pos - base;
    
    if (sortedData[base + 1] !== undefined) {
      return sortedData[base] + rest * (sortedData[base + 1] - sortedData[base]);
    } else {
      return sortedData[base];
    }
  },

  getQuartiles(data) {
    const sorted = [...data].sort((a, b) => a - b);
    return {
      Q1: this.calculateQuantile(sorted, 0.25),
      Q2: this.calculateQuantile(sorted, 0.50),
      Q3: this.calculateQuantile(sorted, 0.75)
    };
  }
};

export { QuantileCalculations };
