import { Request, Response } from 'express';
import Post from "../models/Post"
import { create } from 'domain';

// 모든 게시글 조회 
export const getPosts = async(req: Request, res: Response): Promise<void> => {
  try {
    const posts = await Post.find().sort({createdAt: -1}); // 작성일 기준 내림차순 정렬
    res.status(200).json({
      success: true, 
      count: posts.length,
      data: posts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "서버 오류로 게시글을 불러올 수 없습니다.",
    })
  }
}