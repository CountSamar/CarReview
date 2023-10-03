// SignUp.jsx
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

function SignUp({ setToken }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
  });

  const showToastMessage = () => {
    toast.success('Sign Up Successful !', {
      position: toast.POSITION.BOTTOM_CENTER
    })
  }

  const register = async() => {
    try {
        const response = await fetch('http://localhost:3000/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            }, 
            body: JSON.stringify({
                email: formData.email,
                password: formData.password,
                name: formData.firstName + ' ' + formData.lastName,
                username: formData.username
            })
        });
        const result = await response.json();
        setMessage(result.message);
        if(!response.ok) {
          throw(result)
        }
        if (result.token) {
          setToken(result.token)
          localStorage.setItem('token', result.token)}
        showToastMessage()
    } catch (err) {
        console.error(`${err.name}: ${err.message}`);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //
    console.log('SignUp Form has been submitted:', formData);
    register()
    // reset the form after account has been made
    setFormData({
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create User</button>
      </form>
    </div>
  );
}

export default SignUp;
