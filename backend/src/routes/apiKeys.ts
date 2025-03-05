import express from 'express';
import crypto from 'crypto';
import ApiKey from '../models/ApiKey';

const router = express.Router();

// Generate a new API key
router.post('/', async (req: express.Request, res: express.Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    // Generate a random API key
    const key = crypto.randomBytes(32).toString('hex');

    const apiKey = new ApiKey({
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
    const apiKeys = await ApiKey.find({}, { key: 0 });
    res.json(apiKeys);
  } catch (error) {
    console.error('Error fetching API keys:', error);
    res.status(500).json({ error: 'Failed to fetch API keys' });
  }
});

// Deactivate an API key
router.delete('/:id', async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const apiKey = await ApiKey.findById(id);

    if (!apiKey) {
      return res.status(404).json({ error: 'API key not found' });
    }

    apiKey.isActive = false;
    await apiKey.save();

    res.json({ message: 'API key deactivated successfully' });
  } catch (error) {
    console.error('Error deactivating API key:', error);
    res.status(500).json({ error: 'Failed to deactivate API key' });
  }
});

export default router; 