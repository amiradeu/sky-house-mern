import React, { Component } from "react";
import axios from "axios";

import Owner from "./owner-item.component";
import NewOwner from "./new-owner.component";

import { CardDeck } from "react-bootstrap";

class Owners extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owners: []
    };
    this.deleteOwner = this.deleteOwner.bind(this);
  }
  componentDidMount() {
    axios.get("http://localhost:5000/owners").then(res => {
      console.log(res.data);
      this.setState({
        owners: res.data
      });
    });
  }

  deleteOwner(id) {
    axios.delete("http://localhost:5000/owners/" + id).then(res => {
      console.log(res.data);
    });
    this.setState({
      owners: this.state.owners.filter(elem => elem._id !== id)
    });
  }

  render() {
    let ownerList = this.state.owners.map(owner => (
      <Owner key={owner._id} owner={owner} deleteOwner={this.deleteOwner} />
    ));

    return (
      <React.Fragment>
        <CardDeck>
          {ownerList}
          <NewOwner></NewOwner>
        </CardDeck>
      </React.Fragment>
    );
  }
}

export default Owners;
