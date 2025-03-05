import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import { apiKeyAuthMiddleware } from '../../middleware/auth';
import metricsRoutes from '../metrics';
import ApiKey from '../../models/ApiKey';
import Metric from '../../models/Metric';

const app = express();
app.use(express.json());
app.use(apiKeyAuthMiddleware);
app.use('/api/metrics', metricsRoutes);

describe('Metrics Routes', () => {
  let apiKey: string;

  beforeAll(async () => {
    // Create test API key
    const keyDoc = await ApiKey.create({
      key: 'test-api-key',
      name: 'Test Key',
      isActive: true
    });
    apiKey = keyDoc.key;
  });

  beforeEach(async () => {
    await Metric.deleteMany({});
  });

  describe('POST /api/metrics', () => {
    it('should create a new metric', async () => {
      const metric = {
        name: 'cpu_usage',
        value: 75.5,
        unit: '%',
        tags: { host: 'server-1' }
      };

      const response = await request(app)
        .post('/api/metrics')
        .set('X-API-Key', apiKey)
        .send(metric);

      expect(response.status).toBe(201);
      expect(response.body[0]).toMatchObject({
        name: metric.name,
        value: metric.value,
        unit: metric.unit
      });
    });
  });

  describe('GET /api/metrics', () => {
    it('should fetch metrics with filters', async () => {
      // Create test metrics
      await Metric.create([
        {
          name: 'cpu_usage',
          value: 75.5,
          unit: '%',
          timestamp: new Date('2024-01-01')
        },
        {
          name: 'memory_usage',
          value: 85.5,
          unit: '%',
          timestamp: new Date('2024-01-02')
        }
      ]);

      const response = await request(app)
        .get('/api/metrics')
        .set('X-API-Key', apiKey)
        .query({
          name: 'cpu_usage',
          from: '2024-01-01',
          to: '2024-01-02'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].name).toBe('cpu_usage');
    });
  });
}); 