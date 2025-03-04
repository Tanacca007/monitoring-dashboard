const StateManager = {
  state: {
    metrics: new Map(),
    alerts: new Map(),
    settings: new Map(),
    userPreferences: new Map()
  },

  dispatch(action) {
    const handlers = {
      UPDATE_METRICS: this.updateMetrics,
      UPDATE_ALERTS: this.updateAlerts,
      UPDATE_SETTINGS: this.updateSettings,
      CLEAR_STATE: this.clearState
    };

    return handlers[action.type]?.(action.payload);
  }
};
