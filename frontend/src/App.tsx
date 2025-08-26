import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PostListPage from './pages/post/PostListPage';

// 홈 페이지 컴포넌트 생성
const HomePage = () => {
  return (
    <div>
      <h2>홈페이지</h2>
      <Link to="/posts">게시판 보기</Link>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div>
        <h1>게시판</h1>
        
        {/* 네비게이션 메뉴 */}
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/" style={{ marginRight: '10px' }}>홈</Link>
          <Link to="/posts">게시글 목록</Link>
        </nav>
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts" element={<PostListPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;