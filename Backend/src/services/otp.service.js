import { env } from '../config/env.js';
import { OtpModel } from '../models/otp.model.js';
import { generateSecureOtp, hashOtp, verifyOtpHash } from '../utils/otp.js';

export class OtpService {
  /**
   * Check if user is within the cooldown window for resending OTPs.
   * Throws 429 error if cooldown is active.
   */
  async assertResendCooldown(userId, verificationType) {
    const lastCreatedAt = await OtpModel.getLastCreatedAt(userId, verificationType);
    if (!lastCreatedAt) return;

    const elapsedSeconds = Math.floor((Date.now() - new Date(lastCreatedAt).getTime()) / 1000);
    const cooldown = env.OTP.resendCooldownSeconds;

    if (elapsedSeconds < cooldown) {
      const waitTime = cooldown - elapsedSeconds;
      const error = new Error(`Please wait ${waitTime} seconds before requesting a new OTP.`);
      error.statusCode = 429;
      throw error;
    }
  }

  /**
   * Generate, hash, and persist a new OTP for a user.
   * Invalidate previous pending OTPs of this type first to prevent stale OTP usage.
   *
   * @returns {Promise<{ plainOtp: string, expiresAt: Date }>}
   */
  async createAndSaveOtp({ userId, verificationType, connection = null }) {
    // Invalidate existing pending OTPs
    await OtpModel.invalidatePending(userId, verificationType, connection);

    const plainOtp = generateSecureOtp(env.OTP.length);
    const otpHash = hashOtp(plainOtp);
    const expiresAt = new Date(Date.now() + env.OTP.expiryMinutes * 60 * 1000);

    await OtpModel.create(
      {
        userId,
        verificationType,
        otpHash,
        expiresAt
      },
      connection
    );

    return {
      plainOtp,
      expiresAt
    };
  }

  /**
   * Verify a submitted OTP against the latest pending OTP record.
   * Enforces attempt limits, expiration, single-use, and timing-safe comparison.
   */
  async verifyOtp({ userId, verificationType, plainOtp, connection = null }) {
    const pendingRecord = await OtpModel.getLatestPending(userId, verificationType, connection);

    if (!pendingRecord) {
      const error = new Error('No active verification code found. Please request a new OTP.');
      error.statusCode = 400;
      throw error;
    }

    // 1. Check attempt limit
    if (pendingRecord.attempts >= env.OTP.maxAttempts) {
      const error = new Error('Maximum verification attempts exceeded. Please request a new OTP.');
      error.statusCode = 400;
      throw error;
    }

    // 2. Check expiration
    const expiryTime = new Date(pendingRecord.expires_at).getTime();
    if (Date.now() > expiryTime) {
      const error = new Error('Verification code has expired. Please request a new OTP.');
      error.statusCode = 400;
      throw error;
    }

    // 3. Timing-safe comparison
    const isMatch = verifyOtpHash(plainOtp, pendingRecord.otp_hash);

    if (!isMatch) {
      await OtpModel.incrementAttempts(pendingRecord.otp_id, connection);
      const remaining = env.OTP.maxAttempts - (pendingRecord.attempts + 1);

      const error = new Error(
        remaining > 0
          ? `Invalid verification code. ${remaining} attempt${remaining === 1 ? '' : 's'} remaining.`
          : 'Invalid verification code. Maximum attempts reached. Please request a new code.'
      );
      error.statusCode = 400;
      throw error;
    }

    // 4. Mark as verified atomically (concurrency guard)
    const marked = await OtpModel.markVerified(pendingRecord.otp_id, connection);
    if (!marked) {
      const error = new Error('Verification code has already been used.');
      error.statusCode = 400;
      throw error;
    }

    return true;
  }
}

export const otpService = new OtpService();
export default otpService;
