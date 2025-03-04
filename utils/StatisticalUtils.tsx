const StatisticalUtils = {
  calculateBasicStats(data) {
    const values = data.map(d => d.value);
    return {
      mean: this.calculateMean(values),
      median: this.calculateMedian(values),
      stdDev: this.calculateStdDev(values),
      variance: this.calculateVariance(values)
    };
  },

  calculateTrends(data, period = 10) {
    const trends = {
      shortTerm: this.linearRegression(data.slice(-period)),
      longTerm: this.linearRegression(data),
      seasonality: this.detectSeasonality(data)
    };
    
    return {
      ...trends,
      direction: this.getTrendDirection(trends.shortTerm.slope)
    };
  },

  detectAnomalies(data, sensitivity = 2) {
    const stats = this.calculateBasicStats(data);
    const threshold = stats.stdDev * sensitivity;
    
    return data.map(point => ({
      ...point,
      isAnomaly: Math.abs(point.value - stats.mean) > threshold,
      deviation: (point.value - stats.mean) / stats.stdDev
    }));
  },

  forecastValues(data, periods = 5) {
    const trend = this.calculateTrends(data);
    const lastValue = data[data.length - 1].value;
    
    return Array.from({ length: periods }, (_, i) => ({
      timestamp: this.getNextTimestamp(data[data.length - 1].timestamp, i + 1),
      value: lastValue + trend.shortTerm.slope * (i + 1),
      type: 'forecast'
    }));
  }
};

export { StatisticalUtils };

const PValueCalculation = {
  calculatePValue(tStat, degreesOfFreedom) {
    // Student's t-distribution implementation
    const x = degreesOfFreedom / (degreesOfFreedom + tStat * tStat);
    return this.incompleteBeta(degreesOfFreedom/2, 0.5, x) / 2;
  },

  incompleteBeta(a, b, x) {
    const bt = (x === 0 || x === 1) ? 0 :
      Math.exp(this.logGamma(a + b) - this.logGamma(a) - 
      this.logGamma(b) + a * Math.log(x) + b * Math.log(1 - x));

    if (x < (a + 1) / (a + b + 2)) {
      return bt * this.betaContinuedFraction(a, b, x) / a;
    }
    
    return 1 - bt * this.betaContinuedFraction(b, a, 1 - x) / b;
  },

  betaContinuedFraction(a, b, x) {
    const maxIterations = 200;
    const epsilon = 3e-7;
    
    let qab = a + b;
    let qap = a + 1;
    let qam = a - 1;
    let c = 1;
    let d = 1 - qab * x / qap;
    
    if (Math.abs(d) < epsilon) d = epsilon;
    d = 1 / d;
    let h = d;
    
    for (let m = 1; m <= maxIterations; m++) {
      let m2 = 2 * m;
      let aa = m * (b - m) * x / ((qam + m2) * (a + m2));
      d = 1 + aa * d;
      if (Math.abs(d) < epsilon) d = epsilon;
      c = 1 + aa / c;
      if (Math.abs(c) < epsilon) c = epsilon;
      d = 1 / d;
      h *= d * c;
      aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
      d = 1 + aa * d;
      if (Math.abs(d) < epsilon) d = epsilon;
      c = 1 + aa / c;
      if (Math.abs(c) < epsilon) c = epsilon;
      d = 1 / d;
      let del = d * c;
      h *= del;
      if (Math.abs(del - 1) < epsilon) break;
    }
    
    return h;
  },

  logGamma(x) {
    const c = [76.18009172947146, -86.50532032941677,
               24.01409824083091, -1.231739572450155,
               0.1208650973866179e-2, -0.5395239384953e-5];
    let sum = 1.000000000190015;
    let tmp = x + 5.5;
    tmp -= (x + 0.5) * Math.log(tmp);
    
    for (let j = 0; j <= 5; j++) {
      sum += c[j] / ++x;
    }
    
    return -tmp + Math.log(2.5066282746310005 * sum);
  }
};

export { PValueCalculation };
