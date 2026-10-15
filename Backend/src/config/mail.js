import nodemailer from 'nodemailer';
import { env } from './env.js';

let transporter = null;

/**
 * Get or create the Nodemailer transporter.
 * If SMTP host is not configured, creates a stream/JSON test transporter or mock transporter
 * so local development doesn't break.
 */
export const getMailTransporter = () => {
  if (transporter) {
    return transporter;
  }

  const isConfigured = Boolean(env.SMTP.host && env.SMTP.user);

  if (isConfigured) {
    transporter = nodemailer.createTransport({
      host: env.SMTP.host,
      port: env.SMTP.port,
      secure: env.SMTP.port === 465,
      auth: {
        user: env.SMTP.user,
        pass: env.SMTP.password
      }
    });
  } else {
    // Development fallback: Logs emails to console or returns mock transport
    transporter = nodemailer.createTransport({
      jsonTransport: true
    });
  }

  return transporter;
};

/**
 * Allow overriding mail transporter for tests or custom adapters.
 */
export const setMailTransporter = (customTransporter) => {
  transporter = customTransporter;
};

/**
 * Verify SMTP connection safely.
 */
export const verifyMailConnection = async () => {
  if (!env.SMTP.host) {
    console.log('[MAIL] SMTP host not specified. Running in simulated mail mode.');
    return true;
  }

  try {
    const currentTransporter = getMailTransporter();
    await currentTransporter.verify();
    console.log(`[MAIL] Connected to SMTP server (${env.SMTP.host}:${env.SMTP.port})`);
    return true;
  } catch (error) {
    console.warn(`[MAIL NOTICE] Could not connect to SMTP server: ${error.message}`);
    return false;
  }
};

export default {
  getMailTransporter,
  setMailTransporter,
  verifyMailConnection
};
