const MetricDisplay = () => {
  return (
    <div className="col-span-4 bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Key Metrics</h2>
      <div className="grid grid-cols-2 gap-4">
        <MetricCard title="Response Time" value="245ms" trend="up" />
        <MetricCard title="Error Rate" value="0.02%" trend="down" />
        <MetricCard title="CPU Usage" value="78%" trend="stable" />
        <MetricCard title="Memory" value="4.2GB" trend="up" />
      </div>
    </div>
  );
};
