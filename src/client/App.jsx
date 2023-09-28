import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom'
import Login from './components/Login';
import Home from './components/Home';
import Profile from './components/Profile';
import Review from './components/Review';
import SignUp from './components/SignUp';
import NavBar from './components/NavBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


export default function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJ0cmVudGpvaG5icm93bkBnbWFpbC5jb20iLCJpYXQiOjE2OTU4NTkzODUsImV4cCI6MTY5NjQ2NDE4NX0.1htdT8mlcvB8W2BUrus77q13C26RsUJr41ROd6f-zt8')
  console.log(setEmail)
  console.log(setPassword)
  console.log(token)
  return (
    <>
    <h1>Our Project</h1>
    <NavBar />
    {/* <Login /> */}
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route
        path="/Profile"
        element={
          <Profile 
            username={username}
            />
        }
      />
      <Route 
        path="/Review"
        element={<Review />}/>  
      <Route
        path='/Login'
        element={
          <Login 
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            token={token}
            setToken={setToken}
            />
          }
        />

      <Route 
        path='/register'
        element={
          <SignUp 
            email={email}
            setEmail={setEmail}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            token={token}
            setToken={setToken}
            />
          }
      />
    </Routes>
    <ToastContainer />
   </>
  );
}


