const AlertHandler = {
  handleAlertAction(alertId: string, action: string = 'acknowledge'): void {
    const actions = {
      acknowledge: this.acknowledgeAlert,
      dismiss: this.dismissAlert,
    };

    return actions[action]();
  }
  // ... other methods
};

    const selectedAction = actions[action];
    if (selectedAction) {
      selectedAction(alertId);
    } else {
      console.error(`Unknown action: ${action}`);
    }
  },

  acknowledgeAlert(alertId: string): void {
    // Logic to acknowledge the alert
    console.log(`Alert ${alertId} acknowledged`);
  },

  dismissAlert(alertId: string): void {
    // Logic to dismiss the alert
    console.log(`Alert ${alertId} dismissed`);
  },
};

export default AlertHandler;