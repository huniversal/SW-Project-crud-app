import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router';
import { postService } from '../../services/postService';
import type { Post } from '../../types/index';

const PostDetailPage = () => {
  const {id} = useParams<{id: string}>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(()=> {
    const fetchPost = async() => {
      if(!id) return;
      try {
        const res = await postService.getPostById(id);
        if(res.success && res.data) {
          setPost(res.data);
        } else {
          alert("게시글을 불러오는데 실패했습니다.");
          navigate('/posts');
        }
      } catch(err) {
        console.error("에러 발생" , err);
        alert("게시글을 불러오는데 실패했습니다.");
        navigate('/posts');
      }
    };
    fetchPost();
  }, [id, navigate]);

  // 게시글 삭제 
  const handleDelete = async() => {
    if(!post) return;

    try {
      const res = await postService.deletePost(post._id);
      if(res.success) {
        alert("게시글이 성공적으로 삭제되었습니다.");
        navigate('/posts');
      } else {
        alert("게시글 삭제에 실패했습니다. 다시 시도해주세요.");
      }
    } catch(err) {
      console.error("에러발생 :", err);
      alert("게시글 삭제 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  }

  if(!post) {
    return <div>로딩...</div>
  }
  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/posts">← 목록으로 돌아가기</Link>
      </div>

      <div style={{ border: '1px solid #ddd', padding: '20px' }}>
        <h2>{post.title}</h2>
        
        <div style={{ color: '#666', marginBottom: '20px', fontSize: '14px' }}>
          작성일: {new Date(post.createdAt).toLocaleString()}
          {post.updatedAt !== post.createdAt && (
            <span> (수정됨: {new Date(post.updatedAt).toLocaleString()})</span>
          )}
        </div>
        
        <div style={{ 
          whiteSpace: 'pre-wrap', 
          lineHeight: '1.6',
          minHeight: '200px'
        }}>
          {post.content}
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <button onClick={() => navigate('/posts')} style={{ marginRight: '10px' }}>
          목록
        </button>
        <button onClick={() => navigate(`/posts/${post._id}/edit`)} style={{ marginRight: '10px' }}>
          수정
        </button>
        <button onClick={handleDelete}>
          삭제
        </button>
      </div>
    </div>
  )
}

export default PostDetailPage
