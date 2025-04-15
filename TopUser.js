// File: src/components/TopUsers.js
import React from 'react';
import UserCard from './UserCard';

function TopUsers({ users, commentCounts }) {
  // Sort users by comment count in descending order
  const sortedUsers = Object.keys(commentCounts)
    .sort((a, b) => commentCounts[b] - commentCounts[a])
    .slice(0, 5); // Get top 5 users
  
  return (
    <div className="top-users-container">
      <h2>Top Users by Comments</h2>
      <div className="top-users-list">
        {sortedUsers.length > 0 ? (
          sortedUsers.map((userId) => (
            <UserCard 
              key={userId}
              userId={userId}
              name={users[userId]}
              commentCount={commentCounts[userId]}
            />
          ))
        ) : (
          <p>No user data available</p>
        )}
      </div>
    </div>
  );
}

export default TopUsers;