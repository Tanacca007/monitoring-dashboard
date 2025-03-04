const PValueVisuals = {
  SignificanceChart: ({ pValue, threshold = 0.05 }) => {
    return (
      <div className="significance-chart p-4 bg-white rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">Statistical Significance</h3>
        
        <div className="relative h-8 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className={`h-full ${pValue < threshold ? 'bg-green-500' : 'bg-red-500'}`}
            style={{ width: `${(1 - pValue) * 100}%` }}
          />
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <span className="font-bold text-sm">
              p = {pValue.toFixed(4)}
            </span>
          </div>
        </div>
        
        <ThresholdIndicator value={threshold} />
      </div>
    );
  },

  ConfidenceIntervals: ({ intervals, significance }) => {
    return (
      <div className="confidence-intervals space-y-4">
        {intervals.map((interval, index) => (
          <IntervalBar
            key={index}
            lower={interval.lower}
            upper={interval.upper}
            mean={interval.mean}
            confidence={interval.confidence}
          />
        ))}
      </div>
    );
  },

  SignificanceMatrix: ({ results }) => {
    return (
      <div className="significance-matrix grid gap-2">
        {results.map((result, index) => (
          <SignificanceCell
            key={index}
            pValue={result.pValue}
            effect={result.effectSize}
            variables={result.variables}
          />
        ))}
      </div>
    );
  }
};

export { PValueVisuals };
