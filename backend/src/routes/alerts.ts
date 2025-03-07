import express, { Router, Request, Response, NextFunction } from 'express';
import Alert, { IAlert } from '../models/Alert';

const router = Router();

// Create new alert
router.post('/', async (req: express.Request, res: express.Response) => {
  try {
    const alertData: IAlert = req.body;
    const alert = new Alert({
      ...alertData,
      timestamp: alertData.timestamp || new Date(),
      acknowledged: false
    });

    await alert.save();
    res.status(201).json(alert);
  } catch (error) {
    console.error('Error creating alert:', error);
    res.status(500).json({ error: 'Failed to create alert' });
  }
});

// Get alerts with filtering
router.get('/', async (req: express.Request, res: express.Response) => {
  try {
    const {
      type,
      from,
      to,
      acknowledged,
      limit = 100
    } = req.query;

    const query: any = {};
    if (type) query.type = type;
    if (acknowledged !== undefined) query.acknowledged = acknowledged === 'true';
    if (from || to) {
      query.timestamp = {};
      if (from) query.timestamp.$gte = new Date(from as string);
      if (to) query.timestamp.$lte = new Date(to as string);
    }

    const alerts = await Alert.find(query)
      .sort({ timestamp: -1 })
      .limit(Number(limit));

    res.json(alerts);
  } catch (error) {
    console.error('Error fetching alerts:', error);
    res.status(500).json({ error: 'Failed to fetch alerts' });
  }
});

// Acknowledge an alert
router.post('/:id/acknowledge', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { acknowledgedBy } = req.body;

    const alert = await Alert.findById(id);
    if (!alert) {
      res.status(404).json({ error: 'Alert not found' });
      return;
    }

    alert.acknowledged = true;
    alert.acknowledgedAt = new Date();
    alert.acknowledgedBy = acknowledgedBy;
    await alert.save();

    res.status(200).send('Alert acknowledged');
  } catch (error) {
    next(error);
  }
});

// Get alert statistics
router.get('/stats', async (req: express.Request, res: express.Response) => {
  try {
    const stats = await Alert.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
          acknowledged: {
            $sum: { $cond: ['$acknowledged', 1, 0] }
          },
          unacknowledged: {
            $sum: { $cond: ['$acknowledged', 0, 1] }
          }
        }
      }
    ]);

    res.json(stats);
  } catch (error) {
    console.error('Error fetching alert stats:', error);
    res.status(500).json({ error: 'Failed to fetch alert statistics' });
  }
});

export default router; 