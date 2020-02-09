import React, { Component } from "react";
import axios from "axios";
import House from "./house-item.component";
import NewHouse from "./new-house.component";

import { CardDeck } from "react-bootstrap";

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
          <NewHouse></NewHouse>
        </CardDeck>
      </React.Fragment>
    );
  }
}

export default Houses;
