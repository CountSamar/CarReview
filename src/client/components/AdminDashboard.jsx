import React from 'react';

import UserManagement from './UserManagement';
import ReviewManagement from './ReviewManagement'; // Importing the ReviewManagement component

function AdminDashboard() {
    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            
            <UserManagement />
            <ReviewManagement />  {/* Using the ReviewManagement component */}
        </div>
    );
}

export default AdminDashboard;
