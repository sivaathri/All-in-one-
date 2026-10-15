import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Determine root directory to locate .env reliably
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../../.env');

dotenv.config({ path: envPath });

const requiredEnvVars = [
  'JWT_SECRET',
  'DB_HOST',
  'DB_USER',
  'DB_NAME'
];

/**
 * Validate presence of required environment variables.
 * In development, we allow defaults with a clear warning so initial startup is smooth.
 */
export const validateEnv = () => {
  const missing = requiredEnvVars.filter((varName) => !process.env[varName]);

  if (missing.length > 0) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(`[CRITICAL] Missing required environment variables in production: ${missing.join(', ')}`);
    } else {
      console.warn(`[WARN] Missing environment variables (${missing.join(', ')}). Using development defaults.`);
    }
  }
};

export const env = {
  get NODE_ENV() {
    return process.env.NODE_ENV || 'development';
  },
  PORT: parseInt(process.env.PORT, 10) || 5001,
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',

  DB: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'tripverse_db',
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT, 10) || 10,
    queueLimit: 0,
    waitForConnections: true,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
  },

  JWT: {
    secret: process.env.JWT_SECRET || 'tripverse_dev_secret_key_super_secure_random_string_2026!',
    expiresIn: process.env.JWT_EXPIRES_IN || '30d'
  },

  SMTP: {
    host: process.env.SMTP_HOST || '',
    port: parseInt(process.env.SMTP_PORT, 10) || 587,
    user: process.env.SMTP_USER || '',
    password: process.env.SMTP_PASSWORD || '',
    from: process.env.EMAIL_FROM || 'TripVerse <no-reply@tripverse.com>'
  },

  SMS: {
    provider: process.env.SMS_PROVIDER || 'mock',
    apiKey: process.env.SMS_API_KEY || '',
    senderId: process.env.SMS_SENDER_ID || 'TRIPVR'
  },

  OTP: {
    length: 6,
    expiryMinutes: 5,
    maxAttempts: 5,
    resendCooldownSeconds: 60
  }
};
