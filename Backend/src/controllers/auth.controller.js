import { authService } from '../services/auth.service.js';
import { sendSuccess } from '../utils/response.js';

export class AuthController {
  /**
   * POST /api/auth/signup
   * Register a new user and dispatch dual OTPs.
   */
  async signup(req, res) {
    const { fullName, email, mobileNumber } = req.body;
    const result = await authService.signup({ fullName, email, mobileNumber });

    return sendSuccess(
      res,
      'User registered successfully. Verification required.',
      {
        verificationRequired: true,
        email: result.email,
        mobileNumber: result.mobileNumber,
        ...(result.devMobileOtp && { devMobileOtp: result.devMobileOtp }),
        ...(result.devEmailOtp && { devEmailOtp: result.devEmailOtp })
      },
      201
    );
  }

  /**
   * POST /api/auth/verify-email-otp
   * Verify email OTP. Activates user when mobile is also verified.
   */
  async verifyEmailOtp(req, res) {
    const { email, otp } = req.body;
    const result = await authService.verifyEmailOtp({ email, otp });

    const message = result.accountStatus === 'active'
      ? 'Email verified successfully. Your account is now active.'
      : 'Email verified successfully. Please verify your mobile number to complete activation.';

    return sendSuccess(res, message, result, 200);
  }

  /**
   * POST /api/auth/verify-mobile-otp
   * Verify mobile OTP. Activates user when email is also verified.
   */
  async verifyMobileOtp(req, res) {
    const { mobileNumber, otp } = req.body;
    const result = await authService.verifyMobileOtp({ mobileNumber, otp });

    const message = result.accountStatus === 'active'
      ? 'Mobile number verified successfully. Your account is now active.'
      : 'Mobile number verified successfully. Please verify your email to complete activation.';

    return sendSuccess(res, message, result, 200);
  }

  /**
   * POST /api/auth/signin/request-otp
   * Passwordless sign-in OTP request.
   */
  async requestSignInOtp(req, res) {
    const { identifier } = req.body;
    const result = await authService.requestSignInOtp({ identifier });

    return sendSuccess(
      res,
      result.message || 'If an active account exists with the provided details, an OTP has been sent.',
      result.deliveryMethod ? {
        deliveryMethod: result.deliveryMethod,
        identifier: result.maskedIdentifier,
        ...(result.devOtp && { devOtp: result.devOtp })
      } : { verificationRequired: true },
      200
    );
  }

  /**
   * POST /api/auth/signin/verify-otp
   * Passwordless sign-in OTP verification; returns JWT access token.
   */
  async verifySignInOtp(req, res) {
    const { identifier, otp } = req.body;
    const result = await authService.verifySignInOtp({ identifier, otp });

    return sendSuccess(
      res,
      'Signed in successfully.',
      {
        token: result.token,
        user: result.user
      },
      200
    );
  }

  /**
   * POST /api/auth/resend-otp
   * Resend OTP with strict rate limit and cooldown.
   */
  async resendOtp(req, res) {
    const { identifier, type } = req.body;
    const result = await authService.resendOtp({ identifier, type });

    return sendSuccess(
      res,
      'Verification code resent successfully.',
      result,
      200
    );
  }

  /**
   * GET /api/auth/me
   * Return authenticated user profile.
   */
  async getMe(req, res) {
    const profile = await authService.getProfile(req.user.user_id);

    return sendSuccess(
      res,
      'User profile retrieved successfully.',
      { user: profile },
      200
    );
  }

  /**
   * POST /api/auth/signout
   * Acknowledge sign-out and invalidate client state.
   */
  async signout(req, res) {
    return sendSuccess(
      res,
      'Signed out successfully.',
      null,
      200
    );
  }
}

export const authController = new AuthController();
export default authController;
