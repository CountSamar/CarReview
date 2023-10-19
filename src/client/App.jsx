
import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { Routes, Route, Navigate } from "react-router-dom";
import "./style.css";
import Login from "./components/Login";
import Profile from "./components/Profile";
import SignUp from "./components/SignUp";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import AdminDashboard from "./components/AdminDashboard";
import ChatHistory from "./components/ChatHistory"; // Import ChatHistory component

export default function App() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState("");
    const [showLogoutMessage, setShowLogoutMessage] = useState(false);
    const [userRole, setUserRole] = useState("");
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        if (token) {
            const decodedToken = jwt_decode(token);
            if (decodedToken && decodedToken.role) {
                setUserRole(decodedToken.role);
            }
        }
    }, [token]);

    return (
        <>
        <div className="title-container">
            {/* <h1 className="app-title">_ _ _ _ _ _</h1> */}
            <h1 className="app-title new-title">Car Wizard</h1>
            </div>
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
                    path="/admin"
                    element={userRole === "admin" ? <AdminDashboard /> : <Navigate to="/" replace />} 
                />
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
                            setUserId={setUserId} 
                        />
                    }
                />
                {/* ChatHistory Route */}
                <Route
                    path="/chat-history/:userName"
                    element={<ChatHistory />} // Remove the 'userName' prop here
                />
            </Routes>
        </>
    );
}
