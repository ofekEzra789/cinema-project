import React, { Component } from 'react';

const genresId = {
    Action: '28',
    Animation: '16',
    Comedy: '35',
    Adventure: '12'
}

export class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genre: "",
            title: ""
        }
    }
    render() {
        return (
            <div className="Search">
                
            </div>
        )
    }
}

export default Search;
