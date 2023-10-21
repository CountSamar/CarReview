import React, { useState, useEffect } from 'react';
import "../Userman.css"
const BACKEND_URL = "https://carreviewweb.onrender.com";
function UserManagement() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [confirmationMessage, setConfirmationMessage] = useState(null);

    

    useEffect(() => {
        // Fetch all users from the API
        fetch(`${BACKEND_URL}/api/users`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data && data.success) {
                    setUsers(data.data); // Assuming your API response structure has a `data` key for actual users.
                }
            })
            .catch(err => setError(err.message));
    }, []);

    const toggleUserRole = (userId, currentRole) => {
        const newRole = currentRole === 'admin' ? 'user' : 'admin';
        fetch(`${BACKEND_URL}/api/users/${userId}/role`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ role: newRole })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(({ data: updatedUser }) => {  // Destructure the data property here
            setUsers(prevUsers => {
                return prevUsers.map(user => 
                    user.id === updatedUser.id ? updatedUser : user
                );
            });
            setConfirmationMessage(`User ${updatedUser.name} has been updated to ${updatedUser.role}.`);
            setTimeout(() => {
                setConfirmationMessage(null);
            }, 3000);  // Clears the message after 3 seconds
        })
        .catch(err => setError(err.message));
    }

    return (
        <div className="user-management">
            <h2>User Management</h2>
            
            {error && <div className="error-message">{error}</div>}
            {confirmationMessage && <div className="confirmation-message">{confirmationMessage}</div>}

            {/* Display a list of users */}
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name} - {user.email} - Role: {user.role}
                        <button onClick={() => toggleUserRole(user.id, user.role)}>
                            {user.role === 'admin' ? 'Set as User' : 'Set as Admin'}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserManagement;
