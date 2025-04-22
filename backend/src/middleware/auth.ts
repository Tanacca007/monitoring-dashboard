import { Request, Response, NextFunction } from 'express';
import mongoose, { Document } from 'mongoose';
import ApiKeyModel, { IApiKey } from '../models/ApiKey';

// (Removed custom RequestWithApiKey interface and MongooseDocument type)
// Use global Express.Request augmentation from types.d.ts instead.

// Export as named export, not default export
export const apiKeyAuthMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
    // Using toObject() ensures we have a plain JavaScript object, not a Mongoose document
    if (keyDoc) {
      req.apiKey = keyDoc.toObject ? keyDoc.toObject() as IApiKey : keyDoc as unknown as IApiKey;
    }
    
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