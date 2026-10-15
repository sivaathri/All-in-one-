import { query } from '../config/database.js';

/**
 * OTP Model
 * Manages database persistence, verification state, and security limits for 'signup_otps' table.
 */
export class OtpModel {
  /**
   * Helper to execute SQL queries on a transaction connection or global connection pool.
   */
  static async _execute(sql, params = [], connection = null) {
    if (connection) {
      const [rows] = await connection.execute(sql, params);
      return rows;
    }
    return query(sql, params);
  }

  /**
   * Insert a new hashed OTP record.
   * @param {object} params
   * @param {number} params.userId
   * @param {'email'|'mobile'} params.verificationType
   * @param {string} params.otpHash
   * @param {Date|string} params.expiresAt
   * @param {object} [connection]
   * @returns {Promise<number>} New otp_id
   */
  static async create({ userId, verificationType, otpHash, expiresAt }, connection = null) {
    const sql = `
      INSERT INTO signup_otps (user_id, verification_type, otp_hash, expires_at, attempts)
      VALUES (?, ?, ?, ?, 0)
    `;
    const result = await this._execute(sql, [userId, verificationType, otpHash, expiresAt], connection);
    return result.insertId;
  }

  /**
   * Find the most recent pending (unverified) OTP record for a user.
   * @param {number} userId
   * @param {'email'|'mobile'} verificationType
   * @param {object} [connection]
   * @returns {Promise<object|null>}
   */
  static async getLatestPending(userId, verificationType, connection = null) {
    const sql = `
      SELECT otp_id, user_id, verification_type, otp_hash, expires_at, verified_at, attempts, created_at
      FROM signup_otps
      WHERE user_id = ? AND verification_type = ? AND verified_at IS NULL
      ORDER BY created_at DESC
      LIMIT 1
    `;
    const rows = await this._execute(sql, [userId, verificationType], connection);
    return rows[0] || null;
  }

  /**
   * Increment attempt counter for an OTP.
   * @param {number} otpId
   * @param {object} [connection]
   * @returns {Promise<boolean>}
   */
  static async incrementAttempts(otpId, connection = null) {
    const sql = `UPDATE signup_otps SET attempts = attempts + 1 WHERE otp_id = ?`;
    const result = await this._execute(sql, [otpId], connection);
    return result.affectedRows > 0;
  }

  /**
   * Mark OTP as verified atomically.
   * Row affected check prevents concurrent replay and double-verification.
   * @param {number} otpId
   * @param {object} [connection]
   * @returns {Promise<boolean>}
   */
  static async markVerified(otpId, connection = null) {
    const sql = `
      UPDATE signup_otps
      SET verified_at = CURRENT_TIMESTAMP
      WHERE otp_id = ? AND verified_at IS NULL
    `;
    const result = await this._execute(sql, [otpId], connection);
    return result.affectedRows > 0;
  }

  /**
   * Invalidate existing pending OTPs for a user and type before generating a fresh one.
   * @param {number} userId
   * @param {'email'|'mobile'} verificationType
   * @param {object} [connection]
   * @returns {Promise<number>}
   */
  static async invalidatePending(userId, verificationType, connection = null) {
    const sql = `
      UPDATE signup_otps
      SET expires_at = CURRENT_TIMESTAMP
      WHERE user_id = ? AND verification_type = ? AND verified_at IS NULL
    `;
    const result = await this._execute(sql, [userId, verificationType], connection);
    return result.affectedRows;
  }

  /**
   * Get timestamp of the most recent OTP created for a user and type (to calculate cooldowns).
   * @param {number} userId
   * @param {'email'|'mobile'} verificationType
   * @param {object} [connection]
   * @returns {Promise<Date|null>}
   */
  static async getLastCreatedAt(userId, verificationType, connection = null) {
    const sql = `
      SELECT created_at
      FROM signup_otps
      WHERE user_id = ? AND verification_type = ?
      ORDER BY created_at DESC
      LIMIT 1
    `;
    const rows = await this._execute(sql, [userId, verificationType], connection);
    return rows[0]?.created_at ? new Date(rows[0].created_at) : null;
  }
}

export default OtpModel;
