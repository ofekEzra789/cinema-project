import React, { Component } from 'react';
import './Home.css';
import { Row, Col, Container } from 'reactstrap';
import axios from 'axios';
import Movie from '../Movie/Movie';
import Button from "@material-ui/core/Button";

const apiKey = 'f35b8795c5a78c90b11cf249e92b1995';
const baseUrl = 'https://api.themoviedb.org/3/movie';
const baseImgUrl = 'https://image.tmdb.org/t/p/w500';

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topRatedMovies: null,
            popularMovies: null,
            isLoading: true
        }
        this.checkIfDataAvailable = this.checkIfDataAvailable.bind(this);
    }

    componentDidMount() {
        const queryPopularMovies = `/popular?api_key=${apiKey}&language=en-US&page=1&video=true`;
        const queryTopRated = `/top_rated/?api_key=${apiKey}&language=en-US&page=1&video=true`;

        const responsePopularMovies = baseUrl + queryPopularMovies
        const responseTopRated = baseUrl + queryTopRated

        axios.get(responsePopularMovies).then((res) => {
            this.setState({ popularMovies: res.data.results, isLoading: false })
        }).catch((err) => {
            console.log(err)
        })

        axios.get(responseTopRated).then((res) => {
            this.setState({ topRatedMovies: res.data.results, isLoading: false })
        }).catch((err) => {
            console.log(err)
        })
    }

    checkIfDataAvailable(moviesArray) {
        if (!this.state.isLoading) {
            return (
                <Row >
                    {moviesArray.map(movie =>
                        <Col key={movie.id} sm="6" md="4" lg="3" >
                            <Movie
                                id={movie.id}
                                title={movie.title}
                                src={`${baseImgUrl}/${movie.poster_path}`}
                                releaseDate={movie.release_date}
                                rating={movie.vote_average}
                            />
                        </Col>
                    )}
                </Row>
            )
        } else {
            return (
                <div className="spinner-border" role="status"></div>
            )
        }
    }

    render() {
        return (
            <div className="Home">
                <div className="Home-header">
                    <div className="Home-headline">
                        <Container>
                            <h1 className="Home-headline__primary">Welcome To Ninja Movies Website</h1>
                            <p className="Home-headline__secondary">Ninja movies is a web application that allow memebers to search and find information about movies, and add to a favorite movies to a wishlist for registered members</p>
                            <Button href="#mainSite" className="Home-headline-button" variant="contained" color="secondary" size="medium">To the site</Button>
                        </Container>
                    </div>
                </div>

                <div className="Home-main">
                    <Container id="mainSite" className="p-3">
                        <h2 className="Home-main-primary">Popular Movies</h2>
                        {this.checkIfDataAvailable(this.state.popularMovies)}
                    </Container>

                    <Container className="p-3">
                        <h2 className="Home-main-primary">Top Rated Movies</h2>
                        {this.checkIfDataAvailable(this.state.topRatedMovies)}
                    </Container>
                </div>
            </div>
        )
    }
}

export default Home
