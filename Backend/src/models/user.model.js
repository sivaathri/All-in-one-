import { getPool, query } from '../config/database.js';

/**
 * User Model
 * Manages database persistence and queries for the 'users' table.
 */
export class UserModel {
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
   * Find user by primary key (user_id).
   * @param {number} userId
   * @param {object} [connection]
   * @returns {Promise<object|null>}
   */
  static async findById(userId, connection = null) {
    const sql = `
      SELECT user_id, full_name, email, mobile_number, email_verified, mobile_verified,
             account_status, created_at, updated_at
      FROM users
      WHERE user_id = ?
      LIMIT 1
    `;
    const rows = await this._execute(sql, [userId], connection);
    return rows[0] || null;
  }

  /**
   * Find user by email address (case-insensitive).
   * @param {string} email
   * @param {object} [connection]
   * @returns {Promise<object|null>}
   */
  static async findByEmail(email, connection = null) {
    const sql = `
      SELECT user_id, full_name, email, mobile_number, email_verified, mobile_verified,
             account_status, created_at, updated_at
      FROM users
      WHERE LOWER(email) = LOWER(?)
      LIMIT 1
    `;
    const rows = await this._execute(sql, [email], connection);
    return rows[0] || null;
  }

  /**
   * Find user by mobile number.
   * @param {string} mobileNumber
   * @param {object} [connection]
   * @returns {Promise<object|null>}
   */
  static async findByMobile(mobileNumber, connection = null) {
    const sql = `
      SELECT user_id, full_name, email, mobile_number, email_verified, mobile_verified,
             account_status, created_at, updated_at
      FROM users
      WHERE mobile_number = ?
      LIMIT 1
    `;
    const rows = await this._execute(sql, [mobileNumber], connection);
    return rows[0] || null;
  }

  /**
   * Find user by either email or mobile number.
   * @param {string} identifier
   * @param {object} [connection]
   * @returns {Promise<object|null>}
   */
  static async findByIdentifier(identifier, connection = null) {
    const sql = `
      SELECT user_id, full_name, email, mobile_number, email_verified, mobile_verified,
             account_status, created_at, updated_at
      FROM users
      WHERE LOWER(email) = LOWER(?) OR mobile_number = ?
      LIMIT 1
    `;
    const rows = await this._execute(sql, [identifier, identifier], connection);
    return rows[0] || null;
  }

  /**
   * Check if any account exists matching either the specified email OR mobile number.
   * @param {string} email
   * @param {string} mobileNumber
   * @param {object} [connection]
   * @returns {Promise<object|null>}
   */
  static async findExistingUser(email, mobileNumber, connection = null) {
    const sql = `
      SELECT user_id, email, mobile_number, account_status, email_verified, mobile_verified
      FROM users
      WHERE LOWER(email) = LOWER(?) OR mobile_number = ?
      LIMIT 1
    `;
    const rows = await this._execute(sql, [email, mobileNumber], connection);
    return rows[0] || null;
  }

  /**
   * Create and insert a new user.
   * @param {object} params
   * @param {string} params.fullName
   * @param {string} params.email
   * @param {string} params.mobileNumber
   * @param {string} [params.accountStatus='pending']
   * @param {object} [connection]
   * @returns {Promise<number>} New user_id
   */
  static async create({ fullName, email, mobileNumber, accountStatus = 'pending' }, connection = null) {
    const sql = `
      INSERT INTO users (full_name, email, mobile_number, account_status, email_verified, mobile_verified)
      VALUES (?, LOWER(?), ?, ?, FALSE, FALSE)
    `;
    const result = await this._execute(sql, [fullName, email, mobileNumber, accountStatus], connection);
    return result.insertId;
  }

  /**
   * Mark user's email as verified and optionally update account status.
   * @param {number} userId
   * @param {string|null} [accountStatus]
   * @param {object} [connection]
   * @returns {Promise<boolean>}
   */
  static async setEmailVerified(userId, accountStatus = null, connection = null) {
    let sql;
    let params;

    if (accountStatus) {
      sql = `UPDATE users SET email_verified = TRUE, account_status = ? WHERE user_id = ?`;
      params = [accountStatus, userId];
    } else {
      sql = `UPDATE users SET email_verified = TRUE WHERE user_id = ?`;
      params = [userId];
    }

    const result = await this._execute(sql, params, connection);
    return result.affectedRows > 0;
  }

  /**
   * Mark user's mobile number as verified and optionally update account status.
   * @param {number} userId
   * @param {string|null} [accountStatus]
   * @param {object} [connection]
   * @returns {Promise<boolean>}
   */
  static async setMobileVerified(userId, accountStatus = null, connection = null) {
    let sql;
    let params;

    if (accountStatus) {
      sql = `UPDATE users SET mobile_verified = TRUE, account_status = ? WHERE user_id = ?`;
      params = [accountStatus, userId];
    } else {
      sql = `UPDATE users SET mobile_verified = TRUE WHERE user_id = ?`;
      params = [userId];
    }

    const result = await this._execute(sql, params, connection);
    return result.affectedRows > 0;
  }

  /**
   * Update user's account status ('pending' | 'active' | 'suspended').
   * @param {number} userId
   * @param {string} status
   * @param {object} [connection]
   * @returns {Promise<boolean>}
   */
  static async updateAccountStatus(userId, status, connection = null) {
    const sql = `UPDATE users SET account_status = ? WHERE user_id = ?`;
    const result = await this._execute(sql, [status, userId], connection);
    return result.affectedRows > 0;
  }
}

export default UserModel;
