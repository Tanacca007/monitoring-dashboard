const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      type: 'time',
      time: {
        unit: 'hour',
        displayFormats: {
          hour: 'HH:mm'
        }
      },
      grid: {
        display: false
      }
    },
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.1)'
      }
    }
  },
  plugins: {
    legend: {
      position: 'top',
      align: 'end'
    },
    tooltip: {
      mode: 'index',
      intersect: false
    }
  }
};

export { MetricCard, chartOptions };
