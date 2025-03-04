const ChartUtils = {
  formatData(data, options = {}) {
    return data.map((point, index) => ({
      x: options.timestamps ? new Date(point.timestamp) : index,
      y: point.value,
      meta: point.metadata || {}
    }));
  },

  calculateBounds(data) {
    return {
      min: Math.min(...data.map(d => d.y)),
      max: Math.max(...data.map(d => d.y)),
      avg: data.reduce((sum, d) => sum + d.y, 0) / data.length
    };
  },

  generateGradient(ctx, color, height) {
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, `${color}40`);
    gradient.addColorStop(1, `${color}00`);
    return gradient;
  },

  getChartOptions(type, customOptions = {}) {
    const baseOptions = {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 250
      },
      elements: {
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4
        },
        line: {
          tension: 0.4
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          }
        },
        y: {
          beginAtZero: true
        }
      }
    };

    return {
      ...baseOptions,
      ...customOptions
    };
  }
};

export { ChartUtils };
