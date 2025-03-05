const AlertHandler = {
  handleAlertAction(alertId, action = 'acknowledge') {
    const actions = {
      acknowledge: this.acknowledgeAlert,
      dismiss: this.dismissAlert,
      escalate: this.escalateAlert
    };

    return actions[action](alertId);
  },

  acknowledgeAlert(alertId) {
    return {
      type: 'ACKNOWLEDGE_ALERT',
      alertId,
      timestamp: new Date().toISOString(),
      user: getCurrentUser(),
      status: 'acknowledged'
    };
  },

  dismissAlert(alertId) {
    return {
      type: 'DISMISS_ALERT',
      alertId,
      timestamp: new Date().toISOString(),
      user: getCurrentUser(),
      status: 'dismissed'
    };
  },

  escalateAlert(alertId) {
    return {
      type: 'ESCALATE_ALERT',
      alertId,
      timestamp: new Date().toISOString(),
      user: getCurrentUser(),
      status: 'escalated',
      nextLevel: this.determineEscalationLevel(alertId)
    };
  }
};

export { AlertHandler };
