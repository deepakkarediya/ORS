import React, { useContext, useEffect } from 'react'
import { Link, useLocation, useHistory } from "react-router-dom"
import NoteContext from '../context/noteContext';
const Navbar2 = () => {
    const notecontext = useContext(NoteContext);
    const { particularstudent,fetchparticularstudent } = notecontext;
    let location = useLocation();
    const history = useHistory();
    
    useEffect(() => {
     
      if(sessionStorage.getItem('token')){
        fetchparticularstudent();
      }
    },[]);
   
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
           <ul className="navbar-nav me-auto mb-2 mb-lg-0">
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
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Marksheet
                </a>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/addmarksheet">Addmarksheet</Link></li>
                  <li><Link className="dropdown-item" to="/marksheetlist">Marksheet List</Link></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  College
                </a>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/addcollege">Addcollege</Link></li>
                  <li><Link className="dropdown-item" to="/collegelist">College List</Link></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Role
                </a>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/addrole">Addrole</Link></li>
                  <li><Link className="dropdown-item" to="/rolelist">Role List</Link></li>
                </ul>
              </li>

              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/studentdata"} ? "active":""`} aria-current="page" to="/studentdata">User data</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/about"} ? "active":""`} aria-current="page" to="/about">About</Link>
              </li>


            </ul> 

            
              
                 
                  <div className="btn-group">
                    <button className="btn btn-success btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
                    <i className="fa-solid fa-user"></i> {particularstudent.fname}&nbsp;{particularstudent.lname}
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-start">
                      <li><button className="dropdown-item btn-sm  " onClick={handleLogout} >Logout</button></li>
                     
                    </ul>
                  </div>
                
            

          </div>
        </div>
      </nav>

      
    </>
  )
}

export default Navbar2
