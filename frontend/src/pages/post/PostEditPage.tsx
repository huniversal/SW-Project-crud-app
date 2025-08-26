import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import {postService} from "../../services/postService"
// import type { Post } from "../../types/index";

const PostEditPage = () => {
  const {id } = useParams<{id: string}>();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchPost = async() => {
      if(!id) return;

      try {
        const res = await postService.getPostById(id);
        if(res.success && res.data) {
          setTitle(res.data.title);
          setContent(res.data.content);
        } else {
          alert("게시글을 불러오는데 실패했습니다.");
          navigate('/posts');
      }
    } catch(err) {
      console.error("에러 발생" , err);
      alert("게시글을 불러오는데 실패했습니다.");
      navigate('/posts');
    }
  }
  fetchPost();
  }, [id, navigate]);

  const handleSubmit = async(e:React.FormEvent) => {
    e.preventDefault();
    if(!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }
    if(!id) return;  

    try {
      const res = await postService.updatePost(id, {
        title: title.trim(),
        content: content.trim(),
      })

      if(res.success) {
        alert("게시글이 성공적으로 수정되었습니다.");
        navigate(`/posts/${id}`);
      } else {
        alert("게시글 수정에 실패했습니다. 다시 시도해주세요.");
    }
  } catch(err) {
      console.error("에러발생 :", err);
      alert("게시글 수정 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  }

  return (
<div>
      <h2>게시글 수정</h2>
      
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
            수정하기
          </button>
          <button type="button" onClick={() => navigate(`/posts/${id}`)}>
            취소
          </button>
        </div>
      </form>
    </div>
  )
}

export default PostEditPage
