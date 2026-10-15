import { env } from '../config/env.js';
import { getMailTransporter } from '../config/mail.js';
import { maskIdentifier } from '../utils/otp.js';

/**
 * Base SMS Provider Adapter
 */
class SmsAdapter {
  async sendSms({ to, message }) {
    throw new Error('sendSms method must be implemented by adapter');
  }
}

/**
 * Mock SMS Adapter for development, staging, and automated tests.
 */
class MockSmsAdapter extends SmsAdapter {
  async sendSms({ to, message }) {
    if (env.NODE_ENV !== 'test') {
      console.log(`[MOCK SMS] To: ${maskIdentifier(to)} | Message: "${message}"`);
    }
    return {
      success: true,
      provider: 'mock',
      messageId: `mock-sms-${Date.now()}`
    };
  }
}

/**
 * Twilio SMS Adapter (used when SMS_PROVIDER='twilio' and credentials are provided)
 */
class TwilioSmsAdapter extends SmsAdapter {
  constructor(accountSid, authToken, senderNumber) {
    super();
    this.accountSid = accountSid;
    this.authToken = authToken;
    this.senderNumber = senderNumber;
  }

  async sendSms({ to, message }) {
    if (!this.accountSid || !this.authToken) {
      console.warn('[TWILIO NOTICE] Credentials missing. Falling back to simulated delivery.');
      return { success: true, provider: 'twilio-simulated' };
    }

    try {
      const url = `https://api.twilio.com/2010-04-01/Accounts/${this.accountSid}/Messages.json`;
      const auth = Buffer.from(`${this.accountSid}:${this.authToken}`).toString('base64');
      const body = new URLSearchParams({
        To: to,
        From: this.senderNumber,
        Body: message
      });

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body.toString()
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Twilio delivery failed (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      return { success: true, provider: 'twilio', messageId: data.sid };
    } catch (err) {
      console.error('[SMS ERROR]:', err.message);
      throw err;
    }
  }
}

export class NotificationService {
  constructor() {
    this.smsAdapter = this._resolveSmsAdapter();
  }

  _resolveSmsAdapter() {
    switch (env.SMS.provider.toLowerCase()) {
      case 'twilio':
        return new TwilioSmsAdapter(process.env.TWILIO_ACCOUNT_SID, env.SMS.apiKey, env.SMS.senderId);
      case 'mock':
      default:
        return new MockSmsAdapter();
    }
  }

  /**
   * Set custom SMS adapter (useful for testing or plugging in custom vendors).
   */
  setSmsAdapter(adapter) {
    this.smsAdapter = adapter;
  }

  /**
   * Render HTML email template for TripVerse OTP.
   */
  _buildEmailHtml({ fullName, otp, purpose = 'verification' }) {
    const greeting = fullName ? `Hello ${fullName},` : 'Hello,';
    const actionText = purpose === 'signin' ? 'sign in to your TripVerse account' : 'complete your TripVerse registration';

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>TripVerse Verification Code</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f172a; margin: 0; padding: 24px; color: #f8fafc; }
          .container { max-width: 520px; margin: 0 auto; background: #1e293b; border-radius: 16px; border: 1px solid #334155; padding: 36px 32px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.5); }
          .logo { font-size: 26px; font-weight: 800; color: #38bdf8; letter-spacing: -0.5px; margin-bottom: 24px; }
          .title { font-size: 20px; font-weight: 700; margin-bottom: 12px; color: #ffffff; }
          .text { font-size: 15px; color: #94a3b8; line-height: 1.6; margin-bottom: 24px; }
          .otp-card { background: #0f172a; border: 1px dashed #38bdf8; border-radius: 12px; padding: 20px; text-align: center; margin: 24px 0; }
          .otp-code { font-size: 34px; font-weight: 800; letter-spacing: 8px; color: #38bdf8; font-family: 'Courier New', Courier, monospace; }
          .warning { font-size: 13px; color: #64748b; line-height: 1.5; margin-top: 24px; border-top: 1px solid #334155; padding-top: 20px; }
          .footer { text-align: center; margin-top: 24px; font-size: 12px; color: #64748b; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">TripVerse</div>
          <div class="title">Verification Code</div>
          <p class="text">${greeting}</p>
          <p class="text">Use the following one-time password (OTP) to ${actionText}:</p>
          <div class="otp-card">
            <div class="otp-code">${otp}</div>
          </div>
          <p class="text" style="font-size: 13px; color: #cbd5e1;">This code is valid for <strong>${env.OTP.expiryMinutes} minutes</strong> and can only be used once.</p>
          <div class="warning">
            Security Notice: Never share this OTP with anyone. TripVerse employees will never ask for your verification code. If you did not request this, please ignore this email.
          </div>
        </div>
        <div class="footer">&copy; ${new Date().getFullYear()} TripVerse Inc. All rights reserved.</div>
      </body>
      </html>
    `;
  }

  /**
   * Deliver email OTP.
   */
  async sendEmailOtp({ email, otp, fullName = '', purpose = 'verification' }) {
    try {
      const transporter = getMailTransporter();
      const subject = `Your TripVerse Verification Code: ${otp}`;
      const text = `Your TripVerse one-time verification code is: ${otp}. It expires in ${env.OTP.expiryMinutes} minutes. Never share this code.`;
      const html = this._buildEmailHtml({ fullName, otp, purpose });

      const info = await transporter.sendMail({
        from: env.SMTP.from,
        to: email,
        subject,
        text,
        html
      });

      if (env.NODE_ENV !== 'test') {
        console.log(`[MAIL DISPATCHED] To: ${maskIdentifier(email)} | Status: Sent`);
      }

      return { success: true, messageId: info?.messageId };
    } catch (error) {
      console.error(`[MAIL ERROR] Failed to send email to ${maskIdentifier(email)}:`, error.message);
      // In production, re-throw or return status so calling service can handle delivery issues safely
      throw new Error(`Email notification delivery failed: ${error.message}`);
    }
  }

  /**
   * Deliver SMS OTP.
   */
  async sendMobileOtp({ mobileNumber, otp, purpose = 'verification' }) {
    try {
      const message = `Your TripVerse verification code is ${otp}. Valid for ${env.OTP.expiryMinutes} minutes. Do NOT share this code with anyone.`;
      return await this.smsAdapter.sendSms({ to: mobileNumber, message });
    } catch (error) {
      console.error(`[SMS ERROR] Failed to send SMS to ${maskIdentifier(mobileNumber)}:`, error.message);
      throw new Error(`Mobile notification delivery failed: ${error.message}`);
    }
  }
}

export const notificationService = new NotificationService();
export default notificationService;
