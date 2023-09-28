import { useState } from 'react';
import reactLogo from './assets/react.svg';
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login';
import Profile from './components/Profile';
import Review from './components/Review';
import SignUp from './components/SignUp';
import NavBar from './components/NavBar';
import WriteReview from './components/WriteReview';
import Logout from './components/Logout';

function App() {
  const [count, setCount] = useState(0);

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

export default App;
