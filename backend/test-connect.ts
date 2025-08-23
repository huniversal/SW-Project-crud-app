// test-connection.ts
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// 환경변수 로드
console.log('환경변수 로드');
const result = dotenv.config();
console.log('dotenv 결과:', result);

async function testConnection() {
  try {
    const mongoURI = process.env.MONGODB_URI || '';
    await mongoose.connect(mongoURI);
    
    console.log('MongoDB 연결 성공!');
  
    await mongoose.disconnect();
    console.log('연결 해제 완료');
    
  } catch (error) {
    console.error('연결 실패:', error);
  }
}

testConnection();