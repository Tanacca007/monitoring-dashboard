import mongoose from 'mongoose';

export interface IMetric {
  name: string;
  value: number;
  unit: string;
  timestamp: Date;
  tags: Record<string, string>;
}

const metricSchema = new mongoose.Schema<IMetric>({
  name: { type: String, required: true, index: true },
  value: { type: Number, required: true },
  unit: { type: String, required: true },
  timestamp: { type: Date, default: Date.now, index: true },
  tags: { type: Map, of: String, default: {} }
});

// Create compound index for efficient querying
metricSchema.index({ name: 1, timestamp: -1 });

export default mongoose.model<IMetric>('Metric', metricSchema); 