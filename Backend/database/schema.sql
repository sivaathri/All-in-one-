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
