import mongoose from 'mongoose'
import envConfig from './envConfig.js'

const connectDb = async () => {
  try {
    await mongoose.connect(envConfig.mongo_uri, {
      maxPoolSize: 10,
      minPoolSize: 2,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log("✅ Mongodb Database connection successful! (Thread pool enabled)");
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB database!", error);
    process.exit(1);
  }
}

export default connectDb;