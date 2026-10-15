import app from './app.js';
import { env, validateEnv } from './config/env.js';
import { testDatabaseConnection, getPool } from './config/database.js';
import { verifyMailConnection } from './config/mail.js';

const startServer = async () => {
  try {
    // 1. Validate environment configuration
    validateEnv();

    // 2. Test dependencies connectivity safely
    await testDatabaseConnection();
    await verifyMailConnection();

    // 3. Start listening
    const server = app.listen(env.PORT, () => {
      console.log('====================================================');
      console.log(` TripVerse Backend Server running on port ${env.PORT}`);
      console.log(` Environment: ${env.NODE_ENV}`);
      console.log(` Base API URL: http://localhost:${env.PORT}/api`);
      console.log(` Health Check: http://localhost:${env.PORT}/api/health`);
      console.log('====================================================');
    });

    // 4. Graceful shutdown handlers
    const shutdown = async (signal) => {
      console.log(`\n[SHUTDOWN] Received ${signal}. Closing HTTP server...`);
      server.close(async () => {
        console.log('[SHUTDOWN] HTTP server closed.');
        try {
          const pool = getPool();
          await pool.end();
          console.log('[SHUTDOWN] Database connections closed cleanly.');
        } catch (poolErr) {
          console.warn('[SHUTDOWN WARNING] Database pool shutdown error:', poolErr.message);
        }
        process.exit(0);
      });

      // Force exit if hanging
      setTimeout(() => {
        console.error('[SHUTDOWN ERROR] Forced shutdown after timeout.');
        process.exit(1);
      }, 5000);
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));

  } catch (error) {
    console.error('[STARTUP ERROR] Fatal error during server startup:', error.message);
    process.exit(1);
  }
};

startServer();
