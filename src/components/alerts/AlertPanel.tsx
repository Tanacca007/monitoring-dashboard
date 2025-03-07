import React from 'react';

// Define missing AlertItem component
const AlertItem: React.FC<{ alert: any }> = ({ alert }) => {
  return (
    <div className="alert-item">
      <h3>{alert.title}</h3>
      <p>{alert.message}</p>
      <span>{alert.status}</span>
    </div>
  );
};

// Define mock alerts data or import it
const alerts: any[] = [
  // Your alerts data
];

// Fix AlertPanel component
const AlertPanel: React.FC = () => {
  return (
    <div className="col-span-4 bg-white rounded-lg shadow p-4">
      <h2 className="career-seed-title text-2xl mb-4">Career Seed Alerts</h2>
      <div className="space-y-2">
        {alerts.map((alert: any) => (
          <AlertItem key={alert.id} alert={alert} />
        ))}
      </div>
  );
    </div>
  );
};

export default AlertPanel;
