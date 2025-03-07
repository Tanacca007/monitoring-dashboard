import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import metricsRoutes from './routes/metrics';
import alertsRoutes from './routes/alerts';
import apiKeyRoutes from './routes/apiKeys';
import ApiKeyModel, { IApiKey } from './models/ApiKey';
import { apiKeyAuthMiddleware } from './middleware/auth';
import React from 'react';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.DB_URI || 'mongodb://localhost:27017/mydatabase')
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT || 3000}`);
  });
})
.catch(err => {
  console.error('Database connection error:', err);
});

// Routes
app.use('/api/keys', apiKeyRoutes);

// Apply API key authentication to /api/metrics and /api/alerts routes
app.use('/api/metrics', apiKeyAuthMiddleware, metricsRoutes);
app.use('/api/alerts', apiKeyAuthMiddleware, alertsRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Define the type for AlertHandler
interface AlertHandlerType {
    handleAlertAction(alertId: string, action?: string): void;
    acknowledgeAlert(alertId: string): { type: string; alertId: string; timestamp: string; user: string; status: string; };
    dismissAlert(alertId: string): { type: string; alertId: string; timestamp: string; user: string; status: string; };
    escalateAlert(alertId: string): { type: string; alertId: string; timestamp: string; user: string; status: string; nextLevel: string; };
}

// Implement the AlertHandler object
const AlertHandler: AlertHandlerType = {
    handleAlertAction(alertId: string, action: string = 'acknowledge'): void {
        const actions: Record<string, (id: string) => any> = {
            acknowledge: this.acknowledgeAlert,
            dismiss: this.dismissAlert,
            escalate: this.escalateAlert,
        };
        
        if (actions[action]) {
            actions[action](alertId);
        } else {
            console.error(`Unknown action: ${action}`);
        }
    },

    acknowledgeAlert(alertId: string) {
        return {
            type: 'ACKNOWLEDGE_ALERT',
            alertId,
            timestamp: new Date().toISOString(),
            user: 'system', // TODO: Implement proper user management
            status: 'acknowledged',
        };
    },

    dismissAlert(alertId: string) {
        return {
            type: 'DISMISS_ALERT',
            alertId,
            timestamp: new Date().toISOString(),
            user: 'system', // TODO: Implement proper user management
            status: 'dismissed',
        };
    },

    escalateAlert(alertId: string) {
        return {
            type: 'ESCALATE_ALERT',
            alertId,
            timestamp: new Date().toISOString(),
            user: 'system', // TODO: Implement proper user management
            status: 'escalated',
            nextLevel: determineEscalationLevel(alertId) || 'level1',
        };
    },
};
// Define the determineEscalationLevel function outside of the AlertHandler object
function determineEscalationLevel(alertId: string): string {
    // Implementation logic
    return 'level1'; // Default level
}
interface MonitoringControlsProps {
    active: boolean;
    interval: number;
    onToggle: () => void;
    onIntervalChange: (interval: number) => void;
}
    onToggle: () => void;
    onIntervalChange: (interval: number) => void;
const MonitoringControls: React.FC<MonitoringControlsProps> = ({ active, interval, onToggle, onIntervalChange }): JSX.Element => {
    return (
        <div className="monitoring-controls">
            <div>Status: {active ? 'Active' : 'Inactive'}</div>
        </div>
    );
};

const router = express.Router();

router.delete('/:id', async (req: express.Request, res: express.Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const apiKey = await ApiKeyModel.findById(id);
        if (!apiKey) {
            return res.status(404).send('API key not found');
        }
        await apiKey.remove();
        res.status(200).send('API key deleted');
    } catch (error) {
        next(error);
    }
});

export { apiKeyAuthMiddleware };

function getCurrentUser(): string {
  return 'system'; // Default implementation
}

export default app;
