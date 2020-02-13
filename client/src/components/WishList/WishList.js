import React, { Component } from "react";
import "./WishList.css";
import { Row, Col, Container } from "reactstrap";
import WishListItem from "./WishListItem";
import axios from "axios";

export class WishList extends Component {
  constructor(props) {
    super(props);
    this.checkIfFavoriteEmpty = this.checkIfFavoriteEmpty.bind(this);
    this.state = {
      favorites: []
    };
    this.removeMovie = this.removeMovie.bind(this);
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    axios
      .get(`http://localhost:5000/account/users/favoritesList/${user._id}`, {
        userId: user._id
      })
      .then(res => {
        this.setState({ favorites: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  removeMovie(itemId) {
    const itemToRemove = this.state.favorites.findIndex(fav => {
      return fav.newMovieId === itemId;
    });

    const tempArray = [...this.state.favorites];
    tempArray.splice(itemToRemove, 1);

    this.setState({ favorites: tempArray });
  }

  checkIfFavoriteEmpty() {
    if (!this.state.favorites) {
      return (
        <div>
          <h2>List is Empty...</h2>
        </div>
      );
    } else {
      return (
        <Row>
          {this.state.favorites.map(movie => (
            <Col key={movie.newMovieId} sm="6" md="4" lg="3">
              <WishListItem
                id={movie.newMovieId}
                title={movie.newMovieTitle}
                src={movie.newMovieImg}
                releaseDate={movie.newMovieReleaseDate}
                rating={movie.newMoviRating}
                removeMovie={this.removeMovie}
              />
            </Col>
          ))}
        </Row>
      );
    }
  }

  render() {
    return (
      <div className="WishList">
        <div className="WishList-header"></div>
        <div className="WishList-main">
          <Container>
            <h2 className="WishList-headline">Your Movies</h2>
          </Container>

          <Container className="p-3">{this.checkIfFavoriteEmpty()}</Container>
        </div>
      </div>
    );
  }
}

export default WishList;
