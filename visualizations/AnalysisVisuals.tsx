const AnalysisVisuals = {
  ForecastChart: ({ data, forecast }) => {
    return (
      <div className="forecast-chart p-4 bg-white rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">Forecast Analysis</h3>
        <div className="h-64">
          <LineChart
            data={[
              {
                label: 'Historical',
                data: data,
                borderColor: '#3B82F6'
              },
              {
                label: 'Forecast',
                data: forecast,
                borderColor: '#10B981',
                borderDash: [5, 5]
              }
            ]}
            options={{
              showConfidenceInterval: true,
              annotations: true
            }}
          />
        </div>
      </div>
    );
  },

  CorrelationMatrix: ({ correlations }) => {
    return (
      <div className="correlation-matrix p-4 bg-white rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">Metric Correlations</h3>
        <div className="grid grid-cols-auto gap-1">
          {Array.from(correlations).map(([key, value]) => (
            <CorrelationCell
              key={key}
              metrics={key.split('-')}
              correlation={value}
            />
          ))}
        </div>
      </div>
    );
  },

  TrendIndicator: ({ trend }) => {
    const { direction, strength } = trend;
    return (
      <div className="trend-indicator flex items-center space-x-2">
        <TrendArrow
          direction={direction}
          className={`w-5 h-5 ${getTrendColor(strength)}`}
        />
        <span className="font-medium">{strength}%</span>
      </div>
    );
  }
};

export { AnalysisVisuals };
