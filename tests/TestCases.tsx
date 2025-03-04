const TestCases = {
  testMetricDisplay() {
    return {
      'should render metrics correctly': () => {
        const metrics = new Map([['cpu', 80], ['memory', 60]]);
        const result = MetricDisplay({ data: metrics });
        return result !== null;
      },
      'should update on new data': () => {
        const metrics = new Map([['cpu', 85]]);
        StateActions.updateMetrics(metrics);
        return StateManager.state.metrics.get('cpu') === 85;
      }
    };
  },

  testAlertPanel() {
    return {
      'should display active alerts': () => {
        const alerts = new Map([['alert1', { status: 'active' }]]);
        const result = AlertPanel({ alerts });
        return result !== null;
      }
    };
  }
};

export { TestSetup, TestCases };
