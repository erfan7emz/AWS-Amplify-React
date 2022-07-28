import React from 'react'
import { NavLink } from 'react-router-dom';

const Navbar = ({ user }) => {
    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <NavLink to='/' className="navbar-brand">ToolBox</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <NavLink to='/list' className="nav-link active" aria-current="page">List</NavLink>
                    {!user && 
                    <React.Fragment>
                    <NavLink to='/login' className="nav-link">Login</NavLink>
                    <NavLink to='/sign-up' className="nav-link">Join</NavLink>
                    </React.Fragment>
                    }
                    {user && 
                    <React.Fragment>
                    <NavLink to='/logout' className="nav-link mr-5">Logout</NavLink>
                    <NavLink to='/' className="navbar-brand ml-5">Welcome {user.firstName} {user.lastName}</NavLink>
                    </React.Fragment>
                    }
                </div>
                </div>
            </div>
        </nav>
    );
}
 
export default Navbar;