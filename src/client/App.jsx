import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom'
import Login from './components/Login';
import Home from './components/Home';
import Profile from './components/Profile';
import Review from './components/Review';
import SignUp from './components/SignUp';
import NavBar from './components/NavBar';
import WriteReview from './components/WriteReview';
import Logout from './components/Logout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


export default function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState('')
  console.log(setEmail)
  console.log(setPassword)
  console.log(token)
  return (
    <>
    <NavBar />
    <div className='App'>
        <h1>Capstone Project</h1>
        

        <Routes>
          <Route path='/' element={<Profile />} />
          <Route path='/reviews' element={<Review />} />
          <Route path='/review/new' element={<WriteReview />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
        </Routes>
    </div>
    </>
  );
}


