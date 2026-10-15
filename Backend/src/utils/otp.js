import crypto from 'crypto';
import { env } from '../config/env.js';

/**
 * Generate a cryptographically secure numeric OTP of specified length (default: 6 digits).
 * Uses crypto.randomInt to guarantee uniform cryptographic randomness.
 *
 * @param {number} length - Number of digits (default 6)
 * @returns {string} 6-digit numeric OTP string
 */
export const generateSecureOtp = (length = 6) => {
  const min = Math.pow(10, length - 1); // 100000
  const max = Math.pow(10, length);     // 1000000
  return crypto.randomInt(min, max).toString();
};

/**
 * Hash an OTP using SHA-256 with an HMAC pepper key to safeguard against rainbow tables.
 *
 * @param {string} otp - The plain text OTP
 * @param {string} pepper - Optional secret pepper, defaults to env.JWT.secret
 * @returns {string} Hex encoded HMAC hash
 */
export const hashOtp = (otp, pepper = env.JWT.secret) => {
  return crypto.createHmac('sha256', pepper).update(String(otp)).digest('hex');
};

/**
 * Securely verify plain OTP against the stored hash in constant time.
 * Prevents timing attacks using crypto.timingSafeEqual.
 *
 * @param {string} plainOtp - Submitted OTP
 * @param {string} storedHash - Stored hex HMAC hash
 * @param {string} pepper - Secret pepper
 * @returns {boolean} True if matching, false otherwise
 */
export const verifyOtpHash = (plainOtp, storedHash, pepper = env.JWT.secret) => {
  if (!plainOtp || !storedHash) return false;

  const candidateHash = hashOtp(plainOtp, pepper);
  const candidateBuf = Buffer.from(candidateHash, 'hex');
  const storedBuf = Buffer.from(storedHash, 'hex');

  if (candidateBuf.length !== storedBuf.length) {
    return false;
  }

  return crypto.timingSafeEqual(candidateBuf, storedBuf);
};

/**
 * Mask an email or mobile number for safe logs and API feedback.
 * e.g., user@example.com -> u***@example.com
 * e.g., +919876543210 -> +91******3210
 *
 * @param {string} identifier - Email or mobile number
 * @returns {string} Masked string
 */
export const maskIdentifier = (identifier) => {
  if (!identifier) return '';

  if (identifier.includes('@')) {
    const [user, domain] = identifier.split('@');
    if (user.length <= 2) {
      return `${user[0]}*@${domain}`;
    }
    return `${user[0]}${'*'.repeat(Math.max(user.length - 2, 2))}${user[user.length - 1]}@${domain}`;
  }

  // Mobile number
  if (identifier.length > 6) {
    const visibleStart = identifier.slice(0, 3);
    const visibleEnd = identifier.slice(-4);
    const maskedLength = identifier.length - 7;
    return `${visibleStart}${'*'.repeat(Math.max(maskedLength, 3))}${visibleEnd}`;
  }

  return '***';
};

export default {
  generateSecureOtp,
  hashOtp,
  verifyOtpHash,
  maskIdentifier
};
