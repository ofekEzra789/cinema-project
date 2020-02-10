import React, { Component } from 'react'
import './Footer.css';
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import webLogo from '../Home/webLogo.png'

export class Footer extends Component {
    render() {
        return (
            <div className="Footer">
                <Container className="Footer-container">
                    <div className="Footer-about">
                        <h3>About Us</h3>
                        <p>We are Students of teach career Collage :</p>
                        <p>Ayenachew Molla , ofek Ezra - Fullstack developers</p>
                    </div>
                    <div className="Footer-links">
                        <h3>Quick Links</h3>
                        <ul className="Footer-links-list">
                            <li><Link to="/" className='link-button-footer'>Home</Link></li>
                            <li><Link to="/account/login" className='link-button-footer'>Login</Link></li>
                            <li><Link to="/account/signup" className='link-button-footer'>SignUp</Link></li>
                        </ul>
                    </div>
                </Container>
                <Container className="footer-copywrite">
                    <div className="footer-Logo">
                        <img src={webLogo}></img>
                    </div>
                    <div >
                        <small>Copywrite 	&#9400; 2020 Ninja Movies Website</small>
                    </div>
                </Container>
            </div>
        )
    }
}

export default Footer;
