import React, { Component } from 'react';
import './SearchItem.css';
import {
    Card, CardImg, CardText, CardBody,
    Button
} from 'reactstrap';

export class SearchItem extends Component {
    render() {
        return (
            <div className="SearchItem">
                <Card className="SearchItem-Card">
                        <CardImg className="SearchItem-Img"  src={this.props.src} alt={this.props.title}></CardImg>
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

export default SearchItem
