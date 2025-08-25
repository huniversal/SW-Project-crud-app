import express from 'express';
import { 
  getPosts, 
  getPost, 
  createPost,   
  updatePost,
  deletePost 
} from '../controllers/postController';

const router = express.Router();

// GET /api/posts - 모든 게시글 조회
router.get('/', getPosts);

// GET /api/posts/:id - 특정 게시글 조회
router.get('/:id', getPost);

// POST /api/posts - 게시글 작성
router.post('/', createPost);

// PUT /api/posts/:id - 게시글 수정
router.put('/:id', updatePost);

// DELETE /api/posts/:id - 게시글 삭제
router.delete('/:id', deletePost);

export default router;