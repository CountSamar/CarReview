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

  return (
    <>
    <h1>Our Project</h1>
    <NavBar />
    <Login />
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
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
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
            />
          }
      />
    </Routes>
   
   </>
  );
}


