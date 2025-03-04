const DistributionPanel = () => {
  return (
    <div className="analysis-panel bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">Distribution Analysis</h2>
      <div className="grid grid-cols-2 gap-4">
        <DistributionChart />
        <StatisticalSummary />
        <QuantilePlot />
        <DensityEstimate />
      </div>
    </div>
  );
};

const CorrelationPanel = () => {
  return (
    <div className="analysis-panel bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">Correlation Analysis</h2>
      <div className="grid grid-cols-2 gap-4">
        <CorrelationMatrix />
        <ScatterPlot />
        <RegressionAnalysis />
        <ResidualPlot />
      </div>
    </div>
  );
};
