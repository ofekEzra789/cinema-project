import React, { Component } from 'react';
import './Login.css';
import account from './account.png';
// import axios from 'axios';

export class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            isLoged: false
        }
        this.handleClickRedirect = this.handleClickRedirect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleClickRedirect() {
        this.props.history.push('/account/signup')
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value.trim()
        })
    }

    handleSubmit(e) {
        e.preventDefault();
    }

    render() {
        return (
            <div className="Login">
                <form className="Login-form" onSubmit={this.handleSubmit}>
                    <h2 className="form-header">Login</h2>
                        <div className="form-img">
                            <img src={account} alt="account"></img>
                        </div>
                    <div className="form-group">
                        <input type="email" onChange={this.handleChange} value={this.state.email} name="email" className="form-control" placeholder="Email"></input>
                    </div>
                    <div className="form-group">
                        <input type="password" onChange={this.handleChange} value={this.state.password} name="password" className="form-control" placeholder="Passowrd"></input>
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
