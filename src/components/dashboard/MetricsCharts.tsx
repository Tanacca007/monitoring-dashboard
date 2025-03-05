import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { SystemMetrics } from '../../services/MonitoringService';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface MetricsChartsProps {
  metricsHistory: SystemMetrics[];
}

const MetricsCharts: React.FC<MetricsChartsProps> = ({ metricsHistory }) => {
  const timestamps = metricsHistory.map(m => 
    new Date(m.timestamp).toLocaleTimeString()
  );

  const createChartData = (label: string, data: number[]) => ({
    labels: timestamps,
    datasets: [
      {
        label,
        data,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-4 rounded-lg shadow-sm h-[300px]">
        <Line 
          options={options} 
          data={createChartData('CPU Utilization (%)', 
            metricsHistory.map(m => m.cpuUtilization)
          )} 
        />
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm h-[300px]">
        <Line 
          options={options} 
          data={createChartData('Memory Usage (%)', 
            metricsHistory.map(m => m.memoryUsage)
          )} 
        />
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm h-[300px]">
        <Line 
          options={options} 
          data={createChartData('Network Latency (ms)', 
            metricsHistory.map(m => m.networkLatency)
          )} 
        />
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm h-[300px]">
        <Line 
          options={options} 
          data={createChartData('Requests/Second', 
            metricsHistory.map(m => m.requestsPerSecond)
          )} 
        />
      </div>
    </div>
  );
};

export default MetricsCharts; 