import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


export default function Logout() {
    const [token, setToken] = useState(sessionStorage.getItem("token"))
    const navigate = useNavigate()
    useEffect(() => {
        if (token) {
            sessionStorage.removeItem("token") ;
            navigate("/login")
        } else {
            sessionStorage.removeItem("token") ;
            navigate("/login")
        }
        
      
    }, [])
    
    
  return (
    <div>
        <h3>You have successfully logged out!</h3>
    </div>
  )
}
