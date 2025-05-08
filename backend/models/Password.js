import mongoose from 'mongoose';
import CryptoJS from 'crypto-js';
import { env } from '../utils/envConfig.js';

const PasswordSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Please add a title for this password'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  password: {
    type: String,
    required: [true, 'Please add a password value']
  },
  website: {
    type: String,
    trim: true
  },
  username: {
    type: String,
    trim: true
  },
  notes: {
    type: String,
    trim: true
  },
  tags: [String],
  category: {
    type: String,
    trim: true
  },
  length: {
    type: Number,
    min: [1, 'Password length must be at least 1 character']
  },
  usedSpecialChars: {
    type: Boolean,
    default: false
  },
  usedNumbers: {
    type: Boolean,
    default: false
  },
  lastAccessed: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Encrypt password before saving
PasswordSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  // Encrypt the password
  this.password = CryptoJS.AES.encrypt(
    this.password, 
    env.ENCRYPTION_KEY
  ).toString();
  
  next();
});

// Add method to decrypt password
PasswordSchema.methods.getDecryptedPassword = function() {
  const bytes = CryptoJS.AES.decrypt(
    this.password, 
    env.ENCRYPTION_KEY
  );
  return bytes.toString(CryptoJS.enc.Utf8);
};

// Update lastAccessed when password is viewed
PasswordSchema.methods.updateLastAccessed = async function() {
  this.lastAccessed = Date.now();
  await this.save();
};

const Password = mongoose.model('Password', PasswordSchema);

export default Password;
