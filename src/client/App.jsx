import React, { useState } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Profile from "./components/Profile";
import SignUp from "./components/SignUp";
import Login from "./components/Login";

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

      <Routes>
      <Route path="/" element={<Home username= {username} />} />
        <Route path="/profile" element={<PrivateRoute isLoggedIn={isLoggedIn} />}>
          <Route
            index
            element={<Profile
             
              username={username}
              setToken={setToken}
              setIsLoggedIn={setIsLoggedIn}
              setShowLogoutMessage={setShowLogoutMessage}
            />}
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