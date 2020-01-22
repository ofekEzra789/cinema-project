import React, { Component } from 'react';
import './Home.css';
import {Button} from 'reactstrap';
import {Row, Col, Container} from 'reactstrap';
import axios from 'axios';
import Movie from '../Movie/Movie';

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

    async componentDidMount() {
        const queryPopularMovies = `/popular?api_key=${apiKey}&language=en-US&page=1&video=true`;
        const queryTopRated = `/top_rated/?api_key=${apiKey}&language=en-US&page=1&video=true`;

        const responsePopularMovies = await axios.get(baseUrl + queryPopularMovies)
        const responseTopRated = await axios.get(baseUrl + queryTopRated)

        this.setState({
            topRatedMovies: responseTopRated.data.results,
            popularMovies: responsePopularMovies.data.results,
            isLoading: false
        })
    }

    checkIfDataAvailable(moviesArray) {
        if(!this.state.isLoading) {
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
                <div className="spinner-border" role="status">
                    {console.log('Is Loading....')}
                </div>
            )
        }
    }

    render() {
        return (
            <div className="Home">
                <div className="Home-header">
                    <div className="Home-headline">
                        <Container>
                            <h1 className="Home-headline__primary">Welcome To Ninja Movie Website</h1>
                            <p className="Home-headline__secondary">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut suscipit condimentum ligula, et ultricies lectus ligula, et ultricies lectus ligula, et ultricies lectus.</p>
                            <Button className="Home-headline-button">Into the Site</Button>
                        </Container>
                    </div>
                </div>

                <div className="Home-main">
                    <Container className="p-3">
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
