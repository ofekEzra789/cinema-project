import React, { Component } from 'react';
import './SearchItem.css';
import {
    Card, CardImg, CardTitle
} from 'reactstrap';
import {Link} from 'react-router-dom';

export class SearchItem extends Component {
    constructor(props) {
        super(props);
        this.handleAddMovie = this.handleAddMovie.bind(this)
        this.state = {
            onWishList: false,
            movieId: this.props.id
        }
    }

    handleAddMovie() {
        this.props.addMovie(this.props.id, this.props.title, this.props.src, this.props.releaseDate, this.props.rating);
        this.setState({ onWishList: true })
    }

    render() {
        let iconHeart;
        if(this.state.onWishList) {
            iconHeart = <i style={{fontSize: "2rem"}} className="em em-heart ml-2" aria-label="HEAVY BLACK HEART"></i>
        } else {
            iconHeart = <i style={{fontSize: "2rem"}} onClick={this.handleAddMovie} className="em em-black_heart ml-2"  aria-label="BLACK HEART"></i>
        }
        return (
            <div className="Movie" >
                <Card className="Movie-Card">
                    <div className="Movie-Card-layout">
                        <CardTitle className="CardTitle">{this.props.title}</CardTitle>
                        {this.props.isLogged ? iconHeart : null}  
                        <Link  to={`/movie/${this.props.id}`}>More Info</Link>
                    </div>
                    <CardImg className="Card-Img"  src={this.props.src} alt={this.props.title}></CardImg>
                </Card>
            </div>
        )
    }
}

export default SearchItem
