import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import './Navbar.css';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


export class Navbar extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
        this.state = {
            logged: localStorage.length < 1 ? false : true,
            redirectToHome: false
        }
    }

    handleLogout() {
        this.props.changeLoggedToFalse();
        this.setState({ redirectToHome: true });
        if (this.state.redirectToHome) {
            return <Redirect to="/" />;
        }
    }

    componentDidUpdate(prevProps, preveState) {
        if (prevProps.isLogged !== this.props.isLogged) {
            this.setState({ logged: this.props.isLogged })
        }
    }

    render() {
        let { isLogged } = this.props

        if (isLogged) {
            return (
                <div className="Navbar">
                    <nav className="Navbar-nav">
                        <h3 id="Navbar-Logo" className="Navbar-Logo"><NavLink to="/">Ninja Movies</NavLink></h3>
                        <div className="navbar-inside">
                        <NavLink exact activeClassName="activeLink" className="home" to='/'>Home</NavLink>
                        <NavLink exact activeClassName="activeLink" className="Wishlist" to='/Wishlist'>Wishlist</NavLink>
                        <UncontrolledDropdown>
                            <DropdownToggle caret>
                                Genres
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem><NavLink exact activeClassName="activeLink" to="/search/genre/action">Action</NavLink></DropdownItem>
                                <DropdownItem><NavLink exact activeClassName="activeLink" to="/search/genre/comedy">Comedy</NavLink></DropdownItem>
                                <DropdownItem><NavLink exact activeClassName="activeLink" to="/search/genre/animation">Animation</NavLink></DropdownItem>
                                <DropdownItem><NavLink exact activeClassName="activeLink" to="/search/genre/adventure">Adventure</NavLink></DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <NavLink exact activeClassName="activeLink" onClick={this.handleLogout} className="logout mx-3" to='/'>Logout</NavLink>
                        </div>
                    </nav>
                </div>
            )
        } else {
            return (
                <div className="Navbar">
                    <nav className="Navbar-nav">
                        <h3 id="Navbar-Logo" className="Navbar-Logo"><NavLink to="/">Ninja Movies</NavLink></h3>
                        <div className="navbar-inside">
                            <NavLink exact activeClassName="activeLink" className="home" to='/'>Home</NavLink>
                            <UncontrolledDropdown>
                                <DropdownToggle caret>
                                    Genres
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem><NavLink exact activeClassName="activeLink" to="/search/genre/action">Action</NavLink></DropdownItem>
                                    <DropdownItem><NavLink exact activeClassName="activeLink" to="/search/genre/comedy">Comedy</NavLink></DropdownItem>
                                    <DropdownItem><NavLink exact activeClassName="activeLink" to="/search/genre/animation">Animation</NavLink></DropdownItem>
                                    <DropdownItem><NavLink exact activeClassName="activeLink" to="/search/genre/adventure">Adventure</NavLink></DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <NavLink exact activeClassName="activeLink" className="login" to='/account/login'>Login</NavLink>
                            <NavLink exact activeClassName="activeLink" className="signUp" to='/account/signup'>Sign Up</NavLink>
                        </div>
                    </nav>
                </div>
            )

        }
    }
}

export default Navbar;
