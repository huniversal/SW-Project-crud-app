import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { postService } from '../../services/postService';

const PostCreatePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    if(!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }
    try {
      const res = await postService.createPost({ title, content });
      if(res.success) {
        alert("게시글이 성공적으로 작성되었습니다.");
        navigate('/posts');
      } 
    } catch (err) {
      console.error("에러발생 :", err);
      alert("게시글 작성 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  }
  return (
<div>
      <h2>게시글 작성</h2>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>제목:</label>
          <br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            placeholder="제목을 입력하세요"
          />
        </div>
        
        <div style={{ marginBottom: '10px' }}>
          <label>내용:</label>
          <br />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            placeholder="내용을 입력하세요"
          />
        </div>
        
        <div>
          <button type="submit" style={{ marginRight: '10px' }}>
            작성하기
          </button>
          <button type="button" onClick={() => navigate('/posts')}>
            취소
          </button>
        </div>
      </form>
    </div>
  )
}

export default PostCreatePage
