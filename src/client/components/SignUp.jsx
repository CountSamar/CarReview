import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom'
const BACKEND_URL = "http://localhost:5001";

function SignUp({ setToken }) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
    });

    const showToastMessage = (message, type = 'success') => {
        if(type === 'success') {
            toast.success(message, {
                position: toast.POSITION.BOTTOM_CENTER
            });
        } else {
            toast.error(message, {
                position: toast.POSITION.BOTTOM_CENTER
            });
        }
    }

    const register = async() => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/users/register`,  {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                }, 
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    name: `${formData.firstName} ${formData.lastName}`,
                    username: formData.username
                })
            });
          
            const result = await response.json();

            if(!response.ok) {
                throw new Error(result.message || "Something went wrong!");
            }

            showToastMessage('Sign Up Successful !');
            if (result.token) {
                setToken(result.token);
        sessionStorage.setItem('token', result.token);
                // Resetting form only on successful registration
                setFormData({
                    firstName: '',
                    lastName: '',
                    username: '',
                    email: '',
                    password: '',
                });
            }
        } catch (err) {
            console.error(err.message);
            showToastMessage(err.message, 'error');
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('SignUp Form has been submitted:', formData);
        register();
    };

    return (
        <div>
            <h2>Create User</h2>
            <form onSubmit={handleSubmit}>
    <div>
        <label>First Name:</label>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
    </div>
    <div>
        <label>Last Name:</label>
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
    </div>
    <div>
        <label>Username:</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} />
    </div>
    <div>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
    </div>
    <div>
        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
    </div>
    <button type="submit">Create User</button>
</form>

            {/* Including ToastContainer to handle the toasts */}
            <ToastContainer />
        </div>
    );
}

export default SignUp;