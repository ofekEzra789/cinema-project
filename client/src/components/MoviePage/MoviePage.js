import React, { Component } from 'react';
import './MoviePage.css';
import axios from 'axios';

const key = "api_key=f35b8795c5a78c90b11cf249e92b1995&language=en-US";
const baseUrl = "https://api.themoviedb.org/3/movie";
const baseImgUrl = 'https://image.tmdb.org/t/p/original/';  // Backdrop Path

export class MoviePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movieId : this.props.location.pathname.slice(7)
        }
    }

    componentDidMount() {
        const {movieId} = this.state
        axios.get(`${baseUrl}/${movieId}?${key}`)
        .then((res) => {
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render() {
        return (
            <div className="MoviePage">
                <h1>Single Movie Page</h1>
            </div>
        )
    }
}

export default MoviePage
