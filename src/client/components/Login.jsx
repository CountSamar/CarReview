import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

const Login = ({email, setEmail, password, setPassword, token, setToken}) => {
 
  const [message, setMessage] = useState('');
  let navigate = useNavigate()
  console.log(setPassword)
  console.log(setEmail)

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const showToastMessage = () => {
    toast.success('Login Successful !', {
      position: toast.POSITION.BOTTOM_CENTER
    })
  }

  const login = async() => {
    try {
        const response = await fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            }, 
            body: JSON.stringify({
                email,
                password
            })
        });
        const result = await response.json();
        console.log(result)
        setMessage(result.message);
        if(!response.ok) {
          throw(result)
        }
        if (result.token) {
          setToken(result.token)
          localStorage.setItem('token', result.token)
        }
        console.log(result.token)
        showToastMessage()
        navigate('/Profile')
    } catch (err) {
        console.error(`${err.name}: ${err.message}`);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <div>
      <h2>Login</h2>
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
    </div>
  );
};

export default Login;
