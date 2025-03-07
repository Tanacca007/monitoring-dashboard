import { Request, Response, NextFunction } from 'express';
import ApiKeyModel, { IApiKey } from '../models/ApiKey';

// Define interface for request with apiKey
interface RequestWithApiKey extends Request {
  apiKey?: IApiKey;
}

// Export as named export, not default export
export const apiKeyAuthMiddleware = async (req: RequestWithApiKey, res: Response, next: NextFunction): Promise<void> => {
  try {
    const keyDoc: IApiKey | null = await ApiKeyModel.findOne({ /* your query */ }).exec();
    if (!keyDoc) {
      res.status(401).send('Unauthorized');
      return; // Do not return the response object
    }
    
    // Fix for type assignment error
    req.apiKey = keyDoc;
    next();
  } catch (error) {
    next(error);
  }
}; 