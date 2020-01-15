import React, { Component } from 'react';
import './SignUp.css';
import account from './account.png';
import axios from 'axios';

export class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state ={
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value.trim()
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        axios.post('/account/users', {
            username: this.state.username,
            email: this.state.email
        }).then((response) => {
            console.log(response.data);
        }).catch((err) => {
            console.log(err)
        })
    }


    render() {
        return (
            <div className="SignUp">
                <form className="SignUp-form" onSubmit={this.handleSubmit}>
                    <h2 className="form-header">Sign Up</h2>
                    <div className="form-img">
                        <img src={account} alt="account"></img>
                    </div>
                    <div className="form-group">
                        <input type="text" required onChange={this.handleChange} value={this.state.username} name="username" className="form-control" placeholder="Username"></input>
                    </div>
                    <div className="form-group">
                        <input type="email" required onChange={this.handleChange} value={this.state.email} name="email" className="form-control" placeholder="Email"></input>
                    </div>
                    <div className="form-group">
                        <input type="password" required onChange={this.handleChange} value={this.state.password} name="password" className="form-control" placeholder="Password"></input>
                    </div>
                    <div className="form-group">
                        <input type="password" required onChange={this.handleChange} value={this.state.confirmPassword} name="confirmPassword" className="form-control" placeholder="Confirm password"></input>
                    </div>
                    <button type="submit" className="btn btn-danger">Sign Up</button>
                </form>
            </div>
        )
    }
}

export default SignUp
