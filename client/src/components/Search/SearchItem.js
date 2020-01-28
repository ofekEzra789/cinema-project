import React, { Component } from 'react';
import './SearchItem.css';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle
} from 'reactstrap';

export class SearchItem extends Component {
    constructor(props) {
        super(props);
        this.handleAddMovie = this.handleAddMovie.bind(this)
        this.state = {
            onWishList: false
        }
    }

    handleAddMovie() {
        this.props.addMovie(this.props.id, this.props.title, this.props.src, this.props.releaseDate, this.props.rating);
        this.setState({ onWishList: true })
    }

    render() {
        let iconHeart;
        if(this.state.onWishList) {
            iconHeart = <i className="em em-heart ml-2" aria-label="HEAVY BLACK HEART"></i>
        } else {
            iconHeart = <i onClick={this.handleAddMovie} className="em em-black_heart ml-2"  aria-label="BLACK HEART"></i>
        }
        return (
            <div className="SearchItem">
                <Card className="SearchItem-Card">
                        <CardImg className="SearchItem-Img"  src={this.props.src} alt={this.props.title}></CardImg>
                        <CardBody>
                            <CardTitle className="CardTitle">{this.props.title}</CardTitle>
                            <CardText>Release Year: {this.props.releaseDate}</CardText>
                            <CardText>Rating: {this.props.rating}</CardText>
                            <div style={this.props.isLogged ? null : {display: "none"}} className="card-Button">
                                {/* <Button>Buy Ticket </Button> */}
                                {iconHeart}
                            </div>
                        </CardBody>
                    </Card>
            </div>
        )
    }
}

export default SearchItem
