/**
 * Wraps async route handlers to pass unhandled errors to the global error middleware.
 *
 * @param {Function} fn - Async controller function
 * @returns {Function} Express middleware handler
 */
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
