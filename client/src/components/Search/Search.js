import React, { Component } from 'react';
import axios from 'axios';
import './Search.css';

const genresId = {
    Action: '28',
    Animation: '16',
    Comedy: '35',
    Adventure: '12'
}

const apiKey = "f35b8795c5a78c90b11cf249e92b1995";
const baseUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc`
const baseImgUrl = 'https://image.tmdb.org/t/p/w500';

export class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genre: "",
            page: 1,
            title: ""
        }
        this.checkGenre = this.checkGenre.bind(this);
    }

    checkGenre() {
        let whichGenre = this.props.match.params.genre;
        if (whichGenre === 'action') {
            this.setState({genre: genresId.Action})
        } else if (whichGenre === 'animation') {
            this.setState({genre: genresId.Animation})
        } else if (whichGenre === 'comedy') {
            this.setState({genre: genresId.Comedy})
        } else if (whichGenre === 'adventure') {
            this.setState({genre: genresId.Adventure})
        }
    }

    async componentDidMount() {
        this.checkGenre();
        let urlWithParams = `${baseUrl}&page=${this.state.page}&with_genres=${this.state.genre}`
        const response = await axios.get(urlWithParams)
        console.log(response.data)
    }

    render() {
        return (
            <div className="Search">
                <h1>Genere Movies</h1>
            </div>
        )
    }
}

export default Search;
