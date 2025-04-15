// File: src/components/Feed.js
import React, { useState, useEffect } from 'react';
import PostCard from './PostCard';

function Feed({ posts, users, comments }) {
  const [feedPosts, setFeedPosts] = useState([]);
  
  useEffect(() => {
    // Sort posts by ID in descending order to show newest first
    // (assuming higher IDs are newer posts)
    const sortedPosts = [...posts].sort((a, b) => b.id - a.id);
    setFeedPosts(sortedPosts);
  }, [posts]);
  
  return (
    <div className="feed-container">
      <h2>Latest Posts</h2>
      <div className="posts-feed">
        {feedPosts.length > 0 ? (
          feedPosts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              userName={users[post.userid]}
              comments={comments[post.id] || []}
            />
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </div>
  );
}

export default Feed;