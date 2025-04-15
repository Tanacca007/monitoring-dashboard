import { Request, Response, NextFunction } from 'express';
import mongoose, { Document } from 'mongoose';
import ApiKeyModel, { IApiKey } from '../models/ApiKey';

// Define a more flexible interface that can accept Mongoose documents
type MongooseDocument = Document<unknown, any, IApiKey> & IApiKey;

// Define interface for request with apiKey
interface RequestWithApiKey extends Request {
  apiKey?: IApiKey | MongooseDocument | any; // Make more flexible to avoid TypeScript errors
}

// Export as named export, not default export
export const apiKeyAuthMiddleware = async (req: RequestWithApiKey, res: Response, next: NextFunction): Promise<void> => {
  try {
    const apiKeyHeader = req.header('X-API-Key');
    if (!apiKeyHeader) {
      res.status(401).send('API key is required');
      return;
    }
    
    const keyDoc = await ApiKeyModel.findOne({ key: apiKeyHeader, isActive: true }).exec();
    if (!keyDoc) {
      res.status(401).send('Invalid or inactive API key');
      return;
    }
    
    // Convert Mongoose document to plain object and assign it to req.apiKey
    req.apiKey = keyDoc.toObject() as IApiKey;
    
    // Update lastUsed field
    await ApiKeyModel.updateOne(
      { _id: keyDoc._id },
      { $set: { lastUsed: new Date() } }
    );
    
    next();
  } catch (error) {
    console.error('API key authentication error:', error);
    next(error);
  }
};