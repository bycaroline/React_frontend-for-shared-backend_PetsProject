import React from 'react';

const UpdateUserForm = ({ updateUser, setUpdateUser, handleUpdateUser }) => (
    <form onSubmit={handleUpdateUser}>
        <input
            type="text"
            placeholder="New Username"
            value={updateUser.username}
            onChange={(e) => setUpdateUser({ ...updateUser, username: e.target.value })}
            required
        />
        <button type="submit">Update User</button>
    </form>
);

export default UpdateUserForm;
