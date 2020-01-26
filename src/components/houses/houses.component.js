import React, { Component } from "react";
import House from "./house-item.component";
import axios from "axios";
import { Link } from "react-router-dom";

class Houses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      houses: []
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
      <div>
        <h1>Houses</h1>
        <Link to="/houses/add/" className="btn btn-dark">
          ADD new house
        </Link>
        {houseList}
      </div>
    );
  }
}

export default Houses;
