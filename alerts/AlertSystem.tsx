class AlertSystem {
  constructor(config) {
    this.thresholds = config.thresholds;
    this.notifications = config.notifications;
    this.escalation = config.escalation;
    this.activeAlerts = new Map();
  }

  checkThresholds(metrics) {
    Object.entries(metrics).forEach(([metric, value]) => {
      const threshold = this.thresholds[metric];
      if (threshold && value > threshold.critical) {
        this.triggerAlert(metric, 'critical', value);
      } else if (threshold && value > threshold.warning) {
        this.triggerAlert(metric, 'warning', value);
      }
    });
  }

  triggerAlert(metric, severity, value) {
    const alert = {
      metric,
      severity,
      value,
      timestamp: new Date(),
      id: crypto.randomUUID()
    };

    this.activeAlerts.set(alert.id, alert);
    this.notifyStakeholders(alert);
  }

  notifyStakeholders(alert) {
    const notificationStrategy = this.notifications[alert.severity];
    notificationStrategy.notify(alert);
  }
}

export { PerformanceMetrics, SystemMetrics, AlertSystem };
