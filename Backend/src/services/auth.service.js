import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { withTransaction } from '../config/database.js';
import { userRepository } from '../repositories/user.repository.js';
import { otpService } from './otp.service.js';
import { notificationService } from './notification.service.js';
import { maskIdentifier } from '../utils/otp.js';

export class AuthService {
  /**
   * Helper to format a safe user profile object for client responses.
   * Strips internal identifiers and private flags.
   */
  _formatSafeUser(user) {
    if (!user) return null;
    return {
      userId: user.user_id,
      fullName: user.full_name,
      email: user.email,
      mobileNumber: user.mobile_number,
      emailVerified: Boolean(user.email_verified),
      mobileVerified: Boolean(user.mobile_verified),
      accountStatus: user.account_status,
      createdAt: user.created_at,
      updatedAt: user.updated_at
    };
  }

  /**
   * Register a new user with pending status and dispatch separate email & mobile OTPs.
   */
  async signup({ fullName, email, mobileNumber }) {
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedMobile = mobileNumber.trim();

    // 1. Check if an account already exists with either credential
    const existingUser = await userRepository.findExistingUser(normalizedEmail, normalizedMobile);

    if (existingUser) {
      if (existingUser.account_status === 'active') {
        const error = new Error('An account with this email or mobile number already exists.');
        error.statusCode = 409;
        throw error;
      }

      // If pending user already registered with the same credentials, allow re-triggering OTPs
      if (
        existingUser.email.toLowerCase() === normalizedEmail &&
        existingUser.mobile_number === normalizedMobile &&
        existingUser.account_status === 'pending'
      ) {
        return this.resendSignupOtps(existingUser);
      }

      const error = new Error('Email or mobile number is already in use.');
      error.statusCode = 409;
      throw error;
    }

    // 2. Atomic creation of pending user & dual OTP generation in a transaction
    const { userId, emailOtp, mobileOtp } = await withTransaction(async (connection) => {
      const newUserId = await userRepository.create(
        {
          fullName: fullName.trim(),
          email: normalizedEmail,
          mobileNumber: normalizedMobile,
          accountStatus: 'pending'
        },
        connection
      );

      const generatedEmailOtp = await otpService.createAndSaveOtp({
        userId: newUserId,
        verificationType: 'email',
        connection
      });

      const generatedMobileOtp = await otpService.createAndSaveOtp({
        userId: newUserId,
        verificationType: 'mobile',
        connection
      });

      return {
        userId: newUserId,
        emailOtp: generatedEmailOtp,
        mobileOtp: generatedMobileOtp
      };
    });

    // 3. Dispatch notifications outside transaction
    try {
      await Promise.all([
        notificationService.sendEmailOtp({
          email: normalizedEmail,
          otp: emailOtp.plainOtp,
          fullName: fullName.trim(),
          purpose: 'signup'
        }),
        notificationService.sendMobileOtp({
          mobileNumber: normalizedMobile,
          otp: mobileOtp.plainOtp,
          purpose: 'signup'
        })
      ]);
    } catch (notifErr) {
      console.warn('[SIGNUP NOTICE] Notification delivery warning:', notifErr.message);
      // The pending account and OTP hashes exist in database, so user can safely use /resend-otp
    }

    return {
      verificationRequired: true,
      email: normalizedEmail,
      mobileNumber: normalizedMobile
    };
  }

  /**
   * Helper to re-issue OTPs for an existing pending signup.
   */
  async resendSignupOtps(user) {
    let emailOtp = null;
    let mobileOtp = null;

    if (!user.email_verified) {
      emailOtp = await otpService.createAndSaveOtp({
        userId: user.user_id,
        verificationType: 'email'
      });
      await notificationService.sendEmailOtp({
        email: user.email,
        otp: emailOtp.plainOtp,
        fullName: user.full_name,
        purpose: 'signup'
      });
    }

    if (!user.mobile_verified) {
      mobileOtp = await otpService.createAndSaveOtp({
        userId: user.user_id,
        verificationType: 'mobile'
      });
      await notificationService.sendMobileOtp({
        mobileNumber: user.mobile_number,
        otp: mobileOtp.plainOtp,
        purpose: 'signup'
      });
    }

    return {
      verificationRequired: true,
      email: user.email,
      mobileNumber: user.mobile_number
    };
  }

  /**
   * Verify email OTP and activate account if mobile is already verified.
   */
  async verifyEmailOtp({ email, otp }) {
    const normalizedEmail = email.trim().toLowerCase();
    const user = await userRepository.findByEmail(normalizedEmail);

    if (!user) {
      const error = new Error('Invalid email or verification code.');
      error.statusCode = 400;
      throw error;
    }

    if (user.email_verified) {
      return {
        emailVerified: true,
        mobileVerified: Boolean(user.mobile_verified),
        accountStatus: user.account_status,
        alreadyVerified: true
      };
    }

    const updatedUser = await withTransaction(async (connection) => {
      await otpService.verifyOtp({
        userId: user.user_id,
        verificationType: 'email',
        plainOtp: otp,
        connection
      });

      // Activate only if BOTH email and mobile are verified
      const willActivate = Boolean(user.mobile_verified);
      const newStatus = willActivate ? 'active' : 'pending';

      await userRepository.setEmailVerified(user.user_id, newStatus, connection);

      return {
        emailVerified: true,
        mobileVerified: Boolean(user.mobile_verified),
        accountStatus: newStatus
      };
    });

    return updatedUser;
  }

  /**
   * Verify mobile OTP and activate account if email is already verified.
   */
  async verifyMobileOtp({ mobileNumber, otp }) {
    const normalizedMobile = mobileNumber.trim();
    const user = await userRepository.findByMobile(normalizedMobile);

    if (!user) {
      const error = new Error('Invalid mobile number or verification code.');
      error.statusCode = 400;
      throw error;
    }

    if (user.mobile_verified) {
      return {
        emailVerified: Boolean(user.email_verified),
        mobileVerified: true,
        accountStatus: user.account_status,
        alreadyVerified: true
      };
    }

    const updatedUser = await withTransaction(async (connection) => {
      await otpService.verifyOtp({
        userId: user.user_id,
        verificationType: 'mobile',
        plainOtp: otp,
        connection
      });

      // Activate only if BOTH email and mobile are verified
      const willActivate = Boolean(user.email_verified);
      const newStatus = willActivate ? 'active' : 'pending';

      await userRepository.setMobileVerified(user.user_id, newStatus, connection);

      return {
        emailVerified: Boolean(user.email_verified),
        mobileVerified: true,
        accountStatus: newStatus
      };
    });

    return updatedUser;
  }

  /**
   * Request sign-in OTP for an active account via email or mobile identifier.
   */
  async requestSignInOtp({ identifier }) {
    const trimmedIdentifier = identifier.trim();
    const user = await userRepository.findByIdentifier(trimmedIdentifier);

    // Constant-time/generic response to prevent account enumeration
    const genericResponse = {
      safeResponse: true,
      message: 'If an active account exists with the provided details, a verification code has been dispatched.'
    };

    if (!user) {
      return genericResponse;
    }

    // Account status validations
    if (user.account_status === 'suspended') {
      const error = new Error('Account is suspended. Please contact support.');
      error.statusCode = 403;
      throw error;
    }

    if (user.account_status === 'pending') {
      const error = new Error('Account registration is incomplete. Please verify your contact details first.');
      error.statusCode = 403;
      throw error;
    }

    // Determine delivery type
    const isEmail = trimmedIdentifier.includes('@');
    const verificationType = isEmail ? 'email' : 'mobile';

    if (isEmail && !user.email_verified) {
      const error = new Error('Email address is not verified on this account.');
      error.statusCode = 400;
      throw error;
    }

    if (!isEmail && !user.mobile_verified) {
      const error = new Error('Mobile number is not verified on this account.');
      error.statusCode = 400;
      throw error;
    }

    // Rate-limit resends via cooldown
    await otpService.assertResendCooldown(user.user_id, verificationType);

    // Generate and persist OTP
    const otpData = await otpService.createAndSaveOtp({
      userId: user.user_id,
      verificationType
    });

    // Send notification
    if (isEmail) {
      await notificationService.sendEmailOtp({
        email: user.email,
        otp: otpData.plainOtp,
        fullName: user.full_name,
        purpose: 'signin'
      });
    } else {
      await notificationService.sendMobileOtp({
        mobileNumber: user.mobile_number,
        otp: otpData.plainOtp,
        purpose: 'signin'
      });
    }

    return {
      safeResponse: true,
      deliveryMethod: verificationType,
      maskedIdentifier: maskIdentifier(trimmedIdentifier)
    };
  }

  /**
   * Verify sign-in OTP and issue short-lived JWT access token.
   */
  async verifySignInOtp({ identifier, otp }) {
    const trimmedIdentifier = identifier.trim();
    const user = await userRepository.findByIdentifier(trimmedIdentifier);

    if (!user) {
      const error = new Error('Invalid credentials or verification code.');
      error.statusCode = 400;
      throw error;
    }

    if (user.account_status === 'suspended') {
      const error = new Error('Account is suspended. Please contact support.');
      error.statusCode = 403;
      throw error;
    }

    if (user.account_status !== 'active') {
      const error = new Error('Account is not active. Please complete initial verification.');
      error.statusCode = 403;
      throw error;
    }

    const verificationType = trimmedIdentifier.includes('@') ? 'email' : 'mobile';

    // Verify OTP atomically
    await withTransaction(async (connection) => {
      await otpService.verifyOtp({
        userId: user.user_id,
        verificationType,
        plainOtp: otp,
        connection
      });
    });

    // Issue short-lived JWT token
    const token = jwt.sign(
      {
        userId: user.user_id,
        email: user.email
      },
      env.JWT.secret,
      {
        expiresIn: env.JWT.expiresIn
      }
    );

    return {
      token,
      user: this._formatSafeUser(user)
    };
  }

  /**
   * Resend verification OTP for signup or verification.
   */
  async resendOtp({ identifier, type }) {
    const trimmedIdentifier = identifier.trim();
    const user = await userRepository.findByIdentifier(trimmedIdentifier);

    if (!user) {
      const error = new Error('No account found for the specified identifier.');
      error.statusCode = 404;
      throw error;
    }

    // Determine verification type: explicit 'email'|'mobile', or inferred from identifier
    let verificationType = type ? type.toLowerCase() : null;
    if (!verificationType) {
      verificationType = trimmedIdentifier.includes('@') ? 'email' : 'mobile';
    }

    if (verificationType !== 'email' && verificationType !== 'mobile') {
      const error = new Error("Invalid verification type. Must be 'email' or 'mobile'.");
      error.statusCode = 400;
      throw error;
    }

    // Check if already verified
    if (verificationType === 'email' && user.email_verified && user.account_status === 'active') {
      const error = new Error('Email is already verified.');
      error.statusCode = 400;
      throw error;
    }

    if (verificationType === 'mobile' && user.mobile_verified && user.account_status === 'active') {
      const error = new Error('Mobile number is already verified.');
      error.statusCode = 400;
      throw error;
    }

    // Enforce cooldown
    await otpService.assertResendCooldown(user.user_id, verificationType);

    // Generate & save new OTP
    const otpData = await otpService.createAndSaveOtp({
      userId: user.user_id,
      verificationType
    });

    // Send
    if (verificationType === 'email') {
      await notificationService.sendEmailOtp({
        email: user.email,
        otp: otpData.plainOtp,
        fullName: user.full_name,
        purpose: 'resend'
      });
    } else {
      await notificationService.sendMobileOtp({
        mobileNumber: user.mobile_number,
        otp: otpData.plainOtp,
        purpose: 'resend'
      });
    }

    return {
      deliveryMethod: verificationType,
      maskedIdentifier: maskIdentifier(verificationType === 'email' ? user.email : user.mobile_number)
    };
  }

  /**
   * Get authenticated user profile.
   */
  async getProfile(userId) {
    const user = await userRepository.findById(userId);

    if (!user) {
      const error = new Error('User not found.');
      error.statusCode = 404;
      throw error;
    }

    if (user.account_status === 'suspended') {
      const error = new Error('Account is suspended.');
      error.statusCode = 403;
      throw error;
    }

    return this._formatSafeUser(user);
  }
}

export const authService = new AuthService();
export default authService;
