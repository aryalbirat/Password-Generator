import CryptoJS from 'crypto-js';
import { env } from './envConfig.js';

// Encrypt data
export const encrypt = (data) => {
  return CryptoJS.AES.encrypt(
    data,
    env.ENCRYPTION_KEY
  ).toString();
};

// Decrypt data
export const decrypt = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(
    encryptedData,
    env.ENCRYPTION_KEY
  );
  return bytes.toString(CryptoJS.enc.Utf8);
};
