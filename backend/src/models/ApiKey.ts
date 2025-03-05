import mongoose from 'mongoose';

export interface IApiKey {
  key: string;
  name: string;
  createdAt: Date;
  lastUsed?: Date;
  isActive: boolean;
}

const apiKeySchema = new mongoose.Schema<IApiKey>({
  key: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  lastUsed: { type: Date },
  isActive: { type: Boolean, default: true }
});

export default mongoose.model<IApiKey>('ApiKey', apiKeySchema); 