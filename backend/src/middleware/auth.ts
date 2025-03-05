import { Request, Response, NextFunction } from 'express';
import ApiKey from '../models/ApiKey';

// Extend the Request interface to include apiKey
interface RequestWithApiKey extends Request {
  apiKey?: typeof ApiKey;
}

export const apiKeyAuthMiddleware = async (req: RequestWithApiKey, res: Response, next: NextFunction) => {
  try {
    const apiKey = req.header('X-API-Key');

    if (!apiKey) {
      return res.status(401).json({ error: 'API key is required' });
    }

    const keyDoc = await ApiKey.findOne({ key: apiKey, isActive: true });

    if (!keyDoc) {
      return res.status(401).json({ error: 'Invalid API key' });
    }

    // Update last used timestamp
    keyDoc.lastUsed = new Date();
    await keyDoc.save();

    // Add API key info to request for later use
    req.apiKey = keyDoc;

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ error: 'Authentication error' });
  }
}; 