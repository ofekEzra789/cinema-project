import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  Button,
  CardTitle
} from "reactstrap";
import { Link } from "react-router-dom";
import "./WishListItem.css";
import axios from "axios";

export class WishListItem extends Component {
  constructor(props) {
    super(props);
    this.handleRemoveMovie = this.handleRemoveMovie.bind(this);
  }

  handleRemoveMovie() {
    console.log(this.props.id);
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user._id);
    axios
      .delete(
        `http://localhost:5000/account/users/favoritesList/${user._id}/${this.props.id}`
      )
      .then(res => {
        console.log(res.data);
        this.props.removeMovie(this.props.id);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="WishListItem">
        <Card className="WishListItem-Card">
          <CardImg
            className="WishListItem-Img"
            src={this.props.src}
            alt={this.props.title}
          ></CardImg>
          <div className="wishList-overlay">
            <CardTitle className="CardTitle">{this.props.title}</CardTitle>
            <Link to={`/movie/${this.props.id}`}>More Info</Link>
            <Link to="/">Buy Ticket</Link>
            <i
              class="em em-x"
              aria-role="presentation"
              aria-label="CROSS MARK"
              onClick={this.handleRemoveMovie}
            ></i>
          </div>
          {/* <CardBody>
                        <CardTitle>{this.props.title}</CardTitle>
                        <CardText>Release Year: {this.props.releaseDate}</CardText>
                        <CardText>Rating: {this.props.rating}</CardText>
                        <div className="card-Button">
                            <Button>Buy Ticket </Button>
                        </div>
                    </CardBody> */}
        </Card>
      </div>
    );
  }
}

export default WishListItem;
