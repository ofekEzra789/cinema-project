import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle
} from 'reactstrap';
import './Movie.css';
import {Link} from 'react-router-dom';

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
                                <Link className="btn btn-info" to={`/movie/${this.props.id}`}>More Info</Link>
                            </div>
                        </CardBody>
                    </Card>
            </div>
        )
    }
}

export default Movie
