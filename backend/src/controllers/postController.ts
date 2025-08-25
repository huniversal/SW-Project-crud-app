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

// 특정 게시글 조회
export const getPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      res.status(404).json({
        success: false,
        message: '게시글을 찾을 수 없습니다.'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '게시글을 불러오는데 실패했습니다.',
    });
  }
};

// 게시글 작성 
export const createPost = async(req: Request, res: Response): Promise<void> => {
  try {
    const {title, content} = req.body;
    if(!title || !content) {
      res.status(400).json({
        success: false, 
        message: "제목과 내용을 모두 입력해주세요."
      })
      return;
    }
    const post = await Post.create({title, content});

    res.status(201).json({
      success: true, 
      message: '게시글이 성공적으로 작성되었습니다.',
      data: post
    })
  } catch(err){
    res.status(500).json({
      success: false, 
      message: "서버 오류로 게시글 작성에 실패했습니다."
    })
  }
}

// 게시글 수정
export const updatePost = async(req: Request, res: Response): Promise<void> => {
  try {
    const { title, content } = req.body;

    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {title, content},
      { new: true, runValidators: true }
    )
    if(!post) {
      res.status(404).json({
        success: false, 
        message: "게시글을 찾을 수 없습니다.",
      })
      return;
    }
    res.status(200).json({
      success: true, 
      message: "게시글이 성공적으로 수정되었습니다.",
      data: post
    })
  } catch(err){
    res.status(500).json({
      success: false, 
      message: "서버 오류로 게시글 수정에 실패했습니다."
    })
  }
}

// 게시글 삭제
export const deletePost = async(req: Request, res: Response): Promise<void> => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id);
    if(!post){
      res.status(404).json({
        success: false, 
        message: "게시글을 찾을 수 없습니다.",
      })
      return;
    }
    res.status(200).json({
      success: true, 
      message: "게시글이 성공적으로 삭제되었습니다.",
      data: {}
    })
  } catch(err){
    res.status(500).json({
      success: false, 
      message: "서버 오류로 게시글 삭제에 실패했습니다."
    })
  }
}