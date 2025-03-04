const BootstrapMethods = {
  generateBootstrapSamples(data, sampleSize = null, iterations = 1000) {
    const n = sampleSize || data.length;
    return Array.from({ length: iterations }, () => 
      this.singleBootstrapSample(data, n)
    );
  },

  singleBootstrapSample(data, sampleSize) {
    return Array.from({ length: sampleSize }, () => 
      data[Math.floor(Math.random() * data.length)]
    );
  },

  bootstrapStatistic(data, statistic, confidence = 0.95, iterations = 1000) {
    const samples = this.generateBootstrapSamples(data, null, iterations);
    const statistics = samples.map(sample => statistic(sample));
    
    return {
      estimate: statistic(data),
      interval: this.percentileInterval(statistics, confidence),
      distribution: this.getDistribution(statistics)
    };
  }
};
