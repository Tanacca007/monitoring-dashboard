const EnhancedExport = () => {
  const [exportJob, setExportJob] = useState(null);
  
  const exportFeatures = {
    async exportToCSV(data) {
      const csv = convertToCSV(data);
      return downloadFile(csv, 'monitoring-data.csv');
    },
    
    async exportToJSON(data) {
      const json = JSON.stringify(data, null, 2);
      return downloadFile(json, 'monitoring-data.json');
    },
    
    async exportToPDF(data) {
      const pdf = await generatePDF(data);
      return downloadFile(pdf, 'monitoring-report.pdf');
    }
  };

  const handleExport = async (config) => {
    const job = {
      id: generateUniqueId(),
      status: 'processing',
      progress: 0,
      config
    };
    
    setExportJob(job);
    
    try {
      const data = await fetchMonitoringData(config);
      await exportFeatures[config.format.toLowerCase()](data);
      
      setExportJob({ ...job, status: 'completed', progress: 100 });
    } catch (error) {
      setExportJob({ ...job, status: 'failed', error });
    }
  };

  return (
    <div className="enhanced-export">
      <ExportConfig onExport={handleExport} />
      {exportJob && <ExportProgress job={exportJob} />}
      <ExportHistory />
    </div>
  );
};

export { FormatSelector, TimeRangeSelector, EnhancedExport };
