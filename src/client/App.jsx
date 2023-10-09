import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import NavBar from './components/NavBar'; // Importing NavBar
import Home from './components/Home';
import Profile from './components/Profile'; 
import SignUp from './components/SignUp';
import Login from './components/Login';



export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');

  return (
    <>
      <h1>Car Review</h1>
      <NavBar /> {/* Displaying NavBar at the top */}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route 
          path="/signup" 
          element={
            <SignUp 
              email={email} 
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              username={username}
              setUsername={setUsername}
              token={token}
              setToken={setToken}
            />} 
        />
        <Route 
          path="/login" 
          element={
            <Login 
              email={email} 
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              token={token}
              setToken={setToken}
            />} 
        />
        
        {/* ... any other routes you may have ... */}
      </Routes>
    </>
  );
}

