const UtilizationChart = ({ label, current, peak, history }) => {
  return (
    <div className="utilization-chart p-4 bg-gray-50 rounded-lg">
      <div className="flex justify-between mb-2">
        <span className="font-medium">{label}</span>
        <span className="text-gray-600">{current}%</span>
      </div>
      
      <LineChart
        data={history}
        height={120}
        options={{
          fill: true,
          smooth: true,
          peak: peak
        }}
      />
      
      <div className="mt-2 text-sm text-gray-600">
        Peak: {peak}%
      </div>
    </div>
  );
};

const SparklineChart = ({ data, color = 'blue' }) => {
  return (
    <div className="sparkline h-8">
      <MiniChart
        data={data}
        color={color}
        options={{
          showPoints: false,
          showArea: true
        }}
      />
    </div>
  );
};

const LoadChart = ({ value, capacity, warning = 80, critical = 90 }) => {
  const percentage = (value / capacity) * 100;
  const status = getLoadStatus(percentage, warning, critical);
  
  return (
    <div className="load-chart">
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${status.color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      <div className="mt-2 flex justify-between text-sm">
        <span>{value}</span>
        <span className="text-gray-600">{capacity}</span>
      </div>
    </div>
  );
};

export { UtilizationChart, SparklineChart, LoadChart };
