import express from 'express' // express 웹 서버 제작
import cors from 'cors';  // CORS : FE와 BE 통신 허용
import dotenv from 'dotenv';  // 환경 변수 설정
import {connectDB} from './config/database' // MongoDB 연결
import postRoutes from './routes/post' // 게시글 관련 라우트

// 환경 변수 설정
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


// 미들웨어 설정
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// 라우트 설정
app.use('/api/posts', postRoutes);

// 기본 라우트 
app.get('/', (req, res) => {
  res.json({
    message: '게시판 API 서버입니다.',
    version: '1.0.0',
    endpoints: {
      posts: {
        'GET /api/posts': '모든 게시글 조회',
        'GET /api/posts/:id': '특정 게시글 조회',
        'POST /api/posts': '게시글 작성',
        'PUT /api/posts/:id': '게시글 수정',
        'DELETE /api/posts/:id': '게시글 삭제'
      },
    }
  })
})

// 헬스 체크 라우트
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: '서버 정상 작동', 
    timestamp : new Date().toISOString()
  })
})

// 404 에러 핸들링
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `경로를 찾을 수 없습니다: ${req.originalUrl}`
  });
});

// 서버 시작 함수 
const startServer = async (): Promise<void> => {
  try {
    // MongoDB 연결
    await connectDB();

    // 서버 시작
    app.listen(PORT, () => {
      console.log(`서버가 포트 ${PORT}에서 시작되었습니다.`);
      console.log(`게시글 API: http://localhost:${PORT}/api/posts`);
    })
  } catch(err){
      console.error("서버 시작 실패: ", err);
      process.exit(1);
    }
}

startServer();