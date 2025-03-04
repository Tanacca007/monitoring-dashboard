const NotificationStrategies = {
  EmailStrategy: class {
    constructor(config) {
      this.recipients = config.recipients;
      this.template = config.template;
      this.sender = config.sender;
    }

    notify(alert) {
      const message = this.formatMessage(alert);
      return this.sendEmail(message);
    }

    formatMessage(alert) {
      return {
        subject: `[${alert.severity.toUpperCase()}] Alert: ${alert.metric}`,
        body: this.template.replace(/\${(\w+)}/g, (_, key) => alert[key]),
        priority: alert.severity === 'critical' ? 'high' : 'normal'
      };
    }
  },

  SlackStrategy: class {
    constructor(config) {
      this.webhook = config.webhook;
      this.channel = config.channel;
      this.mentions = config.mentions;
    }

    notify(alert) {
      const message = this.createSlackMessage(alert);
      return this.sendToSlack(message);
    }

    createSlackMessage(alert) {
      return {
        channel: this.channel,
        blocks: [
          {
            type: 'header',
            text: `🚨 ${alert.severity.toUpperCase()} Alert: ${alert.metric}`
          },
          {
            type: 'section',
            text: `Current value: ${alert.value}\nThreshold exceeded at ${alert.timestamp}`
          },
          {
            type: 'context',
            elements: [`Alert ID: ${alert.id}`]
          }
        ]
      };
    }
  },

  PagerDutyStrategy: class {
    constructor(config) {
      this.apiKey = config.apiKey;
      this.serviceId = config.serviceId;
      this.escalationPolicy = config.escalationPolicy;
    }

    notify(alert) {
      const incident = this.createIncident(alert);
      return this.triggerIncident(incident);
    }

    createIncident(alert) {
      return {
        incident: {
          type: 'incident',
          title: `${alert.severity} alert for ${alert.metric}`,
          service: { id: this.serviceId },
          urgency: alert.severity === 'critical' ? 'high' : 'low',
          body: { type: 'incident_body', details: this.formatDetails(alert) }
        }
      };
    }
  }
};

export { NotificationStrategies };
