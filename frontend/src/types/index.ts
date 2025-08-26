// API 응답 타입
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  count?: number;
  error?: string;
}

// 게시글 타입
export interface Post {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

// 게시글 수정 및 삭제 사용 타입
export interface PostFormData {
  title: string; 
  content: string;
}

// 라우트 파라미터 타입
export interface PostParams {
  id: string;
}