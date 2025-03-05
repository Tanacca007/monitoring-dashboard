import mongoose from 'mongoose';

export interface IAlert {
  type: 'critical' | 'error' | 'warning' | 'info';
  message: string;
  source: string;
  timestamp: Date;
  acknowledged: boolean;
  acknowledgedAt?: Date;
  acknowledgedBy?: string;
  metadata?: Record<string, any>;
}

const alertSchema = new mongoose.Schema<IAlert>({
  type: { 
    type: String, 
    required: true, 
    enum: ['critical', 'error', 'warning', 'info'],
    index: true 
  },
  message: { type: String, required: true },
  source: { type: String, required: true },
  timestamp: { type: Date, default: Date.now, index: true },
  acknowledged: { type: Boolean, default: false },
  acknowledgedAt: { type: Date },
  acknowledgedBy: { type: String },
  metadata: { type: Map, of: mongoose.Schema.Types.Mixed }
});

// Create compound index for efficient querying
alertSchema.index({ type: 1, timestamp: -1 });
alertSchema.index({ acknowledged: 1, type: 1 });

export default mongoose.model<IAlert>('Alert', alertSchema); 