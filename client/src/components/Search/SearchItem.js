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
            onWishList: this.props.isFavorite,
            movieId: this.props.id
        }
    }

    handleAddMovie() {
        this.setState({ onWishList: true }, () => {
            this.props.addMovie(this.props.id, this.props.title, this.props.src, this.props.releaseDate, this.props.rating, this.state.onWishList);
        })
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.isFavorite !== this.props.isFavorite) {
            this.setState({ onWishList: this.props.isFavorite })
        }
    }

    
    render() {
        let iconHeart;
        if(this.state.onWishList) {
            iconHeart = <i className="fas fa-heart" style={{fontSize: "3rem" ,color: "crimson"}} ></i>
        } else {
            iconHeart = <i className="far fa-heart" onClick={this.handleAddMovie} style={{fontSize: "3rem", color: "crimson"}}></i>
        }
        return (
            <div className="Movie animated fadeIn">
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
