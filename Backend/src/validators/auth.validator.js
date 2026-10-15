import { body, validationResult } from 'express-validator';
import { sendError } from '../utils/response.js';

/**
 * Middleware that checks validation results and terminates with standardized error if invalid.
 */
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((err) => ({
      field: err.path || err.param,
      message: err.msg
    }));

    return sendError(
      res,
      'Validation failed. Please correct the highlighted errors.',
      formattedErrors,
      422
    );
  }
  next();
};

/**
 * Validator for POST /api/auth/signup
 */
export const validateSignup = [
  body('fullName')
    .trim()
    .notEmpty()
    .withMessage('Full name is required.')
    .isLength({ min: 2, max: 150 })
    .withMessage('Full name must be between 2 and 150 characters.')
    .matches(/^[a-zA-Z\s.'-]+$/)
    .withMessage('Full name contains invalid characters.'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email address is required.')
    .isEmail()
    .withMessage('Please provide a valid email address.')
    .isLength({ max: 254 })
    .withMessage('Email address is too long.')
    .normalizeEmail(),

  body('mobileNumber')
    .trim()
    .notEmpty()
    .withMessage('Mobile number is required.')
    .matches(/^\+?[1-9]\d{7,14}$/)
    .withMessage('Please provide a valid international mobile number (e.g. +919876543210).'),

  handleValidationErrors
];

/**
 * Validator for POST /api/auth/verify-email-otp
 */
export const validateVerifyEmailOtp = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required.')
    .isEmail()
    .withMessage('Please provide a valid email address.')
    .normalizeEmail(),

  body('otp')
    .trim()
    .notEmpty()
    .withMessage('Verification code is required.')
    .isLength({ min: 6, max: 6 })
    .withMessage('Verification code must be exactly 6 digits.')
    .isNumeric()
    .withMessage('Verification code must contain only numbers.'),

  handleValidationErrors
];

/**
 * Validator for POST /api/auth/verify-mobile-otp
 */
export const validateVerifyMobileOtp = [
  body('mobileNumber')
    .trim()
    .notEmpty()
    .withMessage('Mobile number is required.')
    .matches(/^\+?[1-9]\d{7,14}$/)
    .withMessage('Please provide a valid mobile number.'),

  body('otp')
    .trim()
    .notEmpty()
    .withMessage('Verification code is required.')
    .isLength({ min: 6, max: 6 })
    .withMessage('Verification code must be exactly 6 digits.')
    .isNumeric()
    .withMessage('Verification code must contain only numbers.'),

  handleValidationErrors
];

/**
 * Validator for POST /api/auth/signin/request-otp
 */
export const validateRequestSignInOtp = [
  body('identifier')
    .trim()
    .notEmpty()
    .withMessage('Registered email or mobile number is required.'),

  handleValidationErrors
];

/**
 * Validator for POST /api/auth/signin/verify-otp
 */
export const validateVerifySignInOtp = [
  body('identifier')
    .trim()
    .notEmpty()
    .withMessage('Registered email or mobile number is required.'),

  body('otp')
    .trim()
    .notEmpty()
    .withMessage('Verification code is required.')
    .isLength({ min: 6, max: 6 })
    .withMessage('Verification code must be exactly 6 digits.')
    .isNumeric()
    .withMessage('Verification code must contain only numbers.'),

  handleValidationErrors
];

/**
 * Validator for POST /api/auth/resend-otp
 */
export const validateResendOtp = [
  body('identifier')
    .trim()
    .notEmpty()
    .withMessage('Email or mobile number is required.'),

  body('type')
    .optional()
    .trim()
    .toLowerCase()
    .isIn(['email', 'mobile'])
    .withMessage("Type must be either 'email' or 'mobile'."),

  handleValidationErrors
];

export default {
  handleValidationErrors,
  validateSignup,
  validateVerifyEmailOtp,
  validateVerifyMobileOtp,
  validateRequestSignInOtp,
  validateVerifySignInOtp,
  validateResendOtp
};
