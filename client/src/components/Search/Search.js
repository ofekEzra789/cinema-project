import React, { Component } from 'react';
import './Search.css';
import SearchResult from './SearchResult';
import {Container} from 'reactstrap';

const genresId = {
    Action: '28',
    Animation: '16',
    Comedy: '35',
    Adventure: '12'
}

export class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genre: "",
            title: this.props.match.params.genre
        }
        this.checkGenre = this.checkGenre.bind(this);
        // this.findGenere = this.findGenere.bind(this);
    }

    checkGenre() {
        const whichGenre = this.props.match.params.genre;
        let temp;
        if (whichGenre === 'action') {
            temp = genresId.Action;
        } else if (whichGenre === 'animation') {
            temp = genresId.Animation;
        } else if (whichGenre === 'comedy') {
            temp = genresId.Comedy;
        } else if (whichGenre === 'adventure') {
            temp = genresId.Adventure;
        }
        return temp
    }
    componentDidUpdate(prevProps,prevState){
        if (prevProps.match.params.genre !== this.props.match.params.genre) {
            this.setState({title: this.props.match.params.genre})
        }
    }
   
    render() {
        console.log(this.props);
        
        return (
            <div className="Search">
                <div className="Search-header"></div>
                
                <div className="Search-main">
                    <h1 className="Search-title">{this.state.title} Movies</h1>
                    <Container>
                        <SearchResult  addMovie={this.props.addMovie} checkGenre={this.checkGenre} genreId={this.state.genre}/>
                    </Container>
                </div>
            </div>
        )
    }
}

export default Search;
