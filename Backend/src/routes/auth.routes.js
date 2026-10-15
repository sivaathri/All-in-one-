import { Router } from 'express';
import { authController } from '../controllers/auth.controller.js';
import { asyncHandler } from '../utils/async-handler.js';
import { authenticate } from '../middleware/auth.middleware.js';
import {
  otpRequestLimiter,
  otpVerificationLimiter
} from '../middleware/rate-limit.middleware.js';
import {
  validateSignup,
  validateVerifyEmailOtp,
  validateVerifyMobileOtp,
  validateRequestSignInOtp,
  validateVerifySignInOtp,
  validateResendOtp
} from '../validators/auth.validator.js';

const router = Router();

/**
 * @route   POST /api/auth/signup
 * @desc    Register a new user and generate email & mobile OTPs
 * @access  Public
 */
router.post(
  '/signup',
  otpRequestLimiter,
  validateSignup,
  asyncHandler((req, res) => authController.signup(req, res))
);

/**
 * @route   POST /api/auth/verify-email-otp
 * @desc    Verify email verification code
 * @access  Public
 */
router.post(
  '/verify-email-otp',
  otpVerificationLimiter,
  validateVerifyEmailOtp,
  asyncHandler((req, res) => authController.verifyEmailOtp(req, res))
);

/**
 * @route   POST /api/auth/verify-mobile-otp
 * @desc    Verify mobile verification code
 * @access  Public
 */
router.post(
  '/verify-mobile-otp',
  otpVerificationLimiter,
  validateVerifyMobileOtp,
  asyncHandler((req, res) => authController.verifyMobileOtp(req, res))
);

/**
 * @route   POST /api/auth/signin/request-otp
 * @desc    Request sign-in OTP for an active account
 * @access  Public
 */
router.post(
  '/signin/request-otp',
  otpRequestLimiter,
  validateRequestSignInOtp,
  asyncHandler((req, res) => authController.requestSignInOtp(req, res))
);

/**
 * @route   POST /api/auth/signin/verify-otp
 * @desc    Verify sign-in OTP and obtain access token
 * @access  Public
 */
router.post(
  '/signin/verify-otp',
  otpVerificationLimiter,
  validateVerifySignInOtp,
  asyncHandler((req, res) => authController.verifySignInOtp(req, res))
);

/**
 * @route   POST /api/auth/resend-otp
 * @desc    Resend verification OTP (rate limited & cooldown enforced)
 * @access  Public
 */
router.post(
  '/resend-otp',
  otpRequestLimiter,
  validateResendOtp,
  asyncHandler((req, res) => authController.resendOtp(req, res))
);

/**
 * @route   GET /api/auth/me
 * @desc    Get currently authenticated user's profile
 * @access  Private (Bearer JWT)
 */
router.get(
  '/me',
  authenticate,
  asyncHandler((req, res) => authController.getMe(req, res))
);

/**
 * @route   POST /api/auth/signout
 * @desc    Sign out and terminate active session
 * @access  Private (Bearer JWT)
 */
router.post(
  '/signout',
  authenticate,
  asyncHandler((req, res) => authController.signout(req, res))
);

export default router;
