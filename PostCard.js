// File: src/components/PostCard.js
import React from 'react';

function PostCard({ post, userName, comments }) {
  // Generate a random image for the post
  const getRandomImage = () => {
    const width = 300;
    const height = 200;
    const randomId = Math.floor(Math.random() * 1000);
    return `https://picsum.photos/seed/${post.id || randomId}/${width}/${height}`;
  };
  
  return (
    <div className="post-card">
      <div className="post-header">
        <div className="user-avatar">
          <img src={`https://picsum.photos/seed/user${post.userid}/50/50`} alt="User" />
        </div>
        <div className="post-info">
          <h3 className="user-name">{userName}</h3>
          <span className="post-id">Post #{post.id}</span>
        </div>
      </div>
      
      <div className="post-image">
        <img src={getRandomImage()} alt="Post" />
      </div>
      
      <div className="post-content">
        <p>{post.content}</p>
      </div>
      
      <div className="post-stats">
        <span className="comment-count">
          {comments.length} comment{comments.length !== 1 ? 's' : ''}
        </span>
      </div>
      
      {comments.length > 0 && (
        <div className="post-comments">
          <h4>Comments</h4>
          <ul className="comments-list">
            {comments.map(comment => (
              <li key={comment.id} className="comment">
                <p className="comment-content">{comment.content}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PostCard;