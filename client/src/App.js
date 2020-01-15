import React, { Component } from 'react';
import './App.css';
import Home from './components/Home/Home';
import SignUp from './components/SignUp/SignUp';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import {Route, Switch} from 'react-router-dom';

export class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar/>
        <Switch>
          <Route exact path="/" render={() => <Home />}></Route>
          <Route exact path="/account/signup" render={() => <SignUp />}></Route>
          <Route exact path="/account/login" render={(routeProps) => <Login {...routeProps}/>}></Route>
        </Switch>
        <Footer />
      </div>
    )
  }
}

export default App

