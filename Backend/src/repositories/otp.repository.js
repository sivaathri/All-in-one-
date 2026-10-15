import OtpModel from '../models/otp.model.js';

export class OtpRepository {
  async _execute(sql, params, connection = null) {
    return OtpModel._execute(sql, params, connection);
  }

  async create({ userId, verificationType, otpHash, expiresAt }, connection = null) {
    return OtpModel.create({ userId, verificationType, otpHash, expiresAt }, connection);
  }

  async getLatestPendingOtp(userId, verificationType, connection = null) {
    return OtpModel.getLatestPending(userId, verificationType, connection);
  }

  async incrementAttempts(otpId, connection = null) {
    return OtpModel.incrementAttempts(otpId, connection);
  }

  async markVerified(otpId, connection = null) {
    return OtpModel.markVerified(otpId, connection);
  }

  async invalidatePendingOtps(userId, verificationType, connection = null) {
    return OtpModel.invalidatePending(userId, verificationType, connection);
  }

  async getLastOtpCreatedAt(userId, verificationType, connection = null) {
    return OtpModel.getLastCreatedAt(userId, verificationType, connection);
  }
}

export const otpRepository = new OtpRepository();
export default otpRepository;
