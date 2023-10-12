import { useState, useEffect } from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom'
import './style.css'
import Login from './components/Login';
import Profile from './components/Profile';
import Review from './components/Review';
import SearchBar from './components/SearchBar'
import SignUp from './components/SignUp';
import NavBar from './components/NavBar';
import WriteReview from './components/WriteReview';
import Logout from './components/Logout';
import Home from './components/Home';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import StarRating from './components/StarRating';
import SearchResults from './components/SearchResults';
function PrivateRoute({ isLoggedIn }) {
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
}

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(""); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);

  return (
    <>
      <h1>Car Review</h1>
      {showLogoutMessage && <p>Successfully logged out!</p>}
      <NavBar
        setToken={setToken}
        setIsLoggedIn={setIsLoggedIn}
        isLoggedIn={isLoggedIn}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        token={token}
        setShowLogoutMessage={setShowLogoutMessage}
      />
      <SearchBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/profile"
          element={<PrivateRoute isLoggedIn={isLoggedIn} />}
        >
          <Route
            index
            element={
              <Profile
                username={username}
                setToken={setToken}
                setIsLoggedIn={setIsLoggedIn}
                setShowLogoutMessage={setShowLogoutMessage}
              />
            }
          />
        </Route>
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
            />
          }
        />
        <Route
          path="/search-results"
          element={<SearchResults token={token} />}
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
              setIsLoggedIn={setIsLoggedIn}
              setUsername={setUsername}
              setUserId={setUserId}
            />
          }
        />
      </Routes>
    </>
  );
}
