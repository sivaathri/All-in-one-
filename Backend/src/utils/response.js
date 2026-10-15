/**
 * Standard API Response Utilities
 * Strictly conforms to Section 10 API Response Format:
 * Success: { success: true, message: string, data?: object }
 * Error:   { success: false, message: string, errors?: array }
 */

export const sendSuccess = (res, message, data = null, statusCode = 200) => {
  const payload = {
    success: true,
    message
  };

  if (data !== null && data !== undefined) {
    payload.data = data;
  }

  return res.status(statusCode).json(payload);
};

export const sendError = (res, message, errors = [], statusCode = 400) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors: Array.isArray(errors) ? errors : [errors]
  });
};

export default {
  sendSuccess,
  sendError
};
