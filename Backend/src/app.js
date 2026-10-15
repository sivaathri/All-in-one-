import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { env } from './config/env.js';
import routes from './routes/index.js';
import { generalLimiter } from './middleware/rate-limit.middleware.js';
import { notFoundHandler, errorHandler } from './middleware/error.middleware.js';
import { requestLogger } from './middleware/logger.middleware.js';

const app = express();

// Real-time terminal logger for API hits
app.use(requestLogger);

// 1. Security Headers
app.use(helmet());

// 2. CORS Configuration
const allowedOrigins = [
  env.FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:3000'
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin) return callback(null, true);

      if (env.NODE_ENV === 'development' || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`CORS policy blocked access from origin: ${origin}`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// 3. Request Body Parsers (Increased to 50mb for property listing forms & photos)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// 4. Rate Limiting for general endpoints
app.use('/api', generalLimiter);

// 5. API Routes
app.use('/api', routes);

// 6. 404 Handler
app.use(notFoundHandler);

// 7. Global Error Handler
app.use(errorHandler);

export default app;
