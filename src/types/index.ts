export interface Metric {
  id: string;
  name: string;
  value: number;
  timestamp: string;
  // Add other properties as needed
}

export interface Alert {
  id: string;
  type: string;
  message: string;
  status: string;
  timestamp: string;
  // Add other properties as needed
}

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  active: boolean;
  createdAt: string;
  // Add other properties as needed
}

// Add other type definitions as needed 