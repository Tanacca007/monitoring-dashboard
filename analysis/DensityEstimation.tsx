const DensityEstimation = {
  kernelDensityEstimation(data, bandwidth = 'silverman', kernel = 'gaussian') {
    const h = this.calculateBandwidth(data, bandwidth);
    const gridPoints = this.generateGridPoints(data);
    
    return gridPoints.map(x => ({
      x,
      density: this.estimateDensity(x, data, h, kernel)
    }));
  },

  calculateBandwidth(data, method) {
    const n = data.length;
    const std = Math.sqrt(this.calculateVariance(data));
    
    switch (method) {
      case 'silverman':
        return 0.9 * std * Math.pow(n, -0.2);
      case 'scott':
        return 1.06 * std * Math.pow(n, -0.2);
      default:
        return method;
    }
  },

  generateGridPoints(data, points = 100) {
    const [min, max] = [Math.min(...data), Math.max(...data)];
    const range = max - min;
    const step = range / (points - 1);
    
    return Array.from(
      { length: points },
      (_, i) => min + i * step
    );
  },

  estimateDensity(x, data, bandwidth, kernelType) {
    return data.reduce((sum, xi) => 
      sum + this.kernelFunction(
        (x - xi) / bandwidth,
        kernelType
      ), 0
    ) / (data.length * bandwidth);
  },

  kernelFunction(u, type = 'gaussian') {
    switch (type) {
      case 'gaussian':
        return (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * u * u);
      case 'epanechnikov':
        return Math.abs(u) <= 1 ? 0.75 * (1 - u * u) : 0;
      case 'uniform':
        return Math.abs(u) <= 1 ? 0.5 : 0;
      default:
        return this.kernelFunction(u, 'gaussian');
    }
  }
};

export { DensityEstimation };
