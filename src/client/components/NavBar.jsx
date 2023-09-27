/*eslint-disable*/
import { Link } from 'react-router-dom'

export default function NavBar() {
  function logOutHandler(event) {
    event.preventDefault()
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.reload()
  }
  
  return (
    <nav className="navbar">
      <Link to="/"><h1 className="logo">Car Review</h1></Link>
      <div className="nav-links">
      <Link to="/">Home</Link>
        <Link to="/review">Review</Link>
        {localStorage.getItem('user') ? (
          <>
            <Link to="/profile">Profile</Link>
            <Link to="/posts" onClick={(e) => logOutHandler(e)}>Log Out</Link>
          </>
        ) : (
          <Link to="/login">Log In</Link>
        )}
      </div>
    </nav>
  )
}
