const DataTransformUtils = {
  aggregateTimeSeries(data, interval = '1h') {
    const aggregated = {};
    
    data.forEach(point => {
      const timeKey = this.getTimeKey(point.timestamp, interval);
      if (!aggregated[timeKey]) {
        aggregated[timeKey] = [];
      }
      aggregated[timeKey].push(point.value);
    });

    return Object.entries(aggregated).map(([timestamp, values]) => ({
      timestamp,
      value: this.calculateAggregates(values),
    }));
  },

  calculateAggregates(values) {
    return {
      min: Math.min(...values),
      max: Math.max(...values),
      avg: values.reduce((sum, val) => sum + val, 0) / values.length,
      p95: this.calculatePercentile(values, 95)
    };
  },

  normalizeData(data, options = {}) {
    const { scale = [0, 100], precision = 2 } = options;
    const [min, max] = this.getDataRange(data);
    
    return data.map(point => ({
      ...point,
      value: this.scaleValue(point.value, min, max, scale[0], scale[1], precision)
    }));
  },

  smoothData(data, windowSize = 5) {
    const smoothed = [];
    for (let i = 0; i < data.length; i++) {
      const window = data.slice(
        Math.max(0, i - windowSize),
        Math.min(data.length, i + windowSize + 1)
      );
      const avg = window.reduce((sum, point) => sum + point.value, 0) / window.length;
      smoothed.push({
        ...data[i],
        value: avg
      });
    }
    return smoothed;
  }
};

export { DataTransformUtils };
