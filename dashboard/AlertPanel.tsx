const AlertPanel = () => {
  return (
    <div className="col-span-4 bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Active Alerts</h2>
      <div className="space-y-2">
        {alerts.map(alert => (
          <AlertItem key={alert.id} alert={alert} />
        ))}
      </div>
    </div>
  );
};
