const AlertItem = ({ alert }) => {
  const severityColors = {
    critical: 'bg-red-100 text-red-800 border-red-200',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    info: 'bg-blue-100 text-blue-800 border-blue-200'
  };

  return (
    <div className={`alert-item p-3 rounded-md border ${severityColors[alert.severity]}`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="font-medium">{alert.title}</span>
          <span className="text-sm">{alert.metric}</span>
        </div>
        <span className="text-sm">{alert.time}</span>
      </div>
      
      <div className="mt-2 text-sm">
        <p>{alert.message}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs">{alert.source}</span>
          <button 
            className="text-xs font-medium hover:underline"
            onClick={() => handleAlertAction(alert.id)}
          >
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
};

export { AlertItem };
