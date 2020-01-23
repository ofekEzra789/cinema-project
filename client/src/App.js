import React, { Component } from "react";
import "./App.css";
import Home from "./components/Home/Home";
import SignUp from "./components/SignUp/SignUp";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Search from "./components/Search/Search";
import WishList from "./components/WishList/WishList";
import { Route, Switch } from "react-router-dom";
import axios from "axios";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorite: [],
      isLogged: localStorage.length < 1 ? false : true 
    };
    this.addMovie = this.addMovie.bind(this);
    this.removeMovie = this.removeMovie.bind(this);
    this.checkIfLogged = this.checkIfLogged.bind(this);
    this.sendFavorite = this.sendFavorite.bind(this);
    this.changeLoggedToFalse = this.changeLoggedToFalse.bind(this)
  }
  // user = JSON.parse(localStorage.user);
  
  componentDidMount() {
  //  this.sendFavorite()
  }

  addMovie(
    newMovieId,
    newMovieTitle,
    newMovieImg,
    newMovieReleaseDate,
    newMoviRating
  ) {
    this.setState({
      favorite: [
        ...this.state.favorite,
        {
          newMovieId,
          newMovieTitle,
          newMovieImg,
          newMovieReleaseDate,
          newMoviRating
        }
      ]
    });
    console.log(this.state.favorite)
    // this.sendFavorite()

  }

  removeMovie(itemId) {
    const itemToRemove = this.state.favorite.findIndex(fav => {
      return fav.newMovieId === itemId;
    });
    console.log(itemToRemove);

    const tempArray = [...this.state.favorite];
    tempArray.splice(itemToRemove, 1);

    this.setState({ favorite: tempArray });
  }

  checkIfLogged() {
    this.setState({ isLogged: true });
  }

  
  changeLoggedToFalse() {
    // this.setState({ isLogged: false });
    localStorage.removeItem('user')
  }

  sendFavorite() {
    axios.post("account/users/favorites", {
      favorites: this.state.favorite
    }).then((res) => {
      console.log(res.data)
      console.log(res.status)
    }).catch((err) => {
      console.log(err)
    })
  }

  render() {
    return (
      <div className="App">
        
        <Navbar isLogged={this.state.isLogged} changeLoggedToFalse={this.changeLoggedToFalse}/>
        <Switch>
          <Route exact path="/" render={() => <Home />}></Route>
          <Route
            exact
            path="/account/signup"
            render={routeProps => <SignUp {...routeProps} />}
          ></Route>
          <Route
            exact
            path="/account/login"
            render={routeProps => (
              <Login
                {...routeProps}
                checkIfLogged={this.checkIfLogged}
                isLogged={this.state.isLogged}
              />
            )}
          ></Route>
          <Route
            exact
            path="/search/genre/:genre"
            render={routeProps => (
              <Search
                addMovie={this.addMovie}
                {...routeProps}
                favorite={this.state.favorite}
              />
            )}
          ></Route>
          <Route
            exact
            path="/Wishlist"
            render={() => (
              <WishList
                favorite={this.state.favorite}
                sendFavorite={this.sendFavorite}
                removeMovie={this.removeMovie}
              />
            )}
          ></Route>
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
