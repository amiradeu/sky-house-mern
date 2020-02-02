import React, { Component } from "react";
import axios from "axios";
import House from "./house-item.component";

import { Button, CardDeck } from "react-bootstrap";
import { MdAddCircle } from "react-icons/md";

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
        <Button href="/houses/add/" className="mt-3" variant="dark">
          <MdAddCircle className="mr-1"></MdAddCircle>new house
        </Button>
        <CardDeck>{houseList}</CardDeck>
      </React.Fragment>
    );
  }
}

export default Houses;
