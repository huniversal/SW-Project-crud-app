import dotenv from 'dotenv';
import { connectDB } from './src/config/database';
import Post from './src/models/Post';

// 환경변수 로드
dotenv.config();

async function testPostModel(): Promise<void> {
  try {
    // MongoDB 연결
    await connectDB();
    console.log('Post 모델 테스트 시작');
    
    // 새 게시글 생성
    const newPost = new Post({
      title: "테스트 게시글",
      content: "이것은 테스트용 게시글입니다."
    });
    
    // 저장
    const savedPost = await newPost.save();
    console.log('게시글 저장 성공:', savedPost);
    
    // 전체 게시글 조회
    const allPosts = await Post.find();
    console.log('총 게시글 수:', allPosts.length);
    
    console.log('테스트 완료!');
    
  } catch (error) {
    console.error('테스트 실패:', error);
  }
}

// 테스트 실행
testPostModel();