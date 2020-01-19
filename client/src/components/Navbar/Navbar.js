import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import './Navbar.css';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


export class Navbar extends Component {
    render() {
        return (
            <div className="Navbar">
                <nav className="Navbar-nav">
                    <h3 className="Navbar-Logo">Movie Hunter</h3>
                    <NavLink className="home" to='/'>Home</NavLink>
                    <NavLink className="home" to='/Wishlist'>Wishlist</NavLink>
                     <UncontrolledDropdown>
                            <DropdownToggle caret>
                                Genres
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem><NavLink to="/search/genre/action">Action</NavLink></DropdownItem>
                                <DropdownItem><NavLink to="/search/genre/comedy">Comedy</NavLink></DropdownItem>
                                <DropdownItem><NavLink to="/search/genre/animation">Animation</NavLink></DropdownItem>
                                <DropdownItem><NavLink to="/search/genre/adventure">Adventure</NavLink></DropdownItem>
                            </DropdownMenu>
                    </UncontrolledDropdown>
                    <NavLink className="login" to='/account/login'>Login</NavLink>
                    <NavLink className="signUp" to='/account/signup'>Sign Up</NavLink>
                </nav>
            </div>
        )
    }
}

export default Navbar;
