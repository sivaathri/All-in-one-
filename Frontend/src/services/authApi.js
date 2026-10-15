/**
 * TripVerse Authentication API Client
 * Connects Frontend directly to Backend (http://localhost:5001/api/auth)
 */

export const API_BASE_URL = 'http://localhost:5001/api/auth';

/**
 * Common fetch wrapper that parses the Section 10 standard API response envelope
 */
async function request(endpoint, options = {}) {
  const token = localStorage.getItem('tripverse_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers
  });

  const resJson = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMessage = resJson.message || 
      (resJson.errors && resJson.errors[0]?.message) || 
      `Request failed with status ${response.status}`;
    const err = new Error(errorMessage);
    err.status = response.status;
    err.data = resJson;
    throw err;
  }

  return resJson;
}

export const authApi = {
  /**
   * Register a new user in MySQL tripverse_db
   * @param {{ fullName: string, email: string, mobileNumber: string }}
   */
  signup: (payload) => request('/signup', {
    method: 'POST',
    body: JSON.stringify(payload)
  }),

  /**
   * Verify Mobile OTP
   * @param {{ mobileNumber: string, otp: string }}
   */
  verifyMobileOtp: (payload) => request('/verify-mobile-otp', {
    method: 'POST',
    body: JSON.stringify(payload)
  }),

  /**
   * Verify Email OTP
   * @param {{ email: string, otp: string }}
   */
  verifyEmailOtp: (payload) => request('/verify-email-otp', {
    method: 'POST',
    body: JSON.stringify(payload)
  }),

  /**
   * Request Sign-in OTP (phone number or email)
   * @param {{ identifier: string }}
   */
  requestSignInOtp: (payload) => request('/signin/request-otp', {
    method: 'POST',
    body: JSON.stringify(payload)
  }),

  /**
   * Verify Sign-in OTP & receive JWT token
   * @param {{ identifier: string, otp: string }}
   */
  verifySignInOtp: (payload) => request('/signin/verify-otp', {
    method: 'POST',
    body: JSON.stringify(payload)
  }),

  /**
   * Resend verification OTP
   * @param {{ identifier: string, type?: 'email'|'mobile' }}
   */
  resendOtp: (payload) => request('/resend-otp', {
    method: 'POST',
    body: JSON.stringify(payload)
  }),

  /**
   * Fetch authenticated user profile
   */
  getMe: () => request('/me', {
    method: 'GET'
  }),

  /**
   * Sign out
   */
  signout: () => request('/signout', {
    method: 'POST'
  })
};

export default authApi;
