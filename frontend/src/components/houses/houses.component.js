import React, { Component } from "react";
import { CardDeck } from "react-bootstrap";
import axios from "axios";

import House from "./item-house.component";
import CardHouse from "./card-house.component";

class Houses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      houses: [],
      imgsrc: []
    };
    this.deleteHouse = this.deleteHouse.bind(this);
  }

  deleteHouse(id) {
    axios
      .delete("http://localhost:5000/houses/" + id)
      .then(res => console.log(res.data));
    this.setState({
      houses: this.state.houses.filter(elem => elem._id !== id)
    });
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/houses")
      .then(res => {
        this.setState({
          houses: res.data
        });
      })
      .catch(err => console.log(`Error: ${err}`));
  }

  render() {
    let houseList = this.state.houses.map(house => {
      return (
        <House key={house._id} house={house} deleteHouse={this.deleteHouse} />
      );
    });

    return (
      <React.Fragment>
        <CardDeck>
          {houseList}
          <CardHouse></CardHouse>
        </CardDeck>
      </React.Fragment>
    );
  }
}

export default Houses;
