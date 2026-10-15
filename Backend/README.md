# TripVerse Backend — Authentication Module 1

TripVerse is an end-to-end travel platform where users explore stays, vehicle rentals, curated food spots, activities, taxi bookings, personalized services, and tour packages.

This repository contains **Module 1 (Authentication & User Verification)** — the foundational, secure, passwordless authentication subsystem for TripVerse.

---

## 1. Architecture & Folder Structure

The project adheres to a clean, decoupled layered architecture separating HTTP routing, validation, business logic, notification dispatchers, and persistence layers.

```
tripverse-backend/
├── src/
│   ├── config/                     # Application configurations & service clients
│   │   ├── database.js             # MySQL2 promise-based connection pool & transaction helper
│   │   ├── env.js                  # Environment variable schema validation & defaults
│   │   └── mail.js                 # Nodemailer transport configuration with mock fallbacks
│   ├── controllers/                # Request & response orchestration
│   │   └── auth.controller.js      # Authentication endpoints controller
│   ├── services/                   # Core business logic & external integrations
│   │   ├── auth.service.js         # Signup, login, verification, and profile management
│   │   ├── otp.service.js          # Cryptographic generation, hashing, attempt tracking & cooldowns
│   │   └── notification.service.js # Email (SMTP) & SMS provider adapters (Twilio/Mock)
│   ├── models/                     # Data Models (Schema, Queries & Persistence)
│   │   ├── index.js                # Models aggregator
│   │   ├── user.model.js           # User Model for `users` table
│   │   └── otp.model.js            # OTP Model for `signup_otps` table
│   ├── routes/                     # Express route declarations
│   │   ├── index.js                # Master router with health check & route prefixes
│   │   └── auth.routes.js          # Authentication endpoint route definitions
│   ├── middleware/                 # Express middlewares
│   │   ├── auth.middleware.js       # JWT access token verification & user hydration
│   │   ├── error.middleware.js      # Global error sanitization (leaks neither traces nor secrets)
│   │   └── rate-limit.middleware.js # express-rate-limit guards for OTP spam & brute force
│   ├── validators/                 # Request validation schemas using express-validator
│   │   └── auth.validator.js       # Phone format, email normalization, and body sanitization
│   ├── utils/                      # Helper utilities
│   │   ├── async-handler.js        # Promise-resolving controller wrapper
│   │   ├── otp.js                  # Crypto-based OTP generation & timing-safe comparison
│   │   └── response.js             # Consistent standard JSON response envelopes
│   ├── app.js                      # Express application instantiation & security pipeline
│   └── server.js                   # Server bootstrap, connectivity verification & graceful shutdown
├── database/
│   └── schema.sql                  # MySQL schema definition for users & signup_otps tables
├── tests/
│   └── auth.test.js                # Complete automated test suite (Node test runner + Supertest)
├── .env.example                    # Template environment variables
├── .gitignore                      # Git ignore file (excludes secrets & dependencies)
├── package.json                    # Project dependencies and npm scripts
└── README.md                       # Comprehensive system documentation
```

### Folder Responsibilities

| Directory | Responsibility |
| :--- | :--- |
| `src/config/` | Initializes singleton clients (MySQL2 pool, Nodemailer transporter) and validates startup environment variables. |
| `src/routes/` | Defines API endpoints (Router), attaching rate limiters, request validators, and authentication middleware. |
| `src/controllers/` | Handles HTTP requests, calls models/services, and formats JSON responses using standard envelopes. |
| `src/models/` | Direct database models for `users` and `signup_otps` with parameterized queries and transaction support. |
| `src/services/` | Contains the core business logic, ACID transactions, dual OTP coordination, and account state transitions. |
| `src/middleware/` | Enforces cross-cutting concerns: JWT authentication, rate limiting, and safe error normalization. |
| `src/validators/` | Validates and normalizes request payloads with `express-validator` before passing execution to controllers. |
| `src/utils/` | Shared utilities: cryptographic random OTP generator, HMAC-SHA256 hasher, timing-safe equality, and masking. |
| `database/` | Contains reproducible SQL schemas with relational constraints and indexes. |
| `tests/` | Comprehensive test suite testing all 14 authentication and security scenarios. |

---

## 2. Prerequisites & Technology Stack

- **Node.js**: v18.x or v20.x or v24.x (uses ES Modules)
- **MySQL**: 8.0+
- **Express.js**: 4.21+
- **Security & Utilities**: `helmet`, `cors`, `express-rate-limit`, `express-validator`, `jsonwebtoken`, `nodemailer`, `mysql2`

---

## 3. Installation & Setup

### Step 1: Install Dependencies
Open your terminal in the backend root directory (`Backend`):
```bash
npm install
```

### Step 2: Configure Environment Variables
Copy the template `.env.example` to `.env`:
```bash
cp .env.example .env
```
*(On Windows PowerShell: `Copy-Item .env.example .env`)*

Configure your `.env` variables:
```env
PORT=5001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# MySQL Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=tripverse_db

# Authentication Secrets
JWT_SECRET=replace_with_a_long_random_secret_at_least_32_chars
JWT_EXPIRES_IN=15m

# SMTP Email Configuration (Leave empty to use simulated mock delivery in development)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_specific_password
EMAIL_FROM="TripVerse <no-reply@tripverse.com>"

# SMS Provider Configuration (default: 'mock')
SMS_PROVIDER=mock
SMS_API_KEY=
SMS_SENDER_ID=TRIPVR
```

---

## 4. MySQL Database Configuration

### Step 1: Ensure MySQL is running
Ensure your local MySQL service is active (e.g., through MySQL Workbench, XAMPP, Docker, or system services).

### Step 2: Execute Schema
Execute `database/schema.sql` via MySQL CLI or MySQL Workbench:

**Using MySQL CLI:**
```bash
mysql -u root -p < database/schema.sql
```
*(Enter your MySQL password when prompted)*

**Using MySQL Workbench / phpMyAdmin:**
1. Open MySQL Workbench.
2. Open `database/schema.sql`.
3. Click the Execute button (lightning icon).

The schema creates:
1. `tripverse_db` database (if not exists) with `utf8mb4_unicode_ci`.
2. `users` table:
   - `user_id`: BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY
   - `full_name`: VARCHAR(150) NOT NULL
   - `email`: VARCHAR(254) NOT NULL UNIQUE
   - `mobile_number`: VARCHAR(20) NOT NULL UNIQUE
   - `email_verified`: BOOLEAN DEFAULT FALSE
   - `mobile_verified`: BOOLEAN DEFAULT FALSE
   - `account_status`: ENUM('pending', 'active', 'suspended') DEFAULT 'pending'
   - `created_at` & `updated_at`: TIMESTAMP
3. `signup_otps` table:
   - `otp_id`: BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY
   - `user_id`: Foreign key referencing `users.user_id` ON DELETE CASCADE
   - `verification_type`: ENUM('email', 'mobile')
   - `otp_hash`: VARCHAR(255) NOT NULL
   - `expires_at`: DATETIME NOT NULL
   - `verified_at`: DATETIME NULL
   - `attempts`: INT UNSIGNED DEFAULT 0
   - `created_at`: TIMESTAMP

---

## 5. Third-Party Provider Configuration

### Email Provider (SMTP)
- TripVerse uses `nodemailer`.
- To enable live emails:
  1. Set `SMTP_HOST` (e.g. `smtp.gmail.com` or SendGrid `smtp.sendgrid.net`).
  2. Set `SMTP_PORT` (e.g. `587` for STARTTLS or `465` for SSL).
  3. Set `SMTP_USER` and `SMTP_PASSWORD` (use Google App Password if using Gmail).
- **Development Fallback**: If `SMTP_HOST` is left empty, the server automatically boots in simulated mock mode without crashing.

### SMS Provider Adapter
TripVerse incorporates a pluggable SMS adapter architecture:
- **`mock` (Default)**: Logs simulated SMS deliveries to the terminal without requiring third-party credentials. Ideal for development and local testing.
- **`twilio`**: Set `SMS_PROVIDER=twilio`, `SMS_API_KEY=your_auth_token`, `TWILIO_ACCOUNT_SID=your_account_sid`, and `SMS_SENDER_ID=your_twilio_number`.

---

## 6. Starting the Server

### Development Mode (with native file watcher):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

### Run Automated Tests:
```bash
npm test
```
The test suite runs 24 automated unit and integration tests using Node.js's native test runner (`node:test`) and Supertest.

---

## 7. API Endpoint Documentation

All endpoints return a standardized JSON response conforming to the project specification:
- **Success Format**:
  ```json
  {
    "success": true,
    "message": "Human readable message",
    "data": { ... }
  }
  ```
- **Error Format**:
  ```json
  {
    "success": false,
    "message": "Error description",
    "errors": [ ... ]
  }
  ```

---

### 1. Register User (Signup)
Creates a pending user account and sends separate 6-digit OTPs to both email and mobile.

- **URL**: `POST /api/auth/signup`
- **Rate Limit**: 10 requests per 15 minutes
- **Request Body**:
  ```json
  {
    "fullName": "Aarav Sharma",
    "email": "aarav.sharma@example.com",
    "mobileNumber": "+919876543210"
  }
  ```
- **Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "User registered successfully. Verification required.",
    "data": {
      "verificationRequired": true,
      "email": "aarav.sharma@example.com",
      "mobileNumber": "+919876543210"
    }
  }
  ```

---

### 2. Verify Email OTP
Verifies the submitted email OTP. Account is activated only if mobile is also verified.

- **URL**: `POST /api/auth/verify-email-otp`
- **Rate Limit**: 20 verification attempts per 15 minutes
- **Request Body**:
  ```json
  {
    "email": "aarav.sharma@example.com",
    "otp": "492018"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Email verified successfully. Please verify your mobile number to complete activation.",
    "data": {
      "emailVerified": true,
      "mobileVerified": false,
      "accountStatus": "pending"
    }
  }
  ```

---

### 3. Verify Mobile OTP
Verifies the submitted mobile OTP. If email is also verified, transitions `account_status` to `'active'`.

- **URL**: `POST /api/auth/verify-mobile-otp`
- **Rate Limit**: 20 verification attempts per 15 minutes
- **Request Body**:
  ```json
  {
    "mobileNumber": "+919876543210",
    "otp": "830192"
  }
  ```
- **Response (200 OK - Account Activated)**:
  ```json
  {
    "success": true,
    "message": "Mobile number verified successfully. Your account is now active.",
    "data": {
      "emailVerified": true,
      "mobileVerified": true,
      "accountStatus": "active"
    }
  }
  ```

---

### 4. Passwordless Sign-In: Request OTP
Dispatches an OTP to a registered and verified contact method for active accounts. Employs anti-enumeration protection.

- **URL**: `POST /api/auth/signin/request-otp`
- **Rate Limit**: 10 requests per 15 minutes
- **Request Body**:
  ```json
  {
    "identifier": "aarav.sharma@example.com"
  }
  ```
  *(or mobile: `{ "identifier": "+919876543210" }`)*
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "If an active account exists with the provided details, an OTP has been sent.",
    "data": {
      "deliveryMethod": "email",
      "identifier": "a***a@example.com"
    }
  }
  ```

---

### 5. Passwordless Sign-In: Verify OTP
Consumes the sign-in OTP and returns a signed short-lived JWT access token and user profile.

- **URL**: `POST /api/auth/signin/verify-otp`
- **Rate Limit**: 20 verification attempts per 15 minutes
- **Request Body**:
  ```json
  {
    "identifier": "aarav.sharma@example.com",
    "otp": "610943"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Signed in successfully.",
    "data": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "userId": 1,
        "fullName": "Aarav Sharma",
        "email": "aarav.sharma@example.com",
        "mobileNumber": "+919876543210",
        "emailVerified": true,
        "mobileVerified": true,
        "accountStatus": "active"
      }
    }
  }
  ```

---

### 6. Resend OTP
Resends an OTP subject to a strict 60-second cooldown window and rate limiting.

- **URL**: `POST /api/auth/resend-otp`
- **Rate Limit**: 10 requests per 15 minutes (with 60-second minimum cooldown)
- **Request Body**:
  ```json
  {
    "identifier": "aarav.sharma@example.com",
    "type": "email"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Verification code resent successfully.",
    "data": {
      "deliveryMethod": "email",
      "maskedIdentifier": "a***a@example.com"
    }
  }
  ```

---

### 7. Get Authenticated User Profile
Retrieves the safe user profile for the authenticated session.

- **URL**: `GET /api/auth/me`
- **Headers**: `Authorization: Bearer <your_jwt_token>`
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "User profile retrieved successfully.",
    "data": {
      "user": {
        "userId": 1,
        "fullName": "Aarav Sharma",
        "email": "aarav.sharma@example.com",
        "mobileNumber": "+919876543210",
        "emailVerified": true,
        "mobileVerified": true,
        "accountStatus": "active",
        "createdAt": "2026-10-15T09:00:00.000Z",
        "updatedAt": "2026-10-15T09:05:00.000Z"
      }
    }
  }
  ```

---

### 8. Sign Out
Terminates user session client-side.

- **URL**: `POST /api/auth/signout`
- **Headers**: `Authorization: Bearer <your_jwt_token>`
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Signed out successfully."
  }
  ```

---

## 8. Postman Testing Guide

Follow these steps to test the authentication flow sequentially in Postman:

1. **Create an Environment in Postman**:
   - Variable `baseUrl`: `http://localhost:5001/api`
   - Variable `token`: *(leave blank initially)*
2. **Step 1 — Register (POST `{{baseUrl}}/auth/signup`)**:
   - Body (JSON):
     ```json
     {
       "fullName": "Demo Explorer",
       "email": "explorer@tripverse.com",
       "mobileNumber": "+919876543210"
     }
     ```
   - Send request. In console or your email/SMS, observe the generated 6-digit OTPs.
3. **Step 2 — Verify Email OTP (POST `{{baseUrl}}/auth/verify-email-otp`)**:
   - Body: `{ "email": "explorer@tripverse.com", "otp": "<email_otp>" }`
   - Returns status `pending` (waiting for mobile).
4. **Step 3 — Verify Mobile OTP (POST `{{baseUrl}}/auth/verify-mobile-otp`)**:
   - Body: `{ "mobileNumber": "+919876543210", "otp": "<mobile_otp>" }`
   - Returns status `active`! The account is now activated.
5. **Step 4 — Request Sign-In OTP (POST `{{baseUrl}}/auth/signin/request-otp`)**:
   - Body: `{ "identifier": "explorer@tripverse.com" }`
   - Generates and dispatches a fresh sign-in OTP.
6. **Step 5 — Verify Sign-In OTP (POST `{{baseUrl}}/auth/signin/verify-otp`)**:
   - Body: `{ "identifier": "explorer@tripverse.com", "otp": "<signin_otp>" }`
   - Postman Tests script to save token automatically:
     ```javascript
     if (pm.response.code === 200) {
         const jsonData = pm.response.json();
         pm.environment.set("token", jsonData.data.token);
     }
     ```
7. **Step 6 — Get Profile (GET `{{baseUrl}}/auth/me`)**:
   - Authorization: Select **Bearer Token**, enter `{{token}}`.
   - Returns user profile.
8. **Step 7 — Sign Out (POST `{{baseUrl}}/auth/signout`)**:
   - Authorization: Bearer Token.

---

## 9. Security Implementations

1. **Zero Password Footprint**: Passwordless architecture entirely eliminates credential stuffing, dictionary attacks, and database password leaks.
2. **HMAC-SHA256 OTP Hashing**: Plain-text OTPs are **never** stored in the database. Only HMAC-SHA256 hashes generated with a secret pepper are persisted.
3. **Cryptographic Randomness**: Generated via Node.js `crypto.randomInt` guaranteeing uniform distribution without PRNG predictability.
4. **Timing-Safe Comparison**: `crypto.timingSafeEqual` prevents side-channel timing attacks when checking submitted verification codes.
5. **Strict Attempt & Rate Limits**: Maximum 5 incorrect verification attempts per OTP code, 60-second resend cooldowns, and IP/identifier rate limiting with `express-rate-limit`.
6. **Atomic Transactions & Race Prevention**: MySQL transactions and row affected guards prevent concurrent double-spending or replay of the same OTP.
7. **Safe Error Masking**: Internal MySQL error codes, database traces, and credentials are intercepted by `error.middleware.js` and never exposed to clients.
8. **Anti-Enumeration Protection**: Sign-in OTP requests for non-existent users return the same generic confirmation message to prevent account harvesting.

---

## 10. Future Extensibility & Architecture Roadmap

The authentication module is decoupled from business domain models and ready for future TripVerse modules without rewrites:

```
src/
├── routes/
│   ├── auth.routes.js        <-- Module 1 (Completed)
│   ├── stays.routes.js       <-- Module 2 (Future)
│   ├── rentals.routes.js     <-- Module 3 (Future)
│   ├── activities.routes.js  <-- Module 4 (Future)
│   ├── bookings.routes.js    <-- Module 5 (Future)
│   └── payments.routes.js    <-- Module 6 (Future)
```

- **Host Profiles**: Can easily link to `users.user_id` via a 1:1 `host_profiles` table (`user_id`, `pan_number`, `gst_number`, `approval_status`).
- **Authorization & Roles**: Can be layered onto `auth.middleware.js` with role-based checks (e.g., `requireRole('host')` or `requireRole('admin')`).
- **Bookings & Payments**: Access the authenticated user cleanly through `req.user.user_id` without touching authentication logic.
