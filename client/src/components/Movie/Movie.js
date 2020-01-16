import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    Button
} from 'reactstrap';
import './Movie.css'

export class Movie extends Component {
    render() {
        return (
            <div className="Movie" key={this.props.id}>
                   <Card className="Movie-Card">
                        <CardImg className="Card-Img"  src={this.props.src} alt={this.props.title}></CardImg>
                        <CardBody>
                            {/* <CardTitle>{this.props.title}</CardTitle> */}
                            <CardText>Release Year: {this.props.releaseDate}</CardText>
                            <CardText>Rating: {this.props.rating}</CardText>
                            <div className="card-Button">
                                <Button>Buy Ticket </Button>
                                <i className="em em-black_heart ml-2"  aria-label="BLACK HEART"></i>
                            </div>
                        </CardBody>
                    </Card>
            </div>
        )
    }
}

export default Movie
