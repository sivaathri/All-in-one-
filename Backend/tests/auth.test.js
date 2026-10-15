import { describe, it, beforeEach, before, after } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import jwt from 'jsonwebtoken';

// Set test environment
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test_secret_key_for_testing_purposes_only_123456';
process.env.JWT_EXPIRES_IN = '15m';

import app from '../src/app.js';
import { env } from '../src/config/env.js';
import { setTransactionHandler } from '../src/config/database.js';
import { userRepository } from '../src/repositories/user.repository.js';
import { otpRepository } from '../src/repositories/otp.repository.js';
import { notificationService } from '../src/services/notification.service.js';
import { hashOtp } from '../src/utils/otp.js';

// ---------------------------------------------------------------------------
// In-Memory Database Simulator for Testing (Independent of MySQL Daemon)
// ---------------------------------------------------------------------------
class InMemoryStore {
  constructor() {
    this.users = [];
    this.otps = [];
    this.nextUserId = 1;
    this.nextOtpId = 1;
    this.lastDispatchedOtps = {}; // { 'email:user@example.com': '123456', 'mobile:+91...': '654321' }
  }

  reset() {
    this.users = [];
    this.otps = [];
    this.nextUserId = 1;
    this.nextOtpId = 1;
    this.lastDispatchedOtps = {};
  }
}

const store = new InMemoryStore();

// Setup in-memory mock repository delegates
function wireTestRepositories() {
  setTransactionHandler(async (callback) => {
    const fakeConnection = {
      execute: async () => [[]],
      query: async () => [[]]
    };
    return callback(fakeConnection);
  });

  // Mock UserRepository methods
  userRepository.findById = async (userId) => {
    return store.users.find((u) => u.user_id === Number(userId)) || null;
  };

  userRepository.findByEmail = async (email) => {
    return store.users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
  };

  userRepository.findByMobile = async (mobile) => {
    return store.users.find((u) => u.mobile_number === mobile) || null;
  };

  userRepository.findByIdentifier = async (identifier) => {
    return store.users.find(
      (u) => u.email.toLowerCase() === identifier.toLowerCase() || u.mobile_number === identifier
    ) || null;
  };

  userRepository.findExistingUser = async (email, mobile) => {
    return store.users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() || u.mobile_number === mobile
    ) || null;
  };

  userRepository.create = async ({ fullName, email, mobileNumber, accountStatus = 'pending' }) => {
    const user = {
      user_id: store.nextUserId++,
      full_name: fullName,
      email: email.toLowerCase(),
      mobile_number: mobileNumber,
      email_verified: false,
      mobile_verified: false,
      account_status: accountStatus,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    store.users.push(user);
    return user.user_id;
  };

  userRepository.setEmailVerified = async (userId, accountStatus = null) => {
    const user = store.users.find((u) => u.user_id === Number(userId));
    if (!user) return false;
    user.email_verified = true;
    if (accountStatus) user.account_status = accountStatus;
    user.updated_at = new Date().toISOString();
    return true;
  };

  userRepository.setMobileVerified = async (userId, accountStatus = null) => {
    const user = store.users.find((u) => u.user_id === Number(userId));
    if (!user) return false;
    user.mobile_verified = true;
    if (accountStatus) user.account_status = accountStatus;
    user.updated_at = new Date().toISOString();
    return true;
  };

  userRepository.updateAccountStatus = async (userId, status) => {
    const user = store.users.find((u) => u.user_id === Number(userId));
    if (!user) return false;
    user.account_status = status;
    user.updated_at = new Date().toISOString();
    return true;
  };

  // Mock OtpRepository methods
  otpRepository.create = async ({ userId, verificationType, otpHash, expiresAt }) => {
    const otpRecord = {
      otp_id: store.nextOtpId++,
      user_id: Number(userId),
      verification_type: verificationType,
      otp_hash: otpHash,
      expires_at: expiresAt instanceof Date ? expiresAt.toISOString() : expiresAt,
      verified_at: null,
      attempts: 0,
      created_at: new Date().toISOString()
    };
    store.otps.push(otpRecord);
    return otpRecord.otp_id;
  };

  otpRepository.getLatestPendingOtp = async (userId, verificationType) => {
    const matching = store.otps
      .filter((o) => o.user_id === Number(userId) && o.verification_type === verificationType && !o.verified_at)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    return matching[0] || null;
  };

  otpRepository.incrementAttempts = async (otpId) => {
    const record = store.otps.find((o) => o.otp_id === Number(otpId));
    if (record) {
      record.attempts += 1;
      return true;
    }
    return false;
  };

  otpRepository.markVerified = async (otpId) => {
    const record = store.otps.find((o) => o.otp_id === Number(otpId) && !o.verified_at);
    if (record) {
      record.verified_at = new Date().toISOString();
      return true;
    }
    return false;
  };

  otpRepository.invalidatePendingOtps = async (userId, verificationType) => {
    let count = 0;
    store.otps.forEach((o) => {
      if (o.user_id === Number(userId) && o.verification_type === verificationType && !o.verified_at) {
        o.expires_at = new Date(Date.now() - 1000).toISOString();
        count++;
      }
    });
    return count;
  };

  otpRepository.getLastOtpCreatedAt = async (userId, verificationType) => {
    const matching = store.otps
      .filter((o) => o.user_id === Number(userId) && o.verification_type === verificationType)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    return matching[0]?.created_at || null;
  };

  // Mock NotificationService
  notificationService.sendEmailOtp = async ({ email, otp }) => {
    store.lastDispatchedOtps[`email:${email}`] = otp;
    return { success: true, messageId: 'test-mail-id' };
  };

  notificationService.sendMobileOtp = async ({ mobileNumber, otp }) => {
    store.lastDispatchedOtps[`mobile:${mobileNumber}`] = otp;
    return { success: true, messageId: 'test-sms-id' };
  };
}

describe('TripVerse Authentication Module 1 Test Suite', () => {
  before(() => {
    wireTestRepositories();
  });

  beforeEach(() => {
    store.reset();
  });

  // ---------------------------------------------------------------------------
  // 1. Health check & Server Status
  // ---------------------------------------------------------------------------
  it('GET /api/health should return 200 and healthy status', async () => {
    const res = await request(app).get('/api/health');
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.status, 'online');
  });

  // ---------------------------------------------------------------------------
  // 2. Registration / Signup Workflow
  // ---------------------------------------------------------------------------
  describe('POST /api/auth/signup', () => {
    it('should successfully register a new pending user and dispatch OTPs', async () => {
      const payload = {
        fullName: 'Aarav Sharma',
        email: 'aarav@example.com',
        mobileNumber: '+919876543210'
      };

      const res = await request(app)
        .post('/api/auth/signup')
        .send(payload);

      assert.equal(res.status, 201);
      assert.equal(res.body.success, true);
      assert.equal(res.body.data.verificationRequired, true);
      assert.equal(res.body.data.email, 'aarav@example.com');
      assert.equal(res.body.data.mobileNumber, '+919876543210');

      // Crucial Security Checks: Never leak plain OTP or hash in response
      assert.equal(res.body.data.otp, undefined);
      assert.equal(res.body.data.otpHash, undefined);

      // Verify OTPs were generated and dispatched in store
      assert.ok(store.lastDispatchedOtps['email:aarav@example.com']);
      assert.ok(store.lastDispatchedOtps['mobile:+919876543210']);
      assert.equal(store.otps.length, 2);

      // Verify user is in pending state
      const createdUser = store.users[0];
      assert.equal(createdUser.account_status, 'pending');
      assert.equal(createdUser.email_verified, false);
      assert.equal(createdUser.mobile_verified, false);
    });

    it('should reject signup with invalid input data (validation test)', async () => {
      const res = await request(app)
        .post('/api/auth/signup')
        .send({
          fullName: 'A', // too short
          email: 'not-an-email',
          mobileNumber: '123' // invalid mobile
        });

      assert.equal(res.status, 422);
      assert.equal(res.body.success, false);
      assert.ok(Array.isArray(res.body.errors));
      assert.ok(res.body.errors.some((e) => e.field === 'fullName'));
      assert.ok(res.body.errors.some((e) => e.field === 'email'));
      assert.ok(res.body.errors.some((e) => e.field === 'mobileNumber'));
    });

    it('should reject duplicate email or mobile for an active user', async () => {
      // Create an existing active user
      store.users.push({
        user_id: 10,
        full_name: 'Existing Active User',
        email: 'active@example.com',
        mobile_number: '+919876543210',
        email_verified: true,
        mobile_verified: true,
        account_status: 'active'
      });

      const res = await request(app)
        .post('/api/auth/signup')
        .send({
          fullName: 'New User',
          email: 'active@example.com',
          mobileNumber: '+919111122223'
        });

      assert.equal(res.status, 409);
      assert.equal(res.body.success, false);
      assert.match(res.body.message, /already exists/i);
    });
  });

  // ---------------------------------------------------------------------------
  // 3. OTP Verification Workflow
  // ---------------------------------------------------------------------------
  describe('OTP Verification (Email & Mobile)', () => {
    let testEmailOtp;
    let testMobileOtp;

    beforeEach(async () => {
      // Register user before each test in this suite
      await request(app)
        .post('/api/auth/signup')
        .send({
          fullName: 'Kiran Patel',
          email: 'kiran@example.com',
          mobileNumber: '+919888877777'
        });

      testEmailOtp = store.lastDispatchedOtps['email:kiran@example.com'];
      testMobileOtp = store.lastDispatchedOtps['mobile:+919888877777'];
    });

    it('should reject incorrect email OTP and decrement remaining attempts', async () => {
      const res = await request(app)
        .post('/api/auth/verify-email-otp')
        .send({
          email: 'kiran@example.com',
          otp: '000000'
        });

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
      assert.match(res.body.message, /Invalid verification code/i);

      // Verify attempts counter was incremented
      const pendingRecord = store.otps.find((o) => o.verification_type === 'email');
      assert.equal(pendingRecord.attempts, 1);
    });

    it('should verify email OTP correctly and remain pending if mobile is unverified', async () => {
      const res = await request(app)
        .post('/api/auth/verify-email-otp')
        .send({
          email: 'kiran@example.com',
          otp: testEmailOtp
        });

      assert.equal(res.status, 200);
      assert.equal(res.body.success, true);
      assert.equal(res.body.data.emailVerified, true);
      assert.equal(res.body.data.mobileVerified, false);
      assert.equal(res.body.data.accountStatus, 'pending');
    });

    it('should verify mobile OTP correctly and remain pending if email is unverified', async () => {
      const res = await request(app)
        .post('/api/auth/verify-mobile-otp')
        .send({
          mobileNumber: '+919888877777',
          otp: testMobileOtp
        });

      assert.equal(res.status, 200);
      assert.equal(res.body.success, true);
      assert.equal(res.body.data.mobileVerified, true);
      assert.equal(res.body.data.emailVerified, false);
      assert.equal(res.body.data.accountStatus, 'pending');
    });

    it('should activate user account ONLY after BOTH email and mobile are verified', async () => {
      // 1. Verify Email
      const res1 = await request(app)
        .post('/api/auth/verify-email-otp')
        .send({ email: 'kiran@example.com', otp: testEmailOtp });
      assert.equal(res1.body.data.accountStatus, 'pending');

      // 2. Verify Mobile
      const res2 = await request(app)
        .post('/api/auth/verify-mobile-otp')
        .send({ mobileNumber: '+919888877777', otp: testMobileOtp });
      assert.equal(res2.body.data.accountStatus, 'active');

      // Check database state
      const user = store.users.find((u) => u.email === 'kiran@example.com');
      assert.equal(user.account_status, 'active');
      assert.equal(user.email_verified, true);
      assert.equal(user.mobile_verified, true);
    });

    it('should reject expired OTPs', async () => {
      // Expire email OTP manually
      const emailOtpRecord = store.otps.find((o) => o.verification_type === 'email');
      emailOtpRecord.expires_at = new Date(Date.now() - 1000).toISOString();

      const res = await request(app)
        .post('/api/auth/verify-email-otp')
        .send({ email: 'kiran@example.com', otp: testEmailOtp });

      assert.equal(res.status, 400);
      assert.match(res.body.message, /expired/i);
    });

    it('should reject reused OTPs (single-use enforcement)', async () => {
      // First verification succeeds
      const res1 = await request(app)
        .post('/api/auth/verify-email-otp')
        .send({ email: 'kiran@example.com', otp: testEmailOtp });
      assert.equal(res1.status, 200);

      // Second verification attempt with same OTP
      const res2 = await request(app)
        .post('/api/auth/verify-email-otp')
        .send({ email: 'kiran@example.com', otp: testEmailOtp });

      // Either already verified indication or rejection
      assert.ok(res2.status === 200 || res2.status === 400);
      if (res2.status === 200) {
        assert.equal(res2.body.data.alreadyVerified, true);
      }
    });

    it('should lock out after maximum OTP attempts exceeded', async () => {
      const emailOtpRecord = store.otps.find((o) => o.verification_type === 'email');
      emailOtpRecord.attempts = 5; // Reached limit

      const res = await request(app)
        .post('/api/auth/verify-email-otp')
        .send({ email: 'kiran@example.com', otp: '999999' });

      assert.equal(res.status, 400);
      assert.match(res.body.message, /Maximum verification attempts exceeded/i);
    });
  });

  // ---------------------------------------------------------------------------
  // 4. Sign-In Workflow (Passwordless OTP)
  // ---------------------------------------------------------------------------
  describe('Sign-In Workflow (POST /api/auth/signin/...)', () => {
    beforeEach(() => {
      // Populate an active user and a suspended user
      store.users.push(
        {
          user_id: 1,
          full_name: 'Active User',
          email: 'active@example.com',
          mobile_number: '+919999900000',
          email_verified: true,
          mobile_verified: true,
          account_status: 'active',
          created_at: new Date().toISOString()
        },
        {
          user_id: 2,
          full_name: 'Suspended User',
          email: 'suspended@example.com',
          mobile_number: '+919999911111',
          email_verified: true,
          mobile_verified: true,
          account_status: 'suspended',
          created_at: new Date().toISOString()
        },
        {
          user_id: 3,
          full_name: 'Pending User',
          email: 'pending@example.com',
          mobile_number: '+919999922222',
          email_verified: false,
          mobile_verified: false,
          account_status: 'pending',
          created_at: new Date().toISOString()
        }
      );
    });

    it('should request sign-in OTP for active user via email identifier', async () => {
      const res = await request(app)
        .post('/api/auth/signin/request-otp')
        .send({ identifier: 'active@example.com' });

      assert.equal(res.status, 200);
      assert.equal(res.body.success, true);
      assert.ok(store.lastDispatchedOtps['email:active@example.com']);
    });

    it('should reject sign-in OTP request for suspended account with 403', async () => {
      const res = await request(app)
        .post('/api/auth/signin/request-otp')
        .send({ identifier: 'suspended@example.com' });

      assert.equal(res.status, 403);
      assert.match(res.body.message, /suspended/i);
    });

    it('should reject sign-in OTP request for unverified pending account with 403', async () => {
      const res = await request(app)
        .post('/api/auth/signin/request-otp')
        .send({ identifier: 'pending@example.com' });

      assert.equal(res.status, 403);
      assert.match(res.body.message, /incomplete|verify/i);
    });

    it('should successfully sign in with correct OTP and receive JWT access token', async () => {
      // 1. Request OTP
      await request(app)
        .post('/api/auth/signin/request-otp')
        .send({ identifier: 'active@example.com' });

      const signinOtp = store.lastDispatchedOtps['email:active@example.com'];
      assert.ok(signinOtp);

      // 2. Verify OTP
      const res = await request(app)
        .post('/api/auth/signin/verify-otp')
        .send({
          identifier: 'active@example.com',
          otp: signinOtp
        });

      assert.equal(res.status, 200);
      assert.equal(res.body.success, true);
      assert.ok(res.body.data.token, 'Must return JWT token');
      assert.equal(res.body.data.user.email, 'active@example.com');
      assert.equal(res.body.data.user.fullName, 'Active User');

      // Verify JWT payload
      const decoded = jwt.verify(res.body.data.token, env.JWT.secret);
      assert.equal(decoded.userId, 1);
      assert.equal(decoded.email, 'active@example.com');
    });

    it('should reject sign-in with invalid OTP', async () => {
      await request(app)
        .post('/api/auth/signin/request-otp')
        .send({ identifier: 'active@example.com' });

      const res = await request(app)
        .post('/api/auth/signin/verify-otp')
        .send({
          identifier: 'active@example.com',
          otp: '000000'
        });

      assert.equal(res.status, 400);
      assert.equal(res.body.success, false);
      assert.match(res.body.message, /Invalid verification code/i);
    });
  });

  // ---------------------------------------------------------------------------
  // 5. Session, Profile (GET /me) & Signout
  // ---------------------------------------------------------------------------
  describe('Protected Routes & Profile Inspection', () => {
    let validToken;

    beforeEach(() => {
      store.users.push({
        user_id: 42,
        full_name: 'Logged-in Explorer',
        email: 'explorer@tripverse.com',
        mobile_number: '+919123456789',
        email_verified: true,
        mobile_verified: true,
        account_status: 'active'
      });

      validToken = jwt.sign(
        { userId: 42, email: 'explorer@tripverse.com' },
        env.JWT.secret,
        { expiresIn: '15m' }
      );
    });

    it('GET /api/auth/me should return authenticated user profile', async () => {
      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${validToken}`);

      assert.equal(res.status, 200);
      assert.equal(res.body.success, true);
      assert.equal(res.body.data.user.userId, 42);
      assert.equal(res.body.data.user.email, 'explorer@tripverse.com');
      assert.equal(res.body.data.user.fullName, 'Logged-in Explorer');
    });

    it('GET /api/auth/me should reject requests without token with 401', async () => {
      const res = await request(app).get('/api/auth/me');
      assert.equal(res.status, 401);
      assert.equal(res.body.success, false);
    });

    it('GET /api/auth/me should reject expired or invalid tokens with 401', async () => {
      const expiredToken = jwt.sign(
        { userId: 42, email: 'explorer@tripverse.com' },
        env.JWT.secret,
        { expiresIn: '-1s' }
      );

      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${expiredToken}`);

      assert.equal(res.status, 401);
      assert.match(res.body.message, /expired/i);
    });

    it('POST /api/auth/signout should acknowledge successful sign-out', async () => {
      const res = await request(app)
        .post('/api/auth/signout')
        .set('Authorization', `Bearer ${validToken}`);

      assert.equal(res.status, 200);
      assert.equal(res.body.success, true);
      assert.match(res.body.message, /Signed out/i);
    });
  });

  // ---------------------------------------------------------------------------
  // 6. Resend Limits & Cooldown
  // ---------------------------------------------------------------------------
  describe('OTP Resend & Cooldown Limits', () => {
    it('should enforce cooldown if resending too quickly', async () => {
      store.users.push({
        user_id: 15,
        full_name: 'Cooldown Tester',
        email: 'cooldown@tripverse.com',
        mobile_number: '+919999988888',
        email_verified: false,
        mobile_verified: false,
        account_status: 'pending'
      });

      // Record an OTP created 10 seconds ago (cooldown is 60s)
      store.otps.push({
        otp_id: 100,
        user_id: 15,
        verification_type: 'email',
        otp_hash: hashOtp('123456'),
        expires_at: new Date(Date.now() + 300000).toISOString(),
        verified_at: null,
        attempts: 0,
        created_at: new Date(Date.now() - 10000).toISOString()
      });

      const res = await request(app)
        .post('/api/auth/resend-otp')
        .send({
          identifier: 'cooldown@tripverse.com',
          type: 'email'
        });

      assert.equal(res.status, 429);
      assert.match(res.body.message, /Please wait/i);
    });
  });

  // ---------------------------------------------------------------------------
  // 7. Error Handling & Security Isolation
  // ---------------------------------------------------------------------------
  describe('Security & Error Handling', () => {
    it('should safely handle notification errors without crashing server', async () => {
      // Temporarily mock notification service to simulate an outbound provider error
      const originalSend = notificationService.sendEmailOtp;
      notificationService.sendEmailOtp = async () => {
        throw new Error('SMTP connection timed out');
      };

      const res = await request(app)
        .post('/api/auth/signup')
        .send({
          fullName: 'Fallback User',
          email: 'fallback@example.com',
          mobileNumber: '+919777766666'
        });

      // Restore notification service
      notificationService.sendEmailOtp = originalSend;

      // Registration account is created in pending state despite delivery warning
      assert.equal(res.status, 201);
      assert.equal(res.body.data.verificationRequired, true);
    });

    it('should return safe error response for 404 unknown routes', async () => {
      const res = await request(app).get('/api/auth/non-existent-endpoint');
      assert.equal(res.status, 404);
      assert.equal(res.body.success, false);
      assert.match(res.body.message, /Resource not found/i);
    });

    it('should handle database connection errors safely without leaking internal details', async () => {
      const originalFind = userRepository.findByIdentifier;
      userRepository.findByIdentifier = async () => {
        const dbErr = new Error('Database connection lost');
        dbErr.code = 'ECONNREFUSED';
        throw dbErr;
      };

      const res = await request(app)
        .post('/api/auth/signin/request-otp')
        .send({ identifier: 'test@example.com' });

      // Restore
      userRepository.findByIdentifier = originalFind;

      assert.equal(res.status, 503);
      assert.equal(res.body.success, false);
      assert.match(res.body.message, /Database connection unavailable/i);
      assert.equal(res.body.stack, undefined);
    });
  });
});
