import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { userRepository } from '../repositories/user.repository.js';
import { sendError } from '../utils/response.js';

/**
 * Authentication middleware to verify JWT access tokens.
 * Protects endpoints like GET /api/auth/me and future modules.
 */
export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return sendError(res, 'Authentication required. Missing or malformed token.', [], 401);
    }

    const token = authHeader.split(' ')[1]?.trim();

    if (!token) {
      return sendError(res, 'Authentication required. No token provided.', [], 401);
    }

    let decoded;
    try {
      decoded = jwt.verify(token, env.JWT.secret);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return sendError(res, 'Access token has expired. Please sign in again.', [], 401);
      }
      return sendError(res, 'Invalid authentication token.', [], 401);
    }

    // Verify user exists and is active in the database
    const user = await userRepository.findById(decoded.userId);

    if (!user) {
      return sendError(res, 'Account associated with this session no longer exists.', [], 401);
    }

    if (user.account_status === 'suspended') {
      return sendError(res, 'This account is suspended. Please contact support.', [], 403);
    }

    // Attach active user context to the request
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default authenticate;
