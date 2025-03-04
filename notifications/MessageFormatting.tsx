const MessageFormatting = {
  formatAlertMessage(alert, template) {
    return {
      standard: this.createStandardFormat(alert),
      html: this.createHtmlFormat(alert),
      markdown: this.createMarkdownFormat(alert),
      json: this.createJsonFormat(alert)
    };
  },

  createStandardFormat(alert) {
    return {
      title: `[${alert.severity.toUpperCase()}] ${alert.metric}`,
      body: `
        Alert Details:
        - Metric: ${alert.metric}
        - Value: ${alert.value}
        - Threshold: ${alert.threshold}
        - Triggered: ${alert.timestamp}
        - ID: ${alert.id}
      `.trim(),
      footer: `Generated by Monitoring System v1.0`
    };
  },

  createHtmlFormat(alert) {
    return `
      <div class="alert-message ${alert.severity}">
        <h2>${alert.metric} Alert</h2>
        <div class="alert-details">
          <p><strong>Severity:</strong> ${alert.severity}</p>
          <p><strong>Value:</strong> ${alert.value}</p>
          <p><strong>Timestamp:</strong> ${alert.timestamp}</p>
        </div>
        <div class="alert-actions">
          <button onclick="acknowledgeAlert('${alert.id}')">Acknowledge</button>
          <button onclick="investigateAlert('${alert.id}')">Investigate</button>
        </div>
      </div>
    `;
  },

  createMarkdownFormat(alert) {
    return `
      # ${alert.metric} Alert

      ## Details
      - **Severity**: ${alert.severity}
      - **Value**: ${alert.value}
      - **Threshold**: ${alert.threshold}
      - **Timestamp**: ${alert.timestamp}

      ## Actions
      - [Acknowledge](${alert.acknowledgeUrl})
      - [Investigate](${alert.investigateUrl})
    `;
  }
};

export { MessageFormatting };
