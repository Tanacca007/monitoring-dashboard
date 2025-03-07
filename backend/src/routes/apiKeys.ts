import express, { Router, Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import ApiKeyModel from '../models/ApiKey';

const router = Router();

// Generate a new API key
router.post('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({ error: 'Name is required' });
      return;
    }

    // Generate a random API key
    const key = crypto.randomBytes(32).toString('hex');

    const apiKey = new ApiKeyModel({
      key,
      name,
      createdAt: new Date(),
      isActive: true
    });

    await apiKey.save();

    res.status(201).json({
      message: 'API key created successfully',
      key,
      name: apiKey.name,
      createdAt: apiKey.createdAt
    });
  } catch (error) {
    console.error('Error creating API key:', error);
    res.status(500).json({ error: 'Failed to create API key' });
  }
});

// List all API keys (without showing the actual keys)
router.get('/', async (req: express.Request, res: express.Response) => {
  try {
    const apiKeys = await ApiKeyModel.find({}, { key: 0 });
    res.json(apiKeys);
  } catch (error) {
    console.error('Error fetching API keys:', error);
    res.status(500).json({ error: 'Failed to fetch API keys' });
  }
});

// Deactivate an API key
router.delete('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const apiKey = await ApiKeyModel.findById(id);
    if (!apiKey) {
      res.status(404).send('API key not found');
      return;
    }
    
    await ApiKeyModel.deleteOne({ _id: id });
    res.status(200).send('API key deleted');
  } catch (error) {
    console.error('Error deleting API key:', error);
    res.status(500).json({ error: 'Failed to delete API key' });
  }
});

export default router; 