import { Schema, model, Document } from 'mongoose';

// Define the IApiKey interface
export interface IApiKey extends Document {
  key: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema for the ApiKey
const apiKeySchema = new Schema<IApiKey>({
  key: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Create the model for the ApiKey
const ApiKey = model<IApiKey>('ApiKey', apiKeySchema);

export default ApiKey;