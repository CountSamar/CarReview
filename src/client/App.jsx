import React, { useState } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";


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
      <Route path="/" element={<Home username= {username} />} />
        <Route path="/profile" element={<PrivateRoute isLoggedIn={isLoggedIn} />}>
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
        <Route path="/editreview" element={<PrivateRoute isLoggedIn={isLoggedIn} />}>
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

      </Routes>
    </>
  );
}