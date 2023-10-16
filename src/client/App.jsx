import { useState } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import "./style.css";
import Login from "./components/Login";
import Profile from "./components/Profile";
import SignUp from "./components/SignUp";
import NavBar from "./components/NavBar";
import Logout from "./components/Logout";
import Home from "./components/Home";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);

  // Define setUserId as a state setter function
  const [userId, setUserId] = useState("");

  return (
    <>
      <h1>Car Wizard</h1>
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

      <Routes>
        <Route path="/" element={<Home username={username} />} />
        <Route
          path="/profile"
          element={
            <Profile
              username={username}
              setToken={setToken}
              setIsLoggedIn={setIsLoggedIn}
              setShowLogoutMessage={setShowLogoutMessage}
            />
          }
        />
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
              // Pass setUserId as a prop
              setUserId={setUserId}
            />
          }
        />
      </Routes>
    </>
  );
}
