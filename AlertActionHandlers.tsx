import React from 'react';

type AlertActionKeys = 'acknowledge' | 'dismiss';

type AlertActions = {
  acknowledge: (alertId: string) => void;
  dismiss: (alertId: string) => void;
  [key: string]: (alertId: string) => void; // Index signature to allow any string key
};

const alertActions: AlertActions = {
  acknowledge: (alertId: string) => {
    // Logic to acknowledge alert
    console.log(`Alert ${alertId} acknowledged.`);
  },
  dismiss: (alertId: string) => {
    // Logic to dismiss alert
    console.log(`Alert ${alertId} dismissed.`);
  }
};

const AlertHandler = {
  handleAlertAction(alertId: string, action: AlertActionKeys): void {
    if (alertActions[action]) {
      alertActions[action](alertId);
    } else {
      console.error(`Unknown action: ${action}`);
    }
  },
};

export default AlertHandler;