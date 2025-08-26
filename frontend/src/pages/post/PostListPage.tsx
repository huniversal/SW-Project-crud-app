import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { postService } from '../../services/postService'
import type { Post } from '../../types/index'

const PostListPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    const fetchPosts = async() => {
      try {
        const res = await postService.getAllPosts();
        if(res.success && res.data) {
          setPosts(res.data);
        }
      } catch (err) {
        console.error("에러발생: ", err);
      }
    };
    fetchPosts();
  }, [])
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>게시글 목록</h2>
        <Link to="/posts/create">
          <button>게시글 작성</button>
        </Link>
      </div>
      
      <table style={{ width: '100%', marginTop: '20px' }}>
        <thead>
          <tr>
            <th>제목</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post._id}>
              <td>{post.title}</td>
              <td>{new Date(post.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PostListPage
