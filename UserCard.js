// File: src/components/UserCard.js
import React from 'react';

function UserCard({ userId, name, commentCount }) {
  return (
    <div className="user-card">
      <div className="user-avatar">
        <img src={`https://picsum.photos/seed/user${userId}/100/100`} alt={name} />
      </div>
      <div className="user-info">
        <h3>{name}</h3>
        <p>{commentCount} comment{commentCount !== 1 ? 's' : ''}</p>
      </div>
    </div>
  );
}

export default UserCard;