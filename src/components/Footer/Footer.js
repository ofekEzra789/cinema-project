import React, { Component } from 'react'
import './Footer.css';
import {Container} from 'reactstrap'

export class Footer extends Component {
    render() {
        return (
            <div className="Footer">
                <Container className="Footer-container">
                <div className="Footer-about">
                    <h2>About Us</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum rutrum molestie tortor, ut dictum ipsum. Nam venenatis ligula non lectus blandit venenatis. Suspendisse justo magna, suscipit ac blandit et, condimentum eu leo. Ut sed nunc nec massa venenatis pretium quis a turpis. Morbi malesuada odio sem, eu iaculis nibh porttitor vel. Praesent pretium tortor in nibh dapibus, vitae semper erat semper.</p>
                </div>
                <div className="Footer-links">
                    <h2>Quick Links</h2>
                    <ul>
                        <li>Lorem</li>
                        <li>Lorem</li>
                        <li>Lorem</li>
                        <li>Lorem</li>
                    </ul>
                </div>

                <div className="Footer-contact">
                    <h2>Contact Us</h2>
                    <ul>
                        <li>Icon-1</li>
                        <li>Icon-2</li>
                        <li>Icon-3</li>
                        <li>Icon-4</li>
                    </ul>
                </div>
                </Container>
            </div>
        )
    }
}

export default Footer;
