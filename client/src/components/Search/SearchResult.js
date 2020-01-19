import React, { Component } from "react";
import axios from "axios";
import { Row, Col, Button } from "reactstrap";
import SearchItem from "./SearchItem";
import "./SearchResult.css";

const apiKey = "f35b8795c5a78c90b11cf249e92b1995";
const baseUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;
const baseImgUrl = "https://image.tmdb.org/t/p/w500";

export class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesArray: [],
      page: 1,
      isLoading: true
    };
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
  }

  async componentDidMount() {
    let urlWithParams = `${baseUrl}&page=${
      this.state.page
    }&with_genres=${this.props.checkGenre()}`;
    const response = await axios.get(urlWithParams);
    this.setState({ moviesArray: response.data.results, isLoading: false });
  }

  async componentDidUpdate(prevProps, prevState) {
    //if (this.state.page !== prevState.page) {
    let urlWithParams = `${baseUrl}&page=${
      this.state.page
    }&with_genres=${this.props.checkGenre()}`;
    const response = await axios.get(urlWithParams);
    this.setState({ moviesArray: response.data.results, isLoading: false });
    //}
  }

  nextPage() {
    this.setState(st => ({ page: st.page + 1 }));
  }

  prevPage() {
    this.setState(st => ({ page: st.page - 1 }));
  }

  checkIfDataAvailable() {
    if (!this.state.isLoading) {
      return (
        <Row>
          {this.state.moviesArray.map(movie => (
            <Col key={movie.id} sm="6" md="4" lg="3">
              <SearchItem
                id={movie.id}
                title={movie.title}
                src={`${baseImgUrl}/${movie.poster_path}`}
                releaseDate={movie.release_date}
                rating={movie.vote_average}
                addMovie={this.props.addMovie}
              />
            </Col>
          ))}
        </Row>
      );
    } else {
      return (
        <div className="spinner-border" role="status">
          {console.log("Is Loading....")}
        </div>
      );
    }
  }

  render() {
    return (
      <div className="SearchResult">
        <Button className="btn-danger m-2" onClick={this.prevPage}>
          Previous page
        </Button>
        <Button className="btn-danger m-2" onClick={this.nextPage}>
          Next page
        </Button>

        {this.checkIfDataAvailable()}

        <Button className="btn-danger m-2" onClick={this.prevPage}>
          Previous page
        </Button>
        <Button className="btn-danger m-2" onClick={this.nextPage}>
          Next page
        </Button>
      </div>
    );
  }
}

export default SearchResult;
