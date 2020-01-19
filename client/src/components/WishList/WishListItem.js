import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    Button, CardTitle
} from 'reactstrap';
import './WishListItem.css'

export class WishListItem extends Component {
    constructor(props) {
        super(props);
        this.handleRemoveMovie = this.handleRemoveMovie.bind(this)
    }

    handleRemoveMovie() {
        this.props.removeMovie(this.props.id)
    }
    
    render() {
        return (
            <div className="WishListItem">
                 <Card className="WishListItem-Card">
                        <CardImg className="WishListItem-Img"  src={this.props.src} alt={this.props.title}></CardImg>
                        <CardBody>
                            <CardTitle>{this.props.title}</CardTitle>
                            <CardText>Release Year: {this.props.releaseDate}</CardText>
                            <CardText>Rating: {this.props.rating}</CardText>
                            <div className="card-Button">
                                <Button>Buy Ticket </Button>
                                <i onClick={this.handleRemoveMovie} className="em em-heavy_multiplication_x" aria-label="HEAVY MULTIPLICATION X"></i>
                            </div>
                        </CardBody>
                    </Card>
            </div>
        )
    }
}

export default WishListItem
