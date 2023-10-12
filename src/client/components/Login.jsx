import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



const customToastContainerStyle = {
  
  
};
const Login = ({email, setEmail, password, setPassword, token, setToken, setIsLoggedIn, setUsername, setUserId }) => {
  const navigate = useNavigate();
 
  // const [message, setMessage] = useState('');
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
   const [message, setMessage] = useState("")

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

  const login = async () => {
    try {
        const response = await fetch('/api/users/login', {
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
        setMessage(result.message);
        if(!response.ok) {
          throw(result)
        }
        if (result.token) {
          setToken(result.token)
          localStorage.setItem('token', result.token)
          setUsername(result.username);
          setUserId(result.userId);

          setIsLoggedIn(true)
        }
        console.log(result.token)
        showToastMessage()
        navigate('/profile');
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
      <ToastContainer
  position="bottom-center"
  className="custom-toast-container"
  style={customToastContainerStyle} 
/>


    </div>

  );
};

export default Login;
