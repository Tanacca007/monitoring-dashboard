const ResourceMonitor = ({ resources, thresholds }) => {
  return (
    <div className="resource-monitor p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">System Resources</h3>
      
      <div className="grid grid-cols-3 gap-6">
        <ResourceGauge
          type="CPU"
          value={resources.cpu}
          threshold={thresholds.cpu}
          icon="cpu"
        />
        
        <ResourceGauge
          type="Memory"
          value={resources.memory}
          threshold={thresholds.memory}
          icon="memory"
        />
        
        <ResourceGauge
          type="Disk"
          value={resources.disk}
          threshold={thresholds.disk}
          icon="disk"
        />
      </div>
      
      <ResourceHistory data={resources.history} />
    </div>
  );
};
