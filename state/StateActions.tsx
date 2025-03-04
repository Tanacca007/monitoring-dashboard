const StateActions = {
  updateMetrics(metrics) {
    return {
      type: 'UPDATE_METRICS',
      payload: metrics
    };
  },

  updateAlerts(alerts) {
    return {
      type: 'UPDATE_ALERTS',
      payload: alerts
    };
  },

  updateSettings(settings) {
    return {
      type: 'UPDATE_SETTINGS',
      payload: settings
    };
  }
};

export { StateManager, StateActions };
