import React, { Component } from 'react';
import axios from 'axios';
import './Search.css';
import SearchResult from './SearchResult';
import {Row, Col, Container} from 'reactstrap'

const genresId = {
    Action: '28',
    Animation: '16',
    Comedy: '35',
    Adventure: '12'
}

// const apiKey = "f35b8795c5a78c90b11cf249e92b1995";
// const baseUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`
// const baseImgUrl = 'https://image.tmdb.org/t/p/w500';

export class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genre: "",
            title: this.props.match.params.genre
        }
        this.checkGenre = this.checkGenre.bind(this);
    }

    checkGenre() {
        const whichGenre = this.props.match.params.genre;
        let temp;
        if (whichGenre === 'action') {
            this.setState({genre: genresId.Action});
            temp = genresId.Action;
        } else if (whichGenre === 'animation') {
            this.setState({genre: genresId.Animation})
            temp = genresId.Animation;
        } else if (whichGenre === 'comedy') {
            this.setState({genre: genresId.Comedy})
            temp = genresId.Comedy;
        } else if (whichGenre === 'adventure') {
            this.setState({genre: genresId.Adventure})
            temp = genresId.Adventure;
        }
        return temp
    }

    render() {
        return (
            <div className="Search">
                <div className="Search-header"></div>
                
                <div className="Search-main">
                    <h1 className="Search-title">{this.state.title} Movies</h1>
                    <Container>
                        <SearchResult checkGenre={this.checkGenre}/>
                    </Container>
                </div>
            </div>
        )
    }
}

export default Search;
