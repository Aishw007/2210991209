// File: src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import TopUsers from './components/TopUsers';
import TrendingPosts from './components/TrendingPosts';
import Feed from './components/Feed';
import { fetchUsers, fetchPosts, fetchComments } from './api/apiService';

function App() {
  const [users, setUsers] = useState({});
  const [posts, setPosts] = useState([]);
  const [postComments, setPostComments] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Fetch users
        const usersData = await fetchUsers();
        setUsers(usersData.users);
        
        // Fetch posts for all users
        const allPosts = [];
        const allComments = {};
        
        // Process only a subset of users to minimize API calls
        const userIds = Object.keys(usersData.users).slice(0, 7);
        
        for (const userId of userIds) {
          try {
            const userPosts = await fetchPosts(userId);
            if (userPosts && userPosts.posts) {
              // Add user info to each post
              const postsWithUser = userPosts.posts.map(post => ({
                ...post,
                userName: usersData.users[post.userid]
              }));
              
              allPosts.push(...postsWithUser);
              
              // Fetch comments for each post
              for (const post of postsWithUser) {
                try {
                  const comments = await fetchComments(post.id);
                  if (comments && comments.comments) {
                    allComments[post.id] = comments.comments;
                  }
                } catch (error) {
                  console.error(`Error fetching comments for post ${post.id}:`, error);
                }
              }
            }
          } catch (error) {
            console.error(`Error fetching posts for user ${userId}:`, error);
          }
        }
        
        setPosts(allPosts);
        setPostComments(allComments);
      } catch (err) {
        setError('Failed to load data. Please try again later.');
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  // Calculate comment counts for each user's posts
  const getUserCommentCounts = () => {
    const userCommentCounts = {};
    
    posts.forEach(post => {
      const userId = post.userid;
      const postId = post.id;
      const commentsForPost = postComments[postId] || [];
      
      if (!userCommentCounts[userId]) {
        userCommentCounts[userId] = 0;
      }
      
      userCommentCounts[userId] += commentsForPost.length;
    });
    
    return userCommentCounts;
  };

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>Social Media Analytics Dashboard</h1>
          <nav>
            <ul className="nav-links">
              <li><Link to="/">Feed</Link></li>
              <li><Link to="/top-users">Top Users</Link></li>
              <li><Link to="/trending">Trending Posts</Link></li>
            </ul>
          </nav>
        </header>
        
        <main className="app-content">
          {loading ? (
            <div className="loading">Loading data, please wait...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : (
            <Routes>
              <Route 
                path="/" 
                element={<Feed posts={posts} users={users} comments={postComments} />} 
              />
              <Route 
                path="/top-users" 
                element={<TopUsers users={users} commentCounts={getUserCommentCounts()} />} 
              />
              <Route 
                path="/trending" 
                element={<TrendingPosts posts={posts} users={users} comments={postComments} />} 
              />
            </Routes>
          )}
        </main>
        
        <footer className="app-footer">
          <p>Social Media Analytics Dashboard © 2025</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;