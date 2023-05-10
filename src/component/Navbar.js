import React from 'react'
import { Link, useLocation, useHistory } from "react-router-dom"

const Navbar = () => {

  let location = useLocation();
  const history = useHistory();
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    history.push("/login");

  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">ORS</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {sessionStorage.getItem('token') ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/"} ? "active":""`} aria-current="page" to="/">Home</Link>
              </li>
             
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Student
                </a>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/addstudent">AddStudent</Link></li>
                  <li><Link className="dropdown-item" to="/studentlist">Student List</Link></li>                              
                </ul>
              </li>

              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/about"} ? "active":""`} aria-current="page" to="/about">About</Link>
              </li>


            </ul> : ""}
            {!sessionStorage.getItem('token') ? <form className="d-flex navForm">
              <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
              <Link className="btn btn-primary mx-1 " to="/login" role="button">Login</Link>
              <Link className="btn btn-primary mx-1 " to="/signup" role="button">SignUp</Link>
            </form>
              : <button onClick={handleLogout} className="btn btn-primary">Logout</button>}

          </div>
        </div>
      </nav>

    </>
  )
}

export default Navbar
