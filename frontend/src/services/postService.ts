import api from './api';
import type { ApiResponse, Post, PostFormData } from '../types/index';

export const postService = {
  // 모든 게시글 조회
  getAllPosts: async (): Promise<ApiResponse<Post[]>> => {
    const response = await api.get('/posts');
    return response.data;
  },

  // 특정 게시글 조회
  getPostById: async (id: string): Promise<ApiResponse<Post>> => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },

  // 게시글 작성
  createPost: async (postData: PostFormData): Promise<ApiResponse<Post>> => {
    const response = await api.post('/posts', postData);
    return response.data;
  },

  // 게시글 수정
  updatePost: async (id: string, postData: PostFormData): Promise<ApiResponse<Post>> => {
    const response = await api.put(`/posts/${id}`, postData);
    return response.data;
  },

  // 게시글 삭제
  deletePost: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  },
};