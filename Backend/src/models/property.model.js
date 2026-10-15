import { getPool, query } from '../config/database.js';

/**
 * Property Model
 * Manages database persistence and queries for the 'properties' table.
 */
export class PropertyModel {
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
   * Automatically ensure table existence and schema alignment.
   */
  static async initTable() {
    try {
      // 1. Ensure 'role' column in users table
      try {
        await query(`
          ALTER TABLE users 
          ADD COLUMN role ENUM('user', 'host', 'admin', 'super_admin') NOT NULL DEFAULT 'user'
          AFTER account_status
        `);
      } catch (err) {
        // Column already exists or error code ER_DUP_FIELDNAME (1060)
      }

      // 2. Ensure 'properties' table exists
      const createTableSql = `
        CREATE TABLE IF NOT EXISTS properties (
          property_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
          host_id BIGINT UNSIGNED NOT NULL,
          
          -- Step 1: Basic Information
          property_name VARCHAR(255) NOT NULL,
          property_type VARCHAR(100) NOT NULL DEFAULT 'Hotel',
          
          -- Step 2: Location Details
          address_line_1 VARCHAR(255) NOT NULL,
          address_line_2 VARCHAR(255) NULL,
          city VARCHAR(100) NOT NULL,
          state VARCHAR(100) NOT NULL,
          zip_code VARCHAR(20) NOT NULL,
          latitude DECIMAL(10, 7) NULL DEFAULT 11.941600,
          longitude DECIMAL(10, 7) NULL DEFAULT 79.808300,
          
          -- Step 3: Room Setup
          room_types JSON NOT NULL,
          room_configs JSON NOT NULL,
          total_rooms INT UNSIGNED NOT NULL DEFAULT 1,
          
          -- Step 4: Pricing & Availability
          room_prices JSON NOT NULL,
          occupancy_adjustments JSON NULL,
          child_pricing JSON NULL,
          instant_payment BOOLEAN NOT NULL DEFAULT TRUE,
          free_cancellation BOOLEAN NOT NULL DEFAULT TRUE,
          refund_policies JSON NULL,
          room_capacities JSON NULL,
          
          -- Step 5: Property Rules & Policies
          check_in_time VARCHAR(10) DEFAULT '14:00',
          check_out_time VARCHAR(10) DEFAULT '11:00',
          min_age INT DEFAULT 18,
          accepted_ids JSON NULL,
          unmarried_couples_allowed VARCHAR(10) DEFAULT 'No',
          male_only_groups_allowed VARCHAR(10) DEFAULT 'No',
          scanty_baggage_allowed VARCHAR(10) DEFAULT 'No',
          smoking_allowed VARCHAR(10) DEFAULT 'No',
          alcohol_allowed VARCHAR(10) DEFAULT 'No',
          non_veg_allowed VARCHAR(10) DEFAULT 'No',
          outside_food_allowed VARCHAR(10) DEFAULT 'No',
          food_delivery_options JSON NULL,
          wheelchair_accessible VARCHAR(10) DEFAULT 'No',
          wheelchair_provided VARCHAR(10) DEFAULT 'No',
          pets_allowed VARCHAR(10) DEFAULT 'No',
          pets_on_property VARCHAR(10) DEFAULT 'No',
          extra_mattress_child DECIMAL(10, 2) DEFAULT 0,
          extra_mattress_adult DECIMAL(10, 2) DEFAULT 0,
          extra_cot_cost DECIMAL(10, 2) DEFAULT 0,
          additional_rules TEXT NULL,
          
          -- Step 6: Facilities & Amenities
          amenities JSON NOT NULL,
          
          -- Step 7: Photos
          photos JSON NOT NULL,
          cover_photo VARCHAR(500) NULL,
          
          -- Step 8: About this property
          about_property_text TEXT NULL,
          distance_beach DECIMAL(6, 2) DEFAULT 0,
          distance_railway DECIMAL(6, 2) DEFAULT 0,
          distance_airport DECIMAL(6, 2) DEFAULT 0,
          distance_bus DECIMAL(6, 2) DEFAULT 0,
          allowed_guest_types JSON NULL,
          instant_booking VARCHAR(10) DEFAULT 'No',
          manual_approval VARCHAR(10) DEFAULT 'Yes',
          
          -- Step 9: Legal Info
          gstin VARCHAR(50) NULL,
          license_number VARCHAR(100) NULL,
          business_name VARCHAR(255) NULL,
          pan_number VARCHAR(50) NULL,
          trade_license VARCHAR(100) NULL,
          fire_safety_number VARCHAR(100) NULL,
          owner_name VARCHAR(150) NULL,
          owner_aadhar VARCHAR(50) NULL,
          owner_photo VARCHAR(500) NULL,
          ownership_proof VARCHAR(500) NULL,
          bank_account_name VARCHAR(150) NULL,
          bank_account_number VARCHAR(50) NULL,
          ifsc_code VARCHAR(50) NULL,
          cancelled_cheque VARCHAR(500) NULL,
          is_legal_declared BOOLEAN NOT NULL DEFAULT TRUE,
          
          -- Listing Status & Approval Tracking
          status ENUM('waiting_for_approval', 'approved', 'rejected') NOT NULL DEFAULT 'waiting_for_approval',
          rejection_reason TEXT NULL,
          approved_by BIGINT UNSIGNED NULL,
          approved_at DATETIME NULL,
          
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          
          PRIMARY KEY (property_id),
          KEY idx_properties_host (host_id),
          KEY idx_properties_status (status),
          KEY idx_properties_type (property_type),
          KEY idx_properties_city (city),
          CONSTRAINT fk_properties_host
            FOREIGN KEY (host_id)
            REFERENCES users (user_id)
            ON DELETE CASCADE
            ON UPDATE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
      `;

      await query(createTableSql);
      console.log('[DATABASE] Table "properties" is verified and ready.');

      // 3. Ensure 'property_drafts' table exists for cross-device resume
      const createDraftsTableSql = `
        CREATE TABLE IF NOT EXISTS property_drafts (
          draft_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
          user_id BIGINT UNSIGNED NOT NULL,
          current_step INT UNSIGNED NOT NULL DEFAULT 1,
          property_name VARCHAR(255) NULL,
          draft_data JSON NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          PRIMARY KEY (draft_id),
          UNIQUE KEY uq_user_draft (user_id),
          CONSTRAINT fk_property_drafts_user
            FOREIGN KEY (user_id)
            REFERENCES users (user_id)
            ON DELETE CASCADE
            ON UPDATE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
      `;
      await query(createDraftsTableSql);
      console.log('[DATABASE] Table "property_drafts" is verified and ready.');
    } catch (err) {
      console.warn('[DATABASE] Table initialization notice:', err.message);
    }
  }

  /**
   * Helper to parse JSON fields safely.
   */
  static _parseJsonFields(row) {
    if (!row) return null;
    const jsonFields = [
      'room_types', 'room_configs', 'room_prices', 'occupancy_adjustments',
      'child_pricing', 'refund_policies', 'room_capacities', 'accepted_ids',
      'food_delivery_options', 'amenities', 'photos', 'allowed_guest_types'
    ];
    const parsed = { ...row };
    for (const field of jsonFields) {
      if (parsed[field] !== undefined && parsed[field] !== null) {
        if (typeof parsed[field] === 'string') {
          try {
            parsed[field] = JSON.parse(parsed[field]);
          } catch (e) {
            // keep as-is if parsing fails
          }
        }
      }
    }
    return parsed;
  }

  /**
   * Create a new property listing with 'waiting_for_approval' status.
   */
  static async create(data, connection = null) {
    const sql = `
      INSERT INTO properties (
        host_id,
        property_name, property_type,
        address_line_1, address_line_2, city, state, zip_code, latitude, longitude,
        room_types, room_configs, total_rooms,
        room_prices, occupancy_adjustments, child_pricing, instant_payment, free_cancellation, refund_policies, room_capacities,
        check_in_time, check_out_time, min_age, accepted_ids, unmarried_couples_allowed, male_only_groups_allowed,
        scanty_baggage_allowed, smoking_allowed, alcohol_allowed, non_veg_allowed, outside_food_allowed, food_delivery_options,
        wheelchair_accessible, wheelchair_provided, pets_allowed, pets_on_property, extra_mattress_child, extra_mattress_adult,
        extra_cot_cost, additional_rules,
        amenities,
        photos, cover_photo,
        about_property_text, distance_beach, distance_railway, distance_airport, distance_bus, allowed_guest_types,
        instant_booking, manual_approval,
        gstin, license_number, business_name, pan_number, trade_license, fire_safety_number, owner_name, owner_aadhar,
        owner_photo, ownership_proof, bank_account_name, bank_account_number, ifsc_code, cancelled_cheque, is_legal_declared,
        status
      ) VALUES (
        ?,
        ?, ?,
        ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?,
        ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?,
        ?, ?,
        ?,
        ?, ?,
        ?, ?, ?, ?, ?, ?,
        ?, ?,
        ?, ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?, ?,
        'waiting_for_approval'
      )
    `;

    const serialize = (val, fallback = '[]') => {
      if (val === undefined || val === null) return fallback;
      return typeof val === 'string' ? val : JSON.stringify(val);
    };

    const params = [
      data.hostId,
      data.propertyName,
      data.propertyType || 'Hotel',
      data.addressLine1,
      data.addressLine2 || null,
      data.city,
      data.state,
      data.zipCode,
      data.latitude || 11.941600,
      data.longitude || 79.808300,
      serialize(data.roomTypes, '[]'),
      serialize(data.roomConfigs, '{}'),
      parseInt(data.totalRooms, 10) || 1,
      serialize(data.roomPrices, '{}'),
      serialize(data.occupancyAdjustments, '[]'),
      serialize(data.childPricing, '[]'),
      data.instantPayment !== false,
      data.freeCancellation !== false,
      serialize(data.refundPolicies, '[]'),
      serialize(data.roomCapacities, '{}'),
      data.checkInTime || '14:00',
      data.checkOutTime || '11:00',
      parseInt(data.minAge, 10) || 18,
      serialize(data.acceptedIds, '["Aadhar", "Govt ID"]'),
      data.unmarriedCouplesAllowed || 'No',
      data.maleOnlyGroupsAllowed || 'No',
      data.scantyBaggageAllowed || 'No',
      data.smokingAllowed || 'No',
      data.alcoholAllowed || 'No',
      data.nonVegAllowed || 'No',
      data.outsideFoodAllowed || 'No',
      serialize(data.foodDeliveryOptions, '[]'),
      data.wheelchairAccessible || 'No',
      data.wheelchairProvided || 'No',
      data.petsAllowed || 'No',
      data.petsOnProperty || 'No',
      parseFloat(data.extraMattressChild) || 0,
      parseFloat(data.extraMattressAdult) || 0,
      parseFloat(data.extraCotCost) || 0,
      data.additionalRules || null,
      serialize(data.amenities, '[]'),
      serialize(data.photos, '[]'),
      data.coverPhoto || null,
      data.aboutPropertyText || null,
      parseFloat(data.distanceBeach) || 0,
      parseFloat(data.distanceRailway) || 0,
      parseFloat(data.distanceAirport) || 0,
      parseFloat(data.distanceBus) || 0,
      serialize(data.allowedGuestTypes, '[]'),
      data.instantBooking || 'No',
      data.manualApproval || 'Yes',
      data.gstin || null,
      data.licenseNumber || null,
      data.businessName || null,
      data.panNumber || null,
      data.tradeLicense || null,
      data.fireSafetyNumber || null,
      data.ownerName || null,
      data.ownerAadhar || null,
      data.ownerPhoto || null,
      data.ownershipProof || null,
      data.bankAccountName || null,
      data.bankAccountNumber || null,
      data.ifscCode || null,
      data.cancelledCheque || null,
      data.isLegalDeclared !== false
    ];

    const result = await this._execute(sql, params, connection);
    const newPropertyId = result.insertId;

    // Upgrade host's role to 'host' if currently 'user'
    try {
      await this._execute(
        `UPDATE users SET role = 'host' WHERE user_id = ? AND role = 'user'`,
        [data.hostId],
        connection
      );
    } catch (e) {
      // ignore if role column update has issue
    }

    return this.findById(newPropertyId, connection);
  }

  /**
   * Find property by ID, joining host details.
   */
  static async findById(propertyId, connection = null) {
    const sql = `
      SELECT p.*, u.full_name as host_name, u.email as host_email, u.mobile_number as host_mobile
      FROM properties p
      LEFT JOIN users u ON p.host_id = u.user_id
      WHERE p.property_id = ?
      LIMIT 1
    `;
    const rows = await this._execute(sql, [propertyId], connection);
    if (!rows || rows.length === 0) return null;
    return this._parseJsonFields(rows[0]);
  }

  /**
   * Retrieve all properties created by a specific host.
   */
  static async findByHostId(hostId, connection = null) {
    const sql = `
      SELECT property_id, host_id, property_name, property_type, city, state,
             status, rejection_reason, cover_photo, total_rooms, created_at, updated_at
      FROM properties
      WHERE host_id = ?
      ORDER BY created_at DESC
    `;
    const rows = await this._execute(sql, [hostId], connection);
    return rows.map(r => this._parseJsonFields(r));
  }

  /**
   * Public endpoint: retrieve ONLY approved listings.
   */
  static async findApproved(filters = {}, connection = null) {
    let sql = `
      SELECT property_id, host_id, property_name, property_type, address_line_1, city, state, zip_code,
             latitude, longitude, room_types, room_prices, amenities, photos, cover_photo,
             about_property_text, status, created_at
      FROM properties
      WHERE status = 'approved'
    `;
    const params = [];

    if (filters.city) {
      sql += ` AND LOWER(city) = LOWER(?)`;
      params.push(filters.city);
    }
    if (filters.propertyType) {
      sql += ` AND LOWER(property_type) = LOWER(?)`;
      params.push(filters.propertyType);
    }

    sql += ` ORDER BY created_at DESC`;
    const rows = await this._execute(sql, params, connection);
    return rows.map(r => this._parseJsonFields(r));
  }

  /**
   * Admin / Super Admin endpoint: retrieve all properties across any status.
   */
  static async findAllForAdmin(status = null, connection = null) {
    let sql = `
      SELECT p.*, u.full_name as host_name, u.email as host_email, u.mobile_number as host_mobile
      FROM properties p
      LEFT JOIN users u ON p.host_id = u.user_id
    `;
    const params = [];
    if (status) {
      sql += ` WHERE p.status = ?`;
      params.push(status);
    }
    sql += ` ORDER BY p.created_at DESC`;
    const rows = await this._execute(sql, params, connection);
    return rows.map(r => this._parseJsonFields(r));
  }

  /**
   * Super Admin action: Approve or Reject a listing.
   */
  static async updateStatus(propertyId, status, adminUserId, rejectionReason = null, connection = null) {
    const sql = `
      UPDATE properties
      SET status = ?,
          approved_by = ?,
          approved_at = NOW(),
          rejection_reason = ?
      WHERE property_id = ?
    `;
    await this._execute(sql, [status, adminUserId, rejectionReason, propertyId], connection);
    return this.findById(propertyId, connection);
  }

  /**
   * Upsert an active listing draft for cross-device resume.
   */
  static async saveDraft(userId, currentStep, propertyName, draftData, connection = null) {
    const sql = `
      INSERT INTO property_drafts (user_id, current_step, property_name, draft_data)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        current_step = VALUES(current_step),
        property_name = VALUES(property_name),
        draft_data = VALUES(draft_data),
        updated_at = CURRENT_TIMESTAMP
    `;
    const serialized = typeof draftData === 'string' ? draftData : JSON.stringify(draftData);
    await this._execute(sql, [userId, currentStep, propertyName || 'My Stay Property', serialized], connection);
    return this.getDraft(userId, connection);
  }

  /**
   * Retrieve active listing draft for a user.
   */
  static async getDraft(userId, connection = null) {
    const sql = `
      SELECT draft_id, user_id, current_step, property_name, draft_data, created_at, updated_at
      FROM property_drafts
      WHERE user_id = ?
      LIMIT 1
    `;
    const rows = await this._execute(sql, [userId], connection);
    if (!rows || rows.length === 0) return null;
    const row = rows[0];
    if (row.draft_data && typeof row.draft_data === 'string') {
      try {
        row.draft_data = JSON.parse(row.draft_data);
      } catch (e) {
        // keep as is
      }
    }
    return row;
  }

  /**
   * Discard or delete an active listing draft.
   */
  static async deleteDraft(userId, connection = null) {
    const sql = `DELETE FROM property_drafts WHERE user_id = ?`;
    return this._execute(sql, [userId], connection);
  }
}

export default PropertyModel;
