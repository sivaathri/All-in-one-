-- =============================================================================
-- TripVerse Database Schema
-- Database: tripverse_db
-- Phase: Authentication Module 1
-- Description: Core tables for user registration, OTP verification, and sign-in.
-- =============================================================================

-- Ensure database exists with UTF-8 support
CREATE DATABASE IF NOT EXISTS `tripverse_db`
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE `tripverse_db`;

-- -----------------------------------------------------------------------------
-- 1. Table: users
-- Stores user profile and contact verification status.
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
    `user_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `full_name` VARCHAR(150) NOT NULL,
    `email` VARCHAR(254) NOT NULL,
    `mobile_number` VARCHAR(20) NOT NULL,
    `email_verified` BOOLEAN NOT NULL DEFAULT FALSE,
    `mobile_verified` BOOLEAN NOT NULL DEFAULT FALSE,
    `account_status` ENUM('pending', 'active', 'suspended') NOT NULL DEFAULT 'pending',
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`user_id`),
    UNIQUE KEY `uq_users_email` (`email`),
    UNIQUE KEY `uq_users_mobile` (`mobile_number`),
    KEY `idx_users_account_status` (`account_status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 2. Table: signup_otps
-- Stores cryptographically hashed OTPs for email and mobile verifications/sign-in.
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `signup_otps` (
    `otp_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `verification_type` ENUM('email', 'mobile') NOT NULL,
    `otp_hash` VARCHAR(255) NOT NULL,
    `expires_at` DATETIME NOT NULL,
    `verified_at` DATETIME NULL DEFAULT NULL,
    `attempts` INT UNSIGNED NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`otp_id`),
    KEY `idx_signup_otps_lookup` (`user_id`, `verification_type`, `verified_at`),
    KEY `idx_signup_otps_expires` (`expires_at`),
    CONSTRAINT `fk_signup_otps_user`
        FOREIGN KEY (`user_id`)
        REFERENCES `users` (`user_id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 3. Table: properties
-- Stores complete 9-step stay property listings created by hosts.
-- Moderation: Starts as 'waiting_for_approval'; only shown publicly when 'approved'.
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `properties` (
    `property_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `host_id` BIGINT UNSIGNED NOT NULL,
    
    -- Step 1: Basic Information
    `property_name` VARCHAR(255) NOT NULL,
    `property_type` VARCHAR(100) NOT NULL DEFAULT 'Hotel',
    
    -- Step 2: Location Details
    `address_line_1` VARCHAR(255) NOT NULL,
    `address_line_2` VARCHAR(255) NULL,
    `city` VARCHAR(100) NOT NULL,
    `state` VARCHAR(100) NOT NULL,
    `zip_code` VARCHAR(20) NOT NULL,
    `latitude` DECIMAL(10, 7) NULL DEFAULT 11.941600,
    `longitude` DECIMAL(10, 7) NULL DEFAULT 79.808300,
    
    -- Step 3: Room Setup
    `room_types` JSON NOT NULL,
    `room_configs` JSON NOT NULL,
    `total_rooms` INT UNSIGNED NOT NULL DEFAULT 1,
    
    -- Step 4: Pricing & Availability
    `room_prices` JSON NOT NULL,
    `occupancy_adjustments` JSON NULL,
    `child_pricing` JSON NULL,
    `instant_payment` BOOLEAN NOT NULL DEFAULT TRUE,
    `free_cancellation` BOOLEAN NOT NULL DEFAULT TRUE,
    `refund_policies` JSON NULL,
    `room_capacities` JSON NULL,
    
    -- Step 5: Property Rules & Policies
    `check_in_time` VARCHAR(10) DEFAULT '14:00',
    `check_out_time` VARCHAR(10) DEFAULT '11:00',
    `min_age` INT DEFAULT 18,
    `accepted_ids` JSON NULL,
    `unmarried_couples_allowed` VARCHAR(10) DEFAULT 'No',
    `male_only_groups_allowed` VARCHAR(10) DEFAULT 'No',
    `scanty_baggage_allowed` VARCHAR(10) DEFAULT 'No',
    `smoking_allowed` VARCHAR(10) DEFAULT 'No',
    `alcohol_allowed` VARCHAR(10) DEFAULT 'No',
    `non_veg_allowed` VARCHAR(10) DEFAULT 'No',
    `outside_food_allowed` VARCHAR(10) DEFAULT 'No',
    `food_delivery_options` JSON NULL,
    `wheelchair_accessible` VARCHAR(10) DEFAULT 'No',
    `wheelchair_provided` VARCHAR(10) DEFAULT 'No',
    `pets_allowed` VARCHAR(10) DEFAULT 'No',
    `pets_on_property` VARCHAR(10) DEFAULT 'No',
    `extra_mattress_child` DECIMAL(10, 2) DEFAULT 0,
    `extra_mattress_adult` DECIMAL(10, 2) DEFAULT 0,
    `extra_cot_cost` DECIMAL(10, 2) DEFAULT 0,
    `additional_rules` TEXT NULL,
    
    -- Step 6: Facilities & Amenities
    `amenities` JSON NOT NULL,
    
    -- Step 7: Photos
    `photos` JSON NOT NULL,
    `cover_photo` VARCHAR(500) NULL,
    
    -- Step 8: About this property
    `about_property_text` TEXT NULL,
    `distance_beach` DECIMAL(6, 2) DEFAULT 0,
    `distance_railway` DECIMAL(6, 2) DEFAULT 0,
    `distance_airport` DECIMAL(6, 2) DEFAULT 0,
    `distance_bus` DECIMAL(6, 2) DEFAULT 0,
    `allowed_guest_types` JSON NULL,
    `instant_booking` VARCHAR(10) DEFAULT 'No',
    `manual_approval` VARCHAR(10) DEFAULT 'Yes',
    
    -- Step 9: Legal Info
    `gstin` VARCHAR(50) NULL,
    `license_number` VARCHAR(100) NULL,
    `business_name` VARCHAR(255) NULL,
    `pan_number` VARCHAR(50) NULL,
    `trade_license` VARCHAR(100) NULL,
    `fire_safety_number` VARCHAR(100) NULL,
    `owner_name` VARCHAR(150) NULL,
    `owner_aadhar` VARCHAR(50) NULL,
    `owner_photo` VARCHAR(500) NULL,
    `ownership_proof` VARCHAR(500) NULL,
    `bank_account_name` VARCHAR(150) NULL,
    `bank_account_number` VARCHAR(50) NULL,
    `ifsc_code` VARCHAR(50) NULL,
    `cancelled_cheque` VARCHAR(500) NULL,
    `is_legal_declared` BOOLEAN NOT NULL DEFAULT TRUE,
    
    -- Listing Status & Super Admin Approval Tracking
    `status` ENUM('waiting_for_approval', 'approved', 'rejected') NOT NULL DEFAULT 'waiting_for_approval',
    `rejection_reason` TEXT NULL,
    `approved_by` BIGINT UNSIGNED NULL,
    `approved_at` DATETIME NULL,
    
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (`property_id`),
    KEY `idx_properties_host` (`host_id`),
    KEY `idx_properties_status` (`status`),
    KEY `idx_properties_type` (`property_type`),
    KEY `idx_properties_city` (`city`),
    CONSTRAINT `fk_properties_host`
        FOREIGN KEY (`host_id`)
        REFERENCES `users` (`user_id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

