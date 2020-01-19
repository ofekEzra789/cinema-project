import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    Button, CardTitle
} from 'reactstrap';
import './Movie.css'

export class Movie extends Component {
    render() {
        return (
            <div className="Movie" >
                   <Card className="Movie-Card">
                        <CardImg className="Card-Img"  src={this.props.src} alt={this.props.title}></CardImg>
                        <CardBody>
                            <CardTitle className="CardTitle">{this.props.title}</CardTitle>
                            <CardText>Release Year: {this.props.releaseDate}</CardText>
                            <CardText>Rating: {this.props.rating}</CardText>
                            <div className="card-Button">
                                {/* <i className="em em-black_heart ml-2"  aria-label="BLACK HEART"></i> */}
                            </div>
                        </CardBody>
                    </Card>
            </div>
        )
    }
}

export default Movie
