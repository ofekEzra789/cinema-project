import React, { Component } from "react";
import axios from "axios";
import { Row, Col } from "reactstrap";
import SearchItem from "./SearchItem";
import "./SearchResult.css";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const apiKey = "f35b8795c5a78c90b11cf249e92b1995";
const baseUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;
const baseImgUrl = "https://image.tmdb.org/t/p/w500";

export class SearchResult extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      moviesArray: [],
      page: 1,
      isLoading: true
    };
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.firstPage = this.firstPage.bind(this);
    this.lastPage = this.lastPage.bind(this);
    this.limitPageNumber = this.limitPageNumber.bind(this);
  }

  async componentDidMount() {
    this._isMounted = true;

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
    this.setState({
      moviesArray: response.data.results,
      isLoading: false,
      title: this.props.title
    });
    //}
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  nextPage() {
    this.setState(st => ({ page: st.page + 1 }), () => {
      this.limitPageNumber()
    });
  }

  prevPage() {
    this.setState(st => ({ page: st.page - 1 }), () => {
      this.limitPageNumber()
    });
  }

  firstPage() {
    this.setState(() => ({ page: 1 }));
  }

  lastPage() {
    this.setState(() => ({ page: 20 }));
  }

  limitPageNumber() {
    if (this.state.page > 20) {
      alert('Number of pages exceeded')
      this.setState(() => ({ page: 20 }))
    } else if (this.state.page < 1) {
      alert('Number of pages exceeded')
      this.setState(() => ({ page: 1 }))
    }
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
                isLogged={this.props.isLogged}
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
        <Pagination className="d-flex justify-content-center  my-3" size="md" aria-label="Page navigation example">
          <PaginationItem>
            <PaginationLink first onClick={this.firstPage}  />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink onClick={this.prevPage} previous  />
          </PaginationItem>
          <PaginationItem>
          <PaginationLink href="#">{this.state.page}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink onClick={this.nextPage} next  />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink last onClick={this.lastPage}  />
          </PaginationItem>
        </Pagination>

        {this.checkIfDataAvailable()}

        <Pagination className="d-flex justify-content-center my-3 text-danger"  size="md" aria-label="Page navigation example">
          <PaginationItem>
            <PaginationLink first onClick={this.firstPage}  />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink onClick={this.prevPage} previous  />
          </PaginationItem>
          <PaginationItem>
          <PaginationLink href="#">{this.state.page}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink onClick={this.nextPage} next  />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink last onClick={this.lastPage}  />
          </PaginationItem>
        </Pagination>
      </div>
    );
  }
}

export default SearchResult;
