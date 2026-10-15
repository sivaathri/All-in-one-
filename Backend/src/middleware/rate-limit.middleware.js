import rateLimit from 'express-rate-limit';
import { sendError } from '../utils/response.js';

/**
 * Custom response handler for rate limit exceeded.
 */
const rateLimitHandler = (message) => (req, res) => {
  return sendError(res, message, [], 429);
};

/**
 * Rate limiter for OTP requests (signup, signin/request-otp, resend-otp).
 * Rate limits by IP address and identifier to block brute force and spam attacks.
 */
export const otpRequestLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Max 10 OTP requests per window
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => process.env.NODE_ENV === 'test',
  keyGenerator: (req) => {
    const identifier = req.body?.identifier || req.body?.email || req.body?.mobileNumber || '';
    return `${req.ip}_${identifier}`;
  },
  handler: rateLimitHandler('Too many verification codes requested. Please try again after 15 minutes.')
});

/**
 * Rate limiter for OTP verification attempts.
 */
export const otpVerificationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Max 20 verification attempts per window
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => process.env.NODE_ENV === 'test',
  handler: rateLimitHandler('Too many verification attempts from this IP. Please try again after 15 minutes.')
});

/**
 * General global API rate limiter.
 */
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => process.env.NODE_ENV === 'test',
  handler: rateLimitHandler('Too many requests. Please slow down and try again later.')
});

export default {
  otpRequestLimiter,
  otpVerificationLimiter,
  generalLimiter
};
