import React, { Component } from "react";
import "./MoviePage.css";
import axios from "axios";
import Button from "@material-ui/core/Button";

const key = "api_key=f35b8795c5a78c90b11cf249e92b1995&language=en-US";
const baseUrl = "https://api.themoviedb.org/3/movie";
const baseImgUrlBackdrop = "https://image.tmdb.org/t/p/original/"; // Backdrop_Path
const baseImgUrlPoster = "https://image.tmdb.org/t/p/w500/"; // Backdrop_Path
const videoUrl = "https://www.youtube.com/embed/";

export class MoviePage extends Component {
  static defaultProps = {
    chanceSeatTaken: 0.35
  };
  constructor(props) {
    super(props);
    this.state = {
      movieId: this.props.location.pathname.slice(7),
      movieInfo: "",
      trailer: "",
      seatsSelectionInfo: [],
      seats: Array.from(
        { length: 78 },
        () => Math.random() < this.props.chanceSeatTaken
      )
    };
    this.goBack = this.goBack.bind(this);
    this.isSeatTaken = this.isSeatTaken.bind(this);
  }

  componentDidMount() {
    const { movieId } = this.state;
    axios
      .get(`${baseUrl}/${movieId}?${key}`)
      .then(res => {
        this.setState({ movieInfo: res.data });
      })
      .catch(err => {
        console.log(err);
      });

    // Second Request for Videos

    axios
      .get(`${baseUrl}/${movieId}/videos?${key}`)
      .then(res => {
        const videoKey = res.data.results[0].key;
        this.setState({ trailer: `${videoUrl}${videoKey}` });
      })
      .catch(err => {
        console.log(err);
      });
  }

  isSeatTaken() {
    return Math.random() < this.props.chanceSeatTaken;
  }

  goBack() {
    this.props.history.goBack();
  }

  render() {
    const { movieInfo } = this.state;
    if (movieInfo) {
      return (
        <div className="MoviePage animated fadeInDown">
          <header className="MoviePage-header">
            <img
              src={`${baseImgUrlBackdrop}${movieInfo.backdrop_path}`}
              alt={movieInfo.title}
            ></img>
          </header>

          <main className="MoviePage-main animated fadeInUp">
            <div className="MoviePage-img__container">
              <img
                src={`${baseImgUrlPoster}${movieInfo.poster_path}`}
                alt={movieInfo.title}
              ></img>
            </div>
            <div className="MoviePage__description">
              <h2>
                {movieInfo.title}
                <div className="MoviePage-genres__container">
                  {movieInfo.genres.map(g => (
                    <span key={g.name} className="MoviePage-genres">
                      {g.name}
                    </span>
                  ))}
                </div>
              </h2>
              <div className="moviePage-overview__container">
                <p className="moviePage-overview">{movieInfo.overview}</p>

                <div className="moviePage-moreDescription">
                  <p className="year">
                    Year: {movieInfo.release_date.slice(0, 4)}
                  </p>
                  <p>
                    Rating: {`${movieInfo.vote_average} /10`}
                    <i
                      className="em em-star mx-2"
                      aria-label="WHITE MEDIUM STAR"
                    ></i>
                  </p>
                  <p className="runtime">
                    Runtime: {movieInfo.runtime} minutes
                  </p>

                  <iframe
                    allowFullScreen
                    allow="autoplay"
                    title={movieInfo.title}
                    className="iframe my-2"
                    width="500"
                    height="315"
                    src={this.state.trailer}
                  ></iframe>

                  <Button className="button-Movie-Page" onClick={this.goBack} variant="contained">
                    Back To Movies
                  </Button>
                </div>
              </div>
            </div>
          </main>
        </div>
      );
    } else {
      return <div className="spinner-border"></div>;
    }
  }
}

export default MoviePage;
