import React from 'react';

interface ResourceGaugeProps {
  type: string;
  value: number;
  threshold: number;
  icon: string;
}

interface ResourceHistoryProps {
  data: any[];
}

interface ResourceMonitorProps {
  resources: {
    cpu: number;
    memory: number;
    disk: number;
    history: any[];
  };
  thresholds: {
    cpu: number;
    memory: number;
    disk: number;
  };
}

// Placeholder components (replace with actual implementation if available)
const ResourceGauge: React.FC<ResourceGaugeProps> = ({ type, value, threshold, icon }) => (
  <div className="resource-gauge">
    <div className="flex items-center">
      <span className="text-gray-700">{type}</span>
      <span className="ml-auto font-semibold">{value}%</span>
    </div>
    <div className="bg-gray-200 h-2 rounded-full mt-2">
      <div 
        className={`h-full rounded-full ${value > threshold ? 'bg-red-500' : 'bg-green-500'}`}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  </div>
);

const ResourceHistory: React.FC<ResourceHistoryProps> = ({ data }) => (
  <div className="resource-history mt-6">
    <h4 className="text-sm font-medium mb-2">Resource History</h4>
    <p className="text-sm text-gray-500">Historical data visualization placeholder</p>
  </div>
);

const ResourceMonitor: React.FC<ResourceMonitorProps> = ({ resources, thresholds }) => {
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

export default ResourceMonitor;
