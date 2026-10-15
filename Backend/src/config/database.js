import mysql from 'mysql2/promise';
import { env } from './env.js';

let pool = null;

/**
 * Initialize or retrieve the singleton MySQL connection pool.
 */
export const getPool = () => {
  if (!pool) {
    pool = mysql.createPool({
      host: env.DB.host,
      port: env.DB.port,
      user: env.DB.user,
      password: env.DB.password,
      database: env.DB.database,
      waitForConnections: env.DB.waitForConnections,
      connectionLimit: env.DB.connectionLimit,
      queueLimit: env.DB.queueLimit,
      enableKeepAlive: env.DB.enableKeepAlive,
      keepAliveInitialDelay: env.DB.keepAliveInitialDelay,
      dateStrings: true
    });
  }
  return pool;
};

/**
 * Allow overriding pool for testing / mocks.
 */
export const setPool = (customPool) => {
  pool = customPool;
};

/**
 * Test connectivity to the MySQL database.
 */
export const testDatabaseConnection = async () => {
  try {
    const currentPool = getPool();
    const connection = await currentPool.getConnection();
    await connection.ping();
    connection.release();
    console.log(`[DATABASE] Successfully connected to MySQL (${env.DB.host}:${env.DB.port}/${env.DB.database})`);
    return true;
  } catch (error) {
    console.error(`[DATABASE ERROR] Could not connect to MySQL: ${error.message}`);
    console.warn(`[DATABASE NOTICE] Please verify that your MySQL server is running and the database '${env.DB.database}' is created using database/schema.sql.`);
    return false;
  }
};

/**
 * Execute parameterized query using the pool.
 */
export const query = async (sql, params = []) => {
  const currentPool = getPool();
  const [rows] = await currentPool.query(sql, params);
  return rows;
};

let customTransactionHandler = null;

/**
 * Allow overriding transaction handler for test mocks.
 */
export const setTransactionHandler = (handler) => {
  customTransactionHandler = handler;
};

/**
 * Execute a callback within an ACID transaction.
 * Automatically handles BEGIN, COMMIT, ROLLBACK, and connection release.
 *
 * @param {Function} callback - async (connection) => Promise<result>
 */
export const withTransaction = async (callback) => {
  if (customTransactionHandler) {
    return customTransactionHandler(callback);
  }

  const currentPool = getPool();
  const connection = await currentPool.getConnection();
  await connection.beginTransaction();

  try {
    const result = await callback(connection);
    await connection.commit();
    return result;
  } catch (error) {
    try {
      await connection.rollback();
    } catch (rollbackError) {
      console.error('[DATABASE ROLLBACK ERROR]:', rollbackError.message);
    }
    throw error;
  } finally {
    connection.release();
  }
};

export default {
  getPool,
  setPool,
  setTransactionHandler,
  testDatabaseConnection,
  query,
  withTransaction
};
