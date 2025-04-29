import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); 

mongoose.set('strictQuery', false);

const connecttodb = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB connected: ${mongoose.connection.name} @ ${mongoose.connection.host}:${mongoose.connection.port}`);
  } catch (e) {
    console.log('❌ MongoDB connection error:', e.message);
    process.exit(1);
  }
};
export default connecttodb; 
