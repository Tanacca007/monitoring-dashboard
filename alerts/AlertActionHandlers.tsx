const AlertHandler = {
  handleAlertAction(alertId: string, action = 'acknowledge'): void {
  const actions: Record<string, (id: string) => void> = {
    acknowledge: this.acknowledgeAlert,
    dismiss: this.dismissAlert,
  };
  actions[action]?.(alertId);
}
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