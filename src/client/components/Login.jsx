import React, { useState } from 'react';
import jwt_decode from 'jwt-decode';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import "../login.css";

const BACKEND_URL = "https://carreviewweb.onrender.com";

const Login = ({ email, setEmail, password, setPassword, setToken, setIsLoggedIn, setUsername, setUserId }) => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const showToastMessage = () => toast.success('Login Successful!', { position: toast.POSITION.BOTTOM_CENTER });

  const login = async () => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const result = await response.json();

        if (!response.ok) {
            // Handle server errors
            setMessage(result.message || 'Invalid credentials');
            return;
        }

        const decodedToken = jwt_decode(result.token);

        setToken(result.token);
        sessionStorage.setItem('token', result.token);
        setUsername(decodedToken.user_name);  
        setUserId(decodedToken.id);  
        setIsLoggedIn(true);
        showToastMessage();

        // Check user role
        const roleResponse = await fetch(`${BACKEND_URL}/api/users/check-role`, {
            headers: {
                Authorization: `Bearer ${result.token}`,
            },
        });

        if (!roleResponse.ok) {
            setMessage('Role check failed');
            return;
        }

        const { isAdmin } = await roleResponse.json();

        if (isAdmin) {
            navigate('/admin');
        } else {
            navigate('/profile');
        }

    } catch (err) {
        setMessage('An error occurred during login. Please try again.');
        console.error(`Login error: ${err.message}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <div className="sign-up-container">
      <h2 className="login-heading">Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type='submit'>Login</button>
      </form>
      <p>{message}</p>
      <ToastContainer
        position='bottom-center'
        className='custom-toast-container'
      />
    </div>
  );
};

export default Login;
