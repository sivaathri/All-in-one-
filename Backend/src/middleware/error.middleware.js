import { env } from '../config/env.js';
import { sendError } from '../utils/response.js';

/**
 * 404 Route Not Found handler.
 */
export const notFoundHandler = (req, res) => {
  if (env.NODE_ENV !== 'test') {
    console.warn(`\x1b[33m⚠️  [404 NOT FOUND]\x1b[0m ${req.method} ${req.originalUrl} does not match any route.`);
  }

  return sendError(
    res,
    `Resource not found: ${req.method} ${req.originalUrl}`,
    [],
    404
  );
};

/**
 * Global application error handler.
 * Logs comprehensive crash and error details in terminal while keeping API output secure.
 */
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || (res.statusCode >= 400 ? res.statusCode : 500);

  // Detailed Terminal Diagnostics for Developer
  if (env.NODE_ENV !== 'test') {
    console.error('\n\x1b[31m\x1b[1m' + '─'.repeat(70) + '\x1b[0m');
    console.error(`\x1b[31m\x1b[1m🚨 [API ERROR / CRASH REASON]\x1b[0m ${req.method} ${req.originalUrl}`);
    console.error(`\x1b[33mStatus Code:\x1b[0m ${statusCode}`);
    console.error(`\x1b[33mWhy it failed:\x1b[0m ${err.message || 'Unknown error'}`);

    if (err.code) {
      console.error(`\x1b[33mError Code:\x1b[0m ${err.code}`);
    }

    if (err.errors && err.errors.length > 0) {
      console.error(`\x1b[33mValidation Errors:\x1b[0m`, JSON.stringify(err.errors, null, 2));
    }

    if (err.stack && env.NODE_ENV === 'development') {
      console.error(`\x1b[90mStack Trace:\n${err.stack}\x1b[0m`);
    }
    console.error('\x1b[31m\x1b[1m' + '─'.repeat(70) + '\x1b[0m\n');
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
