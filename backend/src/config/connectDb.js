import mongoose from 'mongoose'
import envConfig from './envConfig.js'




const connectDb = async () => {

  try {
    await mongoose.connect("mongodb://localhost:27017", {
      dbName: envConfig.db_name,
      maxPoolSize: 10,
      minDHSize: 2,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 4900
    });
    console.log(" ✅ Database connected successfully!");
  } catch (error) {
    console.log(` ❌ Failed to connect Database ${error}`)
  }
}

export default connectDb;