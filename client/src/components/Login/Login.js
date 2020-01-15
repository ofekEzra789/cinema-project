import React, { Component } from 'react';
import './Login.css';
import account from './account.png';

export class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.handleClickRedirect = this.handleClickRedirect.bind(this);
    }

    handleClickRedirect() {
        this.props.history.push('/account/signup')
    }

    render() {
        return (
            <div className="Login">
                <form className="Login-form">
                    <h2 className="form-header">Login</h2>
                        <div className="form-img">
                            <img src={account} alt="account"></img>
                        </div>
                    <div className="form-group">
                        <input type="email" className="form-control" placeholder="Email"></input>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Passowrd"></input>
                    </div>
                    <button className="btn btn-danger">Login</button>
                    <div className="form-footer">
                        <p className="form-footer-text">New user? <span onClick={this.handleClickRedirect} className="text-danger mx-2">SignUp</span></p>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login
