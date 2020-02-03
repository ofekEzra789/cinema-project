import React, { Component } from "react";
import "./Seats.css";
// import { Row, Col } from 'reactstrap';

class Seats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTaken: this.props.isTaken,
      seatName: `A ${Math.floor(Math.random() * 78) + 1}`
    };
  }
  render() {
    return (
      <div
        style={{
          backgroundColor: this.props.isTaken ? "lightcoral" : "whitesmoke"
        }}
        className="Seats"
      >
      <span className="Seats-spot">{this.state.seatName}</span>
      </div>
    );
  }
}

export default Seats;
