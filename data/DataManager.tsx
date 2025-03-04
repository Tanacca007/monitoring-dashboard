const DataManager = {
  async getMetrics(timeRange) {
    return await DataFetcher.fetchData(`/api/metrics?range=${timeRange}`);
  },

  async getAlerts(status = 'active') {
    return await DataFetcher.fetchData(`/api/alerts?status=${status}`);
  },

  async updateMetricData(metricId, data) {
    return await DataFetcher.fetchData(`/api/metrics/${metricId}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }
};

export { DataFetcher, DataManager };
