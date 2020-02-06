import React, { Component } from "react";
import "./Search.css";
import SearchResult from "./SearchResult";
import axios from "axios";
import { Container } from "reactstrap";

const genresId = {
  Action: "28",
  Animation: "16",
  Comedy: "35",
  Adventure: "12"
};

export class Search extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      genre: "",
      title: this.props.match.params.genre
    };
    this.checkGenre = this.checkGenre.bind(this);
    // this.findGenere = this.findGenere.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  checkGenre() {
    const whichGenre = this.props.match.params.genre;
    
    let temp;
    if (whichGenre === "action") {
      temp = genresId.Action;
    } else if (whichGenre === "animation") {
      temp = genresId.Animation;
    } else if (whichGenre === "comedy") {
      temp = genresId.Comedy;
    } else if (whichGenre === "adventure") {
      temp = genresId.Adventure;
    }
    return temp;
  }

  componentDidUpdate(prevProps, prevState) {
    // componentWillRecieveProps
    if (prevProps.match.params.genre !== this.props.match.params.genre) {
      this.setState({ title: this.props.match.params.genre, genre: this.props.match.params.genre });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    console.log(this.props);

    return (
      <div className="Search">
        <div className="Search-header"></div>

        <div className="Search-main">
          <h1 className="Search-title">{this.state.title} Movies</h1>
          <Container>
            <SearchResult
              addMovie={this.props.addMovie}
              checkGenre={this.checkGenre} //todo move to searchResult component
              genreId={this.state.genre}
              isLogged={this.props.isLogged}
            //   favorite={this.props.favorite}
            //   favorite={
                  
                // this.isOnWishList()
            //   }
            />
          </Container>
        </div>
      </div>
    );
}

}
    

export default Search;
