import { env } from '../config/env.js';
import { sendError } from '../utils/response.js';

/**
 * 404 Route Not Found handler.
 */
export const notFoundHandler = (req, res) => {
  return sendError(
    res,
    `Resource not found: ${req.method} ${req.originalUrl}`,
    [],
    404
  );
};

/**
 * Global application error handler.
 * Sanitizes errors so internal DB messages, credentials, and stack traces are never leaked.
 */
export const errorHandler = (err, req, res, next) => {
  // Log full error internally for monitoring/debugging
  if (env.NODE_ENV !== 'test') {
    console.error(`[ERROR] ${req.method} ${req.originalUrl}:`, err);
  }

  // Handle express body parser syntax error (invalid JSON)
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return sendError(res, 'Malformed JSON payload in request body.', [], 400);
  }

  // Handle MySQL unique constraint violation (duplicate entry)
  if (err.code === 'ER_DUP_ENTRY') {
    return sendError(res, 'An account with this email or mobile number already exists.', [], 409);
  }

  // Handle MySQL connection failures safely
  if (err.code === 'ECONNREFUSED' || err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ER_ACCESS_DENIED_ERROR') {
    return sendError(res, 'Database connection unavailable. Please verify service status.', [], 503);
  }

  // Handle explicit status codes from custom errors
  const statusCode = err.statusCode || (res.statusCode >= 400 ? res.statusCode : 500);
  const safeMessage = statusCode === 500 && env.NODE_ENV === 'production'
    ? 'An unexpected error occurred while processing your request.'
    : (err.message || 'The request could not be completed.');

  return sendError(
    res,
    safeMessage,
    err.errors || [],
    statusCode
  );
};

export default {
  notFoundHandler,
  errorHandler
};
