import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom'
import Login from './components/Login';
import Profile from './components/Profile';
import Review from './components/Review';
import SignUp from './components/SignUp';
import NavBar from './components/NavBar';
import LikeButton from './components/LikeButton';
import WriteReview from './components/WriteReview';
import Logout from './components/Logout';
import Home from './components/Home';
import SendMessage from './components/SendMessage';
import ReceiveMessage from './components/ReceiveMessage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';


export default function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState('')

  console.log(email)
  console.log(password)
  console.log(token)
  return (
    <>
    <h1>Our Project</h1>
    <NavBar />
    <LikeButton />
    <Review />
    {/* <Login /> */}
    <Routes>
      <Route path="/" element={<Home />}/>
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


