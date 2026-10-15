import app from './app.js';
import { env, validateEnv } from './config/env.js';
import { testDatabaseConnection, getPool } from './config/database.js';
import { verifyMailConnection } from './config/mail.js';

// Catch and display fatal crashes with full reason
process.on('uncaughtException', (err) => {
  console.error('\n\x1b[41m\x1b[37m\x1b[1m 🔥 FATAL CRASH: UNCAUGHT EXCEPTION \x1b[0m');
  console.error('\x1b[31mWhy it crashed:\x1b[0m', err.message);
  if (err.stack) console.error('\x1b[90m' + err.stack + '\x1b[0m');
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error('\n\x1b[43m\x1b[30m\x1b[1m ⚠️  UNHANDLED PROMISE REJECTION \x1b[0m');
  console.error('\x1b[33mReason:\x1b[0m', reason?.message || reason);
  if (reason?.stack) console.error('\x1b[90m' + reason.stack + '\x1b[0m');
});

const startServer = async () => {
  try {
    // 1. Validate environment configuration
    validateEnv();

    // 2. Test dependencies connectivity safely
    const isDbConnected = await testDatabaseConnection();
    await verifyMailConnection();

    // 3. Start listening
    const server = app.listen(env.PORT, () => {
      console.log('\n\x1b[36m\x1b[1m' + '═'.repeat(60) + '\x1b[0m');
      console.log(`\x1b[32m\x1b[1m  🚀 TripVerse Backend Server Started\x1b[0m`);
      console.log(`\x1b[36m  Port:\x1b[0m        http://localhost:${env.PORT}`);
      console.log(`\x1b[36m  API Base:\x1b[0m    http://localhost:${env.PORT}/api`);
      console.log(`\x1b[36m  Health:\x1b[0m      http://localhost:${env.PORT}/api/health`);
      console.log(`\x1b[36m  Database:\x1b[0m    ${isDbConnected ? '\x1b[32mConnected (tripverse_db)\x1b[0m' : '\x1b[31mDisconnected\x1b[0m'}`);
      console.log(`\x1b[36m  Environment:\x1b[0m ${env.NODE_ENV}`);
      console.log('\x1b[36m\x1b[1m' + '═'.repeat(60) + '\x1b[0m');
      console.log('\x1b[90mListening for incoming API requests...\x1b[0m\n');
    });

    // 4. Graceful shutdown handlers
    const shutdown = async (signal) => {
      console.log(`\n\x1b[33m[SHUTDOWN] Received ${signal}. Closing HTTP server...\x1b[0m`);
      server.close(async () => {
        console.log('\x1b[32m[SHUTDOWN] HTTP server closed cleanly.\x1b[0m');
        try {
          const pool = getPool();
          await pool.end();
          console.log('\x1b[32m[SHUTDOWN] Database connections closed.\x1b[0m');
        } catch (poolErr) {
          console.warn('[SHUTDOWN WARNING] Database pool shutdown error:', poolErr.message);
        }
        process.exit(0);
      });

      // Force exit if hanging
      setTimeout(() => {
        console.error('\x1b[31m[SHUTDOWN ERROR] Forced shutdown after timeout.\x1b[0m');
        process.exit(1);
      }, 5000);
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));

  } catch (error) {
    console.error('\n\x1b[31m[STARTUP ERROR] Fatal error during server startup:\x1b[0m', error.message);
    process.exit(1);
  }
};

startServer();
