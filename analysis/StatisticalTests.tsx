const StatisticalTests = {
  shapiroWilkTest(data) {
    const n = data.length;
    const sortedData = [...data].sort((a, b) => a - b);
    
    return {
      statistic: this.calculateShapiroStatistic(sortedData),
      pValue: this.calculateShapiroPValue(sortedData),
      isNormal: (p) => p > 0.05
    };
  },

  kolmogorovSmirnovTest(data) {
    const sortedData = [...data].sort((a, b) => a - b);
    const n = data.length;
    
    const empiricalCDF = this.calculateEmpiricalCDF(sortedData);
    const theoreticalCDF = this.calculateTheoreticalCDF(sortedData);
    
    const maxDifference = Math.max(
      ...sortedData.map((_, i) => 
        Math.abs(empiricalCDF[i] - theoreticalCDF[i])
      )
    );

    return {
      statistic: maxDifference,
      criticalValue: 1.36 / Math.sqrt(n),
      pValue: this.calculateKSPValue(maxDifference, n)
    };
  },

  chiSquareGoodnessOfFit(data) {
    const observed = this.getFrequencyDistribution(data);
    const expected = this.getExpectedFrequencies(data);
    
    const chiSquare = observed.reduce((sum, freq, i) => 
      sum + Math.pow(freq - expected[i], 2) / expected[i], 0
    );

    return {
      statistic: chiSquare,
      degreesOfFreedom: observed.length - 1,
      pValue: this.calculateChiSquarePValue(chiSquare, observed.length - 1)
    };
  },

  andersonDarlingTest(data) {
    const sortedData = [...data].sort((a, b) => a - b);
    const n = data.length;
    
    const statistic = this.calculateAndersonDarlingStatistic(sortedData);
    
    return {
      statistic,
      criticalValues: [0.576, 0.656, 0.787, 0.918, 1.092],
      significance: [0.15, 0.10, 0.05, 0.025, 0.01]
    };
  }
};

export { StatisticalTests };
