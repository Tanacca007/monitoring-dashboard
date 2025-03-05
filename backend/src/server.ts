import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { apiKeyAuthMiddleware } from './middleware/auth';
import metricsRoutes from './routes/metrics';
import alertsRoutes from './routes/alerts';
import apiKeyRoutes from './routes/apiKeys';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI!)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/api/keys', apiKeyRoutes);

// Apply API key authentication to /api/metrics and /api/alerts routes
app.use('/api/metrics', apiKeyAuthMiddleware, metricsRoutes);
app.use('/api/alerts', apiKeyAuthMiddleware, alertsRoutes);

// Error handling middleware
interface ErrorWithStack extends Error {
  stack?: string;
}

app.use((err: ErrorWithStack, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});