import { Router } from 'express';
import authRoutes from './auth.routes.js';
import propertyRoutes from './property.routes.js';
import { sendSuccess } from '../utils/response.js';

const router = Router();

/**
 * Health check endpoint
 */
router.get('/health', (req, res) => {
  return sendSuccess(res, 'TripVerse API is healthy.', {
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'tripverse-backend'
  });
});

/**
 * Mount sub-routers
 */
router.use('/auth', authRoutes);
router.use('/properties', propertyRoutes);

export default router;
