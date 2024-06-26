export const CREDENTIALS = process.env.CREDENTIALS === "true";
export const {
  NODE_ENV,
  PORT,
  SECRET_KEY,
  LOG_DIR,
  ORIGIN,
  POSTGRES_DB,
  POSTGRES_PASSWORD,
  POSTGRES_USER,
  POSTGRES_HOST,
  SMTP_PORT,
  MAIL_HOST,
  FROM_EMAIL = 'no-reply@example.com'
} = process.env;
