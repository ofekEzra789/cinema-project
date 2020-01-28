import React, { Component } from 'react';
import {
    Card, CardImg, CardBody,
    CardTitle
} from 'reactstrap';
import './Movie.css';
import {Link} from 'react-router-dom';

export class Movie extends Component {
    render() {
        return (
            <div className="Movie" >
                   <Card className="Movie-Card">
                       <div className="Movie-Card-layout">
                            <CardTitle className="CardTitle">{this.props.title}</CardTitle>
                            <Link  to={`/movie/${this.props.id}`}>More Info</Link>
                       </div>
                        <CardImg className="Card-Img"  src={this.props.src} alt={this.props.title}></CardImg>
                    </Card>
            </div>
        )
    }
}

export default Movie
