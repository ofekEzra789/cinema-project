import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col } from 'reactstrap';
import SearchItem from './SearchItem';
import './SearchResult.css';
import uuid from 'uuid'


const apiKey = "f35b8795c5a78c90b11cf249e92b1995";
const baseUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`
const baseImgUrl = 'https://image.tmdb.org/t/p/w500';

export class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moviesArray: [],
            page: 1,
            isLoading: true
        }
    }

    async componentDidMount() {
        let urlWithParams = `${baseUrl}&page=${this.state.page}&with_genres=${this.props.checkGenre()}`
        const response = await axios.get(urlWithParams)
        this.setState({moviesArray: response.data.results, isLoading: false})
        console.log(this.state.moviesArray)
    }
   
    async componentDidUpdate(prevProps) {
        console.log(prevProps.genreId, this.props.genreId)
        if (this.props.genreId !== prevProps.genreId) {
          let urlWithParams = `${baseUrl}&page=${this.state.page}&with_genres=${this.props.checkGenre()}`
          const response = await axios.get(urlWithParams)
          this.setState({moviesArray: response.data.results, isLoading: false})
        }
      }

    checkIfDataAvailable() {
        if (!this.state.isLoading) {
            return (
                <Row>
                    {this.state.moviesArray.map(movie =>
                         <Col key={movie.id}  sm="6" md="4" lg="3">
                         <SearchItem
                         id={movie.id}
                         title={movie.title}
                         src={`${baseImgUrl}/${movie.poster_path}`}
                         releaseDate={movie.release_date}
                         rating={movie.vote_average}
                         addMovie={this.props.addMovie}
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
            <div className="SearchResult">
                {this.checkIfDataAvailable()}
            </div>
        )
    }
}

export default SearchResult
