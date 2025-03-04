const ThresholdIndicator = ({ value, label = 'Significance Threshold' }) => {
  return (
    <div className="threshold-indicator mt-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-600">{label}</span>
        <span className="font-medium">{value}</span>
      </div>
      
      <div className="relative h-2 bg-gray-100 rounded-full">
        <div 
          className="absolute h-4 w-1 bg-black transform -translate-y-1"
          style={{ left: `${value * 100}%` }}
        />
      </div>
    </div>
  );
};

const IntervalBar = ({ lower, upper, mean, confidence }) => {
  const width = ((upper - lower) / mean) * 100;
  
  return (
    <div className="interval-bar">
      <div className="flex justify-between text-sm mb-1">
        <span>{lower.toFixed(2)}</span>
        <span className="font-medium">{mean.toFixed(2)}</span>
        <span>{upper.toFixed(2)}</span>
      </div>
      
      <div className="relative h-6 bg-gray-100 rounded">
        <div 
          className="absolute h-full bg-blue-200"
          style={{ 
            left: `${(lower/mean) * 100}%`,
            width: `${width}%`
          }}
        />
        <div 
          className="absolute w-2 h-full bg-blue-600"
          style={{ left: `${50}%` }}
        />
      </div>
      
      <div className="text-center text-sm mt-1 text-gray-600">
        {confidence}% Confidence Interval
      </div>
    </div>
  );
};

export { ThresholdIndicator, IntervalBar };
