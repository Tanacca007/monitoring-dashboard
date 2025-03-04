const CorrelationCell = ({ metrics, correlation }) => {
  const [metric1, metric2] = metrics;
  const { coefficient, strength, significance } = correlation;

  return (
    <div 
      className={`correlation-cell p-3 rounded ${getCorrelationColor(coefficient)}`}
      title={`Significance: ${significance}`}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">{`${metric1} → ${metric2}`}</span>
        <StrengthBadge strength={strength} />
      </div>
      
      <div className="correlation-value text-lg font-bold">
        {formatCorrelation(coefficient)}
      </div>
      
      <CorrelationVisual coefficient={coefficient} />
    </div>
  );
};

const StrengthBadge = ({ strength }) => {
  const badgeColor = {
    strong: 'bg-green-100 text-green-800',
    moderate: 'bg-yellow-100 text-yellow-800',
    weak: 'bg-gray-100 text-gray-800'
  }[getStrengthCategory(strength)];

  return (
    <span className={`px-2 py-1 rounded-full text-xs ${badgeColor}`}>
      {strength}
    </span>
  );
};

const CorrelationVisual = ({ coefficient }) => {
  const width = Math.abs(coefficient) * 100;
  const direction = coefficient >= 0 ? 'positive' : 'negative';

  return (
    <div className="correlation-visual h-2 bg-gray-200 rounded-full mt-2">
      <div
        className={`h-full rounded-full ${
          direction === 'positive' ? 'bg-blue-500' : 'bg-red-500'
        }`}
        style={{ width: `${width}%` }}
      />
    </div>
  );
};

export { CorrelationCell, StrengthBadge, CorrelationVisual };
