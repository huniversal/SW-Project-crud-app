import express from 'express' // express 웹 서버 제작
import cors from 'cors';  // CORS : FE와 BE 통신 허용
import dotenv from 'dotenv';  // 환경 변수 설정
import {connectDB} from './config/database' // MongoDB 연결
import { version } from 'os';

// 환경 변수 설정
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 미들웨어 설정
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// 기본 라우트 
app.get('/', (req, res) => {
  res.json({
    message: '게시판 API 서버입니다.',
    version: '1.0.0',
    endpoints: ['/api/health', '/api/posts']
  })
})

// 헬스 체크 라우트
app.get('api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: '서버 정상 작동', 
    timestamp : new Date().toISOString()
  })
})

// 서버 시작 함수 
const startServer = async (): Promise<void> => {
  try {
    // MongoDB 연결
    await connectDB();

    // 서버 시작
    app.listen(PORT, () => {
      console.log(`서버가 포트 ${PORT}에서 시작되었습니다.`);
    })
  } catch(err){
      console.error("서버 시작 실패: ", err);
      process.exit(1);
    }
}

startServer();