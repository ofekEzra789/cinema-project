import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import './Navbar.css';


export class Navbar extends Component {
    render() {
        return (
            <div className="Navbar">
                <nav className="Navbar-nav">
                    <h3 className="Navbar-Logo">Movie Hunter</h3>
                    <NavLink className="home" to='/'>Home</NavLink>
                    <NavLink className="movies" to='#'>Movies</NavLink>
                    <NavLink className="login" to='/account/login'>Login</NavLink>
                    <NavLink className="signUp" to='/account/signup'>Sign Up</NavLink>
                </nav>
            </div>
        )
    }
}

export default Navbar;
