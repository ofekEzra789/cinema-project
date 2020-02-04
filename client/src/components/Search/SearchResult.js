import React, { Component } from "react";
import axios from "axios";
import { Row, Col } from "reactstrap";
import SearchItem from "./SearchItem";
import "./SearchResult.css";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import TextField from "@material-ui/core/TextField";

const apiKey = "f35b8795c5a78c90b11cf249e92b1995";
const baseUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;
const baseSearchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}`;
const baseImgUrl = "https://image.tmdb.org/t/p/w500";

export class SearchResult extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      moviesArray: [],
      page: 1,
      isLoading: true,
      movieName: "",
      moviesSearch: [],
      isFoucs: false,
      favorites: []
    };
    this.whatMovie = "";
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.firstPage = this.firstPage.bind(this);
    this.lastPage = this.lastPage.bind(this);
    this.limitPageNumber = this.limitPageNumber.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    let urlWithParams = `${baseUrl}&page=${
      this.state.page
    }&with_genres=${this.props.checkGenre()}`;

    axios
      .get(urlWithParams)
      .then(response => {
        this.setState({ moviesArray: response.data.results, isLoading: false });
        this.isOnWishList()
      })
      .catch(err => {
        console.log(err);
      });
  }

  // componentDidUpdate(prevProps, prevState) {
  //   let urlWithParams = `${baseUrl}&page=${
  //     this.state.page
  //   }&with_genres=${this.props.checkGenre()}`;
  //   axios
  //     .get(urlWithParams)
  //     .then(response => {
  //       this.setState({
  //         moviesArray: response.data.results,
  //         isLoading: false,
  //         title: this.props.title
  //       });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  componentWillUnmount() {
    this._isMounted = false;
  }

  nextPage() {
    this.setState(
      st => ({ page: st.page + 1 }),
      () => {
        this.limitPageNumber();
      }
    );
  }

  prevPage() {
    this.setState(
      st => ({ page: st.page - 1 }),
      () => {
        this.limitPageNumber();
      }
    );
  }

  firstPage() {
    this.setState(() => ({ page: 1 }));
  }

  lastPage() {
    this.setState(() => ({ page: 20 }));
  }

  limitPageNumber() {
    if (this.state.page > 20) {
      alert("Number of pages exceeded");
      this.setState(() => ({ page: 20 }));
    } else if (this.state.page < 1) {
      alert("Number of pages exceeded");
      this.setState(() => ({ page: 1 }));
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

  ifInputOnFoucs() {
    if (!this.state.isFoucs) {
      return this.checkIfDataAvailable();
    } else {
      if (this.state.moviesSearch) {
        return (
          <Row>
            {this.state.moviesSearch.map(movie => (
              <Col key={movie.id} sm="6" md="4" lg="3">
                <SearchItem
                  id={movie.id}
                  title={movie.title}
                  src={`${baseImgUrl}/${movie.poster_path}`}
                  releaseDate={movie.release_date}
                  rating={movie.vote_average}
                  addMovie={this.props.addMovie}
                  isLogged={this.props.isLogged}
                  favorite={this.props.favorite}
                />
              </Col>
            ))}
          </Row>
        );
      } else {
        return <div className="spinner-border" role="status"></div>;
      }
    }
  }

  handleSearchChange(e) {
    let whatMovie = e.target.value.replace(" ", "%20");
    this.setState({ [e.target.name]: whatMovie, isFoucs: !this.state.isFoucs });
  }

  handleSubmit(e) {
    e.preventDefault();
    axios
      .get(`${baseSearchUrl}&language=en-US&query=${this.state.movieName}`)
      .then(res => {
        this.setState({ moviesSearch: res.data.results });
      })
      .catch(err => {
        console.log(err);
      });
  }

  isOnWishList() {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user._id;
    axios
      .get(`http://localhost:5000/account/users/onWishList/${userId}`)
      .then(res => {
        console.log(res.data);
        console.log(res.status);
        this.setState({ favorites: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  
  render() {
    return (
      <div className="SearchResult">
        <div className="search-container">
          <div className="search-option">
            <form
              onSubmit={this.handleSubmit}
              className="my-2"
              noValidate
              autoComplete="off"
            >
              <TextField
                onChange={this.handleSearchChange}
                value={this.state.movieName}
                name="movieName"
                onChange={this.handleSearchChange}
                id="outlined-basic"
                variant="filled"
                label="Search"
              />
            </form>
          </div>

          <div className="search-page">
            <Pagination
              className="d-flex justify-content-center"
              size="md"
              aria-label="Page navigation example"
            >
              <PaginationItem>
                <PaginationLink first onClick={this.firstPage} />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink onClick={this.prevPage} previous />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">{this.state.page}</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink onClick={this.nextPage} next />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink last onClick={this.lastPage} />
              </PaginationItem>
            </Pagination>
          </div>
        </div>

        {this.state.isFoucs
          ? this.ifInputOnFoucs()
          : this.checkIfDataAvailable()}

        <Pagination
          className="d-flex justify-content-center my-3 text-danger"
          size="md"
          aria-label="Page navigation example"
        >
          <PaginationItem>
            <PaginationLink first onClick={this.firstPage} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink onClick={this.prevPage} previous />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">{this.state.page}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink onClick={this.nextPage} next />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink last onClick={this.lastPage} />
          </PaginationItem>
        </Pagination>
      </div>
    );
  }
}

export default SearchResult;
