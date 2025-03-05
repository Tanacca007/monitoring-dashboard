import express from 'express';
import Metric, { IMetric } from '../models/Metric';

const router = express.Router();

// Submit new metrics
router.post('/', async (req: express.Request, res: express.Response) => {
  try {
    const metrics: IMetric[] = Array.isArray(req.body) ? req.body : [req.body];
    
    const savedMetrics = await Metric.insertMany(metrics.map(metric => ({
      ...metric,
      timestamp: metric.timestamp || new Date()
    })));

    res.status(201).json(savedMetrics);
  } catch (error) {
    console.error('Error saving metrics:', error);
    res.status(500).json({ error: 'Failed to save metrics' });
  }
});

// Get metrics with filtering and aggregation
router.get('/', async (req: express.Request, res: express.Response) => {
  try {
    const { 
      name, 
      from, 
      to, 
      limit = 100,
      aggregate
    } = req.query;

    const query: any = {};
    if (name) query.name = name;
    if (from || to) {
      query.timestamp = {};
      if (from) query.timestamp.$gte = new Date(from as string);
      if (to) query.timestamp.$lte = new Date(to as string);
    }

    if (aggregate === 'true') {
      const aggregation = await Metric.aggregate([
        { $match: query },
        { 
          $group: {
            _id: '$name',
            avgValue: { $avg: '$value' },
            minValue: { $min: '$value' },
            maxValue: { $max: '$value' },
            lastValue: { $last: '$value' },
            lastTimestamp: { $last: '$timestamp' }
          }
        }
      ]);
      return res.json(aggregation);
    }

    const metrics = await Metric.find(query)
      .sort({ timestamp: -1 })
      .limit(Number(limit));

    res.json(metrics);
  } catch (error) {
    console.error('Error fetching metrics:', error);
    res.status(500).json({ error: 'Failed to fetch metrics' });
  }
});

// Get metric by ID
router.get('/:id', async (req: express.Request, res: express.Response) => {
  try {
    const metric = await Metric.findById(req.params.id);
    if (!metric) {
      return res.status(404).json({ error: 'Metric not found' });
    }
    res.json(metric);
  } catch (error) {
    console.error('Error fetching metric:', error);
    res.status(500).json({ error: 'Failed to fetch metric' });
  }
});

export default router; 