import React, { Component } from 'react';
import './SearchItem.css';
import {
    Card, CardImg, CardText, CardBody,
    Button, CardTitle
} from 'reactstrap';

export class SearchItem extends Component {
    constructor(props) {
        super(props);
        this.handleAddMovie = this.handleAddMovie.bind(this)
    }

    handleAddMovie() {
        this.props.addMovie(this.props.id, this.props.title, this.props.src, this.props.releaseDate, this.props.rating);
    }

    render() {
        return (
            <div className="SearchItem">
                <Card className="SearchItem-Card">
                        <CardImg className="SearchItem-Img"  src={this.props.src} alt={this.props.title}></CardImg>
                        <CardBody>
                            <CardTitle className="CardTitle">{this.props.title}</CardTitle>
                            <CardText>Release Year: {this.props.releaseDate}</CardText>
                            <CardText>Rating: {this.props.rating}</CardText>
                            <div className="card-Button">
                                <Button>Buy Ticket </Button>
                                <i onClick={this.handleAddMovie} className="em em-black_heart ml-2"  aria-label="BLACK HEART"></i>
                            </div>
                        </CardBody>
                    </Card>
            </div>
        )
    }
}

export default SearchItem
