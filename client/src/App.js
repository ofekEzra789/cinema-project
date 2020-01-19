import React, { Component } from 'react';
import './App.css';
import Home from './components/Home/Home';
import SignUp from './components/SignUp/SignUp';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import Search from './components/Search/Search';
import WishList from './components/WishList/WishList'
import {Route, Switch} from 'react-router-dom';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorite: []
    }
    this.addMovie = this.addMovie.bind(this)
  }

  addMovie(newMovieId, newMovieTitle, newMovieImg, newMovieReleaseDate, newMoviRating) {
    this.setState({
      favorite: [...this.state.favorite, {newMovieId, newMovieTitle, newMovieImg, newMovieReleaseDate, newMoviRating}]
    })
  }

  removeMovie(itemId) {
    // ...
  }

  render() {
    return (
      <div className="App">
        <Navbar/>
        <Switch>
          <Route exact path="/" render={() => <Home />}></Route>
          <Route exact path="/account/signup" render={(routeProps) => <SignUp {...routeProps} />}></Route>
          <Route exact path="/account/login" render={(routeProps) => <Login {...routeProps}/>}></Route>
          <Route exact path="/search/genre/:genre" render={(routeProps) => <Search addMovie={this.addMovie} {...routeProps} favorite={this.state.favorite} />}></Route>
          <Route exact path="/WishList" render={() => <WishList />}></Route>
        </Switch>
        <Footer />
      </div>
    )
  }
}

export default App

