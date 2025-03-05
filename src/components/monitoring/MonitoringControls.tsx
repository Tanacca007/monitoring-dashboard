const MonitoringControls = ({ active, interval, onToggle, onIntervalChange }) => {
  const intervals = [1000, 2000, 5000, 10000];
  
  return (
    <div className="monitoring-controls p-4 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Monitoring Settings</h3>
        
        <Switch
          checked={active}
          onChange={onToggle}
          className="flex-shrink-0"
        />
      </div>

      <div className="space-y-4">
        <IntervalSelector
          value={interval}
          options={intervals}
          onChange={onIntervalChange}
        />
        
        <MetricSelector />
        
        <AlertThresholds />
        
        <ExportControls />
      </div>
    </div>
  );
};

const IntervalSelector = ({ value, options, onChange }) => {
  return (
    <div className="interval-selector">
      <label className="block text-sm font-medium mb-2">Update Interval</label>
      <div className="grid grid-cols-4 gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`p-2 rounded ${
              value === option 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {option / 1000}s
          </button>
        ))}
      </div>
    </div>
  );
};

const MetricSelector = () => {
  const [selectedMetrics, setSelectedMetrics] = useState([
    'responseTime',
    'compression',
    'assetCount'
  ]);

  return (
    <div className="metric-selector">
      <label className="block text-sm font-medium mb-2">Metrics to Monitor</label>
      <div className="space-y-2">
        {availableMetrics.map((metric) => (
          <Checkbox
            key={metric.id}
            label={metric.label}
            checked={selectedMetrics.includes(metric.id)}
            onChange={(checked) => {
              setSelectedMetrics(
                checked 
                  ? [...selectedMetrics, metric.id]
                  : selectedMetrics.filter(id => id !== metric.id)
              );
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MonitoringControls;
