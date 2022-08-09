import React, { useContext, useState } from 'react'
import {NavLink, useNavigate} from 'react-router-dom';
import img from './pic.png';
import { UserContext } from "../userContext";

const Header = () => {

  const navigate = useNavigate();
  
  const {loggedIn, setLoggedIn} = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  const logout = () => {
    sessionStorage.removeItem("user")
    setLoggedIn(false)
    navigate('/login');
  }







  return (
    <div>
{/* <!-- Navbar --> */}
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  {/* <!-- Container wrapper --> */}
  <div class="container-fluid">
    {/* <!-- Toggle button --> */}
    <button
      class="navbar-toggler"
      type="button"
      data-mdb-toggle="collapse"
      data-mdb-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i class="fas fa-bars"></i>
    </button>

    {/* <!-- Collapsible wrapper --> */}
    <div class="collapse navbar-collapse" id="navbarSupportedContent">

      {/* <!-- Left links --> */}
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      <li class="nav-item">
            <NavLink className="nav-link" to="/register">
               Sign Up
            </NavLink>
        </li>
        <li class="nav-item">
            <NavLink className="nav-link" to="/login">
               Log-in
            </NavLink>
        </li>
        <li class="nav-item">
            <NavLink className="nav-link" to="/browse">
               Browse
            </NavLink>
        </li>
        <li class="nav-item">
            <NavLink className="nav-link" to="/upload">
               Upload
            </NavLink>
        </li>
        
      </ul>
      {/* <!-- Left links --> */}
    </div>
    {/* <!-- Collapsible wrapper --> */}


    {/* <!-- Right elements --> */}
    {loggedIn ? (
    <div class="d-flex align-items-center">
      {/* <!-- Avatar --> */}
      <div class="dropdown">
        <a
          class="dropdown-toggle d-flex align-items-center hidden-arrow"
          href="#"
          id="navbarDropdownMenuAvatar"
          role="button"
          data-mdb-toggle="dropdown"
          aria-expanded="false"
        >
          {/* <lord-icon
              src="https://cdn.lordicon.com/pneolqso.json"
              trigger="hover"
              colors="primary:#121331,secondary:#848484,tertiary:#646e78,quaternary:#66eece,quinary:#ebe6ef"
              style={{height:'35px'}}>
          </lord-icon> */}

          <img
            src={img}
            height="35"
            alt="Podcast logo"
            loading="lazy"
          />
        </a>
        <ul
          class="dropdown-menu dropdown-menu-end"
          aria-labelledby="navbarDropdownMenuAvatar"
        >
          <li>
            <button className="dropdown-item" onClick={logout}>
               Logout
            </button>
          </li>
    
         
        </ul>
      </div>
    </div>
     ) : (
      ""
     )}
    {/* <!-- Right elements --> */}
  </div>
  {/* <!-- Container wrapper --> */}
</nav>
{/* <!-- Navbar --> */}


    </div>
  )
}

export default Header