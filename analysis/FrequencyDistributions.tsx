const FrequencyDistributions = {
  getFrequencyDistribution(data, bins = 'sturges') {
    const binCount = this.calculateBinCount(data, bins);
    const [min, max] = [Math.min(...data), Math.max(...data)];
    const binWidth = (max - min) / binCount;
    
    const frequencies = new Array(binCount).fill(0);
    const binEdges = Array.from({ length: binCount + 1 }, (_, i) => 
      min + i * binWidth
    );

    data.forEach(value => {
      const binIndex = Math.min(
        Math.floor((value - min) / binWidth),
        binCount - 1
      );
      frequencies[binIndex]++;
    });

    return {
      frequencies,
      binEdges,
      binWidth,
      density: frequencies.map(f => f / (data.length * binWidth))
    };
  },

  calculateBinCount(data, method) {
    const n = data.length;
    switch (method) {
      case 'sturges':
        return Math.ceil(Math.log2(n) + 1);
      case 'rice':
        return Math.ceil(2 * Math.pow(n, 1/3));
      case 'sqrt':
        return Math.ceil(Math.sqrt(n));
      default:
        return method;
    }
  },

  getRelativeFrequencies(frequencies) {
    const total = frequencies.reduce((sum, freq) => sum + freq, 0);
    return frequencies.map(freq => freq / total);
  },

  getCumulativeFrequencies(frequencies) {
    return frequencies.reduce((acc, freq) => {
      const last = acc[acc.length - 1] || 0;
      acc.push(last + freq);
      return acc;
    }, []);
  }
};

export { FrequencyDistributions };
