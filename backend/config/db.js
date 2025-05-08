import mongoose from 'mongoose';
import { env } from '../utils/envConfig.js';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    env.exit(1);
  }
};

export default connectDB;
