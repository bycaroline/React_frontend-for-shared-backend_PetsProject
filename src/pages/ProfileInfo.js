import React from 'react';

const ProfileInfo = ({ userProfile }) => (
    <div>
        <h2>User Information</h2>
        <p>User ID: {userProfile.userId}</p>
        <p>Username: {userProfile.username}</p>
        {userProfile.admin && <p>Role: Admin</p>} {/* Visa om användaren är admin */}
    </div>
);

export default ProfileInfo;
