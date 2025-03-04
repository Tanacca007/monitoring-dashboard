const RobustScaling = {
  robustScaleWithQuantiles(data, lowerQuantile = 0.25, upperQuantile = 0.75) {
    const sorted = [...data].sort((a, b) => a - b);
    const q1 = this.calculateQuantile(sorted, lowerQuantile);
    const q3 = this.calculateQuantile(sorted, upperQuantile);
    const iqr = q3 - q1;
    
    return data.map(value => (value - q1) / iqr);
  },

  winsorize(data, limits = [0.05, 0.95]) {
    const sorted = [...data].sort((a, b) => a - b);
    const lowerBound = this.calculateQuantile(sorted, limits[0]);
    const upperBound = this.calculateQuantile(sorted, limits[1]);
    
    return data.map(value => 
      Math.min(Math.max(value, lowerBound), upperBound)
    );
  },

  madScaling(data) {
    const median = DataCentering.calculateMedian(data);
    const mad = this.calculateMAD(data, median);
    
    return data.map(value => (value - median) / mad);
  },

  calculateMAD(data, median) {
    const absoluteDeviations = data.map(value => 
      Math.abs(value - median)
    );
    return DataCentering.calculateMedian(absoluteDeviations);
  },

  huberScaling(data, k = 1.5) {
    const centered = DataCentering.centerData(data);
    const mad = this.calculateMAD(centered, 0);
    
    return centered.map(value => {
      const scaledValue = value / mad;
      return Math.abs(scaledValue) <= k 
        ? scaledValue 
        : k * Math.sign(scaledValue);
    });
  }
};

export { RobustScaling };
