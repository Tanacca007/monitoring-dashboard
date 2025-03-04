const TestSetup = {
  initializeTests() {
    return {
      unit: this.setupUnitTests(),
      integration: this.setupIntegrationTests(),
      performance: this.setupPerformanceTests()
    };
  },

  setupUnitTests() {
    return {
      components: {
        MetricDisplay: this.testMetricDisplay,
        AlertPanel: this.testAlertPanel,
        DataVisualization: this.testDataVisualization
      },
      utils: {
        StateManager: this.testStateManager,
        DataFetcher: this.testDataFetcher,
        ErrorHandler: this.testErrorHandler
      }
    };
  }
};
