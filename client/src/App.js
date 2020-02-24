import React, { Component } from "react";
import "./App.css";
import Home from "./components/Home/Home";
import SignUp from "./components/SignUp/SignUp";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Search from "./components/Search/Search";
import WishList from "./components/WishList/WishList";
import MoviePage from './components/MoviePage/MoviePage'
import { Route, Switch } from "react-router-dom";
import axios from "axios";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // isLogged: false,
      favorite: [],
      isLogged: false
    };
    this.addMovie = this.addMovie.bind(this);
    // this.removeMovie = this.removeMovie.bind(this);
    this.checkIfLogged = this.checkIfLogged.bind(this);
    this.sendFavorite = this.sendFavorite.bind(this);
    this.changeLoggedToFalse = this.changeLoggedToFalse.bind(this);
  }

  componentDidMount() {
    localStorage.user === undefined ?
    this.setState({isLogged:false})
    : this.setState({isLogged: true});    
  }
  
  addMovie(
    newMovieId,
    newMovieTitle,
    newMovieImg,
    newMovieReleaseDate,
    newMoviRating,
    isOnWishList
  ) {
    this.sendFavorite({
      newMovieId,
      newMovieTitle,
      newMovieImg,
      newMovieReleaseDate,
      newMoviRating,
      isOnWishList
    })
    this.setState({
      favorite: [
        ...this.state.favorite,
        {
          newMovieId,
          newMovieTitle,
          newMovieImg,
          newMovieReleaseDate,
          newMoviRating,
          isOnWishList
        }
      ]
    });
    console.log(this.state.favorite)
    // this.sendFavorite()
  }

 
  checkIfLogged() {
    const isLogged = !this.state.isLogged
    this.setState({ isLogged: isLogged });
  }


  changeLoggedToFalse() {
    this.setState({ isLogged: false });
    localStorage.removeItem('user')
  }

  sendFavorite(favorite) {
    const user = JSON.parse(localStorage.getItem('user'));
    axios.post("https://localhost:5000/account/users/favorites", {
      userId: user._id,
      favorites: favorite
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

        <Navbar isLogged={this.state.isLogged} changeLoggedToFalse={this.changeLoggedToFalse} />
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
                isLogged={this.state.isLogged}
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
                setWishListOnParent={this.setWishListOnParent}
              />
            )}
          ></Route>
          <Route exact to="/movie/:id" render={(routeProps) => <MoviePage {...routeProps}/>}></Route>
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
