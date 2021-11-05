import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import CurrentUserContext from "./CurrentUserContext";


function NavBar({logout}) {

  const {currentUser} = useContext(CurrentUserContext)

  function navbarLoginUser() {
		return (
			<nav className="navbar mr-auto navbar-dark bg-dark">
				<NavLink to="/companies" className="nav-link">Companies</NavLink>
				<NavLink to="/jobs" className="nav-link "> Jobs</NavLink>
				<NavLink to="/profile" className="nav-link "> Profile</NavLink>
        <Link to="/" onClick={logout} className="nav-link "> Logout </Link>
			</nav>
		);
	}


  function navbarLogoutUser() {
    return (
      <nav className="navbar mr-auto navbar-dark bg-dark">
        <NavLink to="/login" className="nav-link"> Login </NavLink>
        <NavLink to="/signup" className="nav-link"> Sign In </NavLink>
      </nav>
    )
  }

  return (
    <nav className="navbar mr-auto navbar-dark bg-dark">
        <NavLink exact to="/" className="navbar-brand p-1">  Jobly </NavLink>
        {currentUser ? navbarLoginUser() : navbarLogoutUser()}
    </nav>
  );
}

export default NavBar;