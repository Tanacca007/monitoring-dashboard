const ResourceGauge = ({ type, value, threshold, icon }) => {
  const percentage = (value / threshold) * 100;
  const color = getGaugeColor(percentage);
  
  return (
    <div className="resource-gauge text-center">
      <div className="relative w-32 h-32 mx-auto">
        <svg className="transform -rotate-90 w-full h-full">
          <circle
            className="text-gray-200"
            strokeWidth="12"
            stroke="currentColor"
            fill="transparent"
            r="58"
            cx="64"
            cy="64"
          />
          <circle
            className={color}
            strokeWidth="12"
            stroke="currentColor"
            fill="transparent"
            r="58"
            cx="64"
            cy="64"
            strokeDasharray={`${percentage * 3.64} 364`}
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <i className={`icon-${icon} text-2xl`}></i>
          <div className="text-xl font-bold">{value}%</div>
        </div>
      </div>
      <div className="mt-2 font-medium">{type}</div>
    </div>
  );
};
