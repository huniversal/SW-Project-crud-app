import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI || '';
    // mongoose의 connect 메서드를 사용하여 MongoDB에 연결
    await mongoose.connect(mongoURI);
    console.log("MongoDB Connected Success");
  }
  catch (err) {
    console.error("MongoDB Connected Failed:", err);
    process.exit(1);
  }
}