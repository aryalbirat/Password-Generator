/**
 * Centralized environment configuration with fallbacks
 * This utility helps prevent "process is not defined" errors
 */

// Safe environment getter function
const getEnv = (key, defaultValue) => {
  // Check if process exists and has env property
  if (typeof process !== 'undefined' && process.env && process.env[key] !== undefined) {
    return process.env[key];
  }
  return defaultValue;
};

// Common environment variables with defaults
export const env = {
  // Server
  PORT: getEnv('PORT', 5000),
  NODE_ENV: getEnv('NODE_ENV', 'development'),
  
  // MongoDB
  MONGO_URI: getEnv('MONGO_URI', 'mongodb://localhost:27017/passwordGenerator'),
  
  // Authentication
  JWT_SECRET: getEnv('JWT_SECRET', 'fallback_dev_secret_replace_in_production'),
  JWT_EXPIRES_IN: getEnv('JWT_EXPIRES_IN', '30d'),
  JWT_COOKIE_EXPIRE: parseInt(getEnv('JWT_COOKIE_EXPIRE', '30')),
  
  // Encryption
  ENCRYPTION_KEY: getEnv('ENCRYPTION_KEY', 'fallback_encryption_key_dev_only'),
  
  // Helper method for safe process exit
  exit: (code) => {
    if (typeof process !== 'undefined' && typeof process.exit === 'function') {
      process.exit(code);
    } else {
      console.error(`Application would exit with code ${code}`);
      // In environments where process.exit isn't available, we can't do much else
    }
  }
};

export default env;
