const MetricCard = ({ title, value, trend }) => {
  const trendColors = {
    up: 'text-green-500',
    down: 'text-red-500',
    stable: 'text-blue-500'
  };

  return (
    <div className="metric-card bg-gray-50 p-4 rounded-lg">
      <h3 className="text-sm text-gray-600">{title}</h3>
      <div className="flex items-center justify-between mt-2">
        <span className="text-xl font-bold">{value}</span>
        <span className={`${trendColors[trend]} flex items-center`}>
          {trend === 'up' && '↑'}
          {trend === 'down' && '↓'}
          {trend === 'stable' && '→'}
        </span>
      </div>
    </div>
  );
};
