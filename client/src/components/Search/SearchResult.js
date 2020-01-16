import React, { Component } from 'react';
import axios from 'axios';
import searchItem from './SearchItem';


const apiKey = "f35b8795c5a78c90b11cf249e92b1995";
const baseUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`
const baseImgUrl = 'https://image.tmdb.org/t/p/w500';

export class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moviesArray: [],
            page: 1
        }
    }

    async componentDidMount() {
        let urlWithParams = `${baseUrl}&page=${this.state.page}&with_genres=${this.props.checkGenre()}`
        const response = await axios.get(urlWithParams)
        this.setState({moviesArray: response.data.results})
    }

    render() {
        return (
            <div className="SearchResult">
                
            </div>
        )
    }
}

export default SearchResult
