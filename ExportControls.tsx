const ExportControls = () => {
  const exportOptions = {
    formats: ['CSV', 'JSON', 'PDF'],
    timeRanges: ['1h', '24h', '7d', '30d'],
    metrics: ['all', 'performance', 'assets', 'cache']
  };

  const [selectedFormat, setSelectedFormat] = useState('CSV');
  const [timeRange, setTimeRange] = useState('24h');
  const [selectedMetrics, setSelectedMetrics] = useState('all');

  const handleExport = async () => {
    const exportConfig = {
      format: selectedFormat,
      timeRange: timeRange,
      metrics: selectedMetrics
    };

    const exportData = await generateExportData(exportConfig);
    downloadExport(exportData, exportConfig);
  };

  return (
    <div className="export-controls space-y-4">
      <h4 className="text-sm font-medium mb-3">Export Data</h4>
      
      <div className="grid grid-cols-3 gap-4">
        <FormatSelector
          formats={exportOptions.formats}
          selected={selectedFormat}
          onSelect={setSelectedFormat}
        />
        
        <TimeRangeSelector
          ranges={exportOptions.timeRanges}
          selected={timeRange}
          onSelect={setTimeRange}
        />
        
        <MetricSelector
          metrics={exportOptions.metrics}
          selected={selectedMetrics}
          onSelect={setSelectedMetrics}
        />
      </div>

      <button
        onClick={handleExport}
        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Export Monitoring Data
      </button>
    </div>
  );
};
