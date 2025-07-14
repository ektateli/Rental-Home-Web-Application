import React from 'react';

const UserProfile = ({ profile }) => {
  if (!profile) return null;

  return (
    <div className="profile-card shadow-sm p-3 mb-4 bg-light rounded">
      <h5 className="mb-2">👋 Welcome, {profile.name}</h5>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Role:</strong> {profile.role}</p>
    </div>
  );
};

export default UserProfile;
