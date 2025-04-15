// File: src/components/TrendingPosts.js
import React from 'react';
import PostCard from './PostCard';

function TrendingPosts({ posts, users, comments }) {
  // Calculate comment count for each post
  const postsWithCommentCount = posts.map(post => ({
    ...post,
    commentCount: comments[post.id] ? comments[post.id].length : 0
  }));
  
  // Sort posts by comment count in descending order
  const trendingPosts = [...postsWithCommentCount]
    .sort((a, b) => b.commentCount - a.commentCount);
  
  return (
    <div className="trending-posts-container">
      <h2>Trending Posts</h2>
      <div className="trending-posts-list">
        {trendingPosts.length > 0 ? (
          trendingPosts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              userName={users[post.userid]}
              comments={comments[post.id] || []}
            />
          ))
        ) : (
          <p>No trending posts available</p>
        )}
      </div>
    </div>
  );
}

export default TrendingPosts;